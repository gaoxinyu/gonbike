<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('pushMessage.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd"><i class="fa fa-plus"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('pushMessage.query.countryId')">
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
            <el-form-item :label="$t('pushMessage.query.notiType')">
              <el-select v-model="query.notiType">
                <el-option
                  v-for="item in notiTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('pushMessage.query.sendDate')">
              <el-date-picker
                v-model="sendDate"
                type="date"
                :placeholder="$t('common.chooseTime')"
                @change="handleSendDate"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('pushMessage.query.sendStatus')">
              <el-select v-model="query.sendStatus">
                <el-option
                  v-for="item in sendStatusOptions"
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
            <el-form-item :label="$t('pushMessage.query.userTag')">
              <el-input v-model="query.userTag"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('common.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedMessages" border style="width: 100%">
        <el-table-column prop="id" :label="$t('pushMessage.table.id')" width="60"></el-table-column>
        <el-table-column prop="notiTypeString" :label="$t('pushMessage.table.notiType')" width="120"></el-table-column>
        <el-table-column prop="sendDateString" :label="$t('pushMessage.table.sendDate')" width="140"></el-table-column>
        <el-table-column prop="countryName" :label="$t('pushMessage.table.countryName')" width="100"></el-table-column>
        <el-table-column prop="userTag" :label="$t('pushMessage.table.userTag')" >
          <template slot-scope="scope">
            <el-button @click="handleClickUserTag(scope.$index, scope.row)" type="text" size="small">{{scope.row.userTag}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="languages" :label="$t('pushMessage.table.languages')" >
          <template slot-scope="scope">
            <a v-for="(lang, index) in scope.row.messages" 
              :key="index"
              @click="scope.row.languageIndex = index" 
              style="padding-right: 10px; display: inline-block;" 
              :class="{'text-aqua': scope.row.languageIndex === index, 'text-muted': scope.row.languageIndex !== index}" 
              href="javascript:void(0);"
              >{{ $t('common.languages.' + lang.language ) }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="notiTitle" :label="$t('pushMessage.table.notiTitle')" min-width="140px">
          <template slot-scope="scope">
            <span 
              v-for="(lang, index) in scope.row.messages" 
              :key="index"
              v-show="scope.row.languageIndex === index"
              >{{ lang.notiTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="notiContent" :label="$t('pushMessage.table.notiContent')" min-width="200px">
          <template slot-scope="scope">
            <span 
              v-for="(lang, index) in scope.row.messages"
              :key="index" 
              v-show="scope.row.languageIndex === index"
              >{{ lang.notiContent }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="jumpToString" :label="$t('pushMessage.table.jumpTo')" >
          <template slot-scope="scope" v-if="scope.row.notiType == 1 || scope.row.notiType == 2 ">
            <span>
              {{ scope.row.jumpToString }}
            </span>
          </template>
          <template slot-scope="scope" v-if="scope.row.notiType == 3">
            <span 
            v-for="(lang, index) in scope.row.messages"
            :key="index" 
            v-show="scope.row.languageIndex === index"
            >{{ lang.popWebUrl ? lang.popWebUrl : lang.popViewControllerType ? $t('addPushMessage.js.' + lang.popViewControllerType) : '' }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="saveMesaageString" :label="$t('pushMessage.table.saveMesaage')" ></el-table-column>-->
        <el-table-column prop="sendStatusString" :label="$t('pushMessage.table.sendStatus')" ></el-table-column>
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="deleteMessage(scope.$index, scope.row)">{{ $t('pushMessage.table.deleteMessage') }}</el-button></div>
              <div v-if="scope.row.notiType == 3"><el-button type="text" size="small" @click="view(scope.$index, scope.row)">{{ $t('pushMessage.table.view') }}</el-button></div>
              
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

  <el-dialog :title="$t('pushMessage.dialog.title1')" :visible.sync="userPhoneVisible" >
    <div class="row">
      <div class="col-md-2" v-for="(phone, index) in userPhones" :key="index">{{ phone }}</div>
    </div>
  </el-dialog>

  <el-dialog :title="$t('pushMessage.dialog.title2')" width="30%" :visible.sync="viewMessageVisible">
    <iphone>
      <div class="mask iphone-notify center">
        <div>
          <div class="box box-solid">
            <div class="box-body">
              <img v-if="message.popImageUrl" :src="message.popImageUrl" alt="">
              <h5 v-if="message.popTitle" class="text-center">{{ message.popTitle || $t('message.dialog.mTitle') }}</h5>
              <p v-if="message.popContent">{{ message.popContent || $t('message.dialog.mContent') }}</p>
            </div>
          </div>
          <div class="close-model text-center"><i class="fa fa-close"></i></div>
        </div>
      </div>
    </iphone>
  </el-dialog>

</div>
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins/index.js'
import moment from "moment"
import Iphone from '../../components/Iphone'

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: false,
      sendDate: null,
      userPhoneVisible: false,
      viewMessageVisible: false,
      query: {
        pageNum: 1,
        countryId: null,
        notiType: null,
        sendDate: null,
        sendStatus: null,
        userTag: null,
      },
      message: {    // 预览的消息
        popImageUrl: null,
        popTitle: null,
        popContent: null,
      },  
      messages: [],
      userPhones: [],
      page: {
        count: 0
      },
      notiTypeOptions: [
        {label: this.$t('pushMessage.js.all'), value: null},
        {label: this.$t('pushMessage.js.notiType0'), value: 0},
        {label: this.$t('pushMessage.js.notiType1'), value: 1},
        {label: this.$t('pushMessage.js.notiType2'), value: 2},
        {label: this.$t('pushMessage.js.notiType3'), value: 3},
      ],
      sendStatusOptions: [
        {label: this.$t('pushMessage.js.all'), value: null},
        {label: this.$t('pushMessage.js.sendStatusn1'), value: -1},
        {label: this.$t('pushMessage.js.sendStatus0'), value: 0},
        {label: this.$t('pushMessage.js.sendStatus1'), value: 1},
      ],
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedMessages() {
      return this.messages.map((item) => {
        return {
          ...item,
          languageIndex: 0,
          notiTypeString: this.$t('pushMessage.js.notiType' + item.notiType),
          sendDateString: item.sendDate ? moment(item.sendDate).format('YYYY-MM-DD HH:mm:ss') : '',
          sendStatusString: item.sendStatus === -1 ? this.$t('pushMessage.js.sendStatusn1') : 
                            item.sendStatus === 0 ? this.$t('pushMessage.js.sendStatus0') : 
                            item.sendStatus === 1 ? this.$t('pushMessage.js.sendStatus1') : '',
          jumpToString: item.notiType == 1 ? item.jumpTo : item.notiType == 2 ? this.$t('addPushMessage.js.' + item.jumpTo) : '',
          // saveMesaageString: item.saveMesaage === 1 ? this.$t('addPushMessage.js.yes') : this.$t('addPushMessage.js.no'),
        }
      })
    },
  },
  methods: {
    goAdd() {
      this.$router.push({name: "addpushmessage"});
    },
    
    handleQuery() {
      this.query.pageNum = 1;
      api.getPushMessageList(this, this.query)
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getPushMessageList(this, this.query)
      }
    },
    
    handleSendDate(time) {
      this.query.sendDate = time ? time.getTime() : null;
    },
    deleteMessage(index, row) {
      this.$confirm(this.$t('pushMessage.js.deleteMessage', {lockNo: row.lockNo}), this.$t('pushMessage.js.tip'), {
        confirmButtonText: this.$t('pushMessage.js.ok'),
        cancelButtonText: this.$t('pushMessage.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deletePushMessage(this, {id: row.id}).then(() => {
          this.handleQuery();
        });
      }).catch(() => {
           
      });
    },
    view(index, row) {
      this.message = row.messages[row.languageIndex];
      this.viewMessageVisible = true;
    },
    handleClickUserTag(index, row) {
      this.userPhones = row.userPhone;
      this.userPhoneVisible = true;
    },
  },
  components: {
    Iphone
  }
  
}
</script>
