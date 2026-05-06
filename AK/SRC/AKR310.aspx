<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKR310.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR310" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKR310 檔案目錄匯入紀錄查詢</title>
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
    <form id="AKR310" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 100; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:TextBox ID="h_dgCnt" Style="z-index: 105; left: 837px; position: absolute; top: 130px" runat="server" CssClass="hidden"></asp:TextBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">批　號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="InputFieldNumeric" ID="txChkNo1" TabIndex="10" runat="server" MaxLength="8" Width="4.5em"></asp:TextBox>-
						<asp:TextBox class="InputFieldNumeric" ID="txChkNo2" TabIndex="20" runat="server" MaxLength="8" Width="4.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">檢核日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="InputFieldNumeric DataPicker" ID="txDate1" TabIndex="30" runat="server" MaxLength="7" Width="4em"></asp:TextBox>-
						<asp:TextBox class="InputFieldNumeric DataPicker" ID="txDate2" TabIndex="40" runat="server" MaxLength="7" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">檢核別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlChkType" TabIndex="50" runat="server" Width="7em">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="1">日常轉檔</asp:ListItem>
                            <asp:ListItem Value="2">欄位檢核</asp:ListItem>
                            <asp:ListItem Value="3">每季檔案目錄</asp:ListItem>
                            <asp:ListItem Value="4">銷毀檔案目錄</asp:ListItem>
                            <asp:ListItem Value="5">移轉檔案目錄</asp:ListItem>
                            <asp:ListItem Value="7">檔案目錄匯入</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Button ID="btClearSelect" AccessKey="C" TabIndex="-1" runat="server" Width="4.5em" ToolTip="清除(Alt+C)" Text="清除(C)"></asp:Button>
                        <asp:Button ID="btSelectAll" AccessKey="A" TabIndex="-1" runat="server" Width="4.5em" ToolTip="全選(Alt+A)" Text="全選(A)"></asp:Button>
                        <asp:Button ID="btReverse" AccessKey="N" TabIndex="-1" runat="server" Width="4.5em" ToolTip="反向(Alt+N)" Text="反向(N)"></asp:Button>
                    </div>
                </div>
                <div class="GridDiv" id="dgDIV" style="height: 16.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:BoundColumn DataField="SEQ_NO" HeaderText="序"></asp:BoundColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="批號">
                                <ItemTemplate>
                                    <asp:Label ID="lbCHK_NO" runat="server" Text='<%# DataBinder.Eval(Container.DataItem, "CHK_NO") %>'>
                                    </asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:BoundColumn DataField="ENTRY_DATE" HeaderText="檢核日期"></asp:BoundColumn>
                            <asp:BoundColumn DataField="ENTRY_USER" HeaderText="檢核人"></asp:BoundColumn>
                            <asp:BoundColumn DataField="CHK_TYPE" HeaderText="檢核別"></asp:BoundColumn>
                            <asp:BoundColumn DataField="NUM" HeaderText="總筆數/異常數"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Text="重新搜索(F)" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" AccessKey="F" ToolTip="重新搜索(ALT+F)"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:block;" ID="btClean"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 101; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 102; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
