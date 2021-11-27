const path = require('path')
// const inquirer = require('inquirer')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const fs = require('fs')
const HandleBars = require('handlebars')
import {isDirectory} from './utils/isDirectory'
import { deleteDirectory } from './utils/deleteDir'
import { templateList } from './config/templates'
import { RollupTsHandlers } from './handlers/lib/rollup_ts.handler'
import { EmptyHandler } from './handlers/empty/empty.handlers'

let answerData = {}

inquirer.prompt([{
		type: 'list',
		choices: ['空项目','工具类', '组件库', '业务应用'],
		name: 'PKG_TYPE',
		message: '请选择你想创建的模版应用',
		default: []
	},
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
	},
]).then((answers) => {
	console.log('结果为:')
	console.log(answers)
	answerData = {
		...answerData,
		...answers
	}
	const {
		PKG_TYPE,
		PKG_NAME
	} = answers
	// 根据回答

	if ( PKG_TYPE === '空项目' ) {
		inquirer.prompt([{
			type: 'list',
			name: 'PKG_TEMPLATE',
			choices: ['默认模版'],
			message: '请选择模版',
			default: '默认模版'
		}]).then((pkgTemplateAnswers) => {
			answerData = {
				...answerData,
				...pkgTemplateAnswers
			}
			console.log('pkgTemplateAnswers', pkgTemplateAnswers);

			const {
				PKG_TEMPLATE
			} = pkgTemplateAnswers

			if (PKG_TEMPLATE === '默认模版') {

				EmptyHandler(answerData)
			}

		})
	}

	else if (PKG_TYPE === '工具类') {
		console.log('选择了工具类');

		inquirer.prompt([{
			type: 'list',
			name: 'PKG_TEMPLATE',
			choices: ['rollup + ts 模版'],
			message: '请选择模版',
			default: 'rollup + ts模版'
		}]).then((pkgTemplateAnswers) => {
			answerData = {
				...answerData,
				...pkgTemplateAnswers
			}

			const {
				PKG_TEMPLATE
			} = pkgTemplateAnswers

			if (PKG_TEMPLATE === 'rollup + ts 模版') {

				RollupTsHandlers({
					answers,
					pkgTemplateAnswers
				})
			}

		})
	} else {
		console.log('暂不支持的应用类型');
	}
})
