<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR416.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAR416" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR416 檔案卷數統計表列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAR416" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <fieldset style="width: 30em; height: 9em">
                    <legend>列印報表</legend>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em;">
                            <asp:Label ID="Label1" runat="server">歸檔分類：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="ClassType"></asp:RadioButton>(全部列印時，無須輸入起訖號)
                            <br>
                            <asp:RadioButton ID="rbAA" runat="server" Text="專案卷" GroupName="ClassType"></asp:RadioButton>
                            <asp:TextBox ID="txClientCadrNoS" runat="server" Width="4.5em" CssClass="InputFieldNumeric" MaxLength="8"></asp:TextBox>(起)－
                            <asp:TextBox ID="txClientCadrNoE" runat="server" Width="4.5em" CssClass="InputFieldNumeric" MaxLength="8"></asp:TextBox>(訖)
                            <br>
                            <asp:RadioButton ID="rbBB" runat="server" Text="列管卷" GroupName="ClassType"></asp:RadioButton>
                            <asp:TextBox ID="txManageBankNoS" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                            <asp:TextBox ID="txManageCaseNoS" runat="server" Width="3.5em" CssClass="InputFieldNumeric" MaxLength="6"></asp:TextBox>(起)－
                            <asp:TextBox ID="txManageBankNoE" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                            <asp:TextBox ID="txManageCaseNoE" runat="server" Width="3.5em" CssClass="InputFieldNumeric" MaxLength="6"></asp:TextBox>(訖)
                            <br>
                            <asp:RadioButton ID="rbOther" runat="server" Text="雜項卷" GroupName="ClassType"></asp:RadioButton>
                            <asp:TextBox ID="txFileYearS" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                            <asp:TextBox ID="txFileCaseS" runat="server" Width="3.5em" CssClass="InputFieldNumeric" MaxLength="6"></asp:TextBox>(起)－
                            <asp:TextBox ID="txFileYearE" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                            <asp:TextBox ID="txFileCaseE" runat="server" Width="3.5em" CssClass="InputFieldNumeric" MaxLength="6"></asp:TextBox>(訖)
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em;">
                            <asp:Label ID="Label2" runat="server">註記分類：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="dlStoreNo" runat="server">
								<asp:ListItem Value="01">未註記</asp:ListItem>
								<asp:ListItem Value="02">註記1</asp:ListItem>
								<asp:ListItem Value="03">註記2</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btStatistic" runat="server" Text="統計(S)" DefaultStyle="newmode:block;modifymode:block;" AccessKey="S" Title="統計(ALT+S)" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
