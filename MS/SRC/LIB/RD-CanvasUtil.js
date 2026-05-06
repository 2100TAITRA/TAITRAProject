//
// CanvasUtil.js
//
// HTML5 Canvas drawing utilities
//
// functions:
//   dashedLine: 畫虛線 (source: http://stackoverflow.com/questions/4576724/dotted-stroke-in-canvas )
//     x, y: 起始點座標
//     x2, y2: 結束點座標
//     dashArray: 實線,空白寛度, ex: [30, 10] 30pixels實線, 10pixels空白
//

(function($){
    
    //var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
    var CP = null;
    if (window.CanvasRenderingContext2D) {
        CP = CanvasRenderingContext2D.prototype;
    }
    
    if (CP && CP.lineTo){
      CP.dashedLine = function(x, y, x2, y2, da)
      {
        /*if (!dashArray) dashArray=[10,5];
        if (dashLength==0) dashLength = 0.001; // Hack for Safari
        var dashCount = dashArray.length;
        this.moveTo(x, y);
        console.log('dashedLine() - moveTo(x=' + x + ', y=' + y + ')');
        
        var dx = (x2-x), dy = (y2-y);
        var slope = dy/dx;
        var distRemaining = Math.sqrt( dx*dx + dy*dy );
        var dashIndex=0, draw=true;
        while (distRemaining>=0.1){
          var dashLength = dashArray[dashIndex++%dashCount];
          if (dashLength > distRemaining) dashLength = distRemaining;
          var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
          if (dx<0) xStep = -xStep;
          x += xStep
          y += slope*xStep;
          this[draw ? 'lineTo' : 'moveTo'](x,y);
          console.log('dashedLine() - ' + (draw? 'lineTo' : 'moveTo') + '(x=' + x + ', y=' + y + ')');
          distRemaining -= dashLength;
          draw = !draw;
        }*/
        if (!da) da = [10,5];
        this.save();
        var dx = (x2-x), dy = (y2-y);
        var len = Math.sqrt(dx*dx + dy*dy);
        var rot = Math.atan2(dy, dx);
        this.translate(x, y);
        this.moveTo(0, 0);
        this.rotate(rot);       
        var dc = da.length;
        var di = 0, draw = true;
        x = 0;
        while (len > x) {
            x += da[di++ % dc];
            if (x > len) x = len;
            draw ? this.lineTo(x, 0): this.moveTo(x, 0);
            draw = !draw;
        }       
        this.restore();
      }
    }
})(jQuery);

//
// 畫流程連接線 (左下 -> 右上)
//
function _drawConnectLineLB2RT($canvas, lineColor, dashedline)
{
	var w = $canvas.attr('width');
	var h = $canvas.attr('height');

	var ctx = $canvas.get(0).getContext('2d');
	
	// clear canvas
	$canvas[0].width = w;
	$canvas[0].height = h;
	
	ctx.lineCap = 'round';
	ctx.lineWidth = 1;
	
	var top = 10;
	var bottom = h - 5;
	var left = 0;
	var right = w;
	var middle = w/2;
		
	// 畫直線(虛線)
	if (dashedline==true) {
		ctx.fillStyle = lineColor;
		ctx.dashedLine(left, bottom, middle, bottom, [2, 1]);
		ctx.dashedLine(middle, bottom, middle, top, [2, 1]);
		ctx.dashedLine(middle, top, right, top, [2, 1]);
		ctx.stroke();
	}
	else {
		// 畫直線(實線)
		ctx.fillStyle = lineColor;
		ctx.moveTo(left, bottom);
		ctx.lineTo(middle, bottom);
		ctx.lineTo(middle, top);
		ctx.lineTo(right, top);
		ctx.stroke();
	}
	
	// 畫箭頭(@右上角)
	ctx.beginPath();
	ctx.fillStyle = '#7d7d7d';
	ctx.moveTo(w-8, top-10);
	ctx.lineTo(w-8, top+10);
	ctx.lineTo(w, top);
	ctx.lineTo(w-8, top-10);
	ctx.closePath();
	ctx.fill();
}
//
// 畫流程連接線 (左上 -> 右下)
//
function _drawConnectLineLT2RB($canvas, lineColor, dashedline)
{
	var w = $canvas.attr('width');
	var h = $canvas.attr('height');

	var ctx = $canvas.get(0).getContext('2d');
	
	// clear canvas
	$canvas[0].width = w;
	$canvas[0].height = h;
	
	ctx.lineCap = 'round';
	ctx.lineWidth = 1;
	
	var top = 10;
	var bottom = h - 5;
	var left = 0;
	var right = w;
	var middle = w/2;
		
	// 畫直線(虛線)
	if (dashedline==true) {
		ctx.fillStyle = lineColor;
		ctx.dashedLine(left, top, middle, top, [2, 1]);
		ctx.dashedLine(middle, top, middle, bottom, [2, 1]);
		ctx.dashedLine(middle, bottom, right, bottom, [2, 1]);
		ctx.stroke();
	}
	else {
		// 畫直線(實線)
		ctx.fillStyle = lineColor;
		ctx.moveTo(left, top);
		ctx.lineTo(middle, top);
		ctx.lineTo(middle, bottom);
		ctx.lineTo(right, bottom);
		ctx.stroke();
	}
	
	// 畫箭頭(@右下角)
	ctx.beginPath();
	ctx.fillStyle = '#7d7d7d';
	ctx.moveTo(w-8, bottom-10);
	ctx.lineTo(w-8, bottom+10);
	ctx.lineTo(w, bottom);
	ctx.lineTo(w-8, bottom-10);
	ctx.closePath();
	ctx.fill();
}
//
// 畫流程連接線 (左->右)
//
function _drawConnectLineL2R($canvas, lineColor, dashedline)
{
	var w = $canvas.attr('width');
	var h = $canvas.attr('height');

	var ctx = $canvas.get(0).getContext('2d');
	
	// clear canvas
	$canvas[0].width = w;
	$canvas[0].height = h;
	
	ctx.lineCap = 'round';
	ctx.lineWidth = 1;
	
	var left = 0,
		right = w;
	var middle = h/2;
		
	if (dashedline) {
		// 畫直線(虛線)
		ctx.fillStyle = lineColor;
		ctx.dashedLine(left, middle, right, middle, [2, 1]);
		ctx.stroke();
	}
	else {
		// 畫直線(實線)
		ctx.fillStyle = lineColor;
		ctx.moveTo(left, middle);
		ctx.lineTo(right, middle);
		ctx.stroke();
	}
	
	// 畫箭頭
	ctx.beginPath();
	ctx.fillStyle = '#7d7d7d';
	ctx.moveTo(w-8, middle-10);
	ctx.lineTo(w-8, middle+10);
	ctx.lineTo(w, middle);
	ctx.lineTo(w-8, middle-10);
	ctx.closePath();
	ctx.fill();
}
//
// 畫流程連接線 (上->下)
//
function _drawConnectLineT2B($canvas, lineColor, dashedline)
{
	var w = $canvas.attr('width');
	var h = $canvas.attr('height');

	var ctx = $canvas.get(0).getContext('2d');
	
	// clear canvas
	$canvas[0].width = w;
	$canvas[0].height = h;
	
	ctx.lineCap = 'round';
	ctx.lineWidth = 1;
	
	var top = 0,
		bottom = h,
		middle = w/2;
		
	if (dashedline) {
		// 畫直線(虛線)
		ctx.fillStyle = lineColor;
		ctx.dashedLine(middle, top, middle, bottom, [2, 1]);
		ctx.stroke();
	}
	else {
		// 畫直線(實線)
		ctx.fillStyle = lineColor;
		ctx.moveTo(middle, top);
		ctx.lineTo(middle, bottom);
		ctx.stroke();
	}
	
	// 畫箭頭
	ctx.beginPath();
	ctx.fillStyle = '#7d7d7d';
	ctx.moveTo(middle-10, bottom-8);
	ctx.lineTo(middle+10, bottom-8);
	ctx.lineTo(middle, bottom);
	ctx.lineTo(middle-10, bottom-8);
	ctx.closePath();
	ctx.fill();
}
