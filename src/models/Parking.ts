import type { GPS } from '../data/GPS';
import { Spot } from './Spot';

export class Parking{

    id: number;
    name: string;
    city_id: number;
    location: GPS;
    numberOfSpots: number;
    opened: boolean;
    hourlyRate: number;
    parkIds: number[] = [];

    constructor(id: number, name: string, city_id:number,location:GPS,numberOfSpots:number,opened:boolean,hourlyRate:number,parkIds: number[] = []){
        this.id = id;  
        this.name = name;
        this.city_id = city_id;
        this.location = location;
        this.numberOfSpots = numberOfSpots;
        this.opened = opened;
        this.hourlyRate = hourlyRate;
        this.parkIds = [];

        for (let i = 0; i < numberOfSpots; i++) {//créer une instance de spot pour ajouter l'id de la place dans leparking
            const spot = new Spot(this);
            this.parkIds.push(spot.id );
          }

    }

   

}