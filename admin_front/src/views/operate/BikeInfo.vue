<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      单车详情
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>

    <div class="box-body">

      <div class="box box-success">
        <div class="box-header">单车信息</div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-4">单车编号：{{computedBike.id}}</div>
            <div class="col-md-4">运营状态: {{computedBike.statusString}}</div>
            <div class="col-md-4">使用状态：{{computedBike.statusString}}</div>
            
          </div>
          <div class="row">
            <div class="col-md-4">电量：{{computedBike.electricity}}</div>
          </div>
          <p>当前位置：{{computedBike.longitude}} &nbsp;&nbsp; {{computedBike.latitude}}</p>
        </div>
      </div>

      <div class="box box-success">
        <div class="box-header">单车用车记录</div>
        <div class="box-body">
          <p>订单编号：{{order.id}}</p>
          <div class="row">
            <div class="col-md-4">用户编号：{{order.userId}}</div>
            <div class="col-md-4">用户手机号：{{order.phone}}</div>
          </div>
          <div class="row">
            <div class="col-md-4">骑行时间：{{order.userId}}</div>
            <div class="col-md-4">骑行路程：{{order.phone}}</div>
          </div>
          <div class="row">
            <div class="col-md-4">行程开始时间：{{order.startTime}}</div>
            <div class="col-md-4">行程结束时间：{{order.endTime}}</div>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    api.getBikeDetail(this, this.query);
  },
  data() {
    return {
      loading: false,
      query: {
        bikeId: this.$route.params.id,
      },
      fault: {},
      bike: {},
      order: {},
    }
  },
  computed: {
    computedBike() {
      return {
        ...this.bike,
        statusString: this.bike.status == "0" ? "未激活" : this.bike.status == "1" ? "可用" : this.bike.status == "2" ? "被预定" 
                        : this.bike.status == "3" ? "行驶中" : this.bike.status == "4" ? "解锁中" 
                        : this.bike.status == "5" ? "禁用中" : "",
        useTimeString: this.bike.useTime ? moment(this.bike.useTime).format("YYYY-MM-DD HH:mm:ss") : "",
      }
    }
  },
  methods: {
    goBack() {
      // if(this.$route.path.indexOf("/customer/fault") >= 0) {
        this.$router.push({name: "monitor"})
      // } else if (this.$route.path.indexOf("/customer/report") >= 0) {
      //   this.$router.push({name: "report"})
      // }
    },
  }
}

</script>