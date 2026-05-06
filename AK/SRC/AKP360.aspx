<%@ Page Language="c#" CodeBehind="AKP360.aspx.cs" AutoEventWireup="false" Inherits="AK.AKP360" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKP360 點收確認及副版產生作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="LIB/AK.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKP360" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" Width="16em">點收日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txAcpDateS" onblur="TxOnBlur('txAcpDateS')" runat="server" CssClass="requirefield DatePicker" Width="4.5em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txAcpDateE" onblur="TxOnBlur('txAcpDateE')" runat="server" CssClass="requirefield DatePicker" Width="4.5em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="InputFieldLabel" ID="Label3" runat="server">點收人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:dropdownlist id="dlUser" tabindex="6" runat="server"></asp:dropdownlist>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="InputFieldLabel" ID="lbDept" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="InputFieldLabel" ID="Label4" runat="server">PINCODE：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="InputFieldText" ID="txPin" TextMode="Password" runat="server"  Width="10em"></asp:TextBox>
                    </div>
                </div>
                <div class="hide">
                    <asp:Label class="InputFieldLabel" ID="Label1" runat="server" CssClass="requirefield" Width="147px">待加簽工作檔路徑：</asp:Label>
                        <asp:TextBox class="InputFieldText" onkeypress="jf_InpNumOnly()" ID="txFilePath" TabIndex="-1" runat="server" CssClass="displayonly" Width="282px">c:\temp\Check</asp:TextBox>
                </div>
                <div style="display: none; overflow: auto;">
                    <asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
                    <asp:CustomValidator ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
                    <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
                    <asp:TextBox ID="txSAMLart" TabIndex="1" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txServerPort" TabIndex="1" runat="server" Width="36px" MaxLength="8" AutoPostBack="True"></asp:TextBox>
                    <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txServerIP" runat="server"></asp:TextBox>
                    <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txFileName" runat="server"></asp:TextBox>
                    <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txServerWebWorkPath" runat="server"></asp:TextBox>
                    <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txServerWorkPath" runat="server"></asp:TextBox>
                    <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txUsername" runat="server"></asp:TextBox>
                    <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txFileNameA" runat="server"></asp:TextBox>
                    <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txUseUserSignature" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_DEPT_STORE" TabIndex="1" runat="server"></asp:TextBox>
                </div>
            </div>

            <div class="DivTable">
                <div class="dTR">
                    <asp:Button AccessKey="C" ID="btSelectClear" runat="server" Width="4.5em" Text="清除(C)" ToolTip="清除(Alt+C)"></asp:Button>
                    <asp:Button AccessKey="A" ID="btSelectAll" runat="server" Width="4.5em" Text="全選(A)" ToolTip="全選(Alt+A)"></asp:Button>
                    <asp:Button AccessKey="N" ID="btSelectInverse" runat="server" Width="4.5em" Text="反向(N)" ToolTip="反向(Alt+N)"></asp:Button>
                    <asp:Label class="InputFieldLabel" ID="lbRowNum" runat="server">筆數：</asp:Label>
                    <asp:TextBox class="InputFieldText" onkeypress="jf_InpNumOnly()" ID="txRowNum" runat="server" Width="2em"></asp:TextBox>
                </div>
                <div class="GridDiv" style="height: 30em">
                    <asp:DataGrid ID="dg1" TabIndex="60" runat="server" CellPadding="1" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                    <asp:TextBox ID="txStorePath" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txSubDir" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txWS" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="點收日時">
                                <ItemTemplate>
                                    <asp:Label ID="lbAcpDateTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="點收人員">
                                <ItemTemplate>
                                    <asp:Label ID="lbAcpEmpName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
                <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btStart" runat="server" Text="執行" AccessKey="S" Title="確定(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            </asp:Panel>
    </form>
</body>
</html>
