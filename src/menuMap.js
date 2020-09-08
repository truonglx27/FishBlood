var MenuMap = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        cc.spriteFrameCache.addSpriteFrames(res.map4_plist);
        cc.spriteFrameCache.addSpriteFrames(res.itemMenu_plist);

        let bg = this.loadAndSetSprite("bg.png", size.width / 2, size.height / 2);
        this.addChild(bg);

        let lbSelectMap = this.loadAndSetLabel("SELECT MAP", "Arial", 40, "GREEN", null, bg.width / 2, bg.height * .9);
        bg.addChild(lbSelectMap);

        let menuMap1 = this.loadAndSetButton(res.menuMap1, true, bg.width / 2 - 30, bg.height / 2 + 30, .16, false);
        menuMap1.setAnchorPoint(1, 0);
        menuMap1.name = "menuMap1";
        bg.addChild(menuMap1);

        let menuMap2 = this.loadAndSetButton(res.menuMap2, true, bg.width / 2 + 30, bg.height / 2 + 30, .16, false);
        menuMap2.setAnchorPoint(0, 0);
        menuMap2.name = "menuMap2";
        bg.addChild(menuMap2);

        let menuMap3 = this.loadAndSetButton(res.menuMap3, true, bg.width / 2 - 30, bg.height / 2 - 30, .16, false);
        menuMap3.setAnchorPoint(1, 1);
        menuMap3.name = "menuMap3";
        bg.addChild(menuMap3);

        let menuMap4 = this.loadAndSetButton(res.menuMap4, true, bg.width / 2 + 30, bg.height / 2 - 30, .16, false);
        menuMap4.setAnchorPoint(0, 1);
        menuMap4.name = "menuMap4";
        bg.addChild(menuMap4);

        let btnBack = this.loadAndSetButton("btn_back.png", true, bg.width * .05, bg.height * .9, .8, true);
        btnBack.name = "btnBack";
        bg.addChild(btnBack);

    },

    buttonEvent: function (sender, type) {
        this._super();
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                switch (sender.name) {
                    case "btnBack": {
                        const nameLayer = "Background";
                        const layer = gameScene.children.find(e => e.name === nameLayer);
                        gameScene.children.forEach(e => {
                            e.setVisible(false);
                        });
                        if (layer) {
                            layer.setVisible(true);
                            return;
                        }
                        const background = new Background();
                        background.name = nameLayer;
                        gameScene.addChild(background);
                    }
                }
                break;
        }
    },

});
