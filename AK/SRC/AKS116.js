/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期		    修改人	 單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2009.09.24	Jane	0980391	承辦單位下拉選單符合二層式架構
 *
 * 2012.05.31	Cloud	1010503	應因VISTA系統，使用者可能無權限在C:下增加瀏覽文件檔案，修改為將檔案置於C:/2100/TEMP
 * 2013.03.01	Jagle	1011039	純檔管系統時，線上瀏覽改為使用UNIVIEW
 * 2017.03.10	Kevin_C	1050087	升二代
 * 1060605      Zen     1060450 於列管中之公文前增加*作區別
 * 1060619		Kevin_C 1060456 弱掃Client Potential Code Injection修正
 * 1070511		Justin	1070303	[客委會]查詢結果不限制筆數，及產出報表PDF、Excel、ODS
 * 1100202		Cloud	1090927	修改支援Safari，移除document.activeElement，調整超連結回傳物件
 * 2021.03.17 	Cloud 	1100231 透過資料列點擊線上瀏覽功能
 * 2021.10.28   Cloud   --      修正承辦人選單postback後由一級單位承辦人變為二級單位承辦人問題
 * 2022.06.27   Cloud   1110371 升級純檔管環境線上瀏覽
 * 1130327		Joe		序60	針對特殊符號Decode
 * 1131017		Leslie	序232	[中榮]增修AKS116支援多文瀏覽
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;
var strWindowName="";
var strDPPName = "";
//* 2021.10.28   Cloud   --      修正承辦人選單postback後由一級單位承辦人變為二級單位承辦人問題
var CallWS_ID_SECT="";

//1060310	Kevin_C	1050087	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
window.onunload = jf_WindowOnUnLoad;

function ShowMsg()
{
	//1060310	Kevin_C	1050087	升二代
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator()
}
//* 2022.06.27   Cloud   1110371 升級純檔管環境線上瀏覽
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

var iCallID_View = null;
//* 1100202		Cloud	1090927	修改支援Safari，移除document.activeElement
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//* 1100202		Cloud	1090927	修改支援Safari，移除document.activeElement
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
		case "btKeyHelp1": 
		    var pUrl = "";
		    pUrl = "AKT116C3.aspx?k1=1"
			jf_OpenChildWin(pUrl, "AKT116C3", 750, 500);
			Page_BlockSubmit=true;
			break;
		case "btKeyHelp2": 
		    var pUrl = "";
		    pUrl = "AKT116C3.aspx?k1=2"
			jf_OpenChildWin(pUrl, "AKT116C3", 750, 500);
			Page_BlockSubmit=true;
			break;
		case "btAll"://全選
			Page_BlockSubmit = true;
			var strObjName = "";
			var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			for (i=2;i<pDg1Len;i++)
			{
				if(document.all.rbViewFile.checked)
					strObjName = "dg1__ctl"+i+"_cbView";
				else
					strObjName = "dg1__ctl" + i + "_cbSelect";
				//1060310	Kevin_C	1050087	升二代
				//if (document.all[strObjName].isDisabled) continue;
				if (document.all[strObjName].disabled) continue;
				document.all[strObjName].checked=true;
			}
			break;
		case "btClear"://清除
			Page_BlockSubmit = true;
			var strObjName = "";
			var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			for (i=2;i<pDg1Len;i++)
			{
				if(document.all.rbViewFile.checked)
					strObjName = "dg1__ctl"+i+"_cbView";
				else
					strObjName = "dg1__ctl" + i + "_cbSelect";
				//1060310	Kevin_C	1050087	升二代
				//if (document.all[strObjName].isDisabled) continue;
				if (document.all[strObjName].disabled) continue;
				document.all[strObjName].checked=false;
			}
			break;
		case "btRever"://反向
			Page_BlockSubmit = true;
			var strObjName = "";
			var pDg1Len = document.all.dg1.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			for (i=2;i<pDg1Len;i++)
			{
				if(document.all.rbViewFile.checked)
					strObjName = "dg1__ctl"+i+"_cbView";
				else
					strObjName = "dg1__ctl" + i + "_cbSelect";
				//1060310	Kevin_C	1050087	升二代
				//if (document.all[strObjName].isDisabled) continue;
				if (document.all[strObjName].disabled) continue;
				if (document.all[strObjName].checked)
					document.all[strObjName].checked=false;
				else
					document.all[strObjName].checked=true;
			}
			break;
	}	
}

//1060310	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	var intSelDocFile;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1060310	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	Page_BlockSubmit = false;
	switch (xObjectName)
	{
		case "btSave": //確定
			Page_BlockSubmit = true;
			IsServerHandling = true;
			//1060823	Leslie	增加滑鼠外觀調整
			$('html,input,a').css('cursor','wait');

			if(opener.document.all.lbReturnValue.length !=0)
			{
				var oldlength = opener.document.all.lbReturnValue.length;
				for(i=0;i<oldlength;i++)
				{
					opener.document.all.lbReturnValue.remove(0);
				}
			}
			
			var strDocNoList = "";
			var count=0;
			var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			for (i=2;i<pDg1Len;i++)
			{
				if (document.all["dg1__ctl"+i+"_cbSelect"].checked)
				{	
					if (strDocNoList!="")
						strDocNoList+=",";
				    //1060605 Zen 1060450 回傳母視窗時將*去除
					//strDocNoList += document.all["dg1__ctl" + i + "_hlDocNo"].innerText + "-" + document.all.lbComNo.options[i].text;
					strDocNoList += document.all["dg1__ctl" + i + "_hlDocNo"].innerText.replace('*', '') + "-" + document.all.lbComNo.options[i].text;
					count++;
				}
			}
			if (count==0)
			{
				alert("請勾選資料帶回!");
				IsServerHandling = false;
				//1060823	Leslie	增加滑鼠外觀調整
				$('html,input,a').css('cursor','');
				return;
			}
			
			opener.document.all.lbReturnValue.length = count;
			
			//花的時間，用array也是很久...因為callback中執行很多javascript
			//var strDocNoList = document.all["tbDocNoForTakeBack"].value;
			var arrDocData = new Array(count);
			arrDocData = strDocNoList.split(",");
			
			for(i=0;i<count;i++)
			{
				var pNo = new Array(2);
				pNo = arrDocData[i].split("-");
				opener.document.all.lbReturnValue.options[i].text = pNo[1];
				//opener.document.all.lbReturnValue.options[i].value = document.all["dg1__ctl"+(i+2)+"_hlDocNo"].innerText;
				opener.document.all.lbReturnValue.options[i].value = pNo[0];
				if (pNo[0]!="" && pNo[1]!="" && pNo[0]!=pNo[1])
				{
					if (opener.document.all["tbComNo"].value!="")
						opener.document.all["tbComNo"].value+=",";
					opener.document.all["tbComNo"].value+="'"+pNo[0]+"'";
				}
			}
			
			if(count > 0)
			{
				opener.window.CallBack("AKS116");
				close();
			}
			else
				//1060823	Leslie	增加滑鼠外觀調整
				$('html,input,a').css('cursor','');
			break;
		case "btSearch":
		//1070511 Justin [1070303]新增產出報表PDF、Excel、ODS
		case "btPreview":
	    case "btExcel":
	    case "btODS":
			if(document.all["txDateS"].value=="" && document.all["txDateE"].value=="" && document.all["txLotNoS"].value=="" && document.all["txLotNoE"].value=="")
			{
					Page_BlockSubmit = true;
					alert("歸檔批號、歸檔日期至少需輸入一項");
					//1060310	Kevin_C	1050087	升二代
					//document.all["txLotNoS"].focus();
					$('txLotNoS').focus();
					return;
			}
			
			if(document.all["txDateS"].value!="" || document.all["txDateE"].value!="")
			{
				if(parseInt(document.all["txDateS"].value,10)>parseInt(document.all["txDateE"].value,10))
				{
					Page_BlockSubmit = true;
					alert("歸檔日期起不可以大於迄!!");
					//1060310	Kevin_C	1050087	升二代
					//document.all["txDateS"].focus();
					$('txDateS').focus();
				}	
			}
			
			//Ericks start 2005/10/07			
			if ( strWindowName == "AKT116" )
				document.all["tbHideDocNo"].value=opener.document.all.tbSaveDocNo.value;
			//Ericks end 2005/10/07					
			//1060310	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":  //檢視電子檔
			var strDocNo = "";
			var strDocNoList = "";
			var strObjName = "";
			var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
			var intSelDocFile=0;
			
			for(var i=2;i<pDg1Len;i++) //第1筆為2
			{
				strObjName = "dg1__ctl"+i+"_cbView";
				if (!document.all[strObjName].checked) continue;
				strDocNo ="dg1__ctl"+i+"_hlDocNo";
				if(strDocNoList != "") strDocNoList +=",";
			    //1060605 Zen 1060450 於線上瀏覽前將*號去除
				//strDocNoList += document.all[strDocNo].innerText;
				strDocNoList += document.all[strDocNo].innerText.replace('*', '');
				intSelDocFile += 1;
			}
			
			if(strDocNoList =="")
			{
				alert("檢視欄位至少需勾選一筆明細資料");
				if(pDg1Len > 2)
					//1060310	Kevin_C	1050087	升二代
					//document.all["dg1__ctl2_cbView"].focus();
					$('dg1__ctl2_cbView').focus();
				Page_BlockSubmit = true;
				return;
			}
			else
			{
				//1020301	Jagle	[1011039]	判斷是否為純檔管系統決定如何進行瀏覽
				if(document.all.USE_T2100_OD.value == "1")
				{
					//strDPPName = "C:\\" + jf_GetSessionID() + ".dpp";			
					// 2012.05.31	Cloud	1010503	應因VISTA系統，使用者可能無權限在C:下增加瀏覽文件檔案，修改為將檔案置於C:/2100/TEMP
					//1060310	Kevin_C	1050087	升二代 -S
					// var fso = new ActiveXObject("Scripting.FileSystemObject");
					// if(!fso.FolderExists("C:\\2100\\TEMP\\")) //目的資料夾不存在時建立資料夾
					// fso.CreateFolder("C:\\2100\\TEMP\\");
					// strDPPName = "C:\\2100\\TEMP\\" + jf_GetSessionID() + ".dpp";			
					// WriteDPPFile(intSelDocFile, strDocNoList, strDPPName);
					// var artifact = GetParam("SAMLart");
					// document.all.ocx.SetTargetUser(artifact);
					// var ret = document.all.ocx.InvokeAOL(strDPPName);
					Page_BlockSubmit = true;
					var Artifact = GetParam("SAMLart");
					var OrgNo = jf_Trim(document.all.H_txOrgNo.value);
					var DocNo = strDocNoList.split(",");
					//1131017	Leslie[中榮序232]	增修AKS116支援多文瀏覽
					/*if (DocNo.length > 1) {
						alert("線上瀏覽不支援多筆公文");
						ChooseOne("");
					}
					else
						DownloadDocument(Artifact, strDocNoList, OrgNo);*/
					ViewDocList(DocNo, Artifact, OrgNo);
					//1060310	Kevin_C	1050087	升二代 -E
				}
				else
				{
					document.all.DOC_CHECK.value = strDocNoList;
					Page_BlockSubmit = false;
					//1060310	Kevin_C	1050087	升二代
					//jf_ToolBarSubmit();
					jf_ToolBarSubmit(xObjectName);
				}
				
			}
			break;
		case "btClean":  //清除
			Page_BlockSubmit = true;
			if (jf_ConfirmClean())
			{
				document.all.cbPaperFile.checked = true;
				document.all.cbEPaper.checked = true;
				document.all.cbNotEcFile.checked = true;
				
				document.all.cbOk.checked = true;
				document.all.cbErr.checked = true;
				document.all.cbSec.checked = true;
				document.all.cbNor.checked = true;
				document.all.rbOrderDocNo.checked = true;
				document.all.rbAcpSelect.checked = true;
				document.all.dlSend.selectedIndex = -1;
				document.all.dlSend.value = "";
				document.all.dlDept.selectedIndex = -1;
				document.all.dlDept.value = "";
				document.all.dlUser.selectedIndex = -1;
				document.all.dlUser.value = "";

				document.all["dg1"].className = "hide";
				//1060310	Kevin_C	1050087	升二代 -S
				document.all["dgTool"].className = "hide";
				document.all["dg1head"].className = "hide";
				//1060310	Kevin_C	1050087	升二代 -E
			}
			break;

	}
}


function WriteDPPFile(argSelDocFile, argDocNoList, argDPPName)
{

	var arrDocData = new Array(argSelDocFile);
	var xOutDoc = new ActiveXObject("MSXML2.DOMDocument");
	var pXmlNode;

	arrDocData = argDocNoList.split(",");

	pUrlStr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n\r<root>\n\r</root>"
	xOutDoc.loadXML(pUrlStr);
	for(var i=0; i<arrDocData.length; i++)
	{
		pXmlNode = xOutDoc.createElement("DOC_NO");
		pXmlNode.text = arrDocData[i];
		xOutDoc.documentElement.appendChild(pXmlNode);
	}

	xOutDoc.save(argDPPName);
}

function CallBack(argCallerId)
{
	if(argCallerId == "AKT116C31")
	{
		document.all.txLotNoS.value = document.all.lbReturnValue.options[0].text;
		document.all.lbReturnValue.length = 0;
		//1060310	Kevin_C	1050087	升二代
		//document.all.txLotNoS.focus();
		$('txLotNoS').focus();
	}
	if(argCallerId == "AKT116C32")
	{
		document.all.txLotNoE.value = document.all.lbReturnValue.options[0].text;
		document.all.lbReturnValue.length = 0;
		//1060310	Kevin_C	1050087	升二代
		//document.all.txLotNoE.focus();
		$('txLotNoE').focus();
	}
}
function htmldecode(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    return div.innerText || div.textContent;
}

function ClientOnLoad()
{
	SetComBoBoxTabIndex();
	//1060310	Kevin_C	1050087	升二代 -S
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//jf_CallWS("lib/AK_LIB.asmx","BubbleFun"  ,false,  null);
	//1060310	Kevin_C	1050087	升二代 -E
	ShowMsg();
    //0980924 下拉選單於postback後重新設定值[0980391]-Jane
	//* 2021.10.28   Cloud   --      修正承辦人選單postback後由一級單位承辦人變為二級單位承辦人問題
	/*if(document.all.OdFlowType)
	{
		if(document.all.OdFlowType.value =="2")
			CheckddlIsPostBack();
	}*/
	/*var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
	for (i=2;i<pDg1Len;i++)
	{
		document.all["dg1__ctl" + i + "_lbDocFromSubject"].textContent=htmldecode(document.all["dg1__ctl" + i + "_lbDocFromSubject"].textContent);
	}*/
	//1130327	Joe		序60	針對特殊符號Decode
	if(document.all.dg1)
	{
		var pDg1Len = document.all.dg1.rows.length+1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
		for (i=2;i<pDg1Len;i++)
		{
			document.all["dg1__ctl" + i + "_lbDocFromSubject"].value=htmldecode(document.all["dg1__ctl" + i + "_lbDocFromSubject"].value);
		}
	}
}

function OnWSResult(argResult)
{
	if(argResult.id == iCallID_View)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(argResult.value.RtnStr != "" && argResult.value.RtnStr != "NO IDEA ERROR")
			{
				//Open Unview File
				window.open(argResult.value.RtnStr);
			}
			else
			{
				alert('檢視電子檔失敗');
			}
		}
	}
	else if(argResult.id == CallWS_ID_SECT)//0980924 呼叫取得二級單位下拉選單[0980391]-Jane
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			WSResult = argResult.value;		
			
			//1060310	Kevin_C	1050087	升二代，修正COMBOBOX按鈕太長，及樣式不正確的問題 -S
			//document.all["dlSect_Container"].className = "";
			//document.all["dlSect"].className = "";
			//document.all["dlSect_Text"].className = "";
			//1060310	Kevin_C	1050087	升二代，修正COMBOBOX按鈕太長，及樣式不正確的問題 -E
			
			document.all["dlSect_Text"].value = "";
		    //* 2021.10.28   Cloud   --      修正承辦人選單postback後由一級單位承辦人變為二級單位承辦人問題
			document.all["H_dlSect_Info"].value = "";
			
			while(document.all.dlSect.options[0] != null)
			{
				document.all.dlSect.options[0]=null;				
			}
			
			if(WSResult.SecNo.length != 0)
			{
				//清除二級單位下拉選單的值
				ClearDL(document.all["dlSect"]);
				ClearDL(document.all["dlUser"]);					
			    //判斷一級單位欄位是否有選取值
			    //* 2021.10.28   Cloud   --      修正承辦人選單postback後由一級單位承辦人變為二級單位承辦人問題
				document.all["H_dlUser_Info"].value = "";
			    
				
				if(document.all["dlDept"].value != "")
				{
					var Blank_Data = document.createElement("OPTION");
					Blank_Data.text = "(僅含一級單位)";
					var strTemp = new Array();
					strTemp = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');
					Blank_Data.value = strTemp[0];				
					document.all.dlSect.options.add(Blank_Data);
				    //* 2021.10.28   Cloud   --      修正承辦人選單postback後由一級單位承辦人變為二級單位承辦人問題
					document.all["H_dlSect_Info"].value += "(僅含一級單位);" + strTemp[0];
					for(var i=0;i<WSResult.SecNo.length;i++)
					{
						var SectDropListChild = document.createElement("OPTION");
						SectDropListChild.text = WSResult.SecName[i];
						SectDropListChild.value = WSResult.SecNo[i];
						document.all.dlSect.options.add(SectDropListChild);
					    //* 2021.10.28   Cloud   --      修正承辦人選單postback後由一級單位承辦人變為二級單位承辦人問題
						document.all["H_dlSect_Info"].value += "|" + SectDropListChild.text + ";" + SectDropListChild.value;
					}
					//設定下拉選單長度
					if(document.all["dlSect"].options.length > 10)
						document.all["dlSect"].size = 10;
					else if(document.all["dlSect"].options.length ==1)
						document.all["dlSect"].size = 2;
					else
						document.all["dlSect"].size = document.all["dlSect"].options.length;
						
					//1060310	Kevin_C	1050087	升二代，修正無二級單位時無法取得承辦人的問題 -S
					//if(document.all["dlDept"].selectedIndex != -1)
					//{
					//	var strDept = new Array();
					//	strDept = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');
					//	//取承辦人
					//	var param2 = new Array(1);
					//	param2[0] = jf_Trim(strDept[0]);	
					//	RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDeptAllUsers",false,param2);
					//	CallWS_ID_Emp1 = RtnObjSect.id;
					//	OnWSResult(RtnObjSect);
					//}
					//1060310	Kevin_C	1050087	升二代，修正無二級單位時無法取得承辦人的問題 -E
				}
			}
			else
			{				
				while(document.all.dlSect.options[0] != null)
				{
					document.all.dlSect.options[0]=null;				
				}
				while(document.all.dlUser.options[0] != null)
				{
					document.all.dlUser.options[0]=null;				
				}	
			}
			//1060310	Kevin_C	1050087	升二代，修正無二級單位時無法取得承辦人的問題 -S
			if (document.all["dlDept"].selectedIndex != -1) {
				var strDept = new Array();
				strDept = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');
				//取承辦人
				var param2 = new Array(1);
				//1060613 Kevin_C 1060456 弱掃Client Potential Code Injection修正
				//param2[0] = jf_Trim(strDept[0]);
				param2[0] = encodeURI(jf_Trim(strDept[0]));
				RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx", "GetDeptAllUsers", false, param2);
				CallWS_ID_Emp1 = RtnObjSect.id;
				OnWSResult(RtnObjSect);
			}
			//1060310	Kevin_C	1050087	升二代，修正無二級單位時無法取得承辦人的問題 -E
		}				
    }
    else if(argResult.id == CallWS_ID_Emp1)//0980924 呼叫取得承辦人下拉選單[0980391]-Jane
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			WSResult = argResult.value;	
			
			document.all["dlUser_Text"].value = "";
		    //* 2021.10.28   Cloud   --      修正承辦人選單postback後由一級單位承辦人變為二級單位承辦人問題
			document.all["H_dlUser_Info"].value = "";
			
			while(document.all.dlUser.options[0] != null)
			{
				document.all.dlUser.options[0]=null;				
			}
			
			if(WSResult.UserName.length != 0)
			{
				if(WSResult.UserName[0] != "false" && WSResult.UserName[WSResult.UserName.length-1] != "false")
				{
					//清除承辦人下拉選單的?
					ClearDL(document.all.dlUser);			
				
					var Blank_Data = document.createElement("OPTION");
					Blank_Data.text = "";
					Blank_Data.value = ":::";
					document.all.dlUser.options.add(Blank_Data);
				    //* 2021.10.28   Cloud   --      修正承辦人選單postback後由一級單位承辦人變為二級單位承辦人問題
					document.all["H_dlUser_Info"].value = ";" + Blank_Data.value;
									
					for(var i=0;i<WSResult.UserName.length;i++)
					{
						var EmpDropListChild = document.createElement("OPTION");
						EmpDropListChild.text = WSResult.EmpName[i];
						EmpDropListChild.value = WSResult.DeptNo[i] + ":" + WSResult.SectNo[i] + ":" + WSResult.UserName[i];
						document.all.dlUser.options.add(EmpDropListChild);
					    //* 2021.10.28   Cloud   --      修正承辦人選單postback後由一級單位承辦人變為二級單位承辦人問題
						document.all["H_dlUser_Info"].value += "|" + EmpDropListChild.text + ";" + EmpDropListChild.value;
					}
					if(document.all["dlUser"].options.length > 10)
						document.all["dlUser"].size = 10;
					else if(document.all["dlUser"].options.length ==1)
						document.all["dlUser"].size = 2;
					else
						document.all["dlUser"].size = document.all["dlUser"].options.length;
				}
			}
			else//若無此科別，則清空dlUser資訊
			{
				if (document.all["dlSect_Text"].value !="")
					ClearDL(document.all.dlUser);
			}			
		}
	}
}

function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}
//* 1100202		Cloud	1090927	修改支援Safari，移除document.activeElement
//function ReturnValue()
function ReturnValue(argDocNo)
{
	if(opener == null) return;
    if(opener.document.all.lbReturnValue.length !=0)
	{
		var oldlength = opener.document.all.lbReturnValue.length;
		for(i=0;i<oldlength;i++)
		{
			opener.document.all.lbReturnValue.remove(0);
		}
	}
    opener.document.all.lbReturnValue.length = 1;
    for (var i=0;i<document.all.lbComNo.length;i++)
    {
		//* 1100202		Cloud	1090927	修改支援Safari，移除document.activeElement
    	//if (document.all.lbComNo.options[i].value==document.activeElement.innerText)
    	if (document.all.lbComNo.options[i].value == argDocNo)
		{
		    //1060605 Zen 1060450 回傳母視窗時將*去除
		    //opener.document.all.lbReturnValue.options[0].text = document.all.lbComNo.options[i].text;
		    opener.document.all.lbReturnValue.options[0].text = document.all.lbComNo.options[i].text.replace('*', '');
			break;
		}
    }
    //1060605 Zen 1060450 回傳母視窗時將*去除
    //opener.document.all.lbReturnValue.options[0].value = document.activeElement.innerText;
	//* 1100202		Cloud	1090927	修改支援Safari，移除document.activeElement
	//opener.document.all.lbReturnValue.options[0].value = document.activeElement.innerText.replace('*', '');
    opener.document.all.lbReturnValue.options[0].value = argDocNo;
    opener.window.CallBack("AKS116");
    close();
}

function GetDocNo()
{
	document.all["tbHideDocNo"].value=opener.document.all.tbSaveDocNo.value;
	document.AKS116.submit();
}

function TbOnBlur(strObjName)
{
	var pVal1 = "";
	
	if(strObjName == "txDateS" || strObjName == "txDateE")
	{
		pVal1=jf_Trim(document.all[strObjName].value);
		if(pVal1!="")
		{
			document.all[strObjName].value = jf_PADL(pVal1,7,"0");
			if (!jf_CheckCDATE(pVal1))
			{
				alert("日期格式錯誤："+pVal1);
				//1060310	Kevin_C	1050087	升二代
				//document.all[strObjName].focus();
				$(strObjName).focus();
				return;
			}
		}
		return;
	}
}

//呼叫錯誤訊息子視窗
function jf_OpenAKT116C2(argDocNo)
{
	var xUrl = "AKT116C2.aspx?k1="+argDocNo;
	jf_OpenChildWin(xUrl,"AKT116C2",500,300);
}

function SetComBoBoxTabIndex()
{
	document.all.dlDept_Text.tabIndex = document.all.dlDept.tabIndex;
	document.all.dlUser_Text.tabIndex = document.all.dlUser.tabIndex;
}

function GetParam(p)
{
	var strUrl = document.location.toString();
	strUrl = unescape(strUrl);
	var rg_szItems = strUrl.split("?");
	if(rg_szItems.length==2)
	{
		var rg_szItems2 = rg_szItems[1].split("&");
		for(var i=0; i<rg_szItems2.length; i++)
		{
			var rg_items = rg_szItems2[i].split("=");
			if(rg_items[0] == "SAMLart")
				return rg_items[1];
		}
		
	}
}

function jf_WindowOnUnLoad()
{
	if (strDPPName != "")
	{
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		if(fso.FileExists(strDPPName)) 
			fso.DeleteFile(strDPPName);
	}
}

function UserOnBlur(Userobj)
{
	document.all["htxEmp"].value =  Userobj.text;
	if(Userobj.options == null)
		return;
	if(Userobj.options.length == 0)
		return;
	var index = Userobj.selectedIndex;
	if(index == -1)
		return;
	document.all["htxEmp"].value =  Userobj.options[index].value;
	//0980924 記錄承辦人選項?[0980391]-Jane
	document.all["H_dlUser_Text"].value		= Userobj.options[index].text;
	document.all["H_dlUser_Value"].value	= Userobj.options[index].value;
}

//0980924 承辦單位下拉選單onblur[0980391]-Jane
function jf_SetdlDept(argDLObj)
{	
	var bAction = true;
	var strDept = new Array();
	var argObjText = argDLObj+"_Text";
	var bDept = false;
	var bSect = false;
		
	for ( var i = 0 ; i < document.all[argDLObj].length ; i++)
	{	
		//判斷使用者輸入之單位代碼是否存在
		if(document.all[argDLObj].options[i].text == document.all[argObjText].value )
		{
			document.all[argDLObj].selectedIndex = i;
			bDept = true;
			break;
		}
	}
	if (!bDept)
	{
		document.all[argDLObj].selectedIndex = -1;
	}
	if(document.all[argDLObj].selectedIndex == -1)
	{	
		//若不存在，則清空二級單位下拉選單
		if (document.all[argObjText].value !="")
		{
			ClearDL(document.all.dlSect);
			ClearDL(document.all.dlUser);
			return;
		}
	}
	if(argDLObj == "dlDept" )
	{	//若為一級單位下拉選單
		if(document.all["dlDept"].selectedIndex != -1)
		{
			strDept = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':');	
			document.all["H_dlSect_Value"].value = "";
			document.all["H_dlSect_Text"].value = "";
		}
		else
			bAction = false;
	}
	if(argDLObj == "dlSect")	
	{	
		//若為二級單位下拉選單
		if(document.all["dlSect"].selectedIndex != -1 && jf_Trim(document.all["dlSect_Text"].value) != "" )
		{	
			document.all["H_dlSect_Value"].value = jf_Trim(document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value);
			document.all["H_dlSect_Text"].value  = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].text;		
		}
		else if(jf_Trim(document.all["dlSect_Text"].value) == "")
		{
			document.all["H_dlSect_Value"].value = "";
			document.all["H_dlSect_Text"].value  = "";
		}
	}

	var RtnObjSect;	
	if(argDLObj == "dlDept" && bAction)
	{
		//取二級單位用
		var param1 = new Array(3);
		param1[0] = false;
		param1[1] = true;
		//1060613 Kevin_C 1060456 弱掃Client Potential Code Injection修正
		//param1[2] = jf_Trim(strDept[0]);
		param1[2] = encodeURI(jf_Trim(strDept[0]));

		RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx","GetDepts",false,param1);
		CallWS_ID_SECT = RtnObjSect.id;
		OnWSResult(RtnObjSect);
	}
	if(argDLObj == "dlSect")
	{
		var strSect = "";
		if(document.all["dlSect"].selectedIndex != -1 && jf_Trim(document.all["dlSect_Text"].value) != "" )
			strSect = jf_Trim(document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value);
	    //1101028 CLOUD 修正，空白不需建承辦人
		if (strSect != "") {
		    //取承辦人
		    var param2 = new Array(1);
		    //1060613 Kevin_C 1060456 弱掃Client Potential Code Injection修正
		    //param2[0] = strSect;
		    param2[0] = encodeURI(strSect);
		    RtnObjSect = jf_CallWS("\lib/AK_LIB.asmx", "GetDeptAllUsers", false, param2);
		    CallWS_ID_Emp1 = RtnObjSect.id;
		    OnWSResult(RtnObjSect);
		}
	}
	
}

//0980924 將DropDownList裡的item清除[0980391]-Jane
function ClearDL(argObj)
{
	for(var i=0 ; i<argObj.length;i++ )
		argObj.remove(0);
	
	argObj.length = 0;
	return;
}
//0980924 下拉選單於postback後重新設定值[0980391]-Jane
function CheckddlIsPostBack()
{
	var arrSect = new Array(2);
	var arrUser = new Array(2);
	//判斷承辦單位二級單位下拉選單
	if(document.all["H_dlSect_Text"].value !="")
	{	
		arrSect[0] = jf_Trim(document.all["H_dlSect_Text"].value);
		arrSect[1] = jf_Trim(document.all["H_dlSect_Value"].value);

		jf_SetdlDept("dlDept");
		
		if(document.all["htxEmp"].value !="")
		{
			arrUser[0] = jf_Trim(document.all["H_dlUser_Text"].value);
			arrUser[1] = jf_Trim(document.all["htxEmp"].value);
			akjf_User2DeptHandle("dlSect","dlUser");
			document.all["dlUser_Text"].value		= arrUser[0];
			document.all["H_dlUser_Text"].value		= arrUser[0];
			document.all["H_dlUser_Value"].value	= arrUser[1];
		}
		document.all["dlSect_Text"].value		= arrSect[0];
		document.all["H_dlSect_Text"].value		= arrSect[0];
		document.all["H_dlSect_Value"].value	= arrSect[1];
	}
}

//1020301	Jagle	[1011039]	純檔管系統時線上瀏覽改用UNIVIEW
/*****************************************************
 name: SelectItem
 desc: 處理選取checkbox
*****************************************************/
function SelectItem(argCookie_nm)
{
	var xObjectName = document.activeElement.id;	
	var xobjname=xObjectName.substring(xObjectName.indexOf("cbView"),xObjectName.length);	
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_cbView"));	
	
	pStr  = document.all[argCookie_nm].value;
    pStr1 = '';
    pStr2 = '';
    pType = 0;
    var pi_index = Number(document.all["dg1__ctl"+pNo+"_lbSeqNo"].innerText);
    
    if (document.activeElement.checked) { pType = '1';
     }
    else { pType = '0' }

    if (pi_index == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0,pi_index-1) }
    pStr2 = pStr.substring(pi_index,pStr.length)

    pStr = pStr1 + pType + pStr2
    document.all[argCookie_nm].value = pStr;
}
function DownloadDocument(argArt,argDocNo,argOrgNo)
{
	var artifact = argArt;
	var strDocNo = argDocNo;
	var strOrgNo =argOrgNo;
	var ret;

	try {
		var wsUrl = "";
		if(opener.theWebServices)
			wsUrl = opener.theWebServices.url('fileiows');
		else
			wsUrl = opener.opener.theWebServices.url('fileiows');
		var param = [];
		//1060613 Kevin_C 1060456 弱掃Client Potential Code Injection修正 -S
		// param[0] = artifact;
		// param[1] = strDocNo;
		// param[2] = strOrgNo;
		param[0] = encodeURI(artifact);
		param[1] = encodeURI(strDocNo);
		param[2] = encodeURI(strOrgNo);
		//1060613 Kevin_C 1060456 弱掃Client Potential Code Injection修正 -E

		var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
		if (!rtnObj.error) {
			if (rtnObj.value.m_bSuccess) {
				var sUnvObj = rtnObj.value.RtnStr;
				if (sUnvObj !== "") {
					var UnvObj = JSON.parse(sUnvObj);
					var objViewDoc = {
						UNVObj: UnvObj,
						docInfoPage: "AKI802",
						openDocModule: 'AOL',
						signType: 'E',
						readOnlyMode: true
					};
					var $docId = jf_GetSessionID() + "_" + (+new Date());
					localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
					var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
					jf_OpenChildWin(unvUrl, "ODT251ViewDoc");
				}
			}
			else{
				alert(rtnObj.value.m_strErrMsg);
			}
		}
		else{
			alert(rtnObj.error.errorDetail.string)
		}
	} catch (e) {
		alert('開啟失敗');
	}
	//1050818	Kevin_C	二代修改，改用二代瀏覽模組 -E
}
//1050818	Kevin_C	二代修改，線上瀏覽改為單選
function ChooseOne(cbViewID)
{
	var pDg1Len = document.all.dg1.rows.length + 1;
	for (i = 2; i < pDg1Len; i++)
	{
		strObjName = "dg1__ctl" + i + "_cbView";
		if (document.all[strObjName].disabled) continue;
		if (cbViewID != strObjName)
			document.all[strObjName].checked = false;
	}
}
//* 2021.03.17 	Cloud 	1100231 透過資料列點擊線上瀏覽功能-s
function Viewdoc(argDoc) {
    //* 2022.06.27   Cloud   1110371 升級純檔管環境線上瀏覽-S
    if (document.all.USE_T2100_OD.value == "0")
    {
        var RtnValue = AK.AKS116.ViewDoc(document.all["H_txOrgNo"].value, document.all.hUserName.value, argDoc).value;
        if (RtnValue.indexOf("ERR-") != -1)
        { alert(RtnValue);}
        else
        { jf_ShowModal('AKI800View.ashx'); }
    }
     //* 2022.06.27   Cloud   1110371 升級純檔管環境線上瀏覽-E
    else
    {
        try {
            var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
            unvSrc = unvSrc.replace('#artifact#', GetParam("SAMLart"));
            unvSrc = unvSrc.replace('#DocNo#', argDoc);
            unvSrc = unvSrc.replace(/#SourceOrgNo#/g, document.all.H_txOrgNo.value);
            var objViewDoc = {
                UNVObj: JSON.parse(unvSrc),
                docInfoPage: "AKS116",
                openDocModule: 'AOL',
                signType: "E",
                readOnlyMode: false,
                disableSave: true
            };
            var $docId = jf_GetSessionID() + "_" + (+new Date());
            localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
            var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + GetParam("SAMLart") + "&DocId=" + $docId;
            //jf_OpenChildWin(unvUrl, "AKS116ViewDoc");
            jf_OpenChildWin(unvUrl, "AKS116ViewDoc" + $docId);
        } catch (e) {
            alert('開啟失敗');
        }
    }
}
//* 2021.03.17 	Cloud 	1100231 透過資料列點擊線上瀏覽功能-e

//1131017	Leslie[中榮序232]	增修AKS116支援多文瀏覽
function ViewDocList(arDocList, argArtifact, argOrgNo){
	
	try {
		var unvDocTmp = `{"Subject":"","SourceOrgNo":"${argOrgNo}","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}`;
		var arDocJson = [];
		var unvDoc = '';
		for(var doc of arDocList)
			arDocJson.push(unvDocTmp.replace('#DocNo#', doc));
		unvDoc = arDocJson.length > 1? `[${arDocJson.join(',')}]`:arDocJson[0];
		
		var unvSrc = `{"UnvRoot":{"Version":"3.4","Artifact":"${argArtifact}","USER_ORGNO":"${argOrgNo}","Doc":${unvDoc}}}`;
		
		var objViewDoc = {
			UNVObj: JSON.parse(unvSrc),
			docInfoPage: "AKS116",
			openDocModule: 'AOL',
			signType: "E",
			readOnlyMode: false,
			disableSave: true
		};
		var $docId = jf_GetSessionID() + "_" + (+new Date());
		localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
		var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + GetParam("SAMLart") + "&DocId=" + $docId;
		var pageBody = $('html').get(0).getBoundingClientRect();
		jf_OpenChildWin(unvUrl, "AKS116ViewDoc" + $docId, pageBody.width * 0.8, pageBody.height * 0.8);
	} catch (e) {
		alert('開啟失敗');
	}
}