/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號		概要
 * -------------------------------------------------------------------------------------------------
 * 0951215		whay	951282		計劃別選到[本機關]機關欄位自動帶出目前機關名稱
 * 0960307		David	951286		
 * 0960724		Leo		960115		銷毀時間可輸入中文，檔案年度提供迄輸入，檔案數量由程式帶出
 * 0961017		Cola	000959		支援計劃批號批次帶回功能
 * 99.11.18     Davis   990546      增加儲存時檔號檢核邏輯，修正dg欄位檔案數量之顯示方式改為幾案幾卷
 * 99.12.30     Davis   0991034     修正鍵入批號，不會帶出史政機關資料問題
 * 1060322      Justin  1050087     二代公文修改
 * 110.08.23	Cloud	1101057		修正計畫編號下批號過多開啟後程式會當住問題
 * 1110103		Zen     1101292     修正多次點擊重複PostBack之問題
 * 1120614		Zen		1101479		檔案數量支援顯示至件數
 * 1120904		Joe		1120709		弱掃修正XSS
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
var iCallID_txPlanNo;
var iCallID_PlanMain;
var iCallID_PlanDetail;

//指定DataGrid欄位
var strTableFields = new Array("_txPlanNum", "_lbDate", "_lbDesc");
//1060322  Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

//951282 計劃別選到[本機關]機關欄位自動帶出目前機關名稱 by whay 0951215
document.all.dlPlanType.onchange = jf_ChangePlanType;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1060322  Justin [1050087] 二代公文修改 移除無用jf_CallWS
    jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, null); //使用WebService前必須先呼叫一次
    jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, null); //使用WebService前必須先呼叫一次*/

    //根據txDeleteDg2來決定是否刪除Dg2的列
    if (document.all.txDeleteDg2.value == "Y")
    {
        for (var j = 0; j < document.all.dg2.rows.length - 1; j++)
        {
            //1060322  Justin [1050087] 二代公文修改
            //document.all.dg2.deleteRow();
            document.getElementById("dg2").deleteRow(1);
        }
        document.all.dg2.className = "hidden";
    }
    //96.03.09 951286 David 每0.3秒即呼叫一次會造成Client端有延遲現象，改成每3秒呼叫一次即可
    //* 110.08.23	Cloud	1101057		修正計畫編號下批號過多開啟後程式會當住問題-改從server計算
    //window.setInterval("fnInitInfo()", 3000);

    //96.03.09 951286 David
    fn_SetDg1Star();

    var tmpdata = document.all["txOrg"].value; //Add by Cola  eajf_Clean前先把值存起來
    if (document.all.InitLoadClearDg2 && document.all.InitLoadClearDg2.value == 'true')  //0960803 Leo 解決init時無法加入清理計畫問題
        eajf_Clean();
    document.all["txOrg"].value = tmpdata;

}

function fnInitInfo()
{
    /*1060322  Justin [1050087] 二代公文修改
    document.all.tc.innerText = "0";
    document.all.tv.innerText = "0";
    document.all.ts.innerText = "0";*/
    document.all.tc.textContent = "0";
    document.all.tv.textContent = "0";
    document.all.ts.textContent = "0";
    //95.10.11 David
    //for (var k=2;k<document.all.dg2.rows.length+1;k++)
    for (var k = 2; k < document.all.dg2.rows.length + 1; k++)
    {
        var argWSParam = new Array(6);
        argWSParam[0] = "add";
        argWSParam[1] = document.all.H_OrgNo.value;
        argWSParam[2] = document.all["dg2__ctl" + k + "_txPlanNum"].value;
        /*1060322  Justin [1050087] 二代公文修改
        argWSParam[3] = document.all.tc.innerText;
        argWSParam[4] = document.all.tv.innerText;
        argWSParam[5] = document.all.ts.innerText;*/
        argWSParam[3] = document.all.tc.textContent;
        argWSParam[4] = document.all.tv.textContent;
        argWSParam[5] = document.all.ts.textContent;
        var callObj2 = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CaculatePlanDetail", false, argWSParam);
        if (jf_IsWebServiceSuccess(callObj2))
        {
            /*1060322  Justin [1050087] 二代公文修改
            document.all.tc.innerText = callObj2.value.RtnField0[0];
            document.all.tv.innerText = callObj2.value.RtnField1[0];
            document.all.ts.innerText = callObj2.value.RtnField2[0];*/
            document.all.tc.textContent = callObj2.value.RtnField0[0];
            document.all.tv.textContent = callObj2.value.RtnField1[0];
            document.all.ts.textContent = callObj2.value.RtnField2[0];
        }
    }
}
/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060322  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

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

    switch (xObjectName)
    {
        case "btKeyHelp":
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            //1060322  Justin [1050087] 二代公文修改
            //jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
            break;
        case "btAdd1":
            Page_BlockSubmit = true;
            //取得目前dg1列數
            var CurrCount = document.all.dg1.rows.length;

            for (i = 0; i < 5; i++)
            {
                var oRow = document.getElementById("dg1").insertRow();                                             //dg1__ctl"+(dg1_idx+2)+"_txInput1
                oCell = oRow.insertCell();
                //1060322 Justin [1050087] 二代公文修改
                //oCell.innerHTML = "<input name=\"dg1:_ctl" + (CurrCount + i + 1) + ":txInput1\" type=\"text\" maxlength=\"10\" id=\"dg1__ctl" + (CurrCount + i + 1) + "_txInput1\" onblur=CheckOrgNo(\"dg1__ctl" + (CurrCount + i + 1) + "_txInput1\",\"" + (CurrCount + i + 1) + "\"); class=\"InputFieldText\" style=\"font-family:細明體;font-size:Small;height:25px;width:150px;\" /><input name=\"dg1:_ctl" + (CurrCount + i + 1) + ":tx_OrgNo_H\" type=\"text\" maxlength=\"10\" id=\"dg1__ctl" + (CurrCount + i + 1) + "_tx_OrgNo_H\" class=\"Hide\" />";
                oCell.innerHTML = "<input name=\"dg1:_ctl" + (CurrCount + i + 1) + ":txInput1\" type=\"text\" maxlength=\"10\" id=\"dg1__ctl" + (CurrCount + i + 1) + "_txInput1\" onblur=CheckOrgNo(\"dg1__ctl" + (CurrCount + i + 1) + "_txInput1\",\"" + (CurrCount + i + 1) + "\"); style=\"width: 9.5em;\" /><input name=\"dg1:_ctl" + (CurrCount + i + 1) + ":tx_OrgNo_H\" type=\"text\" maxlength=\"10\" id=\"dg1__ctl" + (CurrCount + i + 1) + "_tx_OrgNo_H\" class=\"hide\" />";
                oCell = oRow.insertCell();
                //[0990546]davis 修改讓增加空白時候多增加兩個label和一個textbox
                //oCell.innerHTML = "<input name=\"dg1:_ctl"+ (CurrCount+i+1) +":txInput2\" type=\"text\"  maxlength=\"3\"  id=\"dg1__ctl"+ (CurrCount+i+1) +"_txInput2\" class=\"InputFieldText\" style=\"font-family:細明體;font-size:Small;height:25px;width:30px;\" />"
                /*1060322 Justin [1050087] 二代公文修改
                oCell.innerHTML = "<input name=\"dg1:_ctl" + (CurrCount + i + 1) + ":txCaseCnt\" type=\"text\"  maxlength=\"3\"  id=\"dg1__ctl" + (CurrCount + i + 1) + "_txCaseCnt\" class=\"InputFieldText\" style=\"font-family:細明體;font-size:Small;height:25px;width:30px;\" />"
                                + "<span    id=\"dg1:_ctl"+ (CurrCount+i+1) +":Label25\" class=\"InputFieldLabel\" style=\"Z-INDEX: 0\">"+"案"+"</span>" 
                                + "<input name=\"dg1:_ctl"+ (CurrCount+i+1) +":txVolCnt\"  type=\"text\"  maxlength=\"3\"  id=\"dg1__ctl"+ (CurrCount+i+1) +"_txVolCnt\" class=\"InputFieldText\"  style=\"font-family:細明體;font-size:Small;height:25px;width:30px;\" />"
                                + "<span    id=\"dg1:_ctl"+ (CurrCount+i+1) +":Label23\" class=\"InputFieldLabel\" style=\"Z-INDEX: 0\">"+"卷"+"</span>" ;*/
                oCell.innerHTML = "<input name=\"dg1:_ctl" + (CurrCount + i + 1) + ":txCaseCnt\" type=\"text\" maxlength=\"3\" id=\"dg1__ctl" + (CurrCount + i + 1) + "_txCaseCnt\" class=\"InputFieldNumeric\" style=\"width: 2em;\" />"
                    + "<span    id=\"dg1:_ctl" + (CurrCount + i + 1) + ":Label25\" style=\"Z-INDEX: 0\">" + " 案 " + "</span>"
                    + "<input name=\"dg1:_ctl" + (CurrCount + i + 1) + ":txVolCnt\" type=\"text\" maxlength=\"3\" id=\"dg1__ctl" + (CurrCount + i + 1) + "_txVolCnt\" class=\"InputFieldNumeric\" style=\"width: 2em;\" />"
                    + "<span    id=\"dg1:_ctl" + (CurrCount + i + 1) + ":Label23\" style=\"Z-INDEX: 0\">" + " 卷 " + "</span>";
                oCell.align = "center";

            }
            break;
        case "btAdd2":
            Page_BlockSubmit = true;
            //checkPlanNoDuplicate(document.all.txPlanNo.value);
            if (checkPlanNoDuplicate())
            {
                alert("有重複批號，請重新輸入");
            }
            else
            {
                document.all.dg2.className = "";
                var arKeyName = new Array(2);
                arKeyName[0] = "SOURCE_ORGNO";
                arKeyName[1] = "PLAN_NO";
                var arKeyValue = new Array(2);
                arKeyValue[0] = document.all.H_OrgNo.value;
                arKeyValue[1] = document.all.txPlanNo.value;
                var arRtnFldName = new Array(3);
                arRtnFldName[0] = "PLAN_NO";
                arRtnFldName[1] = "PLAN_DATE";
                arRtnFldName[2] = "PLAN_DESC";
                //1060322  Justin [1050087] 二代公文修改
                var arOrdFldName = new Array(1);
                var argWSParam = new Array(5);
                argWSParam[0] = "PLAN_MAIN";
                argWSParam[1] = arKeyName;
                argWSParam[2] = arKeyValue;
                argWSParam[3] = arRtnFldName;
                //1060322  Justin [1050087] 二代公文修改
                //argWSParam[4] = "";
                argWSParam[4] = arOrdFldName;
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
                iCallID_PlanMain = callObj.id;
                OnWSResult(callObj);

                var argWSParam2 = new Array(6);
                argWSParam2[0] = "add";
                argWSParam2[1] = document.all.H_OrgNo.value;
                argWSParam2[2] = document.all.txPlanNo.value;
                /*1060322  Justin [1050087] 二代公文修改
                argWSParam2[3] = document.all.tc.innerText;
                argWSParam2[4] = document.all.tv.innerText;
                argWSParam2[5] = document.all.ts.innerText;*/
                argWSParam2[3] = document.all.tc.textContent;
                argWSParam2[4] = document.all.tv.textContent;
                argWSParam2[5] = document.all.ts.textContent;
                var callObj2 = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CaculatePlanDetail", false, argWSParam2);
                iCallID_PlanDetail = callObj2.id;
                OnWSResult(callObj2);

                //96.03.08 951286 David
                fn_CountHistoryOfPlanNo();
                document.all["txPlanNo"].value = "";
                //1060322  Justin [1050087] 二代公文修改
                //document.all["txPlanNo"].focus();
                $('#txPlanNo').focus();
            }
            break;

    }
}

//951282 計劃別選到[本機關]機關欄位自動帶出目前機關名稱 by whay 0951215
function jf_ChangePlanType()
{
    if (document.all["dlPlanType"].selectedIndex == 0)
    {
        document.all["txOrg"].value = document.all["nOrgName"].value;
    }
    else
    {
        document.all["txOrg"].value = "";
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060322  Justin [1050087] 二代公文修改 
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

    //1060322  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            fnBeforePostBack();
            if (checkHistoryNoDuplicate())
            {
                alert("史政機關名稱有重複值");
                Page_BlockSubmit = true;
            }
            else
                //1060322  Justin [1050087] 二代公文修改 
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            fnBeforePostBack();
            if (checkHistoryNoDuplicate())
            {
                alert("史政機關名稱有重複值");
                Page_BlockSubmit = true;
                return;
            }
            else
            {
                //1060322  Justin [1050087] 二代公文修改 
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            fnBeforePostBack();
            if (checkHistoryNoDuplicate())
            {
                alert("史政機關名稱有重複值");
                Page_BlockSubmit = true;
            }
            else
                //1060322  Justin [1050087] 二代公文修改 
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            fnBeforePostBack();
            eajf_Clean(true);
            //1060322  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            eajf_ConfirmClean(true);
            //1060322  Justin [1050087] 二代公文修改
            //document.all["txDPlan"].focus();
            $('#txDPlan').focus();
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = "EAT501C1.aspx";
            //1060322  Justin [1050087] 二代公文修改
            //jf_OpenChildWin(strUrl, "EAT501C1", 700, 500 );
            jf_OpenChildWin(strUrl, "EAT501C1", 800, 600);
            break;
        case "btPrint":
            fnBeforePostBack();
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060322  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            fnBeforePostBack();
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060322  Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        //以下屬於DataGrid ToolBar
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dg2", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg2", "_cbSelect");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dg2", "_cbSelect");
            break;
        case "btDeleteSelected":
            //Page_BlockSubmit = !			
            for (var k = 2; k < document.all.dg2.rows.length + 1; k++)
            {
                if (document.all["dg2__ctl" + k + "_cbSelect"].checked)
                {
                    var argWSParam = new Array(6);
                    argWSParam[0] = "minus";
                    argWSParam[1] = document.all.H_OrgNo.value;
                    argWSParam[2] = document.all["dg2__ctl" + k + "_txPlanNum"].value;
                    /*1060322  Justin [1050087] 二代公文修改
                    argWSParam[3] = document.all.tc.innerText;
                    argWSParam[4] = document.all.tv.innerText;
                    argWSParam[5] = document.all.ts.innerText;*/
                    argWSParam[3] = document.all.tc.textContent;
                    argWSParam[4] = document.all.tv.textContent;
                    argWSParam[5] = document.all.ts.textContent;
                    var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CaculatePlanDetail", false, argWSParam);
                    if (jf_IsWebServiceSuccess(callObj))
                    {
                        /*1060322  Justin [1050087] 二代公文修改
                        document.all.tc.innerText = callObj.value.RtnField0[0];
                        document.all.tv.innerText = callObj.value.RtnField1[0];
                        document.all.ts.innerText = callObj.value.RtnField2[0];*/
                        document.all.tc.textContent = callObj.value.RtnField0[0];
                        document.all.tv.textContent = callObj.value.RtnField1[0];
                        document.all.ts.textContent = callObj.value.RtnField2[0];
                    }
                }
            }
            eajf_DeleteSelected("dg2", "_cbSelect", strTableFields);
            fn_CountHistoryOfPlanNo();
            jf_CalcVolNum();
            //jf_SelectBarSubmit();
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
        if (jf_GetActionMode() == LayoutModeNew)
        {
            /*if(jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else*/
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
    var strErrMsg = "";
    /*
    if (document.all["txDPlan"].value == "")
    {
        strErrMsg += "銷毀計畫不可空白\n";
        document.all["txDPlan"].focus();
    }
    */

    if (document.all["txOrg"].value == "")
    {
        strErrMsg += "機關不可空白\n";
        //1060322  Justin [1050087] 二代公文修改
        //document.all["txOrg"].focus();
        $('#txOrg').focus();
    }

    /*if(!jf_CheckBlankAndAlert())
        bRtnbool = false;*/

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
                //1060322  Justin [1050087] 二代公文修改
                //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
                //1060322  Justin [1050087] 二代公文修改
                //document.all[InValidControlName].focus();
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
    //96.03.06 951286 David
    //Ws處理部份-史政機關名稱
    if (argResult.id == ws_OrgCntId)
    {
        if (argResult.value.m_bSuccess)
        {
            //AccessHistoryOrg(argResult.value.RtnField0,argResult.value.RtnField1);
            AccessHistoryOrg(argResult.value.RtnField0, argResult.value.RtnField1, argResult.value.RtnField2);	//[0990546]davis 修改多取得案、卷數	
        }
    }

    if (argResult.id == ws_OrgID)
    {
        if (argResult.value.m_bSuccess)
        {
            //document.all["txSourceOrgName"].value = argResult.value.RtnField0;
            var Index = document.all["txOrgIndex"].value;
            //96.03.09 951286 David 檢核史政機關是&重複
            if (fn_CheckHisOrgDunplicate(argResult.value.RtnField0[0], Index))
            {
                document.all["dg1__ctl" + Index + "_txInput1"].value = argResult.value.RtnField0[0];
            }
        }
        else
        {
            //document.all["txSourceOrgName"].value = argResult.value.RtnField0;
            alert("所輸入的機關代碼不合法，請確認");
        }
    }

    //webserver回傳後動作
    if (argResult.id == iCallID_txPlanNo)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.RtnStr == "nodata")
            {
                alert("無此清理批號，請重新輸入");
                //1060322  Justin [1050087] 二代公文修改
                //document.all.txPlanNo.focus();
                $('#txPlanNo').focus();
            }
            else if (argResult.value.RtnStr == "fail")
            {
                alert("呼叫WebService CheckPlanMainByKey失敗");
                //1060322  Justin [1050087] 二代公文修改
                //document.all.txPlanNo.focus();
                $('#txPlanNo').focus();
            }
        }
        else
        {
            //document.all["txReadOnly"].value = "";
        }
    }
    //95.10.11 David 修正DG當Insert時，多出空白列問題
    else if (argResult.id == iCallID_PlanMain)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (jf_Trim(document.all["dg2__ctl2_txPlanNum"].value) != "")
            {

                //[000959]Add by Cola 當計劃批號已在下方dg中，則不insert -- start --
                for (var i = 2; i < document.all.dg2.rows.length + 1; i++)
                {
                    if (document.all["dg2__ctl" + i + "_txPlanNum"].value == jf_Trim(argResult.value.RtnField0[0]))
                        return;
                }
                //Cola -- end --

                var CurrCount = document.all.dg2.rows.length;

                var oRow = document.all.dg2.insertRow();
                if (((CurrCount + 1) % 2) == 0)
                {
                    oRow.className = "tr02";
                }
                else
                {
                    oRow.className = "tr01";
                }
                oCell = oRow.insertCell();
                oCell.innerHTML = "<span id=\"dg2__ctl" + (CurrCount + 1) + "_lbSEQ_NO\" style=\"font-family:細明體;font-size:Small;\">" + CurrCount + "</span>";
                oCell.align = "Center";
                oCell = oRow.insertCell();
                oCell.innerHTML = "<input id=\"dg2__ctl" + (CurrCount + 1) + "_cbSelect\" type=\"checkbox\" name=\"dg2:_ctl" + (CurrCount + 1) + ":cbSelect\" />";
                oCell.align = "center";
                oCell = oRow.insertCell();
				//1120904	Joe		1120709		弱掃修正XSS
                // oCell.innerHTML = "<input name=\"dg2:_ctl" + (CurrCount + 1) + ":txPlanNum\" type=\"text\" value=\"" + jf_Trim(argResult.value.RtnField0[0]) + "\" id=\"dg2__ctl" + (CurrCount + 1) + "_txPlanNum\" class=\"TextLabel\" style=\"width:80px;\" />";
                oCell.innerHTML = "<input name=\"dg2:_ctl" + (CurrCount + 1) + ":txPlanNum\" type=\"text\" value=\"" + Htmlencode(jf_Trim(argResult.value.RtnField0[0])) + "\" id=\"dg2__ctl" + (CurrCount + 1) + "_txPlanNum\" class=\"TextLabel\" style=\"width:80px;\" />";
                oCell = oRow.insertCell();
				//1120904	Joe		1120709		弱掃修正XSS
                // oCell.innerHTML = "<span id=\"dg2__ctl" + (CurrCount + 1) + "_lbDate\">" + jf_Trim(argResult.value.RtnField1[0]) + "</span>";
                oCell.innerHTML = "<span id=\"dg2__ctl" + (CurrCount + 1) + "_lbDate\">" + Htmlencode(jf_Trim(argResult.value.RtnField1[0])) + "</span>";
                oCell.align = "center";
                oCell = oRow.insertCell();
				//1120904	Joe		1120709		弱掃修正XSS
                // oCell.innerHTML = "<span id=\"dg2__ctl" + (CurrCount + 1) + "_lbDesc\">" + jf_Trim(argResult.value.RtnField2[0]) + "</span>";
                oCell.innerHTML = "<span id=\"dg2__ctl" + (CurrCount + 1) + "_lbDesc\">" + Htmlencode(jf_Trim(argResult.value.RtnField2[0])) + "</span>";
                oCell.align = "Left";
            }
            else
            {
                document.all["dg2__ctl2_lbSEQ_NO"].value = CurrCount;
                document.all["dg2__ctl2_txPlanNum"].value = jf_Trim(argResult.value.RtnField0[0]);
                /*1060322  Justin [1050087] 二代公文修改
                document.all["dg2__ctl2_lbDate"].innerText = jf_Trim(argResult.value.RtnField1[0]);
                document.all["dg2__ctl2_lbDesc"].innerText = jf_Trim(argResult.value.RtnField2[0]);*/
                document.all["dg2__ctl2_lbDate"].textContent = jf_Trim(argResult.value.RtnField1[0]);
                document.all["dg2__ctl2_lbDesc"].textContent = jf_Trim(argResult.value.RtnField2[0]);
            }
        }
        else
        {
            document.all["txPlanNo"].select();
        }
    }
    else if (argResult.id == iCallID_PlanDetail)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            /*1060322  Justin [1050087] 二代公文修改
            document.all.tc.innerText = argResult.value.RtnField0[0];
            document.all.tv.innerText = argResult.value.RtnField1[0];
            document.all.ts.innerText = argResult.value.RtnField2[0];*/
            document.all.tc.textContent = argResult.value.RtnField0[0];
            document.all.tv.textContent = argResult.value.RtnField1[0];
            document.all.ts.textContent = argResult.value.RtnField2[0];
            //1120614 Zen 1101479 檔案數量支援顯示至件數
            //document.all.txNum.value = argResult.value.RtnField0[0] + "案(" + argResult.value.RtnField1[0] + "卷)";
            document.all.txNum.value = argResult.value.RtnField0[0] + "案(" + argResult.value.RtnField1[0] + "卷" + argResult.value.RtnField2[0] + "件)";
        }
        else
        {
            document.all["txPlanNo"].select();
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
        //[000959]Modify by Cola支援計劃批號批次帶回功能 -- start --
        var data = "";
        var tmp = "";
        for (i = 0; i < document.all["lbReturnValue"].length; i++)
        {
            data += tmp + document.all["lbReturnValue"].options[i].value;
            tmp = ",";
        }
        document.all["txPlanNo"].value = data;

        for (i = 0; i < document.all.txPlanNo.value.split(",").length; i++)
        {
            var eachPlanNo = document.all.txPlanNo.value.split(",");

            document.all.dg2.className = "";
            var arKeyName = new Array(2);
            arKeyName[0] = "SOURCE_ORGNO";
            arKeyName[1] = "PLAN_NO";
            var arKeyValue = new Array(2);
            arKeyValue[0] = document.all.H_OrgNo.value;
            arKeyValue[1] = eachPlanNo[i];
            var arRtnFldName = new Array(3);
            arRtnFldName[0] = "PLAN_NO";
            arRtnFldName[1] = "PLAN_DATE";
            arRtnFldName[2] = "PLAN_DESC";
            //1060322  Justin [1050087] 二代公文修改
            var arOrdFldName = new Array(1);
            var argWSParam = new Array(5);
            argWSParam[0] = "PLAN_MAIN";
            argWSParam[1] = arKeyName;
            argWSParam[2] = arKeyValue;
            argWSParam[3] = arRtnFldName;
            //1060322  Justin [1050087] 二代公文修改
            //argWSParam[4] = "";
            argWSParam[4] = arOrdFldName;
            var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
            iCallID_PlanMain = callObj.id;
            OnWSResult(callObj);

        }
        /*1060322  Justin [1050087] 二代公文修改
        document.all.tc.innerText = "0";
        document.all.tv.innerText = "0";
        document.all.ts.innerText = "0";*/
        document.all.tc.textContent = "0";
        document.all.tv.textContent = "0";
        document.all.ts.textContent = "0";

        //計算案卷數
        for (var k = 2; k < document.all.dg2.rows.length + 1; k++)
        {
            var argWSParam = new Array(6);
            argWSParam[0] = "add";
            argWSParam[1] = document.all.H_OrgNo.value;
            argWSParam[2] = document.all["dg2__ctl" + k + "_txPlanNum"].value;
            /*1060322  Justin [1050087] 二代公文修改
            argWSParam[3] = document.all.tc.innerText;
            argWSParam[4] = document.all.tv.innerText;
            argWSParam[5] = document.all.ts.innerText;*/
            argWSParam[3] = document.all.tc.textContent;
            argWSParam[4] = document.all.tv.textContent;
            argWSParam[5] = document.all.ts.textContent;
            var callObj2 = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CaculatePlanDetail", false, argWSParam);
            if (jf_IsWebServiceSuccess(callObj2))
            {
                /*1060322  Justin [1050087] 二代公文修改
                document.all.tc.innerText = callObj2.value.RtnField0[0];
                document.all.tv.innerText = callObj2.value.RtnField1[0];
                document.all.ts.innerText = callObj2.value.RtnField2[0];*/
                document.all.tc.textContent = callObj2.value.RtnField0[0];
                document.all.tv.textContent = callObj2.value.RtnField1[0];
                document.all.ts.textContent = callObj2.value.RtnField2[0];
                //1120614 Zen 1101479 檔案數量支援顯示至件數
                //document.all.txNum.value = callObj2.value.RtnField0[0] + "案(" + callObj2.value.RtnField1[0] + "卷)";
                document.all.txNum.value = callObj2.value.RtnField0[0] + "案(" + callObj2.value.RtnField1[0] + "卷" + callObj2.value.RtnField2[0] + "件)";
            }
        }

        //96.03.08 951286 David
        fn_CountHistoryOfPlanNo();
        document.all["txPlanNo"].value = "";
        //1060322  Justin [1050087] 二代公文修改
        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
        //Cola -- end --	
    }

    if (argCallerId == "EAT501C1")
    {
        document.all["txDPlan"].value = document.all["lbReturnValue"].options[0].value;
        if (document.all["txDPlan"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1060322  Justin [1050087] 二代公文修改
        //document.all["txDPlan"].focus();
        $('#txDPlan').focus();
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
//window.onbeforeunload = fnBeforePostBack;
var OrgArr;
function fnBeforePostBack()
{
    if (document.all["txYear"].value == "" && document.all["txEYear"].value != "")
    {
        document.all["txYear"].value = document.all["txEYear"].value
        document.all["txEYear"].value = ""
    }

    document.all["txHistoryContent"].value = "";
    document.all["txBatchContent"].value = "";
    //1. 將txHistoryContent隱藏欄位值assign成 dg1(史政機關檢選情形)之字串組合
    //   格式為: field1_1;field1_2|field2_1;field2_2 ...
    var strVal, tmpVal, tmpVal1, tmpVal2, tmpVal3;
    var rtnVal = "";
    var firstAdd = true;
    OrgArr = new Array();
    var OrgCnt = 0;

    for (var dg1_idx = 0; dg1_idx < (document.all.dg1.rows.length) - 1; dg1_idx++)
    {
        //     strVal = "dg1__ctl"+(dg1_idx+2)+"_txInput1";	//dsvis 修改 數量改為「幾」案「幾」卷
        //		tmpVal1 = jf_Trim(document.all[strVal].value);
        //
        //		strVal = "dg1__ctl"+(dg1_idx+2)+"_txInput2";
        //		tmpVal2 = jf_Trim(document.all[strVal].value);

        strVal = "dg1__ctl" + (dg1_idx + 2) + "_txInput1";
        tmpVal1 = jf_Trim(document.all[strVal].value);

        strVal = "dg1__ctl" + (dg1_idx + 2) + "_txCaseCnt";
        tmpVal2 = jf_Trim(document.all[strVal].value);

        strVal = "dg1__ctl" + (dg1_idx + 2) + "_txVolCnt";
        tmpVal3 = jf_Trim(document.all[strVal].value);
        //tmpVal = tmpVal1 + ";" + tmpVal2;			
        tmpVal = tmpVal1 + ";" + tmpVal2 + ";" + tmpVal3;

        if (firstAdd)
        {
            //if ((tmpVal1 != "") && (tmpVal2 != ""))
            if ((tmpVal1 != "") && (tmpVal2 != "") && (tmpVal3 != ""))
            {
                rtnVal += tmpVal;
                firstAdd = false;
                OrgArr[OrgCnt] = tmpVal1;
                OrgCnt++;
            }
        }
        else
        {
            //if ((tmpVal1 != ";") && (tmpVal2 != "") )
            if ((tmpVal1 != ";") && (tmpVal2 != "") && (tmpVal3 != ""))
            {
                rtnVal += "|" + tmpVal;
                OrgArr[OrgCnt] = tmpVal1;
                OrgCnt++;
            }
        }
    }

    if (document.all["txHistoryContent"].value == "")
        document.all["txHistoryContent"].value += rtnVal;
    else
        document.all["txHistoryContent"].value += "|" + rtnVal;

    //2. 將txBatchContent隱藏欄位值assign成 dg2(包含清理批號)之字串組合
    //   格式為: field1_1;field1_2|field2_1;field2_2 ...
    //var strTableFields = new Array("_txPlanNum","_lbDate","_lbDesc");
    var strVal, tmpVal;
    var rtnVal = "";
    var firstAdd = true;
    for (var dg2_idx = 0; dg2_idx < (document.all.dg2.rows.length) - 1; dg2_idx++)
    {
        strVal = "dg2__ctl" + (dg2_idx + 2) + "_txPlanNum";
        tmpVal = jf_Trim(document.all[strVal].value) + ";";
        strVal = "dg2__ctl" + (dg2_idx + 2) + "_lbDate";
        //1060322  Justin [1050087] 二代公文修改
        //tmpVal += jf_Trim(document.all[strVal].innerText) + ";"
        tmpVal += jf_Trim(document.all[strVal].textContent) + ";"
        strVal = "dg2__ctl" + (dg2_idx + 2) + "_lbDesc";
        //tmpVal += jf_Trim(document.all[strVal].innerText);
        tmpVal += jf_Trim(document.all[strVal].textContent);
        if (firstAdd)
        {
            if (tmpVal != ";")
            {
                rtnVal += tmpVal;
                firstAdd = false;
            }
        }
        else
        {
            if (tmpVal != ";")
                rtnVal += "|" + tmpVal;
        }
    }
    if (document.all["txBatchContent"].value == "")
        document.all["txBatchContent"].value += rtnVal;
    else
        document.all["txBatchContent"].value += "|" + rtnVal;
}

function ObjOnBlur(argObjName)
{
    switch (argObjName)
    {
        case "txPlanNo": //清理批號檢查Plan_Main有無存在
            if (document.all.txPlanNo.value != "")
            {
                var param = new Array(1);
                param[0] = document.all.txPlanNo.value;
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckPlanMainByKey", false, param);
                iCallID_txPlanNo = callObj.id;
                OnWSResult(callObj);
            }
            break;
    }
}

//刪除選取
function eajf_DeleteSelected(argTableName, argCheckBoxName, argTableFields)
{
    if (document.all[argTableName] == null)
        return;

    var delArr = new Array(document.all[argTableName].rows.length - 1);
    //alert(delArr.length);	
    var delCount = 0;
    for (var i = 0; i < delArr.length; i++)
    {
        if (document.all[argTableName + "__ctl" + (i + 2) + argCheckBoxName].checked)
        {
            delArr[i] = true;
            delCount++;
        }
        else
            delArr[i] = false;
    }

    var moveIdxArr = new Array(delArr.length - delCount);
    jCnt = 0;
    for (var i = 0; i < delArr.length; i++)
    {
        if (delArr[i] == false)
        {
            moveIdxArr[jCnt] = i;
            jCnt++;
        }
    }
    var change2Idx = 2;
    for (var i = 0; i < moveIdxArr.length; i++)
    {
        var fieldlen = argTableFields.length;
        for (j = 0; j < fieldlen; j++)
        {
            var tmpObj = document.all[argTableName + "__ctl" + change2Idx + argTableFields[j]];
            var giveObj = document.all[argTableName + "__ctl" + (moveIdxArr[i] + 2) + argTableFields[j]];

            if (tmpObj.type == "text") //TextBox
            {
                tmpObj.value = giveObj.value;
            }
            else if (tmpObj.type == "textarea") //TextArea
            {
                tmpObj.value = giveObj.value;
            }
            else if (tmpObj.type == "checkbox") //CheckBox
            {
                tmpObj.checked = giveObj.checked;
            }
            else if (tmpObj.type == "radio") //RadioButton
            {
                tmpObj.checked = giveObj.checked;
            }
            else if (tmpObj.type == "select-one") //DropDownList
            {
                tmpObj.selectedIndex = giveObj.selectedIndex;
            }
            else if (tmpObj.nodeName == "SPAN") //Label
            {
                //1060322  Justin [1050087] 二代公文修改
                //tmpObj.innerText = giveObj.innerText;
                tmpObj.textContent = giveObj.textContent;
            }
        }
        change2Idx++;
    }

    for (var i = 0; i < delCount; i++)
    {
        //1060322  Justin [1050087] 二代公文修改
        //document.all[argTableName].deleteRow();
        document.getElementById(argTableName).deleteRow(1);
    }
    if (document.all[argTableName].rows.length == 1)
        document.all[argTableName].className = "hide";

    //95.10.11 David 修正dg Insert 時發生空白列問題
    if (document.all.dg2.rows.length == 1)
    {
        document.all.dg2.className = "";
        var CurrCount = document.all.dg2.rows.length;

        var oRow = document.all.dg2.insertRow();
        if (((CurrCount + 1) % 2) == 0)
        {
            oRow.className = "tr02";
        }
        else
        {
            oRow.className = "tr01";
        }
        oCell = oRow.insertCell();
        oCell.innerHTML = "<span id=\"dg2__ctl" + (CurrCount + 1) + "_lbSEQ_NO\" style=\"font-family:細明體;font-size:Small;\">" + CurrCount + "</span>";
        oCell.align = "center";
        oCell = oRow.insertCell();
        oCell.innerHTML = "<input id=\"dg2__ctl" + (CurrCount + 1) + "_cbSelect\" type=\"checkbox\" name=\"dg2:_ctl" + (CurrCount + 1) + ":cbSelect\" />";
        oCell.align = "center";
        oCell = oRow.insertCell();
        oCell.innerHTML = "<input name=\"dg2:_ctl" + (CurrCount + 1) + ":txPlanNum\" type=\"text\" value=\"\" id=\"dg2__ctl" + (CurrCount + 1) + "_txPlanNum\" class=\"TextLabel\" style=\"width:80px;\" />";
        oCell = oRow.insertCell();
        oCell.innerHTML = "<span id=\"dg2__ctl" + (CurrCount + 1) + "_lbDate\"></span>";
        oCell.align = "center";
        oCell = oRow.insertCell();
        oCell.innerHTML = "<span id=\"dg2__ctl" + (CurrCount + 1) + "_lbDesc\"></span>";
    }

    jf_SelectClear(argTableName, argCheckBoxName);
}

function checkPlanNoDuplicate()
{
    if (document.all.dg2.rows.length > 1)
    {
        //for (var i=2;i<document.all.dg2.rows.length+1;i++)
        for (var i = 2; i < document.all.dg2.rows.length + 1; i++)
        {
            if (document.all["dg2__ctl" + i + "_txPlanNum"].value == document.all.txPlanNo.value)
                return true;
        }
    }
    return false;
}

function checkHistoryNoDuplicate()
{
    var rtnBool = false;

    for (var i = 0; i < OrgArr.length; i++)
    {
        for (var j = i + 1; j < OrgArr.length; j++)
        {
            if (OrgArr[i] == OrgArr[j])
                rtnBool = true;
        }
    }
    return rtnBool;
}

function eajf_Clean(argIsCleanAnyway)
{
    for (i = 0; i < document.forms[0].elements.length; i++)
    {

        if (argIsCleanAnyway != true)
        {
            if (document.forms[0].elements[i].readOnly)
                continue;
        }

        //[---]Modify by Cola 轉大寫後比對className 避免漏判
        if ((document.forms[0].elements[i].className.toUpperCase() != "HIDDEN") && (document.forms[0].elements[i].className.toUpperCase() != "HIDE"))
        {
            if (document.forms[0].elements[i].type == 'text')
                document.forms[0].elements[i].value = '';
            if (document.forms[0].elements[i].type == 'select-one')
                document.forms[0].elements[i].selectedIndex = 0;
            if (document.forms[0].elements[i].type == 'checkbox')
                document.forms[0].elements[i].checked = false;
            if (document.forms[0].elements[i].type == 'radio')
                document.forms[0].elements[i].checked = false;
            if (document.forms[0].elements[i].type == 'textarea')
                document.forms[0].elements[i].value = '';
        }
    }
    jf_SelectAll("dg2", "_cbSelect");
    eajf_DeleteSelected("dg2", "_cbSelect", strTableFields);

}

function eajf_ConfirmClean(argIsCleanAnyway)
{
    var ret = window.confirm("確定要清除嗎?");
    if (ret)
        eajf_Clean(argIsCleanAnyway);
    return ret;
}

//95.09.20 David Add 檢查機關名稱
var ws_OrgID = "";
function CheckOrgNo(objName, Index)
{
    document.all["txOrgIndex"].value = Index;
    var param = new Array(2);
    param[0] = document.all["txOrgNo"].value;
    param[1] = document.all[objName].value;
    if (param[1] != "")
    {
        var callObj_Org = jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, param); //使用WebService前必須先呼叫一次
        ws_OrgID = callObj_Org.id;
        OnWSResult(callObj_Org);
    }
}

//96.03.07 951286 David
//檢核機關名稱
function CheckOrgNo2(OrgValue, Index)
{
    document.all["txOrgIndex"].value = Index;
    var param = new Array(2);
    param[0] = document.all["txOrgNo"].value;
    param[1] = OrgValue;
    if (param[1] != "")
    {
        var callObj_Org = jf_CallWS("../EALIB/EA_LIB.asmx", "GetOrgName", false, param); //使用WebService前必須先呼叫一次
        ws_OrgID = callObj_Org.id;
        OnWSResult(callObj_Org);
    }
}

//96.03.06 951286 David
//記錄批號並呼叫ws
var ws_OrgCntId = "";
function fn_CountHistoryOfPlanNo()
{
    //fn_GetDg1Content();
    var now_plan_no = jf_Trim(document.all["txPlanNo"].value);
    var DgSize = document.all["dg2"].rows.length;

    //一律清空dg1中資料
    var dg1Size = document.all["dg1"].rows.length;
    for (var i = 0; i < dg1Size - 1; i++)
    {
        document.all["dg1__ctl" + (i + 2) + "_txInput1"].value = "";
        //document.all["dg1__ctl"+(i+2)+"_txInput2"].value = "";
        document.all["dg1__ctl" + (i + 2) + "_txCaseCnt"].value = "";//[0990546]davis 新增案數
        document.all["dg1__ctl" + (i + 2) + "_txVolCnt"].value = "";//[0990546]davis 新增卷數
        document.all["dg1__ctl" + (i + 2) + "_tx_OrgNo_H"].value = "";
    }

    //若只有一列，且又為空白，則清空後return
    /*if(DgSize == 2)
    {
        if(jf_Trim(document.all["dg2__ctl2_txPlanNum"].value) == "")
            return;
    }*/

    //alert("now_plan_no:"+now_plan_no+";DgSize:"+DgSize);
    var DocArr = "";
    for (var i = 0; i < DgSize - 1; i++)
    {
        if (DocArr != "")
        {
            DocArr += ",";
        }
        DocArr += "'" + document.all["dg2__ctl" + (i + 2) + "_txPlanNum"].value + "'";
    }
    var param = new Array(2);
    param[0] = DocArr;
    //param[0] = DocArr; [0990546] Davis修改 改傳dplan_no
    //param[0] = document.all["txDPlan"].value;  //davis[0991034]  改回傳送批號
    param[1] = document.all["txOrgNo"].value;
    var callObj_OrgCnt = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CaculateHistoryOrg", false, param); //使用WebService前必須先呼叫一次
    ws_OrgCntId = callObj_OrgCnt.id;
    OnWSResult(callObj_OrgCnt);

    //fn_SetDg1UserInputContent();
}

//96.03.06 951286 David
//處理回傳機關物件
//function AccessHistoryOrg(OrgArr,CntArr)
function AccessHistoryOrg(OrgArr, CaseArr, CntArr)//davis[0990546]  修改案、卷數回傳值
{
    var ArrSize = OrgArr.length;
    var CurrCount = document.all["dg1"].rows.length;

    //增加Dg1列數
    while (ArrSize >= CurrCount)
    {
        for (i = 0; i < 5; i++)
        {
            var oRow = document.getElementById("dg1").insertRow();                                             //dg1__ctl"+(dg1_idx+2)+"_txInput1
            var Index = CurrCount + i + 1;
            oCell = oRow.insertCell();
            //1060322 Justin [1050087] 二代公文修改
            //oCell.innerHTML = "<input name=\"dg1:_ctl"+ Index  +":txInput1\" type=\"text\" maxlength=\"10\" id=\"dg1__ctl"+Index+"_txInput1\" onblur=CheckOrgNo(\"dg1__ctl"+Index+"_txInput1\",\""+Index+"\"); class=\"InputFieldText\" style=\"font-family:細明體;font-size:Small;height:25px;width:150px;\" /><input name=\"dg1:_ctl"+ Index  +":tx_OrgNo_H\" type=\"text\" maxlength=\"10\" id=\"dg1__ctl"+Index+"_tx_OrgNo_H\" class=\"Hide\" />";
            oCell.innerHTML = "<input name=\"dg1:_ctl" + Index + ":txInput1\" type=\"text\" maxlength=\"10\" id=\"dg1__ctl" + Index + "_txInput1\" onblur=CheckOrgNo(\"dg1__ctl" + Index + "_txInput1\",\"" + Index + "\"); style=\"width: 9.5em;\" /><input name=\"dg1:_ctl" + Index + ":tx_OrgNo_H\" type=\"text\" maxlength=\"10\" id=\"dg1__ctl" + Index + "_tx_OrgNo_H\" class=\"hide\" />";
            oCell = oRow.insertCell();
            //oCell.innerHTML = "<input name=\"dg1:_ctl"+ Index +":txInput2\" type=\"text\" maxlength=\"3\" id=\"dg1__ctl"+ Index +"_txInput2\" class=\"InputFieldText\" style=\"font-family:細明體;font-size:Small;height:25px;width:30px;\" />";
            //1060322 Justin [1050087] 二代公文修改
            //oCell.innerHTML = "<input name=\"dg1:_ctl" + Index + ":txCaseCnt\" type=\"text\" maxlength=\"3\" id=\"dg1__ctl" + Index + "_txCaseCnt\" class=\"InputFieldText\" style=\"font-family:細明體;font-size:Small;height:25px;width:30px;\" />";//davis[0990546] 新增案數
            //oCell.innerHTML = "<input name=\"dg1:_ctl" + Index + ":txVolCnt\" type=\"text\" maxlength=\"3\" id=\"dg1__ctl" + Index + "_txVolCnt\" class=\"InputFieldText\" style=\"font-family:細明體;font-size:Small;height:25px;width:30px;\" />";//davis[0990546] 新增卷數
            oCell.innerHTML = "<input name=\"dg1:_ctl" + Index + ":txCaseCnt\" type=\"text\" maxlength=\"3\" id=\"dg1__ctl" + Index + "_txCaseCnt\" class=\"InputFieldNumeric\" style=\"width: 2em;\" />"
                + "<span    id=\"dg1:_ctl" + Index + ":Label25\" style=\"Z-INDEX: 0\">" + " 案 " + "</span>"
                + "<input name=\"dg1:_ctl" + Index + ":txVolCnt\" type=\"text\" maxlength=\"3\" id=\"dg1__ctl" + Index + "_txVolCnt\" class=\"InputFieldNumeric\" style=\"width: 2em;\" />"
                + "<span    id=\"dg1:_ctl" + Index + ":Label23\" style=\"Z-INDEX: 0\">" + " 卷 " + "</span>";
            oCell.align = "center";
        }
        CurrCount = document.all["dg1"].rows.length;
    }
    //tx_OrgNo_H
    for (var i = 0; i < OrgArr.length; i++)
    {
        CheckOrgNo2(OrgArr[i], i + 2);
        document.all["dg1__ctl" + (i + 2) + "_tx_OrgNo_H"].value = "*";
        //document.all["dg1__ctl"+(i+2)+"_txInput2"].value = CntArr[i];
        document.all["dg1__ctl" + (i + 2) + "_txCaseCnt"].value = CaseArr[i];//davis[0990546] 新增回傳的案數
        document.all["dg1__ctl" + (i + 2) + "_txVolCnt"].value = CntArr[i];//davis[0990546] 新增回傳的卷數
    }
}

//96.03.09 951286 David 檢核使用者輸入史政機關名稱是否重複
function fn_CheckHisOrgDunplicate(InputOrgName, Index)
{
    var Dg1Size = document.all["dg1"].rows.length;
    for (var i = 0; i < Dg1Size - 1; i++)
    {
        var dg_OrgName = document.all["dg1__ctl" + (i + 2) + "_txInput1"].value;
        if (dg_OrgName == InputOrgName)
        {
            alert("輸入機關名稱:" + InputOrgName + ",已存在資料表第" + (i + 1) + "項中;\n系統會依右方資料表中之批號,自動計算各史政機關註記數量情形,\n使用者不需自行輸入數量.");
            document.all["dg1__ctl" + Index + "_txInput1"].value = "";
            return false;
        }
    }
    return true;
}

//96.03.09 951286 David 先取得史政機關資料表中內容
var Dg1Array;
function fn_GetDg1Content()
{
    var Dg1Size = document.all["dg1"].rows.length;
    Dg1Array = new Array(Dg1Size);
    for (var i = 0; i < Dg1Size - 1; i++)
    {
        //標示不為*的，為使用者自行輸入欄位，僅取出使用者自行輸入的欄位
        if (document.all["dg1__ctl" + (i + 2) + "_tx_OrgNo_H"].value == "")
        {
            Dg1Array[i] = document.all["dg1__ctl" + (i + 2) + "_txInput1"].value + ":" + document.all["dg1__ctl" + (i + 2) + "_txCaseCnt"].value + ":" + document.all["dg1__ctl" + (i + 2) + "_txVolCnt"].value;//davis 由數量改成案、卷數
            //Dg1Array[i] = document.all["dg1__ctl"+(i+2)+"_txInput1"].value+":"+document.all["dg1__ctl"+(i+2)+"_txInput2"].value;
        }
    }
}

//96.03.09 951286 David 設定不存在於批號中的史政機關(由使用者自行輸入的內容)
function fn_SetDg1UserInputContent()
{
    var Dg1Size = document.all["dg1"].rows.length;
    //alert(0);
    var Dg1Arr_Len = Dg1Array.length;
    //alert(1);
    var Dg1AddArr = new Array();
    //alert(2);
    var addIndex = 0;
    //alert(Dg1Array);

    for (var i = 0; i < Dg1Arr_Len; i++)
    {
        //alert(dg1_OrgName);
        //alert(dg1_OrgName);
        var FindFlag = false;
        var dg1_Pre_OrgName = "";
        var dg1_Pre_Cnt = "";

        if (Dg1Array[i] != null)
        {
            try
            {
                var dg1_Pre_Content = Dg1Array[i].split(':');
                if (dg1_Pre_Content.length == 2)
                {
                    dg1_Pre_OrgName = dg1_Pre_Content[0];	//更新前史政機關名稱
                    dg1_Pre_Cnt = dg1_Pre_Content[1];		//更新前史政機關註記數量
                }

                var cnt = 0;
                for (var j = 0; j < Dg1Size - 1; j++)
                {
                    var dg1_OrgName = document.all["dg1__ctl" + (j + 2) + "_txInput1"].value;
                    if (jf_Trim(dg1_OrgName) == jf_Trim(dg1_Pre_OrgName))
                    {
                        cnt++;
                    }
                }

                if (cnt == 0)
                {
                    FindFlag = true;
                }

                if (FindFlag)
                {
                    Dg1AddArr[addIndex] = dg1_Pre_OrgName + ":" + dg1_Pre_Cnt;
                    addIndex++;
                }
                FindFlag = false;
            }
            catch (e)
            { alert(e.message); }
        }
    }

    //取得Dg1為空白的第i行
    var setIndex = -1;
    for (var i = 0; i < Dg1Size - 1; i++)
    {
        if (document.all["dg1__ctl" + (i + 2) + "_txInput1"].value == "")
        {
            setIndex = i;
            break;
        }
    }
    //設定上述取得使用者自行設定的史政機關及其數量
    for (var i = 0; i < Dg1AddArr.length; i++)
    {
        var OrgObj = Dg1AddArr[i].split(':');
        var OrgName = OrgObj[0];
        var OrgCnt = OrgObj[1];
        document.all["dg1__ctl" + (i + 2 + setIndex) + "_txInput1"].value = OrgName;
        document.all["dg1__ctl" + (i + 2 + setIndex) + "_txInput2"].value = OrgCnt;
    }
}
//96.03.09 951286 David 畫面初始化時，將隱藏欄位內值設為*，以作後續標記處理用
function fn_SetDg1Star()
{
    var Dg1Size = document.all["dg1"].rows.length;
    for (var i = 0; i < Dg1Size - 1; i++)
    {
        document.all["dg1__ctl" + (i + 2) + "_tx_OrgNo_H"].value = "*";
    }
}
function jf_CalcVolNum()
{
    var argWSParam2 = new Array(6);
    argWSParam2[0] = "add";
    argWSParam2[1] = document.all.H_OrgNo.value;
    argWSParam2[2] = document.all.txPlanNo.value;
    /*1060322  Justin [1050087] 二代公文修改
    argWSParam2[3] = document.all.tc.innerText;
    argWSParam2[4] = document.all.tv.innerText;
    argWSParam2[5] = document.all.ts.innerText;*/
    argWSParam2[3] = document.all.tc.textContent;
    argWSParam2[4] = document.all.tv.textContent;
    argWSParam2[5] = document.all.ts.textContent;
    var callObj2 = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CaculatePlanDetail", false, argWSParam2);
    iCallID_PlanDetail = callObj2.id;
    OnWSResult(callObj2);
}

//1120904	Joe		1120709		弱掃修正XSS
function Htmlencode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}