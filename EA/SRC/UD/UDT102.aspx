<%@ Page Language="c#" CodeBehind="UDT102.aspx.cs" AutoEventWireup="false" Inherits="UD.UDT102" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>UDT102 特殊媒體歸檔申請登錄作業</title>
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
    <form id="UDI102" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->

        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:TextBox ID="txTransfer" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">特殊媒體編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em">
                        <asp:TextBox ID="txItemNo" TabIndex="0" runat="server" Width="4.5em" CssClass="KeyUpperField" MaxLength="8"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label13" runat="server" CssClass="KeyField">申請單號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyNo" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbTxStatus" runat="server" CssClass="RequireField"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em">
                        <cc1:ComboBox ID="dlDept" TabIndex="110" runat="server" CssClass="RequireField comboBox" MaxLength="40"></cc1:ComboBox>
                        <asp:TextBox ID="H_dlDept_Text" runat="server" Width="4em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_dlDept_Value" runat="server" Width="4em" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label14" runat="server" CssClass="RequireField">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="110" runat="server" Width="7em" CssClass="RequireField comboBox" MaxLength="40"></cc1:ComboBox>
                        <asp:TextBox ID="H_dlUser_Value" runat="server" Width="4em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label Style="z-index: 0" ID="lbSectName" runat="server" CssClass="RequireField">承辦科別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlSectName" TabIndex="110" runat="server" CssClass="RequireField comboBox" MaxLength="40"></cc1:ComboBox>
                        <asp:TextBox Style="z-index: 0" ID="H_txSectName" runat="server" Width="1em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txItemName" TabIndex="0" runat="server" Width="31em" CssClass="RequireField" MaxLength="300"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">規格：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txItemFormat" TabIndex="0" runat="server" Width="31em" CssClass="RequireField" MaxLength="50"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server" CssClass="RequireField">製作者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em">
                        <asp:TextBox ID="txItemMaker" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="60"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label15" runat="server" Width="5em" CssClass="RequireField">製作日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCrtDate" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label7" runat="server" CssClass="RequireField">媒體型式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em">
                        <asp:DropDownList ID="dlMediaNo" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label16" runat="server" CssClass="RequireField">媒體數量：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCnt" TabIndex="0" runat="server" Width="2.5em" CssClass="RequireFieldNumeric" MaxLength="4"></asp:TextBox><asp:DropDownList ID="dlFileUnit" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server" CssClass="RequireField">分類號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em">
                        <asp:TextBox ID="txFileCls" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btClsNo" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txClsKey" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label17" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txKeepYear" TabIndex="0" runat="server" Width="1.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label9" runat="server" CssClass="RequireField">內容概要：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txItemDesc" TabIndex="0" runat="server" Width="32.5em" CssClass="RequireField" MaxLength="300" Rows="3" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label12" runat="server">密等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em">
                        <asp:DropDownList ID="dlSecNo" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server" Width="5em">解密日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRmvsecDate" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label11" runat="server">解密條件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlRmvsecCond" TabIndex="90" runat="server" Width="31.5em" CssClass="comboBox" MaxLength="40">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="本件於公布時解密">本件於公布時解密</asp:ListItem>
                            <asp:ListItem Value="本件至 年 月 日解密">本件至 年 月 日解密</asp:ListItem>
                            <asp:ListItem Value="附件抽存後解密">附件抽存後解密</asp:ListItem>
                            <asp:ListItem Value="其它">其它</asp:ListItem>
                        </cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label10" runat="server" CssClass="RequireField">核決者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em">
                        <asp:DropDownList ID="dlAppUser" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label19" runat="server" Width="5em" CssClass="RequireField">核決日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAdate" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label21" runat="server">抽存續辦預計歸檔日期：</asp:Label>
                        <asp:TextBox ID="txAttExtFileDate" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="15">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
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
                            <asp:TemplateColumn HeaderText="媒體型式">
                                <ItemTemplate>
                                    <asp:DropDownList Style="z-index: 0" ID="dlMediaType" runat="server"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="數量">
                                <HeaderStyle Wrap="False"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox Style="z-index: 0" ID="txCnt" TabIndex="0" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="計量單位">
                                <ItemTemplate>
                                    <asp:DropDownList Style="z-index: 0" ID="dlUnit" runat="server"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btCheck" runat="server" Text="確認" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
