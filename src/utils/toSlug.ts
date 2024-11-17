export function toSlug(url:string): string{//fonction qui permet de générer un slug à partir d'une chaine de caractères




  let result = url.toLowerCase();
  
  const accents = { //dictionnaire clé-valeur 
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
    'ý': 'y', 'ÿ': 'y', 'ñ': 'n', 'ç': 'c'
  };

  for (let caractère in accents) { 
    result = result.split(caractère).join(accents[caractère as keyof typeof accents]);
  }

  //initilisation 
  let slug = '';
  let lastCharWasSpace = false;

  for (let char of result) {    // Si c'est une lettre, un chiffre ou un tiret, on l'ajoute

    if ((char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') || char === '-') {
      slug += char;
      lastCharWasSpace = false;
    }
    // Si c'est un espace et qu'on n'a pas déjà mis un tiret
    else if (char === ' ' && !lastCharWasSpace && slug.length > 0 && slug[slug.length - 1] !== '-') {
      slug += '-';
      lastCharWasSpace = true;
    }
  }

  while (slug.startsWith('-')) {// supprime les tirets au début 
    slug = slug.substring(1);
  }  

  while (slug.endsWith('-')) {// supprime les tirets à la fin
    slug = slug.substring(0, slug.length - 1);
  }

  return slug;

    }