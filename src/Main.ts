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
    private loadingView: LoadingUI;
	
	private mMapRows = 10;
	private mMapCols = 8;
	private mItemCount = 6;
	
	private mItemWidth = 60;
	private mItemHeight = 60;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
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
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }
    /**
    * 资源组加载出错
     *  The resource group loading failed
    */
    private onResourceLoadError(event: RES.ResourceEvent): void {
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
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }


    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
	    var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;

		var sky: egret.Bitmap = this.createBitmapByName("gameBg");
        this.addChild(sky);

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
       RES.getResAsync("description", this.onMapItemLoaded, this);
	   
	   this.touchEnabled = true;
	   this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
	   this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
    }
	
	private mMapItems: Array<any>;
	
	private onMapItemLoaded(result: Array<any>): void{
		this.mMapItems = result;
		this.mItemCount = this.mMapItems.length;
		this.createMap();
		this.disorder();
		this.drawMap();
	}
	
	private mMapArray: Array<any>;
	private createMap(): void{
		var k = 0;
		this.clearMap(); //清空地图
		for(var i=0; i<this.mMapRows; ++i){
			this.mMapArray.push([]);
			for(var j=0; j<this.mMapCols;){
				if(j === 0 || j === this.mMapCols-1 || i === 0 || i === this.mMapRows-1){
					var obj = {type:-1, item:{}};
					this.mMapArray[i].push(obj);
					++j;
				} else {
					var obj1 = {type:0, item:{}};
					obj1.type = k;
					
					this.mMapArray[i].push(obj1);
					++j;
					
					var obj2 = {type:0, item:{}};
					obj2.type = k;
					this.mMapArray[i].push(obj2);
					++k;
					++j;
					if(k >= this.mItemCount){
						k=0;
					}
				}
			}
		}
	}
	
	private clearMap(): void{
		this.mMapArray = [];
	}
	
	private drawMap(): void{
		var x = 0, y = 0;
		var maxWidth = (this.mMapCols - 1) * this.mItemWidth;
		var maxHeight = (this.mMapRows - 1) * this.mItemHeight;
		
		//console.log("maxWidth:" + maxWidth + "maxHeight:" + maxHeight);
		//	console.log(this.mMapArray);
		for(var i=0; i<this.mMapRows; ++i){
			for(var j=0; j<this.mMapCols; ++j){
				var type = this.mMapArray[i][j].type;
				//console.log("item:" + this.mMapArray[i][j] + " type:" + type + " x:" + x + " y:" + y + " row:" + i + " col:" + j);
				if(type != -1){
					var item :MapItem = new MapItem();
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
	
	private disorder() : void {
		for(var i=1,height = this.mMapRows-2; i<=height; ++i){
			for(var j=1,width = this.mMapCols-2; j<=width; ++j){
				var y1 = Math.floor(Math.random() * 100 % height + 1),
					x1 = Math.floor(Math.random() * 100 % width + 1),
					y2 = Math.floor(Math.random() * 100 % height + 1),
					x2 = Math.floor(Math.random() * 100 % width + 1),
					tmp=this.mMapArray[y1][x1];

				this.mMapArray[y1][x1] = this.mMapArray[y2][x2];
				this.mMapArray[y2][x2] = tmp;
			}
		}
	}
	
	
	private onTouchDown(event:egret.TouchEvent) : void{
		
	}
	
	private mLastX : number;
	private mLastY : number;
	private mLastItemObj;
	
	private onTouchUp(event:egret.TouchEvent) : void {
		var xy = this.getItemXY(event.localX, event.localY);
		
		var curObj = this.mMapArray[xy.y][xy.x] || {};
		var curItem = curObj.item;
		var curType = curObj.type;
		
		// 空白区域
		if(curType < 0){
			if(this.mLastItemObj){
				this.mLastItemObj.setSelect(false);
				this.mLastX = 0;
				this.mLastY = 0;
			}
			return;
		}
		
		// 选中当前item
		curItem.setSelect(true);
		
		// 第一次点击
		if(this.mLastItemObj == null){
			this.mLastX = xy.x;
			this.mLastY = xy.y;
			this.mLastItemObj = curObj;
			return;
		}
		
		// 两次点击了同一图片
		if(xy.x === this.mLastX && xy.y === this.mLastY){
			return;
		}
		
		// type相同，检查是否能消除
		if(this.mLastItemObj.type != curType){
			this.mLastItemObj.item.setSelect(false);
			curItem.setSelect(false);
			this.mLastItemObj = null;
			this.mLastX = 0;
			this.mLastY = 0;
			return;
		} 
		
		if(this.canClean(xy.x, xy.y, this.mLastX, this.mLastY)){

			this.drawLine();
			
			var _this = this;
			var idTimeout:number = egret.setTimeout( function( arg ){
					_this.cleanItem(_this.mLastItemObj);
					_this.cleanItem(curObj);
					_this.mLastItemObj = null;
					_this.cleanLine();
					
				}, this, 100);

		}
		
		// 不管能不能消除都重置状态
		this.mLastItemObj.item.setSelect(false);
		curItem.setSelect(false);
		this.mLastX = 0;
		this.mLastY = 0;
		
	}
	
	private cleanItem(itemObj){
		itemObj.type = -1;
		this.removeChild(itemObj.item);
	}

	private onTouchMove(event:egret.TouchEvent) : void {
	
	}
	
	private getItemXY(posX: number, posY : number) : any {
		var x = Math.floor(posX / this.mItemWidth);
		var y = Math.floor(posY / this.mItemHeight);
	
		return {x: x, y: y};
	}
	
	private getItemCenter(x, y) : any{
		return {x: x * this.mItemWidth + this.mItemWidth / 2, y: y * this.mItemHeight + this.mItemHeight / 2};
	}
	
	private mPoints = [];
	
	private addPoint(point) : void {
		this.mPoints.push(point);
	}
	
	private cleanPoint() : void {
		this.mPoints = [];
	}
	
	private mLine :egret.Shape; 
	private drawLine(){
		var points = this.mPoints,
			len = points.length;
		
		if(len === 0){
			return;
		}
		
		var pointCenter = [];
		
		pointCenter[0] = this.getItemCenter(points[0][0],points[0][1]);
		
		this.mLine = new egret.Shape();
		this.mLine.graphics.lineStyle( 4, 0x4169E1 );
		this.mLine.graphics.moveTo(pointCenter[0]['x'],pointCenter[0]['y']);
		
		for(var i=1; i<len; i++){
			pointCenter[i] = this.getItemCenter(points[i][0],points[i][1]);

			this.mLine.graphics.lineTo(pointCenter[i]['x'],pointCenter[i]['y']);
		}
			
		this.mLine.graphics.endFill();
		this.addChild( this.mLine );
	}
	
	private cleanLine(){
		if(this.mLine){
			this.removeChild(this.mLine);
		}
		this.cleanPoint();
	}
	
	private canClean(x1, y1, x2, y2) : boolean {
		if(x1 === x2 && y1 === y2){
			return false;
		}

		if(this.mMapArray[y1][x1].type != this.mMapArray[y2][x2].type){
			return false;
		}

		if(this.mMapArray[y1][x1].type < 0 || this.mMapArray[y2][x2].type < 0){	//不处理已消除的图片
			return false;
		}
	
		if(x1 === x2){		//同列
			if(1 === y1-y2 || 1 === y2-y1){	//相邻
				this.addPoint([x1,y1]);
				this.addPoint([x2,y2])
				return true;
			} else if(this.isColEmpty(x1,y1,x2,y2)){	//直线
				this.addPoint([x1,y1]);
				this.addPoint([x2,y2]);
				return true;
			} else {	//两个拐点	(优化)
				var i = 1;
				while((x1+i < this.mMapCols) && this.mMapArray[y1][x1+i].type < 0){
							if(this.mMapArray[y2][x2+i].type >= 0){
								break;
							} else {
								if(this.isColEmpty(x1+i,y1,x1+i,y2)){
									this.addPoint([x1,y1]);
									this.addPoint([x1+i,y1]);
									this.addPoint([x1+i,y2]);
									this.addPoint([x2,y2]);
									return true;
								}
								i++;
							}
						}
						i = 1;
						while((x1-i >= 0) && this.mMapArray[y1][x1-i].type < 0){
							if(this.mMapArray[y2][x2-i].type >= 0){
								break;
							} else {
								if(this.isColEmpty(x1-i,y1,x1-i,y2)){
									this.addPoint([x1,y1]);
									this.addPoint([x1-i,y1]);
									this.addPoint([x1-i,y2]);
									this.addPoint([x2,y2]);
									return true;
								}
								i++;
							}
						}

					}
				}

				if(y1 === y2){		//同行
					if(1 === x1-x2 || 1 === x2-x1){
						this.addPoint([x1,y1]);
						this.addPoint([x2,y2]);
						return true;
					} else if(this.isRowEmpty(x1,y1,x2,y2)){
						this.addPoint([x1,y1]);
						this.addPoint([x2,y2]);
						return true;
					} else {
						var i = 1;
						while((y1+i < this.mMapRows) && this.mMapArray[y1+i][x1].type < 0){
							if(this.mMapArray[y2+i][x2].type >= 0){
								break;
							} else {
								if(this.isRowEmpty(x1,y1+i,x2,y1+i)){
									this.addPoint([x1,y1]);
									this.addPoint([x1,y1+i]);
									this.addPoint([x2,y1+i]);
									this.addPoint([x2,y2]);
									return true;
								}
								i++;
							}
						}
						i = 1;
						while((y1-i >= 0) && this.mMapArray[y1-i][x1].type < 0){
							if(this.mMapArray[y2-i][x2].type >= 0){
								break;
							} else {
								if(this.isRowEmpty(x1,y1-i,x2,y1-i)){
									this.addPoint([x1,y1]);
									this.addPoint([x1,y1-i]);
									this.addPoint([x2,y1-i]);
									this.addPoint([x2,y2]);
									return true;
								}
								i++;
							}
						}
					}
				}
				
				//一个拐点
				if(this.isRowEmpty(x1,y1,x2,y1) && this.mMapArray[y1][x2].type < 0){	// (x1,y1) -> (x2,y1)
					if(this.isColEmpty(x2,y1,x2,y2)){	// (x1,y2) -> (x2,y2)
						this.addPoint([x1,y1]);
						this.addPoint([x2,y1]);
						this.addPoint([x2,y2]);
						return true;
					}
				}
				if(this.isColEmpty(x1,y1,x1,y2) && this.mMapArray[y2][x1].type < 0){
					if(this.isRowEmpty(x1,y2,x2,y2)){
						this.addPoint([x1,y1]);
						this.addPoint([x1,y2]);
						this.addPoint([x2,y2]);
						return true;
					}
				}

				//不在一行的两个拐点
				if( x1 != x2 && y1 != y2) {
					i = x1;
					while(++i < this.mMapCols ){
						if(this.mMapArray[y1][i].type >= 0){
							break;
						} else {
							if(this.isColEmpty(i,y1,i,y2) && this.isRowEmpty(i,y2,x2,y2) && this.mMapArray[y2][i].type < 0){
								this.addPoint([x1,y1]);
								this.addPoint([i,y1]);
								this.addPoint([i,y2]);
								this.addPoint([x2,y2]);
								return true;
							}
						}
					}
					
					i = x1;
					while(--i >= 0 ){
						if(this.mMapArray[y1][i].type >= 0){
							break;
						} else {
							if(this.isColEmpty(i,y1,i,y2) && this.isRowEmpty(i,y2,x2,y2) && this.mMapArray[y2][i].type < 0){
								this.addPoint([x1,y1]);
								this.addPoint([i,y1]);
								this.addPoint([i,y2]);
								this.addPoint([x2,y2]);
								return true;
							}
						}
					}

					i = y1;
					while(++i < this.mMapRows){
						if(this.mMapArray[i][x1] >= 0){
							break;
						} else {
							if(this.isRowEmpty(x1,i,x2,i) && this.isColEmpty(x2,i,x2,y2) && this.mMapArray[i][x2].type < 0){
								this.addPoint([x1,y1]);
								this.addPoint([x1,i]);
								this.addPoint([x2,i]);
								this.addPoint([x2,y2]);
								return true;
							}
						}
					}
					
					i = y1;
					while(--i >= 0){
						if(this.mMapArray[i][x1] >= 0){
							break;
						} else {
							if(this.isRowEmpty(x1,i,x2,i) && this.isColEmpty(x2,i,x2,y2) && this.mMapArray[i][x2].type < 0){
								this.addPoint([x1,y1]);
								this.addPoint([x1,i]);
								this.addPoint([x2,i]);
								this.addPoint([x2,y2]);
								return true;
							}
						}
					}
				}

				return false;
	}
	
	private	isRowEmpty(x1,y1,x2,y2) : boolean {	
		if(y1 != y2){
			return false;
		}
				
		x1>x2 && (x1=x1+x2, x2=x1-x2, x1=x1-x2);	//强制x1比x2小
			
		for(var j=x1+1; j<x2; ++j){		//from (x2,y2+1) to (x2,y1-1);
			if(this.mMapArray[y1][j].type >= 0){
				return false;
			} 
		}
		return true;
	}
			
	private	isColEmpty(x1,y1,x2,y2) : boolean {
		if(x1 != x2){
			return false;
		}
				
		y1>y2 && (y1=y1+y2, y2=y1-y2, y1=y1-y2);	//强制y1比y2小
				
		for(var i=y1+1; i<y2; ++i){		//from (x2+1,y2) to (x1-1,y2);
			if(this.mMapArray[i][x1].type >= 0){
				return false;
			}
		}
		return true;
	}
	
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}


