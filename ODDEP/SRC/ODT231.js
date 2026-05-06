/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
1050513 Cloud   Justin  1050087     二代公文修改
1050818	Cloud	Kevin_C	1050087		二代修改，改用二代瀏覽模組
1060613 Kevin	Justin	1060456		弱掃Client Potential Code Injection修正
1061103 Kevin   Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1070731	Kevin   Joe     1070678 	修正弱掃Hardcoded Absolute Path
1101018 Cloud   Cloud   1101207     修正開啟流程子視窗後，核可功能紐消失問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050513 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050513 Justin 1050087 二代公文修改
    //if (document.all["ValidationSummary1"].innerText != "")
    //  alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
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

//1050513 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050513 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btBack":
            Page_BlockSubmit = false;
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCommit":
            Page_BlockSubmit = false;
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btOpen":
            if (ConfirmOpen())
                SetCanSubmit();
            else
                SetCanNotSubmit();
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            if (!jf_ConfirmDelete())
                SetCanNotSubmit();
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            if (!jf_ConfirmCancel())
                SetCanNotSubmit();
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            break;
        case "btTransfer":
            GetSelectedUser();
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            //1101018 Cloud   1101207     修正開啟流程子視窗後，核可功能紐消失問題
            Page_BlockSubmit = false;
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
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
            DownloadDocument(Artifact, DocNo, OrgNo);
            //1050513 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1050818	Kevin_C	二代修改
            //jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearchFlow":
            //1101018 Cloud   1101207     修正開啟流程子視窗後，核可功能紐消失問題
            Page_BlockSubmit=true;
            if (ConfirmOpen())
            {
                var strArtifact = document.all.H_txArtifact.value;
                var strDocNo = document.all["txDocNo"].value;
                var strSourceOrgno = document.all.H_txOrgNo.value;
                //var strUrl ="ODI260.aspx?nFrom=ODT230&pDocNo="+strDocNo+"&SAMLart=" + strArtifact;
                //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
                var strUrl = "../../ED/ED2/EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=ODT230&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
                jf_OpenChildWin(strUrl, "EDI200", 700, 500);
            }
            //jf_ToolBarSubmit();
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
    if (jf_CheckKeyObject())//檢查key值是否輸入
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
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
            return true
        else
            return false;
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
    //檢查是否有設定傳送對象
    if (document.all.hData_RoleCode.value == "" ||
	document.all.hData_OrgCode.value == "")
    {
        AlertCustMsg("傳送對象未設定，無法進行傳送");
        return false;
    }
    return true;
}

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


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050513 Justin 1050087 二代公文修改 
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


//###############################################################################
//						private Function
//###############################################################################
function SetControlDisable(argControlName)
{
    document.all[argControlName].disabled = true;
    if (document.all[argControlName].type == "text")
        document.all[argControlName].style.backgroundColor = "LightGrey";
}

function SetControlEnable(argControlName)
{
    document.all[argControlName].disabled = false;
    if (document.all[argControlName].type == "text")
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
    SetControlDisable(argControlName + "_Text");
    SetControlDisable(argControlName);
}

function SetCombBoxEnable(argControlName)
{
    SetControlEnable(argControlName + "_Text");
    SetControlEnable(argControlName);
}

//常用審核意見
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050513 Justin 1050087 二代公文修改
    //var val		= document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txAuditMsg"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    //1050513 Justin 1050087 二代公文修改
    //document.all["txAuditMsg"].focus();
    $('#txAuditMsg').focus();
}


function FocusAt(argObj)
{
    /*1050513 Justin 1050087 二代公文修改
	if(!argObj.disabled)
	    argObj.focus();*/
    if (!$('#' + argObj)[0].disabled)
        $('#' + argObj).focus();
}

//檢查日期格式,並顯示訊息
function CheckDate(argObj, argObjName)
{
    if (argObj.value != "")
    {
        jf_PADCHAR(argObj, 7, '0');
        if (!jf_CheckCDATE(argObj.value))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
            //FocusAt(argObj);
            return false;
        }
    }
    return true;
}

//比較數字大小
//如果argNum1 > argNum2則回傳true
//如果argNum1 <= argNum2則回傳true
function CompareNumber(argNum1, argNum2)
{
    if (argNum1 == Math.min(argNum1, argNum2))
        return false;
    else
        return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr)
{
    var num = argNumStr;

    if (num.length > 0)
    {
        if (argNumStr.charAt(0) == "0")
            num = argNumStr.substr(1, argNumStr.length - 1);
        if (num.charAt(0) == "0")
            num = StringGetInt(num)
    }
    return num;
}

//透過Value值選取DropDownList中的Item
function SetDDlSelectByValue(argSelectId, argSelectValue)
{
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        //有可能Value的形式為 v1,v2,v3
        if (GetValueFromValueArray(document.all[argSelectId].options[i].value) == argSelectValue)
        {
            document.all[argSelectId].selectedIndex = i;
            break;
        }
    }
}

//會取得 "t1,t2,t3"結構中的第argIndex個值
function GetValueFromValueArray(argValueArray, argIndex)
{
    var RtnValueArray = argValueArray.split(",");
    return RtnValueArray[argIndex];
}

//透過Text值選取DropDownList中的Item
function SetDDlSelectByText(argSelectId, argSelectText)
{
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        if (document.all[argSelectId].options[i].Text == argSelectText)
        {
            document.all[argSelectId].selectedIndex = i;
            break;
        }
    }
}

//不可空白檢查,除了回傳true false外,並顯示訊息
function CheckNotEmptyAndAlert(argObjName, argFieldName)
{
    if (document.all[argObjName].value == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argFieldName + "不可為空白"])), "");
        //1050513 Justin 1050087 二代公文修改
        //FocusAt(document.all[argObjName]);
        FocusAt(argObjName);
        return false;
    }
    return true;
}

//取得在Datagrid中動作時之Control Row index
function getRowIndex()
{
    //return intRowIndex = event.srcElement.parentElement.rowIndex;   
    var xObjectName = event.srcElement.id;
    return xObjectName.substring(8, xObjectName.indexOf("_", 8));
}

//依照ID取得Toolbar物件
//用法：
//var TxDocNoObj =  getToolBarItemObjById("btOpen");
//TxDocNoObj.setAttribute("Text","TTT");
function getToolBarItemObjById(argId)
{
    for (var i = 0; i < document.all.tbTool.numItems; i++)
    {
        if (document.all.tbTool.getItem(i).getAttribute("ID") == argId)
            return document.all.tbTool.getItem(i);
    }
}


//合乎Template的Alert
function AlertCustMsg(argMsg)
{
    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argMsg])), "");
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

function fnOpenChildWin(argUrl, argWinName, argWidth, argHeight)
{

    var strWinStyle, strTop, strLeft;
    strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes,scrollbars=yes";
    if ((argWidth != "") || (argWidth != "0"))
    {
        strWinStyle = strWinStyle + ",width=" + argWidth;
        strLeft = (screen.width - argWidth) / 2;
        strWinStyle = strWinStyle + ", left=" + strLeft;
    }
    if ((argHeight != "") || (argHeight != "0"))
    {
        strWinStyle = strWinStyle + ",height=" + argHeight;
        strTop = (screen.height - argHeight) / 2 - 10;
        strWinStyle = strWinStyle + ", top=" + strTop;
    }
    gWindowID = window.open(argUrl, argWinName, strWinStyle);
    gWindowID.focus();

    return gWindowID;
}

function GetSelectedUser()
{
    /*1050513 Justin 1050087 二代公文修改
	var ddlIdx=3;
	var nextOpt = GetToolbarCtrl(ddlIdx);
	if(nextOpt==null)
		alert('null');
	var aOptions = nextOpt.getOptions();	
	document.all.SelectedUser.value = aOptions.value;*/
    document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
}

function GetToolbarCtrl(argId)
{
    return document.all.tbTool.getItem(argId);
    for (var i = 0; i < 20; i++)
    {
        var o = document.all.tbTool.getItem(i);
        if (o != null)
        {
            alert(o.getAttribute("ID"));
            if (o.getAttribute("ID") == argId)
                return o;
        }
    }
    return null;
}
//1070731	   Joe     1070678 	修正弱掃Hardcoded Absolute Path--S
// function GetTempPath()
// {
    // var fso, f;
    // var ForReading = 1, ForWriting = 2;
    // fso = new ActiveXObject("Scripting.FileSystemObject");

    // uClientPath = "c:\\TEMP\\AKI802_EDIT_TMP\\";
    // if (!fso.FolderExists(uClientPath))
        // fso.CreateFolder(uClientPath)
// }
//1070731	   Joe     1070678 	修正弱掃Hardcoded Absolute Path--E
function DownloadDocument(argArt, argDocNo, argOrgNo)
{
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;
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
    try
    {
        var wsUrl = opener.theWebServices.url('fileiows');
        var param = [];
        param[0] = artifact;
        param[1] = strDocNo;
        param[2] = strOrgNo;

        var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
        if (!rtnObj.error)
        {
            if (rtnObj.value.m_bSuccess)
            {
                var sUnvObj = rtnObj.value.RtnStr;
                if (sUnvObj !== "")
                {
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
            else
            {
                alert(rtnObj.value.m_strErrMsg);
            }
        }
        else
        {
            alert(rtnObj.error.errorDetail.string)
        }
    } catch (e)
    {
        alert('開啟失敗');
    }
    //1050818	Kevin_C	二代修改，改用二代瀏覽模組 -E
}