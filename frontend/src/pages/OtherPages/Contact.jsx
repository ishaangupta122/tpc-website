import { Mail, MessageCircleMore, Phone, User } from 'lucide-react';
import { useState } from 'react';
import HeroSection from '../../components/HeroSection';

const ContactPage = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'contact', href: '/contact' },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		setSubmitting(true);
		formData.append('access_key', '7059166b-c9d1-48c3-a26c-197a90008ddf');
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		try {
			const res = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: json,
			}).then((res) => res.json());

			if (res.success) {
				console.log('Success', res);
				setIsSubmitted(true);
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<>
			<HeroSection imageUrl="./rec_gate.jpg" title="Feedback Form" breadcrumbs={breadcrumbs} />
			<div className=" flex items-center justify-center bg-gray-100 p-3 py-20 ">
				<div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
					<div className="w-full md:w-1/2 p-8">
						{isSubmitted ? (
							<div className="flex justify-center items-center flex-col h-full text-center">
								<h2 className="text-3xl font-bold text-emerald-800 mb-4">Thank You!</h2>
								<p className="text-gray-700 font-semibold px-2">
									{`Your message has been successfully submitted. We'll get back to you soon.`}
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-6">
								<h1 className="text-3xl font-semibold text-emerald-800 mb-6">Contact Us</h1>
								<div>
									<label htmlFor="name" className="block text-sm font-medium text-gray-700">
										Name
									</label>
									<div className="mt-1 relative rounded-md shadow-sm ">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<User className="h-5 w-5 text-emerald-800" aria-hidden="true" />
										</div>
										<input
											required
											type="text"
											name="name"
											id="name"
											className="block w-full pl-10 pr-3 py-2 border placeholder-emerald-800 text-emerald-800 border-emerald-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 sm:text-sm"
											placeholder="Your Name"
										/>
									</div>
								</div>
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700">
										Email
									</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Mail className="h-5 w-5 text-emerald-800" aria-hidden="true" />
										</div>
										<input
											required
											type="email"
											name="email"
											id="email"
											className="block w-full pl-10 pr-3 py-2 border placeholder-emerald-800 text-emerald-800 border-emerald-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 sm:text-sm"
											placeholder="Your Email"
										/>
									</div>
								</div>
								<div>
									<label htmlFor="number" className="block text-sm font-medium text-gray-700">
										Phone
									</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Phone className="h-5 w-5 text-emerald-800" aria-hidden="true" />
										</div>
										<input
											required
											type="phone"
											name="number"
											id="number"
											className="block w-full pl-10 pr-3 py-2 border placeholder-emerald-800 text-emerald-800 border-emerald-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 sm:text-sm"
											placeholder="Your Phone"
										/>
									</div>
								</div>
								<div>
									<label htmlFor="message" className="block text-sm font-medium text-gray-700">
										Message
									</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div className="absolute inset-y-0 left-0 pl-3 pt-2 flex items-start pointer-events-none">
											<MessageCircleMore
												className="h-5 w-5 text-emerald-800 mt-[3px]"
												aria-hidden="true"
											/>
										</div>
										<textarea
											name="message"
											id="message"
											rows="4"
											className="block w-full pl-10 pr-3 py-2 border placeholder-emerald-800 text-emerald-800 border-emerald-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 sm:text-sm resize-none"
											placeholder="Your Message..."></textarea>
									</div>
								</div>
								<div>
									<button
										type="submit"
										disabled={submitting}
										className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-b from-emerald-800 to-emerald-950 hover:from-emerald-800/95 hover:to-emerald-950/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-800 transition duration-150 ease-in-out">
										<span className="text-lg">{submitting ? 'Submitting' : 'Submit'}</span>
									</button>
								</div>
							</form>
						)}
					</div>
					<div className="w-full md:w-1/2 bg-gray-50">
						<div className="h-full flex flex-col">
							<div className="w-full h-96">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2707.590401011946!2d76.36474907446672!3d30.357657674767363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391028ac2eef19c3%3A0x8bb309860f0fd9ba!2sThapar%20Polytechnic%20College!5e1!3m2!1sen!2sus!4v1738136658545!5m2!1sen!2sus"
									className="w-full h-full border-0"
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="Campus Location"></iframe>
							</div>
							<div className="p-8 space-y-4">
								<h2 className="flex flex-col justify-center text-lg font-semibold text-emerald-800">
									Thapar Polytechnic Collge,
									<span className="">Patiala - 147001, India</span>
								</h2>
								<div className="text-gray-800">
									<p>
										<span className="text-emerald-800 font-medium">Main Office:</span> +91
										XXXXX-XXXXX
									</p>
									<p>
										<span className="text-emerald-800 font-medium">Email:</span> info@college.edu
									</p>
								</div>
								<p className="text-gray-800">
									<span className="text-emerald-800 font-medium">Office Hours:</span>
									<br />
									<span className="font-medium">Monday - Friday</span>: 9:00 AM - 5:00 PM
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactPage;
