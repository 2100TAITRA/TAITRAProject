<%@ Page language="c#" Codebehind="IFM210.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM210" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM210 單位及角色維護作業</TITLE>
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
		<FORM id="IFM210" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="lbSourceOrgno" runat="server" CssClass="keyfield">隸屬機關：</asp:label></DIV>
						<DIV class="dTD" style="width: 15em;"><asp:Label id="lbSourceNo" runat="server" Width="15em"></asp:Label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="lbOrgCode" runat="server" CssClass="keyfield">單位代碼：</asp:label></DIV>
						<DIV class="dTD" style="width: 15em;"><asp:textbox id="txOrgCode" runat="server" MaxLength="6"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 7em;"><asp:label id="lbOrgName" runat="server" Width="5em">單位名稱：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txOrgName" runat="server" MaxLength="60" Width="11.5em"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR" id="tr_satus">
						<DIV class="dTDTitle" style="width: 11em;">
							<asp:label id="Label13" runat="server">單位狀態：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 15em;">
							<asp:radiobuttonlist id="rbStatus" runat="server" Width="8em" RepeatDirection="Horizontal">
								<asp:ListItem Value="true" Selected="True">啟用</asp:ListItem>
								<asp:ListItem Value="false">停用</asp:ListItem>
							</asp:radiobuttonlist>
						</DIV>
						<DIV class="dTD" colspan="2"><asp:checkbox id="cbCanbeCowork" runat="server" AutoPostBack="True" Text="可為會辦對象"></asp:checkbox></DIV>
					</DIV>
					<DIV class="hide" id="tr_Job">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="Label2" runat="server" CssClass="hide">業務職掌：</asp:label></DIV>
						<DIV class="dTD" style="width: 15em;"><asp:textbox id="txJob" runat="server" CssClass="hide"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 7em;"><asp:label id="lbEmail" runat="server" Width="7em" CssClass="hide">單位電子郵件：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txEmail" runat="server" CssClass="hide" MaxLength="25"></asp:textbox></DIV>
					</DIV>
					<DIV class="hide" id="tr_tel">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="Label4" runat="server" CssClass="hide">電　　話：</asp:label></DIV>
						<DIV class="dTD" style="width: 15em;"><asp:textbox id="txTel" runat="server" CssClass="hide" MaxLength="15"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 7em;"><asp:label id="Label5" runat="server" CssClass="hide">傳　　真：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txFax" runat="server" CssClass="hide" MaxLength="15"></asp:textbox></DIV>
					</DIV>
					<DIV class="hide" id="tr_box">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="lbMail" runat="server" CssClass="hide">單位信箱：</asp:label></DIV>
						<DIV class="dTDTitle" colSpan="3"><asp:textbox id="txMail" runat="server" Width="28.5em" CssClass="hide" MaxLength="90"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR" id="tr_OrderBy">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="Label8" runat="server" CssClass="hide">郵遞區號：</asp:label>
							<asp:label id="lbSEQNO" runat="server">單位選單排序：</asp:label></DIV>
						<DIV class="dTD" style="width: 15em;"><asp:textbox id="txPostCalCode" runat="server" Width="2.5em" CssClass="hide" MaxLength="3"></asp:textbox>
							<asp:textbox id="txRank" runat="server" Width="3.5em" MaxLength="3"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 7em;">
							<asp:label id="lbDeptType" runat="server">單位類型：</asp:label></DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="dlDeptType" runat="server">
								<asp:ListItem Value="1">一般單位</asp:ListItem>
								<asp:ListItem Value="2">虛擬單位</asp:ListItem>
								<asp:ListItem Value="3">一層決行單位</asp:ListItem>
								<asp:ListItem Value="4">一層決行一般單位</asp:ListItem>
							</asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR" id="tr_OrderBy2">
						<DIV class="dTDTitle" style="width: 11em;">
							<asp:label id="lbSEQNO_ODT130" runat="server">ODT130選單排序：</asp:label>
						</DIV>
						<DIV class="dTD" style="width: 15em;">
							<asp:textbox id="txRank130" runat="server" Width="3.5em" MaxLength="3"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="lbAddr" runat="server" CssClass="hide">單位地址：</asp:label></DIV>
						<DIV class="dTD" colSpan="3"><asp:textbox id="txAddress" runat="server" Width="28.5em" CssClass="hide" MaxLength="90"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR" id="tr_Engname">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="lbEnglishName" runat="server" CssClass="hide">單位英文名稱：</asp:label></DIV>
						<DIV class="dTD" colSpan="3"><asp:textbox id="txEnglishName" runat="server" Width="28.5em" CssClass="hide" MaxLength="90"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR" id="tr_EngAss">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="lbEnglishAddr" runat="server" CssClass="hide">單位英文地址：</asp:label></DIV>
						<DIV class="dTD" colSpan="3"><asp:textbox id="txEnglishAddress" runat="server" Width="28.5em" CssClass="hide" MaxLength="90"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 11em;"><asp:Label id="Label1" runat="server">環境設定：</asp:Label></DIV>
						<DIV class="dTD" style="width: 15em;"><asp:button id="btEnvSetting" runat="server" Text="設定"></asp:button></DIV>
						<DIV class="dTDTitle" style="width: 7em;"><asp:label id="Label12" runat="server">所具備權利：</asp:label></DIV>
						<DIV class="dTD"><asp:button id="btDeployPrivilege" runat="server" Text="設定"></asp:button></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="Label11" runat="server">說　　明：</asp:label></DIV>
						<DIV class="dTD" colSpan="3"><asp:textbox id="txDesc" runat="server" Width="20.5em" MaxLength="200" Height="42px" TextMode="MultiLine" Rows="2"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 11em;"><asp:label id="lbOrgNgr" runat="server" Width="6.5em">機關管理者：</asp:label></DIV>
						<DIV class="dTD" colSpan="3">
							<asp:textbox id="txManager1" runat="server" Width="4.5em" MaxLength="20"></asp:textbox>
							<asp:textbox id="txManagerName1" runat="server" Width="5.5em" CssClass="displayonly"></asp:textbox>
							<asp:textbox id="txActiveOrgNo" runat="server" Width="8.5em" CssClass="hide"></asp:textbox>
							<asp:textbox id="txPath1" runat="server" Width="1.5em" CssClass="hide"></asp:textbox>
							<asp:button id="btHelp1" runat="server" Text="設定"></asp:button>
							<asp:button id="btDel1" runat="server" Text="刪除"></asp:button><br>
							<asp:textbox id="txManager2" runat="server" Width="4.5em" MaxLength="20"></asp:textbox>
							<asp:textbox id="txManagerName2" runat="server" Width="5.5em" CssClass="displayonly"></asp:textbox>
							<asp:textbox id="txPath2" runat="server" Width="1.5em" CssClass="hide"></asp:textbox>
							<asp:button id="btHelp2" runat="server" Text="設定"></asp:button>
							<asp:button id="btDel2" runat="server" Text="刪除"></asp:button>
							<asp:DropDownList id="h_dlDeptName" runat="server" CssClass="hide"></asp:DropDownList><br>
							<asp:textbox id="txManager3" runat="server" Width="4.5em" MaxLength="20"></asp:textbox>
							<asp:textbox id="txManagerName3" runat="server" Width="5.5em" CssClass="displayonly"></asp:textbox>
							<asp:textbox id="txPath3" runat="server" Width="1.5em" CssClass="hide"></asp:textbox>
							<asp:button id="btHelp3" runat="server" Text="設定"></asp:button>
							<asp:button id="btDel3" runat="server" Text="刪除"></asp:button><br>
							<asp:textbox id="txManager4" runat="server" Width="4.5em" MaxLength="20"></asp:textbox>
							<asp:textbox id="txManagerName4" runat="server" Width="5.5em" CssClass="displayonly"></asp:textbox>
							<asp:textbox id="txPath4" runat="server" Width="1.5em" CssClass="hide"></asp:textbox>
							<asp:button id="btHelp4" runat="server" Text="設定"></asp:button>
							<asp:button id="btDel4" runat="server" Text="刪除"></asp:button><br>
							<asp:textbox id="txManager5" runat="server" Width="4.5em" MaxLength="20"></asp:textbox>
							<asp:textbox id="txManagerName5" runat="server" Width="5.5em" CssClass="displayonly"></asp:textbox>
							<asp:textbox id="txPath5" runat="server" Width="1.5em" CssClass="hide"></asp:textbox>
							<asp:button id="btHelp5" runat="server" Text="設定"></asp:button>
							<asp:button id="btDel5" runat="server" Text="刪除"></asp:button><br>
							<asp:textbox id="txManager6" runat="server" Width="4.5em" MaxLength="20"></asp:textbox>
							<asp:textbox id="txManagerName6" runat="server" Width="5.5em" CssClass="displayonly"></asp:textbox>
							<asp:textbox id="txPath6" runat="server" Width="1.5em" CssClass="hide"></asp:textbox>
							<asp:button id="btHelp6" runat="server" Text="設定"></asp:button>
							<asp:button id="btDel6" runat="server" Text="刪除"></asp:button><br>
							<asp:textbox id="txManager7" runat="server" Width="4.5em" MaxLength="20"></asp:textbox>
							<asp:textbox id="txManagerName7" runat="server" Width="5.5em" CssClass="displayonly"></asp:textbox>
							<asp:textbox id="txPath7" runat="server" Width="1.5em" CssClass="hide"></asp:textbox>
							<asp:button id="btHelp7" runat="server" Text="設定"></asp:button>
							<asp:button id="btDel7" runat="server" Text="刪除"></asp:button><br>
							<asp:textbox id="txManager8" runat="server" Width="4.5em" MaxLength="20"></asp:textbox>
							<asp:textbox id="txManagerName8" runat="server" Width="5.5em" CssClass="displayonly"></asp:textbox>
							<asp:textbox id="txPath8" runat="server" Width="1.5em" CssClass="hide"></asp:textbox>
							<asp:button id="btHelp8" runat="server" Text="設定"></asp:button>
							<asp:button id="btDel8" runat="server" Text="刪除"></asp:button><br>
							<asp:textbox id="txManager9" runat="server" Width="4.5em" MaxLength="20"></asp:textbox>
							<asp:textbox id="txManagerName9" runat="server" Width="5.5em" CssClass="displayonly"></asp:textbox>
							<asp:textbox id="txPath9" runat="server" Width="1.5em" CssClass="hide"></asp:textbox>
							<asp:button id="btHelp9" runat="server" Text="設定"></asp:button>
							<asp:button id="btDel9" runat="server" Text="刪除"></asp:button><br>
							<asp:textbox id="txManager10" runat="server" Width="4.5em" MaxLength="20"></asp:textbox>
							<asp:textbox id="txManagerName10" runat="server" Width="5.5em" CssClass="displayonly"></asp:textbox>
							<asp:textbox id="txPath10" runat="server" Width="1.5em" CssClass="hide"></asp:textbox>
							<asp:button id="btHelp10" runat="server" Text="設定"></asp:button>
							<asp:button id="btDel10" runat="server" Text="刪除"></asp:button>
						</DIV>
					</DIV>
				</DIV>
				<asp:TextBox id="txcheckmode" runat="server" CssClass="hide"></asp:TextBox>
			</DIV>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btPrint" Accesskey="P" title="更新組織結構檔(ALT+P)" runat="server" Text="更新組織結構檔(P)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"  CssClass="hide"/>
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
