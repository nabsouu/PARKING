import Database from "bun:sqlite";
import { generateRandomNumberId } from "../utils/generateRandomNumberId";
import { City } from "../models/City";
import { Parking } from "../models/Parking";
import { GPS } from "./GPS";


const db= new Database('parking.sqlite'); 

async function initializeDatabase() { //fonction pour initiliser la databse
    try {
        await db.run(`DROP TABLE IF EXISTS parks`);
        await db.run(`DROP TABLE IF EXISTS spots`);
        await db.run(`DROP TABLE IF EXISTS parkings`);
        await db.run(`DROP TABLE IF EXISTS cities`);


        await db.run(`CREATE TABLE IF NOT EXISTS cities (
            "id" INTEGER NOT NULL,
            "name" TEXT NOT NULL UNIQUE,
            "slug" TEXT NOT NULL UNIQUE,
            "location" TEXT,
            "country" TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT)
        )`);

        await db.run(`CREATE TABLE IF NOT EXISTS parkings (
            "id" INTEGER NOT NULL,
            "name" TEXT NOT NULL UNIQUE,
            "location" TEXT,
            "numberOfSpots" INTEGER NOT NULL,
            "opened" INTEGER NOT NULL DEFAULT 1,
            "hourlyRate" REAL NOT NULL,
            "city_id" INTEGER NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT),
            FOREIGN KEY("city_id") REFERENCES "cities"("id")
        )`);

        await db.run(`CREATE TABLE IF NOT EXISTS parks (
            "id" TEXT NOT NULL UNIQUE,
            "startedAt" TEXT NOT NULL,
            "endedAt" TEXT,
            "vehicleNumberPlate" TEXT,
            "spot_id" INTEGER NOT NULL,
            "price" REAL NOT NULL DEFAULT 0,
            PRIMARY KEY("id"),
            FOREIGN KEY("spot_id") REFERENCES "spots"("id")
        )`);

        await db.run(`CREATE TABLE IF NOT EXISTS spots (
            "id" INTEGER NOT NULL,
            "parking_id" INTEGER NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT),
            FOREIGN KEY("parking_id") REFERENCES "parkings"("id")
        )`);

    } catch (error) {
        console.error("Erreur lors de l'initialisation de la database", error);
        throw error;
    }
}


const AixenProvence = new City(generateRandomNumberId(), "Aix-en-Provence", [], "France", { latitude: 43.533329, longitude: 5.43333 });
const LaSpezia = new City(generateRandomNumberId(), "La Spezia", [], "Italie", { latitude: 44.238366, longitude: 9.6912326 });
const AixlaChapelle = new City(generateRandomNumberId(), "Aix-la-Chapelle", [], "Allemagne", { latitude: 50.776351, longitude: 6.083862 });
const SanCristobal = new City(generateRandomNumberId(), "San Cristòbal De La Laguna", [], "Espagne", { latitude: 28.487180709838867, longitude: -16.313879013061523 });
const NewCastel = new City(generateRandomNumberId(), "NewCastle upon Tyne", [], "Angleterre", { latitude: 54.9738474, longitude: -1.6131572 });
//nous avons décidé de créer des instances des objets City et Parking car nous voulions utiliser la méthode generateRandomNumberId comme id dans la base de données 

const parkingIds = [
    generateRandomNumberId(),
    generateRandomNumberId(),
    generateRandomNumberId(),
    generateRandomNumberId(),
    generateRandomNumberId(),
    generateRandomNumberId(),
    generateRandomNumberId(),
];


const parkingAix = new Parking(parkingIds[0], "A", AixenProvence.id, { latitude: 43.533329, longitude: 5.43333 }, 100, true, 4.5);
const parkingSpzia = new Parking(parkingIds[1], "B", LaSpezia.id, { latitude: 44.238366, longitude: 9.6912326 }, 50, true, 3);
const parkingSpzia2 = new Parking(parkingIds[2], "C", LaSpezia.id, { latitude: 44.238366, longitude: 9.6912326 }, 80, true, 2.5);
const parkingChapelle = new Parking(parkingIds[3], "D", AixlaChapelle.id, { latitude: 50.776351, longitude: 6.083862 }, 40, true, 2.8);
const parkingCristobal = new Parking(parkingIds[4], "E", SanCristobal.id, { latitude: 28.487180709838867, longitude: -16.313879013061523 }, 70, true, 3.10);
const parkingNewCastel = new Parking(parkingIds[5], "F", NewCastel.id, { latitude: 54.9738474, longitude: -1.6131572 }, 60, true, 2.40);
const parkingNewCastel2 = new Parking(parkingIds[6], "G", NewCastel.id, { latitude: 54.9738474, longitude: -1.6131572 }, 90, true, 3.20);


AixenProvence.parkingsIds.push(parkingAix.id);
LaSpezia.parkingsIds.push(parkingSpzia.id, parkingSpzia2.id);
AixlaChapelle.parkingsIds.push(parkingChapelle.id);
SanCristobal.parkingsIds.push(parkingCristobal.id);
NewCastel.parkingsIds.push(parkingNewCastel.id, parkingNewCastel2.id);

const cities: City[] = [AixenProvence, LaSpezia, AixlaChapelle, SanCristobal, NewCastel];
const parkings: Parking[] = [parkingAix, parkingChapelle, parkingCristobal, parkingNewCastel, parkingNewCastel2, parkingSpzia, parkingSpzia2];


cities.forEach(city => {// on ajoute les ids parkings dans la tab
    city.parkingsIds = parkings
        .filter(parking => parking.city_id === city.id)
        .map(parking => parking.id);
});


export function stringifyGPS(gps: GPS): string { //methode pour transformer le type gps en string pour pouvoir l'utiliser en text dans la table parking
    return `${gps.latitude}, ${gps.longitude}`;
}


async function insertCities(cities: City[]) {
    for (const city of cities) {
        try {
            await db.run(`INSERT INTO cities (id, name, slug, location, country) VALUES (?, ?, ?, ?, ?)`, [
                city.id,
                city.name,
                city.slug,
                stringifyGPS(city.location),
                city.country
            ]);
        } catch (error) {
            console.error(`Erreur lors de l'insertion de la ville ${city.name}:`, error);
            throw error;
        }
    }
}

async function insertParkings(parkings: Parking[]) {
    for (const parking of parkings) {
        try {
            await db.run(`INSERT INTO parkings (id, name, location, numberOfSpots, opened, hourlyRate, city_id) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                parking.id,
                parking.name,
                stringifyGPS(parking.location),
                parking.numberOfSpots,
                parking.opened ? 1 : 0,
                parking.hourlyRate,
                parking.city_id
            ]);
        } catch (error) {
            console.error(`Erreur lors de l'insertion du parking ${parking.name}:`, error);
            throw error;
        }
    }
}


async function setupDatabase() {//mettre en place toute la database
    try {        
        await initializeDatabase();
        console.log("Database correctement initialisée");

        await insertCities(cities);
        console.log("Les villes ont bien été inséré");

        await insertParkings(parkings);
        console.log("Les parkings ont bien été inséré");

        return true;
    } catch (error) {
        console.error("Erreur lors de la mise en place de la databse:", error);
        throw error;
    }
}



export { db as default, setupDatabase };
