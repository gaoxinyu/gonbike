export default {
  evsUser: {
    table: {
      name: '暱稱',
      countryName: '國家',
    }
  },
  evsOrder: {
    query: {
      title: '訂單管理',
      startDate: '開始時間',
      endDate: '結束時間',
      phone: '下單人手機號',
      recipientMobileNumber: '收貨人手機號',
      orderNo: '訂單編號',
      orderStatus: '訂單狀態',
      countryId: '收貨人國家',
      payMethod: '支付方式',
    },
    table: {
      id: 'ID',
      countryName: '收貨人國家',
      createdAt: '下單時間',
      phone: '下單人手機號',
      mobileNumber: '收貨人手機號',
      orderNo: '訂單編號',
      orderStatus: '訂單狀態',
      orderStatusDeposit: '定金支付狀態',
      orderStatusLeftPart: '尾款支付狀態',
    },
    js: {
      orderStatus0: '未支付',
      orderStatus1: '支付完成',
      orderStatus2: '支付中',
      orderStatus3: '出庫',
      payMethod1: '信用卡',
      payMethod2: '其他',
      orderStatusDeposit0: '未支付',
      orderStatusDeposit1: '支付完成',
      orderStatusDeposit2: '支付中',
      orderStatusDeposit3: '支付失敗',
      orderStatusLeftPart0: '未支付',
      orderStatusLeftPart1: '支付完成',
      orderStatusLeftPart2: '支付中',
      orderStatusLeftPart3: '支付失敗',
    }
  },
  evsPayway: {
    form: {
      title: '支付方式設置',
      title1: '搶購設置',
      save: '保存',
      paramCode1: '%',
      paramCode2: '輛',
      paramCodeLabel1: '實時開賣進度',
      paramCodeLabel2: '當天開賣數量',
    }
  },
  evsOrderDetail: {
    info: {
      name: '訂單信息',
      orderNo: '訂單編號',
      orderStatus: '訂單狀態',
      createdAt: '下單時間',
      pay: '支付',
      deposit: '定金',
      payTime: '支付時間',
      payMethod: '支付方式',
      amount: '支付金額',
      statementNo: '支付單號',
      payStatus: '支付狀態',
      leftPart: '尾款',
      walletAddress: '錢包地址',
      tradeNo: '交易單號',
      receivedInfo: '收貨信息',
      recipientName: '收貨人',
      mobileNumber: '收貨人手機號',
      countryName: '國家',
      cityName: '城市',
      stateName: '省份',
      homeAddress: '收貨地址',
      postalCode: '郵編',
      goodsInfo: '商品信息',
      earlyBirdPrice: '商品總價',
      goodsContent: '商品內容',
      remark: '備註',
    },
    js: {
      payMethod1: 'adyen',
      payMethod2: 'OCN',
      payMethod3: 'BTC',
      payMethod4: 'ETH',
      payStatus0: '未支付',
      payStatus1: '支付完成',
      payStatus2: '支付中',
      payStatus3: '支付失敗',
    }
  }

}