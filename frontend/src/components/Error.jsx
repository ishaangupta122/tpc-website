import { AlertTriangle, RotateCw } from "lucide-react";
import StatePanel, { IconBadge } from "./StatePanel";

// Shown when a request fails. `error` is the (already user-friendly) message;
// `onRetry` adds a "Try again" button.
const Error = ({
  error = "We couldn't load this content. Please try again.",
  onRetry,
}) => (
  <StatePanel
    role="alert"
    icon={
      <IconBadge tone="danger">
        <AlertTriangle className="h-6 w-6" />
      </IconBadge>
    }
    title="Something went wrong"
    message={error}
    action={
      onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">
          <RotateCw className="h-4 w-4" />
          Try again
        </button>
      )
    }
  />
);

export default Error;
