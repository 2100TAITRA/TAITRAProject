/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號			概要
 * -------------------------------------------------------------------------------------------------
 * 103.03.28	Eileen	1030182			清查將原使用AKC320分類號查詢改使用EAC005 * 1100204      Zen     1090927         取消使用document.activeElement
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1100204 Zen 1090927 取消使用document.activeElementvar strCallbackId = '';

//1060825	Kevin_C	1050087	升二代 -S
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();
//1060825	Kevin_C	1050087	升二代 -E

document.all.rb_ModCls.onclick = clsClick;
document.all.rb_ModCase.onclick = clsClick;
document.all.rb_ModKeepyear.onclick = clsClick;
document.all.tbNewClsNo.onblur = chk_tbNewClsNo;
document.all.tbClsNo.onblur = chk_tbClsNo;
//document.all.tbYear.onkeydown     = onlynum;
//document.all.tbFYear_B.onkeydown  = onlynum;
//document.all.tbFYear_E.onkeydown  = onlynum;
document.all.tbYear.onblur = tbYear_onblur;
document.all.tbCase.onblur = tbCase_onblur;

document.all.tbFYear_B.onblur = tbFYear_B_onblur;
document.all.tbFYear_E.onblur = tbFYear_E_onblur;
document.all.tbFCls_B.onblur = tbFCls_B_onblur;
document.all.tbFCase_B.onblur = tbFCase_B_onblur;
document.all.tbFVol_B.onblur = tbFVol_B_onblur;
document.all.tbFVol_E.onblur = tbFVol_E_onblur;

function onlynum()
{
    jf_InpNumOnly();
}

function tbFYear_B_onblur()
{
    var obj = document.all.tbFYear_B;
    if (obj.value == "") return;
    obj.value = jf_PADL(obj.value, 3, "0");

    if (document.all.tbFYear_E.readOnly == true)
        document.all.tbFYear_E.value = document.all.tbFYear_B.value;
}

function tbFYear_E_onblur()
{
    var obj = document.all.tbFYear_E;
    if (obj.value == "") return;
    obj.value = jf_PADL(obj.value, 3, "0");
}

function tbFCls_B_onblur()
{
    if (document.all.tbFCls_E.readOnly == true)
        document.all.tbFCls_E.value = document.all.tbFCls_B.value;
}

function tbFCase_B_onblur()
{
    if (document.all.tbFCase_E.readOnly == true)
        document.all.tbFCase_E.value = document.all.tbFCase_B.value;
}

function tbFVol_B_onblur()
{
    var obj = document.all.tbFVol_B;
    if (obj.value == "") return;
    obj.value = jf_PADL(obj.value, 4, "0");
}
function tbFVol_E_onblur()
{
    var obj = document.all.tbFVol_E;
    if (obj.value == "") return;
    obj.value = jf_PADL(obj.value, 4, "0");
}

function clsClick()
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;
    document.all.tbFYear_B.readOnly = false;
    document.all.tbFYear_B.className = "";
    document.all.tbFCls_B.readOnly = false;
    document.all.tbFCls_B.className = "";
    document.all.tbFCase_B.readOnly = false;
    document.all.tbFCase_B.className = "";
    document.all.tbFVol_B.readOnly = false;
    document.all.tbFVol_B.className = "";
    document.all.tbFYear_E.readOnly = false;
    document.all.tbFYear_E.className = "";
    document.all.tbFCls_E.readOnly = false;
    document.all.tbFCls_E.className = "";
    document.all.tbFCase_E.readOnly = false;
    document.all.tbFCase_E.className = "";
    document.all.tbFVol_E.readOnly = false;
    document.all.tbFVol_E.className = "";


    switch (xObjectName)
    {
        case "rb_ModCls":
            document.all.tbFCls_E.readOnly = true;
            document.all.tbFCls_E.className = "DisplayOnly";
            break;
        case "rb_ModCase":
            document.all.tbFYear_B.readOnly = true;
            document.all.tbFYear_B.className = "DisplayOnly";
            document.all.tbFCls_B.readOnly = true;
            document.all.tbFCls_B.className = "DisplayOnly";
            document.all.tbFYear_E.readOnly = true;
            document.all.tbFYear_E.className = "DisplayOnly";
            document.all.tbFCls_E.readOnly = true;
            document.all.tbFCls_E.className = "DisplayOnly";
            document.all.tbFCase_E.readOnly = true;
            document.all.tbFCase_E.className = "DisplayOnly";
            break;
        case "rb_ModKeepyear":
            break;
    }
}

//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btClsNo":	//提示分類號
        case "btClsNo2":
        case "btClsNo3":
            Page_BlockSubmit = true;
            var xUrl = "";
            //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
            /*xUrl = "AKC320.aspx";
            OpenChildWindow(xUrl);*/

            //1100204 Zen 1090927 取消使用document.activeElement            strCallbackId = xObjectName;
            xUrl = "../../EA/EA01/EAC005.aspx?nFrom=AKP340&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.tbYear.value) + "&FILE_CLS=" + jf_Trim(document.all.tbClsNo.value) + "&SAMLart=" + GetParam("SAMLart");
            jf_OpenChildWin(xUrl, "EAC005", 750, 550);
            Page_BlockSubmit = true;
            //Eileen -- end
            break;
    }
}
function OpenChildWindow(sUrl)
{
    var gChidkWinStyle = "left=0,top=0,width=790,height=540,fullscreen=no,resizable=yes,menubar=no,titlebar=no,scrollbars=yes,toolbar=no,center=yes";
    oWindowID = open(sUrl, "", gChidkWinStyle);
}

//1060825	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
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

    //1060825	Kevin_C	1050087	升二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        //1060825	Kevin_C	1050087	升二代
        // case "btOpen":
        // Page_BlockSubmit = !jf_CheckKeyObject();
        // jf_ToolBarSubmit();
        // break;
        case "btSave":
            //Page_BlockSubmit = !jf_CheckKeyObject();
            Page_BlockSubmit = !btSave_Chk();
            if (Page_BlockSubmit == false)
                //1060825	Kevin_C	1050087	升二代
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            break;
            //1060825	Kevin_C	1050087	升二代 -S
            // case "btDelete":
            // Page_BlockSubmit = !jf_ConfirmDelete();
            // jf_ToolBarSubmit();
            // break;
            // case "btCancel":
            // Page_BlockSubmit = !jf_ConfirmCancel();
            // jf_ToolBarSubmit();
            // break;
            //1060825	Kevin_C	1050087	升二代 -E
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            break;
            //1060825	Kevin_C	1050087	升二代 -S
            // case "btSearch":
            // break;
            // case "btPrint":
            // Page_BlockSubmit = !jf_ConfirmPrint();
            // break;
            // case "btPreview":
            // Page_BlockSubmit = !jf_ConfirmPreview();
            // break;
            //1060825	Kevin_C	1050087	升二代 -E
    }
}

function CallBack(argCallerId)
{
    //1030328 Eileen [1030182] 清查將原使用AKC320分類號查詢改使用EAC005 -- start
    /*
	if(argCallerId=="AKC320")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			if(document.activeElement.id == "btClsNo")//分類號批次修正-新分類號
			{
				document.all["tbNewClsNo"].value = document.all["lbReturnValue"].options[0].value;
				document.all["tbNewClsNo"].focus();
			}
			else if(document.activeElement.id == "btClsNo2")//案次號批次修正-分類號
			{
				document.all["tbClsNo"].value = document.all["lbReturnValue"].options[0].value;
				document.all["tbClsNo"].focus();
			}
			else if(document.activeElement.id == "btClsNo3")//案次號批次修正-案次號
			{
				document.all["tbCase"].value = document.all["lbReturnValue"].options[0].value;
				document.all["tbCase"].focus();
			}

			var oldlength = document.all["lbReturnValue"].length;
			for(i=0;i<oldlength;i++)
			{
				document.all["lbReturnValue"].remove(0);
			}
		}
	}*/
    //lbReturnValue[0]=年度號
    //lbReturnValue[1]=分類號
    //lbReturnValue[2]=案次號
    //lbReturnValue[3]=案次號鍵值case_key
    //lbReturnValue[4]=分類號鍵值cls_key
    //lbReturnValue[5]=版本別
    //lbReturnValue[6]=分類號名稱
    if (argCallerId == "EAC005")
    {
        if (document.all.lbReturnValue.length > 0)
        {
            //1100204 Zen 1090927 取消使用document.activeElement            //if (document.activeElement.id == "btClsNo")
            if (strCallbackId == "btClsNo")
            {
                document.all.tbNewClsNo.value = document.all.lbReturnValue.options[1].value;
                //1060825	Kevin_C	1050087	升二代
                //document.all.tbNewClsNo.focus();
                $('#tbNewClsNo').focus();
            }
            //1100204 Zen 1090927 取消使用document.activeElement            //else if (document.activeElement.id == "btClsNo2" || document.activeElement.id == "btClsNo3")
            else if (strCallbackId == "btClsNo2" || strCallbackId == "btClsNo3")
            {
                document.all.tbClsNo.value = document.all.lbReturnValue.options[1].value;
                document.all.tbCase.value = document.all.lbReturnValue.options[2].value;
                if (document.all.lbReturnValue.options[0].value != "")
                    document.all.tbYear.value = document.all.lbReturnValue.options[0].value;
            }
        }
    }

    if (document.all.lbReturnValue.options != null)//清空lbReturnValue物件
        document.all.lbReturnValue.options.length = 0;
    //Eileen -- end
}

function ClientOnLoad()
{
    //1060825	Kevin_C	1050087	升二代
    //jf_CallWS("lib/AK_LIB.asmx",null,null,null);
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
    //1060825	Kevin_C	1050087	升二代
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

function CheckClsNo(objid)
{
    //檢查分類號是否正確，若否或Call WS失敗則回傳false

    if (document.all[objid].value == "")
        return false;
    var argArray = new Array();
    argArray[0] = document.all[objid].value;
    callObj = jf_CallWS("lib/AK_LIB.asmx", "GetCKA", false, argArray);

    if (callObj.error)
    {
        alert(callObj.errorDetail.string);
        return false;
    }
    else
    {
        if (callObj.value.ErrorClass.IsErr)
        {
            alert("無此分類號!!");
            return false;
        }
        else
        {
            if (objid == "tbNewClsNo")
            {
                document.all.tbClsName2.value = callObj.value.ClsName; //分類名稱
            }
            //document.all.HiddenField_1.value = callObj.value.CLS_KEY; //分類系統號
        }
    }
    return true;
}

function chk_tbNewClsNo()
{
    //檢查分類號是否合理
    if (document.all["tbNewClsNo"].value == "")
        return;
    else if (!CheckClsNo("tbNewClsNo"))
    {
        //1060825	Kevin_C	1050087	升二代
        //document.all["tbNewClsNo"].focus();
        $('#tbNewClsNo').focus();
        Page_BlockSubmit = true;
    }
    else
        Page_BlockSubmit = false;
}
function chk_tbClsNo()
{
    //檢查分類號是否合理
    if (document.all["tbClsNo"].value == "")
        return;
    else if (!CheckClsNo("tbClsNo"))
    {
        //1060825	Kevin_C	1050087	升二代
        //document.all["tbClsNo"].focus();
        $('#tbClsNo').focus();
        Page_BlockSubmit = true;
    }
    else
        Page_BlockSubmit = false;
    document.all.tbFCls_B.value = document.all["tbClsNo"].value;
    document.all.tbFCls_E.value = document.all["tbClsNo"].value;
}

function tbYear_onblur()
{
    var obj = document.all.tbYear;
    if (obj.value == "") return;

    var len = obj.value.length;
    for (var i = len ; i < 3 ; i++)
        obj.value = "0" + obj.value;

    document.all.tbFYear_B.value = obj.value;
    document.all.tbFYear_E.value = obj.value;
}
function tbCase_onblur()
{
    var obj = document.all.tbCase;
    if (obj.value == "") return;
    var argArray = new Array();
    argArray[0] = document.all.tbYear.value;
    argArray[1] = document.all.tbClsNo.value;
    argArray[2] = obj.value;
    argArray[3] = "";
    callObj = jf_CallWS("lib/AK_LIB.asmx", "CheckCaseMain", false, argArray);
    if (callObj.error)
    {
        alert(callObj.errorDetail.string);
        return false;
    }
    else
    {
        if (callObj.value.ErrorClass.IsErr)
        {
            alert("無此案號!!");
            return false;
        }
        else
        {
            document.all.tbClsName.value = callObj.value.ClsName; //分類名稱
            document.all.tbCaseName.value = callObj.value.CaseName;//案名
            //document.all.HiddenField_2.value = callObj.value.Key; //案次系統號
        }
    }

    //document.all.tbFCase_B.value = obj.value;
    //document.all.tbFCase_E.value = obj.value;
}

function btSave_Chk()
{
    if (document.all.rb_ModKeepyear.checked == true)
    {
        if (document.all.ddlKeepYear.value == "")
        {
            alert("請選擇新保存年限");
            return false;
        }
    }

    if (document.all.rb_ModCls.checked && document.all.tbNewClsNo.value == "")
    {
        alert("請輸入新分類號");
        //1060825	Kevin_C	1050087	升二代
        //document.all.tbNewClsNo.focus();
        $('#tbNewClsNo').focus();
        return false;
    }

    if (document.all.rb_ModCase.checked && document.all.tbCase.value == "")
    {
        alert("請輸入新案次號");
        //1060825	Kevin_C	1050087	升二代
        //document.all.tbCase.focus();
        $('#tbCase').focus();
        return false;
    }

    //檔號起訖至少輸入一項
    if (document.all.tbFYear_B.value == "")
    {
        //1060825	Kevin_C	1050087	升二代
        //document.all.tbFYear_B.focus();
        $('#tbFYear_B').focus();
        alert("請至少輸入一項");
        return false;
    }

    //檢查檔號合理性
    if (CheckFileNo("tbFYear_B", "tbFCls_B", "tbFCase_B", "tbFVol_B", "") == false)
    {
        //1060825	Kevin_C	1050087	升二代
        //document.all.tbFYear_B.focus();
        $('#tbFYear_B').focus();
        return false;
    }
    if (CheckFileNo("tbFYear_E", "tbFCls_E", "tbFCase_E", "tbFVol_E", "") == false)
    {
        //1060825	Kevin_C	1050087	升二代
        //document.all.tbFYear_E.focus();
        $('#tbFYear_E').focus();
        return false;
    }
    if (CheckFileNoMatch("tbFYear_B", "tbFCls_B", "tbFCase_B", "tbFVol_B", "", "tbFYear_E", "tbFCls_E", "tbFCase_E", "tbFVol_E", "") == false)
    {
        //1060825	Kevin_C	1050087	升二代
        //document.all.tbFYear_B.focus();
        $('#tbFYear_B').focus();
        return false;
    }

    return true;
}

//1030328 Eileen [1030182] 取得SAMLart網址參數
function GetParam(p)
{
    var strUrl = document.location.toString();
    strUrl = unescape(strUrl);
    var rg_szItems = strUrl.split("?");
    if (rg_szItems.length == 2)
    {
        var rg_szItems2 = rg_szItems[1].split("&");
        for (var i = 0; i < rg_szItems2.length; i++)
        {
            var rg_items = rg_szItems2[i].split("=");
            if (rg_items[0] == "SAMLart")
                return rg_items[1];
        }
    }
}
