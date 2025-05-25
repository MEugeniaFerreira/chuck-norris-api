import type { FormEventHandler } from 'react';

export type SearchFormProps = {
  userQuery: string;
  onQueryChange: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export type JokeType = {
    id: string;
    icon_url: string;
    url: string;
    value: string;
};

export type JokeListProps = {
  jokes: JokeType[];
};

export type ButtonProps = {
	label: string;
	value: string;
	name?: string;
	bgColor?: string;
	textColor?: string;
	borderColor?: string;
};


