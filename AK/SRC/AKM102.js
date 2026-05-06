/*
DATE 	SA		PRG		MGR_NO		DESC
970325			Leslie				修正呼叫WS時，傳入的字串陣列長度，去掉多餘的空欄位
1031112			Kevin_C 1020726		於__doPostBack前加上IsServerHandling=true;避免重複執行
1060216	Cloud	Joe		1050087		二代升級
1060914	Kevin	Joe		1060742		移除AKLIB無用函式
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060216	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
var xDoc=document.all;
var wsCheckDataKeyID0;
var wsCheckDataKeyID;

function ShowMsg()
{
	//1060216	Joe	1050087	二代系統升級
	// if (document.all["ValidationSummary1"].textContent != "")
		// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}

//1060216	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060216	Joe	1050087	二代系統升級
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

//1060216	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060216	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	case "btOpen":
		    Page_BlockSubmit = !jf_CheckKeyObject();
			//1060216	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if ( jf_CheckObjectValue() )
				{
					// 新增模式需檢查鍵值是否已存在
					if (jf_GetActionMode()==LayoutModeNew)
					{
						Page_BlockSubmit= true;
						
						var arKeyName = new Array(1);	//Leslie	改為1
						var arKeyValue = new Array(1);	//Leslie	改為1
						arKeyName[0] = "STORE_NO";
						arKeyValue[0] = document.all["txStoreNo"].value;
						
						var arWSParam = new Array(3);
						arWSParam[0] = "STORE_MAIN";
						arWSParam[1] = arKeyName;
						arWSParam[2] = arKeyValue;
						
						callObj = jf_CallWS("/Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
						if(callObj.error)
							alert(callObj.errorDetail.string);
						else
						{
							wsCheckDataKeyID = callObj.id;
							OnWSResult(callObj);
						}
					}
					
				}
				else
					Page_BlockSubmit = true;
				
			//1060216	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
			
		case "btDelete":
				if ( jf_ConfirmDelete() )
				{
						Page_BlockSubmit= true;
						var arKeyName = new Array(1);
						var arKeyValue = new Array(1);
						arKeyName[0] = "STORE_NO";
						arKeyValue[0] = document.all["txStoreNo"].value;
												
						
						var arWSParam = new Array(3);
						arWSParam[0] = "STORE_FILE";
						arWSParam[1] = arKeyName;
						arWSParam[2] = arKeyValue;
						
						//1060914	Joe		1060742		移除AKLIB無用函式改呼叫SYS
						// callObj = jf_CallWS("lib/ak_lib.asmx", "CheckDataKeyUsed", false, arWSParam);
						callObj = jf_CallWS("/Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
						if(callObj.error)
							alert(callObj.errorDetail.string);
						else
						{
							wsCheckDataKeyID0 = callObj.id;
							OnWSResult(callObj);
						}
					}
					
				
				else
				Page_BlockSubmit = true;
				
				
			//1060216	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
				break;
			
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060216	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			//Add by Cola 記錄目前radiobutton
			var tmp = "";
			if (document.all["rb1"].checked)
				tmp = "1";
			else if (document.all["rb2"].checked)
				tmp = "2";
			jf_ConfirmClean();
			if (tmp == "1")
				document.all["rb1"].checked = true;
			else if (tmp == "2")
				document.all["rb2"].checked = true;
			//Cola -- end --
			//1060216	Joe	1050087	二代系統升級，調整focus寫法
			//xDoc.txStoreNo.focus();
			$('#' + xDoc.txStoreNo.id).focus();
			break;
			
		case "btSearch":
		    Page_BlockSubmit = true;
			jf_OpenChildWin("AKM102C1.aspx","AKM102C1","700","400");
			break;
	}
}

function CallBack(argCallerId)
{
   if (argCallerId == "AKM102C1")
	{
		document.all["txStoreNo"].value = document.all["lbReturnValue"].options[0].value;
		
		document.all["txStoreNo2"].value = document.all["txStoreNo"].value;
        //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
		IsServerHandling = true;
		__doPostBack("","");
	}

}

function ClientOnLoad()
{
	ShowMsg();
	//1060216	Joe	1050087	二代系統升級
	// jf_CallWS("/Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);
	// jf_CallWS("lib/ak_lib.asmx", "CheckDataKeyUsed", false, null);
}

function OnWSResult(argResult)
{
    if(argResult.id == wsCheckDataKeyID)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.RtnBool == true)
				if ( window.confirm(jf_GetErrMsg(KeyExist)) == false)
				{
					Page_BlockSubmit = true;
					//1060216	Joe	1050087	二代系統升級，調整focus寫法
					//xDoc.txStoreNo.focus();
					$('#' + xDoc.txStoreNo.id).focus();
				}
				else
					Page_BlockSubmit = false;
			else
				Page_BlockSubmit = false;
		}
	}
	if(argResult.id == wsCheckDataKeyID0)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.RtnInt > 0)
				{  
				    alert("庫房代號："+document.all["txStoreNo"].value+"被其他資料使用中，不允許刪除!!")
					Page_BlockSubmit = true;
					//1060216	Joe	1050087	二代系統升級，調整focus寫法
					//xDoc.txStoreNo.focus();
					$('#' + xDoc.txStoreNo.id).focus();
				}
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
	document.all[argLabelId].textContent = obj.value;
}
function jf_CheckObjectValue()
{
	var strErr = "";
	var xFocusObj;
	if (xDoc.txStoreNo.value == "")
	{
		strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["庫房代號"]))+"\n";
		if (xFocusObj == null)
			xFocusObj = xDoc.txStoreNo;
	}
	if (jf_Trim(xDoc.txStoreName.value) == "" && xFocusObj == null)
	{
		strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["庫房名稱"]))+"\n";
		if (xFocusObj == null)
			xFocusObj = xDoc.txStoreName;	
			
	}
	
	//1060216	Joe	1050087	二代系統升級，避免刪除後庫房類別未選取，導致使用者儲存後發生錯誤的問題--S
	if(document.all.rb1.checked == false && document.all.rb2.checked == false)
	{
		alert('請選擇庫房類別');
		return false;
	}	
	//1060216	Joe	1050087	二代系統升級，避免刪除後庫房類別未選取，導致使用者儲存後發生錯誤的問題--E
	
	if (strErr !="")
	{
		jf_ShowMeg(strErr,"");
		//1060216	Joe	1050087	二代系統升級，調整focus寫法
		//xFocusObj.focus();
		$('#' + xFocusObj.id).focus();
		return false;
	}
	else
	{
		return true;
	}
}


