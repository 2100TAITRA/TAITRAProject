/*
DATE    SA      PRG     MGR_NO  DESC
960214	Stella	Shelly	000357	基港局修改
0961107 Stella  Yvonne  001573  將地址DECODE BASE64
1010220 		Kevin 			工單-基港局組改更換機關代碼
1020515	Kevin	Jagle	1000571	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
1050628 David   Justin  1050087 二代公文修改
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*1050628 Justin 1050087 二代公文修改 
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;*/

function ShowMsg()
{
    /*1050628 Justin 1050087 二代公文修改 
	if (document.all["ValidationSummary1"].innerText != "")
	    alert(document.all["ValidationSummary1"].innerText);*/
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btHelp":
		    var strUrl = "";
		    //1050713 Justin 1050087 二代公文修改--Start--
		    //strUrl = "WEM010C1.aspx?OrgID=" + document.all.h_OrgNo.value + "&K1=Dlg_Dept&Search=" + document.all.txOrgno.value;
		    var path = document.all.H_Wed010C1Path.value;
		    strUrl = path + "WEM010C1.aspx?OrgID=" + document.all.h_OrgNo.value + "&K1=Dlg_Dept&Search=" + document.all.txOrgno.value;
		    //1050713 Justin 1050087 二代公文修改--End--
			jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			Page_BlockSubmit=true;
			break;
	}	
}

//1050628 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
    //1050628 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
			if(document.all.txPositionNo.value != "")
			{
				//1010220 Kevin 工單-基港局組改更換機關代碼
				//基港局315200000M by Shelly
				//if(document.all.tx_COrgNo.value == "315200000M")
				//1020515	Jagle	[1000571]	配合組改調整，原本取CONFIG內的OrgNo改成取新參數OrgNickName進行判斷為何機關
				//if(document.all.tx_COrgNo.value == "315860100M")
				if(document.all.tx_COrgNo.value == "KLHB")
				{
					if(parseInt(document.all.txPositionNo.value) >16)
					{
						alert("列印位置必須小於等於16!!")
						Page_BlockSubmit = true;
					    /*1050628 Justin 1050087 二代公文修改
						document.all.txPositionNo.focus();*/
						$('#txPositionNo').focus();
					}
					else
					{
						Page_BlockSubmit = !CheckNotEmpty();
					}
				}
				else
				{
					if(parseInt(document.all.txPositionNo.value) >8)
					{
						alert("列印位置必須小於等於8!!")
						Page_BlockSubmit = true;
					    /*1050628 Justin 1050087 二代公文修改
						document.all.txPositionNo.focus();*/
						$('#txPositionNo').focus();
					}
					else
					{
						Page_BlockSubmit = !CheckNotEmpty();
					}				
				}
			}
			else
			{
				Page_BlockSubmit = !CheckNotEmpty();
			}
		    //1050628 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
			
	}
}
var argCallerId;
function CallBack(argCallerId)
{
	if (argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
	    //1050713 Justin 1050087 二代公文修改
	    //var DeptArray = DeptInfo.split(',');
		var DeptArray = DeptInfo.split('^');
		if(DeptArray.length > 0)
		{
			document.all["txOrgName"].value = jf_Trim(DeptArray[1]);
			document.all["txOrgno"].value = jf_Trim(DeptArray[2]);
			document.all["txPostCode"].value = jf_Trim(DeptArray[6]);
			document.all["txAddress"].value = utf8to16(base64decode(jf_Trim(DeptArray[7]))); //Yvonne
			
		}		
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}


var wsGetOrgNameID;//宣告webserver回傳值id
function CheckOrgNo()
{
	var strOrgno = jf_Trim(document.all["txOrgno"].value);
	if (strOrgno=="")	return;
	var wsParam = new Array();
	wsParam[0] = strOrgno;
	wsParam[1] = document.all.h_OrgNo.value;
	wsParam[2] = document.all.h_DeptNo.value;
	wsParam[3] = document.all.h_UserId.value;
	
	var CallWsObj = jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,wsParam);
	
	//檢查執行是否成功
	if(jf_IsWebServiceSuccess(CallWsObj))
	{		
		if(!CallWsObj.value.ErrorClass.IsErr)
		{
			if(CallWsObj.value.Count > 0)
			{
				if(jf_Trim(CallWsObj.value.OrgID[0])!="")
					document.all.txOrgno.value = jf_Trim(CallWsObj.value.OrgID[0]);
				document.all.txOrgName.value = jf_Trim(CallWsObj.value.OrgName[0]);
				document.all.txPostCode.value = jf_Trim(CallWsObj.value.PostNo[0]);
				document.all.txAddress.value = jf_Trim(CallWsObj.value.Address[0]);
			}
		}
	}
}
function OnWSResult(argResult)
{
        
}

function ClientOnLoad()
{
    /*1050628 Justin 1050087 二代公文修改 移除無用jf_CallWS
	jf_CallWS("lib/OD_LIB.asmx", "GetUnitInfo", false, null);
	jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, null);//共用function jf_CheckDataExist必要*/
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	/*1050628 Justin 1050087 二代公文修改
	document.all[argLabelId].innerText = obj.value;*/
	document.all[argLabelId].textContent = obj.value;
}

function CheckNotEmpty()
{
	if (jf_Trim(document.all.txOrgno.value) == "")
	{
	    alert("受文機關不可為空白!!")
	    /*1050628 Justin 1050087 二代公文修改
		document.all.txOrgno.focus();*/
	    $('#txOrgno').focus();
		return false;
	}
	return true;
}
//decode base64
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	/* c1 */
	do {
	    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c1 == -1);
	if(c1 == -1)
	    break;

	/* c2 */
	do {
	    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
	} while(i < len && c2 == -1);
	if(c2 == -1)
	    break;

	out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

	/* c3 */
	do {
	    c3 = str.charCodeAt(i++) & 0xff;
	    if(c3 == 61)
		return out;
	    c3 = base64DecodeChars[c3];
	} while(i < len && c3 == -1);
	if(c3 == -1)
	    break;

	out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

	/* c4 */
	do {
	    c4 = str.charCodeAt(i++) & 0xff;
	    if(c4 == 61)
		return out;
	    c4 = base64DecodeChars[c4];
	} while(i < len && c4 == -1);
	if(c4 == -1)
	    break;
	out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }

    return out;

}



function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
	c = str.charCodeAt(i++);
	switch(c >> 4)
	{ 
	  case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	    // 0xxxxxxx
	    out += str.charAt(i-1);
	    break;
	  case 12: case 13:
	    // 110x xxxx   10xx xxxx
	    char2 = str.charCodeAt(i++);
	    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	    break;
	  case 14:
	    // 1110 xxxx  10xx xxxx  10xx xxxx
	    char2 = str.charCodeAt(i++);
	    char3 = str.charCodeAt(i++);
	    out += String.fromCharCode( ((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) |  ((char3 & 0x3F) << 0));
	    break;
	}
    }

    return out;
}