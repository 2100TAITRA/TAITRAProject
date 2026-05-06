<%@ Page language="c#" Codebehind="EDR252.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR252" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR252 已歸檔未成批公文查詢作業</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<META content="C#" name="CODE_LANGUAGE">
	<META content="JavaScript" name="vs_defaultClientScript">
	<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR252" onkeyup="jf_CheckFull();" method="post" runat="server" novalidate>
			<!--Template V3 Generated WebForm--> <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="h_DeptInfo" runat="server" ></asp:TextBox>
            <asp:TextBox ID="h_SectInfo" runat="server" ></asp:TextBox>
            <asp:TextBox ID="h_UserInfo" runat="server"  ></asp:TextBox>
            <asp:TextBox ID="SectList" runat="server" ></asp:TextBox>
            <asp:TextBox ID="UserList" runat="server" ></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExecDateS" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox> - 
                        <asp:TextBox ID="txExecDateE" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
				<div class="dTR">
					 <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server">&nbsp;</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
						<asp:Label ID="Label2" runat="server">報表是否依一級單位分頁</asp:Label>
                    </div>
                </div>
            </div>
			<div class="DivTable" id="GridTable">
				<div id="Dg1Div" class="GridDiv">
					<asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemStyle HorizontalAlign="Center"></ItemStyle>
								<ItemTemplate>
									<asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="公文文號">
								<ItemStyle HorizontalAlign="Center"></ItemStyle>
								<ItemTemplate>
									<asp:Label ID="lbDocNo" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="承辦單位">
								<ItemStyle HorizontalAlign="Center"></ItemStyle>
								<ItemTemplate>
									<asp:Label ID="lbDept" runat="server"></asp:Label><br />
									<asp:Label ID="lbSect" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="承辦人">
								<ItemStyle HorizontalAlign="Center"></ItemStyle>
								<ItemTemplate>
									<asp:Label ID="lbUser" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="主旨">
								<ItemTemplate>
									<asp:Label ID="lbSubject" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="歸檔日期">
								<ItemStyle HorizontalAlign="Center"></ItemStyle>
								<ItemTemplate>
									<asp:Label ID="lbExecDate" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="歸檔人員">
								<ItemStyle HorizontalAlign="Center"></ItemStyle>
								<ItemTemplate>
									<asp:Label ID="lbExecUser" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
			<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
