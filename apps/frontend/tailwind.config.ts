import type { Config } from "tailwindcss/types/config";

import shared from "@repo/ui/tailwind-shared";

export default {
	...shared,
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx,jsx,tsx}",
		"./app/**/*.{ts,tsx,jsx,tsx}",
		"./src/**/*.{ts,tsx,jsx,tsx}",
		"../../packages/ui/src/components/**/*.{ts,tsx}",
		"./modules",
	],
} satisfies Config;
