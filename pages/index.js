import { useState, useEffect } from 'react';
import Showcase from '../components/Showcase/Showcase';
import SelectFilter from '../components/SelectFilter/SelectFilter';
import Spinner from '../components/Spinner/Spinner';
import Head from 'next/head';

const index = ({ cars, brands }) => {
  const [filterState, setFilterState] = useState([]); // массив брендов (строки)
  const [carsList, setCarsList] = useState(cars); // массив машин (объекты)
  const [isLoading, setIsLoading] = useState(false);

  // Получаем список машин по филтру
  const fetchCars = async (filter) => {
    const url = new URL('https://api.carmart.ru/cars/temp?page=1&perPage=12'); // host path
    filter.forEach((item) => {
      url.searchParams.append('brand', item);
    }); // добавляем в запрос все значения фильтра
    setIsLoading(true);
    const resp = await fetch(url); // делаем запрос
    const res = await resp.json(); // парсим в json
    setIsLoading(false);
    return res.list; // возвращаем список
  };

  useEffect(() => {
    fetchCars(filterState).then((res) => setCarsList(res));
  }, [filterState]);

  return (
    <>
      <Head>
        <meta keywords="maximum test cars"></meta>
        <title>Maximum</title>
      </Head>
      <main>
        <section className="container">
          <SelectFilter brands={brands} filterState={filterState} setFilterState={setFilterState} />
          {isLoading ? <Spinner /> : <Showcase cars={carsList} />}
        </section>
      </main>
    </>
  );
};

export default index;

export async function getStaticProps() {
  const response = await fetch(`https://api.carmart.ru/cars/temp?page=1&perPage=12`);
  const cars = await response.json();
  const responseBrands = await fetch(
    'https://api.carmart.ru/cars/temp?page=1&perPage=24&isNew%5B0%5D=1&orderBy%5B0%5D%5Bfield%5D=year&orderBy%5B0%5D%5Bdirection%5D=desc&brand%5B0%5D=',
  );
  const brands = await responseBrands.json();
  return {
    props: { cars: cars.list, brands: brands.meta.filters.brand },
  };
}
