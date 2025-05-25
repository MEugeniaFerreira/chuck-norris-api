import { JokeType } from '@/types/types';

const BASE_URL = 'https://api.chucknorris.io/jokes';

export const fetchRandomJoke = async (): Promise<JokeType> => {
  const response = await fetch(`${BASE_URL}/random`);

  if (!response.ok) {
    throw new Error('Erro ao buscar piada aleatória. Tente novamente.');
  }
  
  const joke: JokeType = await response.json();
  return joke;
  
};

export const fetchJokesByUserQuery = async (query: string): Promise<JokeType[]> => {
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error('Ops! Algo deu errado com a sua pesquisa. Por favor, tente novamente.');
  }

  const data = await response.json();

  if (!data.result || data.result.length === 0) {
    throw new Error('Não encontramos nenhuma piada :(');
  }

  return data.result;
};