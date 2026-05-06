<%@ Page Language="c#" CodeBehind="EAT601.aspx.cs" AutoEventWireup="false" Inherits="EA60.EAT601" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT601 移轉審查意見註記作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAT601" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:TextBox ID="txPlanType" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:TextBox ID="txPlanNo" TabIndex="1" runat="server" Width="4.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="labeldesc" runat="server">計畫說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanDesc" TabIndex="-1" runat="server" Width="16.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">意見來源：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:DropDownList ID="dlAdvis" TabIndex="2" runat="server" Width="8em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label11" runat="server">檔號範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileNoSep" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txFileRange" TabIndex="-1" runat="server" Width="16.5em" CssClass="DisplayOnly" MaxLength="8"></asp:TextBox>
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
                                <asp:TextBox ID="txDocNo" TabIndex="3" runat="server" Width="5.5em" MaxLength="10" ToolTip="文(編)號(11)"></asp:TextBox>&nbsp;&nbsp;&nbsp;
								<asp:Button ID="btDocAdd" TabIndex="-1" runat="server" Text="加入"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label5" runat="server">檔號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txYearS" TabIndex="5" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>－
								<asp:TextBox ID="txClsS" TabIndex="6" CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20" ToolTip="分類號(20)"></asp:TextBox>－
								<asp:TextBox ID="txCaseS" TabIndex="7" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12" ToolTip="案次號(12)"></asp:TextBox>－
								<asp:TextBox ID="txVolS" TabIndex="8" CssClass="InputUpperFieldText" runat="server" Width="2.5em" MaxLength="4" ToolTip="卷次號(4)"></asp:TextBox>－
								<asp:TextBox ID="txSeqS" TabIndex="9" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                            <div class="dTD">
                                <asp:TextBox ID="txYearE" TabIndex="10" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>－
								<asp:TextBox ID="txClsE" TabIndex="11" CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20" ToolTip="分類號(20)"></asp:TextBox>－
								<asp:TextBox ID="txCaseE" TabIndex="12" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12" ToolTip="案次號(12)"></asp:TextBox>－
								<asp:TextBox ID="txVolE" TabIndex="13" CssClass="InputUpperFieldText" runat="server" Width="2.5em" MaxLength="4" ToolTip="卷次號(4)"></asp:TextBox>－
								<asp:TextBox ID="txSeqE" TabIndex="14" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label Style="z-index: 0" ID="Label2" runat="server">庫房別：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:DropDownList Style="z-index: 0" ID="ddlStoreNo" runat="server" Width="8.5em"></asp:DropDownList>
                                <asp:Button ID="btFileAdd" TabIndex="-1" runat="server" Text="加入" Style="z-index: 0"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label18" runat="server">櫥位號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txStockNoS" TabIndex="15" CssClass="InputUpperFieldText" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
                                <asp:Label ID="Label19" runat="server">－</asp:Label>
                                <asp:TextBox ID="txStockNoE" TabIndex="15" CssClass="InputUpperFieldText" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
                                <asp:Button ID="btAdd_Stock" TabIndex="-1" runat="server" Text="加入"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label1" TabIndex="-1" runat="server">承辦單位：</asp:Label>
                            </div>
                            <div class="dTD">
                                <cc1:ComboBox ID="dlDept" TabIndex="15" runat="server" CssClass="comboBox" Width="8.5em" Rows="10"></cc1:ComboBox>
                                <asp:Button ID="btAdd_DEPT" TabIndex="-1" runat="server" Text="加入"></asp:Button>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset style="width: 40em; height: 3.5em">
                    <legend>審核意見登錄</legend>
                    <div id="Table4" class="DivTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;</div>
                            <div class="dTD" style="width: 30.5em">
                                <asp:RadioButton ID="rbNotTran" TabIndex="16" runat="server" Width="6em" Text="不移轉(交)" GroupName="g1"></asp:RadioButton>&nbsp;&nbsp;&nbsp;&nbsp;
								<asp:RadioButton ID="rbTran" TabIndex="17" runat="server" Width="8.5em" Text="延長移轉期限至" GroupName="g1"></asp:RadioButton>
                                <asp:TextBox ID="txTDate" TabIndex="18" runat="server" Width="4em" MaxLength="7"></asp:TextBox>&nbsp;&nbsp;
								<asp:Button ID="btSet" TabIndex="19" runat="server" Text="設定"></asp:Button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="dTR">
                    <div class="dTD" style="width: 22.5em">
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
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <HeaderStyle HorizontalAlign="Center" Width="1.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="1.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="設定">
                                <HeaderStyle HorizontalAlign="Center" Width="2.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="2.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="更新">
                                <HeaderStyle HorizontalAlign="Center" Width="2.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="2.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect2" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="刪除">
                                <HeaderStyle HorizontalAlign="Center" Width="2.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="2.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect3" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文(編)號">
                                <HeaderStyle HorizontalAlign="Center" Width="5.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="5.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔號">
                                <HeaderStyle HorizontalAlign="Center" Width="11.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Left" Width="11.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbFileNo" runat="server" Width="11.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="審核意見">
                                <HeaderStyle HorizontalAlign="Center" Width="12.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="12.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbAdvis" runat="server" Width="12.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="意見來源代碼(隱藏)">
                                <HeaderStyle HorizontalAlign="Center" Width="2em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="2em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbAdviseByCode" runat="server" Width="2em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="意見來源">
                                <HeaderStyle HorizontalAlign="Center" Width="7.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="7.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbAdviseBy" runat="server" Width="7.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="庫房別">
                                <HeaderStyle Width="5.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSTORE_NAME" runat="server"></asp:Label>
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
            <asp:Button ID="btSave" runat="server" Text="更新註記(S)" AccessKey="S" Title="更新註記(ALT+S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除註記(D)" AccessKey="D" Title="刪除註記(ALT+D)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢註記現況(C)" AccessKey="C" Title="查詢註記現況(ALT+C)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
