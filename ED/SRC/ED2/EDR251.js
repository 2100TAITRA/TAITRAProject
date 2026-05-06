/*
DATE 	    SA		PRG		MGR_NO		DESC
1061011     David   Zen     1050087     二代公文修改
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//1061011 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if (document.all.dg1)
//    document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

document.all.txCheckDocNo.onkeydown = jf_CheckEnterPress;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1061011 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061011 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1061011 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btBatchNo":   //送文批號子視窗
            var pUrl = "";
            var OrgNo = document.all["txOrgNo"].value;
            var Artifact = document.all["txArtifact"].value;
            pUrl = "../../../ODDEP/ODI110.aspx?argMode=1&OrgNo=" + OrgNo + "&argArtifact=" + Artifact;
            //1061011 Zen 1050087 二代升級            //jf_OpenChildWin(pUrl, "ODI110", 580, 420);
            jf_OpenChildWin(pUrl, "ODI110", 800, 600);
            Page_BlockSubmit = true;
            break;
        case "btEnter":
            Page_BlockSubmit = true;
            jf_btEnter();
            break;
        //1061011 Zen 1050087 二代升級，移至ClientButtonControl        case "btSelectAll":
            Page_BlockSubmit = true;
            if (document.all["dg2"] != null)
                jf_SelectAll("dg2", "_cb2");
            else
                jf_SelectAll("dg3", "_cb3");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            if (document.all["dg2"] != null)
                jf_SelectInverse("dg2", "_cb2");
            else
                jf_SelectInverse("dg3", "_cb3");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            if (document.all["dg2"] != null)
                jf_SelectClear("dg2", "_cb2");
            else
                jf_SelectClear("dg3", "_cb3");
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1061011 Zen 1050087 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1061011 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            if (CheckBeforeOpen())
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1061011 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (CheckBoforeSave())
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1061011 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1061011 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1061011 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1061011 Zen 1050087 二代升級            //document.all["txBatchNo"].focus();
            $('#txBatchNo').focus();
            break;
        case "btSearch":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1061011 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            blPrint = true;
        case "btPreview":
            if (CheckBeforPrint(xObjectName))
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1061011 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        //1061011 Zen 1050087 二代升級，移至ClientButtonControl        ////以下屬於DataGrid ToolBar
        //case "btSelectAll":
        //    Page_BlockSubmit = true;
        //    if (document.all["dg2"] != null)
        //        jf_SelectAll("dg2", "_cb2");
        //    else
        //        jf_SelectAll("dg3", "_cb3");
        //    break;
        //case "btSelectInverse":
        //    Page_BlockSubmit = true;
        //    if (document.all["dg2"] != null)
        //        jf_SelectInverse("dg2", "_cb2");
        //    else
        //        jf_SelectInverse("dg3", "_cb3");
        //    break;
        //case "btSelectClear":
        //    Page_BlockSubmit = true;
        //    if (document.all["dg2"] != null)
        //        jf_SelectClear("dg2", "_cb2");
        //    else
        //        jf_SelectClear("dg3", "_cb3");
        //    break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    var InValidName = "";
    var InValidControlName = "";

    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        //txInput1不為空白時
        if (document.all["dg1__ctl" + i + "_txInput1"].value != "")
        {
            //txInput2不可空白
            if (document.all["dg1__ctl" + i + "_txInput2"].value == "")
            {
                InValidName += ",Input2不可空白";
                InValidControlName = "dg1__ctl" + i + "_txInput2";
            }

            if (InValidName != "")
            {
                InValidName = InValidName.substr(1, InValidName.length);
                //1061011 Zen 1050087 二代升級                //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");

                //1061011 Zen 1050087 二代升級                //document.all[InValidControlName].focus();
                $('#' + InValidControlName).focus();
                return false;
            }
        }
    }
    return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            //document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
        }
        else
        {
            //document.all["txReadOnly"].value = "";
        }
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
    /*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/

    if (argCallerId == "ODI110")
    {
        document.all.txBatchNo.value = document.all["lbReturnValue"].options[0].value;
        jf_OpenButtonSubmit();
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeOpen()
{
    if (!CheckUnEmpty("txBatchNo", "請輸入送文批號後再開啟"))
        return false;

    return true;
}

function CheckUnEmpty(argFieldName, argErrMsg)
{
    if (document.all[argFieldName].value == "")
    {
        //1061011 Zen 1050087 二代升級        //document.all[argFieldName].focus();
        $('#' + argFieldName).focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argErrMsg])), "");
        return false;
    }
    return true;
}

//預覽/列印前欄位檢查
function CheckBeforPrint(argObjectName)
{
    var Msg = "";
    if (argObjectName == "btPrint")
        Msg = "列印";
    else
        Msg = "預覽";
    if (!CheckUnEmpty("txBatchNo", "請輸入送文批號後再" + Msg))
        return false;
    return true;
}

function CheckBoforeSave()
{
    var bRtn = false;

    if (document.all.dg2.className != "Hide") //ferdy no.950360 #95.08.22
    {
        for (var iRow = 2; iRow < document.all.dg2.rows.length + 1; iRow++)
        {
            if (document.all["dg2__ctl" + iRow + "_cb2"].checked)
            {
                bRtn = true;
                break;
            }
        }
        if (!bRtn)
        {
            //1061011 Zen 1050087 二代升級            //document.all["dg2__ctl2_cb2"].focus();
            $('#dg2__ctl2_cb2').focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])), "");
        }
    }
    else
    {
        for (var iRow = 2; iRow < document.all.dg3.rows.length + 1; iRow++)
        {
            if (document.all["dg3__ctl" + iRow + "_cb3"].checked)
            {
                bRtn = true; break;
            }
        }
        if (!bRtn)
        {
            //1061011 Zen 1050087 二代升級            //document.all["dg3__ctl2_cb3"].focus();
            $('#dg3__ctl2_cb3').focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])), "");
        }
    }

    return bRtn;
}

//檢查是否按下Enter鍵,是則呼叫jf_btEnter()
function jf_CheckEnterPress()
{
    if (event.keyCode == 13)
        jf_btEnter();
}

//按下確認鍵後將輸入文號勾選
function jf_btEnter()
{
    var strCheckDocNo = jf_Trim(document.all["txCheckDocNo"].value);
    if (document.all.dg2 != null) //ferdy no.950360 
    {
        for (var iRow = 2; iRow < document.all.dg2.rows.length + 1; iRow++)
        {
            //1061011 Zen 1050087 二代升級            //if (document.all["dg2__ctl" + iRow + "_lbDocNo2"].innerText == strCheckDocNo)
            if (document.all["dg2__ctl" + iRow + "_lbDocNo2"].textContent == strCheckDocNo)
            {
                document.all["dg2__ctl" + iRow + "_cb2"].checked = true;
                document.all["txCheckDocNo"].value = "";		//清空公文文號input
                //1061011 Zen 1050087 二代升級                //document.all["txCheckDocNo"].focus();
                $('#txCheckDocNo').focus();
                break;
            }
            if (iRow == document.all.dg2.rows.length)
            {
                if (strCheckDocNo != "")
                {
                    alert('查無該筆待歸檔公文文號');
                    document.all["txCheckDocNo"].value = "";		//清空公文文號input
                    //1061011 Zen 1050087 二代升級                    //document.all["txCheckDocNo"].focus();
                    $('#txCheckDocNo').focus();
                }
            }
        }

    }
    else //輸入子文無法選取
    {
        for (var iRow = 2; iRow < document.all.dg3.rows.length + 1; iRow++)
        {
            //1061011 Zen 1050087 二代升級            //if (document.all["dg3__ctl" + iRow + "_lbDocNo3"].innerText == strCheckDocNo)
            if (document.all["dg3__ctl" + iRow + "_lbDocNo3"].textContent == strCheckDocNo)
            {
                document.all["dg3__ctl" + iRow + "_cb3"].checked = true;
                document.all["txCheckDocNo"].value = "";		//清空公文文號input
                //1061011 Zen 1050087 二代升級                //document.all["txCheckDocNo"].focus();
                $('#txCheckDocNo').focus();
                break;
            }
            if (iRow == document.all.dg3.rows.length)
            {
                alert('查無該筆待歸檔公文文號');
                document.all["txCheckDocNo"].value = "";		//清空公文文號input
                //1061011 Zen 1050087 二代升級                //document.all["txCheckDocNo"].focus();
                $('#txCheckDocNo').focus();
            }
        }
    }
}

function CallPadFunc(strObjName, argCount)
{
    if (document.all[strObjName].value != "")
        document.all[strObjName].value = jf_PADL(document.all[strObjName].value, argCount, "0");
    if (!jf_CheckCDATE(document.all[strObjName].value) && jf_Trim(document.all[strObjName].value) != "")
    {
        //1061011 Zen 1050087 二代升級        //document.all[strObjName].focus();
        $('#' + strObjName).focus();
        return false;
    }
    return true;
}