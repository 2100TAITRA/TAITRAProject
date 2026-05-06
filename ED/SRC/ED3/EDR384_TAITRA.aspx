<%@ Page Language="C#" AutoEventWireup="false" CodeBehind="EDR384_TAITRA.aspx.cs" Inherits="ED3.EDR384_TAITRA" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE html>
<html>
<head>
    <title>EDR384_TAITRA 外貿地址標籤及大宗掛號單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR384_TAITRA" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txIsSearch" TabIndex="0" runat="server" Width="4em" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">發文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <div class="dTR">
                            <asp:TextBox ID="txIssueDateS" TabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                            <asp:Label ID="Label4" runat="server" Width="16px" >－</asp:Label>
                            <asp:TextBox ID="txIssueDateE" TabIndex="1" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        </div>
                    </div>
                     <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server" >發文時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="dTR">
                            <asp:TextBox ID="txIssueTimeHS" TabIndex="2" runat="server" Width="1.5em" MaxLength="2" CssClass="InputFieldNumeric"></asp:TextBox>
                            <asp:Label ID="Label7" runat="server" Width="16px" >：</asp:Label>
                            <asp:TextBox ID="txIssueTimeMS" TabIndex="2" runat="server" Width="1.5em" MaxLength="2" CssClass="InputFieldNumeric"></asp:TextBox>
                            <asp:Label ID="Label8" runat="server" Width="16px" >－</asp:Label>
                            <asp:TextBox ID="txIssueTimeHE" TabIndex="3" runat="server" Width="1.5em" MaxLength="2" CssClass="InputFieldNumeric"></asp:TextBox>
                            <asp:Label ID="Label9" runat="server" Width="16px" >：</asp:Label>
                            <asp:TextBox ID="txIssueTimeME" TabIndex="3" runat="server" Width="1.5em" MaxLength="2" CssClass="InputFieldNumeric"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label12" runat="server">發文人員：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <div class="dTR">
                            <asp:DropDownList ID="dlIssueUser" TabIndex="4" runat="server" Width="10em"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label10" runat="server" >發文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="dTR">
                            <asp:TextBox ID="txIssueNo" TabIndex="5" runat="server" Width="5.5em" MaxLength="10" CssClass="InputEnUpperField"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server">報表格式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                       <asp:RadioButton ID="rbAddressTag" runat="server" GroupName="rbRptType" TabIndex="6" Text="地址標籤(起始位置："></asp:RadioButton>
                       <asp:TextBox ID="txStartIndex" runat="server" Width="1.5em" MaxLength="2" TabIndex="6" CssClass="InputFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label6" runat="server">&nbsp;</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                       <asp:RadioButton ID="rbRegisteredSlip" runat="server"  GroupName="rbRptType" TabIndex="7" Text="大宗掛號單"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <div class="DivTable" id="GridTable">
					<div class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
						</asp:Panel>
					</div>
                    <div class="dTR">
                        <div class="dTD">
                            <DIV class="GridDiv" style="HEIGHT: 157px;">
                                <asp:DataGrid ID="dg1" runat="server"  AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="選取">
                                            <ItemTemplate>
                                                <asp:CheckBox id="cbSelect" tabIndex="0" runat="server" Checked="true"></asp:CheckBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="公文文號">
                                            <ItemTemplate>
                                                <asp:Label id="lbDocNo" runat="server"></asp:Label>
                                                <asp:textbox id="txIssueNo" runat="server" CssClass="hide"></asp:textbox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="受文者">
                                            <ItemTemplate>
                                                <asp:textbox id="txRcvOrg" tabIndex="0" TextMode="MultiLine" Rows="2" Width="20.5em"  runat="server" ></asp:textbox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="地址">
                                            <ItemTemplate>
                                                <asp:textbox id="txPostCode" tabIndex="0" Width="3.5em" MaxLength="6"  runat="server" CssClass="InputFieldNumeric"></asp:textbox>
                                                <asp:textbox id="txAddress" tabIndex="0" TextMode="MultiLine" Rows="2" Width="20.5em"  runat="server" ></asp:textbox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="人名">
                                            <ItemTemplate>
                                                <asp:textbox id="txRcvUserName" tabIndex="0" TextMode="MultiLine" Rows="2" Width="10.5em" runat="server" ></asp:textbox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="職稱">
                                            <ItemTemplate>
                                                <asp:textbox id="txRcvUserTitle" tabIndex="0" TextMode="MultiLine" Rows="2" Width="10.5em" runat="server" ></asp:textbox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:datagrid>
                            </DIV>
                        </div>
                    </div>
                </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
