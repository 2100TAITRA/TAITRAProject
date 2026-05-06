<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT410.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT410" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT410 文書處理流程個案分析登錄作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT410" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Status" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox>
            <asp:TextBox ID="H_ApplyNo" TabIndex="-1" runat="server" Width="20px" CssClass=""></asp:TextBox>
            <asp:TextBox ID="H_OD_OFC_HOUR_S" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_OD_OFC_HOUR_E" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_ODMSSP" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:ListBox ID="lbDept" runat="server" CssClass="" Height="22px" Width="20px"></asp:ListBox>
            <asp:DropDownList ID="dlProperty" TabIndex="-1" runat="server" Width="30px" CssClass=""></asp:DropDownList>
            <asp:DropDownList ID="dlSecNo" TabIndex="-1" runat="server" Width="30px" CssClass=""></asp:DropDownList>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MTable1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField" >公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txDocNo" TabIndex="10" CssClass="KeyEnUpperField" runat="server" MaxLength="10" Width="5.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label19" runat="server">申請類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 22em">
                        <asp:RadioButton ID="rbGeneral" runat="server" Text="一般" GroupName="applyType"></asp:RadioButton>
                        <asp:RadioButton ID="rbExpedite" runat="server" Text="未結案稽催回報" GroupName="applyType"></asp:RadioButton>
                        <asp:RadioButton ID="rbOverDue" runat="server" Text="嚴重逾期回報" GroupName="applyType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">申請單單號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txApplyNo" runat="server" Width="5em" CssClass="DisplayOnly" ReadOnly="True"
                            MaxLength="10"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label18" runat="server" CssClass="InputFieldText">登錄日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:TextBox ID="txNewDate" runat="server" CssClass="DisplayOnly" Width="4em" MaxLength="7" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label9" runat="server">速　　別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txSpeed" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="4em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="InputFieldText">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txDept" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True"
                            Width="15.7em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label4" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txUser" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True"
                            Width="6em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txRcvDate" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True"
                            Width="4em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label6" runat="server">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:TextBox ID="txArmDate" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True"
                            Width="4em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label10" runat="server">展期天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txBorDay" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label11" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txCloseDate" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True"
                            Width="4em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label12" runat="server">辦理天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:TextBox ID="txWorkDay" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="2em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label13" runat="server" CssClass="InputFieldText">逾期天數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txDelayDay" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label15" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox ID="txFromOrgDate" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="4em"
                            ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label16" runat="server" CssClass="InputFieldText">來文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txFromNo" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="16em"
                            ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label14" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:TextBox ID="txFromOrg" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="28em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 29em">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="DisplayOnly" ReadOnly="True" Width="28em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">原因分析：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:DropDownList ID="dlPhraseNo" runat="server" Width="15.5em" TabIndex="-1" CssClass="DisplayOnly"
                            Enabled="False">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 28em">
                        <asp:TextBox ID="txReason" runat="server" CssClass="DisplayOnly" Height="75px" ReadOnly="True"
                            Width="536px" TextMode="MultiLine" MaxLength="300" onblur="isMaxLength(this,'原因分析','300')"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label17" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:Label ID="lbStatus" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="MTable6">
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" data-fixed="true">
                            <asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:BoundColumn DataField="SUBFOLDER" HeaderText="公文狀態"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="OWN_OU_NAME" HeaderText="作業單位"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="OWN_USER_NAME" HeaderText="負責人員"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="SIGN_TIME" HeaderText="公文接收時間"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="TX_TIME" HeaderText="公文送出時間"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="HANDLE_TIME" HeaderText="公文處理時間"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="TX_NAME" HeaderText="異動別"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="TMP_CER" HeaderText="是否使用臨時憑證"></asp:BoundColumn>
                                    <asp:TemplateColumn HeaderText="核決者">
                                        <ItemTemplate>
                                            <asp:Label ID="lbExaminer" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
				<br>
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 129px">
                            <asp:DataGrid ID="dg2" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
                                <Columns>
                                    <asp:BoundColumn DataField="SEQ_NO" HeaderText="序"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="ENTRY_DATETIME" HeaderText="審核時間"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="TITLE" HeaderText="審核流程"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="TITLE_NAME" HeaderText="實際簽核主管"></asp:BoundColumn>
                                    <asp:BoundColumn DataField="REBOR_CODE" HeaderText="審核意見"></asp:BoundColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送：" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCheck" runat="server" Text="確認" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" CssClass="hide" />
            <asp:Button ID="btSearchFlow" runat="server" Text="流程資訊" Style="display: none" DefaultStyle="newmode:block;modifymode:block" />
        </asp:Panel>
    </form>
</body>
</html>
