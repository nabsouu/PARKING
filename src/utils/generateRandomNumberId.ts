export function generateRandomNumberId(): number{ //nombre entre 100000 et 999999

        const min = 100000;
        const max = 999999; 
        return (Math.floor(Math.random() * (max - min + 1)) + min);//méthode math.floor permet de ne pas prendre en compte le décimal 
      }


