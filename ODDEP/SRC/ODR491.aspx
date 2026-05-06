<%@ Page Language="c#" CodeBehind="ODR491.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR491" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR491 業務類別案件處理時效分析表列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR491" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MTable1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server" CssClass="RequireField">列印月份：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="KeyUpperField" ID="txSMon" TabIndex="10" runat="server" CssClass="RequireFieldNumeric" Width="3em" MaxLength="5"></asp:TextBox>－
						<asp:TextBox class="KeyUpperField" ID="txEMon" TabIndex="15" runat="server" CssClass="RequireFieldNumeric" Width="3em" MaxLength="5"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        &nbsp;
                        <asp:Label ID="Label3" runat="server">跨月列印：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="ComPrint" TabIndex="35" runat="server" Text="合併列印" GroupName="cm"></asp:RadioButton>
                        <asp:RadioButton ID="SeprPrint" TabIndex="37" runat="server" Text="分開列印" GroupName="cm"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDocProperty" runat="server"></asp:DropDownList>
                        <asp:DropDownList ID="H_dlBType" runat="server" CssClass="hide" Width="176px"></asp:DropDownList>
                        <asp:TextBox ID="H_BTypeNo" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlBTypeNo" runat="server" Width="11em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">報表格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDept" TabIndex="35" runat="server" Text="組室" GroupName="gn"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbUser" TabIndex="37" runat="server" Text="個人" GroupName="gn"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbPrize" TabIndex="39" runat="server" Text="承辦人員獎勵統計表" GroupName="gn"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lbMaxYear" runat="server">目前統計最大年月：888年88月</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <div style="visibility:hidden">
            <cc1:ComboBox ID="dlDept" runat="server" Width="6.5em" CssClass="comboBox"></cc1:ComboBox>
            <asp:TextBox class="KeyUpperField" ID="h_txYM" TabIndex="15" runat="server" CssClass="hidden" MaxLength="5" Width="45px"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="統計" ID="btStatic"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" CssClass="hide" Text="列印" ID="btPrint"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
