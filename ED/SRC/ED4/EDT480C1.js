/*
DATE	SA		PRG		MGR_NO				DESC
1060906 David   Zen     1050087             二代升級
1070830 Kevin   Justin  1070678             弱掃AJAX修改
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

//1060906 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1070830 Justin [1070678]弱掃AJAX修改
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060906 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060906 Zen 1050087 二代升級
    //var xObjectName = document.activeElement.id;
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
//1060906 Zen 1050087 二代升級
//function jf_ToolBarHandle()
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

    //1060906 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060906 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
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
        opener.document.all.lbReturnValue.length = 3;
        opener.document.all.lbReturnValue.options[0].value = argLink;

        //1070830 Justin [1070678]弱掃AJAX修改
        //var Check = EDT480C1.CheckTxDocstat(argLink, document.all["H_SourceOrgno"].value).value;
        var Check = ED4.EDT480C1.CheckTxDocstat(argLink, document.all["H_SourceOrgno"].value).value;

        if (Check)
        {
            opener.document.all.lbReturnValue.options[1].value = argRead1;
            opener.document.all.lbReturnValue.options[2].value = argRead2;
            opener.window.CallBack("EDT480C1");
            close();
        }
        else
        {
            if (argLink.substr(0, 1) == "0")
                jf_ShowMsg("", argLink.substr(1, 2) + "年" + argLink.substr(3, 2) + "月份已做過時效統計，若修改此月份資料將會造成報表異常，請先至EDP421解除時效鎖定狀態");
            else
                jf_ShowMsg("", argLink.substr(0, 3) + "年" + argLink.substr(3, 2) + "月份已做過時效統計，若修改此月份資料將會造成報表異常，請先至EDP421解除時效鎖定狀態");
        }
    }
    catch (e) { }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function dlDeptOnblur()
{
    document.all["H_txSect"].value = "";

    var dlSect = document.all["dlSect"];//必宣告，每次"."都會耗費時間，只做一次比較看不出影響
    var str = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;//使用者點選選單，選到的是哪個index值

    if (document.all["dlDept"].selectedIndex > 0)//index有可能是0"空白"的情況
    {
        //1070830 Justin [1070678]弱掃AJAX修改
        //var value = EDT480C1.GetSub(document.all["SsoArtifact"].value, str).value;
        var value = ED4.EDT480C1.GetSub(document.all["SsoArtifact"].value, str).value;

        fnClearDropDownList(dlSect);
        if (value.length > 0)
        {
            dlSect.options.add(new Option("", ""));//DropDownList新增一個空白

            for (var i = 0; i < value.length; i++)
            {
                var strSect = value[i];
                dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));//將name和value分別存入strSect中
            }
        }
    }
    else
    {
        fnClearDropDownList(dlSect);
    }
}

function fnClearDropDownList(obj)//專用呼叫清空
{
    while (obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
        obj.options.remove(0);
}
function dlSectOnchange()
{
    document.all["H_txSect"].value = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value
}