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


var PopupHelp = cc.Layer.extend({

    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        console.log("init popup help");

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        // var blackLayer = new cc.Sprite(res.bgHTP);
        // blackLayer.setScale(scale.x, scale.y);
        // blackLayer.attr({
        //     x: size.width / 2,
        //     y: size.height / 2
        // });
        // this.addChild(blackLayer, 0);

        // var btnBack = new ccui.Button();
        // btnBack.loadTextureNormal(res.btnHome, ccui.Widget.LOCAL_TEXTURE);
        // btnBack.setScale(scaleMin);
        // btnBack.attr({
        //     x: size.width * 0.075,
        //     y: size.height * 0.9
        // });
        // this.addChild(btnBack, 1);
        // btnBack.addClickEventListener(function () {
        //     gameScene.onHome();
        // });

        var btnNewGame = new ccui.Button();
        btnNewGame.setScale(scaleMin * 0.8);
        btnNewGame.loadTextureNormal(res.btnPlay, ccui.Widget.LOCAL_TEXTURE);
        btnNewGame.attr({
            x: size.width / 2,
            y: size.height * 0.1
        });
        this.addChild(btnNewGame, 0);
        btnNewGame.addClickEventListener(function () {
            gameScene.onPlay();
        });

        var textPlay = new cc.Sprite(res.textPlay);
        textPlay.setScale(scaleMin);
        textPlay.attr({
            x: btnNewGame.width / 2,
            y: btnNewGame.height * 0.5
        });
        btnNewGame.addChild(textPlay, 0);

        var img1 = new cc.Sprite(res.img1);
        img1.setScale(scaleMin);
        img1.attr({
            x: size.width * 0.05,
            y: size.height * 0.75
        });
        this.addChild(img1, 0);

        var img2 = new cc.Sprite(res.img2);
        img2.setScale(scaleMin);
        img2.attr({
            x: size.width * 0.05,
            y: size.height * 0.5
        });
        this.addChild(img2, 0);

        var img3 = new cc.Sprite(res.img3);
        img3.setScale(scaleMin);
        img3.attr({
            x: size.width * 0.95,
            y: size.height * 0.75
        });
        this.addChild(img3, 0);

        var demo1 = new cc.Sprite(res.demo1);
        demo1.setScale(scaleMin);
        demo1.attr({
            x: size.width * 0.725,
            y: size.height * 0.5
        });
        this.addChild(demo1, 0);

        var demo2 = new cc.Sprite(res.demo2);
        demo2.setScale(scaleMin);
        demo2.attr({
            x: size.width * 0.3,
            y: size.height * 0.6
        });
        this.addChild(demo2, 0);

        var textDemo = new cc.Sprite(res.textDemo);
        textDemo.setScale(scaleMin);
        textDemo.attr({
            x: size.width / 2,
            y: size.height * 0.9
        });
        this.addChild(textDemo, 0);

        return true;
    }
});

PopupHelp.create = function () {
    var popupHelp = new PopupHelp();
    return popupHelp;
};
