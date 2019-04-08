<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('smsTemplate.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('smsTemplate.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('smsTemplate.query.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('smsTemplate.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedSmsTemplateList" border style="width: 100%">
        <el-table-column prop="id" :label="$t('smsTemplate.table.id')" width="60"></el-table-column>
        <el-table-column prop="name" :label="$t('smsTemplate.table.name')" width="200"></el-table-column>
        <el-table-column prop="language" :label="$t('smsTemplate.table.language')" width="240">
          <template slot-scope="scope">
            <a v-for="(lang, index) in scope.row.list"
              :key="index"
              @click="scope.row.languageIndex = index" 
              style="padding-right: 10px; display: inline-block;" 
              :class="{'text-aqua': scope.row.languageIndex === index, 'text-muted': scope.row.languageIndex !== index}" 
              href="javascript:void(0);"
              >{{ lang.language }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="content" :label="$t('smsTemplate.table.content')">
          <template slot-scope="scope">
            <span 
              v-for="(lang, index) in scope.row.list" 
              :key="index"
              v-show="scope.row.languageIndex === index"
              >{{ lang.content }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('smsTemplate.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('smsTemplate.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="editTemplate(scope.$index, scope.row)">{{ $t('smsTemplate.table.edit') }}</el-button></div>
              <div><el-button type="text" size="small" @click="deleteTemplate(scope.$index, scope.row)">{{ $t('smsTemplate.table.delete') }}</el-button></div>
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

  <el-dialog :title="$t('smsTemplate.dialog.title' + (!isAdd ? '1' : ''))" :visible.sync="addTemplateVisible">
    <el-form label-position="left" label-width="100px">
      <el-form-item :label="$t('smsTemplate.dialog.name')">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th style="width: 120px;">{{ $t('smsTemplate.dialog.language') }}</th>
            <th>{{ $t('smsTemplate.dialog.content') }}</th>
            <th style="width: 100px;">{{ $t('smsTemplate.dialog.operate') }}</th>
          </tr>
          <tr v-for="(template, index) in form.list" :key="index">
            <td style="width: 120px;">
              <el-select v-model="template.languageId" :disabled="template.isSave">
                <el-option
                  v-for="item in languageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td>
              <el-input type="textarea" v-show="!template.isSave" :autosize="{ minRows: 3, maxRows: 5}" max-length="140" v-model="template.content"></el-input>
              <span v-show="template.isSave">{{ template.content }}</span>
            </td>
            <td style="width: 100px;">
              <el-button type="text" size="small" @click="template.isSave = !template.isSave">{{ $t('smsTemplate.dialog.' + (template.isSave ? 'edit' : 'finish')) }}</el-button>
              <el-button type="text" size="small" @click="deleteLanguage(template, index)">{{ $t('smsTemplate.dialog.delete') }}</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <el-button type="primary" @click="addLanguage">{{ $t('smsTemplate.dialog.add') }}</el-button>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveTemplate">{{ $t('smsTemplate.dialog.ok') }}</el-button>
      <el-button @click="addTemplateVisible = false">{{ $t('smsTemplate.dialog.cancel') }}</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.query],
  mounted() {
    this.handleQuery();
    api.getSmsLanguageList(this, {});
  },
  data () {
    return {
      loading: true,
      smsTemplateList: [],
      smsLanguages: [],
      addTemplateVisible: false,
      isAdd: true,    // true: add  false: edit
      query: {
        pageNum: 1,
        name: null,
      },
      form: {
        name: '',
        list: [],
      },
      page: {
        count: 0
      },
    }
  },
  computed: {
    computedSmsTemplateList() {
      return this.smsTemplateList.map((item) => {
        return {
          ...item,
          languageIndex: 0,
        }
      })
    },
    languageOptions() {
      return this.smsLanguages.map(item => {
        return {
          label: item.name,
          value: item.id,
        }
      })
    }
  },
  methods: {
    goAdd() {
      this.form.name = '';
      this.form.list = [];
      this.isAdd = true;
      this.addTemplateVisible = true;
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getSmsTemplateList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getSmsTemplateList(this, this.query);
    },
    addLanguage() {
      const lang = this.smsLanguages[0];
      this.$set(this.form.list, this.form.list.length, {languageId: lang.id, language: lang.language, content: '', isSave: false})
    },
    deleteLanguage(template, index) {
      this.form.list.splice(index, 1);
    },
    editTemplate(index, row) {
      this.form = row;
      this.isAdd = false;
      this.addTemplateVisible = true;
    },
    deleteTemplate(index, row) {
      this.$confirm(this.$t('smsTemplate.js.deleteMessage', {name: row.name}), this.$t('smsTemplate.js.tip'), {
        confirmButtonText: this.$t('smsTemplate.js.ok'),
        cancelButtonText: this.$t('smsTemplate.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deleteSmsTemplate(this, {id: row.id}).then(() => {
          this.handleQuery();
        });
      }).catch(() => {
           
      });
    },
    saveTemplate() {
      const apiName = this.isAdd ? 'saveSmsTemplate' : 'updateSmsTemplate';
      api[apiName](this, this.form).then(() => {
        this.addTemplateVisible = false;
        this.handleQuery();
      });
    }
    
  }
}
</script>