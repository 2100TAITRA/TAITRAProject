<%@ Page Language="c#" CodeBehind="ODR131.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR131" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR131 會簽公文查詢列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="LIB/AK.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR131" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" Width="6.5em" CssClass="comboBox" MaxLength="20"></cc1:ComboBox>
                        <asp:TextBox ID="H_Change" TabIndex="-1" runat="server" CssClass="hide" Width="16px"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server">承辦人：</asp:Label>
                    </div>
                    <div>
                        <cc1:ComboBox ID="dlUser" TabIndex="20" runat="server" Width="8.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label4" runat="server">會簽類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbType1" TabIndex="22" runat="server" Text="外陳" Checked="True"></asp:CheckBox>
                        <asp:CheckBox ID="cbType2" TabIndex="22" runat="server" Text="外會" Checked="True"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:DropDownList ID="dlDateType" TabIndex="30" runat="server" Width="8.5em"></asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="33" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">(起)－</asp:Label>
                        <asp:TextBox ID="txEDate" TabIndex="37" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">(迄)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label9" runat="server">上級機關發文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:TextBox ID="txUpIssueNo" TabIndex="37" runat="server" Width="7.5em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:CheckBox ID="cbCond1" TabIndex="40" runat="server" Text="已回文"></asp:CheckBox>
                        <asp:CheckBox ID="cbCond2" TabIndex="40" runat="server" Text="未回文" Checked="True"></asp:CheckBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label6" runat="server">公文性質：</asp:Label>
                    </div>
                    <div>
                        <asp:DropDownList ID="dlProperty" TabIndex="57" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label5" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromSubject" TabIndex="60" runat="server" Width="25.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide" Width="2px"></asp:ListBox>

            <div class="DivTable">
                <div class="dTR">
                    <div id="Table1">
                        <asp:Panel ID="dgTool" runat="server" CssClass="dTD DgSelectToolBar">
                            <asp:Button ID="btAll" runat="server" Text="全選"></asp:Button>
                            <asp:Button ID="btClean" runat="server" Text="清除"></asp:Button>
                            <asp:Button ID="btChange" runat="server" Text="反向"></asp:Button><br>
                        </asp:Panel>
                    </div>
                </div>
                <div class="dTR">
                    <div class="GridDiv" style="height: 15em">
                        <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbNo" runat="server" CssClass="TextLabel" Width=""></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="註記">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbMark" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="公文文號">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦單位">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="主旨">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSubject" CssClass="PopUp" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="會簽類別">
                                    <ItemTemplate>
                                        <asp:Label ID="lbCategory" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="會簽機關">
                                    <ItemTemplate>
                                        <asp:Label ID="lbOrg" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="目前狀態">
                                    <ItemTemplate>
                                        <asp:Label ID="lbCondition" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="送出日期">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSendDate" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="回文日期">
                                    <ItemTemplate>
                                        <asp:Label ID="lbReturnDate" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="天數">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDays" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="備註">
                                    <ItemTemplate>
                                        <asp:Label ID="lbNote" CssClass="PopUp" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="搜索" DefaultStyle="newmode:block;modifymode:block;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 13px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
