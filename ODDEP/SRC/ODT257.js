/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1020731	Kevin	Kevin	1020437		自ODT250複製程式，新增ODT256 公文專案管制通案申請作業
 * 1040520	Kevin	Gabby	1040134		增加回傳EDT257重新搜尋
 * 1050510  Cloud   Justin  1050087     二代公文修改
 * 1050818	Cloud	Kevin_C	1050087		二代修改，改用二代瀏覽模組
 * 1060613	Kevin	Justin	1060456		弱掃Client Potential Code Injection修正
 * 1070731	Kevin   Joe     1070678 	修正弱掃Hardcoded Absolute Path
 * 1080903	Kevin	Joe		1080339		jQuery升級2.2.4
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050510 Justin 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    /*1050510 Justin 1050087 二代公文修改
	if (document.all["ValidationSummary1"].innerText != "")
	    alert(document.all["ValidationSummary1"].innerText);*/
	jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
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

//1050510 Justin 1050087 二代公文修改 
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
	
    //1050510 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btBack":
			//if(CheckBeforeSave())	//Leslie	線上申請之簽核作業統一不強制要求輸入簽核意見，且核可及退回均不需檢核傳送對象
			//{
				Page_BlockSubmit=false;
		        //1050510 Justin 1050087 二代公文修改 
		        //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			//}
			//else
			//	Page_BlockSubmit=true;
			break;
		case "btCommit":
			//if(CheckBeforeSave())	//Leslie	線上申請之簽核作業統一不強制要求輸入簽核意見，且核可及退回均不需檢核傳送對象
			//{
				Page_BlockSubmit=false;
		        //1050510 Justin 1050087 二代公文修改 
		        //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			//}
			//else
			//	Page_BlockSubmit=true;
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
				SetCanSubmit();
			else
				SetCanNotSubmit();
		    //1050510 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = true;
			//1060613 Justin [1060456] 弱掃Client Potential Code Injection修正
			//var Artifact = jf_Trim(document.all.H_txArtifact.value);
			//var DocNo = jf_Trim(document.all.txDocNo.value);
			//var OrgNo = jf_Trim(document.all.H_txOrgNo.value);
			var Artifact = encodeURI(jf_Trim(document.all.H_txArtifact.value));
			var DocNo = encodeURI(jf_Trim(document.all.txDocNo.value));
			var OrgNo = encodeURI(jf_Trim(document.all.H_txOrgNo.value));
			DownloadDocument(Artifact,DocNo,OrgNo);
		    //1050510 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			//1050818	Kevin_C	二代修改
			//jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			Page_BlockSubmit=true;
			if (jf_CheckKeyObject())
			{
				//0990928	Howard	0990579	修正取得Artifact欄位之值
				//var strArtifact = document.all.nArtifact.value;
				var strArtifact = jf_Trim(document.all.H_txArtifact.value);
				var strDocNo = document.all["txDocNo"].value;
				var strSourceOrgno = document.all.nSourceOrgno.value;
				var strUrl = document.all.nHttp.value;
				//var strUrl ="ODI260.aspx?nFrom=ODT250&pDocNo="+strDocNo+"&SAMLart=" + strArtifact;
				//0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
				var strUrl =strUrl+"/ED/ED2/EDI200.aspx?SOURCE_ORGNO="+strSourceOrgno+"&argMsgFrom=ODT250&argTargetNo="+strDocNo+"&SAMLart=" + strArtifact;
				jf_OpenChildWin(strUrl, "EDI200", 700, 500 );
			}
		    //1050510 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//###############################################################################
//							Button Click Function
//###############################################################################
//開啟前檢查
function ConfirmOpen()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforOpen())
			bRtnbool = true;
		else
			bRtnbool = false;		
	}
	return bRtnbool;
}

function CheckBeforOpen()
{
	return true;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforeSave())
			bRtnbool = true;
		else
			bRtnbool = false;		
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforeSave()
{
	//if(!CheckNotEmptyAndAlert("txAuditMsg","審核意見"))
	//	return false;
	
	//檢查是否有設定傳送對象
	GetSelectedUser();
	return true;
}

function GetSelectedUser()
{
    /*1050510 Justin 1050087 二代公文修改
	var ddlIdx=3;
	var nextOpt = GetToolbarCtrl(ddlIdx);
	if(nextOpt==null)
		alert('null');
	var aOptions = nextOpt.getOptions();	
	document.all.SelectedUser.value = aOptions.value;*/
	document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
}
/*1050510 Justin 1050087 二代公文修改
function GetToolbarCtrl(argId)
{
	return document.all.tbTool.getItem(argId);
	for(var i=0;i<20;i++)
	{
		var o=document.all.tbTool.getItem(i);
		if(o!=null)
		{
			alert(o.getAttribute("ID"));
			if(o.getAttribute("ID")==argId)
				return o;
		}
	}
	return null;
}*/

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = false;
	return bRtnbool;
}


//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################

function CallBack(argCallerId)
{
	/*
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "SYM020C1")
	{
		document.all["txUserName"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txUserNameTxChange"].value = document.all["txUserName"].value;
		//回傳值為鍵值時，觸動TextChange事件
		//__doPostBack();//for .NET Framework 1.0
		__doPostBack("","");//for .NET Framework 1.1
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
	*/

}

function ClientOnLoad()
{
    ShowMsg();
    /*1050517 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要*/
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	if (document.all.Completed != null)
	{
	    if (document.all.Completed.value == "Y")
	    {
	        //1040520 Gabby[1040134]增加回傳EDT257重新搜尋
	        window.returnValue = document.all.Completed.value;
	        window.close();
	    }
	}
	if(document.all["dgSchedule"]==null)
    {
	    document.all.DivDgSche.outerHTML="";
	     //0980810 隱藏擬定作業時程的label,應為label14而不是Label15[0980305]-Jane
	    document.all.Label14.outerHTML="";  
	    //document.all.Label15.outerHTML="";    
	}
}

function OnWSResult(argResult)
{
    //webserver回傳後動作
    //檢查回傳的webserverID
    /*
    if (argResult.id == CheckDocNoID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(!argResult.value.RtnBool)
			{
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入之文號不存在"])),"");						
				document.all.txDocNo.value = "";
				FocusAt(document.all.txDocNo);
				
			}
		}		
	}	
	*/
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1050510 Justin 1050087 二代公文修改
    //document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}


//###############################################################################
//						Server端Register之Function
//###############################################################################

//Client端物件onblur事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;

	if(document.all.txDocNo.value == "")
		return;
	var arWSParam = new Array(3);
	arWSParam[0] = "TODO_LIST";
	var arFieldName = new Array(2);
	arFieldName[0] = "SOURCE_ORGNO";
	arFieldName[1] = "DOC_NO";
	arWSParam[1] = arFieldName;
	var arFieldValue = new Array(2);
	arFieldValue[0] = document.all.SourceOrgNo.value;
	arFieldValue[1] = document.all.txDocNo.value;
	arWSParam[2] = arFieldValue;
	callObj = jf_CallWS("template/lib/sys.asmx","CheckDataKeyDuplicate",false,arWSParam);
	CheckDocNoID = callObj.id;
	OnWSResult(callObj);	

}
*/
/*
//檢查日期格式並Alert訊息
function txPostDate_onblur()
{
	if(!CheckDate(document.all.txPostDate,"郵寄日期"))
		FocusAt(document.all.txPostDate);
}
*/

//常用審核意見
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050510 Justin 1050087 二代公文修改
    //var val = document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
	document.all["txAuditMsg"].value += val;
	document.all["dlPhraseNo"].options[0].selected = true;
    //1050510 Justin 1050087 二代公文修改
    //document.all["txAuditMsg"].focus();
	$('#txAuditMsg').focus();
}


//###############################################################################
//						private Function
//###############################################################################
function SetControlDisable(argControlName)
{	
	document.all[argControlName].disabled  = true;
	if(document.all[argControlName].type == "text")
		document.all[argControlName].style.backgroundColor = "LightGrey";
}

function SetControlEnable(argControlName)
{
	document.all[argControlName].disabled  = false;
	if(document.all[argControlName].type == "text")
		document.all[argControlName].style.backgroundColor = "";
}

function SetControlDisplay(argControlName)
{
	document.all[argControlName].style.display = "block";
}
function SetControlHidden(argControlName)
{
	document.all[argControlName].style.display = "none";
}
function SetCombBoxDisable(argControlName)
{
	SetControlDisable(argControlName+"_Text");
	SetControlDisable(argControlName);
}
 
function SetCombBoxEnable(argControlName)
{
	SetControlEnable(argControlName+"_Text");
	SetControlEnable(argControlName);
}



function FocusAt(argObj)
{
	if(!argObj.disabled)
		argObj.focus();
}

//檢查日期格式,並顯示訊息
function CheckDate(argObj,argObjName)
{
	if(argObj.value != "")
	{
		jf_PADCHAR(argObj,7,'0');
		if(!jf_CheckCDATE(argObj.value))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName+"格式不正確"])),"");						
			//FocusAt(argObj);
			return false;
		}
	}
	return true;
}

//比較數字大小
//如果argNum1 > argNum2則回傳true
//如果argNum1 <= argNum2則回傳true
function CompareNumber(argNum1,argNum2)
{
	if(argNum1 == Math.min(argNum1,argNum2))
		return false;
	else
		return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr)
{
	var num = argNumStr;
	
	if(num.length > 0)
	{
		if(argNumStr.charAt(0) == "0")
			num = argNumStr.substr(1,argNumStr.length-1);
		if(num.charAt(0) == "0" )
			num = StringGetInt(num)
	}
	return num;
}

//透過Value值選取DropDownList中的Item
function SetDDlSelectByValue(argSelectId,argSelectValue)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		//有可能Value的形式為 v1,v2,v3
		if(GetValueFromValueArray(document.all[argSelectId].options[i].value) == argSelectValue)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//會取得 "t1,t2,t3"結構中的第argIndex個值
function GetValueFromValueArray(argValueArray,argIndex)
{
	var RtnValueArray = argValueArray.split(",");
	return RtnValueArray[argIndex];
}

//透過Text值選取DropDownList中的Item
function SetDDlSelectByText(argSelectId,argSelectText)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		if(document.all[argSelectId].options[i].Text == argSelectText)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName,argFieldName)
{
	//if(document.all[argObjName].value == "")		//Leslie	線上申請之簽核作業統一不強制要求輸入簽核意見
	//{
	//	jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName+"不可為空白"])),"");						
	//	FocusAt(document.all[argObjName]);
	//	return false;
	//}
	return true;
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex()
{
   //return intRowIndex = event.srcElement.parentElement.rowIndex;   
	var xObjectName = event.srcElement.id;
	return xObjectName.substring(8,xObjectName.indexOf("_",8));   
}

//依照ID取得Toolbar物件
//用法：
//var TxDocNoObj =  getToolBarItemObjById("btOpen");
//TxDocNoObj.setAttribute("Text","TTT");
/*1050510 Justin 1050087 二代公文修改
function getToolBarItemObjById(argId)
{
	for(var i=0;i<document.all.tbTool.numItems;i++)
	{
		if(document.all.tbTool.getItem(i).getAttribute("ID") == argId)
			return document.all.tbTool.getItem(i);		
	}
}*/


//合乎Template的Alert
function AlertCustMsg(argMsg)
{
	jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argMsg])),"");
}

function SetCanSubmit()
{
	IsServerHandling = true;
	jf_ShowWaitState();	
	Page_BlockSubmit = false;
}

function SetCanNotSubmit()
{
	Page_BlockSubmit = true;
}

function fnHandleData()
{
    /*1050510 Justin 1050087 二代公文修改
	var LbMsgObj = getToolBarItemObjById("lbMsg");
	if(LbMsgObj != null)
	{*/
		var Msg = "";
		if(document.all.hData_OrgCode.value != "")
			Msg += " 單位："+document.all.hData_OrgName.value;
		if(document.all.hData_RoleCode.value != "")
			Msg += " 角色："+document.all.hData_RoleName.value;
		if(document.all.hData_UserCode.value != "")
			Msg += " 人員："+document.all.hData_UserName.value;
		
		//LbMsgObj.setAttribute("Text",Msg);
		//1080903	Joe		1080339		jQuery升級2.2.4
		// $('#lbMsg').attr("Text", Msg);
		$('#lbMsg').prop("Text", Msg);
	//}
}

function fnOpenChildWin(argUrl, argWinName, argWidth, argHeight)
{

	var strWinStyle, strTop, strLeft;
	strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes,scrollbars=yes";
	if ( (argWidth != "") || (argWidth != "0") )
	{
	   strWinStyle = strWinStyle + ",width="+argWidth;		
	   strLeft = (screen.width-argWidth)/2;
	   strWinStyle = strWinStyle + ", left="+strLeft;
	}
	if ( (argHeight != "") || (argHeight != "0") )
	{
	   strWinStyle = strWinStyle + ",height="+argHeight;		
	   strTop = (screen.height-argHeight)/2-10;
	   strWinStyle = strWinStyle + ", top="+strTop;
   }
	gWindowID = window.open(argUrl, argWinName, strWinStyle);
	gWindowID.focus();

	return gWindowID;
}

//1070731	   Joe     1070678 	修正弱掃Hardcoded Absolute Path--S
// function GetTempPath()
// {
	// var fso, f;
	// var ForReading = 1, ForWriting = 2;
	// fso = new ActiveXObject("Scripting.FileSystemObject");
		
	// uClientPath = "c:\\TEMP\\AKI802_EDIT_TMP\\";
	// if(!fso.FolderExists(uClientPath))
		// fso.CreateFolder(uClientPath)
// }
//1070731	   Joe     1070678 	修正弱掃Hardcoded Absolute Path--E

function DownloadDocument(argArt,argDocNo,argOrgNo)
{
	var artifact = argArt;
	var strDocNo = argDocNo;
	var strOrgNo	=argOrgNo;
	//1050818	Kevin_C	二代修改，改用二代瀏覽模組 -S
	// var ret;
	
	// ret = document.all.ocx.SetTargetUser(artifact);
	// if(ret==false)
	// {
		// alert("使用者權杖(Artifact) 驗證失敗，無法執行文稿調閱");
		// return;
	// }
	// GetTempPath();
	// ret =document.all.ocx.DownloadDocument3(	artifact,strOrgNo,strDocNo,uClientPath);
	// if(ret)
	// {
		////Create DPP File
		// var gLogFile = "C:\\temp\\aol.dpp";
		// var fso, f;
		// var ForReading = 1, ForWriting = 2;
		// fso = new ActiveXObject("Scripting.FileSystemObject");
		// if(!fso.FileExists(gLogFile))
		// {
			// f = fso.CreateTextFile(gLogFile,true);
		// }
		// else
		// {
			// f= fso.OpenTextFile(gLogFile, 2, true);
		// }

		// f.WriteLine("<root>");
		// f.WriteLine("<DOC_NO>"+strDocNo+"</DOC_NO>");
		// f.WriteLine("</root>");
		// f.close();
		// var oShell = new ActiveXObject("Shell.Application");
		// var param = "SAMLart="+artifact+" Sys_Dir=C:\2100\aol\od "+gLogFile;

		// var commandtoRun = "c:\\2100\\aol\\aol.exe";
		// oShell.ShellExecute(commandtoRun, param, "", "", "0")
	// }
	// else
		// alert("下載失敗!");
	try {
		var wsUrl = opener.theWebServices.url('fileiows');
		var param = [];
		param[0] = artifact;
		param[1] = strDocNo;
		param[2] = strOrgNo;

		var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
		if (!rtnObj.error) {
			if (rtnObj.value.m_bSuccess) {
				var sUnvObj = rtnObj.value.RtnStr;
				if (sUnvObj !== "") {
					var UnvObj = JSON.parse(sUnvObj);
					var objViewDoc = {
						UNVObj: UnvObj,
						docInfoPage: "AKI802",
						openDocModule: 'AOL',
						signType: 'E',
						readOnlyMode: true
					};
					var $docId = jf_GetSessionID() + "_" + (+new Date());
					localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
					var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
					jf_OpenChildWin(unvUrl, "ODT251ViewDoc");
				}
			}
			else{
				alert(rtnObj.value.m_strErrMsg);
			}
		}
		else{
			alert(rtnObj.error.errorDetail.string)
		}
	} catch (e) {
		alert('開啟失敗');
	}
	//1050818	Kevin_C	二代修改，改用二代瀏覽模組 -E
}