<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SCT950.aspx.cs" Inherits="SC.SCT950" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<title>SCT950 軟體憑證申請作業</title>
	<link rel="stylesheet" href="Content/jquery.mobile.css" />
	<script src="Scripts/jquery.js"></script>
	<script src="Scripts/jquery-migrate-3.1.0.js"></script>
	<script>
		$(document).bind("mobileinit", function () {
			$.mobile.ajaxEnabled = false;
		});
	</script>
	<script src="Scripts/jquery.mobile-1.4.5.js"></script>
	<style type="text/css">
        .hide {
            display: none;
        }
	</style>
</head>
<body>
	<form id="form1" runat="server">
		<div data-role="header" data-theme="a">
			<div data-role="controlgroup" data-type="horizontal" class="ui-btn-left ui-btn ui-btn-inline ui-corner-all">
			</div>
			<h2>SCT950 軟體憑證申請作業</h2>
		</div>
		<div style="display: none">
            <asp:TextBox ID="H_txMSG" runat="server" Text=""></asp:TextBox>
		</div>
		<div data-role="content" data-theme="a">

			<table style="width: 50%;">
				<tr>
					<td style="text-align: right; width: 100px">
						<asp:Label ID="Label1" runat="server" Text="申請單號："></asp:Label>
					</td>
					<td style="width: 300px">
						<asp:Label ID="lbApplyNo" runat="server"></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right; width: 100px">
						<asp:Label ID="Label2" runat="server" Text="申請人："></asp:Label>
					</td>
					<td style="width: 300px">
						<asp:Label ID="lbEmpName" runat="server"></asp:Label>
					</td>
				</tr>

				<tr>
					<td style="text-align: right; width: 100px">
						<asp:Label ID="Label3" runat="server" Text="申請日期："></asp:Label>
					</td>
					<td style="width: 300px">
						<asp:Label ID="lbNewDate" runat="server"></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right; width: 100px">
						<asp:Label ID="Label4" runat="server" Text="申請原因："></asp:Label>
					</td>
					<td style="width: 300px">
						<asp:TextBox ID="txReason" runat="server" data-mini="true"></asp:TextBox>
					</td>
				</tr>

				<tr>
					<td style="text-align: right; width: 100px">
						<asp:Label ID="Label5" runat="server" Text="審核時間："></asp:Label>
					</td>
					<td style="width: 300px">
						<asp:Label ID="lbTxTime" runat="server"></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right; width: 100px">
						<asp:Label ID="Label6" runat="server" Text="審核人員："></asp:Label>
					</td>
					<td style="width: 300px">
						<asp:Label ID="lbTxName" runat="server"></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right; width: 100px">
						<asp:Label ID="Label7" runat="server" Text="審核意見："></asp:Label>
					</td>
					<td style="width: 300px">
						<asp:Label ID="lbTxReason" runat="server"></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right; width: 100px">
						<asp:Label ID="Label8" runat="server" Text="憑證狀態："></asp:Label>
					</td>
					<td style="width: 300px">
						<asp:Label ID="lbTxStatus" runat="server"></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right; width: 100px">
						<asp:Label ID="Label9" runat="server" Text="有效憑證到期日："></asp:Label>
					</td>
					<td style="width: 300px">
						<asp:Label ID="lbExpiredDate" runat="server"></asp:Label>
					</td>
				</tr>
			</table>
		</div>
		<div data-role="footer" data-theme="a">
			<div data-role="controlgroup" data-type="horizontal" class="ui-btn ui-btn-left ui-btn-inline ui-corner-all" style="margin-top: 0px;">
				<asp:Button ID="btSave" runat="server" Text="傳送" ClientIDMode="Static" UseSubmitBehavior="False"/>
				<asp:Button ID="btDelete" runat="server" Text="刪除" ClientIDMode="Static" UseSubmitBehavior="False"/>
			</div>
			<h2></h2>
		</div>
	</form>
</body>
</html>
