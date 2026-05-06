/*
DATE 	    SA		PRG		MGR_NO		DESC
1060927     David   Zen     1050087     二代升級
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060927 1050087 Zen 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1060927 1050087 Zen 二代升級    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060927 1050087 Zen 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060927 1050087 Zen 二代升級    //var xObjectName = document.activeElement.id;
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

//1060927 1050087 Zen 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
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

    //1060927 1050087 Zen 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSave":
            if (fnCheckDataGrid()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060927 1050087 Zen 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//檢查DataGrid資料列是否填完整且資料正確
function fnCheckDataGrid()
{
    var strBuf = "";
    var strDocNoStr = "";
    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        //以公文文號為主要欄位，未輸入者則該筆資料將被忽略
        var strDocNo_ID = "dg1__ctl" + i + "_txDocNo";

        //1060927 1050087 Zen 二代升級        //var strDocNo = jf_Trim(document.all[strDocNo_ID].value);
        var strDocNo = encodeURI(jf_Trim(document.all[strDocNo_ID].value));

        if (strDocNo == "")
            continue;

        strDocNoStr += strBuf + strDocNo;
        strBuf = ",";
    }

    if (strDocNoStr == "")
    {
        alert("必須至少輸入一筆資料才可儲存。");
        return false;
    }
    var arDocNo = strDocNoStr.split(",");
    arDocNo.sort();
    for (var iRow = 0; iRow < arDocNo.length - 1; iRow++)
    {
        if (arDocNo[iRow] == "") continue;
        if (arDocNo[iRow] == arDocNo[iRow + 1])
        {
            alert("輸入的公文文號[" + arDocNo[iRow] + "]重複，請修正後再儲存。");
            return false;
        }
    }

    return true;
}


function ClientOnLoad()
{
    ShowMsg();
    jf_CallWS("ODT270WS.asmx", "GetDocScoreInfo", false, null);
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}

//取得公文辦理成績資訊
function fnGetDocScoreInfo(txDocNo, lbUserName, txExpectScore, txFinalScore, txSubject)
{
    //1060927 1050087 Zen 二代升級    //var strDocNo = jf_Trim(document.all[txDocNo].value);
    var strDocNo = encodeURI(jf_Trim(document.all[txDocNo].value));

    if (strDocNo == "")
    {
        //1060927 1050087 Zen 二代升級        //document.all[lbUserName].innerText = "";
        document.all[lbUserName].tectContent = "";
        document.all[txExpectScore].value = "";
        document.all[txFinalScore].value = "";
        document.all[txSubject].value = "";
        return;
    }

    var arWSParam = new Array();
    arWSParam[0] = strDocNo;
    callObj = jf_CallWS("ODT270WS.asmx", "GetDocScoreInfo", false, arWSParam);
    if (jf_IsWebServiceSuccess(callObj))
    {
        if (!callObj.value.ErrorClass.IsErr)
        {
            var objRtn = callObj.value;
            if (objRtn.Exist)
            {
                document.all[txDocNo].value = objRtn.DocNo;
                //1060927 1050087 Zen 二代升級                //document.all[lbUserName].innerText = objRtn.UserName;
                document.all[lbUserName].textContent = objRtn.UserName;
                document.all[txExpectScore].value = objRtn.ExpectScore;
                document.all[txFinalScore].value = objRtn.FinalScore;
                document.all[txSubject].value = objRtn.Subject;
            }
            else
            {
                //1060927 1050087 Zen 二代升級                //document.all[txDocNo].focus();
                $('#' + txDocNo).focus();
                alert("公文文號[" + objRtn.DocNo + "]不存在，請重新輸入。");
                document.all[txDocNo].value = "";
                //1060927 1050087 Zen 二代升級                //document.all[lbUserName].innerText = "";
                document.all[lbUserName].textContent = "";
                document.all[txExpectScore].value = "";
                document.all[txFinalScore].value = "";
                document.all[txSubject].value = "";
            }
        }
    }
}