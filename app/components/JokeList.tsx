import React from 'react'
import { JokeListProps } from '@/types/types'

const JokeList = ({ jokes }: JokeListProps) => {
	if (!jokes.length) return null;

	return (
		<ul className='space-y-4'>
			{jokes.map((joke) => (
				<li key={joke.id} className='p-4 border rounded shadow'>
					<p>{joke.value}</p>
				</li>
			))}
		</ul>
	);
}

export default JokeList