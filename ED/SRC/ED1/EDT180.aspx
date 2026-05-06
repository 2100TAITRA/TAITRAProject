<%@ Page Language="c#" CodeBehind="EDT180.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT180" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT180 草稿公文承辦單位異動作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT180" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:8.5em">
                        <asp:Label ID="Label3" runat="server" Font-Names="細明體">異動後承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlRoles" runat="server"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <asp:Panel ID="tbSelect" runat="server" EnableViewState="False">
                    <asp:Button runat="server" Text="全部選取" ID="btSelectAll"></asp:Button>
                    <asp:Button runat="server" Text="反向選取" ID="btSelectInverse"></asp:Button>
                    <asp:Button runat="server" Text="清除選取" ID="btSelectClear"></asp:Button>
                </asp:Panel>
                <div class="GridDiv" style="height: 27.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Font-Names="細明體"></asp:Label>
                                    <asp:Label ID="lbMsgId" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbSubDir" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbXmlInfo" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選取">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptNo" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="最後修改日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbNewTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="異動(S)" DefaultStyle="newmode:none;modifymode:block;" ID="btSave" AccessKey="S" Title="異動(ALT+S)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="待異動草稿查詢(F)" DefaultStyle="newmode:block;modifymode:block;" ID="btSearch" AccessKey="F" Title="待異動草稿查詢(ALT+F)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
