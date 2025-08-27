import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
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
	useEffect(() => {
		if (location.pathname === "/") {
			const cardId = getNextCardUUID();
			navigate(`/questions/${cardId}`);
		}
	}, [navigate, location]);

	return (
		<div>
			<a href="/">Тренажёр</a>
			<a href="/questions">Вопросы</a>
			<Outlet />
		</div>
	);
}
