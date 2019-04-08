import enLocale from 'element-ui/lib/locale/lang/en'
import enterprise from './en/enterprise'
import evs from './en/evs'
import ocoin from './zh-CN/ocoin'

export default {
  signOut: 'Logout',

  // menus
  menu: {
    mainMenu: 'Main Menue',
    customer: {
      name: 'Customer Service',
      report: 'Ticket Management',
      addreport: 'Add Ticket',
      student: 'Student Card Review',
      sms: 'SMS Management',
      smsadd: 'Send SMS',
      smstemplate: 'SMS Template',
      smslimit: 'SMS Blacklist',
      driververify: 'Verify Driver',
    },
    operate: {
      name: 'Bike Operation',
      monitor: 'Bike Monitoring',
      trip: 'Trip Record',
      bikearea: 'Parking Area Management',
      // Bikelogo管理 zhu 2017.04.17
      bikelogo: 'Bike Logo Management',
      bikelogoadd: 'Add Logo Setting',
      bikelogoedit: 'Update Logo Setting',
      bikelogoinfo: 'Logo Setting Detail',
      tag: 'Deploy Tag Management',
      tagadd: 'Tag Setting',
      category: 'Tag Category',
      // CountryCity配置 zhu 2017.05.11
      cityconfig: 'Country&City Setting',
      fence: 'Electric fence',
      fenceInfo: 'Electronic fence list',
    },
    delivery: {
      name: 'FlashMan',
      deliveryorder: 'FlashMan Order List'
    },
    user: {
      name: 'User Management',
      userinfo: 'User Basic Info',
      device: 'User Device Info',
      credit: 'Credit Point',
      creditadd: 'Add Point',
      trade: 'Transaction Detail',
      tradeadd: 'Adjust Balance',
      payment: 'Payment Detail',
      usercoupon: 'User Coupon',
      addusercoupon: 'Deliver Coupon',
      vip: 'User Membership Info',
      autopay: 'Automatic renewal ',
      redbag: 'User reward info',
      driver: 'Driver Management',
      cash: 'Driver Cash Management',
      ocoin: 'OCN transaction details'
    },
    stock: {
      name: 'Bind Bike&Lock',
      lock: 'Lock Info Management',
      lockadd: 'Add Lock',
      bike: 'Bike Info Management',
      bikeadd: 'Add Bike',
      state: 'Bike Ops Country Setting'
    },
    app: {
      name: 'App Management',
      message: 'Notification Management',
      messageadd: 'Add Notification',
      version: 'APP Update Management',
      versionadd: 'APP Update Setting',
      invite: 'Referral Management',
      // 广告位 zhu 2017.09.01
      adarea: 'Advertising space management',
      addad1: 'Configure pop-up',
      addad2: 'Configure banner',
      addad3: 'Configure narrow banner',
      addad4: 'Configuration Icon',
      addad5: 'Configure One-click purchase'
    },
    discount: {
      name: 'Promotion Management',
      activity: 'Top Up Bonus',
      activityadd: 'Add Activity',
      joinuser: 'Involved User',
      coupon: 'Coupon',
      couponadd: 'Add coupon',
      code: 'Promo Code',
      codeadd: 'Add Promo Code',
      coderecord: 'Exchange Records',
      free: 'Free Ride',
      freeadd: 'Add Free Ride',
      card: 'Membership',
      cardadd: 'Membership Setting',
      deposit: 'Deposit Discount',
      depositadd: 'Deposit Discount Setting',
      users: 'Involved User',
      registercoupon: 'Register Coupon',
      nodeposit: 'Free deposit riding',
    },
    icon: {
      name: 'Icon activity',
      reward: 'Reward activity',
      redbag: 'Redbag activity',
      redbagadd: 'Configurate redbag activity',
      bikeicon: 'Bike icon',
      addbikeicon: 'Configurate bike icon',
      coupon: 'Coupon promotion '
    },
    // 消息推送 zhu 2017.05.08
    news: {
      name: 'Push Notification',
      func: 'Function Push',
      funcpush: 'Push History',
      pushmessage: 'Notification',
      pushmessageadd: 'Push Notification',
    },
    admin: {
      name: 'Access Management',
      role: 'Role Management',
      account: 'Account Management',
      accountadd: 'Add Account'
    },
    city: {
      name: 'City Management',
      recharge: 'Deposit&Top-up',
      price: 'Price Management',
      payfee: 'Fee management',
      flashmanedit: 'FlashMan Management',
    },
    setting: {
      name: 'Setting',
      paypal: 'PayPal Transfer',
      risk: 'Payment risk control',
      riskadd: 'Configure risk control',
      appsms: 'SMS Operator Setting',
      smssettingadd: 'SMS Operator Setting',
      prov: 'Country Operator',
      operator: 'Operator Info',
      pay: 'Payment method setting',
      addpay: 'Add payment method setting',
      editpay: 'Edit payment method setting',
      payinfo: 'Payment method detail',
      radius: 'Bicycle display radius',
      depositrefund: 'Deposit refund setting '
    },
    log: {
      name: 'System Log',
      bind: 'Bind Failed Log',
      pay: 'Payment Failure Log',
      lock: 'Switch Lock Failed Log',
      optlog: 'Admin App Operation Log',
      uploadloc: 'Report Location',
      putbike: 'Deploy Bike',
      bikemaintain: 'Repaire Bike',
      putagain: 'Bike Recycle',
      other: 'Other Operation',
      punchcard: 'Clock-in Record',
    },
    // 奖励管理 zhu 2017.12.13
    reward: {
      name: 'Reward Management',
      rwcoupon: 'Reward coupon',
      rwaddcoupon: 'Add new coupon',
      rwcode: 'Reward code',
      rwaddcode: 'Add new code',
      rwcredit: 'Reward credit',
      rwaddcredit: 'Add new credit',
      rwactivity: 'Reward activity',
      rwaddactivity: 'Add new activity'
    },
    enterprise: {
      name: 'Enterprise VAS',
      enterpriseaccount: 'Enterprise List',
      enterprisepackage: 'Package List',
    },
    evs: {
      name: 'EVS Management',
      evsuser: 'User Management',
      evsorder: 'Order Management',
      evspayway: 'EVS Settings'
    }
  },

  common: {
    all: 'All',
    chooseTime: 'Choose Date',
    query: 'Query',
    resetQuery: 'Reset',
    exportQuery: 'Export',
    operate: 'More',
    yes: 'Yes',
    no: 'No',
    ok: 'Confirm',
    cancel: 'Cancel',
    choose: 'Please choose',
    input: 'Please Enter',
    add: 'Add',
    edit: 'Edit',
    view: 'Detail',
    on: 'on',
    off: 'off',

    weekdays: {
      day1: 'Monday',
      day2: 'Tuesday',
      day3: 'Wednesday',
      day4: 'Thursday',
      day5: 'Friday',
      day6: 'Saturday',
      day7: 'Sunday',
    },

    countrys: {
      country1: 'Angola',
      country2: 'Afghanistan',
      country3: 'Albania',
      country4: 'Algeria',
      country5: 'Andorra',
      country6: 'Anguilla',
      country7: 'Antigua and Barbuda',
      country8: 'Argentina',
      country9: 'Armenia',
      country10: 'Ascension',
      country11: 'Australia',
      country12: 'Austria',
      country13: 'Azerbaijan',
      country14: 'Bahamas',
      country15: 'Bahrain',
      country16: 'Bangladesh',
      country17: 'Barbados',
      country18: 'Belarus',
      country19: 'Belgium',
      country20: 'Belize',
      country21: 'Benin',
      country22: 'Bermuda Is.',
      country23: 'Bolivia',
      country24: 'Botswana',
      country25: 'Brazil',
      country26: 'Brunei',
      country27: 'Bulgaria',
      country28: 'Burkina-faso',
      country29: 'Burma',
      country30: 'Burundi',
      country31: 'Cameroon',
      country32: 'Canada',
      country33: 'Cayman Is.',
      country34: 'Central African Republic',
      country35: 'Chad',
      country36: 'Chile',
      country37: 'China',
      country38: 'Colombia',
      country39: 'Congo',
      country40: 'Cook Is.',
      country41: 'Costa Rica',
      country42: 'Cuba',
      country43: 'Cyprus',
      country44: 'Czech Republic',
      country45: 'Denmark',
      country46: 'Djibouti',
      country47: 'Dominica Rep.',
      country48: 'Ecuador',
      country49: 'Egypt',
      country50: 'EI Salvador',
      country51: 'Estonia',
      country52: 'Ethiopia',
      country53: 'Fiji',
      country54: 'Finland',
      country55: 'France',
      country56: 'French Guiana',
      country57: 'Gabon',
      country58: 'Gambia',
      country59: 'Georgia',
      country60: 'Germany',
      country61: 'Ghana',
      country62: 'Gibraltar',
      country63: 'Greece',
      country64: 'Grenada',
      country65: 'Guam',
      country66: 'Guatemala',
      country67: 'Guinea',
      country68: 'Guyana',
      country69: 'Haiti',
      country70: 'Honduras',
      country71: 'Hongkong',
      country72: 'Hungary',
      country73: 'Iceland',
      country74: 'India',
      country75: 'Indonesia',
      country76: 'Iran',
      country77: 'Iraq',
      country78: 'Ireland',
      country79: 'Israel',
      country80: 'Italy',
      country81: 'Ivory Coast',
      country82: 'Jamaica',
      country83: 'Japan',
      country84: 'Jordan',
      country85: 'Kampuchea (Cambodia )',
      country86: 'Kazakstan',
      country87: 'Kenya',
      country88: 'Korea',
      country89: 'Kuwait',
      country90: 'Kyrgyzstan',
      country91: 'Laos',
      country92: 'Latvia',
      country93: 'Lebanon',
      country94: 'Lesotho',
      country95: 'Liberia',
      country96: 'Libya',
      country97: 'Liechtenstein',
      country98: 'Lithuania',
      country99: 'Luxembourg',
      country100: 'Macao',
      country101: 'Madagascar',
      country102: 'Malawi',
      country103: 'Malaysia',
      country104: 'Maldives',
      country105: 'Mali',
      country106: 'Malta',
      country107: 'Mariana Is',
      country108: 'Martinique',
      country109: 'Mauritius',
      country110: 'Mexico',
      country111: 'Moldova, Republic of',
      country112: 'Monaco',
      country113: 'Mongolia',
      country114: 'Montserrat Is',
      country115: 'Morocco',
      country116: 'Mozambique',
      country117: 'Namibia',
      country118: 'Nauru',
      country119: 'Nepal',
      country120: 'Netheriands Antilles',
      country121: 'Netherlands',
      country122: 'New Zealand',
      country123: 'Nicaragua',
      country124: 'Niger',
      country125: 'Nigeria',
      country126: 'North Korea',
      country127: 'Norway',
      country128: 'Oman',
      country129: 'Pakistan',
      country130: 'Panama',
      country131: 'Papua New Cuinea',
      country132: 'Paraguay',
      country133: 'Peru',
      country134: 'Philippines',
      country135: 'Poland',
      country136: 'French Polynesia',
      country137: 'Portugal',
      country138: 'Puerto Rico',
      country139: 'Qatar',
      country140: 'Reunion',
      country141: 'Romania',
      country142: 'Russia',
      country143: 'Saint Lueia',
      country144: 'Saint Vincent',
      country145: 'Samoa Eastern',
      country146: 'Samoa Western',
      country147: 'San Marino',
      country148: 'Sao Tome and Principe',
      country149: 'Saudi Arabia',
      country150: 'Senegal',
      country151: 'Seychelles',
      country152: 'Sierra Leone',
      country153: 'Singapore',
      country154: 'Slovakia',
      country155: 'Slovenia',
      country156: 'Solomon Is',
      country157: 'Somali',
      country158: 'South Africa',
      country159: 'Spain',
      country160: 'Sri Lanka',
      country163: 'Sudan',
      country164: 'Suriname',
      country165: 'Swaziland',
      country166: 'Sweden',
      country167: 'Switzerland',
      country168: 'Syria',
      country169: 'Taiwan',
      country170: 'Tajikstan',
      country171: 'Tanzania',
      country172: 'Thailand',
      country173: 'Togo',
      country174: 'Tonga',
      country175: 'Trinidad and Tobago',
      country176: 'Tunisia',
      country177: 'Turkey',
      country178: 'Turkmenistan',
      country179: 'Uganda',
      country180: 'Ukraine',
      country181: 'United Arab Emirates',
      country182: 'United Kingdom',
      country183: 'United States of America',
      country184: 'Uruguay',
      country185: 'Uzbekistan',
      country186: 'Venezuela',
      country187: 'Vietnam',
      country188: 'Yemen',
      country189: 'Yugoslavia',
      country190: 'Zimbabwe',
      country191: 'Zaire',
      country192: 'Zambia',
    },

    languages: {
      default: 'Default',
      en: 'English',
      zh: 'Chinese',
      hant: 'Traditional Chinese',
      ms: 'Malay',
      th: 'Thai',
      ko: 'Korean',
      nl: 'Dutch',
      fr: 'French',
      'fr-ch': 'Swiss French',
      de: 'German',
      'de-ch': 'Swiss German',
      'en-uk': 'British English',
      'en-au': 'Australian English',
      it: 'Italian',
      'zh-hant-hk': '香港繁体',
      span: 'Spanish',
      id: 'Indonesian',
      pt: 'Portuguese',
      'ru-ua': 'Ukrainian Russian'
    }
  },

  // login zhu 2017.09.20
  login: {
    form: {
      title: 'Please input your user name and password to log admin. ',
      namePlaceholder: 'User name',
      passPlaceholder: 'Input password',
      codePlaceholder: 'Input number on the right ',
      login: 'Login',
      next: 'We have sent SMS security code to {phone}, please don’t forget to check.',
      phonePlaceholder: 'Please input 4 digit SMS verification code.',
      getcode: 'Get verification code',
      submit: 'Confirm'
    }
  },

  // each views
  welcome: {
    title: 'Welcome to oBike Admin! Pls contact administrator for more function access.'
  },

  report: {
    box: {
      title: 'Ticket Management',
      title1: 'Batch Ignore',
      title2: 'Batch Plus Score',
      goAdd: 'Add-Ticket',
    },
    query: {
      beginTime: 'Start Date',
      endTime: 'End Date',
      chooseTime: 'Choose Date',
      assignTo: 'Assign to',
      status: 'Ticket Status',
      type: 'Ticket Type',
      priority: 'Priority',
      bikeId: 'Bike ID',
      phone: 'User Number',
      countryId: 'Country',
      cityId: 'City',
      faultId: 'Ticket ID',
      query: 'Query',

      all: 'All',
      assignTo1: 'Custom Service',
      assignTo2: 'On-ground Driver',

      priority1: 'High',
      priority2: 'Medium',
      priority3: 'Low',
      priority0: 'None'
    },
    table: {
      id: 'Ticket ID',
      createdAt: 'Report time',
      type: 'Ticket Type',
      phone: 'Reporter number',
      bikeId: 'Bike ID',
      address: 'Bike Address',
      assignTo: 'Assign To',
      status: 'Ticket Status',
      priority: 'Priority',
      remark: 'Remark',
      operate: 'More',

      detail: 'Detail'
    },
    dialog: {
      title: 'Are u sure to batch ignore？',
      title1: 'Confirm all processing?',
      bikeIds: 'Bike ID',
      faults: 'Totally {faults} tickets',
      count: 'Tickets',
      cancel: 'Cancel',
      ok: 'Confirm',
    },
    js: {
      all: 'All',
      type1: 'Cannot unlock',
      type2: 'Faulty Bike',
      type3: 'Parking violation',
      type4: 'Cannot Find Bike',
      type5: 'Unable to Stop Billing',

      type13: 'Others',
      type30: 'Volatge Lower Than 3.5V',
      type31: '72 Hours No Use',
      type32: 'Riding More Than 6 hours',

      status0: 'New',
      status1: 'Done',
      status2: 'Ignored',
      status3: 'Appeals',

      optStatus1: 'Normal',
      optStatus2: 'Reported Faulty',
      optStatus3: 'Disabled',

      optAdmin: 'Operations Commissioner',

      assignTo1: 'Custom Service',
      assignTo2: 'On-ground Driver',

      priority1: 'High',
      priority2: 'Medium',
      priority3: 'Low',
      priority0: 'None',
    }
  },

  reportInfo: {
    box: {
      title1: 'Ticket Details',
      title2: 'Bike Location When Report- Current Bike Location',
      title3: 'Reporter Info',
      title4: 'Reported User Info',
      title5: 'BiKe Status',
      title6: 'Last Trip Record',
      title7: 'Ticket Process',
      title8: 'Ticket Ops History',
      title9: 'Pending Tickets Summarise',
      title10: 'Trip Record Before Report',
    },
    table1: {
      type: 'Ticket Type',
      bikeId: 'Bike ID',
      createdAt: 'Report Time',
      address: 'Bike Location When Report',
      content: 'Faulty Type',
      remark: 'Ticket Descirption',
      img: 'Ticket Pic',
    },
    table2: {
      tip: 'Pending Ticket',
      phone: 'Mobile Phone',
      email: 'Email',
      credit: 'Credit Point',
      reportCount: 'Report History',
      beReportedCount: 'Reported Hisory',
      balance: 'Wallet Balance',
    },
    table3: {
      phone: 'Mobile Phone',
      email: 'Email',
      credit: 'Credit Point',
      isDone: 'Whether the reported user has been deduct point',
      isDoneY: 'Yes',
      isDoneN: 'No',
      reportCount: 'Report History',
      beReportedCount: 'Reported Hisory',
      balance: 'Wallet Balance',
    },
    table4: {
      bikeId: 'Bike ID',
      status: 'Status',
      electricity: 'Voltage',
      useTime: 'Last-trip Time',
      optStatus: 'Operation Status',
      address: 'Bike Address',
    },
    table5: {
      orderNo: 'Trip ID',
      lockType: 'End Type',
      startTime: 'Last-trip Time',
      phone: 'Last User',
      reportedMan: 'Reported User Or Not',
      reportMan: 'Report User Or Not',
      yes: 'Yes',
      no: 'No',
      minutes: 'Last Trip Duration',
      distance: 'Last Trip Distance',
      beginAddress: 'Start Point',
      endAddress: 'End Point',

      status: 'Trip Status',
      status1: 'Reserving',
      status2: 'Cancel Reserve',
      status3: 'Riding',
      status4: 'Trip End',
      status5: 'Trip End',
    },
    table6: {
      priority: 'Mark As',
      priority1: 'High',
      priority2: 'Medium',
      priority3: 'Low',
      priority0: 'Cancel Mark',

      assignTo: 'Assign To',
      credit: 'Points',
      on: 'Yes',
      off: 'No',
      score: 'Will Deduct',
      score1: 'Already Deducted',
      addCredit: 'Reporter +{score} Points',
      minusCredit: 'Reported -{score} Points',
      sendNoti: 'Send Message',
      yes: 'Yes',
      no: 'No',
      reporter: 'Send to Reporter',
      reported: 'Send to Reported',

      handleDesc: 'Remarks',
      handle: 'Handle',
      save: 'Save',
      handleConfirm: 'Done',
      handleIgnore: 'Ignore',
      mailto: 'Send Email',
    },
    table7: {
      report: 'Ticket',
      desc: 'Ticket Description',
      to: 'To',
      beforePriority: 'Priority',
      from: 'From',
      beforeStatus: 'Status',
      addRemark: 'Add Remark',
    },
    table9: {
      type1: 'Cannot Unlock',
      type2: 'Faulty Bike',
      type3: 'Parking Violation',
      type4: 'Cannot Find Bike',
      type5: 'Still Charging',
      type6: 'Others',
      type30: 'Voltage Lower than 3.5V',
      type31: '72 Hours No Use',
      type32: 'Riding Over 2/4 Hours',
    },
    table10: {
      tip: 'Last Trip Or Not',
      orderNo: 'Trip ID',
      status: 'Trip Status',
      lockType: 'End Type',
      startTime: 'Trip Time',
      phone: 'User',
      reportedMan: 'Reported User Or Not',
      reportMan: 'Report User Or Not',
      yes: 'Yes',
      no: 'NO',
      minutes: 'Trip Duration',
      distance: 'Trip Distance',
      beginAddress: 'Start Point',
      endAddress: 'End Point',
    },
    js: {
      assignTo1: 'Custom Service',
      assignTo2: 'On-ground Driver',

      bikeStatus0: 'Inactived',
      bikeStatus1: 'Normal',
      bikeStatus2: 'Reserved',
      bikeStatus3: 'Riding',
      bikeStatus4: 'Unlocking',
      bikeStatus5: 'Disabled',

      optStatus1: 'Normal',
      optStatus2: 'Reported Faulty',
      optStatus3: 'Dsiabled',
      optStatus4: 'Repaired Not Deploy',
      optStatus0: 'Inactivated',

      lockType1: 'Normal',
      lockType2: 'Next User Update',
      lockType3: 'Operation End',
      lockType6: 'User End-Trip',

      to: 'To',
      beforePriority: 'Priority',
      from: 'From',
      beforeStatus: 'Status',

      priority1: 'High',
      priority2: 'Medium',
      priority3: 'Low',
      priority0: 'None',

      status0: 'New',
      status1: 'Done',
      status2: 'Ignored',
      status3: 'Appeals',
    }
  },

  addReport: {
    box: {
      title: 'Add Ticket',
      goBack: 'Back',
    },
    form: {
      type: 'Ticket Type',
      bikeId: 'Bike ID',
      bikeIdPlaceHolder: 'Pls Enter Bike ID',
      phone: 'User Number',
      phonePlaceHolder: 'Pls Enter User Number',
      content: 'Faulty Descreption',
      img: 'Picture',
      upload: 'Upload',
      uploadTip: 'Pls upload jpg / png file, no more than 500kb',
      assignTo: 'Assign To',
      priority: 'Add a tag',
      priority1: 'High',
      priority2: 'Medium',
      priority3: 'Low',
      priority0: 'Cancel Mark',
      remark: 'Remark',
      save: 'Save',
    },
    js: {
      type1: 'Cannot Unlock',
      type2: 'Faulty Bike',
      type3: 'Parking Violation',
      type4: 'Cannot Find Bike',
      type5: 'Still Charging',
      type6: 'Others',
      type30: 'Voltage Lower than 3.5V',
      type31: 'Riding More Than 2/4 Hours',
      type32: '72 Hours No Use',

      assignTo1: 'Custom Service',
      assignTo2: 'On-ground Driver',
    }
  },

  sms: {
    box: {
      title: 'SMS Management',
      goAdd: 'Send SMS',
    },
    query: {
      beginTime: 'Start Date',
      endTime: 'End Date',
      chooseTime: 'Choose Date',
      phone: 'User Number',
      sender: 'Sender',
      countryId: 'Country',
      provider: 'Operator',
      action: 'Type',
      type: 'Sms or Voice',
      success: 'Succeeded Or Not',
      query: 'Query',
    },
    table: {
      id: 'ID',
      phone: 'Receiver Number',
      createdAt: 'Send Time',
      sender: 'Sender',
      context: 'Content',
      provider: 'Operator',
      success: 'Result',
      resultInfo: 'Reason',
      type: 'Sms or Voice',
      ip: 'IP',
      mask: 'Type',
    },
    js: {
      all: 'All',
      success: 'Successfully',
      fail: 'Failed',
      inprocess: 'Sending...',
      sms: 'Sms',
      voice: 'Voice'
    },
  },

  addsms: {
    box: {
      title: 'SMS Management',
      goBack: 'Back',
    },
    form: {
      template: 'Select Template',
      countryId: 'Country',
      message: 'Message',
      messagePlaceholder: 'No more than 140 characters',
      phone: 'Send To',
      phonePlaceholder: 'Enter the user\'s phone number, Press "Enter" for Multiple user',
      isBlackLimit: 'Enable the blacklist or Not',
      remark: 'Remark',
      submit: 'Submit',
      clear: 'Clear',
    },
    js: {
      template1: 'Blank template',
      template2: 'Close the reminder',
      template3: 'Trip End Reminder',
      template4: 'Apologize Template',
    },
  },

  smsTemplate: {
    query: {
      title: 'SMS Template',
      goAdd: 'Add Template',
      name: 'Template Name',
      query: 'Query',
    },
    table: {
      id: 'ID',
      name: 'Template Name',
      language: 'Language',
      content: 'Template Content',
      operate: 'Operate',
      edit: 'Edit',
      delete: 'Delete',
    },
    dialog: {
      title: 'Add Template',
      title1: 'Edit Template',
      name: 'Template Name',

      language: 'Language',
      content: 'Content',
      operate: 'Operate',
      edit: 'Edit',
      finish: 'Save',
      delete: 'Delete',

      add: 'Add Language',
      cancel: 'Cancel',
      ok: 'Save',
    },
    js: {
      deleteMessage: 'Are u sure to delete Template {name}?',
      tip: 'Tip',
      ok: 'Confirm',
      cancel: 'Cancel',
    }
  },

  smsLimit: {
    query: {
      title: 'SMS Blacklist',
      goAdd: 'Add',
      countryId: 'Country',
      phone: 'Telphone',
      query: 'Query',
    },
    table: {
      id: 'ID',
      countryId: 'Country Code',
      phone: 'Telphone',
      remark: 'Remark',
      operate: 'Operate',
      edit: 'Edit Remark',
      delete: 'Delete'
    },
    dialog: {
      title: 'Add to blacklist',
      title1: 'Add remarks'
    },
    form: {
      countryId: 'Country',
      phone: 'Phone number',
      placeholder: 'If there are several phone numbers, please use placeholder to separate',
      remark: 'Remark',
      cancel: 'Cancel',
      submit: 'Submit'
    },
    js: {
      deleteBlack: 'Are you sure to delete {phone} from blacklist?',
      textTip: 'The Data is Incorrect, please enter again',
      tip: 'Delete blacklist',
      ok: 'Delete',
      cancel: 'Cancel'
    }
  },

  student: {
    box: {
      title: 'Student Card Review',
      title1: 'Batch Approve',
    },
    query: {
      beginTime: 'Begin Date',
      endTime: 'End Date',
      chooseTime: 'Choose Date',
      countryId: 'Country',
      status: 'Status',
      phone: 'User Number',
      studentNumber: 'Student ID',
      query: 'Query',
    },
    table: {
      id: 'ID',
      phone: 'User Number',
      createdAt: 'Submit Time',
      name: 'Name',
      school: 'School Name',
      studentNumber: 'Student ID',
      img: 'Pic',
      period: 'Valid period of the student card',
      status: 'Status',
      remark: 'Remark',
      operate: 'Operate',
      detail: 'Detail',
      apply: 'Approve',
    },
    dialog: {
      title: 'Confirm to batch approve the student?',
      sendNoti: 'Send Message',
      yes: 'Yes',
      no: 'No',
      ok: 'Ok',
      cancel: 'Cancel',
    },
    js: {
      all: 'All',
      status0: 'New',
      status1: 'Approve',
      status2: 'Disappove',

      confirm: 'Confirm to approve student {phone} ?',
      confirmAll: 'Confirm to batch approve the student?',
      tip: 'Tip',
      ok: 'Ok',
      cancel: 'Cancel',
    }
  },

  studentInfo: {
    box: {
      title: 'Review Operation',
      title1: 'Reason ',
      title2: 'Review Process',
      title3: 'Operation History',
    },
    table1: {
      phone: 'User Number',
      name: 'User Name',
      school: 'School',
      studentNumber: 'Student ID',
      period: 'Valid period of the student card',
      img: 'Review the picture',
    },
    table2: {
      status: 'Review tatus',
      do: 'Change',
      undo: 'Undo',
      period: 'Valid period of the student card',
      beginTime: 'Start Date',
      endTime: 'End Date',
      reason: 'Why to disapprove',
      reasonPlaceHolder: 'Please enter the reason for the failure',
      operate: 'Operate',
      apply: 'Approve',
      upapply: 'Disapprove',
      sendNoti: 'Send Message',
      yes: 'Yes',
      no: 'No',
    },
    table3: {
      createdAt: 'Operation Time',
      name: 'Operator',
      remark: 'Remark',
    },
    js: {
      notClear: 'The picture is not clear',
      notMatch: 'The info does not match with your ID card',
      expired: 'Expired student card',
      invalid: 'Invalid student card',
      incomplete: 'The info is incomplete',
      notCard: 'Pls upload student Card Pic',
      other: 'Other',

      zh: 'Chinese',
      en: 'English',
      tw: 'Traditional Chinese',
    }
  },

  monitor: {
    box: {
      title1: 'Bike Monitoring',
      title2: 'Bike List -- Total {length} '
    },
    query: {
      bikeId: 'Bike ID',
      bikeIdPlaceHolder: 'Please enter the bike ID',
      status: 'Bike Status',
      optStatus: 'Operation Status',
      radius: 'Search Range',
      address: 'Address',
      addressPlaceholder: 'Please enter the address to automatically search and select the address',
      clearAddress: 'Clear address',
      showMap: 'Show Map',
      query: 'Query',
    },
    table: {
      id: 'ID',
      status: 'Bike Status',
      optStatus: 'Operation User',
      electricity: 'Voltage',
      useTime: 'Voltage update time',
      address: 'Current Address',
      operate: 'Operate',
      detail: 'Detail',
      setCenter: 'Locate the map',
      goTrip: 'View trip record',
      goReport: 'View pending ticket',
      reset: 'Reset the bike location',
    },
    dialog: {
      title0: 'Detail',
      title1: 'Bike Info',
      id: 'Bike ID',
      optStatus: 'Operation Status',
      status: 'Bike Status',
      electricity: 'Volatage',
      address: 'Current Address',

      title2: 'Bike Trip Record',
      orderNo: 'Trip ID',
      userId: 'User ID',
      price: 'Trip Cost',
      minutes: 'Trip Duration',
      distance: 'Trip Distance',
      startTime: 'Start Time',
      endTime: 'End Time',
    },
    js: {
      all: 'All',
      status0: 'Inactive',
      status1: 'Normal',
      status2: 'Reserved',
      status3: 'Riding',
      status4: 'Unlocking',
      status5: 'Disabled',

      optStatus0: 'Inactive',
      optStatus1: 'Normal',
      optStatus2: 'Reported Faulty',
      optStatus3: 'Disabled',
      optStatus4: 'Repaired Not Depoly',

      radius1: 'Within 1 km',
      radius3: 'Within 3 km',
      radius5: 'Within 5 km',
      radius10: 'Within 10 km',

      id: 'Bike ID',
      optStatus: 'Operation Status',
      status: 'Bike Status',
      electricity: 'Voltage',

      resetTitle: 'Are U sure to reset location of Bike {bikeId} to make it disappeared in user app map ?',
      tip: 'Reminder',
      ok: 'Confirm',
      cancel: 'Cancel',
    }
  },

  trip: {
    query: {
      title: 'Trip Record',

      startTime: 'Start Date',
      endTime: 'End Date',
      chooseTime: 'Choose Date',
      phone: 'User Number',
      bikeId: 'Bike ID',
      status: 'Trip Status',
      lockType: 'Trip End Type',
      countryId: 'Country',
      cityId: 'City',

      query: 'Query',
    },
    table: {
      id: 'Trip ID',
      phone: 'User Number',
      bikeId: 'Bike ID',
      tradeNo: 'Lock Transaction Number',
      minutes: 'Trip Duration(min)',
      distance: 'Trip Distance(m)',
      area: 'Bike Ops Country',
      startTime: 'Start Time',
      tempEndTime: 'User End-Trip in app Time',
      endTime: 'Actual Bike Locked Time',
      price: 'Payable Trip Fee',
      actualPrice: 'Actual Trip Cost',
      reason: 'Deduction Reason',
      status: 'Trip Status',
      lockType: 'Trip End Way',
      operate: 'Operate',
      stopTrip: 'End Trip',
      payBack: 'Pay Back',
    },
    dialog: {
      title: 'Are you sure to end the trip?',
      title1: 'Are you sure to pay back?',
      time: 'Please confirm the trip end time(min):',
      startTime: 'Start Time',
      endTime: 'End Time',
      sendNoti: 'Send Message',
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      ok: 'Confirm',
      phone: 'User Number',
      amount: 'Refund Amount',
      remark: 'Remark',
      amountTips: 'The refund amount is greater than 0 and less than or equal to {actualPrice}',
    },
    js: {
      all: 'All',
      status1: 'Reserved',
      status2: 'Cancel Reservation',
      status3: 'Riding',
      status4: 'Trip End',
      status5: 'Trip End',

      lockType1: 'Normal',
      lockType2: 'Next User Update',
      lockType3: 'Operation End',
      lockType6: 'User End-Trip',

      reason1: 'Free Day',
      reason2: 'Coupon',
      reason3: 'VIP',
      reason4: 'SVIP',
      reason5: 'SVIP Family Members',
      reason6: 'Enterprise',

    }
  },

  tag: {
    query: {
      title: 'Depoly Tag Management',
      countryId: 'Country',
      cityId: 'City',
      categoryId: 'Tag Category',
      type: 'Tag Type',
      modifyTime: 'Modify Time',
      chooseTime: 'Choose Time Range',
      name: 'Deploy Tag',
      coordinate: 'Search Location',
      coordinatePlaceholder: 'Longitude and latitude seperated with comma',
      singleAdd: 'Add One',
      batchAdd: 'Batch Import',
      query: 'Query',
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      cityName: 'City',
      type: 'Tag Type',
      categoryName: 'Tag Category',
      name: 'Deploy Tag',
      coordinate: 'Longitude/Latitude',
      remark: 'Comment',
      updatedAt: 'Update at',
      updatedName: 'Operator',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Detail',
      goBike: 'Check Bike',
      deleteTag: 'Delete',
      uploadNote: 'Note：One file belongs to One City',
      uploadText: 'Upload',
      uploadTip: 'Only accept xls/xlsx, and less than 2M'
    },

    js: {
      all: 'All',
      type1: 'Deploy Tag',
      deleteMessage: 'Confirm to delete the tag：{name}?',
      tip: 'Reminder',
      ok: 'Confirm',
      cancel: 'Cancel',
      exceed: 'Upload one file at a time, again please remove the previously uploaded file first.'
    }
  },

  addTag: {
    form: {
      title: 'Add Tag',
      goBack: 'Back',
      countryId: 'Country',
      cityId: 'City',
      type: 'Tag Tyoe',
      categoryId: 'Tag Category',
      name: 'Tag Name',
      coordinate: 'Longitude/Latitude',
      coordinatePlaceholder: 'Longitude and latitude seperated with comma',
      remark: 'Comment',
      submit: 'Save',
    },
  },

  category: {
    query: {
      title: 'Tag Category Management',
      countryId: 'Country',
      cityId: 'City',
      type: 'Tag Tyoe',
      modifyTime: 'Modify Time',
      chooseTime: 'Choose Time Range',
      query: 'Query',
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      cityName: 'City',
      type: 'Tag Tyoe',
      name: 'Tag Category',
      coordinate: 'Longitude/Latitude',
      remark: 'Comment',
      updatedAt: 'Update At',
      updatedName: 'Operator',
      operate: 'Operator',
      edit: 'Edit',
      deleteCategory: 'Delete',
    },
    form: {
      title: 'Tag Category Management',
      countryId: 'Country',
      cityId: 'City',
      type: 'Tag Tyoe',
      name: 'Tag Category',
      remark: 'Comment',
      cancel: 'Cancel',
      submit: 'Save',
    },
    js: {
      all: 'All',
      type1: 'Deploy Tag',
      deleteMessage: 'Are u sure to delete tag category：{name}?',
      deleteMessage1: 'There are {len} tags in this category，pls delete the tag before you delete the category',
      tip: 'Reminder',
      ok: 'Confirm',
      cancel: 'Cancel',
    }
  },

  // 停车区域管理 zhu 2017/04/13
  bikearea: {
    query: {
      title: 'Parking Area Management',
      countryId: 'Country',
      cityId: 'City',
      usingFlag: 'Status',
      parking: 'Setting Area',
      query: 'Query'
    },
    table: {
      id: 'ID',
      country: 'Country',
      city: 'City',
      state: 'Status',
      parking: 'Setting Area',
      areaNum: 'Parking Point',
      file: 'File',
      download: 'Click download',
      remark: 'Comment',
      operate: 'Operate',
      edit: 'Edit State',
      view: 'Detail',
      import: 'Import Data'
    },
    dialog: {
      title: 'Parking area setting'
    },
    js: {
      status: 'All',
      status0: 'Disabled',
      status1: 'Active',
      failure: 'File Upload Failed！',

      all: 'All',
      parking0: 'Forbidden Area',
      parking1: 'Parking Area',

      uploadTip: 'Upload Only one .xls/.xlsx Files',
      uploadMust: 'Select Upload File',
      uploadOnly: 'Only one file is allowed, delete forward before choose again'
    },
    form: {
      countryId: 'Country',
      cityId: 'City',
      usingFlag: 'Parking Area',
      usingNotFlag: 'Parking Area',
      remark: 'Comment',
      remarkTip: 'Within 500 words',
      remarkError: 'More than 500 words, please submit it after revision',
      importUsing: 'Parking Area File',
      importNotUsing: 'Forbidden Area File',
      choose: 'Choose File ',
      upload: 'Upload Immediatley',
      uploadTip: 'File Type',
      cancel: 'Cancel',
      submit: 'Submit'
    },
    edit: {
      title: 'Change Area Status',
      countryId: 'Country',
      cityId: 'City',
      usingFlag: 'Status',
      remark: 'Comment'
    },
    imports: {
      title: 'Import Data',
      countryId: 'Country',
      cityId: 'City',
      import: 'Import File',
      choose: 'Choose File',
      remark: 'Comment',
      cancel: 'Cancel',
      submit: 'Confirm'
    }
  },

  bikeareainfo: {
    form: {
      title: 'Parking Area Detail',
      basic: 'Basic Info',
      operator: 'Operation Record'
    },
    table: {
      country: 'Country',
      city: 'City',
      state: 'Status',
      areaNum: 'Parking Point',
      remark: 'Comment',
      operateTime: 'Operation Time',
      activity: 'Action',
      operater: 'Operator',
      operate: 'Operate'
    }
  },

  user: {
    query: {
      title: 'User Info',
      createdAt: 'Start Date',
      endTime: 'End Date',
      chooseTime: 'Choose Date',
      phone: 'User Number',
      memberId: 'User ID',
      countryId: 'Country',
      query: 'Query',
    },
    table: {
      memberId: 'User ID',
      createdAt: 'User registration time',
      phone: 'User Number',
      name: 'Country',
      cyclingMinutes: 'Total Trip Duration(min)',
      mileage: 'Total Trip Distance(m)',
      cyclingCount: 'Total Trips',
      credit: 'Credit Point',
      deposit: 'Deposit',
      balance: 'Account Balance',
      status: 'Account Status',
      sportsAchievement: 'Total Calory Consumption',
      carbonEmissions: 'Total Carbon Emissions Save',
      operate: 'Operate',
      trip: 'Trip Record',
      pay: 'Payment Detail',
      trade: 'Transaction Details',
      creditDetail: 'Credit Point',
      device: 'User Device Info',
      userCoupon: 'User Coupon',
      addUserCoupon: 'Send Coupon',
      goAddBalance: 'Adjust Balance',
      goPushMessage: 'Message push',
      sms: 'Send SMS',
      statusBtn1: 'Froze This Account',
      statusBtn0: 'Make IT To Normal',
      viewVipUsers: 'View User Members',
      vipGift: 'Present a Member'
    },
    js: {
      status0: 'Frozen',
      status1: 'Normal',
      statusString0: 'Change this user to normal status?',
      statusString1: 'froze this user?',
      tip: 'Reminder',
      ok: 'Confirm',
      cancel: 'Cancel',
    },
    dialog: {
      gift: 'Present a Member',
      countryId: 'Country',
      phone: 'Telphone',
      vipLimit: 'Membership Period',
      day: 'Day',
      cardinfo: 'Membership Card Information',
      name: 'Membership Card Name:',
      days: 'Membership Card Days:',
      empty: 'None',
      price: 'Membership Card Price:',
      limited: 'Membership Card Limit:',
      limitedC: 'Daily {freeTimesPerDay} times free trips limited in {freeMinutes} mins each.',
      nolimited: 'No Times Limits, No time Limit',
      renew: 'Renewals Price:',
      promotion: 'Promotional Price:',

      isSendMessage: 'Send Message to User',
      yes: 'Yes',
      no: 'No',

      cancel: 'Cancel',
      ok: 'OK'
    }
  },

  device: {
    query: {
      title: 'User Device Info',
      phone: 'Mobile Number',
      countryId: 'Country',
      firebaseToken: 'FireBase Token',
      deviceName: 'Device Name',
      version: 'System Version',
      language: 'System Language',
      query: 'Query',
    },
    table: {
      id: 'ID',
      phone: 'User Number',
      country: 'Country',
      firebaseToken: 'FireBase Token',
      deviceName: 'Device Name',
      deviceId: 'Device ID',
      appVersion: 'App Version',
      version: 'System Version',
      language: 'System Language',
    }
  },

  userCoupon: {
    query: {
      title: 'User Coupon',
      goAdd: 'Send Coupon',
      phone: 'User Number',
      used: 'Coupon Status',
      couponType: 'Promotion Channel',
      query: 'Query',
    },
    table: {
      id: 'ID',
      phone: 'User Number',
      createdAt: 'Added Time',
      couponType: 'Promotion Channel',
      benefitMoney: 'Coupon Content',
      days: 'Coupon Validity',
      area: 'Limited Area',
      used: 'Coupon Status',
      operate: 'Operate',
      detail: 'Detail',
      addUserCoupon: 'Send Coupon',
    },
    js: {
      all: 'All',
      used0: 'New',
      used1: 'Used',
      used2: 'Expired',

      couponType1: 'Invite Code',
      couponType2: 'Promo Code',
      couponType3: 'Referral Reward',
      couponType4: 'Operation Delivery',
      couponType5: 'Coupon after user registration',
      couponType7: 'Reward System Coupons',

      unRegister: 'Not Registered Yet',
    }
  },

  addUserCoupon: {
    form: {
      title: 'Send Coupon',
      memberCountryId: 'Country',
      memberPhone: 'User Number',
      quantity: 'Coupon Quantity',
      couponId: 'Exchange Coupon',
      toAdd: 'Add Coupon',
      detail: 'Coupon Detail',
      content: 'Common Promo Code',
      days: 'Validity',
      area: 'Limited Area',
      sendNoti: 'Send Message',
      yes: 'Yes',
      no: 'No',
      submit: 'Submit',
    },
    js: {
      type: 'Common Promo Code',
      status1: 'Actived',
      status2: 'Disabled',
      day: 'Day',
      benefitType1: 'Discount',
      benefitType2: 'Cash',
    }
  },

  userCouponInfo: {
    table: {
      title1: 'Basic Info',
      title2: 'Coupon Channel',
      title3: 'Consumption Condition',

      id: 'Coupon ID',
      phone: 'User Number',
      createdAt: 'Added Time',
      used: 'Coupon Status',
      couponType: 'Coupon Type',
      benefitMoney: 'Promotion Content',
      area: 'Limited Area',
      days: 'Validity',
    },
    table1: {
      couponType: 'Coupon Channel',

      inviteCode: 'Invite Code',
      inviteMemberPhone: 'Inviter',

      exchangeCode: 'Promotion code',
      exchangeQuantity: 'Exchange Amount',
      benefitMoney: 'Exchanged Coupon',
      exchangeDays: 'Validity',

      fromMemberPhone: 'Invitee',
      ifFinishRide: 'Invitee Whether Finished Trip Or Not',
      ifFinishRideValue: 'Yes',
      trip: 'Trip Record',

      sendQuantity: 'Delivery Quantity',
      benefitMoney1: 'Delivery Coupon Content',
    },
    table2: {
      orderNo: 'Trip ID',
      bikeId: 'Bike ID',
      minutes: 'Trip Duration',
      distance: 'Trip Distance',
      price: 'Payable Trip Cost',
      actualPrice: 'Actual Trip Cost',
      reason: 'Deduction Reason',
      startTime: 'Start Time',
      endTime: 'End Time',
    },
    js: {
      all: 'All',
      status1: 'Reserved',
      status2: 'Cancel Reservation',
      status3: 'Riding',
      status4: 'Trip End',
      status5: 'Trip End',

      lockType1: 'Normal',
      lockType2: 'Next User Update',
      lockType3: 'Operation End',
      lockType6: 'User End-Trip',

      reason1: 'Free Ride',
      reason2: 'Coupon',
      reason3: 'Membership',
    }
  },

  uservip: {
    query: {
      title: 'User Membership Information',
      countryId: 'Country',
      phone: 'User\'s Telphone',
      datetimerange: 'Start and End Time',
      chooseTime: 'Select Time Range',
      vipsource: 'Member Source',
      viptype: 'Membership Period',
      status: 'Member Status',
      autopay: 'Whether to Automatically Renew',
      query: 'Query',
      giftvip: 'Preset a Member',
      automng: 'Automatic renewal management',
      superVip: 'Membership Type'
    },
    table: {
      id: 'ID',
      phone: 'Telphone',
      countryId: 'Country',
      viptype: 'Membership Period',
      vipsource: 'Member Source',
      gettime: 'Gain Time',
      effectivetime: 'Effective Date',
      deadlinetime: 'Maturity Date',
      status: 'Member Status',
      autopay: 'Whether to Automatically Renew',
      operate: 'Operate',
      giftvip: 'Present a Member',
      cancelvip: 'Cancel the Member',
      delayvip: 'Membership Extension',
      day: 'Day'
    },
    dialog: {
      giftvip: 'Present a Member',
      countryId: 'Country',
      phone: 'Telphone',
      vipLimit: 'Membership Period',
      day: 'Day',
      cardinfo: 'User Membership Information',
      name: 'Membership Card Name:',
      days: 'Membership Card Days',
      empty: 'None',
      price: 'Membership Card Price:',
      limited: 'Membership Card Limit',
      limitedC: 'Daily {freeTimesPerDay} times free trips limited in {freeMinutes} mins each.',
      nolimited: 'No times Limit, No time Limit.',
      renew: 'Renewals Price:',
      promotion: 'Promotional Price:',
      isSendMessage: 'Send Message to Users',
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      ok: 'OK',
      cancelvip: 'Cancel Membership',
      payway: 'Payment for the Member\'s purchase',
      cancelTip: 'Click OK after the balance payment part will automatically return to the user account, credit card payment part of the need to manually return.',
      delayvip: 'Membership Extension'
    },
    js: {
      all: 'All',
      unknown: 'Unknown',

      buyCard: 'User Purchase',
      giveCard: 'Present',
      delayCard: 'Membership Extension',

      canceled: 'Canceled',
      valid: 'In Effect',
      invalid: 'Inoperative',
      overdue: 'Expired',

      no: 'No',
      yes: 'Yes',

      others: '(with extension)',

      nonSuperVip:'Ordinary Vip',
      superVip:'Super Vip'
    }
  },

  // 自动续费管理 2017.10.27 zhu
  autopay: {
    query: {
      title: 'Cancel users’ autopay',
      autocancel: 'Cancel users’ automatic renewal record ',
      countryId: 'Country',
      phone: 'phone number',
      days: 'Membership end day',
      query: 'Query',
      tip: 'This page only list all the users’ information for automatic renewal, users who are not listed don’t renew automatically'
    },
    table: {
      id: 'ID',
      phone: 'Phone number',
      countryId: 'Country',
      days: 'Membership end day',
      renewPrice: 'Price of automatic renewal',
      renewTime: 'Next renew time',
      operate: 'Operate',
      cancelauto: 'Cancel automatic renewal'
    },
    js: {
      deleteMessage: 'Are you sure to cancel automatic renewal by {name} ？',
      tip: 'Tip',
      ok: 'OK',
      cancel: 'Cancel'
    }
  },

  autocancel: {
    query: {
      title: 'Cancel automatic renewal record in admin',
      phone: 'Phone number',
      countryId: 'Country',
      adminPhone: 'Operator’s phone number',
      query: 'Query',
      back: 'Back'
    },
    table: {
      id: 'ID',
      phone: 'Phone number',
      countryId: 'Country',
      admin: 'Operator',
      createdAt: 'Operator’s phone number'
    }
  },

  // 用户奖励信息 2018.01.11
  redpacket: {
    query: {
      title: 'User Rewards',
      datetimerange: 'Reward time range',
      countryId: 'Country',
      cityId: 'City',
      phone: 'Phone',
      bikeId: 'Bike ID',
      rewardType: 'Reward type',
      rewardName: 'Reward Name',
      receivedType: 'Received Type',
      receivedMethod: 'Received Method',
      query: 'Query'
    },

    table: {
      id: 'ID',
      bikeId: 'Bide ID',
      phone: 'Phone',
      countryId: 'Country',
      cityId: 'City',
      getTime: 'Get time',
      rewardType: 'Reward type',
      rewardName: 'Reward name',
      rewardContent: 'Content',
      check: 'Check',
      errorReason: 'Error Reason',
      rewardReasonType: 'Method',
      tripRecord: 'Trip Rec',
      operate: 'Operate'
    },
    dialog: {
      title: 'Reward Content',
      expiredTime: 'Expire TIme',
      region: 'Valid Region',
    },

    js: {
      all: 'All',
      rewardType1: 'Partner Redpacket',
      rewardType2: 'Reward Activity',

      receivedType0: 'Fail',
      receivedType1: 'Success',
      receivedType2: 'Unaccalimed',

      rewardReasonType1: 'Bike Icon',
      rewardReasonType2: 'Geo Fence',

      benefitType1: 'Discount',
      benefitType2: 'Cash',
    }
  },

  credit: {
    query: {
      title: 'Credit Management',
      beginTime: 'Start Date',
      endTime: 'End Date',
      chooseTime: 'Choose Date',
      phone: 'User Number',
      subject: 'Change Reason',
      query: 'Query',
    },
    table: {
      id: 'Point ID',
      phone: 'User Number',
      currentAmount: 'Change From',
      amount: 'Points',
      afterChangeAmount: 'New Point',
      subjectName: 'Change Reason',
      createName: 'Operator',
      createdAt: 'Operation Time',
      desc: 'Comment',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Detail',
    }
  },

  addCredit: {
    form: {
      title: 'Point Add Record',
      phone: 'User Number',
      credit: 'Current Point',
      subject: 'Change Reason',
      creditChange: 'Point Change',
      remark: 'Update Comment',
      remarkPlaceholder: 'No More Than 100 Character',
      submit: 'Submit',
    },
    js: {
      subject1: 'Registeration',
      subject2: 'A Normal Trip',
      subject3: 'Report Bike Faulty',
      subject4: 'Report Parking Violation',
      subject5: 'Invite Friends To Sign Up',
      subject6: 'Enter Invite Code',
      subject7: 'Share Trip Firstly',
      subject8: 'Illgeal Parking',
      subject9: 'Forgot To Lock,Bike Not Lost',
      subject10: 'Broke Traffic Rule',
      subject11: 'Add Private Lock',
      subject12: 'Forgot Lock, Bike Lost',
      subject13: 'Moving Bike Illegally',
      subject14: 'Be Reported To Violate',
      subject15: 'Share Bonus',
      subject16: 'Others',
      subject17: 'Park in Restrict Zone',
      subject18: 'Park in Pakring Zone',
      subject19: 'Park in Pakring Point',
      subject20: 'Park in Control Zone',
      subject21: 'Bick Icon Reward',
      message: 'No User Found',
    }
  },

  trade: {
    query: {
      title: 'Transaction Details Management',
      goAdd: 'Adjust Balance',
      beginTime: 'Start Date',
      endTime: 'End Date',
      chooseTime: 'Choose Date',
      phone: 'User Number',
      subject: 'Trade For',
      statementNo: 'Transaction Unique Number',
      tradeNo: 'Payment Unique Number',
      paid: 'Result',
      countryId: 'Country',
      query: 'Query',
    },
    table: {
      id: 'Transaction ID',
      payTime: 'Transaction Time',
      statementNo: 'Transaction Unique Number',
      tradeNo: 'Payment Unique Number',
      phone: 'User Number',
      currentDeposit: 'Deposit',
      currentBalance: 'Balance',
      amount: 'Tranction Amount',
      payFee: 'Fee',
      subjectName: 'Paid For',
      paid: 'Result',
      isDirty: 'Status',
      operate: 'Operate',
      detail: 'Detail',
    },
    dialog: {
      title1: 'Transaction Detail',
      title2: 'Basic Info',
      title3: 'Transaction Record',
      title4: 'Details',

      payTime: 'Transaction Time',
      phone: 'User Number',
      subjectName: 'Transaction Type',
      amount: 'Transaction Amount',
      afterChangeBalance: 'Account Balance',

      payMethod: 'Payment Method',
      statementNo: 'Transaction Unique Number',
      tradeNo: 'Payment Unique Number',
      cardType: 'Card Type',
      paid: 'Result',

      orderNo: 'Trip ID',
      bikeId: 'Bike ID',
      minutes: 'Trip Duration',
      distance: 'Trip Distance',
      price: 'Payable Amount',
      actualPrice: 'Actal Paid',
      reason: 'Deduction Reason',
      lockType: 'End Trip Way',
      startTime: 'Start Time',
      tempEndTime: 'User End-Trip Time',
      endTime: 'Actual end time',
      startAddress: 'Start Point',
      endAddress: 'End Point',
    },
    js: {
      all: 'All',
      paid1: 'Paid',
      paid0: 'Unpaid',

      subject1: 'Pay For Deposit',
      subject2: 'Balance Top-Up',
      subject3: 'Deposit Refund',
      subject4: 'Operating Delivery',
      subject5: 'Trip Cost',
      subject6: 'Fine',
      subject7: 'Membership',
      subject8: 'Consumption refund',
      subject9: 'Deduction Fine',
      subject10: 'Top-up Bonus',
      subject11: 'Top-Up Refund',
      subject12: 'Other',
      subject13: 'Balance Refund',
      subject14: 'Deposit Refund Fee',
      subject15: 'Member refund',
      subject16: 'Top-up with deposit',

      isDirty1: 'Corrected',
      isDirty2: 'Uncorrected',
      isDirty0: 'Normal',

      lockType1: 'Normal',
      lockType2: 'Next User Update',
      lockType3: 'Operation End',
      lockType6: 'User End-Trip',

      reason1: 'Free Ride',
      reason2: 'Coupon',
      reason3: 'Membership',
    }
  },

  addBalance: {
    form: {
      title: 'Adjust Balance',
      countryId: 'Country',
      phone: 'User Number',
      amount: 'Amount',
      plus1: 'Plus',
      plus2: 'Subtract',
      subject: 'Change Reason',
      orderNo: 'Order NO',
      remark: 'Comment',
      sendNoti: 'Send Message',
      yes: 'Yes',
      no: 'No',
      submit: 'Submit',
      clear: 'Clear',
      moreThenZero: 'Greater than 0',
    },
    js: {
      plus1: 'Plus',
      plus2: 'Subtract',
      subject4: 'Operating Delivery',
      subject8: 'Trip Refund',
      subject9: 'Deduction Fine',
      subject11: 'Top-Up Refund',
      subject12: 'Other',

      message: 'Modified Successfully',
      tip: 'Reminder',
      ok: 'Send SMS to inform user',
      cancel: 'Done',
    }
  },

  payment: {
    query: {
      title: 'Payment Detail',
      beginTime: 'Start Date',
      endTime: 'End Date',
      chooseTime: 'Choose Date',
      phone: 'User Number',
      payMethod: 'Payment Method',
      statementNo: 'Transaction Unique ID',
      tradeNo: 'Payment Unique ID',
      paid: 'Result',
      payStatus: 'Payment status',
      countryId: 'Country',
      query: 'Query',
    },
    table: {
      createdAt: 'Create Date',
      payTime: 'Transaction Date',
      phone: 'User Number',
      statementNo: 'Transaction Unique ID',
      payMethod: 'Payment Method',
      cardType: 'Card Type',
      tradeNo: 'Payment Unique ID',
      currency: 'Currency',
      amount: 'Amount',
      payAccount: 'Account',
      subjectName: 'Paid For',
      paid: 'Result',
      payStatus: 'Payment status',
      isDirty: 'Status',
      operate: 'Operate',
      detail: 'Detail',
    },
    dialog: {
      title1: 'Transaction Details',
      title2: 'Basic Information',
      title3: 'Payment Record',
      title4: 'Details',

      payTime: 'Transaction Date',
      phone: 'User Number',
      subjectName: 'Paid For',
      amount: 'Amount',
      afterChangeBalance: 'Wallet Balance',

      payMethod: 'Payment Method',
      statementNo: 'Transaction Unique ID',
      tradeNo: 'Payment Unique ID',
      cardType: 'Card Type',
      paid: 'Result',

      orderNo: 'Trip ID',
      minutes: 'Trip Duration',
      distance: 'Trip Distance',
      startTime: 'Start Time',
      endTime: 'End Time',
      startAddress: 'Start Point',
      endAddress: 'End Point',
    },
    js: {
      all: 'All',

      paid1: 'Paid',
      paid0: 'Unpaid',

      isDirty1: 'Corrected',
      isDirty2: 'Uncorrected',
      isDirty0: 'Normal',

      payStatus0: 'Unpaid',
      payStatus1: 'Transaction successful',
      payStatus2: 'To be paid',
      payStatus3: 'Transaction failed',
      payStatus4: 'Payment canceled',
      payStatus5: 'In transaction',
      payStatus6: 'Refund pending',
    }
  },

  // 单车国家配置 zhu 2017.05.03
  stateconfig: {
    query: {
      title: 'Bike Country Setting',
      countryId: 'Country',
      code: 'ID Query',
      tip: 'Pls input 3-digit code',
      query: 'Query',
      codeTip: 'Pls input 3-digit effective code',
      all: 'All'
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      code: 'Bike ID',
      operate: 'Operate',
      edit: 'Edit',
      view: 'Check Operation Record'
    },
    dialog: {
      title0: 'Add Bike Country',
      title1: 'Edit Bike Country'
    },
    form: {
      countryId: 'Choose Country',
      code: 'Bike ID',
      tip: 'Pls Input the first 3 numbers of Bike ID',
      coderule: 'Bike ID Rule',
      codeTip: 'Pls input 3-digit effective code',
      cancel: 'Cancel',
      submit: 'Save'
    }
  },

  stateinfo: {
    form: {
      title: 'Operation Record',
      basic: 'Basic Info',
      operator: 'Operation Record'
    },
    table: {
      countryName: 'Country',
      code: 'Bike ID',
      operateTime: 'Operation Time',
      action: 'Record'
    }
  },

  lock: {
    query: {
      title: 'Lock Info Management',
      goAdd: 'Add Lock Info',
      createdAt: 'Bind Date',
      chooseTime: 'Choose Date',
      type: 'Lock Type',
      manufacture: 'Manufacture',
      status: 'Lock Status',
      lockNo: 'Lock ID',
      imei: 'Lock Imei',
      query: 'Query',
    },
    table: {
      lockId: 'Lock ID',
      lockNo: 'Lock Number',
      imei: 'Lock Imei',
      type: 'lock type',
      manufacture: 'Manufacture',
      status: 'lock status',
      electricity: 'Electricity',
      id: 'Bound Bike ID',
      secretKey: 'Secret Key',
      unlockKey: 'Unlock key',
      lockCreatedAt: 'Bind Time',
      simNo: 'Sim No',
      operate: 'operate',
      detail: 'detail',
      edit: 'edit',
      delete: 'delete',

      title: 'Lock details',
    },
    js: {
      all: 'ALL',
      type1: 'Bluetooth 1 Gen',
      type2: 'Bluetooth 2 Gen',
      type3: 'Bluetooth 3 Gen',

      status1: 'Normal',
      status2: 'Maintenance',
      status3: 'Broken',

      manufacture1: '泺平',
      manufacture2: '深国科',

      message: 'Confirm to delete the Lock {lockNo} ?',
      tip: 'tip',
      ok: 'ok',
      cancel: 'cancel',
    }
  },

  addLock: {
    form: {
      title1: 'Single add lock info',
      title2: 'Batch add lock info',

      type: 'Lock type',
      lockNo: 'lock No',
      imei: 'Lock Imei',
      secretKey: 'Secret Key',
      unlockKey: 'Unlock key',
      simNo: 'Sim No',
      btId: 'Bluetooth ID',
      submit: 'Submit',

      import: 'Import',
      tip: 'It will long time to upload such a huge data',
    },
    js: {
      type1: 'Bluetooth 1 Gen',
      type2: 'Bluetooth 2 Gen',
      type3: 'Bluetooth 3 Gen',
      msg: 'Import {success} data successfully, import {fail}data failed',
    }
  },

  bike: {
    query: {
      title: 'Bike Basic Info',
      bikeId: 'Bike ID',
      countryId: 'Country',
      cityId: 'City',
      lockNo: 'Lock No',
      status: 'Bike Status',
      optStatus: 'Bike Operation Status',
      activedTime: 'Actived Time',
      createdTime: 'Bind Time',
      chooseTime: 'Choose Time Range',
      tagId: 'Deploy Tag',
      helmet: 'Helmet',
      query: 'Query',
    },
    table: {
      tip: 'Tip：The fourth number of Bike ID represent the Bike dimension ，0-4 represent 26 Inch，5-9 represent 24 Inch， e.g 065000001 for 26 inch Bike， 065500001 for 24inch Bike',
      id: 'Bike ID',
      lockNo: 'Lock No',
      status: 'Cycling status',
      optStatus: 'Bike Operation Status',
      area: 'Bike Country',
      tagName: 'Deploy Tag',
      createdName: 'Warehouse Operator',
      jihuo: 'Activate Operator',
      createdAt: 'Bind Time',
      activitedTime: 'Actived Time',
      useTime: 'Last Use Time',
      helmet: 'Helmet',
      operate: 'Operate',
      editHelmet: 'Edit',
      unbind: 'Unbind',
      goTrip: 'Trip Record',
      detail: 'Detail',
      forbidden: 'Disabled',
      unForbidden: 'Reactive',
      activateBike: 'Actived',
      reset: 'Reset Bike Location',
      unbindBike: 'Unbind',
      showEditCountry: 'Change Country and City',
      title: 'Bike Detail',

      title1: 'Are u sure to disable Bike {bikeId} ？',
      desc: 'Description',
      cancel: 'Cancel',
      ok: 'Confirm',
    },
    dialog: {
      title2: 'Edit Bike Country Info',
      title3: 'Edit Helmet State',
      helmet: 'Helmet or Not',
      bikeId: 'Bike ID',
      countryId: 'Country',
      cityId: 'City',
      tagId: 'Tag',
      cancel: 'Cancel',
      ok: 'Save',
    },
    js: {
      all: 'ALL',
      none: 'None',
      status0: 'Inactivated',
      status1: 'Normal',
      status2: 'Reserved',
      status3: 'Riding',
      status4: 'Unlocking',
      status5: 'Disabled',

      optStatus0: 'Inactived',
      optStatus1: 'Normal',
      optStatus2: 'Reported Faulty',
      optStatus3: 'Disbaled',
      optStatus4: 'Repaired Not Deploy',

      lockType1: 'Normal',
      lockType2: 'Next User Update',
      lockType3: 'Operation End',
      lockType6: 'User End-Trip',

      helmet0: 'No',
      helmet1: 'Yes',

      type1: 'Bluetooth 1 Gen',
      type2: 'Bluetooth 2 Gen',
      type3: 'Bluetooth 3 Gen',
      forbiddenReason: 'Disabled in admin',

      message: 'Are u sure to reactive the Bike {bikeId} ？',
      tip: 'Cancel',
      ok: 'Confirm',
      cancel: 'Cancel',

      resetTitle: 'Are u sure to reset location of Bike {bikeId} which will disappear in the user map?',

      activateTitle: 'Are u sure to active Bike {bikeId} ？',
      activateSuccess: 'Active successfully',

      unbindTitle: 'Current Bike status is {status}，are u sure to unbind it？',
      unbindSuccess: 'Unbind Successfully',
    }
  },

  addBike: {
    query: {
      title: 'Add Bike Info',
      bikeId: 'Bike ID',
      bikeIdPlaceHolder: 'Please enter 9-digt Bike ID',
      lockNo: 'Lock No',
      lockNoPlaceholder: 'Please enter the lock number',
      imei: 'Lock device number',
      mac: 'MACaddress',
      query: 'query',
    }
  },

  // 邀请好友赠送管理 zhu 2017.04.25
  invite: {
    query: {
      title: 'Referral Management'
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      num: 'Coupon Quantity',
      benefitMoney: 'Coupon Amount',
      days: 'Coupon Validity',
      limitArea: 'Limited Area',
      operate: 'Operate',
      view: 'Operation Record',
      edit: 'Edit',
      createdAt: 'Time',
      adminName: 'Operator(Role)',
      remark: 'Comment'
    },
    form: {
      title: 'Add Referral Coupon',
      title0: 'Edit Referral Coupon',
      title1: 'Edit Record',
      countryId: 'Country',
      num: 'Quantity',
      benefitMoney: 'Amount',
      days: 'Validity',
      day: 'Day',
      limitArea: 'Limited Area',
      submit: 'Submit',
      cancel: 'Cancel'
    },
    js: {
      nolimit: 'No limitation',
      limitArea: 'All Area'
    }
  },

  // advertising zhu 2017.09.01
  adarea: {
    query: {
      title: 'Advertising space management',
      add: 'add',
      addad1: 'Configure pop-up',
      addad2: 'Configure banner',
      addad3: 'Configure narrow banner',
      addad4: 'Configure Icon',
      addad5: 'Configure One-click purchase',
      type: 'Advertising space',
      name: 'Activity name',
      countryId: 'Country',
      activityDate: 'Activity date',
      chooseTime: 'Choose Date',
      status: 'Status',
      query: 'Query'
    },
    table: {
      id: 'ID',
      type: 'Advertising space',
      name: 'Activity name',
      countryId: 'Country',
      date: 'Activity start date',
      repeat: 'Whether to repeat',
      status: 'Status',
      languages: 'Language',
      title: 'Title',
      content: 'Content',
      pic: 'Picture / icon',
      link: 'Redirecting',
      linkAddr1: 'Link:',
      linkAddr2: 'In-App Page:',
      AndroidAddr: 'Android link:',
      iOSAddr: 'iOS link:',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Details'
    },
    js: {
      all: 'all',

      type1: 'pop-up',
      type2: 'banner',
      type3: 'narrow banner',
      type4: 'icon',
      type5: 'One-click purchase',

      name1: 'Free ride',
      name2: 'Membership card',
      name3: 'Recharge cash back',
      name4: 'Deposit Discount',
      name5: 'Other Activities',
      name6: 'Advertising',

      status1: 'In progress',
      status2: 'Not started',
      status3: 'Expired',

      repeat0: 'yes',
      repeat1: 'No',

      jumpType1: 'H5 page',
      jumpType2: 'in-app page',
      jumpType3: 'App Store'
    },
    dialog: {
      longitude: 'Longitude:',
      latitude: 'latitude:'
    }
  },

  adinfo: {
    query: {
      title1: 'Ad Details - Popup',
      title2: 'Ad Details - Banner',
      title3: 'Ad Details - Narrow Banner',
      title4: 'Ad Details - Icon',

      basic: 'basic information',
      type1: 'Pop-up',
      type2: 'Banner',
      type3: 'Narrow Banner',
      type4: 'Icon',
      type5: 'One-click purchase',
      name1: 'Free ride',
      name2: 'Membership card',
      name3: 'Recharge cash back',
      name4: 'Deposit Discount',
      name5: 'Other Activities',
      name6: 'Advertising space',

      template1: 'Template one',
      template2: 'Template two',

      operator: 'operation log'
    },
    table: {
      type: 'Advertising space type',
      countryId: 'Country',
      name: 'Activity name',
      date: 'Activity starting and ending time',
      status: 'Status',
      repeatTime: 'Whether to repeat',
      template: 'Template',
      icon: 'Icon',
      iconpos: 'Icon Location',
      longlat: 'Longitude: {lat}, Latitude: {long}',
      iconpop: 'Click icon is pop-up',
      yes: 'yes',
      no: 'No',
      pic: 'Picture',
      language: 'Language',
      title: 'Title',
      content: 'Content',
      link: 'Redirecting type',
      url: 'Link',
      linkAddr: '',
      AndroidAddr: 'Android:',
      iOSAddr: 'iOS:',

      mTitle: 'This is title',
      mContent: 'This is content',

      operateTime: 'Operating time',
      activity: 'Action',
      operater: 'Operator',
      operate: 'Operate'
    },
    js: {
      add: 'New',
      edit: 'Update'
    }
  },

  adadd: {
    query: {
      title1: 'Configure pop-up',
      title2: 'Configure banner',
      title3: 'Configure narrow banner',
      title4: 'Configuration Icon',
      title5: 'Configure One-click purchase',

      type1: 'pop-up',
      type2: 'banner',
      type3: 'narrow banner',
      type4: 'icon',
      type5: 'One-click purchase',
    },
    form: {
      type: 'Advertising space type',
      name: 'Activity name',
      countryId: 'Country',
      startDateTime: 'Start time',
      startPlaceholder: 'Select start time',
      endDateTime: 'End time',
      endPlaceholder: 'Select end time',
      status: 'Status',
      icon: 'Icon',
      iconpos: 'Icon Location',
      latLabel: 'Latitude:',
      latiPlaceholder: 'Latitude (-90.000000 ~ 90.000000)',
      isNotLat: 'Latitude (-90.000000 ~ 90.000000)',
      longLabel: 'Longitude:',
      longPlaceholder: 'Longitude (-180.000000 ~ 180.000000)',
      isNotLong: 'Longitude (-180.000000 ~ 180.000000) ',
      iconPop: 'Click icon is pop-up',
      repeatTimes: 'whether to repeat',
      repeatHours: 'Repetition Period',
      repeatUnit: 'Hours',
      yes: 'yes',
      no: 'No',
      subType: 'Template type',
      upload: 'Image',
      uploadTip: 'Click Upload Image, dimension: ',
      uploadTipHeightAndWidth: {
        type1_1: '538X589',
        type1_2: '538X773',
        type2_1: '660X200',
        type3_1: '692X156',
        type4_1: '538X589',
        icon: '80X80',
      },
      languages: 'language configuration',
      title: 'title',
      titlePlaceholder: 'Please control the number of words within 30',
      content: 'content',
      contentPlaceholder: 'Please control the number of words within 80',
      mTitle: 'This is title',
      mContent: 'This is content',
      jumpType: 'Redirecting',
      link: 'link',
      linkPlaceholder: 'must be https: // protocol header',
      androidPlaceholder: 'Android link',
      iosPlaceholder: 'iOS link'
    },
    js: {
      name1: 'Free ride',
      name2: 'Membership card',
      name3: 'Recharge cash back',
      name4: 'Deposit Discount',
      name5: 'Other Activities',
      name6: 'Advertising',

      subType1: 'Template One',
      subType2: 'Template two',

      empty: 'none',
      jumpType1: 'H5 page',
      jumpType2: 'In-app page',
      jumpType3: 'App Store',

      status1: 'In progress',
      status2: 'Not started',
      status3: 'Expired',

      linkTip: 'Android or iOS must be filled in at least one',

      myInfo: 'My Information Page',
      editStudentCertification: 'Student certification information fill page',
      successfulCertification: 'Student Certificate Success Page',
      failedCertification: 'Student authentication failed page',
      rechargeMember: 'VIP Member recharge page',
      memberInfo: 'VIP member information display page',
      myWallet: 'My wallet page',
      couponList: 'Coupon page',
      creditPoints: 'My Credit Page',
      invitationReward: 'Invitation Reward page',
      negativeRecord: 'Negative record page',
      transactionDetails: 'Transaction Details Page',
      gainCredibility: 'Credit points',
      myTrip: 'My Trip',

    }
  },

  // 支付方式设置 zhu 2017.06.16
  payway: {
    query: {
      title: 'Payment method setting'
    },
    table: {
      id: 'ID',
      country: 'Country',
      deposit: 'Deposit payment method ',
      balance: ' Balance payment method',
      delivery: 'Delivery payment method',
      operate: 'Operate',
      add: 'Add',
      edit: 'Edit',
      view: 'Detail'
    },
    js: {
      deposit: 'Deposit',
      depositFirst: 'Deposit priority',
      balance: 'Top-up',
      balanceFirst: 'Top-up priority'
    }
  },
  payadd: {
    form: {
      title0: 'Add payment method setting',
      title1: 'Edit payment method setting',
      countryId: 'Country',
      deposit: 'Deposit payment method',
      recharge: 'Recharge payment method',
      delivery: 'Delivery payment method',
      depositSel: 'Deposit payment method select',
      rechargeSel: 'Recharge payment method select',
      deliverySel: 'Delivery payment method select',
    }
  },
  payinfo: {
    query: {
      title: 'Payment method setting detail',
      basic: 'The basic information',
      log: 'Operation record'
    },
    table: {
      countryId: 'Country',
      payway: 'Payment method',
      operateTime: 'Operating time',
      operater: 'Operator',
      operator: 'Operate'
    }
  },

  message: {
    query: {
      title: 'Notification Management',
      createdTime: 'Create Time',
      createdTimePlaceholder: 'Select Time range',
      beginDay: 'Start Time',
      chooseTime: 'Choose Date',
      countryId: 'Country',
      type: 'Message Type',
      query: 'Query',
    },
    table: {
      id: 'Message ID',
      type: 'Type',
      title: 'Title',
      img: 'Img',
      content: 'Content',
      status: 'Status',
      coverageArea: 'Cover Area',
      beginTime: 'Start Time',
      endTime: 'End Time',
      updatedAt: 'Update Time',
      repetition: 'Whether to repeat display',
      operate: 'Operate',
      view: 'View',
      edit: 'Edit',
    },
    dialog: {
      title1: 'User notification preview',
      title2: 'Message picture',
      mTitle: 'Here is Title',
      mContent: 'Here is content',
    },
    js: {
      all: 'All',
      msg1: 'Homepage Notification',
      msg2: 'Message',
      msg3: 'Notification Bar Message',

      status1: 'Enabled',
      status0: 'Disabled',
      repetition1: 'Yes',
      repetition0: 'No',
    }
  },

  addMessage: {
    form: {
      title0: 'Add User Notification',
      title1: 'Edit User Notification',
      type: 'Message type',
      title: 'Message title',
      titlePlaceholder: 'Please enter the title',
      content: 'Content',
      contentPlaceholder: 'No more than 100 characters',
      img: 'Message img',
      upload: 'Upload',
      uploadTip: 'Can only upload jpg / png file, and no more than 500kb',
      coverageArea: 'Cover Area',
      targetUser: 'Target User',
      repetition: 'Whether to repeat the display',
      status: ' Status',
      startDateTime: 'Start Time',
      startPlaceholder: 'Choose Start Time',
      endDateTime: 'End Time',
      endPlaceholder: 'Choose End Time',
      submit: 'Submit',
      cancel: 'Cancel',
      mTitle: 'Here is Title',
      mContent: 'Here is content',
    },
    js: {
      all: 'All',
      msg1: 'Homepage Notification',
      msg2: 'Message',
      msg3: 'Notification bar message',
      status1: 'Enabled',
      status0: 'Disabled',
      repetition1: 'Yes',
      repetition0: 'No',
    }
  },

  version: {
    query: {
      title: 'APP update Management',
      force: 'Update type',
      name: 'APP Type',
      query: 'Query',
      version: 'App version',
      status: 'Status'
    },
    table: {
      id: 'ID',
      version: 'Version',
      force: 'Upgrade type',
      status: 'Status',
      name: 'APP Type',
      language: 'Language',
      title: 'Title',
      address: 'Download Address',
      describe: 'Update Description',
      remark: 'Comment',
      createdAt: 'Creat Time',
      updatedAt: 'Update Time',
      operate: 'Operate',
      edit: 'Edit',
      view: 'Detail',
      delete: 'Delete',
    },
    js: {
      all: 'All',
      app1: 'Android',
      app2: 'iOS',

      upg1: 'Forced upgrade',
      upg0: 'Recommended upgrade',
      status0: 'Pause',
      status1: 'Active',


      message: 'Confirm to delete this record?',
      tip: 'Reminder',
      ok: 'Ok',
      cancel: 'Cancel',
    }
  },

  addVersion: {
    form: {
      title0: 'Add APP version',
      title1: 'Edit App Version',
      vsetting: 'Version setting',
      otherlang: 'Other Language',
      addLang: 'Add Language Mode',
      force: 'Update type',
      name: 'APPtype ',
      version: 'Version',
      open: 'Actived',
      title: 'Pop-up Title',
      titlePlaceholder: 'Default English Model Title',
      describe: 'Pop-up Description',
      contentPlaceholder: 'Default English Model',
      address: 'New version download address',
      remark: 'Update description',
      remarkPlaceholder: 'No more than 100 words',
      submit: 'Submit',
    },
    js: {
      app1: 'Android',
      app2: 'iOS',

      upg1: 'Forced Upgrade',
      upg0: 'Recommended Upgrade',
    }
  },

  versioninfo: {
    table: {
      title0: 'APP Upgrade Detail',
      basic: 'Basic Info',
      langsetting: 'Other Language Setting',
      operator: 'Operation record',
      id: 'ID',
      isOpen: 'Open State',
      force: 'Upgrade Type',
      title: 'Pop-Up title(default)',
      describe: 'Pop-up content(default)',
      address: 'Download url(default)',
      name: 'APP type',
      version: 'APP version',
      remark: 'Comment',
      operateTime: 'Operation Time',
      activity: 'Action',
      operater: 'Operation',
      operate: 'Operation Record'
    },
    js: {
      all: 'All',
      status0: 'Actived',
      status1: 'Pause',

      upg1: 'Forced Upgrade',
      upg0: 'Recommended Upgrade',
    }
  },

  // Bikelogo管理 zhu 2017.04.17
  bikelogo: {
    query: {
      title: 'Bike logo Management',
      date: 'Date',
      chooseTime: 'Choose Date',
      type: 'Status',
      countryId: 'Country',
      cityId: 'City',
      query: 'Query'
    },
    table: {
      id: 'ID',
      operateTime: 'Operation Time',
      type: 'Status',
      countryName: 'Country',
      cityName: 'City',
      startTime: 'Start Time',
      endTime: 'End Time',
      iconUrl: 'Icon Pic',
      remark: 'Comment',
      operate: 'Operate',
      view: 'Detail',
      edit: 'Edit',
      delete: 'Delete'
    },
    form: {
      title: 'New Added logo',
      title0: 'Edit Bike logo',
      basic: 'Basic Info',
      setting: 'Logo Setting',
      countryId: 'Country',
      cityId: 'City',
      type: 'Status',
      daterange: 'Start/end time',
      chooseTime: 'Choose Time',
      upload: 'Upload logo',
      choose: 'Choose file',
      uploadTip: 'Dimension：80*106，must refill which will show on the user app map',
      remark: 'Comment',
      remarkTip: 'Input Comment',
      submit: 'Save',
      cancel: 'Cancel'
    },
    js: {
      all: 'All',
      type_1: 'Not Start',
      type0: 'Pause',
      type1: 'Ongoing',
      type2: 'Expired',
      tip: 'Reminder',
      message: 'Are u sure to delete this data？',
      ok: 'Sure',
      cancel: 'Cancel'
    }
  },

  bikelogoinfo: {
    form: {
      title: 'Bike logo setting detail',
      basic: 'Basic Info',
      operator: 'Operation record'
    },
    table: {
      operateTime: 'Operation time',
      activity: 'Action',
      operater: 'Operator',
      operate: 'Operate'
    }
  },

  price: {
    query: {
      title: 'Trip price management',
      createdAt: 'Create date',
      chooseTime: 'Choose date',
      countryId: 'Country',
      bikeCode: 'Bike ID',
      bikeCodePlaceholder: 'Pls input the first 3 numbers of the bike',
      goAdd: 'Add',
      query: 'Query',
      updateUnitTimesConfig: 'Longest billing time setting',
    },
    table: {
      id: 'ID',
      country: 'Country',
      city: 'City',
      area: 'Area',
      bikeCode: 'Bike Country ID',
      levelOne: 'Price (credit point 100~)',
      levelTwo: 'Price（credit point 80~99)',
      levelThree: 'Price（credit point 60~79)',
      levelFour: 'Price（credit point 0~59)',
      free: 'Trip Promotion',
      others: 'Other rule',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Detail'
    },
    js: {
      free: 'Daily {freeTimesPerDay} times free trips limited in {freeMinutes} mins each.',
      freemin: 'Order is no avail in {freemin} mins'
    },
    dialog: {
      title: 'Longest billing time setting',
      maxTime: 'Longest billing time',
      timeUnit: 'Minutes',
      tips: '(The longest billing time refers to the longest billing time for a trip. Trips that exceed this time will only be billed for the longest billing time, and will be valid for all countries after setting up.)',
    }
  },

  addPrice: {
    form: {
      title: 'Trip price setting',
      countryId: 'Country',
      cityId: 'City',
      currency: 'Currency',
      currencySymbol: 'Currency Symbol',
      bikeCode: 'Bike City ID',
      unitPrice: 'Default（credit point>99）',
      stepPrice: 'Price Stage',
      freeTimesPerDay: 'Daily Free Trip Amount',
      freeMinutes: 'Free Minutes',
      minute: 'Minute',
      times: 'Time',
      credit: 'Credit point',
      price: 'Price',
      submit: 'Save',
      others: 'Other Rule',
      othersNote: 'Trips are free within the time',
      zeroBalanceRide: 'Allow users with a balance of 0 to ride'
    }
  },

  priceInfo: {
    table: {
      title: 'Price Detail',
      title1: 'Basic Info',
      title2: 'Operation Record',
      title3: 'Price Stage',

      country: 'Country',
      city: 'City',
      currency: 'Currency Unit',
      currencySymbol: 'Currency Symbol',
      bikeCode: 'Bike City ID',
      defaultPrice: 'Default Price',
      free: 'Trip Promotion',

      credit: 'Credit point',
      price: 'Price',

      createdAt: 'Operation Time',
      type: 'Action',
      adminName: 'Operation',
      remark: 'Comment',
    },
    js: {
      type1: 'Create',
      type2: 'Update',
    }
  },

  recharge: {
    query: {
      title: 'Deposit and Top-up Management',
      name: 'Country',
      code: 'Country ID',
      open: 'Whether city has launched',
      query: 'Query',
    },
    table: {
      id: 'ID',
      name: 'Country',
      code: 'Counrty ID',
      open: 'Whether city has launched',
      currency: 'Currency Unit',
      currencySymbol: 'Currency Symbol',
      deposit: 'Default Deposit',
      studentDeposit: 'Student Deposit',
      bonus: 'First deposit reward bonus',
      withOutDepositNum: 'Free deposit ride times',
      negativeBalanceRefund: 'Refund when negative',
      topUpStandard: 'Top-up amount',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Detail',
    },
    js: {
      all: 'All',
      open1: 'Yes',
      open0: 'No',
      none: 'None',
    }
  },

  editRecharge: {
    form: {
      title: 'Deposit and top-up setting',
      title1: 'Country info',
      title2: 'Deposit setting',
      title3: 'Top-up setting - Required',
      title4: 'Top-up setting - Optional',

      name: 'Country Name',
      code: 'Country ID',
      currency: 'Currency',
      currencySymbol: 'Currency symbol',
      open: 'Whether to lanch this city?',

      needDepositPlaceholder: 'Must > 0',
      dPlaceholder: 'Must >=0',
      xPlaceholder: 'Optional',

      deposit: 'Default deposit',
      depositToBalance: 'Deposit to balance',
      studentDeposit: 'Student deposit',
      bonus: 'First deposit reward bonus',

      noDeposit: 'Free deposit ride',
      noDepositPlaceholder: 'Free deposit ride times',
      times: 'Times',
      negativeBalanceRefund: 'Refund when negative',

      money0: 'Amount①',
      money1: 'Amount②',
      money2: 'Amount③',
      money3: 'Amount④',
      money4: 'Amount⑤',
      money5: 'Amount⑥',
      money6: 'Amount⑦',
      money7: 'Amount⑧',

      moneyIsRepeated: 'Have the same amount',
      submit: 'Submit',
    },
    js: {
      open1: 'yes',
      open0: 'no',
    }
  },

  rechargeInfo: {
    table: {
      title: 'City details',
      title1: 'Basic Info',
      title2: 'Operation record',

      country: 'country',
      code: 'Country number',
      open: 'Whether the city has lanched?',
      deposit: 'Default deposit',
      studentDeposit: 'Student deposit',
      bonus: 'First deposit reward bonus',
      topUpStandard: 'Top-up amount',

      createdAt: 'Operating time',
      name: 'Operator',
      changeDes: 'Remarks',
    },
    js: {
      type1: 'Create',
      type2: 'Update',
    }
  },

  activity: {
    query: {
      title: 'Top up bonus',
      goAdd: 'Add',

      time: 'Activity Date',
      chooseTime: 'Choose date',
      countryId: 'Country',
      status: 'Activity Status',
      query: 'Query',
    },
    table: {
      id: 'ID',
      updateAt: 'Operation  time',
      activityType: 'Activity Type',
      content: 'Copy',
      status: 'Status',
      startTime: 'Begining',
      endTime: 'End Time',
      area: 'Country',
      title: 'Title',
      bannerUrl: 'Banner',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Detail',
      goUser: 'Involved user',
    },
    js: {
      all: 'All',
      status0: 'Ready',
      status1: 'Going',
      status2: 'Expired',
      activityType: 'Top-up Bonus',
    }
  },

  addActivity: {
    form: {
      title0: 'Bonus Setting',
      countryId: 'Country',
      cityId: 'City',
      daterange: 'Duration',
      daterangePlaceholder: 'Choose activity time',
      type: 'Type',
      typeName: 'Type',
      backMoneys: 'Bonus amount',
      charge: 'Top up',
      give: 'Bonus',
      title: 'Title',
      titlePlaceholder: 'No more than 25 characters',
      content: 'Show content',
      contentPlaceholder: 'Show in the homapage, copy less than 25 Character',
      bannerUrl: 'Message pic',
      upload: 'Upload',
      h5Url: 'Turn to H5',
      submit: 'Submit',

      mTitle: 'Here is Title',
      mContent: 'Here is Content',
    }
  },

  activityInfo: {
    table: {
      title0: 'Top up bonus detail',
      title1: 'Basic info',
      title2: 'Operation record',

      type: 'Activity type',
      typeName: 'Top-up bonus',
      country: 'Country',
      city: 'City',
      startTime: 'Activity Start Dtae',
      endTime: 'Activity End Dtae',

      bannerUrl: 'Banner pic',
      title: 'Title',
      content: 'Content',
      h5Url: 'Turn to H5 page',

      mTitle: 'Here isTitle',
      mContent: 'Here isContent',

      createdAt: 'Operation time',
      typeString: 'Action',
      adminName: 'Operator',
      remark: 'Comment',
    },
    js: {
      type1: 'Create',
      type2: 'Update',
    }
  },

  // 押金折扣 zhu 2017.04.27
  deposit: {
    query: {
      title: 'Deposit Promotion',
      validDate: 'Activity Date',
      chooseTime: 'Choose Date',
      countryId: 'Country',
      cityId: 'City',
      id: 'Activity ID',
      status: 'Activity Status',
      query: 'Query'
    },
    table: {
      id: 'ID',
      activityType: 'Activity Type',
      countryId: 'Country',
      status: 'Activity Status',
      countryDeposit: 'Original Deposit',
      deposit: 'Promotion deposit',
      countryStudentDeposit: 'Original student deposit',
      studentDeposit: 'Promotion student deposit',
      startTime: 'Activity Start Dtae',
      endTime: 'Activity End Dtae',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Detail',
      goUser: 'Check Involved user'
    },
    form: {
      adddeposit: 'Set Deposit Promotion',
      editdeposit: 'Edit Deposit Promotion',
      basic: 'Basic Info',
      countryId: 'Country',
      daterange: 'Activity start/end time',
      chooseTime: 'Choose Date',
      status: 'ActivityStatus',
      setting: 'Activity setting',
      activityType: 'Promotion type',
      depositType: 'Deposit Promotion',
      deposit: 'Promotion deposit',
      countryDeposit: 'Original Deposit',
      countryStudentDeposit: 'Original Student Deposit',
      studentDeposit: 'Promotion student deposit',
      remark: 'Comment',
      remarkTip: 'Leave comment',
      APPShow: 'APP reminder setting',
      showHomePage: 'Shows in APP homapage',
      yes: 'Yes',
      no: 'No',
      bannerUrl: 'Upload pic',
      upload: 'Click to Upload pic',
      title: 'Title',
      titlePlaceholder: 'No more than 25 characters',
      content: 'Content',
      contentPlaceholder: 'No more than 100 characters',
      h5Url: 'Turn to H5 page',
      submit: 'Save',
      cancel: 'Cancel'
    },
    js: {
      all: 'All',
      status0: 'Ready to start',
      status1: 'Ongoing',
      status2: 'Expired',
      activityType1: 'Top-up bonus',
      activityType2: 'Membership',
      activityType3: 'Free Ride',
      activityType4: 'Deposit Promotion',
    }
  },

  depositinfo: {
    form: {
      title: 'Deposit Promotion detail',
      basic: 'Basic Info',
      operator: 'Operation record'
    },
    table: {
      operateTime: 'Operation Time',
      activity: 'Action',
      operater: 'Operator',
      operate: 'Comment'
    }
  },

  depositusers: {
    query: {
      title: 'Involved User'
    },
    table: {
      id: 'ActivityID',
      activityType: 'Activity Type',
      userMobile: 'User Number',
      countryDeposit: 'Original Deposit',
      deposit: 'Promotion Deposit',
      startTime: 'Activity Time',
      operate: 'Operate',
      detail: 'Check Activity Detail'
    }
  },

  noDeposit: {
    query: {
      title: 'Free deposit riding'
    },
    table: {},
    js: {
      activityType9: 'Free deposit riding',
    },
    dialog: {
      title: 'Configure a deposit-free ride',
      countryId: 'Country',
    }
  },

  coupon: {
    query: {
      title: 'Coupon',
      goAdd: 'Add',
      benefitType: 'Coupon type',
      couponType: 'Coupon Type',
      endType: 'Validity',
      countryId: 'Limit area',
      cityId: 'Limit City',
      query: 'Query',
    },
    table: {
      id: 'ID',
      name: 'Coupon name',
      benefitType: 'Coupon type',
      benefitMoney: 'Discount',
      couponType: 'Coupon Type',
      endType: 'Validity',
      days: 'Validity',
      area: 'Limit area',
      updateAt: 'Operation time',
      adminName: 'Operator',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Detail',
    },
    js: {
      all: 'All',
      benefitType1: 'Discount',
      benefitType2: 'Cash',
      couponType1: 'Invite Code Coupon',
      couponType2: 'Common Coupon',
      couponType3: 'Reward after referral',
      couponType4: 'Operation delivery coupon',
      couponType7: 'Reward system coupon',
      endType0: 'No Limit',
      endType1: 'Effective day',
      endType2: 'Effective date range',
      day: 'Day',
    }
  },

  addCoupon: {
    form: {
      title: 'Add coupon',
      name: 'Coupon name',
      countryId: 'Limit area',
      benefitType: 'Coupon type',
      benefitMoney: 'Discount content',
      couponType: 'Coupon Type',
      benefitPercent: 'Discount content',
      randomPromotion1: 'Coupon discounts',
      randomPromotion2: 'Coupon amount',
      endType: 'Validity limit',
      days: 'Limit days',
      day: 'Day',
      daterange: 'Limited date',
      daterangePlaceholder: 'Choose date duration',
      query: 'Sumbit',
    },
    js: {
      benefitType1: 'Discount',
      benefitType2: 'Cash',
      couponType1: 'Invite Code Coupon',
      couponType2: 'CommonCoupon',
      couponType3: 'Reward after referral',
      couponType4: 'Operation delivery coupon',
      couponType7: 'Icon activity coupon',
      endType0: 'No limit',
      endType1: 'Validity days',
      endType2: 'Valididy date',
      randomPromotion0: 'Fixed',
      randomPromotion1: 'Random'
    }
  },

  couponInfo: {
    table: {
      title: 'Coupon detail',
      title1: 'Basic info',
      title2: 'Coupon limit',
      title3: 'Operation record',

      benefitType: 'Coupon type ',
      benefitMoney: 'Coupon content',

      endType: 'Validity',
      days: 'Validity',
      area: 'Limit area',

      createdAt: 'Operation time',
      type: 'Action',
      adminName: 'Operator',
      remark: 'Comment',
    },
    js: {
      type1: 'Create',
      type2: 'Update',
    }
  },

  registerCoupon: {
    query: {
      title: 'Register Coupon',
      goAdd: 'Add',
      countryId: 'Country',
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      num: 'Quantity',
      benefitMoney: 'Quota',
      days: 'Valid period',
      updateAt: 'Update Time',
      adminName: 'Update User',
      edit: 'Edit',
    },
    dialog: {
      title: 'A deposit ticket for free deposit',
      countryId: 'Country',
      num: 'Quantity',
      benefitMoney: 'Quota',
      days: 'Valid period',
      day: 'Day',
      mustint: 'The input must be an integer',
      mustint0: 'Please enter an integer greater than or equal to 0',
    },
  },

  code: {
    query: {
      title: 'Promo code',
      goAdd: 'Add',
      status: 'Status',
      createdAt: 'Create date',
      chooseTime: 'Choose date',
      code: 'Promo code',
      tag: 'tag',
      query: 'Query',
    },
    table: {
      id: 'ID',
      type: 'Promo code type',
      code: 'Promo code',
      tag: 'tag',
      useTimesPerOne: 'useTimes per user',
      usedTimes: 'usedtime',
      useTime: 'Limit Times',
      status: 'Status',
      startTime: 'Validity(start)',
      endTime: 'Validity date',
      content: 'Exchange content',
      activityType: 'Exchange type',
      limitTime: 'Validity',
      createdAt: 'Update time',
      adminName: 'Operator',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Detail',
      record: 'Record',
      exportExcel: 'export',
    },
    js: {
      all: 'All',
      type1: 'Common coupon',
      status1: 'ongoing',
      status2: 'expired',
      status3: 'not start yet',
      type: 'Common Promo code',
      activityType2: 'Member Card',
      activityType5: 'Coupon',
      benefitType1: 'Discount',
      benefitType2: 'Cash',
      day: 'Day',
      num: 'Amount',
      coupon: 'Coupon',
    }
  },

  addCode: {
    form: {
      title: 'Edit Promo code',
      type: 'Promo code type',
      code: 'Promo code',
      random: 'Random produce',
      tag: 'promocode tag',
      useTimesPerOne: 'usetimes per user',
      daterange: 'Promo code duration',
      chooseTime: 'Choose date duration',
      status: 'Promo code status',
      quantity: 'Quantity',
      activityType: 'Exchange type',
      selectCard: 'Select member card',
      selectCardHelper1: 'Select country',
      selectCardHelper2: 'Select card',
      selectCardHelper3: 'Current country has no member card',
      couponId: 'Exchange coupon',
      toAdd: 'Add coupon',
      detail: 'Coupon detail',
      content: 'Common promo code',
      days: 'Validity',
      area: 'Limit area',
      submit: 'Submit',
      basic: 'Basic Info',
      setting: 'Code Setting',
      codePlaceholder: 'Seperate with comma, when batch produce the code',
      limitTime: 'Limit exchange times',
      limitPlaceholder: 'Blank means no limit',
      useTimesWarning: 'total usetime limit can not smaller than usetime for per user',
      openGenerate: 'opengenerate',
    },
    dialog: {
      title: 'customize promocode',
      nameRule: 'naming rule',
      code: 'promocode‘s ’',
      to: 'to',
      bit: 'bit ',
      ruleType1: 'random letter',
      ruleType2: 'random number',
      ruleType3: 'customize',
      addRule: 'add',
      generateNum: 'number of generate',
      generateCode: 'generate',
      hasRepeat: 'repeated string, please redo',
      generateNumIsTooLarge: 'number of promocodes can not exceed 1000',
      codeIsTooLarge: 'bits of promocode can not exceed 20',
      cancel: 'cancel',
      ok: 'ok',
    },
    js: {
      type: 'Common promo code',
      exchangeTypeOption2: 'Member Card',
      exchangeTypeOption5: 'Coupon',
      status1: 'ongoing',
      status2: 'expired',
      status3: 'not start yet',
      day: 'Day',
      benefitType1: 'Discount',
      benefitType2: 'Cash',
    }
  },

  codeRecord: {
    query: {
      title: 'promocode record',
      phone: 'user phone',
      countryId: 'country',
      cityId: 'city',
      exchangeCode: 'promocode',
      exchangedDate: 'exchangedate',
      chooseTime: 'choose time',
      query: 'query',
    },
    table: {
      id: 'ID',
      countryName: 'country',
      cityName: 'city',
      phone: 'user phone',
      exchangedDate: 'exchange date',
      exchangeCode: ' exchange promocode ',
      exchangedCouponRecord: 'exchange contetn',

      operate: 'operate',
    }
  },

  codeInfo: {
    table: {
      title: 'Promo detail',
      title1: 'Basic info',
      title2: 'Coupon info',
      title3: 'Operation record',

      codeType: 'Code type',
      typeName: 'Common promo code',
      code: 'Promo code content',
      startTime: 'Promo code effective start time',
      endTime: 'Promo code effective end time',
      area: 'Limit area',

      quantity: 'Exchange amount',
      benefitType: 'Discount type',
      content: 'Discount content',
      couponArea: 'Limit area',
      days: 'Validity',

      createdAt: 'Operation time',
      type: 'Action',
      adminName: 'Operator',
      remark: 'Comment',
    },
    js: {
      type1: 'Create',
      type2: 'Update',
    }
  },

  free: {
    query: {
      title: 'Free Ride',
      goAdd: 'Add',
      time: 'Activity time',
      chooseStartTime: 'Select start date',
      chooseEndTime: 'Select end date',
      countryId: 'Country',
      status: 'Status',
      query: 'Query',
      activityDetailType: 'Activity type'
    },
    table: {
      id: 'ID',
      updateAt: 'Operation date',
      activityType: 'Activity type',
      content: 'Copy',
      status: 'Status',
      country: 'Country',
      city: 'City',
      startTime: 'Activity start date',
      endTime: 'Activity end date',
      comment: 'Activity content',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Detail',
      goUser: 'Check involved user',
    },
    js: {
      all: 'All',
      status0: 'Ready',
      status1: 'Going',
      status2: 'Expired',
      status3: 'Time out',

      activityType: 'Free ride',
    },
    activityDetailType: {
      all: 'all',
      status1: 'Free times',
      status2: 'Free time period',
    }
  },

  addFree: {
    form: {
      title0: 'Edit Free Ride',
      countryId: 'Country',
      cityId: 'City',
      area: 'Limit Area',
      date: 'Effective time',
      all: 'All',
      startPlaceholder: 'Activity start date',
      endPlaceholder: 'Activity end date',
      startHms: 'Activity start time',
      endHms: 'Activity end time',
      deletedate: 'Delete',
      adddate: 'Add',
      daterange: 'Activity duration',
      chooseTime: 'Choose duration',
      status: 'Status',
      type: 'Activity type',
      typeName: 'Free ride',
      title: 'Title',
      titlePlaceholder: 'No more than 25 characters',
      content: 'Content',
      contentPlaceholder: 'No more than 25 characters',
      bannerUrl: 'Upload pic',
      upload: 'Click to upload',
      h5Url: 'Turn to H5 page',
      submit: 'Submit',

      mTitle: 'Here isTitle',
      mContent: 'Here isContent',
    },
    js: {
      status0: 'Ready',
      status1: 'Going',
      status2: 'Expired',
      submitTips: 'The end time must be greater than the start time',
    }
  },

  freeInfo: {
    table: {
      title: 'Free Ride detail',
      title1: 'Basic info',
      title2: 'Operation record',

      freeType: 'Acvitity type',
      typeName: 'Free Ride',
      status: 'Activity Status',
      comment: 'Activity Content',
      content: 'Show the copy',
      country: 'Country',
      city: 'City',
      startTime: 'Activity Start Dtae',
      endTime: 'Activity End Dtae',
      bannerUrl: 'Picture',
      h5Url: 'Turn to H5 page',

      mTitle: 'Here isTitle',
      mContent: 'Here isContent',

      createdAt: 'Operation time',
      type: 'Action',
      adminName: 'Operator',
      remark: 'Comment',
    },
    js: {
      type1: 'Create',
      type2: 'Update',
    }
  },

  card: {
    query: {
      title: 'Membership Activity',
      goAdd: 'Add',
      time: 'Activity Date',
      chooseTime: 'Choose Date',
      countryId: 'Country',
      status: 'Activity Status',
      query: 'Query',
    },
    table: {
      id: 'ID',
      updateAt: 'Operation Time',
      activityType: 'Activity Type',
      startTime: 'Activity Start Dtae',
      endTime: 'Activity End Dtae',
      title: 'Title',
      content: 'Activity Content',
      status: 'Activity Status',
      countryName: 'Country',
      cityName: 'City',
      activityContent: 'Membership setting',
      freecard: 'Membership privilege',
      operate: 'Operate',
      edit: 'Edit',
      detail: 'Detail',
    },
    js: {
      all: 'All',
      status0: 'Ready to start',
      status1: 'Ongoing',
      status2: 'Expired',
      status3: 'Pause',
      activityType: 'Membership',
      freecard: 'Daily {freeTimes} times for free {freeMinutes} mins trips.',
      cardName: 'Membership Card Name: ',
      dayCard: 'One-day Membership',
      priceCard: ', Normal Price: ',
      priceAuto: ', Auto-Renewal: ',
      priceDisAuto: ', No Auto-Renewal',
      priceDis: ', Promotion Price: ',
      priceDisDis: ', No Promotion Price',
      priceDiscount: ', discount price：',
      priceDiscountDis: ', no discount price set',
      nolimit: 'Time Not Limited And Times Not Limited',
      nodeposit: ', no deposit',
      indeposit: ', with deposit'
    }
  },

  addCard: {
    form: {
      title0: 'Set Membership',
      countryId: 'Country',
      cityId: 'City',
      daterange: 'Activity date range',
      chooseTime: 'Choose date range',
      status: 'Activity Status',
      type: 'Activity Type',
      typeName: 'Membership',
      cards: 'Membership',
      freeTimes: 'Daily free trips amount',
      freeMinutes: 'Free Trip minutes',
      minute: 'Minute',
      times: 'Time',
      day: 'Day',
      must: 'Required',
      unmust: 'Optional',
      title: 'Title',
      titlePlaceholder: 'No more than 25 characters',
      content: 'Content',
      contentPlaceholder: 'No more than 100 characters',
      distoIndex: 'Shows in App homapage',
      yes: 'Yes',
      no: 'No',
      bannerUrl: 'Upload pic',
      upload: 'Click to change uploaded pic',
      h5Url: 'Turn to H5 page',
      submit: 'Save',
      dontAuto: 'Do not automatically renew',
      auto: 'Automatic renewal',
      basics: 'Activity Basic Information',
      limit: 'Membership Limitation',
      settings: 'Activity Popup Configuration',
      cardsetting: 'Membership Configuration',
      limit0: 'Limit 1',
      limit1: 'Limit 2',
      nolimit: 'Time Not Limited And Times Not Limited',
      addCard: 'Add Membership Card',
      cardName: 'Membership Card Name',
      cardNameholder: 'No more than 24 words',
      cardDay: 'Days',
      dayplaceholder: 'Required',
      cardPrice: 'Normal Price',
      priceplaceholder: 'Required',
      cardDiscount: 'Promotion Price',
      disntAuto: 'Do Not Open Promotion Price',
      disauto: 'Open Promotion Price',
      cardAuto: 'Auto-Renewal',
      cardlist: 'Membership Card',
      cardlavel: 'Priority',
      inDiscount: 'Discount price',
      closeDisc: 'Do not enable discounted price',
      openDisc: 'Enable discount price',
      mustmin: 'Experience price must be less than the discount price, automatic renewal price and normal price',
      nodeposit: 'No deposit',
      indeposit: 'Need deposit',
      isKeyDeposit: 'One-click purchase',
      giftOCoin: 'OCN amount',
      superVip:'Super Vip',
      nonSuperVip: 'Ordinary member',
      authorizedTimes:'Authorizations Number',
      vipType: 'Vip Type',
    },
    dialog: {
      title: 'Membership error',
      msg1: 'Time confilict with {id} （Activity number)，Whether save and pause original Activity？',
      detail: '{id} ActivityDetail',
      card: 'Membership',
      period: 'Validity',
      area: 'Limited Area',

      ok: 'Confirm',
      cancel: 'Cancel',

      addCard: 'Add Membership Card',
      editCard: 'Edit Membership Card'

    },
    js: {
      status0: 'Ready to start',
      status1: 'Ongoing',
      status2: 'Expired',
      freecard: 'Daily {freeTimes}Time free {freeMinutes}Minute trips',
      dayCard: 'One-day Membership',
      tip: 'Delete Reminder',
      message: 'Delete This Membership Card?',
      ok: 'OK',
      cancel: 'Cancel'
    }
  },

  cardInfo: {
    table: {
      title: 'Membership Card Detail',
      title1: 'Basic Info',
      title2: 'Operation record',

      freeType: 'ActivityType',
      typeName: 'Membership',
      status: 'ActivityStatus',
      comment: 'ActivityContent',
      content: 'Show Copy',
      country: 'Country',
      city: 'City',
      startTime: 'Activity Start Dtae',
      endTime: 'Activity End Dtae',
      bannerUrl: 'Picture',
      h5Url: 'Turn to H5 page',

      mTitle: 'Here isTitle',
      mContent: 'Here isContent',

      createdAt: 'Operation time',
      type: 'Action',
      adminName: 'Operator',
      remark: 'Comment',
    },
    js: {
      type1: 'Create',
      type2: 'Update',
    }
  },

  account: {
    query: {
      title: 'Account Management',
      goAdd: 'Add Account',

      name: 'Account',
      roleId: 'Role',
      status: 'Status',
      countryId: 'Country',

      query: 'Query',
    },
    table: {
      id: 'User ID',
      name: 'Account',
      phone: 'Phone number',
      realName: 'Real Name',
      status: 'Account Status',
      role: 'Role',
      area: 'Country and City',
      country: 'Country',
      city: 'City',
      period: 'Validity',
      updatedAt: 'Update time',
      operate: 'Operate',
      edit: 'Edit',
      showWebAuth: 'Check admin privilege',
      showAppAuth: 'Check admin app privilege',
      resetPassword: 'Reset password',
      detail: 'Detail',
      deleteAdmin: 'Delete',
      frozenAdmin: 'Freeze'
    },
    dialog: {
      title1: 'Account {name}\'s Admin privilege',
      title2: 'Account {name}\'s Admin app privilege',
      title3: 'Reset Password',
      rsttip: 'Confirm to reset the password of account？',
      rstpassTip: '8-15 characters must contain number, capital and small letters, allow special characters [- _ #]',
      resetpass: 'Reset the password of account to :',
      custompass: 'Generate',
      passcopy: 'Copy'
    },
    js: {
      all: 'All',
      status1: 'Normal',
      status2: 'Frozen',
      status3: 'Expired',

      message: 'Are u sure to reset Account {name}\'s password to（123456）?',
      tip: 'Reminder',
      ok: 'Confirm',
      cancel: 'Cancel',

      deleteMessage: 'Are u sure to Delete Account {name} ?',
      frozenMessage: 'Are u sure to Freeze Account {name} ？'
    }
  },

  addAccount: {
    form: {
      title: 'Add system account',
      title1: 'Edit system account',
      name: 'User Name',
      namePlaceholder: 'Email or User Number',
      password: 'Original Password',
      realName: 'Real Name',
      countryId: 'Country',
      cityId: 'City',
      phoneCode: 'Country code',
      phoneTip: '* "Country code"is the country code related to phone number, required',
      phone: 'User Number',
      status: 'Status',
      roleId: 'Role',

      submit: 'Submit',
    },
    js: {
      all: 'All',
      status1: 'Normal',
      status2: 'Frozen',
      status3: 'Expired',
    }
  },

  accountInfo: {
    table: {
      title: 'Account info Detail',
      title1: 'Basic Info',
      title2: 'Privilege Detail',
      title3: 'Operation Record',

      name: 'Account',
      password: 'Password',
      realName: 'Real Name',
      status: 'Account Status',

      role: 'Role',
      country: 'Country',
      city: 'City',
      webAuth: 'Admin privilege',
      showWebAuth: 'Check admin privilege',
      appAuth: 'Admin app privilege',
      showAppAuth: 'Check admin app privilege',
    },
    table2: {
      createdAt: 'Operation time',
      name: 'Operator',
      changeDes: 'Comment',
    },
    js: {
      type1: 'Create',
      type2: 'Update',
    }
  },

  webAuth: {
    title: 'Set admin privilege',
    nameLabel: 'Role Name',
    title1: 'Set Role Privilege',
    save: 'Save',
    goBack: 'Quit Change',
  },

  appAuth: {
    title: 'Set Admin app privilege',
    nameLabel: 'Role Name',
    title1: 'Set Role Privilege',
    save: 'Save',
    goBack: 'Quit Change',
  },

  // 消息推送 zhu 2017.05.08
  funcnews: {
    query: {
      title: 'Function',
      type: 'Function Type',
      pushtime: 'Push Time',
      query: 'Query'
    },
    table: {
      id: 'ID',
      functype: 'Function Type',
      pushtime: 'Push Time',
      language: 'Language',
      title: 'Messgae Title',
      content: 'Message Content',
      linkpage: 'jump page',
      notewsspec: 'news classification',
      ispushtime: 'whether the push time push',
      issavelocale: 'whether the local message is saved',
      operate: 'Operate',
      newstmpl: 'Check Message model',
      pushrec: 'Check Push history'
    },
    js: {
      all: 'All',
      type0: 'Membership',
      type1: 'Confirmed report',
      type2: 'Adjust balance',

      pushtype0: 'All',
      pushtype1: 'Your membership card will expire in 3 days',
      pushtype2: 'Membership expired in 1 days',
      pushtype3: 'After user report',
      pushtype4: 'After confirm user report',
      pushtype5: 'User report confirmed',
      pushtype6: 'Adjust balance － Operation delivery',
      pushtype7: 'Adjust balance － Trip refund',
      pushtype8: 'Adjust balance － Accidently top-up refund',
      pushtype9: 'Adjust balance － Deduction fine',
      pushtype10: 'Adjust balance － Other',
      pushtype11: 'Deposit refund',
      pushtype12: 'User End-Trip，Next User Update info',
      pushtype13: 'Operation End',
      pushtype14: 'Balance <0',
      pushtype15: 'Student verification － Success',
      pushtype16: 'Student verification － Fail',
      pushtype17: 'Referral Reward',
      pushtype18: 'Send Coupon',
      pushtype19: 'Coupon before expiration (1Day in advance)',
      pushtype20: 'Membership before expiration (3Day in advance)',
      pushtype21: 'Membership expired(Expired)',
      pushtype22: 'Send membership notification',
      pushtype23: 'Cancel membership and refund notification',
      pushtype24: 'Membership card deferred notification',
      pushtype25: 'Top-up successful notification',
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
      pushtype55: 'OCN Recharge success reminder',
      pushtype56: 'Receive authorization code',
      pushtype57: 'Join family',
      pushtype58: 'Exit family',
      pushtype59: 'Remove family',

      functype0: 'All',
      functype1: 'Membership',
      functype2: 'Report feedback',
      functype3: 'Confirm report',
      functype4: 'Reported confirmed',
      functype5: 'Adjust balance',
      functype6: 'Deposit refund',
      functype7: 'Trip record',
      functype8: 'Remind top-up',
      functype9: 'Student verification',
      functype10: 'Coupon',
      functype11: 'Flash',
      functype12: 'Enterprise',
      functype13: 'OCN',
      functype14: 'Authorization code',
      functype15: 'Family number',

      noticetype1: "general",
      noticetype2: "promotion",
      noticetype3: "report",
      noticetype4: "sales",

      viewpage1: "my information",
      viewpage2: "student verification page",
      viewpage3: "student verification success page",
      viewpage4: "student verification failed page",
      viewpage5: "VIP membership recharge",
      viewpage6: "VIP membership display",
      viewpage7: "my wallet page",
      viewpage8: "coupon page",
      viewpage9: "my credit page",
      viewpage10: "invitation reward page",
      viewpage11: "negative record page",
      viewpage12: "transaction details page",
      viewpage13: "credit",
      viewpage14: "my trip",

      none: "none"
    }
  },

  pushrec: {
    query: {
      title: 'Push record',
      createdTime: 'Date',
      chooseTime: 'Choose Date',
      userId: 'User',
      fbtoken: 'FireBase Token',
      functype: 'Function Type',
      pushtime: 'Push Time',
      languageId: 'Language',
      query: 'Query'
    },
    table: {
      id: 'Push ID',
      createdAt: 'Push Time',
      userId: 'User',
      fbtoken: 'FireBase Token',
      type: 'Function Type',
      pushtime: 'Push Time',
      language: 'Language',
      title: 'Title',
      content: 'Content',
      isreached: 'Whether received',
      remark: 'Cause of failure',
    }
  },

  functmpl: {
    query: {
      title: 'Push Template',
      functype: 'Function Type',
      pushtime: 'Push Time',
      tmplset: 'Template Setting',
      addlang: 'AddLanguage',
      basic: 'Basic Info',
      operator: 'Operation record'
    },
    table: {
      name: 'Language',
      title: 'Title',
      content: 'Content',
      operateTime: 'Operation time',
      activity: 'Action',
      operater: 'Operator',
      operate: 'Operate',
      edit: 'Edit',
      delete: 'Delete'
    },
    form: {
      add: 'Add',
      edit: 'Edit',
      language: 'Language',
      title: 'Push Title',
      content: 'Push Content',
      remarkTip: 'Add Push Content',
      cancel: 'Cancel',
      submit: 'Confirm'
    }
  },

  pushMessage: {
    query: {
      title: 'Message push',
      countryId: 'Country ',
      notiType: 'Message push type',
      sendDate: 'Sent date',
      sendStatus: 'Sent status ',
      userTag: 'User label',
    },
    table: {
      id: 'ID',
      notiType: 'Message push type ',
      sendDate: 'Sent date',
      countryName: 'Country',
      userTag: 'User label',
      languages: 'Language',
      notiTitle: 'Message title',
      notiContent: 'Message content',
      jumpTo: 'Jump to',
      saveMesaage: 'Saved locally ',
      sendStatus: 'Status',

      deleteMessage: 'Delete',
      view: 'Preview',
    },
    dialog: {
      title1: 'User list',
      title2: 'Preview',
    },
    js: {
      all: 'All',
      notiType0: 'Normal',
      notiType1: 'Jump to H5',
      notiType2: 'Jump to designated page',
      notiType3: 'Pop display activity ',

      sendStatusn1: 'Processing',
      sendStatus0: 'Failure',
      sendStatus1: 'Success',

      deleteMessage: 'Delete this record?',
      tip: 'Remind',
      ok: 'Confirm',
      cancel: 'Cancel',
    }
  },

  addPushMessage: {
    form: {
      title: 'New message push',
      notiType: 'Message push type',
      countryId: 'Country ',
      saveMesaage: 'Saved locally',
      yes: 'Yes',
      no: 'No',
      userPhone: 'User',
      userPhonePlaceholder: 'Enter the user\'s cell phone number, separated by multiple user carriage returns',
      userTag: 'User label',
      jumpTo: 'Jump to',
      popTemplateType: 'Panel',

      languages: 'Language selected',
      notiTitle: 'Message title',
      notiContent: 'Message content ',
      notiTitlePlaceholder: 'Required, displayed in the notification bar',
      popTitle: 'pop title',
      popContent: 'pop content',
      popTitlePlaceholder: 'Required, Fill in the template ',
      popWebUrl: '',
      jumpToWhereH5: 'H5',
      jumpToWherePage: 'Designated page',

      upload: 'Picture upload',
      uploadTip: 'Click to upload picture ',
      view: 'Preview',
      submit: ' Push immediately',
    },
    js: {
      notiType0: 'Normal',
      notiType1: 'Jump to H5',
      notiType2: 'Jump to designated page',
      notiType3: 'POP display activity',

      popTemplateType1: 'Small picture with content and title',
      popTemplateType2: ' Big picture with content and  title',
      popTemplateType3: ' Small picture with no content or title',

      myInfo: ' My information page ',
      editStudentCertification: 'Student authentication information page',
      successfulCertification: 'Student certification success page',
      failedCertification: 'Student authentication failure page',
      rechargeMember: 'VIP membership recharge page',
      memberInfo: 'VIP member information display page',
      myWallet: 'My wallet page',
      couponList: 'Coupon page',
      creditPoints: 'My credit pages',
      invitationReward: 'Invitation page',
      negativeRecord: 'Negative record page',
      transactionDetails: 'Transaction details page',
      gainCredibility: 'Credit score',
      myTrip: 'My trip',
    }
  },

  // CountryCity配置 zhu 2017.05.11
  city: {
    query: {
      title: 'Country annd City setting',
      add: 'Add',
      countryId: 'Country',
      cityId: 'City',
      query: 'Query'
    },
    table: {
      id: 'ID',
      countryId: 'Country',
      cityId: 'English Name of City',
      ecityId: 'Locale Name of City',
      helmet: 'Helmet or Not',
      operate: 'Operate',
      editHelmet: 'Edit'
    },
    js: {
      all: 'All',
      helmet0: 'No',
      helmet1: 'Yes',
      tip: '(The name of the city will display on the user app.)'
    },
    dialog: {
      title: 'Add Country and City',
      helmet: 'Helmet or Not',
      title3: 'Edit Country City',
      cancel: 'Cancel',
      ok: 'OK'
    },
    form: {
      countryId: 'Country',
      cityId: 'English Name of City',
      ecityId: 'Locale Name of City',
      tip: '* Attention ! The name of the city will display on the user app.',
      submit: 'Confirm',
      cancel: 'Cancel'
    }
  },

  role: {
    table: {
      title: 'Role management',
      goAdd: 'AddRole',

      id: 'RoleID',
      name: 'Role',
      web: 'Admin privilege',
      app: 'Admin app privilege',
      updatedAt: 'Edit time',
      updatedName: 'Editor',
      operate: 'Operate',

      edit: 'Edit Role Name',
      editWebAuth: 'Edit Admin privilege',
      editAppAuth: 'Edit Admin app privilege',
      openTip: 'Pls get relevant Privilege',
      detail: 'Operation record',
    },
    dialog: {
      title: 'AddRole',
      title1: 'Edit Role Name',
      nameLabel: 'Role Name',
      web: 'Admin privilege',
      app: 'Admin app privilege',
      cancel: 'Cancel',
      ok: 'Add',
    }

  },

  // 设置 - 支付风控
  risk: {
    query: {
      title: ' Payment risk control',
      goAdd: ' Add',
    },
    table: {
      id: 'ID',
      countryName: ' Country',
      hours: ' Time period (hours)',
      limitedAmount: ' Transaction amount of open 3D certification',
      limitedPayTimes: ' Number of transaction that open 3D certification ',
      limitedChargeBackTimes: ' Open 3D when have refusal record ',
      forbiddenAmount: ' Transaction amount of suspend trading ',
      forbiddenPayTimes: ' Number of transaction that suspend trading ',
      frozenChargeBackTimes: ' Refuse to pay a few times will join the blacklist ',
      updatedAt: ' Update time ',
      edit: ' Edit ',
    }
  },

  addRisk: {
    form: {
      title: ' Setting payment risk control condition ',
      countryId: ' Country ',
      hours: ' Time period ',
      hoursUnit: ' hours ',
      frozenChargeBackTimes: ' Refuse to pay a few times will join the blacklist ',
      timesUnit: ' Time ',

      open3D: 'Open 3D',
      limitedAmount: ' Transaction amount of open 3D certification ',
      limitedPayTimes: ' Number of transaction that open 3D certification ',
      limitedChargeBackTimes: ' Open 3D when have refusal record ',
      forbiddenAmount: ' Transaction amount of suspend trading ',
      forbiddenAmountPlaceholder: ' Must be greater than or equal to transaction amount of open 3D certification ',
      forbiddenPayTimes: ' Number of transaction that suspend trading ',
      forbiddenPayTimesPlaceholder: ' Must be greater than or equal to number of transaction that open 3D certification ',
      submit: 'Submit',
    },
  },

  paypal: {
    query: {
      title: 'PayPal Transfer',
      goAdd: 'Transfer-In',
      createdAt: 'Transfer-In Date',
      chooseTime: 'Choose Date Range',
      countryId: 'Transfer-In Country',
      status: 'Transfered-In Result',
    },
    table: {
      id: 'ID',
      createdAt: 'Transfer-In Date',
      adminName: 'Operator',
      countryName: 'Transfer-In Country',
      intoAccount: 'Transfer-In Account',
      amount: 'Transfer-In Amount',
      currency: 'Accounted Currency',
      status: 'Transfered-In Result',
    },
    dialog: {
      title: 'PayPal Transfer',
      countryCode: 'Transfer-In Country',
      accountCode: 'Transfer-In Account',
      amount: 'Transfer-In Amount',
      password: 'Login Password',
      passwordPlaceholder: 'Please enter the login password of admin system',
    },
    js: {
      statussuccess: 'Success',
      statuserror: 'Failure',
    }
  },

  bind: {
    query: {
      title: 'Bind Failure List',
      countryId: 'Country',
      createdAt: 'Created Time',
      chooseTime: 'Select Start & End Time',
      phone: 'Telphone',
      query: 'Query'
    },
    table: {
      id: 'ID',
      createAt: 'Created Time',
      countryName: 'Country',
      memberId: 'Member ID',
      phone: 'Member Telphone',
      logInfo: 'Failed Error Message'
    }
  },

  pay: {
    query: {
      title: 'Payment Failure List',
      countryId: 'Country',
      createdAt: 'Created Time',
      chooseTime: 'Select Start & End Time',
      tradeSource: 'Payment Channel',
      phone: 'Telphone',
      query: 'Query'
    },
    table: {
      id: 'ID',
      createAt: 'Created Time',
      countryName: 'Country',
      tradeSource: 'Payment Channel',
      phone: 'Member Telphone',
      statementNo: 'Trading Serial No.',
      errorInfo: 'Failed Error Message'
    },
    js: {
      all: 'All'
    }
  },

  locklog: {
    query: {
      title: 'Lock and unlock failure record',
      createdAt: 'Report time',
      chooseTime: 'Choose start and end time',
      countryId: 'Country',
      bikeId: 'Bike id',
      phone: 'Phone number',

      tradeNo: 'Lock trade No.',
      transtype: 'Switch lock status',
      action: 'Failure type',
      subAction: 'Error type',
      query: 'Query'
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      bikeId: 'Bike ID',
      lockNo: 'Report the lock numbe',
      diffLock: 'Error lock number',
      lockLevel: 'Lock type',
      transtype: 'Switch lock status',
      actionName: 'Failure type',
      subAction: 'Error type',
      createAt: 'Report time',
      infoTime: 'Switch lock time',
      phone: 'Phone number',
      deviceName: 'Device name',
      versionNo: 'APP version No.',
      scope: 'User type',
      tradeNo: 'Ock trade No.',
    },
    js: {
      all: 'All',
      type1: 'Unlock failed-Bluetooth connection failed',
      type2: 'Unlock failed-Lock protocol abnormal',
      type3: 'Unlock failed-abnormal bike status',
      type4: 'Unlock failed-othe',
      type5: 'Failed to generate the unlock order',
      type6: 'Failed to process the lock order',
      type7: 'Lock time is abnormal',
      type8: 'Order number repeat',
      type9: 'Multiple bike orders',
      type10: 'Switch lock intercepts abnorma',

      translock: 'Lock',
      transunlock: 'Unlock',

      yes: 'Yes',
      no: 'No',

      admin: 'Admin',
      customer: 'Customer',
      others: 'Others',

      bikeLockNo: '(bikeLockNo:: {bikeLockNo})',
      unknown: 'Unknown',
      empty: 'Empty',
      lockLevel: 'Bluetooth{lockLevel}'
    }
  },

  appsms: {
    query: {
      title: 'Set SMS operato',
      query: 'Query',
      goCountryProvider: 'Set SMS operator for each country',
    },
    table: {
      id: 'ID',
      country: 'Country',
      smsCodeProviders: 'Proportion of sms code providers',
      operationProviders: 'Proportion of sms operation providers',

      voice: 'Voice verification code',
      remark: 'Remark',
      operate: ' Operate',
      edit: 'Edit',
      detail: 'Daily record of operation',
    },
    dialog: {
      title: 'Daily record of operation',
      createdAt: 'Time of operation',
      admin: 'Operator',
      type: 'Type of operation',
      type1: 'Create',
      type2: 'Edit',
      remark: 'Operate',
    }
  },

  addSmsSetting: {
    form: {
      title: 'Set SMS operator',
      countryId: 'Country name',
      smsCodeProviders: 'Proportion of sms code providers',
      smsCodeTips: '（Note: The total proportions of all operators should be 100%）',
      operationProviders: 'Proportion of sms operation providers',
      operationTips: '（Note: total proportions of all operators should be 100%）',

      voice: 'Voice verification code',
      remark: ' Remark',
      submit: 'Save',
      cancel: 'Cancel'
    }
  },

  countryProvider: {
    table: {
      title: 'SMS operator of this country',
      goAdd: 'Add',
      id: 'ID',
      country: 'Country',
      providers: 'SMS operator of this country',
      edit: 'Edit',
    },
    dialog: {
      title: 'Set SMS operator for each country',
      countryCode: 'Country',
      countryProviders: 'Operator',
    }
  },

  providerInfo: {
    table: {
      title: 'Information about SMS operator',
      id: 'ID',
      providerName: 'Operator',
      balance: 'Balance',
      remain: 'The remaining tickets',
      total: 'Number of delivered SMS',
      successSms: 'Number of successfully delivered ticket',
      failureSms: 'Number of failed delivered ticket',
      detail: 'Detail',
    },
    dialog: {
      title: 'Information about SMS operator',
      providerName: 'Operator',
      countryName: 'Support country',
      total: 'Total number of tickets',
    }
  },

  radius: {
    query: {
      title: 'Bicycle display radius',
      title1: 'Config bicycle display radius',
      countryId: 'Country',
      cityId: 'City',
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      cityName: 'City',
      radius: 'Radius (m)',
      num: 'Surrounding vehicle',
      integerPlaceholder: 'Please enter a positive integer',
    }
  },

  // 押金退款手续费设置 zhu 2017.09.20
  refund: {
    query: {
      title: 'Configurate commission for refunding deposit',
      countryId: 'Country',
      needCommission: 'If need commission for refunding deposit',
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      chargeCommission: 'If need commission for refunding deposit',
      fromRefundNum: 'From refund number',
      commissionRatePercent: 'Commission',
    },
    js: {
      yes: 'Yes',
      no: 'No'
    },
    dialog: {
      title1: 'Edit deposit refunding commission',
      title2: 'Configurate deposit refunding commission',
      countryId: 'Country',
      needCommission: 'If need commission for refunding deposit',
      fromRefundNum: 'From refund number',
      beforetimes: 'No',
      times: 'Times',
      commissionRate: 'Commission rate',
      percent: '%',
      mustint: 'Enter an integer that must be greater than 0',
      mustint2: 'Input must be between 0 ~ 100'
    }
  },

  deprfdinfo: {
    query: {
      title: 'Deposit refund commission details',
      basic: 'Basic information',
      log: 'Operate log'
    },
    table: {
      id: 'ID',
      countryName: 'Country name',
      chargeCommission: 'If need commission for refunding deposit',
      fromRefundNum: 'From refund number',
      commissionRatePercent: 'Commission',
      operateTime: 'Operate time',
      action: 'Operate',
      operater: 'Operator',
      operator: 'Remark'
    },
    js: {
      add: 'Add',
      edit: 'Edit'
    }
  },

  payfee: {
    query: {
      title: 'Fee management',
      goAdd: 'Add',
      countryId: 'Country',
      payMethodId: 'Payment method',
      open: 'Status',
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      payMethodName: 'Payment method',
      open: 'Status',
      edit: 'Edit',
      doOpen: 'Open',
      close: 'Stop',
      detail: 'Detail',
    },
    dialog: {
      title: 'Add fee',
      title1: 'Fee detail',
      title2: 'Modify fee',
      countryId: 'Country',
      countryCurrency: 'Currency',
      payMethodId: 'Payment method',
      range: 'Amount range',
      minAmount: 'Minimum amount',
      maxAmount: 'Maximum amount',
      fee: 'Fee',
      open: 'Status',
      tips: '* Please press the amount from low to high configuration, the fee can not be greater than the minimum amount, the amount can not overlap',
    },
    js: {
      opentrue: 'Open',
      openfalse: 'Step',
    }
  },

  // 图标活动 红包券 zhu 2017.09.22
  redbag: {
    query: {
      title: 'Redbag activity',
      add: 'Add',
      createdAt: 'Created at',
      beginTime: ' Begin time',
      endTime: ' End time',
      chooseTime: 'Choose time',
      countryId: 'Country',
      cityId: 'City',
      status: 'Status',
      query: 'Query',
    },
    table: {
      id: 'ID',
      name: 'Activity name',
      createdAt: 'Created at',
      startTime: ' Begin time',
      endTime: 'End time',
      status: ' Status',
      countryId: 'Country',
      cityId: 'City',
      num: 'Rebags number',
      gaveNum: 'Gave number',
      remainNum: 'Remain number',
      remark: 'Remark',
      operate: 'Operate',
      edit: 'Edit',
      view: 'Detail',
      delete: 'Delete'
    },
    js: {
      all: 'All',
      deleteMessage: 'Are you sure to delete activity {name} ?',
      tip: 'Tip',
      ok: 'OK',
      cancel: 'Cancel'
    }
  },

  addRedbag: {
    form: {
      title: 'Configurate redbag activity',
      basic: 'Basic information',
      countryId: 'Country',
      countryCurrency: 'Country currency',
      cityId: 'City',
      label: '',
      thirdPart: 'Information configurate in third-party platform',

      baginfo: 'Redbag information',
      name: 'Activity name',
      num: 'Redbag number',
      type1: 'Random distribution',
      type2: 'User-defining distribution',

      rule: 'User receiving rule',
      mustTime: 'Must time',
      freeTime: 'Free time',
      limited: 'Limited rules',
      limited1: 'Time and trips limit',
      memberDays: 'Member days',
      memberTimes: 'Member times',
      limited2: 'No time and trips limit',
      limited3: 'No time and trips limit',
      remark: 'Remark',
      submit: 'Save'
    },
    dialog: {
      thirdPart: 'Information configurate in third-party platform ',
      thirdBagId: 'Redbag ID',
      thirdActivityId: 'Activity ID',
      cancel: 'Cancel',
      submit: 'Confirm'
    }
  },

  baginfo: {
    query: {
      title: 'Configurate redbag activity',
      basic: 'Basic information',
      log: 'Operate log'
    },
    table: {
      id: 'ID',
      name: ' Redbag name',
      createdAt: 'Created at',
      countryId: 'Country',
      cityId: 'City',
      num: 'Redbag number',
      baginfo: 'Redbag information',
      rules: 'Rules',
      remark: 'Remark',

      operateTime: 'Operate time',
      operater: 'Operator',
      operator: 'Operate'
    },
    js: {
      rideMinutes: 'Must ride {rideMinutes} minutes',
      memberDays: ', available in {memberDays} days',
      memberTimes: ', may receive {memberTimes} times',
      norideMinutes: 'No ride minutes',
      nomemberDays: ', not limited to receive time',
      nomemberTimes: ', not limited times'
    }
  },

  // 图标活动 优惠券 zhu 2017.09.22
  iconcoupon: {
    query: {
      title: 'Coupon promotion',
      add: 'Add',
      createdAt: 'Created at',
      beginTime: 'Begin time',
      endTime: 'End time',
      chooseTime: 'Choose time',
      countryId: 'Country',
      cityId: ' City',
      status: 'Status',
      query: 'Query',
    },
    table: {
      id: 'ID',
      activityCouponId: 'Activity ID',
      activityCouponType: 'Coupon ID',
      name: 'Activity name',
      createdAt: 'Created at',
      status: 'Status',
      countryId: 'Country',
      cityId: 'City',
      couponName: 'Coupon name',
      remark: 'Remark',
      operate: ' Operate',
      edit: 'Edit',
      view: 'Detail',
      delete: 'Delete'
    },
    js: {
      all: 'All',
      deleteMessage: 'Are you sure to delete activity {name} ?',
      tip: 'Tip',
      ok: 'Confirm',
      cancel: 'Cancel'
    }
  },

  addIconCoupon: {
    form: {
      title: 'Configurate redbag activity',
      basic: 'Basic information',
      countryId: 'Country',
      countryCurrency: 'Country currency',
      cityId: 'City',
      label: '',
      couponId: 'Coupon id',
      detail: 'Coupon detail',
      content: 'Normal coupon',
      days: 'Valid date',
      area: 'Limited area',

      name: 'Activity name',

      rule: 'User receiving rules',
      mustTime: 'Must time',
      freeTime: 'Free time',
      limited: 'Limited rule',
      limited1: 'Time and trips limit',
      memberDays: 'Days',
      memberTimes: 'Times',
      limited2: 'No time and trips limit ',
      limited3: 'No time and trips limit',
      remark: 'Remark',
      submit: 'Save'
    },
    dialog: {
      thirdPart: 'Configurate information in third-party platform',
      thirdBagId: 'Coupon ID',
      thirdActivityId: 'Activity ID',
      cancel: 'Cancel',
      submit: 'Confirm'
    },
    js: {
      all: 'All',
      day: ' Day',
      benefitType1: 'Discount',
      benefitType2: 'Cash',
    }
  },

  iconcpinfo: {
    query: {
      title: 'Configurate coupon activity',
      basic: 'Basic information',
      log: 'Operate log'
    },
    table: {
      id: 'ID',
      name: 'Coupon name ',
      createdAt: 'Created at',
      endTime: 'End time',
      status: '  Status',
      countryId: 'Country',
      cityId: 'City',
      couponName: 'Coupon name',
      couponInfo: 'Coupon information',
      couponRules: 'Coupon rules',
      remark: 'Remark',

      operateTime: 'Operate time',
      operater: 'Operator',
      operator: 'Operate'
    },
    js: {
      rideMinutes: 'Must ride {rideMinutes} minutes',
      memberDays: ', available in {memberDays} days',
      memberTimes: ', may receive {memberTimes} times',
      norideMinutes: 'no ride minutes',
      nomemberDays: ', not limited to receive time',
      nomemberTimes: ', not limited times'
    }
  },

  bikeicon: {
    query: {
      title: 'Bike icon management',
      add: 'Add',
      createdAt: 'Created at',
      beginTime: 'Begin time',
      endTime: 'End time',
      chooseTime: 'Choose time',
      countryId: 'Country',
      cityId: 'City',
      status: 'Status',
      query: '  Query'
    },
    table: {
      id: 'ID',
      name: 'Icon name',
      confType: 'Choose bike type',
      createdAt: 'Created at',
      startTime: 'Start time',
      endTime: 'End time',
      status: 'Status',
      countryId: 'Country',
      cityId: 'City',
      confBikeCount: 'Appointed bike numbers',
      iconstyle: 'Icon style',
      iconInfo: 'Icon information',
      remark: 'Remark',
      operate: 'Operate',
      edit: 'Edit',
      view: 'Details',
      delete: 'Delete',
    },
    js: {
      all: 'All',
      status0: 'Not begin',
      status1: 'Processing',
      status2: 'Expire',
      status3: 'Pause',

      deleteMessage: 'Are you sure to delete icon {name} ?',
      tip: 'Tip',
      ok: 'Confirm',
      cancel: 'Cancel'
    }
  },

  addbikeicon: {
    form: {
      title: 'Add bike icon',
      title0: 'Edti bike icon',

      basic: 'Basic information about bike icon',
      countryId: 'Country',
      cityId: 'City',
      startDateTime: 'Start time',
      startPlaceholder: 'Choose start time',
      endDateTime: 'End time',
      endPlaceholder: 'Choose end time',
      type: 'Status',

      setting: 'Bike icon setting',
      addSetting: 'Add bike icon setting',
      edit: 'Edit'
    },
    table: {
      iconName: 'Icon name：',
      confBikeCount: 'Influence bike numbers：',
      days3: 'No ride days：',
      days4: 'Limited days：',
      times3: 'No ride time：',
      times4: 'Time limit：',
      contentName: 'Reward name：',
      immediateEffect: 'Immediate in effect：'
    },
    dialog: {
      title: 'Configurate icon and reward',
      validnum: 'Available bike numbers',
      validnumHelper: 'When adding appoint bike file, please manualy subtract number of bike in the file to available bike numbers.',
      iconName: 'Icon name',
      iconUrl: 'Icon',
      uploadTip: 'Click to upload pictures',

      confType: 'Choose bike type',
      confType1: 'Appoint bike',
      confType2: 'Random choose',
      confBikeCount: 'Bike',
      confType3: 'Appoint no ride time',
      days: 'days',
      or: 'or',
      minutes: 'min',
      confType4: 'Ride frequency',
      times: 'Times',
      confType5: 'Report illegal parking',
      immediateEffect: 'Immediatein effect',

      choose: 'Upload file',
      uploadTip: 'Only accept files with .xls/.xlsx',
      contentType: 'Reward content',
      contentName: 'Reward name',
      residualContentCount: 'Remaining configurable bonus',
      unlimited: 'Unlimited',
      cancel: 'Cancel',
      ok: 'Confirm'
    },
    js: {
      status0: 'Not begin',
      status1: 'Processing',
      status2: 'Expire',
      status3: 'Pause',
      contentType0: 'No',
      contentType1: 'Third-party redpacket',
      contentType2: 'Stickers',
      contentType3: 'Our coupons',
      contentType4: 'Our discount code',
      contentType5: 'Reward System',
      uploadWarning: 'Please choose file to upload',

      yes: 'Yes',
      no: 'No',
      expired: 'The reward activity of this bick icon has been expired'
    }
  },

  bikeinfo: {
    query: {
      title: 'Configurate redbag activity',
      basic: ' Basic information',
      log: 'Operate log'
    },
    table: {
      id: 'ID',
      name: 'Icon name',
      createdAt: 'Created at',
      startTime: 'Start time',
      endTime: 'End time',
      status: 'Status',
      countryId: 'Country',
      cityId: 'City',
      iconstyle: 'Icon style:',
      iconInfo: 'Icon information',

      confType1: 'Appointed bike',
      confType2: 'Random choose',
      confBikeCount: ' , influenced bike numbers：{name}',
      confType3: 'Appointed no ride time',
      days: ' , days limit：{name}days',
      times3: ' , time limit：{name} min',
      confType4: 'riding frequency',
      times4: ' , riding trips limit：{name} times',
      confType5: 'Report illegal parking',
      contentType1: ' , reward content：third-party redbag',
      contentType2: ' , reward content：stickers',
      contentType3: ' , reward content：our coupons',
      contentType4: ' , reward content：our discount code',
      immediateyes: ' , immediate in effect',
      immediateno: ' , not immediate in effect',

      operateTime: 'Operate time',
      operater: ' Operator',
      operator: 'Operate'
    }
  },

  fence: {
    query: {
      title: 'Electronic fence',
      title1: ' Electronic fence setting',
      title2: ' Operation Record ',
      type: ' Electronic fence type ',
      useable: ' Status ',
      visiable: ' Display on the map ',
      contentType: 'Reward Type',
      contentName: 'Reward name',
      contentNamePlaceHolder0: 'No Rewards',
      contentNamePlaceHolder1: 'Please Select',
    },
    table: {
      id: 'ID',
      type: ' Electronic fence type ',
      useable: ' Status ',
      num: ' Electronic fence amount ',
      radius: ' Display range ',
      radiusPlaceholder: ' Display range ',
      batchAdd: ' Batch add ',
      visiable: ' Display on the map ',
      contentType: 'Reward Type',
      promotionActivityId: 'Reward Name',
      edit: 'Edit',
      disabled: ' Disabled ',
      enabled: ' Active ',
      detail: ' Operation Record ',
    },
    js: {
      type1: ' Parking area ',
      type2: ' No parking area ',
      type3: ' Parking spot ',
      type4: 'Control area',
      useable1: ' Active ',
      useable0: ' Disabled ',
      contentType0: 'No',
      contentType1: 'Third-party Redpacket',
      contentType2: 'Sticker',
      contentType3: 'oBike Coupon',
      contentType4: 'oBike Code',
      contentType5: 'Reward System',
      expired: 'The reward activity of this geo fence has been expired'
    },
    dialog: {
      createdAt: ' Operation Time ',
      admin: ' Operator ',
      remark: ' Operate ',
      upload: 'Upload file',
    }
  },

  fenceInfo: {
    query: {
      title: ' Electronic fence list ',
      goAdd: 'Add',
      exportExcel: ' Export ',
      id: ' Electronic fence ID',
      name: ' Electronic fence name',
      longitude: ' longitude ',
      latitude: ' latitude ',
      hasPile: ' With or without Electric beacon ',
      pileNo: ' Electric beacon ID',
    },
    table: {
      id: ' Electronic fence ID',
      name: ' Electronic fence name ',
      points: ' Coordinate points ',
      hasPile: ' With or without Electric beacon ',
      pileNo: ' Electric beacon ID ',
      subType: 'Icon',
      edit: 'Edit',
      detail: ' Operation Record ',
    },
    js: {
      has: 'Have',
      nothas: 'Not have',
      subType1: 'P',
      subType2: 'S',
    }
  },

  addFence: {
    form: {
      title: ' Electronic fence setting ',
      name: ' Electronic fence name ',
      useable: ' Status ',
      points: ' Coordinate points ',
      latitude: ' latitude ',
      longitude: ' longitude ',
      submit: 'Save',
      tips: '* Please fill in at least three coordinate points',
    },
  },

  uploadLoc: {
    query: {
      title: 'Roport location',
      exportExcel: 'Export excel',
      countryId: 'Country',
      cityId: 'City',
      bikeId: 'Bike',
      lockNo: 'Lock No',
      createdAt: 'Start time',
      createdByName: 'Operator',
    },
    table: {
      id: 'ID',
      countryName: 'Country name',
      cityName: ' City name',
      bikeId: 'Bike id',
      lockNo: 'Lock No',
      createdByName: 'Operator',
      createdAt: 'Operate time',
      locString: 'Reported coordinate',
      address: ' Address',
    }
  },

  putBike: {
    query: {
      title: 'Put bikes into circulation',
      exportExcel: 'Export excel',
      countryId: 'Country',
      cityId: ' City',
      bikeId: 'Bike id',
      lockNo: 'Lock No',
      createdAt: 'Start time',
      createdByName: 'Operator',
      success: 'If put into circulation successfully',
    },
    table: {
      id: 'ID',
      countryName: 'Country name',
      cityName: ' City name',
      bikeId: 'Bike id',
      lockNo: 'Lock No',
      createdByName: 'Operator',
      createdAt: 'Created at',
      address: 'Address',
      tag: 'Tag',
      helmet: 'Helmet',
      success: 'If put into circulation successfully',
      defeatReason: 'Defeat reason',
    },
    js: {
      helmet0: 'No',
      helmet1: 'Yes',
    }
  },

  bikeMaintain: {
    query: {
      title: 'Bike maintainance',
      exportExcel: 'Export excel',
      countryId: 'Country',
      cityId: 'City',
      bikeId: 'Bike Id',
      lockNo: 'Lock No.',
      createdAt: 'Start time',
      createdByName: 'Operator',
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      cityName: 'City',
      bikeId: 'Bike id',
      lockNo: 'Lock No.',
      operationPeople: 'Operator',
      repairedTime: 'Repaired time',
      operationStatus: 'Operation status',
      faultType: 'Fault type',
      repairedImg: 'Repair picture',
      repairedDesc: 'Repair description',
    }
  },

  putAgain: {
    query: {
      title: 'Recycling from bike and relaunch',
      exportExcel: 'Export excel',
      countryId: 'Country',
      cityId: 'City',
      bikeId: 'Bike id',
      lockNo: 'Lock No',
      recycleDate: 'Recycle date',
      recyclePerson: 'Recycle person',
      relaunchDate: 'Relaunch date',
      relaunchPerson: 'Relaunch person',
    },
    table: {
      id: 'ID',
      recycle: 'Operation type',
      countryName: 'Country name',
      cityName: 'City name',
      bikeId: 'Bike id',
      lockNo: 'Lock No',
      recycleAddress: 'Recycle address',
      recyclePerson: 'Recycle person',
      recycleAt: 'Recycle person',
      relaunch: 'Operation type',
      relaunchAddress: 'Relaunch address',
      relaunchPerson: 'Relaunch person',
      relaunchAt: 'Relaunch date',
    },
    js: {
      helmet0: 'No',
      helmet1: 'Yes',
    }
  },

  otherOpt: {
    query: {
      title: 'Other operation',
      exportExcel: 'Export excel',
      countryId: 'Country',
      cityId: 'City',
      bikeId: 'Bike id',
      lockNo: 'Lock No',
      action: 'Operation action',
      createdAt: 'Created at',
      createdByName: 'Operator',
      success: 'If the operation is successful',
    },
    table: {
      id: 'ID',
      countryName: ' Country name',
      cityName: 'City name',
      bikeId: 'Bike id',
      lockNo: 'Lock No',
      action: 'Operation action',
      createdByName: 'Operator',
      createdAt: 'Created at',
      success: 'If the operation is successful',
      defeatReason: 'Defeat reason',
    },
    js: {
      action1: 'Bind bike',
      action2: 'Activate bike',
      action3: 'Unbind bike',
      action5: 'Disable the bike',
      action11: 'Open the bike',
      action12: 'Bind lock',
      action16: 'Report there is no problem with the bike',
    }
  },

  punchcard: {
    query: {
      title: 'Punch Card Log',
      exportExcel: 'Export',
      countryId: 'Country',
      cityId: 'City',
      createdByName: 'Operator',
      clockOnTime: 'Check In Time Range',
      clockOffTime: 'Check Out Time Range',
    },
    table: {
      id: 'ID',
      countryName: 'Country',
      cityName: 'City',
      createdByName: 'Operator',
      clockOnTime: 'Check In Time（Locale/GMT+08:00)',
      clockOnAddress: 'Check In Location',
      clockOffTime: 'Check Out Time（Locale/GMT+08:00)',
      clockOffAddress: 'Check Out Location',
      workDuration: 'Work Duration',
      track: "Track",
      detail: "check"
    },
    dialog: {
      title: 'Operator Track',
      id: 'ID',
      createdByName: 'Operator',
      createdTime: "Time-Locale",
      longitude: "Longitude",
      latitude: "Latitude",
      address: "Address"
    }
  },

  flashmanedit: {
    form: {
      title: 'Country Config',
      countrySelect: 'Select Country',
      cityName: 'City Name',
      currency: 'Currency',
      currencySymbol: 'Currency Symbol',
      orderRadius: 'Order Radius',
      depositConfig: 'Deposit Fee',
      paymentType: 'Bill Type',
      week: 'Week',
      month: 'Month',
      paymentDate: 'Bill Date',

      grabLimitSameTime: 'Driver Simultaneous Order limit',
      dayCancelOrderUser: 'User Daily Cancel Limit',
      dayCancelOrderDriver: 'Dirver Daily Cancel Limit',

      basicPrice: 'PRICE',
      priceStart: 'Strating Price',
      depositBackNum: 'Driver Deposite Refund Limit',

      nightPrice: 'NIGHT OP',
      priceNightPercent: 'Extra Fee Rate',
      serviceNightStart: 'Start Time',
      serviceNightEnd: 'End TIme',

      extraFee: 'FEE',
      priceServcie: 'Survice Fee',
      priceRefund: 'Refund Fee',
      priceWithdraw: 'Withdraw Fee',
      needDepositPlaceholder: 'Rate: 1~100，Fixed>0',

      priceInterval: 'PRICE LEVELS',
      weightPriceList: 'Weight Levels',
      distancePriceList: 'Distance Levels',
      level: 'Level',
      min: 'Min',
      max: 'Max',
      price: 'Price',

      newIntervalSize: 'New Level Range',
      newIntervalPrice: 'New Level Price',
      newInterval: 'Add this new level?',
      addSuccess: 'Add success, will effect after save this form',
      removeInterval: 'The last level will be deleted, continue?',
      removeSuccess: 'Delete Success, will effect after save this form',

      countdown: 'TIME LIMITS',
      countdowRightnow: 'Instant Order Survival Time',
      countdowAppoint: 'Appointment Order Survival Time',
      countdownPay: 'Payment Countdown',
      countdownPayHelper: 'Order will be canceled if no payment received',
      limitTimePickup: 'Driver Pickup Time Limit',
      countdowDelivery: 'Driver Delivery Time Limit',
      limitTimeDelivery5: 'Starting Distance',
      limitTimeDelivery5Helper: 'In Distance Level 1 ',
      limitTimeDeliveryPer5: 'Extra Distance Per',

      hint: 'NOTICE',
      yes: 'OK',
      no: 'Cancel',
      delete: 'DELETE',
      add: 'ADD',

      fixed: 'Fixed',
      rate: 'Rate',
      distance: 'Distance',
      time: 'Time',
      save: 'SAVE',
      saveHelper: 'It will update Flashman config, continue?',
      selectPlaceholder: 'Select',
      datePlaceholder: 'Select number from 1 to 28',
      lt0Placeholder: 'larger than 0',
      timePlaceholder: 'Any Time',
      timesUnit: 'Times'
    }
  },

  driver: {
    query: {
      title: 'Rider Info',
    },
    table: {
      id: 'Rider ID',
      name: 'Rider Name',
      createdAt: 'Registration Time',
      phone: 'Phone',
      driverStatus: 'Rider Status',
      certificate: 'Certificate Status',
      workStatus: 'Work Status',
      countryName: 'Country',
      depositStatus: 'Deposit Status',
      email: 'Email',
      platform: 'Platform',
      memo: 'Remark',
      updatedAt: 'Update Time',

      driverStatusBtn1: 'Freeze',
      driverStatusBtn0: 'Unfreeze',
      depositStatusBtn1: 'Configure to no deposi',
      depositStatusBtn0: 'Cancel no deposit',
    },
    js: {
      driverStatus0: 'Normal',
      driverStatus1: 'Frozen',
      workStatus0: 'Offline',
      workStatus1: 'Online',
      depositStatus0: 'No pay deposit',
      depositStatus1: 'Deposit paid',
      depositStatus2: 'Insufficient deposit',
      depositStatus3: 'Free deposit',
      certificate0: 'Uncertificated',
      certificate1: 'In certification',
      certificate2: 'Certification Success',

      tip: 'Tips',
      driverStatusString0: 'Are you sure you want to freeze {phone} ？',
      driverStatusString1: 'Are you sure you want to unfreeze {phone} ？',
      depositStatusString1: 'Are you sure you want to cancel no deposit for {phone} ？',
      depositStatusString0: 'Are you sure you want to configure free deposit for {phone} ？',
    }
  },

  driverVerify: {
    query: {
      title: 'Rider Review List',
      countryId: 'Country',
    },
    table: {
      id: 'Review ID',
      memberId: 'Rider ID',
      realName: 'Rider Name',
      createdAt: 'Registration Time',
      phone: 'Phone',
      certificateStatus: 'Review Status',
      countryName: 'Country',
      certificationNo: 'Certification No',
      imgs: 'Review Pic',
      updatedAt: 'Update Time',

      apply: 'Apply',
      refused: 'Refused',
      goDriverInfo: 'View rider information',
    },
    js: {
      confirm1: 'Confirmed approval by rider {phone} ?',
      confirm2: 'Confirmation does not pass rider {phone} ?',
      certificateStatus0: 'Not reviewed',
      certificateStatus1: 'Apply',
      certificateStatus2: 'Refused',
    }
  },

  delivery: {
    name: 'Flashman Order List',
    query: {
      orderNo: 'Order Number',
      countryId: 'Country',
      sender: 'User Name',
      uidSender: 'User ID',
      senderPhone: 'User Phone',
      sendfor: 'Sender',
      sendforName: 'Sender Name',
      sendforPhone: 'Sender Phone',
      sendforAddress: 'Sender Address',
      note: 'Note',
      receiverPhone: 'Receiver Phone',
      uidDriver: 'Driver ID',
      driver: 'Driver',
      driverName: 'Driver Name',
      driverPhone: 'Driver Phone',
      chooseTime: 'Pick date and time',
      beginCreateTime: 'Created  After',
      endCreateTime: 'Created Before',
      packet: 'Item Info',
      status: 'Order Status',
      stautsBad: 'Order Type',
      senderPaystatus: 'Payment Status',
      query: 'Query',
    },
    list: {
      operate: 'Operate',
      orderNo: 'Order Number',
      countryName: 'Country',
      statusStr: 'Order Status',
      stautsBadStr: 'Order Type',
      senderPaystatusStr: 'Payment Status',
      uidSender: 'User Id',
      senderPhone: 'User Phone',
      sendforPhone: 'Sender Phone',
      receiverPhone: 'Receiver Phone',
      uidDriver: 'Driver ID',
      driverPhone: 'Driver Phone',
      createTimeStr: 'Creat Time',
      sendTimeStr: 'Appt. Time',
      driverGrabTimeStr: 'AC Time',
      driverGetTimeStr: 'Pick Time',
      driverSendtoTimeStr: 'Drop Time',
      packetWeight: 'Weight(kg)',
      miles: 'Distance(km)',
      priceSenderAll: 'Price',
      packetRemark: 'Remark',
      operate: 'Operate',
      check: 'Detail',
      cancel: 'Cancel',
      setAbnormal: 'Set as Abnormal',
      abnormalRefund: 'Refund',
      handleAbnormal: 'Set as Handled'
    },
    info: {
      name: 'Order Detail',
      orderNo: 'Order Number',
      sender: 'User',
      uidSender: 'User ID',
      senderPhone: 'User Phone',
      sendfor: 'Sender',
      sendforName: '	Sender Name',
      sendforPhone: 'Sender Number',
      sendforAddress: 'Sender Street Address',
      sendforDoorno: 'Sender Room Number',
      sendforPostalCode: 'Sender Postal Code',
      receiver: 'Receiver',
      receiverName: '	Receiver Name',
      receiverPhone: 'Receiver Phone',
      receiverAddress: 'Receiver Street Addreess',
      receiverDoorno: 'Receiver Room Number',
      receiverPostalCode: 'Receiver Postal Code',
      note: 'Note',
      driver: 'Driver',
      driverName: 'Driver Name',
      uidDriver: 'Driver ID',
      driverPhone: 'Driver Phone',
      packetType: 'Item Type',
      packetValue: 'Item Price',
      packet: 'Item Info',
      packetWeight: 'Weight',
      miles: 'Distance',
      priceSenderAll: 'Order Total Price',
      priceExtra: 'Extra Fee',
      statusStr: 'Order Status',
      refundAmount: 'Refund Total Amount',
      driverRefundAmount: 'Refund Driver Commission',
      trackOrder: 'Order Track',
      createTimeStr: 'Created Time',
      senderPaytime: 'Payment Time',
      sendTimeStr: 'Appointment Time',
      driverGrabTimeStr: 'Accept Time',
      driverGetTimeStr: 'Pickup Time',
      driverSendtoTimeStr: 'Arrive Time',
      cancelTimeStr: 'Cancel Time',
      stautsBadStr: 'Order Type',
      sendforVerifyno: 'Sender Verify Code',
      receiverVerifyno: 'Receiver Verify Code'
    },
    statusOptions: {
      op1: 'All',
      op2: 'To be paid',
      op3: 'To be accepted',
      op4: 'To be pickuped',
      op5: 'Pickuped',
      op6: 'Delivered',
      op7: 'Canceled',
      op44: 'Abnormal',
      op45: 'Handled'
    },
    stautsBadOptions: {
      op1: 'All',
      op2: 'Normal Order',
      op3: 'Overtime Order',
      op4: 'Non-accepted Order',
      op5: 'Non-accepted Order(Appt.)',
    },
    senderPaystatusOptions: {
      op1: 'All',
      op2: 'To be paid',
      op3: 'Paid',
      op4: 'Refunded',
    },
    packetTypeOptions: {
      op1: 'All',
      op2: 'Unknow',
      op3: 'Document',
      op4: 'Book',
      op5: 'Flower',
      op6: 'Food',
      op7: 'Cloth',
      op8: 'Other'
    },
    js: {
      cencelHelper: 'Cancel this order?',
      abnormalHelper: 'Set this order as abnormal？',
      abnormalSuccess: 'This order has been set as abnormal',

      abnormalRefundHelper: 'Are you sure you want to refund this order',
      handleAbnormalHelper: 'Are you sure you to set this order as handled',
      abnormalHandleSuccess: 'Handle success！',

      hint: 'Hint',
      yes: 'Confirm',
      no: 'Cancel'
    },
    refundQuery: {
      title: 'Abnormal Refund',
      orderNo: 'Order Number',
      uidSender: 'User ID',
      senderPhoneStr: 'User Phone',
      priceSenderAllStr: 'Order Total Price',
      refundAmount: 'Refund Amount',
      driverRefundAmount: 'Driver Commission',

      nonEmptyHelper: 'Can\'t be Empty',
      validateHelperSingle: 'Should be less than the Order Total Price',
      validateHelperAll: 'Sum of refund and dirver\'s commission should be less than order total price'
    }
  },

  cash: {
    query: {
      title: 'Driver Withdraw List',
      statementNo: 'Order List',
      driverId: 'Driver Id',
      driverPhone: 'Driver Phone',
      updatedAt: 'Withdraw Time',
      payStatus: 'Withdraw Status',
    },
    table: {
      createdAt: 'Apply Time',
      countryName: 'Country',
      amount: 'Withdraw Amount',
      approve: 'Application approved',
      cashOk: 'Confirm Withdraw',
      cashRefuse: 'Reject Withdraw',
    },
    js: {
      payStatus5: 'Processing',
      payStatus6: 'Application approved',
      payStatus7: 'Withdraw Success',
      payStatus8: 'Withdraw Fail',
      approveTips: 'Pass driver\'s{phone} withdraw request?',
      cashOkTips: 'Confirmation Knight {phone} hit money?',
      cashRefuseTips: 'Reject driver\'s{phone} withdraw request?',
    }
  },

  rwcoupon: {
    query: {
      title: 'Reward resources - coupons',
      add: 'Add',
      countryId: 'Limit Country',
      cityId: 'Limit City',
      benefitType: 'Coupon type',
      name: 'Coupon name',
      merchantCode: 'Supplier',
      query: 'Query'
    },
    table: {
      id: 'ID',
      merchantCode: 'Vendor name',
      name: 'Coupon name',
      benefitType: 'Preferential type',
      benefitContent: 'Preferential amount',
      endType: 'Valid Tyoe',
      period: 'Valid Time',
      area: 'Limit Area',
      operate: 'Operate',
      edit: 'Edit',
      view: 'Detail'
    },
    js: {
      discount: 'Discount',
      quota: 'Quota',
      all: 'All',
      day: 'Day',

      benefitType1: 'Discount',
      benefitType2: 'Cash',

      endType1: 'Specified days',
      endType2: 'Specified date'
    }
  },

  rweditcoupon: {
    form: {
      title: 'Reward - Edit Coupon',
      title0: 'Reward - App Coupon',
      basic: 'Basic Info',
      setting: 'Reward Style',
      merchant: 'Merchant Name',
      merchantCode: 'Merchant ID',
      couponId: 'Coupon Name',
      couponInfo: 'Coupon ID',
      benefitType: 'Content',
      period: 'Valid Period',
      area: 'Valid Region',
      needPhone: 'Need Phone Number to Use',
      yes: 'Yes',
      no: 'No',
      upload: 'Reward LOGO',
      uploadTip: 'Only png/jpg/jpeg',
      couponName: 'Reward Name',
      link: 'Detail Url, must start with https://',
      default: 'Default Style',
      vip: 'VIP',
      days: 'DAYS',
      couponName: 'Coupon Name',
      couponTime: '2017.12.25 - 2018.01.01',
      set: 'Config Style',
      detail: 'Detail >>',
      cancel: 'Cancel',
      submit: 'Submit'
    },
    js: {
      day: 'Day(s)',
      benefitType1: 'Discount',
      benefitType2: 'Cash',
    }
  },

  rwinfocoupon: {
    query: {
      title: 'Reward - Coupon Detail',
      basic: 'Basic Info',
      setting: 'Style',
      merchant: 'Merchant Name',
      merchantCode: 'Merchant ID',
      couponId: 'Coupon Name',
      couponInfo: 'Coupon Detail',
      benefitType: 'Content',
      period: 'Valid Period',
      area: 'Valid Region',
      needPhone: 'Neet Phone Number to Use',
      yes: 'Yes',
      no: 'No',
      set: 'Cofig Style',
      detail: 'Detail >>',
      link: 'Detail Url',
    }
  },

  rwcode: {
    query: {
      title: 'Reward - Code',
      add: 'Add',
      merchantCode: 'Merchant Name',
      countryId: 'Valid Country',
      cityId: 'Valid City',
      name: 'Code Name',
      query: 'Query'
    },
    table: {
      id: 'ID',
      merchantCode: 'Merchant Name',
      name: 'Code Name',
      file: 'Code File',
      fileUrl: 'Download',
      usage: 'Claimed/Total',
      area: 'Valid Region',
      operate: 'Operate',
      edit: 'Edit',
      view: 'Detail'
    },
    js: {
      all: 'All'
    }
  },

  rweditcode: {
    form: {
      title: 'Reward Code - Edit',
      title0: 'Reward Code - Add',
      basic: 'Basic Info',
      merchant: 'Merchant Name',
      merchantCode: 'Merchant ID',
      countryId: 'Country',
      cityId: 'City',
      codeName: 'Code Name',
      uploadExcel: 'Code Sheet File',
      choose: 'Upload',
      needPhone: 'Need Phone Number to Use',
      yes: 'Yes',
      no: 'No',
      setting: 'Reward Style',
      upload: 'Reward LOGO',
      uploadTip: 'Only png/jpg/jpeg',
      logoName: 'Reward Subtitle',
      link: 'Detail Url, must start with https://',
      cancel: 'Cancel',
      submit: 'Submit',
      default: 'Default Style',
      defaultName: 'HELLO oBike',
      defaultLogo: 'oBike Promo Code',
      detail: 'Detail >>',
      set: 'Config Style',
    },
    js: {
      uploadOnly: 'Multi file upload non-supported',
      uploadTip1: 'Only xls/xlsx'
    }
  },

  rwinfocode: {
    query: {
      title: 'Reward - Code Detail',
      basic: 'Basic Info',
      merchant: 'Merchant Name',
      merchantCode: 'Merchant ID',
      codeName: 'Code Name',
      fileUrl: 'Code File',
      download: 'Download',
      needPhone: 'Need Phone Number to Use',
      yes: 'Yes',
      no: 'No',
      setting: 'Style',
      set: 'Config Style',
      detail: 'Detail',
      link: 'Detail Url'
    }
  },

  rwcredit: {
    query: {
      title: 'Reward - Credit',
      add: 'Add',
      name: 'Credit Name',
      changeType: 'Credit Tyle',
      query: 'Query'
    },
    table: {
      id: 'ID',
      name: 'Credit Name',
      changeType: 'Credit Tyle',
      score: 'Credit Score',
      createdAt: 'Created At',
      adminName: 'Creater',
      operate: 'Operate',
      edit: 'Edit',
      view: 'Detail'
    },
    js: {
      all: 'All',

      changeType1: 'Plus',
      changeType2: 'Minus'
    }
  },

  rweditcredit: {
    form: {
      title: 'Reward - Edit Credit',
      title0: 'Reward - Add Credit',
      basic: 'Basic Info',
      creditName: 'Credit Name',
      changeType: 'Credit Type',
      plus: 'Plus',
      minus: 'Minus',
      must: 'Required',
      needPhone: 'Need Phone Number to Use',
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      submit: 'Submit'
    }
  },

  rwinfocredit: {
    query: {
      title: 'Reward - Credit Detail',
      basic: 'Basic Info',
      creditName: 'Credit Name',
      changeType: 'Credit Tyle',
      plus: 'Plus',
      minus: 'Minus',
      must: 'Required',
      needPhone: 'Need Phone Number to Use',
      yes: 'Yes',
      no: 'No'
    }
  },

  rwactivity: {
    query: {
      title: 'Activity',
      add: 'Add',
      name: 'Activity Name',
      expireType: 'Activity status',
      rewardsSubNum: 'Reward Number',
      createdStartDate: 'Created start time',
      createdEndDate: 'Created end time',
      startDate: 'Started time',
      endDate: 'Ended end',
      chooseDate: 'Please choose date',
      chooseTime: 'Please choose date and time',
      query: 'Query'
    },
    table: {
      id: 'ID',
      name: 'Activity Name',
      expireType: 'Activity status',
      rewardsSubNum: 'Reward Type',
      rules: 'Receive Rule',
      createdAt: 'Created At',
      startTime: 'Start time',
      endTime: 'End time',
      adminName: 'Creator',
      operate: 'Operate',
      edit: 'Edit',
      view: 'View'
    },
    js: {
      all: 'All',
      rewardsSubNum1: 'Single Level',
      rewardsSubNum2: 'Multi Levels',
      limited1: '{times} times in {day} day(s)',
      limited2: 'Any day，{times} times limit',
      limited0: 'Any day, unlimited times',

      expireType1: 'In effect',
      expireType2: 'Expired',
      expireType3: 'Not effect yet',
    }
  },

  rweditactivity: {
    form: {
      title: 'Edit Activity',
      title0: 'Add Activity',
      name: 'Activity Name',
      countryId: 'Country',
      cityId: 'City',
      startDateTime: 'Start Time',
      startPlaceholder: 'Select Time',
      endDateTime: 'End Time',
      endPlaceholder: 'Select Time',
      addReward: 'Add Reward',
      prioirtyNode: '*Note：Rewards will be delivered based on priority. If user is not qualified to receive rewards in first level of priority, those in second level will be check, etc.',
      priority: 'Priority',
      priorityDetail: 'Rewards in Level',
      priorityPlaceholder: 'Integer larger than 0',
      merchantCode: 'Merchant',
      rewardType: 'Reward Type',
      rewardId: 'Reward Name',
      unlimited: 'Total Amount Unlimit',
      yes: 'Yes',
      no: 'No',
      rewardNum: 'Total Amount',
      addNew: 'Add',
      empty: 'Empty',
      inputAmount: 'Input Amount',
      noName: 'Unname',
      noLimit: 'Unlimit Amount',
      limited: 'Single User Receive Rule',
      limited1: 'Limit Amount-limit Day',
      limited2: 'Limit Amount-Unlimit Day',
      limited0: 'Unlimit Amount-Unlimit Day',
      unitTime: 'Day(s)',
      limitedTimes: 'Time(s)',
      cancel: 'Cancel',
      submit: 'Save',
      edit: 'Edit'
    },
    js: {
      rewardType1: 'Coupon',
      rewardType2: 'Code',
      rewardType3: 'Credit',
      message: 'Delete this reward？',
      tip: 'Hint',
      ok: 'Yes',
      cancel: 'No'
    }
  },

  ...enterprise,
  ...evs,
  ...ocoin,
  // for elementUi i18n
  ...enLocale
}
