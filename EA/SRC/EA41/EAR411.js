/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 105.08.08	Justin	1050700	弱點掃描修正使用Parameter
 * 106.03.29    Zen     1050087 二代公文修改 * 1100204      Zen     1090927 取消使用document.activeElement
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
//var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1060329 Zen 1050087 二代公文修改
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//InitObj();
rbChange();	//[0970649]Modify by Cola 未避免每次postback，排序, 跳頁方式無法keep住，因此僅觸發rbChange
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060329 Zen 1050087 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060329 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060329 Zen 1050087 二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    /*	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
        {
            btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
            CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
        }*/

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btKeyHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
            break;
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060329 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;
    var ErrMsg = "";

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060329 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {

        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060329 Zen 1050087 二代公文修改
            //document.all["txPlanNo"].focus();
            $('#txPlanNo').focus();
            //1060329 Zen 1050087 二代公文修改
            //document.all["dg1"].className = "Hide";
            document.all["dg1"].className = "hide";
            InitObj();
            break;
        case "btSearch":
            if ((jf_Trim(document.all.txPlanNo.value) != "") || (document.all.dlStoreNo.selectedIndex != 0 && document.all.dlStoreNo.selectedIndex != -1) || ((jf_Trim(document.all.txYearS.value) != "") && (jf_Trim(document.all.txClsS.value) != "")) || ((jf_Trim(document.all.txYearE.value) != "") && (jf_Trim(document.all.txClsE.value) != "")))
            {
                Page_BlockSubmit = false;
                //1060329 Zen 1050087 二代公文修改
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
            {
                if ((jf_Trim(document.all.txDateS.value) != "") || (jf_Trim(document.all.txDateE.value) != ""))
                {
                    Page_BlockSubmit = false;
                    //1060329 Zen 1050087 二代公文修改
                    //jf_ToolBarSubmit();
                    jf_ToolBarSubmit(xObjectName);
                }
                else
                {
                    //1060329 Zen 1050087 二代公文修改
                    //document.all.txDateS.focus();
                    $('#txDateS').focus();
                    alert("請輸入註記日期或清理計畫，庫房，檔號其中一項!!")
                    Page_BlockSubmit = true;
                }
            }
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060329 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060329 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
//1060329 Zen 1050087 二代公文修改
//function jf_ConfirmSave()
//{
//    var bRtnbool = false;

//    if (jf_CheckBeforSave())
//    {
//        // 新增模式需檢查鍵值是否已存在
//        if (jf_GetActionMode() == LayoutModeNew)
//        {
//            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
//            {
//                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
//                    bRtnbool = true;
//            }
//            else
//                bRtnbool = true;
//        }
//        else
//            bRtnbool = true;
//    }

//    return bRtnbool;
//}

////儲存前之欄位檢查
//function jf_CheckBeforSave()
//{
//    var bRtnbool = true;
//    var strErrMsg = "";

//    if (document.all["txKeyFld"].value == "")
//    {
//        strErrMsg += "鍵值欄位不可空白\n";
//        document.all["txKeyFld"].focus();
//    }

//    if (document.all["txRequireFld"].value == "")
//    {
//        strErrMsg += "必要欄位不可空白\n";
//        document.all["txRequireFld"].focus();
//    }

//    if (!jf_CheckBlankAndAlert())
//        bRtnbool = false;

//    if (strErrMsg != "")
//    {
//        bRtnbool = false;
//        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
//    }

//    return bRtnbool;
//}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    var InValidName = "";
    var InValidControlName = "";

    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        //txInput1不為空白時
        if (document.all["dg1__ctl" + i + "_txInput1"].value != "")
        {
            //txInput2不可空白
            if (document.all["dg1__ctl" + i + "_txInput2"].value == "")
            {
                InValidName += ",Input2不可空白";
                InValidControlName = "dg1__ctl" + i + "_txInput2";
            }

            if (InValidName != "")
            {
                InValidName = InValidName.substr(1, InValidName.length);
                //1060329 Zen 1050087 二代公文修改--begin
                //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
                //document.all[InValidControlName].focus();
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
                $('#' + InValidControlName).focus();
                //1060329 Zen 1050087 二代公文修改--end
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
        if (jf_IsWebServiceSuccess(argResult))
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
    /*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/

    if (argCallerId == "EAT400C1")
    {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        //1060329 Zen 1050087 二代公文修改
        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//當查詢類別有異動時做以下動作
function rbChange()
{
    var AllCount = 0;//document.all["dlKeepStateGrp_ALL"].length;
    var LenCount = 0;//document.all["dlKeepStateGrp_LEN1"].length;
    document.all["txIsDestroy"].value = "";
    document.all["txKeepNo"].value = "";

    if (document.all["rbNowState"].checked)
    {
        //1060329 Zen 1050087 二代公文修改
        //document.all["MainTable2"].outerHTML = "<TABLE id='MainTable2' style='HEIGHT: 1px' cellSpacing='0' cellPadding='0' width='91%' border='0'><TBODY></TBODY></TABLE>";
        document.all["MainTable2"].innerHTML = "";
        InitKEEP_STATE_LEN1();

        for (i = 0; i < AllCount; i++)
        {
            /*document.all["cbKeepState_ALL_"+i].className = "hide";
			document.all["cbKeepState_ALL_"+i].disabled = true;				
			document.all["cbKeepState_ALL_"+i].checked = false;				*/
        }
        for (i = 0; i < LenCount; i++)
        {
            /*document.all["cbKeepState_LEN_"+i].className = "";			
			document.all["cbKeepState_LEN_"+i].disabled = false;			
			document.all["cbKeepState_LEN_"+i].checked = false;*/
        }
        /*document.all.cblistNow.className = "InputFieldLabel";
		document.all.cblistMark.className = "hide";*/
    }
    else
    {
        //1060329 Zen 1050087 二代公文修改
        //document.all["MainTable1"].outerHTML = "<TABLE id='MainTable1' style='HEIGHT: 1px' cellSpacing='0' cellPadding='0' width='91%' border='0'><TBODY></TBODY></TABLE>";
        document.all["MainTable1"].innerHTML = "";
        InitKEEP_STATE_ALL();

        for (i = 0; i < AllCount; i++)
        {
            /*document.all["cbKeepState_ALL_"+i].className = "";
			document.all["cbKeepState_ALL_"+i].disabled = false;	
			document.all["cbKeepState_ALL_"+i].checked = false;*/
        }
        for (i = 0; i < LenCount; i++)
        {
            /*document.all["cbKeepState_LEN_"+i].className = "hide";			
			document.all["cbKeepState_LEN_"+i].disabled = true;			
			document.all["cbKeepState_LEN_"+i].checked = false;*/
        }
        /*document.all.cblistNow.className = "hide";
		document.all.cblistMark.className = "InputFieldLabel";*/
    }
}

/************************************
*		InitKEEP_STATE_LEN1
*		初始化保存情形checkBox
*		David 95.08.28
*************************************/
var signValue;	//紀錄innertext為'其他'的變數

function InitKEEP_STATE_LEN1()
{
    var nCount = document.all["dlKeepStateGrp_LEN1"].length;
    var DATA = new Array(nCount);
    for (i = 0; i < nCount; i++)
    {
        //DATA[i] = document.all["dlKeepStateGrp"].options[i].value;
        DATA[i] = document.all["dlKeepStateGrp_LEN1"].options[i].innerHTML;
    }
    var InsertContentBegin = "";
    var InsertContentEnd = "";
    var InsertContent = "";
    for (i = 0; i < nCount; i++)
    {
        var j = i;
        //1060329 Zen 1050087 二代公文修改
        //InsertContent += "<TR><TD style='WIDTH: 33px' align='right'></TD>" +
		//					 "<TD style='WIDTH: 200px'>" +
		//						 "<input id='cbKeepState_LEN_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() /><FONT color='darkblue' >" + DATA[i] + "</FONT>" +
        //					 "</TD>";
        InsertContent += "<div class='dTD' style='width: 12.5em'>" +
								 "<input id='cbKeepState_LEN_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() />" + DATA[i] + "</div>";

        i++;
        if (i < nCount)
        {
            //1060329 Zen 1050087 二代公文修改
            //InsertContent += "<TD style='WIDTH: 250px'>" +
			//					 "<input id='cbKeepState_LEN_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() /><FONT color='darkblue' >" + DATA[i] + "</FONT>" +
            //				 "</TD>";
            InsertContent += "<div class='dTD' style='width: 12.5em'>" +
								 "<input id='cbKeepState_LEN_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() />" + DATA[i] + "</div>";
        }
        i++;
        //if (DATA[i]=="其他")
        /*if (i%2 == 0)
		{
			InsertContent += "<TD></TD></TR>"+
						 "<TR><TD style='WIDTH: 157px' align='right'></TD>";
			signValue = i;
		}*/
        if (i < nCount)
        {
            //1060329 Zen 1050087 二代公文修改
            //InsertContent += "<TD>" +
			//			   			 "<input id='cbKeepState_LEN_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() /><FONT color='darkblue' >" + DATA[i] + "</FONT>" +
            //					 "</TD></TR>";
            InsertContent += "<div class='dTD'>" +
						   			 "<input id='cbKeepState_LEN_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() />" + DATA[i] + "</div><br>";
        }
    }

    //1060329 Zen 1050087 二代公文修改--begin
    //var oldHTML = "<TABLE id='MainTable1' style='HEIGHT: 1px' cellSpacing='0' cellPadding='0' width='91%' border='0'><TBODY>";
    //var newHTML = "";

    //newHTML = oldHTML + InsertContent + "</TBODY></TABLE>";

    //document.all["MainTable1"].outerHTML = newHTML;
    document.all["MainTable1"].innerHTML = InsertContent;
    //1060329 Zen 1050087 二代公文修改--end

    var signReasonValue;
    //95.07.03 David
    //var InitReasonArray = new Array(8);
    /*var InitReasonArray = new Array(nCount);
	InitReasonArray = document.all["txReasonNo"].value.split(",");*/

    /*if (document.all.txReasonNo.value != "")
	{
		signReasonValue = document.all.txReasonNo.value;
		document.all["rReason_"+signReasonValue].checked = true;	//判斷初始化應該使哪個radiobutton為checked
	}*/
    /*for(i=0;i<nCount;i++)
	{
		if(InitReasonArray[i] == "1")
		{
			document.all["rReason_"+i].checked = true;
		}
		//95.07.03 David
		if(InitReasonArray[nCount] == "1")
		{
			document.all["cbreason_else"].checked = true;
			document.all.txExReason.readOnly = "";
			document.all.txExReason.className = "InputFieldText";
			document.all.txExReason.style.backgroundColor = "white";
		}
		else
		{
			document.all.txExReason.value = "";
			document.all.txExReason.readOnly = "readonly";
			document.all.txExReason.className = "DisplayOnly";
			document.all.txExReason.style.backgroundColor = "LightGrey";
		}
			
		
	}*/

}

/************************************
*		InitKEEP_STATE_ALL
*		初始化保存情形checkBox
*		David 95.08.28
*************************************/
function InitKEEP_STATE_ALL()
{
    var nCount = document.all["dlKeepStateGrp_ALL"].length;
    var DATA = new Array(nCount);
    for (i = 0; i < nCount; i++)
    {
        //DATA[i] = document.all["dlKeepStateGrp"].options[i].value;
        DATA[i] = document.all["dlKeepStateGrp_ALL"].options[i].innerHTML;
    }
    var InsertContentBegin = "";
    var InsertContentEnd = "";
    var InsertContent = "";
    for (i = 0; i < nCount; i++)
    {
        var j = i;
        //1060329 Zen 1050087 二代公文修改
        //InsertContent += "<TR><TD style='WIDTH: 33px' align='right'></TD>" +
		//					 "<TD style='WIDTH: 200px'>" +
		//						 "<input id='cbKeepState_ALL_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() /><FONT color='darkblue' >" + DATA[i] + "</FONT>" +
        //					 "</TD>";
        InsertContent += "<div class='dTD' style='width: 12.5em'>" +
								 "<input id='cbKeepState_ALL_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() />" + DATA[i] + "</div>";

        i++;
        if (i < nCount)
        {
            //1060329 Zen 1050087 二代公文修改
            //InsertContent += "<TD style='WIDTH: 250px'>" +
			//					 "<input id='cbKeepState_ALL_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() /><FONT color='darkblue' >" + DATA[i] + "</FONT>" +
            //				 "</TD>";
            InsertContent += "<div class='dTD' style='width: 12.5em'>" +
								 "<input id='cbKeepState_ALL_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() />" + DATA[i] + "</div>";
        }
        i++;
        //if (DATA[i]=="其他")
        /*if (i%2 == 0)
		{
			InsertContent += "<TD></TD></TR>"+
						 "<TR><TD style='WIDTH: 157px' align='right'></TD>";
			signValue = i;
		}*/
        if (i < nCount)
        {
            //1060329 Zen 1050087 二代公文修改
            //InsertContent += "<TD>" +
			//			   			 "<input id='cbKeepState_ALL_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() /><FONT color='darkblue' >" + DATA[i] + "</FONT>" +
            //					 "</TD></TR>";
            InsertContent += "<div class='dTD'>" +
						   			 "<input id='cbKeepState_ALL_" + i + "' type='checkbox' name='rReason_" + i + "' GroupName='Reason' onclick=StoreKeepNo() />" + DATA[i] + "</div><br>";
        }
    }

    //1060329 Zen 1050087 二代公文修改--begin
    //var oldHTML = "<TABLE id='MainTable2' style='HEIGHT: 1px' cellSpacing='0' cellPadding='0' width='91%' border='0'><TBODY>";
    //var newHTML = "";

    //newHTML = oldHTML + InsertContent + "</TBODY></TABLE>";

    //document.all["MainTable2"].outerHTML = newHTML;
    document.all["MainTable2"].innerHTML = InsertContent;
    //1060329 Zen 1050087 二代公文修改--end

    var signReasonValue;
    //95.07.03 David
    //var InitReasonArray = new Array(8);
    /*var InitReasonArray = new Array(nCount);
	InitReasonArray = document.all["txReasonNo"].value.split(",");*/

    /*if (document.all.txReasonNo.value != "")
	{
		signReasonValue = document.all.txReasonNo.value;
		document.all["rReason_"+signReasonValue].checked = true;	//判斷初始化應該使哪個radiobutton為checked
	}*/
    /*for(i=0;i<nCount;i++)
	{
		if(InitReasonArray[i] == "1")
		{
			document.all["rReason_"+i].checked = true;
		}
		//95.07.03 David
		if(InitReasonArray[nCount] == "1")
		{
			document.all["cbreason_else"].checked = true;
			document.all.txExReason.readOnly = "";
			document.all.txExReason.className = "InputFieldText";
			document.all.txExReason.style.backgroundColor = "white";
		}
		else
		{
			document.all.txExReason.value = "";
			document.all.txExReason.readOnly = "readonly";
			document.all.txExReason.className = "DisplayOnly";
			document.all.txExReason.style.backgroundColor = "LightGrey";
		}
			
		
	}*/

}

//當cbox被點選時
//將對應於DropDownList中的Value值
//設定至隱藏欄位txKeepNo中
//以便下SQL指令使用
function StoreKeepNo()
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;		//作用的物件名稱
    var xObjectName = event.target.id;
    var SelectNo = xObjectName.substring(16);
    var KeepNoArr;
    var nCount1 = document.all["dlKeepStateGrp_ALL"].length;
    var nCount2 = document.all["dlKeepStateGrp_LEN1"].length;
    var strKeepCombine = "";
    document.all["txIsDestroy"].value = "";

    if (xObjectName.substring(16, 0) == "cbKeepState_ALL_")
    {
        document.all["txKeepNo"].value = "";
        for (i = 0; i < nCount1; i++)
        {
            if (document.all["cbKeepState_ALL_" + i].checked)
            {
                if (strKeepCombine != "")
                    strKeepCombine += ",";
                //1050808 Justin 1050700 弱點掃描修正使用Parameter
                //strKeepCombine +="'"+document.all["dlKeepStateGrp_ALL"].options[i].value+"'";	
                strKeepCombine += document.all["dlKeepStateGrp_ALL"].options[i].value;
                if (document.all["dlKeepStateGrp_ALL"].options[i].value == "H")
                    document.all["txIsDestroy"].value = "Y";
            }
        }
    }
    if (xObjectName.substring(16, 0) == "cbKeepState_LEN_")
    {
        document.all["txKeepNo"].value = "";
        for (i = 0; i < nCount2; i++)
        {
            if (document.all["cbKeepState_LEN_" + i].checked)
            {
                if (strKeepCombine != "")
                    strKeepCombine += ",";
                //1050808 Justin 1050700 弱點掃描修正使用Parameter
                //strKeepCombine += "'" + document.all["dlKeepStateGrp_LEN1"].options[i].value + "'";
                strKeepCombine += document.all["dlKeepStateGrp_LEN1"].options[i].value;
                if (document.all["dlKeepStateGrp_LEN1"].options[i].value == "H")
                    document.all["txIsDestroy"].value = "Y";
            }
        }
    }
    if (strKeepCombine != "")
        document.all["txKeepNo"].value = strKeepCombine;

}

//初始化畫面物件
function InitObj()
{
    document.all["rbNowState"].checked = true;
    document.all["rbByFileNo"].checked = true;
    document.all["rb31"].checked = true;
    rbChange();
}

//補0
function CallPadFunc(strObjName)
{
    switch (strObjName)
    {
        case "txYearS":
        case "txYearE":
            if (document.all[strObjName].value != "")
                document.all[strObjName].value = jf_PADL(document.all[strObjName].value, 3, "0");
            break;
    }
}
