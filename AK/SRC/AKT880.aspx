<%@ Page language="c#" Codebehind="AKT880.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT880" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT880 應用數位內容準備</title>
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
		<form id="AKT880" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em"><asp:label class="RequireField" id="Label2"  runat="server">承辦單位：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 10.5em"><cc1:combobox id="dlUnit" runat="server" Width="8.5em" CssClass="comboBox"></cc1:combobox></DIV>
						<DIV class="dTDTitle" style="WIDTH: 5em"><asp:label class="RequireField" id="Label1"  runat="server">承辦人：</asp:label></DIV>
						<DIV class="dTD"><cc1:combobox id="dlName" runat="server" Width="7em" CssClass="comboBox"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em"><asp:label id="Label4"  runat="server">申請書號：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 10.5em"><asp:dropdownlist id="dlApplyNo" runat="server" Width="6em"></asp:dropdownlist></DIV>
						<DIV class="dTDTitle" style="WIDTH: 5em"><asp:label id="Label5"  runat="server">申請人：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txApplyEmp"  runat="server" CssClass="DisplayOnly" Width="5em"></asp:textbox>
							<asp:TextBox id="txUserValue" runat="server" CssClass="hidden" Width="59px"></asp:TextBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 10.5em">
							<asp:Label id="lbNoApply" runat="server" CssClass="hidden" ForeColor="Red">無待處理申請書！</asp:Label></DIV>
						<DIV class="dTDTitle" style="WIDTH: 5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:TextBox id="htxApplyNo" runat="server" CssClass="hide" Width="5em"></asp:TextBox></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">				
					<DIV class="dTR">
						<DIV class="GridDiv" style="HEIGHT: 17em" data-fixed="true">
							<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical">
								<Columns>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label id="lbNo" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="文號(檔號)">
										<ItemTemplate> 
											<asp:Label id="lbFileNo"  runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="案由">
										<ItemTemplate>
											<asp:Label id="lbDesc"  runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="抄錄閱覽">
										<ItemTemplate>
											<asp:Label id="lbView"  runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="提供複製品">
										<ItemTemplate>
											<asp:Label id="lbCopy"  runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="駁回原因／遮掩頁次">
										<ItemTemplate>
											<asp:Label id="lbReason"  runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:datagrid>
						</DIV>
					</DIV>	
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:35em">
							<asp:label id="lbEmail" runat="server">電子傳遞位址：</asp:label>
							<asp:textbox id="txMail" runat="server" Width="290px"></asp:textbox>
						</DIV>	
					</DIV>	
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟審核資料(M)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSave" runat="server" Text="開啟數位內容(S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btEmail" runat="server" Text="電子傳遞(ALT+W)" AccessKey = "W" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btRemail" runat="server" Text="Mail通知已郵寄(ALT+R)" AccessKey = "R" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>			
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
