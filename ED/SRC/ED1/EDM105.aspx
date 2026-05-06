<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDM105.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDM105" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDM105 收件單位下拉選單維護作業</title>
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
    <form id="EDM105" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="GridTable">
				<div class="dTR">
					<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
						<asp:Button ID="btSelectAll" runat="server" Text="全選" />
                        <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
						<asp:Button ID="btSelectClear" runat="server" Text="清除" />
						<asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
						<asp:Button ID="btUp" runat="server" Text="上移" />
						<asp:Button ID="btDown" runat="server" Text="下移" />
					</asp:Panel>
				</div>
                <div class="GridDiv" style="height: 18em">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
									<ItemTemplate>
										<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
									</ItemTemplate>
								</asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="單位名稱">
                                <ItemTemplate>
                                    <asp:TextBox ID="txOuName" runat="server" Width="20em" MaxLength="60"></asp:TextBox><!--0960106	Leslie	將MaxLength由40改為200-->
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" style="display:none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave" ></asp:Button>
            <asp:Button runat="server" style="display:none" Text="取消" DefaultStyle="newmode:block;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
