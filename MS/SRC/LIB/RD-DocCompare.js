/* jshint -W100 */


/* 獨立檢閱公文/來文內容分頁, 內嵌AOL/UniView */
$(function() {
    // 整合用WebServices
    if (!!theWebServices) {
        // 2013.3.4 - 實作 AiPredcitWS proxy

        // 2025.6.18 - 測試共通版輔助分文檢索窗格功能
        var _dev_valid_docs = [] //['1120143360', '1120148071', '1120143149', '1120147849', '1120142529', 
            //'1130100554', '1120146155', '1120148509', '1120276522', '1120141169', 
            //'1120149603', '1120141623', '1130100999', '1120141467', '1120144891', 
            //'1120141550', '1120143854', '1120142516', '1120145377', '1120332861'];

        theWebServices.AiPredcitWS = {
            //_dev_valid_docs: _dev_valid_docs, // If you want to expose it as a property
            /*
             * 依公文文向量及關鍵詞資訊清單取得相關公文資訊...
             * ToDo: WebService如何傳入清單資訊?
             */
            getDocKeyphrases : function(wsUrl, orgNo, keyphrases, options) {
				var _dfd = $.Deferred();
                var wsFuncName = 'getDocKeyphrases';
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- RcvDocInfrWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('RcvDocInfrWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}

                str_keyphrases = JSON.stringify(keyphrases);
				
                var params = new SOAPClientParameters();
                params.add('argOrgNo', orgNo);
                params.add('argKeyWordsJson', str_keyphrases);
                
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
                    function (rslt) {
						if (typeof rslt === 'object' && typeof rslt.value=='object') {
                            if (rslt.value.isSuccess===true ) {
                                var rsltObj = rslt.value;
                                if (typeof rsltObj=='object' && rsltObj!==null) {

                                    // 2025.6.18 - 測試共通版輔助分文檢索窗格功能
                                    if (_dev_valid_docs.length && wsUrl.indexOf('win10test01.fdat.com.tw')>0) {
                                        // 以_dev_valid_docs篩選回傳公文項目, 必須在清單內才能使用
                                        let doc_info_list = rsltObj.KeywordsDocInfo;
                                        let valid_doc_info_list = [];
                                        for (var i=0; i<doc_info_list.length; i++) {
                                            let doc_info = doc_info_list[i];
                                            if (_dev_valid_docs.indexOf(doc_info.DocNo)>=0) {
                                                valid_doc_info_list.push(doc_info);
                                            }
                                        }
                                        rsltObj.KeywordsDocInfo = valid_doc_info_list;
                                    }

                                    // 此處取的公文資料不會有SimValue及CorrValue, 須自行計算
                                    _dfd.resolve({success:true, simDocData: rsltObj});
                                }
                                else {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + '時發生錯誤! ErrMsg=回傳之JSON字串轉換為物件作業失敗!'));
                                }
                            }
                            else {
                                if (typeof rslt.value.ErrMsg=='string' &&  rslt.value.ErrMsg.length) {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + '時發生錯誤! ErrMsg=' + rslt.value.ErrMsg));
                                }
                                else {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + ' 時發生錯誤!'));
                                }
                            }                                          
                        }
						else {
							if (rslt.error && typeof rslt.responseText=='string' && rslt.responseText.length) {
								_dfd.reject(new Error('叫用RcvDocInfrWS.' + wsFuncName + ' 時發生錯誤! ErrMsg=' + rslt.responseText));
							}
							else {
								_dfd.reject(new Error('叫用RcvDocInfrWS.' + wsFuncName + ' 時發生錯誤!'));
							}
						}
					});
				return _dfd.promise();
            },
			/* 輔助分文檢索程式啟動時, 取得來文向量,關鍵詞清單及相似公文清單(每筆相似公文有文向量及關鍵詞清單) */
			getSimilarDocInfo : function(wsUrl, orgNo, docId, options) {
                var _dfd = $.Deferred();
				var wsFuncName = 'getSimilarDocInfo';
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- RcvDocInfrWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('RcvDocInfrWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters();
				params.add('argOrgNo', orgNo);
                params.add('argDocId', docId);
                
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
                    function (rslt) {
						if (typeof rslt === 'object' && typeof rslt.value=='object') {
                            if (rslt.value.isSuccess===true ) {
                                var rsltObj = rslt.value;
                                if (typeof rsltObj=='object' && rsltObj!==null) {
                                    _dfd.resolve({success:true, rcvDocSimInfo: rsltObj});
                                }
                                else {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + '時發生錯誤! ErrMsg=回傳之JSON字串轉換為物件作業失敗!'));
                                }
                            }
                            else {
                                if (typeof rslt.value.ErrMsg=='string' &&  rslt.value.ErrMsg.length) {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + '時發生錯誤! ErrMsg=' + rslt.value.ErrMsg));
                                }
                                else {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + ' 時發生錯誤!'));
                                }
                            }                                          
                        }
						else {
							if (rslt.error && typeof rslt.responseText=='string' && rslt.responseText.length) {
								_dfd.reject(new Error('叫用RcvDocInfrWS.' + wsFuncName + ' 時發生錯誤! ErrMsg=' + rslt.responseText));
							}
							else {
								_dfd.reject(new Error('叫用RcvDocInfrWS.' + wsFuncName + ' 時發生錯誤!'));
							}
						}
					});
				return _dfd.promise();
            },
            getDIInfo : function(wsUrl, orgNo, docNo, type, options) {
                var _dfd = $.Deferred();
				var wsFuncName = 'getDiInfo';
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- AiPredictWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AiPredictWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters();
                params.add('argOrgNo', orgNo);
                params.add('argDocNo', docNo);
                params.add('argType', type);
                
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
                    function (rslt) {
						if (typeof rslt === 'object' && typeof rslt.value=='object') {
                            if (rslt.value.isSuccess===true ) {
                                var rsltObj = rslt.value;
                                if (typeof rsltObj=='object' && rsltObj!==null) {
                                    _dfd.resolve({success:true, fileData: rsltObj});
                                }
                                else {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + '時發生錯誤! ErrMsg=回傳之JSON字串轉換為物件作業失敗!'));
                                }
                            }
                            else {
                                if (typeof rslt.value.ErrMsg=='string' &&  rslt.value.ErrMsg.length) {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + '時發生錯誤! ErrMsg=' + rslt.value.ErrMsg));
                                }
                                else {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + ' 時發生錯誤!'));
                                }
                            }                                          
                        }
                        else {
                            if (rslt.error && typeof rslt.responseText=='string' && rslt.responseText.length) {
                                _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + ' 時發生錯誤! ErrMsg=' + rslt.responseText));
                            }
                            else {
                                _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + ' 時發生錯誤!'));
                            }
                        }
					});
				return _dfd.promise();
            },
            /* 以全文檢索方式取得指定關鍵詞相關公文內容 */
            getDocByKeywords: function(wsUrl, orgNo, keyphrases, options) {
                var _dfd = $.Deferred();
                var wsFuncName = 'getDocByKeywords';
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- RcvDocInfrWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('RcvDocInfrWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
                // 2024.8.22 - Eric, 預設為非同步呼叫
				var async = true;
				if (options && (typeof options.async !== 'undefined') && (options.async===false)) {
					async = false;
				}

                //var keyphrases = [{"val": "檢附社團法人", "type": 1}, {"val": "新北市", "type": 3}, {"val": "登記資料1份", "type": 3}];
                var str_keyphrases = JSON.stringify(keyphrases);

                var params = new SOAPClientParameters();
                params.add('argOrgNo', orgNo);
                params.add('argKeywords', str_keyphrases);
                //params.add('argKeyWordsJson', keyphrases);
                
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
                    function (rslt) {
						if (typeof rslt === 'object' && typeof rslt.value=='object') {
                            if (rslt.value.IsSuccess===true ) {
                                var rsltObj = rslt.value;
                                if (typeof rsltObj=='object' && rsltObj!==null) {
                                    // 2025.6.18 - 測試共通版輔助分文檢索窗格功能
                                    if (_dev_valid_docs.length && wsUrl.indexOf('win10test01.fdat.com.tw')>0) {
                                        // 以_dev_valid_docs篩選回傳公文項目, 必須在清單內才能使用
                                        let doc_info_list = rsltObj.KeywordsDocInfo;
                                        let valid_doc_info_list = [];
                                        for (var i=0; i<doc_info_list.length; i++) {
                                            let doc_info = doc_info_list[i];
                                            if (_dev_valid_docs.indexOf(doc_info.DocNo)>=0) {
                                                valid_doc_info_list.push(doc_info);
                                            }
                                        }
                                        rsltObj.KeywordsDocInfo = valid_doc_info_list;
                                    }

                                    // 此處取的公文資料不會有SimValue及CorrValue, 須自行計算
                                    _dfd.resolve({success:true, simDocData: rsltObj});
                                }
                                else {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + '時發生錯誤! ErrMsg=回傳之JSON字串轉換為物件作業失敗!'));
                                }
                            }
                            else {
                                if (typeof rslt.value.ErrMsg=='string' &&  rslt.value.ErrMsg.length) {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + '時發生錯誤! ErrMsg=' + rslt.value.ErrMsg));
                                }
                                else {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + ' 時發生錯誤!'));
                                }
                            }                                          
                        }
						else {
							if (rslt.error && typeof rslt.responseText=='string' && rslt.responseText.length) {
								_dfd.reject(new Error('叫用RcvDocInfrWS.' + wsFuncName + ' 時發生錯誤! ErrMsg=' + rslt.responseText));
							}
							else {
								_dfd.reject(new Error('叫用RcvDocInfrWS.' + wsFuncName + ' 時發生錯誤!'));
							}
						}
					});
				return _dfd.promise();
            },
            /* 以語意搜尋方式取得指定關鍵詞相關公文內容 */
            getDocBySimilarKeywords: function(wsUrl, orgNo, keyphrases, type, options) {
                var _dfd = $.Deferred();
                var wsFuncName = 'getDocBySimilarKeywords';
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- RcvDocInfrWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('RcvDocInfrWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
                // 2024.8.22 - Eric, 預設為非同步呼叫
				var async = true;
				if (options && (typeof options.async !== 'undefined') && (options.async===false)) {
					async = false;
				}

                //keyphrases = [{"val": "檢附社團法人", "type": 4}, {"val": "新北市", "type": 4}, {"val": "登記資料1份", "type": 4}];
                var str_keyphrases = JSON.stringify(keyphrases);
				
                var params = new SOAPClientParameters();
                params.add('argOrgNo', orgNo);
                params.add('argKeywords', str_keyphrases);
                params.add('argType', type)
                
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
                    function (rslt) {
						if (typeof rslt === 'object' && typeof rslt.value=='object') {
                            if (rslt.value.IsSuccess===true ) {
                                var rsltObj = rslt.value;
                                if (typeof rsltObj=='object' && rsltObj!==null) {
                                    // 2025.6.18 - 測試共通版輔助分文檢索窗格功能
                                    if (_dev_valid_docs.length && wsUrl.indexOf('win10test01.fdat.com.tw')>0) {
                                        // 以_dev_valid_docs篩選回傳公文項目, 必須在清單內才能使用
                                        let doc_info_list = rsltObj.KeywordsDocInfo;
                                        let valid_doc_info_list = [];
                                        for (var i=0; i<doc_info_list.length; i++) {
                                            let doc_info = doc_info_list[i];
                                            if (_dev_valid_docs.indexOf(doc_info.DocNo)>=0) {
                                                valid_doc_info_list.push(doc_info);
                                            }
                                        }
                                        rsltObj.KeywordsDocInfo = valid_doc_info_list;
                                    }

                                    _dfd.resolve({success:true, simDocData: rsltObj});
                                }
                                else {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + '時發生錯誤! ErrMsg=回傳之JSON字串轉換為物件作業失敗!'));
                                }
                            }
                            else {
                                if (typeof rslt.value.ErrMsg=='string' &&  rslt.value.ErrMsg.length) {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + '時發生錯誤! ErrMsg=' + rslt.value.ErrMsg));
                                }
                                else {
                                    _dfd.reject(new Error('叫用AiPredictWS.' + wsFuncName + ' 時發生錯誤!'));
                                }
                            }                                          
                        }
						else {
							if (rslt.error && typeof rslt.responseText=='string' && rslt.responseText.length) {
								_dfd.reject(new Error('叫用RcvDocInfrWS.' + wsFuncName + ' 時發生錯誤! ErrMsg=' + rslt.responseText));
							}
							else {
								_dfd.reject(new Error('叫用RcvDocInfrWS.' + wsFuncName + ' 時發生錯誤!'));
							}
						}
					});
				return _dfd.promise();
            }
        }
    }

    function emptyStringFilter(elm) {
        return (elm != null && elm!=false && elm!="");
    }

    function HtmlEncode(s)
    {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        return div.innerHTML;
    }

    function _updateKeywordsEditor(topic_item, sel_key_words, full_key_words) {
        var str_value = ''; //topic;
        var str_full_value = '';
        for (var i=0; i<sel_key_words.length; i++) {
            key_word = sel_key_words[i];
            if (str_value.length>0) {
                str_value += (';' + key_word.KeyWord);
            }
            else {
                str_value = key_word.KeyWord;
            }
        }
        if (str_value.length) {
            str_value += ';'
        }

        for (var i=0; i<full_key_words.length; i++) {
            key_word = full_key_words[i];
            if (str_full_value.length>0) {
                str_full_value += (';' + key_word.KeyWord);
            }
            else {
                str_full_value = key_word.KeyWord;
            }
        }
        if (str_full_value.length) {
            str_full_value += ';'
        }

        $('#topic').prop("value", topic_item.KeyWord);
        $('#key_words').prop("value", str_value);
        $('#default_key_words').prop("value", str_full_value)

        // AKI800搜尋input
        let str_query = topic_item.KeyWord;
        let str_Keywords = $('#key_words').prop("value");
        if (str_Keywords.length) {
            str_query += ';' + str_Keywords;
        }
        $('#query_text').prop("value", str_query);
    }

    function _initKeywordsEditor(rcv_doc_info) {
        // 關鍵詞顯示, 預設顯示一個主題+4個關鍵詞
        var default_count = 4;
        var key_words = rcv_doc_info.KeyPhraseList;
        var sel_key_words = [];
        var full_key_words = [];
        var topic_item = '';
        for (var i=0; i<key_words.length; i++) {
            var key_word = key_words[i];
            if (key_word.Type=='topic') {
                topic_item = key_word;
                continue;
            }

            if (sel_key_words.length<default_count) {
                sel_key_words.push(key_word);        
            }

            full_key_words.push(key_word);
        }

        _key_words = sel_key_words;
        _updateKeywordsEditor(topic_item, _key_words, full_key_words)
    }

    function _update_incharge_ou_select(selector, sim_doc_list) {
        var cnt_sim_doc = sim_doc_list.length;
        var dept_list = {};
        var dept_count_list = []
        for(var i=0; i<cnt_sim_doc; i++) {
            var sim_doc = sim_doc_list[i];
            var dept_no = sim_doc.RpsDeptNo;
            if (!(dept_no in dept_list)) {
                dept_list[dept_no] = sim_doc.RpsDeptName;
                dept_count_list[dept_no] = 1
            }
            else {
                dept_count_list[dept_no] += 1
            }
        }
        var $el = $(selector)
        if ($el.length) {
            $el.empty();
            $.each(dept_list, function(key, value){
                var s_count = ' (' + dept_count_list[key] + ')'
                $el.append($("<option></option").attr("value", key).text(value + s_count));
            })
        }
        return dept_list
    }

    function _build_key_word_dialg_table($table, rcv_doc_info) {
        var key_words = rcv_doc_info.KeyPhraseList;

        var str_keys = $('#key_words').prop("value");
        var selected_keys = str_keys.split(';')

        for (var i=0; i<key_words.length; i++) {
            var key_word = key_words[i];
            var s_id = 'key_' + (i+1)

            var $item = $('<tr></tr>');
            // check_box
            var s_checked = ''
            if (selected_keys.includes(key_word.KeyWord)) { // 若為目前選用key_word, 則預設鈎選...
                s_checked = ' checked'
            }
            var $subItem = $('<td data-prop="chk"><input class="form-check-input" type="checkbox" value="" id="' + s_id + '"' + s_checked + '></input></td>');
            if (!!$subItem)
                $item.append($subItem);

            // key_word
            $subItem = $('<td data-prop="word">' + HtmlEncode(key_word.KeyWord) + '</td>');
            if (!!$subItem)
                $item.append($subItem);

            // type
            var s_type = '關鍵詞';
            if (key_word.Type=='topic')
                s_type = '主題'
            $subItem = $('<td data-prop="type">' + s_type + '</td>');
            if (!!$subItem)
                $item.append($subItem);

            if (!!$item) {
                $table.append($item);
            }
        }
    }

    function _build_sim_doc_list_table($table, sim_doc_list, addExtraDoc) {
        /*<tr>
                    <td>1</input></td>
                    <td>1080000002</td>
                    <td>1081123</td>
                    <td>監○院○○委員會</td>
                    <td>秘書處</td>
                    <td>訂於10X年XX月XX日下午，在XXXX會議中心7樓，舉辦「數位人權」研討會，請派人與會，並歡迎貴屬報名參加，請查照。</td>
                    <td>數位人權研討會</td>
                    <td><input type="button" value="帶入"></input></td>
                </tr>*/
        // docNo:'1071150002', RPSDEPT_NO:'35', RPSDEPT_NAME:'宗教及禮制司', RCV_DATE:'1071213', FROMORG_NAME:'行政院秘書長', FROMO_SUBJECT:'行政院秘書長', SIM_VALUE: 0.785, CORR_VALUE: 0.823, 
        var sim_doc_list_show = null;        
        if (addExtraDoc) {
            sim_doc_list_show = [];        
            for (var i=0; i<sim_doc_list.length; i++) {
                sim_doc_list_show.push(sim_doc_list[i]);
            }

            strExtra = 'ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuv'
            var original_sim_doc_list = sim_doc_list;
            for (var i=0; i<30; i++) {
                var simDocIdx = 0;
                if (Math.random()>0.5) {
                    simDocIdx = 1;
                }
                var origSimDoc = original_sim_doc_list[simDocIdx];
                var newSimDoc = JSON.parse(JSON.stringify(origSimDoc))
                newSimDoc.DocNo = newSimDoc.DocNo + strExtra.substring(i, i+1)
                newSimDoc.SimValue = Math.random();
                var corr_value = newSimDoc.SimValue + Math.random()/4;
                if (corr_value>1.0) {
                    corr_value = 1.0
                }
                newSimDoc.CorrValue = corr_value;
                sim_doc_list_show.push(newSimDoc);
            }
        }
        else {
            sim_doc_list_show = sim_doc_list;
        }

        $tbody = $table.find('tbody');

        $tbody.empty();
        
        for (var i=0; i<sim_doc_list_show.length; i++) {
            sim_doc = sim_doc_list_show[i];
            
            var docNo = HtmlEncode(sim_doc.DocNo)
            var corrVal = HtmlEncode(sim_doc.CorrValue)

            var $item = $('<tr data-corr="' + corrVal +'" data-docNo="' + docNo +'"></tr>');
            $item.attr('data-docNo', docNo);

            // sn
            s_sn = (i+1).toString()
            var $subItem = $('<td data-prop="sn">'+ s_sn + '</td>');
            if (!!$subItem)
                $item.append($subItem);

            // doc_no
            $subItem = $('<td data-prop="docNo">' + HtmlEncode(sim_doc.DocNo) + '</td>');
            if (!!$subItem)
                $item.append($subItem);

            // rcv_date
            $subItem = $('<td data-prop="rcvDate">' + HtmlEncode(sim_doc.RcvDate) + '</td>');
            if (!!$subItem)
                $item.append($subItem);

            // fromorg_name
            $subItem = $('<td data-prop="fromOrgName">' + HtmlEncode(sim_doc.FromOrgName) + '</td>');
            if (!!$subItem)
                $item.append($subItem);

            // rpsdept_name
            $subItem = $('<td data-prop="rpsdept_name">' + HtmlEncode(sim_doc.RpsDeptName) + '</td>');
            if (!!$subItem)
                $item.append($subItem);

            // from_subject
            $subItem = $('<td data-prop="from_subject">' + HtmlEncode(sim_doc.FromSubject) + '</td>');
            if (!!$subItem)
                $item.append($subItem);

            // topic
            key_words = sim_doc.KeyPhraseList;
            topic = '';
            for (var j=0; j<key_words.length; j++) {
                key_word = key_words[j];
                if (key_word.Type=='topic') {
                    topic = HtmlEncode(key_word.KeyWord);
                    break;
                }
            }
            $subItem = $('<td data-prop="topic">' + topic + '</td>');
            if (!!$subItem)
                $item.append($subItem);

            // 參照窗格
            $subItem = $('<td data-prop="link"><input type="button" value="帶入" data-docNo="' + docNo + '"></input></td>');
            if (!!$subItem)
                $item.append($subItem);

            if (!!$item) {
                $tbody.append($item);
            }
        }
    }

    function _filter_display_docs($table, keyWordList, fltrCorrValue, sim_doc_list) {
        function containsKeyword(keyWordList, keyPhraseList) {
            for (var i=0; i<keyPhraseList.length; i++) {
                var key_word = keyPhraseList[i]
                if (keyWordList.includes(key_word.KeyWord))
                    return true;
            }
            return false;
        }

        function getSimDoc(docNo, sim_doc_list) {
            for (var i=0; i<sim_doc_list.length; i++) {
                var sim_doc = sim_doc_list[i];
                if (sim_doc.DocNo==docNo)
                    return sim_doc;
            }
            return null;
        }

        var $items = $table.find('tbody > tr');
        var show_list = [];
        var hide_list = [];
        for (var i=0; i<$items.length; i++) {
            var $item = $($items[i]);
            var docNo = $item.attr('data-docNo');
            var corrValue = parseFloat($item.attr('data-corr'));
            var sim_doc = getSimDoc(docNo, sim_doc_list);
            if (sim_doc!=null) {
                //if (containsKeyword(keyWordList, sim_doc.KeyPhraseList) && corrValue>=fltrCorrValue) {
                if (corrValue>=fltrCorrValue) {
                    //$item.show();
                    show_list.push($item);
                    continue;
                }
                
            }
            //$item.hide();
            hide_list.push($item);
        }

        setTimeout(function() {
            for(var i=0; i<show_list.length; i++) {
                $item = show_list[i]
                $item.show()
            }
            for(var i=0; i<hide_list.length; i++) {
                $item = hide_list[i]
                $item.hide()
            }
        }, 50);
    }

    function _getFiltered_sim_docs($table) {
        _active_sim_doc_no_list = []
        var $items = $table.find('tbody > tr');
        for (var i=0; i<$items.length; i++) {
            var $item = $($items[i]);
            var docNo = $item.attr('data-docNo');
            var show = $item.is(':visible');
            if (show) {
                _active_sim_doc_no_list.push(docNo)
            }
        }
        return _active_sim_doc_no_list;
    }

    function _getDocIndex(sDocNo, activeOnly) {
        var _target_list = rcvDocInfo.sim_doc_list;
        if (activeOnly && rcvDocInfo.active_doc_list.length) {
            _target_list = rcvDocInfo.active_doc_list;
        }

        for (var i=0; i<_target_list.length; i++) {
            var simDoc = _target_list[i];
            if (simDoc.DocNo==sDocNo) {
                return i;
            }
        }
        return -1;
    }

    window.loading = function(action) {
        var $body = $('body');
        if (action=="show") {
            $body.addClass('loading');
        }
        else {
            $body.removeClass('loading');
        }
    }

    window.setHightlight = function(el, keywords) {
        if (keywords.length==0)
            return;

        if (el=='left') {
            leftModel.highlight(keywords);
        }
        else if (el=='right') {
            rightModel.highlight(keywords);
        }
    }

    $(document).on('click', '#dialog_sim_docs .tbl_sim_docs > tbody > tr > td > input', function() {
        var docNo = $(this).attr('data-docNo');
        var _newDocIndex = -1
        for (var i=0; i<rcvDocInfo.sim_doc_list.length; i++) {
            var sim_doc = rcvDocInfo.sim_doc_list[i];
            if (sim_doc.DocNo == docNo) {
                _newDocIndex = i;
                break;
            }
        }

        if (_newDocIndex>=0) {
            viewSimDoc(_newDocIndex);
        }
    });

    // select item
    $(document).on('click', '#dialog_sim_docs .tbl_sim_docs > tbody > tr', function() {
        docNo = $(this).attr('data-docNo');

        $tbody = $(this).closest('tbody')
        $tr = $tbody.find('tr')
        $tr.removeClass('selected')

        $(this).addClass('selected')
    });

    $(document).on('click', '#top_tool_bar .aki800-controls #doQuery', function() {
        // https://moivip.fdat.com.tw/AK/aki801.aspx?AIWord=關鍵字1,關鍵字2,關鍵字3

        // 2025.8.5 - Eric, 修正相關字號查詢時, 檢核pattern要求代字至少要有2個字問題.
        // 2024.8.20 - Eric, bug fix: 修正未定義pattern問題.
        const pattern = /[\u4e00-\u9fa5a-zA-Z0-9()（）]{1,8}字第\d{4,11}號/;

        var sId = $(".query-mode input.radio_a:checked").attr('id');
        var sAIType = '1';
        if (sId=='radio-wordno') {
            sAIType = '2';
        }

        var strRawKeyWords = $('#query_text').prop("value");
        var keyWordList = strRawKeyWords.split(';');
        var filtered = keyWordList.filter(emptyStringFilter)
        if (sAIType=='2' && (filtered.length>1)) {
            var sAlert = '相關字號查詢只能輸入一組字號, 請修正後再繼續.\r\n[程式以分號";"區隔不同組內容]'
            alert(sAlert);
            return;
        }

        if (sAIType=='2') {
            // 確認字串格式符合相關字號規則: 'XXX字第nnn號'
            const match = keyWordList[0].match(pattern);
            if (!match) {
                let sAlert = '字串內容:"' + keyWordList[0] + '"不符合相關字號格式, 請修正後再執行!';
                alert(sAlert);
                return;
            }
        }

        sKeyWords = filtered.join(',');
        // 2024.7.1 - ToDo: get real Url
        var sUrl = envConfig.aki801Url + '?SAMLart=' + localStorage.Artifact + '&AIType=' + sAIType + '&AIWord=' + encodeURI(sKeyWords);
        window.open(sUrl)
    });

    $(document).on('click', '#top_tool_bar .aki800-controls #openAKI800', function() {
        // 關鍵字查詢:
        // https://moivip.fdat.com.tw/AK/aki800.aspx?AIType=1&AIWord=關鍵字1,關鍵字2,關鍵字3,
        // 相關字號查詢:
        // https://moivip.fdat.com.tw/AK/aki800.aspx?AIType=2&AIWord=關鍵字1

		// 2025.8.20 - Eric, 修正相關字號查詢時, 檢核pattern要求代字至少要有2個字問題.
        const pattern = /[\u4e00-\u9fa5a-zA-Z0-9()（）]{1,8}字第\d{4,11}號/;
        
        // 取得[關鍵詞] or [相關字號] 查詢選項
        //$( ".query-mode input.radio" ).checkboxradio();
        // radio-keyword, radio-wordno
        var sId = $(".query-mode input.radio_a:checked").attr('id');
        var sAIType = '1';
        if (sId=='radio-wordno') {
            sAIType = '2';
        }

        var strRawKeyWords = $('#query_text').prop("value");
        var keyWordList = strRawKeyWords.split(';');
        var filtered = keyWordList.filter(emptyStringFilter)
        if (sAIType=='2' && (filtered.length>1)) {
            var sAlert = '相關字號查詢只能輸入一組字號, 請修正後再繼續.\r\n[程式以分號";"區隔不同組內容]'
            alert(sAlert);
            return;
        }

        if (sAIType=='2') {
            // 確認字串格式符合相關字號規則: 'XXX字第nnn號'
            const match = keyWordList[0].match(pattern);
            if (!match) {
                let sAlert = '字串內容:"' + keyWordList[0] + '"不符合相關字號格式, 請修正後再執行!';
                alert(sAlert);
                return;
            }
        }

        sKeyWords = filtered.join(',');

        // 2024.7.1 - ToDo: get real Url
        var sUrl = envConfig.aki800Url + '?SAMLart=' + localStorage.Artifact + '&AIType=' + sAIType + '&AIWord=' + encodeURI(sKeyWords);
        window.open(sUrl)
    });

    // drag and drop test
    /*
    $(document).on('dragover', '#top_tool_bar #key_words', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    })
    // drag and drop test
    $(document).on('drop', '#top_tool_bar #key_words', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    })*/

    // 帶回按鍵, 將使用者選定的辦文單位(或移文機關)資訊帶回分文作業程式.
    $(document).on('click', '#top_tool_bar #btn_confirm', function() {
        var dept_no = $("#top_tool_bar select#incharge_ou").val()
        if (dept_no.length) {
            var dept_name = sim_doc_dept_list[dept_no]
            if (dept_name != null && dept_name!="") {

                //alert('使用者選擇帶回權責單位:{' + dept_name + '}')
                sessionStorage.clear();
                sessionStorage.UserSelectType = '1';
                sessionStorage.UserSelectDeptNo = dept_no;
                sessionStorage.UserSelectDeptName = dept_name;
                parent.window.CallBack("RD-DocCompare");

                // 叫用此函式以關閉輔助分文檢索窗格
                parent.DlgClose();
            }
        }
        else {
            alert('未選擇帶回的權責單位, 請重新設定後再繼續.')
        }
    });

    function viewSimDoc(docIndex) {
        if (rcvDocInfo.sim_doc_list.length) {
			var simDoc = rcvDocInfo.sim_doc_list[docIndex];
            var simDocNo = simDoc.DocNo;

            theWebServices.AiPredcitWS.getDIInfo(envConfig.ws_AIPredict, envConfig.orgNo, simDocNo, '2')
            .then(function(rslt) {
                var wfio = rslt.fileData.fileIOWS;
                return rightModel.load(wfio, rslt.fileData.filePath, rslt.fileData.diFileName);
            })
            .then(function(mdl) {
                var activeIdx = -1;
                var docIdx = _getDocIndex(simDocNo, false);
                if (rcvDocInfo.active_doc_list.length) {
                    activeIdx = _getDocIndex(simDocNo, true);
                }
                else {
                    activeIdx = docIdx;
                }

                var fEnableNext = false;
                if (docIdx<(rcvDocInfo.sim_doc_list.length-1)) {
                    fEnableNext = true;
                    if (activeIdx>=0) {
                        if (rcvDocInfo.active_doc_list.length) {
                            let last_simDoc = rcvDocInfo.active_doc_list[rcvDocInfo.active_doc_list.length-1];
                            let last_active_idx = _getDocIndex(last_simDoc.DocNo, false); // 取得最後一筆active_doc的index
                            if (activeIdx>=last_active_idx) {
                                fEnableNext = false;
                            }
                        }
                        else {
                            if (activeIdx>=(rcvDocInfo.sim_doc_list.length-1)) {
                                fEnableNext = false;
                            }
                        }
                    }
                }

                var fEnablePrev = false;
                if (docIdx>0) {
                    fEnablePrev = true;
                    if (activeIdx<=0) {
                        fEnablePrev = false;
                    }
                    else if (rcvDocInfo.active_doc_list.length) {
                        let first_simDoc = rcvDocInfo.active_doc_list[0];
                        let first_active_idx = _getDocIndex(first_simDoc.DocNo, false); // 取得第一筆active_doc的index
                        if (activeIdx<=first_active_idx) {
                            fEnablePrev = false;
                        }
                    }
                }

                // 更新上一筆/下一筆button
                if (!fEnableNext)
                    setTimeout(function() {
                        $("#btn_next_doc").prop("disabled", true);
                    }, 50);
                else
                    setTimeout(function() {
                        $("#btn_next_doc").prop("disabled", false);
                    }, 50);

                if (!fEnablePrev)
                    setTimeout(function() {
                        $("#btn_prev_doc").prop("disabled", true);
                    },50);
                else
                    setTimeout(function() {
                        $("#btn_prev_doc").prop("disabled", false);
                    }, 50);

                var sim_doc = rcvDocInfo.sim_doc_list[docIndex];
                var dept_no = sim_doc.RpsDeptNo;
                $("#top_tool_bar select#incharge_ou").val(dept_no).change();
                $('.content_view .doc_no').text('參考公文 文號：' + sim_doc.DocNo);
                rcvDocInfo.simDocIndex = docIndex;

                // 2024.8.22 - 補上topic
                var topic = $('#topic').prop("value");
                var keywords = $('#key_words').prop("value");
                if (topic.length>0) {
                    keywords = topic + ';' + keywords;
                }
                rightModel.highlight(keywords);
            })
            .fail(function(errText) {
                alert(errText);
            });
		}
    }

    function _reset_sim_doc_list_old(rcvDocInfo, rslt, mode) {
        /*<DocInfo>
            <DocInfrObj>
                <DocNo>, <RpsDeptNo>,<RpsDeptName>,<FileCls>,<RcvDate>
                <DocType>,<IsOuRcv>,<FromOrgName>,<FromSubject>,<DocVector>
                <KeyIssueNoWord>,<SimValue>,<CorrValue>,<KeyPhraseList>
            </DocInfrObj>
            <DocInfrObj>...</DocInfrObj>
          </DocInfo> */
        /* {
            'DocNo': '1130000001', 'RpsDeptNo': '11', 'FileCls': '010101',
            'RcvDate': '1130601', 'DocType': '1', 'IsOuRcv': '0',
            'FromOrgName': '', 'FromSubject': '', 'DocVector': '', 'KeyIssueNoWord': '',
            'SimValue': 0, 'CorrValue': 0,
            'KeyPhraseList': [
				{'KeyWord': '主要', 'Weight': 0.8, 'Type': 'topic', 'WordVector': [...]}, 
				{'KeyWord': '次要', 'Weight': 0.5, 'Type': 'subtopic', 'WordVector': [...]}]
        }*/
        var relative_doc_list = rslt.simDocData.DocInfo;
        
        for (var i=0; i<relative_doc_list.length; i++) {
            var simDoc = relative_doc_list[i]
            if (typeof(simDoc.DocVector)=='string' && simDoc.DocVector.length) {
                simDoc.DocVector = JSON.parse(simDoc.DocVector);
            }
        }

        new_sim_doc_list = null;
        if (mode=='v1') {
            new_sim_doc_list = SimDocUtil.calc_corr_value(rcvDocInfo.DocVector, rcvDocInfo.KeyPhraseList, relative_doc_list)
        }
        else if (mode=='v2') {
            new_sim_doc_list = SimDocUtil.calc_corr_value_v2(rcvDocInfo.KeyPhraseList, relative_doc_list)
        }

        if (new_sim_doc_list!=null && mode=='v1') {
            if (envConfig.sortBy=='SimValue') {
                new_sim_doc_list.sort((a, b)=>b.CorrValue - a.CorrValue) // 由大至小排序!
            }
        }

        return new_sim_doc_list;
    }

    function _reset_sim_doc_list(rcvDocInfo, query_key_list, rslt, mode) {
        /*<DocInfo>
            <DocInfrObj>
                <DocNo>, <RpsDeptNo>,<RpsDeptName>,<FileCls>,<RcvDate>
                <DocType>,<IsOuRcv>,<FromOrgName>,<FromSubject>,<DocVector>
                <KeyIssueNoWord>,<SimValue>,<CorrValue>,<KeyPhraseList>
            </DocInfrObj>
            <DocInfrObj>...</DocInfrObj>
          </DocInfo> */
        /* {
            'DocNo': '1130000001', 'RpsDeptNo': '11', 'FileCls': '010101',
            'RcvDate': '1130601', 'DocType': '1', 'IsOuRcv': '0',
            'FromOrgName': '', 'FromSubject': '', 'DocVector': '', 'KeyIssueNoWord': '',
            'SimValue': 0, 'CorrValue': 0,
            'KeyPhraseList': [
				{'KeyWord': '主要', 'Weight': 0.8, 'Type': 'topic', 'WordVector': [...]}, 
				{'KeyWord': '次要', 'Weight': 0.5, 'Type': 'subtopic', 'WordVector': [...]}]
        }*/
        var relative_doc_list = null;
        if ('KeywordsDocInfo' in rslt.simDocData) {
            let doc_1st = rslt.simDocData.KeywordsDocInfo[0];
            if (doc_1st.KeyPhraseList[0].includes('&&')) {
                let rslt_doc_list = []
                // 同一筆公文去除相同關鍵詞項目(以語意搜尋時, 同一筆公文的不同關鍵詞可能皆符合查詢的關鍵詞, 此時只須列出一項即可!)
                for (let i=0; i<rslt.simDocData.KeywordsDocInfo.length; i++) {
                    let _doc = rslt.simDocData.KeywordsDocInfo[i];
                    let key_list = _doc.KeyPhraseList;
                    let keyword_added = [];
                    let filtered_keyphrase = []
                    for (let j=0; j<key_list.length; j++) {
                        let s_full = key_list[j];
                        let item_list = s_full.split('&&');
                        if (!keyword_added.includes(item_list[0])) {
                            keyword_added.push(item_list[0])
                            filtered_keyphrase.push(s_full)
                        }
                    }
                    _doc.KeyPhraseList = filtered_keyphrase;
                    rslt_doc_list.push(_doc);
                }
                // 2024.7.29 - 以符合關鍵詞數量排序...
                rslt_doc_list = rslt_doc_list.sort((a, b) => b.KeyPhraseList.length - a.KeyPhraseList.length);
                relative_doc_list = rslt_doc_list;
            }
            else {
                relative_doc_list = rslt.simDocData.KeywordsDocInfo;
            }
        }
        else {
            alert('ERROR @_reset_sim_doc_list');
            return null;
        }

        // 最多取50筆...
        max_relative_doc_count = 50;
        if (relative_doc_list.length) {
            let item_1st = relative_doc_list[0]

            if (relative_doc_list.length>max_relative_doc_count) {
                // group by matched keyword counts
                let match_group = [];
                let _current_match_count = 0;

                let _group_docs = []
                for (let i=0; i<relative_doc_list.length; i++) {
                    let _doc_item = relative_doc_list[i];
                    let _match_count = _doc_item.KeyPhraseList.length;
                    if (_current_match_count==0) {
                        if (_match_count==1) {
                            // 所有公文最多一項符合
                            // 若RcvDate欄位有值, 則以該欄位排序
                            _group_docs = relative_doc_list
                            if (item_1st.RcvDate != null) {
                                _group_docs.sort((a, b) => b.RcvDate - a.RcvDate) // 反向排序=>b在前a在後; 正向排序=>a在前b在後
                            }
                            else {
                                _group_docs.sort((a, b) => b.DocNo - a.DocNo) // 反向排序=>b在前a在後; 正向排序=>a在前b在後
                            }

                            match_group.push({
                                match_count: _match_count,
                                docs: _group_docs
                            });
                            break;
                        }
                        _current_match_count = _match_count;
                        _group_docs.push(_doc_item);
                    }
                    else if (_match_count!=_current_match_count) {
                        if (_group_docs.length) {
                            // 若RcvDate欄位有值, 則以該欄位排序
                            if (item_1st.RcvDate != null) {
                                _group_docs.sort((a, b) => b.RcvDate - a.RcvDate) // 反向排序=>b在前a在後; 正向排序=>a在前b在後
                            }
                            else {
                                _group_docs.sort((a, b) => b.DocNo - a.DocNo) // 反向排序=>b在前a在後; 正向排序=>a在前b在後
                            }

                            match_group.push({
                                match_count: _current_match_count,
                                docs: _group_docs
                            });
                            _group_docs = []
                        }
                        _current_match_count = _match_count;
                        _group_docs.push(_doc_item);
                    }
                    else {
                        _group_docs.push(_doc_item);
                    }
                }

                if (_group_docs.length) {
                    match_group.push({
                        match_count: _current_match_count,
                        docs: _group_docs
                    });
                }

                let _tmp_list = []
                for (let i=0; i<match_group.length; i++) {
                    let _group_item = match_group[i];

                    for (let j=0; j<_group_item.docs.length; j++) {
                        _tmp_list.push(_group_item.docs[j]);
                        if (_tmp_list.length>=max_relative_doc_count) {
                            break;
                        }
                    }

                    if (_tmp_list.length>=max_relative_doc_count) {
                        break;
                    }
                }

                relative_doc_list = _tmp_list;
            }
        }

        // 回傳值已有符合的關鍵詞清單,可直接計算CORR_VALUE
        new_sim_doc_list = null;
        new_sim_doc_list = SimDocUtil.calc_corr_value_v2(rcvDocInfo.KeyPhraseList, query_key_list, relative_doc_list)

        if (new_sim_doc_list!=null && mode=='v1') {
            if (envConfig.sortBy=='SimValue') {
                new_sim_doc_list.sort((a, b)=>b.CorrValue - a.CorrValue) // 由大至小排序!
            }
        }
        return new_sim_doc_list;
    }

    function parseSimDocInfo(orgNo, docId, rcvDocSimInfo) {
        var _rcvDocInfo = {
            doc_id: docId,
            rcv_org_no: orgNo,
            DocVector: [],
            KeyPhraseList: rcvDocSimInfo.MainDoc.KeyPhraseList
        }

        if (window.envConfig.ws_AIPredict.includes('fdat.com.tw') || window.envConfig.ws_AIPredict.includes('win10test01')) {
            // 開發環境修正資料
            let fExistTopic = false;
            let docIndex = -1;
            for (let i=0; i<_rcvDocInfo.KeyPhraseList.length; i++) {
                let key_word = _rcvDocInfo.KeyPhraseList[i];
                if (key_word.Type=='topic') {
                    fExistTopic = true;
                    break;
                }
                else {
                    if (key_word.KeyWord=='DNA辦理出生登記清冊') {
                        docIndex = 0;
                    }
                    else if (key_word.KeyWord=='xxxx') {
                        docIndex = 1;
                    }
                }
            }

            if (!fExistTopic&&docIndex>=0) {
                switch(docIndex) {
                case 0:
                    topic_item =  {
                        KeyWord: '市戶政事務所',
                        Type: 'topic',
                        Weight: 0.0029527546638258, 
                        WORD_VECTOR: [0.8215587735176086, 0.6779996752738953, 0.38674548268318176, 0.2914055287837982, -0.025087276473641396, 0.3796485662460327, -0.05432750657200813, 0.23641067743301392, 0.17790889739990234, 0.0794699639081955, 0.341696560382843, 0.44373205304145813, -0.4175824820995331, -0.31156015396118164, 0.1576533019542694, -0.3116965889930725, 0.558871328830719, 0.1280844658613205, -0.800334632396698, -0.5136018991470337, -0.8794587254524231, -0.07588640600442886, -0.5893024206161499, 0.5035130977630615, 0.22226469218730927, 0.0020894319750368595, 0.1168862134218216, 0.9506780505180359, 0.42395174503326416, 0.46789807081222534, 2.3608059883117676, -0.12499512732028961, -0.14827094972133636, 1.6839442253112793, 0.7385722994804382, 1.2719470262527466, -1.2934932708740234, -0.3908228278160095, -0.9937238693237305, 1.205229640007019, 0.6048089265823364, 0.43713077902793884, -0.972231924533844, 0.22158607840538025, 0.3800217807292938, -0.008353322744369507, -0.17430375516414642, -0.5924079418182373, -1.810269832611084, 0.6793140172958374, 0.5323441624641418, -0.5064042210578918, 0.45160502195358276, -0.8363169431686401, -1.4135667085647583, 1.1830171346664429, -0.09598333388566971, -0.8438814878463745, -0.5621702671051025, -0.24635447561740875, 0.001846006023697555, -0.32543495297431946, 0.2748153507709503, -0.7346835732460022, 0.2240206003189087, -0.9272279143333435, 1.7717159986495972, -0.1795434206724167, 0.6471095681190491, 0.4409821033477783, -0.9312751293182373, 0.22835032641887665, -0.5028066635131836, -0.3418239653110504, 0.6475554704666138, 0.5971115231513977, -1.4280824661254883, -0.28054279088974, -0.6127471327781677, 1.348158597946167, 0.596501886844635, 0.2528725862503052, 0.022254042327404022, 1.034683346748352, 1.040224552154541, -0.6443110704421997, 0.5260298848152161, 0.47550132870674133, -0.06829290837049484, 0.2736772298812866, 0.8814655542373657, 0.5487245321273804, -0.5099624991416931, -0.4546099603176117, 1.2057467699050903, 0.9510558247566223, 0.8627563118934631, 0.039047788828611374, 0.28008610010147095, 0.2987077236175537, 0.4975028932094574, 1.6383557319641113, 0.9280151724815369, 0.5178342461585999, 0.3968595862388611, 0.7916197776794434, 0.024599015712738037, 0.43300706148147583, 0.5980273485183716, 0.09544742107391357, 0.9019818305969238, 1.022464632987976, 0.8636655807495117, 0.01758553832769394, 1.4634865522384644, -0.23776382207870483, 0.5787816047668457, -0.20424507558345795, -1.2404990196228027, 0.23366498947143555, 0.32080987095832825, 0.02614034339785576, 0.4978393614292145, 0.5614061951637268, -0.8429044485092163, 1.406848430633545, -0.2022274136543274, 0.3745408356189728, 0.06924502551555634, -0.9188467264175415, 0.6038129329681396, -0.026657341048121452, -0.16773124039173126, 0.06701744347810745, -0.3163343667984009, -0.8688859939575195, 1.0364179611206055, -0.4808269441127777, 0.01878826878964901, -1.0877423286437988, 0.11887644231319427, -0.9731310606002808, -0.3567534387111664, 0.3926476240158081, -0.6660178899765015, -0.15034978091716766, -1.5926002264022827, 0.6700400114059448, 1.5383996963500977, 0.1032499149441719, 0.724174439907074, -0.01774550788104534, -1.2916500568389893, 0.36414554715156555, 0.4158859848976135, 0.2616431415081024, 5.360764503479004, -0.9030925035476685, -0.0645952969789505, 0.4225040376186371, 0.6663603782653809, 0.7689175605773926, 0.3812616169452667, 0.6542209982872009, 1.1972404718399048, 1.0504974126815796, 0.5785048604011536, 0.12663938105106354, -0.7333893775939941, -0.020979009568691254, 0.8376689553260803, 0.26216480135917664, 0.07640883326530457, -0.05648544430732727, 0.8467843532562256, -0.7242963910102844, -0.3451976478099823, 0.06490939110517502, 0.821213960647583, -0.5537458658218384, 0.03427344560623169, -0.6352397203445435, -0.3526194095611572, -0.1531657576560974, 0.6451441645622253, 0.6614814400672913, 0.7130802869796753, 0.17441731691360474, 0.031099505722522736, 1.281529188156128, -0.4012925624847412, -0.41965538263320923, 0.04383581876754761, 1.6584827899932861, 0.10734348744153976, 0.7582318782806396, 0.6785866022109985, -0.04494310915470123, -0.7814081907272339, -0.6102932691574097, 0.7553716897964478, 0.8376606106758118, 1.1184405088424683, 0.551389753818512, 0.5846291184425354, -1.2444400787353516, -1.3272587060928345, -0.0740654319524765, -0.7359137535095215, 1.330661416053772, 0.3379019796848297, -0.5645203590393066, 2.3399147987365723, -0.7910628318786621, 0.9108465313911438, 0.20601414144039154, 0.08769374340772629, -0.5381483435630798, 0.5414280891418457, 0.5674739480018616, -0.38312673568725586, -0.6254400014877319, 0.5322131514549255, 0.3189776539802551, -0.19445915520191193, 0.33371180295944214, 0.3507516086101532, -0.8802980184555054, 1.310056209564209, 0.6040644645690918, -0.17701666057109833, 0.16315795481204987, 1.016176462173462, 0.3007640838623047, -0.11562427133321762, 0.13538897037506104, 0.6686997413635254, 0.8271921873092651, -0.6344990730285645, 0.1652328372001648, 1.5896682739257812, -0.3949848711490631, 1.8497322797775269, -1.145542025566101, 0.8331501483917236, 0.3556502163410187, 1.3623205423355103, 1.904559850692749, -0.505790114402771, 0.8123404383659363, -0.3128660321235657, -1.1041134595870972, -0.10357347875833511, 1.3527876138687134, -1.6086214780807495, -0.05354275926947594, 0.20483970642089844, -0.17355351150035858, 0.8907161951065063, 0.30816125869750977, 0.37605953216552734, -0.2590387761592865, -0.5097184181213379, -0.525630533695221, -0.13561710715293884, -0.40950775146484375, 0.06522295624017715, 0.012974336743354797, 0.8952513933181763, -0.08363255113363266, 0.08888337761163712, 0.7836077213287354, -1.1139765977859497, -0.048869628459215164, 0.32866960763931274, 0.3301198482513428, -0.5043169856071472, 1.0085995197296143, 0.06281904131174088, 0.53738933801651, 0.06242088973522186, -0.24867463111877441, -0.0013319328427314758, -0.7828812003135681, -0.22281384468078613, 0.1800564080476761, 0.6510710716247559, 0.844327449798584, 1.6542253494262695, -0.7190459370613098, -0.16523860394954681, 0.6526444554328918, 0.9143409729003906, 0.6134613156318665, 0.9475240707397461, -0.5087178945541382, 0.24571235477924347, 0.24843905866146088, -0.06538420915603638, 1.4269806146621704, 1.0809388160705566, 0.781985342502594, -0.5220201015472412, 0.7218608856201172, 1.0824575424194336, -0.24883954226970673, 0.041936181485652924, 0.11572398990392685, 0.8471662998199463, -0.404208779335022, 0.05741912126541138, 0.9040862321853638, 0.9789158701896667, 0.5480918884277344, -0.5370937585830688, 0.2581617534160614, 0.2699359357357025, -0.5611186623573303, -0.030868753790855408, 1.0338715314865112, -0.430501788854599, 0.3930358290672302, -0.04401695355772972, 0.6832209229469299, 0.8040890097618103, 0.6280920505523682, -0.5698012709617615, -0.3691091537475586, 0.7502846121788025, -1.4819923639297485, 0.28239402174949646, 0.2736758589744568, 0.49780648946762085, 0.01244847010821104, 0.4277545213699341, -0.4897643029689789, -1.497140884399414, 0.8463030457496643, 0.8896774053573608, 1.1876966953277588, 1.8100923299789429, 0.5682951211929321, 0.1368762105703354, -0.9792389869689941, -0.5078259706497192, 0.16852709650993347, 1.2462188005447388, 0.4144097864627838, -0.12484379857778549, 0.3127126693725586, 0.29110586643218994, -0.19971606135368347, -0.36446139216423035, 0.456510066986084, -0.20604950189590454, 0.988422691822052, 0.6256212592124939, -0.2297840416431427, 1.8350446224212646, 0.9479053020477295, 1.0252128839492798, -0.4937375783920288, -0.6634159684181213, 0.27359890937805176, 0.5052871108055115, 0.5853195786476135, -0.3738720715045929, 0.07741602510213852, -0.6534265875816345, -0.5008960962295532, 0.5675780773162842, 0.034910719841718674, 0.45388275384902954, 0.10216168314218521, 1.0175141096115112, -0.633621335029602, 0.24364019930362701, -0.297115296125412, 0.02807431109249592, -0.5683119893074036, -0.10796012729406357, 0.4599318206310272, -0.186676487326622, 0.6186052560806274, -1.939468502998352, 0.65935218334198, -1.0705901384353638, 1.4615298509597778, 0.6013733744621277, 0.760665774345398, 0.757245659828186, -1.287577509880066, 0.7058733105659485, 0.47394901514053345, 0.7800424695014954, -0.752761721611023, -0.427855521440506, 0.8495007753372192, -0.557513952255249, 0.6598799824714661, -0.0516047328710556, 0.2451377660036087, 1.3434092998504639, 0.15862788259983063, 1.0019968748092651, 0.08962112665176392, -0.3216567635536194, 0.6198447346687317, 1.2795228958129883, -0.24229253828525543, -0.29803013801574707, 0.9738461375236511, 0.7611563801765442, 0.05459645390510559, 1.2131520509719849, -0.3450503945350647, 0.6368095278739929, 0.6208961606025696, 0.6259564757347107, 0.4507236182689667, -0.27477124333381653, -0.33330342173576355, 0.7684147357940674, 0.42241936922073364, 0.5402227640151978, 1.8595778942108154, 0.2146303355693817, 0.30154338479042053, 0.6149749755859375, -0.42685943841934204, -0.1770075559616089, -0.7529876232147217, 0.12535527348518372, -0.13239344954490662, -0.8140822649002075, 0.7746193408966064, -0.3986758291721344, -1.0218626260757446, 0.19993381202220917, 0.008062034845352173, 1.2526124715805054, -0.07850929349660873, 0.03559919074177742, 0.658623993396759, 1.0387934446334839, 0.6771089434623718, 0.24745211005210876, 0.2998499572277069, 0.3852335512638092, 0.03666586056351662, -0.06348279863595963, -0.39115703105926514, -0.26621508598327637, 1.1731334924697876, 1.4093559980392456, -0.18347075581550598, 0.49426624178886414, -0.09044346958398819, -0.14693975448608398, 1.0719904899597168, -0.553924560546875, 0.35432934761047363, 0.7119624018669128, 0.40579840540885925, 0.6898818016052246, 2.219228744506836, 1.5941476821899414, 1.5193582773208618, 0.0858251228928566, -0.424520879983902, 1.4911576509475708, 0.7121953964233398, -0.08938030898571014, -1.061945915222168, -0.49244409799575806, 0.7021196484565735, 1.805878758430481, 0.0855044350028038, -0.003194595454260707, 0.6527054309844971, -0.22466039657592773, 0.33591771125793457, -0.4136728346347809, 0.062159061431884766, 1.179790735244751, 0.7212993502616882, -0.5464675426483154, 0.8727483153343201, 1.1304043531417847, 0.18934416770935059, 1.1666233539581299, 1.6651281118392944, -0.1880727857351303, 1.180998682975769, 0.08999026566743851, -0.23099158704280853, 1.597373127937317, 0.12126678228378296, -0.060941845178604126, -0.5351037383079529, 0.43287888169288635, -0.015550941228866577, -0.481020450592041, 0.01867523416876793, 0.6020416617393494, -0.3339124917984009, -0.011771613731980324, -0.49197453260421753, -0.15289351344108582, 0.4636724591255188, -0.9085952639579773, 0.19821932911872864, -0.6103644371032715, 0.9073839783668518, 1.742436408996582, -0.3866247236728668, -0.17631933093070984, 0.7343511581420898, 0.3026733994483948, -0.9827172160148621, -0.068962961435318, -0.039961304515600204, 2.326502561569214, 0.4741181433200836, -0.5775065422058105, -0.021421413868665695, 1.3852397203445435, -0.7205935120582581, 0.02978413552045822, -0.12314711511135101, -0.3944742679595947, -0.13625910878181458, 0.4382689893245697, -0.36485305428504944, 1.1162663698196411, 0.5573431253433228, -0.6657171249389648, -0.29677915573120117, 1.7705059051513672, -0.4162558317184448, -0.40964218974113464, -0.6370289325714111, -0.24193599820137024, -0.8780883550643921, -0.3370680809020996, 0.06405404955148697, 0.2067345827817917, -0.010618329048156738, 0.4309232532978058, -0.515550971031189, 0.3393503725528717, 0.6551265716552734, 0.48414772748947144, 0.16850878298282623, 0.08326595276594162, -0.134294331073761, -0.6903793811798096, 0.27784663438796997, 1.0454843044281006, -0.5377790331840515, 0.8719657063484192, 0.1312219798564911, -0.8697872161865234, 0.5923944115638733, -0.27765488624572754, 1.4825661182403564, 1.3311325311660767, 1.4023634195327759, -0.5608223676681519, 0.028775446116924286, 1.7843852043151855, 0.25429031252861023, -1.0021247863769531, 0.1977439969778061, 0.266704797744751, 1.2395446300506592, 0.632453203201294, 0.11759887635707855, 0.14522211253643036, 1.9803982973098755, -0.3388683497905731, -0.40159839391708374, 1.3857040405273438, -0.9040184020996094, 0.09292878955602646, -0.35604655742645264, 0.2912065386772156, -0.8993957042694092, -0.7929438352584839, -0.3262068033218384, 1.965433120727539, 0.791895866394043, 0.0954013541340828, 0.41208088397979736, 0.12670454382896423, 0.5599184036254883, 0.29116129875183105, -0.03292720392346382, -0.6478490829467773, 0.5333669185638428, 0.7232840657234192, -0.6911895275115967, -0.5803113579750061, 0.9307725429534912, -1.678663730621338, 1.0604450702667236, 0.10197751969099045, 1.0778156518936157, -1.2928802967071533, -0.18863016366958618, -0.2190835028886795, 0.2876325845718384, 0.5960092544555664, 0.08764251321554184, 0.05258485674858093, 0.2637562155723572, 0.05914018675684929, -1.0721603631973267, 0.6778296828269958, -0.012059874832630157, -0.06806407868862152, -0.11199545115232468, -0.14843900501728058, 0.4965990483760834, -0.5131454467773438, 0.7033926844596863, 0.7730506658554077, 1.0277565717697144, 1.2836239337921143, -0.21249721944332123, -0.575201153755188, 0.12340019643306732, 0.08167707175016403, -0.5293744206428528, 0.6434891819953918, -0.03961249440908432, -0.28453442454338074, 0.032106779515743256, 0.3940262198448181, -0.8633458614349365, -1.2722076177597046, -0.1927056759595871, 0.11553382128477097, 0.264146625995636, -0.9505198001861572, 1.202635407447815, -0.3896408677101135, 0.03936290368437767, 0.2215752899646759, 0.5800767540931702, 0.44453728199005127, -0.4763728380203247, 0.3809053897857666, 1.918311595916748, 0.20900879800319672, -0.026657065376639366, -0.5553902983665466, -0.05783618614077568, 0.8144754767417908, 0.20657475292682648, -0.3297888934612274, -0.31367409229278564, -0.569898784160614, 0.6440621018409729, 0.04218987375497818, 1.832024097442627, -0.878012478351593, -0.09443489462137222, 0.5477393269538879, 0.31184476613998413, 1.3033674955368042, -0.6210010051727295, -1.035139799118042, 1.120529294013977, 1.6665834188461304, -0.8043435215950012, -0.026343366131186485, 1.1633225679397583, 0.8957507610321045, 1.061572551727295, 0.8853908777236938, 0.7769808173179626, 0.051470544189214706, 0.5205902457237244, 0.32027530670166016, 1.0846964120864868, -0.8284981846809387, -0.12181390821933746, -0.20606303215026855, 0.6987127661705017, 0.8292964100837708, 1.5200519561767578, 0.49011045694351196, 0.6505154967308044, 0.9178459048271179, 0.3638603985309601, -0.5237091183662415, 0.360653281211853, 0.8841204047203064, 0.14332890510559082, -0.4013104736804962, -1.5224418640136719, -0.8271648287773132, 0.08331414312124252, 0.36613336205482483, 0.7541677355766296, 0.03950231522321701, -0.5317361354827881, 0.5795769691467285, 1.298092007637024, 0.31457996368408203, 0.35523733496665955, -0.2477865219116211, -0.36002954840660095, 1.2639696598052979, -0.36881884932518005, 0.5278992652893066, 0.7797191143035889, 0.010289202444255352, -0.3662566840648651, 0.04179223254323006, 0.20606501400470734, -1.2136290073394775, -0.6933886408805847, 0.7024028301239014, 0.4460611939430237, 0.5368247032165527, -0.08908412605524063, 0.081440269947052, 0.30200353264808655, 0.10438373684883118, 0.2614298462867737, 0.4000186026096344, 0.331954687833786, -0.06540804356336594, 0.4194350242614746, 0.2551557719707489, 0.3491763174533844, 0.07789881527423859, 0.0723470076918602, 0.12904755771160126, 0.5818560123443604, -0.0591297373175621, -1.1688361167907715, 0.26901760697364807, 0.7424170970916748, -1.120455026626587, -0.49424606561660767, -0.6467666029930115, 0.6814070343971252, -1.236290454864502, -0.4659374952316284, 0.4266505539417267, -0.4688030779361725, 1.2369860410690308, 0.8282209038734436, -1.2106586694717407, -1.0492674112319946, 0.08989788591861725, 0.44050922989845276, 0.4023348391056061, 1.7840718030929565, -0.7512985467910767, -0.6707229614257812, -0.14027655124664307, 0.5077623128890991, 0.4190039038658142, 0.8240906596183777, -0.24412256479263306, -1.1146678924560547, -0.42043668031692505, 0.825367271900177, 0.11800473928451538, 0.09193971753120422, 0.5399128198623657, -0.24514742195606232, 0.39748695492744446, 0.2536298930644989, -0.3537769913673401, 1.0318702459335327, 0.6425700187683105, 0.7323609590530396, 0.5119632482528687, -0.26649197936058044, -0.37920692563056946, -0.16349337995052338, 0.9721996188163757, -1.064712643623352, 0.8056320548057556, -0.28203144669532776, 1.0270535945892334, 0.8247280120849609, 0.060828566551208496, -0.5781946778297424, 0.2802011966705322, -1.185899257659912, -0.4097120761871338, -0.40803757309913635, 0.35112497210502625, 0.7048060297966003, -0.003088447032496333, 0.7449522018432617, 0.058729253709316254, 1.0247795581817627, 0.31940898299217224, 1.306331992149353, -1.282467007637024, 0.31421130895614624, -1.4368857145309448, -1.7803452014923096, 0.20809748768806458, 0.5721303820610046, 0.7211800813674927, -0.508116602897644, 0.28498056530952454, 0.496105819940567, 1.5846909284591675, -0.16566014289855957, 1.3573131561279297, 1.0723583698272705, 0.22396373748779297, 1.0766535997390747, 0.3854069709777832, 0.5137957334518433, 1.2135226726531982, -0.7594103813171387, 0.7604110240936279, 0.7610964179039001, 0.6830167770385742, -0.2508291006088257, -0.3579899072647095, -0.1910967379808426, -0.42032909393310547, 0.2719961404800415, 0.4263673424720764, 0.47905150055885315, -0.5402457118034363, 0.2679482400417328, 0.9952534437179565, -0.7805789709091187, -0.07824094593524933, -0.19521558284759521, 0.8943814635276794, 0.22572219371795654, -0.21321837604045868, -0.9782853722572327, 0.30451154708862305, -0.6882405877113342, 0.09614749997854233, 0.6815968155860901, -1.202344298362732, 0.3029690682888031, 0.35610175132751465, 0.5374493598937988, -0.3849688768386841, -0.06708571314811707, -0.1576303392648697, 0.21833309531211853, 0.7408727407455444, -0.44110679626464844, 0.5950524210929871, 0.279291033744812, -1.388797402381897, 0.35283398628234863, -0.8378211259841919, -0.4525226652622223, -0.4996291697025299, 0.7105166912078857, 0.564060628414154, -0.09233889728784561, 0.8205742239952087, -0.4044432044029236, 0.05590479075908661, -1.1915283203125, -0.11270788311958313, -0.42183569073677063, -0.6724781394004822, -0.815365731716156, -0.635672926902771, 0.8906136155128479, 8.309392433147877e-05, -0.48411762714385986, 0.39324313402175903, -0.34797486662864685, 0.5419427156448364, -0.8415043354034424, 0.8819683194160461, 0.5300561189651489, 0.8539685606956482, 0.23092690110206604, 1.3845510482788086, 0.3302314579486847, -0.2690940201282501, -0.301588237285614, 1.1063257455825806, 0.0335594043135643, -1.144209623336792, 0.6953375339508057, -0.652562141418457, -1.1106499433517456, 1.084822416305542, -0.19858670234680176, -0.08154574036598206, -0.15453968942165375, -0.5597925782203674, 0.7680337429046631, -0.20369651913642883, 0.2559674084186554, 0.6721917390823364, 1.3954864740371704, -0.4575961232185364, -0.30580151081085205, 0.8734579682350159, 0.37502366304397583, -0.7422691583633423, 1.8429555892944336, 0.30229341983795166, 1.0639554262161255, -0.7326889634132385, -0.487570583820343, -0.3776015043258667, -0.9833639860153198, -1.0908316373825073, 0.5023797750473022, -1.1787779331207275, -0.5432760715484619, -0.2900211811065674, 0.5715181231498718, -0.6210941076278687, 0.8419337868690491, 0.8406906723976135, -0.18224941194057465, 0.7762798070907593, 0.14446285367012024, 1.1428651809692383, -0.4017063081264496, 0.001930519938468933, -1.077572226524353, 1.1127375364303589, -0.2658780515193939, 0.6798897385597229, -0.10805488377809525, 0.8693854808807373, 0.3968873918056488, 0.04060984402894974, 0.1686793565750122, -0.5308301448822021, -0.5280680060386658, 0.381180077791214, 1.043861985206604, -0.23996655642986298, -0.27407345175743103, -0.3627850115299225, 0.049832429736852646, 0.025764217600226402, 1.3755015134811401, 0.137065589427948, 0.8214560747146606, 0.202675923705101, 0.49955010414123535, -0.3744596838951111, -0.4976124167442322, 0.06504283845424652, -0.8271534442901611, -0.09565016627311707, -0.6286420226097107, 0.9683440923690796, 0.04894964024424553, -0.10018077492713928, -1.0136209726333618, 0.9906481504440308, 1.4630793333053589, 0.5421961545944214, 1.211294412612915, 1.8179641962051392, 0.25470638275146484, 0.5260109305381775, 1.1307374238967896, 0.44668304920196533, -0.23503661155700684, -0.4404512941837311, -0.22882334887981415, -0.08411040902137756, -0.7396818399429321, 0.037022173404693604, 0.2756365239620209, 1.0384914875030518, 0.3079323470592499, 0.15127167105674744, -1.1718307733535767, -0.08067312836647034, -0.10384248197078705, -2.2036099433898926, 0.2970306873321533, 1.1704834699630737, 0.0014421126106753945, -0.8269121050834656, 0.3643549382686615, -0.7223303914070129, -0.1925744265317917, -0.6171067357063293, 1.3816431760787964, -0.7695053815841675, -0.7137678861618042, -0.6216080784797668, 0.9527333378791809, 1.4094600677490234, 0.2781422734260559, -0.1994217336177826, 0.10425078868865967, -1.1819580793380737, 0.09719493240118027, -0.891033947467804, -0.08395533263683319, 0.44268345832824707, -0.14457961916923523, 0.0606980063021183, 0.6954106688499451, -0.11743564903736115, 0.014560059644281864, -0.48065075278282166, 0.6698970794677734, 0.33685463666915894, 0.1046750545501709],
                    }
                    newKeyPhrarseList = [topic_item].concat(rcvDocSimInfo.MainDoc.KeyPhraseList);
                    _rcvDocInfo.KeyPhraseList = newKeyPhrarseList;
                    break;
                case 1:
                    break;
                case 2:

                }
            }
        }

        if (typeof(rcvDocSimInfo.MainDoc.DocVector)==='string' && rcvDocSimInfo.MainDoc.DocVector.length) {
            _rcvDocInfo.DocVector = JSON.parse(rcvDocSimInfo.MainDoc.DocVector);
        }
        else if (Array.isArray(rcvDocSimInfo.MainDoc.DocVector) && rcvDocSimInfo.MainDoc.DocVector.length) {
            _rcvDocInfo.DocVector = rcvDocSimInfo.MainDoc.DocVector;
        }

        var _sim_doc_list = rcvDocSimInfo.DocInfo;
        // 2024.8.22 - 以原順序呈現, 不另行排序
        //if (Array.isArray(_sim_doc_list) && _sim_doc_list.length) {
        //    _sim_doc_list.sort((a, b)=> b.CorrValue - a.CorrValue); // 由大至小排序!
        //}
        return {
            rcv_doc_info: _rcvDocInfo,
            sim_doc_list: _sim_doc_list
        };
    }

    function setupDocInfrData(rcvDocInfo, rcv_doc_info, addExtraDoc) {
        rcvDocInfo.DocVector = rcv_doc_info.DocVector;
        rcvDocInfo.KeyPhraseList = rcv_doc_info.KeyPhraseList;
        if (rcvDocInfo.DocVevtor==null || rcvDocInfo.DocVector.length<=0) {
            return false;
        }
        if (rcvDocInfo.KeyPhraseList==null || rcvDocInfo.KeyPhraseList.length>0) {
            return false;
        }

        return true;
    }

    $("#keyword_btn").on('click', function() {
        $('#aki800_btn').removeClass('active_btn');
        $('#keyword_btn').addClass('active_btn');
        $('.keyphrase-controls').show();
        $('.aki800-controls').hide();
    })

    $("#aki800_btn").on('click', function() {
        $('#aki800_btn').addClass('active_btn');
        $('#keyword_btn').removeClass('active_btn');
        $('.aki800-controls').show();
        $('.keyphrase-controls').hide();
    })

    $( ".filter-mode input.radio" ).checkboxradio(); // {label:['全文','語意']}
    var cnt_radio = $( "input.radio" ).length

    $( ".query-mode input.radio" ).checkboxradio(); // {label:['關鍵詞','相關字號']}

    var cnt_radio = $( "#dialog > div.toggles").length;
    if (cnt_radio>0) {
        $( "#dialog > input.checkbox" ).checkboxradio();
        $( ".filter-mode" ).controlgroup();
    }

    var cnt_radio = $( "#dialog > div.toggles").length;
    var cnt_radio = $( "#custom_keywords").length;

    $( "#dialog_keywords" ).dialog( { 
        autoOpen: false,
        modal: true,
        height: 'auto', // 2025.7.15 - 退輔會上線問題序52(彙整表序148)關鍵詞過多時子視窗大小超出螢幕,無法關閉問題
        width: 320,
        maxHeight: 500, // 2025.7.15 - 退輔會上線問題序52(彙整表序148)
        buttons: [
            {
                text: "確定",
                //icon: "ui-icon-heart",
                click: function() {
                    $( this ).dialog( "close" );
                    // Uncommenting the following line would hide the text,
                    // resulting in the label being used as a tooltip

                    var key_words = rcvDocInfo.KeyPhraseList;

                    keys = []

                    var $key_word_table = $('#dialog_keywords table.tbl_custom_key > tbody');
                    var $trs =  $key_word_table.find('tr');
                    for (var i=0; i<$trs.length; i++) {
                        var $tr = $($trs[i]);
                        var $input = $tr.find('td > input');
                        if ($input.prop("checked")) {
                            keys.push(key_words[i].KeyWord)
                        }
                    }

                    if (keys.length>0) {
                        s_keys = keys.join(';')
                        $('#key_words').prop("value", s_keys);
                    }
                }
            },
            {
                text: "取消",
                //icon: "ui-icon-heart",
                click: function() {
                    $( this ).dialog( "close" );
                }
            }
        ]
    });

    $("#custom_keywords").on('click', function() {
        $key_word_table = $('#dialog_keywords table.tbl_custom_key > tbody');

        // 移除現有的
		if ($key_word_table.children('tr').length>0) {
			$key_word_table.empty();
		}

        // 2025.7.15 - debug
         if (envConfig.ws_AIPredict.includes('win10test01.fdat.com.tw')) {
            // add test item for height debug
            rcvDocInfo['KeyPhraseList'] = rcvDocInfo['KeyPhraseList'].concat(
                [{ KeyWord: '測試關鍵字A', Type: 'keyword', Weight: 0.002, KeyWordVector: []},
                { KeyWord: '測試關鍵字B', Type: 'keyword', Weight: 0.002, KeyWordVector: []},
                { KeyWord: '測試關鍵字C', Type: 'keyword', Weight: 0.002, KeyWordVector: []},
                { KeyWord: '測試關鍵字D', Type: 'keyword', Weight: 0.002, KeyWordVector: []},
                { KeyWord: '測試關鍵字E', Type: 'keyword', Weight: 0.002, KeyWordVector: []},
                { KeyWord: '測試關鍵字F', Type: 'keyword', Weight: 0.002, KeyWordVector: []},
                { KeyWord: '測試關鍵字G', Type: 'keyword', Weight: 0.002, KeyWordVector: []},
                { KeyWord: '測試關鍵字H', Type: 'keyword', Weight: 0.002, KeyWordVector: []},
                { KeyWord: '測試關鍵字I', Type: 'keyword', Weight: 0.002, KeyWordVector: []},
                { KeyWord: '測試關鍵字J', Type: 'keyword', Weight: 0.002, KeyWordVector: []}]);
        }

        _build_key_word_dialg_table($key_word_table, rcvDocInfo);

        $( "#dialog_keywords" ).dialog("open");
        setTimeout(function(){
            $('div#dialog_keywords').css('height', '');
        }, 200)
    });

    // setup correlative filter
    $( "#dialog_sim_docs #sim_doc_filter" ).slider( {
        min: 1,
        max: 5,
        orientation: "horizontal",
        range: "min",
        animate: true,
        change: function(event, ui) {
            var newValue = $("#dialog_sim_docs #sim_doc_filter").slider("value");
            if (newValue > envConfig.doc_corr_filter.length) {
                newValue = envConfig.doc_corr_filter.length
            }
            var newCorrFilter = envConfig.doc_corr_filter[newValue-1]

            var str_keys = $('#key_words').prop("value");
            var keyWordList = str_keys.split(';')
            keyWordList = keyWordList.filter(emptyStringFilter)

            $table = $('#dialog_sim_docs .tbl_sim_docs');
            
            _filter_display_docs($table, keyWordList, newCorrFilter, rcvDocInfo.sim_doc_list)
        }
    });

    $('#dialog_sim_docs').dialog({
        autoOpen: false,
        modal: true,
        height: 'auto',
        maxHeight: 600,
        width: 960,
        open: function() {
            $(this).dialog('option', "maxHeight", 600);
            //$('#dialog_sim_docs .dialog-content').height(504);

            var $sim_doc_table = $('#dialog_sim_docs .tbl_sim_docs');
            //setTimeout(function() {
                var s_keys = $('#key_words').val();
                var keyWordList = s_keys.split(';');
                keyWordList = keyWordList.filter(emptyStringFilter);

                var newValue = $("#dialog_sim_docs #sim_doc_filter").slider("value");
                if (newValue > envConfig.doc_corr_filter.length) {
                    newValue = envConfig.doc_corr_filter.length;
                }
                var newCorrFilter = envConfig.doc_corr_filter[newValue-1]
                _filter_display_docs($sim_doc_table, keyWordList, newCorrFilter, rcvDocInfo.sim_doc_list);
            //}, 50);
        },
        buttons: [
            {
                text: "確定",
                //icon: "ui-icon-heart",
                click: function() {
                    // 2024.8.19 - 取得目前顯示相似公文的單位資訊
                    var _currSimDoc = rcvDocInfo.sim_doc_list[rcvDocInfo.simDocIndex]
                    var _currDeptNo = _currSimDoc.RpsDeptNo;

                    // 在close()前先取得顯示項目
                    var $table = $('#dialog_sim_docs .tbl_sim_docs');
                    var _active_doc_no_list = _getFiltered_sim_docs($table)

                    $( this ).dialog( "close" );
                    
                    // 相似公文列表子視窗按[確定]鈕, [上一筆]/[下一筆]會依篩選過的清單顯示
                    if (_active_doc_no_list.length > 0) {
                        _active_doc_list = []
                        for (var i=0; i<_active_doc_no_list.length; i++) {
                            var docNo = _active_doc_no_list[i];
                            for (var j=0; j<rcvDocInfo.sim_doc_list.length; j++) {
                                var simDoc = rcvDocInfo.sim_doc_list[j];
                                if (simDoc.DocNo==docNo) {
                                    _active_doc_list.push(simDoc);
                                    break;
                                }
                            }
                        }
                        rcvDocInfo.active_doc_list = _active_doc_list;

                        if (rcvDocInfo.simDocIndex>=0 && rcvDocInfo.simDocIndex<rcvDocInfo.sim_doc_list.length) {
                            var simDoc = rcvDocInfo.sim_doc_list[rcvDocInfo.simDocIndex]
                            if (!_active_doc_no_list.includes(simDoc.DocNo)) {
                                viewSimDoc(0);
                                _currDeptNo = '';
                            }
                            else {
                                var activeIdx = -1;
                                var docIdx = rcvDocInfo.simDocIndex;
                                var simDoc = rcvDocInfo.sim_doc_list[docIdx];
                                if (rcvDocInfo.active_doc_list.length) {
                                    activeIdx = _getDocIndex(simDoc.DocNo, true);
                                }
                                else {
                                    activeIdx = docIdx;
                                }
                                
                                var fEnableNext = false;
                                if (docIdx<(rcvDocInfo.sim_doc_list.length-1)) {
                                    fEnableNext = true;
                                    if (activeIdx>=0) {
                                        if (rcvDocInfo.active_doc_list.length) {
                                            let last_simDoc = rcvDocInfo.active_doc_list[rcvDocInfo.active_doc_list.length-1];
                                            let last_active_idx = _getDocIndex(last_simDoc.DocNo, false); // 取得最後一筆active_doc的index
                                            if (activeIdx>=last_active_idx) {
                                                fEnableNext = false;
                                            }
                                        }
                                        else {
                                            if (activeIdx>=(rcvDocInfo.sim_doc_list.length-1)) {
                                                fEnableNext = false;
                                            }
                                        }
                                    }
                                }

                                var fEnablePrev = false;
                                if (docIdx>0) {
                                    fEnablePrev = true;
                                    if (activeIdx<=0) {
                                        fEnablePrev = false;
                                    }
                                    else if (rcvDocInfo.active_doc_list.length) {
                                        let first_simDoc = rcvDocInfo.active_doc_list[0];
                                        let first_active_idx = _getDocIndex(first_simDoc.DocNo, false); // 取得第一筆active_doc的index
                                        if (activeIdx<=first_active_idx) {
                                            fEnablePrev = false;
                                        }
                                    }
                                }

                                // 更新上一筆/下一筆button
                                if (!fEnableNext)
                                    setTimeout(function() {
                                        $("#btn_next_doc").prop("disabled", true);
                                    }, 50);
                                else
                                    setTimeout(function() {
                                        $("#btn_next_doc").prop("disabled", false);
                                    }, 50);

                                if (!fEnablePrev)
                                    setTimeout(function() {
                                        $("#btn_prev_doc").prop("disabled", true);
                                    }, 50);
                                else
                                    setTimeout(function() {
                                        $("#btn_prev_doc").prop("disabled", false);
                                    }, 50);
                            }
                        }
                        _update_incharge_ou_select('#top_tool_bar select#incharge_ou', rcvDocInfo.active_doc_list);
                        // 2024.8.19 - 若未切換顯示相似公文, 將權責單位回復為目前相似公文的單位資訊
                        if (_currDeptNo!='') {
                            $("#top_tool_bar select#incharge_ou").val(_currDeptNo).change();
                        }
                    }
                }
            },
            {
                text: "取消",
                //icon: "ui-icon-heart",
                click: function() {
                    $( this ).dialog( "close" );
                }
            }
        ]
    });

    $('#btn_sim_docs').on('click', function() {
        var $sim_doc_table = $('#dialog_sim_docs .tbl_sim_docs');

        // 移除現有的
		if ($sim_doc_table.children('tr').length>0) {
			$sim_doc_table.empty();
		}

        /* 移至dialog open event處理...
        var s_keys = $('#key_words').val();
        var keyWordList = s_keys.split(';')
        keyWordList = keyWordList.filter(emptyStringFilter);

        var newValue = $("#dialog_sim_docs #sim_doc_filter").slider("value");
        if (newValue > envConfig.doc_corr_filter.length) {
            newValue = envConfig.doc_corr_filter.length;
        }
        var newCorrFilter = envConfig.doc_corr_filter[newValue-1]; */

        var addExtraDoc = false;
        if (!envConfig.ws_AIPredict.includes('win10test01.fdat.com.tw')) {
            addExtraDoc = false;
        }

        _build_sim_doc_list_table($sim_doc_table, rcvDocInfo.sim_doc_list, addExtraDoc);
        //_filter_display_docs($sim_doc_table, keyWordList, newCorrFilter, rcvDocInfo.sim_doc_list)

        $( "#dialog_sim_docs" ).dialog("open");

        setTimeout(function(){
            $('div#dialog_sim_docs').css('height', '');
        }, 200)
    });

    // 以目前設定的關鍵詞清單查詢DB取得關聯公文清單...
    $('#btn_getRelativeDoc').on('click', function() {
        //var AiPredictWSUrl = 'https://win10test01.fdat.com.tw/ImgConvert/AiPredictWS.asmx' // https://win10test01.fdat.com.tw/ImgConvert/ImgConvertWS.asmx

        // 測試SimValue/CorrValue計算
        //sim_doc_info_list = SimDocUtil.calc_corr_value(rcvDocInfo.DocVector, rcvDocInfo.KeyPhraseList, sim_doc_list);

        // 2024.7.22 - 區分語意/全文檢索搜尋, 查詢標的為主題/關鍵詞
        var search_type = 0; // 全文檢索
        var search_target = 0;
        var selected_id = $('input[name=radio-1]:checked', '#top_tool_bar .filter-mode').attr('id');
        if (selected_id=='radio-2') {
            search_type = 1; // 語意檢索
        }

        var search_target = 0;
        //var $search_target = $('#top_tool_bar div.search-target input');
        var $checked =$('input[name=srch_target]:checked', '#top_tool_bar .search-target');
        for (let i=0; i<$checked.length; i++) {
            $chkbox = $($checked[i]);
            let sId = $chkbox.attr('id');
            if (sId=='cb_st_1') {
                search_target += 1;
            }
            else if (sId=='cb_st_2') {
                search_target += 2;
            }
        }

        var query_key_list = [];
        // 加入主題
        if (search_target & 1) {
            let key_list = rcvDocInfo.KeyPhraseList;
            for (let i=0; i<key_list.length; i++) {
                let key_item = key_list[i];
                if (key_item.Type=='topic') {
                    let query_item = {
                        val: key_item.KeyWord,
                        type: 1
                    }
            
                    if (search_type==1) { // 語意檢索
                        if ('WordVector' in key_item) {
                            query_item.vector = JSON.parse(key_item.WordVector);
                        }
                        else {
                            query_item.type = 4;
                            query_item.vector = [];
                        }
                    }

                    query_key_list.push(query_item);
                    break;
                }
            }
        }

        // 加入關鍵詞清單
        if (search_target & 2) {
            var s_keys = $('#key_words').val();
            if (s_keys.length==0) {
                alert('未設定關鍵詞, 請重新設定再繼續作業!')
                return;
            }

            var keyWordList = s_keys.split(';');
            var filtered = keyWordList.filter(emptyStringFilter);
            filtered = [...new Set(filtered)]; // 去除重複項目
            for (var i=0; i<filtered.length; i++) {
                let s_key = filtered[i];
                if (s_key.length==0) continue;

                let key_list = rcvDocInfo.KeyPhraseList;
                let found = false;
                for (let j=0; j<key_list.length; j++) {
                    let key_item = key_list[j];
                    if (key_item.KeyWord==s_key) {
                        key_type = 3;
                        if (key_item.Type=='topic') {
                            key_type = 1;
                        }
                        let query_item = {
                            val: key_item.KeyWord,
                            type: key_type
                        }
                
                        if (search_type==1) { // 語意檢索
                            if ('WordVector' in key_item) {
                                query_item.vector = JSON.parse(key_item.WordVector);
                            }
                            else {
                                query_item.type = 4;
                                query_item.vector = [];
                            }
                        }

                        query_key_list.push(query_item);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    query_key_list.push({
                        val: s_key,
                        type: 4,
                        vector: []
                    });
                }
            }
        }

        let callTestUrl = false;
        let predictWS = envConfig.ws_AIPredict;
        if (callTestUrl) {
            predictWS = 'https://192.168.1.249/ImgConvert/AiPredictWS.asmx' // 'https://david.fdat.com.tw/ImgConvert/AiPredictWS.asmx' // http://192.168.2.159/ImgConvert/AiPredictWS.asmx';
            theLogger.info('Set ws_AIPredict to:' + predictWS);
        }
        
        let mode = 'v2';
        if (mode=='v2') {
            let call_func = null;
            if (search_type==0) {
                window.loading('show');
                theWebServices.AiPredcitWS.getDocByKeywords(predictWS, envConfig.orgNo, query_key_list)
                .then(function(rslt) {
                    // reset sim_doc_list
                    // reset Dept-dropdown list
                    // reset right_pane content...
                    var simDocData = null;
                    var isQuerySuccess = false;
                    if ('simDocData' in rslt && rslt.simDocData != null) {
                        simDocData = rslt.simDocData;
                        if ('IsSuccess' in simDocData && simDocData.IsSuccess) {
                            isQuerySuccess = true;
                        }
                    }

                    if (isQuerySuccess && 'KeywordsDocInfo' in simDocData && simDocData.KeywordsDocInfo.length>0) {
                        var new_sim_doc_list = _reset_sim_doc_list(window.rcvDocInfo, query_key_list, rslt, mode);
                        if (new_sim_doc_list.length) {
                            rcvDocInfo.simDocIndex = 0;
                            rcvDocInfo.sim_doc_list = new_sim_doc_list;
                            rcvDocInfo.active_doc_list = []

                            // 更新filter values
                            window.envConfig.doc_corr_filter = [0, 1, 2, 3, 5];

                            _update_incharge_ou_select('#top_tool_bar select#incharge_ou', rcvDocInfo.sim_doc_list);
                            viewSimDoc(rcvDocInfo.simDocIndex);

                            // 2025.6.18 - 更新左方窗格的關鍵詞清單
                            var topic = $('#topic').prop("value");
                            var keywords = $('#key_words').prop("value");
                            if (topic.length>0) {
                                keywords = topic + ';' + keywords;
                            }
                            leftModel.highlight(keywords);
                        }
                        else {
                            alert('更新相關公文清單作業失敗!');
                        }
                    }
                    else {
                        alert('查無相關公文!');
                    }

                    window.loading('hide');
                })
                .fail(function(errText) {
                    window.loading('hide');
                    alert(errText);
                });
            }
            else {
                window.loading('show');
                theWebServices.AiPredcitWS.getDocBySimilarKeywords(predictWS, envConfig.orgNo, query_key_list, search_target)
                .then(function(rslt) {
                    var simDocData = null;
                    var isQuerySuccess = false;
                    if ('simDocData' in rslt && rslt.simDocData != null) {
                        simDocData = rslt.simDocData;
                        if ('IsSuccess' in simDocData && simDocData.IsSuccess) {
                            isQuerySuccess = true;
                        }
                    }

                    if (isQuerySuccess && 'KeywordsDocInfo' in simDocData && simDocData.KeywordsDocInfo.length>0) {
                        // reset sim_doc_list
                        // reset Dept-dropdown list
                        // reset right_pane content...
                        var new_sim_doc_list = _reset_sim_doc_list(window.rcvDocInfo, query_key_list, rslt, mode);
                        if (new_sim_doc_list.length) {
                            rcvDocInfo.simDocIndex = 0;
                            rcvDocInfo.sim_doc_list = new_sim_doc_list;
                            rcvDocInfo.active_doc_list = []

                            // 更新filter values
                            window.envConfig.doc_corr_filter = [0, 1, 2, 3, 5];

                            _update_incharge_ou_select('#top_tool_bar select#incharge_ou', rcvDocInfo.sim_doc_list);
                            viewSimDoc(rcvDocInfo.simDocIndex);

                            // 2025.6.18 - 更新左方窗格的關鍵詞清單
                            var topic = $('#topic').prop("value");
                            var keywords = $('#key_words').prop("value");
                            if (topic.length>0) {
                                keywords = topic + ';' + keywords;
                            }
                            leftModel.highlight(keywords);
                        }
                        else {
                            alert('更新相關公文清單作業失敗!');
                        }
                    }
                    else {
                        alert('查無相關公文!');
                    }
                    window.loading('hide');
                })
                .fail(function(errText) {
                    alert(errText);
                    window.loading('hide');
                });
            }
        }
        else {
            theWebServices.AiPredcitWS.getDocKeyphrases(envConfig.ws_AIPredict, envConfig.orgNo, query_key_list)
            .then(function(rslt) {
                // reset sim_doc_list
                // reset Dept-dropdown list
                // reset right_pane content...
                var new_sim_doc_list = _reset_sim_doc_list(window.rcvDocInfo, query_key_list, rslt, mode);
                if (new_sim_doc_list.length) {
                    rcvDocInfo.simDocIndex = 0;
                    rcvDocInfo.sim_doc_list = new_sim_doc_list;
                    rcvDocInfo.active_doc_list = []
                    _update_incharge_ou_select('#top_tool_bar select#incharge_ou', rcvDocInfo.sim_doc_list);
                    viewSimDoc(rcvDocInfo.simDocIndex);
                }
            })
            .fail(function(errText) {
                alert(errText);
            });
        }
    });

    // 下一筆
	$("#btn_next_doc").on("click", function() {
        var thisSimDoc = rcvDocInfo.sim_doc_list[rcvDocInfo.simDocIndex];
        var docIndex = _getDocIndex(thisSimDoc.DocNo, false);
        var nextDocIndex = -1;
        if (rcvDocInfo.active_doc_list.length) {
            var activeIdx = _getDocIndex(thisSimDoc.DocNo, true);
            if (activeIdx!=-1 && activeIdx<(rcvDocInfo.active_doc_list.length-1)) {
                var nextSimDoc = rcvDocInfo.active_doc_list[activeIdx+1]
                nextDocIndex = _getDocIndex(nextSimDoc.DocNo, false);
            }
        }
        else {
            nextDocIndex = docIndex + 1;
        }

        if (nextDocIndex!=-1) {
            viewSimDoc(nextDocIndex)
        }
	});

	// 上一筆
	$("#btn_prev_doc").on("click", function() {
        var thisSimDoc = rcvDocInfo.sim_doc_list[rcvDocInfo.simDocIndex];
        var docIndex = _getDocIndex(thisSimDoc.DocNo, false);
        var prevDocIndex = -1;
        if (rcvDocInfo.active_doc_list.length) {
            var activeIdx = _getDocIndex(thisSimDoc.DocNo, true);
            if (activeIdx>0) {
                var prevSimDoc = rcvDocInfo.active_doc_list[activeIdx-1]
                prevDocIndex = _getDocIndex(prevSimDoc.DocNo, false);
            }
        }
        else {
            prevDocIndex = docIndex - 1;
        }

        if (prevDocIndex!=-1) {
            viewSimDoc(prevDocIndex)
        }
	});
	
	// 關鍵字highlight
	$('#highlight').on('click', function() {
        // 2024.8.22 - 補上topic
        var topic = $('#topic').prop("value");
		var keywords = $(this).parent().find("input").val();
        if (topic.length>0) {
            keywords = topic + ';' + keywords;
        }

		leftModel.highlight(keywords);
		rightModel.highlight(keywords);
	});

    // Eric, 改成Configurable
    // var sUrl = 'https://moivip.fdat.com.tw/AK/aki800.aspx?SAMLart=' + localStorage.Artifact + 
    //               '&AIType=' + sAIType + '&AIWord=' + encodeURI(sKeyWords);

    window.loading('show');

	// 2024.11.24 - 取消藏語意檢索UI
    // 2024.8.12 - 預設藏語意檢索UI
    //if ('dev_show_sematic_search_ui' in localStorage && localStorage.dev_show_sematic_search_ui=='1') {
        let $chkSematicSearch = $('#top_tool_bar #radio-2');
        $chkSematicSearch.show();
        $chkSematicSearch.next().show();
    //}

    var callTestUrl = true;

    var site = 'AK'
    window.envConfig = {
        doc_corr_filter: [0, 0.5, 0.625, 0.75, 0.85],
        ws_AIPredict: '',
        orgNo: '',
        aki800Url: window.location.origin + '/' + site + '/aki800.aspx',
        aki801Url: window.location.origin + '/' + site + '/aki801.aspx',
        sortBy: 'SimValue', // SimValue / MostDept
    }
    
    window.rcvDocInfo = {
        docId: '',
        simDocIndex: -1,
        sim_doc_list: [],
        active_doc_list: []
    }

    var defaultSimDocNo = '';
    if (!!parent) {
        var theSSO = null;
        if ('theSSO' in parent && 'User' in parent.theSSO) {
            theSSO = parent.theSSO;
        }
        else if ('opener' in parent && 'opener' in parent && parent.opener!=null && 'theSSO' in parent.opener) {
            theSSO = parent.opener.theSSO;
        }

        if (!!theSSO) {
            envConfig.ws_AIPredict = theSSO.User.SystemSets.get("AI_WS_URL");

            // { 'OrgNo': 'xxxx', 'DocId': 'xxxxx', 'defaultDocNo': 'xxxxx' }
            _rcvDocObj = parent.window.GetDocCompareId()
            envConfig.orgNo = _rcvDocObj.OrgNo
            rcvDocInfo.docId = _rcvDocObj.DocId
            defaultSimDocNo = _rcvDocObj.defaultDocNo;
        }
        else {
            //var ws_url = opener.theSSO.User.SystemSets.get('WS_AIPREDICT')
            envConfig.ws_AIPredict = 'https://win10test01.fdat.com.tw/ImgConvert/AiPredictWS.asmx';
            envConfig.orgNo = '301000000A';
            rcvDocInfo.docId = '1130149995';
        }
    }
    else {
        //var ws_url = opener.theSSO.User.SystemSets.get('WS_AIPREDICT')
        envConfig.ws_AIPredict = 'https://win10test01.fdat.com.tw/ImgConvert/AiPredictWS.asmx';
        envConfig.orgNo = '301000000A';
        rcvDocInfo.docId = '1130149995';
    }

    if (defaultSimDocNo!='') {
        var leftModel = new DIModelView(), rightModel = new DIModelView();
        theWebServices.AiPredcitWS.getSimilarDocInfo(envConfig.ws_AIPredict, envConfig.orgNo, rcvDocInfo.docId)
        .then(function(rslt) {
            // 初始化來文/相似公文清單內容
            initObj = parseSimDocInfo(envConfig.orgNo, rcvDocInfo.docId, rslt.rcvDocSimInfo);
            rcvDocInfo.sim_doc_list = initObj.sim_doc_list;

            var addExtraDoc = false;
            if (envConfig.ws_AIPredict.includes('win10test01.fdat.com.tw')) {
                addExtraDoc = false;
            }
            setupDocInfrData(rcvDocInfo, initObj.rcv_doc_info, addExtraDoc);

            if (defaultSimDocNo!='') {
                rcvDocInfo.simDocIndex = 0; // 全域變數...
                for (var i=0; i<rcvDocInfo.sim_doc_list.length; i++) {
                    var sim_doc = rcvDocInfo.sim_doc_list[i];
                    if (sim_doc.DocNo == defaultSimDocNo) {
                        rcvDocInfo.simDocIndex = i;
                        break;
                    }
                }
            }

            // 初始化控制項
            window.sim_doc_dept_list = _update_incharge_ou_select('#top_tool_bar select#incharge_ou', rcvDocInfo.sim_doc_list);

            // 關鍵詞顯示, 預設顯示一個主題+3個關鍵詞
            _initKeywordsEditor(rcvDocInfo);

            // DI檢視物件
            // class name: DIModelView
            // 初始化 	- init(本文區viewPort, 縮放控制項的select, 縮放控制項的-鈕, 縮放控制項的+鈕)
            // 載入DI檔 - load(WebFileIOUrl, Server上的子目錄路徑, DI檔名)
            leftModel.init($("#doc_left .viewPort"), $("#doc_left #zoomSelect"), $("#doc_left #zoomOut"), $("#doc_left #zoomIn"));
            rightModel.init($("#doc_right .viewPort"), $("#doc_right #zoomSelect"), $("#doc_right #zoomOut"), $("#doc_right #zoomIn"));
            
            // 測WebService叫用
            AiPredictWSUrl = envConfig.ws_AIPredict //'https://win10test01.fdat.com.tw/ImgConvert/AiPredictWS.asmx' // https://win10test01.fdat.com.tw/ImgConvert/ImgConvertWS.asmx
            return theWebServices.AiPredcitWS.getDIInfo(AiPredictWSUrl, envConfig.orgNo, rcvDocInfo.docId, '1')
        })
        .then(function(rslt) {
            var wfio = rslt.fileData.fileIOWS //"https://DOCFILE.FDAT.COM.TW/WebFileIo_219/T2100FileIOService.asmx";
            return leftModel.load(wfio, rslt.fileData.filePath, rslt.fileData.diFileName);
        })
        .then(function(mdl) {
            viewSimDoc(rcvDocInfo.simDocIndex);

            // 2024.8.22 - 補上topic
            var topic = $('#topic').prop("value");
            var keywords = $('#key_words').prop("value");
            if (topic.length>0) {
                keywords = topic + ';' + keywords;
            }
            
            // 2024.6.30 - 須在DIModelView.load完成後叫用!
            leftModel.highlight(keywords);

            window.loading('hide');
        })
        .fail(function(errText) {
            alert(errText);
            window.loading('hide');
        });
    }
    else {
        // 初始化控制項
        rcvDocInfo.sim_doc_list = sim_doc_list;
        window.sim_doc_dept_list = _update_incharge_ou_select('#top_tool_bar select#incharge_ou', rcvDocInfo.sim_doc_list);

        // 關鍵詞顯示, 預設顯示一個主題+3個關鍵詞
        _initKeywordsEditor(rcvDocInfo);

        // DI檢視物件
        // class name: DIModelView
        // 初始化 	- init(本文區viewPort, 縮放控制項的select, 縮放控制項的-鈕, 縮放控制項的+鈕)
        // 載入DI檔 - load(WebFileIOUrl, Server上的子目錄路徑, DI檔名)
        var leftModel = new DIModelView(), rightModel = new DIModelView();
        leftModel.init($("#doc_left .viewPort"), $("#doc_left #zoomSelect"), $("#doc_left #zoomOut"), $("#doc_left #zoomIn"));
        rightModel.init($("#doc_right .viewPort"), $("#doc_right #zoomSelect"), $("#doc_right #zoomOut"), $("#doc_right #zoomIn"));
        
        // 左側檢視DI
        //leftModel.load(wfio, "D:\\FILESRV_DATA_219\\FILE_PATH\\upload\\301000000A\\11112\\29\\1119989999\\Receive", "ZG1061004009.DI")
        //var wfio = rcv_doc_di_file_data.fileIOWS //"https://DOCFILE.FDAT.COM.TW/WebFileIo_219/T2100FileIOService.asmx";
        //leftModel.load(wfio, rcv_doc_di_file_data.filePath, rcv_doc_di_file_data.diFileName)

        // 測WebService叫用
        AiPredictWSUrl = 'https://win10test01.fdat.com.tw/ImgConvert/AiPredictWS.asmx' // https://win10test01.fdat.com.tw/ImgConvert/ImgConvertWS.asmx
        theWebServices.AiPredcitWS.getDIInfo(AiPredictWSUrl, envConfig.orgNo, rcvDocInfo.docId, '1')
        .then(function(rslt) {
            var wfio = rslt.fileData.fileIOWS //"https://DOCFILE.FDAT.COM.TW/WebFileIo_219/T2100FileIOService.asmx";
            return leftModel.load(wfio, rslt.fileData.filePath, rslt.fileData.diFileName);
        })
        .then(function(mdl) {
            // 2024.8.22 - 補上topic
            var topic = $('#topic').prop("value");
            var keywords = $('#key_words').prop("value");
            if (topic.length>0) {
                keywords = topic + ';' + keywords;
            }

            // 2024.6.30 - 須在lefModel.load完成後!
            leftModel.highlight(keywords);

        })
        .fail(function(errText) {
            alert(errText);
            window.loading('hide');
        });

        rcvDocInfo.simDocIndex = 0; // 全域變數...
        viewSimDoc(rcvDocInfo.simDocIndex);
        window.loading('hide');
    }
});