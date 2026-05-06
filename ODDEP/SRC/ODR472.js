/*
DATE	SA		PRG		MGR_NO			DESC
1001109 Yvonne  Ivory   1000772			新增公文性質,業務類別,匯出EXCEL功能,報表以承辦單位分頁
1031112	Leslie	Kevin_C	1020726			於__doPostBack前加上IsServerHandling=true,避免重複執行
1050518	Kevin	Joe		1050087 		二代系統升級
1050520	KEVIN	JOE		1050087			二代系統升級，調整focus寫法
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050518	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050518	Joe	1050087	二代系統升級
	//if (document.all["ValidationSummary1"].textContent != "")
	//	alert(document.all["ValidationSummary1"].textContent);
	jf_ShowValidator();	
}

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

//1050518	Joe	1050087	二代系統升級，傳入參數event
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
	
	//1050518	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		/*
		case "btSearch":
			Page_BlockSubmit = !CheckCondition();
			jf_ToolBarSubmit();
			break;
		case "btPrint":
		case "btPreview":
			Page_BlockSubmit = !CheckCondition();
			jf_ToolBarSubmit();
			break;
			*/
		// 1001109 Ivory [1000772] 新增匯出EXCEL功能
		case "btSearch":
		case "btExcel":
		case "btPrint":
		case "btPreview":	
			Page_BlockSubmit = !CheckCondition();
			//1050518	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function ClientOnLoad()
{
	ShowMsg();
	if (document.all.DG2_OPEN.value == "N")
	{
		document.getElementById("ck").style.display="none";//隱藏DIV
		MainTable.style.height = 168 ;
		tdBase.style.height = 168 ;
	}
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
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
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}

function dlDept_Onblur()
{
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
		{
			document.all["H_Change"].value = document.all["dlDept_Text"].value;
		    //__doPostBack();//for .NET Framework 1.0
		    //1031112    Kevin_C[1020726]   IsServerHandling = true;放在__doPostBack下面無效，交換順序
			IsServerHandling = true;
			jf_ShowWaitState();
			__doPostBack("", "");//for .NET Framework 1.1
		}
	}
	//1010525	Ivory	1010372	若承辦單位選擇為空，清空承辦人DoPostBack
	else if ( document.all["dlDept_Text"] == null || document.all["dlDept_Text"].value == "" )
	{
	    document.all["H_Change"].value = "CLEAR";
	    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
	    IsServerHandling = true;
		__doPostBack("","");
	} 
}



function CheckCondition()
{
	var strDept		= jf_Trim(document.all["dlDept_Text"].value);
	var strUser		= jf_Trim(document.all["dlUser_Text"].value);
	var strSDate	= jf_Trim(document.all["txSDate"].value);
	var strEDate	= jf_Trim(document.all["txEDate"].value);
	var strRcvDateS	= jf_Trim(document.all["txRcvDateS"].value);
	var strRcvDateE	= jf_Trim(document.all["txRcvDateE"].value);
	if (strDept + strUser + strSDate + strEDate + strRcvDateS + strRcvDateE == "")
	{
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txSDate"].focus();
		$('#txSDate').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["至少輸入一個條件"])),"");
		return false;
	}
	return true;
}

//1001109 Ivory [1000772] 由公文性質取得業務類別 
function jf_Property_Onchange( argOrgno )
{
    if(document.all.ddlDocType.selectedIndex == -1) return;
	var ddlValue = document.all.ddlDocType.options[document.all.ddlDocType.selectedIndex].value;
	
	var param = new Array(4);
	param[0] = ""; //機關代碼
	param[1] = "N";
	param[2] = "Y";
	param[3] = ddlValue; 


	callObj = jf_CallWS("lib/TIME_LIB.asmx","GetBTypeNoByDeptNo" ,false, param);	
	
	iCallID_GetBTypeNo = callObj.id;
	OnWSResult( callObj );
}

function OnWSResult(argResult)
{
		//由公文性質取得業務類別,設定dlBTypeNO值
		if(argResult.id == iCallID_GetBTypeNo)
		{
			for(var i=0 ; i<document.all.ddlWorkType.length;i++ )
				document.all.ddlWorkType.remove(0);
			document.all.ddlWorkType.length = 0;
			document.all.ddlWorkType.options.add(new Option("","")); //第一筆空白		

			var pTmpAry = argResult.value.RtnStr.split(":");
			
			for(var i=0;i< pTmpAry.length;i++)
			{
				var pTmpAry2 = pTmpAry[i].split(",");
				var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
				document.all.ddlWorkType.options.add(objOption);
				document.all.ddlWorkType.selectedIndex = 0;
			}
			return true;	
		}	
}