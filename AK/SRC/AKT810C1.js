/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.08.24
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1050803	Kenny	1050087 二代公文系統相關修改
 * 2016.10.19	Joe		1050087	二代修正配合行動平台
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050803	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050803	Kenny	[1050087]   二代公文系統相關修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();


//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
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

//1050803	Kenny	[1050087]   二代公文系統相關修改
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
	
	//1050803	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = !ConfirmSave();
			//1050803	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExit":
			Page_BlockSubmit = true;
			window.close();
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
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

//1050803	Kenny	[1050087]   二代公文系統相關修改；移除無用CODE--Start--
//function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
//{
//	var index	= document.all[argDDLId].selectedIndex;
//	var obj		= document.all[argDDLId].options[index];
//	
//	document.all[argTextBoxId].value = obj.text;
//	document.all[argLabelId].innerText = obj.value;
//}
//1050803	Kenny	[1050087]   二代公文系統相關修改；移除無用CODE--End--

function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function ConfirmSave()
{
	var bRtnBool = true;
	var bLeast = false;
	var bEmpty = true;
	var strReason = "";
	var ErrMsg = "";
	//David 95.10.03
	
	if(document.all["txMode"].value == "1")
	{
		if(document.all["dlKeepNo"].selectedIndex == "0")
		{
			ErrMsg = "請選擇保存現況";	
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])),"");
			bRtnBool = false;			
		}
		else
			bRtnbool = true;
	}
		
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if ((document.all["dg1__ctl"+iRow+"_dlBorType"].selectedIndex != 0) && (bLeast==false))
			bLeast = true;
		if (document.all["dg1__ctl"+iRow+"_dlBorType"].selectedIndex == 2)
			bEmpty = false;
	}
	
	//至少要有一筆明細資料
	if (!bLeast)
	{
        //1050803	Kenny	[1050087]   二代公文系統相關修改
        //document.all["dg1__ctl2_dlBorType"].focus();
        $('#dg1__ctl2_dlBorType').focus(); 
        
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少要變更一筆"])),"");
		bRtnBool = false;
	}
	else
	{
		//異動別有展期，展期原因 & 原因說明 不可空白
		if (!bEmpty)
		{
			if (jf_Trim(document.all["txDesc"].value) == "")
			{
				strReason = "原因說明 不可為空白" + "\n" + strReason;
                //1050803	Kenny	[1050087]   二代公文系統相關修改
                //document.all["txDesc"].focus();
                $('#txDesc').focus(); 
			}
			if (document.all["dlReason"].selectedIndex == 0)
			{
				strReason = "展期原因 不可為空白" + "\n" + strReason;
                //1050803	Kenny	[1050087]   二代公文系統相關修改
                //document.all["dlReason"].focus();
                $('#dlReason').focus(); 
			}
			if (strReason != "")
			{
				strReason = "異動別有展期，" + "\n" + strReason;
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strReason])),"");
				return false;
			}
		}
	}
	
	return bRtnBool;
}

//調案期限日期格式檢查
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
            //1050803	Kenny	[1050087]   二代公文系統相關修改
			//document.all[argObj].focus();
            $('#'+argObj).focus(); 
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		}
	}
}

function BorTypeOnChange(objName,Count,TargetDg)
{	
	if(document.all[objName].selectedIndex == "1")
	{	
        //1050803	Kenny	[1050087]   二代公文系統相關修改；調整className 為小寫--Start--
		//document.all["Label7"].className = "Hide";
		//document.all["Label2"].className = "Hide";
		//document.all["dlReason"].className = "Hide";
		//document.all["Label4"].className = "Hide";
		//document.all["txDesc"].className = "Hide";
        
        document.all["Label7"].className = "hide";
		document.all["Label2"].className = "hide";
		document.all["dlReason"].className = "hide";
		document.all["Label4"].className = "hide";
		document.all["txDesc"].className = "hide";	
        //1050803	Kenny	[1050087]   二代公文系統相關修改；調整className 為小寫--End--
		
		document.all["Label8"].className = "";
		document.all["Label9"].className = "";
		document.all["dlKeepNo"].className = "";		
		document.all["txMode"].value = "1";
	}
	if(document.all[objName].selectedIndex == "2")
	{
		document.all["Label7"].className = "";
		document.all["Label2"].className = "";
		document.all["dlReason"].className = "";
		document.all["Label4"].className = "";
		document.all["txDesc"].className = "";		
		
        //1050803	Kenny	[1050087]   二代公文系統相關修改；調整className 為小寫--Start--
		//document.all["Label8"].className = "Hide";
		//document.all["Label9"].className = "Hide";
		//document.all["dlKeepNo"].className = "Hide";
        
        document.all["Label8"].className = "hide";
		document.all["Label9"].className = "hide";
		document.all["dlKeepNo"].className = "hide";
        //1050803	Kenny	[1050087]   二代公文系統相關修改；調整className 為小寫--End--
		document.all["txMode"].value = "2";
	}
	dlBorType1OnChange(objName,Count);
}

function dlBorType1OnChange(obj,dgRowCount)
{	
	var ReBorCount_ID = jf_Assemble(obj,"_dlBorType","lbReBorCnt");
	
	//var temp = parseInt(document.all["dg1__ctl"+dgRowCount+"_lbReBorCnt"].innerText);
	var temp = parseInt(document.all["txReBorCount"].value);
	
	if(document.all["dg1__ctl"+dgRowCount+"_dlBorType"].selectedIndex==2 && temp >= 3)	
	{
		alert("本調案單展期次數已達三次，不允許再次展期");
		document.all["dg1__ctl"+dgRowCount+"_dlBorType"].selectedIndex = 0;
        //1050803	Kenny	[1050087]   二代公文系統相關修改
        //document.all["dg1__ctl"+dgRowCount+"_dlBorType"].focus();
        $('#dg1__ctl'+dgRowCount+'_dlBorType').focus(); 
	}
}