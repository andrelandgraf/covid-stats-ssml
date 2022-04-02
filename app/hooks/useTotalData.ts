import invariant from 'tiny-invariant';
import type { CountryData } from '~/covid-api/index.server';
import { useMatchesData } from './useMatchesData';

function isCountryData(data: unknown): data is CountryData {
  return !!data && typeof data === 'object';
}

export function useOptionalTotalData(): CountryData | undefined {
  const matchesData = useMatchesData('routes/total');
  if (!matchesData || !matchesData.countryData) return undefined;
  invariant(isCountryData(matchesData.countryData), 'total countryData has invalid format');
  return matchesData['countryData'];
}

export function useTotalData(): CountryData {
  const countryData = useOptionalTotalData();
  invariant(!!countryData, 'total countryData is not defined');
  return countryData;
}
