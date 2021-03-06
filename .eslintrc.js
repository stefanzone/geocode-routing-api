module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["simple-import-sort"],
	settings: {
		react: {
			version: "detect",
		},
	},
	env: {
		browser: true,
		amd: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:prettier/recommended", // Make sure this is always the last element in the array.
	],
	rules: {
		"prettier/prettier": [
			"error",
			{ endOfLine: "auto" },
			{ usePrettierrc: true },
		],
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"simple-import-sort/sort": "error",
		"jsx-a11y/anchor-is-valid": [
			"error",
			{
				components: ["Link"],
				specialLink: ["hrefLeft", "hrefRight"],
				aspects: ["invalidHref", "preferButton"],
			},
		],
	},
};
