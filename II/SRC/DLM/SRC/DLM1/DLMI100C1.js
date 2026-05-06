/*
DATE	SA		PRG		MGR_NO			DESC
1130816 Kevin   Cloud   1130747         新增驗證碼顯示子視窗

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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
    //取得驗證碼顯示
	document.all["lbDocNo"].textContent =  "發文號："+document.all["DOC_NO"].value;
    document.all["lbFileVerify"].textContent =  localStorage.getItem(document.all["SOURCE_ORGNO"].value+"-"+document.all["DOC_NO"].value);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(e)
{
	if (!e)
		return;

	var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        case "btClose":
            localStorage.removeItem(document.all["DOC_NO"].value + "-" + document.all["SOURCE_ORGNO"].value);
            window.close();
            break;
    }
}

function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btClose":
            localStorage.removeItem(document.all["DOC_NO"].value + "-" + document.all["SOURCE_ORGNO"].value);
            window.close();
            break;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//按下連結時開啟子視窗