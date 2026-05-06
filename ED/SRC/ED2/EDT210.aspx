<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT210.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT210" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>EDT210 公文調閱權限設定作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT210" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="h_displaydg" Width="20px" runat="server"></asp:TextBox>
            <asp:TextBox ID="h_txOrgNo" Width="20px" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="0" runat="server" Width="20.5em" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <asp:Label ID="Label6" runat="server" CssClass="hide">會辦資訊：</asp:Label>
                <div class="GridDiv" style="height: 5.5em" data-fixed="true">
                    <asp:DataGrid ID="dg1" runat="server" CssClass="hide" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:TextBox ID="txDept" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:Label ID="lbDept" runat="server" Width="100px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:TextBox ID="txUser" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:Label ID="lbUser" runat="server" Width="100px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <div class="DivTable" id="Table1">
                <div class="dTR">
                <asp:Label ID="Label2" runat="server" CssClass="hide">可調閱對象:</asp:Label>
                    <asp:Panel ID="tbSelect" runat="server" Width="23.5em" CssClass="hide" EnableViewState="False">
                        <asp:Button runat="server" Text="全部選取" ID="btSelectAll"></asp:Button>
                        <asp:Button runat="server" Text="反向選取" ID="btSelectInverse"></asp:Button>
                        <asp:Button runat="server" Text="刪除選取" ID="btDeleteSelected"></asp:Button>
                        <asp:Button runat="server" Text="加入會辦人" ID="btAddUser"></asp:Button>
                    </asp:Panel>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 16.5em" data-fixed="true">
                            <asp:DataGrid ID="dgtarget" runat="server" CssClass="hide" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO2" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="可調閱單位">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txOrgNo" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txDeptID" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="lbDept2" TabIndex="-1" runat="server" Width="12.5em" CssClass="TextLabel"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="可調閱人">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txUserID" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="lbUser2" TabIndex="-1" runat="server" CssClass="TextLabel" Width="6.5em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                    <div class="dTD" id="td1" style="width: 21.5em">
                        <div class="DivTable" id="Table2" border="1">
                            <div class="dTR" style="color: navy">
                                <div class="dTD">請點選以加入左方可調閱對象：</div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <frameset cols="*" border="0" rows="*">
                                        <iframe id="TargetNavbar" name="TargetNavbar" width="100%" height="200%"></iframe>
                                    </frameset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p></p>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
