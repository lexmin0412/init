/**
 * 默认结束时log
 * @param params
 */
export const log_default = (params: any) => {
	const { PKG_NAME } = params
	console.log('模版初始化成功✅');
	console.log(`$ cd ${PKG_NAME} 进入文件夹`);
}

/**
 * lib rollup_ts 模版的结束时log
 * @param params
 */
export const log_lib_rollup_ts = (params: any) => {
	const { PKG_NAME } = params
	console.log(`模版初始化成功，请执行一下命令手动安装依赖并进行调试：
$ cd ${PKG_NAME} 进入文件夹
$ yarn 安装依赖
$ yarn build 编译
					`)
}

/**
 * 结束时的统一log
 * @param params
 */
export const logsEnd = (params) => {
	const { PKG_TYPE } = params
	switch (PKG_TYPE) {
		case 'ROLLUP_TS':
			log_lib_rollup_ts(params)
			break;
		default:
			log_default(params)
	}
}
