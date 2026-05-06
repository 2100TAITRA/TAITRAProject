<%@ Page Language="c#" CodeBehind="AKR323.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR323" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR323 案卷標籤及目次表列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKR323" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox Style="z-index: 101; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label8" runat="server">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbVerNo" TabIndex="1" runat="server" CssClass="InputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label1" runat="server">年度號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_YEAR" TabIndex="1" runat="server" CssClass="InputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label2" runat="server">分類號(起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_CLS1" TabIndex="2" runat="server" Width="9.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btCls" runat="server" Width="1.5em" Visible="True" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="lbFILE_CLS1" TabIndex="-1" runat="server" Width="15.5em" CssClass="TextLabel" ReadOnly="True" MaxLength="20" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label9" runat="server">分類號(訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_CLS2" TabIndex="2" CssClass="InputUpperFieldText" runat="server" Width="9.5em" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton Style="z-index: 0" ID="btCls2" runat="server" Width="1.5em" Visible="True" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="lbFILE_CLS2" TabIndex="-1" CssClass="TextLabel" ReadOnly="True" runat="server" Width="15.5em" MaxLength="20" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label3" runat="server">案次號(起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_CASE1" TabIndex="3" CssClass="InputUpperFieldText" runat="server" Width="9.5em" MaxLength="12"></asp:TextBox>
                        <asp:ImageButton ID="btClass" runat="server" Width="1.5em" Visible="True" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="lbFILE_CASE1" TabIndex="-1" CssClass="TextLabel" ReadOnly="True" runat="server" Width="15.5em" MaxLength="20" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label7" runat="server">案次號(訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_CASE2" TabIndex="3" CssClass="InputUpperFieldText" runat="server" Width="9.5em" MaxLength="12"></asp:TextBox>
                        <asp:ImageButton Style="z-index: 0" ID="btClass2" runat="server" Width="1.5em" Visible="True" ImageUrl="template/images/HELPWIN_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="lbFILE_CASE2" TabIndex="-1" CssClass="TextLabel" ReadOnly="True" runat="server" Width="15.5em" MaxLength="20" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label4" runat="server">卷次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFILE_VOL1" TabIndex="4" runat="server" CssClass="InputEnOnlyUpperField" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">－</asp:Label>
                        <asp:TextBox ID="tbFILE_VOL2" TabIndex="5" runat="server" CssClass="InputEnOnlyUpperField" Width="2.5em" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label6" runat="server" Width="6.5em">&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbPrePrint" runat="server" Width="10.5em" Checked="True" Text="預印案卷標籤及封面"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10.5em">
                        <asp:Label ID="Label10" runat="server" Width="6.5em">&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbIsRcvfile" runat="server" Width="18.5em" Checked="True" Text="列印紙本來文併同歸檔案件目次表"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 50%">
                        <fieldset>
                            <legend>列印報表</legend>
                            <div class="DivTable" id="Table1">
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbL" runat="server" Text="案卷標籤　起始位置：" GroupName="a"></asp:RadioButton>
                                        <asp:TextBox ID="txPos" TabIndex="10" runat="server" CssClass="InputFieldNumeric" Width="1.5em" MaxLength="2"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton Style="z-index: 0" ID="rbL3" runat="server" Visible="False" Text="3公分案卷標籤" GroupName="a"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton Style="z-index: 0" ID="rbL6" runat="server" Visible="False" Text="6公分案卷標籤" GroupName="a"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:Label Style="z-index: 0" ID="lb1" runat="server" Width="1em"></asp:Label>
                                        <asp:CheckBox Style="z-index: 0" ID="cbBarCode" runat="server" Text="是否列印條碼"></asp:CheckBox>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton Style="z-index: 0" ID="rbCover" runat="server" CssClass="hide" Text="案卷封面" GroupName="a"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbV_SEQ" runat="server" Width="10em" Checked="True" Text="直式案卷目次表" GroupName="a"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rb2" runat="server" Width="11em" Text="橫式案卷目次表" GroupName="a"></asp:RadioButton>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <asp:RadioButton ID="rbL_C" runat="server" CssClass="hide" Width="13em" Text="案卷標籤(大) + 封面" GroupName="a"></asp:RadioButton>
                        <asp:RadioButton ID="rbM_C" runat="server" CssClass="hide" Width="13em" Text="案卷標籤(中) + 封面" GroupName="a"></asp:RadioButton>
                        <asp:RadioButton ID="rbM" runat="server" CssClass="hide" Text="案卷標籤(中)" GroupName="a"></asp:RadioButton>
                    </div>
                    <div class="dTD" style="width: 50%">
                        <fieldset>
                            <legend>案卷名稱列印項目</legend>
                            <div class="DivTable" id="Table2">
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCls_Case" runat="server" Checked="True" Text="分類+案名" GroupName="b"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCls" runat="server" Text="分類名" GroupName="b"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCase" runat="server" Text="案名" GroupName="b"></asp:RadioButton>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="Table3">
                <div class="dTR">
                    <div class="dTD">
                        <asp:CheckBox ID="cbFM" runat="server" Text="依檔管局建議的報表格式輸出"></asp:CheckBox><br>
                        <asp:CheckBox ID="cbLine" runat="server" Text="列印案卷目次表框線"></asp:CheckBox><br>
                        <asp:CheckBox ID="cbShowPage" runat="server" Text="案卷目次表顯示頁碼"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbDesc" runat="server">功能說明：</asp:Label>
                    </div>
                    <div class="dTD">
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
            <asp:Button ID="btRpt" runat="server" Text="報表:" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:DropDownList ID="ddRptName" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:none;">
                <asp:ListItem Value="人員薪資單" Selected="True">人員薪資單</asp:ListItem>
                <asp:ListItem Value="中檢資訊">中檢資訊</asp:ListItem>
                <asp:ListItem Value="預設">預設</asp:ListItem>
            </asp:DropDownList>
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 103; position: absolute; top: 410px; left: 1px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 104; position: absolute; top: 212px; left: 650px" ID="ValidationSummary1" runat="server" CssClass="hidden" Width="27px"></asp:ValidationSummary>
    </form>
</body>
</html>
