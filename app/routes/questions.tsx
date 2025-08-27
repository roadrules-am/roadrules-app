import CardsGrid from "~/cardsGrid/cardsGrid";
import type { Route } from "./+types/questions";
import { cardStore } from "~/hooks/useCardStore";

export function meta() {
	return [
		{ title: "Вопросы – roadrules-am" },
		{
			name: "description",
			content: "Подготовься к теоретическому экзамену в Армении",
		},
	];
}

export async function clientLoader() {
	const { cards } = cardStore.getState();
	return cards;
}

export default function Questions({ loaderData }: Route.ComponentProps) {
	const cards = loaderData;
	return <CardsGrid cards={cards} />;
}
