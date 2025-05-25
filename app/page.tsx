'use client';
import { useState } from 'react';
import { JokeType } from '@/types/types';
import SearchForm from '@components/SearchForm';
import JokeList from '@components/JokeList';

export default function Home() {
	const [userQuery, setUserQuery] = useState('');
	const [queryResults, setQueryResults] = useState<JokeType[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(''); // initialize error state as empty string

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(''); // reset error state before fetching

  // Get which button was used to submit
  const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
  const queryInput = submitter?.value || '';

		try {
			if (queryInput === 'random') {
				const response = await fetch('https://api.chucknorris.io/jokes/random');

				if (!response.ok) throw new Error('Erro ao buscar piada aleatória. Tente novamente');
				
        const joke = await response.json();
				setQueryResults([joke]); // diretamente define o resultado

			} else if (queryInput === 'search') {
				const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${userQuery}`);

				if (!response.ok) throw new Error('Ops! Algo deu errado com a sua pesquisa. Por favor, tente novamente.');

				const data = await response.json();

				if (data.result.length === 0) {
					setError('Nenhum resultado encontrado');
				}

				setQueryResults(data.result);
			}
		} catch (err) {

			if (err instanceof Error) { // err is an instance of Error to ensure we can access message
				setError(err.message); // err instanceof Error ensures that err is actually an Error object so we can access properties like err.message

			} else {
				setError('Ops! Algo deu errado. Por favor, tente novamente.');
			}

		} finally {
			setLoading(false);
		}
	};

	return (
		<main className='max-w-2xl mx-auto px-4 py-10'>
			
      <h1 className='text-3xl font-bold text-center mb-6'>Buscador de Piadas do Chuck</h1>
			
      <SearchForm userQuery={userQuery} onQueryChange={setUserQuery} onSubmit={handleSearch} />
			
      {loading && <p className='text-center'>Carregando...</p>}
			{error && <p className='text-center text-red-600'>{error}</p>}
			
      <JokeList jokes={queryResults} />
      
		</main>
	);
}
