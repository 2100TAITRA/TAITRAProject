<%@ Page language="c#" Codebehind="ODR251.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR251" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>ODR251 待歸檔公文查詢及列印作業</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<LINK href="LIB/AK.css" type="text/css" rel="stylesheet">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body class="" MS_POSITIONING="GridLayout">
		<form id="ODR251" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label1" runat="server" >承辦單位：</asp:label></div>
						<div class="dTD" style="width: 10em">
							<cc1:combobox id="dlDept" runat="server"  Width="7em" CssClass="comboBox"></cc1:combobox></div>
						<div class="dTDTitle">
							<asp:label id="Label2" runat="server" >承辦人：</asp:label></div>
						<div class="dTD">
							<cc1:combobox id="dlUser" runat="server"  Width="7em" CssClass="comboBox"></cc1:combobox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label3" runat="server" >主　　旨：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txFromSubject" runat="server"  Width="24em"></asp:textbox></div>
					</div>
				</div>
				<asp:textbox id="H_Value" tabIndex="-1" runat="server" CssClass="hide" Width="165px"></asp:textbox>
				<asp:textbox id="H_Change" tabIndex="-1" runat="server" CssClass="hide" Width="127px"></asp:textbox>
				<asp:textbox id="H_SysDate" tabIndex="-1" runat="server" CssClass="hide" Width="78px" ></asp:textbox>
				<asp:listbox id="lbDept" runat="server" CssClass="hide"></asp:listbox>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 314px">
								<asp:datagrid id="dg1" runat="server"  AutoGenerateColumns="False" PageSize="50" 
								BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="2" 
								GridLines="Vertical" ShowHeader="true">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="承辦人">
											<ItemTemplate>
												<asp:TextBox id="txEmpName" tabIndex="-1" runat="server" CssClass="TextLabel" Width="4.5em" ReadOnly="True"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="公文文號">
											<ItemTemplate>
												<asp:Label id="lbDocNo" runat="server"></asp:Label><BR>
												<asp:HyperLink id="hlApply" runat="server">延後歸檔申請</asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="收(創)文<BR>日期">
											<ItemTemplate>
												<asp:Label id="lbRcvDate" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="結案日期">
											<ItemTemplate>
												<asp:Label id="lbCloseDate" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="應歸檔<BR>日期">
											<ItemTemplate>
												<asp:Label id="lbExtfileDate" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="目前所在<BR>位置">
											<ItemTemplate>
												<asp:Label id="lbPosition" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="主旨">
											<ItemTemplate>
												<asp:TextBox id="txSubject" tabIndex="-1" runat="server" CssClass="PopUp" Width="16em" ReadOnly="True"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
