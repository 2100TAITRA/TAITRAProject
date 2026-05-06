/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2008.06.30	Cola	0970600	AKR870新增書號onblur帶出調用時間
 * 2009.02.04	Howard	0990059	書號onblur時帶出該狀態
 * 2013.10.1	Eileen	1020705	修改檢核時，ckForm1與ckForm2未勾選時需BLOCKSUBMIT
 * 2017.04.20   Joe		1050087 二代升級
 * 1140423	Daniel		1140246	增加匯出Excel與ODS功能
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060420	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060420	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();



//1060420	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060420	Joe	1050087	二代系統升級
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
		case "btKeyHelp": //申請書號查詢
		    var pUrl = "";
		    pUrl = "AKS501.aspx?"
		   	pUrl += "k1=";
		   	pUrl += "k2=";
			pUrl +="&k3=&rtnObj=lbReturnValue";
			jf_OpenChildWin(pUrl, "AKS501", 750, 500);
			Page_BlockSubmit=true;
			break;
	}	
}

//1060420	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	var ErrMsg = "";
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1060420	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			jf_ToolBarSubmit();
			break;
		case "btPrint":
		    if(document.all.txApplyNo.value=="")
		    { 
		    Page_BlockSubmit=true;alert("申請書號不可空白!");
			//1060420	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txApplyNo.focus();
			$('#' + document.all.txApplyNo.id).focus();
		    }
		    else
		    {    
				if(document.all.ckForm1.checked)
				{    
					if(document.all.txAppointDate.value=="")
					{
						 Page_BlockSubmit=true;
						 alert("約定應用日期不可空白!");
						//1060420	Joe	1050087	二代系統升級，調整focus寫法
						//document.all.txAppointDate.focus();
						$('#' + document.all.txAppointDate.id).focus();
					}
					else 
						Page_BlockSubmit=false;
				}
				
				else
				{
					if(document.all.ckForm2.checked) 
					{
						Page_BlockSubmit=false;
					} 
					else 
					{
						Page_BlockSubmit=true;
					}
				}
		    }
			//1060420	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1140423	1140264		Daniel	增加匯出Excel與ODS按鈕
		case "btOds":
		case "btExcel":
		case "btPreview":
			if(document.all.txApplyNo.value=="")
			{
				Page_BlockSubmit=true;alert("申請書號不可空白!");
				//1060420	Joe	1050087	二代系統升級，調整focus寫法
				//document.all.txApplyNo.focus();
				$('#' + document.all.txApplyNo.id).focus();
			}
		    else
		    {    
				if(document.all.ckForm1.checked)
				{    
					if(document.all.txAppointDate.value=="")
					{
						Page_BlockSubmit=true;
						ErrMsg = "約定應用日期不可空白!";
						//document.all.txAppointDate.focus();
					}
					else 
					{
						Page_BlockSubmit=false;
					}
				}
				if(document.all.ckForm2.checked)
				{
					
					if(document.all.txTime.value=="")
					{
						Page_BlockSubmit=true;
						ErrMsg = "調用時間不可空白!";
						//document.all.txAppointDate.focus();
					}
					else if(document.all["txTimeS"].value == "")
					{
						Page_BlockSubmit=true;
						ErrMsg = "起算時間不可空白!";
						//document.all.txAppointDate.focus();
					}
					else 
					{
						Page_BlockSubmit=false;
					}						
				}
				//1021001	Eileen	修改判斷條件
				//else
				if( !document.all.ckForm1.checked && !document.all.ckForm2.checked )
				{
					Page_BlockSubmit=true;
				}			
		    }
		    if(ErrMsg != "")
		    {
				alert(ErrMsg);
				Page_BlockSubmit = true;
			}
			//1060420	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}
var wsCheckDataKeyID ;
var rtnObj;
function txApplyNoOnblur()
{
	if(document.all.txApplyNo.value !="")
	{
	var argsField	= new Array(5);
	var TableName	= "APPLY_MAIN";
	var WhereField	= new Array(2);
	var WhereCon	= new Array(2);
	//0990204	Howard	新增一回傳欄位
	//var RtnField	= new Array(1);
	var RtnField	= new Array(3);
	var Order		= new Array(1);
				
	WhereField[0]	= "APPLY_NO";
	WhereCon[0]		= document.all["txApplyNo"].value;
	WhereField[1]	= "SOURCE_ORGNO";
	WhereCon[1]		= document.all["lbORGNO"].textContent;
	RtnField[0]		= "PUB_NAME";
	RtnField[1]		= "APPLY_TIME";//[0970600]Add by Cola 額外新增傳回調用時間
	RtnField[2]		= "STATUS";//[0990059]Add by Howard 額外新增傳回申請狀態
	Order[0]		= "";
		
	argsField[0]	= TableName;
	argsField[1]	= WhereField;
	argsField[2]	= WhereCon;
	argsField[3]	= RtnField;
	argsField[4]	= Order;
	
	rtnObj=jf_CallWS("Lib/AK_LIB.asmx","GetFieldValue",false,argsField);
	
	wsCheckDataKeyID = rtnObj.id;
	//document.all.lbPubName.textContent=rtnObj.value.RtnField0[0];
	OnWSResult(rtnObj);
	}
	
}
function OnWSResult(argResult)
{
   if (argResult.id == wsCheckDataKeyID)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (!argResult.value.ErrorClass.IsErr)
			{
				//1060420	Joe		1050087		二代升級將TextLabel改為Label
				// document.all.txPubName.value=rtnObj.value.RtnField0[0];
				document.all.lbPubName.textContent=rtnObj.value.RtnField0[0];
				//[0970600]Add by Cola 額外新增傳回調用時間
				document.all.txTime.value=rtnObj.value.RtnField1[0];
				//[0990059]Add by Howard 額外新增傳回申請狀態
				if(rtnObj.value.RtnField2[0] == "9")
					document.all.cbRvcMoney.checked = true;
				else
					document.all.cbRvcMoney.checked = false;
			}		
		}
		else
			//1060420	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txApplyNo.focus();
			$('#' + document.all.txApplyNo.id).focus();
    }
}

function ClientOnLoad()
{
	//jf_CallWS("Lib/AK_LIB.asmx","GetFieldValue",false,null);
}


function CheckAppointDate()
{
    var strAppointDate;
	if(document.all.txAppointDate.value == "")
	{
		//document.all.txAppointDate.focus();
		//jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["約定應用日期"])),"");
		return ;
	}
	strAppointDate=document.all.txAppointDate.value;
	strAppointDate = jf_PADL(strAppointDate,7,"0");
	document.all.txAppointDate.value = strAppointDate;
	if (!jf_CheckCDATE(strAppointDate))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["約定應用日期"])),"");
		//1060420	Joe	1050087	二代系統升級，調整focus寫法
		//document.all.txAppointDate.focus();
		$('#' + document.all.txAppointDate.id).focus();
		return ;
	}
	return true;
	
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
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function CallBack(argCallerId)
{
	if (argCallerId == "AKS501")
	{
		document.all["txApplyNo"].value = document.all["lbReturnValue"].options[0].text;
		
		//old text change postback
		//document.all["txApplyNoPostBack"].value = document.all["lbReturnValue"].options[0].text;
		
		//回傳值為鍵值時，觸動TextChange事件
		//__doPostBack();//for .NET Framework 1.0
		//__doPostBack("","");//for .NET Framework 1.1

		//new template submit
		//Marked by Cola AKR870根本沒有btOpen，僅有preview / print，但不知user要選什麼，因此不先postback
		//jf_OpenButtonSubmit();
		//Add by Cola 呼叫Text Onblur事件，帶出相關欄位
		txApplyNoOnblur();
		//1060420	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txApplyNo"].focus();
		$('#txApplyNo').focus();
	}
	
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;	

}

function CheckDateRange()
{
	var Time = document.all["txTimeS"].value;
	var hh = Time.substring(0,2);
	var mm = Time.substring(2);
	var bRtn = true;
	
	if(parseInt(hh) > 23 )
		bRtn = false;	
	if(parseInt(mm) > 59)
		bRtn = false;
		
	if(!bRtn)
		alert("時間範圍有誤");
		
}
