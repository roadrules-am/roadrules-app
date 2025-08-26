type CardProps = {
	question: string;
	answers: string[];
	correctId: number;
	groupId: number;
	cardId: number;
	correctStreak: number;
	forgetProbability: number;
};
export default function Card({ question }: CardProps) {
	return <p>{question}</p>;
}
