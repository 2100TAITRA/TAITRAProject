// 請購單位及驗收地點設定子視窗
//	
/*DATE 		SA		PG		MGR_NO		DESC	
  1081008	Kevin	Joe		1080339		jQuery升級3.4.1
  1100510	Kevin	David	1100221		支援jQuery3.5.1，調整jQuery.trim用法
  1100922	Kevin	David	1100991		弱掃修正Client Potential XSS
*/
var nsEditor = nsEditor||{};
var gSetDeptNodePurchase;
var gSetDeptNodeAcceptance;
var gSetDeptRootNode;
var gSetDeptActivNode;

//請購單位設定
nsEditor.fnSettingPurchase = function(dm, $dlg, refreshView)
{
	gSetDeptRootNode = dm.accquireXml();
		
		function fnInit()
		{
			//進行子視窗的初始化
			//取得dataxml內設定的請購單位
			thePublicRsrc.getDataXML(theUserInfo.OrgID).done(function(xmlDoc) {
			
				if(gSetDeptNodePurchase==undefined)
					gSetDeptNodePurchase =  $(xmlDoc.documentElement).find("data[type^='請購單位']").find("代碼[value!='']");
				
				gSetDeptActivNode = $(gSetDeptRootNode).find("請購單位列表").clone();
				//以DATAXML裡記錄的資訊建立畫面
				var MainTable = $("#SetDept");
				var breakNode = $("<div style='text-align: left; background-color: rgb(204, 255, 255);'></div>");
				var CheckNode = $("<div class='ui-checkbox' style='display: inline-block;width: 30%;'></div>");
				var id="";
				for(var iDept=0;iDept<gSetDeptNodePurchase.length;iDept++)
				{
					var value = gSetDeptNodePurchase.eq(iDept).attr("value");
					id = "checkbox"+iDept;
					
					if(gSetDeptNodePurchase.eq(iDept).attr("value")=="其他")//其他增加放入一空白輸入欄位
						id = "checkbox_else";

					//1100922 David 1100991 弱掃修正Client Potential XSS
					//CheckNode.append($("<label for='"+id+"' class='ui-btn ui-corner-all ui-btn-c ui-btn-icon-left ui-checkbox-off'><input id='"+id+"' type='checkbox' data-theme='c' value='"+value+"'>"+value+"</label>"));
					CheckNode.append($("<label for='"+id+"' class='ui-btn ui-corner-all ui-btn-c ui-btn-icon-left ui-checkbox-off'><input id='"+id+"' type='checkbox' data-theme='c' value='"+htmlencode(value)+"'>"+htmlencode(value)+"</label>"));
					
					breakNode.append(CheckNode);//將建立的CHECKBOX放入DIV
					
					if(gSetDeptNodePurchase.eq(iDept).attr("value")=="其他")//其他增加放入一空白輸入欄位
						breakNode.append("<div style='width: 30%; display: inline-block; height: 40px;' class='ui-input-text ui-body-inherit ui-corner-all ui-mini ui-shadow-inset'><input class='normal' id='txElse' style='width: 100%;' data-mini='true'></div>");//CHECKBOX 重設
					
					CheckNode = $("<div class='ui-checkbox' style='display: inline-block;width: 30%;'></div>");
					
					if((2*iDept-1) % 3==0)//一列放3筆
					{
						breakNode.appendTo(MainTable);//放入畫面
						//斷行初始化
						breakNode = $("<div style='text-align: left; background-color: rgb(204, 255, 255);'></div>");
					}
					
					if(iDept==gSetDeptNodePurchase.length-1)
					{
						breakNode.appendTo(MainTable);//放入畫面
					}
				}
				//取得目前設定的請購單位	
				if(gSetDeptActivNode.length!=0)
				{
					gSetDeptActivNode.children("請購單位").each(doPopulateForTrans);//取得現行請購單位清單
					
					function doPopulateForTrans(i, node)
					{
						if($(node).attr("value")=="其他")
						{
							$("#SetDept").find("input[id='checkbox_else']").prop("checked",true);//設定勾選
							$("#SetDept").find("input[id='txElse']").val($(node).text());
						}
						else
							$("#SetDept").find("input[value='"+jQuery.trim($(node).text())+"']").prop("checked",true);//設定勾選
					}
				}
				else
				{
					var nodeTranList = gSetDeptRootNode.createElement("請購單位列表");
					$(gSetDeptRootNode.documentElement).append(nodeTranList);
					gSetDeptActivNode = $(gSetDeptRootNode).find("請購單位列表").clone();

				}
			})
		}
		//************************************************************註冊事件****************************************************//

		//儲存
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#SetDept_Save").click(function() {
		$dlg.find("#SetDept_Save").on("click", function() {
				
			if(confirm('您是否要儲存目前畫面中的請購單位資訊內容？'))
			{
				//建立XML
				gSetDeptActivNode.children().remove();
				var allcheck = $("#SetDept").find("input");
				var att="";
				for(var ick=0;ick<allcheck.length;ick++)
				{
					if(allcheck[ick].checked)
					{
						if(allcheck[ick].value=="其他")
						{
							allcheck[ick].value  = $("#txElse").val();
							att = "其他";
						}
							
						fnCreatSetDeptNode("請購單位",allcheck[ick].value,gSetDeptActivNode,att);
					}
				}
				$(gSetDeptRootNode.documentElement).find("請購單位列表").replaceWith(gSetDeptActivNode);
				//叫用refreshView更新畫面
				if($.isFunction(refreshView))
					refreshView();
				alert('儲存完畢');
			}
			else
				return;
		});
		//離開
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#SetDept_Close").click(function() {
		$dlg.find("#SetDept_Close").on("click", function() {
			$.modal.close();
		});
		
		fnInit();
		
		
}
//驗收地點設定子視窗
nsEditor.fnSettingAcceptance = function(dm, $dlg, refreshView)
{
	gSetDeptRootNode = dm.accquireXml();
		
		function fnInit()
		{
			//進行子視窗的初始化
			//取得dataxml內設定的請購單位
			thePublicRsrc.getDataXML(theUserInfo.OrgID).done(function(xmlDoc) {
			
				if(gSetDeptNodePurchase==undefined)
					gSetDeptNodePurchase =  $(xmlDoc.documentElement).find("data[type^='驗收地點']").find("代碼[value!='']");
				
				gSetDeptActivNode = $(gSetDeptRootNode).find("驗收地點列表").clone();
				//以DATAXML裡記錄的資訊建立畫面
				var MainTable = $("#SetDept");
				var breakNode = $("<div style='text-align: left; background-color: rgb(204, 255, 255);'></div>");
				var CheckNode = $("<div class='ui-checkbox' style='display: inline-block;width: 30%;'></div>");
				var id="";
				for(var iDept=0;iDept<gSetDeptNodePurchase.length;iDept++)
				{
					var value = gSetDeptNodePurchase.eq(iDept).attr("value");
					id = "checkbox"+iDept;
					
					if(gSetDeptNodePurchase.eq(iDept).attr("value")=="其他")//其他增加放入一空白輸入欄位
						id = "checkbox_else";

					//1100922 David 1100991 弱掃修正Client Potential XSS
					//CheckNode.append($("<label for='"+id+"' class='ui-btn ui-corner-all ui-btn-c ui-btn-icon-left ui-checkbox-off'><input id='"+id+"' type='checkbox' data-theme='c' value='"+value+"'>"+value+"</label>"));
					CheckNode.append($("<label for='"+id+"' class='ui-btn ui-corner-all ui-btn-c ui-btn-icon-left ui-checkbox-off'><input id='"+id+"' type='checkbox' data-theme='c' value='"+htmlencode(value)+"'>"+htmlencode(value)+"</label>"));
					
					breakNode.append(CheckNode);//將建立的CHECKBOX放入DIV
					
					if(gSetDeptNodePurchase.eq(iDept).attr("value")=="其他")//其他增加放入一空白輸入欄位
						breakNode.append("<div style='width: 30%; display: inline-block; height: 40px;' class='ui-input-text ui-body-inherit ui-corner-all ui-mini ui-shadow-inset'><input class='normal' id='txElse' style='width: 100%;' data-mini='true'></div>");//CHECKBOX 重設
					
					CheckNode = $("<div class='ui-checkbox' style='display: inline-block;width: 30%;'></div>");
					
					if((2*iDept-1) % 3==0)//一列放3筆
					{
						breakNode.appendTo(MainTable);//放入畫面
						//斷行初始化
						breakNode = $("<div style='text-align: left; background-color: rgb(204, 255, 255);'></div>");
					}
					
					if(iDept==gSetDeptNodePurchase.length-1)
					{
						breakNode.appendTo(MainTable);//放入畫面
					}
				}
				//取得目前設定的請購單位	
				if(gSetDeptActivNode.length!=0)
				{
					gSetDeptActivNode.children("驗收地點").each(doPopulateForTrans);//取得現行請購單位清單
					
					function doPopulateForTrans(i, node)
					{
						if($(node).attr("value")=="其他")
						{
							$("#SetDept").find("input[id='checkbox_else']").prop("checked",true);//設定勾選
							$("#SetDept").find("input[id='txElse']").val($(node).text());
						}
						else
						{
							//1100510 David 1100221 移除jQuery.trim()
							//$("#SetDept").find("input[value='"+jQuery.trim($(node).text())+"']").prop("checked",true);//設定勾選
							$("#SetDept").find("input[value='"+jf_Trim($(node).text())+"']").prop("checked",true);//設定勾選
						}
					}
				}
				else
				{
					var nodeTranList = gSetDeptRootNode.createElement("驗收地點列表");
					$(gSetDeptRootNode.documentElement).append(nodeTranList);
					gSetDeptActivNode = $(gSetDeptRootNode).find("驗收地點列表").clone();

				}
			})
		}
		//************************************************************註冊事件****************************************************//

		//儲存
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#SetDept_Save").click(function() {
		$dlg.find("#SetDept_Save").on("click", function() {
				
			if(confirm('您是否要儲存目前畫面中的驗收地點資訊內容？'))
			{
				//建立XML
				gSetDeptActivNode.children().remove();
				var allcheck = $("#SetDept").find("input");
				var att="";
				for(var ick=0;ick<allcheck.length;ick++)
				{
					if(allcheck[ick].checked)
					{
						if(allcheck[ick].value=="其他")
						{
							allcheck[ick].value  = $("#txElse").val();
							att = "其他";
						}
							
						fnCreatSetDeptNode("驗收地點",allcheck[ick].value,gSetDeptActivNode,att);
					}
				}
				$(gSetDeptRootNode.documentElement).find("驗收地點列表").replaceWith(gSetDeptActivNode);
				//叫用refreshView更新畫面
				if($.isFunction(refreshView))
					refreshView();
				alert('儲存完畢');
			}
			else
				return;
		});
		//離開
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#SetDept_Close").click(function() {
		$dlg.find("#SetDept_Close").on("click", function() {
			$.modal.close();
		});
		
		fnInit();
		
		
}

function fnCreatSetDeptNode(argNodeName,argNodeVal,argMomNode,argAttr)
{
	var newNodeInfo = gSetDeptRootNode.createElement(argNodeName); 
	if(argAttr!="")
		newNodeInfo.setAttribute("value",argAttr);
		//1100510 David 1100221 移除jQuery.trim()
		/*if("text" in newNodeInfo)
			newNodeInfo.text = jQuery.trim(argNodeVal);
		else
			newNodeInfo.textContent = jQuery.trim(argNodeVal);*/
		if("text" in newNodeInfo)
			newNodeInfo.text = jf_Trim(argNodeVal);
		else
			newNodeInfo.textContent = jf_Trim(argNodeVal);
	argMomNode.append(newNodeInfo)
}

//1100922 David 1100991 弱掃修正
function htmlencode(s){
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-SetDept.js").finish();
})();
