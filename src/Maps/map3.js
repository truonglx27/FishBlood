var winSize = size;
var Map3 = BaseMap.extend({
    ctor: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.map1_plist);
        cc.spriteFrameCache.addSpriteFrames(res.character_plist);

        this.bg = this.loadAndSetSprite(res.menuMap3, size.width / 2, size.height / 2, .48, false);
        this.bg.setAnchorPoint(.5, .5);
        this.addChild(this.bg, -1);

        this.sprite = this.createPhysicsSprite(cp.v(winSize.width * .85, winSize.height * .6));
        this.addChild(this.sprite);


        this.arrow = this.loadAndSetSprite("item_map1_8.png", winSize.width * .45, winSize.height * .08, .75);
        this.arrow.setAnchorPoint(0);
        this.addChild(this.arrow);
        this.arrow.rotation = -35;

        this.initBoss();
        this.level = 3;
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

        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 240, 42);
        blurPanel.setPosition(size.width * .245, size.height * .615);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        body = new cp.StaticBody(1, cp.momentForBox(1, 238, 30));
        body.setPos(cp.v(size.width * .34, size.height * .648));
        shape = new cp.BoxShape(body, 238, 30);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);


        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 190, 155);
        blurPanel.setPosition(size.width * .11, size.height * .18);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        body = new cp.StaticBody(1, cp.momentForBox(1, 238, 30));
        body.setPos(cp.v(size.width * .18, size.height * .37));
        shape = new cp.BoxShape(body, 238, 30);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);
    },

    initBoss: function () {
        let boss = this.loadAndSetSprite("boss1.png", winSize.width * .28, winSize.height * .78, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

        boss = this.loadAndSetSprite("boss2.png", winSize.width * .35, winSize.height * .78, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

        boss = this.loadAndSetSprite("boss2.png", winSize.width * .15, winSize.height * .45, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

        boss = this.loadAndSetSprite("boss1.png", winSize.width * .22, winSize.height * .45, .9);
        this.addChild(boss);
        this.listBoss.push(boss);
    },
})