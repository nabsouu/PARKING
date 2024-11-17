import { v4 as uuidv4 } from 'uuid';

class Park {

    id: string;
    spot_id: number;
    startedAt: Date;
    endedAt: Date;
    price: number;
    paid: boolean;

        constructor(spot_id: number, startedAt: Date, endedAt: Date, price: number, paid: boolean, id?: string) {
            if (spot_id < 0) {
            throw new Error("Le spot_id doit être un nombre entier positif");
            }
            if (endedAt < startedAt) {
            throw new Error("La date de fin doit être après à la date de début");
            }
            if (price < 0) {
            throw new Error("Le prix ne peut pas être négatif");
            }

            this.id = id ? id : uuidv4(); //génération d'un UUID si id non fourni
            this.spot_id = spot_id;
            this.startedAt = startedAt;
            this.endedAt = endedAt;
            this.price = price;
            this.paid = paid;
  }
}
