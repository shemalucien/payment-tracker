module.exports = {
  extends: [
    "@repo/eslint-config/next.js",
    "next" // Assuming this is the base Next.js configuration
  ],
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
};
