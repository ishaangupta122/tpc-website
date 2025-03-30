import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";

const Topbar = () => {
  return (
    <div className='hidden lg:block bg-gradient-to-b from-emerald-800 to-emerald-950 border-b'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between h-14'>
          <div className='flex items-center lg:space-x-3 xl:space-x-4 text-xs xl:uppercase lg:tracking-tighter xl:tracking-wide'>
            <Link
              to='/contact'
              className='flex flex-col justify-center items-center text-yellow-300 hover:text-yellow-400 transition-colors  blink-animation'>
              <span className='flex items-center justify-center'>
                <Smartphone className='h-4' />
                Admission Enquiry :
              </span>
              <span className=''>+91 75088-55997</span>
            </Link>
            <Link
              to='https://forms.eduqfix.com/thaperolform/add'
              target='_blank'
              className='text-yellow-300 hover:text-yellow-400 transition-colors  blink-animation'>
              Online Fee Payment
            </Link>
            <Link
              to='/magazines'
              className=' text-white hover:text-emerald-100 transition-colors'>
              College Magazine
            </Link>
            <Link
              to='/mentors-list'
              className=' text-white hover:text-emerald-100 transition-colors'>
              List of Mentors
            </Link>
            <Link
              to='/forms-download'
              className=' text-white hover:text-emerald-100 transition-colors'>
              Forms Download
            </Link>
            <Link
              to='/mandatory-disclosure'
              className=' text-white hover:text-emerald-100 transition-colors'>
              Mandatory Disclosure
            </Link>
            <Link
              to='/tpc-newsletter'
              className=' text-white hover:text-emerald-100 transition-colors'>
              TPC Newsletter
            </Link>
            <Link
              to='/safe-working-environment'
              className=' text-white hover:text-emerald-100 transition-colors'>
              Safe Working
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
