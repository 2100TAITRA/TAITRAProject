<%@ Page language="c#" Codebehind="AKR330.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR330" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKR330 自動編卷作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body class="hidden" MS_POSITIONING="GridLayout">
		<form id="AKR330" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericSearch.htm"-->
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTD" style="width: 34em; "><asp:label  id="Label6" runat="server" Width="13.5em">1. 自動編卷條件設定</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:radiobutton id="rbScan" tabIndex="10" runat="server" Width="6.5em" GroupName="GP1" Checked="True" Text="掃描批號:"></asp:radiobutton></DIV>
						<DIV class="dTD" style="width: 28em; ">
							<asp:textbox class="RequireField" id="txScanNo1" tabIndex="20" runat="server" Width="5.5em" MaxLength="8"></asp:textbox>
							<asp:imagebutton id="ibtScan1" tabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:imagebutton>
							－
							<asp:textbox class="RequireField" id="txScanNo2" tabIndex="25" runat="server" Width="5.5em" MaxLength="8"></asp:textbox>
							<asp:imagebutton id="ibtScan2" tabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:imagebutton>
							<asp:checkbox id="cbUnfinish" tabIndex="27" runat="server" Width="13.5em" Checked="True" Text="未檢視完畢批號不編卷"></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:radiobutton id="rbAcpNo" tabIndex="30" runat="server" Width="6.5em" GroupName="GP1" Text="點收批號:"></asp:radiobutton></DIV>
						<DIV class="dTD" style="width: 28em; ">
							<asp:textbox class="RequireField" id="txAcpNo1" tabIndex="40" runat="server" Width="5.5em" MaxLength="10"></asp:textbox>
							<asp:imagebutton id="ibtAcp1" tabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:imagebutton>
							－
							<asp:textbox class="RequireField" id="txAcpNo2" tabIndex="45" runat="server" Width="5.5em" MaxLength="10"></asp:textbox>
							<asp:imagebutton id="ibtAcp2" tabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:imagebutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:radiobutton id="rbAcpDate" tabIndex="50" runat="server" Width="6.5em" GroupName="GP1" Text="點收日期:"></asp:radiobutton></DIV>
						<DIV class="dTD" style="width: 28em; ">
							<asp:textbox CssClass="DatePicker" class="RequireField" id="txAcpDate1" tabIndex="60" runat="server" Width="4.5em" MaxLength="7"></asp:textbox>
							－
							<asp:textbox CssClass="DatePicker" class="RequireField" id="txAcpDate2" tabIndex="65" runat="server" Width="4.5em" MaxLength="7"></asp:textbox>
							&nbsp;&nbsp;
							<asp:checkbox id="cbScan" tabIndex="67" runat="server" Width="13.5em" Checked="True" Text="應掃描公文不編卷"></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label  id="Label1" runat="server">點收人員:</asp:label></DIV>
						<DIV class="dTD" style="width: 28em; "><cc1:combobox CssClass="comboBox" id="dlAcpUser" runat="server" Width="8.5em"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label  id="Label2" runat="server">承辦單位:</asp:label></DIV>
						<DIV class="dTD" style="width: 28em; ">
							<cc1:combobox CssClass="comboBox" id="dlDept" runat="server" Width="11.5em"></cc1:combobox>
							<cc1:combobox CssClass="comboBox" id="dlSect" tabIndex="115" runat="server" Width="7.5em" MaxLength="40"></cc1:combobox>
							<cc1:combobox id="dlDept_bak" runat="server" Width="11.5em" cssclass="hide"></cc1:combobox>
							<asp:textbox id="txSectName_h" runat="server" Width="4.5em" CssClass="hide"></asp:textbox>
							<asp:textbox id="txSectNo_h" runat="server" Width="4.5em" CssClass="hide"></asp:textbox>
							<asp:textbox id="txDeptNo_h" runat="server" Width="4.5em" CssClass="hide"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label  id="Label4" runat="server">分類號:</asp:label></DIV>
						<DIV class="dTD" style="width: 28em; ">
							<asp:textbox id="txCls" tabIndex="90" runat="server" Width="6.5em" MaxLength="20"></asp:textbox>
							&nbsp;
							<asp:textbox id="txClsName" tabIndex="-1" runat="server" Width="18.5em" BackColor="Transparent" BorderStyle="None" BorderColor="Transparent" ReadOnly="True"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label  id="Label3" runat="server">機密等級:</asp:label></DIV>
						<DIV class="dTD" style="width: 28em; ">
							<asp:radiobutton id="rbNormal" tabIndex="100" runat="server" Width="5.5em" GroupName="GP2" Text="普通"></asp:radiobutton>
							<asp:radiobutton id="rbSec" tabIndex="105" runat="server" Width="6.5em" GroupName="GP2" Text="密等以上"></asp:radiobutton>
							<asp:radiobutton id="rbAll" tabIndex="107" runat="server" Width="6.5em" GroupName="GP2" Checked="True" Text="全部"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label  id="Label12" runat="server">簽核類型:</asp:label></DIV>
						<DIV class="dTD" style="width: 28em; ">
							<asp:dropdownlist id="dlSIGN_TYPE" runat="server">
								<asp:ListItem Selected="True"></asp:ListItem>
								<asp:ListItem Value="E">線上簽核</asp:ListItem>
								<asp:ListItem Value="P">紙本簽核</asp:ListItem>
							</asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label style="Z-INDEX: 0" id="Label13" runat="server" Width="4.5em" >庫房別:</asp:label></DIV>
						<DIV class="dTD" style="width: 28em; "><cc1:combobox CssClass="comboBox" style="Z-INDEX: 0" id="dlStore" tabIndex="4" runat="server"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 34em; "><asp:label  id="Label7" runat="server" Width="18.5em">2. 有設定參照文號的公文編卷方式</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 4em; "><asp:checkbox id="cbChild" tabIndex="110" runat="server" Text="併件"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 34em; "><asp:label  id="Label5" runat="server" Width="23.5em">3. 範圍內出現無法編卷公文時之處理方式設定</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:radiobutton id="rbContinue" tabIndex="120" runat="server" Width="6.5em" GroupName="GP3" Checked="True" Text="繼續編卷"></asp:radiobutton></DIV>
						<DIV class="dTD" style="width: 28em; "><asp:radiobutton id="rbStop" tabIndex="125" runat="server" Width="6.5em" GroupName="GP3" Text="停止編卷"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 34em; ">
							<asp:label  id="Label8" runat="server" Width="1.5em">4.</asp:label>
							<asp:checkbox id="cbAutoChangeVol" tabIndex="130" runat="server" Width="10.5em" Text="使用自動換卷功能"></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTD" style="width: 34em; ">
							<asp:label  id="Label9" runat="server" Width="9.5em">　　每卷最大頁數：</asp:label>
							<asp:textbox class="RequireField" onkeypress="jf_InpNumOnly()" id="txVolMaxPage" tabIndex="140" runat="server" Width="3.5em" MaxLength="4"></asp:textbox>
							<asp:label  id="Label10" runat="server" Width="4.5em">寬限值：</asp:label>
							<asp:textbox class="RequireField" onkeypress="jf_InpNumOnly()" id="txVolTolerance" tabIndex="150" runat="server" Width="3.5em" MaxLength="4"></asp:textbox>
							<asp:label  id="Label11" runat="server" Width="8.5em">公文預設頁數：</asp:label>
							<asp:textbox class="RequireField" onkeypress="jf_InpNumOnly()" id="txDocPage" tabIndex="160" runat="server" Width="3.5em" MaxLength="4"></asp:textbox>
						</DIV>
					</DIV>
				</DIV>
				<DIV style="DISPLAY: none; Z-INDEX: 103; LEFT: 168px; OVERFLOW: auto; WIDTH: 506px; TOP: 202px; HEIGHT: 73px">
					<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
					<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
					<asp:listbox id="lbReturnValue" runat="server" Height="32px"></asp:listbox>
					<asp:textbox id="txMaxPage" runat="server" Width="16px"></asp:textbox>
					<asp:textbox id="txTolerance" runat="server" Width="10px"></asp:textbox>
					<asp:textbox id="txPage" runat="server" Width="17px"></asp:textbox>
					<asp:checkbox id="cbOrder" runat="server" Width="188px" Text="上架清冊依照檔號排序" CssClass="hidden"></asp:checkbox>
					<asp:textbox id="txDept" runat="server" Width="9px"></asp:textbox>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="編卷" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button CssClass="hide" ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
