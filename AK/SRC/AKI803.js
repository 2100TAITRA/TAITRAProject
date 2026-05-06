/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050705	Kevin	Kevin_C	1050087		升級二代公文系統
 * 1051019 Leslie  Joe		1050087		二代修正配合行動平台
 * 1080416	Leslie	Leslie	--			修正升二代沒處理的BUG
 * 1110815  Leslie  Cloud   1110517     修改調案檢核訊息可自訂
 * 1141119	Zen		Andy	1131229		組織樹重構，改以JSON字串紀錄
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050705	Kevin_C	1050087			升級二代公文系統
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050705	Kevin_C	1050087			升級二代公文系統 -S
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();


//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		/*
		case "":
			break;
		*/
	}	
}

//1050705	Kevin_C	1050087			升級二代公文系統
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050705	Kevin_C	1050087			升級二代公文系統
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;
	
	switch (xObjectName)
	{
		case "btImage"://線上調檔 
			Page_BlockSubmit = true;
			OpenImage();
			//1050705	Kevin_C	1050087			升級二代公文系統
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btReqDoc"://申請調檔
			Page_BlockSubmit = true;
			BorrowProc();
			//1050705	Kevin_C	1050087			升級二代公文系統
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CheckBoxAllNodes(oCheckBox)
{
			var theForm = oCheckBox.form;
			for (var i = 0; i < theForm.length; i++)
			{
				var oInput = theForm.elements[i];
				if (oInput.name.indexOf("tv_chk_node_")!=-1)
				{
				if (oCheckBox.checked==true)
				{
				oInput.checked=true;
				}
				if (oCheckBox.checked==false)
				{
				oInput.checked=false;
				}
				}
			}
}


function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	//1091125	Leslie[1080943]	取消多餘的呼叫行為
	// jf_CallWS("lib/AK_LIB.asmx","bubble",false,null);
	// jf_CallWS("AKI803WS.asmx","bubble",false,null);	
	//1141118	Andy	1131229	調整組織樹寫法改以JSON組合
	var setting = {
		check: {
			enable: true,      // ← 啟用 checkbox
			chkStyle: "checkbox"
		},
		data: {
			simpleData: {
				enable: true
			},
			key: {
				title: "title"
			}
		},
		view: {
			addDiyDom: addDiyDom
		},
		callback: {
			beforeClick: function (treeId, treeNode) {
				return false;
			},
			onAsyncSuccess: function (event, treeId, treeNode, msg) {
				var zTree = $.fn.zTree.getZTreeObj(treeId);
				var nodes = treeNode ? treeNode.children : zTree.getNodes();

				for (var i = 0; i < nodes.length; i++) {
					addDiyDom(treeId, nodes[i]);
				}
			}
		}
	};

	if (document.all['H_JsonData000'])
		document.all['H_JsonData'].value = document.all['H_JsonData000'].value;

	if (document.all.H_JsonData.value != "" && document.all['H_JsonData000']) {

		document.all.H_JsonData.value = document.all.H_JsonData.value.replace(/&quot;/g, "\"");
		var zNodes = JSON.parse('[' + document.all.H_JsonData.value + ']');

		var nJsonDataCnt = document.all['H_JsonDataCnt'].value;
		for (let i = 1; i <= nJsonDataCnt; i++) {
			let idx = jf_PADL(i + '', 3, '0');

			document.all['H_JsonData' + idx].value = document.all['H_JsonData' + idx].value.replace(/&quot;/g, "\"");
			zNodes = zNodes.concat(JSON.parse('[' + document.all['H_JsonData' + idx].value + ']'));
		}

		var zTree = $.fn.zTree.init($("#Classtree"), setting, zNodes);
		zTree.expandAll(true);
		zTree.expandAll(false);
	}
}

function OnWSResult(argResult)
{
   if(jf_IsWebServiceSuccess(argResult))
   {
		if(argResult.value.RtnStr.indexOf(".UNV")!=-1)
			open(argResult.value.RtnStr);
		else
			alert(argResult.value.RtnStr);
   }   
}

//---------------------Jerry Add CheckBox Control
		
		function HighlightNode(nNodeID,nKey,nObj)
		{
			//jf_SetTreeViewMode(nNodeID,2);
			//parent.viewer.WebForm1.all.guid.value=arg2;
			//parent.viewer.WebForm1.submit();
			alert(nNodeID);
			alert(nKey);
			var obj =document.getElementById("tv_" + nNodeID);
			alert(obj.id);
		}
		
		function jf_SetTreeViewMode(nNodeID,argMode)
		{
			if (argMode==1)
				document.getElementById("tv_" + nNodeID).style.backgroundColor='#ffffff';
			else
				document.getElementById("tv_" + nNodeID).style.backgroundColor='#ccccff';
		}
		
		
		
		
		function CheckBox(oCheckBox,oLevel,oVol,oSeq_S,oSeq_E)
		{
			var oParentCheckBox = jf_GetParentCheckBox(oCheckBox);
			
			if(!oCheckBox.checked)
			{
				jf_UnCheckAllParent(oCheckBox);
				//1080416	Leslie	改用jQuery一次取消勾選下層所有CheckBox
				//jf_UnCheckAllChildren(oCheckBox);
				//1141120	Andy 1131229	組織樹重構，改以JSON字串紀錄-改成zTree的架構
				//$(oCheckBox).find(' ~ div:first input').prop('checked',false);
				$(oCheckBox).find(' ~ ul:first input').prop('checked', false);
			}
			else
			{
				//1080416	Leslie	改用jQuery一次勾選下層所有CheckBox
				//jf_CheckAllChildren(oCheckBox);
				//1141120	Andy 1131229	組織樹重構，改以JSON字串紀錄-改成zTree的架構
				//$(oCheckBox).find(' ~ div:first input').prop('checked',true);
				$(oCheckBox).find(' ~ ul:first input').prop('checked', true);
			}
		}

// JScript source code

function ExpCol(node, imgpath, imgPlusMinus, imgCollapsed, imgExpanded, nodekey)
{
	if (node != null)
	{
		nextNode = node.nextSibling;
		bFinded = false;
		
		while (nextNode != null && bFinded == false)
		{					
			if (nextNode.tagName == "DIV")
				bFinded = true;	
			else			
				nextNode = nextNode.nextSibling;	
		}
		
		if (nextNode != null && bFinded)
		{						
			if (nextNode.style.display == 'none')
			{
				nextNode.style.display = '';
				ChangeImages(node, imgpath, imgExpanded, 'tv_minus', imgPlusMinus);
			}
			else
			{
				nextNode.style.display = 'none';
				ChangeImages(node, imgpath, imgCollapsed, 'tv_plus', imgPlusMinus);
			}
		}				
	}
}

function ChangeImages(node, imgpath, imgMain, imgPlusMinusPrefix, imgPlusMinus)
{
	bSetMainImage = (imgMain != ""); //don't set main image in text modes
	if (node.children.length > 0)
	{
		if (node.children.item(0).tagName == "IMG")
		{
			if (imgPlusMinus != "No") //"No" indicates that it is not needed Plus or Minus image
				node.children.item(0).src = imgpath + imgPlusMinusPrefix + imgPlusMinus + ".gif";
			else //if is not needed Plus/Minus image
			{
				if (bSetMainImage) //if node has image that must be changed
				{
					node.children.item(0).src = imgpath + imgMain;
					bSetMainImage = false;
				}
			}									
		}			
	}
	
	// process situation <A..><Checkbox><needed image></A>
	if (bSetMainImage && node.children.length > 1)
	{
		if (node.children.item(0).tagName == "INPUT" && node.children.item(1).tagName == "IMG")
		{
			node.children.item(1).src = imgpath + imgMain;
			bSetMainImage = false;
		}
	}
	
	//process next tag
	if (bSetMainImage)
	{
		nextNode = node.nextSibling;
		if (nextNode.tagName == "INPUT") //skip checkbox
			nextNode = nextNode.nextSibling;

		if (nextNode.tagName == "IMG") //next tag is needed image
			nextNode.src = imgpath + imgMain;
		else //next tag is <A...>
			if (nextNode.children.length > 0)
			{
				pos = 0;
				if (nextNode.children.item(0).tagName == "INPUT" && nextNode.children.length > 1)	
					pos = 1; // <A..> <Checkbox> <needed image>

				if (nextNode.children.item(pos).tagName == "IMG")							
					nextNode.children.item(pos).src = imgpath + imgMain;
			}
	}		
}

function GetCheckedItems()
{
	var IsCaseChecked = false;
	var IsVolChecked = false;
	var currentVol = "";
	var checkedItem = new Array();
	var itemCount = 0;
	var objHTML = "";
	var objValue = "";
	var LeftIndex = 0;
	var RightIndex = 0;
	var arrValue;
	for(i=0;i<document.forms[0].elements.length;i++)
	{
		if(document.forms[0].elements[i].type!='checkbox')
			continue;
		if(!document.forms[0].elements[i].checked)
			continue;
		objHTML = document.forms[0].elements[i].outerHTML;
		LeftIndex = objHTML.indexOf("(");
		RightIndex = objHTML.lastIndexOf(")");
		objValue = objHTML.substring(LeftIndex+1,RightIndex-1);
		while(objValue.indexOf("'")!=-1)
		{
			objValue = objValue.replace("'","");
		}
		//alert(objValue);
		arrValue = objValue.split(",");
		if(arrValue[1] == "3")
			continue;
		if(IsVolChecked)
		{
			if(arrValue[2].indexOf(currentVol)!=-1)
				continue;
			else
			{
				currentVol = "";
				IsVolChecked = false;
			}
		}
		switch(arrValue[1])
		{
			case "1":
				checkedItem[itemCount] = arrValue[2];
				IsCaseChecked = true;
				break;
			case "2":
				checkedItem[itemCount] = arrValue[2];
				currentVol = arrValue[2];
				IsVolChecked = true;
				itemCount++;
				break;
			case "4":
				checkedItem[itemCount] = arrValue[2];
				itemCount++;
				break;
		}
		if(IsCaseChecked)
			break;
	}
	return checkedItem;
}

function BorrowProc()
{
	var checkedItem = GetCheckedItems();
	var pFileNo = "";
	if(checkedItem.length == 0)
	{
		alert("請至少勾選一筆公文");
		return;
	}
	
    //1080416	Leslie	補上古老的AKT800筆數限制
	//* 1110815    Cloud   [1110517]     修改調案檢核訊息可自訂
    //var AKT800DgSize = parseInt($('#H_AKT800DgSize').val());
	var AKT800DgSize = parseInt($('#H_AKT800DgSize').val().split('|')[0]);
	var AKT800msg = $('#H_AKT800DgSize').val().split('|')[1];
	if(isNaN(AKT800DgSize) || AKT800DgSize == 0)
		AKT800DgSize = 5;	//預設最大五筆
	if (checkedItem.length > AKT800DgSize) {
	    //* 1110815    Cloud   [1110517]     修改調案檢核訊息可自訂
	    if (AKT800msg != "")
	        alert(AKT800msg);
            else
		alert('每張調案單最多只能調閱 '+AKT800DgSize+' 筆');
		return true;
	}
	
	for(i=0;i< checkedItem.length;i++)
	{
		if(i==0)
			pFileNo = checkedItem[i];
		else
			pFileNo += " " + checkedItem[i];
	}
	
	var strURL = "AKT800.aspx?FILE_NO="+pFileNo;
	
	//1091110	Leslie	配合信保客製化功能，改開客製化程式
	if($('#H_OrgNickName').val() == "SMEG")
		strURL = "AKT800_SMEG.aspx?FILE_NO="+pFileNo;
	//1050705	Kevin_C	1050087			升級二代公文系統，調案申請子視窗大小調整成與AKI802開啟時一致
	//jf_OpenChildWin(strURL,"AKT800", 800, 530);
	jf_OpenChildWin(strURL,"AKT800", window.screen.availHeight-54,window.screen.availWidth-8);
}

var callID_OpenImage = null;
function OpenImage()
{
	var checkedItem = GetCheckedItems();
	if(checkedItem.length == 0)
	{
		alert("請至少勾選一筆公文");
		return;
	}
	var argWSParam = new Array(1);
	argWSParam[0] = checkedItem;
	callObj = jf_CallWS("AKI803WS.asmx", "OpenImage", false, argWSParam);
	callID_OpenImage = callObj.id;
	OnWSResult(callObj);
}
//1141120	Andy 1131229	組織樹重構，改以JSON字串紀錄-塞入CheckBox
function addDiyDom(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	var switchObj = $("#" + treeNode.tId + "_switch");

	var chk = $("<input type='checkbox' />")
		.attr("id", "tv_chk_" + treeNode.id)
		.attr("onclick", "javascript:CheckBox(this," + treeNode.level + ",'" + treeNode.rtnValue + "');");

    // 在展開符號 *前面* 插入 checkbox
	chk.insertBefore(switchObj);
}
//1141120	Andy 1131229	組織樹重構，改以JSON字串紀錄-找母節點
function jf_GetParentCheckBox(oCheckBox) {
	var li = $(oCheckBox).closest("li");
	var parentLi = li.parent().closest("li");
	if (parentLi.length === 0) return null;
	return parentLi.find("input[type=checkbox]").get(0);
}