// RefView namespace
//   
	
function RefViewController($containerElem) {
	
	var ContainerTwoPaneClass = "ui-two-pane";
	var LeftPaneClass = "ui-pane-a";
	var RightPaneClass = "ui-pane-b";
	var State = {Single: 1, Twin: 2};
	this.$containerElem = $containerElem;
	this.currState = $containerElem.hasClass(ContainerTwoPaneClass)?State.Twin:State.Single;
	
	this.toggle = function(onshow, onhide) {	// 2014.8.25 - Raymond, 新增onshow, onhide回呼參數
		if(this.$containerElem.hasClass(ContainerTwoPaneClass)) {
			this.$containerElem.find("." + LeftPaneClass).one("transitionend", function(event) {
				$(this).find("#zoomControl1, #zoomControl2").find("select").trigger('change');
			});
			this.$containerElem.find("." + RightPaneClass).one("transitionend", function(event) {
				if(typeof onhide !== "undefined")	// 隱藏副面板時呼叫onhide
					onhide(this);
			});
			this.$containerElem.removeClass(ContainerTwoPaneClass);
			this.currState = State.Single;
		}
		else {
			this.$containerElem.find("." + LeftPaneClass).one("transitionend", function(event) {
				$(this).find("#zoomControl1, #zoomControl2").find("select").trigger('change');
			});
			this.$containerElem.find("." + RightPaneClass).one("transitionend", function(event) {
				if(typeof onshow !== "undefined")	// 顯示副面板時呼叫onshow
					onshow(this);
			});
			this.$containerElem.addClass(ContainerTwoPaneClass);
			this.currState = State.Twin;
		}
	}
	// 2015.1.28 - Raymond, 新增close方法
	this.close = function(onhide) {
		if(this.$containerElem.hasClass(ContainerTwoPaneClass)) {
			this.$containerElem.find("." + RightPaneClass).one("transitionend", function(event) {
				if(typeof onhide !== "undefined")	// 隱藏副面板時呼叫onhide
					onhide(this);
			});
			this.$containerElem.removeClass(ContainerTwoPaneClass);
			this.currState = State.Single;
		}
	}
	// 2016.8.18 新增open方法
	this.open = function(onshow) {
		if(!this.$containerElem.hasClass(ContainerTwoPaneClass)) {
			this.$containerElem.find("." + RightPaneClass).one("transitionend", function(event) {
				if(onshow && $.isFunction(onshow))	// 顯示副面板後呼叫onshow
					onshow(this);
			});
			this.$containerElem.addClass(ContainerTwoPaneClass);
			this.currState = State.Twin;
		}
	}
	
	/*$containerElem.find("." + LeftPaneClass).on("webkitTransform", function(event) {
		console(LeftPaneClass + "." + event.type + ":");
		$(this).trigger("size");
	});
	$containerElem.find("." + RightPaneClass).on("webkitTransform", function(event) {
		console(RightPaneClass + "." + event.type + ":");
		$(this).trigger("size");
	});*/
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-RefView.js").finish();
})();
