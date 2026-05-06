<%@ Page Language="c#" CodeBehind="ODT231.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT231" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT231 公文延後歸檔審核作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <object id="ocx" style="display: none" classid="CLSID:58278908-D252-46FC-90BE-831E3B9ACB88"
        viewastext>
    </object>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODT231" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox class="KeyUpperField" ID="txDocNo" TabIndex="-1" runat="server" MaxLength="15" Width="5.5em"
                            ReadOnly="True" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label class="RequireField" ID="Label2" runat="server" Width="10em">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_InpNumOnly(e)" Style="ime-mode: disabled" ID="txTxDate" TabIndex="-1"
                            runat="server" MaxLength="7" Width="4em" ReadOnly="True" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label10" runat="server">申請單單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txExtNo" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="5em" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label12" runat="server" Width="5.5em">申請延後次別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExtTimes" TabIndex="20" ReadOnly="True" runat="server" Width="2em" MaxLength="3" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" Width="32.5em"
                            ReadOnly="True" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txRpsDept" TabIndex="-1" runat="server" Width="10em"
                            ReadOnly="True" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label5" runat="server" Width="5.5em">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRpsUser" TabIndex="-1" runat="server" Width="7em"
                            ReadOnly="True" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label6" runat="server">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txRcvDate" TabIndex="-1" runat="server" Width="4em"
                            ReadOnly="True" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label8" runat="server">辦理時限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txLimitDate" TabIndex="-1" runat="server" Width="4em"
                            ReadOnly="True" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label7" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txCloseDate" TabIndex="-1" runat="server" Width="4em"
                            ReadOnly="True" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label18" runat="server">應歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExtFileDate" TabIndex="-1" runat="server" Width="4em"
                            ReadOnly="True" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label14" runat="server">本次申請延後天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15.5em">
                        <asp:TextBox ID="txExtDay" ReadOnly="True" TabIndex="-1" MaxLength="3" runat="server" Width="2em" BackColor="#E0E0E0"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label11" runat="server">預計歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_InpNumOnly(e)" Style="ime-mode: disabled" ID="txCurrExDays" TabIndex="-1"
                            runat="server" MaxLength="7" Width="4em" ReadOnly="True" BackColor="#E0E0E0"></asp:TextBox>
                        <asp:TextBox ID="h_UpdateF" TabIndex="-1" runat="server" CssClass="hidden" Width="40px"></asp:TextBox>
                        <asp:TextBox ID="hData_OrgCode" TabIndex="-1" runat="server" CssClass="hidden" Width="45px"></asp:TextBox>
                        <asp:TextBox ID="hData_OrgName" TabIndex="-1" runat="server" CssClass="hidden" Width="37px"></asp:TextBox>
                        <asp:TextBox ID="hData_RoleCode" TabIndex="-1" runat="server" CssClass="hidden" Width="35px"></asp:TextBox>
                        <asp:TextBox ID="hData_RoleName" TabIndex="-1" runat="server" CssClass="hidden" Width="43px"></asp:TextBox>
                        <asp:TextBox ID="hData_UserCode" TabIndex="-1" runat="server" CssClass="hidden" Width="26px"></asp:TextBox>
                        <asp:TextBox ID="hData_UserName" TabIndex="-1" runat="server" CssClass="hidden" Width="45px"></asp:TextBox>
                        <asp:TextBox ID="hApplyEmpName" TabIndex="-1" runat="server" CssClass="hide" Width="40px"></asp:TextBox>
                        <asp:TextBox ID="hApplyDeptName" TabIndex="-1" runat="server" CssClass="hide" Width="40px"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label13" runat="server">延後歸檔原因：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExReason" TabIndex="-1" runat="server" Width="32.5em"
                            ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="txODT230_EXP1" runat="server">說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="txODT230_EXP" runat="server" Width="32.5em"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label19" runat="server">審核意見：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPhraseNo" runat="server" Width="10em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:TextBox ID="txAuditMsg" TabIndex="10" runat="server" Width="32.5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server" Width="1em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="審核時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditTime" runat="server" Width="7.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="審核主管">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditor" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="審核意見">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditMsg" runat="server" Width="25em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btBack" runat="server" Text="退回" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCommit" runat="server" Text="核可" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
            <asp:Label ID="lbMsg" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSearchFlow" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="線上瀏覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
