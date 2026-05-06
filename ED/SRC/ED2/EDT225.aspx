<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT225.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT225" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT225 會稿單位設定子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	<link rel="stylesheet" href="../EDLIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
</head>
<body ms_positioning="GridLayout">
    <form id="EDT225" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
			<asp:TextBox ID="txMode" TabIndex="0" runat="server"></asp:TextBox>
            <asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTD" id="Dept" style="width: 16em">
					<div class="dTR">
						<asp:Button ID="btAddDept" runat="server" Text="加入"></asp:Button>
					</div>
					<div class="dTR" Style="Height: 20em; width: 15em">
						<div class="dTD">
							<div class="GridDiv" style="Height:18em;max-width: 15em; min-width: unset">
								<Div id="Data">
									<ul id="Classtree" class="ztree"></ul>
								</DIV>
							</DIV>
						</DIV>
				    </div>
				</div>
                <div class="dTD" id="Flow">
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em">
							<asp:Label ID="Label1" runat="server">會辦詞彙：</asp:Label>
						</div>
						<div class="dTD">
							<asp:DropDownList ID="dlCoworkWord" runat="server"></asp:DropDownList>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em">
							<asp:Label ID="Label2" runat="server">自行輸入：</asp:Label>
						</div>
						<div class="dTD DgSelectToolBar">
							<asp:TextBox ID="txCustom" runat="server" Width="10em"></asp:TextBox>
							<asp:Button ID="btAddCustom" runat="server" Text="加入"></asp:Button>
						</div>
					</div>
					<div class="dTR">
						<div class="DivTable DgSelectToolBar" id="GridTable">
							<asp:Button ID="btDgSelectAll" runat="server" Text="全選"></asp:Button>
							<asp:Button ID="btDgInverse" runat="server" Text="反選"></asp:Button>
							<asp:Button ID="btDgDelete" runat="server" Text="刪除"></asp:Button>
							<asp:Button ID="btDgMoveUp" runat="server" Text="上移"></asp:Button>
							<asp:Button ID="btDgMoveDown" runat="server" Text="下移"></asp:Button>
							<div class="GridDiv" style="overflow: auto;">
								<table id="dg1" border="1" runat="server" autogeneratecolumns="False" gridlines="Vertical" headerstyle-horizontalalign="Center" itemstyle-horizontalalign="Center"
									style="color: Black; background-color: White; border-color: #DEDFDE; border-width: 1px; border-style: None; border-collapse: collapse;">
									<tbody>
										<tr>
											<td style="width: 1.5em">選</td>
											<td style="width: 20.5em">會稿單位</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="儲存" AccessKey="S" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:block;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
<script type="text/javascript" src="../EDLIB/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="../EDLIB/jquery.ztree.exhide-3.5.js"></script>
<script type="text/javascript" src="../EDLIB/jquery.ztree.excheck.js"></script>
</html>
