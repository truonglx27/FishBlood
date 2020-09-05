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
var gameScene;

var size = cc.winSize;

// var size = {width: 1280, height: 720};
var scale = { x: cc.winSize.width / 1280, y: cc.winSize.height / 720 };
var scaleMin = scale.x < scale.y ? scale.x : scale.y;
var gameState = 0;

var HelloWorldScene = cc.Scene.extend({

    _level: 0,
    _score: 100,

    _bestScore: 100,
    _silveScore: 0000,
    _brozenScore: 0000,

    _isSoundOn: 2,

    gameState: 10,
    myHeart: 0,
    currentChar: 3,

    homeLayer: null,
    popupEndGame: null,
    popupHelp: null,
    gameLayer: null,
    questionLayer: null,
    popupHighScore: null,
    shopLayer: null,

    setSound: function (value) {
        this._isSoundOn = value;
        cc.sys.localStorage.setItem("sound", value);
    },

    setBestScore: function (score) {
        if (score > this._bestScore) {
            this._bestScore = score;
            cc.sys.localStorage.setItem("bestScore", score);
        }

    },

    onEnter: function () {
        this._super();
        gameScene = this;

        // console.error("winsize ", size.width, " --- ", size.height);

        var level = cc.sys.localStorage.getItem("bestScore");
        if (level) {
            this.setBestScore(parseInt(level));
        }

        // console.error("level ", level);

        var soundValue = cc.sys.localStorage.getItem("sound");
        if (soundValue) {
            this.setSound(parseInt(soundValue));
        }
        else {
            this.setSound(2);
        }
        // console.error("soundValue ", soundValue);


        var bg = new cc.Sprite(res.bg);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        bg.setScale(scale.x, scale.y);
        this.addChild(bg);

        this.homeLayer = HomeLayer.create();
        this.addChild(this.homeLayer);
        //this.homeLayer.setSound(this._isSoundOn);
        //this.homeLayer.setVisible(false);

        this.shopLayer = Shop.create();
        this.addChild(this.shopLayer);
        this.shopLayer.setVisible(false);

        this.gameLayer = GameLayer.create();
        this.addChild(this.gameLayer);
        this.gameLayer.setVisible(false);

        this.questionLayer = QuestionLayer.create();
        this.addChild(this.questionLayer);
        this.questionLayer.setVisible(false);

        var top = new cc.Sprite(res.decorTop);
        top.setAnchorPoint(0.5, 1);
        top.attr({
            x: size.width / 2,
            y: size.height
        });
        top.setScale(scale.x, scale.y);
        this.addChild(top);

        var left = new cc.Sprite(res.decorL);
        left.setAnchorPoint(0, 0);
        left.setScale(scale.x, scale.y);
        this.addChild(left);

        var right = new cc.Sprite(res.decorR);
        right.setAnchorPoint(1, 0);
        right.attr({
            x: size.width
        });
        right.setScale(scale.x, scale.y);
        this.addChild(right);

        this.popupEndGame = ResultLayer.create();
        this.addChild(this.popupEndGame);
        this.popupEndGame.setVisible(false);

        this.popupHighScore = PopupHighScore.create();
        this.addChild(this.popupHighScore);
        this.popupHighScore.setVisible(false);

        this.popupHelp = PopupHelp.create();
        this.addChild(this.popupHelp);
        this.popupHelp.setVisible(false);

        var self = this;
        if (cc.sys.capabilities.hasOwnProperty('touches')) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    // if (gameScene.gameState == 2) {
                    //     self.questionLayer.onDown(touch.getLocation());
                    // } else 
                    if (gameScene.gameState == 1) {
                        self.gameLayer.onDown(touch.getLocation());
                    }
                },
            }, bg);
        } else {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    // if (gameScene.gameState == 2) {
                    //     self.questionLayer.onDown(event.getLocation());
                    // } else 
                    if (gameScene.gameState == 1) {
                        self.gameLayer.onDown(event.getLocation());
                    }
                },
            }, bg);
        }
    },

    onQuestion: function () {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(false);
        this.popupEndGame.setVisible(false);
        this.popupHighScore.setVisible(false);
        this.shopLayer.setVisible(false);
        this.questionLayer.setVisible(true);
        gameScene.gameState = 2;

        this.questionLayer.currentQuestion = 0;
        this.questionLayer.onQuestion();

        this.myHeart = 0;
        this.questionLayer.initHeart();
    },

    onShop: function () {
        this.shopLayer.lblScore.setString(this._score);
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(false);
        this.popupEndGame.setVisible(false);
        this.popupHighScore.setVisible(false);
        this.shopLayer.setVisible(true);
        this.questionLayer.setVisible(false);
        gameScene.gameState = 5;
    },

    onPlay: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(true);
        this.popupEndGame.setVisible(false);
        // this.popupHighScore.setVisible(false);
        // this.questionLayer.setVisible(false);
        // this.shopLayer.setVisible(false);
        gameScene.gameState = 1;
        this._score = 0;
        this.gameLayer.reset();
    },

    onHome: function (sender) {
        this.homeLayer.setVisible(true);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(false);
        this.popupEndGame.setVisible(false);
        this.popupHighScore.setVisible(false);
        this.questionLayer.setVisible(false);
        this.shopLayer.setVisible(false);
        gameScene.gameState = 0;
    },

    onHelp: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(true);
        this.gameLayer.setVisible(false);
        this.popupEndGame.setVisible(false);
        this.shopLayer.setVisible(false);
        this.popupHighScore.setVisible(false);
    },

    onHighScore: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(false);
        this.popupEndGame.setVisible(false);
        this.popupHighScore.setVisible(true);
        this.shopLayer.setVisible(false);
    },

    onReplay: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(true);
        this.popupEndGame.setVisible(false);
        this.popupHighScore.setVisible(false);
        this.shopLayer.setVisible(false);
        this.gameLayer.enemyQuantity = 2;
        this.gameLayer.reset();
        //this.gameLayer.initGame();
        this.onQuestion();
    },


    onSound: function () {
        if (this._isSoundOn == 2) {
            this.setSound(1);
            this.homeLayer.setSound(1);

        }
        else {
            this.setSound(2);
            this.homeLayer.setSound(2);

        }
    },


    onEndGame: function (sender) {
        this.homeLayer.setVisible(false);
        this.popupHelp.setVisible(false);
        this.gameLayer.setVisible(false);
        this.popupEndGame.setVisible(true);
        this.popupEndGame.updateLabel();
        // this.popupHighScore.setVisible(false);
        // this.popupHighScore.updateLabel();
        gameScene.gameState = 0;
    },
});

