const aogMap = {
  parameters: {
    'geo-country': value => (Array.isArray(value) ? 'countries' : 'country'),
  },
};

export { aogMap };
