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


var PopupHighScore = cc.Layer.extend({

    lblBestScore: null,
    lblSilveScore: null,
    lblBrozenScore: null,

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

        var bang = new cc.Sprite(res.bgHighScore);
        bang.setScale(scaleMin);
        bang.attr({
            x: size.width / 2,
            y: size.height / 2 - 20
        });
        this.addChild(bang, 1);

        var iconScore1 = new cc.Sprite(res.iconTop1);
        // how.setScale(scaleMin);
        iconScore1.attr({
            x: bang.width * 0.25,
            y: 300
        });
        bang.addChild(iconScore1, 1);

        var iconScore2 = new cc.Sprite(res.iconTop2);
        // how.setScale(scaleMin);
        iconScore2.attr({
            x: bang.width * 0.5,
            y: 300
        });
        bang.addChild(iconScore2, 1);

        var iconScore3 = new cc.Sprite(res.iconTop3);
        // how.setScale(scaleMin);
        iconScore3.attr({
            x: bang.width * 0.75,
            y: 300
        });
        bang.addChild(iconScore3, 1);

        {
            this.lblBestScore = new cc.LabelTTF(gameScene._bestScore.toString(), res.font.srcs[0], 40);
            this.lblBestScore.setFontFillColor(new cc.Color(0, 0, 0, 255));
            this.lblBestScore.enableStroke(new cc.Color(255, 255, 255, 255), 1);
            this.lblBestScore.setAnchorPoint(0.5, 0.5);
            bang.addChild(this.lblBestScore, 10);
            this.lblBestScore.attr({
                x: bang.width * 0.25,
                y: iconScore1.getPosition().y - 100
            });

            this.lblSilveScore = new cc.LabelTTF(gameScene._silveScore.toString(), res.font.srcs[0], 40);
            this.lblSilveScore.setFontFillColor(new cc.Color(0, 0, 0, 255));
            this.lblSilveScore.enableStroke(new cc.Color(255, 255, 255, 255), 1);
            this.lblSilveScore.setAnchorPoint(0.5, 0.5);
            bang.addChild(this.lblSilveScore, 10);
            this.lblSilveScore.attr({
                x: bang.width * 0.5,
                y: iconScore2.getPosition().y - 100
            });

            this.lblBrozenScore = new cc.LabelTTF(gameScene._brozenScore.toString(), res.font.srcs[0], 40);
            this.lblBrozenScore.setFontFillColor(new cc.Color(0, 0, 0, 255));
            this.lblBrozenScore.enableStroke(new cc.Color(255, 255, 255, 255), 1);
            this.lblBrozenScore.setAnchorPoint(0.5, 0.5);
            bang.addChild(this.lblBrozenScore, 10);
            this.lblBrozenScore.attr({
                x: bang.width * 0.75,
                y: iconScore3.getPosition().y - 100
            });
        }

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

        return true;
    },

    onEnter: function () {
        this._super();
        this.lblBestScore.setString(gameScene._bestScore.toString());
        // this.lblBestScore.setString(gameScene._bestScore.toString());
    },

    updateLabel: function () {
        this.lblBestScore.setString(gameScene._bestScore.toString());
        // this.lblBestScore.setString(gameScene._bestScore.toString());
    }
});

PopupHighScore.create = function () {
    var popupHighScore = new PopupHighScore();
    return popupHighScore;
};
