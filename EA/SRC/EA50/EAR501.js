 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2013.11.22	Cloud	1020903	修改程式使用邏輯，選取依承辦單位排序時才可以使用列印單位條件
 * 2015.05.29	Gabby	1040325	增加中興大學客製化報表
 * 2015.06.11	Gabby	-------	修正取錯帳號問題
 * 1060327      Joe  	1050087 二代系統升級
 * 1060505      Joe  	1060134 新增匯出Excel功能
 * 1080528		Kevin_C	1080359	客委會增加匯出EXCEL功能
 * 1110414		Zen		1101457	(考試院)新增匯出Excel功能及客製化報表
 * 1131107      Jason   1130976、1131027 產生報表、EXCEL時主旨換行異常，和客製化EXCEL
 * 1140424      Andy    1140264 新增匯出ODS功能
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

//1060327	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060327	Joe		1050087		二代公文修改--S
	// jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, null);
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//1060327	Joe		1050087		二代公文修改--E
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	//1040529 Gabby[1040325]增加中興大學客製化報表，設定畫面顯示與下拉式選單初始值--START
	//SetDefault();//2008.11.24 Add by cola ClientonLoad重新判斷若是案卷, 櫥位號選項不可選擇
	if(document.all["OrgNickName"].value=="NCHU")
		SetDefaultNCHU();
	else
		SetDefault();
	
	var ddlDept=document.all["ddldept"];
	var SelectItem=ddlDept.options[ddlDept.selectedIndex];
	var strDeptValue=SelectItem.value;
	var strDeptNo=strDeptValue;
	
	if(document.all["ddlSect"] && document.all["ddlUser"])
	{
		if(document.all["ddlSect"].selectedIndex==0 || document.all["ddlSect"].selectedIndex==-1)
			eajf_SetdlSectByUnitCode(strDeptNo,"ddlSect",false);
		if(document.all["ddlUser"].selectedIndex==0 || document.all["ddlUser"].selectedIndex==-1)
			eajf_SetdlSect("ddldept","ddlSect","ddlUser","",false,true);
	}
	//1040529 Gabby[1040325]增加中興大學客製化報表，設定畫面顯示與下拉式選單初始值--END

	//1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
	if (document.all["OrgNickName"].value == "EXAM")
		CheckSortType('rbOrder2');
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060327	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060327	joe		1050087		二代修改配合行動平台
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
		case "btKeyHelp": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "../EA40/EAT400C1.aspx";
			jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060327 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060327 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			//1040529 Gabby[1040325]增加中興大學客製化報表，增加下拉式選單隱藏欄位處理
			if(document.all["OrgNickName"].value=="NCHU")
				jf_CheckDropDownList();
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060327 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			//1040529 Gabby[1040325]增加中興大學客製化報表，增加下拉式選單隱藏欄位處理
			if(document.all["OrgNickName"].value=="NCHU")
				jf_CheckDropDownList();
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060327 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1040529 Gabby[1040325]增加中興大學客製化報表，增加客製化報表產出EXCEL格式--START
		//1140424 Andy 1140264 新增匯出ODS功能
		case "btODS":
		case "btExcel":
			//1060508	Joe		1060134		匯出Excel檢查僅中興大學，若為FDA則檢核項目同預覽
			if (document.all["OrgNickName"].value == "NCHU")
				Page_BlockSubmit = !jf_CheckBeforeExcel();
			//1060508	Joe		1060134		匯出Excel檢查僅中興大學，若為FDA則檢核項目同預覽--S
			else if (document.all["OrgNickName"].value == "FDA")
				Page_BlockSubmit = !jf_ConfirmPreview();
			//1060508	Joe		1060134		匯出Excel檢查僅中興大學，若為FDA則檢核項目同預覽--E
			//1060327 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//1040529 Gabby[1040325]增加中興大學客製化報表，增加客製化報表產出EXCEL格式--END
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
	
	if (argCallerId == "EAT400C1")
	{
		document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
		//1060327	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txPlanNo"].focus();
		$('#txPlanNo').focus();	
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
function ObjOnBlur(argObjName)
{
	switch(argObjName)
	{
		case "txPlanNo": //清理批號檢查Plan_Main有無存在

			if(document.all.txPlanNo.value != "")
			{
				var param = new Array(1);
				param[0] = document.all.txPlanNo.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, param);
				var iCallID_txPlanNo = callObj.id;
				if (callObj.value.RtnStr == "nodata")
				{
					alert("無此計畫編號，請重新輸入");
					//1060327	Joe	1050087	二代系統升級，調整focus寫法
					//document.all.txPlanNo.focus();
					$('#' + document.all.txPlanNo.id).focus();	
				}
				else
					document.all.txPlanName.value = callObj.value.RtnStr;
			}
			break;
	}
}
//95.11.28 955199 David
function SearchType(argType)
{
	if (document.all["rbType1"].checked)
	//if(argType == "rbType1")
	{
		//1131107      Jason   1130976、1131027     產生報表、EXCEL時主旨換行異常，和客製化EXCEL--案卷格式不提供匯出Excel功能
		document.all["btExcel"].disabled = false;
		document.all["rbStock"].Enabled = true;
		document.all["rbStock"].disabled = false;
		if (document.all["txStock"].value == "Y")
			document.all["rbStock"].checked = true;
		//1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
		//else
		else if (document.all["OrgNickName"].value != "EXAM")
			document.all["rbOrder1"].checked = true;
		//1060505	Joe		1060134		新增FDA匯出Excel功能，僅案件可匯出Excel--S
		if (document.all["OrgNickName"].value == "FDA")
			document.all["btExcel"].className = "";
		//1060505	Joe		1060134		新增FDA匯出Excel功能，僅案件可匯出Excel--E
		//1080528		Kevin_C	1080359	客委會增加匯出EXCEL功能
		if (document.all["OrgNickName"].value == "HAC" && document.all["cbFM"].checked == true)
			document.all["btExcel"].disabled = false;

		//1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
		if (document.all["OrgNickName"].value == "EXAM")
			document.all["btExcel"].disabled = false;
	}
	//1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
	else if (document.all["rbType2"].checked)
	{
		//1131107      Jason   1130976、1131027     產生報表、EXCEL時主旨換行異常，和客製化EXCEL--案卷格式不提供匯出Excel功能
		//1140424 Andy 1140264 新增案卷匯出EXCEL、ODS功能
		//document.all["btExcel"].disabled = true;
		document.all["btExcel"].disabled = false;
		//1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
		if (document.all["OrgNickName"].value != "EXAM")
			document.all["rbOrder1"].checked = true;
		document.all["rbStock"].disabled = true;
		//1060505	Joe		1060134		新增FDA匯出Excel功能，僅案件可匯出Excel--S
		if (document.all["OrgNickName"].value == "FDA")
			document.all["btExcel"].className = "hide";
		//1060505	Joe		1060134		新增FDA匯出Excel功能，僅案件可匯出Excel--E
		//1080528		Kevin_C	1080359	客委會增加匯出EXCEL功能
		if (document.all["OrgNickName"].value == "HAC")
		//1140424 Andy 1140264 新增案卷匯出EXCEL、ODS功能
			//document.all["btExcel"].disabled = true;
			document.all["btExcel"].disabled = false;
											
		//1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
		if (document.all["OrgNickName"].value == "EXAM")
		//1140424 Andy 1140264 新增案卷匯出EXCEL、ODS功能
			//document.all["btExcel"].disabled = true;
			document.all["btExcel"].disabled = false;
	}
	//1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
	else if (document.all["rbTypeStat"].checked)
		//1140424 Andy 1140264 新增案卷匯出EXCEL、ODS功能
		//document.all["btExcel"].disabled = true;
		document.all["btExcel"].disabled = false;
}
function SetDefault()
{
	if(document.all["txStock"].value == "Y")
	{
		if (document.all["rbType2"].checked)
			document.all["rbStock"].disabled = true;
	}
	//1021122 Cloud	[1020903]	增加判斷選擇依檔號時，不可使用列印單位條件
	//1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表，修正愚蠢的Bug
	//if(document.all["rbOrder1"].checked = true)
	if(document.all["rbOrder1"].checked == true)
	{
		document.all["ddldept"].disabled=true;
		document.all["ddldept"].selectedIndex=0;
	}
}
//1021122 Cloud	[1020903]	增加判斷選擇依檔號時，不可使用列印單位條件
function CheckSortType(argSortId)
{
	//1040529 Gabby[1040325]增加中興大學客製化報表，畫面選項鎖定邏輯修正--START
	if(document.all["OrgNickName"].value=="NCHU")
	{
		if(document.all["cbNCHU"].checked==true)
			document.all["ddldept"].disabled=false;
		else
		{
			if(argSortId=="rbOrder2")
			{
				document.all["ddldept"].disabled=false;
			}
			else
			{
				document.all["ddldept"].disabled=true;
				document.all["ddldept"].selectedIndex=0;
			}		
		}
	}
	//1040529 Gabby[1040325]增加中興大學客製化報表，畫面選項鎖定邏輯修正--END
	else
	{	
		if(argSortId=="rbOrder2")
		{
			document.all["ddldept"].disabled=false;
		}
		else
		{
			document.all["ddldept"].disabled=true;
			document.all["ddldept"].selectedIndex=0;
		}
	}
}
//1040529 Gabby[1040325]增加中興大學客製化報表，增加下拉式選單處理--START
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	
	var ddlDept=document.all["ddldept"];
	var SelectItem=ddlDept.options[ddlDept.selectedIndex];
	var strDeptValue=SelectItem.value;
	var strDeptNo=strDeptValue;
	
	eajf_SetdlSectByUnitCode(strDeptNo,"ddlSect",false);
	eajf_SetdlSect("ddldept","ddlSect","ddlUser","",false,true);
	
	if(document.all["ddldept"].selectedIndex==-1 || document.all["ddldept"].selectedIndex==0)
	{
		while(document.all["ddlUser"].length > 0)
			document.all["ddlUser"].remove(0);
		document.all["ddlUser"].options.add(new Option("",""));
	}

	return bCheckOK;
}

function dlSect_Text_onblur()
{
	var bCheckOK = true;

	eajf_SetdlSect("ddldept","ddlSect","ddlUser","",false,true);
	
	if(document.all["ddldept"].selectedIndex==-1 || document.all["ddldept"].selectedIndex==0)
	{
		while(document.all["ddlUser"].length > 0)
			document.all["ddlUser"].remove(0);
		document.all["ddlUser"].options.add(new Option("",""));
	}
	
	return bCheckOK;
}
function SetDefaultNCHU(Init)
{
	if(document.all["cbFM"].checked==false && document.all["cbNCHU"].checked==false)
	{
		SetDefault();
		document.all["ddlSect"].disabled=true;
		document.all["ddlSect"].selectedIndex=0;
		document.all["ddlUser"].disabled=true;
		document.all["ddlUser"].selectedIndex=0;
		document.all["cbFM"].disabled=false;
		document.all["cbNCHU"].disabled=false;
		document.all["cbHasCom"].disabled=true;
		document.all["rbType2"].disabled=false;
		document.all["Order2"].style.display="";
		document.all["DocNo"].style.display="none";
		document.all["User"].style.display="none";
	}
	else if(document.all["cbFM"].checked==true)
	{
		SetDefault();
		document.all["ddlSect"].disabled=true;
		document.all["ddlSect"].selectedIndex=0;
		document.all["ddlUser"].disabled=true;
		document.all["ddlUser"].selectedIndex=0;
		document.all["cbNCHU"].disabled=true;
		document.all["cbHasCom"].disabled=true;
		document.all["rbType2"].disabled=false;
		document.all["Order2"].style.display="";
		document.all["DocNo"].style.display="none";
		document.all["User"].style.display="none";
	}
	else if(document.all["cbNCHU"].checked==true)
	{
		if(document.all["rbType2"].checked==true)
		{
			document.all["rbType2"].checked=false;
			document.all["rbType1"].checked=true;
		}
		document.all["ddldept"].disabled=false;
		document.all["ddlSect"].disabled=false;
		document.all["ddlUser"].disabled=false;
		document.all["cbHasCom"].disabled=false;
		document.all["cbFM"].disabled=true;
		document.all["rbType2"].disabled=true;
		if(Init==true)
			document.all["rbUser"].checked=true;
		document.all["Order2"].style.display="none";
		document.all["DocNo"].style.display="";
		document.all["User"].style.display="";		
	}
}
//1080528		Kevin_C	1080359	客委會增加匯出EXCEL功能
function SetDefaultHAC()
{
	if (document.all["cbFM"].checked == false || document.all["rbType1"].checked == false)
	{
		//1140424 Andy 1140264 新增案卷匯出EXCEL、ODS功能
		//document.all["btExcel"].disabled = true;
		document.all["btExcel"].disabled = false;
	}
	else if (document.all["cbFM"].checked == true && document.all["rbType1"].checked)
	{
		document.all["btExcel"].disabled = false;
	}
}
//查詢前檢查
function jf_CheckDropDownList()
{
		
	if(document.all["ddlSect"].selectedIndex!=0 && document.all["ddlSect"].selectedIndex!=-1)
	{
		var SectItem=document.all["ddlSect"].options[document.all["ddlSect"].selectedIndex];
		if(SectItem.value!="")
			document.all["H_Sect_Value"].value=SectItem.value.split(':')[2];
		else
			document.all["H_Sect_Value"].value="";
		document.all["H_Sect_Text"].value=SectItem.text;
		document.all["H_Sect_AllValue"].value = edjf_SaveCurrDL(document.all["ddlSect"]);
	}
	else
	{
		document.all["H_Sect_Value"].value="";
		document.all["H_Sect_Text"].value="";
		document.all["H_Sect_AllValue"].value="";
	}
	if(document.all["ddldept"].selectedIndex!=0 && document.all["ddldept"].selectedIndex!=-1)
	{
		var DeptItem=document.all["ddldept"].options[document.all["ddldept"].selectedIndex];
		document.all["H_Dept_Value"].value=DeptItem.value;
		document.all["H_Dept_Text"].value=DeptItem.text;
	}
	else
	{
		document.all["H_Dept_Value"].value="";
		document.all["H_Dept_Text"].value="";
	}
	if(document.all["ddlUser"].selectedIndex!=0 && document.all["ddlUser"].selectedIndex!=-1)
	{
		var UserItem=document.all["ddlUser"].options[document.all["ddlUser"].selectedIndex];
		//1040611 Gabby修正取錯帳號問題
		//document.all["H_User_Value"].value=UserItem.value.split(':')[3];
		document.all["H_User_Value"].value=UserItem.value.split(':')[2];
		document.all["H_User_Text"].value=UserItem.text;
		document.all["H_User_AllValue"].value = edjf_SaveCurrDL(document.all["ddlUser"]);
	}
	else
	{
		document.all["H_User_Value"].value="";
		document.all["H_User_AllValue"].value = "";
		document.all["H_User_Text"].value="";
	}
			
    return true;
}
//將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function edjf_SaveCurrDL(argSource)
{
	var strTemp = "";
	for(var i=0 ; i < argSource.options.length ; i++ )
	{
		strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";
	}
	return strTemp.substr(0,strTemp.length-1);
}
function jf_CheckBeforeExcel()
{
	jf_CheckDropDownList();
	if(document.all["cbNCHU"].checked!=true)
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["此報表不提供Excel格式！"]) ), "" );
		return false;
	}
	if(!jf_ConfirmPreview())
		return false;
		
	return true;
}
//1040529 Gabby[1040325]增加中興大學客製化報表，增加下拉式選單處理--END