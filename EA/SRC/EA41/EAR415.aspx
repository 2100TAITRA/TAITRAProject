<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR415.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAR415" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR415 清理異常清單預覽列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
</head>
<body ms_positioning="GridLayout">
    <form id="EAR415" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbSamplingNo" runat="server">抽樣編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSamplingNoS" TabIndex="0" runat="server" Width="6em" CssClass="InputFieldNumeric" MaxLength="11"></asp:TextBox>～
                        <asp:TextBox ID="txSamplingNoE" TabIndex="0" runat="server" Width="6em" CssClass="InputFieldNumeric" MaxLength="11"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbDocNo" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>～
                        <asp:TextBox ID="txDocNoE" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbSamplingUser" runat="server">登錄人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSamplingUser" TabIndex="6" runat="server" Width="5.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbErrType" runat="server">異常原因：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbErrType1" runat="server" Text="線上瀏覽錯誤"></asp:CheckBox>
                        <asp:CheckBox ID="cbErrType2" runat="server" Text="數位內容檢測軟體測試異常"></asp:CheckBox>
                        <asp:CheckBox ID="cbErrTypeZ" runat="server" Text="其他"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbErrProc" runat="server">處置措施：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbErrProc1" runat="server" Text="處理中"></asp:CheckBox>
                        <asp:CheckBox ID="cbErrProc2" runat="server" Text="由備份倒回"></asp:CheckBox>
                        <asp:CheckBox ID="cbErrProc3" runat="server" Text="重新掃描"></asp:CheckBox></br>
                        <asp:CheckBox ID="cbErrProc4" runat="server" Text="轉為紙本公文"></asp:CheckBox>
                        <asp:CheckBox ID="cbErrProc5" runat="server" Text="無法修復，銷毀處理"></asp:CheckBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button Text="預覽" runat="server" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview" AccessKey="E" ToolTip="預覽(ALT+E)"></asp:Button>
            <asp:Button Text="列印" runat="server" CssClass=" hide" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint" AccessKey="P" ToolTip="列印(ALT+P)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
