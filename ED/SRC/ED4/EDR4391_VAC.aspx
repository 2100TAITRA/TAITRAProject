<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EDR4391_VAC.aspx.cs" Inherits="ED4.EDR4391_VAC" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<!DOCTYPE html>
<html>
<head>
    <title>EDR4391_VAC承辦公文時效天數彙總表</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR4391_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">收(創)文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="dTR">
                            <asp:TextBox ID="txRCVDateS" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                            <asp:Label ID="Label4" runat="server" Width="16px" CssClass="RequireField">～</asp:Label>
                            <asp:TextBox ID="txRCVDateE" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label12" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <cc1:ComboBox ID="dlDept" TabIndex="240" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <cc1:ComboBox ID="dlUser" TabIndex="240" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server">結案別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlFinishType" TabIndex="240" runat="server" Width="9em">
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label5" runat="server">辦畢方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlCloseType" TabIndex="240" runat="server" Width="9em">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label6" runat="server">收創別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlRCType" TabIndex="240" runat="server" Width="9em">
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label7" runat="server">辦理天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlHandlingDays" TabIndex="240" runat="server" Width="9em">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label8" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlDocType" TabIndex="240" runat="server" Width="9em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label9" runat="server">專案別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlProjectType" TabIndex="240" runat="server" Width="9em">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label10" runat="server">簽核方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlSignType" TabIndex="240" runat="server" Width="9em">
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label11" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txFromDept"  runat="server" Width="10em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label13" runat="server">統計方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDept" runat="server" Text="單位" GroupName="rbSummaryType" data-CN="單位"></asp:RadioButton>
                        <asp:RadioButton ID="rbUser" runat="server" Text="個人" GroupName="rbSummaryType" data-CN="承辦人"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btOds" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
