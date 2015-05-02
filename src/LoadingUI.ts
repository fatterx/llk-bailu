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

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
        this.createTitle();
    }

    private textField:egret.TextField;
    private txtTitle:egret.TextField;

    private createView():void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 150;
        this.textField.width = 480;
        this.textField.size = 18;
        this.textField.height = 500;
        this.textField.text = "少年莫怕，这不是打开了你手机里珍藏的小电影！继续下一步前 Please make sure that" +
            "\n" +
            "\n1.方圆3*3范围内无老师、督导、家长等生物出现2.处于wifi环境（土豪忽略）3.手机电量超过30%" +
            "\n" +
            "\nTIPS:1.吸烟有害健康2.小撸怡情，久玩伤身3.你肯定想到了强撸灰飞烟灭" +
            "\n" +
            "\nPS:游戏内可能含有高能内容，智商低于150者慎入，小心被碾压!" +
            "\n" +
            "\nPPS:本demo由无证且ws程序员开发，如有bug纯属正常!" +
            "\n" +
            "\nPPPS:以上都属废话，真实情况是UE妹子休假了，无证且ws程序员自己yy的一个loading页面。" +
            "之后的页面会跟主页面差异较大，画风略diao，请做好心里准备!" +
            "\n" +
            "\nPPPPS:如果你看到了这里，要么你的网速搓的令人发指，要么手机卡出翔基本永远卡在这个页面，" +
            "算了，不要试图挣扎，肯定还是会卡在这里的，这里的，里的，的。不如推荐你换成一代神机xiang米，" +
            "8核8钻，超长待机。" +
            "如果你坚持看到里这里，说明你挺无聊的，其实我也挺无聊的，8秒你懂的..."
    }

    private createTitle() {
        this.txtTitle = new egret.TextField();
        this.addChild(this.txtTitle);
        var stageW:number = 480;
        this.txtTitle.width = 200;
        this.txtTitle.height = 40;
        this.txtTitle.x = stageW / 2 - this.txtTitle.width / 2;
        this.txtTitle.y = 50;
        this.txtTitle.background = true;
        this.txtTitle.backgroundColor = 0xff0000;
        this.txtTitle.text = "NCEE WARNING"
        this.txtTitle.size = 22;
        this.txtTitle.textAlign = "center";
        this.txtTitle.verticalAlign = "middle";
    }


}
