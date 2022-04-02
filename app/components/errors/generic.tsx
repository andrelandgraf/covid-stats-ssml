type ErrorProps = {
  error: 'timeout' | 'internal';
};

export default function Error({ error }: ErrorProps) {
  let reply = '';
  if (error === 'timeout') {
    reply = 'I am sorry, unfortunately we timed out while working on your request. Please try again.';
  } else {
    reply = 'I am sorry, something went wrong. Please try again in a few seconds.';
  }
  return <p>{reply}</p>;
}
