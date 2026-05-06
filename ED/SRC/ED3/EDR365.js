/*
Date		SA		PG		MGR		DESC
1120510	    David	Joe		1120216	新增程式
1120731     David	Joe		序131	版面調整
1121229     David	Zen		1120741 修正檢視內部受文機關電子來文明細異常之問題
1131016		Kevin   Jason   1130941 弱掃修正Client Potential XSS
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
    //1120731	Joe		序131		版面調整
    if (document.all.dg1)
    {
        document.all.dg1__ctl2_hldg1DocNo.click();
    }
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
    var xObjectName = e.target.id;

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

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    if (!jf_ConfireSearch())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !jf_ConfireSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_ConfireSearch()
{
    if (document.all["txDateS"].value == "" && document.all["txDateE"].value == "")
    {
        alert('發文日期不可為空。');
        return false;
    }

    if (!CheckDate("txDateS", "發文日期(起)"))
        return false
    if (!CheckDate("txDateE", "發文日期(迄)"))
        return false


    if (document.all.txDateS.value == "")
        document.all.txDateS.value = document.all.txDateE.value;
    else if (document.all.txDateE.value == "")
        document.all.txDateE.value = document.all.txDateS.value;
    else if (document.all.txDateS.value > document.all.txDateE.value)
    {
        var strTemp = document.all.txDateE.value;
        document.all.txDateE.value = document.all.txDateS.value;
        document.all.txDateS.value = strTemp;
    }

    if (document.all.txDocNoS.value == "")
        document.all.txDocNoS.value = document.all.txDocNoE.value;
    else if (document.all.txDocNoE.value == "")
        document.all.txDocNoE.value = document.all.txDocNoS.value;
    else if (document.all.txDocNoS.value > document.all.txDocNoE.value)
    {
        var strTemp = document.all.txDocNoE.value;
        document.all.txDocNoE.value = document.all.txDocNoS.value;
        document.all.txDocNoS.value = strTemp;
    }

    return true;
}

function CheckDate(argObj, strMsg)
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

function SetIssueOrg(argOrg, argDocNo)
{
    //1120731	Joe		序131		版面調整
    var IssueSearch = document.all.txIssueNo.value;
    //var IsserInfo = ED3.EDR365.GetIssuerInfo(argOrg, argDocNo).value;
    var IsserInfo = ED3.EDR365.GetIssuerInfo(argOrg, argDocNo, IssueSearch).value;
    if (IsserInfo.length > 0)
    {
        if (IsserInfo.ErrMsg != "")
        {
            alert(IsserInfo.ErrMsg);
            document.all.Label4.className = "hide";
            document.all.dg2.className = "hide";
        }
        else
        {
            $('#dg2head').remove();
            for (var i = document.all.dg2.rows.length; i > 1; i--)
            {
                document.all.dg2.children[0].removeChild(document.all.dg2.children[0].children[1]);
            }

            for (var idgCnt = 0; idgCnt < IsserInfo.length; idgCnt++)
            {
                var IssueNo = IsserInfo.IssueNo[idgCnt];
                var DocNo = IsserInfo.DocNo[idgCnt];
                var OrgName = IsserInfo.OrgName[idgCnt];
                var RcvDT = IsserInfo.RcvDT[idgCnt];
                var SYSID = IsserInfo.SYSID[idgCnt];
                //1121229 Zen 1120741 修正檢視內部受文機關電子來文明細異常之問題，額外取得受文機關代碼
                let OrgId = IsserInfo.OrgId[idgCnt];

                var row = document.createElement("TR");
                //序
                var Seq = document.createElement("TD");
                Seq.setAttribute("align", "middle");
                Seq.setAttribute("nowrap", "nowrap");
                Seq.className = "InputFieldLabel";
                Seq.textContent = idgCnt + 1;

                //發文號
                var colIssueNo = document.createElement("TD");
                colIssueNo.setAttribute("align", "left");
                colIssueNo.setAttribute("nowrap", "nowrap");
                //無SYSID不提供使用者開啟EDI011
                if (SYSID == "")
                {
                    colIssueNo.className = "InputFieldLabel";
                    colIssueNo.textContent = IssueNo;
                }
                else
                {
                    //1121229 Zen 1120741 修正檢視內部受文機關電子來文明細異常之問題，額外取得受文機關代碼
                    //var strUrl = "../ED0/EDI011.aspx?SOURCE_ORGNO=" + argOrg + "&SYSID=" + SYSID;
                    //1131016    Jason   1130941     弱掃修正Client Potential XSS--S
                    //var strUrl = "../ED0/EDI011.aspx?SOURCE_ORGNO=" + OrgId + "&SYSID=" + SYSID;
                    //colIssueNo.innerHTML = "<a href=\"javascript:window.open('" + strUrl + "')\">" + IssueNo + "</a>";
                    var strUrl = "../ED0/EDI011.aspx?SOURCE_ORGNO=" + HtmlEncode(OrgId) + "&SYSID=" + HtmlEncode(SYSID);
                    colIssueNo.innerHTML = "<a href=\"javascript:window.open('" + strUrl + "')\">" + HtmlEncode(IssueNo) + "</a>";
                    //1131016    Jason   1130941     弱掃修正Client Potential XSS--E
                }

                //收文號
                var colRcvNo = document.createElement("TD");
                colRcvNo.setAttribute("align", "left");
                colRcvNo.setAttribute("nowrap", "nowrap");
                colRcvNo.textContent = DocNo;

                //受文機關
                var colOrgName = document.createElement("TD");
                colOrgName.setAttribute("align", "left");
                colOrgName.setAttribute("nowrap", "nowrap");
                colOrgName.textContent = OrgName;

                //接收時間機關
                var colRcvDT = document.createElement("TD");
                colRcvDT.setAttribute("align", "left");
                colRcvDT.setAttribute("nowrap", "nowrap");
                colRcvDT.textContent = RcvDT;

                row.appendChild(Seq);
                row.appendChild(colIssueNo);
                row.appendChild(colRcvNo);
                row.appendChild(colOrgName);
                row.appendChild(colRcvDT);

                document.all.dg2.children[0].appendChild(row);
            }
            document.all.Label4.className = "";
            document.all.dg2.className = "";

            InitFixHead(document.all.dg2);
        }
    }
    else
    {
        alert('文號：' + argDocNo + "查無受文者資料。");
        document.all.Label4.className = "hide";
        document.all.dg2.className = "hide";
    }
}

//1120810   Joe     序146        參照ENI201自動查詢功能
function AutoSearch()
{
    if (document.all.cbDocAutoSearch.checked && document.all.txDocNoS.value != "")
    {
        Page_BlockSubmit = !jf_ConfireSearch();
        jf_ToolBarSubmit("btSearch");
    }
}
//1131016    Jason   1130941     弱掃修正Client Potential XSS
function HtmlEncode(s) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}