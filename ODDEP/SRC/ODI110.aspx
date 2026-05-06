<%@ Page language="c#" Codebehind="ODI110.aspx.cs" AutoEventWireup="false" Inherits="OD.ODI110" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>ODI110 送文批號查詢作業</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODI110" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox style="Z-INDEX: 102; POSITION: absolute; TOP: 102px; LEFT: 10px" id="lbReturnValue"
				runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label1" runat="server" >送文批號：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txSNo" tabIndex="10" runat="server" MaxLength="8"
									Width="4.5em"></asp:textbox>－
							<asp:textbox id="txENo" tabIndex="15" runat="server" MaxLength="8"
									Width="4.5em"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label2" runat="server" >送文日期：</asp:label></div>
						<div class="dTD" style="WIDTH: 15em">
							<asp:textbox id="txSDate" tabIndex="20" runat="server" CssClass="DatePicker" MaxLength="7" Width="4em"></asp:textbox>
							－
							<asp:textbox id="txEDate" tabIndex="25" runat="server" CssClass="DatePicker" MaxLength="7" Width="4em"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label7" runat="server" >公文文號：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDocNo" tabIndex="25" runat="server" MaxLength="10" Width="5.5em"></asp:textbox>(起)
							～
							<asp:textbox id="txDocNoE" tabIndex="25" runat="server" MaxLength="10" Width="5.5em"></asp:textbox>(迄)
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label3" runat="server" >送文單位：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
								<cc1:combobox id="dlFmDept" runat="server" CssClass="comboBox" Width="7em"></cc1:combobox>
								<cc1:combobox id="dlFmSubDept" runat="server" CssClass="comboBox" Width="7em"></cc1:combobox>
						</div>
						<div class="dTDTitle" style="WIDTH: 11em">
							<asp:label id="Label5" runat="server" >批號狀態：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="dlStatus" tabIndex="35" runat="server"  Width="7em"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
								<asp:label style="Z-INDEX: 0" id="Label8" runat="server" >送文人員：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
								<cc1:combobox style="Z-INDEX: 0" id="dlUser" runat="server" CssClass="comboBox" Width="7em"></cc1:combobox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label4" runat="server" >收文單位：</asp:label></div>
						<div class="dTD" style="WIDTH: 10em">
							<cc1:combobox id="dlToDept" runat="server" CssClass="comboBox" Width="7em"></cc1:combobox>
							<cc1:combobox id="dlToSubDept" runat="server" CssClass="comboBox" Width="7em"></cc1:combobox></div>
						<div class="dTDTitle" style="WIDTH: 11em">
							<asp:label id="Label6" runat="server" >排　　序：</asp:label></div>
						<div class="dTD">
							<asp:radiobutton id="rb1" tabIndex="45" runat="server" Text="由大到小" GroupName="gn"></asp:radiobutton><BR>
							<asp:radiobutton id="rb2" tabIndex="48" runat="server" Text="由小到大" GroupName="gn"></asp:radiobutton></div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<asp:panel style="Z-INDEX: 0" id="Panel_dg1" runat="server" Height="88px">
							<DIV class="GridDiv" style="HEIGHT: 115px;">
								<asp:datagrid style="Z-INDEX: 0" id="dg1" runat="server" AutoGenerateColumns="False"
									PageSize="50" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black"
									BorderWidth="1px" CellPadding="0" GridLines="Vertical">
									<Columns>
										<asp:BoundColumn DataField="SEQ_NO" HeaderText="序">
										</asp:BoundColumn>
										<asp:HyperLinkColumn DataNavigateUrlField="BATCH_NO" DataNavigateUrlFormatString="javascript:ReturnValue(&quot;{0}&quot;)"
											DataTextField="BATCH_NO" HeaderText="送文批號">
										</asp:HyperLinkColumn>
										<asp:BoundColumn DataField="FM_OU_NAME" HeaderText="送文單位">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="TO_OU_NAME" HeaderText="收文單位">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="SEND_DATETIME" HeaderText="送文時間">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="FROM_USER_NAME" HeaderText="送文人員">
										</asp:BoundColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
							</asp:panel>
							<asp:panel style="Z-INDEX: 0" id="Panel_dg2" runat="server" Height="42px">
								<asp:datagrid style="Z-INDEX: 0" id="dg2" runat="server" AutoGenerateColumns="False"
									PageSize="50" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black"
									BorderWidth="1px" CellPadding="0" GridLines="Vertical">
									<Columns>
										<asp:BoundColumn DataField="SEQ_NO" HeaderText="序">
										</asp:BoundColumn>
										<asp:HyperLinkColumn DataNavigateUrlField="BATCH_NO" DataNavigateUrlFormatString="javascript:ReturnValue(&quot;{0}&quot;)"
											DataTextField="BATCH_NO" HeaderText="送文批號">
										</asp:HyperLinkColumn>
										<asp:BoundColumn DataField="DOC_NO" HeaderText="文(編)號">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="FROM_SUBJECT" HeaderText="主旨">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="FM_OU_NAME" HeaderText="送文單位">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="TO_OU_NAME" HeaderText=" 收文單位">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="SEND_DATETIME" HeaderText="送文時間">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="FROM_USER_NAME" HeaderText="送文人員">
										</asp:BoundColumn>
									</Columns>
								</asp:datagrid>
							</asp:panel>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator style="Z-INDEX: 103; POSITION: absolute; TOP: 218px; LEFT: 12px" id="Validator"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary style="Z-INDEX: 104; POSITION: absolute; TOP: 252px; LEFT: 12px" id="ValidationSummary1"
				runat="server" CssClass="hidden"></asp:validationsummary>
			<DIV style="WIDTH: 708px; DISPLAY: none; HEIGHT: 42px; VISIBILITY: hidden" id="hiddenDiv"><asp:textbox id="H_FmDept" runat="server" CssClass="hidden" Width="19px"></asp:textbox><asp:textbox id="H_ToDept" runat="server" CssClass="hidden" Width="19px"></asp:textbox><asp:textbox id="H_FmSubDept" runat="server" CssClass="hidden" Width="19px"></asp:textbox><asp:textbox id="H_ToSubDept" runat="server" CssClass="hidden" Width="21px"></asp:textbox><asp:textbox id="H_FmSubDept_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox><asp:textbox id="H_ToSubDept_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox><asp:textbox id="H_dlFmSubDept_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox><asp:textbox id="H_dlToSubDept_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox><asp:textbox id="H_User" runat="server" CssClass="hidden" Width="19px"></asp:textbox><asp:textbox id="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox><asp:textbox id="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox></DIV>
		</form>
	</body>
</HTML>
