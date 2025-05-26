import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../app/components/Button';

describe('Button', () => {
	it('renderiza botão com o texto correto', () => {
		render(<Button label='Buscar' value='search' />);
		expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
	});

	it('aplica as classes de estilo', () => {
		render(<Button label='Custom' value='custom' bgColor='bg-red-500' textColor='text-black' borderColor='border border-black' />);

		const button = screen.getByRole('button', { name: 'Custom' });

		expect(button).toHaveClass('bg-red-500');
		expect(button).toHaveClass('text-black');
		expect(button).toHaveClass('border');
		expect(button).toHaveClass('border-black');
	});

	it('envia "random" no form quando botão random é clicado', async () => {
		const handleSubmit = jest.fn((e, action) => {
			e.preventDefault();
			expect(action).toBe('random');
		});

		render(
			<form onSubmit={(e) => handleSubmit(e, 'random')}>
				<Button label='Me dê uma piada 🪄' value='random' name='action' />
			</form>
		);

		const user = userEvent.setup();
		await user.click(screen.getByRole('button', { name: 'Me dê uma piada 🪄' }));

		expect(handleSubmit).toHaveBeenCalledTimes(1);
	});

	it('envia "search" no form quando botão search é clicado', async () => {
		const handleSubmit = jest.fn((e, action) => {
			e.preventDefault();
			expect(action).toBe('search');
		});

		render(
			<form onSubmit={(e) => handleSubmit(e, 'search')}>
				<Button label='Buscar' value='search' name='action' />
			</form>
		);

		const user = userEvent.setup();
		await user.click(screen.getByRole('button', { name: 'Buscar' }));

		expect(handleSubmit).toHaveBeenCalledTimes(1);
	});
});
