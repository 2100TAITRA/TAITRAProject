<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT358.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDT358" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT358 無稿件公文發文登錄作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="/STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT358" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:Button ID="btAdd" runat="server" Text="Button"></asp:Button>
            <asp:DropDownList ID="dlDocTypeHide" runat="server"></asp:DropDownList><asp:DropDownList ID="dlPostTypeHide" runat="server"></asp:DropDownList>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="8em" CssClass="KeyUpperField" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromSubject" TabIndex="0" runat="server" Width="38.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:TextBox ID="txIssueDate" TabIndex="0" runat="server" Width="4em" CssClass="RequireField" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">發文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txIssueWord" TabIndex="0" runat="server" Width="6.5em" CssClass="RequireField" MaxLength="12"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server" CssClass="RequireField">字第</asp:Label>
                        <asp:TextBox ID="txIssueNo" TabIndex="0" runat="server" Width="8em" CssClass="RequireField" MaxLength="15"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server" CssClass="RequireField">號</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">受文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbAutoCreateOrg" runat="server" Text="自動新增受文者"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbSendMode" runat="server">傳送：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbReturn" runat="server" Text="退回" GroupName="SendMode"></asp:RadioButton>
                        <asp:RadioButton ID="rbArchive" runat="server" Text="歸檔" GroupName="SendMode"></asp:RadioButton>
                        <asp:RadioButton ID="rbNone" runat="server" Text="無" Checked="True" GroupName="SendMode"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="overflow: auto; height: 18.5em">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="本別">
                                <ItemTemplate>
                                    <asp:DropDownList ID="ddlDocType" runat="server" Width="3.5em"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="受文者">
                                <ItemTemplate>
                                    <asp:TextBox ID="txOrgNo" onblur="txOrgNo_onblur();" runat="server" Width="6.5em" CssClass="RequireField"></asp:TextBox>
                                    <asp:ImageButton ID="btHelp" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                                    <asp:TextBox ID="txOrgName" onblur="txOrgName_onblur();" runat="server" Width="10.5em" CssClass="RequireField"></asp:TextBox><br>
                                    <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txPostCode" runat="server" Width="3em" MaxLength="5"></asp:TextBox>
                                    <asp:TextBox ID="txAddress" runat="server" Width="15.5em"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵寄方式">
                                <ItemTemplate>
                                    <asp:DropDownList ID="dgDllSendType" runat="server" Width="7em"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="郵資機">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="彙整">
                                <ItemTemplate>
                                    <asp:CheckBox ID="dgCbIsCombine" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="人工傳遞">
                                <ItemTemplate>
                                    <asp:CheckBox ID="dgCbUserSend" onclick="dgCbUserSend_onclick();" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="發文結案" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
