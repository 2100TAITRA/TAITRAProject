<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFT920.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFT920" %>

<!DOCTYPE HTML >
<html>
<head>
    <title>IFT920 憑證還卡作業</title>
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
    <form id="IFT920" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hidden"></asp:ListBox>
            <asp:TextBox ID="hUserName" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txCardInfo" runat="server" CssClass="hidden"></asp:TextBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label2" runat="server">代理還卡：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em;">
                        <asp:CheckBox ID="cbProxyReturn" runat="server" Text="是"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="lbReSignReason" runat="server">補簽註記：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em;">
                        <asp:TextBox ID="txReSignReason" runat="server">本人補簽</asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD" style="width: 12em;">
                        <asp:Label ID="Label7" runat="server" Font-Bold="True" BackColor="DimGray" ForeColor="White">未歸還卡片紀錄</asp:Label>
                    </div>
                </div>
                <div class="GridDiv" style="height: 200px" data-fixed="true">
                    <asp:DataGrid ID="dgCard" runat="server" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False" PageSize="8">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO1" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="註記歸還">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbReturn" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="卡片編號">
                                <ItemTemplate>
                                    <asp:Label ID="lbCardNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="借出日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbBrDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="借卡原因">
                                <ItemTemplate>
                                    <asp:Label ID="lbBrReason" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD" style="width: 12em;">
                        <asp:Label ID="Label6" runat="server" Font-Bold="True" BackColor="DimGray" ForeColor="White">待補簽公文紀錄</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD" style="width: 12em;">
                        <asp:Panel ID="tbSelect" CssClass="DgSelectToolBar" runat="server">
                            <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                            <asp:Button ID="btSelectInverse" runat="server" Text="反選" />
                            <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                        </asp:Panel>
                    </div>
                </div>
                <div class="GridDiv" style="height: 400px">
                    <asp:DataGrid ID="dgDoc" runat="server" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False" PageSize="8">
                        <Columns>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO2" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="流程編號">
                                <ItemTemplate>
                                    <asp:Label ID="lbMsgId" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server"></asp:Label>
                                    <asp:Label ID="lbBorDate" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="lbBorReason" runat="server" CssClass="hide"></asp:Label>
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
            <asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
                <asp:Button ID="btOpen" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btAccess" runat="server" Text="讀取憑證(S)" title="讀取憑證(S)" AccessKey="S" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btSave" runat="server" Text="確認還卡(D)" title="確認還卡(D)" AccessKey="D" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            </asp:Panel>
            <table style="z-index: 500; position: absolute; display: none" id="tbOpenMsg" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td bgcolor="#000040" height="3" colspan="3"></td>
                    </tr>
                    <tr>
                        <td bgcolor="#000040" width="3"></td>
                        <td bgcolor="#008080">
                            <font color="#ffffff">
								<b>
									<br>&nbsp;&nbsp;&nbsp;&nbsp;<span id="spanMsg"></span>&nbsp;&nbsp;&nbsp;&nbsp;<br><br>
								</b>
							</font>
                        </td>
                        <td bgcolor="#000040" width="3"></td>
                    </tr>
                    <tr>
                        <td bgcolor="#000040" height="3" colspan="3"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </form>
</body>
</html>
