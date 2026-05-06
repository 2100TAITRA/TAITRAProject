<%@ Page Language="c#" CodeBehind="EDM004.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM004" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDM004 機關共用流程設定作業</title>
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
    <form id="EDM004" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">流程代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFLOW_NO" onkeyup="ED_jf_CheckFull()" TabIndex="0" runat="server" Width="1.5em" CssClass="ED_KeyField" MaxLength="2"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">流程名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFLOW_NAME" TabIndex="1" runat="server" Width="20.5em" CssClass="RequireField" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">使用單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOU_ID_Name" runat="server" Width="25.5em" TextMode="MultiLine" CssClass="DisplayOnly"></asp:TextBox>
                        <asp:TextBox ID="H_OU_ID" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_OU_Name" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:Button ID="btSet" TabIndex="2" runat="server" Text="設定" CausesValidation="False"></asp:Button>
                        <asp:Button ID="btClear" runat="server" Text="清除" CausesValidation="False"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">簽核類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlFLOW_SIGN_TYPE" TabIndex="3" runat="server">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="P">紙本</asp:ListItem>
                            <asp:ListItem Value="E">線上</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">單位資訊：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:DropDownList ID="dlDept" TabIndex="4" runat="server" Width="9.5em"></asp:DropDownList>
                        <asp:DropDownList ID="dlSect" TabIndex="4" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label7" runat="server">代碼：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox ID="txOuId" runat="server" Width="9.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label8" runat="server">名稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox ID="txOuName" runat="server" Width="9.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">角色資訊：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:DropDownList ID="dlRole" TabIndex="5" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label10" runat="server">代碼：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox ID="txRoleId" runat="server" Width="9.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label11" runat="server">名稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox ID="txRoleName" runat="server" Width="9.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label12" runat="server">人員資訊：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:DropDownList ID="dlUser" TabIndex="6" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label13" runat="server">帳號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox ID="txUserId" runat="server" Width="9.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label14" runat="server">姓名：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox ID="txUserName" runat="server" Width="9.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">異動別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTX_NAME" TabIndex="7" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:Button ID="btAdd" TabIndex="8" runat="server" Text="新增流程" CausesValidation="False"></asp:Button>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" EnableViewState="False" CssClass="DgSelectToolBar">                   
                    <asp:Button runat="server" Text="上移" ID="btUp"></asp:Button>
                    <asp:Button runat="server" Text="下移" ID="btDown"></asp:Button>
                    <asp:Button runat="server" Text="刪除" ID="btDeleteSelected"></asp:Button>
                </asp:Panel>
                <asp:TextBox ID="H_txOU_NAME_Order" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="H_txOU_ID_Order" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="H_txROLE_NAME_Order" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="H_txROLE_ID_Order" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="H_txUSER_NAME_Order" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="H_txUSER_ID_Order" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="H_txTX_NAME_Order" runat="server" CssClass="hide"></asp:TextBox>
                <div class="GridDiv" style="height:10em">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="單位">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbOWN_OU_NAME" TabIndex="0" runat="server" Width="15em"></asp:Label>
                                    <asp:TextBox ID="H_OWN_OU_ID" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="角色">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbOWN_ROLE_NAME" TabIndex="0" runat="server" Width="5em"></asp:Label>
                                    <asp:TextBox ID="H_OWN_ROLE_ID" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="人員">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbOWN_USER_NAME" TabIndex="0" runat="server" Width="5em"></asp:Label>
                                    <asp:TextBox ID="H_OWN_USER_ID" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異動別">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbTX_NAME" TabIndex="0" runat="server" Width="10em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
