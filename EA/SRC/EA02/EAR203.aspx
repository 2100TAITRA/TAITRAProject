<%@ Page Language="c#" CodeBehind="EAR203.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR203" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR203 多案次案卷標籤列印作業 - 防檢局</title>
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
    <form id="EAR203" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_VerNo" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_Source" TabIndex="-1" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_VerNo2" TabIndex="-1" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label2" runat="server">案卷名稱列印：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButtonList ID="rblClsCaseName" runat="server" RepeatDirection="Horizontal">
                            <asp:ListItem Value="0">分類號+案名</asp:ListItem>
                            <asp:ListItem Value="1">分類名</asp:ListItem>
                            <asp:ListItem Value="2" Selected="True">案名</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:7.5em">
                        <asp:Label ID="Label1" runat="server">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 28.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server" Width="30px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="年度">
                                <ItemTemplate>
                                    <asp:TextBox ID="txYear" onblur="jf_chkYear()" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                                    <asp:Label ID="lbCOUNT" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="( 分類 － 案 － 卷 )">
                                <ItemTemplate>
                                    <div>
                                        <asp:Label ID="Label5" runat="server">一：</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('1')" ID="txClass1" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label10" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase1" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label11" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol1" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey1" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                    </div>
                                    <div>
                                        <asp:Label ID="Label6" runat="server">二：</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('2')" ID="txClass2" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label13" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase2" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label14" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol2" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey2" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                    </div>
                                    <div>
                                        <asp:Label ID="Label7" runat="server">三：</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('3')" ID="txClass3" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label16" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase3" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label15" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol3" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey3" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                    </div>
                                    <div>
                                        <asp:Label ID="Label17" runat="server">四：</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('4')" ID="txClass4" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label19" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase4" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label20" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol4" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey4" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                    </div>
                                    <div>
                                        <asp:Label ID="Label21" runat="server">五：</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('5')" ID="txClass5" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label23" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase5" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label24" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol5" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey5" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                    </div>
                                    <div>
                                        <asp:Label ID="Label25" runat="server">六：</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistClass('6')" ID="txClass6" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                        <asp:Label ID="Label27" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_IsExistCase()" ID="txCase6" runat="server" Width="7em" MaxLength="12"></asp:TextBox>
                                        <asp:Label ID="Label28" runat="server">─</asp:Label>
                                        <asp:TextBox onblur="jf_chkVol()" ID="txVol6" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                                        <asp:TextBox ID="H_ClsKey6" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                    </div>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
