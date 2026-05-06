<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT244.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT244" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT244 表單移交作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT244" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="height: 100px; width: 100px; position: absolute; left: 0px; z-index: -100; top: 0px; visibility: hidden" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style ="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">移交人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUser" runat="server" Width="10.5em" CssClass="KeyUpperField" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btUser" runat="server" CssClass="hide" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txUserName" runat="server" Width="6.5em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style ="width: 5.5em">
                        <asp:Label ID="Label3" runat="server" Width="" CssClass="InputFieldLabel">移交組室：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="10em" CssClass="InputFieldLabel"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style ="width: 5.5em">
                        <asp:Label ID="Label5" runat="server" Width="" CssClass="InputFieldLabel">移交科別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSect" runat="server" Width="10em" CssClass="InputFieldLabel"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style ="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="InputFieldLabel">接管人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTakeUser" runat="server" Width="4em" CssClass="KeyUpperField"></asp:TextBox>
                        <asp:ImageButton ID="btTakeUser" runat="server" CssClass="hide" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txTakeUserName" runat="server" Width="6.5em" CssClass="DisplayOnly"></asp:TextBox>
                        <input style="display: none" id="btSetTakeUser" onclick="fnSetTakeUser()" value="設定" type="button">
                        <asp:TextBox ID="txTakeDeptNo" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txTakeDeptName" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" EnableViewState="False">
                    <asp:Button runat="server" Text="全部選取" ID="btSelectAll" ToolTip="勾選所有的CheckBox"></asp:Button>
                    <asp:Button runat="server" Text="反向選取" ID="btSelectInverse" ToolTip="反向勾選所有的CheckBox"></asp:Button>
                    <asp:Button runat="server" Text="清除選取" ID="btSelectClear" ToolTip="清除勾選所有的CheckBox"></asp:Button>
                </asp:Panel>
                <div class="GridTable" style="height: 12.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" EnableViewState="true"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="申請單號">
                                <ItemTemplate>
                                    <asp:Label ID="lbMsgFromId" runat="server" Width="" CssClass="InputFieldLabel"></asp:Label>
                                    <asp:TextBox ID="txMsgid" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txNOTIFY_INFO" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txSextDay" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txExtDay" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txFlowNO" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txMsgFrom" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:DropDownList ID="dlEnableInfo" runat="server" CssClass="hide"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="" CssClass="InputFieldLabel"></asp:Label>
                                    <asp:TextBox ID="H_txFromSubject" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="移交組室/科別">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server" Width="" CssClass="InputFieldLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="移交人">
                                <ItemTemplate>
                                    <asp:TextBox ID="txEmpName" runat="server" Width="5em" CssClass="TextLabel"></asp:TextBox>
                                    <asp:TextBox ID="H_txOwnouid" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_txOwnRoleid" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="接管人">
                                <ItemTemplate>
                                    <asp:TextBox ID="txTakeName" runat="server" Width="5em" CssClass="TextLabel"></asp:TextBox>
                                    <asp:TextBox ID="txTakeId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txTakeOuid" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txTakeRoleId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txTakeRoleName" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txTakeDeptName" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="說明">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubFolder" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <asp:TextBox ID="H_txSystemList" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_AllValue" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_PrivInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:DropDownList ID="dlFlowList" runat="server" Width="10em" CssClass="hide"></asp:DropDownList>
            <asp:TextBox ID="txTakeRoleNo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txTakeRoleName" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="CurrRoleId" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="查詢(F)" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" AccessKey="F" ToolTip="查詢(ALT+F)"></asp:Button>
            <asp:Button runat="server" Text="預覽待移交表單清單(E)" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview" AccessKey="E" ToolTip="預覽待移交表單清單(ALT+E)"></asp:Button>
            <asp:Button runat="server" Text="移交(M)" DefaultStyle="newmode:none;modifymode:block;" ID="btMove" AccessKey="M" ToolTip="將表單移交給下列所設定之接管人(ALT+M)"></asp:Button>
            <asp:Button runat="server" Text="取消(Z)" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel" AccessKey="Z" ToolTip="取消(ALT+Z)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
