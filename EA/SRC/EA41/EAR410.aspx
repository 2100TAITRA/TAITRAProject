<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR410.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAR410" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR410檔案清查清單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAR410" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanNo" TabIndex="1" runat="server" Width="4.5em" CssClass="RequireUpperField" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label5" runat="server">庫房：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStoreNo" TabIndex="6" runat="server" Width="5.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">檔號 (起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txYearS" TabIndex="30" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txClsS" TabIndex="35" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txCaseS" TabIndex="40" runat="server" Width="7em" MaxLength="12"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txVolS" TabIndex="45" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>－
						<asp:TextBox CssClass="InputFieldNumeric" ID="txSeqS" TabIndex="50" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">檔號 (訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txYearE" TabIndex="55" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txClsE" TabIndex="60" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txCaseE" TabIndex="65" runat="server" Width="7em" MaxLength="12"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txVolE" TabIndex="70" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>－
						<asp:TextBox CssClass="InputFieldNumeric" ID="txSeqE" TabIndex="75" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbStockText" runat="server">櫥位號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputUpperFieldText" ID="txStockNoS" TabIndex="76" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
                        <asp:Label ID="lbSeperate" runat="server">－ </asp:Label>
                        <asp:TextBox CssClass="InputUpperFieldText" ID="txStockNoE" TabIndex="77" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" >
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbRptType" runat="server" CssClass="hide"> 報表類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbTypeFiles" TabIndex="105" runat="server" GroupName="rbRptType" CssClass="hide" Text="案件"></asp:RadioButton>
                        <asp:RadioButton ID="rbTypeCase" TabIndex="100" runat="server" GroupName="rbRptType" CssClass="hide" Text="案卷"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server"> 機密等級：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" TabIndex="100" runat="server" Checked="True" GroupName="rb" Text="全部"></asp:RadioButton>
                        <asp:RadioButton ID="rbSec" TabIndex="105" runat="server" GroupName="rb" Text="密件"></asp:RadioButton>
                        <asp:RadioButton ID="rbNor" TabIndex="110" runat="server" GroupName="rb" Text="普通件"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label7" runat="server">列印範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbPaper" runat="server" Text="紙本簽核" GroupName="rb2"></asp:RadioButton>
                        
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbElc" runat="server" Text="線上簽核公文(紙本來文併同歸檔)" GroupName="rb2"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbSpe" runat="server" Text="特殊媒體" GroupName="rb2"></asp:RadioButton><asp:DropDownList ID="dlMediaType" runat="server"  Style="z-index: 0"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">列印別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="cbDoc" runat="server" GroupName="FileType" Text="本文"></asp:RadioButton>
                        <asp:RadioButton ID="cbAtt" runat="server" GroupName="FileType" Text="另存附件"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbPrototype" runat="server" GroupName="FormatType" Text="依原格式輸出"></asp:RadioButton><br>
                        <asp:RadioButton ID="cbFM" runat="server" GroupName="FormatType" Text="本文依檔管局建議的報表格式輸出"></asp:RadioButton>
                        <asp:CheckBox ID="cbshowdocno" runat="server" Text="於本文報表顯示文號(僅檔管局格式額外提供此功能)"></asp:CheckBox><br>
                        <asp:RadioButton ID="rbNCHU" runat="server" GroupName="FormatType" CssClass="hide" Text="依興大格式輸出"></asp:RadioButton>
                        <asp:RadioButton ID="rbTPVGH" runat="server" GroupName="FormatType" CssClass="hide" Text="依北榮格式輸出"></asp:RadioButton>
                        <asp:TextBox ID="txFileNoSep" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbOrderType" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbFile" TabIndex="20" runat="server" Text="依檔號" GroupName="GN2"></asp:RadioButton>
                        <asp:RadioButton ID="rbStock" TabIndex="24" runat="server" Text="依櫥位號" GroupName="GN2"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btExcel" CssClass="hide" runat="server" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btODS" CssClass="hide" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btTXT" CssClass="hide" runat="server" Text="匯出TXT(X)" AccessKey="X" Title="匯出TXT(ALT+X)" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
