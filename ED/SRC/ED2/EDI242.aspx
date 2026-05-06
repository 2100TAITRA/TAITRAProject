<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDI242.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDI242" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDI242 移轉交紀錄查詢作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDI242" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; VISIBILITY: hidden;" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:DropDownList style="Z-INDEX: 0" id="dlHiddenFromUser" runat="server"></asp:DropDownList>
				<asp:TextBox style="Z-INDEX: 0" id="txH_TranDept" runat="server"></asp:TextBox>
				<asp:TextBox style="Z-INDEX: 0" id="txH_RecevUser" runat="server" DESIGNTIMEDRAGDROP="98"></asp:TextBox>
				<asp:TextBox style="Z-INDEX: 0" id="txH_RecevDept" runat="server"></asp:TextBox>
				<asp:TextBox style="Z-INDEX: 0" id="txH_TranUser" runat="server"></asp:TextBox>
				<asp:DropDownList style="Z-INDEX: 0" id="dlHiddenToUser" runat="server"></asp:DropDownList>
			</DIV>
			<div id="BaseTable"	class="DivBaseTable">
				<div id="MainTable" class="DivTable">
					<div class="dTR">
						<div class="dTDTitle" style="width:5.5em">
							<asp:label style="Z-INDEX: 0" id="Label1" runat="server">移交人：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 24em">
							<asp:dropdownlist id="dlTranDept" runat="server" Width="9.5em" AutoPostBack="True"></asp:dropdownlist>
							<asp:dropdownlist style="Z-INDEX: 0" id="dlTranUser" runat="server" Width="9.5em"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:5.5em">
							<asp:label id="Label2" runat="server">被移交人：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 24em">
							<asp:dropdownlist style="Z-INDEX: 0" id="dlRecevDept" runat="server" Width="9.5em" AutoPostBack="True"></asp:dropdownlist>
							<asp:dropdownlist style="Z-INDEX: 0" id="dlRecevUser" runat="server" Width="9.5em" ></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:5.5em" >
							<asp:label id="Label3" runat="server">異動日期：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 24em">
							<asp:textbox id="txDateS" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>～
							<asp:textbox style="Z-INDEX: 0" id="txDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</div>
					</div>
					<div  class="dTR">
						<div class="dTDTitle" style="width:5.5em">
							<asp:label style="Z-INDEX: 0" id="Label4" runat="server">公文文號：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 24em">
							<asp:textbox id="txDocNo" runat="server" Width="5.5em" MaxLength="15"></asp:textbox>
						</div>
					</div>
					<div  class="dTR">
						<div class="dTDTitle" style="width:5.5em">
							<asp:label style="Z-INDEX: 0" id="Label5" runat="server">排序：</asp:label>
						</div>
						<div class="dTD">
							<asp:radiobuttonlist style="Z-INDEX: 0" id="rbOrderByCol" runat="server" Width="12.5em" RepeatDirection="Horizontal">
								<asp:ListItem Value="公文文號" Selected="True">公文文號</asp:ListItem>
								<asp:ListItem Value="異動日期">異動日期</asp:ListItem>
							</asp:radiobuttonlist>
						</div>
					</div>
				</div>
				<div id="GridTable" class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 18em">
						<asp:datagrid style="Z-INDEX: 0" id="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="移交人">
									<ItemTemplate>
										<asp:Label id="lbFromUser" runat="server" Width="10em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="被移交人">
									<ItemTemplate>
										<asp:Label id="lbToUser" runat="server" Width="10em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="異動日期">
									<ItemTemplate>
										<asp:Label id="lbTranDate" runat="server" Width="5.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="異動人員">
									<ItemTemplate>
										<asp:Label id="lb_TranUser" runat="server" Width="4.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號/調案單號">
									<ItemTemplate>
										<asp:Label id="lbDOC_NO" runat="server" Width="5.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbSubject" runat="server" Width="18.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="業務類別/申請類別">
									<ItemTemplate>
										<asp:Label id="lbTranType" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
