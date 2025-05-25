import { render, screen } from '@testing-library/react';
import JokeList from '@components/JokeList';
import { JokeType } from '@/types/types';

const mockJokes: JokeType[] = [
  {
    id: '1',
    icon_url: '',
    url: 'https://api.chucknorris.io/jokes/1',
    value: 'Chuck Norris counted to infinity. Twice.',
  },
  {
    id: '2',
    icon_url: '',
    url: 'https://api.chucknorris.io/jokes/2',
    value: 'Chuck Norris can hear sign language.',
  },
];

describe('JokeList', () => {
  it('renderiza a lista das piadas', () => {
  
		render(<JokeList jokes={mockJokes} />);

    mockJokes.forEach((joke) => {
      expect(screen.getByText(joke.value)).toBeInTheDocument();
    });
  });

  it('não renderiza nada se a lista estiver vazia', () => {
    const { container } = render(<JokeList jokes={[]} />);
    expect(container.firstChild).toBeNull();
  });

	/* it('renderiza o link correto para cada piada', () => {
		render(<JokeList jokes={mockJokes} />);

		mockJokes.forEach((joke) => {
			const link = screen.getByRole('link', { name: joke.value });
			expect(link).toHaveAttribute('href', joke.url);
		});
	}); */
});