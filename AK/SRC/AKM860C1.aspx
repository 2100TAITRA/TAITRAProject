<%@ Page Language="c#" CodeBehind="AKM860C1.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM860C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>AKM860C1 應用收費項目查詢子視窗</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKM860C1" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="Table1">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:HyperLinkColumn DataNavigateUrlField="CHARGE_NO" DataNavigateUrlFormatString="javascript:ReturnValue(&quot;{0}&quot;)" DataTextField="CHARGE_NO"></asp:HyperLinkColumn>
                            <asp:BoundColumn DataField="CHARGE_NAME"></asp:BoundColumn>
                            <asp:BoundColumn DataField="CHARGE_UNIT"></asp:BoundColumn>
                            <asp:TemplateColumn HeaderText="UNIT_COST">
                                <ItemTemplate>
                                    <asp:Label ID="lbCost" runat="server" Width="71px" Text='<%# DataBinder.Eval(Container.DataItem,"UNIT_COST") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" Text="列印" ID="btPrint"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 102; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 103; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
