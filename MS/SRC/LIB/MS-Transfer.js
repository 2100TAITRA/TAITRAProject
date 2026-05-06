// 獎懲設定及投標廠商設定子視窗
//	
/*DATE 		SA		PG		MGR_NO		DESC
   1081008	1080905		David	David	iOS升級後瀏覽器判斷已無"iPad"字樣，調整判斷方式	
  1081008	Kevin	Joe		1080339		jQuery升級3.4.1
*/	

var TransfrancolWidths = [];
var nsEditor = nsEditor||{};
var gTransferNode;
var gTransferRootNode;
//1051108	Cloud	開啟一代辦一半公文，資訊來源會是會辦單位列表
var bIsOldXml = false;
//投標廠商設定
nsEditor.fnSettingTransfer = function(dm, $dlg, refreshView)
{
		gTransferRootNode = dm.accquireXml();
		//隱藏獎懲相關欄位
		$dlg.find("#Transfer2").css("display","none");
		$dlg.find("#Transfer2_Data_div").css("display","none");
		function fnInit()
		{
			//進行子視窗的初始化
			if(TransfrancolWidths.length==0)
				$dlg.find(".ui-table-header-PC_Transfer .ui-table-column-header").each(function(i, elem) {TransfrancolWidths.push($(elem).css("width"));});
				
				gTransferNode = $(gTransferRootNode).find("廠商投標資訊").clone();
			//1051108	Cloud	開啟一代辦一半公文，資訊來源會是會辦單位列表
			if(gTransferNode.find("人員").length==0)
			{
				$(gTransferRootNode).find("廠商投標資訊").remove();
				if($(gTransferRootNode).find("會稿單位列表").find("人員").length!=0)//將會稿單位列表轉為廠商投標資訊
				{
					fnTranWrap($(gTransferRootNode).find("會稿單位列表"),"廠商投標資訊");
				}
				gTransferNode = $(gTransferRootNode).find("廠商投標資訊").clone();
			}
			
			if(gTransferNode.length!=0)
			{
				gTransferNode.children("人員").each(doPopulateForTrans);//取得廠商清單
				
				function doPopulateForTrans(i, node){ //產生節點並放入畫面
						
						var $list = $dlg.find("#Transfer_receiverList");//取得TABLE 畫面要放入區塊
						
						var $li = $("<li class='ui-table-item-PC'></li>");

						fnsetTransferTablaColumn($("<div style='width: 2%; display: inline-block;'><input type='checkbox'></div>").appendTo($li).find("input"),TransfrancolWidths[0],"","Transfer_cbSel_"+i,"選");
						
						fnsetTransferTablaColumn($("<div style='width: 15%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[1],$(node).find("投標廠商").text(),"Transfer_OrgName_"+i,"投標廠商");
							
						fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[2],$(node).find("標價").text(),"Transfer_Price_"+i,"標價");
							
						fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[3],$(node).find("優先減價後之標價").text(),"Transfer_Price1_"+i,"優先減價後之標價");
												
						fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[4],$(node).find("第一次比減價格後之標價").text(),"Transfer_Price2_"+i,"第一次比減價格後之標價");

						fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[5],$(node).find("第二次比減價格後之標價").text(),"Transfer_Price3_"+i,"第二次比減價格後之標價");
						
						fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[6],$(node).find("第三次比減價格後之標價").text(),"Transfer_Price4_"+i,"第三次比減價格後之標價");
							
						$li.appendTo($list);
				}
			}
			else
			{
				var nodeTranList = gTransferRootNode.createElement("廠商投標資訊");
				$(gTransferRootNode.documentElement).append(nodeTranList);
				gTransferNode = $(gTransferRootNode).find("廠商投標資訊").clone();

			}
		}
		//************************************************************註冊事件****************************************************//
		//加入
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer_Addnew").click(function() {
		$dlg.find("#Transfer_Addnew").on("click", function() {
			
			//取得TABLE 畫面要放入區塊
			var TranInfo = 
			{
				"OrgName" :$("#Transfer_txOrgName").val(),
				"Price" :$("#Transfer_Price").val(),
				"Price1" :$("#Transfer_Price1").val(),
				"Price2" :$("#Transfer_Price2").val(),
				"Price3" :$("#Transfer_Price3").val(),
				"Price4" :$("#Transfer_Price4").val(),
			}
			var $list = $dlg.find("#Transfer_receiverList");
			var seq = $dlg.find("#Transfer_receiverList").children().length;
			var Xmlseq = $dlg.find("#Transfer_receiverList").children().length+1;
						
			var $li = $("<li class='ui-table-item-PC'></li>");

			fnsetTransferTablaColumn($("<div style='width: 2%; display: inline-block;'><input type='checkbox'></div>").appendTo($li).find("input"),TransfrancolWidths[0],"","Transfer_cbSel_"+seq,"選");
			
			fnsetTransferTablaColumn($("<div style='width: 15%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[1],TranInfo.OrgName,"Transfer_OrgName_"+seq,"投標廠商");
				
			fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[2],TranInfo.Price,"Transfer_Price_"+seq,"標價");
				
			fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[3],TranInfo.Price1,"Transfer_Price1_"+seq,"優先減價後之標價");
									
			fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[4],TranInfo.Price2,"Transfer_Price2_"+seq,"第一次比減價格後之標價");

			fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[5],TranInfo.Price3,"Transfer_Price3_"+seq,"第二次比減價格後之標價");
			
			fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[6],TranInfo.Price4,"Transfer_Price4_"+seq,"第三次比減價格後之標價");
				
			$li.appendTo($list);
			
			//建立XML
			var newNode = gTransferRootNode.createElement("人員");
				newNode.setAttribute("序",Xmlseq);
			fnCreatTranNode("投標廠商",TranInfo.OrgName,newNode);
			fnCreatTranNode("標價",TranInfo.Price,newNode);
			fnCreatTranNode("優先減價後之標價",TranInfo.Price1,newNode);
			fnCreatTranNode("第一次比減價格後之標價",TranInfo.Price2,newNode);
			fnCreatTranNode("第二次比減價格後之標價",TranInfo.Price3,newNode);
			fnCreatTranNode("第三次比減價格後之標價",TranInfo.Price4,newNode);
			$(gTransferNode).append(newNode);
			$("#Transfer_txOrgName").val("");
			$("#Transfer_Price").val("");
			$("#Transfer_Price1").val("");
			$("#Transfer_Price2").val("");
			$("#Transfer_Price3").val("");
			$("#Transfer_Price4").val("");
		});
		
		//儲存
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer_Save").click(function() {
		$dlg.find("#Transfer_Save").on("click", function() {
				
			if(confirm('您是否要儲存目前畫面中的投標廠商資訊內容？'))
			{
				$(gTransferRootNode.documentElement).find("廠商投標資訊").replaceWith(gTransferNode);
				//叫用refreshView更新畫面
				if($.isFunction(refreshView))
					refreshView();
				$.modal.close();
			}
			else
				return;
		});
		//離開
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer_Close").click(function() {
		$dlg.find("#Transfer_Close").on("click", function() {
			$.modal.close();
		});
		
		//刪除
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer_btDelete").click(function() {
		$dlg.find("#Transfer_btDelete").on("click", function() {
			
			var icheckboxlength = $("#Transfer_receiverTable").find("input[id^='Transfer_cbSel_']").length;
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#Transfer_receiverTable").find("input[id^='Transfer_cbSel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i+1;//xml的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲刪除的廠商資訊');
				return;
			}	
			
			if(!confirm('請確認是否刪除第'+arCheckedIdx+'筆廠商資訊？'))
				return;

			fnDelete(arCheckedIdx,$("#Transfer_receiverList"));
		});
		//上移
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer_btMoveUp").click(function() 
		$dlg.find("#Transfer_btMoveUp").on("click", function() 
		{
			
			var icheckboxlength = $("#Transfer_receiverTable").find("input[id^='Transfer_cbSel_']").length;
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#Transfer_receiverTable").find("input[id^='Transfer_cbSel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i;//畫面的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲移動的廠商資訊');
				return;
			}	
			arCheckedIdx.sort();
			fnMoveUp(arCheckedIdx);
		});
		//下移
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer_btMoveDown").click(function() 
		$dlg.find("#Transfer_btMoveDown").on("click", function() 
		{
			var icheckboxlength = $("#Transfer_receiverTable").find("input[id^='Transfer_cbSel_']").length;
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#Transfer_receiverTable").find("input[id^='Transfer_cbSel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i;//xml的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲移動的廠商資訊');
				return;
			}	
			arCheckedIdx.reverse();	//由大到小
			fnMoveDown(arCheckedIdx,icheckboxlength);
		});
		fnInit();
		
}
//獎懲設定子視窗
nsEditor.fnSettingTransfer2 = function(dm, $dlg, refreshView)
{
		gTransferRootNode = dm.accquireXml();
		$dlg.find("#Transfer").css("display","none");
		$dlg.find("#Transfer_Data_div").css("display","none");
		function fnInit()
		{
			//進行子視窗的初始化
			/*if(TransfrancolWidths.length==0)
				$dlg.find(".ui-table-header-PC_Transfer .ui-table-column-header").each(function(i, elem) {TransfrancolWidths.push($(elem).css("width"));});*/
				
				gTransferNode = $(gTransferRootNode).find("職員獎懲敘獎資訊").clone();
			//1051108	Cloud	開啟一代辦一半公文，資訊來源會是會辦單位列表
			if(gTransferNode.find("人員").length==0)
			{
				$(gTransferRootNode).find("職員獎懲敘獎資訊").remove();
				if($(gTransferRootNode).find("會稿單位列表").find("人員").length!=0)//將會稿單位列表轉為廠商投標資訊
				{
					fnTranWrap($(gTransferRootNode).find("會稿單位列表"),"職員獎懲敘獎資訊");
				}
				gTransferNode = $(gTransferRootNode).find("職員獎懲敘獎資訊").clone();
			}
			
			if(gTransferNode.length!=0)
			{
				gTransferNode.children("人員").each(doPopulateForTrans);//取得廠商清單
				
				function doPopulateForTrans(i, node){ //產生節點並放入畫面
						
						var $list = $dlg.find("#Transfer2_receiverList");//取得TABLE 畫面要放入區塊
						
						var $li = $("<li class='ui-table-item-PC'></li>");

						fnsetTransferTablaColumn($("<div style='width: 2%; display: inline-block;'><input type='checkbox'></div>").appendTo($li).find("input"),TransfrancolWidths[0],"","Transfer_cbSel_"+i,"選");
						                                               
						fnsetTransferTablaColumn($("<div style='width: 10%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[1],$(node).find("職稱").text(),"Transfer_OrgName_"+i,"職稱");
							                                           
						fnsetTransferTablaColumn($("<div style='width: 10%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[2],$(node).find("姓名").text(),"Transfer_Price_"+i,"姓名");
							                                           
						fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[3],$(node).find("主協辦事項").text(),"Transfer_Price1_"+i,"主協辦事項");
												                       
						fnsetTransferTablaColumn($("<div style='width: 22%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[4],$(node).find("績效貢獻深遠影響或創意").text(),"Transfer_Price2_"+i,"績效貢獻深遠影響或創意");
                                                                       
						fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[5],$(node).find("建議獎勵額度").text(),"Transfer_Price3_"+i,"建議獎勵額度");
						                                               
						fnsetTransferTablaColumn($("<div style='width: 16%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[6],$(node).find("依據條款").text(),"Transfer_Price4_"+i,"依據條款");
							
						$li.appendTo($list);
				}
			}
			else
			{
				var nodeTranList = gTransferRootNode.createElement("職員獎懲敘獎資訊");
				$(gTransferRootNode.documentElement).append(nodeTranList);
				gTransferNode = $(gTransferRootNode).find("職員獎懲敘獎資訊").clone();

			}
		}
		//************************************************************註冊事件****************************************************//
		//加入
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer2_Addnew").click(function() {
		$dlg.find("#Transfer2_Addnew").on("click", function() {
			
			//取得TABLE 畫面要放入區塊
			var TranInfo = 
			{
				"title" :$("#Transfer_title").val(),
				"Name" :$("#Transfer_Name").val(),
				"MainThing" :$("#Transfer_MainThing").val(),
				"Effect" :$("#Transfer_Effect").val(),
				"Reward" :$("#Transfer_Reward").val(),
				"Follow" :$("#Transfer_Follow").val(),
			}
			var $list = $dlg.find("#Transfer2_receiverList");
			var seq = $dlg.find("#Transfer2_receiverList").children().length;
			var Xmlseq = $dlg.find("#Transfer2_receiverList").children().length+1;
						
			var $li = $("<li class='ui-table-item-PC'></li>");
			
			fnsetTransferTablaColumn($("<div style='width: 2%; display: inline-block;'><input type='checkbox'></div>").appendTo($li).find("input"),TransfrancolWidths[0],"","Transfer_cbSel_"+seq,"選");
			
			fnsetTransferTablaColumn($("<div style='width: 10%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[1],TranInfo.title,"Transfer_title_"+seq,"職稱");
				
			fnsetTransferTablaColumn($("<div style='width: 10%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[2],TranInfo.Name,"Transfer_Name_"+seq,"姓名");
				
			fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[3],TranInfo.MainThing,"Transfer_MainThing_"+seq,"主協辦事項");
									
			fnsetTransferTablaColumn($("<div style='width: 22%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[4],TranInfo.Effect,"Transfer_Effect_"+seq,"績效貢獻深遠影響或創意");

			fnsetTransferTablaColumn($("<div style='width: 14%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[5],TranInfo.Reward,"Transfer_Reward_"+seq,"建議獎勵額度");
			
			fnsetTransferTablaColumn($("<div style='width: 16%; display: inline-block;'><input></div>").appendTo($li).find("input"),TransfrancolWidths[6],TranInfo.Follow,"Transfer_Follow_"+seq,"依據條款");
				
			$li.appendTo($list);
			
			//建立XML
			var newNode = gTransferRootNode.createElement("人員");
				newNode.setAttribute("序",Xmlseq);
			fnCreatTranNode("職稱",TranInfo.title,newNode);
			fnCreatTranNode("姓名",TranInfo.Name,newNode);
			fnCreatTranNode("主協辦事項",TranInfo.MainThing,newNode);
			fnCreatTranNode("績效貢獻深遠影響或創意",TranInfo.Effect,newNode);
			fnCreatTranNode("建議獎勵額度",TranInfo.Reward,newNode);
			fnCreatTranNode("依據條款",TranInfo.Follow,newNode);
			$(gTransferNode).append(newNode);
			$("#Transfer_title").val("");
			$("#Transfer_Name").val("");
			$("#Transfer_MainThing").val("");
			$("#Transfer_Effect").val("");
			$("#Transfer_Reward").val("");
			$("#Transfer_Follow").val("");
		});
		//儲存
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer_Save").click(function() {
		$dlg.find("#Transfer_Save").on("click", function() {
				
			if(confirm('您是否要儲存目前畫面中的職員獎懲敘獎資訊內容？'))
			{
				$(gTransferRootNode.documentElement).find("職員獎懲敘獎資訊").replaceWith(gTransferNode);
				if($.isFunction(refreshView))
					refreshView();
				$.modal.close();
			}
			else
				return;
		});
		//離開
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer_Close").click(function() {
		$dlg.find("#Transfer_Close").on("click", function() {
			$.modal.close();
		});
		
		//刪除
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer2_btDelete").click(function() {
		$dlg.find("#Transfer2_btDelete").on("click", function() {
			
			var icheckboxlength = $("#Transfer2_receiverTable").find("input[id^='Transfer_cbSel_']").length;
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#Transfer2_receiverTable").find("input[id^='Transfer_cbSel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i+1;//xml的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲刪除的人員資訊');
				return;
			}	
			
			if(!confirm('請確認是否刪除第'+arCheckedIdx+'筆人員資訊？'))
				return;
			fnDelete(arCheckedIdx,$("#Transfer2_receiverList"));
			
		});
		//上移
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer2_btMoveUp").click(function() 
		$dlg.find("#Transfer2_btMoveUp").on("click", function() 
		{
			
			var icheckboxlength = $("#Transfer2_receiverTable").find("input[id^='Transfer_cbSel_']").length;
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#Transfer2_receiverTable").find("input[id^='Transfer_cbSel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i;//畫面的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲移動的人員資訊');
				return;
			}	
			arCheckedIdx.sort();
			fnMoveUp(arCheckedIdx);
			
		});
		//下移
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Transfer2_btMoveDown").click(function() 
		$dlg.find("#Transfer2_btMoveDown").on("click", function() 
		{
			var icheckboxlength = $("#Transfer2_receiverTable").find("input[id^='Transfer_cbSel_']").length;
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#Transfer2_receiverTable").find("input[id^='Transfer_cbSel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i;//xml的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲移動的人員資訊');
				return;
			}	
			arCheckedIdx.reverse();	//由大到小
			fnMoveDown(arCheckedIdx,icheckboxlength);
			
		});
		fnInit();
}

//設定xml資料
function fnsetTransferTablaColumn(argobj,argWith,argval,argId,argTagName)
{
	argobj.css("width", "100%").val(argval).attr("id",argId);
	if(argTagName!="選")
		argobj.parent().addClass("ui-input-text ui-body-inherit ui-corner-all ui-mini ui-shadow-inset")
		//1081008	Joe		1080339		jQuery升級3.4.1
		// .bind("change",function(envnt) {fnSetTransferInfo(event.target.id,argTagName,event.target.value);});
		.on("change",function(envnt) {fnSetTransferInfo(event.target.id,argTagName,event.target.value);});
	else
	{
		
		//if(navigator.userAgent.match("Chrome")==null)
		//非Chrome 非iPad
		//1081008 David 1080905 iOS升級後瀏覽器判斷已無"iPad"字樣，調整判斷方式
		/*if(navigator.userAgent.match("Chrome")==null && navigator.userAgent.match("iPad")==null)
			argobj.parent().css("border-style","none").addClass("ui-input-text ui-mini");
		else
			argobj.parent().css("border-style","none");*/
		if(navigator.userAgent.indexOf("Trident") > 0)//瀏覽器為IE
			argobj.parent().css("border-style","none").addClass("ui-input-text ui-mini");
		else
			argobj.parent().css("border-style","none");
	}
}
function fnMoveTranData(argData,newseq)
{
	var Iputidindex=newseq-1;//新位置的id數字
	for(var iData=0;iData<argData.length;iData++)//逐個INPUT換ID
	{		
		if(argData.eq(iData).attr("id")!="")
		{
			newid = argData.eq(iData).attr("id").split('_')[0]+"_"+argData.eq(iData).attr("id").split('_')[1]+"_"+Iputidindex;
			argData.eq(iData).attr("id",newid);
		}
	}
}

//將畫面異動資訊設定至XML物件
function fnSetTransferInfo(argId,argTagName,argVal)
{
	var sTmp = argId.split("_")[2];
	var sFindNum = parseInt(sTmp)+1;
	fnSetTextOfElement(gTransferNode.find(">人員[序='"+sFindNum+"']").children(argTagName),jf_Trim(argVal));
}

function fnSetTextOfElement(objElement,textValue)
{
	for(var i=0,maxIdx = objElement.length;i<maxIdx;i++){
		var u = objElement.get(i);
		if("text" in u)
			u.text = textValue;
		else
			u.textContent = textValue;
	}
	return objElement;	//把傳進來的物件再回傳出去，方便再接著呼叫其他JQuery功能
}
function fnCreatTranNode(argNodeName,argNodeVal,argMomNode)
{
	var newNodeInfo = gTransferRootNode.createElement(argNodeName); 
		if("text" in newNodeInfo)
			newNodeInfo.text = argNodeVal;
		else
			newNodeInfo.textContent = argNodeVal;
	$(argMomNode).append(newNodeInfo);
}
//刪除
function fnDelete(argArray,argTablobj)
{
	var xmlObj ;
			
	for(var i=argArray.length-1;i>=0;i--)
	{
		xmlObj = gTransferNode.find("人員[序='"+argArray[i]+"']");
	
		argTablobj.find("li.ui-table-item-PC").eq(argArray[i]-1).remove();
		xmlObj.remove();
	}
	//序重建
	xmlObj = gTransferNode.find("人員");
	var NewSeq;
	for(var iXml=0;iXml<xmlObj.length;iXml++)
	{
		NewSeq = iXml+1;
		xmlObj.get(iXml).setAttribute("序",NewSeq);
		fnMoveTranData($("li.ui-table-item-PC").eq(iXml).find("input"),NewSeq);
	}
}
//上移
function fnMoveUp(argArray)
{
	for(var iDept=0;iDept<argArray.length;iDept++)
	{
		if (argArray[iDept]>0)
		{
			var Nowseq = parseInt(argArray[iDept]);//現在異動的受文者序
			var Newseq = Nowseq;//新的位置序
			var XMLseq = Nowseq+1;//現在受文者在XML序
			var NewXMLseq = XMLseq;//新受文者在XML序
			Newseq--;
			NewXMLseq--;

			gTransferNode.find("人員[序='"+XMLseq+"']").prev().attr("序","");//序交換
			gTransferNode.find("人員[序='"+XMLseq+"']").insertBefore(gTransferNode.find("人員[序='"+XMLseq+"']").prev()).attr("序",NewXMLseq);
			gTransferNode.find("人員[序='"+NewXMLseq+"']").next().attr("序",XMLseq);//序交換
				
			fnMoveTranData($("li.ui-table-item-PC").eq(Nowseq).find("input"),NewXMLseq);//替換現在上移的ID
			
			fnMoveTranData($("li.ui-table-item-PC").eq(Nowseq).prev().find("input"),XMLseq);//替換被移下來的ID
			//畫面資料搬移
			$("li.ui-table-item-PC").eq(Nowseq).insertBefore($("li.ui-table-item-PC").eq(Nowseq).prev());
		}
		else
		{
			alert('已移到第一筆');
			return;
		}	
	}
}
//下移
function fnMoveDown(argArray,argMaxLength)
{
	for(var iDept=0;iDept<argArray.length;iDept++)
	{
		if (argArray[iDept] < argMaxLength) 
		{
			var Nowseq = parseInt(argArray[iDept]);//現在異動的序
			var Newseq = Nowseq;//新的位置序-判斷上下移之後再做++ --
			var XMLseq = Nowseq+1;//現在受文者在XML序
			var NewXMLseq = XMLseq;//新受文者在XML序-判斷上下移之後再做++ --
			Newseq++;
			NewXMLseq++;

			if(argMaxLength==XMLseq)//新的序已經是最大長度，不做移動
			{
				alert("已移到最後一筆");
				return;
			}
				
			//把下一筆的序換成暫存
			gTransferNode.find("人員[序='"+XMLseq+"']").next().attr("序","");
			//把自己塞到下一筆後面去
			gTransferNode.find("人員[序='"+XMLseq+"']").insertAfter(gTransferNode.find("人員[序='"+XMLseq+"']").next()).attr("序",NewXMLseq);
			gTransferNode.find("人員[序='"+NewXMLseq+"']").prev().attr("序",XMLseq);
			//做ID交換完畢再做畫面資料更換
				
			fnMoveTranData($("li.ui-table-item-PC").eq(Nowseq).find("input"),NewXMLseq);//替換現在的受文者ID
			fnMoveTranData($("li.ui-table-item-PC").eq(Nowseq).next().find("input"),XMLseq);//替換被移下來的受文者ID
			//畫面資料搬移
			$("li.ui-table-item-PC").eq(Nowseq).insertAfter($("li.ui-table-item-PC").eq(Nowseq).next());
		
		}
		else
		{
			alert('已移到最後一筆');
			return;
		}
	}
}
//1051108	Cloud	置換舊節點
function fnTranWrap(objElement, newNodeName)
{
	var docElement = gTransferRootNode;
	var newNode = docElement.createElement(newNodeName);
	var domElement = objElement.get(0);
	
	//copy 所有Attribute
	for(var i=0,maxAttrIdx = domElement.attributes.length;i<maxAttrIdx;i++){
		newNode.setAttribute(domElement.attributes[i].name,domElement.attributes[i].value);
	}
	
	//copy 所有的子節點
	var cloneNodeList = objElement.children().clone();
	for(var i=0,maxIdx = cloneNodeList.length;i<maxIdx;i++)
		$(newNode).append(cloneNodeList[i]);
	//新建立的Node，塞在自己的前面
	domElement.parentNode.insertBefore(newNode,domElement);
	//再把自己砍了~~
	$(domElement).remove();
}
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-Transfer.js").finish();
})();
