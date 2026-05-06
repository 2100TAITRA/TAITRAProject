<%@ Page Language="c#" CodeBehind="ODI500.aspx.cs" AutoEventWireup="false" Inherits="OD.ODI500" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODI500 公文流程點查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODI500" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label class="RequireField" ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txDocNo" TabIndex="1" runat="server" CssClass="RequireField" MaxLength="15" Width="8em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="Table1">
                <div class="dTR" style="width: 30em">
                    <div class="dTD">
                        &nbsp;&nbsp;
                        <asp:HyperLink ID="hlHTDL" runat="server">HTDL</asp:HyperLink>
                    </div>
                    <div class="dTD">
                        &nbsp;&nbsp;
                        <asp:HyperLink ID="hlMDCE" runat="server">MDCE</asp:HyperLink>
                    </div>
                    <div class="dTD">
                        &nbsp;&nbsp;
                        <asp:HyperLink ID="hlMDCM" runat="server">MDCM</asp:HyperLink>
                    </div>
                    <div class="dTD">
                        &nbsp;&nbsp;
                        <asp:HyperLink ID="hlWCRQ" runat="server">WCRQ</asp:HyperLink>
                    </div>
                    <div class="dTD">
                        &nbsp;&nbsp;
                        <asp:HyperLink ID="hlWDCM" runat="server">WDCM</asp:HyperLink>
                    </div>
                    <div class="dTD">
                        &nbsp;&nbsp;
                        <asp:HyperLink ID="hlWMSG" runat="server">WMSG</asp:HyperLink>
                    </div>
                    <div class="dTD">
                        &nbsp;&nbsp;
                        <asp:HyperLink ID="hlWWKF" runat="server">WWKF_XX</asp:HyperLink>
                    </div>
                    <div class="dTD">
                        &nbsp;&nbsp;
                        <asp:HyperLink ID="hlDCWM" runat="server">DCWM</asp:HyperLink>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div style="height: 391px">
                            <asp:DataGrid ID="dg1" runat="server" PageSize="50" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:BoundColumn DataField="MSG_ID" HeaderText="MSG_ID"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="FROM_MSG_ID" HeaderText="FROM_MSG_ID"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="TX_TIME" HeaderText="TX_TIME"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="FOLDER" HeaderText="FOLDER"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="SUBFOLDER" HeaderText="SUBFOLDER"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="OWN_OU_ID" HeaderText="OWN_OU_ID"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="OWN_ROLE_ID" HeaderText="OWN_ROLE_ID"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="OWN_USER_ID" HeaderText="OWN_USER_ID"></asp:BoundColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Text="搜尋" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1" AccessKey ="Q" Title="搜尋(Alt+Q)"></asp:Button>
            <asp:Button runat="server" Text="一鍵下載(E)" DefaultStyle="newmode:block;modifymode:none;" ID="btExcel" AccessKey ="E" Title="一鍵下載(Alt+E)"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
