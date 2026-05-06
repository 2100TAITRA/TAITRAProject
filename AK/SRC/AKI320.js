/*
DATE 	SA		PRG		MGR_NO	DESC
1060307 Cloud   Zen     1050087 SQL injection修正
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060307 Zen 1050087 二代公文修改//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1060307 Zen 1050087 二代公文修改//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060307 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060307 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
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

//1060307 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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
	
    //1060307 Zen 1050087 二代公文修改	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1060307 Zen 1050087 二代公文修改			//jf_ToolBarSubmit();
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
		    //1060307 Zen 1050087 二代公文修改		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;

		//1060307 Zen 1050087 二代公文修改		//case "btDelete":
		//	Page_BlockSubmit = !jf_ConfirmDelete();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btCancel":
		//	Page_BlockSubmit = !jf_ConfirmCancel();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btClean":
		//	Page_BlockSubmit = true;
		//	jf_ConfirmClean();
		//	document.all["txDocNo"].focus();
		    //	break;

		case "btSearch":
		    //1060307 Zen 1050087 二代公文修改		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
			
	    //1060307 Zen 1050087 二代公文修改	    //case "btPrint":
		//	if(CheckBeforPrint())
		//	{
		//		if(jf_ConfirmPrint())
		//		{
		//			IsServerHandling = true;
		//			jf_ShowWaitState();	
		//			Page_BlockSubmit = false;
		//		}
		//		else
		//			Page_BlockSubmit = true;
		//	}
		//	else
		//		Page_BlockSubmit = true;
		//	jf_ToolBarSubmit();
		//	break;
		case "btPreview":
		
			if(CheckBeforPrint())
			{
				if(jf_ConfirmPrint())
				{
					IsServerHandling = true;
					jf_ShowWaitState();	
					Page_BlockSubmit = false;
				}
				else
					Page_BlockSubmit = true;
			}
			else
				Page_BlockSubmit = true;
		    //1060307 Zen 1050087 二代公文修改		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	/*
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "SYM020C1")
	{
		document.all["txUserName"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txUserNameTxChange"].value = document.all["txUserName"].value;
		//回傳值為鍵值時，觸動TextChange事件
		//__doPostBack();//for .NET Framework 1.0
		__doPostBack("","");//for .NET Framework 1.1
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	
	*/

}

function ClientOnLoad()
{
    //1060307 Zen 1050087 二代公文修改    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
    
    	//webserver回傳後動作
    	//檢查回傳的webserverID
    	/*//範例
    	if (argResult.id == wsGetGrpNameID)
    	{
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["txGrp_Name"].value = argResult.value.RtnField0[0];
		}
		else
		{
			document.all["txGrp_Name"].value = "";
			document.all["txGrp_No"].focus();
		}
	}
	*/
}

//1060307 Zen 1050087 二代公文修改//function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
//{
//	var index	= document.all[argDDLId].selectedIndex;
//	var obj		= document.all[argDDLId].options[index];
	
//	document.all[argTextBoxId].value = obj.text;
//	document.all[argLabelId].innerText = obj.value;
//}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		if (CheckBeforSave())
		{
			// 新增模式需檢查鍵值是否已存在
			if (jf_GetActionMode()==LayoutModeNew)
			{
				if(jf_CheckDataExist())//檢查鍵值是否已存在
				{
					//所顯示訊息請各自系統自行規劃
					//以下訊息以檔管系統範例
					//  
					//	if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					//	bRtnbool = true;
					//
				}
				else
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
	}
	return bRtnbool;
}

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
	var bRtnbool = false;
	
	return bRtnbool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = true;
	
	return bRtnbool;
}


//Client端物件OnExit事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btCancel") ) return;
	
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txGrp_No"].value != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "GRP_NO";
			arKeyValue[0]   = document.all["txGrp_No"].value;
			arRtnFldName[0] = "GRP_NAME";
			arOrdFldName[0] = "GRP_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "GRP_HEADER";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
			wsGetGrpNameID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
*/