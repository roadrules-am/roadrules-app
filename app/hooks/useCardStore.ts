import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import cards from "~/cardsData/cards";

export type Card = {
	question: string;
	answerOptions: string[];
	correctId: number;
	imageId?: number;
	groupId: number;
	cardId: number;
	correctStreak: number | null;
	forgetProbability: number;
};

export type CardStore = Record<string, Card>;
type CardActions = {
	getCardById: (cardId: string) => Card | undefined;
	setCardFP: (cardId: string, newFP: number) => void;
	setCardStreak: (cardId: string, newStreak: number) => void;
};

type CardStoreFull = {
	cards: CardStore;
} & CardActions;

export const useCardStore = create<CardStoreFull>()(
	persist(
		(set, get) => ({
			cards: getInitialState(cards),
			getCardById: (cardId: string) => {
				return get().cards[cardId];
			},
			setCardFP: (cardId: string, newFP: number) => {
				set((state) => ({
					cards: {
						...state.cards,
						[cardId]: {
							...state.cards[cardId],
							forgetProbability: newFP,
						},
					},
				}));
			},
			setCardStreak: (cardId: string, newStreak: number) => {
				set((state) => ({
					cards: {
						...state.cards,
						[cardId]: {
							...state.cards[cardId],
							correctStreak: newStreak,
						},
					},
				}));
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
			correctStreak: null,
			forgetProbability: 1,
		};
	}
	return CardState;
}

export const cardStore = useCardStore;
