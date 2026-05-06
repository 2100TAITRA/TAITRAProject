<%@ Page language="c#" Codebehind="EDC004.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDC004" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDC004 分層決行查詢子視窗 </TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<link rel="stylesheet" href="../EDLIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDC004" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
			</DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MTable1">
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em">
							<asp:label id="lbNames" runat="server">決行類別名稱：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:textbox id="txProxyNodeName" tabIndex="50" runat="server" Width="15em" MaxLength="100"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 10em">
							<asp:label id="Label1" runat="server">決行細目名稱：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:textbox id="txProxyDetailName" tabIndex="50" runat="server" Width="15em" MaxLength="100"></asp:textbox>
						</div>
					</div>
				</div>
				<asp:textbox id="H_DeptNo" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_strCode" runat="server" CssClass="hide"></asp:textbox>
				<div class="dTR">
	                <div class="dTD">
	                   <ul id="Classtree" class="ztree"></ul>
	                </div>
	            </div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
<script type="text/javascript" src="../EDLIB/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="../EDLIB/jquery.ztree.exhide-3.5.js"></script>
</HTML>
