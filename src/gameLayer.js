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

var gameBall;

var GameLayer = cc.Layer.extend({
    nContent: null,
    gameOver: false,

    timeProgressBar: 100,

    lblScore: null,

    currentQuestion: 0,

    question1: null,
    question2: null,
    question3: null,
    question4: null,
    cong: null,
    tru: null,
    bang: null,
    correctAnswer: null,

    contentQues1: null,
    contentQues2: null,
    contentQues3: null,
    contentQues4: null,

    listPosAnswer: [],
    indexAns: null,

    showAns: [],
    listWrongAns: [],

    deltaPoint: 10,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.initBG();
        this.cloneSelect();
    },

    initBG: function () {
        this.nContent = new cc.Node();
        this.addChild(this.nContent, 3);

        var btnBack = new ccui.Button();
        btnBack.loadTextureNormal(res.btnHome, ccui.Widget.LOCAL_TEXTURE);
        btnBack.setScale(scaleMin);
        btnBack.attr({
            x: size.width * 0.06,
            y: size.height * 0.9
        });
        this.addChild(btnBack, 1);
        btnBack.addClickEventListener(function () {
            gameScene.onHome();
        });

        var tableScore = new cc.Sprite(res.bgScore);
        tableScore.setPosition(size.width * 0.875, size.height * 0.9);
        tableScore.setScale(1.5, 0.9);
        this.addChild(tableScore);

        var score = new cc.Sprite(res.Score);
        score.attr({
            x: size.width * 0.84,
            y: size.height * 0.9
        });
        this.addChild(score, 1);

        this.lblScore = new cc.LabelTTF(gameScene._score.toString(), res.font.srcs[0], 50);
        this.lblScore.setFontFillColor(new cc.Color(87, 49, 0, 255));
        this.lblScore.attr({
            x: size.width * 0.89,
            y: size.height * 0.92
        });
        this.addChild(this.lblScore, 1);
        this.lblScore.setAnchorPoint(0, 0.5);
        this.lblScore.enableStroke(new cc.Color(255, 255, 255, 255), 3);

        var BGbar = new cc.Sprite(res.loadingBG);
        BGbar.setPosition(size.width * 0.25, size.height * 0.2);
        BGbar.setScale(scaleMin);
        this.addChild(BGbar);

        this.loadingBar = new ccui.LoadingBar();
        this.loadingBar.loadTexture(res.loadingIMG);
        this.loadingBar.setScale(scaleMin);
        this.loadingBar.x = BGbar.width * 0.425;
        this.loadingBar.y = BGbar.height * 0.575;
        BGbar.addChild(this.loadingBar);
        this.loadingBar.setPercent(this.timeProgressBar);

        var time = new cc.Sprite(res.Time);
        time.attr({
            x: size.width * 0.15,
            y: size.height * 0.275
        });
        this.addChild(time, 1);

        this.question1 = new cc.Sprite(res.calShape);
        this.question1.attr({
            x: size.width * 0.05,
            y: size.height * 0.5
        });
        this.addChild(this.question1, 1);

        this.question2 = new cc.Sprite(res.calShape);
        this.question2.attr({
            x: size.width * 0.175,
            // 175   225
            y: size.height * 0.5
        });
        this.addChild(this.question2, 1);

        this.question3 = new cc.Sprite(res.calShape);
        this.question3.attr({
            x: size.width * 0.425,
            y: size.height * 0.5
        });
        this.addChild(this.question3, 1);

        this.question4 = new cc.Sprite(res.calShape);
        this.question4.attr({
            x: size.width * 0.3,
            y: size.height * 0.5
        });
        this.addChild(this.question4, 1);
        this.question4.setVisible(false);

        this.cong = new cc.Sprite(res.imgCong);
        this.cong.attr({
            x: size.width * 0.1125,
            y: size.height * 0.5
        });
        this.addChild(this.cong, 1);

        this.tru = new cc.Sprite(res.imgTru);
        this.tru.attr({
            x: size.width * 0.2375,
            y: size.height * 0.5
        });
        this.addChild(this.tru, 1);
        this.tru.setVisible(false);

        this.bang = new cc.Sprite(res.imgBang);
        this.bang.attr({
            x: size.width * 0.3625,
            y: size.height * 0.5
        });
        this.addChild(this.bang, 1);

        this.contentQues1 = new cc.Sprite(res.calShape);
        this.contentQues1.attr({
            x: this.question1.width * 0.5,
            y: this.question1.height * 0.5
        });
        this.question1.addChild(this.contentQues1, 1);

        this.contentQues2 = new cc.Sprite(res.calShape);
        this.contentQues2.attr({
            x: this.question2.width * 0.5,
            y: this.question2.height * 0.5
        });
        this.question2.addChild(this.contentQues2, 1);

        this.contentQues3 = new cc.Sprite(res.calShape);
        this.contentQues3.attr({
            x: this.question3.width * 0.5,
            y: this.question3.height * 0.5
        });
        this.question3.addChild(this.contentQues3, 1);

        this.contentQues4 = new cc.Sprite(res.calShape);
        this.contentQues4.attr({
            x: this.question4.width * 0.5,
            y: this.question4.height * 0.5
        });
        this.question4.addChild(this.contentQues4, 1);

        this.correctAnswer = new cc.Sprite(res.test);
        this.correctAnswer.attr({
            x: size.width * 0.5,
            y: size.height * 0.5
        });
        this.addChild(this.correctAnswer, 3);
    },

    cloneSelect: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 5; j++) {
                var select = new cc.Sprite(res.noSelect);
                select.setScale(scaleMin);
                select.attr({
                    x: size.width * (0.525 + 0.1 * j),
                    y: size.height * (0.7 - 0.2 * i)
                });
                this.addChild(select, 1);
                this.listPosAnswer.push(select);
            }
        }
    },

    initQuestion: function () {
        this.currentQuestion += 1;

        if (this.currentQuestion > 5) {
            this.question4.setVisible(true);
            this.question1.setPosition(size.width * 0.05, size.height * 0.5);
            this.question2.setPosition(size.width * 0.175, size.height * 0.5);
            this.question3.setPosition(size.width * 0.425, size.height * 0.5);
            this.tru.setVisible(true);
            this.cong.setPosition(size.width * 0.1125, size.height * 0.5);
            this.bang.setPosition(size.width * 0.3625, size.height * 0.5);
        } else {
            this.question4.setVisible(false);
            this.question1.setPosition(size.width * 0.05, size.height * 0.5);
            this.question2.setPosition(size.width * 0.225, size.height * 0.5);
            this.question3.setPosition(size.width * 0.4, size.height * 0.5);
            this.tru.setVisible(false);
            this.cong.setPosition(size.width * 0.1375, size.height * 0.5);
            this.bang.setPosition(size.width * 0.3125, size.height * 0.5);
        }

        if (this.currentQuestion > 10) {
            this.gameOver = true;
        }

        var content1 = "";
        var content2 = "";
        var content3 = "";
        var content4 = "";

        switch (this.currentQuestion) {
            case 1:
                content1 = res.calculator_3;
                content2 = res.calculator_4;
                break;
            case 2:
                content1 = res.calculator_6;
                content2 = res.calculator_7;
                break;
            case 3:
                content1 = res.calculator_6;
                content3 = res.calculator_10;
                break;
            case 4:
                content1 = res.calculator_12;
                content3 = res.calculator_19;
                break;
            case 5:
                content1 = res.calculator_10;
                content2 = res.calculator_11;
                break;
            case 6:
                content1 = res.calculator_10;
                content2 = res.calculator_11;
                content4 = res.calculator_3;
                break;
            case 7:
                content1 = res.calculator_18;
                content2 = res.calculator_12;
                content4 = res.calculator_20;
                break;
            case 8:
                content1 = res.calculator_4;
                content2 = res.calculator_8;
                content4 = res.calculator_9;
                break;
            case 9:
                content1 = res.calculator_20;
                content2 = res.calculator_20;
                content3 = res.calculator_18;
                break;
            case 10:
                content2 = res.calculator_3;
                content3 = res.calculator_8;
                content4 = res.calculator_10;
                break;
        }

        this.contentQues1.setTexture(content1);
        this.contentQues2.setTexture(content2);
        this.contentQues3.setTexture(content3);
        this.contentQues4.setTexture(content4);

        this.initAnswer();
    },

    initAnswer: function () {
        var ans = "";
        //Math.floor(Math.random() * (max - min) ) + min;
        for (let i = 0; i < this.listPosAnswer.length; i++) {
            this.listPosAnswer[i].removeAllChildren();
        }
        var currentPosAnswer = [];
        let random = null;
        this.listWrongAns = [];
        this.listPosAnswer.forEach(element => {
            element.setTexture(res.calShape);
        });
        switch (this.currentQuestion) {
            case 1:
                currentPosAnswer = [7, 12, 2, 17];
                ans = res.into_1;
                this.listWrongAns = [res.into_7, res.into_2, res.into_17];
                break;
            case 2:
                currentPosAnswer = [7, 12, 2, 17];
                this.listWrongAns = [res.into_7, res.into_12, res.into_17];
                ans = res.into_2;
                break;
            case 3:
                currentPosAnswer = [6, 7, 8, 11, 12, 13];
                this.listWrongAns = [res.into_7, res.into_12, res.into_17, res.into_6, res.into_11];
                this.deltaPoint = 15;
                ans = res.into_9;
                break;
            case 4:
                currentPosAnswer = [6, 7, 8, 11, 12, 13];
                this.listWrongAns = [res.into_8, res.into_18, res.into_17, res.into_6, res.into_11];
                ans = res.into_12;
                break;
            case 5:
                currentPosAnswer = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
                this.listWrongAns = [res.into_8, res.into_12, res.into_17, res.into_6, res.into_19, res.into_14, res.into_5, res.into_9, res.into_18];
                this.deltaPoint = 20;
                ans = res.into_1;
                break;
            case 6:
                currentPosAnswer = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
                this.listWrongAns = [res.into_14,
                res.into_10,
                res.into_18,
                res.into_6,
                res.into_2,
                res.into_8,
                res.into_7,
                res.into_1,
                res.into_9,
                res.into_20,
                ];
                ans = res.into_4;
                break;
            case 7:
                currentPosAnswer = [1, 2, 3, 6, 7, 8, 11, 12, 13, 16, 17, 18];
                this.listWrongAns = [res.into_20,
                res.into_18,
                res.into_3,
                res.into_11,
                res.into_14,
                res.into_5,
                res.into_2,
                res.into_16,
                res.into_6,
                res.into_17,
                res.into_9];
                this.deltaPoint = 25;
                ans = res.into_12;
                break;
            case 8:
                currentPosAnswer = [1, 2, 3, 6, 7, 8, 11, 12, 13, 16, 17, 18];
                this.listWrongAns = [
                res.into_7,
                res.into_17,
                res.into_10,
                res.into_9,
                res.into_12,
                res.into_18,
                res.into_6,
                res.into_15,
                res.into_8,
                res.into_5,
                res.into_19];
                ans = res.into_11;
                break;
            case 9:
                currentPosAnswer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
                this.listWrongAns = [res.into_4,
                res.into_9,
                res.into_3,
                res.into_10,
                res.into_6,
                res.into_7,
                res.into_1,
                res.into_16,
                res.into_12,
                res.into_5,
                res.into_17,
                res.into_2,
                res.into_13,
                res.into_11,
                res.into_15,
                res.into_18,
                res.into_8,
                res.into_20,
                res.into_19];
                this.deltaPoint = 30;
                ans = res.into_14;
                break;
            case 10:
                currentPosAnswer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
                this.listWrongAns = [res.into_6,
                res.into_1,
                res.into_13,
                res.into_20,
                res.into_12,
                res.into_11,
                res.into_5,
                res.into_4,
                res.into_15,
                res.into_3,
                res.into_19,
                res.into_2,
                res.into_14,
                res.into_10,
                res.into_17,
                res.into_7,
                res.into_16,
                res.into_8,
                res.into_18]
                ans = res.into_9;
                break;
        }

        random = Math.floor(Math.random() * currentPosAnswer.length);
        this.indexAns = currentPosAnswer[random];
        currentPosAnswer.splice(random, 1);

        for (let i = 0; i < currentPosAnswer.length; i++) {
            let wrongAnswer = new cc.Sprite(this.listWrongAns[i]);
            this.listPosAnswer[currentPosAnswer[i]].setTexture(res.shape);
            this.listPosAnswer[currentPosAnswer[i]].addChild(wrongAnswer, 3);
            wrongAnswer.setPosition(this.listPosAnswer[currentPosAnswer[i]].width * 0.5, this.listPosAnswer[currentPosAnswer[i]].height * 0.5);
        }
        this.listPosAnswer[this.indexAns].setTexture(res.shape);
        this.correctAnswer.setTexture(ans);
        this.correctAnswer.setPosition(this.listPosAnswer[this.indexAns].getPosition());
    },

    onDown: function (touch) {
        if (this.gameOver) return;
        for (var i = 0; i < this.listPosAnswer.length; i++) {
            if (this.checkPositionMatch(this.listPosAnswer[i], touch)) {
                if (i == this.indexAns) {
                    this.timeProgressBar += 20;
                    gameScene._score += this.deltaPoint;
                    this.lblScore.setString(gameScene._score);
                    if (this.timeProgressBar > 100) {
                        this.timeProgressBar = 100;
                    }
                    if (gameScene._score > gameScene._bestScore) {
                        gameScene._bestScore = gameScene._score;
                    }
                    this.initQuestion();
                } else {
                    let obj = null;
                    switch (this.currentQuestion) {
                        case 1:
                            obj = this.contentQues3;
                            break;
                        case 2:
                            obj = this.contentQues3;
                            break;
                        case 3:
                            obj = this.contentQues2;
                            break;
                        case 4:
                            obj = this.contentQues2;
                            break;
                        case 5:
                            obj = this.contentQues3;
                            break;
                        case 6:
                            obj = this.contentQues3;
                            break;
                        case 7:
                            obj = this.contentQues3;
                            break;
                        case 8:
                            obj = this.contentQues3;
                            break;
                        case 9:
                            obj = this.contentQues4;
                            break;
                        case 10:
                            obj = this.contentQues1;
                            break;

                    }
                    obj.setTexture(this.listPosAnswer[i].children[0].getTexture());
                    this.timeProgressBar -= 20;
                }
            }
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

    checkRectMatch: function (obj1, obj2) {
        if (cc.rectIntersectsRect(obj1.getBoundingBox(), obj2.getBoundingBox())) {
            return true;
        } else {
            return false;
        }
    },

    reset: function () {
        this.resetStatus();
        this.initQuestion();
    },

    resetStatus: function () {
        this.deltaPoint = 10
        this.gameOver = false;
        this.timeProgressBar = 100;
        this.currentQuestion = 0;
        this.lblScore.setString(gameScene._score.toString());
    },

    onEnter: function () {
        this._super();
        this.scheduleUpdate();

        // this.reset();
    },

    onExit: function () {
        this._super();
        var that = this;
        var cal = function () {
            that.unscheduleUpdate();
        };
    },



    update: function (dt) {
        if (!this.gameOver && gameScene.gameState == 1) {
            this.timeProgressBar -= dt;
            this.loadingBar.setPercent(this.timeProgressBar);
            if (this.timeProgressBar <= 0) {
                this.gameOver = true;
            }
        } else if (this.gameOver && gameScene.gameState == 1) {
            gameScene.onEndGame();
        }
    },
});

GameLayer.create = function () {
    var gameLayer = new GameLayer();

    return gameLayer;
};
