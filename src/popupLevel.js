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


var PopupLevel = cc.Layer.extend({

    arrLock: [],
    arrMenu1: [],
    arrMenu2: [],

    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        console.log("init Popup level");

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size


        var bang = new cc.Sprite(res.bgPopup);
        bang.attr({
            x: size.width / 2,
            y: size.height / 2 - 20
        });
        this.addChild(bang, 1);



        var ngang = new cc.Sprite(res.ngang1);
        ngang.attr({
            x: size.width / 2,
            y: bang.y + bang.height / 2 - ngang.height / 2
        });
        ngang.setScaleX(size.width / ngang.width);
        this.addChild(ngang);




        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 5; j++) {
                let level = i * 5 + j;
                var btnMusicNormal = new cc.Sprite(res.btnLevel);
                var btnMusicSeleced = new cc.Sprite(res.btnLevel);
                btnMusicSeleced.setScale(0.9);
                btnMusicSeleced.setOpacity(200);
                var btnMusicDisable = new cc.Sprite(res.btnLevel);
                var btnLevel = new cc.MenuItemSprite(btnMusicNormal, btnMusicSeleced, btnMusicDisable, function () {
                    // this.onButtonEffect();
                    gameScene.onLevel(level);
                    // flareEffect(flare, this, this.onNewGame);
                }.bind(this));


                var text = new cc.LabelTTF((level + 1).toString(), res.font.srcs[0], 32);
                text.setFontFillColor(new cc.Color(69, 69, 68, 255));
                btnLevel.addChild(text);
                text.attr({
                    x: btnLevel.width / 2,
                    y: text.height / 2 + 5
                });

                if (i == 0) {
                    // menu1.addChild(btnLevel);
                    this.arrMenu1.push(btnLevel);
                }
                else {
                    // menu.addChild(btnLevel);
                    this.arrMenu2.push(btnLevel);
                }
            }
        }

        var menu1 = new cc.Menu(this.arrMenu1[0], this.arrMenu1[1], this.arrMenu1[2], this.arrMenu1[3], this.arrMenu1[4]);
        // var menu1 = new cc.Menu();
        // menu1.alignItemsHorizontallyWithPadding(15);
        menu1.alignItemsHorizontallyWithPadding(10);
        menu1.x = bang.width / 2;
        menu1.y = bang.height / 2 + this.arrMenu1[0].height / 2 + 10;
        bang.addChild(menu1, 1);

        var menu = new cc.Menu(this.arrMenu2[0], this.arrMenu2[1], this.arrMenu2[2], this.arrMenu2[3], this.arrMenu2[4]);
        // var menu = new cc.Menu();
        // menu.alignItemsHorizontallyWithPadding(15);
        menu.alignItemsHorizontallyWithPadding(10);
        menu.x = bang.width / 2;
        menu.y = bang.height / 2 - this.arrMenu1[0].height / 2;
        // menu.y = bang.height / 2 + menu.height / 2 + 10;
        bang.addChild(menu, 1);


        return true;
    }
});

PopupLevel.create = function () {
    var popupLevel = new PopupLevel();
    // popupLevel.retain();
    // gameScene.addChild(hitEffect, 10);
    return popupLevel;
};
