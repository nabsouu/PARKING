import { City } from "../models/City";
import { Layout } from "./shared/Layout";

type ReadAllCitiesViewProps={
  cities:City[]
}

const ReadAllCitiesView = ({cities}:ReadAllCitiesViewProps) =>
  <Layout pageTitle="Our cities in Europe" h1content="List of our cities in Europe :">
    
    <ul>
      {cities.map(c=><li><a href={"/cities/"+c.slug}>{c.name}</a></li>)}
    </ul>
    <a href="/">
        Retour à la page d'accueil
      </a>

  </Layout>

  export default ReadAllCitiesView; 