/*
DATE     SA		PRG		MGR_NO		DESC
0970902	 --    Leo   	0970735    修改不傳網址參數gUSERNAME    
1000623  --    Davy  	--			新增MAIN2(逢甲專用版首頁)
1020531	 Kevin Cloud 	1000751	修改以機關別稱判斷使用機關
1021029	 --	   Cloud 	1000751	修正以機關別稱判斷使用機關漏改部份
1080820	Cloud	Kevin_C	1080664		調整POSTBACK方式，讓登入先經過JS檔再回SERVER端，並再登入時對密碼進行HtmlEncode
1100623	 Kevin	Joe		1100789		弱掃修正Heap Inspection
1110520	 Leslie	Leslie	1110371		純檔管升級二代
*/
function LogonSucess(argArtifact, argId) 
{
	var url = "Main.htm?SAMLart=" + argArtifact;//0970902 Leo 0970735 + "&gUSERNAME=" + argId;
	//1000623 Davy 新增MAIN2(逢甲專用版首頁)
	//1020531	 Kevin Cloud 1000751	修改以機關別稱判斷使用機關
	//if(document.all.nOrgNo.value=="310900700Q")
	//1021029	 --	   Cloud 1000751	修正以機關別稱判斷使用機關漏改部份
	//if(document.all.nOrgNo.value=="FCU")
	if (document.all.txOrgNickName.value == "FCU")
		url = "Main2.htm?SAMLart=" + argArtifact;
	//1020531	 Kevin Cloud 1000751	修改以機關別稱判斷使用機關
	//if(document.all.nOrgNo.value=="313210000G")
	//1110520 Leslie[1110371] 純檔管升級二代	Leslie	
	//if (document.all.txOrgNickName.value == "BOE") 
	{
		document.location = url;
	}
	/*else 
	{
		open(url, "", "Height=" + (window.screen.height - 60) + ",Width=" + (window.screen.width - 10) + ",Top=0,Left=0,Scrollbars=yes,status=yes,resizable=yes");
		//0981207	Leslie	因應IE8調整，以避免關閉視窗時會跳出提醒訊息
		//opener=parent;
		open("", "_self");
		close();
	}*/
}
//1080820	Kevin_C	1080664		調整POSTBACK方式，讓登入先經過JS檔再回SERVER端，並再登入時對密碼進行HtmlEncode -S
var IsServerHandling = new Boolean();
IsServerHandling = false;

function ClientButtonControl(event)
{
	var xObjectName = document.activeElement.id;
	
	if(IsServerHandling)
	   return;
	
	//不用檢查是否已被登出
	//if(jf_IsTimeOut())
	//{
	//	Page_BlockSubmit=true;
	//	return;
	//}
	//1110520 Leslie[1110371] 純檔管升級二代
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btLOGIN":
			Page_BlockSubmit = false;
			//進行編碼
			document.all.tbPASS.value = HtmlEncode(document.all.tbPASS.value);
			//1110520 Leslie[1110371] 純檔管升級二代
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btEXIT":
			Page_BlockSubmit = true;
			window.close();
			break;
		//1100623	Joe		1100789		弱掃修正Heap Inspection
		// case "btChangPwd":
		case "btChangMima":
			Page_BlockSubmit = true;
			break;
	}
}

function jf_ToolBarHandle()
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
	
	xObjectName= window.event.srcNode.getAttribute("ID");
	
	Page_BlockSubmit = true;
	switch (xObjectName)
	{
	}
}
function ClientOnLoad()
{
	fnLoad();
}
function OnWSResult(argResult)
{
	if (jf_IsWebServiceSuccess(argResult))
	{
	}
}
function jf_MenuInit() {
}
//增加編碼讓特殊字元可通過檢核
function HtmlEncode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}
//1080820	Kevin_C	1080664		調整POSTBACK方式，讓登入先經過JS檔再回SERVER端，並再登入時對密碼進行HtmlEncode -E