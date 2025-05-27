import DOMPurify from 'dompurify';

const textHighlight = (jokeFromAPI: string, inputFromUser: string): string => {
	if (!inputFromUser.trim()) return jokeFromAPI;

	// cleans up the input and splits it into an array of terms
	// ignores extra spaces
	const searchedTerms = inputFromUser
		.trim()
		.replace(/\s+/g, ' ')
		.split(' ')
		.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // escapa regex
		.join('|');
	// Replaces special characters with escaped versions

	if (searchedTerms.length === 0) return jokeFromAPI;

	// creates two regex patterns that matches the searched terms
	// 'g' makes the regex global so it will search through the entire text
	// 'i' (ignore case): makes the search case-insensitive

	const regex = new RegExp(`\\b(${searchedTerms})\\b`, 'gi');
	const checkExactMatch = new RegExp(`^\\b(${searchedTerms})\\b$`, 'i');

	// divides the text into parts interspersed with found terms
	const textParts = jokeFromAPI.split(regex);

	//detects if the 'part' is like the searched term
	//returns the array with strings and <mark> elements
	const textHighlightHTML = textParts.map((part) => (checkExactMatch.test(part) ? `<mark class="bg-yellow-300 font-semibold">${part}</mark>` : part)).join('');

  // sanitizes the HTML
	return DOMPurify.sanitize(textHighlightHTML);
};

export default textHighlight;
