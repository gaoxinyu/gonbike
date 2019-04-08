import * as API from './resources'
import {saveStorage} from '../services/auth'

// get: {method: 'GET'},
// save: {method: 'POST'},
// query: {method: 'GET'},
// update: {method: 'PUT'},
// remove: {method: 'DELETE'},
// delete: {method: 'DELETE'}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

let ctx = null;

function checkIfOK(response) {
  ctx.loading = false;
  if (!response.ok) {
    return ctx.$message({message: "error", type: 'error'});
  }
  const data = response.data;
  if (data.success) {
    return data;
  } else {
    ctx.$message({message: data.data.error, type: 'error'});
    const error = new Error(data.data.error);
    error.data = data;
    throw error;
  }
}

function filterQuery(query) {
  const q = {...query};
  for (const k in q) {
    if (q[k] === null || q[k] === '' || q[k] === undefined) {
      delete q[k];
    } else if (typeof q[k] === 'string') {
      q[k] = q[k].trim();
    }
  }
  return q;
}

export default {
  login(context, user) {
    ctx = context;
    context.loading = true;
    return API.Login.save(user)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        let token = data.data;
        saveStorage("token", token);
        context.$router.push({name: "welcome"});
        // location.reload();
      })
      .catch((err) => ({err}));
  },

  // 验证码登录 zhu 2017.09.20
  loginV2(context, user) {
    ctx = context;
    ctx.loading = true;
    context.loading = true;
    return API.LoginV2.save(user)
      .then(checkStatus)
      // .then(checkIfOK)
      .then((response) => {
        context.loginInfo = response.data;
        return context.loginInfo;
      })
      .catch((err) => ({err}));
  },

  // 获取图形验证码 zhu 2017.09.20
  getPicCode(context) {
    return API.PicCode.get()
      .then(checkStatus)
      .then((response) => {
        if (!response.ok) {
          return context.$message({message: "error", type: 'error'});
        }

        const data = response.data;
        if (data.success) {
          context.picCode = data.data;
        } else {
          context.$message({message: data.data.error, type: 'error'});
        }
      })
      .catch((err) => ({err}));
  },

  // 提交手机验证码
  saveSMSCode(context, query) {
    ctx = context;
    context.loading = true;
    return API.SMSCode.save(query)
      .then(checkStatus)
      // .then(checkIfOK)
      .then((data) => {
        ctx.submitData = data.data;
        // location.reload();
      })
      .catch((err) => ({err}));
  },

  getSMSCode(context, query) {
    ctx = context;
    // context.loading = true;
    return API.reSMSCode.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.submitData = data.data;
      })
      .catch((err) => ({err}));
  },

  modifyPassword(context, query) {
    ctx = context;
    context.loading = true;
    return API.Password.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.$message({message: data.data.message, type: 'success'});
        context.$router.push({name: "welcome"});
      })
      .catch((err) => ({err}));
  },

  getCurrent(context) {
    return API.Current.get()
      .then(checkStatus)
      .then((response) => {
        if (!response.ok) {
          return context.$message({message: "error", type: 'error'});
        }

        const data = response.data;
        if (data.success) {
          context.current = data.data;
          if (!data.data.init) {
            context.$router.push({path: "/password"});
          }
        } else {
          context.$message({message: data.data.error, type: 'error'});
        }
      })
      .catch((err) => ({err}));
  },

  getAppVersionList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.AppVersion.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.versionList = data.data.list;
        context.page = data.data;
        return context.versionList;
      })
      .catch((err) => ({err}));
  },

  getAppVersionLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.AppVersionLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.versionLogList = data.data.logs;
        context.page = data.data;
        return context.versionLogList;
      })
      .catch((err) => ({err}));
  },

  deleteAppVersion(context, query) {
    ctx = context;
    context.loading = true;
    // return API.AppVersion.delete(query)
    return context.$http.delete('app_version', {body: {...query}})
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateAppVersion(context, query) {
    ctx = context;
    context.loading = true;
    return API.AppVersion.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "version"});
      })
      .catch((err) => ({err}));
  },

  saveAppVersion(context, query) {
    ctx = context;
    context.loading = true;
    return API.AppVersion.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "version"});
      })
      .catch((err) => ({err}));
  },

  getMessageList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Message.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.messages = data.data.list;
        context.page = data.data;
        return context.messages;
      })
      .catch((err) => ({err}));
  },

  saveMessage(context, query) {
    ctx = context;
    context.loading = true;
    return API.Message.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "message"});
      })
      .catch((err) => ({err}));
  },

  updateMessage(context, query) {
    ctx = context;
    context.loading = true;
    return API.Message.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "message"});
      })
      .catch((err) => ({err}));
  },
  // 停车区域管理 zhu 2017/04/13
  getBikeAreaList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeArea.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bikearea = data.data.list;
        context.page = data.data;
        return context.bikearea;
      })
      .catch((err) => ({err}));
  },

  saveBikeArea(context, query) {
    ctx = context;
    context.addVisible = false;
    return API.BikeArea.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        // ctx.$message({ message: data.data.message, type: 'success' });
        // ctx.$router.push({'name': "bikearea"});
        // context.savemsg = { message: data.data.message, type: 'success' };
        // return context.savemsg;
        context.message = data;
        return context.message;
      })
      .catch((err) => ({err}));
  },

  updateBikeArea(context, query) {
    ctx = context;
    return API.BikeArea.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "bikearea"});
      })
      .catch((err) => ({err}));
  },

  updateBikeHelmetInfo(context, query) {
    ctx = context;
    return API.BikeHelmetInfo.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "bike"});
      })
      .catch((err) => ({err}));
  },

  getBikeAreaLog(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeAreaLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bikearealog = data.data.list;
        context.page = data.data;
        return context.bikearealog;
      })
      .catch((err) => ({err}));
  },

  // 短信运营商设置 zhu 2017/04/11
  getSMSProvider(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SMSRates.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.rates = data.data.smsRates;
        context.page = data.data.smsRates;
        return context.rates;
      })
      .catch((err) => ({err}));
  },

  // 短信操作记录 Xiangyu 2017/10/10
  getSmsLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SmsLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.smsLogs = data.data.list;
        return context.smsLogs;
      })
      .catch((err) => ({err}));
  },

  updateSMSRate(context, query) {
    ctx = context;
    context.loading = true;
    return API.SMSRates.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "message"});
      })
      .catch((err) => ({err}));
  },
  // 邀请好友赠送管理 zhu 2017.04.25
  getCouponsInvite(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CouponsInvite.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.invites = data.data.list;
        context.page = data.data;
        return context.invites;
      })
      .catch((err) => ({err}));
  },

  // 广告位 zhu 2017.09.01
  getADAreaList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.ADAreaList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.adareas = data.data.list;
        context.page = data.data;
        return context.adareas;
      })
      .catch((err) => ({err}));
  },
  getADAreaInfo(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.ADArea.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.adinfo = data.data;
        context.page = data.data;
        return context.adinfo;
      })
      .catch((err) => ({err}));
  },
  getADAreaLog(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.ADAreaLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.adlogs = data.data.list;
        context.page = data.data;
        return context.adlogs;
      })
      .catch((err) => ({err}));
  },
  saveADArea(context, query) {
    ctx = context;
    context.loading = true;
    return API.ADArea.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "adarea"});
      })
      .catch((err) => ({err}));
  },
  updateADArea(context, query) {
    ctx = context;
    context.loading = true;
    return API.ADArea.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "adarea"});
      })
      .catch((err) => ({err}));
  },
  // 单车logo管理 zhu 2017.04.17
  saveBikeLogo(context, query) {
    ctx = context;
    context.loading = true;
    return API.BikeLogoSave.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "bikelogo"});
      })
      .catch((err) => ({err}));
  },

  updateBikeLogo(context, query) {
    ctx = context;
    context.loading = true;
    return API.BikeLogoUpdate.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "bikelogo"});
      })
      .catch((err) => ({err}));
  },

  getBikeLogoList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeLogoList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bikelogos = data.data.list;
        context.page = data.data;
        return context.bikelogos;
      })
      .catch((err) => ({err}));
  },

  deleteBikeLogo(context, query) {
    ctx = context;
    context.loading = true;
    return API.BikeLogoDelete.delete(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getBikeLogoLog(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeLogoLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bikelogolog = data.data.list;
        context.page = data.data;
        return context.bikelogolog;
      })
      .catch((err) => ({err}));
  },

  // 单车国家配置 zhu 2017.05.03
  getBikeCodeList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeCode.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.stateconfigs = data.data.list;
        context.pages = data.data;
        return context.stateconfigs;
      })
      .catch((err) => ({err}));
  },

  saveBikeCode(context, query) {
    ctx = context;
    context.loading = true;
    return API.BikeCode.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "stateconfig"});
      })
      .catch((err) => ({err}));
  },

  updateBikeCode(context, query) {
    ctx = context;
    context.loading = true;
    return API.BikeCode.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "stateconfig"});
      })
      .catch((err) => ({err}));
  },

  getStateConfigLog(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.StateConfigLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.stconflog = data.data;
        context.page = data.data;
        return context.stconflog;
      })
      .catch((err) => ({err}));
  },

  getLockList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Locks.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.locks = data.data.list;
        context.page = data.data;
        return context.locks;
      })
      .catch((err) => ({err}));
  },

  getUserList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.User.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.users = data.data.list;
        context.page = data.data;
        return context.users;
      })
      .catch((err) => ({err}));
  },

  getVipCardList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.VipCard.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.vipcardlist = data.data.list;
        context.page = data.data;
        return context.vipcardlist;
      })
      .catch((err) => ({err}));
  },

  saveVipDelay(context, query) {
    ctx = context;
    context.loading = true;
    return API.VipDelay.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  deleteVipCard(context, query) {
    ctx = context;
    context.loading = true;
    return API.DelVip.delete(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  saveGiveVip(context, query) {
    ctx = context;
    context.loading = true;
    return API.GiveVip.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getVipPayDetailsList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.VipPayDetails.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.vippaydetail = data.data;
        context.page = data.data;
        return context.vippaydetail;
      })
      .catch((err) => ({err}));
  },

  getCountryVipCardList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CountryVipCard.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.countryvipcard = data.data.list;
        context.page = data.data;
        return context.countryvipcard;
      })
      .catch((err) => ({err}));
  },

  // 自动续费管理 2017.10.27 zhu
  getAutoPays(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.AutoPay.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.autopays = data.data.list;
        context.page = data.data;
        return context.devices;
      })
      .catch((err) => ({err}));
  },

  cancelAutopay(context, query) {
    ctx = context;
    context.loading = true;
    return context.$http.patch('clubcard-renew?id=' + query.id)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getAutoCancelLog(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.AutoCancelLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.autocancels = data.data.list;
        context.page = data.data;
        return context.devices;
      })
      .catch((err) => ({err}));
  },

  // 用户图标奖励信息展示 zhu 2017.11.01
  getRedPacketList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RedPacket.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.redpackets = data.data.list;
        context.page = data.data;
        return context.redpackets;
      })
      .catch((err) => ({err}));
  },
  getRewardDetail(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RewardDetail.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((res) => {
        context.rewardDetails = res.data.details;
        return context.rewardDetails;
      })
      .catch((err) => ({err}));
  },
  // getCouponTypes(context, query) {
  //   ctx = context;
  //   context.loading = true;
  //   query = filterQuery(query);
  //   return API.CouponTypes.get(query)
  //     .then(checkStatus)
  //     .then(checkIfOK)
  //     .then((data) => {
  //       context.couponTypes = data.data;
  //       return context.couponTypes;
  //     })
  //     .catch((err) => ({ err }));
  // },

  getDeviceList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Device.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.devices = data.data.list;
        context.page = data.data;
        return context.devices;
      })
      .catch((err) => ({err}));
  },

  getCreditList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Credit.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.credits = data.data.list;
        context.page = data.data;
        return context.credits;
      })
      .catch((err) => ({err}));
  },

  updateCredit(context, query) {
    ctx = context;
    context.loading = true;
    return API.Credit.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "credit"});
      })
      .catch((err) => ({err}));
  },

  getBikeList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Bike.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bikes = data.data.list;
        context.page = data.data;
        return context.bikes;
      })
      .catch((err) => ({err}));
  },

  updateBikeForbidden(context, query) {
    ctx = context;
    context.loading = true;
    return API.BikeForbidden.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateBikeUnForbidden(context, query) {
    ctx = context;
    context.loading = true;
    return API.BikeUnForbidden.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 激活单车
  activateBike(context, query) {
    ctx = context;
    context.loading = true;
    return context.$http.patch('bike/' + query.bikeId + '/active')
      .then(checkStatus)
      .then(checkIfOK)
      // .then((data) => {
      //   ctx.$message({ message: data.data.message, type: 'success' });
      // })
      .catch((err) => ({err}));
  },

  unbindBike(context, query) {
    ctx = context;
    context.loading = true;
    // return API.BikeUnbind.patch(query)
    return context.$http.patch('bike/unbind', {...query})
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  resetBike(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.ResetBike.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateBikeCountry(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeCountry.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getOrderList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Order.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.orders = data.data.list;
        context.page = data.data;
        return context.orders;
      })
      .catch((err) => ({err}));
  },

  getLockUnbindList(context) {
    ctx = context;
    context.loading = true;
    return API.LockUnbind.get()
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.unbindLocks = data.data;
        context.unbindLocks.forEach((item) => item.value = item.lockNo);
        context.page = data.data;
        return context.unbindLocks;
      })
      .catch((err) => ({err}));
  },

  updateBikeLock(context, query) {
    ctx = context;
    context.loading = true;
    return API.Bike.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "bike"});
      })
      .catch((err) => ({err}));
  },

  getBikeFaultList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeFault.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.faultBikes = data.data.list;
        context.page = data.data;
        return context.faultBikes;
      })
      .catch((err) => ({err}));
  },

  getBikeReportList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.ReportList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.faultBikes = data.data.list;
        context.page = data.data;
        return context.faultBikes;
      })
      .catch((err) => ({err}));
  },

  updateFaultIgnore(context, query) {
    ctx = context;
    context.loading = true;
    return API.FaultIgnore.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "report"});
      })
      .catch((err) => ({err}));
  },

  updateFaultCredits(context, query) {
    ctx = context;
    context.loading = true;
    return API.FaultCredits.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "report"});
      })
      .catch((err) => ({err}));
  },

  updateReportLog(context, query) {
    ctx = context;
    context.loading = true;
    return API.ReportLog.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        // ctx.$router.push({'name': "report"});
      })
      .catch((err) => ({err}));
  },

  saveFaultConfirm(context, query) {
    ctx = context;
    context.loading = true;
    return API.FaultConfirm.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "report"});
      })
      .catch((err) => ({err}));
  },

  saveReport(context, query) {
    ctx = context;
    context.loading = true;
    return API.Report.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "report"});
      })
      .catch((err) => ({err}));
  },

  getReportHistoryList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.ReportHistory.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.historys = data.data.workSheetHistory;
        return context.historys;
      })
      .catch((err) => ({err}));
  },

  getAccountLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.AccountLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.accountLogs = data.data.list;
        context.page = data.data;
        return context.accountLogs;
      })
      .catch((err) => ({err}));
  },

  getInformer(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Informer.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.informer = data.data;
        context.page = data.data;
        return context.informer;
      })
      .catch((err) => ({err}));
  },

  getBeInformer(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BeInformer.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.beInformer = data.data;
        context.page = data.data;
        return context.beInformer;
      })
      .catch((err) => ({err}));
  },

  getFaultDetail(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.FaultDetail.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.fault = data.data;
        context.page = data.data;
        return context.fault;
      })
      .catch((err) => ({err}));
  },

  getFilterBikeList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.FilterBike.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.filterBikes = data.data.filterBikeList;
        return context.filterBikes;
      })
      .catch((err) => ({err}));
  },

  getBikeDetail(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeDetail.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bike = data.data.data.bikeDetail || {};
        context.order = data.data.data.bikeOrder || {};
        return context.bike;
      })
      .catch((err) => ({err}));
  },

  getLastOrder(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.LastOrder.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bikeOrder = data.data.order || {};
        context.lastOrder = data.data.lastOrder || {};
        return context.bikeOrder;
      })
      .catch((err) => ({err}));
  },

  getBikeUnhandle(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeUnhandle.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.reportUnhandles = data.data.list || {};
        context.total = data.data.total || 0;
        return context.reportUnhandles;
      })
      .catch((err) => ({err}));
  },

  updateAccount(context, query) {
    ctx = context;
    context.loading = true;
    return API.Account.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  saveLock(context, query) {
    ctx = context;
    context.loading = true;
    return API.Lock.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "lock"});
      })
      .catch((err) => ({err}));
  },

  updateLock(context, query) {
    ctx = context;
    context.loading = true;
    return API.Lock.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "lock"});
      })
      .catch((err) => ({err}));
  },

  deleteLock(context, query) {
    ctx = context;
    context.loading = true;
    return API.Lock.delete(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getOrderInfo(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.OrderInfo.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.order = data.data.Order || {};
        return context.bike;
      })
      .catch((err) => ({err}));
  },

  updateUserTrip(context, query) {
    ctx = context;
    context.loading = true;
    return API.HisLock.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateBalance(context, query) {
    ctx = context;
    context.loading = true;
    return API.Balance.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        return data;
      })
      .catch((err) => ({err}));
  },

  getSmsList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SmsList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.smsList = data.data.list;
        context.page = data.data;
        return context.smsList;
      })
      .catch((err) => ({err}));
  },

  saveSms(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Sms.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({name: "sms"});
      })
      .catch((err) => ({err}));
  },

  getSmsTemplateList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SmsTemplate.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.smsTemplateList = data.data.list;
        context.page = data.data;
        return context.smsTemplateList;
      })
      .catch((err) => ({err}));
  },

  getSmsTemplateAll(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SmsTemplateAll.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.smsTemplates = data.data.list;
        context.page = data.data;
        return context.smsTemplates;
      })
      .catch((err) => ({err}));
  },

  getSmsLanguageList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SmsLanguage.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.smsLanguages = data.data;
        context.page = data.data;
        return context.smsLanguages;
      })
      .catch((err) => ({err}));
  },

  saveSmsTemplate(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SmsTemplate.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateSmsTemplate(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SmsTemplate.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  deleteSmsTemplate(context, query) {
    ctx = context;
    context.loading = true;
    // return API.SmsTemplate.delete(query)
    return context.$http.delete('sms-template', {body: {...query}})
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getSmsBlackList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BlackList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.smsBlackList = data.data.list;
        context.page = data.data;
        return context.smsBlackList;
      })
      .catch((err) => ({err}));
  },

  saveSmsBlackList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BlackList.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateSmsBlackList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BlackList.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  deleteSmsBlackList(context, query) {
    ctx = context;
    context.loading = true;
    return context.$http.delete('black-list', {body: {...query}})
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getCountryList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Country.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.countrys = data.data.list;
        context.countryPage = data.data;
        return context.countrys;
      })
      .catch((err) => ({err}));
  },

  updateCountry(context, query) {
    ctx = context;
    context.loading = true;
    return API.Country.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getCountryLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CountryLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.countryLogs = data.data.log;
        return context.countryLogs;
      })
      .catch((err) => ({err}));
  },

  getStudentApplyList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.StudentApply.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.studentApplys = data.data.list;
        context.page = data.data;
        return context.studentApplys;
      })
      .catch((err) => ({err}));
  },

  updateStudentApply(context, query) {
    ctx = context;
    context.loading = true;
    return API.StudentApply.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "student"});
      })
      .catch((err) => ({err}));
  },

  getStudentApplyLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.StudentApplyLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.applyLogs = data.data.studentApplyLog;
        return context.applyLogs;
      })
      .catch((err) => ({err}));
  },

  getCountryInfo(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CountryInfo.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.country = data.data;
        return context.country;
      })
      .catch((err) => ({err}));
  },

  getCitysByCountry(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Citys.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.citys = data.data.cityList;
        return context.citys;
      })
      .catch((err) => ({err}));
  },

  getPriceList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.UnitPrice.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.prices = data.data.list;
        context.page = data.data;
        return context.prices;
      })
      .catch((err) => ({err}));
  },

  saveUnitPrice(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.UnitPrice.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({name: "price"});
      })
      .catch((err) => ({err}));
  },

  updateUnitPrice(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.UnitPrice.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({'name': "price"});
      })
      .catch((err) => ({err}));
  },

  getUnitPriceLog(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.UnitPriceLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.priceLogs = data.data.logList;
        return context.priceLogs;
      })
      .catch((err) => ({err}));
  },

  getMaxUnitPrice(context, query) {
    ctx = context;
    query = filterQuery(query);
    return API.GetMaxUnitPrice.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.unitTime = data.data;
        return context.unitTime;
      })
      .catch((err) => ({err}));
  },

  updateMaxUnitPrice(context, query) {
    ctx = context;
    query = filterQuery(query);
    return API.UpdateMaxUnitPrice.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getActivityList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    // console.log("函数内部的", query);
    return API.Activity.get(query)
    // return API.FreeRideActivityList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.activitys = data.data.list;
        context.page = data.data;
        return context.activitys;
      })
      .catch((err) => ({err}));
  },

  getActivityLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.ActivityLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.activityLogs = data.data.logList;
        return context.activityLogs;
      })
      .catch((err) => ({err}));
  },

  getActivityCodeLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.ActivityCodeLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.activityLogs = data.data.logList;
        return context.activityLogs;
      })
      .catch((err) => ({err}));
  },

  saveActivity(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Activity.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        // ctx.$router.push({name: "activity"});
      })
      .catch((err) => ({err}));
  },

  updateActivity(context, query) {
    ctx = context;
    context.loading = true;
    return API.Activity.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        // ctx.$router.push({'name': "activity"});
      })
      .catch((err) => ({err}));
  },

  // 押金折扣 参与用户 zhu 2017.04.27
  getPartInUsers(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PartInUsers.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.partinusers = data.data.list;
        context.page = data.data;
        return context.partinusers;
      })
      .catch((err) => ({err}));
  },

  getCoupons(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Coupons.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.coupons = data.data.list;
        context.page = data.data;
        return context.coupons;
      })
      .catch((err) => ({err}));
  },

  saveCoupon(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Coupons.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        // ctx.$router.push({name: "coupon"});
      })
      .catch((err) => ({err}));
  },

  updateCoupon(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Coupons.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        // ctx.$router.push({name: "coupon"});
      })
      .catch((err) => ({err}));
  },

  getCouponLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CouponLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.couponLogs = data.data.couponLog;
        return context.couponLogs;
      })
      .catch((err) => ({err}));
  },

  getCouponsNopage(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CouponsNopage.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.coupons = data.data.couponVoList;
        return context.coupons;
      })
      .catch((err) => ({err}));
  },

  getCodes(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Codes.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.codes = data.data.list;
        context.page = data.data;
        return context.codes;
      })
      .catch((err) => ({err}));
  },

  exportCodes(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CodesFile.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        // context.codes = data.data.list;
        // context.page = data.data;
        return context.codes;
      })
      .catch((err) => ({err}));
  },

  saveCode(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Codes.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({name: "code"});
      })
      .catch((err) => ({err}));
  },

  updateCode(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Codes.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        ctx.$router.push({name: "code"});
      })
      .catch((err) => ({err}));
  },

  getCodesRecord(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CodesRecord.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.records = data.data.list;
        context.page = data.data;
        return context.records;
      })
      .catch((err) => ({err}));
  },

  getCountryCards(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CodesCards.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.cardOptions = data.data;
        return context.cardOptions;
      })
      .catch((err) => ({err}));
  },

  getRandomCodes(context) {
    ctx = context;
    context.loading = true;
    return API.RandomCodes.get()
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        return data.data.code;
      })
      .catch((err) => ({err}));
  },

  getCards(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Cards.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.cards = data.data.list;
        context.page = data.data;
        return context.cards;
      })
      .catch((err) => ({err}));
  },

  saveCard(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Cards.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateCard(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Cards.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  ifCardConflict(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CardConflict.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        return data.data;
      })
      .catch((err) => ({err}));
  },

  getRoleList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Roles.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.roles = data.data.list;
        context.page = data.data;
        return context.roles;
      })
      .catch((err) => ({err}));
  },

  getAllRoles(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.AllRoles.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.roles = data.data.roles;
        return context.roles;
      })
      .catch((err) => ({err}));
  },

  saveRole(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Roles.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateRole(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Roles.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getAdminList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Admin.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.accountList = data.data.list;
        context.page = data.data;
        return context.accountList;
      })
      .catch((err) => ({err}));
  },

  saveAdmin(context, query) {
    ctx = context;
    context.loading = true;
    return API.Admin.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateAdmin(context, query) {
    ctx = context;
    context.loading = true;
    return API.Admin.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  deleteAdmin(context, query) {
    ctx = context;
    context.loading = true;
    return API.Admin.delete(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getModuleList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Modules.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.modules = data.data.modules;
        return context.modules;
      })
      .catch((err) => ({err}));
  },

  updateRoleModules(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RoleModules.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateAdminPassword(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.AdminPassword.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getMemberCoupons(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.MemberCoupon.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.userCoupons = data.data.list;
        context.page = data.data;
        return context.userCoupons;
      })
      .catch((err) => ({err}));
  },

  saveUserCoupon(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SendCoupon.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 消息推送 zhu 2017.05.08
  getNotifiBizList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.NotifiBizList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.notifiBizList = data.data.list;
        context.page = data.data;
        return context.notifiBizList;
      })
      .catch((err) => ({err}));
  },

  getPushRecList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PushRecord.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.pushrecs = data.data.list;
        context.page = data.data;
        return context.pushrecs;
      })
      .catch((err) => ({err}));
  },

  getNewsTmplLog(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.NewsTmplLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.functmplogs = data.data.list;
        context.pages = data.data;
        return context.functmplogs;
      })
      .catch((err) => ({err}));
  },

  getNotifiBiz(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.NotifiBiz.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.notifibiz = data.data.list;
        context.page = data.data;
        return context.notifibiz;
      })
      .catch((err) => ({err}));
  },

  deleteNotifiBiz(context, query) {
    ctx = context;
    context.loading = true;
    return API.NotifiBizLang.delete(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  saveNotifiBiz(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.NotifiBizLang.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateNotifiBiz(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.NotifiBizLang.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateNotifiBizTmpl(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.NotifiBizTmpl.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getLaunchTags(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.LaunchTag.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.tags = data.data.list;
        if (!!query.pageNum) {
          context.page = data.data;
        }
        return context.tags;
      })
      .catch((err) => ({err}));
  },

  saveLaunchTag(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.LaunchTag.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  saveLaunchTagExcel(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.LaunchTagExcel.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 国家城市配置 zhu 2017.05.11
  getCountryCityList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CityList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.citylists = data.data.list;
        context.pages = data.data;
        return context.citylists;
      })
      .catch((err) => ({err}));
  },

  saveCountryCity(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CityConfig.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateCountryCity(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CityConfig.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateLaunchTag(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.LaunchTag.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  deleteLaunchTag(context, query) {
    ctx = context;
    context.loading = true;
    return API.LaunchTag.delete(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getTagCategorys(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.TagCategory.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.tagCategorys = data.data.list;
        if (!!query.pageNum) {
          context.page = data.data;
        }
        return context.tagCategorys;
      })
      .catch((err) => ({err}));
  },

  saveTagCategory(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.TagCategory.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateTagCategory(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.TagCategory.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  deleteTagCategory(context, query) {
    ctx = context;
    context.loading = true;
    return API.TagCategory.delete(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  // 支付方式设置 zhu 2017.06.16
  getPayMethod(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PayMethod.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.payMethods = data.data.list;
        context.page = data.data;
        return context.payMethods;
      })
      .catch((err) => ({err}));
  },
  updatePayMethod(context, query) {
    ctx = context;
    context.uploading = true;
    query = filterQuery(query);
    return API.PayMethod.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  savePayMethod(context, query) {
    ctx = context;
    context.uploading = true;
    query = filterQuery(query);
    return API.PayMethod.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  getCountryPayMethod(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CountryPayMethod.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.countryPayMethod = data.data.list;
        context.page = data.data;
        return context.countryPayMethod;
      })
      .catch((err) => ({err}));
  },
  getCountryNoPayMethod(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CountryNoPayMethod.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.countryNoPayMethod = data.data.list;
        context.page = data.data;
        return context.countryNoPayMethod;
      })
      .catch((err) => ({err}));
  },
  getPayMethodLog(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PayMethodLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.payMethodLog = data.data.list;
        context.page = data.data;
        return context.payMethodLog;
      })
      .catch((err) => ({err}));
  },

  getPushMessageList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PushMessage.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.messages = data.data.list;
        if (!!query.pageNum) {
          context.page = data.data;
        }
        return context.messages;
      })
      .catch((err) => ({err}));
  },

  savePushMessage(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PushMessage.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  deletePushMessage(context, query) {
    ctx = context;
    context.loading = true;
    return API.PushMessage.delete(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getPaymentRiskList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PaymentRisk.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.risks = data.data.list;
        context.page = data.data;
        return context.risks;
      })
      .catch((err) => ({err}));
  },
  updatePaymentRisk(context, query) {
    ctx = context;
    context.uploading = true;
    query = filterQuery(query);
    return API.PaymentRisk.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  savePaymentRisk(context, query) {
    ctx = context;
    context.uploading = true;
    query = filterQuery(query);
    return API.PaymentRisk.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getPaypalRecordList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PaypalRecord.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.records = data.data.list;
        context.page = data.data;
        return context.records;
      })
      .catch((err) => ({err}));
  },
  getPaypalCountryList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PaypalCountry.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.paypalCountrys = data.data;
        return context.paypalCountrys;
      })
      .catch((err) => ({err}));
  },
  getPaypalAccountList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PaypalAccount.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.paypalAccounts = data.data.account;
        context.currency = data.data.currency;
        return context.paypalAccounts;
      })
      .catch((err) => ({err}));
  },
  savePaypalMessPay(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PaypalMessPay.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getSmsExtList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SmsExt.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.smsSettings = data.data.list;
        context.page = data.data;
        return context.smsSettings;
      })
      .catch((err) => ({err}));
  },
  getCountrySmsInfo(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.SmsCountry.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.countrySettings = data.data.list;
        return context.countrySettings;
      })
      .catch((err) => ({err}));
  },
  updateCountrySms(context, query) {
    ctx = context;
    return API.SmsCountry.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  getCountryProviderList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CountryProvider.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.provSettings = data.data.list;
        return context.provSettings;
      })
      .catch((err) => ({err}));
  },
  getCountryProviderByCode(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CountryProvider.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.provSetting = data.data;
        return context.provSetting;
      })
      .catch((err) => ({err}));
  },
  updateCountryProvider(context, query) {
    ctx = context;
    return API.CountryProvider.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  getProviderInfoList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Providers.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.provInfos = data.data.list;
        context.page = data.data;
        return context.provInfos;
      })
      .catch((err) => ({err}));
  },

  getBindLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BindLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bindlogs = data.data.list;
        context.page = data.data;
        return context.bindlogs;
      })
      .catch((err) => ({err}));
  },

  getPayLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PayLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.paylogs = data.data.list;
        context.page = data.data;
        return context.paylogs;
      })
      .catch((err) => ({err}));
  },

  getLockLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.LockLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.locklogs = data.data.list;
        context.page = data.data;
        return context.locklogs;
      })
      .catch((err) => ({err}));
  },

  getLockErrParamList(context, query) {
    ctx = context;
    query = filterQuery(query);

    return query.foreignKey != 0
      ? (API.LockErrParam.get(query)
          .then(checkStatus)
          .then(checkIfOK)
          .then((data) => {
            context.subaction = data.data;
            return context.subaction;
          })
          .catch((err) => ({err}))
      )
      : (API.LockErrParam.get(query)
          .then(checkStatus)
          .then(checkIfOK)
          .then((data) => {
            context.actions = data.data;
            return context.actions;
          })
          .catch((err) => ({err}))
      )
  },

  getBikeRadiusList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeRadius.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bikeRadiusList = data.data.list;
        context.page = data.data;
        return context.bikeRadiusList;
      })
      .catch((err) => ({err}));
  },
  updateBikeRadius(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeRadius.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  saveBikeRadius(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeRadius.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getPayFeeList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PayFee.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.payfees = data.data;
        return context.payfees;
      })
      .catch((err) => ({err}));
  },
  savePayFee(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PayFee.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  updatePayFee(context, query) {
    ctx = context;
    return API.PayFee.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  openPayFee(context, query) {
    ctx = context;
    return API.PayFeeOpen.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  closePayFee(context, query) {
    ctx = context;
    return API.PayFeeClose.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getPayMethodByCountry(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.PayMethodByCountry.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        return data.data.payMethod;
      })
      .catch((err) => ({err}));
  },

  // 图标活动 － 单车图标 zhu 2017.09.26
  getBikeIconList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeIcon.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bikeiconlist = data.data.list;
        context.page = data.data;
        return context.bikeiconlist;
      })
      .catch((err) => ({err}));
  },
  getBikeIconById(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return context.$http.patch('promotion/icon/' + query.id)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bikeicon = data.data;
        return context.bikeicon;
      })
      .catch((err) => ({err}));
  },
  saveBikeIcon(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeIcon.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        return data;
      })
  },
  updateBikeIcon(context, query) {
    ctx = context;
    ctx.loading = true;
    return API.BikeIcon.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        return data;
      })
  },
  getBikeValidNum(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeValidNum.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.validnum = data.data.count;
        return context.validnum;
      })
      .catch((err) => ({err}));
  },
  getBikeIconLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.BikeIconLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bikeiconLog = data.data.logs;
        context.page = data.data;
        return context.bikeiconLog;
      })
      .catch((err) => ({err}));
  },
  deleteBikeIcon(context, query) {
    ctx = context;
    context.loading = true;
    return API.BikeIcon.delete(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 图标活动 － 红包券 zhu 2017.09.26
  getRedbagList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Redbag.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.redbaglist = data.data.list;
        context.page = data.data;
        return context.redbaglist;
      })
      .catch((err) => ({err}));
  },
  saveRedbag(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Redbag.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateRedbag(context, query) {
    ctx = context;
    ctx.loading = true;
    return API.Redbag.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  getRedbagLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RedbagLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.bagLog = data.data.logs;
        context.page = data.data;
        return context.bagLog;
      })
      .catch((err) => ({err}));
  },
  deleteRedbag(context, query) {
    ctx = context;
    context.loading = true;
    return API.Redbag.delete(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getRedbagNopage(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RedbagNopage.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.coupons = data.data.map(item => {
          return {
            ...item,
            name: item.name || item.rewardActName,
            id: item.id || item.rewardActId
          }
        });
        return context.coupons;
      })
      .catch((err) => ({err}));
  },
  saveIconCoupon(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RedbagNopage.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  updateIconCoupon(context, query) {
    ctx = context;
    ctx.loading = true;
    return API.RedbagNopage.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getDepositRefund(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.DepositRefund.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.dpstrefund = data.data.list;
        context.page = data.data;
        return context.dpstrefund;
      })
      .catch((err) => ({err}));
  },

  getDepositRefundById(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.DepositRefund.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.deprfdinfo = data.data;
        return context.deprfdinfo;
      })
      .catch((err) => ({err}));
  },
  getFenceList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Fence.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.fences = data.data.list;
        context.page = data.data;
        return context.fences;
      })
      .catch((err) => ({err}));
  },
  saveFence(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Fence.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  updateFence(context, query) {
    ctx = context;
    context.loading = true;
    // return API.Fence.update(query)
    return context.$http.patch('elec-fence/configuratioin', {...query})
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getFenceInfoList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.FenceInfo.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.fenceInfos = data.data.list;
        context.page = data.data;
        return context.fenceInfos;
      })
      .catch((err) => ({err}));
  },
  saveFenceInfo(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.FenceInfoUpdate.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateFenceInfo(context, query) {
    ctx = context;
    context.loading = true;
    // return API.FenceInfoUpdate.update(query)
    return context.$http.patch('elec-fence/elecfence', {...query})
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  saveFenceImport(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.FenceImport.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  getFenceLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.FenceLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.fenceLogs = data.data;
        return context.fenceLogs;
      })
      .catch((err) => ({err}));
  },
  // 押金退款手续费 zhu 2017.09.20
  saveDepositRefund(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.DepositRefund.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateDepositRefund(context, query) {
    ctx = context;
    return API.DepositRefund.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getOptLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.OptLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.optLogList = data.data.list;
        context.page = data.data;
        return context.optLogList;
      })
      .catch((err) => ({err}));
  },

  getPunchcardLogList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Punchcard.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.punchcardLogList = data.data.list;
        context.page = data.data;
        return context.punchcardLogList;
      })
      .catch((err) => ({err}));
  },

  getPunchcardTrack(context, query) {
    ctx = context;
    context.dialogLoading = true;
    query = filterQuery(query);
    return API.PunchcardTrack.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.dialogLoading = false;
        context.trackLogs = data.data.list;
        context.dialogPage = data.data;
        return context.trackLogs;
      })
      .catch((err) => ({err}));
  },

  // 奖励管理 - 优惠券 zhu 2017.12.12
  getRwCoupon(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RwCoupon.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.rwcoupons = data.data.list;
        context.page = data.data;
        return context.rwcoupons;
      })
      .catch((err) => ({err}));
  },

  saveRwCoupon(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RwCoupon.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateRwCoupon(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RwCoupon.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 奖励管理 - 优惠码 zhu 2017.12.12
  getRwCode(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RwCode.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.rwcode = data.data.list;
        context.page = data.data;
        return context.rwcode;
      })
      .catch((err) => ({err}));
  },

  saveRwCode(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RwCode.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        // ctx.$message({ message: data.data.message, type: 'success' });
        return data;
      })
      .catch((err) => ({err}));
  },

  updateRwCode(context, query) {
    ctx = context;
    return API.RwCode.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        // ctx.$message({ message: data.data.message, type: 'success' });
        return data;
      })
      .catch((err) => ({err}));
  },

  // 奖励管理 - 信用分 zhu 2017.12.12
  getRwCredit(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RwCredit.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.rwcredit = data.data.list;
        context.page = data.data;
        return context.rwcredit;
      })
      .catch((err) => ({err}));
  },

  saveRwCredit(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RwCredit.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateRwCredit(context, query) {
    ctx = context;
    return API.RwCredit.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 奖励管理 - 活动内容 zhu 2017.12.22
  getRwActivity(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RwActivity.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.rwactivity = data.data.list;
        context.page = data.data;
        return context.rwcredit;
      })
      .catch((err) => ({err}));
  },

  saveRwActivity(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RwActivity.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  updateRwActivity(context, query) {
    ctx = context;
    return API.RwActivity.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 奖励管理 - 奖励内容供应商 zhu 2017.12.12
  getMerchant(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.Merchant.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.rwmerchants = data.data.merchantList;
        return context.rwmerchants;
      })
      .catch((err) => ({err}));
  },

  // 奖励管理 - 根据商户号查询可配置优惠券 zhu 2017.12.12
  getCouponByMerchant(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CouponByMerchant.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.cpbymerchants = data.data;
        return context.cpbymerchants;
      })
      .catch((err) => ({err}));
  },

  // 奖励管理 - 根据类型查询奖励内容 zhu 2017.12.12
  getRewardType(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RewardType.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.rewardtypes = data.data.rewards;
        return context.rewardtypes;
      })
      .catch((err) => ({err}));
  },

  // 奖励管理 - 根据奖励内容id获取日志 zhu 2017.12.12
  getRwLog(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.RwLog.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.rwlogs = data.data.list;
        context.page = data.data;
        return context.rwlogs;
      })
      .catch((err) => ({err}));
  },

  getFlashmanCountry(context, query) {
    ctx = context;
    query = filterQuery(query);
    return API.FlashmanCountry.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((response) => {
        context.data = response.data.data;
        context.data.deliveryConfigCountry.cityName = context.data.deliveryConfigCountry.name
        context.data.deliveryConfigDriver.withdrawDay = Number(context.data.deliveryConfigDriver.withdrawDay)
        return context.data;
      })
      .catch((err) => ({err}));
  },

  updateFlashmanCountry(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    query.deliveryConfigDriver.withdrawDay = String(query.deliveryConfigDriver.withdrawDay)
    return API.UpdateFlashmanCountry.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.data.deliveryConfigDriver.withdrawDay = Number(context.data.deliveryConfigDriver.withdrawDay)
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getDriverList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.DriverList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.drivers = data.data.list;
        context.page = data.data;
        return context.drivers;
      })
      .catch((err) => ({err}));
  },

  // 冻结骑手
  updateDriverFrozen(context, query) {
    ctx = context;
    return API.DriverFrozen.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 解冻骑手
  updateDriverAwaken(context, query) {
    ctx = context;
    return API.DriverAwaken.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 置为免押金
  updateDriverDepositFree(context, query) {
    ctx = context;
    return API.DriverDepositFree.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 取消免押金
  updateDriverDepositNormal(context, query) {
    ctx = context;
    return API.DriverDepositNormal.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  getDriverApplyList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.DriverApplyList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.applys = data.data.list;
        context.page = data.data;
        return context.applys;
      })
      .catch((err) => ({err}));
  },

  // 骑士审核
  updateDriverApply(context, query) {
    ctx = context;
    return API.DriverApply.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 骑士提现列表
  getDriverCashList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.DriverCashList.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.cashs = data.data.list;
        context.page = data.data;
        return context.cashs;
      })
      .catch((err) => ({err}));
  },

  // 确认通过骑士提现申请
  updateDriverCashApprove(context, query) {
    ctx = context;
    return API.DriverCashApprove.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 确认骑士提现
  updateDriverCashOk(context, query) {
    ctx = context;
    return API.DriverCashOk.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // 拒绝骑士提现
  updateDriverCashRefuse(context, query) {
    ctx = context;
    return API.DriverCashRefuse.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },

  // flashman订单
  getDeliveryList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.DeliveryOrder.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        context.data = data.data;
        return context.data;
      })
      .catch((err) => ({err}));
  },

  cancelDeliveryOrder(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CancelDeliveryOrder.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: 'Cancel Success', type: 'success'});
      })
      .catch((err) => ({err}));
  },

  abnormalDeliveryOrder(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.AbnormalDeliveryOrder.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: ctx.$t("delivery.js.abnormalSuccess"), type: 'success'});
      })
      .catch((err) => ({err}));
  },

  AbnormalRefund(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.AbnormalDeliveryOrderRefund.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: ctx.$t("delivery.js.abnormalHandleSuccess"), type: 'success'});
      })
      .catch((err) => ({err}));
  },

  AbnormalHandle(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.AbnormalDeliveryOrderRefund.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: ctx.$t("delivery.js.abnormalHandleSuccess"), type: 'success'});
      })
      .catch((err) => ({err}));
  },

  driverAbnormalRefundAmount(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.DriverAbnormalRefundAmount.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.order.driverRefundAmount = data.data;
      })
      .catch((err) => ({err}));
  },

  /**
   * 获取企业号列表
   */
  getEnterpriseList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.GetEnterpriseList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.data = data.data;
      })
      .catch((err) => ({err}));
  },

  /**
   * 获取企业号详情
   */
  getEnterpriseInfo(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.GetEnterpriseInfo.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.accountInfo = data.data;
        return ctx.accountInfo;
      })
      .catch((err) => ({err}));
  },

  /**
   * 创建企业账号
   */
  creatEnterpriseAccount(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CreatEnterpriseAccount.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
        return data;
      })
      .catch((err) => ({err}));
  },

  /**
   * 更新企业账号
   */
  updateEnterpriseAccount(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.CreatEnterpriseAccount.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.$message({message: data.data.message, type: 'success'});
        return data;
      })
      .catch((err) => ({err}));
  },

  /**
   * 重置企业账号密码
   */
  resetEnterprisePassword(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.ResetEnterprisePassword.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.$message({message: data.data.message, type: 'success'});
        return data;
      })
      .catch((err) => ({err}));
  },

  /**
   * 冻结、启用企业账号
   */
  freezeEnterpriseAccount(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.FreezeEnterpriseAccount.update(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.$message({message: data.data.message, type: 'success'});
        return data;
      })
      .catch((err) => ({err}));
  },

  /**
   * 获取企业号套餐列表
   */
  getEnterprisePackageList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.GetEnterprisePackageList.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.data = data.data;
        return ctx.data;
      })
      .catch((err) => ({err}));
  },

  /**
   * 为企业添加套餐
   */
  creatEnterprisePackage(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.EnterprisePackage.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.$message({message: data.data.message, type: 'success'});
        return data;
      })
      .catch((err) => ({err}));
  },

  // EVS
  getEvsUserList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.EvsUser.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.users = data.data.list;
        context.page = data.data;
        return ctx.users;
      })
      .catch((err) => ({err}));
  },
  // 冻结骑手
  updateEvsUserFrozen(context, query) {
    ctx = context;
    return API.EvsUserFronzen.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  // 解冻骑手
  updateEvsUserUnFrozen(context, query) {
    ctx = context;
    return API.EvsUserUnFronzen.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  getEvsPayMethodList(context) {
    ctx = context;
    context.loading = true;
    return API.EvsPayMethodList.get()
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.evsPayMethods = data.data;
        context.page = data.data;
        return ctx.evsPayMethods;
      })
      .catch((err) => ({err}));
  },
  updateEvsPayMethod(context, query) {
    ctx = context;
    context.loading = true;
    return context.$http.patch('evpaymethod/batchUpdateEvPayMethod', {...query})
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data.message, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  getEvsParamList(context) {
    ctx = context;
    context.loading = true;
    return API.EvsParam.get()
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.params = data.data;
        return ctx.params;
      })
      .catch((err) => ({err}));
  },
  updateEvsParam(context, query) {
    ctx = context;
    context.loading = true;
    return context.$http.patch('evParam/updateParamList', {...query})
      .then(checkStatus)
      .then(checkIfOK)
      .then((data) => {
        ctx.$message({message: data.data, type: 'success'});
      })
      .catch((err) => ({err}));
  },
  getEvsOrderList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.EvsOrder.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.orders = data.data.list;
        context.page = data.data;
        return ctx.orders;
      })
      .catch((err) => ({err}));
  },
  getEvsOrderDetail(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.EvsOrderDetail.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.order = data.data;
        return ctx.order;
      })
      .catch((err) => ({err}));
  },
  saveEvsOrderDetail(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.EvsOrderSave.save(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.$message({message: 'Success !', type: 'success'});
        return data;
      })
      .catch((err) => ({err}));
  },

  // ocoin交易明细
  getOcoinTradeList(context, query) {
    ctx = context;
    context.loading = true;
    query = filterQuery(query);
    return API.OcoinTrade.get(query)
      .then(checkStatus)
      .then(checkIfOK)
      .then(data => {
        ctx.ocoins = data.data.list;
        context.page = data.data;
        return ctx.ocoins;
      })
      .catch((err) => ({err}));
  },
}
