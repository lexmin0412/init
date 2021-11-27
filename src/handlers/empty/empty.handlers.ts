const path = require('path')
// const inquirer = require('inquirer')
const download = require('download-git-repo')
const fs = require('fs')
const HandleBars = require('handlebars')
import {isDirectory} from '../../utils/isDirectory'
import {deleteDirectory} from '../../utils/deleteDir'
import {templateList} from '../../config/templates'

export const EmptyHandler = (answerData) => {

	const {
		PKG_NAME
	} = answerData

	const currentTemplate = templateList.find(item => {
		return item.applicationType === 'EMPTY' && item.type === 'EMPTY'
	})

	console.log('正在下载选择的模版...')
	const basePath = path.resolve(__dirname, '..', `./templates/template-empty`)

	// 删除原有模版
	if (isDirectory(basePath)) {
		deleteDirectory(basePath)
	}

	// 每次都拉取最新的模版
	console.time('download time')
	download(`github:${currentTemplate.repo.url}#main`, basePath, {clone: true}, err => {
		if (err) {
			console.log('下载错误', err);
			return
		}
		console.log('模版下载成功 ✅');
		console.timeEnd('download time')


		const root = basePath
		const base = ''

		// 写入用户选项到模版文件
		const writeFile = (root, base) => {
			const outerDirs = fs.readdirSync(`${root}${base}`)
			outerDirs.forEach((item) => {
				const currentPath = `${root}${base}/${item}`
				if (isDirectory(currentPath)) {
					// 是文件夹则递归
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

		console.log('root', root)
		console.log('base', base)
		writeFile(root, base)

		console.log('模版初始化成功')
	})
}
