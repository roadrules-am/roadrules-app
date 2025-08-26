import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	// route("/questions", "routes/questions.tsx"),
	route("/questions/:questionId", "routes/question.tsx"),
] satisfies RouteConfig;
