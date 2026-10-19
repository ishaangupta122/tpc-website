import { useState } from "react";
import { ArrowRight } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import { useContact } from "../../hooks/useResources";

const fields = [
  {
    id: "name",
    name: "name",
    label: "Full name",
    type: "text",
    placeholder: "Your name",
    autoComplete: "name",
    required: true,
  },
  {
    id: "number",
    name: "number",
    label: "Phone number",
    type: "tel",
    placeholder: "+91 98765 43210",
    autoComplete: "tel",
    required: true,
  },
  {
    id: "email",
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    required: true,
    wide: true,
  },
];

const inputClass =
  "block w-full px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md transition focus:outline-none focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/30";

const labelClass = "block text-xs font-medium text-gray-800 mb-1.5";


const ContactPage = () => {
  const { data: collegeContact } = useContact();
  const contactDetails = [
    {
      label: "Tel",
      value: (
        <>
          {collegeContact.phones.map(({ display, tel }, index) => (
            <span key={tel}>
              {index > 0 && ", "}
              <a href={`tel:${tel}`} className="hover:underline">
                {display}
              </a>
            </span>
          ))}
        </>
      ),
    },
    {
      label: "Email",
      value: (
        <a href={`mailto:${collegeContact.email}`} className="hover:underline">
          {collegeContact.email}
        </a>
      ),
    },
    {
      label: "Hours",
      value: collegeContact.hours,
    },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSubmitting(true);
    setError("");
    formData.append("access_key", "7059166b-c9d1-48c3-a26c-197a90008ddf");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        setIsSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Could not send your message. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="Contact Page"
        breadcrumbs={breadcrumbs}
      />
      <div className="bg-white py-14 md:py-20">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
            {/* Form */}
            <div className="flex flex-col">
              {isSubmitted ? (
                <div className="flex justify-center items-center flex-col h-full min-h-[320px] text-center">
                  <h2 className="card-title text-2xl md:text-3xl mb-4">
                    Thank You!
                  </h2>
                  <p className="text-gray-700 px-2">
                    Your message has been successfully submitted. We&apos;ll get
                    back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <h1 className="page-title">
                    Have any Query ? <span className="text-black">Contact Us</span>
                  </h1>
                  <p className="mt-5 mb-9 text-gray-600 leading-7 max-w-lg">
                    Fill in the form and our team will get back to you shortly.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5 lg:grid-rows-[auto_auto_1fr_auto]">
                    {fields.map(({ id, label, wide, ...input }) => (
                      <div key={id} className={wide ? "sm:col-span-2" : ""}>
                        <label htmlFor={id} className={labelClass}>
                          {label}
                          {input.required && (
                            <span className="text-emerald-800"> *</span>
                          )}
                        </label>
                        <input id={id} className={inputClass} {...input} />
                      </div>
                    ))}

                    <div className="sm:col-span-2 flex flex-col">
                      <label htmlFor="message" className={labelClass}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows="5"
                        className={`${inputClass} resize-none flex-1 min-h-[8rem]`}
                        placeholder="Tell us how we can help"></textarea>
                    </div>

                    <div className="sm:col-span-2">
                    {error && (
                      <p role="alert" className="mb-3 text-sm text-red-600">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md font-medium text-white bg-gradient-to-b from-emerald-800 to-emerald-950 hover:from-emerald-800/95 hover:to-emerald-950/95 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-800 transition duration-150 ease-in-out">
                      {submitting ? "Submitting..." : "Submit enquiry"}
                      {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                    </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Map and details */}
            <div className="flex flex-col">
              <div className="w-full flex-1 h-64 lg:h-auto lg:min-h-[16rem] overflow-hidden rounded-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2707.590401011946!2d76.36474907446672!3d30.357657674767363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391028ac2eef19c3%3A0x8bb309860f0fd9ba!2sThapar%20Polytechnic%20College!5e1!3m2!1sen!2sus!4v1738136658545!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Campus Location"></iframe>
              </div>

              <div className="mt-10 border-t border-gray-900 pt-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {collegeContact.name}
                </h2>
                <address className="mt-2 not-italic text-gray-600 leading-7 pb-5">
                  {collegeContact.addressLines.map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </address>
                <dl>
                  {contactDetails.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex gap-6 py-3.5 border-t border-gray-200 text-sm">
                      <dt className="w-16 shrink-0 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-800 pt-0.5">
                        {label}
                      </dt>
                      <dd className="text-gray-900 break-words">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <p className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-600">
            We use your details only to respond to your enquiry.
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
