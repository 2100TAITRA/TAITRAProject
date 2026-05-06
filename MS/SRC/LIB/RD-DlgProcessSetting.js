/* jshint -W100 */

/*
DATE	MGRNO		SA		PG		Desc
108092  1080339     Kevin   Eric    jQuery 3.0 upgrade
1061024	1060953		David	David	鐵工局如為彙辦公文，可使用承辦人自行決行
1050901	   		    Eric	Eric	1050096-新增送承辦單位會簽人員(OD97)異動選項.
1050901	   		    Eric	Eric	[項次178]草稿公文開啟時, 不叫用ODMSSP.GetDocToDoList取流程資訊.
1050819	   		    Eric	Eric	[項次94]傳送設定只有ODWMSG.TX_NAME相同時, 沒有正確帶出傳送設定問題(UI異常)
1050819	   		    Eric	Eric	線上簽核MPRuleE在讀取SPECIAL_CHECK未有設定值時, 部份內部欄位值未正確初始化問題.
1080923 1080339     Kevin   Eric    jQuery 3.0 upgrade
1081217	-------		Raymond	Raymond	修正文字意見的XSS漏洞
1100519 1100093 	Eric	Eric 	(1) 彙併辦母文傳送時一併封裝子文功能實作. (2)[驗測用]外機關陳核會稿功能實作!
1110319	1101416		David	Joe		依系統參數修改回閱名稱
1121031	-------		David	David	紙本rule物件新增取得METADATA_M內的RCVMODE屬性
1121225	-------		Leslie	Leslie	[卡驗收序15]針對'E4'直接列出單位內的承辦人清單(跳過角色)
1130305	-------		Leslie	Leslie	[彙整表-序20]領務局驗收允諾需求，簡化線上簽核右鍵分辦選單(實作線上簽核的TO_OU='K')
1130830	1130531		Leslie	Leslie	[北榮]增修MENUTO_DETAIL選單可依設定增加顯示隸屬單位
1131204	1131151		Leslie	Leslie	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題
1140321	1131289		David	Leslie	增加可傳送給流程有經過的人員
1140808	退輔序65		Leslie	Leslie	新增判別是否有可用的傳送對象
1150312	外貿序75	Leslie	Leslie	修正簽辦意見窗格不顯示草稿簽辦意見的問題
*/

/*
//
// mDlgProcessSetting.js
//
// 實作公文辦理流程及設定子視窗作業功能
//
// TODO-List:
//   1. [2012.12.27] - 會辦流程之連接線及TxName顯示
//   2. [2012.12.27] - 會辦子項目展開顯示及連接線
//   3. [2012.12.28] - mobiscroll設定初始值方法
//   4. mobiscroll若theme設為'ios', 則 labels 不會顯示問題(mobiscroll預設行為)
//   5. 一般流程 新增 "會辦"項目
//   6. 刪除會辦項目(會辦re-calc layout, delete all 會辦 items)
//   7. 插入流程於會辦結束
//   8. 會辦項目修改流程內容!
//   9. 流程項目異動順序!
//  10. 新增/刪除流程時, 流程項目產生/消失/移動動畫!(目前實作直接刪除)
//  11. 整合:
//        a. 會辦單位超出簽稿會核單之門檻值時, 自動產生簽稿會核單機制!
//        b. 由文稿取得會辦資訊!
//  12. 內會判斷及處理
//  13. 後會或流程內有多組會辦流程之處理!
//  14. 唯讀文件夾項目開啟時, 不分析預排流程內容! 不可傳送公文! (回閱!?)
//
*/

/* 2013.6 - 分析Deva FOLDDER/SBUFOLDER之TO_OU
 * [v] => 須在P2實作項目.
 * 
 * 待處理-待核示:
 *   [v]送請簽核: B + O2 (T$04 ??)
 *   [?]續辦退回: J
 *   [v]續辦退回承辦人: D
 *   [v]核可: X$97 (???)
 *   [v]辦畢退回: D
 *   [v]送總發文: G
 *   [v]退回: D
 *   退回上一流程點: 'EMPTY'
 *   [v]內會: O1
 *   [v]順會: M
 *   [v]後會: M
 *   [v]複閱: B-
 *   [v]送單位發文: E
 *   [v]歸檔: L
 *   [v]退回承辦單位長官: E (Next role='OD11:OD12:OD13')
 *   銷號: (空)
 *   退回轉紙本: D
 *   三長辦畢: X
 *   [v]辦畢: (空)
 *   [v]分會: (空)
 *   [v]順會至人: A
 *   退回轉為紙本: D
 * 待處理-待複閱:
 *   辦畢退回: D
 *   送總發文: G
 *   歸檔: L
 *   複閱: B-
 * 草稿-線上簽核:
 *   送請簽核: B + O2
 *   順會: A
 *   內會: O1
 * 待處理-主辦:
 *   送請簽核: B + O2 (T$04 ??)
 *   退回分辦人員: H
 *   退回總收: I
 *   順會: M
 *   送總發文: G
 *   內會: O1
 *   複閱: B- + O2
 *   歸檔: L
 *   送單位發文: E
 *   送登記桌銷號: H
 *   送銷號: C
 * 待處理-續辦:
 *   送請簽核: O2 + B
 * 待處理-續辦待確認:
 *   續辦退回承辦人: D
 * 待處理-主辦待分辦:
 *   分辦: O3, 分文: P5, 改分: A, 退文: I
 * 待處理-受會:
 *   送請簽核: B + O2
 *   退回: D
 *   順會: M
 *   內會: O1
 * 待處理-會辦待分辦:
 *   跳過: (空)
 *   分辦: O3
 *   退回: D
 * 待處理-分會:
 *   送請簽核: O2
 *   會畢退回: D
 * 待處理-分會待核示:
 *   送請簽核: O2
 *   退會: D
 * 待處理-分會待分辦:
 *   分辦: O3
 *   退回: D
 * 待處理-待校對/待繕印/待發文/待單位發文
 * 待處理-待點收: not yet!
 * 待處理-待轉為紙本: not yet!
 * 待處理-待改分銷號: not yet!
 * 待處理-已核示: n/a
 * 已辦畢-續案未歸檔: not yet!
 * 已辦畢-結案未歸檔: not yet!
 * 待處理-主辦-併案之母文: not yet!
 * 待處理-待銷號: not yet!
 * 會核中-主辦: (無法傳送, No Rules!)
 * 通知-回閱: 確認: (空)
 * 通知-稽催: (無法傳送, No Rules!)
 *
 * NOTE: 'E'/'E1'/'E2'/'E3'可指定應列出的角色代碼(RoleId)
 */

var dump_dnd_log = true;
var _lastDragObj = null;

var _m = Math;

// 已排序的流程項目...
var _groupList = null;

(function($){
	// 2013.12
	if (!theSSO.menuRuleAOL) {
		theSSO.menuRuleAOL = [];
		theSSO.menuRulePDoc = []; // 2016.6
	}
	
	if (typeof theSSO.flowBuilder === 'undefined') {
		theSSO.flowBuilder = null;
	}
		
	/*function clearLog() {
		if (!dump_dnd_log) return;
		
		var $logCtxt = $('#log-panel .log');
		if ($logCtxt.length)
			$logCtxt.html('');
	}*/
	
	/*function writeLog(sLog) {
		if (!dump_dnd_log) return;
		
		var $logCtxt = $('#log-panel .log');
		if ($logCtxt.length) {
			var $log = $('<div>' + sLog + '</div>').appendTo($logCtxt);
			
			var panel = $('#log-panel')[0];
			if (!!panel) {
				panel.scrollTop = panel.scrollHeight - panel.clientHeight;
			}
		}
	}*/
		
	function _addFinalTarget($parent, option)
	{
		var title = '';
		if (((typeof option.toUserName) != 'undefined') && option.toUserName.length) {
			title = option.toUserName;
		}
		else if (((typeof option.toRoleName) != 'undefined') && option.toRoleName.length) {
			if (typeof option.present !== 'undefined' && option.present.length) {
				if (option.present=='role') {
					title = '[不指定人員]';
				}
				else if (opton.present=='unit') {
					title = '[不指定單位]';
				}
			}
			else {
				title = option.toRoleName;
			}
		}
		else if (((typeof option.toOUName) != 'undefined') && option.toOUName.length) {
			title = option.toOUName;
		}
		else {
			title = option.txName;
		}
		
		//var $item = $('<li>' + title + '</li>').appendTo($parent);
		$('<li>' + title + '</li>').appendTo($parent);
	}
	
	function _addOptions($parent, options)
	{
		function _getOptionTitle(option)
		{
			if ((typeof (option.toUserId) != 'undefined') && option.toUserId.length)
			{
				return option.toUserName;
			}
			else if ((typeof (option.toRoleId) != 'undefined') && option.toRoleId.length)
			{
				if (option.toOUId.length > sso_const.FIRSTCLASS_UNITNO_LEN) {
					return option.toOUName + '-' + option.toRoleName;
				}
				return option.toRoleName;
			}
			else if ((typeof (option.toOUId) != 'undefined') && option.toOUId.length) {
				return option.toOUName;
			}
		}
		
		var $ul = $('<ul></ul>');
		for(var i=0; i<options.length; i++)
		{
			var option = options[i];
			var invalid = false;
			if (option.finalTarget===true) {
				_addFinalTarget($ul, option);
			}
			else {
				if (!option.finalTarget) {
					if ((typeof option.options === 'undefined') || (option.options.length===0)) {
						theLogger.debug('-ERR- [' + _getOptionTitle(option) + '] 非finalTarget 且 options 不存在, 不加入清單!');
						invalid = true;
					}
				}
				var title = _getOptionTitle(option) ;
				var $item = $('<li>' + title + '</li>');
				if (!!option.options && option.options.length) {
					_addOptions($item, option.options);
				}
				else {
					$item.css({color:'red'});
					theLogger.log('項目:\'' + title + '\'不為finalTarget, 且沒有子項目.');
				}
				$item.appendTo($ul);
			}
		}
		$ul.appendTo($parent);
	}
	
	function _addOption($parent, option, tx)
	{
		var $item, _childs;
		function _getOptionTitle(option)
		{
			if ((typeof (option.toUserId) != 'undefined') && option.toUserId.length)
			{
				return option.toUserName;
			}
			else if ((typeof (option.toRoleId) != 'undefined') && option.toRoleId.length)
			{
				return option.toRoleName;
			}
			else if ((typeof (option.toOUId) != 'undefined') && option.toOUId.length) {
				return option.toOUName;
			}
		}
		
		if (tx) {
			// <li>txName<li>
			$item = $('<li>' + option.txName + '</li>');
			
			_childs = option.options;
			if (!!_childs) { // && _childs.length) {
				_addOptions($item, option.options, false);
			}
			
			$item.appendTo($parent);
		}
		else {
			// <li>title<li>
			$item = $('<li>' + _getOptionTitle(option) + '</li>');
			
			_childs = option.options;
			if (!!_childs) {
				_addOptions($item, option.options, false);
			}
			$item.appendTo($parent);
		}
	}
	
	function _initNextOptions($tree, options, targetElem)
	{
		for(var i=0; i<options.length; i++)
		{
			var option = options[i];
			
			if (option.finalTarget === true) {
				_addFinalTarget($tree, option);
			}
			else {
				_addOption($tree, option, true);
			}
		}
		theLogger.log('tree content=' + $tree[0].innerHTML);
	}
	
	function getStyleProp(elem, prop)
	{
		if(window.getComputedStyle) {
			return window.getComputedStyle(elem, null).getPropertyValue(prop);
		}
		else if(elem.currentStyle) {
			return elem.currentStyle[prop]; //IE
		}
		else {
			return '';
		}
	}
	
	/* 插入新增流程項目
	 * ToDo:
	 *  ...
	 */
	function _insertFlowItem($selectedTargetElem, selectedTransTarget, newTransTarget)
	{
		var col_width = 160; //, row_height = 160;
				
		var groupIndex = -1, group;
		var $flowSets, $flowSetCurrent, flowId;
		var $flowItems, rawItem, groupItem;
		var left_css, left_org, left_new;
		
		var i=0, j=0, found=false;
		for(i=0; i<_groupList.length; i++)
		{
			group = _groupList[i];
			if (group.type=='item') {
				if (selectedTransTarget == group.item) {
					groupIndex = i;
					break;
				}
			}
		}
		
		if (groupIndex>=0)
		{
			// find current flow set:
			$flowSets = $('.flow_canvas div.flow_set');
			$flowSetCurrent = null;
			for(i=0; i<$flowSets.length; i++) {
				flowId = $($flowSets[i]).jqmData('flowid');
				if (flowId=='current') {
					$flowSetCurrent = $($flowSets[i]);
					break;
				}
			}
			
			found = false;
			// 後面的流程項目向右平移
			if (!!$flowSetCurrent)
			{
				j=0;
				$flowItems = $flowSetCurrent.children('div.flow_item');
				for(i=0; i<$flowItems.length; i++)
				{
					$flowItem = $($flowItems[i]);
					rawItem = $flowItem.data('rawItem');
					
					found = false;
					for(j=groupIndex+1; j<_groupList.length; j++)
					{
						group = _groupList[j];
						if (group.type=='item') {
							if (rawItem == group.item) {
								found = true;
								break;
							}
						}
					}
					
					if (found) {
						left_css = getStyleProp($flowItem[0], 'left');
						left_org = parseInt(left_css);
						left_new = left_org + col_width;
						$flowItem.css({left: left_new.toString() + 'px'});
					}
				}
				
				// 移動會辦項目
				var $coworkers = $flowSetCurrent.children('div.flow_cowork');
				for(i=0; i<$coworkers.length; i++)
				{
					$flowItem = $($coworkers[i]);
					groupItem = $flowItem.data('groupItem');
					
					found = false;
					for(j=groupIndex+1; j<_groupList.length; j++)
					{
						group = _groupList[j];
						if (group.type=='coworker') {
							if (groupItem == group) {
								found = true;
								break;
							}
						}
					}
					
					if (found) {
						left_css = getStyleProp($flowItem[0], 'left');
						left_org = parseInt(left_css);
						left_new = left_org + col_width;
						$flowItem.css({left: left_new.toString() + 'px'});
					}
				}
				
				// 插入新增項目至 _groupList
				var newgroup = {
					type: 'item',
					item: newTransTarget
				};
				_groupList.splice(groupIndex+1, 0, newgroup);
				
				// 將新增項目(rawItem)插入 theAOL.flowData
				var flowIndex = -1;
				for(i=0; i<theAOL.flowData.length; i++)
				{
					rawItem = theAOL.flowData[i];
					if (rawItem == selectedTransTarget) {
						flowIndex = i;
						break;
					}
				}
				if (flowIndex>=0) {
					theAOL.flowData.splice(flowIndex+1, 0, newTransTarget);
				}
				
				// 產生Html項目
				var flowBuilder = new FlowBuilder();
				var withLeftArrow = true;
				var $newFlowItem= flowBuilder.createFlowElem(withLeftArrow, groupIndex+1, newTransTarget);
				$newFlowItem.insertAfter($selectedTargetElem);
							
				// 視需要延伸cavas尺寸 (target id='flow_canvas')
				var $canvas = $('#flow_canvas');
				var w_canvas = $canvas.innerWidth();
				var w_needed = _groupList.length * col_width;
				if (w_canvas<w_needed) {
					$canvas.css({width: w_needed.toString()+'px'});
				}
			}
		}
	}
	/* 刪除流程項目
	 * -> 須為未簽核流程
	 */
	function _deleteFlowItem(selectedTargetElem)
	{
		var selectedFlowItem = $(selectedTargetElem).data('rawItem');
		
		var col_width = 160;
		
		var group, $flowItem, $flowItems, rawItem;
		var $flowSets, $flowSetCurrent;
		var found = false;
		var left_css, left_org, left_new;
		
		var i=0, j=0, groupIndex = -1;
		for(i=0; i<_groupList.length; i++)
		{
			group = _groupList[i];
			if (group.type=='item') {
				if (selectedFlowItem == group.item) {
					groupIndex = i;
					break;
				}
			}
		}
		
		if (groupIndex>=0) {
			// find current flow set:
			$flowSets = $('.flow_canvas div.flow_set');
			$flowSetCurrent = null;
			for(i=0; i<$flowSets.length; i++) {
				var flowId = $($flowSets[i]).jqmData('flowid');
				if (flowId=='current') {
					$flowSetCurrent = $($flowSets[i]);
					break;
				}
			}
			
			// 後面的流程項目向左平移
			if (!!$flowSetCurrent) {
				$flowItems = $flowSetCurrent.children('div.flow_item');
				for(i=0; i<$flowItems.length; i++)
				{
					$flowItem = $($flowItems[i]);
					rawItem = $flowItem.data('rawItem');
					
					found = false;
					for(j=groupIndex+1; j<_groupList.length; j++)
					{
						group = _groupList[j];
						if (group.type=='item') {
							if (rawItem == group.item) {
								found = true;
								break;
							}
						}
					}
					
					if (found) {
						left_css = getStyleProp($flowItem[0], 'left');
						left_org = parseInt(left_css);
						left_new = left_org - col_width;
						$flowItem.css({left: left_new.toString() + 'px'});
					}
				}
				
				// 移動會辦項目
				var $coworkers = $flowSetCurrent.children('div.flow_cowork');
				for(i=0; i<$coworkers.length; i++)
				{
					$flowItem = $($coworkers[i]);
					groupItem = $flowItem.data('groupItem');
					
					found = false;
					for(j=groupIndex+1; j<_groupList.length; j++)
					{
						group = _groupList[j];
						if (group.type=='coworker') {
							if (groupItem == group) {
								found = true;
								break;
							}
						}
					}
					
					if (found) {
						left_css = getStyleProp($flowItem[0], 'left');
						left_org = parseInt(left_css);
						left_new = left_org - col_width;
						$flowItem.css({left: left_new.toString() + 'px'});
					}
				}
				
				// 刪除_groupList內項貝
				_groupList.splice(groupIndex, 1);
				
				// 刪除theAOL.flowData(rawItem)項目 
				var flowIndex = -1;
				for(i=0; i<theAOL.flowData.length; i++)
				{
					rawItem = theAOL.flowData[i];
					if (rawItem == selectedFlowItem) {
						flowIndex = i;
						break;
					}
				}
				if (flowIndex>=0) {
					theAOL.flowData.splice(flowIndex, 1);
				}
				
				// 刪除Html項目
				$(selectedTargetElem).remove();
							
				// 視需要延伸cavas尺寸 (target id='flow_canvas')
				var $canvas = $('#flow_canvas');
				var w_canvas = $canvas.innerWidth();
				var w_needed = _groupList.length * col_width;
				if (w_canvas<w_needed) {
					$canvas.css({width: w_needed.toString()+'px'});
				}
			}
		}
	}
	/*
	 * 更新預排流程點項目內容
	 */
	function _modifyFlowItem($selectedTargetElem, modifiedTransTarget)
	{
		var selectedFlowItem = $selectedTargetElem.data('rawItem');
		
		var groupIndex = -1;
		for(var i=0; i<_groupList.length; i++)
		{
			var group = _groupList[i];
			if (group.type=='item') {
				if (selectedFlowItem == group.item) {
					groupIndex = i;
					break;
				}
			}
		}
		
		if (groupIndex<0) {
			theLogger.log('Can\'t find matched group item.');
			return;
		}
		
		// copy field value from modifiedTransTarget object
		if (!!selectedFlowItem && !!modifiedTransTarget) {
			selectedFlowItem = $.extend(true, {}, modifiedTarget);
			/*selectedFlowItem.Unit = modifiedTransTarget.Unit,
			selectedFlowItem.Name = modifiedTransTarget.Name,
			selectedFlowItem.OUId = modifiedTransTarget.OUId,
			selectedFlowItem.RoleId = modifiedTransTarget.RoleId,
			selectedFlowItem.UserId = modifiedTransTarget.UserId,
			selectedFlowItem.Portrait = modifiedTransTarget.Portrait,
			selectedFlowItem.MsgId = modifiedTransTarget.MsgId,
			selectedFlowItem.SignTime = modifiedTransTarget.SignTime,
			selectedFlowItem.Comment = modifiedTransTarget.Comment,
			selectedFlowItem.Status = modifiedTransTarget.Status,
			selectedFlowItem.InCharge = modifiedTransTarget.InCharge,
			selectedFlowItem.Folder = modifiedTransTarget.Folder,
			selectedFlowItem.SubFolder = modifiedTransTarget.SubFolder;
			if (modifiedTransTarget.Limitation!=null) {
				selectedFlowItem.Limitation.td_LMT = modifiedTransTarget.Limitation.td_LMT;
				selectedFlowItem.Limitation.Consumed = modifiedTransTarget.Limitation.Consumed;
			}
			selectedFlowItem.TxName = modifiedTransTarget.TxName;*/
		}
		
		// 異動 DOM object content
		var $newFlowElem = flowBuilde.createFlowElem(true, groupIndex, selectedFlowItem);
		$selectedTargetElem.replaceWith($newFlowElem);
	}
	/*
	 * newTarget: array of option index
	 */
	function _getNewTarget(newTargetIndex, _nextOptions)
	{
		var len = newTargetIndex.length;
		var array = _nextOptions;
		for(var i=0; i<len; i++)
		{
			var option = array[newTargetIndex[i]];
			if (typeof option === 'undefined') {
				theLogger.warn('option == undefined');
				return null;
			}
			else if (typeof option.finalTarget==='undefined') {
				theLogger.log('option.finalTarget == undefined');
				return null;
			}
			
			if (option.finalTarget===true) {
				var sTarget = 'TxName=' + _nextOptions[newTargetIndex[0]].txName + // 第一個index決定TxName
							  ', ToOUName=' + option.toOUName + ', ToRoleName=' + option.toRoleName + ', ToUserName=' + option.toUserName;
							  
				/*{ Unit: '主任祕書室', Name: '主祕 王栢琼',
					OUId: '95', RoleId: 'OD06', UserId: '00321',
					Portrait: 'IMAGE/WorkFlow/portrait_boss.png',
					MsgId: '', SignTime: '', Comment: '', Status: '0',
					InCharge: false, Folder: '待處理', SubFolder: '待核示',
					Limitation : null, TxName: '送請簽核' },
				*/
				var target = {
					Unit: option.toOUName,
					Name: option.toRoleName + ' ' + option.toUserName,
					OUId: option.toOUId,
					RoleId: option.toRoleId,
					RoleName: option.toRoleName,
					UserId: option.toUserId,
					UserName: option.toUserName,
					Portrait: 'IMAGE/WorkFlow/portrait_boss.png',
					MsgId: '',
					SignTime: '',
					Comment: '',
					Status: '0',
					InCharge: false,
					Folder: '',
					SubFolder: '',
					Limitation: null,
					TxName: _nextOptions[newTargetIndex[0]].txName,
				};
				return target;
			}
			else {
				array = option.options;
			}
		}
		return null;
	}
	/*
	 * 由'異動別'及'傳送對象' 找出 NEXT 清單中的下一流程索引值!
	 *
	 * 2013.2.19 - 目前先實作完全match項目!
	 * match_level: -1: none, 0: txName, 1: Unit, 2: RoleId, 3: UserId
	 * match_all: true | false
	 */
	function _getNextIndexs(target, nextOptions, returnMatchLevel)
	{
		function _getFirstFinalTargetForTxName(nextOptions, txNameIndex) {
			var firstItemIndexs = [];
			var theOption, options;
			if (nextOptions.length && nextOptions.lenght>txNameIndex) { // 2019.4.17 - Eric, typo fix.
				firstItemIndexs.push(txNameIndex);
				theOption = nextOptions[txNameIndex];
				options = theOption.options;
					
				while(theOption.finalTarget!==true && options.length) {
					firstItemIndexs.push(0);
					
					theOption = options[0];
					options = theOption.options;	
				}
			}
			return firstItemIndexs;
		}
		
		if (typeof returnMatchLevel=='undefined') returnMatchLevel=false;
		
		var matchItems = [];
		var array = nextOptions;
		var cntLv1 = array.length;
		var fullMatch = false; // 2015.10 - 1040867
		var withNext = (typeof target.ToOU!=='undefined' && target.ToOU.length) ? true : false; // 2015.10 - 檢核next設定是否相符.
		var findFirstTx = ((typeof target.OUId==='undefined' || target.OUId.length===0) &&
											 ((typeof target.RoleId==='undefined') || target.RoleId.length===0) &&
											 ((typeof target.UserId==='undefined') || target.UserId.length===0)) ? true : false;
		var matchNext = false;
		var i=0, j=0, k=0;
		var itemFullMatch = false;
		//var matchUnit=false, matchRole=false;
		for(i=0; i<cntLv1; i++) {
			var opt_lv1 = array[i];
			matchNext = true;
			if (withNext) {
				matchNext = (target.ToOU===opt_lv1.next) ? true : false;
			}
			
			if (opt_lv1.txName===target.TxName && matchNext)
			{
				if (target.OUId==='') {
					fullMatch = true;
					itemFullMatch = true;
				}
				else {
					itemFullMatch = false;
				}
					
				if (opt_lv1.finalTarget===true) {
					matchItems.push({match_level:0, indexs: [i], match_all: itemFullMatch, finalTarget:true});
					break;
				}
				else {
					if (returnMatchLevel) {
						matchItems.push({match_level:0, indexs: [i], match_all: itemFullMatch, finalTarget:false});
					}
					
					var cntLv2 = opt_lv1.options.length;
					var opts_lv2 = opt_lv1.options;
					// 依下列優先序找尋:
					//   1. 單位/角色/帳號一致者
					//   2. 單位/角色 一致者
					//   3. 單位一致者
					
					/*Target object layout:
					 { Unit: '主任祕書室', Name: '主祕 王栢琼',
					   OUId: '95', RoleId: 'OD06', UserId: '00321',
					   Portrait: 'IMAGE/WorkFlow/portrait_boss.png',
					   MsgId: '', SignTime: '', Comment: '', Status: '0',
					   InCharge: false, Folder: '待處理', SubFolder: '待核示',
					   Limitation : null, TxName: '送請簽核' } */
					for(j=0; j<cntLv2; j++) {
						var opt_lv2 = opts_lv2[j];
						if (opt_lv2.finalTarget===true)
						{
							if (findFirstTx) {
								matchItems.push({match_level:3, match_all:true, indexs: [i, j], finalTarget:true});
								fullMatch = true;
							}
							else if (opt_lv2.toOUId==target.OUId) {
								if (opt_lv2.toRoleId==target.RoleId) {
									if ((typeof target.UserId !== 'undefined') && target.UserId.length) {
										if (opt_lv2.toUserId==target.UserId) {
											matchItems.push({match_level:3, match_all:true, indexs: [i, j], finalTarget:true});
											fullMatch = true;
										}
										else {
											matchItems.push({match_level:2, match_all:false, indexs: [i, j], finalTarget:true});
										}
									}
									else {
										matchItems.push({match_level:2, match_all:false, indexs: [i, j], finalTarget:true});
									}
								}
								else {
									matchItems.push({match_level:1, match_all:false, indexs: [i, j], finalTarget:true});
								}
							}
						}
						else {
							var opts_lv3 = opt_lv2.options;
							var cntLv3 = opts_lv3.length;
							for(k=0; k<cntLv3; k++) {
								var opt_lv3 = opts_lv3[k];
								if (opt_lv3.finalTarget===true) {
									if (findFirstTx) {
										matchItems.push({match_level:3, match_all:true, indexs: [i, j, k], finalTarget:true});
										fullMatch = true;
										break;
									}
									else if (opt_lv3.toOUId==target.OUId) {
										if (opt_lv3.toRoleId==target.RoleId) {
											if ((typeof target.UserId !== 'undefined') && target.UserId.length) { // 2015.10
												if (opt_lv3.toUserId==target.UserId) {
													matchItems.push({match_level:3, match_all:true, indexs: [i, j, k], finalTarget:true});
													fullMatch = true;
												}
												else {
													matchItems.push({match_level:2, match_all:false, indexs: [i, j, k], finalTarget:true});
												}
											}
											else {
												matchItems.push({match_level:2, match_all:false, indexs: [i, j, k], finalTarget:true});
											}
										}
										else {
											matchItems.push({match_level:1, match_all:false, indexs: [i, j, k], finalTarget:true});
										}
									}
								}
								else {
									var opts_lv4 = opt_lv3.options;
									var cntLv4 = opts_lv4.length;
									for(var l=0; l<cntLv4; l++) {
										var opt_lv4 = opts_lv4[l];
										if (opt_lv4.finalTarget===true) {
											if (opt_lv4.toOUId==target.OUId) {
												theLogger.log('same unit options found...');
												
											}
											
											if (findFirstTx) {
												matchItems.push({match_level:3, match_all:true, indexs: [i, j, k, l], finalTarget:true});
												fullMatch = true;
												break;
											}
											else if (opt_lv4.toOUId==target.OUId) {
												if (opt_lv4.toRoleId==target.RoleId) {
													if ((typeof target.UserId !== 'undefined') && target.UserId.length) { // 2015.10.20 - bug-fix, 1040867
														if (opt_lv4.toUserId==target.UserId) {
															matchItems.push({match_level:3, match_all:true, indexs: [i, j, k, l], finalTarget:true});
															// match_all -> break search...
															fullMatch = true;
														}
														else {
															matchItems.push({match_level:2, match_all:false, indexs: [i, j, k, l], finalTarget:true});
														}
													}
													else {
														matchItems.push({match_level:2, match_all:false, indexs: [i, j, k, l], finalTarget:true});
													}
												}
												else {
													matchItems.push({match_level:1, match_all:false, indexs: [i, j, k, l], finalTarget:true});
												}
											}
										}
										else {
											alert('Oooopppssss... wrong options Data...');
										}
										
										if (fullMatch) {
											break;
										}
									}
								}
								if (fullMatch) {
									break;
								}
							}
						}
					}
				}
				if (fullMatch) {
					break;
				}
			}
			if (fullMatch) {
				break;
			}
		}
		
		if (matchItems.length>0) {
			// 2015.5 - 篩選最接近者
			if (matchItems.length>1) {
				theLogger.log('符合項目數: (含部份符合!)' + matchItems.length);
				var cnt = matchItems.length;
				for(var lvl=3; lvl>0; lvl--) {
					for (j=0; j<cnt; j++) {
						var item = matchItems[j];
						if (item.match_level==lvl) {
							if (returnMatchLevel) {
								return item;
							}
							else {
								return item.indexs;
							}
						}
					}
				}
			}
			if (returnMatchLevel) {
				if (matchItems[0].finalTarget!==true && matchItems[0].indexs.length==1) {
					var fullIndexs = _getFirstFinalTargetForTxName(nextOptions, matchItems[0].indexs);
					matchItems[0].indexs = fullIndexs;
				}
				
				return matchItems[0];
			}
			else {
				return matchItems[0].indexs;
			}
		}
		else {
			if (returnMatchLevel) {
				return { indexs:[], match_level: -1, match_all: false };
			}
			else {
				return [];
			}
		}
	}
	
	function _getLevelOptions(indexs, nextOptions)
	{
		function _getOptionTitle(option)
		{
			if ((typeof (option.toUserId) != 'undefined') && option.toUserId.length)
			{
				return option.toUserName;
			}
			else if ((typeof (option.toRoleId) != 'undefined') && option.toRoleId.length)
			{
				return option.toRoleName;
			}
			else if ((typeof (option.toOUId) != 'undefined') && option.toOUId.length) {
				return option.toOUName;
			}
		}
		
		if (indexs.lenght<=1) {
			theLogger.warn('-W- _getLevelOptions() indexs.lenght <= 1.');
			return [];
		}
		
		var opt, opt_lv1, opt_lv2, opts_lv2, opts_lv3;
		var cntLv2, cntLv3, i=0, j=0;
		var array_opt, display;
		if (nextOptions.length>indexs[0]) {
			opt_lv1 = nextOptions[indexs[0]];
			if (indexs.length===2) {
				opts_lv2 = opt_lv1.options;
				cntLv2 = opts_lv2.length;
				array_opt = [];
				for(i=0; i<cntLv2; i++) {
					opt = opts_lv2[i];
					if (opt.finalTarget===true) {
						display = opt.toUserName.length ? opt.toUserName : (opt.toRoleName.length ? opt.toRoleName : opt.toOUName);
						array_opt.push(display);
					}
					else {
						array_opt.push(_getOptionTitle(opt));
					}
				}
				return array_opt;
			}
			else if(indexs.length==3)
			{
				opts_lv2 = opt_lv1.options;
				cntLv2 = opts_lv2.length;
				
				if (indexs[1]<cntLv2)
				{
					opt_lv2 = opts_lv2[indexs[1]];
					if (opt_lv2.finalTarget===false)
					{
						opts_lv3 = opt_lv2.options;
						cntLv3 = opts_lv3.length;
						
						array_opt = [];
						for(i=0; i<cntLv3; i++) {
							opt = opts_lv3[i];
							if (opt.finalTarget===true) {
								display = opt.toUserName.length ? opt.toUserName : (opt.toRoleName.length ? opt.toRoleName : opt.toOUName);
								array_opt.push(display);
							}
							else {
								array_opt.push(_getOptionTitle(opt));
							}
						}
						return array_opt;
					}
				}
			}
			else if(indexs.length==4) {
				opts_lv2 = opt_lv1.options;
				cntLv2 = opts_lv2.length;
				if (indexs[1]<cntLv2)
				{
					opt_lv2 = opts_lv2[indexs[1]];
					if (opt_lv2.finalTarget===false)
					{
						opts_lv3 = opt_lv2.options;
						cntLv3 = opts_lv3.length;
						if (indexs[2]<cntLv3)
						{
							var opt_lv3 = opts_lv3[indexs[2]];
							if (opt_lv3.finalTarget===false)
							{
								var opts_lv4= opt_lv3.options;
								var cntLv4 = opts_lv4.length;
								
								array_opt = [];
								for(i=0; i<cntLv4; i++)
								{
									opt = opts_lv4[i];
									if (opt.finalTarget===true) {
										display = opt.toUserName.length ? opt.toUserName : (opt.toRoleName.length ? opt.toRoleName : opt.toOUName);
										array_opt.push(display);
									}
									else {
										array_opt.push(_getOptionTitle(opt));
									}
								}
								return array_opt;
							}
						}
					}
				}
			}
		}
		else {
			theLogger.warn('invalid lv1 index:' + indexs[0] + 'nextOptions count=' + nextOptions.length);
			return [];
		}
		
		return [];
	}
	
	
	// 2013.11 - 將流程操作相關函式加入WorkFlowUtil物件
	if (!window.WorkFlowUtil) {
		window.WorkFlowUtil = {};
	}
	
	if (WorkFlowUtil) {
		WorkFlowUtil.initNextOptions = _initNextOptions;
		WorkFlowUtil.insertFlowItem = _insertFlowItem;
		WorkFlowUtil.deleteFlowItem = _deleteFlowItem;
		WorkFlowUtil.modifyFlowItem = _modifyFlowItem;
		WorkFlowUtil.getNewTarget = _getNewTarget;
		WorkFlowUtil.getNextIndexs = _getNextIndexs;
		WorkFlowUtil.getLevelOptions = _getLevelOptions;
	}

})(jQuery);

/*
 取得MenuRuleAOL
*/
function MenuRuleAOL(artifact, orgNo) {
	var ruleAOL = [];
	var cTargets = [];
	var targetOrgNo = orgNo;
	var _ruleEnvSetting = {}; // MeneRuleAOL相關的環境變數設定
	
	if (typeof window.MPRuleE_Const === 'undefined') {
		window.MPRuleE_Const = {
			MENU_SPECIAL_CHECK_LIST: 'XACDEFJ',
			DO_ADVANCED_CHECK_1: 'O',
			DO_ADVANCED_CHECK_2: 'C',
			MENU_ADV_CHECK_LIST: '123456789B0GHIKSLR', // 2017.8.28 - 1060512, 新增'L'(簽核意見)	//1120426	Leslie[1120004]	新增'R'(TX_REASON)
		};
	}
	
	function _getNextRoleList(optionNode) {
		var $next = $(optionNode).find('NEXT');
		var sVal = $next.attr('ROLE');
		var roleList = null;
		if (sVal) {
			roleList = sVal.split(";");
		}
		return roleList;
	}
	
	//var orgNo = window.theSSO.User.PlayRoles[0].orgNo;
	function _loadOption(optionNode) {
		function _setupSpecialChecks(option) {
			var sSpecialCheck = option.specialCheck;
			var enableAdvCheck = (sSpecialCheck.indexOf('O')!==-1 || sSpecialCheck.indexOf('C')!==-1) ? true : false;
			var i=0, checkItem = '';
			option._specialCheck = '';
			option._advancedCheck = '';
			for(i=0; i<sSpecialCheck.length; i++) {
				checkItem = sSpecialCheck.substring(i, i+1);
				
				if (checkItem=='O' || checkItem=='C') continue;
				
				if (MPRuleE_Const.MENU_SPECIAL_CHECK_LIST.indexOf(checkItem)!==-1) {
					option._specialCheck += checkItem;
					continue;
				}
				
				if (enableAdvCheck && MPRuleE_Const.MENU_ADV_CHECK_LIST.indexOf(checkItem)!=-1) {
					option._advancedCheck += checkItem;
				}
			}
		}
		
		if (optionNode.nodeName==='OPTION') {
			var option = {};
			option.docState = SSOUtil.xml_getChildNodeValue(optionNode, 'DOC_STATE');
			option.txName = SSOUtil.xml_getChildNodeValue(optionNode, 'TX_NAME');
			if (option.txName=='分辦') {
				theLogger.log('-I- process txName:' + option.txName);
			}
			option.display = SSOUtil.xml_getChildNodeValue(optionNode, 'DISPLAY');
			option.specialCheck = SSOUtil.xml_getChildNodeValue(optionNode, 'SPECIAL_CHECK');
			if (option.specialCheck.length) {
				_setupSpecialChecks(option);
			}
			else {
				option._specialCheck = '';
				option._advancedCheck = '';
			}
			
			if (typeof option._specialCheck !=='string' || typeof option._advancedCheck!=='string') {
				alert(option.txName + ': _specialcheck type=' + (typeof option._specialCheck) + ', _advancedChek=' + (typeof option._advancedCheck));
			}
			
			option.next = SSOUtil.xml_getChildNodeValue(optionNode, 'NEXT');
			
			/* 部份項目可自行指定角色
			// <NEXT Role="xx;xx;xxx;">
			*/
			option.nextRoleList = [];
			if (option.txName.indexOf('退回承辦單位')===0) {
				theLogger.debug('txName contains \'退回承辦單位\'....');
			}
			var roleList = _getNextRoleList(optionNode);
			if (roleList!==null && roleList.length>0) {
				option.nextRoleList = roleList;
			}
			
			option.reject = SSOUtil.xml_getChildNodeValue(optionNode, 'REJECT');
			option.ouLen = SSOUtil.xml_getChildNodeValue(optionNode, 'OU_LEN');
			option.optLvl = SSOUtil.xml_getChildNodeValue(optionNode, 'OPT_LVL');
			option.ownOUId = SSOUtil.xml_getChildNodeValue(optionNode, 'OWN_OU_ID');
			option.equalCheck = SSOUtil.xml_getChildNodeValue(optionNode, 'EQUAL_CHECK');
			
			option.txWebPage = SSOUtil.xml_getChildNodeValue(optionNode, 'TX_WEBPAGE');
			
			option.nFolder = SSOUtil.xml_getChildNodeValue(optionNode, 'N_FOLDER');
			option.nSubfolder = SSOUtil.xml_getChildNodeValue(optionNode, 'N_SUBFOLDER');
			return option;
		}
		return null;
	}
	
	function _loadRule(ruleNode) {
		var i=0, option;
		if (ruleNode.nodeName==='EDOL_UI_RULE')
		{
			var rule = {}, $txListNode, $options;
			rule.folder = SSOUtil.xml_getChildNodeValue(ruleNode, 'FOLDER');
			rule.subfolder = SSOUtil.xml_getChildNodeValue(ruleNode, 'SUBFOLDER');
			rule.webPage = SSOUtil.xml_getChildNodeValue(ruleNode, 'WEBPAGE');
			rule.readOnly = SSOUtil.xml_getChildNodeValue(ruleNode, 'READ_ONLY');
			rule.metaDataM = SSOUtil.xml_getChildNodeValue(ruleNode, 'METADATA_M');
			rule.buttonF = SSOUtil.xml_getChildNodeValue(ruleNode, 'BUTTON_F');
			rule.menuRuleItem = true; // 2016.9.29 - 記錄是否為MPRUlE(E)_$ORG_NO$.XML內的項目...
			
			rule.txList = [];
			$txListNode = $(ruleNode).find('TX_LIST');
			if ($txListNode.length) {
				$options = $txListNode.find('OPTION');
				for (i=0; i<$options.length; i++)
				{
					option = _loadOption($options[i]);
					if (!!option) {
						rule.txList.push(option);
					}
				}
			}
			
			if (rule.folder==='待處理' && rule.subfolder==='主辦') {
				// dump content
				theLogger.debug('MenuRule for \"' + rule.folder + '/' + rule.subfolder + ':');
				for(i=0; i<rule.txList.length; i++)
				{
					option = rule.txList[i];
					theLogger.debug('\t#' + (i+1) + ' TxName=' + option.txName + ', Next=' + option.next + ', SpecialCheck=' + option.specialCheck);
				}
			}
			return rule;
		}
		return null;
	}
	
	//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
	function _getUnitNode(orgNode, unitNo) {
		if (orgNode && unitNo && unitNo.length)
		{
			if (orgNode) {
				var $orgNode = $(orgNode);
				var xpath = 'Unit[UnitCode="' + unitNo + '"]';
				var unitNode = ($orgNode.find(xpath))[0];
				if (unitNode) {
					return unitNode;
				}	
				else {
					theLogger.warn('-W- _getUnitNode() 找不到UnitNo=[' + unitNo + ']的 <Unit> node.');
				}
			}
		}
		else {
			theLogger.error('-ERR- _getUnitNode() invalid orgNode/unitNo');
		}
		return null;
	}
	
	//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
	// function _loadCTarget(cTargetNode) { // for EDoc
		// function _loadCTargetOption(cOptionNode) {
	function _loadCTarget(cTargetNode, _orgNode, _nextType) { // for EDoc
		function _loadCTargetOption(cOptionNode, theOrgNode, fSetupTitle) {
			/* <CTarget NEXTTYPE='X'>/
			 * <OPTION title="xxx" finalTarget="true"> [title/finalTarget皆為optional]
			 *   child nodes: OU_ID / OU_NAME / ROLE_ID / ROLE_NAME / USER_ID / USER_NAME
			*/
			var cOption = {};
			var sValue = SSOUtil.xml_getAttrValue(cOptionNode, 'title');
			cOption._title = '';
			if (!!sValue && sValue.length)
				cOption._title = sValue;
			
			cOption._finalTarget = true;
			sValue = SSOUtil.xml_getAttrValue(cOptionNode, 'finalTarget');
			if (!!sValue && sValue.length) {
				sValue = sValue.toLowerCase();
				if (sValue==='n' || sValue==='false' || sValue==='0') {
					cOption._finalTarget = false;
				}
			}
			
			cOption.ouId = SSOUtil.xml_getChildNodeValue(cOptionNode, 'OU_ID');
			cOption.ouName = SSOUtil.xml_getChildNodeValue(cOptionNode, 'OU_NAME');
			cOption.roleId = SSOUtil.xml_getChildNodeValue(cOptionNode, 'ROLE_ID');
			cOption.roleName = SSOUtil.xml_getChildNodeValue(cOptionNode, 'ROLE_NAME');
			cOption.userId = SSOUtil.xml_getChildNodeValue(cOptionNode, 'USER_ID');
			cOption.userName = SSOUtil.xml_getChildNodeValue(cOptionNode, 'USER_NAME');
			
			//1130830	Leslie[1130531]	[北榮]增修MENUTO_DETAIL選單可依設定增加顯示隸屬單位
			if(_ruleEnvSetting.CTargetTitleWithDept && cOption._title != '')
				cOption._title = `${cOption.ouName}-${cOption._title}`;
			
						
			//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
			if (typeof theOrgNode!=='undefined' && theOrgNode!==null) {
				var unitNode=null, userInfo=null;
				var unitName='', roleName='';
				if (typeof cOption.ouId=='string' && cOption.ouId.length &&
			    	(typeof cOption.ouName!=='string' || cOption.ouName.length===0)) {
					unitNode = _getUnitNode(theOrgNode, cOption.ouId);
					if (unitNode!==null) {
						unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName')
						cOption.ouName = unitName;
					}
					else { // 2018.1.17 - NCKU107132
						theLogger.log('-ERR- _loadCTargetOption[EDoc]@RD-DlgProcessSetting.js invalid OU_ID=' + cOption.ouId);
						return null;
					}
				}

				if (typeof cOption.roleId=='string' && cOption.roleId.length &&
			    	(typeof cOption.roleName!=='string' || cOption.roleName.length===0)) {
					if (typeof unitName=='string' && unitName.length) {
						roleName = SSOUtil.getOrgRoleName(theOrgNode, cOption.ouId, cOption.roleId);
						cOption.roleName = roleName;
					}

					// 2018.1.17 - NCKU107132
					if (typeof roleName!='string' || roleName.length===0) { 
						theLogger.log('-ERR- _loadCTargetOption[EDoc]@RD-DlgProcessSetting.js invalid ROLD_ID=' + cOption.roleId);
						return null;
					}
				}

				if (typeof cOption.userId=='string' && cOption.userId.length &&
			    	(typeof cOption.userName!=='string' || cOption.userName.length===0)) {
					if (typeof roleName=='string' && roleName.length) {
						userInfo = SSOUtil.getOrgUserInfo(theOrgNode, cOption.ouId, cOption.roleId, cOption.userId);
						if (!!userInfo) {
							cOption.userName = userInfo.UserName;
						}
						else { // 2018.1.17 - NCKU107132
							theLogger.log('-ERR- _loadCTargetOption[EDoc]@RD-DlgProcessSetting.js invalid UserData' +
										  'OU_ID=' + cOption.ouId, ', ROLE_ID=' + cOption.roleId + ', UserId=' + cOption.userId);
							return null;
						}
					}
				}

				if (cOption._title.length===0 && fSetupTitle) {
					cOption._title = unitName + '-' + roleName + '-' + userInfo.UserName;
				}
			}
			
			cOption.options = [];
			$subOptionNodes = $(cOptionNode).children('OPTION');
			if ($subOptionNodes.length) {
				for(i=0; i<$subOptionNodes.length; i++) {
					subOptionNode = $subOptionNodes[i];
					if (!!subOptionNode) {
						cSubOption = _loadCTargetOption(subOptionNode);
						if (!!cSubOption) {
							cOption.options.push(cSubOption);
						}
					}
				}
			}
			
			return cOption;
		}
		
		//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
		var	fSetupTitle = false;
		
		if (cTargetNode.nodeName==='CTarget')
		{
			var cTarget = {
				option : []
			};
			
			var $cOptionNodes;
			
						
			//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
			// cTarget._nextType = SSOUtil.xml_getAttrValue(cTargetNode, 'NEXTTYPE');
			if (typeof _nextType==='string' && _nextType.length) {
				cTarget._nextType = _nextType;
				fSetupTitle = true;
			}
			else {
				cTarget._nextType = SSOUtil.xml_getAttrValue(cTargetNode, 'NEXTTYPE');
			}
			$cOptionNodes = $(cTargetNode).find('OPTION');
			for (i=0; i<$cOptionNodes.length; i++) {
				//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
				// option = _loadCTargetOption($cOptionNodes[i]);
				option = _loadCTargetOption($cOptionNodes[i], _orgNode, fSetupTitle);
				if (!!option) {
					cTarget.option.push(option);
				}
			}
			
			// 沒有對象, 回傳null
			if (cTarget.option.length===0) {
				theLogger.warn('-W- CTarget NEXTTYPE=' + cTarget._nextType + ' 沒有任何Option, 排除之!');
				return null;
			}
			return cTarget;
		}
		return null;
	}
	
	function _setupEnvSetting() {
		var strEnvSet = '';
		var envSet = window.theSSO.User.EnvSettings;
		_ruleEnvSetting.draftCancelByDesk = envSet.get('DraftCancelByDesk');
		_ruleEnvSetting.mainCancelSubfolder = envSet.get('MainCancelSubfolder');
		_ruleEnvSetting.checkMeetDateBTypeNo = envSet.get('OD_CHECKMEETDATE_BTYPENO');
		
		strEnvSet = envSet.get('OD_SHOW_UNIT_ROLE');
		// 2015.5 - 處理未設定或設定值為空的情況!
		if (!!strEnvSet && strEnvSet.length) {
			var roleListShowUnit = strEnvSet.split('|');
			if (roleListShowUnit.length>=2) {
				_ruleEnvSetting.showUnitRoleId = roleListShowUnit[1]; // 第二個項目為線上簽核用的角色代碼! (第一個項目為紙本使用)
			}
			else {
				_ruleEnvSetting.showUnitRoleId = '';
			}	
		}
		
		//1051208 Eric Peng 線上簽核公文支援承辦人自行決行
		//1051206 David 新增紀錄OD_OD99_CAN_APP第三個項目
		_ruleEnvSetting.OD99CanAppFolder = '';
		_ruleEnvSetting.OD99CanApproveBTypeNo = '';
		strEnvSet = envSet.get('OD_OD99_CAN_APP');
		if(!!strEnvSet && strEnvSet.length) {
			var canAppSetList = strEnvSet.split('|'); // 'Y|52|待處理主辦'
			if (canAppSetList.length>=2) {
				_ruleEnvSetting.OD99CanApproveBTypeNo = canAppSetList[1]; // 取第二個項目
				if (canAppSetList.length>=3)
					_ruleEnvSetting.OD99CanAppFolder = canAppSetList[2];// 取第三個項目
			}
			else {
				theLogger.error('Error! 無效的環境變數[OD_OD99_CAN_APP]設定值:"' + strEnvSet + '"');
			}	
		}
		
		// 預設值為true, 若EnvSet[AOL_SHOW_OCCUPANT]='N', 則設為false
		_ruleEnvSetting.showOccupant = true;
		strEnvSet = envSet.get('AOL_SHOW_OCCUPANT');
		if (!!strEnvSet && (strEnvSet==='N' || strEnvSet==='n' || strEnvSet==='0')) {
			_ruleEnvSetting.showOccupant = false;
		}
			
		_ruleEnvSetting.coworkTxNameBeforeApprove = envSet.get('AOL_COWORK_TXNAME_BEFORE_APPROVE');
		_ruleEnvSetting.coworkTxNameAfterApprove = envSet.get('AOL_COWORK_TXNAME_AFTER_APPROVE');
		
		//1130305	Leslie[彙整表-序20]	領務局驗收允諾需求，簡化線上簽核右鍵分辦選單(實作線上簽核的TO_OU='K')
		_ruleEnvSetting.underTakerRoles = [];
		strEnvSet = envSet.get('MP_RULE_UNDERTAKER_ROLEID');	// 可承辦公文人員角色
		if (!!strEnvSet && strEnvSet.length) {
			_ruleEnvSetting.underTakerRoles = strEnvSet.split(';');
		}
		else {
			_ruleEnvSetting.underTakerRoles.push(window.sso_const.ROLENO_OPERATOR);
		}
		
		strEnvSet = envSet.get('MP_RULE_K_CLASS_WITH_SUBUNIT');
		if (!!strEnvSet && strEnvSet.length && (strEnvSet==='N' || strEnvSet=='n')) {
			_ruleEnvSetting.KClassWithSubUnit = false;
		}
		else {
			_ruleEnvSetting.KClassWithSubUnit = true;
		}
		
		//1130830	Leslie[1130531]	[北榮]增修MENUTO_DETAIL選單可依設定增加顯示隸屬單位
		strEnvSet = envSet.get('MP_CTARGET_TITLE_WITH_DEPT');
		if (!!strEnvSet && strEnvSet.length && (strEnvSet==='Y' || strEnvSet=='y')) {
			_ruleEnvSetting.CTargetTitleWithDept = true;
		}
		else {
			_ruleEnvSetting.CTargetTitleWithDept = false;
		}
	}
	
	function _init() {
		var sMenuRuleAOL = window.localStorage['menuRuleAOL_' + targetOrgNo];
		if (!sMenuRuleAOL || (sMenuRuleAOL.length===0)) {
			//var menuRuleFilename = 'MPRuleE_' + targetOrgNo + '.xml';
			SSOUtil.getMenuRule(artifact, targetOrgNo, 'E'); // 2014.9 - 取得後會存在localStorage內
			sMenuRuleAOL = window.localStorage['menuRuleAOL_' + targetOrgNo];
		}
		
		if (!!sMenuRuleAOL && sMenuRuleAOL.length)
		{
			_setupEnvSetting();
			
			var parser = new DOMParser();
			var menuRuleEDOM = parser.parseFromString(sMenuRuleAOL, 'text/xml');
			var menuRuleEDoc = menuRuleEDOM.documentElement;
			var $rules = $(menuRuleEDoc).find('EDOL_UI_RULE');
			var $cTargets = $(menuRuleEDoc).find('CTarget');
			var cntRule = $rules.length, cntTarget = $cTargets.length;
			var ruleNode, targetNode, rule, cTarget;
			var i = 0;
			for(i=0; i<cntRule; i++)
			{
				ruleNode = $rules[i];
				rule = _loadRule(ruleNode);
				if (rule) {
					theLogger.log('#' + SSOUtil.jf_PADL2(i, 2, '0') + ' rule for ' + rule.folder + '/' + rule.subfolder + ' loaded.');
					ruleAOL.push(rule);
				}
			}
			
			for (i=0; i<cntTarget; i++) {
				targetNode = $cTargets[i];
				cTarget = _loadCTarget(targetNode);
				if (cTarget) {
					theLogger.log('#' + SSOUtil.jf_PADL2(i, 2, '0') + ' cTarget for NEXTTYPE=[' + cTarget._nextType + '] loaded.');
					cTargets.push(cTarget);
				}
			}
			
			return true;
		}
		
		return false;
	}
	
	/*function _getNextFolder(folder, subfolder, txName) {
		var rule = _getRule(folder, subfolder);
		if ((typeof rule!=='undefined') && (rule!==null))
		{
			var i=0;
			var cntOption = rule.txList.length;
			for(i=0; i<cntOption; i++) {
				var option = rule.txList[i];
				if (option.txName === txName) {
					return { nextfolder: option.nFolder, nextsubfolder: option.nSubfolder };		
				}
			}
			
		}
		return null;
	}*/
	
	function _getRule(folder, subfolder) {
		var i=0, cnt = ruleAOL.length;
		for(i=0; i<cnt; i++)
		{
			var rule = ruleAOL[i];
			if (rule && (rule.folder===folder) && (rule.subfolder===subfolder)) {
				return rule;
			}
		}
		return null;
	}
	
	function _getCTarget(nextType) {
		if (typeof nextType !== 'string') {
			return null;
		}
		
		var cntTarget = cTargets.length;
		var cTarget = null;
		for (i=0; i<cntTarget; i++) {
			cTarget = cTargets[i];
			if (cTarget._nextType===nextType) {
				return cTarget;
			}
		}
		return null;
	}
	
	//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
	function _setExtraCTarget(cTargetNode, orgNode, nextType) {
		var extraCTarget = _loadCTarget(cTargetNode, orgNode, nextType);
		if (extraCTarget===null) {
			return false;
		}

		// 2017.8.1 - bug-fix, 更新nextType='Q'項目
		var newTargets = [];
		var idx = 0, cntCTargets=0;
		if (typeof cTargets=='object' && cTargets.length) {
			cntCTargets = cTargets.length;
		}

		var cTarget = _getCTarget(nextType);
		if (typeof cTarget=='object' && cTarget!==null) {
			cTarget = null;
			for(idx=0; idx<cntCTargets; idx++) {
				cTarget = cTargets[idx];
				if (cTarget._nextType===nextType) {
					continue;
				}
				newTargets.push(cTarget);
			}
			cTargets = newTargets;
			cTargets.push(extraCTarget);
		}
		else {
			if (typeof cTargets=='undefined' || cTargets===null) {
				cTargets = [];
			}
			cTargets.push(extraCTarget);
		}
		return true;
	}
	
	function _resetCTarget(nextType) {
		if (typeof nextType !== 'string') {
			return false;
		}
		
		var cntTarget = cTargets.length;
		var cTarget = null;
		for (i=0; i<cntTarget; i++) {
			if (cTargets[i]._nextType===nextType) {
				cTargets.splice(i,1);
			}
		}
	}
	
	
	// call _init() to load menuRule
	if (!_init()) {
		return null;
	}
	
	this.init = _init;
	//this.getNextFolder = _getNextFolder;
	this.getRule = _getRule;
	this.getCTarget = _getCTarget;
	this.getRuleCount = function() {
		if (typeof ruleAOL==='undefined') {
			return 0;
		}
		else {
			return ruleAOL.length;
		}
	};
	
	//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
	this.setExtraCTarget = _setExtraCTarget;
	this.resetCTarget = _resetCTarget;
	this.ruleEnvSetting = _ruleEnvSetting;
	this.orgNo = orgNo; // 2013.12 - cache menuRule object
}

/*
 取得紙本簽核公文MenuRule
*/
function MenuRulePDoc(artifact, orgNo) {
	var _rulePDoc = [];
	var _cTargetsPDoc = [];
	var _targetOrgNo = orgNo;
	var _ruleEnvSetting = {}; // MeneRuleAOL相關的環境變數設定
	
	if (typeof window.MPRulePDoc_Const === 'undefined') {
		window.MPRulePDoc_Const = {
			MENU_SPECIAL_CHECK_LIST: 'AXCDEFOGH',
			MENU_ADV_CHECK_LIST: '1234567890BR',		//1120426	Leslie[1120004]	新增'R'(TX_REASON)
			
			MENU_SEPRATOR: '@',
			MENU_NEXT_EMPLOYEE: 'K',
			
			MENU_SEP_CHAR0:'@', MENU_SEP_CHAR1:	'$', MENU_SEP_CHAR2: '|', MENU_SEP_CHAR3: ']',
			
			// Eric Peng, For 二層式登記桌
			MENU_NEXT_EMPLOYEE_A: 'U', MENU_NEXT_EMPLOYEE_B: 'T',
			
			DDL_SEP_CHAR01: '^', DDL_SEP_CHAR02: '#', DDL_SEP_CHAR03: '%',
			
			UPPER_TRUE: 'TRUE', LOWER_TRUE: 'true',
			OD_TARGET_MINUS: '-', OD_TARGET_PLUS: '+', OD_TARGET_STAR: '*', OD_TARGET_SHARP: '#',
			
			// MINUS setting: <NEXT MINUS=''>
			OFFSET_NOTHING: 0,
			OFFSET_RMV_CURRENT_OU: 1, // -
			OFFSET_RMV_CURRENT_OU_L1: 1, 
			OFFSET_RMV_CURR_ADD_INC: 2, // +
			FFSET_RMV_CURRENT_OU_L2: 3, // #
			OFFSET_ADD_L2_AND_L1: 4, // *
			
			MENU_ITEM_ENABLE: 0,
			MENU_ITEM_DISABLE: 1,
			MENU_ITEM_DISPLAYNONE: 2,
		};
	}
	var _rule_const = window.MPRulePDoc_Const;
	
	function _getNextRoleList(optionNode) {
		var $next = $(optionNode).find('NEXT');
		var sVal = $next.attr('ROLE');
		var roleList = null;
		if (sVal) {
			roleList = sVal.split(";");
		}
		return roleList;
	}
	
	//var orgNo = window.theSSO.User.PlayRoles[0].orgNo;
	function _loadOption(optionNode) {
		if (optionNode.nodeName==='OPTION') {
			var option = {};
			
			var i=0, sSpecialCheck='',  checkItem='';
			option.ownOUId = SSOUtil.xml_getChildNodeValue(optionNode, 'OWN_OU_ID');
			option.docState = SSOUtil.xml_getChildNodeValue(optionNode, 'DOC_STATE');
			option.txName = SSOUtil.xml_getChildNodeValue(optionNode, 'TX_NAME');
			option.display = SSOUtil.xml_getChildNodeValue(optionNode, 'DISPLAY');
			
			if (option.txName=='續陳') {
				theLogger.log('-I- process txName:"' + option.txName + '"...');
			}
			
			option.specialCheck = '';
			option.advancedCheck = '';
			sSpecialCheck = SSOUtil.xml_getChildNodeValue(optionNode, 'SPECIAL_CHECK');
			if (sSpecialCheck.length) {
				for(i=0; i<sSpecialCheck.length; i++) {
					checkItem = sSpecialCheck.substring(i, i+1);
					if (_rule_const.MENU_SPECIAL_CHECK_LIST.indexOf(checkItem)!==-1) {
						option.specialCheck += checkItem;
					}
					
					if (_rule_const.MENU_ADV_CHECK_LIST.indexOf(checkItem)!==-1) {
						option.advancedCheck += checkItem;
					}
				}
			}
			
			option.next = SSOUtil.xml_getChildNodeValue(optionNode, 'NEXT');
			
			/* 紙本流程<NEXT>有 MINUE attribute */
			var $next = $(optionNode).find('NEXT');
			var minus = SSOUtil.xml_getAttrValue($next[0], 'MINUS');
			if (minus===null) {
				minus = '';
			}
			
			option.m_nOffset = _rule_const.OFFSET_NOTHING;
			if (minus.length) {
				if (minus == _rule_const.OD_TARGET_MINUS) {
					option.m_nOffset = _rule_const.OFFSET_RMV_CURRENT_OU;
				}
				else if (minus == _rule_const.OD_TARGET_PLUS) {
					option.m_nOffset = _rule_const.OFFSET_RMV_CURR_ADD_INC;
				}
				else if (minus == _rule_const.OD_TARGET_STAR) {
					option.m_nOffset = _rule_const.OFFSET_ADD_L2_AND_L1;
				}
				else if (minus == _rule_const.OD_TARGET_SHARP) {
					option.m_nOffset = _rule_const.OFFSET_RMV_CURRENT_OU_L2;
				}
				else if (minus=='1' || minus=='2' || minus=='3' || // 2021.7.30 - 1100433 Eric, merge: 2017.7.6, 2017.8.31 - 1060389 for 'E3'/'E4'/'E5'/'E6'/'O4'
						 minus=='4' || minus=='5' || minus=='6') {
					option.next += minus;
					option.m_nOffset = _rule_const.OFFSET_NOTHING;
				}
				else {
					option.m_nOffset = _rule_const.OFFSET_NOTHING;
				}
			}
			
			/* 部份項目可自行指定角色
			 * <NEXT Role="xx;xx;xxx;">
			 */
			option.nextRoleList = [];
			if (option.txName.indexOf('退回承辦單位')===0) {
				theLogger.debug('txName contains \'退回承辦單位\'....');
			}
			var roleList = _getNextRoleList(optionNode);
			if (roleList!==null && roleList.length>0) {
				option.nextRoleList = roleList;
			}
			
			//option.reject = SSOUtil.xml_getChildNodeValue(optionNode, 'REJECT');
			option.ouLen = SSOUtil.xml_getChildNodeValue(optionNode, 'OU_LEN');
			//option.optLvl = SSOUtil.xml_getChildNodeValue(optionNode, 'OPT_LVL');
			
			option.equalCheck = SSOUtil.xml_getChildNodeValue(optionNode, 'EQUAL_CHECK');
			option.webPage = SSOUtil.xml_getChildNodeValue(optionNode, 'WEBPAGE'); // for 分會 (FDA MenuRule只有分會有WEBPAGE)
			option.webPage_Minus = '';
			var $webPage = $(optionNode).find('WEBPAGE');
			var webPage_minus = SSOUtil.xml_getAttrValue($webPage[0], 'MINUS');
			if (!!webPage_minus && webPage_minus.length) {
				option.webPage_Minus = webPage_minus;
			}
			
			return option;
		}
		return null;
	}
	
	function _loadRule(ruleNode) {
		var i=0, option;
		if (ruleNode.nodeName==='EDOL_UI_RULE') {
			var rule = {}, $txListNode, $options;
			rule.folder = SSOUtil.xml_getChildNodeValue(ruleNode, 'FOLDER');
			rule.subfolder = SSOUtil.xml_getChildNodeValue(ruleNode, 'SUBFOLDER');
			rule.menuRuleItem = true; // 2016.9.29 - 記錄是否為MPRUlE(E)_$ORG_NO$.XML內的項目...
						
			rule.txList = [];
			$txListNode = $(ruleNode).find('TX_LIST');
			if ($txListNode.length) {
				$options = $txListNode.find('OPTION');
				for (i=0; i<$options.length; i++) {
					option = _loadOption($options[i]);
					if (!!option) {
						rule.txList.push(option);
					}
				}
			}
			
			if (!!_debug && rule.folder==='待處理' && rule.subfolder==='主辦') {
				// dump content
				theLogger.debug('MenuRulePDoc for \"' + rule.folder + '/' + rule.subfolder + ':');
				for(i=0; i<rule.txList.length; i++)
				{
					option = rule.txList[i];
					theLogger.debug('\t#' + (i+1) + ' TxName=' + option.txName + ', Next=' + option.next + ', SpecialCheck=' + option.specialCheck);
				}
			}
			return rule;
		}
		return null;
	}
	
	//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
	function _getUnitNode(orgNode, unitNo) {
		if (orgNode && unitNo && unitNo.length)
		{
			if (orgNode) {
				var $orgNode = $(orgNode);
				var xpath = 'Unit[UnitCode="' + unitNo + '"]';
				var unitNode = ($orgNode.find(xpath))[0];
				if (unitNode) {
					return unitNode;
				}	
				else {
					theLogger.warn('-W- _getUnitNode() 找不到UnitNo=[' + unitNo + ']的 <Unit> node.');
				}
			}
		}
		else {
			theLogger.error('-ERR- _getUnitNode() invalid orgNode/unitNo');
		}
		return null;
	}
	
	//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
	// function _loadCTarget(cTargetNode) { // for PDoc
		// function _loadCTargetOption(cOptionNode) {
	function _loadCTarget(cTargetNode, _orgNode, _nextType) { // for PDoc
		function _loadCTargetOption(cOptionNode, theOrgNode, fSetupTitle) {
			/* <CTarget NEXTTYPE='X'>/
			 * <OPTION title="xxx" finalTarget="true"> [title/finalTarget皆為optional]
			 *   child nodes: OU_ID / OU_NAME / ROLE_ID / ROLE_NAME / USER_ID / USER_NAME / [OPTION]
			*/
			
			//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
			fSetupTitle=(typeof fSetupTitle==='boolean')?fSetupTitle:false;
			
			var i=0, $subOptionNodes = null, subOptionNode = null;
			var cOption = {}, cSubOption=null;
			var sValue = SSOUtil.xml_getAttrValue(cOptionNode, 'title');
			cOption._title = '';
			if (!!sValue && sValue.length) {
				cOption._title = sValue; // 2017.7.6 - bug fix.
			}
			cOption._finalTarget = true;
			sValue = SSOUtil.xml_getAttrValue(cOptionNode, 'finalTarget');
			if (!!sValue && sValue.length) {
				sValue = sValue.toLowerCase();
				if (sValue==='n' || sValue==='false' || sValue==='0') {
					cOption._finalTarget = false;
				}
			}
			
			cOption.ouId = SSOUtil.xml_getChildNodeValue(cOptionNode, 'OU_ID');
			cOption.ouName = SSOUtil.xml_getChildNodeValue(cOptionNode, 'OU_NAME');
			cOption.roleId = SSOUtil.xml_getChildNodeValue(cOptionNode, 'ROLE_ID');
			cOption.roleName = SSOUtil.xml_getChildNodeValue(cOptionNode, 'ROLE_NAME');
			cOption.userId = SSOUtil.xml_getChildNodeValue(cOptionNode, 'USER_ID');
			cOption.userName = SSOUtil.xml_getChildNodeValue(cOptionNode, 'USER_NAME');
			
			//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
			if (typeof theOrgNode!=='undefined' && theOrgNode!==null) {
				var unitNode=null, userInfo=null;
				var unitName='', roleName='';
				if (typeof cOption.ouId=='string' && cOption.ouId.length &&
			    	(typeof cOption.ouName!=='string' || cOption.ouName.length===0)) {
					unitNode = _getUnitNode(theOrgNode, cOption.ouId);
					if (unitNode!==null) {
						unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName')
						cOption.ouName = unitName;
					}
					else { // 2018.1.30 - NCKU107132
						theLogger.log('-ERR- _loadCTargetOption[PDoc]@RD-DlgProcessSetting.js invalid OU_ID=' + cOption.ouId);
						return null;
					}
				}

				if (typeof cOption.roleId=='string' && cOption.roleId.length &&
			    	(typeof cOption.roleName!=='string' || cOption.roleName.length===0)) {
					if (typeof unitName=='string' && unitName.length) {
						roleName = SSOUtil.getOrgRoleName(theOrgNode, cOption.ouId, cOption.roleId);
						cOption.roleName = roleName;
					}

					// 2018.1.30 - NCKU107132
					if (typeof roleName!='string' || roleName.length===0) { 
						theLogger.log('-ERR- _loadCTargetOption[PDoc]@RD-DlgProcessSetting.js invalid ROLD_ID=' + cOption.roleId);
						return null;
					}
				}

				if (typeof cOption.userId=='string' && cOption.userId.length &&
			    	(typeof cOption.userName!=='string' || cOption.userName.length===0)) {
					if (typeof roleName=='string' && roleName.length) {
						userInfo = SSOUtil.getOrgUserInfo(theOrgNode, cOption.ouId, cOption.roleId, cOption.userId);
						if (!!userInfo) {
							cOption.userName = userInfo.UserName;
						}
						else { // 2018.1.30 - NCKU107132
							theLogger.log('-ERR- _loadCTargetOption[PDoc]@RD-DlgProcessSetting.js invalid UserData' +
										  'OU_ID=' + cOption.ouId, ', ROLE_ID=' + cOption.roleId + ', UserId=' + cOption.userId);
							return null;
						}
					}
				}

				if (cOption._title.length===0 && fSetupTitle) {
					cOption._title = unitName + '-' + roleName + '-' + userInfo.UserName;
				}
			}
			
			cOption.options = [];
			$subOptionNodes = $(cOptionNode).children('OPTION');
			if ($subOptionNodes.length) {
				for(i=0; i<$subOptionNodes.length; i++) {
					subOptionNode = $subOptionNodes[i];
					if (!!subOptionNode) {
						//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
						// cSubOption = _loadCTargetOption(subOptionNode);
						cSubOption = _loadCTargetOption(subOptionNode, theOrgNode, fSetupTitle);
						if (!!cSubOption) {
							cOption.options.push(cSubOption);
						}
					}
				}
			}
			return cOption;
		}
		
		//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
		var	fSetupTitle = false;

		var cTarget, $cOptionNodes, option;
		if (cTargetNode.nodeName==='CTarget') {
			cTarget = {
				options : []
			};
			
			//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
			// cTarget._nextType = SSOUtil.xml_getAttrValue(cTargetNode, 'NEXTTYPE');
			if (typeof _nextType==='string' && _nextType.length) {
				cTarget._nextType = _nextType;
				fSetupTitle = true;
			}
			else {
				cTarget._nextType = SSOUtil.xml_getAttrValue(cTargetNode, 'NEXTTYPE');
			}
			
			$cOptionNodes = $(cTargetNode).children('OPTION');
			for (i=0; i<$cOptionNodes.length; i++)
			{
				//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員，處理NEXTTYPE='Qx'項目沒有名稱問題
				// option = _loadCTargetOption($cOptionNodes[i]);
				option = _loadCTargetOption($cOptionNodes[i], _orgNode, fSetupTitle);
				if (!!option) {
					cTarget.options.push(option);
				}
			}
			
			// 沒有對象, 回傳null
			if (cTarget.options.length===0) {
				theLogger.warn('-W- CTarget NEXTTYPE=' + cTarget._nextType + ' 沒有任何OPTION, 排除之!');
				return null;
			}
			return cTarget;
		}
		return null;
	}
	
	/* 設定[紙本]MenuRule factory的環境變數 */
	function _setupEnvSetting(ruleEnvSetting) {
		if (typeof ruleEnvSetting === 'undefined' || ruleEnvSetting===null) {
			ruleEnvSetting = _ruleEnvSetting;
		}
		
		var strEnvSet = '';
		var envSet = window.theSSO.User.EnvSettings;
		
		ruleEnvSetting.underTakerRoles = [];
		strEnvSet = envSet.get('MP_RULE_UNDERTAKER_ROLEID');	// 可承辦公文人員角色
		if (!!strEnvSet && strEnvSet.length) {
			ruleEnvSetting.underTakerRoles = strEnvSet.split(';');
		}
		else {
			ruleEnvSetting.underTakerRoles.push(window.sso_const.ROLENO_OPERATOR);
		}
		
		strEnvSet = envSet.get('MP_RULE_K_CLASS_WITH_SUBUNIT');
		if (!!strEnvSet && strEnvSet.length && (strEnvSet==='N' || strEnvSet=='n')) {
			ruleEnvSetting.KClassWithSubUnit = false;
		}
		else {
			ruleEnvSetting.KClassWithSubUnit = true;
		}
		
		ruleEnvSetting.draftCancelByDesk = envSet.get('DraftCancelByDesk');
		strEnvSet = envSet.get('MainCancelSubfolder');
		if (strEnvSet.length) {
			if (strEnvSet.substring(strEnvSet.length-1, 1)!==';') {
				ruleEnvSetting.mainCancelSubfolder = strEnvSet + ';';
			}
		}
		ruleEnvSetting.checkMeetDateBTypeNo = envSet.get('OD_CHECKMEETDATE_BTYPENO');
		if (typeof ruleEnvSetting.checkMeetDateBTypeNo == 'undefined') {
			ruleEnvSetting.checkMeetDateBTypeNo = '';
		}
		
		ruleEnvSetting.SSOApproveSendTo = envSet.get('SSO_APPROVE_SEND_TO');
		if (typeof ruleEnvSetting.SSOApproveSendTo == 'undefined') {
			ruleEnvSetting.SSOApproveSendTo = '';
		}
		ruleEnvSetting.ODApproveType = envSet.get('OD_APPROVE_TYPE');
		if (typeof ruleEnvSetting.ODApproveType == 'undefined') {
			ruleEnvSetting.ODApproveType = '';
		}
		ruleEnvSetting.MPCanApproveRole = envSet.get('MP_CAN_APPROVE_ROLE');
		if (typeof ruleEnvSetting.MPCanApproveRole == 'undefined') {
			ruleEnvSetting.MPCanApproveRole = '';
		}
		
		var roleList = [];
		strEnvSet = envSet.get('OD_OD99_CAN_APP');
		ruleEnvSetting.OD99CanApproveBTypeNo = '';
		ruleEnvSetting.OD99CanAppFolder = '';
		if(!!strEnvSet && strEnvSet.length) {
			roleList = strEnvSet.split('|'); // 'Y|52|待處理主辦'
			if (roleList.length>=2) {
				ruleEnvSetting.OD99CanApproveBTypeNo = roleList[1]; // 取第二個項目
				//1051206 David 新增紀錄OD_OD99_CAN_APP第三個項目
				if (roleList.length>=3)
					ruleEnvSetting.OD99CanAppFolder = roleList[2];// 取第三個項目
			}
			else {
				theLogger.error('Error! 無效的環境變數[OD_OD99_CAN_APP]設定值:"' + strEnvSet + '"');
			}	
		}
		
		strEnvSet = envSet.get('OD_SHOW_UNIT_ROLE');
		// 2015.5 - 處理未設定或設定值為空的情況!
		if (!!strEnvSet && strEnvSet.length) {
			roleList = strEnvSet.split('|');
			if (roleList.length>=2) {
				ruleEnvSetting.showUnitRoleId = roleList[0]; // 第一個項目為紙本簽核用的角色代碼! (第二個項目為線上簽核使用)
			}
			else {
				theLogger.error('Error! 無效的環境變數[OD_SHOW_UNIT_ROLE]設定值:"' + strEnvSet + '"');
				ruleEnvSetting.showUnitRoleId = '';
			}	
		}
		else {
			ruleEnvSetting.showUnitRoleId = '';
		}
		
		strEnvSet = envSet.get('OD_CHECK_FILE_CASE');
		ruleEnvSetting.checkFileCase = false;
		if (!!strEnvSet && strEnvSet.length && (strEnvSet==='Y' || strEnvSet==='y')) {
			ruleEnvSetting.checkFileCase = true;
		}
	}
	
	function _init() {
		var sMenuRule = window.localStorage['menuRulePDoc_' + _targetOrgNo];
		var menuRuleFilename = '', ODRPUIFilename = '';
		var success = false;
		if (!sMenuRule || (sMenuRule.length===0)) {
			menuRuleFilename = 'MPRule_' + _targetOrgNo + '.xml';
			success = SSOUtil.getMenuRule(artifact, _targetOrgNo, 'P'); // 2014.9 - 取得後會存在localStorage內
			if (!success) {
				theLogger.error('Error! 無法取得MenuRule,檔名:' + menuRuleFilename + '檔案內容.');
				return false;
			}
			sMenuRule = window.localStorage['menuRulePDoc_' + _targetOrgNo];
		}
		
		var sODRPUI = window.localStorage['ODRPUI_' + _targetOrgNo];
		if ((typeof sODRPUI == 'undefined') || sODRPUI===null || sODRPUI.length===0) {
			ODRPUIFilename = 'ODRPUI.XML';
			success = SSOUtil.getODRPUI(artifact, _targetOrgNo); // 2014.9 - 取得後會存在localStorage內
			if (!success) {
				theLogger.error('Error! 無法取得MenuRule,檔名:' + menuRuleFilename + '檔案內容.');
				return false;
			}
			sODRPUI = window.localStorage['ODRPUI_' + _targetOrgNo];
		}
		
		var parser = null, parse2 = null;
		var $rules = null, $cTargets = null;
		var cntRule = 0, cntTarget = 0;
		var ruleNode, targetNode, rule, cTarget;
		var i = 0, j = 0;
		if (!!sMenuRule && sMenuRule.length) {
			_setupEnvSetting(_ruleEnvSetting);
			
			parser = new DOMParser();
			var menuRuleEDOM = parser.parseFromString(sMenuRule, 'text/xml');
			var menuRulePDoc = menuRuleEDOM.documentElement;
			$rules = $(menuRulePDoc).find('EDOL_UI_RULE');
			$cTargets = $(menuRulePDoc).find('CTarget');
			cntRule = $rules.length;
			cntTarget = $cTargets.length;
			for(i=0; i<cntRule; i++)
			{
				ruleNode = $rules[i];
				rule = _loadRule(ruleNode);
				if (rule) {
					theLogger.log('#' + SSOUtil.jf_PADL2(i, 2, '0') + ' rule for ' + rule.folder + '/' + rule.subfolder + ' loaded.');
					_rulePDoc.push(rule);
				}
			}
			
			for (i=0; i<cntTarget; i++) {
				targetNode = $cTargets[i];
				cTarget = _loadCTarget(targetNode);
				if (cTarget) {
					theLogger.log('#' + SSOUtil.jf_PADL2(i, 2, '0') + ' cTarget for NEXTTYPE=[' + cTarget._nextType + '] loaded.');
					_cTargetsPDoc.push(cTarget);
				}
			}
		}
		else {
			theLogger.error('Error! 無法取得MenuRule,檔名:' + menuRuleFilename + '檔案內容.');
			return false;
		}
		
		if (!!sODRPUI && sODRPUI.length) {
			parse2 = new DOMParser();
			var UISet = parse2.parseFromString(sODRPUI, 'text/xml');
			var docUISet = UISet.documentElement;
			var $UIRules = $(docUISet).find('EDOL_UI_RULE');
			
			var metaDataM = '', buttonF = '', folder='', subfolder='';
			var targetRule=null, newRule=null;
			cntRule = $UIRules.length;
			for(i=0; i<cntRule; i++)
			{
				targetRule=null; newRule=null;
				
				metaDataM = ''; buttonF = '';
				folder=''; subfolder='';

				ruleNode = $UIRules[i];
				folder = SSOUtil.xml_getChildNodeValue(ruleNode, 'FOLDER');
				subfolder = SSOUtil.xml_getChildNodeValue(ruleNode, 'SUBFOLDER');

				metaDataM = SSOUtil.xml_getChildNodeValue(ruleNode, 'METADATA_M');
				//1121031 David 新增取得METADATA_M內的RCVMODE屬性
				var $metaDataM = $(ruleNode).find('METADATA_M');
				let MetaDataM_RcvMode = SSOUtil.xml_getAttrValue($metaDataM[0], 'RCVMODE');
				if (typeof MetaDataM_RcvMode == 'undefined' || MetaDataM_RcvMode === null)
					MetaDataM_RcvMode = '';

				buttonF = SSOUtil.xml_getChildNodeValue(ruleNode, 'BUTTON_F');
				webPage = SSOUtil.xml_getChildNodeValue(ruleNode, 'WEBPAGE');
				var $webPage = $(ruleNode).find('WEBPAGE');
				var webPage_Mode = SSOUtil.xml_getAttrValue($webPage[0], 'MODE');
				if (typeof webPage_Mode == 'undefined' || webPage_Mode === null)
					webPage_Mode = '';

				for(j=0; j<_rulePDoc.length; j++) {
					rule = _rulePDoc[j];
					if (rule.folder==folder && rule.subfolder==subfolder) {
						rule.metaDataM = metaDataM;
						rule.buttonF = buttonF;
						rule.webPage = webPage;
						rule.webPage_Mode = webPage_Mode;
						rule.RcvNode = MetaDataM_RcvMode;//1121031 David 新增紀錄METADATA_M內的RCVMODE屬性
						targetRule = rule;
						break;
					}
				}
				
				if (targetRule===null) {
					newRule =  {
						folder: folder,
						subfolder: subfolder,
						metaDataM : metaDataM,
						buttonF: buttonF,
						webPage: webPage,
						webPage_Mode: webPage_Mode,
						txList: null,
					};
					_rulePDoc.push(newRule);
				}
			}
			return true;
		}
		
		theLogger.error('Error! 無法取得ODRPUI, 檔名:' + ODRPUIFilename + ' 檔案內容.');
		return false;
	}
	
	function _getRule(folder, subfolder) {
		var i=0, cnt = _rulePDoc.length;
		for(i=0; i<cnt; i++)
		{
			var rule = _rulePDoc[i];
			if (rule && (rule.folder===folder) && (rule.subfolder===subfolder)) {
				return rule;
			}
		}
		return null;
	}
	
	function _getCTarget(nextType) {
		if (typeof nextType !== 'string') {
			return null;
		}
		
		var cntTarget = _cTargetsPDoc.length;
		var cTarget = null;
		for (i=0; i<cntTarget; i++) {
			cTarget = _cTargetsPDoc[i];
			if (cTarget._nextType===nextType) {
				return cTarget;
			}
		}
		return null;
	}
	
	//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
	function _setExtraCTarget(cTargetNode, orgNode, nextType) {
		var extraCTarget = _loadCTarget(cTargetNode, orgNode, nextType);
		if (extraCTarget===null) {
			return false;
		}
		
		// 2017.8.1 - bug-fix, 更新nextType='Q'項目
		var newTargets = [];
		var idx = 0, cntCTargets=0;
		if (typeof _cTargetsPDoc=='object' && _cTargetsPDoc.length) {
			cntCTargets = _cTargetsPDoc.length;
		}

		var cTarget = _getCTarget(nextType);
		if (typeof cTarget=='object' && cTarget!==null) {
			cTarget = null;
			for(idx=0; idx<cntCTargets; idx++) {
				cTarget = _cTargetsPDoc[idx];
				if (cTarget._nextType===nextType) {
					continue;
				}
				newTargets.push(cTarget);
			}
			_cTargetsPDoc = newTargets;
			_cTargetsPDoc.push(extraCTarget);
		}
		else {
			if (typeof _cTargetsPDoc=='undefined' || _cTargetsPDoc===null) {
				_cTargetsPDoc = [];
			}
			_cTargetsPDoc.push(extraCTarget);
		}
		return true;
	}
	
	function _resetCTarget(nextType) {
		if (typeof nextType !== 'string') {
			return false;
		}
		
		var cntTarget = cTargets.length;
		var cTarget = null;
		for (i=0; i<cntTarget; i++) {
			if (cTargets[i]._nextType===nextType) {
				cTargets.splice(i,1);
			}
		}
	}

	
	// call _init() to load menuRule
	_init();
	
	this.init = _init;
	//this.getNextFolder = _getNextFolder;
	this.getRule = _getRule;
	this.getCTarget = _getCTarget;
	this.getRuleCount = function() {
		if (typeof _cTargetsPDoc === 'undefined') {
			return 0;
		}
		else {
			return _cTargetsPDoc.length;
		}
	};
	
	//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
	this.setExtraCTarget = _setExtraCTarget;
	this.resetCTarget = _resetCTarget;
	this.ruleEnvSetting = _ruleEnvSetting;
	this.orgNo = _targetOrgNo; // 2013.12 - cache menuRule object
}

/*
 2012.12 - Demo時須參照使用下列 data:
   theAOL.flowData @AOL.js
   window.sso_const 系統設定 @DemoData.js
*/
function FlowBuilder() {
	/*
	 目的: 取得日期顯示文字, 輸出格式: YYY/MM/DD hh:mm
	*/
	function _getDisplayTimeString(signTime) {
		// 11字元者為中文年, Ex 10108201234 3碼年, 2碼月, 2碼日, 2碼時, 2碼分
		// 12字元者為西元年, Ex 211208201234 4碼年, 2碼月, 2碼日, 2碼時, 2碼分
		if (!!signTime && (signTime.length==12||signTime.length==11)) {
			var year;
			var sTimeT;
			if (signTime.length==11) {
				year = parseInt(signTime.substr(0, 3), 10);
				sTimeT = SSOUtil.jf_PADL2(year.toString(), 3, '0') + '/' + signTime.substr(3, 2) + '/' + signTime.substr(5, 2) +
								  ' ' + signTime.substr(7, 2) + ':' + signTime.substr(9,2);
			}
			else {
				year = parseInt(signTime.substr(0, 4), 10) - 1911;
				sTimeT = SSOUtil.jf_PADL2(year.toString(), 3, '0') + '/' + signTime.substr(4, 2) + '/' + signTime.substr(6, 2) +
									 ' ' + signTime.substr(8, 2) + ':' + signTime.substr(10,2);
			}
			return sTimeT;
		}
		else {
			return '';
		}
	}	
	/*
	 * 產生時效統計標籤
	 */
	function _getLimitation(limitation) {
		var sLimitationElem =	'<div class="sign_elapse">' + // <!-- 時效統計-->
									'<div>時效統計：</div>' +
									'<div>標準：' + limitation.Std_LMT + '分鐘</div>' +
									'<div>實際：' + limitation.Consumed + '分</div>' +
								'</div>';
		return sLimitationElem;
	}
	/*
	 * 2012.12.18 - 產生簽核流程HTML DOM物件 (不含連接線及異動別文字)
	 */
	function _createFlowItemElement(rawItem, fCoworker) {
		var $itemElem = $('<div></div>');
		var sItemContent = '';
		if(rawItem.Status=='0') {
			//$itemElem.addClass('flow_item_unfinished draggable droppable');
			if (fCoworker) {
				$itemElem.addClass('flow_group flow_group_unfinished draggable droppable');
			}
			else {
				$itemElem.addClass('flow_item flow_item_unfinished draggable droppable');
			}
			
			/* 未簽核流程之內容
			<div class="flow_item_content">
			  <span>主任祕書室</span><br />
			  <span>主祕 王栢琼</span><br />
			  <span>[尚未簽核]</span>
			  <div class="portrait"  style="background:transparent url('IMAGE/WorkFlow/portrait_boss.png') 50% 50%;"></div>
			</div>
			<div class="swap_icon"></div>
			*/
			if (fCoworker) {
				sItemContent =	'<div class="flow_item_content">' +
								'<span>' + rawItem.Unit + '</span><br />' +
								'<span>[尚未簽核]</span>' +
								'</div>';
			}
			else {
				var name; 
				sItemContent =	'<div class="flow_item_content">' +
								'<span>' + rawItem.Unit + '</span><br />' +
								'<span>' + rawItem.Name + '</span><br />' +
								'<span>[尚未簽核]</span>' +
								// 頭像
								'<div class="portrait" style="background:transparent url(' + rawItem.Portrait + ') 50% 50%;"></div>' +
								'</div>';
			}
			
			$(sItemContent).appendTo($itemElem);
			$('<div class="swap_icon"></div>').appendTo($itemElem);
			return $itemElem;
		}
		
		if (rawItem.Status=='1') {
			$itemElem.addClass('flow_item flow_item_finished');
		}
		else if (rawItem.Status=='2') {
			$itemElem.addClass('flow_item flow_item_current');
		}
		
		/* 已簽核流程內容
		 <div class="flow_item flow_item_finished flow_item_incharge" style="top: 50px; left: 25px; z-index: 5;" >
			<div class="flow_item_content">
			  <div class="unit">人事室二科</div>
			  <div class="person">科員 查爾斯一</div>
			  <div class="time_t">100/07/29 13:45</div>
			  <hr>
			  <div class="flow_item_info">
				<img class="clock_btn" alt="" src="IMAGE/WorkFlow/clock.png" width="20" height="20" />
			  </div>
			  <div class="sign_comment"> <!-- 簽核意見-->
				<div>主任第一次簽核意見...</div>
				<div class="pointer"></div>
			  </div>
			  <div class="sign_elapse"> <!-- 時效統計-->
				<div>時效統計：</div>
				<div>標準：240分鐘</div>
				<div>實際：60分</div>
			  </div>
			  <div class="portrait" style="background:transparent url('IMAGE/WorkFlow/portrait_1_small.png') 55% 50%;"></div>
			</div>
		  </div>
		*/
		
		var sTimeT = _getDisplayTimeString(rawItem.SignTime);
		if (rawItem.Status=='2') {
			var date = new Date();
			var dYear = SSOUtil.jf_PADL2((date.getFullYear()-1911).toString(),3,"0");
			var dMon  = SSOUtil.jf_PADL2((date.getMonth()+1).toString(),2,"0");
			var dDay  = SSOUtil.jf_PADL2(date.getDate().toString(),2,"0");
			var tHour = '??';
			var tMin  = '??';
			sTimeT = dYear + '/' + dMon + '/' + dDay + ' ' + tHour + ':' + tMin;
		}
		var sSignTimeElem = sTimeT.length ? ('<div class="time_t">' + sTimeT + '</div>') : '';
		var sCommentIconElem = (rawItem.Comment.length || rawItem.Status=='2') ? '<img class="comment_btn" alt="" src="IMAGE/WorkFlow/comment.png" width="20" height="20" />' : '';
		var sTimeLMTIconElem = rawItem.Limitation ? '<img class="clock_btn" alt="" src="IMAGE/WorkFlow/clock.png" width="20" height="20" />' : '';
		var sCommentElem = '';
		if (rawItem.Status=='1') { // 已執行流程
			sCommentElem = rawItem.Comment.length ? '<div class="sign_comment"><div>' + rawItem.Comment + '</div><div class="pointer"></div></div>' : '';
		}
		else if (rawItem.Status=='2') { // 目前流程
			sCommentElem = '<div class="sign_comment"><textarea data-role="none">' + rawItem.Comment + '</textarea><div class="edit-icon"></div><div class="pointer"></div></div>';
		}
		var sTimeLMTElem = (!rawItem.Limitation) ? '' : _getLimitation(rawItem.Limitation);
		
		var displayName = '';
		if (rawItem.RoleName.length) {
			displayName = rawItem.RoleName + ' ';
		}
		displayName += rawItem.Name;
		
		sItemContent =	'<div class="flow_item_content">' +
						'<div class="unit">' + rawItem.Unit + '</div>' +
						'<div class="person">' + displayName + '</div>' +
							sSignTimeElem + // 簽核時間
							'<hr>' +
							'<div class="flow_item_info">' +
								sCommentIconElem + // icon for 簽核意見
								sTimeLMTIconElem + // icon for 時效統計
							'</div>' +
							sCommentElem + //簽核意見
							sTimeLMTElem + // 時效統計
							// 頭像
							'<div class="portrait" style="background:transparent url(' + rawItem.Portrait + ') 55% 50%;"></div>' +
						'</div>';
		
		var $content = $(sItemContent).appendTo($itemElem);
		return $itemElem;
	}
	
	// 判定是否為會辦流程
	function _isCoworker(sICOUId, sOUId) {
		// 會辦(不同一級單位)
		var sICOUId_Lv1 = (sICOUId.length>2) ? sICOUId.substr(0,2) : sICOUId;
		var sOUId_Lv1 = (sOUId.length>2) ? sOUId.substr(0,2) : sOUId;
		var OUNum = parseInt(sOUId_Lv1, 10);
		if (sOUId_Lv1!=sICOUId_Lv1 && (OUNum<90)) // 單位碼90以上不為會辦單位!
		{
			return true;
		}
		
		return false;
	}
	/*
	 * 將WWKF檔內項目分出群組 [內會前] + [內會] + [會辦前] + [會辦] + 會辦後 + [後會?]
	 *
	 * group item:
	 *  非會辦流程: type: 'item', item: 'rawItem'
	 *  會辦流程: type: 'coworker',
	 *            subtype: 順會 | 分會
	 *            itemList: [rawItem, rawItem, rawItem,...]
	 */
	function _groupFlowItems(flowData, sICOUId) {	
		var groupList = [];
		for(var i=0; i<flowData.length; i++)
		{
			var rawItem = flowData[i];
			var lastItemType = '';
			
			var sOUId = rawItem.OUId;
			
			if (sOUId.length===0)
				continue;
			
			fCoworker = _isCoworker(sICOUId, sOUId);
			
			//
			// 內會(相同一級單位, ->暫不考慮)
			//
			
			var sICOUId_Lv1 = (sICOUId.length>2) ? sICOUId.substr(0,2) : sICOUId;
			
			var group, item;
			
			// 會辦(不同一級單位)
			var sOUId_Lv1 = (sOUId.length>2) ? sOUId.substr(0,2) : sOUId;
			var OUId_Num = parseInt(sOUId_Lv1);
			//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
			// var OUId_Num = parseInt(sOUId_Lv1);
			// if ((OUId_Num<window.sso_const.VIRTUALUNIT_NUM) && (sOUId_Lv1 != sICOUId_Lv1))
			if ((sOUId_Lv1<window.sso_const.VIRTUALUNIT_NUM) && (sOUId_Lv1 != sICOUId_Lv1))
			{
				var exist = false;
				for(var j=0; j<groupList.length; j++)
				{
					group = groupList[j];
					if (group.type=='coworker')
					{
						for(var k=0; k<group.itemList.length; k++) {
							item = group.itemList[k];
							if (item.OUId.substr(0,2)==sOUId_Lv1) {
								exist = true;
								break;
							}
						}
					}
				}
				
				group = null;
				if (groupList.length) {
					item = groupList[groupList.length-1];
					if (item.type=='coworker') {
						group = item;
					}
				}
				
				if (group===null) {
					groupList.push({type: 'coworker', subtype: rawItem.TxName, itemList: [rawItem]});
				}
				
				// 已存在相同一級單位項目->不加入!
				if (!exist && !!group) {
					group.itemList.push(rawItem);
				}
				
				lastItemType = 'coworker';
			}
			else {
				// 非會辦項目直接加入為一Column
				groupList.push({type:'item', item: rawItem});
				lastItemType = 'normal';
			}
		}
		return groupList;
	}
	/*
	// 異動會辦模式(順會/分會)
	// -> 所有會辦流程皆未執行才能異動!
	//
	// ToDo: 2013.1.3 - 確認系統是否有條件判定是否可執行分會?!
	 */
	function _changeCoworkGroupMode($container, group, newMode) {
		var groupItem_width = 120;
		var row_height = 160;
		
		var $domItems = $container.find('div.flow_group');
		
		alert('docItem count=' + $domItems.length + ', group item count=' + group.itemList.length);
		
		// 連接線位置
		var left_linker = 0,
			top_linker = 0,
			w_linker = 0,
			h_linker = 0,
			linker_src = '';
	
		var seq = (newMode=='順會') ? true : false;
		
		// 異動別文字位置
		var left_tx = 0,
			top_tx = 0;
		
		var rawItem, dir, $canvas;
		var groupItemCount = group.itemList.length;
		for(var i=0; i<groupItemCount; i++)
		{
			rawItem = group.itemList[i];
			rawItem.TxName = newMode;
			
			//var unfinished = true;
			
			dir = '';
			if (seq) {
				if (i===0) {
					// 第一個 左下/右上
					top_linker = 30;
					w_linker = 38;
					h_linker = 80;
					left_linker = -w_linker;
					//linker_src = 'IMAGE/WorkFlow/arrow_lt_unfinished-2.png';
					linker_src = '';
					dir = 'lb2rt';
					
					h_linker = (((groupItemCount % 2)===0) ? 80 : 0) + ((groupItemCount / 4) * row_height);
					
					top_tx = 10;
					left_tx = -30;
				}
				else {
					// 其它 由上至下
					h_linker = 94;
					w_linker = 20;
					left_linker = (groupItem_width - w_linker) / 2;
					top_linker = -h_linker;
					//linker_src = 'IMAGE/WorkFlow/arrow_d_unfinished.png';
					dir = 't2b';
					
					top_tx = -30;
					left_tx = 30;
				}
			}
			else {
				// 分會模式
				top_linker = 40;
				left_linker = -38;
				w_linker = 38;
	
				top_tx = 30;
				left_tx = -30;
				//linker_src = 'IMAGE/WorkFlow/arrow_unfinished.png'
				
				// 前面項目 left-bottom to right-top
				// 中間項目 left to right
				// 後面項目 left-top to right-bottom
				var diff;
				if ((groupItemCount%2)===0) {
					var upperIndex = parseInt(groupItemCount / 2) - 1;
					if (i<=upperIndex) {
						diff = upperIndex-i;
						dir = 'lb2rt';
						h_linker = 87 + diff * row_height;
					}
					else {
						diff = i - (upperIndex+1);
						dir = 'lt2rb';
						h_linker = 87 + diff * row_height;
						top_linker -= h_linker;
					}
				}
				else {
					var middle = parseInt(groupItemCount / 2);
					
					if (i==middle) {
						dir = 'l2r';
						h_linker = 20;
					}
					else if (i<middle) {
						dir = 'lb2rt';
						diff = middle-i;
						h_linker = diff*row_height;
					}
					else if (i>middle) {
						dir = 'lt2rb';
						diff = i-middle;
						h_linker = diff*row_height;
						top_linker -= h_linker;
					}
				}
			}
			
			var domItem = $domItems[i];
			
			// 箭頭
			var $linker = $(domItem).find('div.flow_arrow')
									.css({top: top_linker.toString() + 'px', left: left_linker.toString() + 'px',
										  width: w_linker.toString() + 'px', height: h_linker.toString() + 'px'});
			//$linker.find('img').attr('src', linker_src);
			$canvas = $linker.find('canvas').attr({'width': w_linker, 'height':h_linker});
			switch(dir) {
			case 'l2r':
				_drawConnectLineL2R($canvas, '#888', true); break;
			case 'lt2rb':
				_drawConnectLineLT2RB($canvas, '#888', true); break;
			case 'lb2rt':
				_drawConnectLineLB2RT($canvas, '#888', true); break;
			case 't2b':
				_drawConnectLineT2B($canvas, '#888', true); break;
			default:
				theLogger.warn('Error! _changeCoworkGroupMode() invalid direction:' + dir);
			}
			
			// 異動別
			$(domItem).find('div.flow_txname').css({top: top_tx.toString() + 'px', left: left_tx.toString() + 'px'});
			$(domItem).find('div.flow_txname span').text(newMode);
		}
		
		//
		// 下一個非會辦流程修改箭頭
		//
		var idxNext = -1;
		for(i=0; i<_groupList.length; i++)
		{
			var g = _groupList[i];
			if (g==group) {
				if ((i+1)<_groupList.length) {
					idxNext = i+1;
					break;
				}
			}
		}
		
		var nextGroup = _groupList[idxNext];
		if (nextGroup.type=='item') {
			var $flowContainer = $container.closest('div.flow_set');
			if ($flowContainer.length) {
				var $flowItemElems = $flowContainer.find('div.flow_item');
				var cnt = $flowItemElems.length;
				for(var j=0; j<cnt; j++)
				{
					var $itemElem = $($flowItemElems[j]);
					rawItem = $itemElem.data('rawItem');
					dir = 'lb2rt';
					if (rawItem == nextGroup.item)
					{
						var left_arrow, w_arrow, h_arrow;
						if (newMode=='順會') {
							left_arrow = -34;
							w_arrow = 36;
							//h_arrow = 75;
							if ((groupItemCount%2)===0) {
								h_arrow = 80 + (groupItemCount / 4) * row_height;
							}
							else {
								h_arrow = ((groupItemCount-1) / 2) * row_height;
							}
							//linker_src = 'IMAGE/WorkFlow/arrow_lt_unfinished-2.png';
							dir = 'lb2rt';
						}
						else if (newMode=='分會') {
							left_arrow = -38;
							w_arrow = 38;
							h_arrow = 20;
							//linker_src = 'IMAGE/WorkFlow/arrow_unfinished.png';
							dir = 'l2r';
						}
						$itemElem.find('.flow_arrow')
								 .css({left:left_arrow.toString()+'px',
									   width: w_arrow.toString()+'px',
									   height: h_arrow.toString()+'px'});
						//$itemElem.find('img').attr('src', linker_src);
						$canvas = $itemElem.find('canvas').attr({'width':w_arrow,'height':h_arrow});
						if (dir=='l2r') {
							_drawConnectLineL2R($canvas, '#888', true);
						}
						else if (dir=='lb2rt') {
							_drawConnectLineLB2RT($canvas, '#888', true);
						}
					}
				}
			}
		}
	}
	/*
	 * 產生會辦項目HTML DOM物件
	 */
	function _createCoworkItems($parent, xIndex, group) {
		/*
		 <div class="flow_cowork" style="top: 60px; left: 480px; width: 160px; height: 280px; z-index: 3;">
			<div class="flow_group flow_group_unfinished draggable" style="top: 40px; left: 20px; z-index: 5;">
			  <div class="flow_item_content">
				(順會)<br>
				祕書室<br>
				[尚未簽核]
			  </div>
			</div>
			<div class="flow_group flow_group_unfinished draggable" style="top: 190px; left: 20px; z-index: 5;">
			  <div class="flow_item_content">
				(順會)<br>
				資訊室<br>
				[尚未簽核]
			  </div>
			</div>
			<div class="coworkflow_header">
			  會辦流程
			  <div style="float:right;height:30px;width:80px;">
				<fieldset data-role="controlgroup" data-type="horizontal" class="ui-btn-right ui-corner-all ui-controlgroup ui-controlgroup-horizontal">
				  <div class="ui-radio"><input type="radio" name="radio-cowork-mode" id="radio-cowork-seq" value="seq" checked="checked"><label for="radio-cowork-seq" data-theme="c" class="ui-btn ui-btn-up-c ui-radio-on ui-btn-active ui-corner-left"><span class="ui-btn-inner ui-corner-left" aria-hidden="true"><span class="ui-btn-text">順會</span></span></label></div>
				  
				  <div class="ui-radio"><input type="radio" name="radio-cowork-mode" id="radio-cowork-multiflow" value="multiflow"><label for="radio-cowork-multiflow" data-theme="c" class="ui-btn ui-radio-off ui-corner-right ui-controlgroup-last ui-btn-up-c"><span class="ui-btn-inner ui-corner-right ui-controlgroup-last" aria-hidden="true"><span class="ui-btn-text">分會</span></span></label></div>
				  
				</fieldset>
			  </div>
			</div>
		 </div>
		 */
		
		var row_height = 160, // 列高 160px
			col_width = 160,  // 欄寬 160px
			groupItem_width = 120; // DOM object (flow item) width
			unfinished_groupItem_height = 60; // [未完成項目] DOM object (flow item) height
		
		var row_cnt = group.itemList.length;
		
		var itemLeft = 20;
		var itemTop = 50;
		
		var groupLeft = (xIndex*col_width);
		var groupTop = row_height - itemTop; // 非會辦流程項目顯示的y座標
		if (row_cnt>1) {
			if ((row_cnt % 2)===0) {
				// 會辦單位數為雙數 -> (0.5 + ((cnt/2)-1)) * 160
				groupTop = 0.5 * row_height - itemTop;
			}
			else {
				// 會辦單位數為單數 -> 
				groupTop = row_height - itemTop;
			}
		}
		
		var group_h = group.itemList.length * row_height;
		
		var $groupContainer = $('<div class="flow_cowork"></div>');
		
		// 會辦流程群組之位置及大小
		$groupContainer.css({left: groupLeft.toString() + 'px', top: groupTop.toString() + 'px',
							 width: col_width.toString() + 'px', height: group_h.toString() + 'px',
							 'z-index': 3});
		
		
		var groupItemCount = group.itemList.length;
		for(var i=0; i<groupItemCount; i++) {
			var rawItem = group.itemList[i];
			var $itemElem = _createFlowItemElement(rawItem, true); // 流程項目
			var withLinker = true;
							
			var top = itemTop + i * row_height;
			$itemElem.css({'top': top.toString() + 'px', 'left': itemLeft.toString() + 'px', 'z-index':'5'})
					 .appendTo($groupContainer);
			
			//		 
			// 流程項目左邊的"異動別"及"傳送箭頭"
			//
			if (withLinker) {
				//var arrow_src = ''; //IMAGE/WorkFlow/arrow_d_unfinished.png';
				var opacity = 1.0;
				var unfinished = false;
				var dir = 't2b';
				if (rawItem.Status=='0')  {// 未完成項目,左邊的箭頭為虛線
					//arrow_src = 'IMAGE/WorkFlow/arrow_unfinished.png';
					opacity = 0.5;
					unfinished = true;
				}
				
				var top_linker = 0, left_linker = 0, w_linker = 0, h_linker = 0;
				
				// 目前先實作順會顯示
				if (group.subType=='分會') {
				}
				else {
					if (i===0) {
						// 第一個 左下/右上
						arrow_src = '';
						top_linker = 30;
						w_linker = 38;
						if ((groupItemCount%2)===0) {
							h_linker = 80 + (groupItemCount / 4) * row_height;
						}
						else {
							h_linker = ((groupItemCount-1) / 2) * row_height;
						}
						dir = 'lb2rt';
						left_linker = -w_linker;
					}
					else {
						h_linker = 94;
						w_linker = 20;
						left_linker = (groupItem_width - w_linker) / 2;
						top_linker = -h_linker;
					}
				}
							
				var sLinker = '<div class="flow_arrow">' +
								'<canvas></canvas>' +
							  '</div>';
				var $linker = $(sLinker).css({top: top_linker.toString() + 'px',
											  left: left_linker.toString() + 'px',
											  width: w_linker + 'px',
											  height: h_linker + 'px',
											  'opacity' : opacity})
									  .appendTo($itemElem);
				var $canvas = $linker.find('canvas');
				$canvas.attr('width', w_linker);
				$canvas.attr('height', h_linker);
				if (dir=='t2b') {
					_drawConnectLineT2B($canvas, (unfinished?'#888':'#000'), unfinished);				  
				}
				else if (dir=='lb2rt') {
					_drawConnectLineLB2RT($canvas, (unfinished?'#888':'#000'), unfinished);				  
				}
			}
			
			if (withLinker && rawItem.TxName) {
				var top_tx = -30;
				var left_tx = 30;
				if (i===0) {
					top_tx = 10;
					left_tx = -30;
				}
				var sTxName = '<div class="flow_txname">' +
								  '<span>' + rawItem.TxName + '</span>' +
							  '</div>';
				var $tx = $(sTxName).css({'top': top_tx.toString()+'px',
										  'left': left_tx.toString()+'px'})
									.appendTo($itemElem);
			}
			
			$itemElem.data('rawItem', rawItem);
			
			theLogger.debug('col-index:' + xIndex + ' item created.');
		}
		
		// 順會/分會 mode setting
		var seq = (group.subtype=='順會') ? true : false;
		
		var $groupTitle =
			$('<div class="coworkflow_header">會辦流程' +
				'<div style="float:right;height:30px;width:80px;">' +
					'<fieldset data-role="controlgroup" data-type="horizontal" class="cowork-method ui-btn-right">' +
						'<input type="radio" name="radio-cowork-mode" id="radio-cowork-seq" value="seq" checked="checked"/>' +
						'<label for="radio-cowork-seq">順會</label>' +
						'<input type="radio" name="radio-cowork-mode" id="radio-cowork-multiflow" value="multiflow"/>' +
						'<label for="radio-cowork-multiflow">分會</label>' +
					'</fieldset>' +
				'</div>' +
			  '</div>').appendTo($groupContainer);
			
		$groupTitle.find('input [id=radio-cowork-seq]').prop('checked', seq);
		$groupTitle.find('input [id=radio-cowork-multiflow]').prop('checked', seq ? false : true);
			
		var $methods = $groupTitle.find('fieldset.cowork-method input[type="radio"]');
		$methods.on('change', function(event, ui) {
			// 2013.1.2 - radio box 被點擊時才會觸發, 故checked值必為'checked'
			var $this = $(this);
			var sId = $this.attr('id');
			var checked = $this.prop('checked');
			if (sId=='radio-cowork-seq') {
				if (group.subType!='順會') {
					_changeCoworkGroupMode($groupContainer, group, '順會');
				}
			}
			else if (sId=='radio-cowork-multiflow') {
				if (group.subType!='分會') {
					_changeCoworkGroupMode($groupContainer, group, '分會');
				}
			}
		});
		
		$groupContainer.appendTo($parent);
		return $groupContainer;
	}
	/*
	 * 取得預排流程項目的列數 -> 會辦群組中會辦單位最多項目之單位數.
	 */
	function _getRowCount(groupList) {
		var row_cnt = 1;
		for(var i=0; i<_groupList.length; i++) {
			var group = _groupList[i];
			if (group.type=='coworker') {
				var count = group.itemList.length;
				if (count>row_cnt) {
					row_cnt = count;
				}
			}
		}
		
		return row_cnt;
	}
	/*
	 * 解析ODWWKF-??.XML檔內容!
	 */
	function _parseODWWKF(xmldata) {
		/*
		 <item>
			<OWN_USER_ID>GD</OWN_USER_ID>
			<OWN_USER_NAME>波堤獅</OWN_USER_NAME>
			<OWN_OU_ID>022</OWN_OU_ID>
			<OWN_OU_NAME>人事室二科</OWN_OU_NAME>
			<OWN_ROLE_ID>OD21</OWN_ROLE_ID>
			<OWN_ROLE_NAME>科長</OWN_ROLE_NAME>
			<CREATE_BY>查爾斯一</CREATE_BY>
			<SEND_BY/>
			<SEND_TIME/>
			<ADDBY>1</ADDBY>
			<RADIO_SELECTED_1>1</RADIO_SELECTED_1>
			<SIGN_F msg_id='xxx'>Y</SIGN_F>
			<TX_NAME>送請簽核</TX_NAME>
		 </item>
		 */
		var wwkf = [];
		
		var $items = $(xmldata).find('item');
		for(var i=0; i<$items.length; i++)
		{
			var item = $items[i];
			var fieldnames = ['OWN_USER_ID', 'OWN_USER_NAME', 'OWN_OU_ID', 'OWN_OU_NAME', 'OWN_ROLE_ID',
							  'OWN_ROLE_NAME', 'CREATE_BY', 'SEND_BY', 'SEND_TIME', 'ADDBY',
							  'RADIO_SELECTED_1', 'SIGN_F', 'TX_NAME', 'MSG_ID'];
			var objAttrs = ['ownUserId', 'ownUserName', 'ownOUId', 'ownOUName', 'ownRoleId',
							  'ownRoleName', 'createBy', 'sendBy', 'sendTime', 'addBy',
							  'radioSelected1', 'signF', 'txName', 'msgId'];
			var wwkfItem = {};
			SSOUtil.convertXMLNodeToObj(item, fieldnames, wwkfItem, objAttrs);
			
			// UserId should be uppercase
			if (wwkfItem.ownUserId.length) {
				wwkfItem.ownUserId = wwkfItem.ownUserId.toUpperCase();
			}
			
			if (wwkfItem.signF==='Y' || wwkfItem.signF==='1') {
				wwkfItem.msgId = $(item).find('SIGN_F').attr('msg_id');
			}
			wwkf.push(wwkfItem);
		}
		
		return wwkf;
	}

	function _getWWKFContent(docObj, SAMLart) {
		var wwkf;
		
		// 叫用WebFileIO取得ODWWKF-00.XML
		var fileIOWSUrl = docObj.fileIOWS;
		var fileStoragePath = docObj.fileStoragePath;
		var fileSubDir = docObj.fileSubDir;
		
		var dirPath = fileStoragePath + '\\' + fileSubDir;
		var fileName = 'ODWWKF-00.XML';
		console.log('DocNo:' + docObj.docNo + ' WWKF path=' + dirPath + ', filename=' + fileName);
		
		//SAMLart = 'xxxxxxx'; //測試下載失敗!
		var userId = theSSO.User.account;
		var wfio = new WebFileIO(fileIOWSUrl, userId, SAMLart);
		wfio.download(dirPath, fileName, {
			async : false,
			success: function(fil, res) {
				if(fil !== undefined) {
					var xmldata = fil;
					wwkf = _parseODWWKF(xmldata);
				}
				else {
					theLogger.error("-E- WebFileIO呼叫成功但夾檔資料未下載");
				}
			},
			error: function(errorText) {
				theLogger.error('-E- _getWWKFContent download failed, ErrMsg=' + errorText);
			}
		});
		
		return wwkf;
	}
	
	/*
	 * 檢核清單內是否已有相同MsgId項目
	 */
	function _isExistFlowItem(flowItemList, msgId) {
		if (!!flowItemList && !!msgId && msgId.length) {
			for (var i=0; i<flowItemList.length; i++) {
				var flowItem = flowItemList[i];
				if (!!flowItem) {
					if (flowItem.MsgId===msgId) {
						return true;	
					}
				}
			}
		}
		return false;
	}
	/*
	// 產生公文辦理流程點
	// ToDo:
	//   1. 找出流程的第一筆 (a. 創稿, b. 來文)
	//   2. 判定目前流程點(WWKF最後一個SIGN_F="Y"之項目?)
	 */
	function _makeFlowData(wwkf, docToDoList, aolFlow, orgNode, docObj) {
		var _tflowData = [];
		
		// 取得<簽核流程>內容 (<簽核流程 Id="FLOW_0" 異動別="分文"/>)
		var _getAOLFlow = function(aolFlowList, msgId) {
			for(var i=0; i<aolFlowList.flows.length; i++) {
				var flow = aolFlowList.flows[i];
				if (flow.id == ('FLOW_'+msgId)) { // 2016.1.6 - bug-fix
					return flow;
				}
			}
			return null;
		};
		
		// ToDo: 取得<簽核點定義>內容(<簽核點定義 Id="sign_7687" URI="#FLOW_7687">)
		var _getAOLInfo = function(aolInfoList, msgId) {
			
		};
		
		var _getDocToDoListItem = function(docToDoList, msgId) {
			for(var i=0; i<docToDoList.length; i++)
			{
				var item = docToDoList[i];
				if (item.msgId==msgId) {
					return item;
				}
			}
			return null;
		};
		
		function _isLastSigned(wwkf, wwkfItem) {
			var item = null, itemLastSign = null;
			for (var i=0; i<wwkf.length; i++) {
				item = wwkf[i];
				if (!!item && item.signF=='Y') {
					itemLastSign = item;
				}
			}
			
			if (itemLastSign==wwkfItem) {
				return true;
			}
			
			return false;
		}
		
		// 2013.4 - ToDO: 尚未實作前簽流程處理
	
		var i=0;
		//
		// 暫時方案: 若docToDoList有<草稿><線上簽核>(or<紙本簽核>)的項目, 則為第一筆
		//
		// 2013.9 - ToDo: 封裝檔內草稿流程的MsgId與系統的MsgId不同, 應找出對應關係!!!
		//
		var draftItem, msgId, userId='', userInfo;
		for(i=0; i<docToDoList.length; i++)
		{
			var itemDTDL = docToDoList[i];
			if (itemDTDL.folder=='草稿')
			{
				msgId = itemDTDL.msgId;
				
				var itemAOL_draft = _getAOLFlow(aolFlow, msgId); //
				
				draftItem = {};
				draftItem.MsgId = msgId;
				draftItem.Unit = itemDTDL.ownOUName;
				draftItem.OUId = itemDTDL.ownOUId;
				draftItem.RoleId = itemDTDL.ownRoleId;
				draftItem.RoleName = SSOUtil.getOrgRoleName(orgNode, draftItem.OUId, draftItem.RoleId);
				draftItem.UserId = itemDTDL.ownUserId;
				draftItem.Name = '';
				if (!!draftItem.UserId && draftItem.UserId.length) {
					draftItem.UserId = draftItem.UserId.toUpperCase();
					userInfo = SSOUtil.getOrgUserInfo(orgNode, draftItem.OUId, draftItem.RoleId, draftItem.UserId);
					if (!!userInfo) {
                        draftItem.Name = userInfo.UserName;
                    }
				}
				draftItem.Portrait = 'IMAGE/WorkFlow/portrait_empty.png';
				if (draftItem.RoleId.length) {
					draftItem.Portrait = SSOUtil.getRoleIconPathname('', '', draftItem.RoleId);
				}
				draftItem.SignTime = itemDTDL.txTime;
				if (!!itemAOL_draft && !!itemAOL_draft.refChangeInfo) { // 2016.1.6 - 可能沒有定義refChangeInfo
					draftItem.Comment = itemAOL_draft.refChangeInfo.comment;
				}
				else {
					draftItem.Comment = ''; // 簽核意見
				}
				draftItem.Status = '1';
				draftItem.InCharge = true;
				draftItem.Folder = itemDTDL.folder;
				draftItem.SubFolder = itemDTDL.subfolder;
				draftItem.Limitation = {};
				draftItem.TxName = itemDTDL.txName;
				break;
			}
		}
		
		// ToDo: 由aolFlow取得職稱及簽核意見
	
		// 加入草稿流程項目
		if (!!draftItem) {
			_tflowData.push(draftItem);
		}
		
		msgId = '';
		var isCurrentFlow = false;
		// 以預排流程第一個流程點為主
		for(i=0; i<wwkf.length; i++) {
			var wwkfItem = wwkf[i];
			
			/*
			 *	2013.9 - 因暫不實作流程設定功能, 改成只分析到最後一筆已執行項目! (signF=='Y')
			*/
			var flowItem = null;
			isCurrentFlow = false;
			msgId = wwkfItem.msgId;
			if (wwkfItem.signF=='Y')
			{
				// 已簽核流程
							
				// 2013.6 - 若已有相同MsgId之項目, 則跳過
				if (!!msgId && msgId.length) {
					if (_isExistFlowItem(_tflowData, msgId)) {
						continue;
					}
				}
				
				// 2013.9 - 判定是否為目前簽核流程點!
				if (msgId===undefined || msgId==='')
				{
					if (docObj.ownOUId === wwkfItem.ownOUId &&
						docObj.ownRoleId === wwkfItem.ownRoleId &&
						docObj.ownUserId === wwkfItem.ownUserId)
					{
						isCurrentFlow = true;
						msgId = docObj.msgId;
					}
				}
				
				var item_DTDL = _getDocToDoListItem(docToDoList, msgId);
				if (item_DTDL===null) {
					theLogger.warn('msgId:' + msgId + '沒有DocToDoList項目');
					continue;
				}
								
				var item_AOL = _getAOLFlow(aolFlow, msgId);
				
				flowItem = {};
				flowItem.MsgId = item_DTDL.msgId;
				flowItem.Unit = item_DTDL.ownOUName;
				flowItem.OUId = item_DTDL.ownOUId;
				flowItem.RoleId = item_DTDL.ownRoleId;
				flowItem.RoleName = '';
				if (item_DTDL.ownRoleId==wwkfItem.ownRoleId) {
					flowItem.RoleName = wwkfItem.ownRoleName;
				}
				else {
					flowItem.RoleName = SSOUtil.getOrgRoleName(orgNode, flowItem.OUId, flowItem.RoleId);
				}
				flowItem.UserId = item_DTDL.ownUserId;
				if (flowItem.UserId.length) {
					flowItem.UserId = flowItem.UserId.toUpperCase();
				}
				//
				// ToDo: 尚未考慮代理人代簽情境!
				//
				flowItem.Name = wwkfItem.ownUserName;
				flowItem.Portrait = 'IMAGE/WorkFlow/portrait_empty.png';
				if (flowItem.RoleId.length) {
					flowItem.Portrait = SSOUtil.getRoleIconPathname('', '', flowItem.RoleId);
				}
				flowItem.SignTime = item_DTDL.txTime;
				if (!!item_AOL && !!item_AOL.refChangeInfo) { // 2016.1.6 - 可能沒有定義refChangeInfo
					flowItem.Comment = item_AOL.refChangeInfo.comment;// 簽核意見
				}
				else {
					flowItem.Comment = '';
				}
				
				/* ToDo: 判定是否為目前流程點? (目前流程點WWKF項目之SIGN_F="Y", 但msgId沒有值!)
				 */
				flowItem.Status = isCurrentFlow ? '2' : '1';
					
				flowItem.InCharge = (docObj.ownUserId == flowItem.UserId) ? true : false;
				flowItem.Folder = item_DTDL.folder;
				flowItem.SubFolder = item_DTDL.subfolder;
				flowItem.Limitation = {};
				flowItem.TxName = item_DTDL.txName;
				
				_tflowData.push(flowItem);
			}
			else if (wwkfItem.signF=='N') {
				// 2013.9 - P2/P3, 尚未簽核項目直接跳過
				continue;
			
				/*
				// 2013.6 - 若已有相同MsgId之項目, 則跳過
				if (!!msgId && msgId.length) {
					if (_isExistItem(_tflowData, msgId)) {
						continue;
					}
				}
				
				var item_AOL = _getAOLFlow(aolFlow, msgId);
				
				// 尚未簽核流程
				flowItem = {};
				flowItem.MsgId = '';
				flowItem.Unit = wwkfItem.ownOUName;
				flowItem.OUId = wwkfItem.ownOUId;
				flowItem.RoleId = wwkfItem.ownRoleId;
				flowItem.RoleName = wwkfItem.ownRoleName;
				flowItem.UserId = wwkfItem.ownUserId;
				flowItem.Name = wwkfItem.ownUserName;
				flowItem.Portrait = 'IMAGE/WorkFlow/portrait_empty.png';
				if (flowItem.RoleId.length) {
					flowItem.Portrait = SSOUtil.getRoleIconPathname('', '', flowItem.RoleId);
				}
				if (flowItem.UserId.length) {
					flowItem.UserId = flowItem.UserId.toUpperCase();
				}
				flowItem.SignTime = '';
				
				//
				// ToDo:
				//   1. 如何判斷是否為目前流程點? 目前以前一流程點為已簽核流程為準
				//   2. 取得各流程點的
				//
				if (_tflowData[_tflowData.length-1].Status=='1') {
					flowItem.Comment = '';
					//draftItem.Comment = _getCurrentFlowComment();
					flowItem.Status = '2';
					flowItem.Folder = docObj.folder;
					flowItem.SubFolder = docObj.subfolder;
				}
				else {
					flowItem.Comment = '';
					flowItem.Status = '0';
					flowItem.Folder = '';
					flowItem.SubFolder = '';
				}
				
				flowItem.InCharge = (docObj.ownUserId == flowItem.UserId) ? true : false;;
				flowItem.Limitation = {};
				flowItem.TxName = wwkfItem.txName;
				
				_tflowData.push(flowItem);
				*/
			}
		}
		
		
		if (_tflowData.length) {
			var lastFlowItem = _tflowData[_tflowData.length-1];
			if (lastFlowItem.OUId!=docObj.ownOUId ||
				lastFlowItem.RoleId!=docObj.ownRoleId ||
				lastFlowItem.UserId!=docObj.ownUserId) {
				
				/*
				 * 2015.5 - ODWMSG.OWN_OU_ID可能為空值! (給特定角色, 不限帳號!)
				 */
				userId = docObj.ownUserId;
				if (userId.length===0) {
					userId = theSSO.User.account;
				}
				
				// 預排流程沒有目前流程點項目,自行加入
				var _currFlow = {
					MsgId : docObj.msgId,
					Unit : docObj.ownOUName,
					OUId : docObj.ownOUId,
					RoleId : docObj.ownRoleId,
					RoleName : '',
					UserId : userId.toUpperCase(),
					Name : '',
					Status : '2',
					Folder : docObj.folder,
					SubFolder : docObj.subFolder,
					InCharge : false,
					Limitation : {},
					txName : docObj.txName
				};
				
				_currFlow.RoleName = SSOUtil.getOrgRoleName(orgNode, _currFlow.OUId, _currFlow.RoleId);
				userInfo = SSOUtil.getOrgUserInfo(orgNode, _currFlow.OUId, _currFlow.RoleId, _currFlow.UserId, '');
				if (userInfo!==null) {
					_currFlow.Name = userInfo.UserName;
				}
				else {
					theLogger.warn('Error! OrgInfo找不到使用者姓名,[OUId=' + _currFlow.OUId + ', RoleId=' + _currFlow.RoleId + ', UserId=' + _currFlow.UserId + ']');
					_currFlow.Name = '';
				}
				_currFlow.Portrait = SSOUtil.getRoleIconPathname('', '', _currFlow.RoleId);
				_currFlow.SignTime = '';
				_currFlow.Comment = '';
			}
		}
		else {
			// 沒有任何流程 => ERROR!!!
			theLogger.error('Error! _makeFlowData() _tflowData.length===0');
		}
		return _tflowData;
	}

	/*
	// 產生公文辦理流程點-Demo版暫行方案!!!
	// ToDo:
	//   1. 找出流程的第一筆 (a. 創稿, b. 來文)
	//   2. 判定目前流程點(DocToDoList最後一個項目)
	 */
	function _makeFlowData_DEMO(wwkf, docToDoList, aolFlow, orgNode, docObj) {
		var _tflowData = [];
		
		/* 排除特定公文夾項目: 通知, 會核中, 已送出
		 * 例外: 通知-回閱
		 */
		var _excludeFolders = [ '通知', '會核中', '已送出' ];
			
		// 取得<簽核流程>內容 (<簽核流程 Id="FLOW_0" 異動別="分文"/>)
		var _getAOLFlow = function(aolFlowList, msgId) {
			for(var i=0; i<aolFlowList.flows.length; i++) {
				var flow = aolFlowList.flows[i];
				if (flow.id == ('FLOW_'+msgId)) { // 2016.1.19 - Eric Peng, bug-fix
					return flow;
				}
			}
			return null;
		};
		
		/* ToDo: 取得<簽核點定義>內容(<簽核點定義 Id="sign_7687" URI="#FLOW_7687">)
		 *var _getAOLInfo = function(aolInfoList, msgId) {
		 *	
		 }*/
		
		var _getDocToDoListItem = function(docToDoList, msgId) {
			for(var i=0; i<docToDoList.length; i++)
			{
				var item = docToDoList[i];
				if (item.msgId==msgId) {
					return item;
				}
			}
			return null;
		};
		
		var i=0, j=0;
		/*
		 * 暫時方案:
		 *   1. 先把DocToDoList所有項目加入(最後一個項目即為目前流程)
		 *   2. ...
		 *
		 * 2013.9 - ToDo: 封裝檔內草稿流程的MsgId與系統的MsgId不同, 應找出對應關係!!!
		 */
		var currentMsgId = docObj.msgId;
		
		var flowItem, userInfo, userId='';
		for(i=0; i<docToDoList.length; i++)
		{
			var itemDTDL = docToDoList[i];
			
			// 排除特定文件夾(Ex.待處理-主辦, 已送出-線上簽核 etc...)
			var fExcludeFolder = false;
			var folderStr = itemDTDL.folder + '-' + itemDTDL.subfolder;
			for(j=0; j<_excludeFolders.length; j++)
			{
				var theFolderStr = _excludeFolders[j];
				if (itemDTDL.folder===theFolderStr) {
					if (theFolderStr==='通知') {
						//1110319	Joe		1101416		依系統參數修改回閱名稱
						// if (itemDTDL.subfolder!='回閱') {
						let RESIGN_SUBFOLDER = theSSO.User.SystemSets.get('RESIGN_SUBFOLDER');
						if ((typeof(RESIGN_SUBFOLDER) =='string' && RESIGN_SUBFOLDER != "" && itemDTDL.subfolder!=RESIGN_SUBFOLDER) || (RESIGN_SUBFOLDER == "" && itemDTDL.subfolder!='回閱')) {
							fExcludeFolder = true;
							break;
						}
					}
					else {
						fExcludeFolder = true;
						break;
					}
				}
			}
			
			if (fExcludeFolder) {
				theLogger.log('-I- 排除特定文件夾:' + folderStr + '項目, MsgId=' + itemDTDL.msgId);
				continue;
			}
			
			var msgId = itemDTDL.msgId;
			var itemAOL = _getAOLFlow(aolFlow, msgId);
			
			// 封裝檔草稿流程的MsgId與系統不同!
			if (itemAOL===null && aolFlow.flows.length && itemDTDL.folder=='草稿') {
				itemAOL = aolFlow[0];
			}
			
			flowItem = {};
			flowItem.MsgId = msgId;
			flowItem.Unit = itemDTDL.ownOUName;
			flowItem.OUId = itemDTDL.ownOUId;
			flowItem.RoleId = itemDTDL.ownRoleId;
			flowItem.RoleName = SSOUtil.getOrgRoleName(orgNode, flowItem.OUId, flowItem.RoleId);
			flowItem.UserId = itemDTDL.ownUserId ? itemDTDL.ownUserId : ''; // 2015.5 - ownUserId may be undefined.
			flowItem.Name = '';
			if (!!flowItem.UserId && flowItem.UserId.length) {
				flowItem.UserId = flowItem.UserId.toUpperCase();
				userInfo = SSOUtil.getOrgUserInfo(orgNode, flowItem.OUId, flowItem.RoleId, flowItem.UserId);
				// 2016.1.19 - 無法取得username問題.
				if (typeof userInfo == 'undefined' || userInfo===null || typeof (userInfo.UserName) == 'undefined' || userInfo.UserName===null) {
                    theLogger.log('Error! 無法取得使用者名稱: OUId=' + flowItem.OUId + ', RoleId=' + flowItem.RoleId + ',UserId=' + flowItem.UserId);
                }
				else {
					flowItem.Name = userInfo.UserName;
				}
			}
			flowItem.Portrait = 'IMAGE/WorkFlow/portrait_empty.png';
			if (flowItem.RoleId.length) {
				flowItem.Portrait = SSOUtil.getRoleIconPathname('', '', flowItem.RoleId);
			}
			flowItem.SignTime = itemDTDL.txTime;
			
			// 簽核意見
			if (!!itemAOL && !!itemAOL.refChangeInfo) { // 2016.1.19 - Eric Peng, bug-fix
				flowItem.Comment = itemAOL.refChangeInfo.comment;
			}
			else {
				flowItem.Comment = '';
			}
			
			if (currentMsgId==msgId) {
				flowItem.Status = '2';
				
				// 2015.5 - 目前流程點給userId
				if (flowItem.UserId.length===0) {
					userId = theSSO.User.account;
					if (userId.length) {
						userInfo = SSOUtil.getOrgUserInfo(orgNode, flowItem.OUId, flowItem.RoleId, userId);
						if (!!userInfo) {
							flowItem.UserId = userId;
							flowItem.Name = userInfo.UserName;
						}
					}
				}
			}
			else {
				flowItem.Status = '1';
			}
			flowItem.InCharge = true;
			flowItem.Folder = itemDTDL.folder;
			flowItem.SubFolder = itemDTDL.subfolder;
			flowItem.Limitation = {};
			flowItem.TxName = itemDTDL.txName;
			
			_tflowData.push(flowItem);
		}
		
		if (_tflowData.length) {
			var lastFlowItem = _tflowData[_tflowData.length-1];
			if (lastFlowItem.MsgId.length===0 &&
				(lastFlowItem.OUId!=docObj.ownOUId ||
				lastFlowItem.RoleId!=docObj.ownRoleId ||
				lastFlowItem.UserId!=docObj.ownUserId))
			{	
				/*
				 * 2015.5 - ODWMSG.OWN_OU_ID可能為空值! (給特定角色, 不限帳號!)
				 */
				userId = docObj.ownUserId;
				if (userId.length===0) {
					userId = theSSO.User.account;
				}
					
				// 預排流程沒有目前流程點項目,自行加入
				var _currFlow = {
					MsgId : docObj.msgId,
					Unit : docObj.ownOUName,
					OUId : docObj.ownOUId,
					RoleId : docObj.ownRoleId,
					RoleName : '',
					UserId : userId.toUpperCase(),
					Name : '',
					Status : '2',
					Folder : docObj.folder,
					SubFolder : docObj.subFolder,
					InCharge : false,
					Limitation : {},
					txName : docObj.txName
				};
				
				_currFlow.RoleName = SSOUtil.getOrgRoleName(orgNode, _currFlow.OUId, _currFlow.RoleId);
				userInfo = SSOUtil.getOrgUserInfo(orgNode, _currFlow.OUId, _currFlow.RoleId, _currFlow.UserId, '');
				if (userInfo!==null) {
					_currFlow.Name = userInfo.UserName;
				}
				else {
					theLogger.warn('Error! OrgInfo找不到使用者姓名,[OUId=' + _currFlow.OUId + ', RoleId=' + _currFlow.RoleId + ', UserId=' + _currFlow.UserId + ']');
					_currFlow.Name = '';
				}
				_currFlow.Portrait = SSOUtil.getRoleIconPathname('', '', _currFlow.RoleId);
				_currFlow.SignTime = '';
				_currFlow.Comment = '';
			}
		}
		else {
			// 沒有任何流程 => ERROR!!!
			theLogger.error('Error! _makeFlowData() _tflowData.length===0');
		}
		return _tflowData;
	}
	
	/*
	 * 取得目前未簽核流程點的FOLDER/SUBFOLDER (由MenuRuleAOL推導得)
	 */
	function _calcFlowFolder(_groupList, menuRule) {
		var flowList = [];
		for(var i=0; i<_groupList.length; i++)
		{
			var group = _groupList[i];
			if (group.type=='item') {
				flowList.push(group.item);
			}
		}
		
		var prevFolder='', prevSubfolder='';
		for(i=0; i<flowList.length; i++)
		{
			var flowItem = flowList[i];
			if (flowItem && flowItem.Status=='0') // 未簽核項目
			{
				var nFolder = menuRule.getNextFolder(prevFolder, prevSubfolder, flowItem.TxName);
				if ((nFolder===null) || (typeof nFolder=='undefined'))
				{
					theLogger.error('-ERR- 單位:' + flowItem.OUId + ', 人員:' + flowItem.Name + ', TxName:' +
								flowItem.TxName + '無法取得FOLDER/SUBFOLDER');
					return false;
				}
				else {
					theLogger.log('單位:' + flowItem.OUId + ', 人員:' + flowItem.Name + ', TxName:' +
								flowItem.TxName + 'FOLDER/SUBFOLDER=' + nFolder.nextfolder + '/' + nFolder.nextsubfolder);
					flowItem._nextFolder = nFolder;
				}
			}
			else if (typeof flowItem == 'undefined') {
				theLogger.error('-ERR- item#' + (i+1) + ' is undefined.');
				return false;
			}
			
			if (flowItem.Status=='0') {
				prevFolder = flowItem._nextFolder.nextfolder;
				prevSubfolder = flowItem._nextFolder.nextsubfolder;
			}
			else {
				prevFolder = flowItem.Folder;
				prevSubfolder = flowItem.SubFolder;
			}
			
			if ((typeof prevFolder == 'undefined') ||
				(typeof prevSubfolder == 'undefined'))
			{
				theLogger.error('Error! _calcFlowFolder, preFolder or preSubFolder is undefined...');
			}
			
			// 若有無法推導項目, 則停止後續作業!
			if (prevFolder.length===0 || prevSubfolder.length===0) {
				break;
			}
		}
		
		return true;
	}
	
	// 建立完整公文流程資訊(包含已簽核及預排流程)
	function _setupFlowData(docObj, SAMLart) {
		var wwkf = _getWWKFContent(docObj, SAMLart);
		var docToDoList = [];
		if (!docObj.isDraft) {
			docToDoList = SSOUtil.getDocToDoList(docObj.docNo, SAMLart);
		}
		
		// 2013.5 - 取得封裝檔流程內容
		var _eCaps = theAOL.signFolder.eCaps();
		var aolFlow = _eCaps.capsCntn.eFile.aol.aolFlow;
		var aolInfo = _eCaps.capsCntn.eFile.aol.aolInfo;
		
		var orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo);
		
		if (wwkf && wwkf.length &&
			docToDoList && docToDoList.length &&
			aolFlow && orgNode && docObj)
		{
			// 2014.1 - Demo版先用_makeFlowData_DEMO函式
			// 動態產生公文流程內容!
			//var _flows = _makeFlowData(wwkf, docToDoList, aolFlow, orgNode, docObj);
			var _flows = _makeFlowData_DEMO(wwkf, docToDoList, aolFlow, orgNode, docObj);
				
			if (_flows.length) {
				theAOL.flowData.slice(0, theAOL.flowData.length);
				theAOL.flowData = theAOL.flowData.concat(_flows);
			}
			theLogger.log('theAOL.flowData count=' + theAOL.flowData.length);
		}
	}
	/*
	 * 由預排流程內容轉出HTML DOM之流程項目
	 */
	function _initFlowItems($parent) {
		var row_height = 160; // 列高 160px
		var coworkItemCount = 0;
		
		/* 計算列數,
		//   沒有會辦 -> 1列
		//   有會辦:
		//     內會 -> 1個內會單位一列
		 *     外會 -> 1個會辦一級單位一列
		 */
		var row_cnt = 1;
		var cowork_units = [];
		var fCoworker = false;
		
		var $itemElem;
		
		var docObj = theAOL.docObj;
		var SAMLart = window.localStorage.Artifact;
		if (docObj && theAOL.flowData.length===0 && (typeof SAMLart!=='undefined') && SAMLart!==null)
		{
			_setupFlowData(docObj, SAMLart);
		}
		
		//
		// 1. 將辦理流程區群組
		//    承辦人 + 同二級單位 + [內會(相同一級單位不同二級單位)] + [同一級單位] + [會辦(不同一級單位)] + [決行] + [後會]
		//	
		_groupList = _groupFlowItems(theAOL.flowData, sICOUId);
		
		// 2013.4 - 計算各個未簽核流程點的FOLDER/SUBFOLDER
		var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
		_calcFlowFolder(_groupList, menuRule);
		
		row_cnt = _getRowCount(_groupList);
		
		/* Dev. 試算行數定位
		{
			// 目標: 2-> 1, 3,4 -> 2, 5,6 -> 3
			var rslt = '';
			var part = '';
			for(var k=2; k<10; k++)
			{
				var shift_cnt = parseInt(k/2) + (k % 2);
				
				part = 'item count=' + k + ', shift_cnt=' + shift_cnt + '\r\n';
				rslt += part;
			}
			alert(rslt);
		}*/
		
		var normal_flow_top = row_height; // 非會辦流程項目顯示的y座標
		if (row_cnt>1) {
			normal_flow_top = (parseInt(row_cnt/2) + (row_cnt % 2)) * row_height;
		}
		
		// 目前先實作會辦項目未展開(一個會辦單位只有一個流程項目)
		var groupIndex = 0;
		var prevCoworkerCount = 0;
		for(i=0; i<_groupList.length; i++) {
			var group = _groupList[i];
			
			if (group.type=='coworker') {
				$itemElem = _createCoworkItems($parent, i, group);
				$itemElem.data('groupItem', group);
				groupIndex += 1; // 目前實作,會辦流程項目只會佔一行
				prevCoworkerCount = group.itemList.length;
			}
			else if (group.type=='item')
			{
				var rawItem = group.item;
				var withLeftArrow = (i===0) ? false : true; // 是否產生左邊的"異動別"及"傳送箭頭"
				fCoworker = _isCoworker(sICOUId, rawItem.OUId);
				
				$itemElem = null;
				if (prevCoworkerCount>0) {
					$itemElem = _createFlowElem(withLeftArrow, groupIndex, rawItem, prevCoworkerCount);
				}
				else {
					$itemElem = _createFlowElem(withLeftArrow, groupIndex, rawItem);
				}
				$itemElem.appendTo($parent);
				
				groupIndex += 1;
				prevCoworkerCount = 0;
			}
		}
		
		// 2013.2.1 測試畫線
		if (true) {
			var $canvas = $('#draw_canvas #exCanvas');
			_drawConnectLineLB2RT($canvas, '#888');
			_drawConnectLineL2R($canvas, '#F88', true);
			_drawConnectLineT2B($canvas, '#F88', true);
		}
	}
	
	/*
	 * 將異動別文字以指定長度斷行
	 */
	function _separateTxName(TxName) {
		var line_length = 2; // 二個字一行
		var text_length = TxName.length;
		
		var tx_parts = [];
		
		var idx = 0;
		while(idx<text_length)
		{
			var part = '';
			if (text_length >= (idx+line_length-1)) {
				part = TxName.substr(idx, line_length);
			}
			else {
				var max_index = text_length - 1;
				var remain = max_index - idx + 1;
				part = TxName.substr(idx, remain);
			}
			tx_parts.push(part);
			idx+=line_length;
		}
		
		return tx_parts;
	}
	
	/*
	 * 目的: 產生非會辦流程項目的HTML DOM物件
	 */
	function _createFlowElem(
		withLeftArrow, // 是否產生左邊的傳送箭頭
		groupIndex,	   // column-index (for layout engine)
		rawItem,	   // 流程項目內容	
		prevCoworkerCount)// 前一流程是否為會辦	   
	{
		//var prevGroupItemCount = 4;
		
		var col_width = 160;
		var row_height = 160;
		var left_border = 20;
		
		var row_cnt = _getRowCount(_groupList);
		var normal_flow_top = row_height; // 非會辦流程項目顯示的y座標
		if (row_cnt>1) {
			normal_flow_top = (parseInt(row_cnt/2) + (row_cnt % 2)) * row_height;
		}
		
		var $newFlowElem = _createFlowItemElement(rawItem, false); // 流程項目
		var top = normal_flow_top;
		var left = (groupIndex*col_width) + left_border;
		$newFlowElem.css({'top': top.toString() + 'px', 'left': left.toString() + 'px', 'z-index': '5'});
				 
		// 流程項目左邊的"異動別"及"傳送箭頭"
		if (withLeftArrow) {
			var opacity = 1.0;
			var dir = 'l2r';
			var unfinished = false;
			
			if (!!prevCoworkerCount && prevCoworkerCount>0) {
				if (rawItem.Status == '0') {
					// 2013.1 - 改以Canvas畫出連接線
					dir = 'lb2rt'; //'IMAGE/WorkFlow/arrow_lt_unfinished-2.png';
					opacity = 0.5;
					unfinished = true;
				}
				else {
					dir = 'lb2rt';
				}
			}
			else {
				if (rawItem.Status=='0')  {// 未完成項目,左邊的箭頭為虛線
					opacity = 0.5;
					unfinished = true;
				}
			}
			var sArrow = '<div class="flow_arrow">' +
							'<canvas></canvas>' +
						 '</div>';
	
			var top_arrow = 40;
			var left_arrow = -38;
			var w_arrow = 38;
			var h_arrow = 20;
			if (!!prevCoworkerCount && prevCoworkerCount>0) {
				// 左下 -> 右上箭頭
				if ((prevCoworkerCount%2)===0) {
					h_arrow = 75 + (prevCoworkerCount/4) * row_height;
				}
				else {
					h_arrow = ((prevCoworkerCount-1)/2) * row_height;
				}
				left_arrow = -34;
				w_arrow = 36;
			}
			var $arrow = $(sArrow).css({'top': top_arrow.toString() + 'px',
										'left': left_arrow.toString() + 'px',
										'width': w_arrow.toString() + 'px',
										'height': h_arrow.toString() + 'px',
										'opacity' : opacity})
								  .appendTo($newFlowElem);
								  
			var $canvas = $arrow.find('canvas');
			$canvas.attr('width', w_arrow);
			$canvas.attr('height', h_arrow);
			if (dir=='lb2rt') {
				_drawConnectLineLB2RT($canvas, (unfinished?'#ccc':'#000'), unfinished);
			}
			else if (dir=='l2r') {
				_drawConnectLineL2R($canvas, (unfinished?'#ccc':'#000'), unfinished);
			}
		}
		
		if (withLeftArrow && rawItem.TxName) {
			var top_tx = 15;
			var left_tx = -30;
			
			var sTxName = '<div class="flow_txname"><span>';
			
			// 二字為一行切出TxName
			var txList = _separateTxName(rawItem.TxName);
			var cnt = txList.length;
			for(var x=0; x<cnt;x++) {
				var tx_part = txList[x] + ((x==(cnt-1)) ? '' : '<br />');
				sTxName += tx_part;
			}
			
			sTxName += '</span></div>';
			
			$(sTxName).css({'top': top_tx.toString()+'px',
									  'left': left_tx.toString()+'px'})
			.appendTo($newFlowElem);
		}
		
		$newFlowElem.data('rawItem', rawItem);
		return $newFlowElem;
	}
	
	this.initFlowItems = _initFlowItems;
	this.createFlowElem = _createFlowElem;
	this.setupFlowData = _setupFlowData;
	//this.calcFlowFolder = _calcFlowFolder;
} // End of FlowBuilder

/* 目的: 建立線上簽核公文傳送選單項目 (P2先實作下列TO_OU: B/O2/H/G/D)
 *
 * 參數:
 *	currentFlow: 目前流程點資訊
 *	menuRule: 公文隸屬機關的MenuRule
 *	orgNode: OrgInfo.xml的<OrgInfo> node
 *	docObj: 公文基資
 *  options: 其它設定
 *	mode: 'submitTargets' -> 傳送子視窗項目, 'presetTargets' -> 預排流程項目
 */
function _buildEDocNextOptions(currentFlow, menuRule, orgNode, docObj, options) {
	if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
		theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + ' -tm- _buildEDocNextOptions BEGIN...');
		window.tmBeginBuildNextOptions = Date.now();
	}	

	// 2016.10.4 - bug-fix
	var approved = (docObj.appUserId.length || docObj.appRoleId.length) ? true : false;
	var rejected = (!approved && docObj.rejectUserName.length) ? true : false;
	
	var _options = $.extend({ 'approved':approved,
							  'rejected':rejected },
							options);
	
	// 系統定義的常數
	var SYS_CONST = window.sso_const;
	var _docObj = docObj;
	
	// 取得承辦人角色資訊時應排除的角色代碼.
	var excludeRoleList = ['OD16', 'OD17', 'OD97'];
	var _basicValidNext = ['B', 'O2', 'H', 'G', 'D'];
		
	/* 目前已實作的TO_OU代碼: B, O2, H, G, D
	 * P2 9/24已實作: Basic valid Next = B,O2,H,G,D, extra valid next=O1,M,B-,E,L,A
	 */
	function _isValidNext(next) {
		// 2014.9 - 完整功能測試
		var validAll = true;
		if (validAll) {
			return true;
		}
	
		/* 'B'送請簽核+一層決行單位, 'O2'送請簽核+組室及科內長官,
		 * 'H'退分辦人員/送登記桌銷號, 'G'送繕校, 'D'退回承辦人 */
		var _validNext = _basicValidNext; // ['B', 'O2', 'H', 'G', 'D'];
		
		/* P2 ToDo:
		 *    'O1' 內會, 'M' 順會/後會, 'B-' 複閱, 'E' 送單位發文, 'L' 歸檔,
		 *    'E' (Next Role='OD11:OD12:OD13') 退回承辦單位長官, [EMPTY]辦畢, [EMPYT]分會,
		 *    'A' 順會至人
		 * ToDo:'I' 退回總收, 'O2'複閱,  'E'送單位發文,
		 *		'C'送銷號, */
		for(var i=0; i<_validNext.length; i++)
		{
			if (_validNext[i]==next) {
				return true;
			}
		}
		
		theLogger.log('next:"' + next + '" not in basic valid next.\n');
		
		// 若有設定額外的TO_OU, 增加檢核項目!
		if (_options.extraValidNext && _options.extraValidNext.length) {
			for(i=0; i<_options.extraValidNext.length; i++)
			{
				if (_options.extraValidNext[i]==next) {
					theLogger.log('next:"' + next + '" in _options.extraValidNext list.\n');
					return true;
				}
			}	
		}
		return false;
	}
	
	/*
	 * 檢核是否為: <NEXT>項目為空值, 目前已實作支援的異動別!
	 */
	function _isValidEmptyTx(txName) {
		switch (txName) {
		case '辦畢':
		case '分會':
			return true;
		}
		return false;
	}
	/*
	 * 取得TO_OU之傳送對象:[單位]/[角色]/[人員]
	 */
	function _getNextOptLvl(next) {
		switch(next) {
		case 'M': case 'M2': case 'M3':
		case 'M4': case 'P4': case 'P5':
			return SYS_CONST.OptLvl_Unit;
		case 'B': case 'B-': case 'C': case 'E': case 'E1':
		case 'E2': case 'E3': case 'F': case 'G': case 'H':
		case 'H2': case 'I': case 'L': case 'N': case 'O4':
		case 'Z':
			return SYS_CONST.OptLvl_Role;
		default:
			return SYS_CONST.OptLvl_User;
		}
	}
	/*
	 * TO_OU是否可以不列出人員(只顯示角色)
	 */
	function _canNextDropOccupant(next) {
		switch(next) {
		case 'C': case 'E': case 'E1': case 'E2': case 'E3':
		case 'F': case 'G': case 'H': case 'H2': case 'I':
		case 'L': case 'N': case 'Z': // 2016.9.4 - 新增'Z'->會簽人員
			return true;
		}
		return false;
	}

	function _getUnitNode(orgNode, unitNo) {
		if (orgNode && unitNo && unitNo.length)
		{
			if (orgNode)
			{
				var $orgNode = $(orgNode);
				var xpath = 'Unit[UnitCode="' + unitNo + '"]';
				var unitNode = ($orgNode.find(xpath))[0];
				if (unitNode)
				{
					return unitNode;
				}	
				else {
					theLogger.warn('-W- _getUnitNode() 找不到UnitNo=[' + unitNo + ']的 <Unit> node.');
				}
			}
		}
		else {
			theLogger.error('-ERR- _getUnitNode() invalid orgNode/unitNo');
		}
		return null;
	}
	
	function _getRoleNode(unitNode, roleNo) {
		if (!!unitNode && roleNo.length)
		{
			var rolePath = 'Role[RoleNo="' + roleNo + '"]';
			if (unitNode)
			{
				var roleNode = ($(unitNode).find(rolePath))[0];
				if (roleNode)
				{
					return roleNode;
				}	
				else {
					theLogger.warn('-W- _getRoleNode() 找不到RoleNo=[' + roleNo + ']的 <Role> node.');
				}
			}
		}
		return null;
	}
	
	function _getRoleOccupants(roleNode, excludeProxy) {
		excludeProxy = (typeof excludeProxy=='boolean' && excludeProxy===false) ? false : true;
		
		if (!!roleNode)
		{
			var roleOccupants = [];
			var occupantPath = 'RoleOccupant';
			if (roleNode)
			{
				var $occupantNodes = $(roleNode).find(occupantPath);
				var i = 0, cnt = $occupantNodes.length;
				var occupantNode;
				for(i=0; i<cnt; i++)
				{
					occupantNode = $occupantNodes[i];
					var account = SSOUtil.xml_getChildNodeValue(occupantNode, 'Account');
					var name = SSOUtil.xml_getChildNodeValue(occupantNode, 'Name');
					var isProxy =  SSOUtil.isValueTrue(SSOUtil.xml_getAttrValue(occupantNode, 'IsProxy'));
					
					if (!!account && account.length &&
						!!name && name.length && (!isProxy || !excludeProxy)) {
						roleOccupants.push({'account': account, 'name': name});
					}
				}
				return roleOccupants;
			}
		}
		return null;
	}
	
	function _getRoleTargets(next, orgNode, toOUId, toRoleId, saveTargets) {
		var cntStart = saveTargets.length;
		
		var nextToRole = (_getNextOptLvl(next)===SYS_CONST.OptLvl_Role) ? true : false;
			
		var unitNode = _getUnitNode(orgNode, toOUId);
		var unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
		var roleNode = _getRoleNode(unitNode, toRoleId);
		
		var roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
		var roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
		var newTarget = null;
		
		// 2013.5 - 列舉目前流程點的所有傳送對象(非預排流程)時才加入角色代表選項
		if ((typeof(_options.mode)!='undefined') && _options.mode=='submitTargets') {
			if (nextToRole) { //不排除任何項目
				newTarget = {
					toOU: next,
					toOUId: toOUId,
					toOUName: unitName,
					toRoleId: roleNo,
					toRoleName: roleName,
					finalTarget: true,
					present: 'role', // 此為角色代表
				};
				
				saveTargets.push(newTarget);
			}
		}
			
		var occupants = _getRoleOccupants(roleNode);
		if (occupants!==null) {
			for(var i=0; i<occupants.length; i++)
			{
				var occupant = occupants[i];
				newTarget = {
					toOU: next,
					toOUId: toOUId,
					toOUName: unitName,
					toRoleId: roleNo,
					toRoleName: roleName,
					toUserId: occupant.account,
					toUserName: occupant.name,
					finalTarget: true
				};
				if (newTarget.toUserId.length) {
					newTarget.toUserId = newTarget.toUserId.toUpperCase();
				}
				saveTargets.push(newTarget);
			}
		}
		
		var cntFinish = saveTargets.length;
		return (cntFinish-cntStart);
	}
		
	function _setupDropDownListItems(orgNode, option, ownUser, inchargeUser, saveTargets) {
		var txName = option.txName;
		var next = option.next;
		
		theLogger.log('OPTION NEXT=' + option.next + ', TX_NAME=' + txName + ' enumerate targets start...');
		
		// 作業前既有項目
		var cntBefore = saveTargets.length;
		
		var cTarget = menuRule.getCTarget(next);
		if (cTarget && (cTarget.option.length>0)) {
			_buildDDLItemsFromTarget(option, cTarget, saveTargets);
			//1140808	Leslie[退輔序65]	修正有CTarget對象時需回傳true，避免無法組出傳送對象
			//return;
			return true;
		}
		
		if (!!option.ownOUId && option.ownOUId.length) {
			// 篩選項目,OwnOUId相同者才列出
			if (option.ownOUId!=ownUser.OUId) {
				theLogger.log('OPTION.OWN_OU_ID=' + option.ownOUId + ', 不列入 (OwnOUId==' + ownUser.OUId + ')');
				return;
			}
			else {
				theLogger.log('OPTION.OWN_OU_ID=' + option.ownOUId + ', 與OwnOUId一致, 列入!');
			}
		}
		
		// 2015.5 - 問題單1040445, 若option有指定ouLen, 則檢核目前ownOUId長度是否符合
		if (!!option.ouLen && option.ouLen.length) {
			var len = parseInt(option.ouLen);
			if (len>0) {
				if (ownUser.OUId.length!=len) {
					theLogger.log('option.ouLen=' + option.ouLen + ', 不列入 (OwnOUId==' + ownUser.OUId + ')');
					return;
				}
			}
		}
			
		if (next==='A') {
			theLogger.debug('next="A", tracing...');
		}
			
		// 2015.6 - 公文可能尚未有承辦人
		if (inchargeUser===null) {
			_getDDL1Items(option, orgNode, '', '', ownUser.OUId, _docObj.isDraft, saveTargets);
		}
		else {
			_getDDL1Items(option, orgNode, inchargeUser.OUId, inchargeUser.UserId, ownUser.OUId, _docObj.isDraft, saveTargets);
		}
		
		//1140808	Leslie[退輔序65]	新增判別是否有可用的傳送對象
		var hasValidTarget = false;
		
		// 只針對本次新增項目加入!
		for(var i=cntBefore; i<saveTargets.length; i++) {
			var targetLv1 = saveTargets[i];
			if (targetLv1.finalTarget===true) {
				//1140808	Leslie[退輔序65]	新增判別是否有可用的傳送對象
				hasValidTarget = true;
				continue;
			}
			if ((typeof (targetLv1.toRoleId) != 'undefined') && targetLv1.toRoleId.length)
			{
				// 該項目為角色資訊
				targetLv1.options = [];
				//1140808	Leslie[退輔序65]	新增判別是否有可用的傳送對象
				// _getRoleTargets(next, orgNode, targetLv1.toOUId, targetLv1.toRoleId, targetLv1.options);
				var nLen = _getRoleTargets(next, orgNode, targetLv1.toOUId, targetLv1.toRoleId, targetLv1.options);
				if(nLen > 0)
					hasValidTarget = true;
			}
			else {
				// 該項目為單位資訊
				targetLv1.options = [];
				
				var unitNode = _getUnitNode(orgNode, targetLv1.toOUId);
				if (inchargeUser===null) {
					/* 2015.6 - OwnOUId 參數 bug fix */
					_getDDL2Items(option, unitNode, '', ownUser.OUId, targetLv1, _docObj.isDraft, targetLv1.options);
				}
				else {
					_getDDL2Items(option, unitNode, inchargeUser.OUId, ownUser.OUId, targetLv1, _docObj.isDraft, targetLv1.options);
				}
				
				//1140827	Leslie[退輔序65]	新增判別是否有可用的傳送對象
				if(targetLv1.options.length === 0){
					saveTargets.splice(i--,1);	//移除沒有傳送對象的單位
					continue;
				}
				
				for(var j=0; j<targetLv1.options.length; j++)
				{
					var targetLv2 = targetLv1.options[j];
					
					if (targetLv2.finalTarget===true) {
						//1140808	Leslie[退輔序65]	新增判別是否有可用的傳送對象
						hasValidTarget = true;
						continue;
					}
					
					if (typeof targetLv2.options !== 'undefined' && targetLv2.options.length) {
						//1140808	Leslie[退輔序65]	新增判別是否有可用的傳送對象
						hasValidTarget = true;
						continue;
					}
					
					targetLv2.options = [];
					if ((typeof (targetLv2.toRoleId) != 'undefined') && // 傳送對象的toRoleId有定義
						targetLv2.toRoleId.length && // 傳送對象的toRoleId不為空白
						((typeof (targetLv2.toUserId) == 'undefined') || (targetLv2.toUserId.length===0)))  // 傳送對象的toUserId未定義或為空白
					{
						var unitNode2 = _getUnitNode(orgNode, targetLv2.toOUId);
						var roleNode = _getRoleNode(unitNode2, targetLv2.toRoleId);
						
						var enumTargets = [];
						_getAllTargets_RoleNode(next, roleNode, targetLv2.toOUId, targetLv2.toOUName, enumTargets);
						
						for(var k=0; k<enumTargets.length; k++)
						{
							var targetLv3 = enumTargets[k];
							
							// 若next為'O1',須排除本件公文的承辦人
							
							var inchargeUserId = '';
							if (inchargeUser!==null) {
								inchargeUserId = inchargeUser.UserId;
							}
							if (next=='O1' && (targetLv3.toOUId==docObj.ICOUId) &&
								((typeof (targetLv3.toRoleId)!='undefined') && (targetLv3.toUserId==inchargeUserId)))
							{
								theLogger.log('排除承辦人:OUId=' + targetLv3.toOUId + ', UserId=' + targetLv3.toUserId);
								continue;
							}
							
							//1140808	Leslie[退輔序65]	新增判別是否有可用的傳送對象
							hasValidTarget = true;
							
							targetLv2.options.push(targetLv3);
						}
					}
				}
			}
		}
		
		//1140808	Leslie[退輔序65]	新增判別是否有可用的傳送對象
		if(!hasValidTarget)
			theLogger.log('OPTION NEXT=' + option.next + ', TX_NAME=' + option.txName + ' 沒有可用的傳送對象.');
				
		// save as text file:
		{
			//var BOM = '\xFEFF';
			theLogger.log('OPTION NEXT=' + option.next + ', TX_NAME=' + option.txName + ' enumerate targets finished.');
		}
		
		//1140808	Leslie[退輔序65]	新增判別是否有可用的傳送對象
		return hasValidTarget;
	}
	
	function _getDDL1Items(option, orgNode, ICOUId, ICUserId, ownOUId, isDraft, saveTargets) {
		var next = option.next;
		var cntStart = saveTargets.length;
		var cntFinish = 0;
		var unitNode, roleNode;
		
		// 單位要有指定的角色才列出!
		var sShowUnitRoleId = menuRule.ruleEnvSetting.showUnitRoleId;
		if (typeof sShowUnitRoleId === 'undefined') {
			sShowUnitRoleId = '';
		}
		
		// 允許只列出角色項目 (不列出該角色人員)
		var canHideTarget = _canNextDropOccupant(next);
		
		// 是否列出人員
		var showOccupantTarget = menuRule.ruleEnvSetting.showOccupant;

		var $units, occupants, userInfo;
		var unitNo, unitName, roleNo, roleName, virtual;
		var target=null, uniqueTarget=null, unit_xn;
		var targetOUId, $subUnits, subUnit, subUnitNo;
		var i=0; j=0;
		if (next==='M' || next==='A' || next==='M3') {
			/* 1. 所有一級單位
			 * 2. 排除[承辦]及[公文目前所在]一級單位
			 * 3. 排除一層決行單位
			 * 4. 排除虛擬單位
			 */
			var fToUnit = false;
			var fNextToUnit = (_getNextOptLvl(next) == SYS_CONST.OptLvl_Unit) ? true : false;
			if (fNextToUnit && (option.optLvl == SYS_CONST.OptLvl_Unit)) {
				fToUnit = true;
			}
			
			var lv1InchargeUnitNo = (ICOUId.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) ? ICOUId.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN) : ICOUId;
			var lv1OwnUnitNo = (ownOUId.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) ? ownOUId.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN) : ownOUId;
			var containShowUnitRole = false;
			
			$units = $(orgNode).find('OrgInfo > Unit');
			for (j=0; j<$units.length; j++)
			{
				unit_xn = $units[j];
				unitNo = SSOUtil.xml_getChildNodeValue(unit_xn, 'UnitNo');
				virtual = SSOUtil.xml_getChildNodeValue(unit_xn, 'Virtual');
				
				unitNode = _getUnitNode(orgNode, unitNo);
					
				if (virtual==SYS_CONST.LV1_APPROVE_UNIT_VIRTUAL_CODE ||
					virtual==SYS_CONST.VIRTUAL_UNIT_VIRTUAL_CODE ||
					unitNo==lv1InchargeUnitNo || unitNo==lv1OwnUnitNo) {
					continue; // 一層決行單位 / 虛擬單位 / 承辦單位 / 目前公文所在單位 均排除
				}
				
				if ((next==='M' || next==='M3') && sShowUnitRoleId.length)
				{
					var roleList = sShowUnitRoleId.split(';');
					for(var x=0; x<roleList.length; x++) {
						roleNode = _getRoleNode(unitNode, roleList[x]);
						if (roleNode!==null) {
							containShowUnitRole = true;
							break;
						}
					}
					
					if (!containShowUnitRole) {
						continue;
					}
				}
				
				target = {
					toOU: next,
					finalTarget: false,
					toOUId: unitNo,
					toOUName: SSOUtil.getOrgUnitName(orgNode, unitNo),
				};
				
				if (option.optLvl==SYS_CONST.OptLvl_Unit || next=='M' || next=='M3') {
					target.finalTarget = true;
				}
				
				saveTargets.push(target);
			}
		}
		else if (next==='M2' || next=='M4') {
			$units = $(orgNode).find('OrgInfo > Unit');
			for (j=0; j<$units.length; j++)
			{
				unit_xn = $units[j];
				unitNo = SSOUtil.xml_getChildNodeValue(unit_xn, 'UnitNo');
				virtual = SSOUtil.xml_getChildNodeValue(unit_xn, 'Virtual');
				
				// 排除一層決行單位 & 虛擬單位
				if (virtual==SYS_CONST.LV1_APPROVE_UNIT_VIRTUAL_CODE ||
					virtual==SYS_CONST.VIRTUAL_UNIT_VIRTUAL_CODE) {
					continue;
				}
				
				unitNode = _getUnitNode(orgNode, unitNo);
				
				target =  {
					toOU: next,
					finalTarget: false,
					toOUId : unitNo,
					toOUName : SSOUtil.getOrgUnitName(orgNode, unitNo)
				};
				
				// 若無子單位, 則此一級單位為傳送對象
				$subUnits = $(unitNode).find('Unit');
				if ($subUnits.length===0) {
					target.finalTarget = true;
				}
				
				saveTargets.push(target);
			}
		}
		else if (next==='B' || next==='B-') {
			var fExcludeCurrent = (next==='B-') ? true : false;
			var lv1OwnOUId = (ownOUId.length > SYS_CONST.FIRSTCLASS_UNITNO_LEN) ? ownOUId.substr(0, 2) : ownOUId;
			
			// 取得所有一層決行單位, 加入清單
			$units = $(orgNode).find('OrgInfo > Unit');
			for(j=0; j<$units.length; j++)
			{
				unit_xn = $units[j];
				unitNo = SSOUtil.xml_getChildNodeValue(unit_xn, 'UnitNo');
				virtual = SSOUtil.xml_getChildNodeValue(unit_xn, 'Virtual');
				
				// 排除目前所在單位
				if (fExcludeCurrent && (unitNo===lv1OwnOUId)) { // 2016.10.21 - bug-fix (sUnitNo->unitNo)
					continue;
				}
				
				// 排除一層決行單位
				if (virtual==SYS_CONST.LV1_APPROVE_UNIT_VIRTUAL_CODE) // <Vitrual>欄位值為'3',則為一層決行單位
				{
					target = {
						toOU: next,
						finalTarget: false,
						toOUId: unitNo,
						toOUName: SSOUtil.getOrgUnitName(orgNode, unitNo),
					};
					
					if (option.optLvl==SYS_CONST.OptLvl_Unit) {
						target.finalTarget = true;
					}
					
					saveTargets.push(target);
				}
			}
		}
		else if (next==='C') { // 研考人員
			unitNode =_getUnitNode(orgNode, SYS_CONST.UNIT_RDEXAM);
			if (unitNode!==null) {
				roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_RDEXAM);
				if (roleNode!==null) {
					target = {
						toOU : next,
						finalTarget : false,
						toOUId : SYS_CONST.UNIT_RDEXAM,
						toOUName : SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName'),
						toRoleId : SYS_CONST.ROLENO_RDEXAM,
						toRoleName : SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName')
					};
					
					if (canHideTarget && !showOccupantTarget) {
						target.finalTarget = true;
					}
					else {
						/*
						 * 2013.5 - 因應新版UI, 改為直接新增一個子項目
						 * 舊版實作: 若只有一個人扮演指定角色, 則設為finalTarget
						 */
						occupants = _getRoleOccupants(roleNode);
						if (occupants!==null && occupants.length===1) {
							uniqueTarget = {
								toOU: next,
								finalTarget: true,
								toOUId: SYS_CONST.UNIT_RDEXAM,
								toOUName: unitName,
								toRoleId: SYS_CONST.ROLENO_RDEXAM,
								toRoleName: roleName,
								toUserId: occupants[0].account,
								toUserName: occupants[0].Name,
							};
							if (uniqueTarget.toUserId.length) {
								uniqueTarget.toUserId = uniqueTarget.toUserId.toUpperCase();
							}
							
							target.options = [];
							target.options.push(uniqueTarget);
						}
					}
					
					if ((typeof target) != 'undefined') {
						saveTargets.push(target);
					}
				}
			}
		}
		else if (next==='D' || next==='D2') { // 承辦人
			userInfo = SSOUtil.getOrgUserInfo(orgNode, ICOUId, SYS_CONST.ROLENO_OPERATOR, ICUserId, excludeRoleList);
			if (!!userInfo) {
				target = {
					toOU: next,
					toOUId: userInfo.OUId,
					toOUName: userInfo.OUName,
					toRoleId: userInfo.RoleId,
					toRoleName: userInfo.RoleName,
					toUserId: userInfo.UserId,
					toUserName: userInfo.UserName,
					finalTarget: true
				};
				saveTargets.push(target);
			}
			else {
				theLogger.error('-ERR- _setupDropDownListItems, 取得承辦人資訊失敗. [next=' + next +
							', OUId=' + ICOUId + ', UserId=' + ICUserId + ']');
			}
		}
		// 2021.8.25 - bug-fix add 'E4'
		else if (next==='E' || next==='E1' || next==='E2' || next==='E3' || next==='E4') { // 公文承辦或所在單位分辦/登記桌人員
			/* 'E'  登記桌(一級)
			 * 'E1' 登記桌(不分級)
			 * 'E2' 登記桌(二級)
			 * 'E3' 承辦單位分辦人員(不分級)
			 * 'E4' 公文所在單位承辦人, 2021.7 - 1100433 Eric, merge: 2017.8.31 -成大1060767
			 */
			var roleNoList = [];
			if (next=='E') {
				unitNo = (ICOUId.length > SYS_CONST.FIRSTCLASS_UNITNO_LEN) ?  ICOUId.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN) : ICOUId;
			}
			else if (next==='E1' || next==='E3') {
				unitNo = ICOUId;
			}
			else if (next==='E2') {
				if (ICOUId.length <= SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					theLogger.warn('-W- 無法在一級單位取二級單位分辦! to_ou=\'E2\'');
					return;
				}
				unitNo = ICOUId;
			}
			else if (next==='E4') { // 2021.7 - 1100433 Eric, merge: 2017.8.31 -成大1060767
				unitNo = ownOUId;
			}
			
			if (option.nextRoleList.length===0) {
				if (next==='E3') {
					roleNoList.push(SYS_CONST.ROLENO_DISPATCH); // 送分辦人員
				}
				else if (next==='E4') { // 2021.7 - 1100433 Eric, merge: 2017.8.31 -成大1060767
					roleNoList.push(SYS_CONST.ROLENO_OPERATOR);
				}
				else {
					roleNoList.push(SYS_CONST.ROLENO_REGISTER); // 送登記桌
				}
			}
			else {
				// MPRuleE設定檔內列舉角色清單
				roleNoList = roleNoList.concat(option.nextRoleList);
			}
				
			if (unitNo.length && roleNoList.length) {
				unitNode = _getUnitNode(orgNode, unitNo);
				unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
				for (i=0; i<roleNoList.length; i++) {
					roleNo = roleNoList[i];
					roleNode = _getRoleNode(unitNode, roleNo);
					if (!roleNode) {
						continue;
					}
					roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
					
					target = {
						toOU: next,
						toOUId: unitNo,
						toOUName: unitName,
						toRoleId: roleNo,
						toRoleName: roleName,
						finalTarget: false, // 預設為false
					};
										
					if (canHideTarget && !showOccupantTarget) {
						target.finalTarget = true;
					}
					//1121225	Leslie[卡驗收序15]	針對'E4'直接列出單位內的承辦人清單(跳過角色)
					else if(next==='E4'){
						target = undefined;	//清掉角色選項
						_getRoleTargets(next, orgNode, unitNo, roleNo, saveTargets);
					}
					else {
						occupants = _getRoleOccupants(roleNode);
						if (occupants!==null && occupants.length===1) {
							uniqueTarget = {
								toOU: next,
								finalTarget: true,
								toOUId: unitNo,
								toOUName: unitName,
								toRoleId: roleNo,
								toRoleName: roleName,
								toUserId: occupants[0].account,
								toUserName: occupants[0].Name,
							};
							
							if (uniqueTarget.toUserId.length) {
								uniqueTarget.toUserId = uniqueTarget.toUserId.toUpperCase();
							}
							
							target.options = [];
							target.options.push(uniqueTarget);
						}
					}
					
					if ((typeof target) != 'undefined') {
						saveTargets.push(target);
					}
				}
			}
		}
		else if (next==='F') { // 發文人員
			unitNode = _getUnitNode(orgNode, SYS_CONST.UNIT_ISSUE);
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_ISSUER);
			
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			
			target = {
				toOU: next,
				toOUId: SYS_CONST.UNIT_ISSUE,
				toOUName: unitName,
				toRoleId: SYS_CONST.ROLENO_ISSUER,
				toRoleName: roleName,
				finalTarget: false, // 預設為false
			};
			
			if (canHideTarget && !showOccupantTarget)
			{
				target.finalTarget = true;
			}
			else {
				/*
				 * 2013.5 - 因應新版UI, 改為直接新增一個子項目
				 * 舊版實作: 若只有一個人扮演指定角色, 則設為finalTarget
				 */
				occupants = _getRoleOccupants(roleNode);
				if (occupants!==null && occupants.length===1) {
					uniqueTarget = {
						toOU: next,
						finalTarget: true,
						toOUId: SYS_CONST.UNIT_ISSUE,
						toOUName: unitName,
						toRoleId: SYS_CONST.ROLENO_ISSUER,
						toRoleName: roleName,
						toUserId: occupants[0].account,
						toUserName: occupants[0].Name,
					};
					if (uniqueTarget.toUserId.length) {
						uniqueTarget.toUserId = uniqueTarget.toUserId.toUpperCase();
					}
					
					target.options = [];
					target.options.push(uniqueTarget);
				}
			}
			
			if (target!==null) {
				saveTargets.push(target);
			}
		}
		else if (next==='G') { // 繕印人員
			unitNode = _getUnitNode(orgNode, SYS_CONST.UNIT_ISSUE);
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_PRINT);
			
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			
			target = {
				toOU: next,
				toOUId: SYS_CONST.UNIT_ISSUE,
				toOUName: unitName,
				toRoleId: SYS_CONST.ROLENO_PRINT,
				toRoleName: roleName,
				finalTarget: false, // 預設為false
			};
			
			if (canHideTarget && !showOccupantTarget)
			{
				target.finalTarget = true;
			}
			else {
				/*
				 * 2013.5 - 因應新版UI, 改為直接新增一個子項目
				 * 舊版實作: 若只有一個人扮演指定角色, 則設為finalTarget
				 */
				occupants = _getRoleOccupants(roleNode);
				if (occupants!==null && occupants.length===1) {
					uniqueTarget = {
						toOU: next,
						finalTarget: true,
						toOUId: SYS_CONST.UNIT_ISSUE,
						toOUName: unitName,
						toRoleId: SYS_CONST.ROLENO_PRINT,
						toRoleName: roleName,
						toUserId: occupants[0].account,
						toUserName: occupants[0].Name,
					};
					if (uniqueTarget.toUserId.length) {
						uniqueTarget.toUserId = uniqueTarget.toUserId.toUpperCase();
					}
					
					target.options = [];
					target.options.push(uniqueTarget);
				}
			}
			
			if (target!==null) {
				saveTargets.push(target);
			}
		}
		else if (next==='H' || next==='H2') { // 公文所在單位分辦人員
			unitNo = '';
			if (next=='H') {
				if (ownOUId.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					unitNo = ownOUId.substr(0, 2);
				}
				else {
					unitNo = ownOUId;
				}
			}
			else {
				// 'H2' 須為二級單位
				if (ownOUId.length <= SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					return;
				}
				unitNo = ownOUId;
			}
			
			unitNode = _getUnitNode(orgNode, unitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_DIPATCH);
			if (roleNode)
			{
				roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
				target = {
					toOU: next,
					finalTarget: false,
					toOUId: unitNo,
					toOUName: unitName,
					toRoleId: SYS_CONST.ROLENO_DIPATCH,
					toRoleName: roleName,
				};
				
				// 2015.5.25 - bug fix. variable name error.
				if (canHideTarget) {
					target.finalTarget = true;	
				}
				else {
					/*
					 * 2013.5 - 因應新版UI, 改為直接新增一個子項目
					 * 舊版實作: 若只有一個人扮演指定角色, 則設為finalTarget
					 */
					occupants = _getRoleOccupants(roleNode);
					if (occupants!==null && occupants.length===1) {
						uniqueTarget = {
							toOU: next,
							finalTarget: true,
							toOUId: unitNo,
							toOUName: unitName,
							toRoleId: SYS_CONST.ROLENO_DIPATCH,
							toRoleName: roleName,
							toUserId: occupants[0].account,
							toUserName: occupants[0].Name,
						};
						
						if (uniqueTarget.toUserId.length) {
							uniqueTarget.toUserId = uniqueTarget.toUserId.toUpperCase();
						}
						
						target.options = [];
						target.options.push(uniqueTarget);
					}
				}
				
				if ((typeof target) != 'undefined' && (target!==null)) {
					saveTargets.push(target);
				}
			}
		}
		else if (next==='I') { // 收文人員
			unitNode = _getUnitNode(orgNode, SYS_CONST.UNIT_RECEIVE);
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_RECEIVER);
			
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			
			target = {
				toOU: next,
				toOUId: SYS_CONST.UNIT_RECEIVE,
				toOUName: unitName,
				toRoleId: SYS_CONST.ROLENO_RECEIVER,
				toRoleName: roleName,
				finalTarget: false, // 預設為false
			};
			
			if (canHideTarget && !showOccupantTarget)
			{
				target.finalTarget = true;
			}
			else {
				/*
				 * 2013.5 - 因應新版UI, 改為直接新增一個子項目
				 * 舊版實作: 若只有一個人扮演指定角色, 則設為finalTarget
				 */
				occupants = _getRoleOccupants(roleNode);
				if (occupants!==null && occupants.length===1) {
					uniqueTarget = {
						toOU: next,
						finalTarget: true,
						toOUId: SYS_CONST.UNIT_RECEIVE,
						toOUName: unitName,
						toRoleId: SYS_CONST.ROLENO_RECEIVER,
						toRoleName: roleName,
						toUserId: occupants[0].account,
						toUserName: occupants[0].Name,
					};
					if (uniqueTarget.toUserId.length) {
						uniqueTarget.toUserId = uniqueTarget.toUserId.toUpperCase();
					}
					target.options = [];
					target.options.push(uniqueTarget);
				}
			}
			
			if ((typeof target) != 'undefined') {
				saveTargets.push(target);
			}
		}
		else if (next==='L') { // 檔管人員
			unitNode = _getUnitNode(orgNode, SYS_CONST.UNIT_FILEROOM);
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_FILEMGR);
			
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			
			target = {
				toOU: next,
				toOUId: SYS_CONST.UNIT_FILEROOM,
				toOUName: unitName,
				toRoleId: SYS_CONST.ROLENO_FILEMGR,
				toRoleName: roleName,
				finalTarget: false, // 預設為false
			};
			
			if (canHideTarget && !showOccupantTarget) {
				target.finalTarget = true;
			}
			else {
				/*
				 * 2013.5 - 因應新版UI, 改為直接新增一個子項目
				 * 舊版實作: 若只有一個人扮演指定角色, 則設為finalTarget
				 */
				occupants = _getRoleOccupants(roleNode);
				if (occupants!==null && occupants.length===1) {
					uniqueTarget = {
						toOU: next,
						finalTarget: true,
						toOUId: SYS_CONST.UNIT_FILEROOM,
						toOUName: unitName,
						toRoleId: SYS_CONST.ROLENO_FILEMGR,
						toRoleName: roleName,
						toUserId: occupants[0].account,
						toUserName: occupants[0].Name,
					};
					if (uniqueTarget.toUserId.length) {
						uniqueTarget.toUserId = uniqueTarget.toUserId.toUpperCase();
					}
					target.options = [];
					target.options.push(uniqueTarget);
				}
			}
			
			if ((typeof target) != 'undefined') {
				saveTargets.push(target);
			}
		}
		else if (next==='N') { // 校對人員
			unitNode = _getUnitNode(orgNode, SYS_CONST.UNIT_ISSUE);
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_CHECK);
			
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			
			target = {
				toOU: next,
				toOUId: SYS_CONST.UNIT_ISSUE,
				toOUName: unitName,
				toRoleId: SYS_CONST.ROLENO_CHECK,
				toRoleName: roleName,
				finalTarget: false, // 預設為false
			};
			
			if (canHideTarget && !showOccupantTarget) {
				target.finalTarget = true;
			}
			else {
				/*
				 * 2013.5 - 因應新版UI, 改為直接新增一個子項目
				 * 舊版實作: 若只有一個人扮演指定角色, 則設為finalTarget
				 */
				occupants = _getRoleOccupants(roleNode);
				if (occupants!==null && occupants.length===1) {
					uniqueTarget = {
						toOU: next,
						finalTarget: true,
						toOUId: SYS_CONST.UNIT_ISSUE,
						toOUName: unitName,
						toRoleId: SYS_CONST.ROLENO_CHECK,
						toRoleName: roleName,
						toUserId: occupants[0].account,
						toUserName: occupants[0].Name,
					};
					if (uniqueTarget.toUserId.length) {
						uniqueTarget.toUserId = uniqueTarget.toUserId.toUpperCase();
					}
					target.options = [];
					target.options.push(uniqueTarget);
				}
			}
			
			if ((typeof target) != 'undefined') {
				saveTargets.push(target);
			}
		}
		else if (next==='O1' || next==='O2' || next==='O3' || next==='O4') {
			// 訊息所在的一級單位
			targetOUId = '';
			if (ownOUId.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				targetOUId = ownOUId.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			}
			else {
				targetOUId = ownOUId;
			}
			
			target = {
				toOU: next,
				finalTarget: false,
				toOUId: targetOUId,
				toOUName: SSOUtil.getOrgUnitName(orgNode, targetOUId),
			};
			
			if (option.optLvl==SYS_CONST.OptLvl_Unit) {
				target.finalTarget = true;
			}
			saveTargets.push(target);
		}
		else if (next==='P' || next==='P4' || next==='P5') {
			var fExcludeOwnUnit = (next==='P4') ? true : false;
			var fFinalTarget = (next==='P4' || next==='P5') ? true : false;
			
			if (next==='P' || next==='P4') {
				if (ownOUId.length<=SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					return;
				}
			}
			targetOUId = ownOUId.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			unitNode = _getUnitNode(orgNode, targetOUId);
			if (unitNode) {
				$subUnits = $(unitNode).find('Unit');
				for(i=0; i<$subUnits.length; i++) {
					subUnit = $subUnits[i];
					if (subUnit) {
						subUnitNo = SSOUtil.xml_getChildNodeValue(subUnit, 'UnitNo');
						if (subUnitNo===ICOUId) { // 排除承辦科
							continue;
						}
						
						if (fExcludeOwnUnit && (subUnitNo===ownOUId)) { // 排除所在科
							continue;
						}
						
						if ((next==='P4'||next==='P5') && (sShowUnitRoleId.length!==0)) {
							roleNode = _getRoleNode(subUnit, sShowUnitRoleId);
							if (roleNode===null) {
								continue;
							}
						}
						
						target = {
							toOU: next,
							toOUId: subUnitNo,
							toOUName: SSOUtil.xml_getChildNodeValue(subUnit, 'UnitName'),
							finalTarget: false, // 預設為false
						};
						
						if (fFinalTarget || option.optLvl==SYS_CONST.OptLvl_Unit) {
							target.finalTarget = true;
						}
						saveTargets.push(target);
					}
				}
			}
		}
		else if (next==='P1' || next==='P2' || next==='P3' || next==='E5') { // 2021.7 - 1100433 Eric, merge: 2017.8.31 -成大1060767, 新增'E5'
			if (ownOUId.length<=SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				return (saveTargets.length-cntStart);
			}

			// 2021.7.8 - 1100433 Eric, merge: 2017.8.31 -成大1060767, 新增'E5'
			unitNo = ownOUId;
			if (next==='E5') {
				unitNo = ownOUId.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			}
			
			unitNode = _getUnitNode(orgNode, unitNo);
			if (unitNode) {
				target = {
					toOU: next,
					toOUId: unitNo,
					toOUName: SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName'),
					finalTarget: false
				};
				
				if (option.optLvl==SYS_CONST.OptLvl_Unit) {
					target.finalTarget = true;
				}
						
				saveTargets.push(target);
			}
		}
		else if (next==='E6') { // 2021.7.8 - 1100433 Eric, merge: 2017.8.31 -成大1060767, 新增'E6'
			unitNo = (ICOUId.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN)?ICOUId.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN):ICOUId;
			unitNode = _getUnitNode(orgNode, unitNo);
			if (unitNode) {
				target = {
					toOU: next,
					toOUId: unitNo,
					toOUName: SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName'),
					finalTarget: false
				};		
				saveTargets.push(target);
			}
		}
		else if (next==='K'){	//1130305	Leslie[彙整表-序20]	領務局驗收允諾需求，簡化線上簽核右鍵分辦選單(實作線上簽核的TO_OU='K')
			/*公文所在單位承辦人，以及下級單位的承辦人*/
			unitNo = ownOUId;
			var roleNoList = menuRule.ruleEnvSetting.underTakerRoles;
			var isKClassWithSubUnit = menuRule.ruleEnvSetting.KClassWithSubUnit;
			if (unitNo.length && roleNoList.length){
				unitNode = _getUnitNode(orgNode, unitNo);
				unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
				var subUnitTarget = null, listTarget = null;
								
				for (i=0; i<roleNoList.length; i++) {
					roleNo = roleNoList[i];
					roleNode = _getRoleNode(unitNode, roleNo);
					if (!roleNode) {
						continue;
					}
					//1130426	Leslie[問題彙整表序90]	增加檢核取得的角色是否為目前單位
					let _unitNo = SSOUtil.xml_getChildNodeValue(roleNode, 'UnitNo')
					if(_unitNo != unitNo)
						continue;
					
					_getRoleTargets(next, orgNode, unitNo, roleNo, saveTargets);	//先加入目前單位的承辧人
				}
				
				//再依設定加入下級單位的承辦人
				if (unitNo.length==SYS_CONST.FIRSTCLASS_UNITNO_LEN){
					$subUnitNodes = $(unitNode).children('Unit');
					subUnitCnt = $subUnitNodes.length;
					
					for(i=0; i<subUnitCnt; i++) {
						subUnitNode = $subUnitNodes[i];
						subUnitNo = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitNo');
						subUnitName = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitName');
						
						// if (isKClassWithSubUnit) {
							// subUnitTarget = {
								// toOU: next,
								// finalTarget: false,
								// 'toOUId': subUnitNo,
								// 'toOUName': subUnitName,
								// toRoleId: '', toRoleName: '',
								// toUserId: '', toUserName: '',
								// options: []
							// };
							// listTarget = subUnitTarget.options;
						// }
						// else {
							// listTarget = saveTargets;
						// }
						
						for (j=0; j<roleNoList.length; j++) {
							roleNo = roleNoList[j];
							roleNode = _getRoleNode(subUnitNode, roleNo);
							if (!roleNode) {
								continue;
							}
							
							if (isKClassWithSubUnit) {
								subUnitTarget = {
									toOU: next,
									finalTarget: false,
									'toOUId': subUnitNo,
									'toOUName': subUnitName,
									toRoleId: roleNo, toRoleName: '',
									toUserId: '', toUserName: '',
									options: []
								};
								
								saveTargets.push(subUnitTarget);
							}
							else {
								_getRoleTargets(next, orgNode, subUnitNo, roleNo, saveTargets);
							}
						}
					}
				}
			}
		}
		//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
		else if (next === 'Q1' || next === 'Q2'){
			var ownOuLen = ownOUId.length, opOuLen = parseInt(option.ouLen)||0;
			if (ownOUId == option.ownOUId || (option.ownOUId.length === 0 && (opOuLen==0 || (opOuLen != 0 && ownOuLen == opOuLen)))){
				//進到這裡，表示還未取得Q1、Q2所需的傳送對象，重新取得並設定到menuRule的CTarget裡
				var todoTarget = SSOUtil.getDocTodoListTarget(localStorage.Artifact, _docObj.sourceOrgNo, _docObj.docNo, ICUserId, ownOUId, (next == 'Q1'?0:1), false)
				if (todoTarget.success && todoTarget.docTodoTarget) {
					menuRule.setExtraCTarget(todoTarget.docTodoTarget, orgNode, next)
					if(menuRule.getCTarget(next))
					_buildDDLItemsFromTarget(option, menuRule.getCTarget(next), saveTargets);
				}
			}
		}
		
		cntFinish = saveTargets.length;
		return (cntFinish-cntStart);
	}
	
	function _getDDL2Items(option, unitNode, ICOUId, ownOUId, upLvlTarget, isDraft, saveTargets) {
		var cntStart = saveTargets.length;
	
		var unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
		
		var next = option.next;
		var showUnitRoleId = menuRule.ruleEnvSetting.showUnitRoleId;
		if (typeof showUnitRoleId === 'undefined') { // 2015.7.15 - bug-fix
			showUnitRoleId = '';
		}
		var i=0, j=0, k=0, cnt=0;
		
		function _setupRoleTarget_ExcludeRegister(roleNode, next, toOUId, toOUName, saveTargets) {
			var roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
			var roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			
			var newTarget, uniqueTarget;
			var occupants;
			if (roleNo!=SYS_CONST.ROLENO_REGISTER && //排除登記桌
				roleNo!=SYS_CONST.ROLENO_DIPATCH) 	 //排除分辦人員
			{
				newTarget = {
					toOU: next,
					'toOUId': toOUId,
					'toOUName': toOUName,
					toRoleId: roleNo,
					toRoleName: roleName,
					finalTarget: false,
				};
				
				if (option.optLvl==SYS_CONST.OptLvl_Role) {
					newTarget.finalTarget = true;
				}
				else {
					//
					// 2013.5 - 因應新版UI, 改為直接新增一個子項目
					// 舊版實作: 若只有一個人扮演指定角色, 則設為finalTarget
					//	
					occupants = _getRoleOccupants(roleNode);
					if (occupants!==null && occupants.length===1) {
						var occupant = occupants[0];
						uniqueTarget = {
							toOU: next,
							finalTarget: true,
							'toOUId': toOUId,
							'toOUName': toOUName,
							toRoleId: roleNo,
							toRoleName: roleName,
							toUserId: occupant.account,
							toUserName: occupant.name,
							oneAndOnly : true // 此角色僅有一人!
						};
						
						if (uniqueTarget.toUserId.length) {
							uniqueTarget.toUserId = uniqueTarget.toUserId.toUpperCase();
						}
						if (typeof newTarget.options === 'undefined') {
							newTarget.options = [];
						}
						newTarget.options.push(uniqueTarget);
					}
				}
				
				if (newTarget) {
					saveTargets.push(newTarget);
				}
			}
		}
		
		/* 2016.6 - 新增 sCurrentOUId */
		function _setupRoleTarget(roleNode, next, toOUId, toOUName, saveTargets) {
			if (next==='O2') {
				theLogger.debug('next="O2" stop here...');	
			}
			var roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
			var roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			
			var newTarget = {
				toOU: next,
				'toOUId': toOUId,
				'toOUName': toOUName,
				toRoleId: roleNo,
				toRoleName: roleName,
				finalTarget: false,
			};
			
			if (option.optLvl==SYS_CONST.OptLvl_Role) {
				newTarget.finalTarget = true;
			}
			else {
				/*
				 * 2013.5 - 因應新版UI, 改為直接新增一個子項目
				 * 舊版實作: 若只有一個人扮演指定角色, 則設為finalTarget
				 */	
				var occupants = _getRoleOccupants(roleNode);
				if (occupants!==null && occupants.length===1) {
					var occupant = occupants[0];
					var uniqueTarget = {
						toOU: next,
						finalTarget: true,
						'toOUId': toOUId,
						'toOUName': toOUName,
						toRoleId: roleNo,
						toRoleName: roleName,
						toUserId: occupant.account,
						toUserName: occupant.name,
					};
					if (uniqueTarget.toUserId.length) {
						uniqueTarget.toUserId = uniqueTarget.toUserId.toUpperCase();
					}
					
					newTarget.options = [];
					newTarget.options.push(uniqueTarget);
				}
			}
			
			if (newTarget) {
				saveTargets.push(newTarget);
			}
		}
		
		var roleNode, subUnitNode;
		var $roleNodes, $subUnitNodes, roleCnt, subUnitCnt, subUnitNo, subUnitName;
		var unitNo, roleNo;
		var toOUId='', toOUName='';
		var listTargets, target, roleList, toUnitNode;
		
		var canDropOccupant = _canNextDropOccupant(next);
		if (canDropOccupant) {
			/*
			 * for C, E, E1, E2, E3, F, G, H, H2, I, L, N, Z
			 * (1)傳送對象可能為角色或人員,DDL2第一筆資料為角色Item
			 * (2)若系統參數AOL_SHOW_OCCUPANT設定值為'N', 則DDL2不顯示資料,只能選擇角色
			 */
			if (typeof upLvlTarget != 'undefined') {
				roleNode = _getRoleNode(unitNode, upLvlTarget.toRoleId);
				unitNo = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitNo');
				if (roleNode) {
					cnt = _getAllTargets_RoleNode(next, roleNode, upLvlTarget.toOUId, upLvlTarget.toOUName, saveTargets, true);
					if (cnt===0) {
						return 0;
					}
				}
			}
		}
		else if (next==='A' || next==='B' || next==='B-' || next==='O3') {
			toOUId = upLvlTarget.toOUId;
			toOUName = upLvlTarget.toOUName;
			
			// 一級單位下的角色
			if (unitNode) {
				$roleNodes = $(unitNode).children('Role');
				cnt = $roleNodes.length;
				for (i=0; i<cnt; i++) {
					roleNode = $roleNodes[i];
					_setupRoleTarget_ExcludeRegister(roleNode, next, toOUId, toOUName, saveTargets);
				}
			}
			
			// 二級單位清單
			if (unitNode) {
				$subUnitNodes = $(unitNode).children('Unit');
				subUnitCnt = $subUnitNodes.length; roleCnt = 0;
				for(i=0; i<subUnitCnt; i++)
				{
					subUnitNode = $subUnitNodes[i];
					subUnitNo = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitNo');
					subUnitName = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitName');
					
					$roleNodes = $(subUnitNode).children('Role');
					roleCnt = $roleNodes.length;
					for(j=0; j<roleCnt; j++)
					{
						roleNode = $roleNodes[j];
						_setupRoleTarget_ExcludeRegister(roleNode, next, subUnitNo, subUnitName, saveTargets);
					}
				}
			}
		}
		else if (next==='O1') {
			// 同科下承辦人角色 + 同組下除承辦科角色清單
			toOUId = upLvlTarget.toOUId;
			toOUName = upLvlTarget.toOUName;
			
			var targetRole = null; // for 同單位承辦人角色[將會被加到列表之最前方]
			listTargets = [];
			
			// 一級單位內所有角色
			if (ownOUId.length == SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				unitNo = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitNo');
				unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
					
				$roleNodes = $(unitNode).children('Role');
				roleCnt = $roleNodes.length;
				for (i=0; i<roleCnt; i++) {
					roleNode = $roleNodes[i];
					
					listTargets = [];
					_setupRoleTarget_ExcludeRegister(roleNode, next, unitNo, unitName, listTargets);
					
					for(j=0; j<listTargets.length; j++)	{
						target = listTargets[j];
						
						// 同單位下承辦人角色加到列表之最前方
						if ((target.toOUId==ownOUId )&& (target.toRoleId==SYS_CONST.ROLENO_OPERATOR)) {
							targetRole = target;
						}
						else {
							saveTargets.push(target);
						}
					}
				}
			}
			
			// 二級單位
			if (unitNode) {
				$subUnitNodes = $(unitNode).children('Unit');
				subUnitCnt = $subUnitNodes.length;
				for(i=0; i<subUnitCnt; i++) {
					subUnitNode = $subUnitNodes[i];
					subUnitNo = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitNo');
					subUnitName = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitName');
						
					$roleNodes = $(subUnitNode).children('Role');
					roleCnt = $roleNodes.length;
					for(j =0; j<roleCnt; j++)
					{
						roleNode = $roleNodes[j];
							
						listTargets = [];
						_setupRoleTarget_ExcludeRegister(roleNode, next, subUnitNo, subUnitName, listTargets);
						
						for(k=0; k<listTargets.length; k++)
						{
							target = listTargets[k];
							
							if (option.optLvl==SYS_CONST.OptLvl_Role) {
								target.finalTarget = true;
							}
							else {
								var occupants = _getRoleOccupants(roleNode);
								var userCnt = occupants.length;
								if (userCnt===1) {
									var occupant = occupants[0];
									uniqueTarget = {
										toOU: next,
										finalTarget: true,
										'toOUId': target.toOUId,
										'toOUName': target.toOUName,
										toRoleId: target.toRoleId,
										toRoleName: target.toRoleName,
										toUserId: occupant.account.toUpperCase(),
										toUserName: occupant.name,
										oneAndOnly : true // 此角色僅有一人!
									};
									
									if (typeof target.options === 'undefined') {
										target.options = [];
									}
									target.options.push(uniqueTarget);
								}
							}
							
							if (target.toOUId===ownOUId)
							{
								// 同單位下承辦人角色加到列表之最前方, 其它同科非承辦人角色排除!
								if (target.toRoleId==SYS_CONST.ROLENO_OPERATOR) {
								targetRole = target;
							}
							}
							else {
								saveTargets.push(target);
							}
						}
					}
				}
			}
			
			if (targetRole) {
				saveTargets.unshift(targetRole); // 加到最前面!
			}
		}
		else if (next==='O2') {
			/* 同組或同科下長官角色清單
			 * Note: 1. 直屬才算，同組不同科不列入
			 *       2. 一層決行單位不列入(?)
			 *
			 * 1st		OD01~OD06(一層決行單位長官)
			 * 1st dept	OD11~OD15(一級單位長官)
			 * 2nd sect	OD21~OD25(二級單位長官)
			 * 同科下承辦人角色 + 同組下除承辦科角色清單
			 */
			toOUId = upLvlTarget.toOUId;
			toOUName = upLvlTarget.toOUName;
			
			if (toOUId.length!=SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				theLogger.error('-ERR- _getDDL2Items(next=\'O2\'...) toOUId=\'' + toOUId + '\' 長度不為二碼!');
				return 0;
			}
			
			unitNo = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitNo');
			if (unitNo!==toOUId) {
				theLogger.warn('-W- Id mismatch: unitNode v.s. toOUId');
			}
			
			roleList = [];
			toUnitNode = _getUnitNode(orgNode, toOUId);
			// 單位內所有長官角色
			if (toUnitNode) {
				$roleNodes = $(toUnitNode).children('Role');
				roleCnt = $roleNodes.length;
				roleList = [
					'OD01', 'OD02', 'OD03', 'OD04', 'OD05', 'OD06', // 核決單位長官 OD01~OD06 (OD01最大->OD06最小)
					'OD11', 'OD12', 'OD13', 'OD14', 'OD15', // 1級單位長官 OD11~OD15
				];
					
				for (i=0; i<roleCnt; i++)
				{
					roleNode = $roleNodes[i];
					roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
					if (roleList.indexOf(roleNo)!=-1)
					{
						listTargets = [];
						_setupRoleTarget(roleNode, next, toOUId, toOUName, listTargets);
						
						for(j=0; j<listTargets.length; j++)
						{
							target = listTargets[j];
							saveTargets.push(target);
						}
					}
				}
			}
			
			// 二級單位
			if (ownOUId.length!==SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				roleList = [ 'OD21', 'OD22', 'OD23', 'OD24', 'OD25']; // 二級單位長官清單!
				if (!!unitNode) {
					$subUnitNodes = $(unitNode).children('Unit');
					subUnitCnt = $subUnitNodes.length;
					for (i=0; i<subUnitCnt; i++)
					{
						subUnitNode = $subUnitNodes[i];
						subUnitNo = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitNo');
						subUnitName = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitName');
						if (subUnitNo===ownOUId) {
							$roleNodes = $(subUnitNode).children('Role');
							roleCnt = $roleNodes.length;
							for (j=0; j<roleCnt; j++)
							{
								roleNode = $roleNodes[j];
								
								listTargets = [];
								roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
								if (roleList.indexOf(roleNo)!=-1) {
									_setupRoleTarget(roleNode, next, subUnitNo, subUnitName, listTargets);
									
									for(k=0; k<listTargets.length; k++)
									{
										target = listTargets[k];
										saveTargets.push(target);
									}
								}
							}
						}
					}
				}
			}
		}
		else if (next==='O4') {
			// 同組下科長清單
			toOUId = upLvlTarget.toOUId;
			toOUName = upLvlTarget.toOUName;
			//var unitNode = _getUnitNode(orgNode, toOUId);
			roleList = [SYS_CONST.ROLENO_CLS2OFFICER];
			
			if (!!unitNode)
			{
				$subUnitNodes = $(unitNode).children('Unit');
				subUnitCnt = $subUnitNodes.length;
				for(i=0; i<subUnitCnt; i++)
				{
					subUnitNode = $subUnitNodes[i];
					subUnitNo = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitNo');
					subUnitName = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitName');
					if (subUnitNo==ownOUId)
					{
						$roleNodes = $(subUnitNode).children('Role');
						roleCnt = $roleNodes.length;
						for (j=0; j<roleCnt; j++)
						{
							roleNode = $roleNodes[j];
							
							listTargets = [];
							roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
							if (roleList.indexOf(roleNo)!=-1)
							{
								_setupRoleTarget(roleNode, next, subUnitNo, subUnitName, listTargets);
								
								for(k=0; k<listTargets.length; k++)
								{
									target = listTargets[k];
									saveTargets.push(target);
								}
							}
						}
					}
				}
			}
		}
		else if (next==='M2'||next==='M3'||next==='M4') {
			/*
			 * => M4 Add: 一級單位
			 * 組下單位
			 * => M2 Exclude: 承辦單位
			 * => M2 Exclude: 訊息所在單位
			 */
			var fAddFirstLvUnit = (next==='M4') ? true : false;
			var fExcludeIncharge = (next==='M2') ? true : false;
			var fExcludeOwn = (next==='M3') ? true : false;
			
			toOUId = upLvlTarget.toOUId;
			toOUName = upLvlTarget.toOUName;
			
			var ouId = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitNo');
			if (fAddFirstLvUnit && ouId.length===SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				var fAdd = true;
				if (showUnitRoleId.length) {
					roleNode = _getRoleNode(unitNode, showUnitRoleId);
					if (roleNode===null) {
						fAdd = false;
					}
				}
				
				if (fAdd) {
					var unitTarget =  {
						toOU: next,
						finalTarget: true,
						toOUId: toOUId,
						toOUName: toOUName,
						present: 'unit',  // 此為單位代表
					};
					saveTargets.push(unitTarget);
				}
			}
					
			if (!!unitNode) {
				$subUnitNodes = $(unitNode).children('Unit');
				subUnitCnt = $subUnitNodes.length;
				for (i=0; i<subUnitCnt; i++)
				{
					subUnitNode = $subUnitNodes[i];
					subUnitNo = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitNo');
					var process = true;
					if (fExcludeIncharge && subUnitNo===ICOUId) {
						process = false;
					}
					if (fExcludeOwn && subUnitNo===ownOUId) {
						process = false;
					}
					if (showUnitRoleId.length) {
						roleNode = _getRoleNode(unitNode, showUnitRoleId);
						if (roleNode===null) {
							process = false;
						}
					}
					
					if (process) {
						subUnitName = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitName');
						target = {
							toOU: next,
							finalTarget: true,
							toOUId: subUnitNo,
							toOUName: subUnitName,
						};
						saveTargets.push(target);
					}
				}
			}
		}
		else if (next==='P'||next==='P2') {
			// 同科下角色
			toOUId = upLvlTarget.toOUId;
			toOUName = upLvlTarget.toOUName;
			
			// 單位內所有角色
			if (!!unitNode)
			{
				$roleNodes = $(unitNode).children('Role');
				roleCnt = $roleNodes.length;
				for (i=0; i<roleCnt; i++)
				{
					roleNode = $roleNodes[i];
					_setupRoleTarget_ExcludeRegister(roleNode, next, toOUId, toOUName, saveTargets);
				}
			}
		}
		else if (next==='P1') {
			// 同科下承辦人角色
			toOUId = upLvlTarget.toOUId;
			toOUName = upLvlTarget.toOUName;
			
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_OPERATOR);
			if (roleNode) {
				_setupRoleTarget(roleNode, next, toOUId, toOUName, saveTargets);
			}
		}
		// 2021.7.8 - 1100433 Eric, merge: 2017.8.31 - 成大1060767 E5,E6
		else if (next==='P3' || next==='E5' || next==='E6') {
			// 同科(或同組)下長官角色
			toOUId = upLvlTarget.toOUId;
			toOUName = upLvlTarget.toOUName;
			
			//var roleNoList = ['OD21', 'OD22', 'OD23', 'OD24', 'OD25'];
			let roleNoList = null;
			if (toOUId.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				roleNoList = SYS_CONST.SECONDCLASS_OFFICER; //2021.7.8 - 1100433 Eric, merge:  2017.8.31 - 改成系統共用之二級長官設定
			}
			else {
				roleNoList = SYS_CONST.FIRSTCLASS_OFFICER; 
			}

			if (!!unitNode)
				{
				$roleNodes = $(unitNode).children('Role');
				roleCnt = $roleNodes.length;
				for (i=0; i<roleCnt; i++) {
					roleNode = $roleNodes[i];
					roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
					if (roleNoList.indexOf(roleNo)!=-1)
					{
						listTargets = [];
						_setupRoleTarget(roleNode, next, toOUId, toOUName, listTargets);
						
						for(j=0; j<listTargets.length; j++)
						{
							target = listTargets[j];
							saveTargets.push(target);
						}
					}
				}
			}
		}
		
		cntFinish = saveTargets.length;
		return (cntFinish-cntStart);
	}
	
	function _getAllTargets_RoleNode(next, roleNode, unitNo, unitName, saveTargets, addPresent) {
		if (typeof addPresent!=='boolean') {
			addPresent = false;
		}
		
		var roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
		var roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
		
		var nextToRole = (_getNextOptLvl(next)==SYS_CONST.OptLvl_Role) ? true : false;
		var roleTarget, target;
		if (nextToRole)	{
			roleTarget = {
				toOU: next,
				toOUId: unitNo,
				toOUName: unitName,
				toRoleId: roleNo,
				toRoleName: roleName,
				finalTarget: true,
				present: 'role',  // 此為角色代表
			};
			saveTargets.push(roleTarget);
		}
		
		var occupants = _getRoleOccupants(roleNode);
		if (occupants===null || occupants.length===0) {
			theLogger.error('-ERR- _getRoleOccupants() occupants is null or lenght==0.');
			return 0;
		}
		
		var i=0;
		for(i=0; i<occupants.length; i++)
		{
			var occupant = occupants[i];
			if (occupant) {
				target = {
					toOU: next,
					toOUId: unitNo,
					toOUName: unitName,
					toRoleId: roleNo,
					toRoleName: roleName,
					toUserId: occupant.account,
					toUserName: occupant.name,
					finalTarget: true,
				};
				if (target.toUserId.length) {
					target.toUserId = target.toUserId.toUpperCase();
				}
				saveTargets.push(target);
			}
		}
		
		return saveTargets.length;
	}
	
	function _getAllTargets_OrgNode(next, orgNode, unitNo, roleNo, saveTargets) {
		var nextOptLvl = _getNextOptLvl(next);
		var nextToRole = (nextOptLvl==SYS_CONST.OptLvl_Role) ? true : false;
		
		var unitNode = _getUnitNode(orgNode, unitNo);
		var unitName = SSOUtil.xml_getChildNodeValue(unitNo, 'UnitName');
		var roleNode = _getRoleNode(unitNode, roleNo);
		var roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
		
		if (nextToRole)
		{
			var target = {
				toOU: next,
				toOUId: unitNo,
				toOUName: unitName,
				toRoleId: roleNo,
				toRoleName: roleName,
				present: 'role',  // 此為角色代表
				finalTarget: true,
			};
			saveTargets.push(target);
		}
	}
	
	function _displayRuleOption(option, docObj, inchargeUser, ownUser) {
		if (option.ownOUId.length) {
			if (option.ownOUId!=ownUser.OUId) {
				theLogger.log('篩選去除項目:' + option.txName + ', next=' + option.next +
							' (option.ownOUId[' + option.ownOUId + ']!=ownUser.OUId['+ ownUser.OUId + '])');
				return false;
			}
		}
		
		// 2015.5 - 問題單1040445, 若option有指定ouLen, 則檢核目前ownOUId長度是否符合
		if (!!option.ouLen && option.ouLen.length) {
			var len = parseInt(option.ouLen);
			if (len>0) {
				if (ownUser.OUId.length!=len) {
					theLogger.log('option.ouLen=' + option.ouLen + ', 不列入 (OwnOUId==' + ownUser.OUId + ')');
					return false;
				}
			}
		}
		
		// 目前公文狀態DOC_STATE是否符合!
		if (option.docState.length && option.docState!=docObj.docState) {
			theLogger.log('篩選去除項目:' + option.txName + ', next=' + option.next + ' (公文狀態不同)');
			return false;
		}
		
		// 公文已核決才列出
		if ((option.specialCheck.indexOf('A')!=-1) &&
			((docObj.appUserId.length===0 && docObj.appRoleId.length===0)||(!_options.approved))) {
			theLogger.log('篩選去除項目:' + option.txName + ', next=' + option.next + ' (公文未核決)');
			return false;
		}
		
		// 公文未核決才列出
		if ((option.specialCheck.indexOf('X')!=-1) &&
			((docObj.appUserId.length || docObj.appRoleId.length) || (_options.approved))) {
			theLogger.log('篩選去除項目:' + option.txName + ', next=' + option.next + ' (公文已核決)');
			return false;
		}
		
		// ToDo: 送分辦人員銷號異動檢核
		if (option.specialCheck.indexOf('D')!=-1) {
			/*
			if(單位收文)
				EnableCancel = Y
			else if(DraftCancelByDesk == Y && NewByOu==Y)	//若創稿登記桌一律可銷號(DraftCancelByDesk=Y)
				EnableCancel = Y
			else if(start_date =='')						//未出組室
				EnableCancel = Y
			else											//已出組室
				EnableCancel = N
			*/
			if (docObj.ODWMSG.IS_OU_RCV=='1') {
				return true;
			}
			else if (docObj.ODWMSG.NEW_BY_OU=='Y' && (menuRule.ruleEnvSetting.draftCancelByDesk=='Y')) {
				return true;
			}
			else if (docObj.ODWMSG.DUE_DATE==='') {
				return true;
			}
			theLogger.log('篩選去除項目:' + option.txName + ', next=' + option.next + ' (SEPCIAL_CHECK:D)');
			return false;
		}
		
		// ToDo: 送研考人員銷號異動檢核
		if (option.specialCheck.indexOf('E')!=-1) {
			/*
			if(單位收文)
				EnableCancel = N
			else if(DraftCancelByDesk == Y && NewByOu==Y)	//若創稿登記桌一律可銷號(DraftCancelByDesk=Y)
				EnableCancel = Y
			else if(start_date =='')						//未出組室
				EnableCancel = Y
			else											//已出組室
				EnableCancel = N
			*/
			if (docObj.ODWMSG.IS_OU_RCV=='1') {
				return true;
			}
			else if (docObj.ODWMSG.NEW_BY_OU=='Y' && (menuRule.ruleEnvSetting.draftCancelByDesk=='Y')) {
				return true;
			}
			else if (docObj.ODWMSG.DUE_DATE==='') {
				return true;
			}
			theLogger.log('篩選去除項目:' + option.txName + ', next=' + option.next + ' (SEPCIAL_CHECK:E)');
			return false;
		}
		
		// INCHARGE_OU, OWN_OU_ID 之一級單位須相同
		if (option.specialCheck.indexOf('B')!=-1) {
			var inchargeUserId = (inchargeUser!==null) ? inchargeUser.UserId.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN) : '';
			var ownUserId = ownUser.UserId.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			if (inchargeUserId!=ownUserId) {
				theLogger.log('篩選去除項目:' + option.txName + ', next=' + option.next + ' (SEPCIAL_CHECK=B, ownOUId!=inchargeOUId)');
				return false;
			}
		}
		
		// "F" 業務類別是否符合
		if (option.specialCheck.indexOf('F')!==-1) {
			if (docObj.ODWMSG.NEW_BY_OU !== 'N') {
				theLogger.log('篩選去除項目:' + option.txName + ', next=' + option.next + ' (SEPCIAL_CHECK=F, NEW_BY_OU!="N")');
				return false;
			}
				
			//1051206 David 檢核資料夾
			if((docObj.folder + docObj.subfolder) != menuRule.ruleEnvSetting.OD99CanAppFolder) {
				theLogger.log('篩選去除項目:' + option.txName + ', next=' + option.next + 
				    ' (SEPCIAL_CHECK=F, doc_folder[=' + (docObj.folder + docObj.subfolder) + '] != menuRule.ruleEnvSetting.OD99CanAppFolder[=' +menuRule.ruleEnvSetting.OD99CanAppFolder + '])');
				return false;
			}
		}

		// 2021.10.20 - 1101298 線上公文亦應執行equalCheck
		if (option.equalCheck.length) {
			var sEqualCheck = option.equalCheck;
			var checkItem = '', docEqualCheck = docObj.get('ODWMSG', 'MPRULE_EQUAL_CHECK');
			var equalChecks = [];
			var equal = false;
			if (sEqualCheck.length) {
				if (docEqualCheck.length) {
					equalChecks = sEqualCheck.split(';');
					// 2021.12.1 - Eric, 鐵道北工處版更bug-fix (此處若未宣告"i", 會造成function外for loop的i值異常!?)
					let i=0;
					for(i=0; i<equalChecks.length; i++) {
						checkItem = equalChecks[i];
						if (checkItem.length && docEqualCheck==checkItem) {
							equal = true;
							break;
						}
					}
				}
				if (!equal) {
					theLogger.log('篩選去除項目:' + option.txName + ', next=' + option.next + ' (EQUAL_CHECK, option.equalCheck=[' + option.equalCheck +　'], ODWMSG.MPRULE_EQUAL_CHECK=[' + docEqualCheck + '])');
					return false;
				}
			}
		}
		
		return true;
	} /* End of _displayRuleOption() */
	
	function _buildDDLItemsFromTarget(option, cTarget, saveTargets) {
		var cntOption = cTarget.option.length;
		var i = 0, cOption;
		for (i=0; i<cntOption; i++) {
			cOption = cTarget.option[i];
			if (!!cOption) {
				var newTarget = {
					toOU: option.next,
					toOUId: cOption.ouId,
					toOUName: cOption.ouName,
					toRoleId: cOption.roleId,
					toRoleName: cOption.roleName,
					toUserId : cOption.userId,
					toUserName : cOption.userName,
					finalTarget: cOption._finalTarget,
					display: cOption._title
				};
				saveTargets.push(newTarget);
			}
		}
	}
	
	var folder='', subfolder='';
	
	if (((typeof currentFlow.Folder)=='undefined') || (currentFlow.Folder.length===0))
	{
		folder = currentFlow._nextFolder.nextfolder;
		subfolder = currentFlow._nextFolder.nextsubfolder;
	}
	else {
		folder = currentFlow.Folder;
		subfolder = currentFlow.SubFolder;
	}
	
	var menu = menuRule.getRule(folder, subfolder);
	if ((typeof menu == 'undefined') || (menu===null)) {
		alert('找不到文件夾:' + folder + '/' + subfolder + '的MenuRule!');
		theLogger.warn('找不到文件夾:' + folder + '/' + subfolder + '的MenuRule!');
		return null;
	}
	else {
		theLogger.log('Doc object folder=' + folder + ', subfolder=' + subfolder);
	}
	
	theLogger.log('Enumerate transTargets, Folder=' + folder + ', SubFolder=' + subfolder);
	
	/*
	 * ToDo: 無法開啟 會核中-主辦 項目原因確認!
	 * => 所有唯讀文件夾(回閱/已送出-線上簽核)流程相關處理!
	 *    a. 不分析各預排流程點的N_FOLDER, N_SUBFOLDER
	 *    b. 不分析目前所在流程!
	 * => 延伸問題: 若目前所在人員不在預排流程項目內, 是否可正確作業!?
	 */
	var _ownUserInfo = null;
	if (currentFlow.UserId.length) {
		_ownUserInfo = SSOUtil.getOrgUserInfo(orgNode, currentFlow.OUId, currentFlow.RoleId, currentFlow.UserId);
	}
	else {
		theLogger.error('ERROR! currentFlow.UserId is a null string.');
	}
	
	var theOwnUser = {
		OUId : currentFlow.OUId,
		OUName : SSOUtil.getOrgUnitName(orgNode, currentFlow.OUId),
		RoleId : currentFlow.RoleId,
		RoleName : SSOUtil.getOrgRoleName(orgNode, currentFlow.OUId, currentFlow.RoleId),
		UserId : currentFlow.UserId,
		UserName : (_ownUserInfo!==null) ? _ownUserInfo.UserName : '',
	};
	console.log('Own User info: OU=(' + theOwnUser.OUName + '-' + theOwnUser.OUId +
				') Role=(' + theOwnUser.RoleName + '-' + theOwnUser.RoleId +
				') User=(' + theOwnUser.UserName + '-' + theOwnUser.UserId + ')');
	
	/* 2015.6 - 公文分文/分辦前沒有承辦人 */
	var inchargeUserInfo = null;
	if (docObj.ICOUId.length && docObj.ICUserId.length) {
		inchargeUserInfo = SSOUtil.getOrgUserInfo(orgNode, docObj.ICOUId, SYS_CONST.ROLENO_OPERATOR, docObj.ICUserId, excludeRoleList);
	}
	var theInchargeUser = null;
	if (!!inchargeUserInfo) {
		theInchargeUser = {
			OUId: docObj.ICOUId,
			OUName: SSOUtil.getOrgUnitName(orgNode, docObj.ICOUId),
			UserId : docObj.ICUserId,
			UserName : inchargeUserInfo.UserName,
		};
		theLogger.log('Incharge User info: OU=(' + theInchargeUser.OUName + '-' + theInchargeUser.OUId +
					') User=(' + theInchargeUser.UserName + '-' + theInchargeUser.UserId + ')');
	}
		
	if (!!theInchargeUser) {
		if (!theInchargeUser.UserName || (theInchargeUser.UserName.length===0))
		{
			alert("-W- InchargeUserName不可為空字串!!!");
		}
	}
	
	// dump valid next here...
	console.debug('Basic valid Next = ' + _basicValidNext + ', extra valid next=' + _options.extraValidNext);
	
	var ruleCnt = menu.txList.length;
	var _theNextOptions = [];
	for(var i=0; i<ruleCnt; i++)
	{
		var exist = false;
		var option = menu.txList[i];
		var validNext = _isValidNext(option.next);
		if (!validNext) {
			console.log('option TX_NAME=' + option.txName + ', next=' + option.next + ' IS_VALID_NEXT: ' + (validNext ? 'Y' : 'N'));
		}
				
		if (validNext)
		{
			// 依公文狀態篩選應使用的傳送選項
			if (!_displayRuleOption(option, docObj, theInchargeUser, theOwnUser)) {
				continue;	
			}
			
			theLogger.debug('列舉異動別:"' + option.txName + '" (next=' + option.next + ')項目.');
			
			// 若TxName相同, 併入前一個
			var target = null;
			for(var x=0; x<_theNextOptions.length; x++) {
				var _target = _theNextOptions[x];
				if (_target.txName == option.txName) {
					target = _target;
					exist = true;
					break;
				}
			}
			
			if (!exist) {
				target = {
					txName: option.txName,
					next: option.next,
					ruleOption: option,
				};
				target.options = [];
			}
			
			//1140808	Leslie[退輔序65]	新增判別是否有可用的傳送對象
			// _setupDropDownListItems(orgNode, option, theOwnUser, theInchargeUser, target.options);
			var _hasValidTarget = _setupDropDownListItems(orgNode, option, theOwnUser, theInchargeUser, target.options);
			
			// 2015.5.25 - Eric Peng, 沒有傳送對象時, NEXT須為空值才能加入!
			var fAdd = false;
			//1140808	Leslie[退輔序65]	新增判別是否有可用的傳送對象
			// if (target.options.length>0) {
			if (_hasValidTarget && target.options.length>0) {
				target.finalTarget = false;
				fAdd = true;
			}
			else if (option.next.length===0) {
				target.finalTarget = true;
				fAdd = true;
			}
			
			if (!exist && fAdd) {
				_theNextOptions.push(target);
			}
		}
	}
	if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
		let _log = SSOUtil.dev_getTimeElapseStr('_buildEDocNextOptions', window.tmBeginBuildNextOptions);
		theLogger.time(_log);
		window.tmBeginBuildNextOptions = 0;
	}

	return _theNextOptions;
} /* End of _buildEDocNextOptions */


/* 目的: 建立紙本簽核公文傳送選單項目
 *
 * 參數:
 *	currentFlow: 目前流程點資訊
 *	menuRule: 公文隸屬機關的MenuRule
 *	orgNode: OrgInfo.xml的<OrgInfo> node
 *	docObj: 公文基資
 *  extraOptions: 其它設定 [forPopupMenu? ]
 */
function _buildPDocNextOptions(currentFlow, menuRule, orgNode, docObj, extraOptions /*, apporveTarget*/) {
	var _options = $.extend({approved:false, rejected:false },
							extraOptions);
	
	var _forPopupMenu = false;
	if (typeof _options.forPopupMenu !== 'undefined' && _options.forPopupMenu===true) {
		_forPopupMenu = true;
	}
	
	// 系統定義的常數
	var SYS_CONST = window.sso_const;
	var _ruleEnvSetting = menuRule.ruleEnvSetting;
	var _rule_const = window.MPRulePDoc_Const;
	var _docObj = docObj;
	var _szEnumTargetNext = ['D1', 'E1', 'E2', 'H', 'H1',
							 'H2', 'K', 'R', 'U', 'T',
							 'E', 'M1', 'E3', // 2021.7.8 - 1100433 Eric, merge: 2017.7.4 - 1060389, 新增'E3'
							 'E4', 'E5', 'E6', 'O4']; // 2021.7.8 - 1100433 Eric, merge: 2017.8.30 - 1060767, 新增'E4, E5, E6, O4'

	var excludeRoleList = ['OD16', 'OD17', 'OD97'];

	function _isValidNext(next) {
		// 2014.9 - 完整功能測試
		return true;
	}
	
	/*
	 * 檢核是否為: <NEXT>項目為空值, 目前已實作支援的異動別!
	 */
	/*function _isValidEmptyTx(txName) {
		switch (txName) {
		case '辦畢':
		case '分會':
			return true;
		}
		return false;
	}*/
	
	
	/* 是否應由OrgInfo取得傳送對象 */
	function _shouldEnumTargets(next) {
		var i=0;
		for(i=0; i<_szEnumTargetNext.length; i++) {
			if (next==_szEnumTargetNext[i]) {
				return true;
			}
		}
		return false;
	}

	function _getUnitNode(orgNode, unitNo) {
		if (orgNode && unitNo && unitNo.length)
		{
			if (orgNode) {
				var $orgNode = $(orgNode);
				var xpath = 'Unit[UnitCode="' + unitNo + '"]';
				var unitNode = ($orgNode.find(xpath))[0];
				if (unitNode) {
					return unitNode;
				}	
				else {
					theLogger.warn('-W- _getUnitNode() 找不到UnitNo=[' + unitNo + ']的 <Unit> node.');
				}
			}
		}
		else {
			theLogger.error('-ERR- _getUnitNode() invalid orgNode/unitNo');
		}
		return null;
	}
	
	function _getRoleNode(unitNode, roleNo) {
		if (!!unitNode && roleNo.length)
		{
			var rolePath = 'Role[RoleNo="' + roleNo + '"]';
			if (unitNode)
			{
				var roleNode = ($(unitNode).find(rolePath))[0];
				if (roleNode)
				{
					return roleNode;
				}	
				else {
					theLogger.warn('-W- _getRoleNode() 找不到RoleNo=[' + roleNo + ']的 <Role> node.');
				}
			}
		}
		return null;
	}
	
	function _getRoleOccupants(roleNode, excludeProxy) {
		excludeProxy = (typeof excludeProxy=='booelan' && excludeProxy===false) ? false : true;
		if (!!roleNode)
		{
			var roleOccupants = [];
			var occupantPath = 'RoleOccupant';
			if (roleNode)
			{
				var $occupantNodes = $(roleNode).find(occupantPath);
				var i = 0, cnt = $occupantNodes.length;
				var occupantNode;
				for(i=0; i<cnt; i++)
				{
					occupantNode = $occupantNodes[i];
					var account = SSOUtil.xml_getChildNodeValue(occupantNode, 'Account');
					var name = SSOUtil.xml_getChildNodeValue(occupantNode, 'Name');
					var sProxy = SSOUtil.xml_getAttrValue(occupantNode, 'IsProxy');
					var isProxy = false;
					if (excludeProxy) {
						if (!!sProxy && sProxy.length && (sProxy=='Y' || sProxy=='y')) {
							isProxy = true;
						}
					}
					
					if (!isProxy && !!account && account.length &&
						!!name && name.length) {
						roleOccupants.push({'account': account, 'name': name});
					}
				}
				return roleOccupants;
			}
		}
		return null;
	}
	
	/* 紙本公文傳送選單, 篩選目前可用的rules
	 * ruleOption: <Rule><OPTION>項目
	 * docObj: 目前開啟公文基資
	 * inchargeUser: 公文承辦人資訊
	 * ownUser: 公文目前所在人員資訊
	 * specialCheck: MP右鍵選單:true, Menu for ODC010: false
	*/
	function _displayRuleOption(ruleOption, docObj, inchargeUser, ownUser, forPopupMenu) {
		function _checkItem(strCheck, strItem) {
			if (strCheck.length && strCheck.indexOf(strItem)!==-1) {
				return true;
			}
			return false;
		}
		var i=0;
		var sBTypeNoList='', sBTypeNo='';
		var BTypeNoList = null;
		var match = false;
		var rule_const = window.MPRulePDoc_Const;
		var sc = window.sso_const;
		var value = '';
		if (ruleOption.ownOUId.length) {
			if (ruleOption.ownOUId!=ownUser.OUId) {
				theLogger.log('篩選去除項目:' + ruleOption.txName + ', next=' + ruleOption.next +
							' (ruleOption.ownOUId[' + ruleOption.ownOUId + ']!=ownUser.OUId['+ ownUser.OUId + '])');
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		}
		
		// 2016.11.3 - 序483
		if (!!ruleOption.ouLen && ruleOption.ouLen.length) {
			var len = parseInt(ruleOption.ouLen);
			if (len>0) {
				if (ownUser.OUId.length!=len) {
					theLogger.log('ruleOption.ouLen=' + ruleOption.ouLen + ', 不列入 (OwnOUId==' + ownUser.OUId + ')');
					return rule_const.MENU_ITEM_DISPLAYNONE;
				}
			}
		}
		
		// DUE_DATE空白才列出!
		if (_checkItem(ruleOption.specialCheck, 'G') && docObj.ODWMSG.DUE_DATE.length) {
			theLogger.log('篩選去除項目:' + ruleOption.txName + ', next=' + ruleOption.next + ' (SPECIAL_CHECK:G, DUE_DATE不為空白)');
			return rule_const.MENU_ITEM_DISPLAYNONE;
		}
		
		// DUE_DATE不為空白才列出!
		if (_checkItem(ruleOption.specialCheck, 'H') && (docObj.ODWMSG.DUE_DATE.length===0)) {
			theLogger.log('篩選去除項目:' + ruleOption.txName + ', next=' + ruleOption.next + ' (SPECIAL_CHECK:H, DUE_DATE為空白)');
			return rule_const.MENU_ITEM_DISPLAYNONE;
		}
		
		// 目前公文狀態DOC_STATE是否符合!
		if (ruleOption.docState.length && ruleOption.docState!=docObj.docState) {
			theLogger.log('篩選去除項目:' + ruleOption.txName + ', next=' + ruleOption.next + ' (公文狀態不同)');
			return rule_const.MENU_ITEM_DISPLAYNONE;
		}

		// 2021.9 - 1090862 Eric, 右鍵傳送選單不顯示[未發文公文送歸檔]項目
		if (forPopupMenu && SSO_CONFIG.OrgNickName=='HAC') {
			let closeType = docObj.get('ODWDCM', 'CLOSE_TYPE');
			let fSend = true;
			if (closeType=='3') {
				let closeMsgId = docObj.get('ODWDCM', 'CLOSE_MSG_ID');
				if (closeMsgId=='' || closeMsgId=='0') {
					fSend = false;
				}
			}

			// 歸檔傳送異動別清單[系統參數]
			let targetTXs = theSSO.User.SystemSets.get('ARC_TX_NAME').split(';');
			if (!fSend && ruleOption.txName.length && targetTXs.length && (targetTXs.indexOf(ruleOption.txName)!==-1)) {
				theLogger.log('篩選去除項目:' + ruleOption.txName + ', next=' + ruleOption.next + ' (未發文公文送歸檔)');
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		}
		
		if (ruleOption.txName=='送會簽') {
			theLogger.log('-I- debug txName:' + ruleOption.txName);
		}
		
		// [A] 已核決公文才列出
		if (_checkItem(ruleOption.specialCheck, 'A')) {
			if (docObj.ODWMSG.APP_USER_NAME.length===0) {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		}
		
		// [X]未核決公文才列出
		if (_checkItem(ruleOption.specialCheck, 'X')) {
			if (docObj.ODWMSG.APP_USER_NAME.length>0) {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		}

		// "F" 業務類別是否符合
		if (_checkItem(ruleOption.specialCheck, 'F')) {
			if (docObj.ODWMSG.NEW_BY_OU !== 'N') {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
				
			//1051206 David 檢核資料夾
			if((docObj.folder + docObj.subfolder) != _ruleEnvSetting.OD99CanAppFolder)
				return rule_const.MENU_ITEM_DISPLAYNONE;
		}
			
		// 2021.10.20 - 1101298 equalCheck提前至銷號檢核前執行!
		if (ruleOption.equalCheck.length) {
			var sEqualCheck = ruleOption.equalCheck;
			var checkItem = '', docEqualCheck = docObj.get('ODWMSG', 'MPRULE_EQUAL_CHECK');
			var equalChecks = [];
			var equal = false;
			if (sEqualCheck.length) {
				if (docEqualCheck.length) {
					equalChecks = sEqualCheck.split(';');
					// 2021.12.1 - Eric, 鐵道北工處版更bug-fix (此處若未宣告"i", 會造成function外for loop的i值異常!?)
					let i=0;
					for(i=0; i<equalChecks.length; i++) {
						checkItem = equalChecks[i];
						if (checkItem.length && docEqualCheck==checkItem) {
							equal = true;
							break;
						}
					}
				}
				
				if (!equal) {
					return rule_const.MENU_ITEM_DISPLAYNONE;
				}
			}
		}

		// 2016.11.24 - Eric Peng, bug-fix 不作銷號檢核回傳ENABLE
		// 不作檢核, for ODC010 Menu item
		if (!forPopupMenu && !_checkItem(ruleOption.specialCheck, 'C')) { 
			return rule_const.MENU_ITEM_ENABLE;
		}
		
		// 銷號檢查 "C"
		if (_checkItem(ruleOption.specialCheck, 'C')) {
			var subfolder = docObj.subfolder;
			if (subfolder.length) {
				subfolder += ';';
			}
			
			if (_ruleEnvSetting.mainCancelSubfolder.indexOf(subfolder) !== -1) {
				theLogger.log('-I- CheckCancel cond=1, check mainCancelSubfolder...');
				if (ruleOption.advancedCheck.indexOf('5')!== -1) {
					if (docObj.ODWMSG.TX_REASON.length===0) {
						return rule_const.MENU_ITEM_DISABLE;
					}
					
					// 併辦公文不可銷號
					if (docObj.get('ODWDCM', 'COM_DOC_COMBINE_TYPE')!=='1') {
						return rule_const.MENU_ITEM_DISABLE;
					}
					return rule_const.MENU_ITEM_ENABLE;
				}
				return rule_const.MENU_ITEM_ENABLE;
			}
			else if (docObj.IS_OURCV==='1') {
				theLogger.log('CheckCancel cond=5, IS_OURCV=' + docObj.IS_OURCV + ' ...');
				if (ruleOption.advancedCheck.indexOf('5')!== -1) {
					if (docObj.ODWMSG.TX_REASON.length===0) {
						return rule_const.MENU_ITEM_DISABLE;
					}
					
					// 併辦公文不可銷號
					if (docObj.get('ODWDCM', 'COM_DOC_COMBINE_TYPE')!=='1') {
						return rule_const.MENU_ITEM_DISABLE;
					}
					return rule_const.MENU_ITEM_ENABLE;
				}
				return rule_const.MENU_ITEM_ENABLE;
			}
			else if (_ruleEnvSetting.draftCancelByDesk=='Y' && docObj.get('ODWMSG', 'NEW_BY_OU')==='Y') {
				theLogger.log('CheckCancel cond=2, draftCancelByDesk=' + _ruleEnvSetting.draftCancelByDesk + ', NEW_BY_OU=' + docObj.get('ODWMSG', 'NEW_BY_OU'));
				if (ruleOption.advancedCheck.indexOf('5')!== -1) {
					if (docObj.ODWMSG.TX_REASON.length===0) {
						return rule_const.MENU_ITEM_DISABLE;
					}
					
					// 併辦公文不可銷號
					if (docObj.get('ODWDCM', 'COM_DOC_COMBINE_TYPE')!=='1') {
						return rule_const.MENU_ITEM_DISABLE;
					}
					return rule_const.MENU_ITEM_ENABLE;
				}
				return rule_const.MENU_ITEM_ENABLE;
			}
			else if (docObj.dueDate.length===0 &&
					 ruleOption.specialCheck.indexOf(rule_const.MENU_CHECK_DUE_DATE_EMPTY)==-1 &&
					 ruleOption.specialCheck.indexOf(rule_const.MENU_CHECK_DUE_DATE_EMPTY)==-1) {
				theLogger.log('CheckCancel cond=3, docObj.dueDate 為空字串.');
				if (ruleOption.advancedCheck.indexOf('5')!== -1) {
					if (docObj.ODWMSG.TX_REASON.length===0) {
						return rule_const.MENU_ITEM_DISABLE;
					}
					
					// 併辦公文不可銷號
					if (docObj.get('ODWDCM', 'COM_DOC_COMBINE_TYPE')!=='1') {
						return rule_const.MENU_ITEM_DISABLE;
					}
					return rule_const.MENU_ITEM_ENABLE;
				}
				return rule_const.MENU_ITEM_ENABLE;
			}
			else if (ruleOption.specialCheck.indexOf(rule_const.MENU_CHECK_DUE_DATE_EMPTY)==-1 &&
					 ruleOption.specialCheck.indexOf(rule_const.MENU_CHECK_DUE_DATE_EMPTY)==-1) {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		} // End of 銷號檢核'C'
		
		// O + "B": 公文在承辦單位(相同一級單位)
		if (_checkItem(ruleOption.advancedCheck, 'B')) { 
			var ICOUId = docObj.ICOUId; //ICOuId; 2018.8.31 - Eric, 1070927 bug-fix
			var ownOUId = docObj.ownOUId;
			if (ICOUId.length>sc.FIRSTCLASS_UNITNO_LEN) {
				ICOUId = ICOUId.substring(0, sc.FIRSTCLASS_UNITNO_LEN);
			}
			if (ownOUId.length>sc.FIRSTCLASS_UNITNO_LEN) {
				ownOUId = ownOUId.substring(0, sc.FIRSTCLASS_UNITNO_LEN);
			}
			
			if (ownOUId!==ICOUId) {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		}
		
		// 2021.10.20 - 1101298 equalCheck提前至銷號檢核前執行!
		// if (ruleOption.equalCheck.length) { ...
		
		// "F" 業務類別是否符合
		if (_checkItem(ruleOption.specialCheck, 'F')) {
			// 2016.12.5 - 1051175, FDA才會檢核核決者, 其它機關會在TSP作業中自動給值! (此時尚未設值)
			var appUserDataOk = true;
			if (SSO_CONFIG.OrgNickName=='FDA' && docObj.ODWMSG.APP_USER_NAME.length===0) {
				appUserDataOk = false;
			}
			
			if (!appUserDataOk || // docObj.ODWMSG.APP_USER_NAME.length===0 ||
				docObj.ODWMSG.NEW_BY_OU !== 'N' ||
				docObj.ODWMSG.COM_TYPE != '2') {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
			else {
				sBTypeNoList = _ruleEnvSetting.OD99CanApproveBTypeNo; // BTypeNoList string format: '52;11;14'
				if (sBTypeNoList.length) {
					BTypeNoList = sBTypeNoList.split(';');
				}
				
				//2017.10.24 - 1060953 鐵工局如為彙辦公文，可使用承辦人自行決行
				var match = false;
				if (SSO_CONFIG.OrgNickName=='RRB' && docObj.ODWDCM.COMBINE_TYPE_2 === "1"){
					match = true;
				}
				else
				{
					match = false;
					for(i=0; i<BTypeNoList.length; i++) {
						sBTypeNo = BTypeNoList[i];
						if (sBTypeNo.length) {
							if (sBTypeNo==docObj.ODWMSG.B_TYPE_NO) {
								match = true;
								break;
							}
						}
					}
				}
				
				if (!match) {
					return rule_const.MENU_ITEM_DISPLAYNONE;
				}
			}
		}
		// O + 1, 主旨及文號不可為空白
		if (_checkItem(ruleOption.advancedCheck, '1')) {
			if (docObj.subject.length===0)
				return rule_const.MENU_ITEM_DISABLE;
			if (docObj.docNo.length===0)
				return rule_const.MENU_ITEM_DISABLE;
		}
		
		// O + 2, 分類號不可為空白
		if (_checkItem(ruleOption.advancedCheck, '2')) {
			if (docObj.get('ODWMSG', 'FILE_CLS').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
			if (_ruleEnvSetting.checkFileCase && docObj.get('ODWMSG', 'FILE_CASE').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		// O + "3", 保存年限
		if (_checkItem(ruleOption.advancedCheck, '3')) {
			if (docObj.get('ODWMSG', 'KEEP_YEAR').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		// O + "4", 檔案數量
		if (_checkItem(ruleOption.advancedCheck, '4')) {
			value = docObj.get('ODWMSG', 'FILE_CNT');
			if (value.length===0 || value=='0') {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		// O + "5", 銷號原因
		if (_checkItem(ruleOption.advancedCheck, '5')) {
			if (docObj.get('ODWMSG', 'TX_REASON').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		//  O + "6", 關鍵字檢核
		if (_checkItem(ruleOption.advancedCheck, '6')) {
			if (docObj.get('ODWMSG', 'KEY_WORD').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		//  O + "7", 核決者/剔退者擇一
		if (_checkItem(ruleOption.advancedCheck, '7')) {
			if (docObj.get('ODWMSG', 'APP_USER_NAME').length===0 &&
				docObj.get('ODWMSG', 'REJECT_USER_NAME').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		// O + "8", 開會日期
		if (_checkItem(ruleOption.advancedCheck, '8')) {
			value = docObj.get('ODWMSG', 'MEET_DATE');
			if (docObj.get('ODWMSG', 'B_TYPE_NO')==_ruleEnvSetting.checkMeetDateBTypeNo  && value.length!=7) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		return rule_const.MENU_ITEM_ENABLE;
	} /* End of _displayRuleOption() */
	
	/* 紙本公文傳送選單, 取得指定角色人員 */
	function _getUnitTargets(sNext, orgNode, saveTargets, unitNo, targetRoles, includeSubUnit, isGroupBySubUnits) {
		function _setupRoleTarget(roleNode, sNext, toOUId, toOUName, saveTargets) {
			var roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
			var roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			
			var occupants = _getRoleOccupants(roleNode, true);
			var i=0, occupant=null, theTarget=null, cnt=0;
			if (occupants!==null && occupants.length) {
				for(i=0; i<occupants.length; i++) {
					occupant = occupants[i];
					theTarget = {
						toOU: sNext,
						finalTarget: true,
						'toOUId': toOUId,
						'toOUName': toOUName,
						toRoleId: roleNo,
						toRoleName: roleName,
						toUserId: occupants[i].account,
						toUserName: occupants[i].name,
					};
					
					if (theTarget.toUserId.length) {
						theTarget.toUserId = theTarget.toUserId.toUpperCase();
					}
					
					cnt++;
					saveTargets.push(theTarget);
				}
			}
			return cnt;
		}
		
		var unitNode = _getUnitNode(orgNode, unitNo);
		var unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
		
		var $subUnitNodes, subUnitCnt, subUnitNode, subUnitNo, subUnitName;
		var $roleNodes, roleCnt, roleNode, roleNo;
		//var roleNode = _getRoleNode(unitNode, toRoleId);
		
		var i=0, j=0, totalCnt=0, cnt=0;
		var subUnitTarget = null, listTarget = null;
		
		$roleNodes = $(unitNode).children('Role');
		roleCnt = $roleNodes.length;
		for(j=0; j<roleCnt; j++)
		{
			roleNode = $roleNodes[j];
			if (!!roleNode) {
				roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
				if (targetRoles.indexOf(roleNo)==-1) { // 須在角色清單(listUndertakerRole)才列入
					continue;
				}
				cnt = _setupRoleTarget(roleNode, sNext, unitNo, unitName, saveTargets);
				totalCnt += cnt;
			}
		}
		
		if (unitNo.length==SYS_CONST.FIRSTCLASS_UNITNO_LEN && includeSubUnit) {
			$subUnitNodes = $(unitNode).children('Unit');
			subUnitCnt = $subUnitNodes.length;
			for(i=0; i<subUnitCnt; i++) {
				subUnitNode = $subUnitNodes[i];
				subUnitNo = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitNo');
				subUnitName = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitName');
				
				if (isGroupBySubUnits) {
					subUnitTarget = {
						toOU: sNext,
						finalTarget: false,
						'toOUId': subUnitNo,
						'toOUName': subUnitName,
						toRoleId: '', toRoleName: '',
						toUserId: '', toUserName: '',
						options: []
					};
					listTarget = subUnitTarget.options;
				}
				else {
					listTarget = saveTargets;
				}
					
				$roleNodes = $(subUnitNode).children('Role');
				roleCnt = $roleNodes.length;
				for(j=0; j<roleCnt; j++)
				{
					roleNode = $roleNodes[j];
					roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
					if (targetRoles.indexOf(roleNo)==-1) { // 須在角色清單(listUndertakerRole)才列入
						continue;
					}
					cnt = _setupRoleTarget(roleNode, sNext, subUnitNo, subUnitName, listTarget);
					totalCnt += cnt;
				}
				
				if (!!subUnitTarget && subUnitTarget.options.length) {
					saveTargets.push(subUnitTarget);
				}
			}
		}
		
		return totalCnt;
	}
	
	/* 移除<CTarget>子項目為指定unitNo者 */
	function _removeSubUnitOfCTarget(srcCTarget, unitNo) {
		var newCTarget = {
			_nextType: srcCTarget._nexttype,
			options: []
		};
		
		var i=0;
		var option = null;
		for(i=0; i<srcCTarget.options.lenght; i++) {
			option = srcCTarget.options[i];
			if (option===null) continue;
			
			if (option.OUId !== unitNo) {
				newCTarget.options.push(option);
			}
		}
		
		return newCTarget;
	}
	
	/* 將<CTarget>/<OPTION> 項目轉換為傳送選單項目 */
	function _addCTargetOption(finalTarget, cTargetOption) {
		var newTarget = {
			toOU: finalTarget.next,
			finalTarget: cTargetOption._finalTarget,
			toOUId: cTargetOption.ouId,
			toOUName: cTargetOption.ouName,
			toRoleId: cTargetOption.roleId,
			toRoleName: cTargetOption.roleName,
			toUserId: cTargetOption.userId,
			toUserName: cTargetOption.userName,
			options: []
		};
		
		// 2017.7.6	- bug fix
		if (typeof cTargetOption._title=='string' && cTargetOption._title.length) {
			newTarget.title = cTargetOption._title;
		}
		
		var i = 0;
		var cntChild = cTargetOption.options.length;
		var _childOption;
		for(i=0; i<cntChild; i++) {
			_childOption = cTargetOption.options[i];
			_addCTargetOption(newTarget, _childOption);
		}
		
		finalTarget.options.push(newTarget);
	}
	
	/* enumerate specified 'NEXT' targets
	 * orgNode: orgNode for OrgInfo_$OrgNo$.xml
	 * sNext: <TX_LIST>/<OPTION>/<NEXT> value
	 * offset: offset value decided via MINUS attribute (<TX_LIST>/<OPTION>/<NEXT MINUS="x">)
	 * ownUser: ownUser info
	 * inchargeUser : incharge user info
	 * [out] saveTarget: save rslt here
	 * underTakerRoles: 可辦公文角色 (array)
	 * showUnitRoleId: 須有此角色才可列出指定單位(string)
	*/
	function _enumTargets(orgNode, sNext, offset, ownUser, inchargeUser, saveTarget, listUnderTakerRole, showUnitRoleId) {
		var cnt=0, theTarget=null, unitTarget=null;
		var unitNo, unitNode, unitName, roleNode, roleNo, roleName;
		var userInfo;
		var i=0, j=0, found=false;
		
		if (sNext==='K') {
			/*
			 * 取得指定單位下之承辦人
			 * [showUnitRoleId] => 若該指定單位為一級單位且有子單位，則分層級列出子單位承辦人
			 */
	
			/* 是否依二級單位區分使用者
			  2007.03.20 - Eric Peng, 勞委會要求傳送對象layout應與先前版本相同，不再多加二級單位區分
			  New(ClassWithSubUnit)	Org
			 ------------------------------------------------
			  人事室				人事室
			    aaa					  aaa
			    bbb					  bbb
			    一科				  ccc
			      ccc				  ddd
			      ddd				  eee
			    二科				  fff 
			      eee
			      fff
			*/
			var isClassWithSubUnits = _ruleEnvSetting.KClassWithSubUnit;
			cnt = _getUnitTargets(sNext, orgNode, saveTarget.options, ownUser.OUId, listUnderTakerRole, true, isClassWithSubUnits);
			theLogger.log('-I- next="' + sNext + '", _enumTarget count=' + cnt);
			//2017.9.25 David 補上回傳值
			return cnt;
		}
		else if (sNext=='D1') {
			/* DDL1: 公文承辦人
			 * DDL2, DDL3: N/A */
			userInfo = SSOUtil.getOrgUserInfo(orgNode, inchargeUser.OUId, '', inchargeUser.UserId, null, true);
			if (!!userInfo) {
				theTarget = {
					toOU: sNext,
					finalTarget: true,
					'toOUId': inchargeUser.OUId,
					'toOUName': inchargeUser.OUName,
					toRoleId: userInfo.RoleId,
					toRoleName: userInfo.RoleName,
					toUserId: inchargeUser.UserId,
					toUserName: inchargeUser.UserName,
				};
				saveTarget.options.push(theTarget);
				return 1;
			}
			else {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', cannot find userInfo for OUId=' + inchargeUser.OUId + ', UserId=' + inchargeUser.UserId);
				return 0;
			}
		}
		else if (sNext=='E' || sNext=='E1' || sNext=='E2') {
			/* DDL1: 訊息所在單位登記桌
			 * DDL2, DDL3: N/A */
			/* E: 一級單位, E1: InchargeOU 單位, E2: 二級單位 */
			unitNo = ownUser.OUId;
			if ((typeof unitNo =='undefined') || unitNo===null || unitNo.length===0) {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId.');
				return 0;
			}
			if (sNext=='E') {
				if (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					unitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
				}
			}
			else if (sNext=='E2') {
				if (unitNo.length<=SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					theLogger.error('Error! _enumTargets() next=' + sNext + ', 但OwnOUId字串長度有誤, [' + unitNo + ', length=' + unitNo.length + '] <= 一級單位代碼長度.');
					return 0;
				}
			}
			
			unitNode =_getUnitNode(orgNode, unitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_REGISTER); // 登記桌
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			if (!!roleNode) {
				theTarget = {
					toOU: sNext,
					finalTarget: true,
					'toOUId': unitNo,
					'toOUName': unitName,
					toRoleId: SYS_CONST.ROLENO_REGISTER,
					toRoleName: roleName,
					toUserId: '', toUserName: '',
				};
				saveTarget.options.push(theTarget);
				return 1;
			}
			else {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', cannot find roleTarget for OUId=' + unitNo + ', RoleId=' + SYS_CONST.ROLENO_REGISTER);
				return 0;
			}
		}
		else if (sNext=='H' || sNext=='H1' || sNext=='H2') {
			/* DDL1: 承辦單位登記桌
			 * DDL2, DDL3: N/A */
			
			/* H: 一級單位, H1: InchargeOU 單位, H2: 二級單位 */
			unitNo = inchargeUser.OUId;
			if ((typeof unitNo == 'undefined') || unitNo===null || unitNo.length===0) {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid inchargeUser.OUId.');
				return 0;
			}
			if (sNext=='H') {
				if (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					unitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
				}
			}
			else if (sNext=='H2') {
				if (unitNo.length<=SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					theLogger.error('Error! _enumTargets() next=' + sNext + ', 但inchargeOUId字串長度有誤, [' + unitNo + ', length=' + unitNo.length + '] <= 一級單位代碼長度.');
					return 0;
				}
			}
			
			unitNode =_getUnitNode(orgNode, unitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_REGISTER); // 登記桌
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			if (!!roleNode) {
				theTarget = {
					toOU: sNext,
					finalTarget: true,
					'toOUId': unitNo,
					'toOUName': unitName,
					toRoleId: SYS_CONST.ROLENO_REGISTER,
					toRoleName: roleName,
					toUserId: '', toUserName: '',
				};
				saveTarget.options.push(theTarget);
				return 1;
			}
			else {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', cannot find roleNode for OUId=' + unitNo + ', RoleId=' + SYS_CONST.ROLENO_REGISTER);
				return 0;
			}
		}
		else if (sNext=='M1') {
			/* DDL1: 承辦單位會簽人員(OD97) [一級]
			 * DDL2, DDL3: N/A */
			
			unitNo = inchargeUser.OUId;
			if ((typeof unitNo == 'undefined') || unitNo===null || unitNo.length===0) {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid inchargeUser.OUId.');
				return 0;
			}
			
			// 取一級單位!
			if (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				unitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			}
			
			unitNode =_getUnitNode(orgNode, unitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_COSIGN); // 會簽人員
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			if (!!roleNode) {
				theTarget = {
					toOU: sNext,
					finalTarget: true,
					'toOUId': unitNo,
					'toOUName': unitName,
					toRoleId: 'OD97',
					toRoleName: roleName,
					toUserId: '', toUserName: '',
				};
				saveTarget.options.push(theTarget);
				return 1;
			}
			else {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', cannot find roleTarget for OUId=' + unitNo + ', RoleId=' + SYS_CONST.ROLENO_COSIGN);
				return 0;
			}
		}
		else if (sNext=='R') {
			/* DDL1: 目前公文所在一級單位下所有二級單位
		     * DDL2, DDL3: N/A */
			unitNo = ownUser.OUId;
			if (!!unitNo && (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN)) {
				unitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			}

			unitNode = _getUnitNode(orgNode, unitNo);
			
			var $subUnitNodes, subUnitCnt, subUnitNode, subUnitNo, subUnitName;
			var $roleNodes, roleCnt;
			var occupants = null;
			$subUnitNodes = $(unitNode).children('Unit');
			subUnitCnt = $subUnitNodes.length;
			for(i=0; i<subUnitCnt; i++) {
				found = false;
				subUnitNode = $subUnitNodes[i];
				subUnitNo = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitNo');
				subUnitName = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitName');
				if (subUnitNo.length) {
					if (offset==_rule_const.OFFSET_RMV_CURRENT_OU_L2 && unitNo===ownUser.OUId) {
						continue; // R#, 排除目前公文所在二級單位
					}
					
					$roleNodes = $roleNodes = $(subUnitNode).children('Role');
					roleCnt = $roleNodes.length;
					for (j=0; j<roleCnt; j++) {
						occupants = null;
						roleNode = $roleNodes[j];
						roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
						/* 單位下須有showUnitRoleId指定角色,且有人扮演該角色才列出 */
						if (roleNo==showUnitRoleId) {
							occupants = _getRoleOccupants(roleNode, true);
							if (occupants.length) {
								found = true;
								break;
							}
						}
					}
					
					if (found) {
						theTarget = {
							toOU: sNext,
							finalTarget: true,
							'toOUId': subUnitNo,
							'toOUName': subUnitName,
							toRoleId: '', toRoleName: '',
							toUserId: '', toUserName: '',
						};
						saveTarget.options.push(theTarget);
						cnt++;
					}
				}
			}
			theLogger.log('-I- next="' + sNext + '", UnitNo="' + unitNo + '", _enumTarget count=' + cnt);
			return cnt;
		}
		else if (sNext=='U') {
			/* DDL1: 所有一級單位 (排除一層決行及虛擬單位)
			 * DDL2: 二級單位
			 * DDL3: 承辦人 */
			var $unitNodes, unitCnt;
			unitTarget = null; i=0;
			var subCnt = 0;
			
			$unitNodes = $(orgNode).children('Unit');
			unitCnt = $unitNodes.length;
			for(i=0; i<unitCnt; i++) {
				unitNode = $unitNodes[i];
				virtual = SSOUtil.xml_getChildNodeValue(unitNode, 'Virtual');
				if ((typeof virtual==='undefined') || (virtual.length===0))
					continue;
				
				/* const int MODE_VIRTUAL_DEPT	=0; // 虛擬單位 (Virtual=2)
					const int MODE_COMMON_DEPT	=1; // 一般單位 (Virtual=1)
					const int MODE_BOTH_DEPT	=2; // 列出所有單位
					const int MODE_APPROVE_DEPT =3; // 決行單位 (Virtual=3, 6)
					const int MODE_DOC_PROCESS_DEPT = 4; // Virtual = 1 or Virtual = 6 (可辦文之一層決行單位), 2007.02.12 - Eric Peng
					
					#define COMMON_UNIT		"1"  // 一般單位
					#define VIRTUAL_UNIT	"2"	 // 虛擬單位, Ex 總收,總發, 研考
					#define APPROVE_UNIT    "3"  // 一層決行單位, Ex. 主任祕書室, 副首長室, 首長室
					#define APPROVE_COMMON_UNIT "6" // 可辦文之一層決行單位
					#define COMMON_ROLE		"OD99"
				 */
				
				// using MODE_COMMON_DEPT here...
				if (virtual!=='1')
					continue;
				
				// 2021.6.11 - 1100747 Eric, bug-fix (醫策會TO_OU='U' menuRule)
				unitNo = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitNo');
				unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
				unitTarget = {
					toOU: sNext,
					finalTarget: false,
					'toOUId': unitNo,
					'toOUName': unitName,
					toRoleId: '', toRoleName: '', toUserId: '', toUserName: '',
					options: [],
				};
				subCnt = _getUnitTargets(sNext, orgNode, unitTarget.options, unitNo, listUnderTakerRole, true, true);
				cnt += subCnt;
				
				saveTarget.options.push(unitTarget);
			}
			theLogger.log('-I- next="' + sNext + '", _enumTarget count=' + cnt);
			return cnt;
		}
		else if (sNext=='T') {
			/* DDL1: 公文所在一級單位+其下之二級單位
			 * DDL2: 承辦人
			 * DDL3: N/A */
			unitNo = ownUser.OUId;
			if (!!unitNo && unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				unitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			}
			
			if (!!unitNo && unitNo.length) {
				cnt = _getUnitTargets(sNext, orgNode, saveTarget.options, unitNo, listUnderTakerRole, true, true);
			}
			theLogger.log('-I- next="' + sNext + '", UnitNo="' + unitNo + '", _enumTarget count=' + cnt);
			return cnt;
		}
		else if (sNext=='E3') { // 2021.7.8 - 1100433 Eric, merge: 2017.6.30 - 成大需求1060389, 新增紙本簽核傳送至人TO_OU項目
			/* DDL1: 訊息所在單位
			 * DDL2: 單位長官角色, 
			 * DDL3: 人員名稱
			 */
			
			var subCnt = 0;
			unitNo = ownUser.OUId;
			if ((typeof unitNo =='undefined') || unitNo===null || unitNo.length===0) {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId.');
				return 0;
			}
			unitNode =_getUnitNode(orgNode, unitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			var listRoleNo=null, listRoleNoSuper=null;

			var unitNodeSuper=null, unitNoSuper='', unitNameSuper='';
			//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
			// var _unitNo = parseInt(unitNo);
			if (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) { // 公文在二級單位
				listRoleNo = SYS_CONST.SECONDCLASS_OFFICER;

				unitNodeSuper = _getUnitNode(orgNode, unitNo.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN));
				if (typeof unitNodeSuper!='undefined' && unitNodeSuper!==null) {
					unitNoSuper = unitNo.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
					unitNameSuper = SSOUtil.xml_getChildNodeValue(unitNodeSuper, 'UnitName');
					listRoleNoSuper = SYS_CONST.FIRSTCLASS_OFFICER;
				}
				else {
					unitNodeSuper = null;
				}
			}
			//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
			// else if (!isNaN(_unitNo) && _unitNo<SYS_CONST.APPROVEUNIT_NUM) { // 公文在一級單位(非核決單位)
			else if (unitNo<SYS_CONST.APPROVEUNIT_NUM) { // 公文在一級單位(非核決單位)
				listRoleNo = SYS_CONST.FIRSTCLASS_OFFICER;
			}
			else {
				listRoleNo = [];
			}

			var listValidRoleNo=[], listValidRoleName=[], listValidRoleNoSuper=[], listValidRoleNameSuper=[];

			var i=0, roleNode=null;
			if (listRoleNoSuper!==null && listRoleNoSuper.length) {
				for(i=0; i<listRoleNoSuper.length; i++) {
					roleNode = _getRoleNode(unitNodeSuper, listRoleNoSuper[i]);
					if (typeof roleNode=='object' && roleNode!==null) {
						roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
						if (roleName.length) {
							listValidRoleNoSuper.push(listRoleNoSuper[i]);
							listValidRoleNameSuper.push(roleName);
						}
					}
				}
			}

			// 篩選RoleNo, 指定單位內有的長官角色才加入!
			for(i=0; i<listRoleNo.length; i++) {
				roleNode = _getRoleNode(unitNode, listRoleNo[i]);
				if (typeof roleNode=='object' && roleNode!==null) {
					roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
					if (roleName.length) {
						listValidRoleNo.push(listRoleNo[i]);
						listValidRoleName.push(roleName);
					}
				}
			}

			if (listValidRoleNoSuper.length) {
				unitTarget = {
					toOU: sNext,
					finalTarget: false,
					'toOUId': unitNoSuper,
					'toOUName': unitNameSuper,
					toRoleId: '', toRoleName: '', toUserId: '', toUserName: '',
					options: [],
				};

				for(i=0; i<listValidRoleNoSuper.length; i++) {
					roleTarget = {
						toOU: sNext,
						finalTarget: false,
						'toOUId': unitNoSuper,
						'toOUName': unitNameSuper,
						toRoleId: listValidRoleNoSuper[i], 
						toRoleName: listValidRoleNameSuper[i], 
						toUserId: '', toUserName: '',
						options: [],
					};
					subCnt = _getUnitTargets(sNext, orgNode, roleTarget.options, unitNoSuper, [listValidRoleNoSuper[i]], false, false);
					cnt += subCnt;
					if (subCnt) {
						unitTarget.options.push(roleTarget);
					}
				}

				if (unitTarget.options.length) {
					saveTarget.options.push(unitTarget)
				}
			}
						
			if (listValidRoleNo.length) {
				unitTarget = {
					toOU: sNext,
					finalTarget: false,
					'toOUId': unitNo,
					'toOUName': unitName,
					toRoleId: '', toRoleName: '', toUserId: '', toUserName: '',
					options: [],
				};

				for(i=0; i<listValidRoleNo.length; i++) {
					roleTarget = {
						toOU: sNext,
						finalTarget: false,
						'toOUId': unitNo,
						'toOUName': unitName,
						toRoleId: listValidRoleNo[i], 
						toRoleName: listValidRoleName[i], 
						toUserId: '', toUserName: '',
						options: [],
					};
					subCnt = _getUnitTargets(sNext, orgNode, roleTarget.options, unitNo, [listValidRoleNo[i]], false, false);
					cnt += subCnt;
					if (subCnt) {
						unitTarget.options.push(roleTarget);
					}
				}

				if (unitTarget.options.length) {
					saveTarget.options.push(unitTarget)
				}
			}
			theLogger.log('-I- next="' + sNext + '", UnitNo="' + unitNo + '", _enumTarget count=' + cnt);
			return cnt;
		}
		else if (sNext=='E4') { // // 2021.7.8 - 1100433 Eric, merge: 2017.8.30 - 1060767
			/* DDL1: 公文承辦人(OD99) [目前所在單位]
			 * DDL2, DDL3: N/A */
			
			unitNo = ownUser.OUId;
			if ((typeof unitNo == 'undefined') || unitNo===null || unitNo.length===0) {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId.');
				return 0;
			}
			 
			if (!!unitNo && unitNo.length) {
				cnt = _getUnitTargets(sNext, orgNode, saveTarget.options, unitNo, listUnderTakerRole, false, false);
			}
			theLogger.log('-I- next="' + sNext + '", UnitNo="' + unitNo + '", _enumTarget count=' + cnt);
			return cnt;
		}
		else if (sNext=='E5' || sNext=='E6' || sNext=='O4') { // // 2021.7.8 - 1100433 Eric, merge: 2017.8.30 - 1060767
			/* DDL1: (E5)訊息所在單位(只能是2級)之1級單位
					 (E6)公文承辦1級單位
					 (O4)訊息所在單位(1/2級)
			 * DDL2: 單位長官角色, 
			 * DDL3: 人員名稱
			 */
			
			var targetUnitNo = '';
			var listRoleNo=null;
			if (sNext=='E5') {
				unitNo = ownUser.OUId;
				if ((typeof unitNo =='undefined') || unitNo===null || unitNo.length===0) {
					theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId.');
					return 0;
				}
				else if (unitNo.length<=SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					theLogger.warn('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId[=' + unitNo + '] 須為3碼以上');
					return 0;
				}
				targetUnitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
				listRoleNo = SYS_CONST.FIRSTCLASS_OFFICER;
			}
			else if (sNext=='E6') {
				unitNo = inchargeUser.OUId;
				if ((typeof unitNo =='undefined') || unitNo===null || unitNo.length===0) {
					theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId.');
					return 0;
				}

				// 取1級承辦單位
				if (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					targetUnitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
				}
				else {
					targetUnitNo = unitNo;
				}
				listRoleNo = SYS_CONST.FIRSTCLASS_OFFICER;
			}
			else if (sNext=='O4') {
				targetUnitNo = ownUser.OUId;
				if (targetUnitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					listRoleNo = SYS_CONST.SECONDCLASS_OFFICER;
				}
				else {
					listRoleNo = SYS_CONST.FIRSTCLASS_OFFICER;
				}
			}
			console.log('sNext="' + sNext + '", targetUnitNo="' + targetUnitNo + '", lsitRoleNo="' + listRoleNo.toString() + '"');
			
			unitNode =_getUnitNode(orgNode, targetUnitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			
			//var unitNodeSuper=null, unitNoSuper='', unitNameSuper='';
			var _unitNo = parseInt(unitNo);
			var listValidRoleNo=[], listValidRoleName=[];

			var i=0, roleNode=null;
			// 篩選RoleNo, 指定單位內有的長官角色才加入!
			for(i=0; i<listRoleNo.length; i++) {
				roleNode = _getRoleNode(unitNode, listRoleNo[i]);
				if (typeof roleNode=='object' && roleNode!==null) {
					roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
					if (roleName.length) {
						listValidRoleNo.push(listRoleNo[i]);
						listValidRoleName.push(roleName);
					}
				}
			}

			if (listValidRoleNo.length) {
				unitTarget = {
					toOU: sNext,
					finalTarget: false,
					'toOUId': targetUnitNo,
					'toOUName': unitName,
					toRoleId: '', toRoleName: '', toUserId: '', toUserName: '',
					options: [],
				};

				for(i=0; i<listValidRoleNo.length; i++) {
					roleTarget = {
						toOU: sNext,
						finalTarget: false,
						'toOUId': targetUnitNo,
						'toOUName': unitName,
						toRoleId: listValidRoleNo[i], 
						toRoleName: listValidRoleName[i], 
						toUserId: '', toUserName: '',
						options: [],
					};
					subCnt = _getUnitTargets(sNext, orgNode, roleTarget.options, targetUnitNo, [listValidRoleNo[i]], false, false);
					cnt += subCnt;
					if (subCnt) {
						unitTarget.options.push(roleTarget);
					}
				}

				if (unitTarget.options.length) {
					saveTarget.options.push(unitTarget)
				}
			}
			theLogger.log('-I- next="' + sNext + '", UnitNo="' + targetUnitNo + '", _enumTarget count=' + cnt);
			return cnt;
		}

		theLogger.warn('-W- _enumTargets() unknow next (紙本):' + sNext);
		return 0;
	} // EOF: _enumTargets
	
	/* 目的: 取得可核決指定公文的人員(角色)清單 */
	// 2021.6.11 - 1100748 Eric, implement TO_OU="V" (for 醫策會)
	function _enumerateApproveOfficer(docObj, listCanApproveRole, roleOnly) {
		// 2021.6 - Eric ref: LoginCOMCtrl MenuFactory.cpp _enumerateApproveOfficers
		
		/*function _getUpOrgApplyRoleName(sRoleId) {
			if (sRoleId == 'OD01') return '局長';
			else if (sRoleId == 'OD06') return '主任秘書';
			else if (sRoleId == 'OD11') return '組長';
			else if (sRoleId == 'OD21') return '科長';
			return '';
		}*/

		let _appUserList = [];

		// 列出指定單位內的所有可核決人員
		function _getApplyFromUnit(roleList, orgNo, unitNoList, filterMode) {
			if (Array.isArray(roleList)==false || roleList.length==0) {
				return;
			}

			let orgNode = SSOUtil.getOrgNode(orgNo);
			let i=0, j=0, k=0;
			for(i=0; i<unitNoList.length; i++) {
				let unitNo = unitNoList[i];
				if (typeof unitNo!=='string' || unitNo.length==0) continue;

				let unitNode = _getUnitNode(orgNode, unitNo);
				if (unitNode==null) continue;

				for(j=0; j<listCanApproveRole.length; j++) {
					let roleNo = listCanApproveRole[j];
					if (typeof roleNo!=='string' || roleNo.length==0) continue;

					let roleNode = _getRoleNode(unitNode, roleNo);
					if (roleNode==null) continue;

					let roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');

					if (filterMode.toLowerCase()=='role') {
						let _appUser = {
							role_id: roleNo,
							role_name: roleName,
							user_id: '',
							user_name: '',
						};
						// check if exist in list
						let exist_role = _appUserList.filter(function(appUser) { 
							if (appUser.role_id === _appUser.role_id) {
								return true;
							}
							return false;
						});
						if (Array.isArray(exist_role)==false || exist_role.length==0) {
							_appUserList.push(_appUser);
						}
					}
					else {
						let occupants = _getRoleOccupants(roleNode);
						if (occupants!==null) {
							for(k=0; k<occupants.length; k++) {
								let occupant = occupants[k];
								let _appUser = {
									role_id: roleNo,
									role_name: roleName,
									user_id: occupant.account,
									user_name: occupant.name,
								};

								// check if exist in list
								let exist_user = _appUserList.filter(function(appUser) { 
									if (appUser.user_id === _appUser.user_id) {
										return true;
									}
									return false;
								});
								if (Array.isArray(exist_user)==false || exist_user.length==0) {
									_appUserList.push(_appUser);
								}
							}
						}
					}
				}
			}
		} // EOF: _getApplyFromUnit()
		
		let i=0;
		// 先取EnvSet.OD_UPORG_APP_LIST項目
		let sAppList = theSSO.User.EnvSettings.get('OD_UPORG_APP_LIST');
		// 格式 = "帳號|姓名|角色代碼|角色名稱"
		// e.g. OD_UPORG_APP_LIST: 'moea01|張部長|OD01|部長;moea01|陳次長|OD01|次長;stella2|劉主任|OD11|主任'
		
		let listItem, sItem, item;
		if (typeof sAppList=='string' && sAppList.length) {
			if (sAppList.substring(sAppList.length-1, sAppList.length)!==';')
				sAppList += ';';
				
			listItem = sAppList.split(';');
			for (i=0; i<listItem.length; i++) {
				sItem = listItem[i];
				if (!!sItem && sItem.length) {
					item = sItem.split('|');
					if (item.length==4) {
						_appUserList.push({user_id:item[0], user_name:item[1], role_id:item[2], role_name:item[3]});
					}
				}
			}
		}
		
		// 取一層決行單位可核決人員
		// OD_SUPERIOR_UNIT_RANK: 設定一層決行單位代碼, 若為空值, 則使用'99','98','97','96','95'
		let sSuprUnitRank = theSSO.User.EnvSettings.get('OD_SUPERIOR_UNIT_RANK');
		let approvalUnit = [];
		if (typeof sSuprUnitRank=='string' && sSuprUnitRank.length) {
			// $UnitNo$|$UnitNo$|$UnitNo$|$UnitNo$
			let superUnit = sSuprUnitRank.split('|');
			if (superUnit.length) {
				approvalUnit.concat(superUnit);
			}
		}
		else {
			approvalUnit.push('99','98','97','96','95');
		}

		// 取得目前單位的可核決人員!
		let currentUnitNo = docObj.ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN?docObj.ownOUId.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN):docObj.ownOUId;
		if (approvalUnit.indexOf(currentUnitNo)==-1) {
			approvalUnit.push(currentUnitNo);
		}
		
		_getApplyFromUnit(listCanApproveRole, docObj.sourceOrgNo, approvalUnit, roleOnly?'role':'user');
		if (_appUserList.length) {
			return _appUserList;
		}
		return null;
	} // EOF: _enumerateApproveOfficer()
	
	var folder='', subfolder='';
	folder = currentFlow.Folder;
	subfolder = currentFlow.SubFolder;
	
	var menu = menuRule.getRule(folder, subfolder);
	if ((typeof menu == 'undefined') || (menu===null)) {
		alert('找不到文件夾:' + folder + '/' + subfolder + '的MenuRule!');
		theLogger.warn('找不到文件夾:' + folder + '/' + subfolder + '的MenuRule!');
		return null;
	}
	else if (typeof menu.txList !=='object' || menu.txList===null) {
		theLogger.log('-I- 文件夾:' + folder + '/' + subfolder + ' MenuRule沒有TX_LIST');
		return null;
	}
	else {
		theLogger.log('Doc object folder=' + folder + ', subfolder=' + subfolder);
	}
	
	theLogger.log('Enumerate transTargets, Folder=' + folder + ', SubFolder=' + subfolder);
	
	/* ToDo: 無法開啟 會核中-主辦 項目原因確認!
	 * => 所有唯讀文件夾(回閱/已送出-線上簽核)流程相關處理!
	 *    a. 不分析各預排流程點的N_FOLDER, N_SUBFOLDER
	 *    b. 不分析目前所在流程!
	 * => 延伸問題: 若目前所在人員不在預排流程項目內, 是否可正確作業!?
	 */
	var _ownUserInfo = null;
	if (currentFlow.UserId.length) {
		_ownUserInfo = SSOUtil.getOrgUserInfo(orgNode, currentFlow.OUId, currentFlow.RoleId, currentFlow.UserId);
	}
	/* 紙本公文 ownUserId 為空非異常!
	 *else {
		theLogger.error('ERROR! currentFlow.UserId is a null string.');
	}*/
	
	var theOwnUser = {
		OUId : currentFlow.OUId,
		OUName : SSOUtil.getOrgUnitName(orgNode, currentFlow.OUId),
		RoleId : currentFlow.RoleId,
		RoleName : SSOUtil.getOrgRoleName(orgNode, currentFlow.OUId, currentFlow.RoleId),
		UserId : currentFlow.UserId,
		UserName : (_ownUserInfo!==null) ? _ownUserInfo.UserName : '',
	};
	console.log('Own User info: OU=(' + theOwnUser.OUName + '-' + theOwnUser.OUId +
				') Role=(' + theOwnUser.RoleName + '-' + theOwnUser.RoleId +
				') User=(' + theOwnUser.UserName + '-' + theOwnUser.UserId + ')');
	
	/* 2015.6 - 公文分文/分辦前沒有承辦人 */
	var inchargeUserInfo = null;
	if (docObj.ICOUId.length && docObj.ICUserId.length) {
		inchargeUserInfo = SSOUtil.getOrgUserInfo(orgNode, docObj.ICOUId, SYS_CONST.ROLENO_OPERATOR, docObj.ICUserId, null); //excludeRoleList);
	}
	var theInchargeUser = null;
	if (typeof inchargeUserInfo=='object' && inchargeUserInfo!==null) {
		theInchargeUser = {
			OUId: docObj.ICOUId,
			OUName: SSOUtil.getOrgUnitName(orgNode, docObj.ICOUId),
			UserId : docObj.ICUserId,
			UserName : inchargeUserInfo.UserName,
		};
		theLogger.log('Incharge User info: OU=(' + theInchargeUser.OUName + '-' + theInchargeUser.OUId +
					') User=(' + theInchargeUser.UserName + '-' + theInchargeUser.UserId + ')');
		
		
		if (!!theInchargeUser) {
			if (!theInchargeUser.UserName || (theInchargeUser.UserName.length===0)) {
				alert("-W- InchargeUserName不可為空字串!!!");
			}
		}
	}
	else if(docObj.ICOUId.length) { // 只有單位時, 取單位資訊
		theInchargeUser = {
			OUId: docObj.ICOUId,
			OUName: SSOUtil.getOrgUnitName(orgNode, docObj.ICOUId),
			UserId : '',
			UserName : '',
		};
	}

	//var _offsetStr = ['', '-', '+', '#', '*'];
	var _NCUApproveNext = 'V'; // 2016.8 - 中央大學核決用NEXT(目前尚未實作完成)
	
	var ruleCnt = menu.txList.length;
	var _theNextOptions = [];
	var s1='', s2='';
	var srcCTarget = null, finalTarget = null;
	var target = null, ruleCTarget = null;
	var trueNext='', trueTxName='', trueDisplay='';
	
	var exist = false, ruleOption = null, validNext = false;
	var displayStatus=_rule_const.MENU_ITEM_DISPLAYNONE;
	var listExcludeUnitNo = [];
	var addICOURegitser=false;

	// 2021.6 - 1100748 Eric
	let docApproved = (docObj.get('', 'APP_USER_ID').length || docObj.get('', 'APP_ROLE_ID').length) ? true : false;
	
	var i=0, j=0, k=0, x=0, cntForNext=0;
	for(i=0; i<ruleCnt; i++)
	{
		cntForNext = 0; // 2021.7.8 - 1100433 Eric, merge: 2017.8.31 - 1060767, 檢核enumTarget回傳數量, 若<=0則不加入清單!
		exist = false;
		ruleOption = menu.txList[i];
		validNext = _isValidNext(ruleOption.next);
		if (!validNext) {
			console.log('option TX_NAME=' + ruleOption.txName + ', next=' + ruleOption.next + ' IS_VALID_NEXT: ' + (validNext ? 'Y' : 'N'));
			continue;
		}

		// 2021.6 - 1100748 Eric, 開啟公文套件上方的TO_OU="V"選項或公文已核決, 右鍵選單的TO_OU="V"選項, 改為[已核決]公文才能使用!
		if (ruleOption.next===_NCUApproveNext && (!_forPopupMenu || docApproved)) {
			let _modifiedRuleOption = Object.assign({}, ruleOption); // 複製一個新的ruleOption再修改, 以免異動原始menuRule內容!

			let re = /x/gi;
			_modifiedRuleOption.specialCheck = ruleOption.specialCheck.replace(re, 'A');
			ruleOption = _modifiedRuleOption;
		}

		// 依公文狀態篩選應使用的傳送選項
		displayStatus =_displayRuleOption(ruleOption, docObj, theInchargeUser, theOwnUser, _forPopupMenu);
		if (displayStatus==_rule_const.MENU_ITEM_DISPLAYNONE) {
			continue;	
		}
		
		theLogger.debug('列舉異動別:"' + ruleOption.txName + '" (next=' + ruleOption.next + ', offset=' + ruleOption.m_nOffset + ')項目.');
		
		/*LOG_OUT_L4(_T("-I- %s() TX_NAME=\'%s\', NEXT=\'%s\', Offset=%d[\'%s\']\n\tInchargeOU=\'%s\', OwnOUId=\'%s\'\n"),
						   _szFoo, (LPTSTR)CW2T(pRule->m_wsTX_NAME), pRule->m_strNEXT, pRule->m_nOffset,
						   (pRule->m_nOffset<cntOffset&&pRule->m_nOffset>=0)?OffsetStr[pRule->m_nOffset]:_T(""),
						   W2T(pMsg->INCHARGE_OU), W2T(pMsg->OWN_OU_ID));*/
		
		// 若TxName相同, 併入前一個
		target = null; ruleCTarget = null;
		srcCTarget = null; finalTarget = null;
		
		for(x=0; x<_theNextOptions.length; x++) {
			var _target = _theNextOptions[x];
			if (_target.txName == ruleOption.txName) {
				target = _target;
				exist = true;
				break;
			}
		}
		
		if (!exist) {
			target = {
				txName: ruleOption.txName,
				display: ruleOption.display,
				next: ruleOption.next,
				ruleOption: ruleOption,
			};
			
			if (ruleOption.m_nOffset>0) {
				switch(ruleOption.m_nOffset) {
				case _rule_const.OFFSET_RMV_CURRENT_OU: target.next += '-'; break;
				case _rule_const.OFFSET_RMV_CURR_ADD_INC: target.next += '+'; break;
				case _rule_const.FFSET_RMV_CURRENT_OU_L2: target.next += '#'; break;
				case _rule_const.OFFSET_ADD_L2_AND_L1: target.next+= '*'; break;
				}
			}
			
			target.options = [];
		}
		
		trueNext = ruleOption.next;
		trueTxName = ruleOption.txName;
		trueDisplay = ruleOption.displayName;
		if (trueNext===_NCUApproveNext) {
			// 2021.6.11 - 1100748 Eric, bug-fix (醫策會TO_OU="V")
			if (_ruleEnvSetting.SSOApproveSendTo.length===0) {
				theLogger.error('Error! _buildPDocNextOption() processs [' + folder + ']-[' + subfolder + '] NEXT="'+ ruleOption.next + '" failed, SSOApproveSendTo 設定值為空字串.');
				continue;
			}

			// SSO_APPROVE_SEND_TO 環境參數格式 "TX_NAME@DISPLAY_NAME@TO_OU"
			var itemList = _ruleEnvSetting.SSOApproveSendTo.split('@'); // 2021.6.11 - 1100748 Eric, bug-fix (醫策會TO_OU="V")
			if (itemList.length!==3) {
				theLogger.error('Error! _buildPDocNextOptions() processs [' + folder + ']-[' + subfolder + '] NEXT="'+ ruleOption.next + '" failed, sSSOApproveSendTo 設定值無效:"' + _ruleEnvSetting.SSOApproveSendTo + '" [格式: TX_NAME@TO_OU]');
				continue;
			}

			trueTxName = itemList[0];
			trueDisplay = itemList[1];
			trueNext = itemList[2];
		}
		
		//target.option = ruleOption; (己於targe.ruleOption記錄)
		target.mode = displayStatus; // MENU_ITEM_ENABLE | MENU_ITEM__DISABLE
		
		listExcludeUnitNo = [];
		addICOURegitser = false;
		if (_shouldEnumTargets(trueNext, ruleOption.m_nOffset)) {
			// 2021.7.8 - 1100433 Eric, merge: 2017.8.31 - 1060767, 回傳數量, 若<=0則不加入清單!
			cntForNext = _enumTargets(orgNode, trueNext, ruleOption.m_nOffset, theOwnUser, theInchargeUser, target, _ruleEnvSetting.underTakerRoles, _ruleEnvSetting.showUnitRoleId);

			// 2021.6.11 - 1100747 Eric, (醫策會TO_OU="U" trace), TO_OU="U", 列舉所有單位有承辦人!
			if (trueNext=='U') {
				console.log('-I- target.options count=' + target.options);
			}

			// 2021.10.21 - Eric, 客委會版更回報異常修正! (目前僅成大及高大客製版保留檢核須有傳送對象)
			//if (cntForNext<=0) {
			//	continue;
			//}
		}
		else {
			ruleCTarget = menuRule.getCTarget(ruleOption.next);
						
			//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
			if ((trueNext === 'Q1' || trueNext === 'Q2') && ruleCTarget === null){
				var ownOuLen = theOwnUser.OUId.length, opOuLen = parseInt(ruleOption.ouLen)||0;
				if (theOwnUser.OUId == ruleOption.ownOUId || (ruleOption.ownOUId.length === 0 && (opOuLen==0 || (opOuLen != 0 && ownOuLen == opOuLen)))){
					//進到這裡，表示還未取得Q1、Q2所需的傳送對象，重新取得並設定到menuRule的CTarget裡
					var todoTarget = SSOUtil.getDocTodoListTarget(localStorage.Artifact, _docObj.sourceOrgNo, _docObj.docNo, _docObj.ICUserId, theOwnUser.OUId, (trueNext == 'Q1'?0:1), false)
					if (todoTarget.success && todoTarget.docTodoTarget) {
						menuRule.setExtraCTarget(todoTarget.docTodoTarget, orgNode, trueNext)
						ruleCTarget = menuRule.getCTarget(ruleOption.next);
					}
				}
			}
			
			if (ruleCTarget===null) {
				theLogger.log('-I- _buildPDocNextOptions() 未設定傳送對象項目: next="' + ruleOption.next + '". [非EnumTargets且無對應CTarget項目]');
			}
			else {
				switch(ruleOption.m_nOffset) {
				case _rule_const.OFFSET_RMV_CURRENT_OU:  {	// 1, '-'
						// 不包含"承辦單位"及"目前訊息所在單位" (一級)
						s1 = '';
						if (!!theInchargeUser && !!theInchargeUser.OUId)
							s1 = theInchargeUser.OUId;
						if (s1.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
							s1 = s1.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
						}
						listExcludeUnitNo.push(s1);
						s1 = theOwnUser.OUId;
						if (s1.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
							s1 = s1.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
						}
						listExcludeUnitNo.push(s1);
						break;
					}
				case _rule_const.OFFSET_RMV_CURR_ADD_INC:  { // 2, '+'
						s1 = '';
						if (!!theInchargeUser && !!theInchargeUser.OUId)
							s1 = theInchargeUser.OUId;
						s2 = theOwnUser.OUId;
						if (s1.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
							s1 = s1.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
						}
						if (s2.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
							s2 = s2.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
						}
						
						// 若"目前訊息所在一級單位"與"承辦一級單位"不同
						if (s1 != s2) {
							addICOURegitser = true;
						}
						
						listExcludeUnitNo.push(s2);
						break;
					}
				case _rule_const.OFFSET_RMV_CURR_OU_L2: { // 3, '#' 
						/* 不包含 "承辦單位" 及 "目前訊息所在單位" (二級) */
						s1 = '';
						if (!!theInchargeUser && !!theInchargeUser.OUId)
							s1 = theInchargeUser.OUId;
						s2 = theOwnUser.OUId;
						if (s1.length > SYS_CONST.FIRSTCLASS_UNITNO_LEN)
							listExcludeUnitNo.push(s1);
						if (s2.length > SYS_CONST.FIRSTCLASS_UNITNO_LEN)
							listExcludeUnitNo.push(s2);
						break;
					}
				case _rule_const.OFFSET_ADD_L2_AND_L1: { // 4, '*'
						addICOURegitser = true; // pMenuItem->m_spMsg = pMsg
						break;
					}
				}
				
				srcCTarget = ruleCTarget;
				finalTarget = {
					txName: ruleOption.txName,
					display: ruleOption.display,
					next: ruleCTarget._nextType,
					ruleOption: ruleOption,
					options: [],
				};
				
				if (srcCTarget.options.length) {
					var exclude = false, excludeUnitNo='';
					for(j=0;j<srcCTarget.options.length; j++)
					{
						var cTargetOption = srcCTarget.options[j];
						var rsltCTargetOption = null;
						if (typeof cTargetOption==='undefined' || cTargetOption===null)
							continue;
						
						if (cTargetOption._finalTarget) {
							if (listExcludeUnitNo.length && (listExcludeUnitNo.indexOf(cTargetOption.ouId)!==-1)) {
								// 不加入 finalTargets.options
								continue;
							}
							_addCTargetOption(finalTarget, cTargetOption);
						}
						else {
							if (listExcludeUnitNo.length && (listExcludeUnitNo.indexOf(cTargetOption.ouId)!==-1)) {
								exclude = true;
							}
							else {
								for(k=0; k<listExcludeUnitNo.length; k++) {
									excludeUnitNo = listExcludeUnitNo[k];
									if (excludeUnitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) { // 二級單位項目?
										if (excludeUnitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN) ==
											target.OUId.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN))
										{
											rsltCTargetOption = _removeSubUnitOfCTarget(cTargetOption, excludeUnitNo);
											
											// 篩選後已無項目
											if (!rsltCTargetOption._finalTarget && rsltCTargetOption.options.length===0) {
												exclude = true;
												break;
											}
										}
									}
								}
								
								if (exclude) {
									continue;
								}
							}
							
							if (rsltCTargetOption) {
								_addCTargetOption(finalTarget, rsltCTargetOption);
							}
							else {
								_addCTargetOption(finalTarget, cTargetOption);
							}
						}
					}
				}
				
				if (finalTarget.options.length) {
					for(j=0; j<finalTarget.options.length; j++) {
						target.options.push(finalTarget.options[j]);
					}
				}
			}
		}
		
		// 2021.6 - 1100748 Eric, 下移至此
		if (ruleOption.next==_NCUApproveNext) {
			/* 列出公文核決人員清單 - Extra項目, 非<CMPMenu> items */
			let roleOnly = (_ruleEnvSetting.ODApproveType.toLowerCase()==='role') ? true : false;
			
			approveTarget = {
				txName: trueTxName,
				display: trueDisplay,
				next: trueNext,
				ruleOption: ruleOption,
				mode: displayStatus,
				options: [],
			};
			
			let _options = target.options;
			// 2021.6.15 - 1100748 Eric, TO_OU='V' implement
			if (_forPopupMenu && !docApproved) {
				let canApprovalRoleList = _ruleEnvSetting.MPCanApproveRole.split('|');
				if (canApprovalRoleList.length) {
					let appUserList = _enumerateApproveOfficer(docObj, canApprovalRoleList, roleOnly);
					if (Array.isArray(appUserList) && appUserList.length) {
						approveTarget.options = appUserList;
						target.extra = approveTarget;
					}
				}
				else {
					theLogger.log('-W- _buildPDocNextOptions() TO_OU="V", _ruleEnvSetting.MPCanApproveRole length=0');
					continue;
				}
			}
			else {
				// 開啟公文, 套件上方僅顯示[辦畢退回]選項
				target = approveTarget;
				target.options = _options;
			}
		}

		if (ruleOption.webPage.length) {
			target.webPage = { url: ruleOption.webPage, minus: ruleOption.webPage_Minus };
		}
		else {
			target.webPage = { url: '', minus: ruleOption.webPage_Minus};
		}
		
		if (addICOURegitser) { // 加入承辦單位登記桌
			var ICOUId = docObj.ICOUId;
			var ICOUId2 = ICOUId;
			var ownOUId = docObj.ownOUId;
			var ICOUName='', ICOUNode = null;
			var registerRoleNode, registerRoleName;
			var ICOU_Register = null;
			ICOUId = ICOUId.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			if (ruleOption.m_nOffset==_rule_const.OFFSET_RMV_CURR_ADD_INC ||
				ruleOption.m_nOffset==_rule_const.OFFSET_ADD_L2_AND_L1) {
				ownOUId = docObj.ownOUId;
				if (ICOUId!==ownOUId) {
					/* 加入(一級)承辦單位登記桌 */
					ICOUNode = _getUnitNode(orgNode, ICOUId);
					if (!!ICOUNode) {
						ICOUName = SSOUtil.xml_getChildNodeValue(ICOUNode, 'UnitName');
						registerRoleNode = _getRoleNode(ICOUNode, SYS_CONST.ROLENO_REGISTER);
						if (!!registerRoleNode) {
							registerRoleName = SSOUtil.xml_getChildNodeValue(registerRoleNode, 'RoleName');
						}
					}
					
					ICOU_Register = {
						toOU: target.next,
						finalTarget: true,
						toOUId: ICOUId,
						toOUName: ICOUName,
						toRoleId: SYS_CONST.ROLENO_REGISTER,
						toRoleName: registerRoleName,
						toUserId: '', toUserName: '',
					};
					target.options.push(ICOU_Register);
				}
			}
			
			if (ICOUId2.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN &&
				ruleOption.m_nOffset==_rule_const.OFFSET_ADD_L2_AND_L1) {
				if (ICOUId!==ownOUId) {
					/* 加入(二級)承辦單位登記桌 */
					ICOUNode = _getUnitNode(orgNode, ICOUId2);
					if (!!unitNode) {
						ICOUName = SSOUtil.xml_getChildNodeValue(ICOUNode, 'UnitName');
						registerRoleNode = _getRoleNode(ICOUNode, SYS_CONST.ROLENO_REGISTER);
						if (!!registerRoleNode) {
							registerRoleName = SSOUtil.xml_getChildNodeValue(registerRoleNode, 'RoleName');
						}
					}
					ICOU_Register = {
						toOU: target.next,
						finalTarget: true,
						toOUId: ICOUId,
						toOUName: ICOUName,
						toRoleId: SYS_CONST.ROLENO_REGISTER,
						toRoleName: registerRoleName,
						toUserId: '', toUserName: '',
					};
					target.options.push(ICOU_Register);
				}
			}
		} // End of - if (addICOURegitser)
		
		/* ToDo: 尚未處理NCUApproveOfficer */
		
		// 沒有傳送對象時, 直接將異動別設為finalTarget!
		var fAdd = false;
		if (target.options.length>0) {
			target.finalTarget = false;
			fAdd = true;
		}
		else {
			target.finalTarget = true;
			fAdd = true;
		}
		
		if (!exist && fAdd) {
			_theNextOptions.push(target);
		}
	} // End of ruleOption process
	
	return _theNextOptions;
} /* End of _buildPDocNextOptions */

/* [!!!二代未使用!!! - 改實作於RD-Submit.js]顯示新增(或修改)流程點子視窗
 */
function showTransTargetDialog(targetElem, editMode) {
	if (typeof editMode == 'undefined') {
		editMode = confirm("OK->編輯流程, Cancel->新增流程"); // return value -> ok:true, cancel:false
	}
	
	//
	// 2013.4 - #dlgTransTarget內容在mSSO.html
	//
	var $dlg = $("#dlgTransTarget").clone(true);
	var $tree=null;
	var $chooseA=null, $chooseB=null, $chooseC=null, $chooseD=null;
	// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
	//var mobileDevice = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
	var mobileDevice = window.iOS_device;
	if (mobileDevice) {
		$tree = $dlg.find('#nextOptions');
		$dlg.find('#selectNextOptions').hide();
	}
	else {
		$dlg.find('#nextOptions').hide();
		$dlg.find('#selectNextOptions').show();
		$chooseA = $dlg.find('#tdlg_chooseA');
		$chooseB = $dlg.find('#tdlg_chooseB');
		$chooseC = $dlg.find('#tdlg_chooseC');
		$chooseD = $dlg.find('#tdlg_chooseD');
	}
		
	// 2013.4 - 建立傳送選單 (P2先實作下列TO_OU: B/O2/H/G/D)
		
	// 2013.4 - 由公文簽核模組取得docObj (theAOL.docObj)
	var docObj = theAOL.docObj;
	var orgNo = docObj.sourceOrgNo;
	var orgNode = SSOUtil.getOrgNode(orgNo);
	
	var selectedTransTarget = $(targetElem).data('rawItem'); // 操作之流程項目
	
	var _dlgNextTarget = $.extend({}, theAOL.nextTarget);
	var _dlgDocObj = theSSO.MP.todolist.builder.docFromODWMSGObj(docObj.isDraft, odwmsg, odwdcm);
	
	// 載入公文所在機關的MenuRuleAOL
	var menuRule = new MenuRuleAOL(localStorage.Artifact, orgNo);
	var _theNextOptions = _buildEDocNextOptions(selectedTransTarget, menuRule, orgNode, _dlgDocObj);
	
	var nextIndexs = [];
	
	// 初始化傳送選項
	//_initNextOptions($tree, _nextOptions);
	if (mobileDevice) {
		WorkFlowUtil.initNextOptions($tree, _theNextOptions); // 使用真實MenuRuleAOL + OrgInfo
		nextIndexs = _getNextIndexs(selectedTransTarget, _theNextOptions); // 設定開始顯示時的預設項目
	}
	else {
		// 2016.9.19 - 未執行此處程式(改在RD-Submit.js實作)
	}
	
	// 若為'修改模式', 初始化為選定目前流程點!
	var onBeforeShowFunc = null;
	if (mobileDevice && editMode) {
		onBeforeShowFunc = function (html, inst) {
			theLogger.debug('onBeforeShowFunc() invoked...');
			// ToDo: 若為編修流程內容, 則須將目前流程內容設為預設值!
			if (nextIndexs.length)
			{
				inst.temp = nextIndexs;
				inst.setValue(true, true);
				
				if (nextIndexs.length>1) {
					//var array_lv2 = WorkFlowUtil.getLevelOptions([nextIndexs[0], nextIndexs[1]], _nextOptions);
					var array_lv2 = WorkFlowUtil.getLevelOptions([nextIndexs[0], nextIndexs[1]], _theNextOptions);
					inst.settings.wheels[1][inst.settings.labels[1]] = array_lv2;
				}
				else {
					// 清除LV2/3/4項目	
				}
				
				if (nextIndexs.length>2) {
					//var array_lv3 = WorkFlowUtil.getLevelOptions([nextIndexs[0], nextIndexs[1], nextIndexs[2]], _nextOptions);
					var array_lv3 = WorkFlowUtil.getLevelOptions([nextIndexs[0], nextIndexs[1], nextIndexs[2]], _theNextOptions);
					inst.settings.wheels[2][inst.settings.labels[2]] = array_lv3; //['副局長'];
				}
				else {
					// 清除LV3/4項目
				}
				
				if (nextIndexs.length>3) {
					//var array_lv4 = WorkFlowUtil.getLevelOptions([nextIndexs[0], nextIndexs[1], nextIndexs[2], nextIndexs[3]], _nextOptions);
					var array_lv4 = WorkFlowUtil.getLevelOptions([nextIndexs[0], nextIndexs[1], nextIndexs[2], nextIndexs[3]], _theNextOptions);
					inst.settings.wheels[3][inst.settings.labels[3]] = array_lv4; //['王大明'];
				}
				else {
					// 清除LV4項目
				}
			}
		};
	}
	
	// 將傳送選單轉為mobiscroll控制項(ul -> mobiscroll)
	if (!!onBeforeShowFunc) {
		$tree.mobiscroll().treelist({
					theme: 'ios',
					display: 'inline',
					mode: 'scroller',
					labels: ['異動別', '傳送對象', ' ', ' '], // 2012.12 - 若theme設為'ios', 則 labels 不會顯示!
					inputClass: 'mobiscroll-txt',
					onBeforeShow : onBeforeShowFunc,
				});
	}
	else {
		$tree.mobiscroll().treelist({
					theme: 'ios',
					display: 'inline',
					mode: 'scroller',
					labels: ['異動別', '傳送對象', ' ', ' '], // 2012.12 - 若theme設為'ios', 則 labels 不會顯示!
					inputClass: 'mobiscroll-txt',
				});
	}
	
	// 若為'修改模式', 初始化為選定目前流程點!
	if (editMode) {
		if (mobileDevice) {
			// mobiscroll會在onBeforeShowFunc()執行
		}
		else if (editMode) {
			// 2016.9.18 - ToDo: 初始化<select>傳送選項
			
		}
	}
	
    $dlg.find('a#targetDlgOK').on('click', function(event) {
        // 2012.12.28 - 記錄使用者選擇項目
		var transTargetIndex = [];
		if (mobileDevice) {
			transTargetIndex = $tree.mobiscroll('getValue');// 新增流程內容(由MobiScroll元件選定)
			$tree.mobiscroll('destroy'); // 刪除mobiscroll object
		}
		else {
			// 2016.9.18 - ToDo: 異動公文基資及傳送選項!
			transTargetIndex = _getNextIndexs(_dlgNextTarget, _theNextOptions);
		}

		$.modal.close();
		
		var newTransTarget = WorkFlowUtil.getNewTarget(transTargetIndex, _theNextOptions);
		if (!editMode) {
			//alert('selectedTarget=[' + newTransTarget.toString() + '] target=\'' + sNewTarget + '\'');
		
			// 2012.12.28
			if (!!selectedTransTarget) {
				WorkFlowUtil.insertFlowItem($(targetElem), selectedTransTarget, newTransTarget);
			}
		}
		else {
			if (!!selectedTransTarget) {
				WorkFlowUtil.modifyFlowItem($(targetElem), newTransTarget);
			}
		}
    });
	
    $dlg.find('a#targetDlgCancel').on('click', function(event) {
        $.modal.close();
		if (!!$tree) {
			$tree.mobiscroll('destroy'); // 刪除mobiscroll object
		}
    });
	
    var w = $('#dlgProcessFlow').width(),
        h = $('#dlgProcessFlow').height(); // - 80;
    theLogger.debug('新增指定傳送對象對話方塊, w:' + w + ',h:' + h);
	
	// editMode
	if (typeof editMode=='boolean' && editMode===true) {
		$dlg.find('.new_flow_title').css('display', 'none');
		$dlg.find('.edit_flow_title').css('display', 'block');
	}
	
    $.modal($dlg, { appendTo: $('#dlgProcessFlow'),
					overlayCss: {height:h, width:w},
					minWidth: 680,
					minHeight: 420});
}
/*
 * 新增/編輯流程組子視窗
 */
function showFlowSetDialog()
{
	var $dlg = $('#dlgFlowSet').clone(true);
    
    $dlg.find('a#targetDlgOK').on('click', function(event) {
        $.modal.close();
    });
	
    $dlg.find('a#targetDlgCancel').on('click', function(event) {
        $.modal.close();
    });
	
    var w = $('#dlgProcessFlow').width(),
        h = $('#dlgProcessFlow').height(); // - 80;
    theLogger.debug('新增指定傳送流程組對話方塊, w:' + w + ',h:' + h);
    $.modal($dlg, {appendTo:$('#dlgProcessFlow'), overlayCss:{height:h, width:w}, minWidth:680, minHeight:400});
}
/* 設定[會稿顯示]spin wheel之內容
 */
function _initCoworkTextSpinWheel(id, $parent)
{
	var type = typeof $('#'+id)[0];
	theLogger.debug('_initCoworkTextSpinWheel() typeof target element:' + type);
	
	if (typeof id=='undefined' || id.length===0) {
		alert('_initCoworkTextSpinWheel(), invalid "id"');
		return;
	}
	
	var textList = [ { id:'1', name:'敬會',},
					 { id:'2', name:'先會',},
					 { id:'3', name:'後會'}];
	var wheels = [];
	var obj = {};
	obj['會辦語詞'] = {};
	var textCnt = textList.length;
	var i=0, idx;
	for(i=0; i<textCnt; i++) {
		obj['會辦語詞'][i] = textList[i].name;
	}
	wheels.push(obj);
	
	var $scroller = null;
	if (!!$parent) {
		$scroller = $parent.find('#' + id);
	}
	else {
		$scroller = $('#' + id);
	}
	var text;
	$scroller.mobiscroll({
			width: 120,
			wheels: wheels,
			theme: 'ios',
			display: 'bubble',
			mode: 'scroller',
			lang: 'cht', // 2013.1 - 中文按鈕
			setText: '確定',
			cancelText: '取消',
			//align_mode: display_pos, // 2012.2.1 - Eric Peng
			parseValue: function (s) {
				var d = [];
				if (s !== '') {
					for (idx in wheels[0]['會辦語詞']) {
						if (wheels[0]['會辦語詞'].hasOwnProperty(idx)) {
							text = wheels[0]['會辦語詞'][idx];
							if (text == s)
								d.push(parseInt(idx));
						}
					}
				}
				else {
					d.push(1); //[1,1,1];
				}
				return d;
			},
			formatResult: function(d) {
				var sRslt = wheels[0]['會辦語詞'][d[0]];
				return sRslt;
			}
	});
	
	// 點擊時顯示scroll wheel control
	$('#' + id).on('click', function() { $(this).mobiscroll('show'); });
}
/* 取得會辦(一級)單位清單
 */
function getCoworkFlowList() {
	var _coworkFlows = [];
	var _groupCnt = _groupList.length;
	for(var i=0; i<_groupCnt; i++)
	{
		var gp = _groupList[i];
		if (gp.type=='coworker') {
			for(var j=0; j<gp.itemList.length; j++)
			{
				// 目前假設一個會辦單位只會有一個項目
				_coworkFlows.push(gp.itemList[j]);
			}
		}
	}
	return _coworkFlows;
}
/*
 * 檢核是否已有簽稿會核單
 */
function _isExistConDraft(draftList)
{
	if (!!draftList && draftList.length)
	{
		var len = draftList.length;
		for(var i=0; i<len; i++) {
			var draftInfo = draftList[i];
			if (draftInfo.type=='簽稿會核單') {
				return true;
			}
		}
	}
	return false;
}
//
// 產生 會辦流程->會稿設定table
//
function _createTable($table_cntr)
{
	var autoGenConTitle = '簽稿會核單'; // 自動產生簽稿會核單之title
	
	var draftList = _draftList;
	var flowList = getCoworkFlowList();
	var i=0, j=0, x=0, y=0;
	var $box, $rows, $boxs, idx, row_cnt, col_cnt, idxObj, row_idx;
	var genCon = false;
	if (!!flowList && (flowList.length>0))
	{
		genCon = false;
		if ((!_isExistConDraft(draftList)) && (flowList.length>1)) {
			genCon = true;
		}
		
		// create table thead
		/*<thead>
			<tr>
			  <th></th>
			  <th style="padding:2px 5px">
				<div>簽稿會核單</div>
				<div class="ui-checkbox ui-checkbox-on">
				   <div class="ui-icon ui-icon-shadow ui-icon-checkbox-on"></div>
				</div>
			  </th>
			  <th style="padding:2px 5px">
				<div>簽(稿)</div>
				<div class="ui-checkbox ui-checkbox-on">
				   <div class="ui-icon ui-icon-shadow ui-icon-checkbox-on"></div>
				</div>
			  </th>
			  ...
			  <th style="padding:2px 5px">會稿對象顯示設定</th>
			</tr>
		  </thead>*/
		var sTHead = '<thead><tr><th></th>';
		var sCheckBox = '<div class="ui-checkbox ui-checkbox-on"><div class="ui-icon ui-icon-shadow ui-icon-checkbox-on"></div></div>';
		var sCheckBoxColHeader = '<div class="ui-checkbox ui-checkbox-on col-header"><div class="ui-icon ui-icon-shadow ui-icon-checkbox-on"></div></div>';
		var sCheckBoxRowHeader = '<div class="ui-checkbox ui-checkbox-on row-header"><div class="ui-icon ui-icon-shadow ui-icon-checkbox-on"></div></div>';
		
		var draft_cnt = draftList.length;
			
		/*<th>
			<div>簽稿會核單</div>
			<div class="ui-checkbox ui-checkbox-on">
			   <div class="ui-icon ui-icon-shadow ui-icon-checkbox-on"></div>
			</div>
		  </th>
		*/
		if (genCon) {
			sCol = '<th><div>' + autoGenConTitle + '</div>' + sCheckBoxColHeader + '</th>';
			sTHead += sCol;
		}
		
		for(i=0; i<draft_cnt; i++) {
			var sCol = '<th>';
			var draft = draftList[i];
			sCol += '<div>' + draft.title + '</div>';
			sCol += sCheckBoxColHeader;
			sCol += '</th>';
			
			sTHead += sCol;
		}
		
		// 會稿對象顯示設定
		sTHead += '<th>會稿對象顯示設定</th>';
		sTHead += '</tr></thead>';
		
		var sTBody = '<tbody>';
		var unitCount = flowList.length;
		if (genCon) {
			draft_cnt += 1;
		}
		
		for(x=0; x<unitCount; x++) {
			var flow = flowList[x];
			
			// 第一個column <td...>
			var sRow = '<tr><td style="padding:0 5px">' +
						 '<div class="unit_head" style="min-width: 8em;">' +
							'<div>' + flow.Unit + '</div>' +
						    sCheckBoxRowHeader +
                         '</div></td>';
			
			/* 第二個~倒數第2個 ==> 各文稿設定
			 *<td>
             *  <div class="ui-checkbox ui-checkbox-on">
             *   <div class="ui-icon ui-icon-shadow ui-icon-checkbox-on"></div>
             *  </div>
             *</td>
             */
			for(y=0; y<draft_cnt; y++) {
				sRow += '<td>' + sCheckBox + '</td>';
			}
			
			// 最後一個: 會稿顯示設定
			var sTail = '<td><a href="#" class="display_setting" data-role="button" data-mini="true" data-icon="gear" data-iconpos="right">' +
						flow.Unit + '</a></td></tr>';
			sRow += sTail;
			
			sTBody += sRow;
		}
		
		sTBody += '</tbody>'; // End tag
		
		var $table = $table_cntr.find('table');
		$table.children().remove();
		
		var $thead = $(sTHead).appendTo($table);
		var $tbody = $(sTBody).appendTo($table);
		
		$table.find('tbody a').buttonMarkup(); //trigger('create');
		
		// checkboxs enable/disable
		var col_header_checkboxs = $table.find('thead div.ui-checkbox');
		for(i=0; i<col_header_checkboxs.length; i++) {
			var $cbox = $(col_header_checkboxs[i]);
			$cbox.data('idx', {col:i, row:-1});
		}
		
		var row_elems = $table.find('tbody > tr');
		row_cnt = row_elems.length;
		for(i=0; i<row_cnt; i++) {
			var boxs = $(row_elems[i]).find('div.ui-checkbox');
			var box_cnt = boxs.length;
			for(j=0; j<box_cnt; j++) {
				$box = $(boxs[j]);
				$box.data('idx', {col:(j-1), row:i});
			}
		}
		
		// 初始化checkboxs
		var $all_cbox = $table.find('div.ui-checkbox');
		var cbox_cnt = $all_cbox.length;
		
		$all_cbox.on('click', function() {
			var $this = $(this);
			var setCheck = true;
			var $box, $boxs, idxObj, idxO, $cbox, $rows, $thebox;
			var i=0, j=0, k=0, row_cnt, col_cnt, col_idx;
			
			if ($this.hasClass('ui-checkbox-on')) {
				setCheck = false;
			}

			if (setCheck) {
				$this.addClass('ui-checkbox-on');
				$this.find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
			}
			else {
				$this.removeClass('ui-checkbox-on');
				$this.find('.ui-icon').removeClass('ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
			}
			
			if ($this.hasClass('col-header'))
			{
				// 點最上方項目(column-全選/全不選)
				idxObj = $this.data('idx');
				col_idx = idxObj.col;
				
				for(i=0; i<cbox_cnt; i++) {
					$cbox = $($all_cbox[i]);
					if ($cbox.hasClass('col-header')) {
						continue;
					}
					else if ($cbox.hasClass('row-header')) {
						if (!setCheck) {
							// 取消任一, 則取消全選
							$cbox.removeClass('ui-checkbox-on');
							$cbox.find('.ui-icon').removeClass('ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
						}
					}
					else {
						idxO = $cbox.data('idx');
						if (idxO.col==col_idx) {
							if (setCheck) {
								$cbox.addClass('ui-checkbox-on');
								$cbox.find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
							}
							else {
								$cbox.removeClass('ui-checkbox-on');
								$cbox.find('.ui-icon').removeClass('ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
							}
						}
					}
				}
				
				// 全選任一行時, 檢核各列全選狀態
				if (setCheck) {
					// 同一行非header全選 => 全選
					$rows = $table.find('tbody > tr');
					row_cnt = $rows.length;
					for(i=0; i<row_cnt; i++) {
						$boxs = $($rows[i]).find('.ui-checkbox');
						col_cnt = $boxs.length;
						
						var all_check = true;
						for(j=1; j<col_cnt; j++) {
							$box = $($boxs[j]);
							if (!$box.hasClass('ui-checkbox-on')) {
								all_check = false;
								break;
							}
						}
						
						if (all_check) {
							$box = $($boxs[0]);
							$box.addClass('ui-checkbox-on');
							$box.find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
						}
					}
				}
			}
			else if ($this.hasClass('row-header')) {
				// 點最左方項目(row-全選/全不選)
				idxObj = $this.data('idx');
				row_idx = idxObj.row;
				
				for(i=0; i<cbox_cnt; i++) {
					$cbox = $($all_cbox[i]);
					if ($cbox.hasClass('row-header')) {
						continue;
					}
					else if ($cbox.hasClass('col-header')) {
						if (!setCheck) {
							// 取消任一, 則取消全選
							$cbox.removeClass('ui-checkbox-on');
							$cbox.find('.ui-icon').removeClass('ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
						}
					}
					else {
						idxO = $cbox.data('idx');
						if (idxO.row==row_idx) {
							if (setCheck) {
								$cbox.addClass('ui-checkbox-on');
								$cbox.find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
							}
							else {
								$cbox.removeClass('ui-checkbox-on');
								$cbox.find('.ui-icon').removeClass('ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
							}
						}
					}
				}
				
				// 全選任一列時, 檢核各行全選狀態
				if (setCheck) {
					// 同一行非header全選 => 全選
					$rows = $tbody.children('tr');
					$boxs = $($rows[0]).find('.ui-checkbox');
					
					row_cnt = $rows.length;
					col_cnt = $boxs.length-1; // header 不計
									
					// 各文稿是否全選?(->所有單位都要送會?)	
					for(i=0; i<col_cnt; i++)
					{
						var col_all_check = true;
						
						// 依序取出單一會辦單位項目
						for(j=0; j<row_cnt; j++) {
							$boxs = $($rows[j]).find('.ui-checkbox');
							var box_cnt = $boxs.length;
							var row_check = true;
							
							// 檢核指定的文稿項目是否勾選
							for(k=1; k<box_cnt; k++)
							{
								var idx = $($boxs[k]).data('idx');
								if (idx.col==i) {
									if (!$($boxs[k]).hasClass('ui-checkbox-on')) {
										row_check = false;
										break;
									}
								}
							}
							
							// 任一單位的指定文稿項目未勾選, 則非全選, 停止作業.
							if (!row_check) {
								col_all_check = false;
								break;
							}
						}
						
						// 指定文稿勾選所有單位 -> 全選
						if (col_all_check) {
							$boxs = $thead.find('div.ui-checkbox');
							for(x=0; x<$boxs.length; x++)
							{
								var $bx = $($boxs[x]);
								var idxB = $bx.data('idx');
								if (idxB.col==i) {
									$bx.addClass('ui-checkbox-on');
									$bx.find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
								}
							}
						}
					}
				}
			}
			else {
				var t_idx = $this.data('idx');
				
				if (!setCheck) {
					// 找到對應的col-header/row-header取消check
					var $col_header_boxs = $thead.find('div.col-header');
					var col_box_cnt = $col_header_boxs.length;
					for(i=0; i<col_box_cnt; i++) {
						$thebox = $($col_header_boxs[i]);
						var x_idx = $thebox.data('idx');
						if (x_idx.col==t_idx.col) {
							$thebox.removeClass('ui-checkbox-on');
							$thebox.find('.ui-icon').removeClass('ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
							break;
						}
					}
					
					var $row_header_boxs = $tbody.find('div.row-header');
					var row_box_cnt = $row_header_boxs.length;
					for(j=0; j<row_box_cnt; j++) {
						$thebox = $($row_header_boxs[j]);
						var y_idx = $thebox.data('idx');
						if (y_idx.row==t_idx.row) {
							$thebox.removeClass('ui-checkbox-on');
							$thebox.find('.ui-icon').removeClass('ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
							break;
						}
					}
				}
				else {
					var row_allchecked = true,
					    col_allchecked = true;
						
					
					var $cboxs = $tbody.find('div.ui-checkbox');
					var cbCnt = $cboxs.length;
						
					for(i=0; i<cbCnt; i++) {
						$thebox = $($cboxs[i]);
						if (!$thebox.hasClass('row-header')) // 非header項目才執行check作業
						{
							// 檢核同列項目, 若全部check->chekc row-header
							var theIdx = $thebox.data('idx');
							if (row_allchecked && theIdx.row==t_idx.row) {
								if (!$thebox.hasClass('ui-checkbox-on')) {
									row_allchecked = false;
								}
							}
					
							// 檢核同行項目, 若全部check->check col-headre		
							if (col_allchecked && theIdx.col==t_idx.col) {
								if (!$thebox.hasClass('ui-checkbox-on')) {
									col_allchecked = false;
								}
							}
						}
						
						// 
						if ((!row_allchecked) && (!col_allchecked)) {
							break;
						}
					}
					
					if (row_allchecked) {
						$thebox = $(($tbody.find('tr'))[t_idx.row]).find('.row-header');
						$thebox.addClass('ui-checkbox-on');
						$thebox.find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
					}
					
					if (col_allchecked) {
						$thebox = $(($thead.find('.col-header'))[t_idx.col]);
						$thebox.addClass('ui-checkbox-on');
						$thebox.find('.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
					}
				}
				
			}
		});
		
		// dump cbox index
		for(i=0; i<cbox_cnt; i++) {
			$box = $($all_cbox[i]);
			idx = $box.data('idx');
			var _log = 'checkbox#' + i + 'index col=' + idx.col + ', row=' + idx.row;
			if ($box.hasClass('col-header')) {
				_log += ' [Col-header]';
			}
			else if ($box.hasClass('row-header')) {
				_log += ' [Row-header]';
			}
			theLogger.debug(_log + '\r\n');
		}
	}
}
//
// 文稿會稿單位設定子視窗
// 簽稿會核單之代碼為"6"
//
function showDraftCoworkSyncDialog()
{
	/* 設定[會辦語詞]spin wheel之內容 (內部使用函式)
	 */
	function _initCoworkMethodSpinWheel(id, addAll, display_pos)
	{
		var target = $('#' + id);
		if (target.length===0) {
			return;
		}
		
		var type = typeof $('#'+id)[0];
		theLogger.debug('_initCoworkMethodSpinWheel() typeof target element:' + type);
		
		if ((typeof id=='undefined') || id.length===0) {
			alert('_initCoworkMethodSpinWheel(), invalid "id"');
			return;
		}
		
		var methodList = ['順會', '敬會', '先會', '後會'];
		var wheels = [];
		var obj = { '會辦語詞': {} };
		var folderCnt = methodList.length;
		var i=0, j=0, k=0;
		for(i=0; i<folderCnt; i++) {
			obj['會辦語詞'][i] = methodList[i].name;
		}
		wheels.push(obj);
		
		$('#' + id).scroller({
				width: 120,
				wheels: wheels,
				theme: 'ios',
				align_mode: display_pos, // 2012.2.1 - Eric Peng
				parseValue: function (s) {
					var d = [], i, folder;
					if (s !== '') {
						for (i in wheels[0]['會辦語詞']) {
							if (wheels[0]['會辦語詞'].hasOwnProperty(i))
							{
								folder = wheels[0]['會辦語詞'][i];
								if (folder == s)
									d.push(parseInt(i));
							}
						}
					}
					else {
						d.push(1); //[1,1,1];
					}
					return d;
				},
				formatResult: function(d) {
					var sRslt = wheels[0]['會辦語詞'][d[0]];
					return sRslt;
				}
		});
		
		// 點擊時顯示scroll wheel control
		$('#' + id).on('click', function() {
			$(this).scroller('show');
		});
	}

	var $dlg = $('#dlgDraftCoworkSync').clone(true);
	//$dlg.trigger('refresh');
	
	// 找出會辦單位清單, 並產生表格內容
	var $table_cntr = $dlg.find('div.table_content');
	_createTable($table_cntr);
	
	// 會辦語詞設定
	$dlg.find('#coworkText').on('click', function() {
		_initCoworkTextSpinWheel('coworkText', $dlg);
	});
	
	/*var $selector = $dlg.find('#coworkText');
	$selector.mobiscroll().select({
		theme:'ios',
		display:'bubble',
		mode:'scroller',
		inputClass:'i-txt'
	});*/
	
	//$dlg.find('#dlg_content').data('role', 'content');
	//$dlg.find('div.table_content').trigger('refresh'); // $dlg.trigger('create');
		
    
	$dlg.find('a.display_setting').on('click', function(event){
		showDraftCoworkDisplaySettingDialog(event);
	});
	
    $dlg.find('a#targetDlgOK').on('click', function(event) {
        $.modal.close();
    });
	
    $dlg.find('a#targetDlgCancel').on('click', function(event) {
        $.modal.close();
    });
	
    var w = $('#dlgProcessFlow').width(),
        h = $('#dlgProcessFlow').height(); // - 80;
    theLogger.debug('新增指定傳送流程組對話方塊, w:' + w + ', h:' + h);
    $.modal($dlg, {appendTo:$('#dlgProcessFlow'), overlayCss:{height:h, width:w}, minWidth:750, minHeight:500});
	
	// 會辦語詞設定
	//_initCoworkMethodSpinWheel('cowork_text', true, 'bottom');
}

function showSendDocDialog()
{
	var $dlg = $('#dlgDraftCoworkSync').clone(true);
    
    $dlg.find('a#targetDlgOK').on('click', function(event) {
        $.modal.close();
    });
	
    $dlg.find('a#targetDlgCancel').on('click', function(event) {
        $.modal.close();
    });
	
    var w = $('#dlgProcessFlow').width(),
        h = $('#dlgProcessFlow').height(); // - 80;
    theLogger.debug('公文辦理程及設定對話方塊, w:' + w + ',h:' + h);
    $.modal($dlg, {appendTo:$('#dlgProcessFlow'), overlayCss:{height:h, width:w}, minWidth:500, minHeight:400});
}

// 2013.1.7 - 產生設定項內容
function _createTargetOptionElem($parent, Unit, SubUnit, Role, Name, flag)
{
	var sElem = '<fieldset data-role="controlgroup" data-type="horizontal">';
	var checked = false;
	var sub = '';
	if (Unit.length) {
		checked = false;
		if (flag & 0x1) {
			checked = true;
		}
		sub = '<input type="checkbox" id="draft_1" name="sync_draft" value="{GUID-1}"' +
			       (checked ? ' checked="checked"' : '') + ' />' +
		           '<label for="draft_1">' + Unit + '</label>';
		sElem += sub;
	}
	
	if (SubUnit.length) {
		checked = false;
		if (flag & 0x2) {
			checked = true;
		}
		sub = '<input type="checkbox" id="draft_2" name="sync_draft" value="{GUID-2}"' +
					(checked ? ' checked="checked"' : '') +
					' />' +
                  '<label for="draft_2">' + SubUnit + '</label>';
		sElem += sub;
	}
	
	if (Role.length) {
		checked = false;
		if (flag & 0x4) {
			checked = true;
		}
		sub = '<input type="checkbox" id="draft_3" name="sync_draft" value="{GUID-3}"' +
					(checked ? ' checked="checked"' : '') +
				  ' />' +
				  '<label for="draft_3">' + Role + '</label>';
		sElem += sub;
	}
	
	if (Name.length) {
		checked = false;
		if (flag & 0x8) {
			checked = true;
		}
        sub = '<input type="checkbox" id="draft_4" name="sync_draft" value="{GUID-4}"' +
					(checked ? ' checked="checked"' : '') +
				  ' />' +
                  '<label for="draft_4">' + Name + '</label>';
		sElem += sub;
	}
	
    sElem += '</fieldset>';
	
	$(sElem).appendTo($parent);
}
//
// 2012.7.18 - 會稿對象設定子視窗
//
function showDraftCoworkDisplaySettingDialog(event)
{
	//alert('pp');
	
	var srcElem = event.srcElement;
	var $btnElem = $(srcElem).closest('a.display_setting');
	
	var $content = $(srcElem).closest('div.ui-content');
	var $tableContent = $(srcElem).closest('div.table_content');
	
	
	var offset_content = $content.offset();
	var offset_btn = $btnElem.offset();
	
	var offset_tb_content = $tableContent.offset();
	var diff_tb = {
		x : parseInt(offset_tb_content.left - offset_content.left),
		y : parseInt(offset_tb_content.top - offset_content.top),
	};
		
	var w_content = $content.innerWidth();
		
	var w_btn = $btnElem.innerWidth();
	//var h_btn = $btnElem.innerHeight();
	
	// button最上方到右方icon最下方距離 -> 27px
	var icon_offset_top = 20;
	
	// icon與btn右邊界的距離 -> 15px
	var icon_offset_right = 15; //
	
	// 箭頭標記與右上角水平距離
	var pointer_offset_right = 65;
	
	// 箭頭標記與右上角垂直距離
	var pointer_offset_top = 15;
	
	var top_popup = parseInt(offset_btn.top-offset_content.top+icon_offset_top+pointer_offset_top);
	var right_popup= parseInt(offset_content.left+w_content) - parseInt(offset_btn.left+w_btn-icon_offset_right) - pointer_offset_right;
	
	var $popup = $('#dlgDraftCoworkSync #dlgCoworkDisplaySetting');
	$content = $popup.find('div.target_section');
	$content.find('fieldset').remove();
	
	var flag = 0x1 + 0x8; //0x2 + 0x4 + 0x8;
	_createTargetOptionElem($content, '人事室', '二科', '承辦人', '王二明', flag);
	
	// apply jQM enhance process.
	$content.enhanceWithin(); //trigger('create'); 
	
	// 計算顯示位置!
	//var top_popup = 157;
	//var right_popup = 33;
	
	// 在dialog上方顯示帷幕
	$('#dlgDraftCoworkSync .dlgCDS_overlay').css('display', 'block');
	
	$popup.css({ 'z-index':'2000',
			     display:'block',
			     top: top_popup.toString() + 'px',
			     right: right_popup.toString() + 'px'});
}
// 2012.7.18
function hideDraftCoworkDisplaySettingDialog()
{
	// 隱藏dialog上方帷幕
	$('#dlgDraftCoworkSync .dlgCDS_overlay').css('display', 'none');
	
	var $dlg = $('#dlgDraftCoworkSync #dlgCoworkDisplaySetting');
	$dlg.css({ display:'none'});
}

//
// 設定流程項目之選單選項 (流程狀態: 尚未執行/非會辦流程)
//
function _setupFlowEditCmds(flowPopup)
{
	if (flowPopup===undefined) {
		theLogger.warn('-W- _setupFlowEditCmds() flowPopup is undefined!');
		return;
	}
	
	// 2012.2.24 - 整合流程設定子視窗
	function flowModifyBtnClicked(header_str)
	{
		//var logstr = 'flowModifyBtnClicked header_str=' + header_str;
		//console.log(logstr);
		
		$('#dlgTransTarget .dlg-title').css('display', 'none');
		$('#dlgTransTarget .inline-title h2').text(header_str);
		
		if (header_str=='新增簽核流程') {
			$('#dlgTransTarget .choice-flow-type').show();
		}
		else if (header_str=='修改簽核流程') {
			$('#dlgTransTarget .choice-flow-type').hide();
			$('#dlgTransTarget .flow_set').hide();
			$('#dlgTransTarget .trans_target').show();
		}
		
		$.mobile.changePage($('#dlgTransTarget'), {transition: 'slide', changeHash:false});
		//$('body').pagecontainer('change', '#dlgTransTarget', {transition: 'slide', changeHash:false});
	}
	
	function addFlowBtnClicked(event) {
		//flowModifyBtnClicked('新增簽核流程');
		
		showTransTargetDialog(flowPopup.getTarget(), false);
	}
	
	function deleteFlowCmdClicked(event) {
		deleteFlowItem(flowPopup.getTarget());	
	}
	
	function modifyFlowBtnClicked() {
		/*flowModifyBtnClicked('修改簽核流程');
		var flowSet = confirm("ok->新增流程, cancel->新增流程組");
		if (flowSet==true) { */
			showTransTargetDialog(flowPopup.getTarget(), true);
		/*}
		else {
			showFlowSetDialog();
		}*/
	}
	
	var flowEditCmds = [];
	flowEditCmds.special = true;
	
	flowEditCmds.push({name: '新增流程', func: addFlowBtnClicked});
	flowEditCmds.push({name: '新增流程組', func: addFlowBtnClicked});
	flowEditCmds.push({name: '修改流程', func: modifyFlowBtnClicked});
	flowEditCmds.push({
		name: '刪除流程',
		func: deleteFlowCmdClicked, /*function() {
			    _hideFlowChartPopup();
				confirm('確定要移除此流程？');
			  }*/
	});
	
	// 2012.6 - 新增"傳送至此"
	//flowEditCmds.push({name:"傳送至此", func: null});
	
	flowPopup.setCmds(flowEditCmds);
}

function _hideFlowChartPopup()
{
	flowPopup.setPos({x:0,y:0}, false);
}

function _verifyEnvelope() {
	$('#coworkex').mobiscroll().select({
		theme:'ios',
		display:'bubble',
		mode:'scroller',
		inputClass:'i-txt'
	});
}

//$(document).ready(function(){
$(document).on('pagecreate', '#dlgProcessFlow', function() {
	// 2021.5 - 1100473 Eric, 弱掃
	function _HtmlEncode(s) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        return div.innerHTML;
    }

		// 畫背景格線
		function _drawGrid($canvas) {
			var grid_width = 160, 
				grid_height = 80,
				canvas_default_width = 1440,
				canvas_default_height = 1440,
				horzLineClass='horz_line',
				vertLineClass='vert_line';
				
			var sLines = '', sLine='';
			var x=0, y=0;
			// horizontal lines
			for(y=grid_height; y<=canvas_default_height; y+=grid_height) {
				sLine = '<div class="' + horzLineClass + '" style="top:' + y.toString() + 'px;"></div>';
				sLines += sLine;
			}
			
			// vertical lines
			for(x=grid_width; x<=canvas_default_width; x+=grid_width) {
				sLine = '<div class="' + vertLineClass + '" style="left:' + x.toString() + 'px;"></div>';
				sLines += sLine;
			}
			
			$canvas.children().remove();
			$(sLines).appendTo($canvas);
		}
		
		/* 2013.11 - 清查目前未使用!
		function _trimAll(sString, sToBeTrim)
		{
			if (sString.length < sToBeTrim)
				return '';
			
			var length = sToBeTrim.length;
			while (sString.substring(0,length) == sToBeTrim)
			{
				sString = sString.substring(length, sString.length);
			}
			
			while (sString.substring(sString.length-length, sString.length) == sToBeTrim)
			{
				sString = sString.substring(0, sString.length-length);
			}
			
			return sString;
		}*/
		
		function _flowCanvasClicked(event)
		{
			writeLog('flowCanvasClick event handler...');
			
			var showMenu = false;
			var elemClass = '';
			
			// 2012.9 - 流程項目之 drag & drop 結束時, 不顯示 content menu
			if (_lastDragObj) {
				_lastDragObj = null;
				return;
			}
			
			if (event.srcElement.nodeName.toUpperCase() == 'TEXTAREA') {
				return;
			}
			
			var outeroffset_x = 0;
			var outeroffset_y = 0;
			$flowItem = $(event.srcElement).closest('.flow_item');
			if (!!$flowItem && $flowItem.length) {
				// flow_item ifself or flow_item's descendent.
				elemClass = $flowItem.attr('class');
				if ($flowItem[0] != event.srcElement) {
					// descendent trigger the event, we should calc. offset.
					var pos = $flowItem.offset();
					outeroffset_x = _m.floor(pos.left);
					outeroffset_y = _m.floor(pos.top);
					
					var canvas_pos = $(event.currentTarget).offset();
					outeroffset_x -= _m.floor(canvas_pos.left);
					outeroffset_y -= _m.floor(canvas_pos.top);
					
					writeLog('outeroffset_x/y:' + outeroffset_x + '/' + outeroffset_y +
							 ', item_pos_l/t:' + _m.floor(pos.left) + '/' + _m.floor(pos.top) +
							 ', canvas_pos_l/t:' + _m.floor(canvas_pos.left) + '/' + _m.floor(canvas_pos.top));
				}
			}
			else {
				$flowgroup = $(event.srcElement).closest('.flow_group');
				if (!!$flowgroup && $flowgroup.length) {
					elemClass = $flowgroup.attr('class');
				}
			}
			
			var flowNewCmds;
			
			// 點擊在flow_item或 flow_group上才顯示選單
			if (elemClass.indexOf('flow_item', 0)>=0 || elemClass.indexOf('flow_group')>=0)
			{
				if (elemClass.indexOf('flow_group')!=-1) { // 會辦流程點
					flowNewCmds = [];
					flowNewCmds.special = true;
					
					flowNewCmds.push({name: '新增流程', func: addFlowBtnClicked});
					flowNewCmds.push({name: '新增流程組', func: addFlowBtnClicked});
					flowNewCmds.push({name: '修改流程', func: null});
					flowNewCmds.push({name: '刪除流程', func: deleteFlowCmdClicked});
					flowNewCmds.push({name: '設定文稿會稿資訊', func: null});
					
					// 2012.6 - 新增"傳送至此"
					//flowNewCmds.push({name:"傳送公文至此", func: null});
				
					flowPopup.setCmds(flowNewCmds);
					flowPopup.setTarget($flowItem[0]);
					showMenu = true;
				}
				else if (elemClass.indexOf('flow_item_finished', 0)==-1 &&
						 elemClass.indexOf('flow_item_current', 0)==-1) {
					// 尚未簽核且非目前流程點之流程
					_setupFlowEditCmds(flowPopup);
					flowPopup.setTarget($flowItem[0]);
					showMenu = true;
				}
				else if (elemClass.indexOf('flow_item_current')!=-1) { // 目前流程點, 可[傳送公文]/[新增流程]/[新增流程組]
					flowNewCmds = [];
					flowNewCmds.special = true;
					flowNewCmds.push({name: '新增流程', func: addFlowBtnClicked});
					flowNewCmds.push({name: '新增流程組', func: addFlowBtnClicked});
					flowNewCmds.push({name: '傳送公文', func: null});
					flowPopup.setCmds(flowNewCmds);
					flowPopup.setTarget($flowItem[0]);
					showMenu = true;
				}
				/*else if (elemClass.indexOf("flow_item_incharge")) {
					var flowNewCmds = new Array();
					flowNewCmds.special = true;
					flowNewCmds.push({name:"退回公文", func: null});
					flowPopup.setCmds(flowNewCmds);
					showMenu = true;
				}*/
			}
			
			// 在其它區域點擊=>隱藏選單
			if (!showMenu) {
				_hideFlowChartPopup();
				return;
			}
			// 相對Item左上角座標 + 
			var itemOffsetX = _m.floor(event.srcElement.offsetLeft + outeroffset_x);
			var itemOffsetY = _m.floor(event.srcElement.offsetTop + outeroffset_y);
			var insideOffsetX = _m.floor(event.offsetX);
			var insideOffsetY = _m.floor(event.offsetY);
			
			var canvas_off = $(this).offset();
			writeLog('canvas offsetX/Y:' + _m.floor(canvas_off.left) + '/' + _m.floor(canvas_off.top) +
					 ', pointer@canvas l/t:' + _m.floor(event.clientX - canvas_off.left) + '/' + _m.floor(event.clientY - canvas_off.top));
			
			
			// _m.floor(
			writeLog('event.srcElem.offset_l/t:' + _m.floor(event.srcElement.offsetLeft) + '/' + _m.floor(event.srcElement.offsetTop) +
					 ', outeroffset_x/y:' + outeroffset_x + '/' + outeroffset_y);
			writeLog('itemOffsetX/Y:' + itemOffsetX + '/' + itemOffsetY + ', insideOffsetX/Y:' + insideOffsetX + '/' + insideOffsetY + '(=event.offsetX/Y)');
			
			writeLog('flowCanvas clicked: x:' + (itemOffsetX+insideOffsetX) + ', y:' + (itemOffsetY+insideOffsetY));
			//var menuPos = { x: itemOffsetX+insideOffsetX,
			//				y: itemOffsetY+insideOffsetY};
			var menuPos = { x: _m.floor(event.clientX - canvas_off.left),
							y: _m.floor(event.clientY - canvas_off.top)};
			flowPopup.setPos(menuPos, true);
		}

		function _setupComments($comments, docToDoList) {
			function _getMsgIdFromAolFlowId(flowId) {
				var sPrefix = 'FLOW_';
				var msgId = '';
				if (flowId.indexOf(sPrefix)===0) {
					msgId = flowId.substr(sPrefix.length);
					return msgId;
				}
			
				// 非預期格式, 回傳AOL	
				return '';
			}
			
			function _getDocToDoListItem(docToDoList, msgId) {
				for(var i=0; i<docToDoList.length; i++)
				{
					var item = docToDoList[i];
					if (item.msgId==msgId) {
						return item;
					}
				}
				return null;
			}
		
			function getTimeString(time) {
				// 2021.5 - 1100093 - merge: 2021.1 - 1090821 Eric, 顯示年份
				// YYYmmddHHMM -> YYYmmdd<br>hhmm
				if (typeof time === 'string') {
					var timeStr = time.substring(0, 3) + '/' + time.substring(3, 5) + '/' + time.substring(5, 7) + ' ' + // 2018.4.12 - Eric, bug-fix 日期/時間中間要有空白
								  time.substring(7, 9) + ':' + time.substring(9, 11);
					// 2021.7 - 1100854 Eric, SignTime with second								  
					if (time.length==13) {
						timeStr += (':' + time.substring(11, 13));
					}
					return timeStr;
				}
				return '';
			}
		
			//var maxDraftMsgId = '1999'; // 草稿流程點的最大MsgId
			if ($comments.find('li').length) {
				$comments.find('li').remove();
			}
			
			var nMaxDraftMsgId = 1999;
			var docObj = theAOL.docObj;
			if (typeof docObj==='undefined' || docObj===null) {
				theLogger.error('-E- _setupComments() failed. theAOL.docObj invalid.');
				return;
			}
			
			var isDraft = theSSO.MP.todolist.builder.isDraftMsg(docObj);
			var aolFlows = theAOL.signFolder.getAolFlow();
			docToDoList = SSOUtil.getDocToDoList(docObj.docNo, localStorage.Artifact);
			
			/*
			*<li>
			   <div class="flowsite_info">
				 <div class="date_time">[目前流程點]</div>
				 <div class="unit">人事室</div>
				 <div class="role">主任</div>
				 <div class="name">查爾斯四</div>
			   </div>
			   <div class="comment_text editable">
				 <!--span class="saved_text">Where the streets have no name!</span-->
				 <!--input type="text" class="comment_edit" value="Where the streets have no name!" /-->
				 <textarea rows="3" style="margin-left:0px;width:95%;overflow: hidden;line-height: 1.2em">主任第一行簽核意見...
   第二行簽核意見...</textarea>
				 <div class="edit_icon"></div>
			   </div>
			   <div class="portrait" style="background: #fff url('IMAGE/WorkFlow/portrait_2_small.png');"></div>
			 </li>
			 <li>
			   <div class="flowsite_info">
				 <div class="date_time">08/01 13:45</div>
				 <div class="unit">人事室二科</div>
				 <div class="role">科長</div>
				 <div class="name">波堤斯</div>
			   </div>
			   <div class="comment_text">科長簽核意見blah blah blah blah...</div>
			   <div class="portrait"  style="background:transparent url('IMAGE/WorkFlow/portrait_3.jpg') 50% 50%;"></div>
			 </li>
			*/
			
			orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo);
			
			// 2015.5 - docObj.ownUserId may be ''.
			var userId = docObj.ownUserId;
			// 2018.4.12 - 1070463 代理公文須用目前使用者account.
			let isProxyDoc = (docObj.get('ODWMSG', 'IS_PROXY_DOC')=='1')?true:false;
			if (userId.length===0 || isProxyDoc) {
				userId = theSSO.User.account;
			}
			
			var thisUserInfo = null;
			if (userId.length) {
				thisUserInfo = SSOUtil.getOrgUserInfo(orgNode, docObj.ownOUId, docObj.ownRoleId, userId, '');
			}

			// 2018.4.12 - Eric, NCKU107463 - 處理目前為代理人開啟之情況.
			if (typeof thisUserInfo=='undefined' || thisUserInfo==null) {
				let OUName = SSOUtil.getOrgUnitName(orgNode, docObj.ownOUId);
				let RoleName = SSOUtil.getOrgRoleName(orgNode, docObj.ownOUId, docObj.ownRoleId);
				if (typeof OUName!=='string' || OUName.length==0 ||
				    typeof RoleName!=='string' || RoleName.length==0) {
					let errMsg = '無效的單位/角色代碼: OUId=' + docObj.ownOUId + ', RoleId=' + docObj.ownRoleId;
					theLogger.error('Error! _setupComments() ' + errMsg);
					return;
				}
				thisUserInfo = {
					OUId: docObj.ownOUId,
					OUName: OUName,
					RoleId: docObj.ownRoleId,
					RoleName: RoleName,
					UserId: theSSO.User.account,
					UserName: theSSO.User.name
				}
			}
			
			var portraitUrl = SSOUtil.getRoleIconPathname(docObj.sourceOrgNo, docObj.ownOUId, docObj.ownRoleId);
			
			// 加入目前流程的項目 (2015.10 - 非唯讀文件夾才會加入)
			var uiState = window._getUIStatus();
			var commentItemStr = '', $commentItem;
			if ((typeof docObj !=='undefined') && !uiState.readOnly)
			{
				commentItemStr =  '<li>' +
										'<div class="flowsite_info">' +
											'<div class="date_time">[目前流程點]</div>' +
											'<div class="unit">' + _HtmlEncode(thisUserInfo.OUName) + '</div>' +
											'<div class="role">' + _HtmlEncode(thisUserInfo.RoleName) + '</div>' +
											'<div class="name">' + _HtmlEncode(thisUserInfo.UserName) + '</div>' +
										'</div>' +
										'<div class="comment_text editable">' +
											'<textarea rows="3" style="margin-left:0px;width:95%;overflow: hidden;line-height: 1.2em">' +
											_HtmlEncode(theAOL.signComment()) +
											'</textarea>' +
											'<div class="edit_icon"></div>' +
										'</div>' +
										'<div class="portrait" style="background: #fff url(\'' + _HtmlEncode(portraitUrl) + '\');"></div>' +
									'</li>';
				$commentItem = $(commentItemStr);
				$commentItem.appendTo($comments);
			}
								
			var idx = aolFlows.flows.length - 1;
			
			//若最後一個AolFlow項目為目前流程點, 跳過
			var aolFlow = aolFlows.length ? aolFlows.flows[idx] : null; // 2016.10.12 - bug-fix, 草稿無法開啟簽辦意見子視窗問題
			var flowMsgId = (!!aolFlow) ? _getMsgIdFromAolFlowId(aolFlow.id) : '';
			var todoMsgId = '';
			if (isDraft) {
				var idxUL = docObj.msgId.indexOf('_');
				if (idxUL>0) {
					todoMsgId = docObj.msgId.substring(0, idxUL);
				}
			}
			else {
				todoMsgId = docObj.msgId;
			}
			
			if (flowMsgId.length && (flowMsgId===todoMsgId)) {
				idx--;
			}
			
			var $item, sItem, itemDTDL, comment;
			var nMsgId;
			// 最近的流程先加!
			for (; idx>=0; idx--)
			{
				aolFlow = aolFlows.flows[idx];

				// 2021.5 - 1100093 merge: 2021.1 - 1090821 Eric, 顯示外機關簽辦之流程及簽核意見!
				// 若非外機關送本機關陳核會稿公文, flowMsgId格式為: FLOW_$MsgId$ (flowType=0)
				// 若為外機關送本機關陳核會稿公文, flowMsgId格式為: FLOW_$OrgNo$_$MsgId$ (flowType=1)
				// 若為外機關簽核流程, flowMsgId格式為: $OrgNo_Others$_FLOW_$MsgId$ (flowType=2)
				let flowType = 0; // normal
				if (aolFlow.isExorgFlow) {
					flowType = 2;
				}
				else {
					if (docObj.ODWMSG.COME_OTHERS==='1' || docObj.ODWMSG.COME_OTHERS==='2') {
						flowType = 1;
					}
				}

				if (flowType==0 || flowType==1) {
					flowMsgId = _getMsgIdFromAolFlowId(aolFlow.id);
				}
				else if (flowType==2) {
					flowMsgId= aolFlow.id;
				}
				else {
					theLogger.log('-W- invalid aolFlow:' + JSON.stringify(aolFlow));
					continue; // skip unknown flow
				}
			
				if (flowType==0 || flowType==1) {
					if (flowType==0) {
						nMsgId = parseInt(flowMsgId);
					}
					else {
						let msgIdPart = flowMsgId.split('_');
						if (msgIdPart==2) {
							nMsgId = parseInt(msgIdPart[1]);
						}
					}
					if (nMsgId<nMaxDraftMsgId && !!docToDoList && docToDoList.length) {
						itemDTDL = docToDoList[0];
					}
					else if (!!docToDoList) {
						itemDTDL = _getDocToDoListItem(docToDoList, flowMsgId);
					}
				}
				else if (flowType==2) {
					// 產生一個外機關簽辦流程項目!
					itemDTDL = {
						COFlow: true,
						msgId: flowMsgId,
					};
				}

				if (itemDTDL===undefined || itemDTDL===null) {
					continue;
				}
				
				// 2014.2.18 - 若流程點未記錄人員帳號, 則不列入!
				if (flowType!==2 && (!itemDTDL.ownUserId || (itemDTDL.ownUserId.length===0))) {
					// 沒有人員帳號資訊 => 非一般簽核流程!
					continue;
				}
				
				// 2016.11.25 - 目前流程點, 不加入! (後續作業會append上去)
				if (flowMsgId==todoMsgId) {
					continue;
				}
				
				// 2014.2.18 - 總收文/發文/繥印/校對角色流程不列入!
				//OD91 > 收文, OD92 > 繕印, OD93 > 校對, OD94 > 發文, OD95 > 檔管, OD96 > 研考
				if (flowType!==2) {
					if (itemDTDL.ownRoleId==='OD91' || itemDTDL.ownRoleId==='OD92' || itemDTDL.ownRoleId==='OD93' ||
						itemDTDL.ownRoleId==='OD94' || itemDTDL.ownRoleId==='OD95' || itemDTDL.ownRoleId==='OD96') {
						continue;
					}
				}
				
				// 2018.4.12 - Eric, NCKU107463 - 處理流程為代理人簽辦之情況.
				let validUserInfo = false, proxyFlow = false;
				let thisUserInfo = null;
				if (flowType===2) {
					thisUserInfo = {
						OrgName:  aolFlow.refChangeInfo.comOrgName,
						OUId: '',
						OUName: aolFlow.refChangeInfo.charger.ou,
						RoleId: '',
						RoleName: aolFlow.refChangeInfo.charger.role,
						UserId: '',
						UserName: aolFlow.refChangeInfo.charger.name,
						Title: aolFlow.refChangeInfo.charger.title
					};
					validUserInfo = true;
					portraitUrl = SSOUtil.getRoleIconPathname('', '', 'OD99');
				}
				else {
					if (itemDTDL.proxySend!=='1') {
						thisUserInfo = SSOUtil.getOrgUserInfo(orgNode, itemDTDL.ownOUId, itemDTDL.ownRoleId, itemDTDL.ownUserId, '');
					}
					else {
						proxyFlow = true;
					}
				

					if (typeof thisUserInfo=='undefined' || thisUserInfo==null) {
						let OUName = SSOUtil.getOrgUnitName(orgNode, itemDTDL.ownOUId);
						let RoleName = SSOUtil.getOrgRoleName(orgNode, itemDTDL.ownOUId, itemDTDL.ownRoleId);
						if (typeof OUName!=='string' || OUName.length==0 ||
							typeof RoleName!=='string' || RoleName.length==0) {
							// 若目前的OrgInfo找不到當時的人員資訊, 由封裝檔取!
							if ("refChangeInfo" in aolFlow) {
								thisUserInfo = {
									OUId: itemDTDL.ownOUId,
									OUName: aolFlow.refChangeInfo.charger.ou,
									RoleId: itemDTDL.ownRoleId,
									RoleName: aolFlow.refChangeInfo.charger.role,
									UserId: '',
									UserName: aolFlow.refChangeInfo.charger.name + ((proxyFlow)?'(代)':'')
								};
								validUserInfo = true;
							}
						}
						else {
							thisUserInfo = {
								OUId: itemDTDL.ownOUId,
								OUName: OUName,
								RoleId: itemDTDL.ownRoleId,
								RoleName: RoleName,
								UserId: ''
							};

							if ("refChangeInfo" in aolFlow) {
								thisUserInfo.UserName = aolFlow.refChangeInfo.charger.name + ((proxyFlow)?'(代)':'');
							}
							validUserInfo = true;
						}

						// 無法正常顯示 => 跳過
						if (!validUserInfo) {
							continue;
						}
					}
					else {
						validUserInfo = true;
					}
					portraitUrl = SSOUtil.getRoleIconPathname(docObj.sourceOrgNo, itemDTDL.ownOUId, itemDTDL.ownRoleId);
				}
				
				comment = '[無簽核意見]';
				if ((typeof aolFlow.refChangeInfo!=='undefined') && (typeof aolFlow.refChangeInfo.comment!=='undefined') && aolFlow.refChangeInfo.comment.length) {
					comment = aolFlow.refChangeInfo.comment;
				}
				
				var timeStr = '';
				if ((typeof aolFlow.refChangeInfo!=='undefined') && (typeof aolFlow.refChangeInfo.timeStamp==='string') && aolFlow.refChangeInfo.timeStamp.length) {
					timeStr = getTimeString(aolFlow.refChangeInfo.timeStamp);
				}
				else if ((typeof itemDTDL.txTime=='string') && itemDTDL.txTime.length) {
					timeStr = getTimeString(itemDTDL.txTime);
				}

				let _OUName = thisUserInfo.OUName;
				let _RoleName = thisUserInfo.RoleName;
				if (flowType==2) {
					_OUName = thisUserInfo.OrgName + '-' + thisUserInfo.OUName;
					if (typeof thisUserInfo.Title=='string' && thisUserInfo.Title.length) {
						_RoleName = thisUserInfo.Title;
					}
				}

				commentItemStr = '<li>' +
									'<div class="flowsite_info">' +
										'<div class="date_time">' + timeStr + '</div>' +
										'<div class="unit">[' + _HtmlEncode(_OUName) + ']</div>' +
										'<div class="role">' + _HtmlEncode(_RoleName) + '</div>' +
										'<div class="name">' + _HtmlEncode(thisUserInfo.UserName) + '</div>' +
									'</div>' +
									// 1081217 Raymond FIX XSS
									//'<div class="comment_text">' + comment + '</div>' +
									'<div class="comment_text">' + '</div>' +
									'<div class="portrait"  style="background:transparent url(\'' + _HtmlEncode(portraitUrl) + '\') 50% 50%;"></div>' +
								 '</li>';
				$commentItem = $(commentItemStr);
				// 1081217 Raymond FIX XSS
				$commentItem.find("div.comment_text").text(comment);
				$commentItem.appendTo($comments);
			}
		}
		
		function _initWorkFlowTable(sTable, docObj, SAMLart) {
			var $table = $(sTable);
			if ($table.length===0) {
				return;
			}
			
			var $tbody = $table.find('tbody');
			//if ($tbody.find('tr').length) {
			//}
			
			function getTimeString(time) {
				// YYYmmddHHMM -> mmdd<br>hhmm
				if (typeof time === 'string' && time.length) {
					var timeStr = _HtmlEncode(time.substring(3, 5) + '/' + time.substring(5, 7)) + '<br>' +
							      _HtmlEncode(time.substring(7, 9) + ':' + time.substring(9, 11));
					// 2021.7 - 1100854 Eric, SignTime with second								  
					if (time.length==13) {
						timeStr += _HtmlEncode(':' + time.substring(11, 13));
					}
					return timeStr;
				}
				return '';
			}
			
			function _getMsgIdFromAolFlowId(flowId) {
				var sPrefix = 'FLOW_';
				var msgId = '';
				if (flowId.indexOf(sPrefix)===0) {
					msgId = flowId.substr(sPrefix.length);
					return msgId;
				}
			
				// 非預期格式, 回傳AOL	
				return '';
			}
			
			//1150312	Leslie[外貿序75]	修正簽辦意見窗格不顯示草稿簽辦意見的問題
			// function getCommnet(msgId) {
			function getCommnet(msgId, idxFlow) {
				var idx = 0;
				var aolFlow, tMsgId;
				for (idx=0; idx<aolFlows.flows.length; idx++) { // 2016.10.31 - bug-fix
					aolFlow = aolFlows.flows[idx];
					tMsgId = _getMsgIdFromAolFlowId(aolFlow.id);
					// 2020.3.25 - n/a Eric, bug-fix - aolFlow.refChangeInfo 可能為undefined!
					if (msgId==tMsgId && (typeof aolFlow.refChangeInfo!=='undefined' && aolFlow.refChangeInfo!==null)) {
						return aolFlow.refChangeInfo.comment;
					}
					//1150312	Leslie[外貿序75]	修正簽辦意見窗格不顯示草稿簽辦意見的問題
					if (idxFlow == 0 && parseInt(tMsgId) < 2000 && (typeof aolFlow.refChangeInfo!=='undefined' && aolFlow.refChangeInfo!==null))
						return aolFlow.refChangeInfo.comment;
				}
				return '';
			}
			
			var orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo);
			var aolFlows = theAOL.signFolder.getAolFlow();
			
			// 排除特定公文夾項目: 通知, 會核中, 已送出
			// 例外: 通知-回閱
			var _excludeFolders = [ '通知', '會核中', '已送出' ];
			
			/* 2016.6 - 草稿沒有已簽辦流程 */
			if (theSSO.MP.todolist.builder.isDraftMsg(docObj)) {
				return;
			}
			
			// 2021.5 - 1100093 merge: 2020.3 - 1081168 Eric, 彙併辦母/子文
			let nodeSiteContents = null;
			let sHeader = 'sign_';
			if ('_enveXML' in docObj && docObj._enveXML!==null) {
				nodeSiteContents = docObj._enveXML.getElementsByTagName("簽核點定義");
			}

			var docToDoList = SSOUtil.getDocToDoList(docObj.docNo, SAMLart);
			var flowItem, i=0, idx=0;
			var approved = false;
			for (i=0; i<docToDoList.length; i++) {
				var itemDTDL = docToDoList[i];
				var fExcludeFolder = false;
				var folderStr = itemDTDL.folder + '-' + itemDTDL.subfolder;
				var apporve_user = false;
				let msgId = itemDTDL.msgId;
				for(j=0; j<_excludeFolders.length; j++)
				{
					var theFolderStr = _excludeFolders[j];
					if (itemDTDL.folder===theFolderStr) {
						if (theFolderStr==='通知') {
							//1110319	Joe		1101416		依系統參數修改回閱名稱
							// if (itemDTDL.subfolder!='回閱') {
							let RESIGN_SUBFOLDER = theSSO.User.SystemSets.get('RESIGN_SUBFOLDER');
							if ((typeof(RESIGN_SUBFOLDER) =='string' && RESIGN_SUBFOLDER != "" && itemDTDL.subfolder!=RESIGN_SUBFOLDER) || (RESIGN_SUBFOLDER == "" && itemDTDL.subfolder!='回閱')) {
								fExcludeFolder = true;
								break;
							}
						}
						else {
							fExcludeFolder = true;
							break;
						}
					}
				}
				
				if (fExcludeFolder) {
					theLogger.log('-I- 排除特定文件夾:' + folderStr + '項目, MsgId=' + itemDTDL.msgId);
					continue;
				}
				
				if (!approved) {
					/* 2015.7 - 核決者須不為空值才比較 */
					if (!!itemDTDL.appUserId && itemDTDL.appUserId.length && (itemDTDL.appUserId===itemDTDL.ownUserId)) {
						apporve_user = true;
						approved = true;
					}
				}
				
				// make <tr> item
				/*<tr>
					<td><div>1</div></td><!-- 序 -->
					<td><div>線上簽核</div></td> <!-- 公文狀態 -->
					<td><div>總收</div></td><!-- 作業單位 -->
					<td><div>收文人員</div></td><!-- 負責人員 -->
					<td><div></div></td><!-- 公文接收時間 -->
					<td><div>08/01<br/>09:00</div></td><!-- 公文送出時間 -->
					<!--td><span>00:00</span></td--><!-- 公文處理時間 -->
					<td><div></div></td><!-- 實際[標準]工時 -->
					<td>分文</td> <!-- 異動別 -->
					<td></td> <!-- 是否使用臨時憑證 -->
					<td></td><!-- 簽核意見 -->
					<td></td> <!-- 核決 -->
					<!-- 2021.5 - 1100093: todo: merge 彙併辦 -->
					<td></td> <!-- 彙併辦公文 -->
				  </tr>
				 */
				var userInfo = SSOUtil.getOrgUserInfo(orgNode, itemDTDL.ownOUId, itemDTDL.ownRoleId, itemDTDL.ownUserId);
				var roleName = '', userName = '', name=''; // 2018.4.12 - 1070463
				if (!!userInfo) {
					roleName = userInfo.RoleName;
					userName = userInfo.UserName;
					if (roleName.length) {
						name = roleName + ' ' + userName;
					}
					else {
						name = userName;
					}
				}

				let lsChildDocNo = [];
				let mainDocNo = '';
				let comDocInfo = '';
				// 2021.5 - 1100093 merge: 2020.3 - 1081168 Eric, 彙併辦母/子文
				if (nodeSiteContents!==null && nodeSiteContents.length) {
					let cntSite = nodeSiteContents.length;
					let idx = 0;
					for(idx=0; idx<cntSite; idx++) {
						let nodeSiteContent = nodeSiteContents[idx];
						let sId = $(nodeSiteContent).attr('Id');
						let nodeMsgId = '';
						if (sId.length>sHeader.length) {
							nodeMsgId = sId.substr(sId.indexOf(sHeader)+sHeader.length); // sign_$MsgId$
						}
						if (nodeMsgId.length && msgId==nodeMsgId) {
							// <簽核文件夾>/<併文清單>/<子文>
							let nodeChildDocNos = nodeSiteContent.getElementsByTagName("子文");
							let i=0;
							for(i=0; i<nodeChildDocNos.length; i++) {
								let nodeChildDocNo = nodeChildDocNos[i];
								lsChildDocNo.push(nodeChildDocNo.textContent);
							}

							// <子文簽核文件夾>/<母文>
							let nodeChildDocSFolders = nodeSiteContent.getElementsByTagName("子文簽核文件夾");
							if (nodeChildDocSFolders.length) {
								let nodeMainDocNos = nodeChildDocSFolders[0].getElementsByTagName("母文");
								mainDocNo = nodeMainDocNos[0].textContent;
							}
							break;
						}
					}
				}

				// 取目前流程點之ODWMDC.COM_NO
				if (docObj.msgId==msgId && mainDocNo.length===0 && lsChildDocNo.length===0 && 
					Array.isArray(docObj.ODWDCM.COM_NO) && docObj.ODWDCM.COM_NO.length) {
					let i=0, _comNo = docObj.ODWDCM.COM_NO;
					for(i=0; i<_comNo.length; i++) {
						let _comDocNo = _comNo[i].COM_DOC_NO;
						if (_comDocNo!=docObj.docNo) {
							lsChildDocNo.push(_comDocNo)
						}
					}
				}

				if (mainDocNo.length) {
					comDocInfo = _HtmlEncode('母文:' + mainDocNo);
				}
				else {
					let i=0;
					for(i=0; i<lsChildDocNo.length; i++) {
						let _s = _HtmlEncode('子文:' + lsChildDocNo[i]);
						if (i!=(lsChildDocNo.length-1)) {
							_s += '<br>'
						}
						comDocInfo += _s;
					}
				}

				var sItem = '<tr>' +
								'<td><div>' + _HtmlEncode((idx+1).toString()) + '</div></td>' +
								'<td><div>' + _HtmlEncode(itemDTDL.subfolder) + '</div></td>' +
								'<td><div>' + _HtmlEncode(itemDTDL.ownOUName) + '</div></td>' +
								'<td><div>' + _HtmlEncode(name) + '</div></td>' +
								'<td><div>' + getTimeString(itemDTDL.newTime) + '</div></td>' +
								'<td><div>' + getTimeString(itemDTDL.signTime) + '</div></td>' +
								'<td><div>' + _HtmlEncode(itemDTDL.txName) + '</div></td>' +
								'<td><div>' + ((itemDTDL.tmpCer==='Y') ? '是' : '否') + '</div></td>' +
								//1150312	Leslie[外貿序75]	修正簽辦意見窗格不顯示草稿簽辦意見的問題
								// '<td><div>' + _HtmlEncode(getCommnet(itemDTDL.msgId)) + '</div></td>' +
								'<td><div>' + _HtmlEncode(getCommnet(itemDTDL.msgId, idx)) + '</div></td>' +
								'<td><div>' + (apporve_user ? '是' : '否') + '</div></td>' +
								'<td><div>' + comDocInfo + '</div></td>' +  // 2021.5 - 1100093 Eric, todo: merge 1081168
							'</tr>';
				
				$(sItem).appendTo($tbody);
				idx++;
			}
		}
		
		/* 2012.2.23 - flow item's popup menu
		* ToDo -
		*  2013.1.3 - 選單項目與被操作流程關聯建立機制enhance(目前直接在顯示選單前設定targetFlow)
		*/
	   function _flowPopupMenu($target, menuId) {
		   var that = {};
		   var targetFlow = null;
		   var self = this;
		   
		   if (menuId===undefined) {
			   theLogger.warn('flowPopupMenu ctor: "menuId" 未指定!');
			   return null;
		   }
		   
		   self.$float = $('<div id="' + menuId + '" class="popupMenu"><div></div><canvas></canvas></div>');
		   self.$float.appendTo($target);
		   
		   // 畫(menu上方)三角形
		   var ctx = self.$float.find("canvas").get(0).getContext('2d');
		   ctx.beginPath();
		   ctx.fillStyle = '#7d7d7d';
		   ctx.moveTo(0.5, 15.5);
		   ctx.lineTo(15.5,15.5);
		   ctx.lineTo(7.5, 0.5);
		   ctx.lineTo(0.5, 15.5);
		   ctx.closePath();
		   ctx.fill();
			   
		   var setCmds = function(cmds) {
			   self.$float.find('div').eq(0).html('');
			   for(var i=0; i<cmds.length; i++) {
				   var $cmd = $('<a class="ui-btn">' + cmds[i].name + '</a>');
				   /*if(navigator.userAgent.match(/iPad/i) != null)
					   $cmd.on("tap", outer, cmds[i].func).appendTo(self.$float.find("div").eq(0));
				   else*/
					   $cmd.on('click', $target[0], cmds[i].func).appendTo(self.$float.find('div').eq(0));
				   
				   // 點擊即編輯
				   if(cmds[i].autoExec) {
					   setTimeout(function() {
						   $cmd.trigger('click');
					   }, 100);
				   }
			   }
			   /*if(cmds.special != true) {
			   /	var $cmd = $("<a class='ui-btn'>插入文字</a>");
			   //	$cmd.on("click", outer, outer.editFunc["ins"]).appendTo(self.$float.find("div").eq(0));
			   //}*/
		   };
			   
		   var shiftY = 16;
		   var shiftX = 0;
			   
		   var setPos = function(_coord, _visible) {
			   theLogger.log('cmdFloat.setPos(' + _coord.x + ',' + _coord.y + ',' + _visible + ')');
				var shiftX = 0;
				var posX = _coord.x + shiftX - self.$float.width() / 2;
				var posY = _coord.y + shiftY;
				self.$float.css({left:(_coord.x + shiftX - (self.$float.width() / 2)) + 'px', top:(_coord.y + shiftY) + 'px', display: (_visible)?'block':'none'});
				self.$float.find('canvas').css({left: (self.$float.width() / 2 - 8) + 'px', top: (6 - self.$float.height()) + 'px'});
		   };
		   
		   var setTarget = function(target) {
			   targetFlow = target;
		   };
		   
		   var getTarget = function() {
			   return targetFlow;
		   };
		   
		   that.setPos = setPos;
		   that.setCmds = setCmds;
		   that.setTarget = setTarget;
		   that.getTarget = getTarget;
		   return that;
	    }
		
		// 2012.2.23 流程設定子視窗...
        $('#setNextTarget').hide();
        
		// draw canvas grid
		//_drawGrid($('#flow_canvas div.grid_pane'));
		
		var $flowSets = $('.flow_canvas div.flow_set');
		var $flowSetCurrent = null;
		for(var i=0; i<$flowSets.length; i++) {
			var flowId = $($flowSets[i]).jqmData('flowid');
			if (flowId=='current') {
				$flowSetCurrent = $($flowSets[i]);
				break;
			}
		}
		if ($flowSetCurrent.length) {
			// 2013.4 - 測試用, 清除所有已存在項目
			$flowSetCurrent[0].innerText= '';
			
			//flowBuilder = new FlowBuilder();
			//flowBuilder.initFlowItems($flowSetCurrent);
		}
		
		$('#btn_verifyEnvelope').on('click', function() {
			_verifyEnvelope();
		});
		
		// 初始化簽核意見匯整檢視內容
		var $comments = $('#dlgProcessFlow div.flow-comment-list ul.comments');
		_setupComments($comments);
			
        // 產生Popup Menu
        var popupId = 'cmdFlowChart';
        flowPopup = new _flowPopupMenu($('#flow_canvas'), popupId);
          
		$('#dlgProcessFlow input[name=radio-flowview]').on('change', function() {
			var mode = $('#dlgProcessFlow .ui-btn-right input[name=radio-flowview]:checked').val();
			//theLogger.log('flow_chart display mode=' + mode);
			if (mode=='list') {
				// 2014.1 - 若尚無內容,則取DocToDoList並初始化table
				var $workFlowTable = $('#flowChart #workflowTable');
				var $items = $workFlowTable.find('tbody > tr');
				if ($items.length===0) {
					var docObj = theAOL.docObj;
					var SAMLart = localStorage.Artifact;
					_initWorkFlowTable('#flowChart #workflowTable', docObj, SAMLart);
				}
				
				$('#flowChart .flow-chart-grid').hide();
				$('#flowChart .flow-list').show();
				$('#flowChart .flow-comment-list').hide();
			}
			else if (mode=='chart') {
				$('#flowChart .flow-chart-grid').show();
				$('#flowChart .flow-list').hide();
				$('#flowChart .flow-comment-list').hide();
			}
			else if (mode=='commentlist') {
				$('#flowChart .flow-chart-grid').hide();
				$('#flowChart .flow-list').hide();
				$('#flowChart .flow-comment-list').show();
				
				/*$target = $('#flowChart .movable');
				var left = $target.css('left');
				var top = $target.css('top');
				left = _trimAll(left, 'px');
				top = _trimAll(top, 'px');
				
				var l = parseInt(left);
				var t = parseInt(top);
				l += 20;
				t += 20;
				$target.css('left', l + 'px');
				$target.css('top', t + 'px');*/
			}
		});
		
		$('#workflowTable tbody tr:even').css('background-color','#ffffcc');
        
        // 2012.2.7 - 測試改用jQM scrollview
        //flowScroll = new iScroll('draw_canvas'); // 注意: 必須使用 new, function iScroll 才會回傳 this.
        
        // 2012.2.20 - demo用, 將flow_canvas下的子物件都向下移 shiftY pixels
        $('#dlgProcessFlow .flow_canvas').children().each(function() {
			var shiftY = 0; // 100;
			var $this = $(this);
			/*//if ($this.hasClass('flow_item') || $this.hasClass('flow_group') ||
			//  $this.hasClass('sign_comment') || $this.hasClass('flow_arrow') ||
			//  $this.hasClass('flow_txname') || $this.hasClass('plus_btn') ||
			//  $this.hasClass('minimized_flow_set')) {
			//  var top = parseInt($this.css('top'));
			//  top += shiftY;
			//  $this.css('top', top + 'px');
			//}*/
        });
        
        // 2012.2.20 - handle drag & drop
        $('.flow-chart-grid .draggable').on('dragend', function(dragObj) {
			theLogger.debug('draggable obj, dragend event!');
			_lastDragObj = this;
        });
        
        $('.flow_canvas .droppable').on('dragenter', function(dragOrg){
			var ptLT = $(this).position();
			var w = $(this).outerWidth(false);
			var h = $(this).outerHeight(false);
			
			var $dropObj = $(this);
			
			// 找到指定位置箭頭上的 '+' icon, 顯示之...
			if ($dropObj.hasClass('flow_arrow')) {
				$(this).find('img.plus_sign').css('display', 'block');
			}
			else if ($dropObj.hasClass('flow_item') || $dropObj.hasClass('flow_group')) {
				// 左邊or右邊
				//if (dragOrg.target!=this)
				//{
					$t = $(this);
					if ($t.hasClass('flow_item_unfinished')) {
						var $swapIcon = $t.find('.swap_icon');
						if ($swapIcon.css('display') == 'none') {
							$swapIcon.css('dipslay','block');
						}
					}
				//}
			}
		})
		.on('dragleave', function(dragOrg){
			$(this).find('img.plus_sign').css('display', 'none');
			
			$t = $(this);
			if ($t.hasClass('flow_item_unfinished')) {
				var $swapIcon = $t.find('.swap_icon');
				if ($swapIcon.css('display') == 'block') {
					$swapIcon.css('dipslay','none');
				}
			}
		})
		.on('acceptdrop', function(event, param) {
			param.res = true;
		})
		.on('drop', function(event, dragsrc) {
			// drop process
			theLogger.debug('dragObj dropped!');
			var $t = $(this);
			if ($t.hasClass('flow_arrow')) {
				var $dragelm = $(dragsrc.elm);
				if ($dragelm.hasClass('insert_flow_cmd')) {
					var cmd = $dragelm.jqmData('cmd');
					if (cmd=='insert_flowset') {
						showFlowSetDialog();
					}
					else if (cmd=='insert_flow') {
						showTransTargetDialog(flowPopup.getTarget(), false);
					}
				}
			}
		});
        
		// 前簽流程內容展開/折疊
		$('#btn_historyFlowSet').on('click', function(event) {
			var $flowset = $('.flow_canvas div.flow_set');
			var $flowsetHistory = null, $flowsetCurrent = null;
			var i=0, flowId, left;
			for(i=0; i<$flowset.length; i++) {
				flowId = $($flowset[i]).jqmData('flowid');
				if (flowId=='history') {
					$flowsetHistory = $($flowset[i]);
				}
				else if (flowId=='current') {
					$flowsetCurrent = $($flowset[i]);
				}
			}
			
			if ($flowsetHistory===null || $flowsetCurrent===null)
				return;
			
			// 目前為折疊 or 展開?
			var minimized = false;
			if ($flowsetHistory.hasClass('minimized_flow_set')) {
				minimized = true;
			}
			
			if (minimized) {
				$flowsetHistory.removeClass('minimized_flow_set');
				
				$flowsetHistory.css({top:'20px'});
				
				$flowsetHistory.find('.flow_set_inner').css({top:'25px', left:'0px', width:'660px', height:'240px'});
				$flowsetHistory.find('.mini_show').css({top:'25px', left:'600px', width:'60px', height:'24px'});
				$flowsetCurrent.css({top:'320px',left:'0px'});
				
				// 展開項目
				var items = $flowsetHistory.find('.flow_item');
				for(i=0; i<items.length;i++) {
					var $item = $(items[i]);
					left = 20 + i*160;
					$item.css({top:'44px',left:''+left+'px'});
				}
				
				var arrows = $flowsetHistory.find('.flow_arrow');
				for(i=0; i<arrows.length;i++) {
					var $arrow = $(arrows[i]);
					left = 140 + i*160;
					if (i==(arrows.length-1)) {
						$arrow.css({top:'90px',left:''+left+'px', width:'40px', display:'none'});
					}
					else {
						$arrow.css({top:'90px',left:''+left+'px', width:'40px', display:'block'});
					}
				}
				
				var txnames = $flowsetHistory.find('.flow_txname');
				for(i=0; i<txnames.length;i++) {
					var $txname = $(txnames[i]);
					left = 150 + i*160;
					if (i==(txnames.length-1)) {
						$txname.css({top:'70px',left:''+left+'px', width:'40px', display:'block'});
					}
					else {
						$txname.css({top:'68px',left:''+left+'px', width:'40px', display:'block'});
					}
				}
			}
			else {
				$flowsetHistory.css({top:'88px'});
				$flowsetHistory.addClass('minimized_flow_set');
				$flowsetHistory.find('.mini_show').css({top:'25px',left:'70px',width:'200px',height:'180px'});
				$flowsetCurrent.css('top', '160px');
			}
		});
		
        // 流程圖click選單...
        $('#flow_canvas').on('click', _flowCanvasClicked);
        
        $('.flow_item_info .clock_btn')
          .on('mouseover', function(){
			var $t = $(this);
			$t.addClass('lighting');
			if (!$t.closest('.flow_set').hasClass('minimized_flow_set'))
			{
				var $signElapse = $t.closest('.flow_item_content').children('.sign_elapse');
				var $signComment = $t.closest('.flow_item_content').children('.sign_comment');
				if ($signElapse.length) {
				  $signElapse.show();
				}
				if ($signComment.length) {
				  $signComment.hide();
				}
			}
          })
          .on('mouseout', function() {
			var $t = $(this);
			$t.removeClass('lighting');
			if (!$t.closest('.flow_set').hasClass('minimized_flow_set')) {
				$t.closest('.flow_item_content').children('.sign_elapse').hide();
				$t.closest('.flow_item_content').children('.sign_comment').show();
			}
          });
        
        $('.flow_item_info .comment_btn')
          .on('mouseover', function(){
			$(this).addClass('lighting');
            var $signComment = $(this).closest('.flow_item_content').children('.sign_comment');
            if ($signComment.length) {
              $signComment.show();
            }
          })
          .on('mouseout', function() {
			$(this).removeClass('lighting');
			if($(this).closest('.flow_set').hasClass('minimized_flow_set')) {
				$(this).closest('.flow_item_content').children('.sign_comment').hide();
			}
          });
		
		// 新增/編輯傳送對象
		$('#dlgTransTarget .flow_set').hide();
        $('#dlgTransTarget input[name=insertFlow-type]').on('change', function() {
            var mode = $('#dlgTransTarget input[name=insertFlow-type]:checked').val();
            //theLogger.log('flow_chart display mode=' + mode);
            if (mode=='set') {
               $('#dlgTransTarget .trans_target').hide();
               $('#dlgTransTarget .flow_set').show();
            }
            else {
               $('#dlgTransTarget .trans_target').show();
               $('#dlgTransTarget .flow_set').hide();
            }
        });
		
		// 2012.2.14 - 文稿會辦單位同步設定
		$('#btn_DraftSync').on('click', function(){
			showDraftCoworkSyncDialog();
		});
		
		$('#dlgDraftCoworkSync table .ui-checkbox .ui-icon').on('click', function(){
			var $t = $(this).parent();
			var $icon = $(this);
			if ($t.hasClass('ui-checkbox-on')) {
				$t.removeClass('ui-checkbox-on');
				$icon.removeClass('ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
			}
			else {
				$t.addClass('ui-checkbox-on');
				$icon.removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
			}
		});
		
		// 2012.6.19 - 測試用UI
		$('#btn_ProcSettingCancel').on('click', function(){
			//showDraftCoworkSyncDialog();
		});
		
		
		$('#btn_ProcSettingOK').on('click', function(){
			var $comments = $('#dlgProcessFlow div.flow-comment-list ul.comments');
			var $currentComment = $comments.find('li textarea');
			if ($currentComment.length) {
				var newCommentStr = $currentComment[0].value;
				theAOL.signComment(newCommentStr);
			}
		});
		
		
		// 2012.9 - 簽核意見檢視/輸入
		$('.flow-comment-list .comments .editable').on('click', function(){
			$t = $(this);
			var $saved = $t.find('.saved_text');
			var $editor = $t.find('.comment_edit');

			if ($saved.css('display')!='none') {
				// 2019.11.18 - 1080339 Eric, jQuery 3.0 upgarde [.attr('value') -> .val()]
				//$editor.attr('value', $saved.text());
				$editor.val($saved.text());
				$saved.css('display','none');
				$editor.css('display','block');
				$editor.trigger('focus');
			}
		});
		
		$('.flow-comment-list .comments li div.editable .comment_edit').on('change blur', function(event, ui){
			var $t = $(this);
			if ($t.css('display')=='block') {
				var $parent = $t.parent();
				var $saved = $parent.find('.saved_text');
				
				var newText = $t.val();
				$t.css('display', 'none');
				$saved.text(newText);
				$saved.css('display','inline');
			}
		});
    });
    
    // 回復各控件顯示狀態
	
    //$(document).on('pagecontainershow', '#dlgProcessFlow', function(event) {
	$(document).on('pageshow', '#dlgProcessFlow', function(event) {
		
        var $page = $( this );
		
		//alert('#dlgProcessFlow OnPageShow...');
		
		// 更新目前流程的 signComment
		var $comments = $('#dlgProcessFlow div.flow-comment-list ul.comments');
		
		/* 2015.10 - 有本流程項目才指定 */
		var $thisSiteComment = $comments.find('li textarea');
		if ($thisSiteComment.length)
			$thisSiteComment.value = theAOL.signComment();
		
		// 2013.5 - 按左上角關閉鈕會回到SSO而非AOL問題
		$page.find('div.ui-header > a').attr('href', '#aol');
		
		// flow_view mode
		$('#dlgProcessFlow input[name=radio-flowview]:checked').next('label').addClass('ui-btn-active');
		$('#flowChart input[name=flowchart_history_mode]:checked').next('label').addClass('ui-btn-active');
		
        // 流程編輯選單
        _setupFlowEditCmds(flowPopup);
        
        // DEV: 測PopupMenu顯示位置
        //flowPopup.setPos({x:200,y:200}, true);
		
		// 2012.12 - 簽核意見項目取消ul-li-static class
		var len = $('ul.comments li').length;
		$('ul.comments li').removeClass('ui-li-static');
		
		// 更新簽核意見內容!
        
		// 新增/修改傳送對像
		$('#dlgTransTarget input[name=insertFlow-type]:checked').next('label').addClass('ui-btn-active');
        $('#dlgTransTarget input[name=choice-flowset]:checked').next('label').addClass('ui-btn-active');
		
		// 2016.6 - 若為草稿, disble 流程明細
		var docObj = theAOL.docObj;
		if (!!docObj) {
			var isDraft = theSSO.MP.todolist.builder.isDraftMsg(docObj);
			if (isDraft) {
				$('#dlgProcessFlow input[name=radio-flowview]').checkboxradio('disable');
			}
		}
    });
//});