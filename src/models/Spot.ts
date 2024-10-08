import { generateRandomNumberId } from "../utils/generateRandomNumberId";
import { Parking } from "./Parking";

export class Spot {
    id: number;
    parking: Parking;

    constructor(parking: Parking) {
        this.id = generateRandomNumberId();
        this.parking = parking;
    }
}
