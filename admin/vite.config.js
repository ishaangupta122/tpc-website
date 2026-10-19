import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
	// /mock holds the mock API shared by the admin and the website.
	resolve: {
		alias: { "@mock": fileURLToPath(new URL("../mock", import.meta.url)) },
	},
	server: { fs: { allow: [".."] } },
});
