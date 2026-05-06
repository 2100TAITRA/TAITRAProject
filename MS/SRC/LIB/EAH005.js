/***************************************************************************************************************
* Date		SA		PRG		MGR_NO  DESC 
* 
***************************************************************************************************************/
document.addEventListener( "DOMContentLoaded",function(){
	var para = location.search.split('&')
	if(para.length && para.length > 0){
		let dept = para.find(function(item){return item.indexOf('DEPT_NO') > -1});
		if(dept && dept.indexOf('=') > 0)document.all.H_txDeptNo.value = dept.split('=')[1];
		let mode = para.find(function(item){return item.indexOf('MODE') > -1});
		if(mode && mode.indexOf('=') > 0)document.all.H_txMode.value = mode.split('=')[1];
		let cls = para.find(function(item){return item.indexOf('FILE_CLS') > -1});
		if(cls && cls.indexOf('=') > 0)document.all.H_txFileCls.value = cls.split('=')[1];
		let nFrom = para.find(function(item){return item.indexOf('nFrom') > -1});
		if(nFrom && nFrom.indexOf('=') > 0)document.all.H_txNFROM.value = nFrom.split('=')[1];
	}
	ClientOnLoad();
})


var SPLIT=":";
var bShowTreeView=true;

//紀錄Call WebService物件的id
var wsDuplicateID;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	var setting = {
		data: {
			simpleData: {
				enable: true
			}
		},
		view: {
			/*addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,*/
			//addDiyDom: addDiyDom
		},
		callback: {

			//beforeClick: ProgBeforeClick,
			onClick: RtnValue
		}
	};
	
	//1100914	Leslie	退單處理子機關登入時，應使用正確的機關代碼，並補上案次號查詢功能
	var treeCacheUri = "/WEDEP/GetTreeClsCacheData.ashx?OrgNo=";
	if($('#H_txMode').val() == '2')
		treeCacheUri = '/WEDEP/GetTreeCaseCacheData.ashx?OrgNo=';
	var treeObj;
	//caches.match("/WEDEP/GetTreeClsCacheData.ashx?OrgNo=301000000A").then(function(r){
	caches.match(treeCacheUri+window.parent.theUserInfo.OrgID).then(function(r){
		r.json().then(function(zNodes){
			$.fn.zTree.init($("#Classtree"), setting, zNodes);
		
			$('#txSearchData').bind('change keyup', txFilterKeyup)
								.on('compositionstart', function(){
									$(this).prop('comStart', true);
									
								})
								.on('compositionend', function(){
									$(this).prop('comStart', false);
									$(this).trigger("change");
								});
			$('#txSearchData').val(document.all.H_txFileCls.value).trigger('change');
		})
	})

	//SetHideValue();
}
//1080122   Cloud    1080049 弱掃修改
function htmldecode(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    return div.innerText || div.textContent;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/


function ClsRtnValue(argVerNo,argClsNo,argClsName,argClsKey,argKeepYear)
{
	if(document.all["H_txNFROM"].value=="Custom")
	{
		var rtnobj = 
		{
			"argClsNo":argClsNo,
			"argKeepYear":argKeepYear,
		};
		parent.$("#extdlg_close_btn").trigger("click",rtnobj);
	}
	else
	{   
		opener.document.all.lbReturnValue.length = 7;
		opener.document.all.lbReturnValue.options[0].value = "";
		opener.document.all.lbReturnValue.options[1].value  = argClsNo;
		opener.document.all.lbReturnValue.options[2].value  = "";
		opener.document.all.lbReturnValue.options[3].value = "";
		opener.document.all.lbReturnValue.options[4].value  = argClsKey;
		opener.document.all.lbReturnValue.options[5].value  = argVerNo;
		opener.document.all.lbReturnValue.options[6].value  = argClsName;
		opener.window.CallBack("EAC005");
		close();    
	}
}

function CaseRtnValue(argVerNo,argClsKey,argClsName,argClsNo,argCaseNo,argCaseYear,argCaseKey,argKeepYear)
{
	if(document.all["H_txNFROM"].value=="Custom")
	{
		var rtnobj = 
		{
			"argClsNo":argClsNo,
			"argKeepYear":argKeepYear,
			"argCaseNo":argCaseNo,
			"argFileYear":argCaseYear,
		};
		parent.$("#extdlg_close_btn").trigger("click",rtnobj);
	}
	else
	{ 
	opener.document.all.lbReturnValue.length = 7;
	opener.document.all.lbReturnValue.options[0].value = argCaseYear;
	opener.document.all.lbReturnValue.options[1].value  = argClsNo;
	opener.document.all.lbReturnValue.options[2].value  = argCaseNo;
	opener.document.all.lbReturnValue.options[3].value = argCaseKey;
	opener.document.all.lbReturnValue.options[4].value  = argClsKey;
	opener.document.all.lbReturnValue.options[5].value  = argVerNo;
	opener.document.all.lbReturnValue.options[6].value  = argClsName;
	opener.window.CallBack("EAC005");
	close();    
	}
}

function IsHideTreeView()
{
	if (document.all["H_SelectedValue"].value != GetValue())//若查詢條件有變動-->TreeView隱藏起來,待按下postback才打開(ClientOnLoad)
	{
		bShowTreeView = false;//查詢條件變更
		document.all.Data.style.display = "none";
//		alert("IsHideTreeView()");
	}
}

function GetValue()
{
	
	return document.all["txVerNo"].value + SPLIT 
		+ document.all["txYear"].value + SPLIT 
		+ document.all["txClsNo"].value + SPLIT 
		+ document.all["txCaseNo"].value + SPLIT 
		+ document.all["txClsCaseName"].value;
}

function SetHideValue()
{
	document.all["H_SelectedValue"].value = GetValue();
}

//1060504	CLOUD	Cloud	1050784	修改分類號支援多筆使用單位設定-s
//1061002 Cloud 1060888 效能調教
var searchTimeout;
var slastKey="";
var bFirstSearch = true;
function txFilterKeyup(event)
{
	//中文輸入未完成時，不做查詢
	if ($(this).prop('comStart'))
	{
		return;
	}

		//1061002 Cloud 1060888 效能調教-加上TimeOut行為，以避免連續輸入時Lag
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(function()
	{
			//1061016 Cloud 搜尋機制調整，減少使用JAUARY語法
			//if ($('#txSearchData').val().length >= 1) 
			if (document.all.txSearchData.value.length >= 1){
				if (!!slastKey && slastKey.length) {
					slastKey = slastKey.toLowerCase();
				}
				else {
					slastKey = '';
				}
				//1061016 Cloud 搜尋機制調整，減少使用JAUARY語法
				//var sFilter = $('#txSearchData')[0].value;
				var sFilter = document.all.txSearchData.value;

				if (!sFilter || (typeof sFilter != 'string')) {
					sFilter = '';
				}
				else {
					sFilter = sFilter.toLowerCase();
				}
				if(bFirstSearch)
				{
					//1061016 Cloud 搜尋機制調整，減少使用JAUARY語法
					//slastKey = $('#txSearchData')[0].value;//
					slastKey = document.all.txSearchData.value;//
				}

				if (sFilter==slastKey && !bFirstSearch) {
					return;
				}
				else {
					if(bFirstSearch)
					{
						var zTree = $.fn.zTree.getZTreeObj("Classtree");
						var nodes = zTree.getNodes();
						ProgShowAll();
		ProgFilter(nodes[0]);
						bFirstSearch = false;
		zTree.expandAll(true);
	}
					else
					{
						var $tbObj;
						//if(sFilter == sFilter.substring(0,slastKey.length-1))//以前次紀錄字串長度，切割完全相同時則以已展開的樹狀進行搜尋
						//if(sFilter.indexOf(slastKey) != -1)
						if(sFilter.indexOf(slastKey) != -1 && sFilter.length>slastKey.length)
						{
							$tbObj = $('#Classtree li:visible')
							$tbObj.css('display', 'none');
							for(var idxTB = 0,idxMax = $tbObj.length;idxTB < idxMax;idxTB++){
								if($tbObj.eq(idxTB)[0].innerText.toLowerCase().indexOf(sFilter)!=-1)
									$tbObj.eq(idxTB).css('display', '');
							}
						}
						else
	{
							//有輸入但完全不同時，從根節點往下找
							var zTree = $.fn.zTree.getZTreeObj("Classtree");
							var nodes = zTree.getNodes();
							slastKey = $('#txSearchData')[0].value;
							ProgShowAll();
							ProgFilter(nodes[0]);			
							zTree.expandAll(true);
						}						
					}
				}
			}
			else if ($('#txSearchData').val().length == 0) {
		ProgShowAll();

		var zTree = $.fn.zTree.getZTreeObj("Classtree");

		var node = zTree.getNodeByParam("id", "-1", null);

		zTree.expandNode(node, false, true, false);
		zTree.expandNode(node, true, false, false);
	}
		},500);
}
function ProgFilter(node)
{
	var result = false;
		if (node.name.toUpperCase().indexOf($('#txSearchData').val().toUpperCase()) > -1) {
		result = true;
	}

        if (!result && node.children) {
            for (var i = 0; i < node.children.length; i++) {
			var isTrue = ProgFilter(node.children[i]);

			if (isTrue)
				result = true;
		}
	}

	if (!result)
		$.fn.zTree.getZTreeObj("Classtree").hideNode(node);

	return result;
}
function ProgShowAll()
{
	var zTree = $.fn.zTree.getZTreeObj("Classtree");

	nodes = zTree.getNodesByParam("isHidden", true);
	zTree.showNodes(nodes);
}
function RtnValue(event, treeId, treeNode)
{
	var Ingo = treeNode.INFO.split('|');	
	if(document.all["H_txMode"].value=="2" && treeNode.TYPE == "CLS")
	{
		alert('非點選案次號，請點選案次號資料。');
		return;
	}
    if ((document.all.H_txDeptNo.value != "" && (treeNode.IS_LOWEST == "1"  || treeNode.IS_LOWEST =="" )) || document.all.H_txDeptNo.value == "")//承辦人僅能回傳底層 //檔管人員都可回傳
	{
	
		if (treeNode.TYPE == "CLS")//從CASE_YEAR判斷是否為案次號
			ClsRtnValue(Ingo[0], Ingo[1], Ingo[2], Ingo[3], Ingo[5]);
		else		
			CaseRtnValue(Ingo[0], Ingo[8], Ingo[4], Ingo[7], Ingo[1], Ingo[6], Ingo[3], Ingo[5])
	}
	
}

function jf_PADL(argString, argLength, argFillStr)
{
	var pi_length;
	pi_length = argString.length; 
	if(pi_length < argLength )
	{
		return jf_PADL(argFillStr+argString, argLength, argFillStr);
	}
	return argString;
}	
