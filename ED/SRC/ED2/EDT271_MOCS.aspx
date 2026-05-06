<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT271_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT271_MOCS" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT271_MOCS 批次傳送作業</title>
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
    <form id="EDT271_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:DropDownList ID="dlAllUnit" runat="server"></asp:DropDownList>
            <asp:DropDownList ID="dlAllUser" runat="server"></asp:DropDownList>
			<asp:TextBox ID="txRtnAppSelectType" runat="server"></asp:TextBox>
			<asp:TextBox ID="txRtnAppUserId" runat="server"></asp:TextBox>
			<asp:TextBox ID="txRtnAppRoleId" runat="server"></asp:TextBox>
			<asp:TextBox ID="txRtnAppName" runat="server"></asp:TextBox>
			<asp:TextBox ID="txRtnApprovedTime" runat="server"></asp:TextBox>
			<asp:TextBox ID="txRtnIssueType" runat="server"></asp:TextBox>
			<asp:TextBox ID="txRtnStoreType" runat="server"></asp:TextBox>
			<asp:TextBox ID="txRtnFileCnt" runat="server"></asp:TextBox>
			<asp:TextBox ID="txRtnFileUnit" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MTable1">
                <div class="dTR" ID="trTranser">
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label2" runat="server">傳送對象：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbTransferIssue" runat="server" Text="送發" GroupName="TransferType"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbTransferStore" runat="server" Text="送歸檔" GroupName="TransferType"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbTransferNormal" runat="server" Text="送出" GroupName="TransferType"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbTransferRPSUser" runat="server" Text="回原承辦人" GroupName="TransferType"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <asp:Panel class="dTR DgSelectToolBar" id ="tbSelect" runat="server" >
                    <asp:Button ID="btSelectAll" runat="server" Text="全選"></asp:Button>
                    <asp:Button ID="btSelectClear" runat="server" Text="清除"></asp:Button>
                    <asp:Button ID="btSelectInverse" runat="server" Text="反向"></asp:Button>
                    <asp:Label ID="Label14" runat="server">公文文號：</asp:Label>
                    <asp:TextBox Style="z-index: 0" ID="txDocNo2" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    <asp:Label ID="Label15" runat="server">勾選筆數：</asp:Label>
                    <asp:Label ID="CheckSendCount" runat="server"></asp:Label>
                    <asp:Label ID="Label12" runat="server">筆</asp:Label>
                </asp:Panel>
                <div class="dTR">
                    <div class="GridDiv">
                        <asp:DataGrid ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="續<br>辦">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbContinue" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="速<br>別">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
										<asp:Image ID="imgSpd" runat="server"></asp:Image>
										<asp:TextBox ID="hSpdNo" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="燈<br>號">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
										<asp:Image ID="imgLight" runat="server"></asp:Image>
										<asp:TextBox ID="hMsgOutLmt" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hMsgAlmLmt" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hAlarmTime" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="密<br>等">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
										<asp:Image ID="imgSec" runat="server"></asp:Image>
										<asp:TextBox ID="hSecNo" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="類<br>型">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
										<asp:Image ID="imgSignType" runat="server"></asp:Image>
										<asp:TextBox ID="hSignType" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="文號">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgDocNo" runat="server"></asp:Label>
										<asp:TextBox ID="hMsgId" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hCloseType" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hDocState" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hCloseDate" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hIssueDate" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hWebService" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hDraftState" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="來文機關">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgFromOrg" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="主旨">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgSubject" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="收文日期">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgRcvDate" runat="server"></asp:Label>
										<asp:TextBox ID="hRcvDate" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="限辦日期">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgDueDate" runat="server"></asp:Label>
										<asp:TextBox ID="hDueDate" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hStartDate" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="目前位置">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgCurrLocation" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="報送<br>案別">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgTAType" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="承辦資訊">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgDeptEmp" runat="server"></asp:Label>
										<asp:TextBox ID="hInChargeOuId" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hInChargeOuName" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hInChargeUserId" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hInChargeEmpName" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="核決者">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgAppUsername" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="傳送對象">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgToUser" runat="server"></asp:Label>
										<asp:TextBox ID="hTxName" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hToOuID" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hToOuName" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hToRoleID" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hToRoleName" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hToUserID" runat="server" CssClass="hide"></asp:TextBox>
										<asp:TextBox ID="hToUserName" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="列管<br>類別">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgMOCSPtyNo" runat="server"></asp:Label>
										<asp:TextBox ID="hPtyNo" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="預排<br>流程">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Button ID="btWWKF" runat="server" Text="設定"></asp:Button>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSubFolder" runat="server" Text="文件盒" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:DropDownList ID="ddlSubFolder" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
			<asp:Button ID="btSearch" runat="server" Text="重取" title="重取" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSet" runat="server" Text="擬辦設定" title="擬辦設定" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btTransfer" runat="server" Text="傳送" title="傳送" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btSetTransfer" runat="server" Text="設定傳送流程" title="設定傳送流程" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btForceRcv" runat="server" Text="強制簽收" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btUpdateTAType" runat="server" Text="校正報送案別" title="擬辦設定" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btChangeTA" runat="server" Text="轉任審公文" title="擬辦設定" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btChangeNormal" runat="server" Text="轉一般公文" title="擬辦設定" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
