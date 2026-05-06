<%@ Page Language="c#" CodeBehind="EDR363.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR363" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR363 發文方式清單查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR363" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
            <asp:TextBox ID="H_dlDept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" class="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txDateE" class="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="8em" MaxLength="15"></asp:TextBox>－
						<asp:TextBox ID="txDocNoE" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">發文方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbIssueType5" runat="server" Text="公布欄"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType2" runat="server" Text="郵寄"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType3" runat="server" Text="機關間人工交換"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType8" runat="server" Text="機關內函件傳遞"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType1" runat="server" Text="電子交換"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType9" runat="server" Text="個人專區"></asp:CheckBox>
                        <asp:CheckBox ID="cbIssueType4" runat="server" Text="電子郵件"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="8.5em" CssClass="comboBox"></cc1:ComboBox>&nbsp;
                        <cc1:ComboBox ID="dlSect" runat="server" Width="8.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" runat="server" Width="8.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">受文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgname" runat="server" Width="10.5em" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label7" runat="server">簽核類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlSignType" runat="server">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="E">線上簽核</asp:ListItem>
                            <asp:ListItem Value="P">紙本簽核</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbSec0" runat="server" Text="普通" GroupName="Sec"></asp:RadioButton>
                        <asp:RadioButton ID="rbSec1" runat="server" Text="機密等級公文" GroupName="Sec"></asp:RadioButton>
                        <asp:RadioButton ID="rbSec2" runat="server" Text="全部" GroupName="Sec"></asp:RadioButton>
                        <asp:CheckBox ID="cbShowSecSubject" runat="server" Text="密件公文列印主旨"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label9" runat="server">列印內容：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbPage0" runat="server" Text="不區分" GroupName="Page"></asp:RadioButton>
                        <asp:RadioButton ID="rbPage1" runat="server" Text="依組室區分不換頁" GroupName="Page"></asp:RadioButton>
                        <asp:RadioButton ID="rbPage2" runat="server" Text="依組室區分自動換頁" GroupName="Page"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label10" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrder0" runat="server" Text="發文日期、公文文號" GroupName="Order"></asp:RadioButton>
                        <asp:RadioButton ID="rbOrder1" runat="server" Text="發文時間" GroupName="Order"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
