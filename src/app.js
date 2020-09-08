var gameScene;

var size = cc.winSize;

// var size = {width: 1280, height: 720};
var scale = { x: cc.winSize.width / 1280, y: cc.winSize.height / 720 };
var scaleMin = scale.x < scale.y ? scale.x : scale.y;
var gameState = 0;

var HelloWorldScene = cc.Scene.extend({

    onEnter: function () {
        this._super();
        gameScene = this;


        var bg = new Background();
        bg.name = "Background";
        this.addChild(bg);

        // const menuMap = new MenuMap();
        // this.addChild(menuMap);



        // var bg = new cc.Sprite(res.logo);
        // bg.attr({
        //     x: size.width / 2,
        //     y: size.height / 2
        // });
        // bg.setScale(scale.x, scale.y);
        // this.addChild(bg);

        // this.shopLayer = Shop.create();
        // this.addChild(this.shopLayer);
        // this.shopLayer.setVisible(false);

        // var self = this;
        // if (cc.sys.capabilities.hasOwnProperty('touches')) {
        //     cc.eventManager.addListener({
        //         event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //         swallowTouches: true,
        //         onTouchBegan: function (touch, event) {
        //             // if (gameScene.gameState == 2) {
        //             //     self.questionLayer.onDown(touch.getLocation());
        //             // } else 
        //             if (gameScene.gameState == 1) {
        //                 self.gameLayer.onDown(touch.getLocation());
        //             }
        //         },
        //     }, bg);
        // } else {
        //     cc.eventManager.addListener({
        //         event: cc.EventListener.MOUSE,
        //         onMouseDown: function (event) {
        //             // if (gameScene.gameState == 2) {
        //             //     self.questionLayer.onDown(event.getLocation());
        //             // } else 
        //             if (gameScene.gameState == 1) {
        //                 self.gameLayer.onDown(event.getLocation());
        //             }
        //         },
        //     }, bg);
        // }
    },
});

