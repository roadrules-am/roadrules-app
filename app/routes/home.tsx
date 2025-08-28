import { useEffect } from "react";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router";
import getNextCardUUID from "~/lib/getNextCard";
import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "Тренажёр ПДД – roadrules-am" },
		{
			name: "description",
			content: "Подготовься к теоретическому экзамену в Армении",
		},
	];
}

export default function Home() {
	const location = useLocation();
	const navigate = useNavigate();
	const isQuestionCard = useMatch("/questions/:id");
	const isListCard = useMatch("/questions");
	let activePage: "card" | "cardList" | null = null;

	if (isListCard) activePage = "cardList";
	if (isQuestionCard) activePage = "card";

	useEffect(() => {
		if (location.pathname === "/") {
			const cardId = getNextCardUUID();
			navigate(`/questions/${cardId}`);
		}
	}, [navigate, location]);

	return (
		<div className="max-w-[450px] flex flex-wrap flex-row justify-start">
			<a
				href="/"
				className={`flex flex-none flex-grow-1 h-[48px] justify-center items-center ${activePage === "card" ? "border-b-4 border-blue-300 dark:border-blue-700" : ""}`}
			>
				Тренажёр
			</a>
			<a
				href="/questions"
				className={`flex flex-none h-[48px] flex-grow-1 justify-center items-center ${activePage === "cardList" ? "border-b-4 border-blue-300 dark:border-blue-700" : ""}`}
			>
				Вопросы
			</a>
			<Outlet />
		</div>
	);
}
