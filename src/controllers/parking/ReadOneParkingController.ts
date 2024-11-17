import { HTTPException } from 'hono/http-exception';
import { Layout } from '../../views/shared/Layout';
import { html } from 'hono/html';
import { createFactory } from "hono/factory";
import db from '../../data/data';
import { Parking } from '../../models/Parking';
import { City } from '../../models/City';



const factory = createFactory(); 

const ReadOneParkingController=factory.createHandlers(async (c)=>{
  try{
    const id=c.req.param('id') ;


    const query = db.query("SELECT * FROM parkings WHERE id = ?").as(Parking); //selection tous les parkings de ma table parkings
    const parking =  await Promise.resolve(query.get(Number(id)));
  

    if (!parking) {
      throw new HTTPException(404, { message: ' ERREUR 404: Parking non trouvé !' });
    }


    //const parking = parkings.find(p => p.id === Number(id)); //traduction de cette ligne en sql
    const cityQuery = db.query("SELECT * FROM cities WHERE id = ?").as(City);
    const city = await Promise.resolve(cityQuery.get(parking.city_id));
   
    if (!city) {
      throw new HTTPException(404, {message: 'ERREUR 404 : Ville non trouvée puur ce parking!'});
    }

    const page = Layout({
      children: html`
        <div class="container">
          <p>ID: ${parking.id}</p>
          <p>Coordonnées GPS: ${parking.location}</p>
          <p>Nombre de places: ${parking.numberOfSpots}</p>
          <p>Ouvert: ${parking.opened ? 'Oui' : 'Non'}</p>
          <p>Tarif horaire: ${parking.hourlyRate} €</p>
        </div>

          <h3>Ville associée</h3>
          <p>Nom: ${city.name}</p>
          <p>Pays: ${city.country}</p>
          <p>Coordonnées GPS: ${city.location}</p>


        <a href="/">
          Retour à la page d'accueil
        </a>
      `,
      pageTitle: `Détails du parking: ${parking.name}`,
      h1content: parking.name
    });

    return c.html(page);
    }
    catch(error){
      if (error instanceof HTTPException) {
        throw error;
    }
    throw new HTTPException(500, {message: 'ERREUR 500: Erreur interne du serveur'}
    );
    }

}); 

export default ReadOneParkingController; 