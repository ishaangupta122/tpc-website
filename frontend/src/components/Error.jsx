import { AlertCircle } from "lucide-react";

const Error = ({ error = "An unexpected error occurred." }) => {
  return (
    <>
      <div className='flex justify-center items-center min-h-[400px] bg-red-50 border border-red-200 rounded-lg p-6'>
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
