<%@ Page Language="c#" CodeBehind="EDT260.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT260" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT260 紙本附件歸檔作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT260" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:DropDownList ID="dlAppUser2" runat="server"></asp:DropDownList>
            <asp:TextBox ID="txOU_ID" runat="server" CssClass="DisplayOnly"></asp:TextBox>
            <asp:TextBox ID="AllCanOpen" runat="server">false</asp:TextBox>
            <asp:TextBox ID="CanOpenDeptList" runat="server">;</asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txDocNo" runat="server" Width="6.5em" CssClass="KeyUpperField" MaxLength="15"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">免歸檔核決者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlAppUser" runat="server" Enabled="False"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label6" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txFileCls" runat="server" Width="7.5em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label9" runat="server">狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocState" runat="server" Width="10.5em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txDept" runat="server" Width="7.5em" CssClass="DisplayOnly"></asp:TextBox>
                        <asp:TextBox ID="txSect" runat="server" Width="7.5em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUser" runat="server" Width="10.5em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" runat="server" Width="36em" CssClass="DisplayOnly" Height="3.5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 18.5em">
                        <asp:TextBox ID="txCloseDate" runat="server" Width="4em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server">應歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExtFileDate" runat="server" Width="4em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:CheckBox ID="cbNoAttAch" runat="server" Text="無紙本附件"></asp:CheckBox>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    <asp:Label ID="lbAttSeqNo" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="附件來源">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlAttSource" runat="server">
                                        <asp:ListItem></asp:ListItem>
                                        <asp:ListItem Value="1">來文</asp:ListItem>
                                        <asp:ListItem Value="2">稿</asp:ListItem>
                                    </asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="附件名稱">
                                <ItemTemplate>
                                    <asp:TextBox ID="tbDESC" runat="server" Width="14.5em" MaxLength="50"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="媒體型式">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlREM" runat="server" Width="5.5em"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="數量">
                                <ItemTemplate>
                                    <asp:TextBox ID="tbCNT" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="計量單位">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlUNIT" runat="server" Width="3.5em"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Text="增加附件筆數(A)" DefaultStyle="newmode:none;modifymode:block;" ID="btAddColumn" AccessKey="A" ToolTip="增加附件筆數(ALT+A)"></asp:Button>
            <asp:Button runat="server" Text="歸檔(T)" DefaultStyle="newmode:none;modifymode:block;" ID="btSend" AccessKey="T" ToolTip="歸檔(ALT+T)"></asp:Button>
            <asp:Button runat="server" Text="註紀免歸檔(D)" DefaultStyle="newmode:none;modifymode:block;" ID="btMark" AccessKey="D" ToolTip="註紀免歸檔(ALT+D)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
