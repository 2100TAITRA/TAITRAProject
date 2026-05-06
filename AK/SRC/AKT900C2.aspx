<%@ Page language="c#" Codebehind="AKT900C2.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT900C2" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT900C2 檔案描述視窗</title>
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
		<form id="AKT900C2" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MTable1">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em"> <asp:label id="Label1" runat="server">檔號(起)：</asp:label> </DIV>
						<DIV class="dTD" style="WIDTH: 6.5em">
							<asp:textbox id="txSYear" tabIndex="10" runat="server" MaxLength="3" Width="2em" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:label id="Label10" runat="server">(年度)－</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 7.5em">
							<asp:textbox id="txSCls" tabIndex="12" runat="server" MaxLength="20" Width="5.5em"></asp:textbox>
							<asp:imagebutton id="btClsHelp" tabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton>
						</DIV>
						<DIV class="dTD">
							<asp:label id="Label11" runat="server">(分類)－</asp:label>
							<asp:textbox id="txSCase" tabIndex="15" runat="server" MaxLength="12" Width="7em"></asp:textbox>
							<asp:imagebutton id="btSCaseHelp" tabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton>
							<asp:label id="Label12" runat="server">(案次)－</asp:label>
							<asp:textbox id="txSVol" tabIndex="17" runat="server" MaxLength="4" Width="2.5em" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:label id="Label13" runat="server">－</asp:label>
							<asp:textbox id="txSSeq" tabIndex="19" runat="server" MaxLength="3" Width="2em" CssClass="InputFieldNumeric"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em"> <asp:label id="Label2" runat="server">檔號(迄)：</asp:label> </DIV>
						<DIV class="dTD" style="WIDTH: 6.5em">
							<asp:textbox id="txEYear" runat="server" CssClass="DisplayOnly" MaxLength="3" Width="2em" ReadOnly="True"></asp:textbox>
							<asp:label id="Label14" runat="server">(年度)－</asp:label>
						</DIV>
						<DIV class="dTD" style="WIDTH: 7.5em"> 
							<asp:textbox id="txECls" runat="server" CssClass="DisplayOnly" MaxLength="20" Width="5.5em" ReadOnly="True"></asp:textbox> 
						</DIV>
						<DIV class="dTD"> 
							<asp:label id="Label15" runat="server">(分類)－</asp:label>
							<asp:textbox id="txECase" tabIndex="25" runat="server" MaxLength="12" Width="7em"></asp:textbox>
							<asp:imagebutton id="btECaseHelp" tabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton>
							<asp:label id="Label16" runat="server">(案次)－</asp:label>
							<asp:textbox id="txEVol" tabIndex="27" runat="server" MaxLength="4" Width="2.5em" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:label id="Label17" runat="server">－</asp:label>
							<asp:textbox id="txESeq" tabIndex="29" runat="server" MaxLength="3" Width="2em" CssClass="InputFieldNumeric"></asp:textbox> 
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em"><asp:label id="Label18" runat="server">原件/複製品：</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbOriginal" tabIndex="33" runat="server" Text="原件" GroupName="GN"></asp:radiobutton>
							<asp:radiobutton id="rbCopy" tabIndex="33" runat="server" Text="複製品" GroupName="GN"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em"> <asp:label id="Label3" runat="server">檔案內容摘要：</asp:label> </DIV>
						<DIV class="dTD"> <asp:textbox id="txDigest" tabIndex="40" runat="server" Width="25em" TextMode="MultiLine" MaxLength="200"></asp:textbox> </DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em"><asp:label id="Label4" runat="server">檔案產生原因及目的：</asp:label></DIV>
						<DIV class="dTD"> <asp:textbox id="txMission" tabIndex="50" runat="server" Width="25em" TextMode="MultiLine" MaxLength="150"></asp:textbox> </DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em"> <asp:label id="Label5" runat="server">檔案特色：</asp:label> </DIV>
						<DIV class="dTD"><asp:textbox id="txCharac" tabIndex="60" runat="server" Width="25em" TextMode="MultiLine" MaxLength="200"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em"><asp:label id="Label6" runat="server">限制應用原因：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txLimit" tabIndex="70" runat="server" Width="25em" TextMode="MultiLine" MaxLength="200"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em"><asp:label id="Label7" runat="server">與其他檔案關係：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txOther" tabIndex="80" runat="server" Width="25em" TextMode="MultiLine" MaxLength="200"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em"><asp:label id="Label8" runat="server">相關鑑定案例：</asp:label></DIV>
						<DIV class="dTD"> <asp:textbox id="txRelative" tabIndex="90" runat="server" Width="25em" TextMode="MultiLine" MaxLength="200"></asp:textbox> </DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em"><asp:label id="Label9" runat="server">備　　註：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txDesc" tabIndex="100" runat="server" Width="25em" TextMode="MultiLine" MaxLength="300"></asp:textbox></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExit" runat="server" Text="離開" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
