module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	globals: {
		module: true,
	},
	rules: {
		'@typescript-eslint/no-var-requires': 'off',
	},
}
