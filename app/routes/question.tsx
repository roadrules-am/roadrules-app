import Card from "~/card/question";
import type { Route } from "./+types/home";

export function meta({ params }: Route.MetaArgs) {
	return [
		{ title: `${params.questionId} – roadrules-am` },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Question({ params }: Route.ComponentProps) {
	return <Card question={params.questionId} />;
}
