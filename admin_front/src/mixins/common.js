export default {
  methods: {
    getNameById(options, id) {
      let ret = "";
      options.forEach((option) => {
        if(option.value === id) {
          ret = option.label;
        }
      });
      return ret;
    },
    randPass(min, max, passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([-_#]{0,})[A-Za-z\d-_#]{8,15}$/) {
      const seed = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '_', '-', '#'
      ];

      // 校验规则8-15个字符，必须包含数字，字母大小写，允许包含特殊字符[- _ #]
      // const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([-_#]{0,})[A-Za-z\d-_#]{8,15}$/;

      let dist = '',
          pos = 0,
          range = Math.round(Math.random() * (max - min)) + min;
      while(!passReg.test(dist)) {
        dist = '';
        for(let i = 0; i < range; i++) {
          pos = Math.round(Math.random() * (seed.length - 1));
          dist += seed[pos];
        }
      }
      return dist;
    }
  }
}
