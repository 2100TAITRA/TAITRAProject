/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 105.10.25	Kevin_C	1051150	修弱掃SQL Injection
 * 1060425 		Joe		1050087 二代升級
 * 1091019 		Joe		1090715 配合Zap弱掃移除已註解之指令
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060425	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

var wsCheckUserID;
var xDoc = document.all;

function ShowMsg()
{
	//1060425	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].innerText != "")
		// alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();	
}

//1060425	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060425	Joe	1050087	二代系統升級
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

//1060425	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060425	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btOpen":
			if(document.all.dlDept.selectedIndex ==0 || document.all.dlDept.selectedIndex ==-1)
			{
				Page_BlockSubmit = true;
				alert("請輸入承辦單位!!");
			}
			else
				Page_BlockSubmit = false; 			
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if (jf_CheckObjectValue())
			{
				var bDG1 = CheckDetail("dg1");
				var bDG2 = CheckDetail("dg2");
				if (bDG1 || bDG2)
				{
					if (jf_GetActionMode()==LayoutModeNew)
					{
						var strErrMsg="";
						if (bDG2)
						{
							if (xDoc["dlStore2"].selectedIndex != 0 && xDoc["dlStore2"].selectedIndex != -1)
							{
								strErrMsg = CheckUser("dlStore2","單位","2");
								if (strErrMsg != "")
									strErrMsg += "\n" + strErrMsg;
								//1060425	Joe	1050087	二代系統升級，調整focus寫法
								//xDoc["dlStore2"].focus();
								$('#dlStore2').focus();
							}
						}
						if (bDG1)
						{
							strErrMsg = CheckUser("dlStore1","機關","1");
							if (strErrMsg != "")
								strErrMsg += "\n" + strErrMsg;
							//1060425	Joe	1050087	二代系統升級，調整focus寫法
							//xDoc["dlStore1"].focus();
							$('#dlStore1').focus();
						}
						if (strErrMsg != "")
						{
							Page_BlockSubmit= true;
							jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
						}
						else
							Page_BlockSubmit= false;
					}
					else
						Page_BlockSubmit= false;
				}
				else
				{
					var strMsg = "請設定 "+document.all["dlDept"].options[document.all["dlDept"].selectedIndex].text+" 單位管理人";
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strMsg])),"");
					//1060425	Joe	1050087	二代系統升級，調整focus寫法
					//xDoc["dg1__ctl2_dlUser"].focus();
					$('#dg1__ctl2_dlUser').focus();
					Page_BlockSubmit= true;
				}
			}
			else
				Page_BlockSubmit = true;			
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();			
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();			
			//1060425	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			break;
	}
}

function CheckDetail(dgObjId)
{
    var iRow ;
	var strMsg = "";
	var choose = false;

	for (iRow=2;iRow<document.all[dgObjId].rows.length+1;iRow++)
	{
		if(document.all[dgObjId+"__ctl"+iRow+"_dlUser"].selectedIndex !=0 && document.all[dgObjId+"__ctl"+iRow+"_dlUser"].selectedIndex !=-1)
		{ 
			choose=true;break;
		}
	}
	
	if (!choose)
		return false;
	else
		return true;
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	ShowMsg();
	//1060425	Joe	1050087	二代系統升級
	// jf_CallWS("lib/ak_lib.asmx", "CheckDataRow", false, null);

	$(window).trigger('resize');
}

function CheckUser(dlObjId,argMsg,argType)
{
	var arWSParam = new Array();
	var DEPT = new Array(4);
	DEPT=document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');
	var StoreNo = document.all[dlObjId].options[document.all[dlObjId].selectedIndex].value;

	//1051025	Kevin_C	1051150	修弱掃SQL Injection -S
	var arSqlParam = new Array(5);
	arSqlParam[0] = "AKM103";
	//1060425	Joe	1050087	二代系統升級
	// arSqlParam[1] = document.all["lbOrgNo"].innerText;
	arSqlParam[1] = document.all["lbOrgNo"].textContent;
	arSqlParam[2] = DEPT[0];
	arSqlParam[3] = StoreNo;
	arSqlParam[4] = argType;
	arWSParam[0] = arSqlParam;
	
	//1051025	Kevin_C	1051150	修弱掃SQL Injection -E
	
	callObj= jf_CallWS("lib/ak_lib.asmx", "CheckDataRow", false, arWSParam);
	if(callObj.error)
		return callObj.errorDetail.message;
	else
	{
		wsCheckUserID = callObj.id;
		return OnWSResult(callObj,argMsg);
	}
}

function OnWSResult(argResult,argMsg)
{
     if(argResult.id == wsCheckUserID)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.RtnInt > 0)
				return "承辦單位："+document.all["dlDept"].options[document.all["dlDept"].selectedIndex].text+argMsg+"歸檔公文存放庫房重複設定, 請確定後重新輸入!";
			else
				return "";
		}
	}
}

function jf_CheckObjectValue()
{
	var strErr = "";
	var xFocusObj;
	if (xDoc.dlDept.selectedIndex == 0 || xDoc.dlDept.selectedIndex == -1)
	{
		strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["承辦單位"]))+"\n";
		if (xFocusObj == null)
			xFocusObj = xDoc.dlDept_Text;
	}
	if (xDoc.dlStore1.selectedIndex == 0 || xDoc.dlStore1.selectedIndex == -1)
	{
		strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["機關歸檔庫房"]))+"\n";
		if (xFocusObj == null)
			xFocusObj = xDoc.dlStore1;
	}
		
	if (strErr !="")
	{
		jf_ShowMeg(strErr,"");
		//1060425	Joe	1050087	二代系統升級，調整focus寫法
		//xFocusObj.focus();
		$('#' + xFocusObj.id).focus();
		return false;
	}
	else
		return true;
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1060425	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}