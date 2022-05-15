import list from "./static/stats/short_list.json"
export default {
	target: 'static',
	components: true,
	axios: { baseURL: '/' },
  loading: { color: 'transparent' },
  styleResources: { sass: ['./assets/*.sass'] },
	generate: { routes: list.map(each => `/${each.title}`).concat("/") },
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/moment',
		'@nuxtjs/color-mode',
		'@nuxtjs/style-resources'
	],
	colorMode: {
		preference: 'light',
		fallback: 'light',
		hid: 'nuxt-color-mode-script',
		globalName: '__NUXT_COLOR_MODE__',
		componentName: 'ColorScheme',
		classPrefix: '',
		classSuffix: '-mode',
		storageKey: 'nuxt-color-mode'
	},
  build: {
    extend (config, ctx) {},
    build: {
      postcss: {
        plugins: {
          'postcss-url': false,
          'postcss-nested': {},
          'postcss-responsive-type': {},
          'postcss-hexrgba': {}
        },
        preset: { autoprefixer: { grid: true } }
      }
		}
  }
}
