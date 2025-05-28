import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';

jest.mock('@/services/index', () => ({
	fetchJokesByUserQuery: jest.fn(),
	fetchRandomJoke: jest.fn(),
}));

import { fetchJokesByUserQuery, fetchRandomJoke } from '@/services/index';

describe('Integração da Home', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

it('renderiza piadas buscadas', async () => {
  (fetchJokesByUserQuery as jest.Mock).mockResolvedValue([
    {
      id: '1',
/*       icon_url: '', */
/*       url: 'https://api.chucknorris.io/jokes/1', */
      value: 'Chuck Norris counted to infinity. Twice.',
    },
    {
      id: '2',
/*       icon_url: '', */
/*       url: 'https://api.chucknorris.io/jokes/2', */
      value: 'Chuck Norris can hear sign language.',
    },
  ]);

  render(<Home />);
  const user = userEvent.setup();

  await user.type(screen.getByPlaceholderText(/palavra/i), 'Chuck');
  await user.click(screen.getByRole('button', { name: /Buscar/i }));

     await waitForElementToBeRemoved(() => screen.getByText(/Carregando/i), {
      timeout: 4000,
    });

    expect(screen.getByText(/counted to infinity/i)).toBeInTheDocument();
    expect(screen.getByText(/can hear sign language/i)).toBeInTheDocument();
});

 it('renderiza piada aleatória', async () => {
    (fetchRandomJoke as jest.Mock).mockResolvedValue({
      id: '1',
      value: 'Chuck Norris is already dead. He just hasnt told anyone yet.',
    });

    render(<Home />);
    const user = userEvent.setup();

    // Clica no botão "Me dê uma piada 🪄"
    await user.click(screen.getByRole('button', { name: /Me dê uma piada 🪄/i }));

    // Espera o texto de carregando sumir
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando/i), { timeout: 4000 });

    // Aguarda a piada aleatória aparecer
    expect(screen.getByText(/already dead/i)).toBeInTheDocument();
  });
});
