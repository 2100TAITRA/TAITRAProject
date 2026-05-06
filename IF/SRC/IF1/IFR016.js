/*
DATE 	SA		PRG		MGR_NO		DESC
1050910	Kevin	Zen	    ------		新增IFR016 使用者權利查詢作業
1051019	Leslie	Joe		1050087		二代修改配合行動平台
1070830	Kevin	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHanddling = new Boolean();
IsServerHanddling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;


//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--S
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
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--E
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    DeptOnChange();
    document.all.ddlSect.value = encodeURI(document.all["H_Sect"].value);
    document.all.ddlRole.selectedIndex = parseInt(encodeURI(document.all["H_RoleIndex"].value));
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

    if (IsServerHanddling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHanddling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btPreview":
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btExcel":
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            break;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function DeptOnChange()
{
    var ddlSect = document.all["ddlSect"];
    fnClearDropDownList(ddlSect);
    var str = encodeURI(document.all["ddlDept"].options[document.all["ddlDept"].selectedIndex].value);

    if (document.all["ddlDept"].selectedIndex > 0)
    {
		//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
        // var UserInfo = IFR016.GetSub(encodeURI(document.all["ddlSource"].value), str).value;
        var UserInfo = IF1.IFR016.GetSub(encodeURI(document.all["ddlSource"].value), str).value;
        if (UserInfo.strErrMsg == "")
        {
            if (UserInfo.strRtv.length > 0)
            {
                document.all.ddlSect.disabled = false;

                fnClearDropDownList(ddlSect);
                ddlSect.options.add(new Option("", ""));
                ddlSect.options.add(new Option("(僅含一級單位)", "N"));
                for (var i = 0; i < UserInfo.strRtv.length; i++)
                {
                    var strSect = UserInfo.strRtv[i];//將取到的二級單位的值放入
                    ddlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));
                }
            }
            else
                document.all.ddlSect.disabled = true;
        }
        var H_Sect = encodeURI(document.all["H_Sect"].value)
        if (H_Sect != "")
            ddlSect.value = H_Sect;

        if (ddlSect.value != H_Sect)//更換一級單位後，清空H_Sect
        {
            ddlSect.selectedIndex = 0;
            document.all["H_Sect"].value = "";
        }
    }
    else
    {
        fnClearDropDownList(ddlSect);
        document.all["H_Sect"].value = "";
    }
}

function SectOnChange()
{
    document.all["H_Sect"].value = encodeURI(document.all["ddlSect"].value);
}

function RoleOnChange()
{
    document.all["H_RoleIndex"].value = encodeURI(document.all["ddlRole"].selectedIndex);
}

function fnClearDropDownList(obj)//專用呼叫清空控制項
{
    obj.innerHTML = '';
}