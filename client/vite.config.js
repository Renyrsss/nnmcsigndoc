import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 4000, // укажи свой порт
    },
    plugins: [react(), tailwindcss()],
});
