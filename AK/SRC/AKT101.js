/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1070202		Joe		1050087	二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var IsServerHandling = new Boolean();
IsServerHandling = false;
var xDoc=document.all;

//1070202	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1070202	Joe	1050087	二代系統升級
// if (document.all["ValidationSummary1"].textContent != "")
	// alert(document.all["ValidationSummary1"].textContent);
jf_ShowValidator();

//1070202	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1070202	Joe	1050087	二代系統升級
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


//1070202	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1070202	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		
		case "btMove":
		    if(jf_CheckObjectValue())
		    {
		       if(xDoc.dlMoveoStore.selectedIndex==xDoc.dlMoveiStore.selectedIndex)
		       {
		         alert("轉出庫房，轉入庫房不可相同!");
		         Page_BlockSubmit = true;
		       }else
		       {
		         if(jf_Trim(xDoc.txBegFileYear.value) != "" && jf_Trim(xDoc.txEndFileYear.value) == "")
		         {
		            xDoc.txEndFileYear.value=xDoc.txBegFileYear.value;
		         }
		         else if(jf_Trim(xDoc.txBegFileYear.value) == "" && jf_Trim(xDoc.txEndFileYear.value) != "")
		         {
		            xDoc.txBegFileYear.value=xDoc.txEndFileYear.value;
		         }
		         
		         if(jf_Trim(xDoc.txBegFileCls.value) != "" && jf_Trim(xDoc.txEndFileCls.value) == "")
		         {
		            xDoc.txEndFileCls.value=xDoc.txBegFileCls.value;
		         }
		         else if(jf_Trim(xDoc.txBegFileCls.value) == "" && jf_Trim(xDoc.txEndFileCls.value) != "")
		         {
		            xDoc.txBegFileCls.value=xDoc.txEndFileCls.value;
		         }
		         if(jf_Trim(xDoc.htxBegClsKey.value) != "" && jf_Trim(xDoc.htxEndClsKey.value) == "")
		         {
		            xDoc.htxEndClsKey.value=xDoc.htxBegClsKey.value;
		         }
		         else if(jf_Trim(xDoc.htxBegClsKey.value) == "" && jf_Trim(xDoc.htxEndClsKey.value) != "")
		         {
		            xDoc.htxBegClsKey.value=xDoc.txEndClsKey.value;
		         }
		         if(jf_Trim(xDoc.txBegKeepYear.value) != "" && jf_Trim(xDoc.txEndKeepYear.value) == "")
		         {
		            xDoc.txEndKeepYear.value=xDoc.txBegKeepYear.value;
		         }
		         else if(jf_Trim(xDoc.txBegKeepYear.value) == "" && jf_Trim(xDoc.txEndKeepYear.value) != "")
		         {
		            xDoc.txBegKeepYear.value=xDoc.txEndKeepYear.value;
		         }
		         Page_BlockSubmit = false;
		       }
		    
		    }else Page_BlockSubmit = true;
			//1070202	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

}
function jf_CheckObjectValue()
{
	var strErr = "";
	var xFocusObj;
	
	if (jf_Trim(xDoc.txMoveDate.value) == "" )
	{
		strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["搬移日期"]))+"\n";
		if (xFocusObj == null)
			xFocusObj = xDoc.txMoveDate;	
			
	}
	if (xDoc.dlMoveoStore.selectedIndex == 0 || xDoc.dlMoveoStore.selectedIndex == -1)
	{
		strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["轉出庫房"]))+"\n";
		if (xFocusObj == null)
			xFocusObj = xDoc.dlMoveoStore;
	}
	if (xDoc.dlMoveiStore.selectedIndex == 0 || xDoc.dlMoveiStore.selectedIndex == -1)
	{
		strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["轉入庫房"]))+"\n";
		if (xFocusObj == null)
			xFocusObj = xDoc.dlMoveiStore;
	}
	if (jf_Trim(xDoc.txBegFileYear.value) == "" && jf_Trim(xDoc.txEndFileYear.value) == "" && jf_Trim(xDoc.txBegFileCls.value) == "" && jf_Trim(xDoc.txEndFileCls.value) == "")
	{
		strErr += FormatStr(jf_GetErrMsg(CustErr), new Array(["年度號,分類號至少輸入一項!"]))+"\n";
		if (xFocusObj == null)
			xFocusObj = xDoc.txBegFileYear;	
			
	}
		
	if (strErr !="")
	{
		jf_ShowMeg(strErr,"");
		//1070202	Joe	1050087	二代系統升級
		// document.all["txRptNo"].focus();
		$('#' + xFocusObj.id).focus();
		return false;
	}
	else
	{
		return true;
	}
}
function TbOnBlur(argTextBox)
{
	//alert(event.srcElement.id)
	var xObjectName = "";
	if(document.activeElement!=null)
		xObjectName = document.activeElement.id;
		
		
	//年度號
	if (argTextBox=="txBegFileYear")
	{
		if (document.all["txBegFileYear"].value=="")
		{return;}
		else
		{
			document.all["txBegFileYear"].value=jf_PADL(document.all["txBegFileYear"].value,3,"0");
		}
	}
	if (argTextBox=="txEndFileYear")
	{
		if (document.all["txEndFileYear"].value=="")
		{return;}
		else
		{
			document.all["txEndFileYear"].value=jf_PADL(document.all["txEndFileYear"].value,3,"0");
		}
	}
	
	//分類號
	if (argTextBox=="txBegFileCls")
	{
		if (document.all["txBegFileCls"].value=="")
		{
			return;
		}
		var KeyValue1 = new Array(1);
		
		KeyValue1[0] = document.all["txBegFileCls"].value;
		var param1 = new Array(1);
		param1[0] = KeyValue1;
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param1);
		iCallID_CLS = RtnObj.id;
		OnWSResult(RtnObj);
		
		
	}
	if (argTextBox=="txEndFileCls")
	{
		if (document.all["txEndFileCls"].value=="")
		{
			return;
		}
		var KeyValue1 = new Array(1);
		
		KeyValue1[0] = document.all["txEndFileCls"].value;
		var param1 = new Array(1);
		param1[0] = KeyValue1;
		RtnObj = jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,param1);
		iCallID_CLS2 = RtnObj.id;
		OnWSResult(RtnObj);
		
		
	}
}
function ClientOnLoad()
{
	jf_CallWS("lib/AK_LIB.asmx","GetCKA",false,null);
}

var iCallID_CLS ;
var iCallID_CLS2 ;

function OnWSResult(argResult)
{
    var WSResult;
	var ErrMsg = "";
	
	
	
    if(argResult.id == iCallID_CLS)  //分類號 onblur
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			document.all["htxBegClsKey"].value = WSResult.CLS_KEY;
						
		}
		else
		{
			//alert("無此分類號!")
			//1070202	Joe	1050087	二代系統升級
			// document.all["txBegFileCls"].focus();
			$('#txBegFileCls').focus();
		}
    }
    if(argResult.id == iCallID_CLS2)  //分類號 onblur
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			WSResult = argResult.value;
			document.all["htxEndClsKey"].value = WSResult.CLS_KEY;
						
		}
		else
		{
			//alert("無此分類號!")
			//1070202	Joe	1050087	二代系統升級
			// document.all["txEndFileCls"].focus();
			$('#txEndFileCls').focus();
		}
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}

