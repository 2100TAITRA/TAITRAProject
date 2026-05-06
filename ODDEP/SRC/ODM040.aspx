<%@ Page Language="c#" CodeBehind="ODM040.aspx.cs" AutoEventWireup="false" Inherits="OD.ODM040" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODM040 線上申請分派設定作業</title>
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
    <form id="ODM040" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label5" runat="server">申請類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:dropdownlist id="dlApplyType" class="KeyField" tabIndex="35" runat="server"  ></asp:dropdownlist>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">單位名稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" CssClass="comboBox KeyField" Width="9.5em"></cc1:ComboBox>
                        <asp:TextBox ID="H_Dept" TabIndex="-1" runat="server" CssClass="hide" Width="17px" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox ID="H_DeptChange" TabIndex="-1" runat="server" CssClass="hide" Width="17px" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTD" id="tddlsect">
                        <cc1:ComboBox ID="dlSect" TabIndex="10" runat="server" CssClass="comboBox KeyField" Width="9.5em"></cc1:ComboBox>
                        <asp:TextBox ID="H_Sect" TabIndex="-1" runat="server" CssClass="hide" Width="17px" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox ID="H_SectChange" TabIndex="-1" runat="server" CssClass="hide" Width="17px" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label2" runat="server">作業角色：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlRole" TabIndex="20" runat="server" CssClass="comboBox KeyField " Width="9.5em"></cc1:ComboBox>
                        <asp:TextBox ID="H_Role" TabIndex="-1" runat="server" CssClass="hide" Width="17px" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox ID="H_RoleChange" TabIndex="-1" runat="server" CssClass="hide" Width="17px" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label3" runat="server">作業人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="30" runat="server" CssClass="KeyField comboBox" Width="9.5em"></cc1:ComboBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="Table1">
                <div class="dTR">
                    <div class="dTD" style="width:10.5em">
                        <asp:Label ID="lb1" runat="server" Visible="False">負責作業範圍：</asp:Label>
                        <div class="GridDiv" style="height: 12.5em; overflow: auto">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cb1" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="單位名稱">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txUnitName" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="9.5em" ReadOnly="True"></asp:TextBox>
                                            <asp:TextBox ID="txUnitNo" TabIndex="-1" runat="server" CssClass="hide" Width="10px" ReadOnly="True"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                    <div class="dTD" style="width:1.5em; min-height:1px">
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label4" runat="server" Visible="False">已設定之單位：</asp:Label>
                        <table id="tCkeckOu" style="width: 260px; display: none">
                            <tr class="dTR">
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <asp:DropDownList ID="ddlCkeckOu" runat="server" CssClass="hide"></asp:DropDownList>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
