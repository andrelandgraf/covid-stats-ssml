import PropTypes from 'prop-types';

const CountryNames = ({ name, startsSentence }) => {
  if (name[1].toUpperCase() === name[1]) {
    return startsSentence ? ` The ${name}` : ` the ${name}`;
  }
  return ` ${name}`;
};

CountryNames.propTypes = {
  name: PropTypes.string.isRequired,
  startsSentence: PropTypes.bool,
};

CountryNames.defaultProps = {
  startsSentence: false,
};

export default CountryNames;
