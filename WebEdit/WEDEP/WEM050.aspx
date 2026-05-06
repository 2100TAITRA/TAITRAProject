<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="WEM050.aspx.cs" AutoEventWireup="false" Inherits="T2100.WebEditWs.WEM050" EnableEventValidation="false" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>WEM050 會辦單位維護作業</title>
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
    <form id="WEM050" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="h_CoUnit" runat="server" Width="80px"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <fieldset style="width: 32.5em">
                    <legend>會辦單位設定</legend>
                    <div class="DivTable">
                        <div class="dTR">
                            <div class="dTD">
                                <asp:Label ID="Label1" runat="server">操作說明：左方為機關所有單位，右方為公文製作系統所顯示可會辦之單位。使用中間的功能鍵可增加或移除會辦單位。</asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTD">
                                <asp:ListBox ID="listAllUnit" ondblclick="jf_Add();" runat="server" Width="15em" Height="9.5em"></asp:ListBox>
                            </div>
                            <div class="dTD">
                                <asp:Button ID="btAddAll" TabIndex="10" runat="server" Width="2em" Text=">>" ToolTip="將機關所有單位設定為會辦單位"></asp:Button><br>
                                <asp:Button ID="btAdd" TabIndex="20" runat="server" Width="2em" Text=">" ToolTip="將所選的機關單位設定為會辦單位"></asp:Button><br>
                                <asp:Button ID="btRemove" TabIndex="30" runat="server" Width="2em" Text="<" ToolTip="移除所選的會辦單位"></asp:Button><br>
                                <asp:Button ID="btRemoveAll" TabIndex="40" runat="server" Width="2em" Text="<<" ToolTip="移除全部的會辦單位"></asp:Button>
                            </div>
                            <div class="dTD">
                                <asp:ListBox ID="listCoUnit" ondblclick="jf_Remove();" runat="server" Width="15em" Height="9.5em"></asp:ListBox>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
