var listMap = [];

var MenuMap = BaseLayer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        MenuMapThis = this;
        cc.spriteFrameCache.addSpriteFrames(res.map4_plist);
        cc.spriteFrameCache.addSpriteFrames(res.itemMenu_plist);

        let bg = this.loadAndSetSprite("bg.png", size.width / 2, size.height / 2);
        this.addChild(bg);

        let lbSelectMap = this.loadAndSetLabel("SELECT MAP", "Arial", 40, "GREEN", null, bg.width / 2, bg.height * .9);
        bg.addChild(lbSelectMap);

        this.bgNode = bg;

        let listMenuMap = [
            { name: res.menuMap1, pos: cc.p(bg.width / 2 - 30, bg.height / 2 + 30), anchor: cc.p(1, 0) },
            { name: res.menuMap2, pos: cc.p(bg.width / 2 + 30, bg.height / 2 + 30), anchor: cc.p(0, 0) },
            { name: res.menuMap3, pos: cc.p(bg.width / 2 - 30, bg.height / 2 - 30), anchor: cc.p(1, 1) },
            { name: res.menuMap4, pos: cc.p(bg.width / 2 + 30, bg.height / 2 - 30), anchor: cc.p(0, 1) },
        ]

        listMenuMap.forEach((menuMap, i = 0) => {
            let isLock = i == 0 ? false : true;
            this.createMap(menuMap.name, menuMap.pos, menuMap.anchor, ++i, isLock);
        });

        let btnBack = this.loadAndSetButton("btn_back.png", true, bg.width * .06, bg.height * .9, .8, true);
        btnBack.name = "btnBack";
        bg.addChild(btnBack);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                MenuMapThis.onTouch(touch);
            },
        }, this);

    },

    onTouch: function (touch, event) {
        const count = this.bgNode.childrenCount;
        for (let i = 0; i < count; i++) {
            if (this.checkPositionMatch(this.bgNode.children[i], touch.getLocation())) {
                console.log("name layer: ", this.bgNode.children[i].name);
                this.openMap(this.bgNode.children[i].name);
            }
        }
    },

    createMap: function (nameSpite, pos, anchor, i, isLock = false) {
        let menuMap2 = this.loadAndSetSprite(nameSpite, pos.x, pos.y, .16, false);
        menuMap2.setAnchorPoint(anchor.x, anchor.y);
        menuMap2.name = "menuMap" + i;
        this.bgNode.addChild(menuMap2);

        let blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 150));
        blurPanel.setPosition(0, 0);
        blurPanel.setAnchorPoint(0, 0);
        blurPanel.setScale(2.1);
        menuMap2.addChild(blurPanel);

        let logMap2 = this.loadAndSetSprite("log_map.png", blurPanel.width / 2, blurPanel.height / 2, 2.6);
        blurPanel.addChild(logMap2);
        blurPanel.setVisible(isLock);

        listMap.push(blurPanel);
    },

    buttonEvent: function (sender, type) {
        this._super();
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                switch (sender.name) {
                    case "btnBack": {
                        gameScene.children.forEach(e => {
                            e.setVisible(false);
                        });
                        BackGoundThis.setVisible(true);
                        break;
                    }
                }
        }
    },

    openMap: function (namemap) {
        switch (namemap) {
            case "menuMap1": {
                const map = new Map1();
                map.name = "Map";
                gameScene.addChild(map);
                console.log("list map ", listMap);
                break;
            }
            case "menuMap2": {
                if (!listMap[1].isVisible()) {
                    const map = new Map2();
                    map.name = "Map";
                    gameScene.addChild(map);
                }
                break;
            }
            case "menuMap3": {
                if (!listMap[2].isVisible()) {
                    const map = new Map3();
                    map.name = "Map";
                    gameScene.addChild(map);
                }
                break;
            }
            case "menuMap4": {
                if (!listMap[3].isVisible()) {
                    const map = new Map4();
                    map.name = "Map";
                    gameScene.addChild(map);
                }
                break;
            }
        }
    }
});
