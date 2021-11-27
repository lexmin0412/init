import {RepoType} from '../types/repo'
import {GITHUB, GITEE, GITLAB} from './../constants/repo'
const download = require('download-git-repo')

/**
 * DownloadTemplate 方法参数
 */
interface DownloadTemplateParams {
	url: string
	originType: RepoType
	branch: string
	targetDir: string
}

/**
 * 封装 download 方法，promisify
 * @param config
 * @returns
 */
export const downloadTemplate = ({
	url,
	originType,
	branch,
	targetDir
}: DownloadTemplateParams): Promise<void> => {
	return new Promise((resolve, reject) => {
		switch (originType) {
			case GITHUB:
				console.time('模版下载时长')
				download(`github:${url}#${branch}`, targetDir, null, err => {
					console.log('模版下载成功 ✅');
					if (err) {
						reject(err)
						return
					}
					console.timeEnd('模版下载时长')
					resolve()
				})
				break;
			default:
				reject(`暂不支持当前类型下载: ${originType}`)
		}
	})
}
