/*
DATE		SA		PRG		MGR_NO	DESC
1031112	    Leslie  Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1060901     David   Zen     1050087 二代升級
1070904		Kevin   Justin	1070678 弱掃修正CookieHttpOnly
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
var strTableFields = new Array("_txOrgNo", "_txDeptID", "_lbDept2", "_txUserID", "_lbUser2");

//1060901 Zen 1050087 二代升級//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dgtarget)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060901 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    if (document.all["h_displaydg"].value != '1')
    {
        document.getElementById("td1").style.display = "none";//隱藏DIV
    }
    else
        fnSelectClick();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060901 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060901 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        //1060901 Zen 1050087 二代升級        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dgtarget", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dgtarget", "_cbSelect");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dgtarget", "_cbSelect");
            break;
        case "btDeleteSelected":
            jf_ResizeDg();
            //Page_BlockSubmit = !jf_DeleteSelected("dgtarget", "_cbSelect", strTableFields);
            //jf_SelectBarSubmit();
            break;
        case "btAddUser":
            fnAddUser();
            Page_BlockSubmit = true;
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060901 Zen 1050087 二代升級//function jf_ToolBarHandle()
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
    var strTableFields = new Array("_txOrgNo", "_txDeptID", "_lbDept2", "_txUserID", "_lbUser2");
    //1060901 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060901 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060901 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1060901 Zen 1050087 二代升級            //case "btDelete":
            //	Page_BlockSubmit = !jf_ConfirmDelete();
            //	jf_ToolBarSubmit();
            //	break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060901 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1060901 Zen 1050087 二代升級            //case "btClean":
            //	Page_BlockSubmit = true;
            //	jf_ConfirmClean(true);
            //	document.all["txDocNo"].focus();
            //	break;

            ////以下屬於DataGrid ToolBar
            //case "btSelectAll":
            //	Page_BlockSubmit = true;
            //	jf_SelectAll("dgtarget", "_cbSelect");
            //	break;
            //case "btSelectInverse":
            //	Page_BlockSubmit = true;
            //	jf_SelectInverse("dgtarget", "_cbSelect");
            //	break;
            //case "btSelectClear":
            //	Page_BlockSubmit = true;
            //	jf_SelectClear("dgtarget", "_cbSelect");
            //	break;
            //case "btDeleteSelected":
            //	jf_ResizeDg();
            //	//Page_BlockSubmit = !jf_DeleteSelected("dgtarget", "_cbSelect", strTableFields);
            //	//jf_SelectBarSubmit();
            //	break;
            //case "btAddUser":
            //	fnAddUser();
            //	Page_BlockSubmit = true;
            //	break;

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

    if (document.all["txDocNo"].value == "")
    {
        strErrMsg += "鍵值欄位不可空白\n";
        //1060901 Zen 1050087 二代升級        //document.all["txDocNo"].focus();
        $('#txDocNo').focus();
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
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
            //document.all["txDocNo"].value = jf_Trim(argResult.value.RtnStr);
        }
        else
        {
            //document.all["txSubject"].value = "";
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
		document.all["txDocNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txSubject"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txDocNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txDocNo"].focus();
	}
	*/

    //1060901 Zen 1050087 二代升級    var argCInfo = new Object();
    if (document.all["lbReturnValue"].options[1].value == "Account")
    {
        argCInfo.Code = document.all["lbReturnValue"].options[0].value;
        argCInfo.InfoType = document.all["lbReturnValue"].options[1].value;
        argCInfo.Name = document.all["lbReturnValue"].options[2].value;
        argCInfo.SourceOrgNo = document.all["lbReturnValue"].options[7].value;
        argCInfo.UnitCode = document.all["lbReturnValue"].options[8].value;
        argCInfo.UnitName = document.all["lbReturnValue"].options[9].value;
    }
    fnAddOrgTarget(argCInfo);

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function fnSelectClick()
{
	/*1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
    var argParam = "0";

    var argSelectType = new Array(4);
    argSelectType[0] = "Org";
    argSelectType[1] = "Unit";
    argSelectType[2] = "Account";
    argSelectType[3] = "Role";

    var sSelectType = "";
    for (var i = 0; i < argSelectType.length; i++)
    {
        if (i != 0)
            sSelectType += ",";
        sSelectType += "'" + argSelectType[i] + "'";
    }
    jf_SaveCookie("iic021StrctureType", argParam);
    jf_SaveCookie("iic021SelectType", sSelectType);*/
	document.all["hOrgPage"].value += "&iic021SelectType=Account";
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
	
    if (document.all.TargetNavbar.src != document.all["hOrgPage"].value)
        document.all.TargetNavbar.src = document.all["hOrgPage"].value;
}

function fnAddOrgTarget(argCInfo)
{
    if (argCInfo.InfoType != "Account")
    {
        alert("可調閱對象須選至人員名稱。");
        return;
    }
    var argPram = new Array(5);
    argPram[0] = argCInfo.SourceOrgNo;
    argPram[1] = argCInfo.UnitCode;
    argPram[2] = argCInfo.Code;
    argPram[3] = argCInfo.Name;
    argPram[4] = argCInfo.UnitName;
    if (!fnChenkData(argPram))
    {
        alert("您所選擇的人員，已存在可調閱對象中。");
        return;
    }
    if (argCInfo.SourceOrgNo != document.all["h_txOrgNo"].value)
    {
        alert("請選擇目前機關底下之人員。");
        return;
    }
    for (var i = 1 ; i < document.all.dgtarget.rows.length ; i++)
    {
        var lbtargetNameObj = document.all["dgtarget__ctl" + (i + 1) + "_lbUser2"];
        var lbtargetDeptObj = document.all["dgtarget__ctl" + (i + 1) + "_lbDept2"];
        if (lbtargetDeptObj.value != "")
            continue;
        document.all["dgtarget__ctl" + (i + 1) + "_txDeptID"].value = argCInfo.UnitCode;
        document.all["dgtarget__ctl" + (i + 1) + "_txUserID"].value = argCInfo.Code;
        document.all["dgtarget__ctl" + (i + 1) + "_cbSelect"].checked = true;
        lbtargetNameObj.value = argCInfo.Name;
        lbtargetDeptObj.value = argCInfo.UnitName;
        document.all["dgtarget__ctl" + (i + 1) + "_txOrgNo"].value = argCInfo.SourceOrgNo;
        if (i == document.all.dgtarget.rows.length - 1)
        {
            //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
            IsServerHandling = true;
            __doPostBack("tbSelect", 0);
        }
        break;
    }
}

function fnAddUser()
{
    for (var j = 1 ; j < document.all.dgtarget.rows.length ; j++)
    {
        if (document.all["dgtarget__ctl" + (j + 1) + "_lbUser2"].value == "")
        {
            for (var i = 1 ; i < document.all.dg1.rows.length ; i++)
            {
                var argPram = new Array(5);
                argPram[0] = document.all["h_txOrgNo"].value
                argPram[1] = document.all["dg1__ctl" + (i + 1) + "_txDept"].value
                argPram[2] = document.all["dg1__ctl" + (i + 1) + "_txUser"].value
                //1060901 Zen 1050087 二代升級--begin                //argPram[3] = document.all["dg1__ctl" + (i + 1) + "_lbUser"].innerText
                //argPram[4] = document.all["dg1__ctl" + (i + 1) + "_lbDept"].innerText
                argPram[3] = document.all["dg1__ctl" + (i + 1) + "_lbUser"].textContent;
                argPram[4] = document.all["dg1__ctl" + (i + 1) + "_lbDept"].textContent;
                //1060901 Zen 1050087 二代升級--end                if (fnChenkData(argPram))
                {
                    document.all["dgtarget__ctl" + (j + i) + "_txOrgNo"].value = document.all["h_txOrgNo"].value
                    document.all["dgtarget__ctl" + (j + i) + "_txDeptID"].value = document.all["dg1__ctl" + (i + 1) + "_txDept"].value
                    document.all["dgtarget__ctl" + (j + i) + "_txUserID"].value = document.all["dg1__ctl" + (i + 1) + "_txUser"].value
                    //1060901 Zen 1050087 二代升級--begin                    //document.all["dgtarget__ctl" + (j + i) + "_lbUser2"].value = document.all["dg1__ctl" + (i + 1) + "_lbUser"].innerText
                    //document.all["dgtarget__ctl" + (j + i) + "_lbDept2"].value = document.all["dg1__ctl" + (i + 1) + "_lbDept"].innerText
                    document.all["dgtarget__ctl" + (j + i) + "_lbUser2"].value = document.all["dg1__ctl" + (i + 1) + "_lbUser"].textContent;
                    document.all["dgtarget__ctl" + (j + i) + "_lbDept2"].value = document.all["dg1__ctl" + (i + 1) + "_lbDept"].textContent;
                    //1060901 Zen 1050087 二代升級--end                    document.all["dgtarget__ctl" + (j + i) + "_cbSelect"].checked = true;
                }
                else
                    alert("您所選擇的人員，已存在可調閱對象中。");
            }
            return;
        }
    }
}

function fnChenkData(argPram)
{
    for (var j = 1 ; j < document.all.dgtarget.rows.length ; j++)
    {
        if (document.all["dgtarget__ctl" + (j + 1) + "_txOrgNo"].value == argPram[0] &&
		document.all["dgtarget__ctl" + (j + 1) + "_txDeptID"].value == argPram[1] &&
		document.all["dgtarget__ctl" + (j + 1) + "_txUserID"].value == argPram[2] &&
		document.all["dgtarget__ctl" + (j + 1) + "_lbUser2"].value == argPram[3] &&
		document.all["dgtarget__ctl" + (j + 1) + "_lbDept2"].value == argPram[4]
		)
            return false;
    }
    return true;
}

//刪除選取
function jf_ResizeDg()
{
    var ArrCount = 0;
    var arraydept = new Array(50);
    var arraydeptid = new Array(50);
    var arrayuser = new Array(50);
    var arrayuserid = new Array(50);
    var arrOrgNo = new Array(50);
    var cbCheck = false;
    for (var j = 2; j <= document.all.dgtarget.rows.length ; j++)
    {
        if (document.all["dgtarget__ctl" + j + "_cbSelect"].checked == true)
        {
            cbCheck = true;
        }
    }
    if (!cbCheck)
    {
        alert("請至少勾選一筆資料。")
        return;
    }
    for (var j = 2; j <= document.all.dgtarget.rows.length ; j++)
    {
        if (jf_Trim(document.all["dgtarget__ctl" + j + "_txDeptID"].value) != "")
        {
            if (document.all["dgtarget__ctl" + j + "_cbSelect"].checked == true)
            {
                document.all["dgtarget__ctl" + j + "_txOrgNo"].value = "";
                document.all["dgtarget__ctl" + j + "_txDeptID"].value = "";
                document.all["dgtarget__ctl" + j + "_txUserID"].value = "";
                document.all["dgtarget__ctl" + j + "_lbUser2"].value = "";
                document.all["dgtarget__ctl" + j + "_lbDept2"].value = "";
            }
            else
            {
                arraydept[ArrCount] = document.all["dgtarget__ctl" + j + "_lbDept2"].value;
                arraydeptid[ArrCount] = document.all["dgtarget__ctl" + j + "_txDeptID"].value;
                arrayuser[ArrCount] = document.all["dgtarget__ctl" + j + "_lbUser2"].value;
                arrayuserid[ArrCount] = document.all["dgtarget__ctl" + j + "_txUserID"].value;
                arrOrgNo[ArrCount] = document.all["dgtarget__ctl" + j + "_txOrgNo"].value;
                ArrCount++;
            }
        }
        document.all["dgtarget__ctl" + j + "_txOrgNo"].value = "";
        document.all["dgtarget__ctl" + j + "_txDeptID"].value = "";
        document.all["dgtarget__ctl" + j + "_txUserID"].value = "";
        document.all["dgtarget__ctl" + j + "_lbUser2"].value = "";
        document.all["dgtarget__ctl" + j + "_lbDept2"].value = "";
        document.all["dgtarget__ctl" + j + "_cbSelect"].checked = false;
    }

    for (var k = 2; k < ArrCount + 2 ; k++)
    {
        document.all["dgtarget__ctl" + k + "_txOrgNo"].value = arrOrgNo[k - 2];
        document.all["dgtarget__ctl" + k + "_txDeptID"].value = arraydeptid[k - 2];
        document.all["dgtarget__ctl" + k + "_txUserID"].value = arrayuserid[k - 2];
        document.all["dgtarget__ctl" + k + "_lbUser2"].value = arrayuser[k - 2];
        document.all["dgtarget__ctl" + k + "_lbDept2"].value = arraydept[k - 2];
        if (arraydeptid[k - 2] != "")
            document.all["dgtarget__ctl" + k + "_cbSelect"].checked = true;
    }
}



