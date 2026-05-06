<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKR120.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR120" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKR120 退文清單列印作業</title>
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
		<form id="AKR120" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 101; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV id="hiddenDiv" style="DISPLAY: none; Z-INDEX: 106; LEFT: 8px; VISIBILITY: hidden; WIDTH: 280px; POSITION: absolute; TOP: 8px; HEIGHT: 42px">
				<asp:textbox id="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
				<asp:textbox id="H_dlSect_Text" runat="server" CssClass="hidden" Width="19px"></asp:textbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTD">
                            <asp:radiobutton id="rbDetail" runat="server" GroupName="GN" Text="退文明細表"></asp:radiobutton></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 8em">
                            <asp:label id="Label1" tabIndex="-1" runat="server">退文日期：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txSDate" tabIndex="10" CssClass="DatePicker" runat="server" MaxLength="7" Width="4em"></asp:textbox>－
                            <asp:textbox id="txEDate" tabIndex="20" CssClass="DatePicker" runat="server" MaxLength="7" Width="4em"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTD">
                            <asp:radiobutton id="rbTicket" runat="server" GroupName="GN" Text="退文單"></asp:radiobutton></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 8em">
                            <asp:label id="Label2" tabIndex="-1" runat="server">退文日時：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox id="txSTime" CssClass="DatePicker" tabIndex="30" runat="server" MaxLength="7" Width="4em"></asp:textbox>
                            <asp:textbox id="txSHour" tabIndex="35" runat="server" MaxLength="2" Width="1.5em"></asp:textbox>－
                            <asp:textbox id="txETime" CssClass="DatePicker" tabIndex="40" runat="server" MaxLength="7" Width="4em"></asp:textbox>
                            <asp:textbox id="txEHour" tabIndex="45" runat="server" MaxLength="2" Width="1.5em"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTD">
                            <asp:Label id="Label3" tabIndex="-1" runat="server">其他選項</asp:Label></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 8em">
                            <asp:Label id="Label7" tabIndex="-1" runat="server">公文文號：</asp:Label></div>
                        <div class="dTD">
                            <asp:textbox id="tbDocNo" runat="server" Width="5.5em" MaxLength="15"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 8em">
                            <asp:Label id="Label6" tabIndex="-1" runat="server">退文單位：</asp:Label></div>
                        <div class="dTD">
                            <cc1:ComboBox id="dlRcvNo" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                            <cc1:combobox id="dlSect" tabIndex="45" runat="server" Width="8em" CssClass="comboBox" MaxLength="40"></cc1:combobox></div>
                    </div>
                     <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 8em">
                            <asp:Label id="Label8" tabIndex="-1" runat="server">簽核類型：</asp:Label></div>
                        <div class="dTD">
                            <asp:DropDownList id="dlSignType" runat="server"  Width="5em">
                                <asp:ListItem Text="" Value=""></asp:ListItem>
                                <asp:ListItem Text="紙本" Value="P"></asp:ListItem>
                                <asp:ListItem Text="線上" Value="E"></asp:ListItem>
                            </asp:DropDownList></div>

                        <div class="dTDTitle" style="WIDTH: 8em">
                            <asp:Label id="Label9" tabIndex="-1" runat="server">結案種類：</asp:Label></div>
                        <div class="dTD">
                            <asp:DropDownList id="dlCloseType" runat="server"  Width="5em">
                                <asp:ListItem Text="" Value=""></asp:ListItem>
                                <asp:ListItem Text="存查" Value="Record"></asp:ListItem>
                                <asp:ListItem Text="發文" Value="Send"></asp:ListItem>
                            </asp:DropDownList></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 8em">
                            <asp:Label id="Label5" tabIndex="-1" runat="server">排序方式：</asp:Label></div>
                        <div class="dTD">
                            <asp:RadioButton id="rbDocNo" runat="server" GroupName="GF" Text="公文文號" tabIndex="60"></asp:RadioButton>
                            <asp:RadioButton id="rbTime" runat="server" GroupName="GF" Text="退文日期" tabIndex="63"></asp:RadioButton>
                            <asp:RadioButton id="rbDeptNo" runat="server" GroupName="GF" Text="退文單位" tabIndex="66"></asp:RadioButton></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 8em">
                            <asp:Label id="Label4" tabIndex="-1" runat="server">跳頁方式：</asp:Label></div>
                        <div class="dTD">
                            <asp:RadioButton id="rbByDept" runat="server" GroupName="Change" Text="依單位跳頁" tabIndex="63"></asp:RadioButton>
                            <asp:RadioButton id="rbByUserName" runat="server" GroupName="Change" Text="依承辦人跳頁" tabIndex="66"></asp:RadioButton>
                            <asp:RadioButton id="rbNo" tabIndex="60" runat="server" Text="不跳頁" GroupName="Change"></asp:RadioButton></div>
                    </div>
                </div>
                <asp:ListBox id="lbDept" runat="server" CssClass="hide"></asp:ListBox>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btOds" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
            <asp:customvalidator id="Validator" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary></form>
	</body>
</HTML>
