import React from 'react'
import { ButtonProps } from '@/types/types'

const Button = ({
	label,
	value,
	name = 'action',
	bgColor = 'bg-blue-600',
	textColor = 'text-white',
	borderColor = '',
}: ButtonProps) => {
  return (
    <button
			type='submit'
			name={name}
			value={value}
			className={`${bgColor} ${textColor} ${borderColor} px-4 py-2 rounded`}
		>
			{label}
		</button>
  )
}

export default Button