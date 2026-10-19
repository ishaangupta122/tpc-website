import HeroSection from "./HeroSection";

// The shell shared by the website's content pages: banner with breadcrumb, then
// a page heading and the content.
//   title    banner title
//   crumb    last breadcrumb label (default: the title)
//   path     the page's address, for that breadcrumb
//   heading  [green words, black words], like "College" + "Faculty"
const PageLayout = ({ title, crumb = title, path, heading, heroImage = "/rec_gate.jpg", children }) => (
  <>
    <HeroSection
      imageUrl={heroImage}
      title={title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: crumb, href: path },
      ]}
    />
    <div className="flex justify-center">
      <div className="site-container w-full py-20">
        <h1 className="page-title mb-6">
          {heading[0]} <span className="text-black">{heading[1]}</span>
        </h1>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  </>
);

export default PageLayout;
