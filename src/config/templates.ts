import {
	PKG_TYPE,
	LIB_TEMPLATE_TYPE,
	APPLICATION_TEMPLATE_TYPE,
	PKG_TYPES,
	TEMPLATE_TYPES,
} from './../config/index'

interface TemplateConfig {
	/**
	 * 应用类型
	 */
	applicationType: PKG_TYPES
	/**
	 * 模版类型
	 */
	type: TEMPLATE_TYPES
	/**
	 * 模版名称
	 */
	name: string
	/**
	 * 模版仓库相关
	 */
	repo: {
		/**
		 * 模版仓库来源
		 */
		origin?: 'gitee' | 'github' | 'gitlab'
		/**
		 * 模版仓库url
		 */
		url: string
		/**
		 * 是否采用 clone 方式下载
		 */
		clone: boolean
		/**
		 * git access token
		 */
		accessToken: string
	}
	/**
	 * 模版下载后的存放目录
	 */
	tmpDir: string
	/**
	 * 模版存放分支
	 */
	branch: string
}

export const templateList: Array<TemplateConfig> = [
	{
		applicationType: 'EMPTY',
		tmpDir: './templates/template-empty',
		type: 'EMPTY_DEFAULT',
		name: LIB_TEMPLATE_TYPE.EMPTY,
		branch: 'main',
		repo: {
			origin: 'github',
			url: 'lexmin0412/youtils-project-templates',
			clone: true,
			accessToken: '',
		},
	},
	{
		applicationType: 'PLUGIN',
		tmpDir: './templates/template-plugin-taro2',
		type: 'PLUGIN_TARO2',
		name: LIB_TEMPLATE_TYPE.PLUGIN_TARO2,
		branch: 'master',
		repo: {
			origin: 'github',
			url: 'lexmin0412/project-template-plugin-taro-2.x',
			clone: true,
			accessToken: '',
		},
	},
	{
		applicationType: 'PLUGIN',
		tmpDir: './templates/template-plugin-taro3',
		type: 'PLUGIN_TARO3',
		name: LIB_TEMPLATE_TYPE.PLUGIN_TARO3,
		branch: 'master',
		repo: {
			origin: 'github',
			url: 'lexmin0412/project-template-plugin-taro-3.x',
			clone: true,
			accessToken: '',
		},
	},
	{
		applicationType: 'LIB',
		type: 'ROLLUP_TS',
		name: LIB_TEMPLATE_TYPE.ROLLUP_TS,
		repo: {
			origin: 'github',
			url: 'lexmin0412/project-template-lib-rollup',
			clone: true,
			accessToken: '',
		},
		branch: 'master',
		tmpDir: './templates/template-rollup-ts',
	},
	{
		applicationType: 'DOCS',
		type: 'DOCS_DOCSIFY',
		name: LIB_TEMPLATE_TYPE.DOCS_DOCSIFY,
		repo: {
			origin: 'github',
			url: 'lexmin0412/project-template-docs-docsify',
			clone: true,
			accessToken: '',
		},
		branch: 'main',
		tmpDir: './templates/template-docs-docsify',
	},
	{
		applicationType: 'APPLICATION',
		type: 'VITE_REACT_ANTD_ADMIN',
		name: LIB_TEMPLATE_TYPE.VITE_REACT_ANTD_ADMIN,
		repo: {
			origin: 'github',
			url: 'lexmin0412/vite-react-admin',
			clone: true,
			accessToken: '',
		},
		branch: 'master',
		tmpDir: './templates/template-application-vite-react-antd-admin',
	},
]
