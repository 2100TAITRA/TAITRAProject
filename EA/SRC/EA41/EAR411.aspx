<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR411.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAR411" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR411檔案保存狀況及註記清單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="/STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAR411" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 6em; height: 6em; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanNo" TabIndex="1" runat="server" Width="4.5em" CssClass="RequireUpperField" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" Title="提示計畫批號" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
						<asp:Label ID="Label5" runat="server">庫房：</asp:Label>
                        <asp:DropDownList ID="dlStoreNo" TabIndex="6" runat="server" Width="5.5em"></asp:DropDownList>
                        <asp:TextBox ID="txFileNoSep" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">註記日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="11" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">至  </asp:Label>&nbsp;
						<asp:TextBox ID="txDateE" TabIndex="16" runat="server" Width="4em" CssClass="InputFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">檔號 (起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearS" TabIndex="30" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>－
						<asp:TextBox ID="txClsS" TabIndex="35" runat="server" Width="10.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>－
						<asp:TextBox ID="txCaseS" TabIndex="40" runat="server" Width="7em" CssClass="InputUpperFieldText" MaxLength="12"></asp:TextBox>－
						<asp:TextBox ID="txVolS" TabIndex="45" runat="server" Width="2.5em" CssClass="InputEnUpperField" MaxLength="4"></asp:TextBox>－
						<asp:TextBox ID="txSeqS" TabIndex="50" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:DropDownList ID="dlKeepStateGrp_LEN1" runat="server" CssClass="hide"></asp:DropDownList>
                        <asp:TextBox ID="txKeepNo" runat="server" Width="79px" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">檔號 (訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearE" TabIndex="55" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>－
						<asp:TextBox ID="txClsE" TabIndex="60" runat="server" Width="10.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>－
						<asp:TextBox ID="txCaseE" TabIndex="65" runat="server" Width="7em" CssClass="InputUpperFieldText" MaxLength="12"></asp:TextBox>－
						<asp:TextBox ID="txVolE" TabIndex="70" runat="server" Width="2.5em" CssClass="InputEnUpperField" MaxLength="4"></asp:TextBox>－
						<asp:TextBox ID="txSeqE" TabIndex="75" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:DropDownList ID="dlKeepStateGrp_ALL" runat="server" CssClass="hide"></asp:DropDownList>
                        <asp:TextBox ID="txIsDestroy" runat="server" Width="79px" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server">　櫥位號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txStockNoS" TabIndex="76" runat="server" Width="6em" CssClass="InputEnUpperField" MaxLength="11"></asp:TextBox>
                        <asp:Label ID="Label19" runat="server">－</asp:Label>
                        <asp:TextBox ID="txStockNoE" TabIndex="77" runat="server" Width="6em" CssClass="InputEnUpperField" MaxLength="11"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:RadioButton ID="rbNowState" TabIndex="78" runat="server" Width="105px" Text="檔案現況為" GroupName="rb" Checked="True"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR" id="MainTable1">
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:RadioButton ID="rbSignState" TabIndex="82" runat="server" Text="註記內容含" GroupName="rb"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR" id="MainTable2">
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label9" runat="server"> 排序方式：</asp:Label>
                        <asp:RadioButton ID="rbByFileNo" TabIndex="104" runat="server" Text="依檔號" GroupName="rb1" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbBySignType" TabIndex="105" runat="server" Text="依註記種類" GroupName="rb1"></asp:RadioButton>
                        <asp:RadioButton ID="rbORDER_STOCK" TabIndex="105" runat="server" GroupName="rb1" Text="依櫥位號"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label7" runat="server"> 跳頁方式：</asp:Label>
                        <asp:RadioButton ID="rb31" TabIndex="110" runat="server" Text="依案次號" GroupName="rb2" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rb32" TabIndex="112" runat="server" Text="依註記種類" GroupName="rb2"></asp:RadioButton>
                        <asp:RadioButton ID="rbGROUP_STOCK" TabIndex="112" runat="server" GroupName="rb2" Text="依櫥位號"></asp:RadioButton>
                        <asp:RadioButton ID="rb33" TabIndex="114" runat="server" Text="不跳頁" GroupName="rb2"></asp:RadioButton>
                    </div>
                </div>
            </div>

            <div class="DivTable">
                <div class="GridDiv" style="height: 14.5em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文(編)號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="註記日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbMarkDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔案現況/註記內容">
                                <ItemTemplate>
                                    <asp:Label ID="lbKeepDesp" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbKeepRemark" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案由">
                                <ItemTemplate>
                                    <asp:Label ID="lbCase" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>

        <asp:ValidationSummary ID="Validationsummary2" runat="server" CssClass="hidden" DESIGNTIMEDRAGDROP="1482"></asp:ValidationSummary>
        <asp:CustomValidator ID="Customvalidator1" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:CustomValidator>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="搜尋" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="列印" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
