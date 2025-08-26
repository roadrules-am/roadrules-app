import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import cards from "~/cardsData/cards";

type Card = {
	question: string;
	answerOptions: string[];
	correctId: number;
	imageId?: number;
	groupId: number;
	cardId: number;
	correctStreak: number;
	forgetProbability: number;
};

type CardStore = {
	cards: Record<string, Card>;
};
type CardActions = {
	getCardById: (cardId: string) => Card | undefined;
};

export const useCardStore = create<CardStore & CardActions>()(
	persist(
		(set, get) => ({
			cards: getInitialState(cards),
			getCardById: (cardId: string) => {
				return get().cards[cardId];
			},
		}),
		{
			name: "cards-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

type CardData = {
	answer: number;
	group: number;
	img: string | null;
	numberPerGroup: number;
	options: string[];
	question: string;
};

function getInitialState(cards: Record<string, CardData>) {
	const CardState: Record<string, Card> = {};
	for (const [id, data] of Object.entries(cards)) {
		const { answer, group, numberPerGroup, options, question, img } = data;
		const newId = `${group}-${numberPerGroup}`;
		CardState[newId] = {
			question,
			answerOptions: options,
			correctId: answer - 1,
			imageId: img ? Number(id) : undefined,
			groupId: group,
			cardId: numberPerGroup,
			correctStreak: 0,
			forgetProbability: 1,
		};
	}
	return CardState;
}
