<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ `${$t('addFence.form.title')} - ${fence.countryName} - ${fence.cityName} - ${fence.typeString}` }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="100px">
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addFence.form.name')" class="required">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item :label="$t('addFence.form.useable')">
              <el-select v-model="form.useable">
                <el-option
                  v-for="item in useableOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('addFence.form.points')" class="required" v-if="fence.type === 3">
              <div class="col-md-6" style="padding:0">
                <el-input v-model.number="form.points[0].latitude" type="number">
                  <template slot="prepend">{{ $t('addFence.form.latitude') }}</template>
                </el-input>
              </div>
              <div class="col-md-6" style="padding:0">
                <el-input v-model.number="form.points[0].longitude" type="number">
                  <template slot="prepend">{{ $t('addFence.form.longitude') }}</template>
                </el-input>
              </div>
            </el-form-item>

            <el-form-item :label="$t('fenceInfo.query.hasPile')" v-if="fence.type === 3">
              <el-select v-model="form.hasPile">
                <el-option
                  v-for="item in hasPileOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('fenceInfo.query.pileNo')" v-if="fence.type === 3 && form.hasPile" class="required">
              <el-input v-model="form.pileNo"></el-input>
            </el-form-item>

            <el-form-item :label="$t('fenceInfo.table.subType')" v-if="fence.type === 3" class="required">
              <el-select v-model="form.subType">
                <el-option
                  v-for="item in subTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

        </div>
        <div class="row" v-if="fence.type !== 3">
          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addFence.form.points')" class="required">
              <p><span class="text-yellow">{{ $t('addFence.form.tips') }}</span></p>
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th>{{ $t('addFence.form.latitude') }}</th>
                    <th>{{ $t('addFence.form.longitude') }}</th>
                    <th width="150px"></th>
                  </tr>
                  <tr v-for="(point, index) in form.points" :key="index">
                    <td>
                      <el-input v-model.number="point.latitude" type="number" :placeholder="$t('addFence.form.latitude')"></el-input>
                    </td>
                    <td>
                      <el-input v-model.number="point.longitude" type="number" :placeholder="$t('addFence.form.longitude')"></el-input>
                    </td>
                    <td>
                      <el-button type="danger" icon="el-icon-minus" 
                        @click="deletePointLine(point, index)"  
                        :disabled="form.points.length === 1"
                      ></el-button>
                      <el-button type="primary" icon="el-icon-plus" 
                        @click="addPointLine" 
                        v-if="index === form.points.length - 1"
                      ></el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" >{{ $t('addFence.form.submit') }}</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api"

export default {
  mounted() {
    const fence = sessionStorage.fence;
    const fenceInfo = sessionStorage.fenceInfo;
    if(this.$route.name === 'editfence' && fenceInfo) {
      this.fence = JSON.parse(fenceInfo);
      this.form = this.fence;
    } else {
      this.fence = JSON.parse(fence);
      this.form.countryId = this.fence.countryId;
      this.form.cityId = this.fence.cityId;
      this.form.type = this.fence.type;
      this.form.typeName = this.fence.typeString;
      this.form.style = this.fence.style;
    }
    
  },
  data() {
    return {
      loading: false,
      fence: {},
      form: {
        countryId: null,
        cityId: null,
        type: null,
        type: null,
        style: null,
        name: null,
        useable: true,
        points: [
          {longitude: null, latitude: null},
        ],
        hasPile: false,
        pileNo: null,
        subType: null,
      },
      useableOptions: [
        {label: this.$t('fence.js.useable1'), value: true},
        {label: this.$t('fence.js.useable0'), value: false},
      ],
      hasPileOptions: [
        {label: this.$t('fenceInfo.js.has'), value: true},
        {label: this.$t('fenceInfo.js.nothas'), value: false},
      ],
      subTypeOptions: [
        {label: this.$t('fenceInfo.js.subType1'), value: 1},
        {label: this.$t('fenceInfo.js.subType2'), value: 2},
      ],
    }
  },
  computed: {
    submitDisabled() {
      return !(this.form.name && 
        (!this.form.hasPile || (this.form.pileNo && this.form.subType)) &&
        (this.form.type === 3 || this.form.points.length >= 3) &&
        this.form.points.filter(point => !point.longitude || !point.latitude).length === 0);
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: "fenceinfo"});
    },
    submit() {
      if(this.$route.name === 'editfence') {
        api.updateFenceInfo(this, this.form).then(() => this.goBack());
      } else {
        api.saveFenceInfo(this, this.form).then(() => this.goBack());
      }
    },
    deletePointLine(point, index) {
      this.form.points.splice(index, 1);
    },
    addPointLine() {
      this.form.points.push({longitude: null, latitude: null});
    }
  },
}
</script>
