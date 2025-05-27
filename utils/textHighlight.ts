const textHighlight = (text: string, inputFromUser: string): string => {
	if (!inputFromUser.trim()) return text;

  // cleans up the input and splits it into an array of terms
  // ignores extra spaces
	const searchedTerms = inputFromUser
		.trim()
		.split(/\s+/)
		.map((inputFromUser) => inputFromUser.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); 
    // Replaces special characters with escaped versions

	if (searchedTerms.length === 0) return text;

	// creates a regex pattern that matches any of the searched terms 
	const regex = new RegExp(`(${searchedTerms.join('|')})`, 'gi');

  // divides the text into parts interspersed with found terms
	const textParts = text.split(regex);

	//detects if the 'part' is like the searched term
	//returns the array with strings and <mark> elements
	return textParts.map((part) => (regex.test(part) ? `<mark class="bg-yellow-300 font-semibold">${part}</mark>` : part)).join('');
};

export default textHighlight;
