<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI411.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDI411" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI411 公文列管查詢作業</title>
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
    <form id="EDI411" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" TabIndex="0" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>～
                        <asp:TextBox ID="txDocNoE" TabIndex="0" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label13" runat="server" CssClass="RequireField">續辦文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFurtherDocNoS" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>～
                        <asp:TextBox ID="txFurtherDocNoE" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="RequireFieldNumeric" MaxLength="7"></asp:TextBox>～
                        <asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="RequireFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label11" runat="server" CssClass="RequireField">結案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCloseDateS" runat="server" Width="4em" CssClass="RequireFieldNumeric" MaxLength="7"></asp:TextBox>～
                        <asp:TextBox ID="txCloseDateE" runat="server" Width="4em" CssClass="RequireFieldNumeric" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label9" runat="server" CssClass="hide">案件編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCaseNoS" runat="server" Width="6.5em" CssClass="hide" MaxLength="12"></asp:TextBox>
                        <asp:Label ID="Label10" runat="server" CssClass="hide">～</asp:Label>
                        <asp:TextBox ID="txCaseNoE" runat="server" Width="6.5em" CssClass="hide" MaxLength="12"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromOrgName" runat="server" Width="32.5em" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="10.5em"></asp:DropDownList>
                        <asp:DropDownList ID="dlSect" runat="server" Width="10.5em"></asp:DropDownList>
                        <asp:DropDownList ID="dlUser" runat="server" Width="10.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:DropDownList ID="ddlProperty" TabIndex="80" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server">業務類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlWorkType" TabIndex="80" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">列管狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rball" runat="server" GroupName="Audit" Text="全部"></asp:RadioButton>
                        <asp:RadioButton ID="rbAudit" runat="server" GroupName="Audit" Text="列管"></asp:RadioButton>
                        <asp:RadioButton ID="rbDeAudit" runat="server" GroupName="Audit" Text="已解除列管"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label8" runat="server">辦結狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAllType" runat="server" CssClass="InputFieldLabel" GroupName="Finish" Text="全部"></asp:RadioButton>
                        <asp:RadioButton ID="rbInDo" runat="server" CssClass="InputFieldLabel" GroupName="Finish" Text="辦理中"></asp:RadioButton>
                        <asp:RadioButton ID="rbInDue" runat="server" CssClass="InputFieldLabel" GroupName="Finish" Text="依限辦結"></asp:RadioButton>
                        <asp:RadioButton ID="rbOverDue" runat="server" CssClass="InputFieldLabel" GroupName="Finish" Text="逾限辦結"></asp:RadioButton>
                    </div>
                </div>
                <div class="hide" id="Reply">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label12" runat="server">含需回覆公文：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbIncludeReply" runat="server" CssClass="InputFieldLabel" GroupName="Reply" Text="是"></asp:RadioButton>
                        <asp:RadioButton ID="rbExcludeReply" runat="server" CssClass="InputFieldLabel" GroupName="Reply" Text="否"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 16.5em; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號&lt;BR&gt;收創文日">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbRcvDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="案件編號" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                <ItemTemplate>
                                    <asp:Label ID="lbCaseNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="續辦文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbFurtherDocno" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文機關&lt;BR&gt;來文字號">
                                <ItemTemplate>
                                    <asp:Label ID="lbSourceName" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbFormWordNo" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbFromSubject" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位&lt;BR&gt;承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbEmpName" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="列管日期&lt;BR&gt;解除日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditDate" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbDeAuditDate" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="辦理&lt;BR&gt;天數">
                                <ItemTemplate>
                                    <asp:Label ID="lbWorkDays" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="列管原因&lt;BR&gt;解除原因">
                                <ItemTemplate>
                                    <asp:Label ID="lbAuditReason" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbDeAuditReason" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="列管狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbSTATUS" runat="server"></asp:Label><br>
                                    <asp:HyperLink ID="hlRelease" runat="server">解除</asp:HyperLink>
                                    <asp:HyperLink ID="hlProcess" runat="server">流程</asp:HyperLink>
                                    <asp:HyperLink ID="hlDocView" runat="server">檢視</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="備註" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeauditRemark" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <asp:TextBox ID="h_DeptInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_SectInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_UserInfo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="SectList" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="UserList" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_workTypeIndex" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_workTypeValue" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_workTypeText" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="h_txTranUser" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="匯出Excel(O)" DefaultStyle="newmode:block;modifymode:none;" AccessKey="O" Title="匯出Excel(ALT+O)" ID="btExcel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
