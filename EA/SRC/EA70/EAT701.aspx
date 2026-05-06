<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAT701.aspx.cs" AutoEventWireup="false" Inherits="EA70.EAT701" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAT701 日常降解密調整作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAT701" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label class="RequireField" ID="Label1" TabIndex="-1" runat="server" CssClass="RequireField">文(編)號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox class="RequireField" ID="txDocNo" runat="server" Width="7.5em" CssClass="RequireField" MaxLength="15"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="Label4" TabIndex="-1" runat="server">原機密等級：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txSec" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox><asp:TextBox ID="H_OSecNo" runat="server" Width="1.5em" CssClass="hidden"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="Label5" TabIndex="-1" runat="server">解密條件：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txSecDesp" TabIndex="-1" runat="server" Width="13.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="Label6" TabIndex="-1" runat="server">原應解密日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txSecDate" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="Label8" TabIndex="-1" runat="server">來(受)文機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txOrgName" TabIndex="-1" runat="server" Width="13.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="Label7" TabIndex="-1" runat="server">來(發)文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" Width="13.5em" CssClass="DisplayOnly" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="Label20" TabIndex="-1" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txFromDate" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="Label22" TabIndex="-1" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txIssueDate" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="Label9" TabIndex="-1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txDeptName" TabIndex="-1" runat="server" Width="7.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="Label11" TabIndex="-1" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txEmpName" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="Label10" TabIndex="-1" runat="server">檔號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txFileNo" runat="server" Width="13.5em"></asp:TextBox><asp:TextBox ID="txFILENO_SEP" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8.5em;">
                        <asp:Label ID="lbSign" runat="server" CssClass="hidden"></asp:Label>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:Label ID="H_IssueNo" runat="server" CssClass="hidden"></asp:Label>
                    </div>
                </div>
                <asp:TextBox ID="txAppLimit" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox><asp:TextBox ID="txOriginSecNo" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
                <asp:Panel ID="Panel1" runat="server" Height="32px">
                    <div class="dTR" id="TR_1">
                        <div style="text-align: center" colspan="4">
                            <div>
                                <asp:Label ID="Label13" TabIndex="-1" runat="server" Width="208px">調　　整　　後　　資　　料</asp:Label>
                            </div>
                        </div>
                    </div>
                    <div class="dTR" id="TR_2">
                        <div class="dTDTitle" style="width: 8.5em">
                            <asp:Label class="RequireField" ID="Label12" TabIndex="-1" runat="server">核定解密機關：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:TextBox class="RequireField" ID="txNotifyOrg" runat="server" Width="13.5em" CssClass="DisplayOnly"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 8.5em">
                            <asp:Label class="RequireField" ID="Label2" runat="server">新密等：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:DropDownList ID="dlSecNo" runat="server" CssClass="DisplayOnly" Enabled="False"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR" id="TR_3">
                        <div class="dTDTitle" style="width: 8.5em" align="right">
                            <asp:Label class="RequireField" ID="Label15" runat="server">解密日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:TextBox class="RequireField" ID="txRmvSecDate" runat="server" Width="4.5em" CssClass="DisplayOnly" MaxLength="7"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 8.5em" align="right">
                            <asp:Label class="RequireField" ID="Label14" TabIndex="-1" runat="server">應解密日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:TextBox class="RequireField" ID="txNSecDate" runat="server" Width="4.5em" CssClass="DisplayOnly" MaxLength="7"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR" id="TR_4">
                        <div class="dTDTitle" style="width: 8.5em" align="right">
                            <asp:Label class="RequireField" ID="Label19" runat="server">新解密條件：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:TextBox ID="txSecDesp_New" TabIndex="-1" runat="server" Width="13.5em" CssClass="DisplayOnly"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 8.5em" align="right">
                            <asp:Label ID="lbAppDocNo" runat="server" Text="" CssClass="hide"></asp:Label>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:TextBox ID="txAppDocNo" runat="server" CssClass="hide"></asp:TextBox>
                            <asp:HiddenField ID="H_txOrgNo" runat="server" />
                            <asp:HiddenField ID="H_txOrgName" runat="server" />
                        </div>
                    </div>
                    <div class="dTR" id="TR_5">
                        <div class="dTDTitle" style="width: 8.5em" align="right">
                            <asp:Label class="RequireField" ID="Label17" runat="server">來文發文日期：<br>或公文核定日期
											&nbsp;&nbsp;&nbsp;</asp:Label>
                        </div>
                        <div class="dTD" style="width: 17em" valign="top">
                            <asp:TextBox class="RequireField" ID="txRcvDate" runat="server" Width="4.5em" CssClass="DisplayOnly" MaxLength="7"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 8.5em" align="right">
                            <asp:Label class="RequireField" ID="Label18" TabIndex="-1" runat="server">來文發文字號：<br>或核定文(編)號
											&nbsp;&nbsp;&nbsp;</asp:Label>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:TextBox class="RequireField" ID="txRcvNo" runat="server" Width="13.5em" CssClass="DisplayOnly" MaxLength="40"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR" id="TR_6">
                        <div class="dTDTitle" class="LeftCol" style="width: 8.5em" valign="top" align="right">
                            <asp:Label ID="Label3" TabIndex="-1" runat="server">應用限制：</asp:Label>
                        </div>
                        <div class="dTD" colspan="3">
                            <asp:RadioButton ID="rb1" runat="server" Enabled="False" Text="不變" GroupName="GN"></asp:RadioButton>
                            <asp:RadioButton ID="rb2" runat="server" Enabled="False" Text="開放" GroupName="GN"></asp:RadioButton>
                            <asp:RadioButton ID="rb3" runat="server" Enabled="False" Text="不開放" GroupName="GN"></asp:RadioButton>
                            <asp:RadioButton ID="rb4" runat="server" Enabled="False" Text="限制開放" GroupName="GN"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR" id="TR_7">
                        <div class="dTDTitle" style="width: 8.5em" valign="top" align="right">
                            <asp:Label ID="Label16" TabIndex="-1" runat="server">案由：</asp:Label>
                        </div>
                        <div class="dTD" colspan="3">
                            <asp:TextBox ID="txFromSubject" runat="server" Width="423px" CssClass="DisplayOnly" TextMode="MultiLine" Enabled="False"></asp:TextBox><br>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8.5em">
                            <asp:Label ID="lbComment" TabIndex="-1" runat="server" CssClass="hide">備註：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txComment" runat="server" Width="26.5em" CssClass="hide"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8.5em; min-height:1px">
                            <asp:Label ID="Label21" TabIndex="-1" runat="server"></asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:CheckBox ID="cbAuto" runat="server" Enabled="False" Text="併件公文均自動調整"></asp:CheckBox>
                        </div>
                    </div>
                </asp:Panel>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="調整" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="紀錄單列印" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" AccessKey="O" Title="匯出Excel(ALT+O)" />
			<asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
