/* global ssmlDocument */

const getSlotValue = key => {
  const { contexts } = ssmlDocument;
  const context = contexts.find(c => c.name === key);
  if (!context || !context.slot) {
    return undefined;
  }
  return context.slot;
};

export default getSlotValue;
