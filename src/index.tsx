import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import HomeController from './controllers/HomeController';
import { trimTrailingSlash } from 'hono/trailing-slash';
import cityRoutes from './routes/cityRoutes';
import parkingRoutes from './routes/parkingRoutes';
import { HTTPException } from 'hono/http-exception';
import { Layout } from './views/shared/Layout';
import { html } from 'hono/html';
import { setupDatabase } from './data/data';


const app = new Hono();

app.use('*', trimTrailingSlash());
app.use('/static/*', serveStatic({ root: './' }));


app.get('/', ...HomeController);


(async () => {
  try {
    await setupDatabase();
  } catch (error) {
    console.error('Erreur lors de linitialisation de la base de données:', error);
    
  }
})();


app.route('/cities',cityRoutes); 

app.route('/parkings', parkingRoutes); 





app.onError((err, c) => {
  if (err instanceof HTTPException) {
    if (err.status === 404) {
      return c.html(Layout({
        children: html`
          <div>
            <h1>Erreur 404</h1>
            <p>${err.message || "La page que vous recherchez n'existe pas"}</p>
            <a href="/">Retour à l'accueil</a>
          </div>
        `,
        pageTitle: 'Page non trouvée',
        h1content:''
      }), 404);
    }
  }
  console.error('Erreur serveur:', err);

  return c.html(Layout({//erreur 500 pour toutes les autres erreurs qui ne sont pas gérées 
    children: html`
      <div>
        <h1>Erreur 500, serveur interne</h1>
        <p>Une erreur inattendue s'est produite</p>
        <a href="/">Retour à l'accueil</a>
      </div>
    `,
    pageTitle: 'Erreur serveur',
    h1content:''
  }), 500);
});



export default app;
