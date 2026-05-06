<%@ Page Language="c#" CodeBehind="IFI960.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFI960" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>IFI960 系統憑證查詢作業(正式)</title>
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
    <form id="IFI960" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Customvalidator1" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="Validationsummary2" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 101; position: absolute; top: 217px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator">
        </asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 102; position: absolute; top: 251px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <br>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">申請單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:TextBox ID="txApplyNoS" runat="server" Style="width: 4.5em" CssClass="InputFieldNumeric" MaxLength="8"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server" Text="～"></asp:Label>
                        <asp:TextBox ID="txApplyNoE" runat="server" Style="width: 4.5em" CssClass="InputFieldNumeric" MaxLength="8"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label3" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNewDateS" runat="server" Style="width: 4em" MaxLength="7" CssClass="DatePicker" onblur="CheckDate(this)"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server" Text="～"></asp:Label>
                        <asp:TextBox ID="txNewDateE" runat="server" Style="width: 4em" MaxLength="7" CssClass="DatePicker" onblur="CheckDate(this)"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbOrg" runat="server" Width="114px">所屬機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:DropDownList ID="dlOrgNo" runat="server">
                            <asp:ListItem>二一零零科技</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label5" runat="server">憑證到期日：</asp:Label>
                    </div>

                    <div class="dTD">
                        <asp:TextBox ID="txCertExpDateS" runat="server" Style="width: 5.5em" MaxLength="11" CssClass="InputFieldNumeric" onblur="CheckDate(this)"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server" Text="～"></asp:Label>
                        <asp:TextBox ID="txCertExpDateE" runat="server" Style="width: 5.5em" MaxLength="11" CssClass="InputFieldNumeric" onblur="CheckDate(this)"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">申請人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13em">
                        <asp:TextBox ID="txApplyName" runat="server" Style="width: 10.5em" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label8" runat="server" Text="">憑證狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbApply" runat="server" GroupName="CertStatus" Text="申請審核中" />
                        <asp:RadioButton ID="rbApplyCheck" runat="server" GroupName="CertStatus" Text="申請已核准" />
                        <asp:RadioButton ID="rbApplyRtn" runat="server" GroupName="CertStatus" Text="申請已退回" />
                        <br />
                        <asp:RadioButton ID="rbValid" runat="server" GroupName="CertStatus" Text="憑證已發放" />
                        <asp:RadioButton ID="rbCancel" runat="server" GroupName="CertStatus" Text="憑證已撤銷" />
                        <asp:RadioButton ID="rbAll" runat="server" GroupName="CertStatus" Text="全部" />
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 424px;">
                    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" data-role="table" data-mode="reflow" class="ui-responsive" ShowHeaderWhenEmpty="True" OnRowCommand="GridView1_OnRowCommand">
                        <Columns>
                            <asp:BoundField HeaderText="申請單號" DataField="lbApplyNo" ItemStyle-Width="4.5em" HeaderStyle-Width="4.5em" />
                            <asp:BoundField HeaderText="所屬機關" DataField="lbOrgNo" ItemStyle-Width="12.5em" HeaderStyle-Width="12.5em" />
                            <asp:BoundField HeaderText="申請人" DataField="lbUserName" ItemStyle-Width="3.5em" HeaderStyle-Width="3.5em" />
                            <asp:BoundField HeaderText="申請日期" DataField="lbNewDate" ItemStyle-Width="5.5em" HeaderStyle-Width="5.5em" />
                            <asp:BoundField HeaderText="申請原因" DataField="lbReason" ItemStyle-Width="10.5em" HeaderStyle-Width="10.5em" />
                            <asp:BoundField HeaderText="憑證狀態" DataField="lbStatus" ItemStyle-Width="5.5em" HeaderStyle-Width="5.5em" />
                            <asp:BoundField HeaderText="憑證到期日" DataField="lbExpDate" ItemStyle-Width="5.5em" HeaderStyle-Width="5.5em" />
                            <asp:ButtonField HeaderText="撤銷憑證" DataTextField="lbCancel" ItemStyle-Width="4.5em" HeaderStyle-Width="4.5em" CommandName="aaa" ButtonType="Link" />
                            <asp:BoundField HeaderText="憑證序號" DataField="lbSerialNo" ItemStyle-CssClass="hide" HeaderStyle-CssClass="hide" />
                            <asp:BoundField HeaderText="憑證撤銷日" DataField="lbRevokeDate" ItemStyle-Width="5.5em" HeaderStyle-Width="5.5em"/>
                        </Columns>
                    </asp:GridView>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
