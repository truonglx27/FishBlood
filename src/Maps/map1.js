var winSize = size;
var Map1 = BaseMap.extend({
    ctor: function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.character_plist);
        cc.spriteFrameCache.addSpriteFrames(res.map1_plist);


        this.bg = this.loadAndSetSprite(res.menuMap1, size.width / 2, size.height / 2, .5, false);
        this.bg.setAnchorPoint(.5, .5);
        this.addChild(this.bg, -1);


        this.arrow = this.loadAndSetSprite("item_map1_8.png", winSize.width * .45, winSize.height * .08, .75);
        this.arrow.setAnchorPoint(0);
        this.addChild(this.arrow);
        this.arrow.rotation = -35;

        this.sprite = this.createPhysicsSprite(cp.v(winSize.width * .85, winSize.height * .55));
        this.addChild(this.sprite);

        this.initBoss();
        this.level = 1;
    },

    initBoxPhysics: function () {
        // this.listBox =[];
        this._super();

        let blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 300, 230);
        blurPanel.setPosition(size.width * .726, size.height * .172);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        let body = new cp.StaticBody(1, cp.momentForBox(1, 300, 30));
        body.setPos(cp.v(size.width * .84, size.height * .47));
        let shape = new cp.BoxShape(body, 300, 30);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);


        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 195, 35);
        blurPanel.setPosition(size.width * .235, size.height * .618);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        body = new cp.StaticBody(1, cp.momentForBox(1, 195, 15));
        body.setPos(cp.v(size.width * .312, size.height * .65));
        shape = new cp.BoxShape(body, 195, 15);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);


        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 190, 150);
        blurPanel.setPosition(size.width * .095, size.height * .175);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        body = new cp.StaticBody(1, cp.momentForBox(1, 250, 20));
        body.setPos(cp.v(size.width * .165, size.height * .37));
        shape = new cp.BoxShape(body, 250, 20);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);

        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 195, 35);
        blurPanel.setPosition(size.width * .532, size.height * .71);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        body = new cp.StaticBody(1, cp.momentForBox(1, 195, 15));
        body.setPos(cp.v(size.width * .61, size.height * .75));
        shape = new cp.BoxShape(body, 195, 15);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);

        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 1280, 120);
        blurPanel.setPosition(0, 0);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        body = new cp.StaticBody(1, cp.momentForBox(1, 1280, 120));
        body.setPos(cp.v(size.width * .5, size.height * .085));
        shape = new cp.BoxShape(body, 1280, 120);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addStaticShape(shape);
    },

    initBoss: function () {
        let boss = this.loadAndSetSprite("boss1.png", winSize.width * .21, winSize.height * .45, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

        boss = this.loadAndSetSprite("boss1.png", winSize.width * .15, winSize.height * .45, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

        boss = this.loadAndSetSprite("boss2.png", winSize.width * .35, winSize.height * .72, .9);
        this.addChild(boss);
        this.listBoss.push(boss);

    },
});



