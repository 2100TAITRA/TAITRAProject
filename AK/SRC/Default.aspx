<%@ Page language="c#" Codebehind="Default.aspx.cs" AutoEventWireup="false" Inherits="AK.Default" %>
<!DOCTYPE>
<HTML>
	<HEAD>
		<title>電子檔案管理系統</title>
		<meta content="Microsoft Visual Studio 7.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript (ECMAScript)" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="lib/style.css" type="text/css" rel="stylesheet">
		<script language="javascript" src="Default.js"></script>
	</HEAD>
	<body text="#000000" bgColor="#ffffff" topMargin="0" onload="fnLoad()">
		<%--<OBJECT style="VISIBILITY: hidden" codeBase="install\DnP.CAB#Version=1,2,3,2" classid="clsid:F0776DC2-DB5A-4E2C-8692-16F5893BEF2F"
				VIEWASTEXT>
			</OBJECT>
			<OBJECT id="UPD" style="DISPLAY: none" codeBase="lib\AppUpd.ocx#Version=1.0.0.3" classid="CLSID:D7E0B575-A4C4-4C0F-93C1-926179574838"
				VIEWASTEXT>
				<PARAM NAME="_Version" VALUE="65536">
				<PARAM NAME="_ExtentX" VALUE="2646">
				<PARAM NAME="_ExtentY" VALUE="1323">
				<PARAM NAME="_StockProps" VALUE="0">
			</OBJECT>--%>
		<form id="WebForm1" method="post" runat="server" class="FormCenter">
			<!--#include file="/STDN/Lib/Script.shtml"-->
			<DIV style="BEHAVIOR: url(Template/LIB/webservice.htc)" id="service"></DIV>
			<table cellSpacing="0" cellPadding="0" width="90%" align="center" border="0">
				<tr>
					<td vAlign="top" width="326">
						<table cellSpacing="0" cellPadding="0" border="0">
							<tr>
								<td>
									<IMG height="90" src="Template/images/index_01.gif" width="326">
								</td>
							</tr>
							<tr>
								<td>
									<IMG height="58" src="Template/images/index_04.gif" width="326">
								</td>
							</tr>
							<tr>
								<td>
									<IMG height="50" src="Template/images/index_09.gif" width="326">&nbsp;
								</td>
							</tr>
							<tr>
								<td>
									<IMG height="19" src="Template/images/index_10.gif" width="326">
								</td>
							</tr>
							<tr>
								<td>
									<table cellSpacing="0" cellPadding="0" width="100%" border="0">
										<tr>
											<td>
												<IMG height="59" src="Template/images/index_11.gif" width="146">&nbsp;
											</td>
											<td>
												<IMG height="59" src="Template/images/index_12.gif" width="180">
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td>
									<table cellSpacing="0" cellPadding="0" width="100%" border="0">
										<tr>
											<td style="WIDTH: 146px">
												<IMG height="124" src="Template/images/index_17.gif" width="146">
											</td>
											<td>
												<IMG height="124" src="Template/images/index_18.gif" width="180">
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
					<td vAlign="bottom" align="left" width="331">
						<table cellSpacing="0" cellPadding="0" width="100%" border="0">
							<tr>
								<td>
									<IMG height="90" src="Template/images/index_02.gif" width="331">
								</td>
							</tr>
							<tr>
								<td>
									<table cellSpacing="0" cellPadding="0" width="100%" border="0">
										<tr>
											<td>
												<table cellSpacing="0" cellPadding="0" width="100%" bgColor="#98a6dc" border="0">
													<tr>
														<td vAlign="top" align="left" width="9">
															<IMG height="30" src="Template/images/index_05.gif" width="9">
														</td>
														<td align="center">
															<font face="細明體" color="#ffffff">
																<asp:Label id="lbSysCaption" runat="server">電子檔案管理系統</asp:Label></font>
														</td>
														<td vAlign="top" align="right" width="9">
															<IMG height="30" src="Template/images/index_07.gif" width="9">
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table cellSpacing="1" cellPadding="0" width="100%" bgColor="#98a6dc" border="0">
													<tr>
														<td vAlign="middle" align="center" bgColor="#ffffff" height="113">
															<table cellSpacing="0" cellPadding="0" border="0" style="WIDTH: 253px; HEIGHT: 131px">
																<tr>
																	<td style="WIDTH: 188px; HEIGHT: 93px">
																		<table cellSpacing="0" cellPadding="0" width="216" border="0" style="WIDTH: 216px; HEIGHT: 82px">
																			<tr>
																				<td align="right" height="28">
																					<asp:Label id="lbOrg_No" runat="server">隸屬機關代號：</asp:Label>
																				</td>
																				<td height="28">
																					<asp:textbox id="txOrg_No" Height="24px" Width="86px" runat="server"></asp:textbox>
																				</td>
																			</tr>
																			<tr>
																				<td align="right" height="28">
																					<asp:Label id="lbUSER" runat="server">登入帳號：</asp:Label>
																				</td>
																				<td height="28">
																					<asp:textbox id="tbUSER" Height="24px" Width="86px" runat="server"></asp:textbox>
																				</td>
																			</tr>
																			<tr>
																				<td align="right">
																					<asp:Label id="lbMima" runat="server">密碼：</asp:Label>
																				</td>
																				<td>
																					<asp:textbox id="tbPASS" Height="24px" Width="86px" runat="server" TextMode="Password"></asp:textbox>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
																<tr>
																	<td style="WIDTH: 187px" align="center" height="30">
																		<asp:imagebutton id="btLOGIN" runat="server" CausesValidation="False" ImageUrl="Template/images/login.gif"></asp:imagebutton>
																		<asp:imagebutton id="ImageButton1" runat="server" ImageUrl="Template/images/guest.gif" Visible="False"></asp:imagebutton>
																		<asp:imagebutton id="btEXIT" runat="server" CausesValidation="False" ImageUrl="Template/images/logout.gif"></asp:imagebutton>
																		<asp:imagebutton id="btChangMima" runat="server" CausesValidation="False" ImageUrl="Template/images/but_ChangePwd.gif"></asp:imagebutton>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table cellSpacing="0" cellPadding="0" width="100%" bgColor="#98a6dc" border="0">
													<tr>
														<td vAlign="middle" align="left">
															<IMG src="Template/images/index_14.gif">
														</td>
														<td vAlign="middle" align="center">
															<IMG src="Template/images/index_15.gif">
														</td>
														<td vAlign="bottom" align="right">
															<IMG src="Template/images/index_16.gif">
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
						<table cellSpacing="0" cellPadding="0" width="100%" border="0">
							<tr>
								<td>
									<IMG height="103" src="Template/images/index_20.gif" width="331">
								</td>
							</tr>
						</table>
					</td>
					<td vAlign="top">
						<table cellSpacing="0" cellPadding="0" width="100%">
							<tr>
								<td height="217">
									&nbsp;
								</td>
							</tr>
							<tr>
								<td align="left">
									<IMG height="59" src="Template/images/index_13.gif" width="123">
								</td>
							</tr>
							<tr>
								<td height="124">
									<P>
										<%--<asp:HyperLink id="HyperLink1" runat="server" Font-Size="Smaller" NavigateUrl="install/AcrobatRead5.exe" CssClass="hide">ACROBAT READER 下載</asp:HyperLink><br>--%>
										<%--<asp:HyperLink id="HyperLink2" runat="server" Font-Size="Smaller" NavigateUrl="install/UniViewSetup.exe" CssClass="hide">Uniview下載</asp:HyperLink><br>--%>
										<%--<asp:HyperLink id="HyperLink3" runat="server" Font-Size="Smaller" NavigateUrl="install/連接伺服器文件.doc">設定連接伺服器文件下載</asp:HyperLink></P>--%>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			&nbsp;
			<asp:label id="lbUSERIP" runat="server" Visible="False">Label</asp:label>
		</form>
        <script>
            function fnLoad()
            {
                //var version = document.all.nVersion.value;
                //if (version != "")
                //{
                //    var webfile = document.all.nWS.value;
                //    var rsrc = document.all.nRsrc.value;
                //    var regType = "HKEY_CLASSES_ROOT";
                //    var regPath = "UniView.Document\\shell\\open\\command";
                //    document.all.UPD.U1(version, webfile, rsrc,
                //            regType, regPath);
                //}
            }
            document.all.btChangMima.onclick = fnChangMima;
            function fnChangMima()
            {
                Page_BlockSubmit = true;
                screen_height = window.screen.height;
                screen_width = window.screen.width;
                subwin_height = 180;
                subwin_width = 250;
                subwin_top = (screen_height - subwin_height) / 2;
                subwin_left = (screen_width - subwin_width) / 2;

                pDir = "directories=no";
                pLcn = "location=no";
                pMenu = "menubar=no";
                pStatus = "status=no";
                pTool = "toolbar=no";
                pScroll = "scrollbars=no";
                pResize = "resizable=no";
                pHeight = "height=" + subwin_height;
                pWidth = "width=" + subwin_width;
                pTop = "top=" + subwin_top;
                pLeft = "left=" + subwin_left;

                pOption = pDir + ',' + pHeight + ',' + pLcn + ',' + pMenu + ',' + pStatus + ',' + pTool + ',' + pScroll + ',' + pResize + ',' + pWidth + ',' + pTop + ',' + pLeft;
                //window.open('ChangePass.aspx','');
                window.open("ChangePass.aspx", "ChangePass", pOption);
            }
		</script>
	</body>
</HTML>
