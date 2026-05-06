<%@ Page language="c#" Codebehind="EDT452.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT452" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>EDT452 先存續辦登錄作業</TITLE>
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
		<FORM id="EDT452" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv">
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
			</DIV>
			<div class="DivBaseTable" id="BaseTable" >
				<div class="DivTable" id="MainTable" >
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label1" CssClass="RequireField" runat="server">公文文號：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txDocNo" tabIndex="1" runat="server" Width="8em" CssClass="RequireField" MaxLength="15"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label4" runat="server" CssClass="RequireField">主旨：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txSubject" TextMode="MultiLine" Width="34em" runat="server" CssClass="RequireField"></asp:TextBox>
						</div>
					</div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 7.5em">
                            <asp:Label ID="Label8" runat="server" CssClass="RequireField">承辦單位：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 19em">
                            <cc1:ComboBox ID="dlDept" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                            <cc1:ComboBox ID="dlSect" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                        </div>
                        <div class="dTDTitle" style="width: 7.5em">
                            <asp:Label ID="Label9" runat="server" CssClass="RequireField">承辦人：</asp:Label>
                        </div>
                        <div class="dTD">
                            <cc1:ComboBox ID="dlUser" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                        </div>
                    </div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label2" runat="server" CssClass="RequireField">收(創)文日期：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 19em">
							<asp:textbox id="txRcvDate" tabIndex="-1" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker RequireField"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label3" runat="server" CssClass="RequireField">續辦到期日：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txDueDate" tabIndex="-1" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker RequireField"></asp:textbox>
						</div>
					</div>
                    <div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label5" runat="server" CssClass="RequireField">到期提醒：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 19em">
							<asp:dropdownlist id="dlAlert" runat="server" CssClass="RequireField"></asp:dropdownlist>
						</div>
                        <div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label6" runat="server">到期提醒日：</asp:label>
						</div>
						<div class="dTD">
							<asp:label id="lbAlertDate" tabIndex="3" runat="server" Width="4em"></asp:label>
							<asp:TextBox id="h_AlertDate" runat="server" CssClass="hide"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label7" runat="server" CssClass="RequireField">是否結案：</asp:label></div>
						<div class="dTD" style="WIDTH: 19em">
                            <asp:RadioButton ID="rbCloseY" runat="server" GroupName="IsClose" Text="是"></asp:RadioButton>
                            <asp:RadioButton ID="rbCloseN" runat="server" GroupName="IsClose" Text="否"></asp:RadioButton>
						</div>
                        <div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label10" runat="server">結案文號：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txCloseNo" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7.5em">
							<asp:label id="Label11" runat="server">進度說明：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txAuditDesc" TextMode="MultiLine" Width="34em" runat="server"></asp:TextBox>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel id="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" >
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
