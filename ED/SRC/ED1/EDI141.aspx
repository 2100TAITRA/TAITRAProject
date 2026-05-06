<%@ Page Language="c#" CodeBehind="EDI141.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDI141" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDI141 個人化預排流程查詢作業</title>
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
    <form id="EDI141" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_PrivInfo" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_DlValue" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">簽核類別：</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:RadioButton id="rbSignTypeE" runat="server" Text="線上簽核" GroupName="SignType" onclick="fnGetdlUnit('Change');"></asp:RadioButton>
						<asp:RadioButton id="rbSignTypeP" runat="server" Text="紙本簽核" GroupName="SignType" onclick="fnGetdlUnit('Change');"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">帳號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUserId" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireUpperField" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btUser" TabIndex="0" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txUserName" TabIndex="-1" runat="server" Width="10.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlUnit" runat="server" Width="15.5em" CssClass="RequireField">
                        </asp:DropDownList>
                        <asp:Button ID="btNew" runat="server" Text="新增預排流程"></asp:Button>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 14.5em; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="預排流程名稱">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlLink" TabIndex="0" runat="server" CssClass="InputFieldLabel"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="預設流程">
                                <ItemTemplate>
                                    <asp:Label ID="lbDefault" runat="server"></asp:Label>
                                    <asp:TextBox Style="z-index: 0" ID="H_FlowSetSeq" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox Style="z-index: 0" ID="H_OUID" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox Style="z-index: 0" ID="H_RoleID" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox Style="z-index: 0" ID="H_USERNAME" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="搜尋" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
