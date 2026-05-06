/*
DATE	SA		PRG		MGR_NO	DESC
1060209 Cloud   Joe		1050087 二代升級
1070830 Kevin   Zen     1070678 弱掃Ajax修正
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
var strTableFields = new Array("_txVerCls");

//1060209	Joe		1050087		二代公文修改--S
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
// if(document.all.dg1)
	// document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;	
//1060209	Joe		1050087		二代公文修改--E
	
if (document.all["dlSect"].length == 0)
	document.all["dlSect_Container"].disabled = true;	

//1070830 Zen 1070678 弱掃Ajax修正
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060209	Joe		1050087		二代公文修改--S
	// jf_CallWS("../EALIB/EA_LIB.asmx", "GetDepts", false, null); //使用WebService前必須先呼叫一次
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//1060209	Joe		1050087		二代公文修改--E
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060209	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060209	joe		1050087		二代修改配合行動平台
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
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060209 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060209 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if (document.all["dlDept_Text"].value == "")
			{
				Page_BlockSubmit = true;
				alert('承辦單位不可空白');
			}
			//1060209 Joe 1050087 二代公文修改
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
			//1060209 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060209 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060209 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1060209	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txKeyFld"].focus();
			$('#txKeyFld').focus();
			break;
		case "btSearch":
			/*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060209 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060209 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
			Page_BlockSubmit = true;
			DeleteSelected();
			jf_SelectBarSubmit();
			break;		
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
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
			if(jf_CheckDataExist_Custom(document.all["txOrgNo"].value))//檢查鍵值是否已存在 //zn
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

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["dlDept_Text"].value == "")
	{
		strErrMsg += "承辦單位不可空白\n";
		//1060209	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["dlDept_Text"].focus();
		$('#dlDept_Text').focus();
	}
	
	if (document.all.dg1.rows.length == "1")
	{
		strErrMsg += "資料顯示區中必須至少要有一筆資料\n";
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	//放入隱藏TextBox 供server端取用 -- start --
	var buf="";
	document.all["H_DATA"].value = "";
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		var strClsKey     = document.all["dg1__ctl"+iRow+"_txClsKey"].value;
		
		if (document.all["H_DATA"].value !="")
			document.all["H_DATA"].value += ","+strClsKey;
		else
			document.all["H_DATA"].value += strClsKey;
	}	
	//Cola -- end --
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent+"之列中,"+InValidName])),"");
				//1060209	Joe	1050087	二代系統升級，調整focus寫法
				// document.all[InValidControlName].focus();
				$('#' + InValidControlName).focus();		
				return false;
			}
		}
	}
	return true;
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
    
   if(argResult.id == CallWS_ID_SECT)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			WSResult = argResult.value;		
			
			//95.11.27 950489 David
			//1060209	Joe	1050087	二代系統升級
			// document.all["dlSect_Container"].className = "";
			document.all["dlSect_Container"].className = "custom-combobox";
			document.all["dlSect"].className = "";
			document.all["dlSect_Text"].className = "";
			
			//95.11.27 950489 David
			document.all["dlSect_Text"].value = "";
			
			while(document.all.dlSect.options[0] != null)
			{
				document.all.dlSect.options[0]=null;				
			}
			
			var DropListChild = document.createElement("OPTION");
			DropListChild.text = "";
			DropListChild.value = "";
			document.all.dlSect.options.add(DropListChild);
			
			if(WSResult.SecNo.length != 0)
			{

				//[001209]Add by Cola -- start --
				ClearDL(document.all["dlSect"]);			
				
				var Blank_Data = document.createElement("OPTION");
				Blank_Data.text = "";
				Blank_Data.value = ":";				
				document.all.dlSect.options.add(Blank_Data);
				//Cola -- end --
											
				for(var i=0;i<WSResult.SecNo.length;i++)
				{
					var SectDropListChild = document.createElement("OPTION");
					SectDropListChild.text = WSResult.SecName[i];
					//0960084 Modify by Cola 為了與EA_LIB.CS中Function組出元素相同，額外新增兩欄位
					SectDropListChild.value = WSResult.DeptNo[i]+":"+WSResult.DeptName[i]+":"+WSResult.SecNo[i]+":"+WSResult.SecName[i];
					document.all.dlSect.options.add(SectDropListChild);
				}
				if(document.all["dlSect"].options.length > 10)
				{
					document.all["dlSect"].size = 10;
				}
				else
					document.all["dlSect"].size = document.all["dlSect"].options.length;
				
				document.all["dlSect_Container"].disabled = false;

			}
			else
			{				
				while(document.all.dlSect.options[0] != null)
				{
					document.all.dlSect.options[0]=null;				
				}
				document.all["dlSect_Container"].disabled = true;	

			}
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
	if(argCallerId == "EAC004")
	{
		document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);		
		txVeronBlur();
	}
		
	if(argCallerId == "EAC005")
	{		
		if ( document.all["txFileCls"] != null )		
			document.all["txFileCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		if ( document.all["txVerNo"] != null )			
			document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);				
		txFileClsOnBlur();

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
function CheckAccount()
{
	if (document.all["txAcc"].value !="")
	{
        //1070830 Zen 1070678 弱掃Ajax修正
        //var RtnVale = EAT804.CheckAccExist(document.all["txAcc"].value, document.all["txOrgNo"].value).value;
        var RtnVale = EA08.EAT804.CheckAccExist(document.all["txAcc"].value, document.all["txOrgNo"].value).value;
		if (RtnVale == "0")
		{
			alert("人員不存在。");
			document.all["txAcc"].value = "";
			//1060209	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txAcc"].focus();
			$('#txAcc').focus();
		}
	}
}
function txVeronBlur()
{
	if (document.all["txVerNo"].value != "")
	{
		if (document.all["txFileCls"].value =="")
		{
            //1070830 Zen 1070678 弱掃Ajax修正
            //var CheckResult = EAT804.CheckVer(document.all["txVerNo"].value, document.all["txOrgNo"].value, "").value;
            var CheckResult = EA08.EAT804.CheckVer(document.all["txVerNo"].value, document.all["txOrgNo"].value, "").value;
			if (CheckResult.split(',')[0] == "false")
			{
				document.all["txVerNo"].value = "";
				alert(CheckResult.split(',')[1]);
				//1060209	Joe	1050087	二代系統升級，調整focus寫法
				// document.all["txVerNo"].focus();
				$('#txVerNo').focus();
			}
		}
		else
		{
            //1070830 Zen 1070678 弱掃Ajax修正
            //var CheckResult = EAT804.CheckVer(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
            var CheckResult = EA08.EAT804.CheckVer(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
			if (CheckResult.split(',')[0] == "false")
			{
				document.all["txVerNo"].value = "";
				alert(CheckResult.split(',')[1]);
				//1060209	Joe	1050087	二代系統升級，調整focus寫法
				// document.all["txVerNo"].focus();
				$('#txVerNo').focus();
			}
		}
	}
}
function txFileClsOnBlur()
{
	if (document.all["txFileCls"].value != "")
	{
		if (document.all["txVerNo"].value =="")
		{
            //1070830 Zen 1070678 弱掃Ajax修正
            //var CheckResult = EAT804.CheckCls(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
            var CheckResult = EA08.EAT804.CheckCls(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
			if (CheckResult.split(',')[0] == "false")
			{
				if (CheckResult.split(',')[1] == "無此分類號，請重新輸入，或點選查詢子視窗查詢分類號。")
				{
					document.all["txFileCls"].value = "";
					alert(CheckResult.split(',')[1]);
					//1060209	Joe	1050087	二代系統升級，調整focus寫法
					// document.all["txFileCls"].focus();
					$('#txFileCls').focus();
				}
				else
				{
					alert(CheckResult.split(',')[1]);		
					//1060209	Joe	1050087	二代系統升級，調整focus寫法
					// document.all["txVerNo"].focus();
					$('#txVerNo').focus();		
				}
			}
			else
			{
				document.all["txVerNo"].value = CheckResult.split(',')[3];//帶出版別
			}
		}
		else
		{
            //1070830 Zen 1070678 弱掃Ajax修正
            //var CheckResult = EAT804.CheckCls(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
            var CheckResult = EA08.EAT804.CheckCls(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value;
			if (CheckResult.split(',')[0] == "false")
			{
				document.all["txFileCls"].value = "";
				alert(CheckResult.split(',')[1]);
				//1060209	Joe	1050087	二代系統升級，調整focus寫法
				// document.all["txFileCls"].focus();
				$('#txFileCls').focus();
			}
		}
	}
}
function ibCls_Onclick()
{
	var strVerNo = document.all["txVerNo"].value;

	Page_BlockSubmit=true;			
	var strUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAT009" + "&VER_NO=" + strVerNo+"&MODE=1";
	jf_OpenChildWin(strUrl, "EAT804", 700, 500 );		
}
function ibVer_Onclick()
{
	Page_BlockSubmit=true;	
	var strUrl = "../EA01/EAC004.aspx";
	jf_OpenChildWin(strUrl, "EAT804", 700, 500 );
}
function btAdd_Onclick()
{
	Page_BlockSubmit=true;
	if (document.all["txVerNo"].value!= "" && document.all["txFileCls"].value != "")
	{
		if (IsDocNoExist())
			return;	
		var InsertRow = document.all["dg1"].insertRow();
		var len = document.all["dg1"].rows.length;	//先Insert so長度已+1

		//ID整除==單數序
		if (len % 2==0)
			InsertRow.style.backgroundColor = "#F7F7DE";
		//置中
		InsertRow.style.textAlign = "Center";
		
		//序
		var lbSEQ_NO = document.createElement("span");
		lbSEQ_NO.setAttribute("id","dg1__ctl"+len+"_lbSEQ_NO");
		//1060210	Joe		1050087		二代升級
		// lbSEQ_NO.setAttribute("innerText",len-1);
		lbSEQ_NO.textContent = len - 1;
		InsertRow.insertCell(0).appendChild(lbSEQ_NO);

		//選取
		var cbSelect = document.createElement("input");
		cbSelect.setAttribute("type","checkbox");
		cbSelect.setAttribute("id","dg1__ctl"+len+"_cbSelect");
		InsertRow.insertCell(1).appendChild(cbSelect);
		cbSelect.style.color = "Navy";
		
		//版別-類別
		var txVerCls = document.createElement("input");
		txVerCls.setAttribute("id","dg1__ctl"+len+"_txVerCls");
		txVerCls.setAttribute("value",document.all["txVerNo"].value+"-"+document.all["txFileCls"].value);
			//1060209	Joe	1050087	二代系統升級
		// txVerCls.setAttribute("className","TextLabel");
		txVerCls.setAttribute("class","TextLabel");
		txVerCls.style.width = "100px";	
		InsertRow.insertCell(2).appendChild(txVerCls);
		txVerCls.style.color = "Navy";
		
		//分類號鍵值
		var txClsKey = document.createElement("input");
		txClsKey.setAttribute("id","dg1__ctl"+len+"_txClsKey");
        //1070830 Zen 1070678 弱掃Ajax修正
        //txClsKey.setAttribute("value", EAT804.GetClsKey(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value);
        txClsKey.setAttribute("value", EA08.EAT804.GetClsKey(document.all["txVerNo"].value, document.all["txOrgNo"].value, document.all["txFileCls"].value).value);
			//1060209	Joe	1050087	二代系統升級
		// txClsKey.setAttribute("className","hide");
		txClsKey.setAttribute("class","hide");
		txClsKey.style.width = "20px";	
		InsertRow.cells[2].appendChild(txClsKey);
		txClsKey.style.color = "Navy";	
		
		document.all["txVerNo"].value = "";
		document.all["txFileCls"].value = "";
	}
	else
		alert('請先輸入版本別及分類號後，再按下加入鈕。');
}
//清除勾選的row
function DeleteSelected()
{
	var len = document.all["dg1"].rows.length;
	var iCount=0;
	//若有勾選則將下一筆value寫入上一筆
	for (var iCheck=2;iCheck<len+1;iCheck++)
	{
		if (iCheck > iCheck-iCount)
		{
			document.all["dg1__ctl"+(iCheck-iCount)+"_txVerCls"].value	= document.all["dg1__ctl"+iCheck+"_txVerCls"].value;
			document.all["dg1__ctl"+(iCheck-iCount)+"_txClsKey"].value	= document.all["dg1__ctl"+iCheck+"_txClsKey"].value;
		}
		if (document.all["dg1__ctl"+iCheck+"_cbSelect"].checked)
			iCount++;
	}
	//清空CheckBox
	for (var iRow=2;iRow<document.all["dg1"].rows.length;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_cbSelect"].checked)
			document.all["dg1__ctl"+iRow+"_cbSelect"].checked = false;
	}

	//剩下最後的iCount筆刪掉
	for (var iDel=1;iDel<=iCount;iDel++)
	{
		document.all["dg1"].deleteRow(len-iDel);
	}
}
function IsDocNoExist()
{
	if (document.all.dg1 == null)
		return false;
	if (document.all.dg1.rows.length == 0)
		return false;
		
	var strData = document.all["txVerNo"].value+"-"+document.all["txFileCls"].value;
	for (var iRow=2;iRow<document.all.dg1.rows.length+1;iRow++)
	{
		if (document.all["dg1__ctl"+iRow+"_txVerCls"].value == strData)
		{
			jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["版別-分類號："+strData+"已存在於資料顯示區中，不允許再加入"])),"");
			return true;
		}
	}
	return false;
}
var CallWS_ID_SECT

function SyncDL()
{	
	if (document.all["dlDept_Text"].value != "")
	{
		//alert(document.all["dlDept1"].options[document.all["dlDept1"].selectedIndex].value);
		var strArr1 = new Array();
		var strArr2 = new Array();	
		var bAction = true;
		
		//0960084 Add by Cola 取得/設定 相關資訊 -- start --
		var bDept = false;
		var bSect = false;
		
		for ( var i = 0 ; i < document.all["dlDept"].length ; i++)
		{
			if(document.all["dlDept"].options[i].text == document.all["dlDept_Text"].value )
			{
				document.all["dlDept"].selectedIndex = i;
				document.all["txDeptNo_h"].value = document.all["dlDept"].options[i].value.split(':')[0];
				bDept = true;
				break;
			}
		}
		
		if (!bDept)
		{
			document.all["dlDept"].selectedIndex = -1;
			document.all["dlDept_Text"].value = "";
			document.all["txDeptNo_h"].value = "";
			alert('您所輸入之承辦單位不存在於系統中。');
		}
		
		if(document.all["dlDept"].selectedIndex != -1)
		{
			strArr1 = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');	
			document.all["txDeptNo_h"].value = strArr1[0];
		}
		else
			bAction = false;


		//取二級單位用
		var param1 = new Array(3);
		param1[0] = false;
		param1[1] = true;
		param1[2] = strArr1[0];
		
		var RtnObjSect;	
		
		if(bAction)
		{	
			RtnObjSect = jf_CallWS("../EALIB/EA_LIB.asmx","GetDepts",false,param1);
			CallWS_ID_SECT = RtnObjSect.id;
			OnWSResult(RtnObjSect);
		}
	}
	else
		ClearDL(document.all["dlSect"]);

}
function SyncSc()
{
	if (document.all["dlDept_Text"].value != "")
	{
		var bDept = false;
		var bSect = false;
		
		for ( var i = 0 ; i < document.all["dlSect"].length ; i++)
		{
			if(document.all["dlSect"].options[i].text == document.all["dlSect_Text"].value )
			{
				document.all["dlSect"].selectedIndex = i;
				document.all["txSectNo_h"].value = document.all["dlSect"].options[i].value.split(':')[2];
				bSect = true;
				break;
			}
		}
		
		if (!bSect)
		{
			document.all["dlSect"].selectedIndex = -1;
			document.all["dlSect_Text"].value = "";
			document.all["txSectNo_h"].value = "";
			alert('您所輸入之承辦科別不存在於該承辦單位下。');
			//1060209	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["dlSect_Text"].focus();
			$('#dlSect_Text').focus();
		}
	}
	else
	{
		document.all["dlSect"].selectedIndex = -1;
		document.all["dlSect_Text"].value = "";
		document.all["txSectNo_h"].value = "";	
		alert('請先選擇承辦單位再選擇承辦科別。');
		//1060209	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["dlDept_Text"].focus();
		$('#dlDept_Text').focus();
	}
}
//將DropDownList裡的item清除
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;
}
function jf_CheckDataExist_Custom(argOrgNo)
{
	var arrValue=new Array(3);
	var arrFieldName=new Array(3);
	

	arrFieldName[0] = "DEPT_NO";
	arrFieldName[1] = "SECT_NO";
	arrFieldName[2] = "SOURCE_ORGNO";
	
	arrValue[0] = document.all["txDeptNo_h"].value;
	arrValue[1] = document.all["txSectNo_h"].value;
	arrValue[2] = argOrgNo;
	
	var arWSParam = new Array(3);
	
	arWSParam[0] = "CLASS_PRIVILEGE";
	arWSParam[1] = arrFieldName;
	arWSParam[2] = arrValue;
				
	callObj = jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, arWSParam);
	
	if(jf_IsWebServiceSuccess(callObj))
	{
		if(callObj.value.RtnBool == true)
			return true;
		
		return false;
	}
	else
		return false;
}