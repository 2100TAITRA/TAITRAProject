/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號		概要
 * -------------------------------------------------------------------------------------------------
 * 0961017		Cola	000959		支援計劃批號批次帶回功能
 * 1060202		Joe		1050087	二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");

//1060202	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//[000959]Cola 提供tbselect
//1060202	Joe		1050087		二代公文修改
// if(document.all.dg1)
	// document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060202	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060202	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
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
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060202 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060202 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		//[000959]Cola 提供批號批次傳回母視窗之功能 -- start --
		case "btSave": //確定
			Page_BlockSubmit = true;
			IsServerHandling = true;

			if(opener.document.all.lbReturnValue.length !=0)
			{
				var oldlength = opener.document.all.lbReturnValue.length;
				for(i=0;i<oldlength;i++)
				{
					opener.document.all.lbReturnValue.remove(0);
				}
			}
			
			var strDocNoList = "";
			var count=0;
			var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			for (i=2;i<pDg1Len;i++)
			{
				if (document.all["dg1__ctl"+i+"_cbSelect"].checked)
				{	
					if (strDocNoList!="")
						strDocNoList+=",";
					strDocNoList+=document.all["dg1__ctl"+i+"_hlPlanNo"].innerText;
					count++;
				}
			}
			if (count==0)
			{
				alert("請勾選資料帶回!");
				IsServerHandling = false;
				return;
			}
			
			opener.document.all.lbReturnValue.length = count;
			
			//花的時間，用array也是很久...因為callback中執行很多javascript
			//var strDocNoList = document.all["tbDocNoForTakeBack"].value;
			var arrDocData = new Array(count);
			arrDocData = strDocNoList.split(",");
			
			for(i=0;i<count;i++)
			{
				//var pNo = new Array(2);
				//pNo = arrDocData[i].split("-");
				opener.document.all.lbReturnValue.options[i].text = arrDocData[i];
				//opener.document.all.lbReturnValue.options[i].value = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText;
				opener.document.all.lbReturnValue.options[i].value = arrDocData[i];

			}
			
			if(count > 0)
			{
				opener.window.CallBack("EAT400C1");
				close();
			}
			break;	
			//Cola -- end --	
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060202 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060202 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060202 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
	}
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

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{    
	try
	{
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].text = argLink;
		opener.document.all.lbReturnValue.options[0].value = argLink;
		opener.window.CallBack("EAT400C1");
		close();
	}
	catch (e) {}
    
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function CheckDateRange(xObjectName)
{
	var strMsg		= "日期格式不正確，請檢查\n";
	if(document.all[xObjectName].value != "")
	{
		if(!jf_CheckCDATE(document.all[xObjectName].value))
		{
			alert(strMsg);
			//1060202	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[xObjectName].focus();				
			$('#' + xObjectName).focus();
		}
	}
}

function OnblurCallCalendar(argObj)
{
	Page_BlockSubmit=true;
	jf_CallCalendar(document.all[argObj], event.screenX, event.screenY);	
}
