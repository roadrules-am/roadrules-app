import { useEffect, useState } from "react";
import type { Card, CardStore } from "~/hooks/useCardStore";

type CardsGridProps = {
	cards: CardStore;
};

export default function CardsGrid({ cards }: CardsGridProps) {
	const [activeTab, setActiveTab] = useState<number | undefined>(undefined);
	const cardGroups: { id: number; cards: Card[] }[] = [];
	const groups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	for (const groupId of groups) {
		const cardsInGroup = Object.values(cards)
			.filter((card) => card.groupId === groupId)
			.sort((a, b) => a.cardId - b.cardId);
		if (cardsInGroup.length < 0) continue;
		cardGroups.push({
			id: groupId,
			cards: cardsInGroup,
		});
	}

	useEffect(() => {
		setActiveTab(cardGroups[0].id);
	}, []);

	function handleTabClick(groupId: number) {
		setActiveTab(groupId);
	}

	return (
		<div className="w-full">
			{cardGroups.map((group) => {
				if (!group.cards) return null;
				return (
					<button
						type="button"
						key={group.id}
						onClick={() => handleTabClick(group.id)}
					>
						{group.id}
					</button>
				);
			})}

			{/* Tab Content */}
			{cardGroups.map((group) => (
				<div
					className="flex flex-wrap flex-row justify-start p-2"
					key={group.id}
					style={{ display: activeTab === group.id ? "flex" : "none" }}
				>
					{group.cards.map((card) => {
						let color: string = "";
						const opacity = Math.floor(
							100 - (card.forgetProbability / 0.7) * 100,
						);
						if (card.forgetProbability > 0.7 && card.correctStreak !== null)
							color =
								"border-red-300 dark:border-red-700 rounded-full border-2";
						if (card.forgetProbability <= 0.7)
							color = `bg-green-300 dark:bg-green-700 rounded-sm opacity-[.${opacity}]`; // not working for some values!!
						return (
							<div
								key={card.cardId}
								className={`flex-none w-9 h-9 m-[calc((100%-288px)/16)] flex items-center justify-center ${color}`}
							>
								<a href={`/questions/${card.groupId}-${card.cardId}`}>
									{card.cardId}
								</a>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
