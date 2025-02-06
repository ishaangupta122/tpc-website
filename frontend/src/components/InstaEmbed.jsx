import { InstagramEmbed } from 'react-social-media-embed';

const InstaEmbed = () => {
	return (
		<>
			<div className='w-full lg:w-fit flex justify-center items-center'>
				<InstagramEmbed
					url='https://www.instagram.com/tpc.patiala'
					className='w-full lg:w-[420px]'
				/>
			</div>
		</>
	);
};

export default InstaEmbed;
