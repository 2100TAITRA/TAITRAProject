<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SCM950.aspx.cs" Inherits="SC.SCM950" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<title>SCM950 軟體憑證維護作業</title>
	<link rel="stylesheet" href="Content/jquery.mobile.css" />
	<script src="Scripts/jquery.js"></script>
	<script src="Scripts/jquery-migrate-3.1.0.js"></script>
	<script src="SCM950.js?v=1"></script>
	<script>
		$(document).bind("mobileinit", function () {
			$.mobile.ajaxEnabled = false;
		});
	</script>
	<script src="Scripts/jquery.mobile-1.4.5.js"></script>
</head>
<body>
	<form id="form1" runat="server">
		<div data-role="header" data-theme="a">
			<div data-role="controlgroup" data-type="horizontal" class="ui-btn ui-btn-left ui-btn-inline ui-corner-all">
			</div>
			<h2>SCM950 軟體憑證維護作業</h2>

			<div id="logArea" style="overflow:auto;width:100%;height:15em;background-color:#CC8;display:none;">
				<asp:TextBox ID="logPanel" runat="server"  TextMode="MultiLine" style="height:15em"></asp:TextBox>
				
			</div>
		</div>
		<div style="display: none">
			<asp:TextBox ID="H_txApplyNo" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_txWaitExtCert" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_txCSR" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_txID" runat="server" Text=""></asp:TextBox>
			<asp:TextBox ID="H_txMSG" runat="server" Text=""></asp:TextBox>
			<asp:TextBox ID="H_txMima" runat="server" Text=""></asp:TextBox>
			<asp:TextBox ID="H_txStatus" runat="server" Text=""></asp:TextBox>
		</div>
		<div data-role="content" data-theme="a">
			<table style="width: 50%;">
				<tr>
					<td colspan="2">
						<asp:GridView ID="gvCert" runat="server" OnRowCommand="gvCert_RowCommand" AutoGenerateColumns="False" Width="500px" ShowHeaderWhenEmpty="True"
							data-mode="reflow" class="ui-responsive">
							<Columns>
								<asp:ButtonField HeaderText="內容" DataTextField="LINK_NO" CommandName="btApplyNo" ButtonType="Link"  />
								<asp:BoundField HeaderText="申請單號" DataField="APPLY_NO" />
								<asp:BoundField HeaderText="憑證狀態" DataField="TX_STATUS" />
								<asp:BoundField HeaderText="註冊於本機" DataField="IS_REG" Visible="false"/>
								<asp:BoundField HeaderText="申請原因" DataField="REASON" />
							</Columns>
						</asp:GridView>
					</td>
				</tr>
				<tr>
					<td style="text-align: right; width: 100px">
						<asp:Label ID="label1" runat="server" Text="憑證編號：" data-theme="a"></asp:Label>
					</td>
					<td>
						<asp:Label ID="lbApplyNo" runat="server" Text=""></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right">
						<asp:Label ID="label2" runat="server" Text="發給："></asp:Label>
					</td>
					<td>
						<asp:Label ID="lbCerSubject" runat="server" Text=""></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right">
						<asp:Label ID="label3" runat="server" Text="簽發者："></asp:Label>
					</td>
					<td>
						<asp:Label ID="lbCerCA" runat="server" Text=""></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right">
						<asp:Label ID="label4" runat="server" Text="有效期自："></asp:Label>
					</td>
					<td>
						<asp:Label ID="lbStartDate" runat="server" Text=""></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right">
						<asp:Label ID="label5" runat="server" Text="有效期至："></asp:Label>
					</td>
					<td>
						<asp:Label ID="lbExpireDate" runat="server" Text=""></asp:Label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right">
						<asp:Label ID="label6" runat="server" Text="狀態："></asp:Label>
					</td>
					<td>
						<asp:Label ID="lbStatus" runat="server" Text=""></asp:Label>
					</td>
				</tr>
			</table>
		</div>
		<div data-role="footer" data-theme="a">
			<div data-role="controlgroup" data-type="horizontal" class="ui-btn ui-btn-left ui-btn-inline ui-corner-all" style="margin-top: 0px;">
				<%--<asp:Button ID="btDownload" runat="server" Text="下載" ClientIDMode="Static" UseSubmitBehavior="False"/>--%>
				<button id="btDownload" disabled >下載</button>
			</div>
			<h2></h2>
		</div>
	</form>
	<a href="#popupDialog" data-rel="popup" data-position-to="window" id="pupConfirm" data-transition="pop" style="display:none;">pupConfirm</a>
	<a href="#" id="delCert" style="display:none;">刪除憑證</a>
	<a href="#" id="clearLog" style="display:none;">清除Log紀錄</a>
	<div data-role="popup" id="popupDialog" data-overlay-theme="b" data-theme="a" data-dismissible="false">
	    <div role="main" class="ui-content">
	        <h3 class="ui-title" id="popupTitle">請輸入身分證字號</h3>
			<label for="txInfo" class="ui-hidden-accessible" id="lbInfo">身分證字號:</label>
	        <input type="text" name="user" id="txInfo" value="" placeholder="身分證字號" data-theme="c"/>
			<div class="ui-field-contain" data-mini="true">
				<fieldset data-role="controlgroup" data-type="horizontal" >
					<a href="#" id="btPopOK" data-role="button" data-rel="back">確定</a>
				    <a href="#" id="btPopNO" data-role="button" data-rel="back">取消</a>
				</fieldset>
			</div>
	    </div>
	</div>
</body>
</html>
