/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* 程式修改歷程 Latest Updated by Andy 2007.02.13
* -------------------------------------------------------------------------------------------------
* 日期			修改人	單號	概要
* -------------------------------------------------------------------------------------------------
* 2007.02.13	Andy	000419	公文文號欄位可允許輸入-
* 2016.08.11    Zen     1050700 弱掃XSS修正
//1060626       Zen     1050087 二代升級 * 1100204      Zen     1090927 取消使用document.activeElement* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060626 Zen 1050087 二代升級//jf_ShowValidator();

//1060626 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

var xOldKey;
var oWindowID;
var oTimerID;
var SumDocWin, SumComWin;
var DetDocWin, DetComWin;
var PDFWin;
var wsGetEmpID;
var wsGetEmpDeptID;
var wsCheckDataKeyID;
var ActiveBtn = "";
window.focus();
var alertTitle = "您輸入之資料有誤，明細如下，請更正後重試";

//1060626 Zen 1050087 二代升級
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
    //1060626 Zen 1050087 二代升級    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmpDept", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetBTypeNo", false, null); //zoey [951249,95/12/06]

    /*
	if(document.all["StartField"] != null)
		jf_OpenSumDocWin(document.all["StartField"].value);
	*/
    //解決StartupScript問題 #2007.07.19 Andy
    //1060626 Zen 1050087 二代升級    //if (document.all["StartField"])
    //{
    //    var s = document.all["StartField"].value;
    //    if (s != "")
    //    {
    //        jf_OpenSumDocWin(s);
    //        document.all["StartField"].value = "";
    //    }
    //}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060626 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060626 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        case "btCls":	//分類號子視窗
            var pUrl = "";
            document.all("SubWinRtn").length = 0;
            pUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAI300&MODE=1&FILE_CLS=" + document.all["tbCLS"].value;
            ActiveBtn = "btCls";
            jf_OpenChildWin(pUrl, "EAC005", 750, 550);
            Page_BlockSubmit = true;
            break;
        case "btECls":	//迄止分類號子視窗
            var pUrl = "";
            document.all("SubWinRtn").length = 0;
            pUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAI300&MODE=1&FILE_CLS=" + document.all["txECLS"].value;
            ActiveBtn = "btECls";
            jf_OpenChildWin(pUrl, "EAC005", 750, 550);
            Page_BlockSubmit = true;
            break;
        case "btClass":	//案次號子視窗
            var pUrl = "";
            document.all("SubWinRtn").length = 0;
            pUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAI300&MODE=2&FILE_CASE=" + document.all["tbCASE"].value;
            ActiveBtn = "btClass";
            jf_OpenChildWin(pUrl, "EAC005", 750, 550);
            Page_BlockSubmit = true;
            break;
        case "btECase": //迄止案次號子視窗
            var pUrl = "";
            document.all("SubWinRtn").length = 0;
            pUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAI300&MODE=2&FILE_CASE=" + document.all["txECase"].value;
            ActiveBtn = "btECase";
            jf_OpenChildWin(pUrl, "EAC005", 750, 550);
            Page_BlockSubmit = true;
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060626 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060626 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":	// 查詢
            if (document.all.ckDocLevel.checked == false && document.all.ckCaseLevel.checked == false)
            {
                alert("請至少勾選任一查詢層級之條件");
                return;
            }

            //1060626 Zen 1050087 二代升級，改用Panel判斷            //if (document.all.TblC1.style.display == "none") //民眾使用
            if (document.all.pUser1.style.display == "none")
            {
                if (!Check_NOT_Allow_Empty_Field("2"))
                {
                    Page_BlockSubmit = true;
                }
                else
                {
                    Page_BlockSubmit = false;
                }
            }
            else //機關內使用者 
            {
                Page_BlockSubmit = !IsValidToSearch();
            }
            //1060626 Zen 1050087 二代升級，避免遇到快顯封鎖--begin            //jf_ToolBarSubmit();
            if (!Page_BlockSubmit)
            {
                Page_BlockSubmit = true;
                var strUrl = btSearchClientSideProc();
                if (strUrl.indexOf("ERR：") != -1)
                {
                    alert(strUrl);
                    return;
                }
                OpenDocWin(strUrl);
            }
            //1060626 Zen 1050087 二代升級，避免遇到快顯封鎖--end            break;
        case "btClean":		// 清除
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.all.ckSubject.checked = true;
            document.all.ckDocLevel.checked = true;
            document.all.ckCaseLevel.checked = true;
            document.all.ckOnLine.checked = true;
            document.all.ckPaper.checked = true;
            //1060626 Zen 1050087 二代升級            //document.all["tbDOC_NOS"].focus();
            $('#tbDOC_NOS').focus();
            break;
        case "btPrint":		// 空白調案單
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060626 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
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
    if (argResult.id == wsGetEmpID)
    {
        if (!argResult.error)
        {
            //將所取得之使用者資訊塞入Select物件中
            for (i = 0; i < argResult.value.EmpName.length; i++)
            {
                var strDeptName = "";
                if (argResult.value.SectName[i] == "")
                    strDeptName = "(" + argResult.value.DeptName[i] + ")";
                else
                    strDeptName = "(" + argResult.value.DeptName[i] + "-" + argResult.value.SectName[i] + ")";
                var objOption = new Option(strDeptName + argResult.value.EmpName[i], argResult.value.UserName[i]);
                document.all.dlUSER.options[i + 1] = objOption;
            }
        }
    }
    else if (argResult.id == wsGetEmpDeptID)
    {
        if (!argResult.error)
        {
            //將所取得之部門代號塞入txDEPT中	
            if (argResult.value.EmpDeptNo != "")
            {
                var Msg = "";
                if (document.all.txDEPT.value == "" || document.all.txDEPT.value != argResult.value.EmpDeptNo)
                {
                    var text = "";
                    if (argResult.value.EmpSectName == "")
                        text = "(" + argResult.value.EmpDeptName + ")" + argResult.value.EmpName;
                    else
                        text = "(" + argResult.value.EmpDeptName + "-" + argResult.value.EmpSectName + ")" + argResult.value.EmpName;
                    CurrentInfo = new Object();
                    CurrentInfo.text = text;
                    CurrentInfo.value = argResult.value.EmpNo;

                    Find_dlUSER();

                    Msg = "您是否要設定/改變負責單位條件？";
                    ret = window.confirm(Msg);
                    if (ret)
                    {
                        document.all.txDEPT.value = argResult.value.EmpDeptNo;
                        Find_dlDEPT();
                    }
                }
                return true;
            }
            else
            {
                return false;
            }
        }
    } //Zoey [951249,95/12/06] 由公文性質取得業務類別,設定dlBTypeNO值
    else if (argResult.id == iCallID_GetBTypeNo)
    {
        if (argResult.value.m_bSuccess)
        {
            for (var i = 0 ; i < document.all.ddlBTypeNo.length; i++)
                document.all.ddlBTypeNo.remove(0);
            document.all.ddlBTypeNo.length = 0;
            document.all.ddlBTypeNo.options.add(new Option("", "")); //第一筆空白		

            var pTmpAry = argResult.value.RtnStr.split(":");

            for (var i = 0; i < pTmpAry.length; i++)
            {
                var pTmpAry2 = pTmpAry[i].split(",");
                var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
                document.all.ddlBTypeNo.options.add(objOption);
                document.all.ddlBTypeNo.selectedIndex = 0;
            }
            return true;
        }
    } ////Zoey [951249,95/12/06] END
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
    if (argCallerId == "EAC005")
    {
        if (ActiveBtn == "btCls" || ActiveBtn == "btClass")
        {
            if (document.all["lbReturnValue"].length > 0)
            {
                document.all["tbCLS"].value = document.all["lbReturnValue"].options[1].value;
                document.all["tbCASE"].value = document.all["lbReturnValue"].options[2].value;
                if (document.all["lbReturnValue"].options[0].value != "")
                    document.all["tbYEAR"].value = document.all["lbReturnValue"].options[0].value;
            }
        }
        else if (ActiveBtn == "btECls" || ActiveBtn == "btECase")
        {
            if (document.all["lbReturnValue"].length > 0)
            {
                document.all["tbECLS"].value = document.all["lbReturnValue"].options[1].value;
                document.all["txECase"].value = document.all["lbReturnValue"].options[2].value;
                if (document.all["lbReturnValue"].options[0].value != "")
                    document.all["txEYear"].value = document.all["lbReturnValue"].options[0].value;
            }
        }
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    /*
	try
	{
	    opener.document.all.lbReturnValue.length = 3;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.document.all.lbReturnValue.options[2].value = argRead2;
	    opener.window.CallBack("SII020");
	    close();
	}
	catch (e) {}
    */
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function DOC_NO_KEYPRESS()
{
    //A~Z keyCode 65~90 小寫為97~122
    //0~9 keyCode 48~57
    //<- keyCode 8 
    //TAB keyCode 9
    //enter keyCode 13
    //Del keyCode 46
    //- keyCode 45
    jf_UPPERCASE();
    var pRtn = true;
    var pKeyCode = event.keyCode;
    if (pKeyCode >= 48 && pKeyCode <= 122)
    {
        if (pKeyCode > 57 && pKeyCode < 65)
            pRtn = false;
        else if (pKeyCode > 90 && pKeyCode < 97 && pKeyCode != 95)
            pRtn = false;
    }
    else if (pKeyCode == 45) //可允許輸入- #2007.02.13 Andy
    {
        pRtn = true;
    }
    else
    {
        pRtn = false;
    }

    event.returnValue = pRtn
}

function jf_DOC_NO_BLUR(obj)
{
    if (obj.value == "")
        return;

    //var pMatch = /\W{1}/;
    var pMatch = /\W{1,-}/; //可允許輸入- #2007.02.13 Andy
    if (pMatch.test(obj.value))
    {
        alert("文號欄位不可輸入非英文字母,非數字的字元。");
        //1060626 Zen 1050087 二代升級        //obj.focus();
        $('#' + obj).focus();
    }
    if (obj.id == "tbDOC_NOS")
    {
        if (!pMatch.test(obj.value))
        {
            document.all.tbDOC_NOE.value = obj.value;
        }
    }
}

function PADZERO(obj, num)
{
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, num, "0");
    }
}

// 日期格式檢查
function Check_DATE(obj, focus_obj)
{
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, 7, "0");

        if (!jf_CheckCDATE(obj.value))
        {
            jf_ShowMsg("輸入的日期不合法,請重新輸入", alertTitle);
            //1060626 Zen 1050087 二代升級            //obj.focus();
            $('#' + obj).focus();
            Page_BlockSubmit = true;
        }
        else
        {
            if (focus_obj != null)
            {
                //1060626 Zen 1050087 二代升級                //focus_obj.focus();
                $('#' + focus_obj).focus();
            }
        }
    }
}

function Check_NOT_Allow_Empty_Field(argType) // 1:機關使用者 2:民眾
{
    var fr = document.AKI800;
    var pIsValid = true;
    var errMsg = "";
    var focusField = "";

    if (argType == "1")	//機關使用者
    {
        if (fr.tbDOC_NOS.value == "" && fr.tbDOC_NOE.value == "" && fr.tbYEAR.value == "")
        {
            if (fr.tbDATES.value == "" || fr.tbDATEE.value == "")
            {
                errMsg += "文號,檔號-年,日期起訖\n";
                focusField += "D";
            }
        }

        if (errMsg != "")
        {
            errMsg = "以下欄位至少選擇一組輸入:\n" + errMsg;
            jf_ShowMsg(errMsg, alertTitle);
            switch (focusField.substr(0, 1))
            {
                case "D":
                    fr.tbDATES.focus();
                    break;
                case "U":
                    fr.tbUNIT.focus();
                    break;
                case "K":
                    fr.tbKEYWORD.focus();
            }
            pIsValid = false;
        }

        if (pIsValid)
        {
            if (fr.tbDATES.value > fr.tbDATEE.value)
            {
                jf_ShowMsg("起始日期不可大於迄止日期", alertTitle);
                fr.tbDATES.focus();
                pIsValid = false;
            }
        }
    }
    else	//民眾
    {
        if (fr.tbKEYWORD.value == "" && fr.tbUNIT.value == "" && fr.txCustomYear.value == "" && fr.txCustomNo.value == "" && fr.txCustomDate.value == "")
        {
            alert("請至少輸入一項條件");
            fr.tbKEYWORD.focus();
            pIsValid = false;
        }
    }

    return pIsValid;
}

//------------------------------------------------------------
//分類號
function OpenWindow(argUrl)
{
    var gChidkWinStyle = "left=0,top=0,height=" + (screen.height - 50) + ",width=" + (screen.width - 10) + ",titlebar=yes,status=yes,resizeable=yes";//"fullscreen=yes";
    uChildWinHandle = open(argUrl, null, gChidkWinStyle);
}

function WaitClose()
{
    if (uChildWinHandle.closed)
    {
        clearInterval(uTimerID);
        if (document.all("SubWinRtn").length > 0)
        {
            document.all("tbCLS").value = document.all("SubWinRtn").options[0].value;
            var oldlength = document.all("SubWinRtn").length;
            for (i = 0; i < oldlength; i++)
            {
                document.all["SubWinRtn"].remove(0);
            }
        }
        if (screenLeft > 400)
            moveTo(0, 0);
    }
}

//-------------------------------------------------------------
//案號
function OpenWindow2(argUrl)
{
    var gChidkWinStyle = "left=0,top=0,height=" + (screen.height - 50) + ",width=" + (screen.width - 10) + ",titlebar=yes,status=yes,resizeable=yes";//"fullscreen=yes";
    uChildWinHandle = open(argUrl, null, gChidkWinStyle);
    moveBy(screen.width, screen.height);
}

function WaitClose2()
{
    if (uChildWinHandle.closed)
    {
        clearInterval(uTimerID);
        if (document.all("SubWinRtn").length > 0)
        {
            document.all("tbCLS").value = document.all("SubWinRtn").options[0].value;
            document.all("tbCASE").value = document.all("SubWinRtn").options[2].value;
            var oldlength = document.all("SubWinRtn").length;
            for (i = 0; i < oldlength; i++)
            {
                document.all["SubWinRtn"].remove(0);
            }
        }
        if (screenLeft > 400)
            moveTo(0, 0);
    }
}

/*****************************************************
 name: SelectItem
 desc: 處理選取checkbox
*****************************************************/
function SelectItem(argCookie_nm)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;
    var xobjname = xObjectName.substring(xObjectName.indexOf("cbSELECT"), xObjectName.length);
    var pNo = xObjectName.substring(13, xObjectName.indexOf("_cbSELECT"));

    pStr = document.all[argCookie_nm].value;
    pStr1 = '';
    pStr2 = '';
    pType = 0;

    //1060626 Zen 1050087 二代升級    //var pi_index = Number(document.all["dgDETAIL_ctrl" + pNo + "_hlSEQ_NO"].innerText);
    var pi_index = Number(document.all["dgDETAIL_ctrl" + pNo + "_hlSEQ_NO"].textContent);

    //1100204 Zen 1090927 取消使用document.activeElement    //if (document.activeElement.checked) { pType = '1' }
    if (event.target.checked) { pType = '1' }
    else { pType = '0' }

    if (pi_index == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, pi_index - 1) }
    pStr2 = pStr.substring(pi_index, pStr.length)

    pStr = pStr1 + pType + pStr2
    document.all[argCookie_nm].value = pStr;
}


/******************************************************************
 name : Find_dlDEPT
 param: none        
 rtn  : none
 desc : 當txDEPT onblur時，自動變動dlDEPT以對應txDEPT
******************************************************************/
function Find_dlDEPT()
{
    for (i = 0; i <= document.all.dlDEPT.length; i++)
    {
        if (i == document.all.dlDEPT.length)
        {
            document.all.dlDEPT.options[0].selected = true;
            document.all.lbDeptErr.className = "";
            document.all.htxDeptName.value = "XXX";
        }
        else if ((DiscodeDeptValue(document.all.dlDEPT.options[i].value, false) == document.all.txDEPT.value)
			|| (document.all.dlDEPT.options[i].text == document.all.txDEPT.value))
        {
            document.all.dlDEPT.options[i].selected = true;
            document.all.htxDeptName.value = document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].text;
            document.all.lbDeptErr.className = "hidden";
            BuliddlUser();
            Find_txDEPT();
            Find_dlUSER();
            return;
        }
    }
}

//由dlDEPT中對應出txDEPT之值
function Find_txDEPT()
{
    document.all.txDEPT.value = DiscodeDeptValue(document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].value, false);
    document.all.lbDeptErr.className = "hidden";
}

//依傳入之字串取得處級或組室級代號
function DiscodeDeptValue(argDeptString, argGetDeptNo)
{
    //1050811 Zen 1050700 弱掃XSS修正
    argDeptString = decodeURI(argDeptString);

    //紀錄冒號之位置
    var CommaPosition = argDeptString.indexOf(":");
    var AfterComma = argDeptString.substring(CommaPosition + 1, CommaPosition + 2);
    if (argGetDeptNo)//取得處級代號(冒號前之單位代號)
    {
        return argDeptString.substring(0, CommaPosition);
    }
    else//依據代號取得處級或組室級代號
    {
        if (AfterComma == " ")
        {
            return argDeptString.substring(0, CommaPosition);
        }
        else
        {
            return argDeptString.substring(CommaPosition + 1, argDeptString.length);
        }
    }
}

/******************************************************************
 name : Find_dlUSER
 param: none        
 rtn  : none
 desc : 當txUSER onblur時，自動變動dlUSER以對應txUSER
******************************************************************/
function Find_dlUSER()
{
    for (i = 0; i <= document.all.dlUSER.length; i++)
    {
        var pUserName = "";
        if (document.all.dlUSER.options[i] != null)
        {
            if (document.all.dlUSER.options[i].text.indexOf(")") != -1)
                pUserName = document.all.dlUSER.options[i].text.split(")")[1];
        }
        if (i == document.all.dlUSER.length)
        {
            if (CurrentInfo != null)
            {
                document.all.dlUSER.options.length = document.all.dlUSER.options.length + 1;
                document.all.dlUSER.options[document.all.dlUSER.options.length - 1].text = CurrentInfo.text;
                document.all.dlUSER.options[document.all.dlUSER.options.length - 1].value = CurrentInfo.value;
                document.all.dlUSER.options[document.all.dlUSER.options.length - 1].selected = true;
                document.all.lbUserErr.className = "hidden";
                if (CurrentInfo.text.indexOf(")") != -1)
                    document.all.htxUserName.value = CurrentInfo.text;
                else
                    document.all.htxUserName.value = "XXX";
                document.all.txUSER.value = CurrentInfo.value;
                CurrentInfo = null;
                return;
            }
            else
            {
                document.all.dlUSER.options[0].selected = true;
                document.all.lbUserErr.className = "";
                document.all.htxUserName.value = "XXX";
            }
        }
        else if ((DiscodeUserValue(document.all.dlUSER.options[i].value) == document.all.txUSER.value)
			|| (pUserName) == document.all.txUSER.value)
        {
            document.all.dlUSER.options[i].selected = true;
            document.all.lbUserErr.className = "hidden";
            document.all.htxUserName.value = document.all.dlUSER.options[document.all.dlUSER.selectedIndex].text;
            document.all.txUSER.value = document.all.dlUSER.options[document.all.dlUSER.selectedIndex].value
            return;
        }
    }
}

//由dlUSER中對應出txUSER之值
function Find_txUSER()
{
    if (document.all.txUSER.value == "")
        document.all.dlUSER.options[0].selected = true;
    else
    {
        document.all.txUSER.value = DiscodeUserValue(document.all.dlUSER.options[document.all.dlUSER.selectedIndex].value);
    }
    document.all.lbUserErr.className = "hidden";
    document.all.htxUserName.value = document.all.dlUSER.options[document.all.dlUSER.selectedIndex].text;
}

//由字串中取得使用者之代號
function DiscodeUserValue(argUserString)
{
    //紀錄冒號之位置
    var CommaPosition = argUserString.lastIndexOf(":");
    return argUserString.substring(CommaPosition + 1, argUserString.length);
}

/******************************************************************
 name : BuliddlUser
 param: none        
 rtn  : none
 desc : 當dlDEPT onchange時，則填入dlUSER適當之使用者
******************************************************************/
var CurrentInfo = null;
function BuliddlUser()
{
    if (document.all.dlUSER.options[document.all.dlUSER.selectedIndex].text != "")
    {
        CurrentInfo = new Object();
        CurrentInfo.text = document.all.dlUSER.options[document.all.dlUSER.selectedIndex].text;
        CurrentInfo.value = document.all.dlUSER.options[document.all.dlUSER.selectedIndex].value;
    }

    //刪除dlUSER中所有之option
    var dlUSERCount = document.all.dlUSER.length;
    for (j = 0; j < dlUSERCount; j++)
    { document.all.dlUSER.options[0] = null; }
    var objOptionSpace = new Option("", "");
    document.all.dlUSER.options[0] = objOptionSpace;

    var argWSPara = new Array(1);
    //處理當dlDEPT為空白時之處理
    if (document.all.dlDEPT.selectedIndex == 0)
    {
        argWSPara[0] = "XXX";
    }
    else
    {
        if (document.all.cbDeptNotMatch.checked)
            //1050811 Zen 1050700 弱掃XSS修正
            //argWSPara[0]=DiscodeDeptValue(document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].value,true);
            argWSPara[0] = DiscodeDeptValue(encodeURI(document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].value), true);
        else
            //1050811 Zen 1050700 弱掃XSS修正
            //argWSPara[0] = DiscodeDeptValue(document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].value, false);
            argWSPara[0] = DiscodeDeptValue(encodeURI(document.all.dlDEPT.options[document.all.dlDEPT.selectedIndex].value), false);
    }
    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, argWSPara);
    if (callObj.error)
    {
        alert(callObj.errorDetail.string);
    }
    else
    {
        wsGetEmpID = callObj.id;
        OnWSResult(callObj);
    }
}

/******************************************************************
 name : USERGetDEPT
 param: none        
 rtn  : none
 desc : 由txUSER取得其部門代號，並帶入到txDEPT中
******************************************************************/
function USERGetDEPT()
{
    var argWSPara = new Array(1);
    argWSPara[0] = document.all.txUSER.value;

    //1050811 Zen 1050700 弱掃XSS修正
    argWSPara[0] = encodeURI(argWSPara[0]);

    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmpDept", false, argWSPara);
    if (callObj.error)
    {
        alert(callObj.errorDetail.string);
    }
    else
    {
        wsGetEmpDeptID = callObj.id;
        if (OnWSResult(callObj))
            return true;
        else
        {
            document.all.dlUSER.options[0].selected = true;
            //alert("警告：無此負責人");
            document.all.lbUserErr.className = "";
            document.all.htxUserName.value = "XXX";
            return false;
        }
    }
}

function IsValidToSearch()
{
    if (document.all["dlUSER_Text"].value == "")
        document.all.txUserValue.value = "";
    //檢查起始檔號是否合法
    if (!(document.all.tbYEAR.value == "" && document.all.tbCLS.value == "" && document.all.tbCASE.value == "" && document.all.tbVOL.value == "" && document.all.tbSEQ.value == ""))
    {
        if (!CheckFileNo("tbYEAR", "tbCLS", "tbCASE", "tbVOL", "tbSEQ"))
        {
            FocusAtEmpty("tbYEAR", "tbCLS", "tbCASE", "tbVOL", "tbSEQ");
            return false;
        }
    }
    //檢查迄止檔號是否合法
    if (!(document.all.txEYear.value == "" && document.all.txECLS.value == "" && document.all.txECase.value == "" && document.all.txEVol.value == "" && document.all.txESeq.value == ""))
    {
        if (!CheckFileNo("txEYear", "txECLS", "txECase", "txEVol", "txESeq"))
        {
            FocusAtEmpty("txEYear", "txECLS", "txECase", "txEVol", "txESeq");
            return false;
        }
    }
    return true;
}

function FocusAtEmpty()
{
    for (var argNum = 0 ; argNum < arguments.length; argNum++)
    {
        if (document.all[FocusAtEmpty.arguments[argNum]].value == "")
        {
            //1060626 Zen 1050087 二代升級            //document.all[FocusAtEmpty.arguments[argNum]].focus();
            $('#' + FocusAtEmpty.arguments[argNum]).focus();
            break;
        }
    }
}

function UserOnBlur(Userobj)
{
    if (Userobj.options == null)
    {
        document.all["txUserValue"].value = "";
        return;
    }
    if (Userobj.options.length == 0)
    {
        document.all["txUserValue"].value = "";
        return;
    }
    var index = Userobj.selectedIndex;
    if (index == -1)
    {
        document.all["txUserValue"].value = "";
        return;
    }
    document.all["txUserValue"].value = Userobj.options[index].value;
}

//Zoey [951249,95/12/06]  //由公文性質取得業務類別
function jf_Property_Onchange()
{
    if (document.all.dlDOC_PROPERTY.selectedIndex == -1) return;
    var ddlValue = document.all.dlDOC_PROPERTY.options[document.all.dlDOC_PROPERTY.selectedIndex].value;

    var param = new Array(2);
    param[0] = document.all.dlSOURCE_ORGNO.options[document.all.dlSOURCE_ORGNO.selectedIndex].value;
    param[1] = ddlValue;

    //1050811 Zen 1050700 弱掃XSS修正
    param[0] = encodeURI(param[0]);
    param[1] = encodeURI(param[1]);

    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetBTypeNo", false, param);
    iCallID_GetBTypeNo = callObj.id;
    OnWSResult(callObj);
}
function dlBTypeNo_OnChange()
{
    if (document.all.ddlBTypeNo.selectedIndex == -1)
    {
        document.all["txBTypeNo"].value = "";
        return;
    }
    document.all["txBTypeNo"].value = document.all.ddlBTypeNo.options[document.all.ddlBTypeNo.selectedIndex].value;
}
//Zoey [951249,95/12/06]  //由公文性質取得業務類別 END

//1060626 Zen 1050087 二代升級，以AJAX方式進行查詢以避開快顯封鎖function btSearchClientSideProc()
{
    var ctrlList = $(':input:not([type="image"],[type="submit"])');  //以JQuery一次取得所有可見的控制項
    var ParaList = new Array();
    var valueList = new Array();

    for (var i = 0, iMax = ctrlList.length; i < iMax; i++)
    {
        if (ctrlList[i].id)
        {
            ParaList[i] = ctrlList[i].id;
            if (ctrlList[i].type == "checkbox" || ctrlList[i].type == "radio")
                valueList[i] = ctrlList[i].checked.toString();
            else
                valueList[i] = $(ctrlList[i]).val();
        }
    }

    var rtn = EA71.EAI300.btSearchAjax(jf_GetArtifact(), ParaList, valueList);
    if (rtn.error)
    {
        return "ERR：" + rtn.error.Message;
    }
    return rtn.value;
}//1060626 Zen 1050087 二代升級，於新視窗開起子視窗function OpenDocWin(sUrl){
    SumDocWin = open(sUrl, "SumDocWin", "");
    SumDocWin.focus();
}

//1060626 Zen 1050087 二代升級，於新視窗開起子視窗function CallBackByImgView()
{
    return opener.theSSO.MP.queryDocList.CallBackByImgView();
    opener.window.focus();
}