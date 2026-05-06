<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR220.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAR220" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR220 案卷標籤及封面列印作業</title>
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
    <form id="EAR220" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" TabIndex="5" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">年度號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileYear" TabIndex="10" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">分類號(起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCls1" TabIndex="15" runat="server" Width="10.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>
                        <asp:TextBox ID="lbFileCls1" TabIndex="-1" runat="server" Width="15.5em" CssClass="TextLabel InputUpperFieldText" MaxLength="20" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
						<asp:TextBox ID="h_txFileClsKey1" TabIndex="15" runat="server"  CssClass="hide" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label9" runat="server">分類號(訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCls2" TabIndex="20" runat="server" Width="10.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>
                        <asp:TextBox ID="lbFileCls2" TabIndex="-1" runat="server" Width="15.5em" CssClass="TextLabel InputUpperFieldText" MaxLength="20" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
						<asp:TextBox ID="h_txFileClsKey2" TabIndex="15" runat="server"  CssClass="hide" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">案次號(起)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCase1" TabIndex="25" runat="server" Width="7em" CssClass="InputUpperFieldText" MaxLength="12"></asp:TextBox>
                        <asp:TextBox ID="lbFileCase1" TabIndex="-1" runat="server" Width="15.5em" CssClass="TextLabel InputUpperFieldText" MaxLength="20" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">案次號(訖)：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCase2" TabIndex="30" runat="server" Width="7em" CssClass="InputUpperFieldText" MaxLength="12"></asp:TextBox>
                        <asp:TextBox ID="lbFileCase2" TabIndex="-1" runat="server" Width="15.5em" CssClass="TextLabel InputUpperFieldText" MaxLength="20" ForeColor="Navy" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">卷次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileVol1" TabIndex="35" runat="server" Width="2.5em" CssClass="InputUpperFieldText" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">－</asp:Label>
                        <asp:TextBox ID="txFileVol2" TabIndex="40" runat="server" Width="2.5em" CssClass="InputUpperFieldText" MaxLength="4"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label6" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" runat="server" Width="10.5em" TabIndex="45" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <fieldset style="width: 13.5em; height: 6em">
                            <legend>列印報表</legend>
                            <div class="divTable" id="Table1">
                                <div class="dTR">
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbL" runat="server" GroupName="gRptType" Text="案卷標籤　起始位置：" TabIndex="50"></asp:RadioButton>
                                        <asp:TextBox ID="txPos" TabIndex="55" runat="server" CssClass="InputFieldNumeric" Width="1.5em" MaxLength="2"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCover" runat="server" GroupName="gRptType" Text="案卷封面" Checked="True" TabIndex="60"></asp:RadioButton>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="dTD">
                        <fieldset style="width: 13.5em; height: 6em">
                            <legend>案卷名稱列印項目</legend>
                            <div class="divTable" id="Table2">
                                <div class="dTR">
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCls_Case" runat="server" GroupName="gRptName" Text="分類+案名" Checked="True" TabIndex="65"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCls" runat="server" GroupName="gRptName" Text="分類名" TabIndex="70"></asp:RadioButton>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTD">
                                        <asp:RadioButton ID="rbCase" runat="server" GroupName="gRptName" Text="案名" TabIndex="75"></asp:RadioButton>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:block;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
