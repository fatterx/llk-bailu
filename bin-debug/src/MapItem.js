var MapItem = (function (_super) {
    __extends(MapItem, _super);
    function MapItem() {
        _super.call(this);
        this.mWidth = 59;
        this.mHeight = 59;
        this.mBorderColor = 0xFFC0CB;
        this.mBorderColorSelected = 0xff0000;
        this.mBorderWidth = 1;
        this.mBackgrourdColor = 0xF8F8FF;
        this.mTextSize = 16;
        this.mType = 0;
        this.createView();
    }
    var __egretProto__ = MapItem.prototype;
    __egretProto__.createView = function () {
        this.drawBg(this.mBorderColor);
        this.drawContent();
        //	this.touchEnabled = true;
        //	this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
    };
    __egretProto__.drawBg = function (borderColor) {
        this.graphics.lineStyle(this.mBorderWidth, borderColor);
        this.graphics.beginFill(this.mBackgrourdColor);
        this.graphics.drawRect(0, 0, this.mWidth, this.mHeight);
        this.graphics.endFill();
    };
    __egretProto__.drawContent = function () {
        this.txtContent = new egret.TextField();
        this.addChild(this.txtContent);
        this.txtContent.width = this.mWidth + this.mBorderWidth * 2;
        this.txtContent.height = this.mHeight + this.mBorderWidth * 2;
        this.txtContent.size = this.mTextSize;
        this.txtContent.fontFamily = "微软雅黑";
        this.txtContent.textAlign = egret.HorizontalAlign.CENTER;
        this.txtContent.verticalAlign = egret.VerticalAlign.MIDDLE;
    };
    __egretProto__.setSelect = function (selected) {
        if (selected) {
            this.drawBg(this.mBorderColorSelected);
        }
        else {
            this.drawBg(this.mBorderColor);
        }
    };
    __egretProto__.setType = function (type) {
        this.mType = type;
    };
    __egretProto__.getType = function () {
        return this.mType;
    };
    __egretProto__.setContent = function (content) {
        this.txtContent.text = content.text;
        this.txtContent.textColor = parseInt(content.textColor);
    };
    return MapItem;
})(egret.Sprite);
MapItem.prototype.__class__ = "MapItem";
