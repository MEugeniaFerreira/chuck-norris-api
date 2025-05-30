'use client';

import { useState } from 'react';
import Image from 'next/image';
import { JokeType } from '@/types/types';
import SearchForm from '@components/SearchForm';
import JokeList from '@components/JokeList';
import { fetchRandomJoke, fetchJokesByUserQuery } from '@/services/index';

const Home = () => {
	const [userQuery, setUserQuery] = useState('');
	const [queryResults, setQueryResults] = useState<JokeType[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(''); // initialize error state as empty string
	const [hasSearched, setHasSearched] = useState(false);

	const handleSearch = async (action: 'search' | 'random') => {
  setLoading(true);
  setError('');

  try {
    if (action === 'search') {
      const jokes = await fetchJokesByUserQuery(userQuery);
      setQueryResults(jokes);
      setHasSearched(true);
    } else if (action === 'random') {
      const joke = await fetchRandomJoke();
      setUserQuery('');
      setQueryResults([joke]);
      setHasSearched(true);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Ops! Algo deu errado');
  } finally {
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
  }
};

	const handleQueryChange = (query: string) => {
		setUserQuery(query);
		setQueryResults([]); // clean the list when the user types
		setHasSearched(false); // prevents showing results before search
		setLoading(false); // reset loading state
	};

	return (
		<main className='max-w-2xl mx-auto px-4 py-10'>
			<h1 className='text-3xl font-bold text-center mb-10'>Buscador de Piadas do Chuck Norris</h1>

			<SearchForm userQuery={userQuery} onQueryChange={handleQueryChange} onAction={handleSearch} />

			{loading && (
				<p className='text-center flex items-center justify-center gap-2 mb-4'>
					<Image src='/chuckgif.gif' alt='Carregando' width={50} height={50} className='w-8 h-8 inline-block' unoptimized />
					Carregando...
				</p>
			)}
			{error && <p className='text-center text-red-600'>{error}</p>}

			{hasSearched && <JokeList jokes={queryResults} searchQuery={userQuery} />}
		</main>
	);
};

export default Home;
