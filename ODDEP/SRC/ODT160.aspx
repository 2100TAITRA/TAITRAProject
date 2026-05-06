<%@ Page Language="c#" CodeBehind="ODT160.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT160" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT160 其他文件傳送作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT160" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="hiddenDiv" style="display: none; visibility: hidden; width: 708px; height: 42px">
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden" Width="21px"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label class="KeyField" ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em;">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" CssClass="KeyUpperField" MaxLength="10" Width="5.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label3" runat="server">收(創)文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em;">
                        <asp:TextBox ID="txRcvDate" TabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="7" Width="4.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label6" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 24em;">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="23.5em" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 24em;">
                        <asp:TextBox ID="txDeptName" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="17.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label4" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 24em;">
                        <asp:TextBox ID="txEmpName" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="17.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label7" runat="server">傳送內容：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em;">
                        <asp:RadioButton ID="rb1" runat="server" Text="未數位化文件" GroupName="gn" TabIndex="15"></asp:RadioButton><br>
                        <asp:RadioButton ID="rb2" runat="server" Text="補送附件" GroupName="gn" TabIndex="20"></asp:RadioButton>
                    </div>
                    <div class="dTDTitle" style="width: 8em;">
                        <asp:Label ID="Label9" runat="server">補收日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em;">
                        <asp:TextBox ID="txAttDate" TabIndex="20" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label5" runat="server">接收單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 24em;">
                        <cc1:ComboBox CssClass="comboBox" ID="dlDept" runat="server" Width="7.5em" TabIndex="25"></cc1:ComboBox>&nbsp;&nbsp;
                        <cc1:ComboBox CssClass="comboBox" ID="dlSect" runat="server" Width="7.5em" TabIndex="25"></cc1:ComboBox>
                        <asp:TextBox ID="H_DeptNo" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label8" runat="server">備　　註：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 24em;">
                        <asp:TextBox ID="txRemark" runat="server" Width="21.5em" TextMode="MultiLine" TabIndex="30"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="傳送" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
