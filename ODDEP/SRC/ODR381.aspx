<%@ Page Language="c#" CodeBehind="ODR381.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR381" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>ODR381 郵寄清單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODR381" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">郵寄日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox ID="txPostDateS" TabIndex="10" runat="server" CssClass="RequireFieldNumeric" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">－</asp:Label>
                        <asp:TextBox ID="txPostDateE" TabIndex="20" runat="server" CssClass="RequireFieldNumeric" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label7" runat="server">郵寄時間：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:TextBox ID="txSTime" TabIndex="30" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">－</asp:Label>
                        <asp:TextBox ID="txETime" TabIndex="40" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlTime" TabIndex="50" runat="server" Width="9em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">郵寄方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbTypeAll" runat="server" Text="全部" GroupName="gnType" TabIndex="50"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbTypeSelect" runat="server" Text="指定" GroupName="gnType" TabIndex="50"></asp:RadioButton><br>
                        <div class="DivTable">
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
                                                <asp:TextBox ID="H_PostNo" TabIndex="-1" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:DataGrid>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">受文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgno" TabIndex="50" runat="server" Width="10.5em" MaxLength="60"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="50" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txOrgName" TabIndex="-1" runat="server" CssClass="TextLabel" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
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
                        <asp:RadioButton ID="rbPostType" TabIndex="60" runat="server" GroupName="grp" Text="發文資料優先"></asp:RadioButton>
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
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbRange" runat="server">列印範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAllUser" runat="server" GroupName="PrintRange"
                            Text="全部"></asp:RadioButton>
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
        </div>
        <div style="visibility: hidden; overflow: auto; width: 506px; height: 45px">
            <asp:TextBox ID="h_DeptNo" runat="server" Width="19px"></asp:TextBox>
            <asp:TextBox ID="h_UserId" runat="server" Width="19px"></asp:TextBox>
            <asp:TextBox ID="h_OrgNo" runat="server" Width="21px"></asp:TextBox>
            <asp:Label ID="lbOrgNo" runat="server" Width="9px"></asp:Label>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
