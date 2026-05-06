/*
DATE	SA		PRG		MGR_NO		DESC
0980918	Stella	David	0980455		使用WebFileIO時，應傳入Artifact
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1050127	Cloud	Kevin_C	1050001		加上後括號避免程式出錯
1050725 Cloud	Kevin_C	1050087		升二代
1051031	Leslie	Joe		1050087		二代修改配合行動平台
1100412	David	David	1080756		Merge至共通版(V5.0.51)
1100725 Joe     Joe     1100648     新增常用詞庫UI判斷
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050725	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050725	Kevin_C	1050087	升二代 -S
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1050725	Kevin_C	1050087	升二代 -E

window.onunload = fnWindowOnUnLoad;
function fnWindowOnUnLoad()
{
	window.returnValue = true;
}

//1051031	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051031	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
/* justin	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
*/
	
}

//1050725	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
/*	justin
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
*/	
	//1050725	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}



function ClientOnLoad()
{
    if (document.all["NODATA"]) {
        //1100725   Joe     1100648     新增常用詞庫UI判斷--S
        if (document.all["NODATA"].value == "ORG") {
            document.all["divOrg"].style.display = "none";
            document.all["SetupBtn"].style.display = "none";
        }
        else if (document.all["NODATA"].value == "PERSON") {
            document.all["divPerson"].style.display = "none";
            document.all["SetupBtn"].style.display = "none";
        }
        else {
        //1100725   Joe     1100648     新增常用詞庫UI判斷--E
            alert('未設定常用詞彙，請由程式選單開啟WEM030 常用詞彙維護作業新增。');
            var rtnobj =
           {
               "argClsNo": "",
           };
            parent.$("#extdlg_close_btn").trigger("click", rtnobj);
        }

    }
    else {
        document.all["SetupBtn"].style.display = "none";
    }
	
}



//回傳物件
function CallBack(argDict)
{
    var rtnobj =
		{
		    "argClsNo": argDict,
		};
    parent.$("#extdlg_close_btn").trigger("click", rtnobj);
}



