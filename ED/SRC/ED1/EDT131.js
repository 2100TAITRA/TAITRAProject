/*
DATE	SA		PRG		MGR_NO			DESC
1070724	David	David	1070245			新增程式
1070816 Kevin	Justin	1070678			弱掃Client Potential Code Injection修正
1070823 Kevin	Joe		1070678			弱掃Client Potential Code Injection修正
1070830 Kevin   Justin  1070678         弱掃AJAX修改
1081105 Kevin	Kevin	1080825			調整改分(移文)公文紀錄邏輯
1081126 Kevin   Kevin   1080825         修正移文時若承辦單位有值仍會寫入問題
1081209 Kevin   Kevin   1080825         新增檢核紙本公文需依照設定檢核是否可傳給二級登記桌
1081211 Kevin   Kevin   1080825         傳送前新增檢核來文日期、機關、主旨
1081227 Kevin	Kevin	1080825			調整業務類別與限辦日期之連動
1090618 Kevin   Kevin   1090271         訴願會預設訴願公文性質
1090903	Kevin	Kevin	1090624         來文者查詢欄位調整 & 傳送時不異動批次傳送未處理欄位
1100204	Leslie	Joe		1090482			弱掃修正WebInspect
1110331 Kevin   Kevin   1100324         修正訴願公文性質排序變更問題
1120412	Kevin	Zen		銓敘部序14      修正一級機關未依設定傳送至指定承辦人之問題
1130626 Kevin	Kevin	1130291			支援AI預設承辦單位
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
var gCheckSearchType;
//1070830 Justin [1070678]弱掃AJAX修改
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
    SetUI();
	//1130626 Kevin 1130291 支援AI預設承辦單位
	InitConfColor();

    GetSearchType();
    if (document.all.ShowMsg && document.all.ShowMsg.value != "")
        alert(document.all.ShowMsg.value);

    //1120720
    if (document.all.dg1)
        CheckRepeat('dg1');

    dlDeptOnChang();
    dlProperty_onchange();

	//1130626 Kevin 1130291 支援AI預設承辦單位
	InitInfrdeptno();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var dgTarget = "dg1";
    if (document.all.dg2)
        dgTarget = "dg2";

    var xObjectName = e.target.id;
    var pNo = xObjectName.substring(8, xObjectName.indexOf("_dgbtOpenErcv"));
    var btDgOpenErcv;
    if (document.all[dgTarget + "__ctl" + pNo + "_dgbtOpenErcv"] != null)
        btDgOpenErcv = document.all[dgTarget + "__ctl" + pNo + "_dgbtOpenErcv"].id;

	//1130626 Kevin 1130291 支援AI預設承辦單位
	var dgbtSimilarDoc;
	//1140327 Kevin 問題序49 修正無法開啟電子收文問題
	if(xObjectName.indexOf("_dgbtSimilarDoc")!=-1)
	{
	pNo = xObjectName.substring(8, xObjectName.indexOf("_dgbtSimilarDoc"));
	if (document.all[dgTarget + "__ctl" + pNo + "_dgbtSimilarDoc"] != null)
		dgbtSimilarDoc = document.all[dgTarget + "__ctl" + pNo + "_dgbtSimilarDoc"].id;
	}
	
    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 新增支援設定
    var sCbTarget = "_cbCheckSet";
    if (document.all.rbTran.checked)
        sCbTarget = "_cbCheckSend";

    switch (xObjectName)
    {
        case "btHelp":
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = "../../../WEDEP/WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.h_OrgNo.value + "&K1=WEM010";
            jf_OpenChildWin(strUrl, "WEM010C1", 800, 600);
            break;
        case "btCaseNoPrompt":
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = document.all.WS_LOCATION.value + "ODI210.aspx";
            jf_OpenChildWin(strUrl, "ODI210", 800, 600);
            break;
        case "btSelectAll":
            Page_BlockSubmit = true;
            //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 新增支援設定
            //jf_SelectAll(dgTarget, "_cbCheckSet");
            jf_SelectAll(dgTarget, sCbTarget);
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 新增支援設定
            //jf_SelectInverse(dgTarget, "_cbCheckSet");
            jf_SelectInverse(dgTarget, sCbTarget);
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 新增支援設定
            //jf_SelectClear(dgTarget, "_cbCheckSet");
            jf_SelectClear(dgTarget, sCbTarget);
            break;
        case "btSet":
            Page_BlockSubmit = true;
            setDg(dgTarget);
            break;
        case btDgOpenErcv:
            Page_BlockSubmit = true;
            OpenElec(dgTarget, pNo);
            break;
		//1130626 Kevin 1130291 支援AI預設承辦單位
		case dgbtSimilarDoc:
			Page_BlockSubmit = true;
			OpenSimilarDoc(dgTarget, pNo);
			break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    xObjectName = event.target.id;

    var dgTarget = "dg1";
    if (document.all.dg2)
        dgTarget = "dg2";

    if (bOpenODT130)
    {
        Page_BlockSubmit = true;
        alert("已開啟其他公文ODT130視窗，請關閉後再執行開啟");
        return;
    }

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !CheckSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSend":
            Page_BlockSubmit = !CheckSend(dgTarget);
            jf_ToolBarSubmit(xObjectName);
            break;
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
    if (argCallerId == "WEM010C1")
    {
        var DeptInfo = document.all["lbReturnValue"].options[0].value;
        var DeptArray = DeptInfo.split('^');
        if (DeptArray.length > 0)
        {
            document.all["txFromOrgName"].value = jf_Trim(DeptArray[1]);
            document.all["txFromOrgNo"].value = jf_Trim(DeptArray[2]);
        }
    }
    if (argCallerId == "ODI210")
    {
        //設定案件編號
        document.all.txCaseNo.value = document.all["lbReturnValue"].options[0].text;
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function OnWSResult(argResult)
{
    if (argResult.id == iCallID_GetBTypeNo)  //由公文性質取得業務類別
    {
        if (argResult.error)
            alert(argResult.errorDetail.string);
        else
        {
            if (jf_IsWebServiceSuccess(argResult))
                iCallID_GetBTypeNo = argResult.value;
        }

        //清空選項
        fnClearDropDownList(document.all.dlBTypeNo)

        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.IsErr || argResult.value.RtnStr == "")
            {
                document.all.dlBTypeNo.disabled = true;
                document.all.dlBTypeNo.options.add(new Option("", ""));
                document.all.dlBTypeNo.style.backgroundColor = "LightGrey";
                return false;
            }
            if (argResult.value.RtnStr != "")
            {
                document.all.dlBTypeNo.disabled = false;

                var pTmpAry = argResult.value.RtnStr.split(":");

                //將值塞入 dlBTypeNo
                if (pTmpAry.length == 0)
                {
                    document.all.dlBTypeNo.disabled = true;
                    document.all.dlBTypeNo.options.add(new Option("", ""));
                    document.all.dlBTypeNo.style.backgroundColor = "LightGrey";
                }
                else
                {
                    document.all.dlBTypeNo.style.backgroundColor = "";
                    /*if(document.all.h_PtyChangeWithBns.value != "N")
                    {
                        document.all.dlBTypeNo.options.add(new Option("",""));
                    }

                    //是否依照單位帶出業務類別
                    var pTmpAry3 = document.all.H_txUserDept.value.split(",");

                    //紀錄畫面承辦單位是否有資料(紀錄一級單位代碼)
                    /*var strNowDeptNo = "";
                    if(document.all["H_DeptNo_Value"].value != "")
                    {
                        strNowDeptNo = document.all["H_DeptNo_Value"].value.split(':')[0];
                    }*/

                    for (var i = 0; i < pTmpAry.length; i++)
                    {
                        var pTmpAry2 = pTmpAry[i].split(",");
                        //單位登記桌
                        /*if ((document.all.H_txGetBType.value == "Y") && (pTmpAry3[0] == "N"))
                        {
                            if (pTmpAry2[2] == pTmpAry3[1])
                            {
                                var objOption = new Option(pTmpAry2[0]+" "+pTmpAry2[1], pTmpAry2[0]);
                                BTypeComboBoxObj.options.add(objOption);
                            }
                            else if (pTmpAry2[2] == document.all.SOURCE_ORGNO.value)
                            {
                                var objOption = new Option(pTmpAry2[0]+" "+pTmpAry2[1], pTmpAry2[0]);
                                BTypeComboBoxObj.options.add(objOption);
                            }
                        }
                        else if ((document.all.H_txGetBType.value == "Y") && (pTmpAry3[0] == "Y"))
                        {
                            if (pTmpAry2[2] == document.all.SOURCE_ORGNO.value)//全機關可用的內容
                            {
                                var objOption = new Option(pTmpAry2[0]+" "+pTmpAry2[1], pTmpAry2[0]);
                                BTypeComboBoxObj.options.add(objOption);
                            }
                            //如畫面承辦單位有資料，新增設定該承辦單位可用的業務類別
                            else if(strNowDeptNo != "" && pTmpAry2[2] == strNowDeptNo && document.all.H_GetBTypeNoByOuRule.value=="1")
                            {
                                var objOption = new Option(pTmpAry2[0]+" "+pTmpAry2[1], pTmpAry2[0]);
                                BTypeComboBoxObj.options.add(objOption);
                            }
                        }
                        else
                        {
                            //document.all.dlWorkType.options.add(objOption);
                            var objOption = new Option(pTmpAry2[0]+" "+pTmpAry2[1], pTmpAry2[0]);
                            BTypeComboBoxObj.options.add(objOption);
                        }*/

                        var objOption = new Option(pTmpAry2[0] + " " + pTmpAry2[1], pTmpAry2[0]);
                        document.all.dlBTypeNo.options.add(objOption);
                    }
                    //2006.08.11 JEFF ---修改結束---

                    //當篩選後無可用的業務別時對應處理
                    if (document.all["dlBTypeNo"].options.length == 0)
                    {
                        /*BTypeComboBoxObj.size = 2;
                        BTypeComboBoxObj.options.add(new Option("",""));
                        BTypeComboBoxTextObj.value = "";//第一筆空白*/
                        document.all.dlBTypeNo.selectedIndex = 0;
                    }
                    else
                    {
                        /*if(document.all["dlBTypeNo"].options.length > 5)
                            document.all["dlBTypeNo"].size = 5;
                        else
                            document.all["dlBTypeNo"].size = document.all["dlBTypeNo"].options.length;*/
                        document.all.dlBTypeNo.selectedIndex = 0;
                    }
                }
            }
            else
            {
                /*BTypeComboBoxObj.size = 2;
                BTypeComboBoxObj.options.add(new Option("",""));
                BTypeComboBoxTextObj.value = "";//第一筆空白*/
                document.all.dlBTypeNo.selectedIndex = 0;
            }
            return true;
        }
    }
}

//1081227 Kevin 1080825 調整業務類別與限辦日期之連動
function dlBTypeNo_onchange()
{
    //取得該業務類別下之時效統計類別及處理期限是否可人工輸入
    var param = new Array(5);
    var ddlValueArray = document.all.dlProperty.options[document.all.dlProperty.selectedIndex].value.split(",");
    var strDocProperty = ddlValueArray[0];
    var strBTypeNo = document.all.dlBTypeNo.options[document.all.dlBTypeNo.selectedIndex].value;

    var SumTypInfo = ED1.EDT131.GetSumType("0", document.all.h_OrgNo.value, strDocProperty, "1", strBTypeNo, "").value;
    if (SumTypInfo)
    {
        if (SumTypInfo.bSuccess)
        {
            //處理期限決定方式I=使用者輸入;S=依速別判斷;B=依處理期限天數設定;M=依處理期限天數及開會日期設定

            document.all.txDueDate.value = '';
            document.all.txLeadTime.value = '';
            document.all.dlLtUom.selectedIndex = 0;
            //1120727
            document.all.txLeadTime = SumTypInfo.LeadTimeDB;

            if (SumTypInfo.LtBy == "I")
            {
                document.all.txDueDate.disabled = false;
                document.all.txLeadTime.disabled = true;
                document.all.dlLtUom.disabled = true;
            }
            else if (SumTypInfo.LtBy == "M" || SumTypInfo.LtBy == "S")
            {
                document.all.txDueDate.disabled = true;
                document.all.txLeadTime.disabled = true;
                document.all.dlLtUom.disabled = true;
            }
            else
            {
                document.all.txDueDate.disabled = true;
                //1120727
                //document.all.txLeadTime.disabled = false;
                //document.all.dlLtUom.disabled = false;
                document.all.txLeadTime.disabled = true;
                document.all.dlLtUom.disabled = true;
            }
        }
        else
        {
            alert(SumTypInfo.ErrMsg);
            return false;
        }
    }
    return true;

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function reSearch()
{
    if (bOpenODT130)
    {
        alert("已開啟其他公文ODT130視窗，請關閉後再執行開啟");
        if (gCheckSearchType == "1")
            document.all.rbType1.checked = true;
        else if (gCheckSearchType == "2")
            document.all.rbType2.checked = true;
        //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 新增電子來文已儲存
        else if (gCheckSearchType == "ES")
            document.all.rbTypeES.checked = true;
        else
            document.all.rbType3.checked = true;
        return;
    }

    Page_BlockSubmit = !CheckSearch();
    jf_ToolBarSubmit("btSearch");
}

function dlDeptOnChang()
{
    var strDeptNo = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;

    fnClearDropDownList(document.all.dlSect);
    fnClearDropDownList(document.all.dlUser);

    if (strDeptNo == "")
    {
        fnHideDropDownList(document.all.dlSect);
        return;
    }

    if (document.all.rbType3.checked)
        return;

    //初始化二級選單
    //1070830 Justin [1070678]弱掃AJAX修改
    //var SectObj = EDT131.GetSectInfo(jf_GetArtifact(), strDeptNo).value;
    var SectObj = ED1.EDT131.GetSectInfo(jf_GetArtifact(), strDeptNo).value;
    if (SectObj)
    {
        if (SectObj.bSuccess)
        {
            if (SectObj.SectInfo.length > 0)
            {
                document.all.dlSect.options.add(new Option("", ""));
                for (var iSect = 0; iSect < SectObj.SectInfo.length; iSect++)
                {
                    var strSect = SectObj.SectInfo[iSect];
                    document.all.dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));
                }
            }
        }
        else
        {
            alert(SectObj.ErrMsg);
        }
    }

    fnHideDropDownList(document.all.dlSect);

    //初始化人員選單
    //1070830 Justin [1070678]弱掃AJAX修改
    //var UserObj = EDT131.GetUserInfo(jf_GetArtifact(), strDeptNo).value;
    var UserObj = ED1.EDT131.GetUserInfo(jf_GetArtifact(), strDeptNo).value;
    if (UserObj)
    {
        if (UserObj.bSuccess)
        {
            document.all.dlUser.options.add(new Option("", ""));
            for (var iUser = 0; iUser < UserObj.Userinfo.length; iUser++)
            {
                var UserInfo = UserObj.Userinfo[iUser];
                if (UserInfo)
                {
                    var strUserName = UserInfo.UserName;
                    var strEmpName = UserInfo.EmpName;
                    document.all.dlUser.options.add(new Option(strEmpName, strUserName));
                }
            }
        }
        else
        {
            alert(UserObj.ErrMsg);
        }
    }

    fnHideDropDownList(document.all.dlUser);
}

function dlSectOnChang()
{
    var strSectNo = document.all.dlSect.options[document.all.dlSect.selectedIndex].value;

    fnClearDropDownList(document.all.dlUser);

    if (strSectNo == "")
    {
        dlDeptOnChang();
        return;
    }

    //初始化人員選單
    //1070830 Justin [1070678]弱掃AJAX修改
    //var UserObj = EDT131.GetUserInfo(jf_GetArtifact(), strSectNo).value;
    var UserObj = ED1.EDT131.GetUserInfo(jf_GetArtifact(), strSectNo).value;
    if (UserObj)
    {
        if (UserObj.bSuccess)
        {
            document.all.dlUser.options.add(new Option("", ""));
            for (var iUser = 0; iUser < UserObj.Userinfo.length; iUser++)
            {
                var UserInfo = UserObj.Userinfo[iUser];
                if (UserInfo)
                {
                    var strUserName = UserInfo.UserName;
                    var strEmpName = UserInfo.EmpName;
                    document.all.dlUser.options.add(new Option(strEmpName, strUserName));
                }
            }
        }
        else
        {
            alert(UserObj.ErrMsg);
        }
    }

    fnHideDropDownList(document.all.dlUser);
}

function CheckSearch()
{
    var strRcvDateText = document.all.lbRcvDate.textContent;
    if (document.all["txRcvDateS"].value == "" || document.all["txRcvDateE"].value == "")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strRcvDateText + "(起)、(迄)不可為空白"])), "");
        $('#txRcvDateS').focus();
        return false;
    }

    var strDateS = document.all["txRcvDateS"].value;
    var strDateE = document.all["txRcvDateE"].value;
    if (strDateS != "" && strDateE != "" && strDateS > strDateE)
    {
        document.all["txRcvDateS"].value = strDateE;
        document.all["txRcvDateE"].value = strDateS;
    }

    if (!CheckCDATE("txRcvDateS", "(起)"))
        return false;
    if (!CheckCDATE("txRcvDateE", "(迄)"))
        return false;

    var strFromDateS = document.all["txFromDateS"].value;
    var strFromDateE = document.all["txFromDateE"].value;
    if (strFromDateS != "" && strFromDateE != "" && strFromDateS > strFromDateE)
    {
        document.all["txFromDateS"].value = strFromDateE;
        document.all["txFromDateE"].value = strFromDateS;
    }

    return true;
}

//檢核日期格式
function CheckCDATE(argObj, strMsg)
{
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            $('#' + argObj).focus();
            return false;
        }
    }
    return true;
}

function CheckTarget()
{
    if (document.all.rbSendType1.checked)
    {
        //1081209 Kevin 1080825 新增檢核紙本公文需依照設定檢核是否可傳給二級登記桌
        if (document.all.H_FLOW_TYPE_P.value == "1" && document.all.rbType2.checked)
        {
            if (document.all.dlSect.value != "" && document.all.dlUser.value == "")
            {
                alert("目前系統為一層式登記桌模式，紙本公文不可分文給二級單位(無二級單位登記桌)，請分文給一級單位或指定承辦人");
                return false;
            }
        }

        if (document.all.dlDept.selectedIndex == -1)
        {
            alert("承辦單位選單未設定");
            return false;
        }

        if (document.all.dlDept.options[document.all.dlDept.selectedIndex].value == "")
        {
            alert("承辦單位選單未設定");
            return false;
        }
    }
    //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯
    //else if(!document.all.rbType3.checked && document.all.rbSendType2.checked)
    else if (document.all.rbSendType2.checked)
    {
        if (document.all.dlAssign.selectedIndex == -1)
        {
            //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯
            //alert("移文/銷號選單未設定");
            alert("移文選單未設定");
            return false;
        }

        if (document.all.dlAssign.options[document.all.dlAssign.selectedIndex].value == "")
        {
            //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯
            //alert("移文/銷號選單未設定");
            alert("移文選單未設定");
            return false;
        }
    }
    //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯
    else if (document.all.rbSendType3.checked)
    {
        if (document.all.dlCancel.selectedIndex == -1)
        {
            alert("銷號選單未設定");
            return false;
        }

        if (document.all.dlCancel.options[document.all.dlCancel.selectedIndex].value == "")
        {
            alert("銷號選單未設定");
            return false;
        }
    }
    return true;
}

function CheckSumType()
{
    if (document.all.dlBTypeNo.selectedIndex == -1)
    {
        alert("業務類別未設定");
        return false;
    }

    if (document.all.dlBTypeNo.options[document.all.dlBTypeNo.selectedIndex].value == "")
    {
        alert("無法取得業務類別資訊");
        return false;
    }

    //取得該業務類別下之時效統計類別及處理期限是否可人工輸入
    var param = new Array(5);
    var ddlValueArray = document.all.dlProperty.options[document.all.dlProperty.selectedIndex].value.split(",");
    var strDocProperty = ddlValueArray[0];
    var strBTypeNo = document.all.dlBTypeNo.options[document.all.dlBTypeNo.selectedIndex].value;

    //1070830 Justin [1070678]弱掃AJAX修改
    //var SumTypInfo = EDT131.GetSumType("0", document.all.h_OrgNo.value, strDocProperty, "1", strBTypeNo, "").value;
    var SumTypInfo = ED1.EDT131.GetSumType("0", document.all.h_OrgNo.value, strDocProperty, "1", strBTypeNo, "").value;
    if (SumTypInfo)
    {
        if (SumTypInfo.bSuccess)
        {
            /*
            public string LtUom = "";//處理期限單位
            public string LtBy = "";//處理期限決定方式I=使用者輸入;S=依速別判斷;B=依處理期限天數設定;M=依處理期限天數及開會日期設定
            public string LtIncHd = "";//處理期限是否含假日 Y/N
            public string StartRule = "";//起算日期的處理原則
            public string StartDate = "";//系統計算之起算日期原則
            public string StartDateCalcBySys = "";//系統計算之起算日期
            public string LeadTimeDB = "";//本筆資料的處理期限(DB裡的設定值)
            public string DueDate = "";//限辦日期 (系統自動計算)
            public string DueRule = "";//業務類別之限辦日期計算邏輯是否需順延至工作日*/
            if (SumTypInfo.LtBy == "I" && document.all.txDueDate.value == "")
            {
                alert("目前業務類別需由使用者輸入限辦日期，限辦日期不可為空");
                return false;
            }
            if (SumTypInfo.LtBy == "M" && document.all.txMeetDate.value == "")
            {
                alert("目前業務類別需由使用者輸入開會日期，開會日期不可為空");
                return false;
            }
        }
        else
        {
            alert(SumTypInfo.ErrMsg);
            return false;
        }
    }
    return true;
}

function CheckSetDg(argDg)
{
    var HasChecked = false;
    var len = document.all[argDg].rows.length;
    for (var i = 1; i < len; i++)
    {
        if (document.all[argDg + "__ctl" + (i + 1) + "_cbCheckSet"].checked)
        {
            HasChecked = true;
            break;
        }
    }

    if (!HasChecked)
    {
        alert("請勾選要執行設定的公文");
        return false;
    }
    return true;
}

//1120720 新增決定是否顯示訊息
function CheckSubmitDg(argDg, isShowMsg)
{
    if (isShowMsg != false)
        isShowMsg = true;

    if (!document.all.dg1 && !document.all.dg2)
    {
        if (isShowMsg)
        alert("請先執行查詢功能，並勾選要執行的公文");
        return false;
    }

    var HasChecked = false;
    var len = document.all[argDg].rows.length;
    for (var i = 1; i < len; i++)
    {
        if (document.all[argDg + "__ctl" + (i + 1) + "_cbCheckSend"].checked)
        {
            HasChecked = true;
            break;
        }
    }

    if (!HasChecked)
    {
        if (isShowMsg)
        alert("請勾選要執行的公文");
        return false;
    }
    return true;
}

function CheckSend(argDg)
{
    var ErrMsg = "";
    if (CheckSubmitDg(argDg))
    {
        var len = document.all[argDg].rows.length;
        for (var i = 1; i < len; i++)
        {
            if (document.all[argDg + "__ctl" + (i + 1) + "_cbCheckSend"].checked)
            {
                var strDocNo = "";
                if (argDg == "dg1")
                    strDocNo = document.all[argDg + "__ctl" + (i + 1) + "_hlDocNo"].textContent;
                else
                    strDocNo = document.all[argDg + "__ctl" + (i + 1) + "_lbDocNo"].textContent;

                var strSendType = document.all[argDg + "__ctl" + (i + 1) + "_dgtxSendType"].value;

                if (strSendType == "")
                {
                    ErrMsg += "文號[" + strDocNo + "]尚未設定傳送對象\n";
                    continue;
                }

                var strAssignOrgName = document.all[argDg + "__ctl" + (i + 1) + "_dgtxAssignOrgName"].value;
                var strToOuId = document.all[argDg + "__ctl" + (i + 1) + "_dgtxToOuId"].value;
                var strDocProperty = document.all[argDg + "__ctl" + (i + 1) + "_dgtxDocProperty"].value;
                var strBTypeNo = document.all[argDg + "__ctl" + (i + 1) + "_dgtxBTypeNo"].value;
                var strStartDate = document.all[argDg + "__ctl" + (i + 1) + "_dgtxStartDate"].value;
                var strDueDate = document.all[argDg + "__ctl" + (i + 1) + "_dgtxDueDate"].value;
                var strLeadTime = document.all[argDg + "__ctl" + (i + 1) + "_dgtxLeadTime"].value;

                //1081209 Kevin 1080825 新增檢核紙本公文需依照設定檢核是否可傳給二級登記桌
                var strToSectNo = document.all[argDg + "__ctl" + (i + 1) + "_dgtxToSectNo"].value;
                var strToUserName = document.all[argDg + "__ctl" + (i + 1) + "_dgtxToUserName"].value;

                //1081211 Kevin 1080825 傳送前新增檢核來文日期、機關、主旨
                var strFromDate = document.all[argDg + "__ctl" + (i + 1) + "_dgtxFromDate"].value;
                var strFromOrgName = document.all[argDg + "__ctl" + (i + 1) + "_dglbFromOrgName"].value;
                var strSubject = document.all[argDg + "__ctl" + (i + 1) + "_dgtxSubject"].value;

                if (strSendType == "1")
                {
                    if (strToOuId == "")
                    {
                        ErrMsg += "文號[" + strDocNo + "]尚未設定傳送對象\n";
                        continue;
                    }
                    //1081209 Kevin 1080825 新增檢核紙本公文需依照設定檢核是否可傳給二級登記桌
                    if (document.all.H_FLOW_TYPE_P.value == "1" && document.all.rbType2.checked)
                    {
                        if (strToSectNo != "" && strToUserName == "")
                        {
                            ErrMsg += "目前系統為一層式登記桌模式，文號[" + strDocNo + "]不可分文給二級單位(無二級單位登記桌)，請分文給一級單位或指定承辦人\n";
                            continue;
                        }
                    }
                    if (!document.all.rbType3.checked && (strDocProperty == "" || strBTypeNo == "" || strStartDate == "" || strDueDate == "" || strLeadTime == ""))
                    {
                        ErrMsg += "文號[" + strDocNo + "]時效相關欄位資訊不正確\n";
                        continue;
                    }
                    //1081211 Kevin 1080825 傳送前新增檢核來文日期、機關、主旨
                    if (!document.all.rbType3.checked && (strFromDate == "" || strFromOrgName == "" || strSubject == ""))
                    {
                        ErrMsg += "文號[" + strDocNo + "]來文日期、來文機關、主旨欄位資訊不足，請點選文號進行維護\n";
                        continue;
                    }
                }
                else if (strSendType == "2")
                {
                    if (document.all.rbType3.checked)
                    {
                        var strTxReason = document.all[argDg + "__ctl" + (i + 1) + "_dgtxReason"].value;

                        //1081211 Kevin 1080825 新增檢核銷號原因
                        //if(strAssignOrgName == "" && strTxReason == "")
                        if (strTxReason == "")
                        {
                            //ErrMsg += "文號[" + strDocNo + "]尚未設定銷號原因\n";
                            ErrMsg += "文號[" + strDocNo + "]尚未設定改分/銷號原因\n";
                            continue;
                        }
                    }
                    else
                    {
                        if (strAssignOrgName == "")
                        {
                            ErrMsg += "文號[" + strDocNo + "]尚未設定移文/銷號對象\n";
                            continue;
                        }
                    }
                }
            }
        }
        if (ErrMsg != "")
        {
            ErrMsg += "無法執行傳送功能";
            alert(ErrMsg);
            return false;
        }

        //1120720
        if (argDg == "dg1")
            return ConfirmRepeat();

        return true;
    }
    else
        return false;
}

function setDg(argDg)
{
    var bGetTarget = false;
    if (!CheckSetDg(argDg))
        return;

    if (!CheckTarget())
        return;

    var strType = "1";
    if (document.all.rbType2.checked)
        strType = "2";
    else if (document.all.rbType3.checked)
        strType = "3";
    //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 新增電子來文已儲存
    else if (document.all.rbTypeES.checked)
        strType = "ES";

    if (strType == "1" && !CheckSumType())
        return;

    var ErrMsg = "";

    var PropertyValueArray = document.all.dlProperty.options[document.all.dlProperty.selectedIndex].value.split(",");
    var strDocProperty = PropertyValueArray[0];
    var strPtyName = document.all.dlProperty.options[document.all.dlProperty.selectedIndex].text;
    var strBTypeNo = document.all.dlBTypeNo.options[document.all.dlBTypeNo.selectedIndex].value;
    var strBTypeName = document.all.dlBTypeNo.options[document.all.dlBTypeNo.selectedIndex].text.split(' ')[1];
    var strSetMeetDate = document.all.txMeetDate.value;
    var strSetLeadTime = document.all.txLeadTime.value;
    var strSetLtUom = document.all.dlLtUom.options[document.all.dlLtUom.selectedIndex].value;
    var strSetDueDate = document.all.txDueDate.value;

    var strSendType = "1";
    //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 改分銷號獨立
    //if(document.all.rbSendType2.checked)
    if (document.all.rbSendType2.checked || document.all.rbSendType3.checked)
        strSendType = "2";
    var strAssignOrgNo = "";
    var strAssignOrgName = "";

    //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 新增移文判斷，銷號不處理此欄位
    if (document.all.rbSendType2.checked)
    {
        if (document.all.dlAssign.selectedIndex != -1)
        {
            strAssignOrgNo = document.all.dlAssign.options[document.all.dlAssign.selectedIndex].value;
            strAssignOrgName = document.all.dlAssign.options[document.all.dlAssign.selectedIndex].text;
        }
    }
    else if (document.all.rbSendType3.checked && !document.all.rbType3.checked) //新收文銷號用，改分資料夾的銷號原因是txReason
    {
        if (document.all.dlCancel.selectedIndex != -1)
        {
            strAssignOrgNo = document.all.dlCancel.options[document.all.dlCancel.selectedIndex].value;
            strAssignOrgName = document.all.dlCancel.options[document.all.dlCancel.selectedIndex].text;
        }
    }

    var strToDeptNo = "";
    var strToDeptName = "";
    var strToSectNo = "";
    var strToSectName = "";
    var strToUserName = "";
    var strToEmpName = "";
    //1081126 Kevin 1080825 修正移文時若承辦單位有值仍會寫入問題
    if (strSendType == "1")
    {
        if (document.all.dlDept.selectedIndex != -1)
        {
            strToDeptNo = document.all.dlDept.options[document.all.dlDept.selectedIndex].value;
            strToDeptName = document.all.dlDept.options[document.all.dlDept.selectedIndex].text;
        }
        if (document.all.dlSect.selectedIndex != -1)
        {
            strToSectNo = document.all.dlSect.options[document.all.dlSect.selectedIndex].value;
            strToSectName = document.all.dlSect.options[document.all.dlSect.selectedIndex].text;
        }
        //1120412 Zen 銓敘部序14 修正一級機關未依設定傳送至指定承辦人之問題
        //if (document.all.dlSect.selectedIndex != -1)
        if (document.all.dlUser.selectedIndex != -1)
        {
            strToUserName = document.all.dlUser.options[document.all.dlUser.selectedIndex].value;
            strToEmpName = document.all.dlUser.options[document.all.dlUser.selectedIndex].text;
        }
    }
    var strToOuId = strToDeptNo;
    if (strToSectNo != "")
        strToOuId = strToSectNo;

    var strTargetShow = "";
    if (strSendType == "1")
    {
        strTargetShow = strToDeptName;
        if (strToSectName != "")
            strTargetShow = strToSectName;
        if (strToEmpName != "")
            strTargetShow += "-" + strToEmpName;
    }
    else
    {
        strTargetShow = "銷號";
        if (strAssignOrgName != "")
            strTargetShow = strAssignOrgName;
    }

    var strDocSourceName = document.all.dlDocSource.options[document.all.dlDocSource.selectedIndex].text;
    var strDocSource = document.all.dlDocSource.options[document.all.dlDocSource.selectedIndex].value;
    var strCaseNo = document.all.txCaseNo.value;

    //var strRcvDesc = document.all.txRcvDesc.value;
    var strRcvDesc = '';
    //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 移除改分原因設定欄位，由DG自行設定
    //var strTxReason = document.all.txReason.value;

    var len = document.all[argDg].rows.length;
    for (var i = 1; i < len; i++)
    {
        if (document.all[argDg + "__ctl" + (i + 1) + "_cbCheckSet"].checked)
        {
            var strDocNo = "";
            if (argDg == "dg1")
                strDocNo = document.all[argDg + "__ctl" + (i + 1) + "_hlDocNo"].textContent;
            else
                strDocNo = document.all[argDg + "__ctl" + (i + 1) + "_lbDocNo"].textContent;

            document.all[argDg + "__ctl" + (i + 1) + "_dgtxSendType"].value = strSendType;
            document.all[argDg + "__ctl" + (i + 1) + "_dgtxAssignOrgNo"].value = strAssignOrgNo;
            document.all[argDg + "__ctl" + (i + 1) + "_dgtxAssignOrgName"].value = strAssignOrgName;
            document.all[argDg + "__ctl" + (i + 1) + "_dglbTarget"].textContent = strTargetShow;
            document.all[argDg + "__ctl" + (i + 1) + "_dgtxToOuId"].value = strToOuId;
            document.all[argDg + "__ctl" + (i + 1) + "_dgtxToDeptNo"].value = strToDeptNo;
            document.all[argDg + "__ctl" + (i + 1) + "_dgtxToDeptName"].value = strToDeptName;
            document.all[argDg + "__ctl" + (i + 1) + "_dgtxToSectNo"].value = strToSectNo;
            document.all[argDg + "__ctl" + (i + 1) + "_dgtxToSectName"].value = strToSectName;
            document.all[argDg + "__ctl" + (i + 1) + "_dgtxToUserName"].value = strToUserName;
            document.all[argDg + "__ctl" + (i + 1) + "_dgtxToEmpName"].value = strToEmpName;

            //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 新增支援電子來文已儲存
            //if(strType == "1")
            //1090618 Kevin 1090271 訴願會預設訴願公文性質
            //if (strType == "1" || strType == "ES")
            if (strType == "1" || strType == "ES"
                || (strType == "2" && document.all.H_txUserOrgNick.value == "MOI" && strToDeptNo != "" && strToDeptNo == document.all.H_txWishDeptNo.value))
            {
                var strRcvDate = document.all.txSysRcvDate.value;

                document.all[argDg + "__ctl" + (i + 1) + "_dgtxRcvDate"].value = strRcvDate;
                document.all[argDg + "__ctl" + (i + 1) + "_dgtxRcvTime"].value = document.all.txSysRcvMin.value;
                document.all[argDg + "__ctl" + (i + 1) + "_dglbPtyName"].textContent = strPtyName;
                document.all[argDg + "__ctl" + (i + 1) + "_dgtxDocProperty"].value = strDocProperty;
                document.all[argDg + "__ctl" + (i + 1) + "_dglbBTypeName"].textContent = strBTypeName;
                document.all[argDg + "__ctl" + (i + 1) + "_dgtxBTypeNo"].value = strBTypeNo;

                document.all[argDg + "__ctl" + (i + 1) + "_dglbDocSourceName"].textContent = strDocSourceName;
                document.all[argDg + "__ctl" + (i + 1) + "_dgtxDocSource"].value = strDocSource;
                document.all[argDg + "__ctl" + (i + 1) + "_dglbCaseNo"].textContent = strCaseNo;
                document.all[argDg + "__ctl" + (i + 1) + "_dgtxCaseNo"].value = strCaseNo;

                if (strRcvDesc != "")
                    document.all[argDg + "__ctl" + (i + 1) + "_dgtxRcvDesc"].value = strRcvDesc;

                //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯
                SetDgToolTip(argDg, i);

                //電子交換依系統計算的收文日期處理
                //1070830 Justin [1070678]弱掃AJAX修改
                //var SumTypInfo = EDT131.GetSumType("1", document.all.h_OrgNo.value, strDocProperty, "1", strBTypeNo, strRcvDate).value;
                //var SumTypInfo = ED1.EDT131.GetSumType("1", document.all.h_OrgNo.value, strDocProperty, "1", strBTypeNo, strRcvDate).value;
                //1081227 Kevin 1080825 修正未依照速別計算問題
                var SumTypInfo = ED1.EDT131.GetSumType("1", document.all.h_OrgNo.value, strDocProperty, document.all[argDg + "__ctl" + (i + 1) + "_dgtxSpdNo"].value, strBTypeNo, strRcvDate).value;
                if (SumTypInfo)
                {
                    if (SumTypInfo.bSuccess)
                    {
                        document.all[argDg + "__ctl" + (i + 1) + "_dgtxSumType"].value = SumTypInfo.SumType;
                        document.all[argDg + "__ctl" + (i + 1) + "_dgtxStartDate"].value = SumTypInfo.StartDateCalcBySys;

                        //1090903 Kevin 1090624 傳送時不異動批次傳送未處理欄位
                        if (SumTypInfo.StartDate == "2")
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxStartTime"].value = document.all.txSysRcvMin.value.substring(0, 2);
                        else
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxStartTime"].value = document.all.H_OD_OFC_HOUR_S.value;

                        //LtUom//處理期限單位
                        //LtBy//處理期限決定方式I=使用者輸入;S=依速別判斷;B=依處理期限天數設定;M=依處理期限天數及開會日期設定
                        //LtIncHd//處理期限是否含假日 Y/N
                        //StartRule//起算日期的處理原則
                        //StartDate//系統計算之起算日期原則
                        //StartDateCalcBySys//系統計算之起算日期
                        //LeadTimeDB//本筆資料的處理期限(DB裡的設定值)
                        //DueDate//限辦日期 (系統自動計算)
                        //DueRule//業務類別之限辦日期計算邏輯是否需順延至工作日*/
                        if (SumTypInfo.LtBy == "I")
                        {
                            document.all[argDg + "__ctl" + (i + 1) + "_dglbMeetDate"].textContent = "";
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxMeetDate"].value = "";

                            //限辦日期不可小於起算日期
                            if (strSetDueDate < SumTypInfo.StartDateCalcBySys)
                            {
                                ErrMsg += "文號[" + strDocNo + "]之限辦日期不可小於起算日期[" + SumTypInfo.StartDateCalcBySys + "]\n";
                                continue;
                            }

                            var param = new Array(3);
                            param[0] = encodeURI(SumTypInfo.StartDateCalcBySys);
                            param[1] = encodeURI(strSetDueDate);

                            if (SumTypInfo.LtIncHd == "Y") //含假日
                                param[2] = "1";
                            else if (SumTypInfo.LtIncHd == "H") //連續假日(連休3日Mode)
                                param[2] = "3";
                            else //不含假日
                                param[2] = "2";

                            //1090708 Zen 1090482 弱掃WebInspect修正
                            callObj = jf_CallWS(document.all.WS_LOCATION.value + "Lib/TIME_LIB.asmx", "GetWorkDays", false, param);
                            if (jf_IsWebServiceSuccess(callObj))
                            {
                                if (callObj.value.RtnStr == "0")
                                {
                                    ErrMsg += "文號[" + strDocNo + "]計算辦理天數錯誤";
                                    continue;
                                }

                                document.all[argDg + "__ctl" + (i + 1) + "_dglbLeadTimeUom"].textContent = callObj.value.RtnStr + "天";
                                document.all[argDg + "__ctl" + (i + 1) + "_dgtxLeadTime"].value = callObj.value.RtnStr;
                                document.all[argDg + "__ctl" + (i + 1) + "_dgtxLtUom"].value = "天";
                                document.all[argDg + "__ctl" + (i + 1) + "_dglbDueDate"].textContent = strSetDueDate.substr(0, 3) + "/" + strSetDueDate.substr(3, 2) + "/" + strSetDueDate.substr(5, 2);
                                document.all[argDg + "__ctl" + (i + 1) + "_dgtxDueDate"].value = strSetDueDate;
                            }

                        }
                        else if (SumTypInfo.LtBy == "B")//依處理期限天數設定
                        {
                            document.all[argDg + "__ctl" + (i + 1) + "_dglbLeadTimeUom"].textContent = SumTypInfo.LeadTimeDB + SumTypInfo.LtUom;
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxLeadTime"].value = SumTypInfo.LeadTimeDB;
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxLtUom"].value = SumTypInfo.LtUom;
                            document.all[argDg + "__ctl" + (i + 1) + "_dglbMeetDate"].textContent = "";
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxMeetDate"].value = "";

                            var param = new Array(5);
                            param[0] = encodeURI(SumTypInfo.StartDateCalcBySys);
                            param[1] = encodeURI(SumTypInfo.LeadTimeDB);
                            param[2] = encodeURI(SumTypInfo.LtBy);
                            if (SumTypInfo.LtIncHd == "Y") //含假日
                                param[3] = "1";
                            else if (SumTypInfo.LtIncHd == "H")//連續假日(連休3日Mode)
                                param[3] = "3";
                            else //不含假日
                                param[3] = "2";
                            param[4] = encodeURI(SumTypInfo.LtUom);

                            //1090708 Zen 1090482 弱掃WebInspect修正
                            callObj = jf_CallWS(document.all.WS_LOCATION.value + "Lib/TIME_LIB.asmx", "GetWorkDate", false, param);
                            if (jf_IsWebServiceSuccess(callObj))
                            {
                                if (callObj.value.IsErr)
                                {
                                    ErrMsg += "文號[" + strDocNo + "]計算限辦日期異常\n";
                                    continue;
                                }

                                var strDueDate = callObj.value.WorkDate;

                                var paramFullLeadTime = new Array(5);
                                paramFullLeadTime[0] = strDueDate;
                                paramFullLeadTime[1] = "1";
                                paramFullLeadTime[2] = "I";
                                paramFullLeadTime[3] = param[3];
                                paramFullLeadTime[4] = "天";

                                //計算補充天數
                                //1090708 Zen 1090482 弱掃WebInspect修正
                                callObj = jf_CallWS(document.all.WS_LOCATION.value + "Lib/TIME_LIB.asmx", "GetWorkDate", false, paramFullLeadTime);
                                if (!callObj.error)
                                    strDueDate = callObj.value.WorkDate;
                                else
                                {
                                    ErrMsg += "文號[" + strDocNo + "]計算限辦日期異常\n";
                                    continue;
                                }

                                //如業務類別限辦日期計算邏輯需順延至工作日，呼叫GetUnHoliday()取得限辦日期
                                if (SumTypInfo.DueRule == "Y")
                                {
                                    var paramGetUnHoliday = new Array(3);
                                    paramGetUnHoliday[0] = strDueDate;
                                    paramGetUnHoliday[1] = 0;
                                    paramGetUnHoliday[2] = "1";
                                    //1090708 Zen 1090482 弱掃WebInspect修正
                                    callObj = jf_CallWS(document.all.WS_LOCATION.value + "Lib/OD_LIB.asmx", "GetUnHoliday", false, paramGetUnHoliday);
                                    if (!callObj.error)
                                    {
                                        strDueDate = callObj.value.RtnWorkDate;
                                    }
                                    else
                                    {
                                        ErrMsg += "文號[" + strDocNo + "]計算限辦日期異常\n";
                                        continue;
                                    }
                                }
                                if (strDueDate != "" && strDueDate.length == 7)
                                {
                                    document.all[argDg + "__ctl" + (i + 1) + "_dglbDueDate"].textContent = strDueDate.substr(0, 3) + "/" + strDueDate.substr(3, 2) + "/" + strDueDate.substr(5, 2);
                                    document.all[argDg + "__ctl" + (i + 1) + "_dgtxDueDate"].value = strDueDate;
                                }
                                else
                                {
                                    ErrMsg += "文號[" + strDocNo + "]無法計算限辦日期\n";
                                    continue;
                                }
                            }
                        }
                        else if (SumTypInfo.LtBy == "M")
                        {
                            document.all[argDg + "__ctl" + (i + 1) + "_dglbLeadTimeUom"].textContent = SumTypInfo.LeadTimeDB + SumTypInfo.LtUom;
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxLeadTime"].value = SumTypInfo.LeadTimeDB;
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxLtUom"].value = SumTypInfo.LtUom;
                            document.all[argDg + "__ctl" + (i + 1) + "_dglbMeetDate"].textContent = strSetMeetDate.substr(0, 3) + "/" + strSetMeetDate.substr(3, 2) + "/" + strSetMeetDate.substr(5, 2);
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxMeetDate"].value = strSetMeetDate;

                            var param = new Array(5);
                            param[0] = encodeURI(strSetMeetDate);
                            param[1] = encodeURI(SumTypInfo.LeadTimeDB);
                            param[2] = encodeURI(SumTypInfo.LtBy);
                            if (SumTypInfo.LtIncHd == "Y") //含假日
                                param[3] = "1";
                            else if (SumTypInfo.LtIncHd == "H")//連續假日(連休3日Mode)
                                param[3] = "3";
                            else //不含假日
                                param[3] = "2";
                            param[4] = encodeURI(SumTypInfo.LtUom);

                            //1090708 Zen 1090482 弱掃WebInspect修正
                            callObj = jf_CallWS(document.all.WS_LOCATION.value + "Lib/TIME_LIB.asmx", "GetWorkDate", false, param);
                            if (jf_IsWebServiceSuccess(callObj))
                            {
                                if (callObj.value.IsErr)
                                {
                                    ErrMsg += "文號[" + strDocNo + "]計算限辦日期異常\n";
                                    continue;
                                }

                                var strDueDate = callObj.value.WorkDate;

                                var paramFullLeadTime = new Array(5);
                                paramFullLeadTime[0] = strDueDate;
                                paramFullLeadTime[1] = "1";
                                paramFullLeadTime[2] = "I";
                                paramFullLeadTime[3] = param[3];
                                paramFullLeadTime[4] = "天";

                                //計算補充天數
                                //1090708 Zen 1090482 弱掃WebInspect修正
                                callObj = jf_CallWS(document.all.WS_LOCATION.value + "Lib/TIME_LIB.asmx", "GetWorkDate", false, paramFullLeadTime);
                                if (!callObj.error)
                                    strDueDate = callObj.value.WorkDate;
                                else
                                {
                                    ErrMsg += "文號[" + strDocNo + "]計算限辦日期異常\n";
                                    continue;
                                }

                                //如業務類別限辦日期計算邏輯需順延至工作日，呼叫GetUnHoliday()取得限辦日期
                                if (SumTypInfo.DueRule == "Y")
                                {
                                    var paramGetUnHoliday = new Array(3);
                                    paramGetUnHoliday[0] = strDueDate;
                                    paramGetUnHoliday[1] = 0;
                                    paramGetUnHoliday[2] = "1";
                                    //1090708 Zen 1090482 弱掃WebInspect修正
                                    callObj = jf_CallWS(document.all.WS_LOCATION.value + "Lib/OD_LIB.asmx", "GetUnHoliday", false, paramGetUnHoliday);
                                    if (!callObj.error)
                                    {
                                        strDueDate = callObj.value.RtnWorkDate;
                                    }
                                    else
                                    {
                                        ErrMsg += "文號[" + strDocNo + "]計算限辦日期異常\n";
                                        continue;
                                    }
                                }
                                if (strDueDate != "" && strDueDate.length == 7)
                                {
                                    document.all[argDg + "__ctl" + (i + 1) + "_dglbDueDate"].textContent = strDueDate.substr(0, 3) + "/" + strDueDate.substr(3, 2) + "/" + strDueDate.substr(5, 2);
                                    document.all[argDg + "__ctl" + (i + 1) + "_dgtxDueDate"].value = strDueDate;
                                }
                                else
                                {
                                    ErrMsg += "文號[" + strDocNo + "]無法計算限辦日期\n";
                                    continue;
                                }
                            }
                        }
                        else
                        {
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxLeadTime"].value = SumTypInfo.LeadTimeDB;
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxLtUom"].value = SumTypInfo.LtUom;
                            document.all[argDg + "__ctl" + (i + 1) + "_dglbLeadTimeUom"].textContent = SumTypInfo.LeadTimeDB + SumTypInfo.LtUom;

                            document.all[argDg + "__ctl" + (i + 1) + "_dglbMeetDate"].textContent = "";
                            document.all[argDg + "__ctl" + (i + 1) + "_dgtxMeetDate"].value = "";

                            if (SumTypInfo.DueDate != "" && SumTypInfo.DueDate.length == 7)
                            {
                                document.all[argDg + "__ctl" + (i + 1) + "_dglbDueDate"].textContent = SumTypInfo.DueDate.substr(0, 3) + "/" + SumTypInfo.DueDate.substr(3, 2) + "/" + SumTypInfo.DueDate.substr(5, 2);
                                document.all[argDg + "__ctl" + (i + 1) + "_dgtxDueDate"].value = SumTypInfo.DueDate;
                            }
                            else
                            {
                                ErrMsg += "文號[" + strDocNo + "]無法計算限辦日期\n";
                                continue;
                            }
                        }
                    }
                    else
                    {
                        ErrMsg += "文號[" + strDocNo + "]計算限辦日期發生錯誤：" + SumTypInfo.ErrMsg + "\n";
                        continue;
                    }
                }
            }
            else if (strType == "2")
            {
                //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯
                SetDgToolTip(argDg, i);

                if (strRcvDesc != "")
                    document.all[argDg + "__ctl" + (i + 1) + "_dgtxRcvDesc"].value = strRcvDesc;
            }
            else if (strType == "3")
            {
                //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 銷號沒有異動別
                if (document.all.rbSendType3.checked)
                    document.all[argDg + "__ctl" + (i + 1) + "_dglbTranType"].style = "display:none";
                else
                    document.all[argDg + "__ctl" + (i + 1) + "_dglbTranType"].style = "";

                //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯
                SetDgToolTip(argDg, i);

                //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 移除改分原因設定欄位，由DG自行設定
                //if(strSendType == "2" && strTxReason != "")
                //	document.all[argDg + "__ctl" + (i + 1) + "_dgtxReason"].value = strTxReason;
                //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 改分資料夾銷號若無帶出原因則補上預設值
                if (document.all.rbSendType3.checked && document.all[argDg + "__ctl" + (i + 1) + "_dgtxReason"].value == "")
                    document.all[argDg + "__ctl" + (i + 1) + "_dgtxReason"].value = document.all.dlCancel.options[document.all.dlCancel.selectedIndex].text;
            }

            document.all[argDg + "__ctl" + (i + 1) + "_cbCheckSet"].checked = false;
            document.all[argDg + "__ctl" + (i + 1) + "_cbCheckSend"].checked = true;
        }
    }

    if (ErrMsg != "")
    {
        ErrMsg += "無法執行設定功能";
        alert(ErrMsg);
        return false;
    }
}

//1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯
function SetDgToolTip(argDg, i)
{
    var strDgFlds = ["dglbPtyName", "dglbBTypeName", "dglbDocSourceName", "dglbCaseNo", "dglbTarget"];
    var iDgFlfsLen = [5, 5, 4, 4, 10];

    if (argDg == "dg2")
    {
        strDgFlds = ["dglbTarget"];
        iDgFlfsLen = [7];
    }

    for (var jFld = 0; jFld < strDgFlds.length; jFld++)
    {
        var dgControl = document.all[argDg + "__ctl" + (i + 1) + "_" + strDgFlds[jFld]];

        if (iDgFlfsLen[jFld] != 0 && iDgFlfsLen[jFld] < dgControl.textContent.length)
        {
            dgControl.title = dgControl.textContent;
            dgControl.textContent = dgControl.textContent.substring(0, iDgFlfsLen[jFld] - 1) + "…";
        }
    }
}

function CheckOrgNo()
{
    var bRtn = true;
    var strOrgno = jf_Trim(document.all["txFromOrgNo"].value);
    if (strOrgno != "")
    {
        var arWSParam = new Array(4);
        arWSParam[0] = strOrgno;
        arWSParam[1] = document.all["h_OrgNo"].value;
        arWSParam[2] = document.all["h_DeptNo"].value;
        arWSParam[3] = document.all["h_UserId"].value;
        var CallWsObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetOrgInfo", false, arWSParam);

        //檢查執行是否成功
        if (jf_IsWebServiceSuccess(CallWsObj))
        {
            if (CallWsObj.value.Count == 1)
            {
                document.all["txFromOrgNo"].value = jf_Trim(CallWsObj.value.OrgID[0]);
                document.all["txFromOrgName"].value = jf_Trim(CallWsObj.value.OrgName[0]);
            }
            else if (CallWsObj.value.Count > 1)
            {
                var strUrl = "";
                strUrl = "../../../WEDEP/WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.h_OrgNo.value + "&K1=WEM010";
                jf_OpenChildWin(strUrl, "WEM010C1", 800, 600);
            }
            else //1090903 Kevin 1090624 來文者查詢欄位調整
            {
                document.all["txFromOrgName"].value = document.all["txFromOrgNo"].value;
            }
        }
    }
    else
    {
        //1081105 Kevin 1080825 修正Bug
        //document.all["txOrgName"].value = "";
        document.all["txFromOrgNo"].value = "";
        //1090903 Kevin 1090624 來文者查詢欄位調整
        document.all["txFromOrgName"].value = "";
    }

    return bRtn;
}

function txCaseNo_onblur()
{
    if (document.all.txCaseNo.value == "")
    {
        return;
    }

    //檢查案件編號是否存在
    if (document.all.h_PtyCaseNoCheck != null)
    {
        if (document.all.h_PtyCaseNoCheck.value == "N")
            return;
    }

    var wsParam = new Array(3);
    wsParam[0] = "DOC_CASE";
    var FieldName = new Array(2);
    FieldName[0] = "SOURCE_ORGNO";
    FieldName[1] = "CASE_NO";
    wsParam[1] = FieldName;
    var FieldValue = new Array(2);
    FieldValue[0] = document.all.h_OrgNo.value;
    FieldValue[1] = document.all.txCaseNo.value;
    wsParam[2] = FieldValue;
    //1100204	Joe		1090482		弱掃修正WebInspect
    // var CallObj = jf_CallWS("../../../STD/LIB/SYS.asmx","CheckDataKeyDuplicate",false,wsParam);
    var CallObj = jf_CallWS("/STDN/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, wsParam);
    if (jf_IsWebServiceSuccess(CallObj))
    {
        if (!CallObj.value.RtnBool)
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入之案件編號不存在"])), "");
            return;
        }
    }
}

function dlProperty_onchange()
{
    var ddlValue = encodeURI(document.all.dlProperty.options[document.all.dlProperty.selectedIndex].value);
    //VALUE:公文性質代碼,是否開放輸入限辦期限,是否開放選擇速別,是否以案管制
    var ddlValueArray = ddlValue.split(",");

    //ddlDocSource_onchange();

    //是否開放輸入案件編號
    if (ddlValueArray[3] == "1")
    {
        SetControlEnable("txCaseNo");
        SetControlEnable("btCaseNoPrompt");
        //document.all.txCaseNo.value = gCaseNoBeforeChange;
    }
    else
    {
        if (document.all.txCaseNo.value != "")
        {
            //gCaseNoBeforeChange = document.all.txCaseNo.value;
            document.all.txCaseNo.value = "";
        }
        SetControlDisable("txCaseNo");
        SetControlDisable("btCaseNoPrompt");
        //ddlSpeed_onchange();
    }

    //切換公文性質為「一般公文限期辦畢」時，速別自動調整到「4：」
    /*if(ddlValueArray[0] == "2")
    {
        SetDDLByTextArray("ddlSpeed", "", 1, ".");
        ddlSpeed_onchange();
    }*/

    //Call Web Service 取得業務類別...
    GetBTypeNo();
    //1081227 Kevin 1080825 調整業務類別與限辦日期之連動
    dlBTypeNo_onchange();
}

//由公文性質取得業務類別
var iCallID_GetBTypeNo = null;
function GetBTypeNo()
{
    if (document.all.dlProperty.selectedIndex == -1) return;
    var ddlValue = encodeURI(document.all.dlProperty.options[document.all.dlProperty.selectedIndex].value);
    //VALUE:公文性質代碼,是否開放輸入限辦期限,是否開放選擇速別,是否以案管制
    var ddlValueArray = ddlValue.split(",");
    //是否開放輸入限辦期限
    strDocProperty = ddlValueArray[0];

    var param = new Array(5);
    //1070816 Justin [1070678] 弱掃Client Potential Code Injection修正
    //param[0] = document.all.h_OrgNo.value; //機關代碼
    param[0] = encodeURI(document.all.h_OrgNo.value);
    param[1] = encodeURI(document.all.H_txGetBType.value);
    param[2] = "Y";
    if (document.all.h_PtyChangeWithBns.value == "N")
        param[3] = strDocProperty;
    else
        param[3] = "";
    param[4] = encodeURI(document.all.H_GetBTypeNoByOuRule.value);

    //1070823 Joe 1070678 弱掃修正Client Potential Code Injection
    // callObj = jf_CallWS(document.all.WS_LOCATION.value + "lib/TIME_LIB.asmx","GetBTypeNoByDeptNoAndSysBTypeNo" ,false, param);
    //1090708 Zen 1090482 弱掃WebInspect修正
    callObj = jf_CallWS(encodeURI(document.all.WS_LOCATION.value) + "Lib/TIME_LIB.asmx", "GetBTypeNoByDeptNoAndSysBTypeNo", false, param);
    iCallID_GetBTypeNo = callObj.id;
    OnWSResult(callObj);
}

function SetControlEnable(argControlName)
{
    if (document.all[argControlName].type == "text")
    {
        document.all[argControlName].style.backgroundColor = "";
        document.all[argControlName].readOnly = false;
    }
    else
    {
        document.all[argControlName].disabled = false;
    }
}

function SetControlDisable(argControlName)
{
    if (document.all[argControlName].type == "text")
    {
        document.all[argControlName].style.backgroundColor = "LightGrey";
        document.all[argControlName].readOnly = true;
    }
    else
    {
        document.all[argControlName].disabled = true;
    }
}

//清空選單
function fnClearDropDownList(obj)
{
    while (obj.options.length > 0)
        obj.options.remove(0);
}

function fnHideDropDownList(obj)
{
    if (obj.options.length == 0)
        obj.className = "hide";
    else
        obj.className = "";
}

//設定顯示欄位
function SetUI()
{
    //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯
    //if(document.all.rbType1.checked)
    if (document.all.rbType1.checked || document.all.rbTypeES.checked)
    {
        //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 移除改分原因設定欄位，由DG自行設定
        //document.all.lbReason.className = "hide";
        //document.all.txReason.className = "hide";
        document.all.divDocInfo.className = "";
        document.all.dlSect.className = "";
        document.all.lbUser.className = "";
        document.all.dlUser.className = "";
    }
    else if (document.all.rbType2.checked)
    {
        //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 移除改分原因設定欄位，由DG自行設定
        //document.all.lbReason.className = "hide";
        //document.all.txReason.className = "hide";
        document.all.divDocInfo.className = "hide";
        document.all.dlSect.className = "";
        document.all.lbUser.className = "";
        document.all.dlUser.className = "";
    }
    else if (document.all.rbType3.checked)
    {
        //1081105 Kevin 1080825 調整改分(移文)公文紀錄邏輯 移除改分原因設定欄位，由DG自行設定
        //document.all.lbReason.className = "";
        //document.all.txReason.className = "";
        document.all.divDocInfo.className = "hide";
        document.all.dlSect.className = "hide";
        document.all.lbUser.className = "hide";
        document.all.dlUser.className = "hide";
    }
}

function OpenElec(targetDg, i)
{
    var RcvType = document.all[targetDg + "__ctl" + i + "_dgtxRcvType"].value;
    var SysId = document.all[targetDg + "__ctl" + i + "_dgtxSysId"].value;
    //檢查是否有選取電子來文
    if (SysId == "")
    {
        alert("非電子來文");
        return;
    }
    else
    {
        if (document.all.ED_PATH && document.all.ED_PATH.value != "")
        {
            var strUrl = document.all.ED_PATH.value + "/ED0/EDI011.aspx?SAMLart=" + jf_GetArtifact() + "&kv1=" + SysId + "&kv2=od";
            jf_OpenChildWin(strUrl, "EDI011", 760, 520);
        }
        else
            alert("環境變數WS_ED_SITE設定不正確，無法開啟");
    }
}

//1130626 Kevin 1130291 支援AI預設承辦單位
var iOpenSimilarDocIndex;

function OpenSimilarDoc(targetDg, iDgIndex)
{
	var Docid = document.all[targetDg + "__ctl" + iDgIndex + "_dgtxDocumentId"].value;
	//檢查是否有選取電子來文
	if (Docid == "")
	{
		alert("非電子來文");
		return;
	}
	else
	{
		u_DocId = Docid;
		iOpenSimilarDocIndex = iDgIndex;
		var strUrl = "/ODDEP/ODT130C3.aspx?DocId=" + Docid;
		jf_ShowModal(strUrl);
	}
}

//1130626 Kevin 1130291 提供參照窗格使用
let u_DocId = '';

function GetDocCompareId()
{
	let rtnObject = { 'OrgNo': document.all.h_OrgNo.value, 'DocId': u_DocId, 'defaultDocNo': sessionStorage.UserSelectDocNo };
	
	sessionStorage.clear();
			
	return rtnObject;
}

var bOpenODT130 = false;
function OpenODT130(event)
{
    if (bOpenODT130)
    {
        alert("已開啟其他公文ODT130視窗，請關閉後再執行開啟");
        return;
    }
    var xObjectName = event.id;
    var strDocNo = document.all[xObjectName].textContent;

    var strODT130Url = document.all.WS_LOCATION.value + "ODT130.aspx?SAMLart=" + jf_GetArtifact() + "&DocNo=" + strDocNo;
    oWinODIT130 = jf_OpenChildWin(strODT130Url, "ODT130");
    bOpenODT130 = true;
    oTimerWaitODT130Close = setInterval("fnWaitODT130210Close()", 100);
}

var oTimerWaitODT130Close = null;
var oWinODIT130 = null;
function fnWaitODT130210Close()
{
    if (oWinODIT130 == null) return;
    try
    {
        if (oWinODIT130.closed)
        {
            bOpenODT130 = false;
            clearInterval(oTimerWaitODT130Close);
            reSearch();
        }
    }
    catch (e)
    { }
}

function GetSearchType()
{
    gCheckSearchType = "1";
    if (document.all.rbType2.checked)
        gCheckSearchType = "2";
    else if (document.all.rbType3.checked)
        gCheckSearchType = "3";
    //1081105 Kevin 1080825 新增支援電子來文已儲存
    else if (document.all.rbTypeES.checked)
        gCheckSearchType = "ES";
}

//1120705 Zen 1111154 支援檢核重複來文
//1120720
function CheckRepeat(argDg)
{
    var ErrMsg = '';
    var len = document.all[argDg].rows.length;
    for (var iRow = 2; iRow < len + 1; iRow++)
    {
        let param = new Array();
        let vFromOrgName1 = '';
        let vFromOrgName2 = '';
        let vFromOrgName3 = '';

        let strOD_ODT130_CHECK_DELIVORG = document.all['H_txOD_ODT130_CHECK_DELIVORG'].value;

        if (strOD_ODT130_CHECK_DELIVORG == "N")
        {
            vFromOrgName1 = "NONE";
            vFromOrgName2 = "NONE";
            vFromOrgName3 = "NONE";
        }
        else
            vFromOrgName1 = encodeURI(document.all['dg1__ctl' + iRow + '_dglbOriFromOrgName'].textContent);

        param[0] = vFromOrgName1 + "," + encodeURI(document.all['dg1__ctl' + iRow + '_dgtxFromWord'].value) + "," + encodeURI(document.all['dg1__ctl' + iRow + '_dgtxFromNo'].value) + ","
            + vFromOrgName2 + ",,,"
            + vFromOrgName3 + ",,";

        if (strOD_ODT130_CHECK_DELIVORG == "C")
            param[0] += "," + encodeURI(document.all['dg1__ctl' + iRow + '_dgtxFromDate'].textContent);

        //1120705 Zen 1111154 支援檢核重複來文，因目前EDT131僅可送出總收之公文，未免檢核異常當前單位代碼一律寫為總收
        //param[1] = encodeURI(document.all['h_DeptNo'].value);
        param[1] = encodeURI('91');
        param[2] = encodeURI(document.all['dg1__ctl' + iRow + '_dglbOriRcvOrgNo'].textContent);
        param[3] = encodeURI(document.all['dg1__ctl' + iRow + '_dglbOriRcvOrg'].textContent);

        callObj = jf_CallWS(document.all.WS_LOCATION.value + "LIB/OD_LIB.asmx", "ChkDuplicateDoc", false, param);
        if (callObj.error)
        {
            if (callObj.responseJSON)
                ErrMsg += `$檢核重複來文失敗:${callObj.responseJSON.Message}`
            else
                ErrMsg += `$檢核重複來文失敗。`

        }
        else if (callObj.value.Repet)
        {
            document.all['dg1__ctl' + iRow + '_hlDocNo'].style.color = "red";
            var strMsg = `與${callObj.value.DocNo}來文資訊重複，承辦資訊:${callObj.value.OuName} ${callObj.value.EmpName}`;
            document.all['dg1__ctl' + iRow + '_hlDocNo'].title = strMsg;
            document.all['dg1__ctl' + iRow + '_dglbRepeatDocNo'].textContent = ` ${strMsg}`;
        }
    }

    if (ErrMsg != "")
    {
        alert(ErrMsg);
        return false;
    }
    return true;
}

//1120705 Zen 1111154 支援檢核重複來文
function ConfirmRepeat()
{
    let strComfirmMsg = '';

    for (let iRow = 2; iRow < document.all['dg1'].rows.length + 1; iRow++)
    {
        let strDocNo = document.all['dg1__ctl' + iRow + '_hlDocNo'].textContent;
        let strRepeatDocNo = document.all['dg1__ctl' + iRow + '_dglbRepeatDocNo'].textContent;

        if (document.all['dg1__ctl' + iRow + '_cbCheckSend'].checked && strRepeatDocNo != "")
        {
            if (document.all['dg1__ctl' + iRow + '_dgtxSendType'].value == "1")
                strComfirmMsg += strDocNo + strRepeatDocNo + '\n';
        }
    }

    let bSendRepeat = true;
    if (strComfirmMsg != '')
    {
        strComfirmMsg = strComfirmMsg + '等來文資訊已與既有公文重複，是否仍將已重複公文送出。';

        bSendRepeat = confirm(strComfirmMsg);
    }

    if (!bSendRepeat)
    {
        for (let iRow = 2; iRow < document.all['dg1'].rows.length + 1; iRow++)
        {
            let strRepeatDocNo = document.all['dg1__ctl' + iRow + '_dglbRepeatDocNo'].textContent;

            if (document.all['dg1__ctl' + iRow + '_cbCheckSend'].checked && strRepeatDocNo != "")
            {
                document.all['dg1__ctl' + iRow + '_cbCheckSend'].checked = false;
            }
        }
        return CheckSubmitDg('dg1', false);
    }
    return true;
}

//1130626 Kevin 1130291 支援AI預設承辦單位
function CallBack(argCallerId)
{
	if ((argCallerId == "ODT130C3" || argCallerId == "RD-DocCompare") && sessionStorage.UserSelectType)
	{
		if (sessionStorage.UserSelectType == '0')
		{
			DlgClose();

			var strUrl = `/MS/RD-DocCompare.html`;
			jf_ShowModal(strUrl);
			Page_BlockSubmit = true;
		}
		else
		{
			let deptNo = sessionStorage.UserSelectDeptNo;
			let deptName = sessionStorage.UserSelectDeptName;
			SetInfrdeptno(iOpenSimilarDocIndex, deptNo, deptName);
		}
	}

	//清空lbReturnValue物件
	if (document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;

}

//1130626 Kevin 1130291 支援AI預設承辦單位
let sConfGreenLightColor = 'rgb(157 255 157)';
let sConfGreenColor = 'rgb(129 200 102)';
let sConfYellowLightColor = 'rgb(250 236 135)';
let sConfYellowColor = 'rgb(241 189 0)';
let sConfRedLightColor = 'rgb(245 204 204)';
let sConfRedColor = 'rgb(248 61 80)';

//1130626 Kevin 1130291 支援AI預設承辦單位
function InitConfColor()
{
	if (!document.all.dg1)
		return;
	
	var len = document.all['dg1'].rows.length;
	for (var i = 1; i < len; i++)
	{
		var strdglbConfLight = document.all[ "dg1__ctl" + (i + 1) + "_dglbConfLight"].textContent;

		SetConfColor("dg1__ctl" + (i + 1) + "_dgbtSimilarDoc", strdglbConfLight);
	}
}

//1130626 Kevin 1130291 支援AI預設承辦單位
function SetConfColor(argControlId, argConfLight)
{
	let setColor = sConfGreenColor;
	let setLightColor = sConfGreenLightColor;

	if (argConfLight == "")
	{
		$(`#${argControlId}`).addClass('hide');
		return;
	}
	$(`#${argControlId}`).removeClass('hide');

	if (argConfLight == "G")
	{
		setColor = sConfGreenColor;
		setLightColor = sConfGreenLightColor;
	}
	if (argConfLight == "Y")
	{
		setColor = sConfYellowColor;
		setLightColor = sConfYellowLightColor;
	}
	if (argConfLight == "R")
	{
		setColor = sConfRedColor;
		setLightColor = sConfRedLightColor;
	}

	$(`#${argControlId}`).css({
		"background-image": `linear-gradient(to bottom, ${setLightColor}, ${setColor})`, "color": "rgb(0, 0, 128)"
	});
}

//1130626 Kevin 1130291 支援AI預設承辦單位
function InitInfrdeptno()
{
	if (!document.all.dg1)
		return;

	var len = document.all['dg1'].rows.length;
	for (var i = 1; i < len; i++)
	{
		var strdglbInfrdeptno= document.all["dg1__ctl" + (i + 1) + "_dglbInfrdeptno"].textContent;

		if (strdglbInfrdeptno != '')
		{
			document.all['dg1' + "__ctl" + (i + 1) + "_cbCheckSet"].checked = true;
			SetInfrdeptno((i + 1), strdglbInfrdeptno, '');
		}
	}
}

//1130626 Kevin 1130291 支援AI預設承辦單位
function SetInfrdeptno(indexDg, setDeptNo, setDeptName)
{
	var saveCheckedItems = [];

	var len = document.all['dg1'].rows.length;
	for (var i = 1; i < len; i++)
	{
		var forIndexDg = i + 1;
		var checkbox = document.all["dg1__ctl" + forIndexDg + "_cbCheckSet"];
		if (checkbox.checked)
		{
			saveCheckedItems.push(forIndexDg);
		}

		checkbox.checked = indexDg == forIndexDg;
	}

	if (setDeptNo.length == 2)
	{
		document.all.rbSendType1.checked = true;
		$('#dlDept').val(setDeptNo);
	}
	else
	{
		document.all.rbSendType2.checked = true;

		for (let i = 0; i < dlAssign.length; i++)
		{
			let ddOptions = dlAssign.options[i];

			let strAssignNo = ddOptions.value.split("|")[1];
			if (strAssignNo == setDeptNo)
			{
				dlAssign.selectedIndex = i;
				break;
			}
		}
	}

	setDg('dg1');

	for (var i = 0; i < saveCheckedItems.length; i++)
	{
		var saveIndex = saveCheckedItems[i];

		var checkbox = document.all["dg1__ctl" + saveIndex + "_cbCheckSet"];

		checkbox.checked = (indexDg != saveIndex);
	}
}