<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('student.box.title') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('student.query.beginTime')">
              <el-date-picker
                v-model="query.startTime"
                type="date"
                :placeholder="$t('student.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('student.query.endTime')">
              <el-date-picker
                v-model="query.endTime"
                type="date"
                :placeholder="$t('student.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('student.query.countryId')">
              <el-select v-model="query.countryId">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('student.query.status')">
              <el-select v-model="query.status">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('student.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('student.query.studentNumber')">
              <el-input v-model="query.studentNumber"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            
          </div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('student.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-header with-border">
      <el-button type="primary" @click="showMultiApply" :disabled="multipleSelection.length === 0">{{ $t('student.box.title1') }}</el-button>
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedStudentApplys" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" :label="$t('student.table.id')" width="60"></el-table-column>
        <el-table-column prop="phoneString" :label="$t('student.table.phone')" width="140"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('student.table.createdAt')" width="140px"></el-table-column>
        <el-table-column prop="name" :label="$t('student.table.name')"></el-table-column>
        <el-table-column prop="school" :label="$t('student.table.school')"></el-table-column>
        <el-table-column prop="studentNumber" :label="$t('student.table.studentNumber')"></el-table-column>
        <el-table-column prop="img" :label="$t('student.table.img')">
          <template slot-scope="scope">
            <a href="javascript:void(0)" @click="handlePic(scope.row)">
              <img :src="scope.row.img" alt="" style="width:100px;">
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="periodString" :label="$t('student.table.period')" width="140px"></el-table-column>
        <el-table-column prop="statusString" :label="$t('student.table.status')" width="80"></el-table-column>
        <el-table-column prop="remark" :label="$t('student.table.remark')"></el-table-column>
        <el-table-column fixed="right" :label="$t('common.operate')" width="60">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('student.table.detail') }}</el-button></div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="row text-center">
        <div class="col-md-12">
          <el-pagination 
            layout="total, prev, pager, next" 
            :total="page.count"
            :page-size="page.per"
            :current-page="page.current"
            @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
      </div>
      
    </div>
  </div>

  <el-dialog :title="$t('student.table.img')" :visible.sync="bigPicVisible">
    <div class="box box-solid">
      <div class="box-body no-padding">
        <div class="row">
          <div class="col-md-8">
            <rotate :angle="angle" style="width:100%;">
              <img :src="selectStudent.img" alt="" style="width:100%;">
            </rotate>
          </div>
          <div class="col-md-4">
            <table class="table table-bordered">
              <tbody>
                <tr><td>{{ $t('student.table.name') }}</td><td>{{selectStudent.name}}</td></tr>
                <tr><td>{{ $t('student.table.school') }}</td><td>{{selectStudent.school}}</td></tr>
                <tr><td>{{ $t('student.table.studentNumber') }}</td><td>{{selectStudent.studentNumber}}</td></tr>
                <tr><td>{{ $t('student.table.phone') }}</td><td>{{selectStudent.phoneString}}</td></tr>
                <tr><td>{{ $t('student.table.createdAt') }}</td><td>{{selectStudent.createdAtString}}</td></tr>
                <tr><td>{{ $t('student.table.period') }}</td><td>{{selectStudent.periodString}}</td></tr>
                <tr><td>{{ $t('student.table.status') }}</td><td>{{selectStudent.statusString}}</td></tr>
                <tr><td>{{ $t('student.table.remark') }}</td><td>{{selectStudent.remark}}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="box-footer">
        <span>{{ $t('student.dialog.sendNoti') }}</span>
        <el-radio-group v-model="sendNoti">
          <el-radio :label="1">{{ $t('student.dialog.yes') }}</el-radio>
          <el-radio :label="0">{{ $t('student.dialog.no') }}</el-radio>
        </el-radio-group>
        
        <button type="button" class="btn btn-primary btn-sm pull-right pl-10" @click="handleApply('', selectStudent)">{{ $t('student.table.apply') }}</button>
        <button type="button" class="btn btn-default btn-sm pull-right" @click="handleRotate(90)"><i class="fa fa-repeat"></i></button>
        <button type="button" class="btn btn-default btn-sm pull-right" @click="handleRotate(-90)"><i class="fa fa-undo"></i></button>
      </div>
    </div>
  </el-dialog>

  <el-dialog :title="$t('student.dialog.title')" :visible.sync="multiApplyVisible" width="30%">
    <el-form label-position="left" label-width="100px">
  
      <el-form-item :label="$t('student.dialog.sendNoti')">
        <el-radio-group v-model="sendNoti">
          <el-radio :label="1">{{ $t('student.dialog.yes') }}</el-radio>
          <el-radio :label="0">{{ $t('student.dialog.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>
        
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="multiApplyVisible = false">{{ $t('student.dialog.cancel') }}</el-button>
      <el-button type="primary" @click="handleMultiApply">{{ $t('student.dialog.ok') }}</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'
import Rotate from '../../components/Rotate'

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: false,
      bigPicVisible: false,
      multiApplyVisible: false,
      sendNoti: 1,   // 审批通过后是否发送消息给用户
      selectStudent: {},
      angle: 0,
      page: {
        count: 0
      },
      multipleSelection: [],
      studentApplys: [],
      query: {
        pageNum: 1,
        status: 0,
        countryId: null,
        startTime: null,
        endTime: null,
        phone: null,
        studentNumber: null,
      },
      statusOptions: [
        {label: this.$t('student.js.all'), value: null},
        {label: this.$t('student.js.status0'), value: 0},
        {label: this.$t('student.js.status1'), value: 1},
        {label: this.$t('student.js.status2'), value: 2},
      ],
      areaOptions: this.getAreaOptions(),
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedStudentApplys() {
      return this.studentApplys.map((item) => {
        return {
          ...item,
          periodString: item.beginTime ? moment(item.beginTime).format("YYYY-MM-DD") + ' ~ ' + moment(item.endTime).format("YYYY-MM-DD") : '',
          statusString: item.status === 0 ? this.$t('student.js.status0') : item.status === 1 ? this.$t('student.js.status1') : item.status === 2 ? this.$t('student.js.status2') : '',
          phoneString: item.countryCode ? '+' + item.countryCode + ' ' + item.phone : item.phone,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      });
    }
  },
  methods: {
    handleQuery() {
      this.query.pageNum = 1;
      api.getStudentApplyList(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getStudentApplyList(this, this.query);
      }
    },
    detail(index, row) {
      sessionStorage.student = JSON.stringify(row);
      window.open(location.href + "/" + row.id);
    },
    handleApply(index, row) {
      const params = {
        ids: row.id,
        status: 1,
        beginTime: moment(new Date()).format("YYYY-MM-DD"),
        endTime: moment(new Date()).add(1, 'year').format("YYYY-MM-DD"),
        sendNoti: this.sendNoti,
      }
      this.$confirm(this.$t('student.js.confirm', { phone: row.phoneString }), this.$t('student.js.tip'), {
        confirmButtonText: this.$t('student.js.ok'),
        cancelButtonText: this.$t('student.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.updateStudentApply(this, params).then(() => {
          this.bigPicVisible = false;
          this.handleQuery();
        });
      }).catch(() => {
           
      });
    },
    handlePic(row) {
      this.selectStudent = row;
      this.angle = 0;
      this.bigPicVisible = true;
    },
    handleRotate(angle) {
      this.angle += angle;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showMultiApply() {
      this.multiApplyVisible = true;
    },
    handleMultiApply() {
      let beginTime = moment(new Date()).format("YYYY-MM-DD");
      let endTime = moment(new Date()).add(1, 'year').format("YYYY-MM-DD");

      let ids = [];
      this.multipleSelection.forEach(row => { ids[ids.length] = row.id });
      let params = { ids: ids.join(','), status: 1, beginTime: beginTime, endTime: endTime, sendNoti: this.sendNoti };
      api.updateStudentApply(this, params).then(() => {
        this.multiApplyVisible = false;
        this.handleQuery();
      });
    }
  },
  components: {
    Rotate,
  },
}
</script>
