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


var ResultLayer = cc.Layer.extend({

    lblScore: null,
    lblBestScore: null,


    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        // var blackLayer = new cc.Sprite(res.popupLayer);
        // blackLayer.setScale(scale.x, scale.y);
        // blackLayer.attr({
        //     x: size.width / 2,
        //     y: size.height / 2
        // });
        // this.addChild(blackLayer, 0);
        var textGameover = new cc.Sprite(res.textGameOver);
        textGameover.setScale(scaleMin);
        textGameover.attr({
            x: size.width / 2,
            y: size.height * 0.9
        });
        this.addChild(textGameover, 1);


        var bang = new cc.Sprite(res.tableScore);
        bang.setScale(scaleMin);
        bang.attr({
            x: size.width / 2,
            y: size.height * 0.5
        });
        this.addChild(bang, 1);

        var iconScore = new cc.Sprite(res.textScore);
        iconScore.setScale(scaleMin);
        iconScore.attr({
            x: bang.width * 0.5,
            y: bang.height * 0.8
        });
        bang.addChild(iconScore, 1);

        var iconCup = new cc.Sprite(res.textBest);
        iconCup.setScale(scaleMin);
        iconCup.attr({
            x: bang.width * 0.5,
            y: bang.height * 0.45
        });
        bang.addChild(iconCup, 1);

        {
            this.lblScore = new cc.LabelTTF(gameScene._score.toString(), res.font.srcs[0], 60);
            //this.lblScore.setFontFillColor(new cc.Color(0, 0, 0, 255));
            this.lblScore.enableStroke(new cc.Color(255, 255, 255, 255), 1);
            this.lblScore.setAnchorPoint(0.5, 0.5);
            bang.addChild(this.lblScore, 10);
            this.lblScore.attr({
                x: bang.width * 0.5,
                y: bang.height * 0.625
            });

            this.lblBestScore = new cc.LabelTTF(gameScene._bestScore.toString(), res.font.srcs[0], 60);
            this.lblBestScore.setFontFillColor(new cc.Color(0, 255, 238, 255));
            //this.lblBestScore.enableStroke(new cc.Color(255, 255, 255, 255), 1);
            this.lblBestScore.setAnchorPoint(0.5, 0.5);
            bang.addChild(this.lblBestScore, 10);
            this.lblBestScore.attr({
                x: bang.width * 0.5,
                y: bang.height * 0.225
            });
        }

        var btnNewGame = new ccui.Button();
        btnNewGame.setScale(scaleMin);
        btnNewGame.loadTextureNormal(res.btnPlay, ccui.Widget.LOCAL_TEXTURE);
        btnNewGame.attr({
            x: bang.width / 2,
            y: bang.height * 0
        });
        btnNewGame.setScale(scaleMin);
        bang.addChild(btnNewGame, 1);
        btnNewGame.addClickEventListener(function () {
            gameScene.onPlay();
        });

        var textPlay = new cc.Sprite(res.replay);
        textPlay.setScale(scaleMin);
        textPlay.attr({
            x: btnNewGame.width / 2,
            y: btnNewGame.height * 0.5
        });
        btnNewGame.addChild(textPlay, 0);

        var btnHTP = new ccui.Button();
        btnHTP.loadTextureNormal(res.btnHTP, ccui.Widget.LOCAL_TEXTURE);
        btnHTP.attr({
            x: size.width * 0.9,
            y: size.height * 0.15 
            // y:  logo.y -logo.height/2 - btnNewGame.height/2 - 50
        });
        // btnHTP.setScale(scaleMin);
        this.addChild(btnHTP, 0);
        btnHTP.addClickEventListener(function () {
            gameScene.onHelp();
        });

        var btnHome = new ccui.Button();
        btnHome.loadTextureNormal(res.btnHome, ccui.Widget.LOCAL_TEXTURE);
        btnHome.attr({
            x: size.width * 0.8,
            y: size.height * 0.15 
            // y:  logo.y -logo.height/2 - btnNewGame.height/2 - 50
        });
        // btnHome.setScale(scaleMin);
        this.addChild(btnHome, 0);
        btnHome.addClickEventListener(function () {
            gameScene.onHome();
        });
        
        return true;
    },

    onEnter: function () {
        this._super();
        this.lblScore.setString(gameScene._score.toString());
        this.lblBestScore.setString(gameScene._bestScore.toString());
    },

    updateLabel: function () {
        this.lblScore.setString(gameScene._score.toString());
        this.lblBestScore.setString(gameScene._bestScore.toString());
    }
});

ResultLayer.create = function () {
    var popupHelp = new ResultLayer();
    // popupHelp.retain();
    // gameScene.addChild(hitEffect, 10);
    return popupHelp;
};
