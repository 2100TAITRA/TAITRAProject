<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT257.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT257" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT257 公文專案管制通案審核作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <object id="ocx" style="display: none" classid="CLSID:58278908-D252-46FC-90BE-831E3B9ACB88"
        viewastext>
    </object>
    <base target='_self'>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODT257" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <asp:TextBox ID="H_LAST_UPDATE_PROG" CssClass="hidden" runat="server"></asp:TextBox><asp:TextBox ID="H_LAST_UPDATE_TIME" CssClass="hidden" runat="server"></asp:TextBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 31.5em">
                        <asp:Label ID="Label16" runat="server" Font-Underline="True">公　　文　　專　　案　　申　　請　　單</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">&nbsp;&nbsp;</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" BackColor="LightGray" CssClass="KeyField" 
                            Width="8em" MaxLength="15" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label ID="Label2" runat="server" Width="5.5em">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txTxDate" TabIndex="20"
                            runat="server" BackColor="LightGray" Width="4em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label21" runat="server">申請單單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txApplyNo" runat="server" ReadOnly="True" Width="5em"
                            BackColor="LightGray"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" BackColor="LightGray"
                            Width="32.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label17" runat="server">專案名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCaseName" TabIndex="-1" runat="server" ReadOnly="True"
                            Width="32.5em" BackColor="LightGray"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txRpsDept" TabIndex="-1" runat="server" BackColor="LightGray"
                            Width="10em" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label ID="Label5" runat="server" Width="5.5em">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRpsUser" TabIndex="-1" runat="server" BackColor="LightGray"
                            Width="7em" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox ID="H_DueDate" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label18" runat="server">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txRcvDate" runat="server" ReadOnly="True" Width="4em"
                            BackColor="LightGray"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label ID="Label20" runat="server" Visible="False">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDueDate" runat="server" ReadOnly="True" Width="4em"
                            BackColor="LightGray" Visible="False"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label7" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:DropDownList ID="dlProperty" TabIndex="30" runat="server" Width="9em"
                            Enabled="False" BackColor="#E0E0E0">
                            <asp:ListItem Value="3" Selected="True">專案管制</asp:ListItem>
                            <asp:ListItem Value="9">特殊案件</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label ID="Label8" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlWorkType" TabIndex="30" runat="server" Width="9em"
                            Enabled="False" BackColor="#E0E0E0">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label11" runat="server">本專案申請天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txCurrExDays" TabIndex="20"
                            runat="server" BackColor="LightGray" Width="2em" MaxLength="3" ReadOnly="True"></asp:TextBox><asp:Label ID="Label12" runat="server">天</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label ID="Label15" runat="server">申請後限辦日：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNDueDate" TabIndex="-1" runat="server" ReadOnly="True"
                            Width="4em" BackColor="LightGray"></asp:TextBox>
                        <asp:TextBox ID="H_ApplyNo" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label9" runat="server">申請理由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txExReason" TabIndex="20" runat="server"
                            BackColor="LightGray" Width="32.5em" TextMode="MultiLine" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label10" runat="server">擬定作業時程：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSchedule" runat="server" ReadOnly="True" Width="32.5em" TextMode="MultiLine"
                            BackColor="LightGray"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="TrDgSche">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label14" runat="server" Width="8em">擬定作業時程：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="DivTable">
                            <div class="GridDiv" id="DivDgSche">
                                <asp:DataGrid ID="dgSchedule" runat="server" CssClass="DisplayOnly" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" PageSize="50">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="編號">
                                            <ItemTemplate>
                                                <asp:Label ID="lbSeqWork" runat="server" readonly="readonly" Width="2.5em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="預　定　作　業　事　項">
                                            <ItemTemplate>
                                                <asp:TextBox ID="txPlan" ReadOnly="True" BackColor="LightGray" runat="server" Width="28.5em"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:DataGrid>
                            </div>
                        </div>
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
                    <div class="dTDTitle" style="width: 10em">
                        &nbsp;&nbsp;
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAuditMsg" TabIndex="20" runat="server"
                            Width="32.5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 26.5em">
                        <asp:Label ID="Label6" runat="server" Font-Underline="True" Width="12em">簽　　核　　歷　　程</asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="2" PageSize="50" AutoGenerateColumns="False">
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
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btBack" runat="server" Text="退回" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCommit" runat="server" Text="核可" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
            <asp:Label ID="lbMsg" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="線上瀏覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
