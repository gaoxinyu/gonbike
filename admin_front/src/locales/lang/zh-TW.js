import twLocale from 'element-ui/lib/locale/lang/zh-TW'
import enterprise from './zh-TW/enterprise'
import evs from './zh-TW/evs'
import ocoin from './zh-CN/ocoin'

export default {
  signOut: '退出',

  // menus
  menu: {
    mainMenu: '主菜單',
    customer: {
      name: '客戶服務',
      report: '工單管理',
      addreport: '添加工單',
      student: '學生證審核',
      sms: '簡訊管理',
      smsadd: '發送簡訊',
      smstemplate: '簡訊範本',
      smslimit: '簡訊黑名單',
      driververify: '騎士審核',
    },
    operate: {
      name: '單車運營',
      monitor: '車輛監控',
      trip: '行程記錄',
      bikearea: '停車區域管理',
      // 單車logo管理 zhu 2017.04.17
      bikelogo: '單車logo管理',
      bikelogoadd: '添加logo配置',
      bikelogoedit: '更新logo配置',
      bikelogoinfo: 'logo配置詳情',
      tag: '投放標籤管理',
      tagadd: '配置標籤',
      category: '標籤目錄',
      // 國家城市配置 zhu 2017.05.11
      cityconfig: '國家城市配置',
      fence: '電子圍欄',
      fenceInfo: '電子圍欄列表',
    },
    delivery: {
      name: 'FlashMan',
      deliveryorder: 'FlashMan Order List'
    },
    user: {
      name: '用戶管理',
      userinfo: '用戶基本信息',
      device: '用戶設備信息',
      credit: '信用分管理',
      creditadd: '添加信用分',
      trade: '交易明細管理',
      tradeadd: '餘額調整',
      payment: '支付明細管理',
      usercoupon: '用戶優惠券',
      addusercoupon: '贈送優惠券',
      vip: '用戶會員資訊',
      autopay: '自动续费管理',
      redbag: '用户奖励信息',
      driver: '騎士基本信息',
      cash: '提現明細管理',
      ocoin: 'OCN交易明細'
    },
    stock: {
      name: '單車入庫',
      lock: '鎖信息管理',
      lockadd: '添加鎖',
      bike: '單車信息管理',
      bikeadd: '添加單車',
      state: '單車國家配置'
    },
    app: {
      name: 'App管理',
      message: '通知管理',
      messageadd: '添加通知',
      version: 'APP更新管理',
      versionadd: '添加APP更新',
      invite: '邀請好友贈送管理',
      // 广告位 zhu 2017.09.01
      adarea: '廣告位管理',
      addad1: '配寘首頁彈窗',
      addad2: '配寘首頁輪播',
      addad3: '配寘頂部橫幅',
      addad4: '配寘圖標',
      addad5: '配寘一鍵購買會員',
    },
    discount: {
      name: '優惠管理',
      activity: '充值返現',
      activityadd: '配置返現',
      joinuser: '參與用戶',
      coupon: '優惠券',
      couponadd: '配置優惠券',
      code: '優惠碼',
      codeadd: '配置優惠碼',
      coderecord: '兌換記錄',
      free: '免費騎行',
      freeadd: '配置免費騎行',
      card: '會員卡',
      cardadd: '配置會員卡',
      deposit: '押金折扣',
      depositadd: '配置押金折扣',
      users: '參與用戶',
      registercoupon: '註冊券',
      nodeposit: '免押金騎行',
    },
    icon: {
      name: '图标活动',
      reward: '奖励活动',
      redbag: '红包券活动',
      redbagadd: '配置红包券活动',
      bikeicon: '单车图标',
      addbikeicon: '配置单车图标',
      coupon: '优惠券活动'
    },
    // 消息推送 zhu 2017.05.08
    news: {
      name: '消息推送',
      func: '功能消息',
      funcpush: '推送記錄',
      pushmessage: '推送消息',
      pushmessageadd: '添加推送消息',
    },
    admin: {
      name: '權限管理',
      role: '角色管理',
      account: '帳號管理',
      accountadd: '添加賬號'
    },
    city: {
      name: '開城管理',
      recharge: '押金與充值管理',
      price: '車費價格管理',
      payfee: '手續費管理',
      flashmanedit: 'FlashMan開城'
    },
    setting: {
      name: '系统设置',
      paypal: 'PayPal轉賬',
      risk: '支付風險控制',
      riskadd: '配置風險控制條件',
      appsms: '短信運營商設置',
      smssettingadd: '配置短信運營商',
      prov: '各國支持的短信運營商',
      operator: '短信運營商信息',
      pay: '支付方式設置',
      addpay: '添加支付方式設置',
      editpay: '編輯支付方式設置',
      payinfo: '支付方式詳情',
      radius: '單車顯示半徑',
      depositrefund: '押金退款手续费设置'
    },
    log: {
      name: '系統日誌',
      bind: '綁定失敗日誌',
      pay: '支付失敗日誌',
      lock: '開關鎖失敗日誌',
      optlog: '運維端操作日誌',
      uploadloc: '上報位置',
      putbike: '單車投放',
      bikemaintain: '單車維護',
      putagain: '回收再投放',
      other: '其他操作',
      punchcard: '打卡記錄',
    },
    // 奖励管理 zhu 2017.12.13
    reward: {
      name: '奖励管理',
      rwcoupon: '奖励资源 - 优惠券',
      rwaddcoupon: '配置奖励优惠券',
      rwcode: '奖励资源 - 优惠码',
      rwaddcode: '配置奖励优惠码',
      rwcredit: '奖励资源 - 信用分',
      rwaddcredit: '配置奖励信用分',
      rwactivity: '活动内容',
      rwaddactivity: '配置奖励活动内容'
    },
    enterprise: {
      name: '企業賬號',
      enterpriseaccount: '企業列表',
      enterprisepackage: '套餐列表',
    },
    evs: {
      name: 'EVS管理',
      evsuser: '用戶管理',
      evsorder: '訂單管理',
      evspayway: 'EVS設置',
    }
  },

  common: {
    all: '所有',
    chooseTime: '選擇日期',
    query: '查詢',
    resetQuery: '重置',
    exportQuery: '導出',
    operate: '操作',
    yes: '是',
    no: '否',
    ok: '確定',
    cancel: '取消',
    choose: '請選擇',
    input: '請輸入',
    add: '添加',
    edit: '編輯',
    view: '详情',
    on: '开',
    off: '关',

    weekdays: {
      day1: '星期一',
      day2: '星期二',
      day3: '星期三',
      day4: '星期四',
      day5: '星期五',
      day6: '星期六',
      day7: '星期日',
    },

    countrys: {
      country1: '安哥拉',
      country2: '阿富汗',
      country3: '阿爾巴尼亞',
      country4: '阿爾及利亞',
      country5: '安道爾共和國',
      country6: '安圭拉島',
      country7: '安提瓜和巴布達',
      country8: '阿根廷',
      country9: '亞美尼亞',
      country10: '阿森松',
      country11: '澳大利亞',
      country12: '奧地利',
      country13: '阿塞拜疆',
      country14: '巴哈馬',
      country15: '巴林',
      country16: '孟加拉國',
      country17: '巴巴多斯',
      country18: '白俄羅斯',
      country19: '比利時',
      country20: '伯利茲',
      country21: '貝寧',
      country22: '百慕大群島',
      country23: '玻利維亞',
      country24: '博茨瓦納',
      country25: '巴西',
      country26: '文萊',
      country27: '保加利亞',
      country28: '布基納法索',
      country29: '緬甸',
      country30: '布隆迪',
      country31: '喀麥隆',
      country32: '加拿大',
      country33: '開曼群島',
      country34: '中非共和國',
      country35: '乍得',
      country36: '智利',
      country37: '中國',
      country38: '哥倫比亞',
      country39: '剛果',
      country40: '庫克群島',
      country41: '哥斯達黎加',
      country42: '古巴',
      country43: '塞浦路斯',
      country44: '捷克',
      country45: '丹麥',
      country46: '吉布提',
      country47: '多米尼加共和國',
      country48: '厄瓜多爾',
      country49: '埃及',
      country50: '薩爾瓦多',
      country51: '愛沙尼亞',
      country52: '埃塞俄比亞',
      country53: '斐濟',
      country54: '芬蘭',
      country55: '法國',
      country56: '法屬圭亞那',
      country57: '加蓬',
      country58: '岡比亞',
      country59: '格魯吉亞',
      country60: '德國',
      country61: '加納',
      country62: '直布羅陀',
      country63: '希臘',
      country64: '格林納達',
      country65: '關島',
      country66: '危地馬拉',
      country67: '幾內亞',
      country68: '圭亞那',
      country69: '海地',
      country70: '洪都拉斯',
      country71: '香港',
      country72: '匈牙利',
      country73: '冰島',
      country74: '印度',
      country75: '印度尼西亞',
      country76: '伊朗',
      country77: '伊拉克',
      country78: '愛爾蘭',
      country79: '以色列',
      country80: '意大利',
      country81: '科特迪瓦',
      country82: '牙買加',
      country83: '日本',
      country84: '約旦',
      country85: '柬埔寨',
      country86: '哈薩克斯坦',
      country87: '肯尼亞',
      country88: '韓國',
      country89: '科威特',
      country90: '吉爾吉斯坦',
      country91: '老撾',
      country92: '拉脫維亞',
      country93: '黎巴嫩',
      country94: '萊索托',
      country95: '利比里亞',
      country96: '利比亞',
      country97: '列支敦士登',
      country98: '立陶宛',
      country99: '盧森堡',
      country100: '澳門',
      country101: '馬達加斯加',
      country102: '馬拉維',
      country103: '馬來西亞',
      country104: '馬爾代夫',
      country105: '馬里',
      country106: '馬耳他',
      country107: '馬里亞那群島',
      country108: '馬提尼克',
      country109: '毛里求斯',
      country110: '墨西哥',
      country111: '摩爾多瓦',
      country112: '摩納哥',
      country113: '蒙古',
      country114: '蒙特塞拉特島',
      country115: '摩洛哥',
      country116: '莫桑比克',
      country117: '納米比亞',
      country118: '瑙魯',
      country119: '尼泊爾',
      country120: '荷屬安的列斯',
      country121: '荷蘭',
      country122: '新西蘭',
      country123: '尼加拉瓜',
      country124: '尼日爾',
      country125: '尼日利亞',
      country126: '朝鮮',
      country127: '挪威',
      country128: '阿曼',
      country129: '巴基斯坦',
      country130: '巴拿馬',
      country131: '巴布亞新幾內亞',
      country132: '巴拉圭',
      country133: '秘魯',
      country134: '菲律賓',
      country135: '波蘭',
      country136: '法屬玻利尼西亞',
      country137: '葡萄牙',
      country138: '波多黎各',
      country139: '卡塔爾',
      country140: '留尼旺',
      country141: '羅馬尼亞',
      country142: '俄羅斯',
      country143: '聖盧西亞',
      country144: '聖文森特島',
      country145: '東薩摩亞(美)',
      country146: '西薩摩亞',
      country147: '聖馬力諾',
      country148: '聖多美和普林西比',
      country149: '沙特阿拉伯',
      country150: '塞內加爾',
      country151: '塞舌爾',
      country152: '塞拉利昂',
      country153: '新加坡',
      country154: '斯洛伐克',
      country155: '斯洛文尼亞',
      country156: '所羅門群島',
      country157: '索馬里',
      country158: '南非',
      country159: '西班牙',
      country160: '斯里蘭卡',
      country163: '蘇丹',
      country164: '蘇里南',
      country165: '斯威士蘭',
      country166: '瑞典',
      country167: '瑞士',
      country168: '敘利亞',
      country169: '台灣',
      country170: '塔吉克斯坦',
      country171: '坦桑尼亞',
      country172: '泰國',
      country173: '多哥',
      country174: '湯加',
      country175: '特立尼達和多巴哥',
      country176: '突尼斯J',
      country177: '土耳其',
      country178: '土庫曼斯坦',
      country179: '烏干達',
      country180: '烏克蘭',
      country181: '阿拉伯聯合酋長國',
      country182: '英國',
      country183: '美國',
      country184: '烏拉圭',
      country185: '烏茲別克斯坦',
      country186: '委內瑞拉',
      country187: '越南',
      country188: '也門',
      country189: '南斯拉夫',
      country190: '津巴布韋',
      country191: '扎伊爾',
      country192: '贊比亞',
    },

    languages: {
      default: '默認',
      en: '英文',
      zh: '中文',
      hant: '繁體',
      ms: '馬來語',
      th: '泰文',
      ko: '韓文',
      nl: '荷蘭語',
      fr: '法語',
      'fr-ch': '瑞士法語',
      de: '德語',
      'de-ch': '瑞士德語',
      'en-uk': '英國英語',
      'en-au': '澳大利亞英語',
      it: '義大利語',
      'zh-hant-hk': '香港繁体',
      span: '西班牙語',
      id: '印度尼西亞語',
      pt: '葡萄牙語',
      'ru-ua': '烏克蘭俄語'
    }
  },

  // login zhu 2017.09.20
  login: {
    form: {
      title: '请输入您的用户名和密码，登录Admin后台',
      namePlaceholder: '用户名',
      passPlaceholder: '输入密码',
      codePlaceholder: '输入右边数字',
      login: '登录',
      next: '已将短信验证码发送到{phone}的手机上，请注意查收！',
      phonePlaceholder: '输入4位短信验证码',
      getcode: '获取验证码',
      submit: '确认'
    }
  },

  // each views
  welcome: {
    title: '歡迎訪問oBike admin系統！您有如下功能權限，如需更多功能，請聯繫管理員。 '
  },

  report: {
    box: {
      title: '工單管理',
      title1: '批量忽略',
      title2: '批量加分',
      goAdd: '添加工單',
    },
    query: {
      beginTime: '起始日期',
      endTime: '結束日期',
      chooseTime: '選擇日期',
      assignTo: '分配給',
      status: '處理狀態',
      type: '舉報類型',
      priority: '標記',
      bikeId: '單車編號',
      phone: '用戶手機號',
      countryId: '國家',
      cityId: '城市',
      faultId: '工單編號',
      query: '查詢',

      all: '所有',
      assignTo1: '線上',
      assignTo2: '線下',

      priority1: '優先級-高',
      priority2: '優先級-中',
      priority3: '優先級-低',
      priority0: '無標記'
    },
    table: {
      id: '編號',
      createdAt: '舉報時間',
      type: '舉報類型',
      phone: '用戶手機號',
      bikeId: '單車編號',
      address: '單車位置',
      assignTo: '分配給',
      status: '處理狀態',
      priority: '標記',
      remark: '備註',
      operate: '操作',

      detail: '詳情'
    },
    dialog: {
      title: '確認全部忽略？ ',
      title1: '確認全部處理？',
      bikeIds: '單車編號',
      faults: '共{faults}個問題',
      count: '個',
      cancel: '取消',
      ok: '確定',
    },
    js: {
      all: '所有',
      type1: '開不了鎖',
      type2: '單車故障',
      type3: '舉報違停',
      type4: '找不到車',
      type5: '無法停止計費',

      type13: '其他問題',
      type30: '電量低於3.5V',
      type31: '72小時未使用',
      type32: '處於騎行中超過6小時',

      status0: '未處理',
      status1: '已處理',
      status2: '已忽略',
      status3: '申诉中',

      optStatus1: '正常',
      optStatus2: '發現故障',
      optStatus3: '故障中',

      optAdmin: '運營專員',

      assignTo1: '線上',
      assignTo2: '線下',

      priority1: '優先級-高',
      priority2: '優先級-中',
      priority3: '優先級-低',
      priority0: '無標記',
    }
  },

  reportInfo: {
    box: {
      title1: '舉報詳情',
      title2: '舉報時單車位置 - 當前單車位置',
      title3: '舉報人信息',
      title4: '被舉報人信息',
      title5: '單車現狀',
      title6: '最後使用記錄',
      title7: '工單處理',
      title8: '工單歷史',
      title9: '未處理故障概況',
      title10: '舉報前一條使用記錄',
    },
    table1: {
      type: '舉報類型',
      bikeId: '單車編號',
      createdAt: '舉報時間',
      address: '舉報時單車位置',
      content: '故障類型',
      remark: '問題描述',
      img: '舉報圖片',
    },
    table2: {
      tip: '未處理工單',
      phone: '用戶手機號',
      email: '用戶郵箱',
      credit: '用戶信用分',
      reportCount: '舉報次數',
      beReportedCount: '被舉報次數',
      balance: '用戶餘額',
    },
    table3: {
      phone: '被舉報人手機號',
      email: '被舉報人郵箱',
      credit: '被舉報人信用分',
      isDone: '被舉報人是否因該違停已被扣過分',
      isDoneY: '是',
      isDoneN: '否',
      reportCount: '舉報次數',
      beReportedCount: '被舉報次數',
      balance: '用戶餘額',
    },
    table4: {
      bikeId: '單車編號',
      status: '使用狀態',
      electricity: '電量',
      useTime: '最後使用時間',
      optStatus: '運營狀態',
      address: '單車位置',
    },
    table5: {
      orderNo: '訂單編號',
      lockType: '結束類型',
      startTime: '最後使用時間',
      phone: '最後使用人',
      reportedMan: '是否被舉報人',
      reportMan: '是否舉報人',
      yes: '是',
      no: '否',
      minutes: '最後一次騎行時間',
      distance: '最後一次騎行距離',
      beginAddress: '起始位置',
      endAddress: '結束位置',

      status: '訂單狀態',
      status1: '預定中',
      status2: '取消預訂',
      status3: '騎行中',
      status4: '騎行結束',
      status5: '騎行結束',
    },
    table6: {
      priority: '標記為',
      priority1: '優先級-高',
      priority2: '優先級-中',
      priority3: '優先級-低',
      priority0: '取消標記',

      assignTo: '分配給',
      credit: '信用分',
      on: '是',
      off: '否',
      score: '應扣分數',
      score1: '已扣除分數',
      addCredit: '舉報人+{score}分',
      minusCredit: '被舉報人-{score}分',
      sendNoti: '發消息給用戶',
      yes: '是',
      no: '否',
      reporter: '發給舉報人',
      reported: '發給被舉報人',

      handleDesc: '備註',
      handle: '操作',
      save: '保存',
      handleConfirm: '已解決',
      handleIgnore: '忽略',
      mailto: '發郵件給',
    },
    table7: {
      report: '舉報',
      desc: '問題描述：',
      to: '改為',
      beforePriority: '優先級由',
      from: '由',
      beforeStatus: '工單狀態由',
      addRemark: '添加備註：',
    },
    table9: {
      type1: '開不了鎖',
      type2: '單車故障',
      type3: '舉報違停',
      type4: '定位不准',
      type5: '無法停止計費',
      type6: '其他問題',
      type30: '電量低於3.5V',
      type31: '72小時未使用',
      type32: '騎行超過6小時',
    },
    table10: {
      tip: '是否最後一條使用記錄',
      orderNo: '訂單編號',
      status: '訂單狀態',
      lockType: '結束類型',
      startTime: '使用時間',
      phone: '使用人',
      reportedMan: '是否被舉報人',
      reportMan: '是否舉報人',
      yes: '是',
      no: '否',
      minutes: '騎行時間',
      distance: '騎行距離',
      beginAddress: '起始位置',
      endAddress: '結束位置',
    },
    js: {
      assignTo1: '線上',
      assignTo2: '線下',

      bikeStatus0: '未激活',
      bikeStatus1: '可用',
      bikeStatus2: '被預定',
      bikeStatus3: '行駛中',
      bikeStatus4: '解鎖中',
      bikeStatus5: '禁用中',

      optStatus1: '正常',
      optStatus2: '發現故障',
      optStatus3: '故障中',
      optStatus4: '維修完成',
      optStatus0: '未激活',

      lockType1: '正常',
      lockType2: '歷史',
      lockType3: '運營手動',
      lockType6: '用戶手動',

      to: '改為',
      beforePriority: '優先級由',
      from: '由',
      beforeStatus: '工單狀態由',

      priority1: '優先級-高',
      priority2: '優先級-中',
      priority3: '優先級-低',
      priority0: '取消標記',

      status0: '未處理',
      status1: '已處理',
      status2: '已忽略',
      status3: '申诉中',
    }
  },

  addReport: {
    box: {
      title: '添加工單',
      goBack: '返回',
    },
    form: {
      type: '舉報類型',
      bikeId: '單車編號',
      bikeIdPlaceHolder: '請輸入單車編號',
      phone: '用戶手機號',
      phonePlaceHolder: '請輸入用戶手機號',
      content: '故障描述',
      img: '消息圖片',
      upload: '點擊上傳',
      uploadTip: '只能上傳jpg/png文件，且不超過500kb',
      assignTo: '分配給',
      priority: '添加標記',
      priority1: '優先級-高',
      priority2: '優先級-中',
      priority3: '優先級-低',
      priority0: '取消標記',
      remark: '備註',
      save: '保存',
    },
    js: {
      type1: '開不了鎖',
      type2: '單車故障',
      type3: '舉報違停',
      type4: '定位不准',
      type5: '無法停止計費',
      type6: '其他問題',
      type30: '電量低於3.5V',
      type31: '騎行超過6小時',
      type32: '72小時未使用',

      assignTo1: '線上',
      assignTo2: '線下',
    }
  },

  sms: {
    box: {
      title: '短信管理',
      goAdd: '發送短信',
    },
    query: {
      beginTime: '開始日期',
      endTime: '結束日期',
      chooseTime: '選擇日期',
      phone: '接收用戶手機號',
      sender: '發送人',
      countryId: '國家',
      provider: '運營商',
      action: '類型',
      success: '是否成功',
      type: '發送方式',
      query: '查詢',
    },
    table: {
      id: 'ID',
      phone: '接收用戶手機號',
      createdAt: '時間',
      sender: '發送人',
      context: '發送內容',
      provider: '發送運營商',
      success: '發送結果',
      resultInfo: '失敗原因',
      type: '發送方式',
      ip: 'IP',
      mask: '備註',
    },
    js: {
      all: '所有',
      success: '發送成功',
      fail: '發送失敗',
      inprocess: '發送中',
      sms: '短信',
      voice: '语音'
    },
  },

  addsms: {
    box: {
      title: '短信管理',
      goBack: '返回',
    },
    form: {
      template: '選擇模板',
      countryId: '國家',
      message: '短信內容',
      messagePlaceholder: '不超過140字符',
      phone: '發送給',
      phonePlaceholder: '輸入用戶手機號碼，多個用戶回車隔開',
      isBlackLimit: '是否啟用黑名單',
      remark: '備註',
      submit: '提交',
      clear: '清除',
    },
    js: {
      template1: '空白模板',
      template2: '關鎖提醒',
      template3: '行程終止提醒',
      template4: '道歉模板',
    },
  },

  smsTemplate: {
    query: {
      title: '短信模板',
      goAdd: '新建模板',
      name: '模板名稱',
      query: '查詢',
    },
    table: {
      id: 'ID',
      name: '模板名稱',
      language: '語言',
      content: '模版內容',
      operate: '操作',
      edit: '編輯',
      delete: '刪除',
    },
    dialog: {
      title: '新建模板',
      title1: '修改模板',
      name: '模板名稱',

      language: '語言',
      content: '內容',
      operate: '操作',
      edit: '編輯',
      finish: '保存',
      delete: '刪除',

      add: '添加語言',
      cancel: '取消',
      ok: '保存',
    },
    js: {
      deleteMessage: '確認刪除模板{name}?',
      tip: '提示',
      ok: '確認',
      cancel: '取消',
    }
  },

  smsLimit: {
    query: {
      title: '簡訊黑名單',
      goAdd: '添加',
      countryId: '國家码',
      phone: '手機號',
      query: '査詢',
    },
    table: {
      id: 'ID',
      countryId: '國家',
      phone: '手機號',
      remark: '備註',
      operate: '操作',
      edit: '編輯備註',
      delete: '删除'
    },
    dialog: {
      title: '添加黑名單',
      title1: '添加備註'
    },
    form: {
      countryId: '國家',
      phone: '手機號',
      placeholder: '多個手機號，請用換行隔開',
      remark: '備註',
      cancel: '取消',
      submit: '提交'
    },
    js: {
      deleteBlack: '確定要從黑名單中删除 {phone} 嗎?',
      textTip: '數據不正確，請重新輸入',
      tip: '删除黑名單',
      ok: '删除',
      cancel: '取消'
    }
  },

  student: {
    box: {
      title: '學生證審核',
      title1: '批量審核通過',
    },
    query: {
      beginTime: '開始日期',
      endTime: '結束日期',
      chooseTime: '選擇日期',
      countryId: '國家',
      status: '處理狀態',
      phone: '用戶手機號',
      studentNumber: '學號編號',
      query: '查詢',
    },
    table: {
      id: '編號',
      phone: '用戶手機號',
      createdAt: '提交時間',
      name: '姓名',
      school: '學校',
      studentNumber: '學號編號',
      img: '審核圖片',
      period: '學生證有效期',
      status: '審核狀態',
      remark: '審核備註',
      operate: '操作',
      detail: '詳情',
      apply: '審核通過',
    },
    dialog: {
      title: '確認批量審核通過所選學生?',
      sendNoti: '發消息給用戶',
      yes: '是',
      no: '否',
      ok: '確定',
      cancel: '取消',
    },
    js: {
      all: '所有',
      status0: '未處理',
      status1: '審核通過',
      status2: '審核未通過',

      confirm: '確認通過學生 {phone} 的審核?',
      confirmAll: '確認批量審核通過所選學生?',
      tip: '提示',
      ok: '確定',
      cancel: '取消',
    }
  },

  studentInfo: {
    box: {
      title: '學生證審核操作',
      title1: '驗證信息',
      title2: '審核處理',
      title3: '操作歷史',
    },
    table1: {
      phone: '用戶手機號',
      name: '用戶姓名',
      school: '用戶學校',
      studentNumber: '學生證號',
      period: '學生證有效期',
      img: '審核圖片',
    },
    table2: {
      status: '審核狀態',
      do: '修改',
      undo: '取消修改',
      period: '學生證有效期',
      beginTime: '起始日期',
      endTime: '結束日期',
      reason: '未通過原因',
      reasonPlaceHolder: '請輸入失敗原因',
      operate: '操作',
      apply: '審核通過',
      upapply: '審核未通過',
      sendNoti: '發消息給用戶',
      yes: '是',
      no: '否',
    },
    table3: {
      createdAt: '操作時間',
      name: '操作人',
      remark: '備註',
    },
    js: {
      notClear: '照片不清晰',
      notMatch: '信息不符合',
      expired: '學生證過期',
      invalid: '無效的學生證',
      incomplete: '信息不完整',
      notCard: '不是學生證',
      other: '其他',

      zh: '中文',
      en: '英文',
      tw: '繁體',
    }
  },

  monitor: {
    box: {
      title1: '車輛監控',
      title2: '單車列表 -- 總 {length} 條數據'
    },
    query: {
      bikeId: '單車ID',
      bikeIdPlaceHolder: '請輸入單車編號',
      status: '單車狀態',
      optStatus: '運營狀態',
      radius: '搜索半徑',
      address: '地址',
      addressPlaceholder: '請輸入地址自動搜索並選擇地址',
      clearAddress: '清除地址',
      showMap: '收起/打開地圖',
      query: '查詢',
    },
    table: {
      id: 'ID',
      status: '使用狀態',
      optStatus: '運營狀態',
      electricity: '電壓',
      useTime: '上報電壓時間',
      address: '當前位置',
      operate: '操作',
      detail: '查看詳情',
      setCenter: '定位地圖',
      goTrip: '查看行程記錄',
      goReport: '查看未處理工單',
      reset: '重置單車位置',
    },
    dialog: {
      title0: '詳情',
      title1: '單車信息',
      id: '單車編號',
      optStatus: '運營狀態',
      status: '使用狀態',
      electricity: '電量',
      address: '當前位置',

      title2: '單車用車記錄',
      orderNo: '訂單編號',
      userId: '用戶編號',
      price: '用車費用',
      minutes: '騎行時間',
      distance: '騎行路程',
      startTime: '行程開始時間',
      endTime: '行程結束時間',
    },
    js: {
      all: '所有',
      status0: '未激活',
      status1: '可用',
      status2: '被預定',
      status3: '行駛中',
      status4: '解鎖中',
      status5: '禁用中',

      optStatus0: '未激活',
      optStatus1: '正常',
      optStatus2: '發現故障',
      optStatus3: '故障中',
      optStatus4: '維修完成',

      radius1: '1公里內',
      radius3: '3公里內',
      radius5: '5公里內',
      radius10: '10公里內',

      id: '單車ID：',
      optStatus: '運營狀態：',
      status: '使用狀態：',
      electricity: '電壓：',

      resetTitle: '確認重置單車{bikeId}的位置？重置後地圖上將看不到該單車',
      tip: '提示',
      ok: '確認',
      cancel: '取消',
    }
  },

  trip: {
    query: {
      title: '行程記錄',

      startTime: '起始日期',
      endTime: '結束日期',
      chooseTime: '選擇日期',
      phone: '用戶手機號',
      bikeId: '單車編號',
      status: '訂單狀態',
      lockType: '結束方式',
      countryId: '國家',
      cityId: '城市',

      query: '查詢',
    },
    table: {
      id: '訂單ID',
      phone: '用戶手機號',
      bikeId: '單車編號',
      tradeNo: '鎖交易號',
      minutes: '騎行時間(min)',
      distance: '騎行距離(m)',
      area: '單車所屬國家',
      startTime: '起始時間',
      tempEndTime: '手動結束時間',
      endTime: '實際結束時間',
      price: '應付費用',
      actualPrice: '實付費用',
      reason: '減免原因',
      status: '訂單狀態',
      lockType: '結束方式',
      operate: '操作',
      stopTrip: '結束行程',
      payBack: '消費退款',
    },
    dialog: {
      title: '確認要結束行程嗎？ ',
      title1: '是否確認消費退款？',
      time: '請確認行程時間(min)：',
      startTime: '開始時間',
      endTime: '結束時間',
      sendNoti: '發消息給用戶',
      yes: '是',
      no: '否',
      cancel: '取 消',
      ok: '確 定',
      phone: '用戶手機號',
      amount: '退款金额',
      remark: '備註',
      amountTips: '退款金額需大於0且小於等於 {actualPrice}',
    },
    js: {
      all: '所有',
      status1: '預定中',
      status2: '取消預訂',
      status3: '騎行中',
      status4: '騎行結束',
      status5: '騎行結束',

      lockType1: '正常',
      lockType2: '歷史',
      lockType3: '運營手動',
      lockType6: '用戶手動',

      reason1: '免费日',
      reason2: '優惠券',
      reason3: 'VIP',
      reason4: 'SVIP',
      reason5: 'SVIP家庭成員',
      reason6: '企業號',
    }
  },

  tag: {
    query: {
      title: '投放標籤管理',
      countryId: '國家',
      cityId: '城市',
      categoryId: '標籤目錄',
      type: '標籤類別',
      modifyTime: '編輯時間',
      chooseTime: '選擇時間範圍',
      name: '投放標籤',
      coordinate: '位置搜索',
      coordinatePlaceholder: '經緯度以英文逗號分隔',
      singleAdd: '单个添加',
      batchAdd: '批量导入',
      query: '查詢',
    },
    table: {
      id: 'ID',
      countryName: '國家',
      cityName: '城市',
      type: '標籤類別',
      categoryName: '標籤目錄',
      name: '投放標籤',
      coordinate: '經緯度',
      remark: '備註',
      updatedAt: '更新時間',
      updatedName: '操作人',
      operate: '操作',
      edit: '編輯',
      detail: '詳情',
      goBike: '查看單車',
      deleteTag: '刪除',
      uploadNote: '注意：每个城市对应一个表格',
      uploadText: '点击上传',
      uploadTip: '只能上传xls/xlsx文件，且不超过2M'
    },

    js: {
      all: '所有',
      type1: '投放標籤',
      deleteMessage: '確認刪除標籤：{name}?',
      tip: '提示',
      ok: '確認',
      cancel: '取消',
      exceed: '一次只能上传一个文件，如需修改，请先删除先前上传的文件'
    }
  },

  addTag: {
    form: {
      title: '配置標籤',
      goBack: '返回',
      countryId: '國家',
      cityId: '城市',
      type: '標籤類別',
      categoryId: '標籤目錄',
      name: '標籤名稱',
      coordinate: '經緯度',
      coordinatePlaceholder: '經緯度以英文逗號分隔',
      remark: '備註',
      submit: '保存',
    },
  },

  category: {
    query: {
      title: '標籤目錄管理',
      countryId: '國家',
      cityId: '城市',
      type: '標籤類別',
      modifyTime: '編輯時間',
      chooseTime: '選擇時間範圍',
      query: '查詢',
    },
    table: {
      id: 'ID',
      countryName: '國家',
      cityName: '城市',
      type: '標籤類別',
      name: '標籤目錄',
      coordinate: '經緯度',
      remark: '備註',
      updatedAt: '更新時間',
      updatedName: '操作人',
      operate: '操作',
      edit: '編輯',
      deleteCategory: '刪除',
    },
    form: {
      title: '標籤目錄管理',
      countryId: '國家',
      cityId: '城市',
      type: '標籤類別',
      name: '標籤目錄',
      remark: '備註',
      cancel: '取消',
      submit: '保存',
    },
    js: {
      all: '所有',
      type1: '投放標籤',
      deleteMessage: '確認刪除標籤目錄：{name}?',
      deleteMessage1: '該目錄下仍有 {len} 個標籤，請先刪除標籤後，再刪除目錄',
      tip: '提示',
      ok: '確認',
      cancel: '取消',
    }
  },

  // 停車區域管理 zhu 2017/04/13
  bikearea: {
    query: {
      title: '停車區域管理',
      countryId: '國家',
      cityId: '城市',
      usingFlag: '狀態',
      parking: '設定區域',
      query: '查詢'
    },
    table: {
      id: 'ID',
      country: '國家',
      city: '城市',
      state: '狀態',
      parking: '設定區域',
      areaNum: '停車點',
      file: '文件',
      download: '點擊下載',
      remark: '備註',
      operate: '操作',
      edit: '編輯狀態',
      view: '詳情',
      import: '導入數據'
    },
    dialog: {
      title: '停車區域設置'
    },
    js: {
      status: '所有',
      status0: '禁用',
      status1: '啟用',
      failure: '文件上傳失敗！ ',

      all: '所有',
      parking0: '禁車點',
      parking1: '停車點',

      uploadTip: '只能一個上傳.xls/.xlsx檔案',
      uploadMust: '請選擇上傳文件',
      uploadOnly: '只允許選取一個檔案，如需替换，请先删除之前选中文件'
    },
    form: {
      countryId: '國家',
      cityId: '城市',
      usingFlag: '停車',
      usingNotFlag: '禁車位',
      remark: '備註',
      remarkTip: '500字以內',
      remarkError: '已超過500字請修改後提交',
      importUsing: '停車位文件',
      importNotUsing: '禁車位文件',
      choose: '選擇文件',
      upload: '立即上傳',
      uploadTip: '文件類型',
      cancel: '取消',
      submit: '確定'
    },
    edit: {
      title: '修改區域狀態',
      countryId: '國家',
      cityId: '城市',
      usingFlag: '狀態',
      remark: '備註'
    },
    imports: {
      title: '導入數據',
      countryId: '國家',
      cityId: '城市',
      import: '導入文件',
      choose: '選擇文件',
      remark: '備註',
      cancel: '取消',
      submit: '確定'
    }
  },

  bikeareainfo: {
    form: {
      title: '停車區域詳情',
      basic: '基本信息',
      operator: '操作記錄'
    },
    table: {
      country: '國家',
      city: '城市',
      state: '狀態',
      areaNum: '停車位(個)',
      remark: '備註',
      operateTime: '操作時間',
      activity: '動作',
      operater: '操作人',
      operate: '操作'
    }
  },

  user: {
    query: {
      title: '用戶信息',
      createdAt: '開始日期',
      endTime: '結束日期',
      chooseTime: '選擇日期',
      phone: '用戶手機號',
      memberId: '用戶ID',
      countryId: '國家',
      query: '查詢',
    },
    table: {
      memberId: '用戶ID',
      createdAt: '用戶註冊時間',
      phone: '用戶手機號',
      name: '國家',
      cyclingMinutes: '總騎行時間(min)',
      mileage: '總騎行路程(m)',
      cyclingCount: '總騎行次數',
      credit: '信用分',
      deposit: '押金',
      balance: '賬戶餘額',
      status: '賬戶狀態',
      sportsAchievement: '總消耗卡路里',
      carbonEmissions: '總減少碳排放',
      operate: '操作',
      trip: '查看用車記錄',
      pay: '查看支付明細',
      trade: '查看交易明細',
      creditDetail: '查看信用明細',
      device: '查看設備信息',
      userCoupon: '查看用戶優惠券',
      addUserCoupon: '贈送優惠券',
      goAddBalance: '調整餘額',
      goPushMessage: '推送消息',
      sms: '發送短信',
      statusBtn1: '凍結',
      statusBtn0: '解凍',
      viewVipUsers: '查看用戶會員',
      vipGift: '贈送會員'
    },
    js: {
      status0: '凍結',
      status1: '正常',
      statusString0: '解凍該用戶?',
      statusString1: '凍結該用戶?',
      tip: '提示',
      ok: '確定',
      cancel: '取消',
    },
    dialog: {
      gift: '贈送會員',
      countryId: '國家',
      phone: '手機號',
      vipLimit: '會員期限',
      day: '天',
      cardinfo: '會員卡資訊',
      name: '會員卡名稱',
      days: '會員卡天數',
      empty: '無',
      price: '會員卡價格：',
      limited: '會員卡限制：',
      limitedC: '前{freeTimes}次免費{freeMinutes}分鐘',
      nolimited: '不限制次數，不限制時間',
      renew: '續費價：',
      promotion: '促銷價：',

      isSendMessage: '發送消息給用戶',
      yes: '是',
      no: '否',

      cancel: '取消',
      ok: '確定'
    }
  },

  device: {
    query: {
      title: '用戶設備信息',
      phone: '手機號',
      countryId: '國家',
      firebaseToken: 'FireBase Token',
      deviceName: '設備名稱',
      version: '系統版本',
      language: '系統語言',
      query: '查詢',
    },
    table: {
      id: 'ID',
      phone: '手機號',
      country: '國家',
      firebaseToken: 'FireBase Token',
      deviceName: '設備名稱',
      deviceId: '設備ID',
      appVersion: 'app版本',
      version: '系統版本',
      language: '系統語言',
    }
  },

  userCoupon: {
    query: {
      title: '用戶優惠券',
      goAdd: '贈送優惠券',
      phone: '手機號',
      used: '優惠券狀態',
      couponType: '優惠來源',
      query: '查詢',
    },
    table: {
      id: 'ID',
      phone: '手機號',
      createdAt: '獲得時間',
      couponType: '優惠來源',
      benefitMoney: '優惠券內容',
      days: '優惠券有效期',
      area: '限制區域',
      used: '優惠券狀態',
      operate: '操作',
      detail: '查看詳情',
      addUserCoupon: '贈送優惠券',
    },
    js: {
      all: '所有',
      used0: '未使用',
      used1: '已使用',
      used2: '已過期',

      couponType1: '邀請碼',
      couponType2: '優惠碼',
      couponType3: '邀請獎勵',
      couponType4: '運營贈送',
      couponType5: '用戶註冊贈送優惠券',
      couponType7: '獎勵系統優惠券',

      unRegister: '暫未註冊',
    }
  },

  addUserCoupon: {
    form: {
      title: '贈送優惠券',
      memberCountryId: '國家',
      memberPhone: '用戶手機號',
      quantity: '優惠券張數',
      couponId: '兌換優惠券',
      toAdd: '添加優惠券',
      detail: '優惠券詳情',
      content: '普通優惠碼',
      days: '有效期',
      area: '限制區域',
      sendNoti: '發消息給用戶',
      yes: '是',
      no: '否',
      submit: '提交',
    },
    js: {
      type: '普通優惠碼',
      status1: '激活',
      status2: '失效',
      day: '天',
      benefitType1: '折扣',
      benefitType2: '金額',
    }
  },

  userCouponInfo: {
    table: {
      title1: '基本信息',
      title2: '優惠券來源',
      title3: '使用情況',

      id: '優惠券ID',
      phone: '用戶',
      createdAt: '獲得時間',
      used: '優惠券狀態',
      couponType: '優惠券類型',
      benefitMoney: '優惠內容',
      area: '限制地區',
      days: '有效期',
    },
    table1: {
      couponType: '優惠券來源',

      inviteCode: '邀請碼',
      inviteMemberPhone: '邀請人',

      exchangeCode: '优惠兑换码',
      exchangeQuantity: '兌換張數',
      benefitMoney: '兌換的優惠券',
      exchangeDays: '有效期',

      fromMemberPhone: '被邀請人',
      ifFinishRide: '被邀請人是否完成騎行',
      ifFinishRideValue: '是',
      trip: '查看騎行記錄',

      sendQuantity: '贈送張數',
      benefitMoney1: '贈送的優惠券內容',
    },
    table2: {
      orderNo: '訂單編號',
      bikeId: '單車編號',
      minutes: '騎行時間',
      distance: '騎行距離',
      price: '應扣金額',
      actualPrice: '實扣金額',
      reason: '優惠原因',
      startTime: '起始時間',
      endTime: '結束時間',
    },
    js: {
      all: '所有',
      status1: '預定中',
      status2: '取消預訂',
      status3: '騎行中',
      status4: '騎行結束',
      status5: '騎行結束',

      lockType1: '正常',
      lockType2: '歷史',
      lockType3: '運營手動',
      lockType6: '用戶手動',

      reason1: '免費活動',
      reason2: '優惠券',
      reason3: '會員卡',
    }
  },

  uservip: {
    query: {
      title: '用戶會員資訊',
      countryId: '國家',
      phone: '用戶手機號',
      datetimerange: '起止日期',
      chooseTime: '選擇時間範圍',
      vipsource: '會員來源',
      viptype: '會員期限',
      status: '會員狀態',
      autopay: '是否自動續費',
      query: '査詢',
      giftvip: '贈送會員',
      automng: '自动续费管理',
      superVip: '會員類型'
    },
    table: {
      id: 'ID',
      phone: '手機號',
      countryId: '國家',
      viptype: '會員期限',
      vipsource: '會員來源',
      gettime: '獲得時間',
      effectivetime: '生效日期',
      deadlinetime: '到期日期',
      status: '會員狀態',
      autopay: '是否自動續費',
      operate: '操作',
      giftvip: '贈送會員',
      cancelvip: '取消會員',
      delayvip: '會員延期',
      day: '天'
    },
    dialog: {
      giftvip: '贈送會員',
      countryId: '國家',
      phone: '手機號',
      vipLimit: '會員期限',
      day: '天',
      cardinfo: '會員卡資訊',
      name: '會員卡名稱：',
      days: '會員卡天數：',
      empty: '无',
      price: '會員卡價格：',
      limited: '會員卡限制：',
      limitedC: '前{freeTimes}次免费{freeMinutes}分钟',
      nolimited: '不限制次數，不限制時間',
      renew: '續費價：',
      promotion: '促銷價：',
      isSendMessage: '發送消息給用戶',
      yes: '是',
      no: '否',
      cancel: '取消',
      ok: '确定',
      cancelvip: '取消會員',
      payway: '購買該會員的支付方式',
      cancelTip: '點擊確定後用餘額、押金、OCN支付的部分將自動退還，用其他支付方式支付的部分需手動退還。',
      delayvip: '會員延期'
    },
    js: {
      all: '所有',
      unknown: '未知',

      buyCard: '用戶購買',
      giveCard: '贈送',
      delayCard: '延期會員',

      canceled: '已取消',
      valid: '已生效',
      invalid: '未生效',
      overdue: '已过期',

      no: '否',
      yes: '是',

      others: '(有延期)',

      nonSuperVip:'普通VIP',
      superVip:'超级VIP'
    }
  },

  // 自动续费管理 2017.10.27 zhu
  autopay: {
    query: {
      title: '会员自动续费管理',
      autocancel: '取消自动续费记录',
      countryId: '国家',
      phone: '用户手机号',
      days: '会员卡期限',
      query: '查询',
      tip: '此页面仅列出所有自动续费的用户信息，未列出的用户即代表不自动续费'
    },
    table: {
      id: 'ID',
      phone: '手机号',
      countryId: '国家',
      days: '会员卡期限',
      renewPrice: '自动续费价格',
      renewTime: '下次扣费时间',
      operate: '操作',
      cancelauto: '取消自动续费'
    },
    js: {
      deleteMessage: '确定取消 {name} 的自动续费？',
      tip: '提示信息',
      ok: '确定',
      cancel: '取消'
    }
  },

  autocancel: {
    query: {
      title: '后台取消自动续费记录',
      phone: '用户手机号',
      countryId: '国家',
      adminPhone: '操作人手机号',
      query: '查询',
      back: '返回'
    },
    table: {
      id: 'ID',
      phone: '手机号',
      countryId: '国家',
      admin: '操作人',
      createdAt: '操作时间'
    }
  },

  // 用户奖励信息 2018.01.11
  redpacket: {
    query: {
      title: '用户奖励信息',
      datetimerange: '领取时间',
      countryId: '单车国家',
      cityId: '单车城市',
      phone: '手机号码',
      bikeId: '单车编号',
      rewardType: '奖励类型',
      rewardName: '奖励活动名称',
      receivedType: '领取状态',
      receivedMethod: '领取途径',
      query: '查询'
    },

    table: {
      id: 'ID',
      bikeId: '单车编号',
      phone: '手机号码',
      countryId: '单车国家',
      cityId: '单车城市',
      getTime: '领取时间',
      rewardType: '奖励类型',
      rewardName: '奖励活动名称',
      rewardContent: '奖励资源',
      check: '查看',
      errorReason: '失败原因',
      rewardReasonType: '领取途径',
      tripRecord: '行程记录',
      operate: '操作'
    },
    dialog: {
      title: '奖励资源',
      expiredTime: '截止日期',
      region: '适用区域',
    },

    js: {
      all: '所有',
      rewardType1: '第三方红包',
      rewardType2: '奖励活动',

      receivedType0: '领取失败',
      receivedType1: '领取成功',
      receivedType2: '未领取',
      
      rewardReasonType1: '图标活动',
      rewardReasonType2: '电子围栏',

      benefitType1: '折扣',
      benefitType2: '金额',
    }
  },

  credit: {
    query: {
      title: '信用分管理',
      beginTime: '開始日期',
      endTime: '結束日期',
      chooseTime: '選擇日期',
      phone: '用戶手機號',
      subject: '變動原因',
      query: '查詢',
    },
    table: {
      id: '信用分ID',
      phone: '用戶手機號',
      currentAmount: '變動前積分',
      amount: '變動積分',
      afterChangeAmount: '變動後積分',
      subjectName: '變動原因',
      createName: '處理人',
      createdAt: '處理時間',
      desc: '備註',
      operate: '操作',
      edit: '編輯',
      detail: '明細',
    }
  },

  addCredit: {
    form: {
      title: '添加信用分記錄',
      phone: '用戶手機號',
      credit: '當前信用積分',
      subject: '變動原因',
      creditChange: '積分變動',
      remark: '更新描述',
      remarkPlaceholder: '不超過100字',
      submit: '提交',
    },
    js: {
      subject1: '註冊贈送',
      subject2: '正常騎行一次',
      subject3: '上報故障，經核實有效，一次',
      subject4: '舉報違停，經核實有效',
      subject5: '邀請好友註冊',
      subject6: '填寫邀請碼',
      subject7: '首次分享行程',
      subject8: '違停一次',
      subject9: '忘記關鎖，車輛找回，一次',
      subject10: '交警阻攔，棄車逃走',
      subject11: '加裝私鎖',
      subject12: '忘記關鎖，車輛丟失',
      subject13: '非法移車',
      subject14: '被舉報違停',
      subject15: '分享獎勵',
      subject16: '其他',
      subject17: '禁停区停车',
      subject18: '停车区停车',
      subject19: '停车点停车',
      subject20: '管制区停车',
      subject21: '图标活动奖励',
      message: '未查詢到用戶',
    }
  },

  trade: {
    query: {
      title: '交易明細管理',
      goAdd: '餘額調整',
      beginTime: '開始日期',
      endTime: '結束日期',
      chooseTime: '選擇日期',
      phone: '用戶手機號',
      subject: '交易用途',
      statementNo: '交易流水號',
      tradeNo: '支付流水號',
      paid: '支付結果',
      countryId: '國家',
      query: '查詢',
    },
    table: {
      id: '交易ID',
      payTime: '交易時間',
      statementNo: '交易流水號',
      tradeNo: '支付流水號',
      phone: '用戶手機號',
      currentDeposit: '當前押金',
      currentBalance: '當前餘額',
      amount: '交易金額',
      payFee: '手續費',
      subjectName: '交易用途',
      paid: '支付結果',
      isDirty: '狀態',
      operate: '操作',
      detail: '詳情',
    },
    dialog: {
      title1: '交易詳情',
      title2: '基本信息',
      title3: '交易記錄',
      title4: '詳細記錄',

      payTime: '交易時間',
      phone: '用戶手機號',
      subjectName: '交易類型',
      amount: '交易金額',
      afterChangeBalance: '賬戶餘額',

      payMethod: '支付方',
      statementNo: '交易流水號',
      tradeNo: '支付流水號',
      cardType: '卡類型',
      paid: '交易結果',

      orderNo: '訂單號',
      bikeId: '單車編號',
      minutes: '騎行時間',
      distance: '騎行距離',
      price: '應付費用',
      actualPrice: '實付費用',
      reason: '減免原因',
      lockType: '結束方式',
      startTime: '起始時間',
      tempEndTime: '手動結束時間',
      endTime: '實際結束時間',
      startAddress: '起始位置',
      endAddress: '結束位置',
    },
    js: {
      all: '所有',
      paid1: '已支付',
      paid0: '未支付',

      subject1: '押金充值',
      subject2: '餘額充值',
      subject3: '押金退款',
      subject4: '運營贈送',
      subject5: '騎行消費',
      subject6: '罰金',
      subject7: '會員卡',
      subject8: '消費退款',
      subject9: '扣除罰金',
      subject10: '充值返現',
      subject11: '充值退款',
      subject12: '其他',
      subject13: '餘額退款',
      subject14: '押金退款手續費',
      subject15: '會員退款',
      subject16: '押金轉餘額',

      isDirty1: '已修正',
      isDirty2: '未修正',
      isDirty0: '正常',

      lockType1: '正常',
      lockType2: '歷史',
      lockType3: '運營手動',
      lockType6: '用戶手動',

      reason1: '免費活動',
      reason2: '優惠券',
      reason3: '會員卡',
    }
  },

  addBalance: {
    form: {
      title: '餘額調整',
      countryId: '國家',
      phone: '用戶手機號',
      amount: '變化金額',
      plus1: '增',
      plus2: '減',
      subject: '變動原因',
      orderNo: '關聯流水號',
      remark: '備註',
      sendNoti: '發消息給用戶',
      yes: '是',
      no: '否',
      submit: '提交',
      clear: '清除',
      moreThenZero: '請填入大於0的數字',
    },
    js: {
      plus1: '增',
      plus2: '減',
      subject4: '運營贈送',
      subject8: '消費退款',
      subject9: '扣除罰金',
      subject11: '充值退款',
      subject12: '其他',

      message: '修改成功！ ',
      tip: '提示',
      ok: '發短信通知用戶',
      cancel: '完成',
    }
  },

  payment: {
    query: {
      title: '支付明細管理',
      beginTime: '起始日期',
      endTime: '結束日期',
      chooseTime: '選擇日期',
      phone: '用戶手機號',
      payMethod: '支付方式',
      statementNo: '交易流水號',
      tradeNo: '支付流水號',
      paid: '支付結果',
      payStatus: '支付狀態',
      countryId: '國家',
      query: '查詢',
    },
    table: {
      createdAt: '創建日期',
      payTime: '支付日期',
      phone: '用戶手機號',
      statementNo: '交易流水號',
      payMethod: '支付方',
      cardType: '卡類型',
      tradeNo: '支付流水號',
      currency: '支付幣種',
      amount: '支付金額',
      payAccount: '支付賬戶',
      subjectName: '支付用途',
      paid: '支付結果',
      payStatus: '支付狀態',
      isDirty: '狀態',
      operate: '操作',
      detail: '詳情',
    },
    dialog: {
      title1: '交易詳情',
      title2: '基本信息',
      title3: '支付記錄',
      title4: '詳細記錄',

      payTime: '支付日期',
      phone: '用戶手機號',
      subjectName: '支付用途',
      amount: '支付金額',
      afterChangeBalance: '賬戶餘額',

      payMethod: '支付方',
      statementNo: '交易流水號',
      tradeNo: '支付流水號',
      cardType: '卡類型',
      paid: '交易結果',

      orderNo: '訂單號',
      minutes: '騎行時間',
      distance: '騎行距離',
      startTime: '起始時間',
      endTime: 'endTime',
      startAddress: '起始位置',
      endAddress: '結束位置',
    },
    js: {
      all: '所有',

      paid1: '已支付',
      paid0: '未支付',

      isDirty1: '已修正',
      isDirty2: '未修正',
      isDirty0: '正常',

      payStatus0: '未支付',
      payStatus1: '交易成功',
      payStatus2: '待支付',
      payStatus3: '交易失敗',
      payStatus4: '支付取消',
      payStatus5: '交易中',
      payStatus6: '退款掛起',
    }
  },

  // 單車國家配置 zhu 2017.05.03
  stateconfig: {
    query: {
      title: '單車國家配置',
      countryId: '國家',
      code: '編號查詢',
      tip: '請輸入3位編碼',
      query: '查詢',
      codeTip: '請輸入3位有效編碼',
      all: '所有'
    },
    table: {
      id: '編號',
      countryName: '國家',
      code: '單車編碼',
      operate: '操作',
      edit: '編輯',
      view: '查看操作日誌'
    },
    dialog: {
      title0: '添加單車國家配置',
      title1: '編輯單車國家配置'
    },
    form: {
      countryId: '請選擇國家',
      code: '單車編號',
      tip: '請輸入單車前3位編號',
      coderule: '單車編號規則',
      codeTip: '請輸入3位有效編碼',
      cancel: '取消',
      submit: '保存'
    }
  },

  stateinfo: {
    form: {
      title: '操作日誌',
      basic: '基本信息',
      operator: '操作記錄'
    },
    table: {
      countryName: '國家',
      code: '單車編號',
      operateTime: '操作時間',
      action: '日誌'
    }
  },

  lock: {
    query: {
      title: '鎖信息管理',
      goAdd: '添加鎖信息',
      createdAt: '入庫日期',
      chooseTime: '選擇日期範圍',
      type: '鎖類型',
      manufacture: '鎖廠商',
      status: '鎖狀態',
      lockNo: '鎖編號',
      imei: '鎖設備號',
      query: '查詢',
    },
    table: {
      lockId: '鎖ID',
      lockNo: '鎖編號',
      imei: '鎖設備號',
      type: '鎖類型',
      manufacture: '鎖廠商',
      status: '鎖狀態',
      electricity: '電量',
      id: '關聯車輛編號',
      secretKey: 'secret_key',
      unlockKey: 'unlock_key',
      lockCreatedAt: '入庫時間',
      simNo: 'sim卡號',
      operate: '操作',
      detail: '詳情',
      edit: '編輯',
      delete: '刪除',

      title: '鎖詳情',
    },
    js: {
      all: '所有',
      type1: '藍牙一代',
      type2: '藍牙二代',
      type3: '藍牙三代',

      status1: '正常',
      status2: '維修中',
      status3: '報廢',

      manufacture1: '泺平',
      manufacture2: '深国科',

      message: '確認刪除鎖 {lockNo} ?',
      tip: '提示',
      ok: '確定',
      cancel: '取消',
    }
  },

  addLock: {
    form: {
      title1: '單個添加鎖信息',
      title2: '批量添加鎖信息',

      type: '鎖類型',
      lockNo: '鎖編號',
      imei: '鎖設備號',
      secretKey: 'secret_key',
      unlockKey: 'unlock_key',
      simNo: 'sim卡號',
      btId: '藍牙設備ID',
      submit: '提交',

      import: '批量導入',
      tip: '數據量較大時，上傳處理時間比較長，請耐心等待。 ',
    },
    js: {
      type1: '藍牙一代',
      type2: '藍牙二代',
      type3: '藍牙三代',
      msg: '導入{success}條數據成功，{fail}條數據失敗',
    }
  },

  bike: {
    query: {
      title: '單車基本信息',
      bikeId: '單車編號',
      countryId: '國家',
      cityId: '城市',
      lockNo: '鎖編號',
      status: '單車使用狀態',
      optStatus: '單車運營狀態',
      activedTime: '激活時間',
      createdTime: '入庫時間',
      chooseTime: '選擇時間範圍',
      tagId: '投放標籤',
      helmet: '頭盔',
      query: '查詢',
    },
    table: {
      tip: '注：單車編號第4位表示單車尺寸，0-4表示26寸，5-9表示24寸， 例如065000001表示26寸單車， 065500001表示24寸單車',
      id: '單車編號',
      lockNo: '鎖編號',
      status: '單車使用狀態',
      optStatus: '單車運營狀態',
      area: '單車所屬國家',
      tagName: '投放標籤',
      createdName: '入庫負責人',
      jihuo: '激活負責人',
      createdAt: '入庫時間',
      activitedTime: '激活時間',
      useTime: '最近使用時間',
      helmet: '頭盔',
      operate: '操作',
      editHelmet: '編輯',
      unbind: '解綁',
      goTrip: '查看用車記錄',
      detail: '詳情',
      forbidden: '禁用',
      unForbidden: '解禁',
      activateBike: '激活',
      reset: '重置單車位置',
      unbindBike: '解綁',
      showEditCountry: '修改國家和城市',
      title: '單車詳情',

      title1: '確認要禁用單車 {bikeId} 嗎？ ',
      desc: '描述',
      cancel: '取消',
      ok: '確認',
    },
    dialog: {
      title2: '修改單車的國家城市信息',
      title3: '編輯頭盔狀態',
      helmet: '是否有頭盔',
      bikeId: '單車編號',
      countryId: '國家',
      cityId: '城市',
      tagId: '標籤',
      cancel: '取消',
      ok: '保存',
    },
    js: {
      all: '所有',
      none: '無',
      status0: '未激活',
      status1: '可用',
      status2: '被預定',
      status3: '行駛中',
      status4: '解鎖中',
      status5: '禁用中',

      optStatus0: '未激活',
      optStatus1: '正常',
      optStatus2: '發現故障',
      optStatus3: '故障中',
      optStatus4: '維修完成',

      lockType1: '正常',
      lockType2: '歷史',
      lockType3: '運營手動',
      lockType6: '用戶手動',

      helmet0: '否',
      helmet1: '是',

      type1: '藍牙一代',
      type2: '藍牙二代',
      type3: '藍牙三代',
      forbiddenReason: 'admin後台禁用',

      message: '確認要解禁單車 {bikeId} 嗎？ ',
      tip: '提示',
      ok: '確認',
      cancel: '取消',

      resetTitle: '確認重置單車{bikeId}的位置？重置後地圖上將看不到該單車',

      activateTitle: '確認激活單車 {bikeId} ？ ',
      activateSuccess: '激活成功',

      unbindTitle: '當前車輛狀態為{status}，是否確定解綁？ ',
      unbindSuccess: '解綁成功',
    }
  },

  addBike: {
    query: {
      title: '添加單車信息',
      bikeId: '單車編號',
      bikeIdPlaceHolder: '請輸入9位單車編號',
      lockNo: '鎖編號',
      lockNoPlaceholder: '請輸入鎖編號',
      imei: '鎖設備號',
      mac: 'MAC地址',
      query: '提交',
    }
  },

  // 邀請好友贈送管理 zhu 2017.04.25
  invite: {
    query: {
      title: '邀請好友贈送管理'
    },
    table: {
      id: 'ID',
      countryName: '國家',
      num: '贈送券的數量',
      benefitMoney: '贈送券的額度',
      days: '券的有效期',
      limitArea: '限制區域',
      operate: '操作',
      view: '查看操作日誌',
      edit: '編輯',
      createdAt: '時間',
      adminName: '操作人(角色)',
      remark: '修改內容'
    },
    form: {
      title: '新增邀請被邀請優惠券',
      title0: '修改邀請被邀請優惠券',
      title1: '修改日誌',
      countryId: '國家',
      num: '數量',
      benefitMoney: '額度',
      days: '有效期',
      day: '天',
      limitArea: '限制區域',
      submit: '保存',
      cancel: '取消'
    },
    js: {
      nolimit: '不限',
      limitArea: '不限－所有城市'
    }
  },

  // 广告位 zhu 2017.09.01
  adarea: {
    query: {
      title: '廣告位管理',
      add: '添加',
      addad1: '配寘首頁彈窗',
      addad2: '配寘首頁輪播',
      addad3: '配寘頂部橫幅',
      addad4: '配寘圖標',
      addad5: '配寘一鍵購買會員',
      type: '廣告位',
      name: '活動名稱',
      countryId: '投放國家',
      activityDate: '活動日期',
      chooseTime: '選擇日期',
      status: '狀態',
      query: '査詢'
    },
    table: {
      id: 'ID',
      type: '廣告位',
      name: '活動名稱',
      countryId: '投放國家',
      date: '活動起止日期',
      repeat: '是否重複顯示',
      status: '狀態',
      languages: '語言',
      title: '標題',
      content: '內容',
      pic: '圖片/圖標',
      link: '跳轉',
      linkAddr1: '連結位址：',
      linkAddr2: '應用內頁面：',
      AndroidAddr: '安卓連結：',
      iOSAddr: 'iOS連結：',
      operate: '操作',
      edit: '編輯',
      detail: '詳情'
    },
    js: {
      all: '所有',

      type1: '首頁彈窗',
      type2: '首頁輪播',
      type3: '頂部橫幅',
      type4: '圖標',
      type5: '一鍵購買會員',

      name1: '免費騎行',
      name2: '會員卡',
      name3: '充值返現',
      name4: '押金折扣',
      name5: '其它活動',
      name6: '廣告位',

      status1: '進行中',
      status2: '未開始',
      status3: '已過期',

      repeat0: '是',
      repeat1: '否',

      jumpType1: 'H5頁面',
      jumpType2: '應用內頁面',
      jumpType3: '應用商店'
    },
    dialog: {
      longitude: '經度：',
      latitude: '緯度：'
    }
  },

  adinfo: {
    query: {
      title1: '廣告詳情－首頁彈窗',
      title2: '廣告詳情－首頁輪播',
      title3: '廣告詳情－頂部橫幅',
      title4: '廣告詳情－圖標',

      basic: '基本資訊',
      type1: '首頁彈窗',
      type2: '首頁輪播',
      type3: '頂部橫幅',
      type4: '圖標',
      type5: '一鍵購買會員',
      name1: '免費騎行',
      name2: '會員卡',
      name3: '充值返現',
      name4: '押金折扣',
      name5: '其它活動',
      name6: '廣告位',

      template1: '範本一',
      template2: '範本二',

      operator: '操作日誌'
    },
    table: {
      type: '廣告位類型',
      countryId: '國家',
      name: '活動名稱',
      date: '活動起止時間',
      status: '廣告位狀態',
      repeatTime: '是否重複顯示',
      template: '範本',
      icon: '圖標',
      iconpos: '圖標位置',
      longlat: '經度：{lat}，緯度：{long}',
      iconpop: '點擊圖標是否彈窗',
      yes: '是',
      no: '否',
      pic: '圖片',
      language: '語言',
      title: '標題',
      content: '內容',
      link: '跳轉類型',
      url: '跳轉連結',
      linkAddr: '',
      AndroidAddr: 'Android: ',
      iOSAddr: 'iOS: ',

      mTitle: '這是title',
      mContent: '這是content',

      operateTime: '操作時間',
      activity: '動作',
      operater: '操作人',
      operate: '操作'
    },
    js: {
      add: '新增',
      edit: '更新'
    }
  },

  adadd: {
    query: {
      title1: '配寘首頁彈窗',
      title2: '配寘首頁輪播',
      title3: '配寘頂部橫幅',
      title4: '配寘圖標',
      title5: '配寘一鍵購買會員',

      type1: '首頁彈窗',
      type2: '首頁輪播',
      type3: '頂部橫幅',
      type4: '圖標',
      type5: '一鍵購買會員',
    },
    form: {
      type: '廣告位類型',
      name: '活動名稱',
      countryId: '投放國家',
      startDateTime: '開始時間',
      startPlaceholder: '選擇開始時間',
      endDateTime: '結束時間',
      endPlaceholder: '選擇結束時間',
      status: '廣告位狀態',
      icon: '圖標',
      iconpos: '圖標位置',
      latLabel: '緯度: ',
      latiPlaceholder: '緯度(-90.000000 ~ 90.000000)',
      isNotLat: '緯度(-90.000000 ~ 90.000000)',
      longLabel: '經度: ',
      longPlaceholder: '經度(-180.000000 ~ 180.000000)',
      isNotLong: '經度(-180.000000 ~ 180.000000)',
      iconPop: '點擊圖標是否彈窗',
      repeatTimes: '是否重複展示',
      repeatHours: '重複週期',
      repeatUnit: '小時',
      yes: '是',
      no: '否',
      subType: '範本類型',
      upload: '廣告圖片',
      uploadTip: '點擊上傳圖片, 大小',
      uploadTipHeightAndWidth: {
        type1_1: '538X589',
        type1_2: '538X773',
        type2_1: '660X200',
        type3_1: '692X156',
        type4_1: '538X589',
        icon: '80X80',
      },
      languages: '語言配寘',
      title: '標題',
      titlePlaceholder: '字數請控制在30以內',
      content: '內容',
      contentPlaceholder: '字數請控制在80以內',
      mTitle: '這是title',
      mContent: '這是content',
      jumpType: '跳轉類型',
      link: '跳轉連結',
      linkPlaceholder: '填寫時必须为https://協定頭',
      androidPlaceholder: '安卓連結',
      iosPlaceholder: 'iOS連結'
    },
    js: {
      name1: '免費騎行',
      name2: '會員卡',
      name3: '充值返現',
      name4: '押金折扣',
      name5: '其它活動',
      name6: '廣告位',

      subType1: '範本一',
      subType2: '範本二',

      empty: '無',
      jumpType1: 'H5頁面',
      jumpType2: '應用內頁面',
      jumpType3: '應用商店',

      status1: '進行中',
      status2: '未開始',
      status3: '已過期',

      linkTip: '安卓或iOS必須填寫至少一個',

      myInfo: '我的資訊頁面',
      editStudentCertification: '學生認證資訊填寫頁面',
      successfulCertification: '學生認證成功頁面',
      failedCertification: '學生認證失敗頁面',
      rechargeMember: 'VIP 會員充值頁面',
      memberInfo: 'VIP 會員資訊展示頁面',
      myWallet: '我的錢包頁面',
      couponList: '優惠券頁面',
      creditPoints: '我的信用分頁',
      invitationReward: '邀請獎勵頁面',
      negativeRecord: '負面記錄頁面',
      transactionDetails: '交易詳情頁面',
      gainCredibility: '信用積分',
      myTrip: '我的行程',

    }
  },

  // 支付方式设置 zhu 2017.06.16
  payway: {
    query: {
      title: '支付方式設置'
    },
    table: {
      id: 'ID',
      country: '國家',
      deposit: '押金支付方式',
      balance: '余额支付方式',
      delivery: '闪送支付方式',
      operate: '操作',
      add: '添加',
      edit: '編輯',
      view: '詳情'
    },
    js: {
      deposit: '押金',
      depositFirst: '押金優先',
      balance: '充值',
      balanceFirst: '充值優先'
    }
  },
  payadd: {
    form: {
      title0: '添加支付方式設置',
      title1: '修改支付方式設置',
      countryId: '國家',
      deposit: '押金支付方式',
      recharge: '充值支付方式',
      delivery: '闪送支付方式',
      depositSel: '押金支付方式排序',
      rechargeSel: '充值支付方式排序',
      deliverySel: '闪送支付方式排序',
    }
  },
  payinfo: {
    query: {
      title: '支付方式設置詳情',
      basic: '基本信息',
      log: '操作記錄'
    },
    table: {
      countryId: '國家',
      payway: '支付方式',
      operateTime: '操作時間',
      operater: '操作人',
      operator: '操作'
    }
  },

  message: {
    query: {
      title: '通知管理',
      createdTime: '創建日期',
      createdTimePlaceholder: '選擇時間範圍',
      beginDay: '開始時間',
      chooseTime: '選擇日期',
      countryId: '覆蓋區域',
      type: '消息類型',
      query: '查詢',
    },
    table: {
      id: '消息ID',
      type: '消息類型',
      title: '消息標題',
      img: '消息圖片',
      content: '內容描述',
      status: '狀態',
      coverageArea: '投放區域',
      beginTime: '起始時間',
      endTime: '結束時間',
      updatedAt: '更新時間',
      repetition: '是否重複顯示',
      operate: '操作',
      view: '預覽',
      edit: '編輯',
    },
    dialog: {
      title1: '用戶通知預覽',
      title2: '消息圖片',
      mTitle: '這裡是標題',
      mContent: '這裡是內容',
    },
    js: {
      all: '所有',
      msg1: '首頁消息',
      msg2: 'Message消息',
      msg3: '通知欄消息',

      status1: '啟用',
      status0: '禁用',
      repetition1: '是',
      repetition0: '否',
    }
  },

  addMessage: {
    form: {
      title0: '添加用戶通知',
      title1: '編輯用戶通知',
      type: '消息類型',
      title: '消息標題',
      titlePlaceholder: '請輸入標題',
      content: '內容描述',
      contentPlaceholder: '不超過100字',
      img: '消息圖片',
      upload: '點擊上傳',
      uploadTip: '只能上傳jpg/png文件，且不超過500kb',
      coverageArea: '覆蓋區域',
      targetUser: '目標用戶',
      repetition: '是否重複顯示',
      status: '狀態',
      startDateTime: '開始時間',
      startPlaceholder: '選擇開始時間',
      endDateTime: '結束時間',
      endPlaceholder: '選擇結束時間',
      submit: '提交',
      cancel: '取消',
      mTitle: '這裡是標題',
      mContent: '這裡是內容',
    },
    js: {
      all: '所有',
      msg1: '首頁消息',
      msg2: 'Message消息',
      msg3: '通知欄消息',
      status1: '啟用',
      status0: '禁用',
      repetition1: '是',
      repetition0: '否',
    }
  },

  version: {
    query: {
      title: 'APP更新管理',
      force: '更新類型',
      name: 'APP類型',
      query: '查詢',
      version: '版本號',
      status: '開啟狀態'
    },
    table: {
      id: 'ID',
      version: '版本號',
      force: '升級類型',
      status: '狀態',
      name: 'APP類型',
      language: '語言',
      title: '標題',
      address: '下載地址',
      describe: '升級描述',
      remark: '更新描述',
      createdAt: '創建時間',
      updatedAt: '更新時間',
      operate: '操作',
      edit: '編輯',
      view: '查看詳情',
      delete: '刪除',
    },
    js: {
      all: '所有',
      app1: 'Android',
      app2: 'iOS',

      upg1: '強制升級',
      upg0: '推薦升級',

      status0: '暫停',
      status1: '開啟',

      message: '確認刪除該條數據?',
      tip: '提示',
      ok: '確定',
      cancel: '取消',
    }
  },

  addVersion: {
    form: {
      title0: '添加APP版本',
      title1: '編輯APP版本',
      vsetting: '版本配置',
      otherlang: '其他語言',
      addLang: '添加語言模版',
      force: '更新類型',
      name: 'APP類型',
      version: '版本',
      open: '開啟狀態',
      title: '彈窗Title',
      titlePlaceholder: '默認英文模版標題',
      describe: '彈窗Describe',
      contentPlaceholder: '默認英文模版內容',
      address: '新版本下載地址',
      remark: '更新描述',
      remarkPlaceholder: '不超過100字',
      submit: '提交',
    },
    js: {
      app1: 'Android',
      app2: 'iOS',

      upg1: '強制升級',
      upg0: '推薦升級',
    }
  },

  versioninfo: {
    table: {
      title0: 'APP更新詳情',
      basic: '基本信息',
      langsetting: '其他語言配置',
      operator: '操作日誌',
      id: 'ID',
      isOpen: '開啟狀態',
      force: '更新類型',
      title: '彈窗標題(默認)',
      describe: '彈窗內容(默認)',
      address: '下載url(默認)',
      name: 'APP版本',
      version: 'APP版本號',
      remark: '備註',
      operateTime: '操作時間',
      activity: '動作',
      operater: '操作人',
      operate: '操作記錄'
    },
    js: {
      all: '所有',
      status0: '開啟',
      status1: '暫停',

      upg1: '強制更新',
      upg0: '推薦更新',
    }
  },

  // 單車logo管理 zhu 2017.04.17
  bikelogo: {
    query: {
      title: '單車logo管理',
      date: '起始日期',
      chooseTime: '選擇時間',
      type: '狀態',
      countryId: '國家',
      cityId: '城市',
      query: '查詢'
    },
    table: {
      id: 'ID',
      operateTime: '操作時間',
      type: '狀態',
      countryName: '國家',
      cityName: '城市',
      startTime: '起始時間',
      endTime: '結束時間',
      iconUrl: '圖標樣式',
      remark: '備註',
      operate: '操作',
      view: '詳情',
      edit: '編輯',
      delete: '刪除'
    },
    form: {
      title: '新增單車logo',
      title0: '編輯單車logo',
      basic: '基本信息',
      setting: 'logo配置',
      countryId: '國家',
      cityId: '城市',
      type: '狀態',
      daterange: '起止時間',
      chooseTime: '點擊選擇起止時間',
      upload: '上傳圖標',
      choose: '選擇文件',
      uploadTip: '尺寸：80*106，必填，顯示在客戶端地圖上的單車圖片',
      remark: '備註',
      remarkTip: '在此填寫備註信息',
      submit: '保存',
      cancel: '取消'
    },
    js: {
      all: '所有',
      type_1: '未開始',
      type0: '暫停',
      type1: '進行中',
      type2: '已過期',
      tip: '提示',
      message: '確定刪除該條數據？ ',
      ok: '確定',
      cancel: '取消'
    }
  },

  bikelogoinfo: {
    form: {
      title: '單車logo配置詳情',
      basic: '基本信息',
      operator: '操作記錄'
    },
    table: {
      operateTime: '操作時間',
      activity: '動作',
      operater: '操作人',
      operate: '操作'
    }
  },

  price: {
    query: {
      title: '車費價格管理',
      createdAt: '創建日期',
      chooseTime: '選擇日期',
      countryId: '國家',
      bikeCode: '單車編號',
      bikeCodePlaceholder: '請輸入單車前3位編號',
      goAdd: '添加',
      query: '查詢',
      updateUnitTimesConfig: '最長計費時間設置',
    },
    table: {
      id: 'ID',
      country: '國家',
      city: '城市',
      area: '地區',
      bikeCode: '單車的城市編號',
      levelOne: '價格(信用分100~)',
      levelTwo: '價格(信用分80~99)',
      levelThree: '價格(信用分60~79)',
      levelFour: '價格(信用分0~59)',
      free: '用車優惠',
      others: '無效訂單配寘',
      operate: '操作',
      edit: '編輯',
      detail: '詳情'
    },
    js: {
      free: '每天前 {freeTimesPerDay} 次免費騎行 {freeMinutes} 分鐘',
      freemin: '{freemin}min內訂單無效'
    },
    dialog: {
      title: '最長計費時間設置',
      maxTime: '最長計費時間',
      timeUnit: '分鐘',
      tips: '（最長計費時間是指一條行程最長的計費時間，超過這個時間的行程只按最長計費時間來收費，設置後對所有國家生效。）',
    }
  },

  addPrice: {
    form: {
      title: '配置車費價格',
      countryId: '國家',
      cityId: '城市',
      currency: '幣種',
      currencySymbol: '貨幣符號',
      bikeCode: '單車的城市編號',
      unitPrice: '默認價格（信用分>99時）',
      stepPrice: '分階梯價格',
      freeTimesPerDay: '每天免費次數',
      freeMinutes: '免費分鐘數',
      minute: '分鐘',
      times: '次',
      credit: '信用分',
      price: '價格',
      submit: '保存',
      others: '其他規則',
      othersNote: '分鐘內的訂單不計費',
      zeroBalanceRide:'允許餘額為0的用戶騎行'
    }
  },

  priceInfo: {
    table: {
      title: '車費價格詳情',
      title1: '基本信息',
      title2: '操作記錄',
      title3: '階梯價格',

      country: '國家',
      city: '城市',
      currency: '貨幣單位',
      currencySymbol: '貨幣符號',
      bikeCode: '單車的城市編號',
      defaultPrice: '默認價格',
      free: '用車優惠',

      credit: '信用分',
      price: '價格',

      createdAt: '操作時間',
      type: '動作',
      adminName: '操作人',
      remark: '備註',
    },
    js: {
      type1: '創建',
      type2: '更新',
    }
  },

  recharge: {
    query: {
      title: '押金與充值管理',
      name: '國家',
      code: '國家編號',
      open: '是否已開城',
      query: '查詢',
    },
    table: {
      id: 'ID',
      name: '國家',
      code: '國家編號',
      open: '是否已開城',
      currency: '貨幣單位',
      currencySymbol: '幣種符號',
      deposit: '默認押金',
      studentDeposit: '學生押金',
      bonus: '首次充押金贈送金額',
      withOutDepositNum: '免押金騎行次數',
      negativeBalanceRefund: '餘額為負可退押金',
      topUpStandard: '充值金額',
      operate: '操作',
      edit: '編輯',
      detail: '詳情',
    },
    js: {
      all: '所有',
      open1: '是',
      open0: '否',
      none: '無',
    }
  },

  editRecharge: {
    form: {
      title: '配置押金與充值',
      title1: '國家信息',
      title2: '押金配置',
      title3: '充值配置-必填',
      title4: '充值配置-選填',

      name: '國家名稱',
      code: '國家編號',
      currency: '幣種',
      currencySymbol: '貨幣符號',
      open: '是否開城',

      needDepositPlaceholder: '需大於0',
      dPlaceholder: '需大於等於0',
      xPlaceholder: '選填',

      deposit: '默認押金',
      depositToBalance: '押金轉餘額',
      studentDeposit: '學生卡押金',
      bonus: '首次充押金贈送金額',

      noDeposit: '免押金騎行',
      noDepositPlaceholder: '免押金騎行體驗次數',
      times: '次',
      negativeBalanceRefund: '餘額為負可退押金',

      money0: '金額①',
      money1: '金額②',
      money2: '金額③',
      money3: '金額④',
      money4: '金額⑤',
      money5: '金額⑥',
      money6: '金額⑦',
      money7: '金額⑧',

      moneyIsRepeated: '有相同金額',
      submit: '保存',
    },
    js: {
      open1: '是',
      open0: '否',
    }
  },

  rechargeInfo: {
    table: {
      title: '城市詳情',
      title1: '基本信息',
      title2: '操作記錄',

      country: '國家',
      code: '國家編號',
      open: '是否已開城',
      deposit: '默認押金',
      studentDeposit: '學生證押金',
      bonus: '首次充押金贈送金額',
      topUpStandard: '充值金額',

      createdAt: '操作時間',
      name: '操作人',
      changeDes: '備註',
    },
    js: {
      type1: '創建',
      type2: '更新',
    }
  },

  activity: {
    query: {
      title: '充值返現',
      goAdd: '添加',

      time: '活動日期',
      chooseTime: '選擇日期',
      countryId: '國家',
      status: '活動狀態',
      query: '查詢',
    },
    table: {
      id: 'ID',
      updateAt: '操作時間',
      activityType: '活動類型',
      content: '活動內容',
      status: '活動狀態',
      startTime: '活動起始日期',
      endTime: '活動結束日期',
      area: '國家',
      title: '標題',
      bannerUrl: 'Banner',
      operate: '操作',
      edit: '編輯',
      detail: '詳情',
      goUser: '查看參與用戶',
    },
    js: {
      all: '所有',
      status0: '即將開始',
      status1: '進行中',
      status2: '已過期',
      activityType: '充值返現',
    }
  },

  addActivity: {
    form: {
      title0: '配置返現',
      countryId: '國家',
      cityId: '城市',
      daterange: '活動起止日期',
      daterangePlaceholder: '選擇起止時間',
      type: '活動類型',
      typeName: '充值返現',
      backMoneys: '返現額度',
      charge: '充',
      give: '送',
      title: '標題',
      titlePlaceholder: '不超過25字',
      content: '內容',
      contentPlaceholder: '不超過100字',
      bannerUrl: '上傳圖片',
      upload: '點擊上傳',
      h5Url: '跳轉H5',
      submit: '提交',

      mTitle: '這裡是標題',
      mContent: '這裡是內容',
    }
  },

  activityInfo: {
    table: {
      title0: '充值返現詳情',
      title1: '基本信息',
      title2: '操作記錄',

      type: '活動類型',
      typeName: '充值返現',
      country: '國家',
      city: '城市',
      startTime: '活動起始日期',
      endTime: '活動結束日期',

      bannerUrl: '圖片',
      title: '標題',
      content: '內容',
      h5Url: '跳轉H5',

      mTitle: '這裡是標題',
      mContent: '這裡是內容',

      createdAt: '操作時間',
      typeString: '動作',
      adminName: '操作人',
      remark: '備註',
    },
    js: {
      type1: '創建',
      type2: '更新',
    }
  },

  // 押金折扣 zhu 2017.04.27
  deposit: {
    query: {
      title: '押金折扣',
      validDate: '活動日期',
      chooseTime: '選擇時間',
      countryId: '國家',
      cityId: '城市',
      id: '活動id',
      status: '活動狀態',
      query: '查詢'
    },
    table: {
      id: 'ID',
      activityType: '活動類型',
      countryId: '國家',
      status: '活動狀態',
      countryDeposit: '原押金',
      deposit: '折扣後押金',
      countryStudentDeposit: '原學生押金',
      studentDeposit: '折扣後學生押金',
      startTime: '活動起始日期',
      endTime: '活動結束日期',
      operate: '操作',
      edit: '編輯',
      detail: '查看詳情',
      goUser: '查看參與用戶'
    },
    form: {
      adddeposit: '配置押金折扣',
      editdeposit: '修改押金折扣',
      basic: '基本信息',
      countryId: '國家',
      daterange: '活動起止時間',
      chooseTime: '選擇時間',
      status: '活動狀態',
      setting: '活動配置',
      activityType: '優惠類型',
      depositType: '押金折扣',
      deposit: '折後押金',
      countryDeposit: '原押金',
      countryStudentDeposit: '原學生押金',
      studentDeposit: '折後學生押金',
      remark: '備註',
      remarkTip: '在此填寫備註信息',
      APPShow: 'APP提示配置',
      showHomePage: '顯示在APP首頁',
      yes: '是',
      no: '否',
      bannerUrl: '上傳圖片',
      upload: '點擊上傳圖片',
      title: '標題',
      titlePlaceholder: '不超過25個字',
      content: '內容',
      contentPlaceholder: '不超過100字',
      h5Url: '跳轉h5',
      submit: '保存',
      cancel: '取消'
    },
    js: {
      all: '所有',
      status0: '即將開始',
      status1: '進行中',
      status2: '已過期',
      activityType1: '充值返現',
      activityType2: '會員卡',
      activityType3: '免費騎行',
      activityType4: '押金折扣',
    }
  },

  depositinfo: {
    form: {
      title: '押金折扣詳情',
      basic: '基本信息',
      operator: '操作記錄'
    },
    table: {
      operateTime: '操作時間',
      activity: '動作',
      operater: '操作人',
      operate: '備註'
    }
  },

  depositusers: {
    query: {
      title: '參與用戶'
    },
    table: {
      id: '活動ID',
      activityType: '活動類型',
      userMobile: '用戶手機號碼',
      countryDeposit: '原押金',
      deposit: '折後押金',
      startTime: '參與時間',
      operate: '操作',
      detail: '查看活動詳情'
    }
  },

  noDeposit: {
    query: {
      title: '免押金騎行'
    },
    table: {},
    js: {
      activityType9: '免押金騎行',
    },
    dialog: {
      title: '配置免押金騎行',
      countryId: '國家',
    }
  },

  coupon: {
    query: {
      title: '優惠券',
      goAdd: '添加',
      benefitType: '折扣類型',
      couponType: '優惠券類型',
      endType: '有效期限制',
      countryId: '限制區域',
      cityId: '适用城市',
      query: '查詢',
    },
    table: {
      id: 'ID',
      name: '優惠券名稱',
      benefitType: '折扣類型',
      benefitMoney: '優惠額度',
      couponType: '優惠券類型',
      endType: '有效期限制',
      days: '有效期',
      area: '限制區域',
      updateAt: '操作時間',
      adminName: '操作人',
      operate: '操作',
      edit: '編輯',
      detail: '詳情',
    },
    js: {
      all: '所有',
      benefitType1: '折扣',
      benefitType2: '金額',
      couponType1: '邀請碼優惠券',
      couponType2: '普通優惠券',
      couponType3: '邀請別人後獎勵',
      couponType4: '運營贈送優惠券',
      couponType7: '图标活动奖励优惠券',
      endType0: '无限制',
      endType1: '指定天數',
      endType2: '指定日期',
      day: '天',
    }
  },

  addCoupon: {
    form: {
      title: '配置優惠券',
      name: '優惠券名稱',
      countryId: '限制區域',
      benefitType: '折扣類型',
      benefitMoney: '優惠內容',
      couponType: '優惠券類型',
      benefitPercent: '優惠內容',
      randomPromotion1: '优惠券折扣',
      randomPromotion2: '优惠券金额',
      endType: '有效期限制',
      days: '限制天數',
      day: '天',
      daterange: '限制日期',
      daterangePlaceholder: '選擇日期範圍',
      query: '提交',
    },
    js: {
      benefitType1: '折扣',
      benefitType2: '金額',
      couponType1: '邀請碼優惠券',
      couponType2: '普通優惠券',
      couponType3: '邀請別人後獎勵',
      couponType4: '運營贈送優惠券',
      couponType7: '图标活动奖励优惠券',
      endType0: '无限制',
      endType1: '指定天數',
      endType2: '指定日期',
      randomPromotion0: '定額',
      randomPromotion1: '随机'
    }
  },

  couponInfo: {
    table: {
      title: '優惠券詳情',
      title1: '基本信息',
      title2: '優惠券限制條件',
      title3: '操作記錄',

      benefitType: '優惠券類型',
      benefitMoney: '優惠券內容',

      endType: '有效期限制',
      days: '有效期',
      area: '限制區域',

      createdAt: '操作時間',
      type: '動作',
      adminName: '操作人',
      remark: '備註',
    },
    js: {
      type1: '創建',
      type2: '更新',
    }
  },

  registerCoupon: {
    query: {
      title: '註冊券',
      goAdd: '添加',
      countryId: '國家',
    },
    table: {
      id: 'ID',
      countryName: '國家',
      num: '數量',
      benefitMoney: '額度',
      days: '有效期',
      updateAt: '操作時間',
      adminName: '操作人',
      edit: '編輯',
    },
    dialog: {
      title: '免押金騎行的註冊券',
      countryId: '國家',
      num: '數量',
      benefitMoney: '額度',
      days: '有效期',
      day: '天',
      mustint: '输入必须为整数',
      mustint0: '请输入大于等于0的整数',
    },
  },

  code: {
    query: {
      title: '優惠碼',
      goAdd: '添加',
      status: '優惠碼狀態',
      createdAt: '創建日期',
      chooseTime: '選擇日期',
      code: '優惠碼',
      tag: '標籤',
      query: '查詢',
    },
    table: {
      id: 'ID',
      type: '優惠碼類型',
      code: '優惠碼',
      tag: '標籤',
      useTimesPerOne: '同一用戶兌換次數',
      usedTimes: '已兌換次數',
      useTime: '限制次數',
      status: '狀態',
      startTime: '有效期（起始）',
      endTime: '有效期（結束）',
      content: '兌換內容',
      activityType: '兌換類型',
      limitTime: '有效期',
      createdAt: '更新時間',
      adminName: '操作人',
      operate: '操作',
      edit: '編輯',
      detail: '詳情',
      record: '使用記錄',
      exportExcel: '導出',
    },
    js: {
      all: '所有',
      type1: '普通優惠碼',
      status1: '進行中',
      status2: '過期',
      status3: '未開始',
      type: '普通優惠碼',
      activityType2: '会员卡',
      activityType5: '优惠券',
      benefitType1: '折扣',
      benefitType2: '金額',
      day: '天',
      num: '張',
      coupon: '券',
    }
  },

  addCode: {
    form: {
      title: '配置優惠碼',
      type: '優惠碼類型',
      code: '優惠碼',
      random: '隨機生成',
      tag: '優惠碼標籤',
      useTimesPerOne: '同一用戶兌換次數',
      daterange: '優惠碼起始日期',
      chooseTime: '選擇日期範圍',
      status: '優惠碼狀態',
      quantity: '兌換張數',
      activityType: '兑换类型',
      selectCard: '选择会员卡',
      selectCardHelper1: '选择会员卡国家',
      selectCardHelper2: '选择会员卡',
      selectCardHelper3: '当前国家未配置会员卡',
      couponId: '兌換優惠券',
      toAdd: '添加優惠券',
      detail: '優惠券詳情',
      content: '普通優惠券',
      days: '有效期',
      area: '限制區域',
      submit: '提交',
      basic: '基本信息',
      setting: '兌換碼配置',
      codePlaceholder: '批量生產多個，請用換行隔開',
      limitTime: '限制使用次數',
      limitPlaceholder: '不填表示無次數限制',
      useTimesWarning: '限制使用次數不能小於同一用戶兌換次數',
      openGenerate: '自定義生成',
    },
    dialog: {
      title: '自定義生成優惠碼',
      nameRule: '命名規則',
      code: '優惠碼的',
      to: '到',
      bit: '位 為',
      ruleType1: '隨機字母',
      ruleType2: '隨機數字',
      ruleType3: '自定義',
      addRule: '添加',
      generateNum: '生成數量',
      generateCode: '生成',
      hasRepeat: '有重複字符串，請重新生成',
      generateNumIsTooLarge: '優惠碼生成數量不能超過1000',
      codeIsTooLarge: '優惠碼位數不能超過20',
      cancel: '取消',
      ok: '確定',
    },
    js: {
      type: '普通優惠碼',
      exchangeTypeOption2: '会员卡',
      exchangeTypeOption5: '优惠券',
      status1: '進行中',
      status2: '過期',
      status3: '未開始',
      day: '天',
      benefitType1: '折扣',
      benefitType2: '金額',
    }
  },

  codeRecord: {
    query: {
      title: '優惠碼兌換記錄',
      phone: '用戶手機',
      countryId: '國家',
      cityId: '城市',
      exchangeCode: '優惠碼',
      exchangedDate: '兌換日期',
      chooseTime: '選擇時間範圍',
      query: '查詢',
    },
    table: {
      id: 'ID',
      countryName: '國家',
      cityName: '城市',
      phone: '用戶手機號',
      exchangedDate: '兌換日期',
      exchangeCode: '兌換的優惠碼',
      exchangedCouponRecord: '兌換內容',

      operate: '操作',
    }
  },

  codeInfo: {
    table: {
      title: '優惠碼詳情',
      title1: '基本信息',
      title2: '優惠券信息',
      title3: '操作記錄',

      codeType: '兌換碼類型',
      typeName: '普通兌換碼',
      code: '優惠碼內容',
      startTime: '優惠碼有效期（起始日期）',
      endTime: '優惠碼有效期（結束日期）',
      area: '限制區域',

      quantity: '兌換張數',
      benefitType: '優惠券類型',
      content: '優惠券內容',
      couponArea: '限制區域',
      days: '使用有效期',

      createdAt: '操作時間',
      type: '動作',
      adminName: '操作人',
      remark: '備註',
    },
    js: {
      type1: '創建',
      type2: '更新',
    }
  },

  free: {
    query: {
      title: '免費騎行',
      goAdd: '添加',
      time: '活動日期',
      chooseStartTime: '選擇開始日期',
      chooseEndTime: '選擇結束日期',
      countryId: '國家',
      status: '活動狀態',
      query: '查詢',
      activityDetailType:'活動類型'

    },
    table: {
      id: 'ID',
      updateAt: '操作日期',
      activityType: '活動類型',
      title: '標題',
      content: '活動內容',
      status: '活動狀態',
      country: '國家',
      city: '城市',
      startTime: '活動起始日期',
      endTime: '活動結束日期',
      operate: '操作',
      edit: '編輯',
      detail: '詳情',
      goUser: '查看參與用戶',
    },
    js: {
      all: '所有',
      status0: '即將開始',
      status1: '進行中',
      status2: '已過期',
      status3: '暫停',

      activityType: '免費騎行',
    },
    activityDetailType:{
      all: '所有',
      status1: '免費次數',
      status2: '免費時間段',
    }
  },

  addFree: {
    form: {
      title0: '配置免費騎行',
      countryId: '國家',
      cityId: '都市',
      area: '適用區域',
      date: '有效時間',
      all: '所有',
      startPlaceholder: '開始日期',
      endPlaceholder: '結束日期',
      startHms: '開始時間',
      endHms: '結束時間',
      deletedate: '删除',
      adddate: '添加',
      daterange: '活動起止日期',
      chooseTime: '選擇起止時間',
      status: '活動狀態',
      type: '活動類型',
      typeName: '免費騎行',
      title: '標題',
      titlePlaceholder: '不超過25字',
      content: '內容',
      contentPlaceholder: '不超過100字',
      bannerUrl: '上傳圖片',
      upload: '點擊上傳',
      h5Url: '跳轉H5',
      submit: '提交',

      mTitle: '這裡是標題',
      mContent: '這裡是內容',
    },
    js: {
      status0: '即將開始',
      status1: '進行中',
      status2: '已過期',
      submitTips: '結束時間需大於開始時間',
    }
  },

  freeInfo: {
    table: {
      title: '免費騎行詳情',
      title1: '基本信息',
      title2: '操作記錄',

      freeType: '活動類型',
      typeName: '免費騎行',
      status: '活動狀態',
      comment: '活動內容',
      content: '顯示文案',
      country: '國家',
      city: '城市',
      startTime: '活動起始日期',
      endTime: '活動結束日期',
      bannerUrl: '圖片',
      h5Url: '跳轉H5',

      mTitle: '這裡是標題',
      mContent: '這裡是內容',

      createdAt: '操作時間',
      type: '動作',
      adminName: '操作人',
      remark: '備註',
    },
    js: {
      type1: '創建',
      type2: '更新',
    }
  },

  card: {
    query: {
      title: '會員卡活動',
      goAdd: '添加',
      time: '活動日期',
      chooseTime: '選擇日期',
      countryId: '國家',
      status: '活動狀態',
      query: '查詢',
    },
    table: {
      id: 'ID',
      updateAt: '操作時間',
      activityType: '活動類型',
      startTime: '活動起始日期',
      endTime: '活動結束日期',
      title: '標題',
      content: '活動內容',
      status: '活動狀態',
      countryName: '國家',
      cityName: '城市',
      activityContent: '會員卡配置',
      freecard: '會員特權',
      operate: '操作',
      edit: '編輯',
      detail: '詳情',
    },
    js: {
      all: '所有',
      status0: '即將開始',
      status1: '進行中',
      status2: '已過期',
      status3: '暫停',
      activityType: '會員卡',
      freecard: '前{freeTimes}次免費{freeMinutes}分鐘',
      cardName: '會員卡名稱: ',
      dayCard: '天卡',
      priceCard: ', 正常價：',
      priceAuto: ', 自動續費：',
      priceDisAuto: ', 未設定自動續費',
      priceDis: ', 體驗價：',
      priceDisDis: ', 未設定體驗價',
      priceDiscount: ', 折扣价：',
      priceDiscountDis: ', 未设置折扣价',
      nolimit: '不限制次數，且不限制時間',
      nodeposit: ', 免押金',
      indeposit: ', 不免押金'
    }
  },

  addCard: {
    form: {
      title0: '配置會員卡',
      countryId: '國家',
      cityId: '城市',
      daterange: '活動起止日期',
      chooseTime: '選擇起止時間',
      status: '活動狀態',
      type: '活動類型',
      typeName: '會員卡',
      cards: '會員卡',
      freeTimes: '每天免費次數',
      freeMinutes: '免費分鐘數',
      minute: '分鐘',
      times: '次',
      day: '天',
      must: '必填',
      unmust: '選填',
      title: '標題',
      titlePlaceholder: '不超過25字',
      content: '內容',
      contentPlaceholder: '不超過100字',
      distoIndex: '顯示在APP首頁',
      yes: '是',
      no: '否',
      bannerUrl: '上傳圖片',
      upload: '點擊修改上傳圖片',
      h5Url: '跳轉H5',
      submit: '保存',
      dontAuto: '不自動續費',
      auto: '自動續費',
      basics: '活動基本資訊',
      limit: '會員卡限制',
      settings: '配寘活動彈窗',
      cardsetting: '會員卡配寘',
      limit0: '限制1',
      limit1: '限制2',
      nolimit: '不限制次數，且不限制時間',
      addCard: '新增會員卡',
      cardName: '會員卡名稱',
      cardNameholder: '不超過24字',
      cardDay: '天數',
      dayplaceholder: '必填',
      cardPrice: '正常價',
      priceplaceholder: '必填',
      cardDiscount: '體驗價',
      disntAuto: '不啟用體驗價',
      disauto: '啟用體驗價',
      cardAuto: '自動續費',
      cardlist: '會員卡',
      cardlavel: '优先级',
      inDiscount: '折扣价',
      closeDisc: '不启用折扣价',
      openDisc: '启用折扣价',
      mustmin: '体验价必须小于折扣价、自动续费价和正常价格',
      nodeposit: '免押金',
      indeposit: '不免押金',
      isKeyDeposit: '押金一鍵購買',
      giftOCoin: 'OCN金額',
      superVip:'超級會員',
      nonSuperVip: '普通會員',
      authorizedTimes:'授權次數',
      vipType: '類型',

    },
    dialog: {
      title: '會員卡衝突',
      msg1: '與 {id} （活動編號）時間衝突，是否保存並暫停原活動？ ',
      detail: '{id} 活動詳情',
      card: '會員卡',
      period: '有效期',
      area: '限制區域',

      ok: '確認',
      cancel: '取消',

      addCard: '新增會員卡',
      editCard: '編輯會員卡'

    },
    js: {
      status0: '即將開始',
      status1: '進行中',
      status2: '已過期',
      freecard: '前{freeTimes}次免費{freeMinutes}分鐘',
      dayCard: '天卡',
      tip: '删除提示',
      message: '確定删除該會員卡？',
      ok: '確定',
      cancel: '取消'
    }
  },

  cardInfo: {
    table: {
      title: '會員卡詳情',
      title1: '基本信息',
      title2: '操作記錄',

      freeType: '活動類型',
      typeName: '會員卡',
      status: '活動狀態',
      comment: '活動內容',
      content: '顯示文案',
      country: '國家',
      city: '城市',
      startTime: '活動起始日期',
      endTime: '活動結束日期',
      bannerUrl: '圖片',
      h5Url: '跳轉H5',

      mTitle: '這裡是標題',
      mContent: '這裡是內容',

      createdAt: '操作時間',
      type: '動作',
      adminName: '操作人',
      remark: '備註',
    },
    js: {
      type1: '創建',
      type2: '更新',
    }
  },

  account: {
    query: {
      title: '帳號管理',
      goAdd: '添加帳號',

      name: '賬號',
      roleId: '角色',
      status: '狀態',
      countryId: '國家',

      query: '查詢',
    },
    table: {
      id: '用戶ID',
      name: '賬號',
      phone: '手机号码',
      realName: '真實姓名',
      status: '賬號狀態',
      role: '角色',
      area: '國家與城市',
      country: '國家',
      city: '城市',
      period: '有效期',
      updatedAt: '更新時間',
      operate: '操作',
      edit: '編輯',
      showWebAuth: '查看管理後台權限',
      showAppAuth: '查看運維APP權限',
      resetPassword: '重置密碼',
      detail: '詳情',
      deleteAdmin: '刪除',
      frozenAdmin: '凍結'
    },
    dialog: {
      title1: '賬號 {name} 的管理後台權限',
      title2: '賬號 {name} 的運維APP權限',
      title3: '重置密码',
      rsttip: '确认重置账号 {name} 的密码？',
      rstpassTip: '必须是包含数字，字母大小写，允许包含特殊字符[- _ #]的8-15位字符',
      resetpass: '将账号 {name} 的密码改成：',
      custompass: '自定义生成',
      passcopy: '复制'
    },
    js: {
      all: '所有',
      status1: '正常',
      status2: '凍結',
      status3: '過期',

      message: '確認重置賬號 {name} 的密碼（123456）?',
      tip: '提示',
      ok: '確定',
      cancel: '取消',

      deleteMessage: '確認刪除賬號 {name} 嗎?',
      frozenMessage: '確認凍結賬號 {name} 嗎？'
    }
  },

  addAccount: {
    form: {
      title: '添加系統賬號',
      title1: '编辑系统账户',
      name: '用戶名',
      namePlaceholder: '郵箱或手機號',
      password: '初始密碼',
      realName: '真實姓名',
      countryId: '國家',
      cityId: '城市',
      phoneCode: '国家码',
      phoneTip: '* "国家码"为手机号所属国家编码，必填',
      phone: '手機號',
      status: '狀態',
      roleId: '角色',

      submit: '提交',
    },
    js: {
      all: '所有',
      status1: '正常',
      status2: '凍結',
      status3: '過期',
    }
  },

  accountInfo: {
    table: {
      title: '賬號信息詳情',
      title1: '基本信息',
      title2: '權限詳情',
      title3: '操作記錄',

      name: '賬號',
      password: '密碼',
      realName: '真實姓名',
      status: '賬號狀態',

      role: '角色',
      country: '國家',
      city: '城市',
      webAuth: '管理後台權限',
      showWebAuth: '查看管理後台權限',
      appAuth: '運維APP權限',
      showAppAuth: '查看運維APP權限',
    },
    table2: {
      createdAt: '操作時間',
      name: '操作人',
      changeDes: '備註',
    },
    js: {
      type1: '創建',
      type2: '更新',
    }
  },

  webAuth: {
    title: '配置管理後台權限',
    nameLabel: '角色名稱',
    title1: '配置角色權限',
    save: '保存',
    goBack: '放棄修改',
  },

  appAuth: {
    title: '配置運維APP權限',
    nameLabel: '角色名稱',
    title1: '配置角色權限',
    save: '保存',
    goBack: '放棄修改',
  },

  // 消息推送 zhu 2017.05.08
  funcnews: {
    query: {
      title: '功能消息',
      type: '功能類型',
      pushtime: '推送時機',
      query: '查詢'
    },
    table: {
      id: 'ID',
      functype: '功能類型',
      pushtime: '推送時機',
      language: '語言',
      title: '消息標題',
      content: '消息內容',
      linkpage: '跳轉頁面',
            newsspec: '消息分類',
            ispushtime: '是否在推送時機推送',
            issavelocale: '是否在本地消息保存',
      operate: '操作',
      newstmpl: '查看消息模板',
      pushrec: '查看推送記錄'
    },
    js: {
      all: '所有',
      type0: '會員卡',
      type1: '舉報核實',
      type2: '餘額調整',

      pushtype0: '所有',
      pushtype1: '會員卡剩3天到期',
      pushtype2: '會員卡提前1天',
      pushtype3: '用戶舉報之後',
      pushtype4: '用戶舉報核實後',
      pushtype5: '用戶被舉報核實後',
      pushtype6: '餘額調整 － 運營贈送',
      pushtype7: '餘額調整 － 消費退款',
      pushtype8: '餘額調整 － 意外充值退款',
      pushtype9: '餘額調整 － 扣除罰金',
      pushtype10: '餘額調整 － 其他',
      pushtype11: '押金退款',
      pushtype12: '用戶手動結束行程，歷史信息報上來之後',
      pushtype13: '運營手動結束',
      pushtype14: '餘額小於0',
      pushtype15: '學生認證 － 成功',
      pushtype16: '學生認證 － 失敗',
      pushtype17: '邀請好友獎勵',
      pushtype18: '贈送優惠券',
      pushtype19: '優惠券到期提醒(提前1天)',
      pushtype20: '會員卡到期提醒(提前3天)',
      pushtype21: '會員卡到期提醒(過期)',
      pushtype22: '赠送会员卡通知',
      pushtype23: '取消会员退款通知',
      pushtype24: '会员卡延期通知',
      pushtype25: '充值成功提醒',
      pushtype26: '閃送訂單已接單',
      pushtype27: '閃送訂單被取消',
      pushtype28: '閃送訂單退款申請通過',
      pushtype29: '閃送訂單賠付申請通過',
      pushtype30: '閃送訂單成功送達',
      pushtype31: '騎士沒有申請認證',
      pushtype32: '騎士認證成功',
      pushtype33: '騎士認證失敗',
      pushtype34: '騎士沒有接單',
      pushtype35: '騎士訂單被取消',
      pushtype36: '騎士訂單取件即將超時',
      pushtype37: '騎士訂單送件已超時',
      pushtype38: '扣款通知',
      pushtype39: '賬戶凍結',
      pushtype40: '閃送訂單未接單取消',
      pushtype41: '閃送訂單未支付取消',
      pushtype42: '閃送訂單後台取消',
      pushtype43: '騎士訂單後台取消',
      pushtype44: '騎士訂單送件即將超時',
      pushtype45: '騎士訂單取件已超時',
      pushtype46: '用戶違約取消訂單退款',
      pushtype47: '用戶違約賠償',
      pushtype48: '閃送新訂單',
      pushtype49: '企業號歡迎管理員短信',
      pushtype50: '企業號歡迎員工彈窗',
      pushtype51: '企業號套餐失效彈窗',
      pushtype52: '企業號套餐生效前員工短信',
      pushtype53: '企業號套餐已生效員工短信',
      pushtype54: '贈送OCN',
      pushtype55: 'OCN充值成功提醒',
      pushtype56: '領取授權碼',
      pushtype57: '加入家庭',
      pushtype58: '退出家庭',
      pushtype59: '移出家庭',

      functype0: '所有',
      functype1: '會員卡',
      functype2: '舉報反饋',
      functype3: '舉報核實',
      functype4: '被舉報核實',
      functype5: '餘額調整',
      functype6: '押金退款',
      functype7: '行程記錄',
      functype8: '提醒充值',
      functype9: '學生認證',
      functype10: '優惠券',
      functype11: '闪送通知',
      functype12: '企業號通知',
      functype13: 'OCN通知',
      functype14: '授權碼',
      functype15: '家庭號',

      noticetype1: "一般",
      noticetype2: "優惠活動",
      noticetype3: "舉報通知",
      noticetype4: "營銷",

      viewpage1: "我的信息頁面",
      viewpage2: "學生認證信息填寫頁面",
      viewpage3: "學生認證成功頁面",
      viewpage4: "學生認證失敗頁面",
      viewpage5: "VIP 會員充值頁面",
      viewpage6: "VIP 會員信息展示頁面",
      viewpage7: "我的錢包頁面",
      viewpage8: "優惠券頁面",
      viewpage9: "我的信用分頁",
      viewpage10: "邀請獎勵頁面",
      viewpage11: "負面記錄頁面",
      viewpage12: "交易詳情頁面",
      viewpage13: "信用積分",
      viewpage14: "我的行程",

      none: "無"
    }
  },

  pushrec: {
    query: {
      title: '推送消息記錄',
      createdTime: '日期',
      chooseTime: '選擇時間',
      userId: '用戶',
      fbtoken: 'FireBase Token',
      functype: '功能類別',
      pushtime: '推送時機',
      languageId: '語言',
      query: '查詢'
    },
    table: {
      id: '推送ID',
      createdAt: '推送時間',
      userId: '用戶',
      fbtoken: 'FireBase Token',
      type: '功能類別',
      pushtime: '推送時機',
      language: '語言',
      title: '標題',
      content: '內容',
      isreached: '是否達到',
      remark: '失敗原因',
    }
  },

  functmpl: {
    query: {
      title: '消息模版',
      functype: '功能類別',
      pushtime: '推送時機',
      tmplset: '模版配置',
      addlang: '添加語言',
      basic: '基本信息',
      operator: '操作日誌'
    },
    table: {
      name: '語言',
      title: '標題',
      content: '內容',
      operateTime: '操作時間',
      activity: '動作',
      operater: '操作人',
      operate: '操作',
      edit: '編輯',
      delete: '刪除'
    },
    form: {
      add: '添加',
      edit: '編輯',
      language: '語言',
      title: '消息標題',
      content: '消息內容',
      remarkTip: '填寫消息內容',
      cancel: '取消',
      submit: '確定'
    }
  },

  pushMessage: {
    query: {
      title: '推送消息',
      countryId: '國家',
      notiType: '消息推送種類',
      sendDate: '發送日期',
      sendStatus: '發送狀態',
      userTag: '用戶標籤',
    },
    table: {
      id: 'ID',
      notiType: '消息推送種類',
      sendDate: '發送日期',
      countryName: '國家',
      userTag: '用戶標籤',
      languages: '語言',
      notiTitle: '消息標題',
      notiContent: '消息內容',
      jumpTo: '跳轉到',
      saveMesaage: '保存到本地',
      sendStatus: '狀態',

      deleteMessage: '删除',
      view: '預覽',
    },
    dialog: {
      title1: '用戶列表',
      title2: '預覽',
    },
    js: {
      all: '所有',
      notiType0: '正常',
      notiType1: '跳轉H5',
      notiType2: '跳轉到指定頁面',
      notiType3: '彈窗顯示活動',

      sendStatusn1: '處理中',
      sendStatus0: '失敗',
      sendStatus1: '完成',

      deleteMessage: '確認删除本條記錄?',
      tip: '提示',
      ok: '確認',
      cancel: '取消',
    }
  },

  addPushMessage: {
    form: {
      title: '新增消息推送',
      notiType: '消息推送種類',
      countryId: '國家',
      saveMesaage: '保存到本地',
      yes: '是',
      no: '否',
      userPhone: '用戶',
      userPhonePlaceholder: '輸入用戶手機號碼，多個用戶回車隔開',
      userTag: '用戶標籤',
      jumpTo: '跳轉到',
      popTemplateType: '範本',

      languages: '選擇語言',
      notiTitle: '消息標題',
      notiContent: '消息內容',
      notiTitlePlaceholder: '必填，展示在通知欄',
      popTitle: 'pop標題',
      popContent: 'pop內容',
      popTitlePlaceholder: '必填，填充在範本裏',
      popWebUrl: '',
      jumpToWhereH5: 'H5',
      jumpToWherePage: '指定頁',

      upload: '圖片上傳',
      uploadTip: '點擊上傳圖片',
      view: '預覽',
      submit: '立即推送',
    },
    js: {
      notiType0: '正常',
      notiType1: '跳轉H5',
      notiType2: '跳轉到指定頁面',
      notiType3: '彈窗顯示活動',

      popTemplateType1: '小圖帶標題內容',
      popTemplateType2: '大圖帶標題內容',
      popTemplateType3: '大圖不帶標題內容',

      myInfo: '我的資訊頁面',
      editStudentCertification: '學生認證資訊填寫頁面',
      successfulCertification: '學生認證成功頁面',
      failedCertification: '學生認證失敗頁面',
      rechargeMember: 'VIP 會員充值頁面',
      memberInfo: 'VIP 會員信息展示頁面',
      myWallet: '我的錢包頁面',
      couponList: '優惠券頁面',
      creditPoints: '我的信用分頁',
      invitationReward: '邀請獎勵頁面',
      negativeRecord: '負面記錄頁面',
      transactionDetails: '交易詳情頁面',
      gainCredibility: '信用積分',
      myTrip: '我的行程',
    }
  },

  // 國家城市配置 zhu 2017.05.11
  city: {
    query: {
      title: '國家城市配置',
      add: '添加',
      countryId: '國家',
      cityId: '城市',
      query: '查詢'
    },
    table: {
      id: '編號ID',
      countryId: '國家',
      cityId: '城市英文名',
      ecityId: '本地語言都市名',
      helmet: '是否有頭盔',
      operate: '操作',
      editHelmet: '編輯'
    },
    js: {
      all: '所有',
      helmet0: '否',
      helmet1: '是',
      tip: '(該名稱顯示在APP端)'
    },
    dialog: {
      title: '新增國家城市',
      helmet: '是否有頭盔',
      title3: '編輯國家都市',
      cancel: '取消',
      ok: '確定'
    },
    form: {
      countryId: '國家',
      cityId: '城市英文名',
      ecityId: '本地語言都市名',
      tip: '* 該名稱將顯示在APP端，請謹慎填寫！',
      submit: '確定',
      cancel: '取消'
    }
  },

  role: {
    table: {
      title: '角色管理',
      goAdd: '添加角色',

      id: '角色ID',
      name: '角色',
      web: '管理後台權限',
      app: '運維APP權限',
      updatedAt: '修改時間',
      updatedName: '修改人',
      operate: '操作',

      edit: '修改角色名稱',
      editWebAuth: '編輯管理後台權限',
      editAppAuth: '編輯運維APP權限',
      openTip: '請開啟權限',
      detail: '操作記錄',
    },
    dialog: {
      title: '添加角色',
      title1: '修改角色名稱',
      nameLabel: '角色名稱',
      web: '管理後台權限',
      app: '運維APP權限',
      cancel: '取消',
      ok: '添加',
    }

  },

  // 设置 - 支付风控
  risk: {
    query: {
      title: '支付風險控制',
      goAdd: '添加',
    },
    table: {
      id: 'ID',
      countryName: '國家',
      hours: '時間段(小時)',
      limitedAmount: '開啟3D交易額度',
      limitedPayTimes: '開啟3D交易次數',
      limitedChargeBackTimes: '有過拒付記錄開啟3D',
      forbiddenAmount: '暫停交易額度',
      forbiddenPayTimes: '暫停交易次數',
      frozenChargeBackTimes: '拒付幾次將加入黑名單',
      updatedAt: '更新時間',
      edit: '編輯',
    }
  },

  addRisk: {
    form: {
      title: '配置風險控制條件',
      countryId: '國家',
      hours: '時間段',
      hoursUnit: '小時',
      frozenChargeBackTimes: '拒付幾次將加入黑名單',
      timesUnit: '次',

      open3D: '開啟3D',
      limitedAmount: '開啟3D交易額度',
      limitedPayTimes: '開啟3D交易次數',
      limitedChargeBackTimes: '有過拒付記錄開啟3D',
      forbiddenAmount: '暫停交易額度',
      forbiddenAmountPlaceholder: '必須大於等於3D交易額度',
      forbiddenPayTimes: '暫停交易次數',
      forbiddenPayTimesPlaceholder: '必須大於等於3D交易次數',
      submit: '提交',
    },
  },

  paypal: {
    query: {
      title: 'PayPal轉賬',
      goAdd: '轉入',
      createdAt: '轉入日期',
      chooseTime: '選擇日期範圍',
      countryId: '入款國家',
      status: '轉入結果',
    },
    table: {
      id: 'ID',
      createdAt: '轉入日期',
      adminName: '操作人',
      countryName: '入款國家',
      intoAccount: '入款賬戶',
      amount: '轉入金額',
      currency: '對應幣種',
      status: '轉入結果',
    },
    dialog: {
      title: 'PayPal轉賬',
      countryCode: '入款國家',
      accountCode: '入款賬戶',
      amount: '轉入金額',
      password: '登錄密碼',
      passwordPlaceholder: '請輸入管理後台登陸密碼',
    },
    js: {
      statussuccess: '已轉入',
      statuserror: '失敗',
    }
  },

  bind: {
    query: {
      title: '綁定失敗記錄',
      countryId: '國家',
      createdAt: '創建時間',
      chooseTime: '選擇起止時間',
      phone: '手機號',
      query: '査詢'
    },
    table: {
      id: 'ID',
      createAt: '創建時間',
      countryName: '國家',
      memberId: '會員ID',
      phone: '會員手機號',
      logInfo: '失敗錯誤資訊'
    }
  },

  pay: {
    query: {
      title: '支付失败记录',
      countryId: '國家',
      createdAt: '創建時間',
      chooseTime: '選擇起止時間',
      tradeSource: '支付通路',
      phone: '手機號',
      query: '査詢'
    },
    table: {
      id: 'ID',
      createAt: '創建時間',
      countryName: '國家',
      tradeSource: '支付通路',
      phone: '會員手機號',
      statementNo: '交易流水號',
      errorInfo: '失敗錯誤資訊'
    },
    js: {
      all: '所有'
    }
  },

  locklog: {
    query: {
      title: '开关锁失败记录',
      createdAt: '上报时间',
      chooseTime: '选择起止时间',
      countryId: '国家',
      bikeId: '单车编号',
      phone: '手机号',

      tradeNo: '锁交易号',
      transtype: '开关锁类型',
      action: '失败类型',
      subAction: '异常类型',
      query: '查询'
    },
    table: {
      id: '编号ID',
      countryName: '国家',
      bikeId: '单车编号',
      lockNo: '上报锁编号',
      diffLock: '锁编号异常',
      lockLevel: '锁类型',
      transtype: '开关锁类型',
      actionName: '失败类型',
      subAction: '异常类型',
      createAt: '上报时间',
      infoTime: '开关锁时间',
      phone: '手机号',
      deviceName: '设备名称',
      versionNo: 'APP版本号',
      scope: '用户类型',
      tradeNo: '锁交易号',
    },
    js: {
      all: '所有',
      type1: '开锁失败-蓝牙连接失败',
      type2: '开锁失败-锁协议异常',
      type3: '开锁失败-单车状态异常',
      type4: '开锁失败-其他',
      type5: '开锁订单生成失败',
      type6: '处理关锁订单失败',
      type7: '关锁时间异常',
      type8: '订单编号重复',
      type9: '多条骑行订单',
      type10: '开关锁异常拦截',

      translock: '关锁',
      transunlock: '开锁',

      yes: '是',
      no: '否',

      admin: 'Admin',
      customer: 'Customer',
      others: '其他',

      bikeLockNo: '(车绑定锁编号: {bikeLockNo})',
      unknown: '未知',
      empty: '无',
      lockLevel: '蓝牙{lockLevel}代'
    }
  },

  appsms: {
    query: {
      title: '短信运营商设置',
      query: '查询',
      goCountryProvider: '设置各国支持的短信运营商',
    },
    table: {
      id: 'ID',
      country: '国家',
      smsCodeProviders: '发送验证码短信的运营商及比例',
      operationProviders: '发送营销短信的运营商及比例',

      voice: '语音验证码',
      remark: '备注',
      operate: '操作',
      edit: '编辑',
      detail: '操作日志',
    },
    dialog: {
      title: '操作日志',
      createdAt: '操作时间',
      admin: '操作人',
      type: '操作类型',
      type1: '创建',
      type2: '编辑',
      remark: '操作',
    }
  },

  addSmsSetting: {
    form: {
      title: '配置短信运营商',
      countryId: '国家名称',
      smsCodeProviders: '发送验证码短信的各运营商比例',
      smsCodeTips: '（注：所有运营商比例之和应为100%）',
      operationProviders: '发送营销短信的各运营商比例',
      operationTips: '（注：所有运营商比例之和应为100%）',

      voice: '语音验证码',
      remark: '备注',
      submit: '保存',
      cancel: '取消'
    }
  },

  countryProvider: {
    table: {
      title: '各国支持的短信运营商',
      goAdd: '添加',
      id: 'ID',
      country: '国家',
      providers: '该国家支持的短信运营商',
      edit: '编辑',
    },
    dialog: {
      title: '设置各国支持的短信运营商',
      countryCode: '国家',
      countryProviders: '运营商',
    }
  },

  providerInfo: {
    table: {
      title: '短信运营商信息',
      id: 'ID',
      providerName: '运营商',
      balance: '余额',
      remain: '剩余条数',
      total: '已发送短信条数',
      successSms: '发送成功条数',
      failureSms: '发送失败条数',
      detail: '详情',
    },
    dialog: {
      title: '短信运营商信息',
      providerName: '运营商',
      countryName: '支持国家',
      total: '总发送条数',
    }
  },

  radius: {
    query: {
      title: '單車顯示半徑',
      title1: '配置單車顯示半徑',
      countryId: '國家',
      cityId: '城市',
    },
    table: {
      id: 'ID',
      countryName: '國家',
      cityName: '城市',
      radius: '半徑(m)',
      num: '周圍車輛(輛)',
      integerPlaceholder: '請輸入正整數',
    }
  },

  // 押金退款手续费设置 zhu 2017.09.20
  refund: {
    query: {
      title: '押金退款手续费设置',
      countryId: '国家',
      needCommission: '退押金是否收取手续费',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      chargeCommission: '退押金是否收取手续费',
      fromRefundNum: '从第几次退押金开始',
      commissionRatePercent: '手续费',
    },
    js: {
      yes: '是',
      no: '否'
    },
    dialog: {
      title1: '编辑押金退款手续费',
      title2: '配置押金退款手续费',
      countryId: '国家',
      needCommission: '退押金是否收取手续费',
      fromRefundNum: '从第几次开始收取',
      beforetimes: '第',
      times: '次',
      commissionRate: '手续费率',
      percent: '%',
      mustint: '输入必须为大于0的整数',
      mustint2: '输入必须在0～100之间'
    }
  },

  deprfdinfo: {
    query: {
      title: '押金退款手续费详情',
      basic: '基本信息',
      log: '操作日志'
    },
    table: {
      id: 'ID',
      countryName: '国家',
      chargeCommission: '退押金是否收取手续费',
      fromRefundNum: '从第几次退押金开始',
      commissionRatePercent: '手续费',
      operateTime: '操作时间',
      action: '操作',
      operater: '操作人',
      operator: '备注'
    },
    js: {
      add: '新增',
      edit: '编辑'
    }
  },

  payfee: {
    query: {
      title: '手續費管理',
      goAdd: '添加',
      countryId: '國家',
      payMethodId: '支付方式',
      open: '狀態',
    },
    table: {
      id: 'ID',
      countryName: '國家',
      payMethodName: '支付方式',
      open: '狀態',
      edit: '編輯',
      doOpen: '開啟',
      close: '停用',
      detail: '詳情',
    },
    dialog: {
      title: '添加手續費',
      title1: '手續費詳情',
      title2: '修改手續費',
      countryId: '國家',
      countryCurrency: '幣種',
      payMethodId: '支付方式',
      range: '金額範圍',
      minAmount: '最小金額',
      maxAmount: '最大金額',
      fee: '手續費',
      open: '狀態',
      tips: '* 請按金額從低到高進行配置，手續費不能大於最小金額，金額範圍不能有重疊',
    },
    js: {
      opentrue: '開啟',
      openfalse: '停用',
    }
  },

  // 图标活动 红包券 zhu 2017.09.22
  redbag: {
    query: {
      title: '红包券活动',
      add: '添加',
      createdAt: '创建时间',
      beginTime: '开始时间',
      endTime: '结束时间',
      chooseTime: '选择时间',
      countryId: '国家',
      cityId: '城市',
      status: '状态',
      query: '查询',
    },
    table: {
      id: 'ID',
      name: '活动名称',
      createdAt: '创建时间',
      startTime: '开始时间',
      endTime: '结束时间',
      status: '状态',
      countryId: '国家',
      cityId: '城市',
      num: '红包总数量',
      gaveNum: '已领取数量',
      remainNum: '剩余数量',
      remark: '备注',
      operate: '操作',
      edit: '编辑',
      view: '详情',
      delete: '删除'
    },
    js: {
      all: '所有',
      deleteMessage: '确定删除活动： {name} ?',
      tip: '提示',
      ok: '确定',
      cancel: '取消'
    }
  },

  addRedbag: {
    form: {
      title: '配置红包券活动',
      basic: '基本信息',
      countryId: '国家',
      countryCurrency: '国家币种',
      cityId: '城市',
      label: '',
      thirdPart: '第三方平台信息配置',

      baginfo: '红包信息',
      name: '活动名称',
      num: '红包数量',
      type1: '随机分配',
      type2: '自定义分配',

      rule: '用户领取规则',
      mustTime: '必须骑行时间',
      freeTime: '每次骑行免费时间',
      limited: '限制规则',
      limited1: '限制领取时间和次数',
      memberDays: '天',
      memberTimes: '次',
      limited2: '不限时间限制次数',
      limited3: '不限时间不限次数',
      remark: '备注',
      submit: '保存'
    },
    dialog: {
      thirdPart: '第三方平台信息配置',
      thirdBagId: '红包ID',
      thirdActivityId: '活动ID',
      cancel: '取消',
      submit: '确定'
    }
  },

  baginfo: {
    query: {
      title: '红包券活动配置',
      basic: '基本信息',
      log: '操作日志'
    },
    table: {
      id: 'ID',
      name: '红包券名称',
      createdAt: '创建时间',
      countryId: '国家',
      cityId: '城市',
      num: '红包数量',
      baginfo: '红包信息',
      rules: '领取规则',
      remark: '备注',

      operateTime: '操作时间',
      operater: '操作人',
      operator: '操作'
    },
    js: {
      rideMinutes: '必须骑行{rideMinutes}分钟',
      memberDays: ', 可在{memberDays}天内领取',
      memberTimes: ', 可领取{memberTimes}次',
      norideMinutes: '无骑行要求',
      nomemberDays: ', 不限领取时间',
      nomemberTimes: ', 不限领取次数'
    }
  },

  // 图标活动 优惠券 zhu 2017.09.22
  iconcoupon: {
    query: {
      title: '优惠券活动',
      add: '添加',
      createdAt: '创建时间',
      beginTime: '开始时间',
      endTime: '结束时间',
      chooseTime: '选择时间',
      countryId: '国家',
      cityId: '城市',
      status: '状态',
      query: '查询',
    },
    table: {
      id: 'ID',
      activityCouponId: '活动ID',
      activityCouponType: '优惠券ID',
      name: '活动名称',
      createdAt: '创建时间',
      status: '状态',
      countryId: '国家',
      cityId: '城市',
      couponName: '优惠券名称',
      remark: '备注',
      operate: '操作',
      edit: '编辑',
      view: '详情',
      delete: '删除'
    },
    js: {
      all: '所有',
      deleteMessage: '确定删除活动： {name} ?',
      tip: '提示',
      ok: '确定',
      cancel: '取消'
    }
  },

  addIconCoupon: {
    form: {
      title: '配置优惠券活动',
      basic: '基本信息',
      countryId: '国家',
      countryCurrency: '国家币种',
      cityId: '城市',
      label: '',
      couponId: '选择优惠券',
      detail: '优惠券详情',
      content: '普通优惠券',
      days: '有效期',
      area: '限制区域',

      name: '活动名称',

      rule: '用户领取规则',
      mustTime: '必须骑行时间',
      freeTime: '每次骑行免费时间',
      limited: '限制规则',
      limited1: '限制领取时间和次数',
      memberDays: '天',
      memberTimes: '次',
      limited2: '不限时间限制次数',
      limited3: '不限时间不限次数',
      remark: '备注',
      submit: '保存'
    },
    dialog: {
      thirdPart: '第三方平台信息配置',
      thirdBagId: '优惠券ID',
      thirdActivityId: '活动ID',
      cancel: '取消',
      submit: '确定'
    },
    js: {
      all: '所有',
      day: '天',
      benefitType1: '折扣',
      benefitType2: '金額',
    }
  },

  iconcpinfo: {
    query: {
      title: '优惠券活动配置',
      basic: '基本信息',
      log: '操作日志'
    },
    table: {
      id: 'ID',
      name: '优惠券名称',
      createdAt: '创建时间',
      endTime: '结束时间',
      status: '状态',
      countryId: '国家',
      cityId: '城市',
      couponName: '优惠券名称',
      couponInfo: '优惠券信息',
      couponRules: '领取规则',
      remark: '备注',

      operateTime: '操作时间',
      operater: '操作人',
      operator: '操作'
    },
    js: {
      rideMinutes: '必须骑行{rideMinutes}分钟',
      memberDays: ', 可在{memberDays}天内领取',
      memberTimes: ', 可领取{memberTimes}次',
      norideMinutes: '无骑行要求',
      nomemberDays: ', 不限领取时间',
      nomemberTimes: ', 不限领取次数'
    }
  },

  bikeicon: {
    query: {
      title: '单车图标管理',
      add: '添加',
      createdAt: '创建时间',
      beginTime: '开始时间',
      endTime: '结束时间',
      chooseTime: '选择时间',
      countryId: '国家',
      cityId: '城市',
      status: '状态',
      query: '查询'
    },
    table: {
      id: 'ID',
      name: '图标名称',
      confType: '选取单车类型',
      createdAt: '创建时间',
      startTime: '开始时间',
      endTime: '结束时间',
      status: '状态',
      countryId: '国家',
      cityId: '城市',
      confBikeCount: '指定单车数量',
      iconstyle: '图标样式',
      iconInfo: '图标信息',
      remark: '备注',
      operate: '操作',
      edit: '编辑',
      view: '详情',
      delete: '删除',
    },
    js: {
      all: '所有',
      status0: '未开始',
      status1: '进行中',
      status2: '已过期',
      status3: '暂停',

      deleteMessage: '确定删除图标： {name} ?',
      tip: '提示',
      ok: '确定',
      cancel: '取消'
    }
  },

  addbikeicon: {
    form: {
      title: '新增单车图标',
      title0: '编辑单车图标',

      basic: '单车图标基本信息',
      countryId: '国家',
      cityId: '城市',
      startDateTime: '开始时间',
      startPlaceholder: '选择开始时间',
      endDateTime: '结束时间',
      endPlaceholder: '选择结束时间',
      type: '状态',

      setting: '单车图标设置',
      addSetting: '添加单车图标配置',
      edit: '编辑'
    },
    table: {
      iconName: '图标名称：',
      confBikeCount: '影响单车数量：',
      days3: '未骑行天数：',
      days4: '限制天数：',
      times3: '未骑行时间：',
      times4: '限制次数：',
      contentName: '奖励内容名称：',
      immediateEffect: '立即生效：'
    },
    dialog: {
      title: '配置图标和奖励',
      validnum: '可用单车数量',
      validnumHelper: '当添加指定单车文件时，可用单车的数量需减去文件的单车数量',
      iconName: '图标名称',
      iconUrl: '图标',
      uploadTip: '点击选择上传图片',

      confType: '选取单车类型',
      confType1: '指定单车',
      confType2: '随机选定',
      confBikeCount: '辆',
      confType3: '指定未骑行时间',
      days: '天',
      or: '或',
      minutes: 'min',
      confType4: '骑行频率',
      times: '次',
      confType5: '举报违停',
      immediateEffect: '立即生效',

      choose: '上传文件',
      uploadTip: '只接受.xls/.xlsx文件',
      contentType: '奖励内容',
      contentName: '奖励名称',
      residualContentCount: '剩余可配置奖励数',
      unlimited: '不限数量',
      cancel: '取消',
      ok: '确定'
    },
    js: {
      status0: '未开始',
      status1: '进行中',
      status2: '已过期',
      status3: '暂停',
      contentType0: '无',
      contentType1: '第三方红包',
      contentType2: '贴纸',
      contentType3: '我方优惠券',
      contentType4: '我方优惠码',
      contentType5: '奖励系统',
      uploadWarning: '请选择要上传的文件',

      yes: '是',
      no: '否',
      expired: '該圖標活動獎勵已過期'
    }
  },

  bikeinfo: {
    query: {
      title: '红包券活动配置',
      basic: '基本信息',
      log: '操作日志'
    },
    table: {
      id: 'ID',
      name: '图标名称',
      createdAt: '创建时间',
      startTime: '开始时间',
      endTime: '结束时间',
      status: '状态',
      countryId: '国家',
      cityId: '城市',
      iconstyle: '图标样式',
      iconInfo: '图标信息',

      confType1: '指定单车',
      confType2: '随机选定',
      confBikeCount: ' , 影响车辆数：{name}',
      confType3: '指定未骑行时间',
      days: ' , 限制天数：{name}天',
      times3: ' , 限制时间：{name} min',
      confType4: '骑行频率',
      times4: ' , 限制骑行次数：{name}次',
      confType5: '举报违停',
      contentType1: ' , 奖励内容：第三方红包',
      contentType2: ' , 奖励内容：贴纸',
      contentType3: ' , 奖励内容：我方优惠券',
      contentType4: ' , 奖励内容：我方优惠码',
      immediateyes: ' , 立即生效',
      immediateno: ' , 不立即生效',

      operateTime: '操作时间',
      operater: '操作人',
      operator: '操作'
    }
  },

  fence: {
    query: {
      title: '電子圍欄',
      title1: '配置電子圍欄',
      title2: '操作日誌',
      type: '圍欄類型',
      useable: '狀態',
      visiable: '在地圖上顯示',
      contentType: '奖励类型',
      contentName: '奖励内容',
      contentNamePlaceHolder0: '无奖励',
      contentNamePlaceHolder1: '请选择'
    },
    table: {
      id: 'ID',
      type: '圍欄類型',
      useable: '狀態',
      num: '圍欄數量',
      radius: '顯示範圍',
      radiusPlaceholder: '顯示中心點多少米範圍內的該類型圍欄',
      batchAdd: '批量添加',
      visiable: '在地圖上顯示',
      contentType: '奖励类型',
      promotionActivityId: '奖励名称',
      edit: '編輯',
      disabled: '禁用',
      enabled: '啟用',
      detail: '操作日誌',
    },
    js: {
      type1: '停車區域',
      type2: '禁停區域',
      type3: '停車點',
      type4: '管制區',
      useable1: '啟用',
      useable0: '禁用',
      contentType0: '无',
      contentType1: '第三方红包',
      contentType2: '贴纸',
      contentType3: '我方优惠券',
      contentType4: '我方优惠码',
      contentType5: '奖励系统',
      expired: '該電子圍欄獎勵已過期'
    },
    dialog: {
      createdAt: '操作時間',
      admin: '操作人',
      remark: '操作',
      upload: '文件上传',
    }
  },

  fenceInfo: {
    query: {
      title: '電子圍欄列表',
      goAdd: '添加',
      exportExcel: '導出',
      id: '圍欄ID',
      name: '圍欄名稱',
      longitude: '經度',
      latitude: '緯度',
      hasPile: '有無電子停車樁',
      pileNo: '電子停車樁ID',
    },
    table: {
      id: '圍欄ID',
      name: '圍欄名稱',
      points: '坐標點',
      hasPile: '有無電子停車樁',
      pileNo: '電子停車樁ID',
      subType: '圖標',
      edit: '編輯',
      detail: '操作日誌',
    },
    js: {
      has: '有',
      nothas: '無',
      subType1: 'P',
      subType2: 'S',
    }
  },

  addFence: {
    form: {
      title: '配置電子圍欄',
      name: '圍欄名稱',
      useable: '狀態',
      points: '坐標點',
      latitude: '緯度',
      longitude: '經度',
      submit: '保存',
      tips: '* 請至少填入三個坐標點',
    },
  },

  uploadLoc: {
    query: {
      title: '上报位置',
      exportExcel: '导出',
      countryId: '国家',
      cityId: '城市',
      bikeId: '单车编号',
      lockNo: '锁编号',
      createdAt: '起止时间',
      createdByName: '操作人',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      cityName: '城市',
      bikeId: '单车编号',
      lockNo: '锁编号',
      createdByName: '操作人',
      createdAt: '操作时间',
      locString: '上报的经纬度',
      address: '位置',
    }
  },

  putBike: {
    query: {
      title: '单车投放',
      exportExcel: '导出',
      countryId: '国家',
      cityId: '城市',
      bikeId: '单车编号',
      lockNo: '锁编号',
      createdAt: '起止时间',
      createdByName: '操作人',
      success: '是否投放成功',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      cityName: '城市',
      bikeId: '单车编号',
      lockNo: '锁编号',
      createdByName: '操作人',
      createdAt: '投放时间',
      address: '位置',
      tag: '标签',
      helmet: '头盔',
      success: '是否投放成功',
      defeatReason: '失败原因',
    },
    js: {
      helmet0: '无',
      helmet1: '有',
    }
  },

  bikeMaintain: {
    query: {
      title: '单车维护',
      exportExcel: '导出',
      countryId: '国家',
      cityId: '城市',
      bikeId: '单车编号',
      lockNo: '锁编号',
      createdAt: '起止时间',
      createdByName: '操作人',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      cityName: '城市',
      bikeId: '单车编号',
      lockNo: '锁编号',
      operationPeople: '操作人',
      repairedTime: '维修时间',
      operationStatus: '运营状态',
      faultType: '维修故障类型',
      repairedImg: '维修照片',
      repairedDesc: '维修描述',
    }
  },

  putAgain: {
    query: {
      title: '单车回收再投放',
      exportExcel: '导出',
      countryId: '国家',
      cityId: '城市',
      bikeId: '单车编号',
      lockNo: '锁编号',
      recycleDate: '回收起止时间',
      recyclePerson: '回收人',
      relaunchDate: '再投放起止时间',
      relaunchPerson: '再投放人',
    },
    table: {
      id: 'ID',
      recycle: '操作种类',
      countryName: '国家',
      cityName: '城市',
      bikeId: '单车编号',
      lockNo: '锁编号',
      recycleAddress: '回收位置',
      recyclePerson: '回收人',
      recycleAt: '回收时间',
      relaunch: '操作种类',
      relaunchAddress: '投放位置',
      relaunchPerson: '投放人',
      relaunchAt: '投放时间',
    },
    js: {
      helmet0: '无',
      helmet1: '有',
    }
  },

  otherOpt: {
    query: {
      title: '其他操作',
      exportExcel: '导出',
      countryId: '国家',
      cityId: '城市',
      bikeId: '单车编号',
      lockNo: '锁编号',
      action: '操作类型',
      createdAt: '起止时间',
      createdByName: '操作人',
      success: '是否操作成功',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      cityName: '城市',
      bikeId: '单车编号',
      lockNo: '锁编号',
      action: '操作类型',
      createdByName: '操作人',
      createdAt: '操作时间',
      success: '是否操作成功',
      defeatReason: '失败原因',
    },
    js: {
      action1: '单车入库',
      action2: '单车激活',
      action3: '车与锁解绑',
      action5: '单车禁用',
      action11: '开锁',
      action12: '锁入库',
      action16: '上报单车无故障',
    }
  },

  punchcard: {
    query: {
      title: '打卡記錄',
      exportExcel: '導出',
      countryId: '國家',
      cityId: '城市',
      createdByName: '操作人',
      clockOnTime: '簽到起止時間',
      clockOffTime: '簽退起止時間',
    },
    table: {
      id: 'ID',
      countryName: '國家',
      cityName: '城市',
      createdByName: '操作人',
      clockOnTime: '簽到時間（當地時間/GMT+8時間）',
      clockOnAddress: '簽到地點',
      clockOffTime: '簽退時間（當地時間/GMT+8時間)',
      clockOffAddress: '簽退地點',
      workDuration: '工作時長',
      track: "軌跡",
      detail: "查看"
    },
    dialog: {
      title: '操作人軌跡',
      id: 'ID',
      createdByName: '操作人',
      createdTime: "時間",
      longitude: "經度",
      latitude: "緯度",
      address: "地址"
    }
  },

  flashmanedit: {
    form: {
      title: '国家配置',
      countrySelect: '国家选择',
      cityName: '城市名称',
      currency: '货币',
      currencySymbol: '货币符号',
      orderRadius: '订单半径',
      depositConfig: '押金设置',
      paymentType: '账期类型',
      week: '周',
      month: '月',
      paymentDate: '账期日期',

      grabLimitSameTime: '同时接单上限',
      dayCancelOrderUser: '用户日取消上限',
      dayCancelOrderDriver: '骑手日取消上限',

      basicPrice: '基础价格',
      priceStart: '起送价',
      depositBackNum: '免手续费退押金次数',

      nightPrice: '夜间价格',
      priceNightPercent: '额外费率',
      serviceNightStart: '开始时间',
      serviceNightEnd: '结束时间',

      extraFee: '手续费',
      priceServcie: '服务费',
      priceRefund: '退押金',
      priceWithdraw: '提现费',
      needDepositPlaceholder: '比例0～100，定额>0',

      priceInterval: '价格区间',
      weightPriceList: '重量区间',
      distancePriceList: '距离区间',
      level: '区间',
      min: '最小值',
      max: '最大值',
      price: '价格',

      newIntervalSize: '新区间跨度',
      newIntervalPrice: '新区间单价',
      newInterval: '添加新区间?',
      addSuccess: '添加成功,保存表单后生效',
      removeInterval: '此操作将删除最后一个区间, 是否继续?',
      removeSuccess: '删除成功,保存表单后生效',

      countdown: '限时相关',
      countdowRightnow: '即时单限时',
      countdowAppoint: '预约单限时',
      countdownPay: '支付限时',
      countdownPayHelper: '下单之后多久必须付款',
      limitTimePickup: '取件限时',
      countdowDelivery: '送件限时',
      limitTimeDelivery5: '起步距离',
      limitTimeDelivery5Helper: '距离第一区间内',
      limitTimeDeliveryPer5: '单位距离',

      hint: '提示',
      yes: '确定',
      no: '取消',
      delete: '删除',
      add: '添加',

      fixed: '定额',
      rate: '比例',
      distance: '距离',
      time: '时间',
      save: '保存',
      saveHelper: '此操作将更新闪送设置, 是否继续?',
      selectPlaceholder: '请选择',
      datePlaceholder: '请选择1至28整数',
      lt0Placeholder: '需大于0',
      timePlaceholder: '任意时间点',
      timesUnit: '次'
    }
  },

  driver: {
    query: {
      title: '騎士基本信息',
    },
    table: {
      id: '騎士ID',
      name: '騎士名',
      createdAt: '註冊時間',
      phone: '騎士號碼',
      driverStatus: '騎士狀態',
      certificate: '認證狀態',
      workStatus: '工作狀態',
      countryName: '國家',
      depositStatus: '押金狀態',
      email: '郵箱',
      platform: '平台',
      memo: '備註',
      updatedAt: '更新時間',

      driverStatusBtn1: '凍結',
      driverStatusBtn0: '解凍',
      depositStatusBtn1: '置為免押金',
      depositStatusBtn0: '取消免押金',
    },
    js: {
      driverStatus0: '正常',
      driverStatus1: '凍結',
      workStatus0: '下線',
      workStatus1: '上線',
      depositStatus0: '未交押金',
      depositStatus1: '已交押金',
      depositStatus2: '押金不足',
      depositStatus3: '免押金',
      certificate0: '未認證',
      certificate1: '認證中',
      certificate2: '認證成功',

      tip: '提示',
      driverStatusString0: '確定要凍結騎士{phone}？ ',
      driverStatusString1: '確定要解凍騎士{phone}？ ',
      depositStatusString1: '確定要將騎士{phone}取消免押金？ ',
      depositStatusString0: '確定要將騎士{phone}置為免押金？ ',
    }
  },

  driverVerify: {
    query: {
      title: '騎士審核',
      countryId: '國家',
    },
    table: {
      id: '審核ID',
      memberId: '騎士ID',
      realName: '騎士名',
      createdAt: '註冊時間',
      phone: '騎士號碼',
      certificateStatus: '審核狀態',
      countryName: '國家',
      certificationNo: '證件號',
      imgs: '審核圖',
      updatedAt: '更新時間',

      apply: '通過',
      refused: '不通過',
      goDriverInfo: '查看騎士個人信息',
    },
    js: {
      confirm1: '確認通過騎士{phone}的審核？ ',
      confirm2: '確認不通過騎士{phone}的審核？ ',
      certificateStatus0: '未審核',
      certificateStatus1: '審核通過',
      certificateStatus2: '審核不通過',
    }
  },

  delivery: {
    name: '闪送订单列表',
    query: {
      orderNo: '订单号',
      countryId: '国家',
      sender: '用户',
      uidSender: '用户id',
      senderPhone: '用户手机',
      sendfor: '发件人',
      sendforName: '发件人名称',
      sendforPhone: '发件人手机',
      sendforAddress: '发件人地址',
      note: '备注',
      receiverPhone: '收件人手机',
      uidDriver: '骑士id',
      driver: '骑士',
      driverName: '骑士名称',
      driverPhone: '骑士手机',
      chooseTime: '选择日期时间',
      beginCreateTime: '下单晚于',
      endCreateTime: '下单早于',
      packet: '物品信息',
      status: '订单状态',
      stautsBad: '订单类型',
      senderPaystatus: '支付状态',
      query: '查询',
    },
    list: {
      operate: '操作',
      orderNo: '订单号',
      countryName: '国家',
      statusStr: '订单状态',
      stautsBadStr: '订单类型',
      senderPaystatusStr: '支付状态',
      uidSender: '用户id',
      senderPhone: '用户手机',
      sendforPhone: '发件人手机',
      receiverPhone: '收件人手机',
      uidDriver: '骑士id',
      driverPhone: '骑士手机',
      createTimeStr: '下单时间',
      sendTimeStr: '预约时间',
      driverGrabTimeStr: '接单时间',
      driverGetTimeStr: '取件时间',
      driverSendtoTimeStr: '送达时间',
      packetWeight: '重量(kg)',
      miles: '距离(km)',
      priceSenderAll: '订单价格',
      packetRemark: '备注',
      operate: '操作',
      check: '查看详情',
      cancel: '取消订单',
      setAbnormal: '置为异常',
      abnormalRefund: '处理退款',
      handleAbnormal: '置为已处理'
    },
    info: {
      name: '订单详情',
      orderNo: '订单号码',
      sender: '用户',
      uidSender: '用户id',
      senderPhone: '用户手机',
      sendfor: '发件人',
      sendforName: '	发件人名称',
      sendforPhone: '发件人手机',
      sendforAddress: '发件人地址',
      sendforDoorno: '发件人门牌号',
      sendforPostalCode: '发件人邮编',
      receiver: '收件人',
      receiverName: '	收件人名称',
      receiverPhone: '收件人手机',
      receiverAddress: '收件人地址',
      receiverDoorno: '收件人门牌号',
      receiverPostalCode: '收件人邮编',
      note: '备注',
      driver: '骑士',
      driverName: '骑士名称',
      uidDriver: '骑士id',
      driverPhone: '骑士手机',
      packetType: '包裹类型',
      packetValue: '物品价格',
      packet: '订单信息',
      packetWeight: '重量(kg)',
      miles: '距离(km)',
      priceSenderAll: '订单总价',
      priceExtra: '额外金额',
      statusStr: '订单状态',
      refundAmount: '退款金额',
      driverRefundAmount: '退款骑手佣金',
      trackOrder: '行程追踪',
      createTimeStr: '下单时间',
      senderPaytime: '支付时间',
      sendTimeStr: '预约取件时间',
      driverGrabTimeStr: '接单时间',
      driverGetTimeStr: '取件时间',
      driverSendtoTimeStr: '到件时间',
      cancelTimeStr: '取消时间',
      stautsBadStr: '订单类型',
      sendforVerifyno: '取件码',
      receiverVerifyno: '收件码'
    },
    statusOptions: {
      op1: '所有',
      op2: '待支付',
      op3: '待接单',
      op4: '待取件',
      op5: '已取件',
      op6: '已送达',
      op7: '已取消',
      op44: '异常中',
      op45: '已处理'
    },
    stautsBadOptions: {
      op1: '所有',
      op2: '正常件',
      op3: '超时件',
      op4: '空单件',
      op5: '预约空单件',
    },
    senderPaystatusOptions: {
      op1: '所有',
      op2: '待支付',
      op3: '已支付',
      op4: '已退款',
    },
    packetTypeOptions: {
      op1: '所有',
      op2: '未知',
      op3: '文件',
      op4: '书籍',
      op5: '花草',
      op6: '食物',
      op7: '服饰',
      op8: '其他'
    },
    js: {
      cencelHelper: '确认取消此订单？',
      abnormalHelper: '确认置此订单为异常？',
      abnormalSuccess: '此订单已置为异常',
      
      abnormalRefundHelper: '确认执行此异常单的退款？',
      handleAbnormalHelper: '确认设置异常单为处理完成？',
      abnormalHandleSuccess: '处理成功！',
      
      hint: '提示',
      yes: '确认',
      no: '取消'
    },
    refundQuery: {
      title: '异常退款',
      orderNo: '订单号',
      uidSender: '用户名',
      senderPhoneStr: '用户手机号',
      priceSenderAllStr: '订单总金额',
      refundAmount: '退款金额',
      driverRefundAmount: '退款骑手佣金',

      nonEmptyHelper: '不能为空',
      validateHelperSingle: '不得大于退款金额',
      validateHelperAll: '退款金额和骑手佣金相加不得大于退款金额'
    }
  },

  cash: {
    query: {
      title: '騎手提現列表',
      statementNo: '訂單號',
      driverId: '騎士id',
      driverPhone: '騎士手機號',
      updatedAt: '提現日期',
      payStatus: '提現狀態',
    },
    table: {
      createdAt: '申請日期',
      countryName: '國家',
      amount: '提現金額',
      approve: '通過申請',
      cashOk: '確認發放',
      cashRefuse: '拒絕發放',
    },
    js: {
      payStatus5: '提現申請中',
      payStatus6: '提現通過申請',
      payStatus7: '打款成功',
      payStatus8: '打款失敗',
      approveTips: '確認通過騎士{phone}的提現申請？',
      cashOkTips: '確認已給騎士{phone}打款？',
      cashRefuseTips: '確認拒絕騎士{phone}的提現申請？',
    }
  },

  rwcoupon: {
    query: {
      title: '獎勵資源-優惠券',
      add: '添加',
      countryId: '適用國家',
      cityId: '適用都市',
      benefitType: '優惠類型',
      name: '優惠名稱',
      merchantCode: '供應商',
      query: '査詢'
    },
    table: {
      id: 'ID',
      merchantCode: '供應商名稱',
      name: '優惠券名稱',
      benefitType: '優惠類型',
      benefitContent: '優惠額度',
      endType: '有效期類型',
      period: '有效期時間',
      area: '適用區域',
      operate: '操作',
      edit: '編輯',
      view: '詳情'
    },
    js: {
      discount: '折扣',
      quota: '定額',
      all: '所有',
      day: '天',

      benefitType1: '折扣',
      benefitType2: '金額',

      endType1: '指定天數',
      endType2: '指定日期'
    }
  },
  
  rweditcoupon: {
    form: {
      title: '奖励资源 - 编辑优惠券',
      title0: '奖励资源 - 配置优惠券',
      basic: '优惠券信息',
      setting: '优惠券显示样式',
      merchant: '供应商名称',
      merchantCode: '供应商ID',
      couponId: '优惠券名称',
      couponInfo: '优惠券信息',
      benefitType: '内容',
      period: '有效期',
      area: '适用区域',
      needPhone: '获取优惠券是否需要手机号码？',
      yes: '是',
      no: '否',
      upload: '优惠券的LOGO',
      uploadTip: '支持png/jpg/jpeg',
      couponName: 'App优惠券名称',
      link: '点击使用跳转页面的链接,必须为https://协议头',
      default: '默认优惠券样式',
      vip: 'VIP',
      days: 'DAYS',
      couponName: 'oBike COUPONS',
      couponTime: '2017.12.25 - 2018.01.01',
      set: '配置优惠券样式',
      detail: 'Detail >>',
      cancel: '取消',
      submit: '保存'
    },
    js: {
      day: '天',
      benefitType1: '折扣',
      benefitType2: '金额',
    }
  },

  rwinfocoupon: {
    query: {
      title: '奖励资源 - 优惠券详情',
      basic: '优惠券信息',
      setting: '优惠券显示样式',
      merchant: '供应商名称',
      merchantCode: '供应商ID',
      couponId: '优惠券名称',
      couponInfo: '优惠券信息',
      benefitType: '内容',
      period: '有效期',
      area: '适用区域',
      needPhone: '获取优惠券是否需要手机号码？',
      yes: '是',
      no: '否',
      set: '配置优惠券样式',
      detail: 'Detail >>',
      link: '点击使用跳转页面的链接',
    }
  },

  rwcode: {
    query: {
      title: '奖励资源 - 优惠码',
      add: '添加',
      merchantCode: '供应商名称',
      countryId: '适用国家',
      cityId: '适用城市',
      name: '优惠码名称',
      query: '查询'
    },
    table: {
      id: 'ID',
      merchantCode: '供应商',
      name: '优惠码名称',
      file: '优惠码文件',
      fileUrl: '点击下载',
      usage: '已領取/總數',
      area: '适用区域',
      operate: '操作',
      edit: '编辑',
      view: '详情'
    },
    js: {
      all: '所有'
    }
  },

  rweditcode: {
    form: {
      title: '奖励资源 - 编辑优惠码',
      title0: '奖励资源 - 配置优惠码',
      basic: '基本信息',
      merchant: '供应商名称',
      merchantCode: '供应商ID',
      countryId: '国家',
      cityId: '城市',
      codeName: '优惠码标识',
      uploadExcel: '优惠码表格',
      choose: '上传文件',
      needPhone: '获取优惠码是否需要手机号码',
      yes: '是',
      no: '否',
      setting: '优惠码显示样式',
      upload: '优惠码LOGO',
      uploadTip: '支持png/jpg/jpeg',
      logoName: '优惠码名称',
      link: '点击使用跳转页面的链接,必须为https://协议头',
      cancel: '取消',
      submit: '保存',
      default: '默认优惠码样式',
      defaultName: 'HELLO oBike',
      defaultLogo: 'oBike Promo Code',
      detail: 'Detail >>',
      set: '配置优惠码样式',
    },
    js: {
      uploadOnly: '不支持多文件上传',
      uploadTip1: '上传文件必须为xls/xlsx'
    }
  },

  rwinfocode: {
    query: {
      title: '奖励资源 - 优惠码详情',
      basic: '优惠信息',
      merchant: '供应商名称',
      merchantCode: '供应商ID',
      codeName: '优惠码名称',
      fileUrl: '优惠码文件',
      download: '点击下载',
      needPhone: '获取优惠券是否需要手机号码',
      yes: '是',
      no: '否',
      setting: '优惠码配置信息',
      set: '优惠码显示样式',
      detail: '立即使用',
      link: '点击使用跳转页面的链接'
    }
  },

  rwcredit: {
    query: {
      title: '奖励资源 - 信用分',
      add: '添加',
      name: '信用分名称',
      changeType: '信用分类型',
      query: '查询'
    },
    table: {
      id: 'ID',
      name: '信用分名称',
      changeType: '信用分类型',
      score: '信用分数值',
      createdAt: '创建时间',
      adminName: '创建人',
      operate: '操作',
      edit: '编辑',
      view: '详情'
    },
    js: {
      all: '所有',

      changeType1: '加分',
      changeType2: '减分'
    }
  },

  rweditcredit: {
    form: {
      title: '奖励资源 - 编辑信用分',
      title0: '奖励资源 - 配置信用分',
      basic: '优惠信息',
      creditName: '信用分名称',
      changeType: '信用分类型',
      plus: '加分',
      minus: '减分',
      must: '必填',
      needPhone: '加减信用分是否需要手机号码',
      yes: '是',
      no: '否',
      cancel: '取消',
      submit: '保存'
    }
  },

  rwinfocredit: {
    query: {
      title: '奖励资源 - 信用分详情',
      basic: '优惠信息',
      creditName: '信用分名称',
      changeType: '信用分类型',
      plus: '加分',
      minus: '减分',
      must: '必填',
      needPhone: '加减信用分是否需要手机号码',
      yes: '是',
      no: '否'
    }
  },

  rwactivity: {
    query: {
      title: '活动内容',
      add: '添加',
      name: '活动名称',
      expireType: '活动状态',
      rewardsSubNum: '奖励数量',
      createdStartDate: '创建开始时间',
      createdEndDate: '创建结束时间',
      startDate: '开始时间',
      endDate: '结束时间',
      chooseDate: '请选择日期',
      chooseTime: '请选择日期时间',
      query: '查询'
    },
    table: {
      id: 'ID',
      name: '活动名称',
      expireType: '活动状态',
      rewardsSubNum: '奖励类型',
      rules: '用户领取规则',
      createdAt: '创建时间',
      startTime: '开始时间',
      endTime: '结束时间',
      adminName: '创建人',
      operate: '操作',
      edit: '编辑',
      view: '详情'
    },
    js: {
      all: '所有',
      rewardsSubNum1: '单个奖励',
      rewardsSubNum2: '多个奖励',
      limited1: '限制{day}天内{times}次',
      limited2: '不限制时间，限制总次数：{times}次',
      limited0: '不限时间不限次数',

      expireType1: '生效中',
      expireType2: '已过期',
      expireType3: '未生效',
    }
  },

  rweditactivity: {
    form: {
      title: '编辑奖励活动',
      title0: '新增奖励活动',
      name: '活动名称',
      countryId: '适用国家',
      cityId: '适用城市',
      startDateTime: '开始时间',
      startPlaceholder: '选择时间',
      endDateTime: '结束时间',
      endPlaceholder: '选择时间',
      addReward: '添加奖励',
      prioirtyNode: '*注释：优先级按照选择的顺序进行排列，若用户没有符合获得奖励一的条件，则会选择奖励二给用户。',
      priority: '优先级',
      priorityDetail: '奖励详情',
      priorityPlaceholder: '大于0的整数',
      merchantCode: '供应商',
      rewardType: '奖励类型',
      rewardId: '奖励名称',
      unlimited: '不限次数',
      yes: '是',
      no: '否',
      rewardNum: '奖励总次数',
      addNew: '添加',
      empty: '无奖励',
      inputAmount: '请输入数量',
      noName: '未命名',
      noLimit: '不限数量',
      limited: '用户领取规则',
      limited1: '限制领取时间和次数',
      limited2: '不限时间限制次数',
      limited0: '不限时间不限次数',
      unitTime: '天',
      limitedTimes: '次',
      cancel: '取消',
      submit: '保存',
      edit: '修改'
    },
    js: {
      rewardType1: '优惠券',
      rewardType2: '优惠码',
      rewardType3: '信用分',
      message: '确定删除该奖励？',
      tip: '删除提示',
      ok: '确定',
      cancel: '取消'
    }
  },

  ...enterprise,
  ...evs,
  ...ocoin,
  // for elementUi i18n
  ...twLocale
}
