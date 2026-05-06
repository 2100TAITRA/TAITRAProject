<%@ Page Language="c#" CodeBehind="IFT401.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFT401" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>IFT401 系統造字字型上傳作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="IFT401.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="IFT401" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <input type="file" id="upFile" /><asp:TextBox ID="txFontInfo" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="dpArea" >
                            <div class="dpZoneCon dpM">
                                <div class="dpZone dpM dpClickable" data-font="標楷體">
                                    <div class="dpMsg dpM">
                                        <h1 class="dpM">造字字型<br>標楷體</h1>
                                        <div class="dpMsg dpDesc">
                                            <p>拖移字型檔並置於此</p>
                                            <p class="comment dpM">或點擊此處並選取字型檔</p>
                                        </div>
                                        <div class="dpMsg dpFile">
                                            <h3 class="dpInfo"></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dTD">
                        <div class="dpArea" >
                            <div class="dpZoneCon dpM">
                                <div class="dpZone dpM dpClickable" data-font="細明體">
                                    <div class="dpMsg dpM">
                                        <h1 class="dpM">造字字型<br>細明體</h1>
                                        <div class="dpMsg dpDesc">
                                            <p>拖移字型檔並置於此</p>
                                            <p class="comment dpM">或點擊此處並選取字型檔</p>
                                        </div>
                                        <div class="dpMsg dpFile">
                                            <h3 class="dpInfo"></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dTD">
                        <div class="dpArea" >
                            <div class="dpZoneCon dpM">
                                <div class="dpZone dpM dpClickable" data-font="Full">
                                    <div class="dpMsg dpM">
                                        <h1 class="dpM">完整字型<br><asp:Literal ID="ltFontName" runat="server"></asp:Literal></h1>
                                        <div class="dpMsg dpDesc">
                                            <p>拖移字型檔並置於此</p>
                                            <p class="comment dpM">或點擊此處並選取字型檔</p>
                                        </div>
                                        <div class="dpMsg dpFile">
                                            <h3 class="dpInfo"></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
