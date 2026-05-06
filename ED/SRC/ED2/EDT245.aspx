<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDT245.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT245" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE id="TitleCtrl">EDT245 內部行文登錄作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT245" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:textbox id="H_Status" tabIndex="-1" runat="server" Width="20px" CssClass="" ></asp:textbox><asp:textbox id="H_ApplyNo" tabIndex="-1" runat="server" Width="20px" CssClass=""></asp:textbox><asp:textbox id="H_DeptNo" tabIndex="-1" runat="server" Width="20px"></asp:textbox><asp:listbox id="lbDept" tabIndex="-1" runat="server" Width="20px" CssClass="" Enabled="False"
					Height="22px"></asp:listbox><asp:dropdownlist id="H_dlOD12" runat="server"></asp:dropdownlist><asp:dropdownlist id="H_dlOD07" runat="server"></asp:dropdownlist></DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label1" runat="server" CssClass="KeyField">來文文號：</asp:label></DIV>
						<DIV class="dTD" style="width: 11em; ">
							<asp:textbox id="txDocNo" tabIndex="10" runat="server" Width="5.5em" CssClass="KeyField" MaxLength="10"></asp:textbox>
							-
							<asp:textbox id="txSubNo" tabIndex="10" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>
						</DIV>
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label2" runat="server">來文日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 11em; "><asp:textbox id="txFromDate" tabIndex="-1" runat="server" Width="5.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label3" runat="server" CssClass="RequireField">承辦人員：</asp:label></DIV>
						<DIV class="dTD" style="width: 11em; "><asp:dropdownlist id="ddlUser" runat="server" Width="10.5em" CssClass="RequireField"></asp:dropdownlist></DIV>
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label4" runat="server">收文日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 11em; "><asp:textbox id="txRcvDate" tabIndex="-1" runat="server" Width="5.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label5" runat="server">歸檔日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 11em; "><asp:textbox id="txCloseDate" runat="server" Width="5.5em" CssClass="DatePicker" MaxLength="7"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label6" runat="server">單位檔號：</asp:label></DIV>
						<DIV class="dTD" style="width: 11em; "><asp:dropdownlist id="ddlOuStoreNo" runat="server" Width="10.5em"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label7" runat="server">核判紀錄：</asp:label></DIV>
						<DIV class="dTD" style="width: 28em; "><cc1:combobox id="ddlSignRecord" runat="server" CssClass="comboBox" Width="27.5em"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label8" runat="server">主　　旨：</asp:label></DIV>
						<DIV class="dTD" style="width: 28em; "><asp:textbox id="txSubject" runat="server" Width="27.5em" Height="2.5em" TextMode="MultiLine"  MaxLength="300" onkeyup="isMaxLength(this)" CssClass="DisplayOnly" ReadOnly="True"></asp:textbox></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
