<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI011.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDI011" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI011 電子收文明細</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDI011" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_txArchiveDir" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txFileDictionary" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txWebService" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txArtifact" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txFileSeq" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txSourceOrgno" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txSpecifiedName" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvorg_no" runat="server" MaxLength="17" Width="9em"></asp:TextBox>
                        <asp:TextBox ID="txRcvorg_name" runat="server" MaxLength="60" Width="27em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19em">
                        <asp:TextBox ID="txRcvorg_date" runat="server" MaxLength="9" Width="5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">收文時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcv_date" runat="server" MaxLength="18" Width="10.75em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">來文字：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19em">
                        <asp:TextBox ID="txRcv_noword" runat="server" MaxLength="10" Width="10em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">來文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcv_no" runat="server" MaxLength="20" Width="10.75em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label6" runat="server">受文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcv_org" runat="server" MaxLength="17" Width="9em"></asp:TextBox>
                        <asp:TextBox ID="txFeporg_name" runat="server" MaxLength="60" Width="27em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoR" runat="server" MaxLength="20" Width="10.75em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcv_subt" runat="server" MaxLength="120" Width="36.25em"></asp:TextBox>
                    </div>
                </div>
                <div class="DivTable">
                    <asp:Button ID="btPackage" runat="server" CssClass="hide" Text="打包下載"></asp:Button>
                    <div class="GridDiv" style="height: 20%">
                        <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSEQ_NO" runat="server">123</asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                    <ItemTemplate>
                                        <asp:CheckBox ID="cbSelect" runat="server" Checked="true"></asp:CheckBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="檔案種類">
                                    <ItemTemplate>
                                        <div style="display: none">
                                            <asp:Label ID="lbFileId" runat="server"></asp:Label>
                                            <asp:Label ID="lbFileType" runat="server"></asp:Label>
                                            <asp:Label ID="lbSubDir" runat="server"></asp:Label>
                                            <asp:Label ID="lbFilePath" runat="server"></asp:Label>
                                        </div>
                                        <asp:Label ID="lbFileTypeName" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="檔名">
                                    <ItemTemplate>
                                        <asp:Label ID="lbFileName" runat="server" style="text-decoration:underline"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
