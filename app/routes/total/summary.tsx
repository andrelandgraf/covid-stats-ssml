import Cases from '~/components/total/cases';
import Deaths from '~/components/total/deaths';
import Tests from '~/components/total/tests';

const Summary = () => {
  return (
    <>
      <Cases standalone={false} reportNoData={false} />
      <Deaths standalone={false} reportNoData={false} />
      <Tests standalone={false} reportNoData={false} />
    </>
  );
};

export default Summary;
