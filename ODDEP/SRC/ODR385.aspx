<%@ Page Language="c#" CodeBehind="ODR385.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR385" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR385 人工傳遞清單列印作業</title>
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
    <form id="ODR385" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label class="RequireField" ID="Label2" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="10" runat="server" CssClass="RequireFieldNumeric" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txEDate" TabIndex="20" runat="server" CssClass="RequireFieldNumeric" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label1" runat="server">受文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOrg" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server">類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rbType" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0">全部</asp:ListItem>
                            <asp:ListItem Value="1">外送</asp:ListItem>
                            <asp:ListItem Value="2">內送</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR" id="trRange">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbRange" runat="server" Width="5.5em">列印範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAll" runat="server" GroupName="PrintRange" Text="全部"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR" id="trRange2">
                    <div class="dTDTitle" style="width: 6em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbUser" runat="server" GroupName="PrintRange" Text="指定彙整人"></asp:RadioButton>&nbsp;&nbsp;
						<asp:TextBox ID="txUser" runat="server" Width="5em"></asp:TextBox>
                    </div>
                </div>
                <!--
				<div class="dTR">
					<TD align="right" style="WIDTH: 93px">
							<asp:label id="Label30" runat="server">受文者：</asp:label></div>
					<div class="dTD">
							<asp:textbox id="txOrgno" tabIndex="30" runat="server" MaxLength="17" Width="100px" CssClass="InputFieldText"></asp:textbox>
							<asp:imagebutton id="btHelp" tabIndex="50" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton>
							<asp:textbox id="txOrgName" tabIndex="-1" runat="server" CssClass="TextLabel" ForeColor="Navy" ReadOnly="True"></asp:textbox></div>
				</div>
				-->
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <p>
                            <asp:CheckBox ID="cbIncDraft" runat="server" Checked="True" Text="包含抄本受文者"></asp:CheckBox><br>
                            <asp:RadioButton ID="cbAutePage" runat="server" GroupName="a" Text="依受文者自動換頁"></asp:RadioButton>
                            <asp:RadioButton ID="rbAutobyDocNo" runat="server" GroupName="a" Text="依文號自動換頁"></asp:RadioButton>
                        </p>
                    </div>
                </div>
            </div>
            <div style="z-index: 103; left: 168px; visibility: hidden; overflow: auto; width: 459px; top: 202px; height: 195px">
                <asp:TextBox ID="h_UserId" runat="server" Width="20px"></asp:TextBox><asp:TextBox ID="h_OrgNo" runat="server" Width="20px"></asp:TextBox><asp:TextBox ID="h_DeptNo" runat="server" Width="20px"></asp:TextBox>
            </div>
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
