// Standard page wrapper: padded, vertically spaced, centered on wide screens.
const PageContainer = ({ children, ...props }) => (
  <section className="p-6 space-y-6 max-w-7xl mx-auto" {...props}>
    {children}
  </section>
);

export default PageContainer;
