import { v4 as uuidv4 } from 'uuid';
import type { GPS } from '../data/GPS';
import { Spot } from './Spot';

export class Parking{

    id: string;
    name: string;
    city_id: number;
    location: GPS;
    numberOfSpots: number;
    opened: boolean;
    hourlyRate: number;
    parkIds: number[] = [];

    constructor(name: string, city_id:number,location:GPS,numberOfSpots:number,opened:boolean,hourlyRate:number,parkIds: number[] = [],id?:string){
        this.id = id ? id : uuidv4(); 
        this.name = name;
        this.city_id = city_id;
        this.location = location;
        this.numberOfSpots = numberOfSpots;
        this.opened = opened;
        this.hourlyRate = hourlyRate;
        this.parkIds = [];

        for (let i = 0; i < numberOfSpots; i++) {
            const spot = new Spot(this);
            this.parkIds.push(spot.id );
          }

    }

   

}