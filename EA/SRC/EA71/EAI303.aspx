<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAI303.aspx.cs" AutoEventWireup="false" Inherits="EA71.EAI303" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAI303 案卷檔案目錄明細瀏覽</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"><style>.dTD>span[id^='lb'] {display: inline-table;}</style></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAI303" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txUnvFile" runat="server" Width="43px"></asp:TextBox>
            <asp:TextBox ID="txWebWorkPath" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txServerName" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txServerPort" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txUnvFileLocal" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="DOC_CHECK" runat="server" Width="44px"></asp:TextBox>
            <asp:TextBox ID="h_tbFlag" runat="server" Width="54px"></asp:TextBox>
            <asp:TextBox ID="txOrgNo" runat="server" Width="43px"></asp:TextBox>
            <asp:TextBox ID="h_CloseType" runat="server" Width="43px"></asp:TextBox>
            <asp:TextBox ID="COM_CHECK" runat="server" Width="44px" CssClass=""></asp:TextBox>
            <asp:Label ID="lbRPSSECT_NO" runat="server" Visible="False">●</asp:Label>
            <asp:Label ID="lbRPS_USER" runat="server" Visible="False">●</asp:Label>
            <asp:Label ID="Label49" runat="server" Visible="False">●</asp:Label>
            <asp:Label ID="lbSOURCE_ORGNO" runat="server" CssClass="" Visible="False"></asp:Label>
            <asp:Label ID="lbRPSDEPT_NO" runat="server" CssClass=""></asp:Label>
            <asp:ListBox ID="lboxTheme" runat="server"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="tbDetail" style="border-style: solid">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:CheckBox ID="cbSELECT" onclick="SelectItem('DOC_CHECK')" runat="server" CssClass="InputFieldText" Font-Size="Smaller" Text="線上調檔，請勾選左方核選按鈕" BackColor="Info" Visible="False"></asp:CheckBox>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbSEQ_NO" runat="server" CssClass="hidden">1.</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label1" runat="server">案　　號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em">
                        <asp:Label ID="lbFILE_NO" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server">基準項目編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbITEM_NO" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label5" runat="server">其他編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label ID="lbOTHER_NO" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label2" runat="server">案卷檔案起始日期之年制：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:Label ID="lbDOC_START_YEAR" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label6" runat="server">案卷檔案訖止日期之年制：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:Label ID="lbDOC_END_YEAR" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label17" runat="server">案卷檔案起始日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em">
                        <asp:Label ID="lbDOC_START_DATE" runat="server">999/99/99</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label18" runat="server">案卷檔案訖止日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbDOC_END_DATE" runat="server">999/99/99</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label14" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label ID="lbSEC_NAME" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label7" runat="server">參照案卷：</asp:Label>
                    </div>
                    <div class="dTD" style="overflow: auto; width: 47.5em; height: 2.5em" id="divRelCase">
                    </div>
                </div>
                <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label32" runat="server">案　　名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbCASE_NAME" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label33" runat="server">並列案名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbAPP_SUBJECT" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label35" runat="server">其他案名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbOTHER_SUBJECT" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label37" runat="server">案情摘要：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCASE_SUMMARY" runat="server" Width="40em" CssClass="PopUp" Height="2.5em" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label41" runat="server">產生機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:TextBox ID="txCRT_ORG" runat="server" Width="16.5em" CssClass="PopUp" Height="1.5em" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label45" runat="server">有關機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:TextBox ID="txREL_ORG" runat="server" Width="16.5em" CssClass="PopUp" Height="1.5em" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label55" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em">
                        <asp:Label ID="lbOKEEP_YEAR" runat="server">99</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label60" runat="server">調整後保存年限：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbKEEP_YEAR" runat="server">永久</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label62" runat="server">保存年限調整原因：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:TextBox ID="txADJUSTYR_DESC" runat="server" Width="10.5em" CssClass="PopUp" Height="1.5em" TextMode="MultiLine" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label54" runat="server">應用限制：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em">
                        <asp:Label ID="lbAPPLY_LIMIT" runat="server">開放</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label56" runat="server">目錄公佈限制：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbPUBLISH_LIMIT" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label58" runat="server">應用註記：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:Label ID="lbAPPLY_REMARK" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label39" runat="server">檔案數量：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:Label ID="lbFILE_CNT" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label42" runat="server">外觀細節：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:TextBox ID="txFILE_LOOK" runat="server" Width="17em" CssClass="PopUp" Height="1.5em" TextMode="MultiLine" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label47" runat="server">移轉(交)日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:Label ID="lbTRAN_DATE" runat="server">999/99/99</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label52" runat="server">移轉(交)機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:Label ID="lbTRAN_ORG" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="lbTDesDate" runat="server">銷毀日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:Label ID="lbDES_DATE" runat="server">999/99/99</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="lbTDesDocNo" runat="server">核准銷毀文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:Label ID="lbDES_DOCNO" runat="server"></asp:Label>
                    </div>
                </div>
                <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label51" runat="server">主題項：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTheme" runat="server" Width="40em" CssClass="PopUp" Height="6em" TextMode="MultiLine" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12.5em">
                        <asp:Label ID="Label50" runat="server">附註項：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRemark" runat="server" Width="40em" CssClass="PopUp" Height="2.5em" TextMode="MultiLine" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V3_GenericBannerToolBar">
            <asp:Label runat="server" Text="第"></asp:Label>
            <asp:TextBox runat="server" Width="3.5em" ID="txNum" BackColor="LightGray" Text="1"></asp:TextBox>
            <asp:Label runat="server" Text="筆"></asp:Label>
            <asp:Label runat="server" Text="/ 共"></asp:Label>
            <asp:TextBox runat="server" Width="3.5em" ID="txTotNum" BackColor="LightGray"></asp:TextBox>
            <asp:Label runat="server" Text="筆"></asp:Label>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="顯示摘要" ID="btSUM1" AccessKey="D" Title="顯示摘要(ALT+D)"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="第一筆" ID="btFIRSTDOC1" AccessKey="F" Title="第一筆(ALT+F)"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="上一筆" ID="btPRIORDOC1" AccessKey="P" Title="上一筆(ALT+P)"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="下一筆" ID="btNEXTDOC1" AccessKey="N" Title="下一筆(ALT+N)"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="最末筆" ID="btLASTDOC1" AccessKey="L" Title="最末筆(ALT+L)"></asp:Button>
            <asp:Button runat="server" Text="線上瀏覽" ID="btIMAGE1" AccessKey="V" Title="線上瀏覽(ALT+V)" DefaultStyle="display:none"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="明細列印" ID="btDetailPrint" Title="明細列印"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="離開" ID="btEXIT1" AccessKey="X" Title="離開(ALT+X)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
