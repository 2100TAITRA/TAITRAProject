<%@ Page Language="c#" CodeBehind="EAT293.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAT293" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT293 待掃描公文成批作業</title>
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
    <form id="EAT293" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="20px"></asp:ListBox>
            <asp:TextBox ID="txhidden2" runat="server" Width="20px" EnableViewState="False" AutoPostBack="True"></asp:TextBox>
            <asp:TextBox ID="txhidden1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="txhidden4" runat="server" Width="20px" EnableViewState="False" AutoPostBack="True"></asp:TextBox>
            <asp:TextBox ID="txhidden5" runat="server" Width="20px" EnableViewState="False" AutoPostBack="True"></asp:TextBox>
            <asp:TextBox ID="H_SysDate" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbKey" runat="server" CssClass="KeyField">待掃描批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:TextBox ID="txScanNo" onkeyup="jf_CheckFull()" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbStatus" runat="server">狀　　態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
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
                        <asp:Label ID="lbNo" runat="server">編目人員：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <cc1:ComboBox ID="dlMgrNo" runat="server" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="lbDate2" runat="server">編目日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:TextBox ID="txInpfileDateBegin" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">～</asp:Label>
                        <asp:TextBox ID="txInpfileDateEnd" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">時　　間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSTime" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server">～</asp:Label>
                        <asp:TextBox ID="txETime" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
            </div>
            <hr style="width: 62.62%; height: 1px" width="62.62%" size="1">
            <div class="DivTable" id="Table2">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label9" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 26.5em">
                        <asp:TextBox ID="txDocNo" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Button ID="btConfirm" runat="server" Text="確認"></asp:Button>
                        <asp:CheckBox ID="cbAdd" runat="server" Text="讀取後自動加入捲動區" Checked="True"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label20" runat="server">本次新增：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 26.5em">
                        <asp:Label ID="lbLastInsertValue" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Panel ID="tbSelect" runat="server" EnableViewState="False">
                            <asp:Button runat="server" Text="全部選取" ID="btSelectAll" ToolTip="勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="反向選取" ID="btSelectInverse" ToolTip="反向勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="清除選取" ID="btSelectClear" ToolTip="清除勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="刪除選取" ID="btDeleteSelected" ToolTip="將所勾選資料列刪除(可同時多筆)"></asp:Button>
                            <asp:Button runat="server" Text="↑" ID="btUp" ToolTip="將所勾選資料列上移(一次一筆)"></asp:Button>
                            <asp:Button runat="server" Text="↓" ID="btDown" ToolTip="將所勾選資料列下移(一次一筆)"></asp:Button>
                        </asp:Panel>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD" style="height: 108px">
                        <div class="GridDiv" style="height: 7.5em">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
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
                                            <asp:TextBox ID="txTitle" runat="server" Width="15.5em" CssClass="PopUp" ReadOnly="True"></asp:TextBox>
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
            <asp:Button runat="server" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" ToolTip="開啟舊檔(ALT+M)" TabIndex="0"></asp:Button>
            <asp:Button runat="server" Text="成批(B)" DefaultStyle="newmode:block;modifymode:none;" ID="btGroup" AccessKey="B" ToolTip="成批(ALT+B)"></asp:Button>
            <asp:Button runat="server" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave" ToolTip="儲存(ALT+S)"></asp:Button>
            <asp:Button runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean" ToolTip="清除(ALT+Z)"></asp:Button>
            <asp:Button runat="server" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete" ToolTip="刪除(ALT+D)"></asp:Button>
            <asp:Button runat="server" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel" ToolTip="取消(ALT+Z)"></asp:Button>
            <asp:Button runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" ToolTip="查詢(ALT+F)"></asp:Button>
            <asp:Button runat="server" Text="預覽" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview" ToolTip="預覽(ALT+E)"></asp:Button>
            <asp:Button runat="server" CssClass ="hide" Text="列印" DefaultStyle="newmode:none;modifymode:block;" ID="btPrint" ToolTip="列印(ALT+P)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
