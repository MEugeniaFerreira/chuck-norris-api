/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import * as api from '@/services/index';

jest.mock('@/services/index', () => ({
    fetchRandomJoke: jest.fn(),
    fetchJokesByUserQuery: jest.fn(),
}));

const mockedFetchRandomJoke = api.fetchRandomJoke as jest.Mock;
const mockedFetchJokesByUserQuery = api.fetchJokesByUserQuery as jest.Mock;

const mockJokes = [
    {
        id: '1',
        icon_url: 'https://mock.url/1.png',
        url: 'https://mock.url/1',
        value: 'Mocked joke one',
    },
    {
        id: '2',
        icon_url: 'https://mock.url/2.png',
        url: 'https://mock.url/2',
        value: 'Mocked joke two',
    },
];

beforeAll(() => {
    mockedFetchJokesByUserQuery.mockResolvedValue([]);
    mockedFetchRandomJoke.mockResolvedValue({
        id: '0',
        icon_url: '',
        url: '',
        value: '',
    });
});

describe('Home Integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedFetchJokesByUserQuery.mockResolvedValue([]);
        mockedFetchRandomJoke.mockResolvedValue({
            id: '0',
            icon_url: '',
            url: '',
            value: '',
        });
    });

    it('shows a random joke when "Piadoca" is clicked', async () => {
        mockedFetchRandomJoke.mockResolvedValueOnce({
            id: '3',
            icon_url: 'https://mock.url/3.png',
            url: 'https://mock.url/3',
            value: 'Random mocked joke',
        });

    	render(<Home />);
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', { name: /Piadoca/i }));

        expect(await screen.findByText(/Random mocked joke/i)).toBeInTheDocument();
    });

    it('shows API error message when search fails', async () => {
        mockedFetchJokesByUserQuery.mockRejectedValueOnce(new Error('Falha mockada'));

        render(<Home />);
        const user = userEvent.setup();

        await user.type(screen.getByRole('textbox'), 'mock');
        await user.click(screen.getByRole('button', { name: /Buscar/i }));

        expect(await screen.findByText(/Falha mockada/i)).toBeInTheDocument();
    });

    it('shows generic error when unknown error occurs', async () => {
        mockedFetchJokesByUserQuery.mockRejectedValueOnce('Erro qualquer');

        render(<Home />);
        const user = userEvent.setup();

        await user.type(screen.getByRole('textbox'), 'mock');
        await user.click(screen.getByRole('button', { name: /Buscar/i }));

        expect(
            await screen.findByText((_, el) => !!el?.textContent?.includes('Ops! Algo deu errado'))
        ).toBeInTheDocument();
    });

    it('renders multiple jokes after successful search', async () => {
        mockedFetchJokesByUserQuery.mockResolvedValueOnce(mockJokes);

        render(<Home />);
        const user = userEvent.setup();

        await user.type(screen.getByRole('textbox'), 'mock');
        await user.click(screen.getByRole('button', { name: /Buscar/i }));

        expect(await screen.findByText(/Mocked joke one/i)).toBeInTheDocument();
        expect(screen.getByText(/Mocked joke two/i)).toBeInTheDocument();
    });
});
