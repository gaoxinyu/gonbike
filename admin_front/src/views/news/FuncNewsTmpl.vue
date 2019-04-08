<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('functmpl.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="box">
            <div class="box-header with-border">
              {{ $t('functmpl.query.basic') }}
            </div>
            <div class="box-body">
              <el-form-item :label="$t('functmpl.query.functype')">
                <label>{{ current.funcTypeString }}</label>
              </el-form-item>
              <el-form-item :label="$t('functmpl.query.pushtime')">
                <label>{{ current.pushTimeString }}</label>
              </el-form-item>
              <el-form-item :label="$t('functmpl.query.tmplset')">
                <el-button type="primary" @click="addLang">{{ $t('functmpl.query.addlang') }}</el-button>
              </el-form-item>
              <el-form-item>
                <el-table v-loading="loading" :data="computedLanguage" border style="width: 100%">
                  <el-table-column prop="languageIdString" :label="$t('functmpl.table.name')"></el-table-column>
                  <el-table-column prop="title" :label="$t('functmpl.table.title')"></el-table-column>
                  <el-table-column prop="content" :label="$t('functmpl.table.content')"></el-table-column>
                  <el-table-column :label="$t('functmpl.table.operate')">
                    <template slot-scope="scope">
                      <el-popover trigger="click" placement="top" popper-class="no-min-with">
                        <el-button slot="reference" type="text" size="small">{{ $t('functmpl.table.operate') }}</el-button>
                        <el-button type="text" size="small" @click="editNewsTmpl(scope.$index, scope.row)">{{ $t('functmpl.table.edit') }}</el-button>
                        </br>
                        <el-button type="text" size="small" :disabled="scope.row.language === 1" @click="deleteNewsTmpl(scope.$index, scope.row)">{{ $t('functmpl.table.delete') }}</el-button>
                      </el-popover>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="box" v-if="addOrEdit">
          <div class="box-header with-border">
            {{ isEdit ? $t('functmpl.form.edit') : $t('functmpl.form.add') }}
          </div>
          <div class="box-body">
            <el-form label-position="left" label-width="90px">
              <el-form-item :label="$t('functmpl.form.language')" class="required">
                <div class="row">
                  <div class="col-md-3 col-xs-12">
                    <el-select v-model="selectLang" @change="addLangModel" v-if="isEdit === false">
                      <el-option
                        v-for="item in langOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="itemSelected.indexOf(item.value) > -1">
                      </el-option>
                    </el-select>
                    <el-input v-model="editNewsTmpls.langName" v-if="isEdit" :disabled="true"></el-input>
                </div>
              </div>
              </el-form-item>
              <el-form-item :label="$t('functmpl.form.title')" class="required">
                <div class="row">
                  <div class="col-md-4 col-xs-12">
                    <el-input v-model="form.title"></el-input>
                  </div>
                </div>
              </el-form-item>
              <el-form-item :label="$t('functmpl.form.content')" class="required">
                <div class="row">
                  <div class="col-md-4 col-xs-12">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      :placeholder="$t('functmpl.form.remarkTip')"
                      v-model="form.content">
                    </el-input>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('functmpl.form.submit') }}</el-button>
                <el-button @click="cancel">{{ $t('functmpl.form.cancel') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="box">
          <div class="box-header with-border">
            {{ $t('functmpl.query.operator') }}
          </div>
          <div class="box-body">
            <el-table v-loading="loading" :data="computedFuncTmplLog" border style="width: 100%">
              <el-table-column prop="createdAtString" :label="$t('functmpl.table.operateTime')"></el-table-column>
              <!-- <el-table-column prop="action" :label="$t('functmpl.table.activity')"></el-table-column> -->
              <!-- <el-table-column prop="operater" :label="$t('functmpl.table.operater')"></el-table-column> -->
              <el-table-column prop="operation" :label="$t('functmpl.table.operate')"></el-table-column>
            </el-table>
            <div class="row text-center">
              <div class="col-md-12">
                <el-pagination
                  layout="total, prev, pager, next"
                  :total="pages.count"
                  :page-size="pages.per"
                  :current-page="pages.current"
                  @current-change="handleCurrentChange"
                  ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api';
// import * as Options from '../../services/options';
import moment from 'moment';
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.common, Mixins.language],
  mounted() {
    const newsTmpl = sessionStorage.newsTmpl;
    if(newsTmpl) {
      this.current = JSON.parse(newsTmpl);
      this.form.templateId = this.current.id;
      api.getNotifiBiz(this, {id: this.current.id})

      this.query.templateId = this.current.id;
      api.getNewsTmplLog(this, this.query);
    }
  },
  data() {
    return {
      loading: false,
      current: {},
      notifibiz: [],
      languages: [],
      isEdit: false,
      functmplogs: [],
      pages: {
        count: 0
      },
      query: {
        templateId: null
      },
      form: {
        language: null,
        title: null,
        content: null
      },
      selectLang: null,
      langOptions: this.getLangByNumOptions().filter(item => item.value !== 1),
      langNumOptions: this.getLangByNumOptions(),
      addOrEdit: false,
      editNewsTmpls: {}
    }
  },
  computed: {
    computedFuncTmplLog() {
      return this.functmplogs.map((item) => {
        return {
          ...item,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    },
    computedLanguage() {
      return this.notifibiz.map((item) => {
        return {
          ...item,
          languageIdString: item.language ? this.getNameById(this.langNumOptions, item.language) : '',
        }
      })
    },
    itemSelected() {
      return this.notifibiz.map((item) => {
        return item.language + '';
      })
    },
    submitDisabled() {
      return !(this.form.language && this.form.title && this.form.content);
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: 'func'});
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      api.getNewsTmplLog(this, this.query);
    },
    addLangModel(val) {
      this.form.language = val;
    },
    submit() {
      if(this.isEdit) {
        api.updateNotifiBiz(this, this.form).then(() => api.getNotifiBiz(this, {id: this.current.id})).then(() => {
          this.query.pageNum = 1;
          api.getNewsTmplLog(this, this.query);
        })
      }
      else {
        delete this.form.id;
        api.saveNotifiBiz(this, this.form).then(() => api.getNotifiBiz(this, {id: this.current.id})).then(() => {
          this.query.pageNum = 1;
          api.getNewsTmplLog(this, this.query);
        })
      }

      this.form.language = null;
      this.form.title = null;
      this.form.content = null;

      this.addOrEdit = false;
    },
    cancel() {
      this.form.language = null;
      this.form.title = null;
      this.form.content = null;

      this.addOrEdit = false;
    },
    editNewsTmpl(index, row) {
      sessionStorage.editNewsTmpl = JSON.stringify(row);
      this.editNewsTmpls = JSON.parse(sessionStorage.editNewsTmpl);
      this.editNewsTmpls.langName = this.editNewsTmpls.language ? this.getNameById(this.langNumOptions, this.editNewsTmpls.language) : '',
      this.form = {
        id: this.editNewsTmpls.id,
        templateId: this.editNewsTmpls.templateId,
        language: this.editNewsTmpls.language + '',
        title: this.editNewsTmpls.title,
        content: this.editNewsTmpls.content
      }
      this.addOrEdit = true;
      this.isEdit = true;
    },
    deleteNewsTmpl(index, row) {
      this.addOrEdit = false;
      api.deleteNotifiBiz(this, {id: row.id}).then(() => api.getNotifiBiz(this, {id: this.current.id})).then(() => {
        this.query.pageNum = 1;
        api.getNewsTmplLog(this, this.query);
      })
    },
    addLang() {
      this.form.language = null;
      this.form.title = null;
      this.form.content = null;

      this.selectLang = null;
      this.addOrEdit = true;
      this.isEdit = false;
    }
  }
}
</script>
