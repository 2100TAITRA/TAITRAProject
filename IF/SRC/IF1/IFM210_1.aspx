<%@ Page language="c#" Codebehind="IFM210_1.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM210_1" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM210_1 單位及角色維護作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM210_1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server"></asp:listbox>
				<asp:textbox id="H_LastInfo" runat="server"></asp:textbox>
			</DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em;"><asp:label id="Label1" runat="server" CssClass="KeyField">隸屬機關：</asp:label></div>
						<div class="dTD" colSpan="3"><asp:label id="lbSourceOrgNO" runat="server" Width="19em"></asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em;"><asp:label id="Label2" runat="server" CssClass="RequireField">單位：</asp:label></div>
						<div class="dTD" colSpan="3"><asp:label id="lbDeptName" runat="server" Width="19em"></asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em;"><asp:label id="Label3" runat="server">角色代碼：</asp:label></div>
						<div class="dTD" style="WIDTH: 7em;"><asp:textbox id="txRoleNo" runat="server" Width="6em" MaxLength="4"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 7em;"><asp:label id="Label12" runat="server">所具備權利：</asp:label></div>
						<div class="dTD" style="WIDTH: 4em;"><asp:button id="btDeployPrivilege" runat="server" Text="設定"></asp:button></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em"><asp:label id="lable1" runat="server">角色名稱：</asp:label></div>
						<div class="dTD" style="WIDTH: 7em"><asp:listbox style="DISPLAY: none" id="lbRoleOccupant" runat="server" Width="6em"></asp:listbox><asp:textbox id="txRoleName" runat="server" Width="6em" MaxLength="20"></asp:textbox></div>
						<div class="dTDTitle" style="WIDTH: 7em"><asp:label id="Label4" runat="server">環境設定：</asp:label></div>
						<div class="dTD" style="WIDTH: 4em;"><asp:button id="btEnvSetting" runat="server" Text="設定"></asp:button></div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<div class="GridDiv" style="HEIGHT: 404px;">
								<asp:datagrid id="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50" AutoGenerateColumns="False">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="扮演此角色之人員">
											<ItemTemplate>
												<asp:TextBox id="txAccount" onblur="CallGetAccountName(this);" runat="server" Width="5em" MaxLength="20"></asp:TextBox>
												<asp:TextBox id="txRoleOccupant" runat="server" Width="5.5em" CssClass="DisplayOnly"></asp:TextBox>
												<asp:Button id="btSet" runat="server" Width="4em" Text="設定"></asp:Button>
												<asp:Button id="btDel" runat="server" Width="4em" Text="刪除"></asp:Button>
												<asp:Label id="lbTitle" runat="server" CssClass="hide">職稱：</asp:Label>
												<asp:TextBox id="txTitle" runat="server" CssClass="hide" ReadOnly="True"></asp:TextBox>
												<asp:CheckBox id="cbEnable" runat="server" CssClass="hide" Text="啟用" Enabled="False"></asp:CheckBox>
												<asp:Button id="btModify" runat="server" CssClass="hide" Text="修改"></asp:Button>
												<asp:TextBox id="h_UserId" runat="server" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
				<asp:TextBox style="Z-INDEX: 0" id="H_txUnitNo" runat="server" CssClass="hide"></asp:TextBox>
				<asp:dropdownlist id="H_dlUSERNAME" runat="server" CssClass="hide"></asp:dropdownlist><asp:textbox id="txActiveOrgNo" runat="server" CssClass="hide"></asp:textbox><asp:dropdownlist id="dlCheckUser" runat="server" CssClass="hide"></asp:dropdownlist><asp:dropdownlist id="H_dlUserId" runat="server" CssClass="hide"></asp:dropdownlist>
			</DIV>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btPrint" Accesskey="P" title="更新組織結構檔(ALT+P)" runat="server" Text="更新組織結構檔(P)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"  CssClass="hide"/>
			</asp:Panel></FORM>
	</BODY>
</HTML>
