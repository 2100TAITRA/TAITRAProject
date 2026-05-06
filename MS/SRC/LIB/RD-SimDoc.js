/* jshint -W100 */


/* 獨立檢閱公文/來文內容分頁, 內嵌AOL/UniView */
(function($) {
// 2013.3.4 - 實作 SimDocUtil
    if (typeof window.SimDocUtil === 'undefined') {
        window.SimDocUtil = {
            calc_k_sim : function(docVector1, docVector2) {
                if (docVector1.length==docVector2.length) {
                    var simDocMeasurements = []
                    for (var i=0; i<docVector1.length; i++) {
                        var _item = {
                            docA: docVector1[i],
                            docB: docVector2[i]
                        }
                        simDocMeasurements.push(_item)
                    }
                    var simDocVars = {
                        docA: 'ordinal',
                        docB: 'ordinal'
                    };
                    
                    var stats = new Statistics(simDocMeasurements, simDocVars);
                    var kendall = stats.kendallsTau('docA', 'docB');
                    var k_sim = kendall.a.tauA;
                    return k_sim;
                }
                return 0.0
            },
            calc_corr_value : function(rcvDocVector, keywords, sim_doc_info_list) {
                // {KeyWord:'賽夏族歲時祭儀', Weight:0, WordVector: [], Type:'topic'},
                let topic = '';
                let key_word_list = [];
                for (let i=0; i<keywords.length; i++) {
                    let key_word = keywords[i];
                    let sKeyWord = key_word.KeyWord
                    if (key_word.Type=='topic') {
                        topic = sKeyWord;
                    } 
                    else {
                        key_word_list.push(key_word)
                    }
                }
            
                //'KeyPhraseList': [
                //        {'KeyWord': '主要', 'Weight': 0.8, 'Type': 'topic', 'WordVector': [...]}, 
                //        {'KeyWord': '次要', 'Weight': 0.5, 'Type': 'subtopic', 'WordVector': [...]}]
            
                // topic相同: +0.125
                // topic與keyword相同: +0.075
                // keyword與keyword相同: +.0.05
            
                let new_list = []
                for (let i=0; i<sim_doc_info_list.length; i++) {
                    let _sim_doc = { ...sim_doc_info_list[i] }

                    let sim_value = SimDocUtil.calc_k_sim(rcvDocVector, _sim_doc.DocVector);

                    let _sdoc_key_word_list = _sim_doc['KeyPhraseList']
                    let extra_score = 0.0
                    for (let j=0; j<_sdoc_key_word_list.length; j++) {
                        let key_phrase = _sdoc_key_word_list[j];
                        if (topic.length && key_phrase.KeyWord==topic) {
                            if (key_phrase.Type=='topic') {
                                extra_score += 0.125;
                            }
                            else {
                                extra_score += 0.075;
                            }
                        }
                        else {
                            extra_score += 0.05
                        }
                    }
                    let corr_value = sim_value + extra_score
                    if (corr_value > 1.0) {
                        corr_value = 1.0
                    }
                    _sim_doc.SimValue = sim_value;
                    _sim_doc.CorrValue = corr_value;
                    new_list.push(_sim_doc)
                }
                return new_list;
            },
            calc_corr_value_v2 : function(keywords, query_key_list, sim_doc_info_list) {
                // KeywordsDocInfo[n] => KeyPhraseList

                // KeyPhraseList: ["資格條件","甄選簡章","總隊現有工友缺額"],

                // 區分topic/keywords
                let str_topic = '';
                for (let i=0; i<keywords.length; i++) {
                    let key_word = keywords[i];
                    let sKeyWord = key_word.KeyWord
                    if (key_word.Type=='topic') {
                        str_topic = sKeyWord;
                        break;
                    }
                }
    
                //'KeyPhraseList': [
                //        {'KeyWord': '主要', 'Weight': 0.8, 'Type': 'topic', 'WordVector': [...]}, 
                //        {'KeyWord': '次要', 'Weight': 0.5, 'Type': 'subtopic', 'WordVector': [...]}]
            
                // str_topic相同: +0.125
                // str_topic與keyword相同: +0.075
                // keyword與keyword相同: +.0.05
            
                let new_list = []
                for (let i=0; i<sim_doc_info_list.length; i++) {
                    let _sim_doc = { ...sim_doc_info_list[i] }

                    let keyPhraseList = _sim_doc.KeyPhraseList;

                    let extra_score = 0
                    for (let j=0; j<keyPhraseList.length; j++) {
                        let skeyPhrase = keyPhraseList[j];
                        if (str_topic.length) {
                            if (skeyPhrase==str_topic || skeyPhrase.includes(str_topic)) {
                                extra_score += 3; // topic符合加3分
                            }
                        }
                        else {
                            extra_score += 1; // 關鍵字符合加1分
                        }
                    }
                    let corr_value = extra_score
                    if (corr_value > 5) {
                        corr_value = 5
                    }
                    _sim_doc.SimValue = 0.0;
                    _sim_doc.CorrValue = corr_value;

                    // 2025.7.23 - 退輔會上線問題序160 (機關序57) - 以關鍵詞搜尋取得相關公文時, 主題欄位沒有顯示內容問題修正.
                    // change _sim_doc.KeyPhraseList to return item's DocKeyPhraseList
                    if (_sim_doc.hasOwnProperty('KeyPhraseList')) {
                        delete _sim_doc.KeyPhraseList;
                        _sim_doc.KeyPhraseList = _sim_doc.DocKeyPhraseList;
                        delete _sim_doc.DocKeyPhraseList;
                    } 
                    new_list.push(_sim_doc)
                }
                return new_list;
            }
        }
    }
})(jQuery);