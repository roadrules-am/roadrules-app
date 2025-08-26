import type { Route } from "./+types/home";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Тренажер ПДД – roadrules-am" },
		{
			name: "description",
			content: "Подготовься к теоретическому экзамену в Армении",
		},
	];
}

export async function loader({ params }: Route.LoaderArgs) {
	const cardId = 12;
	return redirect(`/questions/${cardId}`);
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return <p>cardID {loaderData.cardId}</p>;
}
