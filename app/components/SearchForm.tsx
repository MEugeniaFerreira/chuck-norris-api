import React from 'react';
import Button from '@components/Button';
import { SearchFormProps } from '@/types/types';

const SearchForm = ({ userQuery, onQueryChange, onSubmit }: SearchFormProps) => {
	return (
		<form onSubmit={onSubmit} className='flex gap-2 mb-6' role='form'>
			<input type='text' value={userQuery} onChange={(e) => onQueryChange(e.target.value)} placeholder='Digite uma palavra e receba uma piada relacionada do Chuck Norris' className='flex-1 p-2 border rounded' />

			<Button label='Buscar' value='search' name='action' type='submit' />
			<Button label='Piadoca' value='random' name='action' bgColor='bg-green-600' type='submit' />
			
		</form>
	);
};

export default SearchForm;
