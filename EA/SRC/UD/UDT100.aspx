<%@ Page Language="c#" CodeBehind="UDT100.aspx.cs" AutoEventWireup="false" Inherits="UD.UDT100" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>UDT100 特殊媒體歸檔申請作業</title>
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
    <form id="UDT100" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:TextBox ID="txClsKey" runat="server"></asp:TextBox><asp:TextBox ID="txItemNo" runat="server"></asp:TextBox><asp:TextBox ID="txTxStatusNo" runat="server"></asp:TextBox><asp:TextBox ID="txOpenMode" runat="server"></asp:TextBox><asp:TextBox ID="txTransfer" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">申請單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox ID="txApplyNo" TabIndex="0" runat="server" Width="5.5em" CssClass="DisplayOnly" MaxLength="10" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox ID="H_txApplyNo" TabIndex="0" runat="server" Width="5.5em" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbApplyDate" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label8" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbTxStatus" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server" CssClass="RequireField">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" TabIndex="40" runat="server" Width="8em" CssClass="RequireField comboBox" Rows="10"></cc1:ComboBox>
                        <asp:TextBox Style="z-index: 0" ID="H_txDept" runat="server" Width="1em" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label13" runat="server" CssClass="RequireField">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlUser" TabIndex="40" runat="server" Width="7em" CssClass="RequireField comboBox" Rows="10"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbSectName" runat="server" CssClass="RequireField">承辦科別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlSectName" TabIndex="40" runat="server" Width="8em" CssClass="RequireField comboBox" Rows="10"></cc1:ComboBox>
                        <asp:TextBox Style="z-index: 0" ID="H_txSectName" runat="server" Width="1em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label14" runat="server" CssClass="RequireField">名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txItemName" TabIndex="0" runat="server" Width="36.5em" CssClass="RequireField" MaxLength="300"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label15" runat="server" CssClass="RequireField">規格：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txItemFormat" TabIndex="0" runat="server" Width="36.5em" CssClass="RequireField" MaxLength="50"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label16" runat="server" CssClass="RequireField">製作者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox ID="txItemMaker" TabIndex="0" runat="server" Width="15.5em" CssClass="RequireField" MaxLength="60"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label20" runat="server" CssClass="RequireField">製作日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCrtDate" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label17" runat="server" CssClass="RequireField">媒體型式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:DropDownList ID="dlMediaNo" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label21" runat="server" CssClass="RequireField">媒體數量：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCnt" TabIndex="0" runat="server" Width="2em" CssClass="RequireFieldNumeric" MaxLength="4"></asp:TextBox>
                        <asp:DropDownList Style="z-index: 0" ID="dlFileUnit" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server" CssClass="RequireField">分類號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox ID="txFileCls" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton Style="z-index: 0" ID="btClsNo" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label22" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txKeepYear" TabIndex="0" runat="server" Width="1.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label19" runat="server" CssClass="RequireField">內容概要：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txItemDesc" TabIndex="0" runat="server" Width="36.5em" CssClass="RequireField" MaxLength="300" Rows="3" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label23" runat="server">密等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:DropDownList ID="dlSecNo" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label24" runat="server">解密日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRmvsecDate" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label25" runat="server">解密條件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlRmvsecCond" TabIndex="90" runat="server" Width="32.5em" CssClass="comboBox" MaxLength="40">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="本件於公布時解密">本件於公布時解密</asp:ListItem>
                            <asp:ListItem Value="本件至 年 月 日解密">本件至 年 月 日解密</asp:ListItem>
                            <asp:ListItem Value="附件抽存後解密">附件抽存後解密</asp:ListItem>
                            <asp:ListItem Value="其它">其它</asp:ListItem>
                        </cc1:ComboBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label26" runat="server">抽存續辦預計歸檔日期：</asp:Label>
                        <asp:TextBox ID="txAttExtFileDate" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Right"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="抽存">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="附件名稱">
                                <ItemTemplate>
                                    <asp:TextBox ID="txFileDesc" runat="server" Width="25.5em" MaxLength="50"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="媒體形式">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlMediaType" runat="server"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="數量">
                                <ItemTemplate>
                                    <asp:TextBox ID="txCnt" TabIndex="0" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="計量單位">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlUnit" runat="server"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btCheck" runat="server" Text="確認" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btFind" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
