<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR240.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR240" %>

<%@ Register Assembly="Microsoft.Web.UI.WebControls" Namespace="Microsoft.Web.UI.WebControls" TagPrefix="iewc" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR240 承辦公文查詢列印作業</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="LIB/AK.css">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR240" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:DropDownList ID="dlDocType" TabIndex="2" runat="server"
                            Width="120px">
                            <asp:ListItem Value="1">公文文號</asp:ListItem>
                            <asp:ListItem Value="2">部收文號</asp:ListItem>
                            <asp:ListItem Value="3">會銜機關收文號</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDoc" TabIndex="4" runat="server" Width="7.7em"
                            MaxLength="15"></asp:TextBox>(起)－
						<asp:TextBox ID="txEDoc" TabIndex="6" runat="server" Width="7.7em"
                            MaxLength="15"></asp:TextBox>(迄)
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server">承辦單位：</asp:Label></div>
                    <div class="dTD" style="width: 10em">
                        <cc1:ComboBox ID="dlDept" TabIndex="10" runat="server" CssClass="comboBox" Width="7em"></cc1:ComboBox>
                        <cc1:ComboBox ID="dlSect" TabIndex="10" runat="server" CssClass="comboBox" style="padding-left:2em;" Width="7em"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 11em;">
                        <asp:Label ID="Label2" runat="server">承辦人：</asp:Label></div>
                    <div class="dTD" style="width: 8em;">
                        <cc1:ComboBox ID="dlUser" TabIndex="20" runat="server" CssClass="comboBox" Width="6em"></cc1:ComboBox></div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:DropDownList ID="dlDateType" TabIndex="17" runat="server" Width="8em"></asp:DropDownList></div>
                    <div class="dTD" style="width: 16em">
                        <asp:TextBox ID="txSDate" TabIndex="20" runat="server" CssClass="DatePicker" Width="3.7em" MaxLength="7"></asp:TextBox>－
						<asp:TextBox ID="txEDate" TabIndex="25" runat="server" CssClass="DatePicker" Width="3.7em" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="H_Value" TabIndex="-1" runat="server" CssClass="hide" Width="10em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label ID="Label6" runat="server">公文性質：</asp:Label></div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlProperty" TabIndex="27" runat="server" Width="9.5em"></asp:DropDownList></div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server" CssClass="">辦畢否：</asp:Label></div>
                    <div class="dTD" style="width: 18em">
                        <asp:RadioButton ID="rb3" TabIndex="40" runat="server" GroupName="gn" Text="已辦畢"></asp:RadioButton>
                        <asp:RadioButton ID="rb2" TabIndex="35" runat="server" GroupName="gn" Text="辦理中"></asp:RadioButton>
                        <asp:RadioButton Style="z-index: 0" ID="rbCancelDocNo" TabIndex="35" runat="server" GroupName="gn" Text="銷號"></asp:RadioButton>
                        <asp:RadioButton ID="rb1" TabIndex="30" runat="server" GroupName="gn" Text="全部"></asp:RadioButton>
                    </div>
                    <div class="dTDTitle">
                        <asp:Label ID="Label3" runat="server" Width="3em">類別：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox ID="H_Change" TabIndex="-1" runat="server" CssClass="hide" Width="16px"></asp:TextBox>
                        <asp:TextBox ID="H_Url" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
                        <asp:TextBox ID="H_Width" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
                        <asp:TextBox ID="H_Height" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
                        <asp:TextBox ID="H_Artifact" TabIndex="-1" runat="server" CssClass="hide" Width="10px"></asp:TextBox>
                        <asp:RadioButton ID="rb4" TabIndex="30" runat="server" GroupName="cls" Text="主辦"></asp:RadioButton>
                        <asp:RadioButton ID="rb5" TabIndex="35" runat="server" GroupName="cls" Text="會辦"></asp:RadioButton>
                        <asp:RadioButton ID="rb6" TabIndex="40" runat="server" GroupName="cls" Text="全部" Checked="True"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em" align="right">
                        <asp:Label ID="Label7" runat="server">辦結方式：</asp:Label></div>
                    <div class="dTD">
                        <asp:RadioButton ID="rb7" TabIndex="40" runat="server" GroupName="tp" Text="存查"></asp:RadioButton>
                        <asp:RadioButton ID="rb8" TabIndex="35" runat="server" GroupName="tp" Text="發文"></asp:RadioButton>
                        <asp:RadioButton ID="rb9" TabIndex="30" runat="server" GroupName="tp" Text="全部" Checked="True"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em" align="right">
                        <asp:Label ID="Label8" runat="server">歸檔否：</asp:Label></div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbfile1" TabIndex="40" runat="server" GroupName="fn" Text="已歸檔"></asp:RadioButton>
                        <asp:RadioButton ID="rbfile2" TabIndex="35" runat="server" GroupName="fn" Text="未歸檔"></asp:RadioButton>
                        <asp:RadioButton ID="rbfile3" TabIndex="30" runat="server" GroupName="fn" Text="全部" Checked="True"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label Style="z-index: 0" ID="Label10" runat="server">查詢公文類別：</asp:Label></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbRcvDoc" runat="server" Text="來文"></asp:CheckBox><asp:CheckBox Style="z-index: 0" ID="cbCreatDoc" runat="server" Text="創稿"></asp:CheckBox></div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label5" runat="server">主旨：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromSubject" TabIndex="30" runat="server" Width="25.2em"></asp:TextBox></div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">&nbsp;</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbCount" runat="server" Text="計算辦理天數"></asp:CheckBox>
					</div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label9" runat="server">排序：</asp:Label></div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrderDocNo" TabIndex="30" runat="server" GroupName="Order"
                            Text="公文文號" Checked="True"></asp:RadioButton><asp:RadioButton ID="rbOrderRcvDate" TabIndex="30" runat="server" GroupName="Order"
                                Text="收(創)文日"></asp:RadioButton><asp:RadioButton Style="z-index: 0" ID="rbOrderDueDate" TabIndex="30" runat="server"
                                    GroupName="Order" Text="限辦日期"></asp:RadioButton><asp:RadioButton Style="z-index: 0" ID="rbOrderEmp" TabIndex="30" runat="server"
                                        GroupName="Order" Text="承辦人"></asp:RadioButton><asp:RadioButton Style="z-index: 0" ID="rbOrderPdueDate" TabIndex="30" runat="server"
                                            GroupName="Order" Text="原始限辦日期"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide" Width="92px"></asp:ListBox>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="GridDiv" style="height: 262px;">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical" ShowHeader="True">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbNo" runat="server" CssClass="TextLabel" Width="1.5em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文文號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDocNo" runat="server" CssClass="TextLabel" Width="5em"></asp:Label><br>
                                            <asp:HyperLink ID="hlView" runat="server" CssClass="TextLabel">流程</asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="收(創)文日期<br>限辦日期">
                                        <ItemTemplate>
                                            <p>
                                                <asp:Label ID="lbRcvDate" runat="server" CssClass="TextLabel" Width="5em"></asp:Label><br>
                                                <asp:Label ID="lbDueDate" runat="server" CssClass="TextLabel" Width="5em"></asp:Label>
                                            </p>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="原始限辦日期">
                                        <ItemTemplate>
                                            <asp:Label Style="z-index: 0" ID="lbPdueDate" runat="server" CssClass="TextLabel" Width="5em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="結案日期<br>辦理天數">
                                        <ItemTemplate>
                                            <asp:Label ID="lbCloseDate" runat="server" CssClass="TextLabel" Width="5em"></asp:Label><br>
                                            <asp:Label ID="lbWorkDay" runat="server" CssClass="TextLabel" Width="5em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="目前所在位置<br>狀態">
                                        <ItemTemplate>
                                            <asp:Label ID="lbPosition" runat="server" CssClass="TextLabel" Width="5.5em"></asp:Label><br>
                                            <asp:Label ID="lbStatus" runat="server" CssClass="TextLabel" Width="5.5em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="公文性質">
                                        <ItemTemplate>
                                            <asp:Label Style="z-index: 0" ID="lbDocProperty" runat="server" CssClass="TextLabel" Width="5em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主會辦別<br>承辦人">
                                        <ItemTemplate>
                                            <asp:Label ID="lbType" runat="server" CssClass="TextLabel" Width="4em"></asp:Label><br>
                                            <asp:Label ID="lbUserName" Style="overflow: hidden" runat="server" Width="4em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="承辦單位">
                                        <ItemTemplate>
                                            <asp:Label ID="lbDeptName" runat="server" CssClass="TextLabel" Width="5.5em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="主旨">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSubject" runat="server" CssClass="TextLabel" Width="13em"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="開啟<br>電子檔">
                                        <ItemTemplate>
					                    	<asp:Button ID="btDocView" runat="server" Text="開啟" />
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<div style="width: 708px; display: none; height: 42px; visibility: hidden" id="hiddenDiv">
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_Sect" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_User" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox><asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox></div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" accesskey="O" title="匯出Excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Validator"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
