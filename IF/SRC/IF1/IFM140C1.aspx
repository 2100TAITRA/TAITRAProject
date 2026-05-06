<%@ Page Language="c#" CodeBehind="IFM140C1.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM140C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>IFM140C1</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="../IFLIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="IFM140C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:ListBox ID="lbInfForTree" runat="server"></asp:ListBox>
            <asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
        </div>
        <asp:TextBox ID="txAppSetRootPath" Style="display: none; z-index: 103; left: 12px; position: absolute; top: 258px" runat="server"></asp:TextBox>
        <asp:TextBox ID="txAuthWS" Style="display: none; z-index: 103; left: 12px; position: absolute; top: 258px" runat="server"></asp:TextBox>
        <script src="IFM140C1.js"></script>
        <asp:ListBox ID="Listbox1" Style="z-index: 101; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 108px">
                        <asp:Label class="KeyField" ID="Label1" runat="server">名　　稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppName" TabIndex="1" runat="server" MaxLength="50"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 108px">
                        <asp:Label ID="Label2" runat="server">建立項目：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbAppSet" runat="server" Text="程式集" GroupName="gAppType" Checked="True" TabIndex="2"></asp:RadioButton>
                        <asp:RadioButton ID="rbApp" runat="server" Text="應用程式" GroupName="gAppType" TabIndex="99"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="Table4">
                <div class="dTR" style="background-color: DimGray">
                    <div class="dTDTitle">
                        <asp:Label Style="width: 16em" ID="Label34" runat="server" BackColor="DimGray" ForeColor="White">新增位址</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div style="background-color: #ffffff">
                        <div id="TheGreatTV"></div>
                        <div id="divForTreeView" style="background-color: window; width: 100%">
                            <div style="height:16em; overflow:auto; width:20em">
                                <ul id="tv" class="ztree"></ul>
                            </div>
                        </div>
                    </div>                    
                    <asp:Button ID="btSave" runat="server" Text="確定" TabIndex="4"></asp:Button>
                    <asp:Button ID="btCancel" runat="server" Text="取消" TabIndex="5"></asp:Button>
                </div>
            </div>
        </div>
        <asp:CustomValidator ID="Customvalidator1" Style="z-index: 102; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="Validationsummary2" Style="z-index: 103; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:DropDownList ID="ddlData" Style="z-index: 105; left: 407px; position: absolute; top: 453px" runat="server" CssClass="hide"></asp:DropDownList>
    </form>
</body>
<script type="text/javascript" src="../IFLIB/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="../IFLIB/jquery.ztree.exhide-3.5.js"></script>
</html>
