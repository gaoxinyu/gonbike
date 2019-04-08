export default {
  enterpriseAccount: {
    query: {
      title: 'Enterprise account list',
      abbr: 'Enterprise abbreviation',
      phone: 'Business account',
      countryId: 'Country',
      frozen: 'Status',
      startTime: 'Registration start date',
      endTime: 'Registration end date',
    },
    table: {
      id: 'Enterprise ID',
      createdAtStr: 'Registration Date',
      abbr: 'Enterprise abbreviation',
      phoneStr: 'Enterprise account',
      countryName: 'Country',
      packageNameStr: 'Package name',
      memberNum: 'Member count',
      peopleNum: 'Package limit',
      payAmount: 'Actual payment',
      startTimeStr: 'Package start date',
      endTimeStr: 'Package end date',
      typeStr: 'Status',
      activate: 'Activate',
      inactivate: 'Inactivate',
      resetPassword: 'Reset password',
      manageOrders: 'Manage package',
    },
    js: {
      frozenOption0: 'Activate',
      frozenOption1: 'Inactivate',
    }
  },

  enterpriseAccountInfo: {
    title: 'Enterprise info',
    basic: {
      title: 'Base info',
      id: 'Enterprise ID',
      countryName: 'Country',
      name: 'Enterprise name',
      email: 'Enterprise email',
      abbr: 'Enterprise abbreviation',
      telephone: 'Enterprise phone number',
      contact: 'Contact',
      phone: 'Contact phone number',
      frozen: 'Enterprise Status',
    },
    package: {
      title: 'Current package info',
      packageId: 'Package ID',
      packageName: 'Package name',
      days: 'Package range',
      type: 'Package type',
      peopleNum: 'Package number',
      TimeStr: 'Start&end Date',
      amount: 'Total amount',
      payAmount: 'Actual payment',
      packageCreatedAtStr: 'Package create time',
    }
  },

  enterpriseAccountAdd: {
    titleAdd: 'New enterprise account',
    titleEdit: 'Edit enterprise account',
    submitAdd: 'Create',
    submitEdit: 'Update',
    label: {
      country: 'Country',
      name: 'Enterprise name',
      abbr: 'Enterprise abbreviation',
      email: 'Enterprise email',
      password: 'Password',
      checkPassword: 'Confirm password',
      telephone: 'Enterprise phone number',
      contact: 'Contact',
      phone: 'Contact phone number',
      reset: 'Reset'
    },
    placeholder: {
      abbr: 'A combination with at most 6 letters(a-zA-Z)',
      password: 'A combination of numerals(0-9), uppercase letters and lowercase letters. 8-12 digits'
    },
    rules: {
      inputPass: 'Please input password',
      inputPassAgain: 'Please input password again',
      passDiff: 'Passwords are different',
      country: 'Please select country',
      name1: 'Enterprise name can\'t be empty',
      name2: '0-100 characters',
      abbr1: 'Enterprise abbreviation can\'t be empty',
      abbr2: 'A combination with at most 6 letters(a-zA-Z)',
      email: 'Please input valid email address',
      telephone: 'Enterprise phone can\'t be empty',
      contact: 'Cantact can\'t be empty',
      phone: 'Cantact phone can\'t be empty',
      pass1: 'Password can\'t be empty',
      pass2: 'Must be a combination of numerals(0-9), uppercase letters and lowercase letters. 8-12 digits',
    }
  },

  enterpriseAccountReset: {
    tip: 'Must be a combination of numerals(0-9), uppercase letters and lowercase letters. 8-12 digits',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },

  enterprisePackage: {
    title: 'Package list',
    table: {
      id: 'Package ID',
      createdAtStr: 'Package create date',
      name: 'Package name',
      countryName: 'Country',
      startTimeStr: 'Start date',
      endTimeStr: 'End date',
      peopleNum: 'Package limit',
      amount: 'Package price',
      discountStr: 'Discount',
      payAmount: 'Pay amount',
    }
  },

  enterprisePackageAdd: {
    title: 'Add package',
    create: 'Create',
    reset: 'Reset',
    label: {
      countryId: 'Select country',
      name: 'Package name',
      amount: 'Package price',
      peopleNum: 'Package limit',
      startTime: 'Start date',
      days: 'Package validity',
      payAmount: 'Pay amount',
    },
    placeholder: {
      select: 'Please select',
      name: 'A combination with at most 6 letters(a-zA-Z)',
      input: 'Please input',
      date: 'Select date',
      day: 'day(s)',
    },
    rules: {
      payAmount1: 'Please input pay amount',
      payAmount2: 'Pay amount must be lower than package price!',
      countryId: 'Please select country',
      name1: 'Package name can\'t be empty',
      name2: 'Package name should have 0~100 characters',
      amount: 'Please input a number larger than 0',
      peopleNum: 'Please input a integer larger than 0',
      startTime: 'Please select date',
      days: 'Please input a integer larger than 0',
      payAmount: 'Please input a number larger than 0',

    }
  }
}