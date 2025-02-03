import { useState } from 'react';
import { X } from 'lucide-react';

const MessageBox = () => {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-4 right-4 z-50 animate-fade-in">
			<div className="bg-white rounded-lg shadow-lg p-4 w-72 border border-gray-200">
				<div className="flex justify-between items-start">
					<h2 className="font-semibold text-green-900 blink-animation">
						Fee Notice & Challan Form
					</h2>
					<button
						onClick={() => setIsVisible(false)}
						className="text-gray-400 hover:text-gray-600 transition-colors"
						aria-label="Close notification">
						<X size={18} />
					</button>
				</div>

				<a
					href="/path-to-your-file.pdf"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block mt-3 px-4 py-2 w-full text-center bg-gradient-to-b from-emerald-800 to-emerald-950 text-white text-sm font-medium rounded-md shadow hover:from-emerald-800/90 hover:to-emerald-950/90 transition-all">
					Open PDF
				</a>
			</div>
		</div>
	);
};

export default MessageBox;
