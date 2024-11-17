
export function parkingPrice(startedAt: Date, endedAt: Date, hourlyRate:number): number{

    if (hourlyRate < 0) {
        throw new Error("Le taux horaire ne peut pas être inférieur à 0");
      }


    const end =new Date(endedAt);
    const start = new Date(startedAt);


    const timeMinutes = end.getTime() - start.getTime();//ms 
    const timeHours = timeMinutes / (1000 * 60 * 60); //*1000 pour les secondes, *60 pour les minutes, *60pour les heures 

    const totalPrice = (timeHours * hourlyRate * 100) / 100;
    return totalPrice; 


}






