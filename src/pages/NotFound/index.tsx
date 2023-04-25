import { Button } from '../../components';
import { EMPTY_PAGE } from '../../configs/images';

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center font-poppins min-h-screen'>
      <img src={EMPTY_PAGE} alt='illustration' width={560} />
      <h1 className='text-[#24285B] text-2xl font-bold mt-10 mb-4 sm:text-3xl'>
        Something's Wrong.
      </h1>
      <p className='max-w-[700px] text-secondary text-[13px] text-center px-4 mb-10 sm:text-base'>
        Sorry, the page you are looking for was not found. Please double check
        the URL you entered or try searching for relevant content via our site
        navigation menu.
      </p>
      <Button type='primary' label='Back Home' className='text-base font-medium px-8' onClick={() => window.location.replace('/')} />
    </div>
  );
}
