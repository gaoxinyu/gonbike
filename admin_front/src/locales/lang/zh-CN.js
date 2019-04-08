import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enterprise from './zh-CN/enterprise'
import evs from './zh-CN/evs'
import ocoin from './zh-CN/ocoin'

export default {
  signOut: '退出',

  // menus
  menu: {
    mainMenu: '主菜单',
    customer: {
      name: '客户服务',
      report: '工单管理',
      addreport: '添加工单',
      student: '学生证审核',
      sms: '短信管理',
      smsadd: '发送短信',
      smstemplate: '短信模板',
      smslimit: '短信黑名单',
      driververify: '骑士审核',
    },
    operate: {
      name: '单车运营',
      monitor: '车辆监控',
      trip: '行程记录',
      bikearea: '停车区域管理',
      // 单车logo管理 zhu 2017.04.17
      bikelogo: '单车logo管理',
      bikelogoadd: '添加logo配置',
      bikelogoedit: '更新logo配置',
      bikelogoinfo: 'logo配置详情',
      tag: '投放标签管理',
      tagadd: '配置标签',
      category: '标签目录',
      // 国家城市配置 zhu 2017.05.11
      cityconfig: '国家城市配置',
      fence: '电子围栏',
      fenceInfo: '电子围栏列表',
    },
    delivery: {
      name: '闪送',
      deliveryorder: '闪送订单列表'
    },
    user: {
      name: '用户管理',
      userinfo: '用户基本信息',
      device: '用户设备信息',
      credit: '信用分管理',
      creditadd: '添加信用分',
      trade: '交易明细管理',
      tradeadd: '余额调整',
      payment: '支付明细管理',
      usercoupon: '用户优惠券',
      addusercoupon: '赠送优惠券',
      vip: '用户会员信息',
      autopay: '自动续费管理',
      redbag: '用户奖励信息',
      driver: '骑士基本信息',
      cash: '提现明细管理',
      ocoin: 'OCN交易明细'
    },
    stock: {
      name: '单车入库',
      lock: '锁信息管理',
      lockadd: '添加锁',
      bike: '单车信息管理',
      bikeadd: '添加单车',
      state: '单车国家配置'
    },
    app: {
      name: 'App管理',
      message: '通知管理',
      messageadd: '添加通知',
      version: 'APP更新管理',
      versionadd: '添加APP更新',
      invite: '邀请好友赠送管理',
      // 广告位 zhu 2017.09.01
      adarea: '广告位管理',
      addad1: '配置首页弹窗',
      addad2: '配置首页轮播',
      addad3: '配置顶部横幅',
      addad4: '配置图标',
      addad5: '配置一键购买会员',
    },
    discount: {
      name: '优惠管理',
      activity: '充值返现',
      activityadd: '配置返现',
      joinuser: '参与用户',
      coupon: '优惠券',
      couponadd: '配置优惠券',
      code: '优惠码',
      codeadd: '配置优惠码',
      coderecord: '兑换记录',
      free: '免费骑行',
      freeadd: '配置免费骑行',
      card: '会员卡',
      cardadd: '配置会员卡',
      deposit: '押金折扣',
      depositadd: '配置押金折扣',
      users: '参与用户',
      registercoupon: '注册券',
      nodeposit: '免押金骑行',
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
      funcpush: '推送记录',
      pushmessage: '推送消息',
      pushmessageadd: '添加推送消息',
    },
    admin: {
      name: '权限管理',
      role: '角色管理',
      account: '帐号管理',
      accountadd: '添加账号'
    },
    city: {
      name: '开城管理',
      recharge: '押金与充值管理',
      price: '车费价格管理',
      payfee: '手续费管理',
      flashmanedit: 'FlashMan开城'
    },
    setting: {
      name: '系统设置',
      paypal: 'PayPal转账',
      risk: '支付风险控制',
      riskadd: '配置风险控制条件',
      appsms: '短信运营商设置',
      smssettingadd: '配置短信运营商',
      prov: '各国支持的短信运营商',
      operator: '短信运营商信息',
      pay: '支付方式设置',
      addpay: '添加支付方式设置',
      editpay: '编辑支付方式设置',
      payinfo: '支付方式详情',
      radius: '单车显示半径',
      depositrefund: '押金退款手续费设置'
    },
    log: {
      name: '系统日志',
      bind: '绑定失败日志',
      pay: '支付失败日志',
      lock: '开关锁失败日志',
      optlog: '运维端操作日志',
      uploadloc: '上报位置',
      putbike: '单车投放',
      bikemaintain: '单车维护',
      putagain: '回收再投放',
      other: '其他操作',
      punchcard: '打卡记录',
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
      name: '企业账号',
      enterpriseaccount: '企业列表',
      enterprisepackage: '套餐列表',
    },
    evs: {
      name: 'EVS管理',
      evsuser: '用户管理',
      evsorder: '订单管理',
      evspayway: 'EVS设置',
    }
  },

  common: {
    all: '所有',
    chooseTime: '选择日期',
    query: '查询',
    resetQuery: '重置',
    exportQuery: '导出',
    operate: '操作',
    yes: '是',
    no: '否',
    ok: '确认',
    cancel: '取消',
    choose: '请选择',
    input: '请输入',
    add: '添加',
    edit: '编辑',
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
      country3: '阿尔巴尼亚',
      country4: '阿尔及利亚',
      country5: '安道尔共和国',
      country6: '安圭拉岛',
      country7: '安提瓜和巴布达',
      country8: '阿根廷',
      country9: '亚美尼亚',
      country10: '阿森松',
      country11: '澳大利亚',
      country12: '奥地利',
      country13: '阿塞拜疆',
      country14: '巴哈马',
      country15: '巴林',
      country16: '孟加拉国',
      country17: '巴巴多斯',
      country18: '白俄罗斯',
      country19: '比利时',
      country20: '伯利兹',
      country21: '贝宁',
      country22: '百慕大群岛',
      country23: '玻利维亚',
      country24: '博茨瓦纳',
      country25: '巴西',
      country26: '文莱',
      country27: '保加利亚',
      country28: '布基纳法索',
      country29: '缅甸',
      country30: '布隆迪',
      country31: '喀麦隆',
      country32: '加拿大',
      country33: '开曼群岛',
      country34: '中非共和国',
      country35: '乍得',
      country36: '智利',
      country37: '中国',
      country38: '哥伦比亚',
      country39: '刚果',
      country40: '库克群岛',
      country41: '哥斯达黎加',
      country42: '古巴',
      country43: '塞浦路斯',
      country44: '捷克',
      country45: '丹麦',
      country46: '吉布提',
      country47: '多米尼加共和国',
      country48: '厄瓜多尔',
      country49: '埃及',
      country50: '萨尔瓦多',
      country51: '爱沙尼亚',
      country52: '埃塞俄比亚',
      country53: '斐济',
      country54: '芬兰',
      country55: '法国',
      country56: '法属圭亚那',
      country57: '加蓬',
      country58: '冈比亚',
      country59: '格鲁吉亚',
      country60: '德国',
      country61: '加纳',
      country62: '直布罗陀',
      country63: '希腊',
      country64: '格林纳达',
      country65: '关岛',
      country66: '危地马拉',
      country67: '几内亚',
      country68: '圭亚那',
      country69: '海地',
      country70: '洪都拉斯',
      country71: '香港',
      country72: '匈牙利',
      country73: '冰岛',
      country74: '印度',
      country75: '印度尼西亚',
      country76: '伊朗',
      country77: '伊拉克',
      country78: '爱尔兰',
      country79: '以色列',
      country80: '意大利',
      country81: '科特迪瓦',
      country82: '牙买加',
      country83: '日本',
      country84: '约旦',
      country85: '柬埔寨',
      country86: '哈萨克斯坦',
      country87: '肯尼亚',
      country88: '韩国',
      country89: '科威特',
      country90: '吉尔吉斯坦',
      country91: '老挝',
      country92: '拉脱维亚',
      country93: '黎巴嫩',
      country94: '莱索托',
      country95: '利比里亚',
      country96: '利比亚',
      country97: '列支敦士登',
      country98: '立陶宛',
      country99: '卢森堡',
      country100: '澳门',
      country101: '马达加斯加',
      country102: '马拉维',
      country103: '马来西亚',
      country104: '马尔代夫',
      country105: '马里',
      country106: '马耳他',
      country107: '马里亚那群岛',
      country108: '马提尼克',
      country109: '毛里求斯',
      country110: '墨西哥',
      country111: '摩尔多瓦',
      country112: '摩纳哥',
      country113: '蒙古',
      country114: '蒙特塞拉特岛',
      country115: '摩洛哥',
      country116: '莫桑比克',
      country117: '纳米比亚',
      country118: '瑙鲁',
      country119: '尼泊尔',
      country120: '荷属安的列斯',
      country121: '荷兰',
      country122: '新西兰',
      country123: '尼加拉瓜',
      country124: '尼日尔',
      country125: '尼日利亚',
      country126: '朝鲜',
      country127: '挪威',
      country128: '阿曼',
      country129: '巴基斯坦',
      country130: '巴拿马',
      country131: '巴布亚新几内亚',
      country132: '巴拉圭',
      country133: '秘鲁',
      country134: '菲律宾',
      country135: '波兰',
      country136: '法属玻利尼西亚',
      country137: '葡萄牙',
      country138: '波多黎各',
      country139: '卡塔尔',
      country140: '留尼旺',
      country141: '罗马尼亚',
      country142: '俄罗斯',
      country143: '圣卢西亚',
      country144: '圣文森特岛',
      country145: '东萨摩亚(美)',
      country146: '西萨摩亚',
      country147: '圣马力诺',
      country148: '圣多美和普林西比',
      country149: '沙特阿拉伯',
      country150: '塞内加尔',
      country151: '塞舌尔',
      country152: '塞拉利昂',
      country153: '新加坡',
      country154: '斯洛伐克',
      country155: '斯洛文尼亚',
      country156: '所罗门群岛',
      country157: '索马里',
      country158: '南非',
      country159: '西班牙',
      country160: '斯里兰卡',
      country163: '苏丹',
      country164: '苏里南',
      country165: '斯威士兰',
      country166: '瑞典',
      country167: '瑞士',
      country168: '叙利亚',
      country169: '台湾',
      country170: '塔吉克斯坦',
      country171: '坦桑尼亚',
      country172: '泰国',
      country173: '多哥',
      country174: '汤加',
      country175: '特立尼达和多巴哥',
      country176: '突尼斯J',
      country177: '土耳其',
      country178: '土库曼斯坦',
      country179: '乌干达',
      country180: '乌克兰',
      country181: '阿拉伯联合酋长国',
      country182: '英国',
      country183: '美国',
      country184: '乌拉圭',
      country185: '乌兹别克斯坦',
      country186: '委内瑞拉',
      country187: '越南',
      country188: '也门',
      country189: '南斯拉夫',
      country190: '津巴布韦',
      country191: '扎伊尔',
      country192: '赞比亚',
    },

    languages: {
      default: '默认',
      en: '英文',
      zh: '中文',
      hant: '繁体',
      ms: '马来语',
      th: '泰文',
      ko: '韩文',
      nl: '荷兰语',
      fr: '法语',
      'fr-ch': '瑞士法语',
      de: '德语',
      'de-ch': '瑞士德语',
      'en-uk': '英国英语',
      'en-au': '澳大利亚英语',
      it: '意大利语',
      'zh-hant-hk': '香港繁体',
      span: '西班牙语',
      id: '印度尼西亚语',
      pt: '葡萄牙语',
      'ru-ua': '乌克兰俄语'
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
    title: '欢迎访问oBike admin系统！您有如下功能权限，如需更多功能，请联系管理员。'
  },

  report: {
    box: {
      title: '工单管理',
      title1: '批量忽略',
      title2: '批量加分',
      goAdd: '添加工单',
    },
    query: {
      beginTime: '起始日期',
      endTime: '结束日期',
      chooseTime: '选择日期',
      assignTo: '分配给',
      status: '处理状态',
      type: '举报类型',
      priority: '标记',
      bikeId: '单车编号',
      phone: '用户手机号',
      countryId: '国家',
      cityId: '城市',
      faultId: '工单编号',
      query: '查询',

      all: '所有',
      assignTo1: '线上',
      assignTo2: '线下',

      priority1: '优先级-高',
      priority2: '优先级-中',
      priority3: '优先级-低',
      priority0: '无标记'
    },
    table: {
      id: '编号',
      createdAt: '举报时间',
      type: '举报类型',
      phone: '用户手机号',
      bikeId: '单车编号',
      address: '单车位置',
      assignTo: '分配给',
      status: '处理状态',
      priority: '标记',
      remark: '备注',
      operate: '操作',

      detail: '详情'
    },
    dialog: {
      title: '确认全部忽略？',
      title1: '确认全部处理？',
      bikeIds: '单车编号',
      faults: '共{faults}个问题',
      count: '个',
      cancel: '取消',
      ok: '确定',
    },
    js: {
      all: '所有',
      type1: '开不了锁',
      type2: '单车故障',
      type3: '举报违停',
      type4: '找不到车',
      type5: '无法停止计费',

      type13: '其他问题',
      type30: '电量低于3.5V',
      type31: '72小时未使用',
      type32: '处于骑行中超过6小时',

      status0: '未处理',
      status1: '已处理',
      status2: '已忽略',
      status3: '申诉中',

      optStatus1: '正常',
      optStatus2: '发现故障',
      optStatus3: '故障中',

      optAdmin: '运营专员',

      assignTo1: '线上',
      assignTo2: '线下',

      priority1: '优先级-高',
      priority2: '优先级-中',
      priority3: '优先级-低',
      priority0: '无标记',
    }
  },

  reportInfo: {
    box: {
      title1: '举报详情',
      title2: '举报时单车位置 - 当前单车位置',
      title3: '举报人信息',
      title4: '被举报人信息',
      title5: '单车现状',
      title6: '最后使用记录',
      title7: '工单处理',
      title8: '工单历史',
      title9: '未处理故障概况',
      title10: '举报前一条使用记录',
    },
    table1: {
      type: '举报类型',
      bikeId: '单车编号',
      createdAt: '举报时间',
      address: '举报时单车位置',
      content: '故障类型',
      remark: '问题描述',
      img: '举报图片',
    },
    table2: {
      tip: '未处理工单',
      phone: '用户手机号',
      email: '用户邮箱',
      credit: '用户信用分',
      reportCount: '举报次数',
      beReportedCount: '被举报次数',
      balance: '用户余额',
    },
    table3: {
      phone: '被举报人手机号',
      email: '被举报人邮箱',
      credit: '被举报人信用分',
      isDone: '被举报人是否因该违停已被扣过分',
      isDoneY: '是',
      isDoneN: '否',
      reportCount: '举报次数',
      beReportedCount: '被举报次数',
      balance: '用户余额',
    },
    table4: {
      bikeId: '单车编号',
      status: '使用状态',
      electricity: '电量',
      useTime: '最后使用时间',
      optStatus: '运营状态',
      address: '单车位置',
    },
    table5: {
      orderNo: '订单编号',
      lockType: '结束类型',
      startTime: '最后使用时间',
      phone: '最后使用人',
      reportedMan: '是否被举报人',
      reportMan: '是否举报人',
      yes: '是',
      no: '否',
      minutes: '最后一次骑行时间',
      distance: '最后一次骑行距离',
      beginAddress: '起始位置',
      endAddress: '结束位置',

      status: '订单状态',
      status1: '预定中',
      status2: '取消预订',
      status3: '骑行中',
      status4: '骑行结束',
      status5: '骑行结束',
    },
    table6: {
      priority: '标记为',
      priority1: '优先级-高',
      priority2: '优先级-中',
      priority3: '优先级-低',
      priority0: '取消标记',

      assignTo: '分配给',
      credit: '信用分',
      on: '是',
      off: '否',
      score: '应扣分数',
      score1: '已扣除分数',
      addCredit: '举报人+{score}分',
      minusCredit: '被举报人-{score}分',
      sendNoti: '发消息给用户',
      yes: '是',
      no: '否',
      reporter: '发给举报人',
      reported: '发给被举报人',

      handleDesc: '备注',
      handle: '操作',
      save: '保存',
      handleConfirm: '已解决',
      handleIgnore: '忽略',
      mailto: '发邮件给',
    },
    table7: {
      report: '举报',
      desc: '问题描述：',
      to: '改为',
      beforePriority: '优先级由',
      from: '由',
      beforeStatus: '工单状态由',
      addRemark: '添加备注：',
    },
    table9: {
      type1: '开不了锁',
      type2: '单车故障',
      type3: '举报违停',
      type4: '定位不准',
      type5: '无法停止计费',
      type6: '其他问题',
      type30: '电量低于3.5V',
      type31: '72小时未使用',
      type32: '骑行超过6小时',
    },
    table10: {
      tip: '是否最后一条使用记录',
      orderNo: '订单编号',
      status: '订单状态',
      lockType: '结束类型',
      startTime: '使用时间',
      phone: '使用人',
      reportedMan: '是否被举报人',
      reportMan: '是否举报人',
      yes: '是',
      no: '否',
      minutes: '骑行时间',
      distance: '骑行距离',
      beginAddress: '起始位置',
      endAddress: '结束位置',
    },
    js: {
      assignTo1: '线上',
      assignTo2: '线下',

      bikeStatus0: '未激活',
      bikeStatus1: '可用',
      bikeStatus2: '被预定',
      bikeStatus3: '行驶中',
      bikeStatus4: '解锁中',
      bikeStatus5: '禁用中',

      optStatus1: '正常',
      optStatus2: '发现故障',
      optStatus3: '故障中',
      optStatus4: '维修完成',
      optStatus0: '未激活',

      lockType1: '正常',
      lockType2: '历史',
      lockType3: '运营手动',
      lockType6: '用户手动',

      to: '改为',
      beforePriority: '优先级由',
      from: '由',
      beforeStatus: '工单状态由',

      priority1: '优先级-高',
      priority2: '优先级-中',
      priority3: '优先级-低',
      priority0: '取消标记',

      status0: '未处理',
      status1: '已处理',
      status2: '已忽略',
      status3: '申诉中',
    }
  },

  addReport: {
    box: {
      title: '添加工单',
      goBack: '返回',
    },
    form: {
      type: '举报类型',
      bikeId: '单车编号',
      bikeIdPlaceHolder: '请输入单车编号',
      phone: '用户手机号',
      phonePlaceHolder: '请输入用户手机号',
      content: '故障描述',
      img: '消息图片',
      upload: '点击上传',
      uploadTip: '只能上传jpg/png文件，且不超过500kb',
      assignTo: '分配给',
      priority: '添加标记',
      priority1: '优先级-高',
      priority2: '优先级-中',
      priority3: '优先级-低',
      priority0: '取消标记',
      remark: '备注',
      save: '保存',
    },
    js: {
      type1: '开不了锁',
      type2: '单车故障',
      type3: '举报违停',
      type4: '定位不准',
      type5: '无法停止计费',
      type6: '其他问题',
      type30: '电量低于3.5V',
      type31: '骑行超过6小时',
      type32: '72小时未使用',

      assignTo1: '线上',
      assignTo2: '线下',
    }
  },

  sms: {
    box: {
      title: '短信管理',
      goAdd: '发送短信',
    },
    query: {
      beginTime: '开始日期',
      endTime: '结束日期',
      chooseTime: '选择日期',
      phone: '接收用户手机号',
      sender: '发送人',
      countryId: '国家',
      provider: '运营商',
      action: '类型',
      success: '是否成功',
      query: '查询',
      type: '发送方式',
    },
    table: {
      id: 'ID',
      phone: '接收用户手机号',
      createdAt: '时间',
      sender: '发送人',
      context: '发送内容',
      provider: '发送运营商',
      success: '发送结果',
      resultInfo: '失败原因',
      type: '发送方式',
      ip: 'IP',
      mask: '备注',
    },
    js: {
      all: '所有',
      success: '发送成功',
      fail: '发送失败',
      inprocess: '发送中',
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
      template: '选择模板',
      countryId: '国家',
      message: '短信内容',
      messagePlaceholder: '不超过140字符',
      phone: '发送给',
      phonePlaceholder: '输入用户手机号码，多个用户回车隔开',
      isBlackLimit: '是否启用黑名单',
      remark: '备注',
      submit: '提交',
      clear: '清除',
    },
    js: {
      template1: '空白模板',
      template2: '关锁提醒',
      template3: '行程终止提醒',
      template4: '道歉模板',
    },
  },

  smsTemplate: {
    query: {
      title: '短信模板',
      goAdd: '新建模板',
      name: '模板名称',
      query: '查询',
    },
    table: {
      id: 'ID',
      name: '模板名称',
      language: '语言',
      content: '模版内容',
      operate: '操作',
      edit: '编辑',
      delete: '删除',
    },
    dialog: {
      title: '新建模板',
      title1: '修改模板',
      name: '模板名称',

      language: '语言',
      content: '内容',
      operate: '操作',
      edit: '编辑',
      finish: '保存',
      delete: '删除',

      add: '添加语言',
      cancel: '取消',
      ok: '保存',
    },
    js: {
      deleteMessage: '确认删除模板{name}?',
      tip: '提示',
      ok: '确认',
      cancel: '取消',
    }
  },

  smsLimit: {
    query: {
      title: '短信黑名单',
      goAdd: '添加',
      countryId: '国家码',
      phone: '手机号',
      query: '查询',
    },
    table: {
      id: 'ID',
      countryId: '国家',
      phone: '手机号',
      remark: '备注',
      operate: '操作',
      edit: '编辑备注',
      delete: '删除'
    },
    dialog: {
      title: '添加黑名单',
      title1: '添加备注'
    },
    form: {
      countryId: '国家',
      phone: '手机号',
      placeholder: '多个手机号，请用换行隔开',
      remark: '备注',
      cancel: '取消',
      submit: '提交'
    },
    js: {
      deleteBlack: '确定要从黑名单中删除 {phone} 吗?',
      textTip: '数据不正确，请重新输入',
      tip: '删除黑名单',
      ok: '删除',
      cancel: '取消'
    }
  },

  student: {
    box: {
      title: '学生证审核',
      title1: '批量审核通过',
    },
    query: {
      beginTime: '开始日期',
      endTime: '结束日期',
      chooseTime: '选择日期',
      countryId: '国家',
      status: '处理状态',
      phone: '用户手机号',
      studentNumber: '学号编号',
      query: '查询',
    },
    table: {
      id: '编号',
      phone: '用户手机号',
      createdAt: '提交时间',
      name: '姓名',
      school: '学校',
      studentNumber: '学号编号',
      img: '审核图片',
      period: '学生证有效期',
      status: '审核状态',
      remark: '审核备注',
      operate: '操作',
      detail: '详情',
      apply: '审核通过',
    },
    dialog: {
      title: '确认批量审核通过所选学生?',
      sendNoti: '发消息给用户',
      yes: '是',
      no: '否',
      ok: '确定',
      cancel: '取消',
    },
    js: {
      all: '所有',
      status0: '未处理',
      status1: '审核通过',
      status2: '审核未通过',

      confirm: '确认通过学生 {phone} 的审核?',
      confirmAll: '确认批量审核通过所选学生?',
      tip: '提示',
      ok: '确定',
      cancel: '取消',
    }
  },

  studentInfo: {
    box: {
      title: '学生证审核操作',
      title1: '验证信息',
      title2: '审核处理',
      title3: '操作历史',
    },
    table1: {
      phone: '用户手机号',
      name: '用户姓名',
      school: '用户学校',
      studentNumber: '学生证号',
      period: '学生证有效期',
      img: '审核图片',
    },
    table2: {
      status: '审核状态',
      do: '修改',
      undo: '取消修改',
      period: '学生证有效期',
      beginTime: '起始日期',
      endTime: '结束日期',
      reason: '未通过原因',
      reasonPlaceHolder: '请输入失败原因',
      operate: '操作',
      apply: '审核通过',
      upapply: '审核未通过',
      sendNoti: '发消息给用户',
      yes: '是',
      no: '否',
    },
    table3: {
      createdAt: '操作时间',
      name: '操作人',
      remark: '备注',
    },
    js: {
      notClear: '照片不清晰',
      notMatch: '信息不符合',
      expired: '学生证过期',
      invalid: '无效的学生证',
      incomplete: '信息不完整',
      notCard: '不是学生证',
      other: '其他',

      zh: '中文',
      en: '英文',
      tw: '繁体',
    }
  },

  monitor: {
    box: {
      title1: '车辆监控',
      title2: '单车列表 -- 总 {length} 条数据'
    },
    query: {
      bikeId: '单车ID',
      bikeIdPlaceHolder: '请输入单车编号',
      status: '单车状态',
      optStatus: '运营状态',
      radius: '搜索半径',
      address: '地址',
      addressPlaceholder: '请输入地址自动搜索并选择地址',
      clearAddress: '清除地址',
      showMap: '收起/打开地图',
      query: '查询',
    },
    table: {
      id: 'ID',
      status: '单车状态',
      optStatus: '运营状态',
      electricity: '电压',
      useTime: '上报电压时间',
      address: '当前位置',
      operate: '操作',
      detail: '查看详情',
      setCenter: '定位地图',
      goTrip: '查看行程记录',
      goReport: '查看未处理工单',
      reset: '重置单车位置',
    },
    dialog: {
      title0: '详情',
      title1: '单车信息',
      id: '单车编号',
      optStatus: '运营状态',
      status: '使用状态',
      electricity: '电量',
      address: '当前位置',

      title2: '单车用车记录',
      orderNo: '订单编号',
      userId: '用户编号',
      price: '用车费用',
      minutes: '骑行时间',
      distance: '骑行路程',
      startTime: '行程开始时间',
      endTime: '行程结束时间',
    },
    js: {
      all: '所有',
      status0: '未激活',
      status1: '可用',
      status2: '被预定',
      status3: '行驶中',
      status4: '解锁中',
      status5: '禁用中',

      optStatus0: '未激活',
      optStatus1: '正常',
      optStatus2: '发现故障',
      optStatus3: '故障中',
      optStatus4: '维修完成',

      radius1: '1公里内',
      radius3: '3公里内',
      radius5: '5公里内',
      radius10: '10公里内',

      id: '单车ID：',
      optStatus: '运营状态：',
      status: '使用状态：',
      electricity: '电压：',

      resetTitle: '确认重置单车{bikeId}的位置？重置后地图上将看不到该单车',
      tip: '提示',
      ok: '确认',
      cancel: '取消',
    }
  },

  trip: {
    query: {
      title: '行程记录',

      startTime: '起始日期',
      endTime: '结束日期',
      chooseTime: '选择日期',
      phone: '用户手机号',
      bikeId: '单车编号',
      status: '订单状态',
      lockType: '结束方式',
      countryId: '国家',
      cityId: '城市',

      query: '查询',
    },
    table: {
      id: '订单ID',
      phone: '用户手机号',
      bikeId: '单车编号',
      tradeNo: '锁交易号',
      minutes: '骑行时间(min)',
      distance: '骑行距离(m)',
      area: '单车所属国家',
      startTime: '起始时间',
      tempEndTime: '手动结束时间',
      endTime: '实际结束时间',
      price: '应付费用',
      actualPrice: '实付费用',
      reason: '减免原因',
      status: '订单状态',
      lockType: '结束方式',
      operate: '操作',
      stopTrip: '结束行程',
      payBack: '消费退款',
    },
    dialog: {
      title: '确认要结束行程吗？',
      title1: '是否确认消费退款？',
      time: '请确认行程时间(min)：',
      startTime: '开始时间',
      endTime: '结束时间',
      sendNoti: '发消息给用户',
      yes: '是',
      no: '否',
      cancel: '取 消',
      ok: '确 定',
      phone: '用户手机号',
      amount: '退款金额',
      remark: '备注',
      amountTips: '退款金额需大于0且小于等于 {actualPrice}',
    },
    js: {
      all: '所有',
      status1: '预定中',
      status2: '取消预订',
      status3: '骑行中',
      status4: '骑行结束',
      status5: '骑行结束',

      lockType1: '正常',
      lockType2: '历史',
      lockType3: '运营手动',
      lockType6: '用户手动',

      reason1: '免费日',
      reason2: '优惠券',
      reason3: 'VIP',
      reason4: 'SVIP',
      reason5: 'SVIP家庭成员',
      reason6: '企业号',
    }
  },

  tag: {
    query: {
      title: '投放标签管理',
      countryId: '国家',
      cityId: '城市',
      categoryId: '标签目录',
      type: '标签类别',
      modifyTime: '编辑时间',
      chooseTime: '选择时间范围',
      name: '投放标签',
      coordinate: '位置搜索',
      coordinatePlaceholder: '经纬度以英文逗号分隔',
      singleAdd: '单个添加',
      batchAdd: '批量导入',
      query: '查询',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      cityName: '城市',
      type: '标签类别',
      categoryName: '标签目录',
      name: '投放标签',
      coordinate: '经纬度',
      remark: '备注',
      updatedAt: '更新时间',
      updatedName: '操作人',
      operate: '操作',
      edit: '编辑',
      detail: '详情',
      goBike: '查看单车',
      deleteTag: '删除',
      uploadNote: '注意：每个城市对应一个表格',
      uploadText: '点击上传',
      uploadTip: '只能上传xls/xlsx文件，且不超过2M'
    },

    js: {
      all: '所有',
      type1: '投放标签',
      deleteMessage: '确认删除标签：{name}?',
      tip: '提示',
      ok: '确认',
      cancel: '取消',
      exceed: '一次只能上传一个文件，如需修改，请先删除先前上传的文件'
    }
  },

  addTag: {
    form: {
      title: '配置标签',
      goBack: '返回',
      countryId: '国家',
      cityId: '城市',
      type: '标签类别',
      categoryId: '标签目录',
      name: '标签名称',
      coordinate: '经纬度',
      coordinatePlaceholder: '经纬度以英文逗号分隔',
      remark: '备注',
      submit: '保存',
    },
  },

  category: {
    query: {
      title: '标签目录管理',
      countryId: '国家',
      cityId: '城市',
      type: '标签类别',
      modifyTime: '编辑时间',
      chooseTime: '选择时间范围',
      query: '查询',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      cityName: '城市',
      type: '标签类别',
      name: '标签目录',
      coordinate: '经纬度',
      remark: '备注',
      updatedAt: '更新时间',
      updatedName: '操作人',
      operate: '操作',
      edit: '编辑',
      deleteCategory: '删除',
    },
    form: {
      title: '标签目录管理',
      countryId: '国家',
      cityId: '城市',
      type: '标签类别',
      name: '标签目录',
      remark: '备注',
      cancel: '取消',
      submit: '保存',
    },
    js: {
      all: '所有',
      type1: '投放标签',
      deleteMessage: '确认删除标签目录：{name}?',
      deleteMessage1: '该目录下仍有 {len} 个标签，请先删除标签后，再删除目录',
      tip: '提示',
      ok: '确认',
      cancel: '取消',
    }
  },

  // 停车区域管理 zhu 2017/04/13
  bikearea: {
    query: {
      title: '停车区域管理',
      countryId: '国家',
      cityId: '城市',
      usingFlag: '状态',
      parking: '设置区域',
      query: '查询'
    },
    table: {
      id: 'ID',
      country: '国家',
      city: '城市',
      state: '状态',
      parking: '设置区域',
      areaNum: '停车点',
      file: '文件',
      download: '点击下载',
      remark: '备注',
      operate: '操作',
      edit: '编辑状态',
      view: '详情',
      import: '导入数据'
    },
    dialog: {
      title: '停车区域设置'
    },
    js: {
      status: '所有',
      status0: '禁用',
      status1: '启用',
      failure: '文件上传失败！',

      all: '所有',
      parking0: '禁车点',
      parking1: '停车点',

      uploadTip: '只能上传一个.xls/.xlsx文件',
      uploadMust: '请选择上传文件',
      uploadOnly: '只允许选取一个文件，如需替换，请先删除之前选中文件'
    },
    form: {
      countryId: '国家',
      cityId: '城市',
      usingFlag: '停车位',
      usingNotFlag: '禁停位',
      remark: '备注',
      remarkTip: '500字以内',
      remarkError: '已超过500字请修改后提交',
      importUsing: '停车位文件',
      importNotUsing: '禁停位文件',
      choose: '选择文件',
      upload: '立即上传',
      uploadTip: '文件类型',
      cancel: '取消',
      submit: '确定'
    },
    edit: {
      title: '修改区域状态',
      countryId: '国家',
      cityId: '城市',
      usingFlag: '状态',
      remark: '备注'
    },
    imports: {
      title: '导入数据',
      countryId: '国家',
      cityId: '城市',
      import: '导入文件',
      choose: '选择文件',
      remark: '备注',
      cancel: '取消',
      submit: '确定'
    }
  },

  bikeareainfo: {
    form: {
      title: '停车区域详情',
      basic: '基本信息',
      operator: '操作记录'
    },
    table: {
      country: '国家',
      city: '城市',
      state: '状态',
      areaNum: '停车位(个)',
      remark: '备注',
      operateTime: '操作时间',
      activity: '动作',
      operater: '操作人',
      operate: '操作'
    }
  },

  user: {
    query: {
      title: '用户信息',
      createdAt: '开始日期',
      endTime: '结束日期',
      chooseTime: '选择日期',
      phone: '用户手机号',
      memberId: '用户ID',
      countryId: '国家',
      query: '查询',
    },
    table: {
      memberId: '用户ID',
      createdAt: '用户注册时间',
      phone: '用户手机号',
      name: '国家',
      cyclingMinutes: '总骑行时间(min)',
      mileage: '总骑行路程(m)',
      cyclingCount: '总骑行次数',
      credit: '信用分',
      deposit: '押金',
      balance: '账户余额',
      status: '账户状态',
      sportsAchievement: '总消耗卡路里',
      carbonEmissions: '总减少碳排放',
      operate: '操作',
      trip: '查看用车记录',
      pay: '查看支付明细',
      trade: '查看交易明细',
      creditDetail: '查看信用明细',
      device: '查看设备信息',
      userCoupon: '查看用户优惠券',
      addUserCoupon: '赠送优惠券',
      goAddBalance: '调整余额',
      goPushMessage: '推送消息',
      sms: '发送短信',
      statusBtn1: '冻结',
      statusBtn0: '解冻',
      viewVipUsers: '查看用户会员',
      vipGift: '赠送会员',
      ocnNum: 'OCN余额',
      ocoinAccount: 'OCN钱包地址',
      showOcoinAccount: '查看OCN钱包地址'
    },
    js: {
      status0: '冻结',
      status1: '正常',
      statusString0: '解冻该用户?',
      statusString1: '冻结该用户?',
      tip: '提示',
      ok: '确定',
      cancel: '取消',
    },
    dialog: {
      gift: '赠送会员',
      countryId: '国家',
      phone: '手机号',
      vipLimit: '会员期限',
      day: '天',
      cardinfo: '会员卡信息',
      name: '会员卡名称：',
      days: '会员卡天数：',
      empty: '无',
      price: '会员卡价格：',
      limited: '会员卡限制：',
      limitedC: '前{freeTimes}次免费{freeMinutes}分钟',
      nolimited: '不限制次数，不限制时间',
      renew: '续费价：',
      promotion: '促销价：',

      isSendMessage: '发送消息给用户',
      yes: '是',
      no: '否',

      cancel: '取消',
      ok: '确定'
    }
  },

  device: {
    query: {
      title: '用户设备信息',
      phone: '手机号',
      countryId: '国家',
      firebaseToken: 'FireBase Token',
      deviceName: '设备名称',
      version: '系统版本',
      language: '系统语言',
      query: '查询',
    },
    table: {
      id: 'ID',
      phone: '手机号',
      country: '国家',
      firebaseToken: 'FireBase Token',
      deviceName: '设备名称',
      deviceId: '设备ID',
      appVersion: 'app版本',
      version: '系统版本',
      language: '系统语言',
    }
  },

  userCoupon: {
    query: {
      title: '用户优惠券',
      goAdd: '赠送优惠券',
      phone: '手机号',
      used: '优惠券状态',
      couponType: '优惠来源',
      query: '查询',
    },
    table: {
      id: 'ID',
      phone: '手机号',
      createdAt: '获得时间',
      couponType: '优惠来源',
      benefitMoney: '优惠券内容',
      days: '优惠券有效期',
      area: '限制区域',
      used: '优惠券状态',
      operate: '操作',
      detail: '查看详情',
      addUserCoupon: '赠送优惠券',
    },
    js: {
      all: '所有',
      used0: '未使用',
      used1: '已使用',
      used2: '已过期',

      couponType1: '邀请码',
      couponType2: '优惠码',
      couponType3: '邀请奖励',
      couponType4: '运营赠送',
      couponType5: '用户注册赠送优惠券',
      couponType7: '奖励系统优惠券',

      unRegister: '暂未注册',
    }
  },

  addUserCoupon: {
    form: {
      title: '赠送优惠券',
      memberCountryId: '国家',
      memberPhone: '用户手机号',
      quantity: '优惠券张数',
      couponId: '兑换优惠券',
      toAdd: '添加优惠券',
      detail: '优惠券详情',
      content: '普通优惠码',
      days: '有效期',
      area: '限制区域',
      sendNoti: '发消息给用户',
      yes: '是',
      no: '否',
      submit: '提交',
    },
    js: {
      type: '普通优惠码',
      status1: '激活',
      status2: '失效',
      day: '天',
      benefitType1: '折扣',
      benefitType2: '金额',
    }
  },

  userCouponInfo: {
    table: {
      title1: '基本信息',
      title2: '优惠券来源',
      title3: '使用情况',

      id: '优惠券ID',
      phone: '用户',
      createdAt: '获得时间',
      used: '优惠券状态',
      couponType: '优惠券类型',
      benefitMoney: '优惠内容',
      area: '限制地区',
      days: '有效期',
    },
    table1: {
      couponType: '优惠券来源',

      inviteCode: '邀请码',
      inviteMemberPhone: '邀请人',

      exchangeCode: '优惠兑换码',
      exchangeQuantity: '兑换张数',
      benefitMoney: '兑换的优惠券',
      exchangeDays: '有效期',

      fromMemberPhone: '被邀请人',
      ifFinishRide: '被邀请人是否完成骑行',
      ifFinishRideValue: '是',
      trip: '查看骑行记录',

      sendQuantity: '赠送张数',
      benefitMoney1: '赠送的优惠券内容',
    },
    table2: {
      orderNo: '订单编号',
      bikeId: '单车编号',
      minutes: '骑行时间',
      distance: '骑行距离',
      price: '应扣金额',
      actualPrice: '实扣金额',
      reason: '优惠原因',
      startTime: '起始时间',
      endTime: '结束时间',
    },
    js: {
      all: '所有',
      status1: '预定中',
      status2: '取消预订',
      status3: '骑行中',
      status4: '骑行结束',
      status5: '骑行结束',

      lockType1: '正常',
      lockType2: '历史',
      lockType3: '运营手动',
      lockType6: '用户手动',

      reason1: '免费活动',
      reason2: '优惠券',
      reason3: '会员卡',
    }
  },

  uservip: {
    query: {
      title: '用户会员信息',
      countryId: '国家',
      phone: '用户手机号',
      datetimerange: '起止日期',
      chooseTime: '选择时间范围',
      vipsource: '会员来源',
      viptype: '会员期限',
      status: '会员状态',
      autopay: '是否自动续费',
      query: '查询',
      giftvip: '赠送会员',
      automng: '自动续费管理',
      superVip: '会员类型'
    },
    table: {
      id: 'ID',
      phone: '手机号',
      countryId: '国家',
      viptype: '会员期限',
      vipsource: '会员来源',
      gettime: '获得时间',
      effectivetime: '生效日期',
      deadlinetime: '到期日期',
      status: '会员状态',
      autopay: '是否自动续费',
      operate: '操作',
      giftvip: '赠送会员',
      cancelvip: '取消会员',
      delayvip: '会员延期',
      day: '天'
    },
    dialog: {
      giftvip: '赠送会员',
      countryId: '国家',
      phone: '手机号',
      vipLimit: '会员期限',
      day: '天',
      cardinfo: '会员卡信息',
      name: '会员卡名称：',
      days: '会员卡天数：',
      empty: '无',
      price: '会员卡价格：',
      limited: '会员卡限制：',
      limitedC: '前{freeTimes}次免费{freeMinutes}分钟',
      nolimited: '不限制次数，不限制时间',
      renew: '续费价：',
      promotion: '促销价：',
      isSendMessage: '发送消息给用户',
      yes: '是',
      no: '否',
      cancel: '取消',
      ok: '确定',
      cancelvip: '取消会员',
      payway: '购买该会员的支付方式',
      cancelTip: '点击确定后用余额、押金支付的部分将自动退还，用其他支付方式支付的部分需手动退还。用OCN支付的会员卡不可取消。',
      delayvip: '会员延期'
    },
    js: {
      all: '所有',
      unknown: '未知',

      buyCard: '用户购买',
      giveCard: '赠送',
      delayCard: '延期会员',

      canceled: '已取消',
      valid: '已生效',
      invalid: '未生效',
      overdue: '已过期',

      no: '否',
      yes: '是',

      others: '(有延期)',

      nonSuperVip: '普通VIP',
      superVip: '超级VIP'
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
      beginTime: '开始日期',
      endTime: '结束日期',
      chooseTime: '选择日期',
      phone: '用户手机号',
      subject: '变动原因',
      query: '查询',
    },
    table: {
      id: '信用分ID',
      phone: '用户手机号',
      currentAmount: '变动前积分',
      amount: '变动积分',
      afterChangeAmount: '变动后积分',
      subjectName: '变动原因',
      createName: '处理人',
      createdAt: '处理时间',
      desc: '备注',
      operate: '操作',
      edit: '编辑',
      detail: '明细',
    }
  },

  addCredit: {
    form: {
      title: '添加信用分记录',
      phone: '用户手机号',
      credit: '当前信用积分',
      subject: '变动原因',
      creditChange: '积分变动',
      remark: '更新描述',
      remarkPlaceholder: '不超过100字',
      submit: '提交',
    },
    js: {
      subject1: '注册赠送',
      subject2: '正常骑行一次',
      subject3: '上报故障，经核实有效，一次',
      subject4: '举报违停，经核实有效',
      subject5: '邀请好友注册',
      subject6: '填写邀请码',
      subject7: '首次分享行程',
      subject8: '违停一次',
      subject9: '忘记关锁，车辆找回，一次',
      subject10: '交警阻拦，弃车逃走',
      subject11: '加装私锁',
      subject12: '忘记关锁，车辆丢失',
      subject13: '非法移车',
      subject14: '被举报违停',
      subject15: '分享奖励',
      subject16: '其他',
      subject17: '禁停区停车',
      subject18: '停车区停车',
      subject19: '停车点停车',
      subject20: '管制区停车',
      subject21: '图标活动奖励',
      message: '未查询到用户',
    }
  },

  trade: {
    query: {
      title: '交易明细管理',
      goAdd: '余额调整',
      beginTime: '开始日期',
      endTime: '结束日期',
      chooseTime: '选择日期',
      phone: '用户手机号',
      subject: '交易用途',
      statementNo: '交易流水号',
      tradeNo: '支付流水号',
      paid: '支付结果',
      countryId: '国家',
      query: '查询',
    },
    table: {
      id: '交易ID',
      payTime: '交易时间',
      statementNo: '交易流水号',
      tradeNo: '支付流水号',
      phone: '用户手机号',
      currentDeposit: '当前押金',
      currentBalance: '当前余额',
      amount: '交易金额',
      payFee: '手续费',
      subjectName: '交易用途',
      paid: '支付结果',
      isDirty: '状态',
      operate: '操作',
      detail: '详情',
    },
    dialog: {
      title1: '交易详情',
      title2: '基本信息',
      title3: '交易记录',
      title4: '详细记录',

      payTime: '交易时间',
      phone: '用户手机号',
      subjectName: '交易类型',
      amount: '交易金额',
      afterChangeBalance: '账户余额',

      payMethod: '支付方',
      statementNo: '交易流水号',
      tradeNo: '支付流水号',
      cardType: '卡类型',
      paid: '交易结果',

      orderNo: '订单号',
      bikeId: '单车编号',
      minutes: '骑行时间',
      distance: '骑行距离',
      price: '应付费用',
      actualPrice: '实付费用',
      reason: '减免原因',
      lockType: '结束方式',
      startTime: '起始时间',
      tempEndTime: '手动结束时间',
      endTime: '实际结束时间',
      startAddress: '起始位置',
      endAddress: '结束位置',
    },
    js: {
      all: '所有',
      paid1: '已支付',
      paid0: '未支付',

      subject1: '押金充值',
      subject2: '余额充值',
      subject3: '押金退款',
      subject4: '运营赠送',
      subject5: '骑行消费',
      subject6: '罚金',
      subject7: '会员卡',
      subject8: '消费退款',
      subject9: '扣除罚金',
      subject10: '充值返现',
      subject11: '充值退款',
      subject12: '其他',
      subject13: '余额退款',
      subject14: '押金退款手续费',
      subject15: '会员退款',
      subject16: '押金转余额',

      isDirty1: '已修正',
      isDirty2: '未修正',
      isDirty0: '正常',

      lockType1: '正常',
      lockType2: '历史',
      lockType3: '运营手动',
      lockType6: '用户手动',

      reason1: '免费活动',
      reason2: '优惠券',
      reason3: '会员卡',
    }
  },

  addBalance: {
    form: {
      title: '余额调整',
      countryId: '国家',
      phone: '用户手机号',
      amount: '变化金额',
      plus1: '增',
      plus2: '减',
      subject: '变动原因',
      orderNo: '关联流水号',
      remark: '备注',
      sendNoti: '发消息给用户',
      yes: '是',
      no: '否',
      submit: '提交',
      clear: '清除',
      moreThenZero: '请填入大于0的数字',
    },
    js: {
      plus1: '增',
      plus2: '减',
      subject4: '运营赠送',
      subject8: '消费退款',
      subject9: '扣除罚金',
      subject11: '充值退款',
      subject12: '其他',

      message: '修改成功！',
      tip: '提示',
      ok: '发短信通知用户',
      cancel: '完成',
    }
  },

  payment: {
    query: {
      title: '支付明细管理',
      beginTime: '起始日期',
      endTime: '结束日期',
      chooseTime: '选择日期',
      phone: '用户手机号',
      payMethod: '支付方式',
      statementNo: '交易流水号',
      tradeNo: '支付流水号',
      paid: '支付结果',
      payStatus: '支付状态',
      countryId: '国家',
      query: '查询',
    },
    table: {
      createdAt: '创建日期',
      payTime: '支付日期',
      phone: '用户手机号',
      statementNo: '交易流水号',
      payMethod: '支付方式',
      cardType: '卡类型',
      tradeNo: '支付流水号',
      currency: '支付币种',
      amount: '支付金额',
      payAccount: '支付账户',
      subjectName: '支付用途',
      paid: '支付结果',
      payStatus: '支付状态',
      isDirty: '状态',
      operate: '操作',
      detail: '详情',
    },
    dialog: {
      title1: '交易详情',
      title2: '基本信息',
      title3: '支付记录',
      title4: '详细记录',

      payTime: '支付日期',
      phone: '用户手机号',
      subjectName: '支付用途',
      amount: '支付金额',
      afterChangeBalance: '账户余额',

      payMethod: '支付方式',
      statementNo: '交易流水号',
      tradeNo: '支付流水号',
      cardType: '卡类型',
      paid: '交易结果',

      orderNo: '订单号',
      minutes: '骑行时间',
      distance: '骑行距离',
      startTime: '起始时间',
      endTime: 'endTime',
      startAddress: '起始位置',
      endAddress: '结束位置',
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
      payStatus3: '交易失败',
      payStatus4: '支付取消',
      payStatus5: '交易中',
      payStatus6: '退款挂起',
    }
  },

  // 单车国家配置 zhu 2017.05.03
  stateconfig: {
    query: {
      title: '单车国家配置',
      countryId: '国家',
      code: '编号查询',
      tip: '请输入3位编码',
      query: '查询',
      codeTip: '请输入3位有效编码',
      all: '所有'
    },
    table: {
      id: '编号',
      countryName: '国家',
      code: '单车编码',
      operate: '操作',
      edit: '编辑',
      view: '查看操作日志'
    },
    dialog: {
      title0: '添加单车国家配置',
      title1: '编辑单车国家配置'
    },
    form: {
      countryId: '请选择国家',
      code: '单车编号',
      tip: '请输入单车前3位编号',
      coderule: '单车编号规则',
      codeTip: '请输入3位有效编码',
      cancel: '取消',
      submit: '保存'
    }
  },

  stateinfo: {
    form: {
      title: '操作日志',
      basic: '基本信息',
      operator: '操作记录'
    },
    table: {
      countryName: '国家',
      code: '单车编号',
      operateTime: '操作时间',
      action: '日志'
    }
  },

  lock: {
    query: {
      title: '锁信息管理',
      goAdd: '添加锁信息',
      createdAt: '入库日期',
      chooseTime: '选择日期范围',
      type: '锁类型',
      manufacture: '锁厂商',
      status: '锁状态',
      lockNo: '锁编号',
      imei: '锁设备号',
      query: '查询',
    },
    table: {
      lockId: '锁ID',
      lockNo: '锁编号',
      imei: '锁设备号',
      type: '锁类型',
      manufacture: '锁厂商',
      status: '锁状态',
      electricity: '电量',
      id: '关联车辆编号',
      secretKey: 'secret_key',
      unlockKey: 'unlock_key',
      lockCreatedAt: '入库时间',
      simNo: 'sim卡号',
      operate: '操作',
      detail: '详情',
      edit: '编辑',
      delete: '删除',

      title: '锁详情',
    },
    js: {
      all: '所有',
      type1: '蓝牙一代',
      type2: '蓝牙二代',
      type3: '蓝牙三代',

      status1: '正常',
      status2: '维修中',
      status3: '报废',

      manufacture1: '泺平',
      manufacture2: '深国科',

      message: '确认删除锁 {lockNo} ?',
      tip: '提示',
      ok: '确定',
      cancel: '取消',
    }
  },

  addLock: {
    form: {
      title1: '单个添加锁信息',
      title2: '批量添加锁信息',

      type: '锁类型',
      lockNo: '锁编号',
      imei: '锁设备号',
      secretKey: 'secret_key',
      unlockKey: 'unlock_key',
      simNo: 'sim卡号',
      btId: '蓝牙设备ID',
      submit: '提交',

      import: '批量导入',
      tip: '数据量较大时，上传处理时间比较长，请耐心等待。',
    },
    js: {
      type1: '蓝牙一代',
      type2: '蓝牙二代',
      type3: '蓝牙三代',
      msg: '导入{success}条数据成功，{fail}条数据失败',
    }
  },

  bike: {
    query: {
      title: '单车基本信息',
      bikeId: '单车编号',
      countryId: '国家',
      cityId: '城市',
      lockNo: '锁编号',
      status: '单车使用状态',
      optStatus: '单车运营状态',
      activedTime: '激活时间',
      createdTime: '入库时间',
      chooseTime: '选择时间范围',
      tagId: '投放标签',
      helmet: '头盔',
      query: '查询',
    },
    table: {
      tip: '注：单车编号第4位表示单车尺寸，0-4表示26寸，5-9表示24寸， 例如065000001表示26寸单车， 065500001表示24寸单车',
      id: '单车编号',
      lockNo: '锁编号',
      status: '单车使用状态',
      optStatus: '单车运营状态',
      area: '单车所属国家',
      tagName: '投放标签',
      createdName: '入库负责人',
      jihuo: '激活负责人',
      createdAt: '入库时间',
      activitedTime: '激活时间',
      useTime: '最近使用时间',
      helmet: '头盔',
      operate: '操作',
      editHelmet: '编辑',
      unbind: '解绑',
      goTrip: '查看用车记录',
      detail: '详情',
      forbidden: '禁用',
      unForbidden: '解禁',
      activateBike: '激活',
      reset: '重置单车位置',
      unbindBike: '解绑',
      showEditCountry: '修改国家和城市',
      title: '单车详情',

      title1: '确认要禁用单车 {bikeId} 吗？',
      desc: '描述',
      cancel: '取消',
      ok: '确认',
    },
    dialog: {
      title2: '修改单车的国家城市信息',
      title3: '编辑头盔状态',
      helmet: '是否有头盔',
      bikeId: '单车编号',
      countryId: '国家',
      cityId: '城市',
      tagId: '标签',
      cancel: '取消',
      ok: '保存',
    },
    js: {
      all: '所有',
      none: '无',
      status0: '未激活',
      status1: '可用',
      status2: '被预定',
      status3: '行驶中',
      status4: '解锁中',
      status5: '禁用中',

      optStatus0: '未激活',
      optStatus1: '正常',
      optStatus2: '发现故障',
      optStatus3: '故障中',
      optStatus4: '维修完成',

      lockType1: '正常',
      lockType2: '历史',
      lockType3: '运营手动',
      lockType6: '用户手动',

      helmet0: '否',
      helmet1: '是',

      type1: '蓝牙一代',
      type2: '蓝牙二代',
      type3: '蓝牙三代',
      forbiddenReason: 'admin后台禁用',

      message: '确认要解禁单车 {bikeId} 吗？',
      tip: '提示',
      ok: '确认',
      cancel: '取消',

      resetTitle: '确认重置单车{bikeId}的位置？重置后地图上将看不到该单车',

      activateTitle: '确认激活单车 {bikeId} ？',
      activateSuccess: '激活成功',

      unbindTitle: '当前车辆状态为{status}，是否确定解绑？',
      unbindSuccess: '解绑成功',
    }
  },

  addBike: {
    query: {
      title: '添加单车信息',
      bikeId: '单车编号',
      bikeIdPlaceHolder: '请输入9位单车编号',
      lockNo: '锁编号',
      lockNoPlaceholder: '请输入锁编号',
      imei: '锁设备号',
      mac: 'MAC地址',
      query: '提交',
    }
  },

  // 邀请好友赠送管理 zhu 2017.04.25
  invite: {
    query: {
      title: '邀请好友赠送管理'
    },
    table: {
      id: 'ID',
      countryName: '国家',
      num: '赠送券的数量',
      benefitMoney: '赠送券的额度',
      days: '券的有效期',
      limitArea: '限制区域',
      operate: '操作',
      view: '查看操作日志',
      edit: '编辑',
      createdAt: '时间',
      adminName: '操作人(角色)',
      remark: '修改内容'
    },
    form: {
      title: '新增邀请被邀请优惠券',
      title0: '修改邀请被邀请优惠券',
      title1: '修改日志',
      countryId: '国家',
      num: '数量',
      benefitMoney: '额度',
      days: '有效期',
      day: '天',
      limitArea: '限制区域',
      submit: '保存',
      cancel: '取消'
    },
    js: {
      nolimit: '不限',
      limitArea: '－所有城市'
    }
  },

  // 广告位 zhu 2017.09.01
  adarea: {
    query: {
      title: '广告位管理',
      add: '添加',
      addad1: '配置首页弹窗',
      addad2: '配置首页轮播',
      addad3: '配置顶部横幅',
      addad4: '配置图标',
      addad5: '配置一键购买会员',
      type: '广告位',
      name: '活动名称',
      countryId: '投放国家',
      activityDate: '活动日期',
      chooseTime: '选择日期',
      status: '状态',
      query: '查询'
    },
    table: {
      id: 'ID',
      type: '广告位',
      name: '活动名称',
      countryId: '投放国家',
      date: '活动起止日期',
      repeat: '是否重复显示',
      status: '状态',
      languages: '语言',
      title: '标题',
      content: '内容',
      pic: '图片/图标',
      link: '跳转',
      linkAddr1: '链接地址：',
      linkAddr2: '应用内页面：',
      AndroidAddr: '安卓链接：',
      iOSAddr: 'iOS链接：',
      operate: '操作',
      edit: '编辑',
      detail: '详情'
    },
    js: {
      all: '所有',

      type1: '首页弹窗',
      type2: '首页轮播',
      type3: '顶部横幅',
      type4: '图标',
      type5: '一键购买会员',

      name1: '免费骑行',
      name2: '会员卡',
      name3: '充值返现',
      name4: '押金折扣',
      name5: '其它活动',
      name6: '广告位',

      status1: '进行中',
      status2: '未开始',
      status3: '已过期',

      repeat0: '是',
      repeat1: '否',

      jumpType1: 'H5页面',
      jumpType2: '应用内页面',
      jumpType3: '应用商店'
    },
    dialog: {
      longitude: '经度：',
      latitude: '纬度：'
    }
  },

  adinfo: {
    query: {
      title1: '广告详情 － 首页弹窗',
      title2: '广告详情 － 首页轮播',
      title3: '广告详情 － 顶部横幅',
      title4: '广告详情 － 图标',

      basic: '基本信息',
      type1: '首页弹窗',
      type2: '首页轮播',
      type3: '顶部横幅',
      type4: '图标',
      type5: '一键购买会员',
      name1: '免费骑行',
      name2: '会员卡',
      name3: '充值返现',
      name4: '押金折扣',
      name5: '其它活动',
      name6: '广告位',

      template1: '模板一',
      template2: '模板二',

      operator: '操作日志'
    },
    table: {
      type: '广告位类型',
      countryId: '国家',
      name: '活动名称',
      date: '活动起止时间',
      status: '广告位状态',
      repeatTime: '是否重复显示',
      template: '模板',
      icon: '图标',
      iconpos: '图标位置',
      longlat: '经度：{lat}, 纬度：{long}',
      iconpop: '点击图标是否弹窗',
      yes: '是',
      no: '否',
      pic: '图片',
      language: '语言',
      title: '标题',
      content: '内容',
      link: '跳转类型',
      url: '跳转链接',
      linkAddr: '',
      AndroidAddr: 'Android: ',
      iOSAddr: 'iOS: ',

      mTitle: '这是title',
      mContent: '这是content',

      operateTime: '操作时间',
      activity: '动作',
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
      title1: '配置首页弹窗',
      title2: '配置首页轮播',
      title3: '配置顶部横幅',
      title4: '配置图标',
      title5: '配置一键购买会员',

      type1: '首页弹窗',
      type2: '首页轮播',
      type3: '顶部横幅',
      type4: '图标',
      type5: '一键购买会员',
    },
    form: {
      type: '广告位类型',
      name: '活动名称',
      countryId: '投放国家',
      startDateTime: '开始时间',
      startPlaceholder: '选择开始时间',
      endDateTime: '结束时间',
      endPlaceholder: '选择结束时间',
      status: '广告位状态',
      icon: '图标',
      iconpos: '图标位置',
      latLabel: '纬度: ',
      latiPlaceholder: '纬度(-90.000000 ~ 90.000000)',
      isNotLat: '纬度(-90.000000 ~ 90.000000)',
      longLabel: '经度: ',
      longPlaceholder: '经度(-180.000000 ~ 180.000000)',
      isNotLong: '经度(-180.000000 ~ 180.000000)',
      iconPop: '点击图标是否弹窗',
      repeatTimes: '是否重复展示',
      repeatHours: '重复周期',
      repeatUnit: '小时',
      yes: '是',
      no: '否',
      subType: '模板类型',
      upload: '广告图片',
      uploadTip: '点击上传图片, 大小：',
      uploadTipHeightAndWidth: {
        type1_1: '538X589',
        type1_2: '538X773',
        type2_1: '660X200',
        type3_1: '692X156',
        type4_1: '538X589',
        icon: '80X80',
      },
      languages: '语言配置',
      title: '标题',
      titlePlaceholder: '字数请控制在30以内',
      content: '内容',
      contentPlaceholder: '字数请控制在80以内',
      mTitle: '这是title',
      mContent: '这是content',
      jumpType: '跳转类型',
      link: '跳转链接',
      linkPlaceholder: '必须为https://协议头',
      androidPlaceholder: '安卓链接',
      iosPlaceholder: 'iOS链接'
    },
    js: {
      name1: '免费骑行',
      name2: '会员卡',
      name3: '充值返现',
      name4: '押金折扣',
      name5: '其它活动',
      name6: '广告位',

      subType1: '模板一',
      subType2: '模板二',

      empty: '无',
      jumpType1: 'H5页面',
      jumpType2: '应用内页面',
      jumpType3: '应用商店',

      status1: '进行中',
      status2: '未开始',
      status3: '已过期',

      linkTip: '安卓或iOS必须填写至少一个',

      myInfo: '我的信息页面',
      editStudentCertification: '学生认证信息填写页面',
      successfulCertification: '学生认证成功页面',
      failedCertification: '学生认证失败页面',
      rechargeMember: 'VIP 会员充值页面',
      memberInfo: 'VIP 会员信息展示页面',
      myWallet: '我的钱包页面',
      couponList: '优惠券页面',
      creditPoints: '我的信用分页',
      invitationReward: '邀请奖励页面',
      negativeRecord: '负面记录页面',
      transactionDetails: '交易详情页面',
      gainCredibility: '信用积分',
      myTrip: '我的行程',

    }
  },

  // 支付方式设置 zhu 2017.06.16
  payway: {
    query: {
      title: '支付方式设置'
    },
    table: {
      id: 'ID',
      country: '国家',
      deposit: '押金支付方式',
      balance: '余额支付方式',
      delivery: '闪送支付方式',
      operate: '操作',
      add: '添加',
      edit: '编辑',
      view: '详情'
    },
    js: {
      deposit: '押金',
      depositFirst: '押金优先',
      balance: '充值',
      balanceFirst: '充值优先'
    }
  },
  payadd: {
    form: {
      title0: '添加支付方式设置',
      title1: '修改支付方式设置',
      countryId: '国家',
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
      title: '支付方式设置详情',
      basic: '基本信息',
      log: '操作记录'
    },
    table: {
      countryId: '国家',
      payway: '支付方式',
      operateTime: '操作时间',
      operater: '操作人',
      operator: '操作'
    }
  },

  message: {
    query: {
      title: '通知管理',
      createdTime: '创建日期',
      createdTimePlaceholder: '选择时间范围',
      beginDay: '开始时间',
      chooseTime: '选择日期',
      countryId: '覆盖区域',
      type: '消息类型',
      query: '查询',
    },
    table: {
      id: '消息ID',
      type: '消息类型',
      title: '消息标题',
      img: '消息图片',
      content: '内容描述',
      status: '状态',
      coverageArea: '投放区域',
      beginTime: '起始时间',
      endTime: '结束时间',
      updatedAt: '更新时间',
      repetition: '是否重复显示',
      operate: '操作',
      view: '预览',
      edit: '编辑',
    },
    dialog: {
      title1: '用户通知预览',
      title2: '消息图片',
      mTitle: '这里是标题',
      mContent: '这里是内容',
    },
    js: {
      all: '所有',
      msg1: '首页消息',
      msg2: 'Message消息',
      msg3: '通知栏消息',

      status1: '启用',
      status0: '禁用',
      repetition1: '是',
      repetition0: '否',
    }
  },

  addMessage: {
    form: {
      title0: '添加用户通知',
      title1: '编辑用户通知',
      type: '消息类型',
      title: '消息标题',
      titlePlaceholder: '请输入标题',
      content: '内容描述',
      contentPlaceholder: '不超过100字',
      img: '消息图片',
      upload: '点击上传',
      uploadTip: '只能上传jpg/png文件，且不超过500kb',
      coverageArea: '覆盖区域',
      targetUser: '目标用户',
      repetition: '是否重复显示',
      status: '状态',
      startDateTime: '开始时间',
      startPlaceholder: '选择开始时间',
      endDateTime: '结束时间',
      endPlaceholder: '选择结束时间',
      submit: '提交',
      cancel: '取消',
      mTitle: '这里是标题',
      mContent: '这里是内容',
    },
    js: {
      all: '所有',
      msg1: '首页消息',
      msg2: 'Message消息',
      msg3: '通知栏消息',
      status1: '启用',
      status0: '禁用',
      repetition1: '是',
      repetition0: '否',
    }
  },

  version: {
    query: {
      title: 'APP更新管理',
      force: '更新类型',
      name: 'APP类型',
      query: '查询',
      version: '版本号',
      status: '开启状态'
    },
    table: {
      id: 'ID',
      version: '版本号',
      force: '更新类型',
      status: '状态',
      name: 'APP类型',
      language: '语言',
      title: '标题',
      address: '下载地址',
      describe: '升级描述',
      remark: '更新描述',
      createdAt: '创建时间',
      updatedAt: '更新时间',
      operate: '操作',
      edit: '编辑',
      view: '查看详情',
      delete: '删除',
    },
    js: {
      all: '所有',
      app1: 'Android',
      app2: 'iOS',

      upg1: '强制升级',
      upg0: '推荐升级',

      status0: '暂停',
      status1: '开启',

      message: '确认删除该条数据?',
      tip: '提示',
      ok: '确定',
      cancel: '取消',
    }
  },

  addVersion: {
    form: {
      title0: '添加APP版本',
      title1: '编辑APP版本',
      vsetting: '版本配置',
      otherlang: '其他语言',
      addLang: '添加语言模版',
      force: '更新类型',
      name: 'APP类型',
      version: '版本',
      open: '开启状态',
      title: '弹窗Title',
      titlePlaceholder: '默认英文模版标题',
      describe: '弹窗Describe',
      contentPlaceholder: '默认英文模版内容',
      address: '新版本下载地址',
      remark: '更新描述',
      remarkPlaceholder: '不超过100字',
      submit: '提交',
    },
    js: {
      app1: 'Android',
      app2: 'iOS',

      upg1: '强制升级',
      upg0: '推荐升级',
    }
  },

  versioninfo: {
    table: {
      title0: 'APP更新详情',
      basic: '基本信息',
      langsetting: '其他语言配置',
      operator: '操作日志',
      id: 'ID',
      isOpen: '开启状态',
      force: '更新类型',
      title: '弹窗标题(默认)',
      describe: '弹窗内容(默认)',
      address: '下载url(默认)',
      name: 'APP版本',
      version: 'APP版本号',
      remark: '备注',
      operateTime: '操作时间',
      activity: '动作',
      operater: '操作人',
      operate: '操作记录'
    },
    js: {
      all: '所有',
      status0: '开启',
      status1: '暂停',

      upg1: '强制更新',
      upg0: '推荐更新',
    }
  },

  // 单车logo管理 zhu 2017.04.17
  bikelogo: {
    query: {
      title: '单车logo管理',
      date: '起始日期',
      chooseTime: '选择时间',
      type: '状态',
      countryId: '国家',
      cityId: '城市',
      query: '查询'
    },
    table: {
      id: 'ID',
      operateTime: '操作时间',
      type: '状态',
      countryName: '国家',
      cityName: '城市',
      startTime: '起始时间',
      endTime: '结束时间',
      iconUrl: '图标样式',
      remark: '备注',
      operate: '操作',
      view: '详情',
      edit: '编辑',
      delete: '删除'
    },
    form: {
      title: '新增单车logo',
      title0: '编辑单车logo',
      basic: '基本信息',
      setting: 'logo配置',
      countryId: '国家',
      cityId: '城市',
      type: '状态',
      daterange: '起止时间',
      chooseTime: '点击选择起止时间',
      upload: '上传图标',
      choose: '选择文件',
      uploadTip: '尺寸：80*106，必填，显示在客户端地图上的单车图片',
      remark: '备注',
      remarkTip: '在此填写备注信息',
      submit: '保存',
      cancel: '取消'
    },
    js: {
      all: '所有',
      type_1: '未开始',
      type0: '暂停',
      type1: '进行中',
      type2: '已过期',
      tip: '提示',
      message: '确定删除该条数据？',
      ok: '确定',
      cancel: '取消'
    }
  },

  bikelogoinfo: {
    form: {
      title: '单车logo配置详情',
      basic: '基本信息',
      operator: '操作记录'
    },
    table: {
      operateTime: '操作时间',
      activity: '动作',
      operater: '操作人',
      operate: '操作'
    }
  },

  price: {
    query: {
      title: '车费价格管理',
      createdAt: '创建日期',
      chooseTime: '选择日期',
      countryId: '国家',
      bikeCode: '单车编号',
      bikeCodePlaceholder: '请输入单车前3位编号',
      goAdd: '添加',
      query: '查询',
      updateUnitTimesConfig: '最长计费时间设置',
    },
    table: {
      id: 'ID',
      country: '国家',
      city: '城市',
      area: '地区',
      bikeCode: '单车的城市编号',
      levelOne: '价格(信用分100~)',
      levelTwo: '价格(信用分80~99)',
      levelThree: '价格(信用分60~79)',
      levelFour: '价格(信用分0~59)',
      free: '用车优惠',
      others: '无效订单配置',
      operate: '操作',
      edit: '编辑',
      detail: '详情'
    },
    js: {
      free: '每天前 {freeTimesPerDay} 次免费骑行 {freeMinutes} 分钟',
      freemin: '{freemin}mins内订单无效'
    },
    dialog: {
      title: '最长计费时间设置',
      maxTime: '最长计费时间',
      timeUnit: '分钟',
      tips: '（最长计费时间是指一条行程最长的计费时间，超过这个时间的行程只按最长计费时间来收费，设置后对所有国家生效。）',
    }
  },

  addPrice: {
    form: {
      title: '配置车费价格',
      countryId: '国家',
      cityId: '城市',
      currency: '币种',
      currencySymbol: '货币符号',
      bikeCode: '单车的城市编号',
      unitPrice: '默认价格（信用分>99时）',
      stepPrice: '分阶梯价格',
      freeTimesPerDay: '每天免费次数',
      freeMinutes: '免费分钟数',
      minute: '分钟',
      times: '次',
      credit: '信用分',
      price: '价格',
      submit: '保存',
      others: '其他规则',
      othersNote: '分钟内的订单不计费',
      zeroBalanceRide: '允许余额为0的用户骑行'
    }
  },

  priceInfo: {
    table: {
      title: '车费价格详情',
      title1: '基本信息',
      title2: '操作记录',
      title3: '阶梯价格',

      country: '国家',
      city: '城市',
      currency: '货币单位',
      currencySymbol: '货币符号',
      bikeCode: '单车的城市编号',
      defaultPrice: '默认价格',
      free: '用车优惠',

      credit: '信用分',
      price: '价格',

      createdAt: '操作时间',
      type: '动作',
      adminName: '操作人',
      remark: '备注',
    },
    js: {
      type1: '创建',
      type2: '更新',
    }
  },

  recharge: {
    query: {
      title: '押金与充值管理',
      name: '国家',
      code: '国家编号',
      open: '是否已开城',
      query: '查询',
    },
    table: {
      id: 'ID',
      name: '国家',
      code: '国家编号',
      open: '是否已开城',
      currency: '货币单位',
      currencySymbol: '币种符号',
      deposit: '默认押金',
      studentDeposit: '学生押金',
      bonus: '首次充押金赠送金额',
      withOutDepositNum: '免押金骑行次数',
      negativeBalanceRefund: '余额为负可退押金',
      topUpStandard: '充值金额',
      operate: '操作',
      edit: '编辑',
      detail: '详情',
    },
    js: {
      all: '所有',
      open1: '是',
      open0: '否',
      none: '无',
    }
  },

  editRecharge: {
    form: {
      title: '配置押金与充值',
      title1: '国家信息',
      title2: '押金配置',
      title3: '充值配置-必填',
      title4: '充值配置-选填',

      name: '国家名称',
      code: '国家编号',
      currency: '币种',
      currencySymbol: '货币符号',
      open: '是否开城',

      needDepositPlaceholder: '需大于0',
      dPlaceholder: '需大于等于0',
      xPlaceholder: '选填',

      deposit: '默认押金',
      depositToBalance: '押金转余额',
      studentDeposit: '学生卡押金',
      bonus: '首次充押金赠送金额',

      noDeposit: '免押金骑行',
      noDepositPlaceholder: '免押金骑行体验次数',
      times: '次',
      negativeBalanceRefund: '余额为负可退押金',

      money0: '金额①',
      money1: '金额②',
      money2: '金额③',
      money3: '金额④',
      money4: '金额⑤',
      money5: '金额⑥',
      money6: '金额⑦',
      money7: '金额⑧',

      moneyIsRepeated: '有相同金额',
      submit: '保存',
    },
    js: {
      open1: '是',
      open0: '否',
    }
  },

  rechargeInfo: {
    table: {
      title: '城市详情',
      title1: '基本信息',
      title2: '操作记录',

      country: '国家',
      code: '国家编号',
      open: '是否已开城',
      deposit: '默认押金',
      studentDeposit: '学生证押金',
      bonus: '首次充押金赠送金额',
      topUpStandard: '充值金额',

      createdAt: '操作时间',
      name: '操作人',
      changeDes: '备注',
    },
    js: {
      type1: '创建',
      type2: '更新',
    }
  },

  activity: {
    query: {
      title: '充值返现',
      goAdd: '添加',

      time: '活动日期',
      chooseTime: '选择日期',
      countryId: '国家',
      status: '活动状态',
      query: '查询',
    },
    table: {
      id: 'ID',
      updateAt: '操作时间',
      activityType: '活动类型',
      content: '活动内容',
      status: '活动状态',
      startTime: '活动起始日期',
      endTime: '活动结束日期',
      area: '国家',
      title: '标题',
      bannerUrl: 'Banner',
      operate: '操作',
      edit: '编辑',
      detail: '详情',
      goUser: '查看参与用户',
    },
    js: {
      all: '所有',
      status0: '即将开始',
      status1: '进行中',
      status2: '已过期',
      activityType: '充值返现',
    }
  },

  addActivity: {
    form: {
      title0: '配置返现',
      countryId: '国家',
      cityId: '城市',
      daterange: '活动起止日期',
      daterangePlaceholder: '选择起止时间',
      type: '活动类型',
      typeName: '充值返现',
      backMoneys: '返现额度',
      charge: '充',
      give: '送',
      title: '标题',
      titlePlaceholder: '不超过25字',
      content: '内容',
      contentPlaceholder: '不超过100字',
      bannerUrl: '上传图片',
      upload: '点击上传',
      h5Url: '跳转H5',
      submit: '提交',

      mTitle: '这里是标题',
      mContent: '这里是内容',
    }
  },

  activityInfo: {
    table: {
      title0: '充值返现详情',
      title1: '基本信息',
      title2: '操作记录',

      type: '活动类型',
      typeName: '充值返现',
      country: '国家',
      city: '城市',
      startTime: '活动起始日期',
      endTime: '活动结束日期',

      bannerUrl: '图片',
      title: '标题',
      content: '内容',
      h5Url: '跳转H5',

      mTitle: '这里是标题',
      mContent: '这里是内容',

      createdAt: '操作时间',
      typeString: '动作',
      adminName: '操作人',
      remark: '备注',
    },
    js: {
      type1: '创建',
      type2: '更新',
    }
  },

  // 押金折扣 zhu 2017.04.27
  deposit: {
    query: {
      title: '押金折扣',
      validDate: '活动日期',
      chooseTime: '选择时间',
      countryId: '国家',
      cityId: '城市',
      id: '活动id',
      status: '活动状态',
      query: '查询'
    },
    table: {
      id: 'ID',
      activityType: '活动类型',
      countryId: '国家',
      status: '活动状态',
      countryDeposit: '原押金',
      deposit: '折扣后押金',
      countryStudentDeposit: '原学生押金',
      studentDeposit: '折扣后学生押金',
      startTime: '活动起始日期',
      endTime: '活动结束日期',
      operate: '操作',
      edit: '编辑',
      detail: '查看详情',
      goUser: '查看参与用户'
    },
    form: {
      adddeposit: '配置押金折扣',
      editdeposit: '修改押金折扣',
      basic: '基本信息',
      countryId: '国家',
      daterange: '活动起止时间',
      chooseTime: '选择时间',
      status: '活动状态',
      setting: '活动配置',
      activityType: '优惠类型',
      depositType: '押金折扣',
      deposit: '折后押金',
      countryDeposit: '原押金',
      countryStudentDeposit: '原学生押金',
      studentDeposit: '折后学生押金',
      remark: '备注',
      remarkTip: '在此填写备注信息',
      APPShow: 'APP提示配置',
      showHomePage: '显示在APP首页',
      yes: '是',
      no: '否',
      bannerUrl: '上传图片',
      upload: '点击上传图片',
      title: '标题',
      titlePlaceholder: '不超过25个字',
      content: '内容',
      contentPlaceholder: '不超过100字',
      h5Url: '跳转h5',
      submit: '保存',
      cancel: '取消'
    },
    js: {
      all: '所有',
      status0: '即将开始',
      status1: '进行中',
      status2: '已过期',
      activityType1: '充值返现',
      activityType2: '会员卡',
      activityType3: '免费骑行',
      activityType4: '押金折扣',
    }
  },

  depositinfo: {
    form: {
      title: '押金折扣详情',
      basic: '基本信息',
      operator: '操作记录'
    },
    table: {
      operateTime: '操作时间',
      activity: '动作',
      operater: '操作人',
      operate: '备注'
    }
  },

  depositusers: {
    query: {
      title: '参与用户'
    },
    table: {
      id: '活动ID',
      activityType: '活动类型',
      userMobile: '用户手机号码',
      countryDeposit: '原押金',
      deposit: '折后押金',
      startTime: '参与时间',
      operate: '操作',
      detail: '查看活动详情'
    }
  },

  noDeposit: {
    query: {
      title: '免押金骑行'
    },
    table: {},
    js: {
      activityType9: '免押金骑行',
    },
    dialog: {
      title: '配置免押金骑行',
      countryId: '国家',
    }
  },

  coupon: {
    query: {
      title: '优惠券',
      goAdd: '添加',
      benefitType: '折扣类型',
      couponType: '优惠券类型',
      endType: '有效期限制',
      countryId: '适用国家',
      cityId: '适用城市',
      query: '查询',
    },
    table: {
      id: 'ID',
      name: '优惠券名称',
      benefitType: '折扣类型',
      benefitMoney: '优惠额度',
      couponType: '优惠券类型',
      endType: '有效期限制',
      days: '有效期',
      area: '适用区域',
      updateAt: '操作时间',
      adminName: '操作人',
      operate: '操作',
      edit: '编辑',
      detail: '详情',
    },
    js: {
      all: '所有',
      benefitType1: '折扣',
      benefitType2: '金额',
      couponType1: '邀请码优惠券',
      couponType2: '普通优惠券',
      couponType3: '邀请别人后奖励',
      couponType4: '运营赠送优惠券',
      couponType7: '奖励系统优惠券',
      endType0: '无限制',
      endType1: '指定天数',
      endType2: '指定时间段',
      day: '天',
    }
  },

  addCoupon: {
    form: {
      title: '配置优惠券',
      name: '优惠券名称',
      countryId: '适用区域',
      benefitType: '折扣类型',
      benefitMoney: '优惠内容',
      couponType: '优惠券类型',
      benefitPercent: '优惠内容',
      randomPromotion1: '优惠券折扣',
      randomPromotion2: '优惠券金额',
      endType: '优惠券有效期',
      days: '限制天数',
      day: '天',
      daterange: '限制日期',
      daterangePlaceholder: '选择日期范围',
      query: '提交',
    },
    js: {
      benefitType1: '折扣',
      benefitType2: '金额',
      couponType1: '邀请码优惠券',
      couponType2: '普通优惠券',
      couponType3: '邀请别人后奖励',
      couponType4: '运营赠送优惠券',
      couponType7: '奖励系统优惠券',
      endType0: '无限制',
      endType1: '指定天数',
      endType2: '指定日期',
      randomPromotion0: '定额',
      randomPromotion1: '随机'
    }
  },

  couponInfo: {
    table: {
      title: '优惠券详情',
      title1: '基本信息',
      title2: '优惠券限制条件',
      title3: '操作记录',

      benefitType: '优惠券类型',
      benefitMoney: '优惠券内容',

      endType: '有效期限制',
      days: '有效期',
      area: '限制区域',

      createdAt: '操作时间',
      type: '动作',
      adminName: '操作人',
      remark: '备注',
    },
    js: {
      type1: '创建',
      type2: '更新',
    }
  },

  registerCoupon: {
    query: {
      title: '注册券',
      goAdd: '添加',
      countryId: '国家',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      num: '数量',
      benefitMoney: '额度',
      days: '有效期',
      updateAt: '操作时间',
      adminName: '操作人',
      edit: '编辑',
    },
    dialog: {
      title: '免押金骑行的注册券',
      countryId: '国家',
      num: '数量',
      benefitMoney: '额度',
      days: '有效期',
      day: '天',
      mustint: '输入必须为大于0的整数',
      mustint0: '请输入大于等于0的整数',
    },
  },

  code: {
    query: {
      title: '优惠码',
      goAdd: '添加',
      status: '优惠码状态',
      createdAt: '创建日期',
      chooseTime: '选择日期',
      code: '优惠码',
      tag: '标签',
      query: '查询',
    },
    table: {
      id: 'ID',
      type: '优惠码类型',
      code: '优惠码',
      tag: '标签',
      useTimesPerOne: '同一用户兑换次数',
      usedTimes: '已兑换次数',
      useTime: '限制次数',
      status: '状态',
      startTime: '有效期（起始）',
      endTime: '有效期（结束）',
      activityType: '兑换类型',
      content: '兑换内容',
      limitTime: '有效期',
      createdAt: '更新时间',
      adminName: '操作人',
      operate: '操作',
      edit: '编辑',
      detail: '详情',
      record: '使用记录',
      exportExcel: '导出',
    },
    js: {
      all: '所有',
      type1: '普通优惠码',
      status1: '进行中',
      status2: '过期',
      status3: '未开始',
      type: '普通优惠码',
      activityType2: '会员卡',
      activityType5: '优惠券',
      benefitType1: '折扣',
      benefitType2: '金额',
      day: '天',
      num: '张',
      coupon: '券',
    }
  },

  addCode: {
    form: {
      title: '配置优惠码',
      type: '优惠码类型',
      code: '优惠码',
      random: '随机生成',
      tag: '优惠码标签',
      useTimesPerOne: '同一用户兑换次数',
      daterange: '优惠码起始日期',
      chooseTime: '选择日期范围',
      status: '优惠码状态',
      quantity: '兑换张数',
      activityType: '兑换类型',
      selectCard: '选择会员卡',
      selectCardHelper1: '选择会员卡国家',
      selectCardHelper2: '选择会员卡',
      selectCardHelper3: '当前国家未配置会员卡',
      couponId: '兑换优惠券',
      toAdd: '添加优惠券',
      detail: '优惠券详情',
      content: '普通优惠券',
      days: '有效期',
      area: '限制区域',
      submit: '提交',
      basic: '基本信息',
      setting: '兑换码配置',
      codePlaceholder: '批量生产多个，请用换行隔开',
      limitTime: '限制使用次数',
      limitPlaceholder: '不填表示无次数限制',
      useTimesWarning: '限制使用次数不能小于同一用户兑换次数',
      openGenerate: '自定义生成',
    },
    dialog: {
      title: '自定义生成优惠码',
      nameRule: '命名规则',
      code: '优惠码的',
      to: '到',
      bit: '位 为',
      ruleType1: '随机字母',
      ruleType2: '随机数字',
      ruleType3: '自定义',
      addRule: '添加',
      generateNum: '生成数量',
      generateCode: '生成',
      hasRepeat: '有重复字符串，请重新生成',
      generateNumIsTooLarge: '优惠码生成数量不能超过1000',
      codeIsTooLarge: '优惠码位数不能超过20',
      cancel: '取消',
      ok: '确定',
    },
    js: {
      type: '普通优惠码',
      exchangeTypeOption2: '会员卡',
      exchangeTypeOption5: '优惠券',
      status1: '进行中',
      status2: '过期',
      status3: '未开始',
      day: '天',
      benefitType1: '折扣',
      benefitType2: '金额',
    }
  },

  codeRecord: {
    query: {
      title: '优惠码兑换记录',
      phone: '用户手机',
      countryId: '国家',
      cityId: '城市',
      exchangeCode: '优惠码',
      exchangedDate: '兑换日期',
      chooseTime: '选择时间范围',
      query: '查询',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      cityName: '城市',
      phone: '用户手机号',
      exchangedDate: '兑换日期',
      exchangeCode: '兑换的优惠码',
      exchangedCouponRecord: '兑换内容',

      operate: '操作',
    }
  },

  codeInfo: {
    table: {
      title: '优惠码详情',
      title1: '基本信息',
      title2: '优惠券信息',
      title3: '操作记录',

      codeType: '兑换码类型',
      typeName: '普通兑换码',
      code: '优惠码内容',
      startTime: '优惠码有效期（起始日期）',
      endTime: '优惠码有效期（结束日期）',
      area: '限制区域',

      quantity: '兑换张数',
      benefitType: '优惠券类型',
      content: '优惠券内容',
      couponArea: '限制区域',
      days: '使用有效期',

      createdAt: '操作时间',
      type: '动作',
      adminName: '操作人',
      remark: '备注',
    },
    js: {
      type1: '创建',
      type2: '更新',
    }
  },

  free: {
    query: {
      title: '免费骑行',
      goAdd: '添加',
      time: '活动日期',
      chooseStartTime: '选择开始日期',
      chooseEndTime: '选择结束日期',
      countryId: '国家',
      status: '活动状态',
      query: '查询',
      activityDetailType: '活动类型'
    },
    table: {
      id: 'ID',
      updateAt: '操作日期',
      activityType: '活动类型',
      title: '标题',
      content: '活动内容',
      status: '活动状态',
      country: '国家',
      city: '城市',
      startTime: '活动起始日期',
      endTime: '活动结束日期',
      operate: '操作',
      edit: '编辑',
      detail: '详情',
      goUser: '查看参与用户',
    },
    js: {
      all: '所有',
      status0: '即将开始',
      status1: '进行中',
      status2: '已过期',
      status3: '暂停',

      activityType: '免费骑行',
    },
    activityDetailType: {
      all: '所有',
      status1: '免费次数',
      status2: '免费时间段',
    }
  },

  addFree: {
    form: {
      title0: '配置免费骑行',
      countryId: '国家',
      cityId: '城市',
      area: '适用区域',
      date: '有效时间',
      all: '所有',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      startHms: '开始时间',
      endHms: '结束时间',
      deletedate: '删除',
      adddate: '添加',
      daterange: '活动起止日期',
      chooseTime: '选择起止时间',
      status: '活动状态',
      type: '活动类型',
      typeName: '免费骑行',
      title: '标题',
      titlePlaceholder: '不超过25字',
      content: '内容',
      contentPlaceholder: '不超过100字',
      bannerUrl: '上传图片',
      upload: '点击上传',
      h5Url: '跳转H5',
      submit: '提交',

      mTitle: '这里是标题',
      mContent: '这里是内容',
    },
    js: {
      status0: '即将开始',
      status1: '进行中',
      status2: '已过期',
      submitTips: '结束时间需大于开始时间',
    }
  },

  freeInfo: {
    table: {
      title: '免费骑行详情',
      title1: '基本信息',
      title2: '操作记录',

      freeType: '活动类型',
      typeName: '免费骑行',
      status: '活动状态',
      comment: '活动内容',
      content: '显示文案',
      country: '国家',
      city: '城市',
      startTime: '活动起始日期',
      endTime: '活动结束日期',
      bannerUrl: '图片',
      h5Url: '跳转H5',

      mTitle: '这里是标题',
      mContent: '这里是内容',

      createdAt: '操作时间',
      type: '动作',
      adminName: '操作人',
      remark: '备注',
    },
    js: {
      type1: '创建',
      type2: '更新',
    }
  },

  card: {
    query: {
      title: '会员卡活动',
      goAdd: '添加',
      time: '活动日期',
      chooseTime: '选择日期',
      countryId: '国家',
      status: '活动状态',
      query: '查询',
    },
    table: {
      id: 'ID',
      updateAt: '操作时间',
      activityType: '活动类型',
      startTime: '活动起始日期',
      endTime: '活动结束日期',
      title: '标题',
      content: '活动内容',
      status: '活动状态',
      countryName: '国家',
      cityName: '城市',
      activityContent: '会员卡配置',
      freecard: '会员特权',
      operate: '操作',
      edit: '编辑',
      detail: '详情',
    },
    js: {
      all: '所有',
      status0: '即将开始',
      status1: '进行中',
      status2: '已过期',
      status3: '暂停',
      activityType: '会员卡',
      freecard: '前{freeTimes}次免费{freeMinutes}分钟',
      cardName: '会员卡名称：',
      dayCard: '天卡',
      priceCard: ', 正常价：',
      priceAuto: ', 自动续费：',
      priceDisAuto: ', 未设置自动续费',
      priceDis: ', 体验价：',
      priceDisDis: ', 未设置体验价',
      priceDiscount: ', 折扣价：',
      priceDiscountDis: ', 未设置折扣价',
      nolimit: '不限制次数，且不限制时间',
      nodeposit: ', 免押金',
      indeposit: ', 不免押金'
    }
  },

  addCard: {
    form: {
      title0: '配置会员卡',
      countryId: '国家',
      cityId: '城市',
      daterange: '活动起止日期',
      chooseTime: '选择起止时间',
      status: '活动状态',
      type: '活动类型',
      typeName: '会员卡',
      cards: '会员卡',
      freeTimes: '限制次数',
      freeMinutes: ' 且限制时间',
      minute: '分钟',
      times: '次',
      day: '天',
      must: '必填',
      unmust: '选填',
      title: '标题',
      titlePlaceholder: '不超过25字',
      content: '内容',
      contentPlaceholder: '不超过100字',
      distoIndex: '显示在APP首页',
      yes: '是',
      no: '否',
      bannerUrl: '上传图片',
      upload: '点击修改上传图片',
      h5Url: '跳转H5',
      submit: '保存',
      dontAuto: '不自动续费',
      auto: '自动续费',
      basics: '活动基本信息',
      limit: '会员卡限制',
      settings: '配置活动弹窗',
      cardsetting: '会员卡配置',
      limit0: '限制1',
      limit1: '限制2',
      nolimit: '不限制次数，且不限制时间',
      addCard: '新增会员卡',
      cardName: '会员卡名称',
      cardNameholder: '不超过24字',
      cardDay: '天数',
      dayplaceholder: '必填',
      cardPrice: '正常价',
      priceplaceholder: '必填',
      cardDiscount: '体验价',
      disntAuto: '不启用体验价',
      disauto: '启用体验价',
      cardAuto: '自动续费',
      cardlist: '会员卡',
      cardlavel: '优先级',
      inDiscount: '折扣价',
      closeDisc: '不启用折扣价',
      openDisc: '启用折扣价',
      mustmin: '体验价必须小于折扣价、自动续费价和正常价格',
      nodeposit: '免押金',
      indeposit: '不免押金',
      isKeyDeposit: '押金一键购买',
      giftOCoin: 'OCN金额',
      superVip: '超级会员',
      nonSuperVip: '普通会员',
      authorizedTimes: '授权次数',
      vipType: '类型',
    },
    dialog: {
      title: '会员卡冲突',
      msg1: '与 {id} （活动编号）时间冲突，是否保存并暂停原活动？',
      detail: '{id} 活动详情',
      card: '会员卡',
      period: '有效期',
      area: '限制区域',

      ok: '确认',
      cancel: '取消',

      addCard: '新增会员卡',
      editCard: '编辑会员卡'

    },
    js: {
      status0: '即将开始',
      status1: '进行中',
      status2: '已过期',
      freecard: '前{freeTimes}次免费{freeMinutes}分钟',
      dayCard: '天卡',
      tip: '删除提示',
      message: '确定删除该会员卡？',
      ok: '确定',
      cancel: '取消'
    }
  },

  cardInfo: {
    table: {
      title: '会员卡详情',
      title1: '基本信息',
      title2: '操作记录',

      freeType: '活动类型',
      typeName: '会员卡',
      status: '活动状态',
      comment: '活动内容',
      content: '显示文案',
      country: '国家',
      city: '城市',
      startTime: '活动起始日期',
      endTime: '活动结束日期',
      bannerUrl: '图片',
      h5Url: '跳转H5',

      mTitle: '这里是标题',
      mContent: '这里是内容',

      createdAt: '操作时间',
      type: '动作',
      adminName: '操作人',
      remark: '备注',
    },
    js: {
      type1: '创建',
      type2: '更新',
    }
  },

  account: {
    query: {
      title: '帐号管理',
      goAdd: '添加帐号',

      name: '账号',
      roleId: '角色',
      status: '状态',
      countryId: '国家',

      query: '查询',
    },
    table: {
      id: '用户ID',
      name: '账号',
      phone: '手机号码',
      realName: '真实姓名',
      status: '账号状态',
      role: '角色',
      area: '国家与城市',
      country: '国家',
      city: '城市',
      period: '有效时间',
      updatedAt: '更新时间',
      operate: '操作',
      edit: '编辑',
      showWebAuth: '查看管理后台权限',
      showAppAuth: '查看运维APP权限',
      resetPassword: '重置密码',
      detail: '详情',
      deleteAdmin: '删除',
      frozenAdmin: '冻结'
    },
    dialog: {
      title1: '账号 {name} 的管理后台权限',
      title2: '账号 {name} 的运维APP权限',
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
      status2: '冻结',
      status3: '过期',

      message: '确认重置账号 {name} 的密码（123456）?',
      tip: '提示',
      ok: '确定',
      cancel: '取消',

      deleteMessage: '确认删除账号 {name} 吗?',
      frozenMessage: '确认冻结账号 {name} 吗？'
    }
  },

  addAccount: {
    form: {
      title: '添加系统账号',
      title1: '编辑系统账户',
      name: '用户名',
      namePlaceholder: '邮箱或手机号',
      password: '初始密码',
      realName: '真实姓名',
      countryId: '国家',
      cityId: '城市',
      phoneCode: '国家码',
      phoneTip: '* "国家码"为手机号所属国家编码，必填',
      phone: '手机号',
      status: '状态',
      roleId: '角色',

      submit: '提交',
    },
    js: {
      all: '所有',
      status1: '正常',
      status2: '冻结',
      status3: '过期',
    }
  },

  accountInfo: {
    table: {
      title: '账号信息详情',
      title1: '基本信息',
      title2: '权限详情',
      title3: '操作记录',

      name: '账号',
      password: '密码',
      realName: '真实姓名',
      status: '账号状态',

      role: '角色',
      country: '国家',
      city: '城市',
      webAuth: '管理后台权限',
      showWebAuth: '查看管理后台权限',
      appAuth: '运维APP权限',
      showAppAuth: '查看运维APP权限',
    },
    table2: {
      createdAt: '操作时间',
      name: '操作人',
      changeDes: '备注',
    },
    js: {
      type1: '创建',
      type2: '更新',
    }
  },

  webAuth: {
    title: '配置管理后台权限',
    nameLabel: '角色名称',
    title1: '配置角色权限',
    save: '保存',
    goBack: '放弃修改',
  },

  appAuth: {
    title: '配置运维APP权限',
    nameLabel: '角色名称',
    title1: '配置角色权限',
    save: '保存',
    goBack: '放弃修改',
  },

  // 消息推送 zhu 2017.05.08
  funcnews: {
    query: {
      title: '功能消息',
      type: '功能类型',
      pushtime: '推送时机',
      query: '查询'
    },
    table: {
      id: 'ID',
      functype: '功能类型',
      pushtime: '推送时机',
      language: '语言',
      title: '消息标题',
      content: '消息内容',
      linkpage: '跳转页面',
      newsspec: '消息分类',
      ispushtime: '是否在推送时机推送',
      issavelocale: '是否在本地消息保存',
      operate: '操作',
      newstmpl: '查看消息模板',
      pushrec: '查看推送记录'
    },
    js: {
      all: '所有',
      type0: '会员卡',
      type1: '举报核实',
      type2: '余额调整',

      pushtype0: '所有',
      pushtype1: '会员卡剩3天到期',
      pushtype2: '会员卡提前一天',
      pushtype3: '用户举报之后',
      pushtype4: '用户举报核实后',
      pushtype5: '用户被举报核实后',
      pushtype6: '余额调整 － 运营赠送',
      pushtype7: '余额调整 － 消费退款',
      pushtype8: '余额调整 － 意外充值退款',
      pushtype9: '余额调整 － 扣除罚金',
      pushtype10: '余额调整 － 其他',
      pushtype11: '押金退款',
      pushtype12: '用户手动结束行程，历史信息报上来之后',
      pushtype13: '运营手动结束',
      pushtype14: '余额小于0',
      pushtype15: '学生认证 － 成功',
      pushtype16: '学生认证 － 失败',
      pushtype17: '邀请好友奖励',
      pushtype18: '赠送优惠券',
      pushtype19: '优惠券到期提醒(提前1天)',
      pushtype20: '会员卡到期提醒(提前3天)',
      pushtype21: '会员卡到期提醒(过期)',
      pushtype22: '赠送会员卡通知',
      pushtype23: '取消会员退款通知',
      pushtype24: '会员卡延期通知',
      pushtype25: '智付通支付回调成功',
      pushtype26: '闪送订单已接单',
      pushtype27: '闪送订单被取消',
      pushtype28: '闪送订单退款申请通过',
      pushtype29: '闪送订单赔付申请通过',
      pushtype30: '闪送订单成功送达',
      pushtype31: '骑士没有申请认证',
      pushtype32: '骑士认证成功',
      pushtype33: '骑士认证失败',
      pushtype34: '骑士没有接单',
      pushtype35: '骑士订单被取消',
      pushtype36: '骑士订单取件即将超时',
      pushtype37: '骑士订单送件已超时',
      pushtype38: '扣款通知',
      pushtype39: '账户冻结',
      pushtype40: '闪送订单未接单取消',
      pushtype41: '闪送订单未支付取消',
      pushtype42: '闪送订单后台取消',
      pushtype43: '骑士订单后台取消',
      pushtype44: '骑士订单送件即将超时',
      pushtype45: '骑士订单取件已超时',
      pushtype46: '用户违约取消订单退款',
      pushtype47: '用户违约赔偿',
      pushtype48: '闪送新订单',
      pushtype49: '企业号欢迎管理员短信',
      pushtype50: '企业号欢迎员工弹窗',
      pushtype51: '企业号套餐失效弹窗',
      pushtype52: '企业号套餐生效前员工短信',
      pushtype53: '企业号套餐已生效员工短信',
      pushtype54: '赠送OCN',
      pushtype55: 'OCN充值成功提醒',
      pushtype56: '领取授权码',
      pushtype57: '加入家庭',
      pushtype58: '退出家庭',
      pushtype59: '移出家庭',

      functype0: '所有',
      functype1: '会员卡',
      functype2: '举报反馈',
      functype3: '举报核实',
      functype4: '被举报核实',
      functype5: '余额调整',
      functype6: '押金退款',
      functype7: '行程记录',
      functype8: '提醒充值',
      functype9: '学生认证',
      functype10: '优惠券',
      functype11: '闪送通知',
      functype12: '企业号通知',
      functype13: 'OCN通知',
      functype14: '授权码',
      functype15: '家庭号',

      noticetype1: '一般',
      noticetype2: '优惠活动',
      noticetype3: '举报通知',
      noticetype4: '营销',

      viewpage1: '我的信息页面',
      viewpage2: '学生认证信息填写页面',
      viewpage3: '学生认证成功页面',
      viewpage4: '学生认证失败页面',
      viewpage5: 'VIP 会员充值页面',
      viewpage6: 'VIP 会员信息展示页面',
      viewpage7: '我的钱包页面',
      viewpage8: '优惠券页面',
      viewpage9: '我的信用分页',
      viewpage10: '邀请奖励页面',
      viewpage11: '负面记录页面',
      viewpage12: '交易详情页面',
      viewpage13: '信用积分',
      viewpage14: '我的行程',

      none: '无'
    }
  },

  pushrec: {
    query: {
      title: '推送消息记录',
      createdTime: '日期',
      chooseTime: '选择时间',
      userId: '用户',
      fbtoken: 'FireBase Token',
      functype: '功能类别',
      pushtime: '推送时机',
      languageId: '语言',
      query: '查询'
    },
    table: {
      id: '推送ID',
      createdAt: '推送时间',
      userId: '用户',
      fbtoken: 'FireBase Token',
      type: '功能类别',
      pushtime: '推送时机',
      language: '语言',
      title: '标题',
      content: '内容',
      isreached: '是否达到',
      remark: '失败原因',
    }
  },

  functmpl: {
    query: {
      title: '消息模版',
      functype: '功能类别',
      pushtime: '推送时机',
      tmplset: '模版配置',
      addlang: '添加语言',
      basic: '基本信息',
      operator: '操作日志'
    },
    table: {
      name: '语言',
      title: '标题',
      content: '内容',
      operateTime: '操作时间',
      activity: '动作',
      operater: '操作人',
      operate: '操作',
      edit: '编辑',
      delete: '删除'
    },
    form: {
      add: '添加',
      edit: '编辑',
      language: '语言',
      title: '消息标题',
      content: '消息内容',
      remarkTip: '填写消息内容',
      cancel: '取消',
      submit: '确定'
    }
  },

  pushMessage: {
    query: {
      title: '推送消息',
      countryId: '国家',
      notiType: '消息推送种类',
      sendDate: '发送日期',
      sendStatus: '发送状态',
      userTag: '用户标签',
    },
    table: {
      id: 'ID',
      notiType: '消息推送种类',
      sendDate: '发送日期',
      countryName: '国家',
      userTag: '用户标签',
      languages: '语言',
      notiTitle: '消息标题',
      notiContent: '消息内容',
      jumpTo: '跳转到',
      saveMesaage: '保存到本地',
      sendStatus: '状态',

      deleteMessage: '删除',
      view: '预览',
    },
    dialog: {
      title1: '用户列表',
      title2: '预览',
    },
    js: {
      all: '所有',
      notiType0: '正常',
      notiType1: '跳转H5',
      notiType2: '跳转到指定页面',
      notiType3: '弹窗显示活动',

      sendStatusn1: '处理中',
      sendStatus0: '失败',
      sendStatus1: '完成',

      deleteMessage: '确认删除本条记录?',
      tip: '提示',
      ok: '确认',
      cancel: '取消',
    }
  },

  addPushMessage: {
    form: {
      title: '新增消息推送',
      notiType: '消息推送种类',
      countryId: '国家',
      saveMesaage: '保存到本地',
      yes: '是',
      no: '否',
      userPhone: '用户',
      userPhonePlaceholder: '输入用户手机号码，多个用户回车隔开',
      userTag: '用户标签',
      jumpTo: '跳转到',
      popTemplateType: '模板',

      languages: '选择语言',
      notiTitle: '消息标题',
      notiContent: '消息内容',
      notiTitlePlaceholder: '必填，展示在通知栏',
      popTitle: 'pop 标题',
      popContent: 'pop 内容',
      popTitlePlaceholder: '必填，填充在模板里',
      popWebUrl: '',
      jumpToWhereH5: 'H5',
      jumpToWherePage: '指定页',

      upload: '图片上传',
      uploadTip: '点击上传图片',
      view: '预览',
      submit: '立即推送',
    },
    js: {
      notiType0: '正常',
      notiType1: '跳转H5',
      notiType2: '跳转到指定页面',
      notiType3: '弹窗显示活动',

      popTemplateType1: '小图带标题内容',
      popTemplateType2: '大图带标题内容',
      popTemplateType3: '大图不带标题内容',

      myInfo: '我的信息页面',
      editStudentCertification: '学生认证信息填写页面',
      successfulCertification: '学生认证成功页面',
      failedCertification: '学生认证失败页面',
      rechargeMember: 'VIP 会员充值页面',
      memberInfo: 'VIP 会员信息展示页面',
      myWallet: '我的钱包页面',
      couponList: '优惠券页面',
      creditPoints: '我的信用分页',
      invitationReward: '邀请奖励页面',
      negativeRecord: '负面记录页面',
      transactionDetails: '交易详情页面',
      gainCredibility: '信用积分',
      myTrip: '我的行程',
    }
  },

  // 国家城市配置 zhu 2017.05.11
  city: {
    query: {
      title: '国家城市配置',
      add: '添加',
      countryId: '国家',
      cityId: '城市',
      query: '查询'
    },
    table: {
      id: '编号ID',
      countryId: '国家',
      cityId: '城市英文名',
      ecityId: '本地语言城市名',
      helmet: '是否有头盔',
      operate: '操作',
      editHelmet: '编辑'
    },
    js: {
      all: '所有',
      helmet0: '否',
      helmet1: '是',
      tip: '(该名称显示在APP端)'
    },
    dialog: {
      title: '新增国家城市',
      helmet: '是否有头盔',
      title3: '编辑国家城市',
      cancel: '取消',
      ok: '确定'
    },
    form: {
      countryId: '国家',
      cityId: '城市英文名',
      ecityId: '本地语言城市名',
      tip: '* 该名称显示在APP端，请谨慎填写！',
      submit: '确定',
      cancel: '取消'
    }
  },

  role: {
    table: {
      title: '角色管理',
      goAdd: '添加角色',

      id: '角色ID',
      name: '角色',
      web: '管理后台权限',
      app: '运维APP权限',
      updatedAt: '修改时间',
      updatedName: '修改人',
      operate: '操作',

      edit: '修改角色名称',
      editWebAuth: '编辑管理后台权限',
      editAppAuth: '编辑运维APP权限',
      openTip: '请开启权限',
      detail: '操作记录',
    },
    dialog: {
      title: '添加角色',
      title1: '修改角色名称',
      nameLabel: '角色名称',
      web: '管理后台权限',
      app: '运维APP权限',
      cancel: '取消',
      ok: '添加',
    }

  },

  // 设置 - 支付风控
  risk: {
    query: {
      title: '支付风险控制',
      goAdd: '添加',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      hours: '时间段(小时)',
      limitedAmount: '开启3D交易额度',
      limitedPayTimes: '开启3D交易次数',
      limitedChargeBackTimes: '有过拒付记录开启3D',
      forbiddenAmount: '暂停交易额度',
      forbiddenPayTimes: '暂停交易次数',
      frozenChargeBackTimes: '拒付几次将加入黑名单',
      updatedAt: '更新时间',
      edit: '编辑',
    }
  },

  addRisk: {
    form: {
      title: '配置风险控制条件',
      countryId: '国家',
      hours: '时间段',
      hoursUnit: '小时',
      frozenChargeBackTimes: '拒付几次将加入黑名单',
      timesUnit: '次',

      open3D: '开启3D',
      limitedAmount: '开启3D交易额度',
      limitedPayTimes: '开启3D交易次数',
      limitedChargeBackTimes: '有过拒付记录开启3D',
      forbiddenAmount: '暂停交易额度',
      forbiddenAmountPlaceholder: '必须大于等于3D交易额度',
      forbiddenPayTimes: '暂停交易次数',
      forbiddenPayTimesPlaceholder: '必须大于等于3D交易次数',
      submit: '提交',
    },
  },

  paypal: {
    query: {
      title: 'PayPal转账',
      goAdd: '转入',
      createdAt: '转入日期',
      chooseTime: '选择日期范围',
      countryId: '入款国家',
      status: '转入结果',
    },
    table: {
      id: 'ID',
      createdAt: '转入日期',
      adminName: '操作人',
      countryName: '入款国家',
      intoAccount: '入款账户',
      amount: '转入金额',
      currency: '对应币种',
      status: '转入结果',
    },
    dialog: {
      title: 'PayPal转账',
      countryCode: '入款国家',
      accountCode: '入款账户',
      amount: '转入金额',
      password: '登录密码',
      passwordPlaceholder: '请输入管理后台登陆密码',
    },
    js: {
      statussuccess: '已转入',
      statuserror: '失败',
    }
  },

  bind: {
    query: {
      title: '绑定失败记录',
      countryId: '国家',
      createdAt: '创建时间',
      chooseTime: '选择起止时间',
      phone: '手机号',
      query: '查询'
    },
    table: {
      id: 'ID',
      createAt: '创建时间',
      countryName: '国家',
      memberId: '会员ID',
      phone: '会员手机号',
      logInfo: '失败错误信息'
    }
  },

  pay: {
    query: {
      title: '支付失败记录',
      countryId: '国家',
      createdAt: '创建时间',
      chooseTime: '选择起止时间',
      tradeSource: '支付渠道',
      phone: '手机号',
      query: '查询'
    },
    table: {
      id: 'ID',
      createAt: '创建时间',
      countryName: '国家',
      tradeSource: '支付渠道',
      phone: '会员手机号',
      statementNo: '交易流水号',
      errorInfo: '失败错误信息'
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
      title: '单车显示半径',
      title1: '配置单车显示半径',
      countryId: '国家',
      cityId: '城市',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      cityName: '城市',
      radius: '半径(m)',
      num: '周围车辆(辆)',
      integerPlaceholder: '请输入正整数',
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
      title: '手续费管理',
      goAdd: '添加',
      countryId: '国家',
      payMethodId: '支付方式',
      open: '状态',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      payMethodName: '支付方式',
      open: '状态',
      edit: '编辑',
      doOpen: '开启',
      close: '停用',
      detail: '详情',
    },
    dialog: {
      title: '添加手续费',
      title1: '手续费详情',
      title2: '修改手续费',
      countryId: '国家',
      countryCurrency: '币种',
      payMethodId: '支付方式',
      range: '金额范围',
      minAmount: '最小金额',
      maxAmount: '最大金额',
      fee: '手续费',
      open: '状态',
      tips: '* 请按金额从低到高进行配置，手续费不能大于最小金额，金额范围不能有重叠',
    },
    js: {
      opentrue: '开启',
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
      benefitType2: '金额',
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
      expired: '该图标活动奖励已过期'
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
      title: '电子围栏',
      title1: '配置电子围栏',
      title2: '操作日志',
      type: '围栏类型',
      useable: '状态',
      visiable: '在地图上显示',
      contentType: '奖励类型',
      contentName: '奖励内容',
      contentNamePlaceHolder0: '无奖励',
      contentNamePlaceHolder1: '请选择'
    },
    table: {
      id: 'ID',
      type: '围栏类型',
      useable: '状态',
      num: '围栏数量',
      radius: '显示范围',
      radiusPlaceholder: '显示中心点多少米范围内的该类型围栏',
      batchAdd: '批量添加',
      visiable: '在地图上显示',
      contentType: '奖励类型',
      promotionActivityId: '奖励名称',
      edit: '编辑',
      disabled: '禁用',
      enabled: '启用',
      detail: '操作日志',
    },
    js: {
      type1: '停车区域',
      type2: '禁停区域',
      type3: '停车点',
      type4: '管制区',
      useable1: '启用',
      useable0: '禁用',
      contentType0: '无',
      contentType1: '第三方红包',
      contentType2: '贴纸',
      contentType3: '我方优惠券',
      contentType4: '我方优惠码',
      contentType5: '奖励系统',
      expired: '该电子围栏奖励已过期'
    },
    dialog: {
      createdAt: '操作时间',
      admin: '操作人',
      remark: '操作',
      upload: '文件上传',
    }
  },

  fenceInfo: {
    query: {
      title: '电子围栏列表',
      goAdd: '添加',
      exportExcel: '导出',
      id: '围栏ID',
      name: '围栏名称',
      longitude: '经度',
      latitude: '纬度',
      hasPile: '有无电子停车桩',
      pileNo: '电子停车桩ID',
    },
    table: {
      id: '围栏ID',
      name: '围栏名称',
      points: '坐标点',
      hasPile: '有无电子停车桩',
      pileNo: '电子停车桩ID',
      subType: '图标',
      edit: '编辑',
      detail: '操作日志',
    },
    js: {
      has: '有',
      nothas: '无',
      subType1: 'P',
      subType2: 'S',
    }
  },

  addFence: {
    form: {
      title: '配置电子围栏',
      name: '围栏名称',
      useable: '状态',
      points: '坐标点',
      latitude: '纬度',
      longitude: '经度',
      submit: '保存',
      tips: '* 请至少填入三个坐标点',
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
      title: '打卡记录',
      exportExcel: '导出',
      countryId: '国家',
      cityId: '城市',
      createdByName: '操作人',
      clockOnTime: '签到起止时间',
      clockOffTime: '签退起止时间',
    },
    table: {
      id: 'ID',
      countryName: '国家',
      cityName: '城市',
      createdByName: '操作人',
      clockOnTime: '签到时间（当地时间/GMT+8时间）',
      clockOnAddress: '签到地点',
      clockOffTime: '签退时间（当地时间/GMT+8时间)',
      clockOffAddress: '签退地点',
      workDuration: '工作时长',
      track: "轨迹",
      detail: "查看"
    },
    dialog: {
      title: '操作人轨迹',
      id: 'ID',
      createdByName: '操作人',
      createdTime: "时间",
      longitude: "经度",
      latitude: "纬度",
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
      title: '骑士基本信息',
    },
    table: {
      id: '骑士ID',
      name: '骑士名',
      createdAt: '注册时间',
      phone: '骑士号码',
      driverStatus: '骑士状态',
      certificate: '认证状态',
      workStatus: '工作状态',
      countryName: '国家',
      depositStatus: '押金状态',
      email: '邮箱',
      platform: '平台',
      memo: '备注',
      updatedAt: '更新时间',

      driverStatusBtn1: '冻结',
      driverStatusBtn0: '解冻',
      depositStatusBtn1: '置为免押金',
      depositStatusBtn0: '取消免押金',
    },
    js: {
      driverStatus0: '正常',
      driverStatus1: '冻结',
      workStatus0: '下线',
      workStatus1: '上线',
      depositStatus0: '未交押金',
      depositStatus1: '已交押金',
      depositStatus2: '押金不足',
      depositStatus3: '免押金',
      certificate0: '未认证',
      certificate1: '认证中',
      certificate2: '认证成功',

      tip: '提示',
      driverStatusString0: '确定要冻结骑士{phone}？',
      driverStatusString1: '确定要解冻骑士{phone}？',
      depositStatusString1: '确定要将骑士{phone}取消免押金？',
      depositStatusString0: '确定要将骑士{phone}置为免押金？',
    }
  },

  driverVerify: {
    query: {
      title: '骑士审核',
      countryId: '国家',
    },
    table: {
      id: '审核ID',
      memberId: '骑士ID',
      realName: '骑士名',
      createdAt: '注册时间',
      phone: '骑士号码',
      certificateStatus: '审核状态',
      countryName: '国家',
      certificationNo: '证件号',
      imgs: '审核图',
      updatedAt: '更新时间',

      apply: '通过',
      refused: '不通过',
      goDriverInfo: '查看骑士个人信息',
    },
    js: {
      confirm1: '确认通过骑士{phone}的审核？',
      confirm2: '确认不通过骑士{phone}的审核？',
      certificateStatus0: '未审核',
      certificateStatus1: '审核通过',
      certificateStatus2: '审核不通过',
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
      title: '骑手提现列表',
      statementNo: '订单号',
      driverId: '骑士id',
      driverPhone: '骑士手机号',
      updatedAt: '提现日期',
      payStatus: '提现状态',
    },
    table: {
      createdAt: '申请日期',
      countryName: '国家',
      amount: '提现金额',
      approve: '通过申请',
      cashOk: '确认发放',
      cashRefuse: '拒绝发放',
    },
    js: {
      payStatus5: '提现申请中',
      payStatus6: '提现通过申请',
      payStatus7: '打款成功',
      payStatus8: '打款失败',
      approveTips: '确认通过骑士{phone}的提现申请？',
      cashOkTips: '确认已给骑士{phone}打款？',
      cashRefuseTips: '确认拒绝骑士{phone}的提现申请？',
    }
  },

  rwcoupon: {
    query: {
      title: '奖励资源 - 优惠券',
      add: '添加',
      countryId: '适用国家',
      cityId: '适用城市',
      benefitType: '优惠类型',
      name: '优惠名称',
      merchantCode: '供应商',
      query: '查询'
    },
    table: {
      id: 'ID',
      merchantCode: '供应商名称',
      name: '优惠券名称',
      benefitType: '优惠类型',
      benefitContent: '优惠额度',
      endType: '有效期类型',
      period: '有效期时间',
      area: '适用区域',
      operate: '操作',
      edit: '编辑',
      view: '详情'
    },
    js: {
      discount: '折扣',
      quota: '金额',
      all: '所有',
      day: '天',

      benefitType1: '折扣',
      benefitType2: '金额',

      endType1: '指定天数',
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
      upload: 'LOGO',
      uploadTip: '支持png/jpg/jpeg',
      couponName: 'App优惠券名称',
      link: '点击使用跳转页面的链接,必须为https://协议头',
      default: '默认优惠券样式',
      vip: 'VIP',
      days: 'DAYS',
      couponName: 'App优惠券名称',
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
      usage: '已领取/总数',
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
  ...zhLocale
}
