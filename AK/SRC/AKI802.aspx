<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKI802.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI802" ValidateRequest="false" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKI802 檔案目錄明細瀏覽</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="LIB/AK.css">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body oncontextmenu="event.returnValue=false" ms_positioning="GridLayout">
    <form id="AKI802" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <!-- 2016.8 - Leslie 補上報表顯示所需要的框架DIV -->
        <div id="dlgASPXPage" style="display: none; width: 99%; height: 99%; padding: 0px;">
            <div class="pane" style="width: 101%; height: 101%; overflow-y: hidden; overflow-x: hidden; -webkit-overflow-scrolling: touch;">
                <iframe class="aspx_page_content" style="width: 99%; height: 99%;"></iframe>
            </div>
            <a class="closeBtn" style="display: none"></a>
        </div>
        <!-- <div id="dlgASPXPage" ... -->
        <div class="BaseTable">
            <div class="DivTable" style="border-style: solid">
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:CheckBox ID="cbSELECT" onclick="SelectItem('DOC_CHECK')" runat="server" CssClass="InputFieldText"
                            Text="線上調檔或申請調檔，請勾選左方核選按鈕" BackColor="Info"></asp:CheckBox>
                        <asp:Label ID="lbSEQ_NO" runat="server" CssClass="hidden">1.</asp:Label>
                    </div>
                </div>
                <div class="dTR" style="border-style: solid">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label3" runat="server">文(編)號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 13em">
                        <div class="dTD">
                            <asp:Button ID="btOpenEdit" runat="server" Text="文稿編輯" Enabled="False"></asp:Button>
                            <asp:Button ID="btElcFile" runat="server" Text="來文電子檔" Enabled="False"></asp:Button>
                            <asp:Button ID="btShowOldInfo" runat="server" CssClass="hide" Text="瀏覽舊公文" Enabled="False"></asp:Button>
                            <asp:Button ID="btGetDeSecret" runat="server" CssClass="hide" Text="解密電子檔" Enabled="False"></asp:Button>
                            <asp:Button ID="btRefOther" runat="server" CssClass="hide" Text="其他參考檔案"></asp:Button>
                            <asp:Button ID="btTAFile" runat="server" CssClass="hide" Text="任審發文檔案"></asp:Button>
                            <asp:TextBox ID="H_txTAGuid" runat="server" CssClass="hide"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label Style="text-align: right" ID="Label49" runat="server">簽核類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:Label ID="lbSignType" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label5" runat="server">收(創)文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:Label ID="lbRCV_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label2" runat="server">公文狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:Label ID="lbDOC_STATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label Style="text-align: right" ID="Label46" runat="server">目前位置：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:Label ID="lbCURR_LOCATION" runat="server"></asp:Label>
                        <asp:TextBox ID="txCANCEL_REASON" runat="server" CssClass="PopUp" ReadOnly="True" Visible="False" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label4" runat="server">來文者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:TextBox ID="txFromOrg" runat="server" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine" Width="40em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label6" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:Label ID="lbFROMORG_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label7" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="txFromNo" runat="server" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine" Width="20em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label38" runat="server">上級收文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label ID="lbSRC_RCV_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="text-align: right" ID="Label45" runat="server">上級收文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txDOC_RCV_NO" runat="server" CssClass="TextLabel" Width="10em" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="text-align: right" ID="Label84" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:Label ID="lbBTypeName" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label47" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:Label ID="lbDocProperty" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label48" runat="server">關鍵字：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txKEY_WORD" runat="server" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="lbTitleCaseNo" runat="server">案件編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbCaseNo" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label8" runat="server">本別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:Label ID="lbTYPE_NAME" runat="server">正本</asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label11" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:Label ID="lbSEC_NAME" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 13em">
                        <asp:Label Style="text-align: right" ID="Label9" runat="server">文　　別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:Label ID="lbCATEGORY" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label10" runat="server">速別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:Label ID="lbSPEED" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label28" runat="server">起算日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbSTART_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="text-align: right" ID="Label44" runat="server">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbDUE_DATE" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label50" runat="server">密件流水號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em; min-width: 1px;">
                        <asp:Label ID="lbSEC_SEQ" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label60" runat="server">原始限辦日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbPDUE_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label85" runat="server">點收日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbAcpDate" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label51" runat="server">結案種類：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:Label ID="lbCloseType" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label53" runat="server">續辦：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbCaseCon" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label Style="text-align: right" ID="Label52" runat="server">發文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label ID="lbIssueProperty" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label54" runat="server">展期次數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:Label ID="lbSEXT_TIMES" runat="server"></asp:Label>
                    </div>
                </div>
                <div style="width: 100%; height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label12" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:Label ID="lbSUBJECT" runat="server" Width="40em"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label13" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label15" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="lbCloseDateTitle" runat="server">辦畢日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="lbCLOSE_DATE" runat="server"></asp:Label><br>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label70" runat="server">權責單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:Label ID="lbRpsdeptName" runat="server"></asp:Label>
                    </div>
                    <div class="hide">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label74" runat="server">權責承辦人：</asp:Label>
                    </div>
                    <div class="hide" style="width: 9em">
                        <asp:Label ID="lbRpsEmpname" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label63" runat="server">核決時間：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label Style="z-index: 0" ID="lbAPPROVED_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="text-align: right" ID="lbAppUsernameTitle" runat="server">核決者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbAppUsername" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR MOCS_EXTRA" id="rowMOCS1">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label76" runat="server">姓名：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:Label ID="lbFullName" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 21em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label80" runat="server">身分證號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="lbFullPID" runat="server"></asp:Label><br>
                    </div>
                </div>
                <div class="SMEG_EXTRA" style="width: 100%; height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;">
                </div>
                <div class="dTR SMEG_EXTRA">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label19" runat="server">專案卡號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:Label ID="lbCCardNo" runat="server"></asp:Label>
                        <asp:Label ID="lbCCardName" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label72" runat="server">統一編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:Label Style="z-index: 0" ID="lbTaxIDNo" runat="server"></asp:Label>
                        <asp:Label Style="z-index: 0" ID="lbTaxIDName" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR SMEG_EXTRA">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label69" runat="server">列管編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:Label ID="lbManageNo" runat="server"></asp:Label>
                        <asp:Label ID="lbManageName" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label73" runat="server">銀行代碼：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:Label Style="z-index: 0" ID="lbBankNo" runat="server"></asp:Label>
                        <asp:Label Style="z-index: 0" ID="lbBankName" runat="server"></asp:Label>
                    </div>
                </div>
                <div style="width: 100%; height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label22" runat="server">發文者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:TextBox ID="txIssueOrg" runat="server" CssClass="PopUp" Height="22px" ReadOnly="True" TextMode="MultiLine" Width="40em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label23" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:Label ID="lbISSUE_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label24" runat="server">發文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 31em">
                        <asp:TextBox ID="txIssueNo" runat="server" CssClass="PopUp" ReadOnly="True" Width="30.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label20" runat="server">上級發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label ID="lbUPISSUE_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label27" runat="server">上級發文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 31em">
                        <asp:TextBox ID="lbUpIssueNo" runat="server" CssClass="PopUp" ReadOnly="True" Width="30.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label25" runat="server">受文者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:TextBox ID="txRcvOrg" runat="server" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine" Width="40em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="lbIssueUsernameTitle" runat="server">發文人員：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbIssueUsername" runat="server"></asp:Label>
                    </div>
                </div>
                <div style="width: 100%; height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label14" runat="server">併案情形：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label ID="lbComType" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label17" runat="server">相關案件文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbComNo" runat="server"></asp:Label>
                        <asp:CheckBox ID="cbComStatus" onclick="SelectItem('DOC_CHECK')" runat="server" Text="併件"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label16" runat="server">檔號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:Label ID="lbFileNo" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label56" runat="server">櫥位號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbStockNo" runat="server" Width="192px" Height="22px"></asp:Label>
                    </div>
                    <div class="dTDTitle MOCS_EXTRA" style="width: 21em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label77" runat="server">四角號碼：</asp:Label>
                    </div>
                    <div class="dTD MOCS_EXTRA" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="lb4CornerNo" runat="server"></asp:Label><br>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label21" runat="server">案名：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label ID="lbCASE_NAME" runat="server"></asp:Label>
                    </div>
                </div>
                <div style="width: 100%; height: 0.25px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label18" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.4em">
                        <asp:Label ID="lbKEEP_YEAR" runat="server">99</asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="lbTPDesDate" runat="server">擬銷毀日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbPDES_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="text-align: right" ID="Label57" runat="server">原密等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbOSecNo" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label30" runat="server">解密別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbRMVSEC_CODE" runat="server">歸檔後解密</asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label31" runat="server">降解密執行日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbRSEC_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="text-align: right" ID="Label26" runat="server">應用限制：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:Label ID="lbAPPLY_LIMIT" runat="server">開放</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label32" runat="server">解密條件：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:Label ID="lbRSEC_DESP" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label55" runat="server">應解密日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbExtRmvSec_Date" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label64" runat="server">清理處置：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="lbClearProc" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label65" runat="server">調整後清理處置：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="lbNClearProc" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label29" runat="server">文件產生日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:Label ID="lbRCV_DATE2" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label33" runat="server">歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:Label ID="lbFILE_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label Style="text-align: right" ID="Label71" runat="server">點收日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbFileDate2" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label34" runat="server">檔案數量：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbFILE_CNT" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="text-align: right" ID="Label61" runat="server">調整後保存年限：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbNewKeepYear" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="text-align: right" ID="Label62" runat="server">調整原因：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbChangeKeepYearReason" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR" id="trRcvFile">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label58" runat="server">併同歸檔數量：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="lbIsRcvFile" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label59" runat="server">併同歸檔原因：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox Style="z-index: 0" ID="txRcvFileReason" runat="server" CssClass="PopUp" TextMode="MultiLine" ReadOnly="True" Width="30.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label86" runat="server">點收人員：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbAcpUsername" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label116" runat="server">編目人員：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="lbInpFileUser" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label117" runat="server">編目日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label Style="z-index: 0" ID="lbInpFileDate" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0; text-align: right" ID="Label75" runat="server">入庫保管日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label Style="z-index: 0" ID="lbStoreDate" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label35" runat="server">電子媒體編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbVolume" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label Style="text-align: right" ID="Label36" runat="server">副版電子媒體編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbVolume2" runat="server"></asp:Label>
                    </div>
                </div>
                <div style="width: 100%; height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label37" runat="server">附註項：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:TextBox ID="txRemark" runat="server" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine" Width="40em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label39" runat="server">主題項：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:TextBox ID="txTheme" runat="server" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine" Width="40em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label40" runat="server">附件資訊：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:TextBox ID="txAttach" runat="server" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine" Width="40em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label41" runat="server">電子檔：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:TextBox ID="txFile" runat="server" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine" Width="40em"></asp:TextBox>
                        <asp:TextBox ID="H_txHasIMG" runat="server" CssClass="hide" Width="40em"></asp:TextBox>
                        <asp:TextBox ID="H_HASPRIV" runat="server" CssClass="hide" Width="40em"></asp:TextBox>
                    </div>
                </div>
                <div style="width: 100%; height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label Style="text-align: right" ID="lbTDesDate" runat="server">銷毀日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label ID="lbDES_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label Style="text-align: right" ID="lbTDesDocNo" runat="server">核准銷毀文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbDES_DOCNO" runat="server"></asp:Label>
                    </div>
                </div>
                <div style="width: 100%; height: 0.25px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label42" runat="server">並列案由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:Label ID="lbAppSubject" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label43" runat="server">其他案由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:Label ID="lbOtherSubject" runat="server" Height="22px"></asp:Label>
                    </div>
                </div>
                <div style="width: 100%; height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label78" runat="server">借調狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbBorrowStatus" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label79" runat="server">借出單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbBorrowDeprName" runat="server" Height="22px"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label Style="text-align: right" ID="Label81" runat="server">借出人員：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbBorrowEMPNAME" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label Style="text-align: right" ID="Label82" runat="server">借出日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbBorrowDate" runat="server" Height="22px"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label Style="text-align: right" ID="Label83" runat="server">預計歸還日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbBorrowBackDate" runat="server"></asp:Label>
                    </div>
                </div>
                <div style="width: 100%; height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;">
                </div>
            </div>
            <div style="z-index: 102; border-bottom: black 1px solid; position: absolute; border-left: black 1px solid; padding-bottom: 1px; background-color: infobackground; padding-left: 1px; width: 40px; padding-right: 1px; display: none; height: 22px; border-top: black 1px solid; top: 71px; border-right: black 1px solid; padding-top: 1px; left: 810px" id="lbToolTip" ms_positioning="FlowLayout">
            </div>
            <div style="z-index: 101; position: absolute; display: none; overflow: auto; top: 107px; left: 856px">
                <asp:TextBox ID="txUnvFile" runat="server" Width="43px"></asp:TextBox><asp:TextBox ID="txWebWorkPath" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox><asp:TextBox ID="txServerName" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox><asp:TextBox ID="txServerPort" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox><asp:TextBox ID="txUnvFileLocal" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox><asp:CustomValidator ID="CustomValidatorCommon" runat="server" Height="20px" Display="None" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:TextBox ID="DOC_CHECK" runat="server" Width="44px"></asp:TextBox><asp:TextBox ID="h_tbFlag" runat="server" Width="54px"></asp:TextBox><asp:TextBox ID="txOrgNo" runat="server" Width="43px"></asp:TextBox><asp:TextBox ID="h_CloseType" runat="server" Width="43px"></asp:TextBox><asp:CustomValidator ID="Customvalidator1" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
                <asp:ValidationSummary ID="Validationsummary3" runat="server"></asp:ValidationSummary>
                <asp:TextBox ID="COM_CHECK" runat="server" CssClass=""></asp:TextBox>
                <asp:TextBox ID="txSysid" runat="server" CssClass="hide"></asp:TextBox>
                <asp:Label ID="lbRPSSECT_NO" runat="server" Visible="False">●</asp:Label><asp:Label ID="lbRPS_USER" runat="server" Visible="False">●</asp:Label><asp:Label ID="Label1" runat="server" Visible="False">●</asp:Label><asp:Label ID="lbSOURCE_ORGNO" runat="server" CssClass="" Visible="False"></asp:Label><asp:Label ID="lbRPSDEPT_NO" runat="server" CssClass=""></asp:Label>
                <asp:TextBox ID="txFlag" CssClass="hide" runat="server"></asp:TextBox>
                <asp:TextBox Style="z-index: 105; position: absolute; top: 8px; left: 8px" ID="H_txAKT800DgSize" runat="server" CssClass="hidden" Width="4px" Height="8px"></asp:TextBox>
            </div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
                <asp:Label ID="lbPAGE" runat="server" ForeColor="Black">第</asp:Label>
                <asp:TextBox runat="server" Width="2.5em" ID="txNum" BackColor="LightGray" Text="1/10" ReadOnly="True"></asp:TextBox>
                <asp:Label ID="Label66" runat="server" ForeColor="Black">筆</asp:Label>
                <asp:Label ID="Label67" runat="server" ForeColor="Black">/ 共</asp:Label>
                <asp:TextBox runat="server" Width="2em" ID="txTotNum" BackColor="LightGray" ReadOnly="True"></asp:TextBox>
                <asp:Label ID="Label68" runat="server" ForeColor="Black">筆</asp:Label>
                <asp:Button ID="btSUM1" runat="server" Text="返回摘要(O)" AccessKey="O" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btFIRSTDOC1" runat="server" Text="第一筆(G)" AccessKey="G" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btPRIORDOC1" runat="server" Text="上一筆(P)" AccessKey="P" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btNEXTDOC1" runat="server" Text="下一筆(N)" AccessKey="N" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btLASTDOC1" runat="server" Text="最末筆(L)" AccessKey="L" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btSELECTPAGE" runat="server" Text="跳至(J)" AccessKey="J" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:TextBox runat="server" Width="2em" ID="txSelectNumber" CssClass="InputFieldNumeric"></asp:TextBox>
                <asp:Button ID="btIMAGE1" runat="server" Text="線上瀏覽(U)" AccessKey="U" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:CheckBox ID="cbKeepOldImageList" runat="server" Text="(保留)" Checked="True"></asp:CheckBox>
                <asp:Button ID="btAPPLY1" runat="server" Text="申請調檔(I)" AccessKey="I" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btDetailPrint" runat="server" Text="明細預覽(X)" AccessKey="X" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btQueryProcess" runat="server" Text="流程查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btEXTENT" runat="server" Text="展期資訊(K)" AccessKey="K" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btEXIT1" runat="server" Text="離開(Y)" AccessKey="Y" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            </asp:Panel>
        </div>

    </form>
</body>
</html>
