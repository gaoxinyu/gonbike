import Vue from 'vue'
import VueResource from 'vue-resource'
import {API_ROOT} from '../config'
import {getStorage, getLocalLanguage, removeStorage} from '../services/auth'
import router from '../routers';
/**
 * vue http config
 */
Vue.use(VueResource);
Vue.http.options.root = API_ROOT;
// Vue.http.options.crossOrigin = true
// Vue.http.options.credentials = true
// Vue.http.options.emulateJSON = true;
// Vue.http.options.emulateHTTP = true;
// Vue.http.headers.common['Authorization'] = 'Bearer 65fb73a5388d95f9a786f361ff205dd6';
// function getLocalLanguage() {
//   const localLang = localStorage.getItem('lang') ? localStorage.getItem('lang').toLocaleLowerCase() : 'en';
//   return localLang === 'zh-cn' ? 'zh' : localLang === 'zh-tw' ? 'hant' : 'en';
// }
function getToken() {
  const token = getStorage('token');
  return token ? 'Bearer ' + token.accessToken : "";
}
Vue.http.interceptors.push((request, next) => {
  // 这里对请求体进行处理
  // request.headers = request.headers || {}
  Vue.http.headers.common['Authorization'] = getToken();
  Vue.http.headers.common['Accept-Language'] = getLocalLanguage();
  next((response) => {
    // 这里可以对响应的结果进行处理
    let data = response.data || {};
    if (data.hasOwnProperty('success')) {
      // response.data = data.data;
      if (data.data.code === 401) {
        // sessionStorage.clear();
        removeStorage('token');
        router.push({path: "/"});
      }
    }
  })
})
export const Login = Vue.resource(API_ROOT + 'login')
// 登录 zhu 2017.09.20
export const LoginV2 = Vue.resource(API_ROOT + 'webLogin')
// 图形验证码 zhu 2017.09.20
export const PicCode = Vue.resource(API_ROOT + 'pic/code')
// 短信验证码 zhu 2017.09.20
export const SMSCode = Vue.resource(API_ROOT + 'admin/validatemcode-login')
// 重新获取验证码
export const reSMSCode = Vue.resource(API_ROOT + 'admin/login-resend-msg')

export const Current = Vue.resource(API_ROOT + 'current')
export const Password = Vue.resource(API_ROOT + 'current/password')
export const AppVersion = Vue.resource(API_ROOT + 'app_version{?pageNum?force?name}')
export const AppVersionLog = Vue.resource(API_ROOT + 'app_version/log')
export const Message = Vue.resource(API_ROOT +
  'message{?createdStart?createdEnd?page?countryId?beginDay?type?title?content?img?coverageArea?targetUser?beginTime?endTime?repetition?status}')
// 单车logo设置 zhu 2017.04.17
export const BikeLogoSave = Vue.resource(API_ROOT +
  'bike/bikeIcon')
export const BikeLogoUpdate = Vue.resource(API_ROOT +
  'bike/bikeIconUpdate')
export const BikeLogoList = Vue.resource(API_ROOT +
  'bike/icon/list')
export const BikeLogoDelete = Vue.resource(API_ROOT +
  'bike/icon{/id}')
export const BikeLogoLog = Vue.resource(API_ROOT +
  'bike/icon/log/list')
export const BikeHelmetInfo = Vue.resource(API_ROOT + 'bike/info')
// 停车区域设置 zhu 2017/04/13
export const SMSRates = Vue.resource(API_ROOT +
  'sms-rate')
// 邀请好友赠送管理 zhu 2017.04.25
export const CouponsInvite = Vue.resource(API_ROOT +
  'couponsInvit')
// 广告位 zhu 2017.09.01
export const ADAreaList = Vue.resource(API_ROOT + 'area/list')
export const ADArea = Vue.resource(API_ROOT + 'area{/id}')
export const ADAreaLog = Vue.resource(API_ROOT + 'area/log{/id}')
export const BikeArea = Vue.resource(API_ROOT +
  'bikeStation/configuration')
export const BikeAreaLog = Vue.resource(API_ROOT +
  'bikeStation/log{?countryId?cityId}')
// 押金折扣 参与用户 zhu 2017.04.27
export const PartInUsers = Vue.resource(API_ROOT +
  'activity/members')
// 支付方式设置 zhu 2017.06.16
export const CountryPayMethod = Vue.resource(API_ROOT +
  'paymethod/country-paymethods')
export const PayMethod = Vue.resource(API_ROOT +
  'paymethod')
export const CountryNoPayMethod = Vue.resource(API_ROOT +
  'paymethod/countrys-nopaymethods')
export const PayMethodLog = Vue.resource(API_ROOT +
  'paymethod/log')
export const Locks = Vue.resource(API_ROOT + 'lock/list')
export const LockUnbind = Vue.resource(API_ROOT + 'lock/findLockList')
export const Lock = Vue.resource(API_ROOT + 'lock/bike-lock')
// 单车国家配置 zhu 2017.05.03
export const BikeCode = Vue.resource(API_ROOT + 'bike-codes')
export const StateConfigLog = Vue.resource(API_ROOT + 'bike-codes/logs{/id}')
// 用户基本信息
export const User = Vue.resource(API_ROOT + 'account/findUserListByFilter')
export const Device = Vue.resource(API_ROOT + 'member/system')
export const Account = Vue.resource(API_ROOT + 'account') // 用户账号
export const Credit = Vue.resource(API_ROOT + 'account/credit')
export const Balance = Vue.resource(API_ROOT + 'account/balance')
export const Bike = Vue.resource(API_ROOT + 'bike/bike_lock')
export const BikeDetail = Vue.resource(API_ROOT + 'bike/useRecord')
export const VipCard = Vue.resource(API_ROOT + 'vip/getVipCard')
export const VipDelay = Vue.resource(API_ROOT + 'vip/delay')
export const DelVip = Vue.resource(API_ROOT + 'vip/delVipCard')
export const GiveVip = Vue.resource(API_ROOT + 'vip/giveVipCard')
export const VipPayDetails = Vue.resource(API_ROOT + 'vip/getVipPayDetails')
export const CountryVipCard = Vue.resource(API_ROOT + 'vip/listVipCard')
// 自动续费管理
export const AutoPay = Vue.resource(API_ROOT + 'clubcard-renew')
export const AutoCancelLog = Vue.resource(API_ROOT + 'clubcard-renew/log')
// 用户图标奖励信息展示 zhu 2017.11.01
export const RedPacket = Vue.resource(API_ROOT + 'red-packet')
export const RewardDetail = Vue.resource(API_ROOT + 'red-packet/reward-details')
// export const CouponTypes = Vue.resource(API_ROOT + 'red-packet/promotions')

// 禁用&解禁单车
export const BikeForbidden = Vue.resource(API_ROOT + 'bike/forbiddenBike')
export const BikeUnForbidden = Vue.resource(API_ROOT + 'bike/unforbiddenBike')
// 解绑单车
export const BikeUnbind = Vue.resource(API_ROOT + 'bike/unbind')
export const LastOrder = Vue.resource(API_ROOT + 'bike-fault/order')
export const BikeUnhandle = Vue.resource(API_ROOT + 'bike-fault/unhandle') // 单车未处理故障查询按故障类型分组
export const FilterBike = Vue.resource(API_ROOT + 'bike/list/filterBike') // 过滤查询单车列表
export const Order = Vue.resource(API_ROOT + 'bike/findOrderByFilter')
export const OrderInfo = Vue.resource(API_ROOT + 'order/order-info')  // tradeNo查询订单详情
export const BikeFault = Vue.resource(API_ROOT + 'web/bike-fault')
export const FaultConfirm = Vue.resource(API_ROOT + 'bike-fault-handle/v2')
export const FaultIgnore = Vue.resource(API_ROOT + 'bike-fault-handle/ignore')
export const FaultCredits = Vue.resource(API_ROOT + 'bike-fault-handle/credits')
export const ReportLog = Vue.resource(API_ROOT + 'bike-fault/priority-assign')
export const ReportList = Vue.resource(API_ROOT + 'bike-fault/list')
export const FaultDetail = Vue.resource(API_ROOT + 'bike-fault{/faultId}')  // 举报的故障详情
export const Report = Vue.resource(API_ROOT + 'bike-fault')  // 工单新增
export const ReportHistory = Vue.resource(API_ROOT + 'bike-fault-handle/history')  // 工单历史
export const Informer = Vue.resource(API_ROOT + 'informer')  // 查询举报人信息
export const BeInformer = Vue.resource(API_ROOT + 'be-informer')  // 查询被举报人信息
export const AccountLog = Vue.resource(API_ROOT + 'account/account_log')  // 查询支付明细
export const HisLock = Vue.resource(API_ROOT + 'bike/hisLock')
// 短信
export const Sms = Vue.resource(API_ROOT + 'sms')
export const SmsList = Vue.resource(API_ROOT + 'sms/list')
export const SmsTemplate = Vue.resource(API_ROOT + 'sms-template')
export const SmsLanguage = Vue.resource(API_ROOT + 'sms-language')
export const SmsTemplateAll = Vue.resource(API_ROOT + 'sms-template-all')
export const BlackList = Vue.resource(API_ROOT + 'black-list')
// 国家 押金与充值
export const Country = Vue.resource(API_ROOT + 'country')
export const CountryInfo = Vue.resource(API_ROOT + 'country{/id}')
export const CountryLog = Vue.resource(API_ROOT + 'country/log')
export const Citys = Vue.resource(API_ROOT + 'country/city')
export const UnitPrice = Vue.resource(API_ROOT + 'unit-price')
export const UnitPriceLog = Vue.resource(API_ROOT + 'unit-price/log')
export const GetMaxUnitPrice = Vue.resource(API_ROOT + 'unit-price/getMaxRideMinutesInfo')
export const UpdateMaxUnitPrice = Vue.resource(API_ROOT + 'unit-price/updateMaxRideMinutesConfig')

// 学生认证
export const StudentApply = Vue.resource(API_ROOT + 'student-apply')
export const StudentApplyLog = Vue.resource(API_ROOT + 'student-apply/log')
// 活动
export const Activity = Vue.resource(API_ROOT + 'activity')
// 4.17 jierjie
export const FreeRideActivityList = Vue.resource(API_ROOT + 'activity/getFreeRideActivityList')
export const ActivityLog = Vue.resource(API_ROOT + 'activity-logs/activity-logs')
export const ActivityCodeLog = Vue.resource(API_ROOT + 'activity-logs/exchange-code-logs')
// 优惠券
export const Coupons = Vue.resource(API_ROOT + 'coupons')
export const CouponLog = Vue.resource(API_ROOT + 'coupon-logs')
export const CouponsNopage = Vue.resource(API_ROOT + 'coupons-nopage')
// 优惠码
export const Codes = Vue.resource(API_ROOT + 'codes')
export const CodesCards = Vue.resource(API_ROOT + 'codes{/id}')
export const CodesFile = Vue.resource(API_ROOT + 'codes/file')
export const CodesRecord = Vue.resource(API_ROOT + 'codes/record')
export const RandomCodes = Vue.resource(API_ROOT + 'random-codes')
// 会员卡
export const Cards = Vue.resource(API_ROOT + 'activity/activity-clubcards')
export const CardConflict = Vue.resource(API_ROOT + 'activity/activity-clubcards/conflict')
// 单车重置位置
export const ResetBike = Vue.resource(API_ROOT + 'bike/location/zero')
// 修改单车国家城市
export const BikeCountry = Vue.resource(API_ROOT + 'bike/bike-country')
// 权限管理
export const Admin = Vue.resource(API_ROOT + 'admin') // 管理员账号
export const AdminPassword = Vue.resource(API_ROOT + 'admin/password')
export const Roles = Vue.resource(API_ROOT + 'roles')
export const AllRoles = Vue.resource(API_ROOT + 'all-roles/')
export const RoleModules = Vue.resource(API_ROOT + 'role-modules')
export const Modules = Vue.resource(API_ROOT + 'modules')
// 用户优惠码
export const MemberCoupon = Vue.resource(API_ROOT + 'member/coupon')
export const SendCoupon = Vue.resource(API_ROOT + 'member/coupon/operator_send')
// 消息推送 zhu 2017.05.08
export const NotifiBizList = Vue.resource(API_ROOT + 'notification/biz/list')
export const NotifiBizLang = Vue.resource(API_ROOT + 'notification/biz/language{/id}')
export const NotifiBiz = Vue.resource(API_ROOT + 'notification/biz{/id}')
export const PushRecord = Vue.resource(API_ROOT + 'notification/biz/hisotry')
export const NewsTmplLog = Vue.resource(API_ROOT + 'notification/biz/log/list')
export const NotifiBizTmpl = Vue.resource(API_ROOT + 'notification/biz/template')
// 投放标签管理
export const LaunchTag = Vue.resource(API_ROOT + 'launch-tag')
export const LaunchTagExcel = Vue.resource(API_ROOT + 'launch-tag-excel')
export const TagCategory = Vue.resource(API_ROOT + 'tag/category')
// 国家城市配置 zhu 2017.05.11
export const CityList = Vue.resource(API_ROOT + 'country/city/list')
export const CityConfig = Vue.resource(API_ROOT + 'country/city')
// 推送消息
export const PushMessage = Vue.resource(API_ROOT + 'notification/batch{/id}')
// 设置 - 支付风控
export const PaymentRisk  = Vue.resource(API_ROOT + 'payment-risk')
// 设置 - paypal转账
export const PaypalRecord  = Vue.resource(API_ROOT + 'paypal/masspay/record')
export const PaypalCountry  = Vue.resource(API_ROOT + 'paypal/getCountry')
export const PaypalAccount  = Vue.resource(API_ROOT + 'paypal/getPayPalAccount')
export const PaypalMessPay  = Vue.resource(API_ROOT + 'paypal/massPay')
// 日志 － 绑定失败
export const BindLog = Vue.resource(API_ROOT + 'account/card-fail/list')
// 日志 － 支付失败
export const PayLog = Vue.resource(API_ROOT + 'account/paid-fail/list')
// 日志 － 开关锁
export const LockLog = Vue.resource(API_ROOT + 'bike-error-log')
export const LockErrParam = Vue.resource(API_ROOT + 'bike-error-param')
// 设置 - 短信运营商
export const SmsExt  = Vue.resource(API_ROOT + 'sms-ext/list')
export const SmsCountry  = Vue.resource(API_ROOT + 'sms-ext/country{/countryCode}')
export const CountryProvider  = Vue.resource(API_ROOT + 'sms-ext/country/support-providers{/countryCode}')
export const Providers  = Vue.resource(API_ROOT + 'sms-ext/providers')
export const SmsLog  = Vue.resource(API_ROOT + 'sms-ext/country/log{/countryCode}')

// 设置 - 单车显示半径和数量设置
export const BikeRadius  = Vue.resource(API_ROOT + 'bikeradius')
// 开城管理 - 手续费管理
export const PayFee  = Vue.resource(API_ROOT + 'payFee')
export const PayFeeOpen  = Vue.resource(API_ROOT + 'payFee/open')
export const PayFeeClose  = Vue.resource(API_ROOT + 'payFee/close')
export const PayMethodByCountry  = Vue.resource(API_ROOT + 'pay-method')

// 图标活动 － 单车图标 zhu 2017.09.26
export const BikeIcon = Vue.resource(API_ROOT + 'promotion/icon{/id}')
export const BikeIconLog = Vue.resource(API_ROOT + 'promotion/icon/log')
export const BikeValidNum = Vue.resource(API_ROOT + 'bike/promotion/count')
export const RedbagNopage = Vue.resource(API_ROOT + 'promotion/activities/all')
// 图标活动 － 红包券 zhu 2017.09.26
export const Redbag = Vue.resource(API_ROOT + 'promotion/activities{/id}')
export const RedbagLog = Vue.resource(API_ROOT + 'promotion/activities/log')
// 押金退款手续费 zhu 2017.09.20
export const DepositRefund = Vue.resource(API_ROOT + 'depositRefund/commission{/id}')

// 电子围栏
export const Fence  = Vue.resource(API_ROOT + 'elec-fence/configuratioin')
export const FenceInfo  = Vue.resource(API_ROOT + 'elec-fence/list')
export const FenceInfoUpdate  = Vue.resource(API_ROOT + 'elec-fence/elecfence')
export const FenceImport  = Vue.resource(API_ROOT + 'elec-fence/import')
export const FenceLog  = Vue.resource(API_ROOT + 'elec-fence/logs')

// 日志 运维端操作日志
export const OptLog  = Vue.resource(API_ROOT + 'bikeOperationLog/list{/apiId}')
// 日志 打卡记录
export const Punchcard  = Vue.resource(API_ROOT + 'punchCard/queryCard')
export const PunchcardTrack  = Vue.resource(API_ROOT + 'punchCard/queryTrack{/id}')

// 奖励管理 zhu 2017.12.12 
export const RwCoupon = Vue.resource(API_ROOT + 'reward/rewards/coupon')
export const RwCode = Vue.resource(API_ROOT + 'reward/rewards/code')
export const RwCredit = Vue.resource(API_ROOT + 'reward/rewards/credit')
export const RwActivity = Vue.resource(API_ROOT + 'reward/activity')
export const Merchant = Vue.resource(API_ROOT + 'reward/merchant')
export const CouponByMerchant = Vue.resource(API_ROOT + 'reward/rewards/merchant-coupons')
export const RewardType = Vue.resource(API_ROOT + 'reward/rewards/reward-type')
export const RwLog = Vue.resource(API_ROOT + 'reward/rewards/log')

// 骑士基本信息
export const DriverList  = Vue.resource(API_ROOT + 'member-delivery/driver-list')
export const DriverFrozen  = Vue.resource(API_ROOT + 'member-delivery/driver-frozen')
export const DriverAwaken  = Vue.resource(API_ROOT + 'member-delivery/driver-awaken')
export const DriverDepositFree  = Vue.resource(API_ROOT + 'member-delivery/driver-deposit-free')
export const DriverDepositNormal  = Vue.resource(API_ROOT + 'member-delivery/driver-deposit-normal')
export const DriverApplyList  = Vue.resource(API_ROOT + 'member-delivery/certificate/list')
export const DriverApply  = Vue.resource(API_ROOT + 'member-delivery/certificate')

// 骑士提现
export const DriverCashList  = Vue.resource(API_ROOT + 'accountstatement/list')
export const DriverCashOk  = Vue.resource(API_ROOT + 'accountstatement/confirmationOfPayment')
export const DriverCashRefuse  = Vue.resource(API_ROOT + 'accountstatement/refusingToGrant')
export const DriverCashApprove  = Vue.resource(API_ROOT + 'accountstatement/byApplication')

// 闪送
export const FlashmanCountry  = Vue.resource(API_ROOT + 'deliveryconfig/getcountryconfigdetail')
export const UpdateFlashmanCountry  = Vue.resource(API_ROOT + 'deliveryconfig/updatecountryconfig')

// 闪送订单
export const DeliveryOrder  = Vue.resource(API_ROOT + 'admin/deliveryorder/list')
export const CancelDeliveryOrder  = Vue.resource(API_ROOT + 'admin/deliveryorder/cancelorder')
export const AbnormalDeliveryOrder  = Vue.resource(API_ROOT + 'admin/deliveryorder/exceptionorder')
export const AbnormalDeliveryOrderRefund  = Vue.resource(API_ROOT + 'admin/deliveryorder/orderrefund')
export const DriverAbnormalRefundAmount  = Vue.resource(API_ROOT + 'admin/deliveryorder/driverRefundAmount')

// 企业账号
export const GetEnterpriseList  = Vue.resource(API_ROOT + 'enterprise/list')
export const GetEnterpriseInfo  = Vue.resource(API_ROOT + 'enterprise/info/{/id}')
export const CreatEnterpriseAccount  = Vue.resource(API_ROOT + 'enterprise')
export const ResetEnterprisePassword  = Vue.resource(API_ROOT + 'enterprise/reset')
export const FreezeEnterpriseAccount  = Vue.resource(API_ROOT + 'enterprise/freeze')
export const GetEnterprisePackageList  = Vue.resource(API_ROOT + 'enterprise/package/list')
export const EnterprisePackage  = Vue.resource(API_ROOT + 'enterprise/package')

// EVS
export const EvsUser  = Vue.resource(API_ROOT + 'evmember/list')
export const EvsUserFronzen  = Vue.resource(API_ROOT + 'evmember/fronzen')
export const EvsUserUnFronzen  = Vue.resource(API_ROOT + 'evmember/unfreeze')
export const EvsPayMethodList  = Vue.resource(API_ROOT + 'evpaymethod/getEvPayMethodList')
export const EvsPayMethodUpdate  = Vue.resource(API_ROOT + 'evpaymethod/batchUpdateEvPayMethod')

export const EvsParam  = Vue.resource(API_ROOT + 'evParam/paramList')
export const EvsParamUpdate  = Vue.resource(API_ROOT + 'evParam/updateParamList')

export const EvsOrder  = Vue.resource(API_ROOT + 'ev/order-list')
export const EvsOrderDetail  = Vue.resource(API_ROOT + 'ev/order/{orderNo}')
export const EvsOrderSave  = Vue.resource(API_ROOT + 'ev/order/modify-accountlog')

// Ocoin交易明细
export const OcoinTrade  = Vue.resource(API_ROOT + 'memberocoinstatement/list')