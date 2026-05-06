<%@ Page Language="c#" CodeBehind="ODT386.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT386" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT386 郵資機使用紀錄表設定及列印作業</title>
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
    <form id="ODT386" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MTable1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label class="RequireField" ID="Label2" runat="server">郵寄日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:TextBox ID="txDate" CssClass="RequireFieldNumeric" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">郵寄時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSTime" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">－</asp:Label>
                        <asp:TextBox ID="txETime" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:DropDownList ID="dlTime" runat="server" Width="125px"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label class="RequireField" ID="Label1" runat="server">郵資機使用編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:TextBox ID="txPostSeq" runat="server" Width="7em" MaxLength="13"></asp:TextBox>
                    </div>
                </div>
                <asp:Panel ID="P1" runat="server">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8.5em;min-height: 1px;">
                        </div>
                        <div class="dTD" style="width: 6em">
                            <asp:Label ID="Label10" runat="server">遞增數</asp:Label>
                        </div>
                        <div class="dTD" style="width: 6em">
                            <asp:Label ID="Label11" runat="server">遞減數</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:Label ID="Label12" runat="server">合　計</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8.5em">
                            <asp:Label ID="Label3" runat="server">前次紀錄：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txLastProg" TabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="10" Width="5.5em" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
                            <asp:TextBox ID="txLastDiminish" TabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="10" Width="5.5em" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
                            <asp:TextBox ID="txLastTotal" TabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="10" Width="5.5em" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8.5em">
                            <asp:Label ID="Label4" runat="server">本次異動：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txThisProg" runat="server" MaxLength="10" Width="5.5em"></asp:TextBox>
                            <asp:TextBox ID="txThisDiminish" TabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="10" Width="5.5em" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
                            <asp:TextBox ID="txThisTotal" TabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="10" Width="5.5em" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8.5em">
                            <asp:Label ID="Label5" runat="server">使用數字：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txUseCnt" TabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="10" Width="5.5em" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8.5em">
                            <asp:Label ID="Label6" runat="server">註銷數字：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txCancelCnt" TabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="10" Width="5.5em" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8.5em">
                            <asp:Label ID="Label8" runat="server">實際使用數字：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txRealCnt" TabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="10" Width="5.5em" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8.5em">
                            <asp:Label ID="Label13" runat="server">撥置郵資：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txPostCost" runat="server" MaxLength="10" Width="5.5em"></asp:TextBox>
                        </div>
                    </div>
                </asp:Panel>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="成批" DefaultStyle="newmode:block;modifymode:none;" ID="btBatch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="搜索" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:none;modifymode:block;" ID="btPrint"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
