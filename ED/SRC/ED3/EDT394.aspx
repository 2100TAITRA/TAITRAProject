<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT394.aspx.cs" AutoEventWireup="false" Inherits="ED3.EDT394" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT394 郵寄資料登錄作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT394" onkeyup="jf_CheckFull();" method="post" runat="server" novalidate>
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_dlIssueOrgSelectIndex"  runat="server" ></asp:TextBox>
            <asp:TextBox ID="H_txOfficeCode"  runat="server" ></asp:TextBox>
            <asp:TextBox ID="H_txPostCode"  runat="server" ></asp:TextBox>
            <asp:TextBox ID="H_dlPostCost"  runat="server" ></asp:TextBox>
            <asp:TextBox ID="H_AddControl"  runat="server" ></asp:TextBox>
            <asp:TextBox ID="H_Dept" runat="server" Width="80px"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">郵寄批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:TextBox ID="txPostSeq" runat="server" Width="5.5em" CssClass="KeyFieldNumeric" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label ID="Label2" runat="server" CssClass="KeyField">郵寄方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlPostType" CssClass="KeyField" runat="server"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 6em">
                        <asp:Label ID="Label3" runat="server" CssClass="KeyField">郵寄日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7em">
                        <asp:TextBox ID="txPostDate" runat="server" Width="4em" CssClass="KeyUpperField DatePicker" MaxLength="7" ></asp:TextBox>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label ID="Label4" runat="server" CssClass="InputFieldLabel">郵寄時間：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:DropDownList ID="dlTime" runat="server" Height="29px" ></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <fieldset style="width: 35em">
                            <legend>新增郵寄資料</legend>
							<div class="dTDTitle" style="width: 6em">
								<asp:Label ID="Label14" runat="server">寄件類別：</asp:Label>
							</div>
							<div class="dTD">
								<asp:DropDownList ID="dlPostType_MOCS" runat="server"></asp:DropDownList>
							</div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 6em">
                                    <asp:Label ID="Label6" runat="server">公文號：</asp:Label>
                                </div>
                                <div class="dTD" style="width: 27em">
                                    <asp:TextBox ID="txIssueNo" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10" TextMode="url" Title=""  ></asp:TextBox>
                                    <asp:TextBox ID="txIssueOuId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txSelectOuId" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txSelectOuName" runat="server" CssClass="hide"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 6em">
                                    <asp:Label ID="Label7" runat="server">受文者：</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:DropDownList ID="dlIssueOrg" runat="server" Width="8.5em" Height="29px"  ></asp:DropDownList>
                                    <asp:CheckBox ID="cbAddAllIssue" runat="server" Text="一次加入全部受文者"  ></asp:CheckBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 6em">
                                    <asp:Label ID="Label15" runat="server">&nbsp;</asp:Label>
                                </div>
                                <div class="dTD" style="width: 27em">
                                    <asp:TextBox ID="txIssueOrgName" runat="server" Width="15em" CssClass="InputFieldText" MaxLength="40"  ></asp:TextBox>
                                    <asp:TextBox ID="txIssueOrgNo"  runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txPostalCode"  runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txAddress"  runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txOuId"  runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:Button ID="btAdd" runat="server" Text="新增" ></asp:Button>
                                    <asp:TextBox ID="H_IssueNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_IssueWord" runat="server" CssClass="hide"></asp:TextBox>    
                                    <asp:TextBox ID="H_SubNo" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:Button ID="btCombine" runat="server" Text="併封" ></asp:Button>
                                    <asp:Label ID="Label16" runat="server">序：</asp:Label>
                                    <asp:TextBox ID="txCombineSeq" runat="server" CssClass="InputFieldNumeric" Width="2em" ></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 6em">
                                    <asp:Label ID="Label17" runat="server">其他郵寄：</asp:Label>
                                </div>
                                <div class="dTD">
									<cc1:ComboBox Style="z-index: 0" ID="dlDept" runat="server" CssClass="comboBox" Width="7.5em"></cc1:ComboBox>&nbsp;
                                    <asp:TextBox ID="txNoneDocIssue" runat="server" Width="10em" CssClass="InputFieldText" MaxLength="40" ></asp:TextBox>
                                    <div id="DivOrgMenu1" style="position: absolute; width: 10em;"></div>
									<asp:ImageButton id="btSearchOrg" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                                    <asp:Button ID="btAdd2" runat="server" Text="新增" ></asp:Button>
                                    <asp:Button ID="btAdd3" runat="server" Text="匯入" ></asp:Button>
						            <input id="txFile" type="file" name="txFile" runat="server" class="hide" accept=".csv"/>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="dTD">
                        <fieldset style="width: 23em">
                            <legend>掛號號碼編制</legend>
                            <div class="dTR">
                                <asp:Button ID="btEdit" runat="server" Text="批次編製"  ></asp:Button>
                                <asp:Label ID="Label18" runat="server">(僅編制未設定掛號號碼者)</asp:Label>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 11.5em">
                                    <asp:Label ID="Label11" runat="server">掛號號碼使用空間：</asp:Label><br/>
                                    <asp:Button ID="btCleanEdit" runat="server" Text="清除設定"></asp:Button>
                                </div>
                                <div class="dTD">
                                    <div class="dTR">
                                        <asp:TextBox ID="txRegister1" width="3.5em" runat="server" MaxLength="6"></asp:TextBox>—
                                        <asp:TextBox ID="txRegister2" width="3.5em" runat="server" MaxLength="6"></asp:TextBox>
                                    </div>
                                    <div class="dTR">
                                        <asp:TextBox ID="txRegister3" width="3.5em" runat="server" MaxLength="6"></asp:TextBox>—
                                        <asp:TextBox ID="txRegister4" width="3.5em" runat="server" MaxLength="6"></asp:TextBox>
                                    </div>
                                    <div class="dTR">
                                        <asp:TextBox ID="txRegister5" width="3.5em" runat="server" MaxLength="6"></asp:TextBox>—
                                        <asp:TextBox ID="txRegister6" width="3.5em" runat="server" MaxLength="6"></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div class="DivTable" id="GridTable">
                    <div class="hide" id="divSelect">
                        <asp:Button ID="btSelectAll" runat="server" Text="全選"></asp:Button>
						<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
						<asp:Button ID="btSelectClear" runat="server" Text="取消" />
                        <asp:Button ID="btDgMoveUp" runat="server" Text="上移"></asp:Button>
                        <asp:Button ID="btDgMoveDown" runat="server" Text="下移"></asp:Button>
                        <asp:Button ID="btDgMoveTo" runat="server" Text="移至"></asp:Button>
                        <asp:Label ID="Label12" runat="server">第</asp:Label>
                        <asp:TextBox ID="txDgMoveTo" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2"></asp:TextBox>
                        <asp:Label ID="Label13" runat="server">筆</asp:Label>
                        <asp:Button ID="btDgDelete" runat="server" Text="刪除"></asp:Button>
					    <asp:Button ID="btBulkClear" runat="server" Text="清除掛號號碼" />
                    </div>
                    <div id="Dg1Div" class="GridDiv" style="height: 25em"  data-fixed="true">
                        <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                            <Columns>
                                <asp:TemplateColumn HeaderText="選">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbdgSelect" runat="server"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="受文者(郵遞區號)地址">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txdgOrgId" runat="server" Width="25em" CssClass="hide"></asp:TextBox>
                                        <asp:Label ID="lbdgOrgName" runat="server" Width="28em" ></asp:Label>
                                        <br>
                                        <asp:TextBox ID="txdgPostalCode" runat="server" Width="3.5em" MaxLength="6"></asp:TextBox>
                                        <asp:TextBox ID="txdgAddress" runat="server" Width="24.5em" MaxLength="200"></asp:TextBox>
                                        <asp:TextBox ID="txdgSourceType" runat="server" Width="3em" CssClass="hide"></asp:TextBox>
                                        <asp:TextBox ID="txdgOuId" runat="server" Width="24.5em" CssClass="hide"></asp:TextBox>
                                        <asp:TextBox ID="txdgDocNo" runat="server" Width="24.5em" CssClass="hide"></asp:TextBox>
                                        <asp:TextBox ID="txReturnDate" runat="server" Width="24.5em" CssClass="hide"></asp:TextBox>
                                        <asp:TextBox ID="txReturnDesc" runat="server" Width="24.5em" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="寄件類別">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgPostType" runat="server"></asp:Label>
                                        <asp:TextBox ID="txdgPostType" runat="server" Width="25em" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="內容">
                                    <ItemTemplate>
                                        <asp:Label ID="lbdgContent" runat="server"></asp:Label>
                                        <asp:TextBox ID="txdgIssueNo" runat="server" Width="25em" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="掛號號碼">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:TextBox ID="txdgBulkNo" runat="server" MaxLength="10" Width="5.5em"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                 <asp:TemplateColumn HeaderText="重量">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:TextBox ID="txdgPostWeight" runat="server" MaxLength="5" Width="3em" CssClass="InputFieldNumeric" onblur="fnGetDgPostCost();"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="郵資">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:TextBox ID="txdgPostCost" runat="server" MaxLength="8" Width="5em" onblur="fnCheckCost();" CssClass="InputFieldNumeric"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                 <asp:TemplateColumn HeaderText="註記">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:TextBox ID="txdgPostRemark" runat="server" MaxLength="60" Width="8.5em" ></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                 <asp:TemplateColumn HeaderText="併封">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Button ID="btDeatil" runat="server" Text="明細" CssClass="hide"></asp:Button>
                                        <asp:TextBox ID="txdgCombineData" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"/>
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="預覽大宗掛號單(P)" Style="display: none" AccessKey="P" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
