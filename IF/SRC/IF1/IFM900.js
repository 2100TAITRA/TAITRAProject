/*
DATE    SA		PRG		MGR_NO			DESC
1030915 Kevin	Kevin_C	1030710 		II轉IF
1050629	Kevin	Kevin_C	1050087			升級二代公文系統
1051019	Leslie	Joe		1050087			二代修改配合行動平台
1110103	Kevin   Zen     1101292			修正多次點擊重複PostBack之問題
1130402	Leslie	Leslie	1120589			修正取得憑證錯誤時的ErrorMsg
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
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
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

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	//1050629	Kevin_C	1050087		升級二代公文系統 -S
	// try{
		// switch (xObjectName)
		// {
			// case btHelp:
				// break;
			// case "btLink":
				// var ret;
				// if(jf_Trim(document.all.txLinkPin.value)=="")
				// {
					// alert("請先輸入智慧卡密碼");
					// Page_BlockSubmit=true;
					// document.all.txLinkPin.focus();
					// return;
				// }
				// var pin = document.all.txLinkPin.value;
				// ret = document.all.ocx.Init("");
				// if(ret==false)
				// {
					// alert("封裝元件初始化失敗,無法進行憑證鏈結");
					// Page_BlockSubmit=true;
					// return;
				// }
				// document.all.ocx.SetUIMode(false);
				// ret = document.all.ocx.IsSmartCardAvailable(1+0x1000);
											////GCA	=0; 機關(副卡)憑證
											////MOICA	=1; 個人憑證
											////Temp	=2; 臨時憑證
											////0x1000 -> 允許使用臨時卡
				// if(ret==false)
				// {
					// alert("請先插入[個人憑證]智慧卡!!");
					////alert("請先插入智慧卡!!");
					// Page_BlockSubmit=true;
					// return;
				// }
				// ret = document.all.ocx.SetMode(3);
							////SERVER_HSM		=0;
							////SERVER_CERTSTORE	=1;
							////CLIENT_GCA		=2;
							////CLIENT_MOICA		=3;
							////CLIENT_TEMP		=4;
							////CLIENT_CERTSTORE	=5;
							////CLIENT_JOB		=6;
				// if(ret==false)
				// {
					// alert("取得憑證失敗[叫用SetMode(MOICA)失敗]!!!");
					// Page_BlockSubmit=true;
					// return;
				// }
				// ret = document.all.ocx.VerifyPIN(pin)
				
				// if(ret==false)
				// {
					// alert("憑証已過期或密碼錯誤!!!");
					// Page_BlockSubmit=true;
					// return;
				// }
				// var cert= document.all.ocx.GetSignerBase64Cert();
				// document.all.nLinkCert.value = cert;
				// break;
		// }
	// }
	// catch(e)
	// {
			// alert(e.message);
			// Page_BlockSubmit=true;
			// return false;
	// }	
	//1050629	Kevin_C	1050087		升級二代公文系統 -E
	//1051103	Kevin_C	1050087 修ClientButton -S
	var btDgClick = "not click";
	if(xObjectName.indexOf("btCancelLink") != -1)
		btDgClick = xObjectName;
	switch (xObjectName)
	{
		case btDgClick:
			Page_BlockSubmit=false;
			var nRow = btDgClick.split("__ctl")[1].split("_bt")[0];
			__doPostBack('btDgClick',nRow);
			break;
	}
	//1051103	Kevin_C	1050087 修ClientButton -E
}
/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050629	Kevin_C	1050087		升級二代公文系統 -S
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	{
		Page_BlockSubmit=true;
	   return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btLink":
			IsServerHandling = true;
			jf_ShowWaitState();	
			Page_BlockSubmit=true;
			var sc = new SmartCard();
			sc.getCert().then(function(rslt){
				if (rslt.success) {
					document.all.nLinkCert.value = rslt.cert.certb64
					Page_BlockSubmit=false;
					jf_ToolBarSubmit(xObjectName);
				}
				//1130402	Leslie[1120589]	修正取得憑證錯誤時的ErrorMsg
				// else if (!!rslt.errMsg) {
					// alert(rslt.errMsg);
				else if (!!rslt._errMsg) {
					alert(rslt._errMsg);
				}
				sc.reset();
			})
			.fail(function(rslt){
				//1130402	Leslie[1120589]	修正取得憑證錯誤時的ErrorMsg
				// alert(rslt.errMsg);
				alert(rslt._errMsg);
			});
			break;
	}
}
//1050629	Kevin_C	1050087		升級二代公文系統 -E

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
//1050629	Kevin_C	1050087		升級二代公文系統 -S
// function jf_ConfirmSave()
// {
	// var bRtnbool = false;
	
	// if (jf_CheckBeforSave())
	// {
		////新增模式需檢查鍵值是否已存在
		// if (jf_GetActionMode()==LayoutModeNew)
		// {
			// if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			// {
				// if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					// bRtnbool = true;
			// }
			// else
				// bRtnbool = true;
		// }
		// else
			// bRtnbool = true;
	// }
		
	// return bRtnbool;
// }

////儲存前之欄位檢查
// function jf_CheckBeforSave()
// {
	// var bRtnbool = true;
	// var strErrMsg= "";
	
	// if (document.all["txKeyFld"].value == "")
	// {
		// strErrMsg += "鍵值欄位不可空白\n";
		// document.all["txKeyFld"].focus();
	// }
	
	// if (document.all["txRequireFld"].value == "")
	// {
		// strErrMsg += "必要欄位不可空白\n";
		// document.all["txRequireFld"].focus();
	// }
	
	// if(!jf_CheckBlankAndAlert())
		// bRtnbool = false;
		
	// if (strErrMsg != "")
	// {
		// bRtnbool = false;
		// jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	// }
	
	// return bRtnbool;
// }

////檢查DataGrid資料列是否填完整
// function jf_CheckBlankAndAlert()
// {
	// var InValidName = "";
	// var InValidControlName = "";
	
	// for(var i = 2; i <= document.all.dg1.rows.length; i++)
	// {
		////txInput1不為空白時
		// if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		// {
			////txInput2不可空白
			// if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			// {
				// InValidName += ",Input2不可空白";			
				// InValidControlName = "dg1__ctl" + i + "_txInput2";
			// }
							
			// if(InValidName != "")
			// {
				// InValidName = InValidName.substr(1,InValidName.length);
				// jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				// document.all[InValidControlName].focus();
				// return false;
			// }
		// }
	// }
	// return true;
// }
//1050629	Kevin_C	1050087		升級二代公文系統 -E
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1050629	Kevin_C	1050087		升級二代公文系統 -S
// function TabChange(argTab)
// {
	// switch (argTab)
	// {
		// case "1":
			// document.all["DIV1"].className = "";
			// document.all["DIV2"].className = "hide";
			// document.all["DIV3"].className = "hide";
			// document.all["DIV4"].className = "hide";
			// document.all["DIV5"].className = "hide";
			// document.all["DIV6"].className = "hide";
			// document.all["DIV7"].className = "hide";
			// break;
		// case "2":
			// document.all["DIV1"].className = "hide";
			// document.all["DIV2"].className = "";
			// document.all["DIV3"].className = "hide";
			// document.all["DIV4"].className = "hide";
			// document.all["DIV5"].className = "hide";
			// document.all["DIV6"].className = "hide";
			// document.all["DIV7"].className = "hide";
			// break;
		// case "3":
			// document.all["DIV1"].className = "hide";
			// document.all["DIV2"].className = "hide";
			// document.all["DIV3"].className = "";
			// document.all["DIV4"].className = "hide";
			// document.all["DIV5"].className = "hide";
			// document.all["DIV6"].className = "hide";
			// document.all["DIV7"].className = "hide";
			// break;
		// case "4":
			// document.all["DIV1"].className = "hide";
			// document.all["DIV2"].className = "hide";
			// document.all["DIV3"].className = "hide";
			// document.all["DIV4"].className = "";
			// document.all["DIV5"].className = "hide";
			// document.all["DIV6"].className = "hide";
			// document.all["DIV7"].className = "hide";

			// break;
		// case "5":
			// document.all["DIV1"].className = "hide";
			// document.all["DIV2"].className = "hide";
			// document.all["DIV3"].className = "hide";
			// document.all["DIV4"].className = "hide";
			// document.all["DIV5"].className = "";
			// document.all["DIV6"].className = "hide";
			// document.all["DIV7"].className = "hide";

			// break;
		// case "6":
			// document.all["DIV1"].className = "hide";
			// document.all["DIV2"].className = "hide";
			// document.all["DIV3"].className = "hide";
			// document.all["DIV4"].className = "hide";
			// document.all["DIV5"].className = "hide";
			// document.all["DIV6"].className = "";
			// document.all["DIV7"].className = "hide";

			// break;
		// case "7":
			// document.all["DIV1"].className = "hide";
			// document.all["DIV2"].className = "hide";
			// document.all["DIV3"].className = "hide";
			// document.all["DIV4"].className = "hide";
			// document.all["DIV5"].className = "hide";
			// document.all["DIV6"].className = "hide";
			// document.all["DIV7"].className = "";
			// document.all["DIV7"].style.display="";
			// break;
	// }
// }
// function TabOnMouseOver(obj)
// {
	// obj.style.cursor = "hand";
// }

// function TabOnMouseOut(obj)
// {
	// obj.style.cursor = "default";
// }
//1050629	Kevin_C	1050087		升級二代公文系統 -E