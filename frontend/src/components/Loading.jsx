import { Loader } from "lucide-react";

const Loading = ({ title = "Data" }) => {
  return (
    <>
      <div className='flex justify-center items-center min-h-[400px]'>
        <div className='flex flex-col items-center gap-4'>
          <Loader className='w-8 h-8 animate-spin text-emerald-900' />
          <p className='text-emerald-900 font-medium'>Loading {title}...</p>
        </div>
      </div>
    </>
  );
};

export default Loading;
