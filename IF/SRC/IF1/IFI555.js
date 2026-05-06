/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2011.11.07	CLOUD	  	1000539	新增程式IFI555稽核紀錄
 * 2012.04.05   CLOUD     	------- 新增回存清理功能
 * 2015.05.13   Kenny     	1040358 改以新ajax元件(for .net4.0)呼叫函式取得各單位所屬人員資訊
 * 2016.06.02	Kenny		1050087	二代公文系統相關修改
 * 1051019		Joe		1050087		二代修改配合行動平台
 * 1140411	    Joeko	    1131221	新增匯出Excel功能
 ****************************************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1040513   Kenny   [1040358]   改以新ajax元件，新版ajax非同步時會有TIMEOUT異常，增加此段避開異常
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}

//1050603	Kenny   [1050087]	二代公文系統相關修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

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
	Page_BlockSubmit=true;
	switch (xObjectName)
	{
		//1050603	Kenny   [1050087]	二代公文系統相關修改--Start--
		//case "btCalendarS":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txDateStart, event.screenX, event.screenY);
		//	break;
		//case "btCalendarE":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txDateEnd, event.screenX, event.screenY);
		//	break;
		//1050603	Kenny   [1050087]	二代公文系統相關修改--End--
	}
}

//1050603	Kenny   [1050087]	二代公文系統相關修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
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
	
	//1050603	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	Page_BlockSubmit=false;

	switch (xObjectName)
	{
		case "btSearch":
			if(document.all.txDateStart.value != "")
			{
				if( CheckDATE("txDateStart","時間範圍(起)格式錯誤") == false  )
				{
					//1050603	Kenny   [1050087]	二代公文系統相關修改
					//document.all.txDateStart.focus();
					$('#txDateStart').focus();
				
					return;
				}
			}
			if(document.all.txDateEnd.value != "")
			{
				if( CheckDATE("txDateEnd","時間範圍(迄)格式錯誤") == false  )
				{
					//1050603	Kenny   [1050087]	二代公文系統相關修改
					//document.all.txDateEnd.focus();
					$('#txDateEnd').focus();
					
					return;
				}
			}
			//1050603	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		//0970155	國合會新增"稽核紀錄管制表"之預覽/列印功能鍵
		case "btPrint":
			Page_BlockSubmit = !CheckBeforeSearch();
			//1050603	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		//1140411	Joeko	1131221	新增匯出Excel功能
		case "btExcel":
			Page_BlockSubmit = !CheckBeforeSearch();
			//1050603	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		// 2012.04.05   CLOUD     -------   新增回存清理功能
		case "btClean":
			Page_BlockSubmit = false;
			//1050603	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSaveBack":
			Page_BlockSubmit = false;
			//1050603	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}	
}

//0970155	配合預覽列印功能，進行日期格式檢核
function CheckBeforeSearch()
{
	if(document.all.txDateStart.value != "")
	{
		if( CheckDATE("txDateStart","時間範圍(起)格式錯誤") == false )
		{
			//1050603	Kenny   [1050087]	二代公文系統相關修改
			//document.all.txDateStart.focus();
			$('#txDateStart').focus(); 
			
			return false;
		}
	}
	if(document.all.txDateEnd.value != "")
	{
		if( CheckDATE("txDateEnd","時間範圍(迄)格式錯誤") == false )
		{
			//1050603	Kenny   [1050087]	二代公文系統相關修改
			//document.all.txDateEnd.focus();
			$('#txDateEnd').focus(); 
			
			return false;
		}
	}
	return true;
}
var bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
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
			//1050603	Kenny   [1050087]	二代公文系統相關修改
			//document.all[argObj].focus();
			$('#'+argObj).focus(); 
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	//1050603	Kenny   [1050087]	二代公文系統相關修改，改以JQuery寫法取得物件
	//if($("ddlDept").value != "")
	//	fnddlDeptChange($("ddlUser").value);
	if($('#ddlDept')[0].value != "")
		fnddlDeptChange($('#ddlUser')[0].value);
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

//以ID取得該物件，拿來偷懶用的
//1050603	Kenny   [1050087]	二代公文系統相關修改，MARK此函式避免與JQuery物件混淆造成錯誤
//function $(O)
//{
//	return document.getElementById(O)
//}

function fnddlDeptChange(objSelect)
{
	//1050603	Kenny   [1050087]	二代公文系統相關修改，改以JQuery寫法取得物件
	//var strDept = $("ddlDept").value;	
	var strDept = $('#ddlDept')[0].value;
    //1040513   Kenny   [1040358]  因應使用新ajax元件，修改呼叫方式
    //var arUser = IFI555.GetUserByDept(jf_GetSessionID(), strDept).value;
	var arUser = IF1.IFI555.GetUserByDept(jf_GetSessionID(), strDept).value;
	var iLen = arUser.length;
	//1050603	Kenny   [1050087]	二代公文系統相關修改，改以JQuery寫法取得物件
	//var dlUser = $("ddlUser");
	var dlUser = $('#ddlUser')[0];
	if(iLen > 0)
	{
		fnClearDropDownList(dlUser);
		dlUser.options.add(new Option("所有人",strDept));
	}
	
	for(var i=0;i<iLen;i++)
	{
		var strUser = arUser[i].split('|');
		dlUser.options.add(new Option(strUser[0]+"("+strUser[1]+")",strUser[0]));//將name和value分別存入dlDept中
		if(objSelect == strUser[0])
			dlUser.selectedIndex = i+1;
	}
}

function fnClearDropDownList(obj)//專用呼叫清空控制項
{
	while(obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
		obj.options.remove(0);			
}