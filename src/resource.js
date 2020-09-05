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

var res = {
    font: {
        type: "font",
        name: "SVN-Block",
        srcs: ["res/Font/SVN-Block.ttf"]
    },
    bgMusic: "res/bgMusic.mp3",

    //Home
    bg: "res/Home/Background.png",
    logo: "res/Home/Shape Math logo.png",
    btnPlay: "res/Home/Play button.png",
    textPlay: "res/Home/PLAY.png",
    btnHTP: "res/Home/How to play.png",

    //HTP
    img1: "res/How to play/1.png",
    img2: "res/How to play/2.png",
    img3: "res/How to play/3.png",
    demo1: "res/How to play/SHAPE demo.png",
    demo2: "res/How to play/Demo2.png",
    textDemo: "res/How to play/Text.png",
    replay: "res/How to play/Replay.png",

    //GameOver
    textGameOver: "res/Game over/GAME OVER.png",
    textBest: "res/Game over/BEST.png",
    textScore: "res/Game over/SCORE.png",
    btnHome: "res/Game over/Home.png",
    tableScore: "res/Game over/Score table.png",

    //Game
    imgCong: "res/Play/+.png",
    imgTru: "res/Play/-.png",
    imgBang: "res/Play/=.png",
    bgScore: "res/Play/BG score.png",
    Close: "res/Play/Close.png",
    loadingBG: "res/Play/Loading BG.png",
    loadingIMG: "res/Play/Loading.png",
    Score: "res/Play/Score.png",
    Time: "res/Play/time.png",
    noSelect: "res/Play/No select.png",

    //Play game
    shape: "res/Stock Shape/Shape.png",
    calShape: "res/Stock Shape/Cal. Shape.png",

    calculator_1: "res/Stock Shape/calculator/0,5 Ellipse down copy 2.png",
    calculator_2: "res/Stock Shape/calculator/0,5 Ellipse down copy.png",
    calculator_3: "res/Stock Shape/calculator/0,5 Ellipse down.png",
    calculator_4: "res/Stock Shape/calculator/0,5 Ellipse top.png",
    calculator_5: "res/Stock Shape/calculator/0,5 Square down.png",
    calculator_6: "res/Stock Shape/calculator/0,25 Ellipse L bot.png",
    calculator_7: "res/Stock Shape/calculator/0,25 Ellipse L top.png",
    calculator_8: "res/Stock Shape/calculator/0,25 Ellipse R bot.png",
    calculator_9: "res/Stock Shape/calculator/0,25 Ellipse R top.png",
    calculator_10: "res/Stock Shape/calculator/0,25 x2 2.png",
    calculator_11: "res/Stock Shape/calculator/0,25 x2.png",
    calculator_12: "res/Stock Shape/calculator/Square copy 2.png",
    calculator_13: "res/Stock Shape/calculator/Square X2 copy 2.png",
    calculator_14: "res/Stock Shape/calculator/Square X2 copy.png",
    calculator_15: "res/Stock Shape/calculator/Square copy 3.png",
    calculator_16: "res/Stock Shape/calculator/Square copy.png",
    calculator_17: "res/Stock Shape/calculator/Square X2.png",
    calculator_18: "res/Stock Shape/calculator/Square X22.png",
    calculator_19: "res/Stock Shape/calculator/x2 copy 2.png",
    calculator_20: "res/Stock Shape/calculator/x2 copy 3.png",

    into_1: "res/Stock Shape/into/0,5 Ellipse down copy 2.png",
    into_2: "res/Stock Shape/into/0,5 Ellipse down copy.png",
    into_3: "res/Stock Shape/into/0,5 Ellipse down.png",
    into_4: "res/Stock Shape/into/0,5 Ellipse top.png",
    into_5: "res/Stock Shape/into/0,5 Square down.png",
    into_6: "res/Stock Shape/into/0,25 Ellipse L bot.png",
    into_7: "res/Stock Shape/into/0,25 Ellipse L top.png",
    into_8: "res/Stock Shape/into/0,25 Ellipse R bot.png",
    into_9: "res/Stock Shape/into/0,25 Ellipse R top.png",
    into_10: "res/Stock Shape/into/0,25 x2 2.png",
    into_11: "res/Stock Shape/into/0,25 x2.png",
    into_12: "res/Stock Shape/into/Square copy 2.png",
    into_13: "res/Stock Shape/into/Square copy 5 - Copy.png",
    into_14: "res/Stock Shape/into/Square copy 5.png",
    into_15: "res/Stock Shape/into/Square X2 copy 2 - Copy.png",
    into_16: "res/Stock Shape/into/Square X2 copy 2.png",
    into_17: "res/Stock Shape/into/Square X2 copy.png",
    into_18: "res/Stock Shape/into/Square X2.png",
    into_19: "res/Stock Shape/into/x2 copy 2.png",
    into_20: "res/Stock Shape/into/x2 copy 3.png",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
