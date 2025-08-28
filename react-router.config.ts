import type { Config } from "@react-router/dev/config";
import getCardsPaths from "./app/lib/getCardsPaths";

export default {
	ssr: false,
	async prerender() {
		const cardsPaths = getCardsPaths();
		return ["/", "/questions", ...cardsPaths];
	},
} satisfies Config;
