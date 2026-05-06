<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="EAT813.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT813" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT813 移交審核作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAT813" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="lbMyAccount" runat="server" Width="1px" Height="1px" Enabled="False"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label10" runat="server">申請單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 21em;">
                        <asp:TextBox ID="txAppNo" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label9" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppDate" runat="server" Width="4em" MaxLength="7" CssClass="DisplayOnly" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label11" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDeptName" TabIndex="-1" runat="server" Width="10em" CssClass="displayonly"
                            ForeColor="Navy"></asp:TextBox>
                        <asp:TextBox ID="H_txDeptID" runat="server" CssClass="hide" Width="2em"></asp:TextBox>
                        <asp:TextBox ID="txUserName" TabIndex="-1" runat="server" Width="4em" CssClass="displayonly"
                            ForeColor="Navy"></asp:TextBox>
                        <asp:TextBox ID="txEmpName" TabIndex="-1" runat="server" Width="4em" CssClass="displayonly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label3" runat="server">接管人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTranOuName" TabIndex="-1" runat="server" Width="10em" CssClass="displayonly"
                            ForeColor="Navy"></asp:TextBox>
                        <asp:TextBox ID="H_txTranOuID" runat="server" CssClass="hide" Width="2em"></asp:TextBox>
                        <asp:TextBox ID="txTranUserID" TabIndex="-1" runat="server" Width="4em" CssClass="displayonly"
                            ForeColor="Navy"></asp:TextBox>
                        <asp:TextBox ID="txTranUserName" TabIndex="-1" runat="server" Width="4em" CssClass="displayonly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label2" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbStatus" runat="server" Width="4em"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label15" runat="server">申請原因：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppreason" runat="server" Width="32.5em" Height="5em" TextMode="MultiLine" CssClass="DisplayOnly" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">簽核者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTxUser" TabIndex="-1" runat="server" Width="4em" CssClass="displayonly"
                            ForeColor="Navy"></asp:TextBox>
                        <asp:TextBox ID="txTxUserName" TabIndex="-1" runat="server" Width="4em" CssClass="displayonly"
                            ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">簽核意見：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlVerifyResult" runat="server" Width="4em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        &nbsp;&nbsp;
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOpinion" runat="server" Width="32.5em" Height="5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btReject" runat="server" Text="退回(B)" AccessKey="B" title="退回(ALT+B)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btApprove" runat="server" Text="核可(G)" AccessKey="G" title="核可(ALT+G)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送(R):" AccessKey="R" title="線上簽核傳送(ALT+R)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btSearchFlow" runat="server" Text="流程資訊(I)" AccessKey="I" title="流程資訊(ALT+I)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
