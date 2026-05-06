<%@ Page Language="c#" CodeBehind="EAT400C2.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAT400C2" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT400C2 檔案產生機關查詢子視窗</title>
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
    <form id="EAT400C2" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label ID="Label1" runat="server">搜尋代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgNo" onkeyup="jf_CheckFull();" TabIndex="1" runat="server" Width="5.5em" CssClass="InputUpperFieldText"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label ID="Label10" runat="server">搜尋名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgName" onkeyup="jf_CheckFull();" TabIndex="2" runat="server" Width="14.5em" CssClass="InputUpperFieldText"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server" Font-Size="Small" Width="30px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機關代號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlOrgNo" runat="server" Font-Size="Small"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機關名稱">
                                <ItemTemplate>
                                    <asp:Label ID="lbOrgName" runat="server" Font-Size="Small"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="重新搜尋(F)" ID="btSearch" AccessKey="F" title="重新搜尋(ALT+F)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
