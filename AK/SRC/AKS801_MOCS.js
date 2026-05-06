/*
DATE    SA		PRG		MGR_NO	        DESC
111116  Cloud   Cloud   1110861         新增身分證查詢子視窗
1120321 Cloud   Cloud   序81             修改傳入姓名直接查詢
1120627 Cloud   Cloud   --              修改call taws url 來源
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


jf_ShowValidator();

//1060420 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060420 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            //1120314 Cloud 序45 修改使用id透過ta系統撈取資料-S
            //Page_BlockSubmit = false;
            Page_BlockSubmit = true;
            //1120321   Cloud 序81 將下列行為包入函式
            //if (jf_Trim(document.all.txUserValue.value) == "") {
            //    alert('姓名不可為空白');
            //    $('#txUserValue').focus();
            //    Page_BlockSubmit = true;
            //}
            ////1120314 Cloud 序45 修改使用id透過ta系統撈取資料-S
            //else {
            //    var wsParam = new Array();
            //    wsParam[0] = document.all.txUserValue.value;
            //    var CallWsObj = jf_CallWS("../TA/TAWS.asmx", "GetNameId", false, wsParam);
            //    if (CallWsObj.value.bSuccess) {
            //        if (CallWsObj.value.Exist == "1") {
            //            //回傳資料建立畫面
            //            var CallPerWsObj;
            //            for (var iId = 0; iId < CallWsObj.value.Id.length; iId++)
            //            {
            //                //叫用ws取得資訊建立                            
            //                wsParam[0] = CallWsObj.value.Id[iId];
            //                console.log("以身分證[" + wsParam[0] + "]取得任職資訊-開始");
            //                CallPerWsObj = jf_CallWS("../TA/TAWS.asmx", "GetTBCInfo", false, wsParam);
            //                if (CallPerWsObj.value.bSuccess) {
            //                    if (CallPerWsObj.value.ErrMsg == "") {
            //                        fnAddDgRow("dg1", document.all.txUserValue.value, jf_Trim(CallPerWsObj.value.Id), jf_Trim(CallPerWsObj.value.JobOrgName));
            //                        setDgType("");
            //                    }
            //                    else
            //                        console.log("以身分證[" + wsParam[0] + "]-發生錯誤" + CallPerWsObj.value.ErrMsg);
            //                }
            //                else {
            //                    console.log("以身分證[" + wsParam[0] + "]取得任職資訊" + CallPerWsObj.value.ErrMsg);
            //                }
            //                console.log("以身分證[" + wsParam[0] + "]取得任職資訊-結束");
            //            }
            //        }
            //        else {
            //            document.all.txUserValue.value = "";
            //            setDgType("hide");
            //            $('#txUserValue').focus();
            //            alert(CallWsObj.value.ErrMsg);
            //        }
            //    }
            //    else {
            //        document.all.txUserValue.value = "";
            //        setDgType("hide");
            //        $('#txUserValue').focus();
            //        alert(CallWsObj.value.ErrMsg);
            //    }
            //}
            fnSearch();
            //jf_ToolBarSubmit(xObjectName);
            //1120314 Cloud 序45 修改使用id透過ta系統撈取資料-E
            break;
    }
}
function setDgType(argType)
{
    if (argType == "hide") {
        for (var i = document.all["dg1"].childNodes[1].childNodes.length - 1 ; i > 1; --i) {
            document.all["dg1"].childNodes[1].childNodes[i].remove();
        }
        document.all["dg1head"].className = "hide dghead";
        document.all["dg1"].className = "hide";
    }
    else {
        document.all["dg1"].className = "";
        document.all["dg1head"].className = "dghead";
    }

}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    //1120321 Cloud    序81             修改傳入姓名直接查詢
    if(document.all["txUserValue"].value!="")
        fnSearch();

}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}
//增加回傳姓名
//function ReturnValue(argIdvalue)
function ReturnValue(argIdvalue,argName)
{
    if (opener != null)
    {
        var id_nowDataGrid = document.all["activeID"].value;
        var id_secs = new Array(4);
        id_secs = id_nowDataGrid.split("_", 4);
        var idTxid = id_secs[0] + "__" + id_secs[2] + "_txFullID";
        opener.document.all[idTxid].value = argIdvalue;
        //增加回傳姓名
        var idTxName = id_secs[0] + "__" + id_secs[2] + "_txFullName";
        opener.document.all[idTxName].value = argName;
        opener.window.CallBack("AKS801_MOCS");
        close();
    }
}
//1120314 Cloud 序45 修改使用id透過ta系統撈取資料
function fnAddDgRow(arfDGid, argName, aegID, argOrgName) {
    var rowCnt = document.all[arfDGid].rows.length;
    //設定row的背景色
    //create row
    var row = document.createElement("TR");
    row.id = arfDGid + "Data" + rowCnt.toString();
    //create column
    //序
    var colSeq = document.createElement("TD");
    colSeq.setAttribute("align", "middle");
    colSeq.setAttribute("nowrap", "nowrap");
    colSeq.style.width = "1.5em";
    colSeq.className = "InputFieldLabel";
    colSeq.innerText = rowCnt;


    //身分證號
    var colid = document.createElement("TD");
    colid.setAttribute("align", "middle");
    colid.setAttribute("nowrap", "nowrap");
    colid.style.width = "5.5em";
    var cspanid = document.createElement("A");
    cspanid.id = arfDGid + "__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_hlFullID";
    cspanid.textContent = aegID;
    cspanid.href = "javascript:ReturnValue('" + aegID + "','" + argName + "')";
    colid.appendChild(cspanid);


    //姓名
    var colbORno = document.createElement("TD");
    colbORno.setAttribute("align", "middle");
    colbORno.setAttribute("nowrap", "nowrap");
    colbORno.style.width = "5em";
    var cspanbORno = document.createElement("SPAN");
    cspanbORno.id = arfDGid + "__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_lbFullName";
    cspanbORno.textContent = argName;
    cspanbORno.className = "InputFieldLabel";
    colbORno.appendChild(cspanbORno);

    //任職機關
    var colbORnoDate = document.createElement("TD");
    colbORnoDate.setAttribute("align", "middle");
    colbORnoDate.setAttribute("nowrap", "nowrap");
    colbORnoDate.style.width = "20em";
    var cspanbORnoDate = document.createElement("SPAN");
    cspanbORnoDate.id = arfDGid + "__ctl" + htmlencode((document.all[arfDGid].rows.length).toString()) + "_lbOrgName";
    cspanbORnoDate.textContent = argOrgName;
    cspanbORnoDate.className = "InputFieldLabel";
    colbORnoDate.appendChild(cspanbORnoDate);

    row.appendChild(colSeq);//序
    row.appendChild(colid);
    row.appendChild(colbORno);
    row.appendChild(colbORnoDate);
    document.all[arfDGid].children[0].appendChild(row);
}

function htmlencode(s) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
//1120321 Cloud    序81             修改傳入姓名直接查詢-S
function fnSearch()
{
    if (jf_Trim(document.all.txUserValue.value) == "") {
        alert('姓名不可為空白');
        $('#txUserValue').focus();
    }
    else {
        var wsParam = new Array();
        wsParam[0] = document.all.txUserValue.value;
        //1120627 Cloud     --              修改call taws url 來源
        //var CallWsObj = jf_CallWS("../TA/TAWS.asmx", "GetNameId", false, wsParam);
        var CallWsObj = jf_CallWS(document.all.TAWSURL.value, "GetNameId", false, wsParam);
        if (CallWsObj.value.bSuccess) {
            if (CallWsObj.value.Exist == "1") {
                //回傳資料建立畫面
                var CallPerWsObj;
                for (var iId = 0; iId < CallWsObj.value.Id.length; iId++)
                {
                    //叫用ws取得資訊建立                            
                    wsParam[0] = CallWsObj.value.Id[iId];
                    console.log("以身分證[" + wsParam[0] + "]取得任職資訊-開始");
                    //1120627 Cloud     --              修改call taws url 來源
                    //CallPerWsObj = jf_CallWS("../TA/TAWS.asmx", "GetTBCInfo", false, wsParam);
                    CallPerWsObj = jf_CallWS(document.all.TAWSURL.value, "GetTBCInfo", false, wsParam);
                    if (CallPerWsObj.value.bSuccess) {
                        if (CallPerWsObj.value.ErrMsg == "") {
                            fnAddDgRow("dg1", document.all.txUserValue.value, jf_Trim(CallPerWsObj.value.Id), jf_Trim(CallPerWsObj.value.JobOrgName));
                            setDgType("");
                        }
                        else
                            console.log("以身分證[" + wsParam[0] + "]-發生錯誤" + CallPerWsObj.value.ErrMsg);
                    }
                    else {
                        console.log("以身分證[" + wsParam[0] + "]取得任職資訊" + CallPerWsObj.value.ErrMsg);
                    }
                    console.log("以身分證[" + wsParam[0] + "]取得任職資訊-結束");
                }
            }
            else {
                document.all.txUserValue.value = "";
                setDgType("hide");
                $('#txUserValue').focus();
                alert(CallWsObj.value.ErrMsg);
            }
        }
        else {
            document.all.txUserValue.value = "";
            setDgType("hide");
            $('#txUserValue').focus();
            alert(CallWsObj.value.ErrMsg);
        }
    }
}
//1120321 Cloud    序81             修改傳入姓名直接查詢-E

