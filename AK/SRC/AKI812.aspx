<%@ Page Language="c#" CodeBehind="AKI812.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI812" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKI812 檔案目錄併案明細瀏覽</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="LIB/AK.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKI812" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
		<!-- 2016.8 - Leslie 補上報表顯示所需要的框架DIV -->
		<div id="dlgASPXPage" style="display:none;width:99%;height:99%;padding:0px;">
			<div class="pane" style="width:101%;height:101%;overflow-y: hidden;overflow-x:hidden; -webkit-overflow-scrolling:touch;">
			  <iframe class="aspx_page_content" style="width:99%;height:99%;"></iframe>
			</div>
			<a class="closeBtn" style="display:none"></a>
		</div><!-- <div id="dlgASPXPage" ... -->
        <div class="BaseTable" >
            <div class="DivTable" style="border-style: solid; " id="DetailTable" >
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:CheckBox ID="cbSELECT" onclick="SelectItem('COM_CHECK')" runat="server" Height="22px" 
                            Text="線上調檔或申請調檔，請勾選左方核選按鈕" BackColor="Info" CssClass="InputFieldText" ></asp:CheckBox><asp:Label ID="lbSEQ_NO" runat="server" CssClass="hidden">1.</asp:Label></td>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" Style="text-align: right" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
                        <asp:Button ID="btOpenEdit" runat="server" Text="文稿調閱" BackColor="PaleGoldenrod" Font-Underline="True" ></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label5" Style="text-align: right" runat="server">收(創)文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbRCV_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label2" Style="text-align: right" runat="server" >公文狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:Label ID="lbDOC_STATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label46" Style="text-align: right" runat="server">目前位置：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbCURR_LOCATION" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" Style="text-align: right" runat="server">來文者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:TextBox ID="txFromOrg" runat="server" CssClass="PopUp"  TextMode="MultiLine" Width="36em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label6" Style="text-align: right" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbFROMORG_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label7" Style="text-align: right" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="txFromNo" runat="server" CssClass="PopUp" Height="22px"  Width="20em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label20" Style="text-align: right" runat="server">來源收文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbSRC_RCV_DATE" runat="server" ></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label27" Style="text-align: right" runat="server">來源收文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="txDOC_RCV_NO" runat="server" ReadOnly="True" CssClass="PopUp" Height="22px"   Width="20em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label28" Style="text-align: right" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbDocProperty" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label38" Style="text-align: right" runat="server">關鍵字：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:TextBox ID="txKEY_WORD" runat="server" ReadOnly="True" CssClass="PopUp" Height="22px"   Width="7em"></asp:TextBox>
                    </div>
					<div class="dTDTitle">
						<asp:Label Style="text-align: right" ID="lbTitleCaseNo" runat="server">案件編號：</asp:Label>
					</div>
					<div class="dTD" style="width: 8em">
						<asp:Label ID="lbCaseNo" runat="server"></asp:Label>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label8" Style="text-align: right" runat="server">本別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbTYPE_NAME" runat="server">正本</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label11" Style="text-align: right" runat="server">密　　等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:Label ID="lbSEC_NAME" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label9" Style="text-align: right" runat="server">文　　別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:Label ID="lbCATEGORY" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label10" Style="text-align: right" runat="server">速別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbSPEED" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label44" Style="text-align: right" runat="server">起算日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:Label ID="lbSTART_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5em">
                        <asp:Label ID="Label45" Style="text-align: right" runat="server">限辦日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:Label ID="lbDUE_DATE" runat="server"></asp:Label>
                    </div>
                </div>
				<div style="width:100%;height:0.5px;margin:0px auto;padding:0.25px;background-color:rgba(0, 0, 128, 1);overflow:hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label12" Style="text-align: right" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:Label ID="lbSUBJECT" runat="server" ></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label13" Style="text-align: right" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label15" Style="text-align: right" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:Label ID="lbEmpName" runat="server" ></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label19" Style="text-align: right" runat="server">辦畢日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:Label ID="lbCLOSE_DATE" runat="server" ></asp:Label>
                    </div>
                </div>
                 <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label49" Style="text-align: right" runat="server">權責單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbRpsdeptName" runat="server"></asp:Label>
                    </div>
                    <div class="hide" style="width: 8em">
                        <asp:Label ID="Label51" Style="text-align: right" runat="server">權責承辦人：</asp:Label>
                    </div>
                    <div class="hide" style="width: 4em">
                        <asp:Label ID="lbRpsEmpname" runat="server" ></asp:Label>
                    </div>
                </div>
                <div class="dTR MOCS_EXTRA"  id="rowMOCS1">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label Style="text-align: right" ID="Label76" runat="server">姓名：</asp:Label>
					</div>
					<div class="dTD" style="width: 14em">
						<asp:Label ID="lbFullName" runat="server"></asp:Label>
					</div>
					<div class="dTDTitle" style="width: 14.5em">
						<asp:Label Style="z-index: 0; text-align: right" ID="Label80" runat="server">身分證號：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em">
						<asp:Label Style="z-index: 0" ID="lbFullPID" runat="server"></asp:Label><br>
					</div>
				</div>
				<div style="width:100%;height:0.5px;margin:0px auto;padding:0.25px;background-color:rgba(0, 0, 128, 1);overflow:hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label22" Style="text-align: right" runat="server">發文者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:TextBox ID="txIssueOrg" runat="server" ReadOnly="True" CssClass="PopUp" Height="22px"  TextMode="MultiLine" Width="36em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label23" Style="text-align: right" runat="server">發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbISSUE_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label24" Style="text-align: right" runat="server">發文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="txIssueNo" runat="server" ReadOnly="True" CssClass="PopUp" Width="20em" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label47" Style="text-align: right" runat="server">上級發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbUPISSUE_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label48" Style="text-align: right" runat="server" >上級發文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:TextBox ID="lbUpIssueNo" runat="server" ReadOnly="True" CssClass="PopUp" Width="20em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label25" Style="text-align: right" runat="server">受文者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:TextBox ID="txRcvOrg" runat="server" ReadOnly="True" TextMode="MultiLine" CssClass="PopUp" Height="22px"   Width="36em"></asp:TextBox>
                    </div>
                </div>
				<div style="width:100%;height:0.5px;margin:0px auto;padding:0.25px;background-color:rgba(0, 0, 128, 1);overflow:hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label14" Style="text-align: right" runat="server">併案情形：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbComType" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label17" Style="text-align: right" runat="server">相關案件文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em">
                        <asp:Label ID="lbComNo" runat="server"></asp:Label>
                        <asp:CheckBox ID="cbComStatus" onclick="SelectItem('DOC_CHECK')" runat="server" 
                            Text="併件"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label16" Style="text-align: right" runat="server">檔號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 23em">
                        <asp:Label ID="lbFileNo" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle MOCS_EXTRA" style="width: 5.5em">
						<asp:Label Style="z-index: 0; text-align: right" ID="Label77" runat="server">四角號碼：</asp:Label>
					</div>
					<div class="dTD MOCS_EXTRA" style="width: 10em">
						<asp:Label Style="z-index: 0" ID="lb4CornerNo" runat="server"></asp:Label><br>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label21" Style="text-align: right" runat="server">案名：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbCASE_NAME" runat="server"></asp:Label>
                    </div>
                </div>
                <div style="width: 100%; height: 0.25px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label18" Style="text-align: right" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbKEEP_YEAR" runat="server">99</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="lbTPDesDate" Style="text-align: right" runat="server">擬銷毀日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbPDES_DATE" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label30" Style="text-align: right" runat="server">解密別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbRMVSEC_CODE" runat="server">歸檔後解密</asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label31" Style="text-align: right" runat="server">解密日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:Label ID="lbRSEC_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label26" Style="text-align: right" runat="server">應用限制：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:Label ID="lbAPPLY_LIMIT" runat="server">開放</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label32" Style="text-align: right" runat="server">解密條件：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 40em">
                        <asp:Label ID="lbRSEC_DESP" runat="server" Width="641px"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label29" Style="text-align: right" runat="server">文件產生日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="lbRCV_DATE2" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label33" Style="text-align: right" runat="server">歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbFILE_DATE" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label34" Style="text-align: right" runat="server">檔案數量：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:Label ID="lbFILE_CNT" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label35" Style="text-align: right" runat="server">電子媒體編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:Label ID="lbVolume" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label36" Style="text-align: right" runat="server">副版電子媒體編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbVolume2" runat="server" Height="22px" Width="179px"></asp:Label>
                    </div>
                </div>
				<div style="width:100%;height:0.5px;margin:0px auto;padding:0.25px;background-color:rgba(0, 0, 128, 1);overflow:hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label37" Style="text-align: right" runat="server">附註項：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:TextBox ID="txRemark" runat="server" ReadOnly="True" TextMode="MultiLine" CssClass="PopUp" Height="22px"  Width="36em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label39" Style="text-align: right" runat="server">主題項：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:TextBox ID="txTheme" runat="server" ReadOnly="True" TextMode="MultiLine" CssClass="PopUp" Height="22px"  Width="36em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label40" Style="text-align: right" runat="server">附件資訊：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:TextBox ID="txAttach" runat="server" ReadOnly="True" TextMode="MultiLine" CssClass="PopUp" Height="22px" Width="36em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label41" Style="text-align: right" runat="server">電子檔：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:TextBox ID="txFile" runat="server" ReadOnly="True" TextMode="MultiLine" CssClass="PopUp" Height="22px"  Width="36em"></asp:TextBox>
                    </div>
                </div>
				<div style="width:100%;height:0.5px;margin:0px auto;padding:0.25px;background-color:rgba(0, 0, 128, 1);overflow:hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="lbTDesDate" Style="text-align: right" runat="server">銷毀日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:Label ID="lbDES_DATE" runat="server"></asp:Label>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="lbTDesDocNo" Style="text-align: right" runat="server">核准銷毀文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Label ID="lbDES_DOCNO" runat="server"></asp:Label>
                    </div>
                </div>
				<div style="width:100%;height:0.5px;margin:0px auto;padding:0.25px;background-color:rgba(0, 0, 128, 1);overflow:hidden;"></div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label42" Style="text-align: right" runat="server">並列案由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:Label ID="lbAppSubject" runat="server" Width="55em"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label43" Style="text-align: right" runat="server">其他案由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 30em">
                        <asp:Label ID="lbOtherSubject" runat="server" Width="55em"></asp:Label>
                    </div>
                </div>
                <div style="width: 100%; height: 0.5px; margin: 0px auto; padding: 0.25px; background-color: rgba(0, 0, 128, 1); overflow: hidden;"></div>
            </div>
        </div>
       
        <div style="display: none; z-index: 101; left: 784px; overflow: auto; width: 200px; position: absolute; top: 107px; height: 303px">
            <asp:TextBox ID="txUnvFile" runat="server" Width="43px"></asp:TextBox>
            <asp:TextBox ID="txWebWorkPath" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txServerName" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txServerPort" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:TextBox ID="txUnvFileLocal" TabIndex="26" runat="server" Width="18px" MaxLength="16"></asp:TextBox>
            <asp:CustomValidator ID="CustomValidatorCommon" runat="server" Height="20px" ErrorMessage="CustomValidator" Display="None"></asp:CustomValidator>
            <asp:TextBox ID="DOC_CHECK" runat="server" Width="44px"></asp:TextBox>
            <asp:TextBox ID="h_tbFlag" runat="server" Width="54px"></asp:TextBox>
            <asp:TextBox ID="txOrgNo" runat="server" Width="43px"></asp:TextBox>
            <asp:CustomValidator ID="Customvalidator1" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ValidationSummary ID="Validationsummary3" runat="server" Height="25px" Width="175px"></asp:ValidationSummary>
            <asp:TextBox ID="COM_CHECK" runat="server" CssClass="" Width="44px"></asp:TextBox>
            <asp:Label ID="lbRPSSECT_NO" runat="server" Visible="False">●</asp:Label>
            <asp:Label ID="lbRPS_USER" runat="server" Visible="False">●</asp:Label>
            <asp:Label ID="Label1" runat="server" Visible="False">●</asp:Label>
            <asp:Label ID="lbSOURCE_ORGNO" runat="server" CssClass="" Visible="False"></asp:Label>
            <asp:Label ID="lbRPSDEPT_NO" runat="server" CssClass=""></asp:Label>
            <asp:TextBox ID="H_txAKT800DgSize" Style="z-index: 105; left: 8px; position: absolute; top: 8px" runat="server" Height="8px" CssClass="hidden" Width="4px"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Label ID="lbPAGE" runat="server" ForeColor="Black" >第</asp:Label>
            <asp:TextBox runat="server" Width="2.5em" ID="txNum" BackColor="LightGray" Text="1" ReadOnly="True"></asp:TextBox>
            <asp:Label ID="Label66" runat="server" ForeColor="Black" >筆</asp:Label>
            <asp:Label ID="Label67" runat="server" ForeColor="Black" >/ 共</asp:Label>
            <asp:TextBox runat="server" Width="2em" ID="txTotNum" BackColor="LightGray" ReadOnly="True"></asp:TextBox>
            <asp:Label ID="Label68" runat="server" ForeColor="Black" >筆</asp:Label>
            <asp:Button ID="btSUM1" runat="server" Text="顯示摘要(L)" accessKey="L" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btFIRSTDOC1" runat="server" Text="第一筆(G)" accessKey="G" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPRIORDOC1" runat="server" Text="上一筆(P)" accessKey="P" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btNEXTDOC1" runat="server" Text="下一筆(N)"  accessKey="N" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btLASTDOC1" runat="server" Text="最末筆(L)" accessKey="L" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btIMAGE1" runat="server" Text="線上瀏覽(U)" accessKey="U" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:CheckBox ID="cbKeepOldImageList" runat="server" Text="(保留)" Checked="True"></asp:CheckBox>
            <asp:Button ID="btAPPLY1" runat="server" Text="申請調檔(I)" accessKey="I" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btDetailPrint" runat="server" Text="明細預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btQueryProcess" runat="server" Text="流程查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btEXIT1" runat="server" Text="離開(Y)"  accessKey="Y" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        </div>
    </form>
</body>
</html>
