import list from "./static/stats/short_list.json"
export default {
	target: 'static',
	axios: { baseURL: '/' },
  loading: { color: '#fff' },
  styleResources: { sass: ['./assets/*.sass'] },
	generate: { routes: list.map(each => `/${each.title}`).concat("/") },
	modules: [
		'@nuxtjs/style-resources',
		'@nuxtjs/axios'
	],
  build: {
    extend (config, ctx) { },
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
		},
		babel: {
			presets({isServer}) {
				return [
					[
						require.resolve('@nuxt/babel-preset-app'),
						{
							buildTarget: isServer ? 'server' : 'client',
							corejs: { version: 3 }
						}
					]
				]
			}
		}
  }
}
