/*
DATE		SA			PRG			MGR_NO		DESC
0981204		Stella		David		0980336		支援IE8，修正JS語法嚴謹度
1080214		Kevin		Joe			1080179		弱掃修正Client Server Empty Password、Heap Inspection
1100201		Leslie		Joe			1090927		取消使用document.activeElement
*/
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	
}

function ProjectOnLoad()
{

}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
function ClientButtonControl(e)
{
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	switch (xObjectName)
	{
		case "ImgClear":
			ClientOnLoad();
			jf_Clear();
			Page_BlockSubmit=true;
			break;
		case "Imglogin":
			Page_BlockSubmit = jf_ChecktbValue();
			document.all["H_ButtonType"].value = "Imglogin";
			break;
		case "ImgPeoplelogin":
			document.all["H_ButtonType"].value = "ImgPeoplelogin";
			break;
	}
}
function jf_Clear()
{
	document.all.tbUserId.value = "";
	//1080214	Joe			1080179		弱掃修正Client Server Empty Password
	// document.all.tbPassWord.value = "";	
	$("#tbMima").val('');
}
function jf_ChecktbValue()
{
	var rtn = true;
	if(jf_Trim(document.all.tbUserId.value)=="")
	{
		alert("請輸入帳號");
		document.all.tbUserId.focus();
	}
	//1080214 Joe 1080179 弱掃修正Heap Inspection
	// else if(jf_Trim(document.all.tbPassWord.value) == "")
	else if(jf_Trim(document.all.tbMima.value) == "")
	{
		alert("請輸入密碼");
		//1080214 Joe 1080179 弱掃修正Heap Inspection
		// document.all.tbPassWord.focus();
		document.all.tbMima.focus();
	}
	else
		rtn = false;
	return rtn;
}
function jf_Trim(argStr)
{ 
	var StrLen    = argStr.length;
	while ( argStr.indexOf(" ") == 0 )
	{
		argStr = argStr.substr(1);
		StrLen--;
	}
	while ( argStr.lastIndexOf(" ") == StrLen-1 )
	{ 
		argStr = argStr.substr(0, StrLen-1);
		StrLen--;
	}
	return argStr;
}

function jf_Redirect(argURL)
{
	alert("start");
	//0981204 David 0980336 支援IE8，修正JS語法嚴謹度
	//var screenWidth = screen.availwidth-10;
	//var screenHeight = screen.availheight-20;
	var screenWidth = screen.availWidth-10;
	var screenHeight = screen.availHeight-20;
	jf_OpenChildWin(argURL, "", screenWidth, screenHeight);
	alert("open");
}