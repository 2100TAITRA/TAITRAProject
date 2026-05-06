<%@ Page Language="c#" CodeBehind="EDT101.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT101" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT101 郵件登錄作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT101" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 6.5em; visibility: hidden;">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5.5em"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" Width="80px"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" Width="80px"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <asp:TextBox Style="z-index: 0" ID="H_RcvArea" runat="server" CssClass="hide"></asp:TextBox>
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">郵件編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMailNo" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server" CssClass="KeyField">(自動編號)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">登錄日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcv_date" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">登錄時間：</asp:Label>
                        <asp:TextBox ID="txRcv_time" TabIndex="0" runat="server" Width="3.5em" CssClass="InputFieldNumeric" MaxLength="6"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div style="width: 8em" class="dTDTitle">
                        <asp:Label Style="z-index: 0" ID="Label10" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txFromOrg" runat="server" Width="15.5em" MaxLength="50"></asp:TextBox>
                        <asp:ImageButton ID="btSearchGrp" runat="server" ImageUrl="../IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Button ID="btInsertDesc" runat="server" Text="加入備註"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">收件單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDept" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="50"></asp:TextBox>
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label7" runat="server">掛號號碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRegNo" runat="server" Width="15.5em" MaxLength="30"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="tRcvArea">
                    <div style="width: 8em" class="dTDTitle">
                        <asp:Label Style="z-index: 0" ID="lbRcvArea" runat="server" CssClass="hide">收件地區：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlRcvArea" runat="server" CssClass="hide"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" align="right" style="width: 8em">
                        <asp:Label ID="Label4" runat="server">收件人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUser" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:DropDownList ID="dlUser" runat="server" Width="5.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label6" runat="server">郵件類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rblMailType" runat="server" RepeatDirection="Horizontal"></asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label8" runat="server">備註：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" runat="server" TextMode="MultiLine" Width="20.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:TextBox ID="H_txUserName" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSendEmail" runat="server" Text="寄送E-MAIL" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
