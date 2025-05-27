import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchForm from '@components/SearchForm';
import { waitForElementToBeRemoved } from '@testing-library/react';

describe('SearchForm', () => {
	it('renderiza input e botões', () => {
		render(<SearchForm userQuery='' onQueryChange={() => {}} onSubmit={() => {}} />);
		expect(screen.getByPlaceholderText(/Digite uma palavra/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Me dê uma piada 🪄/i })).toBeInTheDocument();
	});

	it('chama onQueryChange quando o texto é digitado', async () => {
		let value = '';

		const handleQueryChange = jest.fn((v) => {
			value = v;
			rerender(<SearchForm userQuery={value} onQueryChange={handleQueryChange} onSubmit={() => {}} />);
		});
		const user = userEvent.setup();
		const { rerender } = render(<SearchForm userQuery={value} onQueryChange={handleQueryChange} onSubmit={() => {}} />);
		const input = screen.getByPlaceholderText(/Digite uma palavra/i);
		await user.type(input, 'chuck');

		expect(handleQueryChange).toHaveBeenCalledTimes(5);
		expect(handleQueryChange).toHaveBeenLastCalledWith('chuck');
		expect(handleQueryChange.mock.calls).toEqual([['c'], ['ch'], ['chu'], ['chuc'], ['chuck']]);
	});

	it('envia a query com o botão "Buscar"', async () => {
		const user = userEvent.setup();
		const handleSubmit = jest.fn((e, action) => {
			e.preventDefault();
			expect(action).toBe('search');
		});

		render(<SearchForm userQuery='' onQueryChange={() => {}} onSubmit={(e) => handleSubmit(e, 'search')} />);
		const searchButton = screen.getByRole('button', { name: /Buscar/i });
		await user.click(searchButton);

		expect(handleSubmit).toHaveBeenCalled();
	});

	it('envia a query com o botão "feeling lucky"', async () => {
		const user = userEvent.setup();

		const handleSubmit = jest.fn((e, action) => {
			e.preventDefault();
			expect(action).toBe('random');
		});

		render(<SearchForm userQuery='' onQueryChange={() => {}} onSubmit={(e) => handleSubmit(e, 'random')} />);
		
		const randomButton = screen.getByRole('button', { name: /Me dê uma piada 🪄/i });
		
		await user.click(randomButton);
		await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i));
		
		expect(handleSubmit).toHaveBeenCalled();
	});
});
