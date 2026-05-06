<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR403.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR403" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR403 稽催計數統計表列印及明細查詢作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR403" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label1" runat="server" CssClass="KeyField">稽催日期：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:textbox id="txDateS" tabIndex="0" runat="server" Width="4em" CssClass="KeyUpperField DatePicker" MaxLength="7"></asp:textbox>
							<asp:label id="Label5" runat="server">－</asp:label>
							<asp:textbox id="txDateE" tabIndex="0" runat="server" Width="4em" CssClass="KeyUpperField DatePicker" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="lbDeptName" runat="server" EnableViewState="False">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<cc1:combobox id="dlDept" tabIndex="30" runat="server" Width="7.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="lbSect" runat="server" EnableViewState="False">承辦科別：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<cc1:combobox id="dlSect" tabIndex="40" runat="server" Width="7.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label6" runat="server" EnableViewState="False">承辦人：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<cc1:combobox id="dlUser" tabIndex="50" runat="server" Width="7.5em" CssClass="comboBox"></cc1:combobox>
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
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label3" runat="server">公文類型：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:radiobutton id="rbType1" runat="server" Text="主辦" GroupName="type"></asp:radiobutton>
							<asp:radiobutton id="rbType2" runat="server" Text="會辦" GroupName="type"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label4" runat="server">報表種類：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:radiobutton id="rbRpt1" runat="server" Text="稽催計數統計表" GroupName="rpt"></asp:radiobutton>
							<asp:radiobutton id="rbRpt2" runat="server" Text="稽催公文明細" GroupName="rpt"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label7" runat="server">列印設定：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:radiobutton id="rbOU_ID" runat="server" Text="依組室換頁" GroupName="print"></asp:radiobutton>
							<asp:radiobutton id="rbEMP" runat="server" Text="依承辦人換頁" GroupName="print"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label8" runat="server">排序方式：</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 21.5em">
							<asp:radiobutton id="rbSort_Dept" runat="server" Text="承辦單位" GroupName="sort"></asp:radiobutton>
							<asp:radiobutton id="rbSort_Emp" runat="server" Text="承辦人" GroupName="sort"></asp:radiobutton>
							<asp:radiobutton id="rbSort_DocNo" runat="server" Text="公文文號" GroupName="sort"></asp:radiobutton>
						</DIV>
					</DIV>
				</DIV>
				<asp:listbox id="lbDept" runat="server" CssClass="hide"></asp:listbox>
				<DIV id="GridTable" class="DivTable">
					<DIV id="DIV1" style="HEIGHT: 28.5em" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:Label id="lbDOC_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="收創文日期">
									<ItemTemplate>
										<asp:Label id="lbRCV_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="原始限辦日期">
									<ItemTemplate>
										<asp:Label id="lbPDUE_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="限辦日期">
									<ItemTemplate>
										<asp:Label id="lbDUE_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbFROM_SUBJECT" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位">
									<ItemTemplate>
										<asp:Label id="lbDEPT_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦人">
									<ItemTemplate>
										<asp:Label id="lbEMP_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="展期&lt;BR&gt;次數">
									<ItemTemplate>
										<asp:Label id="lbSEXT_DAY" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="稽催&lt;BR&gt;次數">
									<ItemTemplate>
										<asp:Label id="lbSPROCESS_AUDIT" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="稽催日期">
									<ItemTemplate>
										<asp:Label id="lbAUDIT_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
					<DIV id="DIV2" style="HEIGHT: 28.5em" class="GridDiv">
						<asp:datagrid id="dg2" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:Label id="lbDOC_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="收創文日期">
									<ItemTemplate>
										<asp:Label id="lbRCV_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="原始限辦日期">
									<ItemTemplate>
										<asp:Label id="lbPDUE_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="限辦日期">
									<ItemTemplate>
										<asp:Label id="lbDUE_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbFROM_SUBJECT" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位">
									<ItemTemplate>
										<asp:Label id="lbDEPT_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦人">
									<ItemTemplate>
										<asp:Label id="lbEMP_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="會辦單位">
									<ItemTemplate>
										<asp:Label id="lbOU_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="會辦人">
									<ItemTemplate>
										<asp:Label id="lbUSER_NAME" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="稽催&lt;BR&gt;次數">
									<ItemTemplate>
										<asp:Label id="lbSPROCESS_AUDIT" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="稽催日期">
									<ItemTemplate>
										<asp:Label id="lbAUDIT_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="稽催明細Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
