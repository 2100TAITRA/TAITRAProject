/*
DATE	SA		PRG		MGR_NO	DESC
0981110	Stella	David	0980587	依系統參數判斷是否隱藏發文單位下拉選單
0990923 --		Davy	0990378	增加公文文號條件，公文文號及發文日期可擇一輸入
1031112	Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1040422	David	Eric	1040205 新增查詢功能(含DataGrid畫面)
1041223	David	Kevin_C	1040838	(104年法規)新增重複發文欄位開子視窗
1050714 David   Zen     1050087 二代公文修改
1060518 Leslie  Zen     1060215 innerText相關修改
1130117 David   Joe     1121044 新增電子檔檢視功能
1130221 David   Joe     1121044 修正電子檔檢視開啟方式
1140428 Joe　　 Levi　　1140090 新增Excel、ODS匯出
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050714 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//1050714 Zen 1050087 二代公文修改
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

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
		case "btSDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
			break;
		case "btEDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
			break;
	}
}

//1050714 Zen 1050087 二代公文修改
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
	
    //1050714 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		//1040422 Eric 1040205 新增查詢功能
		case "btSearch":
			if(document.all.txSDocNo.value=="" && document.all.txEDocNo.value=="" && document.all.txSDate.value=="" && document.all.txEDate.value=="")
		    {
			    alert("公文文號起訖、發文日期起訖不可均為空白!!");
			    //1050714 Zen 1050087 二代公文修改
			    //document.all.txSDate.focus();
			    $('#txSDate').focus();
				Page_BlockSubmit = true;
		    }
		    else
		    {
				Page_BlockSubmit = false;
			}
		    //1050714 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		case "btPreview":
		//1140428　Levi　　1140090　　新增Excel、ODS匯出
		case "btExcel":
		case "btODS":
		    //if(document.all.txSDate.value=="" && document.all.txEDate.value=="")
		    //0990923 [0990378] Davy 增加公文文號條件，公文文號及發文日期可擇一輸入
		    if(document.all.txSDocNo.value=="" && document.all.txEDocNo.value=="" && document.all.txSDate.value=="" && document.all.txEDate.value=="")
		    {
		    //alert("發文日期起訖不可均為空白!!");
		    alert("公文文號起訖、發文日期起訖不可均為空白!!");
		        //1050714 Zen 1050087 二代公文修改
		    //document.all.txSDate.focus();
		    $('#txSDate').focus();
		    Page_BlockSubmit = true;
		    
		    }else
		    {
			Page_BlockSubmit = false;
			}
		    //1050714 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		
		
	}
}
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1050714 Zen 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
		}
	}
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	//0981110 David 0980587 若OD_EXEC_CHECK_PRIV = N 隱藏發文單位下拉選單
	if(document.all.H_OdExecCheckPriv.value == "N")
		//trIssueByPriv.style.display = 'none';
		{
			document.all.ddlIssueByPriv.style.display = 'none';
		}
	
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
	document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
	
	//無值不顯示
	jf_HandleComboxStatus("dlSect");
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正
	//document.all[argLabelId].innerText = obj.value;
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

//0990923 [0990378] Davy 一級單位選單onblur時的檢查
function dlDept_Onblur()
{
	if (odjf_CheckComboBox("dlDept"))
	{
		//值若變更時，觸動TextChange事件
		if (document.all["dlDept_Text"].value != document.all["H_Value"].value)
		{
			document.all["H_Change"].value = document.all["dlDept_Text"].value;
		    //__doPostBack();//for .NET Framework 1.0
		    //1031112    Kevin_C[1020726]   IsServerHandling = true;放在__doPostBack下面無效，交換順序
			IsServerHandling = true;
			jf_ShowWaitState();
			__doPostBack("", "");//for .NET Framework 1.1
		}
	} 
}
//0990923 [0990378] Davy 二級單位選單onblur時的檢查
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlDept", "承辦單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
			
			odjf_SetdlDept("dlDept","dlSect","","",true,true);	//初始dlSect的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
			document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);
			
			//依選項多寡固定下拉式選單可見長度
			if(document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if(document.all["dlSect"].options.length ==1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;
				
			//無值不顯示
			jf_HandleComboxStatus("dlSect");
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlSect_Text_onblur()
{
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{
		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlSect", "承辦科別"))
		{
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if(document.all[argComboxID].options.length <=1)
		document.all[argComboxID+"_Container"].className = "hide";
	else
	    //1050714 Zen 1050087 二代公文修改
		//document.all[argComboxID+"_Container"].className = "InputFieldText";
	    document.all[argComboxID + "_Container"].className = "custom-combobox";
}

//1041223	Kevin_C	1040838	開子視窗
function fnOpenApply(argPath, argDocNo, argArtifact)
{
	var strUrl = argPath;
	strUrl += "ED3/EDR350C1.aspx?argDocNo=" + argDocNo + "&SAMLart=" + argArtifact;
	jf_OpenChildWin(strUrl, "ODR350C1", 760, 380);
}


//1130117   Joe     1121044     新增電子檔檢視功能--S
function btDocViewOnClick(argArt, argDocNo, argOrgNo, argSignType) {
	try {
		//1130221	Joe		1121044		修正開啟方式--S
        var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
        unvSrc = unvSrc.replace('#artifact#', argArt);
        unvSrc = unvSrc.replace('#DocNo#', argDocNo);
        unvSrc = unvSrc.replace(/#SourceOrgNo#/g, argOrgNo);
        var objViewDoc = {
            UNVObj: JSON.parse(unvSrc),
            docInfoPage: "AKI802",
            openDocModule: 'AOL',
            signType: argSignType,
            readOnlyMode: false,
            disableSave: true
        };
        var $docId = jf_GetSessionID() + "_" + (+new Date());
        localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
        var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + argArt + "&DocId=" + $docId;
        jf_OpenChildWin(unvUrl, "AKI802ViewDoc");
		/*
		var wsUrl = opener.theWebServices.url('fileiows');
		var param = [];
		param[0] = argArt;
		param[1] = argDocNo;
		param[2] = argOrgNo;

		var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
		if (!rtnObj.error) {
			if (rtnObj.value.m_bSuccess) {
				var sUnvObj = rtnObj.value.RtnStr;
				if (sUnvObj !== "") {
					var UnvObj = JSON.parse(sUnvObj);
					var objViewDoc = {
						UNVObj: UnvObj,
						docInfoPage: "AKI802",
						openDocModule: argSignType == "E" ? "AOL" : "UniView",
						signType: argSignType,
						readOnlyMode: false,
						disableSave: true
					};
					var $docId = jf_GetSessionID() + "_" + (+new Date());
					localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
					var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
					jf_OpenChildWin(unvUrl, "ODR350ViewDoc");
				}
			}
			else {
				alert(rtnObj.value.m_strErrMsg);
			}
		}
		else {
			alert(rtnObj.error.errorDetail.string)
		}
		*/
		//1130221	Joe		1121044		修正開啟方式--E
	} catch (e) {
		alert('開啟失敗');
	}
}
//1130117   Joe     1121044     新增電子檔檢視功能--E