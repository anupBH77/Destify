import React from 'react'
import {getData} from "country-list"

const countries= getData()
const formattedCountries = countries.map((country) => ({
  name: country.name,
  id: country.name
}));

const useCountries = () => {
  const getAll = formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.name=== value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCountries;