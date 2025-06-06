import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["aws-amplify", "@aws-amplify/api", "@aws-amplify/ui-react"],
  },
});
