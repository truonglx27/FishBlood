var MenuItem = BaseLayer.extend({
    ctor: function (isFinish, level) {
        this._super();
        this.init(isFinish, level);
    },
    init: function (isFinish, level) {
        MenuItemThis = this;
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

            let btnOpenNewMap = this.loadAndSetButton("btn_playMenu.png", true, bg.width * .75, bg.height * .55, .9, true);
            btnOpenNewMap.name = "btnOpenNewMap";
            bg.addChild(btnOpenNewMap);
        } else {
            lbSelectMap.string = "FAILED!"
            let rePlay = this.loadAndSetLabel("REPLAY", res.font, 50, "GREENN", null, bg.width * .4, bg.height * .55);
            bg.addChild(rePlay);

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
                        MenuItemThis.removeMap();
                        MenuMapThis.setVisible(true);
                        break;
                    }
                    case "btnOpenNewMap":
                    case "btnReplay": {
                        MenuItemThis.removeMap();
                        MenuItemThis.openMap(MenuItemThis.level);
                        break;
                    }
                }
        }
    },

    openMap: function (number) {
        switch (number) {
            case 1: {
                const map = new Map1();
                map.name = "Map";
                gameScene.addChild(map);
                break;
            }
            case 2: {
                const map = new Map2();
                map.name = "Map";
                gameScene.addChild(map);
                break;
            }
            case 3: {
                const map = new Map3();
                map.name = "Map";
                gameScene.addChild(map);
                break;
            }
            case 4: {
                const map = new Map4();
                map.name = "Map";
                gameScene.addChild(map);
                break;
            }
            default: {
                const map = new Map1();
                map.name = "Map";
                gameScene.addChild(map);
                break;
            }
        }
    },
    removeMap: function () {
        gameScene.children.forEach(e => {
            e.setVisible(false);
        });
        const nameLayer = "Map";
        const layer = gameScene.children.find(e => e.name === nameLayer);
        if (layer) {
            gameScene.removeChild(layer);
        }
    }

});
