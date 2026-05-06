// 期望語設定子視窗
/*DATE 		SA		PG		MGR_NO		DESC	
  1051020	Cloud	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
  1051215	Cloud	--		1050087		修正全刪除會異常問題
  1080903	Kevin	Joe		1080339		jQuery升級2.2.4
  1081008	Kevin	Joe		1080339		jQuery升級3.4.1
  1081217	Kevin	Joe		1080339		修正jQuery升級錯誤，此處傳入為xmldocument
  1100506	Kevin	David	1100473		弱掃修正Client Potential XSS
  1100510	Kevin	David	1100221		支援jQuery3.5.1，調整jQuery.trim用法
  1100922	Kevin	David	1100991		弱掃修正Client Potential XSS
  1120901	David	David	1120407		取得Data檔時，依公文對應的機關代碼取得
  1120901 	Kevin	Leslie  1120709 	弱掃修正Client DOM Stored XSS
*/
var nsEditor = nsEditor||{};
nsEditor.StateSetting = function(dm, $dlg, refreshView)
{
	var gstatenode;
	var StaterawXml
	function fnInit()
	{
		StaterawXml = dm.accquireXml();	// StaterawXml原始XML文件從dm取得
		gstatenode = $(StaterawXml.documentElement).find("> 敬陳").clone();//受文者編輯子視窗異動的受文者清單
		if(gstatenode.length!=0)
		{
			var titleNodes = gstatenode.find("職稱");
			var NameNodes = gstatenode.find("姓名");
			for(var node=0;node<titleNodes.length;node++)
			{	
				if(titleNodes.eq(node).text()+NameNodes.eq(node).text()!="")
				{
					//1051020	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
					//$dlg.find("#State_ItemList").append("<option value='"+titleNodes.eq(node).text()+"|"+NameNodes.eq(node).text()+"'>"+titleNodes.eq(node).text()+NameNodes.eq(node).text()+"</option>");
					// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
					// $("<li data-value='" + titleNodes.eq(node).text()+"|"+NameNodes.eq(node).text() + "'>" + titleNodes.eq(node).text()+NameNodes.eq(node).text() + "</li>").appendTo($dlg.find("#State_ItemList"))
					$("<li data-value='" + htmlencode(titleNodes.eq(node).text())+"|"+htmlencode(NameNodes.eq(node).text()) + "'>" + htmlencode(titleNodes.eq(node).text()+NameNodes.eq(node).text()) + "</li>").appendTo($dlg.find("#State_ItemList"))
					//1081008	Joe		1080339		jQuery升級3.4.1
					// .click(function(evt) {
					.on("click", function(evt) {
						$dlg.find("#State_ItemList").find("li").removeClass("ui-btn-active");
						$(this).addClass("ui-btn-active").css("background","#fadb4e").css("text-shadow","0 1px 0 #fff")
						.css("border","none");
					});
				}
			}
			//1051020	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
			$dlg.find("#State_ItemList").listview("refresh");
		}
		else
		{
			//1050819 Cloud	配合ie 修改xml節點修改方式
			//$(StaterawXml.documentElement).append("<敬陳><敬陳詞彙></敬陳詞彙></敬陳>");
			var nodeTostateList = StaterawXml.createElement("敬陳");
			$(StaterawXml.documentElement).append(nodeTostateList);
			gstatenode = $(StaterawXml.documentElement).find("> 敬陳").clone();
		}
		//1120901 David 1120407 取得Data檔時，依公文對應的機關代碼取得
		//thePublicRsrc.getDataXML(Common.activeRole.orgNo)//取得設定詞彙
		thePublicRsrc.getDataXML(theAOL.docObj.sourceOrgNo)//取得設定詞彙
		.done(function(datDoc) 
		{
		
			var $conPhrase = $(datDoc.documentElement).find("data[type='敬陳者常用辭彙']");
			if($conPhrase.length) {
				$("#State_wordlist").empty();	// 先清空辭彙項目
				$conPhrase.find("代碼").each(function(idx, nd) 
				{
					//1080903	Joe		1080339		jQuery升級2.2.4
					// $dlg.find("#State_wordlist").append("<option value='" + $(nd).attr("value") + "'>" + $(nd).text() + "</option>");
					//1081217	Joe		1080339		修正jQuery升級錯誤，此處傳入為xmldocument
					// $dlg.find("#State_wordlist").append("<option value='" + $(nd).prop("value") + "'>" + $(nd).text() + "</option>");
					//1100506 David 1100473 弱掃修正Client Potential XSS
					//$dlg.find("#State_wordlist").append("<option value='" + $(nd).attr("value") + "'>" + $(nd).text() + "</option>");
					//1100922 David 1100991 弱掃修正Client Potential XSS
					//$dlg.find("#State_wordlist").append("<option value='" + htmlencode($(nd).attr("value")) + "'>" + $(nd).text() + "</option>");
					$dlg.find("#State_wordlist").append("<option value='" + htmlencode($(nd).attr("value")) + "'>" + htmlencode($(nd).text()) + "</option>");
				});
				//須執行refresh才會有選單
				$dlg.find('#State_wordlist').selectmenu('refresh');
			}
			else 
			{
				theLogger.error(Common.activeRole.orgNo + "_Data.xml中找不到'type'為'敬陳者常用辭彙'的data清單!?");
			}
		
		})
	}
	//1100510 David 1100221 移除jQuery.trim()，改使用共用方法
	/*function jf_Trim(Object)
	{
		return jQuery.trim(Object);
	}*/

	//加入
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#State_addItem").click(function(){
	$dlg.find("#State_addItem").on("click", function(){
	
		var Title = jf_Trim($("#State_Title").val());
		var Name = jf_Trim($("#State_name").val());
		if(Title+Name!="")
			//1051020	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
			//$dlg.find("#State_ItemList").append("<option value='"+Title+"|"+Name+"'>"+Title+Name+"</option>");
			$("<li data-value='" +Title+"|"+Name+ "'>" +Title+Name+ "</li>").appendTo($dlg.find("#State_ItemList"))
			//1081008	Joe		1080339		jQuery升級3.4.1
			// .click(function(evt) {
			.on("click", function(evt) {
				$dlg.find("#State_ItemList").find("li").removeClass("ui-btn-active").css("background","").css("text-shadow","")
				.css("border","");
				$(this).addClass("ui-btn-active").css("background","#fadb4e").css("text-shadow","0 1px 0 #fff")
				.css("border","none");
			});
		$dlg.find("#State_Title").val("");
		$dlg.find("#State_name").val("");
		$dlg.find("#State_ItemList").listview("refresh");
	
	});
	//移除
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#State_delItem").click(function(){
	$dlg.find("#State_delItem").on("click", function(){
		//1051020	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
		/*var si = $dlg.find("#State_ItemList").prop("selectedIndex");
		if(si >= 0) 
		{
			var opts = $dlg.find("#State_ItemList").prop("options");
			opts.remove(si);
		}*/
		var $si = $dlg.find("#State_ItemList").find(".ui-btn-active");
		if($si.length > 0) {
			var $u = $si.eq(0);
			$u.remove();
		}
	});
	//上移
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#State_moveUp").click(function(){
	$dlg.find("#State_moveUp").on("click", function(){
		//1051020	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
		/*var si = $dlg.find("#State_ItemList").prop("selectedIndex");
		if(si >= 0) 
		{
			var opts = $dlg.find("#State_ItemList").find("option").eq(si);
			opts.insertBefore(opts.prev());
		}*/
		var $si = $dlg.find("#State_ItemList").find(".ui-btn-active");
		if($si.length > 0) {
			var $u = $si.eq(0);
			if($u.prev().length > 0) {
				$u.after($u.prev());
			}
		}	
	});
	//下移
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#State_moveDown").click(function(){
	$dlg.find("#State_moveDown").on("click", function(){
		//1051020	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
		/*var si = $dlg.find("#State_ItemList").prop("selectedIndex");
		if(si >= 0) 
		{
			var opts = $dlg.find("#State_ItemList").find("option").eq(si);
			opts.insertAfter(opts.next());
		}*/
		var $si = $dlg.find("#State_ItemList").find(".ui-btn-active");
		if($si.length > 0) {
			var $u = $si.eq(0);
			if($u.next().length > 0) {
				$u.before($u.next());
			}
		}
	});
	//儲存
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#State_Save").click(function(){
	$dlg.find("#State_Save").on("click", function(){
	
		//將畫面資料回寫至XML內
		//1051020	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
		//var Opts = $dlg.find("#State_ItemList").find("option");
		var Opts = $dlg.find("#State_ItemList").find("li");
		
		
		var Title;
		var Name;
		//清空-重塞
		gstatenode.children().remove();
		
		if(Opts.length!=0)
		{
			//1050819 Cloud	配合ie修改xml節點異動方式
			//gstatenode.find("敬陳詞彙").text($("#State_wordlist option:selected").val());
			gstatenode.append(fnSetToStateTextOfElement($(StaterawXml.createElement("敬陳詞彙")),$("#State_wordlist option:selected").val()).get(0));
			//for(var opt=0;opt<Opts.length;opt++)
			//{
				
				//Title = Opts.eq(opt).attr("value").split('|')[0];
				//Name = Opts.eq(opt).attr("value").split('|')[1];
				//1050819 Cloud	配合ie修改xml節點異動方式
				/*gstatenode.append("<職稱>"+Title+"</職稱>");
				gstatenode.append("<姓名>"+Name+"</姓名>");*/
				//gstatenode.append(fnSetToStateTextOfElement($(StaterawXml.createElement("職稱")),Title).get(0));
				//gstatenode.append(fnSetToStateTextOfElement($(StaterawXml.createElement("姓名")),Name).get(0));
			//}
			$dlg.find("#State_ItemList").find("li").each(function(idx, nd) {

				Title = nd.getAttribute("data-value").split('|')[0];
				Name = nd.getAttribute("data-value").split('|')[1];
				gstatenode.append(fnSetToStateTextOfElement($(StaterawXml.createElement("職稱")),Title).get(0));
				gstatenode.append(fnSetToStateTextOfElement($(StaterawXml.createElement("姓名")),Name).get(0));
			});
			
		}
		else
			//1050819 Cloud	配合ie修改xml節點異動方式
			//gstatenode.find("敬陳詞彙").text("");
			{
				gstatenode.append(fnSetToStateTextOfElement($(StaterawXml.createElement("敬陳詞彙")).get(0),"　"));
				gstatenode.append(fnSetToStateTextOfElement($(StaterawXml.createElement("職稱")).get(0),"　"));
				gstatenode.append(fnSetToStateTextOfElement($(StaterawXml.createElement("姓名")).get(0),"　"));
			}
			
			$(StaterawXml.documentElement).find("> 敬陳").replaceWith(gstatenode);
		
		//叫用refreshView更新畫面
		if($.isFunction(refreshView))
			refreshView();
		$.modal.close();
	});
	//1050819 Cloud	配合ie修改xml節點異動方式-增加函式處理節點值
	function fnSetToStateTextOfElement(objElement,textValue)
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
	//離開
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#State_close").click(function(){
	$dlg.find("#State_close").on("click", function(){
		$.modal.close();
	});
	
	//1100506 David 1100473 弱掃修正
	function htmlencode(s){
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}
	
	fnInit();
};
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-ToState.js").finish();
})();
