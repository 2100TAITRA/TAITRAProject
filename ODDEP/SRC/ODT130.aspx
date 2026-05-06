<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT130.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT130" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT130 公文收文登錄作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <style type="text/css">
        .PopUp1 {
            BEHAVIOR: url(LIB/PopUpMessage.htc);
        }
    </style>
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT130" onkeyup="jf_CheckFull();" method="post" runat="server" enctype="multipart/form-data">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox Style="z-index: 101; position: absolute; top: 102px; left: 10px" ID="lbReturnValue"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable">
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 12em">
                        <div style="overflow: auto" id="ck1">
                            <asp:CheckBox ID="cbPrBar" runat="server" CssClass="InputFieldLabel" Text="儲存或傳送時，須列印條碼"
                                Font-Size="Smaller" Checked="True"></asp:CheckBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label1" class="KeyField" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:TextBox Style="ime-mode: disabled" ID="txDocNo" class="KeyUpperField" TabIndex="10" runat="server" Width="8em"></asp:TextBox>
                        <asp:TextBox ID="txDocNoTextChange" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="hScanSYSID" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="hScan_SrvNo" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="h_worktype" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label4" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox CssClass="DatePicker" Style="ime-mode: disabled" ID="txRcvDate" TabIndex="20" runat="server" Width="4.2em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox CssClass="InputFieldNumeric" Style="ime-mode: disabled" ID="txRcvMin" TabIndex="-1" runat="server" Width="2.7em" MaxLength="4"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label7" runat="server">本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlType" TabIndex="30" runat="server" CssClass="InputFieldLabel" Width="4em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label6" runat="server">密等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:DropDownList ID="ddlSec" TabIndex="40" runat="server" Width="5em"></asp:DropDownList>
                        <asp:TextBox ID="ddlSecText" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label39" runat="server">解密條件：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <cc1:ComboBox ID="dlRmvSec_Cond" TabIndex="45" runat="server" MaxLength="40" CssClass="comboBox">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="(本件至 年 月 日解密)">(本件至 年 月 日解密)</asp:ListItem>
                            <asp:ListItem Value="(本件於公布時解密)">(本件於公布時解密)</asp:ListItem>
                            <asp:ListItem Value="(其他(其他特別條件或另行檢討後辦理解密))">(其他(其他特別條件或另行檢討後辦理解密))</asp:ListItem>
                        </cc1:ComboBox><asp:TextBox ID="txSecCheckEnv" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                     <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="lbExtRmvSecDate" runat="server" CssClass="hide">解密期限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExtRmvSecDate" runat="server" Width="4.7em" MaxLength="7" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label3" runat="server">文別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:DropDownList ID="ddlCategory" TabIndex="50" runat="server" Width="8em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label8" runat="server">速別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="ddlSpeed" TabIndex="60" runat="server" Width="6em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label5" class="RequireField" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromDate" CssClass="DatePicker" TabIndex="70" runat="server" Width="4.7em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label25" runat="server">案件編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:TextBox Style="ime-mode: disabled" ID="txCaseNo" TabIndex="80" runat="server" Width="6em" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btCaseNoPrompt" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label2" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:DropDownList ID="ddlProperty" TabIndex="90" runat="server" Width="7em"></asp:DropDownList>
                        <asp:Button ID="btTaInfo" TabIndex="91" runat="server" Text="任審資訊"></asp:Button>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label28" runat="server">時效統計：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSumTypeShow" class="InputFieldText" TabIndex="-1" runat="server" CssClass="displayOnly" Width="6em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label26" runat="server">公文來源：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:DropDownList ID="ddlDocSource" TabIndex="105" runat="server" Width="6em">
                            <asp:ListItem Value=" " Selected="True">正常公文</asp:ListItem>
                            <asp:ListItem Value="1">上級機關交辦</asp:ListItem>
                            <asp:ListItem Value="2">上級機關交議</asp:ListItem>
                            <asp:ListItem Value="3">會銜</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label32" runat="server" Width="97px">上級收文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox Style="ime-mode: disabled" ID="txSrcRcvNo" TabIndex="106"
                            runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label33" runat="server" Width="113px">上級收文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="ime-mode: disabled" ID="txSrcRcvDate" CssClass="DatePicker" TabIndex="107" runat="server" Width="4.2em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label27" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <cc1:ComboBox ID="dlWorkType" TabIndex="113" runat="server" CssClass="comboBox" Width="7em" Rows="5">
                        </cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label9" class="hide" runat="server">辦理階段：</asp:Label>
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlStepName" TabIndex="114" runat="server" CssClass="hide"></asp:DropDownList>
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label29" runat="server">處理期限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="ime-mode: disabled" ID="txLeadTime" CssClass="InputFieldNumeric" TabIndex="116" runat="server" Width="1.5em" MaxLength="3"></asp:TextBox>
                        <asp:DropDownList ID="dlLtUom" TabIndex="117" runat="server" Width="3em">
                            <asp:ListItem Value="天">天</asp:ListItem>
                            <asp:ListItem Value="月">月</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label30" runat="server" Height="11px">起算日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:TextBox ID="txStartDate" CssClass="DatePicker" TabIndex="118" runat="server" Width="4.2em" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label34" runat="server" Height="11px">開會日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txMeetDate" CssClass="DatePicker" TabIndex="119" runat="server" Width="4.2em" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label31" runat="server" Height="11px">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="ime-mode: disabled" ID="txLimitDate" CssClass="DatePicker" TabIndex="119" runat="server" Width="4.2em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>

                <asp:Panel ID="PanelSMEG" runat="server">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label ID="LabelTax" runat="server">統一編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox ID="txTAX_ID_NO" runat="server" Width="4.2em" MaxLength="8" TabIndex="1190" CssClass="InputFieldNumeric" Style="ime-mode: disabled"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 6em">
                            <asp:Label ID="LabelCardNo" runat="server">專案卡號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox ID="txCLIENT_CARD_NO" runat="server" Width="4.2em" MaxLength="8" TabIndex="1191" CssClass="InputFieldNumeric" Style="ime-mode: disabled"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label ID="lbManage" runat="server">列管編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 12em">
                            <asp:TextBox ID="txMANAGE_BANK_NO" runat="server" Width="1.7em" MaxLength="3" TabIndex="1192" CssClass="InputFieldNumeric" Style="ime-mode: disabled"></asp:TextBox>
                            <asp:TextBox ID="txMANAGE_CASE_NO" runat="server" Width="3.2em" MaxLength="6" TabIndex="1193" CssClass="InputFieldNumeric" Style="ime-mode: disabled"></asp:TextBox>
                            <asp:TextBox ID="txBANK_CODE" runat="server" CssClass="hide"></asp:TextBox>
                            <asp:TextBox ID="txBANK_BRANCH_CODE" runat="server" CssClass="hide"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR" style="height: 24px">


                        <div class="dTDTitle" style="width: 8em">
                            &nbsp
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:Label ID="lbTaxName" runat="server"></asp:Label>
                            &nbsp
                        </div>
                        <div class="dTDTitle" style="width: 6em">
                            &nbsp
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:Label ID="lbCardName" runat="server"></asp:Label>
                            &nbsp
                        </div>
                        <div class="dTDTitle" style="width: 8em">
                        </div>
                        <div class="dTD" style="width: 22em">
                            <asp:Label ID="lbManageName" runat="server"></asp:Label>
                            &nbsp
                        </div>
                    </div>
                </asp:Panel>

                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label40" class="RequireField" runat="server">來文者：</asp:Label>
                    </div>
                    <div class="dTD DgSelectToolBar">
                        <asp:Button ID="btFromOrgDiv" TabIndex="120" runat="server" Text=">>"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    </div>
                    <div class="dTD" style="width: 24em">
                        <asp:Label ID="Label17" runat="server">機關代號名稱</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label18" runat="server">來文字號</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    </div>
                    <div class="dTD" style="width: 24em">
                        <asp:TextBox ID="txAutoOrgName1" onblur="txFromOrgNo1_onblur()" TabIndex="130" runat="server" Width="10em"></asp:TextBox>
                        <div id="DivOrgMenu1" style="position: absolute; width: 10em;"></div>
                        <asp:ImageButton ID="btFromPrompt1" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txFromOrgNo1" TabIndex="-1" runat="server" CssClass="PopUp1" Width="10em" MaxLength="30"
                            BorderStyle="None" BackColor="Transparent" ForeColor="Navy"></asp:TextBox>
                        <asp:TextBox ID="txFromOrgName1" TabIndex="-1" runat="server" CssClass="hide" MaxLength="15" BorderStyle="None" BackColor="Transparent"></asp:TextBox>
                        <asp:TextBox ID="h_OrgID" TabIndex="-1" runat="server" CssClass="hide" MaxLength="15" BorderStyle="None" BackColor="Transparent"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlFromWord1" TabIndex="135" runat="server" CssClass="comboBox" Width="4em" Rows="5"></cc1:ComboBox>
                        <asp:Label ID="Label19" runat="server">字第</asp:Label>
                        <asp:TextBox Style="ime-mode: disabled" ID="txFromNo1" TabIndex="140" runat="server" CssClass="PopUp1"
                            Width="6.2em" MaxLength="20" ForeColor="Navy"></asp:TextBox>
                        <asp:Label ID="Label20" runat="server">號</asp:Label>
                    </div>
                </div>
                <div id="divFromOrg" ms_positioning="FlowLayout">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        </div>
                        <div class="dTD" style="width: 24em">
                            <asp:TextBox ID="txAutoOrgName2" onblur="txFromOrgNo2_onblur()" TabIndex="145" runat="server" Width="10em"></asp:TextBox>
                            <div id="DivOrgMenu2" style="position: absolute; width: 9em;"></div>
                            <asp:ImageButton ID="btFromPrompt2" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:TextBox ID="txFromOrgNo2" TabIndex="-1" runat="server" CssClass="PopUp1" Width="10em" MaxLength="30" BorderStyle="None" BackColor="Transparent" ForeColor="Navy"></asp:TextBox>
                            <asp:TextBox ID="txFromOrgName2" TabIndex="-1" runat="server" CssClass="hide" MaxLength="15" BorderStyle="None" BackColor="Transparent"></asp:TextBox>
                            <asp:TextBox ID="h_OrgID2" TabIndex="-1" runat="server" CssClass="hide" MaxLength="15" BorderStyle="None" BackColor="Transparent"></asp:TextBox>
                        </div>
                        <div class="dTD">
                            <cc1:ComboBox ID="dlFromWord2" TabIndex="150" runat="server" CssClass="comboBox" Width="4em" Rows="5"></cc1:ComboBox>
                            <asp:Label ID="Label21" runat="server">字第</asp:Label>
                            <asp:TextBox Style="ime-mode: disabled" ID="txFromNo2" TabIndex="155" runat="server" CssClass="PopUp1" Width="6.2em" MaxLength="20" ForeColor="Navy"></asp:TextBox>
                            <asp:Label ID="Label22" runat="server">號</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        </div>
                        <div class="dTD" style="width: 24em">
                            <asp:TextBox ID="txAutoOrgName3" onblur="txFromOrgNo3_onblur()" TabIndex="160" runat="server" Width="10em"></asp:TextBox>
                            <div id="DivOrgMenu3" style="position: absolute; width: 9em;"></div>
                            <asp:ImageButton ID="btFromPrompt3" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:TextBox ID="txFromOrgNo3" TabIndex="-1" runat="server" CssClass="PopUp1" Width="10em" MaxLength="30" BorderStyle="None" BackColor="Transparent" ForeColor="Navy"></asp:TextBox>
                            <asp:TextBox ID="txFromOrgName3" TabIndex="-1" runat="server" CssClass="hide" MaxLength="15" BorderStyle="None" BackColor="Transparent"></asp:TextBox>
                            <asp:TextBox ID="h_OrgID3" TabIndex="-1" runat="server" CssClass="hide" MaxLength="15" BorderStyle="None" BackColor="Transparent"></asp:TextBox>
                        </div>
                        <div class="dTD">
                            <cc1:ComboBox ID="dlFromWord3" TabIndex="165" runat="server" CssClass="comboBox" Width="4em" Rows="5"></cc1:ComboBox>
                            <asp:Label ID="Label23" runat="server">字第</asp:Label>
                            <asp:TextBox Style="ime-mode: disabled" ID="txFromNo3" TabIndex="170" runat="server" CssClass="PopUp1" Width="6.2em" MaxLength="20" ForeColor="Navy"></asp:TextBox>
                            <asp:Label ID="Label24" runat="server">號</asp:Label>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label11" class="RequireField" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD DgSelectToolBar">
                        <asp:TextBox ID="txSubjectNo" TabIndex="195" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:ImageButton ID="btSubjectCode" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif" Height="20px"></asp:ImageButton>
                        <br>
                        <asp:Button ID="btSubjectDiv" TabIndex="196" runat="server" Text=">>"></asp:Button>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="200" runat="server" Width="36em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div id="divSubject" ms_positioning="FlowLayout" class="hide">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label ID="Label36" runat="server">並列案由：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txAppSubject" TabIndex="200" runat="server" Width="40em"
                                TextMode="MultiLine"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label ID="Label37" runat="server">其他案由：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txOtherSubject" TabIndex="200" runat="server" Width="40em" TextMode="MultiLine"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label12" class="RequireField" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                    	<asp:Button ID="btSimilarDocDept" runat="server" Text="輔助檢索"></asp:Button>
                        <cc1:ComboBox ID="dlDEPT" TabIndex="210" runat="server" CssClass="comboBox" Width="10em"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSECT" TabIndex="220" runat="server" CssClass="comboBox" Width="10em"></cc1:ComboBox>
                        <asp:Label ID="Label13" runat="server">承辦人：</asp:Label>
                        <cc1:ComboBox ID="dlUSER" TabIndex="220" runat="server" CssClass="comboBox" Width="10em"></cc1:ComboBox>
                        <asp:Label ID="lbEForm" runat="server" Width="96px" Visible="False">電子請辦單：</asp:Label>
                        <asp:Button ID="btOpenEForm" TabIndex="250" runat="server" Text="開啟" Visible="False" Enabled="False"></asp:Button>
                    </div>
                </div>
				
				<asp:Panel ID="PanelTxReason" runat="server">
                 <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="lbTxReason" runat="server">改分原因：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30.5em">
                        <asp:TextBox ID="txTxReason" runat="server" Width="30em" MaxLength="300"></asp:TextBox>
                    </div>
                </div>
				</asp:Panel>
				
                <div class="dTR">
                    <div class="dTD" style="width: 8em">
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:CheckBox ID="cbIsChiefDoc" TabIndex="230" runat="server" Text="長官交辦公文"></asp:CheckBox>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:CheckBox ID="cbIsOnlineDoc" TabIndex="240" runat="server" Text="線上簽核公文"></asp:CheckBox>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:CheckBox ID="cbAssignByChief" TabIndex="245" runat="server" Text="長官分文"></asp:CheckBox>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label ID="Label14" runat="server">電子檔：</asp:Label>
                    </div>
                    <div class="dTD DgSelectToolBar">
                        <asp:Button ID="btOpenElec" TabIndex="250" runat="server" Text="開啟"></asp:Button>
                        <asp:Button ID="btConfig" TabIndex="260" runat="server" Text="設定" Visible="False"></asp:Button>
                        <asp:Button ID="btDetail" TabIndex="260" runat="server" Text="明細"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD" style="width: 8em">
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    </div>
                    <div class="dTD" style="width: 18em">
                        <asp:CheckBox ID="cbComeOthers" TabIndex="230" runat="server" Text="陳核會稿公文：" onclick="return false"></asp:CheckBox>
                        <asp:DropDownList Style="z-index: 0" ID="dlComeOthers" TabIndex="240" runat="server" Width="5em">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="1">外陳</asp:ListItem>
                            <asp:ListItem Value="2">外會</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:CheckBox Style="z-index: 0" ID="cbIsRcvfile" TabIndex="250" runat="server"
                            Text="紙本併同歸檔"></asp:CheckBox>
                    </div>
                    <div class="dTD DgSelectToolBar" style="width: 16em">
                        <asp:Button ID="btAuditDoc" TabIndex="-1" runat="server" Text="需回覆公文(無指定回覆日期)" Visible="False"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0" ID="Label10" runat="server">來源註記：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlRcvtypeDesc" TabIndex="270" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="H_dlRcvtypeDesc" TabIndex="270" runat="server" CssClass="hide"></asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:Label Style="z-index: 0" ID="Label15" runat="server" CssClass="hide">來源別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="ddlSource" TabIndex="270" runat="server" CssClass="hide">
                            <asp:ListItem Value="P">紙本來文</asp:ListItem>
                            <asp:ListItem Value="E">電子交換</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="ddlSourceText" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label Style="z-index: 0" ID="Label16" runat="server">郵件Email：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txEmail" TabIndex="280" runat="server" Width="20.5em" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em" id="ck2">
                        <asp:Label ID="lbMailRcvNo" runat="server">郵件號碼：</asp:Label>
                    </div>
                    <div class="dTD" id="ck3">
                        <asp:TextBox ID="txMailRcvNo" TabIndex="280" runat="server" Width="40.5em" MaxLength="50"></asp:TextBox>
                    </div>
                </div>

                <asp:Panel ID="PanelImgFilePath" runat="server">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="lbImgFilePath" runat="server">掃描影像匯入：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txImgFilePath" runat="server" Height="1.7em" type="file" multiple="true" accept=".pdf, .tif, .tiff" onchange="handleImgFileSelect();"></asp:TextBox>
                    </div>
                </div>
                    </asp:Panel>

                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label35" runat="server">實體附件註記：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="ime-mode: disabled" ID="txRcvAttNo" TabIndex="285" runat="server" Width="1em" MaxLength="1"></asp:TextBox>
                        <asp:ImageButton ID="btRcvAttNo" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif" Height="20px"></asp:ImageButton>
                        <asp:TextBox ID="txAttDesc" TabIndex="-1" runat="server" CssClass="TextLabel" Width="80px" MaxLength="15" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" id="Assign_1">
                    	
                        <asp:CheckBox ID="cbAssign" TabIndex="290" runat="server" Text="移文/銷號"></asp:CheckBox>
                    </div>
                    <div class="dTD" id="Assign_2">
						<asp:Button ID="btSimilarDocAssign" runat="server" Text="輔助檢索"></asp:Button>
                        <asp:DropDownList ID="dlAssignOrg" runat="server"></asp:DropDownList>
                        <asp:Button Style="display: none" ID="btCancelVerson" TabIndex="250" runat="server" Text="移文原因"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label38" runat="server">實體附件明細：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="GridDiv">
                            <asp:DataGrid ID="dg1" runat="server" PageSize="5" AutoGenerateColumns="False">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="附件名稱">
                                        <ItemTemplate>
                                            <asp:DropDownList ID="dlDesc" runat="server" Width="228px"></asp:DropDownList>
                                            <asp:TextBox ID="tbDESC" runat="server" Width="228px" MaxLength="50"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="媒體型式">
                                        <ItemTemplate>
                                            <asp:DropDownList ID="dlREM" runat="server" Width="80px"></asp:DropDownList>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="數量">
                                        <ItemTemplate>
                                            <asp:TextBox Style="ime-mode: Disabled" CssClass="InputFieldNumeric" ID="tbCNT" runat="server" Width="35px" MaxLength="4"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="計量單位">
                                        <ItemTemplate>
                                            <asp:DropDownList ID="dlUNIT" runat="server" Width="61px"></asp:DropDownList>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="DivTable">
            <div class="dTR">
                <div style="width: 708px; display: none; height: 42px; visibility: hidden" id="hiddenDiv">
                    <asp:TextBox ID="H_FromODT136" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_AutoOpen" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_txODT134AutoOpen" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="h_UserId" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="h_OrgNo" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="h_DeptNo" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="h_RoleNo" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="txSealAndMoveOk" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:CustomValidator ID="Validator" runat="server" CssClass="hide" ErrorMessage="CustomValidator"></asp:CustomValidator>
                    <asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hide"></asp:ValidationSummary>
                    <asp:TextBox ID="htxUserName" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="htxDeptName" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="txSumType" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txLtIncHd" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="txLtBy" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="txStartRule" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="txStartDateRule" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="txLeadTimeDB" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="H_Value" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_DeptNo_Value" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_SectNo_Value" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_UserNo_Value" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_IsExtent" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_ExtentInfo" runat="server" CssClass="hide"></asp:TextBox>
                    <asp:TextBox ID="H_txRcvDate" runat="server" CssClass="hide"></asp:TextBox>
                    <!--<object style="display: none" id="ClientIO" codebase="lib\WSWrapper.dll" classid="CLSID:CC14F94E-8C6E-4698-93BE-4AF2A451CA12">
                        </object>
                        <object style="display: none" id="Eric" codebase="lib\SFolderUtil.dll" classid="CLSID:A91A64E6-219E-4AC1-8626-60BBEE9B1575">
                        </object>
                        <object style="visibility: hidden" id="BF" codebase="Lib/brsr.cab" classid="CLSID:FDDE9481-9E0F-4B6A-A368-9632F5C93028"
                            progid="Browser.FolderBrowser">
                        </object>-->
                    <asp:TextBox ID="txElecMsg" runat="server" CssClass="hide" Width="65px"></asp:TextBox>
                    <asp:TextBox ID="H_FromODT138" runat="server" Width="96px"></asp:TextBox>
                    <asp:TextBox ID="txLeadTimeOpen" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="txStartDateOpen" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="h_WorkFilePath" runat="server" CssClass="hidden" Width="49px"></asp:TextBox>
                    <asp:TextBox ID="txMode" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="txWorkType" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="txStepName" runat="server" Width="25px"></asp:TextBox>
                    <input id="fobj" size="1" type="file" name="fobj">
                    <asp:TextBox ID="txOrgNoOthers" runat="server" Width="96px"></asp:TextBox>
                    <asp:TextBox ID="hComeOtherSYSID" runat="server" Width="96px"></asp:TextBox>
                    <asp:TextBox ID="hComeDocNo" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="h_SYSID" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="txLtUom" runat="server" Width="10px"></asp:TextBox>
                    <asp:TextBox ID="txOdElecSignType" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="txWorkTypeIdx" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="H_txDocState" runat="server" CssClass="hidden"></asp:TextBox>
                    <asp:TextBox ID="H_BarCode" runat="server" CssClass="hidden"></asp:TextBox>
                    <asp:DropDownList ID="H_PropertyStore" runat="server"></asp:DropDownList>
                    <asp:TextBox ID="H_txBulletinID" runat="server" CssClass="hidden" Width="16px"></asp:TextBox>
                    <asp:TextBox ID="H_txRcvSec" runat="server" Width="22px"></asp:TextBox>
                    <asp:TextBox ID="H_txDateNow" runat="server" Width="62px"></asp:TextBox>
                    <asp:TextBox ID="H_CitizenCaseType" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="H_LegislatorNo" runat="server" Width="25px"></asp:TextBox>
                    <asp:TextBox ID="H_txSourceUseM" runat="server" Width="10px"></asp:TextBox>
                    <asp:TextBox ID="H_txSourceUseC" runat="server" Width="10px"></asp:TextBox>
                    <asp:TextBox ID="H_txSuggestNo" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txSuggestContent" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_HyWebUrl" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txDueRule" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txMoiGroupCaseNo" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txLastUpdateProg" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txLastUpdateTime" runat="server"></asp:TextBox>
                    <!--1041117 David 1040816 新增欄位紀錄PDUE_DATE-->
                    <asp:TextBox ID="txPDueDate" runat="server"></asp:TextBox>
                    <!--1041217 David 1040937 紀錄是否為再次受陳受會及已存在的公文目錄-->
                    <asp:CheckBox ID="cbSameComeOtherDoc" runat="server"></asp:CheckBox>
                    <asp:TextBox ID="txSameComeOtherDocFilePath" runat="server"></asp:TextBox>
                    <!--1041223 David 1040838 (104年法規)新增重複來文處理-->
                    <asp:TextBox ID="txRcvDmType" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txRcvDmDesc" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txDmDocNo" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txDmOuName" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txDmEmpName" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txDmOrgName" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txDmFromWordNo" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txDmSubject" runat="server"></asp:TextBox>
                    <!--1050202 David 1040937 因外陳外會選單設定DISABLE會造成抓不到CLIENY端異動結果，新增隱藏欄位紀錄-->
                    <asp:TextBox ID="txComeOthers" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_DocStart" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_DocEnd" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txUseNo" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_DeptName" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_RcvOrgno" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_RcvOrg" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txDocumentID" runat="server"></asp:TextBox>
                    <asp:TextBox ID="txCancelFolderMsgId" runat="server"></asp:TextBox>
                    <!-- System Fields -->
                    <!-- 連線狀態：0連線，1離線 -->
                    <!-- for ODWDCM -->
                    <!-- for ODWMSG -->
                    <!-- <INPUT dataFld="SECRETE" id="txSec1" style="WIDTH: 26px; HEIGHT: 22px" dataSrc="#xmldso2" type="text" size="1" name="Text1"> -->
                    <!-- tree view return value columns -->
                    <asp:TextBox ID="H_txPERSON_FULL_NAME" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txPERSON_ID" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txJOB_ORGNO" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txJOB_ORGNAME" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txJOB_NO" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txJOB_TITLE_NO" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txJOB_TITLE" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txTA_TYPE" runat="server"></asp:TextBox>
                    <asp:TextBox ID="H_txCaseDocTempGuid" runat="server"></asp:TextBox>
                    <asp:TextBox ID="h_txConfLight" runat="server"></asp:TextBox>
                </div>
            </div>
        </div>
        <div style="z-index: 300; border-bottom: black 1px solid; position: absolute; border-left: black 1px solid; padding-bottom: 1px; background-color: infobackground; padding-left: 1px; width: 40px; padding-right: 1px; display: none; height: 22px; font-size: x-small; border-top: black 1px solid; top: 75px; border-right: black 1px solid; padding-top: 1px; left: 10px"
            id="lbToolTip" ms_positioning="FlowLayout">
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btElecRcv" runat="server" Text="電子收文(J)" AccessKey="J" title="電子收文(ALT+J)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btEmail" runat="server" Text="Email載入" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSecLogin" runat="server" Text="密件公文(L)" AccessKey="L" title="密件公文(ALT+L)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btRcvScan" runat="server" Text="掃描影像(A)" AccessKey="A" title="掃描影像(ALT+A)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btComeOthers" runat="server" Text="陳核會稿(W)" AccessKey="W" title="陳核會稿(ALT+W)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btBulletin" runat="server" Text="公佈欄收文(B)" AccessKey="B" title="公佈欄收文(ALT+B)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btHyWeb" runat="server" Text="線上申辦(O)" AccessKey="O" title="線上申辦(ALT+O)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCaseDocTemp" runat="server" Text="管制案件(E)" AccessKey="A" title="管制案件(ALT+E)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:DropDownList ID="ddRptName" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:none;">
                <asp:ListItem Value="Assign" Selected="True">分文</asp:ListItem>
            </asp:DropDownList>
            <asp:Button ID="btOnlySave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btSave" runat="server" Text="傳送(R)" AccessKey="R" title="傳送(ALT+R)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
