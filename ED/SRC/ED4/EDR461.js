/*
DATE	SA		PRG		MGR_NO				DESC
1060803	Kevin	Joe		1050087				二代系統升級
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1060803	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
	//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060803	Joe		1050087		二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060803	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060803	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060803 Joe 1050087 二代公文修改，傳入參數event
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1060803 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_ConfirmOpen();
			//1060803 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060803 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
			Page_BlockSubmit = !fnCheckPrint();
			//1060803 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下開啟鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmOpen()
{
	var bRtnbool = true;
	if (!jf_CheckKeyObject())
	{
		bRtnbool = false;
	}
	else
	{
		var year1 = parseInt(document.all.txYearMonth.value.substr(0,3));
		if(year1 == 0)
			year1 = parseInt(document.all.txYearMonth.value.substr(1,2));
		var month1 = parseInt(document.all.txYearMonth.value.substr(3,2));
		if(month1 == 0)
			month1 = parseInt(document.all.txYearMonth.value.substr(4,1));

		var year2 = parseInt(document.all.h_txYM.value.substr(0,3));
		if(year2 == 0)
			year2 = parseInt(document.all.h_txYM.value.substr(1,2));
		var month2 = parseInt(document.all.h_txYM.value.substr(3,2));
		if(month2 == 0)
			month2 = parseInt(document.all.h_txYM.value.substr(4,1));

		if(year1>year2||(year1==year2&&month1>month2))
		{
			strErrMsg = "列印月份不可大於目前統計最大月份\n";
			//1060803	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYearMonth"].focus();
			$('#txYearMonth').focus();				
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
	}
	return bRtnbool;
}

//檢查是否預覽
function fnCheckPrint()
{
		var bRtnbool=true;
		var vCnt=0;
		var vEnd=0;
		var vWait=0;
		var vMsg="";
		for(var i = 2; i <= document.all.dg1.rows.length; i++)
		{
			vCnt=0;
			vEnd=0;
			for(var r=1;r<12;r++)
			{
				if(document.all["dg1__ctl" + i + "_txInput"+r].value=="")
					document.all["dg1__ctl" + i + "_txInput"+r].value="0";
			}
			vWait= parseInt(document.all["dg1__ctl" + i + "_txInput10"].value)+parseInt(document.all["dg1__ctl" + i + "_txInput11"].value)
			if(vWait != parseInt(document.all["dg1__ctl" + i + "_txInput9"].value))
			{
				vMsg += ("序"+(i-1)+"："+"之待辦件數不等於未逾期件數與已逾期件數之和\n");
			}
			else
			{
				for(var j = 1; j<=3;j++)
				{
					vCnt  += parseInt(document.all["dg1__ctl" + i + "_txInput"+j].value);
				}
				for(var k = 4;k<=9;k++)
				{
					if(k==8)
						continue;
					vEnd += parseInt(document.all["dg1__ctl" + i + "_txInput"+k].value);
				}
				if(vCnt!=vEnd)
					vMsg += "序"+(i-1)+"："+"之上月待辦+本月收創件收不等於本月辦結及本月待辦件數\n";
			}
		}
		
		if(vMsg!="")
		{
				bRtnbool =false;
				strErrMsg= vMsg;
				jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
		return bRtnbool;
}


/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
