import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ENG from './lang/ENG'
import ZHS from './lang/ZHS'
import ZHT from './lang/ZHT'

Vue.use(VueI18n)
const locale = 'ENG'
const i18n = new VueI18n({
  locale: locale,
  messages: {
    'ENG': ENG,
    'ZHS': ZHS,
    // 'ZHT': ZHT
  }
})

export default i18n
