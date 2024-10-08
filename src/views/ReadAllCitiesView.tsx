import {City} from "../models/City";
import { Layout } from "./shared/Layout";

type ReadAllCitiesViewProps = {
  cities: Array<City>;
};

const CityLink = ({ city }: { city: City }) => (
  <li>
    <a href="#">{city.name}</a>
  </li>
);

const CitiesList = ({ cities }: { cities: City[] }) => (
  <ul>
    {cities.map((city) => (
      <CityLink city={city} />
    ))}
  </ul>
);

const ReadAllCitiesView = ({ cities }: ReadAllCitiesViewProps) => (
    <Layout pageTitle="liste de villes">
      <CitiesList cities={cities} />
    </Layout>

);

export default ReadAllCitiesView;