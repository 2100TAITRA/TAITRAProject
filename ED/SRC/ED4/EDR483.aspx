<%@ Page language="c#" Codebehind="EDR483.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR483" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR483 節能減紙績效統計表及非電子發文清單列印作業</TITLE>
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
		<FORM onkeyup="jf_CheckFull();" id="EDR483" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="HEIGHT: 100px; WIDTH: 100px; POSITION: absolute; LEFT: 0px; Z-INDEX: -100; TOP: 0px; VISIBILITY: hidden">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="8em"></asp:listbox>
				<asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_OD_FLOW_TYPE" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Sect" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_User" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Sect_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_dlSect_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_dlUser_Value" runat="server" CssClass="hide"></asp:textbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em" ><asp:label id="Label1" runat="server" CssClass="RequireField" >列印月份：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox tabIndex="0" id="txMonthS" runat="server" Width="3em" CssClass="RequireFieldNumeric" 
								 MaxLength="5"></asp:textbox><asp:label id="Label5" style="Z-INDEX: 0" runat="server" CssClass="RequireField"
								 >－</asp:label><asp:textbox tabIndex="0" id="txMonthE" runat="server" Width="3em" CssClass="RequireFieldNumeric" 
								 MaxLength="5"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em" ><asp:label id="Label6" runat="server" >承辦單位：</asp:label></DIV>
						<DIV class="dTD"><cc1:combobox id="dlDept" style="Z-INDEX: 0" runat="server" Width="8em" CssClass="comboBox"
								Rows="10"></cc1:combobox><cc1:combobox id="dlSect" style="Z-INDEX: 0" runat="server" Width="8em" CssClass="comboBox"
								Rows="10"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em" ><asp:label id="Label7" runat="server"
								>承辦人：</asp:label></DIV>
						<DIV class="dTD"><cc1:combobox id="dlUser" style="Z-INDEX: 0" runat="server" Width="8em"  CssClass="comboBox"
								Rows="10"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em" ><asp:label id="Label2" runat="server">非電子發文原因：</asp:label></DIV>
						<DIV class="dTD">
							<DIV class="GridDiv" style="height: 10em" data-fixed="true">
								<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False"
									PageSize="1">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="原因">
											<ItemTemplate>
												<asp:Label id="lbReason" runat="server"></asp:Label>
												<asp:Label id="lbReasonValue" runat="server" CssClass="hide" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em" ><asp:label id="Label4" runat="server" >報表類型：</asp:label></DIV>
						<DIV class="dTD"><asp:radiobutton tabIndex="30" id="rbCount" runat="server" Checked="True"
								Text="節能減紙績效統計表" GroupName="Order"></asp:radiobutton><br>
							<asp:radiobutton tabIndex="30" id="rbCountBySect" runat="server" Text="節能減紙績效統計表 (含二級單位)"
								GroupName="Order"></asp:radiobutton><br>
							<asp:radiobutton tabIndex="30" id="rbCountByEmp" style="Z-INDEX: 0" runat="server" 
								Text="節能減紙績效統計表 (含承辦人)" GroupName="Order"></asp:radiobutton><br>
							<asp:radiobutton tabIndex="30" id="rbListByDept" style="Z-INDEX: 0" runat="server" 
								Text="非電子發文清單 (依承辦單位分頁)" GroupName="Order"></asp:radiobutton><br>
							<asp:radiobutton tabIndex="30" id="rbListByReason" style="Z-INDEX: 0" runat="server" 
								Text="非電子發文清單 (依原因分頁)" GroupName="Order"></asp:radiobutton><br>
							<asp:radiobutton tabIndex="30" id="rbList" style="Z-INDEX: 0" runat="server" 
								Text="非電子發文清單 (不分頁)" GroupName="Order"></asp:radiobutton></DIV>
					</DIV>
				</DIV>
				<asp:listbox id="lbDept" runat="server" CssClass="hide"></asp:listbox>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
