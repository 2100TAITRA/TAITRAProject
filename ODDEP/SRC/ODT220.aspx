<%@ Page Language="c#" CodeBehind="ODT220.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT220" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>ODT220 公文展期申請作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
</head>
<body ms_positioning="GridLayout">
    <form id="ODT220" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div class="DivBaseTable">
            <div class="DivTable" id="MTable1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox class="KeyEnUpperField" ID="txDocNo" TabIndex="10" runat="server" MaxLength="10" Width="5.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txTxDate" TabIndex="20" runat="server" CssClass="DisplayOnly" MaxLength="7" ReadOnly="True" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div id="divforCaseApp" style="display: none">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 10.5em">
                            <asp:Label ID="Label24" runat="server">案件編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox CssClass="DisplayOnly" ReadOnly="True" ID="txCaseNo" TabIndex="10" runat="server" MaxLength="8" Width="5.5em"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 10.5em">
                            <asp:Label ID="Label25" runat="server">案件名稱：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 28em">
                            <asp:TextBox ID="txCaseName" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="30em"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div id="divforCaseAppDate" style="display: none">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 10.5em">
                            <asp:Label ID="Label26" runat="server">公文原始限辦日：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 8em">
                            <asp:TextBox CssClass="DisplayOnly" ReadOnly="True" ID="txPdaudate" TabIndex="10" runat="server" MaxLength="10" Width="4em"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 11.5em">
                            <asp:Label ID="Label27" runat="server">原專案管制申請限辦日：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 6em">
                            <asp:TextBox ID="txdaudate" TabIndex="20" runat="server" CssClass="DisplayOnly" MaxLength="7" ReadOnly="True" Width="4em"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label4" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="30em" TextMode="MultiLine" Rows="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txRpsDept" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label5" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txRpsUser" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label6" runat="server">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txRcvDate" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label7" runat="server">速　　別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txSpeed" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label21" runat="server" DESIGNTIMEDRAGDROP="182">來文機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txFromOrgNm" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="30em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="InputFieldLabel" ID="Label22" runat="server" Width="96px">來文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="30em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label8" runat="server">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txLimitDate" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label9" runat="server" CssClass="InputFieldLabel">已展期天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txHaveExDays" TabIndex="-1" runat="server" Width="2em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox><asp:Label ID="Label10" runat="server">天</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label11" runat="server" CssClass="InputFieldLabel">本次申請展期天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txCurrExDays" TabIndex="20" runat="server" MaxLength="3" Width="2em" CssClass="InputFieldNumeric"></asp:TextBox><asp:Label ID="Label12" runat="server">天</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label15" runat="server" CssClass="InputFieldLabel">申請後限辦日：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:Label ID="lbNDueDate" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label17" runat="server" CssClass="InputFieldText">申請展延次別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="Label18" runat="server" CssClass="InputFieldText">第</asp:Label>&nbsp;
											<asp:TextBox ID="txTimes" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="2em"></asp:TextBox>
                        <asp:Label ID="Label19" runat="server" CssClass="InputFieldText">次</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label20" runat="server" CssClass="InputFieldLabel">申請單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txExtNo" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4.5em"></asp:TextBox>
                        <asp:TextBox ID="H_ExtNo" TabIndex="-1" runat="server" ReadOnly="True" CssClass="hide" Width="4.5em"></asp:TextBox>
                    </div>
                </div>
                <div>
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="lbPtyName" runat="server" CssClass="hide">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txPtyName" TabIndex="20" runat="server" CssClass="hide"
                            Width="10em" BackColor="LightGray"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label13" runat="server" CssClass="InputFieldLabel">展期理由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:CheckBox ID="cbreason" runat="server"></asp:CheckBox><asp:TextBox ID="txReason" TabIndex="20" runat="server">案情較複雜，承辦費時</asp:TextBox>
                    </div>
                </div>
                <div id="ReasonTable">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label23" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:CheckBox ID="cbreason_else" runat="server" Text="其他" Width="2em"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 28em">
                        <asp:TextBox ID="txExReason" TabIndex="20" runat="server" TextMode="MultiLine"
                            Rows="2" Columns="50" onblur="isMaxLength(this,'展期理由','100')"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="TrTxSche">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label16" runat="server" Height="109px">擬定作業時程：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:TextBox ID="txSchedule" runat="server" Width="516px" Rows="3" TextMode="MultiLine" onblur="isMaxLength(this,'擬定作業時程','400')"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="TrDgSche">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label28" runat="server">擬定作業時程：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="DivTable">
                            <div class="GridDiv" style="height: 120px; overflow: auto" data-fixed="true" id="DivDgSche">
                                <asp:DataGrid ID="dgSchedule" runat="server" PageSize="4" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="編號">
                                            <ItemTemplate>
                                                <asp:Label ID="lbSeqWork" runat="server" readonly="readonly" Width="2.5em"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="預　定　作　業　事　項">
                                            <ItemTemplate>
                                                <asp:TextBox ID="txPlan" MaxLength="40" runat="server" Width="17.5em" onblur="isMaxLength(this,'預定作業事項','40')"></asp:TextBox>
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
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label14" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbCurrStatus" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR" id="divDesc">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="InputFieldLabel" ID="txAppOnlineMode1" runat="server">說　　明：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:Label class="InputFieldLabel" ID="txAppOnlineMode" runat="server"></asp:Label>
                    </div>
                </div>
                <div id="divDescList">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 10.5em">
                            <asp:Label class="InputFieldLabel" ID="Label29" runat="server">說　　明：</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 10.5em">
                            <asp:Label ID="Label31" runat="server">一、</asp:Label>
                        </div>
                        <div class="dTD" style="width: 28em">
                            <asp:Label class="InputFieldLabel" ID="DescList1" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 10.5em">
                            <asp:Label ID="Label30" runat="server">二、</asp:Label>
                        </div>
                        <div class="dTD" style="width: 28em">
                            <asp:Label class="InputFieldLabel" ID="DescList2" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 10.5em">
                            <asp:Label ID="Label33" runat="server">三、</asp:Label>
                        </div>
                        <div class="dTD" style="width: 28em">
                            <asp:Label class="InputFieldLabel" ID="DescList3" runat="server"></asp:Label>
                        </div>
                    </div>
                </div>
                <div id="divDescList2">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6.33em">
                            <asp:Label ID="lbDesList2_1" runat="server" CssClass ="hide">1.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 34em">
                            <asp:Label class="InputFieldLabel" ID="DescList2_1" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6.33em">
                            <asp:Label ID="lbDesList2_2" runat="server" CssClass ="hide">2.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 34em">
                            <asp:Label class="InputFieldLabel" ID="DescList2_2" runat="server" CssClass ="hide" ></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6.33em">
                            <asp:Label ID="lbDesList2_3" runat="server" CssClass ="hide">3.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 34em">
                            <asp:Label class="InputFieldLabel" ID="DescList2_3" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6.33em">
                            <asp:Label ID="lbDesList2_4" runat="server" CssClass ="hide">4.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 34em">
                            <asp:Label class="InputFieldLabel" ID="DescList2_4" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 6.33em">
                            <asp:Label ID="lbDesList2_5" runat="server" CssClass ="hide">5.</asp:Label>
                        </div>
                        <div class="dTD" style="width: 34em">
                            <asp:Label class="InputFieldLabel" ID="DescList2_5" runat="server" CssClass ="hide"></asp:Label>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label class="InputFieldLabel" ID="Label32" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD" style="width: 35em">
                        <asp:Button ID="btAddFile" runat="server" Text="加入附件"></asp:Button>
                        <input type="file" id="fileInput" style="display: none" onchange="fnAddFile()" />
                        <asp:TextBox ID="H_AttachFromDB" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_AttachInf" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_AttachDel" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_WS" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_StartPath" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="dvAttach" runat="server">
                <div class="dTR">
                    <div class="GridDiv hide" style="height: 120px;" data-fixed="true" id="divAttach">
                        <asp:DataGrid ID="dgAttach" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbAttSeq" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="檔名">
                                    <ItemTemplate>
                                        <asp:Label ID="lbFileName" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                        <asp:Label ID="lbFilePath" runat="server" CssClass="hidden"></asp:Label>
                                        <asp:Label ID="lbFileSize" runat="server" CssClass="hidden"></asp:Label>
                                        <asp:Label ID="lbFileDesc" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                        <asp:Label ID="lbFileComeFrom" runat="server" CssClass="hidden"></asp:Label>
                                        <asp:Label ID="lbFileDraftSeq" runat="server" CssClass="hidden"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="附件描述">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txFileDesc" runat="server" Visible="True"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="執行">
                                    <ItemTemplate>
                                        <asp:Button ID="btDelete" runat="server" Text="刪除"></asp:Button>
                                        <asp:Button ID="btOpenFile" runat="server" Text="瀏覽"></asp:Button>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="dg1div">
                 <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 129px">
                            <asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="審核時間">
                                        <ItemTemplate>
                                            <asp:Label ID="lbAuditTime" runat="server" Width="10em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="審核主管">
                                        <ItemTemplate>
                                            <asp:Label ID="lbAuditor" runat="server" Width="6em"></asp:Label>
                                            <asp:Label ID="lbRealAudit" runat="server" Width="80px" CssClass="hide"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="審核意見">
                                        <ItemTemplate>
                                            <asp:Label ID="lbAuditMsg" runat="server" Width="29em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:ListBox ID="lbReturnValue" runat="server" CssClass="hide"></asp:ListBox>
        <asp:TextBox ID="H_txLtIncHd" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="H_txIncHd" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="H_OldCurrDay" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="hTxCurrdayChanged" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="txHAppCond" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 0" ID="H_txNewSet" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="hData_RoleCode" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="hData_RoleName" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="h_uRpsDeptNo" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="hData_OrgCode" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="hData_OrgName" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="hStatus" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="hApplyTimes" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="hData_UserCode" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="hData_UserName" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="txReasonNo" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="txDefaultExDays" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="H_txOnlineMode" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="H_txNDueDate" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="H_EXT_FLOWTYPE" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="H_EXT_DEFUNIT" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="H_EXT_FLOWSET" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="DocProtity" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="txTempPhraseDesp" runat="server" CssClass="hide"></asp:TextBox>
        <asp:DropDownList ID="dlPhraseDesp" runat="server" CssClass="hide"></asp:DropDownList>
        <asp:TextBox ID="txTempPhraseNo" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="txPtyDesc" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="h_txBeOdt250" runat="server" CssClass="hide"></asp:TextBox>
        <asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hide"></asp:ValidationSummary>
        <asp:TextBox ID="H_WSLocation" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="H_txDueRule" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="txTxTime" runat="server" CssClass="hide"></asp:TextBox>
        <asp:CustomValidator ID="Validator" runat="server" CssClass="hide" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:TextBox ID="H_txTransferUser" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox ID="H_ShowDecList2" runat="server" CssClass="hide"></asp:TextBox>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" AccessKey="D" Text="刪除申請(D)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btTransfer" runat="server" AccessKey="R" Text="線上簽核傳送(R)：" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btCommit" runat="server" Text="核可(G)" AccessKey="G" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
            <asp:Button ID="btCheck" runat="server" Text="確認(C)" AccessKey="C" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="申請單列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCommitRpt" runat="server" Text="預覽核示通知單(T)" AccessKey="T" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSearchFlow" runat="server" Text="流程資訊(I)" AccessKey="I" Style="display: none" DefaultStyle="newmode:block;modifymode:block" />

            <asp:Button ID="btBack" runat="server" Text="撤回(B)" AccessKey="B" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
        </asp:Panel>
    </form>
</body>
</html>
