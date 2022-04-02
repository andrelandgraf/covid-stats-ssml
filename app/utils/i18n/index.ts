const getCountryName = (country: string, toUpperCase = false) => {
  if (country.split(' ').length > 1 || country[1] === country[1].toUpperCase()) {
    return toUpperCase ? `The ${country}` : `the ${country}`;
  }
  return country;
};

export { getCountryName };
