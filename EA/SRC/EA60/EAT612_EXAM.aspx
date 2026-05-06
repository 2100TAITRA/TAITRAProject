<%@ Page Language="c#" CodeBehind="EAT612_EXAM.aspx.cs" AutoEventWireup="false" Inherits="EA60.EAT612_EXAM" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT612_EXAM 移轉鑑定結果註記作業</title>
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
    <form id="EAT612_EXAM" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox><asp:TextBox ID="txPlanType" runat="server"></asp:TextBox>
            <asp:TextBox ID="h_OrgName" runat="server"></asp:TextBox>
            <asp:TextBox ID="SourceNo" runat="server"></asp:TextBox>
            <asp:TextBox ID="txSaveInfo" runat="server" TextMode="MultiLine"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">移轉批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 9.5em">
                        <asp:TextBox ID="txPlanNo" TabIndex="1" runat="server" Width="4.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="-1" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示移轉批號"></asp:ImageButton>
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
                        <asp:DropDownList ID="dlAdvis" runat="server" Width="8em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label11" runat="server">檔號範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileNoSep" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="txFileRange" TabIndex="-1" runat="server" Width="16.5em" CssClass="DisplayOnly" MaxLength="8"></asp:TextBox>
                    </div>
                </div>
                <fieldset style="width: 40em; height: 9.5em">
                    <legend>鑑定結果登錄</legend>
                    <div id="Table2" class="DivTable">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 4.5em">
                                <span id="Label199">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                            <div class="dTD" style="width: 4em">
                                <span id="laFileYear" class="RequireField" style="font-size: MEDIUM;">年度號</span>
                            </div>
                            <div class="dTD" style="width: 12em">
                                <span id="laFileCls" class="RequireField" style="font-size: MEDIUM;">分類號</span>
                            </div>
                            <div class="dTD" style="width: 8.5em">
                                <span id="laFileCase" class="RequireField" style="font-size: MEDIUM;">案次號(起)</span>
                            </div>
                            <div class="dTD" style="width: 8.5em">
                                <span id="laFileVol" class="RequireField" style="font-size: MEDIUM;">案次號(迄)</span>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 4.5em">
                                <asp:Label ID="Label5" runat="server">檔號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txYearS" TabIndex="5" CssClass="InputFieldNumeric" runat="server" Width="2em" MaxLength="3" ToolTip="年號(3)"></asp:TextBox>－
								<asp:TextBox ID="txClsS" TabIndex="6" CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20" ToolTip="分類號20)"></asp:TextBox>－
								<asp:TextBox ID="txCaseS" TabIndex="7" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12" ToolTip="案次號(12)"></asp:TextBox>－
                                <asp:TextBox ID="txCaseE" TabIndex="8" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12" ToolTip="案次號(12)"></asp:TextBox>
                                <asp:Button ID="btSet" TabIndex="19" runat="server" Text="登錄"></asp:Button>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:RadioButton ID="rbNotTran"  runat="server" Width="6em" Text="不移轉：" GroupName="g1"></asp:RadioButton></div>
                            <div class="dTD" style="width: 30.5em">
                                <asp:RadioButton ID="rbNotTran1"  runat="server" Width="6em" Text="機關定期保存，調整後保存年限：" GroupName="g2"></asp:RadioButton>
                                <asp:TextBox ID="txNewKeepYear" TabIndex="9" CssClass="InputFieldNumeric" runat="server" Width="1.5em" MaxLength="2"></asp:TextBox>
                            </div>
                            <div class="dTDTitle" style="width: 5.5em">&nbsp;&nbsp;&nbsp;</div>
                            <div class="dTD" style="width: 30.5em">
                                <asp:RadioButton ID="rbNotTran2" TabIndex="10" runat="server" Width="8.5em" Text="機關永久保存" GroupName="g2"></asp:RadioButton>
                            </div>
                            <div class="dTDTitle" style="width: 5.5em">
                                <asp:RadioButton ID="rbTran"  runat="server" Width="6em" Text="移轉：" GroupName="g1"></asp:RadioButton></div>
                            <div class="dTD" style="width: 30.5em">
                                <asp:Label ID="Label1" runat="server">列為國家檔案</asp:Label>
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
                            <asp:Button ID="btDeleteCase" runat="server" CssClass="hide" Text="刪除" />
                            <asp:Button ID="btSetPatch" runat="server" Text="批次設定" />
                        </asp:Panel>
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
                            <asp:TemplateColumn HeaderText="案號">
                                <HeaderStyle HorizontalAlign="Center" Width="9em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Left" Width="9em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbFileNo" runat="server" Width="12em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案名">
                                <HeaderStyle Width="20em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbCASE_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="鑑定結果">
                                <HeaderStyle HorizontalAlign="Center" Width="12.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="12.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbAdvis" runat="server" Width="12.5em"></asp:Label>
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
            <asp:Button ID="btSave" runat="server" Text="儲存(S)" AccessKey="S" Title="更新註記(ALT+S)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button runat="server" Style="display: none" Text="匯出鑑定結果Excel(E)" AccessKey="E" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
