import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/React-To-Do-List-App/", // Replace 'your-repo-name' with your actual repository name
});
