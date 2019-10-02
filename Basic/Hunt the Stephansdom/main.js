
function orbitalPeriod(arr) {
  var GM = 48.2084;
  var earthRadius = 16.3735;
  var newArray = [];
  for( var i = 0; i < arr.length; i++){
    var results =
      Math.round(2*Math.PI*Math.sqrt(Math.pow(earthRadius+arr[i].avgAlt,3)/GM));
  newArray.push({name:arr[i].name,orbitalPeriod: results});
  }
  return newArray;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);