<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR705.aspx.cs" AutoEventWireup="false" Inherits="EA70.EAR705" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR705 歸檔密件公文查詢列印作業</title>
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
    <form id="EAR705" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_OrgNickName" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label25" runat="server" Visible="false">年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileYearS" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3" Visible="false"></asp:TextBox>
                        <asp:Label ID="Label26" runat="server" CssClass="InputFieldText" Visible="false">－</asp:Label>
                        <asp:TextBox ID="txFileYearE" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3" Visible="false"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">文(編)號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDOC_NOS" runat="server" Width="5.5em" CssClass="InputEnUpperField" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">－</asp:Label>
                        <asp:TextBox ID="txDOC_NOE" runat="server" Width="5.5em" CssClass="InputEnUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label28" runat="server" Height="11px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3.75em">
                        <asp:Label ID="laFileYear" runat="server" Font-Size="X-Small">年度號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 13.75em">
                        <asp:Label ID="laFileCls" runat="server" Font-Size="X-Small">分類號</asp:Label>
                    </div>
                    <div class="dTD" id="dCaseSize" style="width: 10.25em">
                        <asp:Label ID="laFileCase" runat="server" Font-Size="X-Small">案次號</asp:Label>
                        <asp:Label ID="laFileCaseTAITRA" runat="server" Font-Size="X-Small" CssClass="hide">國別&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;處別&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;細目號/產品別</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.25em">
                        <asp:Label ID="laFileVol" runat="server" Font-Size="X-Small">卷次號</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5em">
                        <asp:Label ID="lbSeq" runat="server" Font-Size="X-Small">目次號</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">檔　　號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" TabIndex="0" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server">－</asp:Label>
                        <asp:TextBox ID="txCls" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                        <asp:ImageButton ID="btHelpCls" runat="server" Visible="true" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label18" runat="server">－</asp:Label>
                        <asp:TextBox ID="txCase" TabIndex="0" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                        <asp:TextBox ID="txCountryNo"  TabIndex="0"  runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:ImageButton ID="btHelpCountry" runat="server" CssClass="hide" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton><asp:TextBox ID="txDivisionNo"  TabIndex="0"  runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txProductNo"  TabIndex="0"  runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:ImageButton ID="btHelpProduct" runat="server" CssClass="hide" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:ImageButton ID="btHelpCase" runat="server" Visible="true" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:Label ID="Label20" runat="server">－</asp:Label>
                        <asp:TextBox ID="txVol" TabIndex="0" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label21" runat="server">－</asp:Label>
                        <asp:TextBox ID="txSeq" TabIndex="0" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbSubject" runat="server" Visible="false">案由：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" TabIndex="0" runat="server" Width="30.5em" Visible="false" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label13" runat="server" Visible="false">簡要案由：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txbriefsubject" TabIndex="0" runat="server" Width="30.5em" Visible="false" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label Style="z-index: 0" ID="Label24" runat="server">庫房別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlStoreNo" runat="server" Width="8.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">密件流水號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSEC_SEQS" TabIndex="0" runat="server" Width="5em" MaxLength="9"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">－</asp:Label>
                        <asp:TextBox ID="txSEC_SEQE" TabIndex="0" runat="server" Width="5em" MaxLength="9"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">應解密日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRMVSEC_DATES" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">－</asp:Label>
                        <asp:TextBox ID="txRMVSEC_DATEE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label9" runat="server">點收日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txACP_DATES" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label14" runat="server">－</asp:Label>
                        <asp:TextBox ID="txACP_DATEE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label10" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCLOSE_DATES" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label15" runat="server">－</asp:Label>
                        <asp:TextBox ID="txCLOSE_DATEE" TabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label11" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 24em">
                        <cc1:ComboBox ID="dlDept" TabIndex="40" runat="server" CssClass="comboBox" Width="9.5em" Rows="10"></cc1:ComboBox>&nbsp;&nbsp;&nbsp;&nbsp;
                        <cc1:ComboBox ID="dlSect" TabIndex="40" runat="server" CssClass="comboBox" Width="9.5em" Rows="10"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label12" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="40" runat="server" CssClass="comboBox" Width="7em" Rows="10"></cc1:ComboBox>
                        <asp:TextBox ID="empUserId" CssClass="hide" runat="server"></asp:TextBox>
                        <asp:TextBox ID="txDL" CssClass="hide" runat="server"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label27" runat="server" CssClass="InputFieldLabel" Visible="false">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbFileYear" runat="server" Text="依年度" GroupName="SortBy" Visible="false"></asp:RadioButton>
                        <asp:RadioButton ID="rbSecSeq" runat="server" Text="依密件流水號" GroupName="SortBy" Visible="false"></asp:RadioButton>
                        <asp:RadioButton ID="rbDept" runat="server" Text="依承辦單位" GroupName="SortBy" Visible="false"></asp:RadioButton>
                        <asp:RadioButton ID="rbDocno" runat="server" Text="文(編)號" GroupName="SortBy" Visible="false"></asp:RadioButton>
						<asp:RadioButton ID="rbFileNo" runat="server" Text="檔號" GroupName="SortBy" Visible="false"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div id="GridTable" class="DivTable">
                <div class="GridDiv" style="width: 60em; height: 12.5em; overflow: auto; word-break: break-all">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="文(編)號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDOC_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="密件流水號&lt;BR&gt;發文字號">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEC_SEQ" runat="server"></asp:Label>
                                    <asp:Label ID="lbISSUE_NO" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROM_SUBJECT" runat="server"></asp:Label><br/>
                                    <asp:Label ID="lbbriefSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFILENO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位&lt;BR&gt;承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbEMP_NAME" runat="server"></asp:Label>
                                    <asp:Label ID="lbDEPT_NAME" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關">
                                <ItemTemplate>
                                    <asp:Label ID="lbFROMORG_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="應解密日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbEXTRMVSEC_DATE" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="庫房別">
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
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" AccessKey="O" Title="匯出Excel(O)" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
