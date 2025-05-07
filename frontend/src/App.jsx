import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import MessageBox from "./components/MsgBox";
import { routes } from "./routes/Routes";
import { useEffect, useState } from "react";
import WelcomeLoading from "./components/WelcomeLoading";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <WelcomeLoading />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <MessageBox />
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
