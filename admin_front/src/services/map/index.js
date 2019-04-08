import Vue from 'vue'

// let geocoder = new google.maps.Geocoder();

export function geolocationAddress(item) {
  // geocoder.geocode( { 'location': {lat: +item.latitude, lng: +item.longitude}}, function(results, status) {
  //   if (status == google.maps.GeocoderStatus.OK) {
  //     item.geoAddress = results[0].formatted_address;
  //     // item = Object.assign({}, item, { geoAddress: results[0].formatted_address});
  //   } else {
  //     // alert('Geocode was not successful for the following reason: ' + status);
  //   }
  // });
}

export function geolocationAddressByArray(array) {
  // array = array || [];
  // array.forEach((item, index) => {
  //   geocoder.geocode( { 'location': {lat: +item.latitude, lng: +item.longitude}}, function(results, status) {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       item.geoAddress = results[0].formatted_address;
  //       Vue.set(array, index, item);
  //     } else {
  //       // alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // })
  
}
