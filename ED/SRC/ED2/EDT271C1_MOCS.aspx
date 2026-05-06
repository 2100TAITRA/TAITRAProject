<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT271C1_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT271C1_MOCS" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT271C1_MOCS 擬辦設定子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT271C1_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
			<asp:TextBox ID="txAppSelectType" runat="server"></asp:TextBox>
			<asp:TextBox ID="txAppUserId" runat="server"></asp:TextBox>
			<asp:TextBox ID="txAppRoleId" runat="server"></asp:TextBox>
			<asp:TextBox ID="txAppName" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MTable1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">核決者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlApply" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server">核決時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppDate" runat="server" Width="4em" MaxLength="7" CssClass ="DatePicker"></asp:TextBox>
                        <asp:TextBox ID="txAppTime" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
				<div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label4" runat="server">發文設定：</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:RadioButton ID="rbNone" runat="server" Text="不異動" GroupName="IssueType"></asp:RadioButton>
						<asp:RadioButton ID="rbOrg" runat="server" Text="總發文" GroupName="IssueType"></asp:RadioButton>
                        <asp:RadioButton ID="rbUnit" runat="server" Text="單位發文" GroupName="IssueType"></asp:RadioButton>
						<asp:RadioButton ID="rbSave" runat="server" Text="存查" GroupName="IssueType"></asp:RadioButton>
                    </div>
                </div>
				<div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label5" runat="server">歸檔類型：</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:RadioButton ID="rbNoneStore" runat="server" Text="不異動" GroupName="StoreType"></asp:RadioButton>
						<asp:RadioButton ID="rbOrgStore" runat="server" Text="機關庫房 " GroupName="StoreType"></asp:RadioButton>
						<asp:RadioButton ID="rbUnitStore" runat="server" Text="單位庫房" GroupName="StoreType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server">檔案數量：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCnt" runat="server" Width="4em"></asp:TextBox>
                        <asp:DropDownList ID="dlFileUnit" runat="server"></asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
