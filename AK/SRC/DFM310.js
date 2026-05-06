/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.08.24
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 103.11.12	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 1060502		Joe		1050087	二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060502	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060502	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].innerText != "")
	// alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();	

//1060502	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060502	Joe	1050087	二代系統升級
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
		case "btWGrp":
			var strUrl = "";
			strUrl = "DFM300C1.aspx?rtnObj=lbReturnValue"; //[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "DFM300C1", 700, 500 );
			break;
		/*
		case "":
			break;
		*/
	}	
}

//1060502	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060502	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060502	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{   if (jf_GetActionMode()==LayoutModeNew)
			   {
				Page_BlockSubmit= true;
				var arKeyName = new Array(1);
				var arKeyValue = new Array(1);
				arKeyName[0] = "SRV_NO";
				arKeyValue[0] = document.all["txServerNo"].value;
						
				var arWSParam = new Array(3);
				arWSParam[0] = "FILESRV_HEADER";
				arWSParam[1] = arKeyName;
				arWSParam[2] = arKeyValue;
						
				callObj = jf_CallWS("Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
				if(callObj.error)
				alert(callObj.errorDetail.string);
				else
				{
				wsCheckDataKeyID = callObj.id;
				OnWSResult(callObj);
				}
				}
				else
				{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			    }
			}
			else
				Page_BlockSubmit = true;
			//1060502	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060502	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060502	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean();
			document.all.dlProperty.selectedIndex=0;
			break;
		case "btSearch":
			var strUrl = "";
			xOldKey = document.all.dlProperty.value;
			strUrl = "DFM310C1.aspx?rtnObj=lbReturnValue&k1="+xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
			jf_OpenChildWin(strUrl, "DFM310C1", 700, 500 );
			break;
		case "btPrint":
			/*if(CheckBeforPrint())
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
			//1060502	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			/*if(CheckBeforPrint())
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
			//1060502	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btStation":
			var strUrl = "";
			strUrl = "DFM300C1.aspx?rtnObj=lbReturnValue";//[開啟子視窗程式]+[?回傳接值物件(必需)]
			jf_OpenChildWin(strUrl, "DFM300C1", 700, 500 );
			break;
	}
}

function CallBack(argCallerId)
{
	//將lbReturnValue的資料帶入適當的欄位
	if (argCallerId == "DFM310C1")
	{
		document.all["txServerNo"].value = document.all["lbReturnValue"].options[0].text;
		//document.all["txServerName"].value = document.all["lbReturnValue"].options[0].value;
		//document.all["txCpuName"].value = document.all["lbReturnValue"].options[1].text;
		//var argIP = document.all["lbReturnValue"].options[1].value.split('.');
		//document.all["txIP1"].value = argIP[0];
		//document.all["txIP2"].value = argIP[1];
		//document.all["txIP3"].value = argIP[2];
		//document.all["txIP4"].value = argIP[3];
		document.all["txServerNoChanged"].value = document.all["txServerNo"].value;
		
		
		//document.all["txUserNameTxChange"].value = document.all["txUserName"].value;
		//回傳值為鍵值時，觸動TextChange事件
	    //__doPostBack();//for .NET Framework 1.0
	    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
		IsServerHandling = true;
		__doPostBack("","");//for .NET Framework 1.1
		//清空lbReturnValue物件
		if(document.all["lbReturnValue"].options != null)
			document.all["lbReturnValue"].options.length = 0;	
	}
	if (argCallerId == "DFM300C1")
	{
		document.all["txStationNo"].value = document.all["lbReturnValue"].options[0].text;
		document.all["txStationName"].value = document.all["lbReturnValue"].options[0].value;
		//清空lbReturnValue物件
		if(document.all["lbReturnValue"].options != null)
			document.all["lbReturnValue"].options.length = 0;	
	}
}

function ClientOnLoad()
{
	jf_CallWS("Template/Lib/SYS.asmx", "CheckDataKeyDuplicate", false, null);
	jf_CallWS("Template/Lib/SYS.asmx", "GetCodeName", false, null);
	//PropertyChange();
}

var wsCheckDataKeyID;
function OnWSResult(argResult)
{
    //webserver回傳後動作
    //檢查回傳的webserverID
    if (argResult.id == wsGetGrpNameID)
    {
		//檢查執行是否成功
		if(jf_IsWebServiceSuccess(argResult))
		{
			document.all["txStationName"].value = argResult.value.RtnDataSet.text;
		}
		else
		{
			document.all["txStationName"].value = "";
			//1060502	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txStationNo"].focus();
			$('#txStationNo').focus();			
		}
	}
	  if(argResult.id == wsCheckDataKeyID)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.RtnBool == true)
				if ( window.confirm("鍵值資料已存在，是否要存檔?") == false)
				{
					Page_BlockSubmit = true;
					//1060502	Joe	1050087	二代系統升級，調整focus寫法
					//document.all.txServerNo.focus();
					$('#' + document.all.txServerNo.id).focus();					
				}
				else
					Page_BlockSubmit = false;
			else
				Page_BlockSubmit = false;
		}
	}
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1060502	Joe	1050087	二代系統升級
	// document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{
		   if (CheckBeforSave())
		  {
			bRtnbool = true;
			
			 
		  } else 
		      bRtnbool = false;
		
	}else 
	        bRtnbool = false;
	return bRtnbool;
 }

//儲存前key值外之欄位檢查
//如欄位不可空白....等
//檢查成功回值true
function CheckBeforSave()
{
	var bRtnbool = false;
	
	if (CheckEmpty())
	{
		//if (document.all.dlProperty.value == "1")
		//	bRtnbool = CheckDG();
		//else
			bRtnbool = true;
	}
	else
		bRtnbool = false;
	return bRtnbool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
	var bRtnbool = true;
	return bRtnbool;
}
function CheckTotalSpace()
{
	if((document.all.txTOTAL_SPACE.value)>0 || document.all.txTOTAL_SPACE.value=="")
	{
		return;
	}
	else
	{
		if(document.all.dlProperty.options[document.all.dlProperty.selectedIndex].value != "3")
		{
			alert("總容量只允許輸入大於0的數字!!");
		}
	}
}


//Client端物件OnExit事項檢查範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbStationNo_onBlur()
{
	// 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
	if ( (document.activeElement.id == "btExit") || (document.activeElement.id == "btExitImg")
	     || (document.activeElement.id == "btCancel") || (document.activeElement.id == "btCancelImg") ) return;
	
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);

	if (!IsServerHandling)
	{
		if (document.all["txStationNo"].value != "")
		{
			Page_BlockSubmit=true;
			
			arKeyName[0]    = "WGRP_NO";
			arKeyValue[0]   = document.all["txStationNo"].value;
			arRtnFldName[0] = "WGRP_NAME";
			arOrdFldName[0] = "WGRP_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "WORKGRP_MAIN";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			
			callObj = jf_CallWS("Template/Lib/SYS.asmx", "GetCodeName", false, arWSParam);
			wsGetGrpNameID = callObj.id;
			OnWSResult(callObj);
		}
	}
}

//--------------------------------------------------------------------------------------
//									撰 寫 區
//--------------------------------------------------------------------------------------
//只允許 英文 跟 數字 輸入
function jf_InpEngNum()
{
	if (window.event.keyCode >= 97 && window.event.keyCode <= 122 )
	{
		window.event.keyCode=window.event.keyCode-32;//小英變大英
	}
	else
	{
		if (window.event.keyCode < 65 || window.event.keyCode > 90)
		{
			if ((event.keyCode < 48) || (event.keyCode > 57)) { event.returnValue = false }
		}
	}
}

//只允許輸入1~255的數字
function IPLimit(srcElement)
{
	var strValue = document.all[srcElement].value;
	if (strValue == "")
		return;
	if ((strValue == 0) || (strValue > 255))
	{
		alert(FormatStr(jf_GetErrMsg(CustErr), new Array(["數字需介於1~255之間"])),"");
		//1060502	Joe	1050087	二代系統升級，調整focus寫法
		//document.all[srcElement].focus();
		$('#' + srcElement).focus();		
	}
}


//不可空白檢查
function CheckEmpty()
{
	var strErrMsg = "";
	var FocusAtObj = null;
	var RtbBool   = false;
	
	if (document.all.txServerName.value == "")
	{
		strErrMsg += "伺服機別名"+"\n";
		FocusAtObj = document.all.txServerName;
	}
	if (document.all.txWEB_SERVICE.value == "")
	{
		strErrMsg += "檔案存取WebService"+"\n";
		if(FocusAtObj==null)
			FocusAtObj = document.all.txWEB_SERVICE;
	}
	if(document.all.dlProperty.options[document.all.dlProperty.selectedIndex].value == "1")
	{
		if (document.all.txEnvelopWS.value == "")
		{
			strErrMsg += "檔案時戳加簽WebService"+"\n";
			if(FocusAtObj==null)
				FocusAtObj = document.all.txEnvelopWS;
		}
	}
	if (document.all.txCpuName.value == "")
	{
		strErrMsg += "電腦名稱"+"\n";
		if(FocusAtObj==null)
			FocusAtObj = document.all.txCpuName;
	}
	//若IP任一欄位有值, 則其他欄位不可為空白  start
	if((document.all.txIP1.value+document.all.txIP2.value+document.all.txIP3.value+document.all.txIP4.value)!="")
	{
		if (document.all.txIP1.value == "")
		{
			strErrMsg += "伺服機IP第一段"+"\n";
			if(FocusAtObj==null)
				FocusAtObj = document.all.txIP1;
		}
		if (document.all.txIP2.value == "")
		{
			strErrMsg += "伺服機IP第二段"+"\n";
			if(FocusAtObj==null)
				FocusAtObj = document.all.txIP2;
		}
		if (document.all.txIP3.value == "")
		{
			strErrMsg += "伺服機IP第三段"+"\n";
			if(FocusAtObj==null)
				FocusAtObj = document.all.txIP3;
		}
		if (document.all.txIP4.value == "")
		{
			strErrMsg += "伺服機IP第四段"+"\n";
			if(FocusAtObj==null)
				FocusAtObj = document.all.txIP4;
		}
	}
	//若IP任一欄位有值, 則其他欄位不可為空白  end
	
	if (document.all.txTOTAL_SPACE.value == "")
	{
		strErrMsg += "總容量"+"\n";
		if(FocusAtObj==null)
			FocusAtObj = document.all.txTOTAL_SPACE;
	}
	
	if (document.all.txStationNo.value == "")
	{
		strErrMsg += "工作群組"+"\n";
		if(FocusAtObj==null)
			FocusAtObj = document.all.txStationNo;
	}
	if (document.all.txSaveLocation.value == "")
	{
		strErrMsg += "儲存區位置"+"\n";
		if(FocusAtObj==null)
			FocusAtObj = document.all.txSaveLocation;
	}

	if (strErrMsg != "")
	{
		if(FocusAtObj!=null)
			//1060502	Joe	1050087	二代系統升級，調整focus寫法
			//FocusAtObj.focus();
			$('#' + FocusAtObj.id).focus();
		strErrMsg = "下列欄位不可為空白：\n"+strErrMsg;
		alert(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		RtnBool = false;
	}
	else
		return true;
}

//若伺服機屬性為'正式伺服機', 則檢查DataGrid明細
/*function CheckDG()
{
	var bDetail = false;
	
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_txCatalog"].value != "")
		{
			bDetail = true;
			if (document.all["dg1__ctl"+iRow+"_dlType"].selectedIndex == 0)
			{
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["儲存區目錄名稱有值時，該筆使用別不可為空白"])),"");
				document.all["dg1__ctl"+iRow+"_dlType"].focus();
				return false;
			}
		}
	}
	
	if (!bDetail)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少輸入一筆資料"])),"");
		document.all["dg1__ctl2_txCatalog"].focus();
		return false;
	}
	else
		return true;
}*/