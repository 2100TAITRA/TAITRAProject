<%@ Page Language="c#" CodeBehind="EAT290.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAT290" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT290 待掃描公文成批作業</title>
    <meta content="True" name="vs_showGrid">
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
    <form id="EAT290" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="20px"></asp:ListBox>
            <asp:TextBox ID="txhidden2" runat="server" Width="20px" EnableViewState="False" AutoPostBack="True"></asp:TextBox>
            <asp:TextBox ID="txhidden1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="txhidden4" runat="server" Width="20px" EnableViewState="False"></asp:TextBox>
            <asp:TextBox ID="txhidden5" runat="server" Width="20px" EnableViewState="False" AutoPostBack="True"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTD" align="right" style="width: 126px">
                        <asp:Label ID="lbKey" runat="server" CssClass="KeyField">待掃描批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txScanNo" onkeyup="jf_CheckFull()" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbStatus" runat="server">狀　　態：</asp:Label>
                        <asp:Label ID="lbStatus2" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
            <hr style="width: 62.62%; height: 1px" width="62.62%" size="1">
            <div class="DivTable" id="Table1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbSearch" runat="server">搜尋條件設定：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Button ID="btSearch2" runat="server" Text="公文查詢"></asp:Button>
                        <asp:CheckBox ID="cbClean" runat="server" Checked="True" Text="不清除捲動區資料" TabIndex="0"></asp:CheckBox>
                        <asp:CheckBox ID="cbList" runat="server" Text="已成批公文不列出" TabIndex="0" Checked="True"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbNo" runat="server">點收批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAcpNoBegin" runat="server" Width="6em"></asp:TextBox>
                        <asp:Label ID="lb" runat="server">～</asp:Label>
                        <asp:TextBox ID="txAcpNoEnd" runat="server" Width="6em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbDate1" runat="server">點收日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileDateBegin" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">～</asp:Label>
                        <asp:TextBox ID="txFileDateEnd" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbDate2" runat="server">編目日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txInpfileDateBegin" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">～</asp:Label>
                        <asp:TextBox ID="txInpfileDateEnd" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbUnit" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="ddlUnit" runat="server" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbFileNo" runat="server">檔　　號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server">－</asp:Label>
                        <asp:TextBox ID="txCls" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">－</asp:Label>
                        <asp:TextBox ID="txCase" runat="server" Width="6.5em" MaxLength="12"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">－</asp:Label>
                        <asp:TextBox ID="txVol" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">－</asp:Label>
                        <asp:TextBox ID="txSeq" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
            </div>
            <hr style="width: 62.62%; height: 1px" width="62.62%" size="1">
            <div class="DivTable" id="Table2">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label9" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Button ID="btConfirm" runat="server" Text="確認"></asp:Button>
                        <asp:CheckBox ID="cbAdd" runat="server" Text="讀取後自動加入捲動區" Checked="True"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label20" runat="server">本次新增：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div style="width: 26.5em; height: 2.5em; overflow: auto">
                            <asp:Label ID="lbLastInsertValue" runat="server"></asp:Label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Panel ID="tbSelect" runat="server" EnableViewState="False" CssClass="DgSelectToolBar">
                            <asp:Button runat="server" Text="全部選取" ID="btSelectAll" Title="勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="反向選取" ID="btSelectInverse" Title="反向勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="清除選取" ID="btSelectClear" Title="清除勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="刪除選取" ID="btDeleteSelected" Title="將所勾選資料列刪除(可同時多筆)"></asp:Button>
                            <asp:Button runat="server" Text="↑" ID="btUp" Title="將所勾選資料列上移(一次一筆)"></asp:Button>
                            <asp:Button runat="server" Text="↓" ID="btDown" Title="將所勾選資料列下移(一次一筆)"></asp:Button>
                        </asp:Panel>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 15.5em">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txTitle" runat="server" Width="14.5em" CssClass="PopUp" ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="待掃描批號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbScanNo" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V3_GenericBannerToolBar">
            <asp:Button Text="開啟" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="0"></asp:Button>
            <asp:Button Text="成批(B)" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btGroup" AccessKey="B" Title="成批(ALT+B)"></asp:Button>
            <asp:Button Text="儲存" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button Text="清除" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button Text="刪除" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button Text="取消" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button Text="查詢" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button Text="預覽" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button Text="列印" runat="server" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
