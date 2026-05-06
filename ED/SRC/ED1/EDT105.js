/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050511	David	Kevin_C	1050055		新增程式
 * 1050729  David   Justin  1050087     二代公文修改
 * 1051019  Leslie  Kenny   1050087     二代公文修改
 * 1110103  Kevin	Zen     1101292     修正多次點擊重複PostBack之問題
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
/*1050729 Justin 1050087 二代公文修改 
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;*/

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
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
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
//1050729 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1050729 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
		    if (document.all.dg1 !== undefined) //是否通過儲存前必要檢查
		    {
		        IsServerHandling = true;
		        jf_ShowWaitState();
		        Page_BlockSubmit = false;
		    }
		    else {
		        Page_BlockSubmit = true;
		        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請於掛號號碼欄位按下Enter鍵以新增資料"])), "");
		        /*1050729 Justin 1050087 二代公文修改
		        document.all["txRegNo"].focus();*/
		        $('#txRegNo').focus();
		    }
		    //1050729 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean"://因共用函式會清掉DataGrid的TextBox值，故不使用
		    Page_BlockSubmit = true;
		    document.all["txRcvDept"].value = "";
		    document.getElementById("dlDept").selectedIndex = 0;
		    document.getElementById("dlMailType").selectedIndex = 0;
		    document.all["txFromOrg"].value = "";
		    document.all["txRegNo"].value = "";
		    /*1050729 Justin 1050087 二代公文修改
			document.all["txRcvDept"].focus();*/
		    $('#txRcvDept').focus();
			break;
		case "btSearch":
		    var strUrl = "EDI101.aspx?SAMLart=" + document.all["SsoArtifact"].value;
		    window.open(strUrl);
			break;
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
		    Page_BlockSubmit = false;
		    //1050729 Justin 1050087 二代公文修改 
		    //jf_SelectBarSubmit();
		    jf_SelectBarSubmit(xObjectName);
			break;
	    case "btUpdateSelected":
	        Page_BlockSubmit = false;
	        //1050729 Justin 1050087 二代公文修改 
	        //jf_SelectBarSubmit();
	        jf_SelectBarSubmit(xObjectName);
	        break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1050729 Justin 1050087 二代公文修改 
//function InsertDataGrid()
function InsertDataGrid(event)
{
    if (event.keyCode == '13')
    {
        var strErrMsg = "";
        //檢核
        if (document.all["txRcvDept"].value == "") {
            strErrMsg += "收件單位不可為空\n";
            /*1050729 Justin 1050087 二代公文修改
            document.all["txRcvDept"].focus();*/
            $('#txRcvDept').focus();
        }
        if (document.all["txRegNo"].value == "") {
            strErrMsg += "掛號號碼不可為空\n";
            /*1050729 Justin 1050087 二代公文修改
			document.all["txRegNo"].focus();*/
            $('#txRegNo').focus();
        }
        if (strErrMsg != "") {
            strErrMsg = strErrMsg.substring(0, strErrMsg.length - 1);
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
			event.keyCode = "";
        }
        else {
            IsServerHandling = true;
            jf_ShowWaitState();
            Page_BlockSubmit = false;
            __doPostBack("InsertDataGrid", 0);
        }
    }
}
function SetTxRcvDept()
{
    //1050729 Justin 1050087 二代公文修改
    //document.all["txRcvDept"].value = document.getElementById("dlDept").options[document.getElementById("dlDept").selectedIndex].innerText;
    document.all["txRcvDept"].value = document.getElementById("dlDept").options[document.getElementById("dlDept").selectedIndex].textContent;
}