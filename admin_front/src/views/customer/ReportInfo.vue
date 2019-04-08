<template>
<div class="reportInfo-view">
  <h4>{{report.id}}：{{report.typeString}}</h4>

  <div class="row">

    <!-- 举报详情 -->
    <div class="col-md-6">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">{{ $t('reportInfo.box.title1') }}</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr><td width="140px">{{ $t('reportInfo.table1.type') }}</td><td>{{report.typeString || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table1.bikeId') }}</td><td>{{report.bikeId || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table1.createdAt') }}</td><td>{{report.createdAtString || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table1.address') }}</td><td>{{report.geoAddress || "--"}}</td></tr>
              <tr v-if="report.type === 2 || report.type === 5"><td width="140px">{{ $t('reportInfo.table1.content') }}</td><td>{{report.content || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table1.remark') }}</td><td>{{report.remark || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table1.img') }}</td><td><img v-for="(img, index) in report.imgs" :src="img" :key="index" alt="" width="220px"></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 举报未处理故障概况详情 -->
    <div class="col-md-6">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">
            {{ $t('reportInfo.box.title9') }} :
            <a v-if="total > 0" :href="'/customer/report?bikeId=' + report.bikeId"  target="_blank">{{ total }}</a>
            <span v-else>{{ total }}</span>
          </h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr v-for="(items, index) in unhandles" :key="index">
                <template v-for="item in items">
                  <td width="160px" :key="item.type">{{ item.typeName }}</td>
                  <td :key="item.type">
                    <a v-if="item.count > 0" :href="'/customer/report?bikeId=' + report.bikeId + '&type=' + item.type"  target="_blank">{{ item.count }}</a>
                    <span v-else>{{ item.count }}</span>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="row" v-if="report.type !== 30 && report.type !== 31 && report.type !== 32"> <!-- 电量低于3.5V  72小时未使用  骑行超过6小时  不显示 -->
    <!-- 举报人信息 -->
    <div :class="{'col-md-12': report.type !== 3, 'col-md-6': report.type === 3}">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">
            {{ $t('reportInfo.box.title3') }} - {{ $t('reportInfo.table2.tip') }} :
            <a v-if="informer.faultCount > 0" :href="'/customer/report?phone=' + informer.phone + '&bikeId=' + report.bikeId"  target="_blank">{{ informer.faultCount }}</a>
            <span v-else>{{ informer.faultCount }}</span>
          </h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr><td width="140px">{{ $t('reportInfo.table2.phone') }}</td><td>
                <a v-if="informer.phone" :href="'/operate/trip?phone=' + informer.phone" target="_blank">{{informer.code ? '+' + informer.code + ' ' + informer.phone : informer.phone}}</a>
                <span v-else>--</span>
              </td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table2.email') }}</td><td>{{informer.email || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table2.balance') }}</td><td>{{informer.balance ? informer.currencySymbol + ' ' + informer.balance : "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table2.credit') }}</td><td>{{informer.credit || "--"}}</td></tr>

              <tr v-if="informer.reportCount === 0"><td width="140px">{{ $t('reportInfo.table2.reportCount') }}</td><td>{{informer.reportCount}}</td></tr>
              <tr v-else-if="informer.reportCount > 0"><td width="140px">{{ $t('reportInfo.table2.reportCount') }}</td><td><a :href="'/customer/report?phone=' + informer.phone" target="_blank">{{informer.reportCount}}</a></td></tr>
              <tr v-else><td width="140px">{{ $t('reportInfo.table2.reportCount') }}</td><td>--</td></tr>

              <tr><td width="140px">{{ $t('reportInfo.table2.beReportedCount') }}</td><td>{{informer.beReportedCount !== null && informer.beReportedCount !== undefined ? informer.beReportedCount : "--"}}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 被举报人信息 -->
    <div class="col-md-6" v-if="report.type === 3">   <!-- 举报违停 才显示 -->
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">{{ $t('reportInfo.box.title4') }}</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr><td width="140px">{{ $t('reportInfo.table3.phone') }}</td><td>
                <a v-if="beInformer.phone" :href="'/operate/trip?phone=' + beInformer.phone" target="_blank">{{beInformer.code ? '+' + beInformer.code + ' ' + beInformer.phone : beInformer.phone}}</a>
                <span v-else>--</span>
              </td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table3.email') }}</td><td>{{beInformer.email || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table3.balance') }}</td><td>{{beInformer.balance ? beInformer.currencySymbol + ' ' + beInformer.balance : "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table3.credit') }}</td><td>{{beInformer.credit || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table3.isDone') }}</td><td>{{beInformer.deduct ? $t('common.yes') : $t('common.no')}}</td></tr>

              <tr v-if="beInformer.reportCount === 0"><td width="140px">{{ $t('reportInfo.table3.reportCount') }}</td><td>{{beInformer.reportCount}}</td></tr>
              <tr v-else-if="beInformer.reportCount > 0"><td width="140px">{{ $t('reportInfo.table3.reportCount') }}</td><td><a v-if="$route.path.indexOf('/customer/report') >= 0" :href="'/customer/report?phone=' + beInformer.phone" target="_blank">{{beInformer.reportCount}}</a></td></tr>
              <tr v-else><td width="140px">{{ $t('reportInfo.table3.reportCount') }}</td><td>--</td></tr>

              <tr><td width="140px">{{ $t('reportInfo.table3.beReportedCount') }}</td><td>{{beInformer.beReportedCount !== null && beInformer.beReportedCount !== undefined ? beInformer.beReportedCount : "--"}}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- 单车现状 -->
  <div class="row">
    <div class="col-md-12">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">{{ $t('reportInfo.box.title5') }}</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr><td width="140px">{{ $t('reportInfo.table4.bikeId') }}</td><td>
                <a v-if="computedBike.id" :href="'/operate/trip?bikeId=' + computedBike.id" target="_blank">{{computedBike.id}}</a>
                <span v-else>--</span>
              </td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table4.status') }}</td><td>{{computedBike.statusString || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table4.electricity') }}</td><td>{{computedBike.electricity || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table4.useTime') }}</td><td>{{computedBike.useTimeString || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table4.optStatus') }}</td><td>{{computedBike.optStatusString || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table4.address') }}</td><td>{{computedBike.address || "--"}}
              </td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!--<div class="col-md-6">
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">{{ $t('reportInfo.box.title2') }}</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <div id="map" style="height: 230px; width:100%;"></div>
        </div>
      </div>
    </div>-->
  </div>

  <div class="row">
    <!-- 举报前一条使用记录 -->
    <div class="col-md-6">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">{{ $t('reportInfo.box.title10') }}</h3>
          <div class="box-tools">
            <span>{{ $t('reportInfo.table10.tip') }} : {{ lastOrder.orderNo === bikeOrder.orderNo ? $t('reportInfo.table10.yes') : $t('reportInfo.table10.no') }}</span>
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr><td width="140px">{{ $t('reportInfo.table10.orderNo') }}</td><td>{{lastOrder.orderNo || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table10.status') }}</td><td>{{ getOrderStatus(lastOrder.status) }}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table10.lockType') }}</td><td>{{ getLockTypeString(lastOrder.lockType) || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table10.startTime') }}</td><td>{{ getTimeString(lastOrder.startTime) || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table10.phone') }}</td><td>
                <a v-if="lastOrder.phone" :href="'/operate/trip?phone=' + lastOrder.phone" target="_blank">{{lastOrder.code ? '+' + lastOrder.code + ' ' + lastOrder.phone : lastOrder.phone}}</a>
                <span v-else>--</span>
              </td></tr>
              <!-- type: 3 -> reportedMan, else -> reportedMan; 待修改 zhu 2017.08.09 -->
              <tr><td width="140px">{{ report.type === 3 ? $t('reportInfo.table5.reportedMan') : $t('reportInfo.table5.reportMan') }}</td><td>{{report.type === 3 ? (lastOrder.reportedMan ? $t('reportInfo.table5.yes') : $t('reportInfo.table5.no')) : (lastOrder.reportor ? $t('reportInfo.table5.yes') : $t('reportInfo.table5.no'))}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table10.minutes') }}</td><td>{{lastOrder.minutes !== null && lastOrder.minutes !== undefined ? lastOrder.minutes + ' min' : "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table10.distance') }}</td><td>{{lastOrder.distance !== null && lastOrder.distance !== undefined ? lastOrder.distance + ' m' : "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table10.beginAddress') }}</td><td>{{lastOrder.beginAddress || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table10.endAddress') }}</td><td>{{lastOrder.endAddress || "--"}}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 最后使用记录 -->
    <div class="col-md-6">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">{{ $t('reportInfo.box.title6') }}</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr><td width="140px">{{ $t('reportInfo.table5.orderNo') }}</td><td>{{bikeOrder.orderNo || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table5.status') }}</td><td>{{ getOrderStatus(bikeOrder.status) }}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table5.lockType') }}</td><td>{{ getLockTypeString(bikeOrder.lockType) || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table5.startTime') }}</td><td>{{ getTimeString(bikeOrder.startTime) || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table5.phone') }}</td><td>
                <a v-if="bikeOrder.phone" :href="'/operate/trip?phone=' + bikeOrder.phone" target="_blank">{{bikeOrder.code ? '+' + bikeOrder.code + ' ' + bikeOrder.phone : bikeOrder.phone}}</a>
                <span v-else>--</span>
              </td></tr>
              <!-- type: 3 -> reportedMan, else -> reportedMan; 待修改 zhu 2017.08.09 -->
              <tr><td width="140px">{{ report.type === 3 ? $t('reportInfo.table5.reportedMan') : $t('reportInfo.table5.reportMan') }}</td><td>{{report.type === 3 ? (bikeOrder.reportedMan ? $t('reportInfo.table5.yes') : $t('reportInfo.table5.no')) : (bikeOrder.reportor ? $t('reportInfo.table5.yes') : $t('reportInfo.table5.no'))}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table5.minutes') }}</td><td>{{bikeOrder.minutes !== null && bikeOrder.minutes !== undefined ? bikeOrder.minutes + ' min' : "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table5.distance') }}</td><td>{{bikeOrder.distance !== null && bikeOrder.distance !== undefined ? bikeOrder.distance + ' m' : "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table5.beginAddress') }}</td><td>{{bikeOrder.beginAddress || "--"}}</td></tr>
              <tr><td width="140px">{{ $t('reportInfo.table5.endAddress') }}</td><td>{{bikeOrder.endAddress || "--"}}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- 工单处理 -->
  <div class="row">
    <div class="col-md-12">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">{{ $t('reportInfo.box.title7') }}</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <table class="table">
            <tbody>
              <tr><td width="100px">{{ $t('reportInfo.table6.priority') }}</td><td>
                <a href="javascript:void(0)" @click="query.priority = 1" class="btn btn-sm btn-flat pull-left" :class="{'btn-danger': query.priority === 1, 'btn-default': query.priority !== 1}">{{ $t('reportInfo.table6.priority1') }}</a>
                <a href="javascript:void(0)" @click="query.priority = 2" class="btn btn-sm btn-flat pull-left" :class="{'btn-danger': query.priority === 2, 'btn-default': query.priority !== 2}">{{ $t('reportInfo.table6.priority2') }}</a>
                <a href="javascript:void(0)" @click="query.priority = 3" class="btn btn-sm btn-flat pull-left" :class="{'btn-danger': query.priority === 3, 'btn-default': query.priority !== 3}">{{ $t('reportInfo.table6.priority3') }}</a>
                <a href="javascript:void(0)" @click="query.priority = 0" v-show="query.priority" class="btn btn-sm btn-flat pull-left">{{ $t('reportInfo.table6.priority0') }}</a>
              </td></tr>
              <tr><td width="100px">{{ $t('reportInfo.table6.assignTo') }}</td><td>
                <div class="row">
                  <div class="col-md-2">
                    <el-select v-model="query.assignTo">
                      <el-option
                        v-for="item in assignToOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </td></tr>
              <tr><td width="100px">{{ $t('reportInfo.table6.handleDesc') }}</td><td>
                <div class="row"><div class="col-md-6">
                  <el-input v-model="query.handleDesc" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" :disabled="operateDisabled"></el-input>
                </div></div>
              </td></tr>
              <!--举报违停-->
              <tr v-if="report.type === 3"><td width="100px">{{ $t('reportInfo.table6.credit') }}</td><td>
                <el-checkbox v-model="query.reward" :disabled="operateDisabled || query.reward">{{ $t('reportInfo.table6.addCredit', {score: 3}) }}</el-checkbox>
                <el-checkbox v-model="query.deduct" :disabled="operateDisabled">{{ $t('reportInfo.table6.minusCredit', {score: 20}) }}</el-checkbox>
              </td></tr>
              <!--单车故障-->
              <tr v-if="report.type === 2"><td width="100px">{{ $t('reportInfo.table6.credit') }}</td><td>
                <el-checkbox v-model="query.reward" :disabled="operateDisabled || query.reward">{{ $t('reportInfo.table6.addCredit', {score: 2}) }}</el-checkbox>
              </td></tr>
              <!--举报违停 是否发消息给用户-->
              <tr v-if="report.type === 3"><td width="100px">{{ $t('reportInfo.table6.sendNoti') }}</td><td>
                <el-checkbox v-model="query.sendNotiToReportor" :disabled="operateDisabled">{{ $t('reportInfo.table6.reporter') }}</el-checkbox>
                <el-checkbox v-model="query.sendNotiToReported" :disabled="operateDisabled">{{ $t('reportInfo.table6.reported') }}</el-checkbox>
              </td></tr>
              <!--单车故障 是否发消息给用户-->
              <tr v-if="report.type === 2"><td width="100px">{{ $t('reportInfo.table6.sendNoti') }}</td><td>
                <el-radio-group v-model="query.sendNotiToReportor" :disabled="operateDisabled">
                  <el-radio :label="1">{{ $t('reportInfo.table6.yes') }}</el-radio>
                  <el-radio :label="0">{{ $t('reportInfo.table6.no') }}</el-radio>
                </el-radio-group>
              </td></tr>

              <tr><td width="100px">{{ $t('reportInfo.table6.handle') }}</td><td>
                <el-button type="primary" @click="save" :loading="loading" :disabled="operateDisabled">{{ $t('reportInfo.table6.save') }}</el-button>
                <el-button type="primary" @click="handleConfirm" :loading="loading" :disabled="operateDisabled">{{ $t('reportInfo.table6.handleConfirm') }}</el-button>
                <el-button type="default" @click="handleIgnore" :loading="loading" :disabled="operateDisabled">{{ $t('reportInfo.table6.handleIgnore') }}</el-button>
                <a class="btn" :href="'mailto:' + informer.email" v-if="informer.email">{{ $t('reportInfo.table6.mailto') }}{{ informer.email }}</a>
              </td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- 工单历史 -->
  <div class="row">
    <div class="col-md-12">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">{{ $t('reportInfo.box.title8') }}</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <table class="table">
            <tbody>
              <tr>
                <td width="140px">{{report.createdAtString}}</td>
                <td width="140px">{{report.memberNameString}}</td>
                <td>{{ $t('reportInfo.table7.report') }} <span class="text-yellow">{{report.typeString}}</span> {{ $t('reportInfo.table7.desc') }}<span class="text-yellow">{{report.remark}}</span></td>
              </tr>
              <tr v-for="history in computedHistorys" :key="history">
                <td width="140px">{{history.createdAtString}}</td>
                <td width="140px">{{history.handlePeopleName}}</td>
                <td>
                  <div v-if="history.isPriority">{{ $t('reportInfo.table7.beforePriority') }} <span class="text-yellow">{{getPriorityName(history.beforePriority)}}</span> {{ $t('reportInfo.table7.to') }} <span class="text-yellow">{{getPriorityName(history.priority)}}</span></div>
                  <div v-if="history.isAssign">{{ $t('reportInfo.table7.from') }} <span class="text-yellow">{{getAssignToName(history.beforeAssign)}}</span> {{ $t('reportInfo.table7.to') }} <span class="text-yellow">{{getAssignToName(history.assignTo)}}</span></div>
                  <div v-if="history.isStatus">{{ $t('reportInfo.table7.beforeStatus') }} <span class="text-yellow">{{getStatusName(history.beforeStatus)}}</span> {{ $t('reportInfo.table7.to') }} <span class="text-yellow">{{getStatusName(history.status)}}</span></div>
                  <div v-if="history.handleDesc">{{ $t('reportInfo.table7.addRemark') }}<span class="text-yellow">{{history.handleDesc}}</span></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
// import bikeFault2 from "../../assets/img/bike-fault-2.png"
// import {loaded} from '../../components/googleMap/utils/manager.js'

// let map = null;

export default {
  mounted() {
    // loaded.then(() => {
    //   this.initMap();
      this.getBikeDetail();
    // });

    this.query.assignTo = this.report.assignTo || 2;
    this.query.priority = this.report.priority;
    this.query.deduct = !!this.report.deduct;
    this.query.reward = !!this.report.reward;

    this.getBikeUnhandle();
    this.getLastOrder();

    api.getInformer(this, {faultId: this.bikeFaultId})
    api.getBeInformer(this, {faultId: this.bikeFaultId})
    api.getReportHistoryList(this, {bikeFaultId: this.bikeFaultId});
  },
  data() {
    return {
      loading: false,
      bikeFaultId: this.$route.params.id,
      report: JSON.parse(sessionStorage.getItem('report')),
      query: {
        bikeFaultIds: this.$route.params.id,
        handleDesc: null,
        assignTo: 2,
        priority: 0,
        deduct: false,
        reward: false,
        sendNotiToReportor: 0,
        sendNotiToReported: 0,
      },
      informer: {
        "memberId": null,
        "phone": null,
        "email": null,
        "credit": null,
        "reportCount": null,
        "beReportedCount": null,
        "currencySymbol": null,
        "balance": null,
      },
      beInformer: {
        "memberId": null,
        "phone": null,
        "email": null,
        "credit": null,
        "reportCount": null,
        "beReportedCount": null,
        "currencySymbol": null,
        "balance": null,
      },
      assignToOptions: [
        {label: this.$t('reportInfo.js.assignTo1'), value: 1},
        {label: this.$t('reportInfo.js.assignTo2'), value: 2},
      ],

      bike: {},
      order: {},
      bikeOrder: {},
      lastOrder: {},
      historys: [],
      reportUnhandles: [],
      unhandles: [],
      total: 0,
    }
  },
  computed: {
    computedBike() {
      return {
        ...this.bike,
        statusString: this.bike.status == "0" ? this.$t('reportInfo.js.bikeStatus0') : this.bike.status == "1" ? this.$t('reportInfo.js.bikeStatus1') : this.bike.status == "2" ? this.$t('reportInfo.js.bikeStatus2')
                        : this.bike.status == "3" ? this.$t('reportInfo.js.bikeStatus3') : this.bike.status == "4" ? this.$t('reportInfo.js.bikeStatus4')
                        : this.bike.status == "5" ? this.$t('reportInfo.js.bikeStatus5') : "",
        useTimeString: this.bike.useTime ? moment(this.bike.useTime).format("YYYY-MM-DD HH:mm:ss") : "",
        optStatusString: this.bike.operationStatus == 1 ? this.$t('reportInfo.js.optStatus1')
                       : this.bike.operationStatus == 2 ? this.$t('reportInfo.js.optStatus2')
                       : this.bike.operationStatus == 3 ? this.$t('reportInfo.js.optStatus3')
                       : this.bike.operationStatus == 4 ? this.$t('reportInfo.js.optStatus4')
                       : this.bike.operationStatus == 0 ? this.$t('reportInfo.js.optStatus0') : "" ,
      }
    },
    computedHistorys() {
      return this.historys.map((item) => {
        return {
          ...item,
          priorityString: item.isPriority ? this.$t('reportInfo.js.beforePriority') + ' ' + this.getPriorityName(item.beforePriority) + ' '+ this.$t('reportInfo.js.to') +' ' + this.getPriorityName(item.priority) : '',
          assignToString: item.isAssign ? this.$t('reportInfo.js.from') + ' ' + this.getAssignToName(item.beforeAssign) + ' '+ this.$t('reportInfo.js.to') +' ' + this.getAssignToName(item.assignTo) : '',
          statusString:   item.isStatus ? this.$t('reportInfo.js.beforeStatus') + ' ' + this.getStatusName(item.beforeStatus) + ' '+ this.$t('reportInfo.js.to') +' ' + this.getStatusName(item.status) : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      });
    },
    operateDisabled() {
      return this.report.status === 1 || this.report.status === 2;  // 已处理和已忽略状态一样，申诉中跟未处理的状态可操作的是一样的
    }
  },
  beforeDestroy() {

  },
  methods: {
    goBack() {
      this.$router.push({name: "report"})
    },
    getPriorityName(priority) {
      let name = '';
      switch (priority) {
        case 1 : name = this.$t('reportInfo.js.priority1'); break;
        case 2 : name = this.$t('reportInfo.js.priority2'); break;
        case 3 : name = this.$t('reportInfo.js.priority3'); break;
        case 0 : name = this.$t('reportInfo.js.priority0'); break;
        default : null;
      }
      return name;
    },
    getAssignToName(assignTo) {
      return assignTo === 1 ? this.$t('reportInfo.js.assignTo1') : assignTo === 2 ? this.$t('reportInfo.js.assignTo2') : '';
    },
    getStatusName(status) {
      // let name = '';
      // switch (status) {
      //   case 0 : name = this.$t('reportInfo.js.status0'); break;
      //   case 1 : name = this.$t('reportInfo.js.status1'); break;
      //   case 2 : name = this.$t('reportInfo.js.status2'); break;
      //   case 3 : name = this.$t('reportInfo.js.status3'); break;
      //   default : null;
      // }
      // return name;
      return this.$t('reportInfo.js.status' + status);
    },
    handleConfirm() {
      api.saveFaultConfirm(this, this.query)
    },
    handleIgnore() {
      api.updateFaultIgnore(this, this.query)
    },
    save() {
      api.updateReportLog(this, this.query).then(() => {
        api.getReportHistoryList(this, {bikeFaultId: this.bikeFaultId});
      })
    },
    initMap() {
      const position = {lat: +this.report.latitude, lng: +this.report.longitude};
      map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 15
      });

      let marker = new google.maps.Marker({
        position: position,
        // title: item.id,
        // icon: item.operationStatus == 1 ? bikeFault1 : item.operationStatus == 2 ? bikeFault2 : item.operationStatus == 3 ? bikeFault3 : bikeFault1,
        map: map,
      });
    },
    getBikeDetail() {
      api.getBikeDetail(this, {bikeId: this.report.bikeId}).then(() => {
        // const position = {lat: +this.bike.latitude, lng: +this.bike.longitude};
        // let marker = new google.maps.Marker({
        //   position,
        //   title: this.bike.id,
        //   icon: bikeFault2,
        //   map,
        // });
      });
    },
    getBikeUnhandle() {
      api.getBikeUnhandle(this, {bikeId: this.report.bikeId}).then((reportUnhandles) => {
        reportUnhandles.forEach((u, i) => {
          if(i % 2 === 0) {
            this.unhandles.push([u]);
          } else {
            this.unhandles[Math.floor(i/2)].push(u);
          }
        })

      });
    },
    getLastOrder() {
      api.getLastOrder(this, {faultId: this.bikeFaultId});
    },
    getOrderStatus(status) {
      return status ? this.$t('reportInfo.table5.status' + status) : '--';
    },
    getTimeString(time) {
      return time ? moment(time).format("YYYY-MM-DD HH:mm:ss") : '--';
    },
    getLockTypeString(lockType) {
      return lockType ? this.$t('reportInfo.js.lockType' + lockType) : '--';
    }
  }
}

</script>
