<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAT503.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAT503" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAT503保存年限修正作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <style type="text/css">
        .PopUp1 {
            BORDER-BOTTOM-STYLE: none;
            TEXT-ALIGN: center;
            BORDER-RIGHT-STYLE: none;
            BACKGROUND-COLOR: transparent;
            BORDER-TOP-STYLE: none;
            BORDER-LEFT-STYLE: none;
            BEHAVIOR: url(../../../STD/LIB/PopUpMessage.htc) color:Navy;
        }
    </style>
</head>
<body>
    <form id="EAT503" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="Table1" class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div id="Table3" class="DivTable">
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 5.5em">
                                    <asp:Label ID="Label4" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 10em">
                                    <asp:TextBox ID="txPlanNo" TabIndex="1" runat="server" Width="4.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox>
                                    <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>&nbsp;&nbsp;&nbsp; 
                                </div>
                                <div class="dTDTitle" style="width: 5.5em">
                                    <asp:Label ID="Label10" runat="server" Width="5.5em">計畫說明：</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txPlanDesc" TabIndex="-1" runat="server" Width="16.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 5.5em">
                                    <asp:Label ID="Label9" runat="server">意見來源：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 10em">
                                    <asp:DropDownList ID="dlAdviseBy" TabIndex="2" runat="server" Width="8em"></asp:DropDownList>
                                </div>
                                <div class="dTDTitle" style="width: 5.5em">
                                    <asp:Label ID="Label11" runat="server">檔號範圍：</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txFileRange" TabIndex="-1" runat="server" Width="16.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:TextBox>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <fieldset style="width: 40em;">
                    <legend>資料範圍</legend>
                    <div id="Table2" class="DivTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label3" runat="server">文(編)號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txDocNo" TabIndex="3" runat="server" Width="7em" MaxLength="15" ToolTip="文(編)號(11)"></asp:TextBox>&nbsp;&nbsp;&nbsp;
								<asp:Button ID="btDocAdd" runat="server" CausesValidation="False" Text="加入"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label5" runat="server">檔號(起)：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txFileYearS" TabIndex="4" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>－
								<asp:TextBox ID="txFileClsS" TabIndex="6" CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20" ToolTip="分類號(20)"></asp:TextBox>－
								<asp:TextBox ID="txFileCaseS" TabIndex="8" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12" ToolTip="案次號(12)"></asp:TextBox>
                                <asp:TextBox ID="txCountryNoS" TabIndex="9" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txDivisionNoS" TabIndex="9" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txProductNoS" TabIndex="9" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox>－
								<asp:TextBox ID="txFileVolS" TabIndex="10" CssClass="InputUpperFieldText" runat="server" Width="2.5em" MaxLength="4" ToolTip="卷次號(4)"></asp:TextBox>－
								<asp:TextBox ID="txFileSeqS" TabIndex="13" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="卷次號(3)"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label8" runat="server">檔號(訖)：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txFileYearE" TabIndex="15" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>－
								<asp:TextBox ID="txFileClsE" TabIndex="17" CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20" ToolTip="分類號(20)"></asp:TextBox>－
								<asp:TextBox ID="txFileCaseE" TabIndex="19" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12" ToolTip="案次號(12)"></asp:TextBox>
                                <asp:TextBox ID="txCountryNoE" TabIndex="20" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txDivisionNoE" TabIndex="20" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txProductNoE" TabIndex="20" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox>－
								<asp:TextBox ID="txFileVolE" TabIndex="21" CssClass="InputUpperFieldText" runat="server" Width="2.5em" MaxLength="4" ToolTip="卷次號(4)"></asp:TextBox>－
								<asp:TextBox ID="txFileSeqE" TabIndex="23" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="卷次號(3)"></asp:TextBox>&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label Style="z-index: 0" ID="Label13" runat="server">庫房別：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:DropDownList Style="z-index: 0" ID="ddlStoreNo" runat="server" Width="8.5em"></asp:DropDownList>
                                <asp:Button Style="z-index: 0" ID="btFileAdd" runat="server" Text="加入"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label18" runat="server">櫥位號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txStockNoS" TabIndex="25" CssClass="InputUpperFieldText" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
                                <asp:Label ID="Label19" runat="server">－</asp:Label>
                                <asp:TextBox ID="txStockNoE" TabIndex="27" CssClass="InputUpperFieldText" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
                                <asp:Button ID="btAdd_Stock" runat="server" Text="加入"></asp:Button>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset style="width: 40em; height: 10.5em">
                    <legend>審核意見登錄</legend>
                    <div class="DivTable">
                        <div class="dTR">
                            <div class="dTD" style="width: 12em">
                                <asp:RadioButton ID="rbY" TabIndex="29" runat="server" CssClass="hide" GroupName="Choice"></asp:RadioButton>
                                <asp:Label ID="Label2" runat="server">調整後保存年限：</asp:Label>
                                <asp:TextBox ID="txKeepYear" TabIndex="40" CssClass="InputFieldNumeric" runat="server" Width="1.5em" MaxLength="2" ToolTip="保存年限(2)"></asp:TextBox>
                                <asp:Label ID="Label7" runat="server">年</asp:Label>
                            </div>
                            <div class="dTDTitle" style="width: 26.5em">
                                <asp:Label ID="Label6" runat="server">調整原因：</asp:Label>&nbsp;
                                <asp:DropDownList ID="dlReason" TabIndex="65" runat="server"></asp:DropDownList>
                                <asp:Button ID="btSet" runat="server" Text="設定"></asp:Button>&nbsp;&nbsp;
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTD">
                                <asp:Label Style="z-index: 0" ID="Label14" runat="server">調整後清理處置：</asp:Label>
                                <asp:DropDownList Style="z-index: 0" ID="dlClearProc" runat="server">
                                    <asp:ListItem></asp:ListItem>
                                    <asp:ListItem Value="1">列為國家檔案</asp:ListItem>
                                    <asp:ListItem Value="2">機關永久保存</asp:ListItem>
                                    <asp:ListItem Value="3">依規定程序銷毀</asp:ListItem>
                                    <asp:ListItem Value="4">屆期後鑑定</asp:ListItem>
                                </asp:DropDownList>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 19.5em">
                                <asp:RadioButton ID="rbF" TabIndex="68" runat="server" CssClass="hide" GroupName="Choice"></asp:RadioButton>
                                <asp:Label ID="Label12" runat="server" CssClass="hide">修正檔號</asp:Label>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 3em">
                                <asp:Label ID="Label1" runat="server">說明：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txDesc" TabIndex="70" runat="server" Width="33.5em" MaxLength="80" ToolTip="備註(80)" Height="2.5em" TextMode="MultiLine"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 14.5em">
                        <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                            <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                            <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                            <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                            <asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
                        </asp:Panel>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb1" runat="server" Text="設定" GroupName="Type1" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rb2" runat="server" Text="更新" GroupName="Type1"></asp:RadioButton>
                        <asp:RadioButton ID="rb3" runat="server" Text="刪除" GroupName="Type1"></asp:RadioButton>
                    </div>
                </div>
                <div class="GridDiv" style="height: 11.5em; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <HeaderStyle Width="1.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="設定">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="更新">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect2" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="刪除">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect3" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文(編)號<br>檔號">
                                <HeaderStyle Width="12.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="lbDocNo" runat="server" Width="5.5em" CssClass="PopUp1" ReadOnly="True"></asp:TextBox><br>
                                    <asp:Label ID="lbFileNo" runat="server" Width="10em" CssClass="PopUp1"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn Visible="False" HeaderText="變更檔號">
                                <HeaderStyle Width="2.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="lbFileNoChange" runat="server" Width="2.5em" CssClass="PopUp1" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="原保存年限">
                                <HeaderStyle Width="3em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="lbOKeepyear" runat="server" Width="3em" CssClass="PopUp1" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="新保存年限">
                                <HeaderStyle Width="3em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="lbNKeepyear" runat="server" Width="3em" CssClass="hide" Height="1.5em" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                                    <asp:TextBox ID="txShowKeepYear" runat="server" Width="3em" CssClass="PopUp1" Height="1.5em" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="原清理處置">
                                <HeaderStyle Width="6.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="lbOClearProc" CssClass="PopUp1" Width="6.5em" ReadOnly="True" runat="server"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="新清理處置">
                                <HeaderStyle Width="6.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="lbNClearProc" CssClass="PopUp1" Width="6.5em" ReadOnly="True" runat="server" TextMode="MultiLine"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="意見來源">
                                <ItemTemplate>
                                    <asp:TextBox ID="lbAdviseBy" runat="server" Width="6.5em" CssClass="PopUp1" Height="1.5em" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="原因">
                                <HeaderStyle Width="8.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="lbReason" runat="server" Width="8.5em" CssClass="PopUp1" ReadOnly="True" Height="1.5em" TextMode="MultiLine"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="說明">
                                <HeaderStyle Width="12.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="lbDesc" runat="server" Width="12.5em" CssClass="PopUp1" Height="1.5em" ReadOnly="True" TextMode="MultiLine"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="CASE_KEY(隱藏)">
                                <ItemTemplate>
                                    <asp:TextBox ID="lbCaseKey" runat="server" CssClass="PopUp1"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="庫房別">
                                <HeaderStyle Width="5.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSTORE_NAME" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="更新註記(S)" AccessKey="S" Title="更新註記(ALT+S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除註記(D)" AccessKey="D" Title="刪除註記(ALT+D)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave2" runat="server" Text="調整保存年限(U)" AccessKey="U" Title="調整保存年限(ALT+U)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
