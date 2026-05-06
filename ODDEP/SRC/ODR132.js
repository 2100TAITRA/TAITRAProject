/* DATE		SA		PRG		MGR_NO			DESC
 * 1051110  David   Zen     1050087         二代公文修改
 * 1060518  Leslie  Zen     1060215         innerText相關修改
 * 1110719  Zen     Zen		1110549         (中興大學)支援以明細區選項指定報表內容及新增匯出Excel功能
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1051110 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1051110 Zen 1050087 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

var HelpFlag = "0";
//1051110 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051110 Zen 1050087 二代公文修改
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
        //1051110 Zen 1050087 二代公文修改--begin
        //case "btHelp":
        //    HelpFlag = "1";
        //    var strUrl = "";
        //    strUrl = "WEM010C1.aspx?OrgID=" + document.all["H_Orgno"].value + "&K1=Dlg_Dept&Search=" + document.all["txOrgno"].value;
        //    jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
        //    Page_BlockSubmit = true;
        //    break;
        //case "btFromDateS":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txFromDateS, event.screenX, event.screenY);
        //    break;
        //case "btFromDateE":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txFromDateE, event.screenX, event.screenY);
        //    break;
        //case "btAssignDateS":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txAssignDateS, event.screenX, event.screenY);
        //    break;
        //case "btAssignDateE":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txAssignDateE, event.screenX, event.screenY);
        //    break;
        case "btHelp":
            HelpFlag = "1";
            var strUrl = "";
            var path = document.all.H_Wed010C1Path.value;
            strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.h_OrgNo.value + "&K1=WEM010";
            jf_OpenChildWin(strUrl, "WEM010C1", 800, 600);
            Page_BlockSubmit = true;
            break;
            //1051110 Zen 1050087 二代公文修改--end

        //1110719 Zen 1110549 (中興大學)支援以明細區選項指定報表內容及新增匯出Excel功能
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll('dg1', '_cbSelect')
            break;
        case "btReverse":
            Page_BlockSubmit = true;
            jf_SelectInverse('dg1', '_cbSelect')
            break;
        case "btClear":
            Page_BlockSubmit = true;
            jf_SelectClear('dg1', '_cbSelect')
            break;
    }
}

//1051110 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1051110 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            if (document.all.dg1)
            {
                document.all.dg1.outerHTML = "";
            }
            Page_BlockSubmit = !CheckBeforeSearch();
            //1051110 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
        case "btPreview":
        //1110719 Zen 1110549 (中興大學)支援以明細區選項指定報表內容及新增匯出Excel功能
        case "btExcel":
            CheckOrgno();
            Page_BlockSubmit = !CheckBeforeSearch();
            //1051110 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

var argCallerId;
function CallBack(argCallerId)
{
    if (argCallerId == "WEM010C1")
    {
        var DeptInfo = document.all["lbReturnValue"].options[0].value;
        var DeptArray = DeptInfo.split(',');
        if (HelpFlag == "1")
        {
            document.all["txOrgno"].value = DeptArray[2];
            document.all["txOrgName"].value = DeptArray[1];
        }
        HelpFlag == "0";
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

var bMsg = true;
var wsGetOrgNameID;//宣告webserver回傳值id
var wsGetAssignOrgNameID;//宣告webserver回傳值id

function CheckOrgno()
{
    if (document.all.txOrgno.value == "")
        document.all.txOrgName.value = "";
    else
        GetOrgInfo(document.all.txOrgno, document.all.txOrgName);

    /*
	var bRtn = true;
	var strOrgno = jf_Trim(document.all["txOrgno"].value);
	if (strOrgno != "")
	{
		if (bMsg)
		{
			var arWSParam = new Array(4);
			arWSParam[0] = strOrgno;
			arWSParam[1] = document.all["H_Orgno"].value;
			arWSParam[2] = document.all["H_DeptNo"].value;
			arWSParam[3] = document.all["H_UserId"].value;
			callObj = jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, arWSParam);
			wsGetOrgNameID = callObj.id;
			bRtn = OnWSResult(callObj);
		}
		else
			bMsg = true;
	}
	else
		document.all["txOrgName"].value = "";
	return bRtn;
	*/
}

function GetOrgInfo(argTxObj, argLbObj)
{
    if (argTxObj.value == "")
        return;

    var wsParam = new Array();
    wsParam[0] = argTxObj.value;
    wsParam[1] = document.all.H_Orgno.value;
    wsParam[2] = document.all.H_DeptNo.value;
    wsParam[3] = document.all.H_UserId.value;
    var CallWsObj = jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, wsParam);

    //檢查執行是否成功
    if (jf_IsWebServiceSuccess(CallWsObj))
    {
        if (!CallWsObj.value.ErrorClass.IsErr)
        {
            if (CallWsObj.value.Count > 0)
            {
                if (jf_Trim(CallWsObj.value.OrgID[0]) != "")
                    argTxObj.value = jf_Trim(CallWsObj.value.OrgID[0]);
                argLbObj.value = jf_Trim(CallWsObj.value.OrgName[0]);
            }
            else
            {
                //caesar 0940608 因並藥檢局需求.
                // 透過環境變數OD_ODT130_CHECK_FROMORG設定是否需檢核來文機關需於orgmain中
                if (document.all.IsCheckFromOrg.value == "Y")
                {
                    var orgName = argTxObj.value;
                    alert('您所輸入之來文機關[' + orgName + ']尚未建立於資料庫中,請先透過[WEM010發文機關維護作業]建立後,再行登錄.');
                    argTxObj.value = '';
                    //1051110 Zen 1050087 二代公文修改
                    //argTxObj.focus();
                    $('#' + argTxObj.id).focus();
                }
            }
        }
        else
        {
            alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
        }
    }
}

function OnWSResult(argResult)
{
    var bWSRtn = false;
    if (argResult.id == wsGetOrgNameID)
    {
        //檢查執行是否成功
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (!argResult.value.ErrorClass.IsErr)
            {
                if (argResult.value.Count > 0)
                {
                    bWSRtn = true;
                    document.all["txOrgno"].value = jf_Trim(argResult.value.OrgID[0]);
                    document.all["txOrgName"].value = jf_Trim(argResult.value.OrgName[0]);
                }
                else
                {
                    bWSRtn = false;
                    if (event.type == "buttonclick")
                        bMsg = false;//不再show第二次訊息
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無此機關代碼"])), "");
                    document.all["txOrgName"].value = "";
                    //1051110 Zen 1050087 二代公文修改
                    //document.all["txOrgno"].focus();
                    $('#txOrgno').focus();
                }
            }
            else
            {
                bWSRtn = false;
                alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
                //1051110 Zen 1050087 二代公文修改
                //document.all["txOrgno"].focus();
                $('#txOrgno').focus();
            }
        }
    }
    return bWSRtn;
}

function ClientOnLoad()
{
    //1051110 Zen 1050087 二代公文修改
    //jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, null);
}

function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function CheckBeforeSearch()
{
    var bRtnBool = true;
    var strSDocNo = document.all.txDocNoS.value;
    var strEDocNo = document.all.txDocNoE.value;
    var strSFromDate = document.all.txFromDateS.value;
    var strEFromDate = document.all.txFromDateE.value;
    var strSAssignDate = document.all.txAssignDateS.value;
    var strEAssignDate = document.all.txAssignDateE.value;
    var strSAssignTime = jf_Trim(document.all.txAssignTimeS.value); //FERDY 問題單 950517 #2006.06.15
    var strEAssignTime = jf_Trim(document.all.txAssignTimeE.value); //移文時間有值 移文日期至少輸入一項
    var strFromNo = document.all.txFromNo.value;
    var strOrgName = document.all.txOrgName.value;
    //1060518 Zen 1060215 innerText相關修正
    //var strAssignOrg = document.all.dlAssignOrg.options[document.all.dlAssignOrg.selectedIndex].innerText;
    var strAssignOrg = document.all.dlAssignOrg.options[document.all.dlAssignOrg.selectedIndex].textContent;
    var strSubject = document.all.txSubject.value;
    var strErrMsg = "";

    //FERDY 問題單 950517 #2006.06.15 START	
    if (strSAssignTime != "" || strEAssignTime != "")
    {
        if (jf_Trim(strSAssignDate) == "") //移文日期起值為空白
        {
            //1051110 Zen 1050087 二代公文修改
            //document.all.txAssignDateS.focus();
            $('#txAssignDateS').focus();
            strErrMsg = "移文時間不為空白時，請輸入移文日期起值。";
        }
        else //移文日期起值有值
        {
            if (jf_Trim(strSAssignDate) != jf_Trim(strEAssignDate) && jf_Trim(strEAssignDate) != "") //移文日期起迄不同
            {
                //1051110 Zen 1050087 二代公文修改
                //document.all.txAssignDateE.focus();
                $('#txAssignDateE').focus();
                strErrMsg = "移文時間不為空白時，移文日期迄值請輸入與移文日期起值相同。";
            }
        }
    }

    if (strErrMsg != "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        return false;
    }
    //FERDY 問題單 950517 #2006.06.15 END

    if (jf_Trim(strSDocNo + strEDocNo + strSFromDate + strEFromDate + strSAssignDate + strEAssignDate + strFromNo + strOrgName + strAssignOrg + strSubject) == "")
    {
        bRtnBool = false;
        //1051110 Zen 1050087 二代公文修改
        //document.all.txAssignDateS.focus();
        $('#txAssignDateS').focus();
        strErrMsg = "請至少輸入來文日期、移文日期其中一組資料!!";
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnBool;
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
function CheckCDATE(argObj, strMsg)
{
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1051110 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
        }
    }
}

//FERDY 問題單 950517 #2006.06.15
//將dlAssignTime的值帶入txAssignTime
function jf_FillAssignTime()
{
    var strIndex = document.all["dlAssignTime"].selectedIndex;
    var strValue = document.all["dlAssignTime"].options(strIndex).value;
    var arrValue = strValue.split(":");
    if (strIndex != 0)
    {
        document.all["txAssignTimeS"].value = arrValue[0];
        document.all["txAssignTimeE"].value = arrValue[1];
    }
    else
    {
        document.all["txAssignTimeS"].value = "";
        document.all["txAssignTimeE"].value = "";
    }
}

//1110719 Zen 1110549 (中興大學)支援以明細區選項指定報表內容及新增匯出Excel功能
//全部選取
function jf_SelectAll(argTableName, argCheckBoxName)
{
    if (document.all[argTableName] == null)
        return;

    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++)
    {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.disabled == false)
            obj.checked = true;
    }
}

//反向選取
function jf_SelectInverse(argTableName, argCheckBoxName)
{
    if (document.all[argTableName] == null)
        return;

    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++)
    {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.disabled == false)
        {
            if (obj.checked)
                obj.checked = false;
            else
                obj.checked = true;
        }
    }
}

//清除選取
function jf_SelectClear(argTableName, argCheckBoxName)
{
    if (document.all[argTableName] == null)
        return;

    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++)
    {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.disabled == false)
            obj.checked = false;
    }
}