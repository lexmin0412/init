const path = require('path')
// const inquirer = require('inquirer')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const fs = require('fs')
const HandleBars = require('handlebars')
import {isDirectory} from './utils/isDirectory'
import { deleteDirectory } from './utils/deleteDir'

let answerData = {}

inquirer.prompt([{
		type: 'list',
		choices: ['工具类', '组件库', '应用框架'],
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
		PKG_NAME,
		PKG_DESC
	} = answers
	// 根据回答
	if (PKG_TYPE === '工具类') {
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
			console.log('pkgTemplateAnswers', pkgTemplateAnswers);

			const {
				PKG_TEMPLATE
			} = pkgTemplateAnswers

			if (PKG_TEMPLATE === 'rollup + ts 模版') {

				console.log('正在下载选择的模版...')
				const basePath = path.resolve(__dirname, '..', `./templates/template-rollup-ts`)

				// 删除原有模版
				if ( isDirectory(basePath) ) {
					deleteDirectory(basePath)
				}

				// 每次都拉取最新的模版
				download('direct:https://gitee.com/lexmin0412/rollup-ts-template-hbs.git', basePath, {
					clone: true
				}, (err) => {
					if (err) {
						console.log('下载错误', err);
						return
					}
					console.log('模版下载成功 ✅');


					const root = basePath
					const base = ''

					// 写入用户选项到模版文件
					const writeFile = (root, base) => {
						const outerDirs = fs.readdirSync(`${root}${base}`)
						outerDirs.forEach((item) => {
							const currentPath = `${root}${base}/${item}`
							if (isDirectory(currentPath)) {
								// 是文件夹再次遍历
								writeFile(`${root}${base}`, `/${item}`)
							} else {
								// 否则直接写入替换模版内容
								// 使用handlebars填入内容
								const string = fs.readFileSync(currentPath).toString()
								const template = HandleBars.compile(string)

								const dirName = `./${PKG_NAME}${base}`
								if (!isDirectory(dirName)) {
									fs.mkdirSync(dirName)
								}

								const fileName = `./${PKG_NAME}${base}/${item}`
								const dotIndex = fileName.indexOf('.hbs')
								const trueFileName = fileName.slice(0, dotIndex)

								fs.writeFileSync(trueFileName, template(answerData))
								console.log('写入文件', trueFileName);
							}
						})
					}

					writeFile(root, base)

					console.log(`模版初始化成功，请执行一下命令手动安装依赖并进行调试：
$ cd ${PKG_NAME} 进入文件夹
$ yarn 安装依赖
$ yarn build 编译
					`);








				})
			}

		})
	} else {
		console.log('暂不支持的应用类型');
	}
})
