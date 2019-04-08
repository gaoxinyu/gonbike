export default {
    enterpriseAccount: {
      query: {
        title: '企業信息列表',
        abbr: '企業簡稱',
        phone: '企業賬號',
        countryId: '國家',
        frozen: '狀態',
        startTime: '登記開始時間',
        endTime: '登記結束時間',
      },
      table: {
        id: '企業ID',
        createdAtStr: '登記日期',
        abbr: '企業簡稱',
        phoneStr: '企業賬號',
        countryName: '國家',
        packageNameStr: '套餐名稱',
        memberNum: '實際人數',
        peopleNum: '套餐人數',
        payAmount: '實付金額',
        startTimeStr: '套餐開始日期',
        endTimeStr: '套餐結束日期',
        typeStr: '狀態',
        activate: '啟用',
        inactivate: '凍結',
        resetPassword: '重置密碼',
        manageOrders: '套餐管理',
      },
      js: {
        frozenOption0: '可用',
        frozenOption1: '凍結',
      }
    },
  
    enterpriseAccountInfo: {
      title: '企業詳情',
      basic: {
        title: '基礎信息',
        id: '企業ID',
        countryName: '國家',
        name: '企業全名',
        email: '企業郵箱',
        abbr: '企業簡稱',
        telephone: '企業電話',
        contact: '聯繫人',
        phone: '聯繫人手機',
        frozen: '企業狀態',
      },
      package: {
        title: '套餐詳情（當前)',
        packageId: '套餐ID',
        packageName: '套餐名稱',
        days: '套餐週期',
        type: '類型',
        peopleNum: '套餐人數',
        TimeStr: '起止日期',
        amount: '總價',
        payAmount: '實付金額',
        packageCreatedAtStr: '下單時間',
      }
    },
  
    enterpriseAccountAdd: {
      titleAdd: '新建企業賬號',
      titleEdit: '編輯企業賬號',
      submitAdd: '創建',
      submitEdit: '更新',
      label: {
        country: '國家',
        name: '企業名稱',
        abbr: '企業簡稱',
        email: '企業郵箱',
        password: '密碼',
        checkPassword: '確認密碼',
        telephone: '公司電話',
        contact: '聯繫人',
        phone: '聯繫人電話',
        reset: '重置'
      },
      placeholder: {
        abbr: '六位數內英文的組合',
        password: '必須是8-12位含大小寫英文、數字的組合'
      },
      rules: {
        inputPass: '請輸入密碼',
        inputPassAgain: '請再次輸入密碼',
        passDiff: '兩次輸入密碼不一致',
        country: '請選擇國家',
        name1: '企業名不能為空',
        name2: '長度在 0 到 100 個字符',
        abbr1: '企業簡稱不能為空',
        abbr2: '6位數內的英文字母組合',
        email: '請輸入合法的郵箱格式',
        telephone: '電話不能為空',
        contact: '聯繫人不能為空',
        phone: '聯繫人電話不能為空',
        pass1: '密碼不能為空',
        pass2: '必須是8-12位含大小寫英文、數字的組合',
      }
    },
  
    enterpriseAccountReset: {
      tip: '必須是8-12位含大小寫英文、數字的組合',
      cancel: '取 消',
      confirm: '確 定',
    },
  
    enterprisePackage: {
      title: '套餐列表',
      table: {
        id: '套餐ID',
        createdAtStr: '創建日期',
        name: '套餐名稱',
        countryName: '國家',
        startTimeStr: '開始日期',
        endTimeStr: '結束日期',
        peopleNum: '人數',
        amount: '總價',
        discountStr: '折扣',
        payAmount: '成交價',
      }
    },
  
    enterprisePackageAdd: {
      title: '添加套餐',
      create: '創建',
      reset: '重製',
      label: {
        countryId: '國家選擇',
        name: '套餐名稱',
        amount: '套餐總價',
        peopleNum: '套餐人數',
        startTime: '開啟時間',
        days: '套餐週期',
        payAmount: '實付金額',
      },
      placeholder: {
        select: '請選擇',
        name: '六位數內英文的組合',
        input: '請輸入',
        date: '選擇日期',
        day: '天',
      },
      rules: {
        payAmount1: '請輸入實付金額',
        payAmount2: '實付金額必須小於等於套餐總價!',
        countryId: '請選擇國家',
        name1: '套餐名不能為空',
        name2: '長度在 0 到 100 個字符',
        amount: '請輸入大於0數字',
        peopleNum: '請輸入大於0整數',
        startTime: '請選擇日期',
        days: '請輸入大於0整數',
        payAmount: '請輸入大於0數字',
  
      }
    }
  }