<%@ Page Language="c#" CodeBehind="EAI300.aspx.cs" AutoEventWireup="false" Inherits="EA71.EAI300" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAI300 檔案目錄查詢作業</title>
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
    <form id="EAI300" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:ListBox ID="SubWinRtn" runat="server" Width="44px" Height="34px"></asp:ListBox>
            <asp:TextBox ID="COM_CHECK" runat="server" Width="77px"></asp:TextBox>
            <asp:ListBox ID="h_lbSYS" runat="server"></asp:ListBox>
            <asp:TextBox ID="txUserValue" runat="server" Width="46px" Height="17px"></asp:TextBox>
            <asp:TextBox ID="DOC_CHECK" runat="server" Width="80px" CssClass=""></asp:TextBox>
            <asp:TextBox ID="txBTypeNo" runat="server" Width="46px" Height="17px"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <asp:Panel ID="pUser1" runat="server">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label1" runat="server">隸屬機關：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="dlSOURCE_ORGNO" runat="server" Width="13.5em" AutoPostBack="True"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR" id="row1">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:DropDownList ID="dlDocNo" runat="server" Width="8.5em">
                                <asp:ListItem Value="1">公文文號</asp:ListItem>
                                <asp:ListItem Value="2">部收文號</asp:ListItem>
                                <asp:ListItem Value="3">會銜機關收文號</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="tbDOC_NOS" runat="server" Width="8em" CssClass="InputUpperFieldText" MaxLength="15"></asp:TextBox>
                            <asp:Label ID="Label2" runat="server">(起) －</asp:Label>
                            <asp:TextBox ID="tbDOC_NOE" runat="server" Width="8em" CssClass="InputUpperFieldText" MaxLength="15"></asp:TextBox>
                            <asp:Label ID="Label3" runat="server">(訖)</asp:Label>
                        </div>
                    </div>
                    <div class="dTR" id="row2">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label4" runat="server">檔號(起)：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="tbYEAR" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                            <asp:Label ID="Label5" runat="server">(年度) －</asp:Label>
                            <asp:TextBox ID="tbCLS" runat="server" Width="10.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>
                            <asp:ImageButton ID="btCls" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:Label ID="Label6" runat="server">(分類) －</asp:Label>
                            <asp:TextBox ID="tbCASE" runat="server" Width="7em" CssClass="InputUpperFieldText" MaxLength="12"></asp:TextBox>
                            <asp:ImageButton ID="btClass" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:Label ID="Label7" runat="server">(案次) －</asp:Label>
                            <asp:TextBox ID="tbVOL" runat="server" Width="2.5em" CssClass="InputUpperFieldText" MaxLength="4"></asp:TextBox>
                            <asp:Label ID="Label8" runat="server">－</asp:Label>
                            <asp:TextBox ID="tbSEQ" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label9" runat="server">檔號(迄)：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox onblur="PADZERO(txEYear,3);" ID="txEYear" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                            <asp:Label ID="Label10" runat="server">(年度) －</asp:Label>
                            <asp:TextBox ID="txECLS" runat="server" Width="10.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>
                            <asp:ImageButton ID="btECls" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:Label ID="Label11" runat="server">(分類) －</asp:Label>
                            <asp:TextBox ID="txECase" runat="server" Width="7em" CssClass="InputUpperFieldText" MaxLength="12"></asp:TextBox>
                            <asp:ImageButton ID="btECase" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                            <asp:Label ID="Label12" runat="server">(案次) －</asp:Label>
                            <asp:TextBox onblur="PADZERO(txEVol,4);" ID="txEVol" runat="server" Width="2.5em" CssClass="InputUpperFieldText" MaxLength="4"></asp:TextBox>
                            <asp:Label ID="Label13" runat="server">－</asp:Label>
                            <asp:TextBox onblur="PADZERO(txESeq,3);" ID="txESeq" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="lbStockText" runat="server">櫥位號：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txStockNoS" runat="server" Width="6em" MaxLength="11"></asp:TextBox>
                            <asp:Label ID="lbSeperateS" runat="server">(起) －</asp:Label>
                            <asp:TextBox ID="txStockNoE" runat="server" Width="6em" MaxLength="11"></asp:TextBox>
                            <asp:Label ID="lbSeperateE" runat="server">(訖)</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:DropDownList ID="dlDATE_TYPE" runat="server" Width="8.5em">
                                <asp:ListItem Value="1" Selected="True">來文日期</asp:ListItem>
                                <asp:ListItem Value="2">收(創)文日期</asp:ListItem>
                                <asp:ListItem Value="3">發文日期</asp:ListItem>
                                <asp:ListItem Value="4">文件產生日期</asp:ListItem>
                                <asp:ListItem Value="5">歸檔日期</asp:ListItem>
                                <asp:ListItem Value="6">部收文日期</asp:ListItem>
                                <asp:ListItem Value="7">會銜機關收文日期</asp:ListItem>
                                <asp:ListItem Value="8">開會日期</asp:ListItem>
                                <asp:ListItem Value="9">限辦日期</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="tbDATES" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                            <asp:Label ID="Label14" runat="server">(起) －</asp:Label>
                            <asp:TextBox ID="tbDATEE" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                            <asp:Label ID="Label15" runat="server">(訖)</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label16" runat="server" Width="8.5em">關鍵詞查詢項目：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:CheckBox ID="ckSubject" runat="server" Checked="True" Text="案由(主旨)"></asp:CheckBox>
                            <asp:CheckBox ID="ckCaseName" TabIndex="160" runat="server" Text="案名"></asp:CheckBox>
                            <asp:CheckBox ID="ckCaseSummary" TabIndex="160" runat="server" Text="案情摘要"></asp:CheckBox>
                            <asp:CheckBox ID="ckTheme" TabIndex="160" runat="server" Text="主題項"></asp:CheckBox>
                            <asp:CheckBox ID="ckKeyWord" TabIndex="160" runat="server" Text="關鍵字"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label17" runat="server">關鍵詞：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="tbKEYWORD" runat="server" Width="8em" CssClass="InputUpperFieldText" MaxLength="15"></asp:TextBox>(具全文檢索功能，輸入二個以上關鍵詞時，請用","隔開)
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label18" runat="server" Width="8.5em">查詢層級：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:CheckBox ID="ckDocLevel" TabIndex="160" runat="server" Checked="True" Text="案件"></asp:CheckBox>
                            <asp:CheckBox ID="ckCaseLevel" runat="server" Checked="True" Text="案卷"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label42" runat="server">密等：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="dlDOC_SEC" TabIndex="125" runat="server" Width="6em">
                                <asp:ListItem Selected="True"></asp:ListItem>
                                <asp:ListItem Value="1">普通</asp:ListItem>
                                <asp:ListItem Value="2">密</asp:ListItem>
                                <asp:ListItem Value="3">機密</asp:ListItem>
                                <asp:ListItem Value="4">極機密</asp:ListItem>
                                <asp:ListItem Value="5">絕對機密</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label19" runat="server">簽核類型：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:CheckBox ID="ckOnLine" runat="server" Checked="True" Text="線上簽核"></asp:CheckBox>
                            <asp:CheckBox ID="ckPaper" TabIndex="160" runat="server" Checked="True" Text="紙本簽核"></asp:CheckBox>
                        </div>
                    </div>
                </asp:Panel>
                <asp:Panel ID="pALL1" runat="server">
                    <div class="dTR" id="Tr5">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label20" runat="server">來受文者：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="tbUNIT" runat="server" Width="8em" CssClass="InputUpperFieldText" MaxLength="15"></asp:TextBox>(具全文檢索功能)
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label21" runat="server">檔案有關機關：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="tbUNIT2" runat="server" Width="8em" CssClass="InputUpperFieldText" MaxLength="15"></asp:TextBox>(具全文檢索功能)
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:DropDownList ID="dlNO" runat="server" Width="8.5em" CssClass="lab">
                                <asp:ListItem Value="0">來文字號</asp:ListItem>
                                <asp:ListItem Value="1">發文字號</asp:ListItem>
                                <asp:ListItem Value="2">收文字號</asp:ListItem>
                                <asp:ListItem Value="3">上級發文字號</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="tbNO" runat="server" Width="8em" MaxLength="15"></asp:TextBox>(具全文檢索功能)
                        </div>
                    </div>
                </asp:Panel>
                <asp:Panel ID="pUser3" Style="position: relative" runat="server">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="lbMailRcvNo" runat="server">郵件編號：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txMailRcvNo" runat="server" Width="25.5em" MaxLength="50"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label22" runat="server">承辦單位：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9.5em">
                            <cc1:ComboBox ID="dlDEPT" runat="server" CssClass="comboBox" Width="8.5em" Rows="10"></cc1:ComboBox>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label23" runat="server">承辦人：</asp:Label>
                        </div>
                        <div class="dTD">
                            <cc1:ComboBox ID="dlUSER" runat="server" CssClass="comboBox" Width="7em" Rows="10"></cc1:ComboBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label24" runat="server">公文性質：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9.5em">
                            <asp:DropDownList ID="dlDOC_PROPERTY" runat="server" Width="8.5em">
                                <asp:ListItem Selected="True"></asp:ListItem>
                                <asp:ListItem Value="1">一般公文</asp:ListItem>
                                <asp:ListItem Value="2">一般公文限期辦畢</asp:ListItem>
                                <asp:ListItem Value="3">專案管制</asp:ListItem>
                                <asp:ListItem Value="4">立委質詢案件</asp:ListItem>
                                <asp:ListItem Value="5">人民申請案件</asp:ListItem>
                                <asp:ListItem Value="6">人民陳情案件</asp:ListItem>
                                <asp:ListItem Value="7">訴願案件</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label39" runat="server">業務類別：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="ddlBTypeNo" runat="server" Width="9em"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label25" runat="server">公文來源：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9.5em">
                            <asp:DropDownList ID="dlDocSource" runat="server" Width="7em">
                                <asp:ListItem></asp:ListItem>
                                <asp:ListItem>正常公文</asp:ListItem>
                                <asp:ListItem Value="1">上級機關交辦</asp:ListItem>
                                <asp:ListItem Value="2">上級機關交議</asp:ListItem>
                                <asp:ListItem Value="3">會銜</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label26" runat="server">辦理天數：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txWorkDay" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                            <asp:Label ID="Label27" runat="server">天</asp:Label>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label31" runat="server">結案種類：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9.5em">
                            <asp:CheckBox ID="cbSend" runat="server" Text="發文"></asp:CheckBox>
                            <asp:CheckBox ID="cbSave" runat="server" Text="存查"></asp:CheckBox>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label32" runat="server">續辦：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:CheckBox ID="cbCaseConY" runat="server" Text="有"></asp:CheckBox>
                            <asp:CheckBox ID="cbCaseConN" runat="server" Text="無"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label33" runat="server">發文性質：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 9.5em">
                            <asp:DropDownList ID="ddlIssueProperty" runat="server" Width="8.5em"></asp:DropDownList>
                        </div>
                        <div class="dTDTitle" style="width: 5.5em">
                            <asp:Label ID="Label35" runat="server">歸檔：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:CheckBox ID="cbSaveConY" runat="server" Text="是"></asp:CheckBox>
                            <asp:CheckBox ID="cbSaveConN" runat="server" Text="否"></asp:CheckBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9em">
                            <asp:Label ID="Label34" runat="server">文別：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="ddlDocCategory" runat="server" Width="9em"></asp:DropDownList>
                        </div>
                    </div>
                </asp:Panel>
                <div class="dTR" id="Tr9">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label28" runat="server">查詢結果呈現方式</asp:Label>
                    </div>
                </div>
                <div class="dTR" id="Tr10">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label29" runat="server">每頁顯示：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlNumPerPage" runat="server" Width="3em">
                            <asp:ListItem Value="15" Selected="True">15</asp:ListItem>
                            <asp:ListItem Value="20">20</asp:ListItem>
                            <asp:ListItem Value="30">30</asp:ListItem>
                            <asp:ListItem Value="40">40</asp:ListItem>
                            <asp:ListItem Value="50">50</asp:ListItem>
                        </asp:DropDownList>
                        <asp:Label ID="Label30" runat="server">筆</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="查詢" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="清除" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="空白調案單(P)" ID="btPrint" AccessKey="P" Title="空白調案單(ALT+P)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
