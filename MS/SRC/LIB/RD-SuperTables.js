/* jshint -W100 */

/////////////////////////////////////////////////////////////////////////////////////////
// Super Tables v0.30 - MIT Style License
// Copyright (c) 2008 Matt Murphy --- www.matts411.com
//
// Contributors:
// Joe Gallo
/////////////////////////////////////////////////////////////////////////////////////////
////// TO CALL: 
// new superTable([string] tableId, [object] options);
//
////// OPTIONS: (order does not matter )
// cssSkin : string ( eg. "sDefault", "sSky", "sOrange", "sDark" )
// headerRows : integer ( default is 1 )
// fixedCols : integer ( default is 0 )
// colWidths : integer array ( use -1 for auto sizing )
// onStart : function ( any this.variableNameHere variables you create here can be used later ( eg. onFinish function ) )
// onFinish : function ( all this.variableNameHere variables created in this script can be used in this function )
//
////// EXAMPLES:
// var myST = new superTable("myTableId");
//
// var myST = new superTable("myTableId", {
//		cssSkin : "sDefault",
//		headerRows : 1,
//		fixedCols : 2,
//		colWidths : [100, 230, 220, -1, 120, -1, -1, 120],
//		onStart : function () {
//			this.start = new Date();
//		},
//		onFinish : function () {
//			alert("Finished... " + ((new Date()) - this.start) + "ms.");
//		}
// });
//
////// ISSUES / NOTES:
// 1. No quirksmode support (officially, but still should work)
// 2. Element id's may be duplicated when fixedCols > 0, causing getElementById() issues
// 3. Safari will render the header row incorrectly if the fixed header row count is 1 and there is a colspan > 1 in one 
//		or more of the cells (fix available)
/////////////////////////////////////////////////////////////////////////////////////////

// 2012.1.9 - Eric Peng - survey
// 工作原理:
// 1. 另行複製一個一模一樣的table
// 2. 以colgroup設定欄位寬度, 並將<table>的table-layout屬性設為"fixed", 以達成表格寬度控制
// 3. 第一個table之z-order為'3', 高度為header之高度
// 4. 第二個table之z-order為'2', 高度為整個table之高度
// 5. 第一個table位置固定, 用來顯示固定的header
// 6. 第二個table的container<div>可scroll[css.overflow:auto]
//
// cssSkin:
// headerRows: 位置固定的項目數量(列數)
// fixedCols: 位置固定的欄位數量(不scroll)
// colWidths:
// initFunc: 開始轉換作業時叫用的callback function
// callbackFunc: 完成作業時叫用的callback function
// 
var superTable = function (tableId, options) {
/////* Initialize */
	options = options || {};
	this.cssSkin = options.cssSkin || "";
	this.headerRows = parseInt(options.headerRows || "1");
	this.fixedCols = parseInt(options.fixedCols || "0");
	this.colWidths = options.colWidths || [];
	this.initFunc = options.onStart || null;
	this.callbackFunc = options.onFinish || null;
	
	// 2012.12.10 - 可設定sData之extra class
	this.dataTableExtraClass = options.dataTableExtraClass || '';
	
	this.initFunc && this.initFunc();
	
	var tmSecBegin; // 2016.10.30 - Eric Peng
		
	if (typeof _debugTime ==='boolean' && _debugTime===true) {
		theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + ' -tm- ctor::superTable init/clone members BEGIN...');
		tmSecBegin = Date.now();
	}
	
/////* Create the framework dom */
	this.sBase = document.createElement("DIV");
	this.sFHeader = this.sBase.cloneNode(false); // [Optional] for fixedCols
	this.sHeader = this.sBase.cloneNode(false);
	this.sHeaderInner = this.sBase.cloneNode(false);
	this.sFData = this.sBase.cloneNode(false); // [Optional] for fixedCols
	this.sFDataInner = this.sBase.cloneNode(false);
	this.sData = this.sBase.cloneNode(false);
	this.sScroller = this.sBase.cloneNode(false);
	
	if (typeof _debugTime ==='boolean' && _debugTime===true) {
		SSOUtil.dev_logTimeElapse('ctor::superTable init/clone members', tmSecBegin);
	}
	
	// Eric Peng - create <colgroup> for setup column width
	this.sColGroup = document.createElement("COLGROUP");
	
	this.sDataTable = document.getElementById(tableId);
	
	this.sDataTable.style.margin = "0px"; /* Otherwise looks bad */
	if (this.cssSkin !== "") {
		// 2012.12.10 - className為空值時,不須在前面加空白字元!
		if (this.sDataTable.className.length!=0) {
			this.sDataTable.className += " " + this.cssSkin;
		}
		else {
			this.sDataTable.className += "" + this.cssSkin;
		}
	}
	
	// 2012.12.10 - DataTable加className
	if (this.dataTableExtraClass.length==0)
	{
		if (this.sDataTable.className.length!=0) {
			this.sDataTable.className += " " + this.dataTableExtraClass;
		}
		else {
			this.sDataTable.className += "" + this.dataTableExtraClass;
		}
	}
	
	if (this.sDataTable.getElementsByTagName("COLGROUP").length > 0) {
		this.sDataTable.removeChild(this.sDataTable.getElementsByTagName("COLGROUP")[0]); /* Making our own */
	}
	
	this.sParent = this.sDataTable.parentNode;
	this.sParentHeight = this.sParent.offsetHeight;
	this.sParentWidth = this.sParent.offsetWidth;
	
	// Eric Peng - dump parent info
	$parent = $(this.sDataTable).parent();
	theLogger.debug('parent: id=' + $parent.attr('id') + ', class=' + $parent.attr('class') +
				', h=' + this.sParentHeight + ', w=' + this.sParentWidth);
	
/////* Attach the required classNames */
	this.sBase.className = "sBase";
	this.sFHeader.className = "sFHeader";
	this.sHeader.className = "sHeader";
	this.sHeaderInner.className = "sHeaderInner";
	this.sFData.className = "sFData";
	this.sFDataInner.className = "sFDataInner";
	this.sData.className = "sData";
	
	// 2012.12.6 - touch scroll改用Mobile Safari原生之scroll機制
	// 2012.2.7 - for jQM ScrollView
	//$(this.sData).attr('data-scroll', "y");
	
/////* Clone parts of the data table for the new header table */
	var alpha, beta, touched, clean, cleanRow, i, j, k, m, n, p;
	this.sHeaderTable = this.sDataTable.cloneNode(false);
	if (this.sDataTable.tHead) {
		alpha = this.sDataTable.tHead;
		this.sHeaderTable.appendChild(alpha.cloneNode(false));
		beta = this.sHeaderTable.tHead;
	} else {
		alpha = this.sDataTable.tBodies[0];
		this.sHeaderTable.appendChild(alpha.cloneNode(false));
		beta = this.sHeaderTable.tBodies[0];
	}
	alpha = alpha.rows; // alpha: header或第一列的內容
	for (i=0; i<this.headerRows; i++) {
		beta.appendChild(alpha[i].cloneNode(true));
	}
	this.sHeaderInner.appendChild(this.sHeaderTable);
	
	if (this.fixedCols > 0) {
		this.sFHeaderTable = this.sHeaderTable.cloneNode(true);
		this.sFHeader.appendChild(this.sFHeaderTable);
		this.sFDataTable = this.sDataTable.cloneNode(true);
		this.sFDataInner.appendChild(this.sFDataTable);
	}
	
/////* Set up the colGroup */
	alpha = this.sDataTable.tBodies[0].rows;
	
	// 2016.10.30 - 最多只取前面50筆
	var maxCalcCnt = alpha.length;
	//if (typeof _debugTime=='boolean' && _debugTime===true) {
	//	maxCalcCnt = (alpha.length>50) ? 50 : alpha.length;
	//}
	
	if (typeof _debugTime ==='boolean' && _debugTime===true) {
		theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + ' -tm- ctor::superTable calc. Col[' + maxCalcCnt + '] widths BEGIN...');
		tmSecBegin = Date.now();
	}
	
	for (i=0, j=maxCalcCnt.length; i<j; i++) {
		clean = true;
		for (k=0, m=alpha[i].cells.length; k<m; k++) {
			if (alpha[i].cells[k].colSpan !== 1 || alpha[i].cells[k].rowSpan !== 1) {
				i += alpha[i].cells[k].rowSpan - 1;
				clean = false;
				break;
			}
		}
		if (clean === true) break; /* A row with no cells of colSpan > 1 || rowSpan > 1 has been found */
	}
	cleanRow = (clean === true) ? i : 0; /* Use this row index to calculate the column widths */
	for (i=0, j=alpha[cleanRow].cells.length; i<j; i++) {
		if (i === this.colWidths.length || this.colWidths[i] === -1) {
			this.colWidths[i] = alpha[cleanRow].cells[i].offsetWidth;
		}
	}
	
	if (typeof _debugTime ==='boolean' && _debugTime===true) {
		SSOUtil.dev_logTimeElapse('ctor::superTable calc. Col widths', tmSecBegin);
	}
	
	//
	// 2012.1.30 - Eric Peng, 調整欄位寬度
	//
	var totalW_diff = 0; // 2016.4 - modify width of table
	/*if (tableId == 'todolist_tb') {
		// 計算總寬度
		var w_before = 0, w_after = 0;
		for(i=0, j=3; i<j; i++) {
			w_before += this.colWidths[i];
		}
		
		// 速別/燈號/密等設為一半寬
		for(i=0, j=3; i<j; i++) {
			this.colWidths[i] = (this.colWidths[i] / 2) + 12;
			w_after += this.colWidths[i];
		}
		
		totalW_diff += (w_before - w_after);
	}*/
	
	for (i=0, j=this.colWidths.length; i<j; i++) {
		this.sColGroup.appendChild(document.createElement("COL"));
		this.sColGroup.lastChild.setAttribute("width", this.colWidths[i]);
	}
	this.sDataTable.insertBefore(this.sColGroup.cloneNode(true), this.sDataTable.firstChild);
	this.sHeaderTable.insertBefore(this.sColGroup.cloneNode(true), this.sHeaderTable.firstChild);
	if (this.fixedCols > 0) {
		this.sFDataTable.insertBefore(this.sColGroup.cloneNode(true), this.sFDataTable.firstChild);
		this.sFHeaderTable.insertBefore(this.sColGroup.cloneNode(true), this.sFHeaderTable.firstChild);
	}
	
/////* Style the tables individually if applicable */
	if (this.cssSkin !== "") {
		this.sDataTable.className += " " + this.cssSkin + "-Main";
		this.sHeaderTable.className += " " + this.cssSkin + "-Headers";
		if (this.fixedCols > 0) {
			this.sFDataTable.className += " " + this.cssSkin + "-Fixed";
			this.sFHeaderTable.className += " " + this.cssSkin + "-FixedHeaders";
		}
	}
	
/////* Throw everything into sBase */
	if (this.fixedCols > 0) {
		this.sBase.appendChild(this.sFHeader);
	}
	this.sHeader.appendChild(this.sHeaderInner);
	this.sBase.appendChild(this.sHeader);
	if (this.fixedCols > 0) {
		this.sFData.appendChild(this.sFDataInner);
		this.sBase.appendChild(this.sFData);
	}
	this.sBase.appendChild(this.sData);
	this.sParent.insertBefore(this.sBase, this.sDataTable);
	
	if (typeof _debugTime ==='boolean' && _debugTime===true) {
		theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + ' -tm- superTable.sData.appendChild() BEGIN...');
		tmSecBegin = Date.now();
	}
	
	this.sData.appendChild(this.sDataTable);
	
	if (typeof _debugTime ==='boolean' && _debugTime===true) {
		SSOUtil.dev_logTimeElapse('superTable.sData.appendChild', tmSecBegin);
	}
	
/////* Align the tables */
	var sDataStyles, sDataTableStyles;
	this.sHeaderHeight = this.sDataTable.tBodies[0].rows[(this.sDataTable.tHead) ? 0 : this.headerRows].offsetTop;
	sDataTableStyles = "margin-top: " + (this.sHeaderHeight * -1) + "px;";
	sDataStyles = "margin-top: " + this.sHeaderHeight + "px;";
	sDataStyles += "height: " + (this.sParentHeight - this.sHeaderHeight) + "px;";
	// 2012.12.6 - touch scroll改用Mobile Safari原生之scroll機制
	//sDataStyles += "overflow-y: scroll;-webkit-overflow-scrolling: touch;";
	if (this.fixedCols > 0) {		
		/* A collapsed table's cell's offsetLeft is calculated differently (w/ or w/out border included) across broswers - adjust: */
		this.sFHeaderWidth = this.sDataTable.tBodies[0].rows[cleanRow].cells[this.fixedCols].offsetLeft;
		if (window.getComputedStyle) {
			alpha = document.defaultView;
			beta = this.sDataTable.tBodies[0].rows[0].cells[0];
			if (navigator.taintEnabled) { /* If not Safari */
				this.sFHeaderWidth += Math.ceil(parseInt(alpha.getComputedStyle(beta, null).getPropertyValue("border-right-width")) / 2);
			} else {
				this.sFHeaderWidth += parseInt(alpha.getComputedStyle(beta, null).getPropertyValue("border-right-width"));
			}
		} else if (/*@cc_on!@*/0) { /* Internet Explorer */
			alpha = this.sDataTable.tBodies[0].rows[0].cells[0];
			beta = [alpha.currentStyle["borderRightWidth"], alpha.currentStyle["borderLeftWidth"]];
			if(/px/i.test(beta[0]) && /px/i.test(beta[1])) {
				beta = [parseInt(beta[0]), parseInt(beta[1])].sort();
				this.sFHeaderWidth += Math.ceil(parseInt(beta[1]) / 2);
			}
		}
		
		/* Opera 9.5 issue - a sizeable data table may cause the document scrollbars to appear without this: */
		if (window.opera) {
			this.sFData.style.height = this.sParentHeight + "px";
		}
		
		this.sFHeader.style.width = this.sFHeaderWidth + "px";
		sDataTableStyles += "margin-left: " + (this.sFHeaderWidth * -1) + "px;";
		sDataStyles += "margin-left: " + this.sFHeaderWidth + "px;";
		// sDataStyles += "width: " + (this.sParentWidth - this.sFHeaderWidth) + "px;";
		sDataStyles += "width: " + (this.sParentWidth - this.sFHeaderWidth - totalW_diff) + "px;";
	} else {
		//sDataStyles += "width: " + this.sParentWidth + "px;";
		sDataStyles += "width: " + (this.sParentWidth - totalW_diff) + "px;";
	}
	this.sData.style.cssText = sDataStyles;
	this.sDataTable.style.cssText = sDataTableStyles;
	
/////* Set up table scrolling and IE's onunload event for garbage collection */
	(function (st) {
		if (st.fixedCols > 0) {
			st.sData.onscroll = function () {
				st.sHeaderInner.style.right = st.sData.scrollLeft + "px";
				st.sFDataInner.style.top = (st.sData.scrollTop * -1) + "px";
			};
		} else {
			st.sData.onscroll = function () {
				st.sHeaderInner.style.right = st.sData.scrollLeft + "px";
			};
		}
		if (/*@cc_on!@*/0) { /* Internet Explorer */
			window.attachEvent("onunload", function () {
				st.sData.onscroll = null;
				st = null;
			});
		}
	})(this);
	
	this.callbackFunc && this.callbackFunc();
};
