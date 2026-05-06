<%@ Page Language="c#" CodeBehind="EAR414.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAR414" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR414檔案清查結果報告書列印作業</title>
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
    <form id="EAR414" onkeyup="jf_CheckFull();" method="post" runat="server">
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
                    <div class="dTDTitle">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanNo" TabIndex="10" runat="server" Width="4.5em" MaxLength="8" CssClass="RequireField"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="15" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <fieldset style="width: 35.5em">
                    <legend>註記資料設定</legend>
                    <div class="DivTable" id="Table1">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label5" runat="server">清查原因：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txPlanDesc" TabIndex="10" runat="server" Width="28.5em" MaxLength="100"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label6" runat="server">清查時間：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txPlanDate" TabIndex="10" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7" ReadOnly="True" BackColor="Gainsboro"></asp:TextBox>－
								<asp:TextBox ID="txPlanEntryDate" TabIndex="10" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label7" runat="server">清查範圍：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txFileNo" TabIndex="10" runat="server" Width="13.5em" MaxLength="30"></asp:TextBox>
                                <asp:TextBox ID="txRange" TabIndex="10" runat="server" Width="14.5em" MaxLength="100"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label8" runat="server">清查數量：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txCount" TabIndex="10" runat="server" Width="15.5em" MaxLength="30"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label4" runat="server">清查狀況：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txPlanCondition" TabIndex="8" runat="server" Width="28.5em" MaxLength="300" TextMode="MultiLine" Rows="3" CssClass="InputEnUpperField"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label1" runat="server">附件：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txPlanAttach" TabIndex="8" runat="server" Width="28.5em" MaxLength="300" TextMode="MultiLine" Rows="3" CssClass="InputEnUpperField"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label3" runat="server">建議事項：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txPlanRecommand" TabIndex="8" runat="server" Width="28.5em" MaxLength="300" TextMode="MultiLine" Rows="3" CssClass="InputEnUpperField"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:none;modifymode:block;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出Excel" DefaultStyle="newmode:none;modifymode:block;" ID="btExcel" />
            <asp:Button runat="server" Style="display: none" Text="匯出ODS" DefaultStyle="newmode:none;modifymode:block;" ID="btODS" />
        </asp:Panel>
    </form>
</body>
</html>
