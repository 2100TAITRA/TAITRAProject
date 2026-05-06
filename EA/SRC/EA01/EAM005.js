/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號	概要
 * -------------------------------------------------------------------------------------------------
 * 95.12.14		whay	951265	EAM005儲存分類號前檢核保存年限與基準項目的年限
 * 96.06.07		Cola	001090  於EAM005之上層分類號輸入「01」，ONBLUR之後跳出「無符合條件資料」，但若利用查詢帶出可正常帶出，且代號相同。且版本之啟用日期未帶出。
 * 97.07.31		Cola	0970248	若有勾選此分類號為上層分類號時，則不再檢核保存年限有無輸入值
 * 99.12.13		Howard	0990527	新增二級單位下拉選單
 * 99.12.17		Howard	--		[CDC]配合CDC新增參數EAM005_FLOW_TYPE，來判斷二級單位下拉選單之顯示
 *100.07.28		Jeff	1000571	修正 按下清空按鈕之後 當分類號欄位觸發Onblur事件時會顯示機關代碼不可為空白之錯誤訊息
 * 103.12.29	Gabby	1030958	修改欄位無法儲存空值的問題
 * 106.02.10	Kevin_C	1060057	修正版本代號OnBlur帶出啟用日期錯誤的問題
 * 1060321      Zen     1050087 二代公文修改
 * 1060428      Zen     1050784 使用單位可設定多筆，註解單位設定相關邏輯
 * 1090310		Cloud	1081109	修改分類號ONBLUR取得多個版本時，如使用機關為客委會，直接串入當前分類號開啟EAC005
 * 1101122		Joe		1101248	修正內容描述不可輸入Json格式跳脫字元\
 * 1110103      Zen     1101292 修正多次點擊重複PostBack之問題
 * 1110519      Zen     1110411 修正檢核邏輯為舊分類號版本不可與當前版本相同
 * 1110923      Zen     1111016 修正取得基礎項目名稱錯誤之問題
 * 1130325      Jason   1130092 修改當交通部(MOTC)使用時建立一級單位選單，和儲存時傳入抓取一級單位代碼
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
var checker = "1";//cola因應若於combobox-focus時直接執行save時，會重複執行onblur所設計之判斷

//記錄呼叫者物件名稱
//951263 增加一個ObjLabelName2 紀錄lbKeepYear物件名稱
var ObjTextName = "", ObjTextName2 = "", ObjLabelName = "", CallType = ""; ObjLabelName2 = "";

//指定DataGrid欄位
//var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1060321 Zen 1050087 二代公文修改
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1110923 Zen 1111016 修正取得基礎項目名稱錯誤之問題
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
    //1060321 Zen 1050087 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, null);
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    document.getElementById("ck1").style.display = "none";//隱藏DIV
    document.getElementById("ck2").style.display = "none";//隱藏DIV
    document.getElementById("ck3").style.display = "none";//隱藏DIV
    //1130325      Jason       1130092 修改當交通部(MOTC)使用時建立一級單位選單，和儲存時傳入抓取一級單位代碼
    if (document.all["ISMOTC"].value == "N")
        document.all["UseDept"].className = "hide";

    //1060321 Zen 1050087 二代公文修改
    //1060428 Zen 1050784 使用單位可設定多筆，註解單位設定相關邏輯
    //var dlSect_No = document.all.dlSect_No;
    //if (document.all.H_OD_FLOW_TYPE.value != 'Y' && dlSect_No.style.display == 'none')
    //    document.all.dlSect_No_Container.style.display = 'none';
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060321 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060321 Zen 1050087 二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo1 = xObjectName.substring(8, xObjectName.indexOf("_bthelp1"));
    var pNo2 = xObjectName.substring(8, xObjectName.indexOf("_bthelp2"));

    var btHelp1, CurrTextIdObj1, CurrLbIdObj1;
    var btHelp2, CurrTextIdObj2, CurrLbIdObj2;

    //取得確實按下的是哪個？鍵

    if (document.all["dg1__ctl" + pNo1 + "_bthelp1"] != null)
    {
        btHelp1 = document.all["dg1__ctl" + pNo1 + "_bthelp1"].id;
        CurrTextIdObj1 = document.all["dg1__ctl" + pNo1 + "_txItem_No1"];
        CurrLbIdObj1 = document.all["dg1__ctl" + pNo1 + "_lbItem_Name1"];
        CurrLbIdObj2 = document.all["dg1__ctl" + pNo1 + "_lbKeepYear"];  //951263 紀錄保存年限欄位 whay 0951214
    }

    if (document.all["dg2__ctl" + pNo2 + "_bthelp2"] != null)
    {
        btHelp2 = document.all["dg2__ctl" + pNo2 + "_bthelp2"].id;
        CurrTextIdObj1 = document.all["dg2__ctl" + pNo2 + "_txOldVer_No"];
        CurrTextIdObj2 = document.all["dg2__ctl" + pNo2 + "_txOldCls_No"];
        CurrLbIdObj2 = document.all["dg2__ctl" + pNo2 + "_lbOldCls_Name"];
    }

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    var strUrl;
    switch (xObjectName)
    {
        case btHelp1:

            Page_BlockSubmit = true;
            strUrl = "EAC003.aspx?MODE=1&nFrom=EAM005" + "&Search1=" + CurrTextIdObj1.id + "&Search2=" + CurrLbIdObj1.id;
            //1060321 Zen 1050087 二代公文修改
            //jf_OpenChildWin(strUrl, "EAM005", 700, 500);
            jf_OpenChildWin(strUrl, "EAM005", 800, 600);
            ObjTextName = CurrTextIdObj1.id;
            ObjLabelName = CurrLbIdObj1.id;
            //951263 紀錄保存年限欄位 whay 0951214
            ObjLabelName2 = CurrLbIdObj2.id;
            break;

        case btHelp2:

            Page_BlockSubmit = true;
            //[0970248]Add by Cola 按下查詢開啟之EAC005可點選所有分類號
            strUrl = "EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAM005&MODE=1&SHOWALL=1&VER_NO=" + CurrTextIdObj1.value;
            //1060321 Zen 1050087 二代公文修改
            //jf_OpenChildWin(strUrl, "EAM005", 700, 500);
            jf_OpenChildWin(strUrl, "EAM005", 800, 600);
            ObjTextName = CurrTextIdObj1.id;
            ObjTextName2 = CurrTextIdObj2.id;
            ObjLabelName = CurrLbIdObj2.id;
            CallType = "Type3";
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060321 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060321 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060321 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //[000632]儲存前所有基準項目觸發onblur -- start --
            for (var i = 2; i < document.all["dg1"].rows.length + 1; i++)
            {
                if (document.all["dg1__ctl" + i + "_txItem_No1"].value != "")
                {
                    txItem_No1_Onblur(i.toString());
                }
            }
            //Cola -- end --		
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060321 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060321 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060321 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = false;
            var tempSource_No = document.all["txSource_No"].value;
            //1000728	Jeff	避免清空時一併把機關代碼清掉
            var txOrgNo = document.all["txOrgNo"].value;
            if (jf_ConfirmClean(true))
            {
                CleanForm("dg1", "lbItem_Name1");
                CleanForm("dg2", "lbOldCls_Name");
                CleanForm("dg2", "lbStartDate");
            }
            document.all["txSource_No"].value = tempSource_No;
            //1000728	Jeff	避免清空時一併把機關代碼清掉
            document.all["txOrgNo"].value = txOrgNo;
            //1060321 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
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
            //[0970248]Add by Cola 按下查詢開啟之EAC005可點選所有分類號
            //1060321 Zen 1050087 二代公文修改
            Page_BlockSubmit = true;
            strUrl = "EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAM005&MODE=1&SHOWALL=1";
            jf_OpenChildWin(strUrl, "EAM005", 700, 500);
            ObjTextName = "txVer_No";
            ObjTextName2 = "txCls_No";
            CallType = "Type2";
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060321 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060321 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

    }
}

/********** 以下為按下儲存鍵後相關處理 **********/

function CleanForm(argDg_id, argLb_id)
{

    for (var RowCount = 2 ; RowCount < document.all.dg1.rows.length + 1; RowCount++)
    {
        //1060321 Zen 1050087 二代公文修改
        //document.all[argDg_id + "__ctl" + RowCount + "_" + argLb_id].innerText = "";
        document.all[argDg_id + "__ctl" + RowCount + "_" + argLb_id].textContent = "";
    }
}

//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
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
var bNotCheckVerNo = false;
//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";
    if (document.all["txCls_No"].value == "")
    {
        strErrMsg += "分類號欄位不可空白\n";
        document.all["txCls_No"].focus();
    }

    if (document.all["txVer_No"].value == "")
    {
        strErrMsg += "版本代號欄位不可空白\n";
        document.all["txVer_No"].focus();
    }

    if (document.all["txCls_Name"].value == "")
    {
        strErrMsg += "類目名稱欄位不可空白\n";
        document.all["txCls_Name"].focus();
    }

    //[0970248]Add by Cola 若有勾選才檢核
    if (document.all["cbLOWEST"].checked)
    {
        //[000632]判斷保存年限不可空白

        if (document.all["dlKeep_Year_Text"].value == "")
        {
            strErrMsg += "保存年限欄位不可空白\n";
            document.all["dlKeep_Year_Text"].focus();
        }
        //[000632]cola儲存前檢核
        if (document.all["dlKeep_Year_Text"].value != "")
        {
            var tmpYear = CheckYear();
            if (tmpYear != "")
            {
                document.all["dlKeep_Year_Text"].value = "";
                document.all["dlKeep_Year_Text"].selectedIndex = -1;
                document.all["dlKeep_Year_Text"].focus();
                strErrMsg += tmpYear + "\n";
            }
        }
        if (document.all["dlEc_Keep_Year_Text"].value == "")
        {
            strErrMsg += "電子化保存年限欄位不可空白\n";
            document.all["dlEc_Keep_Year_Text"].focus();
        }
        if (document.all["dlEc_Keep_Year_Text"].value != "")
        {
            var tmpYear = CheckElcYear();
            if (tmpYear != "")
            {
                document.all["dlEc_Keep_Year_Text"].value = "";
                document.all["dlEc_Keep_Year_Text"].selectedIndex = -1;
                document.all["dlEc_Keep_Year_Text"].focus();
                strErrMsg += tmpYear + "\n";
            }
        }
    }
    //Cola -- end --

    var strClsNo = jf_Trim(document.all["txCls_No"].value);
    var strUpperNo = jf_Trim(document.all["txUpper_Cls"].value);
    if (strUpperNo != "" && (strUpperNo == strClsNo))
    {
        strErrMsg += "上層分類號不可與分類號相同\n";
        document.all["txUpper_Cls"].focus();
    }

    var dg2Count = document.all["dg2"].rows.length;
    var bJudgue = true;
    for (var i = 2; i < dg2Count + 1; i++)
    {
        //1060321 Zen 1050087 二代公文修改
        //if (document.all["dg2__ctl" + i + "_txOldCls_No"].innerText == document.all["txCls_No"].value)
        //1110519 Zen 1110411 修正檢核邏輯為舊分類號版本不可與當前版本相同
        //if (document.all["dg2__ctl" + i + "_txOldCls_No"].value == document.all["txCls_No"].value)
        if (document.all["dg2__ctl" + i + "_txOldVer_No"].value == document.all["txVer_No"].value)
        {
            bJudgue = false;
        }
    }
    if (!bJudgue)
        strErrMsg += "舊版分類號版本不可與現行版本相同\n";

	//1101122	Joe		1101248	修正案名不可輸入Json格式跳脫字元--S
	if(document.all["txDesp"].value.indexOf('\\') != -1)
	{
		strErrMsg += '儲存檢核未通過：內容描述含有特殊符號\\\n';
	}
	//1101122	Joe		1101248	修正案名不可輸入Json格式跳脫字元--E

    //951263 儲存前確認保存年限是否符合基準 by whay 0951214
    /*
	var dg1Count = document.all["dg1"].rows.length;
	var bYear = true;	
	var strYear = "0";
	var iKeepYear = document.all["dlKeep_Year"].selectedIndex;
   var comYear = document.all["dlKeep_Year"].options[iKeepYear].value;
   for(var i=2;i<dg1Count+1;i++)
	{		
		if(document.all["dg1__ctl" + i + "_lbKeepYear"].innerText != "")
		{		   
		   if(parseInt(document.all["dg1__ctl" + i + "_lbKeepYear"].innerText) > parseInt(comYear))
		   {
			   if(parseInt(strYear) < parseInt(document.all["dg1__ctl" + i + "_lbKeepYear"].innerText))
			      strYear = document.all["dg1__ctl" + i + "_lbKeepYear"].innerText;
			   bYear = false;			   
		   }
		}
	}
	if(!bYear)
		strErrMsg+="分類號保存年限不符合基準項目，應大於等於"+strYear+"年";*/

    /*
        var oldIdList = document.all.nOldVerNoList.value;
        var szIdArr = oldIdList.split(';');	
        for(var i=0;i<szIdArr.length;i++)
        {
            if(jf_Trim(document.all[szIdArr[i]].value)!="")
            {
                if(jf_Trim(document.all["txVer_No"].value)==jf_Trim(document.all[szIdArr[i]].value))
                {
                    bNotCheckVerNo=true;
                    strErrMsg+="舊版分類號版本不可與現行版本相同";
                    document.all[szIdArr[i]].focus();
                }
            }
        }
    */
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

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
                //1060321 Zen 1050087 二代公文修改
                //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
                document.all[InValidControlName].focus();
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
    if (argResult.id != null)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            //1060428 Zen 1050784 使用單位可設定多筆，註解單位設定相關邏輯
            //if (argResult.id == CallWS_ID_SECT)
            //{
            //    if (jf_IsWebServiceSuccess(argResult))
            //    {
            //        WSResult = argResult.value;

            //        //95.11.27 950489 David
            //        document.all["dlSect_No_Container"].className = "custom-combobox";
            //        document.all["dlSect_No"].className = "";
            //        document.all["dlSect_No_Text"].className = "";

            //        //95.11.27 950489 David
            //        document.all["dlSect_No_Text"].value = "";

            //        while (document.all.dlSect_No.options[0] != null)
            //        {
            //            document.all.dlSect_No.options[0] = null;
            //        }

            //        var DropListChild = document.createElement("OPTION");
            //        DropListChild.text = "";
            //        DropListChild.value = "";
            //        document.all.dlSect_No.options.add(DropListChild);

            //        if (WSResult.SecNo.length != 0)
            //        {

            //            //[001209]Add by Cola -- start --
            //            ClearDL(document.all["dlSect_No"]);

            //            var Blank_Data = document.createElement("OPTION");
            //            Blank_Data.text = "";
            //            Blank_Data.value = ":";
            //            document.all.dlSect_No.options.add(Blank_Data);
            //            //Cola -- end --

            //            for (var i = 0; i < WSResult.SecNo.length; i++)
            //            {
            //                var SectDropListChild = document.createElement("OPTION");
            //                SectDropListChild.text = WSResult.SecName[i];
            //                //0960084 Modify by Cola 為了與EA_LIB.CS中Function組出元素相同，額外新增兩欄位
            //                SectDropListChild.value = WSResult.DeptNo[i] + ":" + WSResult.DeptName[i] + ":" + WSResult.SecNo[i] + ":" + WSResult.SecName[i];
            //                document.all.dlSect_No.options.add(SectDropListChild);
            //            }
            //            if (document.all["dlSect_No"].options.length > 10)
            //            {
            //                document.all["dlSect_No"].size = 10;
            //            }
            //            else
            //                document.all["dlSect_No"].size = document.all["dlSect_No"].options.length;

            //            document.all["dlSect_No_Container"].disabled = false;

            //        }
            //        else
            //        {
            //            while (document.all.dlSect.options[0] != null)
            //            {
            //                document.all.dlSect.options[0] = null;
            //            }
            //            document.all["dlSect_No_Container"].disabled = true;

            //        }
            //    }
            //}
            //else
            {
                //1060321 Zen 1050087 二代公文修改
                //document.all["lbUpperClsName"].innerText = jf_Trim(argResult.value.RtnField0[0]);
                document.all["lbUpperClsName"].textContent = jf_Trim(argResult.value.RtnField0[0]);
            }
        }
    }
}

function OnWSResult2(argResult, argObjNo)
{
    //webserver回傳後動作    
    var txObj_ClsNo, txObj_VerNo, lbObj_ClsName;

    //取得確實按下的是哪個？鍵

    if (document.all["dg2__ctl" + argObjNo + "_txOldCls_No"] != null)
    {
        txObj_ClsNo = document.all["dg2__ctl" + argObjNo + "_txOldCls_No"].id;
        txObj_VerNo = document.all["dg2__ctl" + argObjNo + "_txOldVer_No"].id;
        lbObj_ClsName = document.all["dg2__ctl" + argObjNo + "_lbOldCls_Name"].id;
    }

    if (argResult.id != null)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            document.all[txObj_VerNo].value = jf_Trim(argResult.value.RtnField0[0]);
            //1060321 Zen 1050087 二代公文修改
            //document.all[lbObj_ClsName].innerText = jf_Trim(argResult.value.RtnField1[0]);
            document.all[lbObj_ClsName].textContent = jf_Trim(argResult.value.RtnField1[0]);
        }
        else
        {
            //document.all[txObj_VerNo].value = "";								
            document.all[txObj_ClsNo].value = "";
            //1060321 Zen 1050087 二代公文修改
            //document.all[lbObj_ClsName].innerText = "";
            document.all[lbObj_ClsName].textContent = "";
        }
    }
}

//1110923 Zen 1111016 修正取得基礎項目名稱錯誤之問題
////951263 ONBLUR多回傳保存年限 BY WHAY 0951214
//function OnWSResult3(argResult, argObjNo)
//{
//    //webserver回傳後動作
//    var txObj_ItemNo1, lbObj_lbItemName1;

//    if (document.all["dg1__ctl" + argObjNo + "_txItem_No1"] != null)
//    {
//        txObj_ItemNo1 = document.all["dg1__ctl" + argObjNo + "_txItem_No1"].id;
//        lbObj_lbItemName1 = document.all["dg1__ctl" + argObjNo + "_lbItem_Name1"].id;
//        lbObj_lbKeepYear = document.all["dg1__ctl" + argObjNo + "_lbKeepYear"].id;
//    }

//    if (argResult.id != null)
//    {
//        if (jf_IsWebServiceSuccess(argResult))
//        {
//            //1060321 Zen 1050087 二代公文修改--begin
//            //document.all[lbObj_lbItemName1].innerText = jf_Trim(argResult.value.RtnField0[0]);
//            //document.all[lbObj_lbKeepYear].innerText = jf_Trim(argResult.value.RtnField1[0]);
//            document.all[lbObj_lbItemName1].textContent = jf_Trim(argResult.value.RtnField0[0]);
//            document.all[lbObj_lbKeepYear].textContent = jf_Trim(argResult.value.RtnField1[0]);
//            //1060321 Zen 1050087 二代公文修改--end
//        }
//        else
//        {
//            document.all[txObj_ItemNo1].value = "";
//            //1060321 Zen 1050087 二代公文修改--begin
//            //document.all[lbObj_lbItemName1].innerText = "";
//            //document.all[lbObj_lbKeepYear].innerText = "";
//            document.all[lbObj_lbItemName1].textContent = "";
//            document.all[lbObj_lbKeepYear].textContent = "";
//            //1060321 Zen 1050087 二代公文修改--end
//        }
//    }
//}

//95.09.27 David
function OnWSResult4(argResult)
{
    if (argResult.id == iCallID_CLS)
    {
        //Cola 001090 當無值時, focus 至正確TextBox -- start --
        if (jf_Trim(document.all["txVer_No"].value) == "")
            document.all["txVer_No"].focus();
        if (jf_Trim(document.all["txCls_No"].value) == "")
            document.all["txCls_No"].focus();
    	//Cola -- end --
		//1090310 Cloud 1081109 需做特殊處理，此段改為自行處理
    	//if (IsWebServiceSuccess(argResult))
        if (IsWebServiceSuccess(argResult))
        {
            if (argResult.value.StartDate != "")
            {
                document.all["txStartDate"].value = argResult.value.StartDate;
                document.all["txStartDate"].className = "DisplayOnly";
                document.all["txStartDate"].readOnly = true;
            }
        }
    }
}
//95.09.27 David
function OnWSResult5(argResult, Rows)
{
    if (argResult.id == ws_ClsID_DG2)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            //1060321 Zen 1050087 二代公文修改--begin
            //document.all["dg2__ctl" + Rows + "_lbStartDate"].innerText = argResult.value.StartDate;
            //document.all["dg2__ctl" + Rows + "_lbOldCls_Name"].innerText = argResult.value.ClsName;
            document.all["dg2__ctl" + Rows + "_lbStartDate"].textContent = argResult.value.StartDate;
            document.all["dg2__ctl" + Rows + "_lbOldCls_Name"].textContent = argResult.value.ClsName;
            //1060321 Zen 1050087 二代公文修改--end
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
    //951263 多回傳保存年限 BY WHAY 0951214
    if (argCallerId == "EAC003")
    {
        document.all[ObjTextName].value = jf_Trim(document.all.lbReturnValue.options[3].value);
        document.all[ObjLabelName].innerText = jf_Trim(document.all.lbReturnValue.options[2].value);
        document.all[ObjLabelName2].innerText = jf_Trim(document.all.lbReturnValue.options[4].value);
        document.all[ObjTextName].focus();
    }

    if (argCallerId == "EAC005" && CallType == "Type1")
    {
        if (document.all[ObjTextName] != null)
            document.all[ObjTextName].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        //Cola 新增帶回 板本別 -- start
        if (document.all[ObjTextName2] != null)
            document.all[ObjTextName2].value = jf_Trim(document.all.lbReturnValue.options[5].value);
        //Cola -- end --			
        if (document.all[ObjLabelName] != null)
            document.all[ObjLabelName].innerText = jf_Trim(document.all.lbReturnValue.options[6].value);
        ObjTextName = "";
        ObjLabelName = "";
    }

    if (argCallerId == "EAC005" && CallType == "Type2")
    {
        if (document.all[ObjTextName] != null)
            document.all[ObjTextName].value = jf_Trim(document.all.lbReturnValue.options[5].value);
        if (document.all[ObjTextName2] != null)
            document.all[ObjTextName2].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        ObjTextName = "";
        ObjTextName2 = "";
        //1060321 Zen 1050087 二代公文修改
        //jf_OpenButtonSubmit();
        jf_ToolBarSubmit('btOpen');
    }

    if (argCallerId == "EAC005" && CallType == "Type3")
    {
        if (document.all[ObjTextName] != null)
            document.all[ObjTextName].value = jf_Trim(document.all.lbReturnValue.options[5].value);
        if (document.all[ObjTextName2] != null)
            document.all[ObjTextName2].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        if (document.all[ObjLabelName] != null)
            document.all[ObjLabelName].innerText = jf_Trim(document.all.lbReturnValue.options[6].value);

        ObjTextName = "";
        ObjTextName2 = "";
        ObjLabelName = "";
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
function txUpper_Cls_Onblur()
{
    var strSource = document.all["txSource_No"].value;
    var strUpper_Cls = jf_Trim(document.all["txUpper_Cls"].value);
    var strVerNo = jf_Trim(document.all["txVer_No"].value);

    if (strUpper_Cls != "")
    {
        //Cola 001090 當輸入上層分類號時 未輸入版本別時, 提醒使用者 -- start --
        if (strVerNo == "")
        {
            alert('請輸入版本別');
            document.all["txVer_No"].focus();
            return;
        }
        //Cola -- end ---
        var arKeyName = new Array("SOURCE_ORGNO", "CLS_NO", "VER_NO");
        var arKeyValue = new Array(strSource, strUpper_Cls, strVerNo);
        var arRtnFldName = new Array("CLS_NAME");
        var arOrdFldName = new Array("VER_NO DESC");

        var argWSParam = new Array(5);
        argWSParam[0] = "CLASS_MAIN";
        argWSParam[1] = arKeyName;
        argWSParam[2] = arKeyValue;
        argWSParam[3] = arRtnFldName;
        argWSParam[4] = arOrdFldName;

        var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);

        OnWSResult(callObj);

    }
    else
    {
        //1060321 Zen 1050087 二代公文修改
        //document.all["lbUpperClsName"].innerText = "";
        document.all["lbUpperClsName"].textContent = "";
    }
}

//1060428 Zen 1050784 使用單位可設定多筆，註解單位設定相關邏輯
//function txOldCls_No_Onblur(argObjNo)
//{
//    var txObj_ClsNo, txObj_VerNo, lbObj_ClsName;

//    if (document.all["dg2__ctl" + argObjNo + "_txOldCls_No"] != null)
//    {
//        txObj_ClsNo = document.all["dg2__ctl" + argObjNo + "_txOldCls_No"];
//        txObj_VerNo = document.all["dg2__ctl" + argObjNo + "_txOldVer_No"];
//        lbObj_ClsName = document.all["dg2__ctl" + argObjNo + "_lbOldCls_Name"];
//    }

//    var strSource = jf_Trim(document.all["txSource_No"].value);
//    var strOldCls_No = jf_Trim(txObj_ClsNo.value);
//    var strOldVer_No = jf_Trim(txObj_VerNo.value);

//    if (strOldCls_No != "" && strSource != "" && strOldVer_No != "")
//    {

//        var arKeyName = new Array("SOURCE_ORGNO", "CLS_NO", "VER_NO");
//        var arKeyValue = new Array(strSource, strOldCls_No, strOldVer_No);
//        var arRtnFldName = new Array("VER_NO", "CLS_NAME");
//        var arOrdFldName = new Array("CLS_NO");

//        var argWSParam = new Array(5);
//        argWSParam[0] = "CLASS_MAIN";
//        argWSParam[1] = arKeyName;
//        argWSParam[2] = arKeyValue;
//        argWSParam[3] = arRtnFldName;
//        argWSParam[4] = arOrdFldName;

//        var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
//        OnWSResult2(callObj, argObjNo);

//    }


//}

function txOldVer_No_Onblur(argObjNo)
{
    if (bNotCheckVerNo == true)
    {
        bNotCheckVerNo = false;
        return;
    }
    var txObj_ClsNo, txObj_VerNo, lbObj_ClsName;

    if (document.all["dg2__ctl" + argObjNo + "_txOldCls_No"] != null)
    {
        txObj_ClsNo = document.all["dg2__ctl" + argObjNo + "_txOldCls_No"];
        txObj_VerNo = document.all["dg2__ctl" + argObjNo + "_txOldVer_No"];
        lbObj_ClsName = document.all["dg2__ctl" + argObjNo + "_lbOldCls_Name"];
    }

    if (jf_Trim(txObj_VerNo.value) == jf_Trim(document.all["txVer_No"].value) &&
	jf_Trim(txObj_VerNo.value) != "" &&
	jf_Trim(document.all["txVer_No"].value) != "")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["舊版分類號版本不可與現行版本相同"])), "");
        txObj_VerNo.value = "";
        txObj_VerNo.focus();
    }
}

//951263 多回傳保存年限 by whay 0951214
function txItem_No1_Onblur(argObjNo)
{

    var txObj_ItemNo1, lbObj_lbItemName1;

    if (document.all["dg1__ctl" + argObjNo + "_txItem_No1"] != null)
    {
        txObj_ItemNo1 = document.all["dg1__ctl" + argObjNo + "_txItem_No1"];
        lbObj_lbItemName1 = document.all["dg1__ctl" + argObjNo + "_lbItem_Name1"];
        lbObj_lbKeepYear = document.all["dg1__ctl" + argObjNo + "_lbKeepYear"];
    } else (document.all["dg1__ctl" + argObjNo + "_txItem_No1"] == null)
    {
        //1060321 Zen 1050087 二代公文修改--begin
        //document.all["dg1__ctl" + argObjNo + "_lbItem_Name1"].innerText = "";
        //document.all["dg1__ctl" + argObjNo + "_lbKeepYear"].innerText = "";
        document.all["dg1__ctl" + argObjNo + "_lbItem_Name1"].textContent = "";
        document.all["dg1__ctl" + argObjNo + "_lbKeepYear"].textContent = "";
        //1060321 Zen 1050087 二代公文修改--end
    }

    var strItemNo1 = jf_Trim(txObj_ItemNo1.value);

    if (strItemNo1 != "")
    {
        //1110923 Zen 1111016 修正取得基礎項目名稱錯誤之問題
        //var arKeyName = new Array("ITEM_NO");
        //var arKeyValue = new Array(strItemNo1);
        //var arRtnFldName = new Array("ITEM_NAME", "KEEP_YEAR");
        //var arOrdFldName = new Array("ITEM_NO");

        //var argWSParam = new Array(5);
        //argWSParam[0] = "BASIC_ITEM";
        //argWSParam[1] = arKeyName;
        //argWSParam[2] = arKeyValue;
        //argWSParam[3] = arRtnFldName;
        //argWSParam[4] = arOrdFldName;

        //var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
        //OnWSResult3(callObj, argObjNo);
        var oRtnInfo = EA01.EAM005.GetItemName(strItemNo1);
        SetItemData(oRtnInfo, argObjNo);
    }

}

function btUpper_Cls_Onclick()
{
    var strVerNo = document.all.txVer_No.value;

    Page_BlockSubmit = true;
    //[0970248]Add by Cola 按下查詢開啟之EAC005可點選所有分類號
    strUrl = "EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAM005" + "&VER_NO=" + strVerNo + "&MODE=1&SHOWALL=1";
    jf_OpenChildWin(strUrl, "EAM005", 700, 500);
    ObjTextName = "txUpper_Cls";
    //Cola 001090 新增子視窗多帶回"版本別"之值-- start --
    ObjTextName2 = "txVer_No";
    //Cola -- end -- 
    ObjLabelName = "lbUpperClsName";
    CallType = "Type1";

}

//95.09.27 David
var bIsDoubleMsg = false;
var iCallID_CLS = "";
function TbOnBlur(argTextBox)
{
    var ClsNo = jf_Trim(document.all["txCls_No"].value);
    var VerNo = jf_Trim(document.all["txVer_No"].value);
    //分類號 & 版本別
    //1060210	Kevin_C	1060057	修正版本代號OnBlur帶出啟用日期錯誤，改用AJAX帶出啟用日期
    //if ((argTextBox=="txCls_No" && ClsNo != "") || (argTextBox=="txVer_No" && VerNo != ""))
    if (argTextBox == "txCls_No" && ClsNo != "")
    {
        var param1 = new Array(4);
        param1[0] = document.all["txOrgNo"].value;
        param1[1] = document.all["txVer_No"].value;
        param1[2] = document.all["txCls_No"].value;
        param1[3] = "";
        RtnObj = jf_CallWS("../ealib/ea_LIB.asmx", "ws_GetCls", false, param1);
        iCallID_CLS = RtnObj.id;
        OnWSResult4(RtnObj);
    }
    //1060210	Kevin_C	1060057	修正版本代號OnBlur帶出啟用日期錯誤，改用AJAX帶出啟用日期
    if (argTextBox == "txVer_No" && VerNo != "")
        document.all["txStartDate"].value = EA01.EAM005.GetClassVersionStartDate(document.all["txOrgNo"].value, VerNo).value;


    if (argTextBox == "txStartDate")
    {
        if (jf_Trim(document.all["txStartDate"].value) != "")
        {
            if (!jf_CheckCDATE(document.all["txStartDate"].value))
            {
                alert("啟用日期格式不合法");
                document.all["txStartDate"].focus();
                return;
            }
        }
    }
    //[000632]Add by Cola
    if (argTextBox == "dlKeep_Year_Text")
    {
        var tmpdata = CheckYear();
        if (jf_Trim(tmpdata) != "")
        {
            document.all["dlKeep_Year_Text"].value = "";
            document.all["dlKeep_Year_Text"].selectedIndex = -1;
            checker = "1";
            alert(tmpdata);
            document.all["dlKeep_Year_Text"].focus();
            return;
        }
    }

    if (argTextBox == "dlEc_Keep_Year_Text")
    {
        var tmpdata = CheckElcYear();
        if (jf_Trim(tmpdata) != "")
        {
            document.all["dlEc_Keep_Year_Text"].value = "";
            document.all["dlEc_Keep_Year"].selectedIndex = -1;
            checker = "1";
            alert(tmpdata);
            document.all["dlEc_Keep_Year_Text"].focus();
            return;
        }
    }
}

//95.09.27 David 
var ws_ClsID_DG2 = "";
function CheckDg2Cls(objName, Count)
{
    //分類號 & 版本別	
    var param1 = new Array(4);
    param1[0] = document.all["txOrgNo"].value;
    param1[1] = document.all["dg2__ctl" + Count + "_txOldVer_No"].value;
    param1[2] = document.all["dg2__ctl" + Count + "_txOldCls_No"].value;
    param1[3] = "";
    //95.11.23 955202 David
    if (jf_Trim(param1[1]) != "" && jf_Trim(param1[2]) != "")
    {
        RtnObj = jf_CallWS("../ealib/ea_LIB.asmx", "ws_GetCls", false, param1);
        ws_ClsID_DG2 = RtnObj.id;
        OnWSResult5(RtnObj, Count);
    }
}
//[000623]Add by Cola 檢查保存年限是否存在於下方dropdownlist中
function CheckKeepYearExist(argYear)
{
    if (argYear == "永久")
        argYear = "99";

    var rtnCheck = false;
    for (var i = 0 ; i < document.all["dlKeep_Year"].options.length ; i++)
    {
        if (document.all["dlKeep_Year"].options[i].value == argYear)
        {
            rtnCheck = true;
            break;
        }
    }
    return rtnCheck;

}
function GetMaxKeepYearInDg1()
{
    var dg1Count = document.all["dg1"].rows.length;
    var rtnYear = "";
    var tmp = "";

    for (var i = 2; i < dg1Count + 1; i++)
    {
        //1060321 Zen 1050087 二代公文修改
        //if (document.all["dg1__ctl" + i + "_lbKeepYear"].innerText != "")
        if (document.all["dg1__ctl" + i + "_lbKeepYear"].textContent != "")
        {
            if (tmp != "")
            {
                //1060321 Zen 1050087 二代公文修改--begin
                //if (parseInt(tmp) < parseInt(document.all["dg1__ctl" + i + "_lbKeepYear"].innerText))
                //    tmp = document.all["dg1__ctl" + i + "_lbKeepYear"].innerText;
                if (parseInt(tmp) < parseInt(document.all["dg1__ctl" + i + "_lbKeepYear"].textContent))
                    tmp = document.all["dg1__ctl" + i + "_lbKeepYear"].textContent;
                //1060321 Zen 1050087 二代公文修改--end
            }
            else
                //1060321 Zen 1050087 二代公文修改
                //tmp = document.all["dg1__ctl" + i + "_lbKeepYear"].innerText;
                tmp = document.all["dg1__ctl" + i + "_lbKeepYear"].textContent;
        }
    }
    return tmp;
}
function CheckYear()
{
    var strdata = "";
    if (document.all["dlKeep_Year_Text"].value == "")
    {
        return strdata;
    }

    if (!CheckKeepYearExist(document.all["dlKeep_Year_Text"].value) && document.all["dlKeep_Year_Text"].value != GetMaxKeepYearInDg1())
    {
        //alert("保存年限必須是特定年限或與下方基準項目之保存年限相同，您所輸入之保存年限不符合此規定，請重新輸入。");
        strdata = "保存年限必須是特定年限或與下方基準項目之保存年限相同，您所輸入之保存年限不符合此規定，請重新輸入。";
        //document.all["dlKeep_Year"].selectedIndex = -1;
        //document.all["dlKeep_Year_Text"].value = "";
        //document.all["dlKeep_Year_Text"].focus();
    }
    else if (CheckKeepYearExist(document.all["dlKeep_Year_Text"].value) || document.all["dlKeep_Year_Text"].value != GetMaxKeepYearInDg1())
    {
        if (GetMaxKeepYearInDg1() != "")
        {
            if (parseInt(document.all["dlKeep_Year_Text"].value) < parseInt(GetMaxKeepYearInDg1()) || document.all["dlKeep_Year_Text"].value == "?")
            {
                //alert("所輸入之保存年限必須大於或等於下方基準項目之保存年限("+GetMaxKeepYearInDg1()+"年)，您所輸入之保存年限不符合此規定，請重新輸入。");
                strdata = "所輸入之保存年限必須大於或等於下方基準項目之保存年限(" + GetMaxKeepYearInDg1() + "年)，您所輸入之保存年限不符合此規定，請重新輸入。";
                //document.all["dlKeep_Year"].selectedIndex = -1;
                //document.all["dlKeep_Year_Text"].value = "";
                //document.all["dlKeep_Year_Text"].focus();
            }
        }
    }
    return strdata;
}
function CheckElcYear()
{
    var strdata = "";
    if (document.all["dlEc_Keep_Year_Text"].value == "")
    {
        return strdata;
    }

    if (!CheckKeepYearExist(document.all["dlEc_Keep_Year_Text"].value) && document.all["dlEc_Keep_Year_Text"].value != GetMaxKeepYearInDg1())
    {
        //alert("電子化保存年限必須是特定年限或與下方基準項目之保存年限相同，您所輸入之電子化保存年限不符合此規定，請重新輸入。");
        strdata = "電子化保存年限必須是特定年限或與下方基準項目之保存年限相同，您所輸入之電子化保存年限不符合此規定，請重新輸入。";
        //document.all["dlEc_Keep_Year"].selectedIndex = -1;
        //document.all["dlEc_Keep_Year_Text"].value = "";
        //document.all["dlEc_Keep_Year_Text"].focus();
    }
    else if (CheckKeepYearExist(document.all["dlEc_Keep_Year_Text"].value) || document.all["dlEc_Keep_Year_Text"].value != GetMaxKeepYearInDg1())
    {
        if (GetMaxKeepYearInDg1() != "")
        {
            if (parseInt(document.all["dlEc_Keep_Year_Text"].value) < parseInt(GetMaxKeepYearInDg1()) || document.all["dlEc_Keep_Year_Text"].value == "?")
            {
                //alert("所輸入之電子化保存年限必須大於或等於下方基準項目之保存年限("+GetMaxKeepYearInDg1()+"年)，您所輸入之電子化保存年限不符合此規定，請重新輸入。");
                strdata = "所輸入之電子化保存年限必須大於或等於下方基準項目之保存年限(" + GetMaxKeepYearInDg1() + "年)，您所輸入之電子化保存年限不符合此規定，請重新輸入。";
                //document.all["dlEc_Keep_Year"].selectedIndex = -1;
                //document.all["dlEc_Keep_Year_Text"].value = "";
                //document.all["dlEc_Keep_Year_Text"].focus();
            }
        }
    }
    return strdata;
}

//0991213	Howard	0990527	新增二級單位下拉選單之連動 -S
var CallWS_ID_SECT

//1060428 Zen 1050784 使用單位可設定多筆，註解單位設定相關邏輯
//function SyncDL()
//{
//    //1031229 Gabby[1030958] 修改欄位無法儲存空值的問題
//    //if (document.all["dlDept_No_Text"].value != "")
//    if (document.all["txDept_No"].value != document.all["dlDept_No_Text"].value)
//    {
//        var strArr1 = new Array();
//        var strArr2 = new Array();
//        var bAction = true;
//        var bDept = false;
//        var bSect = false;

//        for (var i = 0 ; i < document.all["dlDept_No"].length ; i++)
//        {
//            if (document.all["dlDept_No"].options[i].text == document.all["dlDept_No_Text"].value)
//            {
//                document.all["dlDept_No"].selectedIndex = i;
//                document.all["txDept_No"].value = document.all["dlDept_No"].options[i].value.split(':')[0];
//                bDept = true;
//                break;
//            }
//        }

//        if (!bDept)
//        {
//            document.all["dlDept_No"].selectedIndex = -1;
//            document.all["dlDept_No_Text"].value = "";
//            document.all["txDept_No"].value = "";
//            alert('您所輸入之承辦單位不存在於系統中。');
//        }

//        if (document.all["dlDept_No"].selectedIndex != -1)
//        {
//            strArr1 = document.all["dlDept_No"].options[document.all["dlDept_No"].selectedIndex].value.split(':');
//            document.all["txDept_No"].value = strArr1[0];
//        }
//        else
//            bAction = false;

//        //依OD_FLOW_TYPE判斷若為二層級登記桌時，才連動二級單位下拉選單
//        //0991217	Howard	--	[CDC]配合CDC新增參數EAM005_FLOW_TYPE，來判斷二級單位下拉選單之顯示
//        //if(document.all["H_OD_FLOW_TYPE"].value =="2")
//        if (document.all["H_OD_FLOW_TYPE"].value == "Y")
//        {
//            //取二級單位用
//            var param1 = new Array(3);
//            param1[0] = false;
//            param1[1] = true;
//            param1[2] = strArr1[0];

//            var RtnObjSect;

//            if (bAction)
//            {
//                document.all["txSect_No"].value = "";
//                RtnObjSect = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDepts", false, param1);
//                CallWS_ID_SECT = RtnObjSect.id;
//                OnWSResult(RtnObjSect);
//            }
//        }
//    }
//    //1031229 Gabby[1030958] 修改欄位無法儲存空值的問題
//    /*else
//	{
//		if(document.all["H_OD_FLOW_TYPE"].value =="2")
//			ClearDL(document.all["dlSect_No"]);
//	}*/
//    if (document.all["dlDept_No_Text"].value == "")
//    {
//        if (document.all["H_OD_FLOW_TYPE"].value == "Y")
//            ClearDL(document.all["dlSect_No"]);
//        document.all["txSect_No"].value = "";
//    }
//    //1031229 Gabby[1030958]--END

//}
//function SyncSc()
//{
//    if (document.all["dlDept_No_Text"].value != "")
//    {
//        var bDept = false;
//        var bSect = false;

//        for (var i = 0 ; i < document.all["dlSect_No"].length ; i++)
//        {
//            if (document.all["dlSect_No"].options[i].text == document.all["dlSect_No_Text"].value)
//            {
//                document.all["dlSect_No"].selectedIndex = i;
//                document.all["txSect_No"].value = document.all["dlSect_No"].options[i].value.split(':')[2];
//                bSect = true;
//                break;
//            }
//        }

//        if (!bSect)
//        {
//            document.all["dlSect_No"].selectedIndex = -1;
//            document.all["dlSect_No_Text"].value = "";
//            document.all["txSect_No"].value = "";
//            alert('您所輸入之承辦科別不存在於該承辦單位下。');
//            document.all["dlSect_No_Text"].focus();
//        }
//    }
//    else
//    {
//        document.all["dlSect_No"].selectedIndex = -1;
//        document.all["dlSect_No_Text"].value = "";
//        document.all["txSect_No"].value = "";
//        alert('請先選擇承辦單位再選擇承辦科別。');
//        document.all["dlDept_No_Text"].focus();
//    }
//}
//將DropDownList裡的item清除
function ClearDL(argObj)
{
    for (var i = 0 ; i < argObj.length; i++)
        argObj.remove(0);

    argObj.length = 0;
    return;
}
//0991213	Howard	新增二級單位下拉選單之連動 -E

//1060428 Zen 1050784 改為client紀錄清理處置value
function dlClearOnblur()
{
    var dlClear = document.all.dlClear;
    document.all.txClear.value = dlClear.options[dlClear.selectedIndex].value;
}
//1090310 Cloud	1081109 分類號onblur需做特殊處理 此段自己做-s
function IsWebServiceSuccess(argResult)
{
	if (argResult.error)
	{
		alert(argResult.errorDetail.string);
		return false;
	}
	else
	{
		var strAttach = "";

		obj = argResult.value;
		if (obj.m_bSuccess == null || obj.m_bSuccess == "undefined")
			return true;

		if (!obj.m_bSuccess)
		{
			if (obj.m_strMsg == "")
			{
				if (obj.m_bRedirect)
				{
					if (window.document.all["txLogFileName"] != null)
						strAttach = window.document.all["txLogFileName"].value;

					var strLogFilePath = obj.m_strErrPageQueryStr + "&argAttach=New_" + strAttach;
					jf_OpenMsgWin(strLogFilePath, "CustomErrPage");
				}
				else
				{
					if (obj.m_strErrMsg != "")
						alert("錯誤來源：" + obj.m_strErrSource + "\n" + "錯誤訊息：" + obj.m_strErrMsg + "\n" + "堆疊追蹤：\n" + obj.m_strErrStack);
				}
			}
			else
			{
				if (argResult.id == iCallID_CLS)
				{
					if (obj.m_strMsg.indexOf("啟用區間為") != -1)
					{
						if (document.all["orgnickname"].value == "HAC")//客委會開啟eac005 直接查詢
						{
							strUrl = "EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAM005&MODE=EAM005SearchCls&FILE_CLS=" + document.all["txCls_No"].value;
							ObjTextName = "txVer_No";
							ObjTextName2 = "txCls_No";
							CallType = "Type2";
							jf_OpenChildWin(strUrl, "EAM005", 800, 600);
						}
						else
							alert(obj.m_strMsg);
					}
					else
						alert(obj.m_strMsg);
				}
				
			}
			return false;
		}
	}
	return true;
}
//1090310 Cloud	1081109 分類號onblur需做特殊處理 此段自己做-e

//1110923 Zen 1111016 修正取得基礎項目名稱錯誤之問題
function SetItemData(argResult, argObjNo)
{
    //webserver回傳後動作
    var txObj_ItemNo1, lbObj_lbItemName1;

    if (document.all["dg1__ctl" + argObjNo + "_txItem_No1"] != null)
    {
        txObj_ItemNo1 = document.all["dg1__ctl" + argObjNo + "_txItem_No1"].id;
        lbObj_lbItemName1 = document.all["dg1__ctl" + argObjNo + "_lbItem_Name1"].id;
        lbObj_lbKeepYear = document.all["dg1__ctl" + argObjNo + "_lbKeepYear"].id;
    }

    if (argResult.value.bError == false)
    {
        document.all[lbObj_lbItemName1].textContent = argResult.value.strItemName;
        document.all[lbObj_lbKeepYear].textContent = argResult.value.strKeepYear;
    }
    else
    {
        document.all[txObj_ItemNo1].value = "";
        document.all[lbObj_lbItemName1].textContent = "";
        document.all[lbObj_lbKeepYear].textContent = "";
    }
}

