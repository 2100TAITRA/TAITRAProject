<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR2402.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR2402" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR2402 會辦公文明細表</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR2402" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="width: 708px; display: none; height: 42px; visibility: hidden" id="hiddenDiv">
            <asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
            <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide" Width="92px"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Url" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
            <asp:TextBox ID="H_Width" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
            <asp:TextBox ID="H_Height" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
            <asp:TextBox ID="H_Artifact" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label1" runat="server" EnableViewState="False">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 25em">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" CssClass="comboBox" Width="10em"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" TabIndex="10" runat="server" CssClass="comboBox" Width="10em"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label ID="Label2" runat="server" EnableViewState="False">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="15" runat="server" CssClass="comboBox" Width="10em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:DropDownList ID="dlDateType" TabIndex="17" runat="server" Width="8.5em"></asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="20" runat="server" CssClass="InputFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txEDate" TabIndex="25" runat="server" CssClass="InputFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label3" runat="server" EnableViewState="False">會辦天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        自
                        <asp:TextBox ID="txCoWorkDayS" TabIndex="28" runat="server" CssClass="InputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>天至
						<asp:TextBox ID="txCoWorkDayE" TabIndex="29" runat="server" CssClass="InputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>天
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label4" runat="server">辦畢否：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb3" TabIndex="40" runat="server" EnableViewState="False" GroupName="gn" Text="已辦畢"></asp:RadioButton>
                        <asp:RadioButton ID="rb2" TabIndex="35" runat="server" EnableViewState="False" GroupName="gn" Text="辦理中"></asp:RadioButton>
                        <asp:RadioButton ID="rbCancelDocNo" TabIndex="35" runat="server" EnableViewState="False" GroupName="gn" Text="銷號"></asp:RadioButton>
                        <asp:RadioButton ID="rb1" TabIndex="30" runat="server" GroupName="gn" Text="全部"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 10em">
                    <asp:DataGrid ID="dg1" runat="server" EnableViewState="False" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbNo" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文文號">
                                <ItemTemplate>
                                    <asp:Label ID="lbDocNo" runat="server" EnableViewState="False"></asp:Label><br>
                                    <asp:HyperLink ID="hlView" runat="server">流程</asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="收(創)文日期<br>限辦日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbRcvDate" runat="server" EnableViewState="False"></asp:Label><br>
                                    <asp:Label ID="lbDueDate" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="原始限辦日期">
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbPdueDate" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="結案日期<br>會辦天數">
                                <ItemTemplate>
                                    <asp:Label ID="lbCloseDate" runat="server" EnableViewState="False"></asp:Label><br>
                                    <asp:Label ID="lbWorkDay" runat="server" CssClass="hide" EnableViewState="False"></asp:Label>
                                    <asp:Label ID="lbCoWorkDay" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="目前所在位置<br>狀態">
                                <ItemTemplate>
                                    <asp:Label ID="lbPosition" runat="server" EnableViewState="False"></asp:Label><br>
                                    <asp:Label ID="lbStatus" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="公文性質">
                                <ItemTemplate>
                                    <asp:Label Style="z-index: 0" ID="lbDocProperty" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="會辦單位<br>會辦承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbCoDeptName" runat="server" EnableViewState="False"></asp:Label><br>
                                    <asp:Label ID="lbCoEmpName" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="承辦單位<br>承辦人">
                                <ItemTemplate>
                                    <asp:Label ID="lbDeptName" runat="server" EnableViewState="False"></asp:Label><br>
                                    <asp:Label ID="lbUserName" Style="overflow: hidden" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label ID="lbSubject" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="會辦開始日期<br>會辦結束日期">
                                <ItemTemplate>
                                    <asp:Label ID="lbCoStartDate" runat="server" EnableViewState="False"></asp:Label><br>
                                    <asp:Label ID="lbCoEndDate" runat="server" EnableViewState="False"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="查詢" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Text="匯出Excel(O)" ID="btExcel" AccessKey="O" ToolTip="匯出Excel(ALT+O)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
