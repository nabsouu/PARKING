import type { GPS } from "../data/GPS";
import { toSlug } from "../utils/toSlug";

export class City{

    id:number;
    name: string;
    slug: string; 
    parkingsIds: number[];
    country: string;
    location: GPS; 


    constructor(id: number, name: string, parkingsIds: number[], country: string, location: GPS){
        this.id=id;
        this.name=name;
        this.slug=toSlug(name);
        this.parkingsIds=parkingsIds;
        this.country=country;
        this.location=location;
    }

    


}