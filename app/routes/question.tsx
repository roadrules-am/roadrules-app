import Card from "~/card/card";
import type { Route } from "./+types/question";
import { useCardStore } from "~/hooks/useCardStore";

export function meta({ params }: Route.MetaArgs) {
	return [
		{ title: `${params.questionId} – roadrules-am` },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Question({ params }: Route.ComponentProps) {
	const { getCardById } = useCardStore();
	const cardData = getCardById(params.questionId);
	if (!cardData) return <p>error</p>;

	const {
		answerOptions,
		cardId,
		correctId,
		correctStreak,
		forgetProbability,
		groupId,
		question,
		imageId,
	} = cardData;
	return (
		<Card
			question={question}
			answers={answerOptions}
			cardId={cardId}
			correctId={correctId}
			correctStreak={correctStreak}
			forgetProbability={forgetProbability}
			groupId={groupId}
			imageId={imageId}
		/>
	);
}
