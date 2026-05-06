/*
DATE	SA		PRG		MSG_NO			DESC	
1130626 David	Kevin	1130291			新增AI近似公文檢視作業
1140618	David	David	1140166			Merge至共通版
*/

var CurrOrgIdObj;
var CurrOrgNameObj;

var IsServerHandling = new Boolean();
IsServerHandling = false;

jf_ShowValidator();

function ClientButtonControl(e)
{
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
		//一律開啟輔助分文檢索窗格
		case xObjectName:
			ReturnValue('0', $('#' + xObjectName.replace("dgbtSimilarDoc", "lbSimilardocno")).text(), '');
			Page_BlockSubmit = true;
			break;
	}
}

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
		case "btSearch":
		    jf_ToolBarSubmit(xObjectName);
		    break;
	}
}

function ClientOnLoad()
{
}

function ReturnValue(argType, argDeptNo, argDeptName)
{
	sessionStorage.clear();
	sessionStorage.UserSelectType = argType;

	if (argType == '1')
	{
		sessionStorage.UserSelectDeptNo = argDeptNo;
		sessionStorage.UserSelectDeptName = argDeptName;
	}
	else
	{
		sessionStorage.UserSelectDocNo = argDeptNo;
    }

	parent.window.CallBack("ODT130C3");
	DlgClose();
}