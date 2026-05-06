<%@ Page Language="c#" CodeBehind="AKR101.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR101" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR101 庫房間檔案搬移清冊列印</title>
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
    <form id="AKR101" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server"> 搬移日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDate" TabIndex="1" runat="server"  Width="5em">
                            <asp:ListItem Value="0920101">0920101</asp:ListItem>
                            <asp:ListItem Value="0920102">0920102</asp:ListItem>
                            <asp:ListItem Value="0920103">0920103</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">移出庫房：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em">
                        <asp:DropDownList ID="dlStoreOut" TabIndex="6" runat="server">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="一樓" Selected="True">一樓</asp:ListItem>
                            <asp:ListItem Value="二樓">二樓</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">移入庫房：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStoreIn" TabIndex="11" runat="server">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="一樓">一樓</asp:ListItem>
                            <asp:ListItem Value="二樓" Selected="True">二樓</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <fieldset>
                <legend>清冊種類</legend>
                <div id="Table3" class="DivTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 4em">
                            <asp:CheckBox ID="ck1" TabIndex="16" runat="server" Checked="True"></asp:CheckBox>
                        </div>
                        <div class="dTD">
                            <asp:Label ID="Label7" runat="server">普通件檔案</asp:Label>&nbsp;&nbsp;
							<asp:RadioButton ID="rbVol" TabIndex="17" runat="server" Checked="True" GroupName="rb" Text="以卷為單位"></asp:RadioButton>&nbsp;
							<asp:RadioButton ID="rbSeq" TabIndex="18" runat="server" GroupName="rb" Text="以件為單位"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 4em">
                            <asp:CheckBox ID="ck2" TabIndex="21" runat="server"></asp:CheckBox>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="Textbox3" runat="server" CssClass="hide" Width="3em" AutoPostBack="True"></asp:TextBox>
                            <asp:Label ID="Label3" runat="server">機密檔案</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 4em">
                            <asp:CheckBox ID="ck3" TabIndex="26" runat="server" Checked="True"></asp:CheckBox>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="Textbox4" runat="server" CssClass="hide" Width="3em" AutoPostBack="True"></asp:TextBox>
                            <asp:Label ID="Label9" runat="server">另存(未數位化)附件</asp:Label>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 47px; position: absolute; top: 365px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
