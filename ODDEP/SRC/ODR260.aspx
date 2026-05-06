<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR260.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR260" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR260 決行公文清單列印作業</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODR260" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox style="Z-INDEX: 102; POSITION: absolute; TOP: 102px; LEFT: 10px" id="lbReturnValue" runat="server" CssClass="hidden"></asp:listbox>
				<asp:textbox id="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
				<asp:textbox id="H_Sect_Text" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
				<asp:textbox id="H_Dept_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
				<asp:textbox id="H_Dept_Text" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
				<asp:textbox id="H_Sect_AllValue" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<div id="BaseTable" class="DivBaseTable">
				<div id="MainTable" class="DivTable">
					<div class="dTR">
						<div style="WIDTH: 9.5em" class="dTDTitle">
							<asp:label id="Label1" runat="server">承辦單位：</asp:label>
						</div>
						<div class="dTD">
							<cc1:combobox id="dlDept" runat="server" Width="7em" CssClass="comboBox"></cc1:combobox>
							<cc1:combobox id="dlSect" tabIndex="10" runat="server" Width="7em" CssClass="comboBox"></cc1:combobox>
						</div>
					</div>
					<div class="dTR">
						<div style="WIDTH: 9.5em" class="dTDTitle">
							<asp:dropdownlist id="dlDateType" runat="server" CssClass="RequireField">
								<asp:ListItem Value="RCVDATE">收(創)文日期：</asp:ListItem>
								<asp:ListItem Value="CLOSEDATE">結案日期：</asp:ListItem>
								<asp:ListItem Value="APPROVEDATE">決行日期：</asp:ListItem>
							</asp:dropdownlist>
						</div>
						<div class="dTD">
							<asp:textbox id="txSDate" tabIndex="15" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker RequireField"></asp:textbox>－
							<asp:textbox id="txEDate" tabIndex="20" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker RequireField"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div style="WIDTH: 9.5em" class="dTDTitle">
							<asp:label id="Label3" runat="server">決行層次：</asp:label>
						</div>
						<div class="dTD">
							<asp:radiobutton id="rbAll" tabIndex="25" runat="server" GroupName="gn"	Text="全部"></asp:radiobutton>
							<asp:radiobutton id="rb1" tabIndex="30" runat="server" GroupName="gn" Text="一層"></asp:radiobutton>
							<asp:radiobutton id="rb2" tabIndex="35" runat="server" GroupName="gn" Text="二層"></asp:radiobutton>
							<asp:radiobutton id="rb3" tabIndex="40" runat="server" GroupName="gn" Text="三層"></asp:radiobutton>
							<asp:radiobutton id="rb4" tabIndex="45" runat="server" GroupName="gn" Text="四層"></asp:radiobutton>
						</div>
					</div>
					<div class="dTR" id="divAppUser" runat="server">
						<div style="WIDTH: 9.5em" class="dTDTitle">
							<asp:label id="Label5" runat="server">核決者：</asp:label>
						</div>
						<div class="dTD">
							<cc1:combobox id="dlAppUser" runat="server" Width="7em" CssClass="comboBox"></cc1:combobox>
							<asp:textbox id="txAppUserList" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="txAppUser" runat="server" CssClass="hide"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div style="width: 9.5em" class="dTDTitle">
							<asp:label id="Label2" runat="server">結案類型：</asp:label>
						</div>
						<div class="dTD">
							<asp:radiobutton id="rbCloseAll" runat="server" GroupName="Close" Text="全部"></asp:radiobutton>
							<asp:radiobutton id="rbClose1" runat="server" GroupName="Close" Text="總發文"></asp:radiobutton>
							<asp:radiobutton id="rbClose2" runat="server" GroupName="Close" Text="單位發文"></asp:radiobutton>
							<asp:radiobutton id="rbClose3" runat="server" GroupName="Close" Text="存查"></asp:radiobutton>
						</div>
					</div>

					<div class="dTR">
						<div style="WIDTH: 9.5em" class="dTDTitle">
							<asp:label id="Label4" runat="server">排序：</asp:label>
						</div>
						<div class="dTD">
							<asp:checkbox id="cbSort" runat="server" Text="紙本簽核優先"></asp:checkbox>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 12.5em">
						<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSeq" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:Label id="lbDocNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbSubject" runat="server" Width="9.5em"	STYLE="OVERFLOW:hidden"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位">
									<ItemTemplate>
										<asp:Label id="lbDept" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦人">
									<ItemTemplate>
										<asp:Label id="lbUser" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="簽核類型">
									<ItemTemplate>
										<asp:Label id="lbSignType" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="來文日期">
									<ItemTemplate>
										<asp:Label id="lbFromDate" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="來文機關">
									<ItemTemplate>
										<asp:Label id="lbFromOrg" runat="server" STYLE="OVERFLOW:hidden"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="核決者">
									<ItemTemplate>
										<asp:Label id="lbAppUser" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="決行日期">
									<ItemTemplate>
										<asp:Label id="lbAppDate" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="決行層次">
									<ItemTemplate>
										<asp:Label id="lbApplvl" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator style="Z-INDEX: 104; POSITION: absolute; TOP: 218px; LEFT: 12px" id="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary style="Z-INDEX: 105; POSITION: absolute; TOP: 252px; LEFT: 12px" id="ValidationSummary1"	runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
