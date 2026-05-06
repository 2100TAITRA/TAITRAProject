<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR109_EXAM.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR109_EXAM" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR109_EXAM 機密等級變更或註銷紀錄單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR109_EXAM" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div style="text-align: center" >
                        <div>
                            <span id="Label93" tabindex="-1" style="width: 208px;">原機密案件資料(欲降解密公文)</span>
                        </div>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em;">
                        <span id="Label1" tabindex="-1" class="RequireField">欲降解密文號：</span>
                    </div>
                    <div class="dTD" style="width: 17em;">
                            <asp:TextBox class="RequireField" ID="txDocNo" runat="server" Width="7.5em" CssClass="RequireField" MaxLength="15"></asp:TextBox>
                        <asp:TextBox ID="txOdocKeepYear" runat="server" Width="7.5em" CssClass="hide" ></asp:TextBox>
                        <asp:TextBox ID="txOdocDeptName" runat="server" Width="7.5em" CssClass="hide" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em;">
                        <span id="Label95" tabindex="-1">原機密文件來文機關：</span>
                    </div>
                    <div class="dTD" style="width: 17em;">
                            <asp:TextBox ID="txOdocFromOrg" TabIndex="-1" runat="server" Width="13.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <span id="Label2">原案件檔號：</span>
                    </div>
                    <div class="dTD" style="width: 17em">
                        <asp:TextBox ID="txOdocFileNo" TabIndex="-1" runat="server" Width="16.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                        <asp:TextBox ID="txFILENO_SEP" TabIndex="-1" runat="server" Width="1em" CssClass="hide" ></asp:TextBox>
                        <asp:TextBox ID="SourceNo" TabIndex="-1" runat="server" Width="1em" CssClass="hide" ></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em;">
                        <span id="Label5" tabindex="-1">原機密文件來文日期：</span>
                    </div>
                    <div class="dTD" style="width: 17em;">
                            <asp:TextBox ID="txOdocFromDate" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <span id="Label21" class="RequireField">新密等：</span>
                    </div>
                    <div class="dTD" style="width: 17em">
                        <asp:DropDownList ID="dlSecNo" runat="server">
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em;">
                        <span id="Label8" tabindex="-1">原機密文件來文字號：</span>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txOdocFromWord" TabIndex="-1" runat="server" Width="13.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em;">
                        <span id="Label9" tabindex="-1">原機密文件受文機關：</span>
                    </div>
                    <div class="dTD" style="width: 17em;">
                        <asp:TextBox ID="txOdocRcvOrg" TabIndex="-1" runat="server" Width="13.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em;">
                        <span id="Label10" tabindex="-1">原機密案件發文日期：</span>
                    </div>
                    <div class="dTD" style="width: 17em;">                        
                        <asp:TextBox ID="txOdocIssueDate" TabIndex="-1" runat="server" Width="4.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em;">
                        <span id="Label101" tabindex="-1">原機密案件發文字號：</span>
                    </div>
                    <div class="dTD" style="width: 17em;">
                            <asp:TextBox ID="txOdocIssueWord" TabIndex="-1" runat="server" Width="13.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 11em;">
                        <span id="Label100" tabindex="-1" class="RequireField">案由：</span>
                    </div>
                    <div class="dTD" style="width: 40em;">
                        <asp:TextBox ID="txOdocFromSubject" runat="server" Width="40em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div style="height: 32px;">
                    <div class="dTR">
                        <div style="text-align: center">
                            <div>
                                <span id="Label13" tabindex="-1" style="width: 208px;">核 定 機 關 來 文 資 料</span>
                            </div>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 11em">
                            <span id="Label92" tabindex="-1" class="RequireField">　　　　　公文文號：</span>
                            <span id="Label82" tabindex="-1" style="font-size: 0.5em;" class="RequireField">　　　　　(核定機關來文之收創文號)</span>
                        </div>
                        <div class="dTD" style="width: 13.5em">
                            <asp:TextBox ID="txRcvDoc" runat="server" Width="7.5em"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 11em">
                            <span id="Label12" tabindex="-1" >通知(來文)機關：</span>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:TextBox ID="txRcvDocOrg" runat="server" Width="13.5em"></asp:TextBox>
                            <asp:TextBox ID="txKeepYear" runat="server" Width="7.5em" CssClass="hide" ></asp:TextBox>
                            <asp:TextBox ID="txRcvDate" runat="server" Width="7.5em" CssClass="hide" ></asp:TextBox>
                            <asp:TextBox ID="txRcvEmpname" runat="server" Width="7.5em" CssClass="hide" ></asp:TextBox>
                            <asp:TextBox ID="txRcvDeptname" runat="server" Width="7.5em" CssClass="hide" ></asp:TextBox>
                        </div>
                        <div class="dTDTitle" style="width: 8em">
                            <span id="Label72" >檔號：</span>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:TextBox ID="txRcvDocFileNo" runat="server" Width="16.5em"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR" >
                        <div class="dTDTitle" style="width: 11em">
                            <span id="Label15" >來文日期：</span>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:TextBox ID="txRcvDocFromDate" runat="server" Width="4.5em" ></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 11em">
                            <span id="Label19" >來文字號：</span>
                        </div>
                        <div class="dTD" style="width: 17em">
                            <asp:TextBox ID="txRcvDocFromWord" runat="server" Width="13.5em" ></asp:TextBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="紀錄單列印" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
