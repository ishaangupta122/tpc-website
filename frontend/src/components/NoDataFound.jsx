import { AlertCircle } from "lucide-react";

const NoDataFound = ({ title = "Data", height = "200px" }) => {
  return (
    <>
      <div
        className={`flex justify-center items-center min-h-[300px] bg-amber-100 border border-amber-400 rounded-lg`}>
        <div className="flex flex-col items-center gap-4 w-full">
          <AlertCircle className="w-8 h-8  text-amber-700" />
          <p className="text-amber-700 font-medium">No {title} Found...</p>
        </div>
      </div>
    </>
  );
};

export default NoDataFound;
