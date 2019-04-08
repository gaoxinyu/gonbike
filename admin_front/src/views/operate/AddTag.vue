<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addTag.form.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('addTag.form.countryId')">
              <el-select v-model="query.countryId" @change="getCountryInfo">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('addTag.form.type')" v-if="type != 'batch'">
              <el-select v-model="query.type">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('addTag.form.name')" class="required" v-if="type != 'batch'">
              <el-input v-model="query.name"></el-input>
            </el-form-item>

          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('addTag.form.cityId')" class="required">
              <el-select v-model="query.cityId" @change="getTagCategorys">
                <el-option
                  v-for="item in cityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('addTag.form.categoryId')" class="required" v-if="type != 'batch'">
              <el-select v-model="query.categoryId">
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('addTag.form.coordinate')" v-if="type != 'batch'">
              <el-input v-model="coordinate" :placeholder="$t('addTag.form.coordinatePlaceholder')"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row" v-if="type != 'batch'">
          <div class="col-md-6">
            <el-form-item :label="$t('addTag.form.remark')">
              <el-input type="textarea" v-model="query.remark" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row" v-if="type == 'batch'">
          <div class="col-md-6">
            <el-form-item>
              <p class="error">{{ $t('tag.table.uploadNote') }}</p>
              <el-upload
                action="/api/v1/upload/file"
                :headers="headers"
                :multiple="false"
                :on-success="handleSuccess"
                :accept="accepts"
                :limit="1"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">{{ $t('tag.table.uploadText') }}</el-button>
                <div slot="tip" class="el-upload__tip">{{ $t('tag.table.uploadTip') }}</div>
              </el-upload>
            </el-form-item>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" >{{ $t('addTag.form.submit') }}</el-button>
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
import {getStorage} from '../../services/auth'

export default {
  mixins: [Mixins.country],
  mounted() {
    const tag = sessionStorage.tag;
    if(this.$route.name === 'edittag' && tag) {
      this.query = JSON.parse(tag);
      this.coordinate = this.query.longitude + ',' + this.query.latitude;
    } 
    this.getCitysByCountry();
    this.getTagCategorys();
  },
  data() {
    return {
      loading: false,
      coordinate: null,
      tagCategorys: [],
      isTagCategoryModify: false,   // 标签目录是否被编辑过
      isCityModify: false,          // 城市是否被编辑过
      query: {
        countryId: 153,
        type: 1,
        name: null,
        cityId: 1,
        categoryId: null,
        longitude: null,
        latitude: null,
        fileUrl: null
      },
      isAdd: this.$route.name === 'addtag',
      typeOptions: [
        {label: this.$t('tag.js.type1'), value: 1},
      ],
      categoryOptions: [],
      cityOptions: [],
      areaOptions: this.getAreaOnlyOptions(),
      type: this.$route.query.type,
      accepts: '.xls, .xlsx',
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''}
    }
  },
  computed: {
    submitDisabled() {
      return !(((this.type != 'batch') && this.query.name && this.query.categoryId && this.query.cityId) || ((this.type == 'batch') && this.query.cityId && this.query.fileUrl));
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: "tag"});
    },
    submit() {
      this.handleCoordinate();
      const apiString = this.isAdd ? (this.type == 'batch' ? 'saveLaunchTagExcel': 'saveLaunchTag') : 'updateLaunchTag';
      api[apiString](this, this.query).then(() => this.$router.push({name: "tag"}));
    },
    handleCoordinate() {
      if(this.coordinate){
        this.query.longitude = this.coordinate.split(',')[0];
        this.query.latitude = this.coordinate.split(',')[1];
      } else {
        this.query.longitude = null;
        this.query.latitude = null;
      }
    },
    getTagCategorys() {
      api.getTagCategorys(this, {countryId: this.query.countryId, cityId: this.query.cityId}).then(tagCategorys => {
        this.categoryOptions = [];
        this.tagCategorys.forEach(category => {
          this.$set(this.categoryOptions, this.categoryOptions.length, { label: category.name, value: category.id });
        })
        if(this.tagCategorys.length > 0 && this.isTagCategoryModify) {
          this.query.categoryId = this.tagCategorys[0].id;
        } else if(this.tagCategorys.length === 0) {
          this.query.categoryId = null;
        }
        this.isTagCategoryModify = true;
      })
    },
    handleCategoryChange(value) {
      for(let i = 0, len = this.tagCategorys.length; i < len; i++) {
        if(this.tagCategorys[i].id === value) {
          this.query.countryId = this.tagCategorys[i].countryId;
          this.query.cityId = this.tagCategorys[i].cityId;
          break;
        }
      }
    },
    getCountryInfo() {
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = this.citys.map(city => {
          return { label: city.name, value: city.id,}
        });
        if(this.cityOptions.length > 0 && this.isCityModify) {
          this.query.cityId = this.cityOptions[0].value;
          this.getTagCategorys();
        } else if(this.cityOptions.length === 0) {
          this.query.cityId = null;
        }
        this.isCityModify = true;
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(this.$t('tag.js.exceed'));
    },
    handleSuccess(response, file, fileList) {
      if(response.success) {
        this.query.fileUrl = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'error' });
      }
    }
  },
  components: {
  }

}
</script>
