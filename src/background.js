var Background = BaseLayer.extend({
    ctor: function (numberSession) {
        this._super();
        this.init();
    },
    init: function () {
        BackGoundThis = this;
        cc.spriteFrameCache.addSpriteFrames(res.bg_plist);

        var bg = this.loadAndSetSprite("bg_logo.png", size.width / 2, size.height / 2);
        this.addChild(bg);

        var logo = this.loadAndSetSprite("logo.png", bg.width / 2, bg.height / 1.8);
        bg.addChild(logo);

        var btnPlay = this.loadAndSetButton("btn_play.png", true, bg.width / 2, bg.height / 4);
        bg.addChild(btnPlay);
    },

    buttonEvent: function (sender, type) {
        this._super();
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                const nameLayer = "MenuMap";
                const layer = gameScene.children.find(e => e.name === nameLayer);
                if (layer) {
                    layer.setVisible(true);
                    return;
                }
                const menuMap = new MenuMap();
                menuMap.name = nameLayer;
                gameScene.addChild(menuMap);
                break;
        }
    },

});
