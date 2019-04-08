function getCurrentDay() {
  let now = new Date(),
      year = now.getFullYear(),
      month = now.getMonth() + 1,
      day = now.getDate();
  let date = year + '/' + month + '/' + day;
  
  return Date.parse(date);
}

function getPastTime(val) {
  if(!val){
    return;
  }
  let now = val,
      hours = now.getHours(),
      minutes = now.getMinutes(),
      seconds = now.getSeconds();
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

export default {
  data() {
    return {
      pickerStartOption: {
        disabledDate(time) {
          return time.getTime() < getCurrentDay();
        }
      },
      pickerEndOption: {
        disabledDate(time) {
          return time.getTime() < getCurrentDay();
        }
      },
      dateTimeRange: {
        startDateTime: '',
        endDateTime: ''
      },
      endDateTime: ''
    }
  },
  computed: {
    disabledStart() {
      return (new Date(this.endDateTime).getTime() < Date.now()) ? true : false;
    }
  },
  methods: {
    handleStartDateChange(val) {
      this.dateTimeRange.startDateTime = (new Date(val).getTime() < Date.now()) ? new Date()
        : (new Date(this.endDateTime).getTime() < new Date(val).getTime()) ? this.endDateTime : val;
      this.pickerEndOption = {
        disabledDate(time) {
          return time.getTime() < (new Date(val).getTime()) - getPastTime(val);
        }
      }
    },
    handleEndDateChange(val) {
      this.endDateTime = val;
      this.pickerStartOption = {
        disabledDate(time) {
          return time.getTime() < getCurrentDay() || time.getTime() > new Date(val).getTime();
        }
      }
    }
  }
}
