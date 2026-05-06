<%@ Page language="c#" Codebehind="AKT900C1.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT900C1" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT900C1 鑑定背景資料維護視窗</title>
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
		<form id="AKT900C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV style="WIDTH: 14em" class="dTDTitle" ><asp:label id="Label1" runat="server" >鑑定原因：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlReason" tabIndex="10" runat="server" Width="19em"></asp:dropdownlist>
						<asp:textbox id="txReason" tabIndex="15" runat="server" MaxLength="150" Width="13em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 14em" class="dTDTitle" ><asp:label id="Label2" runat="server" >鑑定標準：</asp:label></DIV>
						<DIV class="dTD"><asp:checkbox id="cbOriginal" tabIndex="20" runat="server" Text="原有價值"></asp:checkbox>
						<asp:checkbox id="cbAdmin" tabIndex="20" runat="server" Text="行政價值"></asp:checkbox>
						<asp:checkbox id="cbLaw" tabIndex="20" runat="server" Text="法律價值"></asp:checkbox>
						<asp:checkbox id="cbInspect" tabIndex="20" runat="server" Text="稽憑價值"></asp:checkbox><br>
							<asp:checkbox id="cbInfomation" tabIndex="20" runat="server" Text="資訊價值"></asp:checkbox>
							<asp:checkbox id="cbHistory" tabIndex="20" runat="server" Text="歷史價值"></asp:checkbox>
							<asp:checkbox id="cbManage" tabIndex="20" runat="server" Text="管理成本"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 14em" class="dTDTitle" ><asp:label id="Label3" runat="server" >鑑定單元：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlUnit" tabIndex="30" runat="server" ></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 14em" class="dTDTitle" ><asp:label id="Label4" runat="server" >鑑定方式：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlType" tabIndex="40" runat="server" Width="4em"></asp:dropdownlist>
						<asp:textbox id="txType" tabIndex="45" runat="server" MaxLength="100" Width="13em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 14em" class="dTDTitle" ><asp:label id="Label5" runat="server" >鑑定方法：</asp:label></DIV>
						<DIV class="dTD"><asp:checkbox id="cbType1" tabIndex="50" runat="server" Text="邀請專家學者鑑定"></asp:checkbox>
							<asp:checkbox id="cbType2" tabIndex="50" runat="server" Text="舉辦公聽會"></asp:checkbox>
							<asp:checkbox id="cbType3" tabIndex="50" runat="server" Text="邀請檔案關係人參與"></asp:checkbox><br>
							<asp:checkbox id="cbType4" tabIndex="50" runat="server" Text="實地調查或訪問"></asp:checkbox>
							<asp:checkbox id="cbType5" tabIndex="50" runat="server" Text="定量分析"></asp:checkbox>
							<asp:checkbox id="cbType6" tabIndex="50" runat="server" Text="定性分析"></asp:checkbox><br>
							<asp:checkbox id="cbType7" tabIndex="50" runat="server" Text="其他"></asp:checkbox>
							<asp:textbox id="txMethod" tabIndex="55" runat="server" MaxLength="100" Width="12.5em">
							</asp:textbox><asp:label id="Label8" runat="server" >方法</asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 14em" class="dTDTitle" ><asp:label id="Label6" runat="server" >鑑定遭遇之困難及處理情形：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txCondition" tabIndex="60" runat="server" MaxLength="150" Width="400px" TextMode="MultiLine" ></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 14em" class="dTDTitle" ><asp:label id="Label7" runat="server" >鑑定小組成員：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txMember" tabIndex="70" runat="server" MaxLength="100" Width="400px" TextMode="MultiLine" ></asp:textbox></DIV>
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
