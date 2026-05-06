/*
DATE 	    SA		PRG		MGR_NO      DESC
1060419     Cloud   Zen     1050087     二代公文修改
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
var strTableFields = new Array("_hlLink", "_lbRead1", "_lbRead2");

//1060419 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060419 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060419 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060419 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

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
        /*
		case "":
			break;
		*/
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060419 Zen 1050087 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
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

    //1060419 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            SetDateRange();
            SetTPlanRange();
            if (CheckBeforSearch())
            {
                Page_BlockSubmit = false;//!jf_CheckKeyObject();
                //1060419 Zen 1050087 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
            break;
    }
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

    if (argResult.id == ws_OrgID)
    {
        if (argResult.value.m_bSuccess)
        {
            document.all["txSourceOrgName"].value = argResult.value.RtnField0;
        }
        else
        {
            //document.all["txSourceOrgName"].value = argResult.value.RtnField0;
            alert("所輸入的機關代碼不合法，請確認");
            //1060419 Zen 1050087 二代升級            //document.all["txOrg"].focus();
            $('#txOrg').focus();
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

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    try
    {
        opener.document.all.lbReturnValue.length = 1;
        opener.document.all.lbReturnValue.options[0].text = argLink;
        opener.document.all.lbReturnValue.options[0].value = argLink;
        opener.window.CallBack("EAT602C1");
        close();
    }
    catch (e) { }


}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

var ws_OrgID = "";
function CheckOrgNo()
{
    var param = new Array(2);
    param[0] = document.all["txOrgNo"].value;
    param[1] = document.all["txOrg"].value;
    if (param[1] != "")
    {
        var callObj_Org = jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, param); //使用WebService前必須先呼叫一次
        ws_OrgID = callObj_Org.id;
        OnWSResult(callObj_Org);
    }
}

//補0
function CallPadFunc(strObjName, argCount)
{
    switch (strObjName)
    {
        case "txDateS":
        case "txDateE":
            {
                if (document.all[strObjName].value != "")
                    document.all[strObjName].value = jf_PADL(document.all[strObjName].value, argCount, "0");
                if (!jf_CheckCDATE(document.all[strObjName].value) && jf_Trim(document.all[strObjName].value) != "")
                {
                    alert("輸入日期格式不正確，請檢查");
                    document.all[strObjName].value = "";
                }
                break;
            }
    }
}

function SetDateRange()
{
    var date1 = document.all["txDateS"].value;
    var date2 = document.all["txDateE"].value;
    var temp = "";

    if (date1 != "" && date2 == "")
        date2 = date1;
    if (date2 != "" && date1 == "")
        date1 = date2;
    if (date1 > date2)
    {
        temp = date1;
        date1 = date2;
        date2 = temp;
    }
    document.all["txDateS"].value = date1;
    document.all["txDateE"].value = date2;

    if (date1 == "" && date2 == "")
        return false;
    else
        return true;
}

function SetTPlanRange()
{
    var plan1 = document.all["txTPlanS"].value;
    var plan2 = document.all["txTPlanE"].value;
    var temp = "";

    if (plan1 != "" && plan2 == "")
        plan2 = plan1;
    if (plan2 != "" && plan1 == "")
        plan1 = plan2;
    if (plan1 > plan2)
    {
        temp = plan1;
        plan1 = plan2;
        plan2 = temp;
    }
    document.all["txTPlanS"].value = plan1;
    document.all["txTPlanE"].value = plan2;

    if (plan1 == "" && plan2 == "")
        return false;
    else
        return true;
}

function CheckBeforSearch()
{
    var Tplan_S = document.all["txTPlanS"].value;
    var Tplan_E = document.all["txTPlanE"].value;
    var TplanType = document.all["dlPlanType"].selectedIndex;
    var OrgName = document.all["txOrg"].value;
    var TranDateS = document.all["txDateS"].value;
    var TranDateE = document.all["txDateE"].value;
    var PlanNo = document.all["txPlanNo"].value;
    var ErrMsg = "";

    if (Tplan_E == "" && Tplan_S == "" && TplanType == "" && OrgName == "" && TranDateE == "" && TranDateS == "" && PlanNo == "")
        ErrMsg = "請至少輸入一項查詢條件\n";

    if (ErrMsg != "")
    {
        alert(ErrMsg);
        return false;
    }
    else
        return true;
}
