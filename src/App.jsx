import { Button } from './Components/Button';
import { Card } from './Components/Card';

import { TiArrowLeftOutline } from 'react-icons/ti';
import { TiArrowRightOutline } from 'react-icons/ti';

import { useEffect, useState } from 'react';
import './sass/App.scss';

const App = () => {
	const [pokemonId, setPokemonId] = useState(1);
	const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

	useEffect(() => {
		getEvolutions(pokemonId);
	}, [pokemonId]);

	const getEvolutions = async (id) => {
		/* Fetching de Datos */
		const URL = `https://pokeapi.co/api/v2/evolution-chain/${id}/`;
		const res = await fetch(URL);
		const data = await res.json();

		const pokemonEvolutions = [];

		/* Mostramos la primera evolucion */
		const pokemonLv1 = data.chain.species.name;
		const pokemonLv1Img = await getImages(pokemonLv1);
		pokemonEvolutions.push([pokemonLv1, pokemonLv1Img]);

		const VALIDATION = data.chain.evolves_to;
		if (VALIDATION.length !== 0) {
			const pokemonLv2 = data.chain.evolves_to[0].species.name;
			const pokemonLv2Img = await getImages(pokemonLv2);
			pokemonEvolutions.push([pokemonLv2, pokemonLv2Img]);

			if (VALIDATION[0].evolves_to.length !== 0) {
				const pokemonLv3 =
					data.chain.evolves_to[0].evolves_to[0].species.name;
				const pokemonLv3Img = await getImages(pokemonLv3);
				pokemonEvolutions.push([pokemonLv3, pokemonLv3Img]);
			}
		}
		setPokemonEvolutions(pokemonEvolutions);
	};

	const getImages = async (name) => {
		const URL = `https://pokeapi.co/api/v2/pokemon/${name}/`;
		const res = await fetch(URL);
		const data = await res.json();
		return data.sprites.other['official-artwork'].front_default;
	};

	return (
		<>
			<div className={`card-container card${pokemonEvolutions.length}`}>
				{pokemonEvolutions.map((pokemon) => {
					return (
						<Card
							key={pokemon[0]}
							pokeName={pokemon[0]}
							pokeImg={pokemon[1]}
						/>
					);
				})}
			</div>
			<div className='buttons-container'>
				<Button
					icon={<TiArrowLeftOutline />}
					handleClick={() => {
						if (pokemonId > 1) setPokemonId(pokemonId - 1);
					}}
				/>
				<span className='pokemon-id'>{pokemonId}</span>
				<Button
					icon={<TiArrowRightOutline />}
					handleClick={() => {
						if (pokemonId < 469) setPokemonId(pokemonId + 1);
					}}
				/>
			</div>
		</>
	);
};

export { App };
