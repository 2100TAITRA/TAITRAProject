<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKR210.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR210" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR210 逾期未歸檔案稽催單 </title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKR210" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:TextBox ID="h_SpDeptlist" runat="server" CssClass="hide"></asp:TextBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label1" TabIndex="-1" runat="server">列印處室：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUnit" TabIndex="10" runat="server" Width="9em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label2" TabIndex="-1" runat="server">文(編)號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="20" runat="server"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label6" TabIndex="-1" runat="server">稽催日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbDATES" TabIndex="30" runat="server" Width="3.5em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server" ForeColor="Black">－</asp:Label>
                        <asp:TextBox ID="tbDATEE" TabIndex="40" runat="server" Width="3.5em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label10" TabIndex="-1" runat="server">辦畢日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCloseSDate" TabIndex="50" runat="server" Width="3.5em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label12" runat="server" ForeColor="Black">－</asp:Label>
                        <asp:TextBox ID="txCloseEDate" TabIndex="60" runat="server" Width="3.5em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label13" TabIndex="-1" runat="server">密等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSec" TabIndex="60" runat="server" Width="5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label7" TabIndex="-1" runat="server">逾期天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDay" Style="text-align: right" TabIndex="70" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">天─</asp:Label>
                        <asp:TextBox ID="txEDay" Style="text-align: right" TabIndex="80" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">天</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label3" TabIndex="-1" runat="server">稽催單分頁方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDept" TabIndex="90" runat="server" Text="一級" GroupName="GN"></asp:RadioButton><asp:RadioButton ID="rbSect" TabIndex="93" runat="server" Text="二級" GroupName="GN"></asp:RadioButton><asp:RadioButton ID="rbUser" TabIndex="96" runat="server" Text="個人" GroupName="GN"></asp:RadioButton>
                    </div>
                </div>
				<fieldset style="width: 27em; height: 3.5em">
					<legend>稽催範圍</legend>
					<div id="Table1" class="DivTable">
						<div class="dTR">
							<div class="dTD">
								<asp:RadioButton ID="rbBellow5" runat="server" Width="3.5em" Text="稽催" GroupName="grp"></asp:RadioButton>
								<asp:TextBox ID="txNum1" runat="server" CssClass="TextLabel" Width="1em"></asp:TextBox>
								<asp:Label ID="Label4" runat="server" Width="6em">次(不含)以下</asp:Label>
								<asp:RadioButton ID="rbOver5" runat="server" Width="3.5em" Text="稽催" GroupName="grp"></asp:RadioButton>
								<asp:TextBox ID="txNum2" runat="server" CssClass="TextLabel" Width="1em"></asp:TextBox>
								<asp:Label ID="Label5" runat="server" Width="5em">次(含)以上</asp:Label>&nbsp;&nbsp;
								<asp:RadioButton ID="rbAll" runat="server" Width="4em" Text="全部" GroupName="grp"></asp:RadioButton>&nbsp;&nbsp;&nbsp;&nbsp;
							</div>
						</div>
					</div>
				</fieldset>
				<p>
					<asp:CheckBox ID="cbFM" runat="server" Width="15em" Text="依檔管局建議的報表格式輸出"></asp:CheckBox>
				</p>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50"></asp:DataGrid>
                </div>
                <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="逾期未歸稽催單(P)" Accesskey = "P" Title = "逾期未歸稽催單(ALT+P)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="逾期未歸清單(O)" Accesskey = "O" Title = "逾期未歸清單(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出逾期未歸檔稽催單Excel(L)" Accesskey = "L" Title = "匯出逾期未歸檔稽催單Excel(ALT+L)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
