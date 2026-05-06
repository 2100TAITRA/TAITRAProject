/*
DATE 	SA	    PRG	    MGR_NO	    DESC
1050613 David   Zen     1050087     二代公文修改
1060518 Leslie  Zen     1060215     innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050613 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060518 Zen 1060215 innerText相關修正    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
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

//1050613 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
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
	
    //1050613 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050613 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050613 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050613 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			document.all["txProg"].focus();
			break;
	}
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    //1050613 Zen 1050087 二代公文修改
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
			bRtnbool = true;
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";

	var buf="";
	if (document.all["txDiminish"].value == "")
	{
	    strErrMsg = "目前遞減數不可空白" + strErrMsg;
	    //1050613 Zen 1050087 二代公文修改
	    //document.all["txDiminish"].focus();
	    $('#txDiminish').focus();
		buf="\n";
	}
	if (document.all["txProg"].value == "")
	{
	    strErrMsg = "目前遞增數不可空白" + buf + strErrMsg;
	    //1050613 Zen 1050087 二代公文修改
	    //document.all["txProg"].focus();
	    $('#txProg').focus();
		buf="\n";
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}

	return bRtnbool;
}

//只允許數字及小數點輸入且小數點後面只允許輸入一位數
//1050613 Zen 1050087 二代公文修改
//function InpNumAndPoint()
function InpNumAndPoint(event)
{
    var kc = event.keyCode;
    //1050613 Zen 1050087 二代公文修改
	//var argObj = document.all[event.srcElement.id];
	var argObj = document.all[event.target.id];

	var index = argObj.value.indexOf('.');
	if (index > 0)
	{
		//Only allow 0-9, the other will set to nothing
		if ( (kc < 48) || (kc > 57) )
			event.keyCode = 0;
		if (argObj.value.length == index+2)
			event.keyCode = 0;
	}
	else
	{
		//Only allow 0-9 & '.' , the other will set to nothing
		if ( (kc != 46) && (kc < 48) || (kc > 57) )
			event.keyCode = 0;
	}
}