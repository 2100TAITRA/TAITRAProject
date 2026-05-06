/*
DATE	SA		PRG		MGR_NO		DESC
1040209	Kevin	Kevin	1030911		新增軟體正式憑證
1050115	Kevin	Kevin_C	1041019		修改多次觸發傳送功能時，將第二次後的按鈕onclick事件擋掉，避免重複執行
1100519	Kevin	Joe		1100295		新增支援稽催通知開啟
1101015	Kevin	Joe		--			判斷當delete顯示時才提供刪除通知功能
*/
//1050115 Kevin_C 1041019 強制註冊onclick透過ClientButtonControl處理
document.all.btSave.onclick = ClientButtonControl;
//1101015	Joe		--			判斷當delete顯示時才提供刪除通知功能
if(document.all.btDelete != undefined)
	//1100519	Joe		1100295		新增刪除通知功能
	document.all.btDelete.onclick = ClientButtonControl;

var IsServerHandling = new Boolean();
IsServerHandling = false;

window.onload = ClientOnLoad;

function ClientOnLoad() {

	if ($('#H_txMSG').length > 0 && $('#H_txMSG').val() != "") {
		alert($('#H_txMSG').val());
		$('#H_txMSG').val('');
	}
}

function ClientButtonControl(event) {
	//1050115 Kevin_C	1041019	取消註解並透過jf_ToolBarSubmit進行PostBack -S
	var xObjectName;
	if(event)
		xObjectName = event.target.id;
	else
		xObjectName = document.activeElement.id;
	if (IsServerHandling)
		return;

	switch (xObjectName) {
		case "btSave":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		//1100519	Joe		1100295		新增刪除通知功能
		case "btDelete":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
	//1050115 Kevin_C	1041019	取消註解並透過jf_ToolBarSubmit進行PostBack -E
}

//儲存前檢查
function ConfirmSave() {

	return true;

    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
            bRtnbool = true;
        else
            bRtnbool = false;
    }
    return bRtnbool;
}
//1050106 David 1041020 調整PostPack透過EDT010自行處理
function jf_ToolBarSubmit(argButton)
{
	if (Page_BlockSubmit == false)
	{
		document.all.ToolBarSenderID.value = argButton;
		IsServerHandling = true;
		__doPostBack(argButton, 0);
	}
}
