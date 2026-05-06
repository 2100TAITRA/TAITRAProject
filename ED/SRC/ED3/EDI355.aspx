<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EDI355.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDI355" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDI355 待寄送公文批號查詢子視窗</title>
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
    <form id="EDI355" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="KeyUpperField" ID="txDateS" TabIndex="10" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox class="KeyUpperField" ID="txTimeS" TabIndex="10" runat="server" Width="3.5em" CssClass="InputFieldNumeric" MaxLength="6"></asp:TextBox>
                        <asp:Label ID="Label1" runat="server">－</asp:Label>
                        <asp:TextBox class="KeyUpperField" ID="txDateE" TabIndex="15" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox class="KeyUpperField" ID="txTimeE" TabIndex="20" runat="server" Width="3.5em" CssClass="InputFieldNumeric" MaxLength="6"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="批號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlBatchNo" TabIndex="0" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文日期">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSendDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送文者">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromUser" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
