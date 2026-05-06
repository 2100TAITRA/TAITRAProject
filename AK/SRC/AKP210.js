/*
DATE 	SA		PRG		MGR_NO	DESC
1060207	Cloud	Joe		1050087	二代升級
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060207	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
window.onunload = jf_WindowOnUnLoad;


//1060207	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].innerText != "")
	// alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();	

//1060207	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060207	Joe	1050087	二代系統升級
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

//1060207	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1060207	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			if(document.all.txDate.value=="")
			{
				jf_ShowMeg("統計月份欄位不可空白","不可空白欄位");
				//1060207	Joe	1050087	二代系統升級，調整focus寫法
				//document.all.txDate.focus();
				$('#' + txDate.id).focus();				
				Page_BlockSubmit = true;										
			}
			else
			{
				if(!CheckDate())
					Page_BlockSubmit = true;
				else
				{
					var DateString = document.all.txDate.value.substring(0,3)+"年"+document.all.txDate.value.substring(3,5)+"月";
					jf_SetStatusMsg(DateString+"資料統計中");
				}
			}
			//1060207	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	
}

function OnWSResult(argResult)
{
    var WSResult = new Array(3);
    var ErrMsg = "";

	if(event.result.error)    
	    alert(event.result.errorDetail.string);
	alert(event.result.value);
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}


function ReturnValue()
{
	if (document.all["txMode"].value == "EXEC")
	{    
		opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].text = document.all["txMaxFILECALC"].value;
	    opener.document.all.lbReturnValue.options[0].value = document.all["txMaxFILECALC"].value;
	    opener.window.CallBack("AKP210");
	}

}

function ReturnValue2(argMaxDate)
{
	if (document.all["txMode"].value == "EXEC")
	{    
		opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].text = argMaxDate;
	    opener.document.all.lbReturnValue.options[0].value = argMaxDate;
	    opener.window.CallBack("AKP210");
	}
	//Ericks start 2005/10/13
	var strRetrun = document.all["AKRReturn"].value;
	if (opener != null)
	{
		try
		{
			if (strRetrun != null && strRetrun!= null)
			{	
				opener.document.all.lbReturnValue.length = 1;
				opener.document.all.lbReturnValue.options[0].text = strRetrun;
				opener.document.all.lbReturnValue.options[0].value = strRetrun;
				opener.window.CallBack("AKP210sp");
			}
		}
		catch(e)
		{
		}
	}	
	//Ericks end 2005/10/13
}


/**********************************onblur Function****************************************************/
function CheckDate()
{
	var InputDate=document.all.txDate.value+"01";
	
	if(document.all.txDate.value.length<5)
	{
		Page_BlockSubmit = true;
		jf_ShowMeg("請輸入三碼年加兩碼月","輸入格式錯誤");
		//1060207	Joe	1050087	二代系統升級，調整focus寫法
		//document.all.txDate.focus();
		$('#' + txDate.id).focus();			
		return false;
	}
	else if(!jf_CheckCDATE(InputDate))
	{
		Page_BlockSubmit = true;
		jf_ShowMeg("請輸入正確日期範圍","輸入格式錯誤");
		//1060207	Joe	1050087	二代系統升級，調整focus寫法
		//document.all.txDate.focus();
		$('#' + txDate.id).focus();		
		return false;
	}	
	else
	{
		return true;
	}
}

function jf_WindowOnUnLoad()
{
	//Ericks start 2005/10/13
	//ReturnValue();		
	//Ericks end 2005/10/13
}