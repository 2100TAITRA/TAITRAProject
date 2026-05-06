<%@ Page language="c#" Codebehind="DFM312.aspx.cs" AutoEventWireup="false" Inherits="AK.DFM312" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>DFM312 案卷夾層及命名管理原則作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body class="hidden" MS_POSITIONING="GridLayout">
		<form id="DFM312" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 100; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
								<asp:label class="" id="Label1" runat="server">1.目錄層級設定：</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
								<asp:label class="" id="Label2" runat="server"> 目錄級數：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 22.5em">
								<asp:dropdownlist id="dlDirLvl" tabIndex="10" runat="server">
									<asp:ListItem Value="3">3</asp:ListItem>
									<asp:ListItem Value="4">4</asp:ListItem>
									<asp:ListItem Value="5">5</asp:ListItem>
									<asp:ListItem Value="6">6</asp:ListItem>
								</asp:dropdownlist>
								<asp:textbox id="txUsedSpace" runat="server" CssClass="hidden"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
								<asp:label class="" id="Label3" runat="server">層級連接符號：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 22.5em">
								<asp:dropdownlist id="dlDirSep" tabIndex="20" runat="server">
									<asp:ListItem Value="-">-</asp:ListItem>
									<asp:ListItem Value="_">_</asp:ListItem>
								</asp:dropdownlist>
								<asp:label id="lbORGNO" runat="server" CssClass="hidden" Width="5.5em"></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
								<asp:label class="" id="Label4" runat="server">　目錄範例：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 22.5em">
								<asp:textbox id="lbSample" tabIndex="-1" runat="server" CssClass="TextLabel" Width="22em" ReadOnly="True"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10em">
								<asp:label class="" id="Label5" runat="server">2.檔名重覆處理：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 22.5em">
								<asp:label class="" id="Label11" runat="server" BackColor="#E0E0E0" Font-Size="Smaller">(檔名重覆定義 : 同一卷公文電子檔案檔名相同)</asp:label></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable" id="Table1">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.7em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 29.8em">
									<asp:radiobutton id="rb3" tabIndex="30" runat="server" Width="21.5em" Text="不應該重覆，所以若遇重覆則該文暫不轉入"
										GroupName="NameDuplicate"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.7em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 29.8em">
									<asp:radiobutton id="rb1" tabIndex="40" runat="server" Width="7em" Text="自動增加"
										GroupName="NameDuplicate" Checked="True"></asp:radiobutton>
										<asp:dropdownlist id="dlAddDir" tabIndex="45" runat="server">
											<asp:ListItem Value="1">公文文號</asp:ListItem>
											<asp:ListItem Value="2">目次號</asp:ListItem>
										</asp:dropdownlist>
											<asp:label id="Label6" runat="server">層級，避免重覆</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.7em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 29.8em">
								<asp:radiobutton id="rb2" tabIndex="50" runat="server" Width="28em" Text="重覆檔案檔名前補公文文號區隔"
									GroupName="NameDuplicate"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.2em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 30.3em">
								<asp:label class="" id="Label12" runat="server">3.目錄層級設定：</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.7em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 29.8em">						
								<asp:radiobutton id="rbmo1" tabIndex="60" runat="server" Width="7.5em"
									Text="同卷不跨媒體" GroupName="mo" Checked="True"></asp:radiobutton>
								<asp:radiobutton id="rbmo2" tabIndex="70" runat="server" Width="7.5em"
									Text="同案不跨媒體" GroupName="mo"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.7em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 29.8em">					
							<asp:radiobutton id="rbmo3" tabIndex="80" runat="server" Width="11em"
								GroupName="mo" Text="同分類不跨媒體"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.2em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 30.3em">							
								<asp:label class="" id="Label13" runat="server"> 4.複製媒體設定：</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10.2em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 22.3em">							 
								<asp:label class="" id="Label7" runat="server">媒體種類：</asp:label>
								<asp:dropdownlist id="dlCopyMedia" tabIndex="90" runat="server" Width="4.5em"
									>
									<asp:ListItem Value="1">DVD</asp:ListItem>
									<asp:ListItem Value="2">CD</asp:ListItem>
								</asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 10.2em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 22.3em">						
								<asp:label class="" id="Label8" runat="server">可用容量：</asp:label>
								<asp:textbox id="txMediaCapacity" CssClass="InputFieldNumeric" tabIndex="100" runat="server" Width="2.5em"></asp:textbox>
								<asp:label class="" id="Label14" runat="server">MB/片</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 3.2em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 29.3em">			
								<asp:label class="" id="Label9" runat="server">保留容量供詮釋資料使用：</asp:label>
								<asp:textbox id="txReserveCapacity" CssClass="InputFieldNumeric" tabIndex="110" runat="server" Width="2.5em"></asp:textbox>
								<asp:label class="" id="Label15" runat="server">MB/片</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.2em">&nbsp;</DIV>
						<DIV class="dTD" style="WIDTH: 26.3em">
								<asp:label class="" id="Label10" runat="server">電子檔案每卷容量：</asp:label>
								<asp:textbox id="txDfMaxseq" CssClass="InputFieldNumeric" tabIndex="120" runat="server" Width="2em"
									MaxLength="3"></asp:textbox>
								<asp:label class="" id="Label16" runat="server">件</asp:label></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>			
			<asp:label id="lbSourceOrgNo" style="Z-INDEX: 106; LEFT: 790px; POSITION: absolute; TOP: 205px"
				runat="server" CssClass="hidden" Width="109px">Label</asp:label>
			<asp:customvalidator id="Validator" style="Z-INDEX: 102; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
