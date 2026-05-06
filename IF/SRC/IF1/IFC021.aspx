<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFC021.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFC021" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>¾÷Ãö²ÕÂ´</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<script src="../LIB/IF_LIB.js"></script>
		<link rel="stylesheet" href="../IFLIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<style>
            BODY { BACKGROUND-COLOR: white }
	        TD { FONT-FAMILY: verdana,helvetica; WHITE-SPACE: nowrap; FONT-SIZE: 10pt; TEXT-DECORATION: none }
	        A { COLOR: black; TEXT-DECORATION: none }
	        SPAN { BACKGROUND-COLOR: white }
		</style>
	</HEAD>
	<body style="BACKGROUND-COLOR: window" MS_POSITIONING="GridLayout">		
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
		<form id="IFC021" method="post" runat="server">			
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute;VISIBILITY: hidden">
				<asp:customvalidator id="Validator" style="Z-INDEX: 105; POSITION: absolute; TOP: 195px; LEFT: 23px" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; POSITION: absolute; TOP: 252px; LEFT: 12px" runat="server" CssClass="hidden"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5.5em" CssClass="hidden"></asp:listbox>
                <asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
			</DIV>
			<asp:DropDownList id="dlOrgInfo" runat="server" CssClass="hidden" style="Z-INDEX:101; POSITION:absolute; DISPLAY:none; TOP:102px; LEFT:10px"></asp:DropDownList>
			<asp:textbox id="txRootPath" style="Z-INDEX: 103; POSITION: absolute; DISPLAY: none; TOP: 258px; LEFT: 12px" runat="server"></asp:textbox>
			<asp:textbox id="txAuthWS" style="Z-INDEX: 103; POSITION: absolute; DISPLAY: none; TOP: 258px; LEFT: 12px" runat="server"></asp:textbox>
			<div class="DivTable">
				<div class="dTR">
					<div class="dTD" id="Data">
						<div class="GridDiv" style="Height:300px">
							<ul id="Classtree" class="ztree"></ul>
						</DIV>
					</DIV>
				</DIV>
			</div>
		</form>
	</body>
	<script type="text/javascript" src="../IFLIB/jquery.ztree.core-3.5.js"></script>
	<script type="text/javascript" src="../IFLIB/jquery.ztree.exhide-3.5.js"></script>
</HTML>
