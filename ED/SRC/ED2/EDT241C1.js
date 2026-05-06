/*
DATE	SA		PRG		MGR_NO			DESC
1131011 Kevin	Kevin	1130916			弱掃修正
*/

window.onload = ClientOnLoad;
//1120424 Zen 1120211 二代升級
//var openerObj = window.dialogArguments;

//1120424 Zen 1120211 二代升級
window.onbeforeunload = ClientBeforeUnload;

var openerObj = window.argRtn;
var oDocAll = document.all;
var CurrDeptNoList = new Array();
var CurrDeptNameList = new Array();
//1040814	Cloud	[1040614]	增加傳入角色
var CurrRoleNoList = new Array();
var CurrRoleNameList = new Array();

function ClientOnLoad()
{
    var OrgCount = openerObj.rtnVal[0].length;

    CurrDeptNoList = openerObj.rtnVal[0];
    CurrDeptNameList = openerObj.rtnVal[1];
    //1040814	Cloud	[1040614]	增加傳入角色
    CurrRoleNoList = openerObj.rtnVal[2];
    CurrRoleNameList = openerObj.rtnVal[3];

    var strHead = "<TABLE cellSpacing='1' cellPadding='1' width='100%' border='0' bgcolor='#ddffee'>"
        + "<TBODY>"
        ;
    var strTail = "</TBODY>"
        + "</TABLE>"
        ;
    var str = "";
    var nIdx = 0;

    //1131011 Kevin 1130941 XSS修正
    document.all["PageTitle"].innerHTML = "接管人員[<font color='#FF0000'>" + htmlencode(openerObj.strMsg) + "</font>]有二個以上的單位可以設定，請由下表中選擇要移交的單位。"

    for (var i = 0; i < OrgCount; i++)
    {
        var trbgc = (i % 2 == 0) ? document.all["ItemStyleColor"].value : document.all["AlterItemStyleColor"].value;
        nIdx++;

        //1131011 Kevin 1130941 XSS修正
        var orgStr = "<TR style='background-color: " + htmlencode(trbgc) + ";cursor:Hand;font-family:細明體;font-size:Small;' onClick=fnReturn('" + i + "') >"
            + "<TD width='15' align='center'>" +htmlencode(nIdx) + "</TD>"
            + "<TD width='150' align='left'><span id='txOrgName' size='38');\">\t" + htmlencode(CurrDeptNameList[i]) + "</span></TD>"
            + "<TD width='100' align='left'><span id='txOrgName' size='38');\">\t" + htmlencode(CurrRoleNameList[i]) + "</span></TD>"
            + "</TR>"
            ;
        str += orgStr;
    }
    EditGrp.innerHTML = strHead + str + strTail;

    document.all["TitleTr"].bgColor = document.all["HeaderStyle"].value
    document.all["TitleTr"].borderColor = document.all["BorderStyleColor"].value

}

//1131011 Kevin 1130941 XSS修正
function htmlencode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

function fnReturn(IdxDeptNo)
{
    //1120424 Zen 1120211 二代升級--begin
    //openerObj.rtnVal[0] = CurrDeptNoList[IdxDeptNo];
    //openerObj.rtnVal[1] = CurrDeptNameList[IdxDeptNo];
    ////1040814	Cloud	[1040614] 增加選擇的回傳角色帳號及名稱
    //openerObj.rtnVal[2] = CurrRoleNoList[IdxDeptNo];
    //openerObj.rtnVal[3] = CurrRoleNameList[IdxDeptNo];

    //returnValue = openerObj;
    //self.close();
    opener.document.all.lbReturnValue.length = 5
    opener.document.all.lbReturnValue.options[0].value = CurrDeptNoList[IdxDeptNo];
    opener.document.all.lbReturnValue.options[1].value = CurrDeptNameList[IdxDeptNo];
    opener.document.all.lbReturnValue.options[2].value = CurrRoleNoList[IdxDeptNo];
    opener.document.all.lbReturnValue.options[3].value = CurrRoleNameList[IdxDeptNo]; openerObj.strMsg
    opener.document.all.lbReturnValue.options[4].value = openerObj.strMsg
    opener.window.CallBack("EDT241C1");
    self.close();
    //1120424 Zen 1120211 二代升級--end
}

//1120424 Zen 1120211 二代升級
function ClientBeforeUnload()
{
    if (opener.document.all.lbReturnValue.length == 0)
    {
        opener.document.all.lbReturnValue.length = 4
        opener.document.all.lbReturnValue.options[0].value = CurrDeptNoList[0];
        opener.document.all.lbReturnValue.options[1].value = CurrDeptNameList[0];
        opener.document.all.lbReturnValue.options[2].value = CurrRoleNoList[0];
        opener.document.all.lbReturnValue.options[3].value = CurrRoleNameList[0];
        opener.document.all.lbReturnValue.options[4].value = openerObj.strMsg
    }
}