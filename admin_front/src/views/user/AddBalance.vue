<template>
<div class="addBalance-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addBalance.form.title') }}
    </div>

    <div class="box-body">
      <el-form label-position="left" label-width="120px">
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addBalance.form.countryId')">
              <el-select v-model="query.countryId" @change="getCountryInfo">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addBalance.form.phone')" class="required">
              <el-input v-show="query.subject === 4" v-model="query.phone" type="textarea" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
              <el-input v-show="query.subject !== 4" v-model="query.phone"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12 plus-select">
            <el-form-item :label="$t('addBalance.form.amount')" class="required">
              <el-input v-model="amount" type="number" min="0" :placeholder="$t('addBalance.form.moreThenZero')">
                <el-select v-model="plus" slot="prepend" @change="handlePlusChange">
                  <el-option :label="$t('addBalance.form.plus1')" value="1"></el-option>
                  <el-option :label="$t('addBalance.form.plus2')" value="2"></el-option>
                </el-select>

                <template slot="append">{{ country.open ? country.currency : 'USD' }}</template>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addBalance.form.subject')">
              <el-select v-model="query.subject">
                <el-option
                  v-for="item in subjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addBalance.form.orderNo')">
              <el-input v-model="query.orderNo"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addBalance.form.remark')">
              <el-input v-model="query.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addBalance.form.sendNoti')">
              <el-radio-group v-model="query.sendNoti">
                <el-radio :label="1">{{ $t('addBalance.form.yes') }}</el-radio>
                <el-radio :label="0">{{ $t('addBalance.form.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addBalance.form.submit') }}</el-button>
          <el-button @click="clear" :loading="loading">{{ $t('addBalance.form.clear') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api"
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country],
  mounted() {
    this.getCountryInfo();
  },
  data() {
    return {
      loading: false,
      plus: "1",
      country: {},
      amount: null,
      query: {
        countryId: +this.$route.query.countryId || 153,
        phone: this.$route.query.phone,
        amount: null,
        subject: 4,
        remark: null,
        sendNoti: 1,
        orderNo: null,
      },
      areaOptions: this.getAreaOnlyOptions(),
      plusOptions: [
        {label: this.$t('addBalance.js.plus1'), value: 1},
        {label: this.$t('addBalance.js.plus2'), value: 2},
      ],
      subjectOptions: [
        {label: this.$t('addBalance.js.subject4'), value: 4},
        // {label: this.$t('addBalance.js.subject8'), value: 8},
        {label: this.$t('addBalance.js.subject9'), value: 9, disabled: true},
        {label: this.$t('addBalance.js.subject11'), value: 11, disabled: true},
        {label: this.$t('addBalance.js.subject12'), value: 12},
      ],
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.phone && this.amount > 0);
    }
  },
  methods: {
    submit() {
      if(this.plus == 1) {
        this.query.amount = this.amount;
      } else if(this.plus == 2) {
        this.query.amount = -this.amount;
      }
      if(this.query.subject === 4) {    // 运营赠送
        this.query.phone = this.query.phone.trim().replace(/(\r\n|\n|\r)/g, ',');
      }
      
      api.updateBalance(this, this.query).then((data) => {
        if(!data.err) {
          this.$confirm(this.$t('addBalance.js.message'), this.$t('addBalance.js.tip'), {
            confirmButtonText: this.$t('addBalance.js.ok'),
            cancelButtonText: this.$t('addBalance.js.cancel'),
            type: 'success'
          }).then(() => {
            this.$router.push({name: "addsms", query: {phone: query.phone, countryId: query.countryId}});
          }).catch(() => {
            this.clear();
          });
        }
      });
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.query.countryId});
    },
    clear() {
      this.amount = null;
      this.query.phone = null;
      this.query.amount = null;
      this.query.remark = null;
      this.query.orderNo = null;
    },
    handlePlusChange(item) {
      this.subjectOptions.forEach((subject) => {
        subject.disabled = (subject.value === 12 ? false : !subject.disabled);
      });
      this.query.subject = item == "2" ? 9 : 4;
    }
  },
}
</script>
<style lang="scss">
.addBalance-view {
  .plus-select .el-select {
    width: 70px;
  }
}
</style>
