<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT223.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT223" %>

<!DOCTYPE HTML PUBLIC>
<html>
<head>
    <title>EDT223 異動撤銷申請審核作業</title>
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
    <form id="EDT223" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div class="DivBaseTable">
            <div class="DivTable" id="MTable1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox class="KeyUpperField" ID="txDocNo" TabIndex="10" runat="server" MaxLength="10" Width="5.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label4" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="30em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
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
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label6" runat="server">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txRcvDate" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label8" runat="server">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txLimitDate" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label11" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txProperty" TabIndex="-1" runat="server" Width="7.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label14" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txBussinType" TabIndex="-1" runat="server" Width="7.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label9" runat="server">核決者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppName" TabIndex="-1" runat="server" Width="7.5em" ReadOnly="True" CssClass="DisplayOnly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txApplyDate" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label7" runat="server">申請單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txApplyNo" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label10" runat="server">異動原因：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="txReaSon" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="30em" MaxLength="200" Height="5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label12" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:Label ID="Label13" runat="server">申請刪除序號</asp:Label>
                        <asp:TextBox ID="txSeqNo" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="1.5em"></asp:TextBox>
                        <asp:Label ID="Label15" runat="server">之後(含)之異動</asp:Label>
                        <asp:Label ID="lbNo" runat="server" ForeColor="Red" Visible="False">！無刪除權限</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label16" runat="server">審核意見：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPhraseNo" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label18" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" runat="server" Width="30em" MaxLength="200" Height="5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label17" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbStatus" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="h_TxCanDelSeqNo" TabIndex="-1" runat="server" CssClass="hidden" Width="30px"></asp:TextBox>
            <asp:TextBox ID="H_MsgId" TabIndex="-1" runat="server" CssClass="hidden" Width="30px"></asp:TextBox>
            <asp:TextBox ID="H_UserName" TabIndex="-1" runat="server" CssClass="hidden" Width="30px"></asp:TextBox>
            <asp:TextBox ID="H_EmpName" TabIndex="-1" runat="server" CssClass="hidden" Width="30px"></asp:TextBox>
            <asp:TextBox ID="H_ApplyUserMsgID" TabIndex="-1" runat="server" CssClass="hidden" Width="30px"></asp:TextBox>
            <asp:TextBox ID="h_Rolename" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btTransfer" runat="server" AccessKey="R" Text="線上簽核傳送(R)：" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btApprove" runat="server" Text="核准" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btReject" runat="server" Text="退回" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="流程資訊(I)" AccessKey="I" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
        </asp:Panel>
    </form>
</body>
</html>
