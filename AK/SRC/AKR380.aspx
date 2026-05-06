<%@ Page Language="c#" CodeBehind="AKR380.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR380" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR380 案卷條碼列印作業</title>
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
    <form id="AKR380" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">編目日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="10" runat="server" MaxLength="7" Width="4em"></asp:TextBox>－
						<asp:TextBox ID="txEDate" TabIndex="20" runat="server" MaxLength="7" Width="4em"></asp:TextBox>
                        <asp:TextBox ID="H_FileVol" TabIndex="-1" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="30" runat="server" MaxLength="15" Width="5.5em"></asp:TextBox>
                        <asp:TextBox ID="H_Split" TabIndex="-1" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="Table1" class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lb1" runat="server" Width="1.5em"></asp:Label>
                        <asp:RadioButton ID="rbVol" TabIndex="40" runat="server" GroupName="Gp" Text="列印案卷條碼　列印起始位置："></asp:RadioButton>
                        <asp:TextBox ID="txVolNum" TabIndex="43" runat="server" Width="1.5em" MaxLength="2"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lb2" runat="server" Width="1.5em"></asp:Label>
                        <asp:RadioButton ID="rbDoc" TabIndex="50" runat="server" Text="列印案件條碼　列印起始位置：" GroupName="Gp"></asp:RadioButton>
                        <asp:TextBox ID="txDocNum" TabIndex="53" runat="server" Width="1.5em" MaxLength="2"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lb3" runat="server" Width="2.5em"></asp:Label>
                        <asp:CheckBox ID="cbComNo" TabIndex="55" runat="server" Text="併件(一目多文)每一份文均列印"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lb4" runat="server" Width="2.5em"></asp:Label>
                        <asp:RadioButton ID="rbSingle" TabIndex="57" runat="server" Text="一頁多張條碼" GroupName="GM"></asp:RadioButton>
                        <asp:RadioButton ID="rbMuti" TabIndex="59" runat="server" Text="一頁一張條碼" GroupName="GM"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lb5" runat="server" Width="1.5em"></asp:Label>
                        <asp:RadioButton ID="rbAtt" TabIndex="60" runat="server" GroupName="Gp" Text="列印附件條碼　列印起始位置："></asp:RadioButton>
                        <asp:TextBox ID="txAttNum" TabIndex="63" runat="server" Width="1.5em" MaxLength="2"></asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
