const CountryNames = ({ name, startsSentence }: { name: string; startsSentence: boolean }) => {
  if (name[1].toUpperCase() === name[1]) {
    return startsSentence ? ` The ${name}` : ` the ${name}`;
  }
  return ` ${name}`;
};

export default CountryNames;
