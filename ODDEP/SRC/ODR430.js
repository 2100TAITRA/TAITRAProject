/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期		    修改人	 單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2009.09.22	Jane	0980391	承辦單位下拉選單符合二層式架構
 * 2010.10.05	Johnny	0990412	新增其他類別報表可匯出excel
 * 2011.01.24	Linda	------	調整監察案件的匯出Excel按鈕
 * 2011.03.26	Linda	1000304 (CDC)新增一般公文匯出EXCEL
 * 2011.12.30	Kevin	0990412 (MERGE)
 * 2012.05.28	Ivory	1010449	(中央大學)修正二層登記桌登入，列印單位初始無值。
 * 2014.12.24   Kenny   1030424 增加一般公文(含已逾限率及未逾限率欄位)報表，匯出Excel後ToolBar按鍵不可設為disable
 * 1040909      Kevin   1040706 新增榮總公文處理分析統計表Excel
 * 1050526		JOE		1050087	二代系統升級
 * 1050803		Joe		1050087	修改子視窗大小
 * 1060221		Joe		1050779 新增鐵改客製化報表ODR430L19_RRB
 * 1060412		Joe		1051011 新增鐵改客製化報表ODR430L19_RRB2
 * 1060510		Joe		1060215 修改控制項傳值方式
 * 1060601		Joe		1051011	修正前單錯誤，新增判斷當機關代碼為鐵改局時才進行處理
 * 1060920		Joe		1060451	鐵工局新增判斷會辦時效統計最大年月
 * 1061027		Joe		1060451	修正前次錯誤
 * 1070112		Joe		1070056	績優人員統計表隱藏二級單位
 * 1070208		Joe		1070056	修正當機關非鐵改局時rbTypeRRB3會隱藏導致抓不到控制項的問題
 * 1071001		Kevin_C	1070678	因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
 * 1081213      Zen		1080783	新增匯出ODS格式
 * 1140305      Joe     1131298 新增直式及Word功能
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
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

//1050526	Joe	1050087	二代系統升級
// document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050526	Joe	1050087	二代系統升級
    // if (document.all["ValidationSummary1"].textContent != "")
    // alert(document.all["ValidationSummary1"].textContent);
    jf_ShowValidator();
}
//1050526	Joe	1050087	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1050526	Joe	1050087	二代系統升級
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
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

//1050526	Joe	1050087	二代系統升級，傳入參數event
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

    //1050526	Joe	1050087	二代系統升級
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btStatic":  //執行統計
            var xUrl = "ODP420.aspx?nMode=EXEC";
            //1050803	Joe		1050087		修正子視窗大小
            // jf_OpenChildWin(xUrl,"ODP420",760,500);
            jf_OpenChildWin(xUrl, "ODP420", 800, 600);
            Page_BlockSubmit = true;
            break;
        case "btPrint":
        case "btPreview":
            //1140305   Joe     1131298     新增直式及Word
        case "btWord":
            CheckSub();
            Page_BlockSubmit = !CheckBeforePrint();
            //1050526	Joe	1050087	二代系統升級
            //1060920	Joe		1060451		鐵工局新增判斷會辦時效統計最大年月--S
            if (document.all["H_OrgNickName"].value == "RRB" && (document.all.rbTypeRRB1.checked == true || document.all.rbTypeRRB3.checked == true) && document.all.ddlProperty.selectedIndex == 0)
            {
                //1061027	Joe		1060451		修正前次錯誤
                // if (ODR430.CheckYearMonth(document.all["H_SourceOrgno"].value, document.all["txSMon"].value, document.all["txEMon"].value) == true)
                //1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
                //if (ODR430.CheckYearMonth(document.all["H_SourceOrgno"].value, document.all["txSMon"].value, document.all["txEMon"].value).value == true)
                if (OD.ODR430.CheckYearMonth(document.all["H_SourceOrgno"].value, document.all["txSMon"].value, document.all["txEMon"].value).value == true)
                {
                    Page_BlockSubmit = false;
                    jf_ToolBarSubmit(xObjectName);
                }
                else
                {
                    alert("查詢區間無會辦資料，請先進行EDT444會辦時效統計");
                    Page_BlockSubmit = true;
                }
            }
                //1060920	Joe		1060451		鐵工局新增判斷會辦時效統計最大年月--E
            else
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            break;
        case "btExcel":
            //1081213 Zen 1080783 新增匯出ODS格式
        case "btODS":
            Page_BlockSubmit = !CheckBeforePrint();
            //1060920	Joe		1060451		鐵工局新增判斷會辦時效統計最大年月--S
            if (document.all["H_OrgNickName"].value == "RRB" && (document.all.rbTypeRRB1.checked == true || document.all.rbTypeRRB3.checked == true) && document.all.ddlProperty.selectedIndex == 0)
            {
                //1061027	Joe		1060451		修正前次錯誤
                // if (ODR430.CheckYearMonth(document.all["H_SourceOrgno"].value, document.all["txSMon"].value, document.all["txEMon"].value) == true)
                //1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
                //if (ODR430.CheckYearMonth(document.all["H_SourceOrgno"].value, document.all["txSMon"].value, document.all["txEMon"].value).value == true)
                if (OD.ODR430.CheckYearMonth(document.all["H_SourceOrgno"].value, document.all["txSMon"].value, document.all["txEMon"].value).value == true)
                {
                    if (jf_Trim(document.all["txSMon"].value) != jf_Trim(document.all["txEMon"].value))
                    {
                        alert("Excel格式為區間列印格式");
                        document.all.cbInterval.checked = true;
                        Page_BlockSubmit = false;
                    }
                    jf_ToolBarSubmit(xObjectName);
                }
                else
                {
                    alert("查詢區間無會辦資料，請先進行EDT444會辦時效統計");
                    Page_BlockSubmit = true;
                }
            }
            else
            {
                //1060920	Joe		1060451		鐵工局新增判斷會辦時效統計最大年月--E
                if (jf_Trim(document.all["txSMon"].value) != jf_Trim(document.all["txEMon"].value))
                {
                    alert("Excel格式為區間列印格式");
                    document.all.cbInterval.checked = true;
                    Page_BlockSubmit = false;
                }
                //1050526	Joe	1050087	二代系統升級
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btShowDiffList":
            Page_BlockSubmit = !CheckBeforePrint();
            if (jf_Trim(document.all["txSMon"].value) != jf_Trim(document.all["txEMon"].value))
            {
                alert("列印月份起訖需相同!!");
                Page_BlockSubmit = true;
            }
            //1050526	Joe	1050087	二代系統升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "ODP420")
    {
        if (document.all["lbReturnValue"].length == 1)
        {
            var strMaxUseDate = document.all["lbReturnValue"].options[0].value;
            if (strMaxUseDate == "")
            {
                document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
            }
            else
            {
                document.all["lbMaxYear"].textContent = "目前統計最大年月：" +
													strMaxUseDate.substr(0, 3) + "年" +
													strMaxUseDate.substr(3, 2) + "月";
                //iris 修改檢核列印月份不可大於目前統計月份之欄位
                //1060510	Joe		1060215		修改控制項傳值方式
                // document.all["h_txYM"].textContent =strMaxUseDate;
                document.all["h_txYM"].value = strMaxUseDate;
            }
        }
    }
}

function ClientOnLoad()
{
    ShowMsg();
    DivControl();
    ddlProperty_onchange();
    //0980922 下拉選單於postback後重新設定值[0980391]-Jane
    CheckddlIsPostBack();

    //1060223	Joe		1050779		新增RRB客製化報表
    if (document.all.H_txOrgName.value == "RRB")
        document.all.rbTypeRRB1.checked = true;
}

function DivControl()
{
    if (document.all.rbType5 == null)
        //1010112 Kevin 1000962	調整版面
        //document.all.dvRptType.style.height = 135;
        document.all.dvRptType.style.height = 318;
    else
        //1010112 Kevin 1000962	調整版面
        //document.all.dvRptType.style.height = 170;
        document.all.dvRptType.style.height = 318;
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    document.all[argLabelId].textContent = obj.value;
}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

function CheckBeforePrint()
{
    var bRtn = true;
    var strSMon = jf_Trim(document.all["txSMon"].value);
    var strEMon = jf_Trim(document.all["txEMon"].value);
    if (strSMon + strEMon == "")
    {
        bRtn = false;
        //1050526	Joe	1050087	二代系統升級，調整focus寫法
        //document.all["txSMon"].focus();
        $('#txSMon').focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["列印月份不可皆為空白"])), "");
    }
    bRtn = ConfirmData(); //zoey [951313, 96/01/29]
    return bRtn;
}

function rb_onclick(activeObjID)
{
    if (activeObjID == "rb1")
        //1050526	Joe	1050087	二代系統升級
        //document.all["dvRptType"].className = "";
        document.all["dvRptType"].className = "DivTable";
    else
        document.all["dvRptType"].className = "hide";
}

//###########################################################################################
//				其		他		共		用		function
//###########################################################################################
//日期onblur
function CheckCDATE(argObj, strMsg)
{
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 5)
        {
            strDate = jf_PADL(strDate, 5, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate + "01"))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1050526	Joe	1050087	二代系統升級，調整focus寫法
            //document.all[argObj].focus();
            $('#' + argObj).focus();
        }
    }
}

function ddlProperty_onchange()
{
    var idx = document.all.ddlProperty.selectedIndex;
    var btSaveObj = document.getElementById("btExcel");
    //1140305   Joe     1131298     新增直式及Word
    if (document.all["H_OrgNickName"].value == "VAC") {
        btSaveObj.disabled = false;
        return;
    }

    //1060221	Joe		1050779		新增報表ODR430L19_RRB--S
    if (idx == 0)
    {
        document.all["rptTypeRRB"].className = "";
    }
    else
    {
        document.all["rptTypeRRB"].className = "hide";
    }
    //1060221	Joe		1050779		新增報表ODR430L19_RRB--E

    if (idx != 1)//0971088  iris 新增不區分公文性質報表 --新增空白選項
    {
        document.all["dvRptType"].className = "hide";
        //0991005 新增其他類別報表可匯出excel [0990412] Johnny
        /*if(idx <=6&&idx!=0)
		{		
			if(btSaveObj != null)
			{
				btSaveObj.setAttribute("disabled",false);
				//document.all.cbInterval.checked = true;
				//document.all.cbInterval.disabled= true;
			}
		}
		else if(idx >=9&&idx!=0)//2011.01.24	Linda	------	調整監察案件的匯出Excel按鈕
		{		
			if(btSaveObj != null)
				btSaveObj.setAttribute("disabled",false);
		}
		else
		{
			if(btSaveObj != null)
				btSaveObj.setAttribute("disabled",true);		
		}*/
        //1050526	Joe		1050087		變更Excel按鍵不使用的方法
        if (btSaveObj != null)
        {
            //btSaveObj.setAttribute("disabled",false);
            btSaveObj.disabled = false;

            //1081213 Zen 1080783 新增匯出ODS格式
            document.all['btODS'].disabled = false;
        }
        //1070112	Joe		1070056		修改鐵改一般公文會辦報表隱藏含二級單位選項--S
        //1070208	Joe		1070056		修正當機關非鐵改局時rbTypeRRB3會隱藏導致抓不到控制項的問題
        if (document.all["H_OrgNickName"].value == "RRB")
        {
            if (document.all.ddlProperty.selectedIndex == 0 && document.all.rbTypeRRB3.checked == true)
            {
                document.all.cbSubOu.className = "hide";
                document.all.lbSubOu.className = "hide";
            }
            else
            {
                document.all.cbSubOu.className = "";
                document.all.lbSubOu.className = "";
            }
        }
        //1070112	Joe		1070056		修改鐵改一般公文會辦報表隱藏含二級單位選項--E
    }

    else
    {
        //1001207 Kevin [1000909] (標檢局)僅使用一般公文L9
        if (document.all.H_txOrgno.value != "313150000G")
            //1050526	Joe	1050087	二代系統升級
            //document.all["dvRptType"].className = "";
            document.all["dvRptType"].className = "dTR";
        else
            document.all["dvRptType"].className = "hide";

        //1050526	Joe		1050087		變更Excel按鍵不使用的方法
        if (btSaveObj != null)
        {
            //btSaveObj.setAttribute("disabled",true);
            btSaveObj.disabled = true;

            //1081213 Zen 1080783 新增匯出ODS格式
            document.all['btODS'].disabled = true;
        }
        rbChanged();
    }
}
function rbChanged()
{
    var btSaveObj = document.getElementById("btExcel");
    //1050526	Joe		1050087		變更Excel按鍵不使用的方法
    /*
	if (document.all.rbTypeCom.checked == true)
	{
		if(btSaveObj != null)
			btSaveObj.setAttribute("disabled",false);
			//document.all.cbInterval.checked = true;
			//document.all.cbInterval.disabled= true;
	}
	//1000326 Linda [1000304] (CDC)新增一般公文匯出EXCEL
	else if(document.all.rbType1.checked == true)
	{
		if(btSaveObj != null)
			btSaveObj.setAttribute("disabled",false);
	}
	//else if(document.all.rbType1_SaveDay.checked == true)　此為CDC特有報表,共通版需註解掉
	//{
	//	if(btSaveObj != null)
	//		btSaveObj.setAttribute("disabled",false);
	//}
	else if(document.all.rbType2.checked == true)
	{
		if(btSaveObj != null)
			btSaveObj.setAttribute("disabled",false);
	}
	else if(document.all.rbUser.checked == true)
	{
		if(btSaveObj != null)
			btSaveObj.setAttribute("disabled",false);
	}
	else if(document.all.rbType3.checked == true)
	{
		if(btSaveObj != null)
			btSaveObj.setAttribute("disabled",false);
	}
	else if(document.all.rbType4.checked == true)
	{
		if(btSaveObj != null)
			btSaveObj.setAttribute("disabled",false);
	}
	//1031224   Kenny   [1030424]   增加一般公文(含已逾限率及未逾限率欄位)報表，匯出Excel後ToolBar按鍵不可設為disable
	else if(document.all.rbType10.checked == true)
	{
		if(btSaveObj != null)
			btSaveObj.setAttribute("disabled",false);
	}
    //1040909 Kevin 1040706 新增榮總公文處理分析統計表Excel
	else if (document.all.rbType1VGH && document.all.rbType1VGH.checked == true)
	{
	    if (btSaveObj != null)
	        btSaveObj.setAttribute("disabled", false);
	}
	else
	{
		if(btSaveObj != null)
			btSaveObj.setAttribute("disabled",true);		
	}*/
    if (document.all.rbType9.checked == true)
    {
        btSaveObj.disabled = true;

        //1081213 Zen 1080783 新增匯出ODS格式
        document.all['btODS'].disabled = true;
    }
    else
    {
        btSaveObj.disabled = false;

        //1081213 Zen 1080783 新增匯出ODS格式
        document.all['btODS'].disabled = false;
    }
    //1060412	Joe	1051011		新增報表ODR430L19RRB2--S
    //1060601	Joe	1051011		修正前單錯誤，新增判斷當機關代碼為鐵改局時才進行處理
    if (document.all.H_txOrgName.value == "RRB")
    {
        if (document.all.rbTypeRRB3.checked == true)
        {
            //1070112	Joe		1070056		修改鐵改一般公文會辦報表隱藏含二級單位選項--S
            // document.all.cbSubOu.className = "hide";
            // document.all.lbSubOu.className = "hide";
            //1070112	Joe		1070056		修改鐵改一般公文會辦報表隱藏含二級單位選項--E
            //1070112	Joe		1070056		績優人員統計表隱藏二級單位
            document.all["dlSect_Container"].className = "hide";
            document.all.cbInterval.checked = true;
        }
        else
        {
            //1070112	Joe		1070056		修改鐵改一般公文會辦報表隱藏含二級單位選項--S
            // document.all.cbSubOu.className = "";
            // document.all.lbSubOu.className = "";
            //1070112	Joe		1070056		修改鐵改一般公文會辦報表隱藏含二級單位選項--E
            //1070112	Joe		1070056		績優人員統計表隱藏二級單位
            document.all["dlSect_Container"].className = "custom-combobox";
            document.all.cbInterval.checked = false;
        }
        //1070112	Joe		1070056		修改鐵改一般公文會辦報表隱藏含二級單位選項--S
        if ((document.all.ddlProperty.selectedIndex == 1 && document.all.rbTypeCom.checked == true) || (document.all.ddlProperty.selectedIndex == 0 && document.all.rbTypeRRB3.checked == true))
        {
            document.all.cbSubOu.className = "hide";
            document.all.lbSubOu.className = "hide";
            if (document.all.ddlProperty.selectedIndex == 1)
                document.all.cbSubOu.checked = false;
        }
        else
        {
            document.all.cbSubOu.className = "";
            document.all.lbSubOu.className = "";
        }
        //1070112	Joe		1070056		修改鐵改一般公文會辦報表隱藏含二級單位選項--E
    }
    //1060412	Joe	1051011		新增報表ODR430L19RRB2--E
}
/*
function getToolBarItemObjById(argId)
{
	for(var i=0;i<document.all.tbTool.numItems;i++)
	{
		if(document.all.tbTool.getItem(i).getAttribute("ID") == argId)
			return document.all.tbTool.getItem(i);		
	}
}
*/

function ConfirmData()
{
    var bRtnbool = true;
    var year1 = parseInt(document.all.txSMon.value.substr(0, 3));
    if (year1 == 0)
        year1 = parseInt(document.all.txSMon.value.substr(1, 2));
    var month1 = parseInt(document.all.txSMon.value.substr(3, 2));
    if (month1 == 0)
        month1 = parseInt(document.all.txSMon.value.substr(4, 1));

    var year2 = parseInt(document.all.h_txYM.value.substr(0, 3));
    if (year2 == 0)
        year2 = parseInt(document.all.h_txYM.value.substr(1, 2));
    var month2 = parseInt(document.all.h_txYM.value.substr(3, 2));
    if (month2 == 0)
        month2 = parseInt(document.all.h_txYM.value.substr(4, 1));
    if (year1 > year2 || (year1 == year2 && month1 > month2))
    {
        strErrMsg = "列印月份不可大於目前統計最大月份\n";
        //1050526	Joe	1050087	二代系統升級，調整focus寫法
        //document.all["txSMon"].focus();
        $('#txSMon').focus();
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    year1 = parseInt(document.all.txEMon.value.substr(0, 3));
    if (year1 == 0)
        year1 = parseInt(document.all.txEMon.value.substr(1, 2));
    month1 = parseInt(document.all.txEMon.value.substr(3, 2));
    if (month1 == 0)
        month1 = parseInt(document.all.txEMon.value.substr(4, 1));

    if (year1 > year2 || (year1 == year2 && month1 > month2))
    {
        strErrMsg = "列印月份不可大於目前統計最大月份\n";
        //1050526	Joe	1050087	二代系統升級，調整focus寫法
        //document.all["txEMon"].focus();
        $('#txEMon').focus();
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}
//0980922 設定二級單位下拉選單[0980391]-Jane
function jf_SetdlSect(argDLObj)
{
    var strDept = new Array();
    var argObjText = argDLObj + "_Text";

    if (argDLObj == "dlDept")
    {
        if (odjf_ComboBoxCheck("dlDept", "列印單位"))
        {
            if (document.all[argDLObj].selectedIndex == -1)
            {
                //若不存在，則清空二級單位下拉選單
                if (document.all[argObjText].value != "")
                {
                    ClearDL(document.all.dlSect);
                    return;
                }
            }
            if (document.all["dlDept"].selectedIndex != -1)
            {
                strDept = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');
                document.all["H_dlSect_Value"].value = "";
                document.all["H_dlSect_Text"].value = "";

                odjf_SetdlDept("dlDept", "dlSect", "", "", true, true);//初始dlSect的處理

                //設定下拉選單長度
                if (document.all["dlSect"].options.length > 10)
                    document.all["dlSect"].size = 10;
                else if (document.all["dlSect"].options.length == 1)
                    document.all["dlSect"].size = 2;
                else
                    document.all["dlSect"].size = document.all["dlSect"].options.length;
            }
        }
    }

    if (argDLObj == "dlSect")
    {
        //若為二級單位下拉選單
        if (document.all["dlSect"].selectedIndex != -1 && jf_Trim(document.all["dlSect_Text"].value) != "")
        {
            if (odjf_ComboBoxCheck("dlSect", "列印二級單位"))
            {
                document.all["H_dlSect_Value"].value = jf_Trim(document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value);
                document.all["H_dlSect_Text"].value = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].text;
                if (document.all["cbSubOu"])
                    document.all["cbSubOu"].checked = true;
            }
            else
            {
                document.all["H_dlSect_Value"].value = "";
                document.all["H_dlSect_Text"].value = "";
            }
        }
        else if (jf_Trim(document.all["dlSect_Text"].value) == "")
        {
            document.all["H_dlSect_Value"].value = "";
            document.all["H_dlSect_Text"].value = "";
        }
    }

}
//0980922 將DropDownList裡的item清除[0980391]-Jane
function ClearDL(argObj)
{
    for (var i = 0 ; i < argObj.length; i++)
        argObj.remove(0);

    argObj.length = 0;
    return;
}
//0980922 下拉選單於postback後重新設定值[0980391]-Jane
function CheckddlIsPostBack()
{
    //1010528	Ivory	1010449	若權限OD0004 一、二級單位DISABLE不需做連動處理
    if (document.all["txODPrivilege"].value == "0004")
    {
        document.all["H_dlSect_Value"].value = jf_Trim(document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value);
        document.all["H_dlSect_Text"].value = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].text;
        return;
    }
    var arrSect = new Array(2);

    //判斷承辦單位二級單位下拉選單
    arrSect[0] = jf_Trim(document.all["H_dlSect_Text"].value);
    arrSect[1] = jf_Trim(document.all["H_dlSect_Value"].value);

    jf_SetdlSect("dlDept");

    document.all["dlSect_Text"].value = arrSect[0];
    document.all["H_dlSect_Text"].value = arrSect[0];
    document.all["H_dlSect_Value"].value = arrSect[1];
}

//0980922 於搜尋前檢核,若選擇到二級單位,則必勾選"含二級單位"選項[0980391]-Jane
function CheckSub()
{
    if (document.all["cbSubOu"])
    {
        if (jf_Trim(document.all["H_dlSect_Text"].value) != "")
            document.all["cbSubOu"].checked = true;
    }
}