<%@ Page Language="c#" CodeBehind="IFM110.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM110" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>IFM110 虛擬目錄維護程式</title>
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
    <form id="IFM110" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" class="KeyField" runat="server" CssClass="KeyField">虛擬目錄名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVDNo" class="KeyUpperField" TabIndex="1" runat="server" MaxLength="20" CssClass="KeyUpperField"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">說　　明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" TabIndex="2" runat="server" MaxLength="60"> Desc</asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="Table1" class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label2" runat="server">建置此虛擬目錄之伺服器</asp:Label>
                    </div>
                </div>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="20" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="伺服器">
                                <ItemTemplate>
                                    <asp:TextBox ID="txSrv" runat="server" Width="137px"></asp:TextBox>
                                    <asp:Button ID="btSet" runat="server" Text="設定"></asp:Button>
                                    <asp:Button ID="btDel" runat="server" Text="刪除"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <asp:DropDownList ID="DNoUnit" runat="server"></asp:DropDownList>
            <asp:DropDownList ID="ddUnit" runat="server"></asp:DropDownList>
            <asp:DropDownList ID="ddDel" runat="server"></asp:DropDownList>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:none;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:none;modifymode:none;" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
