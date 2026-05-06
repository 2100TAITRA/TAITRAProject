// 錯別字校正資料物件
//	
// DATE		SA			PRG			MGR_NO		DESC
// 1140121	Raymond		Raymond		1131303		初版
// 1140124  Eric        Eric		1131303		開發註解



// MS_SSO全域物件
// theLogger: MS project日誌物件
// theModMgr: MS模組管理物件
// 

function FixWordData() {
	
	// 錯別字校正記錄檔
	// 公文子目錄\FixWordData.json
	//	docNo
	//	msgId
	//	draftFixData[] {	// FixDraft
	//		draftGUID
	//		paraFixData[] {	// FixPara
	//			paraGUID
	//			contentHash
	//			fixWordList[] {	// FixWord
	//				status
	//				confidence
	//				startIdx
	//				endIdx
	//				origChar
	//				fixChar
	//				currCndtIdx
	//				fixCandidates[]
	//			}
	//		}
	//	}
	
	
	var _dataObj = {docNo: "", msgId: "", draftFixData: []};
	var that = this;
	// 測試用
	this.getData =  function () {
        return _dataObj; 
	}
	// 文號屬性
	this.docNo = function() {
		if(arguments.length > 0)
			_dataObj.docNo = arguments[0];
		return _dataObj.docNo;
	}
	// MsgId屬性
	this.msgId = function() {
		if(arguments.length > 0)
			_dataObj.msgId = arguments[0];
		return _dataObj.msgId;
	}
	// 載入
	this.load = function(obj) {
		var dfd = $.Deferred();
		try{
			_dataObj = obj;
			dfd.resolve();
		} catch (err){
			dfd.reject(err.message)
		}
		return dfd.promise();
	}
	// 儲存
	this.save = function() {
		var dfd = $.Deferred();
		try{
			dfd.resolve(_dataObj);
		} catch (err) {
			dfd.reject(err.message)
		}
			return dfd.promise();
	}
	// 對應文稿, 新增稿件/開啟舊檔時映對文稿XML中主旨、段落、條列中的文字
	this.mapDraft = function(draftGUID, dm, isOwnDraft) {
		var dfd = $.Deferred();
		// TODO: 搜尋或建立draftGUID的FixDraft物件
		//Ray 0217 確認draftFixData 中存在 draftGUID,不存在則建立

		const draftFixData = _dataObj.draftFixData;

		let foundDraft = draftFixData.find(draft => draft.draftGUID === draftGUID);

		if (!foundDraft) {
			foundDraft = {
				draftGUID: draftGUID,
				paraFixData: []
			};
			draftFixData.push(foundDraft);
		}
		const paraFixData = foundDraft.paraFixData;
		var fixtypereqlist=[]

		dm.enumPara(function(pa, txt) {
			theLogger.log(pa.getAttribute("guid"), pa.getAttribute("hash"), txt);
			var contentHash = CryptoJS.SHA256(txt).toString();
			if(!pa.getAttribute("hash") ||					// 未記錄hash屬性表示稿件是新增的, 或是錯別字校正功能上線前已存在的公文
			pa.getAttribute("hash") != contentHash) {	// 記錄的hash屬性與計算純文字後的HASH值不同時, 表示段落文字內容有異動
				theLogger.log("設定hash屬性: " + pa.getAttribute("hash") + " > " + contentHash);
				pa.setAttribute("hash", contentHash);
			}
			
			// TODO: 搜尋或建立pa.getAttribute("guid")的FixPara物件
			let foundpara = paraFixData.find(para => para.paraGUID === pa.getAttribute("guid"));
			if (!foundpara) {
				foundpara={
					paraGUID: pa.getAttribute("guid"),
					contentHash: pa.getAttribute("hash"),
					
				};
				if (isOwnDraft){

					let request = theWebServices.Fixtypos(txt).done(function(resp) {
						foundpara.fixWordList = resp.fixWordList || [];
						theLogger.log(`✅ fixWordList updated for para ${foundpara.paraGUID}:`, foundpara.fixWordList);
					});
					fixtypereqlist.push(request);
				}
				
				paraFixData.push(foundpara);
					
				
			}else{
					if (pa.getAttribute("hash")!=foundpara.contentHash){
						foundpara ={
							paraGUID: pa.getAttribute("guid"),
							contentHash: pa.getAttribute("hash")
						};
						if (isOwnDraft){
							let request = theWebServices.Fixtypos(txt).done(function(resp) {
								foundpara.fixWordList = resp.fixWordList || [];
								theLogger.log(`✅ Updated fixWordList for existing para ${foundpara.paraGUID}:`, foundpara.fixWordList);
							});
							fixtypereqlist.push(request);
						}
					}



				};
					
		});
	
		if(fixtypereqlist.length) {
			// TODO: 若是本流程點新增的稿件則自動執行錯別字檢查功能, 檢查結果存入fixWordList, 最後再resolve所有FixPara物件
			$.when.apply(this,fixtypereqlist).done(function(){
				dfd.resolve(foundDraft.paraFixData);
			});
		}
		else
			dfd.resolve([]);
		return dfd.promise();
	}
	// 對應簽辦意見/文字意見, 開啟公文/新增文字意見時映對簽辦意見及文字意見的TEXTAREA內容
	this.initTA = function(draftGUID, paraGUID, paraHash, txt) {
		var dfd = $.Deferred();

		const draftFixData = _dataObj.draftFixData;

		let foundDraft = draftFixData.find(draft => draft.draftGUID === draftGUID);

		if (!foundDraft) {
			foundDraft = {
				draftGUID: draftGUID,
				paraFixData: []
			};
			draftFixData.push(foundDraft);
		}

		const paraFixData = foundDraft.paraFixData;

		let foundpara = paraFixData.find(para => para.paraGUID === paraGUID);
		if (!foundpara) {
			foundpara={
				paraGUID: paraGUID,
				contentHash: paraHash,
				fixWordList: []
			};

			let request = theWebServices.Fixtypos(txt).done(resp => {
				foundpara.fixWordList = resp.fixWordList || [];
				theLogger.log(`✅ fixWordList updated for para ${foundpara.paraGUID}:`, foundpara.fixWordList);
			})
			.always(() => {
				dfd.resolve(foundpara.fixWordList);
			});
			paraFixData.push(foundpara);
		}
		else if (paraHash!=foundpara.contentHash) {
			foundpara.contentHash = paraHash;

			let request = theWebServices.Fixtypos(txt).done(resp => {
				foundpara.fixWordList = resp.fixWordList || [];
				theLogger.log(`✅ Updated fixWordList for existing para ${foundpara.paraGUID}:`, foundpara.fixWordList);
			})
			.always(() => {
				dfd.resolve(foundpara.fixWordList);
			});
		}
		else
			dfd.resolve(foundpara.fixWordList);

		return dfd.promise();
	}
	// 刪除文稿時同步刪除資料物件中同draftGUID的FixDraft資料
	this.delDraft = function(draftGUID) {
		//ray0218
		const index = _dataObj.draftFixData.findIndex(draft => draft.draftGUID === draftGUID);
		if (index !== -1) {
			_dataObj.draftFixData.splice(index, 1);  // Remove the matching draft
			theLogger.log(`Draft with GUID ${draftGUID} deleted.`);
			return [true,''];

		}else{
			return [false,`draftDUID: ${draftGUID} 不存在 FixWordData`];

		}

	}
	// 檢查單一段落內容是否有錯別字
	this.checkPara = function(paraText, draftGUID, paraGUID, paraHash, paraLen, secParaGUID, secParaHash, mergedParaHash) {
		var dfd = $.Deferred();
		try{
			const draftFixData = _dataObj.draftFixData;
			let foundDraft = draftFixData.find(draft => draft.draftGUID === draftGUID);
			let firstPara = foundDraft.paraFixData.find(para =>para.paraGUID ===paraGUID)
			if (secParaGUID){
				//傳入 secPara
				let secPara = foundDraft.paraFixData.find(para =>para.paraGUID ===paraGUID)
				if (firstPara.contentHash===paraHash && secPara.contentHash === secParaHash){
					//合併且不須重新校正
					//將 secPara fixcWordlist extend 至 firstPara.fixWordList, fixWord刪除merged前的sec資料
					secPara.fixWordList.forEach(fixWord => {
						fixWord.charIdx+=paraLen;
						firstPara.fixWordList ??= [];
						firstPara.fixWordList.push(fixWord);

					});
					removePara(foundDraft,secParaGUID);
					firstPara.contentHash=mergedParaHash;
				}else{
					//合併但須重新校正
					removePara(foundDraft,secParaGUID);
					firstPara.contentHash=mergedParaHash;
					theWebServices.Fixtypos(paraText).done(function(resp) {
						if (resp && resp.fixWordList) {
							firstPara.fixWordList = resp.fixWordList; 
							dfd.resolve(resp.fixWordList);  
						} else {
							theLogger.error("Error: fixWordList not found in response.");
							dfd.reject("fixWordList missing");
						}
					});
				}

			}else{
				//未傳入 secpara
				if (firstPara.contentHash===paraHash){
					dfd.resolve(firstPara.fixWordList)
					//hash相同，不須重新校正
				}else{
					firstPara.contentHash=paraHash;
					theWebServices.Fixtypos(paraText).done(function(resp) {
						if (resp && resp.fixWordList) {
							firstPara.fixWordList = resp.fixWordList;  
							dfd.resolve(resp.fixWordList);  
						} else {
							theLogger.error("Error: fixWordList not found in response.");
							dfd.reject("fixWordList missing");
						}
					});
				}
			}
			
			

		}	catch (err){

			dfd.reject(err.message)
		}


		
		return dfd.promise();
	}
	// 刪除段落時同步刪資料物件中同paraGUID的FixPara資料
	this.delPara = function(draftGUID, paraGUID) {

		const drafttodelpara = _dataObj.draftFixData.find(draft => draft.draftGUID === draftGUID);
		if (!drafttodelpara){
			theLogger.log(`Draft GUID: ${draftGUID} not found.`);
			return [false, `Draft GUID: ${draftGUID} not found.`]
		}
		const index = drafttodelpara.paraFixData.findIndex(para => para.paraGUID === paraGUID);

		if (index !== -1){
			drafttodelpara.paraFixData.splice(index,1);
			theLogger.log(`paraGUID ${paraGUID} deleted, draftGUID: ${draftGUID}.`);
		}else{
			theLogger.log(`paraGUID: ${paraGUID} not found in draftGUID: ${draftGUID}.`);
			return [false, `paraGUID: ${paraGUID} not found in draftGUID: ${draftGUID}.`]

		}

		return [true];
	}
	// 分割段落
	this.splitPara = function(draftGUID, paraGUID, paraHash, breakIndex, secParaGUID, secParaHash) {
		let drafttosplit = _dataObj.draftFixData.find(draft => draft.draftGUID === draftGUID);

		if (!drafttosplit){
			theLogger.log(`Draft GUID: ${draftGUID} not found.`);
			return [false, `Draft GUID: ${draftGUID} not found.`]
		}

		let paratosplit = drafttosplit.paraFixData.find(para  => para.paraGUID === paraGUID);
		if (!paratosplit){
			theLogger.log(`paraGUID: ${paraGUID} not found in draftGUID: ${draftGUID}.`);
			return [false, `paraGUID: ${paraGUID} not found in draftGUID: ${draftGUID}.`]
		}

		let first_fixwordlist=[]
		let sec_fixwordlist=[]
		paratosplit.fixWordList.forEach(fixword => {
			if (fixword.charIdx>breakIndex){
				fixword.charIdx-=breakIndex;
				sec_fixwordlist.push(fixword)
			}else{
				first_fixwordlist.push(fixword)
			}
		});
		paratosplit.contentHash=paraHash;
		paratosplit.fixWordList=first_fixwordlist;
		drafttosplit.paraFixData.push(
			{
				paraGUID:secParaGUID,
				contentHash:secParaHash,
				fixWordList:sec_fixwordlist,
			}
		);
	

		return [true];
	}
	function isChineseChar(char) {
		return char >= '\u4e00' && char <= '\u9fff';
	  }
	  
	function splitTextWithIndex(text, maxLength = 62) {
		const toSplit = '。！？，';
		const parts = [];
		let currentPart = '';
		let startIdx = 0;
	  
		for (let i = 0; i < text.length; i++) {
		  const t = text[i];
		  currentPart += t;
	  
		  if ((currentPart.length > 20 && toSplit.includes(t)) ||
			  (currentPart.length > 40 && !isChineseChar(t)) ||
			  (currentPart.length > 60)) {
			parts.push({ text: currentPart, start: startIdx });
			startIdx = i + 1;
			currentPart = '';
		  }
		}
	  
		if (currentPart) {
		  parts.push({ text: currentPart, start: startIdx });
		}
	  
		return parts;
	  }
	  
	function get_recordtype(fixWord,paraText){
		const paraText_split = splitTextWithIndex(paraText)
		for (const part of paraText_split) {
			if (fixWord.charIdx >= part.start) {
			  return part;
			}
		  }
		
		  return null; 
		  
	}
	// 接受校正建議字
	// 修改fixworddata paraHash
	// 1140428 新增paraText原始段落文字參數
	this.acceptFix = function(draftGUID, paraGUID, paraHash, startIdx, endIdx, fixChar, currCndtIdx, paraText) {
		const drafttoacceptFix = _dataObj.draftFixData.find(draft => draft.draftGUID === draftGUID);
		const paratoreject = drafttoacceptFix.paraFixData.find(para => para.paraGUID === paraGUID);
		paratoreject.contentHash = paraHash;
		const fixWord = paratoreject.fixWordList.find(word => word.charIdx === startIdx);
		if (fixWord) {
			fixWord.status = "commit";
			theLogger.log("Fix word acceptted at startIdx:", startIdx, paraText);
			//DB紀錄錯別字校正相關資訊
			var part = get_recordtype(fixWord,paraText)
			var recordType =[ {	doc_no:_dataObj.docNo,
								status:"accept",
								confidence:fixWord.confidence,
								orig_char:fixWord.origChar,
								fix_char:fixWord.fixChar,
								org_no : theUserInfo.OrgID,
								orig_sent : part.text,
								idx_char : startIdx-part.start

							}		]

			let request = theWebServices.recordTypoFix(JSON.stringify(recordType)).done(function(resp) {
				theLogger.log(`✅ recordTypoFix ${resp}`);
			});
		} else {
			theLogger.error("No fix word found with startIdx:", startIdx, paraText);
		}
	}
	// 拒絕校正建議字
	// 修改fixworddata paraHash
	// 1140428 新增paraText原始段落文字參數
	this.rejectFix = function(draftGUID, paraGUID, paraHash, startIdx, endIdx, paraText) {
		const drafttorejectFix = _dataObj.draftFixData.find(draft => draft.draftGUID === draftGUID);
		const paratoreject = drafttorejectFix.paraFixData.find(para => para.paraGUID === paraGUID);
		paratoreject.contentHash = paraHash;
		const fixWord = paratoreject.fixWordList.find(word => word.charIdx === startIdx);
		if (fixWord) {
			fixWord.status = "reject";
			theLogger.log("Fix word rejected at startIdx:", startIdx, paraText);
			//DB紀錄錯別字校正相關資訊
			var part = get_recordtype(fixWord,paraText)
			var recordType =[ {	doc_no:_dataObj.docNo,
								status:"reject",
								confidence:fixWord.confidence,
								orig_char:fixWord.origChar,
								fix_char:fixWord.fixChar,
								org_no : theUserInfo.OrgID,
								orig_sent : part.text,
								idx_char : startIdx-part.start

							}		]

			let request = theWebServices.recordTypoFix(JSON.stringify(recordType)).done(function(resp) {
				theLogger.log(`✅ recordTypoFix ${resp}`);
			});
		} else {
			theLogger.error("No fix word found with startIdx:", startIdx, paraText);
		}
		
	}
};

if (!!theWebServices) {
	// 實作 Fixtypos WebService 叫用物件
	theWebServices.Fixtypos = 
	
		
	function(paraTextData,draftGUID,mergedParaGUID,mergedParaHash) {
        // 2025.5 - Eric Peng, 新增註解並修改服務IP
        // Ray PC: 'https://192.168.2.106:8080'
        // Eric PC: 'https://192.168.2.107:8080'
        // \\docap02\Project\MS-dev\SRC\web.config <Content-Security-Policy> "connect-src 'self' blob:"block 須設定可以接受的IP
		// 
		//var wsUrl = 'https://192.168.2.107:8080';
		// IIS Route
		//var wsUrl = 'https://192.168.2.106';
		if(!!theSSO?.User?.SystemSets?.get("AOL_FIX_WORD_SERVICE"))
		{wsUrl = theSSO.User.SystemSets.get("AOL_FIX_WORD_SERVICE"); //使用系統參數儲存URL
		var wsFuncName = 'fixTypos';
		var async = true;
		var params = new SOAPClientParameters();
		var _dfd = $.Deferred();
		params.add('paraTextData', paraTextData)
		SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
			function (rslt) {
				if (typeof rslt === 'object' && typeof rslt.value=='object') {
					if (rslt.value.fixWordList && typeof rslt.value.errmsg=='string') {
						_dfd.resolve({success:true, fixWordList: rslt.value.fixWordList});
					}
					else {
						if (typeof rslt.value.errmsg=='string' &&  rslt.value.errmsg.length) {
							_dfd.reject(new Error('叫用' + wsFuncName + '時發生錯誤! ErrMsg=' + rslt.value.errmsg));
						}
						else {
							_dfd.reject(new Error('叫用' + wsFuncName + ' 時發生錯誤!'));
						}
					}                                          
				}
				else {
					if (rslt.error && typeof rslt.responseText=='string' && rslt.responseText.length) {
						_dfd.reject(new Error('叫用' + wsFuncName + ' 時發生錯誤! ErrMsg=' + rslt.responseText));
					}
					else {
						_dfd.reject(new Error('叫用' + wsFuncName + ' 時發生錯誤!'));
					}
				}
			});
		return _dfd.promise();
		}
		else
		{
			theLogger.log(`未設定系統參數:AOL_FIX_WORD_SERVICE`);
		}


	};
	theWebServices.recordTypoFix = 

	function (TypoFixRecord)
	{
		var async = true;
		var params = new SOAPClientParameters();
		var _dfd = $.Deferred();
		var wsFuncName = 'recordTypoFix';
		var	SAMLart = localStorage.Artifact;

		params.add('SAMLart', SAMLart);
		params.add('TypoFixRecord', TypoFixRecord);
		var wsUrl =  theWebServices.url('webeditws');
		SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
			function (rslt) {
				if (typeof rslt === 'object' && typeof rslt.value=='object') {
					if (rslt.value.isSuccess && typeof rslt.value.errmsg=='string') {
						_dfd.resolve({success:true});
					}
					else {
						if (typeof rslt.value.ErrMsg=='string' &&  rslt.value.ErrMsg.length) {
							_dfd.reject(new Error('叫用' + wsFuncName + '時發生錯誤! ErrMsg=' + rslt.value.ErrMsg));
						}
						else {
							_dfd.reject(new Error('叫用' + wsFuncName + ' 時發生錯誤!'));
						}
					}                                          
				}
				else {
					if (rslt.error && typeof rslt.responseText=='string' && rslt.responseText.length) {
						_dfd.reject(new Error('叫用' + wsFuncName + ' 時發生錯誤! ErrMsg=' + rslt.responseText));
					}
					else {
						_dfd.reject(new Error('叫用' + wsFuncName + ' 時發生錯誤!'));
					}
				}
			});
		return _dfd.promise();

	}
	
};


(function() {

    // 將FixWordData加入MS_SSO全域物件
    // 後續可用_mgmt.getFixWordData()函式取得FixWordData物件
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-FixWordData.js").finish();

})();

function removePara(foundDraft, paraGUID) {
    let index = foundDraft.paraFixData.findIndex(para => para.paraGUID === paraGUID);

    if (index !== -1) {
        foundDraft.paraFixData.splice(index, 1);  // Remove the found element
        theLogger.log(`Deleted para with paraGUID: ${paraGUID}`);
    } else {
        theLogger.log(`paraGUID: ${paraGUID} not found, nothing deleted.`);
    }
}
