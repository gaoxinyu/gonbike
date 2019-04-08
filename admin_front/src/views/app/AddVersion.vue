<template>
<div class="add-version">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ edit ? $t('addVersion.form.title1') : $t('addVersion.form.title0') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goVersion"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <div class="box">
        <div class="box-header with-border">
          {{ $t('addVersion.form.vsetting') }}
        </div>
        <div class="box-body">
          <el-form label-position="left" label-width="120px">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addVersion.form.force')">
                  <el-select v-model="query.force">
                    <el-option
                      v-for="item in upgOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addVersion.form.name')">
                  <el-select v-model="query.name">
                    <el-option
                      v-for="item in appOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col-md-8 col-xs-12">
                <el-form-item :label="$t('addVersion.form.open')">
                  <el-select v-model="query.open">
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
              <div class="col-md-8 col-xs-12">
                <el-form-item :label="$t('addVersion.form.version')" class="required">
                  <el-input v-model="query.version"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col-md-8 col-xs-12">
                <el-form-item :label="$t('addVersion.form.title')" class="required">
                  <el-input v-model="query.title" :placeholder="$t('addVersion.form.titlePlaceholder')"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col-md-8 col-xs-12">
                <el-form-item :label="$t('addVersion.form.describe')" class="required">
                  <el-input v-model="query.describe" :placeholder="$t('addVersion.form.contentPlaceholder')"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col-md-8 col-xs-12">
                <el-form-item :label="$t('addVersion.form.address')" class="required">
                  <el-input v-model="query.address"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col-md-8 col-xs-12">
                <el-form-item :label="$t('addVersion.form.remark')" class="required">
                  <el-input v-model="query.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="$t('addVersion.form.remarkPlaceholder')" max-length="100"></el-input>
                </el-form-item>
              </div>
            </div>

            <!-- <el-form-item>
              <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addVersion.form.submit') }}</el-button>
            </el-form-item> -->
          </el-form>
        </div>
      </div>
      <div class="box">
        <div class="box-header with-border">
          {{ $t('addVersion.form.otherlang')}}
        </div>
        <div class="box-body">
          <el-form label-position="left">
            <el-form-item>
              <div class="row">
                <div class="col-md-2 col-xs-12">
                  <el-select v-model="selectLang" :placeholder="$t('addVersion.form.addLang')" @change="addLangModel">
                    <el-option
                      v-for="item in langOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="itemSelected.indexOf(item.value) > -1">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <template slot-scope="scope">
                <el-tabs v-model="currentLangTab" type="card" closable @tab-remove="removeTab">
                  <el-tab-pane
                    v-for="(item, index) in appVersionLanguages"
                    :key="item.name"
                    :label="item.tabName"
                    :name="item.name"
                  >
                  <div class="row">
                    <div class="col-md-8 col-xs-12">
                      <div class="el-form-item required">
                        <label class="el-form-item__label" style="width:120px;">
                          {{ $t('addVersion.form.title') }}
                        </label>
                        <div class="el-form-item__content" style="margin-left: 120px !important;">
                          <div class="el-input">
                            <input type="text" v-model="item.title" autocomplete="off" class="el-input__inner">
                          </div>
                        </div>
                      </div>
                      <div class="el-form-item required">
                        <label class="el-form-item__label" style="width:120px;">
                          {{ $t('addVersion.form.describe') }}
                        </label>
                        <div class="el-form-item__content" style="margin-left: 120px !important;">
                          <div class="el-textarea" max-length="100">
                            <textarea placeholder="不超过100字" rows="2" class="el-textarea__inner" style="height: 54px;" v-model="item.describe">
                            </textarea>
                          </div>
                        </div>
                      </div>
                      <div class="el-form-item">
                        <label class="el-form-item__label" style="width:120px;">
                          {{ $t('addVersion.form.address') }}
                        </label>
                        <div class="el-form-item__content" style="margin-left: 120px !important;">
                          <div class="el-input">
                            <input type="text" v-model="item.address" autocomplete="off" class="el-input__inner">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </el-tab-pane>
                </el-tabs>
              </template>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addVersion.form.submit') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api"
// import * as Options from '../../services/options/index.js';
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.common, Mixins.language],
  mounted() {
    const version = sessionStorage.version;
    if(this.$route.name === 'editversion' && version) {
      this.edit = true;
      this.query = JSON.parse(version);
      for(let i = 0, langs = this.query.appVersionLanguages; i < langs.length; i++) {
        if(langs[i].language !== 'en') {
          this.currentLangs.push({
            id: langs[i].id,
            title: langs[i].title,
            describe: langs[i].describe,
            address: langs[i].address,
            language: langs[i].language,
            name: i - 1 + '',
            tabName: this.getNameById(this.langOptions, langs[i].language),
            actionType: 0
          });
          this.appVersionLanguages.push({
            id: langs[i].id,
            title: langs[i].title,
            describe: langs[i].describe,
            address: langs[i].address,
            language: langs[i].language,
            name: i - 1 + '',
            tabName: this.getNameById(this.langOptions, langs[i].language),
            actionType: 0
          });
          this.itemSelected.push(langs[i].language);
        }
      }
    }
  },
  data() {
    return {
      query: {
        force: false,
        name: 'android',
        version: '',
        title: '',
        describe: '',
        address: '',
        remark: '',
        appVersionLanguages: [],
        open: null
      },
      edit: false,
      appOptions: [
        {label: this.$t('addVersion.js.app1'), value: 'android'},
        {label: this.$t('addVersion.js.app2'), value: 'ios'}
      ],
      upgOptions: [
        {label: this.$t('addVersion.js.upg0'), value: false},
        {label: this.$t('addVersion.js.upg1'), value: true}
      ],
      loading: false,
      statusOptions: [
        { label: this.$t('version.js.status0'), value: false},
        { label: this.$t('version.js.status1'), value: true},
      ],
      langOptions: this.getLangOnlyOptions().filter(item => item.value !== 'en'),
      selectLang: null,
      currentLangTab: '',
      appVersionLanguages: [],
      currentLangs: [],
      itemSelected: [],
      tabIndex: 0
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.version && this.query.title && this.query.describe
            && this.query.address && this.query.remark);
    },
    // tabIndex() {
    //   return this.appVersionLanguages.length;
    // }
  },
  methods: {
    goVersion() {
      this.$router.push({'name': 'version'});
    },
    submit() {
      if(this.$route.name === 'addversion') {
        for(let i = 0, langs = this.appVersionLanguages; i < langs.length; i++) {
          this.query.appVersionLanguages.push({
            title: langs[i].title,
            describe: langs[i].describe,
            address: langs[i].address,
            language: langs[i].language,
            actionType: 1
          })
        }
        api.saveAppVersion(this, this.query)
      }
      else {
        for(let j = 0, xl = this.appVersionLanguages; j < xl.length; j++) {
          if(!xl[j].id) {
            this.currentLangs.push({
              appVersionId: this.query.id,
              createdAt: this.query.createdAt,
              updatedAt: this.query.updatedAt,
              language: xl[j].language,
              title: xl[j].title,
              describe: xl[j].describe,
              address: xl[j].address,
              actionType: 1
            })
          }
          else {
            this.currentLangs.push({
              id: xl[j].id,
              appVersionId: this.query.id,
              createdAt: this.query.createdAt,
              updatedAt: this.query.updatedAt,
              language: xl[j].language,
              title: xl[j].title,
              describe: xl[j].describe,
              address: xl[j].address,
              actionType: 0
            })
          }
        }
        this.query.appVersionLanguages = this.currentLangs;
        api.updateAppVersion(this, this.query);
      }
    },
    addLangModel(val) {
      this.itemSelected.push(val);
      if(val) {
        let newTabName = ++this.tabIndex + '';
        this.appVersionLanguages.push({
          tabName: this.getNameById(this.langOptions, val),
          title: '',
          describe: '',
          address: '',
          name: newTabName,
          language: val,
          actionType: 1
        });
        this.currentLangTab = newTabName;
      }
      this.selectLang = null;
    },
    removeTab(targetName) {
      let tabs = this.appVersionLanguages;
      let activeName = this.currentLangTab;
      let items = [];
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.currentLangTab = activeName;
      this.appVersionLanguages = tabs.filter(tab => tab.name !== targetName);
      for(let i = 0, cl = this.currentLangs; i < cl.length; i++) {
        if(cl[i].name === targetName) {
          cl[i].actionType = 2;
        }
      }
      for(let i = 0, langs = this.appVersionLanguages; i < langs.length; i++) {
        if(this.itemSelected.indexOf(langs[i].language) > -1) {
          items.push(langs[i].language);
        }
      }
      this.itemSelected = items;
    }
  }

}
</script>

<style>
.add-version .text-line {
  width: 100%;
}
</style>
