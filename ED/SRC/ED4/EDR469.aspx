<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EDR469.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR469" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR469 彙辦公文查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR469" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:DropDownList ID="dlDocType" runat="server">
                            <asp:ListItem Value="0">公文文號</asp:ListItem>
                            <asp:ListItem Value="1">母文文號</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDocNo" runat="server" Width="5.5em" MaxLength="10" CssClass="InputUpperFieldText"></asp:TextBox>(起)－
						<asp:TextBox ID="txEDocNo" runat="server" Width="5.5em" MaxLength="10" CssClass="InputUpperFieldText"></asp:TextBox>(迄)
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <cc1:ComboBox ID="dlDept" Style="z-index: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" Style="z-index: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 4em">
                        <asp:Label ID="Label5" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" Style="z-index: 0" runat="server" Width="10em" Rows="10" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:DropDownList ID="dlDateType" runat="server">
                            <asp:ListItem Value="0">收創日期</asp:ListItem>
                            <asp:ListItem Value="1">結案日期</asp:ListItem>
                            <asp:ListItem Value="2">限辦日期</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        &nbsp;─
						<asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label10" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbSorting" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0">母文文號</asp:ListItem>
                            <asp:ListItem Value="1">承辦單位</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server">說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label2" runat="server">查詢結果會將相關併案文號資料一併列出</asp:Label>
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
                            <asp:TemplateColumn HeaderText="母文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbCOM_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="彙辦相關文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收創日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbSTART_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="限辦日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDUE_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="辦結日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbCLOSE_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbOU_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEMP_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_SUBJECT" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
