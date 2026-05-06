<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT251.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT251" %>

<!DOCTYPE HTML >
<html>
<head>
    <title>ODT251 專案申請審核作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <object style="display: none" id="ocx" classid="CLSID:58278908-D252-46FC-90BE-831E3B9ACB88"
        viewastext>
    </object>
    <base target='_self'>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODT251" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue"
            runat="server" CssClass="hidden"></asp:ListBox>
        <asp:TextBox ID="H_LAST_UPDATE_PROG" runat="server" CssClass="hidden"></asp:TextBox><asp:TextBox ID="H_LAST_UPDATE_TIME" runat="server" CssClass="hidden"></asp:TextBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 33em">
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
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" ReadOnly="True"
                            MaxLength="15" Width="8em" BackColor="LightGray"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 12em">
                        <asp:Label ID="Label2" runat="server" Width="5.5em">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTxDate" TabIndex="20" CssClass="InputFieldNumeric"
                            runat="server" ReadOnly="True" Width="4em" BackColor="LightGray"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label21" runat="server">申請單單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txApplyNo" runat="server" ReadOnly="True" Width="4.5em"
                            BackColor="LightGray"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32.5em">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" ReadOnly="True"
                            Width="32em" BackColor="LightGray"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label17" runat="server">專案名稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32.5em">
                        <asp:TextBox ID="txCaseName" TabIndex="-1" runat="server" ReadOnly="True"
                            Width="32em" BackColor="LightGray"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txRpsDept" TabIndex="-1" runat="server" ReadOnly="True"
                            Width="10em" BackColor="LightGray"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label5" runat="server" Width="5.5em">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRpsUser" TabIndex="-1" runat="server" ReadOnly="True" Width="7em" BackColor="LightGray"></asp:TextBox>
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
                    <div class="dTDTitle" style="width: 11.5em">
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
                    <div class="dTD">
                        <asp:DropDownList ID="dlProperty" TabIndex="30" runat="server" Width="12em"
                            BackColor="#E0E0E0" Enabled="False">
                            <asp:ListItem Value="3" Selected="True">專案管制</asp:ListItem>
                            <asp:ListItem Value="9">特殊案件</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label8" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlWorkType" TabIndex="30" runat="server" Width="9em"
                            BackColor="#E0E0E0" Enabled="False">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label11" runat="server">本專案申請天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txCurrExDays" TabIndex="20" CssClass="InputFieldNumeric"
                            runat="server" ReadOnly="True" MaxLength="3" Width="2em" BackColor="LightGray"></asp:TextBox><asp:Label ID="Label12" runat="server">天</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label15" runat="server">申請後限辦日：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNDueDate" TabIndex="-1" runat="server" ReadOnly="True" Width="4em" BackColor="LightGray"></asp:TextBox>
                        <asp:TextBox ID="H_ApplyNo" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label9" runat="server">申請理由：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExReason" TabIndex="20" runat="server" ReadOnly="True"
                            Width="32em" BackColor="LightGray" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label10" runat="server" Height="4em">擬定作業時程：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 42.5em">
                        <asp:TextBox ID="txSchedule" runat="server" ReadOnly="True" Width="42.5em"
                            BackColor="LightGray" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="TrDgSche">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label14" runat="server" Width="7.5em">擬定作業時程：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="DivTable">
                            <div class="GridDiv" style="height: 90px; overflow: auto" id="DivDgSche">
                                <asp:DataGrid ID="dgSchedule" runat="server" CssClass="DisplayOnly" PageSize="50" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="編號">
                                            <ItemTemplate>
                                                <asp:Label ID="lbSeqWork" runat="server" readonly="readonly" Width="2.5em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="預　定　作　業　事　項">
                                            <ItemTemplate>
                                                <asp:TextBox ID="txPlan" runat="server" ReadOnly="True" Width="22em" BackColor="LightGray"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="進度起">
                                            <ItemTemplate>
                                                <asp:TextBox ID="txDateS" runat="server" ReadOnly="True" Width="4em" BackColor="LightGray"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="進度迄">
                                            <ItemTemplate>
                                                <asp:TextBox ID="txDateE" runat="server" ReadOnly="True" Width="4em" BackColor="LightGray"></asp:TextBox>
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
                    <div class="dTDTitle" style="width: 10em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:TextBox ID="txAuditMsg" TabIndex="20" runat="server" Width="32em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="divDescList">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="lbTitleDesc" runat="server" CssClass="hide">說　　明：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32.8em">
                        <asp:Label ID="lbDesc" runat="server" CssClass="hide"></asp:Label>
                    </div>
                </div>
                <div>
                    <div class="dTR" id="divDescList2">
                        <div class="dTDTitle" style="width:  5.84em">
                            <asp:Label ID="lbDesList1" runat="server" CssClass ="hide">1.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 36em">
                            <asp:Label class="InputFieldLabel" ID="DescList1" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width:  5.84em">
                            <asp:Label ID="lbDesList2" runat="server" CssClass ="hide">2.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 36em">
                            <asp:Label class="InputFieldLabel" ID="DescList2" runat="server" CssClass ="hide" ></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width:  5.84em">
                            <asp:Label ID="lbDesList3" runat="server" CssClass ="hide">3.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 36em">
                            <asp:Label class="InputFieldLabel" ID="DescList3" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width:  5.84em">
                            <asp:Label ID="lbDesList4" runat="server" CssClass ="hide">4.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 36em">
                            <asp:Label class="InputFieldLabel" ID="DescList4" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width:  5.84em">
                            <asp:Label ID="lbDesList5" runat="server" CssClass ="hide">5.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 36em">
                            <asp:Label class="InputFieldLabel" ID="DescList5" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                </div>
            
                <div class="dTR">
                    <div class="dTDTitle" style="Width:28em; height: 16px">
                        <asp:Label ID="Label6" runat="server" Font-Underline="True" Width="12em">簽　　核　　歷　　程</asp:Label>
                    </div>
                </div>
                <div class="DivTable" id="MTable7">
                    <div class="GridDiv" style="height: 160px; overflow: auto">
                        <asp:DataGrid ID="dg1" runat="server" PageSize="50" BorderStyle="None" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSeq" runat="server" Width="1.5em"></asp:Label>
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
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btBack" runat="server" Text="退回" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCommit" runat="server" Text="核可" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="線上簽核傳送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Label ID="lbMsg" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="線上瀏覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Validator"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:TextBox ID="H_ShowDecList" runat="server" CssClass="hide"></asp:TextBox>
    </form>
</body>
</html>
