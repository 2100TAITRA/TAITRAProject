/* jshint -W100 */

/*
DATE	MGRNO		SA		PG		Desc
1060421 1060217		Eric 	Eric	UniView顯示橫式頁面影像不正確問題修正.
1060421 1060228     Eric 	Eric    UniView開啟第2份以後公文, 縮放功能失效問題修正.
1050819	   		    Eric	Eric	修改叫用ODTOOLS/IMGTRANS網址參數, 改給wsdl及電子檔路徑
                                    實作頁面縮放檢視功能
                                    支援獨立分頁開啟整合模式(內嵌於RD-ViewDoc.html)
1061102	1061078		Raymond	Raymond	修正"己"無次頁為"已"
1061120	1060958		Leslie	Leslie	修正於紙本瀏覽切換至其他模式時，應先檢核側屜是否已開啟，以避免切換錯誤
1080117	1071239		Leslie	Leslie	配合非2100舊系統線簽公文調閱，Merge相關功能
1080117	1080049		Kevin	Joe		弱掃修正Hardcoded Absolute Path、Client DOM Stored XSS
1080214	1080179		Kevin	Kevin	弱掃修正Client DOM Stored XSS
1080924 1080339     Kevin   Eric    jQuery 3.0 upgrade
1090227	1080751		Raymond	Raymond	合併內政部1070381調閱公文新增unv_obj參數及列印時回報列印記錄
1100325	1090869		Leslie	Leslie	新增另存PDF功能鍵
1100519 1100093     Eric    Eric    merge: 2020.12.30 - 1090821, 支援外機關陳核會稿公文
1100630 1100780		Raymond	Raymond	一般機關的文字浮水印新增UserId、UserTitle、ClientIP欄位
1110328 1100287		Leslie	Leslie	Merge[1070359]歷史公文(DI)檢視相關
1121121	1120941		David	David	getDocumentInfo()新增紀錄公文裁撤機關代碼資訊，供調閱及AKI802文稿編輯可套用裁撤機關樣板顯示稿面
1130304	1120393		Leslie	Leslie	修改調閱後叫用另存PDF的邏輯，改為傳送已通過驗證的UNV內容，以避免調案申請的瀏覽無法通過一般的權限檢核
1130920	1120688		Leslie	Cloud	補強歷史公文，檔案可能遺失，增加處理檔案遺失相關節點處理
1131104	序322		Leslie	Leslie	修正彙併辦公文於調閱模式，出現重覆母文的問題
1131206	1130847		David	Leslie	增修調閱要用到的COM_NO、REF_DOC
1140318	1140209		Leslie	Leslie	[標檢局]歷史公文轉入調閱邏輯調整
1140415	1111454		Leslie	Leslie	[客委會] 修正瀏覽時，msgId未設定所產生的異常訊息問題
1140707	1140242		Cloud	Cloud	叫用AKI500時補上傳入機關代碼
1140723	1141011		Kevin	Leslie	弱掃修正[Client DOM Stored XSS](MS-ODC010.html，經查均未使用內置或外部javascript
1140801	1141011		Kevine	Leslie	弱掃修正[Client DOM Stored XSS]，試用套件消毒
1140930	中榮序258	Raymond	Raymond	新增調閱要用到的ODWMSG.SYSID欄位
*/


function UNVObj(rawUNVObj) {
    var _arrDoc = null;
    
    if (typeof rawUNVObj == 'undefined') {
        return null;
    }
    
    var _rawUNV = null;
    if (typeof rawUNVObj == 'string') {
        _rawUNV = JSON.parse(rawUNVObj);
    }
    else {
        _rawUNV = rawUNVObj;
    }
    
    if (typeof _rawUNV !=='undefined' && _rawUNV!==null) {
        // 目前只支援一份公文調閱
        var docType = SSOUtil.typeOf(_rawUNV.UnvRoot.Doc);
        if (docType=='array') {
            _arrDoc = _rawUNV.UnvRoot.Doc;
        }
        else if (docType=='object') {
            _arrDoc = [_rawUNV.UnvRoot.Doc];
        }
    }
    
    /*function _getPageFileInfo(docIdx, attIdx, groupIdx, pageIdx) { 
    }*/
    
    function PageGroup() {
        var _group = {
            title: '',
            arrPage: [],
            wsdl: '',
            filePath: '',
            srcFilename: '', /* 非影像檔類group, 記錄原始檔 */
            openWithAOL: false, // 1110328 Leslie[1100287]	Merge[1070359]	歷史公文(DI)檢視相關
			isURLLink: false, // 2018.6.14 - 1070359	//1080117	Leslie[1071239]	Merge歷史公文之流程檢視
			//1131025	Cloud	1120688 紀錄檔案是否遺失
			isFileLost: false, 
        };
        
        this.getTitle = function() {
            return _group.title;  
        };
        
        this.getPageCount = function() {
            return _group.arrPage.length;
        };
		
        // 1110328 Leslie[1100287]	Merge[1070359]	歷史公文(DI)檢視相關
        this.shouldOpenWithAOL = function() {
            return _group.openWithAOL;
        };
		
		//1080117	Leslie[1071239]	Merge歷史公文之流程檢視
		// 2018.6.14 - 1070359
        this.isURLLink = function() {
            return _group.isURLLink;
        };
		//1131025	Cloud 1120688 紀錄是否遺失檔案
		this.getisFileLost = function() {
            return _group.isFileLost;
        };
		this.setisFileLost = function() {
            _group.isFileLost = true;
        };
		
        
        this.init = function(title, wsdl, filePath) {
            _group.title = title;
            _group.wsdl = wsdl;
            _group.filePath = filePath;
            if (_group.wsdl==='' || _group.filePath==='') {
                return false;
            }
            return true;
        };
		
		//1080117	Leslie[1071239]	Merge歷史公文之流程檢視
		 // 2018.6.14 - 1070359
        this.init_url = function(title, wsdl) {
            _group.title = title;
            _group.wsdl = wsdl;
            if (_group.wsdl==='') {
                return false;
            }
            return true;
        };
		
		// 2018.6.11 - 1070359
        this.setSpecialFlag = function(flag) {
            if (flag==1) {
                _group.openWithAOL = true;
            }
            else if (flag==2) {
                _group.isURLLink = true;
            }
        };
        
        this.addPage = function (pageFilename, fileType) {
            if (!!pageFilename && pageFilename.length) {
                var doConvert = true;
                if (typeof fileType!=='undefined' && fileType.length) {
                    fileType = fileType.toLowerCase();
                    // 2022.1.11 - N/A Eric, bug-fix typo
                    //if (fileType=='png' || fileType!=='jpg' || fileType!=='jpeg') {
                    if (fileType=='png' || fileType=='jpg' || fileType=='jpeg') {
                        // 2022.1.11 - N/A Eric, bug-fix typo
                        //docConvert = false;
                        doConvert = false;
                    }
                }
                _group.arrPage.push({convert:doConvert, filename:pageFilename});
            }
        };
        
        this.setSrcFile = function (srcFilename) {
            if (!!srcFilename && srcFilename.length) {
                _group.srcFilename = srcFilename;
            }
        };
        
        this.getSrcFile = function() {
            return _group.srcFilename;
        };
        
        this.getSrcWSDLUrl = function() {
            return _group.wsdl;
        };
        
        this.getSrcFilePath = function() {
            return _group.filePath;
        };
        
        this.getPage = function(index) {
            if (index>=0 && index<_group.arrPage.length) {
                var _page = {
                    index: index,
                    wsdl: _group.wsdl,
                    filePath: _group.filePath,
                    filename: _group.arrPage[index].filename,
                    convert: _group.arrPage[index].convert
                };
                
                return _page;
            }
            return null;
        };
        
        if ((typeof _debug=='boolean' && _debug===true) || (typeof _standalone==='boolean' && _standalone===true)) {
            this._group = _group;    
        }
        return this;
    }
    
    function _normalizeRawGroup(_arrRawGroup) {
        var arrGroup = [];
        var i=0, j=0, duplicateItem=false, group=null, tgroup=null;
        for(i=0; i<_arrRawGroup.length; i++) {
            group = _arrRawGroup[i];
            if (!!group) {
                duplicateItem = false;
                for(j=0; j<arrGroup.length; j++) {
                    tgroup = arrGroup[j];
                    if (!!tgroup) {
                        if (tgroup.GrpName==group.GrpName && tgroup.StartPO==group.StartPO) {
                            duplicateItem = true;
                            break;
                        }
                    }
                }
                
                if (!duplicateItem) {
                    arrGroup.push(group);
                }
            }
        }
        return arrGroup;
    }
    
    /* 下載封裝檔 */
    function _dowloadEnveFile(artifact, wsdl, filePath, filename) {
        var result = null;
        
        /*sFile1010500072OXML = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE 電子封裝檔 SYSTEM "99_erencaps_utf8.dtd" [' +
        //                      '<!ENTITY % 基本標籤 SYSTEM "99_basic_a_utf8.ent">	<!ENTITY % 線上簽核標籤 SYSTEM "99_sign_utf8.ent">	<!ENTITY % 檔管標籤 SYSTEM "99_records_utf8.ent">]><電子封裝檔><封裝檔電子簽章><Signature Id="EnveSign"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"></CanonicalizationMethod><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"></SignatureMethod><Reference URI="10105000720001.tif"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>9HERCQLlkWG0Mu9Le2jnmem/hms=</DigestValue></Reference><Reference URI="10105000720002.tif"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>wBx8WfnZzsGCVim2/ae++MvGWgI=</DigestValue></Reference><Reference URI="10105000720003.tif"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>9HERCQLlkWG0Mu9Le2jnmem/hms=</DigestValue></Reference><Reference URI="10105000720004.tif"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>REPT0XQQomydWad8PKtb7DGB4Zs=</DigestValue></Reference><Reference URI="10105000720005.tif"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>qUSbOtz9Q/+PupHxWDwoodLMH2k=</DigestValue></Reference><Reference URI="#Wrap"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>ureZ8eMKAf47crawY5Lkbigolh8=</DigestValue></Reference></SignedInfo></Signature></封裝檔電子簽章><封裝檔內容 Id="Wrap"><封裝檔資訊>電子影音檔案</封裝檔資訊><電子影音檔案 文號="1010500072"><歸檔掃描影像 群組數="2" 總頁數="5"><頁面群組 頁數="1" 檔案數="1" 群組名稱="本文" 群組型別="本文"><電子影音檔案資訊><檔案名稱>10105000720001.tif</檔案名稱><檔案大小>26425</檔案大小><檔案格式>TIF</檔案格式></電子影音檔案資訊></頁面群組><頁面群組 頁數="4" 檔案數="4" 群組名稱="未命名的附件" 群組型別="附件"><電子影音檔案資訊><檔案名稱>10105000720002.tif</檔案名稱><檔案大小>41817</檔案大小><檔案格式>TIF</檔案格式></電子影音檔案資訊><電子影音檔案資訊><檔案名稱>10105000720003.tif</檔案名稱><檔案大小>26425</檔案大小><檔案格式>TIF</檔案格式></電子影音檔案資訊><電子影音檔案資訊><檔案名稱>10105000720004.tif</檔案名稱><檔案大小>93362</檔案大小><檔案格式>TIF</檔案格式></電子影音檔案資訊><電子影音檔案資訊><檔案名稱>10105000720005.tif</檔案名稱><檔案大小>92560</檔案大小><檔案格式>TIF</檔案格式></電子影音檔案資訊></頁面群組></歸檔掃描影像></電子影音檔案></封裝檔內容></電子封裝檔>';
        
        //sFile1010500072OXML = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE 電子封裝檔 SYSTEM "99_erencaps_utf8.dtd" [' +
        //                      '<!ENTITY % 基本標籤 SYSTEM "99_basic_a_utf8.ent">	<!ENTITY % 線上簽核標籤 SYSTEM "99_sign_utf8.ent">	<!ENTITY % 檔管標籤 SYSTEM "99_records_utf8.ent">]><電子封裝檔><封裝檔電子簽章><Signature Id="EnveSign"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"></CanonicalizationMethod><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"></SignatureMethod><Reference URI="10105000720001.tif"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>9HERCQLlkWG0Mu9Le2jnmem/hms=</DigestValue></Reference><Reference URI="10105000720002.tif"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>wBx8WfnZzsGCVim2/ae++MvGWgI=</DigestValue></Reference><Reference URI="10105000720003.tif"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>9HERCQLlkWG0Mu9Le2jnmem/hms=</DigestValue></Reference><Reference URI="10105000720004.tif"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>REPT0XQQomydWad8PKtb7DGB4Zs=</DigestValue></Reference><Reference URI="10105000720005.tif"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>qUSbOtz9Q/+PupHxWDwoodLMH2k=</DigestValue></Reference><Reference URI="#Wrap"><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></DigestMethod><DigestValue>ureZ8eMKAf47crawY5Lkbigolh8=</DigestValue></Reference></SignedInfo></Signature></封裝檔電子簽章><封裝檔內容 Id="Wrap"><封裝檔資訊>電子影音檔案</封裝檔資訊><電子影音檔案 文號="1010500072"><歸檔掃描影像 群組數="2" 總頁數="5"><頁面群組 頁數="1" 檔案數="1" 群組名稱="本文" 群組型別="本文"><電子影音檔案資訊><檔案名稱>1052100259-P-0001.tif</檔案名稱><檔案大小>26425</檔案大小><檔案格式>TIF</檔案格式></電子影音檔案資訊></頁面群組><頁面群組 頁數="4" 檔案數="4" 群組名稱="未命名的附件" 群組型別="附件"><電子影音檔案資訊><檔案名稱>10105000720002.tif</檔案名稱><檔案大小>41817</檔案大小><檔案格式>TIF</檔案格式></電子影音檔案資訊><電子影音檔案資訊><檔案名稱>10105000720003.tif</檔案名稱><檔案大小>26425</檔案大小><檔案格式>TIF</檔案格式></電子影音檔案資訊><電子影音檔案資訊><檔案名稱>10105000720004.tif</檔案名稱><檔案大小>93362</檔案大小><檔案格式>TIF</檔案格式></電子影音檔案資訊><電子影音檔案資訊><檔案名稱>10105000720005.tif</檔案名稱><檔案大小>92560</檔案大小><檔案格式>TIF</檔案格式></電子影音檔案資訊></頁面群組></歸檔掃描影像></電子影音檔案></封裝檔內容></電子封裝檔>';
        
        var parser = new DOMParser();
        var enveDOM = parser.parseFromString(sFile1010500072OXML, 'text/xml');
        var enveDocElem = enveDOM.documentElement;
        return {success:true, enve_xn: enveDocElem};
        */
        
        // 用WebFileIO取得Server上的封裝檔...
        var wfio = new WebFileIO(wsdl, '', artifact);
        wfio.download(filePath, filename, {
            async : false,
            success: function(rslt) {
                if(rslt !== undefined) {
                    result = {success:true, enve_xn: rslt};
                }
                else {
                    theLogger.warn('-W- WebFileIO呼叫成功但夾檔資料未下載.');
                    result = {success:false, enve_xn: null, _errMsg: 'WebFileIO呼叫成功但夾檔資料未下載.'};
                }
            },
            error: function(errorText) {
                theLogger.error('-E- UniView._dowloadEnveFile() invoke wfio.download() failed, ErrMsg=' + errorText);
                result = {success:false, enve_xn:null, _errMsg:errorText};
            }
        });
        return result;
    }
    /* 取得封裝檔內頁面檔清單 */
    function _getPDocEnvePageFiles(artifact, wsdl, filePath, enveFilename, attAlias, arrRawGroup, _dfdPassThrough, att) {
        var _dfd = $.Deferred();
        var _dfdDL = $.Deferred();

        //var enve_xn = null;
        var rslt = _dowloadEnveFile(artifact, wsdl, filePath, enveFilename);
        if (rslt.success) {
            // 2017.6.7 - 1060443
            if (typeof rslt.enve_xn.big5XML=='boolean' && rslt.enve_xn.big5XML===true && 
                typeof rslt.enve_xn.file=='object' && rslt.enve_xn.file!==null) {
                _processBig5XMLEnve(rslt.enve_xn)
                .done(function(rslt){
                    if (typeof rslt=='object' && typeof rslt.dom=='object' && rslt.dom!==null) {
                        _dfdDL.resolve(rslt.dom);
                    }
                    else {
                        _dfdDL.reject({success:false, _errMsg:'尚未支援以MSXML DOM讀取XML檔內容作業!'});
                    }
                })
                .fail(function(errRslt){
                   _dfdDL.reject({success:false, _errMsg:errRslt._errMsg});
                });
            }
            else {
                _dfdDL.resolve(rslt.enve_xn);
            }
        }
		else { // 2018.11 - 1071045, UniView載入公文失敗後無法開啟其它公文問題
            _dfdDL.reject(rslt); 
        }
       
        _dfdDL.promise()
        .done(function(rslt_enve_xn) {
            var _arrGroup = [];
            
                var $groups = $(rslt_enve_xn).find('頁面群組');
            var iGrp=0, iFile=0, unNameGroupIndex=1;
            var $group_xn = null, $files=null, file_xn=null;
            var groupName='', groupTitle='', groupType='', filename='', fileType='';
            var group=null;
            var _arrRawPage = [];
            for(iGrp=0; iGrp<$groups.length; iGrp++) {
                $group_xn = $($groups[iGrp]);
                
                groupType = SSOUtil.xml_getAttrValue($group_xn, '群組型別');
                groupName = SSOUtil.xml_getAttrValue($group_xn, '群組名稱');
                
                groupTitle = attAlias;
                
                if ((groupType=='本文' || groupType=='1') && groupName.length) {
                    groupTitle += ('-' + groupName);
                }
                else if (groupType=='附件' && groupName.length) {
                    if (groupName=='未命名的附件') {
                        groupTitle = groupName + (unNameGroupIndex++);
                    }
                    else {
                        groupTitle = groupName;
                    }
                }
                
                $files = $group_xn.find('電子影音檔案資訊');
                if ($files.length<=0) {
                    $files = $group_xn.find('檔案資訊'); // 094xxx 歸檔掃描封裝檔!
                    if ($files.length<=0) {
                        continue;
                    }
                }
                
                //if (SSOUtil.typeOfof(arrRawGroup)!=='array' || arrRawGroup.length===0) {
                    group = new PageGroup();
                    group.init(groupTitle, wsdl, filePath);
                    for(iFile=0; iFile<$files.length; iFile++) {
                        file_xn = $files[iFile];
                        if (!!file_xn) {
                            filename = SSOUtil.xml_getChildNodeValue(file_xn, '檔案名稱');
                            fileType = SSOUtil.xml_getChildNodeValue(file_xn, '檔案格式');
                            group.addPage(filename, fileType);
                        }
                    }
                    group.mainDoc = true;
                    _arrGroup.push(group);
                /*}
                //else {
                //    _arrRawPage.push({'filename':filename, 'fileType':fileType});
                //}*/
            }
            
            if (SSOUtil.typeOf(arrRawGroup)=='array' && arrRawGroup.length && _arrRawPage.length) { 
            }
            
            if (_arrGroup.length) {
                    _dfd.resolve({success:true, dfdRef:_dfdPassThrough, 'att': att, pageGroups:_arrGroup, 'filename':enveFilename});
            }
            else {
                _dfd.reject({success:false, dfdRef:_dfdPassThrough, 'filename':enveFilename, _errMsg:'無法由公文封裝檔取得群組資訊! [_arrGroup.length=0]'})
            }
        })
        .fail(function(errRslt){
            _dfd.reject({success:false, dfdRef:_dfdPassThrough, 'filename':enveFilename, _errMsg:errRslt._errMsg});
        });
        return _dfd.promise();
    }
    
	// 分析線上/紙本簽核公文之副版封裝檔 => 公文影像實際內容為轉換為一個PDF檔
    function _getPDocCopyEnvePDFFile(artifact, wsdl, filePath, enveFilename, attAlias, arrRawGroup, _dfdPassThrough, att) {
        var _dfd = $.Deferred();
        var _dfdDL = $.Deferred();

        //var enve_xn = null;
        var rslt = _dowloadEnveFile(artifact, wsdl, filePath, enveFilename);
        if (rslt.success) {
            // 2017.6.7 - 1060443
            if (typeof rslt.enve_xn.big5XML=='boolean' && rslt.enve_xn.big5XML===true && 
                typeof rslt.enve_xn.file=='object' && rslt.enve_xn.file!==null) {
                _processBig5XMLEnve(rslt.enve_xn)
                .done(function(rslt){
                    if (typeof rslt=='object' && typeof rslt.dom=='object' && rslt.dom!==null) {
                        _dfdDL.resolve(rslt.dom);
                    }
                    else {
                        _dfdDL.reject({success:false, _errMsg:'尚未支援以MSXML DOM讀取XML檔內容作業!'});
                    }
                })
                .fail(function(errRslt){
                   _dfdDL.reject({success:false, _errMsg:errRslt._errMsg});
                });
            }
            else {
                _dfdDL.resolve(rslt.enve_xn);
            }
        }
        else {
            _dfdDL.reject(rslt);
        }
       
        _dfdDL.promise()
        .done(function(rslt_even_xn){
            var _arrGroup = [];
            
                var $fileInfo = $(rslt_even_xn).find('副版電子影音檔案');
                if ($fileInfo.length===0) {
                    $fileInfo = $(rslt_even_xn).find('副版影像');
                }
            var $files = $fileInfo.find('檔案資訊');
            var fileName = '';
            if ($files.length) {
                fileName = SSOUtil.xml_getChildNodeValue($files[0], '檔案名稱');
            }
            
            if (typeof fileName=='string' && fileName.length) {
                var groupTitle = attAlias;
            
                group = new PageGroup();
                group.init(groupTitle, wsdl, filePath);
                group.setSrcFile(fileName);
                _arrGroup.push(group);
            }
            
            if (_arrGroup.length) {
                    _dfd.resolve({success:true, dfdRef:_dfdPassThrough, 'att': att, pageGroup: _arrGroup, 'filename':enveFilename});
            }
            else {
                _dfd.reject({success:false, dfdRef:_dfdPassThrough, 'filename':enveFilename, _errMsg:'無法由公文副版封裝檔取得群組資訊! [_arrGroup.length=0]'})
            }
        })
        .fail(function(errRslt){
            _dfd.reject({success:false, dfdRef:_dfdPassThrough, 'filename':enveFilename, _errMsg:errRslt._errMsg});
        });
        return _dfd.promise();
    }
    
    /* 目的: 將指定公文內的影像分出群組  => 因本函式只支援sync作業, 故廢除, 改叫用_getDocPageGroups2 */
    /*function _getDocPageGroups(docIdx) {
        var _doc = _getDoc(docIdx);
        if (_doc) {
            var arrGroup = [];
            var _arrAtt=null;
            if (typeof _doc.Att.length == 'undefined') {
                _arrAtt = [_doc.Att];
            }
            else {
                _arrAtt = _doc.Att;
            }
            
            var i=0, j=0, k=0, att=null, file=null, rawGroups=null, rawGroup=null, nextGroup=null;
            var _arrFile=null;
            var group = null, title='';
            var pStart=-1, pEnd=-1; // 開始/最後頁
            var arrPageFile = null;
            var existMainDocPage = false;
            for(i=0; i<_arrAtt.length; i++) {
                att = _arrAtt[i];
                title = att.Alias;
                
                if (SSOUtil.typeOf(att.Group)=='array') {
                    rawGroups = att.Group;
                }
                else {
                    rawGroups = [att.Group];
                }
                
                if (SSOUtil.typeOf(att.File)=='array') {
                    _arrFile = att.File;
                }
                else {
                    _arrFile = [att.File];
                }
                
                arrPageFile = null;
                if (att.Type==='6') { // 紙本歸檔掃描封裝檔
                    // 紙本歸檔正版掃描影像
                    var scanPageGroups = _getPDocEnvePageFiles(_rawUNV.UnvRoot.Artifact, att.File.WSDL, att.File.FilePath, att.File.FileName, att.Alias, rawGroups);
                
                    if (!!scanPageGroups && scanPageGroups.length) {
                        arrGroup = arrGroup.concat(scanPageGroups);
                        existMainDocPage = true;
                        // return groups;
                    }
                    else {
                        //return null;
                    }
                }
                else if (att.Type=='1') { // 影像檔
                    var normalGroups = _normalizeRawGroup(rawGroups);
                    if (SSOUtil.typeOf(normalGroups)!=='array' || normalGroups.length===0) {
                        normalGroups.push({StartPO:'0', GrpName:title});
                    }
                    
                    
                    // 一般影像檔
                    for(j=0; j<normalGroups.length; j++) {
                        rawGroup = normalGroups[j];
                        nextGroup = null;
                        
                        pStart = parseInt(rawGroup.StartPO);
                        if (j<(normalGroups.length-1)) {
                            nextGroup = normalGroups[j+1];
                        }
                        
                        if (!!nextGroup) {
                            pEnd = parseInt(nextGroup.StartPO) - 1;
                            if (pEnd>=_arrFile.length) {
                                pEnd = _arrFile.length-1;
                            }
                        }
                        else {
                            pEnd = _arrFile.length - 1;
                        }
                        
                        // 異常啟始-結束頁index, 跳過
                        if (pStart<0 && pEnd>=_arrFile.length) {
                            theLogger.error('ERROR! Group:"' + rawGroup.GrpName + '", 異常的頁面索引值:' + rawGroup.StartPO);
                            continue;
                        }
                        
                        group = new PageGroup();
                        file = _arrFile[pStart];
                        if (rawGroup.GrpName) {
                            title += ('-' + rawGroup.GrpName);
                        }
                        group.init(title, file.WSDL, file.FilePath);
                        for(k=pStart; k<=pEnd; k++) {
                            file = _arrFile[k];
                            group.addPage(file.FileName);
                        }
                        if (!existMainDocPage) {
                            group.mainDoc = true;
                        }
                        arrGroup.push(group);
                    }
                    
                    if (!existMainDocPage) {
                        existMainDocPage = true;
                    }
                    //return arrGroup;
                }
                else if (att.Type=='0' || att.Type=='3' || att.Type=='2') { // 影音檔或其它附件原始檔, 2017.7.18 - 1060627, add att.Type=2
                    // 電子檔案以指定src url方式開啟
                    // http://server/ODTools/DOCATT.ashx
                    // 網址參數:
                    //   SAMLart
                    //   FileIOWS
                    //   FilePath (base64 encode)
                    //   FileName (base64 encode)
                    
                    // File = {FileName:'', FilePath:'', WSDL:''}
                    var filename='', specialTitle='';
                    var isDI=false, isSW=false, isRPDF=false;
                    for(j=0; j<_arrFile.length; j++) { // 2016.11.29 - bug-fix (i->j)
                        file = _arrFile[j];
                        filename = file.FileName.toLowerCase();
                        
                        specialTitle=''; isDI=false; isSW=false; isRPDF=false;
                        if (filename.indexOf('.di')!==-1) {
                            isDI = true;
                            specialTitle = '本文DI檔';
                        }
                        else if (filename.indexOf('.sw')!==-1) {
                            isSW = true;
                            specialTitle = 'SW檔';
                        }
                        else if (filename=='r.pdf') {
                            isRPDF = true;
                            specialTitle = '來文影像檔';
                        }
                        
                        group = new PageGroup();
                        group.init(title + (specialTitle.length?('-'+specialTitle):''), file.WSDL, file.FilePath);
                        group.setSrcFile(file.FileName);
                        arrGroup.push(group);
                    }
                }
                else if (att.Type=='5') { // 副版影像(封裝檔內記錄PDF檔)
                    // 紙本歸檔正版掃描影像
                    var copyPDFGroup = _getPDocCopyEnvePDFFile(_rawUNV.UnvRoot.Artifact, att.File.WSDL, att.File.FilePath, att.File.FileName, att.Alias, rawGroups);
                
                    if (!!copyPDFGroup && copyPDFGroup.length) {
                        arrGroup = arrGroup.concat(copyPDFGroup);
                    }
                }
                else if (att.Type=='2') { // PDF檔
                    continue;
                }
                else {
                    // 暫不支援此類檔案:
                    continue;
                }
            }
            
            if (arrGroup.length) {
                return arrGroup;
            }
        }
        return null;
    }*/
    
    /* 目的: 由指定公文Big5編碼封裝檔內容取得影像群組資訊 */
    function _processBig5XMLEnve(enveFileData) {
        var _dfd = $.Deferred();

        //2017.6.5 - Eric - 1060443, 可使用FileReader將big5編碼的XML轉為utf-8編碼字串, 再交給dom parse.
        var reader = new FileReader();
        reader.onload = function(event) {
            var dom = null;
            if (typeof DOMParser==='undefined') {
                dom = new ActiveXObject("MSXML2.DOMDocument");
                dom.resolveExternals = false;	// 2016.12.30 fix
                dom.validateOnParse = false;	// 2016.12.30 fix

                //1080117 Joe 1080049 弱掃修正Client DOM Stored XSS
                //b = dom.loadXML(event.target.result)
                //if (!b) {
				//1080214 Kevin 1080179 弱掃修正Client DOM Stored XSS
                //if (!dom.loadXML(event.target.result)) {
				if (!dom.loadXML(this.result)) {
                    throw new Error('Error message here...');
                }
                _dfd.resolve({success:true, 'dom':null, 'xmldom': dom});
            }
            else {
				//1080214 Kevin 1080179 弱掃修正Client DOM Stored XSS
                //dom = (new DOMParser()).parseFromString(event.target.result, 'text/xml');
				dom = (new DOMParser()).parseFromString(this.result, 'text/xml');
                _dfd.resolve({success:true, 'dom': dom, 'xmldom':null});
            }
        }
        reader.onerror = function(event) {
            _dfd.reject('讀取封裝檔內容時發生異常.[FileRead.onError]');
        }
        reader.readAsText(enveFileData.file, 'Big5');

        return _dfd.promise();
    }

    /* 目的: 以最終group取代作業中group項目 */
    function _replaceGroup(arrGroupWIP, _rawItem, rsltPageGroups) {
        if (typeof _rawGroup=='undifined' || _rawItem===null) {
            return false;
        }

        var i=0; _item=null, replaced=false;
        for(var i=0; i<arrGroupWIP.length; i++) {
            _item = arrGroupWIP[i];
            if (_item==_rawItem) {
                arrGroupWIP[i] = rsltPageGroups;
                replaced = true;
                break;
            }
        }
        return replaced;
    }

    /* 目的: 將指定公文內的影像分出群組 */
    function _getDocPageGroups2(docIdx) {
        var _doc = _getDoc(docIdx);
        var _dfdAll = $.Deferred(); // 2017.6.7

        if (_doc) {
            var arrGroup=[], arrGroupWIP=[];
            var _arrAtt=null;
            if (typeof _doc.Att.length == 'undefined') {
                _arrAtt = [_doc.Att];
            }
            else {
                _arrAtt = _doc.Att;
            }
            
            var i=0, j=0, k=0, att=null, file=null, rawGroups=null, rawGroup=null, nextGroup=null;
            var _arrFile=null;
            var group = null, title='';
            var pStart=-1, pEnd=-1; // 開始/最後頁
            var arrPageFile = null;
            var existMainDocPage = false;
            var dfds=[], dfd=null; // 2017.6.7 - 1060443
            for(i=0; i<_arrAtt.length; i++) {
                dfd = $.Deferred();

                att = _arrAtt[i];
				
                title = att.Alias;
				//1130920	1120688	Cloud	補強歷史公文，檔案可能遺失，增加處理檔案遺失相關節點處理
				if(typeof att.File == 'undefined')
				{
					group = new PageGroup();
					group.init(title, "", "");
					group.setSrcFile(title);
					group.setisFileLost();
					arrGroupWIP.push(group);
					continue;
				}
                
                if (SSOUtil.typeOf(att.Group)=='array') {
                    rawGroups = att.Group;
                }
                else {
                    rawGroups = [att.Group];
                }
                
                if (SSOUtil.typeOf(att.File)=='array') {
                    _arrFile = att.File;
                }
                else {
                    _arrFile = [att.File];
                }
                
                arrPageFile = null;
                if (att.Type==='6') { // 紙本歸檔掃描封裝檔
                    /* 紙本歸檔正版掃描影像 */
                    att.added = false;
					
					// 2018.11 - 1071045, 檢核檔案路徑或名稱是否異常!
                    let _filename = att.File.FileName;
                    let _filepath = att.File.FilePath;
                    if (typeof _filename!='string' || _filename.length==0 ||
                        typeof _filepath!='string' || _filepath.length==0) {
                        if (i==0) {
                            _dfdAll.reject({success:false, _errMsg: '紙本歸檔掃描封裝檔[正版], 檔案路徑或名稱無效!'});
                            return;
                        }
                    }
					
                    _getPDocEnvePageFiles(_rawUNV.UnvRoot.Artifact, att.File.WSDL, att.File.FilePath, att.File.FileName, att.Alias, rawGroups, dfd, att)
                    .done(function(rslt){
                        if (!!rslt.success && !!rslt.pageGroups && rslt.pageGroups.length) {
                            //arrGroup = arrGroup.concat(scanPageGroups);
                            //arrGroupWIP.push(rslt.pageGroups);
                            if (rslt.att.added) {
                                _replaceGroup(arrGroupWIP, rslt.att, rslt.pageGroups);
                            }
                            else {
                                arrGroupWIP.push(rslt.pageGroups);
                                rslt.att.added = true;
                            }

                            existMainDocPage = true;
                            if (typeof rslt.dfdRef!=='undefined' && rslt.dfdRef!==null) {
                                rslt.dfdRef.resolve({success:true});
                            }
                        }
                        else {
                            if (typeof rslt.dfdRef!=='undefined' && rslt.dfdRef!==null) {
                                rslt.dfdRef.reject({success:false, _errMsg: '叫用_getPDocEnvePageFiles()時發生錯誤, scanPageGroups內容異常!'});
                            }
                        }
                    })
                    .fail(function(errRslt){
                        if (typeof errRslt.dfdRef!=='undefined' && errRslt.dfdRef!==null) {
                            errRslt.dfdRef.reject(errRslt);
                        }
                    });

                    // 2019.12.9 - Eric, .done/.then callback 外程式, 測試ok!
                    if (!att.added) {
                        arrGroupWIP.push(att);
                        att.added = true;
                    }
                    dfds.push(dfd);
                }
                else if (att.Type=='1') { // 影像檔
                    var normalGroups = _normalizeRawGroup(rawGroups);
                    if (SSOUtil.typeOf(normalGroups)!=='array' || normalGroups.length===0) {
                        normalGroups.push({StartPO:'0', GrpName:title});
                    }
                    
                    /* 一般影像檔 */
                    for(j=0; j<normalGroups.length; j++) {
                        rawGroup = normalGroups[j];
                        nextGroup = null;
                        
                        pStart = parseInt(rawGroup.StartPO);
                        if (j<(normalGroups.length-1)) {
                            nextGroup = normalGroups[j+1];
                        }
                        
                        if (!!nextGroup) {
                            pEnd = parseInt(nextGroup.StartPO) - 1;
                            if (pEnd>=_arrFile.length) {
                                pEnd = _arrFile.length-1;
                            }
                        }
                        else {
                            pEnd = _arrFile.length - 1;
                        }
                        
                        /* 異常啟始-結束頁index, 跳過 */
                        if (pStart<0 && pEnd>=_arrFile.length) {
                            theLogger.error('ERROR! Group:"' + rawGroup.GrpName + '", 異常的頁面索引值:' + rawGroup.StartPO);
                            continue;
                        }
                        
                        group = new PageGroup();
                        file = _arrFile[pStart];
                        if (rawGroup.GrpName) {
                            title += ('-' + rawGroup.GrpName);
                        }
						
						// 2018.11 - 1071045
						if (typeof file.WSDL=='string' && file.WSDL.length &&
                            typeof file.FilePath=='string' && file.FilePath.length) {
							group.init(title, file.WSDL, file.FilePath);
							for(k=pStart; k<=pEnd; k++) {
								file = _arrFile[k];
								group.addPage(file.FileName);
							}
							if (!existMainDocPage) {
								group.mainDoc = true;
							}

							//arrGroup.push(group);
							arrGroupWIP.push(group);
							dfd.resolve({success:true});
							dfds.push(dfd);
						}
                    }
                    
                    if (!existMainDocPage) {
                        existMainDocPage = true;
                    }
                }
                else if (att.Type=='0' || att.Type=='3' || att.Type=='2') { // 影音檔或其它附件原始檔; 2017.7.18 - 1060627, include ATT.Type='2'
                    // 電子檔案以指定src url方式開啟
                    // http://server/ODTools/DOCATT.ashx
                    // 網址參數:
                    //   SAMLart
                    //   FileIOWS
                    //   FilePath (base64 encode)
                    //   FileName (base64 encode)
                    
                    // File = {FileName:'', FilePath:'', WSDL:''}
                    var filename='', specialTitle='';
                    var isDI=false, isSW=false, isRPDF=false;
                    for(j=0; j<_arrFile.length; j++) { // 2016.11.29 - bug-fix (i->j)
                        file = _arrFile[j];
                        filename = file.FileName.toLowerCase();
                        
                        specialTitle=''; isDI=false; isSW=false; isRPDF=false;
                        if (filename.indexOf('.di')!==-1) {
                            isDI = true;
                            specialTitle = '本文DI檔';
                        }
                        else if (filename.indexOf('.sw')!==-1) {
                            isSW = true;
                            specialTitle = 'SW檔';
                        }
                        else if (filename=='r.pdf') {
                            isRPDF = true;
                            specialTitle = '來文影像檔';
                        }
                        
                        group = new PageGroup();
                        group.init(title + (specialTitle.length?('-'+specialTitle):''), file.WSDL, file.FilePath);
                        group.setSrcFile(file.FileName);

                        //arrGroup.push(group);
                        arrGroupWIP.push(group);
                    }
                    dfd.resolve({success:true});
                    dfds.push(dfd);
                }
                else if (att.Type=='5') { // 副版影像(封裝檔內記錄PDF檔)
                    /* 紙本歸檔副版影像/線上簽核副版影像 - PDF檔  */
                    att.added = false;
                    _getPDocCopyEnvePDFFile(_rawUNV.UnvRoot.Artifact, att.File.WSDL, att.File.FilePath, att.File.FileName, att.Alias, rawGroups, dfd, att)
                    .done(function(rslt){
                        if (rslt.success && !!rslt.pageGroup && rslt.pageGroup.length) {
                            //arrGroup = arrGroup.concat(copyPDFGroup);
                            //arrGroupWIP.push(rslt.pageGroup);
                            if (rslt.att.added) {
                                _replaceGroup(arrGroupWIP, rslt.att, rslt.pageGroup);
                            }
                            else {
                                arrGroupWIP.push(rslt.pageGroup);
                                rslt.att.added = true;
                            }

                            if (typeof rslt.dfdRef!=='undefined' && rslt.dfdRef!==null) {
                                rslt.dfdRef.resolve({success:true});
                            }
                        }
                        else {
                            if (typeof rslt.dfdRef!=='undefined' && rslt.dfdRef!==null) {
                                rslt.dfdRef.reject({success:false, _errMsg: '叫用_getPDocCopyEnvePDFFile()時發生錯誤, copyPDFGroup內容異常!'});
                            }
                        }
                    })
                    .fail(function(errRslt){
                        if (typeof errRslt.dfdRef!=='undefined' && errRslt.dfdRef!==null) {
                            errRslt.dfdRef.reject(errRslt);
                        }
                    });

                    // 2019.12.9 - Eric, .done/.then callback 外程式, 測試ok!
                    if (!att.added) {
                        arrGroupWIP.push(att);
                        att.added = true;
                    }

                    dfds.push(dfd);
                }
                else if (att.Type=='2') { // PDF檔
                    continue;
                }
                else if (att.Type=='99') { // 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容
                    let group = new PageGroup();
					//1140318	Leslie[1140209]	[標檢局]歷史公文轉入調閱邏輯調整
					if (SSO_CONFIG.OrgNickName=='BSMI')
						group.init('來文', att.File.WSDL, att.File.FilePath);
					else
                    group.init('來文及簽辦文稿', att.File.WSDL, att.File.FilePath);
                    group.setSrcFile(att.File.FileName);
                    group.setSpecialFlag(1);
                    arrGroupWIP.push(group);
                    dfd.resolve({success:true});
                    dfds.push(dfd);
                }
				//1080117	Leslie[1071239]	Merge歷史公文之流程檢視
				else if (att.Type=='9') { // 2018.6.14 - 1070359, 歷史公文之流程檢視(URL for WebApp)
                    let group = new PageGroup();
                    group.init_url(title, att.File.WSDL);
                    group.setSpecialFlag(2);
                    arrGroupWIP.push(group);
                    dfd.resolve({success:true});
                    dfds.push(dfd);
                }
                else {
                    // 暫不支援此類檔案:
                    continue;
                }
            }
            
            //if (arrGroup.length) {
            //    return arrGroup;
            //}
            if (dfds.length > 0) {
                $.when.apply(this, dfds)
                .done(function(rslt) {
                    var len = arrGroupWIP.length;
                    var _groupItem = null;
                    for(var x=0; x<len; x++) {
                        _groupItem = arrGroupWIP[x];

                        if (_groupItem && _groupItem.length) { // _group內有多個group => concat
                            arrGroup = arrGroup.concat(_groupItem);
                        }
                        else { // _group內只有1個group => push
                            arrGroup.push(_groupItem);
                        }
                    }
                    _dfdAll.resolve({success:true, groups:arrGroup});
                })
                .fail(function(errRslt) {
                    _dfdAll.reject(errRslt);
                });
            }
            else {
                _dfdAll.reject({success:false, _errMsg:'沒有任何群組項目!'})
            }
        }
        return _dfdAll.promise();
    }
    
    function _getDoc(idx) {
        if (idx>=0 && idx<_arrDoc.length) {
            return _arrDoc[idx];
        }
        return null;
    }
    
    function _getDocCount() {
        if (_arrDoc!==null) {
            return _arrDoc.length;
        }
        return 0;
    }
    
    function _getArtifact() {
        if (_rawUNV!==null) {
            return _rawUNV.UnvRoot.Artifact;
        }
        return '';
    }
    
    function _getPageFile(docNo, group, pageIndex) {
        
        /* 使用WebFileIO直接下載影像檔內容 - for PNG only */
        function _getImageDataByWebFileIO(SAMLart, pageInfo) {
            var _dfd = $.Deferred();
            // 2014.9 - 改用WebFileIO取得Server上的設定檔...
            var wfio = new WebFileIO(pageInfo.wsdl, '', SAMLart);
            var serverPath = pageInfo.filePath;
            wfio.download(serverPath, pageInfo.filename, {
                async : false,
                success: function(rslt) {
                    if(rslt !== undefined && !!rslt) {
                        _dfd.resolve({success:true, imageData:rslt});
                    }
                    else {
                        theLogger.warn('-W- WebFileIO呼叫成功但夾檔資料未下載.');
                        _dfd.reject({success:false, _errMsg:' WebFileIO呼叫成功但夾檔資料未下載'});
                    }
                },
                error: function(errorText) {
                    var errMsg = '_getImageDataByWebFileIO() invoke wfio.download() failed, ErrMsg=' + errorText;
                    theLogger.error('-E- ' + errMsg);
                    _dfd.reject({success:false, _errMsg:errMsg});
                }
            });
            return _dfd.promise();
        }
        
        var _dfd = $.Deferred();
        var page = group.getPage(pageIndex);
        
        /*page = { index: index, wsdl: _group.wsdl, filePath: _group.filePath,
            filename: arrPage[index].filename, convert: arrPage[index].convert}
         */
        if (!!page) {
            var SAMLart = _rawUNV.UnvRoot.Artifact;
            if (page.convert) {
                // ODTool url format: 'http://docap01.fdat.com.tw/odtools/imgtran.ashx?DocNo=1052100256&FileName=MTA1MjEwMDI1Ni1QLTAwMDQuVElG&Pixel=200&Format=33&SAMLart=b768e906-52ac-461f-a735-9f590c4d6284'
                var ODToolUrl = '/odtools/imgtran.ashx';
                
                var b64Filename = Base64.encode(page.filename);
                var b64FilePath = Base64.encode(page.filePath);
                //var _url = ODToolUrl + '?DocNo=' + docNo + '&FileName=' + b64Filename + '&Pixel=200&Format=33&SAMLart=' + SAMLart;
                var _url = ODToolUrl + '?FileIOWS='+ page.wsdl + '&FilePath=' + b64FilePath + '&FileName=' + b64Filename + '&Pixel=' + theUniView.getDisplayDPI() + '&Format=33&SAMLart=' + SAMLart; // 2018.1.17 - merge NCKU bug-fix
                _dfd.resolve({success:true, pageInfo: {'index':page.index, 'group':  group, 'url': _url, 'imgData':''}});
            }
            else {
                // ToDo: 使用WebFileIO下載檔案[PNG影像檔]
                _getImageDataByWebFileIO(SAMLart, page) // 2022.1.11 - N/A Eric, bug-fix first parameter is SAMLart
                .done(function(rslt){
                    _dfd.resolve({success:true, pageInfo:{index:page.index, 'group': group,  url:'', imgData:rslt.imageData}});
                })
                .fail(function(failRslt) {
                    // 2018.1.18 - Eric, merge NCKU bug-fix
                    var _errMsg='';
                    if (typeof failRslt._errMsg=='string' && failRslt._errMsg.length) {
                        _errMsg = failRslt._errMsg;
                    }
                    if (typeof failRslt.errMsg=='string' && failRslt.errMsg.length) {
                        _errMsg = failRslt.errMsg;
                    }
                    if (_errMsg.length) {
                        theLogger.error('ERROR! _getImageDataByWebFileIO() failed, errMsg=' + _errMsg);
                    }
                    _dfd.reject({success:false, _errMsg:'取得影像資訊失敗! [_getImageDataByWebFileIO]'});
                });
            }
        }
        else {
            _dfd.reject({success:false, _errMsg:'invoek group.getPage(idx="' + pageIndex + '") failed'});
        }
        return _dfd.promise();
    }
    
    // export function/member(s)
	
	// obsolete
	//this.getPageFileInfo = _getPageFileInfo;
	//this.getDocPageGroups = _getDocPageGroups;
    
	this.getDocCount = _getDocCount;
    this.getDoc = _getDoc;
    this.getArtifact = _getArtifact;
    this.getDocPageGroups2 = _getDocPageGroups2;
    this.getPageFile = _getPageFile;
    if (typeof _standalone=='boolean' && _standalone===true) {
        this.rawUNV = _rawUNV;
        this.arrDoc = _arrDoc;
    }
    //1110422	Leslie[1110370]	整併歷史公文調閱邏輯
    else {
        this.UnvRoot = _rawUNV.UnvRoot;
    }
    
    /*
     * 2017.6.20 - get UNV file global properties
     */
    if (SSOUtil.isValueTrue(_rawUNV.UnvRoot.EnableEditFile)) {
        this.EnableEditFile = true;
    }
    if (SSOUtil.isValueTrue(_rawUNV.UnvRoot.EnablePrintFile)) {
        this.EnablePrintFile = true;
    }
    /*if (SSOUtil.isValueTrue(_rawUNV.EnablePrintScreen)) {
        this.EnablePrintScreen = true;
    }*/
    if (SSOUtil.isValueTrue(_rawUNV.UnvRoot.EnableSaveFile)) {
        this.EnableSaveFile = true;
    }
    this.EraseMode = _rawUNV.UnvRoot.EraseMode;
    if (SSOUtil.isValueTrue(_rawUNV.UnvRoot.ForceDisplayWaterMark)) {
        this.ForceDisplayWaterMark = true;
    }
    if (SSOUtil.isValueTrue(_rawUNV.UnvRoot.ForceWaterMark)) {
        this.ForceWaterMark = true;
    }

    this.OU_ID = _rawUNV.UnvRoot.OU_ID;
    this.OU_NAME = _rawUNV.UnvRoot.OU_NAME;
    this.USER_ID = _rawUNV.UnvRoot.USER_ID;
    this.USER_NAME = _rawUNV.UnvRoot.USER_NAME;
    this.USER_ORGNO = _rawUNV.UnvRoot.USER_ORGNO;   
    this.USER_TITLE = _rawUNV.UnvRoot.USER_TITLE; // 2020.9.17 - 1090529 Eric
    this.CLIENT_IP = _rawUNV.UnvRoot.CLIENT_IP; // 2020.9.17 - 1090529 Eric
    this.Version = _rawUNV.UnvRoot.Version;
        
    // 測試用
    this.dev_setArtiface = function(artifact) {
        if (!!_rawUNV) {
            _rawUNV.UnvRoot.Artifact = artifact;
        }
    };
  
    if (_rawUNV===null) {
        return null;
    }
    return this;
}

function UniView(SAMLart, docId, newPage, viewPortSelector) {
    var that = {
        docId : docId,
        newPage : newPage,
        selector : viewPortSelector,
        UNVObj : null,
        docInfoPage: '',
        docInfoPageInitFunc: null,
        
        SAMLart: SAMLart,
        
        pageOrgWidth: -1, // px
        pageOrgHeight: -1, // px
        
        minZoomRatio: 50,
        maxZoomRatio: 400,

        // 2018.1.18 - merge 1060406
        fwmSettings: null,
        fwmPath: '',
        displayDPI: '300',
    };
    
    var _currPo = {
        draftIdx: 0,	// 文稿序, 0-based, -1表示公文基資
        attIdx: -1,		// 附件序, 0-based, -1表示本文
        po: 0			// 第0頁
    };
    
    var _initDone = false; // 2018.1.18 - merge 1060406

	// 2017.4.21 - 1060217
    var _hasImgLoadEventHandler = false;
    var _imgLoadDfd;
    
    var _zoomRatio = 100;
    
    var _docPageGroups = [];
    var _viewPort = $(viewPortSelector);
    if (_viewPort.length===0) {
        theLogger.error('ERROR! cannot find viewPort, selector="' + viewPortSelector + '".');
        return null;
    }
    
    var _modal =  {
        getDraftCount : function() { return 1; }, // 現階段只支援1份公文
        accquireDraftModel : function() {
                var _dfd = $.Deferred();
                return _dfd.promise();
            },
        getDraftPageCounts: function(draftIndex) {
            
        },
        getDraftPage: function(draftIndex, po) {
            
        },
        getPageImage: function(pg) {
            var _dfd = $.Deferred();
            return _dfd.promise();
        }
    };
    var _memPPD = []; // item { ti: 對應的div.tags-item element, pages: array of group pages }
    
    // 2016.12.12 - 點擊文號出現的功能選單 (載入第一份檢閱公文時初始化)
    var uvCmd = {
        'onPrintDocVisible': function() { return true; },
        'onPrintDoc': function() {
            var artifact = that.SAMLart;
            _printDoc(artifact, theUniView);
        }
    };
    var $uvHome = $('#uniView');
    var $uvScreen = $uvHome.find('#menu-ui-shelter');
    var $uvListBoxCmd, $uvListCmd;
    if ($uvScreen.length===0) {
        $uvScreen = $('<div>', {'id': 'menu-ui-shelter', 'class': 'ui-popup-screen ui-screen-hidden'} ).appendTo( $uvHome );
        $uvListBoxCmd = $('<div class="ui-popup-container ui-selectmenu-hidden"><div class="ui-selectmenu ui-popup ui-overlay-shadow ui-corner-all ui-body-a"/></div>').insertAfter($uvScreen);
        $uvListCmd = $('<ul>', {
                        "class": "ui-selectmenu-list",
                        "id": "menuDoc",
                        "role": "listbox",
                        "aria-labelledby": "btnDoc",
                        "data-divider-theme": "e"
                       }).attr("data-theme", "c").appendTo( $uvListBoxCmd.children().eq(0) );
    }
    else {
        $uvListBoxCmd = $uvScreen.find('.ui-selectmenu-hidden');
        $uvListCmd = $uvListBoxCmd.find('u#ui-selectmenu-list');    
    }
	//var holding = false; // ??, AOL用途不明!?
		
    // 結flip外掛叫用的介面
    var _flipping = false;	// 2015.5.12 新增表示正在翻頁的旗標
    this.flipCtx = {
        flipping: function() {
            if(arguments.length)
                _flipping = arguments[0];
            else
                return _flipping;
        },
        hasPrevPage: function() {
            return (that._currPo.draftIdx >= 0);
        },
        reqPage: function($pg, fallback) {	// 2015.12.29 新增翻頁失敗的回呼函式參數
            // 翻頁時隱藏指令列
            var c = _viewPort.data("editCursor");
            if(c)
                c.cmdFloat.hide();
                
            var dfd = $.Deferred();
            if(_currPo.draftIdx == -1) {    // 公文基資
                SSOUtil.loading("show"); //showPageLoadingMsg();
                _viewPort.find(".tags .tags-group:first .tags-item").trigger("selected");
                
                // 2016.1.27 因附件頁面會調整pages大小及tags位置, 切回文稿頁面時要調回A4
                $pg.closest(".pages").css("width", "").css("height", "");
                
                $.get(that.docInfoPage, function(data, statusText, jqXHR) {
                    theLogger.log("下載MS-ODC010.html成功:");
                    var $wrapper = $("<div class='pg'></div>");
					//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS](MS-ODC010.html，經查均未使用內置或外部javascript
                    // $wrapper.get(0).innerHTML = data;
					//1140801	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，試用套件消毒
                    // $wrapper.get(0).innerHTML = data.replace(/javascript/ig,'').replace(/<script/ig,'');
                    $wrapper.get(0).innerHTML = DOMPurify.sanitize(data, {WHOLE_DOCUMENT: true, ADD_TAGS: ['iframe'], ADD_ATTR:['accessKey']});
                    var $ctx = $wrapper.find("div:jqmData(role='page')");
                    theLogger.log($ctx);
                    if($ctx) {
                        //$pg.attr("style", $ctx.attr("style")).html("").append($ctx.children()[0]).trigger("create");
                        $pg.attr("style", $ctx.attr("style")).html("").append($ctx.children()[0]).enhanceWithin();
                        
                        //if(typeof fnWebEditSave !== "undefined")	// 2016.8.9 新增呼叫同步基資功能
                        //    fnWebEditSave(_model);
                        
                        if (!!that.docInfoPageInitFunc) {
                            that.docInfoPageInitFunc();	// 2014.9.23 - Raymond新增, ODC010初始化開始
                        }
                    }
                    dfd.resolve();
                    //$.mobile.hidePageLoadingMsg();
                });
            }
            else {
                if(_currPo.attIdx == -1) {  // 本文
                    var that = this;
                    _model.accquireDraftModel(_currPo.draftIdx)
                        .done(function(dm) {
                            if(_memPPD[_currPo.draftIdx] !== undefined && _memPPD[_currPo.draftIdx].ti !== undefined)
                                _memPPD[_currPo.draftIdx].ti.trigger("selected");
                            
                            // 簽核頁面
                            try {
                                var pg = _model.getDraftPage(_currPo.draftIdx, _currPo.po);
                            }
                            catch(e) {
                                theLogger.error("getDraftPage(" + _currPo.draftIdx + "," + _currPo.po + ") Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
                            }
                            
                            // 2016.1.27 因附件頁面會調整pages大小及tags位置, 切回文稿頁面時要調回A4
                            $pg.closest(".pages").css("width", "").css("height", "");
                            
                            {  // 來文
                                //_memPPD[_currPo.draftIdx].pg = pg;
                                _memPPD[_currPo.draftIdx].pages = _model.getDraftPageCounts(_currPo.draftIdx);
                                
                                // 更新頁數
                                _memPPD[_currPo.draftIdx].ti.find(".ui-li-count").text(_memPPD[_currPo.draftIdx].pages);
                                
                                _model.getPageImage(pg)
                                    .done(function(data) {
                                        theLogger.log(data);
                                        $("<div class='pg'><img style='width:210mm; height:297mm; -webkit-user-select:none'/><div class='cover-layer'/></div>")
                                        .appendTo($pg)
                                                .find("img").attr("src", data);
                                            
                                        if(c)
                                            c.cmdFloat.hide();
                                        
                                        // 建立簽核物件
                                        if(pg) {
                                            _memPPD[_currPo.draftIdx].pg = pg;
                                            //buildSO(pg);
                                        }
                                        
                                        dfd.resolve();
                                    })
                                    .fail(function(errorText) {
                                        dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
                                    });
                            }
                        })
                        .fail(function(errorText) {
                            dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
                        });
                }
                else {  // 附件
                    if(_memPPA[_currPo.attIdx] != undefined && _memPPA[_currPo.attIdx].ti != undefined)
                        _memPPA[_currPo.attIdx].ti.trigger("selected");
                    
                    // 2016.8.5 判斷是否匯出頁面中
                    if(_memPPA[_currPo.attIdx].padding) {
                        var $prog = $("<div class='pg'><p>匯出頁面中</p></div>").appendTo($pg);
                        dfd.resolve();
                        return dfd.promise();
                    }
                    
                    // 簽核頁面
                    try {
                        var pg = _model.getAttPage(_currPo.draftIdx, _currPo.attIdx, _currPo.po);
                    }
                    catch(e) {
                        theLogger.error("Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
                        dfd.reject(e.message, fallback);	// 2015.3.20 對應附件不匯出頁面的錯誤處理	2015.12.29 新增傳入翻頁失敗時回呼函式參數
                        return dfd.promise();
                    }
                    
                    _memPPA[_currPo.attIdx].pages = _model.getAttPageCounts(_currPo.draftIdx, _currPo.attIdx);
                    
                    // 產生頁面
                    _model.getPageImage(pg)
                        .done(function(data, dpi) {	// 2016.4.27 多傳入第2個參數表示影像檔的dpi
                            theLogger.log(data);
                            // 2015.7.14 新增頁碼顯示
                            var $img = $("<div class='pg'><img class='attachment' style='width:210mm; height:297mm; -webkit-user-select:none'/><div class='cover-layer'><div class='page-no'>第 " + (_currPo.po + 1) + " 頁，共 " + _memPPA[_currPo.attIdx].pages + " 頁</div></div></div>").appendTo($pg)
                                    .find("img").attr("src", data).data("pgo", pg);	// 2015.2.3 added, 'attachment' class for remark as attachment
                                                                                    // 'pgo' data for recording rotation state
                            
                            // 2016.1.27 附件頁面尺寸不一定是A4, 須因應調整pages大小及tags位置
                            $img.on("load", function(event) {
                                console.log("附件頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
                                if("naturalWidth" in event.target && "naturalHeight" in event.target) {
                                    var w = event.target.naturalWidth / (dpi || 200),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
                                        h = event.target.naturalHeight / (dpi || 200);
                                    $img.css({width: w + "in", height: h + "in"});
                                    
                                    $img.closest(".pages").css({width: "calc(" + w + "in + 153px)"/*, height: "calc(" + h + "in + 20mm)"*/});	// 2016.3.15 FIX切換附件時出現捲動條問題
                                }
                            });
                            
                            // 2015.2.3 added, for restoring rotation state
                            if(pg && "rotate" in pg) {
                                var cx = $img.width();
                                var cy = $img.height();
                                var cxx = $img.parent().width();
                                if(pg.rotate == 90)
                                    $img.css({"-webkit-transform-origin": "left top",
                                            "-webkit-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(0px,-" + cy + "px)",
                                            "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
                                            "-moz-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(0px,-" + cy + "px)",
                                            "-ms-transform-origin": "left top",
                                            "-ms-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(0px,-" + cy + "px)",
                                            "transform-origin": "left top",
                                            "transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(0px,-" + cy + "px)"});
                                else if(pg.rotate == 180)
                                    $img.css({"-webkit-transform-origin": "left top",
                                            "-webkit-transform": "rotate(" + pg.rotate + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)",
                                            "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
                                            "-moz-transform": "rotate(" + pg.rotate + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)",
                                            "-ms-transform-origin": "left top",
                                            "-ms-transform": "rotate(" + pg.rotate + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)",
                                            "transform-origin": "left top",
                                            "transform": "rotate(" + pg.rotate + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)"});
                                else if(pg.rotate == 270)
                                    $img.css({"-webkit-transform-origin": "left top",
                                            "-webkit-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(-" + cx + "px,0px)",
                                            "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
                                            "-moz-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(-" + cx + "px,0px)",
                                            "-ms-transform-origin": "left top",
                                            "-ms-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(-" + cx + "px,0px)",
                                            "transform-origin": "left top",
                                            "transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(-" + cx + "px,0px)"});
                            }
                            
                            // 建立簽核物件
                            if(pg) {
                                _memPPA[_currPo.attIdx].pg = pg;
                                //buildSO(pg);
                            }
                            
                            dfd.resolve();
                        })
                        .fail(function(errorText) {
                            dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
                        });
                }
            }
            return dfd.promise();
        },
        reqNextPage: function($pg) {
            if ((_currPo.draftIdx >= 0 && _currPo.attIdx < 0 && (_currPo.po + 1) < _memPPD[_currPo.draftIdx].pages) ||
                (_currPo.attIdx >= 0 && (_currPo.po + 1) < _memPPA[_currPo.attIdx].pages)) {
                ++_currPo.po;   // 本文 or 附件的次頁
                return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
                    theLogger.warn("翻次頁失敗, 頁碼-1");
                    --_currPo.po;
                });
            }
            else if(_currPo.draftIdx >= 0 && (_currPo.attIdx + 1) < _model.getDraftAttCounts(_currPo.draftIdx) && _memPPA[_currPo.attIdx + 1].pages > 0) {	// 2015.12.18 修正附件無頁面時跳至次文稿顯示, (不知是否有單筆附件無頁面情形?)
                var oldPo = _currPo.po;	// 2015.12.29 暫時記憶翻次筆附件前的頁碼
                ++_currPo.attIdx;   // 次筆附件
                _currPo.po = 0;
                return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
                    theLogger.warn("翻次頁失敗, 附件序-1, 頁碼復原");
                    --_currPo.attIdx;
                    _currPo.po = oldPo;
                });
            }
            else if((_currPo.draftIdx + 1) < _model.getDraftCounts()) {
                if(_currPo.draftIdx < 0 && typeof fnODC010Save !== "undefined")	{// 2014.10.21 - Raymond, 若當前頁是公文基資, 則呼叫fnODC010Save儲存功能
                    var res = fnODC010Save();						// 2016.7.19 新增判斷fnODC010Save的回傳值, 若是false表示有欄位未填之類的錯誤, 不允許翻頁
                    if(typeof res === "boolean" && res == false)
                        return $.Deferred().reject("請修正後再翻頁");
                }
                var oldAttIdx = _currPo.attIdx,	// 2015.12.29 暫時記憶翻次筆文稿前的附件Index及頁碼
                    oldPo = _currPo.po;
                ++_currPo.draftIdx; // 次筆文稿
                _currPo.attIdx = -1;
                _currPo.po = 0;
                return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
                    theLogger.warn("翻次頁失敗, 文稿序-1, 附件序復原, 頁碼復原");
                    --_currPo.draftIdx;
                    _currPo.attIdx = oldAttIdx;
                    _currPo.po = oldPo;
                });
            }
            return $.Deferred().reject("已無次頁");	// 1061102 Raymond 1061078 typo
        },
        reqPrevPage: function($pg) {
            if(_currPo.po > 0) {
                --_currPo.po;
                return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
                    theLogger.warn("翻前頁失敗, 頁碼+1");
                    ++_currPo.po;
                });
            }
            else if(_currPo.attIdx >= 0) {
                var oldPo = _currPo.po;	// 2015.12.29 暫時記憶翻前筆附件前的頁碼
                --_currPo.attIdx;
                if(_currPo.attIdx >= 0)
                    _currPo.po = _memPPA[_currPo.attIdx].pages - 1;
                else
                    _currPo.po = 0;
                return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
                    theLogger.warn("翻前頁失敗, 附件序+1, 頁碼復原");
                    ++_currPo.attIdx;
                    _currPo.po = oldPo;
                });
            }
            else if(_currPo.draftIdx >= 0) {
                var oldAttIdx = _currPo.attIdx,	// 2015.12.29 暫時記憶翻前筆文稿前的附件Index及頁碼
                    oldPo = _currPo.po;
                    
                --_currPo.draftIdx;
                
                if(_currPo.draftIdx >= 0) {
                    _currPo.attIdx = _model.getDraftAttCounts(_currPo.draftIdx) - 1;
                    if(!(_currPo.attIdx in _memPPA))	// 2016.1.28 向前翻應先重整附件頁籤
                        _memPPA[_currPo.attIdx] = {ti: undefined, pages: _model.getAttPageCounts(_currPo.draftIdx, _currPo.attIdx)};
                    if(_currPo.attIdx >= 0 && _memPPA[_currPo.attIdx].pages > 0)	// 2015.12.18 修正附件無頁面時跳至前文稿顯示, (不知是否有單筆附件無頁面情形?)
                        _currPo.po = _memPPA[_currPo.attIdx].pages - 1;
                    else {
                        _currPo.attIdx = -1;	// 2015.12.18 修正附件無頁面時跳至前文稿顯示, (不知是否有單筆附件無頁面情形?)
                        _currPo.po = _memPPD[_currPo.draftIdx].pages - 1;
                    }
                }
                else {
                    _currPo.attIdx = -1;
                    _currPo.po = 0;
                }
                return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
                    theLogger.warn("翻前頁失敗, 文稿序+1, 附件序復原, 頁碼復原");
                    ++_currPo.draftIdx;
                    _currPo.attIdx = oldAttIdx;
                    _currPo.po = oldPo;
                });
            }
            return $.Deferred().reject("已無前頁");	// 1061102 Raymond 1061078 typo
        },
        pageFlipped: function($pg, $pages) {   // flip外掛會呼叫這個callback function通知頁面已翻, 2016.1.27 新增$pages參數, 因公文基資會找不到.pg類型元素
            var pg = null;
            if(_currPo.attIdx < 0) {
                theLogger.log("currPo - draftIdx: " + _currPo.draftIdx + ", po: " + _currPo.po);
                if(_currPo.draftIdx >= 0) { // 公文基資(draftIdx=-1)無pg物件
                    theLogger.log(_memPPD[_currPo.draftIdx].pg);
                    pg = _memPPD[_currPo.draftIdx].pg;
                }
            }
            else {
                theLogger.log("currPo - attIdx: " + _currPo.attIdx + ", po: " + _currPo.po);
                theLogger.log(_memPPA[_currPo.attIdx].pg);
                pg = _memPPA[_currPo.attIdx].pg;
            }
            
            if(typeof pg !== "undefined") {
                // 2015.4.30 觸發#tcMode的change事件, 重新以目前選取的追蹤修訂模式排列
                $("#aol #tcMode").trigger("change");
                
                var soBuilder = new SignObjBuilder($pg, _model.readOnly());	// 2016.8.10 新增傳入整份公文唯讀flag
                $pg.data("pg", pg);
                // 登記當前裝置的Page寬高的DP, 以供GenPage反推算LP
                theLogger.log("$pg.width()=" + $pg.width() + ",height()=" + $pg.height());
                if("pageExt" in pg.container) {
                    if(pg.container.pageExt.width != $pg.width())
                        pg.container.pageExt.width = $pg.width();
                    if(pg.container.pageExt.height != $pg.height())
                        pg.container.pageExt.height = $pg.height();
                }
                else {
                    pg.container.pageExt = {
                        width: $pg.width(),
                        height: $pg.height()};
                }
                buildSO($pg, pg, soBuilder);
            }
            
            // 2016.1.27 附件頁面不一定是A4須調整tags位置
            if(_currPo.attIdx < 0) {
                $pages.closest(".viewPort").find(".tags").css("left", "");	// 公文基資頁面$pg會是空的, 改用新增的$pages參數
                $pages.find("#pgFlippedIn").css("width", "").css("height", "");
            }
            else {
                //var pgo = $pg.data("pg");
                var w = $pg.find("img.attachment").width(),
                    h = $pg.find("img.attachment").height();
                $pg.closest(".viewPort").find(".tags").css("left", "calc(" + w + "px + 12px)");
                $pg.closest(".pages").find("#pgFlippedIn").css({width: w + "px", height: h + "px"});
            }
            
            // 2016.2.24
            //if(_uploadInitialLog) {
            //    AlternativeLogger.upload("文稿初始化完畢上傳");
            //    _uploadInitialLog = false;
            //}
            }
    };
    
    function _getPrintParameters(uniView, opts) {
        var _dfd = $.Deferred();
        // 尚未完成!
        var skip = false;
        if (skip) {
            _dfd.resolve('');
            return _dfd.promise();    
        }
        
        var $theDlg = $('#uniViewPrintSettingDialog');
        if ($theDlg.length===0) {
            _dfd.reject('無法取得UniView列印設定子視窗資源!');
            return _dfd.promise();    
        }
          
        function _onCancelClick() {
             var rtnObj = {success:true, userCancel:true};
            _dfd.resolve(rtnObj);
            $('#uniViewPrintSettingDialog').popup('close');
        }
        
        function _onOKClick() {
            var _printPGGroups = [];
            var _pgGroups = uniView.getDocPageGroup();
            var selItems = $theDlg.find('ul#printItemList li');
            var i=0, $li=null;
            for(i=0; i<selItems.length; i++) {
                $li = $(selItems[i]);
                
                if ($li.find('input').prop('checked')===true) {
					//1110929	Leslie	修正單層式線上簽核調閱，於列印影像時索引錯置問題，改用列印子視窗預留的data-idx，才是正確的頁面索引
                    //if (i<_pgGroups.length) {
					var idxGroup = $li.data('idx');
					if(idxGroup < _pgGroups.length){
                        //_printPGGroups.push(_pgGroups[i]);
						_printPGGroups.push(_pgGroups[idxGroup]);
                    }
                }
            }
            
            var printPageNo = $theDlg.find('input#cbPrintPageNo').prop('checked');
            opts.printPageNo = printPageNo;
            
            var rtnObj;
            if (_printPGGroups.length) {
                rtnObj = {success:true, userCancel:false, printGroups:_printPGGroups};
                _dfd.resolve(rtnObj);
            }
            else {
                rtnObj = {success:true, userCancel:true, msg:'使用者未選擇列印項目.'};
            }
            
            $('#uniViewPrintSettingDialog').popup('close');
        }
        
        $(document).on('popupafteropen', '#uniViewPrintSettingDialog', function(event, ui) {
        });
        
        $(document).on('popupcreate', '#uniViewPrintSettingDialog', function(event, ui) {
            // why not been called? ahhhhhh ahhhhh ahhhh....
        });
        
        // 結束後清除 selectmenu object
        $(document).on('popupafterclose', '#uniViewPrintSettingDialog', function(event, ui) {
            // 2019.9.16 - 1080339 Eric, .unbind -> .off
            $('#uniViewPrintSettingDialog #btn_uvPrtCancel').off('click', _onCancelClick);
            $('#uniViewPrintSettingDialog #btn_uvPrtOK').off('click', _onOKClick);
        });
        
        $('#uniViewPrintSettingDialog #btn_uvPrtCancel').on('click', _onCancelClick);
        $('#uniViewPrintSettingDialog #btn_uvPrtOK').on('click', _onOKClick);
        
        var _pgGroups=null, i=0, $li=null, pgGroup=null;
        var $listPrintItem = $theDlg.find('ul#printItemList');
        
        // 清除前次作業項目
        $listPrintItem.html('');
        // 設回預設值
        $theDlg.find('#cbPrintPageNo').prop('checked', false).checkboxradio( "refresh" );
        
        var mainDoc=false;
        if (!!uniView) {
            _pgGroups = uniView.getDocPageGroup();
            var mianDoc = false;
            for(i=0; i<_pgGroups.length; i++) {
                pgGroup = _pgGroups[i];
                if (!pgGroup || (pgGroup.getPageCount()<=0)) continue;

                mainDoc = (typeof pgGroup.mainDoc=='boolean' && pgGroup.mainDoc)?true:false;
                // 加入可列印項目清單內
                //$li = $('<li data-idx="' + i + '"><input type="checkbox" data-inline="true" data-enhanced="true" style="width:18px; height:18px; vertical-align:middle" />' + pgGroup.getTitle() + '</li>').appendTo( $listPrintItem );
                $li = $('<li data-idx="' + i + '" style="padding-left:30px"><input type="checkbox" data-enhanced="true"  style="width:22px; height:22px; vertical-align:middle; cursor:pointer;"' + (mainDoc?' checked':'') + '></input>' + pgGroup.getTitle() + '</label></li>').appendTo( $listPrintItem );
            }
        }
        $listPrintItem.listview('refresh');
        
        var _options = {corners: false, history: false, positionTo: 'window' }; 
        $theDlg.popup(_options);
        $('#uniViewPrintSettingDialog').popup('open', _options);
        SSOUtil.loading('hide');
        return _dfd.promise();
    }
    
    function _getPageImage(SAMLart, pg, cbdata) {
        var dfd = $.Deferred();
        // 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
        // 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
        if ((!window.realMac && (window.navigator.userAgent.indexOf("Macintosh") > 0)) || // 2019.10.8 - 1080905 Eric, iPadOS 13 quick-fix
            (window.navigator.userAgent.indexOf("Mobile") > 0 &&										// 2016.4.26
            window.navigator.userAgent.match(/iPad; CPU OS (\d+)_/g) && Number(RegExp.$1) > 8)) {																		// 2016.8.11 新增判定草稿也要直接下載, 因為imgtran找不到草稿附件影像
            
            if(typeof pg.wsdll !== "string")
                dfd.reject("下載簽核公文的WebFileIO Service網址未設定!");
            else if(pg.wsdl.length <= 0)
                dfd.reject("下載簽核公文的WebFileIO Service網址不可為空白!");
            else {
                theLogger.log("下載頁面影像檔'" + pg.filePath + "\\" + pg.filename + "'...");
                (new WebFileIO(_fileIOUrl)).download(pg.filePath, pg.filename, {
                    translateExt: function(fileName) {	// 2016.8.11 新增判斷副檔名是附件影像檔的.nnnn格式則回應是png影像格式給WebFileIO轉為dataurl
                        if(fileName.match(/\.\d{4}$/))
                            return ".png";
                        return null;
                    },
                    success: function(fil, res) {
                        dfd.resolve({url:fil, b64File:fil}, 300, cbdata);	// pass 第2個參數表示影像檔是300dpi, 2016.11.1 直接回傳cbdata參數
                    },
                    error: function(errorText) {
                        dfd.reject(errorText);
                    }
                });
            }
        }
        else {
            // 用影像處理網頁服務解決解析度問題
            var ODToolUrl = SSO_CONFIG.ServerHost + "/odtools/imgtran.ashx";
            // 2016.1.22 Base64編碼後可能有+、=等Base64字元, 用URI encoding處理成%HEX的形式, 以避免Server無法解讀
                  
            var dpi = that.displayDPI; // 2018.1.18 - merge 1060406  
            var b64Filename = Base64.encode(pg.filename);
            var b64FilePath = Base64.encode(pg.filePath);
            var imgProcUrl = ODToolUrl + '?FileIOWS='+ pg.wsdl + '&FilePath=' + encodeURIComponent(b64FilePath) +
                             '&FileName=' + encodeURIComponent(b64Filename) + '&Pixel=' + dpi + 'dpi&Format=33&SAMLart=' + SAMLart;
            
            var nDPI = parseInt(dpi);
            if (isNaN(nDPI)) {
                nDPI = 300;
            }
            dfd.resolve({url:imgProcUrl, b64File:b64Filename, Filename:pg.filename}, nDPI, cbdata);	// 2016.11.1 直接回傳cbdata參數
        }
        return dfd.promise();
    }
    /* 列印改為開啟獨立網頁方式實作, 取頁面影像資訊 */
    function _getPageImage_new(SAMLart, pg, cbdata) {
        var dfd = $.Deferred();
        // 2019.12.18 - 1081132 Eric, MacPC support! window.realMac
        if ((!window.realMac && (window.navigator.userAgent.indexOf("Macintosh") > 0)) || // 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
            (window.navigator.userAgent.indexOf("Mobile") > 0 &&										// 2016.4.26
            window.navigator.userAgent.match(/iPad; CPU OS (\d+)_/g) && Number(RegExp.$1) > 8)) {		// 2016.8.11 新增判定草稿也要直接下載, 因為imgtran找不到草稿附件影像
    
            if(typeof pg.wsdll !== "string") {
                dfd.reject("下載頁面影像檔的WebFileIO Service網址未設定!");
            }
            else if(pg.wsdl.length <= 0) {
                dfd.reject("下載頁面影像檔的WebFileIO Service網址不可為空白!");
            }
            else {
                theLogger.log("下載頁面影像檔'" + pg.filePath + "\\" + pg.filename + "'...");
                dfd.resolve({Filename:pg.filename, imgtran:false}, 300, cbdata);	// pass 第2個參數表示影像檔是300dpi, 2016.11.1 直接回傳cbdata參數
            }
        }
        else {
            var nDPI = 300;
            
            //dfd.resolve({url:imgProcUrl, b64File:b64Filename, Filename:pg.filename}, nDPI, cbdata);	// 2016.11.1 直接回傳cbdata參數
            dfd.resolve({Filename:pg.filename, imgtran:true}, nDPI, cbdata);
        }
        return dfd.promise();
    }
    
    function _setupPageImage(artifact, pg, idxPage, cntPage, opts, $pages, pm) {
        var _dfd = $.Deferred();
        
        _getPageImage(artifact, pg)
        .done(function(data, dpi) {
            // 2016.12.20 - "pg"也要設w/h...
            var $pg = $('<div class="pg" style="width:' + (210 + (pm * 2)) + 'mm; height:' + (297 + (pm * 2) - 3) + 'mm"></div>').appendTo($pages);
            var $img = $('<img data-idxPage="' + idxPage + '" data-file="' + data.b64File + '" class="attachment" style="width:' + (210 + (pm * 2)) + 'mm; height:' + (297 + (pm * 2) - 3) + 'mm" />');
            $img.appendTo($pg);
            
            var $pgInfo = $('<div class="att-po" style="display:' + (opts.printPageNo?'block':'none') + '">第 ' + (idxPage + 1) + ' 頁，共 ' + cntPage + ' 頁</div>');
            $pgInfo.appendTo($pg);
            
            // 2019.2.14 - 1080179 Eric, [from Kevin]弱點掃描項目修改(all $img.load => $img.bind('load', function() {...}), .error??)
            $img.on('load', function(event) {
                console.log('附件頁面影像#' + idxPage + '.on' + event.type + '(' + event.target.naturalWidth + ' x ' + event.target.naturalHeight + ')');
            //     2016.12.28 - 因imgtrans未依指定DPI回應影像, 暫時取消此處指定size作業!
            //    if("naturalWidth" in event.target && "naturalHeight" in event.target) {
            //        var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為300dpi, 若有傳入dpi參數則以dpi為準
            //            h = event.target.naturalHeight / (dpi || 300);
            //        $img.css({width: w + "in", height: h + "in"});
            //    }
            //    
            //     2016.12.28 - if wait for img readly, resolve here...
                _dfd.resolve({success:true});
            });
            
            // 2019.9.16 - 1080339 Eric
            $img.on('error', function(event){
                console.log('附件頁面影像#' + idxPage + '.on' + event.type);
                _dfd.reject('取得影像時發生錯誤!');
            });
            
            $img.attr("src", data.url);
            
            // 2016.12.28 - if not wait for img ready, resolve here...
            _dfd.resolve({success:true});
        })
        .fail(function(errText){
            _dfd.reject('取得頁面影像失敗, 檔名=' + pg.filePath + '\\' + pg.filename + ', 錯誤說明:' + errText);
        });
        return _dfd.promise();
    }
        
    function _printGroupPages(artifact, pgGroups, idx, opts, $pages, pm) {
        if (typeof pm=='undefined') {
            pm = 0;
        }
        
        var dfd = $.Deferred();
        var pgGroup = pgGroups[idx];
        var deferreds = [];	// 等待多頁同時完成
        var n = pgGroup.getPageCount();
        for(var i=0; i<n; i++) {
            var pg = pgGroup.getPage(i);
            if(pg) {
                // 2016.12.28 - 改為等<img>的load event再完成resolve
                deferreds.push(_setupPageImage(artifact, pg, i, n, opts, $pages, pm));
                                        }
            
            // 2016.12.22 - 測試文超過20頁, 結束作業!
            if (_debug && i>=20) {
                break;
            }
        }
        
        if (deferreds.length > 0) {
            $.when.apply(this, deferreds)
                .done(function() {
                    theLogger.log('-I- UniView公文列印, [' + pgGroup.getTitle() + ']所有附件頁面已下載完成, 共' + deferreds.length + '頁');
                    
                    // 2016.12.13 - Eric, 若非列印最後一個附件, 接著印下一個
                    var nextIndex = idx+1;
                    if (nextIndex<=(pgGroups.length-1)) {
                        var _pgGroup = pgGroups[nextIndex];
                        while(!!_pgGroup && (_pgGroup.getPageCount()<=0)) { // 有頁面才印!
                            nextIndex++;
                            
                            if (nextIndex<=(pgGroups.length-1)) {
                                _pgGroup = pgGroups[nextIndex];
                            }
                            else {
                                _pgGroup = null;
                            }
                        }
                        
                        if (_pgGroup && (nextIndex<=(pgGroups.length-1))) {
                            _printGroupPages(artifact, pgGroups, nextIndex, opts, $pages, pm)
                            .done(function(){
                                dfd.resolve();
                            })
                            .fail(function(errorText){
                                dfd.reject(errorText);
                            });
                        }
                        else { // 後面已無待列印項目, 結束作業!
                            dfd.resolve();
                        }
                    }
                    else {
                        dfd.resolve();
                    }
                })
                .fail(function(errorText) {
                    dfd.reject(errorText);
                });
        }
        else {
            theLogger.warn("附件無頁面!?");
            dfd.resolve();
        }
        return dfd.promise();
    }
    
    function _printGroupPages_new(artifact, pgGroups, idxGroup, opts, prtContent) {
        if (typeof pm=='undefined') {
            pm = 0;
        }
        
        var ODToolUrl = SSO_CONFIG.ServerHost + "/odtools/imgtran.ashx";
        
        var dfd = $.Deferred();
        var pgGroup = pgGroups[idxGroup];
        var deferreds = [];	// 等待多頁同時完成
        var cntGroupPage = pgGroup.getPageCount();
        var prtPage, idxPage, pg, _dfdPage;
        
        // for deubg
        var maxPrtPage=-1;
        if (typeof _debug=='boolean' && _debug===true) {
            maxPrtPage = 52;
        }
        
        for(idxPage=0; idxPage<cntGroupPage; idxPage++) {
            pg = pgGroup.getPage(idxPage);
            if (!!pg) {
                _dfdPage = $.Deferred();
                // 2016.12.28 - 改為等<img>的load event再完成resolve
                _getPageImage_new(artifact, pg, null)
                .done(function(data, dpi) {
                    // data: {Filename:pg.filename, imgtran:true}
                    prtPage = {'grpIdx': idxGroup, 'pgIdx': idxPage, 'pgCount':cntGroupPage, fileName:data.Filename, imgtran:data.imgtran, res:dpi};
                    prtContent.prtPages.push(prtPage);
                    _dfdPage.resolve({success:true});
                })
                .fail(function() {
                    _dfdPage.reject({success:false});
                });
                deferreds.push(_dfdPage.promise());
            }
            
            // 2016.12.22 - 測試文超過70頁, 結束作業!
            if (typeof _debug=='boolean' && _debug===true && idxPage>=(maxPrtPage-1)) {
                alert('超過' + maxPrtPage + '頁, 取消後續頁面列印!');
                break;
            }
        }
        
        if (deferreds.length > 0) {
            $.when.apply(this, deferreds)
                .done(function() {
                    theLogger.log('-I- UniView公文列印, [' + pgGroup.getTitle() + ']所有群組頁面資訊已取得, 共' + deferreds.length + '頁');
                    
                    var _unvPage = pgGroup.getPage(0);
                    if (typeof prtPage=='object' && typeof prtPage.imgtran=='boolean' && prtPage.imgtran===true) {
                        prtContent.prtGroups.push({grpIdx:idxGroup, wsUrl:_unvPage.wsdl, odToolUrl:ODToolUrl, filePath:_unvPage.filePath});
                    }
                    else {
                        prtContent.prtGroups.push({grpIdx:idxGroup, wsUrl:_unvPage.wsdl, odToolUrl:'', filePath:_unvPage.filePath});
                    }
                    
                    // 2016.12.13 - Eric, 若非列印最後一個附件, 接著印下一個
                    var nextIndex = idxGroup+1;
                    if (nextIndex<=(pgGroups.length-1)) {
                        var _pgGroup = pgGroups[nextIndex];
                        while(!!_pgGroup && (_pgGroup.getPageCount()<=0)) { // 有頁面才印!
                            nextIndex++;
                            
                            if (nextIndex<=(pgGroups.length-1)) {
                                _pgGroup = pgGroups[nextIndex];
                            }
                            else {
                                _pgGroup = null;
                            }
                        }
                        
                        if (_pgGroup && (nextIndex<=(pgGroups.length-1))) {
                            _printGroupPages_new(artifact, pgGroups, nextIndex, opts, prtContent)
                            .done(function(){
                                dfd.resolve({success:true});
                            })
                            .fail(function(errorText){
                                dfd.reject(errorText);
                            });
                        }
                        else { // 後面已無待列印項目, 結束作業!
                            dfd.resolve();
                        }
                    }
                    else {
                        dfd.resolve();
                    }
                })
                .fail(function(errorText) {
                    dfd.reject(errorText);
                });
        }
        else {
            theLogger.warn("附件無頁面!?");
            dfd.resolve();
        }
        return dfd.promise();
    }

    /* 1090227 Raymond 1080751 合併內政部1070381 [Eric補]列印時叫用WS以記錄此此作業資訊 */
    function _logPrintAction() {
        var uo = that.UNVObj;
        if(!!uo && "UnvRoot" in uo) {
            if("WSDLurl" in uo.UnvRoot && uo.UnvRoot.WSDLurl.length > 0) {
                var wsUrl = uo.UnvRoot.WSDLurl;
                var wsFuncName = 'PrintLog';
                var params = new SOAPClientParameters();
                // 1.參數
                params.add("UserId", uo.UnvRoot.USER_ID);
                params.add("UserName", uo.UnvRoot.USER_NAME);
                params.add("DocNo", uo.UnvRoot.Doc.DocNo);
				//1140707	1140242		Cloud	叫用AKI500時補上傳入機關代碼
				params.add("OrgNo", uo.UnvRoot.Doc.SourceOrgNo);
                // 2.呼叫WS
                SOAPClient.invoke(wsUrl, wsFuncName, params, true, function (rslt) {
                    theLogger.log('-I- AKI500WS.' + wsFuncName + ' returns:', rslt);
                    if (typeof rslt === 'boolean') {
                        if (rslt === true) {
                            // 3.回報成功
                        }
                        else {
                            alert("回報列印記錄失敗!");
                        }
                    }
                    else {
                        theLogger.error('Error! AKI500WS[' + wsFuncName + '] 回傳不為boolean');
                        alert("回報列印記錄發生錯誤!");
                    }
                });
            }
            else {
                theLogger.error("此為調閱公文, 但UNV檔物件中未記錄應回報的WSDLurl網址");
            }
        }
    }
    
    function _printDoc(artifact, uniView) {
        if (typeof uniView=='object') {
            var opts = {
                type: "doc",
                enable: true,
                printSealMark: false,					// 列印騎縫章
                printSealMarkAtSamePos: false,			// 列印騎縫章在相同位置
                printBarcode: false, 					// 列印條碼
                printPageNo: false,						// 列印頁碼,
                prtGroupIndex: []                       // 列印範圍[選擇群組]
            };
    
            // 2018.1.18 - merge 1060406, 強制式浮水印功能
            if (that.UNVObj.ForceDisplayWaterMark || that.UNVObj.ForceWaterMark) {
                opts.enableForceWaterMark = true;
            }
    
            _getPrintParameters(uniView, opts)
            .then(function(rslt){
                var _dfd = $.Deferred();
                
                /* 使用者取消作業 */
                if (typeof rslt.userCancel=='boolean' && rslt.userCancel===true) {
                    _dfd.resolve();
                    return _dfd.promise();
                }
                
                SSOUtil.loading('show');
                
                var isIE = navigator.userAgent.indexOf("Trident") > 0;	// IE旗標
                // 使用IE列印時邊界反推
                var pm = 0;
                if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0) {
                    pm = 0 - SSO_CONFIG.printMarginForIE;
                }
                
                var _prtPageGroups = rslt.printGroups;
                var groupCnt = _prtPageGroups.length;
                theLogger.log('-I- _printDoc(artifact=' + artifact + ', pageGroupCnt=' + groupCnt +') invoked!');
                
                var prtContent = {
                    prtGroups: [],
                    prtPages: []
                };

                // 2019.10.21 - Eric, bug fix: 若displayForceWatermakr=false, forceWatermark=true, 須先下載fwmsetting.
                //  (測試jQuery 3.0升級發現問題!)
                let _dfdGetFWM = $.Deferred();
                let _prmGetFWM = _dfdGetFWM.promise();
                if (opts.enableForceWaterMark && that.fwmSettings===null) {
                    _getForceWaterMarkSettings(artifact, that.UNVObj.USER_ORGNO, true)
                    .then(function(rslt) {
                        var _dfdSub = $.Deferred();
            
                        if (rslt.success && rslt.jsonObj!==null) {
                            that.fwmSettings = rslt.jsonObj;
                        }
            
                        // get watermark image
                        var filePathname = rslt.jsonObj.ImageFileName;
                        var idxLastSlash = filePathname.lastIndexOf('\\');
                        var wmfilePath='', wmfileName='';
                        if (idxLastSlash!==-1 && idxLastSlash<(filePathname.length-2)) {
                            wmfilePath = filePathname.substr(0, idxLastSlash);
                            wmfileName = filePathname.substr(idxLastSlash+1);
                        }
            
                        if (wmfilePath.length && wmfileName.length) {
                            _getForceWaterMarkImage(SAMLart, SSO_CONFIG.getWSUrl('fileiows'), wmfilePath, wmfileName)
                            .done(function(rslt){
                                if (typeof rslt.imgStr=='string' && rslt.imgStr.length) {
                                    that.fwmPath = rslt.imgStr;
                                }
                                _dfdSub.resolve({success:true, 'imgStr': that.fwmPath});
                            })
                            .fail(function(rslt){
                                _dfdSub.reject(rslt);
                            })
                        }
                        return _dfdSub.promise();
                    })
                    .then(function(rslt) {
                        _dfdGetFWM.resolve(rslt);
                    })
                    .fail(function(errRslt) {
                        _dfdGetFWM.reject(errRslt);
                    });
                }
                else {
                    _dfdGetFWM.resolve({success:true});
                }

                _prmGetFWM
                .then(function(rslt) {
                    return _printGroupPages_new(artifact, _prtPageGroups, 0, opts, prtContent);
                })
                .then(function() {
                    // 列印頁面已輸出完成
                    var _printJob = {
                        'pm': pm,
                        'opts': opts,
                        'prtPages': prtContent.prtPages,
                        'prtGroups': prtContent.prtGroups,
                        SAMLart: artifact
                    };
                    
                    // 2018.1.18 - merge 1060406, 強制式浮水印功能
                    if (opts.enableForceWaterMark) {
                        _printJob.fwmSettings = that.fwmSettings;
                        _printJob.fwmPath = that.fwmPath;

                        // 2020.9.11 - 1090529 Eric, 信保基金浮水印
                        let _userInfo = null;
                        if (SSO_CONFIG.OrgNickName=='SMEG') {
                            _userInfo = {
                                OrgNickName: (SSO_CONFIG.OrgNickName||''),
                                OUName: that.UNVObj.OU_NAME,
                                UserId: that.UNVObj.USER_ID,
                                UserTitle: (that.UNVObj.USER_TITLE||''), 
                                ClientIP: (that.UNVObj.CLIENT_IP||'')
                            };
                        }
                        else {
                            _userInfo = {
                                OrgNickName: (SSO_CONFIG.OrgNickName||''),
                                OUName: that.UNVObj.OU_NAME,
                                UserName: that.UNVObj.USER_NAME
                            };
							// 1100630 Raymond 1100780 一般機關的文字浮水印新增UserId、UserTitle、ClientIP欄位
							_userInfo.UserId = that.UNVObj.USER_ID;
							_userInfo.UserTitle = (that.UNVObj.USER_TITLE||'');
							_userInfo.ClientIP = (that.UNVObj.CLIENT_IP||'');
                        }
                        _printJob.userInfo = _userInfo;
                    }

                    var _go = true;
                    if (_printJob.prtPages.length>50 && isIE) {
                        _go = confirm('列印頁數超過50頁, IE瀏覽器可能會有頁面影像缺漏問題, 建議改用Chrome瀏覽器列印.\r\n是否要繼續列印?');
                    }
                    
                    if (!_go) {
                        _dfd.resolve();
                        SSOUtil.loading('hide');
                        return;
                    }

                    // 2018.1.18 - merge, 叫用前若已有先前作業暫存內容, 先清除之 
                    // [因可能內嵌浮水印影像內容, 若未清除可能會造成Safari localStorage 'quota exceeded' exception]
                    var sLastestPrtJobId = localStorage['latest_print_job_id'];
                    if (typeof sLastestPrtJobId=='string' && sLastestPrtJobId.length) {
                        localStorage.removeItem(sLastestPrtJobId);
                    }
                    
                    var jobId = SSOUtil.getCurrentTimeStr_YYYMMDDhhmm(true);
                    localStorage[jobId] = JSON.stringify(_printJob);
                    localStorage.latest_print_job_id = jobId; // 2018.1.18 - merge
                    
                    var urlWithParam = SSO_CONFIG.ServerHost + '/MS/RD-UVPrint.html?JobId=' + jobId;

                    // 2019.10.17 - 1080339 Eric, dev test
                    //if (window.location.href.indexOf('docvip.fdat.com.tw/MSDev')!=-1) {
                    //    urlWithParam = SSO_CONFIG.ServerHost + '/MSDev/RD-UVPrint.html?JobId=' + jobId;
                    //}

                    // 1090227 Raymond 1080751 合併內政部1070381 補print log記錄
                    //window.open(urlWithParam, '_blank');
                    var _printWnd = window.open(urlWithParam, '_blank');
                    if (_printWnd!==null) {
                        _logPrintAction();
                    }
                    
                    /*var printCSSVer = '5.0.87';
                    var newWin = window.open();
                    newWin.document.write('<!DOCTYPE html><html><head><meta http-equiv="X-UA-Compatible" content="IE=EDGE" /><meta http-equiv="cache-control" content="max-age=0" />' +
                        '<meta http-equiv="cache-control" content="no-cache" />' +
                        '<meta http-equiv="expires" content="0" />' +
                        '<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />' +
                        '<meta http-equiv="pragma" content="no-cache" />' +
                        '<meta http-equiv="Content-Type" content="text/html; charset=utf8" />' +
                        '<title>公文列印</title><link rel="stylesheet" href="CSS/PrintChrome.css?ver=' + printCSSVer + '"/>' +
                        '<script src="lib/jquery-2.2.3.js"></script>' +
                        '<script src="lib/RD-UVPrint.js"></script>' +
                        '<script>function imgloadError() { alert("img load error, src=\"" + this.src + "\""); }</script>' + // 2016.12.22 - [bug-trace] img error handling
                        '</head><body style="margin:0mm">');	// 2016.12.1 新增使用IE列印時邊界反推, 12.20-margin設為0mm
                    for(var i=0; i<$pages.length; i++) {
                        newWin.document.write($pages.get(i).outerHTML);
                    }
                    newWin.document.write('<input id="validateImages" type="button" style="position:absolute;right:0px;top:0px;" value="checkImages"></body></html>');
                    newWin.document.close();
                    newWin.focus();
                    
                    $pages.remove();	// 移除暫時appendTo目前DOM的元素
                    */
                    _dfd.resolve();
                    SSOUtil.loading('hide');
                })
                .fail(function(errorText) {
                    theLogger.error('ERROR! 列印作業失敗! 原因:' + errorText);
                    _dfd.reject(errorText);
                    SSOUtil.loading('hide');
                });
                
                return _dfd.promise();
            })
            .fail(function(errorText){
                theLogger.error('ERROR! 列印作業失敗! 原因:' + errorText);
                alert('列印作業失敗! 原因:' + errorText);
            });
        }
        else {
            theLogger.error('ERROR! 列印作業錯誤! 原因:無效的UniView object.');
            alert('列印作業錯誤! 原因:無效的UniView object.');
        }
    }
    
    // 2017.1.6
    function _getGotoPage(uniView, currPos, pageGroupInfo) {
        var _dfd = $.Deferred();
        
        var cntPage = pageGroupInfo.pageGroup.getPageCount();
        
        var $theDlg = $('#uvGoToPageDialog');
        if ($theDlg.length===0) {
            _dfd.reject('無法取得UniView跳頁指定子視窗資源!');
            return _dfd.promise();    
        }
          
        function _onCancelClick() {
             var rtnObj = {success:true, userCancel:true};
            _dfd.resolve(rtnObj);
            $('#uvGoToPageDialog').popup('close');
        }
        
        function _onOKClick() {
            var pageIndex = -1;
            var sGotoPageNo = $theDlg.find('input#gotoPageNo').val();
            if (typeof sGotoPageNo=='string' && sGotoPageNo.length) {
                pageIndex = parseInt(sGotoPageNo);
                if (isNaN(pageIndex)) {
                    pageIndex = -1;
                }
                else if ((pageIndex<1) || (pageIndex>cntPage)) {
                    pageIndex = -1;
                }
                else  {
                    pageIndex -= 1;
                }
            }
            
            var rtnObj;
            if (pageIndex>=0) {
                var _newPos = {
                    draftIdx: currPos.draftIdx,
                    attIdx: currPos.attIdx,
                    po: pageIndex };
                rtnObj = {success:true, userCancel:false, newPos:_newPos};
                _dfd.resolve(rtnObj);
            }
            else {
                alert('輸入的頁序: ' + sGotoPageNo + ' 不正確, 請修正後重試!');
                return;
            }
            
            $('#uvGoToPageDialog').popup('close');
        }
        
        $(document).on('popupafteropen', '#uvGoToPageDialog', function(event, ui) {
        });
        
        $(document).on('popupcreate', '#uvGoToPageDialog', function(event, ui) {
            // why not been called? ahhhhhh ahhhhh ahhhh....
        });
        
        // 結束後清除 selectmenu object
        $(document).on('popupafterclose', '#uvGoToPageDialog', function(event, ui) {
            // 2019.9.16 - 1080339 Eric, .unbind -> .off
            $('#uvGoToPageDialog #btn_uvGotoPageCancel').off('click', _onCancelClick);
            $('#uvGoToPageDialog #btn_uvGotoPageOK').off('click', _onOKClick);
        });
        
        $('#uvGoToPageDialog #btn_uvGotoPageCancel').on('click', _onCancelClick);
        $('#uvGoToPageDialog #btn_uvGotoPageOK').on('click', _onOKClick);
        
        var sRange = '[1 - ' + cntPage + ']';
        $theDlg.find('span#rangeHint').text(sRange);
        $theDlg.find('input#gotoPageNo').val('1'); // 預設第一頁
        
        //var _pgGroups=null, i=0, $li=null, pgGroup=null;
        //var $listPrintItem = $theDlg.find('ul#groupItemList');
        //
        //// 清除前次作業項目
        //$listPrintItem.html('');
        //
        //var mainDoc=false;
        //if (!!uniView) {
        //    _pgGroups = uniView.getDocPageGroup();
        //    var mianDoc = false;
        //    for(i=0; i<_pgGroups.length; i++) {
        //        pgGroup = _pgGroups[i];
        //        if (!pgGroup || (pgGroup.getPageCount()<=0)) continue;
        //
        //        mainDoc = (typeof pgGroup.mainDoc=='boolean' && pgGroup.mainDoc)?true:false;
        //        // 加入可列印項目清單內
        //        //$li = $('<li data-idx="' + i + '"><input type="checkbox" data-inline="true" data-enhanced="true" style="width:18px; height:18px; vertical-align:middle" />' + pgGroup.getTitle() + '</li>').appendTo( $listPrintItem );
        //        $li = $('<li data-idx="' + i + '" style="padding-left:30px"><input type="checkbox" data-enhanced="true"  style="width:22px; height:22px; vertical-align:middle; cursor:pointer;"' + (mainDoc?' checked':'') + '></input>' + pgGroup.getTitle() + '</label></li>').appendTo( $listPrintItem );
        //    }
        //}
        //$listPrintItem.listview('refresh');
        
        var _options = {corners: false, history: false, positionTo: 'window' }; 
        $theDlg.popup(_options);
        $('#uvGoToPageDialog').popup('open', _options);
        SSOUtil.loading('hide');
        return _dfd.promise();
    }
    
    function _loadDoc(SAMLart, docId, newPage) {
        var _dfd = $.Deferred();

        if (typeof newPage =='undefined') {
            newPage = false;
        }
        
        if (typeof docId!=='string' || docId.length===0) {
            _dfd.reject({success:false, _errMsg:'docId不可為空字串或未定義!'});
            return _dfd.promise();
        }

        var sLSId = newPage ? 'viewDoc_out_' + docId : 'viewDoc_in_' + docId;
        var sViewDocInfo = localStorage[sLSId];
        
        var viewDocInfo = JSON.parse(sViewDocInfo);
        if (viewDocInfo===null) {
            theLogger.err('Error! invalid viewDocInfo:"' + sViewDocInfo + '"');
            alert('viewDocInfo 內容有誤!');
            _dfd.reject({success:false, _errMsg:'viewDocInfo 內容有誤!'});
            return _dfd.promise();; // 2017.4.7
        }
        
        that.UNVObj = new UNVObj(viewDocInfo.UNVObj);
        if (typeof viewDocInfo.docInfoPage !== 'undefined' && viewDocInfo.docInfoPage!==null) {
            that.docInfoPage = viewDocInfo.docInfoPage;
        }
        
        //_docPageGroups = that.UNVObj.getDocPageGroups(0);
        that.UNVObj.getDocPageGroups2(0)
        .done(function(rslt){
            _docPageGroups = rslt.groups;
            _dfd.resolve({success:true});
        })
        .fail(function(errRslt) {
            _dfd.reject(errRslt);
        });
        
        that.SAMLart = SAMLart;
        that.docId = docId; // 2017.4.19 - 1060228
        return _dfd.promise();
    }
    
    function _getPageGroupFromPos(_currPos) {
        if (_currPos.draftIdx>=0) {
            if (_currPos.attIdx<0) {
                // 本文群組
                return {idx:0, pageGroup:_docPageGroups[0]};
            }
            else {
                var groupIndex = _currPos.attIdx + 1;
                if (groupIndex<_docPageGroups.length) {
                    return {idx:groupIndex, pageGroup:_docPageGroups[groupIndex]};
                }
            }
        }
        return null;
    }
        
    function _getCurrentPosInfo() {
        function _findPreviousPageGroup(startIdx) {
            var i=0, group=null;
            for(i=startIdx; i>=0; i--) {
                group = _docPageGroups[i];
                if (group.getPageCount()) {
                    return i;
                }
            }
            return -1;
        }
        
        function _findNextPageGroup(startIdx) {
            var i=0, group=null;
            var cntGroup = _docPageGroups.length;
            for(i=startIdx; i<cntGroup; i++) {
                group = _docPageGroups[i];
                if (group.getPageCount()) {
                    return i;
                }
            }
            return -1;
        }
        
        var _docIdx = _currPo.draftIdx; // 目前只支援一份公文, 故 draftIdx=-1 => 基資, 0:公文頁面
        var _attIdx = _currPo.attIdx;
        var _po = _currPo.po;
        var _nextPos = null, _prevPos = null;
        var _newAttIdx=-1;
        if (_docIdx>=0) {
            var pageGroupInfo = _getPageGroupFromPos(_currPo);
            if (!!pageGroupInfo) {
                var pageCount = pageGroupInfo.pageGroup.getPageCount();
                var prevPageGroup = null, nextPageGroup=null;
                
                if (_po<=0 && pageGroupInfo.idx>0) {
                    // group第一頁, 找上一group
                    _prevPos = {};
                    _prevPos.draftIdx = _docIdx;
                    
                    // 2016.11.1 - 跳過原始檔項目
                    _newAttIdx = _findPreviousPageGroup(pageGroupInfo.idx-1);
                    if (_newAttIdx>=0) {
                        prevPageGroup = _docPageGroups[_newAttIdx];
                    }
                    
                    if (!!prevPageGroup) {
                        _prevPos.attIdx = (_newAttIdx-1);
                        _prevPos.po = prevPageGroup.getPageCount()-1;
                        _prevPos.pageGroup = prevPageGroup;
                    }
                    else {
                        _prevPos.po = 0;
                        _prevPos.pageGroup = pageGroupInfo.pageGroup;
                    }
                }
                else if (_po>0) {
                    _prevPos = {};
                    _prevPos.draftIdx = _docIdx;
                    _prevPos.attIdx = _attIdx;
                    _prevPos.po = _po-1;
                    _prevPos.pageGroup = pageGroupInfo.pageGroup;
                }
                
                // 2016.11.1 - ToDo: 跳過原始檔項目
                if (_po<(pageCount-1)) {
                    _nextPos = {};
                    _nextPos.draftIdx = _docIdx;
                    _nextPos.attIdx = _attIdx;
                    _nextPos.po = _po+1;
                    _nextPos.pageGroup = pageGroupInfo.pageGroup;
                }
                else if (pageGroupInfo.idx<(_docPageGroups.length-1)) {
                    _nextPos = {};
                    
                    // group最後一頁, 找下一group
                    _nextPos.draftIdx = _docIdx;
                    
                    // 2016.11.1 - 跳過原始檔項目
                    _newAttIdx = _findNextPageGroup(pageGroupInfo.idx+1);
                    if (_newAttIdx>=0) {
                        nextPageGroup = _docPageGroups[_newAttIdx];
                    }

                    if (!!nextPageGroup) {
                        _nextPos.po = 0;
                        _nextPos.attIdx = _attIdx+1;
                        _nextPos.pageGroup = nextPageGroup;
                    }
                    else {
                        _nextPos = null;
                    }
                }
            }
        }
        else {
            /*目前顯示公文基資, 下一頁為本文第一頁 */
            _nextPos = {
                draftIdx: 0,
                attIdx: -1,
                po: 0
            };
        }
        
        return {
          currPos: _currPo,
          nextPos: _nextPos,
          previousPos: _prevPos,
        };
    }
    
    function _hasPage(groupIdx) {
        var pageGroup = null;
        if (groupIdx>=0 && groupIdx<_docPageGroups.length)
            pageGroup = _docPageGroups[groupIdx];
            
        if (!!pageGroup && pageGroup.getPageCount()) {
            return true;
        }
        return false;
    }

	// 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容	
    function _shouldOpenWithAOL(groupIdx) {
        var pageGroup = null;
        if (groupIdx>=0 && groupIdx<_docPageGroups.length)
            pageGroup = _docPageGroups[groupIdx];
            
        if (!!pageGroup && pageGroup.shouldOpenWithAOL()) {
            return true;
        }
        return false;
    }

	
	//1080117	Leslie[1071239]	Merge歷史公文之流程檢視
	function _isURLLink(groupIdx) {
        var pageGroup = null;
        if (groupIdx>=0 && groupIdx<_docPageGroups.length)
            pageGroup = _docPageGroups[groupIdx];
            
        if (!!pageGroup && pageGroup.isURLLink()) {
            return true;
        }
        return false;
    }

    // 2021.12.20 - 1101330 Eric, 計算頁面影像顯示區域
    function _calcAspectRatioRect(rcWindow, imgWidth, imgHeight) {
        var rcAspectRatio = $.extend({}, rcWindow);
        var szWindow = { cx:Math.abs(rcWindow.right-rcWindow.left), cy:Math.abs(rcWindow.bottom-rcWindow.top)};

        var nShrink=0, nTargetWidth=0, nTargetHeight=0;
        var ratio = 1;
        if (imgWidth>szWindow.cx) {
            // 暫定寬度
            nTargetWidth = szWindow.cx; 

            // 縮放比
            ratio = (szWindow.cx / imgWidth);

            // 暫定高度
            nTargetHeight = imgHeight * ratio;

            if (nTargetHeight>szWindow.cy) {
                // 暫定高度超過->szWinodw.cy為最終高度
                ratio = (szWindow.cy / imgHeight);

                nTargetWidth = imgWidth * ratio;
                nTargetHeight = szWindow.cy;
            }
        }
        else if (imgHeight>szWindow.cy) {
            // 暫定高度
            nTargetHeight = szWindow.cy; 

            // 縮放比
            ratio = (szWindow.cy / imgHeight);

            // 暫定寬度
            nTargetWidth = imgWidth * ratio;

            if (nTargetWidth>szWindow.cx) {
                // 暫定寬度超過->szWinodw.cx為最終寬度
                ratio = (szWindow.cx / imgWidth);

                nTargetHeight = imgHeight * ratio;
                nTargetWidth = szWindow.cx;
            }
        }
        else {
            // imgWidth/imgHeight皆小於或等於szWindow
            nTargetHeight = imgHeight;
            nTargetWidth = imgWidth;
        }

        var left = rcWindow.left + ((szWindow.cx - nTargetWidth)/2);
        var top = rcWindow.top + ((szWindow.cy - nTargetHeight)/2);
        return {'left':left, 'top':top, 'right':(left+nTargetWidth), 'bottom':(top+nTargetHeight)};
    }
        
    function _showTargetPosPage(pos) {
        // pos: {draftIdx, attIdx, po}
        if (pos.draftIdx>=0) {
            var groupIndex = pos.attIdx+1;
            if (groupIndex>=0 && groupIndex<_docPageGroups.length) {
                var pageGroup = _docPageGroups[groupIndex];
                if (!!pageGroup && pos.po>=0 && pos.po<pageGroup.getPageCount()) {
                    // 2017.2.21 - 取消旋轉設定
                    var $viewPort = $('#uvISO #uvViewPort');
                    var $pg = $('#uvISO .uvPages #uvpgFrontFace .pg');
                    var $img = $pg.find("img");
                    var pgo = $pg.find("img").data("pgo");
                    if (typeof pgo=='object' && typeof pgo.rotate=='number') {
                        pgo.rotate = 0;
                    }
                    
                    $viewPort.removeClass('dir_landscape');
                    $img.removeClass('ls'); // 2017.4.20

                    $img.css({"-webkit-transform-origin": "",
                                "-webkit-transform": "",
                                "-moz-transform-origin": "",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
                                "-moz-transform": "",
                                "-ms-transform-origin": "",
                                "-ms-transform": "",
                                "transform-origin": "",
                                "transform": ""});

                    // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4, 載入影像前重設位移及寬高
                    $img.css({position: '', left: '', top: '', width: '', height: ''});
					
					//1120601	Leslie[1120071]	專用於設定頁數資訊
					_setPageInfo(pos);
                    
                    SSOUtil.loading('show', {text:'影像載入中...', textVisible:true});
                    
                    var page = pageGroup.getPage(pos.po); // 2017.4.20
                    
                    that.UNVObj.getPageFile(that.UNVObj.getDoc(0).DocNo, pageGroup, pos.po)
                    .then(function(rslt){
                        _imgLoadDfd = $.Deferred();
                    
                        var $img = _viewPort.find('#uvpgFrontFace .pg > img');

                        // 2018.1.18 - merge 1060406強制式浮水印
                        var $imgTmp = null;
                        var fApplyForceWaterMark = false;
                        if (that.UNVObj.ForceDisplayWaterMark) {
                            fApplyForceWaterMark = true;
                        }

                        if (fApplyForceWaterMark) {
                            $imgTmp = $('<img class="WMImage"></img>');
                        }

                        if ($img.length) {
                            if (!_hasImgLoadEventHandler) {
                                $img.on('load', function(event, ui) {
                                    console.log('頁面影像#' + pos.po + '.on' + event.type + '(' + event.target.naturalWidth + ' x ' + event.target.naturalHeight + ')');
                                    _imgLoadDfd.resolve({success:true, imgData:event.target});
                                
                                    page.imgWidth=event.target.naturalWidth;
                                    page.imgHeight=event.target.naturalHeight;

                                    if (!!$imgTmp && $imgTmp.length) {
                                        delete $imgTmp[0];
                                    }
                                });

                                $img.on('error', function(event, ui) {
                                    _imgLoadDfd.reject({success:false, 'errMsg': '載入頁面影像失敗!'});
                                    if (!!$imgTmp && $imgTmp.length) {
                                        delete $imgTmp[0];
                                    }
                                });
                                _hasImgLoadEventHandler = true;
                            }
                            
                            // 2018.1.18 - Eric, merge 1060406 bug-fix
                            if ($imgTmp!==null && $imgTmp.length) {
                                $imgTmp.on('load', function(event, ui) {
                                    function _onForceWaterMarkDone(rslt) {
                                        $img[0].src = rslt.imgStr;
                                    }

                                    var dpi = parseInt(that.displayDPI);
                                    if (isNaN(dpi)) {
                                        dpi = 300;
                                    }

                                    // 影像套強制式浮水印

                                    // 2020.9.11 - 1090529 Eric, 信保基金浮水印
                                    let _userInfo = null;
                                    if (SSO_CONFIG.OrgNickName=='SMEG') {
                                        _userInfo = { OrgNickName: (SSO_CONFIG.OrgNickName||''), OUName:that.UNVObj.OU_NAME, UserId:that.UNVObj.USER_ID, 
                                              UserTitle:(that.UNVObj.USER_TITLE||''), ClientIP:(that.UNVObj.CLIENT_IP||'')};
                                    }
                                    else {
                                        _userInfo = { OrgNickName: (SSO_CONFIG.OrgNickName||''), OUName:that.UNVObj.OU_NAME, UserName:that.UNVObj.USER_NAME};
										// 1100630 Raymond 1100780 一般機關的文字浮水印新增UserId、UserTitle、ClientIP欄位
										_userInfo.UserId = that.UNVObj.USER_ID;
										_userInfo.UserTitle = (that.UNVObj.USER_TITLE||'');
										_userInfo.ClientIP = (that.UNVObj.CLIENT_IP||'');
                                    }
                                    $imgTmp.watermark({position:'middle-center', className:'WMImage', 
                                                        userInfo: _userInfo,
                                                        path: that.fwmPath, settings: that.fwmSettings, 'dpi': dpi, 
                                                        'theApp': window.theUniView,
                                                        'forceWaterMark' : true,
                                                        callback: _onForceWaterMarkDone
                                    });  
                                });
                            
                                $imgTmp.on('error', function(event, ui) {
                                    _imgLoadDfd.reject({success:false, 'errMsg': '載入頁面影像失敗!'});
                                });
                            }

                            var pageFileInfo = rslt.pageInfo;
                            if (pageFileInfo.url.length) {
                                if (!!$imgTmp && $imgTmp.length) {
                                    $imgTmp[0].src = pageFileInfo.url;
                                }
                                else {
                                    $img[0].src = pageFileInfo.url;
                                }
                            }
                            else if (pageFileInfo.imgData.length) {
                                if (!!$imgTmp && $imgTmp.length) {
                                    $imgTmp[0].src = pageFileInfo.imgData;
                                }
                                else {
                                    $img[0].src = pageFileInfo.imgData;
                                }
                            }
                        }
                        _currPo = pos;
                        return _imgLoadDfd.promise();
                    })
                    .then(function(rslt) {
                        // 2017.4.20 - 應依影像預設寬高調整顯示框!
                        var target = rslt.imgData;
                        var portriat = true;
                        if (target.naturalWidth > target.naturalHeight) {
                            portriat = false;
                        }
                        
                        // 2021.12.15 - 1101330 Eric, 歷史公文頁面可能非A4尺寸
                        let w_page = portriat ? $pg.width() : $pg.height();
                        let h_page = portriat ? $pg.height() : $pg.width();
                        let rc_img = _calcAspectRatioRect({left:0, top:0, right:w_page, bottom:h_page}, target.naturalWidth, target.naturalHeight);
                        let rc_img_mm = _calcAspectRatioRect({left:0, top:0, right:portriat?210:297, bottom:portriat?297:210}, target.naturalWidth, target.naturalHeight);

                        let l_img = 0, t_img = 0, h_img=100.0, w_img = 100.0;
                        let shrinkX = false, shrinkY = false;
                        if (((rc_img.left*100.0)/w_page) > 3.0) {
                            // 影像比頁面窄
                            l_img = (rc_img.left*100.0)/w_page;
                            w_img = 100 - (2 * l_img);
                            shrinkX = true;
                        }
                        else if (((rc_img.top*100.0)/h_page) > 3.0) {
                            // 影像比頁面低
                            t_img = (rc_img.top*100.0)/h_page;
                            h_img = 100 - (2 * t_img);
                            shrinkY = true;
                        }
                        
                        if (!portriat) {
                            // rotate display controls here...
                            $viewPort.addClass('dir_landscape');
                            $img.addClass('ls');
                        }

                        // 2021.12.15 - 1101330 Eric, 歷史公文頁面可能非A4尺寸
                        setTimeout(function() {
                            if (shrinkX) {
                                $pg.css({'background-color':'#EEE'});
                                $img.data({'shrink': 'x', 'wpx': target.naturalWidth, 'hpx': target.naturalHeight});
                                $img.css({position: 'absolute', 
                                          left: rc_img_mm.left.toFixed(2).toString() + 'mm', 
                                          width: (rc_img_mm.right-rc_img_mm.left).toFixed(2).toString() + 'mm', 
                                          top:'', height: (rc_img_mm.bottom-0.1).toFixed(2).toString() + 'mm' });
                            }
                            else if (shrinkY) {
                                $pg.css({'background-color':'#EEE'});
                                $img.data({'shrink': 'y', 'wpx': target.naturalWidth, 'hpx': target.naturalHeight});
                                $img.css({position: 'absolute', 
                                          top: rc_img_mm.top.toFixed(2).toString() + 'mm', 
                                          height: (rc_img_mm.bottom-rc_img_mm.top).toFixed(2).toString() + 'mm', 
                                          left:'', 
                                          width: (rc_img_mm.right-0.1).toFixed(2).toString() + 'mm'});
                            }
                            else {
                                $pg.css({'background-color':''});
                                $img.data({'shrink': '', 'wpx': '', 'hpx': ''});
                                $img.css({position: '', left: '', top: '', width: '', height: ''});
                            }
                        }, 100);

                        SSOUtil.loading('hide');
                    })
                    .fail(function(failRslt) {
                        // 2018.1.18 - Eric, merge bug-fix
                        var _errMsg='';
                        if (typeof failRslt._errMsg=='string' && failRslt._errMsg.length) {
                            _errMsg = failRslt._errMsg;
                        }
                        if (typeof failRslt.errMsg=='string' && failRslt.errMsg.length) {
                            _errMsg = failRslt.errMsg;
                        }
                        theLogger.error('ERROR! UniView.showFiratPage failed. errMsg=' + _errMsg);
                        alert('載入頁面影像失敗, 原因:' + _errMsg)

                        SSOUtil.loading('hide');
                    });
                }
            }
        }
    }
    
    // 2016.12.13 - 點擊文號顯示公文作業選單
    function _onClickDoc() {    
		function closeMenu() {
			$uvScreen.removeClass("in").addClass("ui-screen-hidden");
			$uvListBoxCmd.removeClass("ui-popup-active").addClass("ui-selectmenu-hidden").removeAttr( "style" );
		}
        
        // 2017.1.16 - 須為PC裝置才提供列印功能
        var menuItems = [];
        if ((typeof iOS_device=='undefined') || (typeof iOS_device=='boolean' && iOS_device!==true)) {
            menuItems.push({id:"printFolio", name:"列印公文", vis:"onPrintDocVisible", fn:"onPrintDoc", icon:"arrow-r", chkStat: null});
        }
        else { // 2017.1.17 - iOS device, do nothing, 直接return
            return;
        }
        
        //var fm = $(this).data("model");	// 2016.9.2 讀取此頁籤的FolioModel
        $uvScreen.height( $(document).height() ).removeClass( "ui-screen-hidden" );
        $uvListCmd.empty().filter( ".ui-listview" ).listview( "destroy" );
        
        // 建立點擊文號後出現之選單!
        for(var i=0; i<menuItems.length; i++) {
            var $li = $("<li tabindex='" + i + "'></li>");
            var mi = menuItems[i];
            if(mi.id == "divider") {
                $li.attr("data-role", "divider").attr("data-theme", "b").text(mi.name).appendTo( $uvListCmd );
            }
            else {
                if(typeof mi.vis === "string" && mi.vis.length > 0) {
                    if(uvCmd && mi.vis in uvCmd) {
                        var vis = false;
                        try {
                            vis = true; //nsEditor[mi.vis].call(this, theUniView);	// 2016.12.13 此功能項是否可使用檢核, 目前一律回傳true
                        }
                        catch(e) {
                            theLogger.error(e.message);
                        }
                        if(vis) {
                            $li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a>" + mi.name + "</a>").appendTo( $uvListCmd );
                            // 2016.11.2 icon設定為check的選單項目要特別處理 for 回閱
                            if(mi.icon == "check") {
                                $li.find("a").on("click", {fn: mi.fn}, function(event) {
                                    if(event.data && "fn" in event.data && typeof event.data.fn === "string" && event.data.fn.length > 0) {
                                        if(uvCmd && event.data.fn in uvCmd) {
                                            var evt = $.Event("click", {target: event.target});
                                            evt.data = $home.find("#uvLeftPart .uvViewPort");
                                            var checked = false;
                                            if($(this).hasClass("ui-checkbox-on"))
                                                $(this).addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
                                            else {
                                                $(this).addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
                                                checked = true;
                                            }
                                            try {
                                                uvCmd[event.data.fn].call(this, evt, theUniView, checked);	// 多傳入checked參數
                                            }
                                            catch(e) {
                                                theLogger.error(e.message);
                                            }
                                        }
                                    }
                                });
                            }
                            else {
                                $li.find("a").on("click", {fn: mi.fn}, function(event) {
                                    if(event.data && "fn" in event.data && typeof event.data.fn === "string" && event.data.fn.length > 0) {
                                        if(uvCmd && event.data.fn in uvCmd) {
                                            var evt = $.Event("click", {target: event.target});
                                            evt.data = $uvHome.find("#uvLeftPart .uvViewPort");
                                            closeMenu();	// 關閉選單
                                            try {
                                                uvCmd[event.data.fn].call(this, evt, theUniView);	// 2016.12.13 傳入theUniView參數
                                            }
                                            catch(e) {
                                                theLogger.error(e.message);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        else {
                            theLogger.log("選單項目(id:" + mi.id + ")的vis callback function回傳false, 不顯示該項目");
                        }
                    }
                    else {	// 未掛載onXXXVisible callback function在nsEditor
                        theLogger.warn("未掛載'" + mi.vis + "'在nsEditor命名空間下, 無法建立選單項目");
                        // 2016.5, for DEMO
                        //$li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a>" + mi.name + "</a>").appendTo(list);
                    }
                }
                else {	// 未定義vis callback function name?
                    theLogger.error("未定義選單項目(id:" + mi.id + ")的vis callback function name");
                }
            }
        }
        $uvListCmd.listview();	// 套用選單樣式
        // 2016.11.2 檢核a.ui-icon-check改成ui-check-on/off
        $uvListCmd.find("a.ui-icon-check").each(function(idx, a) {
            $(a).removeClass("ui-btn-icon-right").addClass("ui-btn-icon-left").removeClass("ui-icon-check");
            var cmdid = $(a).parent().attr("id");
            for(var i=0; i<menuItems.length; i++) {
                var mi = menuItems[i];
                if(mi.id == cmdid) {
                    if("chkStat" in mi && typeof mi.chkStat === "string" && mi.chkStat.length > 0) {
                        if(uvCmd && mi.chkStat in uvCmd) {
                            try {
                                var b = uvCmd[mi.chkStat].call(a, theUniView);	// 傳入FolioModel參數
                                if(b)	// 依據chkStat指定的function回傳值決定初始的核取狀態
                                    $(a).addClass("ui-checkbox-on");
                                else
                                    $(a).addClass("ui-checkbox-off");
                            }
                            catch(e) {
                                theLogger.error(e.message);
                            }
                        }
                    }
                    break;
                }
            }
        });
        var t = $(this).offset().top,
            l = $(this).offset().left;
        // 2016.12.16 - Eric
        var homeOffset =$uvHome.offset();
        t -= (homeOffset.top>10)?($uvHome.offset().top-10):0;
        l -= $uvHome.offset().left;
        $uvListBoxCmd.removeClass("ui-selectmenu-hidden").css({left: l+"px", top: t+"px", maxWidth: "200px"});
        //holding = true; //???
        
        $uvScreen.on("tap", function() {
			closeMenu();
		});
    }
    
    function _showDocContent() {
        function _showFirstPage() {
            if (that.UNVObj!==null) {
                var _doc = that.UNVObj.getDoc(0);
                
                /* resolve object: {success, pageInfo}
                 * pageInfo: {index:page.index, 'group': group, url:'', imgData:''};
                 */
                
                SSOUtil.loading('show', {text:'首頁影像載入中...', textVisible:true});

                // 2018.1.18 - merge 1060406強制式浮水印
                var $imgTmp = null;
                if (that.UNVObj.ForceDisplayWaterMark) {
                    $imgTmp = $('<img class="WMImage"></img>');
                }
                
                that.UNVObj.getPageFile(_doc.docNo, _docPageGroups[0], 0)
                .then(function(rslt) {
                    // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4(直/橫式)格式
                    let _dfdImgLoad = $.Deferred();

                    var $img = _viewPort.find('#uvpgFrontFace .pg > img');
                    if ($img.length) {
                        var pageFileInfo = rslt.pageInfo;

                        // 2017.6.19 - merge 1060406, process watermark
                        if (!!that.UNVObj.ForceDisplayWaterMark) {
                            var dpi = parseInt(that.displayDPI);
                            if (isNaN(dpi)) {
                                dpi = 300;
                            }
                            
                            if ($imgTmp!==null && $imgTmp.length) {
                                $imgTmp.on('load', function(event, ui) {
                                    // 2020.9.11 - 1090529 Eric, 信保基金浮水印
                                    let _userInfo = null;
                                    if (SSO_CONFIG.OrgNickName=='SMEG') {
                                        _userInfo = { OrgNickName: (SSO_CONFIG.OrgNickName||''), OUName:that.UNVObj.OU_NAME, UserId:that.UNVObj.USER_ID, 
                                                    UserTitle:(that.UNVObj.USER_TITLE||''), ClientIP:(that.UNVObj.CLIENT_IP||'')};
                                    }
                                    else {
                                        _userInfo = { OrgNickName: (SSO_CONFIG.OrgNickName||''), OUName:that.UNVObj.OU_NAME, UserName:that.UNVObj.USER_NAME};
										// 1100630 Raymond 1100780 一般機關的文字浮水印新增UserId、UserTitle、ClientIP欄位
										_userInfo.UserId = that.UNVObj.USER_ID;
										_userInfo.UserTitle = (that.UNVObj.USER_TITLE||'');
										_userInfo.ClientIP = (that.UNVObj.CLIENT_IP||'');
                                    }

                                    $imgTmp.watermark({position:'middle-center', className:'WMImage', 
                                                        userInfo: _userInfo,
                                                        path:that.fwmPath, settings: that.fwmSettings, 'dpi': dpi, 
                                                        'theApp': theUniView,
                                                        'forceWaterMark' : true,
                                                        callback: function(rslt) {
                                                            if (rslt.success && typeof rslt.imgStr=='string' && rslt.imgStr.length) {
                                                                $img[0].src = rslt.imgStr; //rslt.img.css({'width':'100%'});
                                                                // 記錄首次顯示時, div.pg 的w/h
                                                                if (that.pageOrgWidth==-1 || that.pageOrgHeigth==-1) {
                                                                    setTimeout(function() {
                                                                        var $pg = $('#uniView #uvViewPort > div.uvPages');
                                                                        if ($pg.length) {
                                                                            that.pageOrgWidth = $pg.innerWidth();
                                                                            that.pageOrgHeight = $pg.innerHeight();
                                                                        }
                                                                    }, 200);
                                                                }
                                                                //SSOUtil.loading('hide');
                                                            }
                                                        }
                                    });    
                                });
                                $imgTmp.on('error', function(event, ui){
                                    if (!!$imgTmp && $imgTmp.length) {
                                        delete $imgTmp[0];
                                    }
                                    _dfdImgLoad.reject({success:false, 'errMsg': '載入頁面影像失敗!'});
                                });
                            }
                        }
                        
                        if ($img.length) {
                            $img.on('load', function(event, ui) {
                                console.log('頁面影像#0.on' + event.type + '(' + event.target.naturalWidth + ' x ' + event.target.naturalHeight + ')');
                                _dfdImgLoad.resolve({success:true, imgData:event.target});
                            
                                if (!!$imgTmp && $imgTmp.length) {
                                    delete $imgTmp[0];
                                }
                            });

                            $img.on('error', function(event, ui) {
                                _dfdImgLoad.reject({success:false, 'errMsg': '載入頁面影像失敗!'});
                                if (!!$imgTmp && $imgTmp.length) {
                                    delete $imgTmp[0];
                                }
                            });
                        }

                        if (pageFileInfo.url.length) {
                            if (!!$imgTmp && $imgTmp.length) {
                                $imgTmp[0].src = pageFileInfo.url;
                            }
                            else {
                                $img[0].src = pageFileInfo.url;
                            }
                        }
                        else if (pageFileInfo.imgData.length) {
                            if (!!$imgTmp && $imgTmp.length) {
                                $imgTmp[0].src = pageFileInfo.imgData;
                            }
                            else {
                                $img[0].src = pageFileInfo.imgData;
                            }
                        }
                        
                        // 2017.6.19 - merge 1060406, process watermark
                        // if (!that.UNVObj.ForceDisplayWaterMark) {
                        //     // 記錄首次顯示時, div.pg 的w/h
                        //     if (that.pageOrgWidth==-1 || that.pageOrgHeigth==-1) {
                        //         setTimeout(function() {
                        //             var $pg = $('#uniView #uvViewPort > div.uvPages');
                        //             if ($pg.length) {
                        //                 that.pageOrgWidth = $pg.innerWidth();
                        //                 that.pageOrgHeight = $pg.innerHeight();
                        //             }
                        //         }, 400);
                        //     }
                        //     SSOUtil.loading('hide');
                        // }
                    }
                    return _dfdImgLoad.promise();
                })
                // 2021.12.21 - 1101330
                .then(function(rslt) {
                    let $viewPort = $('#uvISO #uvViewPort');
                    let $pg = $('#uvISO .uvPages #uvpgFrontFace .pg');
                    let $img = _viewPort.find('#uvpgFrontFace .pg > img');

                    // 2017.4.20 - 應依影像預設寬高調整顯示框!
                    var target = rslt.imgData;
                    var portriat = true;
                    if (target.naturalWidth > target.naturalHeight) {
                        portriat = false;
                    }
                    
                    // 2021.12.15 - 1101330 Eric, 歷史公文頁面可能非A4尺寸
                    let w_page = portriat ? $pg.width() : $pg.height();
                    let h_page = portriat ? $pg.height() : $pg.width();
                    let rc_img = _calcAspectRatioRect({left:0, top:0, right:w_page, bottom:h_page}, target.naturalWidth, target.naturalHeight);
                    let rc_img_mm = _calcAspectRatioRect({left:0, top:0, right:(portriat?210:297), bottom:(portriat?297:210)}, target.naturalWidth, target.naturalHeight);
                    let l_img = 0, t_img = 0, h_img=100.0, w_img = 100.0;
                    let shrinkX = false, shrinkY = false;
                    if (((rc_img.left*100.0)/w_page) > 3.0) {
                        // 影像比頁面窄
                        l_img = (rc_img.left*100.0)/w_page;
                        w_img = 100 - (2 * l_img);
                        shrinkX = true;
                    }
                    else if (((rc_img.top*100.0)/h_page) > 3.0) {
                        // 影像比頁面低
                        t_img = (rc_img.top*100.0)/h_page;
                        h_img = 100 - (2 * t_img);
                        shrinkY = true;
                    }
                    
                    if (!portriat && $img.length) {
                        // rotate display controls here...
                        $viewPort.addClass('dir_landscape');
                        $img.addClass('ls');
                    }

                    // 2021.12.15 - 1101330 Eric, 歷史公文頁面可能非A4尺寸
                    setTimeout(function() {
                        if (shrinkX) {
                            $pg.css({'background-color':'#EEE'});
                            $img.data({'shrink': 'x', 'wpx': target.naturalWidth, 'hpx': target.naturalHeight});
                            $img.css({position: 'absolute', 
                                      left: rc_img_mm.left.toFixed(2).toString() + 'mm', 
                                      width: (rc_img_mm.right-rc_img_mm.left).toFixed(2).toString() + 'mm', 
                                      top:'', height: (rc_img_mm.bottom-0.1).toFixed(2).toString() + 'mm' });
                        }
                        else if (shrinkY) {
                            $pg.css({'background-color':'#EEE'});
                            $img.data({'shrink': 'y', 'wpx': target.naturalWidth, 'hpx': target.naturalHeight});
                            $img.css({position: 'absolute', 
                                      top: rc_img_mm.top.toFixed(2).toString() + 'mm', 
                                      height: (rc_img_mm.bottom-rc_img_mm.top).toFixed(2).toString() + 'mm', 
                                      left:'', 
                                      width: (rc_img_mm.right-0.1).toFixed(2).toString() + 'mm'});
                        }
                        else {
                            $pg.css({'background-color':''});
                            $img.data({'shrink': '', 'wpx': '', 'hpx': ''});
                            $img.css({position: '', left: '', top: '', width: '', height: ''});
                        }

                        setTimeout(function() {
                            var $pg = $('#uniView #uvViewPort > div.uvPages');
                            if ($pg.length) {
                                // 記錄首次顯示時, div.pg 的w/h
                                if (that.pageOrgWidth==-1 || that.pageOrgHeigth==-1) {
                                    that.pageOrgWidth = $pg.innerWidth();
                                    that.pageOrgHeight = $pg.innerHeight();
                                }
                            }
							//1120601	Leslie[1120071]	考試院預設為"符合視窗"
							if(SSO_CONFIG.OrgNickName == 'EXAM')
								$('#uvZoomSelect').val(0).selectmenu("refresh").change();
							
                        }, 200);
                    }, 100);

                    SSOUtil.loading('hide');
                })
                .fail(function(failRslt) {
                    // 2018.1.18 - Eric, merge bug-fix
                    var _errMsg='';
                    if (typeof failRslt._errMsg=='string' && failRslt._errMsg.length) {
                        _errMsg = failRslt._errMsg;
                    }
                    if (typeof failRslt.errMsg=='string' && failRslt.errMsg.length) {
                        _errMsg = failRslt.errMsg;
                    }
                    theLogger.error('ERROR! UniView.showFiratPage failed. errMsg=' + _errMsg);
                    alert('載入頁面影像失敗, 原因:' + _errMsg)
                    SSOUtil.loading('hide');
                });
            }
        }
        
        function _buildAttTags(docPageGroups) {
            /*<div class="tags-item tags-item-special" style="">
                    <div class="ui-btn-text">附件一</div>
                    <span class="ui-li-count">10</span>
                    <span class="ui-icon ui-icon-arrow-r"></span>
                </div>*/

            var $tagsGroup = _viewPort.find('.tags .tags-group');
            if ($tagsGroup.length>=3) { // 0:公文基資, 1:本文, 2以後:附件
                var $tagGroupAtt = $($tagsGroup[2]);

                // 2017.8.25 - bug-fix, clear before re-build...
                $tagGroupAtt.find('.tags-item').remove();

                var i=1;
                for(i=1; i<docPageGroups.length; i++) {
                    var pageGroup = docPageGroups[i];
                    var title = pageGroup.getTitle();
                    var sAttTag = '';
					//1131025	Cloud	1120688	註記是否檔案遺失
					var sLostTag = "";
					if (pageGroup.getisFileLost())
						sLostTag = "data-lost=true";
					
					//1080117	Leslie[1071239]	Merge歷史公文之流程檢視
					//if (pageGroup.getSrcFile().length) {
					if (pageGroup.getSrcFile().length || pageGroup.isURLLink()) {
						//1131025	Cloud	1120688	註記是否檔案遺失
						//sAttTag = '<div class="tags-item" title="' + title + '" data-attIdx="' + (i-1).toString() + '" data-grpIdx="' + i.toString() + '"><div class="ui-btn-text">' + title + '</div></div>';
						sAttTag = '<div class="tags-item" '+sLostTag +' title="' + title + '" data-attIdx="' + (i-1).toString() + '" data-grpIdx="' + i.toString() + '"><div class="ui-btn-text">' + title + '</div></div>';
					}
					else {
						//1131025	Cloud	1120688	註記是否檔案遺失
						//sAttTag = '<div class="tags-item" title="' + title + '" data-attIdx="' + (i-1).toString() + '" data-grpIdx="' + i.toString() + '"><div class="ui-btn-text">' + title + '</div>' +
						sAttTag = '<div class="tags-item" '+sLostTag+' title="' + title + '" data-attIdx="' + (i-1).toString() + '" data-grpIdx="' + i.toString() + '"><div class="ui-btn-text">' + title + '</div>' +
							'<span class="ui-li-count">' + pageGroup.getPageCount() + '</span><!--span class="ui-icon ui-icon-arrow-r"></span--></div>';
					}
					
                    $tagGroupAtt.append($(sAttTag));
                }
            }
        }
        
        if (!!that.UNVObj && _docPageGroups.length) {
            // 文號
            var $leftPart = _viewPort.closest('#uvLeftPart');
            if ($leftPart.length) {
                var $liDoc = $leftPart.find('#uvTabBar ul > li:first-child');
                if ($liDoc.length) {
                    var docNo = that.UNVObj.getDoc(0).DocNo;
                    if (typeof docNo=='undefined' || docNo===null || docNo.length===0) { // 2016.12.30 - 新增undefine/null檢核
                        docNo='尚無文號';
                }
                    $liDoc.find('span.ui-btn-text').html(docNo); // 設定文號
                }
                
                $(document).on('click', '#uniView #uvLeftPart #uvTabBar ul > li', _onClickDoc);
            }
            
            // 設定本文title,頁數, 目前顯示active標籤
            var $tagsGroup = _viewPort.find('.tags .tags-group');
            var $tagDocGroup = $($tagsGroup[1]);
            if ($tagDocGroup) {
                $tagDocMainItem = $tagDocGroup.find('.tags-item:first-child');
                $tagDocMainItem.addClass('tags-item-active');
                $tagDocMainItem.attr('title', _docPageGroups[0].getTitle());
                $tagDocMainItem.find('.ui-btn-text').text(_docPageGroups[0].getTitle());
                $tagDocMainItem.find('span.ui-li-count').text('' + _docPageGroups[0].getPageCount());
            }
            //1120601	Leslie[1120071]	設定頁數資訊
			_setPageInfo(_getCurrentPosInfo().currPos);
			
            _buildAttTags(_docPageGroups);
            _showFirstPage();
        }
    }
	
	//1120601	Leslie[1120071]	專用於設定頁數資訊
	function _setPageInfo(pos){
		if(pos != undefined){
			var _pG = _getPageGroupFromPos(pos);
			if(_pG != null)
				$('.uvPageInfo').text(`第${pos.po+1}頁，共${_pG.pageGroup.getPageCount()}頁`);
			else
				$('.uvPageInfo').text('');
		}
		else
			$('.uvPageInfo').text(``);
	}
    
    /* 內嵌於SSO時載入其它公文叫用 */
    function _reload(SAMLart, docId, newPage) {
        var dfd = $.Deferred();

        _clear();
        
        // 2018.1.18 - merge 1060406
        if (!_initDone) {
            _init(SAMLart, docId, newPage)
            .done(function() {
                dfd.resolve({success:true});
            })
            .fail(function(errRslt){
                dfd.reject(errRslt);
            });
        }
        else {
            _loadDoc(SAMLart, docId, false)
            .done(function(){
                if (typeof _obj.showDocContent=='undefined') {
                    _obj.showDocContent = _showDocContent;
                    
                    _obj.getCurrentPosInfo = _getCurrentPosInfo;
                    _obj.showTargetPosPage = _showTargetPosPage;
                    _obj.hasPage = _hasPage;
                     _obj.shouldOpenWithAOL = _shouldOpenWithAOL; // 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容
					_obj.isURLLink = _isURLLink;	//1080117	Leslie[1071239]	Merge歷史公文之流程檢視
					_obj.openWebApp = _openWebApp;
                                
                    _obj.openAttachFile = _openAttachFile;
                    
                    _obj.zoomIn = _zoomIn;
                    _obj.zoomOut = _zoomOut;
                    _obj.zoomToRatio = _zoomToRatio;
                    _obj.zoomToFitMode = _zoomToFitMode;
                    _obj.getDocPageGroup = function() { return _docPageGroups; };
                    
                    _obj.getPageGroupFromPos = _getPageGroupFromPos; // 2017.1.3
                    
                    _obj.getGotoPage = _getGotoPage;
                    
                    if (typeof _standalone==='boolean' && _standalone===true) {
                        _obj._innerObj = that;
                        _obj._currPo = _currPo;
                        _obj._docPageGroups = _docPageGroups;
                        _obj._viewPort = _viewPort;
                    }
                }

                dfd.resolve({success:true});
            })
            .fail(function(errRslt){ // 2018.11 - 1071045
                dfd.reject(errRslt);
            });
        }
        return dfd.promise();
    }
    
    function _close() {
        // 頁面content
        
        // 2017.4.21 - 1060217, 關閉時重設頁面影像顯示UI之設定值!
        //_viewPort.find('#uvpgFrontFace .pg > img').attr('src', '');
        var $viewPort = $('#uvISO #uvViewPort');
        $viewPort.removeClass('dir_landscape');
        $viewPort.css({'transform':''});
        var $img = _viewPort.find('#uvpgFrontFace .pg > img');
        $img.removeClass('ls');
        $img.attr('src', '');
        $img.css({"-webkit-transform-origin": "",
                "-webkit-transform": "",
                "-moz-transform-origin": "",	
                "-moz-transform": "",
                "-ms-transform-origin": "",
                "-ms-transform": "",
                "transform-origin": "",
                "transform": ""});
        
        // 文號
        var $leftPart = _viewPort.closest('#uvLeftPart');
        if ($leftPart.length) {
            var $li1 = $leftPart.find('#uvTabBar ul > li:first-child');
            if ($li1.length) {
                $li1.find('span.ui-btn-text').html(''); // 清空文號
            }
        }
        
        // 右方標簽
        var $tagsGroup = _viewPort.find('.tags .tags-group');
        if ($tagsGroup.length>1) {
            // 本文頁數
            $($tagsGroup[1]).find('.tags-item span.ui-li-count').html('0');
            $($tagsGroup[1]).find('.tags-item:first-child').addClass('tags-item-active');
            $($tagsGroup[1]).find('.tags-item:first-child').attr('title', 'XXXXXXXXXX');
            
            if ($tagsGroup.length>2) {
                // 清除附件tags
                $($tagsGroup[2]).html('');
            }
        }
        
        $('#uniView #uvViewPort > div.uvPages').css('transform', 'none');
        // change select ratio display
        var $select = $('#uniView #uvLeftPart select#uvZoomSelect');
        $select.find('option:first').val(_zoomRatio).text('100%');
        $select.prop('selectedIndex', 0);
        $select.selectmenu('refresh');
        
        _clear();
    }
    
    function _clear() {
        that.docId = '';
        that.UNVObj = null;
        that.docInfoPage = '';
        that.docInfoPageInitFunc = null;

        _memPPD = [];
        
        _currPo.draftIdx = 0;	// 文稿序, 0-based, -1表示公文基資
        _currPo.attIdx = -1;	// 附件序, 0-based, -1表示本文
        _currPo.po = 0;			// 第0頁
        
        _docPageGroups = [];
        
        // 2016.12.12 - 反註冊文號標籤click處理函式
        $(document).off('click tap', '#uniView #uvLeftPart #uvTabBar ul > li', _onClickDoc);
        
        $().css('transform', 'none');
        _zoomRatio = 100;
    }
    
    function _getDocId() {
        if (typeof that.UNVObj == 'object' && that.UNVObj!==null) {
            return that.docId;
        }
        else {
            return '';
        }
    }
    
    function _zoomIn() {
        if (_zoomRatio<that.maxZoomRatio) {
            var newRatio = _zoomRatio+10;
            if (newRatio>that.maxZoomRatio) {
                newRatio = that.maxZoomRatio;
            }
            
            var scale = newRatio / 100.0;
            var cmdScale = 'scale(' + scale + ', ' + scale + ')';
            $('#uniView #uvViewPort').css('transform', cmdScale);
            _zoomRatio = newRatio;
            
            // change select ratio display
            var $select = $('#uniView #uvLeftPart select#uvZoomSelect');
            $select.find('option:first').val(_zoomRatio).text(_zoomRatio + '%');
            $select.prop('selectedIndex', 0);
            $select.selectmenu('refresh');
        }
    }
    
    function _zoomOut() {
        if (_zoomRatio>that.minZoomRatio) {
            var newRatio = _zoomRatio-10;
            if (newRatio<that.minZoomRatio) {
                newRatio = that.minZoomRatio;
            }
            
            var scale = newRatio / 100.0;
            var cmdScale = 'scale(' + scale + ', ' + scale + ')';
            $('#uniView #uvViewPort').css('transform', cmdScale);
            
            _zoomRatio = newRatio;
            
            // change select ratio display
            var $select = $('#uniView #uvLeftPart select#uvZoomSelect');
            $select.find('option:first').val(_zoomRatio).text(_zoomRatio + '%');
            $select.prop('selectedIndex', 0);
            $select.selectmenu('refresh');
        }
    }
    
    function _zoomToRatio(newRatio) {
        if (newRatio<that.minZoomRatio) {
            newRatio = that.minZoomRatio;
        }
        else if (newRatio>that.maxZoomRatio) {
            newRatio = that.maxZoomRatio;
        }
        
        var scale = newRatio / 100.0;
        var cmdScale = 'scale(' + scale + ', ' + scale + ')';
        $('#uniView #uvViewPort').css('transform', cmdScale);
        
        _zoomRatio = newRatio;
    }
    
    function _zoomToFitMode(mode) {
        var newRatio = 100;
        
        var $contentPane = $('#uniView #uvViewPort').closest('.uvContentPane');
        var paneWidth = $contentPane[0].clientWidth;
        var paneHeight =$contentPane[0].clientHeight;
        var ratioW = 1.0, ratioH = 1.0;
        switch(mode) {
        case 0: // 符合視窗
            ratioW = paneWidth / that.pageOrgWidth;
            ratioH = paneHeight / that.pageOrgHeight;
            newRatio  = (ratioW < ratioH) ? Math.floor(ratioW * 100) : Math.floor(ratioH * 100);
            break;
        case -1: // 符合寬度
            ratioW = paneWidth / that.pageOrgWidth;
            newRatio = Math.floor(ratioW * 100);
            break;
        case -2: // 原尺寸
            newRatio = 100;
            break;
        default: return;
        }
        
        if (newRatio>that.maxZoomRatio) {
            newRatio = that.maxZoomRatio;
        }
        else if (newRatio<that.minZoomRatio) {
            newRatio = that.minZoomRatio;
        }
        
        var scale = newRatio / 100.0;
        var cmdScale = 'scale(' + scale + ', ' + scale + ')';
        $('#uniView #uvViewPort').css('transform', cmdScale);
        
        _zoomRatio = newRatio;
    }
    
    function _openAttachFile(groupIdx) {
        var pageGroup = null;
        if (groupIdx>=0 && groupIdx<_docPageGroups.length)
            pageGroup = _docPageGroups[groupIdx];
            
        var filePath='', filename='', attUrl='', attType='';
        var b64Filename='', b64FilePath='';
        if (!!pageGroup && pageGroup.getSrcFile().length) {
            var sAttODToolUrl = '/ODTOOLS/DOCATT.ashx';
        
            filename = pageGroup.getSrcFile();
            filePath = pageGroup.getSrcFilePath();
            b64Filename = Base64.encode(filename);
            b64FilePath = Base64.encode(filePath);
            
            var SAMLart = that.UNVObj.getArtifact();
            var doc = that.UNVObj.getDoc(0);
            var docNo = doc.DocNo;
            //var _url = ODToolUrl + '?FileIOWS=' + wsdlUrl + '&DocNo=' + docNo + '&FilePath=' + b64FilePath + '&FileName=' + b64Filename + '&SAMLart=' + SAMLart;
            attUrl = sAttODToolUrl + '?FileIOWS='+ pageGroup.getSrcWSDLUrl() + '&DocNo=' + docNo + '&FilePath=' + b64FilePath + '&FileName=' + b64Filename + '&SAMLart=' + SAMLart;
            
            filename = filename.toLowerCase();
            if (filename.indexOf('.di')!==-1 || filename.indexOf('.sw')!==-1) {
                attType = 'text/xml';
            }
            var a = window.document.createElement("a");
            $(a).hide();
            a.href = attUrl;
			//1080117	Leslie[1071239]	改由DocAtt決定是否下載
            //a.download = pageGroup.getSrcFile();
            a.target = '_blank';
            if (attType.length) {
                a.type = attType;
            }
            document.body.appendChild(a);
            a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
            document.body.removeChild(a);
            SSOUtil.loading('hide');
        }
    }
	
    // 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容
    function _openHistoryDIWithAOL(groupIdx) {
        var pageGroup = null;
        if (groupIdx>=0 && groupIdx<_docPageGroups.length)
            pageGroup = _docPageGroups[groupIdx];

        let unvObjForPDoc = jQuery.extend(true, {}, that.UNVObj);

        if (window.location.hostname.indexOf('')!=-1 &&
            unvObjForPDoc.UnvRoot.Doc.DocNo=='1072900066') {
            unvObjForPDoc.UnvRoot.Doc.DocNo = '1010111942';
        }

        let _signType = 'P';
        var objViewDoc = {
            UNVObj: unvObjForPDoc,
            docInfoPage:"UniView",
            openDocModule:'AOL',
            signType:_signType,
            readOnlyMode:true,
            HistoryDoc:true, // 107.10.9
        };

        let docNo = '';
        let doc = unvObjForPDoc.UnvRoot.Doc;
        if (typeof doc =='object') {
            if ($.type(doc)=='array' && doc.length) {
                docNo = doc[0].DocNo;
                doc = doc[0];
            }
            else {
                docNo = doc.DocNo;
            }

            let i=0, att = null;
            if ($.type(doc.Att)=='array') {
                for(i=0; i<doc.Att.length; i++) {
                    let _att = doc.Att[i];
                    if (typeof _att=='object' && _att!==null && _att.Type=='99') {
                        let theAtt = jQuery.extend(true, {}, _att);
                        theAtt.Type = '0';
                        doc.Att = theAtt;
                        break;
                    }
                }
            }
            else {
                alert('無效的群組資訊! [開啟歷史公文, Doc.Att內容不為Array]');
                return;
            }
        }
        else {
            alert('無效的公文資訊. [invalid UNVObj.UnvRoot.Doc]');
            return;
        }

        let docId = docNo + '_' + Util.genGUID();
        //alert('Open DocNo:' + docNo + '\'s DI content with AOL...');
        localStorage['viewDoc_out_'+docId] = JSON.stringify(objViewDoc);
        let url = 'RD-ViewDoc.html?Artifact=' + unvObjForPDoc.UnvRoot.Artifact + '&DocId=' + encodeURI(docId);
        let wndDIAOL = window.open(url, '_blank');
    }
	
	//1080117	Leslie[1071239]	Merge歷史公文之流程檢視
	// 2018.6.14 - 1070359, 以獨立分頁方式開啟內政部歷史公文流程明細內容
    function _openWebApp(groupIdx) {
        var pageGroup = null;
        if (groupIdx>=0 && groupIdx<_docPageGroups.length)
            pageGroup = _docPageGroups[groupIdx];

        url = pageGroup.getSrcWSDLUrl();
        let wndFlow = window.open(url, '_blank');
    }
    
    // 2018.1.18 - merge 1060406
    function _getForceWaterMarkSettings(SAMLart, orgNo, forceDisplayWaterMark) {
        var _dfd = $.Deferred();

        if (typeof forceDisplayWaterMark==='boolean' && forceDisplayWaterMark===false) {
            _dfd.resolve({success:true, jsonObj:null});
            return _dfd.promise();
        }

        var _filePath = SSO_CONFIG.getRsrcServerPath('', orgNo);
        var _fileName = 'ForceWaterMark.JSON';
        var _wsUrl = SSO_CONFIG.getWSUrl('fileiows');
        (new WebFileIO(_wsUrl)).download(_filePath, _fileName, {
            success: function(rslt, res) {
                if (typeof rslt=='string' && rslt.length) {
                    var rsltObj = JSON.parse(rslt)
                    if (!!rsltObj) {
                        _dfd.resolve({success:true, jsonObj:rsltObj});	// pass 第2個參數表示影像檔是300dpi, 2016.11.1 直接回傳cbdata參數
                        return;
                    }
                }
                _dfd.reject({success:false, jsonObj:null, errMsg:'無效的ForceWaterMark設定檔內容!\r\nFilePath=' + _filePath + ', FileName=' + _fileName});
            },
            error: function(errorText) {
                _dfd.reject({success:true, jsonObj:null, errMsg:'下載ForceWaterMark設定檔失敗!\r\nFilePath=' + _filePath + ', FileName=' + _fileName});
            }
        });
        return _dfd.promise();
    }

    function _getForceWaterMarkImage(SAMLart, wsUrl, wmfilePath, wmfileName) {
        var _dfd = $.Deferred();
        (new WebFileIO(wsUrl)).download(wmfilePath, wmfileName, {
            success: function(rslt, res) {
                if (typeof rslt=='string' && rslt.length && rslt.indexOf('data:image')!==-1) {
                    _dfd.resolve({success:true, 'imgStr':rslt});
                    return;
                }
                _dfd.reject({success:false, 'imgStr':'', errMsg:'無效的強制式浮水印影像檔內容!\r\nFilePath=' + wmfilePath + ', FileName=' + wmfileName});
            },
            error: function(errorText) {
                _dfd.reject({success:false, 'imgStr':'', errMsg:'下載強制浮水印影像檔失敗! 檔名:' + wmfilePath + '\\' + wmfileName + ' ' + errorText});
            }
        });
        return _dfd.promise();
    }

    var _obj = this;
    function _init(SAMLart, docId, newPage) {
        var _dfd = $.Deferred();

        // 2018.1.18 - merge 1060406 強制式浮水印功能實作!
        if (typeof newPage =='undefined') {
            newPage = false;
        }
        
        if (typeof docId!=='string' || docId.length===0) {
            _dfd.reject({success:false, _errMsg:'docId不可為空字串或未定義!'});
            return _dfd.promise();
        }

        var sLSId = newPage ? 'viewDoc_out_' + docId : 'viewDoc_in_' + docId;
        var sViewDocInfo = localStorage[sLSId];
        
        var viewDocInfo = JSON.parse(sViewDocInfo);
        if (viewDocInfo===null) {
            theLogger.err('Error! invalid viewDocInfo:"' + sViewDocInfo + '"');
            alert('viewDocInfo 內容有誤!');
            _dfd.reject({success:false, _errMsg:'viewDocInfo 內容有誤!'});
            return _dfd.promise();; // 2017.4.7
        }

		//1100325	Leslie[1090869]	無工作站時，隱藏PDF功能鍵
		var docNo = docId.split('_')[0];
		if(!SSO_CONFIG.getIsoConvertURLs() || SSO_CONFIG.getIsoConvertURLs().length <= 0 || (viewDocInfo.docInfoPage == "AKI802" && docNo != viewDocInfo.UNVObj.UnvRoot.Doc.DocNo))
			$('#uvLeftPart #uvBtnExportPDF').hide();

        var forceDisplayWaterMark = false;
        var sOrgNo = '';
        if (typeof viewDocInfo.UNVObj.UnvRoot.ForceDisplayWaterMark=='string' && viewDocInfo.UNVObj.UnvRoot.ForceDisplayWaterMark.length) {
            if (SSOUtil.isValueTrue(viewDocInfo.UNVObj.UnvRoot.ForceDisplayWaterMark)) {
                forceDisplayWaterMark = true;
                sOrgNo = viewDocInfo.UNVObj.UnvRoot.USER_ORGNO; // 2017.7.10 - bug fix.
            }
        }

        if (typeof _debug==='boolean' && !!_debug) {
            forceDisplayWaterMark = true;
        }

        _getForceWaterMarkSettings(SAMLart, sOrgNo, forceDisplayWaterMark)
        .then(function(rslt) {
            var _dfdSub = $.Deferred();

            if (!forceDisplayWaterMark) {
                _dfdSub.resolve({success:true, 'imgStr': ''});
                return _dfdSub.promise();
            }

            if (rslt.success && rslt.jsonObj!==null) {
                that.fwmSettings = rslt.jsonObj;
            }

            // get watermark image
            var filePathname = rslt.jsonObj.ImageFileName;
            var idxLastSlash = filePathname.lastIndexOf('\\');
            var wmfilePath='', wmfileName='';
            if (idxLastSlash!==-1 && idxLastSlash<(filePathname.length-2)) {
                wmfilePath = filePathname.substr(0, idxLastSlash);
                wmfileName = filePathname.substr(idxLastSlash+1);
            }

            if (wmfilePath.length && wmfileName.length) {
                _getForceWaterMarkImage(SAMLart, SSO_CONFIG.getWSUrl('fileiows'), wmfilePath, wmfileName)
                .done(function(rslt){
                    if (typeof rslt.imgStr=='string' && rslt.imgStr.length) {
                        that.fwmPath = rslt.imgStr;
                    }
                    _dfdSub.resolve({success:true, 'imgStr': that.fwmPath});
                })
                .fail(function(rslt){
                    _dfdSub.reject(rslt);
                })
            }
            return _dfdSub.promise();
        })
        .then(function(rslt){
            _initDone = true; // 2018.1.18

            _loadDoc(SAMLart, docId, newPage)
            .done(function(rlst) {
                _obj.showDocContent = _showDocContent;
                
                _obj.getCurrentPosInfo = _getCurrentPosInfo;
                _obj.showTargetPosPage = _showTargetPosPage;
                _obj.hasPage = _hasPage;
				_obj.isURLLink = _isURLLink;	//1080117	Leslie[1071239]	Merge歷史公文之流程檢視
				_obj.openWebApp = _openWebApp;
                            
                _obj.openAttachFile = _openAttachFile;

				// 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容                
				_obj.openHistoryDIWithAOL = _openHistoryDIWithAOL; 
                _obj.openWebApp = _openWebApp;
                _obj.shouldOpenWithAOL = _shouldOpenWithAOL;
                
                _obj.zoomIn = _zoomIn;
                _obj.zoomOut = _zoomOut;
                _obj.zoomToRatio = _zoomToRatio;
                _obj.zoomToFitMode = _zoomToFitMode;
                _obj.getDocPageGroup = function() { return _docPageGroups; };
                
                _obj.getPageGroupFromPos = _getPageGroupFromPos; // 2017.1.3
                
                _obj.getGotoPage = _getGotoPage;
                
                if (typeof _standalone==='boolean' && _standalone===true) {
                    _obj._innerObj = that;
                    _obj._currPo = _currPo;
                    _obj._docPageGroups = _docPageGroups;
                    _obj._viewPort = _viewPort;
                }
                _dfd.resolve({success:true});
            })
            .fail(function(errRslt) {
                _dfd.reject(errRslt);
            });
        })
        .fail(function(errRslt) {
            _dfd.reject(errRslt);
        });
        return _dfd.promise();
    }

    this.init = _init;

    // 2019.10.21 - Eric, bug-fix
    // this.fwmSettings = that.fwmSettings;
    // this.fwmPath = that.fwmPath;

    // 2018.1.18 - merge 1060406
    this.getDisplayDPI = function() {
        return that.displayDPI;
    };
    this.clear = _clear;
    this.getDocId = _getDocId;
    this.reload = _reload;
    this.close = _close;
    this.calcAspectRatioRect = _calcAspectRatioRect;
    return this;

    /*/_loadDoc(SAMLart, docId, newPage)
    //.done(function(rslt){
        this.showDocContent = _showDocContent;
        this.reload = _reload;
        this.clear = _clear;
        this.close = _close;
        
        this.getCurrentPosInfo = _getCurrentPosInfo;
        this.showTargetPosPage = _showTargetPosPage;
        this.hasPage = _hasPage;
        this.getDocId = _getDocId;
        
        this.openAttachFile = _openAttachFile;
        
        //this.getOrgWidth = function() { return that.pageOrgWidth; };
        //this.setOrgPageSize = function(w, h) {
        //    that.pageOrgWidth = w;
        //    that.pageOrgHeight = h;
        //};
        this.zoomIn = _zoomIn;
        this.zoomOut = _zoomOut;
        this.zoomToRatio = _zoomToRatio;
        this.zoomToFitMode = _zoomToFitMode;
        this.getDocPageGroup = function() { return _docPageGroups; };
        
        this.getPageGroupFromPos = _getPageGroupFromPos; // 2017.1.3
        
        this.getGotoPage = _getGotoPage;
        
        if (typeof _standalone==='boolean' && _standalone===true) {
            this._innerObj = that;
            this._currPo = _currPo;
            this._docPageGroups = _docPageGroups;
            this._viewPort = _viewPort;
        }
        return this;    
    }*/
}

(function($) {
    /* 2016.8 - updateEnvelope / signEnvelope 改在 WebFileIO 實作 */
    if (typeof theWebServices ==='object') {
        if (typeof theWebServices.webFileIO == 'undefined') {
            theWebServices.webFileIO = {};
        }
        
        /* 2016.8 - Eric Peng, 取得待檢閱公文的 UNV Object */
		theWebServices.webFileIO.getDocUnvDataByJSON = function(artifact, docNo, orgNo, options) {
            var _dfd = $.Deferred();
            var wsFuncName = 'GetDocUnvDataByJSON';
            var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
            if (!wsUrl || wsUrl.length===0) {
                theLogger.error('-E- FileIOWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                _dfd.reject({success:false, errMsg:'FileIOWS尚未設定服務網址URL'});
                return _dfd.promise();
            }
            
            if (artifact.length===0 || docNo.length===0 || orgNo.length===0) {
                _dfd.reject({success:false, errMsg:'叫用FileIOWS.' + wsFuncName + ', 提供無效的參數值'});
                return _dfd.promise();
            }
            
            var params = new SOAPClientParameters(), res;
            params.add('argArtifact', artifact);
            params.add('argDocNo', docNo);
            params.add('argOrgNo', orgNo);
            
            var async = false;
            if (!!options && (typeof options.async !== 'undefined') && (options.async===true)) {
                async = true;
            }
            
            SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
                function(rslt) {
                    theLogger.log('-I- FileIOWS.' + wsFuncName + ' returns:');
                    theLogger.log(rslt);
                    if (typeof rslt.value === 'object') {
                        res = {};
                        // ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
                        if (rslt.value.m_bSuccess===true) {
                            res.success = true;
                            res.errCode = res.errMsg = '';
                            res.rtnJSON = rslt.value.RtnStr;
                        }
                        else {
                            res.success = false;
                            res.errCode = -1;
                            res.errMsg = rslt.value.m_strErrMsg;
                        }
                    }
                    else {
                        res = {success:false, errMsg:'叫用FileIOWS.' + wsFuncName + ' 時發生錯誤!'};
                    }
                    
                    if (res.success) {
                        _dfd.resolve(res);
                    }
                    else {
                        _dfd.reject(res);
                    }
                });
            return _dfd.promise();
        };
        
        if (typeof theWebServices.odmssp == 'undefined') {
            theWebServices.odmssp = {};
        }
		
		//1131206	Leslie[1130847]	增修調閱要用到的COM_NO、REF_DOC
		// 取得母/子文內容
		var _makeCOMDocObj = function(comDocNode) {
			var comDoc = {};
			var len = comDocNode.childNodes.length;
			for (var i=0; i<len; i++) {
				var node = comDocNode.childNodes[i];
				// nodeType: 1 -> element, 2 -> attribute, 3 -> text, 8 -> comment
				if (node.nodeType==1) {
					comDoc[node.nodeName] = SSOUtil.xml_getNodeValue(node);
				}
			}
			
			if ((typeof comDoc.COM_DOC_NO !== undefined) && !!comDoc.COM_DOC_NO) {
				return comDoc;
			}
			return null;
		};
		
		// 2021.6 - 1080761 Eric, merge 2018.5.14 - 1070298 內政部參考公文!
		function _makeREFDocObj(refDocNode) {
			var refDoc = {};
			var len = refDocNode.childNodes.length;
			for (var i=0; i<len; i++) {
				var node = refDocNode.childNodes[i];
				// nodeType: 1 -> element, 2 -> attribute, 3 -> text, 8 -> comment
				if (node.nodeType==1) {
					refDoc[node.nodeName] = SSOUtil.xml_getNodeValue(node);
				}
			}
			
			if ((typeof refDoc.DOC_NO == 'string') && refDoc.DOC_NO.length) {
				return refDoc;
			}
			return null;
		}
        
        theWebServices.odmssp.getDocumentInfo = function(artifact, docNo, orgNo, options) {
            var _dfd = $.Deferred();
            var wsFuncName = 'GetDocumentInfo2';
            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
            if (!wsUrl || wsUrl.length===0) {
                theLogger.error('-E- WS ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                _dfd.reject({success:false, errMsg:'ODMSSP'});
                return _dfd.promise();
            }
            
            if (artifact.length===0 || docNo.length===0 || orgNo.length===0) {
                _dfd.reject({success:false, errMsg:'叫用ODMSSP.' + wsFuncName + ', 提供無效的參數值'});
                return _dfd.promise();
            }
            
            var params = new SOAPClientParameters(), res;
            params.add('argArtifact', artifact);
            params.add('argSourceOrgNo', orgNo);
            params.add('argDocNo', docNo);
            
            var async = false;
            if (!!options && (typeof options.async !== 'undefined') && (options.async===true)) {
                async = true;
            }
            
            SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                function(rslt) {
                    theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
                    theLogger.log(rslt);
                    if (typeof rslt === 'object') {
                        res = {};
                        // ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
                        if (rslt.m_bSuccess===true) {
                            res.success = true;
                            res.errCode = res.errMsg = '';
                            var odwmsg = $(rslt.m_docToDoList).find('ODWMSG');
                            var _docNo = SSOUtil.xml_getChildNodeValue(odwmsg[0], 'DOC_NO');
                            var _wsdl = SSOUtil.xml_getChildNodeValue(odwmsg[0], 'WEB_SERVICE');
                            var _storagePath = SSOUtil.xml_getChildNodeValue(odwmsg[0], 'STORAGE_PATH');
                            var _subDir = SSOUtil.xml_getChildNodeValue(odwmsg[0], 'SUB_DIR');
                            let _draftSourceType = SSOUtil.xml_getChildNodeValue(odwmsg[0], 'DRAFT_SOURCE_TYPE'); // 2020.10.13 - 1090564

                            // 2021.5 - 1100093 Eric, merge: 2020.12.30 - 1090821, 支援外機關陳核會稿公文
                            var _comeOthers = SSOUtil.xml_getChildNodeValue(odwmsg[0], 'COME_OTHERS');
                            var _orgNoOthers = SSOUtil.xml_getChildNodeValue(odwmsg[0], 'ORGNO_OTHERS');
                            var _sourceOrgNo = SSOUtil.xml_getChildNodeValue(odwmsg[0], 'SOURCE_ORGNO');

							let _DissolveOrgNo = SSOUtil.xml_getChildNodeValue(odwmsg[0], 'DISSOLVE_ORG_NO');//1121121 David 1120941 記錄裁撤機關代碼
							
							//1131206	Leslie[1130847]	增修調閱要用到的COM_NO、REF_DOC
							let _comNo = [];
							let _refDoc = [];
							$(odwmsg[0]).find('COM_NO')?.find('DOC').each(function(i,o){_comNo.push(_makeCOMDocObj(o));})
							$(odwmsg[0]).find('REF_DOC')?.find('DOC').each(function(i,o){_refDoc.push(_makeREFDocObj(o));})
							
							// 1140930 Raymond 中榮序258 新增調閱要用到的SYSID
                            let _sysId = SSOUtil.xml_getChildNodeValue(odwmsg[0], 'SYSID');
                            
                            res.rtnODWMSG = {
                                docNo: _docNo,
                                wsdl: _wsdl,
                                storagePath: _storagePath,
                                subDir: _subDir,
                                draftSourceType: _draftSourceType, // 2020.10.13 - 1090564
                                /* 2021.5 - 1100093 Eric, merge: 2020.12.30 - 1090821, 支援外機關陳核會稿公文*/
                                comeOthers: _comeOthers,
                                orgNoOthers: _orgNoOthers,
                                sourceOrgNo: _sourceOrgNo
								,DissolveOrgNo: _DissolveOrgNo//1121121 David 1120941 記錄裁撤機關代碼
								//1131206	Leslie[1130847]	增修調閱要用到的COM_NO、REF_DOC
								,comNo: _comNo
								,refDoc: _refDoc
								// 1140930 Raymond 中榮序258 新增調閱要用到的SYSID
								,sysId: _sysId
                            };
                        }
                        else {
                            res.success = false;
                            res.errCode = -1;
                            res.errMsg = rslt.m_strErrMsg;
                        }
                    }
                    else {
                        res = {success:false, errMsg:'叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!'};
                    }
                    
                    if (res.success) {
                        _dfd.resolve(res);
                    }
                    else {
                        _dfd.reject(res);
                    }
                });
            return _dfd.promise();
        };
    }
    
    var docId = '';
    var mode = 'in';
    var SAMLart = ''; // 2016.12.13 - 
    
    // 取網址參數SAMLart為Artifact
    var parameter='', params='';
    if (typeof _standalone==='boolean' && _standalone===true) {
		//1140723	Leslie[1141011]	弱掃修正[Prototype Pollution]
        // // 取網址參數SAMLart為Artifact
        // parameter = window.location.search;
		// params = SSOUtil.parseUrlParam(parameter);
        
        // if (params.SAMLart.length && (params.SAMLart.indexOf('xxxxxx_')==-1)) {
            // SAMLart = params.SAMLart;
        // }
        // else {
            // SAMLart = localStorage.Artifact;
        // }
        
        // if (typeof params.docId !== 'undefined' && params.docId.length) {
            // docId = params.docId;
        // }
        // else  {
            // docId = 'test';
        // }
        
        // /* ODT130 UNVObj sample
         // * sUNVObj = '{"UnvRoot":{"Version":"3.4","Artifact":"","User_OrgNo":"A21020000I","WSDLurl":"http://APODSSO.FDA.GOV.TW/ak/AKI500WS.asmx","WSDLurl2":"http://APODSSO.FDA.GOV.TW/ak/Template/Lib/SYS.asmx","OU_ID":null,"OU_NAME":null,"USER_ID":null,"USER_NAME":null,"ForceWaterMark":"FALSE","EnableSaveFile":"FALSE","EnableEditFile":"FALSE","EnablePrintFile":"TRUE","EnablePrintScreen":"FALSE","Doc":{"Subject":"UniView測試公文，勿動","SourceOrgNo":"A21020000I","DocNo":"1050000134","Att":[{"Type":"1","Alias":"正本影像檔(本文)","PrintEnable":"TRUE","File":[{"Pages":"1","FileName":"R.0001","FilePath":"D:\\\\FILESRV_DATA\\\\SAVE\\\\ARCHIVE\\\\10508\\\\105081013242201\\\\R\\\\","WSDL":"HTTP://DOCFILE.FDAT.COM.TW/webfileio/T2100FileIoService.asmx"},{"Pages":"1","FileName":"R.0002","FilePath":"D:\\\\FILESRV_DATA\\\\SAVE\\\\ARCHIVE\\\\10508\\\\105081013242201\\\\R\\\\","WSDL":"HTTP://DOCFILE.FDAT.COM.TW/webfileio/T2100FileIoService.asmx"},{"Pages":"1","FileName":"R.0003","FilePath":"D:\\\\FILESRV_DATA\\\\SAVE\\\\ARCHIVE\\\\10508\\\\105081013242201\\\\R\\\\","WSDL":"HTTP://DOCFILE.FDAT.COM.TW/webfileio/T2100FileIoService.asmx"}],"Group":{"GrpName":null,"StartPO":"0"}},{"Type":"0","Alias":"A51020000P0000000_0001-1.pdf","PrintEnable":"TRUE","File":{"Pages":"1","FileName":"A51020000P0000000_0001-1.pdf","FilePath":"D:\\\\FILESRV_DATA\\\\SAVE\\\\ARCHIVE\\\\10508\\\\105081013242201\\\\R\\\\","WSDL":"HTTP://DOCFILE.FDAT.COM.TW/webfileio/T2100FileIoService.asmx"},"Group":{"GrpName":null}},{"Type":"0","Alias":"rpdtest4-A2.pdf","PrintEnable":"TRUE","File":{"Pages":"1","FileName":"rpdtest4-A2.pdf","FilePath":"D:\\\\FILESRV_DATA\\\\SAVE\\\\ARCHIVE\\\\10508\\\\105081013242201\\\\R\\\\","WSDL":"HTTP://DOCFILE.FDAT.COM.TW/webfileio/T2100FileIoService.asmx"},"Group":{"GrpName":null}}]}}}';
         // */
        
        // var orgNo = 'A21020000I';
        // var docNo = '1051402454';
        
        // var wsUrl = SSO_CONFIG.WS_URLs.fileiows;
        // var failure = false;
        
        // window.uniView = null;
        // window.viewDocInfo = null;
        
        // promise = theWebServices.webFileIO.getDocUnvDataByJSON(SAMLart, docNo, orgNo, {async:false, url:wsUrl});
        // promise.done(function(rslt){
            // var sUNVObj = rslt.rtnJSON;
            // var viewDocInfo = {};
            // if (!!sUNVObj && sUNVObj.length) {
                // viewDocInfo.UNVObj = JSON.parse(sUNVObj);
            // }
        
            // if (viewDocInfo.UNVObj===null) return;
            
            // viewDocInfo.docInfoPage = 'AKI802';
            // viewDocInfo.openDocModule = 'Auto';
            // viewDocInfo.readOnlyMode = true;
            // localStorage['viewDoc_out_' + docId] = JSON.stringify(viewDocInfo);
                    
            // /* 測紙本歸檔掃描
            // //sUNVObj2 = '{"UnvRoot":{"Version":"3.4","Artifact":"19fa36bd-5bed-40f3-9627-01ed41b0e9c3","User_OrgNo":"301060000C","WSDLurl":"http://SYS2013/ak/AKI500WS.asmx","WSDLurl2":"http://SYS2013/ak/Template/Lib/asmx","OU_ID":"04","OU_NAME":"政風室","USER_ID":"2100","USER_NAME":"二一零零","ForceWaterMark":"True","ForceDisplayWaterMark":"TRUE","EnableSaveFile":"TRUE","EnableEditFile":"TRUE","EnablePrintFile":"TRUE","EnablePrintScreen":"FALSE","EraseMode":"0","Doc":{"Subject":"testest","SourceOrgNo":"301060000C","DocNo":"1000000427","Att":{"Type":"6","Alias":"正版影像","PrintEnable":"TRUE","File":{"Pages":"3","FileName":"1000000427O.XML","FilePath":"D:\\\\FILESRV_DATA\\\\SRV_FT\\\\SRV1\\\\TO1\\\\1010511\\\\1000000427\\\\","WSDL":"https://SYS2013/WebFileIo/T2100FileIOService.asmx"},"SaveAsPDF":{"WSDL":"https://SYS2013/WebFileIo/T2100FileIOService.asmx","FilePath":"C:\\\\TEMP\\\\"},"Group":{"GrpName":"本文","StartPO":"0"}}}}}';
            // //window.theUNVObj2 = new UNVObj(sUNVObj2);
            // //theUNVObj2.dev_setArtiface(localStorage.Artifact);
            // //_uvDocPageGroups1 = theUNVObj2.getDocPageGroups(0);
            // */
            
            // failure = false;
        // })
        // .fail(function(rslt) {
            // alert('invoke getDocUnvDataByJSON() failed. errMsg=' + rslt._errMsg);
            // failure = true;
        // });
		//1140723	Leslie[1141011]	弱掃修正[Prototype Pollution]，停用測試程式碼	==END==
    }
    
    $(document).on('pagecreate', '#uniView', function(event, ui) {
        if (typeof event.target ==='object') {
            if ($(event.target).attr('id')!=='uniView') {
                return;
            }
        }
        
        // 取網址參數SAMLart為Artifact
        var parameter = window.location.search;
		var params = SSOUtil.parseUrlParam(parameter);
        if (typeof params=='object' && typeof params.SAMLart=='string' && params.SAMLart.length && (params.SAMLart.indexOf('xxxxxx_')==-1)) {
            SAMLart = params.SAMLart;
        }
        else {
            SAMLart = localStorage.Artifact;
        }
        
        var $viewPort = $('#uniView .uvViewPort');
        
        if (typeof ui!=='undefined' && ui!==null) {
            if (typeof ui.mode!=='undefined' && ui.mode.length) {
                mode = ui.mode;
            }
            if (typeof ui.docId!=='undefined' && ui.docId.length) {
                docId = ui.docId;
            }
        }
        
        // 2016.2.26 調整viewPort的container(.contentPane)為視窗高度減2個header高度(for iPad Pro滿版顯示)
        function refreshDimension() {
            if (typeof _standalone==='boolean' && _standalone===true) {
                $viewPort.closest('.ui-mobile').css('overflow', 'hidden');
                $('div.wrapper').css('height', window.innerHeight + 'px');
            }
            
            var h_all = $('#uniView').parent().height();
            var h_title = $('#uniView .top_tool_bar').outerHeight();
            
            theLogger.log('uniViewRefreshDimension(), window h="' + h_all + '", title h="' + h_title + '"');
                        
            var hContentPane = h_all - h_title;
            $viewPort.parent().css("height", '' + hContentPane + 'px');
            $viewPort.closest('.ui-tabs-content').find('#uvSideBar').css('height', '' + hContentPane + 'px');
        }
    
        theLogger.log('UniView.pagecreate event, gonna invoke uniViewRefreshDimension()...');
        refreshDimension();
        
        window.uniViewRefreshDimension = refreshDimension;
        
        if (typeof _standalone==='boolean' && _standalone===true) {
            var sViewDocInfo = localStorage['viewDoc_' + mode + '_' + docId];
            var _viewDocInfo = null;
            if (typeof sViewDocInfo!=='undefined' && sViewDocInfo.length) {
                viewDocInfo = JSON.parse(sViewDocInfo);
            }
            
            window.viewDocInfo = _viewDocInfo;
            
            if (!!window.viewDocInfo) {
                var _UNVObj = new UNVObj(window.viewDocInfo.UNVObj);
                viewDocInfo.UNVObj = _UNVObj;
                viewDocInfo.docPageGroups = _UNVObj.getDocPageGroups(0);
                
                var docNo = viewDocInfo.UNVObj.getDoc(0).DocNo;
                
                viewDocInfo.UNVObj.getPageFile(docNo, viewDocInfo.docPageGroups[0], 0)
                .done(function(rslt){
                    // rslt: { success, pageInfo: pageFileInfo }
                    // pageFileInfo: {'index':page.index, 'group': group, 'url':_url, 'srcData':''};
                    
                    var pageFileInfo = rslt.pageInfo;
                    theLogger.log('-I- pageFileInfo: index=' + pageFileInfo.index + ', group="' + pageFileInfo.group.getTitle() + '", url=' + pageFileInfo.url);
                    
                    if (!!pageFileInfo && pageFileInfo.url.length) {
                        var $img = $('#uvViewPort #uvpgFrontFace .pg > img');
                        if ($img.length) {
                            $img[0].src=pageFileInfo.url;
                        }
                    }
                })
                .fail(function(rslt){
                    alert('UNVObj.getPageFile() failed. errMsg=' + rslt._errMsg);
                });   
            }
        }
        
        // 2014.8.25 - Raymond, 外掛移至頁籤處理完再套用, 否則參照檢視功能會出錯
        var _viewPort = $viewPort;	// viewPort元素
        _viewPort.find(".pages").flip({ctx: this.flipCtx});
        
        /* 切換頁面 */
        // 2019.9.16 - 1080339 Eric
        $('#uniView a.uvBtnFlipLeft').on('click', function() {
            // 上一頁
            var currPosInfo = theUniView.getCurrentPosInfo();
            if (!!currPosInfo.previousPos) {
                SSOUtil.loading('show');
                
                theUniView.showTargetPosPage(currPosInfo.previousPos);
                
                var _attIdx = currPosInfo.previousPos.attIdx;
                
                // 設定右方標簽 acitve提示
                _viewPort.find('.tags .tags-group .tags-item').removeClass('tags-item-active');
                var $tagsGroup = _viewPort.find('.tags .tags-group');
                if ($tagsGroup.length>1) {
                    if (_attIdx==-1) { // 本文
                        $($tagsGroup[1]).find('.tags-item:first-child').addClass('tags-item-active');
                    }
                    else { // 附件
                        var $tagItems = $($tagsGroup[2]).find('.tags-item');
                        if (_attIdx<$tagItems.length) {
                            $($tagItems[_attIdx]).addClass('tags-item-active');
                        }
                    }
                }
                // 2020.10.13 - Eric, bug-fix
                //SSOUtil.loading('hide');
            }
            else {
                alert('已無前頁');
            }
        });
        
        // 2019.9.16 - 1080339 Eric
        $('#uniView a.uvBtnFlipRight').on('click', function(){
            // 下一頁
            var currPosInfo = theUniView.getCurrentPosInfo();
            if (!!currPosInfo.nextPos) {
                SSOUtil.loading('show');
                theUniView.showTargetPosPage(currPosInfo.nextPos);
                
                var _attIdx = currPosInfo.nextPos.attIdx;
                
                // 設定右方標簽 acitve提示
                _viewPort.find('.tags .tags-group .tags-item').removeClass('tags-item-active');
                var $tagsGroup = _viewPort.find('.tags .tags-group');
                if ($tagsGroup.length>1) {
                    if (_attIdx==-1) { // 本文
                        $($tagsGroup[1]).find('.tags-item:first-child').addClass('tags-item-active');
                    }
                    else { // 附件
                        var $tagItems = $($tagsGroup[2]).find('.tags-item');
                        if (_attIdx<$tagItems.length) {
                            $($tagItems[_attIdx]).addClass('tags-item-active');
                        }
                    }
                }
                // 2020.10.13 - Eric, bug-fix
                //SSOUtil.loading('hide');
            }
            else {
                alert('已無次頁');
            }
        });
        
        /* 縮放頁面顯示 */
        $('#uniView #uvZoomControl #uvZoomOut').on('click', function(){
            if (typeof theUniView=='object' && theUniView.getDocId().length) {
                theUniView.zoomOut();
            }
        });
        
        $('#uniView #uvZoomControl #uvZoomIn').on('click', function(){
            if (typeof theUniView=='object' && theUniView.getDocId().length) {
                theUniView.zoomIn();
            }
        });
        
        $(document).on('change', '#uniView #uvLeftPart select#uvZoomSelect', function(event) {
            if (typeof theUniView!='object' || theUniView.getDocId().length===0) {
                return;
            }
            
            // 顯示select 選單
            var $select = $('#uniView #uvLeftPart select#uvZoomSelect');
            if ($select.length) {
                var selectedIdx = event.target.selectedIndex;
                var $options = $select.find('option');
                var sValue = $($options[selectedIdx]).val();
                var value = parseInt(sValue);
                switch(value) {
                case 0:
                case -1:
                case -2: theUniView.zoomToFitMode(value); break;
                default:
                    theUniView.zoomToRatio(value); break;
                }
            }
        });
        
        
        // 切換頁面群組
        $(document).on('click', '#uniView .tags-item', function(event) {
			//1131025 Cloud 1120688 增加判斷檔案是否遺失
			if($(event.currentTarget).attr('data-lost')!=undefined)
			{
				alert('檔案'+$(event.currentTarget).attr('title')+'已遺失，無法開啟。');
				return;
			}
            SSOUtil.loading('show');
            var sAttIdx = $(event.currentTarget).attr('data-attIdx');
            var sGrpIdx = $(event.currentTarget).attr('data-grpIdx');
            var attIdx = parseInt(sAttIdx);
            var grpIdx = -1;
            if (typeof sGrpIdx=='string' && sGrpIdx.length) {
                grpIdx = parseInt(sGrpIdx);
                if (isNaN(grpIdx)) {
                    grpIdx = -1;
                }
            }
            
            var pageGroup = null;
            
            if (grpIdx>=0) {
                var isPageGroup = theUniView.hasPage(grpIdx);
                if (!isPageGroup) {
					// 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容
                    let isOpenWithAOL = theUniView.shouldOpenWithAOL(grpIdx);
					//1080117	Leslie[1071239]	Merge歷史公文之流程檢視
					let isURLLink = theUniView.isURLLink(grpIdx);
					// 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容
					if (isOpenWithAOL) {
                        theUniView.openHistoryDIWithAOL(grpIdx);
                        SSOUtil.loading('hide');
                        return;
                    }
                    else if (isURLLink) {
                        theUniView.openWebApp(grpIdx);
                        SSOUtil.loading('hide');
                        return;
                    }
                    else {
                    // 開啟原始檔
                    theUniView.openAttachFile(grpIdx);
					SSOUtil.loading('hide');
                    return;
					}
                }
            }
            
            var newPos = null;
            if (attIdx==-1) {
                newPos = {
                    draftIdx: 0,
                    attIdx: -1,
                    po: 0,
                };
            }
            else {
                newPos = {
                    draftIdx: 0,
                    attIdx: attIdx,
                    po: 0,
                };
            }
            
            if (!!newPos) {
                theUniView.showTargetPosPage(newPos);
                
                setTimeout(function(){
                    var _attIdx = newPos.attIdx;
                    
                    // 設定右方標簽 acitve提示
                    _viewPort.find('.tags .tags-group .tags-item').removeClass('tags-item-active');
                    var $tagsGroup = _viewPort.find('.tags .tags-group');
                    if ($tagsGroup.length>1) {
                        if (_attIdx==-1) { // 本文
                            $($tagsGroup[1]).find('.tags-item:first-child').addClass('tags-item-active');
                        }
                        else { // 附件
                            var $tagItems = $($tagsGroup[2]).find('.tags-item');
                            if (_attIdx<$tagItems.length) {
                                $($tagItems[_attIdx]).addClass('tags-item-active');
                            }
                        }
                    }
                    SSOUtil.loading('hide');
                }, 100);
            }
        });
        
        $('#uvLeftPart #uvBtnGoToFirstPage').on('click', function() {
            var currPosInfo = theUniView.getCurrentPosInfo();
            var _currPos = currPosInfo.currPos;
            var pageGroupInfo = theUniView.getPageGroupFromPos(_currPos);
            // {idx:0, pageGroup:_docPageGroups[0]};
            if (!!pageGroupInfo) {
                if (_currPos.po>0) {
                    var _newPos = {
                        draftIdx: _currPos.draftIdx, // 目前只支援一份公文, 故 draftIdx=-1 => 基資, 0:公文頁面
                        attIdx: _currPos.attIdx,
                        po: 0 };
                    theUniView.showTargetPosPage(_newPos);
                }
            }
        });
        
        $('#uvLeftPart #uvBtnGoToLastPage').on('click', function() {
            var currPosInfo = theUniView.getCurrentPosInfo();
            var _currPos = currPosInfo.currPos;
            var pageGroupInfo = theUniView.getPageGroupFromPos(_currPos);
            
            if (!!pageGroupInfo) {
                var cntPage = pageGroupInfo.pageGroup.getPageCount();
                if (_currPos.po<(cntPage-1)) {
                    var _newPos = {
                        draftIdx: _currPos.draftIdx, // 目前只支援一份公文, 故 draftIdx=-1 => 基資, 0:公文頁面
                        attIdx: _currPos.attIdx,
                        po: (cntPage-1) };
                    theUniView.showTargetPosPage(_newPos);
                }
            }
        });
        
        /* 2017.1.3 - 跳頁 button */
        $('#uvLeftPart #uvBtnGoToPage').on('click', function() {
            var currPosInfo = theUniView.getCurrentPosInfo();
            var currPos = currPosInfo.currPos;
            
            var pageGroupInfo = theUniView.getPageGroupFromPos(currPos);
            // {idx:0, pageGroup:_docPageGroups[0]};
            if (!!pageGroupInfo) {
                theUniView.getGotoPage(theUniView, currPos, pageGroupInfo)
                .done(function(rslt){
                    if (typeof rslt=='object' && typeof rslt.success=='boolean' && rslt.success===true) {
                        if (typeof rslt.newPos!='undefined' && rslt.newPos!==null) {
                            theUniView.showTargetPosPage(rslt.newPos);
                        }
                    }
                })
                .fail(function(rslt) {
                });
            }
        });

        // 2021.12.22 - 1101330 Eric, util ffunction for rotate
        function _getRotateCSS(degree, imgElementWidth, imgElementHeight, shrink, shrinkOffset) {
            let cssSet = null;
            if (degree<0) {
                degree += 360;    
            }

            if (degree==0) {
                cssSet = {
                    "-webkit-transform-origin": "",
                    "-webkit-transform": "",
                    "-moz-transform-origin": "",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
                    "-moz-transform": "",
                    "-ms-transform-origin": "",
                    "-ms-transform": "",
                    "transform-origin": "",
                    "transform": ""
                };

                if (shrink=='x' && typeof shrinkOffset=='number') {
                    cssSet.left = shrinkOffset.toFixed(2).toString() + 'mm';
                    cssSet.top = '';
                }
                else if (shrink=='y' && typeof shrinkOffset=='number') {
                    cssSet.top = shrinkOffset.toFixed(2).toString() + 'mm';
                    cssSet.left = '';
                }
            }
            else if (degree==90 || degree==180 || degree==270) {
                if (typeof imgElementWidth=='number' && typeof imgElementHeight=='number') {
                    let cx = 0, cy = 0;
                    let shiftDir = '', unShiftDir = '';
                    if (degree==90) {
                        cy = imgElementHeight;
                        if (shrink=='x' && typeof shrinkOffset=='number') {
                            shiftDir = 'top'; unShiftDir = 'left';
                        }
                        else if (shrink=='y' && typeof shrinkOffset=='number') {
                            shiftDir = 'left'; unShiftDir = 'top';
                        }
                    }
                    else if (degree==180) {
                        cx = imgElementWidth;
                        cy = imgElementHeight;
                        if (shrink=='x' && typeof shrinkOffset=='number') {
                            shiftDir = 'left'; unShiftDir = 'top';
                        }
                        else if (shrink=='y' && typeof shrinkOffset=='number') {
                            shiftDir = 'top'; unShiftDir = 'left';
                        }
                    }
                    else if (degree==270) {
                        cx = imgElementWidth;
                        if (shrink=='x' && typeof shrinkOffset=='number') {
                            shiftDir = 'top'; unShiftDir = 'left';
                        }
                        else if (shrink=='y' && typeof shrinkOffset=='number') {
                            shiftDir = 'left'; unShiftDir = 'top';
                        }
                    }
                    cssSet = {
                        "-webkit-transform-origin": "left top",
                        "-webkit-transform": "rotate(" + degree + "deg) scale(1.0) translate(-" + cx + "px, -" + cy + "px)",
                        "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
                        "-moz-transform": "rotate(" + degree + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)",
                        "-ms-transform-origin": "left top",
                        "-ms-transform": "rotate(" + degree + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)",
                        "transform-origin": "left top",
                        "transform": "rotate(" + degree + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)"
                    };

                    if (shiftDir!=='' && unShiftDir!=='') {
                        cssSet[shiftDir] = shrinkOffset.toFixed(2).toString() + 'mm';
                        cssSet[unShiftDir] = '';
                    }
                }
            }
            return cssSet;
        }
        
        /* 2017.2.20 - 向右旋轉90度 button */
        $('#uvLeftPart #uvBtnRotateRight').on('click', function() {
            var $viewPort = $('#uvISO #uvViewPort');
            var $pg = $('#uvISO .uvPages #uvpgFrontFace .pg');
            var $img = $pg.find('img');
            
            var pgo = $img.data("pgo");
            var cx = $img.width();
            var cy = $img.height();
            
            var imgCls = $img.attr('class');
            var isLSImg = (typeof imgCls=='string' && imgCls.indexOf('ls')>=0) ? true : false;

            // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4, 旋轉時須計算額外的位置及寛高資訊.
            let cxpg = $pg.width();
            let cypg = $pg.height();
            let shrink = $img.data('shrink');
            let rc_pane_mm=null, rc_img_mm=null, rc_pane_px=null, rc_img_px=null;
            let shiftOffset = 0;
            if (typeof shrink=='string' && (shrink=='x'||shrink=='y')) {
                let srcImgWidth = $img.data('wpx');
                let srcImgHeight = $img.data('hpx');
                rc_pane_mm = {left:0, top:0, right:isLSImg?297:210, bottom: isLSImg?210:297};
                rc_img_mm = theUniView.calcAspectRatioRect(rc_pane_mm, srcImgWidth, srcImgHeight);
                if (shrink=='x') {
                    shiftOffset = rc_img_mm.left;
                }
                else if (shrink=='y') {
                    shiftOffset = rc_img_mm.top;
                }

                rc_pane_px = {left:0, top:0, right:cxpg, bottom: cypg};
                rc_img_px = theUniView.calcAspectRatioRect({left:0, top:0, right:cxpg, bottom: cypg}, srcImgWidth, srcImgHeight);
            }
            
            if (pgo && "rotate" in pgo) {
                if (rc_img_mm!==null) {
                    console.log('current rotate:' + pgo.rotate + ', rc_img_mm = { l:' + rc_img_mm.left.toFixed(2).toString() + ', t:' + 
                    rc_img_mm.top.toFixed(2).toString() + ', r:' + rc_img_mm.right.toFixed(2).toString() + ', b:' + rc_img_mm.bottom.toFixed(2).toString() + '}');
                }

                pgo.rotate += 90;

                // 2021.12.22 - 1101330 Eric
                let cssSet = _getRotateCSS(pgo.rotate==360?0:pgo.rotate, cx, cy, shrink, shiftOffset);
                if (cssSet!==null) {
                    console.log('cssSet=' + JSON.stringify(cssSet));
                }

                if(pgo.rotate == 90) {
                    if (!isLSImg) {
                        $viewPort.addClass('dir_landscape');
                    }
                    else {
                        $viewPort.removeClass('dir_landscape');
                    }

                    // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4
                    if (cssSet!==null) {
                        $pg.find("img").css(cssSet);
                    }
                }
                else if(pgo.rotate == 180) {
                    if (!isLSImg) {
                        $viewPort.removeClass('dir_landscape');
                    }
                    else {
                        $viewPort.addClass('dir_landscape');
                    }

                    // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4
                    if (cssSet!==null) {
                        $pg.find("img").css(cssSet);
                    }
                }
                else if(pgo.rotate == 270) {
                    if (!isLSImg) {
                        $viewPort.addClass('dir_landscape');
                    }
                    else {
                        $viewPort.removeClass('dir_landscape');
                    }

                    // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4
                    if (cssSet!==null) {
                        $pg.find("img").css(cssSet);
                    }
                }
                else {
                    if (!isLSImg) {
                        $viewPort.removeClass('dir_landscape');
                    }
                    else {
                        $viewPort.addClass('dir_landscape');
                    }

                    // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4
                    pgo.rotate = 0;
                    if (cssSet!==null) {
                        $pg.find("img").css(cssSet);
                    }
                }
            }
            else {
                if (rc_img_mm!==null) {
                    console.log('current NOT rotated, rc_img_mm = { l:' + rc_img_mm.left.toFixed(2).toString() + ', t:' + 
                                rc_img_mm.top.toFixed(2).toString() + ', r:' + rc_img_mm.right.toFixed(2).toString() + ', b:' + rc_img_mm.bottom.toFixed(2).toString() + '}');
                }
                
                if (!isLSImg) {
                    $viewPort.addClass('dir_landscape');
                }
                else {
                    $viewPort.removeClass('dir_landscape');
                    //$img.removeClass('dir_landscape');
                }

                // 2021.12.22 - 1101330 Eric
                let cssSet = _getRotateCSS(90, cx, cy, shrink, shiftOffset);
                if (cssSet!==null) {
                    console.log('cssSet=' + JSON.stringify(cssSet));
                }

                // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4
                if (cssSet!==null) {
                    $pg.find("img").css(cssSet);
                }

                if (typeof pgo=='undefined' || pgo===null) {
                    pgo = { rotate: 0};
                    $pg.find("img").data("pgo", pgo);
                }
                
                if(pgo) {
                    pgo.rotate = 90;
                }
            }
        });
        
        /* 2017.2.20 - 向左旋轉90度 button */
        $('#uvLeftPart #uvBtnRotateLeft').on('click', function() {
            var $viewPort = $('#uvISO #uvViewPort');
            var $pg = $('#uvISO .uvPages #uvpgFrontFace .pg');
            var $img = $pg.find('img');
            
            var pgo = $img.data("pgo");
            var cx = $img.width();
            var cy = $img.height();
            
            var imgCls = $img.attr('class');
            var isLSImg = (typeof imgCls=='string' && imgCls.indexOf('ls')>=0) ? true : false;
            
            // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4, 旋轉時須計算額外的位置及寛高資訊.
            let cxpg = $pg.width();
            let cypg = $pg.height();
            let shrink = $img.data('shrink');
            let rc_pane_mm=null, rc_img_mm=null, rc_pane_px=null, rc_img_px=null;
            let shiftOffset = 0;
            if (typeof shrink=='string' && (shrink=='x'||shrink=='y')) {
                let srcImgWidth = $img.data('wpx');
                let srcImgHeight = $img.data('hpx');
                rc_pane_mm = {left:0, top:0, right:isLSImg?297:210, bottom: isLSImg?210:297};
                rc_img_mm = theUniView.calcAspectRatioRect(rc_pane_mm, srcImgWidth, srcImgHeight);
                if (shrink=='x') {
                    shiftOffset = rc_img_mm.left;
                }
                else if (shrink=='y') {
                    shiftOffset = rc_img_mm.top;
                }

                rc_pane_px = {left:0, top:0, right:cxpg, bottom: cypg};
                rc_img_px = theUniView.calcAspectRatioRect({left:0, top:0, right:cxpg, bottom: cypg}, srcImgWidth, srcImgHeight);
            }

            if (pgo && "rotate" in pgo) {
                pgo.rotate -= 90;

                // 2021.12.22 - 1101330 Eric
                let cssSet = _getRotateCSS(pgo.rotate==-360?0:pgo.rotate, cx, cy, shrink, shiftOffset);
                if (cssSet!==null) {
                    console.log('cssSet=' + JSON.stringify(cssSet));
                }

                if(pgo.rotate === 0) {
                    if (!isLSImg) {
                        $viewPort.removeClass('dir_landscape');
                    }
                    else {
                        $viewPort.addClass('dir_landscape');
                    }
                    
                    // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4
                    if (cssSet!==null) {
                        $pg.find("img").css(cssSet);
                    }
                }
                else if (pgo.rotate == 90) {
                    if (!isLSImg) {
                        $viewPort.addClass('dir_landscape');
                    }
                    else {
                        $viewPort.removeClass('dir_landscape');
                    }

                    // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4
                    if (cssSet!==null) {
                        $pg.find("img").css(cssSet);
                    }
                }
                else if(pgo.rotate == 180) {
                    if (!isLSImg) {
                        $viewPort.removeClass('dir_landscape');
                    }
                    else {
                        $viewPort.addClass('dir_landscape');
                    }

                    // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4
                    if (cssSet!==null) {
                        $pg.find("img").css(cssSet);
                    }
                }
                else {
                    pgo.rotate = 270;
                    
                    if (!isLSImg) {
                        $viewPort.addClass('dir_landscape');
                    }
                    else {
                        $viewPort.removeClass('dir_landscape');
                    }

                    // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4
                    if (cssSet!==null) {
                        $pg.find("img").css(cssSet);
                    }
                }
            }
            else { // rotate: 0 
                if (!isLSImg) {
                    $viewPort.addClass('dir_landscape');
                }
                else {
                    $viewPort.removeClass('dir_landscape');
                }

                // 2021.12.21 - 1101330 Eric, 歷史公文頁面可能非A4
                let cssSet = _getRotateCSS(270, cx, cy, shrink, shiftOffset);
                if (cssSet!==null) {
                    console.log('cssSet=' + JSON.stringify(cssSet));
                }

                if (cssSet!==null) {
                    $pg.find("img").css(cssSet);
                }
                
                if (typeof pgo=='undefined' || pgo===null) {
                    pgo = { rotate: 0};
                    $pg.find("img").data("pgo", pgo);
                }
                
                if(pgo) {
                    pgo.rotate = 270;
                }
            }
        });
        
        /* 關閉 button */
        $('#home #uvBtnClose').on('click', function(){
            if (typeof theUniView!=='undefined' && !!theUniView) {
                if (mode=='in') {
					//1061120	Leslie[1060958]	修正瀏覽紙本影像再切至其他模式時，應先檢核側屜是否已開啟
					var classWorkspace = $('#aki800ListWorkspace').attr('class');
					if (classWorkspace.indexOf('doc_desktop_sidepage')===-1) {
                        // 2018.10.22 - Eric Peng, bug-fix 套件關閉後回AKI800側桌顯示問題!
						$('#querydoc_leftTopPane .searchViewContent').hide();
						$('#querydoc_leftTopPane .fullViewContent').show();
						$('#querydoc_leftTopPane').show();
                        $('#aki800ListWorkspace').removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
                        
                        /*$('#searchViewContent').hide();
	                    $('#querydoc_leftTopPane').show();
	                    $('#aki800ListWorkspace').removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');*/
					}
                    setTimeout(function() {
                        $('#pDocInspectPane').hide();
                        theUniView.close();
                    }, 500);
                }
                else {
                    theUniView.close();
                }
                SSOUtil.loading('hide');
            }
        });
		
		//1100325	Leslie[1090869]	新增另存PDF功能鍵
		 $('#uvLeftPart #uvBtnExportPDF').on('click', function() {
			 var _list = SSO_CONFIG.getIsoConvertURLs();
			 var idx = Math.floor(Math.random() * _list.length);
			 var isoUrl = _list[idx];
			 if(isoUrl){
				 var exportUrl = isoUrl.substring(0,isoUrl.lastIndexOf('/')+1) + "ExportDocPDF.ashx?";
				 var docNo = theUniView.getDocId().split('_')[0];
				 if(typeof viewDocInfo != "undefined" && viewDocInfo.UNVObj.getDoc(0).DocNo != docNo)
					docNo = viewDocInfo.UNVObj.getDoc(0).DocNo
				 var param = localStorage.Artifact+'|'+docNo+'|'+theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].orgNo;
				 //1130304	Leslie[1120393]	修改調閱後叫用另存PDF的邏輯，改為傳送已通過驗證的UNV內容，以避免調案申請的瀏覽無法通過一般的權限檢核
				 //1130319	Leslie	自測修正以取用正確的docId
				 // var sViewDocInfo64 = Base64.encode(localStorage['viewDoc_out_' + model.docId]);
				 var sViewDocInfo64 = Base64.encode(localStorage['viewDoc_in_'+theUniView.getDocId()]||localStorage['viewDoc_out_'+theUniView.getDocId()]);
				 // window.open(exportUrl+encodeURIComponent(Base64.encode(param)));
				
				 var formData = new FormData();
				 formData.append('viewDocInfo',sViewDocInfo64);
				 fetch(exportUrl+encodeURIComponent(Base64.encode(param)),{
					 method: "POST",
					 body: formData
				 }).then((response)=>response.blob())
				 .then((blob) => window.open(window.URL.createObjectURL(blob)));
			 }
		 })
        
        /* 關閉 button - 暫時先隱藏 */
        $('#viewDoc #uvBtnClose').hide();
        /*$('#viewDoc #uvBtnClose').on('click', function(){
            if (typeof theUniView!=='undefined' && !!theUniView) {
                if (mode=='in') {
                    $('#searchViewContent').hide();
                    $('#querydoc_leftTopPane').show();
                    $('#aki800ListWorkspace').removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
                    setTimeout(function() {
                        $('#pDocInspectPane').hide();
                        theUniView.close();
                    }, 500);
                }
                else {
                    theUniView.close();
                }
            }
        });*/
    });
    
    $(document).on('pageshow', '#uniView', function(event, exOption) {
        var fromViewDoc = false;
        if (typeof exOption=='object' && typeof exOption.id=='string') {
            fromViewDoc = true;
        }
        
        if (!fromViewDoc && typeof event.target ==='object') {
            if ($(event.target).attr('id')!=='uniView') {
                return;
            }
        }
        
        var newPage = (mode=='out') ? true : false;
        window.theUniView = new UniView(SAMLart, docId, newPage, '#uniView .uvViewPort');
        if (theUniView!==null) {
            SSOUtil.loading('show');
            theUniView.init(SAMLart, docId, newPage)
            .done(function() {
            theUniView.showDocContent();
            SSOUtil.loading('hide');
        
        theLogger.log('UniView.pageshow event, gonna invoke uniViewRefreshDimension()...');
        window.uniViewRefreshDimension();
            })
            .fail(function(errRslt) {
                if (typeof errRslt._showError!=='boolean' || (!errRslt._showError)) {
                    var errMsg = '';
                    if (typeof errRslt.errMsg=='string' && errRslt.errMsg.length) {
                        errMsg = errRslt.errMsg;
                    }
                    if (typeof errRslt._errMsg=='string' && errRslt._errMsg.length) {
                        errMsg = errRslt._errMsg;
                    }
                    if (errMsg.length) {
                        alert(errMsg);
                    }
                }
                SSOUtil.loading('hide');
            });
        }
        //window.UniView.showDocContent();
    });
    
    if (typeof theLogger == 'undefined' && typeof console !== 'undefined') {
        window.theLogger = console;
    }
    
    theSSO.MP.viewDoc = function(SAMLart, docId, signType) {
        var sViewDocInfo = localStorage['viewDoc_in_' + docId];
        var viewDocInfo = JSON.parse(sViewDocInfo);
        if (viewDocInfo===null) {
            theLogger.error('ERROR! parse viewDocInfo Obj failed.');
            alert('ViewDocInfo資訊有誤, 無法正確解析!');
            return;
        }
        
        var newPage = (mode=='out') ? true : false; // 2018.1.18 - merge bug-fix

        if (viewDocInfo.openDocModule=='AOL') {
            if (viewDocInfo!==null) {
                var _doc=null;
                if (SSOUtil.typeOf(viewDocInfo.UNVObj.UnvRoot.Doc)=='array') {
                    _doc = viewDocInfo.UNVObj.UnvRoot.Doc[0];
                }
                else {
                    _doc = viewDocInfo.UNVObj.UnvRoot.Doc;
                }
                
                if (_doc===null) {
                    theLogger.error('ERROR! viewDocInfo.UNVObj cann\'t find Doc obj');
                    alert('UNV內沒有DOC資訊!');
                    return;
                }
                
                var _docNo = _doc.DocNo;
                var _sourceOrgNo = _doc.SourceOrgNo;
                theWebServices.odmssp.getDocumentInfo(SAMLart, _docNo, _sourceOrgNo)
                .done(function(rslt) {
                    /*rslt.rtnODWMSG = { docNo, wsdl, storagePath, subDir};*/
                    var docObj = {
                        // msgId: '', // 已歸檔公文/AKI800調閱公文沒有msgId
						msgId: '-1', //1140415	Leslie[1111454]	[客委會] 修正瀏覽時，msgId未設定所產生的異常訊息問題
                        sourceOrgNo: _doc.SourceOrgNo,
                        docNo: _doc.DocNo,
                        subject: _doc.Subject,
                        fileIOWS: rslt.rtnODWMSG.wsdl,
                        fileStoragePath: rslt.rtnODWMSG.storagePath,
                        fileSubDir: rslt.rtnODWMSG.subDir,
                        signType: signType,
                        
                        /* 唯讀開啟, 給第一個角色的UnitNo [AOL模組載入設定/資源檔要用] */
                        ODWMSG : {
                            OWN_OU_ID: theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].unitNo,
                            /* 2021.5 - 1100093 Eric, merge: 2020.12.30 - 1090821, 支援外機關陳核會稿公文*/
                            COME_OTHERS: rslt.rtnODWMSG.comeOthers,
                            ORGNO_OTHERS: rslt.rtnODWMSG.orgNoOthers,
                            SOURCE_ORGNO: rslt.rtnODWMSG.sourceOrgNo
							,DISSOLVE_ORG_NO: rslt.rtnODWMSG.DissolveOrgNo//1121121 David 1120941 記錄裁撤機關代碼
							,DOC_NO: rslt.rtnODWMSG.docNo //1131104	Leslie[序322]	修正彙併辦公文於調閱模式，出現重覆母文的問題
							,SYSID: rslt.rtnODWMSG.sysId	// 1140930 Raymond 中榮序258 新增調閱要用到的SYSID
                        },
                    };

                    // 2020.10.13 - 1090564, for SMEGWebDoc
                    if (typeof rslt.rtnODWMSG.draftSourceType=='string' && rslt.rtnODWMSG.draftSourceType.length) {
                        docObj.ODWDCM = {
                            DRAFT_SOURCE_TYPE: rslt.rtnODWMSG.draftSourceType
                        };     
                    }
					
					//1131206	Leslie[1130847]	增修調閱要用到的COM_NO、REF_DOC
					if (typeof docObj.ODWDCM == 'undefined')
						docObj.ODWDCM = {};
					docObj.ODWDCM["COM_NO"] = rslt.rtnODWMSG.comNo;
					docObj.ODWDCM["REF_DOC"] = rslt.rtnODWMSG.refDoc;
                    
                    /* 設定線上簽核唯讀(@localStorage.aol_readonly_mode)
                    // 設定線上簽核基資頁(不顯示/AKI802/ODC010, @localStorage.aol_disable_odc010)
                    // localStorage.aol_disable_save, localStorage.aol_disable_odc010
                     */
                    var extraOption = {
                        aol_readonly_mode: viewDocInfo.readOnlyMode,
                        aol_disable_odc010: true,
                        aol_disable_save: true,
						unv_obj: viewDocInfo.UNVObj		/* 1090227 Raymond 1080751 合併內政部1070381檢索公文開啟多傳入UNV檔物件 */
                    };
                    
                    if (typeof docObj.docNo!=='undefined' && docObj.docNo.length) {
                        theSSO.MP.openDocWithAOL(SAMLart, docObj, 'aki800', true, extraOption); // aki800 item, 唯讀模式開啟
                    }
                })
                .fail(function(){
                    var errMsg = '無法取得線上簽核電子檔案路徑資訊-ODMSSP.GetDocumentInfo2 failed';
                    theLogger.error('ERROR!' + errMsg);
                    alert(errMsg);
                });
            }
        }
        else if (viewDocInfo.openDocModule=='UniView') {
            var $uniView = $('#pDocInspectPane #uniView');
            var $uniViewContent = $uniView.find('#uvMainContent');
            if ($uniViewContent.length===0) {
                SSOUtil.loading('show');
                
                SSOUtil.injectHTMLModule('RD-UniView.html', $('#pDocInspectPane #uniView'))
                .then(function(rslt) {
                    /* 關閉側桌 */
                    if ($('#querydoc_leftTopPane').is(':visible')) {
                        $('#querydoc_leftTopPane .dragControlPane .drag_to_close').trigger('click');
                    }
                    else if ($('#searchViewContent').is(':visible')) {
                        $('#searchViewContent .dragControlPane .drag_to_close').trigger('click');
                    }
                    /* 隱藏預覽窗格 */
                    $('#inspectPreviewPane').hide();
                    
                    /* 隱藏側桌窗格 */
                    $('#leftDrawer').removeClass('drawer_show');
					
					//1100325	Leslie[1090869]	無工作站時，隱藏PDF功能鍵
					if(!SSO_CONFIG.getIsoConvertURLs() || SSO_CONFIG.getIsoConvertURLs().length <= 0)
						$('#uvLeftPart #uvBtnExportPDF').hide();
                    
                    $('#uniView').trigger('sso:moduleinit', [{}]); // 2016.6 - 觸發sso:moduleinit
                    $('#uniView').enhanceWithin();
                    /* 2016.6.15 - 暫時先觸發pagecreate, 等UniView調整完後改觸發sso:modulecreate */
                    $('#uniView').trigger('pagecreate', [{mode:'in', signType:signType, docId: docId}]);
                    //$('#aol').trigger('sso:modulecreate', [{}]); 
                    $('#pDocInspectPane').show();
                    
                     $('#uniView').trigger('pageshow');
                    //theSSO.uniViewModuleLoaded = true;
                    
                    //SSOUtil.loading('hide');
                })
                .fail(function(rslt) {
                    theLogger.log('-E- invoke SSOUtil.injectHTMLModule("RD-UniView.html", ...) failed');
                     SSOUtil.loading('hide');
                    return;
                });
            }
            else {
               SSOUtil.loading('show');
                
                /* 關閉側桌 */
                if ($('#querydoc_leftTopPane').is(':visible')) {
                    $('#querydoc_leftTopPane .dragControlPane .drag_to_close').trigger('click');
                }
                else if ($('#searchViewContent').is(':visible')) {
                    $('#searchViewContent .dragControlPane .drag_to_close').trigger('click');
                }
                
                /* 隱藏預覽窗格 */
                $('#inspectPreviewPane').hide();
                
                /* 隱藏側桌窗格 */
                $('#leftDrawer').removeClass('drawer_show');
				
				//1100325	Leslie[1090869]	無工作站時，隱藏PDF功能鍵
				if(!SSO_CONFIG.getIsoConvertURLs() || SSO_CONFIG.getIsoConvertURLs().length <= 0)
					$('#uvLeftPart #uvBtnExportPDF').hide();
                
                theUniView.reload(SAMLart, docId, newPage) // 2018.1.18 - merge bug-fix
                .done(function(rslt) {
                    $('#pDocInspectPane').show();
                    theUniView.showDocContent();
                    
                    SSOUtil.loading('hide');
                })
                .fail(function(rslt){
					// 2018.11 - 1071045
					if (typeof rslt._errMsg=='string' && rslt._errMsg.length) {
                        alert('載入公文失敗, 錯誤說明:' + rslt._errMsg);
                    }
                    theUniView.close();
                    SSOUtil.loading('hide');
                });
            }
        }
    };
    
})(jQuery);