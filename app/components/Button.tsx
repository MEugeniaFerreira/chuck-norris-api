import React from 'react'
import { ButtonProps } from '@/types/types'

const Button = ({
  label,
  value,
  name = 'action',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  borderColor = '',
  type = 'submit',
  onClick
}: ButtonProps) => (
  <button
    type={type}
    name={name}
    value={value}
    onClick={onClick}
    className={`${bgColor} ${textColor} ${borderColor} px-4 py-2 rounded`}
  >
    {label}
  </button>
);

export default Button