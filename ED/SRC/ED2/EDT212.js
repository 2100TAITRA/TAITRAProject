/*
DATE	SA		PRG		MGR_NO		DESC
1041002	David	David	1040622		新增程式
1061113	David	Zen	    1050087		二代升級
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

//1061113 David Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061113 David Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1061113 David Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1061113 David Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1061113 David Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1061113 David Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !CheckBeforeDelete();
            //1061113 David Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1061113 David Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1061113 David Zen 1050087 二代升級            //document.all["txDocNo"].focus();
            $('#txDocNo').focus();
            break;
    }
}

//刪除異動前檢查
function CheckBeforeDelete()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (!jf_CheckBlankAndAlert())
        bRtnbool = false;

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

function jf_CheckBlankAndAlert()
{
    var iCnt = 0;//有勾選的流程數量
    var strCheckedThread = "";
    var bDeferentThread = false;//是否有不同單位的分會流程
    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        if (document.all["dg1__ctl" + i + "_cbSelect"] && document.all["dg1__ctl" + i + "_cbSelect"].checked)
        {
            iCnt++;
            if (strCheckedThread == "")
                strCheckedThread = document.all["dg1__ctl" + i + "_txThread"].value;
            else
            {
                var NowThread = document.all["dg1__ctl" + i + "_txThread"].value;
                if (strCheckedThread != NowThread)
                    bDeferentThread = true;
            }
        }
    }

    if (bDeferentThread && iCnt != parseInt(document.all.txCanDeleteCnt.value))
    {
        alert("一次僅可異動撤銷單一分會流程，請重新勾選");
        return false;
    }

    if (iCnt == 0)
    {
        alert("至少需勾選一筆分會流程");
        return false;
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

var bAllCheck = false;
function jf_CheckSelect(argCb)
{
    var pNo = argCb.substring(8, argCb.indexOf("_cbSelect"));
    var CheckMsgId = document.all["dg1__ctl" + pNo + "_txMsgId"].value;
    var CheckFromThreadMsgId = document.all["dg1__ctl" + pNo + "_txFromThreadMsgId"].value;
    var bCheck = document.all["dg1__ctl" + pNo + "_cbSelect"].checked;

    //勾選分會開頭流程時，需將所有將所有的分會流程勾選，反之將所有的勾選取消
    if (CheckMsgId == CheckFromThreadMsgId)
    {
        for (var iRow = 2 ; iRow <= document.all["dg1"].rows.length ; iRow++)
        {
            if (document.all["dg1__ctl" + iRow + "_cbSelect"])
                document.all["dg1__ctl" + iRow + "_cbSelect"].checked = bCheck;
        }

        bAllCheck = bCheck;
    }
    else
    {
        if (bAllCheck && !bCheck)//全部勾選時，取消任一勾選皆需將所有勾選取消
        {
            for (var iRow = 2 ; iRow <= document.all["dg1"].rows.length ; iRow++)
            {
                if (document.all["dg1__ctl" + iRow + "_cbSelect"])
                    document.all["dg1__ctl" + iRow + "_cbSelect"].checked = bCheck;
            }
            bAllCheck = false;
        }
        else
        {
            //判斷前面流程有無相同的FromThreadMsgId，如有表示目前為分會中的某一流程，需將此流程之前銅鎘分會流程一併取消勾選
            if (!bCheck)
            {
                for (var iRow = 2 ; iRow <= pNo ; iRow++)
                {
                    var NowFromThreadMsgId = document.all["dg1__ctl" + iRow + "_txFromThreadMsgId"].value;
                    if (NowFromThreadMsgId == CheckFromThreadMsgId)
                        document.all["dg1__ctl" + iRow + "_cbSelect"].checked = bCheck;
                }
            }
            else
            {
                var iNextIdx = ++pNo;
                for (var iRow = iNextIdx ; iRow < document.all["dg1"].rows.length + 1 ; iRow++)
                {
                    var NowFromThreadMsgId = document.all["dg1__ctl" + iRow + "_txFromThreadMsgId"].value;
                    if (NowFromThreadMsgId == CheckFromThreadMsgId)
                    {
                        if (document.all["dg1__ctl" + iRow + "_cbSelect"])
                            document.all["dg1__ctl" + iRow + "_cbSelect"].checked = bCheck;
                    }
                    else
                        break;
                }
            }
        }
    }
}