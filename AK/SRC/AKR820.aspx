<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKR820.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR820" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKR820 逾期未歸還檔案稽催單列印</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKR820" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label1" runat="server" Width="5.5em" CssClass="RequireField">稽催日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txEntryDateS" TabIndex="10" runat="server" MaxLength="8" Width="4.5em" CssClass="RequireField DatePicker"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">－</asp:Label>
                        <asp:TextBox ID="txEntryDateE" TabIndex="20" runat="server" MaxLength="8" Width="4.5em" CssClass="RequireField DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label4" runat="server" Width="5.5em">調案單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="cbDept" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label6" runat="server" Width="5.5em">調案人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label3" runat="server" Width="5.5em" CssClass="RequireField">稽催次數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txInspectCount" TabIndex="40" runat="server" Width="2em" MaxLength="1" CssClass="RequireFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">次(含)以上</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label7" runat="server" Width="5.5em" >逾期天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOverDay" TabIndex="40" runat="server" MaxLength="2" Width="1.5em" CssClass="InputFieldNumeric"></asp:TextBox>
                    </div>
                    <div class="dTDTitle">&nbsp;</div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOverDay" runat="server" style="width: 3.5em" TabIndex="-1">
                                <asp:ListItem></asp:ListItem>
                                <asp:ListItem Value="7">7</asp:ListItem>
                                <asp:ListItem Value="15">15</asp:ListItem>
                                <asp:ListItem Value="30">30</asp:ListItem>
                                <asp:ListItem Value="45">45</asp:ListItem>
                                <asp:ListItem Value="60">60</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="ck1" runat="server" Text="已歸還檔案不納入列印範圍" TabIndex="50"></asp:CheckBox>
                    </div>
                </div>
				<div class="hide" id="RPTSET">
                    <div class="dTDTitle" style="width: 7.0em">列印格式</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" runat="server" Text="總表" GroupName="di" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbist" runat="server" Text="清單" GroupName="di"></asp:RadioButton>
                    </div>
                </div>
                <asp:TextBox ID="txUser" Style="z-index: 105; left: 410px; position: absolute; top: 284px" runat="server" CssClass="hide"></asp:TextBox>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
