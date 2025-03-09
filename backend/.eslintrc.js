module.exports = {
  env: {
    browser: true,
    node: true, // Set node to true since you're working with Node.js/Express
    es2021: true,
  },
  extends: [
    'airbnb-base', // Use the Airbnb base configuration, which is suitable for Node.js
    'prettier', // Ensures compatibility with Prettier
    'plugin:prettier/recommended', // Recommended Prettier configuration
  ],
  parserOptions: {
    ecmaVersion: 12, // ECMAScript version you're working with (2021)
    sourceType: 'module', // Use ES modules
  },

  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // Ensures consistent line endings
    'no-console': 'off', // Allows usage of console.log in your backend code (common in Express apps)
    'react/react-in-jsx-scope': 'off', // Next.js me React import zaroori nahi hota
    'import/prefer-default-export': 'off', // Default exports ko force nahi karega
    'no-underscore-dangle': 'off', // turn off the warning about the trailing underscore in _id or any other variable that has a _ as the first character.
  },
};
