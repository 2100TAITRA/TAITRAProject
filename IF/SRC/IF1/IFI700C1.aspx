<%@ Page Language="c#" CodeBehind="IFI700C1.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFI700C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>IFI700C1 公告事項明細內容子視窗</title>
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
    <form id="IFI700C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div class="DivBaseTable">
            <div class="DivTable">
                <div class="dTR">
                    <asp:Label ID="Label1" runat="server" Font-Size="Large" Font-Bold="True">系統公告</asp:Label>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <fieldset style="width: 46em">
                            <legend class="FieldSetLegend">公告內容</legend>
                            <div class="DivTable">
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 6em; background-color: lightblue">公告時間：</div>
                                    <div class="dTD" style="width: 0.5em;">
                                        <asp:Label ID="Label2" runat="server">&nbsp;</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <asp:Label ID="txPublishDate" runat="server"></asp:Label>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 6em; background-color: lightblue">公告主旨：</div>
                                    <div class="dTD" style="width: 0.5em;">
                                        <asp:Label ID="Label3" runat="server">&nbsp;</asp:Label>
                                    </div>
                                    <div class="dTD">
											<asp:Label ID="txSubject" runat="server" Width="430px" Height="22px"></asp:Label>
                                    </div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 6em; background-color: lightblue">公告內容：</div>
                                    <div class="dTD" style="width: 0.5em;">
                                        <asp:Label ID="Label4" runat="server">&nbsp;</asp:Label>
                                    </div>
                                    <div class="dTD">
                                        <asp:Label ID="txContent" runat="server" Width="430px" Height="66px"></asp:Label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <br>
                        <br>
                        <fieldset style="width: 46em" class="hide" id="fieldsetAtt">
                            <legend>公告附件</legend>
                            <div class="DivTable">
                                <br>
                                <div style="overflow: auto">
                                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" PageSize="50" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                        <Columns>
                                            <asp:TemplateColumn HeaderText="檔案下載"></asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="說明">
                                                <ItemTemplate>
                                                    <asp:Label ID="lbDesc" runat="server"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                            <asp:TemplateColumn HeaderText="檔案驗證碼(SHA256/512)">
                                                <ItemTemplate>
                                                    <asp:Label ID="lbHash" runat="server"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateColumn>
                                        </Columns>
                                    </asp:DataGrid>
                                </div>
                                <br>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px" Style="z-index: 0"></asp:ListBox>
        </div>
    </form>
</body>
</html>
