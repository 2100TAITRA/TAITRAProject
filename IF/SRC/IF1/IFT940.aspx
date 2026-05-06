<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>

<%@ Page Language="c#" CodeBehind="IFT940.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFT940" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>IFT940 臨時憑證公文補簽停用作業</title>
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
	<span id="httpObject" ></span>
    <form id="IFT940" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hidden"></asp:ListBox>
            <asp:TextBox  ID="H_txCardCert" runat="server"></asp:TextBox>
            <asp:TextBox  ID="H_txCardUser" runat="server"></asp:TextBox>
            <asp:TextBox  ID="H_Dept" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">臨時憑證擁有者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUserName" runat="server" Width="5em" CssClass="KeyUpperField" MaxLength="20"></asp:TextBox>
                        <asp:DropDownList id="dlUserName" runat="server" CssClass="hide" Width="12em">
                            <asp:ListItem Text="" Value=""></asp:ListItem>
                        </asp:DropDownList>
                        
                        <asp:Label ID="lbEmpName" runat="server" CssClass="RequireField"></asp:Label>
						<asp:Button ID="btSet" runat="server" Text="設定" />
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label2" runat="server">代理還卡：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbProxyReturn" runat="server" Text="是"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="lbReSignReason" runat="server">補簽註記：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txReSignReason" runat="server" Width="6em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD" style="width: 10em">
                        <asp:Panel ID="tbSelect" CssClass="DgSelectToolBar" runat="server">
                            <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                            <asp:Button ID="btSelectInverse" runat="server" Text="反選" />
                            <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                        </asp:Panel>
                    </div>
                </div>
                <div class="GridDiv" style="height: 157px">
                    <asp:DataGrid ID="dgDoc" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="流程編號">
                                <ItemTemplate>
                                    <asp:Label ID="lbMsgId" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                    <asp:Label ID="lbBorDate" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbOrgno" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbComeOthers" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbDocPath" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbWebFileIO" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
            <asp:Button ID="btOpen" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="補簽(S)" title="通知(S)" AccessKey="S" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btStop" runat="server" Text="臨時憑證停用(D)" title="通知(D)" AccessKey="D" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
        <table id="tbOpenMsg" style="z-index: 500; position: absolute; display: none" cellspacing="0" cellpadding="0" border="0">
            <tbody>
                <tr>
                    <td bgcolor="#000040" colspan="3" height="3"></td>
                </tr>
                <tr>
                    <td width="3" bgcolor="#000040"></td>
                    <td bgcolor="#008080"><font color="#ffffff"><b>
                        <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span id="spanMsg"></span>&nbsp;&nbsp;&nbsp;&nbsp;<br>
                        <br>
                    </b></font>
                    </td>
                    <td width="3" bgcolor="#000040"></td>
                </tr>
                <tr>
                    <td bgcolor="#000040" colspan="3" height="3"></td>
                </tr>
            </tbody>
        </table>
    </form>
</body>
</html>
