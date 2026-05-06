<%@ Page Language="c#" CodeBehind="EDR360.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDR360" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR360 郵寄清單列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EDR360" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MTable1" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">郵寄日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.5em">
                        <asp:TextBox ID="txPostDateS" TabIndex="10" runat="server" CssClass="RequireField DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">－</asp:Label>
                        <asp:TextBox ID="txPostDateE" TabIndex="20" runat="server" CssClass="RequireField DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">郵寄時間：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:TextBox ID="txSTime" TabIndex="30" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">－</asp:Label>
                        <asp:TextBox ID="txETime" TabIndex="40" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlTime" TabIndex="50" runat="server" Width="8em"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div id="MTable2" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">郵寄方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbTypeAll" runat="server" Text="全部" GroupName="gnType" TabIndex="50"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbTypeSelect" runat="server" Text="指定" GroupName="gnType" TabIndex="50"></asp:RadioButton><br>
                        <div class="GridDiv" data-fixed="true">
                            <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="0" PageSize="50" AutoGenerateColumns="False" ShowHeader="False">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbPost" TabIndex="50" runat="server" Checked="True"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="郵寄方式">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txMailType" TabIndex="-1" runat="server" CssClass="TextLabel" Width="7.5em" ReadOnly="True"></asp:TextBox>
                                            <asp:TextBox ID="H_PostNo" TabIndex="-1" runat="server" CssClass="hide" Width="1.5em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">受文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgno" TabIndex="50" runat="server" CssClass="InputUpperFieldText" Width="6.5em" MaxLength="17"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="50" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txOrgName" TabIndex="-1" runat="server" CssClass="TextLabel" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">付款方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbPost" runat="server" Text="郵資機" GroupName="gnPay" TabIndex="50"></asp:RadioButton>
                        <asp:RadioButton ID="rbCash" runat="server" Text="現金" GroupName="gnPay" TabIndex="50"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="gnPay" TabIndex="50"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">排序：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbPostSeq" TabIndex="120" runat="server" Text="依郵寄序號" GroupName="grp"></asp:RadioButton>
                        <asp:RadioButton ID="rbPostNo" TabIndex="70" runat="server" Text="依郵寄方式" GroupName="grp"></asp:RadioButton>
                        <asp:RadioButton ID="rbPostType" TabIndex="60" runat="server" Text="發文資料優先" GroupName="grp"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">列印內容：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbDetail" runat="server" Text="顯示明細資料" TabIndex="150"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbType" runat="server" Text="不同郵寄日期要跳頁" TabIndex="160"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbUnit" runat="server" Text="不同郵寄單位要跳頁" TabIndex="160"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbRange" runat="server">列印範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAllUser" runat="server" GroupName="PrintRange" Text="全部"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbUser" runat="server" GroupName="PrintRange" Text="指定彙整人"></asp:RadioButton>&nbsp;						
						<asp:TextBox ID="txUser" runat="server" Width="5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div style="width: 506px; height: 45px; visibility: hidden; overflow: auto">
                <asp:TextBox ID="h_DeptNo" runat="server" Width="19px"></asp:TextBox>
                <asp:TextBox ID="h_UserId" runat="server" Width="19px"></asp:TextBox>
                <asp:TextBox ID="h_OrgNo" runat="server" Width="21px"></asp:TextBox>
                <asp:Label ID="lbOrgNo" runat="server" Width="9px"></asp:Label>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
