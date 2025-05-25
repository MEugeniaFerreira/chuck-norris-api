import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from '@components/Button'

describe('Button', () => {

  it('renderiza com o texto correto', () => {
    render(<Button label="Buscar" value="search" />);
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  it('aplica as classes corretas de estilo', () => {
    render(

      <Button
        label="Custom"
        value="custom"
        bgColor="bg-red-500"
        textColor="text-black"
        borderColor="border border-black"
      />
    );

    const button = screen.getByRole('button', { name: 'Custom' });
		
    expect(button).toHaveClass('bg-red-500');
    expect(button).toHaveClass('text-black');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-black');
  });

  it('envia o valor correto no form quando clicado', async () => {

    const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      expect((e.nativeEvent as SubmitEvent).submitter?.getAttribute('value')).toBe('random');
    });

    render(
      <form onSubmit={handleSubmit}>
        <Button label="Piadoca" value="random" />
      </form>
    );

    const button = screen.getByRole('button', { name: 'Piadoca' });
    await userEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});