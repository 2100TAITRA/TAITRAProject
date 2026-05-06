<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI020.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDI020" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI020 公文速別代碼查詢子視窗</title>
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
    <form id="EDI020" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">速別代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSpdNo" TabIndex="0" runat="server" Width="1em" MaxLength="1"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">速別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSpd" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
            <div class="dTR">
                <div class="dTDTitle" style="width: 5.5em">
                    <asp:Label ID="Label3" runat="server">內部代碼：</asp:Label>
                </div>
                <div class="dTD">
                    <asp:TextBox ID="txInnerNo" TabIndex="0" runat="server" Width="1em" MaxLength="1"></asp:TextBox>
                </div>
            </div>
            <div class="dTR">
                <div class="dTDTitle" style="width: 5.5em">
                    <asp:Label ID="Label4" runat="server">內部名稱：</asp:Label>
                </div>
                <div class="dTD">
                    <asp:TextBox ID="txInnerName" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <div class="dTD" style="height: 221px">
                        <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="速別代碼">
                                    <ItemTemplate>
                                        <asp:HyperLink ID="hlSpdNo" TabIndex="0" runat="server"></asp:HyperLink>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="速別">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSpdName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="搜尋" ID="btSearch" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
