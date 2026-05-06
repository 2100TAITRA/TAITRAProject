<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR440.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR440" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR440 批示錄案追蹤查詢作業</title>
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
    <form id="EDR440" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">批示限辦日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:TextBox ID="txRecordDueDateS" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>～
                        <asp:TextBox ID="txRecordDueDateE" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>～
                        <asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:DropDownList ID="dlDept" runat="server" Width="10.5em"></asp:DropDownList>
                        <asp:DropDownList ID="dlSect" runat="server" Width="10.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:DropDownList ID="dlUser" runat="server" Width="10.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">辦理狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:RadioButton ID="rbRecord" runat="server" Text="追蹤中" GroupName="RecordType"></asp:RadioButton>
                        <asp:RadioButton ID="rbCancel" runat="server" Text="已解除" GroupName="RecordType"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="RecordType"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 16.5em; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號&lt;BR&gt;收創日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbRcvDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="限辦日期&lt;BR&gt;批示限辦日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbDueDate" runat="server"></asp:Label>
                                    <asp:Label ID="lbRecordDueDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="批示長官">
                                <ItemTemplate>
                                    <asp:Label ID="lbRecordName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="批示內容">
                                <ItemTemplate>
                                    <asp:Label ID="lbRecordDesc" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbRecordType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="辦理情形">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlFlowDetails" runat="server">開啟</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="解除追蹤日期&lt;BR&gt;結案日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRecordCancelDate" CssClass="hide" runat="server"></asp:Label>
                                    <asp:HyperLink ID="hlRelease" CssClass="hide" runat="server">解除</asp:HyperLink><br/>
                                    <asp:Label ID="lbCloseDate" CssClass="hide" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <asp:TextBox ID="h_DeptInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_SectInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_UserInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="SectList" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="UserList" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" DefaultStyle="newmode:block;modifymode:none;" ID="btExcel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
