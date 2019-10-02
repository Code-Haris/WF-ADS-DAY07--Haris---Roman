
//Something like this..
var ctx = canvas.getContext("2d");

function positionCanvas(){
  canvas.width = (innerHeight * 1.5)|0;
  canvas.height = innerHeight;
  page.style.minHeight = innerHeight + "px";
  const canvasLeft = ((innerWidth - canvas.width) / 2) | 0;
  canvas.style.left = canvasLeft+"px";  
}
function mainLoop(time){
  if(canvas.height !== innerHeight){
    positionCanvas();
  }
    game.time = time;
    game.update();
    requestAnimationFrame(mainLoop);
}

window.focus();
positionCanvas();
function log(...data){  console.log(...data) }
const doFor = (count, callback) => {var i = 0; while (i < count && callback(i ++) !== true ); };
const setOf = (count, callback) => {var a = [],i = 0; while (i < count) { a.push(callback(i ++)) } return a };
const levels = [{
    name : "Da Start!",
    layout : [
        "ffffffff#f#ffffffff",
        "fccc#####f#####dddf",
        "f####         ####f",
        "f#3   #######   3#f",
        "f# ##         ## #f",
        "f# #  ## # ##  # #f",
        "f# # ##  #  ## # #f",
        "f#    # ### #    #f",
        "#####         #####",
        "ff    H##B###    ff",
        "##### #49B97# #####",
        "f#    #95869#    #f",
        "f# # #######I# # #f",
        "f# #     2     # #f",
        "f# ### ## ## ### #f",
        "f#     #   #     #f",
        "f# ##### # ##### #f",
        "f#3             3#f",
        "f########f########f",
        "ffffffff#f#ffffffff"
    ],
    ghostLeave : [ // travel directions out of home
        [0,0,3,3,2],
        [2,3,0,0,3,3,2],
        [2,2,2,3,0,0,3,3,0],
        [1,2,2,2,2,3,0,0,3,3,0],
    ],
    ghostToHomePos : [ [2,2,3], [2],[0], [0,0,3] ], // traveldirection from home point(8 on map) to home start pos

},{
   name : "Test ya bitmap map.",
   layout : [
        "fffffffffffffffffffffff",
        "f#####################f",
        "f#3                 3#f",
        "f# ## ### ### ### ## #f",
        "f# ##      #      ## #f",
        "f#    # ## # ## #    #f",
        "f# ####         #### #f",
        "f#      #######      #f",
        "f#### #    B    # ####f",
        "f     # H##B### #     f",
        "f#### # #45867# # ####f",
        "fccc# # ######I # #dddf",
        "ff### #         # ###ff",
        "ff#     #######     #ff",
        "f## ###    2    ### ##f",
        "f#      ##### #      #f",
        "f# # ## #     # ## # #f",
        "f# #    # #####    # #f",
        "f#3#### #     # ####3#f",
        "f#        ###        #f",
        "f##########f##########f",
        "fffffffffffffffffffffff" ,
    ] ,
    ghostLeave : [
        [0,0,3,3],
        [0,3,3,0,0,0,0],
        [-1,-1,2,3,3,2,2,2],
        [-1,-1,2,2,3,3],
    ],
    ghostToHomePos : [ [2,2], [2],[0], [0,0] ],
},{
    name : "BOOO ya!",
    layout : [
        "fffffff#f#fffffff",
        "fccc####f####dddf",
        "f####       ####f",
        "f#3   #####   3#f",
        "####         ####",
        "ff   H##B###   ff",
        "#### #49B97# ####",
        "f#   #95869#   #f",
        "f# # ######I # #f",
        "f# #    2    # #f",
        "f# #### # #### #f",
        "f#3           3#f",
        "f#######f#######f",
        "fffffff#f#fffffff"
    ],
    ghostLeave : [
        [0,0,3,3,2],
        [2,3,0,0,3,3,2],
        [2,2,2,3,0,0,3,3,0],
        [1,2,2,2,2,3,0,0,3,3,0],
    ],
    ghostToHomePos : [ [2,2,3], [2],[0], [0,0,3] ],
},{
    name : "MegaMap",
    layout : [
        "ffffffffffffff#f#ffffffffffffff",
        "ffccc#####ffff# #ffff#####dddff",
        "f#########ffff# #ffff#########f",
        "f#   #   ###### ######   #   #f",
        "f# #   #               #   # #f",
        "f# ######## # ### # ######## #f",
        "f#    #     #     #     #    #f",
        "f# ## # ### # ### # ### # ## #f",
        "f#3     #      3      #     3#f",
        "####### # ### ### ### # #######",
        "f       #                     f",
        "####### # # H##B### # # #######",
        "f#      # # #45867# # #      #f",
        "f# ## # # # ######I # # # ## #f",
        "f# #  # #             # #  # #f",
        "f# # ## ### ####### ### ## # #f",
        "f# #           2           # #f",
        "f# # ## ### ### ### ### ## # #f",
        "f#3#  # #             # #  #3#f",
        "f# ## # # ## ##### ## # # ## #f",
        "f#         #       #         #f",
        "f#### ## # ### # ### # ## ####f",
        "f#     # #           # #     #f",
        "f# # ### # #### #### # ### # #f",
        "f# #     # #ff# #ff# #     # #f",
        "f# ##### # #ff# #ff# # ##### #f",
        "f#        3#ff# #ff#3        #f",
        "f###########ff# #ff###########f",
        "ffffffffffffff#f#ffffffffffffff",
    ],
    ghostLeave : [
        [0,0,3,3],
        [0,3,3,0,0,0,0],
        [-1,-1,2,3,3,2,2,2],
        [-1,-1,2,2,3,3],
    ],
    ghostToHomePos : [ [2,2], [2],[0], [0,0] ],    
    
}];
doFor(levels.length,i=>{
    levels[i].layout = levels[i].layout.map(row => row.split("").map(c => c === "#" ? 1 : c === " " ? 0 : parseInt(c,36)));
});
const easeInOut = (time, amount = 2) => { 
    time = time < 0 ? 0 : time > 1 ? 1 : time;
    var t2 = Math.pow(time, amount);
    return t2 / (t2 + Math.pow(1 - time,amount)) 
}
const ease = (time, amount = 2) =>  Math.pow(time < 0 ? 0 : time > 1 ? 1 : time, amount); 
// simple circular buffer with no bounds checking
const createCircleBuf = (size) => {
    var tw = 0;
    var tr = 0;
    const path = new Uint8Array(size);
    return {
        empty () { tw = tr = 0 },
        write (val) { path[(tw++) % size] = val },
        read () { if(tr < tw) { return path[(tr++) % size] } },
        writeBuf (array) {
            for(var i = 0; i < array.length; i++){
                path[(tw++) % size] = array[i];
            }
        },
        getAt (pos) { if(tr + pos < tw){ return path[(tr+pos) % size] } },
        length () { return tw - tr },
    }
};
const keyboard = (() => {
    const keys = {
        ArrowUp : false,
        ArrowDown : false,
        ArrowLeft : false,
        ArrowRight : false,
        anyKey : false,
    };
    const callbacks = {};
    function keyEvents(e){
        const isDown = e.type === "keydown";
        if(keys[e.code] !== undefined){
            keys[e.code] = isDown;
            e.preventDefault();
        }
        keys.anyKey = isDown;
        if(callbacks[e.code] && isDown){
          callbacks[e.code](e);
        }
    }
    const API = {
        start(){
            addEventListener("keyup", keyEvents);
            addEventListener("keydown", keyEvents);
            if (window.keys === undefined) { window.keys = keys }
            return keys;
        },
        stop(){
            removeEventListener("keyup", keyEvents);
            removeEventListener("keydown", keyEvents);
        },
        addCallback(keyName,callback){
          callbacks[keyName] = callback;
        },
    }
    return API;
})();
var imageTools = {
    canvas(width, height) {  // create a blank image (canvas)
        var c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        return c;
    },
    createImage (width, height) {
        var i = this.canvas(width, height);
        i.ctx = i.getContext("2d");
        return i;
    },
}
function createMap(){
    const map = {
        map : null,
        ghostExitInstructions : null,
        styles : {
            stdCellSize : 32,
            background : "black",
            walls : "blue",
            dot : "yellow",
            dotRad : 5,
            pill : "#D8F",
            pillRad : 8,
            textCol : "red",
            font : "32px arial black",
            levelCompleteFont : "32px arial black",
            levelCompleteCol : "yellow",
            levelCompleteMessage : "Level cleared.",
            levelCompleteTime : 4000,
            gameOverFont : "48px arial black",
            gameOverCol : "yellow",
            gameOverMessage : "Game Over",
            nextLifeFont : "32px arial black",
            nextLifeCol : "cyan",
            nextLifeMessage : "Next up.",
            nextLifeTime : 5000, // time to wait for next life;
            textScoreCol : "yellow",
            fontScore : "18px arial black",
            fontLives : "18px arial black",
            fontSmall : "12px arial black",
            playerColor : "yellow",
            ghostColors : ["Red","#0D0","Blue","Cyan"],
            ghostBrowColors : ["#D00","#0C0","#00D","#0DD"],
            ghostRunCol : "purple",
            ghostEyeWhite : "white",
            ghostEye : "black",
            ghostMouth : "black",
            ghostSway : 0.5,
            ghostSwayPissedOff : 1,
            scoreFloatCol : "Cyan",
            browMorphRate : 0.06, // perFrame unit change 
            mouthMorphRate : 0.01, // perFrame unit change 
            blinkRate : 1/200, // odds per frame of blinking
            blinkTime : 7, // number of frames
            lookRate : 1/500, // odds per frame of blinking
            lookTime : 100, // number of frames
            mouthChangeRate : 1/100,//1/1000,
            powerUpTime : 1000, // in frames
            cellSize : 24,
        },
        playerInfo : {
            startX : 0,
            startY : 0,
            lives : 3,
        },
        mapping : (()=>{
            const swayAmount = 0.1;
            const dirs = [[1,0,0,swayAmount],[0,1,Math.PI * (1/2),-swayAmount],[-1,0,Math.PI,swayAmount / 4],[0,-1,Math.PI *(3/2),-swayAmount/4]];
            const isOpen = (x,y,dir) => {
                var d = dirs[dir % 4];
                x = ((x + m.width) + d[0]) % m.width;
                y = ((y + m.height) + d[1]) % m.height;
                var l =  mapRaw[x+y*m.width];
                return (l !== 1 && l !== 11);
            }
            const isOpenG = (id,x,y,dir) => {
                var d = dirs[dir % 4];
                x = ((x + m.width) + d[0]) % m.width;
                y = ((y + m.height) + d[1]) % m.height;
                var ghostAtPos = false;
                doFor(id,i=>{
                    if(Math.abs(ghostPos[i][0] - x) < 2 && Math.abs(ghostPos[i][1]- y) < 2){
                        ghostAtPos = true;
                    }
                });
                if(ghostAtPos) {return false }
                var l =  mapRaw[x+y*m.width];
                return (l !== 1 && l !== 11);
            }
            const isWall = (x,y,dir) => {
                var d = dirs[dir % 4];
                x = ((x + m.width) + d[0]) % m.width;
                y = ((y + m.height) + d[1]) % m.height;
                var l =  mapRaw[x+y*m.width];
                return (l === 1);
            };
            const ghostPos = [[0,0],[0,0],[0,0],[0,0]];
            var mapRaw;
            var homingMap;
            var mapSource; 
            //               [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
            var mapConvert = [2,1,0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,1 ,1 ,19,20,21];
            
            const m = {
                length : 0,
                width : 0,
                height : 0,
                getHomingMap(){ return homingMap },
                getPlayMap(){ return mapRaw },
                directions : dirs,
                setGhostPos(id,x,y){
                      ghostPos[id][0] = x;
                      ghostPos[id][1] = y;
                },
                getMapSize(){
                    m.height = map.map.length;
                    m.width = map.map[0].length;
                    m.length = m.width *  m.height;
                },
                getCount(type){
                    var count = 0;
                    doFor(mapRaw.length,i=>count += mapRaw[i] === type ? 1: 0);
                    return count;
                },
                getAt(x,y){ return mapRaw[x + y * m.width] },
                setAt(x,y,c) { mapRaw[x + y * m.width] = c },
                getGOptionsAt(id,x,y,dir,array = []){
                    var c = 0;
                    if( isOpenG(id,x, y, dir) ) { array[(c++) + 1] = dir % 4 }
                    if( isOpenG(id,x, y, dir+1) ) { array[(c++) + 1] = (dir + 1) % 4 }
                    if( isOpenG(id,x, y, dir+3) ) { array[(c++) + 1] = (dir + 3) % 4 }
                    if( isOpenG(id,x, y, dir+2) ) { array[(c++) + 1] = (dir + 2) % 4 }
                    array[0] = c;
                    while(c < 4){ array[(c++)+1] = -1 }
                    return array;
                },
                getOptionsAt(x,y,dir,array = []){
                    var c = 0;
                    if( isOpen(x, y, dir) ) { array[(c++) + 1] = dir % 4 }
                    if( isOpen(x, y, dir+1) ) { array[(c++) + 1] = (dir + 1) % 4 }
                    if( isOpen(x, y, dir+3) ) { array[(c++) + 1] = (dir + 3) % 4 }
                    if( isOpen(x, y, dir+2) ) { array[(c++) + 1] = (dir + 2) % 4 }
                    array[0] = c;
                    while(c < 4){ array[(c++)+1] = -1 }
                    return array;
                },
                getWalledAt(x,y,dir,array = []){
                    var c = 0;
                    if( isWall(x, y, dir) ) { array[(c++) + 1] = dir % 4 }
                    if( isWall(x, y, dir+1) ) { array[(c++) + 1] = (dir + 1) % 4 }
                    if( isWall(x, y, dir+3) ) { array[(c++) + 1] = (dir + 3) % 4 }
                    if( isWall(x, y, dir+2) ) { array[(c++) + 1] = (dir + 2) % 4 }
                    array[0] = c;
                    return array;
                },
                findMapCoordOf(id, coord = {}, index = 0){
                    index = mapRaw.indexOf(id,index);
                    if(index > -1){
                        coord.x = index % this.width;
                        coord.y = (index / this.width) | 0;
                        coord.index = index;
                    }else{
                        coord.index = -1;
                    }
                    return coord;
                },     
                findMapSCoordOf(id, coord = {}, index = 0){
                    index = mapSource.indexOf(id,index);
                    if(index > -1){
                        coord.x = index % this.width;
                        coord.y = (index / this.width) | 0;
                        coord.index = index;
                    }else{
                        coord.index = -1;
                    }
                    return coord;
                },                 
                getHomeDirection(x,y){
                    return homingMap[x + y * this.width];
                },
                createHoming(){
                    function setM(ind,dir){
                        if(homingMap[ind] === 2 || homingMap[ind] === 3 ){
                            workMap[ind] = dir + 10;
                        }
                    }
                    const w = this.width;
                    homingMap = new Uint8Array(mapRaw);
                    var workMap = Uint8Array.from(homingMap);
                    var working = true;
                    const negDir = [-1,-w,1,w];
                    const codes = [8,10,11,12,13];
                    const checks = [ [0,2,1,3],[0,1,3],[0,2,1],[2,1,3],[0,2,3]];
                    while(working){
                        working = false;
                        for(var y = 1; y < this.height-1; y ++){
                            for(var x = 1; x < w-1; x ++){
                                var ind = x + y *  w;
                                var c = homingMap[ind];
                                if(c === 2 || c === 3){ working = true }
                                else {
                                    var ind1 = codes.indexOf(c);
                                    if(ind1 > -1){
                                        var cc = checks[ind1];
                                        doFor(cc.length,j => { setM(ind + negDir[cc[j]], cc[j]) })
                                    }
                                }
                            }
                        }
                        homingMap.set(workMap);
                    }   
                    for(var i = 0; i < this.length; i++){
                        if(homingMap[i] >= 10){  homingMap[i] -= 10 }
                        else{ homingMap[i] = 5 }
                    }
                },
                getRunningMaps(){
                    m.getMapSize();
                    mapRaw = new Uint8Array(m.length);
                    mapSource = new Uint8Array(m.length);
                    var i = 0;
                    map.map.forEach(row => {
                        row.forEach(cell => {
                            mapSource[i] =cell;
                            mapRaw[i++] = mapConvert[cell];
                        })
                    });
                    this.createHoming();
                }
            }
            return m;
        })(),
        cellsX : null,
        cellsY : null,
        gridX : 0,
        gridY : 0,
        scaleX : 1, // rendering canvas scale
        scaleY : 1,
        scoreX : null,
        scoreY : 0,
        livesX : null,
        livesY : 0,
        newMap : false,
        image : imageTools.createImage(300,150), // default canvas size
        // LOOKOUT Y,X reversed in arg list (so I dont have to put in Undefined when setting Y)
        drawText(text, font = map.styles.font, col = map.styles.textCol,y = map.image.height / 4, x =map.image.width / 2){
            ctx.font = font;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.fillText(text, x,y+5);
            ctx.fillStyle = col;
            ctx.fillText(text, x,y);
        },
        showMap(){
            const gx = map.gridX;
            const gy = map.gridY;
            const scaleX = (canvas.width + gx) / map.image.width;
            const scaleY = (canvas.height + gy) / map.image.height;
            const gsx = gx * map.scaleX;
            const gsy = gy * map.scaleY;
            ctx.setTransform(1,0,0,1,0,0);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(map.image,-((gsx/2)|0),-((gsy/2)|0),canvas.width+gsx,canvas.height+gsy);
            ctx.imageSmoothingEnabled = true;
            map.scaleX = (canvas.width + gsx) / map.image.width;
            map.scaleY = (canvas.height + gsy) / map.image.height;            

            ctx.setTransform(map.scaleX,0,0,map.scaleY,-((gsx/2)|0),-((gsy/2)|0));
        },   
        createGhost(ctx,id){
            function getDistToPlayer(player,x,y,d){
                x =  player.x - (((x + m.width) + dirs[d][0]) %  m.width) * gx;
                y =  player.y - (((y +  m.height) + dirs[d][1]) %  m.height) * gy;
                return x * x + y * y;
            }
            const gx = map.gridX;
            const gy = map.gridY;             
            const shape = [
                [0.5,0, 0.75,0.1, 0.8,0.3, 0.8,0.9, 0.7,1, 0.6,0.9, 0.5,1, 0.4,0.9, 0.3,1, 0.2,0.9, 0.2,0.3, 0.25,0.1],
                [0.5,0, 0.75,0.1, 0.8,0.3, 0.8,1, 0.7,0.9, 0.6,1, 0.5,0.9, 0.4,1, 0.3,0.9, 0.2,1, 0.2,0.3, 0.25,0.1]
            ].map(s=>s.map((v,i)=>{
                v = (v - 0.5) * 1.4 + 0.5;
                v = i % 2 === 0 ? v * gx : v * gy;
                return v;   
            }));
            const scaleShape = (v, i) => i % 2 === 0? v * gx : v * gy;
            const eyes = [0.3,0.3,0.2,0.7,0.3,0.2].map(scaleShape);
            const m = map.mapping;

            const speed = 1;
            const runSpeed = 0.8;
            const deadSpeed = 2;
            var currentSpeed = speed;
            const dirs = m.directions;
            var animCount = id * 16;
            var frameCount = 0;
            var hunting = false; // hunting pac man
            var running = false; // running away from pac man
            var flash = false;   // flashing that about to change back to hunting
            var flashRate = 32;
            var dead = false;  // ghost is dead and heading home
            var inForTheKill = false; // if true ghost improves its pac man hunting
            var pissedOff = 0;
            var planTravelAt = 0;  // when to recaculate path
            const maxDist = m.width * m.width + m.height * m.height;
            var destX = 0;
            var destY = 0;
            const travelOptions = [0,0,0,0,0]; // first item is number of option
            const tOp = travelOptions;
            const travel = createCircleBuf(20); // holds future moves
            var wait = false;
            var waitHere = false;
            var waitAtX = 0;
            var waitAtY = 0;
            // ghost extras for cute factor
            var blink = 0;
            var looking = 0;
            var changeBrow = false;
            var lookDir = 0;
            var moveDir = 0;
            const brow = [-8,2,0,0,8,2];
            const browFrom = [-8,2,0,0,8,2];
            const browM = [-8,2,0,0,8,2];
            var browMorph = 0
            const brows = {
                setMorphSource(){
                    doFor(6,i=>browFrom[i]=brow[i]);
                    browMorph = 1;
                },
                norm(){
                    brows.setMorphSource();
                    brow[1] = brow[5] = 2;
                    brow[0] = -8;
                    brow[4] = 8;
                    brow[3] = 0;
                },
                mad(){
                    brows.setMorphSource();
                    brow[1] = brow[5] = -2;
                    brow[3] = 2;
                    brow[0] = -7;
                    brow[4] = 7;
                },
                happy(){
                    brows.setMorphSource();
                    brow[1] = brow[5] = -2;
                    brow[0] = -7;
                    brow[4] = 7;
                    brow[3] = -2;
                },
                dumb(){
                    brows.setMorphSource();
                    brow[1] = brow[5] = 2;
                    brow[0] = -8;
                    brow[4] = 8;
                    brow[3] = 2;                    
                },
                strange(){
                    brows.setMorphSource();
                    brow[1] = 0.5;
                    brow[5] = 2;
                    brow[3] = 0.0;                    
                }
            }
            brows.types = [brows.norm,brows.mad,brows.happy,brows.dumb,brows.strange];
            function setBrow(){
                if(inForTheKill){
                    brows.mad();
                }else{
                    brows.types[(Math.random() * brows.types.length) | 0]();                
                }
            }
            const mouth =     [-4,0,0,0,0,0,4,0,2]; // last val is line width
            const mouthFrom = [-4,0,0,0,0,0,4,0,2]; 
            const mouthM = [-4,0,0,0,0,0,4,0,2]; 
            var mouthMorph = 0;
            var mouthMorphSpeed = 0;
            var mouthChangeRate = 1 / 100;
            const mouthRunning = [-4,2,-2,0,2,0,4,2];
            const mouthPissed = [-4,-1,4,0,-4,1,4,0]; 
            var sway = 0;
            var swayTime = 0;
            var swayAng = 0;
            var swayAngChase = 0;
            const changeMouth = ()=>{
                doFor(9,i=>mouthFrom[i]=mouth[i]);
                mouthMorph = 1;
                mouthMorphSpeed = Math.random()*0.2 + 0.05;
                if(Math.random()< 0.33){
                    mouth[0] = -(Math.random() * 2 + 2);
                    mouth[1] = Math.random() * 2 - 1;
                    mouth[6] = Math.random() * 2 + 2;
                    mouth[7] = Math.random() *2 - 1;
                    if(Math.random() < 0.5){
                        mouth[4] = mouth[2] = Math.random() * 2 - 1;
                        mouth[5] = mouth[3] = Math.random() * 2;
                    }else{
                        mouth[4] = mouth[2] = (mouth[0] + mouth[6]) /2;
                        mouth[5] = mouth[3] = (mouth[1] + mouth[7]) /2
                    }
                    mouth[8] = Math.random()*2 + 2;
                    mouthChangeRate = 1 / (Math.random() * 100 + 100);
                }else if(Math.random() < 0.5){
                    mouth[0] = -(Math.random() * 2 + 2);
                    mouth[1] = Math.random() * 2 - 1;
                    mouth[2] = -(Math.random() * 2 + 2);
                    mouth[3] = Math.random() *2 + 1;

                    var r = Math.random();
                    mouth[4] = (mouth[2] - mouth[0]) * r + mouth[0];
                    mouth[5] = (mouth[3] - mouth[1]) * r + mouth[1];
                    mouth[6] = Math.random() * 2 + 2;
                    mouth[7] = Math.random() * 4 - 2;

                    mouth[8] = Math.random()*4 + 1;
                    mouthChangeRate = 1 / (Math.random() * 30 + 10);
                    
                }else{
                    mouth[0] = -(Math.random() * 2 +0.1);
                    mouth[1] = Math.random() * 1;
                    mouth[2] = Math.random() * 2 +0.1;
                    mouth[3] = Math.random() *1;

                    var r = Math.random() * 0.5;
                    mouth[4] = (mouth[2] - mouth[0]) * (0.5-r) + mouth[0];
                    mouth[5] = (mouth[2] - mouth[0]) * (0.5+r) + mouth[0];
                    mouth[6] = (mouth[3] - mouth[1]) * (0.5-r) + mouth[1];
                    mouth[7] = (mouth[3] - mouth[1]) * (0.5+r) + mouth[1];

                    mouth[8] = Math.random() *2 + 3;
                    mouthChangeRate = 1 / (Math.random() * 100 + 50);
                    
                    
                }
                setBrow();
            }
            const drawBody = (showSkin) => {
                var i = 0;
                const s = shape[(animCount>>3)%2];
                ctx.lineCap = "round";
                if (showSkin) { ctx.fillStyle = map.styles.ghostRunCol }
                else{ctx.fillStyle = g.color}
                ctx.beginPath();
                while (i < s.length) { ctx.lineTo(s[i++], s[i++]) }
                ctx.fill();                        
            }
            const drawEyeBalls = () => {
                var i = 0;
                ctx.fillStyle = map.styles.ghostEyeWhite;
                ctx.beginPath();
                ctx.arc(eyes[i++], eyes[i++] ,eyes[i++] ,0, Math.PI * 2);
                ctx.moveTo((eyes[i] + eyes[i + 2]) ,eyes[i + 1] );
                ctx.arc(eyes[i++], eyes[i++] ,eyes[i++] ,0, Math.PI * 2);
                ctx.fill();
            }
            const drawEye = (lookAt) => {
                var i = 0;
                const lx = Math.cos(lookDir) * lookAt;
                const ly = Math.sin(lookDir) * lookAt;
                ctx.fillStyle = map.styles.ghostEye;
                ctx.fillRect((eyes[i++] - 2 + lx) ,(eyes[i++] - 2 + ly) ,4, 4);
                i ++;
                ctx.fillRect((eyes[i++] - 2 + lx) ,(eyes[i++] - 2 + ly) ,4, 4);                        
            }
            const drawBlink = () => {
                var i = 0;
                ctx.fillStyle = map.styles.ghostEyeWhite;
                ctx.fillRect((eyes[i++] - eyes[i+1] * 0.8),(eyes[i++]), eyes[i]  * 1.6, 1.5);
                i ++;
                ctx.fillRect((eyes[i++] - eyes[i+1] * 0.8),(eyes[i++]), eyes[i] * 1.6, 1.5);
            }
            const drawBrow = () => {
                var i = 0;
                ctx.strokeStyle = map.styles.ghostBrowColors[id];
                ctx.lineWidth = Math.max(2,4);
                ctx.beginPath();
                if(browMorph > 0){
                    browMorph -= map.styles.browMorphRate;
                    const mv = ease(browMorph);
                    doFor(6,i=>browM[i] = (browFrom[i]-brow[i]) * mv + brow[i]);
                    while(i < browM.length){
                        ctx.lineTo(
                            12 + browM[i++] ,
                            eyes[1]-eyes[2] + browM[i++] 
                        )
                    }
                }else{
                    while(i < brow.length){ctx.lineTo((12 + brow[i++]) ,(eyes[1]-eyes[2] + brow[i++]) )}
                }
                ctx.stroke();                        
            }
            const drawMouth = (showSkin) => {
                var i = 0;
                ctx.strokeStyle = map.styles.ghostMouth;
                ctx.beginPath();
                if(showSkin){
                    ctx.lineWidth = inForTheKill ? 4 : 1;
                    while (i < mouthRunning.length) {ctx.lineTo((12 + mouthRunning[i++]),(17 + mouthRunning[i++])) }
                }else{
                    if(pissedOff){
                        ctx.lineWidth = 3;
                        while (i < mouthRunning.length) {ctx.lineTo((12 + mouthPissed[i++]),(17 + mouthPissed[i++])) }
                    }else{
                        if(mouthMorph > 0){
                            mouthMorph -= mouthMorphSpeed;
                            const mv = Math.max(0,ease(mouthMorph));
                            doFor(6,i=>mouthM[i] = (mouthFrom[i]-mouth[i]) * mv + mouth[i]);  
                            ctx.lineWidth = mouthM[8];
                            while (i < mouth.length-1) { 
                                ctx.moveTo((12.5 + mouthM[i++]) ,(18 + mouthM[i++])); 
                                ctx.lineTo((12.5 + mouthM[i++]) ,(18 + mouthM[i++])); 
                            }
                        }else{
                            ctx.lineWidth = mouth[8];
                            while (i < mouth.length-1) { 
                                ctx.moveTo((12.5 + mouth[i++]) ,(18 + mouth[i++])); 
                                ctx.lineTo((12.5 + mouth[i++]) ,(18 + mouth[i++])); 
                            }
                        }
                    }
                }
                ctx.stroke();
            }
            
            
            var home = {x :0, y : 0, index : 0};
            var safeZone ={
                topLeft : {x :0, y : 0, index : 0},
                botRight : {x :0, y : 0, index : 0},
                x :0,
                y : 0,
                w : 0,
                h : 0,
                setup(){
                    m.findMapSCoordOf(17,safeZone.topLeft);
                    safeZone.x = safeZone.topLeft.x;
                    safeZone.y = safeZone.topLeft.y;
                    m.findMapSCoordOf(18,safeZone.botRight);                    
                    safeZone.x1 = safeZone.botRight.x;
                    safeZone.y1 = safeZone.botRight.y;
                },
                isSafe(x,y){
                    if(x < safeZone.x || x > safeZone.x1 || y < safeZone.y || y > safeZone.y1){
                        return false;
                    }
                    return true;
                }
            }
            const g = {//g for ghost
                x : 0,
                y : 0,
                waiting : false, 
                color : map.styles.ghostColors[id],
                draw(){
                        
                    var i = 0;
                    var ggx, ggy, showSkin, extra, xdx, xdy;
                    if(waitHere){
                        ggx = g.x;
                        ggy = g.y;
                        g.x = waitAtX;
                        g.y = waitAtY;
                    }
                        
                    // make ghost bob up and down
                    const oy = Math.cos((animCount / 64) * Math.PI * 2) * 2;
                    showSkin = false;
                    if(running){
                        showSkin = true
                        if(flash){ showSkin = ((frameCount / flashRate)|0) % 4 > 0 }
                    }
                    sway = Math.sin(swayTime + animCount /95) * 0.1 * Math.sin((swayTime + animCount /95) /1000);
                    swayTime += 0.1 + (id / 50);
                    
                    
                    extra = pissedOff ? map.styles.ghostSwayPissedOff:map.styles.ghostSway;
                    if(running){ sway -= dirs[moveDir][3] * extra }
                    else if(hunting){ sway += dirs[moveDir][3] * extra }
                    swayAngChase += (sway - swayAng) *0.75;
                    swayAngChase *= 0.045;
                    swayAng += swayAngChase;
                    xdx = Math.cos(swayAng);
                    xdy = Math.sin(swayAng);
                    
                    ctx.save();
                    ctx.transform(xdx,xdy,-xdy,xdx,g.x + gx / 2,g.y + gy );
                    ctx.transform(1,0,0,1,-gx/2,-gy + oy);
                    if(!dead){ drawBody(showSkin) }// draw ghost main shape
                    if(blink){ blink -= 1; drawBlink() }
                    else{
                        if(Math.random() < map.styles.blinkRate){
                            blink = map.styles.blinkTime;
                            if(Math.random() < map.styles.lookRate / 10){
                                looking = map.styles.lookTime;
                                lookDir = Math.random() * Math.PI * 2;
                            }                            
                        }
                        if(looking){
                            looking -= 1;
                            if(looking === 0){
                                if(changeBrow) { changeBrow = false; setBrow() }
                            }
                        }else{
                            if(Math.random() < map.styles.lookRate){
                                looking = map.styles.lookTime;
                                if (hunting) { lookDir = dirs[moveDir][2] }
                                else { lookDir = Math.random() * Math.PI * 2 }
                                if(lookDir > Math.PI * 1.2 && lookDir < Math.PI * 1.8){
                                    brows.happy();
                                    changeBrow = true;
                                }
                            }
                        }                        
                        drawEyeBalls();
                        drawEye(looking > 0 ? 2 : 0);
                        if(!dead && !running){ drawBrow() }
                    }
                    if(!dead){ 
                        drawMouth(showSkin);
                        if(Math.random() < mouthChangeRate){ changeMouth() }
                    }    
                    ctx.restore();
                    if(waitHere){
                        g.x = ggx;
                        g.y = ggy;
                    }                    
                },
                move(game){ // does simple ai for ghosts
                    const p = game.player;
                    var px,py,x,y,d,c
                    px = (g.x / gx) | 0;
                    py = (g.y / gy) | 0;
                    var nearG = null;
                    var distG = 100000; 
                    if(!safeZone.isSafe(px,py)){
                        // if ghosts are close then empty the travel plans
                        game.ghosts.eachItem((gg,i)=>{
                            if(i !== id){
                                var x = g.x - gg.x;
                                var y = g.y - gg.y;
                                var dist = Math.sqrt(x*x+y*y);
                                if(dist < distG){
                                    distG = dist;
                                    nearG = gg;
                                }
                            }
                        })             
                        if(distG < gx * 3){
                            travel.empty();
                        }
                    }
                    
                    // Adds position of ghost to mapping so that travel plans can include not
                    // running into each other too much
                    m.setGhostPos(id,px,py);
                    // Ghost is at nest way point
                    if( Math.abs(destX - g.x) <= currentSpeed && Math.abs(destY - g.y) <= currentSpeed){
                        // wait is a cludge I did not think of before hand
                        if(waitHere){
                            waitHere = false;
                            g.x = waitAtX;
                            g.y = waitAtY;
                        }else{
                            g.x = destX;
                            g.y = destY;
                        }
                        px = (g.x / gx) | 0;
                        py = (g.y / gy) | 0;
                         
                        // should this ghost redo its tranvel plans?
                        // the more often they do the better at hunting you down
                        if(travel.length() <= planTravelAt){
                            planTravelAt = 10;
                            travel.empty();
                            if(g.waiting){
                                travel.write(-1);
                            }else if(dead){ // if dead find shortes root to home
                                d = m.getHomeDirection(px,py);
                                if(d > 3){
                                    
                                    travel.empty();
                                    travel.writeBuf(map.ghostToHomePos[id]);
                                    travel.write(-2);
                                    planTravelAt = 0;
                                    
                                }else{
                                    travel.write(d);
                                }
                            }else{
                                x = px;
                                y = py;
                                d = moveDir;
                               // inForTheKill = true;

                                var movesToPlan = 19;
                                while(travel.length() < movesToPlan){
                                    m.getGOptionsAt(id,x,y,d,tOp);
                                    c = tOp[0];
                                    if(c === 0){
                                        m.getOptionsAt(x,y,d,tOp);
                                        c = tOp[0];
                                        d = tOp[c];
                                        movesToPlan = Math.min(19,travel.length() + 1);
                                    }else{
                                        if(c <= 2 /*&& !inForTheKill*/){ d = tOp[1] }
                                        else {
                                            if(inForTheKill || Math.random() < 0.1){
                                                var closest = Infinity;
                                                for(var i = 0; i < c-1; i++){
                                                    var dist = getDistToPlayer(p,x,y,tOp[i + 1]);
                                                    if(running){ dist = maxDist - dist }
                                                    if(dist < closest){
                                                        d = tOp[i + 1];
                                                        closest = dist;
                                                    }
                                                }
                                            }else{
                                                d = tOp[1 + ((Math.random() * c-1) | 0)];
                                            }
                                        }  
                                    }
                                    travel.write(d);
                                    x =  ((x + m.width) + dirs[d][0]) %  m.width;
                                    y =  ((y +  m.height) + dirs[d][1]) %  m.height;
                                }
                            }
                        }
                        
                        moveDir = travel.read();
                        if(moveDir > 128){
                            if(moveDir === 254){
                                g.wait();
                            }
                            moveDir = 0;
                            waitHere = true;
                            waitAtX = g.x;
                            waitAtY = g.y;
                        }
                        destX = ((px +  m.width) + dirs[moveDir][0]) %  m.width;
                        destY = ((py +  m.height) + dirs[moveDir][1]) %  m.height;
                        destX *= gx;
                        destY *= gy;
                    }else{
                        g.x += dirs[moveDir][0] * currentSpeed;
                        g.y += dirs[moveDir][1] * currentSpeed;
                    }
                    var ggx,ggy;
                    if(waitHere){
                        ggx = g.x;
                        ggy = g.y;
                        g.x = waitAtX;
                        g.y = waitAtY;
                    }
                    if(g.x < 0){  g.x +=  m.width * gx }
                    if(g.y < 0){ g.y +=  m.height * gy }
                    if(g.x >=  m.width  * gx){  g.x -=  m.width  * gx }
                    if(g.y >=  m.height  * gy){ g.y -=  m.height  * gy }
                    if(game.debug){
                        px = (destX / gx) | 0;
                        py = (destY / gy) | 0;
                        ctx.beginPath();
                        ctx.lineWidth = 2.5;
                        ctx.strokeStyle = g.color;
                        ctx.lineTo(g.x + gx/2 - 4 + id*2,g.y + gx/2 - 4 + id*2);
                        var gai = 0;
                        var nt = moveDir;
                        var lx,ly; // last pos
                        lx = px;
                        ly = py;
                        while(nt !== undefined){
                            if(gai > 0){
                                px = ((px +  m.width) + dirs[nt][0]) %  m.width;
                                py = ((py +  m.height) + dirs[nt][1]) %  m.height;
                            }
                            if(Math.abs(lx-px) > 1 || Math.abs(ly-py) > 1){
                                ctx.moveTo((px + 0.5)*gx - 4 + id*2,(py + 0.5)*gy - 4 + id*2);
                            }else{
                                ctx.lineTo((px + 0.5)*gx - 4 + id*2,(py + 0.5)*gy - 4 + id*2);
                            }
                            lx = px;
                            ly = py;
                            nt = travel.getAt(gai++);
                        }
                        ctx.stroke();
                    }
                    x = p.x - g.x;
                    y = p.y - g.y;
                    dist = Math.sqrt(x * x + y * y);
                    if(running || hunting){
                        if(dist < Math.min(gx,gy)){
                            if(hunting){
                                p.touchedGhost = 1;
                            }else{
                                g.kill();
                                p.gotGhost += 1;
                            }
                        }else if(dist < gx * 5){
                            inForTheKill = true;
                            looking = 20;
                            lookDir = Math.atan2(y,x);
                            mouthChangeRate = 1/20;
                            if(lookDir > Math.PI * 1.2 && lookDir < Math.PI * 1.8){
                                brows.happy();
                                changeBrow = true;
                            }else{
                                brows.mad();
                            }
                            if(running){
                                pissedOff += 8;
                            }
                        }else{
                            if(pissedOff){
                                brows.mad();
                                lookDir = Math.atan2(y,x);
                                looking = 20;
                                pissedOff -= 1;
                            }
                            inForTheKill = false;
                        }
                    }
                    if(waitHere){
                        g.x = ggx;
                        g.y = ggy;
                    }
                },
                flash(rate){
                   flash = true;  
                   flashRate = rate;
                },
                hunt(){
                    if(dead){
                        destX = g.x = (g.mx = home.x) * gx;
                        destY = g.y = (g.my = home.y) * gy;                        
                        g.waiting = true;
                        
                    }
                    
                    if(g.waiting){
                        g.waiting = false;
                        travel.empty();
                        wait = false;
                        travel.writeBuf(map.ghostExitInstructions[id]);
                    }
                    hunting = true;
                    running = false;
                    dead = false;    
                    currentSpeed = speed;
                },
                kill(){
                    hunting = false;
                    running = false;
                    dead = true;
                    g.waiting = false;
                    game.ghostKilled += 1;  // bad this must be fixed as game should not be global

                    travel.empty();
                    currentSpeed = deadSpeed;
                    pissedOf = 0;
                },
                run(){
                    hunting = false;
                    running = true;
                    dead = false;
                    flash = false;
                    g.waiting = false;
                    currentSpeed = runSpeed;
                },
                wait(){
                    hunting = false;
                    running = false;
                    dead = false;
                    flash = false;
                    g.waiting = true;
                    if(game.ghostKilled === 4){
                        var wc = 0; // get number waiting
                        doFor(4,i=>wc += game.ghosts.items[i].waiting ? 1 : 0);
                        if(wc === 4){
                            game.powerUp = 1;
                        }
                        
                    }
                },
                update(game){
                    animCount += 1;
                    frameCount += 1;
                    if(hunting || running || dead){
                        g.move(game);
                    }
                    g.draw();  
                },
                restart(){
                    m.findMapCoordOf(id + 4,home);
                    safeZone.setup();
                    hunting = false;
                    running = false;
                    dead = false;                    
                    g.waiting = false;
                    frameCount = 0;
                    pissedOff = 0;
                    destX = g.x = (g.mx = home.x) * gx;
                    destY = g.y = (g.my = home.y) * gy;                        
                    travel.empty();
                    travel.writeBuf(map.ghostExitInstructions[id]);
                    planTravelAt = 0;
                    game.ghostKilled = 0;
                    waitHere = false;
                    game.powerUp = 0;
                },
            }

            g.restart();
            return g
            
        },
        createPlayer(ctx){
            var fruitBonus = false;
            var currentBonus = 0;
            var fruitBonusTime = 0;
            const fruits = [cherry,banana,berry,waterMellon];
            var dotCount = 0;
            var powerUpCount = 0;
            const i = map.image;
            const m = map.mapping;
            const gx = map.gridX;
            const gy = map.gridY;       
            const ghx = gx / 2;
            const ghy = gy / 2;
            const speed = 12; // as a fraction of a cell 1/speed * cell
            const col = map.styles.playerColor;
            const radius = ((gx + 2) / 2) | 0;
            const dir = [
                { ang : 0, x : -radius / 3, y : 0},
                { ang : Math.PI * (1/2), x : 0, y : -radius / 3},
                { ang : Math.PI, x : radius / 3, y : 0},
                { ang : Math.PI * (3/2), x : 0, y : radius / 3},
            ];
            const dirs = m.directions;
            const scoreAdd = {
                text : "0",
                x : 0,
                y : 0,
                show : false,
                count : 0,
            };
            var nextScore = 0;
            var showScores = false;
            var ghostScores = [100,200,400,800,1600,3200];
            function addScore(value,x= p.x + gx / 2,y = p.y){
                var d = scoreDisplays[nextScore%5];
                if(value !== undefined){
                    p.scoreAdd += value;
                    d.text = value;
                }else{
                    p.scoreAdd += ghostScores[nextScore];
                    d.text = ghostScores[nextScore++];
                }
                d.x = x;
                d.y = y;
                d.count = 120;
                d.show = true;
                showScores = true;
            }
            const scoreDisplays = [];
            doFor(5,i=>scoreDisplays[i] = Object.assign({},scoreAdd));
            
            const dirLookup = {d01 : 2, d21 : 0, d10 : 3, d12 : 1};
            var dieMouth;

            const moveOpt = [0,1,2,3,4]; // current move options
            const nextMoveOpt = [0,1,2,3,4]; // move options for next cell in direction of movement
            var moveDist = 0; // distance moved from current pos;
            const controls = {
                up : {name : "ArrowUp", dir : 3, on : false},
                down : {name : "ArrowDown", dir : 1, on : false },
                right : {name : "ArrowRight", dir : 0, on : false },
                left : {name : "ArrowLeft", dir : 2, on : false },
                mostResent : [-1,-1,-1,-1],
            }
            // p is player and used to reference the player in this code section
            const p = {
                time : 0,
                x : map.playerInfo.startX * gx,
                y : map.playerInfo.startY * gy,
                mx : map.playerInfo.startX,  // map position
                my : map.playerInfo.startY,
                moveX : 0,
                moveY : 0,
                lives : map.playerInfo.lives,
                score : 0,
                scoreAdd : 0,
                gotGhost : 0,
                touchedGhost : 0,
                mouth : 0,
                mouthPos : 0.05,
                lifeStartTime : 0,
                alive : true,
                playing : false,
                show : true,
                readyForNextLife : false,
                direction : 0,
                drawAlive(){
                    if(!p.show){ return }
                    const open = p.mouthPos;
                    const d = dirs[p.direction];
                    const d1 = dirs[(p.direction + 1) % 4];
                    ctx.fillStyle = col;
                    ctx.miterLimit = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x + ghx - d[0] * radius * (1/3), p.y + ghy - d[1] * radius * (1/3));
                    ctx.lineTo(p.x + ghx - d[0] * radius * (1/3) + d1[0] * 0.2, p.y + ghy - d[1] * radius * (1/3)+ d1[1] * 0.2);
                    ctx.arc(p.x + ghx, p.y + ghy, radius, d[2] + open, d[2] + Math.PI * 2 - open );
                    ctx.fill();
                },
                drawDead(){
                    if(!p.show){ return }
                    const d = dirs[3];
                    dieMouth += 1 / 70; 
                    const open = Math.max(0.1,ease(dieMouth) * Math.PI);
                    if(dieMouth < Math.PI){
                        ctx.fillStyle = col;
                        ctx.miterLimit = 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x + ghx - d[0] * radius * (1/3), p.y + ghy - d[1] * radius * (1/3));
                        ctx.arc(p.x + ghx, p.y + ghy, radius, d[2] + open, d[2] + Math.PI * 2 - open );
                        ctx.fill();
                    }
                    const lines = Math.max(0,(dieMouth - 0.5) * 6);
                    if(lines > 0){
                        var a,x,y,d1,d2,al;
                        d1 = ease(Math.min(1,lines / 2));
                        d2 = ease(Math.min(1,Math.max(0,(lines - 1) / 1)));
                        al = ease(1 - Math.min(1,Math.max(0,(lines - 2) / 1)));
                        ctx.lineWidth = gx * 0.2 * d1;
                        d1 *= radius * 1.5;
                        d2 *= radius * 1.5;
                        ctx.strokeStyle = col;
                        ctx.lineCap = "round";
                        ctx.globalAlpha = al;
                        ctx.beginPath();
                        doFor(8,i =>{
                            a = (i / 8) * Math.PI * 2;
                            
                            x = Math.cos(a);
                            y = Math.sin(a);
                            ctx.moveTo(p.x + ghx + x * d2, p.y + ghy + y * d2);
                            ctx.lineTo(p.x + ghx + x * d1, p.y + ghy + y * d1);
                        })
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                    if(dieMouth >= 1){
                        p.readyForNextLife = true;
                        p.playing = false;
                    }
                },
                move(keys){
                    var mDir = -1;
                    const checkKey = (key) => {
                        if(keys[key.name]){
                            if(!key.on){
                                doFor(3,i=>controls.mostResent[3-i] = controls.mostResent[2-i]);
                                controls.mostResent[0] = key.dir;
                            }
                            key.on = true;
                        }else{
                            var pos=0
                            if(key.on){
                                doFor(4,i=>{
                                    if(controls.mostResent[i] === key.dir){ pos += 1 }
                                    if(i + pos >= 4){ controls.mostResent[i] = -1 }
                                    else{ controls.mostResent[i] = controls.mostResent[i + pos] }
                                })
                                key.on = false;
                                
                            }
                        }
                    }
                    checkKey(controls.up);
                    checkKey(controls.down);
                    checkKey(controls.left);
                    checkKey(controls.right);
                    
                    const d = p.direction;
                    const px = p.mx;
                    const py = p.my;
                    m.getOptionsAt(px,py,d,moveOpt);
                    m.getOptionsAt(px + dirs[d][0],py + dirs[d][1],d,nextMoveOpt);
                    

                    var moveOption = 0;
                    var doSame = true;
                    while(moveOption < 4 && controls.mostResent[moveOption] > -1){
                        const move = controls.mostResent[moveOption];
                        // reverse direction
                        if(move === ((p.direction + 2) % 4) && moveDist > 0){
                            p.direction = move;
                            moveDist = 1 - moveDist;
                            moveDist += 1 / speed;
                            p.mx += dirs[(p.direction + 2) % 4][0];
                            p.my += dirs[(p.direction + 2) % 4][1];
                            doSame = false;
                            break;
                        // continue or change direction if can fit    
                        }else if(moveOpt.indexOf(move,1) > -1 && (move === p.direction || moveDist <= 1/speed)){
                            p.direction = move;
                            moveDist += 1 / speed;
                            doSame = false;
                            break;
                        // if can change direction at next cell move in direction
                        }else if(move !== p.direction && moveOpt.indexOf(p.direction,1) > -1 && nextMoveOpt.indexOf(move,1) > -1){
                            moveDist += 1 / speed;
                            doSame = false;
                            break;
                        // if can change direction behind then turn around
                        }else if(move !== p.direction && moveOpt.indexOf(move,1) > -1 ){
                            p.direction = (p.direction + 2) % 4;
                            moveDist = 1 - moveDist;
                            moveDist += 1 / speed;
                            p.mx += dirs[(p.direction + 2) % 4][0];
                            p.my += dirs[(p.direction + 2) % 4][1];
                            doSame = false;
                            break;
                        } else{
                            moveOption += 1;
                        }
                    }
                    if(doSame){
                        if(moveOpt.indexOf(p.direction,1) > -1){
                           // moveDist += 1 / speed;
                        }
                    }
                    if(moveDist >= 1){
                        moveDist = 0;
                        p.mx += dirs[p.direction][0];
                        p.my += dirs[p.direction][1];
                        
                    }
                    if(p.mx < 0){ p.mx = m.width - 1 }
                    if(p.mx >= m.width){ p.mx = 0 }
                    if(p.my < 0){ p.my = m.height - 1 }
                    if(p.my >= m.height){ p.my = 0 }
                    p.x = p.mx * gx + moveDist * dirs[p.direction][0] * gx;
                    p.y = p.my * gy + moveDist * dirs[p.direction][1] * gy;

                    p.x = p.x | 0;
                    p.y = p.y | 0;
                    p.mouthPos = Math.max(0.05,Math.abs(Math.sin(moveDist * Math.PI) * Math.PI/3));
                    //var dd = dirLookup["d" + (p.moveX  + 1) + "" + (p.moveY + 1)];
                    //if(dd !== undefined){ p.direction = dd }
                },
                update(game){

                    p.time = game.time;
                    if(p.playing){
                        if(!fruitBonus && p.time  > fruitBonusTime){
                            if(Math.abs(p.mx - map.playerInfo.startX) > 3 && Math.abs(p.my - map.playerInfo.startY) > 2 ){
                                fruitBonus = true;
                                fruits[(currentBonus++) % fruits.length](
                                    map.image.ctx,
                                    map.playerInfo.startX * gx,
                                    map.playerInfo.startY * gy,
                                    gx,gy
                                ); 
                                m.setAt(map.playerInfo.startX,map.playerInfo.startY,4);
                            }
                        }                        
                        if(game.powerUp > 0){
                            game.powerUp -= 1;
                            while(p.gotGhost){
                                p.gotGhost --;
                                addScore();
                            }
                            if(game.powerUp === 400){ game.ghosts.call("flash",32) }
                            else if(game.powerUp === 200){ game.ghosts.call("flash",16) }
                            else if(game.powerUp === 100){ game.ghosts.call("flash",8) }
                            if(game.powerUp === 0){
                                game.ghosts.call("hunt");
                                nextScore = 0;
                                game.ghostKilled = 0;
                            }
                        }
                        if(p.alive && p.touchedGhost && !game.noKill){
                            p.touchedGhost = 0;
                            p.alive = false;
                            dieMouth = 0;
                            p.lives -= 1;
                            game.currentState = game.lostLife;
      
                        }
                        if(p.alive){
                            p.move(game.keys);
                            if((p.x % gx) === 0 && (p.y % gy) === 0){
                                const px = (p.x / gx) | 0;
                                const py = (p.y / gy) | 0;
                                var c= m.getAt(px,py);
                                if(c === 2 || c === 3 || c === 4){
                                    p.scoreAdd += c === 2 ? 2 : 25;
                                    m.setAt(px,py,0);
                                    if(c === 3){
                                        game.ghosts.call("run");
                                        game.powerUp = map.styles.powerUpTime;
                                        powerUpCount -= 1;
                                    }else if(c === 4){
                                        fruitBonusTime = game.time + 4000;
                                        addScore(1000,(px+0.5) * gx,py * gy );
                                        fruitBonus = false;
                                    }else if(c === 2){
                                        dotCount -= 1;
                                    }
                                    map.image.ctx.fillStyle  = map.styles.background;
                                    map.image.ctx.fillRect(px * gx-4, py * gy-4, gx+8, gy+8);
                                }
                            }
                            if(dotCount === 0 && powerUpCount === 0 && game.powerUp === 0){
                              p.levelComplete();

                            }
                            

                            p.drawAlive();
                        }else{
                            p.drawDead();
                        }
                    }else{
                        if(p.alive){
                            p.drawAlive();
                        }
                    }
                    p.stats();
                },
                levelComplete(){
                    dotCount = 0;
                    powerUpCount = 0;
                    game.powerUp = 0;
                    p.playing = false;
                    game.currentState = game.levelComplete;
                    p.show = false;                  
                },
                startLevel(game){
                    dotCount = m.getCount(2);
                    powerUpCount = m.getCount(3);
                },
                nextLife(game) {
                    if(map.newMap){
                        map.newMap = false;
                        p.startLevel(game);
                    }
                    p.alive = true;
                    p.show = true;
                    p.x = (p.mx = map.playerInfo.startX) * gx;
                    p.y = (p.my = map.playerInfo.startY) * gy;
                    p.direction = 0;
                    moveDist = 0;
                    game.powerUp = 0;
                    p.gotGhost = 0;
                    p.touchedGhost = 0;                    
                    p.lifeStartTime = game.time;
                    fruitBonusTime = game.time + 4000;
                    fruitBonus = false;
                    m.setAt(p.mx,p.my,0);
                    map.image.ctx.fillStyle  = map.styles.background;
                    map.image.ctx.fillRect(p.mx * gx-4, p.my * gy-4, gx+8, gy+8);                    

                },
                stats(){
                    if(p.scoreAdd > 0){
                        const add = Math.max(1,(p.scoreAdd / 8) | 0);
                        p.score += add;
                        p.scoreAdd -= add;
                    }
                    
                    ctx.font = map.styles.fontLives;
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "left";
                    if(map.livesX !== null){
                        ctx.fillText("Life "+p.lives, (map.livesX) * gx,(map.livesY +1.1) * gy); 
                    }
                    ctx.font = map.styles.fontScore;
                    ctx.fillStyle = map.styles.textScoreCol;
                    if(map.scoreX !== null){
                        ctx.textAlign = "right";
                        ctx.fillText(""+ p.score, (map.scoreX + 3.4) * gx, (map.scoreY + 1.1) * gy );                    
                    }
                    
                    if(showScores > 0){
                        var showing = false;
                        ctx.font = map.styles.fontSmall;
                        ctx.fillStyle == map.styles.scoreFloatCol;
                        ctx.textAlign = "center";
                        doFor(4,i=>{
                            var d = scoreDisplays[i];
                            if(d.show){
                                ctx.fillText(d.text, d.x, d.y);
                                d.y -= 0.25;
                                d.count -= 1;
                                if(d.count === 0){
                                    d.show = false;
                                }else{
                                    showing = true;
                                }
                            }
                        });
                        if(!showing){
                            showScores = false;
                        }
                    }
                }
            }
            return p;
        },
        init( level ){
            map.map =  level.layout.map(row=>row.map(cell=>cell));
            map.ghostExitInstructions = level.ghostLeave;
            map.ghostToHomePos = level.ghostToHomePos;
            map.cellsX = map.map[0].length-2;
            map.cellsY = map.map.length-2;   
            const can = map.image;
            const ctx = can.ctx;
            const gx = map.gridX = map.styles.cellSize;
            const gy = map.gridY = map.styles.cellSize;
            // c for cut from walls
            const cX = (((gx / 2-4) | 0) / 2) | 0; // amount to trim from walls
            const cY = (((gy / 2-4) | 0) / 2) | 0; // amount to trim from walls
            if(game.resizeCanvasToGame){
                canvas.width = map.styles.cellSize * (map.cellsX-1);
                canvas.height = map.styles.cellSize * (map.cellsY-1);
            }
            can.width = (map.cellsX ) * gx;
            can.height = (map.cellsY) * gy;
            map.scoreX = null;
            map.livesX = null;
            
          
            ctx.fillStyle = map.styles.walls;
            ctx.fillRect(0,0,can.width,can.height);
            map.map.forEach((row,y) => {
                y-= 1;
                row.forEach((c,x) => {
                    x -= 1;
                    if(c !== 1 && c < 17){ // if not a wall
                        ctx.fillStyle = map.styles.background;
                        ctx.fillRect(x * gx - cX - 2, y * gy - cY , gx + cX * 2 + 4, gy + cY * 2);
                        ctx.fillRect(x * gx - cX , y * gy - cY - 2 , gx + cX * 2 , gy + cY * 2 + 4);
                    }
                    if(c === 0){
                        ctx.fillStyle = map.styles.dot;
                        ctx.beginPath();
                        ctx.arc((x + 0.5) * gx, (y + 0.5) * gy, gx * (map.styles.dotRad/ map.styles.stdCellSize), 0, Math.PI * 2);
                        ctx.fill();
                    }else if(c === 3){
                        ctx.fillStyle = map.styles.pill;
                        ctx.beginPath();
                        ctx.arc((x + 0.5) * gx, (y + 0.5) * gy, gx * (map.styles.pillRad / map.styles.stdCellSize), 0, Math.PI * 2);
                        ctx.fill();
                    }else if(c === 2){
                        map.playerInfo.startX = x;
                        map.playerInfo.startY = y;
                    }else if(c === 12 || c === 13){
                        if(map.scoreX === null && c === 12){
                            map.scoreX = x;
                            map.scoreY = y;
                        }
                        if(map.livesX === null && c === 13){
                            map.livesX = x;
                            map.livesY = y;
                        }
                        ctx.fillStyle = map.styles.background;
                        ctx.fillRect(x * gx - gx / 2, y * gy - gy / 2, gx + gx , gy + gy );
                        
                    }
                })
            });
            map.map.splice(0,1);
            map.map.splice(map.map.length - 1,1);
            map.map.forEach(row => {row.pop(); row.shift()})
            map.mapping.getRunningMaps();
            if(game.debug){
                var h = map.mapping.getHomingMap();
    
                ctx.beginPath();
                ctx.fillStyle = "rgba(255,0,0,0.5)"
                for(var y = 0; y < map.mapping.height; y ++){
                    for(var x = 0; x < map.mapping.width; x ++){
                        var c= h[x + y * map.mapping.width];
                        ctx.setTransform(1,0,0,1,x * gx,y * gy)
                        if(c === 0){
                            ctx.moveTo(0.9 * gx,0.5 * gy);
                            ctx.lineTo(0.1 * gx,0.7 * gy);
                            ctx.lineTo(0.1 * gx,0.3 * gy);
                        }else if(c === 2){
                            ctx.moveTo(0.1 * gx,0.5 * gy);
                            ctx.lineTo(0.9 * gx,0.7 * gy);
                            ctx.lineTo(0.9 * gx,0.3 * gy);   
                        }else if(c === 1){
                            ctx.moveTo(0.5 * gx,0.9 * gy);
                            ctx.lineTo(0.7 * gx,0.1 * gy);
                            ctx.lineTo(0.3 * gx,0.1 * gy);   
                        }else if(c === 3){
                            ctx.moveTo(0.5 * gx,0.1 * gy);
                            ctx.lineTo(0.7 * gx,0.9 * gy);
                            ctx.lineTo(0.3 * gx,0.9 * gy);   
                        }
                    }
                }
                ctx.fill();
            }
            var mp = map.mapping.getPlayMap()
            ctx.fillStyle = "#000";
            var opt;
            var w = gx / 4;
            var h = gy / 4;
            var ox = (gx-w) / 2;
            var oy = (gy-h) / 2;
            for(var y = 0; y < map.mapping.height; y ++){
                for(var x = 0; x < map.mapping.width; x ++){
                    var c= mp[x + y * map.mapping.width];
                    ctx.setTransform(1,0,0,1,x * gx,y * gy)
                    if(c === 1){
                        opt = map.mapping.getWalledAt(x,y,0,opt);
                        doFor(opt[0],i=>{
                            if(opt[i+1] === 0){ ctx.fillRect(ox,oy,gx-ox,h) }
                            if(opt[i+1] === 1){ ctx.fillRect(ox,oy,w,gy-oy) }
                            if(opt[i+1] === 2){ ctx.fillRect(0,oy,gx-ox,h) }
                            if(opt[i+1] === 3){ ctx.fillRect(ox,0,w,gy-oy) }
                        })
                        if(opt[0] === 0){
                            ctx.fillRect(ox-1,oy-1,w+2,h+2)
                        }
                    }

                }
            }
            ctx.setTransform(1,0,0,1,0,0);
            map.newMap = true;

     
            return map;
            
        }
    }
    return map;
}
const game = {
    time : 0,
    resizeCanvasToGame : false,
    currentState : null,
    timer : 0,
    stateTimer : 0,
    debug : false,
    noKill : false,
    runSlow : false,
    frameCount : 0,
    map : null,
    level : 0,
    keys : null,
    powerUp : 0,
    ghostKilled : 0,
    player : null,
    ghosts : {
        items : [],
        call (name,...args){
            for(var i = 0; i < game.ghosts.items.length; i++){
                game.ghosts.items[i][name](...args);
            }
        },
        eachItem (callback){
            for(var i = 0; i < game.ghosts.items.length; i++){
                callback(game.ghosts.items[i],i);
            }
        }
    },
    setTimer(){game.timer = game.time},
    
    update(){
        game.frameCount += 1;
        if(!game.runSlow || (game.runSlow && game.frameCount % 4 === 0)){
            if(game.runSlow) { game.time /= 4 }
            if(game.currentState !== null){
                if(game.previouseState !==  game.currentState){
                    game.stateTimer = game.time;            
                    game.previouseState = game.currentState;
                }
                game.currentState();
            }
        }
    },
    pressToStart(){
        if(game.keys.anyKey){
            game.keys.anyKey = false;
            game.currentState = game.play;
        }
        if(game.player === null){
            game.player = game.map.createPlayer(ctx);
            game.ghosts.items.length = 0;
            game.ghosts.items.push(game.map.createGhost(ctx,0));
            game.ghosts.items.push(game.map.createGhost(ctx,1));
            game.ghosts.items.push(game.map.createGhost(ctx,2));
            game.ghosts.items.push(game.map.createGhost(ctx,3));
        }
        game.map.showMap();
        if(((game.time / 500) | 0) % 2){
            game.map.drawText("Any key to Start!");
        }
        game.player.update(game);
        game.ghosts.eachItem(g => { g.update(game) });
    },
    play(){ 
        game.map.showMap();
        if(game.player.alive && ! game.player.playing){
            game.player.playing = true;
            game.ghosts.eachItem(g => { g.hunt() });
            game.player.nextLife(game);

            
        }
        game.ghosts.eachItem(g => { g.update(game) });
        game.player.update(game);

    },
    levelComplete(){
        game.map.showMap();
        game.player.update(game);        
        game.map.drawText(game.map.styles.levelCompleteMessage,game.map.styles.levelCompleteFont,game.map.styles.levelCompleteCol);
        var nlb = ease(1-(game.time - game.stateTimer) / game.map.styles.levelCompleteTime);
        if(game.time - game.stateTimer > game.map.styles.levelCompleteTime){
            game.level += 1;
            if(game.level < levels.length){
              game.map.init(levels[game.level]);
              game.currentState = game.pressToStart;
              game.keys.anyKey = false;
              game.player.nextLife(game);
              game.ghosts.eachItem(g => { g.restart(game) });
            }else{
              game.currentState = game.gameOver;
            }
            
        }
        
    },
    lostLife(){
        game.map.showMap();
        game.player.update(game);
        if(game.player.readyForNextLife){
            game.player.readyForNextLife = false;
            if(game.player.lives){
                game.timer = game.time;
                game.currentState = game.nextLife;
                game.ghosts.eachItem(g => { g.restart(game) });
                game.player.nextLife(game);
            }else{
                game.currentState = game.gameOver;
            }
        }
    },
    nextLife(){
        game.map.showMap();
        game.ghosts.eachItem(g => { g.update(game) });
        game.player.update(game);
        game.map.drawText(game.map.styles.nextLifeMessage,game.map.styles.nextLifeFont,game.map.styles.nextLifeCol);
        var nlb = ease(1-(game.time - game.timer) / game.map.styles.nextLifeTime);
        ctx.fillRect(game.map.image.width / 2 - nlb * (game.map.image.width / 3),game.map.image.height -10,nlb * (game.map.image.width / 3) * 2,5);
        if(game.time - game.timer > game.map.styles.nextLifeTime){
            game.currentState = game.play;
            
        }
    },
    gameOver(){
        game.map.showMap();
        game.player.update(game);
        game.map.drawText(game.map.styles.gameOverMessage,game.map.styles.gameOverFont,game.map.styles.gameOverCol);
        game.map.drawText("Any key to restart","26px arial",game.map.styles.gameOverCol,game.map.image.height *0.8);
        if(game.keys.anyKey){
            game.keys.anyKey = false;
            game.level = 0;
            game.map.init(levels[game.level]);
            game.currentState = game.pressToStart;
            game.keys.anyKey = false;
            game.player.nextLife(game);
            game.ghosts.eachItem(g => { g.restart(game) });
        }
    },    
    
    start(){
        if(game.keys === null) { game.keys = keyboard.start() }
        if(game.map === null) { 
            game.map = createMap().init(levels[game.level]);
        }
        game.keys.anyKey = false;
        game.currentState = game.pressToStart;
        
        
    }
}

var cheats = 0;
keyboard.addCallback("KeyD",()=>{
    cheats += 1;
    if(cheats === 4){
        log("Cheats on.");
        log(`
K: No get killed.
R: Turn on debug info.
Q: Run at 1/4th speed.
T: kill all ghosts.
E: Trigger end of level.
L: Goto next level.
Esc : restart.
        `);
        function gotoLevel(lev){
          game.player = null;
          game.level = lev % levels.length;
          game.map = null;
          game.ghosts.items.length = 0;
          game.currentState = game.start;
          console.log("Forced restart");
        }
        keyboard.addCallback("KeyK",()=> game.noKill = !game.noKill);
        keyboard.addCallback("KeyR",()=> game.debug = !game.debug);
        keyboard.addCallback("KeyE",()=> game.player.levelComplete());
        keyboard.addCallback("KeyQ",()=> game.runSlow = !game.runSlow);
        keyboard.addCallback("KeyT",()=> game.ghosts.call("kill"));
        keyboard.addCallback("KeyL",()=> gotoLevel(game.level + 1));
        keyboard.addCallback("Escape",()=> gotoLevel(0) );
    }
})

positionCanvas();
game.start();
game.time = 0;
game.update();
requestAnimationFrame(mainLoop);



