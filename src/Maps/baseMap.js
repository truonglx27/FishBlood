var winSize = size;
var BaseMap = BaseLayer.extend({

    ctor: function () {

        this._super();
        this.score = 0;
        this.listBox = [];
        this.listBoss = [];
        this.isLock = false;
        this.clickedSprite = false;
        this.locationMouse = null;
        this.isTouchMove = false;
        this.isCollision = true;
        this.level = 1;
        this.isMenuItem = false;

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


        // this._title = 'Chipmunk Sprite Test';
        // this._subtitle = 'Chipmunk + cocos2d sprites tests. Tap screen.';

        // this.initPhysics();

        this.initBoxPhysics();


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


        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this);

        this.scheduleUpdate();
        this.onToggleDebug(true);
    },
    onTouchMoved: function (touch, event) {
        if (this.clickedSprite) {
            let sizeSprite = this.sprite.getBoundingBox();
            let xLocation = touch.getLocation();

            sizeSprite.x > xLocation.x ? this.sprite.setScaleX(.8) : this.sprite.setScaleX(-.8);

            let degree = this.calcAngleDegrees(sizeSprite, xLocation);
            this.arrow.rotation = (-35 + 90 - degree);

            this.isTouchMove = true;
        }
        return false;
    },

    onTouchEnded: function (touch) {
        let xLocation = touch.getLocation();
        const sizeSprite = this.sprite.getBoundingBox();

        if (this.isTouchMove && !this.isLock) {
            this.isLock = true;
            var midPoint = this.calcD(sizeSprite, xLocation);
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

            // this._drawNode1.drawCardinalSpline(controlPoints2, 0, 100, 2);
            var action1 = cc.cardinalSplineTo(1.5, controlPoints3, 0);

            this.sprite.runAction(action1, cc.callFunc(this.updateDash, this));

            this.isTouchMove = false;
            setTimeout(() => {
                this.isCollision = true;
            }, 500);
        }
    },

    initBoxPhysics: function () {
        this.space = new cp.Space();
        this.space.gravity = cp.v(0, -300);
        this.setupDebugNode();

        let blurPanel = new cc.LayerColor(cc.color(0, 0, 0, 190), 1280, 10);
        blurPanel.setPosition(0, size.height * .99);
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
    },


    setupDebugNode: function () {
        // debug only
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        // this._debugNode.visible = false;
        this.addChild(this._debugNode);
    },

    onTouchBegan: function (touch, event) {
        let that = this;
        if (that.checkPositionMatch(that.sprite, touch.getLocation())) {
            that.clickedSprite = true;
        } else {
            that.clickedSprite = false;
        }
        return true;
    },

    checkInterect: function (listBox, sprite) {
        listBox.forEach(box => {
            const sizeBox = box.getBoundingBox();
            const posSprite = sprite.getBoundingBox();
            if (this.rectIntersectsRect(sizeBox, posSprite) && this.isCollision && box.isVisible() == true) {
                console.log("list box : ", listBox);
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
                break;
            }
        }
        if (this.listBoss.length == 0 && !this.isMenuItem) {
            let menuItem = new MenuItem(true, this.level + 1);
            this.addChild(menuItem);
            this.openMenuItem(true, this.level + 1);
            return;
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
        this.sprite.rotation = 0;
        this.checkInterect(this.listBox, this.sprite);
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
        if (this.score > 3 && !this.isMenuItem) {
            this.openMenuItem(false, this.level);
            return;
        }
    },

    openMenuItem: function (isFinish, level) {
        const nameLayer = "MenuItem";
        const layer = gameScene.children.find(e => e.name === nameLayer);
        if (layer) {
            gameScene.removeChild(layer, true);
        }
        let menuItem = new MenuItem(isFinish, level);
        menuItem.name = nameLayer;
        gameScene.addChild(menuItem);
        this.isMenuItem = true;
        if (level <= 4) listMap[level - 1].setVisible(false);
    },
});



