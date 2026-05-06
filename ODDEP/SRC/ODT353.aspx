<%@ Page Language="c#" CodeBehind="ODT353.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT353" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT353 發文機關批次新增作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT353" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="20" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="25" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txEDate" TabIndex="30" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="tbSelect">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Button ID="btSelectAll" TabIndex="40" runat="server" Text=" 全選 "></asp:Button>
                    </div>
                    <div class="dTD">
                        <asp:Button ID="btClean" TabIndex="45" runat="server" Text=" 清除 "></asp:Button>
                    </div>
                    <div class="dTD">
                        <asp:Button ID="btReverse" TabIndex="50" runat="server" Text=" 反向 "></asp:Button>
                    </div>
                </div>
                <div style="overflow: auto;height: 20.5em">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="30" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序&lt;BR&gt;選">
                                <ItemTemplate>
                                    <asp:Label ID="lbNo" runat="server"></asp:Label><br>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機關代碼&lt;BR&gt;名稱">
                                <ItemTemplate>
                                    <asp:TextBox ID="txStdId" runat="server" Width="9em" MaxLength="17"></asp:TextBox><br>
                                    <asp:TextBox ID="txOrgName" runat="server" CssClass="TextLabel" Width="9em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="電話&lt;BR&gt;傳真">
                                <ItemTemplate>
                                    <asp:TextBox ID="txTelNo" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox><br>
                                    <asp:TextBox ID="txFaxNo" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="類別&lt;BR&gt;櫃號">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlOrgType" runat="server" Width="5.5em">
                                        <asp:ListItem Value="1">機關</asp:ListItem>
                                        <asp:ListItem Value="2">單位</asp:ListItem>
                                        <asp:ListItem Value="3" Selected="True">公司行號</asp:ListItem>
                                        <asp:ListItem Value="5">個人</asp:ListItem>
                                    </asp:DropDownList><br>
                                    <asp:TextBox ID="txCabinetNo" runat="server" MaxLength="4" Width="2.5em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="聯絡人&lt;BR&gt;郵遞區號">
                                <ItemTemplate>
                                    <asp:TextBox ID="txContactPsn" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox><br>
                                    <asp:TextBox ID="txPostNo" runat="server" Width="3.5em" MaxLength="6"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="Email&lt;BR&gt;地址">
                                <ItemTemplate>
                                    <asp:TextBox ID="txEmail" runat="server" Width="14.5em" MaxLength="40"></asp:TextBox><br>
                                    <asp:TextBox ID="txAddress" runat="server" Width="14.5em" MaxLength="240"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="電子交換&lt;BR&gt;發文方式">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dlElcType" runat="server" Width="7em">
                                        <asp:ListItem Value="T">使用中</asp:ListItem>
                                        <asp:ListItem Value="F">停用</asp:ListItem>
                                        <asp:ListItem Value="0" Selected="True">未電子交換</asp:ListItem>
                                    </asp:DropDownList><br>
                                    <asp:DropDownList ID="dlIssueType" runat="server" Width="7em">
                                        <asp:ListItem Selected="True"></asp:ListItem>
                                        <asp:ListItem Value="1">人工傳遞</asp:ListItem>
                                        <asp:ListItem Value="2">郵寄</asp:ListItem>
                                        <asp:ListItem Value="3">電子交換</asp:ListItem>
                                    </asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="搜索" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="儲存" ID="btSave"></asp:Button>
        </asp:Panel>
        
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
