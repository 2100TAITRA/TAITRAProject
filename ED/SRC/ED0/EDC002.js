/*
DATE	SA		PRG		MGR_NO			DESC
1031009 Cloud	Cloud	1030659			新增核決節點查詢程式
1031015 Yvonne	Yvonne	1030659			調整為一隻比較完整的查詢作業(之前的code就不留了)
1050922 David   Zen     1050087         二代公文修改
1051019 Leslie  Kenny   1050087         二代公文修改
1070830 Kevin   Justin  1070678         弱掃AJAX修改
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

//1050922 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1070830 Justin [1070678]弱掃AJAX修改
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
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	GetUppNode();

	var strUpPk = jf_Trim(document.all["txH_UpperPK"].value);	
	if (document.all["rbLayer2"].checked && strUpPk != "" )
		ddlSelect("dlUpper", strUpPk);	
}
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
//1050922 Zen 1050087 二代公文修改
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
	
    //1050922 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
			document.all["txH_UpperPK"].value = jf_Trim(document.all["dlUpper"].options[document.all["dlUpper"].selectedIndex].value);
		    //1050922 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/


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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function GetUppNode()
{
	var dlUpp = document.all["dlUpper"];
	if(document.all["rbLayer2"].checked)//有點選第二層才撈
	{
		//上層項目選項設為Enable
		dlUpp.disabled = false;
		
		var strUseDeptNo = 	jf_Trim(document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value);		
	    //1070830 Justin [1070678]弱掃AJAX修改
	    //var objUppInfo = EDC002.GetUpper(strUseDeptNo , document.all["H_OrgNo"].value).value;
		var objUppInfo = ED0.EDC002.GetUpper(strUseDeptNo, document.all["H_OrgNo"].value).value;
		
		if(objUppInfo!="")
		{
			//清空選項重塞
			fnClearDropDownList(dlUpp);
			
			dlUpp.options.add(new Option("",""));//先塞一筆空白
			
			var objUppList = objUppInfo.split(';');//objUppList的最後一組不需要塞到選項裡
			
			if (objUppList.length >0)
			{
				for(var i=0;i< objUppList.length;i++)
				{
					var strUpperInfo = objUppList[i].split('|');//上層的 NODE_NAME |PK
					
					if (strUpperInfo.length >=2)
					{
						dlUpp.options.add(new Option(strUpperInfo[0],strUpperInfo[1]));
						dlUpp.options[i].title = dlUpp.options[i].text;
					}
				}
			}
		}
		else
		{
			//表示沒有上層項目可選，將選項清空
			fnClearDropDownList(dlUpp);
			dlUpp.options.add(new Option("",""));
		}
	}
	else
	{
		//表示選為第一層，清空上層項目選項，且設為disable
		fnClearDropDownList(dlUpp);
		dlUpp.options.add(new Option("",""));
		dlUpp.disabled = true;
	}
}

function fnClearDropDownList(obj)//專用呼叫清空控制項
{
	while(obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
		obj.options.remove(0);			
}

function ddlSelect(argSelectId,argSelectValue)
{
	if(argSelectValue == "")
		return;
	for(var i=0;i<document.all[argSelectId].length;i++)
	{
		if(document.all[argSelectId].options[i].value == argSelectValue)
		{
			document.all[argSelectId].selectedIndex = i;
			break;
		}
	}
}
function ReturnValue(argLink)
{
    
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.window.CallBack("EDC002");
	    close();
	}
	catch (e) {}
    
}
