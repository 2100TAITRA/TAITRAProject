<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR245.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR245" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR245 內部行文查詢作業</title>
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
    <form id="EDR245" onkeyup="jf_CheckFull();" method="post" runat="server">
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
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">來文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:TextBox ID="txFromNoS" runat="server" MaxLength="10" Width="5.5em" CssClass="InputUpperFieldText"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">－</asp:Label>
                        <asp:TextBox ID="txFromNoE" runat="server" MaxLength="10" Width="5.5em" CssClass="InputUpperFieldText"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label8" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateS" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">－</asp:Label>
                        <asp:TextBox ID="txRcvDateE" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:TextBox ID="txFromDateS" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server">－</asp:Label>
                        <asp:TextBox ID="txFromDateE" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label4" runat="server">收件單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label12" runat="server">來文單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <cc1:ComboBox ID="dlFromUnit" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server">收件單位承辦人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" runat="server" Width="10.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">歸檔別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:RadioButton ID="rbStoreAll" runat="server" GroupName="rbStore" Text="全部" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbStoreY" runat="server" GroupName="rbStore" Text="已歸檔"></asp:RadioButton>
                        <asp:RadioButton ID="rbStoreN" runat="server" GroupName="rbStore" Text="未歸檔"></asp:RadioButton>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server">是否註紀核判紀錄：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbSignRecordAll" runat="server" GroupName="rbSignRecord" Text="全部" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbSignRecordY" runat="server" GroupName="rbSignRecord" Text="是"></asp:RadioButton>
                        <asp:RadioButton ID="rbSignRecordN" runat="server" GroupName="rbSignRecord" Text="否"></asp:RadioButton>
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
                            <asp:TemplateColumn HeaderText="來文號-支號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRCV_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人員">
                                <ItemTemplate>
                                    <asp:Label ID="lbEMP_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_SUBJECT" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="核判紀錄">
                                <ItemTemplate>
                                    <asp:Label ID="lbSIGN_RECORD" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="歸檔日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbSTORE_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="單位檔號">
                                <ItemTemplate>
                                    <asp:Label ID="lbOU_STORE_NAME" runat="server"></asp:Label>
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
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
