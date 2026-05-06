/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * DATE 		SA		PRG		MGR_NO	DESC
 * -------------------------------------------------------------------------------------------------
 * 0981119				Jane	0980580	提供轉出EXCEL功能
 * 1050426		Kevin	Joe		1050087 二代系統升級
 * 1050520		KEVIN	JOE		1050087	二代系統升級，調整focus寫法
 * 1050803		KEVIN	JOE		1050087	修改子視窗大小
 * 1060510		KEVIN	Joe		1060215 修改控制項傳值方式
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050426	Joe	1050087	二代系統升級
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050426	Joe	1050087	二代系統升級
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
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

//1050426	Joe	1050087	二代系統升級，傳入參數event
function jf_ToolBarHandle(event)
{
	//1050520	Joe	1050087	二代系統升級，調整focus寫法
	//document.all.tbTool.focus();
	$('#' + document.all.tbTool.id).focus();
	if (!CheckMonth("txMon"))
		return;

	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050426	Joe	1050087	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "ODP420.aspx?nMode=EXEC";
			//1050803	Joe		1050087		修正子視窗大小
			// jf_OpenChildWin(xUrl,"ODP420",760,500);
			jf_OpenChildWin(xUrl,"ODP420",800,600);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			//1050426	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1050426	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
			if (CheckBeforePrint())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1050426	Joe	1050087	二代系統升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId=="ODP420")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
			if (strMaxUseDate == "")
			{
				document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			}
			else
			{
				document.all["lbMaxYear"].textContent = "目前統計最大年月："+
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
				//iris 修改檢核列印月份不可大於目前統計月份之欄位
				//1060510	Joe		1060215		修改控制項傳值方式
				// document.all["h_txYM"].textContent =strMaxUseDate;
				document.all["h_txYM"].value =strMaxUseDate;
			}
		}
	}
}

function ClientOnLoad()
{
	ShowMsg();
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

//列印前檢查
function CheckBeforePrint()
{
	//1060413	Joe		1050817		變更為區間列印--S
	// var strMon = jf_Trim(document.all.txMon.value);
	var txMonS = document.all.txMon;
	var txMonE = document.all.txMonE;
	// if (strMon == "")
	if (jf_Trim(txMonS.value) + jf_Trim(txMonE.value) == "")
	//1060413	Joe		1050817		變更為區間列印--E
	{
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all.txMon.focus();
		$('#' + document.all.txMon.id).focus();
		alert("查詢月份不可為空白。");
		return false;
	}
	//1060413	Joe		1050817		變更為區間列印--S
	else if(jf_Trim(txMonS.value) == "")
		txMonS.value = txMonE.value;
	else if(jf_Trim(txMonE.value) == "")
		txMonE.value = txMonS.value;
	else if(txMonS.value > txMonE.value)
	{
		var temp = txMonS.value;
		txMonS.value = txMonE.value;
		txMonE.value = temp;
	}
	return ConfirmData();
	//1060413	Joe		1050817		變更為區間列印--E
}
			
/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
//日期onblur
function CheckMonth(argObj,strMsg)
{
	var strMon = document.all[argObj].value;
	if (strMon != "")
	{
		if (strMon.length < 5)
		{
			strMon = jf_PADL(strMon,5,'0');
			document.all[argObj].value = strMon;
		}
		var mon = parseInt(strMon.substr(3,2), 10);
		if ( mon < 1 || mon > 12 )
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}
function ConfirmData()
{
		if(document.all.h_txYM.value=="")
		{
			return  false;
		}
		var bRtnbool = true;
		//1060413	Joe		1050817		變更為區間列印
		// var year1 = parseInt(document.all.txMon.value.substr(0,3));
		var year1 = parseInt(document.all.txMonE.value.substr(0,3));
			if(year1 == 0)
		//1060413	Joe		1050817		變更為區間列印
			// year1 = parseInt(document.all.txMon.value.substr(1,2));
			year1 = parseInt(document.all.txMonE.value.substr(1,2));
		//1060413	Joe		1050817		變更為區間列印
		// var month1 = parseInt(document.all.txMon.value.substr(3,2));
		var month1 = parseInt(document.all.txMonE.value.substr(3,2));
		if(month1 == 0)
			//1060413	Joe		1050817		變更為區間列印
			// month1 = parseInt(document.all.txMon.value.substr(4,1));
			month1 = parseInt(document.all.txMonE.value.substr(4,1));
			
		var year2 = parseInt(document.all.h_txYM.value.substr(0,3));
		if(year2 == 0)
			year2 = parseInt(document.all.h_txYM.value.substr(1,2));
		var month2 = parseInt(document.all.h_txYM.value.substr(3,2));
		if(month2 == 0)
			month2 = parseInt(document.all.h_txYM.value.substr(4,1));
		if(year1>year2||(year1==year2&&month1>month2))
		{
			strErrMsg = "列印月份不可大於目前統計最大月份\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txMon"].focus();
			//1060413	Joe		1050817		變更為區間列印
			// $('#txMon').focus();
			$('#txMonE').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
	return bRtnbool;
}

//0981119 檢核哪個radio button被勾選,是否開放產出excel檔[0980580]-Jane
function rbChanged()
{
	var btSaveObj = getToolBarItemObjById("btExcel");
	if(document.all["rblType_0"].checked)
	{
		if(btSaveObj != null)
			btSaveObj.setAttribute("disabled",false);
	}
	else
	{
		if(btSaveObj != null)
			btSaveObj.setAttribute("disabled",true);		
	}
	
}
function getToolBarItemObjById(argId)
{
	for(var i=0;i<document.all.tbTool.numItems;i++)
	{
		if(document.all.tbTool.getItem(i).getAttribute("ID") == argId)
			return document.all.tbTool.getItem(i);		
	}
}