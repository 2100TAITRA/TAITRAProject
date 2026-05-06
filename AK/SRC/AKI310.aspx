<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKI310.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI310" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKI310 另存附件查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="AKI310" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 6.5em; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label1" runat="server">另存附件條碼號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_UPPERCASE()" ID="txRemarkS" TabIndex="10" runat="server" Width="6em" MaxLength="30">092001</asp:TextBox>－
							<asp:TextBox onkeypress="jf_UPPERCASE()" ID="txRemarkE" TabIndex="20" runat="server" Width="6em" MaxLength="30">090000001</asp:TextBox>
                        <asp:Button ID="btAddRemark" TabIndex="-1" runat="server" Text="加入"></asp:Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<asp:TextBox ID="htxClsKey" runat="server" CssClass="hide" Width="1em"></asp:TextBox>
                        <asp:TextBox ID="htxCaseKey" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label4" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeypress="jf_UPPERCASE()" ID="txDocNoS" TabIndex="30" runat="server" Width="5.5em" MaxLength="15">090000001</asp:TextBox>－
								<asp:TextBox onkeypress="jf_UPPERCASE()" ID="txDocNoE" TabIndex="40" runat="server" Width="5.5em" MaxLength="15">090000001</asp:TextBox>
                        <asp:Button ID="btAddDocNo" TabIndex="-1" runat="server" Text="加入"></asp:Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<asp:TextBox ID="htxClsKey2" runat="server" CssClass="hide" Width="1em"></asp:TextBox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<asp:TextBox ID="htxCaseKey2" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_txDocWidth" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label7" runat="server">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txVerNo" TabIndex="30" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server">檔號(起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txFileYearS" TabIndex="41" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
								<asp:TextBox ID="txFileClsS" TabIndex="42" runat="server" Width="10.5em" MaxLength="20" ></asp:TextBox>－
								<asp:TextBox ID="txFileCaseS" TabIndex="43" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                <asp:TextBox ID="txCountryNoS" TabIndex="43" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txDivisionNoS" TabIndex="43" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txProductNoS" TabIndex="43" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox>－
								<asp:TextBox onkeypress="jf_UPPERCASE();" class="InputEnOnlyUpperField" ID="txFileVolS" TabIndex="44" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>－
								<asp:TextBox onkeypress="jf_UPPERCASE();" class="InputEnOnlyUpperField" ID="txFileSeqS" TabIndex="45" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label6" runat="server">檔號(訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txFileYearE" TabIndex="55" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
								<asp:TextBox ID="txFileClsE" TabIndex="60" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>－
								<asp:TextBox ID="txFileCaseE" TabIndex="65" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                <asp:TextBox ID="txCountryNoE" TabIndex="65" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txDivisionNoE" TabIndex="65" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox><asp:TextBox ID="txProductNoE" TabIndex="65" runat="server" Width="2em" MaxLength="3" CssClass="hide"></asp:TextBox>－
								<asp:TextBox onkeypress="jf_UPPERCASE();" class="InputEnOnlyUpperField" ID="txFileVolE" TabIndex="70" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>－
								<asp:TextBox onkeypress="jf_UPPERCASE();" class="InputEnOnlyUpperField" ID="txFileSeqE" TabIndex="75" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Button ID="btAddFileNo" TabIndex="-1" runat="server" Text="加入"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label9" runat="server">點收日期：</asp:Label>
                    </div>
                   <div class="dTD" style="width: 46em" id="inline_content">
                        <asp:TextBox ID="txDATES" TabIndex="130" onkeypress="jf_UPPERCASE();" runat="server"
							Width="4em"  MaxLength="7" CssClass="DatePicker" data-CN="日期(起)"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server"> －</asp:Label>
                        <asp:TextBox ID="txDATEE" TabIndex="140" onkeypress="jf_UPPERCASE();" runat="server"
							Width="4em"  MaxLength="7" CssClass="DatePicker" data-CN="日期(訖)"></asp:TextBox>
                    </div>
                </div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 9.5em"><asp:label id="Label10" runat="server">承辦單位：</asp:label></div>
					<div class="dTD"><asp:dropdownlist id="dlDept" tabIndex="20" runat="server" Width="12em"></asp:dropdownlist></div>
				</div>
                 <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label36" runat="server">結案種類：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <div class="dTD">
                            <asp:dropdownlist id="dlClose" tabIndex="20" runat="server" Width="5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">存查</asp:ListItem>
                            <asp:ListItem Value="2">發文</asp:ListItem>
                            </asp:dropdownlist>
                        </div>
                    </div>
						<div class="dTDTitle" style="width: 13.5em">
                        <asp:Label ID="Label37" runat="server">編目狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <div class="dTD">
                            <asp:dropdownlist id="dlInpfile" tabIndex="20" runat="server" Width="5em">
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">已編目</asp:ListItem>
                            <asp:ListItem Value="2">未編目</asp:ListItem>
                            </asp:dropdownlist>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label8" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txKeepYearS" TabIndex="80" runat="server" Width="2em" MaxLength="4"></asp:TextBox>－
							<asp:TextBox CssClass="InputFieldNumeric" ID="txKeepYearE" TabIndex="85" runat="server" Width="2em" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDocNo" runat="server" Text="依公文文號" GroupName="grp1"></asp:RadioButton>
                        <asp:RadioButton ID="rbFileNo" runat="server" Text="依檔號" GroupName="grp1"></asp:RadioButton>
                        <asp:RadioButton ID="rbRemark" runat="server" Text="依另存附件編號" GroupName="grp1"></asp:RadioButton>
                        <asp:RadioButton ID="rbKeepYear" runat="server" Text="依保存年限" GroupName="grp1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="lbType" runat="server">另存標籤格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbType22" runat="server" Text="2x2" GroupName="type1"></asp:RadioButton>
                        <asp:RadioButton ID="rbType23" runat="server" Text="2x3" GroupName="type1"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 13.5em">
                        <asp:Label ID="Label5" runat="server"> 附件另存標籤列印起始位址：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txStartPos" TabIndex="80" runat="server" Width="32px" MaxLength="1"></asp:TextBox>
                        <asp:TextBox ID="H_txShowDg" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_txDocList" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_txLeftDocList" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
                        <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                        <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                        <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                        <asp:Button ID="btDeleteSelect" runat="server" Text="刪除" />
                    </asp:Panel>
                </div>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="另存附件條碼號">
                                <ItemTemplate>
                                    <asp:Label ID="lbRemark" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="另存附件儲位">
                                <ItemTemplate>
                                    <asp:Label ID="lbAttLocation" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFileNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="序號" Visible="false" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server" Visible="false"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" AccessKey="O" Title="匯出Excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreviewAttTag" runat="server" Text="列印附件另存標籤" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreviewDetail" runat="server" Text="附件另存清單" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
