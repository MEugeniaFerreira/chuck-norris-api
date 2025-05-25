import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchForm from '@components/SearchForm';

describe('SearchForm', () => {
	it('renderiza input e botões', () => {
		render(<SearchForm userQuery='' onQueryChange={() => {}} onSubmit={() => {}} />);

		expect(screen.getByPlaceholderText(/Digite uma palavra/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Quero uma piadoca/i })).toBeInTheDocument();
	});

	it('chama onQueryChange quando o texto é digitado', async () => {
		const handleQueryChange = jest.fn();
		const user = userEvent.setup();

		render(<SearchForm userQuery='' onQueryChange={handleQueryChange} onSubmit={() => {}} />);

		const input = screen.getByPlaceholderText(/Digite uma palavra/i);
		await user.type(input, 'chuck');

		expect(handleQueryChange).toHaveBeenCalledTimes(5); // "chuck" = 5 letras
		expect(handleQueryChange).toHaveBeenLastCalledWith('chuck');
		expect(handleQueryChange.mock.calls).toEqual([['c'], ['ch'], ['chu'], ['chuc'], ['chuck']]);
	});

	it('envia a query com o botão "Buscar"', async () => {
		const user = userEvent.setup();

		const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
			expect(submitter?.value).toBe('search');
		});

		render(<SearchForm userQuery='norris' onQueryChange={() => {}} onSubmit={handleSubmit} />);

		const searchButton = screen.getByRole('button', { name: /Buscar/i });
		await user.click(searchButton);

		expect(handleSubmit).toHaveBeenCalled();
	});

	it('envia a query com o botão "Quero uma piadoca agora!"', async () => {
		const user = userEvent.setup();

		const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
			expect(submitter?.value).toBe('random');
		});

		render(<SearchForm userQuery='' onQueryChange={() => {}} onSubmit={handleSubmit} />);

		const randomButton = screen.getByRole('button', { name: /piadoca/i });
		await user.click(randomButton);

		expect(handleSubmit).toHaveBeenCalled();
	});
});
