<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT110Right.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT110Right" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT110Right</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT110Right" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
		<asp:TextBox ID="h_OrgNo" runat="server" CssClass="hidden"></asp:TextBox>
        <asp:TextBox ID="h_DeptNo" runat="server" CssClass="hidden"></asp:TextBox>
        <asp:TextBox ID="h_UserId" runat="server" CssClass="hidden"></asp:TextBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:10.5em">
                        <asp:Label ID="Label1" runat="server">年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" runat="server" Width="2em" TabIndex="10" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:TextBox ID="H_No" TabIndex="-1" runat="server" CssClass="hide" Width="13px" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:10.5em">
                        <asp:Label ID="Label2" runat="server">文號使用：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb1" runat="server" Text="單位：" GroupName="gn" TabIndex="15"></asp:RadioButton>
                        <cc1:ComboBox CssClass="comboBox" ID="dlDept" runat="server" Width="7em" TabIndex="20"></cc1:ComboBox>&nbsp;
                        <cc1:ComboBox CssClass="comboBox" ID="dlSubDept" runat="server" Width="7em" TabIndex="20"></cc1:ComboBox><br>
                        <asp:RadioButton ID="rb2" runat="server" Text="下屬機關：" GroupName="gn" TabIndex="25"></asp:RadioButton>
                        <asp:TextBox ID="txOrgno" TabIndex="30" runat="server" Width="5em" MaxLength="17"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txOrgName" TabIndex="-1" runat="server" CssClass="TextLabel" Width="14em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:10.5em">
                        <asp:Label ID="Label3" runat="server">文號區間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDoc" TabIndex="40" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txEDoc" TabIndex="45" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:10.5em">
                        <asp:Label ID="Label4" runat="server">目前已用最大號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMaxSeq" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="4em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:10.5em">
                        <asp:Label ID="Label5" runat="server">創稿文號前置識別碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNoPrefix" TabIndex="-1" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" style="display:none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="放棄" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <div id="hiddenDiv" style="width: 708px; height: 42px">
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_SubDept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_SubDept_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSubDept_Value" runat="server" CssClass="hidden" Width="21px"></asp:TextBox>
            <asp:TextBox ID="txDeptNo" runat="server" CssClass="hidden" Width="21px"></asp:TextBox>
        </div>
    </form>
</body>
</html>
