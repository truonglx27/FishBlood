var winSize = size;
var Map1 = BaseLayer.extend({
    ctor: function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.character_plist);
        cc.spriteFrameCache.addSpriteFrames(res.map1_plist);
        this.score = 0;
        this.listBox = [];
        this.listBoss = [];
        this.isLock = false;
        this.clickedSprite = false;
        this.bg = this.loadAndSetSprite(res.menuMap1, size.width / 2, size.height / 2, .5, false);
        this.bg.setAnchorPoint(.5, .5);
        // this.bg.name = "menuMap" + i;
        this.addChild(this.bg, -1);

        this.scorelb = this.loadAndSetLabel(`DASH: ${this.score}/3`, "Arial", 30, "GREENN", null, size.width * .1, size.height * .92);
        this.addChild(this.scorelb);

        let level = this.loadAndSetLabel("LEVEL: 1", "Arial", 30, "GREENN", null, size.width * .9, size.height * .92);
        this.addChild(level);

        // Menu to toggle debug physics on / off
        // var item = new cc.MenuItemFont("Physics On/Off", this.onToggleDebug, this);
        // item.fontSize = 24;
        // var menu = new cc.Menu(item);
        // this.addChild(menu);
        // menu.x = winSize.width - 100;
        // menu.y = winSize.height - 90;

        // Create the initial space
        this.space = new cp.Space();
        this.space.gravity = cp.v(0, -300);
        this.setupDebugNode();

        this._title = 'Chipmunk Sprite Test';
        this._subtitle = 'Chipmunk + cocos2d sprites tests. Tap screen.';

        // this.initPhysics();

        this.initBoxPhysics();

        this.initBoss();

        this.arrow = this.loadAndSetSprite("item_map1_8.png", winSize.width * .45, winSize.height * .08, .75);
        this.arrow.setAnchorPoint(0);
        this.addChild(this.arrow);
        this.arrow.rotation = -35;


        this.sprite = this.createPhysicsSprite(cp.v(winSize.width * .85, winSize.height * .55));
        this.addChild(this.sprite);

        // var array = [
        //     cc.p(0, 0),
        //     cc.p(300, 300),
        //     cc.p(600, 0),
        // ];
        // this._drawNode1 = new cc.DrawNode();
        // this.addChild(this._drawNode1);
        // this._drawNode1.x = 40;
        // this._drawNode1.y = 20;
        // this._drawNode1.setDrawColor(cc.color(255, 255, 255, 255));

        this.locationMouse = null;
        this.isTouchMove = false;
        this.isCollision = true;
        let that = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if (that.checkPositionMatch(that.sprite, touch.getLocation())) {
                    that.clickedSprite = true;
                } else {
                    that.clickedSprite = false;
                }
                return true;
            },
            onTouchMoved: function (touch, event) {
                if (that.clickedSprite) {
                    const sizeSprite = that.sprite.getBoundingBox();
                    let xLocation = touch.getLocation();

                    console.log("d : ", that.calcD(xLocation, sizeSprite));

                    let degree = that.calcAngleDegrees(sizeSprite, xLocation);
                    that.arrow.rotation = (-35 + 90 - degree);

                    that.isTouchMove = true;
                }
                return false;
            },
            onTouchEnded: function (touch) {
                let xLocation = touch.getLocation();
                const sizeSprite = that.sprite.getBoundingBox();

                if (that.isTouchMove && !that.isLock) {
                    this.isLock = true;
                    var midPoint = that.calcD(sizeSprite, xLocation);
                    // var controlPoints2 = [
                    //     cc.p(sizeSprite.x, sizeSprite.y),
                    //     cc.p(midPoint.x, midPoint.y),
                    //     cc.p(xLocation.x, sizeSprite.y)
                    // ];
                    var controlPoints3 = [
                        cc.p(sizeSprite.x + sizeSprite.width / 2, sizeSprite.y + sizeSprite.height / 2),
                        cc.p(midPoint.x, midPoint.y + sizeSprite.height + 40),
                        cc.p(xLocation.x, sizeSprite.y + sizeSprite.height + 40)
                    ];

                    // that._drawNode1.drawCardinalSpline(controlPoints2, 0, 100, 2);
                    var action1 = cc.cardinalSplineTo(1.5, controlPoints3, 0);

                    that.sprite.runAction(action1, cc.callFunc(this.updateDash, this));

                    that.isTouchMove = false;
                    setTimeout(() => {
                        that.isCollision = true;
                    }, 500);
                }
            },
        }, this);

        this.scheduleUpdate();
        this.onToggleDebug(true);
    },
    initBoxPhysics: function () {
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

        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 1280, 10);
        blurPanel.setPosition(0, size.height * .99);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);


        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 1280, 120);
        blurPanel.setPosition(0, 0);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 5, 720);
        blurPanel.setPosition(0, 0);
        this.addChild(blurPanel);
        this.listBox.push(blurPanel);

        blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 5, 720);
        blurPanel.setPosition(size.width * .996, 0);
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

    setupDebugNode: function () {
        // debug only
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        // this._debugNode.visible = false;
        this.addChild(this._debugNode);
    },

    checkInterect: function (listBox, sprite) {
        listBox.forEach(box => {
            const sizeBox = box.getBoundingBox();
            const posSprite = sprite.getBoundingBox();
            if (this.rectIntersectsRect(sizeBox, posSprite) && this.isCollision) {
                sprite.stopAllActions();
                this.isCollision = false;
                this.updateDash();
            }
        });
    },

    killBoss: function (listBoss, sprite) {
        for (let i = 0; i < listBoss.length; i++) {
            const sizeBoss = listBoss[i].getBoundingBox();
            const posSprite = sprite.getBoundingBox();
            if (this.rectIntersectsRect(sizeBoss, posSprite)) {
                listBoss[i].setVisible(false);
                listBoss.splice(i, 1);
                return;
            }
        }
    },

    rectIntersectsRect: function (ra, rb) {
        var maxax = ra.x + ra.width,
            maxay = ra.y + ra.height,
            maxbx = rb.x + rb.width,
            maxby = rb.y + rb.height;
        return !(maxax < rb.x || maxbx < ra.x || maxay < rb.y || maxby < ra.y);
        // return !(maxax < rb.x || maxbx < ra.x);
    },

    onToggleDebug: function (state = false) {
        // var state = this._debugNode.visible;
        this._debugNode.visible = !state;

        if (state == false) {
            this.listBox.forEach(e => {
                e.opacity = 150;
            });
        } else {
            this.listBox.forEach(e => {
                e.opacity = 0;
            });
        }
    },

    createPhysicsSprite: function (pos) {
        var body = new cp.Body(1, cp.momentForBox(1, 100, 65));
        body.setPos(pos);
        this.space.addBody(body);
        var shape = new cp.BoxShape(body, 75, 65);
        shape.setElasticity(0);
        shape.setFriction(1);
        this.space.addShape(shape);

        var sprite = new cc.PhysicsSprite(res.fish);
        sprite.setScale(.8);
        // sprite.setAnchorPoint(0, .5);
        sprite.setBody(body);
        return sprite;
    },

    onEnter: function () {
        this._super();
        // ChipmunkBaseLayer.prototype.onEnter.call(this);
        //cc.base(this, 'onEnter');
    },

    update: function (delta) {
        this.space.step(delta);
        if (!this.checkInterect(this.listBox, this.sprite)) {

            this.sprite.rotation = 0;
        }
        this.killBoss(this.listBoss, this.sprite);
    },

    loadAndSetSprite: function (spriteName, posX, posY, scale, isLoadPlist = true) {

        var sprite = new cc.Sprite();
        isLoadPlist ?
            sprite.initWithSpriteFrameName(spriteName) :
            sprite.initWithFile(spriteName);

        if (scale != undefined && scale != null) {
            sprite.setScale(scale);
        }
        if (posX != null && posY != null) {
            sprite.setPosition(posX, posY);
            // sprite.attr({ x: posX, y: posY });
        }
        return sprite;
    },

    setScore: function () {
        this.scorelb.string = `DASH: ${this.score++}/3`;
    },
    updateDash: function () {
        this.setScore();
        this.isLock = false;

        if (this.listBoss.length == 0) {
            let menuItem = new MenuItem(true, 2);
            this.addChild(menuItem);
            return;
        }
        if (this.score > 3) {
            let menuItem = new MenuItem(false, 2);
            this.addChild(menuItem);
            return;
        }
    }

});



