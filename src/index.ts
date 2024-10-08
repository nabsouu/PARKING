import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import HomeController from './controllers/HomeController' // Import du HomeController
import { cities, parkings } from './data/staticDatabase'
import ReadAllCitiesController from './controllers/parking/ReadAllCitiesController'

const app = new Hono()

// Middleware pour servir les fichiers statiques à partir du dossier 'static'
app.use('/static/*', serveStatic({ root: './' }))

// Associer HomeController à la route GET "/"
app.route('/', HomeController)
app.route('/cities',ReadAllCitiesController)


export default app