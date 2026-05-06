/*
DATE	SA		PRG		MGR_NO	DESC
0970324 Stella	Leo		0970335	回傳的值增加SYSID
0981204 Stella	David	0980336	支援IE8，修正JS語法嚴謹度
1050408 Leslie  Cloud   1050087 升級二代
1050727	Cloud	Cloud	1050087	修改公文製作模組回傳
1050803	Cloud	David	1050087	修改ODC010回傳處理
1050930	Cloud	Cloud	1050087	二代系統子視窗無法自行關閉，調整為發生異常時跳出提示訊息，並自行關閉
1051028 Cloud   Cloud	1050087 配合pad修改
1080815 David   Joe		1080646 修改回傳至會簽設定頁面後，不進行子視窗Close行為
1141202	Zen		Andy	1131229	組織樹重構，改以JSON字串紀錄
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050408 Cloud   1050087 升級二代
	//if (document.all["ValidationSummary1"].innerText != "")
    //alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

function setDetail()
{
	//0981204 David 0980336 支援IE8，修正JS語法嚴謹度
	//document.all.detailDiv.style.height = screen.availheight - 200;
	//document.all.Fieldset1.style.height = screen.availheight - 200;
	//document.all.trDetail.style.height = screen.availheight - 200;
	document.all.detailDiv.style.height = screen.availHeight - 200;
	document.all.Fieldset1.style.height = screen.availHeight - 200;
	document.all.trDetail.style.height = screen.availHeight - 200;
}
//1051028 Cloud   Cloud	1050087 配合pad修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051028 Cloud   Cloud	1050087 配合pad修改
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	/*
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	*/
	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit=true;
			ReturnValue2();
		break;
		case "btExit":
			
			Page_BlockSubmit=true;
			//1050727	Cloud	1050087	配合受文者編輯子視窗開啟方式不同，修改關閉方式
			var Artifact = fnGetArtifact();
			if (Artifact != "")//有Artifact為受文者編輯子視窗開啟
			{
				fnSetMsg("","");
			}
			else
			{
				window.close();
			}
		break;
		case "btSearch":
			if (jf_Trim(document.all.txOrgNo.value) != "" || jf_Trim(document.all.txOrgName.value) != "" )
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
				//1051028	Cloud	需補上__doPostBack
				__doPostBack("btSearch", "");
			}
			else
			{
				//if (window.confirm("未設定任何查詢條件，將帶回100筆機關。\n查詢將會花費一段時間，您確定要執行？"))
				//{
					IsServerHandling = true;
					jf_ShowWaitState();
					Page_BlockSubmit = false;
					//1051028	Cloud	需補上__doPostBack
					__doPostBack("btSearch", "");
				//}
				//else
				//	Page_BlockSubmit=true;
			}
		break;
		case "btOrgMgmt":
			Page_BlockSubmit=false;
		break;
		case "btGrpMgmt":
			Page_BlockSubmit=false;
		break;
	}	
}

function jf_ToolBarHandle()
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
	
	xObjectName= window.event.srcNode.getAttribute("ID");
	
	switch (xObjectName)
	{
		case "btSearch":
			jf_ToolBarSubmit();
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			jf_ToolBarSubmit();
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit();
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	ShowMsg();
	//1050930	Cloud	Cloud	1050087	二代系統子視窗無法自行關閉，調整為發生異常時跳出提示訊息，並自行關閉
	if (document.all["ErrMsg"])
	{
		alert(document.all["ErrMsg"].value);
		var $dlg = parent.$("#WEM010C1_DIV");//找到母視窗關閉鈕位置
		var $btn = $dlg.find("a#searchDlg_close_btn");
		parent.$("#WEM010C1_DIV").find("input#lbRtnValue").val(argValue);//將回傳值設定
		parent.$("#WEM010C1_DIV").find("input#RtnIsExpand").val(argIsExpand);//將回傳值設定
		$btn.click();
	}
	//1141202	Andy	1131229	調整組織樹寫法改以JSON組合
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
				if (treeNode.id == "0" || treeNode.pId == "0")
					return false;
			},
			onClick: RtnValue
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
	}
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}
//使用者點選上方儲存鍵，回傳勾選資訊
function ReturnValue2()
{
	var Artifact = fnGetArtifact();
	if (document.all.dg1 && document.all.dg1.rows.length == 0) {
		if (window.confirm("未選擇任何機關、群組,是否要返回受文者設定視窗？")) {
			window.close();
		}
		return;
	}
	var tb = document.all.dg1;
	var tblen = tb.rows.length;
	var nRtnCnt =0;
	
	var nRtnCnt =0;
	var rtnObj = new Object();
    rtnObj.IsGrp = false;
    rtnObj.IsExpand = "";
	var strDeptInfo = "";
	var strSplit = "|";
	var GrpKey = "";
	
	for(var i = 0 ; i < tblen; i++)
	{
		//1150130	Andy	1131229	調整組織樹寫法改以JSON組合
		//var checkboxNode = document.getElementById("tv_chk_node_"+(i+1));
		var checkboxNode = document.getElementById("tv_chk_" + tb.rows[i].cells[3].textContent);
		if (checkboxNode == null)
			continue;
		if (checkboxNode.checked)
		{
			var Row = tb.rows[i];
			//1050418 Cloud	[1050087]	升級二代
			//if (jf_Trim(Row.cells[13].innerText) == '4')//群組
			if (jf_Trim(Row.cells[13].textContent) == '4')//群組
			{
				rtnObj.IsGrp = true;
				//1050418 Cloud	[1050087]	升級二代
				//var DeptInfo = jf_Trim(Row.cells[3].innerText)+'^'+jf_Trim(Row.cells[4].innerText)+'^'+jf_Trim(Row.cells[12].innerText);
				//GrpKey = jf_Trim(Row.cells[1].innerText);
				//1050727 Cloud	[1050087]	增加傳入是否為群組
				//受文者編輯子視窗固定讀取最後一個資訊判斷為是否為群組有增加回傳值時請考量不要放最後一個
				//var DeptInfo = jf_Trim(Row.cells[3].textContent)+'^'+jf_Trim(Row.cells[4].textContent)+'^'+jf_Trim(Row.cells[12].textContent);
				var DeptInfo = jf_Trim(Row.cells[3].textContent)+'^'+jf_Trim(Row.cells[4].textContent)+'^'+jf_Trim(Row.cells[12].textContent)+'^Y';
				GrpKey = jf_Trim(Row.cells[1].textContent);
				if (Artifact != "")
				{
					strDeptInfo += DeptInfo+strSplit;
				}
				else
				{
					opener.document.all.lbReturnValue.length++;
					opener.document.all.lbReturnValue.options[nRtnCnt].text = "";
					opener.document.all.lbReturnValue.options[nRtnCnt].value =  DeptInfo;
				}
				nRtnCnt++;
			}
			else //為機關node
			{
				//1050418 Cloud	[1050087]	升級二代
				//1050418 Cloud	[1050087]	升級二代
				//if (GrpKey != "" && GrpKey == jf_Trim(Row.cells[0].innerText)) {GrpKey = jf_Trim(Row.cells[0].innerText); continue;};
				if (GrpKey != "" && GrpKey == jf_Trim(Row.cells[0].innerText)) {GrpKey = jf_Trim(Row.cells[0].textContent); continue;};
				//3 CusID ,4 OrgName ,5 STDID, 6 CONTACTPSN , 7 FEPSTATUS ,8 POSTNO ,9 ADDRESS ,10 EMAIL ,11FEPID ,12 SYSID 13 ORGTYPE, 14 ownerTYPE ,15 SOURCE_ORGNO, 16 OWNER 17 ISSUE_TYPE 18 OM.CABINET_NO 19 GATE_WAY
				//1050418 Cloud	[1050087]	升級二代
				//var DeptInfo = jf_Trim(Row.cells[3].innerText)+'^'+jf_Trim(Row.cells[4].innerText)+'^'+
				/*jf_Trim(Row.cells[5].innerText.substring(0,10))+'^'+jf_Trim(Row.cells[5].innerText.substring(10))+'^'+
				jf_Trim(Row.cells[6].innerText)+'^'+jf_Trim(Row.cells[7].innerText)+'^'+
				jf_Trim(Row.cells[8].innerText)+'^'+jf_Trim(Row.cells[9].innerText)+'^'+
				jf_Trim(Row.cells[10].innerText)+'^'+jf_Trim(Row.cells[11].innerText)+'^'+Row.cells[16].innerText+'^'+jf_Trim(Row.cells[17].innerText)+'^'+jf_Trim(Row.cells[18].innerText)+'^'+jf_Trim(Row.cells[19].innerText)+'^'+jf_Trim(Row.cells[12].innerText);*/
				//1050727 Cloud	[1050087]	增加傳入是否為群組
				//受文者編輯子視窗固定讀取最後一個資訊判斷為是否為群組有增加回傳值時請考量不要放最後一個
				//var DeptInfo = jf_Trim(Row.cells[3].textContent)+'^'+jf_Trim(Row.cells[4].textContent)+'^'+
				var DeptInfo = jf_Trim(Row.cells[3].textContent)+'^'+jf_Trim(Row.cells[4].textContent)+'^'+
				jf_Trim(Row.cells[5].textContent.substring(0,10))+'^'+jf_Trim(Row.cells[5].textContent.substring(10))+'^'+
				jf_Trim(Row.cells[6].textContent)+'^'+jf_Trim(Row.cells[7].textContent)+'^'+
				jf_Trim(Row.cells[8].textContent)+'^'+jf_Trim(Row.cells[9].textContent)+'^'+
				jf_Trim(Row.cells[10].textContent)+'^'+jf_Trim(Row.cells[11].textContent)+'^'+Row.cells[16].textContent+'^'+jf_Trim(Row.cells[17].textContent)+'^'+jf_Trim(Row.cells[18].textContent)+'^'+jf_Trim(Row.cells[19].textContent)+'^'+jf_Trim(Row.cells[12].textContent+'^N');
				if (Artifact != "")
				{
					strDeptInfo += DeptInfo+strSplit;
				}
				else
				{
					opener.document.all.lbReturnValue.length++;
					opener.document.all.lbReturnValue.options[nRtnCnt].text = "";
					opener.document.all.lbReturnValue.options[nRtnCnt].value =  DeptInfo;
					
				}
				nRtnCnt++;
			}
		}	
	}
	if (nRtnCnt > 0 )
	{
		if (Artifact != "")
		{
			//1050727 Cloud   1050087 升級二代-廢除元件行為修改新寫法
			//fnSetMsg("WEM010C1.IsGrp",rtnObj.IsGrp);
			//fnSetMsg("WEM010C1.IsExpand",!document.all.cbExpand.checked ? "1" : "");
			//fnSetMsg("WEM010C1.DeptInfo",strDeptInfo);
			fnSetMsg(strDeptInfo,!document.all.cbExpand.checked ? "1" : "");
			
		}
		else
		{
			opener.window.CallBack("WEM010C1",rtnObj.IsGrp,!document.all.cbExpand.checked);
		}
		window.close();
	}
	else
	{
		if (Artifact != "")
		{
			//1050727 Cloud   1050087 升級二代-廢除元件行為修改新寫法
			/*fnSetMsg("WEM010C1.IsGrp","");
			fnSetMsg("WEM010C1.IsExpand","");
			fnSetMsg("WEM010C1.DeptInfo","");*/
			if (window.confirm("未選擇任何機關、群組,是否要返回受文者設定視窗？"))
			{
				fnSetMsg("","");
			}
		}
		else
		{
			if (window.confirm("未選擇任何機關、群組,是否要返回受文者設定視窗？"))
			{
				window.close();
			}
			return;
		}
	}
}

function CheckBox(oCheckBox)
{
	var oParentCheckBox = jf_GetParentCheckBox(oCheckBox);
	
	if(!oCheckBox.checked)
	{
		jf_UnCheckAllParent(oCheckBox);
		//1141120	Andy 1131229	組織樹重構，改以JSON字串紀錄-改成zTree的架構
		//jf_UnCheckAllChildren(oCheckBox);
		$(oCheckBox).find(' ~ ul:first input').prop('checked', false);
	}
	else
		//1141120	Andy 1131229	組織樹重構，改以JSON字串紀錄-改成zTree的架構
		//jf_CheckAllChildren(oCheckBox);
		$(oCheckBox).find(' ~ ul:first input').prop('checked', true);
}

//使用者點選群組、回傳群組資訊
function GrpNode(argNodeID,argKey,nObj)
{
	var tb = document.all.dg1;
	var tblen = tb.rows.length;
	var Artifact = fnGetArtifact();
	if (Artifact == "")
		opener.document.all.lbReturnValue.length = 0;
	
	var rtnObj = new Object();
    rtnObj.IsGrp = "1";
    rtnObj.IsExpand = !document.all.cbExpand.checked ? "1" : "";
    var arDeptInfo = new Array();
	var nRtnCnt = 0;
	
	for (var i = 0 ; i < tblen ; i++)
	{
		var Row = tb.rows[i];
		//1050418 Cloud	[1050087]	升級二代
		//if (jf_Trim(Row.cells[1].innerText) == argKey && jf_Trim(Row.cells[0].innerText) =="")
		if (jf_Trim(Row.cells[1].textContent) == argKey && jf_Trim(Row.cells[0].textContent) =="")
		{
			
			//先加入群組資訊
							//Orgname							//orgid內部ID 6碼					//ownerID 								
			//1050418 Cloud	[1050087]	升級二代-增加回傳是否為群組
			//受文者編輯子視窗固定讀取最後一個資訊判斷為是否為群組有增加回傳值時請考量不要放最後一個
			//var DeptInfo = jf_Trim(Row.cells[3].innerText)+'^'+jf_Trim(Row.cells[4].innerText)+'^'+jf_Trim(Row.cells[16].innerText+'^^^^^^^^^^^^'+jf_Trim(Row.cells[20].innerText));//0970425 Leo 0970335 增加回傳sysid
			var DeptInfo = jf_Trim(Row.cells[3].textContent)+'^'+jf_Trim(Row.cells[4].textContent)+'^'+jf_Trim(Row.cells[16].textContent+'^^^^^^^^^^^^'+jf_Trim(Row.cells[20].textContent)+'^Y');
			
			if (Artifact != "")
			{
				arDeptInfo[0] = DeptInfo;
			}
			else
			{
				opener.document.all.lbReturnValue.length++;
				opener.document.all.lbReturnValue.options[nRtnCnt].text = "";
				opener.document.all.lbReturnValue.options[nRtnCnt].value =  DeptInfo;
			}
			nRtnCnt++;
		}
	}
	
	if (nRtnCnt > 0 )
	{
		if (Artifact != "")
		{
			rtnObj.arDeptInfo = arDeptInfo;
			//1050727 Cloud   1050087 升級二代-廢除元件行為修改新寫法
			/*fnSetMsg("WEM010C1.IsGrp",rtnObj.IsGrp);
			fnSetMsg("WEM010C1.IsExpand",rtnObj.IsExpand);
			fnSetMsg("WEM010C1.DeptInfo",rtnObj.arDeptInfo[0]);*/
			fnSetMsg(rtnObj.arDeptInfo[0],rtnObj.IsExpand);
		}
		else
			opener.window.CallBack("WEM010C1","Grp",!document.all.cbExpand.checked);
	}
	else
	{
		if (Artifact != "")
		{
			//1050727 Cloud   1050087 升級二代-廢除元件行為修改新寫法
			/*fnSetMsg("WEM010C1.IsGrp","");
			fnSetMsg("WEM010C1.IsExpand","");
			fnSetMsg("WEM010C1.DeptInfo","");*/
			fnSetMsg("","");
		}
	}
	close();
}

//使用者點選單一機關，回傳機關資訊
function ReturnValue(CusID,OrgName,OrgID,DeptID,PSN,FEP,Zip,Address,Email,FepID,Owner,IssueType,CabinetNo,GateWay,SysId)
{
    var Artifact = fnGetArtifact();
	//1050727 Cloud   1050087 升級二代-增加回傳是否為群組
	//受文者編輯子視窗固定讀取最後一個資訊判斷為是否為群組有增加回傳值時請考量不要放最後一個
    //var DeptInfo = CusID+'^'+OrgName+'^'+OrgID+'^'+DeptID+'^'+PSN+'^'+FEP+'^'+Zip+'^'+Address+'^'+Email+'^'+FepID+'^'+Owner+'^'+IssueType+'^'+CabinetNo+'^'+GateWay+'^'+SysId;//0970425 Leo 0970335 增加回傳sysid
	var DeptInfo = CusID+'^'+OrgName+'^'+OrgID+'^'+DeptID+'^'+PSN+'^'+FEP+'^'+Zip+'^'+Address+'^'+Email+'^'+FepID+'^'+Owner+'^'+IssueType+'^'+CabinetNo+'^'+GateWay+'^'+SysId+'^N';
    
    if (Artifact != "")
    {
		var rtnObj = new Object();
		rtnObj.IsGrp = "";
		rtnObj.IsExpand = "";
		var arDeptInfo = new Array();
		arDeptInfo[0] = DeptInfo;
		rtnObj.arDeptInfo = arDeptInfo;
		//1050727 Cloud   1050087 升級二代-廢除元件行為修改新寫法
		/*fnSetMsg("WEM010C1.IsGrp",rtnObj.IsGrp);
		fnSetMsg("WEM010C1.IsExpand",rtnObj.IsExpand);
		fnSetMsg("WEM010C1.DeptInfo",rtnObj.arDeptInfo[0]);*/
		fnSetMsg(rtnObj.arDeptInfo[0],"");
	}
	else
	{
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].text = "";
		opener.document.all.lbReturnValue.options[0].value = DeptInfo;
		opener.window.CallBack("WEM010C1");
    }
	//1080815	Joe		1080646 修改回傳至會簽設定頁面後，不進行子視窗Close行為
	if (!parent.$("#ODC010_WEM010C1_DIV")[0])
	{
    close();
	}
}
function jf_WinOnUnload()
{
	try{
	opener.WEM010C1 = null;
	}catch(e){}
}
window.onunload = jf_WinOnUnload;

function jf_hideStatus()
{
	window.status = "";
	//1050418 Cloud	[1050087]	升級二代
	//event.returnValue = true;
	return true ;
}


//使用SSO元件回傳資訊於不同Domain之程式

//1050727 Cloud	1050087	配合受文者編輯子視窗修改，調整回傳方式
//function fnSetMsg(argName,argValue)
function fnSetMsg(argValue,argIsExpand)
{
	//1050727 Cloud	1050087	配合受文者編輯子視窗修改，調整回傳方式
	/*var artifact = fnGetArtifact();
	if(!document.all.IEControl.SetTargetUser(artifact))
	{
		alert("無此對應之使用者");
		return false;	
	}
	document.all.IEControl.SetMsg(argName,argValue)
	return true;*/
	//1050803 David 1050087 新增ODC010叫用處理
	if (parent.$("#ODC010_WEM010C1_DIV")[0])
	{
		var $rtCoOrgInfo = parent.$("#txRtnCoOrgInfo");
		$rtCoOrgInfo.val(argValue);
		var $dlg = parent.$("#ODC010_WEM010C1_DIV");
		var $btn = $dlg.find("a#Dlg_close_btn");
		$btn.click();
	}
	else
	{
		var $dlg = parent.$("#WEM010C1_DIV");//找到母視窗關閉鈕位置
		var $btn = $dlg.find("a#searchDlg_close_btn");
		parent.$("#WEM010C1_DIV").find("input#lbRtnValue").val(argValue);//將回傳值設定
		parent.$("#WEM010C1_DIV").find("input#RtnIsExpand").val(argIsExpand);//將回傳值設定
		$btn.click();
	}
}

function fnGetArtifact()
{
	var str = document.location.href;	
	var Artifact = "";
	if (str.indexOf("?") != -1)
	{	
		var arr = str.split("?");
		str = arr[arr.length-1];
		var idx = str.indexOf("Artifact=");
		if (idx == -1)
			return "";
		str = str.substring(idx, str.length).replace("Artifact=", "");
		idx = str.indexOf("&");
		if (idx == -1)
			idx = str.length;
		str = str.substring(0, idx);
		Artifact = str;
	}
   return Artifact;
}
//1141202	Andy 1131229	組織樹重構，改以JSON字串紀錄-塞入CheckBox
function addDiyDom(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	var switchObj = $("#" + treeNode.tId + "_switch");

	var chk = $("<input type='checkbox' />")
		.attr("id", "tv_chk_" + treeNode.id)
		.attr("onclick", "javascript:CheckBox(this," + treeNode.level + ",'" + treeNode.rtnValue + "');");

	// 在展開符號 *前面* 插入 checkbox
	chk.insertAfter(switchObj);
}
function jf_GetParentCheckBox(oCheckBox) {
	var li = $(oCheckBox).closest("li");
	var parentLi = li.parent().closest("li");
	if (parentLi.length === 0) return null;
	return parentLi.find("input[type=checkbox]").get(0);
}
//1150201	Andy		1131229		調整組織樹寫法改以JSON組合
function RtnValue(event, treeId, treeNode) {
	if (treeNode.pId != "0" && treeNode.pId != "00")
		ReturnValue(treeNode.id, treeNode.orgname, treeNode.stdid, treeNode.stdiddept, treeNode.contactpsn, treeNode.fepstatus, treeNode.postno, treeNode.address, treeNode.email, treeNode.fepid, treeNode.owner1, treeNode.issuetype, treeNode.cabinet, treeNode.gateway, treeNode.sysid);
}