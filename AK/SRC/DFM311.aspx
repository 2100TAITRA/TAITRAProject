<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="DFM311.aspx.cs" AutoEventWireup="false" Inherits="DF.DFM311" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>DFM311 儲存區維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="DFM311" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">伺服機編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="KeyUpperField" ID="txSrvNo" TabIndex="10" runat="server" Width="2em" MaxLength="2">12</asp:TextBox>
                        <asp:ImageButton ID="btSrvNo" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="txSrvName" runat="server" TabIndex="-1" Width="19.5em" ReadOnly="True"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">儲存區目錄名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txStoragePath" TabIndex="20" runat="server" Width="6.5em" MaxLength="40" CssClass="RequireField"></asp:TextBox>
                        <asp:ImageButton ID="btStoragePath" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">儲存區種類：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUseType" TabIndex="30" runat="server" CssClass="RequireField" Width="14.5em">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="01">待匯入暫存區(日常電子檔案匯入)</asp:ListItem>
                            <asp:ListItem Value="02">歸檔掃描暫存區</asp:ListItem>
                            <asp:ListItem Value="03">正版蒐集確認區</asp:ListItem>
                            <asp:ListItem Value="04">副版蒐集確認區</asp:ListItem>
                            <asp:ListItem Value="05">正版正式儲存區</asp:ListItem>
                            <asp:ListItem Value="06">副版正式儲存區</asp:ListItem>
                            <asp:ListItem Value="07">電子交換網路共用區</asp:ListItem>
                            <asp:ListItem Value="08">線上簽核網路共用區</asp:ListItem>
                            <asp:ListItem Value="09">公文製作網路共用區</asp:ListItem>
                            <asp:ListItem Value="10">公文製作網路個人區</asp:ListItem>
                            <asp:ListItem Value="11">民眾應用暫存區</asp:ListItem>
                            <asp:ListItem Value="12">民眾應用正式區</asp:ListItem>
                            <asp:ListItem Value="13">收文掃描暫存區</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label5" runat="server">異地備援伺服機：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBkupSrvno" TabIndex="40" runat="server" Width="2em" MaxLength="2"></asp:TextBox>
                        <asp:ImageButton ID="btBkupSrvno" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="txBkupSrvname" runat="server" TabIndex="-1" Width="22em" ReadOnly="True"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label2" runat="server">異地備援儲存區目錄名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBkupStorage" TabIndex="50" runat="server" Width="6.5em" MaxLength="40"></asp:TextBox>
                        <asp:Label ID="lbORGNO" runat="server" CssClass="hidden" Width="5.5em"></asp:Label>
                        <asp:TextBox ID="txUsedSpace" runat="server" CssClass="hidden"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="備份種類">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlBkpType" runat="server" Width="7.5em">
                                        <asp:ListItem></asp:ListItem>
                                        <asp:ListItem Value="1">標準備份</asp:ListItem>
                                        <asp:ListItem Value="2">差異備份</asp:ListItem>
                                    </asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備份週期">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlBkpPeriod" runat="server" Width="8em" onblur="dlBkpPeriodOnChange()">
                                        <asp:ListItem></asp:ListItem>
                                        <asp:ListItem Value="1">每日一次</asp:ListItem>
                                        <asp:ListItem Value="2">每週一次</asp:ListItem>
                                        <asp:ListItem Value="3">每月一次</asp:ListItem>
                                    </asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備份日">
                                <ItemTemplate>
                                    <asp:TextBox ID="txBkpDay" runat="server" CssClass="InputFieldNumeric" onblur="dlBkpDayOnBlur()" Width="8.5em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備份目的地(檔名)">
                                <ItemTemplate>
                                    <asp:TextBox ID="txBkpFilename" runat="server"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:TextBox ID="htxActiveBtn" Style="z-index: 105; left: 10px; position: absolute; top: 68px" runat="server" CssClass="hide"></asp:TextBox>
    </form>
</body>
</html>
