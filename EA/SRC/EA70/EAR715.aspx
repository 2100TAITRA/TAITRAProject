<%@ Page language="c#" Codebehind="EAR715.aspx.cs" AutoEventWireup="false" Inherits="EA70.EAR715" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR715 日常降解密紀錄列印作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAR715" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericSearch.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 6.5em; POSITION: absolute; TOP: 0px; HEIGHT: 6.5em">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			    <asp:TextBox ID="empUserId" runat="server"></asp:TextBox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"><asp:label class="RequireField" id="Label1" runat="server">執行降解密日期：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox class="RequireField DatePicker" id="txRmvSecDateS" runat="server" Width="4.5em" MaxLength="7"></asp:textbox>
							－
							<asp:textbox class="RequireField DatePicker" id="txRmvSecDateE" runat="server" Width="4.5em" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"><asp:label id="Label22" runat="server">原應降解密日期：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox class="DatePicker" id="txOriExtRmvSecDateS" runat="server" Width="4.5em" MaxLength="7"></asp:textbox>
							－
							<asp:textbox class="DatePicker" id="txOriExtRmvSecDateE" runat="server" Width="4.5em" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"><asp:label id="Label2" runat="server">應降解密日期：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox class="DatePicker" id="txExtRmvSecDateS" runat="server" Width="4.5em" MaxLength="7"></asp:textbox>
							－
							<asp:textbox class="DatePicker" id="txExtRmvSecDateE" runat="server" Width="4.5em" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"><asp:label id="Label3" runat="server">公文文號：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txDocNoS" runat="server" Width="6em" MaxLength="10"></asp:textbox>
							－
							<asp:textbox id="txDocNoE" runat="server" Width="6em" MaxLength="10"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
                    <DIV class="dTDTitle" style="width: 9em">
                        <asp:Label ID="lbStockText" runat="server" CssClass="hide">櫥位號：</asp:Label>
                    </DIV>
                    <DIV class="dTD">
                        <asp:TextBox ID="txStockNoS"  runat="server" Width="6.5em" MaxLength="11" CssClass="hide"></asp:TextBox>
                        <asp:Label ID="lbSeperate" runat="server" CssClass="hide">－</asp:Label>
                        <asp:TextBox ID="txStockNoE"  runat="server" Width="6.5em"  MaxLength="11" CssClass="hide"></asp:TextBox>
                    </DIV>
					</DIV>
					<div class="dTR">
						<div class="dTDTitle" style="width: 9em"><asp:Label ID="Label4" runat="server">檔號(起)：</asp:Label></div>
						<div class="dTD">
							<asp:TextBox ID="txFileYearS" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
							<asp:Label ID="Label5" runat="server">(年度)</asp:Label>
							<asp:Label ID="Label6" runat="server">－</asp:Label>
							<asp:TextBox ID="txClsNoS" runat="server" MaxLength="20" Width="10.5em"></asp:TextBox>
							<asp:TextBox ID="txClsKeyS" runat="server" MaxLength="20" CssClass="hide"></asp:TextBox>
							<asp:ImageButton ID="btHelpS" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
							<asp:Label ID="Label7" runat="server">(分類)</asp:Label>
							<asp:Label ID="Label8" runat="server">－</asp:Label>
							<asp:TextBox ID="txCaseNoS" runat="server" MaxLength="12" Width="6.5em"></asp:TextBox>
							<asp:ImageButton ID="btHelpS2" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
							<asp:Label ID="Label9" runat="server">(案次)</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 9em"><asp:Label ID="Label10" runat="server">檔號(迄)：</asp:Label></div>
						<div class="dTD">
							<asp:TextBox ID="txFileYearE" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
							<asp:Label ID="Label11" runat="server">(年度)</asp:Label>
							<asp:Label ID="Label12" runat="server">－</asp:Label>
							<asp:TextBox ID="txClsNoE" runat="server" MaxLength="20" Width="10.5em"></asp:TextBox>
							<asp:TextBox ID="txClsKeyE" runat="server" MaxLength="20" CssClass="hide"></asp:TextBox>
							<asp:ImageButton ID="btHelpE" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
							<asp:Label ID="Label13" runat="server">(分類)</asp:Label>
							<asp:Label ID="Label14" runat="server">－</asp:Label>
							<asp:TextBox ID="txCaseNoE" runat="server" MaxLength="12" Width="6.5em"></asp:TextBox>
							<asp:ImageButton ID="btHelpE2" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
							<asp:Label ID="Label15" runat="server">(案次)</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 9em">
							<asp:Label ID="Label16" runat="server">承辦單位：</asp:Label></div>
						<div class="dTD" style="width: 20em">
							<asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
						</div>
						<div class="dTDTitle">
							<asp:Label ID="Label17" runat="server">承辦人：</asp:Label></div>
						<div class="dTD">
							<asp:DropDownList ID="dlUser" runat="server" Width="5.5em"></asp:DropDownList></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 9em">
							<asp:Label ID="Label18" runat="server">執行檔管人員：</asp:Label>
						</div>
						<div class="dTD">
							<asp:DropDownList ID="dlAcpUser" runat="server" Width="9em"></asp:DropDownList>
						</div>
					</div>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"><asp:label id="Label19" runat="server">核定解密機關：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txNotifyOrgName" runat="server" Width="20em" MaxLength="20"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"><asp:label id="Label25" runat="server">來(受)文機關：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txOrgName" runat="server" Width="20em" MaxLength="20"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"><asp:label id="Label26"  runat="server">原密等：</asp:label></DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="dlOriSecNo" runat="server" Width="8.5em">
								<asp:ListItem Value=""></asp:ListItem>
								<asp:ListItem Value="1">普通</asp:ListItem>
								<asp:ListItem Value="2">密</asp:ListItem>
								<asp:ListItem Value="3">機密</asp:ListItem>
								<asp:ListItem Value="4">極機密</asp:ListItem>
								<asp:ListItem Value="5">絕對機密</asp:ListItem>
							</asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"><asp:label id="Label20"  runat="server">新密等：</asp:label></DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="dlSecNo" runat="server" Width="8.5em">
								<asp:ListItem Value=""></asp:ListItem>
								<asp:ListItem Value="1">普通</asp:ListItem>
								<asp:ListItem Value="2">密</asp:ListItem>
								<asp:ListItem Value="3">機密</asp:ListItem>
								<asp:ListItem Value="4">極機密</asp:ListItem>
								<asp:ListItem Value="5">絕對機密</asp:ListItem>
							</asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label21" runat="server">排序方式：</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbFileNo" runat="server" GroupName="rbSort" Text="檔號"></asp:radiobutton>
							<asp:radiobutton id="rbRmvSecDateFileNo" runat="server" GroupName="rbSort" Text="執行降解密日期+檔號"></asp:radiobutton>
							<asp:radiobutton id="rbDocNo" runat="server" GroupName="rbSort" Text="公文文號"></asp:radiobutton>
							<asp:radiobutton id="rbYearDocNo" runat="server" GroupName="rbSort" Text="年度+公文文號" CssClass="hide" ></asp:radiobutton>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Title = "匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" Accesskey = "C" Title = "匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
