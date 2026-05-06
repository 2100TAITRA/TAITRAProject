<%@ Page Language="c#" CodeBehind="AKM333.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM333" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKM333 來發受文者明細</title>
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
    <form id="AKM333" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">主要來文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFNAME" TabIndex="1" runat="server" MaxLength="60" Width="18.5em">立法委員李炷烽國會辦公室</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">次要來文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFNAME2" TabIndex="2" runat="server" MaxLength="60" Width="18.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">來文者補正：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbFNAME3" TabIndex="3" runat="server" MaxLength="60" Width="18.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">主要發文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbINAME" TabIndex="4" runat="server" MaxLength="60" Width="18.5em">行政院大陸委員會</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">次要發文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbINAME2" TabIndex="5" runat="server" MaxLength="60" Width="18.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label6" runat="server">發文者補正：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="tbINAME3" TabIndex="6" runat="server" MaxLength="60" Width="18.5em"></asp:TextBox>
                        <asp:TextBox ID="txFromNoWord" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="tbFNO" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="dllIssueNoWord" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="tbINO" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox ID="txFromNoWord2" Runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="tbFNO2" Runat="server" CssClass="hide"></asp:TextBox>
            			<asp:TextBox ID="txFromNoWord3" Runat="server" CssClass="hide"></asp:TextBox><asp:TextBox ID="tbFNO3" Runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="divTB">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label12" runat="server">受文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcv1" TabIndex="10" runat="server" MaxLength="60" Width="18.5em">受文者1</asp:TextBox><br>
                        <asp:TextBox ID="txRcv2" TabIndex="11" runat="server" MaxLength="60" Width="18.5em">受文者2</asp:TextBox><br>
                        <asp:TextBox ID="txRcv3" TabIndex="12" runat="server" MaxLength="60" Width="18.5em">受文者3</asp:TextBox>
                        <asp:Button ID="btDetail" runat="server" Text="等..."></asp:Button>
                    </div>
                </div>
            </div>
            <div class="hide DivTable" id="divDG">
                <div>
                    <asp:Button AccessKey="C" ID="btClear" runat="server" Text="清除(C)" title="清除(Alt+C)"></asp:Button>
                    <asp:Button AccessKey="A" ID="btAll" runat="server" Text="全選(A)" title="全選(Alt+A)"></asp:Button>
                    <asp:Button AccessKey="N" ID="btRever" runat="server" Text="反向(N)" title="反向(Alt+N)"></asp:Button>
                    <asp:Button AccessKey="B" ID="btDeleteData" runat="server" Text="刪除受文者(B)" title="刪除受文者(Alt+B)"></asp:Button>
                </div>
                <div class="GridDiv" style="height: 12.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="選取">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="序號">
                                <ItemTemplate>
                                    <asp:Label ID="lbSeqNo" runat="server">Label</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="受文者">
                                <ItemTemplate>
                                    <asp:TextBox ID="txRcvName" runat="server" Width="18.5em" MaxLength="60"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button Text="開啟(M)" DefaultStyle="newmode:block;modifymode:block;" ID="btOpen"></asp:Button>
            <asp:Button Text="儲存" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
        </asp:Panel>

        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 683px; position: absolute; top: 169px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
