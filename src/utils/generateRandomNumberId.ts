export function generateRandomNumberId(): number{

        // Générer un nombre entier aléatoire entre 100000 et 999999 (6 chiffres)
        const min = 100000; // Le plus petit nombre à 6 chiffres
        const max = 999999; // Le plus grand nombre à 6 chiffres
        return Math.floor(Math.random() * (max - min + 1)) + min;//méthode math.floor permet de ne pas prendre en compte le décimal 
      }


