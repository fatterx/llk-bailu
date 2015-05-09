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

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    private mMapRows = 10;
    private mMapCols = 8;
    private mItemCount = 6;

    private mItemWidth = 60;
    private mItemHeight = 60;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        //this.loadingView = new LoadingUI();
        //this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            //this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
            console.log("{\"action\":\"loadComplete\"}");
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            //TODO
        }
    }

    private mGameDifficulty = 1;


    private mTxtProgress:egret.TextField = new egret.TextField();
    private DEFAULT_PROGRESS:number = 120;
    private mProgress:number;

    private initProgress() {
        this.mTxtProgress.width = 150;
        this.mTxtProgress.height = 20;
        this.mTxtProgress.x = 360;
        this.mTxtProgress.y = 600;
        this.mTxtProgress.textColor = 0xffffff;
        this.mTxtProgress.size = 18;
        this.mTxtProgress.text = "计时开始";
        this.mTxtProgress.fontFamily = "微软雅黑";
        this.mTxtProgress.bold = true;
        this.addChild(this.mTxtProgress);
        this.resumeProgress();
    }

    private resumeProgress() {
        this.mProgress = this.mGameDifficulty == 1 ? this.DEFAULT_PROGRESS : this.DEFAULT_PROGRESS - 5 * this.mLevel;
        this.mProgress = this.mProgress < 30 ? 30 : this.mProgress;
    }

    private mLevel = 1;
    private mTxtLevel:egret.TextField = new egret.TextField();

    private initLevel() {
        this.mTxtLevel.width = 150;
        this.mTxtLevel.height = 20;
        this.mTxtLevel.x = 360;
        this.mTxtLevel.y = 580;
        this.mTxtLevel.textColor = 0xffffff;
        this.mTxtLevel.size = 18;
        this.mTxtLevel.text = "level:1";
        this.mTxtLevel.fontFamily = "微软雅黑";
        this.mTxtLevel.bold = true;
        this.addChild(this.mTxtLevel);
        this.resumeLevel();
    }

    private resumeLevel() {
        this.mItemCount = parseInt(this.getCookie("itemCount"));
        this.mItemCount = isNaN(this.mItemCount) ? this.mMaxItemCount - 3 : this.mItemCount;

        this.mLevel = parseInt(this.getCookie("level"));
        this.mTxtLevel.text = "level:" + (isNaN(this.mLevel) ? 1 : this.mLevel);

        this.mGameDifficulty = parseInt(this.getCookie("difficulty"));
        this.mGameDifficulty = isNaN(this.mGameDifficulty) ? 1 : this.mGameDifficulty;
    }

    private mStartTime:number;
    private mTimer:egret.Timer;

    private initTimer() {
        //创建一个计时器对象
        if (!this.mTimer) {
            this.mTimer = new egret.Timer(1000, this.mProgress);
        } else {
            this.resetTimer();
            this.mTimer.repeatCount = this.mProgress;
        }

        this.mStartTime = this.mProgress;
        //注册事件侦听器
        this.mTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerStart, this);
        this.mTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerEnd, this);
        //开始计时
        this.startTimer();
    }


    private onTimerStart() {
        this.mTxtProgress.text = "time:" + --this.mProgress + "s";
    }

    private onTimerEnd() {
        this.doDie();
    }

    private startTimer() {
        this.mTimer.start();
    }

    private resetTimer() {
        this.mTimer.reset();
    }

    private stopTimer() {
        this.mTimer.stop();
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;

       // var sky:egret.Bitmap = this.createBitmapByName("gameBg");
       // this.addChild(sky);

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description", this.onMapItemLoaded, this);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
    }

    private mStartGame:boolean;
    private mGameOver:boolean;

    private mMapItems:Array<any>;
    private mMaxItemCount;

    /**
     * 游戏开始入口
     * @param result
     */
    private onMapItemLoaded(result:Array<any>):void {
        this.mMapItems = result;
        this.mMaxItemCount = this.mMapItems.length;
        this.initLevel();
        this.initProgress();
        this.startGame();
    }

    private startGame():void {
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
    }

    private mMapArray:Array<any>;

    private createMap():void {
        var typeIndex = 0;
        this.clearMapArray(); //清空地图
        for (var i = 0; i < this.mMapRows; ++i) {
            this.mMapArray.push([]);
            for (var j = 0; j < this.mMapCols;) {
                // 周边一圈空白
                if (j === 0 || j === this.mMapCols - 1 || i === 0 || i === this.mMapRows - 1) {
                    var obj = {type: -1, item: {}, isVisited: false, parent: null, crossNum: 198964};
                    this.mMapArray[i].push(obj);
                    ++j;
                    //地图正文
                } else {
                    var obj1 = {type: 0, item: {}, isVisited: false, parent: null, crossNum: 198964};
                    obj1.type = typeIndex;

                    this.mMapArray[i].push(obj1);
                    ++j;

                    var obj2 = {type: 0, item: {}, isVisited: false, parent: null, crossNum: 198964};
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
    }

    private clearMapArray():void {
        this.mMapArray = [];
    }

    private drawMap():void {
        console.log("drawMap")
        var x = 0, y = 0;
        var maxWidth = (this.mMapCols - 1) * this.mItemWidth;
        var maxHeight = (this.mMapRows - 1) * this.mItemHeight;

        //console.log("maxWidth:" + maxWidth + "maxHeight:" + maxHeight);
        //	console.log(this.mMapArray);
        for (var i = 0; i < this.mMapRows; ++i) {
            for (var j = 0; j < this.mMapCols; ++j) {
                var type = this.mMapArray[i][j].type;
                //console.log("item:" + this.mMapArray[i][j] + " type:" + type + " x:" + x + " y:" + y + " row:" + i + " col:" + j);
                if (type != -1) {
                    var item:MapItem = new MapItem();
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
    }

    private disorder():void {
        for (var i = 1, height = this.mMapRows - 2; i <= height; ++i) {
            for (var j = 1, width = this.mMapCols - 2; j <= width; ++j) {
                var y1 = Math.floor(Math.random() * 100 % height + 1),
                    x1 = Math.floor(Math.random() * 100 % width + 1),
                    y2 = Math.floor(Math.random() * 100 % height + 1),
                    x2 = Math.floor(Math.random() * 100 % width + 1),
                    tmp = this.mMapArray[y1][x1];

                this.mMapArray[y1][x1] = this.mMapArray[y2][x2];
                this.mMapArray[y2][x2] = tmp;
            }
        }
    }


    private onTouchDown(event:egret.TouchEvent):void {
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
            } else {
                this.resetEgg();
            }

            this.mLastTouchTs = now;
        } else {
            this.resetEgg();
        }
    }

    private mLeftPairs:number;

    private mLastX:number;
    private mLastY:number;
    private mLastItemObj;

    private onTouchUp(event:egret.TouchEvent):void {
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
            var idTimeout:number = egret.setTimeout(function (arg) {
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

        } else {
            this.mLastItemObj.item.setSelect(false);
            curItem.setSelect(false);
            this.mLastX = 0;
            this.mLastY = 0;
            this.mLastItemObj = null;
        }
    }

    private cleanMap(){
        if(!this.mMapArray || this.mMapArray.length <= 0){
            return;
        }

        for (var i = 0, rows = this.mMapArray.length; i < rows; ++i) {
            for (var j = 0, cols = this.mMapArray[0].length; j < cols; ++j) {
                var itemObj = this.mMapArray[i][j];
                if(itemObj){
                    var type = itemObj.type;
                    if (type != -1) {
                        //console.log(itemObj);
                        this.cleanItem(itemObj);
                    }
                }
            }
        }
    }

    private cleanItem(itemObj) {
        if(!itemObj){
            return;
        }

        itemObj.type = -1;
        try {
            if(itemObj.item){
                this.removeChild(itemObj.item);
            }
        } catch (e){
            console.error(e);
        }
    }

    private onTouchMove(event:egret.TouchEvent):void {
    }


    private getItemXY(posX:number, posY:number):any {
        var x = Math.floor(posX / this.mItemWidth);
        var y = Math.floor(posY / this.mItemHeight);

        return {x: x, y: y};
    }

    private getItemCenter(x, y):any {
        return {x: x * this.mItemWidth + this.mItemWidth / 2, y: y * this.mItemHeight + this.mItemHeight / 2};
    }

    private mPoints = [];

    private addPoint(points, point):void {
        if (!this.hasPoint(point, points)) {
            points.push(point);
        }
    }

    private hasPoint(point, points):boolean {
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
    }

    /**
     * 将数组A中数据copy置数组B中
     **/
    private concatArray(arrayA, arrayB):void {
        for (var i = 0, length = arrayA.length; i < length; i++) {
            arrayB.push(arrayA[i]);
        }
    }

    private mLine:egret.Shape;

    private drawLine() {
        var points = this.mPoints,
            len = points.length;

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
    }

    private cleanLine() {
        if (this.mLine) {
            this.removeChild(this.mLine);
        }

        this.mPoints = [];
    }

    private canClean(x1, y1, x2, y2):boolean {
        // 同一点，返回
        if (x1 === x2 && y1 === y2) {
            return false;
        }

        var typeA = this.mMapArray[y1][x1].type,
            typeB = this.mMapArray[y2][x2].type;

        // 已消除，返回
        if (typeA < 0 || typeB < 0) {	//不处理已消除的图片
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

            var orgX = curPoint[0],
                orgY = curPoint[1];

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
                    } else if (curType === typeA && x == x2 && y == y2) {
                        return true;
                    } else {
                        break;
                    }
                } else {
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
                    } else if (curType === typeA && x == x2 && y == y2) {
                        return true;
                    } else {
                        break;
                    }
                } else {
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
                    } else if (curType === typeA && x == x2 && y == y2) {
                        return true;
                    } else {
                        break;
                    }
                } else {
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
                    } else if (curType === typeA && x == x2 && y == y2) {
                        return true;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }

        return false;
    }

    private resetMapArray():void {
        for (var i = 0; i < this.mMapRows; i++) {
            for (var j = 0; j < this.mMapCols; j++) {
                this.mMapArray[i][j]['isVisited'] = false;
                this.mMapArray[i][j]['crossNum'] = 198964;
                this.mMapArray[i][j]['parent'] = null;
            }
        }
    }

    /**
     * 俗称作死
     */
    private doDie():void {
        this.mStartGame = false;
        this.mGameOver = true;
        this.drawGameOverBg();
        console.log("{\"action\":\"gameover\",\"score\":\"" + (this.mStartTime - this.mProgress) + "\",\"score2\":\"" + this.mLevel + "\",\"gameId\":\"llk\"}");

        var thiz = this;
        var idTimeout:number = egret.setTimeout(function (arg) {
            alert("矮油，少年，貌似你挂了\n还剩" + this.mLeftPairs + "对未消除");
            thiz.cleanMap();
            thiz.startGame();
        }, this, 100);
    }

    private doSuccess():void {
        this.mStartGame = false;
        this.mGameOver = true;
        this.stopTimer();
        this.mLevel++;

        this.setCookie("level", this.mLevel);

        this.cleanMap();
        this.drawGameOverBg();
        console.log("{\"action\":\"gameover\",\"score\":\"" + (this.mStartTime - this.mProgress) + "\",\"score2\":\"" + this.mLevel + "\",\"gameId\":\"llk\"}");

        var thiz = this;
        var idTimeout:number = egret.setTimeout(function (arg) {
            alert("哟，不错哦! cost:" + (thiz.mStartTime - thiz.mProgress) + "s");
            thiz.cleanMap();
            thiz.startGame();
        }, this, 100);


        if (this.mItemCount < this.mMaxItemCount) {
            this.mItemCount++;
            this.setCookie("itemCount", this.mItemCount);
        } else if (this.mGameDifficulty != 2) {
            this.mGameDifficulty = 2;
            this.setCookie("difficulty", this.mGameDifficulty);
            alert("进入朝鲜模式");
        }
    }

    private setCookie(key, value):void {

        var date = new Date();

        date.setTime(date.getTime() + 1 * 1000 * 3600 * 24 * 365);

        document.cookie = key + "=" + encodeURI(value) + ";expires=" + date.toUTCString() + ";path=/";
    }

    private getCookie(key):string {
        var cookie = document.cookie,
            regExp = new RegExp("[sS]*" + key + "=([^;]*)(;|$)"),
            ret = cookie.match(regExp);

        if (ret != null) {
            return ret[1];
        }
        return null;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private mLastTouchTs:number;
    private mTouchTimes:number;

    private resetEgg() {
        this.mTouchTimes = 0;
    }

    private playEgg() {
        this.startGodMode();
    }

    private startGodMode() {
        this.doSuccess();
    }

    private drawGameOverBg() {
        this.mMapArray = this.mBgs[(Math.round(Math.random() * 10)) % this.mBgs.length];
        this.fillGameOverBg();
        this.performDrawBg();
    }

    private fillGameOverBg() {
        var typeText = Math.round(Math.random() * 10) % this.mMaxItemCount;
        var typeBg = Math.round(Math.random() * 10 * typeText) % this.mMaxItemCount;
        for (var i = 0; i < this.mMapRows - 2; ++i) {
            for (var j = 0; j < this.mMapCols - 2; ++j) {
                var type = this.mMapArray[i][j];
                if (type === 0) {
                    this.mMapArray[i][j] = {type:typeBg, item:new MapItem()};
                } else if (type === 1) {
                    this.mMapArray[i][j] = {type:typeText, item:new MapItem()};
                }
            }
        }
    }

    private performDrawBg() {
        var x = 60, y = 60;
        var maxWidth = (this.mMapCols - 2) * this.mItemWidth;
        var maxHeight = (this.mMapRows - 2) * this.mItemHeight;

        for (var i = 0; i < this.mMapRows - 2; ++i) {
            for (var j = 0; j < this.mMapCols - 2; ++j) {
                var itemObj = this.mMapArray[i][j];
                var type = itemObj.type;
                if (type != -1) {
                    var item:MapItem = itemObj.item;
                    this.addChild(item);
                    item.x = x;
                    item.y = y;
                    item.setType(type);
                    item.setContent(this.mMapItems[type]);
                }
                x = x < maxWidth ? x + this.mItemWidth : 60;
            }

            y = y < maxHeight ? y + this.mItemHeight : 60;
        }
    }

    private mNiu = [
        [0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0],
    ];

    private mNiuB = [
        [0, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 1],
        [0, 1, 1, 0, 0, 1],
        [0, 1, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 1],
    ];

    private mDiao = [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 0],
        [1, 0, 1, 1, 1, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 1, 1, 1, 0],
        [1, 0, 1, 1, 1, 0],
        [1, 0, 0, 1, 0, 0],
    ];

    private mJiong = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1],
        [1, 1, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];

    private mSheng = [
        [1, 1, 1, 0, 1, 0],
        [1, 0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 1, 1, 1, 1],
    ];

    private m2B = [
        [1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 0, 1],
        [0, 0, 1, 1, 0, 1],
        [0, 0, 1, 1, 1, 0],
        [0, 1, 0, 1, 1, 0],
        [1, 0, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0],
    ];

    private mAPlus = [
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
    ];

    private mA = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
    ];

    private mB = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 0],
    ];

    private mC = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    private mD = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    private mDMinus = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0],
    ];

    private mX = [
        [0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [1, 1, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 1]
    ];

    private mBgs:Array<any> = [this.m2B, this.mA, this.mAPlus, this.mB, this.mC, this.mD, this.mDMinus, this.mX, this.mDiao, this.mNiu, this.mNiuB, this.mJiong, this.mSheng];
}


