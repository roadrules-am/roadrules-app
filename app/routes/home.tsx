import { useEffect } from "react";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import getNextCardUUID from "~/lib/getNextCard";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Тренажёр ПДД – roadrules-am" },
		{
			name: "description",
			content: "Подготовься к теоретическому экзамену в Армении",
		},
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	const cardId = getNextCardUUID();
	return cardId;
}

export default function Home({}: Route.ComponentProps) {
	const navigate = useNavigate();
	const cardId = getNextCardUUID();
	useEffect(() => {
		navigate(`/questions/${cardId}`);
	}, [cardId, navigate]);

	return <p>Загрузка</p>;
}
