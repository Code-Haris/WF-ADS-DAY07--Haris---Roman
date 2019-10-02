var seconds = parseInt(2000000, 10);

var weeks = Math.floor(seconds / (604800));
seconds  -= weeks*604800*1;
var days = Math.floor(seconds / (3600*24));
seconds  -= days*3600*24;
var hrs   = Math.floor(seconds / 3600);
seconds  -= hrs*3600;
var mnts = Math.floor(seconds / 60);
seconds  -= mnts*60;
console.log(weeks+"weeks, "+days+" days, "+hrs+" Hrs, "+mnts+" Minutes, "+seconds+" Seconds");