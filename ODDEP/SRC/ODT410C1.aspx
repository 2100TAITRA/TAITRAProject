<%@ Page language="c#" Codebehind="ODT410C1.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT410C1" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE>
<HTML>
	<HEAD>
		<title>ODT410C1 文書處理流程個案分析查詢作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<LINK href="LIB/AK.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODT410C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<DIV id="service" style="BEHAVIOR: url(Template/LIB/webservice.htc)"></DIV>
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="Hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
							<asp:label id="Label7" runat="server" >結案日期：</asp:label>
						</div>
						<div class="dTD" style="width: 13.5em">
							<asp:textbox id="txSDate" CssClass="DatePicker" tabIndex="20" runat="server"  MaxLength="7" Width="4em"></asp:textbox>－
							<asp:textbox id="txEDate" CssClass="DatePicker" tabIndex="25" runat="server"  MaxLength="7" Width="4em"></asp:textbox>
						</div>
						<div class="dTDTitle" style="width: 5.5em"><asp:label id="Label6" runat="server" >公文性質：</asp:label></div>
						<div class="dTD"><asp:dropdownlist id="dlProperty" tabIndex="27" runat="server" ></asp:dropdownlist></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em"><asp:label id="Label4" runat="server" >承辦單位：</asp:label></div>
						<div class="dTD" style="width: 13.5em">
							<cc1:combobox id="dlDept" tabIndex="30" runat="server" CssClass="comboBox"></cc1:combobox>
							<asp:listbox id="lbDept" runat="server" CssClass="hide" Width="6em"></asp:listbox>
							<asp:textbox id="H_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_Change" runat="server" CssClass="hide"></asp:textbox>
						</div>
						<div class="dTDTitle" style="width: 5.5em"><asp:label id="Label5" runat="server" >承辦人：</asp:label></div>
						<div class="dTD"><cc1:combobox id="dlUser" tabIndex="35" runat="server" CssClass="comboBox"></cc1:combobox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em"><asp:label id="Label1" runat="server" >辦理天數：</asp:label></div>
						<div class="dTD" style="width: 13.5em">
							<asp:label id="Label8" runat="server"  >超過</asp:label>
							<asp:textbox id="txCount" tabIndex="40" CssClass="InputFieldNumeric" runat="server"  MaxLength="3" Width="2em"></asp:textbox>
							<asp:label id="Label9" runat="server"  >天</asp:label>
						</div>
						<div class="dTDTitle" style="width: 5.5em"><asp:label id="Label2" runat="server" >排序：</asp:label></div>
						<div class="dTD">
							<asp:radiobuttonlist id="rbSort" runat="server"  RepeatDirection="Horizontal">
								<asp:ListItem Value="1">公文文號</asp:ListItem>
								<asp:ListItem Value="2">結案日期</asp:ListItem>
							</asp:radiobuttonlist>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 20em">
						<asp:datagrid id="dg1" runat="server" PageSize="30" CellPadding="1" GridLines="Vertical" AutoGenerateColumns="False">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbNo" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:HyperLink id="hlDocNo" runat="server" ></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="結案日期">
									<ItemTemplate>
										<asp:Label id="lbCloseDate" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="辦理天數">
									<ItemTemplate>
										<asp:Label id="lbWorkDay" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位">
									<ItemTemplate>
										<asp:Label id="lbDeptName" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦人">
									<ItemTemplate>
										<asp:Label id="lbUserName" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:TextBox id="txSubject" tabIndex="-1" runat="server" CssClass="PopUp" ReadOnly="True"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
			</form>
	</body>
</HTML>
