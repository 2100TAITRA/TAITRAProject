<%@ Page Language="c#" CodeBehind="EAR603.aspx.cs" AutoEventWireup="false" Inherits="EA60.EAR603" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR603移轉審核註記清單列印</title>
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
    <form id="EAR603" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label2" TabIndex="-1" runat="server">清理批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 6.5em">
                        <asp:TextBox class="RequireField" ID="txPlanNo" TabIndex="10" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="15" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" TabIndex="-1" runat="server">計畫說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" TabIndex="-1" runat="server" Width="10em" CssClass="TextLabel" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" TabIndex="-1" runat="server">檔號(起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txYearS" TabIndex="20" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txClsS" TabIndex="30" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txCaseS" TabIndex="40" runat="server" Width="7em" MaxLength="12"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txVolS" TabIndex="50" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>－
						<asp:TextBox CssClass="InputFieldNumeric" ID="txSeqS" TabIndex="60" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" TabIndex="-1" runat="server">檔號(迄)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txYearE" TabIndex="70" runat="server" Width="2em" MaxLength="3"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txClsE" TabIndex="80" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txCaseE" TabIndex="90" runat="server" Width="7em" MaxLength="12"></asp:TextBox>－
						<asp:TextBox CssClass="InputUpperFieldText" ID="txVolE" TabIndex="100" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>－
						<asp:TextBox CssClass="InputFieldNumeric" ID="txSeqE" TabIndex="110" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server">櫥位號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="InputUpperFieldText" ID="txStockNoS" TabIndex="111" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
                        <asp:Label ID="Label19" runat="server">－</asp:Label>
                        <asp:TextBox CssClass="InputUpperFieldText" ID="txStockNoE" TabIndex="112" runat="server" Width="6.5em" MaxLength="11"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" TabIndex="-1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" TabIndex="113" runat="server" CssClass="comboBox" Width="8.5em" Rows="10"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">意見來源：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlADVISE_BY" TabIndex="115" runat="server" Width="11.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <fieldset style="width: 9.5em; height: 5.5em">
                            <legend>審查意見註記</legend>
                            <div id="Table1" class="DivTable">
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:CheckBox ID="cb1" TabIndex="140" runat="server" Text="不移轉"></asp:CheckBox>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:CheckBox ID="cb2" TabIndex="150" runat="server" Text="延長移轉期限"></asp:CheckBox>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="dTD">
                        <fieldset style="width: 8.5em; height: 5.5em">
                            <legend>報表格式</legend>
                            <div id="Table2" class="DivTable">
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rb1" TabIndex="160" runat="server" Text="案件" GroupName="gp" Checked="True"></asp:RadioButton>
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rb2" TabIndex="170" runat="server" Text="案卷" GroupName="gp"></asp:RadioButton>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="dTD">
                        <fieldset style="width: 12.5em; height: 5.5em">
                            <legend>排序方式</legend>
                            <div id="Table3" class="DivTable">
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rb3" TabIndex="180" runat="server" Width="6.5em" Text="以檔號" GroupName="gp2" Checked="True"></asp:RadioButton>
                                    </div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rb4" TabIndex="190" runat="server" Text="以審查意見" GroupName="gp2"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 0.5em">&nbsp;&nbsp;</div>
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbORDER_STOCK" TabIndex="190" runat="server" Text="以櫥位號" GroupName="gp2"></asp:RadioButton>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
