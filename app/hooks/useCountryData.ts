import invariant from 'tiny-invariant';
import type { CountryData } from '~/covid-api/index.server';
import { useMatchesData } from './useMatchesData';

function isCountryData(data: unknown): data is CountryData {
  return !!data && typeof data === 'object';
}

export function useOptionalCountryData(): CountryData | undefined {
  const matchesData = useMatchesData('routes/country');
  if (!matchesData || !matchesData.countryData) return undefined;
  invariant(isCountryData(matchesData.countryData), 'countryData has invalid format');
  return matchesData['countryData'];
}

export function useCountryData(): CountryData {
  const countryData = useOptionalCountryData();
  invariant(!!countryData, 'countryData is not defined');
  return countryData;
}
