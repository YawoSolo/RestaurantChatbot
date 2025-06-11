import { defineConfig } from "vitest/config";
console.log("✅ Using vitest.config.js");
export default defineConfig({
  test: { environment: "jsdom", setupFiles: "./setupTests.js" },
});
