<%@ Page Language="c#" CodeBehind="ODT252.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT252" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT252 專案執行進度回報作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODT250" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox Style="z-index: 101; position: absolute; top: 102px; left: 10px" ID="lbReturnValue"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label1" class="KeyField" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" CssClass="KeyField" MaxLength="10" Width="5.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label4" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyDate" TabIndex="-1" runat="server" MaxLength="7" Width="4em" CssClass="InputFieldNumeric" BackColor="LightGray" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label18" runat="server">申請單單號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyNo" runat="server" Width="4.5em" BackColor="LightGray" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label2" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" runat="server" Width="32.5em" BackColor="LightGray" ReadOnly="True" TextMode="MultiLine" Height="3.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label11" runat="server">專案名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCaseName" TabIndex="15" runat="server" MaxLength="120" Width="32.5em" BackColor="LightGray" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txDeptName" runat="server" Width="10.5em" BackColor="LightGray" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label8" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUserName" runat="server" Width="7em" BackColor="LightGray" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox ID="H_ApplyNo" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                        <asp:TextBox ID="H_Status" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label5" runat="server">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txRcvDate" runat="server" Width="4em" BackColor="LightGray" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label9" runat="server" Visible="False">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDueDate" runat="server" Width="4em" BackColor="LightGray" ReadOnly="True" Visible="False"></asp:TextBox>
                        <asp:TextBox ID="H_WorkType" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label13" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:Label ID="Label16" runat="server">專案申請</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label14" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlWorkType" TabIndex="30" runat="server" Width="9em" BackColor="LightGray" Enabled="False"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label6" runat="server">本專案申請天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txApplyDay" TabIndex="40" runat="server" MaxLength="3" Width="2em" CssClass="InputFieldNumeric" BackColor="LightGray"></asp:TextBox>
                        <asp:Label ID="Label12" class="InputFieldLabel" runat="server">天</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label10" runat="server">申請後限辦日：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNDueDate" runat="server" Width="4.5em" BackColor="LightGray"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label15" runat="server">申請理由：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txReason" TabIndex="60" runat="server" Width="32.5em" BackColor="LightGray" TextMode="MultiLine" Height="2.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label7" runat="server">整體進度說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDescAll" runat="server" MaxLength="200" Width="32.5em" TextMode="MultiLine" Height="3.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="TrDgSche">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label17" runat="server">預定作業事項：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="GridDiv" id="DivDgSche">
                            <asp:DataGrid ID="dgSchedule" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" PageSize="50">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="編號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeqWork" runat="server" readonly="readonly" Width="2.5em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="作　業　事　項">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txPlan" runat="server" MaxLength="40" Width="14em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="進度起">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDateS" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="進度迄">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDateE" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="實際完成日">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txFinDate" runat="server" MaxLength="7" Width="4em" CssClass="DatePicker"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="進度說明">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDesc" runat="server" Width="13em"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label19" runat="server" Visible="False">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbStatus" runat="server" Visible="False"></asp:Label>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" Visible="False" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2" PageSize="50">
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
            <asp:Button ID="btDelete" runat="server" Text="刪除申請" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="專案執行情形管制表(P)" AccessKey="P" title="專案執行情形管制表(ALT+P)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="流程資訊(I)" AccessKey="I" title="流程資訊(ALT+I)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 103; position: absolute; top: 218px; left: 12px" ID="Validator"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 104; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:TextBox Style="z-index: 105; position: absolute; top: 453px; left: 12px" ID="H_txSourceOrgNo"
            runat="server" CssClass="hidden" Width="42px" Height="23px"></asp:TextBox>
        <asp:TextBox Style="z-index: 106; position: absolute; top: 453px; left: 62px" ID="H_txIncHd"
            runat="server" CssClass="hidden" Width="40px"></asp:TextBox>
        <asp:TextBox Style="z-index: 106; position: absolute; top: 453px; left: 102px" ID="H_txStartDate"
            runat="server" CssClass="hidden" Width="40px"></asp:TextBox>
        <asp:TextBox Style="z-index: 106; position: absolute; top: 453px; left: 102px" ID="H_txSignType"
            runat="server" CssClass="hidden" Width="40px"></asp:TextBox>
    </form>
</body>
</html>
