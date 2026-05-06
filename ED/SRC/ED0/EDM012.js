/*
/* DATE		SA		PRG		MGR_NO		DESC
 * 1070620  David   Justin  1070063     新增本程式
 * 1070820  David   Justin  1070783     ASSIGN_COWORK_SET新增SEQ_NO、ASSIGN_TYPE欄位
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1070820 Justin [1070783]加入指定DataGrid欄位
var strTableFields = new Array("_txASSIGN_ORG_NO", "_txASSIGN_ORG_NAME", "_cbIS_API_ASSIGN", "_cbIS_OC");
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
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
	    //1070820 Justin [1070783]加入上移、下移
	    case "btUp":
	        Page_BlockSubmit = true;
	        jf_RowUp("dg1", "_cbSelect", strTableFields);
	        break;
	    case "btDown":
	        Page_BlockSubmit = true;
	        jf_RowDown("dg1", "_cbSelect", strTableFields);
	        break;
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
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
	    case "btSave":
	        if (jf_CheckBlankAndAlert())
	        {
	            IsServerHandling = true;
	            jf_ShowWaitState();
	            Page_BlockSubmit = false;
	        }
	        else
	            Page_BlockSubmit = true;

	        jf_ToolBarSubmit(xObjectName);
	        break;
	}
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert() {
    var InValidName = "";
    var InValidControlName = "";

    for (var i = 2; i <= document.all.dg1.rows.length; i++) {
        if (document.all["dg1__ctl" + i + "_txASSIGN_ORG_NO"].value != "") {
            if (document.all["dg1__ctl" + i + "_txASSIGN_ORG_NAME"].value == "") {
                InValidName += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中，機關代碼有值，機關名稱不可空白";
                InValidControlName = "dg1__ctl" + i + "_txASSIGN_ORG_NAME";
                break;
            }
        }
        else if (document.all["dg1__ctl" + i + "_txASSIGN_ORG_NAME"].value !== "") {
            InValidName += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中，機關名稱有值，機關代碼不可空白";
            InValidControlName = "dg1__ctl" + i + "_txASSIGN_ORG_NO";
            break;
        }
    }

    if (InValidName != "") {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([InValidName])), "");
        $('#' + InValidControlName).focus();
        return false;
    }
    else if (!jf_CheckDataGridDuplicate("dg1", "txASSIGN_ORG_NO", "機關代碼", false)) {
        return false;
    }
    return true;
}

//1070820 Justin [1070783]ASSIGN_COWORK_SET新增SEQ_NO、ASSIGN_TYPE欄位
function cbIS_API_ASSIGNOnchange(i) {
    if (document.all["dg1__ctl" + i + "_cbIS_API_ASSIGN"].checked == true) {
        document.all["dg1__ctl" + i + "_cbIS_OC"].checked = false;
    }
}

function cbIS_OCOnchange(i) {
    if (document.all["dg1__ctl" + i + "_cbIS_OC"].checked == true) {
        document.all["dg1__ctl" + i + "_cbIS_API_ASSIGN"].checked = false;
    }
}