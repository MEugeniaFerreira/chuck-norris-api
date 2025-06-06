import React, { useState } from 'react';
import Button from '@components/Button';
import { JokeListProps } from '@/types/types';
import textHighlight from '@/utils/textHighlight';

const JokeList = ({ jokes, searchQuery  }: JokeListProps) => {
	const [jokesCount, setJokesCount] = useState(5);

	if (!jokes.length) return null;

	const handleShowMore = () => setJokesCount((prev) => prev + 5);

	const filteredJokes = searchQuery.trim()
  ? jokes.filter((joke) => {
      const cleanedInput = searchQuery.trim().replace(/\s+/g, ' ');
      const escapedSearch = cleanedInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const regex = cleanedInput.includes(' ')
        ? new RegExp(`${escapedSearch}`, 'i') // busca por frase
        : new RegExp(`\\b${escapedSearch}\\b`, 'i'); // busca por palavra

      return regex.test(joke.value);
    })
  : jokes;

	return (
		<>
			<ul className='space-y-4'>
				{filteredJokes.slice(0, jokesCount).map((joke) => (
					<li key={joke.id} className='p-4 border rounded shadow'>
						<p dangerouslySetInnerHTML={{ __html: textHighlight(joke.value, searchQuery) }} />
					</li>
				))}
			</ul>

			{jokesCount < filteredJokes.length && (
				<div className='flex justify-center mt-4'>
					<Button label='Mostrar mais resultados' onClick={handleShowMore} value='search' name='action' type='submit' />
				</div>
			)}
		</>
	);
};

export default JokeList;
