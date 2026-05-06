/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060615   Justin   1050087     二代公文修改
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060615 Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060615 Justin [1050087] 二代公文修改 
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060615 Justin [1050087] 二代公文修改
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

//1060615 Justin [1050087] 二代公文修改 
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
	
    //1060615 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = false;
		    //1060615 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
		    //1060615 Justin [1050087] 二代公文修改
			//document.all["dlStatus"].focus();
			$('#dlStatus').focus();
			break;
		case "btPrint":
		//	window.open("DFI300L1.doc");
		/*	if(CheckBeforPrint())
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
				Page_BlockSubmit = true;*/
			Page_BlockSubmit = false;
		    //1060615 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
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
    //1060615 Justin [1050087] 二代公文修改
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
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

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060615 Justin [1050087] 二代公文修改 
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
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

function dlSrvNo_onblur()
{
	var index;
	var strValue="";
	var argValue = new Array(2);
	if (Combobox_onblur("dlSrvNo"))
	{
		index = document.all["dlSrvNo"].selectedIndex;
		strValue = document.all["dlSrvNo"].options[index].value;
		if (strValue != "")
		    argValue = strValue.split('^');
	    //1060615 Justin [1050087] 二代公文修改 
		//document.all["dlSrvNo_Label"].innerText = argValue[1];
		document.all["dlSrvNo_Label"].textContent = argValue[1];
	}
}

function dlGrpNo_onblur()
{
	var index;
	var strValue="";
	var argValue = new Array(2);
	if (Combobox_onblur("dlGrpNo"))
	{
		index = document.all["dlGrpNo"].selectedIndex;
		strValue = document.all["dlGrpNo"].options[index].value;
		if (strValue != "")
		    argValue = strValue.split('^');
	    //1060615 Justin [1050087] 二代公文修改 
		//document.all["dlGrpNo_Label"].innerText = argValue[1];
		document.all["dlGrpNo_Label"].textContent = argValue[1];
	}
}

function ReturnValue(argVolume)
{
	var strUrl = "";
	strUrl = "DFI301.aspx?VOLUME="+argVolume;
	jf_OpenChildWin(strUrl, "DFI301", 750, 500 );
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1060615 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
		    $('#' + argObj).focus();
		}
	}
}

//檢查輸入的值存不存在
function Combobox_onblur(argId)
{
	var bRtnBool = false;
	var strValue = document.all[argId+"_Text"].value;
	
	if (strValue != "")
	{
		for (var iItem=0;iItem<document.all[argId].options.length;iItem++)
		{
			if (strValue == document.all[argId].options[iItem].text)
				bRtnBool = true;
		}
		if (!bRtnBool)
		{
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入資料不存在"])), "");
		    //1060615 Justin [1050087] 二代公文修改
		    //document.all[argId + "_Text"].focus();
		    $('#' + argId + '_Text').focus();
		}
	}	
	return bRtnBool;
}