var BaseLayer = cc.Layer.extend({
    needToRotate: false,
    font: "Segoe UI",
    _sFSHandler: null,
    ctor: function () {
        this._super();
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
    loadAndSetLabel: function (text, font, size, color, parent, posX, posY, nameInParent) {
        var label = cc.LabelTTF.create(text, font, size, cc.size(0, 100), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM);

        switch (color) {
            case "BLUE":
                label.setColor(cc.color(0, 180, 255));
                break;
            case "YELLOW":
                label.setColor(cc.color.YELLOW);
                break;
            case "GREEN":
                label.setColor(cc.color(0, 209, 181));
                break;
            case "GREENN":
                label.setColor(cc.color(1,41,37));
                break;
            case "BLACK":
                label.setColor(cc.color.BLACK);
                break;
            case "WHITE":
                label.setColor(cc.color.WHITE);
                break;
            default:
                label.setColor(color);
                break;
        }
        if (nameInParent != undefined && nameInParent != null) {
            label.name = nameInParent;
        }
        if (posX != null && posY != null) {
            label.setPosition(posX, posY);
        }
        if (parent == null) {
            return label;
        } else {
            parent.addChild(label);
        }
    },

    loadAndSetButton: function (spriteName, swallow, posX, posY, scale, isloadPlist = true) {
        var button = new ccui.Button();
        var tempName;
        if (swallow == undefined || swallow == null) {
            button.setSwallowTouches(false);
        } else {
            button.setSwallowTouches(swallow);
        }
        isloadPlist ?
            button.loadTextures(spriteName, tempName, "", ccui.Widget.PLIST_TEXTURE) :
            button.loadTextureNormal(spriteName, ccui.Widget.LOCAL_TEXTURE);

        button.addTouchEventListener(this.buttonEvent);
        if (scale != undefined && scale != null) {
            button.setScale(scale);
        }
        if (posX != null && posY != null) {
            button.setPosition(posX, posY);
        }
        return button;
    },
    checkPositionMatch: function (obj, touchPos) {
        var nodeSpaceLocation = obj.getParent().convertToNodeSpace(touchPos);
        if (cc.rectContainsPoint(obj.getBoundingBox(), nodeSpaceLocation)) {
            return true;
        } else {
            return false;
        }
    },
    onEnter: function () {
        this._super();
    },
    formatNumberToString: function (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    },
    stringToNum: function (str) {
        return parseFloat(str.replace(/\./g, '').replace(',', '.'));
    },

    buttonEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
        }
    },
    checkPositionMatch: function (obj, touchPos) {
        var nodeSpaceLocation = obj.getParent().convertToNodeSpace(touchPos);
        if (cc.rectContainsPoint(obj.getBoundingBox(), nodeSpaceLocation)) {
            return true;
        } else {
            return false;
        }
    },

    calcAngleDegrees: function (from, to) {
        let angle = Math.round(Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI);
        // if (angle < 0) angle += 360;
        return angle;
    },

    calcD: function (from, to) {
        dx = to.x - from.x;
        dy = Math.abs(to.y - from.y);
        var mid = cc.p(from.x + dx / 2, from.y + dy / 1.2);
        return mid;
    }
});
