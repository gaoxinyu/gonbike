<template>
  <div class="add-activity-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('addCard.form.title0') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="100px">
          <div class="row">
            <div class="col-md-5 col-xs-12">
              <div class="box">
                <div class="box-header with-border">
                  {{ $t('addCard.form.basics') }}
                </div>
                <div class="box-body">
                  <el-form-item :label="$t('addCard.form.countryId')">
                    <el-select v-model="query.countryId" @change="getCountryInfo"
                               v-if="!(this.$route.name === 'editcard')">
                      <el-option
                        v-for="item in areaOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input v-model="query.countryName" type="text" :disabled="true"
                              v-if="this.$route.name === 'editcard'"></el-input>
                  </el-form-item>

                  <!-- <el-form-item :label="$t('addCard.form.cityId')">
                    <el-select v-model="query.cityId" :disabled="cityOptions.length === 0" v-if="!(this.$route.name === 'editcard')">
                      <el-option
                        v-for="item in cityOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input v-model="query.cityName" type="text" :disabled="true" v-if="this.$route.name === 'editcard'"></el-input>
                  </el-form-item> -->

                  <el-form-item :label="$t('addMessage.form.startDateTime')" class="required">
                    <el-date-picker
                      v-model="dateTimeRange.startDateTime"
                      type="datetime"
                      :picker-options="pickerStartOption"
                      :disabled="disabledStart"
                      @change="handleStartDateChange"
                      :clearable="false"
                      :editable="false"
                      :placeholder="$t('addMessage.form.startPlaceholder')">
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item :label="$t('addMessage.form.endDateTime')" class="required">
                    <el-date-picker
                      v-model="dateTimeRange.endDateTime"
                      type="datetime"
                      :picker-options="pickerEndOption"
                      @change="handleEndDateChange"
                      :clearable="false"
                      :editable="false"
                      :placeholder="$t('addMessage.form.endPlaceholder')">
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item :label="$t('addCard.form.status')">
                    <el-input v-model="computedStatus" :disabled="true"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="box">
                <div class="box-header with-border">
                  {{ $t('addCard.form.limit') }}
                </div>
                <div class="box-body">
                  <el-form-item label-width="0" class="row">
                    <div class="col-md-2 col-xs-4">
                      <el-radio class="radio" v-model="query.limited" :label="false">{{ $t('addCard.form.limit0') }}
                      </el-radio>
                    </div>
                    <div class="col-md-10 col-xs-8">
                      <label class="el-radio radio no-bold">
                        <span class="el-radio__label">{{ $t('addCard.form.nolimit') }}</span>
                      </label>
                    </div>
                  </el-form-item>
                  <el-form-item label-width="0" class="row">
                    <div class="col-md-2 col-xs-12">
                      <el-radio class="radio" v-model="query.limited" :label="true">{{ $t('addCard.form.limit1') }}
                      </el-radio>
                    </div>
                    <div class="col-md-10 col-xs-12">
                      <el-input v-model.number="query.freeTimes" type="number"
                                :placeholder="$t('radius.table.integerPlaceholder')">
                        <template slot="prepend">{{ $t('addCard.form.freeTimes') }}</template>
                        <template slot="append">{{ $t('addCard.form.times') }}</template>
                      </el-input>

                      <el-input v-model.number="query.freeMinutes" type="number"
                                :placeholder="$t('radius.table.integerPlaceholder')">
                        <template slot="prepend">{{ $t('addCard.form.freeMinutes') }}</template>
                        <template slot="append">{{ $t('addCard.form.minute') }}</template>
                      </el-input>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="box" v-if="isEdit && radioChoose === 1">
                <div class="box-header with-border">
                  {{ $t('addCard.form.settings') }}
                </div>
                <div class="box-body">
                  <el-form-item :label="$t('addCard.form.distoIndex')">
                    <el-radio-group v-model="radioChoose">
                      <el-radio :label="1">{{ $t('addCard.form.yes') }}</el-radio>
                      <el-radio :label="0">{{ $t('addCard.form.no') }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="$t('addCard.form.bannerUrl')">
                    <el-upload
                      class="avatar-uploader fixed"
                      action="/api/v1/upload/file"
                      :headers="headers"
                      :show-file-list="false"
                      :multiple="false"
                      :on-success="uploadSuccess"
                      :on-error="uploadError">
                      <img v-if="query.bannerUrl" :src="query.bannerUrl" class="avatar fixed">
                      <i v-else class="el-icon-plus avatar-uploader-icon" style="display: block;"></i>
                      <div slot="tip" class="el-upload__tip">{{ $t('addCard.form.upload') }}</div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item :label="$t('addPushMessage.form.languages')">
                    <el-select v-model="language" @change="handleLanguageChange">
                      <el-option
                        v-for="item in languageOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-tabs v-model="currentLangTab" type="card" closable @tab-remove="removeTab">
                    <el-tab-pane
                      v-for="item in activityLanguages"
                      :key="item.language"
                      :label="$t('common.languages.' + item.language )"
                      :name="item.language"
                    >
                      <el-form-item :label="$t('addPushMessage.form.notiTitle')" class="required">
                        <el-input v-model="item.title" type="text"
                                  :placeholder="$t('addPushMessage.form.notiTitlePlaceholder')"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('addPushMessage.form.notiContent')" class="required">
                        <el-input v-model="item.content" type="textarea" :autosize="{ minRows: 6, maxRows: 10}"
                                  :placeholder="$t('addPushMessage.form.notiTitlePlaceholder')"></el-input>
                      </el-form-item>
                    </el-tab-pane>
                  </el-tabs>

                  <el-form-item :label="$t('addCard.form.h5Url')">
                    <el-input v-model="query.h5Url" type="text"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="col-md-7 col-xs-12">

              <div class="box">
                <div class="box-header with-border">
                  {{ $t('addCard.form.cardsetting') }}
                </div>
                <div class="box-body">
                  <el-form-item label-width="0" class="required">
                    <el-button type="primary" @click="addCard">{{ $t('addCard.form.addCard') }}</el-button>
                  </el-form-item>
                  <el-form-item label-width="0">
                    <div class="row" style="margin-left: 0;" v-if="cardsCopy.length > 0">
                      <div class="col-md-10">
                        {{ $t('addCard.form.cardlist') }}
                      </div>
                      <div class="col-md-2" v-if="cardsCopy.length > 1">
                        {{ $t('addCard.form.cardlavel') }}
                      </div>
                    </div>
                    <div v-for="(item, index) in cardsCopy" :key="index" class="row" style="margin-left: 0;">
                      <div class="col-md-10">
                        <div class="vip-card">
                          <div class="vip-operate">
                            <h4>{{ item[10] === 'null' ? '' : item[10] }}</h4>
                            <div class="operate">
                              <span @click="editCard(index)">编辑</span>
                              <!-- <span @click="deleteCard(index)">删除</span> -->
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-2">
                              <h1>VIP</h1>
                              <h3>{{ item[0] || '--' }} {{ $t('addCard.form.day') }}</h3>
                              <p class="error" style="margin-top: -20px;"> {{ item[9] ? $t('addCard.form.nodeposit') :
                                $t('addCard.form.indeposit') }} </p>
                            </div>
                            <!-- 体验价 -->
                            <div class="col-md-2">
                              <p>{{ item[5] && item[5] !== 'null' ? (item[5] + ' ' + country.currency) : '--' }}</p>
                              <p>{{ item[4] ? $t('addCard.form.disauto') : $t('addCard.form.disntAuto') }}</p>
                              <p>{{ item[11] === true ? $t('addCard.form.isKeyDeposit') : '--' }}</p>
                            </div>
                            <!-- 折扣价 -->
                            <div class="col-md-2">
                              <p>{{ item[7] && item[7] !== 'null' ? (item[7] + ' ' + country.currency) : '--' }}</p>
                              <p>{{ item[6] ? $t('addCard.form.openDisc') : $t('addCard.form.closeDisc') }}</p>
                              <p>{{ item[12] > 0 ? item[12] + ' oCoin' : '--' }}</p>
                            </div>
                            <!-- 自动续费价 -->
                            <div class="col-md-3">
                              <p>{{ item[3] && item[3] !== 'null' ? (item[3] + ' ' + country.currency) : '--' }}</p>
                              <p>{{ item[2] ? $t('addCard.form.auto') : $t('addCard.form.dontAuto') }}</p>
                            </div>
                            <!-- 正常价 -->
                            <div class="col-md-2">
                              <p>{{ item[1] !== 'null' ? (item[1] + ' ' + country.currency) : '--' }}</p>
                              <p>{{ $t('addCard.form.cardPrice') }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 card-lavel" v-if="cardsCopy.length > 1">
                        <div class="vip-level">
                          <i class="fa fa-angle-double-down" aria-hidden="true" @click="upLevel(index, 1)"
                             v-show="!(index === cardsCopy.length - 1)"></i>
                        </div>
                        <div class="vip-level">
                          <i class="fa fa-angle-double-up" aria-hidden="true" @click="upLevel(index, -1)"
                             v-show="!(index === 0)"></i>
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <el-form-item>
            <!--<el-button type="primary" @click="submit" :loading="loading">{{-->
            <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{
              $t('addCard.form.submit') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-dialog width="30%" :title="editCardIndex === '' ? $t('addCard.dialog.addCard') : $t('addCard.dialog.editCard')"
               :visible.sync="addCardVisible">
      <el-form label-width="90px">
        <el-form-item :label="$t('addCard.form.cardName')" class="required">
          <el-input v-model="card[10]" type="text" :maxlength="24"
                    :placeholder="$t('addCard.form.cardNameholder')"></el-input>
        </el-form-item>
        <!-- 天数 -->
        <el-form-item :label="$t('addCard.form.cardDay')" class="required">
          <el-input v-model="card[0]" type="number">
            <template slot="append">{{ $t('addCard.form.day') }}</template>
          </el-input>
        </el-form-item>
        <!-- 正常价 -->
        <el-form-item :label="$t('addCard.form.cardPrice')" class="required">
          <el-input v-model="card[1]" type="number">
            <template slot="append">{{ country.currency || 'USD' }}</template>
          </el-input>
        </el-form-item>
        <!-- 折扣价 -->
        <el-form-item :label="$t('addCard.form.inDiscount')">
          <div class="col-md-6" style="padding:0;">
            <el-select v-model="card[6]" @change="!card[6] && (card[7] = null)">
              <el-option :label="$t('addCard.form.closeDisc')" :value="false"></el-option>
              <el-option :label="$t('addCard.form.openDisc')" :value="true"></el-option>
            </el-select>
          </div>
          <div class="col-md-6" style="padding:0;">
            <el-input v-model="card[7]" v-show="card[6]" type="number" :placeholder="$t('addCard.form.must')">
              <template slot="append">{{ country.currency || 'USD' }}</template>
            </el-input>
          </div>
        </el-form-item>
        <!-- 自动续费 -->
        <el-form-item :label="$t('addCard.form.cardAuto')">
          <div class="col-md-6" style="padding:0;">
            <el-select v-model="card[2]" @change="!card[2] && (card[3] = null)">
              <el-option :label="$t('addCard.form.dontAuto')" :value="false"></el-option>
              <el-option :label="$t('addCard.form.auto')" :value="true"></el-option>
            </el-select>
          </div>
          <div class="col-md-6" style="padding:0;">
            <el-input v-model="card[3]" v-show="card[2]" type="number" :placeholder="$t('addCard.form.must')">
              <template slot="append">{{ country.currency || 'USD' }}</template>
            </el-input>
          </div>
        </el-form-item>
        <!-- 体验价 -->
        <el-form-item :label="$t('addCard.form.cardDiscount')">
          <div class="col-md-6" style="padding:0;">
            <el-select v-model="card[4]" :disabled="disDiscount" @change="!card[4] && (card[5] = null)">
              <el-option :label="$t('addCard.form.disntAuto')" :value="false"></el-option>
              <el-option :label="$t('addCard.form.disauto')" :value="true"></el-option>
            </el-select>
          </div>
          <div class="col-md-6" style="padding:0;">
            <el-input v-model="card[5]" v-show="card[4]" type="number" :placeholder="$t('addCard.form.must')">
              <template slot="append">{{ country.currency || 'USD' }}</template>
            </el-input>
            <p class="error" style="font-size: 12px; line-height: 1.5;" v-show="mustmin">{{ $t('addCard.form.mustmin')
              }}</p>
          </div>
        </el-form-item>
        <!-- 2018.0123 zjg 新增是否是押金一键购买的会员卡 -->
        <el-form-item :label="$t('addCard.form.isKeyDeposit')" class="required">
          <el-checkbox
            v-model="card[11]"
            :disabled="this.isEdit && card.length !== initCard().length"
            @change="handleIsKeyDepositChange">{{ $t('addCard.form.isKeyDeposit') }}
          </el-checkbox>
        </el-form-item>


        <!--20180423 vip-->
        <el-form-item :label="$t('addCard.form.vipType')" class="required">
          <el-checkbox v-model="card[13]"
                       :disabled="depositDisabled13 || card[11]"
          >{{ $t('addCard.form.superVip') }}
          </el-checkbox>
        </el-form-item>

        <!--暂时不显示-->
        <!--<el-form-item :label="$t('addCard.form.authorizedTimes')" v-show="card[13]">-->
          <!--<div class="col-md-6" style="padding:0;">-->
            <!--<el-input v-model="card[14]" type="number" min="0">-->
              <!--<template slot="append">{{ $t('addRisk.form.timesUnit') }}</template>-->
            <!--</el-input>-->
          <!--</div>-->
        <!--</el-form-item>-->

        <!-- 2017.10.31 zhu 新增字段免押金 -->
        <!--<el-form-item :label="$t('addCard.form.nodeposit')" class="required">-->
          <!--<el-checkbox-->
            <!--v-model="card[9]"-->
            <!--:disabled="depositDisabled || card[11]">{{ $t('addCard.form.nodeposit') }}-->
          <!--</el-checkbox>-->
        <!--</el-form-item>-->


        <!-- 2018.0123 zjg 赠送oCoin的数量 -->
        <!-- <el-form-item :label="$t('addCard.form.giftOCoin')" class="required">
            <el-input v-model="card[12]" type="number" :disabled="!card[11]">
              <template slot="append">oCoin</template>
            </el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddCard">{{ $t('addCard.dialog.cancel') }}</el-button>
        <el-button type="primary" @click="addCardSave" :disabled="addCardDisabled">{{ $t('addCard.dialog.ok') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('addCard.dialog.title')" :visible.sync="conflictVisible">
      <p>{{$t('addCard.dialog.msg1', {id: conflictedCard.id})}}</p>
      <p>{{$t('addCard.dialog.detail', {id: conflictedCard.id})}}：</p>
      <table class="table table-bordered">
        <tbody>
        <tr>
          <td width="100px">{{ $t('addCard.dialog.card') }}：</td>
          <td>{{ computedConflictedCard.activityContentString }}</td>
        </tr>
        <tr>
          <td width="100px">{{ $t('addCard.dialog.period') }}：</td>
          <td>{{ computedConflictedCard.periodString }}</td>
        </tr>
        <tr>
          <td width="100px">{{ $t('addCard.dialog.area') }}：</td>
          <td>{{ computedConflictedCard.areaString }}</td>
        </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="conflictVisible = false">{{ $t('addCard.dialog.cancel') }}</el-button>
        <el-button type="primary" @click="stopAndSave">{{ $t('addCard.dialog.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from "../../api"
  import moment from "moment"
  import {getStorage} from '../../services/auth'
  import Mixins from '../../mixins/index.js'

  export default {
    mixins: [Mixins.country, Mixins.language, Mixins.pickerStartOption, Mixins.common],
    mounted() {
      const card = sessionStorage.card;
      if (this.$route.name === 'editcard' && card) {
        this.query = JSON.parse(card);
        for (let i = 0, langs = this.query.activityLanguages; i < langs.length; i++) {
          if (langs[i].language !== 'en') {
            this.currentLangs.push({
              id: langs[i].id,
              language: langs[i].language,
              languageName: this.$t('common.languages.' + langs[i].language),
              title: langs[i].title,
              content: langs[i].content,
              activityType: langs[i].activityType,
              activityId: langs[i].activityId,
              h5Url: langs[i].h5Url,
              createdAt: langs[i].createdAt,
              updateAt: langs[i].updateAt,
              actionType: 0
            });
          }
          this.activityLanguages.push({
            id: langs[i].id,
            language: langs[i].language,
            languageName: this.$t('common.languages.' + langs[i].language),
            title: langs[i].title,
            content: langs[i].content,
            activityType: langs[i].activityType,
            activityId: langs[i].activityId,
            h5Url: langs[i].h5Url,
            createdAt: langs[i].createdAt,
            updateAt: langs[i].updateAt,
            actionType: 0
          });
        }
        this.query.activityId = this.query.id;
        this.radioChoose = this.query.showHomePage ? 1 : 0;
        this.dateTimeRange.startDateTime = moment(this.query.startTime).toDate();
        this.dateTimeRange.endDateTime = moment(this.query.endTime).toDate();
        console.log(this.query.activityContent);
        this.cards = this.query.activityContent != '' ? this.query.activityContent.split('|').map((cardString) => cardString.split(',')) : [];
        console.log(this.cards);
        // 转一下类型
        for (let i = 0; i < this.cards.length; i++) {
          this.cards[i][2] = this.cards[i][2] === 'true';
          this.cards[i][4] = this.cards[i][4] === 'true';
          this.cards[i][6] = this.cards[i][6] === 'true';
          this.cards[i][9] = this.cards[i][9] === 'true';
          this.cards[i][11] = this.cards[i][11] === 'true';
          this.cards[i][13] = this.cards[i][13] === 'true';
        }
        // 创建一个副本，用于修改
        this.cardsCopy = JSON.parse(JSON.stringify(this.cards));
      }
      else {
        this.activityLanguages.push({
          language: 'en',
          languageName: this.$t('common.languages.' + 'en'),
          title: null,
          content: null,
          activityType: null,
          activityId: null,
          h5Url: null,
          createdAt: null,
          updateAt: null,
          actionType: 0
        });
      }
      this.getCountryInfo();
    },
    data() {
      return {
        loading: false,
        conflictVisible: false,
        country: {},
        conflictedCard: {},
        citys: [],
        isEdit: this.$route.name === 'editcard',
        query: {
          activityType: 2,  // 会员卡
          countryId: 153,
          // cityId: null,
          status: 0,
          startTime: null,
          endTime: null,
          freeTimes: 5,
          freeMinutes: 60,
          content: null,
          title: null,
          activityContent: null,
          h5Url: null,
          bannerUrl: null,
          activityLanguages: [],
          limited: false
        },
        activityLanguages: [],
        currentLangs: [],
        card: this.initCard(),
        cards: [],
        cardsCopy: [],
        // cards:[[30, 30, 'false', null], [null, null, 'false', null], [null, null, 'false', null],
        //       [null, null, 'false', null], [null, null, 'false', null], [null, null, 'false', null],
        //       [null, null, 'false', null], [null, null, 'false', null]],
        cityOptions: [],
        language: 'en',
        languageOptions: this.getLangOnlyOptions(),
        currentLangTab: 'en',
        areaOptions: this.getAreaOnlyOptions(),
        headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
        radioChoose: 0,
        addCardVisible: false,
        editCardIndex: ''
      }
    },
    computed: {
      computedStatus() {
        // 根据时间动态改变状态
        let curTime = (new Date()).getTime();
        if (curTime < moment(this.dateTimeRange.startDateTime).toDate().getTime()) {
          this.query.status = 0;
          return this.$t('addCard.js.status0');
        }
        else if (moment(this.dateTimeRange.endDateTime).toDate().getTime() < curTime) {
          this.query.status = 2;
          return this.$t('addCard.js.status2');
        }
        else {
          this.query.status = 1;
          return this.$t('addCard.js.status1');
        }
      },
      addCardDisabled() {
        return !(this.card[0] && this.card[1] && (this.card[2] ? (this.card[3]
          && this.card[3] !== 'null') : true) && (this.card[4] ? (this.card[5]
          && this.card[5] !== 'null') : true) && (this.card[6] ? (this.card[7]
          && this.card[7] !== 'null') : true) && this.card[10]
          && (this.card[11] ? this.card[12] >= 0 && parseInt(this.card[12], 10) == this.card[12] : true));
      },
      submitDisabled() {
        return !(this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime
          && (this.radioChoose === 1 ? (this.activityLanguages[0].title && this.activityLanguages[0].content) : true)
          && this.cardsCopy[0]
          && (this.query.limited ? (this.query.freeTimes > 0 && parseInt(this.query.freeTimes) === this.query.freeTimes && this.query.freeMinutes > 0 && parseInt(this.query.freeMinutes) === this.query.freeMinutes) : true));
      },
      computedConflictedCard() {
        let item = this.conflictedCard;
        return {
          ...item,
          activityTypeString: this.$t('card.js.activityType'),
          updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
          startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
          endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
          statusString: item.status === 0 ? this.$t('card.js.status0') : item.status === 1 ? this.$t('card.js.status1') : item.status === 2 ? this.$t('card.js.status2') : '',
          activityContentString: item.activityContent ? this.getActivityContent(item.activityContent, item.currencySymbol) : '',
          freecardString: this.$t('card.js.freecard', {freeTimes: item.freeTimes, freeMinutes: item.freeMinutes}),
          periodString: (item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "") + ' ~ ' + (item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : ""),
          areaString: item.countryName + ' - ' + item.cityName,
        }
      },
      isRequired() {
        return this.radioChoose === 1 ? true : false;
      },
      disDiscount() {
        if (!this.card[2]) {
          this.card[4] = false;
          this.card[5] = null;
          return true;
        }
        else {
          return false;
        }
      },
      depositDisabled() {
        if (this.editCardIndex !== '') {
          console.log(1);
          for (let i = 0, cards = this.cards, cardsCopy = this.cardsCopy; i < cards.length; i++) {
            if (cards[i].toString() == cardsCopy[this.editCardIndex].toString() && cards[i][9] && cardsCopy[this.editCardIndex][9]) {
              return true;
            }
          }
          return false;
        }
        if (this.card[11]) {
          return true;
        }
        return false;
      },
      depositDisabled13() {
        if (this.editCardIndex !== '') {
          for (let i = 0, cards = this.cards, cardsCopy = this.cardsCopy; i < cards.length; i++) {
            if (cards[i].toString() == cardsCopy[this.editCardIndex].toString() && cards[i][13] && cardsCopy[this.editCardIndex][13]) {
              return true;
            }
          }
          return false;
        }
        if (this.card[11]) {
          return true;
        }
        return false;
      },
      mustmin() {

        return !(this.card[5] ? (this.card[1] ? this.card[5] - this.card[1] <= 0 : true)
          && (this.card[3] ? this.card[5] - this.card[3] <= 0 : true)
          && (this.card[7] ? this.card[5] - this.card[7] <= 0 : true) : true);
      }
    },
    methods: {
      goBack() {
        this.$router.push({name: 'card'});
      },
      initCard() {
        // [天数 -> 0, 正常价 -> 1, 是否开启自动续费 -> 2, 自动续费价 -> 3,
        //  是否开启促销 -> 4, 促销体验价 -> 5, 是否开启折扣 -> 6, 折扣价 -> 7,
        //  优先级 -> 8, 免押金 -> 9, 会员卡名称 －> 10, 是否是押金一键购买的会员卡 -> 11, 赠送oCoin的数量 -> 12]
        //  superVip -> 13, superVip次数 -> 14,
        return [null, null, false, null, false, null, false, null, 0, false, '会员卡', false, 0, false, 0]
      },
      addCard() {
        this.card = this.initCard();
        this.editCardIndex = '';
        this.addCardVisible = true;
      },
      addCardSave() {
        this.card[9] = this.card[13];
        if (this.editCardIndex !== '') {
          this.cardsCopy[this.editCardIndex] = JSON.parse(JSON.stringify(this.card));
          this.editCardIndex = '';
        }
        else {
          this.card[8] = this.cardsCopy.length + 1;
          this.cardsCopy.push(this.card);
        }
        this.card = this.initCard();
        this.addCardVisible = false;
      },
      editCard(index) {
        this.editCardIndex = index;
        this.card = JSON.parse(JSON.stringify(this.cardsCopy[index]));
        this.addCardVisible = true;
      },
      cancelAddCard() {
        this.card = this.initCard();
        this.addCardVisible = false;
      },
      deleteCard(index) {
        this.$confirm(this.$t('addCard.js.message'), this.$t('addCard.js.tip'), {
          confirmButtonText: this.$t('addCard.js.ok'),
          cancelButtonText: this.$t('addCard.js.cancel'),
          type: 'warning'
        }).then(() => {
          this.cardsCopy.splice(index, 1)
        }).catch(() => {
        });
      },
      submit() {
        this.query.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
        this.query.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();
        this.query.showHomePage = this.radioChoose === 1 ? true : false;
        // 转一下类型
        for (let i = 0; i < this.cardsCopy.length; i++) {
          this.cardsCopy[i][2] = this.cardsCopy[i][2] ? 'true' : 'false';
          this.cardsCopy[i][4] = this.cardsCopy[i][4] ? 'true' : 'false';
          this.cardsCopy[i][6] = this.cardsCopy[i][6] ? 'true' : 'false';
          this.cardsCopy[i][9] = this.cardsCopy[i][9] ? 'true' : 'false';
          this.cardsCopy[i][11] = this.cardsCopy[i][11] ? 'true' : 'false';
          this.cardsCopy[i][13] = this.cardsCopy[i][13] ? 'true' : 'false';
        }
        this.query.activityContent = this.cardsCopy.filter((card) => card[0] && card[1]).map((card) => card.join(',')).join('|');
        this.query.title = this.activityLanguages[0].title;
        this.query.content = this.activityLanguages[0].content;
        for (let i = 0, langs = this.activityLanguages.filter(item => item.language != 'en'); i < langs.length; i++) {
          if (!langs[i].id) {
            this.currentLangs.push({
              language: langs[i].language,
              languageName: this.$t('common.languages.' + langs[i].language),
              title: langs[i].title,
              content: langs[i].content,
              activityType: langs[i].activityType,
              activityId: langs[i].activityId,
              h5Url: langs[i].h5Url,
              createdAt: langs[i].createdAt,
              updateAt: langs[i].updateAt,
              actionType: 1
            })
          }
          else {
            this.currentLangs.push({
              id: langs[i].id,
              language: langs[i].language,
              languageName: this.$t('common.languages.' + langs[i].language),
              title: langs[i].title,
              content: langs[i].content,
              activityType: langs[i].activityType,
              activityId: langs[i].activityId,
              h5Url: langs[i].h5Url,
              createdAt: langs[i].createdAt,
              updateAt: langs[i].updateAt,
              actionType: 0
            })
          }
        }
        this.query.activityLanguages = this.currentLangs;
        // 暂时不要冲突处理 2017.11.27 zhu
        // api.ifCardConflict(this, this.query).then((data) => {
        //   if(data.conflicted === false) {
        console.log(this.query);

        if (this.$route.name === 'addcard') {
          api.saveCard(this, this.query).then(() => this.$router.push({name: "card"}));
        } else if (this.$route.name === 'editcard') {
          api.updateCard(this, this.query).then(() => this.$router.push({name: "card"}));
        }


        //   } else if (data.conflicted === true){
        //     this.conflictedCard = data.activity || {};
        //     this.conflictVisible = true;
        //   }
        // })
      },
      // handleStartDate(val) {
      //   return this.$route.name === 'editcard' ? false : this.handleStartDateChange(val);
      // },
      stopAndSave() {
        // 暂时不要冲突处理 2017.11.27 zhu
        // const card = {...this.query, conflict: true};
        const card = {...this.query, conflict: false};
        if (this.$route.name === 'addcard') {
          api.saveCard(this, card).then(() => this.$router.push({name: "card"}));
        } else if (this.$route.name === 'editcard') {
          api.updateCard(this, card).then(() => this.$router.push({name: "card"}));
        }
      },
      getCountryInfo() {
        api.getCountryInfo(this, {id: this.query.countryId});
        // this.getCitysByCountry();
      },
      // getCitysByCountry() {
      //   api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
      //     this.cityOptions = this.citys.map(city => {
      //       return {
      //         label: city.name,
      //         value: city.id,
      //       }
      //     });
      //     this.query.cityId = (this.cityOptions.length > 0) ? this.cityOptions[0].value : null;
      //   })
      // },
      uploadSuccess(response, file, fileList) {
        if (response.success) {
          this.query.bannerUrl = response.data.message;
        } else {
          this.$message({message: response.data.message, type: 'success'});
          // this.query.bannerUrl = 'for test';  // for test
        }
      },
      uploadError(err, response, file) {

      },
      getActivityContent(content, currencySymbol) {
        let items = content.split('|') || [];
        let ret = '';
        items.forEach((item) => {
          let nums = item.split(',');
          ret += nums[0] + this.$t('card.js.dayCard') + currencySymbol + nums[1] + '\n\r';
        });
        return ret;
      },
      handleLanguageChange(lang) {
        if (this.activityLanguages.map(m => m.language).indexOf(lang) >= 0) {

        } else {
          const langs = {
            language: lang,
            languageName: this.$t('common.languages.' + lang),
            title: '',
            content: '',
            activityType: null,
            activityId: null,
            h5Url: null,
            createdAt: null,
            updateAt: null
          }
          this.$set(this.activityLanguages, this.activityLanguages.length, langs);

        }
        this.currentLangTab = lang;
      },
      removeTab(lang) {
        if (lang === 'en') {
          return false;
        }
        if (this.activityLanguages.length > 1) {
          this.activityLanguages = this.activityLanguages.filter(langs => langs.language !== lang);
          for (let i = 0, cl = this.currentLangs; i < cl.length; i++) {
            if (cl[i].language === lang) {
              cl[i].actionType = 2;
            }
          }
          if (lang === this.currentLangTab) {
            this.language = this.currentLangTab = this.activityLanguages[0].language;
          }
        }
      },
      upLevel(index, lavel) {
        if ((index + lavel > this.cardsCopy.length - 1) || (index + lavel < 0)) {
          return;
        }
        this.cardsCopy[index][8] = index + 1 + lavel;
        this.cardsCopy[index + lavel][8] = index + 1;
        let temp = this.cardsCopy[index];
        this.$set(this.cardsCopy, index, this.cardsCopy[index + lavel]);
        this.$set(this.cardsCopy, index + lavel, temp);
      },
      handleIsKeyDepositChange(value) {
        if (value) {
          this.card[9] = value;
          this.card[13] = value;
        } else {
          this.card[12] = 0;
        }
      }
    }
  }
</script>
<style lang="scss">
  .add-activity-view .fixed {
    width: 330px;
  }

  .limit-area .el-input-group {
    width: 100px;
  }

  .no-bold {
    font-weight: normal;
  }

  .vip-card {
    padding: 10px;
    font-size: 12px;
    border: 1px solid #eee;
    text-align: center;
    margin-bottom: 20px;
    .vip-operate {
      display: flex;
      h4 {
        flex: 1;
      }
      .operate {
        width: 6em;
        span {
          color: #999;
          margin-left: 10px;
          cursor: pointer;
          &:first-child {
            color: #5d13fb;
          }
        }
      }
    }
    h1, h3 {
      margin-top: 0;
    }
  }

  .card-lavel {
    display: flex;
    .vip-level {
      flex: 1;
    }
    .fa {
      font-size: 30px;
      cursor: pointer;
      &.fa-angle-double-down {
        margin-right: 20px;
      }
    }
  }
</style>
