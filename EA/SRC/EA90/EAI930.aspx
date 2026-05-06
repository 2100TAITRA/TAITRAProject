<%@ Page Language="c#" CodeBehind="EAI930.aspx.cs" AutoEventWireup="false" Inherits="EA90.EAI930" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAI930 檔案稽核記錄查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAI930" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:ListBox ID="SubWinRtn" runat="server" Width="44px" Height="34px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 27em">
                        <asp:TextBox ID="txDocNo" TabIndex="0" runat="server" Width="5.5em" MaxLength="10" CssClass="InputUpperFieldText"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" Width="5.5em">異動日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFrom" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelpFrom" TabIndex="-1" runat="server" CssClass="hide" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
						<asp:Label ID="Label6" runat="server" Width="1.5em">─</asp:Label>
                        <asp:TextBox ID="txTo" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelpTo" TabIndex="-1" runat="server" CssClass="hide" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">檔號(起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbYEAR" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label10" runat="server">(年度) －</asp:Label>
                        <asp:TextBox CssClass="InputUpperFieldText" ID="tbCLS" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btCls" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label9" runat="server">(分類) －</asp:Label>
                        <asp:TextBox CssClass="InputUpperFieldText" ID="tbCASE" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btClass" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label7" runat="server">(案次) －</asp:Label>
                        <asp:TextBox ID="tbVOL" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label16" runat="server">(卷次號) －</asp:Label>
                        <asp:TextBox ID="tbSEQ" onblur="PADZERO(tbSEQ,3);" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">(目次號)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label11" runat="server">檔號(迄)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txEYear" onblur="PADZERO(txEYear,3);" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label15" runat="server">(年度) －</asp:Label>
                        <asp:TextBox CssClass="InputUpperFieldText" ID="txECLS" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btECls" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label14" runat="server">(分類) －</asp:Label>
                        <asp:TextBox CssClass="InputUpperFieldText" ID="txECase" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btECase" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label12" runat="server">(案次) －</asp:Label>
                        <asp:TextBox ID="txEVol" onblur="PADZERO(txEVol,4);" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label19" runat="server">(卷次號) －</asp:Label>
                        <asp:TextBox ID="txESeq" onblur="PADZERO(txESeq,3);" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label13" runat="server">(目次號)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">作業項目：</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" Width="5.5em"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="ck2" TabIndex="160" runat="server" Width="6.5em" Text="詮釋資料異動"></asp:CheckBox>
                        <asp:CheckBox ID="ck3" TabIndex="170" runat="server" Width="6.5em" Text="使用權限異動"></asp:CheckBox>
                        <asp:CheckBox ID="ck4" TabIndex="180" runat="server" Width="8.5em" Text="數位內容檔案異動"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server" Width="5.5em"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="ckPrint" TabIndex="180" runat="server" Width="8.5em" Text="數位內容列印紀錄"></asp:CheckBox>
                        <asp:CheckBox ID="ckSaveAs" TabIndex="180" runat="server" Width="8.5em" Text="數位內容另存紀錄"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label17" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="or1" TabIndex="210" runat="server" Text="依公文文號" GroupName="rb"></asp:RadioButton>
                        <asp:RadioButton ID="or2" TabIndex="220" runat="server" Text="依檔號" GroupName="rb"></asp:RadioButton>
                        <asp:RadioButton ID="or3" TabIndex="230" runat="server" Text="依異動日期" GroupName="rb"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" CssClass="" runat="server" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False" PageSize="50">
                        <Columns>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" Width="5.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileNo" runat="server" Width="10.5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異動日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbEntryDate" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="作業項目">
                                <ItemTemplate>
                                    <asp:Label ID="lbTxCode" runat="server" Width="8em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異動者">
                                <ItemTemplate>
                                    <asp:Label ID="lbEntryUser" runat="server" Width="5em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="異動內容">
                                <ItemTemplate>
                                    <asp:Label ID="lbTxDesc" runat="server" Width="10em"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDS" runat="server" Text="數位內容檔案異動統計表(V)" AccessKey="V" Title="數位內容檔案異動統計表(ALT+V)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPS" runat="server" Text="詮釋資料異動統計表(C)" AccessKey="C" Title="詮釋資料異動統計表(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
