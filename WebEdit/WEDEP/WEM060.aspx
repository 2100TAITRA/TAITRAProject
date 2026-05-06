<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="WEM060.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEM060" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>WEM060 機關檔確認更新作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="WEM060" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<DIV class="hide">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" style="Z-INDEX: 101; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
				<asp:textbox id="FILEPATH" Runat="server"></asp:textbox>
				<asp:textbox id="AP_FILEIO_WS" style="Z-INDEX: 102; LEFT: 249px; POSITION: absolute; TOP: 257px" runat="server" CssClass="hidden"></asp:textbox>
				<asp:textbox id="AP_WORK_PATH" style="Z-INDEX: 102; LEFT: 315px; POSITION: absolute; TOP: 256px" runat="server" CssClass="hidden"></asp:textbox>
				<asp:textbox id="AP_FILENAME" style="Z-INDEX: 102; LEFT: 315px; POSITION: absolute; TOP: 256px" runat="server" CssClass="hidden"></asp:textbox>
				<asp:textbox id="H_Artifact" style="Z-INDEX: 102; LEFT: 315px; POSITION: absolute; TOP: 256px" runat="server" CssClass="hidden"></asp:textbox>				
			</DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 13em; "><asp:radiobutton id="rbReadAll" runat="server" Checked="True" Text="讀入完整機關資訊檔：" GroupName="GrpRead"></asp:radiobutton></DIV>
						<DIV class="dTD" style="width: 20em; "><INPUT id="txPathAll" accept=".csv" type="file" style="WIDTH: 19em;" name="txPathAll" runat="server"></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 13em; "><asp:radiobutton id="rbReadDiff" runat="server" Text="讀入差異機關資訊檔：" GroupName="GrpRead"></asp:radiobutton></DIV>
						<DIV class="dTD" style="width: 20em; "><INPUT id="txPathDiff" accept=".csv" type="file" style="WIDTH: 19em;" name="txPathDiff" runat="server"></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 129px;">
								<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" BorderWidth="1px">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbNo" runat="server"></asp:Label>&nbsp;
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="異動別">
											<ItemTemplate>
												<asp:Label id="lbTranType" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="機關代碼(機關名稱)">
											<ItemTemplate>
												<asp:Label id="lbOrgNoName" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="差異欄位">
											<ItemTemplate>
												<asp:Label id="lbFldName" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="原值/新值">
											<ItemTemplate>
												<asp:Label id="lbOldValue" runat="server"></asp:Label><BR>
												<asp:Label id="lbNewValue" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOutDiff" runat="server" Text="產生差異檔(D)" accesskey="D" title="產生差異檔(Alt+D)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btLoad" runat="server" Text="載入機關檔(M)" accesskey="M" title="載入機關檔(Alt+M)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPrintDiff" runat="server" Text="列印畫面明細(P)" accesskey="P" title="列印畫面明細(Alt+P)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btConfirm" runat="server" Text="確認更新(Z)" accesskey="Z" title="確認更新(Alt+Z)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢更新記錄(S)" accesskey="S" title="查詢更新記錄(Alt+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
