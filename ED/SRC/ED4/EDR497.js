/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		系統分析師	修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 0990810				Johnny	0990408	新增一報表供疾管局使用，畫面上多小日曆按鈕點選後可帶入點選日期
 * 1061023    Kevin     Joe     1050087 二代升級
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

//1061023	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061023	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1061023	joe		1050087		二代修改配合行動平台
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
		//0990810 畫面上多小日曆按鈕，點選後可帶入點選日期 [0990408] Johnny --start
		//1061023	Joe		1050087		二代公文修改--S
		// case "btSDate":
			// Page_BlockSubmit = true;
			// jf_CallCalendar(document.all.txIssueDateS, event.screenX, event.screenY);
			// break;
		// case "btEDate":
			// Page_BlockSubmit = true;
			// jf_CallCalendar(document.all.txIssueDateE, event.screenX, event.screenY);
			// break;
		//1061023	Joe		1050087		二代公文修改--E
		//0990810 [0990408] Johnny --end
	}
}
/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1061023 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1061023 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart="+document.all.H_Artifact.value;
			jf_OpenChildWin(xUrl,"ODP420",760,500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
			if(jf_Trim(document.all.txIssueDateS.value)=="" && jf_Trim(document.all.txIssueDateE.value)!="")
				document.all.txIssueDateS.value = document.all.txIssueDateE.value;
			if(jf_Trim(document.all.txIssueDateS.value)=="")
		    {
				alert("發文日期起迄不可為空白!!");
				//1061023	Joe	1050087	二代系統升級，調整focus寫法
				// document.all.txIssueDateS.focus();
				$('#' + document.all.txIssueDateS.id).focus();
				Page_BlockSubmit = true;
		    }
		    else
		    {
				if(jf_CheckYearMonth("txIssueDateS","發文日期(起)"))
				{
					if(jf_CheckYearMonth("txIssueDateE","發文日期(迄)"))
					{
						if(jf_CheckMonth())
							Page_BlockSubmit = false;
						else
							Page_BlockSubmit = true;
					}
					else
						Page_BlockSubmit = true;
				}
				else
					Page_BlockSubmit = true;
			}
			if(jf_Trim(document.all.txIssueDateE.value)=="")
				document.all.txIssueDateE.value = document.all.txIssueDateS.value;
			//1061023 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
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
	if (argCallerId=="ODP420")
	{
		if(document.all["lbReturnValue"].length==1)
		{	
  			var strMaxUseDate=document.all["lbReturnValue"].options[0].value;
			if (strMaxUseDate == "")
			{
				//1061023 Joe 1050087 二代公文修改
				// document.all["lbMaxYear"].innerText = "您尚未執行過統計作業";
				document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			}
			else
			{
				//1061023 Joe 1050087 二代公文修改
				// document.all["lbMaxYear"].innerText = "目前統計最大年月："+
				document.all["lbMaxYear"].textContent = "目前統計最大年月："+
													strMaxUseDate.substr(0,3)+"年"+
													strMaxUseDate.substr(3,2)+"月";
			}
		}
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CheckYearMonth(obj,objName)
{
	if(jf_Trim(document.all[obj].value) != "")
	{
		var strDate = jf_Trim(document.all[obj].value);
		strDate = jf_PADL(strDate,7,"0");
		
		if (!jf_CheckCDATE(strDate))
		{
			document.all[obj].value = "";
			alert(objName+"欄位日期格式有誤，請重新輸入");
			//1061023	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[obj].focus();
			$('#' + obj).focus();
			return false;
		}
		else return true;
	}
	else return true;
}
function jf_CheckMonth()
{
	//起訖檢核
	if(CompareNumber(StringGetInt(document.all.txIssueDateS.value),StringGetInt(document.all.txIssueDateE.value)))
	{
		var strTemp = document.all.txIssueDateS.value;
		document.all.txIssueDateS.value = document.all.txIssueDateE.value;
		document.all.txIssueDateE.value = strTemp;
	}
	
	//檢核是否超過目前統計最大月份
	//1061023 Joe 1050087 二代公文修改
	// var strMaxYear = document.all["lbMaxYear"].innerText;
	var strMaxYear = document.all["lbMaxYear"].textContent;
	strMaxYear = strMaxYear.substring(strMaxYear.indexOf("：")+1,strMaxYear.length);
	strMaxYear = strMaxYear+"99";
	if(CompareNumber(StringGetInt(document.all.txIssueDateE.value),StringGetInt(strMaxYear)))
	{
		alert("發文日期不可超過目前統計最大月份");
		//1061023	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txIssueDateE"].focus();
		$('#txIssueDateE').focus();
		return false;
	}
	else
		return true;
		
}
function CompareNumber(argNum1,argNum2)
{
	if(argNum1 == Math.min(argNum1,argNum2))
		return false;
	else
		return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr)
{
	var num = argNumStr;
	
	if(num.length > 0)
	{
		if(argNumStr.charAt(0) == "0")
			num = argNumStr.substr(1,argNumStr.length-1);
		if(num.charAt(0) == "0" )
			num = StringGetInt(num)
	}
	return num;
}