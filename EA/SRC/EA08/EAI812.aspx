<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAI812.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAI812" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAI812 移交申請查詢作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY>
		<FORM id="EAI812" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
                <asp:TextBox Style="z-index: 0" ID="H_dlDept_Value" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox Style="z-index: 0" ID="H_dlDept_T_Value" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_Dept_T" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_Dept_T_Value" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_dlSect_T_Value" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_Sect_T" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_Sect_T_Value" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_dlUser_T_Value" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_User_T" runat="server" CssClass="hide"></asp:TextBox>
			    <asp:TextBox Style="z-index: 0" ID="H_User_T_Value" runat="server" CssClass="hide"></asp:TextBox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label1" runat="server">申請單號：</asp:label></div>
                        <div class="dTD" style="WIDTH: 14em">
                            <asp:textbox id="txAppNoS" runat="server" Width="4.5em" MaxLength="8"></asp:textbox>~
                            <asp:textbox id="txAppNoE" runat="server" Width="4.5em" MaxLength="8"></asp:textbox>
                        </div>
                        <div class="dTDTitle" style="WIDTH: 5.5em">
                            <asp:label id="Label2" runat="server">申請日期：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txAppDateS" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>~
                            <asp:textbox id="txAppDateE" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
                        </div>
                    </div>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em"><asp:label id="Label3" runat="server">承辦單位：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 11em">
                            <cc1:combobox id="dlDept" runat="server" Width="8.5em" Rows="10" CssClass="comboBox"></cc1:combobox>
						</DIV>
						<DIV class="dTD" style="WIDTH: 11em">
							<cc1:combobox id="dlSect" runat="server" Width="8.5em" Rows="10" CssClass="comboBox"></cc1:combobox>
						</DIV>
						<DIV class="dTD" style="WIDTH: 11em">
							<cc1:combobox id="dlUser" runat="server" Width="8.5em" Rows="10" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em"><asp:label id="Label4" runat="server">接管單位：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 11em">
                            <cc1:combobox id="dlDept_T" runat="server" Width="8.5em" Rows="10" CssClass="comboBox"></cc1:combobox>
						</DIV>
						<DIV class="dTD" style="WIDTH: 11em">
							<cc1:combobox id="dlSect_T" runat="server" Width="8.5em" Rows="10" CssClass="comboBox"></cc1:combobox>
						</DIV>
						<DIV class="dTD" style="WIDTH: 11em">
							<cc1:combobox id="dlUser_T" runat="server" Width="8.5em" Rows="10" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 5.5em" class="dTDTitle"><asp:label id="Label5" runat="server">申請狀態：</asp:label></DIV>
						<DIV class="dTD">
                            <asp:radiobutton id="rbCheck" runat="server" Text="審核中" GroupName="rbStatus"></asp:radiobutton>
							<asp:radiobutton id="rbApprove" runat="server" Text="已核准" GroupName="rbStatus"></asp:radiobutton>
							<asp:radiobutton id="rbTypeAll" runat="server" Text="全部" GroupName="rbStatus"></asp:radiobutton>
                        </DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 5.5em" class="dTDTitle"><asp:label id="Label6" runat="server">排　　序：</asp:label></DIV>
						<DIV class="dTD">
                            <asp:radiobutton id="rbOrderNo" runat="server" Text="申請單號" GroupName="rbOrder"></asp:radiobutton>
							<asp:radiobutton id="rbOrderDate" runat="server" Text="申請日期" GroupName="rbOrder"></asp:radiobutton>
							<asp:radiobutton id="rbOrderDept" runat="server" Text="承辦單位" GroupName="rbOrder"></asp:radiobutton>
                        </DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV style="HEIGHT: 22em;" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="9">
							<Columns>
								<asp:TemplateColumn HeaderText="申請單號">
									<ItemTemplate>
                                        <asp:HyperLink id="lbAPPLY_NO" runat="server"></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="申請日期">
									<ItemTemplate>
										<asp:Label id="lbAPPLY_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位">
									<ItemTemplate>
										<asp:Label id="lbDEPT_APP" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦人">
									<ItemTemplate>
										<asp:Label id="lbEMP_APP" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="接管單位">
									<ItemTemplate>
										<asp:Label id="lbDEPT_TRAN" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="接管人">
									<ItemTemplate>
										<asp:Label id="lbEMP_TRAN" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="申請說明">
									<ItemTemplate>
										<asp:Label id="lbAPPLY_REASON" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="申請狀態">
									<ItemTemplate>
										<asp:Label id="lbTX_STATUS" runat="server"></asp:Label>
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
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
