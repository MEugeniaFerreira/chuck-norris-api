import React from 'react';
import Button from '@components/Button';
import { SearchFormProps } from '@/types/types';

const SearchForm = ({ userQuery, onQueryChange, onAction }: SearchFormProps) => {
  return (
    <form className="flex flex-col sm:flex-row gap-2 mb-6" onSubmit={(e) => e.preventDefault()}>
      <input
        className="flex-1 p-2 border rounded"
        placeholder="Digite uma palavra"
        type="text"
        value={userQuery}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <Button label="Buscar" value="search" onClick={() => onAction('search')} />
      <Button label="Me dê uma piada 🪄" value="random" bgColor="bg-purple-700" onClick={() => onAction('random')} />
    </form>
  );
};

export default SearchForm;
