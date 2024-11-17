import ReadAllParkingsView from '../../views/ReadAllParkingsView';
import { HTTPException } from 'hono/http-exception';
import { createFactory } from "hono/factory";
import db from '../../data/data';
import { Parking } from '../../models/Parking';


const factory = createFactory();

const ReadAllParkingsController= factory.createHandlers(async (c) => {
try {
  
 
    const tri=c.req.query('tri')|| 'asc';

    //const query = db.query("SELECT * FROM parkings").as(Parking); // dans le TD3 pour afficher toutes mes villes

    const query = db.query(`
      SELECT * FROM parkings 
      ORDER BY numberOfSpots ${tri === 'desc' ? 'DESC' : 'ASC'}
    `).as(Parking);

    const parkings = await Promise.resolve(query.all());
    


    
    if (!parkings) {
      throw new HTTPException(404, { message: 'Aucun parking trouvé' });
    }

    return c.html(ReadAllParkingsView({ parkings }));
  } catch (error) {
    throw new HTTPException(500, { message: 'Erreur interne du serveur' });
  


  }
    
})




export default ReadAllParkingsController; 