class MapItem extends egret.Sprite {
	private mWidth: number = 89;
	private mHeight: number = 89;
	private mBorderColor: number = 0xFFC0CB;
	private mBorderColorSelected: number = 0xff0000;
	private mBorderWidth: number = 1;
	private mBackgrourdColor: number = 0xF8F8FF;
	private mTextSize: number = 28;
	
	private mType : number = 0;

    public constructor(){
        super();
        this.createView();
    }
    private txtContent:egret.TextField;

    private createView():void {

		this.drawBg(this.mBorderColor);
		this.drawContent();
		
	//	this.touchEnabled = true;
	//	this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
    }
	
	private drawBg(borderColor:number):void{
		this.graphics.lineStyle(this.mBorderWidth, borderColor);
		this.graphics.beginFill(this.mBackgrourdColor );
		this.graphics.drawRect(0, 0, this.mWidth, this.mHeight );
		this.graphics.endFill();
	}
	
	private drawContent():void{
	    this.txtContent = new egret.TextField();
        this.addChild(this.txtContent);
        this.txtContent.width = this.mWidth + this.mBorderWidth * 2;
        this.txtContent.height = this.mHeight + this.mBorderWidth * 2;
		this.txtContent.size = this.mTextSize;
		this.txtContent.fontFamily = "微软雅黑";
		this.txtContent.bold = true;
		this.txtContent.textAlign = egret.HorizontalAlign.CENTER;
		this.txtContent.verticalAlign = egret.VerticalAlign.MIDDLE;
	}
	
	public setSelect(selected: boolean): void{
		if(selected){
			this.drawBg(this.mBorderColorSelected);
		} else {
			this.drawBg(this.mBorderColor);
		}
	}
	
	public setType(type : number):void　{
		this.mType = type;
	}
	
	public getType():number {
		return this.mType;
	}
	
	public setContent(content): void {
		this.txtContent.text = content.text;
		this.txtContent.textColor = parseInt(content.textColor);
	}
}


