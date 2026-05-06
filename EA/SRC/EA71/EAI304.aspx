<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAI304.aspx.cs" AutoEventWireup="false" Inherits="EA71.EAI304" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head>
    <title>EAI304 立案全案摘要瀏覽</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="../EALIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<style>
		.ztree li a:hover,
		.ztree li a.curSelectedNode,
		.ztree li a span {
		    text-decoration: none !important;
		}
	</style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAI304" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txMod" runat="server" CssClass=""></asp:TextBox>l
            <asp:TextBox ID="txFILE_SEQ_NUM" runat="server" Width="122px" Height="28px" CssClass=""></asp:TextBox>
            <asp:TextBox ID="txFILE_VOL_NUM" runat="server" Width="87px" CssClass=""></asp:TextBox>
            <asp:TextBox ID="Check" runat="server" CssClass=""></asp:TextBox>
            <asp:TextBox ID="H_UNVPath" runat="server"></asp:TextBox>
			<asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Panel ID="pVol" runat="server" Width="43.5em">
                            <asp:Label ID="pMsg" runat="server" BackColor="Info" Font-Size="Smaller"></asp:Label>
                        </asp:Panel>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div style="vertical-align: super; overflow: auto; height: 36.5em; text-align: left">
                            <ul id="Classtree" class="ztree"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="申請調檔" ID="btReqDoc" AccessKey="S" Title="申請調檔(ALT+S)"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="線上瀏覽" ID="btImage" AccessKey="V" Title="線上瀏覽(ALT+V)"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="帶回主旨" ID="btRtnSubject" AccessKey="R" Title="帶回主旨(ALT+R)"></asp:Button>
        </asp:Panel>
    </form>
</body>
<script type="text/javascript" src="../EALIB/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="../EALIB/jquery.ztree.exhide-3.5.js"></script>
</html>
