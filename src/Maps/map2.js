var winSize = size;
var Map2 = BaseMap.extend({
    ctor: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.map1_plist);
        cc.spriteFrameCache.addSpriteFrames(res.character_plist);

        this.bg = this.loadAndSetSprite(res.menuMap2, size.width / 2, size.height / 2, .48, false);
        this.bg.setAnchorPoint(.5, .5);
        this.addChild(this.bg, -1);

        this.sprite = this.createPhysicsSprite(cp.v(winSize.width * .1, winSize.height * .8));
        this.addChild(this.sprite);


        this.arrow = this.loadAndSetSprite("item_map1_8.png", winSize.width * .45, winSize.height * .08, .75);
        this.arrow.setAnchorPoint(0);
        this.addChild(this.arrow);
        this.arrow.rotation = -35;

        this.initBoss();
        this.level = 2;

    },
    initBoxPhysics: function () {
        this._super();

        let blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 1280, 135);
        blurPanel.setPosition(0, 0);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        let body = new cp.StaticBody(1, cp.momentForBox(1, 1280, 135));
        body.setPos(cp.v(size.width * .5, size.height * .085));
        shape = new cp.BoxShape(body, 1280, 135);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);

        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 280, 230);
        blurPanel.setPosition(size.width * .72, size.height * .175);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        body = new cp.StaticBody(1, cp.momentForBox(1, 300, 40));
        body.setPos(cp.v(size.width * .83, size.height * .462));
        shape = new cp.BoxShape(body, 300, 40);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);


        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 0), 240, 45);
        blurPanel.setPosition(size.width * .42, size.height * .45);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        body = new cp.StaticBody(1, cp.momentForBox(1, 238, 30));
        body.setPos(cp.v(size.width * .515, size.height * .485));
        shape = new cp.BoxShape(body, 238, 30);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);


        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 240, 45);
        blurPanel.setPosition(size.width * .215, size.height * .665);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        body = new cp.StaticBody(1, cp.momentForBox(1, 238, 30));
        body.setPos(cp.v(size.width * .308, size.height * .705));
        shape = new cp.BoxShape(body, 238, 30);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);


        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 190, 155);
        blurPanel.setPosition(size.width * .04, size.height * .18);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        body = new cp.StaticBody(1, cp.momentForBox(1, 238, 30));
        body.setPos(cp.v(size.width * .109, size.height * .37));
        shape = new cp.BoxShape(body, 238, 30);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);
    },

    initBoss: function () {
        let boss = this.loadAndSetSprite("boss1.png", winSize.width * .35, winSize.height * .78, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

        boss = this.loadAndSetSprite("boss2.png", winSize.width * .47, winSize.height * .56, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

        boss = this.loadAndSetSprite("boss2.png", winSize.width * .54, winSize.height * .56, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

        boss = this.loadAndSetSprite("boss2.png", winSize.width * .77, winSize.height * .56, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

        boss = this.loadAndSetSprite("boss1.png", winSize.width * .85, winSize.height * .56, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

    },
})