<%@ Page Language="c#" CodeBehind="OMT200.aspx.cs" AutoEventWireup="false" Inherits="OM2.OMT200" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>OMT200 駐外發文登錄作業</title>
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
    <form id="OMT200" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../OMLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
            <asp:TextBox ID="txApWebFileio" TabIndex="1" runat="server" ></asp:TextBox>
            <asp:TextBox ID="txApWorkPath" TabIndex="1" runat="server" ></asp:TextBox>
            <asp:TextBox ID="txSYSID" TabIndex="1" runat="server" ></asp:TextBox>
            <asp:TextBox ID="txAttachName" TabIndex="1" runat="server" ></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">發文字號：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox ID="txIssueNo" TabIndex="1" runat="server" Width="16em"  MaxLength="20" CssClass="RequireField" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="divOfficeState">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server" CssClass="RequireField" >發文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="RequireField DatePicker" ID="txIssueDateS"  TabIndex="10" runat="server" Width="4.5em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" >
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">收文單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" TabIndex="10" runat="server" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR" >
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server" CssClass="RequireField">速別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList  ID="dlSpdNo" TabIndex="11" runat="server"  CssClass="RequireField" ></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR" style="height: 4.5em">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label9" runat="server" CssClass="RequireField">發文主旨：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 28em">
                        <asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="RequireField" Width="30em" TextMode="MultiLine" Rows="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" >
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">本文PDF：</asp:Label>
                    </div>
                    <div class="dTD">
                        <input ID="txDocPDFPath" type="File" runat="server" Width="12.5em" accept=".pdf"/>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="Label5" runat="server" CssClass="KeyField">如公文本文PDF是透過掃描產生，解析度最低要求為300dpi</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="InputFieldLabel">附件：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Button ID="btAddFile" runat="server" Text="加入附件"></asp:Button>
                        <input type="file" id="fileInput" runat="server" class="hide" onchange="fnAddFile()" multiple />
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label189" runat="server">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
                    </div>
                    <div class="dTD">
                        <div class="DivTable">
                            <div class="GridDiv" style="height: 140px;" data-fixed="true" ID="DivdgAttach">
                                <asp:DataGrid ID="dgAttach" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="序">
                                            <ItemTemplate>
                                                <asp:Label ID="lbAttSeq" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="檔名">
                                            <ItemTemplate>
                                                <asp:Label ID="lbFileName" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                                <asp:Label ID="lbFilePath" runat="server" CssClass="hidden"></asp:Label>
                                                <asp:Label ID="lbFileSize" runat="server" CssClass="hidden"></asp:Label>
                                                <asp:Label ID="lbFileDesc" runat="server" CssClass="InputFieldLabel"></asp:Label>
                                                <asp:Label ID="lbFileComeFrom" runat="server" CssClass="hidden"></asp:Label>
                                                <asp:Label ID="lbFileDraftSeq" runat="server" CssClass="hidden"></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="執行">
                                            <ItemTemplate>
                                                <asp:Button ID="btDelete" runat="server" Text="刪除"></asp:Button>
                                                <asp:Button ID="btOpenFile" runat="server" Text="開啟"></asp:Button>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:DataGrid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClose" runat="server" Text="關閉" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
