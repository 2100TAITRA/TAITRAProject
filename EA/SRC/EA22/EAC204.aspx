<%@ Page Language="c#" CodeBehind="EAC204.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAC204" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>EAC204 待編目案卷查詢視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAC204" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericChild.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_ClsKeyS" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_ClsKeyE" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            <asp:TextBox ID="H_VerNo" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR" id="MOCSINFO">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="lbFileType" runat="server">檔案種類：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrg" runat="server" Text="機關檔" GroupName="rbSystemType" ></asp:RadioButton>
                        <asp:RadioButton ID="rbPer" runat="server" Text="個人檔" GroupName="rbSystemType" ></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label18" runat="server">1.案號條件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label1" runat="server">版 本 別：</asp:Label>
                        <asp:TextBox ID="txVerNo" runat="server" Width="3em" MaxLength="3"></asp:TextBox>
                        <asp:TextBox ID="txPerYear" runat="server" Width="3em" MaxLength="3"></asp:TextBox>
                        <br>
                        <asp:Label ID="Label19" runat="server">檔號(起)：</asp:Label>
                        <asp:TextBox ID="txFileYearS" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label22" runat="server">(年度)</asp:Label>
                        <asp:Label ID="Label23" runat="server">－</asp:Label>
                        <asp:TextBox ID="txFileClsS" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label24" runat="server">(分類)</asp:Label>
                        <asp:Label ID="Label25" runat="server">－</asp:Label>
                        <asp:TextBox ID="txFileCaseS" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                        <asp:Label ID="Label26" runat="server">(案次)</asp:Label><br>
                        <asp:Label ID="Label17" runat="server">檔號(迄)：</asp:Label>
                        <asp:TextBox ID="txFileYearE" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label27" runat="server">(年度)</asp:Label>
                        <asp:Label ID="Label28" runat="server">－</asp:Label>
                        <asp:TextBox ID="txFileClsE" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:Label ID="Label29" runat="server">(分類)</asp:Label>
                        <asp:Label ID="Label30" runat="server">－</asp:Label>
                        <asp:TextBox ID="txFileCaseE" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                        <asp:Label ID="Label31" runat="server">(案次)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label6" runat="server">2.其他條件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label4" runat="server">最近</asp:Label>
                        <asp:TextBox ID="txNum" runat="server" Width="1.5em" CssClass="InputFieldNumeric" MaxLength="2"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">月未續為辦理或新增案件</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label5" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbINPFILE_DATE" runat="server" Text="含已編目案卷" Checked="false"></asp:CheckBox>
                        <asp:CheckBox ID="cbBefore95" runat="server" Text="含95年以前檔案"></asp:CheckBox>
                        <asp:CheckBox ID="cbWithSec" runat="server" Text="含密件"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR" id="dlMgr">
                    <div class="dTDTitle" style="width: 11.5em">
                        <asp:Label ID="Label7" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbMgr" runat="server">歸檔人員：</asp:Label>
                        <asp:DropDownList ID="dlMgrUser" runat="server" Width="8.5em" Rows="10"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <asp:Panel ID="tbSelect" runat="server" EnableViewState="False">
                        <br>
                        <asp:Button Text="清除選取(C)" runat="server" ID="btSelectClear" AccessKey="C" ToolTip="清除勾選所有的CheckBox"></asp:Button>
                        <asp:Button Text="全部選取(A)" runat="server" ID="btSelectAll" AccessKey="A" ToolTip="勾選所有的CheckBox"></asp:Button>
                        <asp:Button Text="反向選取(N)" runat="server" ID="btSelectInverse" AccessKey="N" ToolTip="反向勾選所有的CheckBox"></asp:Button><br>
                    </asp:Panel>
                </div>
                <div class="GridDiv" style="height: 20.5em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server" Checked="True"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileCase" Style="overflow: hidden" runat="server" Width="150px" CssClass="PopUp"></asp:Label>
                                    <asp:Label ID="lbClsKey" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="h_FileNum" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="h_DocNum" runat="server" CssClass="hide"></asp:Label>
                                    <asp:Label ID="h_lbKeepYear" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案名">
                                <ItemTemplate>
                                    <asp:Label Style="overflow: hidden" ID="lbCaseName" runat="server" Width="280px" CssClass="PopUp" Height="20px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="最後文件產生日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbUpdDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button Text="查詢(F)" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch" AccessKey="F" ToolTip="查詢(ALT+F)"></asp:Button>
            <asp:Button Text="確定(S)" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btSave" AccessKey="S" ToolTip="確定(ALT+S)"></asp:Button>
            <asp:Button Text="關閉(X)" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btExit" AccessKey="X" ToolTip="關閉(ALT+)"></asp:Button>
            <asp:Button Text="預覽" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" AccessKey="O" Title="匯出EXCEL(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" AccessKey="C" Title="匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
