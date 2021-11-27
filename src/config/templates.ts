import { PKG_TYPE, LIB_TEMPLATE_TYPE, APPLICATION_TEMPLATE_TYPE, PKG_TYPES, TEMPLATE_TYPES} from './../config/index'

interface TemplateConfig {
	applicationType: PKG_TYPES
	type: TEMPLATE_TYPES
	name: string
	repo: {
		origin?: 'gitee' | 'github' | 'gitlab'
		url: string
		clone: boolean
		accessToken: string
	}
}

export const templateList: Array<TemplateConfig> = [
	{
		applicationType: 'EMPTY',
		type: 'EMPTY',
		name: LIB_TEMPLATE_TYPE.EMPTY,
		repo: {
			origin: 'github',
			url: 'lexmin0412/youtils-project-templates',
			clone: true,
			accessToken: ''
		}
	},
	{
		applicationType: 'LIB',
		type: 'ROLLUP_TS',
		name: LIB_TEMPLATE_TYPE.ROLLUP_TS,
		repo: {
			origin: 'gitee',
			url: 'https://gitee.com/lexmin0412/rollup-ts-template-hbs.git',
			clone: true,
			accessToken: ''
		},
	}
]
