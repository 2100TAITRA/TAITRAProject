<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT246.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT246" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT246 主管異動移交設定作業</title>
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
    <form id="EDT246" onkeyup="jf_CheckFull();" method="post" runat="server" novalidate>
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="h_DeptInfo" runat="server" ></asp:TextBox>
            <asp:TextBox ID="h_SectInfo" runat="server" ></asp:TextBox>
            <asp:TextBox ID="h_UserInfo" runat="server"  ></asp:TextBox>
            <asp:TextBox ID="SectList" runat="server" ></asp:TextBox>
            <asp:TextBox ID="UserList" runat="server" ></asp:TextBox>
            <asp:TextBox ID="H_TranStart" runat="server" ></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label1" runat="server" >被異動人單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                        <asp:DropDownList ID="dlSect" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server" >被異動人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUser" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label3" runat="server" >異動人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txToUserName" runat="server" Width="6em"></asp:TextBox>
                        <asp:TextBox ID="txToEmpName" runat="server" Width="6em"></asp:TextBox>
						<asp:imagebutton id="btHelp"  runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:imagebutton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label4" runat="server" >生效日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDate" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                        <asp:Button ID="btAdd" runat="server" Text="新增" ></asp:Button>
                    </div>
                </div>
            </div>
			<div class="DivTable" id="GridTable">
				<div id="divSelect" class="hide">
					<asp:Button ID="btSelectAll" runat="server" Text="全選" />
					<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
					<asp:Button ID="btSelectClear" runat="server" Text="取消" />
					<asp:Button ID="btDgDelete" runat="server" Text="刪除" />
				</div>
				<div id="Dg1Div" class="GridDiv">
					<asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
						<Columns>
							<asp:TemplateColumn HeaderText="選">
								<ItemStyle HorizontalAlign="Center"></ItemStyle>
								<ItemTemplate>
									<asp:CheckBox ID="cbdgSelect"  runat="server"></asp:CheckBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="序">
								<ItemStyle HorizontalAlign="Center"></ItemStyle>
								<ItemTemplate>
									<asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="被異動人員單位">
								<ItemTemplate>
									<asp:Label ID="lbdgOuName" runat="server"></asp:Label>
									<asp:TextBox ID="txdgOuId" runat="server" CssClass="hide"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="被異動人">
								<ItemTemplate>
									<asp:Label ID="lbdgFromEmpname" runat="server"></asp:Label>
									<asp:TextBox ID="txdgFromUsername" runat="server" CssClass="hide"></asp:TextBox>
									<asp:TextBox ID="txdgFromRoleId" runat="server" CssClass="hide"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="異動人">
								<ItemStyle HorizontalAlign="Center"></ItemStyle>
								<ItemTemplate>
									<asp:TextBox ID="txdgToUsername" runat="server" Width="6em"></asp:TextBox>
									<asp:TextBox ID="txdgToEmpname" runat="server" Width="6em"></asp:TextBox>
									<asp:imagebutton id="btDgHelp"  runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:imagebutton>
								</ItemTemplate>
							</asp:TemplateColumn>
							 <asp:TemplateColumn HeaderText="生效日期">
								<ItemStyle HorizontalAlign="Center"></ItemStyle>
								<ItemTemplate>
									<asp:TextBox ID="txdgDate" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
