import { HTTPException } from 'hono/http-exception';
import { Layout } from '../../views/shared/Layout';
import { html } from 'hono/html';
import { toSlug } from '../../utils/toSlug';
import { createFactory } from "hono/factory";
import db from '../../data/data';
import { City } from '../../models/City';
import { Parking } from '../../models/Parking';


const factory=createFactory();



const ReadOneCityController=factory.createHandlers(async (c)=> {
  try {
    const slug = c.req.param('slug');
    const slugnormalized=toSlug(slug);


    //1* const city = cities.find(city => city.slug === slugnormalized);
    const query = db.query("SELECT * FROM cities WHERE slug = ?").as(City);
    const city = await Promise.resolve(query.get(slugnormalized));
    
  
    if (!city) {
      throw new HTTPException(404);
    }


    const parkingsQuery = db.query(`
      SELECT parkings.*
      FROM parkings
      INNER JOIN cities ON parkings.city_id = cities.id
      WHERE cities.slug = ?
    `).as(Parking);
    const parkings = await Promise.resolve(parkingsQuery.all(slugnormalized));


    const page = Layout({
      children: html`
        <div class="container">
          <p>ID : ${city.id}</p>
          <p>Coordonnées GPS : ${city.location}</p>
          <p>Pays : ${city.country}</p>

          <h2>Parkings associés</h2>
          <div class="parkings">
            ${parkings.map(parking => html`
              <div class="parking">
                <h3>${parking.name}</h3>
                <p>ID : ${parking.id}</p>
                <p>Coordonnées GPS : ${parking.location}</p>
                <p>Nombre de places : ${parking.numberOfSpots}</p>
                <p>Ouvert : ${parking.opened ? 'Oui' : 'Non'}</p>
                <p>Tarif horaire : ${parking.hourlyRate} €</p>
              </div>
            `)}
          </div>

          <a href="/">Retour à la page d'accueil</a>
        </div>
      `,
      pageTitle: city.name,
      h1content: city.name
    });

    return c.html(page);


  }  catch(error){
    if (error instanceof HTTPException) {
      throw error;
  }
  throw new HTTPException(500, {
      message: 'ERREUR 500: Erreur interne du serveur'
  });

  }
}); 


export default ReadOneCityController; 