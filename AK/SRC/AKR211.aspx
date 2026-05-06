<%@ Page Language="c#" CodeBehind="AKR211.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR211" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR211 系統逾期未歸通知</title>
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
<body>
    <form id="AKR211" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">列印處室：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" CssClass="comboBox" Width="5.5em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server">輸入報表：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbIns" runat="server" GroupName="gnRpt" Text="逾期未歸檔案件稽催單"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbBor" runat="server" GroupName="gnRpt" Text="逾期未歸還案件稽催單"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbAtt" runat="server" GroupName="gnRpt" Text="附件逾期未歸檔案件稽催單"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server">分頁方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDept" runat="server" GroupName="gnDeptType"></asp:RadioButton><asp:RadioButton ID="rbSect" runat="server" GroupName="gnDeptType"></asp:RadioButton><asp:RadioButton ID="rbUser" runat="server" GroupName="gnDeptType" Text="個人"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label4" runat="server" Visible="False">稽催範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbUnder3" runat="server" GroupName="gnRange" Visible="False"></asp:RadioButton><asp:RadioButton ID="rbOver3" runat="server" GroupName="gnRange" Visible="False"></asp:RadioButton><asp:RadioButton ID="rbAll" runat="server" GroupName="gnRange" Text="全部"
                            Visible="False"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbSearchOwn" runat="server" Text="僅查詢個人公文"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cb341020000A" runat="server" Text="依檔案局建議格式輸出"></asp:CheckBox><asp:TextBox ID="H_Num" TabIndex="-1" runat="server" CssClass="hide" Width="1.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="申請">
                                <ItemTemplate>
                                    <asp:Button ID="btOpenODT230" runat="server" CssClass="hide" Text="申請" Width="4em"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
									<asp:HyperLink ID="hlDocNo" runat="server" CssClass="hide"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案由">
                                <ItemTemplate>
                                    <asp:TextBox ID="txSubject" runat="server" CssClass="PopUp" Width="13.5em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="稽催次數">
                                <ItemTemplate>
                                    <asp:Label ID="lbInsTimes" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="稽催類型">
                                <ItemTemplate>
                                    <asp:Label ID="lbType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦／借調單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦／借調人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="辦畢／結案日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbCloseDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="應歸日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbExtFileDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
