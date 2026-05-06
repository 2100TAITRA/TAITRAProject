<%@ Page language="c#" Codebehind="DFM100.aspx.cs" AutoEventWireup="false" Inherits="AK.DFM100" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>DFM100 匯入轉出參數設定作業</title>
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
		<form id="DFM100" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 100; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV id="MultiPage" class="DivTable">
					<FIELDSET style="WIDTH: 38em; HEIGHT: 2em">
						<DIV style="HEIGHT: 15px">
							<asp:image id="Tab1" runat="server" CssClass="tab" ImageUrl="images/DFM100_IPara_o.gif" state="normal" pressedSrc="images/DFM100_IPara_p.gif" hoverSrc="images/DFM100_IPara_h.gif" originalSrc="images/DFM100_IPara_o.gif" alt=""></asp:image>
							<asp:image id="Tab2" runat="server" CssClass="tab" ImageUrl="images/DFM100_OPara_o.gif" state="normal" pressedSrc="images/DFM100_OPara_p.gif" hoverSrc="images/DFM100_OPara_h.gif" originalSrc="images/DFM100_OPara_o.gif" alt=""></asp:image>
							<asp:textbox id="ActiveTab" runat="server" CssClass="hide" Width="3em" Height="1.5em"></asp:textbox>
						</DIV>
					</FIELDSET>
					<FIELDSET style="WIDTH: 38em; HEIGHT: 21.5em">
						<asp:panel id="Page1" runat="server" Width="37em" type="multiPage" Height="26em">
							<DIV class="DivTable" id="MainTable">
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label11" runat="server" Width="1.5em"></asp:label>
											<asp:label id="Label6" runat="server" Width="7.5em">匯入介面種類：</asp:label>
											<asp:dropdownlist id="ddlImportIf" runat="server" Width="10em">
												<asp:ListItem Value="1">WebService</asp:ListItem>
												<asp:ListItem Value="2">DB Trigger</asp:ListItem>
												<asp:ListItem Value="3">資料庫暫存表格</asp:ListItem>
												<asp:ListItem Value="4">XML 檔案</asp:ListItem>
												<asp:ListItem Value="5">共用DB不須匯入</asp:ListItem>
											</asp:dropdownlist></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label12" runat="server" Width="1.5em"></asp:label>
											<asp:checkbox id="cbImportExe" runat="server" Width="17em" Text="匯入前先執行下列程式" Checked="True"></asp:checkbox></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:8em">
											<asp:label id="Label13" runat="server" Width="2.5em"></asp:label>
											<asp:label id="Label1" runat="server" Width="7em">程式名稱路徑：</asp:label>
									</DIV>
									<DIV class="dTD">
											<asp:textbox id="tbImportPrgPath" runat="server" Width="8em"></asp:textbox>
											<asp:label id="Label20" runat="server" Width="7em" BackColor="#E0E0E0">(例 :http://localhost/Math/Math.asmx)</asp:label></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:8em">
											<asp:label id="Label14" runat="server" Width="4.5em"></asp:label>
											<asp:label id="Label5" runat="server" Width="5em">程式種類：</asp:label>
									</DIV>
									<DIV class="dTD">									
											<asp:DropDownList id="ddlImportPrg" runat="server" Width="10em">
												<asp:ListItem Value="1">WebService</asp:ListItem>
												<asp:ListItem Value="2">Web 應用程式 </asp:ListItem>
												<asp:ListItem Value="3">EXE執行檔</asp:ListItem>
											</asp:DropDownList></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label15" runat="server" Width="1.5em"></asp:label>
											<asp:label id="Label2" runat="server">匯入資料種類：</asp:label>
											<asp:dropdownlist id="ddlImportData" runat="server" Width="16em">
												<asp:ListItem Value="1">線上簽核(含紙本)系統辦畢歸檔資料</asp:ListItem>
												<asp:ListItem Value="2">一般公文管理系統辦畢歸檔資料</asp:ListItem>
												<asp:ListItem Value="3">檔管系統編目完成資料</asp:ListItem>
												<asp:ListItem Value="4">電子檔管系統編目完成資料</asp:ListItem>
											</asp:dropdownlist></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label16" runat="server" Width="1.5em"></asp:label>
											<asp:checkbox id="cbSignature" runat="server" Width="17em" Text="歸檔電子檔案含電子簽章" Checked="True"></asp:checkbox></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label17" runat="server" Width="1.5em"></asp:label>
											<asp:checkbox id="cbAutoAccept" runat="server" Width="25em" Text="歸檔電子檔案檢核無誤時，自動點收不須人工點收"></asp:checkbox>&nbsp;&nbsp;</DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label18" runat="server" Width="1.5em"></asp:label>
											<asp:checkbox id="cbSecurityChk" runat="server" Width="24em" Text="呼叫本系統匯入WebService時，須通過安全檢查" Checked="True"></asp:checkbox></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label19" runat="server" Width="1.5em"></asp:label>
											<asp:checkbox id="cbAutoBuild" runat="server" Width="21.5em" Text="利用匯入資料，自動更新各單位人員資料"></asp:checkbox>&nbsp;&nbsp;</DIV>
								</DIV>
							</DIV>
						</asp:panel>
						<asp:panel id="Page2" runat="server" CssClass="hide" Width="37em" type="multiPage" Height="26em">
							<DIV class="DivTable" id="Table2" border="1">
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label23" runat="server" Width="1.5em"></asp:label>
											<asp:label id="Label8" runat="server" Width="7.5em">轉出介面種類：</asp:label>
											<asp:dropdownlist id="ddlExportIf" runat="server" Width="151px">
												<asp:ListItem Value="1">WebService</asp:ListItem>
												<asp:ListItem Value="2">DB Trigger</asp:ListItem>
												<asp:ListItem Value="2">資料庫暫存表格</asp:ListItem>
												<asp:ListItem Value="4">XML檔案</asp:ListItem>
												<asp:ListItem Value="5">不轉出</asp:ListItem>
											</asp:dropdownlist></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:11.5em">
											<asp:label id="Label9" runat="server" Width="10.5em">轉出WebService Name：</asp:label>
									</DIV>
									<DIV class="dTD">
											<asp:textbox id="tbWS" runat="server" Width="8em"></asp:textbox>
											<asp:label id="Label21" runat="server" Width="7em" BackColor="#E0E0E0">(例 :http://localhost/Math/Math.asmx)</asp:label></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:11.5em">
											<asp:label id="Label25" runat="server" Width="8.5em"></asp:label>
											<asp:label id="Label7" runat="server" Width="4em">PORT：</asp:label>
									</DIV>
									<DIV class="dTD">
											<asp:textbox id="tbPort" runat="server" Width="8.5em"></asp:textbox></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label26" runat="server" Width="1.5em"></asp:label>
											<asp:checkbox id="cbExportExe" runat="server" Width="18em" Text="轉出後執行下列程式" Checked="True"></asp:checkbox></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:8em">
											<asp:label id="Label27" runat="server" Width="2.5em"></asp:label>
											<asp:label id="Label10" runat="server" Width="7.5em">程式名稱路徑：</asp:label>
									</DIV>
									<DIV class="dTD">
											<asp:textbox id="tbExportPrgPath" runat="server" Width="8em"></asp:textbox>
											<asp:label id="Label22" runat="server" Width="7em" BackColor="#E0E0E0">(例 :http://localhost/Math/Math.asmx)</asp:label></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:8em">
											<asp:label id="Label28" runat="server" Width="4.5em"></asp:label>
											<asp:label id="Label4" runat="server" Width="5em">程式種類：</asp:label>
									</DIV>
									<DIV class="dTD">
											<asp:DropDownList id="ddlExportPrg" runat="server" Width="10em">
												<asp:ListItem Value="1">WebService</asp:ListItem>
												<asp:ListItem Value="2">Web 應用程式 </asp:ListItem>
												<asp:ListItem Value="3">EXE執行檔</asp:ListItem>
											</asp:DropDownList></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label29" runat="server" Width="1.5em"></asp:label>
											<asp:checkbox id="cbOutAccept" runat="server" Width="25em" Text="轉出點收退文資料"></asp:checkbox>&nbsp;&nbsp;
										
									</DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label30" runat="server" Width="1.5em"></asp:label>
											<asp:CheckBox id="cbOutIndex" runat="server" Text="詮釋資料轉出"></asp:CheckBox></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle">
											<asp:label id="Label31" runat="server" Width="1.5em"></asp:label>
											<asp:Label id="Label3" runat="server">轉出暫存表資料庫連結參數</asp:Label></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:7em">
												<asp:label id="Label32" runat="server" Width="2.5em"></asp:label>
												<asp:Label id="Label37" runat="server">資料庫種類：</asp:Label>
									</DIV>
									<DIV class="dTD">
												<asp:DropDownList id="ddlExportSrv" runat="server" Width="10em">
													<asp:ListItem Value="1">SQL Server</asp:ListItem>
													<asp:ListItem Value="2">ORACLE</asp:ListItem>
													<asp:ListItem Value="3">SYBASE</asp:ListItem>
												</asp:DropDownList></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:7em">
											<asp:label id="Label33" runat="server" Width="3.5em"></asp:label>
											<asp:Label id="Label38" runat="server">主機名稱：</asp:Label>
									</DIV>
									<DIV class="dTD">
											<asp:TextBox id="tbHost" runat="server"></asp:TextBox></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:7em">
											<asp:label id="Label34" runat="server" Width="2.5em"></asp:label>
											<asp:Label id="Label39" runat="server">資料庫名稱：</asp:Label>
									</DIV>
									<DIV class="dTD">
											<asp:TextBox id="tbDBName" runat="server"></asp:TextBox></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:7em">
											<asp:label id="Label35" runat="server" Width="2.5em"></asp:label>
											<asp:Label id="Label40" runat="server">使用者帳號：</asp:Label>
									</DIV>
									<DIV class="dTD">
											<asp:TextBox id="tbUserAcc" runat="server"></asp:TextBox></DIV>
								</DIV>
								<DIV class="dTR">
									<DIV class="dTDTitle" style="width:7em">
											<asp:label id="Label36" runat="server" Width="5.5em"></asp:label>
											<asp:Label id="Label41" runat="server">密碼：</asp:Label>
									</DIV>
									<DIV class="dTD">
											<asp:TextBox id="tbPasswd" runat="server"></asp:TextBox></DIV>
								</DIV>
							</DIV>
						</asp:panel>
					</FIELDSET>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>	
		<asp:customvalidator id="Validator" style="Z-INDEX: 102; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
		<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
