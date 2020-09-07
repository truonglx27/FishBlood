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

    onEnter: function () {
        this._super();
        gameScene = this;


        var bg = new Background();
        this.addChild(bg);


        // var bg = new cc.Sprite(res.logo);
        // bg.attr({
        //     x: size.width / 2,
        //     y: size.height / 2
        // });
        // bg.setScale(scale.x, scale.y);
        // this.addChild(bg);

        // this.shopLayer = Shop.create();
        // this.addChild(this.shopLayer);
        // this.shopLayer.setVisible(false);

        // var self = this;
        // if (cc.sys.capabilities.hasOwnProperty('touches')) {
        //     cc.eventManager.addListener({
        //         event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //         swallowTouches: true,
        //         onTouchBegan: function (touch, event) {
        //             // if (gameScene.gameState == 2) {
        //             //     self.questionLayer.onDown(touch.getLocation());
        //             // } else 
        //             if (gameScene.gameState == 1) {
        //                 self.gameLayer.onDown(touch.getLocation());
        //             }
        //         },
        //     }, bg);
        // } else {
        //     cc.eventManager.addListener({
        //         event: cc.EventListener.MOUSE,
        //         onMouseDown: function (event) {
        //             // if (gameScene.gameState == 2) {
        //             //     self.questionLayer.onDown(event.getLocation());
        //             // } else 
        //             if (gameScene.gameState == 1) {
        //                 self.gameLayer.onDown(event.getLocation());
        //             }
        //         },
        //     }, bg);
        // }
    },
});

