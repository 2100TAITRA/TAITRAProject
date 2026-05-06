function GetFiles(folderspec,type)
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	//取得檔案
	var f, items, item, i;
	files = new Array();

	f = fso.GetFolder(folderspec);
	items = new Enumerator(f.files);
	i = 0;
	
	while (!items.atEnd())
	{
		item = items.item();
		files[i++] = item.Name;
		items.moveNext();
	}
	files = files.sort();
	return files;
}

var L_CANCEL_TEXT = "取消";
var L_INSERT_TEXT = "插入";
var L_LINKIMGBORDER_TEXT = "在影像連結外圍顯示邊框";
var L_LINKSELECT_TEXT = "選擇一社群網頁： ";
var L_LINKSELECTPAGE_TEXT = "選擇網頁";
var L_LINKWEB_TEXT = "或是在網頁上輸入 URL： ";
var L_PUTITLEBGCOLOR_TEXT = "設定背景顏色";
var L_PUTITLEFONTFACE_TEXT = "設定字型";
var L_PUTITLEFONTSIZE_TEXT = "設定字型大小";
var L_PUTITLEIMAGE_TEXT = "插入 / 編輯影像";
var L_PUTITLELINK_TEXT = "插入 / 編輯連結";
var L_PUTITLENEWTABLE_TEXT = "建立 / 編輯表格";
var L_PUTITLEPARAGRAPHSTYLE_TEXT = "設定段落格式";
var L_PUTITLETEXTCOLOR_TEXT = "設定文字顏色";
var L_PUTITLEEMOTICON_TEXT = "插入表情符號";
var L_STYLEFORMATTED_TEXT = "有格式的";
var L_STYLEHEADING_TEXT = "標題 ";
var L_STYLENORMAL_TEXT = "正常";
var L_STYLESAMPLE_TEXT = "AaBb...  ";
var L_TABLEBG_TEXT = "背景";
var L_TABLEBORDERS_TEXT = "邊框";
var L_TABLEINPUTBGCOLOR_TEXT = "背景顏色： ";
var L_TABLEINPUTBGIMGURL_TEXT = "背景影像 URL： ";
var L_TABLEINPUTBORDER_TEXT = "邊框寬度： ";
var L_TABLEINPUTBORDERCOLOR_TEXT = "邊框顏色： ";
var L_TABLEINPUTCELLPADDING_TEXT = "儲存格與儲存格邊框之距離： ";
var L_TABLEINPUTCELLSPACING_TEXT = "儲存格與表格邊框之距離： ";
var L_TABLEINPUTCOLUMNS_TEXT = "欄： ";
var L_TABLEINPUTROWS_TEXT = "列： ";
var L_TABLEPADDINGANDSPACING_TEXT = "儲存格與儲存格及表格邊框之距離";
var L_TABLEROWSANDCOLS_TEXT = "列及欄";
var L_TABLEINSERTROW_TEXT = "插入列";
var L_TABLEINSERTCELL_TEXT = "插入欄";
var L_TABLEINSERT_TEXT = "插入表格";
var L_TABLEUPDATE_TEXT = "更新表格";
var L_TABLENEW_TEXT = "新表格";
var L_TABLEEDIT_TEXT = "編輯表格";
var L_TIPB_TEXT = "粗體";
var L_TIPBGCOLOR_TEXT = "背景顏色";
var L_TIPCJ_TEXT = "置中對齊";
var L_TIPCOPY_TEXT = "複製文字";
var L_TIPCUT_TEXT = "剪下文字";
var L_TIPDINDENT_TEXT = "減少縮排";
var L_TIPFGCOLOR_TEXT = "文字顏色";
var L_TIPFSIZE_TEXT = "字型大小";
var L_TIPFSTYLE_TEXT = "字型";
var L_TIPI_TEXT = "斜體";
var L_TIPIINDENT_TEXT = "增加縮排";
var L_TIPLINE_TEXT = "插入橫線";
var L_TIPLINK_TEXT = "插入連結";
var L_TIPLJ_TEXT = "靠左對齊";
var L_TIPOL_TEXT = "數字清單";
var L_TIPP_TEXT = "段落格式";
var L_TIPPASTE_TEXT = "貼上文字";
var L_TIPPICTURE_TEXT = "插入圖片";
var L_TIPRJ_TEXT = "靠右對齊";
var L_TIPTABLE_TEXT = "插入表格";
var L_TIPU_TEXT = "底線";
var L_TIPUL_TEXT = "項目符號清單";
var L_TIPEMOTICON_TEXT = "表情符號";
var L_MODETITLE_TEXT = "進階 HTML 模式";
var L_MODETITLE_TEXT = "使用 HTML 建立您的網頁";
var L_MODEDESC_TEXT = " - 直接編輯 HTML 格式化指令。";
var L_CUSTOMFONT_TEXT = "其他字型...";
var L_CUSTOMFONTENTRY_TEXT = "輸入您的字型名稱：";
var L_SAMPLEFONTENTRY_TEXT = "新細明體, 細明體, Mingliu";
var L_CLOSEBUTTON_TEXT = "x";
var L_PHOTOURL_TEXT = "http://g.msn.com/1HMBTW/4496??PS=&DI=1058";
var L_TBDATABINDING_TEXT = "欄";
var L_TBDATALABEL_TEXT   = '在選取欄中新增替代符號';
var L_DEFAULT_BODY_STYLE = "FONT-SIZE:9pt;FONT-FAMILY:Pmingliu, mingliu, sans-serif";
var L_DEFAULTHTML_TEXT = "<DIV></DIV>";
// List of emoticon gifs. Add or remove to change selection
// arBigEmoticons - 16x16 pixels
var L_EMOTICONPATH_TEXT = "../IMAGE/";
var arBigEmoticons = new Array();
//var arBigEmoticons = new Array("i.p.embeer.gif","i.p.emclock.gif","i.p.emcocktl.gif","i.p.emcoffee.gif","i.p.emcool.gif","i.p.emcrook.gif","i.p.emcry.gif","i.p.emdgust.gif","i.p.ememail.gif","i.p.emfemale.gif","i.p.emgift.gif","i.p.emlips.gif","i.p.emlove.gif","i.p.emmale.gif","i.p.emmessag.gif","i.p.emmusic.gif","i.p.emphone.gif","i.p.emphoto.gif","i.p.emrose.gif","i.p.emsad.gif","i.p.emsmile.gif","i.p.emsmiled.gif","i.p.emsmileo.gif","i.p.emsmilep.gif","i.p.emthdown.gif","i.p.emthup.gif","i.p.emunlove.gif","i.p.emvamp.gif","i.p.emwink.gif");
var arBigEmoticons = new Array(
"001.gif","002.gif","003.gif","004.gif","005.gif","006.gif",
"007.gif","008.gif","009.gif","010.gif","011.gif","012.gif",
"013.gif","014.gif","015.gif","016.gif","017.gif","018.gif",
"019.gif","020.gif","25.gif","26.gif","27.gif","28.gif",
"29.gif","30.gif","31.gif","32.gif","33.gif","34.gif",
"35.gif","36.gif","37.gif","38.gif","39.gif","40.gif"
);
/*
var loc = window.location+"";
loc = loc.substring("file:///".length, loc.lastIndexOf("/"));
var arBigEmoticons = GetFiles(loc + "/littleImages/", "");
*/
//var arBigEmoticons = GetFiles("D:\\Project\\WM\\SRC\\WM1\\littleImages", "");
// Customize Font List
// FONTNAME_TEXT - Displayed in the pop-up
// FONTNAMEDEF_TEXT - The font definition used in the HTML
var L_FONTLABELREGULAR_TEXT = "標楷體";
var L_FONTARIAL_TEXT = "Arial";
var L_FONTARIALDEF_TEXT = "Geneva, Arial, Sans-serif";
var L_FONTARIALBLACK_TEXT = "Arial Black";
var L_FONTARIALBLACKDEF_TEXT = "Arial Black, Geneva, Arial, Sans-serif";
var L_FONTCOURIERNEW_TEXT = "Courier New";
var L_FONTCOURIERNEWDEF_TEXT = "Courier New, Courier, Monospace";
var L_FONTTIMESNEWROMAN_TEXT = "Times New Roman";
var L_FONTTIMESNEWROMANDEF_TEXT = "Times New Roman, Times, Serif";
var L_FONTVERDANA_TEXT = "Verdana";
var L_FONTVERDANADEF_TEXT = "Verdana, Geneva, Arial, Sans-serif";
var L_LUCIDAHAND_TEXT = "Lucida Handwriting";
var L_LUCIDAHANDDEF_TEXT = "Lucida Handwriting, Cursive";
var L_GARAMOND_TEXT = "Garamond";
var L_GARAMONDDEF_TEXT = "Garamond, Times, Serif";
var L_WEBDINGS_TEXT = "Webdings";
var L_WEBDINGSDEF_TEXT = "Wingdings";
var L_WINGDINGS_TEXT = "Wingdings";
var L_WINGDINGSDEF_TEXT = "Webdings";
// Add/ Remove fonts by modifying array
// _CFont(Definition, Display Text, Symbol)
// Set Symbol=true for non-alphabetic fonts to append display text in default font to the sample string
function _CFont(szDef,szText,bSymbol) {
return new Array(szDef,szText,bSymbol);
};
defaultFonts = new Array();
defaultFonts[defaultFonts.length] = _CFont(L_FONTLABELREGULAR_TEXT, L_FONTLABELREGULAR_TEXT, false);
defaultFonts[defaultFonts.length] = _CFont(L_FONTARIALDEF_TEXT, L_FONTARIAL_TEXT, false);
//defaultFonts[2] = _CFont(L_FONTARIALBLACKDEF_TEXT, L_FONTARIALBLACK_TEXT, false);
//defaultFonts[3] = _CFont(L_FONTVERDANADEF_TEXT, L_FONTVERDANA_TEXT, false);
defaultFonts[defaultFonts.length] = _CFont(L_FONTTIMESNEWROMANDEF_TEXT, L_FONTTIMESNEWROMAN_TEXT, false);
defaultFonts[defaultFonts.length] = _CFont(L_GARAMONDDEF_TEXT,L_GARAMOND_TEXT, false);
//defaultFonts[6] = _CFont(L_LUCIDAHANDDEF_TEXT,L_LUCIDAHAND_TEXT, false);
//defaultFonts[7] = _CFont(L_FONTCOURIERNEWDEF_TEXT, L_FONTCOURIERNEW_TEXT, false);
//defaultFonts[8] = _CFont(L_WEBDINGSDEF_TEXT, L_WEBDINGS_TEXT, true);
//defaultFonts[9] = _CFont(L_WINGDINGSDEF_TEXT, L_WINGDINGS_TEXT, true);

// Width of each toolbar button
// Entry 5-8 are specify "Paragraph","Font Style", and "Font Size" respectively
// Update widths if localized
var L_TOOLBARGIF_TEXT = "./i.p.rte_tbTW.gif";
var PHOTO_URL = L_PHOTOURL_TEXT
//var aIds = new Array("  ,"bar1","formatbl"      "bar3"  "bar4","      ","bar5",","image","bar6","textcolor","bar7")
var aSizes = new Array(25,25,25,7,54,48,71,7,25,25,25,8,25,25,25,8,25,25,25,25,8,25,25,25,8,25);