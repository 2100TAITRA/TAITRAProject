<%@ Page Language="c#" CodeBehind="ODR382.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR382" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>ODR382 大宗掛號單列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODR382" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
        <asp:ListBox Style="z-index: 102; position: absolute; top: 6.5em; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
        <asp:Label ID="lbOrgNo" runat="server" CssClass="hidden"></asp:Label>
        <div id="BaseTable" class="DivBaseTable">
            <fieldset>
                <legend>彙整時間列印</legend>
                <div class="DivTable" id="Table1">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label ID="Label1" runat="server" CssClass="RequireField">郵寄日期：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txPostDate" TabIndex="1" runat="server" CssClass="RequireFieldNumeric" Width="4em" MaxLength="7"></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 7em">
                            <asp:Label ID="Label7" runat="server">郵寄時間：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 8em">
                            <asp:TextBox ID="txSTime" TabIndex="2" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                            <asp:Label ID="Label9" runat="server">－</asp:Label>
                            <asp:TextBox ID="txETime" TabIndex="3" runat="server" CssClass="InputFieldNumeric" Width="2.5em" MaxLength="4"></asp:TextBox>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="dlTime" TabIndex="4" runat="server" Width="9em"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label ID="Label2" runat="server" CssClass="RequireField">大宗掛號單別：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:DropDownList ID="dlBulk" TabIndex="5" runat="server" CssClass="RequireField"></asp:DropDownList>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label ID="Label8" runat="server">排序：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbPostSeq" TabIndex="12" runat="server" Text="依郵寄序號"
                                GroupName="grp"></asp:RadioButton><asp:RadioButton ID="rbPostNo" TabIndex="13" runat="server" Text="依郵寄方式"
                                    GroupName="grp"></asp:RadioButton><asp:RadioButton ID="rbPostType" TabIndex="14" runat="server" Text="發文資料優先"
                                        GroupName="grp"></asp:RadioButton><asp:RadioButton ID="rbRcvOrg" TabIndex="15" runat="server" Text="依受文者"
                                            GroupName="grp"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label ID="lbRange" runat="server">列印範圍：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbAll" runat="server" Text="全部" GroupName="PrintRange"></asp:RadioButton>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle">&nbsp;&nbsp;</div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbUser" runat="server" Text="指定彙整人" GroupName="PrintRange"></asp:RadioButton><asp:TextBox ID="txUser" runat="server" Width="5em"></asp:TextBox>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div style="overflow: auto;" id="DivDoc">
                <fieldset>
                    <legend>公文文號列印</legend>
                    <div class="DivTable" id="Table2">
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 8em">
                                <asp:Label ID="Label11" runat="server" CssClass="RequireField">公文文號：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" CssClass="RequireField" Width="6.5em"
                                    MaxLength="15"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 8em">
                                <asp:Label Style="z-index: 0" ID="Label14" runat="server">郵遞方式：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:DropDownList Style="z-index: 0" ID="dlBatchSendType" runat="server"
                                    Width="6.5em" onchange="fnGetPostCostBatch();">
                                </asp:DropDownList>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 8em">
                                <asp:Label ID="Label15" runat="server">重量：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox onblur="fnGetPostCostBatch();" ID="txBatchWeight" runat="server" CssClass="InputFieldNumeric" Width="4em"></asp:TextBox>
                            </div>
                        </div>
                        <div class="dTR">
                            <div class="dTDTitle" style="width: 8em">
                                <asp:Label Style="z-index: 0" ID="Label16" runat="server">郵資：</asp:Label>
                            </div>
                            <div class="dTD">
                                <asp:TextBox ID="txBatchCost" runat="server" CssClass="InputFieldNumeric" Width="4em"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <fieldset>
                <legend>掛號號碼編製</legend>
                <div class="DivTable" id="Table3">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label6" runat="server">&nbsp;&nbsp;</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:TextBox ID="txNum1S" TabIndex="6" runat="server" CssClass="InputFieldNumeric" Width="4em" MaxLength="6"></asp:TextBox>
                            <asp:Label ID="Label3" runat="server">－</asp:Label>
                            <asp:TextBox ID="txNum1E" TabIndex="7" runat="server" CssClass="InputFieldNumeric" Width="4em" MaxLength="6"></asp:TextBox>
                            <asp:TextBox ID="txNum1" runat="server" CssClass="hidden InputFieldNumeric" Width="4em" MaxLength="6"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">掛號號碼使用空間：</div>
                        <div class="dTD">
                            <asp:TextBox ID="txNum2S" TabIndex="8" runat="server" CssClass="InputFieldNumeric" Width="4em" MaxLength="6"></asp:TextBox>
                            <asp:Label ID="Label4" runat="server">－</asp:Label>
                            <asp:TextBox ID="txNum2E" TabIndex="9" runat="server" CssClass="InputFieldNumeric" Width="4em" MaxLength="6"></asp:TextBox>
                            <asp:TextBox ID="txNum2" runat="server" CssClass="hidden InputFieldNumeric" Width="4em" MaxLength="6"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">&nbsp;&nbsp;</div>
                        <div class="dTD">
                            <asp:TextBox ID="txNum3S" TabIndex="10" runat="server" CssClass="InputFieldNumeric" Width="4em" MaxLength="6"></asp:TextBox>
                            <asp:Label ID="Label5" runat="server">－</asp:Label>
                            <asp:TextBox ID="txNum3E" TabIndex="11" runat="server" CssClass="InputFieldNumeric" Width="4em" MaxLength="6"></asp:TextBox>
                            <asp:TextBox ID="txNum3" runat="server" CssClass="hidden InputFieldNumeric" Width="4em" MaxLength="6"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 9.5em">
                            <asp:Label ID="Label10" runat="server">掛號號碼編製：</asp:Label>
                        </div>
                        <div class="dTD">
                            <asp:RadioButton ID="rbReget" TabIndex="12" runat="server" Text="所有郵件重新編掛號號碼"
                                GroupName="getnumber"></asp:RadioButton><asp:RadioButton ID="rbRestget" TabIndex="13" runat="server" Text="僅對未編號郵件給號"
                                    GroupName="getnumber" Checked="True"></asp:RadioButton><asp:RadioButton ID="rbNo" TabIndex="13" runat="server" Text="不編製" GroupName="getnumber"
                                        Checked="false"></asp:RadioButton>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 103; position: absolute; top: 218px; left: 12px" ID="Validator"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 104; position: absolute; top: 248px; left: -56px" ID="ValidationSummary1"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:TextBox Style="z-index: 105; position: absolute; top: 184px; left: 864px" ID="H_txBatchSum"
            runat="server" CssClass="hide"></asp:TextBox>
    </form>
</body>
</html>
