export const pickerOptions = {
  shortcuts: [
    {
      text: "清除",
      onClick(picker) {
        picker.$emit('pick', null);
      }
    },
    {
      text: '今天',
      onClick(picker) {
        picker.$emit('pick', new Date());
      }
    }, {
      text: '昨天',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        picker.$emit('pick', date);
      }
    }, {
      text: '一周前',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', date);
      }
    }
  ]
}

// 国家选项
export const areaOnlyOptions = [
  {label: '新加坡', value: 153},
  {label: '台湾', value: 169},
  {label: '马来西亚', value: 103},
  {label: '澳大利亚', value: 11},
  {label: '中国', value: 37},
  {label: '泰国', value: 172},
  {label: '日本', value: 83},
  {label: '菲律宾', value: 134},
  {label: '瑞士', value: 167},
  {label: '荷兰', value: 121},
  {label: '英国', value: 182},
  {label: '美国', value: 183},
  {label: '澳门', value: 100},
]

// 国家选项 包括“所有”选项
export const areaOptions = [
  {label: '所有', value: null},
  ...areaOnlyOptions
]

// 语言配置约定 zhu 2017.05.03
export const langOptions = [
  { label: '英文', value: 'en' },
  { label: '中文', value: 'zh' },
  { label: '繁体中文', value: 'hant' },
  { label: '马来文', value: 'ms' },
  { label: '泰文', value: 'th' }
]

export const langNoEnOptions = [
  { label: '中文', value: 'zh' },
  { label: '繁体中文', value: 'hant' },
  { label: '马来文', value: 'ms' },
  { label: '泰文', value: 'th' }
]

export const langNumOptions = [
  { label: '英文', value: '1' },
  { label: '中文', value: '2' },
  { label: '繁体中文', value: '3' },
  { label: '马来文', value: '4' },
  { label: '泰文', value: '5' }
]

export const langNumNoEnOptions = [
  { label: '中文', value: '2' },
  { label: '繁体中文', value: '3' },
  { label: '马来文', value: '4' },
  { label: '泰文', value: '5' }
]

export function getAreaName(id) {
  let ret = "";
  areaOnlyOptions.forEach((area) => {
    if(area.value === id) {
      ret = area.label;
    }
  });
  return ret;
}

// 根据value获取label的值 zhu 2017.05.09
export function getNameById(items, id) {
  let ret = "";
  items.forEach((item) => {
    if(item.value === id || item.value === (id + '')) {
      ret = item.label;
    }
  });
  return ret;
}
