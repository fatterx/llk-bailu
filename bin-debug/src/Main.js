/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.mMapRows = 10;
        this.mMapCols = 8;
        this.mItemCount = 6;
        this.mItemWidth = 90;
        this.mItemHeight = 90;
        this.mGameDifficulty = 1;
        this.mTxtProgress = new egret.TextField();
        this.DEFAULT_PROGRESS = 120;
        this.mProgress = this.DEFAULT_PROGRESS;
        this.mLevel = 1;
        this.mTxtLevel = new egret.TextField();
        this.mPoints = [];
        this.mNiu = [
            [0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1],
            [0, 1, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
        ];
        this.mNiuB = [
            [0, 1, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 1, 0, 0, 1],
            [0, 1, 0, 1, 0, 0],
            [0, 1, 1, 0, 0, 1],
        ];
        this.mDiao = [
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 0],
            [1, 0, 1, 1, 1, 0],
            [1, 0, 0, 1, 0, 0],
            [1, 0, 1, 1, 1, 0],
            [1, 0, 1, 1, 1, 0],
            [1, 0, 0, 1, 0, 0],
        ];
        this.mJiong = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 1, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        this.mSheng = [
            [1, 1, 1, 0, 1, 0],
            [1, 0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0],
            [1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1, 0],
            [1, 0, 1, 1, 1, 1],
        ];
        this.m2B = [
            [1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 0, 1],
            [0, 0, 1, 1, 0, 1],
            [0, 0, 1, 1, 1, 0],
            [0, 1, 0, 1, 1, 0],
            [1, 0, 0, 1, 0, 1],
            [1, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 0],
        ];
        this.mAPlus = [
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 0],
            [1, 0, 0, 0, 1, 0],
            [1, 0, 0, 0, 1, 0],
        ];
        this.mA = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 0],
            [1, 0, 0, 0, 1, 0],
            [1, 0, 0, 0, 1, 0],
        ];
        this.mB = [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
        ];
        this.mC = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ];
        this.mD = [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ];
        this.mDMinus = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0],
            [1, 0, 0, 1, 0, 0],
            [1, 0, 0, 1, 0, 0],
            [1, 0, 0, 1, 0, 0],
            [1, 0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0, 0],
        ];
        this.mX = [
            [0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 1, 1],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [1, 1, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 1]
        ];
        this.mBgs = [this.m2B, this.mA, this.mAPlus, this.mB, this.mC, this.mD, this.mDMinus, this.mX, this.mDiao, this.mNiu, this.mNiuB, this.mJiong, this.mSheng];
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        //this.loadingView = new LoadingUI();
        //this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        window["gameBoy"] = this;
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            //this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
            console.log("{\"action\":\"loadComplete\"}");
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    __egretProto__.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    __egretProto__.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
        }
    };
    __egretProto__.initProgress = function () {
        this.mTxtProgress.width = 150;
        this.mTxtProgress.height = 20;
        this.mTxtProgress.x = 500;
        this.mTxtProgress.y = 880;
        this.mTxtProgress.textColor = 0xffffff;
        this.mTxtProgress.size = 24;
        this.mTxtProgress.stroke = 2;
        this.mTxtProgress.strokeColor = 0xf06c60;
        this.mTxtProgress.text = "计时开始";
        this.mTxtProgress.fontFamily = "微软雅黑";
        this.mTxtProgress.bold = true;
        this.addChild(this.mTxtProgress);
        //this.resumeProgress();
    };
    __egretProto__.resumeProgress = function () {
        this.mProgress = this.mGameDifficulty == 1 ? this.DEFAULT_PROGRESS : this.DEFAULT_PROGRESS - 5 * this.mLevel;
        this.mProgress = this.mProgress < 30 ? 30 : this.mProgress;
    };
    __egretProto__.initLevel = function () {
        this.mTxtLevel.width = 150;
        this.mTxtLevel.height = 20;
        this.mTxtLevel.x = 500;
        this.mTxtLevel.y = 840;
        this.mTxtLevel.textColor = 0xffffff;
        this.mTxtLevel.size = 24;
        this.mTxtLevel.text = "level:1";
        this.mTxtLevel.fontFamily = "微软雅黑";
        this.mTxtLevel.stroke = 2;
        this.mTxtLevel.strokeColor = 0xf06c60;
        this.mTxtLevel.bold = true;
        this.addChild(this.mTxtLevel);
        this.resumeLevel();
    };
    __egretProto__.resumeLevel = function () {
        this.mItemCount = parseInt(this.getCookie("itemCount"));
        this.mItemCount = isNaN(this.mItemCount) ? this.mMaxItemCount - 3 : this.mItemCount;
        this.mLevel = parseInt(this.getCookie("level"));
        this.mLevel = isNaN(this.mLevel) ? 1 : this.mLevel;
        this.mTxtLevel.text = "level: " + this.mLevel;
        this.mGameDifficulty = parseInt(this.getCookie("difficulty"));
        this.mGameDifficulty = isNaN(this.mGameDifficulty) ? 1 : this.mGameDifficulty;
    };
    __egretProto__.initTimer = function () {
        //创建一个计时器对象
        if (!this.mTimer) {
            this.mTimer = new egret.Timer(1000, this.mProgress);
        }
        else {
            this.resetTimer();
            this.mTimer.repeatCount = this.mProgress;
        }
        this.mStartTime = this.mProgress;
        //注册事件侦听器
        this.mTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerStart, this);
        this.mTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerEnd, this);
        //开始计时
        this.startTimer();
    };
    __egretProto__.onTimerStart = function () {
        this.mTxtProgress.text = "time: " + --this.mProgress + "s";
    };
    __egretProto__.onTimerEnd = function () {
        this.doDie();
    };
    __egretProto__.startTimer = function () {
        this.mTimer.start();
    };
    __egretProto__.resetTimer = function () {
        this.mTimer.reset();
    };
    __egretProto__.stopTimer = function () {
        this.mTimer.stop();
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    __egretProto__.createGameScene = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        // var sky:egret.Bitmap = this.createBitmapByName("gameBg");
        // this.addChild(sky);
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description", this.onMapItemLoaded, this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
    };
    /**
     * 游戏开始入口
     * @param result
     */
    __egretProto__.onMapItemLoaded = function (result) {
        this.mMapItems = result;
        this.mMaxItemCount = this.mMapItems.length;
        this.initLevel();
        this.initProgress();
        this.startGame();
    };
    __egretProto__.startGame = function () {
        this.mStartGame = true;
        this.mGameOver = false;
        //this.cleanMap();
        this.resumeProgress();
        this.initTimer();
        this.resumeLevel();
        this.mPoints = [];
        this.createMap();
        this.disorder();
        this.drawMap();
        // this.drawGameOverBg();
    };
    __egretProto__.createMap = function () {
        var typeIndex = 0;
        this.clearMapArray(); //清空地图
        for (var i = 0; i < this.mMapRows; ++i) {
            this.mMapArray.push([]);
            for (var j = 0; j < this.mMapCols;) {
                // 周边一圈空白
                if (j === 0 || j === this.mMapCols - 1 || i === 0 || i === this.mMapRows - 1) {
                    var obj = { type: -1, item: {}, isVisited: false, parent: null, crossNum: 198964 };
                    this.mMapArray[i].push(obj);
                    ++j;
                }
                else {
                    var obj1 = { type: 0, item: {}, isVisited: false, parent: null, crossNum: 198964 };
                    obj1.type = typeIndex;
                    this.mMapArray[i].push(obj1);
                    ++j;
                    var obj2 = { type: 0, item: {}, isVisited: false, parent: null, crossNum: 198964 };
                    obj2.type = typeIndex;
                    this.mMapArray[i].push(obj2);
                    ++typeIndex;
                    ++j;
                    if (typeIndex >= this.mItemCount) {
                        typeIndex = 0;
                    }
                }
            }
        }
        this.mLeftPairs = (this.mMapRows - 2) * (this.mMapCols - 2) / 2;
    };
    __egretProto__.clearMapArray = function () {
        this.mMapArray = [];
    };
    __egretProto__.drawMap = function () {
        var x = 0, y = 0;
        var maxWidth = (this.mMapCols - 1) * this.mItemWidth;
        var maxHeight = (this.mMapRows - 1) * this.mItemHeight;
        for (var i = 0; i < this.mMapRows; ++i) {
            for (var j = 0; j < this.mMapCols; ++j) {
                var type = this.mMapArray[i][j].type;
                //console.log("item:" + this.mMapArray[i][j] + " type:" + type + " x:" + x + " y:" + y + " row:" + i + " col:" + j);
                if (type != -1) {
                    var item = new MapItem();
                    this.mMapArray[i][j].item = item;
                    this.addChild(item);
                    //console.log("type:" + type + " x:" + x + " y:" + y
                    //+ " text:" + this.mMapItems[type].text);
                    item.x = x;
                    item.y = y;
                    item.setType(type);
                    item.setContent(this.mMapItems[type]);
                }
                x = x < maxWidth ? x + this.mItemWidth : 0;
            }
            y = y < maxHeight ? y + this.mItemHeight : 0;
        }
    };
    __egretProto__.disorder = function () {
        for (var i = 1, height = this.mMapRows - 2; i <= height; ++i) {
            for (var j = 1, width = this.mMapCols - 2; j <= width; ++j) {
                var y1 = Math.floor(Math.random() * 100 % height + 1), x1 = Math.floor(Math.random() * 100 % width + 1), y2 = Math.floor(Math.random() * 100 % height + 1), x2 = Math.floor(Math.random() * 100 % width + 1), tmp = this.mMapArray[y1][x1];
                this.mMapArray[y1][x1] = this.mMapArray[y2][x2];
                this.mMapArray[y2][x2] = tmp;
            }
        }
    };
    __egretProto__.onTouchDown = function (event) {
        if (this.mGameOver || !this.mStartGame) {
            return;
        }
        var xy = this.getItemXY(event.localX, event.localY);
        //console.log("onTouchDown, xy:" + xy);
        var curObj = this.mMapArray[xy.y][xy.x] || {};
        var curType = curObj.type;
        if (curType === 2) {
            //console.log("diaosi");
            var now = +new Date();
            var diff = now - this.mLastTouchTs;
            if (diff < 500) {
                this.mTouchTimes++;
                if (this.mTouchTimes === 14) {
                    this.resetEgg();
                    this.playEgg();
                }
            }
            else {
                this.resetEgg();
            }
            this.mLastTouchTs = now;
        }
        else {
            this.resetEgg();
        }
    };
    __egretProto__.onTouchUp = function (event) {
        if (this.mGameOver || !this.mStartGame) {
            //console.log("onTouchUp, game over, or not start yet");
            return;
        }
        var xy = this.getItemXY(event.localX, event.localY);
        var curObj = this.mMapArray[xy.y][xy.x] || {};
        var curItem = curObj.item;
        var curType = curObj.type;
        // 空白区域
        if (curType < 0) {
            if (this.mLastItemObj) {
                this.mLastItemObj.item.setSelect(false);
                this.mLastX = 0;
                this.mLastY = 0;
                this.mLastItemObj = null;
            }
            return;
        }
        // 选中当前item
        curItem.setSelect(true);
        // 第一次点击
        if (this.mLastItemObj == null) {
            this.mLastX = xy.x;
            this.mLastY = xy.y;
            this.mLastItemObj = curObj;
            return;
        }
        // 两次点击了同一图片
        if (xy.x === this.mLastX && xy.y === this.mLastY) {
            return;
        }
        // type相同，检查是否能消除
        if (this.mLastItemObj.type != curType) {
            this.mLastItemObj.item.setSelect(false);
            curItem.setSelect(false);
            this.mLastItemObj = null;
            this.mLastX = 0;
            this.mLastY = 0;
            return;
        }
        if (this.canClean(xy.x, xy.y, this.mLastX, this.mLastY)) {
            this.addPoint(this.mPoints, [this.mLastX, this.mLastY]);
            var parent = this.mMapArray[this.mLastY][this.mLastX]['parent'];
            while (this.mMapArray[parent[1]][parent[0]]['parent']) {
                this.addPoint(this.mPoints, parent);
                parent = this.mMapArray[parent[1]][parent[0]]['parent'];
            }
            this.addPoint(this.mPoints, [xy.x, xy.y]);
            this.drawLine();
            var thiz = this;
            var idTimeout = egret.setTimeout(function (arg) {
                curItem.setSelect(false);
                thiz.cleanItem(thiz.mLastItemObj);
                thiz.cleanItem(curObj);
                thiz.mLastItemObj = null;
                thiz.mLastX = 0;
                thiz.mLastY = 0;
                thiz.cleanLine();
                if (--thiz.mLeftPairs === 0) {
                    thiz.doSuccess();
                }
            }, this, 100);
        }
        else {
            this.mLastItemObj.item.setSelect(false);
            curItem.setSelect(false);
            this.mLastX = 0;
            this.mLastY = 0;
            this.mLastItemObj = null;
        }
    };
    __egretProto__.cleanMap = function () {
        if (!this.mMapArray || this.mMapArray.length <= 0) {
            return;
        }
        for (var i = 0, rows = this.mMapArray.length; i < rows; ++i) {
            for (var j = 0, cols = this.mMapArray[0].length; j < cols; ++j) {
                var itemObj = this.mMapArray[i][j];
                if (itemObj) {
                    var type = itemObj.type;
                    if (type != -1) {
                        //console.log(itemObj);
                        this.cleanItem(itemObj);
                    }
                }
            }
        }
    };
    __egretProto__.cleanItem = function (itemObj) {
        if (!itemObj) {
            return;
        }
        itemObj.type = -1;
        try {
            if (itemObj.item) {
                this.removeChild(itemObj.item);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    __egretProto__.onTouchMove = function (event) {
    };
    __egretProto__.getItemXY = function (posX, posY) {
        var x = Math.floor(posX / this.mItemWidth);
        var y = Math.floor(posY / this.mItemHeight);
        return { x: x, y: y };
    };
    __egretProto__.getItemCenter = function (x, y) {
        return { x: x * this.mItemWidth + this.mItemWidth / 2, y: y * this.mItemHeight + this.mItemHeight / 2 };
    };
    __egretProto__.addPoint = function (points, point) {
        if (!this.hasPoint(point, points)) {
            points.push(point);
        }
    };
    __egretProto__.hasPoint = function (point, points) {
        if (!point) {
            return false;
        }
        points = points || [];
        for (var i = 0, length = points.length; i < length; i++) {
            if (points[i][0] === point[0] && points[i][1] === point[1]) {
                return true;
            }
        }
        return false;
    };
    /**
     * 将数组A中数据copy置数组B中
     **/
    __egretProto__.concatArray = function (arrayA, arrayB) {
        for (var i = 0, length = arrayA.length; i < length; i++) {
            arrayB.push(arrayA[i]);
        }
    };
    __egretProto__.drawLine = function () {
        var points = this.mPoints, len = points.length;
        if (len === 0) {
            return;
        }
        var pointCenter = [];
        pointCenter[0] = this.getItemCenter(points[0][0], points[0][1]);
        this.mLine = new egret.Shape();
        this.mLine.graphics.lineStyle(4, 0x4169E1);
        this.mLine.graphics.moveTo(pointCenter[0]['x'], pointCenter[0]['y']);
        for (var i = 1; i < len; i++) {
            pointCenter[i] = this.getItemCenter(points[i][0], points[i][1]);
            this.mLine.graphics.lineTo(pointCenter[i]['x'], pointCenter[i]['y']);
        }
        this.mLine.graphics.endFill();
        this.addChild(this.mLine);
    };
    __egretProto__.cleanLine = function () {
        if (this.mLine) {
            this.removeChild(this.mLine);
        }
        this.mPoints = [];
    };
    __egretProto__.canClean = function (x1, y1, x2, y2) {
        // 同一点，返回
        if (x1 === x2 && y1 === y2) {
            return false;
        }
        var typeA = this.mMapArray[y1][x1].type, typeB = this.mMapArray[y2][x2].type;
        // 已消除，返回
        if (typeA < 0 || typeB < 0) {
            return false;
        }
        // 类型不同，返回
        if (typeA != typeB) {
            return false;
        }
        this.resetMapArray();
        var queue = [];
        queue.push([x1, y1]);
        this.mMapArray[y1][x1]['isVisited'] = true;
        this.mMapArray[y1][x1]['crossNum'] = -1;
        while (queue.length > 0) {
            var curPoint = queue.shift();
            var orgX = curPoint[0], orgY = curPoint[1];
            var x, y, curType;
            //向上
            x = orgX;
            y = orgY - 1;
            for (; y >= 0; y--) {
                if (!this.mMapArray[y][x]['isVisited']) {
                    this.mMapArray[y][x]['parent'] = [orgX, orgY];
                    this.mMapArray[y][x]['isVisited'] = true;
                    this.mMapArray[y][x]['crossNum'] = this.mMapArray[orgY][orgX]['crossNum'] + 1;
                    curType = this.mMapArray[y][x]['type'];
                    //空白，可继续查找
                    if (curType < 0) {
                        if (this.mMapArray[y][x]['crossNum'] < 2) {
                            queue.push([x, y]);
                        }
                    }
                    else if (curType === typeA && x == x2 && y == y2) {
                        return true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            //向下
            x = orgX;
            y = orgY + 1;
            for (; y < this.mMapRows; y++) {
                if (!this.mMapArray[y][x]['isVisited']) {
                    this.mMapArray[y][x]['parent'] = [orgX, orgY];
                    this.mMapArray[y][x]['isVisited'] = true;
                    this.mMapArray[y][x]['crossNum'] = this.mMapArray[orgY][orgX]['crossNum'] + 1;
                    curType = this.mMapArray[y][x]['type'];
                    //空白，可继续查找
                    if (curType < 0) {
                        if (this.mMapArray[y][x]['crossNum'] < 2) {
                            queue.push([x, y]);
                        }
                    }
                    else if (curType === typeA && x == x2 && y == y2) {
                        return true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            //向左
            x = orgX - 1;
            y = orgY;
            for (; x >= 0; x--) {
                if (!this.mMapArray[y][x]['isVisited']) {
                    this.mMapArray[y][x]['parent'] = [orgX, orgY];
                    this.mMapArray[y][x]['isVisited'] = true;
                    this.mMapArray[y][x]['crossNum'] = this.mMapArray[orgY][orgX]['crossNum'] + 1;
                    curType = this.mMapArray[y][x]['type'];
                    //空白，可继续查找
                    if (curType < 0) {
                        if (this.mMapArray[y][x]['crossNum'] < 2) {
                            queue.push([x, y]);
                        }
                    }
                    else if (curType === typeA && x == x2 && y == y2) {
                        return true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            //向右
            x = orgX + 1;
            y = orgY;
            for (; x < this.mMapCols; x++) {
                if (!this.mMapArray[y][x]['isVisited']) {
                    this.mMapArray[y][x]['parent'] = [orgX, orgY];
                    this.mMapArray[y][x]['isVisited'] = true;
                    this.mMapArray[y][x]['crossNum'] = this.mMapArray[orgY][orgX]['crossNum'] + 1;
                    curType = this.mMapArray[y][x]['type'];
                    //空白，可继续查找
                    if (curType < 0) {
                        if (this.mMapArray[y][x]['crossNum'] < 2) {
                            queue.push([x, y]);
                        }
                    }
                    else if (curType === typeA && x == x2 && y == y2) {
                        return true;
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        return false;
    };
    __egretProto__.resetMapArray = function () {
        for (var i = 0; i < this.mMapRows; i++) {
            for (var j = 0; j < this.mMapCols; j++) {
                this.mMapArray[i][j]['isVisited'] = false;
                this.mMapArray[i][j]['crossNum'] = 198964;
                this.mMapArray[i][j]['parent'] = null;
            }
        }
    };
    /**
     * 俗称作死
     */
    __egretProto__.doDie = function () {
        this.mStartGame = false;
        this.mGameOver = true;
        this.cleanMap();
        this.drawGameOverBg();
        this.showRePlayBtn();
        console.log("{\"action\":\"gameover\",\"score\":\"" + -1 + "\",\"score2\":\"" + this.mLevel + "\",\"gameId\":\"llk\"}");
        var thiz = this;
        var idTimeout = egret.setTimeout(function (arg) {
            alert("矮油，少年，貌似你挂了\n还剩" + this.mLeftPairs + "对未消除");
            //thiz.cleanMap();
            //thiz.startGame();
        }, this, 100);
    };
    __egretProto__.doSuccess = function () {
        this.mStartGame = false;
        this.mGameOver = true;
        this.stopTimer();
        this.cleanMap();
        this.drawGameOverBg();
        this.showRePlayBtn();
        console.log("{\"action\":\"gameover\",\"score\":\"" + (this.mStartTime - this.mProgress) + "\",\"score2\":\"" + this.mLevel + "\",\"gameId\":\"llk\"}");
        var thiz = this;
        var idTimeout = egret.setTimeout(function (arg) {
            //alert("哟，不错哦! cost:" + (thiz.mStartTime - thiz.mProgress) + "s");
            //thiz.cleanMap();
            //thiz.startGame();
        }, this, 100);
        this.mLevel++;
        this.setCookie("level", this.mLevel);
        if (this.mItemCount < this.mMaxItemCount) {
            this.mItemCount++;
            this.setCookie("itemCount", this.mItemCount);
        }
        else if (this.mGameDifficulty != 2) {
            this.mGameDifficulty = 2;
            this.setCookie("difficulty", this.mGameDifficulty);
            alert("进入朝鲜模式");
        }
    };
    __egretProto__.showRePlayBtn = function () {
        if (!this.mRePlayBtn) {
            this.mRePlayBtn = new egret.TextField();
            this.mRePlayBtn.touchEnabled = true;
            this.mRePlayBtn.x = 300;
            this.mRePlayBtn.y = 860;
            this.mRePlayBtn.width = 180;
            this.mRePlayBtn.height = 40;
            this.mRePlayBtn.text = "再来一局";
            this.mRePlayBtn.bold = true;
            this.mRePlayBtn.textColor = 0xffffff;
            this.mRePlayBtn.stroke = 2;
            this.mRePlayBtn.strokeColor = 0xf06c60;
            this.mRePlayBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onRePlayBtnClick, this);
            this.addChild(this.mRePlayBtn);
        }
        this.mRePlayBtn.visible = true;
    };
    __egretProto__.onRePlayBtnClick = function () {
        this.reStart();
    };
    __egretProto__.hideRePlayBtn = function () {
        if (this.mRePlayBtn) {
            this.mRePlayBtn.visible = false;
        }
    };
    __egretProto__.setCookie = function (key, value) {
        var date = new Date();
        date.setTime(date.getTime() + 1 * 1000 * 3600 * 24 * 365);
        document.cookie = key + "=" + encodeURI(value) + ";expires=" + date.toUTCString() + ";path=/";
    };
    __egretProto__.getCookie = function (key) {
        var cookie = document.cookie, regExp = new RegExp("[sS]*" + key + "=([^;]*)(;|$)"), ret = cookie.match(regExp);
        if (ret != null) {
            return ret[1];
        }
        return null;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    __egretProto__.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    __egretProto__.resetEgg = function () {
        this.mTouchTimes = 0;
    };
    __egretProto__.playEgg = function () {
        this.startGodMode();
    };
    __egretProto__.startGodMode = function () {
        this.doSuccess();
    };
    __egretProto__.drawGameOverBg = function () {
        this.mMapArray = this.mBgs[(Math.round(Math.random() * 10)) % this.mBgs.length];
        this.fillGameOverBg();
        this.performDrawBg();
    };
    __egretProto__.fillGameOverBg = function () {
        var typeText = Math.round(Math.random() * 10) % this.mMaxItemCount;
        var typeBg = Math.round(Math.random() * 10 * typeText) % this.mMaxItemCount;
        for (var i = 0; i < this.mMapRows - 2; ++i) {
            for (var j = 0; j < this.mMapCols - 2; ++j) {
                var type = this.mMapArray[i][j];
                if (type === 0) {
                    this.mMapArray[i][j] = { type: typeBg, item: new MapItem() };
                }
                else if (type === 1) {
                    this.mMapArray[i][j] = { type: typeText, item: new MapItem() };
                }
            }
        }
    };
    __egretProto__.performDrawBg = function () {
        var x = this.mItemWidth, y = this.mItemHeight;
        var maxWidth = (this.mMapCols - 2) * this.mItemWidth;
        var maxHeight = (this.mMapRows - 2) * this.mItemHeight;
        for (var i = 0; i < this.mMapRows - 2; ++i) {
            for (var j = 0; j < this.mMapCols - 2; ++j) {
                var itemObj = this.mMapArray[i][j];
                var type = itemObj.type;
                if (type != -1) {
                    var item = itemObj.item;
                    this.addChild(item);
                    item.x = x;
                    item.y = y;
                    item.setType(type);
                    item.setContent(this.mMapItems[type]);
                }
                x = x < maxWidth ? x + this.mItemWidth : this.mItemWidth;
            }
            y = y < maxHeight ? y + this.mItemHeight : this.mItemHeight;
        }
    };
    __egretProto__.reStart = function () {
        this.mLastItemObj = null;
        this.mLastX = 0;
        this.mLastY = 0;
        this.hideRePlayBtn();
        this.cleanMap();
        this.startGame();
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
