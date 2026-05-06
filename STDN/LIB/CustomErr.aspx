<%@ Page language="c#" Codebehind="CustomErr.aspx.cs" AutoEventWireup="false" Inherits="STD.LIB.CustomErr" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>CustomErr</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="CustomErr" method="post" runat="server">
			<TABLE id="BaseTable" style="Z-INDEX: 103; LEFT: 23px; POSITION: absolute; TOP: 20px" height="1" cellSpacing="0" cellPadding="0" width="100%" border="0">
				<TR>
					<TD>
						<asp:label id="lbSource" runat="server" ForeColor="Red" BorderColor="White" BackColor="White" Font-Size="Large" Font-Bold="True"></asp:label>
						<asp:label id="lbMsg1" runat="server" Font-Bold="True" Font-Size="Large" BackColor="White" BorderColor="White" ForeColor="Red">中發生伺服器錯誤。</asp:label>
					</TD>
				</TR>
				<TR>
					<TD style="HEIGHT: 75px">
						<TABLE id="Table1" width="95%" bgColor="#ffffcc">
							<TR>
								<TD>
									<asp:label id="lbMsg2" runat="server">很抱歉，您執行的操作中產生了錯誤。</asp:label>
									<BR>
									<BR>
									<asp:label id="lbMsg3" style="display: none;" runat="server">錯誤訊息如下：</asp:label>
									<asp:button id="btClose" runat="server" Text="關閉本視窗" Visible="False"></asp:button>
									<asp:customvalidator id="Validator" runat="server" DESIGNTIMEDRAGDROP="810" ErrorMessage="CustomValidator"></asp:customvalidator>
								</TD>
							</TR>
						</TABLE>
					</TD>
				</TR>
				<TR>
					<TD>
						<TABLE class="MainTable" id="Table2" borderColor="#ffffff" cellSpacing="1" cellPadding="1" width="95%" bgColor="#00ffff" border="2">
							<TR style="display: none;">
								<TD class="LeftCol" style="WIDTH: 120px" align="right" width="104" bgColor="#ccffff" colSpan="1" rowSpan="1"><asp:label id="Label1" runat="server" Font-Bold="True">錯誤原因：</asp:label></TD>
								<TD width="85%" bgColor="#ffffff" colSpan="1" rowSpan="1"><asp:label id="lbErr" runat="server"></asp:label></TD>
							</TR>
							<TR style="display: none;">
								<TD class="LeftCol" style="WIDTH: 120px" align="right" width="104" bgColor="#ccffff" colSpan="1" rowSpan="1"><asp:label id="Label2" runat="server" Font-Bold="True">DB錯誤代碼：</asp:label></TD>
								<TD width="85%" bgColor="#ffffff" colSpan="1" rowSpan="1"><asp:label id="lbDbErrCode" runat="server"></asp:label></TD>
							</TR>
							<TR style="display: none;">
								<TD class="LeftCol" style="WIDTH: 120px" align="right" width="104" bgColor="#ccffff" colSpan="1" rowSpan="1"><asp:label id="Label3" runat="server" Font-Bold="True" Width="108px">DB錯誤訊息：</asp:label></TD>
								<TD width="85%" bgColor="#ffffff" colSpan="1" rowSpan="1"><asp:label id="lbDbErrMsg" runat="server"></asp:label></TD>
							</TR>
							<TR style="display: none;">
								<TD class="LeftCol" style="WIDTH: 120px" align="right" width="104" bgColor="#ccffff" colSpan="1" rowSpan="1"><asp:label id="Label4" runat="server" Font-Bold="True">SQL指令：</asp:label></TD>
								<TD width="85%" bgColor="#ffffff" colSpan="1" rowSpan="1"><asp:label id="lbSql" runat="server"></asp:label></TD>
							</TR>
							<TR style="display: none;">
								<TD class="LeftCol" style="WIDTH: 120px" align="right" width="104" bgColor="#ccffff" colSpan="1" rowSpan="1"><asp:label id="Label5" runat="server" Font-Bold="True">堆疊追蹤：</asp:label></TD>
								<TD width="85%" bgColor="#ffffff" colSpan="1" rowSpan="1"><asp:label id="lbStack" runat="server"></asp:label></TD>
							</TR>
							<TR>
                            <TD class="LeftCol" style="width: 120px" align="right" width="104" bgcolor="#ccffff" colspan="1" rowspan="1">
                                <asp:Label ID="Label11" runat="server" Font-Bold="True">問題識別碼：</asp:Label></TD>
                            <TD width="85%" bgcolor="#ffffff" colspan="1" rowspan="1">
                                <asp:Label ID="lbGuid" runat="server"></asp:Label></TD>
                        	</TR>
							<TR>
								<TD class="LeftCol" style="WIDTH: 120px" align="right" width="104" bgColor="#ccffff" colSpan="1" rowSpan="1"><asp:label id="Label6" runat="server" Font-Bold="True">發生時間：</asp:label></TD>
								<TD width="85%" bgColor="#ffffff"><asp:label id="lbTime" runat="server"></asp:label></TD>
							</TR>
							<TR>
								<TD class="LeftCol" style="WIDTH: 120px" align="right" width="104" bgColor="#ccffff" colSpan="1" rowSpan="1"><asp:label id="Label7" runat="server" Font-Bold="True">發生地點：</asp:label></TD>
								<TD width="85%" bgColor="#ffffff"><asp:label id="lbLocation" runat="server"></asp:label></TD>
							</TR>
							<TR>
								<TD class="LeftCol" style="WIDTH: 120px" align="right" width="104" bgColor="#ccffff" colSpan="1" rowSpan="1"><asp:label id="Label8" runat="server" Font-Bold="True">收件者：</asp:label></TD>
								<TD width="85%" bgColor="#ffffff"><asp:label id="lbReceiver" runat="server"></asp:label></TD>
							</TR>
							<TR>
								<TD class="LeftCol" style="WIDTH: 120px" align="right" width="104" bgColor="#ccffff" colSpan="1" rowSpan="1"><asp:label id="Label9" runat="server" Font-Bold="True">副本：</asp:label></TD>
								<TD width="85%" bgColor="#ffffff"><asp:textbox id="txSub" tabIndex="1" runat="server" Width="500px"></asp:textbox></TD>
							</TR>
							<TR>
								<TD class="LeftCol" style="WIDTH: 120px" align="right" width="104" bgColor="#ccffff" colSpan="1" rowSpan="1"><asp:label id="Label10" runat="server" Font-Bold="True" Width="102px">使用者附註：</asp:label></TD>
								<TD width="85%" bgColor="#ffffff"><asp:textbox id="txNote" tabIndex="2" runat="server" Width="500px" Height="100px" TextMode="MultiLine"></asp:textbox></TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="middle" width="100%" bgColor="#ccffff" colSpan="2"><br>
									<asp:label id="lbMsg4" runat="server">請回報此錯誤訊息至二一零零科技，本公司會儘快與您連繫並解決您的不便。</asp:label></TD>
							</TR>
							<TR>
								<TD class="LeftCol" align="middle" width="100%" bgColor="#ccffff" colSpan="2"><asp:button id="btMail" tabIndex="3" runat="server" Text="回報錯誤明細至2100科技"></asp:button></TD>
							</TR>
						</TABLE>
					</TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
