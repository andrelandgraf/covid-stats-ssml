import type { LoaderFunction } from 'remix';
import { Outlet, useLoaderData } from 'remix';
import { getDataByCountry } from '~/covid-api/index.server';
import TotalError from '~/components/errors/total';
import { useOptionalTotalData } from '~/hooks/useTotalData';
import type { CountryData } from '~/covid-api/index.server';

type Error = 'internal_error';

type LoaderData = {
  error?: Error;
  countryData?: CountryData;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  try {
    const countryData = await getDataByCountry('All');
    console.log(countryData, 'countryData');
    return { countryData };
  } catch (error) {
    return { error: 'internal_error' };
  }
};

export default function CountryIntent() {
  const { error } = useLoaderData<LoaderData>();
  const countryData = useOptionalTotalData();
  if (error === 'internal_error' || !countryData) {
    return <TotalError />;
  }
  return <Outlet />;
}
