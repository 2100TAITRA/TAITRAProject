<%@ Page Language="c#" CodeBehind="DFR230.aspx.cs" AutoEventWireup="false" Inherits="AK.DFR230" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>DFR230 待掃瞄清單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout" class="hidden">
    <form id="DFR230" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label6" runat="server">年度號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileYear" runat="server" Width="2.5em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label5" runat="server">版本號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3em">
                        <asp:TextBox ID="txVerNo" runat="server" Width="2.5em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label7" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCls" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="ibtCLS" TabIndex="-1" runat="server" Height="22px" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="DatePicker" ID="txFileDateS" TabIndex="10" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server">－</asp:Label>
                        <asp:TextBox class="DatePicker" ID="txFileDateE" TabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label8" runat="server">點收人員：</asp:Label>
                    </div>
                     <div class="dTD">
                         <asp:DropDownList ID="dlAcpName" runat="server" Width="5.5em" MaxLength="10"></asp:DropDownList>
                    </div>

                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label9" runat="server">點收批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:textbox id="txAcpNo" tabIndex="40" runat="server" Width="5.5em" MaxLength="10"></asp:textbox>
					    <asp:imagebutton id="ibtAcp" tabIndex="-1" runat="server" ImageUrl="template/images/HELPWIN_E.gif"></asp:imagebutton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label10" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:textbox id="txDocNo" tabIndex="40" runat="server" Width="6em" MaxLength="10"></asp:textbox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label4" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbCommon" TabIndex="-1" runat="server" Text="普通" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSec" TabIndex="-1" runat="server" Text="機密等級公文" GroupName="gp"></asp:RadioButton>
                        <asp:RadioButton ID="rbSecAll" TabIndex="-1" runat="server" Text="全部" GroupName="gp"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSubject" TabIndex="-1" runat="server" Text="密件公文列印主旨"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label class="InputFieldLabel" ID="Label3" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbSortByDate" runat="server" Checked="True" GroupName="SORT" Text="依歸檔日期"></asp:RadioButton>
                        <asp:RadioButton ID="rbSortByNo" runat="server" GroupName="SORT" Text="依公文文號"></asp:RadioButton>
                        <asp:RadioButton ID="rbSortByFileNo" runat="server" Text="依檔號" GroupName="SORT"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
