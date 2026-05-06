<%@ Page language="c#" Codebehind="ODR471.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR471" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>ODR471 公文抽查作業</title>
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
	<body MS_POSITIONING="GridLayout">
		<form id="ODR471" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericSearch.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label7" runat="server" style="WIDTH: 10em">收文日期：</asp:label></div>
						<div class="dTD" style="WIDTH: 13em">
							<asp:textbox id="txSDate" tabIndex="20"
								runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:textbox>－
							<asp:textbox id="txEDate" tabIndex="25"
								runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:textbox>
						</div>
						<div class="dTDTitle" >
							<asp:label id="Label6" runat="server" >公文文號尾數：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDocNo" tabIndex="30" runat="server"  Width="5.5em"
								MaxLength="10"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label2" runat="server" >排序：</asp:label></div>
						<div class="dTD">
							<asp:radiobuttonlist id="rbSort" tabIndex="35" runat="server"  Width="18em"
								RepeatDirection="Horizontal">
								<asp:ListItem Value="1">公文文號</asp:ListItem>
								<asp:ListItem Value="2">收文日期</asp:ListItem>
								<asp:ListItem Value="3">承辦單位</asp:ListItem>
							</asp:radiobuttonlist>
							<asp:textbox id="ORGNO" CssClass="hide" Runat="server"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label1" runat="server" >抽樣件數：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txRandom" tabIndex="30" runat="server"  Width="2em"
									MaxLength="10"></asp:textbox>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<div class="dTR">
								<div class="dTD" >
									<asp:button id="btSelectAll" runat="server" Text="全選"></asp:button></div>
								<div class="dTD" >
									<asp:button id="btClean" runat="server" Text="清除"></asp:button></div>
								<div class="dTD">
									<asp:button id="btReverse" runat="server" Text="反向"></asp:button></div>
							</div>
							<DIV class="GridDiv" id="DIV1" style="HEIGHT: 316px">
								<asp:datagrid id="dg1" runat="server" PageSize="30" BackColor="White"
									BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="1" GridLines="Vertical" AutoGenerateColumns="False">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="公文文號">
											<ItemTemplate>
												<asp:Label id="lbDocNo" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="收文日期">
											<ItemTemplate>
												<asp:Label id="lbRcvDate" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="狀態">
											<ItemTemplate>
												<asp:Label id="lbStatus" runat="server" ></asp:Label>
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
												<asp:TextBox id="txSubject" tabIndex="-1" runat="server" CssClass="PopUp" Width="15em" ReadOnly="True"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="檔號">
											<ItemTemplate>
												<asp:Label id="lbFILENO" runat="server" ></asp:Label>
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
				<asp:Button ID="btExcel" runat="server" Text="明細表匯出" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
