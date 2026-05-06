<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="UDT101.aspx.cs" AutoEventWireup="false" Inherits="UD.UDT101" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>UDT101 特殊媒體歸檔申請審核作業</title>
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
    <form id="UDT101" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:TextBox ID="empUserId" runat="server"></asp:TextBox><asp:TextBox ID="txClsKey" runat="server"></asp:TextBox>
            <asp:TextBox ID="h_Rolename" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">申請單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox ID="txApplyNo" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
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
                        <asp:Label ID="Label10" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox Style="z-index: 0" ID="txDept" TabIndex="0" runat="server" Width="8em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label13" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txUser" TabIndex="0" runat="server" Width="7em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="Label3" runat="server">承辦科別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txSectName" TabIndex="0" runat="server" Width="8em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label14" runat="server">名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txItemName" TabIndex="0" runat="server" Width="36.5em" CssClass="DisplayOnly" MaxLength="300" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label15" runat="server">規格：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txItemFormat" TabIndex="0" runat="server" Width="36.5em" CssClass="DisplayOnly" MaxLength="300" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label16" runat="server">製作者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox ID="txItemMaker" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label20" runat="server">製作日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCrtDate" TabIndex="0" runat="server" Width="4em" CssClass="DisplayOnly InputFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label17" runat="server">媒體型式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:DropDownList ID="dlMediaNo" runat="server" CssClass="hide"></asp:DropDownList>
                        <asp:TextBox Style="z-index: 0" ID="txMediaNo" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label21" runat="server">媒體數量：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCnt" TabIndex="0" runat="server" Width="3em" CssClass="DisplayOnly InputFieldNumeric" MaxLength="4"></asp:TextBox>
                        <asp:DropDownList Style="z-index: 0" ID="dlFileUnit" runat="server" CssClass="hide"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox ID="txFileCls" TabIndex="0" runat="server" Width="10.5em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
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
                        <asp:Label ID="Label19" runat="server">內容概要：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txItemDesc" TabIndex="0" runat="server" Width="36.5em" CssClass="DisplayOnly" MaxLength="300" ReadOnly="True" TextMode="MultiLine" Rows="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label23" runat="server">密等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:DropDownList ID="dlSecNo" runat="server" CssClass="hide">
                            <asp:ListItem Value="1">普通</asp:ListItem>
                            <asp:ListItem Value="2">密</asp:ListItem>
                            <asp:ListItem Value="3">機密</asp:ListItem>
                            <asp:ListItem Value="4">極機密</asp:ListItem>
                            <asp:ListItem Value="5">絕對機密</asp:ListItem>
                        </asp:DropDownList>
                        <asp:TextBox Style="z-index: 0" ID="txSecNo" TabIndex="0" runat="server" Width="4.5em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label24" runat="server">解密日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRmvsecDate" TabIndex="0" runat="server" Width="4em" CssClass="DisplayOnly InputFieldNumeric" MaxLength="7" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label25" runat="server">解密條件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txRmvsecCond" TabIndex="0" runat="server" Width="32.5em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label26" runat="server">抽存續辦預計歸檔日期：</asp:Label>
                        <asp:TextBox ID="txAttExtFileDate" TabIndex="0" runat="server" Width="4em" CssClass="DisplayOnly InputFieldNumeric" MaxLength="7" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" Width="40.5em" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="5">
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
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server" Enabled="False"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="附件名稱">
                                <ItemTemplate>
                                    <asp:TextBox ID="txFileDesc" runat="server" Width="25.5em" CssClass="DisplayOnly" MaxLength="50" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="媒體形式">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlMediaType" runat="server" CssClass="DisplayOnly" Enabled="False"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="數量">
                                <ItemTemplate>
                                    <asp:TextBox ID="txCnt" TabIndex="0" runat="server" Width="2.5em" CssClass="DisplayOnly" MaxLength="4" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="計量單位">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlUnit" runat="server" CssClass="DisplayOnly" Enabled="False"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label2" runat="server">審核意見：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList Style="z-index: 0" ID="dlPhraseNo" TabIndex="5" runat="server" Width="9.5em"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                        <div class="dTD">
                            <asp:TextBox Style="z-index: 0" ID="txDesc" TabIndex="10" runat="server" Width="36.5em" MaxLength="200"></asp:TextBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btCommit" runat="server" Text="核准" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btReject" runat="server" Text="退回" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
