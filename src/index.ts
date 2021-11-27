const path = require('path')
const inquirer = require('inquirer')
import {templateHandler} from './handlers/index.handler'

let typeInfo = {}
let answerData = {}

const applicationInfoPrompts = [
	{
		type: 'input',
		name: 'PKG_NAME',
		message: '请输入应用名称',
		default: 'my-app'
	},
	{
		type: 'input',
		name: 'PKG_DESC',
		message: '请输入应用描述',
		default: 'my-app'
	},
	{
		type: 'input',
		name: 'PKG_VERSION',
		message: '请输入应用初始版本',
		default: '0.0.1'
	}
]

inquirer.prompt([{
		type: 'list',
		choices: [{
			name: '空项目',
			value: 'EMPTY'
		},'工具类', '组件库', '业务应用'],
		name: 'PKG_TYPE',
		message: '请选择你想创建的模版应用',
		default: []
	}
]).then(answers=>{

	const { PKG_TYPE } = answers
	if (['EMPTY', 'LIB'].includes(PKG_TYPE) ) {
		return new Promise((resolve)=>{
			inquirer.prompt(applicationInfoPrompts).then((curAnswers)=>{
				resolve({
					...answers,
					...curAnswers
				})
			})
		})
	} else {
		Promise.reject()
		console.error(`不支持的应用类型: ${PKG_TYPE}`)
		process.exit()
	}
}).then((answers) => {
	answerData = {
		...answerData,
		...answers
	}
	const {
		PKG_TYPE
	} = answers

	const templatePromtQuestions: any = [
		{
			type: 'list',
			name: 'PKG_TEMPLATE',
			choices: ['默认模版'],
			message: '请选择模版',
			default: '默认模版'
		}
	]

	if (PKG_TYPE === 'EMPTY') {
		templatePromtQuestions[0] = {
			...templatePromtQuestions[0],
			choices: [{
				name: '默认模版',
				value: 'EMPTY_DEFAULT'
			}],
			default: 'EMPTY_DEFAULT'
		}
	}
	else if (PKG_TYPE === 'LIB') {
		templatePromtQuestions[0] = {
			...templatePromtQuestions[0],
			choices: ['rollup + ts 模版'],
			default: 'rollup + ts模版'
		}
	} else {
		console.error(`不支持的应用类型: ${PKG_TYPE}`);
		process.exit()
	}

	inquirer.prompt(templatePromtQuestions).then((pkgTemplateAnswers) => {
		templateHandler({
			...answerData,
			...pkgTemplateAnswers
		})
	})
})
