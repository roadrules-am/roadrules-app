import type { Config } from "@react-router/dev/config";
import getCardsPaths from "./app/lib/getCardsPaths";

export default {
	// Config options...
	// Server-side render by default, to enable SPA mode set this to `false`
	ssr: false,
	async prerender() {
		const cardsPaths = getCardsPaths();
		return ["/", ...cardsPaths];
	},
} satisfies Config;
