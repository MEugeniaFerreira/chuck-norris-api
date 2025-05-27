import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../app/components/Button';

describe('Button', () => {
	it('renderiza botão com o texto correto', () => {
		render(<Button label='Buscar' value='search' />);
		expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
	});

	it('envia "random" no form quando botão random é clicado', async () => {
	const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	});

	render(
		<form onSubmit={handleSubmit}>
			<Button label='Me dê uma piada 🪄' value='random' name='action' />
		</form>
	);

	const user = userEvent.setup();
	await user.click(screen.getByRole('button', { name: 'Me dê uma piada 🪄' }));

	expect(handleSubmit).toHaveBeenCalledTimes(1);
});

	it('envia "search" no form quando botão search é clicado', async () => {
    const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    });

    render(
        <form onSubmit={handleSubmit}>
            <Button label='Buscar' value='search' name='action' />
        </form>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
});
});
