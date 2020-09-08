
var res = {
    font: {
        type: "font",
        name: "SVN-Block",
        srcs: ["res/Font/SVN-Block.ttf"]
    },
    bgMusic: "res/bgMusic.mp3",

    bg_plist: './../res/LogoGame/LogoGame.plist',
    bg_png: './../res/LogoGame/LogoGame.png',

    // Menu Maps 
    menuMap3: './../res/Maps/map fall-01.png',
    menuMap1: './../res/Maps/map spring-01.png',
    menuMap2: './../res/Maps/map summer-01.png',
    menuMap4: './../res/Maps/map winter-01.png',

    // Items Map
    map1_plist: './../res/Items_map/Map1.plist',
    map1_png: './../res/Items_map/Map1.png',

    map2_plist: './../res/Items_map/Map2.plist',
    map2_png: './../res/Items_map/Map2.png',

    map3_plist: './../res/Items_map/Map3.plist',
    map3_png: './../res/Items_map/Map3.png',

    map4_plist: './../res/Items_map/Map4.plist',
    map4_png: './../res/Items_map/Map4.png',

    //Items Menu 

    itemMenu_plist: './../res/Items_menu/Item_menu.plist',
    itemMenu_png: './../res/Items_menu/Item_menu.png',

    //font 
    // fontGame: './../res/Font',



};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
