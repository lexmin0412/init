const fs = require('fs')

/**
 * 判断一个path是否是文件夹
 */
export const isDirectory = (path) => {
	return fs.existsSync(path) && fs.lstatSync(path).isDirectory()
}

export default isDirectory
