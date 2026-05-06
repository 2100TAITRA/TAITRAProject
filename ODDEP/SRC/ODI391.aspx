<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODI391.aspx.cs" AutoEventWireup="false" Inherits="OD.ODI391" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODI391 郵寄信件包裹查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODI391" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label6" runat="server">郵寄日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txPostDateS" TabIndex="10" runat="server" MaxLength="7" Width="4em"></asp:TextBox>－
						<asp:TextBox CssClass="InputFieldNumeric" ID="txPostDateE" TabIndex="15" runat="server" MaxLength="7" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label1" runat="server">郵寄編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txPostSeqS" TabIndex="20" runat="server" MaxLength="11" Width="6em"></asp:TextBox>－
						<asp:TextBox CssClass="InputFieldNumeric" ID="txPostSeqE" TabIndex="25" runat="server" MaxLength="11" Width="6em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label2" runat="server">拆帳單編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txPropNoS" TabIndex="30" runat="server" MaxLength="10" Width="5.5em"></asp:TextBox>－
						<asp:TextBox CssClass="InputFieldNumeric" ID="txPropNoE" TabIndex="35" runat="server" MaxLength="10" Width="5.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label4" runat="server">付款方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" TabIndex="45" runat="server" Checked="True" GroupName="grp2" Text="全部"></asp:RadioButton><asp:RadioButton ID="rbCash" TabIndex="45" runat="server" GroupName="grp2" Text="現金"></asp:RadioButton><asp:RadioButton ID="rbM" TabIndex="45" runat="server" GroupName="grp2" Text="郵資機"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label5" runat="server">快速查詢：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlFastSearch" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label3" runat="server" Visible="False">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrder1" TabIndex="50" runat="server" Checked="True" GroupName="grp" Text="依郵寄編號由小到大" Visible="False"></asp:RadioButton><asp:RadioButton ID="rbOrder2" TabIndex="50" runat="server" GroupName="grp" Text="依郵寄編號由大到小" Visible="False"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="0" PageSize="50" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄編號">
                                <ItemTemplate>
                                    <asp:Label ID="lbPostSeq" runat="server" CssClass="TextLabel" ReadOnly="True"></asp:Label>
                                    <asp:Label ID="lbPostDate" runat="server" CssClass="TextLabel" ReadOnly="True" Visible="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收件人">
                                <ItemTemplate>
                                    <asp:Label ID="lbOrgName" runat="server" CssClass="TextLabel" ReadOnly="True"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄方式">
                                <ItemTemplate>
                                    <asp:Label ID="lbPostName" runat="server" CssClass="TextLabel" Width="5.5em" ReadOnly="True"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="付款方式">
                                <ItemTemplate>
                                    <asp:Label ID="lbIsPrint" runat="server" Width="4em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="費用">
                                <ItemTemplate>
                                    <asp:Label ID="lbPostCost" runat="server" CssClass="TextLabel" ReadOnly="True"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="拆帳編號">
                                <ItemTemplate>
                                    <asp:Label ID="lbPropNo" runat="server" CssClass="TextLabel" ReadOnly="True"></asp:Label>
                                    <asp:Label ID="lbPropType" runat="server" CssClass="TextLabel" ReadOnly="True" Visible="False"></asp:Label>
                                    <asp:Label ID="lbAmount" runat="server" CssClass="TextLabel" ReadOnly="True" Visible="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="金額分配">
                                <ItemTemplate>
                                    <asp:Label ID="lbShareCost" runat="server" CssClass="TextLabel" Width="6.6em" ReadOnly="True"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btFastSearch" runat="server" Text="快速查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btQuery" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 216px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
