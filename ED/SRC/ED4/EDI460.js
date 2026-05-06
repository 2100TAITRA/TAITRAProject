/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050815	Kevin	Kevin_C	1050087		升級二代公文系統
 * 1051019  Leslie  Kenny   1050087     二代公文修改
 * 1120526  Kevin   Zen     1110918     (銓敘部)修正批次加入併案未支援調整母文之問題
 * 1120919  Kevin   Zen     1120092     修正取消更換母文仍帶回至母視窗之問題
 * 1121114  Kevin   Zen     1120092     修正不需更換母文號時無法帶回母視窗之問題
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050815	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//改成由網址參數帶入承辦單位與使用者訊息 故改成textbox
	/*document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_User"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
	document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
	//無值不顯示
	jf_HandleComboxStatus("dlSect");*/
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
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
		//1050815	Kevin_C	1050087	升二代 -S
		// case "btRcvDateS":
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all["txRcvDateS"], event.screenX, event.screenY);
			// break;
		// case "btRcvDateE":
			// Page_BlockSubmit=true;
			// jf_CallCalendar(document.all["txRcvDateE"], event.screenX, event.screenY);
			// break;
		//1050815	Kevin_C	1050087	升二代 -E
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050815	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
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
	
	//1050815	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !fnCheck();
			//1050815	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btReturn":
			Page_BlockSubmit = true;
			if(fnRtnCheck())
				ReturnValue();
			break;
	}
}

function fnCheck()
{
	if(document.all.txRcvDateS.value==""&&document.all.txRcvDateE.value=="")
	{
		alert("請輸入收創文日期");
		return false;
	}
	
	if(CheckCDATE("txRcvDateS","收創文日期起"))
	{
		if(CheckCDATE("txRcvDateE","收創文日期迄"))
		{
			if(jf_Trim(document.all.txRcvDateS.value)=="" && jf_Trim(document.all.txRcvDateE.value)!="")
				document.all.txRcvDateS.value = document.all.txRcvDateE.value;
			if(jf_Trim(document.all.txRcvDateE.value)=="" && jf_Trim(document.all.txRcvDateS.value)!="")
				document.all.txRcvDateE.value = document.all.txRcvDateS.value;

			return true;
		}
		else
			return false;
	}
	else
		return false;
}

function fnRtnCheck()
{
	//檢核是否至少勾選一筆
	var bRtnbool = false;
	var strErrMsg= "";
	var iCount = 0 ;
	if( document.all.dg1 == null )
	{
		strErrMsg = "請先搜尋勾選一筆資料";
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return false ;
	}	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbSelect"].checked == true)
		{
			bRtnbool = true;
			iCount++;
		}
	}
	if (bRtnbool != true)
	{
		
		strErrMsg = "至少勾選一筆資料";
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return bRtnbool;
	}
	
	if(document.all["H_nFrom"].value=="ODC010")
	{
		//檢核是否僅勾選一筆
		if( iCount > 1 )
		{
			strErrMsg = "僅可勾選一筆資料帶回";
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
			return false;
		}
	}
	return bRtnbool;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//組出回傳值
function ReturnValue()
{
	try
	{
	    //組回傳値
		var strRtnValue = "";
		//1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題
		let strNewByOuList = '';
		let strRepresentativeNewByOu = 'Y';
		let strRepresentativeDocNo = '0';

		for(var i = 2; i <= document.all.dg1.rows.length; i++)
		{
			if(document.all["dg1__ctl" + i + "_cbSelect"].checked == true)
			{
				//1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，從子文中取得代表文號後續和既有母文號比較--begin
				//if ( strRtnValue != "")
				//	strRtnValue += ";";
				////1050815	Kevin_C	1050087	升二代
				////strRtnValue += document.all["dg1__ctl" + i + "_lbDocNo"].innerText;
				//strRtnValue += document.all["dg1__ctl" + i + "_lbDocNo"].textContent;
				let strDocNo = document.all["dg1__ctl" + i + "_lbDocNo"].textContent;
				let strNewByOu = document.all["dg1__ctl" + i + "_H_lbNewByOu"].textContent;

				strRtnValue += strDocNo + ';';
				strNewByOuList += strNewByOu + ';';

				let bRepresentionComNo = false;
				if (strNewByOu == 'N' && strRepresentativeNewByOu == 'Y')
					bRepresentionComNo = true;
				else if (strNewByOu == strRepresentativeNewByOu && Number(strDocNo) > Number(strRepresentativeDocNo))
					bRepresentionComNo = true;

				if (bRepresentionComNo)
				{
					strRepresentativeDocNo = strDocNo;
					strRepresentativeNewByOu = strNewByOu;
				}
				//1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，從子文中取得代表文號後續和既有母文號比較--end
			}
		}

		//1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題
		strRtnValue = strRtnValue.slice(0, -1);
		strNewByOuList = strNewByOuList.slice(0, -1);

		if(document.all["H_nFrom"].value=="ODC010")
		{
			fnSetMsg("COMNO", strRtnValue);
			close();
		}
		else
		{
			let objCurrComNo = JSON.parse(localStorage.getItem("EDP460"));

			//1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題
			let bConFirm = false;
			//1121114 Zen 1120092 修正不需更換母文號時無法帶回母視窗之問題，額外紀錄是顯示確認視窗
			let bHasConFirm = false;
			
			if (objCurrComNo.OrgNickName == 'MOCS' && objCurrComNo.dlAppUserNameClass == 'hide' && opener.window.ChangeComNo(strRepresentativeDocNo, strRepresentativeNewByOu))
			{
				bConFirm = window.confirm('目前加入公文' + strRepresentativeDocNo + '為最大號碼，將以本公文進行辦理。確認後，母文' + objCurrComNo.ComNo + '將先進行解併，再以新母文' + strRepresentativeDocNo + '執行彙併辦作業。');
				//1121114 Zen 1120092 修正不需更換母文號時無法帶回母視窗之問題，額外紀錄是顯示確認視窗
				bHasConFirm = true;
			}
			
			//1120919 Zen 1120092 修正取消更換母文仍帶回至母視窗之問題
			//1121114 Zen 1120092 修正不需更換母文號時無法帶回母視窗之問題，額外紀錄是顯示確認視窗
			//if (!bConFirm)
			if (bHasConFirm && !bConFirm)
				return;

			//1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，額外取得NEW_BY_OU
			//opener.document.all.lbReturnValue.length = 1;
			opener.document.all.lbReturnValue.length = 3;
			opener.document.all.lbReturnValue.options[0].value = strRtnValue;
			//1120526 Zen 1110918 (銓敘部)修正批次加入併案未支援調整母文之問題，額外取得NEW_BY_OU
			opener.document.all.lbReturnValue.options[1].value = strRepresentativeDocNo;
			opener.document.all.lbReturnValue.options[2].value = bConFirm;

			opener.window.CallBack("EDI460");
			close();
	    }
	}
	catch (e) {}
    
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢核日期格式
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
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].focus();
			return false;
		}
	}
	return false;
}
//改成由網址參數帶入承辦單位與使用者訊息 故改成textbox
/*function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
			
			var bSubTree = true;
			if(document.all["H_OD_FLOW_TYPE"].value == "2")
				bSubTree = false;
			
			edjf_SetdlDept("dlDept","dlSect","dlUser","",false,true);	//初始dlSect、dlUser的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
			document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
			
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if(document.all["dlSect"].options.length ==1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;
				
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
				
			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlSect_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			
			odjf_SetdlSect("dlDept","dlSect","dlUser","",false);	//初始化承辦人選單
				
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
			
			if(document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if(document.all["dlUser"].options.length ==1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlUser_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlUser_Text"].value != document.all["H_User"].value)
	{
		//呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if(edjf_ComboBoxCheck("dlUser", "承辦人"))
		{
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
		document.all[argComboxID+"_Container"].className = "InputFieldText";
}*/

function fnSetMsg(argName,argValue)
{
	var artifact = fnGetArtifact();
	if(!document.all.IEControl.SetTargetUser(artifact))
	{
		alert("無此對應之使用者");
		return false;	
	}
	document.all.IEControl.SetMsg(argName,argValue)
	return true;
}

var SAMLartStr;
function fnGetArtifact()
{
	return document.all.H_SAMLart.value;
	return;
}
