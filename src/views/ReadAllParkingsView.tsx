import type { Parking } from "../models/Parking";
import { Layout } from "./shared/Layout";

type ReadAllParkingsViewProps = {
  parkings: Parking[];
}
//"?" utilisé pour trier 

const ReadAllParkingsView = ({ parkings }: ReadAllParkingsViewProps) => (
  <Layout pageTitle="Our parkings in Europe" h1content="List of our parkings in Europe : ">
    <div>
      <a href="?tri=asc">Trier croissant</a>  <a href="?tri=desc">Trier décroissant</a>
    </div>
    <ul>
      {parkings.map(parking =><li><a href={"/parkings/"+parking.id}>{parking.name}</a></li>)}
    </ul>

    <a href="/">
        Retour à la page d'accueil
      </a> 
     
  </Layout>
);

export default ReadAllParkingsView;
