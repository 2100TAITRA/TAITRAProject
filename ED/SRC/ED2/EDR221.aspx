<%@ Page language="c#" Codebehind="EDR221.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR221" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR221 異動撤銷申請查詢作業</title>
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
    <form id="EDR221" onkeyup="jf_CheckFull();" method="post" runat="server" novalidate>
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
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label1" runat="server">申請日期起迄：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyDateS" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox> - 
                        <asp:TextBox ID="txApplyDateE" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label2" runat="server">申請公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="8em"></asp:TextBox> - 
                        <asp:TextBox ID="txDocNoE" runat="server" Width="8em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label3" runat="server">申請單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label4" runat="server">申請科別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSect" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label5" runat="server">申請人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUser" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label6" runat="server">申請狀態：</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:radiobutton id="rbAll" runat="server" Text="全部" GroupName="Status"></asp:radiobutton>
						<asp:radiobutton id="rbRevoke" runat="server" Text="已撤銷" GroupName="Status"></asp:radiobutton>
						<asp:radiobutton id="rbApprove" runat="server" Text="已核可待撤銷" GroupName="Status"></asp:radiobutton>
						<asp:radiobutton id="rbApply" runat="server" Text="申請中" GroupName="Status"></asp:radiobutton>
						<asp:radiobutton id="rbBack" runat="server" Text="已退回" GroupName="Status"></asp:radiobutton>
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
							<asp:TemplateColumn HeaderText="申請日期">
								<ItemTemplate>
									<asp:Label ID="lbApplyDate" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請公文文號">
								<ItemTemplate>
									<asp:Label ID="lbDocNo" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="刪除序號&lt;BR&gt;後流程">
								<ItemTemplate>
									<asp:Label ID="lbRecoverSeq" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請單位">
								<ItemTemplate>
									<asp:Label ID="lbApplyDept" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請人">
								<ItemTemplate>
									<asp:Label ID="lbApplyUser" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請單號">
								<ItemTemplate>
									<asp:Label ID="lbApplyNo" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請事由">
								<ItemTemplate>
									<asp:Label ID="lbApplyReason" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="核准日期/長官">
								<ItemTemplate>
									<asp:Label ID="lbApproveInfo" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="執行刪除日期及人員">
								<ItemTemplate>
									<asp:Label ID="lbRevokeInfo" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請狀態">
								<ItemTemplate>
									<asp:Label ID="lbApplyStatus" runat="server"></asp:Label>
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
