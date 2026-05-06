<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR460.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR460" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODR460 發文日數明細表列印作業</title>
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
    <form id="ODR460" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->

        <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        <asp:TextBox ID="H_Sect_Text" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        <asp:TextBox ID="H_Dept_Text" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        <asp:TextBox ID="H_Sect_AllValue" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
		<asp:textbox id="H_User" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
		<asp:textbox id="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
		<asp:textbox id="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:textbox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server" CssClass="RequireField">起算日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txStartDateS" runat="server" CssClass="RequireFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txStartDateE" runat="server" CssClass="RequireFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">結案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCloseDateS" runat="server" CssClass="RequireFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txCloseDateE" runat="server" CssClass="RequireFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">收創日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateS" runat="server" CssClass="RequireFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="txRcvDateE" runat="server" CssClass="RequireFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" CssClass="comboBox" Width="9em" Rows="8"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                    </div>
                </div>
                <!-- 950895 增加「公文性質」為搜尋條件之一 whay -->
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbProperty" runat="server" Visible="False">公文性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlProperty" runat="server" Width="7.5em" Visible="False"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDocno" runat="server" Text="公文文號" GroupName="ORDER" DESIGNTIMEDRAGDROP="203"></asp:RadioButton>
                        <asp:RadioButton ID="rbEmpname" runat="server" Text="承辦人" GroupName="ORDER" DESIGNTIMEDRAGDROP="204"></asp:RadioButton>
                        <asp:RadioButton ID="rbUdissue" runat="server" Text="發文使用日數" GroupName="ORDER"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:CheckBox ID="cb1" runat="server" Text="列出發文使用日數大於"></asp:CheckBox>
                        <asp:TextBox ID="txNumber" CssClass="InputFieldNumeric" runat="server" Width="1.5em"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">天(不含)以上者</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" CssClass="hide" Text="列印" ID="btPrint"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
