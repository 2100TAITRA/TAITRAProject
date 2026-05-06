<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT256.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT256" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT256 公文專案管制通案申請作業</title>
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
    <form id="ODT250_FDA" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        &nbsp;&nbsp; 
                        <asp:Label class="KeyField" ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" CssClass="KeyEnUpperField" MaxLength="10" Width="5.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label4" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyDate" TabIndex="-1" runat="server" MaxLength="7" CssClass="InputFieldNumeric"
                            Width="4em" BackColor="LightGray" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label18" runat="server">申請單單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txApplyNo" runat="server" Width="5em" BackColor="LightGray" CssClass="InputFieldNumeric"
                            ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label2" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32.5em">
                        <asp:TextBox ID="txSubject" runat="server" Width="32.5em" ReadOnly="True"
                            BackColor="LightGray" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label11" runat="server">專案名稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32.5em">
                        <asp:TextBox ID="txCaseName" TabIndex="15" runat="server" Width="32.5em"
                            MaxLength="120"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txDeptName" runat="server" Width="16em" ReadOnly="True"
                            BackColor="LightGray"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label8" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUserName" runat="server" Width="7em" ReadOnly="True" BackColor="LightGray"></asp:TextBox>
                        <asp:TextBox ID="H_ApplyNo" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                        <asp:TextBox ID="H_Status" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label5" runat="server">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txRcvDate" runat="server" Width="4em" ReadOnly="True"
                            BackColor="LightGray"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label9" runat="server" Visible="False">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDueDate" runat="server" Width="4em" ReadOnly="True"
                            BackColor="LightGray" Visible="False"></asp:TextBox>
                        <asp:TextBox ID="H_WorkType" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label13" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:DropDownList ID="dlProperty" TabIndex="30" runat="server" Width="9em">
                            <asp:ListItem Value="3" Selected="True">專案管制</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label14" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlWorkType" TabIndex="30" runat="server" Width="9em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label6" runat="server">本專案申請天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txApplyDay" TabIndex="40" runat="server" Width="3em" CssClass="InputFieldNumeric"
                            MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label12" runat="server">天</asp:Label><asp:label id="lbApplyDayMsg" runat="server"></asp:label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label10" runat="server">申請後限辦日：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNDueDate" runat="server" Width="4.5em" BackColor="LightGray"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label7" runat="server">申請理由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32.5em">
                        <asp:DropDownList ID="dlPhraseNo" runat="server" Width="12em" CssClass="hide"></asp:DropDownList>
                        <asp:CheckBoxList ID="cblReason" runat="server" Font-Size="11" RepeatColumns="2" RepeatDirection="Horizontal"></asp:CheckBoxList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:TextBox ID="txReason" TabIndex="60" runat="server" Width="32.5em" TextMode="MultiLine"
                            CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label15" runat="server">擬定作業時程：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSchedule" runat="server" Width="32.5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="TrDgSche">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label17" runat="server">預定作業時程：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="DivTable" id="DivDgSche">
                            <div class="GridDiv">
                                <asp:DataGrid ID="dgSchedule" runat="server" CssClass="DisplayOnly" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="編號">
                                            <ItemTemplate>
                                                <asp:Label ID="lbSeqWork" runat="server" readonly="readonly" Width="2.5em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="預　定　作　業　事　項">
                                            <ItemTemplate>
                                                <asp:TextBox ID="txPlan" runat="server" Width="22em"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="進度起">
                                            <ItemTemplate>
                                                <asp:TextBox ID="txDateS" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="進度訖">
                                            <ItemTemplate>
                                                <asp:TextBox Style="z-index: 0" ID="txDateE" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
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
                        <asp:Label ID="Label19" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32.5em">
                        <asp:Label ID="lbStatus" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
            <div class="DivTable">
                <div class="GridDiv" style="height: 300px; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="審核時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditTime" runat="server" Width="7.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="審核主管">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditor" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="審核意見">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditMsg" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除申請" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCheck" runat="server" Text="確認" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:TextBox ID="H_txSourceOrgNo" Style="z-index: 105; position: absolute; top: 453px; left: 12px"
            runat="server" CssClass="hidden" Width="42px"></asp:TextBox>
        <asp:TextBox ID="H_txIncHd" Style="z-index: 106; position: absolute; top: 453px; left: 62px"
            runat="server" CssClass="hidden" Width="40px"></asp:TextBox>
        <asp:TextBox ID="H_txDueRule" Style="z-index: 106; position: absolute; top: 453px; left: 62px"
            runat="server" CssClass="hidden" Width="40px"></asp:TextBox>
        <asp:TextBox ID="H_txStartDate" Style="z-index: 106; position: absolute; top: 453px; left: 102px"
            runat="server" CssClass="hidden" Width="40px"></asp:TextBox>
        <asp:TextBox ID="H_txSignType" Style="z-index: 106; position: absolute; top: 453px; left: 102px"
            runat="server" CssClass="hidden" Width="40px"></asp:TextBox>
    </form>
</body>
</html>
