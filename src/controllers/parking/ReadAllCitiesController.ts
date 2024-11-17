import ReadAllCitiesView from '../../views/ReadAllCitiesView';
import { HTTPException } from 'hono/http-exception';
import { createFactory } from "hono/factory";
import db from '../../data/data';
import { City } from '../../models/City';




const factory = createFactory(); 

const ReadAllCitiesController = factory.createHandlers(async (c) => {
 
  try {
    const query = db.query("SELECT * FROM cities").as(City);
    const cities = await Promise.resolve(query.all());
    
    if (!cities) {
      throw new HTTPException(404, { message: 'Aucune ville trouvée' });
    }

    return c.html(ReadAllCitiesView({ cities }));
  } catch (error) {
    throw new HTTPException(500, { message: 'Erreur interne du serveur.' });
  }
});


export default ReadAllCitiesController; 