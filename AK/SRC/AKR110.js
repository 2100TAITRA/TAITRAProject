/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2007.04.11
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2009.08.11	Howard	0980391	新增sync()，由一級單位選擇完後，自動帶出二級單位
 * 2011.08.08	Jeff	1000635	修正由子視窗帶回批號作預覽時出現查無資料的錯誤訊息。
 * 2017.01.24	Kenny	1050087 二代公文系統相關修改
 * 2025.04.08   Daniel	1140132 增加匯出Excel與ODS按鈕
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060124	Kenny	[1050087]   二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1060124	Kenny	[1050087]   二代公文系統相關修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060124	Kenny	[1050087]   二代公文系統相關修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060124	Kenny	[1050087]   二代公文系統相關修改
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
		case "btAcpNo1":
		case "btAcpNo2":
			var strUrl = "";
			ActionWin = xObjectName;
			strUrl = "AKR330C2.aspx?rtnObj=lbReturnValue";
            //1060124	Kenny	[1050087]   二代公文系統相關修改；調整視窗大小
			//jf_OpenChildWin(strUrl, "AKR330C1", 500, 500);
            jf_OpenChildWin(strUrl, "AKR330C1", 800, 600);
			Page_BlockSubmit = true;
			break;
	}	
}

//1060124	Kenny	[1050087]   二代公文系統相關修改
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
	
	//1060124	Kenny	[1050087]   二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if (CheckAcpDate())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			//1060124	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		//1140408	1140133		Daniel	增加匯出Excel與ODS按鈕
		case "btOds":
		case "btExcel":
			if (CheckAcpDate())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1060124	Kenny	[1050087]   二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if(argCallerId=="AKR330C2")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			if(ActionWin == "btAcpNo1")
			{
				document.all["txAcpNo1"].value = document.all["lbReturnValue"].options[0].value;
			}
			else
			{
				document.all["txAcpNo2"].value = document.all["lbReturnValue"].options[0].value;
			}
			
			var oldlength = document.all["lbReturnValue"].length;
			for(i=0;i<oldlength;i++)
			{
				document.all["lbReturnValue"].remove(0);
			}
		//100808	Jeff	1000645		當子視窗帶回值時，清空日期欄位避免因為批號日期 與 上面時間不符合造成查無資料的錯誤發生
		document.all["txSDate"].value="";
		document.all["txEDate"].value="";
		}
		
	}
}

function ClientOnLoad()
{
	//0980812	0980391	Howard 二級單位下拉選單於POST_BACK後的初始化
	if(document.all.OdFlowType)
	{
		if(document.all.OdFlowType.value =="2")
			CheckddlIsPostBack();
	}	
}

function OnWSResult(argResult)
{
	 //0980812	0980391	Howard 初始化承辦單位二級科室下拉選單
	if(argResult.id == CallWS_ID_SECT)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			WSResult = argResult.value;		
			
			//95.11.27 950489 David
            //1060124	Kenny	[1050087]   二代公文系統相關修改
			//document.all["dlSect_Container"].className = "";
            document.all["dlSect_Container"].className = "custom-combobox";
			document.all["dlSect"].className = "";
			document.all["dlSect_Text"].className = "";
			document.all["dlSect_Text"].value = "";
			
			while(document.all.dlSect.options[0] != null)
			{
				document.all.dlSect.options[0]=null;				
			}
			
			if(WSResult.SecNo.length != 0)
			{
				//清除二級單位下拉選單的值
				ClearDL(document.all["dlSect"]);			
				
				if (document.all["dlUnit_Text"].value !="")
				{
					var Blank_Data = document.createElement("OPTION");
					Blank_Data.text = "(僅含一級單位)";
					Blank_Data.value = document.all["dlUnit"].options[document.all["dlUnit"].selectedIndex].value;				
					document.all.dlSect.options.add(Blank_Data);
											
					for(var i=0;i<WSResult.SecNo.length;i++)
					{
						var SectDropListChild = document.createElement("OPTION");
						SectDropListChild.text = WSResult.SecName[i];
						SectDropListChild.value = WSResult.SecNo[i];
						document.all.dlSect.options.add(SectDropListChild);
					}
					//0980924 設定下拉選單長度[0980457]-Jane
					if(document.all["dlSect"].options.length > 10)
						document.all["dlSect"].size = 10;
					else if(document.all["dlSect"].options.length ==1)
						document.all["dlSect"].size = 2;
					else
						document.all["dlSect"].size = document.all["dlSect"].options.length;
					/*if(document.all["dlSect"].options.length > 10)
					{
						document.all["dlSect"].size = 10;
					}*/
				}
			}
			else
			{				
				while(document.all.dlSect.options[0] != null)
				{
					document.all.dlSect.options[0]=null;				
				}	
			}
		}				
    }
	if(argResult.id == CallWS_ID_FROM_SECT)
    { //Howard	初始化歸檔單位二級科室
		if(jf_IsWebServiceSuccess(argResult))
		{	
			WSResult = argResult.value;		
	
            //1060124	Kenny	[1050087]   二代公文系統相關修改
			//document.all["dlFromSect_Container"].className = "";
            document.all["dlFromSect_Container"].className = "custom-combobox";
			document.all["dlFromSect"].className = "";
			document.all["dlFromSect_Text"].className = "";
			document.all["dlFromSect_Text"].value = "";
			
			while(document.all.dlSect.options[0] != null)
			{
				document.all.dlSect.options[0]=null;				
			}
			ClearDL(document.all["dlFromSect"]);
			
			if(WSResult.SecNo.length != 0)
			{
				//清除二級單位下拉選單的值
				ClearDL(document.all["dlFromSect"]);			
				if(document.all["dlFromDept_Text"].value !="")
				{
					var Blank_Data = document.createElement("OPTION");
					Blank_Data.text = "(僅含一級單位)";
					Blank_Data.value = document.all["dlFromDept"].options[document.all["dlFromDept"].selectedIndex].value;				
					document.all.dlFromSect.options.add(Blank_Data);
										
					for(var i=0;i<WSResult.SecNo.length;i++)
					{
						var SectDropListChild = document.createElement("OPTION");
						SectDropListChild.text = WSResult.SecName[i];
						SectDropListChild.value = WSResult.SecNo[i];
						document.all.dlFromSect.options.add(SectDropListChild);
					}
					//0980924 設定下拉選單長度[0980457]-Jane
					if(document.all["dlFromSect"].options.length > 10)
						document.all["dlFromSect"].size = 10;
					else if(document.all["dlFromSect"].options.length ==1)
						document.all["dlFromSect"].size = 2;
					else
						document.all["dlFromSect"].size = document.all["dlFromSect"].options.length;
					/*if(document.all["dlFromSect"].options.length > 10)
					{
						document.all["dlFromSect"].size = 10;
					}*/
				}	
			}
			else
			{				
				while(document.all.dlFromSect.options[0] != null)
				{
					document.all.dlFromSect.options[0]=null;				
				}	
			}
		}				
    }
	//呼叫承辦單位二級下拉選單--END
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1060124	Kenny	[1050087]   二代公文系統相關修改
	//document.all[argLabelId].innerText = obj.value;
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

//檢查點收日期:起訖不可皆為空白
function CheckAcpDate()
{
	var bRtnbool = true;
	var strErrMsg="";
	if (document.all["txAcpNo1"].value == "" && document.all["txAcpNo2"].value == "" && document.all["txSDate"].value == "" && document.all["txEDate"].value == "")
	{
        //1060124	Kenny	[1050087]   二代公文系統相關修改
		//document.all["txSDate"].focus();
		$('#txSDate').focus();
		strErrMsg = "點收日期 點收批號 至少輸入一項";
	}
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}
	
	return bRtnbool;
}

/*****************************************************************************************
							其	他	共	用	function
******************************************************************************************/
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
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1060124	Kenny	[1050087]   二代公文系統相關修改
            //document.all[argObj].focus();
            $('#'+argObj).focus();
		}
	}
}
//0980812	0980391	HOWARD 修正可支援查詢二級單位之點收清單--START
//取得二級單位
var CallWS_ID_FROM_SECT;
var CallWS_ID_SECT;
function SyncDL(argDLObj)
{	
	var bAction = true;
	var strDept = new Array();
	var argObjText = argDLObj+"_Text";
	var argHObjValue ="H_"+argDLObj+"_Value";
	var argHObjText  ="H_"+argDLObj+"_Text";
	var bDept = false;
	var bSect = false;
	
	//判斷使用者輸入之單位是否存在下拉選單位
	for ( var i = 0 ; i < document.all[argDLObj].length ; i++)
	{
		if(document.all[argDLObj].options[i].text == document.all[argObjText].value )
		{
			document.all[argDLObj].selectedIndex = i;
			bDept = true;
			break;
		}
	}
	if (!bDept)
	{
		document.all[argDLObj].selectedIndex = -1;
	}
	if(argDLObj =="dlUnit" )
	{
		if(document.all[argDLObj].selectedIndex == -1)
		{
			if (document.all[argObjText].value !="")
			{
				ClearDL(document.all.dlSect);
				return;
			}
		}
	}
	if(argDLObj =="dlFromDept")
	{
		if(document.all[argDLObj].selectedIndex == -1)
		{
			if (document.all[argObjText].value !="")
			{
				ClearDL(document.all.dlFromSect);
				return;
			}
		}
	}
	if(argDLObj == "dlUnit"  || argDLObj =="dlFromDept" )
	{
		if(document.all[argDLObj].selectedIndex != -1)
		{
			strDept = document.all[argDLObj].options[document.all[argDLObj].selectedIndex].value.split(':');	
			if(argDLObj == "dlUnit")
			{
				document.all["H_dlSect_Value"].value = "";
				document.all["H_dlSect_Text"].value = "";
			}
			if(argDLObj =="dlFromDept")
			{
				document.all["H_dlFromSect_Value"].value = "";
				document.all["H_dlFromSect_Text"].value = "";
			}
		}
		else
			bAction = false;
	}
	if(argDLObj == "dlSect" || argDLObj =="dlFromSect")	
	{	
		//若為二級單位下拉選單
		if(document.all[argDLObj].selectedIndex != -1 && jf_Trim(document.all[argObjText].value) != "" )
		{	
			document.all[argHObjValue].value = document.all[argDLObj].options[document.all[argDLObj].selectedIndex].value;
			document.all[argHObjText].value  = document.all[argDLObj].options[document.all[argDLObj].selectedIndex].text;		
		}
		else if(jf_Trim(document.all[argObjText].value) == "")
		{
			document.all[argHObjValue].value = "";
			document.all[argHObjText].value = "";
		}
		return;
	}
	//取二級單位用
	var param1 = new Array(3);
	param1[0] = false;
	param1[1] = true;
	param1[2] = jf_Trim(strDept[0]);
	
	var RtnObjSect;	
	if(argDLObj == "dlUnit" && bAction)
	{	
		RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDepts",false,param1);
		CallWS_ID_SECT = RtnObjSect.id;
		OnWSResult(RtnObjSect);
	}
	if(argDLObj =="dlFromDept" && bAction)
	{
		RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDepts",false,param1);
		CallWS_ID_FROM_SECT = RtnObjSect.id;
		OnWSResult(RtnObjSect);
	}
}
function CheckddlIsPostBack()
{
	var arrSect = new Array(2);
	var arrFrom = new Array(2);
	//判斷承辦單位二級單位下拉選單
	
	if(document.all["H_dlFromSect_Text"].value !="")
	{
		arrFrom[0] = jf_Trim(document.all["H_dlFromSect_Text"].value);
		arrFrom[1] = jf_Trim(document.all["H_dlFromSect_Value"].value);
		SyncDL("dlFromDept");
		document.all["dlFromSect_Text"].value		= arrFrom[0];
		document.all["H_dlFromSect_Text"].value		= arrFrom[0];
		document.all["H_dlFromSect_Value"].value	= arrFrom[1];
	}
	if(document.all["H_dlSect_Text"].value !="")
	{	
		arrSect[0] = jf_Trim(document.all["H_dlSect_Text"].value);
		arrSect[1] = jf_Trim(document.all["H_dlSect_Value"].value);
		SyncDL("dlUnit");
		document.all["dlSect_Text"].value		= arrSect[0];
		document.all["H_dlSect_Text"].value		= arrSect[0];
		document.all["H_dlSect_Value"].value	= arrSect[1];
	}
}
//將DropDownList裡的item清除
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;
}

//0980812	0980391	HOWARD 修正可支援查詢二級單位之點收清單--END

/*************************************************
		測試程式
**************************************************/
function akjf_DeptCheck()
{}