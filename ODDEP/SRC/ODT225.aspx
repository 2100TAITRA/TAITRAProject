<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page Language="c#" CodeBehind="ODT225.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT225" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT225 公文展期登錄作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT225" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div class="DivBaseTable">
            <div class="DivTable" id="MTable1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox class="KeyUpperField" ID="txDocNo" TabIndex="10" runat="server" MaxLength="10" Width="5.5em"></asp:TextBox>
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
						<div class="dTDTitle" style="width: 9.5em">
							<asp:Label ID="Label24" runat="server">案件編號：</asp:Label>
						</div>
						<div class="dTD" style="width: 10em">
							<asp:TextBox CssClass="DisplayOnly" ReadOnly="True" ID="txCaseNo" TabIndex="10" runat="server" MaxLength="8" Width="5.5em"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 9.5em">
							<asp:Label ID="Label25" runat="server">案件名稱：</asp:Label>
						</div>
						<div class="dTD" style="width: 28em">
							<asp:TextBox ID="txCaseName" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="30em"></asp:TextBox>
						</div>
					</div>
				</div>
				<div id="divforCaseAppDate" style="display: none">
					<div class="dTR">
						<div class="dTDTitle" style="width: 9.5em">
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
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label4" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
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
                        <asp:Label ID="Label7" runat="server">速　　別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txSpeed" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label21" runat="server" DESIGNTIMEDRAGDROP="182">來文機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txFromOrgNm" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="30em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label class="InputFieldLabel" ID="Label22" runat="server" Width="96px">來文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" ReadOnly="True" CssClass="DisplayOnly" Width="30em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
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
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label11" runat="server" CssClass="InputFieldLabel">本次申請展期天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txCurrExDays" TabIndex="20" runat="server" MaxLength="3" Width="2em"></asp:TextBox><asp:Label ID="Label12" runat="server">天</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label15" runat="server" CssClass="InputFieldLabel">申請後限辦日：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:Label ID="lbNDueDate" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
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
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label Style="z-index: 0" ID="lbApprove" class="InputFieldLabel" runat="server">簽核者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList Style="z-index: 0" ID="ddlApprove" runat="server" CssClass="InputFieldLabel" Width="104px"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label13" runat="server" CssClass="InputFieldLabel">展期理由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                    </div>
                </div>
                <div id="ReasonTable">
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label23" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:CheckBox ID="cbreason_else" runat="server" Text="其他" Width="2em"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 28em">
                        <asp:TextBox ID="txExReason" TabIndex="20" runat="server" TextMode="MultiLine"
                            Rows="2" Columns="50"></asp:TextBox>
                    </div>
                </div>
				<div class="dTR" id="TrTxSche">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label16" runat="server" Height="109px">擬定作業時程：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:TextBox ID="txSchedule" runat="server" Width="516px" Height="110px" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
				<div class="dTR" id="TrDgSche">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label28" runat="server">預定作業事項：</asp:Label>
					</div>
					<div class="dTD">
						<div class="DivTable">
							<div class="GridDiv" style="height: 150px; overflow: auto" id="DivDgSche">
								<asp:DataGrid ID="dgSchedule" runat="server" PageSize="4" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
									<Columns>
										<asp:TemplateColumn HeaderText="編號">
											<ItemTemplate>
												<asp:Label ID="lbSeqWork" runat="server" readonly="readonly" Width="2.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="預　定　作　業　事　項">
											<ItemTemplate>
												<asp:TextBox ID="txPlan" MaxLength="40" runat="server" Width="17.5em"></asp:TextBox>
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
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label14" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:Label ID="lbCurrStatus" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hide"></asp:ListBox>
            <asp:TextBox ID="H_txLtIncHd" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_txIncHd" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_txDueRule" Style="z-index: 106; position: absolute; top: 453px; left: 62px" runat="server" CssClass="hide" Width="40px"></asp:TextBox>
            <asp:TextBox ID="H_AppUser" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_LAST_UPDATE_PROG" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_LAST_UPDATE_TIME" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_txNDueDate" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txTxTime" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txDefaultExDays" runat="server" CssClass="hide" Width="38px"></asp:TextBox>
            <asp:TextBox ID="txReasonNo" runat="server" Width="75px" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="txTempPhraseDesp" runat="server" Width="84px" CssClass="hide"></asp:TextBox>
            <asp:DropDownList ID="dlPhraseDesp" runat="server" CssClass="hide"></asp:DropDownList>
            <asp:TextBox ID="txPtyDesc" runat="server" CssClass="hide"></asp:TextBox>
            <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
			<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:none" />
			<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btRecent" runat="server" Text="最近一次展期記錄(R)" AccessKey="R" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
		</asp:Panel>
    </form>
</body>
</html>
