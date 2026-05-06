<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT104.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT104" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT104 郵件登錄作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDT104" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden" Width="21px"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbMailSeq" runat="server" CssClass="KeyField">郵件編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txMailSeq" TabIndex="0" runat="server" Width="4em" CssClass="KeyFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0" ID="lbMailTypeNo" runat="server" CssClass="RequireField">郵件類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlMailTypeNo" runat="server" Width="7.5em" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbRcvDate" runat="server" CssClass="RequireField">收件日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox Style="z-index: 0" ID="txRcvDate" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:DropDownList Style="z-index: 0" ID="dlRcvTimeH" runat="server" CssClass="RequireField"></asp:DropDownList>
                        <asp:DropDownList Style="z-index: 0" ID="dlRcvTimeM" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0" ID="lbPlanCloseData" runat="server" CssClass="RequireField">預定結案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txPlanCloseData" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:DropDownList Style="z-index: 0" ID="dlPlanCloseTimeH" runat="server" CssClass="RequireField"></asp:DropDownList>
                        <asp:DropDownList Style="z-index: 0" ID="dlPlanCloseTimeM" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbMailSender" runat="server" CssClass="RequireField">發信人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txMailSender" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="100"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0" ID="lbMailSenderAddress" runat="server" CssClass="RequireField">電子郵件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txMailSenderAddress" TabIndex="0" runat="server" Width="18em" CssClass="RequireField" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbMailSendDate" runat="server">發信日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox Style="z-index: 0" ID="txMailSendDate" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:DropDownList Style="z-index: 0" ID="dlMailSendTimeH" runat="server"></asp:DropDownList>
                        <asp:DropDownList Style="z-index: 0" ID="dlMailSendTimeM" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0" ID="lbCloseDate" runat="server">實際結案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txCloseDate" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:DropDownList Style="z-index: 0" ID="dlCloseTimeH" runat="server"></asp:DropDownList>
                        <asp:DropDownList Style="z-index: 0" ID="dlCloseTimeM" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbSubject" runat="server" CssClass="RequireField">案由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox Style="z-index: 0" ID="txSubject" TabIndex="0" runat="server" Width="17.5em" CssClass="RequireField" MaxLength="120"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0" ID="lbWorkDate" runat="server">實際處理時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txWorkDate" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" MaxLength="20"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="H_UseDay" runat="server" Width="1.5em" CssClass="hidden"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbDept" runat="server" CssClass="RequireField">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" TabIndex="40" runat="server" Width="7.5em" CssClass="comboBox RequireField" Rows="10"></cc1:ComboBox>
                        <cc1:ComboBox Style="z-index: 0" ID="dlSect" TabIndex="40" runat="server" Width="7.5em" CssClass="comboBox RequireField" Rows="10"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0" ID="lbUser" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlUser" TabIndex="40" runat="server" Width="7.5em" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbWorkType" runat="server">處理情形：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:DropDownList Style="z-index: 0" ID="dlWorkType" runat="server" Width="7.5em"></asp:DropDownList>
                        <asp:TextBox Style="z-index: 0" ID="txWorkType" TabIndex="0" runat="server" Width="7.5em" MaxLength="200"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0" ID="lbCloseType" runat="server" CssClass="RequireField">結案別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton Style="z-index: 0" ID="rbCloseType0" runat="server" Width="4em" GroupName="rbGroup1" Checked="True" Text="發文" CssClass="RequireField"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbCloseType1" runat="server" Width="4em" GroupName="rbGroup1" Text="存查" CssClass="RequireField"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbDeleyReason" runat="server">展延理由：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txDeleyReason" TabIndex="0" runat="server" Width="44.5em" MaxLength="200"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbMailDesc" runat="server">備註：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txMailDesc" TabIndex="0" runat="server" Width="44.5em" MaxLength="200"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbDocNo" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txDocNo" TabIndex="0" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                        <asp:Button Style="z-index: 0" ID="btDocNo" runat="server" Width="3.5em" Text="帶回"></asp:Button>
                    </div>
                </div>
            </div>
            <asp:TextBox Style="z-index: 0" ID="H_OrgNo" runat="server" Width="2.5em" CssClass="hidden"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
