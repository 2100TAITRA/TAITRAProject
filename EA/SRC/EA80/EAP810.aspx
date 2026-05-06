<%@ Page Language="c#" CodeBehind="EAP810.aspx.cs" AutoEventWireup="false" Inherits="EA80.EAP810" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAP810 檔案目錄彙送作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <style type="text/css">
        .TextLabelRight {
            BORDER-BOTTOM-STYLE: none;
            TEXT-ALIGN: right;
            BORDER-RIGHT-STYLE: none;
            BACKGROUND-COLOR: transparent;
            BORDER-TOP-STYLE: none;
            BORDER-LEFT-STYLE: none;
        }
    </style>
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAP810" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="AP_FILEIO_WS" Style="z-index: 102; position: absolute; top: 257px; left: 249px" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="XmlFileName" Style="z-index: 102; position: absolute; top: 256px; left: 315px" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="XmlFileDetail" Style="z-index: 102; position: absolute; top: 256px; left: 315px" runat="server" CssClass="hidden"></asp:TextBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR" id="MOCSINFO">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="lbFileType" runat="server">檔案種類：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrg" runat="server" Text="機關檔" GroupName="rbSystemType"></asp:RadioButton>
                        <asp:RadioButton ID="rbPer" runat="server" Text="個人檔" GroupName="rbSystemType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label1" runat="server">檔案目錄種類：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:RadioButton ID="rbType1" runat="server" Checked="True" Text="定期檔案目錄" GroupName="group2"></asp:RadioButton>
                        <asp:RadioButton ID="rbType2" runat="server" Text="移轉檔案目錄" GroupName="group2"></asp:RadioButton>
                        <asp:RadioButton ID="rbType3" runat="server" Text="移交檔案目錄" GroupName="group2"></asp:RadioButton>
                        <asp:RadioButton ID="rbType4" runat="server" Text="銷毀檔案目錄" GroupName="group2"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="lbSendosNo" runat="server" Style="z-index: 0">檔案目錄單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:RadioButton Style="z-index: 0" ID="rbVolType" runat="server" GroupName="sendType" Text="案卷" Checked="True"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbSeqType" runat="server" GroupName="sendType" Text="案件"></asp:RadioButton>
                        <asp:DropDownList ID="dlSedVolType" runat="server" Width="7.5em">
                            <asp:ListItem Value="1">附錄5(104年)</asp:ListItem>
                            <asp:ListItem Value="2">99年</asp:ListItem>
                            <asp:ListItem Value="3">附件七(94年)</asp:ListItem>
                        </asp:DropDownList>
                        <asp:DropDownList ID="dlSedSeqType" runat="server" Width="7.5em">
                            <asp:ListItem Value="1">附錄5(104年)</asp:ListItem>
                            <asp:ListItem Value="2">99年</asp:ListItem>
                            <asp:ListItem Value="3">附件七(94年)</asp:ListItem>
                            <asp:ListItem Value="4">附表三</asp:ListItem>
                        </asp:DropDownList>
                        <asp:TextBox ID="txSendType" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="hide">
                        <asp:RadioButton Style="z-index: 0" ID="rbUnit6" runat="server" GroupName="group1" Text="案卷(附錄5)"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbUnit7" runat="server" GroupName="group1" Text="案件(附錄5)"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbUnit4" runat="server" GroupName="group1" Text="案卷(99年)"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbUnit5" runat="server" GroupName="group1" Text="案件(99年)"></asp:RadioButton>
                    </div>
                </div>
                <div class="hide">
                    <div class="dTDTitle" style="width: 8em;">&nbsp</div>
                    <div class="dTD" style="width: 30em;">
                        <asp:RadioButton ID="rbUnit1" runat="server" Text="案卷(附件七)" GroupName="group1"></asp:RadioButton>
                        <asp:RadioButton ID="rbUnit2" runat="server" Text="案件(附件七)" GroupName="group1"></asp:RadioButton>
                        <asp:RadioButton ID="rbUnit3" runat="server" Text="案件(附表三)" GroupName="group1"></asp:RadioButton>
                    </div>
                </div>

                <div class="dTR" style="display: none">
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label4" runat="server">目錄密等類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:CheckBox ID="cbNoSec" runat="server" Checked="True" Text="不包含密等"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label7" runat="server">目錄處理模式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:CheckBox ID="cbBefore95" runat="server" Text="處理095年(含)以前檔案"></asp:CheckBox>
                        <asp:CheckBox ID="cbClsCase" runat="server" Text="一併轉出分類表及案名表"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR" id="divFileYear">
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label11" runat="server">年度：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 2.5em;">
                        <asp:TextBox ID="txFileYear" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 20em;">
                        <asp:Label ID="Label10" runat="server">註：若指定年度則僅轉出該年度檔案目錄</asp:Label>
                    </div>
                </div>
                <div class="dTR" id="divCrtDate">
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label12" runat="server">文件產生日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCrtDateS" runat="server" Width="5.5em" MaxLength="7" CssClass="DatePicker InputFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label14" runat="server" Width="2.5em">─</asp:Label>
                        <asp:TextBox ID="txCrtDateE" runat="server" Width="5.5em" MaxLength="7" CssClass="DatePicker InputFieldNumeric"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:TextBox ID="txStatus" runat="server" CssClass="TextLabelRight" Width="7em" ReadOnly="True" ForeColor="Navy">異動日期：</asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:TextBox ID="txDateOnlyS" runat="server" Width="5.5em" MaxLength="8" CssClass="DatePicker"></asp:TextBox>
                        <asp:TextBox ID="txFrom" runat="server" Width="5.5em" MaxLength="8" CssClass="hide"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelpFrom" TabIndex="-1" runat="server" CssClass="hide" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                        <asp:Label ID="Label6" runat="server" Width="2.5em">─</asp:Label>
                        <asp:TextBox ID="txDateOnlyE" runat="server" Width="5.5em" MaxLength="8" CssClass="DatePicker"></asp:TextBox>
                        <asp:TextBox ID="txTo" runat="server" Width="5.5em" MaxLength="8" CssClass="hide"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelpTo" TabIndex="-1" runat="server" CssClass="hide" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR" id="tr_tplan">
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:TextBox ID="lbTPLAN_NO" runat="server" Width="7em" CssClass="TextLabelRight" ReadOnly="True" ForeColor="Navy">移轉計畫編號：</asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:TextBox ID="txFromT" runat="server" Width="5.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btTRANS" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                        <asp:ImageButton ID="btDES" TabIndex="-1" runat="server" CssClass="hide" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label8" runat="server" Width="2.5em">─</asp:Label>
                        <asp:TextBox ID="txToT" runat="server" Width="5.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btTRANE" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                        <asp:ImageButton ID="btDEE" TabIndex="-1" runat="server" CssClass="hide" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR" style="display: none;">
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label2" runat="server">檔案路徑：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:Button ID="btBurrow" runat="server" Width="3.5em" Text="瀏覽"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label3" runat="server">檔案分割筆數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em;">
                        <asp:TextBox ID="txFileMaxCnt" runat="server" Width="5.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server" Width="18.5em">(彙送資料筆數大於此值即會自行分割)</asp:Label>
                    </div>
                </div>
                <br>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label13" runat="server">附錄5(104年)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label9" runat="server">104年7月所頒布之「文書及檔案管理電腦化作業規範」的附錄5傳輸格式。(現行匯出格式)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label15" runat="server">附錄2(99年)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label16" runat="server">99年12月所頒布「文書及檔案管理電腦化作業規範」的附錄2傳輸檔案格式。(舊格式)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label17" runat="server">附件七(94年)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label18" runat="server">94年8月頒布「機關檔案管理資訊化作業要點」的附件七檔案目錄彙送格式。(舊格式)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label19" runat="server">附表三(90年)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label20" runat="server">90年12月頒布「機關檔案管理資訊化作業要點」的第七點附表三、檔案目錄傳輸格式。(舊格式)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label21" runat="server">註：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label22" runat="server">若以異動日期產出附表三格式之定期檔案目錄，僅會將91年~95年(含)之資料做轉出</asp:Label>
                    </div>
                </div>
            </div>

        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="檔案目錄轉出" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="轉出記錄查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
