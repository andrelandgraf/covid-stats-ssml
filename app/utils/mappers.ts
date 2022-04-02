const aogMap = {
  parameters: {
    'geo-country': (value: unknown) => (Array.isArray(value) ? 'countries' : 'country'),
  },
};

export { aogMap };
