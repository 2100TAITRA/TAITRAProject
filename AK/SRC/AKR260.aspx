<%@ Page Language="c#" CodeBehind="AKR260.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR260" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR260 そゅ翴Μ钵盽爹癘计秖参璸</title>
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
    <form id="AKR260" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="Table1" class="DivTable">
                <fieldset style="width: 26em; height: 7.5em">
                    <legend>厨</legend>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:RadioButton ID="rbMonth" TabIndex="5" runat="server" GroupName="GN" Text="る厨" Width="6em"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label1" runat="server" Width="5.5em">る</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txSDate" TabIndex="10" runat="server" CssClass="InputFieldNumeric" Width="3em" MaxLength="5"></asp:TextBox>⌒
							<asp:TextBox ID="txEDate" TabIndex="20" runat="server" CssClass="InputFieldNumeric" Width="3em" MaxLength="5"></asp:TextBox>(ΑYYYMM)
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:RadioButton ID="rbYear" TabIndex="25" runat="server" GroupName="GN" Text="厨" Width="6em"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label2" runat="server" Width="5.5em"></asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txYear" TabIndex="30" runat="server" CssClass="InputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div id="Table2" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server" Width="5.5em">┯快虫</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUnit" runat="server" CssClass="comboBox" Width="6.5em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR" id="drPrintLv">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" Width="5.5em">よΑ</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDept" TabIndex="50" runat="server" GroupName="gp" Text=""></asp:RadioButton>
                        <asp:RadioButton ID="rbSect" TabIndex="53" runat="server" GroupName="gp" Text=""></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div id="Table3" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label ID="lbMaxYear" runat="server">ヘ玡程参璸る88888る</asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical"></asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btStatic" runat="server" Text="参璸(S)" Accesskey = "S" Title = "参璸(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
