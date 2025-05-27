import React, { useState } from 'react';
import Button from '@components/Button';
import { JokeListProps } from '@/types/types';
import textHighlight from '@/utils/textHighlight';

const JokeList = ({ jokes, searchQuery  }: JokeListProps) => {
	const [jokesCount, setJokesCount] = useState(5);

	if (!jokes.length) return null;

	const handleShowMore = () => setJokesCount((prev) => prev + 5);

	return (
		<>
			<ul className='space-y-4'>
				{jokes.slice(0, jokesCount).map((joke) => (
					<li key={joke.id} className='p-4 border rounded shadow'>
						<p>{textHighlight(joke.value, searchQuery)}</p>
					</li>
				))}
			</ul>
			{jokesCount < jokes.length && (
				<div className='flex justify-center mt-4'>
					<Button label='Mostrar mais resultados' onClick={handleShowMore} value='search' name='action' type='submit' />
				</div>
			)}
		</>
	);
};

export default JokeList;
