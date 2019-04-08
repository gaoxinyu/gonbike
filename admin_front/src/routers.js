import Vue from 'vue';
import Router from 'vue-router';

import { isLogin, isAuthorized } from './services/auth'

import Login from './views/Login'
import LoginV2 from './views/LoginV2'
import Password from './views/Password'
import Main from './views/Main'
import Welcome from './views/Welcome'

import Message from './views/app/Message'
import AddMessage from './views/app/AddMessage'
import Version from './views/app/Version'
import AddVersion from './views/app/AddVersion'
import VersionInfo from './views/app/VersionInfo'
// 邀请好友赠送管理 zhu 2017.04.25
import InviteMsg from './views/app/InviteMsg'
// 广告位 zhu 2017.09.01
import ADArea from './views/app/ADArea'
import AddADArea from './views/app/AddADArea'
import InfoADArea from './views/app/InfoADArea'

import UserInfo from './views/user/UserInfo'
import UserVIPInfo from './views/user/UserVIPInfo'
import UserCoupon from './views/user/UserCoupon'
import AddUserCoupon from './views/user/AddUserCoupon'
import UserCouponInfo from './views/user/UserCouponInfo'
import RedPacket from './views/user/RedPacket'
import Device from './views/user/Device'
import Credit from './views/user/Credit'
import AddCredit from './views/user/AddCredit'
import Payment from './views/user/Payment'
import Trade from './views/user/Trade'
import Ocoin from './views/user/Ocoin'
import AddBalance from './views/user/AddBalance'

// 自动续费管理 2017.10.27 zhu
import AutoPayMng from './views/user/AutoPayMng'
import AutoPayCancel from './views/user/AutoPayCancel'

// 闪送用户
import Driver from './views/user/Driver'
import Cash from './views/user/Cash'

import Lock from './views/stock/Lock'
import Bike from './views/stock/Bike'
import AddBike from './views/stock/AddBike'
import AddLock from './views/stock/AddLock'
// 单车国家配置 zhu 2017.05.03
import StateConfig from './views/stock/StateConfig'
import StateConfigInfo from './views/stock/StateConfigInfo'

import Monitor from './views/operate/Monitor'
import Trip from './views/operate/Trip'
import BikeInfo from './views/operate/BikeInfo'
import BikeArea from './views/operate/BikeArea'
import BikeAreaInfo from './views/operate/BikeAreaInfo'
import Tag from './views/operate/Tag'
import AddTag from './views/operate/AddTag'
import Category from './views/operate/Category'

// 单车logo管理 zhu 2017.04.17
import BikeLogo from './views/operate/BikeLogo'
import AddBikeLogo from './views/operate/AddBikeLogo'
import BikeLogoInfo from './views/operate/BikeLogoInfo'
// 国家城市配置 zhu 2017.05.11
import CityConfig from './views/operate/CityConfig'
import Fence from './views/operate/Fence'
import FenceInfo from './views/operate/FenceInfo'
import AddFence from './views/operate/AddFence'
//
import DeliveryOrder from './views/delivery/DeliveryOrder'
import DeliveryOrderInfo from './views/delivery/DeliveryOrderInfo'

import Report from './views/customer/Report'
import ReportInfo from './views/customer/ReportInfo'
import AddReport from './views/customer/AddReport'
import Sms from './views/customer/Sms'
import AddSms from './views/customer/AddSms'
import SmsTemplate from './views/customer/SmsTemplate'
import SmsLimit from './views/customer/SmsLimit'
import Student from './views/customer/Student'
import StudentInfo from './views/customer/StudentInfo'
import DriverVerify from './views/customer/Driver'

import Recharge from './views/city/Recharge'
import EditRecharge from './views/city/EditRecharge'
import RechargeInfo from './views/city/RechargeInfo'
import Price from './views/city/Price'
import PriceInfo from './views/city/PriceInfo'
import AddPrice from './views/city/AddPrice'
import Payfee from './views/city/Payfee'
import EditFlashMan from './views/city/EditFlashMan'

import Activity from './views/discount/Activity'
import AddActivity from './views/discount/AddActivity'
import ActivityInfo from './views/discount/ActivityInfo'
import Joinuser from './views/discount/Joinuser'
import Coupon from './views/discount/Coupon'
import AddCoupon from './views/discount/AddCoupon'
import CouponInfo from './views/discount/CouponInfo'
import RegisterCoupon from './views/discount/RegisterCoupon'
import Code from './views/discount/Code'
import AddCode from './views/discount/AddCode'
import CodeInfo from './views/discount/CodeInfo'
import CodeRecord from './views/discount/CodeRecord'
import Free from './views/discount/Free'
// import Free from './views/discount/Free-new'
import AddFree from './views/discount/AddFree'
import FreeInfo from './views/discount/FreeInfo'
import Other from './views/discount/Other'
import AddOther from './views/discount/AddOther'
import Card from './views/discount/Card'
import AddCard from './views/discount/AddCard'
import CardInfo from './views/discount/CardInfo'
// 押金折扣 zhu 2017.04.26
import Deposit from './views/discount/Deposit'
import AddDeposit from './views/discount/AddDeposit'
import DepositInfo from './views/discount/DepositInfo'
import DepositUsers from './views/discount/DepositUsers'
// 免押金骑行 zjg 2017.12.08
import NoDeposit from './views/discount/NoDeposit'

// 图标活动 － 奖励活动 － 红包券 zhu 2017.09.21
import Redbag from './views/icon/Redbag'
import AddRedbag from './views/icon/AddRedbag'
import InfoRedbag from './views/icon/InfoRedbag'
// 图标活动 － 奖励活动 － 红包券 zhu 2017.09.29
import IconCoupon from './views/icon/Coupon'
import AddIconCoupon from './views/icon/AddCoupon'
import InfoIconCoupon from './views/icon/InfoCoupon'
// 图标活动 － 单车图标 zhu 2017.09.23
import BikeIcon from './views/icon/BikeIcon'
import AddBikeIcon from './views/icon/AddBikeIcon'
import InfoBikeIcon from './views/icon/InfoBikeIcon'
// 奖励管理 - 优惠券 zhu 2017.12.12
import RwCoupon from './views/reward/Coupon'
import RwAddCoupon from './views/reward/AddCoupon'
import RwEditCoupon from './views/reward/AddCoupon'
import RwInfoCoupon from './views/reward/InfoCoupon'
// 奖励管理 - 优惠码 zhu 2017.12.12
import RwCode from './views/reward/Code'
import RwAddCode from './views/reward/AddCode'
import RwEditCode from './views/reward/AddCode'
import RwInfoCode from './views/reward/InfoCode'
// 奖励管理 - 信用分 zhu 2017.12.12
import RwCredit from './views/reward/Credit'
import RwAddCredit from './views/reward/AddCredit'
import RwEditCredit from './views/reward/AddCredit'
import RwInfoCredit from './views/reward/InfoCredit'
// 奖励管理 - 活动内容 zhu 2017.12.12
import RwActivity from './views/reward/Activity'
import RwAddActivity from './views/reward/AddActivity'
import RwEditActivity from './views/reward/AddActivity'
import RwInfoActivity from './views/reward/InfoActivity'

// 消息推送 zhu 2017.05.08
import FuncNews from './views/news/FuncNews'
import FuncNewsTmpl from './views/news/FuncNewsTmpl'
import FuncNewsPushRec from './views/news/FuncNewsPushRec'

import PushMessage from './views/news/PushMessage'
import AddPushMessage from './views/news/AddPushMessage'

import Role from './views/admin/Role'
import Account from './views/admin/Account'
import AddAccount from './views/admin/AddAccount'
import AccountInfo from './views/admin/AccountInfo'
import EditWebAuth from './views/admin/EditWebAuth'
import EditAppAuth from './views/admin/EditAppAuth'

import Paypal from './views/setting/Paypal'
import Risk from './views/setting/Risk'
import AddRisk from './views/setting/AddRisk'
import SMSProvider from './views/setting/SMSProviderSetting'
import AddSmsSetting from './views/setting/AddSmsSetting'
import CountryProvider from './views/setting/CountryProvider'
import ProviderInfo from './views/setting/ProviderInfo'
// 支付方式设置 zhu 2017.06.16
import PayWay from './views/setting/PayWay'
import AddPayWay from './views/setting/AddPayWay'
import PayWayInfo from './views/setting/PayWayInfo'
import Radius from './views/setting/Radius'
import DepositRefund from './views/setting/DepositRefund'
import DepositRefundInfo from './views/setting/DepositRefundInfo'

import BindLog from './views/log/Bind'
import PayLog from './views/log/Pay'
import LockLog from './views/log/Lock'
import UploadLoc from './views/log/UploadLoc'
import PutBike from './views/log/PutBike'
import BikeMaintain from './views/log/BikeMaintain'
import PutAgain from './views/log/PutAgain'
import OtherOpt from './views/log/OtherOpt'
import Punchcard from './views/log/Punchcard'

// 企业账号
import EnterpriseAccount from './views/enterprise/Account'
import EnterprisePackage from './views/enterprise/Package'

// EVS管理
import EvsUser from './views/evs/User'
import EvsOrder from './views/evs/Order'
import EvsPayway from './views/evs/Payway'
import EvsOrderDetail from './views/evs/OrderDetail'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    // 注册路由 - 登录 zhu 2017.09.21
    { path: '/', 
      component: LoginV2,
      beforeEnter: (to, from, next) => {
        isLogin() ? next('/welcome') : next(); 
      }
    },
    // 旧版登录保留
    { path: '/login', 
      component: Login,
      beforeEnter: (to, from, next) => {
        isLogin() ? next('/welcome') : next(); 
      }
    },
    // 修改密码 zhu 2017.09.21
    { path: '/password', component: Password },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        { path: '/welcome', component: Welcome, name: 'welcome' },

        // app管理
        { path: '/app/message', component: Message, name: 'message' },
        { path: '/app/message/add', component: AddMessage, name: 'addmessage' },
        { path: '/app/message/edit', component: AddMessage, name: 'editmessage' },
        { path: '/app/version', component: Version, name: 'version' },
        { path: '/app/version/add', component: AddVersion, name: 'addversion' },
        { path: '/app/version/edit', component: AddVersion, name: 'editversion' },
        { path: '/app/version/info', component: VersionInfo, name: 'versioninfo' },
        // 邀请好友赠送管理 zhu 2017.04.25
        { path: '/app/invite', component: InviteMsg, name: 'invite' },
        // 广告位  zhu 2017.09.01
        { path: '/app/adarea', component: ADArea, name: 'adarea' },
        { path: '/app/adarea/add/:id', component: AddADArea, name: 'addad' },
        { path: '/app/adarea/edit/:id', component: AddADArea, name: 'editad' },
        { path: '/app/adarea/info/:id', component: InfoADArea, name: 'adinfo' },
        // 闪屏页 暂时不做 zhu 2017.09.01
        //{ path: '/app/adarea/add/5', component: AddADArea, name: 'addad5'},
        // { path: '/app/adarea/info/5', component: InfoADArea, name: 'infoad5'},

        // 用户管理
        { path: '/user/info', component: UserInfo, name: 'userinfo' },
        { path: '/user/info/device', component: Device, name: 'device' },
        { path: '/user/info/coupon', component: UserCoupon, name: 'usercoupon' },
        { path: '/user/info/addcoupon', component: AddUserCoupon, name: 'addusercoupon' },
        { path: '/user/info/coupon/:id', component: UserCouponInfo, name: 'usercouponinfo' },
        { path: '/user/info/vip', component: UserVIPInfo, name: 'vip' },
        
        // 自动续费管理 2017.10.27 zhu
        { path: '/user/info/autopay', component: AutoPayMng, name: 'autopay' },
        { path: '/user/info/autocancel', component: AutoPayCancel, name: 'autocancel' },

        { path: '/user/info/redbag', component: RedPacket, name: 'redpacket' },
        { path: '/user/credit', component: Credit, name: 'credit' },
        { path: '/user/credit/add', component: AddCredit, name: 'addcredit' },
        { path: '/user/payment', component: Payment, name: 'payment' },
        { path: '/user/trade', component: Trade, name: 'trade' },
        { path: '/user/trade/add', component: AddBalance, name: 'addbalance' },
        { path: '/user/driver', component: Driver, name: 'driver' },
        { path: '/user/cash', component: Cash, name: 'cash' },
        { path: '/user/ocoin', component: Ocoin, name: 'ocoin' },

        // 单车入库
        { path: '/stock/lock', component: Lock, name: 'lock' },
        { path: '/stock/lock/add', component: AddLock, name: 'addlock' },
        { path: '/stock/lock/edit', component: AddLock, name: 'editlock' },
        { path: '/stock/bike', component: Bike, name: 'bike' },
        { path: '/stock/bike/add', component: AddBike, name: 'addbike' },
        // 单车国家配置 zhu 2017.05.03
        { path: '/stock/state', component: StateConfig, name: 'stateconfig' },
        { path: '/stock/state/info', component: StateConfigInfo, name: 'stateconfiginfo' },

        // 单车运营
        { path: '/operate/monitor', component: Monitor, name: 'monitor' },
        { path: '/operate/trip', component: Trip, name: 'trip' },
        { path: '/operate/bike/:id', component: BikeInfo, name: 'bikeinfo' },

        // 闪送订单
        { path: '/delivery/order/', component: DeliveryOrder, name: 'deliveryorder' },
        { path: '/delivery/order/:id', component: DeliveryOrderInfo, name: 'deliveryorderinfo' },

        // 停车区域管理 zhu 2017/04/13
        { path: '/operate/bikearea', component: BikeArea, name: 'bikearea' },
        { path: '/operate/bikearea/info', component: BikeAreaInfo, name: 'bikeareainfo' },
        { path: '/operate/tag', component: Tag, name: 'tag' },
        { path: '/operate/tagadd', component: AddTag, name: 'addtag' },
        { path: '/operate/tagedit', component: AddTag, name: 'edittag' },
        { path: '/operate/tag/category', component: Category, name: 'category' },
        // 单车logo管理 zhu 2017.04.17
        { path: '/operate/bikelogo', component: BikeLogo, name: 'bikelogo' },
        { path: '/operate/bikelogo/add', component: AddBikeLogo, name: 'addbikelogo' },
        { path: '/operate/bikelogo/edit', component: AddBikeLogo, name: 'editbikelogo' },
        { path: '/operate/bikelogo/info', component: BikeLogoInfo, name: 'bikelogoinfo' },
        // 国家城市配置 zhu 2017.05.11
        { path: '/operate/cityconfig', component: CityConfig, name: 'cityconfig' },
        { path: '/operate/fence', component: Fence, name: 'fence' },
        { path: '/operate/fence/info', component: FenceInfo, name: 'fenceinfo' },
        { path: '/operate/fence/add', component: AddFence, name: 'addfence' },
        { path: '/operate/fence/edit', component: AddFence, name: 'editfence' },

        // 客户服务
        { path: '/customer/report', component: Report, name: 'report' },
        { path: '/customer/report/:id', component: ReportInfo, name: 'reportinfo' },
        { path: '/customer/addreport', component: AddReport, name: 'addreport' },
        { path: '/customer/sms', component: Sms, name: 'sms' },
        { path: '/customer/sms/add', component: AddSms, name: 'addsms' },
        { path: '/customer/sms/template', component: SmsTemplate, name: 'smstemplate' },
        { path: '/customer/sms/limit', component: SmsLimit, name: 'smslimit' },
        { path: '/customer/student', component: Student, name: 'student' },
        { path: '/customer/student/:id', component: StudentInfo, name: 'studentinfo' },
        { path: '/customer/driver', component: DriverVerify, name: 'driververify' },

        // 开城管理
        { path: '/city/recharge', component: Recharge, name: 'recharge' },
        { path: '/city/recharge/:id', component: RechargeInfo, name: 'rechargeinfo' },
        { path: '/city/rechargeedit', component: EditRecharge, name: 'editrecharge' },
        { path: '/city/price', component: Price, name: 'price' },
        { path: '/city/priceadd', component: AddPrice, name: 'addprice' },
        { path: '/city/priceedit', component: AddPrice, name: 'editprice' },
        { path: '/city/price/info', component: PriceInfo, name: 'priceinfo' },
        { path: '/city/payfee', component: Payfee, name: 'payfee' },
        { path: '/city/flashmanedit', component: EditFlashMan, name: 'editflashman' },

        // 优惠管理
        { path: '/discount/activity', component: Activity, name: 'activity' },
        { path: '/discount/activityadd', component: AddActivity, name: 'addactivity' },
        { path: '/discount/activityedit', component: AddActivity, name: 'editactivity' },
        { path: '/discount/activity/:id', component: ActivityInfo, name: 'activityinfo' },
        { path: '/discount/joinuser', component: Joinuser, name: 'joinuser' },
        { path: '/discount/coupon', component: Coupon, name: 'coupon' },
        { path: '/discount/couponadd', component: AddCoupon, name: 'addcoupon' },
        { path: '/discount/couponedit', component: AddCoupon, name: 'editcoupon' },
        { path: '/discount/coupon/:id', component: CouponInfo, name: 'couponinfo' },
        { path: '/discount/registercoupon', component: RegisterCoupon, name: 'registercoupon' },
        { path: '/discount/code', component: Code, name: 'code' },
        { path: '/discount/codeadd', component: AddCode, name: 'addcode' },
        { path: '/discount/codeedit', component: AddCode, name: 'editcode' },
        { path: '/discount/code/:id', component: CodeInfo, name: 'codeinfo' },
        { path: '/discount/coderecord', component: CodeRecord, name: 'coderecord' },
        { path: '/discount/free', component: Free, name: 'free' },
        { path: '/discount/freeadd', component: AddFree, name: 'addfree' },
        { path: '/discount/freeedit', component: AddFree, name: 'editfree' },
        { path: '/discount/free/:id', component: FreeInfo, name: 'freeinfo' },
        { path: '/discount/other', component: Other, name: 'other' },
        { path: '/discount/otheradd', component: AddOther, name: 'addother' },
        { path: '/discount/otheredit', component: AddOther, name: 'editother' },
        { path: '/discount/card', component: Card, name: 'card' },
        { path: '/discount/cardadd', component: AddCard, name: 'addcard' },
        { path: '/discount/cardedit', component: AddCard, name: 'editcard' },
        { path: '/discount/card/:id', component: CardInfo, name: 'cardinfo' },
        // 押金折扣 zhu 2017.04.26
        { path: '/discount/deposit', component: Deposit, name: 'deposit' },
        { path: '/discount/deposit/add', component: AddDeposit, name: 'adddeposit' },
        { path: '/discount/deposit/edit', component: AddDeposit, name: 'editdeposit' },
        { path: '/discount/deposit/info', component: DepositInfo, name: 'depositinfo' },
        { path: '/discount/deposit/users', component: DepositUsers, name: 'depositusers' },
        { path: '/discount/nodeposit', component: NoDeposit, name: 'nodeposit' },

        // 图标活动 － 奖励活动 － 红包券 zhu 2017.09.21
        { path: '/icon/reward/redbag', component: Redbag, name: 'redbag' },
        { path: '/icon/reward/redbag/add', component: AddRedbag, name: 'addredbag' },
        { path: '/icon/reward/redbag/edit', component: AddRedbag, name: 'editredbag' },
        { path: '/icon/reward/redbag/info', component: InfoRedbag, name: 'inforedbag' },

        // 图标活动 － 奖励活动 － 优惠券 zhu 2017.09.21
        { path: '/icon/reward/coupon', component: IconCoupon, name: 'iconcoupon' },
        { path: '/icon/reward/coupon/add', component: AddIconCoupon, name: 'addiconcoupon' },
        { path: '/icon/reward/coupon/edit', component: AddIconCoupon, name: 'editiconcoupon' },
        { path: '/icon/reward/coupon/info', component: InfoIconCoupon, name: 'infoiconcoupon' },

        // 图标活动 － 单车图标 zhu 2017.09.23
        { path: '/icon/bikeicon', component: BikeIcon, name: 'bikeicon' },
        { path: '/icon/bikeicon/add', component: AddBikeIcon, name: 'addbikeicon' },
        { path: '/icon/bikeicon/edit', component: AddBikeIcon, name: 'editbikeicon' },
        { path: '/icon/bikeicon/info', component: InfoBikeIcon, name: 'infobikeicon' },

        // 奖励管理 - 优惠券 zhu 2017.12.12
        { path: '/reward/coupon', component: RwCoupon, name: 'rwcoupon' },
        { path: '/reward/coupon/add', component: RwAddCoupon, name: 'rwaddcoupon' },
        { path: '/reward/coupon/edit', component: RwEditCoupon, name: 'rweditcoupon' },
        { path: '/reward/coupon/info', component: RwInfoCoupon, name: 'rwinfocoupon' },

        // 奖励管理 - 优惠码 zhu 2017.12.12
        { path: '/reward/code', component: RwCode, name: 'rwcode' },
        { path: '/reward/code/add', component: RwAddCode, name: 'rwaddcode' },
        { path: '/reward/code/edit', component: RwEditCode, name: 'rweditcode' },
        { path: '/reward/code/info', component: RwInfoCode, name: 'rwinfocode' },

        // 奖励管理 - 信用分 zhu 2017.12.12
        { path: '/reward/credit', component: RwCredit, name: 'rwcredit' },
        { path: '/reward/credit/add', component: RwAddCredit, name: 'rwaddcredit' },
        { path: '/reward/credit/edit', component: RwEditCredit, name: 'rweditcredit' },
        { path: '/reward/credit/info', component: RwInfoCredit, name: 'rwinfocredit' },

        // 奖励管理 - 活动内容 zhu 2017.12.12
        { path: '/reward/activity', component: RwActivity, name: 'rwactivity' },
        { path: '/reward/activity/add', component: RwAddActivity, name: 'rwaddactivity' },
        { path: '/reward/activity/edit', component: RwEditActivity, name: 'rweditactivity' },
        { path: '/reward/activity/info', component: RwInfoActivity, name: 'rwinfoactivity' },

        // 消息推送 zhu 2017.05.08
        { path: '/news/func', component: FuncNews, name: 'func' },
        { path: '/news/func/tmpl', component: FuncNewsTmpl, name: 'functmpl' },
        { path: '/news/func/push', component: FuncNewsPushRec, name: 'funcpush' },

        { path: '/news/message', component: PushMessage, name: 'pushmessage' },
        { path: '/news/messageadd', component: AddPushMessage, name: 'addpushmessage' },

        // 系统账户管理
        { path: '/admin/account', component: Account, name: 'account' },
        { path: '/admin/accountadd', component: AddAccount, name: 'addaccount' },
        { path: '/admin/accountedit', component: AddAccount, name: 'editaccount' },
        { path: '/admin/account/:id', component: AccountInfo, name: 'accountinfo' },
        { path: '/admin/role', component: Role, name: 'role' },
        { path: '/admin/role/web', component: EditWebAuth, name: 'editwebauth' },
        { path: '/admin/role/app', component: EditAppAuth, name: 'editappauth' },

        // 系统设置
        { path: '/setting/paypal', component: Paypal, name: 'paypal' },
        { path: '/setting/risk', component: Risk, name: 'risk' },
        { path: '/setting/risk/add', component: AddRisk, name: 'addrisk' },
        { path: '/setting/risk/edit', component: AddRisk, name: 'editrisk' },
        { path: '/setting/sms', component: SMSProvider, name: 'appsms' },
        { path: '/setting/sms/add', component: AddSmsSetting, name: 'addsmssetting' },
        { path: '/setting/sms/edit', component: AddSmsSetting, name: 'editsmssetting' },
        { path: '/setting/sms/prov', component: CountryProvider, name: 'countryprovider' },
        { path: '/setting/sms/operator', component: ProviderInfo, name: 'operator' },
        // 支付方式设置   zhu  2017.06.16
        { path: '/setting/pay', component: PayWay, name: 'pay' },
        { path: '/setting/pay/add', component: AddPayWay, name: 'addpay' },
        { path: '/setting/pay/edit', component: AddPayWay, name: 'editpay' },
        { path: '/setting/pay/info', component: PayWayInfo, name: 'payinfo' },
        { path: '/setting/radius', component: Radius, name: 'radius' },
        { path: '/setting/depositrefund', component: DepositRefund, name: 'depositrefund' },
        { path: '/setting/depositrefund/info/:id', component: DepositRefundInfo, name: 'deprfdinfo' },

        // 系统日志
        { path: '/log/bind', component: BindLog, name: 'bindlog'},
        { path: '/log/pay', component: PayLog, name: 'paylog'},
        { path: '/log/lock', component: LockLog, name: 'locklog'},
        { path: '/log/opt', redirect: '/log/opt/upload', component: null, name: 'optlog'},
        { path: '/log/opt/upload', component: UploadLoc, name: 'uploadloc'},
        { path: '/log/opt/put', component: PutBike, name: 'putbike'},
        { path: '/log/opt/maintain', component: BikeMaintain, name: 'bikemaintain'},
        { path: '/log/opt/again', component: PutAgain, name: 'putagain'},
        { path: '/log/opt/other', component: OtherOpt, name: 'otheropt'},
        { path: '/log/opt/punchcard', component: Punchcard, name: 'punchcard'},

        // 企业账号
        { path: '/enterprise/account', component: EnterpriseAccount, name: 'enterpriseaccount'},
        { path: '/enterprise/account/:account_id/package', component: EnterprisePackage, name: 'enterprisepackage'},

        // EVS
        { path: '/evs/user', component: EvsUser, name: 'evsuser'},
        { path: '/evs/order', component: EvsOrder, name: 'evsorder'},
        { path: '/evs/payway', component: EvsPayway, name: 'evspayway'},
        { path: '/evs/order/:no', component: EvsOrderDetail, name: 'evsorderdetail'},
      ],
      beforeEnter: (to, from, next) => {
        isLogin() ? next() : next('/');
      },
    },
    { path: '*', redirect: '/' },
  ]
});

router.beforeResolve((to, from, next) => {
  location.hostname === 'localhost' || isAuthorized(to.path) ? next() : next('/welcome');
})
export default router;