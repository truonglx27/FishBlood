var gameScene;

var size = cc.winSize;
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

        // let menuItem  = new MenuItem();
        // bg.addChild(menuItem);

    },
});

