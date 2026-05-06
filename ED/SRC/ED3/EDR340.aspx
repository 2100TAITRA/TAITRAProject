<%@ Page Language="c#" CodeBehind="EDR340.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR340" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>EDR340 密件登記單查詢列印作業</title>
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
    <form id="EDR340" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hidden"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label1" runat="server" >收創日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txRcvDateS" TabIndex="1" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>～
                        <asp:TextBox ID="txRcvDateE" TabIndex="2" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label3" runat="server" >發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox ID="txIssueDateS" TabIndex="1" runat="server" Width="4em"  MaxLength="7" CssClass="DatePicker"></asp:TextBox>～
                        <asp:TextBox ID="txIssueDateE" TabIndex="2" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
			<div class="dTR">
                <div class="GridDiv" style="HEIGHT: 221px; OVERFLOW: auto; WORD-BREAK: break-all">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <HeaderStyle Width="1.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <HeaderStyle Width="6em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"  Width="5.5em" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收創日期">
                                <HeaderStyle Width="4.5em"></HeaderStyle>                                
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server" Width="4.5em" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文日期">
                                <HeaderStyle Width="4.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbIssueDate" runat="server" Width="4.5em" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關">
                                <HeaderStyle Width="21em"></HeaderStyle>                                
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvOrg" runat="server" Width="20em" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字號">
                                <HeaderStyle Width="22em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvWordNo" runat="server" Width="21em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <HeaderStyle Width="10em"></HeaderStyle>                                
                                <ItemTemplate>
                                    <asp:Label ID="lbOuName" runat="server" Width="10em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機密等級">
                                <HeaderStyle Width="5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSec" runat="server" Width="5em" ></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" AccessKey="Q" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" AccessKey="P" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
