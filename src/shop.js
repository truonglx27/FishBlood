/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var Shop = cc.Layer.extend({

    btnChooseChar1: null,
    btnChooseChar2: null,
    btnChooseChar3: null,
    btnChooseChar4: null,
    btnChooseChar5: null,

    btnBuyChar1: null,
    btnBuyChar2: null,
    btnBuyChar4: null,
    btnBuyChar5: null,

    gold: 500,
    score: null,

    errorCode: null,
    succesCode: null,

    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var btnBack = new ccui.Button();
        btnBack.loadTextureNormal(res.btnHome, ccui.Widget.LOCAL_TEXTURE);
        btnBack.setScale(scaleMin);
        btnBack.attr({
            x: size.width * 0.075,
            y: size.height * 0.9
        });
        this.addChild(btnBack, 1);
        btnBack.addClickEventListener(function () {
            gameScene.onHome();
        });

        var logo = new cc.Sprite(res.Logo);
        logo.setScale(scaleMin);
        logo.attr({
            x: size.width * 0.5,
            y: size.height * 0.8
        });
        this.addChild(logo, 2);

        let character1 = new cc.Sprite(res.Char_1);
        character1.setScale(scaleMin);
        character1.attr({
            x: size.width * 0.2,
            y: size.height * 0.5
        });
        this.addChild(character1, 2);

        let character2 = new cc.Sprite(res.Char_2);
        character2.setScale(scaleMin);
        character2.attr({
            x: size.width * 0.35,
            y: size.height * 0.5
        });
        this.addChild(character2, 2);

        let character3 = new cc.Sprite(res.Char_3);
        character3.setScale(scaleMin);
        character3.attr({
            x: size.width * 0.5,
            y: size.height * 0.5
        });
        this.addChild(character3, 2);

        let character4 = new cc.Sprite(res.Char_4);
        character4.setScale(scaleMin);
        character4.attr({
            x: size.width * 0.65,
            y: size.height * 0.5
        });
        this.addChild(character4, 2);

        let character5 = new cc.Sprite(res.Char_5);
        character5.setScale(scaleMin);
        character5.attr({
            x: size.width * 0.8,
            y: size.height * 0.5
        });
        this.addChild(character5, 2);

        this.errorCode = new cc.Sprite(res.erro);
        this.errorCode.setScale(scaleMin);
        this.errorCode.attr({
            x: size.width * 0.5,
            y: size.height * 0.2
        });
        this.addChild(this.errorCode, 2);
        this.errorCode.setVisible(false);

        this.succesCode = new cc.Sprite(res.done);
        this.succesCode.setScale(scaleMin);
        this.succesCode.attr({
            x: size.width * 0.5,
            y: size.height * 0.2
        });
        this.addChild(this.succesCode, 2);
        this.succesCode.setVisible(false);

        this.btnChooseChar1 = new ccui.Button();
        this.btnChooseChar1.loadTextureNormal(res.Choose, ccui.Widget.LOCAL_TEXTURE);
        this.btnChooseChar1.setScale(scaleMin);
        this.btnChooseChar1.attr({
            x: character1.width * 0.5,
            y: - character1.height * 0.75
        });
        character1.addChild(this.btnChooseChar1, 1);
        this.btnChooseChar1.addClickEventListener(function () {
            gameScene.currentChar = 1;
            gameScene.onPlay();
            gameScene.gameLayer.choosePlayer = true;
            gameScene.gameLayer.initGame();
        });

        this.btnChooseChar2 = new ccui.Button();
        this.btnChooseChar2.loadTextureNormal(res.Choose, ccui.Widget.LOCAL_TEXTURE);
        this.btnChooseChar2.setScale(scaleMin);
        this.btnChooseChar2.attr({
            x: character2.width * 0.5,
            y: -character2.height * 0.75
        });
        character2.addChild(this.btnChooseChar2, 1);
        this.btnChooseChar2.addClickEventListener(function () {
            gameScene.currentChar = 2;
            gameScene.onPlay();
            gameScene.gameLayer.choosePlayer = true;
            gameScene.gameLayer.initGame();
        });

        this.btnChooseChar3 = new ccui.Button();
        this.btnChooseChar3.loadTextureNormal(res.Choose, ccui.Widget.LOCAL_TEXTURE);
        this.btnChooseChar3.setScale(scaleMin);
        this.btnChooseChar3.attr({
            x: character3.width * 0.5,
            y: -character3.height * 0.75
        });
        character3.addChild(this.btnChooseChar3, 1);
        this.btnChooseChar3.addClickEventListener(function () {
            gameScene.currentChar = 3;
            gameScene.onPlay();
            gameScene.gameLayer.choosePlayer = true;
            gameScene.gameLayer.initGame();
        });

        this.btnChooseChar4 = new ccui.Button();
        this.btnChooseChar4.loadTextureNormal(res.Choose, ccui.Widget.LOCAL_TEXTURE);
        this.btnChooseChar4.setScale(scaleMin);
        this.btnChooseChar4.attr({
            x: character4.width * 0.5,
            y: -character4.height * 0.75
        });
        character4.addChild(this.btnChooseChar4, 1);
        this.btnChooseChar4.addClickEventListener(function () {
            gameScene.currentChar = 4;
            gameScene.onPlay();
            gameScene.gameLayer.choosePlayer = true;
            gameScene.gameLayer.initGame();
        });

        this.btnChooseChar5 = new ccui.Button();
        this.btnChooseChar5.loadTextureNormal(res.Choose, ccui.Widget.LOCAL_TEXTURE);
        this.btnChooseChar5.setScale(scaleMin);
        this.btnChooseChar5.attr({
            x: character5.width * 0.5,
            y: -character5.height * 0.75
        });
        character5.addChild(this.btnChooseChar5, 1);
        this.btnChooseChar5.addClickEventListener(function () {
            gameScene.currentChar = 5;
            gameScene.onPlay();
            gameScene.gameLayer.choosePlayer = true;
            gameScene.gameLayer.initGame();
        });

        this.btnChooseChar1.setVisible(false);
        this.btnChooseChar2.setVisible(false);
        this.btnChooseChar4.setVisible(false);
        this.btnChooseChar5.setVisible(false);

        this.btnBuyChar1 = new ccui.Button();
        this.btnBuyChar1.loadTextureNormal(res.buy, ccui.Widget.LOCAL_TEXTURE);
        this.btnBuyChar1.setScale(scaleMin);
        this.btnBuyChar1.attr({
            x: character1.width * 0.5,
            y: -character1.height * 0.75
        });
        character1.addChild(this.btnBuyChar1, 1);
        let that = this;
        this.btnBuyChar1.addClickEventListener(function () {
            that.checkGold(that.btnBuyChar1, that.btnChooseChar1);
        });

        this.btnBuyChar2 = new ccui.Button();
        this.btnBuyChar2.loadTextureNormal(res.buy, ccui.Widget.LOCAL_TEXTURE);
        this.btnBuyChar2.setScale(scaleMin);
        this.btnBuyChar2.attr({
            x: character2.width * 0.5,
            y: -character2.height * 0.75
        });
        character2.addChild(this.btnBuyChar2, 1);
        this.btnBuyChar2.addClickEventListener(function () {
            that.checkGold(that.btnBuyChar2, that.btnChooseChar2);
        });

        this.btnBuyChar4 = new ccui.Button();
        this.btnBuyChar4.loadTextureNormal(res.buy, ccui.Widget.LOCAL_TEXTURE);
        this.btnBuyChar4.setScale(scaleMin);
        this.btnBuyChar4.attr({
            x: character4.width * 0.5,
            y: -character4.height * 0.75
        });
        character4.addChild(this.btnBuyChar4, 1);
        this.btnBuyChar4.addClickEventListener(function () {
            that.checkGold(that.btnBuyChar4, that.btnChooseChar4);
        });

        this.btnBuyChar5 = new ccui.Button();
        this.btnBuyChar5.loadTextureNormal(res.buy, ccui.Widget.LOCAL_TEXTURE);
        this.btnBuyChar5.setScale(scaleMin);
        this.btnBuyChar5.attr({
            x: character5.width * 0.5,
            y: -character5.height * 0.75
        });
        character5.addChild(this.btnBuyChar5, 1);
        this.btnBuyChar5.addClickEventListener(function () {
            that.checkGold(that.btnBuyChar5, that.btnChooseChar5);
        });

        let gold1 = new cc.LabelTTF(this.gold, res.font.srcs[0], 30);
        gold1.setFontFillColor(new cc.Color(255, 255, 255, 255));
        gold1.attr({
            x: this.btnBuyChar1.width * 0.5,
            y: this.btnBuyChar1.height * 0.5
        });
        this.btnBuyChar1.addChild(gold1, 1);

        let gold2 = new cc.LabelTTF(this.gold, res.font.srcs[0], 30);
        gold2.setFontFillColor(new cc.Color(255, 255, 255, 255));
        gold2.attr({
            x: this.btnBuyChar2.width * 0.5,
            y: this.btnBuyChar2.height * 0.5
        });
        this.btnBuyChar2.addChild(gold2, 1);

        let gold3 = new cc.LabelTTF(this.gold, res.font.srcs[0], 30);
        gold3.setFontFillColor(new cc.Color(255, 255, 255, 255));
        gold3.attr({
            x: this.btnBuyChar4.width * 0.5,
            y: this.btnBuyChar4.height * 0.5
        });
        this.btnBuyChar4.addChild(gold3, 1);

        let gold4 = new cc.LabelTTF(this.gold, res.font.srcs[0], 30);
        gold4.setFontFillColor(new cc.Color(255, 255, 255, 255));
        gold4.attr({
            x: this.btnBuyChar5.width * 0.5,
            y: this.btnBuyChar5.height * 0.5
        });
        this.btnBuyChar5.addChild(gold4, 1);

        this.score = new cc.LabelTTF("SCORE:", res.font.srcs[0], 30);
        this.score.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.score.attr({
            x: this.width * 0.89,
            y: this.height * 0.9
        });
        this.addChild(this.score, 1);

        this.lblScore = new cc.LabelTTF(gameScene._score.toString(), res.font.srcs[0], 30);
        this.lblScore.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.lblScore.attr({
            x: this.width * 0.94,
            y: this.height * 0.9
        });
        this.lblScore.setAnchorPoint(0, 0.5);
        this.addChild(this.lblScore, 1);

        return true;
    },

    checkGold: function (buyBtn, chooseBtn) {
        if (gameScene._score >=  this.gold) {
            this.succesCode.setVisible(true);
            chooseBtn.setVisible(true);
            buyBtn.setVisible(false);
            gameScene._score -= this.gold;
            this.lblScore.setString(gameScene._score);
            setTimeout(() => {
                this.succesCode.setVisible(false);
            }, 2000);
        } else {
            this.errorCode.setVisible(true);
            setTimeout(() => {
                this.errorCode.setVisible(false);
            }, 2000);
        }
    },

    onEnter: function () {
        this._super();
    },

    updateLabel: function () {
    }
});

Shop.create = function () {
    var shop = new Shop();
    return shop;
};
