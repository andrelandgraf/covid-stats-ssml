import { Outlet, useCatch } from 'remix';
import Conversation from '../conversation';
import Error from '~/components/errors/generic';
import Unsupported from '~/components/errors/unsupported';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      speak: any;
    }
  }

  interface Global {
    conversation: Conversation;
  }
}

export default function App() {
  return (
    <speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
      <Outlet />
    </speak>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.error(error);
  return (
    <speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
      <Error error="internal" />
    </speak>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
      {caught.status === 404 ? <Unsupported /> : <Error error="internal" />}
    </speak>
  );
}
