var MenuItem = BaseLayer.extend({
    ctor: function (isFinish, level) {
        this._super();
        this.init(isFinish, level);
    },
    init: function (isFinish, level) {
        this.level = level;
        // cc.spriteFrameCache.addSpriteFrames(res.map4_plist);
        cc.spriteFrameCache.addSpriteFrames(res.itemMenu_plist);

        let bg = this.loadAndSetSprite("complete_table.png", size.width / 2, size.height / 2);
        bg.setScale(.6);
        this.addChild(bg);

        let lbSelectMap = this.loadAndSetLabel("COMPLETE!", res.font, 50, "GREENN", null, bg.width / 2, bg.height * .89);
        bg.addChild(lbSelectMap);

        this.bgNode = bg;

        if (isFinish == true) {
            let openMap = this.loadAndSetLabel("OPEN MAP", res.font, 50, "GREENN", null, bg.width * .4, bg.height * .55);
            bg.addChild(openMap);

            let btnPlayMenu = this.loadAndSetButton("btn_playMenu.png", true, bg.width * .75, bg.height * .55, .9, true);
            btnPlayMenu.name = "btnPlayMenu";
            bg.addChild(btnPlayMenu);
        } else {
            lbSelectMap.string = "FAILED!"
            let openMap = this.loadAndSetLabel("REPLAY", res.font, 50, "GREENN", null, bg.width * .4, bg.height * .55);
            bg.addChild(openMap);

            let btnReplay = this.loadAndSetButton("btn_playMenu.png", true, bg.width * .75, bg.height * .55, .9, true);
            btnReplay.name = "btnReplay";
            bg.addChild(btnReplay);
        }

        let selectMap = this.loadAndSetLabel("SELECT MAP", res.font, 50, "GREENN", null, bg.width * .4, bg.height * .35);
        bg.addChild(selectMap);

        let btnMenu = this.loadAndSetButton("btn_menu.png", true, bg.width * .75, bg.height * .35, .9, true);
        btnMenu.name = "btnMenuMap";
        bg.addChild(btnMenu);

    },

    buttonEvent: function (sender, type) {
        this._super();
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                switch (sender.name) {
                    case "btnMenuMap": {
                        gameScene.children.forEach(e => {
                            e.setVisible(false);
                        });
                        const nameLayer = "Map";
                        const layer = gameScene.children.find(e => e.name === nameLayer);
                        if (layer) {
                            gameScene.removeChild(layer);
                        }
                        MenuMapThis.setVisible(true);
                        break;
                    }
                    case "btnReplay": {
                        const map = new Map1();
                        map.name = "Map";
                        gameScene.addChild(map);
                        break;
                    }
                }
        }
    },

    openMap: function (namemap) {
        switch (namemap) {
            case "menuMap1": {
                const map = new Map1();
                map.name = "map1";
                gameScene.addChild(map);
                break;
            }
        }
    }
});
