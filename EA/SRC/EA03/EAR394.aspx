<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EAR394.aspx.cs" AutoEventWireup="false" Inherits="EA03.EAR394" %>
<!DOCTYPE HTML >
<html>
<head>
	<title>EAR394 歸檔案件統計列印作業</title>
	<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<meta content="C#" name="CODE_LANGUAGE">
	<meta content="JavaScript" name="vs_defaultClientScript">
	<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
	<form id="EAR394" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EALIB/GenericBanner.htm"-->
		<div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hidden"></asp:ListBox>
            <asp:dropdownlist id="dldept" runat="server"></asp:dropdownlist>
		</div>
		<div class="DivBaseTable" id="BaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
					    <asp:Label ID="lbYear" CssClass="RequireField" runat="server">列印年份：</asp:Label>
				    </div>
				    <div class="dTD">
					    <asp:TextBox ID="txYearS" runat="server" Width="2em" MaxLength="3" CssClass="RequireFieldNumeric"></asp:TextBox> ~ 
                        <asp:TextBox ID="txYearE" runat="server" Width="2em" MaxLength="3" CssClass="RequireFieldNumeric"></asp:TextBox>
				    </div>
                </div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em">
						<asp:Label ID="lbType" runat="server">報表類型：</asp:Label>
					</div>
					<div class="dTD">
						<asp:RadioButton ID="rbType1" runat="server" Text="編目情形統計表" GroupName="Type" Checked="True"></asp:RadioButton><br>
						<asp:RadioButton ID="rbType2" runat="server" Text="銷毀統計表" GroupName="Type"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbType3" runat="server" Text="機密文件統計表" GroupName="Type"></asp:RadioButton>
					</div>
				</div>
			</div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
			<asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" Accesskey = "O" Title = "匯出Excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
