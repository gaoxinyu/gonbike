<template>
  <div class="flashMan-edit-view">
    <el-form label-position="left" label-width="80px" v-loading="loading" :model='data'>
      <div class="box box-primary">
        <div class="box-header with-border">
          <div class="col-md-6 col-xs-12">
            {{$t('flashmanedit.form.title')}}
          </div>
          <div class="col-md-3 col-xs-12">
            <el-button type="primary"  :loading="loading" @click="check(37)" :disabled="query.countryId===37">China</el-button>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-button type="primary"  :loading="loading" @click="check(153)" :disabled="query.countryId===153">Singapore</el-button>
          </div>
        </div>
        <div class="box-body">
           <div class="col-md-12 col-xs-12">
            <div class="row">
              <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('flashmanedit.form.countrySelect')">
                  <el-input v-model="data.deliveryConfigCountry.name" disabled></el-input>
                </el-form-item>
              </div>
              <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('flashmanedit.form.cityName')">
                  <el-input v-model="data.deliveryConfigCountry.cityName" disabled></el-input>
                </el-form-item>
              </div>
              <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('flashmanedit.form.currency')">
                  <el-input v-model="data.deliveryConfigCountry.currency" disabled></el-input>
                </el-form-item>
              </div>
              <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('flashmanedit.form.currencySymbol')">
                  <el-input v-model="data.deliveryConfigCountry.currencySymbol" disabled></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-xs-12">
                <el-form-item :inline="true" :label="$t('flashmanedit.form.paymentType')" class="required">
                  <el-switch
                    v-model.number="withdrawDayType"
                    :active-value="1"
                    :inactive-value="2"
                    :active-text="$t('flashmanedit.form.week')"
                    :inactive-text="$t('flashmanedit.form.month')">
                  </el-switch>
                </el-form-item>
              </div>
              <div class="col-md-3 col-xs-12">
                <el-form-item :inline="true" 
                  :label="$t('flashmanedit.form.paymentDate')" 
                  class="required" 
                  v-show="withdrawDayType === 1">
                  <el-select v-model="data.deliveryConfigDriver.withdrawDay" :placeholder="$t('flashmanedit.form.selectPlaceholder')">
                    <el-option
                      v-for="item in withdrawDayOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item 
                  :label="$t('flashmanedit.form.paymentDate')" 
                  :prop="'deliveryConfigDriver.withdrawDay'"
                  :show-message='false'
                  :rules="[
                    { required: true, message: '日期不能为空'},
                    { type: 'number', min: 1, max: 28, message: '1~28'}
                  ]"
                  v-show="withdrawDayType === 2">
                  <el-input v-model.number="data.deliveryConfigDriver.withdrawDay"
                  type="number" :placeholder="$t('flashmanedit.form.datePlaceholder')">
                  </el-input>
                </el-form-item>
              </div>
              <div class="col-md-3 col-xs-12">
                <el-form-item 
                  :label="$t('flashmanedit.form.orderRadius')" 
                  :prop="'deliveryConfigDriver.orderRaduis'"
                  :show-message='false'
                  :inline-message='true'
                  :rules="[
                    { required: true, message: '半径不能为空'},
                    { type: 'number', min: 0.001, message: '>0'}
                  ]">
                  <el-input type="number" 
                    v-model.number="data.deliveryConfigDriver.orderRaduis" 
                    auto-complete="off"
                    :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                    <template slot="append"> m </template>
                  </el-input>
                </el-form-item>
              </div>
              <div class="col-md-3 col-xs-12">
                <el-form-item 
                  :label="$t('flashmanedit.form.depositConfig')"
                  :prop="'deliveryConfigDriver.deposit'"
                  :show-message='false'
                  :inline-message='true'
                  :rules="[
                    { required: true, message: '押金不能为空'},
                    { type: 'number', min: 0.001, message: '押金必须大于0'}
                  ]">
                  <el-input v-model.number="data.deliveryConfigDriver.deposit" :min="0"
                  type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                    <template slot="append"> {{data.deliveryConfigCountry.currencySymbol}} </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <!-- <div class="row">
              <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('flashmanedit.form.grabLimitSameTime')">
                  <el-input v-model.number="data.deliveryConfigDriver.grabNumSameTime" :min="0"
                  type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                    <template slot="append">{{$t('flashmanedit.form.timesUnit')}}</template>
                  </el-input>
                </el-form-item>
              </div>
              <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('flashmanedit.form.dayCancelOrderUser')">
                  <el-input v-model.number="data.deliveryConfigUser.dayCancelOrderUser" :min="0"
                  type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                    <template slot="append">{{$t('flashmanedit.form.timesUnit')}}</template>
                  </el-input>
                </el-form-item>
              </div>
              <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('flashmanedit.form.dayCancelOrderDriver')">
                  <el-input v-model.number="data.deliveryConfigDriver.dayCancelOrderDriver" :min="0"
                  type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                    <template slot="append">{{$t('flashmanedit.form.timesUnit')}}</template>
                  </el-input>
                </el-form-item>
              </div>
              
            </div> -->
          </div>

          <div class="col-md-6 col-xs-12">
            <div class="box box-inline" >
              <div class="box-header with-border">
                {{$t('flashmanedit.form.basicPrice')}}
              </div>
              <div class="box-body">
                <el-form-item :label="$t('flashmanedit.form.priceStart')">
                  <el-input v-model.number="data.deliveryConfigCountry.priceStart" :min="0"
                  type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                    <template slot="append">{{data.deliveryConfigCountry.currencySymbol}}</template>
                  </el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t('flashmanedit.form.depositBackNum')">
                  <el-input v-model.number="data.deliveryConfigDriver.depositBackNum" :min="0"
                  type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                    <template slot="append">{{$t('flashmanedit.form.timesUnit')}}</template>
                  </el-input>
                </el-form-item> -->
                <el-form-item :label="$t('flashmanedit.form.priceServcie')" class="required">
                  <el-input
                    :min="0"
                    :max="priceServcieType === 2 ? 100 : 100000"
                    v-model.number="data.deliveryConfigCountry.priceServcie" 
                    type="number" :placeholder="$t('flashmanedit.form.needDepositPlaceholder')">
                    <template slot="prepend">
                      <el-switch
                        v-model="priceServcieType"
                        :active-value="1"
                        :inactive-value="2"
                        :active-text="$t('flashmanedit.form.fixed')"
                        :inactive-text="$t('flashmanedit.form.rate')">
                      </el-switch>
                    </template>
                    <template slot="append">
                      {{priceServcieType == 2 ? '%' :  data.deliveryConfigCountry.currencySymbol}}
                    </template>
                  </el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t('flashmanedit.form.priceRefund')" class="required">
                  <el-input
                    :min="0"
                    :max="priceRefundType === 2 ? 100 : 100000"
                    v-model.number="data.deliveryConfigCountry.priceRefund" 
                    type="number" 
                    :placeholder="$t('flashmanedit.form.needDepositPlaceholder')">
                    <template slot="prepend">
                      <el-switch
                        v-model="priceRefundType"
                        :active-value="1"
                        :inactive-value="2"
                        :active-text="$t('flashmanedit.form.fixed')"
                        :inactive-text="$t('flashmanedit.form.rate')">
                      </el-switch>
                    </template>
                    <template slot="append">
                      {{priceRefundType == 2 ? '%' :  data.deliveryConfigCountry.currencySymbol}}
                    </template>
                  </el-input>
                </el-form-item> -->
                <el-form-item :label="$t('flashmanedit.form.priceWithdraw')" class="required">
                  <el-input     
                    v-model.number="data.deliveryConfigDriver.priceWithdraw" 
                    type="number" 
                    :min='0'
                    :max="priceWithdrawType === 2 ? 100 : 100000"
                    :placeholder="$t('flashmanedit.form.needDepositPlaceholder')">
                    <template slot="prepend">
                      <el-switch
                        v-model="priceWithdrawType"
                        :active-value="1"
                        :inactive-value="2"
                        :active-text="$t('flashmanedit.form.fixed')"
                        :inactive-text="$t('flashmanedit.form.rate')">
                      </el-switch>
                    </template>
                    <template slot="append">
                      {{priceWithdrawType == 2 ? '%' : data.deliveryConfigCountry.currencySymbol}}
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>
            
          <div class="col-md-6 col-xs-12">
            <div class="box box-inline">
              <div class="box-header with-border">
                {{$t('flashmanedit.form.nightPrice')}}
              </div>
              <div class="box-body">
                <el-form-item :label="$t('flashmanedit.form.priceNightPercent')">
                  <el-input v-model.number="data.deliveryConfigCountry.priceNightPercent" :min="0" :max="100"
                  type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('flashmanedit.form.serviceNightStart')">
                  <el-time-picker
                    v-model="data.deliveryConfigCountry.serviceNightStart"
                    :placeholder="$t('flashmanedit.form.timePlaceholder')"
                    :format="'HH:mm'"
                    value-format='HH:mm'>
                  </el-time-picker>
                </el-form-item>
                <el-form-item :label="$t('flashmanedit.form.serviceNightEnd')">
                  <el-time-picker
                    v-model="data.deliveryConfigCountry.serviceNightEnd"
                    :placeholder="$t('flashmanedit.form.timePlaceholder')"
                    :format="'HH:mm'"
                    value-format='HH:mm'>
                  </el-time-picker>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-xs-12">
            <div class="box box-inline">
              <div class="box-header with-border">
                {{$t('flashmanedit.form.priceInterval')}}
              </div>
              <div class="box-body">
                <div class="row">
                  <!--weight interval-->
                  <div class="col-md-6 col-xs-12">
                    <el-table :data="weightPriceList">
                      <el-table-column :label="$t('flashmanedit.form.weightPriceList')">
                        <el-table-column
                          property="level"
                          :label="$t('flashmanedit.form.level')">
                        </el-table-column>
                        <el-table-column
                          property="min"
                          :label="$t('flashmanedit.form.min')+'(kg)'">
                        </el-table-column>
                        <el-table-column
                          property="max"
                          :label="$t('flashmanedit.form.max')+'(kg)'">
                        </el-table-column>
                        <el-table-column
                          property="price"
                          :label="$t('flashmanedit.form.price')+`(${data.deliveryConfigCountry.currencySymbol})`">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                    <el-collapse-transition>
                      <div v-show="weightTrigger">
                        <el-form-item :label="$t('flashmanedit.form.newIntervalSize')"    class="col-md-6">
                          <el-input v-model.number="newWeightIntervalNum" :min="0"
                            type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                          </el-input>
                        </el-form-item>
                        <el-form-item 
                          :label="$t('flashmanedit.form.newIntervalPrice')"
                          class="col-md-6">
                          <el-input v-model.number="newWeightIntervalPrice" 
                            :disabled="typeof lastWeightInterval === 'undefined'"
                            :min="0"
                            type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                          </el-input>
                        </el-form-item>
                      </div>
                    </el-collapse-transition>
                    <el-button-group style="float: right;" v-if="!weightTrigger">
                      <el-button  
                        icon="el-icon-delete"
                        :disabled="weightPriceList.length === 0"
                        @click="handleWeightIntervalRemove">{{$t('flashmanedit.form.delete')}}</el-button>
                        <el-button 
                        type="primary"
                        icon="el-icon-circle-plus"
                        :disabled="weightPriceList.length >= 3"
                        @click="toggleWeight">{{$t('flashmanedit.form.add')}}</el-button>
                    </el-button-group>
                    <el-button-group style="float: right;" v-else>
                      <el-button
                        icon="el-icon-circle-close-outline"
                        @click="toggleWeight">{{$t('flashmanedit.form.no')}}</el-button>
                        <el-button 
                        type="primary"
                        icon="el-icon-check"
                        :disabled="newWeightIntervalNum <= 0 || (newWeightIntervalPrice <= 0 && weightPriceList.length > 0)"
                        @click="handleWeightIntervalAdd">{{$t('flashmanedit.form.yes')}}</el-button>
                    </el-button-group>
                  </div>

                  <!--distance interval-->
                  <div class="col-md-6 col-xs-12">
                    <el-table :data="distancePriceList">
                      <el-table-column :label="$t('flashmanedit.form.distancePriceList')">
                        <el-table-column
                          property="level"
                          :label="$t('flashmanedit.form.level')">
                        </el-table-column>
                        <el-table-column
                          property="min"
                          :label="$t('flashmanedit.form.min')+'(km)'">
                        </el-table-column>
                        <el-table-column
                          property="max"
                          :label="$t('flashmanedit.form.max')+'(km)'">
                        </el-table-column>
                        <el-table-column
                          property="price"
                          :label="$t('flashmanedit.form.price')+`(${data.deliveryConfigCountry.currencySymbol})`">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                    <el-collapse-transition>
                      <div v-show="distanceTrigger">
                        <el-form-item :label="$t('flashmanedit.form.newIntervalSize')" class="col-md-6">
                          <el-input v-model.number="newDistanceIntervalNum" :min="0"
                            type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                          </el-input>
                        </el-form-item>
                        <el-form-item 
                          :label="$t('flashmanedit.form.newIntervalPrice')"
                          class="col-md-6">
                          <el-input v-model.number="newDistanceIntervalPrice"
                            :disabled="typeof lastDistanceInterval === 'undefined'"
                            :min="0"
                            type="number" 
                            :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                          </el-input>
                        </el-form-item>
                      </div>
                    </el-collapse-transition>
                    <el-button-group style="float: right;" v-if="!distanceTrigger">
                      <el-button  
                        icon="el-icon-delete"
                        :disabled="distancePriceList.length === 0"
                        @click="handleDistanceIntervalRemove">{{$t('flashmanedit.form.delete')}}</el-button>
                        <el-button 
                        type="primary"
                        icon="el-icon-circle-plus"
                        :disabled="distancePriceList.length >= 3"
                        @click="toggleDistance">{{$t('flashmanedit.form.add')}}</el-button>
                    </el-button-group>
                    <el-button-group style="float: right;" v-else>
                      <el-button
                        icon="el-icon-circle-close-outline"
                        @click="toggleDistance">{{$t('flashmanedit.form.no')}}</el-button>
                        <el-button 
                        type="primary"
                        icon="el-icon-check"
                        :disabled="newDistanceIntervalNum <= 0 || (newDistanceIntervalPrice <= 0 && distancePriceList.length > 0)"
                        @click="handleDistanceIntervalAdd">
                        {{$t('flashmanedit.form.yes')}}</el-button>
                    </el-button-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-12 col-xs-12">
            <div class="box box-inline">
              <div class="box-header with-border">
                {{$t('flashmanedit.form.countdown')}}
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-6 col-xs-12">
                    <el-form-item :label="$t('flashmanedit.form.countdowRightnow')">
                      <el-input v-model.number="data.deliveryConfigDriver.countdowRightnow" :min="0"
                      type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                        <template slot="append">min</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('flashmanedit.form.countdowAppoint')">
                      <el-input v-model.number="data.deliveryConfigDriver.countdowAppoint" :min="0"
                      type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                        <template slot="append">min</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('flashmanedit.form.countdownPay')">
                      <el-input v-model.number="data.deliveryConfigUser.countdownPay" :min="0"
                      type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                        <template slot="prepend">
                          <el-tooltip :content="$t('flashmanedit.form.countdownPayHelper')" placement="top">
                            <el-button><i class="el-icon-info"></i></el-button>
                          </el-tooltip>
                        </template>

                        <template slot="append">min</template>
                      </el-input>
                    </el-form-item>
                  </div>
                  <div class="col-md-6 col-xs-12">
                    <el-form-item :label="$t('flashmanedit.form.limitTimePickup')">
                      <el-input v-model.number="data.deliveryConfigDriver.limitTimePickup" :min="0"
                      type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                        <template slot="append">min</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('flashmanedit.form.countdowDelivery')">
                      
                      <el-input v-model.number="data.deliveryConfigDriver.limitTimeDelivery5" :min="0"
                          type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                            <template slot="append">min </template>
                      </el-input>
                      <!-- <table class="table table-bordered">
                        <tbody>
                          <tr>
                          <td>{{$t('flashmanedit.form.distance')}}</td>
                          <td>{{$t('flashmanedit.form.time')}}</td>
                        </tr>
                        <tr>
                          <td>
                            <el-tooltip :content="$t('flashmanedit.form.limitTimeDelivery5Helper')+`(0~${firstDistanceIntervalMax}km)`" placement="top">
                            <i class="el-icon-info"></i>
                            </el-tooltip>
                            {{$t('flashmanedit.form.limitTimeDelivery5')}}
                          </td>
                          <td>
                          <el-input v-model.number="data.deliveryConfigDriver.limitTimeDelivery5" :min="0"
                          type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                            <template slot="append">min </template>
                          </el-input>
                          </td>
                        <tr>
                          <td>{{$t('flashmanedit.form.limitTimeDeliveryPer5')}}<br>(5km)</td>
                          <td>
                          <el-input v-model.number="data.deliveryConfigDriver.limitTimeDeliveryPer5" :min="0"
                          type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                            <template slot="append">min </template>
                          </el-input>
                          </td>
                        </tr>
                        </tbody>
                      </table> -->
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <!-- <div class="col-md-12 col-xs-12">
            <div class="box">
              <div class="box-header with-border">
                tamplate header
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-3 col-xs-12">
                    <el-form-item :label="'template'">
                      <el-input v-model.number="templateZero" :min="0"
                      type="number" :placeholder="$t('flashmanedit.form.lt0Placeholder')">
                        <template slot="append">m</template>
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <div class="col-md-12 text-center">
            <el-button type="primary"  :loading="loading" @click="submit" :disabled="submitDisabled">{{$t('flashmanedit.form.save')}}</el-button>
            <!--<el-button @click="clear" :loading="loading">清除</el-button>-->
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import api from "../../api";

export default {
  data() {
    return {
      loading: false,
      data: {
        deliveryConfigCountry: {
          // id: 194,
          // countryId: 153,
          // en: "Singapore",
          // name: "新加",
          // abbr: "SG",
          // code: 65,
          // cityId: 0,
          // cityName: "",
          // currency: "SGD",
          // currencySymbol: "S$",
          // priceStart: 10,
          // priceServcie: 10,
          // priceServcieType: 2,
          // priceRefund: 10,
          // priceRefundType: 2,
          // priceNightPercent: 20,
          // serviceNightStart: "22:00",
          // serviceNightEnd: "05:00"
        },
        deliveryConfigDriver: {
          // id: 194,
          // countryId: 153,
          deposit: 0,
          // depositBackNum: 2,
          orderRaduis: 0,
          // countdowGrab: 30,
          // countdowAppoint: 30,
          // countdowRightnow: 30,
          // grabNumSameTime: 10,
          // limitTimePickup: 30,
          // limitTimeDelivery5: 120,
          // limitTimeDeliveryPer5: 30,
          // creditInitDriver: 90,
          // creditMaxDriver: 100,
          // creditAwardFirstOrderDriver: 10,
          // creditAwardNormalOrderDriver: 5,
          // creditPunishOverdaycancelDriver: 10,
          // creditPunishOvertime: 5,
          // dayCancelOrderDriver: 3,
          // frozenDriverMinCredit: 50,
          withdrawDay: ""
          // withdrawDayType: 1,
          // priceWithdraw: 10,
          // priceWithdrawType: 2
        },
        configPriceList: [
          // {
          //   id: 1,
          //   countryId: 153,
          //   type: 1,
          //   level: 1,
          //   min: 0,
          //   max: 5,
          //   price: 0
          // },
          // {
          //   id: 2,
          //   countryId: 153,
          //   type: 1,
          //   level: 2,
          //   min: 5,
          //   max: 10,
          //   price: 2
          // },
          // {
          //   id: 3,
          //   countryId: 153,
          //   type: 1,
          //   level: 3,
          //   min: 10,
          //   max: 20,
          //   price: 5
          // },
          // {
          //   id: 4,
          //   countryId: 153,
          //   type: 2,
          //   level: 1,
          //   min: 0,
          //   max: 5,
          //   price: 0
          // },
          // {
          //   id: 5,
          //   countryId: 153,
          //   type: 2,
          //   level: 2,
          //   min: 5,
          //   max: 10,
          //   price: 2
          // },
          // {
          //   id: 6,
          //   countryId: 153,
          //   type: 2,
          //   level: 3,
          //   min: 10,
          //   max: 20,
          //   price: 5
          // }
        ],
        deliveryConfigUser: {
          // id: 194,
          // countryId: 153,
          // countdownPay: 30,
          // creditInitUser: 90,
          // creditMaxUser: 100,
          // creditAwardFirstOrderUser: 10,
          // creditAwardNormalOrderUser: 5,
          // creditPunishOverdaycancelUser: 10,
          // dayCancelOrderUser: 3,
          // frozenUserMinCredit: 50
        }
      },
      query: {
        countryId: 153
      },
      loading: true,
      weightTrigger: false,
      newWeightIntervalNum: 0,
      newWeightIntervalPrice: 0,
      distanceTrigger: false,
      newDistanceIntervalNum: 0,
      newDistanceIntervalPrice: 0,
      withdrawDayShow: null,
      withdrawDayOption: [
        {
          value: 1,
          label: this.$i18n.t("common.weekdays.day1")
        },
        {
          value: 2,
          label: this.$i18n.t("common.weekdays.day2")
        },
        {
          value: 3,
          label: this.$i18n.t("common.weekdays.day3")
        },
        {
          value: 4,
          label: this.$i18n.t("common.weekdays.day4")
        },
        {
          value: 5,
          label: this.$i18n.t("common.weekdays.day5")
        },
        {
          value: 6,
          label: this.$i18n.t("common.weekdays.day6")
        },
        {
          value: 7,
          label: this.$i18n.t("common.weekdays.day7")
        }
      ]
    };
  },
  computed: {
    submitDisabled() {
      return (
        !(
          this.weightPriceList.length > 0 
          && this.distancePriceList.length > 0
          && this.data.deliveryConfigDriver.orderRaduis > 0
          && this.data.deliveryConfigDriver.deposit > 0
          && this.data.deliveryConfigDriver.withdrawDay > 0
          && this.data.deliveryConfigDriver.withdrawDay <= 28
        ) ||
        Object.values(this.data.deliveryConfigCountry).some(
          v => v === "" || v === null
        ) ||
        Object.values(this.data.deliveryConfigDriver).some(
          v => v === "" || v === null
        ) ||
        Object.values(this.data.deliveryConfigUser).some(
          v => v === "" || v === null
        )
      );
    },
    weightPriceList() {
      return this.data.configPriceList
        .filter(p => p.type === 2)
        .sort((a, b) => a.level > b.level);
    },
    distancePriceList() {
      return this.data.configPriceList
        .filter(p => p.type === 1)
        .sort((a, b) => a.level > b.level);
    },
    lastWeightInterval() {
      return this.weightPriceList[this.weightPriceList.length - 1];
    },
    lastDistanceInterval() {
      return this.distancePriceList[this.distancePriceList.length - 1];
    },
    firstDistanceInterval() {
      return this.distancePriceList[0];
    },
    firstDistanceIntervalMax() {
      return typeof this.firstDistanceInterval === "undefined"
        ? "?"
        : this.firstDistanceInterval.max;
    },
    priceServcieType: {
      get() {
        return this.data.deliveryConfigCountry.priceServcieType;
      },
      set(newValue) {
        this.data.deliveryConfigCountry.priceServcie = null;
        this.data.deliveryConfigCountry.priceServcieType = Number(newValue);
      }
    },
    priceRefundType: {
      get() {
        return this.data.deliveryConfigCountry.priceRefundType;
      },
      set(newValue) {
        this.data.deliveryConfigCountry.priceRefund = null;
        this.data.deliveryConfigCountry.priceRefundType = Number(newValue);
      }
    },
    priceWithdrawType: {
      get() {
        return this.data.deliveryConfigDriver.priceWithdrawType;
      },
      set(newValue) {
        this.data.deliveryConfigDriver.priceWithdraw = null;
        this.data.deliveryConfigDriver.priceWithdrawType = Number(newValue);
      }
    },
    withdrawDayType: {
      get() {
        return this.data.deliveryConfigDriver.withdrawDayType;
      },
      set(newValue) {
        this.data.deliveryConfigDriver.withdrawDay = null;
        this.data.deliveryConfigDriver.withdrawDayType = newValue;
      }
    }
  },
  mounted() {
    api.getFlashmanCountry(this, this.query);
  },
  methods: {
    check(countryId) {
      this.query.countryId = countryId;
      this.loading = true;
      api.getFlashmanCountry(this, this.query);
    },
    priceServcieTypeChange() {
      this.data.deliveryConfigCountry.priceServcie = 0;
    },
    submit() {
      this.$confirm(
        this.$i18n.t("flashmanedit.form.saveHelper"),
        this.$i18n.t("flashmanedit.form.hint"),
        {
          confirmButtonText: this.$i18n.t("flashmanedit.form.yes"),
          cancelButtonText: this.$i18n.t("flashmanedit.form.no"),
          type: "warning"
        }
      )
        .then(() => {
          api.updateFlashmanCountry(this, this.data);
        })
        .catch(() => {});
    },
    handleWeightIntervalRemove() {
      this._handleIntervalRemove(this.lastWeightInterval.id);
    },
    handleDistanceIntervalRemove() {
      this._handleIntervalRemove(this.lastDistanceInterval.id);
    },
    _handleIntervalRemove(targetId) {
      this.$confirm(this.$i18n.t("flashmanedit.form.removeInterval"), "提示", {
        confirmButtonText: this.$i18n.t("flashmanedit.form.yes"),
        cancelButtonText: this.$i18n.t("flashmanedit.form.no"),
        type: "warning"
      })
        .then(() => {
          let l = this.data.configPriceList;
          l.splice(l.findIndex(i => i.id === targetId), 1);
          this.$message({
            type: "warning",
            message: this.$i18n.t("flashmanedit.form.removeSuccess")
          });
        })
        .catch(() => {});
    },
    handleWeightIntervalAdd() {
      let newRow;
      if (this.lastWeightInterval) {
        newRow = {
          countryId: this.data.deliveryConfigCountry.countryId,
          level: this.lastWeightInterval.level + 1,
          min: this.lastWeightInterval.max,
          max: this.newWeightIntervalNum + this.lastWeightInterval.max,
          price: this.newWeightIntervalPrice
        };
      } else {
        newRow = {
          countryId: this.data.deliveryConfigCountry.countryId,
          level: 1,
          min: 0,
          max: this.newWeightIntervalNum,
          price: 0
        };
      }
      this._handleIntervalAdd(2, newRow);
      this.newWeightIntervalNum = 0;
      this.newWeightIntervalPrice = 0;
    },
    handleDistanceIntervalAdd() {
      let newRow;
      if (this.lastDistanceInterval) {
        newRow = {
          countryId: this.data.deliveryConfigCountry.countryId,
          level: this.lastDistanceInterval.level + 1,
          min: this.lastDistanceInterval.max,
          max: this.newDistanceIntervalNum + this.lastDistanceInterval.max,
          price: this.newDistanceIntervalPrice
        };
      } else {
        newRow = {
          countryId: this.data.deliveryConfigCountry.countryId,
          level: 1,
          min: 0,
          max: this.newDistanceIntervalNum,
          price: 0
        };
      }
      this._handleIntervalAdd(1, newRow);
      this.newDistanceIntervalNum = 0;
      this.newDistanceIntervalPrice = 0;
    },
    _handleIntervalAdd(type, newRow) {
      let message =
        this.$i18n.t("flashmanedit.form.newInterval") +
        `<br>
      <table class="table table-bordered">
        <tbody>
        <tr>
          <th>${this.$i18n.t("flashmanedit.form.level")}</td>
          <th>${this.$i18n.t("flashmanedit.form.min")}</td>
          <th>${this.$i18n.t("flashmanedit.form.max")}</td>
          <th>${this.$i18n.t("flashmanedit.form.price")}</td>
        </tr>
        <tr>
          <td>${newRow.level}</td>
          <td>${newRow.min}</td>
          <td>${newRow.max}</td>
          <td>${newRow.price}</td>
        </tr>
        </tbody>`;
      this.$confirm(message, this.$i18n.t("flashmanedit.form.hint"), {
        dangerouslyUseHTMLString: true,
        confirmButtonText: this.$i18n.t("flashmanedit.form.yes"),
        cancelButtonText: this.$i18n.t("flashmanedit.form.no"),
        type: "warning"
      })
        .then(() => {
          this.data.configPriceList.push(Object.assign({ type: type }, newRow));
          type === 1 ? this.toggleDistance() : this.toggleWeight();
          this.$message({
            type: "warning",
            message: this.$i18n.t("flashmanedit.form.removeSuccess")
          });
        })
        .catch(() => {});
    },
    toggleWeight() {
      this.weightTrigger = !this.weightTrigger;
    },
    toggleDistance() {
      this.distanceTrigger = !this.distanceTrigger;
    }
  }
};
</script>

<style lang="scss">
.flashMan-edit-view {
  th,
  td {
    width: 25%;
  }

  .box-inline {
    display: inline-block;
  }
}
</style>
