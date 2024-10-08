import { Hono } from "hono";
import { cities } from '../../data/staticDatabase'; // Importer les données des villes
import { generateCities } from "../../views/ReadAllCitiesView";


const ReadAllCitiesController = new Hono()


ReadAllCitiesController.get('/', (c) => {
    const citiesHtml = generateCities(cities); // Générer la vue avec les villes
    return c.html(citiesHtml); // Renvoie la vue en format HTML
  });
  



export default ReadAllCitiesController