<%@ Page Language="c#" CodeBehind="AKM330C3.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM330C3" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKM330C3 相同檔號公文明細</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body class="hidden">
    <form id="AKM330C3" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label1" runat="server">檔號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="2em" ReadOnly="True" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server">－</asp:Label>
                        <asp:TextBox ID="txCls" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="10em" ReadOnly="True" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">－</asp:Label>
                        <asp:TextBox ID="txCase" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="6em" ReadOnly="True" MaxLength="12"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">－</asp:Label>
                        <asp:TextBox ID="txVol" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="2.5em" ReadOnly="True" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">－</asp:Label>
                        <asp:TextBox ID="txSeq" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="2em" ReadOnly="True" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical" Width="18em" AutoGenerateColumns="False">
                        <Columns>
                            <asp:HyperLinkColumn DataNavigateUrlField="DOC_NO" DataNavigateUrlFormatString="javascript:ReturnValue(&quot;{0}&quot;)"
                                DataTextField="DOC_NO" HeaderText="文(編)號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                            </asp:HyperLinkColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
