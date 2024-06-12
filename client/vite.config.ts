import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import process from "process"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		"process.env": process.env,
	},
	server: {
		host: true,
		proxy: {
			"/api": "http://localhost:5050",
		},
	},
	base: "./",
})
