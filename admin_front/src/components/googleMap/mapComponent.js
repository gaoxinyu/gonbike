/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

import Vue from 'vue';
import Q from 'q';
import {DeferredReadyMixin} from './utils/deferredReady'
import {DeferredReady} from './utils/deferredReady.js'
// import eventHub from './utils/eventHub.js'

Vue.use(DeferredReady);

/**
 * @class MapComponent
 *
 * Extends components to include the following fields:
 *
 * @property $mapPromise A Promise returning the google map
 * @property $map        The Google map (valid only after the promise returns)
 *
 *
 * */
export default Vue.extend({

  mixins: [DeferredReadyMixin],
    
  created() {
    this.$map = null;
    this.$on('map-ready', this.mapReady);
  },

  deferredReady () {
    this.$parent.$emit('register-component', this);
  },

  methods: {
    mapReady (map) {
      this.$map = map;
    },
  },

});

