import { useState } from 'react'
import Button from '@components/Button'
import { SearchFormProps } from '@/types/types'

const SearchForm = ({ userQuery, onQueryChange, onSubmit }: SearchFormProps) => {

	const [buttonAction, setButtonAction] = useState<'search' | 'random'> ('search');
	
	return (
		<form onSubmit={(e) => onSubmit(e, buttonAction)} className='flex gap-2 mb-6'>
			<input
				type='text'
				value={userQuery}
				onChange={(e) => onQueryChange(e.target.value)}
				placeholder='Digite uma palavra e receba uma piada relacionada do Chuck Norris'
				className='flex-1 p-2 border rounded'
			/>
			<Button label='Buscar' value='search' onClick={() => setButtonAction('search')}/>
			<Button label='Quero uma piadoca agora!' value='random' onClick={() => setButtonAction('random')} bgColor='bg-green-600' />
      
		</form>
	);
}

export default SearchForm