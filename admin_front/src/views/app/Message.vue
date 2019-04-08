<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('message.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAddMessage"><i class="fa fa-plus"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('message.query.createdTime')">
              <el-date-picker
                v-model="createdTime"
                type="daterange"
                @change="handleCreatedTime"
                value-format="yyyy-MM-dd"
                :placeholder="$t('message.query.createdTimePlaceholder')"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('message.query.beginDay')">
              <el-date-picker
                v-model="query.beginDay"
                type="date"
                :placeholder="$t('message.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('message.query.countryId')">
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
            <el-form-item :label="$t('message.query.type')">
              <el-select v-model="query.type">
                <el-option
                  v-for="item in msgOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('message.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedMessages" border style="width: 100%">
        <el-table-column prop="id" :label="$t('message.table.id')" width="70"></el-table-column>
        <el-table-column prop="typeString" :label="$t('message.table.type')" width="80"></el-table-column>
        <el-table-column prop="title" :label="$t('message.table.title')" width="180"></el-table-column>
        <el-table-column prop="img" :label="$t('message.table.img')" width="140">
          <template slot-scope="scope">
            <a href="javascript:void(0)" @click="handlePic(scope.row.img)">
              <img :src="scope.row.img" alt="" style="width:120px;">
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="content" :label="$t('message.table.content')" width="180"></el-table-column>
        <el-table-column prop="statusString" :label="$t('message.table.status')" width="80"></el-table-column>
        <el-table-column prop="coverageAreaString" :label="$t('message.table.coverageArea')"></el-table-column>
        <el-table-column prop="beginTimeString" :label="$t('message.table.beginTime')" width="130"></el-table-column>
        <el-table-column prop="endTimeString" :label="$t('message.table.endTime')" width="130"></el-table-column>
        <el-table-column prop="updatedAtString" :label="$t('message.table.updatedAt')" width="130"></el-table-column>
        <el-table-column prop="repetitionString" :label="$t('message.table.repetition')"></el-table-column>
        <el-table-column fixed="right" :label="$t('message.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('message.table.operate') }}</el-button>
              <el-button type="text" size="small" @click="viewMessage(scope.$index, scope.row)">{{ $t('message.table.view') }}</el-button>
              </br>
              <el-button type="text" size="small" @click="editMessage(scope.$index, scope.row)">{{ $t('message.table.edit') }}</el-button>
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

  <el-dialog :title="$t('message.dialog.title1')" width="30%" :visible.sync="dialogVisible">
    <iphone>
      <div class="mask iphone-notify center">
        <div>
          <div class="box box-solid">
            <div class="box-body">
              <img v-show="message.img" :src="message.img" alt="">
              <h5 class="text-center">{{ message.title || $t('message.dialog.mTitle') }}</h5>
              <p>{{ message.content || $t('message.dialog.mContent') }}</p>
            </div>
          </div>
          <div class="close-model text-center"><i class="fa fa-close"></i></div>
        </div>
      </div>
    </iphone>
  </el-dialog>

  <el-dialog :title="$t('message.dialog.title2')" :visible.sync="bigPicVisible">
    <div class="box box-solid">
      <div class="box-body no-padding">
        <img :src="showPic" alt="" style="width:100%;">
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'
import moment from "moment"
import Iphone from '../../components/Iphone'

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    api.getMessageList(this, this.query)
  },
  data () {
    return {
      messages: [],
      loading: true,
      bigPicVisible: false,
      showPic: '',
      createdTime: null,
      query: {
        createdStart: null,//moment(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)).format("YYYY-MM-DD"),
        createdEnd: null,//moment(new Date()).format("YYYY-MM-DD"),
        beginDay: null,//moment(new Date()).format("YYYY-MM-DD"),
        page: 1,
        type: null,
        // targetUser: null,
        countryId: null
      },
      page: {
        count: 0
      },
      dialogVisible: false,
      message: {
        img: '',
        title: '',
        content: ''
      },
      msgOptions: [
        {label: this.$t('message.js.all'), value: null},
        {label: this.$t('message.js.msg1'), value: 1},
        {label: this.$t('message.js.msg2'), value: 2},
        {label: this.$t('message.js.msg3'), value: 3}
      ],
      areaOptions: this.getAreaOptions(),
      // pickerOptions: Options.pickerOptions,
    }
  },
  // watch: {
  //   createdTime(newValue) {
  //     if(newValue) {
  //       this.query.createdStart = moment(newValue[0]).format("YYYY-MM-DD");
  //       this.query.createdEnd = moment(newValue[1]).format("YYYY-MM-DD");
  //     }
  //   }
  // },
  computed: {
    computedMessages() {
      return this.messages.map((item) => {
        return {
            ...item,
            typeString: item.type === 1 ? this.$t('message.js.msg1') : item.type === 2 ? this.$t('message.js.msg2') : item.type === 3 ? this.$t('message.js.msg3') : "",
            statusString: item.status ? this.$t('message.js.status1') : this.$t('message.js.status0'),
            repetitionString: !!item.repetition ? this.$t('message.js.repetition1') : this.$t('message.js.repetition0'),
            targetUserString: item.targetUser === 0 ? this.$t('message.js.all') : "",
            coverageAreaString: item.coverageArea === 0 ? this.$t('message.js.all') : this.getAreaName(item.coverageArea),
            beginTimeString: item.beginTime ? moment(item.beginTime).format("YYYY-MM-DD HH:mm:ss") : "",
            endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
            updatedAtString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : "",
          }
      })
    }
  },
  methods: {
    goAddMessage() {
      this.$router.push({name: "addmessage"});
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.page = val;
        api.getMessageList(this, this.query)
      }
    },
    handleQuery() {
      this.query.page = 1;
      api.getMessageList(this, this.query)
    },
    viewMessage(index, row) {
      this.dialogVisible = true;
      this.message = row;
    },
    editMessage(index, row) {
      sessionStorage.message = JSON.stringify(this.messages[index]);
      this.$router.push({name: "editmessage"});
    },
    handlePic(url) {
      this.showPic = url;
      this.bigPicVisible = true;
    },
    handleCreatedTime(datas) {
      if(datas) {
        this.query.createdStart = datas[0];
        this.query.createdEnd = datas[1];
      } else {
        this.query.createdStart = '';
        this.query.createdEnd = '';
      }
    },
  },
  components: {
    Iphone
  }
}
</script>

<style lang="scss">
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(8,11,12, .6);
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.iphone-notify {
  padding: 20px 5px;


  img {
    width: 100%;
  }
  p {
    word-wrap: break-word;
    word-break: break-all;
  }
  .close-model {
    font-size: 24px;
    line-height: 24px;
  }
}
</style>
