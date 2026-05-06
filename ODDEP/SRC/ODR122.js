/*
Date    SA		PRG		MGR_NO  DESC
1000216	Zola	Linda	1000153	新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）
1070110 David   Zen     1050087 二代升級
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1070110 Zen 1050087 二代升級    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

var LayoutModeNew = 0;
var LayoutModeModify = 1;
var WorkBatchID;
//1070110 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070110 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        case "btBatchNoS":   //送文批號子視窗
            var pUrl = "";
            pUrl = "ODI110.aspx?argMode=1";
            WorkBatchID = "txBatchNoS";
            //1000216	Linda	[1000153]	新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）	
            //jf_OpenChildWin(pUrl,"ODI110",580,420);
            jf_OpenChildWin(pUrl, "ODI110", 900, 420);
            Page_BlockSubmit = true;
            break;
        case "btBatchNoE":   //送文批號子視窗
            var pUrl = "";
            WorkBatchID = "txBatchNoE";
            pUrl = "ODI110.aspx?argMode=1";
            //1000216	Linda	[1000153]	新增ODI110可用公文號區間查詢（調整相關有呼叫之程式修改畫面大小）	
            //jf_OpenChildWin(pUrl,"ODI110",580,420);
            jf_OpenChildWin(pUrl, "ODI110", 900, 420);
            Page_BlockSubmit = true;
            break;
        case "btAll":
            //1070110 Zen 1050087 二代升級            //for (var iRow = 2; iRow < document.all.dg1.rows.length + 2; iRow++)
            for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
            {
                if (document.all["dg1__ctl" + iRow + "_cb1"].checked == false)
                    document.all["dg1__ctl" + iRow + "_cb1"].checked = true;
            }
            Page_BlockSubmit = true;
            break;
        case "btClear":
            //1070110 Zen 1050087 二代升級            //for (var iRow = 2; iRow < document.all.dg1.rows.length + 2; iRow++)
            for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
            {
                if (document.all["dg1__ctl" + iRow + "_cb1"].checked == true)
                    document.all["dg1__ctl" + iRow + "_cb1"].checked = false;
            }
            Page_BlockSubmit = true;
            break;
        case "btChange":
            //1070110 Zen 1050087 二代升級            //for (var iRow = 2; iRow < document.all.dg1.rows.length + 2; iRow++)
            for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
            {
                if (document.all["dg1__ctl" + iRow + "_cb1"].checked)
                    document.all["dg1__ctl" + iRow + "_cb1"].checked = false;
                else
                    document.all["dg1__ctl" + iRow + "_cb1"].checked = true;
            }
            Page_BlockSubmit = true;
            break;
    }
}

//1070110 Zen 1050087 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
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

    //1070110 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id

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

            //1070110 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (CheckDataGrid())
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1070110 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            if (document.all.dg1)
            {
                document.all.dg1.outerHTML = "";
            }
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1070110 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            /*case "btClean":			
                Page_BlockSubmit = false;
                jf_ConfirmClean();
                document.all["txBatchNo"].focus();
                //回Server清除DataGrid
                jf_ToolBarSubmit();
                break;*/
        case "btSearch":
            IsServerHandling = true;
            jf_ShowWaitState();
            Page_BlockSubmit = false;
            //1070110 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
        case "btPreview":
            if (CheckBeforPrint(xObjectName))
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1070110 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "ODI110")
    {
        document.all[WorkBatchID].value = document.all["lbReturnValue"].options[0].value;
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    //1070110 Zen 1050087 二代升級    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
    if (jf_GetActionMode() == LayoutModeNew)
    {
        document.all["DIV1"].className = "hide";
        document.all["DIV2"].className = "";
        //1070110 Zen 1050087 二代升級        //document.all["dtHead1"].className = "hide";
        //if (document.all["dg2"] != null)
        //    document.all["dtHead2"].className = "";
        //else
        //    document.all["dtHead2"].className = "hide";
    }
    else
    {
        document.all["DIV1"].className = "";
        document.all["DIV2"].className = "hide";
        //1070110 Zen 1050087 二代升級        //document.all["dtHead1"].className = "";
        //document.all["dtHead2"].className = "hide";
    }
    ShowMsg();

    //caesar 0940215 列印張數
    var nPage = parseInt(document.all.tbPage.value);
    for (var i = 0; i < (nPage - 1) ; i++)
        jf_PrintFile();
}

function CheckBeforeOpen()
{
    if (!CheckUnEmpty())
        return false;
    return true;
}

function OnWSResult(argResult)
{

    //webserver回傳後動作
    //檢查回傳的webserverID
    /*//範例
    if (argResult.id == wsGetGrpNameID)
    {
    //檢查執行是否成功
    if(jf_IsWebServiceSuccess(argResult))
    {
        document.all["txGrp_Name"].value = argResult.value.RtnField0[0];
    }
    else
    {
        document.all["txGrp_Name"].value = "";
        document.all["txGrp_No"].focus();
    }
}
*/
    if (argResult.id == CheckBatchNoID)
    {
        if (!jf_IsWebServiceSuccess(argResult))
        {
            document.all.txBatchNo.value = "";
            //1070110 Zen 1050087 二代升級            //document.all.txBatchNo.focus();
            $('#txBatchNo').focus();
        }
    }
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1070110 Zen 1050087 二代升級    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

//預覽/列印前欄位檢查
function CheckBeforPrint(argObjectName)
{
    if (document.all.tbPage.value == "")
        document.all.tbPage.value = "1";
    if (!CheckUnEmpty())
        return false;
    return true;
}

function CheckUnEmpty()
{
    if (jf_Trim(document.all["txBatchNoS"].value) + jf_Trim(document.all["txBatchNoE"].value) == "")
    {
        //1070110 Zen 1050087 二代升級        //document.all["txBatchNoS"].focus();
        $('#txBatchNoS').focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["送文批號不可均為空白"])), "");
        return false;
    }
    return true;
}

function CheckDataGrid()
{
    var bRtn = false;
    //1070110 Zen 1050087 二代升級    //for (var iRow = 2; iRow < document.all.dg1.rows.length + 2; iRow++)
    for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_cb1"].checked)
        {
            bRtn = true; break;
        }
    }
    if (!bRtn)
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少勾選一筆資料"])), "");
    }
    return bRtn;
}
//Client端物件OnExit事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;
	
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txGrp_No"].value != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "GRP_NO";
			arKeyValue[0]   = document.all["txGrp_No"].value;
			arRtnFldName[0] = "GRP_NAME";
			arOrdFldName[0] = "GRP_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "GRP_HEADER";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsGetGrpNameID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
*/

var CheckBatchNoID;
function CheckBatchNoExist(argFieldName)
{
    if (document.all[argFieldName].value == "")
        return;
    var arWSParam = new Array(3);
    arWSParam[0] = "SEND_MAIN";
    var arFieldName = new Array(2);
    arFieldName[0] = "SOURCE_ORGNO";
    arFieldName[1] = "BATCH_NO";
    arWSParam[1] = arFieldName;
    var arFieldValue = new Array(2);
    arFieldValue[0] = document.all.SourceOrgNo.value;
    arFieldValue[1] = document.all[argFieldName].value;
    arWSParam[2] = arFieldValue;
    callObj = jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
    CheckBatchNoID = callObj.id;
    OnWSResult(callObj);
}