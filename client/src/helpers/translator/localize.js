import translations from './translations.js'

let lang = String(navigator.language || navigator.userLanguage).split('-')[0]
const supported = ['en', 'es']

if (!supported.includes(lang)) {
	lang = supported[0]
}
function localize(key) {
	return translations[lang][key]||key
}

export default localize