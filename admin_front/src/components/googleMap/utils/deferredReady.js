import Q from 'q'

export var DeferredReady = {
  install(Vue, options) {
    // Use the same merge strategy as regular hooks
    Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created;
  },
};

function runHooks(vm) {
  var hooks = vm.$options.deferredReady || [];
  if (typeof hooks === 'function') {
    hooks = [hooks]
  }
  Promise.all(hooks.map(x => {
    var rv;
    try {
      rv = x.apply(vm)
    } catch (err) {
      console.error(err.stack);
    }
    return rv;
  })) // execute all handlers, expecting them to return promises
  // wait for the promises to complete, before allowing child to execute
  .then(() => {
    _.forEach(vm.$children, (child) => child.$deferredReadyDeferred.resolve() );
  });
}

export var DeferredReadyMixin = {
  created() {
    this.$deferredReadyDeferred = Q.defer();
    this.$deferredReadyDeferred.promise.then(() => runHooks(this));
  },

  mounted() {
    if (this.$options.componentName === 'Map') {
      this.$nextTick(() => runHooks(this));
    }
  }
};

