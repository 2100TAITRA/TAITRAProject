<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR219.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAR219" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR219 掃描條碼列印作業</title>
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
    <form id="EAR219" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label1" runat="server" CssClass=" RequireField">點收日期：</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:textbox id="txDateS" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox> - 
						<asp:textbox id="txDateE" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label2" runat="server">點收時間：</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:textbox id="txTimeS" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:textbox> - 
						<asp:textbox id="txTimeE" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:textbox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label3" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:textbox id="txDocNo" runat="server" Width="5.5em" MaxLength="10"></asp:textbox>
                        <asp:Label ID="Label4" runat="server">當公文文號有值時，僅會印出該公文文號條碼</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
