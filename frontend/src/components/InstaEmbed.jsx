import { InstagramEmbed } from 'react-social-media-embed';

const InstaEmbed = () => {
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<InstagramEmbed
					url='https://www.instagram.com/tpc.patiala'
					width={420}
				/>
			</div>
		</>
	);
};

export default InstaEmbed;
