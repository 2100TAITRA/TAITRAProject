<%@ Page Language="c#" CodeBehind="EAI302.aspx.cs" AutoEventWireup="false" Inherits="EA71.EAI302" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAI302 案件檔案目錄明細瀏覽</title>
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
    <form id="EAI302" onkeyup="jf_CheckFull();" method="post" runat="server">
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
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="DetailTable">
                <div class="DivTable" id="tbDetail" style="border-style: solid">
                    <div class="dTR">
                        <div class="dTDTitle">
                            <asp:CheckBox ID="cbSELECT" onclick="SelectItem('DOC_CHECK')" runat="server" Font-Size="Smaller" BackColor="Info" Text="線上調檔或申請調檔，請勾選左方核選按鈕"></asp:CheckBox>
                            <asp:Label ID="lbSEQ_NO" runat="server" CssClass="hidden">1.</asp:Label>
                        </div>
                    </div>
                    <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 6em; min-height: 1px">
                        </div>
                        <div class="dTD" style="width: 12em; min-height: 1px">
                            <asp:Button ID="btOpenEdit" runat="server" Text="文稿編輯" Enabled="False"></asp:Button>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label2" runat="server">簽核類型：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbSignType" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label3" runat="server">收(創)文日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbRCV_DATE" runat="server">999/99/99</asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label4" runat="server">公文狀態：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbDOC_STATE" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label5" runat="server">目前位置：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbCURR_LOCATION" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label6" runat="server">來文者：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:TextBox ID="txFromOrg" runat="server" Width="40.5em" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label7" runat="server">來文日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbFROMORG_DATE" runat="server">999/99/99</asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label8" runat="server">來文字號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:TextBox ID="txFromNo" runat="server" Width="22.5em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label9" runat="server">來源收文日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbSRC_RCV_DATE" runat="server">999/99/99</asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label10" runat="server">來源收文號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:TextBox ID="txDOC_RCV_NO" runat="server" Width="22.5em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label11" runat="server">公文性質：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbDocProperty" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label12" runat="server">關鍵字：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:TextBox ID="txKEY_WORD" runat="server" Width="22.5em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label13" runat="server">本別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbTYPE_NAME" runat="server">正本</asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label14" runat="server">密　　等：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbSEC_NAME" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label15" runat="server">文　　別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbCATEGORY" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label16" runat="server">速別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbSPEED" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label17" runat="server">起算日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbSTART_DATE" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label18" runat="server">限辦日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbDUE_DATE" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label50" runat="server">密件流水號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbSEC_SEQ" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label55" runat="server">單位流水號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:Label ID="lbOLD_DOC_NO" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label51" runat="server">結案種類：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbCloseType" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label52" runat="server">續辦：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbCaseCon" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label53" runat="server">發文性質：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbIssueProperty" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label19" runat="server">主旨：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:Label ID="lbSUBJECT" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label20" runat="server">承辦單位：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label21" runat="server">承辦人：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label22" runat="server">辦畢日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbCLOSE_DATE" runat="server">999/99/99</asp:Label>
                        </div>
                    </div>
                    <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label23" runat="server">發文者：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:TextBox ID="txIssueOrg" runat="server" Width="40.5em" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label24" runat="server">發文日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbISSUE_DATE" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label25" runat="server">發文字號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:TextBox ID="txIssueNo" runat="server" Width="22.5em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label26" runat="server">上級發文日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbUPISSUE_DATE" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label27" runat="server">上級發文字號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:TextBox ID="lbUpIssueNo" runat="server" Width="22.5em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label28" runat="server">受文者：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:TextBox ID="txRcvOrg" runat="server" Width="40.5em" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                        </div>
                    </div>
                    <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label29" runat="server">併案情形：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbComType" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label30" runat="server">相關案件文號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:Label ID="lbComNo" runat="server"></asp:Label>
                            <asp:CheckBox ID="cbComStatus" onclick="SelectItem('DOC_CHECK')" runat="server" Font-Size="Smaller" Text="併件"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label31" runat="server">檔號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbFileNo" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbStockText" runat="server">櫥位號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:Label ID="lbStockNo" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label32" runat="server">案名：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:Label ID="lbCASE_NAME" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label33" runat="server">保存年限：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbKEEP_YEAR" runat="server">99</asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbTPDesDate" runat="server">擬銷毀日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:Label ID="lbPDES_DATE" runat="server">999/99/99</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label34" runat="server">解密別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbRMVSEC_CODE" runat="server">歸檔後解密</asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label35" runat="server">解密日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbRSEC_DATE" runat="server">999/99/99</asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label36" runat="server">應用限制：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbAPPLY_LIMIT" runat="server">開放</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label37" runat="server">解密條件：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbRSEC_DESP" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label54" runat="server">應解密日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:Label ID="lbExtRmvSec_Date" runat="server">999/99/99</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label38" runat="server">應用註記：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:Label ID="lbAPPLY_REMARK" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label39" runat="server">文件產生日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbRCV_DATE2" runat="server">999/99/99</asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label40" runat="server">歸檔日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:Label ID="lbFILE_DATE" runat="server">999/99/99</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label41" runat="server">檔案數量：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:Label ID="lbFILE_CNT" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label42" runat="server">電子媒體編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbVolume" runat="server"></asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label43" runat="server">副版電子媒體編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:Label ID="lbVolume2" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label44" runat="server">附件資訊：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:TextBox ID="txAttach" runat="server" Width="40.5em" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label45" runat="server">電子檔：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:TextBox ID="txFile" runat="server" Width="40.5em" CssClass="PopUp" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label46" runat="server">複製限制：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:Label ID="lbCOPY_REMARK" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbTDesDate" runat="server">銷毀日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbDES_DATE" runat="server">999/99/99</asp:Label>
                        </div>
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="lbTDesDocNo" runat="server">核准銷毀文號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 27em; min-height: 1px">
                            <asp:Label ID="lbDES_DOCNO" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div style="height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label47" runat="server">並列案由：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:Label ID="lbAppSubject" runat="server"></asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em; min-height: 1px">
                            <asp:Label ID="Label48" runat="server">其他案由：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 45em; min-height: 1px">
                            <asp:Label ID="lbOtherSubject" runat="server"></asp:Label>
                        </div>
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
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="線上瀏覽" ID="btIMAGE1" AccessKey="V" Title="線上瀏覽(ALT+V)"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="申請調檔" ID="btAPPLY1" AccessKey="A" Title="申請調檔(ALT+A)"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="明細列印" ID="btDetailPrint" Title="明細列印"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="流程查詢" ID="btQueryProcess" Title="流程查詢"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="離開" ID="btEXIT1" AccessKey="X" Title="離開(ALT+X)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
