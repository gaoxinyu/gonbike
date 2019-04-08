<template>
<div class="evs-payway-view">
  <div class="row">
    <div class="col-md-4">
      <div class="box box-info">
        <div class="box-header with-border">
          {{ $t('evsPayway.form.title') }}
        </div>
        <div class="box-body">
          <el-form label-position="left" label-width="50px">
            <el-form-item 
              label="" 
              class="required" 
              v-for="pay in evsPayMethods" 
              :key="pay.id" >
              <el-checkbox 
                v-model="pay.validFlag" 
                :label="pay.paymentName" 
                >{{ pay.paymentName }}</el-checkbox>
            </el-form-item>
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <el-form-item>
                  <el-button type="primary" @click="submit" :disabled="payMethodDisabled">{{ $t('evsPayway.form.save') }}</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="box box-info">
        <div class="box-header with-border">
          {{ $t('evsPayway.form.title1') }}
        </div>
        <div class="box-body">
          <el-form label-position="left" label-width="120px">
            <el-form-item :label="$t('evsPayway.form.paramCodeLabel'+param.paramCode)" class="required" v-for="(param, index) in params" :key="index">
              <el-input v-model.number="param.paramValue" type="number" min="0" max="100">
                <template slot="append">{{ $t('evsPayway.form.paramCode'+param.paramCode) }}</template>
              </el-input>
            </el-form-item>
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <el-form-item>
                  <el-button type="primary" :disabled="paramsDisabled" @click="save">{{ $t('evsPayway.form.save') }}</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '../../api'

export default {
  mounted() {
    this.getEvsPayMethodList();
    this.getEvsParamList();
  },
  data() {
    return {
      evsPayMethods: [],
      params: [],
    }
  },
  computed: {
    paramsDisabled() {
      for(let i = 0; i < this.params.length; i++) {
        const v = +this.params[i].paramValue
        if(!v) {
          return true
        }
        if(this.params[i].paramCode === 1 && (v < 0 || v > 100)) {
          return true
        }
        if(this.params[i].paramCode === 2 && parseInt(v) !== v) {
          return true
        }
      }
      return false
    },
    payMethodDisabled() {
      if(this.evsPayMethods.length === 0) {
        return true;
      }
      if(this.evsPayMethods.filter(m => m.validFlag).length === 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    getEvsPayMethodList() {
      api.getEvsPayMethodList(this)
    },
    getEvsParamList() {
      api.getEvsParamList(this)
    },
    submit() {
      api.updateEvsPayMethod(this, {'evPayMethodList': this.evsPayMethods})
    },
    save() {
      api.updateEvsParam(this, {'evParamList': this.params})
    }
  }
}

</script>