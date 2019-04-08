export default {
  enterpriseAccount: {
    query: {
      title: '企业信息列表',
      abbr: '企业简称',
      phone: '企业账号',
      countryId: '国家',
      frozen: '状态',
      startTime: '登记开始时间',
      endTime: '登记结束时间',
    },
    table: {
      id: '企业ID',
      createdAtStr: '登记日期',
      abbr: '企业简称',
      phoneStr: '企业账号',
      countryName: '国家',
      packageNameStr: '套餐名称',
      memberNum: '实际人数',
      peopleNum: '套餐人数',
      payAmount: '实付金额',
      startTimeStr: '套餐开始日期',
      endTimeStr: '套餐结束日期',
      typeStr: '状态',
      activate: '启用',
      inactivate: '冻结',
      resetPassword: '重置密码',
      manageOrders: '套餐管理',
    },
    js: {
      frozenOption0: '可用',
      frozenOption1: '冻结',
    }
  },

  enterpriseAccountInfo: {
    title: '企业详情',
    basic: {
      title: '基础信息',
      id: '企业ID',
      countryName: '国家',
      name: '企业全名',
      email: '企业邮箱',
      abbr: '企业简称',
      telephone: '企业电话',
      contact: '联系人',
      phone: '联系人手机',
      frozen: '企业状态',
    },
    package: {
      title: '套餐详情（当前)',
      packageId: '套餐ID',
      packageName: '套餐名称',
      days: '套餐周期',
      type: '类型',
      peopleNum: '套餐人数',
      TimeStr: '起止日期',
      amount: '总价',
      payAmount: '实付金额',
      packageCreatedAtStr: '下单时间',
    }
  },

  enterpriseAccountAdd: {
    titleAdd: '新建企业账号',
    titleEdit: '编辑企业账号',
    submitAdd: '创建',
    submitEdit: '更新',
    label: {
      country: '国家',
      name: '企业名称',
      abbr: '企业简称',
      email: '企业邮箱',
      password: '密码',
      checkPassword: '确认密码',
      telephone: '公司电话',
      contact: '联系人',
      phone: '联系人电话',
      reset: '重置'
    },
    placeholder: {
      abbr: '六位数内英文的组合',
      password: '必须是8-12位含大小写英文、数字的组合'
    },
    rules: {
      inputPass: '请输入密码',
      inputPassAgain: '请再次输入密码',
      passDiff: '两次输入密码不一致',
      country: '请选择国家',
      name1: '企业名不能为空',
      name2: '长度在 0 到 100 个字符',
      abbr1: '企业简称不能为空',
      abbr2: '6位数内的英文字母组合',
      email: '请输入合法的邮箱格式',
      telephone: '电话不能为空',
      contact: '联系人不能为空',
      phone: '联系人电话不能为空',
      pass1: '密码不能为空',
      pass2: '必须是8-12位含大小写英文、数字的组合',
    }
  },

  enterpriseAccountReset: {
    tip: '必须是8-12位含大小写英文、数字的组合',
    cancel: '取 消',
    confirm: '确 定',
  },

  enterprisePackage: {
    title: '套餐列表',
    table: {
      id: '套餐ID',
      createdAtStr: '创建日期',
      name: '套餐名称',
      countryName: '国家',
      startTimeStr: '开始日期',
      endTimeStr: '结束日期',
      peopleNum: '人数',
      amount: '总价',
      discountStr: '折扣',
      payAmount: '成交价',
    }
  },

  enterprisePackageAdd: {
    title: '添加套餐',
    create: '创建',
    reset: '重制',
    label: {
      countryId: '国家选择',
      name: '套餐名称',
      amount: '套餐总价',
      peopleNum: '套餐人数',
      startTime: '开启时间',
      days: '套餐周期',
      payAmount: '实付金额',
    },
    placeholder: {
      select: '请选择',
      name: '六位数内英文的组合',
      input: '请输入',
      date: '选择日期',
      day: '天',
    },
    rules: {
      payAmount1: '请输入实付金额',
      payAmount2: '实付金额必须小于等于套餐总价!',
      countryId: '请选择国家',
      name1: '套餐名不能为空',
      name2: '长度在 0 到 100 个字符',
      amount: '请输入大于0数字',
      peopleNum: '请输入大于0整数',
      startTime: '请选择日期',
      days: '请输入大于0整数',
      payAmount: '请输入大于0数字',

    }
  }
}