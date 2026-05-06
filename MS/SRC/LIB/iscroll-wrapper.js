/*
 * iscroll-wrapper for jQquery.
 * http://sanraul.com/projects/jqloader/
 * 
 * Copyright (c) 2011 Raul Sanchez (http://www.sanraul.com)
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function($){
    $.fn.iscroll = function(options){
		//if(this.data('iScrollReady') == null){
		if(this.data('iScroll') == null) {
			var that = this;
            var _options =  $.extend({}, options);
				_options.onScrollEnd = function(){
					that.triggerHandler('onScrollEnd', [this]);
				};
				_options.onBeforeScrollStart = function(e) {
					if(e.target.tagName != "SELECT") {  // 增加過濾條件以避免iScroll把SELECT的click也吃掉了
						e.preventDefault();
						//e.stopPropagation();
					}
				};
			//console.log("iscroll(): argument.callee.object=" + arguments.callee.object);
			// Raymond fix, arguments.callee.object只有一份, 當2個以上元素要各別套用iScroll時, arguments.callee.object永遠只留最後一個, 導致後續無法利用
			//arguments.callee.object  = new iScroll(this.get(0), _options);
			// 需改用data機制保存
			this.data('iScroll', new iScroll(this.get(0), _options));
			
			// NOTE: for some reason in a complex page the plugin does not register
			// the size of the element. This will fix that in the meantime.
			setTimeout(function(scroller){
				scroller.refresh();
			}, 1000, this.data('iScroll'));
			//this.data('iScrollReady', true);
		}else{
			//arguments.callee.object.refresh();
			if(typeof options == 'string') {	// Raymond added, 增加字串參數直接取得iScroll物件或直接刷新
				if(options == "api")
					return this.data('iScroll');
				else if(options == "refresh")
					this.data('iScroll').refresh();
				else if(options == "enable")
					this.data('iScroll').enable();
				else if(options == "disable")
					this.data('iScroll').disable();
			}
			else
				this.data('iScroll').refresh();
		}
		//return arguments.callee.object;
		return this;
	};
})(jQuery);