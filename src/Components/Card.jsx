import '../sass/Card.scss';
const Card = ({ pokeName, pokeImg }) => {
	return (
		<div className='card'>
			<p className='card__name'>{pokeName}</p>
			<div className='card__circle'>
				<img src={pokeImg} alt={`pokemon ${pokeName}`} className='card__img' />
			</div>
		</div>
	);
};

export { Card };
