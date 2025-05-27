export type SearchFormProps = {
  userQuery: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type JokeType = {
    id: string;
    icon_url: string;
    url: string;
    value: string;
};

export type JokeListProps = {
  jokes: JokeType[];
  searchQuery: string;
};

export type ButtonProps = {
	 label: string;
    value: string;
    name?: string;
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    type?: 'submit' | 'button' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};


