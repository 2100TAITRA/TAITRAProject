<%@ Page Language="c#" CodeBehind="ODT270.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT270" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>ODT270 公文辦理成績登錄作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="LIB/AK.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT270" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <div id="service" style="behavior: url(Template/LIB/webservice.htc)"></div>
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="Hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="GridDiv" style="height: 24.5em">
                    <asp:DataGrid ID="dg1" runat="server" Width="100%" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:TextBox ID="txDocNo" runat="server" Width="5.5em" MaxLength="15" CssClass="RequireField"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbUserName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="預期分數">
                                <ItemTemplate>
                                    <asp:TextBox ID="txExpectScore" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="實際分數">
                                <ItemTemplate>
                                    <asp:TextBox ID="txFinalScore" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="PopUp" Width="25em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="儲存" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="清除" ID="btClean"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
