<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKT815.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT815" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT815 調案單文歸還及展期作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKT815" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label1" runat="server">文(編)號：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDocNo" tabIndex="10" runat="server" Width="7em"></asp:textbox>&nbsp;
							<asp:button id="btConfirm" accessKey="S" tabIndex="11" runat="server" Width="3.5em" Text="確定"></asp:button>&nbsp;
							<asp:button id="btQuit" accessKey="Q" tabIndex="12" runat="server" Width="3.5em" Text="取消"></asp:button>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label2" runat="server">異動別：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:radiobutton id="rbRet" tabIndex="13" runat="server" Text="歸還" GroupName="GN"></asp:radiobutton>
							<asp:radiobutton id="rbBor" tabIndex="15" runat="server" Text="展期" GroupName="GN"></asp:radiobutton>
							<asp:TextBox id="H_Date" tabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbDate" runat="server">展期日期：</asp:label></div>
						<div class="dTD" style="WIDTH: 15.5em">
							<asp:textbox id="txDate" class="InputFieldNumeric" tabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:textbox>
							<asp:TextBox id="H_Save" tabIndex="-1" runat="server" CssClass="hide" Width="13px"></asp:TextBox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbReason" runat="server">展期原因：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<asp:dropdownlist id="dlReason" tabIndex="30" runat="server" Width="10em"></asp:dropdownlist></div>
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbDesc" runat="server">原因說明：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDesc" tabIndex="40" runat="server" Width="15em" MaxLength="100"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label3" runat="server">保存狀況：</asp:label></div>
						<div class="dTD">
							<asp:DropDownList id="dlKeepNo" runat="server"></asp:DropDownList></div>
					</div>
				</div>
				<asp:textbox id="H_Value" tabIndex="-1" runat="server" Width="174px" CssClass="hide"></asp:textbox>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<asp:Panel ID="dgTool" runat="server" CssClass="dTD DgSelectToolBar">
								<asp:Button ID="btAll" runat="server" Text="全選"></asp:Button>
								<asp:Button ID="btCleanDg" runat="server" Text="清除"></asp:Button>
								<asp:Button ID="btChange" runat="server" Text="反向"></asp:Button>
							</asp:Panel>
							<DIV class="GridDiv" style="HEIGHT: 194px">
								<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2" 
									BorderWidth="1px" ForeColor="Black" BorderColor="White" BorderStyle="Double" BackColor="White" PageSize="50">
									<Columns>
										<asp:TemplateColumn HeaderText="取消">
											<ItemTemplate>
												<asp:CheckBox id="cb1" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server"></asp:Label>
												<asp:TextBox id="H_Seq" tabIndex="-1" runat="server" CssClass="hide" Width="9px"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="文(編)號">
											<ItemTemplate>
												<asp:HyperLink id="hlDocNo" runat="server"></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="調案單號">
											<ItemTemplate>
												<asp:Label id="lbBorNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="調案日期">
											<ItemTemplate>
												<asp:Label id="lbBorDate" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="應歸日期">
											<ItemTemplate>
												<asp:Label id="lbDueDate" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="展期<br>次數">
											<ItemTemplate>
												<asp:Label id="lbBorCnt" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="異動別">
											<ItemTemplate>
												<asp:Label id="lbType" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="異動說明">
											<ItemTemplate>
												<asp:Label id="lbBorDesc" runat="server"></asp:Label>
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
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
