<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR821.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAR821" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR821 調案記錄平均天數統計表列印作業</title>
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
    <form id="EAR821" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txDL" runat="server"></asp:TextBox>
            <asp:TextBox ID="empUserId" runat="server"></asp:TextBox>            
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">調案日期：</asp:Label> 
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txDateS" CssClass="RequireField DatePicker" TabIndex="10" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txDateE" CssClass="RequireField DatePicker" TabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:TextBox>                        
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label2" runat="server">調案單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="12em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:6em">
                        <asp:Label ID="Label3" runat="server">調案人：</asp:Label>
                    </div>
                    <div class="dTD" >
                        <asp:DropDownList ID="dlUser" runat="server" Width="8.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label4" runat="server">歸還情況：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlRtnType" runat="server" Width="5.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">已歸還</asp:ListItem>
                            <asp:ListItem Value="2">未歸還</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label5" runat="server">逾期別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOverType" runat="server" Width="5.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">已逾期</asp:ListItem>
                            <asp:ListItem Value="2">未逾期</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:12.5em">
                        <asp:Label ID="Label6" runat="server">逾期天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOverDay" runat="server" Width="5.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="15">15</asp:ListItem>
                            <asp:ListItem Value="30">30</asp:ListItem>
                            <asp:ListItem Value="45">45</asp:ListItem>
                            <asp:ListItem Value="60">60</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint"></asp:Button>                        
			<asp:Button runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel"></asp:Button>
            <asp:Button runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btODS"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
