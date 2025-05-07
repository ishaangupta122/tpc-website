const WelcomeLoading = () => {
  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen p-4">
      {/* Circle Loader Animation with Sequential Bounce */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-5 h-5 bg-emerald-700 rounded-full animate-[bounce_1s_infinite_0.1s]"></div>
        <div className="w-5 h-5 bg-emerald-700 rounded-full animate-[bounce_1s_infinite_0.3s]"></div>
        <div className="w-5 h-5 bg-emerald-700 rounded-full animate-[bounce_1s_infinite_0.5s]"></div>
      </div>

      {/* Loading Text with Animation */}
      <p className="text-2xl font-semibold text-emerald-700 animate-pulse text-center">
        Welcome to Thapar Polytechnic College
      </p>

      {/* College Logo with Scale Animation */}
      <img
        src="/tpc-logo.png"
        alt="College Logo"
        className="h-24 mb-6 animate-[scale_1.4s_ease-in-out_forwards]"
      />
    </div>
  );
};

export default WelcomeLoading;

/* Inline Keyframes for Scale Animation */
const style = document.createElement("style");
style.innerHTML = `
  @keyframes scale {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);
