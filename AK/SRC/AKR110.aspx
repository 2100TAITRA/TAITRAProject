<%@ Page Language="c#" CodeBehind="AKR110.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR110" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR110 點收清單列印作業</title>
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
    <form id="AKR110" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 100; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="hiddenDiv" style="display: none; z-index: 105; left: 8px; visibility: hidden; width: 280px; position: absolute; top: 8px; height: 42px">
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Text" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlFromSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlFromSect_Text" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" TabIndex="-1" runat="server">點收日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" CssClass="DatePicker" TabIndex="10" runat="server" Width="4em" MaxLength="7"></asp:TextBox>－
                            <asp:TextBox ID="txEDate" CssClass="DatePicker" TabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" TabIndex="-1" runat="server">歸檔單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlFromDept" TabIndex="30" runat="server" Width="9em" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlFromSect" TabIndex="35" runat="server" MaxLength="40" Width="8em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" TabIndex="-1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUnit" TabIndex="40" runat="server" Width="9em" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" TabIndex="45" runat="server" MaxLength="40" Width="8em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label4" TabIndex="-1" runat="server">點收批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txAcpNo1" TabIndex="50" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btAcpNo1" TabIndex="55" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>－
                            <asp:TextBox ID="txAcpNo2" class="RequireField" runat="server" MaxLength="10" Width="5.5em" TabIndex="60"></asp:TextBox>
                        <asp:ImageButton ID="btAcpNo2" runat="server" ImageUrl="Template/images/HELPFILE_E.gif" TabIndex="65"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbUser" TabIndex="-1" runat="server">點收人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUser" TabIndex="66" runat="server" Width="6em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label6" runat="server">簽核類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:DropDownList ID="dlSignType" TabIndex="6" runat="server" Width="6em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">紙本簽核</asp:ListItem>
                            <asp:ListItem Value="2">線上簽核</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label7" runat="server">機密等級：</asp:Label>
                    </div>
                    <div class="dTD">   
                        <asp:DropDownList ID="dlSecNo" TabIndex="11" runat="server" Width="5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">普通件</asp:ListItem>
                            <asp:ListItem Value="2">密件</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label8" runat="server">結案種類：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlCloseType" TabIndex="67" runat="server" Width="6em">
                             <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">存查</asp:ListItem>
                            <asp:ListItem Value="2">發文</asp:ListItem>
                        </asp:DropDownList>

                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label5" TabIndex="-1" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb1" runat="server" Text="承辦單位+公文文號" GroupName="gn" TabIndex="70"></asp:RadioButton><br>
                        <asp:RadioButton ID="rb2" runat="server" Text="承辦單位+點收時間" GroupName="gn" TabIndex="73"></asp:RadioButton><br>
                        <asp:RadioButton ID="rb3" runat="server" Text="歸檔單位+承辦單位" GroupName="gn" TabIndex="76"></asp:RadioButton><br>
                        <asp:RadioButton ID="rb4" runat="server" Text="點收時間" GroupName="gn" TabIndex="79"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btOds" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; left: 12px; position: absolute; top: 218px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; left: 12px; position: absolute; top: 252px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
