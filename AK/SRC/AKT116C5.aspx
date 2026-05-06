<%@ Page Language="c#" CodeBehind="AKT116C5.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT116C5" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKT116C5 點收公文提示子視窗</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKM330C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div style="width: 5em;" class="dTDTitle">
                        <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="2" onkeypress="jf_UPPERCASE()" runat="server" ReadOnly="True" MaxLength="20" CssClass="DisplayOnly" Width="6em"></asp:TextBox>
                    </div>
                </div>
                <div id="MainTableSec">
                    <div class="dTR">
                        <div style="width: 5em;" class="dTDTitle">
                            <asp:Label ID="lbSec" runat="server">密等：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txSec" TabIndex="3" onkeypress="jf_UPPERCASE()" runat="server" ReadOnly="True" Width="4.5em" MaxLength="12" CssClass="DisplayOnly"></asp:TextBox>
                            <asp:CheckBox ID="ck1" runat="server" Width="1em" CssClass="hide" Text="系統自動編號"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div style="width: 5em;" class="dTDTitle">
                            <asp:Label ID="lbSecDate" runat="server">解密日期：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox Style="z-index: 0" ID="txSecDate" TabIndex="3" onkeypress="jf_UPPERCASE()" runat="server" ReadOnly="True" Width="4.5em" MaxLength="12" CssClass="DisplayOnly"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div style="width: 5em;" class="dTDTitle">
                            <asp:Label ID="lbSecCond" runat="server">解密條件：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txSecCond" TabIndex="2" onkeypress="jf_UPPERCASE()" runat="server" ReadOnly="True" Width="22em" CssClass="DisplayOnly"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div id="MainTableDG2" class="GridDiv">
                    <div class="dTR">
                        <div class="dTD">
                            <asp:DataGrid ID="dg2" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                                <Columns>
                                    <asp:BoundColumn DataField="SEQ_NO" HeaderText="展期次數"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="ENTRY_DATE" HeaderText="核准日期"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="DIRECTOR_NAME" HeaderText="核准長官"></asp:BoundColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
                <div class="DivTable">
                    <div id="MainTableDG1" class="DivTable">
                        <div class="dTR">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical">
                                <Columns>
                                    <asp:BoundColumn DataField="SEQ_NO" HeaderText="展期次數"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="ENTRY_DATE" HeaderText="核准日期"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="DIRECTOR_NAME" HeaderText="核准長官"></asp:BoundColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="dTR">
            <div class="GridDiv" style="height: 262px; display: none;">
                <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
                <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
                <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
                <asp:TextBox ID="tbCase_year" runat="server"></asp:TextBox>
                <asp:TextBox ID="tbVer_no" runat="server"></asp:TextBox>
                <asp:TextBox ID="txCaseKey" runat="server"></asp:TextBox>
               <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
            </div>
        </div>
        <asp:Panel ID="Panel1" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btCheck" runat="server" Text="確認" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
