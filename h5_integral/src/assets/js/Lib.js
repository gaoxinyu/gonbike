import config from './conf'
import common from './common'
import bridge from './bridge'
import * as store from './store'
// 设置 rem
common.setRem.resetRem()

bridge.getUserToken(store.getStore('token') || '', res => {
	if (res && res.token) {
		store.setStore('token', res.token)
	}
})
// store.setStore('token', 'bbdfbbd02da049c9b0b92c6048c52549')

//解决click点击300毫秒延时问题
import FastClick from 'fastclick'
FastClick.attach(document.body);

export default{
	config, common, bridge, store
}