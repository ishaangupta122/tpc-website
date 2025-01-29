import { useState } from 'react';

const TruncateText = ({ text, maxLength = 100 }) => {
	const [isTruncated] = useState(true);

	return (
		<div>
			<p>
				{isTruncated ? text.slice(0, maxLength) + (text.length > maxLength ? '...' : '') : text}
			</p>
		</div>
	);
};

export default TruncateText;
