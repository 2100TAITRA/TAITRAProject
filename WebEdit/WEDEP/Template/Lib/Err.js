var UnAllowEmpty	=  0;
var InFormatErr1	=  1;
var InFormatErr2	=  2;
var InFormatErr3	=  3;
var TimeOut1		=  4;
var TimeOut2		=  5;
var CodeErr		=  6;
var CustErr		=  7;
var NoData		=  8;
var NoExecPriv		=  9;
var ReadNoCtrlErr	= 10;
var CustMsg		= 11;
var PostOk		= 12;
var IsCancel		= 13;
var IsDelete		= 14;
var KeyExist		= 15;
var DelFault1	= 16
var DelOk		= 17
var	PrintOk1	=18
var StatisOk		= 19;
var CodeInUsed		= 20;

var MsgArr = new Array( "{0}不可為空白",
						"{0}{1}資料格式不正確。",
						"{0}資料格式不正確。",
						"{0}{1}格式不正確。\n{2}",
						"登入逾時。請重新登錄", 
						"登入逾時。取得使用者登錄資料錯誤", 
						"{0}{1}資料不存在。\n{2}",
						"{0}",
						"無符合條件資料。",
						"您無權限執行本程式。",
						"取得{0}作業失敗。\n請稍後再試。",
						"{0}",
						"存檔完成", 
						"確定要放棄嗎? \n選擇’確定’本次異動資料將會遺失。",
						"確定刪除{0}此筆資料?\n刪除徵資料將會遺失。",
						"您輸入的資料已存在。\n確定要存檔嗎?",
						"您要刪除的資料不存在。刪除失敗。",
						"刪除完成。",
						"資料已輸出至印表機。",
						"資料統計完成!!",
						"{0}代碼:{0}有其他資料使用中，不允許刪除"
						);

function jf_GetErrMsg(argMsgName)
{
	return MsgArr[argMsgName];
}