import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TelegramComments } from "react-telegram-comments";
import { useCardStore } from "~/hooks/useCardStore";
import getNextCardUUID from "~/lib/getNextCard";

type CardProps = {
	question: string;
	answers: string[];
	correctId: number;
	groupId: number;
	cardId: number;
	correctStreak: number | null;
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
	correctStreak,
	forgetProbability,
}: CardProps) {
	const { setCardFP, setCardStreak } = useCardStore();

	const cardUuid = `${groupId}-${cardId}`;
	function handleAnswer(isCorrect: boolean) {
		if (isCorrect) {
			const newFP = correctStreak === null ? 0.3 : 1 / (1.05 + correctStreak);
			const newStreak = correctStreak === null ? 3 : correctStreak + 1;

			setCardFP(cardUuid, newFP);
			setCardStreak(cardUuid, newStreak);
		} else {
			setCardFP(cardUuid, 1);
			setCardStreak(cardUuid, 0);
		}
	}

	return (
		<div className="w-full max-w-[420px] flex flex-col mb-[60px]">
			<p className="px-2 text-sm my-1">
				Г{groupId} В{cardId}, FP: {forgetProbability} CS: {correctStreak}
			</p>
			{imageId && (
				<img
					src={`/card-img/${imageId}.png`}
					alt="illustration for card"
					className="max-h-[220px] my-1 hidden w-full dark:block"
				/>
			)}
			<h2 className="px-4 my-2 text-md font-bold">{question}</h2>
			<AnswersGroup
				key={cardUuid}
				answerOptions={answers}
				correctId={correctId}
				onAnswer={handleAnswer}
			/>
			<TelegramComments websiteKey={"yqxQuEh8"} />
		</div>
	);
}

type NextPanelProps = {
	onNextCard: () => void;
	isVisible: boolean;
};

function NextPanel({ onNextCard, isVisible }: NextPanelProps) {
	return (
		<div
			className={`fixed bottom-0 left-0 w-full px-1 py-2 ${isVisible ? "" : "hidden"}`} // i need it to be fixed
		>
			<button
				className="px-3 rounded-full flex flex-row h-[48px] w-full justify-center items-center active:bg-blue-600 hover:cursor-pointer bg-blue-400 dark:bg-blue-700"
				type="button"
				onClick={onNextCard}
			>
				Следующий
			</button>
		</div>
	);
}

type AnswersGroupProps = {
	answerOptions: string[];
	correctId: number;
	onAnswer: (isCorrect: boolean) => void;
};
function AnswersGroup({
	answerOptions,
	correctId,
	onAnswer,
}: AnswersGroupProps) {
	const [isAnswered, setIsAnswered] = useState(false);
	const navigate = useNavigate();

	function handleAnswer(isCorrect: boolean) {
		setIsAnswered(true);
		onAnswer(isCorrect);
	}

	function handleNextCard() {
		navigate(`/questions/${getNextCardUUID()}`);
		setIsAnswered(false);
	}

	return (
		<div className="w-full flex flex-col gap-2 px-1 my-2">
			{answerOptions.map((option, id) => {
				const isCorrect = correctId === id;
				return (
					<AnswerOption
						key={option}
						text={option}
						isAnswered={isAnswered}
						isCorrect={isCorrect}
						handleAnswer={() => handleAnswer(isCorrect)}
					/>
				);
			})}
			<NextPanel isVisible={isAnswered} onNextCard={handleNextCard} />
		</div>
	);
}

type AnswerOptionProps = {
	handleAnswer: () => void;
	isCorrect: boolean;
	text: string;
	isAnswered: boolean;
};
function AnswerOption({
	isCorrect,
	handleAnswer,
	text,
	isAnswered,
}: AnswerOptionProps) {
	const [isClicked, setIsClicked] = useState(false);

	let answeredStyle: string = "";
	if (isAnswered && isCorrect) {
		answeredStyle = "bg-green-100 dark:bg-green-900 border-transparent";
	} else if (isAnswered && isClicked && !isCorrect) {
		answeredStyle = "bg-red-100 dark:bg-red-900 border-transparent";
	} else {
		answeredStyle = "dark:border-neutral-800 border-neutral-300";
	}

	useEffect(() => {
		if (!isAnswered) setIsClicked(false);
	}, [isAnswered]);

	function handleClick() {
		handleAnswer();
		setIsClicked(true);
	}

	return (
		<button
			type="button"
			disabled={isAnswered}
			className={`${isAnswered ? answeredStyle : "dark:border-neutral-700 border-neutral-400"} text-md flex flex-col  min-h-[48px]  p-3 border-2 rounded-md text-left`}
			onClick={handleClick}
			key={text}
		>
			{text}
		</button>
	);
}
