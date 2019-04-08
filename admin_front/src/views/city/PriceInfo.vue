<template>
<div>
  <h4>{{ $t('priceInfo.table.title') }}</h4>
  <div class="box box-info">
    <div class="box-header">
      {{ $t('priceInfo.table.title1') }}
    </div>
    <div class="box-body no-padding">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>{{ $t('priceInfo.table.country') }}</th>
            <th>{{ $t('priceInfo.table.city') }}</th>
            <th>{{ $t('priceInfo.table.currency') }}</th>
            <th>{{ $t('priceInfo.table.currencySymbol') }}</th>
            <th>{{ $t('priceInfo.table.bikeCode') }}</th>
            <th>{{ $t('priceInfo.table.defaultPrice') }}</th>
            <th>{{ $t('priceInfo.table.free') }}</th>
          </tr>
          <tr>
            <td>{{price.countryName || "--"}}</td>
            <td>{{price.cityName || "--"}}</td>
            <td>{{price.levelOne.currency || "--"}}</td>
            <td>{{price.levelOne.currencySymbol || "--"}}</td>
            <td>{{price.bikeCode || "--"}}</td>
            <td>{{price.levelOneString || "--"}}</td>
            <td>{{price.freeString || "--"}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('priceInfo.table.title3') }}
    </div>
    <div class="box-body">
      <div class="row">
        <div class="col-md-4">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th>{{ $t('priceInfo.table.credit') }}</th>
                <th>{{ $t('priceInfo.table.price') }}/{{ price.levelOne.unitMinutes }}min</th>
              </tr>
              <tr>
                <td>&lt; 99</td>
                <td>{{ price.levelOneString }}</td>
              </tr>
              <tr>
                <td>80~99</td>
                <td>{{ price.levelTwoString }}</td>
              </tr>
              <tr>
                <td>60~79</td>
                <td>{{ price.levelThreeString }}</td>
              </tr>
              <tr>
                <td>&gt; 60</td>
                <td>{{ price.levelFourString }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('priceInfo.table.title2') }}
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedPriceLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('priceInfo.table.createdAt')" width="120"></el-table-column>
        <el-table-column prop="typeString" :label="$t('priceInfo.table.type')" width="120"></el-table-column>
        <el-table-column prop="adminName" :label="$t('priceInfo.table.adminName')" width="120"></el-table-column>
        <el-table-column prop="remark" :label="$t('priceInfo.table.remark')"></el-table-column>
      </el-table>
    </div>

  </div>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    const ids = [this.price.levelOne.id, this.price.levelTwo.id, this.price.levelThree.id, this.price.levelFour.id].join(',');
    api.getUnitPriceLog(this, {ids});
  },
  data() {
    return {
      loading: false,
      priceLogs: [],
      price: JSON.parse(sessionStorage.getItem('price')) || {}, 
      query: {
        
      }
    }
  },
  computed: {
    computedPriceLogs() {
      return this.priceLogs.map((item) => {
        return {
          ...item,
          typeString: item.type === 1 ? this.$t('priceInfo.js.type1') : item.type === 2 ? this.$t('priceInfo.js.type2') : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    
  }
}

</script>