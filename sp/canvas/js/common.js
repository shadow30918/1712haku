var HaKuGame = HaKuGame || {};
/*
$(document).ready(function(){
   HaKuGame.createCanvas();
   $('div.canvasContainer').append('<video id="Video" width="1090" height="1800" playsinline preload="auto"><source src="canvas_video/end.mp4" type="video/mp4"><source src="canvas_video/end.webm" type="video/webm"><source src="canvas_video/end.ogv" type="video/ogv">您的瀏覽器不支援html5 video播放</video>');
});*/

$('.game-img').click(function(){
   
   if(!$('div.canvasContainer').hasClass("loadCanvas")){
      HaKuGame.createCanvas();
      $('div.canvasContainer').addClass("loadCanvas");
      $('div.canvasContainer').append('<video id="Video" width="1090" height="1800" playsinline preload="auto"><source src="canvas_video/end.mp4" type="video/mp4"><source src="canvas_video/end.webm" type="video/webm"><source src="canvas_video/end.ogv" type="video/ogv">您的瀏覽器不支援html5 video播放</video>');
   }
   var winW = $(window).width();
   if(winW < 767){
     var sScale = (winW/1090) * 0.8;
     var canvasScale = 'translate(-50%,-50%)' + 'scale('+ sScale + ')';

     $('.canvasContainer').css('transform',canvasScale);
   }else {
     var sScale = (winW/1090) * 0.7;
     var canvasScale = 'translate(-50%,-50%)' + 'scale('+ sScale + ')';

     $('.canvasContainer').css('transform',canvasScale);
   }
});

HaKuGame = {
   canvasWidth: 1090,
   canvasHeight: 1800,

   nowGame:0,  //目前在那一個遊戲(0=尚未開始, 1=game_1, 2=game_2)
   timer:null, //計時用 timer

   countdown_totalTime:3,   //倒數計時用
   countdown_remainTime:0,

   game_1_totalTime:30, //第 1 關
   game_1_remainTime:0,
   game_1_deleteSpot:0,   //要消掉的數量
   game_2_totalTime:20, //第 2 關
   game_2_remainTime:0,
   game_2_deletePart:0,   //要消掉的數量

   renderer:null,
   assetsLoadingLoader:null,
   assetsLoader:null,
   loadingFinish:0,  //判斷載入畫面是否己顯示
   arrContainer:['game_2_container', 'game_1_container', 'countdown_container', 'curtain_container', 'opening_container', 'end_container', 'help_container', 'loading_container'],  //all container
   stage_container:null,
   stage:{
      bg:null,
      game_2_container:null,
      game_2: {
         title:null,
         face:null,
         count_num:null,
         part_container:null,
         part:{
            head:null,
            nose:null,
            chin:null,
            cheek_l:null,
            cheek_r:null
         },
         light_container:null,
         light:{
            head:null,
            nose:null,
            chin:null,
            cheek_l:null,
            cheek_r:null
         },
         oil_container:null,
         oil: {
            head:null,
            nose:null,
            chin:null,
            cheek_l:null,
            cheek_r:null
         },
         cursor:null,
         failure_container:null,
         failure:{
            face_bad:null,
            bu_again:null
         },
         success_container:null,
         success:{
            face_good:null,
            star_container:null,
            bu_finish:null,
            star:{
               star_1:null,
               star_2:null,
               star_3:null,
               star_4:null
            }
         }
      },
      game_1_container:null,
      game_1:{
         title:null,
         face:null,
         count_num_1:null,
         count_num_2:null,
         spot_container:null,
         spot:{
            spot_1:null,
            spot_2:null,
            spot_3:null,
            spot_4:null,
            spot_5:null,
            spot_6:null,
            spot_7:null,
            spot_8:null,
            spot_9:null,
            spot_10:null,
            spot_11:null,
            spot_12:null,
            spot_13:null,
            spot_14:null,
            spot_15:null,
            spot_16:null,
            spot_17:null,
            spot_18:null,
            spot_19:null,
            spot_20:null
         },
         lotion_container:null,
         lotion:{
            lotion_1:null,
            lotion_2:null,
            lotion_3:null,
            lotion_4:null,
            lotion_5:null,
            lotion_6:null,
            lotion_7:null,
            lotion_8:null,
            lotion_9:null,
            lotion_10:null,
            lotion_11:null,
            lotion_12:null,
            lotion_13:null,
            lotion_14:null,
            lotion_15:null,
            lotion_16:null,
            lotion_17:null,
            lotion_18:null,
            lotion_19:null,
            lotion_20:null
         },
         cursor:null,
         failure_container:null,
         failure:{
            face_bad:null,
            bu_again:null
         },
         success_container:null,
         success:{
            face_good:null,
            star_container:null,
            star:{
               star_1:null,
               star_2:null,
               star_3:null,
               star_4:null
            },
            bu_next:null
         }
      },
      countdown_container:null,
      countdown:{
         mask:null,
         count_num:null
      },
      curtain_container:null,
      curtain:{
         mask:null,
         curtain_r:null,
         curtain_l:null
      },
      opening_container:null,
      opening:{
         title:null,
         star_container:null,
         star:{
            star_1:null,
            star_2:null,
            star_3:null,
            star_4:null
         },
         cloud:null,
         haku:null,
         bu_start:null
      },
      end_container:null,
      end:{
        // video:null,
         finalcut_container:null,
         finalcut:{
            promo:null,
            haku:null,
            cloud:null,
            bu_restart:null,
            bu_try:null
         }
      },
      help_container:null,
      help:{
         mask:null,
         haku:null,
         cloud:null,
         bu_know:null
      },
      loading_container:null,
      loading:{
         title:null,
         percent_b:null,
         percent_t:null
      }
   },


   createCanvas: function() {
      this.renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight, {antialias: true, transparent: false, resolution: 1});
      $('div.canvasContainer').append(this.renderer.view);

      this.stage_container = new PIXI.Container();
      this.loadCanvasAssets();
   },
   loadCanvasAssets: function() {
      _this=this;

      //loading 畫面所需元件
      assetsLoadingLoader = new PIXI.loaders.Loader();
      assetsLoadingLoader.add('bg', 'canvas_img/bg.jpg')
                         .add('title','canvas_img/title.png');            //common (loading, opening)
      assetsLoadingLoader.on("progress", function(target, resource) {
         //console.log("loading progress: " + target.progress + "%");
         //console.log("loading loading: " + resource.name);
      });
      assetsLoadingLoader.once('complete', function(target, resource) {  //loading 完全載入
         //先把 loading 畫面顯示出來
            _this.placeAsset(_this.stage_container, 'bg', {w:1090,h:1800}, {x:0,y:0});
            _this.stage.loading_container = new PIXI.Container();

            _this.initLoading();
            _this.stage_container.addChild(_this.stage.loading_container).name='loading_container';

            //把 loading 畫面 render 岀來
            _this.renderer.render(_this.stage_container);
            _this.loadingFinish=1;
      });


      assetsLoadingLoader.load();

      //其他所有畫面所需元件
      assetsLoader = new PIXI.loaders.Loader();
      assetsLoader.add('bg', 'canvas_img/bg.jpg')
                  .add('title','canvas_img/title.png')            //common (loading, opening)
                  .add('star','canvas_img/star.png')              //common
                  .add('spot','canvas_img/game_1_spot.png')       //common
                  .add('lotion','canvas_img/game_1_lotion.png')   //common
                  .add('oil','canvas_img/game_2_oil.png')         //common
                  .add('bu_again','canvas_img/bu_again.png')      //common
                  .add('face','canvas_img/game_face.png')         //common (game_1, game_2)
                  .add('haku','canvas_img/haku_1.png')            //common (opening, help)
                  .add('g2.title','canvas_img/game_2_title.png')
                  .add('g2.count_num','canvas_img/game_2_count_num.png')
                  .add('g2.part.head','canvas_img/game_2_part_head.png')
                  .add('g2.part.nose','canvas_img/game_2_part_nose.png')
                  .add('g2.part.chin','canvas_img/game_2_part_chin.png')
                  .add('g2.part.cheek_l','canvas_img/game_2_part_cheek_l.png')
                  .add('g2.part.cheek_r','canvas_img/game_2_part_cheek_r.png')
                  .add('g2.light.head','canvas_img/game_2_light_head.png')
                  .add('g2.light.nose','canvas_img/game_2_light_nose.png')
                  .add('g2.light.chin','canvas_img/game_2_light_chin.png')
                  .add('g2.light.cheek_l','canvas_img/game_2_light_cheek_l.png')
                  .add('g2.light.cheek_r','canvas_img/game_2_light_cheek_r.png')
                  .add('g2.cursor','canvas_img/game_2_cursor.png')
                  .add('g2.failure.face_bad','canvas_img/game_2_face_bad.png')
                  .add('g2.success.face_good','canvas_img/game_2_face_good.png')
                  .add('g2.success.bu_finish','canvas_img/bu_finish.png')
                  .add('g1.title','canvas_img/game_1_title.png')
                  .add('g1.count_num_1','canvas_img/game_1_count_num_1.png')
                  .add('g1.count_num_2','canvas_img/game_1_count_num_2.png')
                  .add('g1.cursor','canvas_img/game_1_cursor.png')
                  .add('g1.failure.face_bad','canvas_img/game_1_face_bad.png')
                  .add('g1.success.face_good','canvas_img/game_1_face_good.png')
                  .add('g1.success.bu_next','canvas_img/bu_next.png')
                  .add('countdown.count_num','canvas_img/count_num.png')
                  .add('curtain.curtain_r','canvas_img/curtain_r.jpg')
                  .add('curtain.curtain_l','canvas_img/curtain_l.jpg')
                  .add('opening.bu_start','canvas_img/bu_start.png')
                  .add('opening.cloud','canvas_img/add_cloud.png')
                  .add('end.finalcut.promo','canvas_img/add_promo.png')
                  .add('end.finalcut.haku','canvas_img/haku_2.png')
                  .add('end.finalcut.cloud','canvas_img/cloud_2.png')
                  .add('end.finalcut.bu_restart','canvas_img/bu_restart.png')
                  .add('end.finalcut.bu_try','canvas_img/bu_try.png')
                  .add('help.cloud','canvas_img/cloud_1.png')
                  .add('help.bu_know','canvas_img/bu_know.png');

      assetsLoader.on("progress", function(target, resource) {
         //console.log("progress: " + target.progress + "%");
         //console.log("loading: " + resource.name);

         if (_this.loadingFinish===1) {   //確定 loading 畫面己有, 才能開始跟載入進度
            _this.loadBarProgress(target.progress);
         }
      });

      _this=this;
      assetsLoader.once('complete', function(target, resource) {  //完全載入
         //依照載入順序決定 Z-index (愈前面愈底)
         //跟 loading 有關的都往前移
         //_this.placeAsset(_this.stage_container, 'bg', {w:1090,h:1800}, {x:0,y:0});
         _this.stage.game_2_container = new PIXI.Container();
         _this.stage.game_2.part_container = new PIXI.Container();
         _this.stage.game_2.light_container = new PIXI.Container();
         _this.stage.game_2.oil_container = new PIXI.Container();
         _this.stage.game_2.failure_container = new PIXI.Container();
         _this.stage.game_2.success_container = new PIXI.Container();
         _this.stage.game_2.success.star_container = new PIXI.Container();

         _this.stage.game_1_container = new PIXI.Container();
         _this.stage.game_1.spot_container = new PIXI.Container();
         _this.stage.game_1.lotion_container = new PIXI.Container();
         _this.stage.game_1.failure_container = new PIXI.Container();
         _this.stage.game_1.success_container = new PIXI.Container();
         _this.stage.game_1.success.star_container = new PIXI.Container();

         _this.stage.countdown_container = new PIXI.Container();
         _this.stage.curtain_container = new PIXI.Container();

         _this.stage.opening_container = new PIXI.Container();
         _this.stage.opening.star_container = new PIXI.Container();

         _this.stage.end_container = new PIXI.Container();
         _this.stage.end.finalcut_container = new PIXI.Container();

         _this.stage.help_container = new PIXI.Container();
         //_this.stage.loading_container = new PIXI.Container();

         //default ==> all container hide, only loading_container show
         _this.hideContainer(['loading_container']);

         //init Container
         //_this.initLoading();
         _this.initOpening();
         _this.initCurtain();
         _this.initHelp();
         _this.initCountdown();
         _this.initEnd();
         _this.initGame_1();
         _this.initGame_2();

         _this.stage_container.addChild(_this.stage.game_2_container).name='game_2_container';
         _this.stage.game_2_container.addChild(_this.stage.game_2.part_container).name='game_2.part_container';
         _this.stage.game_2_container.addChild(_this.stage.game_2.light_container).name='game_2.light_container';
         _this.stage.game_2_container.addChild(_this.stage.game_2.oil_container).name='game_2.oil_container';
         _this.stage.game_2_container.addChild(_this.stage.game_2.failure_container).name='game_2.failure_container';
         _this.stage.game_2_container.addChild(_this.stage.game_2.success_container).name='game_2.success_container';
         _this.stage.game_2.success_container.addChild(_this.stage.game_2.success.star_container).name='game_2.success.star_container';

         _this.stage_container.addChild(_this.stage.game_1_container).name='game_1_container';
         _this.stage.game_1_container.addChild(_this.stage.game_1.spot_container).name='game_1.spot_container';
         _this.stage.game_1_container.addChild(_this.stage.game_1.lotion_container).name='game_1.lotion_container';
         _this.stage.game_1_container.addChild(_this.stage.game_1.failure_container).name='game_1.failure_container';
         _this.stage.game_1_container.addChild(_this.stage.game_1.success_container).name='game_1.success_container';
         _this.stage.game_1.success_container.addChild(_this.stage.game_1.success.star_container).name='game_1.success.star_container';

         _this.stage_container.addChild(_this.stage.countdown_container).name='countdown_container';
         _this.stage_container.addChild(_this.stage.curtain_container).name='curtain_container';

         _this.stage_container.addChild(_this.stage.opening_container).name='opening_container';
         _this.stage.opening_container.addChild(_this.stage.opening.star_container).name='opening.star_container';

         _this.stage_container.addChild(_this.stage.end_container).name='end_container';
         _this.stage.end_container.addChild(_this.stage.end.finalcut_container).name='end.finalcut_container';

         _this.stage_container.addChild(_this.stage.help_container).name='help_container';
         //_this.stage_container.addChild(_this.stage.loading_container).name='loading_container';

         //show opening container
         _this.playOpening();

         //loop game
         _this.gameLoop();
      });

      assetsLoader.load();
   },
   loadBarProgress: function(progress) {
      var index=this.stage.loading_container.getChildIndex(this.stage.loading.percent_t);
      this.stage.loading_container.removeChildAt(index);

      //total width=800
      this.stage.loading.percent_t = this.placeRect(this.stage.loading_container, {w:progress*8,h:80}, {x:145,y:1000}, 0xFFFF00);

      //把 loading 畫面 render 岀來
      _this.renderer.render(_this.stage_container);
   },
   gameLoop: function() {
      requestAnimationFrame(this.gameLoop.bind(this));

      var arrSprite=[];
      for (var i=0; i<this.arrContainer.length; i++) {
         if (this.stage[this.arrContainer[i]].visible===true) {
            var container=this.stage[this.arrContainer[i]];
            var sprite=null;
            for (var j=0; j<container.children.length; j++) {
               if (typeof container.children[j].name !== 'undefined' && container.children[j].name!=null) {
                  if (container.children[j].name.indexOf('container')!==-1) {  //container
                     for (var k=0; k<container.children[j].children.length; k++) {
                        if (container.children[j].children[k].name.indexOf('container')!=-1) {  //container
                           for (var l=0; l<container.children[j].children[k].children.length; l++) {  //only sprite
                              arrSprite.push(container.children[j].children[k].children[l]);
                           }
                        } else { //sprite
                           arrSprite.push(container.children[j].children[k]);
                        }
                     }
                  } else { //sprite
                     arrSprite.push(container.children[j]);
                  }
               }
            }
         }
      }

      for (i=0; i<arrSprite.length; i++) {
         if (arrSprite[i].visible===true) {
            if (typeof arrSprite[i].isMove !== "undefined" && arrSprite[i].isMove!=null && arrSprite[i].isMove===1) {
               this.effMove(arrSprite[i]);
            }
            if (typeof arrSprite[i].isScale !== "undefined" && arrSprite[i].isScale!=null && arrSprite[i].isScale===1) {
               this.effScale(arrSprite[i]);
            }
            if (typeof arrSprite[i].isAlpha !== "undefined" && arrSprite[i].isAlpha!=null && arrSprite[i].isAlpha===1) {
               this.effAlpha(arrSprite[i]);
            }
         }
      }

      //render the root container
      this.renderer.render(this.stage_container);
   },
   initLoading: function() {
      this.stage.loading.title = this.placeAsset(this.stage.loading_container, 'title', {w:1058,h:330}, {x:15,y:594});
      this.stage.loading.percent_b = this.placeRect(this.stage.loading_container, {w:800,h:80}, {x:145,y:1000}, 0x000000);
      this.stage.loading.percent_t = this.placeRect(this.stage.loading_container, {w:0,h:80}, {x:145,y:1000}, 0xFFFF00);
   },
   initOpening: function() {
      this.stage.opening.title = this.placeAsset(this.stage.opening_container, 'title', {w:1058,h:330}, {x:15,y:594});
      this.stage.opening.star.star_1 = this.placeAsset(this.stage.opening.star_container, 'star', {w:59,h:59}, {x:46,y:874}, {}, {isScale:1,scale:1,vScale:0.04,minScale:0.2,maxScale:1,pivot:'cc'});
      this.stage.opening.star.star_2 = this.placeAsset(this.stage.opening.star_container, 'star', {w:59,h:59}, {x:96,y:917}, {}, {isScale:1,scale:0.5,vScale:0.05,minScale:0.2,maxScale:1,pivot:'cc'});
      this.stage.opening.star.star_3 = this.placeAsset(this.stage.opening.star_container, 'star', {w:59,h:59}, {x:1010,y:710}, {}, {isScale:1,scale:1,vScale:0.04,minScale:0.2,maxScale:1,pivot:'cc'});
      this.stage.opening.star.star_4 = this.placeAsset(this.stage.opening.star_container, 'star', {w:59,h:59}, {x:1057,y:760}, {}, {isScale:1,scale:0.5,vScale:0.05,minScale:0.2,maxScale:1,pivot:'cc'});
      this.stage.opening.cloud = this.placeAsset(this.stage.opening_container, 'opening.cloud', {w:794,h:483}, {x:165,y:1300}, {isMove:0,vX:-2,vY:-2, limitVW:1000,limitVH:100}, {}, {isAlpha:0,alpha:0,vAlpha:0.025});
      this.stage.opening.haku = this.placeAsset(this.stage.opening_container, 'haku', {w:529,h:787}, {x:629,y:1100}, {isMove:1,vX:0,vY:2,limitVW:0,limitVH:60});
      this.stage.opening.bu_start = this.placeButton(this.stage.opening_container, 'opening.bu_start', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:745,h:204}, {x:184,y:968});
   },
   initCurtain: function() {
      this.stage.curtain.mask = this.placeRect(this.stage.curtain_container, {w:1090,h:1800}, {x:0,y:0}, 0x000000, 0.5);
      this.stage.curtain.curtain_r = this.placeAsset(this.stage.curtain_container, 'curtain.curtain_r', {w:706,h:1800}, {x:384,y:0}, {isMove:0,vX:10,vY:0,limitVW:1500,limitVH:0});
      this.stage.curtain.curtain_l = this.placeAsset(this.stage.curtain_container, 'curtain.curtain_l', {w:679,h:1800}, {x:0,y:0}, {isMove:0,vX:-10,vY:0,limitVW:1500,limitVH:0});
   },
   initHelp: function() {
      this.stage.help.mask = this.placeRect(this.stage.help_container, {w:1090,h:1800}, {x:0,y:0}, 0x000000, 0.5);
      this.stage.help.haku = this.placeAsset(this.stage.help_container, 'haku', {w:529,h:787}, {x:629,y:1100}, {isMove:1,vX:0,vY:2,limitVW:0,limitVH:60});
      this.stage.help.cloud = this.placeAsset(this.stage.help_container, 'help.cloud', {w:1046,h:629}, {x:40,y:650}, {isMove:0,vX:0,vY:-2, limitVW:0,limitVH:100}, {}, {isAlpha:0,alpha:0,vAlpha:0.025}, {frameW:1046, frameH:629, frameX:0, frameY:0});
      this.stage.help.bu_know = this.placeButton(this.stage.help_container, 'help.bu_know', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:308,h:92}, {x:-200,y:-200});   //跟著 cloud 走

   },
   initCountdown: function() {
      this.stage.countdown.mask = this.placeRect(this.stage.countdown_container, {w:1090,h:1800}, {x:0,y:0}, 0x000000, 0.5);
      this.stage.countdown.count_num = this.placeAsset(this.stage.countdown_container, 'countdown.count_num', {w:1090,h:1800}, {x:0,y:0}, {}, {}, {}, {frameW:1090, frameH:1800, frameX:0, frameY:0});
   },
   initEnd: function() {
      this.stage.end.finalcut.promo = this.placeAsset(this.stage.end.finalcut_container, 'end.finalcut.promo', {w:832,h:243}, {x:180,y:815});
      this.stage.end.finalcut.haku = this.placeAsset(this.stage.end.finalcut_container, 'end.finalcut.haku', {w:534,h:746}, {x:635,y:1158}, {isMove:1,vX:0,vY:0.5,limitVW:0,limitVH:50});
      this.stage.end.finalcut.cloud = this.placeAsset(this.stage.end.finalcut_container, 'end.finalcut.cloud', {w:1046,h:629}, {x:177,y:421}, {isMove:0,vX:-3,vY:-2, limitVW:1000,limitVH:100}, {}, {isAlpha:0,alpha:0,vAlpha:0.025}, {frameW:1046, frameH:629, frameX:0, frameY:0});
      this.stage.end.finalcut.bu_restart = this.placeButton(this.stage.end.finalcut_container, 'end.finalcut.bu_restart', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:378,h:81}, {x:357,y:1255});
      this.stage.end.finalcut.bu_try = this.placeButton(this.stage.end.finalcut_container, 'end.finalcut.bu_try', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:727,h:198}, {x:182,y:1039});

      this.stage.end.finalcut_container.visible=false;
   },
   initGame_1: function() {
      this.stage.game_1.face = this.placeAsset(this.stage.game_1_container, 'face', {w:1090,h:1800}, {x:0,y:0});
      this.stage.game_1.title = this.placeAsset(this.stage.game_1_container, 'g1.title', {w:1090,h:1800}, {x:0,y:0});
      this.stage.game_1.count_num_1 = this.placeAsset(this.stage.game_1_container, 'g1.count_num_1', {w:270,h:272}, {x:13,y:9}, {}, {}, {}, {frameW:270, frameH:272, frameX:0, frameY:0});
      this.stage.game_1.count_num_2 = this.placeAsset(this.stage.game_1_container, 'g1.count_num_2', {w:270,h:272}, {x:13,y:9}, {}, {}, {}, {frameW:270, frameH:272, frameX:0, frameY:0});

      this.stage.game_1.count_num_2.visible=false;

      this.stage.game_1.spot.spot_1 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:185,y:833}, false, 1);
      this.stage.game_1.spot.spot_2 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:272,y:868}, false, 2);
      this.stage.game_1.spot.spot_3 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:368,y:880}, false, 3);
      this.stage.game_1.spot.spot_4 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:190,y:928}, false, 4);
      this.stage.game_1.spot.spot_5 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:294,y:936}, false, 5);
      this.stage.game_1.spot.spot_6 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:400,y:936}, false, 6);
      this.stage.game_1.spot.spot_7 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:205,y:998}, false, 7);
      this.stage.game_1.spot.spot_8 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:273,y:1003}, false, 8);
      this.stage.game_1.spot.spot_9 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:363,y:1020}, false, 9);
      this.stage.game_1.spot.spot_10 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:255,y:1080}, false, 10);
      this.stage.game_1.spot.spot_11 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:651,y:880}, false, 11);
      this.stage.game_1.spot.spot_12 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:745,y:870}, false, 12);
      this.stage.game_1.spot.spot_13 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:838,y:836}, false, 13);
      this.stage.game_1.spot.spot_14 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:619,y:938}, false, 14);
      this.stage.game_1.spot.spot_15 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:720,y:938}, false, 15);
      this.stage.game_1.spot.spot_16 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:828,y:930}, false, 16);
      this.stage.game_1.spot.spot_17 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:651,y:1024}, false, 17);
      this.stage.game_1.spot.spot_18 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:747,y:1002}, false, 18);
      this.stage.game_1.spot.spot_19 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:812,y:997}, false, 19);
      this.stage.game_1.spot.spot_20 = this.placeButton(this.stage.game_1.spot_container, 'spot', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:90,h:90}, {x:759,y:1080}, false, 20);

      this.stage.game_1.spot_container.visible=false;

      this.stage.game_1.lotion.lotion_1 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:195,y:794}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 1);
      this.stage.game_1.lotion.lotion_2 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:282,y:829}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 2);
      this.stage.game_1.lotion.lotion_3 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:378,y:840}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 3);
      this.stage.game_1.lotion.lotion_4 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:200,y:889}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 4);
      this.stage.game_1.lotion.lotion_5 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:304,y:897}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 5);
      this.stage.game_1.lotion.lotion_6 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:410,y:897}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 6);
      this.stage.game_1.lotion.lotion_7 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:215,y:959}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 7);
      this.stage.game_1.lotion.lotion_8 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:283,y:964}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 8);
      this.stage.game_1.lotion.lotion_9 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:373,y:980}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 9);
      this.stage.game_1.lotion.lotion_10 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:265,y:1040}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 10);
      this.stage.game_1.lotion.lotion_11 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:661,y:841}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 11);
      this.stage.game_1.lotion.lotion_12 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:755,y:831}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 12);
      this.stage.game_1.lotion.lotion_13 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:848,y:797}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 13);
      this.stage.game_1.lotion.lotion_14 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:629,y:899}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 14);
      this.stage.game_1.lotion.lotion_15 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:730,y:899}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 15);
      this.stage.game_1.lotion.lotion_16 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:838,y:890}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 16);
      this.stage.game_1.lotion.lotion_17 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:661,y:985}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 17);
      this.stage.game_1.lotion.lotion_18 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:757,y:963}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 18);
      this.stage.game_1.lotion.lotion_19 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:822,y:958}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 19);
      this.stage.game_1.lotion.lotion_20 = this.placeAsset(this.stage.game_1.lotion_container, 'lotion',  {w:54,h:71}, {x:769,y:1040}, {isMove:0, vX:-1, vY:1, limitVW:10, limitVH:10}, {}, {isAlpha:0, alpha:0, vAlpha:0.02}, {}, false, 20);

      //failure
      this.stage.game_1.failure.face_bad=this.placeAsset(this.stage.game_1.failure_container, 'g1.failure.face_bad', {w:1090,h:1800}, {x:0,y:0});
      this.stage.game_1.failure.bu_again = this.placeButton(this.stage.game_1.failure_container, 'bu_again', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:393,h:127}, {x:638,y:1433});

      this.stage.game_1.failure_container.visible=false;

      //success
      this.stage.game_1.success.face_good=this.placeAsset(this.stage.game_1.success_container, 'g1.success.face_good', {w:1090,h:1800}, {x:0,y:0});

      this.stage.game_1.success.star.star_1 = this.placeAsset(this.stage.game_1.success.star_container, 'star', {w:59,h:59}, {x:95,y:1100}, {}, {isScale:1,scale:1,vScale:0.04,minScale:0.2,maxScale:1,pivot:'cc'});
      this.stage.game_1.success.star.star_2 = this.placeAsset(this.stage.game_1.success.star_container, 'star', {w:59,h:59}, {x:152,y:1157}, {}, {isScale:1,scale:0.5,vScale:0.05,minScale:0.2,maxScale:1,pivot:'cc'});
      this.stage.game_1.success.star.star_3 = this.placeAsset(this.stage.game_1.success.star_container, 'star', {w:59,h:59}, {x:960,y:578}, {}, {isScale:1,scale:1,vScale:0.04,minScale:0.2,maxScale:1,pivot:'cc'});
      this.stage.game_1.success.star.star_4 = this.placeAsset(this.stage.game_1.success.star_container, 'star', {w:59,h:59}, {x:1010,y:640}, {}, {isScale:1,scale:0.5,vScale:0.05,minScale:0.2,maxScale:1,pivot:'cc'});

      this.stage.game_1.success.bu_next = this.placeButton(this.stage.game_1.success_container, 'g1.success.bu_next', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:399,h:500}, {x:669,y:1431});

      this.stage.game_1.success_container.visible=false;

      //cursor
      this.stage.game_1.cursor = this.placeAsset(this.stage.game_1_container, 'g1.cursor', {w:356,h:462}, {x:712,y:1319});

      this.stage.game_1.cursor.visible=false;

      //define the cursor status
      this.stage.game_1_container.status='stop';
   },
   initGame_2: function() {
      this.stage.game_2.face = this.placeAsset(this.stage.game_2_container, 'face', {w:1090,h:1800}, {x:0,y:0});
      this.stage.game_2.title = this.placeAsset(this.stage.game_2_container, 'g2.title', {w:1090,h:1800}, {x:0,y:0});
      this.stage.game_2.count_num = this.placeAsset(this.stage.game_2_container, 'g2.count_num', {w:270,h:272}, {x:13,y:9}, {}, {}, {}, {frameW:270, frameH:272, frameX:0, frameY:0});

      //part
      this.stage.game_2.part.head = this.placeButton(this.stage.game_2.part_container, 'g2.part.head', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:595,h:291}, {x:253,y:409}, false);
      this.stage.game_2.part.nose = this.placeButton(this.stage.game_2.part_container, 'g2.part.nose', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:80,h:371}, {x:516,y:696}, false);
      this.stage.game_2.part.chin = this.placeButton(this.stage.game_2.part_container, 'g2.part.chin', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:234,h:125}, {x:444,y:1256}, false);
      this.stage.game_2.part.cheek_l = this.placeButton(this.stage.game_2.part_container, 'g2.part.cheek_l', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:230,h:340}, {x:210,y:885}, false);
      this.stage.game_2.part.cheek_r = this.placeButton(this.stage.game_2.part_container, 'g2.part.cheek_r', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:230,h:340}, {x:662,y:885}, false);

      this.stage.game_2.part_container.visible=false;

      //light
      this.stage.game_2.light.head = this.placeAsset(this.stage.game_2.light_container, 'g2.light.head', {w:922,h:864}, {x:82,y:124}, {}, {}, {isAlpha:0, alpha:0, vAlpha:0.02},{},false);
      this.stage.game_2.light.nose = this.placeAsset(this.stage.game_2.light_container, 'g2.light.nose', {w:815,h:536}, {x:151,y:620}, {}, {}, {isAlpha:0, alpha:0, vAlpha:0.02},{},false);
      this.stage.game_2.light.chin = this.placeAsset(this.stage.game_2.light_container, 'g2.light.chin', {w:1090,h:765}, {x:0,y:1034}, {}, {}, {isAlpha:0, alpha:0, vAlpha:0.02},{},false);
      this.stage.game_2.light.cheek_l = this.placeAsset(this.stage.game_2.light_container, 'g2.light.cheek_l', {w:468,h:741}, {x:85,y:606}, {}, {}, {isAlpha:0, alpha:0, vAlpha:0.02},{},false);
      this.stage.game_2.light.cheek_r = this.placeAsset(this.stage.game_2.light_container, 'g2.light.cheek_r', {w:440,h:696}, {x:567,y:641}, {}, {}, {isAlpha:0, alpha:0, vAlpha:0.02},{},false);

      //oil
      this.stage.game_2.oil.head = this.placeAsset(this.stage.game_2.oil_container, 'oil', {w:92,h:127}, {x:0,y:0}, {}, {isScale:0,scale:0,vScale:0.05,minScale:1,maxScale:1,pivot:'cc'},{isAlpha:0,alpha:1,vAlpha:-0.1},{},false);
      this.stage.game_2.oil.nose = this.placeAsset(this.stage.game_2.oil_container, 'oil', {w:92,h:127}, {x:0,y:0}, {}, {isScale:0,scale:0,vScale:0.05,minScale:1,maxScale:1,pivot:'cc'},{isAlpha:0,alpha:1,vAlpha:-0.1},{},false);
      this.stage.game_2.oil.chin = this.placeAsset(this.stage.game_2.oil_container, 'oil', {w:92,h:127}, {x:0,y:0}, {}, {isScale:0,scale:0,vScale:0.05,minScale:1,maxScale:1,pivot:'cc'},{isAlpha:0,alpha:1,vAlpha:-0.1},{},false);
      this.stage.game_2.oil.cheek_l = this.placeAsset(this.stage.game_2.oil_container, 'oil', {w:92,h:127}, {x:0,y:0}, {}, {isScale:0,scale:0,vScale:0.05,minScale:1,maxScale:1,pivot:'cc'},{isAlpha:0,alpha:1,vAlpha:-0.1},{},false);
      this.stage.game_2.oil.cheek_r = this.placeAsset(this.stage.game_2.oil_container, 'oil', {w:92,h:127}, {x:0,y:0}, {}, {isScale:0,scale:0,vScale:0.05,minScale:1,maxScale:1,pivot:'cc'},{isAlpha:0,alpha:1,vAlpha:-0.1},{},false);

      //failure
      this.stage.game_2.failure.face_bad=this.placeAsset(this.stage.game_2.failure_container, 'g2.failure.face_bad', {w:1090,h:1800}, {x:0,y:0});
      this.stage.game_2.failure.bu_again = this.placeButton(this.stage.game_2.failure_container, 'bu_again', {imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:393,h:127}, {x:638,y:1433});

      this.stage.game_2.failure_container.visible=false;

      //success
      this.stage.game_2.success.face_good=this.placeAsset(this.stage.game_2.success_container, 'g2.success.face_good', {w:1090,h:1800}, {x:0,y:0});

      this.stage.game_2.success.star.star_1 = this.placeAsset(this.stage.game_2.success.star_container, 'star', {w:59,h:59}, {x:95,y:1100}, {}, {isScale:1,scale:1,vScale:0.04,minScale:0.2,maxScale:1,pivot:'cc'});
      this.stage.game_2.success.star.star_2 = this.placeAsset(this.stage.game_2.success.star_container, 'star', {w:59,h:59}, {x:152,y:1157}, {}, {isScale:1,scale:0.5,vScale:0.05,minScale:0.2,maxScale:1,pivot:'cc'});
      this.stage.game_2.success.star.star_3 = this.placeAsset(this.stage.game_2.success.star_container, 'star', {w:59,h:59}, {x:960,y:578}, {}, {isScale:1,scale:1,vScale:0.04,minScale:0.2,maxScale:1,pivot:'cc'});
      this.stage.game_2.success.star.star_4 = this.placeAsset(this.stage.game_2.success.star_container, 'star', {w:59,h:59}, {x:1010,y:640}, {}, {isScale:1,scale:0.5,vScale:0.05,minScale:0.2,maxScale:1,pivot:'cc'});

      this.stage.game_2.success.bu_finish = this.placeButton(this.stage.game_2.success_container, 'g2.success.bu_finish',{imgX:0,imgY:0}, {imgOverX:0,imgOverY:0}, {w:399,h:500}, {x:669,y:1431});

      this.stage.game_2.success_container.visible=false;

      //cursor
      this.stage.game_2.cursor = this.placeAsset(this.stage.game_2_container, 'g2.cursor', {w:349,h:474}, {x:712,y:1313});

      this.stage.game_2.cursor.visible=false;

      //define the cursor status
      this.stage.game_2_container.status='stop';
   },
   placeRect: function(container, size, position, color, alpha) {
      alpha = (typeof alpha !== 'undefined') ?  alpha : 1;

      var graphics = new PIXI.Graphics();
      graphics.beginFill(color);    //color
      graphics.drawRect(position.x, position.y, size.w, size.h);
      graphics.endFill();

      graphics.alpha=alpha;

      container.addChild(graphics);
      return graphics;
   },
   placeAsset: function(container, assetID, size, position, move, scale, alpha, frame, visible, index) {
                        //container, assetID, size, position => 必填
                        //vx,vy = 移動的速度; limitVW,limitH = 上下左右動態的距離限制
                        //pivot = 縮放時, 中心點的位置 (lt=左上, ct=中上, rt=右上, lc=左中, cc=中中, rc=右中, lb=左下, cb=中下, rb=右下)
      if (typeof move === "undefined" || move === null || Object.keys(move).length===0) {
         move={isMove:0, vX:0, vY:0, limitVW:0, limitVH:0};
      }
      if (typeof scale === "undefined" || scale === null || Object.keys(scale).length===0) {
         scale={isScale:0, scale:1, vScale:0, minScale:0, maxScale:0, pivot:'lt'};
      }

      if (typeof alpha === "undefined" || alpha === null || Object.keys(alpha).length===0) {
         alpha={isAlpha:0, alpha:1, vAlpha:0};
      }

      index = (typeof index !== 'undefined') ?  index : 0;

      var texture = PIXI.Texture.fromImage(assetID);
      //spreadSheet image
      if (typeof frame !== "undefined" && frame !== null && Object.keys(frame).length>0) {
         var rect = new PIXI.Rectangle(frame.frameX, frame.frameY, frame.frameW, frame.frameH);
         texture.setFrame(rect);
      }

      visible = (typeof visible !== 'undefined') ?  visible : true;

      var sprite = new PIXI.Sprite(texture);

      sprite.position.set(position.x, position.y);
      sprite.oX=position.x;
      sprite.oY=position.y;
      sprite.width = size.w;
      sprite.height = size.h;
      sprite.isMove = move.isMove;
      sprite.vX = move.vX;
      sprite.vY = move.vY;
      sprite.limitLeft = position.x-move.limitVW;
      sprite.limitRight = position.x+move.limitVW;
      sprite.limitTop = position.y-move.limitVH;
      sprite.limitBottom = position.y+move.limitVH;
      sprite.isScale = scale.isScale;
      sprite.scale.set(scale.scale, scale.scale);
      sprite.vScale = scale.vScale;
      sprite.minScale = scale.minScale;
      sprite.maxScale = scale.maxScale;
      //pivot = 縮放時, 中心點的位置 (lt=左上, ct=中上, rt=右上, lc=左中, cc=中中, rc=右中, lb=左下, cb=中下, rb=右下)
      switch (scale.pivot) {
         case 'lt':
            sprite.pivot.set(0, 0);
            break;
         case 'ct':
            sprite.pivot.set(size.w/2, 0);
            break;
         case 'rt':
            sprite.pivot.set(size.w, 0);
            break;
         case 'lc':
            sprite.pivot.set(0, size.h/2);
            break;
         case 'cc':
            sprite.pivot.set(size.w/2, size.h/2);
            break;
         case 'rc':
            sprite.pivot.set(size.w, size.h/2);
            break;
         case 'lb':
            sprite.pivot.set(0, size.h);
            break;
         case 'cb':
            sprite.pivot.set(size.w/2, size.h);
            break;
         case 'rb':
            sprite.pivot.set(size.w, size.h);
            break;
      }
      sprite.isAlpha=alpha.isAlpha;
      sprite.alpha=alpha.alpha;
      sprite.vAlpha=alpha.vAlpha;
      sprite.visible=visible;
      sprite.index=index;
      sprite.name=assetID;

      container.addChild(sprite);
      return sprite;
   },
   placeAsset_setFrame: function(sprite, frame) {
      var rect = new PIXI.Rectangle(frame.frameX, frame.frameY, frame.frameW, frame.frameH);
      sprite.texture.setFrame(rect);
   },
   placeButton: function(container, assetID, imgUp, imgOver, size, position, buttonMode, index) {
      buttonMode = (typeof buttonMode !== 'undefined') ?  buttonMode : true;
      index = (typeof index !== 'undefined') ?  index : 0;

      var rectUp = new PIXI.Rectangle(imgUp.imgX, imgUp.imgY, size.w, size.h);
      var rectOver = new PIXI.Rectangle(imgOver.imgOverX, imgOver.imgOverY, size.w, size.h);
      var texture = PIXI.Texture.fromImage(assetID);
      texture.setFrame(rectUp);

      var buSprite = new PIXI.Sprite(texture);

      buSprite.position.x = position.x;
      buSprite.position.y = position.y;
      buSprite.interactive = true;
      buSprite.buttonMode = buttonMode;
      buSprite.index = index;
      buSprite.name=assetID;

      container.addChild(buSprite);

      _this=this;
      buSprite.on('pointerover', function(e) {
            texture.setFrame(rectOver);
         })
         .on('pointerout', function(e) {
            texture.setFrame(rectUp);
         })
         .on('pointertap', function(e) {
           if (this.status===1) {
             this.status=0;
             switch (this.name) {
               case 'opening.bu_start':
                  _this.stage.curtain.curtain_l.isMove=1;
                  _this.stage.curtain.curtain_r.isMove=1;
                  _this.nowGame=1;  //目前在第 1 關

                  setTimeout(function(){
                     _this.stage.opening.title.visible=false;
                     _this.stage.opening.bu_start.visible=false;
                     _this.stage.opening.star_container.visible=false;
                  }, 500);
                  break;
               case 'help.bu_know':
                  _this.playCountdown();
                  break;
               case 'spot':   //game_1
                  _this.stage.game_1.lotion['lotion_'+this.index].visible=true;
                  _this.stage.game_1.lotion['lotion_'+this.index].isAlpha=1;
                  _this.stage.game_1.lotion['lotion_'+this.index].isMove=1;
                  break;
               case 'bu_again': //game_1 && game_2
                  if (_this.nowGame==1) {
                     _this.resetGame_1_container();
                     _this.playHelp();
                  }
                  if (_this.nowGame==2) {
                     _this.resetGame_2_container();
                     _this.playHelp();
                  }
                  break;
               case 'g1.success.bu_next': //show game_2 help
                  _this.stage.game_1.success_container.visible=false;
                  _this.nowGame=2;  //目前在第 2 關
                  _this.playHelp();
                  break;
               case 'g2.part.head':
               case 'g2.part.nose':
               case 'g2.part.chin':
               case 'g2.part.cheek_l':
               case 'g2.part.cheek_r':
                  var arrPart=this.name.split('.');
                  _this.stage.game_2.part[arrPart[2]].visible=false;
                  _this.stage.game_2.light[arrPart[2]].visible=true;
                  _this.stage.game_2.light[arrPart[2]].isAlpha=1;

                  _this.stage.game_2.oil[arrPart[2]].position.set(e.data.global.x,e.data.global.y);
                  _this.stage.game_2.oil[arrPart[2]].visible=true;
                  _this.stage.game_2.oil[arrPart[2]].isScale=1;
                  break;
               case 'g2.success.bu_finish':  //game all 過關   //disabled function
                  //video播放
                  var video=$('div.canvasContainer video');

                  video.off().on('ended timeupdate',function(e) {
                    if (e.type==='ended' || (e.target.currentTime>=2.96)) {
                      video.off();
                      _this.playEnd();
                      setTimeout(function(){
                        video.hide();
                        video.get(0).currentTime=0;
                      },50);
                    }
                  });

                  video.show();
                  video.get(0).play();

                  //_this.stage.end.video=_this.placeVideo(_this.stage.end_container,{w:1090,h:1800},{x:0,y:0});
                  //_this.stage.end_container.swapChildren(_this.stage.end.finalcut_container, _this.stage.end.video);
                  break;
               case 'end.finalcut.bu_restart':
                  _this.resetGame_1_container();
                  _this.resetGame_2_container();

                  _this.playOpening();
                  break;
               case 'end.finalcut.bu_try':
                  //=========================> 跳到索取試用
                  $('.canvasContainer').css('display','none');
                  $('.canvasContainer').empty();
                	$('.bg').fadeIn(300);
                  break;
            }
           }
         });

      return buSprite;
   },
   /*
   placeVideo: function(container, size, position) {  //disabled function
      var texture = PIXI.Texture.fromVideoUrl('canvas_video/end.mp4');
      var sprite = new PIXI.Sprite(texture);
      sprite.position.set(position.x, position.y);
      sprite.width = size.w;
      sprite.height = size.h;
      sprite.texture.baseTexture.source.pause();
      sprite.texture.baseTexture.source.playbackRate = 0.5;   //control video play speed
      sprite.status='pause';
      sprite.name='video';

      _this=this;
      sprite.texture.baseTexture.on('update',function(e) {
         if (e.source.currentTime>=e.source.duration*0.95 && sprite.status==='pause') {
            sprite.status='finish';
            //for end container
            _this.stage.curtain.curtain_l.isMove=0;
            _this.stage.curtain.curtain_r.isMove=0;
            _this.stage.curtain.curtain_l.x=0;
            _this.stage.curtain.curtain_r.x=384;
            _this.stage.curtain_container.visible=true;
            _this.stage.end.video.visible=false;
            _this.stage.end.finalcut_container.visible=true;
            _this.stage.end.finalcut.cloud.isAlpha=1;
            _this.stage.end.finalcut.cloud.isMove=1;
         }
      });

      container.addChild(sprite);
      return sprite;
   },
   */
   effMove: function(sprite) {
      if (sprite.x<=sprite.limitLeft) {
         sprite.vX=Math.abs(sprite.vX);
      }
      if (sprite.x>=sprite.limitRight) {
         sprite.vX=0-Math.abs(sprite.vX);
      }
      if (sprite.y<=sprite.limitTop) {
         sprite.vY=Math.abs(sprite.vY);
      }
      if (sprite.y>=sprite.limitBottom) {
         sprite.vY=0-Math.abs(sprite.vY);
      }
      sprite.x+=sprite.vX;
      sprite.y+=sprite.vY;

      //customize
      if (sprite.name==='opening.cloud') {
         if (sprite.y<=sprite.limitTop) {
            sprite.isMove=0;
         }
      }
      if (sprite.name==='curtain.curtain_r') {
         if (sprite.x>=this.canvasWidth) {   //curtain 己經拉開了
            this.isMove=0;
            this.stage.help.haku.y=this.stage.opening.haku.y;  //讓 haku 位置一致
            this.playHelp();
         }
      }
      if (sprite.name==='help.cloud') {
         this.stage.help.bu_know.position.set(sprite.x+535,sprite.y+390);
         if (sprite.y<=sprite.limitTop) {
            sprite.isMove=0;
         }
      }
      if (sprite.name==='end.finalcut.cloud') {
         if (sprite.y<=sprite.limitTop) {
            sprite.isMove=0;
         }
      }
   },
   effScale: function(sprite) {
      if (sprite.minScale===sprite.maxScale) {  //如果最大值跟最小值一樣, 代表只跑一次
         if (sprite.scale.x>=sprite.minScale) {
            sprite.vScale=0;
         }
      } else {
         if (sprite.scale.x <= sprite.minScale || sprite.scale.x >= sprite.maxScale) {
            sprite.vScale=0-sprite.vScale;
         }
      }
      sprite.scale.set(sprite.scale.x+sprite.vScale, sprite.scale.x+sprite.vScale);

      //customize
      if (sprite.name==='oil') {
         if (sprite.scale.x>=sprite.minScale) {
            sprite.isAlpha=1;
         }
      }
   },
   effAlpha: function(sprite) {
      sprite.alpha = (typeof sprite.alpha !== 'undefined') ?  sprite.alpha : 1;
      sprite.vAlpha = (typeof sprite.vAlpha !== 'undefined') ?  sprite.vAlpha : 0;

      sprite.alpha+=sprite.vAlpha;

      //customize
      if (sprite.alpha>=1.5 && sprite.name==='lotion') {
         sprite.isAlpha=0;
         sprite.isMove=0;
         sprite.alpha=0;
         sprite.visible=false;
         for (var i=1;i<=20;i++) {
            if (this.stage.game_1.spot['spot_'+i].index===sprite.index) {
               this.stage.game_1.spot['spot_'+i].visible=false;
            }
         }

         this.game_1_deleteSpot++;
         if (this.game_1_deleteSpot===20 && this.stage.game_1.failure_container.visible===false) {  //過關
            window.clearInterval(this.timer);

            this.stage.game_1.cursor.visible=false;
            this.stage.game_1_container.status='stop';
            this.stage.game_1.success_container.visible=true;
         }
      }
      if (sprite.alpha<=0 && sprite.name==='oil') {
         sprite.isAlpha=0;
         sprite.isScale=0;
         sprite.visible=false;

         this.game_2_deletePart++;
         if (this.game_2_deletePart===5 && this.stage.game_2.failure_container.visible===false) {  //過關
            window.clearInterval(this.timer);

            this.stage.game_2.cursor.visible=false;
            this.stage.game_2_container.status='stop';
            this.stage.game_2.success_container.visible=true;
            /*
            _this=this;
            setTimeout(function(){
               _this.playEnd();
            }, 3000);   //停留3秒自動跳過關
            */
         }
      }
   },
   hideContainer: function(arrShow_container) { //如果有指定名稱, 則此 container 要秀岀來
      for (var i=0; i<this.arrContainer.length; i++) {
         if (arrShow_container.indexOf(this.arrContainer[i])!==-1) {   //have found
            this.stage[this.arrContainer[i]].visible=true;
         } else {
            this.stage[this.arrContainer[i]].visible=false;
         }
      }
   },
   playOpening: function() {
      this.stage.opening.title.visible=true;
      this.stage.opening.bu_start.visible=true;
      this.stage.opening.star_container.visible=true;

      //reset button
      this.stage.opening.bu_start.status=1;

      this.hideContainer(['opening_container','curtain_container','game_1_container']);

      this.stage.opening.cloud.isAlpha=1;
      this.stage.opening.cloud.isMove=1;
   },
   playHelp: function() {
      //reset button
      this.stage.help.bu_know.status=1;

      this.stage.help.cloud.isMove=1;
      this.stage.help.cloud.position.set(40,650);
      this.stage.help.cloud.alpha=0;
      this.stage.help.cloud.isAlpha=1;

      if (this.nowGame===1) {  //game_1
         this.stage.game_1.count_num_1.visible=true;
         this.stage.game_1.count_num_2.visible=false;
         this.placeAsset_setFrame(this.stage.help.cloud, {frameW:1046, frameH:629, frameX:0, frameY:0});
      }
      if (this.nowGame===2) {  //game_2
         this.placeAsset_setFrame(this.stage.help.cloud, {frameW:1046, frameH:629, frameX:0, frameY:800});
      }
      this.hideContainer(['help_container','game_'+this.nowGame+'_container']);
   },
   playCountdown: function() {
      //先把他設定到數字 3
      this.placeAsset_setFrame(this.stage.countdown.count_num, {frameW:1090, frameH:1800, frameX:0, frameY:0});
      this.hideContainer(['countdown_container', 'game_'+this.nowGame+'_container']);

      //倒數計時 3 秒
      this.countdown_remainTime=this.countdown_totalTime;
      _this=this;
      this.timer=window.setInterval(function(){
         if (_this.nowGame===1) {
            _this.checkTimer('countdown','game_1');
         }
         if (_this.nowGame===2) {
            _this.checkTimer('countdown','game_2');
         }
      },1000);
   },
   playGame_1: function() {
      //reset button
      for (var i=1; i<=20; i++) {
        this.stage.game_1.spot['spot_'+i].status=1;
      }
      this.stage.game_1.failure.bu_again.status=1;
      this.stage.game_1.success.bu_next.status=1;

      this.stage.game_1.spot_container.visible=true;

      this.stage.game_1.cursor.visible=true;
      this.stage.game_1.spot_container.visible=true;

      this.stage.game_1_container.status='play';
      this.stage.game_1.failure_container.visible=false;
      this.stage.game_1.success_container.visible=false;
      this.hideContainer(['game_1_container']);

      //倒數計時
      this.game_1_remainTime=this.game_1_totalTime;
      _this=this;
      this.timer=window.setInterval(function(){
         _this.checkTimer('game_1');
      },1000);
   },
   playGame_2: function() {
      //reset button
      this.stage.game_2.part.head.status=1;
      this.stage.game_2.part.nose.status=1;
      this.stage.game_2.part.chin.status=1;
      this.stage.game_2.part.cheek_l.status=1;
      this.stage.game_2.part.cheek_r.status=1;
      this.stage.game_2.failure.bu_again.status=1;
      this.stage.game_2.success.bu_finish.status=1;

      this.stage.game_2.cursor.visible=true;
      this.stage.game_2.part_container.visible=true;

      this.stage.game_2_container.status='play';
      this.stage.game_2.failure_container.visible=false;
      this.stage.game_2.success_container.visible=false;
      this.hideContainer(['game_2_container']);

      //倒數計時
      this.game_2_remainTime=this.game_2_totalTime;
      _this=this;
      this.timer=window.setInterval(function(){
         _this.checkTimer('game_2');
      },1000);
   },
   playEnd: function() {
      this.stage.end.finalcut.cloud.position.set(177,421);
      //reset button
      this.stage.end.finalcut.bu_restart.status=1;
      this.stage.end.finalcut.bu_try.status=1;

      //計算分數
      var score = 50 - (this.game_1_remainTime + this.game_2_remainTime);
      var grade = Math.floor(score/10);
      //console.log(score);
      this.placeAsset_setFrame(this.stage.end.finalcut.cloud, {frameW:1046, frameH:629, frameX:0, frameY:700*grade});

      this.hideContainer(['end_container']);

      //for end container
      _this.stage.curtain.curtain_l.isMove=0;
      _this.stage.curtain.curtain_r.isMove=0;
      _this.stage.curtain.curtain_l.x=0;
      _this.stage.curtain.curtain_r.x=384;
      _this.stage.curtain_container.visible=true;

      //_this.stage.end.video.visible=false;
      _this.stage.end.finalcut_container.visible=true;
      _this.stage.end.finalcut.cloud.isAlpha=1;
      _this.stage.end.finalcut.cloud.isMove=1;
   },
   checkTimer: function(nowAction, nextAction) {
      if (nowAction==='countdown') {
         this.countdown_remainTime--;
         if (this.countdown_remainTime>0) {  //畫面只有 3,2,1 (沒有 0)
            if (this.countdown_remainTime>=2) { //3,2
               this.placeAsset_setFrame(this.stage.countdown.count_num, {frameW:1090, frameH:1800, frameX:0, frameY:1800*(this.countdown_totalTime-this.countdown_remainTime)});
            } else { //1
               this.placeAsset_setFrame(this.stage.countdown.count_num, {frameW:1090, frameH:1800, frameX:1090, frameY:0});
            }

         }
         if (this.countdown_remainTime===0) {   //倒數結束
            window.clearInterval(this.timer);
            if (nextAction==='game_1') {
               this.playGame_1();
            }
            if (nextAction==='game_2') {
               this.playGame_2();
            }
         }
      }
      if (nowAction==='game_1') {
         this.game_1_remainTime--;
         if (this.game_1_remainTime>=0) { //畫面有 0
            if (this.game_1_remainTime>=11) {
               this.stage.game_1.count_num_1.visible=true;
               this.stage.game_1.count_num_2.visible=false;
               if (this.game_1_remainTime>=21) {   //30~21
                  this.placeAsset_setFrame(this.stage.game_1.count_num_1, {frameW:270, frameH:272, frameX:0, frameY:300*(this.game_1_totalTime-this.game_1_remainTime)});
               } else { //20~11
                  this.placeAsset_setFrame(this.stage.game_1.count_num_1, {frameW:270, frameH:272, frameX:270, frameY:300*(this.game_1_totalTime-this.game_1_remainTime-10)});
               }
            } else {
               this.stage.game_1.count_num_1.visible=false;
               this.stage.game_1.count_num_2.visible=true;
               this.placeAsset_setFrame(this.stage.game_1.count_num_2, {frameW:270, frameH:272, frameX:0, frameY:300*(this.game_1_totalTime-this.game_1_remainTime-20)});
            }
         } else { //失敗
            window.clearInterval(this.timer);

            this.stage.game_1.spot_container.visible=false; //避免誤觸
            this.stage.game_1_container.status='stop';
            this.stage.game_1.cursor.visible=false;
            this.stage.game_1.failure_container.visible=true;
         }
      }
      if (nowAction==='game_2') {
         this.game_2_remainTime--;
         if (this.game_2_remainTime>=0) { //畫面有 0
            if (this.game_2_remainTime>=11) {   //20~11
               this.placeAsset_setFrame(this.stage.game_2.count_num, {frameW:270, frameH:272, frameX:0, frameY:300*(this.game_2_totalTime-this.game_2_remainTime)});
            } else { //10~0
               this.placeAsset_setFrame(this.stage.game_2.count_num, {frameW:270, frameH:272, frameX:270, frameY:300*(this.game_2_totalTime-this.game_2_remainTime-10)});
            }
         } else { //失敗
            window.clearInterval(this.timer);

            this.stage.game_2.part_container.visible=false; //避免誤觸
            this.stage.game_2_container.status='stop';
            this.stage.game_2.cursor.visible=false;
            this.stage.game_2.failure_container.visible=true;
         }
      }
   },
   resetGame_1_container: function() {
      this.game_1_remainTime=0;
      this.game_1_deleteSpot=0;
      this.nowGame=1;

      this.placeAsset_setFrame(this.stage.game_1.count_num_1, {frameW:270, frameH:272, frameX:0, frameY:0});   //reset to 30
      this.placeAsset_setFrame(this.stage.game_1.count_num_2, {frameW:270, frameH:272, frameX:0, frameY:0});   //reset to 10

      for (var i=1; i<=20; i++) {
         this.stage.game_1.lotion['lotion_'+i].visible=false;
         this.stage.game_1.lotion['lotion_'+i].isAlpha=false;
         this.stage.game_1.lotion['lotion_'+i].isMove=false;

         this.stage.game_1.spot['spot_'+i].visible=true;
      }
      this.stage.game_1.cursor.visible=false;
      this.stage.game_1.count_num_1.vislble=true;
      this.stage.game_1.count_num_2.visible=false;
      this.stage.game_1.success_container.visible=false;
      this.stage.game_1.failure_container.visible=false;
      this.stage.game_1.spot_container.visible=false;
   },
   resetGame_2_container: function() {
      this.game_2_remainTime=0;
      this.game_2_deletePart=0;
      this.nowGame=2;

      this.placeAsset_setFrame(this.stage.game_2.count_num, {frameW:270, frameH:272, frameX:0, frameY:0}); //reset to 20

      var arrPart=['head', 'nose', 'chin', 'cheek_l', 'cheek_r'];

      for (var i=0; i<arrPart.length; i++) {
         this.stage.game_2.part[arrPart[i]].visible=true;

         this.stage.game_2.light[arrPart[i]].visible=false;
         this.stage.game_2.light[arrPart[i]].isAlpha=0;
         this.stage.game_2.light[arrPart[i]].alpha=0;

         this.stage.game_2.oil[arrPart[i]].visible=false;
         this.stage.game_2.oil[arrPart[i]].isScale=0;
         this.stage.game_2.oil[arrPart[i]].scale=0;
         this.stage.game_2.oil[arrPart[i]].vScale=0.05;
         this.stage.game_2.oil[arrPart[i]].isAlpha=0;
         this.stage.game_2.oil[arrPart[i]].alpha=1;
      }
      this.stage.game_2.cursor.visible=false;
      this.stage.game_2.success_container.visible=false;
      this.stage.game_2.failure_container.visible=false;
      this.stage.game_2.part_container.visible=false;
   }
};
