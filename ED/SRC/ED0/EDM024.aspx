<%@ Page Language="c#" CodeBehind="EDM024.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM024" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDM024 分層負責代碼維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDM024" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">分層負責代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRespNo" TabIndex="1" runat="server" Width="4em" CssClass="ED_KeyField" MaxLength="7"></asp:TextBox>
                        <asp:CheckBox ID="cbLowest" runat="server"  Text="是否為最底層" ></asp:CheckBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label15" runat="server" >使用單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Button ID="btSetUseDept" runat="server" Text="設定" ></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">業務內容：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRespConTent" TabIndex="2" runat="server" Width="30.5em" CssClass="RequireField" MaxLength="300"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label16" runat="server" >業務簡要說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRespDesc" TabIndex="3" runat="server" Width="30.5em" CssClass="RequireField" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">上層負責代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUpResp" TabIndex="4" runat="server" Width="4em"  MaxLength="7"></asp:TextBox>
                        <asp:imagebutton id="btUpResp" tabIndex="-1" runat="server" ToolTip="上層負責代碼：" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:imagebutton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server" >備考：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRespNote" TabIndex="5" runat="server" Width="30.5em"  MaxLength="300" TextMode="MultiLine" Height="5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="dTRdlApp">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">核決層級：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20.5em">
                        <asp:DropDownList ID="dlAppMain" TabIndex="4" runat="server" Width="9.5em"></asp:DropDownList>
                        <asp:DropDownList ID="dlAppList" TabIndex="4" runat="server" Width="9.5em"></asp:DropDownList>
                        <asp:TextBox ID="H_Applist" CssClass="hide" runat="server"  ></asp:TextBox>
                        <asp:TextBox ID="H_Appname" CssClass="hide" runat="server" ></asp:TextBox>
                        <asp:TextBox ID="H_DeleteReason" CssClass="hide" runat="server" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">最後異動人員：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:Label ID="lbLastName" TabIndex="4" runat="server" Width="4.5em">　</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label7" runat="server">最後異動時間：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:Label ID="lbLasTime" runat="server" Width="16.5em"></asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
