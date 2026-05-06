<%@ Page Language="c#" CodeBehind="EAT403C1.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAT403C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT403C1 查詢子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAT403C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label1" runat="server">制定日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txDate1" onkeyup="jf_CheckFull();" TabIndex="2" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label10" runat="server">─</asp:Label>
                        <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txDate2" onkeyup="jf_CheckFull();" TabIndex="2" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label2" runat="server" CssClass="InputFieldText">制定人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em;">
                        <asp:DropDownList ID="dlPlanEntryUser" runat="server"></asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <div id="GridTable" class="DivTable">
            <div class="dTR">
                <div class="GridDiv" style="OVERFLOW: auto;  HEIGHT: 257px">
                <asp:DataGrid ID="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4">
                    <Columns>
                        <asp:TemplateColumn HeaderText="序">
                            <ItemTemplate>
                                <asp:Label ID="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="批號">
                            <ItemTemplate>
                                <asp:HyperLink ID="hlPlanNo" runat="server" Width="4.5em"></asp:HyperLink>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="制定日期">
                            <ItemTemplate>
                                <asp:Label ID="lbPlanDate" runat="server" Width="5.5em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="制定人">
                            <ItemTemplate>
                                <asp:Label ID="lbEntryName" runat="server" Width="4.5em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="銷毀範圍條件">
                            <ItemTemplate>
                                <asp:Label ID="lbCondionList" runat="server" Width="20em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                        <asp:TemplateColumn HeaderText="狀態">
                            <ItemTemplate>
                                <asp:Label ID="lbPlanStatus" runat="server" Width="5em"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateColumn>
                    </Columns>
                </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" AccessKey="Q" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
    </form>
</body>
</html>
