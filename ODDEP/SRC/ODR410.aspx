<%@ Page language="c#" Codebehind="ODR410.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR410" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR410 稽催通知單列印作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body class="hidden" MS_POSITIONING="GridLayout">
		<form id="ODR410" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:textbox id="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_Sect_Text" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_Dept_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_Dept_Text" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_User_Text" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_Sect_AllValue" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:textbox id="H_User_AllValue" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; POSITION: absolute; TOP: 102px; LEFT: 10px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em" >
							<asp:label id="Label1" runat="server" >承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="H_Value" tabIndex="-1" runat="server" CssClass="hide" Width="165px"></asp:textbox>
							<cc1:combobox id="dlDept" runat="server" Width="7em" Rows="8" CssClass="comboBox"></cc1:combobox>
							<cc1:combobox id="dlSect" runat="server" Width="7em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em" >
							<asp:label id="Label2" runat="server" >承辦人：</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox id="dlUser" runat="server" Width="7em" Rows="8" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em" >
							<asp:label id="Label3" runat="server" >逾期天數：</asp:label>
						</DIV>
						<DIV class="dTD">
							<DIV id="divBehind1">
								<asp:label id="Label4" runat="server" >自</asp:label>
								<asp:textbox style="TEXT-ALIGN: right" id="txSDay" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox>
								<asp:label id="Label5" runat="server" >天至</asp:label>
								<asp:textbox style="TEXT-ALIGN: right" id="txEDay" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox>
								<asp:label id="Label6" runat="server" >天</asp:label>
							</DIV>
							<DIV id="divBehind2" class="hide">
								<asp:label id="Label7" runat="server" >逾</asp:label>
								<asp:textbox style="TEXT-ALIGN: right" id="txBehind" runat="server" Width="2em" MaxLength="3"></asp:textbox>
								<asp:label id="Label8" runat="server" >天以上</asp:label>
							</DIV>
						</DIV>
					</DIV>
					<DIV class="dTR hide">
						<DIV class="dTDTitle" style="WIDTH: 9em" >
							<asp:label id="Label9" runat="server" >依稽催日期查詢：</asp:label>
						</DIV>
						<DIV class="dTD">
							<DIV class="dTR">
								<asp:textbox id="txSDate" tabIndex="20" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:textbox>－							
								<asp:textbox id="txEDate" tabIndex="25" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:textbox>
							</DIV>
						</DIV>
					</DIV>					
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em" >&nbsp;</DIV>
						<DIV class="dTD">
							<asp:checkbox style="Z-INDEX: 0" id="cbaddline" runat="server" Text="報表列印隔線"></asp:checkbox>
						</DIV>
					</DIV>
				</DIV>
				<DIV style="HEIGHT: 12.5em">
					<asp:datagrid id="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50"></asp:datagrid>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator style="Z-INDEX: 104; POSITION: absolute; TOP: 218px; LEFT: 12px" id="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; POSITION: absolute; TOP: 252px; LEFT: 12px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
