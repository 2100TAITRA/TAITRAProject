<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFR300.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFR300" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>IFR300 人員帳號清查清單作業</title>
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
    <form id="IFR300" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_EDWS" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
						<cc1:combobox id="dlDept" runat="server" Width="7em" CssClass="comboBox"></cc1:combobox>
						<cc1:combobox id="dlSect" runat="server" Width="7em" CssClass="comboBox"></cc1:combobox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">帳號狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="Status"></asp:RadioButton>
                        <asp:RadioButton ID="rbEnable" runat="server" Text="啟用" GroupName="Status"></asp:RadioButton>
                        <asp:RadioButton ID="rbDisable" runat="server" Text="停用" GroupName="Status"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">分頁模式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbPageNone" runat="server" Text="不分頁" GroupName="PageType"></asp:RadioButton>
                        <asp:RadioButton ID="rbPageDept" runat="server" Text="依單位分頁" GroupName="PageType"></asp:RadioButton>
                    </div>
                </div>
            </div>
			<DIV class="DivTable">
				<DIV class="GridDiv" style="HEIGHT: 14.5em">
					<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical">
						<Columns>
							<asp:TemplateColumn HeaderText="所屬單位">
								<ItemTemplate>
									<asp:Label id="lbOuName" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="使用者帳號">
								<ItemTemplate>
									<asp:Label id="lbUsername" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="使用者姓名">
								<ItemTemplate>
									<asp:Label id="lbEmpName" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="狀態">
								<ItemTemplate>
									<asp:Label id="lbStatus" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="調檔權限">
								<ItemTemplate>
									<asp:Label id="lbPriv" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="應用限制">
								<ItemTemplate>
									<asp:Label id="lbApply" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="角色">
								<ItemTemplate>
									<asp:Label id="lbRoleList" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:datagrid>
				</DIV>
			</DIV>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出ODS(O)" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel"  AccessKey="O" Title="匯出ODS(ALT+O)"/>
        </asp:Panel>
    </form>
</body>
</html>
