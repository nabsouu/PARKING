export function toSlug(url:string): string{//fonction qui permet de générer un slug à partir d'une chaine de caractères
/*
      // Tout en minuscules
      let nouveauurl = url.toLowerCase();
      
      // Enlever les accents et caractères spéciaux
      nouveauurl = nouveauurl.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      
      // Remplacer les espaces par des tirets
      nouveauurl = nouveauurl.replace(/\s+/g, '-');
      
      // Enlever les autres caractères spéciaux
      nouveauurl = nouveauurl.replace(/[^a-z0-9-]/g, '');
    
      return nouveauurl;*/

      url=url.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Supprime les accents
      .replace(/[^a-z0-9\s-]/g, '') // Enlève les caractères spéciaux
      .trim() // Supprime les espaces en début et en fin
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/-+/g, '-') // Supprime les tirets en double
      .replace(/^-+|-+$/g, ''); // Supprime les tirets au début et à la fin
      return url;

    }