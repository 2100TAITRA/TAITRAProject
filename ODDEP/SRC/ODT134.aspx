<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT134.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT134" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODT134 待登錄電子收文查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="LIB/AK.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
    <style type="text/css">
        .SortBy:link {
            COLOR: white;
        }

        .SortBy:visited {
            COLOR: white;
        }

        .SortBy:hover {
            COLOR: white;
        }
    </style>
</head>
<body ms_positioning="GridLayout">
    <form id="ODT134" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <div class="hidden">
            <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
            <asp:TextBox ID="h_OrgNo" runat="server" CssClass="hidden" Width="1px"></asp:TextBox>
            <asp:TextBox ID="h_DeptNo" runat="server" CssClass="hidden" Width="1px"></asp:TextBox>
            <asp:TextBox ID="h_UserId" runat="server" CssClass="hidden" Width="1px"></asp:TextBox>
            <asp:HyperLink ID="hlFromDate" runat="server" CssClass="SortBy" Target="_self" NavigateUrl="">來文日期</asp:HyperLink>
            <asp:HyperLink ID="hllaDateTime" runat="server" CssClass="SortBy" Target="_self" NavigateUrl="">收文時間</asp:HyperLink>
            <asp:HyperLink ID="hlFromWord" runat="server" CssClass="SortBy" Target="_self" NavigateUrl="">來文字號</asp:HyperLink>
            <asp:HyperLink ID="hlFromOrg" runat="server" CssClass="SortBy" Target="_self" NavigateUrl="">來文機關</asp:HyperLink>
            <asp:HyperLink ID="hlRCV_ORG" runat="server" CssClass="SortBy" Target="_self" NavigateUrl="">受文者</asp:HyperLink>
            <asp:HyperLink ID="hlSignDate" runat="server" CssClass="SortBy" Target="_self" NavigateUrl="">個人專區</asp:HyperLink>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label8" runat="server">查詢狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19em">
                        <asp:RadioButton ID="rbToLogin" runat="server" Text="待登錄" GroupName="SearchType"></asp:RadioButton>
                        <asp:RadioButton ID="rbToDelete" runat="server" Text="待刪除" GroupName="SearchType"></asp:RadioButton>
                        <asp:RadioButton ID="rbPersonalArea" runat="server" CssClass="hide" Text="已張貼至個人專區" GroupName="SearchType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR" id="htrRcvDate">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" class="RequireField" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19em">
                        <asp:TextBox ID="txSDate" class="RequireFieldNumeric DatePicker" TabIndex="10" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">－</asp:Label>
                        <asp:TextBox ID="txEDate" class="RequireFieldNumeric DatePicker" TabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR" id="htrPasteDate">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label9" class="RequireField" runat="server">張貼日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPasteDateS" class="RequireFieldNumeric DatePicker" TabIndex="15" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:DropDownList ID="dlPasteHourS" runat="server" Width="2.5em"></asp:DropDownList>時
                        <asp:DropDownList ID="dlPasteMinuteS" runat="server" Width="2.5em"></asp:DropDownList>分－
                        <asp:TextBox ID="txPasteDateE" class="RequireFieldNumeric DatePicker" TabIndex="15" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:DropDownList ID="dlPasteHourE" runat="server" Width="2.5em"></asp:DropDownList>時
                        <asp:DropDownList ID="dlPasteMinuteE" runat="server" Width="2.5em"></asp:DropDownList>分
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">來文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19em">
                        <asp:TextBox ID="txFromNo" runat="server" Width="7.5em" MaxLength="13"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label5" runat="server">速別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSpeed" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19em">
                        <asp:TextBox ID="txOrgno" runat="server" Width="5.5em"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="-1" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txOrgName" TabIndex="-1" runat="server" CssClass="TextLabel" Width="10.5em"></asp:TextBox>
                        <asp:TextBox ID="H_Roler" TabIndex="-1" runat="server" CssClass="hide" Width="2px"></asp:TextBox>
                        <asp:TextBox ID="atweb" runat="server" CssClass="hide" Width="9px"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label6" runat="server">密等：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlSecNo" runat="server" Width="7.5em"></asp:DropDownList>
                        <asp:TextBox ID="H_Name" runat="server" CssClass="hide" Width="14px"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label10" runat="server">來源註記：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList Style="z-index: 0" ID="dlRcvtypeDesc" TabIndex="270" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbDelDesc" runat="server">刪除註記：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDelDesc" TabIndex="-1" runat="server" Width="10.5em" MaxLength="200"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <asp:Panel ID="dgTool" runat="server" CssClass="dTD DgSelectToolBar">
                        <asp:Button ID="btSelectAll" runat="server" CausesValidation="False" Text="全選"></asp:Button>
                        <asp:Button ID="btClear" runat="server" Text="清除"></asp:Button>
                        <asp:Button ID="btReverse" runat="server" Text="反向"></asp:Button>
                        <asp:Label ID="Label7" runat="server">排序依據：</asp:Label>
                        <asp:DropDownList ID="dlSort" runat="server"></asp:DropDownList>
                    </asp:Panel>
                </div>
                <div class="GridDiv" style="height: 17.5em" id="div">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" PageSize="50" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center" EnableViewState="true">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hl0" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbDelete" runat="server"></asp:CheckBox>
									<asp:TextBox ID="txdgDocumentId" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="信心<br>燈號">
                                <ItemTemplate>
                                    <asp:Image ID="imgConflight" runat="server"></asp:Image>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="EMAIL" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                    <ItemTemplate>
                                        <asp:Button ID="btSendMail" runat="server" Width="3.5em" Text="寄送"></asp:Button>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文日期<br>收文時間">
                                <ItemTemplate>
                                    <asp:Label ID="txFromDate" TabIndex="-1" runat="server" CssClass="TextLabel" ReadOnly="True"></asp:Label><br>
                                    <asp:Label ID="laDateTime" runat="server">0930101</asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來文字號<br>來文機關">
                                <ItemTemplate>
                                    <asp:HyperLink ID="hl1" runat="server"></asp:HyperLink>
                                    <br>
                                    <asp:Label ID="lbFromOrgno" Style="overflow: hidden" runat="server" CssClass="PopUp"></asp:Label>
                                    <asp:TextBox ID="H_txFromNoWord" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                    <asp:TextBox ID="H_txDocNo" TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="電子檔">
                                <ItemTemplate>
                                    <asp:Button ID="btOpenElec" runat="server" Text="開啟"></asp:Button>
                                    <asp:TextBox ID="H_ID" TabIndex="-1" runat="server" CssClass="hide" Width="13px" ReadOnly="True"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="主旨">
                                <ItemTemplate>
                                    <asp:Label Style="overflow: hidden; display:inline-block; height:1.5em" ID="lbFromSubject" runat="server" Width="9.5em" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="受文者">
                                <ItemTemplate>
                                    <asp:Label ID="lbRCV_ORG" Style="overflow: hidden" runat="server" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="來源註記">
                                <ItemTemplate>
                                    <asp:Label ID="lbRCVDESC_NAME" Style="overflow: hidden" runat="server" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="發文方重發原因<br>發文方重發備註">
                                <ItemTemplate>
                                    <div class="DivTable">
                                        <div class="dTR">
                                            <div class="dTD" style="width: 6.0em">
                                                <asp:Label ID="lbDuplicateReason" runat="server" Style="overflow: hidden;" CssClass="PopUp" Width="5.5em"></asp:Label>
                                                <asp:Label ID="lbDuplicateRemark" runat="server" Style="overflow: hidden;" CssClass="PopUp" Width="5.5em"></asp:Label>
                                            </div>
                                        </div>
                                        <div class="dTD">
                                            <asp:Button ID="btDuplicateInfo" runat="server" CssClass="hide" Width="5.5em" UseSubmitBehavior="FALSE" Text="相同來文資訊"></asp:Button>
                                        </div>
                                    </div>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="刪除註記">
                                <ItemTemplate>
                                    <asp:TextBox ID="txDelReason" runat="server" MaxLength="15" CssClass="PopUp" BackColor="White" BorderStyle="Inset" ForeColor="Navy"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="人民陳情流水號" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                <ItemTemplate>
                                    <asp:TextBox ID="txOuterNo" runat="server" CssClass="hidden"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="個人專區" HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
                                <ItemTemplate>
                                    <asp:Button ID="btPost" runat="server" Text="張貼"></asp:Button>
                                    <asp:Label ID="lbPostDateTime" CssClass="hide" runat="server"></asp:Label>
                                    <asp:Label ID="lbPsersonalSeq" CssClass="hide" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="刪除註記">
                                <ItemTemplate>
                                    <asp:Label ID="lbDelDesc" runat="server" Style="overflow: hidden" CssClass="PopUp"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="簽收時間">
                                <ItemTemplate>
                                    <asp:Label ID="lbSignDate" runat="server"></asp:Label><br>
                                    <asp:Label ID="lbSignTime" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <div style="visibility: hidden" id="hiddenDiv">
            <asp:TextBox ID="H_ODT132" runat="server" CssClass="hidden" Width="14px"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="搜索" ID="btSearch"></asp:Button>
            <asp:Button runat="server" DefaultStyle="newmode:block;modifymode:block;" Text="註記刪除(C)" ID="btMarkDelete" AccessKey="C" Title="註記刪除(ALT+C)"></asp:Button>
            <asp:Button runat="server" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" Text="復原(R)" ID="btRestore" AccessKey="R" Title="復原(ALT+R)"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="刪除" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="清除" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
