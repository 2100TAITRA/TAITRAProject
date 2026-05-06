<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKR320_MOCS.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR320_MOCS" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title >AKR320 案卷標籤及目次表列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <style type="text/css">
        .auto-style1 {
            width: 5.5em;
            height: 1px;
        }

        .auto-style2 {
            height: 1px;
        }
    </style>
</head>
<body ms_positioning="GridLayout">
    <form id="AKR320" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label12" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_InpNumOnly();" ID="txDocNo" TabIndex="1" runat="server" MaxLength="10" Width="6em"></asp:TextBox>
                        <asp:TextBox ID="H_OrgNO" TabIndex="-1" runat="server" CssClass="hide" ></asp:TextBox>
                        <asp:Button ID="btSetFileNo" runat="server" Text="帶入檔號" />
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_InpNumOnly();" ID="tbVerNo" TabIndex="1" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">年度號：</asp:Label>
                    </div>
                    <div>
                        <asp:TextBox CssClass="InputFieldNumeric" ID="tbFILE_YEAR" TabIndex="1" runat="server" MaxLength="3" Width="2em">100</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_UPPERCASE();" ID="tbFILE_CLS1" TabIndex="2" runat="server" MaxLength="20" Width="9.5em"></asp:TextBox>
                        <asp:ImageButton ID="btCls" runat="server" Width="1.5em" ImageUrl="template/images/HELPWIN_E.gif" Visible="False"></asp:ImageButton>&nbsp;
                        <asp:Label onkeypress="jf_UPPERCASE();" onmouseover ="this.title = this.textContent;" ID="lbFILE_CLS1" TabIndex="-1" runat="server" MaxLength="20" Width="16em" ForeColor="Navy"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label9" runat="server" CssClass="hide">分類號(訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_UPPERCASE();" ID="tbFILE_CLS2" TabIndex="2" runat="server" CssClass="hide" MaxLength="20" Width="9.5em"></asp:TextBox>
                        <asp:Label onkeypress="jf_UPPERCASE();" onmouseover ="this.title = this.textContent;" ID="lbFILE_CLS2" TabIndex="-1" runat="server" CssClass="hide" Width="16em" MaxLength="20" ForeColor="Navy"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">案次號(起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_UPPERCASE();" ID="tbFILE_CASE1" TabIndex="3" runat="server" MaxLength="12" Width="7em"></asp:TextBox>
                        <asp:ImageButton onmouseover ="this.title = this.textContent;" ID="btClass" runat="server" Width="1.5em" ImageUrl="template/images/HELPWIN_E.gif" Visible="False"></asp:ImageButton>&nbsp;<asp:Label onkeypress="jf_UPPERCASE();" ID="lbFILE_CASE1" TabIndex="-1" runat="server" MaxLength="20" Width="16em" ForeColor="Navy"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">案次號(訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_UPPERCASE();" ID="tbFILE_CASE2" TabIndex="3" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                        <asp:Label onmouseover ="this.title = this.textContent;" onkeypress="jf_UPPERCASE();" ID="lbFILE_CASE2" TabIndex="-1" runat="server" Width="16em" MaxLength="20" ForeColor="Navy"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">卷次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_VOL1" TabIndex="4" runat="server" OnKeyPress="jf_UPPERCASE();" CssClass="InputEnOnlyUpperField" MaxLength="4" Width="2.5em"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">－</asp:Label>
                        <asp:TextBox ID="tbFILE_VOL2" TabIndex="5" runat="server" onkeypress="jf_UPPERCASE();" CssClass="InputEnOnlyUpperField" MaxLength="4" Width="2.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label11" runat="server" CssClass="hide">庫房：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStore" TabIndex="60" runat="server" CssClass="hide"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label6" runat="server" Width="6.5em"></asp:Label>
                        <asp:CheckBox ID="cbPrePrint" CssClass="hide" runat="server" Width="10.5em" Text="預印案卷標籤及封面" Checked="True"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label10" runat="server" Width="6.5em"></asp:Label>
                        <asp:CheckBox ID="cbIsRcvfile" CssClass="hide" runat="server" Width="18.5em" Text="列印紙本來文併同歸檔案件目次表"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <fieldset>
                            <legend>列印報表</legend>
                            <div class="MainTable" id="Table1">
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD" style="width: 15em">
                                        <asp:RadioButton ID="rbL" runat="server" Text="案卷標籤　起始位置：" GroupName="a"></asp:RadioButton>
                                        <asp:TextBox ID="txPos" TabIndex="10" runat="server" MaxLength="2" Width="2em"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton Style="z-index: 0" ID="rbL3" runat="server" Text="3公分案卷標籤" GroupName="a" Visible="False"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton Style="z-index: 0" ID="rbL6" runat="server" Text="6公分案卷標籤" GroupName="a" Visible="False"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:Label ID="lb1" runat="server" Width="1.5em"></asp:Label>
                                        <asp:CheckBox ID="cbBarCode" CssClass="hide"  runat="server" Text="是否列印條碼"></asp:CheckBox>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCover" runat="server" CssClass="InputFieldText" Text="案卷封面" GroupName="a"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCoverLabel" runat="server" CssClass="hide" Text="封面標籤" GroupName="a"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbV_SEQ" runat="server" Width="10em" Text="案卷目次表(分類+案名)" Checked="True" GroupName="a"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="hide">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rb2" runat="server" Width="11em" CssClass="hide"  Text="橫式案卷目次表" GroupName="a"></asp:RadioButton>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <asp:RadioButton ID="rbL_C" runat="server" CssClass="hide" Width="13em" Text="案卷標籤(大) + 封面" GroupName="a"></asp:RadioButton>
                        <asp:RadioButton ID="rbM_C" runat="server" CssClass="hide" Width="13em" Text="案卷標籤(中) + 封面" GroupName="a"></asp:RadioButton>
                        <asp:RadioButton ID="rbM" runat="server" CssClass="hide" Text="案卷標籤(中)" GroupName="a"></asp:RadioButton>
                    </div>
                    <div class="hide">
                        <fieldset>
                            <legend>案卷名稱列印項目</legend>
                            <div class="MainTable" id="Table2">
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCls_Case" runat="server" Text="分類+案名" Checked="True" GroupName="b"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCls" runat="server" Text="分類名" GroupName="b"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCase" runat="server" Text="案名" GroupName="b"></asp:RadioButton>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset id="fsWidth" runat="server">
                            <legend>卷夾寬度</legend>
                            <div id="Table50" class="MainTable">
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbVgh" runat="server" Text="總院" Checked="True" GroupName="c"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbWidth2" runat="server" Text="分院(2公分)" GroupName="c"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle">
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbWidth3" runat="server" Text="分院(3公分)" GroupName="c"></asp:RadioButton>
                                    </div>
                                </div>
                            </div>
                            <font face="Times New Roman">
                        </fieldset>
                    </div>
                </div>
            </div>
            <div id="Table3" class="hide">
                <div class="dTR">
                    <div style="width: 8em">
                    </div>
                    <div class="dTR">
                        <asp:CheckBox ID="cbFM" runat="server" Text="依檔管局建議的報表格式輸出"></asp:CheckBox><br>
                        <asp:CheckBox ID="cbLine" runat="server" Text="列印案卷目次表框線"></asp:CheckBox><br>
                        <asp:CheckBox ID="cbShowPage" runat="server" Text="案卷目次表顯示頁碼"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div style="width: 8em">
                        <asp:Label ID="lbDesc" runat="server">功能說明：</asp:Label>
                    </div>
                    <div class="dTR">
                        <asp:Label ID="lbDetail" runat="server">案卷標籤列印起始位置。請依目前標籤紙列印位置輸入</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btRpt" runat="server" Text="報表" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:DropDownList ID="ddRptName" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:none;">
                <asp:ListItem Value="人員薪資單" Selected="True">人員薪資單</asp:ListItem>
                <asp:ListItem Value="中檢資訊">中檢資訊</asp:ListItem>
                <asp:ListItem Value="預設">預設</asp:ListItem>
            </asp:DropDownList>
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 103; position: absolute; top: 410px; left: 1px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; position: absolute; top: 212px; left: 650px" runat="server" CssClass="hidden" Width="27px"></asp:ValidationSummary>
    </form>
</body>
</html>
