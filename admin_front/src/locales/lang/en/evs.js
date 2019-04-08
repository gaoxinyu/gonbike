export default {
  evsUser: {
    table: {
      name: 'Nickname',
      countryName: 'Country',
    }
  },
  evsOrder: {
    query: {
      title: 'Order management',
      startDate: 'start time',
      endDate: 'end time',
      Phone: 'Ordering cell phone number',
      recipientMobileNumber: 'Receiver\'s mobile number',
      orderNo: 'order number',
      orderStatus: 'Order Status',
      countryId: 'Consignee country',
      payMethod: 'Payment method',
    },
    table: {
      id: 'ID',
      countryName: 'Consignee country',
      createdAt: 'Order time',
      phone: 'Ordering cell phone number',
      mobileNumber: 'Recipient phone number',
      orderNo: 'order number',
      orderStatus: 'Order Status',
      orderStatusDeposit: 'Deposit payment status',
      orderStatusLeftPart: 'end payment status',
    },
    js: {
      orderStatus0: 'Unpaid',
      orderStatus1: 'payment completed',
      orderStatus2: 'Payment',
      orderStatus3: 'outbound',
      payMethod1: 'credit card',
      payMethod2: 'Other',
      orderStatusDeposit0: 'Unpaid',
      orderStatusDeposit1: 'Payment completed',
      orderStatusDeposit2: 'Payment',
      orderStatusDeposit3: 'Payment failed',
      orderStatusLeftPart0: 'Unpaid',
      orderStatusLeftPart1: 'Payment Complete',
      orderStatusLeftPart2: 'Payment',
      orderStatusLeftPart3: 'Payment failed',
    }
  },
  evsPayway: {
    form: {
      title: 'Payment method settings',
      title1: 'panic setting',
      save: 'Save',
      paramCode1: '%',
      paramCode2: 'vehicle',
      paramCodeLabel1: 'Real-time selling progress',
      paramCodeLabel2: 'The number of sales on the day',
    }
  },
  evsOrderDetail: {
    info: {
      name: 'Order information',
      orderNo: 'order number',
      orderStatus: 'Order Status',
      createdAt: 'Order time',
      pay: 'Payment',
      deposit: 'Deposit',
      payTime: 'payment time',
      payMethod: 'Payment method',
      amount: 'payment amount',
      statementNo: 'payment slip number',
      payStatus: 'payment status',
      leftPart: 'tail money',
      walletAddress: 'wallet address',
      tradeNo: 'Transaction ticket number',
      receivedInfo: 'receipt information',
      recipientName: 'Consignee',
      mobileNumber: 'Recipient phone number',
      countryName: 'country',
      cityName: 'City',
      stateName: 'State',
      homeAddress: 'Receipt address',
      postalCode: 'Postal code',
      goodsInfo: 'product information',
      earlyBirdPrice: 'total price',
      goodsContent: 'Product content',
      remark: 'Remark'
    },
    js: {
      payMethod1: 'adyen',
      payMethod2: 'OCN',
      payMethod3: 'BTC',
      payMethod4: 'ETH',
      payStatus0: 'Unpaid',
      payStatus1: 'payment completed',
      payStatus2: 'Payment',
      payStatus3: 'Payment failed'
    }
  }

}