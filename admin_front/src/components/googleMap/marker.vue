/* vim: set softtabstop=2 shiftwidth=2 expandtab : */
<template></template>

<script>

import _ from 'lodash';
import eventsBinder from './utils/eventsBinder.js';
import propsBinder from './utils/propsBinder.js';
import getPropsValuesMixin from './utils/getPropsValuesMixin.js'
import Q from 'q';
import MapComponent from './mapComponent';
import assert from 'assert';

const props = {
  animation: {
    twoWay: true,
    type: Number
  },
  attribution: {
    type: Object,
  },
  clickable: {
    type: Boolean,
    twoWay: true,
    default: true
  },
  cursor: {
    type: String,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    twoWay: true,
    default: false
  },
  icon: {
    type: Object,
    twoWay: true
  },
  label: {
  },
  opacity: {
    type: Number,
    default: 1
  },
  place: {
    type: Object
  },
  position: {
    type: Object,
    twoWay: true,
  },
  shape: {
    type: Object,
    twoWay: true
  },
  title: {
    type: String,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  },
  visible: {
    // twoWay: true,
    default: true
  }
}

const events = [
  'click',
  'rightclick',
  'dblclick',
  'drag',
  'dragstart',
  'dragend',
  'mouseup',
  'mousedown',
  'mouseover',
  'mouseout'
];

var container;

/**
 * @class Marker
 * 
 * Marker class with extra support for
 *
 * - Embedded info windows
 * - Clustered markers
 *
 * Support for clustered markers is for backward-compatability
 * reasons. Otherwise we should use a cluster-marker mixin or
 * subclass.
 */
export default MapComponent.extend({
  name: 'GMarker',
  componentName: 'GMarker',
  mixins: [getPropsValuesMixin],
  props: props,

  created() {
    this.destroyed = false;
    this.$on('register-infoWindow', this.registerInfoWindow);
    this.$on('cluster-ready', this.clusterReady);
  },

  destroyed() {
    this.destroyed = true;
    
    if (this.$markerObject) {
      this.$clusterObject ?
        this.$clusterObject.removeMarker(this.$markerObject) :
        this.$markerObject.setMap(null);
    }
  },

  deferredReady() {
    /* Send an event to any <cluster> parent */
    this.$emit('register-marker', this);

    const options = _.mapValues(props, (value, prop) => this[prop]);
    options.map = this.$map;
    this.createMarker(options, this.$map);
  },

  methods: {
    createMarker (options, map) {
      // FIXME: @Guillaumne do we need this?
      if (!this.destroyed) {
        this.$markerObject = new google.maps.Marker(options);
        propsBinder(this, this.$markerObject, props);
        eventsBinder(this, this.$markerObject, events);

        if (this.$clusterObject) {
          this.$clusterObject.addMarker(this.$markerObject);
        }
      }
    },
    registerInfoWindow (infoWindow) {
      infoWindow.$emit('marker-ready', this, this.$map);
    },
    clusterReady (cluster, map) {
      this.$clusterObject = cluster;
    },
  }
})

</script>
