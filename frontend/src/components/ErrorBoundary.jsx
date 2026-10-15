import { Component } from "react";
import { AlertTriangle } from "lucide-react";
import StatePanel, { IconBadge } from "./StatePanel";

// Catches render errors anywhere below it so one broken page shows a friendly
// message instead of a blank screen.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled UI error:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <StatePanel
        fullPage
        role="alert"
        icon={
          <IconBadge tone="danger">
            <AlertTriangle className="h-6 w-6" />
          </IconBadge>
        }
        title="Something went wrong"
        message="We couldn't display this page. Please reload, or return to the home page."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-emerald-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">
              Reload page
            </button>
            <a
              href="/"
              className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">
              Go to home
            </a>
          </div>
        }
      />
    );
  }
}

export default ErrorBoundary;
