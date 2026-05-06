<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKI803.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI803" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>AKI803 立案全案摘要瀏覽</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<link rel="stylesheet" href="lib/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<style>
			.ztree li a:hover,
			.ztree li a.curSelectedNode,
			.ztree li a span {
			    text-decoration: none !important;
			}
		</style>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKI803" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
			    <asp:CustomValidator ID="CustomValidator1" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			    <asp:ValidationSummary ID="ValidationSummary2" runat="server"></asp:ValidationSummary>
			    <asp:ListBox ID="ListBox1" runat="server" Width="80px"></asp:ListBox>
			    <asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
			</div>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="Table1" Style="border-style:solid" cellSpacing="1" cellPadding="1" border="1">
					<DIV class="dTR">
						<DIV class="dTD">
							<asp:panel id="pVol" runat="server" Width="44em">
									<asp:Label id=pMsg runat="server" BackColor="Info"></asp:Label>
							</asp:panel>
						</DIV>
					</DIV>
					<DIV style="width:100%;height:0.5px;margin:0px auto;padding:0.25px;background-color:rgba(0, 0, 128, 1);overflow:hidden;"></DIV>
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV style="VERTICAL-ALIGN: super; OVERFLOW: auto; WIDTH: 100%; HEIGHT: 420px; TEXT-ALIGN: left">
								<ul id="Classtree" class="ztree"></ul>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" CssClass="V2_GenericBannerToolBar" runat="server">
				<asp:Button ID="btReqDoc" AccessKey="S" title="申請調檔(ALT+S)" runat="server" Text="申請調檔(S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:panel id="Panel2" runat="server" CssClass="hide">
				<asp:textbox id=txMod runat="server" CssClass=""></asp:textbox>l 
				<asp:textbox id=txFILE_SEQ_NUM runat="server" CssClass=""></asp:textbox>
				<asp:textbox id=txFILE_VOL_NUM runat="server" CssClass=""></asp:textbox>
				<asp:textbox id=Check runat="server" CssClass=""></asp:textbox>
				<asp:customvalidator id=Validator runat="server" CssClass="" DESIGNTIMEDRAGDROP="59" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id=ValidationSummary1 runat="server" CssClass="" DESIGNTIMEDRAGDROP="85"></asp:validationsummary>
				<asp:listbox id=lbReturnValue runat="server" CssClass=""></asp:listbox>
			</asp:panel>
		</form>
	</body>
<script type="text/javascript" src="lib/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="lib/jquery.ztree.exhide-3.5.js"></script>
</HTML>
