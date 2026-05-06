<%@ Page language="c#" Codebehind="AutoLoginByType_Client.aspx.cs" AutoEventWireup="false" Inherits="IIWS.AutoLoginByType_Client" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>AutoLoginByType_Client</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AutoLoginByType_Client" method="post" runat="server">
			<FONT face="新細明體">
				<asp:TextBox id="txAcc" style="Z-INDEX: 101; LEFT: 196px; POSITION: absolute; TOP: 106px" runat="server"></asp:TextBox>
				<asp:Label id="Label2" style="Z-INDEX: 105; LEFT: 120px; POSITION: absolute; TOP: 150px" runat="server">Password:</asp:Label>
				<asp:TextBox id="txPass" autocomplete="off" style="Z-INDEX: 102; LEFT: 196px; POSITION: absolute; TOP: 152px" runat="server" TextMode="Password">1</asp:TextBox>
				<asp:Button id="Button1" style="Z-INDEX: 103; LEFT: 370px; POSITION: absolute; TOP: 150px" runat="server" Text="Submit"></asp:Button>
				<asp:Label id="Label1" style="Z-INDEX: 104; LEFT: 126px; POSITION: absolute; TOP: 108px" runat="server">Account:</asp:Label>
				<asp:Label id="Label3" style="Z-INDEX: 106; LEFT: 120px; POSITION: absolute; TOP: 70px" runat="server" Width="328px" Height="20px">這是母視窗</asp:Label></FONT>
		</form>
	</body>
</HTML>
