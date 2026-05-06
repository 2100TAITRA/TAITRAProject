<%@ Page Language="c#" CodeBehind="EDR200.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR200" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR200 公文辦理成績統計表列印作業</title>
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
    <form id="EDR200" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Right" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_OrgNo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_UnitCode" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_UserId" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_DateS" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_DateE" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_RowNo" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">統計區間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rd1" runat="server" Width="4.5em" Text="年度：" GroupName="select" Checked="True"></asp:RadioButton>
                        <asp:TextBox ID="txYear" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server">區間：</asp:Label>
                        <asp:DropDownList ID="dlTime" runat="server">
                            <asp:ListItem Value="year">年報表</asp:ListItem>
                            <asp:ListItem Value="first_season">第一季</asp:ListItem>
                            <asp:ListItem Value="second_season">第二季</asp:ListItem>
                            <asp:ListItem Value="third_season">第三季</asp:ListItem>
                            <asp:ListItem Value="fourth_season">第四季</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px"></div>
                    <div class="dTD">
                        <asp:RadioButton ID="rd2" runat="server" Width="6.5em" Text="自訂區間：" GroupName="select"></asp:RadioButton>
                        <asp:TextBox ID="txStartyear" runat="server" Width="4em" MaxLength="7" CssClass="DisplayOnly"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">－</asp:Label>
                        <asp:TextBox ID="txEndyear" runat="server" Width="4em" MaxLength="7" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">報表格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlReport" runat="server" Width="12.5em">
                            <asp:ListItem Value="group_dept_nochange">依承辦單位分組、不換頁</asp:ListItem>
                            <asp:ListItem Value="group_dept_change">依承辦單位分組、換頁</asp:ListItem>
                            <asp:ListItem Value="sort_user">不分組、依承辦人排序</asp:ListItem>
                            <asp:ListItem Value="sort_count">不分組、依件數排序</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 6.3em" data-fixed="true">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位或承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbUnitorUser" runat="server" Width="126px"></asp:Label>
                                    <asp:TextBox ID="H_Code" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_Type" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_NAME" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="執行">
                                <ItemTemplate>
                                    <asp:Button ID="btSet" runat="server" Width="3em" Text="設定"></asp:Button>&nbsp;
									<asp:Button ID="btClean" runat="server" Width="3em" Text="清除"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 15.5em">
                    <asp:DataGrid ID="dg2" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemTemplate>
                                    <asp:TextBox ID="H_USERNAME" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:HyperLink ID="hlUser" runat="server" Width="4.5em"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="件數">
                                <ItemTemplate>
                                    <asp:Label ID="lbCount" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="預期點數">
                                <ItemTemplate>
                                    <asp:Label ID="lbExScore" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="實際點數">
                                <ItemTemplate>
                                    <asp:Label ID="lbFinalScore" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="查詢" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" Text="列印" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
