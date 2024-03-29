const inquirer = require('inquirer')
import { templateHandler } from './handlers/index.handler'
import { PKG_TYPE_LIST } from './config/promts'

let answerData = {}

const applicationInfoPrompts = [
	{
		type: 'input',
		name: 'PKG_NAME',
		message: '请输入应用名称',
		default: 'my-app',
	},
	{
		type: 'input',
		name: 'PKG_DESC',
		message: '请输入应用描述',
		default: 'my-app',
	},
	{
		type: 'input',
		name: 'PKG_VERSION',
		message: '请输入应用初始版本',
		default: '0.0.1',
	},
]

inquirer
	.prompt([
		{
			type: 'list',
			choices: PKG_TYPE_LIST,
			name: 'PKG_TYPE',
			message: '请选择你想创建的模版应用',
			default: [],
		},
	])
	.then(answers => {
		const PKG_TYPE_NAMES = PKG_TYPE_LIST.map(item => item.value)

		const { PKG_TYPE } = answers
		if (PKG_TYPE_NAMES.includes(PKG_TYPE)) {
			return new Promise(resolve => {
				inquirer.prompt(applicationInfoPrompts).then(curAnswers => {
					resolve({
						...answers,
						...curAnswers,
					})
				})
			})
		} else {
			Promise.reject()
			console.error(`不支持的应用类型: ${PKG_TYPE}`)
			process.exit()
		}
	})
	.then(answers => {
		answerData = {
			...answerData,
			...answers,
		}
		const { PKG_TYPE } = answers

		const templatePromtQuestions: any = [
			{
				type: 'list',
				name: 'PKG_TEMPLATE',
				choices: ['默认模版'],
				message: '请选择模版',
				default: '默认模版',
			},
		]

		if (PKG_TYPE === 'EMPTY') {
			templatePromtQuestions[0] = {
				...templatePromtQuestions[0],
				choices: [
					{
						name: '默认模版',
						value: 'EMPTY_DEFAULT',
					},
				],
				default: 'EMPTY_DEFAULT',
			}
		} else if (PKG_TYPE === 'PLUGIN') {
			templatePromtQuestions[0] = {
				...templatePromtQuestions[0],
				choices: [
					{
						name: 'taro 2.x 插件模版',
						value: 'PLUGIN_TARO2',
					},
					{
						name: 'taro 3.x 插件模版',
						value: 'PLUGIN_TARO3',
					},
				],
				default: 'PLUGIN_TARO2',
			}
			templatePromtQuestions.push({
				type: 'list',
				name: 'TARO_VERSION',
				choices: [
					'3.5.5',
					'2.2.18',
					'2.2.17',
					'2.2.16',
					'2.2.15',
					'2.2.14',
					'2.2.13',
					'2.2.12',
					'2.2.11',
					'2.2.10',
					'2.2.9',
					'2.2.8',
					'2.2.7',
					'2.2.6',
					'2.2.5',
					'2.2.4',
					'2.2.3',
					'2.2.2',
					'2.2.1',
					'2.2.0',
				],
				message: '请选择 Taro 版本',
				default: '2.2.18',
			})
		} else if (PKG_TYPE === 'LIB') {
			templatePromtQuestions[0] = {
				...templatePromtQuestions[0],
				choices: [
					{
						name: 'rollup + ts 模版',
						value: 'ROLLUP_TS',
					},
				],
				default: 'ROLLUP_TS',
			}
		} else if (PKG_TYPE === 'DOCS') {
			templatePromtQuestions[0] = {
				...templatePromtQuestions[0],
				choices: [
					{
						name: 'docsify',
						value: 'DOCS_DOCSIFY',
					},
				],
				default: 'DOCS_DOCSIFY',
			}
		} else if (PKG_TYPE === 'APPLICATION') {
			templatePromtQuestions[0] = {
				...templatePromtQuestions[0],
				choices: [
					{
						name: 'vite + react + antd',
						value: 'VITE_REACT_ANTD_ADMIN',
					},
				],
				default: 'VITE_REACT_ANTD_ADMIN',
			}
		} else {
			console.error(`不支持的应用类型: ${PKG_TYPE}`)
			process.exit()
		}

		inquirer.prompt(templatePromtQuestions).then(pkgTemplateAnswers => {
			templateHandler({
				...answerData,
				...pkgTemplateAnswers,
			})
		})
	})
