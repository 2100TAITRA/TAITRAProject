<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAT502.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAT502" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAT502提供史政機關登錄作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
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
    <form id="EAT502" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 105px; height: 225px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:TextBox ID="txOrgNo" runat="server" CssClass="hidden"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:DropDownList ID="dlChose" runat="server" Width="5.5em" CssClass="RequireField">
                            <asp:ListItem Value="1">清理批號</asp:ListItem>
                            <asp:ListItem Value="2">銷毀計畫</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:TextBox ID="txPlanNo" runat="server" Width="4.5em" CssClass="RequireFieldNumeric" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ToolTip="提示計畫批號" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">計畫說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanDesc" TabIndex="-1" runat="server" Width="16.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
					<div class="dTDTitle" style="width: 16em">&nbsp;&nbsp;</div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label11" runat="server">檔號範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileRange" TabIndex="-1" runat="server" Width="16.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <fieldset style="width: 43.5em; height: 11.5em">
                    <legend>資料範圍</legend>
                    <div id="Table2" class="DivTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label3" runat="server">文(編)號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txDocNo" CssClass="InputFieldNumeric" runat="server" Width="7.5em" ToolTip="文(編)號(11)"></asp:TextBox>&nbsp;&nbsp;&nbsp;
								<asp:Button ID="btDocAdd" runat="server" Text="加入"></asp:Button>&nbsp;
								<asp:Label ID="Label12" runat="server" Height="1em">批號下所有公文</asp:Label>&nbsp;
								<asp:Button ID="btAddAll" runat="server" Text="加入"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label5" runat="server">檔號(起)：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txFileYearS" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>－
								<asp:TextBox ID="txFileClsS" CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20" ToolTip="分類號(20)"></asp:TextBox>－
								<asp:TextBox ID="txFileCaseS" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12" ToolTip="案次號(12)"></asp:TextBox>－
								<asp:TextBox ID="txFileVolS" CssClass="InputUpperFieldText" runat="server" Width="2.5em" MaxLength="4" ToolTip="卷次號(4)"></asp:TextBox>－
								<asp:TextBox ID="txFileSeqS" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label8" runat="server">檔號(訖)：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txFileYearE" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>－
								<asp:TextBox ID="txFileClsE" CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20" ToolTip="分類號(20)"></asp:TextBox>－
								<asp:TextBox ID="txFileCaseE" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12" ToolTip="案次號(12)"></asp:TextBox>－
								<asp:TextBox ID="txFileVolE" CssClass="InputUpperFieldText" runat="server" Width="2.5em" MaxLength="4" ToolTip="卷次號(4)"></asp:TextBox>－
								<asp:TextBox ID="txFileSeqE" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label Style="z-index: 0" ID="Label4" runat="server">庫房別：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:DropDownList Style="z-index: 0" ID="ddlStoreNo" runat="server" Width="8.5em"></asp:DropDownList>
                                <asp:Button Style="z-index: 0" ID="btFileAdd" runat="server" Text="加入" CausesValidation="False"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label18" runat="server">櫥位號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txStockNoS" CssClass="InputUpperFieldText" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
                                <asp:Label ID="Label19" runat="server">－</asp:Label>
                                <asp:TextBox ID="txStockNoE" CssClass="InputUpperFieldText" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
                                <asp:Button ID="btAdd_Stock" runat="server" Text="加入"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label10" runat="server">關鍵詞：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txKeyword" CssClass="KeyUpperField" runat="server" Width="8.5em" Height="1.5em" MaxLength="15"></asp:TextBox>(具全文檢索功能，輸入二個以上關鍵詞時，請用","隔開)&nbsp;
								<asp:Button ID="btKeyWordAdd" runat="server" Text="加入"></asp:Button>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset style="width: 43.5em; height: 10em">
                    <legend>註記</legend>
                    <div class="DivTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label1" runat="server" Width="5em">史政機關：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txReqOrgId" runat="server" Width="20.5em"></asp:TextBox>
                                <asp:TextBox ID="txReqOrgName" runat="server" Width="13em" CssClass="hide" MaxLength="60" ToolTip="要求提供機關"></asp:TextBox>&nbsp;
                                <asp:ImageButton ID="ibtSourceOrgNo" TabIndex="-1" runat="server" ToolTip="提示檔案產生機關" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                                &nbsp;<asp:Button ID="btSet" runat="server" Text="設定"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label6" runat="server" Width="5em">來文日期：</asp:Label>
                            </div>
                            <div class="dTD" style="width: 8em">
                                <asp:TextBox ID="txFromOrgDate" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7" ToolTip="要求提供公文之來文日期"></asp:TextBox>
                            </div>
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label7" runat="server" Width="5em">來文字號：</asp:Label>
							</div>
                            <div class="dTD">
                                <asp:TextBox ID="txFromNoWord" runat="server" Width="12.5em" MaxLength="20" ToolTip="要求提供公文之來文字號"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:Label ID="Label2" runat="server" Width="5em">提供原委：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txRvisRemark" runat="server" Width="26em" Height="2.5em" MaxLength="80" ToolTip="提供原委(80)" TextMode="MultiLine"></asp:TextBox>
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
                        <asp:RadioButton ID="rb1" runat="server" Text="設定" Checked="True" GroupName="Type1"></asp:RadioButton>
                        <asp:RadioButton ID="rb2" runat="server" Text="更新" GroupName="Type1"></asp:RadioButton>
                        <asp:RadioButton ID="rb3" runat="server" Text="刪除" GroupName="Type1"></asp:RadioButton>
                    </div>
                </div>
                <div class="GridDiv" style="width: 55em; height: 11.5em; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="20" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
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
                                <HeaderStyle HorizontalAlign="Center" Width="5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="lbDocNo" runat="server" Width="5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbFileNo" runat="server" Width="10em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文史機關">
                                <ItemTemplate>
                                    <asp:TextBox ID="lbReqOrgName" runat="server" Width="5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文日期">
                                <HeaderStyle HorizontalAlign="Center" Width="4.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="4.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:TextBox ID="lbDate" runat="server" Width="4em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字號">
                                <ItemTemplate>
                                    <asp:TextBox ID="lbFormWord" runat="server" Width="3em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="原委">
                                <ItemTemplate>
                                    <asp:TextBox ID="lbRemark" runat="server" Width="9.5em" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="清理批號">
                                <HeaderStyle CssClass="hide"></HeaderStyle>
                                <ItemStyle CssClass="hide"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbPlanNoHide" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="庫房別">
                                <HeaderStyle Width="6em"></HeaderStyle>
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
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="更新註記(S)" Accesskey = "S" Title = "更新註記(ALT+S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除註記(D)" Accesskey = "D" Title = "刪除註記(ALT+D)" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
