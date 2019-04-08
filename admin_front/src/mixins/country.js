export default {
  methods: {
    getAreaOnlyOptions() {
      // const ids = [153, 169, 103, 11, 37, 172, 167, 121, 55, 60, 182, 80, 12, 75, 19, 54, 88, 183, 134, 100];
      const openCountrys = JSON.parse(localStorage.getItem('openCountrys')) || [];  // save to localStorage at Welcome page
      return openCountrys.map((country) => {
        return {label: this.$t('common.countrys.country' + country.id), value: country.id, currency: country.currency}
      })
      // return [
      //   {label: 新加坡, value: 153},
      //   {label: '台湾', value: 169},
      //   {label: '马来西亚', value: 103},
      //   {label: '澳大利亚', value: 11},
      //   {label: '中国', value: 37},
      //   {label: '泰国', value: 172},
      //   {label: '瑞士', value: 167},
      //   {label: '荷兰', value: 121},
      //   {label: '法国', value: 55},
      //   {label: '德国', value: 60},
      //   {label: '英国', value: 182},
      //   {label: '意大利', value: 80},
      //   {label: '奥地利', value: 12},
      //   {label: '印度尼西亚', value: 75},
      //   {label: '比利时', value: 19},
      //   {label: '芬兰', value: 54},
      //   {label: '韩国', value: 88},
      //   {label: '美国', value: 183},
      //   {label: '菲律宾', value: 134},
      //   {label: '澳门', value: 100},
      // ]
    },
    getAreaOptions() {
      return [
        {label: this.$t('common.all'), value: null, currency: 'USD'},
        ...this.getAreaOnlyOptions()
      ]
    },
    getAreaName(id) {
      let ret = "";
      this.getAreaOnlyOptions().forEach((area) => {
        if(area.value === id) {
          ret = area.label;
        }
      });
      return ret;
    },

    // 获取对应国家的币种
    getCurrencyById(id) {
      let ret = "";
      this.getAreaOnlyOptions().forEach((area) => {
        if(area.value === id) {
          ret = area.currency;
        }
      });
      return ret;
    }
  }
}