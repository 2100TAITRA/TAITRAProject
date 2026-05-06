<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKM330.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM330" ValidateRequest="false"  enableEventValidation="false"%>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKM330 檔案目錄維護作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="LIB/AK.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body class="hidden" ms_positioning="GridLayout">
    <form id="AKM330" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div class="DivBaseTable">
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="laDocNo" runat="server" Height="11px">文(編)號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="ime-mode: disabled;height:1.2em;resize: none;" ID="tbDOC_NO" TabIndex="1"  TextMode="MultiLine" onkeypress="jf_UPPERCASE()" runat="server" MaxLength="15">0123456789012</asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label ID="lbFILE_DOC" runat="server" Height="17px" >待編目:</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:DropDownList ID="dlFILE_DOC" TabIndex="2" runat="server" Style="width: 7em">
                            <asp:ListItem></asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="laRDate" runat="server" Height="11px" >收創文日期:</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:TextBox Style="ime-mode: disabled;width: 4em" ID="tbRDATE" TabIndex="3" onkeypress="jf_InpNumOnly()" runat="server" MaxLength="7" class="InputFieldNumeric"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server" Height="11px">參照文號:</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox  Style="ime-mode: disabled;" ID="tbCOM_NO" TabIndex="4" onkeypress="jf_UPPERCASE()" runat="server" ></asp:TextBox>
					</div>
					<div class="dTD" style="width: 3.5em">
                        <asp:CheckBox ID="cbComNo" TabIndex="5" runat="server" Text="併件"></asp:CheckBox>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:Button ID="btComSearch" runat="server"  Text="併案查詢"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server" Height="11px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
					<div class="dTD" style="width: 4em">
                        <asp:Label ID="Label34"  class="RequireField" runat="server" Font-Size="X-Small" Height="11px">版本別</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:Label ID="laFileYear" runat="server" Font-Size="X-Small" Height="11px">年度號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11.5em">
                        <asp:Label ID="laFileCls" runat="server" Font-Size="X-Small">分類號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:Label ID="laFileCase" runat="server" Font-Size="X-Small">案次號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3.5em">
                        <asp:Label ID="laFileVol" runat="server" Font-Size="X-Small">卷次號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:Label ID="laFileSeq" runat="server"  Font-Size="X-Small">目次號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:Label ID="lbFileComboSeq" runat="server" CssClass="RequireField" Font-Size="X-Small" Visible="False"></asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:Label ID="lbStock" runat="server" CssClass="RequireField"  Font-Size="X-Small">櫥位號</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="laFileNo" runat="server" CssClass="RequireField" >檔號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:TextBox Style="ime-mode: disabled;width: 3em" ID="tbVerNo" TabIndex="6" onkeypress="jf_InpNumOnly();" runat="server" MaxLength="3" class="InputFieldNumeric">12</asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:TextBox Style="ime-mode: disabled;width: 3em" ID="tbYEAR" TabIndex="6" onkeypress="jf_InpNumOnly();" runat="server" MaxLength="3" class="InputFieldNumeric">123</asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 9em">
                        <asp:TextBox Style="ime-mode: disabled;width: 8.5em" ID="tbCLS" TabIndex="7" runat="server" MaxLength="20"></asp:TextBox>
                    </div>
					<div class="dTD" style="width: 2.5em">
                        <asp:ImageButton ID="ibtCLS" TabIndex="-1" runat="server" Height="22px" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:TextBox Style="ime-mode: disabled;width:7em" ID="tbCASE" TabIndex="8" runat="server" MaxLength="12"></asp:TextBox>
                    </div>
					 <div class="dTD" style="width: 1.75em">
                        <asp:ImageButton ID="ibtCASE" TabIndex="-1" runat="server" Height="22px" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTD" style="width: 3.5em">
                        <asp:TextBox Style="ime-mode: disabled;width: 2.5em" ID="tbVOL" TabIndex="9" onkeypress="jf_UPPERCASE();" runat="server" MaxLength="4"></asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 3.5em">
                        <asp:TextBox Style="ime-mode: disabled;width: 2.5em" ID="tbSEQ" TabIndex="10" onkeypress="jf_UPPERCASE();" runat="server" MaxLength="3"></asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox Style="ime-mode: disabled;width: 4em" ID="txFileComboSeq" TabIndex="10" onkeypress="jf_InpNumOnly();" runat="server" MaxLength="2" Visible="False" class="InputFieldNumeric"></asp:TextBox>
                    </div>
					<div class="dTD" style="width: 3em">
                        <asp:Button ID="btAutoVol" TabIndex="-1" runat="server" Text="編卷"></asp:Button>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:TextBox Style="width: 6em" ID="txStockNo"   CssClass="hide"  runat="server"></asp:TextBox>
                    </div>
					 <div class="dTD" style="width: 2.5em">
                        <asp:ImageButton ID="ibtSTOCKNO" TabIndex="-1" runat="server" CssClass="hide"  ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                    </div>
					<div class="dTD" style="width: 6em">
                        <asp:Label ID="laKeepYear" runat="server" CssClass="RequireField" >保存年限：</asp:Label>
                    </div>
					 <div class="dTD" style="width: 3em">
                        <asp:TextBox Style="ime-mode: disabled;width: 2em" ID="tbKeep_Year" TabIndex="15" onkeypress="jf_InpNumOnly();" runat="server"  MaxLength="2" class="InputFieldNumeric"></asp:TextBox>
                    </div>
					
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label14" runat="server"  Height="21px">清理處置：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox style="width: 10em" ID="txClearProc" TabIndex="-1" runat="server" BackColor="#E0E0E0" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label15" runat="server" Height="11px">調整後清理處置：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox style="width: 10em" ID="txOClearProc" TabIndex="-1" runat="server" BackColor="#E0E0E0" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label11" runat="server">類目名稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox style="width: 10em" ID="txClsName" TabIndex="-1" runat="server" BackColor="#E0E0E0" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label27" runat="server" Height="11px">案名：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox style="width: 10em" ID="txCaseName" TabIndex="-1" runat="server" BackColor="#E0E0E0" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5em">
                        <asp:Label ID="lbVolTotalPage" runat="server" Height="20px" Font-Size="X-Small">目前總頁數：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 2em">
                        <asp:TextBox style="width: 2em" ID="txVolTotalPage" TabIndex="-1" runat="server" BackColor="#E0E0E0" Height="24px"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label style="width: 3em" ID="laFromSubject" runat="server" Height="11px">案由：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 41.5em">
                        <asp:TextBox style="width: 41em" ID="tbSUB" TabIndex="20" runat="server" MaxLength="300"></asp:TextBox>
                    </div>
					 <div class="dTD" style="width: 4em">
                        <asp:Button ID="btOTHER_OBJECT" TabIndex="-1" runat="server" Text="其他案由" Enabled="False"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="laFName" runat="server" Height="11px">主要來文者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 41.5em">
                        <asp:TextBox style="width: 41em" ID="tbFNAME" TabIndex="25" runat="server"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server" Height="11px">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <asp:TextBox Style="ime-mode: disabled;width: 4em" ID="tbFDATE" TabIndex="30" onkeypress="jf_InpNumOnly();" runat="server" MaxLength="7" class="InputFieldNumeric"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label17" runat="server" Height="11px">來文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox style="width: 5.5em" ID="txFromNoWord" TabIndex="35" runat="server" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 3em">
                        <asp:Label ID="Label30" runat="server" Height="11px">字第：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox Style="ime-mode: disabled;width: 5.5em" ID="tbFNO" TabIndex="36" runat="server" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 1em">
                        <asp:Label ID="Label31" runat="server" Height="11px">號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 2em">
                        <asp:Button ID="GetFromNo" runat="server" Text=">>"></asp:Button>
					</div>
					<div class="dTD" style="width: 16em">
                        <asp:TextBox style="width: 10em" ID="tbFromNo" runat="server" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="laIName" runat="server" Height="11px">主要發文者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 24em">
                        <asp:TextBox ID="tbINAME" TabIndex="40" runat="server" Height="22px" style="width: 23em"></asp:TextBox>
                    </div>
                    <div class="dTD" style="width: 10em">
						<cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" CssClass="comboBox" Width="7em"><asp:ListItem>未繫結</asp:ListItem></cc1:ComboBox>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:Button ID="btISS_NO" TabIndex="-1" runat="server" Height="24" Text="來發受文明細" Enabled="False"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label5" runat="server" Height="11px">發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <asp:TextBox Style="ime-mode: disabled;width: 4em" ID="tbIDATE" TabIndex="45" onkeypress="jf_InpNumOnly();" runat="server"  MaxLength="7" class="InputFieldNumeric"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label19" runat="server" Height="11px">發文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <cc1:ComboBox style="width: 5.5em" ID="dllIssueNoWord" CssClass="comboBox" runat="server"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 3em">
                        <asp:Label ID="Label32" runat="server" Height="11px">字第：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox Style="ime-mode: disabled;width: 5.5em" ID="tbINO" TabIndex="51" runat="server" MaxLength="20"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 1em">
                        <asp:Label ID="Label33" runat="server" Height="11px">號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 2em">
                        <asp:Button ID="GetIssueNo" runat="server" Text=">>"></asp:Button>
                    </div>
					<div class="dTD" style="width: 16em">
						<asp:TextBox style="width: 10em" ID="tbIssueNo" runat="server" ></asp:TextBox>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label13" runat="server" Height="11px">受文者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox style="width: 10em" ID="tbRCVNAME" TabIndex="55" runat="server"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5em">
                        <asp:Label style="width: 4em" ID="Label20" runat="server" Height="11px">辦畢日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <asp:TextBox Style="ime-mode: disabled;width: 4em" ID="tbCDATE" TabIndex="56" runat="server" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5em">
                        <asp:Label ID="Label7" runat="server" Height="11px">辦畢時間：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <asp:TextBox Style="ime-mode: disabled;width: 4em" ID="tbCTIME" TabIndex="57" runat="server" MaxLength="4"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label21" runat="server" Height="11px">文件產生日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <asp:TextBox style="width: 4em" ID="tbCrtDate" TabIndex="-1" runat="server"></asp:TextBox>
                    </div>
                </div>
                 <div class="dTR" id="InpStoreDate">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label36" runat="server" Height="11px">編目日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 14em">
                        <asp:TextBox ID="txInpFileDate" runat="server" style="ime-mode: disabled;width: 4em" BackColor="#E0E0E0" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label style="width: 4em" ID="Label37" runat="server" Height="11px">入庫保管日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6em">
                        <asp:TextBox style="width: 4em" ID="txStoreDate" TabIndex="56" runat="server" MaxLength="7" CssClass="DatePicker"></asp:TextBox>
                        <asp:TextBox ID="hMStoreDate" TabIndex="83" runat="server" CssClass="hide" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label22" runat="server" Height="11px">庫房：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlStore" TabIndex="60" runat="server" style="width: 13em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label24" runat="server" Height="11px">公文儲存位置：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox ID="txDocLocation" TabIndex="65" runat="server"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label12" runat="server" Height="11px">應用限制：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlAPPLYLIMIT" TabIndex="80" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="laDocSec" runat="server" CssClass="RequireField" Height="11px" >密等：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlSECRET" TabIndex="82" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="Label25" runat="server" Height="11px" >密件另存流水號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 11em">
                        <asp:TextBox ID="txSecSeq" TabIndex="83" runat="server" MaxLength="9"></asp:TextBox>
                        <asp:TextBox ID="hMSecSeq" TabIndex="83" runat="server" CssClass="hide" ></asp:TextBox>
						</div>
					<div class="dTD" style="width: 3em">
                        <asp:Button ID="btSecSeq" TabIndex="-1" runat="server" Text="編號"></asp:Button>
                    </div>
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label28" runat="server" Height="11px">應解密日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <asp:TextBox Style="ime-mode: disabled;width: 4em" ID="tbExtRmvSec_Date" runat="server" MaxLength="7" Enabled="False"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label10" runat="server" Height="11px">解密條件：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <cc1:ComboBox ID="dlRmvSec_Cond" TabIndex="90" runat="server" MaxLength="40" CssClass="comboBox">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="本件至 年 月 日解密">本件至 年 月 日解密</asp:ListItem>
                            <asp:ListItem Value="本件於公布時解密">本件於公布時解密</asp:ListItem>
                            <asp:ListItem Value="(其他(其他特別條件或另行檢討後辦理解密))">(其他(其他特別條件或另行檢討後辦理解密))</asp:ListItem>
                        </cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 32em">
                        <asp:Label ID="Label2" runat="server" Height="11px" >解密日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <asp:TextBox Style="ime-mode: disabled;width: 4em" ID="tbRmvSec_Date" TabIndex="95" runat="server" MaxLength="7" Enabled="False"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="laDocType" runat="server" CssClass="RequireField" Height="11px">文別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 17.5em">
                        <asp:DropDownList style="width: 17em" ID="dlDOC_CATEGORY" TabIndex="100" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="laDocCategory" runat="server" CssClass="RequireField" Height="11px">本別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlTYPE" TabIndex="102" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label29" runat="server" CssClass="RequireField" Height="11px">檔案類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em; height: 15px">
                        <asp:DropDownList ID="dlDocFileType" TabIndex="107" runat="server" style="width: 6em;" >
                            <asp:ListItem Value="1">紙本檔案</asp:ListItem>
                            <asp:ListItem Value="2">電子檔案</asp:ListItem>
                        </asp:DropDownList></div>
                    <div class="dTDTitle" style="width: 3em">
                        <asp:Label ID="laCnt" runat="server" Height="11px">數量：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3.5em">
                        <asp:TextBox Style="ime-mode: disabled;width: 3em" ID="tbCNT" TabIndex="125" onkeypress="jf_InpNumOnly();" runat="server" Height="22px" class="InputFieldNumeric"></asp:TextBox>
                    </div>
					<div class="dTD" style="width: 4em">
						<asp:DropDownList ID="dlUNIT" TabIndex="130" runat="server" Height="22px"></asp:DropDownList>
						</div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server" Height="11px">紙本來文併同歸檔：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 2em">
                        <asp:DropDownList ID="dlIsRcvfile" TabIndex="2" runat="server" BackColor="LightGray" Enabled="False">
                            <asp:ListItem Value="0">否</asp:ListItem>
                            <asp:ListItem Value="1">是</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 4em">
                        <asp:Label ID="Label6" runat="server" Height="11px">數量：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3em">
                        <asp:TextBox Style="ime-mode: disabled;width: 2.5em" ID="txRcvfileCnt" TabIndex="125" onkeypress="jf_InpNumOnly();" runat="server" Height="22px" BackColor="LightGray" Enabled="False" class="InputFieldNumeric"></asp:TextBox>
                    </div>
					<div class="dTD" style="width: 1em">
					<asp:Label ID="Label8" runat="server" Height="11px">頁</asp:Label>
						</div>
                </div>
				<div class="dTR" id="OdeptInfo">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="laODeptNo" runat="server" Height="11px">原始承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
						<cc1:ComboBox ID="OdlDept1" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
						<cc1:ComboBox ID="OdlSect1" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
					</div>
                    <div class="dTDTitle" style="width: 11em">
						<asp:Label ID="Label35" runat="server" Height="11px">原始承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <cc1:ComboBox style="width: 4.5em" ID="OdlEmp1" TabIndex="115" CssClass="comboBox" runat="server" MaxLength="40"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="laDeptNo" runat="server" Height="11px">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
						<cc1:ComboBox ID="dlDept1" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
						<cc1:ComboBox ID="dlSect" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
					</div>
                    <div class="dTDTitle" style="width: 11em">
                        <asp:Label ID="laUsername" runat="server" Height="11px">承辦人：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <cc1:ComboBox style="width: 4.5em" ID="dlEmp" TabIndex="115" CssClass="comboBox" runat="server" MaxLength="40"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label9" runat="server" Height="11px">承辦人職稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <asp:TextBox ID="txTitle" runat="server" style="width: 4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label23" runat="server" Height="11px">媒體型式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlMedia" TabIndex="135" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label26" runat="server" Height="11px">微縮編號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:TextBox Style="ime-mode: disabled" ID="txMicroFilm" TabIndex="140" runat="server" MaxLength="30"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="laKeepStatus" runat="server" CssClass="RequireField" Height="11px">　保存狀況：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlKEEPSTATE" TabIndex="145" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:CheckBox ID="cbIsDestroy" TabIndex="146" runat="server" Text="毀損無法修復"></asp:CheckBox>
                    </div>
					<div class="dTD" style="width: 10em">
                        <asp:CheckBox ID="cbIsmiss" TabIndex="146" runat="server" Text="已遺失"></asp:CheckBox>
                    </div>
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label16" runat="server" Height="11px">電子檔案確認日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em">
                        <asp:TextBox style="width: 4em" ID="txConfirmDate" TabIndex="-1" runat="server" BackColor="#E0E0E0" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
					<div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label199" runat="server" Height="11px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:Button ID="btSUBJECT" TabIndex="-1" runat="server" Text="主題項" Enabled="False"></asp:Button>
                    </div>
                    <div class="dTD" style="width: 4em">
                        <asp:Button ID="btREM" TabIndex="-1" runat="server" Text="附註項" Enabled="False"></asp:Button>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:Button ID="btATT_INFO" TabIndex="-1" runat="server" Text="附件明細" Enabled="False"></asp:Button>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:Button ID="btFileInfo" TabIndex="-1" runat="server" Text="電子檔資訊" Enabled="False"></asp:Button>
                    </div>
                </div>
            </div>
            <div style="z-index: 103; width: 506px; display: none; height: 195px; overflow: auto; top: 202px; left: 168px">
                <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
                <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
                <asp:ListBox ID="lbReturnValue" runat="server" Height="35px"></asp:ListBox>
                <asp:TextBox ID="txFlag" runat="server" ></asp:TextBox>
                <asp:ListBox ID="SubWinRtn" runat="server" Height="32px" ></asp:ListBox>
                <asp:TextBox ID="TRANYEAR" runat="server" ></asp:TextBox>
                <asp:TextBox ID="RCVDAY" runat="server" ></asp:TextBox>
                <asp:TextBox ID="tbOrgNo" runat="server" Width="32px"></asp:TextBox>
                <asp:TextBox ID="INIT_FILENO" runat="server" Width="32px"></asp:TextBox>
                <asp:TextBox ID="INITS_FILENO" runat="server" Width="32px"></asp:TextBox>
                <asp:TextBox ID="ATTACH_LENGTH" runat="server" Width="32px"></asp:TextBox>
                <asp:TextBox ID="tbDATA_TYPE" runat="server" Width="32px"></asp:TextBox>
                <asp:ListBox ID="h_lbDept" runat="server" Height="28px" Width="40px"></asp:ListBox>
                <asp:ListBox ID="lbRecord" runat="server" Height="30px" Width="48px"></asp:ListBox>
                <asp:TextBox ID="INIT_FILENAME" runat="server" Width="25px"></asp:TextBox>
                <asp:TextBox ID="INITS_FILENAME" runat="server" Width="24px"></asp:TextBox>
                <asp:TextBox ID="tbDump" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="htxCaseKey" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="htxFileYear" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="htxFileCls" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="htxFileCase" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="htxFileVol" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="htxFileSeq" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txUser" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txSysDate" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="htxCopyKeepYear" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="htxPFileDestroy" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="INIT_EVOLNO" runat="server" Width="23px"></asp:TextBox>
                
                <asp:TextBox ID="txMode" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txDocFileType" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txErrDocDetail" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txStoreNo" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txSecNo" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txRmvSecCode" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txFromDocType" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txDocCateGory" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txDeptNo" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txUsername" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txMedia" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txKeepState" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txApplyLimit" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="htxEmp" runat="server" Width="30px"></asp:TextBox>
                <asp:TextBox ID="htxDocFileType" runat="server" Width="25px"></asp:TextBox>
                <asp:TextBox ID="htxClsKey" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="h_FileSeqSpace" runat="server" Width="23px"></asp:TextBox>
                <asp:TextBox ID="txDocNoChange" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
                <asp:TextBox ID="DEPT_CASE" runat="server" Width="20px"></asp:TextBox>
                <asp:TextBox ID="txIssueNoWord" runat="server" Width="19px"></asp:TextBox>
                <asp:TextBox ID="TxIndexIssueWord" runat="server" Width="17px"></asp:TextBox>
                <asp:TextBox ID="TxIndexSecIssueWord" runat="server" Width="14px"></asp:TextBox>
                <asp:TextBox ID="txMaxSubLen" runat="server" Width="48px"></asp:TextBox>
                <asp:TextBox ID="txNormalType" runat="server" Width="48px"></asp:TextBox>
                <asp:TextBox ID="h_signType" runat="server" Width="48px"></asp:TextBox>
                <asp:TextBox ID="txShowComSeq" runat="server" Width="14px"></asp:TextBox>
                <asp:TextBox ID="htxKeepYaer" runat="server" Width="23px"></asp:TextBox>
                <asp:Label ID="h_lbClsLen" runat="server" Width="23px"></asp:Label>
                <asp:Label ID="hdlSECRET" runat="server" Width="23px"></asp:Label>
                <asp:Label ID="hdlRmvSecCode" runat="server" Width="23px"></asp:Label>
                <asp:Label ID="hdlRmvSec_Cond" runat="server" Width="23px"></asp:Label>
                <asp:TextBox ID="H_VolPage" runat="server"></asp:TextBox>
                <asp:TextBox ID="H_SepPage" runat="server"></asp:TextBox>
                <asp:TextBox ID="htxVerNo" runat="server"></asp:TextBox>
                <asp:TextBox ID="h_txApprovedDate" runat="server"></asp:TextBox>
                <asp:TextBox ID="H_FirstCheck" CssClass="hide" runat="server"></asp:TextBox>
                <asp:TextBox ID="txhUser" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="txhOrg" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="USE_STOCK" CssClass="hide" runat="server"></asp:TextBox>
                <asp:TextBox ID="btOpenChecker" CssClass="hide" runat="server"></asp:TextBox>
                <asp:TextBox ID="txSectName_h" runat="server" CssClass="Hide"></asp:TextBox>
                <asp:TextBox ID="txSectNo_h" runat="server" CssClass="Hide"></asp:TextBox>
                <asp:TextBox ID="txDeptName" runat="server" CssClass="HIDE"></asp:TextBox>
                <asp:TextBox ID="txSectName" runat="server" CssClass="HIDE"></asp:TextBox>
                <asp:TextBox ID="txEmpName" runat="server" CssClass="HIDE"></asp:TextBox>
                <asp:TextBox ID="txDeptNo_h" runat="server" CssClass="Hide" ></asp:TextBox>
				<asp:TextBox ID="txCaseSecNo" runat="server" CssClass="Hide" ></asp:TextBox>
				<asp:TextBox ID="txCloseType_h" runat="server" CssClass="Hide" ></asp:TextBox>
				<asp:TextBox ID="txNewByOU_h" runat="server" CssClass="Hide" ></asp:TextBox>
                <asp:TextBox Style="z-index: 102; position: absolute; top: 11px; left: 401px" ID="txWAITFILEDOC" runat="server" CssClass="hidden"></asp:TextBox>
				<asp:TextBox ID="h_OfilCasekey" runat="server" CssClass="hide" ></asp:TextBox>
				<asp:textbox id="OhtxEmp" runat="server" Width="30px"></asp:textbox>
                <asp:textbox id="OtxDeptNo_h" runat="server" Width="30px"></asp:textbox>
                <asp:textbox id="OtxSectNo_h" runat="server" Width="30px"></asp:textbox>
                <asp:textbox id="OtxDeptName" runat="server" Width="30px"></asp:textbox>
                <asp:textbox id="OtxSectName_h" runat="server" Width="30px"></asp:textbox>
                <asp:textbox id="OtxSectName" runat="server" Width="30px"></asp:textbox>
                <asp:TextBox id="OtxEmpName" runat="server" CssClass="HIDE"></asp:TextBox>
                <asp:TextBox id="OtxFullFileNo" runat="server" CssClass="HIDE"></asp:TextBox>
                <asp:TextBox id="txEnableViewDoc" runat="server" CssClass="HIDE"></asp:TextBox>
                <asp:TextBox id="ODeptUserInfo" runat="server" CssClass="HIDE"></asp:TextBox>
                <asp:TextBox ID="H_APP_SUBJECT" runat="server" CssClass="hide" ></asp:TextBox>
                <asp:TextBox ID="H_OTHER_SUBJECT" runat="server" CssClass="hide" ></asp:TextBox>
                <asp:TextBox ID="H_OLD_SUBJECT" runat="server" CssClass="hide" ></asp:TextBox>
                <asp:TextBox ID="H_NEW_BY_OU" runat="server" CssClass="hide" ></asp:TextBox>
                <asp:TextBox ID="H_SHOWFROM" runat="server" CssClass="hide" ></asp:TextBox>
                <asp:TextBox ID="H_BAKM332SAVE" runat="server" CssClass="hide" ></asp:TextBox>
                <asp:TextBox ID="CheckDept" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="CheckSect" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="CheckODept" runat="server" CssClass="hide"></asp:TextBox>
                <asp:TextBox ID="CheckOSect" runat="server" CssClass="hide"></asp:TextBox>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟"  Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存"  Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btViewDoc" runat="server" Text="瀏覽文件(I)" AccessKey="I" Style="display: none" DefaultStyle="newmode:none;modifymode:none" />
            <asp:Button ID="btOpenODI260" runat="server" Text="流程查詢"  Style="display: none" DefaultStyle="newmode:none;modifymode:block" />
            <asp:Button ID="btChkErrDetail" runat="server" Text="檢核異常明細" AccessKey="G"  Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" AccessKey="Z"  Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" AccessKey="D"  Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" AccessKey="P"  Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btFILESEARCH" runat="server" Text="待編目案件查詢(Y)" AccessKey="Y"  Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btGetStockNo" runat="server" Text="櫥位號取號" AccessKey="R"  Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancelSave" runat="server" Text="取消編卷" AccessKey="G"  Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
        
    </form>
</body>
</html>
