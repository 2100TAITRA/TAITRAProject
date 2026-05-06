<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI050.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDI050" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI050 そゅゅ絏琩高穨</title>
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
    <form id="EDI050" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbNo" runat="server">ゅ絏</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txKeyFld" TabIndex="0" runat="server" Width="2em" onkeyup="ED_jf_CheckFull()" CssClass="ED_InpField" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbName" runat="server">ゅ嘿</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocName" TabIndex="1" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbInnerNo" runat="server">ず场絏</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txInnerNo" onkeyup="ED_jf_CheckFull()" CssClass="ED_InpField" TabIndex="2" runat="server" Width="1.5em" MaxLength="2"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbInnerName" runat="server">ず场嘿</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txInnerName" TabIndex="3" runat="server" Width="10.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height:11em">
                        <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                            <Columns>
                                <asp:TemplateColumn HeaderText="">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="ゅ絏">
                                    <ItemTemplate>
                                        <asp:HyperLink ID="hlKeyFld" TabIndex="0" runat="server"></asp:HyperLink>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="ゅ嘿">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDocName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="ず场絏">
                                    <ItemTemplate>
                                        <asp:Label ID="lbInnerNo2" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="ず场嘿">
                                    <ItemTemplate>
                                        <asp:Label ID="lbInnerName2" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="箇砞絏">
                                    <ItemTemplate>
                                        <asp:Label ID="lbDfNo" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" style="display:none" Text="穓碝" ID="btSearch" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
