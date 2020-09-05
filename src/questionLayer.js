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

var QuestionLayer = cc.Layer.extend({
    question: null,
    listHeart: null,
    listAnswer: null,
    currentQuestion: 0,

    answer1: null,
    answer2: null,
    answer3: null,

    qes: [],
    trueAns: [],

    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.nContent = new cc.Node();
        this.addChild(this.nContent, 1);

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

        let heart2 = new cc.Sprite(res.iconHeart2);
        heart2.setScale(scaleMin);
        heart2.attr({
            x: size.width * 0.45,
            y: heart2.height * scaleMin * 12.5
        });
        this.addChild(heart2, 2);
        heart2.setVisible(false);

        let heart3 = new cc.Sprite(res.iconHeart2);
        heart3.setScale(scaleMin);
        heart3.attr({
            x: size.width * 0.5,
            y: heart3.height * scaleMin * 12.5
        });
        this.addChild(heart3, 2);
        heart3.setVisible(false);

        let heart4 = new cc.Sprite(res.iconHeart2);
        heart4.setScale(scaleMin);
        heart4.attr({
            x: size.width * 0.55,
            y: heart4.height * scaleMin * 12.5
        });
        this.addChild(heart4, 2);
        heart4.setVisible(false);

        this.listHeart = [];
        this.listHeart.push(heart2, heart3, heart4);

        this.question = new cc.Sprite(res.question);
        this.question.setScale(scaleMin);
        this.question.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.question, 2);

        let questionContent = new cc.LabelTTF("question", res.font.srcs[0], 40);
        this.question.addChild(questionContent, 100);
        questionContent.enableStroke(new cc.Color(255, 255, 255, 255), 1);
        questionContent.attr({
            x: this.question.width / 2,
            y: this.question.height / 2
        });

        this.answer1 = new cc.Sprite(res.answer);
        this.answer1.setScale(scaleMin);
        this.answer1.attr({
            x: size.width * 0.35,
            y: size.height * 0.35
        });
        this.addChild(this.answer1, 2);

        let answer1Content = new cc.LabelTTF("1", res.font.srcs[0], 30);
        this.answer1.addChild(answer1Content, 100);
        answer1Content.enableStroke(new cc.Color(255, 255, 255, 255), 1);
        answer1Content.attr({
            x: this.answer1.width / 2,
            y: this.answer1.height / 2
        });

        this.answer2 = new cc.Sprite(res.answer);
        this.answer2.setScale(scaleMin);
        this.answer2.attr({
            x: size.width * 0.5,
            y: size.height * 0.35
        });
        this.addChild(this.answer2, 2);

        let answer2Content = new cc.LabelTTF("2", res.font.srcs[0], 30);
        this.answer2.addChild(answer2Content, 100);
        answer2Content.enableStroke(new cc.Color(255, 255, 255, 255), 1);
        answer2Content.attr({
            x: this.answer2.width / 2,
            y: this.answer2.height / 2
        });

        this.answer3 = new cc.Sprite(res.answer);
        this.answer3.setScale(scaleMin);
        this.answer3.attr({
            x: size.width * 0.65,
            y: size.height * 0.35
        });
        this.addChild(this.answer3, 2);

        let answer3Content = new cc.LabelTTF("3", res.font.srcs[0], 30);
        this.answer3.addChild(answer3Content, 100);
        answer3Content.enableStroke(new cc.Color(255, 255, 255, 255), 1);
        answer3Content.attr({
            x: this.answer3.width / 2,
            y: this.answer3.height / 2
        });

        this.onQuestion();
    },

    onDown: function (touch) {
        if (this.currentQuestion == 9) return;
        console.log("down");
        if (this.checkPositionMatch(this.answer1, touch)) {
            this.checkAnswer(this.answer1);
        } else if (this.checkPositionMatch(this.answer2, touch)) {
            this.checkAnswer(this.answer2);
        } else if (this.checkPositionMatch(this.answer3, touch)) {
            this.checkAnswer(this.answer3);
        }
    },

    checkAnswer: function (obj) {
        let ans = obj.getChildren()[0].getString();
        if (ans === this.trueAns[this.currentQuestion]) {
            gameScene.myHeart += 1;
            this.initHeart();
        }
        this.currentQuestion++;
        this.onQuestion();
        if (this.currentQuestion == 6) {
            if (gameScene.myHeart == 0) {
                this.currentQuestion = 0;
                this.onQuestion();
            } else {
                gameScene.onShop();
            }
        }
    },

    onEnter: function () {
        this._super();
        this.scheduleUpdate();
    },

    initHeart: function () {
        if (gameScene.myHeart > 6) {
            gameScene.myHeart = 6;
        }
        if (gameScene.myHeart == 0) {
            this.listHeart[0].setVisible(false);
            this.listHeart[1].setVisible(false);
            this.listHeart[2].setVisible(false);
        }
        if (gameScene.myHeart > 0 && gameScene.myHeart <= 2) {

            this.listHeart[0].setVisible(true);
            this.listHeart[0].setTexture(res.iconHeart2);
            if (gameScene.myHeart == 2) {
                this.listHeart[0].setTexture(res.iconHeart1);
            }
        }
        if (gameScene.myHeart > 2 && gameScene.myHeart <= 4) {
            this.listHeart[0].setVisible(true);
            this.listHeart[1].setVisible(true);
            this.listHeart[1].setTexture(res.iconHeart2);
            if (gameScene.myHeart == 4) {
                this.listHeart[1].setTexture(res.iconHeart1);
            }
        }
        if (gameScene.myHeart > 4 && gameScene.myHeart <= 6) {
            this.listHeart[0].setVisible(true);
            this.listHeart[1].setVisible(true);
            this.listHeart[2].setVisible(true);
            this.listHeart[2].setTexture(res.iconHeart2);
            if (gameScene.myHeart == 6) {
                this.listHeart[2].setTexture(res.iconHeart1);
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

    onExit: function () {
        this._super();
        var that = this;
        var cal = function () {
            that.unscheduleUpdate();
        };
        this.currentQuestion = 0;
    },

    onQuestion: function () {
        let b = Math.floor(Math.random() * 15);
        let c = Math.floor(Math.random() * 15);
        let d = Math.floor(Math.random() * 15);

        this.qes.push(b.toString() + " + " + c.toString() + " - " + d.toString() + " = ");
        this.trueAns.push((b + c - d).toString());
        this.question.getChildren()[0].setString(this.qes[this.currentQuestion]);

        let random = Math.floor(Math.random() * 3);
        let obj = random == 0 ? this.answer1 : random == 1 ? this.answer2 : this.answer3;
        obj.name = "obj" + random;
        obj.getChildren()[0].setString(this.trueAns[this.currentQuestion]);

        if (obj.name == "obj0") {
            this.answer2.getChildren()[0].setString(parseInt(this.trueAns[this.currentQuestion]) + 1);
            this.answer3.getChildren()[0].setString(parseInt(this.trueAns[this.currentQuestion]) + 2);
        }
        if (obj.name == "obj1") {
            this.answer1.getChildren()[0].setString(parseInt(this.trueAns[this.currentQuestion]) - 1);
            this.answer3.getChildren()[0].setString(parseInt(this.trueAns[this.currentQuestion]) + 1);
        }
        if (obj.name == "obj2") {
            this.answer2.getChildren()[0].setString(parseInt(this.trueAns[this.currentQuestion]) - 1);
            this.answer1.getChildren()[0].setString(parseInt(this.trueAns[this.currentQuestion]) - 2);
        }
    },
});

QuestionLayer.create = function () {
    var questionLayer = new QuestionLayer();

    return questionLayer;
};
