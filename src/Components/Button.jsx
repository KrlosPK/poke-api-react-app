import '../sass/Button.scss';

const Button = ({ icon, handleClick, loading }) => {
	return (
		<div className='button__box'>
			<button className='button' onClick={handleClick} disabled={loading}>
				{icon}
			</button>
			<div className='button__box__bg'></div>
		</div>
	);
};

export { Button };
