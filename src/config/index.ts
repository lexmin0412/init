/**
 * 应用类型列表
 */
export enum PKG_TYPE {
	'EMPTY' = '空项目',
	'LIB' = '工具类',
	'COMPONENTS_LIB' = '组件库',
	'APPLICATION_SPA_MOBILE' = '移动端单页应用',
	'APPLICATION_SPA_DESKTOP' = '桌面端单页应用',
	'NODEJS_SERVICE' = 'node服务',
	'PLUGIN' = '插件'
}

export type PKG_TYPES = 'EMPTY' | 'PLUGIN' | 'LIB' | 'COMPONENTS_LIB' | 'APPLICATION_SPA_MOBILE' | 'APPLICATION_SPA_DESKTOP' | 'NODEJS_SERVICE' | 'DOCS'

export type TEMPLATE_TYPES = 'EMPTY_DEFAULT' | 'ROLLUP_TS' | 'WEBPACK_TS' | 'TARO3_REACT_TS' | 'TARO3_VUE3_TS' | 'TARO3_VUE2_TS' | 'TARO2_TS' | 'WEBPACK_REACT_TS' | 'WEBPACK_VUE3_TS' | 'WEBPACK_VUE2_TS' | 'VITE_REACT_TS' | 'VITE_VUE3_TS' | 'PLUGIN_TARO2' | 'DOCS_DOCSIFY'

/**
 * 工具类库模版
 */
export enum LIB_TEMPLATE_TYPE {
	'EMPTY' = 'empty',
	'PLUGIN_TARO2' = 'taro2 plugin',
	'ROLLUP_TS' = 'rollup + ts',
	'WEBPACK_TS' = 'webpack + ts',
	'DOCS_DOCSIFY' = 'docsify'
}

/**
 * 业务应用模版
 */
export enum APPLICATION_TEMPLATE_TYPE {
	'TARO3_REACT_TS' = 'taro3 + react + ts',
	'TARO3_VUE3_TS' = 'taro3 + vue3 + ts',
	'TARO3_VUE2_TS' = 'taro3 + vue2 + ts',
	'TARO2_TS' = 'taro2 + ts',
	'WEBPACK_REACT_TS' = 'webpack + react + ts',
	'WEBPACK_VUE3_TS' = 'webpack + vue3 + ts',
	'WEBPACK_VUE2_TS' = 'webpack + vue2 + ts',
	'VITE_REACT_TS' = 'vite + react + ts',
	'VITE_VUE3_TS' = 'vite + vue3 + ts',
}
