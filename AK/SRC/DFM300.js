/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 1030812		Eric	1030554	    新增儲存時多檢核UUID欄位
 * 103.11.12	Kevin_C	1020726	    於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 103.12.25	Cloud	--		    修正子視窗不會自動開啟問題
 * 105.01.05	Kevin_C	1051227	    使用機關代碼下拉選單選擇後將代碼放入右方label
 * 1060502		Joe		1050087	    二代升級
 * 1120407		Zen		屏東縣序24	修正ASP架構下儲存錯誤之問題
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
var xDoc = document.all;


//1060502	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060502	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].innerText != "")
// alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060502	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060502	Joe	1050087	二代系統升級
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

        case "btBakGrp":
            document.all["htxActiveGrpBtn"].value = "btBakGrp";
            var strUrl = "";
            strUrl = "DFM300C1.aspx?rtnObj=lbReturnValue"; //[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
            jf_OpenChildWin(strUrl, "DFM300C1", 700, 500);
            break;

        /*case "Button1":
        if(CheckBeforButtonClick())
        Page_BlockSubmit = false;
        else
        Page_BlockSubmit = true;
        break;*/

    }
}

//1060502	Joe	1050087	二代系統升級，傳入參數event
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

    //1060502	Joe	1050087	二代系統升級
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();

            //1060502	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (ConfirmSave())//是否通過儲存前必要檢查
            {
                if (jf_GetActionMode() == LayoutModeNew)
                {
                    Page_BlockSubmit = true;
                    var arKeyName = new Array(1);
                    var arKeyValue = new Array(1);
                    arKeyName[0] = "WGRP_NO";
                    arKeyValue[0] = document.all["txWgrpNo"].value;

                    var arWSParam = new Array(3);
                    arWSParam[0] = "WORKGRP_MAIN";
                    arWSParam[1] = arKeyName;
                    arWSParam[2] = arKeyValue;

                    callObj = jf_CallWS("Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
                    if (callObj.error)
                        alert(callObj.errorDetail.string);
                    else
                    {
                        wsCheckDataKeyID = callObj.id;
                        OnWSResult(callObj);
                    }
                }
                else
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                }
            }
            else
                Page_BlockSubmit = true;

            //1060502	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
			
			//1120407 Zen 屏東縣序24 配合使用機關代碼為鍵值，PostBack前啟用下拉選單避免被視為預設值
			document.all['dlOrgNo'].disabled = false;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();

            //1060502	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();

            //1060502	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            if (jf_ConfirmClean())
                jf_InitDefaultValue();
            //1060502	Joe	1050087	二代系統升級，調整focus寫法
            //xDoc.txWgrpNo.focus();
            $('#' + xDoc.txWgrpNo.id).focus();
            break;
        case "btSearch":
            //103.12.25	Cloud	--		修正子視窗不會自動開啟問題
            //1120407 Zen 屏東縣序24 避免額外PostBack
            Page_BlockSubmit = true;
            document.all["htxActiveGrpBtn"].value = "btSearch";
            var strUrl = "";
            strUrl = "DFM300C1.aspx?rtnObj=lbReturnValue";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
            jf_OpenChildWin(strUrl, "DFM300C1", 700, 500);

            break;
        case "btPrint":
            if (CheckBeforPrint())
            {
                if (jf_ConfirmPrint())
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                }
                else
                    Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = true;

            //1060502	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            if (CheckBeforPrint())
            {
                if (jf_ConfirmPrint())
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                }
                else
                    Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = true;

            //1060502	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}
function CheckWorkgrp()
{
    if (document.all["txBKUP_WGRP"].value == "")
    {
        document.all["txBakGrpName"].value = "";
        return;
    }

    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    arKeyName[0] = "WGRP_NO";
    arKeyValue[0] = document.all["txBKUP_WGRP"].value;

    var arWSParam = new Array(3);
    arWSParam[0] = "WORKGRP_MAIN";
    arWSParam[1] = arKeyName;
    arWSParam[2] = arKeyValue;

    callObj = jf_CallWS("Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
    if (callObj.error)
        alert(callObj.errorDetail.string);
    else
    {
        wsCheckDataKeyID2 = callObj.id;
        OnWSResult(callObj)
    }
}


function CallBack(argCallerId)
{
    if (argCallerId == "DFM300C1")
    {
        if (document.all["htxActiveGrpBtn"].value == "btSearch")
        {

            document.all["txWgrpNo"].value = document.all["lbReturnValue"].options[0].text;
            document.all["txWgrpNoChanged"].value = document.all["txWgrpNo"].value;
            document.all["txWgrpName"].value = document.all["lbReturnValue"].options[0].value;
            document.all["lbReturnValue"].options[0].text = ""
            document.all["lbReturnValue"].options[0].value = "";
            //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
            IsServerHandling = true;

            //1120407 Zen 屏東縣序24 修正ASP架構下儲存錯誤之問題，額外串入使用機關代碼
            document.all['dlOrgNo'].value = document.all["lbReturnValue"].options[1].value;

            __doPostBack("", "");
        }
        else
        {
            document.all["txBKUP_WGRP"].value = document.all["lbReturnValue"].options[0].text;
            document.all["txBakGrpName"].value = document.all["lbReturnValue"].options[0].value;
            document.all["lbReturnValue"].options[0].text = ""
            document.all["lbReturnValue"].options[0].value = "";
        }
    }
}
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


function jf_InitDefaultValue()
{

    //	xDoc.txMask1.value = 255;
}
var wsCheckDataKeyID;
var wsCheckDataKeyID2;
function OnWSResult(argResult)
{
    if (argResult.id == wsCheckDataKeyID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.RtnBool == true)
                if (window.confirm("鍵值資料已存在，是否要存檔?") == false)
                {
                    Page_BlockSubmit = true;
                    //1060502	Joe	1050087	二代系統升級，調整focus寫法
                    //xDoc.txWgrpNo.focus();
                    $('#' + xDoc.txWgrpNo.id).focus();
                }
                else
                    Page_BlockSubmit = false;
            else
                Page_BlockSubmit = false;
        }
    }
    if (argResult.id == wsCheckDataKeyID2)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.RtnBool == false)
                alert("備援工作群組不存在!!");

        }
    }
}

function ClientOnLoad()
{
    //1120407 Zen 屏東縣序24 註解無用邏輯
    //jf_CallWS("Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null)
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);

    //1120407 Zen 屏東縣序24 配合使用機關代碼為鍵值，修改模式時鎖定下拉選單
    if (document.all['TemplateMode'].value == '1')
        document.all['dlOrgNo'].disabled = true;
}

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
        {
            bRtnbool = true;


        } else
            bRtnbool = false;

    } else
        bRtnbool = false;
    return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
//function CheckBeforSave()
//{
//	var bRtnbool = false;

//	return bRtnbool;
//}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
    var bRtnbool = false;

    return bRtnbool;
}
function CheckBeforSave()
{
    var strErr = "";
    var xFocusObj;
    if (jf_Trim(xDoc.txWgrpNo.value) == "")
    {
        strErr += "工作群組編號不可空白" + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.txWgrpNo;
    }
    if (jf_Trim(xDoc.txWgrpName.value) == "")
    {
        strErr += "工作群組名稱不可空白" + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.txWgrpName;
    }
    //1050105	Kevin_C	1051227	使用機關代碼改為下拉選單
    //if (jf_Trim(xDoc.txOrgNo.value) == "" )
    //{
    //	strErr += "使用機關代碼不可空白"+"\n";
    //	if (xFocusObj == null)
    //		xFocusObj = xDoc.txOrgNo;
    //}
    //1030812	Eric 1030554	新增儲存時多檢核UUID欄位
    if (jf_Trim(xDoc.txUUID.value) == "")
    {
        strErr += "UUID不可空白" + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.txUUID;
    }
    if (strErr != "")
    {
        jf_ShowMeg(strErr, "");
        //1060502	Joe	1050087	二代系統升級，調整focus寫法
        //xFocusObj.focus();
        $('#' + xFocusObj.id).focus();
        return false;
    }
    else
    {
        return true;
    }
}
//1050105	Kevin_C	1051227	使用機關代碼下拉選單選擇後將代碼放入右方label
function dlOrgNoOnChange()
{
    //1060502	Joe	1050087	二代系統升級
    // document.all.lbOrgNo.innerText = document.getElementById("dlOrgNo").options[document.getElementById("dlOrgNo").selectedIndex].value;
    document.all.lbOrgNo.textContent = document.getElementById("dlOrgNo").options[document.getElementById("dlOrgNo").selectedIndex].value;
}