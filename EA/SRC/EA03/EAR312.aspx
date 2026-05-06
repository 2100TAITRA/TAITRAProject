<%@ Page Language="c#" CodeBehind="EAR312.aspx.cs" AutoEventWireup="false" Inherits="EA03.EAR312" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR312 調案回條列印作業</title>
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
    <form id="EAR312" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="txSearch" runat="server" Width="77px" MaxLength="1"></asp:TextBox><asp:TextBox ID="empUserId" runat="server" Width="77px" MaxLength="1"></asp:TextBox><asp:TextBox ID="empUserInfo2" runat="server" Width="77px" MaxLength="1"></asp:TextBox><asp:TextBox ID="empUserIndex" runat="server" Width="77px" MaxLength="1"></asp:TextBox><asp:TextBox ID="empUserLength" runat="server" Width="77px" MaxLength="1"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label10" runat="server">調案單號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBorNoS" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btBorNoS" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>～
						<asp:TextBox ID="txBorNoE" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btBorNoE" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" Width="7.5em">調案核可日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>～
						<asp:TextBox ID="txDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDOC_NOS" CssClass="InputUpperFieldText" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label14" runat="server">～</asp:Label>
                        <asp:TextBox ID="txDOC_NOE" CssClass="InputUpperFieldText" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">檔號(起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYEAR" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">(年度) －</asp:Label>
                        <asp:TextBox ID="txCLS" CssClass="InputUpperFieldText" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btCls" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label16" runat="server">(分類) －</asp:Label>
                        <asp:TextBox ID="txCASE" CssClass="InputUpperFieldText" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                        <asp:ImageButton ID="btCase" TabIndex="-1" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label17" runat="server">(案次) －</asp:Label>
                        <asp:TextBox ID="txVOL" runat="server" Width="2.5em" CssClass="InputFieldNumeric" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label18" runat="server">－</asp:Label>
                        <asp:TextBox ID="txSEQ" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label15" runat="server">調案單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDEPT" runat="server" Width="6.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server">調案人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUser" runat="server" Width="5.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label25" runat="server" Width="99px">調案方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlBorType" runat="server" Width="5.5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">檔案原件</asp:ListItem>
                            <asp:ListItem Value="2">線上調檔</asp:ListItem>
                            <asp:ListItem Value="3">檔案複製品</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server" Width="99px">報表格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbCase" runat="server" Text="線上調檔回條" GroupName="gp" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbVol" runat="server" Text="紙本調檔回條" GroupName="gp"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                    <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                    <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                    <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                </asp:Panel>
                <asp:TextBox ID="empUserInfo" runat="server" Width="37em" CssClass="hide">0</asp:TextBox>
                <div class="GridDiv">
                    <asp:DataGrid Style="z-index: 0" ID="dg1" runat="server" PageSize="30" AutoGenerateColumns="FALSE" GridLines="Vertical" CellPadding="0">
                        <Columns>
                            <asp:TemplateColumn HeaderText="選">
                                <HeaderStyle Width="1.5em"></HeaderStyle>
                                <ItemStyle Width="1.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="序">
                                <HeaderStyle Width="1.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Right" Width="1.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案單號">
                                <HeaderStyle HorizontalAlign="Center" Width="5.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="5.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbBor_No" runat="server"></asp:Label>
                                    <asp:TextBox ID="txBor_No_H" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案&lt;br&gt;核可日期">
                                <HeaderStyle HorizontalAlign="Center" Width="70px"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="70px"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbBor_Date" runat="server"></asp:Label>
                                    <asp:TextBox ID="txBor_Date_H" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文(編)號／檔號">
                                <HeaderStyle Width="300px"></HeaderStyle>
                                <ItemStyle Width="300px"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbDoc_No" runat="server"></asp:Label>
                                    <asp:TextBox ID="txDoc_No_H" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="txFile_No_H" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案單位/人">
                                <HeaderStyle Width="7.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="7.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbDept" runat="server"></asp:Label>
                                    <asp:TextBox ID="txDept_H" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="調案方式">
                                <HeaderStyle Width="6.5em"></HeaderStyle>
                                <ItemStyle HorizontalAlign="Center" Width="6.5em"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbBor_Type" runat="server"></asp:Label>
                                    <asp:TextBox ID="txBor_Type_H" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
