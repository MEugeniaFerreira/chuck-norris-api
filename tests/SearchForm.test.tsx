import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchForm from '@components/SearchForm';
import React from 'react';

describe('SearchForm', () => {
  it('renderiza input e botões', () => {
    render(<SearchForm userQuery='' onQueryChange={() => {}} onAction={() => {}} />);
    expect(screen.getByPlaceholderText(/Digite uma palavra/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Me dê uma piada 🪄/i })).toBeInTheDocument();
  });

  it('chama onQueryChange quando o texto é digitado', async () => {
    const handleQueryChange = jest.fn();
    const user = userEvent.setup();

    // estado controlado dentro do teste
    const Wrapper = () => {
      const [query, setQuery] = React.useState('');
      return (
        <SearchForm
          userQuery={query}
          onQueryChange={(text) => {
            handleQueryChange(text);
            setQuery(text); // atualiza o estado controlado
          }}
          onAction={() => {}}
        />
      );
    };

    render(<Wrapper />);
    const input = screen.getByPlaceholderText(/Digite uma palavra/i);

    await user.type(input, 'chuck');

    expect(handleQueryChange).toHaveBeenCalledTimes(5);
    expect(handleQueryChange).toHaveBeenLastCalledWith('chuck');
  });

  it('chama onAction com "search" ao clicar no botão Buscar', async () => {
    const handleAction = jest.fn();
    const user = userEvent.setup();
    render(<SearchForm userQuery='' onQueryChange={() => {}} onAction={handleAction} />);

    const searchButton = screen.getByRole('button', { name: /Buscar/i });
    await user.click(searchButton);

    expect(handleAction).toHaveBeenCalledTimes(1);
    expect(handleAction).toHaveBeenCalledWith('search');
  });

  it('chama onAction com "random" ao clicar no botão "Me dê uma piada 🪄"', async () => {
    const handleAction = jest.fn();
    const user = userEvent.setup();
    render(<SearchForm userQuery='' onQueryChange={() => {}} onAction={handleAction} />);

    const randomButton = screen.getByRole('button', { name: /Me dê uma piada 🪄/i });
    await user.click(randomButton);

    expect(handleAction).toHaveBeenCalledTimes(1);
    expect(handleAction).toHaveBeenCalledWith('random');
  });
});
