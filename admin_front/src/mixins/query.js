import {getStorage} from '../services/auth'
import moment from "moment";

export default {
  methods: {
    resetQuery() {
      let q = this.query;
      if(q) {
        // query里不要重置的参数
        const except = ['pageNum', 'page', 'activityType', 'couponType', 'apiId'];
        // this实例里需要清除的参数
        const parameter = ['beginTime', 'startTime', 'endTime', 'createdTime',
                          'time', 'validDate', 'modifyTime', 'createdAt',
                          'activedTime', 'phone', 'coordinate', 'sendDate', 'exchangedDate',
                          'recycleDate', 'relaunchDate','OnAt','OffAt', 'useTime'];
      
        for(let k in q) {
          if(except.indexOf(k) === -1) {
            q[k] = null;
          }
        }

        parameter.map(par => {
          if(this[par]) {
            this[par] = null; 
          }
        });
      }
    },
    exportExcel(url) {
      let parms = [];
      for(let key in this.query) {
        if(this.query[key] !== null && this.query[key] !== '' && this.query[key] !== undefined && key !== 'pageNum') {
          parms.push(key + '=' + this.query[key]);
        }
      }
    
      const token = getStorage('token');
      if(token) {
        parms.push("Authorization=Bearer " + token.accessToken);
      }
    
      let iframe = document.createElement("iframe");
      iframe.id = 'iframeRequest';
      iframe.style.display = 'none';
      iframe.src = `${url}?${parms.join('&')}`;
      document.body.appendChild(iframe);
    },
    getDefaultDate() {
      // 返回默认查询的时间段
      const startDate = new Date();
      const endDate = new Date();
      const startDateStr = moment(startDate).format("YYYY-MM-DD");
      const endDateStr = moment(endDate).format("YYYY-MM-DD");
      const startTimestamp = moment(startDateStr).toDate().getTime();
      const endTimestamp = moment(endDateStr).toDate().getTime();

      return {
        startDate,
        endDate,
        startDateStr,
        endDateStr,
        startTimestamp,
        endTimestamp,
      }
    }
  }
}