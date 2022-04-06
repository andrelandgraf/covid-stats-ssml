import type { LoaderFunction } from 'remix';
import { Outlet, useLoaderData } from 'remix';
import { getDataByCountry } from '~/covid-api/index.server';
import CountryPrompt from '~/components/prompts/country';
import CountryError from '~/components/errors/country';
import { useOptionalCountryData } from '~/hooks/useCountryData';
import type { CountryData } from '~/covid-api/index.server';

type Error = 'internal_error' | 'country_not_found' | 'no_country_specified';

type LoaderData = {
  countryData?: CountryData;
  error?: Error;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const country = global.conversation.getParameter('country');
  if (!country) {
    return { error: 'no_country_specified' };
  }
  try {
    const countryData = await getDataByCountry(country);
    console.log(countryData, 'countryData');
    if (!countryData) {
      return { error: 'country_not_found' };
    }
    return { countryData };
  } catch (error) {
    return { error: 'internal_error' };
  }
};

export default function CountryIntent() {
  const { error } = useLoaderData<LoaderData>();
  const countryData = useOptionalCountryData();
  if (error === 'internal_error') {
    return <CountryError />;
  } else if (error === 'country_not_found') {
    global.conversation.response.endConversation = false;
    return <CountryError notFound />;
  } else if (error === 'no_country_specified' || !countryData) {
    global.conversation.response.endConversation = false;
    return <CountryPrompt />;
  }
  return <Outlet />;
}
