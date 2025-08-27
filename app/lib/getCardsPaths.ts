import cards from "../cardsData/cards";

export default function getCardsPaths() {
	const paths = Object.values(cards).map(
		(card) => `/questions/${card.group}-${card.numberPerGroup}`,
	);

	return paths;
}
