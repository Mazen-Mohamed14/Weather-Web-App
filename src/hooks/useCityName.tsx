import { useEffect, useState } from "react";

export interface City {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}

const useCityName = (debouncedInput: string) => {
  const [cityArr, setCityArr] = useState<City[]>([]);
  useEffect(() => {
    const getCities = async () => {
      const headersList = {
        Accept: "*/*",
        "X-RapidAPI-Key": "176e4daa48mshd2048cb345d3ad3p1c3a60jsncdafc48f6a69",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      };
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${debouncedInput}`,
        {
          method: "GET",
          headers: headersList,
        }
      );
      const { data } = await response.json();
      setCityArr(data);
    };
    getCities();
  }, [debouncedInput]);
  return cityArr;
};

export default useCityName;
