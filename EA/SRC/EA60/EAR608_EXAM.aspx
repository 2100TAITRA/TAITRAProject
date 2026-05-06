<%@ Page Language="c#" CodeBehind="EAR608_EXAM_EXAM.aspx.cs" AutoEventWireup="false" Inherits="EA60.EAR608_EXAM" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML PUBLIC>
<html>
<head>
    <title>EAR608_EXAM永久保存檔案屆期移轉書面鑑定清單</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAR608_EXAM" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">移轉批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTPlan" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="15" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="匯出移轉書面鑑定結果Excel(E)" AccessKey="E" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
