import { useState } from 'react';

const TruncateText = ({ text, maxLength = 100 }) => {
	const [isTruncated] = useState(true);

	return (
		<>
			{isTruncated
				? text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')
				: text}
		</>
	);
};

export default TruncateText;
