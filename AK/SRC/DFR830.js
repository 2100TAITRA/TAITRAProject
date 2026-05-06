/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號			概要
 * -------------------------------------------------------------------------------------------------
 * 2013.12.12	Eric		1021003	新增報表顯示內容：程式名稱和執行功能
 * 1060411      Justin      1050087 二代公文修改
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1060411 Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1060411 Justin [1050087] 二代公文修改 
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060411 Justin [1050087] 二代公文修改
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

//1060411 Justin [1050087] 二代公文修改 
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
	
    //1060411 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	//1021212	Eric	1021003	拿掉統計功能
	/*
		case "btStatic":
			var xUrl = "AKP210.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"AKP210",760,500);
			Page_BlockSubmit = true;
			break;
	*/
		case "btPrint":
		case "btPreview":
			if(checkBeforRpt())
			{
				jf_ShowWaitState();
				IsServerHandling = true;
				//1021212	Eric	1021003	將Page_BlockSubmit設定為false
				Page_BlockSubmit = false;
			}
			else
			    Page_BlockSubmit = true;
		    //1060411 Justin [1050087] 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="AKP210")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
  			if (strMaxUseDate == "")
  			    //1060411 Justin [1050087] 二代公文修改
  			    //document.all["lbMaxYear"].innerText = "您尚未執行過統計作業";
  			    document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			else
  			    //document.all["lbMaxYear"].innerText = "目前統計最大年月："+
  			    document.all["lbMaxYear"].textContent = "目前統計最大年月：" +
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
		}
	}
}

function ClientOnLoad()
{
    ShowMsg();
    /*1060411 Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("Template/lib/Sys.asmx","GetCodeName", false, null);*/
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060411 Justin [1050087] 二代公文修改 
    //document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}
/*執行產出報表前檢查
/**********************************************************************************************
 Name : function checkBeforRpt()
 Desc : 執行產出報表前檢查
 Param: none
 Rtn  : bool(是否通過檢查)
 **********************************************************************************************/
function checkBeforRpt()
{
	//檢查使用日期與公文文號至少要輸入一項條件
	if(document.all.txUseDate1.value == "" && document.all.txUseDate2.value == "" 
	&& document.all.txDocNo1.value == "" && document.all.txDocNo2.value == "") 
	{
		focusControl("txUseDate1");	
		jf_ShowMeg("使用日期與公文文號至少要輸入一項條件","")
		return false;
	}	
	return true;
}

//檢查公文文號是否存在
function checkDocNoExist(argFieldName)
{
	//不處理空白值
	if(document.all[argFieldName].value == "")
		return ;

	var KeyName = new Array(1)
	KeyName[0] = "DOC_NO";
	var KeyValue = new Array(1);
	KeyValue[0] = document.all[argFieldName].value;
	var RtnFldName = new Array(1);
	RtnFldName[0] = "DOC_NO";
	
	var param = new Array(5);
	param[0] = "DOC_MAIN";
	param[1] = KeyName;
	param[2] = KeyValue;
	param[3] = RtnFldName;
	param[4] = "";
	callObj = jf_CallWS("Template/lib/Sys.asmx","GetCodeName", false, param);
	if(!jf_IsWebServiceSuccess(callObj))
	{
		//排除WebService本身錯誤
		if(!callObj.error)
			focusControl(argFieldName);					
	}

}
//檢查日期格式是否正確
function checkDateCorrect(argFieldName)
{
	if(document.all[argFieldName].value == "")
		return;
	
	document.all[argFieldName].value = jf_PADL(document.all[argFieldName].value,7,'0');
	if(!jf_CheckCDATE(document.all[argFieldName].value))
	{
		jf_ShowMeg("日期格式錯誤","");
		focusControl(argFieldName);
	}
}


//依照傳進之控制項名稱onfocus
function focusControl(argControlName)
{
    //1060411 Justin [1050087] 二代公文修改
    //document.all[argControlName].focus();
    $('#' + argControlName).focus();
}

function UserOnBlur(Userobj)
{
	if(Userobj.options == null)
	{
		document.all["txUserValue"].value = "";
		return;
	}
	if(Userobj.options.length == 0)
	{
		document.all["txUserValue"].value = "";
		return;
	}
	var index = Userobj.selectedIndex;
	if(index == -1)
	{
		document.all["txUserValue"].value = "";
		return;
	}
	document.all["txUserValue"].value =  Userobj.options[index].value;
}