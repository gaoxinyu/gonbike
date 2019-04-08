<template>
<div class="reportInfo-view">
  <h4>{{ $t('studentInfo.box.title') }}</h4>

  <div class="row">
    <div class="col-md-12">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">{{ $t('studentInfo.box.title1') }}</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-default btn-sm" @click="handleRotate(-90)"><i class="fa fa-undo"></i></button>
            <button type="button" class="btn btn-default btn-sm" @click="handleRotate(90)"><i class="fa fa-repeat"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <div class="row">
            <div class="col-md-6">
              <table class="table table-bordered">
                <tbody>
                  <tr><td width="140px">{{ $t('studentInfo.table1.phone') }}</td><td>{{student.phoneString || "--"}}</td></tr>
                  <tr><td width="140px">{{ $t('studentInfo.table1.name') }}</td><td>{{student.name || "--"}}</td></tr>
                  <tr><td width="140px">{{ $t('studentInfo.table1.school') }}</td><td>{{student.school || "--"}}</td></tr>
                  <tr><td width="140px">{{ $t('studentInfo.table1.studentNumber') }}</td><td>{{student.studentNumber || "--"}}</td></tr>
                  <tr><td width="140px">{{ $t('studentInfo.table1.period') }}</td><td>{{student.periodString || "--"}}</td></tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-6">
              <rotate :angle="angle">
                <a href="javascript:void(0)" @click="handlePic">
                  <img :src="student.img" alt="" style="max-width: 100%;">
                </a>
              </rotate>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">{{ $t('studentInfo.box.title2') }}</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body no-padding">
          <table class="table">
            <tbody>
              <tr>
                <td width="140px">{{ $t('studentInfo.table2.status') }}</td>
                <td>{{student.statusString}} &nbsp;&nbsp; <a href="javascript:void(0)" v-if="student.status != 0" class="text-yellow" @click="disabled = !disabled">{{ disabled ? $t('studentInfo.table2.do') : $t('studentInfo.table2.undo')}}</a></td>
              </tr>
              <tr v-show="!disabled"><td width="140px">{{ $t('studentInfo.table2.period') }}</td><td>
                <div class="row">
                  <div class="col-md-2">
                    <el-date-picker
                      v-model="query.beginTime"
                      type="date"
                      :placeholder="$t('studentInfo.table2.beginTime')"
                      value-format="yyyy-MM-dd"
                      :disabled="disabled"
                      style="width: 100%">
                    </el-date-picker>
                  </div>
                  <div class="col-md-2">
                    <el-date-picker
                      v-model="query.endTime"
                      type="date"
                      :placeholder="$t('studentInfo.table2.endTime')"
                      value-format="yyyy-MM-dd"
                      :disabled="disabled"
                      style="width: 100%">
                    </el-date-picker>
                  </div>
                </div>
              </td></tr>
              <tr v-show="!disabled"><td width="140px">{{ $t('studentInfo.table2.reason') }}</td><td>
                <div class="row">
                  <div class="col-md-2">
                    <el-select v-model="lang" @change="handleRemark">
                      <el-option
                        v-for="item in langOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="col-md-2">
                    <el-select v-model="remark" @change="handleRemark">
                      <el-option
                        v-for="item in remarkOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <el-input v-model="query.remark" type="textarea" :disabled="disabled" :autosize="{ minRows: 3, maxRows: 5 }" :placeholder="$t('studentInfo.table2.reasonPlaceHolder')"></el-input>
                  </div>
                </div>
                
              </td></tr>
              <tr v-show="!disabled"><td width="140px">{{ $t('studentInfo.table2.sendNoti') }}</td><td>
                <div class="row">
                  <div class="col-md-6">
                    <el-radio-group v-model="query.sendNoti">
                      <el-radio :label="1">{{ $t('studentInfo.table2.yes') }}</el-radio>
                      <el-radio :label="0">{{ $t('studentInfo.table2.no') }}</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </td></tr>
              <tr v-show="!disabled"><td width="140px">{{ $t('studentInfo.table2.operate') }}</td><td>
                <el-button type="primary" @click="handleApply(1)" :disabled="disabled">{{ $t('studentInfo.table2.apply') }}</el-button>
                <el-button type="primary" @click="handleApply(2)" :disabled="disabled">{{ $t('studentInfo.table2.upapply') }}</el-button>
              </td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <div class="box box-info">
        <div class="box-header">
          <h3 class="box-title">{{ $t('studentInfo.box.title3') }}</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedApplyLogs" border style="width: 100%">
            <el-table-column prop="createdAtString" :label="$t('studentInfo.table3.createdAt')" width="140"></el-table-column>
            <el-table-column prop="name" :label="$t('studentInfo.table3.name')" width="120"></el-table-column>
            <el-table-column prop="remark" :label="$t('studentInfo.table3.remark')"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>

  <el-dialog :title="$t('studentInfo.table1.img')" :visible.sync="bigPicVisible">
    <div class="box box-solid">
      <div class="box-body no-padding">
        <rotate :angle="angle">
          <img :src="student.img" alt="" style="width:100%;">
        </rotate>
      </div>
      <div class="box-footer">
        <button type="button" class="btn btn-default btn-sm pull-right" @click="handleRotate(90)"><i class="fa fa-repeat"></i></button>
        <button type="button" class="btn btn-default btn-sm pull-right" @click="handleRotate(-90)"><i class="fa fa-undo"></i></button>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
import Rotate from '../../components/Rotate'

export default {
  mounted() {
    this.disabled = this.student.status !== 0;
    api.getStudentApplyLogList(this, {'applyId': this.$route.params.id});
    this.handleRemark();
  },
  data() {
    return {
      loading: false,
      disabled: true,
      bigPicVisible: false,
      applyLogs: [],
      angle: 0,
      student: JSON.parse(sessionStorage.getItem('student')) || {},
      lang: 'en',
      remark: 0,
      query: {
        ids: this.$route.params.id,
        status: null,
        remark: null,
        beginTime: moment(new Date()).format("YYYY-MM-DD"),
        endTime: moment(new Date()).add(1, 'year').format("YYYY-MM-DD"),
        sendNoti: 1,
      },
      reasons: [
        {zh: '照片不清晰', tw: '照片不清晰', en: 'The picture is not clear'}, 
        {zh: '信息不符合', tw: '信息不符合', en: 'The info does not match with your ID card'}, 
        {zh: '学生证过期', tw: '學生證過期', en: 'Expired student card'},
        {zh: '无效的学生证', tw: '無效的學生證', en: 'Invalid student card'},
        {zh: '信息不完整', tw: '信息不完整', en: 'The info is incomplete'},
        {zh: '不是学生证', tw: '不是學生證', en: 'Please upload your student card'},
        {zh: '其他', tw: '其他', en: 'other'},
      ],
      langOptions: [
        {label: this.$t('studentInfo.js.en'), value: 'en'},
        {label: this.$t('studentInfo.js.zh'), value: 'zh'},
        {label: this.$t('studentInfo.js.tw'), value: 'tw'},
      ],
      remarkOptions: [
        {label: this.$t('studentInfo.js.notClear'), value: 0}, 
        {label: this.$t('studentInfo.js.notMatch'), value: 1}, 
        {label: this.$t('studentInfo.js.expired'), value: 2},
        {label: this.$t('studentInfo.js.invalid'), value: 3},
        {label: this.$t('studentInfo.js.incomplete'), value: 4},
        {label: this.$t('studentInfo.js.notCard'), value: 5},
        {label: this.$t('studentInfo.js.other'), value: 6},
      ],
    }
  },
  computed: {
    computedApplyLogs() {
      return this.applyLogs.map((item) => {
        return {
          ...item,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      });
    }
  },
  beforeDestroy() {
    
  }, 
  methods: {
    handleApply(status) {
      this.query.status = status;
      api.updateStudentApply(this, this.query);
    },
    handleRotate(angle) {
      this.angle += angle;
    },
    handlePic() {
      this.bigPicVisible = true;
    },
    handleRemark() {
      this.query.remark = this.reasons[this.remark][this.lang];
    }
  },
  components: {
    Rotate,
  },
}

</script>