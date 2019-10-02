
var arr1 = [1, 3, 5, 4, 5, 9, 6, 1, 2, 6, 5, 4, 4, 9, 7 ];
var arr2 = [];
var min = arr1[0];
var max = arr1[0];
var pos;

for(var i = 0; i < arr1.length; i++) {
  if(max < arr1[i]) max = arr1[i];
}

for(var i = 0; i < arr1.length; i++) {
  for(var j = 0; j < arr1.length; j++) {
    if(arr1[j] != "X") {
      if(min > arr1[j]) {
        min = arr1[j];
        pos = j;
      }
    }
  }
  arr2[i] = min;
  arr1[pos] = "X";
  min = max;
}

console.log(arr2);