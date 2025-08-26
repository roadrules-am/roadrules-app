import { useState } from "react";

type CardProps = {
	question: string;
	answers: string[];
	correctId: number;
	groupId: number;
	cardId: number;
	correctStreak: number;
	forgetProbability: number;
	imageId?: number;
};
export default function Card({
	question,
	cardId,
	groupId,
	imageId,
	answers,
	correctId,
}: CardProps) {
	return (
		<div className="container-fluid">
			<p>
				Г{groupId} В{cardId}
			</p>
			{imageId && (
				<img
					src={`/card-img/${imageId}.png`}
					alt="illustration for card"
					className="hidden w-full dark:block"
				/>
			)}
			<p>{question}</p>
			<AnswersGroup
				answerOptions={answers}
				correctId={correctId}
				onAnswer={() => console.log(1)}
			/>
			<NextPanel />
		</div>
	);
}

function NextPanel() {
	return (
		<div className="w-full">
			<button type="button" className="container-fluid">
				Следующий
			</button>
		</div>
	);
}

type AnswersGroupProps = {
	answerOptions: string[];
	correctId: number;
	onAnswer: () => void;
};
function AnswersGroup({
	answerOptions,
	correctId,
	onAnswer,
}: AnswersGroupProps) {
	const isAnswered = useState(false);

	return (
		<div className="w-full flex flex-col">
			{answerOptions.map((option, id) => (
				<div tabIndex={id} onClick={onAnswer} key={option}>
					{option}
				</div>
			))}
		</div>
	);
}

// function AnswerOption(text ref correct) {
//   isAnswered setIsAnswered

//   if aswered - change styling and clickability, depending on isCorrect

//   return
// }
