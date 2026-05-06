<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFM905.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM905" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM905 憑證使用政策維護作業</TITLE>
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
		<FORM id="IFM905" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTD" style="width:11em;"><asp:label id="lbt010101" runat="server" CssClass="RequireField">1.機關憑證</asp:label></div>
						<div class="dTD" style="width:22em;text-align: center"><asp:label id="lbt010102" runat="server" Width="22em" CssClass="RequireField">第一組</asp:label></div>
						<div class="dTD" style="width:22em;text-align: center"><asp:label id="lbt010103" runat="server" Width="22em" >第二組</asp:label></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:11em">
							<asp:label id="lbt010201" runat="server" CssClass="RequireField">發行者：</asp:label>
						</div>
						<div class="dTD" style="width:22em;">
							<asp:textbox id="txIssuer" tabIndex="1" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txIssuer2" tabIndex="2" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:11em"><asp:label id="lbt010301" runat="server" Width="14em" CssClass="RequireField">RootCA憑證檔全徑名：</asp:label></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txRootCA" tabIndex="1" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txRootCA2" tabIndex="2" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:11em"><asp:label id="lbt010401" runat="server" Width="14em" CssClass="RequireField">中繼CA憑證檔全徑名：</asp:label></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txRelayCA" tabIndex="1" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txRelayCA2" tabIndex="2" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:11em"><asp:label id="lbt010501" runat="server" Width="14em" CssClass="RequireField">CA憑證檔全徑名：</asp:label></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txCA" tabIndex="1" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txCA2" tabIndex="2" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:11em"><asp:label id="lbt010601" runat="server" Width="14em" CssClass="RequireField">CA憑證廢止清冊(CARL)全徑名(Complete)：</asp:label></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txCARL" tabIndex="1" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txCARL2" tabIndex="2" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:11em"><asp:label id="lbt010701" runat="server" Width="14em" CssClass="RequireField">憑證廢止清冊(CRL)全徑名(Complete)：</asp:label></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txCRL" tabIndex="1" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txCRL2" tabIndex="2" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width:11em"><asp:label id="lbt010801" runat="server" Width="14em" CssClass="RequireField">使用時機：</asp:label></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txRmk" tabIndex="1" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
						<div class="dTD" style="width:22em;"><asp:textbox id="txRmk2" tabIndex="2" runat="server" Width="22em" CssClass="RequireFieldText" MaxLength="20" Height="38px" TextMode="MultiLine"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTD" style="width:11em;">
							<asp:label id="Label5" runat="server" CssClass="RequireField">2.個人憑證</asp:label>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<div class="GridDiv" style="HEIGHT: 200px;">
								<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemStyle HorizontalAlign="Right"></ItemStyle>
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="發行者">
											<ItemStyle HorizontalAlign="Center"></ItemStyle>
											<ItemTemplate>
												<asp:textbox onblur="jf_CheckDgIssue()" id="txIdvIssuer" tabIndex="3" runat="server"
													Width="7em"  Height="38px"
													MaxLength="20" TextMode="MultiLine" ToolTip="學校:C=TW, O=行政院, OU=組織及團體憑證管理中心  政府機關:C=TW, O=行政院, OU=政府憑證管理中心"></asp:textbox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="RootCA憑證檔全徑名">
											<ItemTemplate>
												<asp:textbox onblur="jf_CheckDgFileExist(this.value,false)" id="txRootCAidv"
													tabIndex="3" runat="server" Width="7em"  
													Height="38px" MaxLength="20" TextMode="MultiLine" ToolTip="GRCA.cer存放檔案於AP SERVER路徑全徑名（包含檔名），如：C:\2100\GRCA.cer"></asp:textbox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="中繼CA憑證檔全徑名">
											<ItemTemplate>
												<asp:textbox onblur="jf_CheckDgFileExist(this.value,false)" id="txRealyCAidv"
													tabIndex="3" runat="server" Width="8.5em"  
													Height="38px" MaxLength="20" TextMode="MultiLine" ToolTip="若有中繼CA(介於ROOT CA至憑證CA之中繼CA)，則參考RootCA憑證檔全徑名及CA憑證檔全徑名方式處理。目前機關皆無中繼CA，故暫不設定。"></asp:textbox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="CA憑證檔全徑名">
											<ItemTemplate>
												<asp:textbox onblur="jf_CheckDgFileExist(this.value,true)" id="txCAidv" tabIndex="3" runat="server"
													Width="9.5em"  Height="38px"
													MaxLength="20" TextMode="MultiLine" ToolTip="XCA.cer或GCA.cer存放檔案於AP SERVER路徑全徑名（包含檔名），如：C:\2100\XCA.cer或C:\2100\GCA.cer"></asp:textbox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="CA憑證廢止清冊(CARL)全徑名(Complete)">
											<ItemTemplate>
												<asp:textbox id="txCARLidv" tabIndex="3" runat="server" Width="9.5em" 
													 Height="38px" MaxLength="20" TextMode="MultiLine" ToolTip="開啟GRCA.cer內詳細資料之CRL發佈點內容，取得其內URL之路徑填入本欄位。如：(http://grca.nat.gov.tw/repository/CRL/CA.crl)，並於儲存前先測試於AP SERVER是否可以允許下載該檔案。"></asp:textbox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="憑證廢止清冊(CRL)全徑名(Complete)">
											<ItemTemplate>
												<asp:textbox id="txCRLidv" tabIndex="3" runat="server" Width="9.5em" 
													 Height="38px" MaxLength="20" TextMode="MultiLine" ToolTip="取得發行憑證之管理中心'憑證廢止完整清冊'下載路徑(非憑證廢止異動清冊)。由右鍵按下載後，複製捷徑取得下載路徑。並於儲存前先測試於AP SERVER是否可以允許下載該檔案。"></asp:textbox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="使用時機">
											<ItemTemplate>
												<asp:textbox id="txRmkidv" tabIndex="3" runat="server" Width="9.5em"
													 Height="38px" MaxLength="20" TextMode="MultiLine" ToolTip="為一憑證使用時機之備註說明欄位，可自行輸入。"></asp:textbox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
