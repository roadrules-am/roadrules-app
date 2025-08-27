import { cardStore } from "~/hooks/useCardStore";

export default function getNextCardUUID() {
	const { cards } = cardStore.getState();
	const cardsByFP = Object.values(cards).sort(
		(a, b) => b.forgetProbability - a.forgetProbability,
	);
	return `${cardsByFP[0].groupId}-${cardsByFP[0].cardId}`;
}
