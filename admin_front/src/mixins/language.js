export default {
  methods: {
    getLangOnlyOptions() {
      const langs = ['default', 'en', 'zh', 'hant', 'ms', 'th', 'ko', 'nl', 'fr', 'fr-ch', 'de', 'de-ch', 'en-uk', 'en-au', 'it', 'zh-hant-hk', 'span', 'id', 'pt', 'ru-ua'];
      return langs.map((lang) => {
        return {label: this.$t('common.languages.' + lang), value: lang}
      })
    },
    getLangOptions() {
      return [
        {label: this.$t('common.all'), value: null},
        ...this.getLangOnlyOptions()
      ]
    },
    getLangByNumOptions() {
      const langs = ['en', 'zh', 'hant', 'ms', 'th', 'ko', 'nl', 'fr', 'fr-ch', 'de', 'de-ch', 'en-uk', 'en-au', 'it', 'zh-hant-hk', 'span', 'id', 'pt', 'ru-ua'];
      return langs.map((lang, index) => {
        return {label: this.$t('common.languages.' + lang), value: index + 1}
      })
    }
  }
}
