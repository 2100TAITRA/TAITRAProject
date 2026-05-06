/*
DATE	SA		PRG		MGR_NO			DESC
1060414 Cloud   Zen     1050087         二代升級
1110103 Kevin   Zen     1101292         修正多次點擊重複PostBack之問題
1110719 Cloud   Cloud   1110097         修改儲位條碼號為另存附件條碼號
1130731 Cloud   Jason   1130695         修改取得附件另存流水號附件另存有勾選且有附件名稱時才執行
1131213 David   Cloud   1130983         參照單號0990500 增加註記附件不歸檔功能
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060414 Zen 1050087 二代升級
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1060414 Zen 1050087 二代升級
    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060414 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060414 Zen 1050087 二代升級
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

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

//1060414 Zen 1050087 二代升級
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

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060414 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSave":
            Page_BlockSubmit = true;
            CheckFileValueProcess();
            var ptbDesc = "";
            var pdlRem = "";
            var ptbCnt = "";
            var pdlUnit = "";
            var pMsg = "";
            var pOldtbRemark = "", ptbRemark = ""; //儲位條碼號
            var pOldtbRemarkSeq = "", ptbRemarkSeq = ""; //儲位條碼號-序
            var pEqualRemark = true;
            var strEqualRemark = "";
            var IsFocus = true;
            //1060414 Zen 1050087 二代升級
            //for (var i = 2; i < 12; i++)
            for (var i = 2; i <= document.all.dg1.rows.length; i++)
            {
                ptbDesc = "dg1__ctl" + i + "_tbDESC";
                pdlRem = "dg1__ctl" + i + "_dlREM";
                ptbCnt = "dg1__ctl" + i + "_tbCNT";
                pdlUnit = "dg1__ctl" + i + "_dlUNIT";
                ptbRemark = "dg1__ctl" + i + "_tbRemark";
                pckAttScan = "dg1__ctl" + i + "_ckAttScan";

                if ((document.all[ptbDesc].value == "" || document.all[pdlRem].options[document.all[pdlRem].selectedIndex].value == "" || document.all[ptbCnt].value == "" || document.all[pdlUnit].options[document.all[pdlUnit].selectedIndex].value == "") && (document.all[ptbDesc].value != "" || document.all[pdlRem].options[document.all[pdlRem].selectedIndex].value != "" || document.all[ptbCnt].value != "" || document.all[pdlUnit].options[document.all[pdlUnit].selectedIndex].value != ""))
                {

                    if (document.all[ptbDesc].value == "")
                    {
                        continue;
                        /*
                            pMsg+="，附件說明欄位";
                            if (IsFocus)
                                document.all[ptbDesc].focus();
                            IsFocus=false;*/
                    }
                    pMsg += "序號" + (i - 1);

                    if (document.all[pdlRem].options[document.all[pdlRem].selectedIndex].value == "")
                    {
                        pMsg += "，媒體型式欄位";
                        if (IsFocus)
                            //1060414 Zen 1050087 二代升級
                            //document.all[pdlRem].focus();
                            $('#' + pdlRem).focus();
                        IsFocus = false;
                    }

                    if (document.all[ptbCnt].value == "")
                    {
                        pMsg += "，數量欄位";
                        if (IsFocus)
                            //1060414 Zen 1050087 二代升級
                            //document.all[ptbCnt].focus();
                            $('#' + ptbCnt).focus();
                        IsFocus = false;
                    }

                    if (document.all[pdlUnit].options[document.all[pdlUnit].selectedIndex].value == "")
                    {
                        pMsg += "，計量單位欄位";
                        if (IsFocus)
                            //1060414 Zen 1050087 二代升級
                            //document.all[pdlUnit].focus();
                            $('#' + pdlUnit).focus();
                        IsFocus = false;
                    }

                    pMsg += "不可空白\n";
                }

                /*
				//另存附件勾選狀況下檢查另存附件編號是否不同
				if(document.all[pckAttScan].checked)
				{
				    if (document.all[ptbRemark].value != "")
				    {
						if (pOldtbRemark == "") 
						{
							pOldtbRemark = document.all[ptbRemark].value;
							pOldtbRemarkSeq=i;
						}
						if (pOldtbRemark != document.all[ptbRemark].value)
						{
							pEqualRemark=false;			
							if (strEqualRemark == "")
							{
							    strEqualRemark="儲位條碼號 序:"+ (pOldtbRemarkSeq-1) + "與序:"+(i-1)+"不一致。請重新輸入或清除後由系統自動編號";
							    ptbRemarkSeq = i;
							}
						}
				    }
				}*/
            }

            if (pMsg != "")
            {
                alert(pMsg);
                Page_BlockSubmit = true;
            }
            else if (!pEqualRemark)
            {
                alert(strEqualRemark);
                ptbRemark = "dg1__ctl" + ptbRemarkSeq + "_tbRemark";
                //1060414 Zen 1050087 二代升級
                //document.all[ptbRemark].focus();
                $('#' + ptbRemark).focus();
                Page_BlockSubmit = true;
            }
            else if (!jf_CheckRemark())	//0950623 Charles 檢查儲位條碼號是否已經被其他公文所使用
                Page_BlockSubmit = true;
            else
                Page_BlockSubmit = false;
            //1060414 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btAddColumn":
            Page_BlockSubmit = false;
            //1060414 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btGetNumber":
            //1130731   Jason   1130695         修改取得附件另存流水號附件另存有勾選且有附件名稱時才執行--S
            var bCanGetNumber = false;//判斷是否可以取號
            var ptbDesc = "";
            var pckAttScan = "";
            for (var i = 2; i <= document.all.dg1.rows.length; i++)
            {
                ptbDesc = "dg1__ctl" + i + "_tbDESC";
                pckAttScan = "dg1__ctl" + i + "_ckAttScan";

                if (document.all[ptbDesc].value != "" && document.all[pckAttScan].checked) {
                    bCanGetNumber = true;
                    //1131213   Cloud   1130983 -補強前單檢查到有一筆可以作就可以停了
                    break;
                }
            }
            if (!bCanGetNumber) {
                Page_BlockSubmit = true;
                //1131213   Cloud   1130983 -補強前單不作取號時跳出訊息。
                alert("請至少勾選一筆附件名稱不為空白的資料。");
            }
            else {
                Page_BlockSubmit = false;
                //1131213   Cloud   1130983 參照0990500 跳出提醒訊息告知未歸檔公文不編號
                if (document.all["H_HasUnSendAtt"] && document.all["H_HasUnSendAtt"].value == "Y") {
                    alert("未歸檔附件不予編列另存編號。");
                }
            }
            //1130731   Jason   1130695         修改取得附件另存流水號附件另存有勾選且有附件名稱時才執行--E
            //1060414 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    //1060414 Zen 1050087 二代升級
    //jf_CallWS("lib/AK_LIB.asmx", "BubbleFun", false, null);
    ShowMsg();
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}

//1060414 Zen 1050087 二代升級
//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//    var index = document.all[argDDLId].selectedIndex;
//    var obj = document.all[argDDLId].options[index];

//    document.all[argTextBoxId].value = obj.text;
//    document.all[argLabelId].innerText = obj.value;
//}

function ReturnValue()
{
    if (opener == null) return;
    if (opener.document.all.lbReturnValue.length != 0)
    {
        var oldlength = opener.document.all.lbReturnValue.length;
        for (i = 0; i < oldlength; i++)
        {
            opener.document.all.lbReturnValue.remove(0);
        }
    }
    /*	
	opener.document.all["tbATT_SEQ"].value =document.all["dg1__ctl2_tbRemark"].value;
	opener.document.all["tbAtt_SName"].value =document.all["dg1__ctl2_tbDESC"].value;
	opener.document.all["tbAtt_SL"].value =document.all["dg1__ctl2_tbPlace"].value;
	opener.document.all["tbAttCNT"].value =document.all["dg1__ctl2_tbCNT"].value;
    */
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].text = document.all["dg1__ctl2_dlUNIT"].options[document.all["dg1__ctl2_dlUNIT"].selectedIndex].value;
    opener.document.all.lbReturnValue.options[0].value = document.all["dg1__ctl2_dlREM"].options[document.all["dg1__ctl2_dlREM"].selectedIndex].text;
    opener.window.CallBack("AKM336");
    close();
}
//mickey 03/09/27 新增
//名稱jf_dlTypeOnChanged()
//作用：1.取出編目日期
//		
function CheckFileValueProcess()
{
    var KeyName = new Array(2);
    KeyName[0] = "SOURCE_ORGNO";
    KeyName[1] = "DOC_NO";
    var KeyValue = new Array(2);
    KeyValue[0] = document.all["tbOrgNo"].value;
    KeyValue[1] = document.all["tbDocNo"].value;
    var RtnFld = new Array(1);
    RtnFld[0] = "INPFILE_DATE";
    var OrdFldName = new Array(1);
    OrdFldName[0] = "DOC_NO";
    var param = new Array(5);
    param[0] = "DOC_MAIN";
    param[1] = KeyName;
    param[2] = KeyValue;
    param[3] = RtnFld;
    param[4] = OrdFldName;
    RtnObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, param);
    //1060414 Zen 1050087 二代升級
    //document.all["tbInpFileDate"].innerText = RtnObj.value.RtnField0[0];
    document.all["tbInpFileDate"].value = RtnObj.value.RtnField0[0];
}

//0950623 Charles 檢查附件另存時，儲位條碼號是否已經被其他公文使用，若有則顯示訊息，提醒使用者是否要繼續執行儲存
//呼叫lib/AK_LIB.asmx的CheckRemarkDuplicate方法
function jf_CheckRemark()
{
    var strDocNo = document.all["_k1"].value;
    var iCount = 2;
    var strRemarkTemp = "";
    var strRemark = "";

    //檢查DataGrid中[附件另存]選項被勾選，且儲位條碼號不為空值者
    while (document.all["dg1__ctl" + iCount + "_ckAttScan"] != null)
    {
        strRemarkTemp = jf_Trim(document.all["dg1__ctl" + iCount + "_tbRemark"].value);
        if (document.all["dg1__ctl" + iCount + "_ckAttScan"].checked && strRemarkTemp != "" && strRemark.indexOf("'" + strRemarkTemp + "'") == -1)
            strRemark += "'" + strRemarkTemp + "',";
        iCount += 1;
    }

    if (strRemark == "")
        return true;

    strRemark = strRemark.substr(0, strRemark.length - 1);

    var param = new Array(2);
    param[0] = strDocNo;
    param[1] = strRemark;

    var RtnObj = jf_CallWS("lib/AK_LIB.asmx", "CheckRemarkDuplicate", false, param);

    if (jf_IsWebServiceSuccess(RtnObj))
    {
        if (RtnObj.value.RtnStr == "")
            return true;
        else
        {
            var strRtnStrs = RtnObj.value.RtnStr.split("|");
            var strRtnStr = "";
            var strConfirmMsg = "";

            for (i = 0; i < strRtnStrs.length; i++)
            {
                strRtnStr = strRtnStrs[i].split(";");
                if (strRtnStr.length == 2)
                    //1110719 Cloud   Cloud   1110097         修改儲位條碼號為另存附件條碼號
                    //strConfirmMsg += "儲位條碼號：" + strRtnStr[0] + "，已經被公文：" + strRtnStr[1] + "所使用。\n";
                    strConfirmMsg += "另存附件條碼號：" + strRtnStr[0] + "，已經被公文：" + strRtnStr[1] + "所使用。\n";
            }

            if (strConfirmMsg != "")
            {
                strConfirmMsg += "確定要儲存嗎?"
                return window.confirm(strConfirmMsg);
            }

            return true;
        }
    }
    else
        return false;
}