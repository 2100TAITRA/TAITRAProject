<%@ Page Language="c#" CodeBehind="EAT417.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAT417" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
	<title>EAT417 年度計畫檔號調整作業</title>
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
	<form id="EAT417" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EALIB/GenericBanner.htm"-->
		<div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
			<asp:TextBox ID="txPlanType" runat="server" Width="23px"></asp:TextBox>
			<asp:TextBox ID="h_lbClsLen" runat="server" Width="23px"></asp:TextBox>
			<asp:TextBox ID="htxClsKey" runat="server" Width="23px"></asp:TextBox>
			<asp:TextBox ID="htxCaseKey" runat="server" Width="23px"></asp:TextBox>
		</div>
		<div id="BaseTable" class="DivBaseTable">
			<div id="MainTable" class="DivTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label2" runat="server" CssClass="RequireField">清理批號：</asp:Label>
					</div>
					<div class="dTD" style="width: 12.5em">
						<asp:TextBox ID="txPlanNo" TabIndex="0" runat="server" Width="4.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox>
						<asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ToolTip="提示計畫批號" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
					</div>
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label1" runat="server">計畫說明：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txPlanDesc" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
					<div class="dTD" style="width: 12.5em">&nbsp;&nbsp;</div>
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label4" runat="server">檔號範圍：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txPlanRange" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" ReadOnly="True" align="right"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label3" runat="server">文(編)號：</asp:Label>
					</div>
					<div class="dTD" style="width: 12.5em">
						<asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
					</div>
					<div class="dTD">
						<asp:Button ID="btLoadDoc" runat="server" Text="載入"></asp:Button><asp:Button ID="btCancelDoc" runat="server" Text="取消"></asp:Button>
					</div>
				</div>
				<fieldset style="width: 50em; height: 18.5em">
					<legend>公文基資</legend>
					<div id="Table1" class="DivTable">
						<div class="dTR">
							<div class="dTDTitle" style="width: 6.5em">
								<asp:Label ID="Label20" runat="server">參照文號：</asp:Label>
							</div>
							<div class="dTD">
								<asp:TextBox ID="txComNo" TabIndex="0" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
								<asp:CheckBox ID="cbComNo" runat="server" Text="併件"></asp:CheckBox>
							</div>
						</div>
						<div class="dTR">
							<div class="dTDTitle" style="width: 6.5em">
								<asp:Label ID="Label7" runat="server">檔號：</asp:Label>
							</div>
							<div class="dTD">
								<asp:TextBox ID="txFileVerB" TabIndex="0" runat="server" Width="2em" CssClass="DisplayOnly" ReadOnly="True" MaxLength="3">12</asp:TextBox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							    <asp:TextBox ID="txFileYearB" TabIndex="0" runat="server" Width="2em" CssClass="DisplayOnly" ReadOnly="True">097</asp:TextBox>&nbsp;&nbsp; &nbsp;&nbsp; 
							    <asp:TextBox ID="txFileClsB" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" ReadOnly="True">12345678901234567890</asp:TextBox>&nbsp;&nbsp;&nbsp;&nbsp;
							    <asp:TextBox ID="txFileCaseB" TabIndex="0" runat="server" Width="7em" CssClass="DisplayOnly" ReadOnly="True">123456789012</asp:TextBox>&nbsp;&nbsp;&nbsp;&nbsp;
							    <asp:TextBox ID="txFileVolB" TabIndex="0" runat="server" Width="2.5em" CssClass="DisplayOnly" ReadOnly="True">1234</asp:TextBox>&nbsp;&nbsp;&nbsp;&nbsp;
							    <asp:TextBox ID="txFileSeqB" TabIndex="0" runat="server" Width="2.5em" CssClass="DisplayOnly" ReadOnly="True">1234</asp:TextBox>
							</div>
						</div>
						<div class="dTR">
							<div class="dTDTitle" style="width: 6.5em">
								<asp:Label ID="Label6" runat="server">類目名稱：</asp:Label>
							</div>
							<div class="dTD" style="width: 17em">
								<asp:TextBox ID="txClsNameB" TabIndex="0" runat="server" Width="16.5em" CssClass="DisplayOnly" ReadOnly="True" align="right"></asp:TextBox>
							</div>
							<div class="dTDTitle" style="width: 4.5em">
								<asp:Label ID="Label8" runat="server">案名：</asp:Label>
							</div>
							<div class="dTD">
								<asp:TextBox ID="txCaseNameB" TabIndex="0" runat="server" Width="17em" CssClass="DisplayOnly" ReadOnly="True" align="right"></asp:TextBox>
							</div>
						</div>
						<div class="dTR">
							<div class="dTDTitle" style="width: 6.5em">
								<asp:Label ID="Label9" runat="server" CssClass="RequireField">案由：</asp:Label>
							</div>
							<div class="dTD">
								<asp:TextBox ID="txSubject" TabIndex="0" runat="server" Width="38.5em" CssClass="RequireField" align="right"></asp:TextBox>
							</div>
						</div>
						<div class="dTR">
							<div class="dTDTitle" style="width: 6.5em">
								<asp:Label ID="Label11" runat="server">承辦單位：</asp:Label>
							</div>
							<div class="dTD" style="width: 17em">
								<asp:TextBox ID="txRpsDept" TabIndex="0" runat="server" Width="8em" CssClass="DisplayOnly" ReadOnly="True">097</asp:TextBox>
							</div>
							<div class="dTDTitle" style="width: 4.5em">
								<asp:Label ID="Label12" runat="server">承辦人：</asp:Label>
							</div>
							<div class="dTD">
								<asp:TextBox ID="txRpsUser" TabIndex="0" runat="server" Width="8.5em" CssClass="DisplayOnly" ReadOnly="True">承辦人</asp:TextBox>
							</div>
						</div>
						<div class="dTR">
							<div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;</div>
							<div class="dTD" style="width: 3.5em">
								<asp:Label ID="Label5" Style="letter-spacing: -1pt" runat="server" CssClass="RequireField">版本別</asp:Label>
							</div>
							<div class="dTD" style="width: 3.5em">
								<asp:Label ID="Label10" Style="letter-spacing: -1pt" runat="server" CssClass="RequireField">年度號</asp:Label>
							</div>
							<div class="dTD" style="width: 13em">
								<asp:Label ID="Label16" Style="letter-spacing: -1pt" runat="server" CssClass="RequireField">分類號</asp:Label>
							</div>
							<div class="dTD" style="width: 9em">
								<asp:Label ID="Label17" Style="letter-spacing: -1pt" runat="server" CssClass="RequireField">案次號</asp:Label>
							</div>
							<div class="dTD" style="width: 3.5em">
								<asp:Label ID="Label18" Style="letter-spacing: -1pt" runat="server" CssClass="RequireField">卷次號</asp:Label>
							</div>
							<div class="dTD">
								<asp:Label ID="Label19" Style="letter-spacing: -1pt" runat="server" CssClass="RequireField">目次號</asp:Label>
							</div>
						</div>
						<div class="dTR">
							<div class="dTDTitle" style="width: 6.5em">
								<asp:Label ID="Label13" runat="server" CssClass="RequireField">修正後檔號：</asp:Label>
							</div>
							<div class="dTD" style="width: 3.5em">
								<asp:TextBox ID="txFileVer" TabIndex="0" runat="server" Width="1.5em" CssClass="RequireField">12</asp:TextBox>
							</div>
							<div class="dTD" style="width: 3.5em">
								<asp:TextBox ID="txFileYear" TabIndex="0" runat="server" Width="2em" CssClass="RequireField">097</asp:TextBox>
							</div>
							<div class="dTD" style="width: 13em">
								<asp:TextBox ID="txFileCls" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField">12345678901234567890</asp:TextBox>
								<asp:ImageButton ID="ibtCLS" TabIndex="-1" runat="server" ToolTip="查詢分類號" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
							</div>
							<div class="dTD" style="width: 9em">
								<asp:TextBox ID="txFileCase" TabIndex="0" runat="server" Width="7em" CssClass="RequireField">123456789012</asp:TextBox>
								<asp:ImageButton ID="ibtCASE" TabIndex="-1" runat="server" ToolTip="查詢案次號" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
							</div>
							<div class="dTD" style="width: 3.5em">
								<asp:TextBox ID="txFileVol" TabIndex="0" runat="server" Width="2.5em" CssClass="RequireField">1234</asp:TextBox>
							</div>
							<div class="dTD">
								<asp:TextBox ID="txFileSeq" TabIndex="0" runat="server" Width="2.5em" CssClass="RequireField">1234</asp:TextBox>
								<asp:Button ID="btAutoVol" runat="server" Width="6em" Text="編卷或儲存"></asp:Button>
							</div>
						</div>
						<div class="dTR">
							<div class="dTDTitle" style="width: 6.5em">
								<asp:Label ID="Label14" runat="server">類目名稱：</asp:Label>
							</div>
							<div class="dTD" style="width: 17em">
								<asp:TextBox ID="txClsName" TabIndex="0" runat="server" Width="16.5em" CssClass="DisplayOnly" ReadOnly="True" align="right"></asp:TextBox>
							</div>
							<div class="dTDTitle" style="width: 4.5em">
								<asp:Label ID="Label15" runat="server">案名：</asp:Label>
							</div>
							<div class="dTD">
								<asp:TextBox ID="txCaseName" TabIndex="0" runat="server" Width="17em" CssClass="DisplayOnly" ReadOnly="True" align="right"></asp:TextBox>
							</div>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
			<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
