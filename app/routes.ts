import type { RouteConfig } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
	route("/", "routes/home.tsx", [
		route("/questions/:questionId", "routes/question.tsx"),
		route("/questions/", "routes/questions.tsx"),
	]),
] satisfies RouteConfig;
