import { City } from "../models/City";
import { Parking } from "../models/Parking";
import { generateRandomNumberId } from "../utils/generateRandomNumberId";


const AixenProvence=new City(generateRandomNumberId(),"Aix-en-Provence",[],"France",{latitude:43.533329, longitude: 5.43333}); 
const LaSpezia=new City(generateRandomNumberId(),"La Spezia",[], "Italie",{latitude:44.238366, longitude:9.6912326});
const AixlaChapelle= new City(generateRandomNumberId(),"Aix-la-Chapelle",[],"Allemangne",{latitude:50.776351, longitude:6.083862});
const SanCristobal=new City(generateRandomNumberId(),"San Cristòbal De La Laguna",[],"Espagne",{latitude:28.487180709838867, longitude:-16.313879013061523});
const NewCastel= new City(generateRandomNumberId(),"NewCastle upon Tyne", [], "Angleterre", {latitude:54.9738474, longitude:-1.6131572}); 



const parkingAix = new Parking("A",AixenProvence.id, {latitude:43.533329, longitude: 5.43333}, 100, true, 4.5);
const parkingSpzia= new Parking("B",LaSpezia.id,{latitude:44.238366, longitude:9.6912326}, 50,true,3);
const parkingSpzia2= new Parking("C",LaSpezia.id,{latitude:44.238366, longitude:9.6912326}, 80,true,2.5);
const parkingChapelle= new Parking("D",SanCristobal.id,{latitude:50.776351, longitude:6.083862}, 40,true,2.8);
const parkingCristobal=new Parking("E",SanCristobal.id,{latitude:28.487180709838867, longitude:-16.313879013061523}, 70,true,3.10);
const parkingNewCastel=new Parking("F",NewCastel.id,{latitude:54.9738474, longitude:-1.6131572},60,true,2.40);
const parkingNewCastel2=new Parking("G",NewCastel.id,{latitude:54.9738474, longitude:-1.6131572},90,true,3.20);



const cities:City[]=[AixenProvence,LaSpezia,AixlaChapelle,SanCristobal,NewCastel];
const parkings : Parking[]=[parkingAix, parkingChapelle,parkingCristobal,parkingNewCastel,parkingNewCastel2,parkingSpzia,parkingSpzia2];


export {cities,parkings}; 



