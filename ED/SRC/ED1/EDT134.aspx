<%@ Page Language="c#" CodeBehind="EDT134.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT134" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT134 待登錄電子收文查詢作業</title>
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
    <form id="EDT134" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:DropDownList ID="ddltemp" runat="server"></asp:DropDownList>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">總收文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDocNo" TabIndex="10" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">～</asp:Label>
                        <asp:TextBox ID="txEDocNo" TabIndex="11" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">收文時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:TextBox>&nbsp;
						<asp:TextBox ID="txSTime" TabIndex="21" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">～</asp:Label>
                        <asp:TextBox ID="txEDate" TabIndex="30" runat="server" Width="4em" MaxLength="7"></asp:TextBox>&nbsp;
						<asp:TextBox ID="txETime" TabIndex="31" runat="server" Width="2.5em" MaxLength="4"></asp:TextBox>&nbsp;
						<asp:Label ID="Label5" runat="server">速別：</asp:Label>
                        <asp:DropDownList ID="dlSpeed" TabIndex="40" runat="server" Width="4.5em">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="普通件">普通件</asp:ListItem>
                            <asp:ListItem Value="速件">速件</asp:ListItem>
                            <asp:ListItem Value="最速件">最速件</asp:ListItem>
                        </asp:DropDownList>
                        <asp:Label ID="Label6" runat="server">密等：</asp:Label>
                        <asp:DropDownList ID="dlSec" TabIndex="50" runat="server" Width="5.5em">
                            <asp:ListItem></asp:ListItem>
                            <asp:ListItem Value="普通">普通</asp:ListItem>
                            <asp:ListItem Value="密">密</asp:ListItem>
                            <asp:ListItem Value="機密">機密</asp:ListItem>
                            <asp:ListItem Value="極機密">極機密</asp:ListItem>
                            <asp:ListItem Value="絕對機密">絕對機密</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromOrgNo" TabIndex="60" runat="server" Width="10.5em"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label18" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromWord" TabIndex="70" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Label ID="Label19" runat="server">字第</asp:Label>
                        <asp:TextBox ID="txSFromNo" TabIndex="80" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">～</asp:Label>
                        <asp:TextBox ID="txEFromNo" TabIndex="81" runat="server" Width="8em" MaxLength="15"></asp:TextBox>
                        <asp:Label ID="Label20" runat="server">號</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label9" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubjectNo" TabIndex="90" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:ImageButton ID="btSubjectCode" TabIndex="-1" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>&nbsp;
                        <asp:TextBox ID="txSubject" TabIndex="100" runat="server" Width="31.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 17.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbNo" runat="server" Width="15px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="刪">
                                <HeaderTemplate>
                                    <asp:Label ID="Label10" runat="server">刪</asp:Label><br>
                                    <asp:CheckBox ID="cbTDelete" runat="server" onclick="cbTDelete_onclick(this);"></asp:CheckBox>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbDelete" runat="server" onclick="cbDelete_onclick(this);"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="銷">
                                <HeaderTemplate>
                                    <asp:Label ID="Label11" runat="server">銷</asp:Label><br>
                                    <asp:CheckBox ID="cbTCancel" runat="server" onclick="cbTCancel_onclick(this);"></asp:CheckBox>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbCancel" runat="server" onclick="cbCancel_onclick(this);"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:DropDownList ID="ddlUnit" runat="server" Width="132px" Enabled="False"></asp:DropDownList>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="總收文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlDocNo" runat="server" Width="90px"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收文時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbDateTime" runat="server">0930101</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromOrgNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字號">
                                <ItemTemplate>
                                    <asp:TextBox ID="H_ID" TabIndex="-1" runat="server" CssClass="hide" Width="13px"></asp:TextBox>
                                    <asp:Label ID="lbFromNo" runat="server"></asp:Label>
                                    <asp:Button ID="btOpenElec" runat="server" Width="71px" Font-Size="XX-Small" Text="開啟電子檔"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server" Width="204px"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:block;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="銷號(X)" DefaultStyle="newmode:block;modifymode:block;" ID="btCancel" AccessKey="X" Title="銷號(ALT+X)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
