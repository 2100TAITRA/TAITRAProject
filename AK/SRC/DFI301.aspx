<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="DFI301.aspx.cs" AutoEventWireup="false" Inherits="AK.DFI301" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>DFI301 VOLUME明細資料顯示</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
</head>
<body ms_positioning="GridLayout">
    <form id="DFI301" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <div id="service" style="behavior: url(Template/LIB/webservice.htc)"></div>
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="Hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label1" runat="server">VOLUME編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbVolume" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbStatus" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label4" runat="server">儲存區目錄名稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbPath" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server">版別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbFileType" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label2" runat="server">使用工作群組：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbGrpName" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label13" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbKeepYear" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label7" runat="server">所在伺服機：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbSrvName" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">啟用日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbDate" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label8" runat="server">儲存區種類：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbType" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">使用空間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbSpace" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label9" runat="server">媒體種類：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbMediaType" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label16" runat="server">檔案件數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbDocNum" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50" AutoGenerateColumns="False">
                        <Columns>
                            <asp:BoundColumn DataField="COPY_NO" HeaderText="複製序號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                            </asp:BoundColumn>
                            <asp:BoundColumn DataField="COPY_DATE" HeaderText="複製日期">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                            </asp:BoundColumn>
                            <asp:BoundColumn DataField="CHECK_DATE" HeaderText="上次檢查日期">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                            </asp:BoundColumn>
                            <asp:BoundColumn DataField="CHECK_RESULT" HeaderText="檢查結果">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                            </asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPrint" runat="server" Text="VOLUME內容列印(P)" AccessKey="P" Title="VOLUME內容列印(ALT+P)" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
