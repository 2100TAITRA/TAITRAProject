<%@ Page language="c#" Codebehind="MsgDiag.aspx.cs" AutoEventWireup="false" Inherits="STD.LIB.MsgDiag" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>MsgDiag</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="SYS.css" type="text/css" rel="stylesheet">
		<!--#include file="/STDN/Lib/Script.shtml"-->
	</HEAD>
	<body bgColor="#ccffff" MS_POSITIONING="GridLayout">
		<form id="MsgDiag" method="post" runat="server">
			<TABLE id="Table1" style="Z-INDEX: 100; LEFT: 5px; POSITION: absolute; TOP: 5px" height="1" cellSpacing="0" cellPadding="0" width="100%" border="0">
				<TR>
					<TD class="LeftCol" colSpan="1" rowSpan="1">
						<asp:label id="Label1" runat="server" Font-Bold="True">執行狀態：</asp:label>
						<asp:label id="lbState" runat="server"></asp:label>
					</TD>
				</TR>
				<TR>
					<TD class="LeftCol" colSpan="1" rowSpan="1" style="HEIGHT: 19px">
						<asp:label id="Label2" runat="server" Font-Bold="True">錯誤訊息：</asp:label>
						<asp:label id="lbErrMsg" runat="server"></asp:label>
					</TD>
				</TR>
				<TR>
					<TD class="LeftCol" colSpan="1" rowSpan="1">
						<asp:label id="Label3" runat="server" Font-Bold="True">LOGFILE：</asp:label>
						<asp:button id="btLogNew" runat="server" Text="本次" Height="20px"></asp:button>
						<asp:button id="btLogAll" runat="server" Text="全部" Height="20px"></asp:button>
					</TD>
				</TR>
				<TR>
					<TD class="LeftCol" colSpan="1" rowSpan="1">
					</TD>
				</TR>
				<TR>
					<TD class="LeftCol" colSpan="1" rowSpan="1">
						<asp:label id="Label4" runat="server" Font-Bold="True">進階訊息：</asp:label>
					</TD>
				</TR>
				<TR>
					<TD class="LeftCol" colSpan="1" rowSpan="1">
						<asp:datagrid id="dg1" runat="server" Height="1px" AutoGenerateColumns="False" PageSize="30" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical">
							<SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="#CE5D5A"></SelectedItemStyle>
							<AlternatingItemStyle BackColor="White"></AlternatingItemStyle>
							<ItemStyle BackColor="#F7F7DE"></ItemStyle>
							<HeaderStyle Font-Bold="True" HorizontalAlign="Center" ForeColor="White" BackColor="#6B696B"></HeaderStyle>
							<FooterStyle BackColor="#CCCC99"></FooterStyle>
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
									<ItemTemplate>
										<asp:Label id="lbNo" Width="16px" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="SQL指令">
									<ItemTemplate>
										<asp:TextBox CssClass="TextLabel" id="txSql" runat="server" Width="325px" Height="100px" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="描述">
									<ItemTemplate>
										<asp:TextBox CssClass="TextLabel" id="txRmk" runat="server" Width="325px" Height="100px" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
							<PagerStyle HorizontalAlign="Right" ForeColor="Black" BackColor="#F7F7DE" Mode="NumericPages"></PagerStyle>
						</asp:datagrid>
					</TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
