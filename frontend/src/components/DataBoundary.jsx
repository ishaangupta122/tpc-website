import Loading from "./Loading";
import Error from "./Error";

// Shows the error or loading state while a request is not done, and the
// children once it is. `title` names the content in the loading message.
const DataBoundary = ({ loading, error, onRetry, title, children }) => {
  if (error) return <Error error={error} onRetry={onRetry} />;
  if (loading) return <Loading title={title} />;
  return children;
};

export default DataBoundary;
