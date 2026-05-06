/*
DATE    SA		PRG		MGR_NO		DESC
1031013 Cloud	Kevin_C	1030659 	新增程式
1031015 Yvonne	Yvonne	1030659 	沒時間退PG慢慢修，直接改
1031020	---		Cloud	1030659		因現場區管中心有分北區、中區、南區，但使用同條分層決行，修改建值為單位+代碼
1050615 Cloud   Zen     1050391     分層決行增加，調整對應邏輯
1050622 David   Zen     1050087     二代公文修改
1051019 Leslie  Kenny   1050087     二代公文修改
1070830 Kevin   Justin  1070678     弱掃AJAX修改
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
//1050623 Zen 1050087 二代公文修改
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
//1050623 Zen 1050087 二代公文修改
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
	
    //1050623 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			//1031020	Cloud	1030659			因現場區管中心有分北區、中區、南區，但使用同條分層決行，修改建值為單位+代碼
			//Page_BlockSubmit = !jf_CheckKeyObject();
			Page_BlockSubmit = !CheckbeforeOpen();
		    //1050623 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050623 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050623 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050623 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			jf_dlUseDeptChange();
		    //1050623 Zen 1050087 二代公文修改
			//document.all["txProxyNo"].focus();
			$('#txProxyNo').focus();
			break;
		case "btSearch":
			var strUrl = "";
			var ddl = document.getElementById("dlUseDept");
			var argDept = jf_Trim(ddl.options[ddl.selectedIndex].value);
			strUrl = "EDC003.aspx?rtnObj=lbReturnValue&argDept="+argDept;
			jf_OpenChildWin(strUrl, "EDC003", 750, 580 );
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			//1031020	Cloud	1030659			因現場區管中心有分北區、中區、南區，但使用同條分層決行，修改建值為單位+代碼
			if(jf_CheckDataExists(""))//檢查鍵值是否已存在jf_CheckDataExist("")
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
}
//1031020	Cloud	1030659			因現場區管中心有分北區、中區、南區，但使用同條分層決行，修改建值為單位+代碼-S
function CheckbeforeOpen()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var str = jf_Trim(document.all["txProxyNo"].value);
	var res = str.match(/^\d+$/);
	if(res==null)
	{
		strErrMsg += "決行層級代碼只能輸入數字\n";
	    //1050623 Zen 1050087 二代公文修改
		//document.all["txProxyNo"].focus();
		$('#txProxyNo').focus();
	}
	if (jf_Trim(document.all["txProxyNo"].value) == "")
	{
		strErrMsg += "決行層級代碼不可為空白\n";
	    //1050623 Zen 1050087 二代公文修改
		//document.all["txProxyNo"].focus();
		$('#txProxyNo').focus();
	}
	
	var checkDlUseDept = jf_Trim(document.getElementById("dlUseDept").options[document.getElementById("dlUseDept").selectedIndex].value);
	if (checkDlUseDept == "" || checkDlUseDept=== "undefined")
	{
		strErrMsg += "單位不可為空白\n";
	    //1050623 Zen 1050087 二代公文修改
		//document.all["dlUseDept"].focus();
		$('#dlUseDept').focus();
	}
	var checkNode1 = jf_Trim(document.getElementById("dlNode1").options[document.getElementById("dlNode1").selectedIndex].value);
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}
//1031020	Cloud	1030659			因現場區管中心有分北區、中區、南區，但使用同條分層決行，修改建值為單位+代碼-E

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var str = jf_Trim(document.all["txProxyNo"].value);
	var res = str.match(/^\d+$/);
	if(res==null)
	{
		strErrMsg += "決行層級代碼只能輸入數字\n";
	    //1050623 Zen 1050087 二代公文修改
		//document.all["txProxyNo"].focus();
		$('#txProxyNo').focus();
	}
	if (jf_Trim(document.all["txProxyNo"].value) == "")
	{
		strErrMsg += "決行層級代碼不可為空白\n";
	    //1050623 Zen 1050087 二代公文修改
		//document.all["txProxyNo"].focus();
		$('#txProxyNo').focus();
	}
	
	if (jf_Trim(document.all["txProxyName"].value) == "")
	{
		strErrMsg += "決行層級名稱不可為空白\n";
	    //1050623 Zen 1050087 二代公文修改
		//document.all["txProxyName"].focus();
		$('#txProxyName').focus();
	}
	var checkDlProxy = jf_Trim(document.getElementById("dlProxy").options[document.getElementById("dlProxy").selectedIndex].value);
	if (checkDlProxy == "" || checkDlProxy=== "undefined")
	{
		strErrMsg += "決行層級不可為空白\n";
	    //1050623 Zen 1050087 二代公文修改
		//document.all["dlProxy"].focus();
		$('#dlProxy').focus();
	}
	var checkDlUseDept = jf_Trim(document.getElementById("dlUseDept").options[document.getElementById("dlUseDept").selectedIndex].value);
	if (checkDlUseDept == "" || checkDlUseDept=== "undefined")
	{
		strErrMsg += "單位不可為空白\n";
	    //1050623 Zen 1050087 二代公文修改
		//document.all["dlUseDept"].focus();
		$('#dlUseDept').focus();
	}
	var checkNode1 = jf_Trim(document.getElementById("dlNode1").options[document.getElementById("dlNode1").selectedIndex].value);
	if (checkNode1 == "" || checkNode1=== "undefined")
	{
		strErrMsg += "第一層節點不可為空白\n";
	    //1050623 Zen 1050087 二代公文修改
		//document.all["dlNode1"].focus();
		$('#dlNode1').focus();
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
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
	//1031020	Cloud	1030659			因現場區管中心有分北區、中區、南區，但使用同條分層決行，修改建值為單位+代碼
	
	if(argCallerId == "EDC003")
	{
		document.all["txProxyNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		//1031020	Cloud	1030659			因現場區管中心有分北區、中區、南區，但使用同條分層決行，修改建值為單位+代碼
		document.all["H_DeptNoFromChild"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		Page_BlockSubmit=false;
		jf_OpenButtonSubmit();
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
function jf_dlUseDeptChange()
{
    //1050615 Zen 1050391 分層決行增加，調整對應邏輯
    document.getElementById('dlNode1').disabled = false;
    document.getElementById('dlNode2').disabled = false;

	var ddl = document.getElementById("dlUseDept");
    //1070830 Justin [1070678]弱掃AJAX修改
    //var tempDDL = EDM003.SetNode1(document.all["H_OrgNo"].value, ddl.options[ddl.selectedIndex].value).value
    var tempDDL = ED0.EDM003.SetNode1(document.all["H_OrgNo"].value, ddl.options[ddl.selectedIndex].value).value;
	var strDDL = tempDDL.split(";");
	//設定節點1
	for(var i=document.getElementById("dlNode1").options.length; i>=0; i--){
		document.getElementById("dlNode1").options[i]=null;
	}
    //1050616 Zen  1050391 分層決行增加，調整對應邏輯
	//if (strDDL != null)
	if (strDDL[0] != '')
	{
		for(var i=0; i<strDDL.length; i++)
		{
			var opt = document.createElement("option");
			opt.text = strDDL[i].split(":")[0];
			opt.value = strDDL[i].split(":")[1];
			document.getElementById("dlNode1").options.add(opt);
		}
    }
    else
    {
		var opt = document.createElement("option");
		opt.text = ""
		opt.value = "0"   
		document.getElementById("dlNode1").options.add(opt);

	    //1050616 Zen  1050391 分層決行增加，調整對應邏輯
		alert('此使用單位無子類別');
		document.getElementById('dlNode1').disabled = true;
		document.getElementById('dlNode2').disabled = true;
    }
	document.getElementById("dlNode1").selectedIndex = 0;
    //設定節點2
    ddl = document.getElementById("dlNode1");
    //1070830 Justin [1070678]弱掃AJAX修改
    //tempDDL = EDM003.SetNode2(document.all["H_OrgNo"].value, ddl.options[ddl.selectedIndex].value).value;
	tempDDL = ED0.EDM003.SetNode2(document.all["H_OrgNo"].value, ddl.options[ddl.selectedIndex].value).value;
    for(var i=document.getElementById("dlNode2").options.length; i>=0; i--){
		document.getElementById("dlNode2").options[i]=null;
	}
	strDDL = tempDDL.split(";");
	if(strDDL!=null)
	{
		document.all["dlNode2"].options.add(new Option("",""));//塞一筆空白
		for(var i=0; i<strDDL.length; i++)
		{
			var opt = document.createElement("option");
			opt.text = strDDL[i].split(":")[0];
			opt.value = strDDL[i].split(":")[1];
			document.getElementById("dlNode2").options.add(opt);
		}
	}
	else
	{
		document.all["dlNode2"].options.add(new Option("",""));//塞一筆空白
		var opt = document.createElement("option");
		opt.text = "";
		opt.value = "0";            
		document.getElementById("dlNode2").options.add(opt);
	}
	document.getElementById("dlNode2").selectedIndex = 0;
	document.getElementById("H_txSelectedIndex").value = document.getElementById("dlNode1").options[document.getElementById("dlNode1").selectedIndex].value + ":" + document.getElementById("dlNode2").options[document.getElementById("dlNode2").selectedIndex].value;
}
function jf_Node1Change()
{
	var ddl = document.getElementById("dlNode1");
    //1070830 Justin [1070678]弱掃AJAX修改
    //var tempDDL = EDM003.SetNode2(document.all["H_OrgNo"].value, ddl.options[ddl.selectedIndex].value).value;
    var tempDDL = ED0.EDM003.SetNode2(document.all["H_OrgNo"].value, ddl.options[ddl.selectedIndex].value).value;
	for(var i=document.getElementById("dlNode2").options.length; i>=0; i--){
		document.getElementById("dlNode2").options[i]=null;
	}
	var strDDL = tempDDL.split(";");
	if(strDDL!=null)
	{
		document.all["dlNode2"].options.add(new Option("",""));//塞一筆空白
		for(var i=0; i<strDDL.length; i++)
		{
			var opt = document.createElement("option");
			opt.text = strDDL[i].split(":")[0];
			opt.value = strDDL[i].split(":")[1];
			document.getElementById("dlNode2").options.add(opt);
		}
	}
	else
	{
		document.all["dlNode2"].options.add(new Option("",""));//塞一筆空白
		var opt = document.createElement("option");
		opt.text = "";
		opt.value = "0";
		document.getElementById("dlNode2").options.add(opt);
	}
	document.getElementById("dlNode2").selectedIndex = 0;
	document.getElementById("H_txSelectedIndex").value =document.getElementById("dlNode1").options[document.getElementById("dlNode1").selectedIndex].value+":"+document.getElementById("dlNode2").options[document.getElementById("dlNode2").selectedIndex].value;
}
function jf_Node2Change()
{
	document.getElementById("H_txSelectedIndex").value =document.getElementById("dlNode1").options[document.getElementById("dlNode1").selectedIndex].value+":"+document.getElementById("dlNode2").options[document.getElementById("dlNode2").selectedIndex].value;
}
function jf_CheckDataExists()
{	
	//1031020	Cloud	增加單位代碼
	//return EDM003.CheckKeyExist(document.all["H_OrgNo"].value, document.getElementById("txProxyNo").value).value;
	var ddl = document.getElementById("dlUseDept");
    //1070830 Justin [1070678]弱掃AJAX修改
	//return EDM003.CheckKeyExist(document.all["H_OrgNo"].value, document.getElementById("txProxyNo").value,ddl.options[ddl.selectedIndex].value).value;
    return ED0.EDM003.CheckKeyExist(document.all["H_OrgNo"].value, document.getElementById("txProxyNo").value, ddl.options[ddl.selectedIndex].value).value;
}
function isMaxLength(obj)
{
	if (obj.value.length==100)
	{
		if(event.keyCode !='8' && event.keyCode !='46' && event.keyCode !='37' && event.keyCode !='38' && event.keyCode !='39' && event.keyCode !='40' && event.keyCode !='16')
			if (document.selection != undefined){
				var sel = document.selection.createRange();
				selectedText = sel.text;
				if(selectedText == ""){
					event.returnValue = false;
					jf_ShowMsg("","備註長度不可超過100!");
				}
			}
			
	}else if(obj.value.length>100){
		jf_ShowMsg("","備註長度不可超過100!");
		obj.value=obj.value.substring(0,100)
	}
}
function checkOnBlur(obj){
	if (obj.value.length>100)
	{
		jf_ShowMsg("","備註長度不可超過100!");
			
		obj.value=obj.value.substring(0,100)
	}
}

