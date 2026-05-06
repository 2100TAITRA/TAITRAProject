/************************************************************************************************
DATE		SA			PRG			MGR_NO		DESC
1061016		David		David		1060748		分會設定視窗調整
1060603     Eric		Eric		1060292     iOS平台,分會設定子視窗無法以touch scrol內容問題.(iframe inside an iframe)
1050829		David		David		1050087		新增分會設定子視窗JS
1080927		Kevin		David		1080339		jQuery升級3.4.1改寫語法
1110329		Kevin		David		1110164		弱掃調整click、blur、change事件不可寫在html內，改由JS註冊
*************************************************************************************************/

var gCoworkObj = {
uOrgNo : "",
DocNo : "",
ShowMode : "",
IcOuId : "",
OwnOuId : "",
IsOuRcv : "",
Folder : "",
SubFolder : "",
gMode : "",
DeptNo : "",
bModify : false,
gOuList : [],
gRowNum : -1, // 2017.6.2 - Eric - 1060292
}

document.onreadystatechange=jf_DeptOnLoad;

//物件初始化
function gCoworkObjInit()
{
	for(nm in gCoworkObj)
	{
		if (true)
		{
			if (typeof gCoworkObj[nm] == 'boolean')
			{
				gCoworkObj[nm] = false;
			}
			else if (typeof gCoworkObj[nm] == "object")
			{
				gCoworkObj[nm] = [];
			}
			else
			{
				gCoworkObj[nm] = '';
			}
		}
	}
}
//1110329 David 1110164 弱掃調整click、blur、change事件不可寫在html內，改由JS註冊
function AddEventInit()
{
	$("#btSave").on("click", jf_SaveDept);
	$("#btCancel").on("click", jf_Cancel);

	//因移除TreeView物件自動產生的onclick=ExpCol()，改由對應js註冊
	$('A').on("click", function(){
		ExpCol(this,'Template/TreeViewImages/','dotsbt','ICON_ORG.gif','','')
	});
}

 /**********************************************************************************************
 Name : function jf_DeptOnLoad()
 Desc : 開啟分會單位設定子視窗時進行功能鍵初始化處理
 Param: 無
 Rtn  : 無
 **********************************************************************************************/ 
function jf_DeptOnLoad()
{
	//1110329 David 1110164 調整OnLoad時機，避免重複處理
	if(document.readyState !== "complete")
		return;

	gCoworkObjInit();
	//1110329 David 1110164 弱掃調整click、blur、change事件不可寫在html內，改由JS註冊
	AddEventInit();

	var sArgument = document.location;

	//將根結點的checkbox隱藏
	if(document.all["tv_chk_node_1"])
		document.all["tv_chk_node_1"].style.display="none";

	//取得環境變數
	gCoworkObj.ShowMode = GetParam("DeptShowMode",sArgument);

	// 2017.6.3 - Eric - 1060292, 取得RowNum
	var sRowNum = GetParam('RowNum', sArgument);
	if (typeof sRowNum=='string' && sRowNum.length) {
		var rowNum = parseInt(sRowNum);
		if (!isNaN(rowNum)) {
			gCoworkObj.rowNum = rowNum;
		}
	}

	//取得承辦單位
	gCoworkObj.DeptNo = GetParam("DEPT_NO",sArgument)

	//取得以設定的分會單位
	gCoworkObj.gOuList = GetOuList(sArgument);

	//取得網址參數
	var strArtifact = GetParam("SAMLart",sArgument);
	gCoworkObj.gMode = GetParam("Mode",sArgument);
	switch (gCoworkObj.gMode)
	{
		case "3":
		case "2":
			//document.all.btTransfer.style.display="none";
			break;
		case "1":
			document.all.btSave.style.display="none";
			break;
		case "4":
			//document.all.btTransfer.style.display="none";
			document.all.btCancel.style.display="none";
			break;
		default:
			return;
	}
	fnSetChecked(gCoworkObj.gOuList);

	/*var xmldoc = null;
	if(strMode != "3")
	{
		var xmldoc = LoadXml( AddSlash(GetParam("WORK_DIR",sArgument))+"ODWWKF-00.XML");
		//var xmldoc = LoadXml("C:\\2100\\301060000C\\AOL\\OD\\ODWWKF-00.XML");
		if(!xmldoc) return;
		SetCheckBoxChecked(xmldoc,decodeURI(GetParam("TX_NAME",sArgument)));
	}
	else
	{
		SetCheckBoxCheckedByArray(argObject.rtnArray)
		argObject.rtnArray = new Array();
	}*/
}

function GetOuList(argArgument)
{
	var arrRtn = [];
	var strOuList = GetParam("OuList" ,argArgument);
	if(strOuList != "")
	{
		var arrOuList = strOuList.split("|");
		for(var i = 0 ; i < arrOuList.length ; i++)
		{
			arrRtn.push(arrOuList[i]);
			gCoworkObj.bModify = true;
		}
	}
	return arrRtn;
}

 /**********************************************************************************************
 Name : function jf_ConfirmCancel()
 Desc : 使用者點選取消鍵時，提供警示訊息詢問是確認要關閉視窗
 Param: 無
 Rtn  : 無
 **********************************************************************************************/ 
function jf_Cancel()
{
	if(window.confirm("是否確認要關閉分會單位編輯子視窗?"))
	{
		if(gCoworkObj.gMode == "3")
		{
			if(gCoworkObj.bModify)
			{
				// 2017.6.2 - Eric - 1060292
				//var $dlg = parent.$("#WWKF_COWORK_DIV");
				//var $btn = $dlg.find("a#Dlg_ModifyThread_close_btn");
				//1061016 David 1060748 成大分會設定視窗調整
				//var $dlg = parent.$("#docAdvancedSettingDlgContainer");
				//var $btn = $dlg.find("a#docAdvDlg_close_btn");
				var $dlg = parent.$("#WWKF_COWORK_DIV");
				var $btn = $dlg.find("a#Dlg_ModifyThread_close_btn");
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$btn.click();
				$btn.trigger("click");
			}
			else
			{
				// 2017.6.2 - Eric - 1060292
				//var $dlg = parent.$("#WWKF_COWORK_DIV");
				//var $btn = $dlg.find("a#Dlg_NewThread_close_btn");
				//1061016 David 1060748 成大分會設定視窗調整
				//var $dlg = parent.$("#docAdvancedSettingDlgContainer");
				//var $btn = $dlg.find("a#docAdvDlg_close_btn");
				var $dlg = parent.$("#WWKF_COWORK_DIV");
				var $btn = $dlg.find("a#Dlg_NewThread_close_btn");
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$btn.click();
				$btn.trigger("click");
			}
		}
		else if(gCoworkObj.gMode == "2") // 2016.9.11 - Eric Peng
		{
			parent.$("#PDoc_CoWWKFDialog #btn_PDocCoWWKFCancel").trigger('click');
		}
	}
}

 /**********************************************************************************************
 Name : function jf_Padding()
 Desc : 依要求長度, 在數字前面補0
 Param: 無
 Rtn  : 補足長度後後字串
 **********************************************************************************************/ 
function jf_Padding(num, len) {
	if (typeof num != "string")
		num = num.toString();
			
	if(num.length >= len)
		return num;
		
	return arguments.callee("0" + num, len);
}

 /**********************************************************************************************
 Name : function jf_SaveDept()
 Desc : 依據使用者編輯完後的分會單位，儲存至ODWWKF-00.xml
 Param: 無
 Rtn  : true/false
 **********************************************************************************************/ 
function jf_SaveDept()
{
	/*var argObject = window.parent.dialogArguments;
	if(argObject==null)
	{
		var sArgument = document.location;
		//alert("ADDRESS:"+sArgument);
	}
	else
	{
		var sArgument = argObject.argument;
	}

	var setTxName = decodeURI(GetParam("TX_NAME",sArgument)) ;
	var UserName = GetParam("USERNAME",sArgument) ;
	var strMode = GetParam("Mode",sArgument) ;*/

	if(gCoworkObj.gMode == "3" || gCoworkObj.gMode == "2")
	{
		if(!jf_CheckBeforeSubmit())
			return;

		//取得使用者勾選的單位資訊
		var rtnOuList = "";
		var rtnOuListStamp = "";
		var checknode = $('#divForTreeView').find("input[id^='tv_chk_node']");
		for(var inode=0;inode<checknode.length;inode++)
		{
			if(checknode.eq(inode).prop("checked"))
			{
				rtnOuList += rtnOuListStamp + checknode.eq(inode).attr("OuId") + ";" + checknode.eq(inode).attr("OuName");
				rtnOuListStamp = "|";
			}
		}

		window.localStorage.MsCoworkRtn = rtnOuList;

		// 2017.6.2 - Eric - 1060292, 若為預排流程子視窗叫用, 設定localStorage.MsCoworkUpdated欄位值!
		if (gCoworkObj.gMode==3) {
			var tm = new Date();
			var sTime = '' + (tm.getFullYear()-1911) + jf_Padding(tm.getMonth(), 2) + jf_Padding(tm.getDay(), 2) + 
						jf_Padding(tm.getHours(), 2) + jf_Padding(tm.getMinutes(), 2) + jf_Padding(tm.getSeconds(), 2);
			var rtnObj = {
				update: true,
				modify: ((typeof gCoworkObj.bModify=='boolean') && (gCoworkObj.bModify==true))?true:false,
				rowNum: gCoworkObj.rowNum,
				time: sTime
			};
			window.localStorage.MsCoworkUpdated = JSON.stringify(rtnObj);
		}
	}
	/*else if(strMode == "4")	//0960820 Stella 新增
	{
		//0960813 開啟ODWMSG.XML 塞入tx_name
		var wmsgXML = LoadXml( AddSlash(GetParam("WORK_DIR",sArgument))+"ODWMSG.XML");
		if(!wmsgXML) return false ;
		var TxNameNode = wmsgXML.selectSingleNode("//ODWMSG/TX_NAME");
		TxNameNode.text        = setTxName;

		wmsgXML.save( AddSlash(GetParam("WORK_DIR",sArgument))+"ODWMSG.XML");

		//開啟ODWWKF-00.XML
		var wwkfXML = LoadXml( AddSlash(GetParam("WORK_DIR",sArgument))+"ODWWKF-00.XML");
		if(!wwkfXML) return false ;

		//取得使用者勾選的單位資訊
		doc = document.all.tags("INPUT");
		var arrayOfOuLen = 0;
		var arrayOfOuInfo = new Array(0);
		for( i = 0 ; i < doc.length ; i++)
		{
			if(doc[i].type == "checkbox" && doc[i].checked == true) 
			{
					arrayOfOuInfo[arrayOfOuLen] = new Array(2);
					arrayOfOuInfo[arrayOfOuLen][0] = doc[i].OuId;
					arrayOfOuInfo[arrayOfOuLen][1] = doc[i].OuName;
					arrayOfOuLen++;
			}
		}

		var nodeRadio    = wwkfXML.selectNodes("//root/item/RADIO_SELECTED_1");
		var nodeSignF    = wwkfXML.selectNodes("//root/item/SIGN_F");
		var nodeTxName   = wwkfXML.selectNodes("//root/item/TX_NAME");
		var AllItemsNode = wwkfXML.selectNodes("//root/item");
		var ItemNode;

		for(var i=0;i < nodeSignF.length;i++)
		{
			if(nodeSignF.item(i).text == "N" && nodeRadio.item(i).text == "3")
			{
				ItemNode = AllItemsNode.item(i);
				break;
			}
		}

		///////建立item節點////////////////
		if(!ItemNode)
		{
			ItemNode = wwkfXML.createElement("item");
			var OwnUserIdNode    = wwkfXML.createElement("OWN_USER_ID");
			var OwnUserNameNode  = wwkfXML.createElement("OWN_USER_NAME");
			var OwnOuIdNode      = wwkfXML.createElement("OWN_OU_ID");
			var OwnOuNameNode    = wwkfXML.createElement("OWN_OU_NAME");
			var OwnRoleIdNode    = wwkfXML.createElement("OWN_ROLE_ID");
			var OwnRoleNameNode  = wwkfXML.createElement("OWN_ROLE_NAME");
			var CreatByNode      = wwkfXML.createElement("CREATE_BY");
			var SendByNade       = wwkfXML.createElement("SEND_BY");
			var SendTimeNade     = wwkfXML.createElement("SEND_TIME");
			var AddByNade        = wwkfXML.createElement("ADDBY");
			var RadioSelect1Node = wwkfXML.createElement("RADIO_SELECTED_1");
			var SignFNode        = wwkfXML.createElement("SIGN_F");
			var TxNameNode       = wwkfXML.createElement("TX_NAME");
			CreatByNode.text      = UserName ;
			AddByNade.text        = "1";
			RadioSelect1Node.text = "3";
			SignFNode.text        = "N";
			TxNameNode.text       = setTxName;

			ItemNode.appendChild(OwnUserIdNode);
			ItemNode.appendChild(OwnUserNameNode);
			ItemNode.appendChild(OwnOuIdNode);
			ItemNode.appendChild(OwnOuNameNode);
			ItemNode.appendChild(OwnRoleIdNode);
			ItemNode.appendChild(OwnRoleNameNode);
			ItemNode.appendChild(CreatByNode);
			ItemNode.appendChild(SendByNade);
			ItemNode.appendChild(SendTimeNade);
			ItemNode.appendChild(AddByNade);
			ItemNode.appendChild(RadioSelect1Node);
			ItemNode.appendChild(SignFNode);
			ItemNode.appendChild(TxNameNode);

			wwkfXML.selectSingleNode("//root").appendChild(ItemNode);
		}
		///////建立COWORK_OPTIONS節點////////////////
		var NewCoworkOptionsNode = wwkfXML.createElement("COWORK_OPTIONS") //createElement(name)

		for( OuNum = 0 ; OuNum < arrayOfOuInfo.length ; OuNum++)
		{
			//建立node
			var OptionsNode      = wwkfXML.createElement("OPTIONS")	
			var OwnUserIdNode    = wwkfXML.createElement("OWN_USER_ID");
			var OwnUserNameNode  = wwkfXML.createElement("OWN_USER_NAME");
			var OwnOuIdNode      = wwkfXML.createElement("OWN_OU_ID");
			var OwnOuNameNode    = wwkfXML.createElement("OWN_OU_NAME");
			var OwnRoleIdNode    = wwkfXML.createElement("OWN_ROLE_ID");
			var OwnRoleNameNode  = wwkfXML.createElement("OWN_ROLE_NAME");
			var CreatByNode      = wwkfXML.createElement("CREATE_BY");
			var SendByNade       = wwkfXML.createElement("SEND_BY");
			var SendTimeNade     = wwkfXML.createElement("SEND_TIME");
			var AddByNade        = wwkfXML.createElement("ADDBY");
			var RadioSelect1Node = wwkfXML.createElement("RADIO_SELECTED_1");
			var SignFNode        = wwkfXML.createElement("SIGN_F");
			var TxNameNode       = wwkfXML.createElement("TX_NAME");
			//塞值
			OwnOuIdNode.text      = arrayOfOuInfo[OuNum][0];
			OwnOuNameNode.text    = arrayOfOuInfo[OuNum][1];
			if(strMode == "4")//線上簽核
			{
				OwnRoleIdNode.text    = "OD16";
				OwnRoleNameNode.text  = "分辦人員"
			}
			else//紙本簽核
			{
				OwnRoleIdNode.text    = "OD17"
				OwnRoleNameNode.text  = "登記桌"
			}
			CreatByNode.text      = UserName ;
			AddByNade.text        = "1";
			RadioSelect1Node.text = "3";
			SignFNode.text        = "N";
			TxNameNode.text       = setTxName;
			//加入子節點
			OptionsNode.appendChild(OwnUserIdNode);
			OptionsNode.appendChild(OwnUserNameNode);
			OptionsNode.appendChild(OwnOuIdNode);
			OptionsNode.appendChild(OwnOuNameNode);
			OptionsNode.appendChild(OwnRoleIdNode);
			OptionsNode.appendChild(OwnRoleNameNode);
			OptionsNode.appendChild(CreatByNode);
			OptionsNode.appendChild(SendByNade);
			OptionsNode.appendChild(SendTimeNade);
			OptionsNode.appendChild(AddByNade);
			OptionsNode.appendChild(RadioSelect1Node);
			OptionsNode.appendChild(SignFNode);
			OptionsNode.appendChild(TxNameNode);

			NewCoworkOptionsNode.appendChild(OptionsNode);
		}

		//加入COWORK_OPTIONS節點到ODKKWF-00.xml
		//var OldCoworkOptionsNode = wwkfXML.selectSingleNode("//root/itemCOWORK_OPTIONS")
		var OldCoworkOptionsNode = ItemNode.selectSingleNode("COWORK_OPTIONS")
		if (OldCoworkOptionsNode)//若COWORK_OPTIONS節點存在就先移除再新增
			ItemNode.removeChild(OldCoworkOptionsNode);
		ItemNode.appendChild(NewCoworkOptionsNode);
			//wwkfXML.selectSingleNode("//root/item/ADDBY").text            = "1";
			//wwkfXML.selectSingleNode("//root/item/RADIO_SELECTED_1").text = "3";
			//wwkfXML.selectSingleNode("//root/item/SIGN_F").text           = "N";
			//wwkfXML.selectSingleNode("//root/item/TX_NAME").text          = setTxName;

		try
		{
			//儲存
			wwkfXML.save( AddSlash(GetParam("WORK_DIR",sArgument))+"ODWWKF-00.XML");
			//wwkfXML.save("C:\\2100\\301060000C\\AOL\\OD\\ODWWKF-01.XML") ;
		}
		catch(e)
		{
			alert("錯誤-儲存ODWWKF-00.XML檔案失敗\n原因："+e);
			return false;
		}
	}
	else  //一般分會用的code
	{
		//0960813 開啟ODWMSG.XML 塞入tx_name
		var wmsgXML = LoadXml( AddSlash(GetParam("WORK_DIR",sArgument))+"ODWMSG.XML");
		if(!wmsgXML) return false ;
		var TxNameNode = wmsgXML.selectSingleNode("//ODWMSG/TX_NAME");
		TxNameNode.text        = setTxName;
		wmsgXML.save( AddSlash(GetParam("WORK_DIR",sArgument))+"ODWMSG.XML");

		//開啟ODWWKF-00.XML
		var wwkfXML = LoadXml( AddSlash(GetParam("WORK_DIR",sArgument))+"ODWWKF-00.XML");
		if(!wwkfXML) return false ;

		//取得使用者勾選的單位資訊
		doc = document.all.tags("INPUT");
		var arrayOfOuLen = 0;
		var arrayOfOuInfo = new Array(0);
		for( i = 0 ; i < doc.length ; i++)
		{
			if(doc[i].type == "checkbox" && doc[i].checked == true) 
			{
					arrayOfOuInfo[arrayOfOuLen] = new Array(2);
					arrayOfOuInfo[arrayOfOuLen][0] = doc[i].OuId;
					arrayOfOuInfo[arrayOfOuLen][1] = doc[i].OuName;
					arrayOfOuLen++;
			}
		}

		var ItemNode = wwkfXML.selectSingleNode("//root/item");
		///////建立item節點////////////////
		if(!ItemNode)
		{
			ItemNode = wwkfXML.createElement("item");
			var OwnUserIdNode    = wwkfXML.createElement("OWN_USER_ID");
			var OwnUserNameNode  = wwkfXML.createElement("OWN_USER_NAME");
			var OwnOuIdNode      = wwkfXML.createElement("OWN_OU_ID");
			var OwnOuNameNode    = wwkfXML.createElement("OWN_OU_NAME");
			var OwnRoleIdNode    = wwkfXML.createElement("OWN_ROLE_ID");
			var OwnRoleNameNode  = wwkfXML.createElement("OWN_ROLE_NAME");
			var CreatByNode      = wwkfXML.createElement("CREATE_BY");
			var SendByNade       = wwkfXML.createElement("SEND_BY");
			var SendTimeNade     = wwkfXML.createElement("SEND_TIME");
			var AddByNade        = wwkfXML.createElement("ADDBY");
			var RadioSelect1Node = wwkfXML.createElement("RADIO_SELECTED_1");
			var SignFNode        = wwkfXML.createElement("SIGN_F");
			var TxNameNode       = wwkfXML.createElement("TX_NAME");

			ItemNode.appendChild(OwnUserIdNode);
			ItemNode.appendChild(OwnUserNameNode);
			ItemNode.appendChild(OwnOuIdNode);
			ItemNode.appendChild(OwnOuNameNode);
			ItemNode.appendChild(OwnRoleIdNode);
			ItemNode.appendChild(OwnRoleNameNode);
			ItemNode.appendChild(CreatByNode);
			ItemNode.appendChild(SendByNade);
			ItemNode.appendChild(SendTimeNade);
			ItemNode.appendChild(AddByNade);
			ItemNode.appendChild(RadioSelect1Node);
			ItemNode.appendChild(SignFNode);
			ItemNode.appendChild(TxNameNode);

			wwkfXML.selectSingleNode("//root").appendChild(ItemNode);
		}
		///////建立COWORK_OPTIONS節點////////////////
		var NewCoworkOptionsNode = wwkfXML.createElement("COWORK_OPTIONS") //createElement(name)

		for( OuNum = 0 ; OuNum < arrayOfOuInfo.length ; OuNum++)
		{
			//建立node
			var OptionsNode      = wwkfXML.createElement("OPTIONS")	
			var OwnUserIdNode    = wwkfXML.createElement("OWN_USER_ID");
			var OwnUserNameNode  = wwkfXML.createElement("OWN_USER_NAME");
			var OwnOuIdNode      = wwkfXML.createElement("OWN_OU_ID");
			var OwnOuNameNode    = wwkfXML.createElement("OWN_OU_NAME");
			var OwnRoleIdNode    = wwkfXML.createElement("OWN_ROLE_ID");
			var OwnRoleNameNode  = wwkfXML.createElement("OWN_ROLE_NAME");
			var CreatByNode      = wwkfXML.createElement("CREATE_BY");
			var SendByNade       = wwkfXML.createElement("SEND_BY");
			var SendTimeNade     = wwkfXML.createElement("SEND_TIME");
			var AddByNade        = wwkfXML.createElement("ADDBY");
			var RadioSelect1Node = wwkfXML.createElement("RADIO_SELECTED_1");
			var SignFNode        = wwkfXML.createElement("SIGN_F");
			var TxNameNode       = wwkfXML.createElement("TX_NAME");
			//塞值
			OwnOuIdNode.text      = arrayOfOuInfo[OuNum][0];
			OwnOuNameNode.text    = arrayOfOuInfo[OuNum][1];
			if(strMode == "4")//線上簽核
			{
				OwnRoleIdNode.text    = "OD16";
				OwnRoleNameNode.text  = "分辦人員"
			}
			else//紙本簽核
			{
				OwnRoleIdNode.text    = "OD17"
				OwnRoleNameNode.text  = "登記桌"
			}
			CreatByNode.text      = UserName ;
			AddByNade.text        = "1";
			RadioSelect1Node.text = "3";
			SignFNode.text        = "N";
			TxNameNode.text       = setTxName;
			//加入子節點
			OptionsNode.appendChild(OwnUserIdNode);
			OptionsNode.appendChild(OwnUserNameNode);
			OptionsNode.appendChild(OwnOuIdNode);
			OptionsNode.appendChild(OwnOuNameNode);
			OptionsNode.appendChild(OwnRoleIdNode);
			OptionsNode.appendChild(OwnRoleNameNode);
			OptionsNode.appendChild(CreatByNode);
			OptionsNode.appendChild(SendByNade);
			OptionsNode.appendChild(SendTimeNade);
			OptionsNode.appendChild(AddByNade);
			OptionsNode.appendChild(RadioSelect1Node);
			OptionsNode.appendChild(SignFNode);
			OptionsNode.appendChild(TxNameNode);

			NewCoworkOptionsNode.appendChild(OptionsNode);
		}

		//加入COWORK_OPTIONS節點到ODKKWF-00.xml
		var OldCoworkOptionsNode = wwkfXML.selectSingleNode("//root/item/COWORK_OPTIONS")
		if (OldCoworkOptionsNode)//若COWORK_OPTIONS節點存在就先移除再新增
			ItemNode.removeChild(OldCoworkOptionsNode);
		ItemNode.appendChild(NewCoworkOptionsNode);
			wwkfXML.selectSingleNode("//root/item/ADDBY").text            = "1";
			wwkfXML.selectSingleNode("//root/item/RADIO_SELECTED_1").text = "3";
			wwkfXML.selectSingleNode("//root/item/SIGN_F").text           = "N";
			wwkfXML.selectSingleNode("//root/item/TX_NAME").text          = setTxName;

		try
		{
			//儲存
			wwkfXML.save( AddSlash(GetParam("WORK_DIR",sArgument))+"ODWWKF-00.XML");
			//wwkfXML.save("C:\\2100\\301060000C\\AOL\\OD\\ODWWKF-01.XML") ;
		}
		catch(e)
		{
			alert("錯誤-儲存ODWWKF-00.XML檔案失敗\n原因："+e);
			return false;
		}
	}*/
	
	if(gCoworkObj.gMode == "3")
	{
		if(gCoworkObj.bModify)
		{
			// 2017.6.2 - Eric - 1060292
			//var $dlg = parent.$("#WWKF_COWORK_DIV");
			//var $btn = $dlg.find("a#Dlg_ModifyThread_close_btn");
			//1061016 David 1060748 成大分會設定視窗調整
			//var $dlg = parent.$("#docAdvancedSettingDlgContainer");
			//var $btn = $dlg.find("a#docAdvDlg_close_btn");
			var $dlg = parent.$("#WWKF_COWORK_DIV");
			var $btn = $dlg.find("a#Dlg_ModifyThread_close_btn");
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$btn.click();
			$btn.trigger('click');
		}
		else
		{
			// 2017.6.2 - Eric - 1060292
			//var $dlg = parent.$("#WWKF_COWORK_DIV");
			//var $btn = $dlg.find("a#Dlg_NewThread_close_btn");
			//1061016 David 1060748 成大分會設定視窗調整
			//var $dlg = parent.$("#docAdvancedSettingDlgContainer");
			//var $btn = $dlg.find("a#docAdvDlg_close_btn");
			var $dlg = parent.$("#WWKF_COWORK_DIV");
			var $btn = $dlg.find("a#Dlg_NewThread_close_btn");
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$btn.click();
			$btn.trigger('click');
		}
	}
	if(gCoworkObj.gMode == "2")
	{
		parent.$("#PDoc_CoWWKFDialog #btn_PDocCoWWKFDOK").trigger('click');
	}
	else 
	{
		/*if(gCoworkObj.gMode == "4" || gCoworkObj.gMode == "2") //Mode為4及3時才關閉視窗
			window.close();*/
	}
	return true;
}

 /**********************************************************************************************
 Name : function jf_SaveDeptAndTransfer()
 Desc : 使用者於右鍵開啟分會單位設定子視窗，設定完分會單位後直接傳送
 Param: 無
 Rtn  : 無
 **********************************************************************************************/ 
function jf_SaveDeptAndTransfer()
{
	var argObject = window.parent.dialogArguments;
	if(argObject==null)
	{
		var sArgument = document.location;
		//alert("ADDRESS:"+sArgument);
	}
	else
	{
		var sArgument = argObject.argument;
	}
	var strDocNo = GetParam("DOC_NO",sArgument)
	var gMsgId = GetParam("MSG_ID",sArgument)

	if(!jf_SaveDept("jf_SaveDeptAndTransfer")) return;
	if(!jf_CheckBeforeSubmit()) return;
	if(!  GenEnvCmdFile(false,strDocNo,gMsgId)) return;
	TemplateSubmit(gMsgId); 
}
 /**********************************************************************************************
 Name : function jf_CheckBeforeSubmit()
 Desc : 傳送前檢核是有設定一個以上會辦單位(至少兩個)
 Param: 無
 Rtn  : true/false
 **********************************************************************************************/ 
function jf_CheckBeforeSubmit()
{
	var num = 0;
	var checknode = $('#divForTreeView').find("input[id^='tv_chk_node']");
	for(var inode=0;inode<checknode.length;inode++)
	{
		if(checknode.eq(inode).prop("checked"))
			num++;
	}
	if (num < 2)
	{
		alert("請至少設定兩個會辦單位，再進行分會傳送")
		return false ;
	}
	return true ;
}

 /**********************************************************************************************
 Name : function  GetParam(p,theurl)
 Desc : 取得參數值
 Param: 參數名稱,網址參數字串
 Rtn  : 參數值
 **********************************************************************************************/ 
function GetParam(p,theurl)
{
	var arrayOfParamLen = 0;
	var arrayOfParam = new Array(0);

	var pUrl = unescape(theurl);

	if( pUrl != -1 )
	{
		var i,j,k;
		i = pUrl.indexOf("?");
		var paramStr = pUrl.substr(i+1); 
		var arr = paramStr.split("&");
		for(j=0 ; j<arr.length ; j++)
		{
			k = arr[j].indexOf("=");
			if( k != -1 )
			{
				arrayOfParam[arrayOfParamLen] = new Array(2);
				arrayOfParam[arrayOfParamLen][0] = arr[j].substr(0,k);
				arrayOfParam[arrayOfParamLen][1] = arr[j].substr(k+1);
				arrayOfParamLen++;
			}
		}
	}

	var arr = arrayOfParam;
	if( p == "" )	return "";
	for(var i=0 ; i<arr.length ; i++)
		if( arr[i][0] == p )
			return arr[i][1];
	return "";
}

/**********************************************************************************************
 Name : function LoadXml(argXmlSrc )
 Desc : 載入XML檔案
 Param: argXmlSrc : XML來源檔全徑名 (必要)
 Rtn  : xmldoc
 **********************************************************************************************/ 
function LoadXml(argXmlSrc)
{
	if(argXmlSrc == undefined || argXmlSrc == "") return false;
	var fsoxml = new ActiveXObject("Scripting.FileSystemObject");
	//alert(argXmlSrc);
	if(!fsoxml.FileExists(argXmlSrc)) 
	{
		fsoxml = null;
		alert("錯誤-"+argXmlSrc+"不存在");
		return false;
	}

	var xdoc = new ActiveXObject("MSXML2.DOMDocument");
	xdoc.load(argXmlSrc);

	return xdoc ;
}

/**********************************************************************************************
 Name : function SetCheckBoxChecked(argXdoc , argTxName)
 Desc : 從WWKF-00.XML中取得<COWORK_OPTIONS>節點下<SIGN_F>為N且<TX_NAME>為傳入參數之單位，CheckBox設為勾選
 Param: argXdoc   : xmldoc
        argTxName : TX_NAME
 Rtn  : true/false
 **********************************************************************************************/ 
function SetCheckBoxChecked(argXdoc , argTxName)
{
	//DVD WAIT
	/*var nodeSignF = argXdoc.selectNodes("//root/item/COWORK_OPTIONS/OPTIONS/SIGN_F");
	var nodeTxName = argXdoc.selectNodes("//root/item/COWORK_OPTIONS/OPTIONS/TX_NAME");
	var nodeOwnOuId = argXdoc.selectNodes("//root/item/COWORK_OPTIONS/OPTIONS/OWN_OU_ID");
	var nodeOwnUserId = argXdoc.selectNodes("//root/item/COWORK_OPTIONS/OPTIONS/OWN_USER_ID");
	var nodeOwnRoleId = argXdoc.selectNodes("//root/item/COWORK_OPTIONS/OPTIONS/OWN_ROLE_ID");

	var OuIdList = "";

	for(var i=0;i < nodeSignF.length;i++)
	{
		if(nodeSignF.item(i).text == "N" && nodeTxName.item(i).text == argTxName)
			OuIdList += ":"+ nodeOwnOuId.item(i).text+"|"+nodeOwnRoleId+"|"+nodeOwnUserId+";";
	}

	fnSetChecked(OuIdList);

	xdoc=null;
	fsoxml = null;*/
	return true;
}

/**********************************************************************************************
 Name : function fnSetChecked( argOuIdList)
 Desc : 將Checkbox設為勾選
 Param: argOuIdList : 單位代碼列表
 Rtn  : 無
 **********************************************************************************************/ 
function fnSetChecked(CheckArray)
{
	//取得單位代碼前2碼
	var strCheckDeptNo = gCoworkObj.DeptNo;
	if(strCheckDeptNo.length > 2)
		strCheckDeptNo = strCheckDeptNo.substr(0,2);

	var checknode = $('#divForTreeView').find("input[id^='tv_chk_node']");
	//設定選項是否可勾選
	for(var inode=0;inode<checknode.length;inode++)
	{
		if(!checknode.eq(inode).attr("OuId"))
			continue;

		var OuId = checknode.eq(inode).attr("OuId");

		//如果節點符合就刪除
		if(OuId == gCoworkObj.DeptNo)
			checknode.eq(inode)[0].disabled = true;
		
		//依環境變數設定CheckBox是否可勾選
		if(gCoworkObj.ShowMode == "1")
		{
			if(OuId && OuId.length > 2 && OuId.substr(0,2) != strCheckDeptNo)
			{
				checknode.eq(inode)[0].disabled = true;
				$('#divForTreeView').find("input[OuId='"+OuId+"']").prop("checked",false);
			}
		}
	}

	//依傳入值設定選項勾選
	for(var iOu = 0 ; iOu < CheckArray.length ; iOu++)
	{
		var OuId = CheckArray[iOu];
		$('#divForTreeView').find("input[OuId='"+OuId+"']").prop("checked",true);
	}
}

//寫出文件夾異動指令檔
function GenEnvCmdFile(argSubmit,strDocNo,gMsgId)
{

	var argObject = window.parent.dialogArguments;
	if(argObject==null)
	{
		var sArgument = document.location;
		//alert("ADDRESS:"+sArgument);
	}
	else
	{
		var sArgument = argObject.argument;
	}
	var oDEFolder = new ActiveXObject("DEFolderUtil.DEFolderUtil.1");

	try
	{
		try
		{
			//alert("oDEFolder.buildEnvCmdFile("+GetParam("SAMLart",sArgument)+","+  AddSlash(GetParam("WORK_DIR",sArgument))+","+gMsgId+","+ strDocNo+","+ "SaveWorkFile.ECmd"+","+ false+","+ false+")")
			if(!oDEFolder.buildEnvCmdFile(GetParam("SAMLart",sArgument),  AddSlash(GetParam("WORK_DIR",sArgument)),gMsgId, strDocNo, "SaveWorkFile.ECmd", false, false))
			{
				alert("產生文件夾異動指令檔失敗\n\r錯誤碼：" + oDEFolder.ErrCode + "\n\r錯誤訊息："+oDEFolder.ErrMsg);
				return false;
			}
			return true;
		}
		catch(e)
		{
			//alert("第一次產生文件夾異動指令檔失敗/n"+e.message)
			//alert("oDEFolder.buildEnvCmdFile("+ AddSlash(GetParam("WORK_DIR",sArgument))+","+ gMsgId+","+ strDocNo+",SaveWorkFile.ECmd,"+ argSubmit+")")
			if(!oDEFolder.buildEnvCmdFile( AddSlash(GetParam("WORK_DIR",sArgument)), gMsgId, strDocNo, "SaveWorkFile.ECmd", false))
			{
				alert("產生文件夾異動指令檔失敗\n\r錯誤碼：" + oDEFolder.ErrCode + "\n\r錯誤訊息："+oDEFolder.ErrMsg);
				return false;
			}
			return true;
		}
	}
	catch(e)
	{
		alert("產生文件夾異動指令檔失敗："+e.message);
		return false;
	}
}

function TemplateSubmit(gMsgId)
{
	var argObject = window.parent.dialogArguments;
	if(argObject==null)
	{
		opener = window.parent.winObj;
	}
	else
	{
		opener = window.parent.dialogArguments.winObj;
	}
	if(gMsgId==-1)
		return;
	opener.window.OnSave(gMsgId,false);
	if(opener.window.OnSubmit(gMsgId,false))
		close();
}

function AddSlash(strPath)
{
	if(strPath.lastIndexOf("\\") != strPath.length-1)
		return strPath+"\\";
	return strPath ;
}

//避免JS檔重複載入
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-Cowork.js").finish();
})();