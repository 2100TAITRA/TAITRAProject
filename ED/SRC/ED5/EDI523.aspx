<%@ Page Language="c#" CodeBehind="EDI523.aspx.cs" AutoEventWireup="false" Inherits="ED5.EDI523" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDI523</title>
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
    <form id="EDI523" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSendDateS" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">～</asp:Label>
                        <asp:TextBox ID="txSendDateE" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" TabIndex="30" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
					</div>
                    <div class="dTD" style="width: 9.5em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlSect" TabIndex="40" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle Wrap="False" HorizontalAlign="Center" Width="1.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" TabIndex="0" runat="server" Width="1.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="流水號">
                                <ItemStyle Wrap="False" HorizontalAlign="Center" Width="4.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlSeqNo" TabIndex="0" runat="server" Width="4.5em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="日期">
                                <ItemStyle Wrap="False" HorizontalAlign="Center" Width="5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbDate" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemStyle Wrap="False" HorizontalAlign="Center" Width="12.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" runat="server" Width="12.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="退回費">
                                <ItemStyle Wrap="False" HorizontalAlign="Center" Width="4.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbReturnCost" runat="server" Width="4.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
