const path = require('path')
const fs = require('fs')
const HandleBars = require('handlebars')
import { downloadTemplate } from './../utils/downloadTemplate'
import {isDirectory} from '../utils/isDirectory'
import {deleteDirectory} from '../utils/deleteDir'
import {templateList} from '../config/templates'
import {GITHUB} from '../constants/repo'
import { logsEnd } from './../config/logs'

/**
 * 模版处理
 * @param answerData
 */
export const templateHandler = (answerData) => {

	const {
		PKG_NAME,
		PKG_TYPE,
		PKG_TEMPLATE
	} = answerData

	const currentTemplate = templateList.find(item => {
		return item.applicationType === PKG_TYPE && item.type === PKG_TEMPLATE
	})

	console.log('正在下载选择的模版...')
	const basePath = path.resolve(__dirname, '..', currentTemplate.tmpDir)

	// 删除原有模版
	if (isDirectory(basePath)) {
		deleteDirectory(basePath)
	}

	downloadTemplate({
		url: currentTemplate.repo.url,
		originType: GITHUB,
		branch: currentTemplate.branch,
		targetDir: basePath
	}).then(()=>{
		const root = basePath
		const base = ''
		fs.mkdirSync(PKG_NAME)

		// 写入用户选项到模版文件
		const writeFile = (root, base) => {
			const outerDirs = fs.readdirSync(`${root}${base}`)
			outerDirs.forEach((item) => {
				const currentPath = `${root}${base}/${item}`
				const targetDirName = `./${PKG_NAME}${base}/${item}`
				if (isDirectory(currentPath)) {
					fs.mkdirSync(targetDirName)

					// 是文件夹则递归
					writeFile(`${root}`, `${base}/${item}`)
				} else {
					// 否则直接写入替换模版内容
					// 使用handlebars填入内容
					const string = fs.readFileSync(currentPath).toString()
					const template = HandleBars.compile(string)
					const fileName = `./${PKG_NAME}${base}/${item}`

					// 过滤非模版文件
					if (!fileName.endsWith('.hbs')) {
						return
					}

					const dotIndex = fileName.indexOf('.hbs')
					const trueFileName = fileName.slice(0, dotIndex)

					fs.writeFileSync(trueFileName, template(answerData))
					console.log('写入文件', trueFileName);
				}
			})
		}
		writeFile(root, base)

		logsEnd(answerData)
	}).catch((err)=>{
		console.error('下载错误', err)
	})
}
