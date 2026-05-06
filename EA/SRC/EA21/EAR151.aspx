<%@ Page language="c#" Codebehind="EAR151.aspx.cs" AutoEventWireup="false" Inherits="EA21.EAR151" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR151 附件抽存歸檔查詢作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
		<style type="text/css">.fixHeaderStyle { POSITION: relative; ; TOP: expression(this.offsetParent.scrollTop) }
		</style>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<OBJECT style="DISPLAY: none" codeBase="../../STD/COMPONENT/DnP.dll#Version=1,2,3,2" classid="clsid:F0776DC2-DB5A-4E2C-8692-16F5893BEF2F"
			VIEWASTEXT>
		</OBJECT>
		<FORM id="EAR151" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericSearch.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="htxEmpName" runat="server"></asp:textbox>
				<asp:textbox id="htxUserName" runat="server"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:label id="Label1" runat="server">承辦單位：</asp:label></DIV>
						<DIV style="WIDTH: 6em" class="dTD"><asp:textbox onkeypress="jf_UPPERCASE()" id="txDeptNo" runat="server" Width="5.5em" 
								MaxLength="5"></asp:textbox></DIV>
						<DIV class="dTD">&nbsp;&nbsp;&nbsp;&nbsp;<asp:dropdownlist id="dListDeptNo" runat="server"></asp:dropdownlist><asp:dropdownlist id="dltempDept" runat="server" CssClass="hide"></asp:dropdownlist>
							<asp:textbox id="txHiddenBox" runat="server" CssClass="hide"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:label id="Label2" runat="server">承辦人：</asp:label></DIV>
						<DIV style="WIDTH: 6em" class="dTD"><asp:textbox onkeypress="jf_UPPERCASE()" id="txEmpName" runat="server" Width="5.5em" 
								MaxLength="6"></asp:textbox></DIV>
						<DIV class="dTD">&nbsp;&nbsp;&nbsp;&nbsp;<asp:dropdownlist id="dListEmpName" runat="server" Width="10em"></asp:dropdownlist><asp:dropdownlist id="dltempEmp" runat="server" CssClass="hide"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:label id="Label3" runat="server">查詢項目：</asp:label></DIV>
						<DIV class="dTD">
							<asp:CheckBox id="cb1" runat="server" Text="未歸檔"></asp:CheckBox>
							<asp:CheckBox id="cb2" runat="server" Text="已歸檔"></asp:CheckBox>
							<asp:CheckBox id="cb3" runat="server" Text="已遺失"></asp:CheckBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:label id="Label4" runat="server" 
								>預計歸檔日期：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txExtfileDateS" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
							<asp:label id="Label9" runat="server" >～</asp:label>
							<asp:textbox id="txExtfileDateE" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em">
							<asp:label id="Label5" runat="server">實際歸檔日期：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txFileDateS" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
							<asp:label id="Label10" runat="server" >～</asp:label>
							<asp:textbox id="txFileDateE" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
							<asp:DropDownList id="dlMediaType" runat="server" CssClass="hide"></asp:DropDownList>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:label id="Label11" runat="server" >點收日期：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txACPDateS" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
							<asp:label id="Label13" runat="server" >～</asp:label>
							<asp:textbox id="txACPDateE" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:label id="Label12" runat="server" >歸檔日期：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txFileDateEXAMS" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
							<asp:label id="Label14" runat="server" >～</asp:label>
							<asp:textbox id="txFileDateEXAME" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						</DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV class="GridDiv">
						<asp:datagrid id="dg1" runat="server" PageSize="30" AutoGenerateColumns="False"	GridLines="Vertical" CellPadding="0" EnableViewState="False">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位">
									<ItemTemplate>
										<asp:Label id="Label6" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦人">
									<ItemTemplate>
										<asp:Label id="lbRead1" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:HyperLink id="hlLink" tabIndex="0" runat="server"></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="預計歸檔日期">
									<ItemTemplate>
										<asp:Label id="lbRead2" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="實際歸檔日期">
									<ItemTemplate>
										<asp:Label id="Label7" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="備註">
									<ItemTemplate>
										<asp:Label id="Label8" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" class="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
