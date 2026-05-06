<%@ Page Language="c#" CodeBehind="ODT351.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT351" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT351 發文登錄作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <script type="text/javascript">
        // 1030306	Kenny	[1030109]	新增附件CheckBox全選功能
        function SelectAll() {
            for (var iRow = 2 ; iRow < document.all["dg1"].rows.length + 1 ; iRow++)
                document.all["dg1__ctl" + iRow + "_cbIncludeAttach"].checked = !document.all["dg1__ctl" + iRow + "_cbIncludeAttach"].checked;
        }
    </script>
</head>
<body ms_positioning="GridLayout">
    <span id="httpObject" style="display:none"></span>
    <form id="ODT351" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <!-- Hidden Fields -->
        <div style="width: 1px; display: none; height: 1px" id="hiddenDiv">
            <asp:DropDownList ID="dlPostTypeItems" runat="server"></asp:DropDownList>
            <asp:DropDownList ID="dlIssueDescType" runat="server"></asp:DropDownList>
            <asp:TextBox ID="txPDetail" runat="server"></asp:TextBox>
            <asp:TextBox ID="txTDetail" runat="server"></asp:TextBox>
            <asp:TextBox ID="txEDetail" runat="server"></asp:TextBox>
            <asp:TextBox ID="txIssueDetailNo" runat="server"></asp:TextBox>
            <asp:ListBox ID="Listbox1" runat="server"></asp:ListBox>
            <input style="width: 73px" id="ActiveTab" class="hide" value="Tab1" name="ActiveTab">
            <asp:TextBox ID="txSubPhone" runat="server"></asp:TextBox>
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_DIServerPath" runat="server" Width="393px"></asp:TextBox>
            <asp:TextBox ID="H_AttachServerPath" runat="server" Width="393px"></asp:TextBox>
            <asp:TextBox ID="H_ServiceURL" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_DILocalPath" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_AttachLocalPath" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_DIType" runat="server" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_EnvDIType" runat="server" Width="16px"></asp:TextBox>
            <asp:ListBox ID="H_Name" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txDocUserEmpName" runat="server"></asp:TextBox>
            <asp:TextBox ID="txDocUserPhnoe" runat="server"></asp:TextBox>
            <asp:TextBox ID="nEncryptMode" runat="server" Width="16px"></asp:TextBox>
            <asp:ListBox ID="lbAttaListFile" runat="server"></asp:ListBox>
            <asp:ListBox ID="lbIssuePath" runat="server"></asp:ListBox>
            <asp:ListBox ID="lbPrintXSLPath" runat="server" CssClass="hidden"></asp:ListBox>
            <asp:TextBox ID="H_ElecType" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_PDFMode" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_NotifyRole" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Artifact" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_OrgNo" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_NowOrgNo" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_UnitCode" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_UnitName" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_InsideTBWS" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_OutsideTBWS" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_IssueDateEdit" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_Bulletin3rd" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_HasTB" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_HasDL" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txDraftUrl" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txUploadToDL" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="h_enableUpdate" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="h_TotalAttachSizeLimit" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="h_TxInfo" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txMsgId" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="txSignType" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="TxTrans" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="h_txRole" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_ComBine" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_TBCategory" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_ExpireDate" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_AllMessage" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_TransAttSize" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_txAutoChkEIssue" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_SecNo" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:TextBox ID="H_AutoTransDi" runat="server" CssClass="hidden"></asp:TextBox>
            <asp:DropDownList ID="H_Draft_AttachName" runat="server"></asp:DropDownList>
            <asp:DropDownList ID="H_Draft_IssueNo" runat="server"></asp:DropDownList>
            <asp:TextBox ID="H_txHasOs" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txOsSecIssue" runat="server"></asp:TextBox>
            <asp:TextBox ID="txDocFromOrgName" runat="server"></asp:TextBox>
            <asp:TextBox ID="txDocUserAccount" runat="server"></asp:TextBox>
            <asp:TextBox ID="OnlyEmailIssue" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_DisableUpdateDL" runat="server"></asp:TextBox>
            <asp:TextBox ID="txPinCode" runat="server"></asp:TextBox>
            <asp:TextBox ID="txOuName" runat="server"></asp:TextBox>
            <asp:TextBox ID="txRoleName" runat="server"></asp:TextBox>
            <asp:TextBox ID="txAccount" runat="server"></asp:TextBox>
            <asp:TextBox ID="txEmpName" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_TransDiByOther" runat="server"></asp:TextBox>
			<asp:DropDownList ID="H_Draft_Name" runat="server"></asp:DropDownList>
			<asp:TextBox ID="HasPAIssue" runat="server"></asp:TextBox>
			<asp:TextBox ID="txDocProperty" runat="server"></asp:TextBox>
			<asp:TextBox ID="txMocsCase" runat="server"></asp:TextBox>
			<asp:TextBox ID="hUpdateText" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_txLastUpdateProg" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_txLastUpdateTime" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_IssueCategory" runat="server"></asp:TextBox>
			<asp:TextBox ID="HasOSIssue" runat="server"></asp:TextBox>
			<asp:TextBox ID="HasExtEIssue" runat="server"></asp:TextBox>
			<asp:TextBox ID="ExtEIssueType" runat="server"></asp:TextBox>
			<asp:TextBox ID="ExtEIssueName" runat="server"></asp:TextBox>
			<asp:Label ID="hContnet" runat="server"></asp:Label>
        </div>
        <!-- Hidden Fields END -->
        <!--1050906 David wait-->
        <!--<object style="position: absolute; top: 57px; left: 0px" id="exp" classid="CLSID:210FF79A-A4A1-429F-BABC-0B0A574B8748" data="data:application/x-oleobject;base64,mvcPIaGkn0K6vAsKV0uHSAADAAAaAAAAGgAAAA==" width="1" height="1"></object>
		<object style="visibility: hidden" id="BF" codebase="Template/LIB/brsr.cab" classid="CLSID:FDDE9481-9E0F-4B6A-A368-9632F5C93028" viewastext progid="Browser.FolderBrowser"></object>
		<object style="width: 0px; height: 0px" id="PDF" classid="CLSID:210FF79A-A4A1-429F-BABC-0B0A574B8748" data="data:application/x-oleobject;base64,mvcPIaGkn0K6vAsKV0uHSAADAAAAAAAAAAAAAA==" viewastext></object>
		<object style="display: none" id="WSWrapper" codebase="Template/LIB/WSWrapper.dll" classid="CLSID:CC14F94E-8C6E-4698-93BE-4AF2A451CA12" viewastext></object>
		<object style="display: none" id="LoginCOM" codebase="dll\LoginCOM.dll" classid="CLSID:58278908-D252-46FC-90BE-831E3B9ACB88" viewastext></object>-->
		<object style="display: none" id="ocx" classid="CLSID:58278908-D252-46FC-90BE-831E3B9ACB88" viewastext></object>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="15"></asp:TextBox>
                        <asp:Label ID="Label10" runat="server">公文性質：</asp:Label>
                        <asp:TextBox ID="txDocPro" runat="server" Width="20.5em" Height="1.5em" ReadOnly="True" CssClass="DisplayOnly" TextMode="MultiLine"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">稿數：</asp:Label>
                        <asp:TextBox ID="txDraftCnt" runat="server" Width="1.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                        <!--<asp:button id="btPrevious" runat="server" CssClass="hidden" Visible="False" Enabled="False" Text="<"></asp:button>
                                <asp:button id="btNext" runat="server" CssClass="hidden" Visible="False" Enabled="False" Text=">"></asp:button>-->
                        <asp:CheckBox ID="cb_retransfer" runat="server" Text="上級機關誤判之改分公文註記"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label2" runat="server">　　主旨：</asp:Label>
                        <asp:TextBox ID="txSubject" runat="server" Width="40.5em" ReadOnly="True" CssClass="DisplayOnly" Height="2.5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label3" runat="server">發文字號：</asp:Label>
                        <asp:TextBox ID="txIssueWord" runat="server" Width="4.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">字　第</asp:Label>
                        <asp:TextBox ID="txIssueNo" runat="server" Width="6.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server">號</asp:Label>
                        <span style="width: 28.5em">
                            <asp:Label ID="Label6" runat="server">發文日期：</asp:Label>
                            <asp:TextBox ID="txIssueDate" runat="server" Width="4em" ReadOnly="True" CssClass="DisplayOnly InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                            <asp:Label ID="lbHold" runat="server" ForeColor="Red" Visible="False">(續辦公文)</asp:Label>&nbsp;&nbsp;
							<asp:Label ID="Label13" runat="server">發文別：</asp:Label>
                            <asp:RadioButton ID="rbAll" runat="server" Text="總發文" GroupName="IssueType"></asp:RadioButton>
                            <asp:RadioButton ID="rbUnit" runat="server" Text="單位發文" GroupName="IssueType"></asp:RadioButton>
                        </span>
                    </div>
                </div>
                <div class="dTR" id="trReason">
                    <div class="dTD">
                        <asp:Label ID="Label20" runat="server">無法電子交換原因：</asp:Label>
                        <asp:DropDownList ID="dlReason" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR" id="trMeetingType">
                    <div class="dTD">
                        <asp:Label ID="Label30" runat="server">會議型式：</asp:Label>
                        <asp:DropDownList ID="dlMeetingType" runat="server">
                            <asp:ListItem Value="0">非開會通知單</asp:ListItem>
                            <asp:ListItem Value="1">一般會議</asp:ListItem>
                            <asp:ListItem Value="2">無紙化會議</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5em; min-height: 1px">
                        <asp:Label ID="Label8" runat="server">發文方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbActualIssue1" runat="server" Width="6.5em" Text="紙本" GroupName="rbActualIssue"></asp:RadioButton>
                        <asp:Label ID="Label27" runat="server"></asp:Label>
                        <asp:DropDownList ID="dlPdetail" runat="server"></asp:DropDownList>
                        <asp:CheckBox ID="cbCanEIssue" runat="server" Text="不適用電子交換"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5em; min-height: 1px">
                        <asp:Label ID="Label25" runat="server"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbActualIssue2" runat="server" Width="6.5em" Text="電子交換" GroupName="rbActualIssue"></asp:RadioButton>
                        <asp:Label ID="Label28" runat="server"></asp:Label>
                        <asp:DropDownList ID="dlEdetail" runat="server"></asp:DropDownList>
                        <asp:Label ID="lbDraft" runat="server" Width="112px">，指定轉出稿件：</asp:Label>
                        <asp:CheckBoxList ID="cblDraft" TabIndex="-1" runat="server" Width="34.5em" RepeatLayout="Flow" RepeatDirection="Horizontal" RepeatColumns="5">
                        </asp:CheckBoxList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5em; min-height: 1px">
                        <asp:Label ID="Label26" runat="server"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbActualIssue3" runat="server" Width="6.5em" Text="電子公布欄" GroupName="rbActualIssue"></asp:RadioButton>
                        <asp:Label ID="Label29" runat="server"></asp:Label>
                        <asp:DropDownList ID="dlTdetail" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5em; min-height: 1px">
                        <asp:Label ID="Label33" runat="server"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbIsFep" runat="server" Text="電子交換檔轉出"></asp:CheckBox>
                        <!--<asp:RadioButton ID="rbFepTypeUpper" runat="server" Text="位置如上" GroupName="rbFepType"></asp:RadioButton>
						<asp:RadioButton ID="rbFepType4" runat="server" Text="其它" GroupName="rbFepType"></asp:RadioButton>
						<asp:TextBox ID="txFpeTypeOther" runat="server" Width="10.5em"></asp:TextBox>
						<asp:Button ID="btFepOther" runat="server" Text="…"></asp:Button>-->
                        <asp:Button ID="btTranToOther" runat="server" Text="檔案下載"></asp:Button>
                    </div>
                </div>
                <div class="dTR" id="trTB">
                    <div class="dTD">
                        <asp:Label ID="Label15" runat="server">張貼公布欄：</asp:Label>
                        <asp:Button ID="btPasteBulletin" runat="server" Text="發布" Enabled="False"></asp:Button>
                        <span id="PasteTBSpan">
                            <asp:CheckBox ID="cbTBInside" runat="server" Text="內部" Enabled="False"></asp:CheckBox>
                            <asp:Label ID="Label21" runat="server" Enabled="False">(</asp:Label>
                            <asp:CheckBox ID="cbAllOrg" runat="server" Text="全機關週知" Enabled="False"></asp:CheckBox>
                            <asp:Label ID="Label22" runat="server" Enabled="False">)</asp:Label>
                            <span id="TBOutsideSPan">
                                <asp:CheckBox ID="cbTBoutside" runat="server" Text="外部" Enabled="False"></asp:CheckBox>
                                <asp:Label ID="Label23" runat="server" Enabled="False">(</asp:Label>
                                <asp:CheckBox ID="cbPublic" runat="server" Text="發布至民眾" Enabled="False"></asp:CheckBox>
                                <asp:Label ID="Label24" runat="server" Enabled="False">)</asp:Label>
                            </span>
                            <asp:Label ID="Label9" runat="server" Enabled="False">　自發文日起</asp:Label>
                            <asp:TextBox ID="txTBPasteDay" runat="server" Width="1.5em" ReadOnly="True" Enabled="False"></asp:TextBox>
                            <asp:Label ID="Label19" runat="server" Enabled="False">天</asp:Label>
                            <asp:CheckBox ID="cbTBEmail" runat="server" Text="輔以EMAIL通知公告對象" Enabled="False"></asp:CheckBox>
                            <asp:CheckBox ID="cbTBEmailToOD17" runat="server" Text="僅通知登記桌" Enabled="False"></asp:CheckBox>
                        </span>
                    </div>
                </div>
                <div class="hidden">
                    <div class="dTD">
                        <span style="width: 16.5em">
                            <asp:Label ID="Label12" runat="server">Email通知：</asp:Label>
                            <asp:CheckBox ID="cbEmailNotifyMain" runat="server" Text="正本"></asp:CheckBox>
                            <asp:CheckBox ID="cbEmailNotifyCopy" runat="server" Text="副本"></asp:CheckBox>
                            <asp:CheckBox ID="cbEmailNotifyScript" runat="server" Text="抄件"></asp:CheckBox>
                            <asp:Button ID="btEmail" runat="server" Text="寄送"></asp:Button>
                        </span>
                        <asp:TextBox ID="txCheckFile" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label7" runat="server">附件電子檔：</asp:Label>
                        <asp:TextBox ID="tbShowAttach" runat="server" Width="28.5em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label31" runat="server">重新發文原因：</asp:Label>
                        <asp:DropDownList ID="dlDmType" runat="server" Width="8.5em"></asp:DropDownList>
                        <asp:Label ID="Label32" runat="server">重新發文備註：</asp:Label>
                        <asp:TextBox ID="txDmDesc" runat="server" Width="18.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="trHandSec">
                    <div class="dTD">
                        <asp:Label ID="Label14" runat="server">電子郵件發文加印處理：</asp:Label>
                        <asp:CheckBox ID="cbSealMark" runat="server" Text="騎縫章"></asp:CheckBox>
                        <asp:CheckBox ID="cbPageNo" runat="server" Text="頁碼"></asp:CheckBox>
                        <asp:CheckBox ID="cbCopy" runat="server" Text="正副抄本章"></asp:CheckBox>
                        <asp:CheckBox ID="cbSecret" runat="server" Text="(正本)行文單位保密"></asp:CheckBox>
                        <asp:CheckBox ID="cbSecret_Copy" runat="server" Text="(副本)行文單位保密"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR" id="trMailDesc">
                    <div class="dTD">
                        <asp:Label ID="Label16" runat="server">電子郵件發文信件說明文字：</asp:Label>
                        <asp:TextBox ID="txEmailDetail" runat="server" Width="28.5em"></asp:TextBox>
                        <asp:Button ID="btPreviewMail" runat="server" Width="7.5em" Text="預覽信件"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <span style="width: 56.5em">
                            <asp:Label ID="lbSendMode" runat="server">發文後公文傳送方式：</asp:Label>
                            <asp:RadioButton ID="rbReturn" runat="server" Text="退回" GroupName="SendMode"></asp:RadioButton>
                            <asp:RadioButton ID="rbArchive" runat="server" Text="歸檔" GroupName="SendMode"></asp:RadioButton>
                            <asp:RadioButton ID="rbStamp" runat="server" Text="用印" GroupName="SendMode"></asp:RadioButton>
                            <asp:RadioButton ID="rbNone" runat="server" Text="不傳送" GroupName="SendMode"></asp:RadioButton>
                            <asp:RadioButton ID="rbWwtf" runat="server" Text="預排流程" GroupName="SendMode"></asp:RadioButton>
                            <asp:TextBox ID="H_txWWTF" runat="server" CssClass="hide"></asp:TextBox>
                            <asp:RadioButton ID="rbUser" runat="server" GroupName="SendMode"></asp:RadioButton>
                            <asp:DropDownList ID="dlUser" runat="server"></asp:DropDownList>
                        </span>
                    </div>
                </div>
            </div>
            <div style="display: none" id="MultiPage" class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <img id="Tab1" alt="" src="images/IssueOrg.gif" width="100" height="29" />
                        <img id="Tab2" alt="" src="images/Attach.gif" width="100" height="29" />
                        <asp:Label ID="Label18" runat="server"></asp:Label>
                        <asp:Label ID="Label17" runat="server">備註欄批次註記：</asp:Label>
                        <asp:TextBox ID="txPathIssueDescType" runat="server" Width="1.5em" MaxLength="2"></asp:TextBox>
                        <asp:TextBox ID="txPathIssueDesc" runat="server" Width="4.5em" MaxLength="50"></asp:TextBox>
                        <asp:Button ID="btSet" runat="server" Text="設定"></asp:Button>
                    </div>
                </div>
                <!-- 第一類 -->
                <div id="Page1" type="multiPage">
                    <fieldset id="fsCheck" align="top">
                        <asp:Button ID="btdg1SelectAll" runat="server" Text="全選"></asp:Button>
                        <asp:Button ID="btdg1Reverse" runat="server" Text="反向"></asp:Button>
                        <div class="GridDiv" style="height: 15.5em; overflow: auto" id="divDg1">
                            <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbIssueOrg" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="稿號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDraftNo" runat="server" Width="2.5em" CssClass="TextLabel" ReadOnly="True" Style="text-align: center"></asp:TextBox>
                                        </ItemTemplate>
                                        <FooterStyle HorizontalAlign="Center"></FooterStyle>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="支號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txSubNo" runat="server" Width="2.5em" CssClass="TextLabel" EnableViewState="False" Style="text-align: center"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="本別">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocType" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="受文機關">
                                        <ItemTemplate>
                                            <asp:Label ID="IssueOrg" runat="server"></asp:Label>
                                            <asp:TextBox ID="txIssueOrgNo" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txOrgAddress" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txOrgPostNo" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txCabinetNo" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:CheckBox ID="cbOrgCanEIssue" runat="server" CssClass="hide"></asp:CheckBox>
                                            <asp:CheckBox ID="cbIsInside" runat="server" CssClass="hide"></asp:CheckBox>
                                            <asp:TextBox ID="txIssueGateWay" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txPersonName" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txInternalID" runat="server" CssClass="hide"></asp:TextBox>
											<asp:TextBox ID="txIssueIdentity" runat="server" CssClass="hide"></asp:TextBox>
											<asp:Label ID="txFormalName" runat="server" CssClass="hide"></asp:Label>
                                            <asp:Label ID="lbNameAddress" runat="server" CssClass="hide"></asp:Label>
                                            <asp:Label ID="lbTitle" runat="server" CssClass="hide"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="發文別">
                                        <ItemTemplate>
                                            <asp:TextBox ID="IssueType" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2" ToolTip="1：電子交換、2：郵寄、3：人工傳遞"></asp:TextBox>
                                            <asp:TextBox ID="txHiddenData" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txIsOverSea" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="郵寄方式">
                                        <ItemTemplate>
                                            <asp:DropDownList ID="dlPostType" runat="server"></asp:DropDownList>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="國別">
                                        <ItemTemplate>
                                            <asp:DropDownList ID="dlCountry" runat="server">
                                                <asp:ListItem Value="0" Selected="True">國內</asp:ListItem>
                                                <asp:ListItem Value="1">國外</asp:ListItem>
                                            </asp:DropDownList>
                                            <asp:TextBox ID="H_txRegion" runat="server" CssClass="hide"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="郵資機">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbPost" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="彙整">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbCombine" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="附件">
                                        <HeaderTemplate>
                                            <asp:CheckBox ID="CheckAll" runat="server" onclick="javascript: SelectAll();" Text="附件" />
                                        </HeaderTemplate>
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbIncludeAttach" runat="server" onclick="javascript:fnAdjustAttachOfIssueOrg();"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="備註">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txIssueDescType" runat="server" Width="1.5em" MaxLength="2"></asp:TextBox>
                                            <asp:TextBox ID="txIssueDesc" runat="server" Width="4.5em" MaxLength="50"></asp:TextBox>
                                            <asp:TextBox ID="txEmail" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txCategory" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txSpd" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:TextBox ID="txSec" runat="server" CssClass="hide"></asp:TextBox>
                                            <asp:Label ID="lbOrgName" runat="server" CssClass="hide"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </fieldset>
                </div>
                <!-- 第二類 -->
                <div id="Page2" class="hide" type="multiPage">
                    <fieldset id="Fieldset1" align="top">
                        <div class="GridDiv" style="height: 8.5em; overflow: auto" id="divDg2">
                            <asp:DataGrid ID="dg2" runat="server" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="稿">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txDraftNo" runat="server" Width="38px" ReadOnly="True" CssClass="TextLabel" Style="text-align: center"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="支號">
                                        <ItemTemplate>
                                            <asp:TextBox ID="txSubNo" runat="server" Width="38px" CssClass="TextLabel" EnableViewState="False" Style="text-align: center"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="附件隨文">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbAttachWithDoc" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="附件名">
                                        <ItemTemplate>
                                            <asp:Label ID="lbAttachName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="附件電子檔">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="lbAttachFileName" runat="server"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="附件摘要">
                                        <ItemTemplate>
                                            <asp:Label ID="lbAttDesp" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="檔案大小(KBytes)">
                                        <ItemTemplate>
                                            <asp:Label ID="lbAttachFileSize" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="發文結案(S)" AccessKey="S" DefaultStyle="newmode:none;modifymode:block;" ID="btUpdate"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="發文轉出(W)" AccessKey="W" DefaultStyle="newmode:none;modifymode:block;" ID="btTransfer"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="電子發文路徑設定" DefaultStyle="newmode:none;modifymode:none;" ID="btSetup"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽發文清單(P)" AccessKey="P" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印發文清單" DefaultStyle="newmode:none;modifymode:none;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="文稿檢視(U)" AccessKey="U" DefaultStyle="newmode:none;modifymode:block;" ID="btViewPaper"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="重新載入稿件(R)" AccessKey="R" DefaultStyle="newmode:none;modifymode:block;" ID="btRefresh"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="上傳附件下載區(D)" AccessKey="D" DefaultStyle="newmode:none;modifymode:block;" ID="btUpdateDL"></asp:Button>
        </asp:Panel>

    </form>
</body>
</html>
