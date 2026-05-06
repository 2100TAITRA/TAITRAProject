<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKI800.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI800" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKI800 檔案查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKI800" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div class="DivBaseTable">
            <asp:Panel Style="position: relative" ID="pUser1" runat="server" DESIGNTIMEDRAGDROP="17">
                <div class="DivTable" id="TblC1">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label3" runat="server">隸屬機關：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 20em">
                            <asp:DropDownList ID="dlSOURCE_ORGNO" TabIndex="5" runat="server" AutoPostBack="True"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR" id="row1">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:DropDownList ID="dlDocNo" TabIndex="5" runat="server" Width="6.5em" data-CN="文號類型">
                                <asp:ListItem Value="1">文(編)號</asp:ListItem>
                                <asp:ListItem Value="2">部收文號</asp:ListItem>
                                <asp:ListItem Value="3">會銜機關收文號</asp:ListItem>
                                <asp:ListItem Value="4">列管文號</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="dTD" style="width: 40em">
                            <asp:TextBox ID="tbDOC_NOS" TabIndex="10" onkeypress="jf_UPPERCASE();" runat="server" Width="7.7em" MaxLength="15" data-CN="文號(起)"></asp:TextBox>
                            <asp:Label ID="Label14" runat="server">(起) －</asp:Label>
                            <asp:TextBox ID="tbDOC_NOE" TabIndex="20" onkeypress="jf_UPPERCASE();" runat="server" Width="7.7em" MaxLength="15" data-CN="文號(訖)"></asp:TextBox>
                            <asp:Label ID="Label4" runat="server">(訖)</asp:Label>
                        </div>
                    </div>
                    <div class="dTR hide" id="rowMOCS1">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label55" runat="server">系統別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 16em">
                            <asp:RadioButton ID="rbEDoc" runat="server" Text="公文系統" GroupName="rbSystemType" data-CN="公文系統"></asp:RadioButton>
                            <asp:RadioButton ID="rbKoda" runat="server" Text="Koda系統" GroupName="rbSystemType" data-CN="Koda系統"></asp:RadioButton>
                        </div>
                        <div class="dTDTitle" style="width: 7.5em">
                            <asp:Label ID="Label59" runat="server">案件編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox ID="tbMocsCase" TabIndex="190" runat="server" Width="9.5em" MaxLength="15" data-CN="案件編號"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR" id="rowFileNoS">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label2" runat="server">檔號(起)：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 51em">
                            <asp:TextBox ID="tbYEAR" TabIndex="30" runat="server" Width="2em" MaxLength="3" data-CN="年度(起)"></asp:TextBox>
                            <asp:Label ID="Label1" runat="server">(年度)－</asp:Label>
                            <asp:TextBox ID="tbCLS" TabIndex="40" onkeypress="jf_UPPERCASE();" runat="server" Width="10.5em" MaxLength="20" data-CN="分類(起)"></asp:TextBox>
                            <asp:ImageButton ID="btCls" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:Label ID="Label5" runat="server">(分類)－</asp:Label>

                            <asp:TextBox ID="tbCASE" TabIndex="50" onkeypress="jf_UPPERCASE();" runat="server" Width="7em" MaxLength="12" data-CN="案次(起)"></asp:TextBox>
                            <asp:ImageButton ID="btClass" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:Label ID="Label10" runat="server">(案次)－</asp:Label>

                            <asp:TextBox ID="txCountryNoS" TabIndex="51" onkeypress="jf_UPPERCASE();" runat="server" Width="2em" CssClass="hide" MaxLength="3"></asp:TextBox>
                            <asp:ImageButton ID="btCountryNoS" TabIndex="-1" runat="server" CssClass="hide" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:TextBox ID="txDivisionNoS" TabIndex="52" onkeypress="jf_UPPERCASE();" runat="server" Width="2em" CssClass="hide" MaxLength="3"></asp:TextBox>
                            <asp:TextBox ID="txProductNoS" TabIndex="53" onkeypress="jf_UPPERCASE();" runat="server" Width="2em" CssClass="hide" MaxLength="3"></asp:TextBox>
                            <asp:ImageButton ID="btProductNoS" TabIndex="-1" runat="server" CssClass="hide" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:Label ID="lbTaiTriS" runat="server" CssClass="hide">(國別-處別-產品別)－</asp:Label>

                            <asp:TextBox ID="tbVOL" TabIndex="60" onkeypress="jf_UPPERCASE();" runat="server" Width="2.5em" MaxLength="4" data-CN="卷次(起)"></asp:TextBox>
                            <asp:Label ID="Label8" runat="server">－</asp:Label>
                            <asp:TextBox ID="tbSEQ" TabIndex="70" onkeypress="jf_UPPERCASE();" runat="server" Width="2em" MaxLength="3" data-CN="目次(起)"></asp:TextBox>
                        </div>
                    </div>

                    <div class="dTR" id="rowFileNoE">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label27" runat="server">檔號(迄)：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 51em">
                            <asp:TextBox onblur="PADZERO(txEYear,3);" ID="txEYear" TabIndex="80" runat="server" Width="2em" MaxLength="3" data-CN="年度(迄)"></asp:TextBox>
                            <asp:Label ID="Label25" runat="server">(年度)－</asp:Label>
                            <asp:TextBox ID="txECLS" TabIndex="90" onkeypress="jf_UPPERCASE();" runat="server" Width="10.5em" MaxLength="20" data-CN="分類(迄)"></asp:TextBox>
                            <asp:ImageButton ID="btECls" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:Label ID="Label21" runat="server">(分類)－</asp:Label>

                            <asp:TextBox ID="txECase" TabIndex="100" onkeypress="jf_UPPERCASE();" runat="server" Width="7em" MaxLength="12" data-CN="案次(迄)"></asp:TextBox>
                            <asp:ImageButton ID="btECase" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:Label ID="Label20" runat="server">(案次)－</asp:Label>

                            <asp:TextBox ID="txCountryNoE" TabIndex="101" onkeypress="jf_UPPERCASE();" runat="server" Width="2em" CssClass="hide" MaxLength="3"></asp:TextBox>
                            <asp:ImageButton ID="btCountryNoE" TabIndex="-1" runat="server" CssClass="hide" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:TextBox ID="txDivisionNoE" TabIndex="102" onkeypress="jf_UPPERCASE();" runat="server" Width="2em" CssClass="hide" MaxLength="3"></asp:TextBox>
                            <asp:TextBox ID="txProductNoE" TabIndex="103" onkeypress="jf_UPPERCASE();" runat="server" Width="2em" CssClass="hide" MaxLength="3"></asp:TextBox>
                            <asp:ImageButton ID="btProductNoE" TabIndex="-1" runat="server" CssClass="hide" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:Label ID="lbTaiTriE" runat="server" CssClass="hide">(國別-處別-產品別)－</asp:Label>

                            <asp:TextBox onblur="PADZERO(txEVol,4);" ID="txEVol" TabIndex="110" onkeypress="jf_UPPERCASE();" runat="server" Width="2.5em" MaxLength="4" data-CN="卷次(迄)"></asp:TextBox>
                            <asp:Label ID="Label16" runat="server">－</asp:Label>
                            <asp:TextBox onblur="PADZERO(txESeq,3);" ID="txESeq" TabIndex="120" onkeypress="jf_UPPERCASE();" runat="server" Width="2em" MaxLength="3" data-CN="目次(迄)"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR hide" id="rowMOCS2">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label56" runat="server">四角號碼：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 20em">
                            <asp:TextBox ID="tb4CornerNo" TabIndex="60" onkeypress="jf_UPPERCASE();" runat="server" Width="2.8em" MaxLength="5" data-CN="四角號碼"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR" style="display: none" id="row3">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label48" runat="server">櫥位號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 30em">
                            <asp:TextBox ID="txStockNoS" TabIndex="122" onkeypress="jf_UPPERCASE();" runat="server" Width="11.5em" MaxLength="11" data-CN="櫥位號(迄)"></asp:TextBox>
                            <asp:Label ID="Label50" runat="server">(起)</asp:Label>
                            <asp:Label ID="Label49" runat="server">－</asp:Label>
                            <asp:TextBox ID="txStockNoE" TabIndex="124" onkeypress="jf_UPPERCASE();" runat="server" Width="11.5em" MaxLength="11" data-CN="櫥位號(迄)"></asp:TextBox>
                            <asp:Label ID="Label51" runat="server">(訖)</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label66" Style="z-index: 0" runat="server" AssociatedControlID="txKeepYearS"> 保存年限：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 16em">
                            <asp:TextBox ID="txKeepYearS" Style="z-index: 0" runat="server" Width="2.5em" MaxLength="2" data-CN="保存年限(迄)"></asp:TextBox>
                            <asp:Label ID="Label44" Style="z-index: 0" runat="server">(起) －</asp:Label>
                            <asp:TextBox ID="txKeepYearE" Style="z-index: 0" runat="server" Width="2.5em" MaxLength="2" data-CN="保存年限(訖)"></asp:TextBox>
                            <asp:Label ID="Label45" Style="z-index: 0" runat="server" Width="16px">(訖)</asp:Label>
                            <asp:DropDownList TabIndex="125" ID="dlKeepYear" Style="z-index: 0" runat="server" Width="3.5em" data-CN="保存年限">
                                <asp:ListItem></asp:ListItem>
                                <asp:ListItem Value="1">1</asp:ListItem>
                                <asp:ListItem Value="3">3</asp:ListItem>
                                <asp:ListItem Value="5">5</asp:ListItem>
                                <asp:ListItem Value="10">10</asp:ListItem>
                                <asp:ListItem Value="15">15</asp:ListItem>
                                <asp:ListItem Value="20">20</asp:ListItem>
                                <asp:ListItem Value="25">25</asp:ListItem>
                                <asp:ListItem Value="30">30</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 7.5em">
                            <asp:Label ID="Label67" Style="z-index: 0" runat="server">清理處置：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:DropDownList TabIndex="125" ID="dlClearProc" Style="z-index: 0" runat="server" data-CN="清理處置">
                                <asp:ListItem></asp:ListItem>
                                <asp:ListItem Value="1">列為國家檔案</asp:ListItem>
                                <asp:ListItem Value="2">機關永久保存</asp:ListItem>
                                <asp:ListItem Value="3">依規定程序銷毀</asp:ListItem>
                                <asp:ListItem Value="4">屆期後鑑定</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                    <!-- MATTE 0960821 001375 ADD 結案日期 -->
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:DropDownList ID="dlDATE_TYPE" TabIndex="125" runat="server" Width="7.5em" data-CN="日期選項">
                            <asp:ListItem Value="1" Selected="True">來文日期</asp:ListItem>
                            <asp:ListItem Value="2">收(創)文日期</asp:ListItem>
                            <asp:ListItem Value="3">發文日期</asp:ListItem>
                            <asp:ListItem Value="4">文件產生日期</asp:ListItem>
                            <asp:ListItem Value="5">歸檔日期</asp:ListItem>
                            <asp:ListItem Value="6">部收文日期</asp:ListItem>
                            <asp:ListItem Value="7">會銜機關收文日期</asp:ListItem>
                            <asp:ListItem Value="8">開會日期</asp:ListItem>
                            <asp:ListItem Value="9">限辦日期</asp:ListItem>
                            <asp:ListItem Value="10">結案日期</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD" style="width: 46em" id="inline_content">
                        <asp:TextBox ID="tbDATES" TabIndex="130" onkeypress="jf_UPPERCASE();" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker" data-CN="日期(起)"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server">(起) －</asp:Label>
                        <asp:TextBox ID="tbDATEE" TabIndex="140" onkeypress="jf_UPPERCASE();" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker" data-CN="日期(訖)"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">(訖)</asp:Label>
                        <asp:RadioButton ID="rbToday" runat="server" Text="今日" GroupName="di"></asp:RadioButton>
                        <asp:RadioButton ID="rbThreeDay" runat="server" Text="三日內" GroupName="di"></asp:RadioButton>
                        <asp:RadioButton ID="rbOneWeek" runat="server" Text="一週內" GroupName="di"></asp:RadioButton>
                        <asp:RadioButton ID="rbOneMon" runat="server" Text="一個月內" GroupName="di"></asp:RadioButton>
                        <asp:RadioButton ID="rbDIY" runat="server" Text="自行輸入" GroupName="di"></asp:RadioButton>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label30" runat="server">辦理狀態：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 36em" id="rowSTATE">
                            <asp:CheckBox ID="ckClosed" TabIndex="160" runat="server" Text="已結案" Checked="True" data-CN="已結案"></asp:CheckBox>
                            <asp:CheckBox ID="ckWorking" TabIndex="160" runat="server" Text="未結案" Checked="True" data-CN="未結案"></asp:CheckBox>
                            <asp:CheckBox ID="cbDel" TabIndex="160" runat="server" Text="已銷號" Checked="True" data-CN="已銷號"></asp:CheckBox>
                            <asp:CheckBox ID="cbBeDestoryed" TabIndex="160" runat="server" Text="已銷毀" data-CN="已銷毀"></asp:CheckBox>
                            <asp:CheckBox ID="cbBeTran35" TabIndex="160" runat="server" Text="提供文史機關" data-CN="提供文史機關"></asp:CheckBox>
                            <asp:CheckBox ID="cbBeTran40" TabIndex="160" runat="server" Text="已移轉" data-CN="已移轉"></asp:CheckBox>
                            <asp:CheckBox ID="cbBeTran50" TabIndex="160" runat="server" Text="已移交" data-CN="已移交"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label18" runat="server">公文性質：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:DropDownList ID="dlDOC_PROPERTY" TabIndex="125" runat="server" data-CN="公文性質"></asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 13.5em">
                            <asp:Label ID="Label34" runat="server">業務類別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:DropDownList ID="ddlBTypeNo" runat="server" Width="8em" data-CN="業務類別"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label42" runat="server">密等：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:DropDownList ID="dlDOC_SEC" TabIndex="125" runat="server" Width="5.5em" data-CN="密等">
                                <asp:ListItem Selected="True"></asp:ListItem>
                                <asp:ListItem Value="1">普通</asp:ListItem>
                                <asp:ListItem Value="2">密</asp:ListItem>
                                <asp:ListItem Value="3">機密</asp:ListItem>
                                <asp:ListItem Value="4">極機密</asp:ListItem>
                                <asp:ListItem Value="5">絕對機密</asp:ListItem>
                            </asp:DropDownList>
                            <asp:DropDownList TabIndex="125" ID="dlSECDOC_SEC" Style="z-index: 0" runat="server" Width="5.5em" CssClass="hide" data-CN="密等">
                                <asp:ListItem Selected="True"></asp:ListItem>
                                <asp:ListItem Value="2">密</asp:ListItem>
                                <asp:ListItem Value="3">機密</asp:ListItem>
                                <asp:ListItem Value="4">極機密</asp:ListItem>
                                <asp:ListItem Value="5">絕對機密</asp:ListItem>
                            </asp:DropDownList>

                        </div>
                        <div class="hide" id="RRBSection">
                            <div class="dTDTitle" style="width: 13.5em">
                                <asp:Label ID="lbCaseNo" runat="server">案件編號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txCaseNoS" runat="server" MaxLength="15" Width="8em" data-CN="案件編號(起)"></asp:TextBox>
                                <asp:Label ID="lbCaseNoS" runat="server">(起)－</asp:Label>
                                <asp:TextBox ID="txCaseNoE" runat="server" MaxLength="15" Width="8em" data-CN="案件編號(訖)"></asp:TextBox>
                                <asp:Label ID="lbCaseNoE" runat="server">(訖)</asp:Label>
                            </div>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label6" runat="server">簽核類型：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 11em">
                            <asp:CheckBox ID="ckOnLine" TabIndex="160" runat="server" Text="線上簽核" Checked="True" data-CN="線上簽核"></asp:CheckBox>
                            <asp:CheckBox ID="ckPaper" TabIndex="160" runat="server" Text="紙本簽核" Checked="True" data-CN="紙本簽核"></asp:CheckBox>
                        </div>
                        <div class="dTDTitle" style="width: 12.5em">
                            <asp:Label ID="Label52" runat="server">文別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:DropDownList ID="dlDocCategory" runat="server" data-CN="文別"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR" style="display: none" id="trRcvFile">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label Style="z-index: 0" ID="Label53" runat="server" Width="130px">紙本併同歸檔：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 2.5em">
                            <asp:CheckBox Style="z-index: 0" ID="cbRcvFile" TabIndex="160" runat="server" Text="是" data-CN="紙本併同歸檔"></asp:CheckBox>
                        </div>
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label Style="z-index: 0" ID="Label54" runat="server">併同歸檔原因：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:DropDownList Style="z-index: 0" ID="dlRcvFileCond" runat="server" data-CN="併同歸檔原因">
                                <asp:ListItem Value="">全部</asp:ListItem>
                                <asp:ListItem Value="100">非屬機關間行文</asp:ListItem>
                                <asp:ListItem Value="010">涉及個人權益或信證稽憑</asp:ListItem>
                                <asp:ListItem Value="001">有重覆歸檔之必要</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR" id="trMailRow">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="lbMailRcvNo" runat="server">郵件編號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 40em">
                            <asp:TextBox ID="txMailRcvNo" runat="server" MaxLength="50" Width="25em" data-CN="郵件編號"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label12" runat="server">承辦單位：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 15em">
                            <cc1:ComboBox ID="dlDEPT" TabIndex="240" runat="server" CssClass="comboBox" Width="10em" data-CN="承辦單位"></cc1:ComboBox>
                            <cc1:ComboBox ID="dlSECT" TabIndex="220" runat="server" CssClass="comboBox"></cc1:ComboBox>
                            <cc1:ComboBox TabIndex="220" ID="dlSECDEPT" runat="server" CssClass="hide" Width="10em" data-CN="承辦單位"></cc1:ComboBox>
                        </div>
                        <div class="dTDTitle" style="width: 8.5em">
                            <asp:Label ID="Label13" runat="server">承辦人：</asp:Label>
                        </div>
                        <div class="dTD">
                            <cc1:ComboBox ID="dlUSER" TabIndex="252" runat="server" Rows="10" CssClass="comboBox" Width="6em" data-CN="承辦人"></cc1:ComboBox>
                            <cc1:ComboBox TabIndex="252" ID="dlSECUSER" runat="server" Rows="10" CssClass="hide" Width="6em" data-CN="承辦人"></cc1:ComboBox>
                            <asp:CheckBox ID="cbLeaver" runat="server" CssClass="hide" Text="含停用人員"></asp:CheckBox>
                            <asp:CheckBox ID="ckEmpName" runat="server" CssClass="hide" Text="查詢承辦人" Checked="True"></asp:CheckBox>
                            <asp:CheckBox ID="ckRpsEmpName" runat="server" CssClass="hide" Text="查詢負責人(移交用)" Checked="True"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label31" runat="server">公文來源：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:DropDownList ID="dlDocSource" runat="server" Width="6.5em" data-CN="公文來源">
                                <asp:ListItem></asp:ListItem>
                                <asp:ListItem>正常公文</asp:ListItem>
                                <asp:ListItem Value="1">上級機關交辦</asp:ListItem>
                                <asp:ListItem Value="2">上級機關交議</asp:ListItem>
                                <asp:ListItem Value="3">會銜</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 13.5em">
                            <asp:Label ID="Label32" runat="server">辦理天數：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox ID="txWorkDay" runat="server" Width="1.5em" MaxLength="3" data-CN="辦理天數"></asp:TextBox>
                            <asp:Label ID="Label33" runat="server">天</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label7" runat="server">來文者：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox ID="tbUNIT" TabIndex="190" onkeypress="jf_UPPERCASE();" runat="server" Width="9.5em" MaxLength="15" data-CN="來文者"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 13.5em">
                            <asp:Label ID="Label41" runat="server">受文者：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox ID="tbDelivUnit" TabIndex="190" onkeypress="jf_UPPERCASE();" runat="server" Width="9.5em" MaxLength="15" data-CN="受文者"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label46" runat="server">相關字號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 40em">
                            <asp:CheckBox ID="cbISSUE_NO" TabIndex="160" runat="server" Text="發文字號" Checked="True" data-CN="發文字號"></asp:CheckBox>
                            <asp:CheckBox ID="cbFROM_NO" TabIndex="160" runat="server" Text="來文字號" Checked="True" data-CN="來文字號"></asp:CheckBox>
                            <asp:CheckBox ID="cbRCV_NO" TabIndex="160" runat="server" Text="收文字號" Checked="True" data-CN="收文字號"></asp:CheckBox>
                            <asp:CheckBox ID="cbNO_Upissue" TabIndex="160" runat="server" Text="上級發文字號" data-CN="上級發文字號"></asp:CheckBox>
                            <asp:TextBox ID="tbNO" TabIndex="200" onkeypress="jf_UPPERCASE();" runat="server" Width="10.5em" MaxLength="20" data-CN="相關字號"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label39" runat="server">關鍵詞查詢：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 46em">
                            <asp:RadioButton ID="rbUni" runat="server" Text="聯集" GroupName="rbSearch" data-CN="聯集"></asp:RadioButton>
                            <asp:RadioButton ID="rbCol" runat="server" Text="交集" GroupName="rbSearch" data-CN="交集"></asp:RadioButton>
                            <asp:TextBox ID="tbKEYWORD" TabIndex="180" onkeypress="jf_UPPERCASE();" runat="server" Width="20em" MaxLength="50" data-CN="關鍵詞"></asp:TextBox>(輸入多筆時，請用","隔開)
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label19" runat="server">關鍵詞查詢項目：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 40em">
                            <asp:CheckBox TabIndex="150" ID="ckInSubject" runat="server" CssClass="hide" Text="查詢密件案由(主旨)" data-CN="查詢密件案由"></asp:CheckBox>
                            <asp:CheckBox ID="ckSubject" TabIndex="150" runat="server" Text="案由(主旨)" Checked="True" data-CN="案由(主旨)"></asp:CheckBox>
                            <asp:CheckBox ID="ckCaseName" TabIndex="160" runat="server" Text="案名" data-CN="案名"></asp:CheckBox>
                            <asp:CheckBox ID="cbOtherSubject" TabIndex="160" runat="server" Text="並列及其他案由" data-CN="並列及其他案由"></asp:CheckBox>
                            <asp:CheckBox ID="ckKeyWord" TabIndex="160" runat="server" Text="關鍵字" data-CN="關鍵字"></asp:CheckBox>
                            <asp:CheckBox ID="ckTheme" TabIndex="160" runat="server" Text="主題項" data-CN="主題項"></asp:CheckBox>
                            <asp:CheckBox ID="cbUNIT" TabIndex="160" runat="server" Text="來文者" data-CN="來文者"></asp:CheckBox>
                            <asp:CheckBox ID="cbDelivUnit" TabIndex="160" runat="server" Text="受文者" data-CN="受文者"></asp:CheckBox>
                            <asp:CheckBox ID="cbAiKey" TabIndex="160" runat="server" Text="AI詞庫"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR" id="trFileRow">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label43" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                        </div>
                        <div class="dTD" style="width: 13em">
                            <asp:CheckBox ID="cbRpdFile" TabIndex="160" runat="server" Text="來文電子檔" data-CN="來文電子檔"></asp:CheckBox>
                            <asp:CheckBox ID="cbEditFile" TabIndex="160" runat="server" Text="稿件電子檔" data-CN="稿件電子檔"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR hide" id="rowMOCS3">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label57" runat="server">身分證號簡碼：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox ID="tbSamplePID" TabIndex="190" onkeypress="jf_UPPERCASE();" runat="server" Width="2.8em" MaxLength="5" data-CN="身分證號簡碼"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 13.5em">
                            <asp:Label ID="Label58" runat="server">姓名：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox ID="tbFullName" TabIndex="190" onkeypress="jf_UPPERCASE();" runat="server" Width="9.5em" MaxLength="100" data-CN="姓名"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label35" runat="server">歸檔庫房類別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 12em">
                            <asp:CheckBox ID="cbOrgStore" TabIndex="160" runat="server" Text="機關庫房" Checked="True" data-CN="機關庫房"></asp:CheckBox>
                            <asp:CheckBox ID="cbUnitStore" TabIndex="160" runat="server" Text="單位庫房" Checked="True" data-CN="單位庫房"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label36" runat="server">結案種類：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:CheckBox ID="cbSend" runat="server" Text="發文" Checked="True" data-CN="發文"></asp:CheckBox>
                            <asp:CheckBox ID="cbSave" runat="server" Text="存查" Checked="True" data-CN="存查"></asp:CheckBox>
                        </div>
                        <div class="dTDTitle" style="width: 13.5em">
                            <asp:Label ID="Label37" runat="server">續辦：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:CheckBox ID="cbCaseConY" runat="server" Text="有" Checked="True" data-CN="續辦(有)"></asp:CheckBox>
                            <asp:CheckBox ID="cbCaseConN" runat="server" Text="無" Checked="True" data-CN="續辦(無)"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label38" runat="server">發文性質：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:DropDownList ID="ddlIssueProperty" runat="server" Width="8em" data-CN="發文性質"></asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 13.5em">
                            <asp:Label ID="Label40" runat="server">公文類別：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:DropDownList ID="dlDocType" runat="server" Width="3.5em" data-CN="公文類別">
                                <asp:ListItem Value=""></asp:ListItem>
                                <asp:ListItem Value="1">來文</asp:ListItem>
                                <asp:ListItem Value="2">創稿</asp:ListItem>
                                <asp:ListItem Value="3">發文</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>
            </asp:Panel>
            <asp:Panel ID="pPer1" runat="server">
                <div class="DivTable" id="TblC3">
                    <div class="dTR" id="Tr2">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label17" class="InputFieldLabel" runat="server">年度號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox onblur="PADZERO(txCustomYear,3);" ID="txCustomYear" TabIndex="210" runat="server" Width="3.5em" CssClass="InputFieldLabel" MaxLength="3"></asp:TextBox>
                            <asp:TextBox ID="tbCLS2" TabIndex="2" onkeypress="jf_UPPERCASE();" runat="server" Width="20em" CssClass="hidden" MaxLength="20"></asp:TextBox>
                            <asp:ImageButton ID="btCls2" TabIndex="-1" runat="server" CssClass="hidden" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label28" runat="server">文號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 10em">
                            <asp:TextBox ID="txCustomNo" class="KeyUpperField" TabIndex="220" onkeypress="jf_UPPERCASE();" runat="server" Width="15.5em" MaxLength="15"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label29" runat="server">日期：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9.5em">
                            <asp:TextBox onblur="Check_DATE(txCustomDate,null);" ID="txCustomDate" TabIndex="230" runat="server" Width="6.5em" MaxLength="7"></asp:TextBox>
                        </div>
                    </div>
                </div>
            </asp:Panel>
            <div class="DivTable" id="TblC5">
                <div class="dTR" id="Tr9">
                    <div class="dTDTitle" style="width: 9.5em; min-height: 1px">
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label26" runat="server">查詢結果呈現方式</asp:Label>
                    </div>
                </div>
                <div class="dTR" id="Tr10">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label15" runat="server">每頁顯示：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:DropDownList ID="dlNumPerPage" TabIndex="260" runat="server" Width="4.5em" data-CN="每頁顯示">
                            <asp:ListItem Value="15" Selected="True">15</asp:ListItem>
                            <asp:ListItem Value="20">20</asp:ListItem>
                            <asp:ListItem Value="30">30</asp:ListItem>
                            <asp:ListItem Value="40">40</asp:ListItem>
                            <asp:ListItem Value="50">50</asp:ListItem>
                            <asp:ListItem Value="500">500</asp:ListItem>
                            <asp:ListItem Value="S">自訂筆數</asp:ListItem>
                            <asp:ListItem Value="F">不分頁</asp:ListItem>
                        </asp:DropDownList><asp:Label ID="Label24" runat="server">筆</asp:Label><asp:TextBox ID="txPageSize" runat="server" Width="32px" MaxLength="4"></asp:TextBox>
                        <asp:Button ID="btSearch1" runat="server" Text="查詢" OnClick="btSearch1_Click" />
                        <asp:Button ID="btClean1" runat="server" Text="清除" />
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label23" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 25em">
                        <asp:DropDownList ID="dlORDER" TabIndex="270" runat="server" Width="8em" data-CN="排序方式">
                            <asp:ListItem Value="1" Selected="True">文(編)號(降冪)</asp:ListItem>
                            <asp:ListItem Value="6">文(編)號(升冪)</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <asp:Panel ID="pUser2" runat="server" Width="200em" Visible="False">
                <div class="DivTable" id="Table1">
                    <div class="dTR" id="Tr3">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label22" runat="server">關鍵詞：</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label47" runat="server">上級發文字號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9.5em">
                            <asp:TextBox ID="tbNO_Upissue" TabIndex="200" onkeypress="jf_UPPERCASE();" runat="server" Width="12.5em" MaxLength="20"></asp:TextBox>(具全文檢索功能)
                        </div>
                    </div>
                </div>
            </asp:Panel>
        </div>
        <asp:Panel ID="Panel1" runat="server" Width="430px" CssClass="hide" DESIGNTIMEDRAGDROP="1783">
            <asp:CustomValidator ID="Validator" runat="server" Width="96px" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="27px"></asp:ListBox>
            <asp:ListBox ID="SubWinRtn" runat="server" Width="15px"></asp:ListBox>
            <asp:TextBox ID="COM_CHECK" runat="server" Width="24px"></asp:TextBox>
            <asp:ListBox ID="h_lbSYS" runat="server" Width="26px"></asp:ListBox>
            <asp:TextBox ID="txBTypeNo" runat="server" Width="18px"></asp:TextBox>
            <asp:TextBox ID="H_txDeptNo" runat="server" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_txSecDeptNo" runat="server" Width="19px"></asp:TextBox>
            <asp:ValidationSummary ID="ValidationSummary1" TabIndex="-1" runat="server" Width="134px" CssClass="" ShowMessageBox="True"></asp:ValidationSummary>
            <asp:TextBox ID="txUserValue" runat="server" Width="46px"></asp:TextBox>
            <asp:TextBox ID="txSecUserValue" runat="server" Width="46px"></asp:TextBox>
            <asp:CustomValidator ID="CustomValidatorCommon" TabIndex="-1" runat="server" DESIGNTIMEDRAGDROP="253" Display="None"></asp:CustomValidator>
            <asp:TextBox ID="DOC_CHECK" runat="server" Width="80px" CssClass=""></asp:TextBox>
            <asp:TextBox ID="txRoleNo" runat="server" Width="43px"></asp:TextBox>
            <asp:TextBox ID="h_SpDeptlist" runat="server" CssClass="hide"></asp:TextBox>
        </asp:Panel>

        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除畫面(Z)" AccessKey="Z" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" AccessKey="P" Text="申請進度查詢(P)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" AccessKey="I" Text="空白應用申請表(I)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="空白調案單(R)" AccessKey="R" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearchDestroy" runat="server" Text="查詢已銷毀公文(U)" AccessKey="U" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCondRecord" runat="server" Text="自訂查詢條件" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
