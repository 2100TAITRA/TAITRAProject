/* DATE		SA		PRG		MGR_NO			DESC
 * 1030909	Kevin	Gabby 	1030711			IIM915修改為IFM915(V2改V3)
 * 1050728	Kevin	Kevin_C	1050087			升二代
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 * 1111128	Leslie	Leslie	1110939			一併修正萬年bug，修正取消鏈結不會動的問題
 * 1130402	Leslie	Leslie	1120589			修正取得憑證錯誤時的ErrorMsg
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
var strTableFields = new Array("lbOrg","lbCer","btCancel");

//1050728	Kevin	Kevin_C	1050087			升二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


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
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	var index =  xObjectName.substring(8,xObjectName.indexOf("_btCancel"));
	//1050728	Kevin	Kevin_C	1050087			升二代
	//document.all["txissuer"].value = document.all["dg1__ctl"+index+"_lbCer"].innerText;
	document.all["txissuer"].value = document.all["dg1__ctl"+index+"_lbCer"].textContent;
	document.all["txOrg"].value = document.all["dg1__ctl"+index+"_txOrgCode"].value;
	
	//1111128	Leslie[1110939]	一併修正萬年bug，修正取消鏈結不會動的問題
	jf_ToolBarSubmit('');
	// switch (xObjectName)
	// {
		
	// }		
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050728	Kevin	Kevin_C	1050087			升二代
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
	
	//1050728	Kevin	Kevin_C	1050087			升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			//1050728	Kevin	Kevin_C	1050087			升二代 -S
			// var ret;
			// if(jf_Trim(document.all.txLinkPin.value)=="")
			// {
				// alert("請先輸入智慧卡密碼");
				// Page_BlockSubmit=true;
				// document.all.txLinkPin.focus();
				// return;
			// }
			// var pin = jf_Trim(document.all.txLinkPin.value);
			// ret = document.all.ocx.Init("");
			// if(ret==false)
			// {
				// alert("封裝元件初始化失敗,無法進行憑證鏈結");
				// Page_BlockSubmit=true;
				// return;
			// }
			// document.all.ocx.SetUIMode(false);

			// ret = document.all.ocx.IsSmartCardAvailable(0);
										////GCA	=0;
										////MOICA	=1;
										////Temp	=2;
			// if(ret==false)
			// {
				// alert("請先插入[機關(或副卡)憑證]智慧卡!!");
				// Page_BlockSubmit=true;
				// return;
			// }
			// ret = document.all.ocx.SetMode(2);
					////SERVER_HSM		=0;
					////SERVER_CERTSTORE	=1;
					////CLIENT_GCA		=2;
					////CLIENT_MOICA		=3;
					////CLIENT_TEMP		=4;
					////CLIENT_CERTSTORE	=5;
					////CLIENT_JOB		=6;
			// if (ret==false)
			// {
				// alert("封裝元件初始化錯誤! [ocx.SetMode(2)]");
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
			
			//Page_BlockSubmit=false;
			//jf_ToolBarSubmit();
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
			//1050728	Kevin	Kevin_C	1050087			升二代 -E
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

    }
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
