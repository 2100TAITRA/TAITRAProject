<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI260.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDI260" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>EDI260</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDI260" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="behavior: url(../../../STD/LIB/webservice.htc)" id="service"></div>
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_OD_FLOW_TYPE" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width : 7.5em">
                        <asp:Label ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>(起)－
                        <asp:TextBox ID="txDocNoE" runat="server" Width="5.5em" CssClass="InputFieldNumeric" MaxLength="10"></asp:TextBox>(迄)
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width : 7.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19.5em">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>&nbsp&nbsp
                        <cc1:ComboBox ID="dlSect" TabIndex="10" runat="server" Width="7.5em" CssClass="comboBox"></cc1:ComboBox>
                        <asp:TextBox ID="H_Change" runat="server" Width="16px" CssClass="hide"></asp:TextBox>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label7" runat="server" CssClass="RequireField">　承辦人：</asp:Label>
                        <cc1:ComboBox ID="dlUser" TabIndex="20" runat="server" Width="5.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width : 7.5em">
                        <asp:Label ID="Label3" runat="server">收(創)文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>—
                        <asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width : 7.5em">
                        <asp:Label ID="Label4" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCloseDateS" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>—
                        <asp:TextBox ID="txCloseDateE" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width : 7.5em">
                        <asp:Label ID="Label5" runat="server" Width="80px">歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExtfileDateS" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>—
						<asp:TextBox ID="txExtfileDateE" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width : 7.5em">
                        <asp:Label ID="Label6" runat="server">是否已歸檔：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbAttScan1" runat="server" Text="未歸檔" Checked="True"></asp:CheckBox>
                        <asp:CheckBox ID="cbAttScan0" runat="server" Text="已歸檔(含附件免歸)"></asp:CheckBox>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 28em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label>
                                    <asp:Label ID="lbSectName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦人">
                                <ItemStyle HorizontalAlign="Left"></ItemStyle>
                                <ItemTemplate>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hlDocNo" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收(創)文日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="結案日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbCloseDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="歸檔日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbExtfileDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="紙本附件">
                                <ItemTemplate>
                                    <asp:Label ID="lbAttScan" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbInSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="清除" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
