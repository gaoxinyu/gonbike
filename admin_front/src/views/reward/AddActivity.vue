<template>
<div class="add-activity-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ (this.$route.name === 'rweditactivity') ? $t('rweditactivity.form.title') : $t('rweditactivity.form.title0') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="100px">
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <!-- 活动名称 -->
            <el-form-item :label="$t('rweditactivity.form.name')" class="required">
              <el-input v-model="form.name" type="text"></el-input>
            </el-form-item>
            <!-- 适用国家 -->
            <el-form-item :label="$t('rweditactivity.form.countryId')">
              <el-select 
                v-model="form.countryId" 
                @change="getCountryInfo" 
                :filterable="true"
                v-if="!(this.$route.name === 'rweditactivity')">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="form.countryName" type="text" :disabled="true" v-if="this.$route.name === 'rweditactivity'"></el-input>
            </el-form-item>
            <!-- 适用城市 -->
            <el-form-item :label="$t('rweditactivity.form.cityId')">
              <el-select v-model="form.cityId" :disabled="cityOptions.length === 0" v-if="!(this.$route.name === 'rweditactivity')">
                <el-option
                  v-for="item in cityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="form.cityName" type="text" :disabled="true" v-if="this.$route.name === 'rweditactivity'"></el-input>
            </el-form-item>
            <!-- 开始时间 -->
            <el-form-item :label="$t('rweditactivity.form.startDateTime')" class="required">
              <el-date-picker
                v-model="dateTimeRange.startDateTime"
                type="datetime"
                :picker-options="pickerStartOption"
                :disabled="disabledStart"
                :clearable="false"
                :editable="false"
                @change="handleStartDateChange"
                :placeholder="$t('rweditactivity.form.startPlaceholder')">
              </el-date-picker>
            </el-form-item>
            <!-- 结束时间 -->
            <el-form-item :label="$t('rweditactivity.form.endDateTime')" class="required">
              <el-date-picker
                v-model="dateTimeRange.endDateTime"
                type="datetime"
                :picker-options="pickerEndOption"
                @change="handleEndDateChange"
                :clearable="false"
                :editable="false"
                :placeholder="$t('rweditactivity.form.endPlaceholder')">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <!-- 奖励类型 -->
        <div class="box box-inline" v-if="!isEdit">
          <div class="box-header with-border">
            {{$t('rweditactivity.form.addReward')}}
          </div>
          <div class="box-body">
            <div class="row">
              <!-- 优先级 -->
              <!-- <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('rweditactivity.form.priority')">
                  <div class="el-form-item">
                    <div class="el-form-item__content">
                      <el-input 
                      type="number" 
                      v-model.number="rewardContent.priority" 
                      :min="0"
                      :placeholder="$t('rweditactivity.form.priorityPlaceholder')"></el-input>
                    </div>
                  </div>
                </el-form-item>
              </div> -->
            </div>
            <div class="row">
              <!-- 供应商 -->
              <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('rweditactivity.form.merchantCode')">
                  <el-select 
                    v-model="query.merchantCode" 
                    @change="handleMerchantChange">
                    <el-option
                      v-for="item in rwmerchantOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <!-- 奖励类型 -->
              <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('rweditactivity.form.rewardType')">
                  <el-select 
                    v-model="query.rewardType" 
                    @change="handleMerchantChange">
                    <el-option
                      v-for="item in rewardTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <!-- 奖励名称 -->
              <div class="col-md-3 col-xs-12">
                <el-form-item :label="$t('rweditactivity.form.rewardId')">
                  <el-select 
                    v-model="rewardContent.rewardId" 
                    @change="getRewardId">
                    <el-option
                      v-for="item in rewardtypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <!-- 奖励总次数 -->
              <div class="col-md-3 col-xs-12" >
                <div class="el-form-item">
                   <el-form-item :label="$t('rweditactivity.form.rewardNum')" class="required">
                    <el-input
                      :min="0"
                      type="number"
                      v-model.number="rewardContent.rewardNum"
                      :placeholder="$t('rweditactivity.form.inputAmount')"
                      :disabled="unlimited">
                    </el-input>
                </el-form-item>
                </div>
              </div>
              <!-- 不限次数 -->
              <div class="col-md-3 col-xs-12">
                <div class="el-form-item">
                   <el-form-item :label="$t('rweditactivity.form.unlimited')" class="required">
                    <el-switch
                      v-model="unlimited"
                      :active-value="true"
                      :inactive-value="false"
                      :active-text="$t('rweditactivity.form.yes')"
                      :inactive-text="$t('rweditactivity.form.no')">>
                    </el-switch>
                </el-form-item>
                </div>
              </div>

              <div class="col-md-1 col-xs-6">
                <div class="el-form-item">
                  <div class="el-form-item__content">
                    <el-button type="primary" @click="addNew" :disabled="isNewRewardDisable">{{ $t('rweditactivity.form.addNew') }}</el-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <i class="red-info">{{ $t('rweditactivity.form.prioirtyNode')}}</i>
              </div>
            </div>
          </div>
        </div>
        <!-- 奖励内容 -->
        <div class="row">
          <div class="col-md-12 col-xs-12">
            <table class="table table-bordered">
            <tbody>
              <tr>
                <th width="10%">{{$t('rweditactivity.form.priority')}}</th>
                <th>{{$t('rweditactivity.form.priorityDetail')}}</th>
                <th width="10%" v-if="!isEdit">
                  {{ $t('rweditactivity.form.submit') }}
                </th>
              </tr>
              <tr v-for="(priorityArray, key) in rewards" :key="key" :class="{edit: key === rewardContent.priority + '' && !isEdit}">
                <th>{{key}}</th>
                <td>
                  <div class="content-items">
                    <div class="item" 
                      v-for="(item, index) in priorityArray" 
                      :key="index">
                      <h2 v-if="index !== priorityArray.length -  1">+</h2>
                      <h3>{{ item.rewardName || $t('rweditactivity.form.noName') }}</h3>
                      <p>{{ item.limited ? `${item.rewardNumRemained}/${item.rewardNum}`:$t('rweditactivity.form.noLimit') }}</p>
                      <span @click="deleteReward(key, index)"><i class="el-icon-close" v-if="!isEdit && key === rewardContent.priority + ''"></i></span>
                    </div>
                  </div>
                </td>
                <td width="10%" v-if="!isEdit">
                  <el-button @click="changePriority(parseInt(key,10) + 1)" v-if="key === rewardContent.priority + ''">{{ $t('rweditactivity.form.submit') }}</el-button>
                  <el-button @click="changePriority(parseInt(key,10))" v-else>{{ $t('rweditactivity.form.edit') }}</el-button>
                </td>
              </tr>
              <tr :class="{edit: Object.keys(rewards).length + 1 === rewardContent.priority}" v-if="!isEdit">
                <th>{{Object.keys(rewards).length + 1}}</th>
                <td style="text-align"></td>
                <td width="10%">
                  <el-button :disabled="true" v-if="Object.keys(rewards).length + 1 === rewardContent.priority">{{ $t('rweditactivity.form.submit') }}</el-button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <!-- 领取规则 -->
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('rweditactivity.form.limited')" class="required">
              <el-radio-group v-model="form.limitType" @change="handleLimitTypeChange">
                <el-radio :label="1">{{ $t('rweditactivity.form.limited1') }}</el-radio>
                <el-input v-model.number="form.unitTime" type="number" :min="1" style="margin-bottom: 10px;" v-show="form.limitType == 1">
                  <template slot="append">{{ $t('rweditactivity.form.unitTime') }}</template>
                </el-input>
                <el-input v-model.number="form.frequency" type="number" :min="1" style="margin-bottom: 20px;" v-show="form.limitType == 1">
                  <template slot="append">{{ $t('rweditactivity.form.limitedTimes') }}</template>
                </el-input>
                <br>

                <el-radio :label="2">{{ $t('rweditactivity.form.limited2') }}</el-radio>
                <el-input v-model.number="form.limitedTimes" type="number" :min="1" style="margin-bottom: 20px;" v-show="form.limitType == 2">
                  <template slot="append">{{ $t('rweditactivity.form.limitedTimes') }}</template>
                </el-input>
                <br>

                <el-radio :label="0">{{ $t('rweditactivity.form.limited0') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>

        <el-form-item>
          <el-button @click="goBack">{{ $t('rweditactivity.form.cancel') }}</el-button>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('rweditactivity.form.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import api from "../../api";
import moment from "moment";
import { getStorage } from "../../services/auth";
import Iphone from "../../components/Iphone";
import Mixins from "../../mixins/index.js";

export default {
  mixins: [Mixins.country, Mixins.language, Mixins.pickerStartOption],
  mounted() {
    const editRwActivity = sessionStorage.editRwActivity;
    if (this.isEdit) {
      this.form = JSON.parse(editRwActivity);
      this.dateTimeRange.startDateTime = this.form.startTime
        ? moment(this.form.startTime).toDate()
        : null;
      this.dateTimeRange.endDateTime = this.form.endTime
        ? moment(this.form.endTime).toDate()
        : null;
      this.rewards = this.form.rewardActivitySubList.reduce((r,item) => {
        r[item.priority] = r[item.priority] || []
        r[item.priority].push(item)
        return r
      }, {});
    }
    this.getCountryInfo();
    this.getMerchant();
  },
  data() {
    return {
      loading: false,
      citys: [],
      form: {
        name: null,
        countryId: null,
        cityId: null,
        startTime: null,
        endTime: null,
        limitType: 0,
        unitTime: null,
        frequency: null,
        limitedTimes: null,
        rewardActivitySubList: []
      },
      query: {
        merchantCode: null,
        rewardType: 1
      },
      noLimit: false,
      cityOptions: [],
      areaOptions: this.getAreaOnlyOptions(),
      rwmerchantOptions: [],
      rewardTypeOptions: [
        { label: this.$t("rweditactivity.js.rewardType1"), value: 1 },
        { label: this.$t("rweditactivity.js.rewardType2"), value: 2 },
        { label: this.$t("rweditactivity.js.rewardType3"), value: 3 }
      ],
      rewardtypes: [],
      rewardContent: {
        rewardId: null,
        rewardNumRemained: null,
        rewardNum: null,
        rewardName: null,
        priority: this.isEdit ? null : 1,
        limited: true
      },
      unlimited: false,
      rewards: {
        // 1: [{rewardId: 1, rewardNum: 2, rewardName: 1, priority: 1, limited: true}],
        // 2: [{rewardId: 1, rewardNum: 2, rewardName: 2, priority: 2, limited: true},{rewardId: 1, rewardNum: 2, rewardName: 2, priority: 2, limited: true}]
      },
      mergedRewards: []
    };
  },
  computed: {
    isNewRewardDisable() {
      return !(this.rewardContent.rewardId 
            && (this.rewardContent.priority > 0 && Number.isInteger(this.rewardContent.priority))
            && (!this.rewardContent.limited || this.rewardContent.rewardNum > 0))
    },
    submitDisabled() {
      let res = !(this.form.name
            && this.dateTimeRange.startDateTime
            && this.dateTimeRange.endDateTime
            && this.dateTimeRange.endDateTime > this.dateTimeRange.startDateTime
            && this.mergedRewards.length > 0
            && (this.form.limitType == 1 && this.form.frequency && this.form.unitTime 
                || this.form.limitType == 2 && this.form.limitedTimes
                || this.form.limitType == 0)
            )
      return res
    },
    isEdit() {
      return this.$route.name === "rweditactivity" && !!sessionStorage.editRwActivity
    }
  },
  watch: {
    unlimited(newVal){
      if(newVal) this.rewardContent.rewardNum = null
      this.rewardContent.limited = !newVal
    },
    rewards: {
      handler: function(newVal) {
        let rewards = newVal
        this.mergedRewards = 
          Object.keys(rewards).reduce(function (previous, key) {
            return previous.concat(rewards[key]);
          }, []);
      },
      deep: true
    }
  },
  methods: {
    addNew() {
      let priority = this.rewardContent.priority
      let newPriorityList = this.rewards[priority] || []
      this.rewardContent.rewardNumRemained = this.rewardContent.rewardNum
      newPriorityList.push(this.rewardContent)
      Vue.set(this.rewards, priority, newPriorityList)
      this.resetContent()
    },
    changePriority(key) {
      this.rewardContent.priority = key
    },
    resetContent() {
      this.rewardContent = {
        rewardId: null,
        rewardNumRemained: null,
        rewardNum: null,
        rewardName: null,
        priority: this.rewardContent.priority,
        limited: true
      };
      this.unlimited = false;
    },
    getRewardId(val) {
      for (let i = 0, len = this.rewardtypes.length; i < len; i++) {
        if (this.rewardtypes[i].id === this.rewardContent.rewardId) {
          this.rewardContent.rewardName = this.rewardtypes[i].name;
          break;
        }
      }
    },
    deleteReward(priority, index) {
      this.$confirm(
        this.$t("rweditactivity.js.message"),
        this.$t("rweditactivity.js.tip"),
        {
          confirmButtonText: this.$t("rweditactivity.js.ok"),
          cancelButtonText: this.$t("rweditactivity.js.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.realDeleteReward(priority, index)
        })
        .catch(() => {});
    },
    realDeleteReward(priority, index) {
      priority = Number(priority)
      let newPriorityList = this.rewards[priority];
      let length = Object.keys(this.rewards).length;
      Vue.delete(this.rewards, priority);
      newPriorityList.splice(index, 1);
      if(newPriorityList.length > 0){
        Vue.set(this.rewards, priority, newPriorityList);
      }else{
        // 删除一行，后面的整体上移
        for(let i = priority + 1; i <= length; i++){
          this.rewards[i].forEach(item => {
            item.priority--;
          })
          Vue.set(this.rewards, i - 1, this.rewards[i])
        }
        Vue.delete(this.rewards, length);
      }
    },
    getMerchant() {
      api.getMerchant(this).then(rwmerchants => {
        this.rwmerchantOptions = this.rwmerchants.map(rwmerchant => {
          return {
            label: rwmerchant.name,
            value: rwmerchant.merchantCode
          };
        });
        this.query.merchantCode = this.rwmerchantOptions[0].value;
        this.handleMerchantChange();
      });
    },
    handleMerchantChange() {
      api
        .getRewardType(this, {
          merchantCode: this.query.merchantCode,
          rewardType: this.query.rewardType
        })
        .then(rewardtypes => {
          rewardtypes.forEach(item => {
            item.label = item.name;
            item.value = item.id;
          });
          this.rewardContent.rewardId = null;
        });
    },
    handleLimitTypeChange() {
      this.form.unitTime = null;
      this.form.frequency = null;
      this.form.limitedTimes = null;
    },
    goBack() {
      this.$router.push({ name: "rwactivity" });
    },
    submit() {
      if (this.form.limitType == 0) {
        this.form.unitTime = null;
        this.form.frequency = null;
        this.form.limitedTimes = null;
      } else if (this.form.limitType == 1) {
        this.form.limitedTimes = null;
      } else if (this.form.limitType == 2) {
        this.form.unitTime = null;
        this.form.frequency = null;
      }
      let content = [];
      this.form.startTime = moment(this.dateTimeRange.startDateTime)
        .toDate()
        .getTime();
      this.form.endTime = moment(this.dateTimeRange.endDateTime)
        .toDate()
        .getTime();
      
      this.form.rewardActivitySubList = this.mergedRewards

      if (this.$route.name === "rwaddactivity") {
        api
          .saveRwActivity(this, this.form)
          .then(() => this.$router.push({ name: "rwactivity" }));
      } else if (this.$route.name === "rweditactivity") {
        api
          .updateRwActivity(this, this.form)
          .then(() => this.$router.push({ name: "rwactivity" }));
      }
    },
    getCountryInfo() {
      api.getCountryInfo(this, { id: this.form.countryId }).then(country => {
        if (country && country.topUpStandard) {
          this.nums = country.topUpStandard
            ? country.topUpStandard.split("|")
            : [];
        }
      });
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api
        .getCitysByCountry(this, { countryId: this.form.countryId })
        .then(citys => {
          this.cityOptions = this.citys.map(city => {
            return {
              label: city.name,
              value: city.id
            };
          });
          this.form.cityId =
            this.cityOptions.length > 0 ? this.cityOptions[0].value : null;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.add-activity-view {
  .el-upload {
    width: 100%;
  }
}
.content-items {
  .item {
    position: relative;
    display: inline-block;
    margin-right: 30px;
    text-align: center;
    height: 70px;
    width: 200px;
    z-index: 1;
    h2 {
      position: absolute;
      right: -25px;
    }
    h3 {
      font-size: 13px;
      margin: 0;
      padding: 10px;
      background-color: #3d8cbc;
      color: #fff;
      border-radius: 5px 5px 1px 1px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    p {
      font-size: 13px;
      line-height: 35px;
      background-color: #fff;
      color: #858585;
      border: #858585 solid 1px;
      border-radius: 0 0 5px 5px;
      z-index: -1;
      position: absolute;
      top: 28px;
      width: 100%;
    }
    span {
      position: absolute;
      right: 0;
      top: 0;
      background-color: #3d8cbc;
      line-height: 14px;
      border-radius: 6px;
      .el-icon-close {
        font-size: 16px;
        color: white;
        cursor: pointer;
      }
    }
  }
}
.margin-t-10 {
  margin-top: 10px;
}
.table{
  .edit{
    th, td{
      border-top: 2px solid #9fcfff;
      border-bottom: 2px solid #9fcfff;
    }
    th {
      border-left: 2px solid #9fcfff;
    }
    td:last-child{
      border-right: 2px solid #9fcfff;
    }
  }
  th{
    text-align: center;
    vertical-align: middle;
  }
  td {
    vertical-align: middle;
  }
}

.red-info{
  display: inline-block;
  padding: 14px 12px 14px 0;
  color: red;
}
</style>
