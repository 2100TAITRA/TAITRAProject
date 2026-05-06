/*
 * DATE    SA	   PRG		MGR_NO		DESC
 * 1050419 Kevin   Justin   1050087     二代公文修改
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
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

var uFieldID = '';

//1050419 Justin 1050087 二代公文修改 
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	$('input[type="image"]').on('click', function (event) {
		uFieldID = this.id[this.id.length - 1];
		var ret = jf_ShowModal("IFC021.aspx?iic021SelectType=Account&iic021OrgNo=" + $('#h_OrgNo').val());
	})

	$('input[id*="txAgent"]').on('blur', function (event) {
		var sAuthws = encodeURI(document.all.wsAuth.value);
		var sArt = jf_GetArtifact();
		var sAccount = jf_Trim(this.value);
		var cid = this.id[this.id.length - 1];
		if (sAccount == ''){
			$('#txEmpName' + cid).val('');
			return;
		}

		var param = new Array(2);
		param[0] = encodeURI(sArt);
		param[1] = encodeURI(sAccount);
		var result = jf_CallW(sAuthws, "GetAccountName", false, param);

		if (result.value == "") {
			$(this).val('');
			$('#txEmpName' + cid).val('');
			alert("帳號不存在。");
		}
		else {
			$('#txEmpName' + cid).val(result.value);
		}
	})
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
	var xObjectName = e.target.id;
	var pNo     = xObjectName.substring(8,xObjectName.indexOf("_btHelp"));
	var pNoHelp = "dg1__ctl"+pNo+"_btHelp";
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case pNoHelp:
			Page_BlockSubmit=true;
			ShowModal("IFC000" + GetAllParamStr());
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
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	    case "btOpen":
	        Page_BlockSubmit = !jf_CheckKeyObject();
	        jf_ToolBarSubmit(xObjectName);
	        break;
		case "btSave":
			if(checkBeforeSave()){
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
			break;
	    case "btCancel":
	        Page_BlockSubmit = !jf_ConfirmCancel();
	        jf_ToolBarSubmit(xObjectName);
	        break;
	}
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function checkBeforeSave(){
	var retMsg = [];
	$('input[id*="txAgent"]').each(function(){
		var cid = this.id[this.id.length - 1];
		var $dlDept = $('#dlDept'+cid);
		if(this.value != '' && $dlDept.val() == "無")
			retMsg.push("兼任單位"+cid+"已輸入代理人");
	})
	if(retMsg.length > 0){
		retMsg.push('請選取兼任單位。')
		alert(retMsg.join('\n'));
		return false;
	}
	return true;
}



//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
    if ( argCallerId == "IFC021" )
    {
        var strRetCode = jf_Trim(document.all.lbReturnValue.options[0].value);
        var strRetName = jf_Trim(document.all.lbReturnValue.options[2].value);
		
		$('#txAgent' + uFieldID).val(strRetCode);
		$('#txEmpName' + uFieldID).val(strRetName);
    }
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}