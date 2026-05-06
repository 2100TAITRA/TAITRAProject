/*
日期	SA		PG		單號		DESC
1060504 Cloud   Joe		1050087     二代升級
1140717 Cloud   Andy    1140954  	新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文、調整顯示的錯誤訊息
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060504	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1060504	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();
}

//1060504	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060504	Joe	1050087	二代系統升級
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

//1060504	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060504	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			if(document.all["htxApplyNo"].Text == "")
			{
				alert("申請書號不可為空白，請選擇申請書號");
				Page_BlockSubmit = true;
			}
			else
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}			
			//1060504	Joe	1050087	二代系統升級
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
			{
				Page_BlockSubmit = true;
				return;
			}			
			//1060504	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btEmail":			
			//1060504	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btRemail":			
			//1060504	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();			
			//1060504	Joe	1050087	二代系統升級
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
	//1060504	Joe	1050087	二代系統升級
	// jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//1060504	Joe	1050087	二代系統升級
	// jf_CallWS("lib/AK_LIB.asmx","GetFieldValue", false, null);
	ShowMsg();
}

function OnWSResult(argResult)
{
	var oOption;
	var strStatus;
	var strUserName;
   	if (argResult.id == wsGetApplyID)
   	{
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["dlApplyNo"].options.length = 0;
			document.all["txApplyEmp"].value = "";
			for (var iOption=0;iOption<argResult.value.RtnField0.length;iOption++)
			{
				strStatus = argResult.value.RtnField2[iOption];
				if (strStatus == "2" || strStatus == "4" || strStatus == "5" || strStatus == "6")
				{
					oOption = document.createElement("OPTION");
					document.all["dlApplyNo"].options.add(oOption);
					//1060504	Joe	1050087	二代系統升級
					// oOption.innerText = argResult.value.RtnField0[iOption];
					oOption.textContent = argResult.value.RtnField0[iOption];
					oOption.value = argResult.value.RtnField0[iOption] + "-" 
									+ argResult.value.RtnField1[iOption] + "-" 
									+ argResult.value.RtnField3[iOption] + "-" 
									+ argResult.value.RtnField4[iOption];
					if (document.all["txApplyEmp"].value == "")
						document.all["txApplyEmp"].value = argResult.value.RtnField1[iOption];
				}
			}
			if(document.all["dlApplyNo"].options.length != 0)
			{
				document.all["htxApplyNo"].value = document.all["dlApplyNo"].options[0].text;
				document.all["lbNoApply"].className = "hidden";
			}
			else
				document.all["lbNoApply"].className = "";
		}
		else
		{
			document.all["htxApplyNo"].value = "";
			document.all["txApplyEmp"].value = "";
		}
	}
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1060504	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = true;
	if (CheckBeforSave())
		Rtnbool = window.confirm("暫存檔已存在，是否重新產生?");
	return bRtnbool;
}

//APPLY_FILE_DETAIL有值回傳true
function CheckBeforSave()
{
	var bRtnbool = false;
	var index;
	var strApply;
	var argApply;
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	arKeyName[0] = "APPLY_NO";
	index    = document.all["dlApplyNo"].selectedIndex;
	strApply = document.all["dlApplyNo"].options[index].value;
	argApply = strApply.split('-');
	arKeyValue[0] = argApply[0];
	
	var arWSParam = new Array(5);
	arWSParam[0] = "APPLY_FILE_DETAIL";
	arWSParam[1] = arKeyName;
	arWSParam[2] = arKeyValue;
	callObj = jf_CallWS("Template/lib/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);
	
	bRtnbool = callObj.value.RtnBool;
	return bRtnbool;
}

function BeforeIsdn()
{
	if (CheckBeforSave())	//有暫存檔
		return true;
	else
	{	
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["尚未產生暫存檔"])),"");
		return false;
	}
}

/*******************************************************************/
//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = false;
	
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
/*****************************************************/
//申請書號
function dlApplyNo_onchange()
{
	var index;
	var strValue;
	var argValue;

	index    = document.all["dlApplyNo"].selectedIndex;
	strValue = document.all["dlApplyNo"].options[index].value;
	argValue = strValue.split('-');
	
	document.all["txApplyEmp"].value = argValue[1];
	document.all["htxApplyNo"].value = argValue[0];
}

//承辦單位 承辦人
var wsGetApplyID;
function dlName_onchange()
{
	var argUserName;
	//1140717      Andy    1140954  新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文
	//var argKeyName = new Array(1);
	//var argKeyValue = new Array(1);
	var argKeyName = new Array(2);
	var argKeyValue = new Array(2);
	var argRtnName = new Array(5);
	var argOrdName = new Array(1);
	var param = new Array(5);
	var index = document.all["dlName"].selectedIndex;
	
	if (document.all["dlUnit_Text"].value != "" && document.all["dlName_Text"].value != "")
	{
		//1140717      Andy    1140954 防呆，輸入的承辦人不在列表內，就不繼續執行
		if(index == -1)
			return;
		if (!IsServerHandling)
		{
			document.all["txUserValue"].value =  document.all["dlName"].options[index].value;
			Page_BlockSubmit=true;
		
			argKeyName[0] = "USERNAME";
			//1140717      Andy    1140954  新增傳入機關代碼，避免ASP、多機關架構撈到別的機關的文
			argKeyName[1] = "SOURCE_ORGNO";
			argKeyValue[1] = document.all["nOrgID"].value
			argUserName = document.all["dlName"].options[index].value.split(':');
			argKeyValue[0] = argUserName[2];
			argRtnName[0] = "APPLY_NO";
			argRtnName[1] = "PUB_NAME";
			argRtnName[2] = "STATUS";
			argRtnName[3] = "APPLY_DATE";
			argRtnName[4] = "DUE_DATE";
			argOrdName[0] = "APPLY_NO";
			
			param[0] = "APPLY_MAIN";
			param[1] = argKeyName;
			param[2] = argKeyValue;
			param[3] = argRtnName;
			param[4] = argOrdName;
			callObj = jf_CallWS("lib/AK_LIB.asmx","GetFieldValue", false, param);
			wsGetApplyID = callObj.id;
			OnWSResult(callObj);
		}
	}
	else
		document.all["dlApplyNo"].options.length = 0;
}