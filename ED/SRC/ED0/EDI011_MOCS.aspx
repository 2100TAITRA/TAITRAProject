<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI011_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDI011_MOCS" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI011_MOCS 銓審整合發文檔案檢視作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDI011_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_WORKSTURL" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_WORKSTPATH" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="受文者名稱">
                                <ItemTemplate>
                                    <asp:Label ID="lbOrgName" runat="server"></asp:Label>
                                    <asp:TextBox ID="H_DI_Name" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_SW_Name" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_SEQ_NO" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="檢視">
								<ItemTemplate>
									<asp:Button ID="btIssueImg" runat="server" Text="開啟"></asp:Button>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="原始檔下載">
								<ItemTemplate>
									<asp:Button ID="btDownload" runat="server" Text="下載"></asp:Button>
								</ItemTemplate>
							</asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
