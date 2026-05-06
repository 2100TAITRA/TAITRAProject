<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, zPublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAM200.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAM200" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>EAM200 案卷檔案目錄維護作業</title>
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
    <form id="EAM200" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
            <asp:TextBox ID="H_CaseKey" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_ClsKey" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_CaseState" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_OKeepYear" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_Split" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_Value" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label27" runat="server" CssClass="KeyField">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" runat="server" Width="2em" CssClass="KeyFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                    <div class="dTD" align="right">
                        <asp:Label ID="Label28" runat="server" CssClass="KeyField">年度號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileYear" runat="server" Width="2em" CssClass="KeyFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                    <div class="dTD" align="right">
                        <asp:Label ID="Label29" runat="server" CssClass="KeyField">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCls" runat="server" Width="10.5em" CssClass="KeyUpperField" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTD" align="right">
                        <asp:Label ID="Label30" runat="server" CssClass="KeyField">案次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCase" runat="server" Width="7em" CssClass="KeyUpperField" MaxLength="12"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">儲存庫房：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStore" runat="server" Width="5.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label31" runat="server">狀　　態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em; min-height: 1px">
                        <asp:Label ID="lbIsAudit" runat="server" Width="8.5em"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label32" runat="server">通過日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em; min-height: 1px">
                        <asp:Label ID="lbAuditDate" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label33" runat="server">基準項目編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbItemNo" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label34" runat="server" CssClass="RequireField">案　　名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCaseName" runat="server" Width="30.5em" CssClass="RequireField" MaxLength="100"></asp:TextBox>
                        <asp:Button ID="btOtherSubject" TabIndex="-1" runat="server" Text="其他"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label35" runat="server" CssClass="RequireField">密　　等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSecNo" runat="server" Width="5.5em" CssClass="RequireField">
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 9em" align="right">
                        <asp:Label ID="Label36" runat="server" CssClass="RequireField">保存年限：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:TextBox ID="txKeepYear" runat="server" Width="1.5em" CssClass="RequireFieldNumeric" MaxLength="2"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8.5em" align="right">
                        <asp:Label ID="Label37" runat="server" CssClass="RequireField">應用限制：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlApplyLimit" runat="server" Width="5.5em" CssClass="RequireField">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label38" runat="server">目錄公佈限制：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPublishLimit" runat="server" Width="5.5em">
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 9em" align="right">
                        <asp:Label ID="Label39" runat="server" CssClass="RequireField">案卷檔案起始日：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:TextBox ID="txSDate" runat="server" Width="4.5em" CssClass="RequireFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8.5em" align="right">
                        <asp:Label ID="Label40" runat="server" CssClass="RequireField">案卷檔案訖止日：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txEDate" runat="server" Width="4.5em" CssClass="RequireFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label41" runat="server" CssClass="RequireField">檔案數量：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:TextBox ID="txFileCnt" Style="text-align: right" runat="server" Width="2.5em" CssClass="RequireFieldNumeric" MaxLength="4"></asp:TextBox>
                        <asp:DropDownList ID="dlFileUnit" runat="server" Width="3em" CssClass="RequireField"></asp:DropDownList>
                        <asp:TextBox ID="txFileDocCnt" Style="text-align: right" runat="server" Width="2.5em" CssClass="RequireFieldNumeric" MaxLength="4"></asp:TextBox>
                        <asp:DropDownList ID="dlFileDocUnit" runat="server" Width="3em" CssClass="RequireField"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em" align="right">
                        <asp:Label ID="Label42" runat="server">外觀細節：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileLook" runat="server" Width="16.5em" MaxLength="50"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label43" runat="server">媒體型式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23em">
                        <asp:Label ID="Label44" runat="server">1：</asp:Label>
                        <asp:DropDownList ID="dlMediaNo1" runat="server" Width="5.5em"></asp:DropDownList>
                        <asp:Label ID="Label45" runat="server">2：</asp:Label>
                        <asp:DropDownList ID="dlMediaNo2" runat="server" Width="5.5em"></asp:DropDownList>
                        <asp:Label ID="Label46" runat="server">3：</asp:Label>
                        <asp:DropDownList ID="dlMediaNo3" runat="server" Width="5.5em"></asp:DropDownList>
                    </div>
                    <div class="dTD" style="width: 5.5em" align="right">
                        <asp:Label ID="Label47" runat="server">其他編號：</asp:Label>
                        <asp:TextBox ID="ORGNO" CssClass="hide" runat="server"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOtherNo" runat="server" Width="5.5em" MaxLength="120"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label48" runat="server" CssClass="RequireField">案情摘要：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label2" runat="server">案情摘要筆數：</asp:Label>
                        <asp:TextBox ID="txSummaryCount" runat="server" Width="2em" ReadOnly="True" MaxLength="3"></asp:TextBox>
                        <asp:Button ID="btCaseDetail" TabIndex="-1" runat="server" Width="5.5em" Text="明細展開>>"></asp:Button>
                        <asp:Label ID="lbSummaryMsg" runat="server" CssClass="hide">註：因案情摘要目前有多筆，若需維護請透過明細展開進行維護</asp:Label><br>
                        <asp:TextBox ID="txSummary" runat="server" Width="34em" CssClass="RequireField" MaxLength="300" TextMode="MultiLine" Height="10em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" style="height: 4em">
                    <div class="dTDTitle" style="width: 7.5em; vertical-align:middle"><br>
                        <asp:Label ID="Label49" runat="server" CssClass="RequireField">檔案產生機關：</asp:Label><br>
                        <asp:Label ID="Label50" runat="server">檔案有關機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" PageSize="3">
                            <Columns>
                                <asp:TemplateColumn HeaderText="機關、團體、個人名稱">
                                    <ItemTemplate>
                                        <cc1:ComboBox ID="dlOrgName" runat="server" Width="40em" CssClass="comboBox" MaxLength="120"></cc1:ComboBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label51" runat="server">應用註記：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyRemark" runat="server" Width="34em" MaxLength="600"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label52" runat="server">複製限制：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCopyRemark" runat="server" Width="34em" MaxLength="30"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label53" runat="server">其餘項目維護：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Button ID="btSubject" AccessKey="H" TabIndex="-1" runat="server" Text="主題項(H)" Title="儲存(ALT+H)"></asp:Button>
                        <asp:Button ID="btRem" AccessKey="R" TabIndex="-1" runat="server" Text="附註項(R)" Title="儲存(ALT+R)"></asp:Button>
                        <asp:Button ID="btAttInfo" AccessKey="C" TabIndex="-1" runat="server" Text="參照案卷(C)" Title="儲存(ALT+C)"></asp:Button>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="待編目案卷查詢(F)：" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" AccessKey="F" Title="待編目案卷查詢(ALT+F)"></asp:Button>
            <asp:Label runat="server" Style="display: none" Text="待編目：" ID="lbCase" DefaultStyle="newmode:none;modifymode:block;"></asp:Label>
            <asp:DropDownList runat="server" Style="display: none" ID="dlCaseNo" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
            <asp:Button runat="server" Style="display: none" Text="案件瀏覽" DefaultStyle="newmode:none;modifymode:block;" ID="btView" AccessKey="V" Title="案件瀏覽(ALT+V)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="編目校核" DefaultStyle="newmode:none;modifymode:block;" ID="btCheck" AccessKey="E" Title="編目校核(ALT+E)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取得案卷最新資料" DefaultStyle="newmode:none;modifymode:block;" ID="btGetNewCount" AccessKey="G" Title="取得最新案卷資料(ALT+G)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
