import { AlertCircle } from "lucide-react";

const Error = ({ error = "Unexpected Error Occurerd" }) => {
  return (
    <>
      <div className='flex justify-center items-center min-h-[200px] bg-red-100 border border-red-400 rounded-lg p-6'>
        <div className='flex flex-col items-center gap-4'>
          <AlertCircle className='w-8 h-8 text-red-900' />
          <p className='text-red-800 font-medium'>An Error Occurred...</p>
          <p className='text-red-800 font-medium'>{error}</p>
        </div>
      </div>
    </>
  );
};

export default Error;
