import React from 'react'
import { SearchFormProps } from '@/types/types'
import Button from '@components/Button'

const SearchForm = ({ userQuery, onQueryChange, onSubmit }: SearchFormProps) => {
	return (
		<form onSubmit={onSubmit} className='flex gap-2 mb-6'>
			<input
				type='text'
				value={userQuery}
				onChange={(e) => onQueryChange(e.target.value)}
				placeholder='Digite uma palavra e receba uma piada relacionada do Chuck Norris'
				className='flex-1 p-2 border rounded'
			/>
			<Button label='Buscar' value='search' />
			<Button label='Quero uma piadoca agora!' value='random' bgColor='bg-green-600' />
      
		</form>
	);
}

export default SearchForm