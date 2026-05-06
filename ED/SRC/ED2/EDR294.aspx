<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR294.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR294" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR294 未處理公文查詢列印作業</title>
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
    <form id="EDR294" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 112px; height: 192px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_OD_FLOW_TYPE" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_FromDept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_FromDept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_FromSect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_FromSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_RcvDept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_RcvDept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_RcvSect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_RcvSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlFromSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlRcvSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox Style="z-index: 0" ID="H_Url" runat="server" CssClass="hide"></asp:TextBox>
            <asp:DropDownList Style="z-index: 0" ID="H_dlTrans" runat="server" CssClass="hide"></asp:DropDownList>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">指定時限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTime" runat="server" Width="2em" CssClass="RequireFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:RadioButton ID="rbDay" runat="server" Text="天" GroupName="Time"></asp:RadioButton>
                        <asp:RadioButton ID="rbHour" runat="server" Text="時" GroupName="Time"></asp:RadioButton>
                        <asp:RadioButton ID="rbMin" runat="server" Text="分" GroupName="Time"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">送文單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlFromDept" TabIndex="30" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>&nbsp;&nbsp;
                        <cc1:ComboBox ID="dlFromSect" TabIndex="30" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">收文單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlRcvDept" TabIndex="30" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>&nbsp;&nbsp;
                        <cc1:ComboBox ID="dlRcvSect" TabIndex="30" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">收文人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="30" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 17.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label><br>
                                    <asp:HyperLink ID="hlView" runat="server" CssClass="TextLabel">流程</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送文單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromDept" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送文人">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromUser" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送文時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="送文別">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromType" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDept" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文人">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvUser" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="未處理時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
