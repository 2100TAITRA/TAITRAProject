<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EDR450.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR450" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR450 交辦議案件列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR450" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox Style="z-index: 0" ID="H_Dept_Value" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Sect_Value" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_User_Value" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Dept" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Sect" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_User" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_dlUser_Value" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_dlSect_Value" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_OU_ID" runat="server"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_SEC_NO" runat="server"></asp:TextBox>
            <cc1:ComboBox ID="dlSect" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
            <cc1:ComboBox ID="dlUser" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">案件編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox ID="txASSIGN_NOS" TabIndex="0" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                        <asp:Label ID="Label13" runat="server">～</asp:Label>
                        <asp:TextBox ID="txASSIGN_NOE" TabIndex="0" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label14" runat="server">交辦日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txASSIGN_DATES" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label15" runat="server">～</asp:Label>
                        <asp:TextBox ID="txASSIGN_DATEE" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                      <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label16" runat="server">來文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox ID="txFROM_NOS" TabIndex="0" runat="server" Width="10em" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label17" runat="server">～</asp:Label>
                        <asp:TextBox ID="txFROM_NOE" TabIndex="0" runat="server" Width="10em" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFROM_ORG" runat="server" Width="21.5em" MaxLength="30"></asp:TextBox>
                    </div>            
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label19" runat="server">來文事由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23.5em">
                        <asp:TextBox ID="txFROM_SUBJECT" TabIndex="0" runat="server" Width="21.5em" MaxLength="30"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label20" runat="server">開會日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMEET_DATES" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label21" runat="server">～</asp:Label>
                        <asp:TextBox ID="txMEET_DATEE" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOther" TabIndex="0" runat="server" Width="8em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">交辦指示：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txASSIGN_INFO" runat="server" Width="21.5em" MaxLength="30"></asp:TextBox>
                    </div>  
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCLOSE_DATES" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">～</asp:Label>
                        <asp:TextBox ID="txCLOSE_DATEE" TabIndex="0" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">類型：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:RadioButton ID="rbPType1" runat="server" GroupName="rbPType" Text="交辦清單" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbPType2" runat="server" GroupName="rbPType" Text="辦理情形清單"></asp:RadioButton>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbPageByDept" runat="server" Text="報表依單位分頁"></asp:CheckBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案件編號">
                                <ItemTemplate>
                                <asp:HyperLink ID="hlASSIGN_NO" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="交辦(議)日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbASSIGN_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關&lt;BR&gt;來文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_ORG" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbFROM_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="開會日期&lt;BR&gt;來文事由">
                                <ItemTemplate>
                                    <asp:Label ID="lbMEET_DATE" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbFROM_SUBJECT" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位/機關">
                                <ItemTemplate>
                                    <asp:Label ID="lbASSIGN_OU_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="交辦指示">
                                <ItemTemplate>
                                    <asp:Label ID="lbASSIGN_INFO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" Accesskey = "O" Title = "匯出Excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
