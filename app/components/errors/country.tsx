const CountryError = ({ notFound }: { notFound?: boolean }) => {
  if (notFound) {
    return <p>I am sorry. I couln't find any information for your country.</p>;
  }
  return <p>I am sorry. It looks like there was an issue fetching data for your country. Please try again soon.</p>;
};

export default CountryError;
