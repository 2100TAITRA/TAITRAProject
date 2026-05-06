<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT120.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT120" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT120 條碼列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODT120" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="TypeTable" class="DivTable" style="margin-top: 0px; margin-bottom: 0px">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label8" runat="server">列印模式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32em">
                        <asp:RadioButton ID="rbSingleZone" TabIndex="10" runat="server" Text="單一區間列印" GroupName="ZONE"></asp:RadioButton>
                        <asp:RadioButton ID="rbReprint" TabIndex="10" runat="server" CssClass="hide" Text="條碼重印" GroupName="ZONE"></asp:RadioButton>
                        <asp:RadioButton ID="rbMultiZone" TabIndex="10" runat="server" Text="多區間列印" GroupName="ZONE"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label3" runat="server">使用年度：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32em">
                        <asp:TextBox ID="txUseYear" CssClass="InputFieldNumeric" runat="server" Width="2em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:Panel ID="plSingle" runat="server">
                <div id="SingleTable" class="DivTable" style="margin-top: 0px; margin-bottom: 0px">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label ID="Label6" runat="server">目前使用號：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 32em">
                            <asp:TextBox class="KeyUpperField" ID="txUseNo" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="5.5em" ReadOnly="True" MaxLength="15"></asp:TextBox>
                            <asp:Label ID="Label5" runat="server">列印張數：</asp:Label>
                            <asp:TextBox class="KeyFieldNumeric" ID="txNumber" TabIndex="20" runat="server" Width="3em" MaxLength="15"></asp:TextBox>
                        </div>
                    </div>
                    <div class="dTR" id="divSingleBarcodeRange">
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label class="KeyField" ID="Label1" runat="server">列印條碼區間：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 32em">
                            <asp:TextBox ID="txDocNoS" TabIndex="25" runat="server" CssClass="KeyField" Width="8em" MaxLength="15"></asp:TextBox>－
                            <asp:TextBox ID="txDocNoE" TabIndex="30" runat="server" CssClass="KeyField" Width="8em" MaxLength="15"></asp:TextBox>
                        </div>
                    </div>
                </div>
            </asp:Panel>
            <asp:Panel ID="plMulti" runat="server">
                <div id="Table1" class="DivTable" style="margin-top: 0px; margin-bottom: 0px">
                    <div class="dTR">
                        <div class="dTDTitle" style="width: 8em">
                            <asp:Label class="KeyField" ID="Label9" runat="server">列印條碼區間：</asp:Label>
                        </div>
                        <div class="dTD" style="width: 32em">
                            <asp:TextBox ID="txDocNoS_M" TabIndex="40" runat="server" CssClass="KeyField" Width="8em" MaxLength="15"></asp:TextBox>－
                            <asp:TextBox ID="txDocNoE_M" TabIndex="50" runat="server" CssClass="KeyField" Width="8em" MaxLength="15"></asp:TextBox>
                            <asp:Button ID="btAdd" TabIndex="55" runat="server" Text="加入" Width="3.5em"></asp:Button>
                        </div>
                    </div>
                </div>
                <div class="DivTable" style="margin-top: 0px; margin-bottom: 0px">
                    <div class="GridDiv" data-fixed="true">
                        <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" AllowCustomPaging="True" GridLines="Vertical" CellPadding="2" PageSize="5" HorizontalAlign="Left">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemTemplate>
                                        <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="列印區間">
                                    <ItemTemplate>
                                        <asp:Label ID="lbZone" runat="server"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="執行">
                                    <ItemTemplate>
                                        <asp:Button ID="btDel" runat="server" Text="刪除"></asp:Button>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
                    </div>
                </div>
            </asp:Panel>
            <div id="InfoTable" class="DivTable" style="margin-top: 0px; margin-bottom: 0px">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label11" runat="server">條碼資訊：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32em">
                        <asp:CheckBox ID="cbOrg" TabIndex="60" runat="server" Text="機關名稱：" Checked="True"></asp:CheckBox>
                        <asp:TextBox ID="txOrgName" TabIndex="61" runat="server" Width="16.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 32em">
                        <asp:CheckBox ID="ck2" TabIndex="70" runat="server" Text="日期：" Checked="True"></asp:CheckBox>
                        <asp:TextBox ID="txDate" CssClass="InputFieldNumeric" TabIndex="71" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 32em">
                        <asp:CheckBox ID="ck1" TabIndex="75" runat="server" Text="承辦單位：" Checked="True"></asp:CheckBox>
                        <cc1:ComboBox ID="dlDept" TabIndex="76" runat="server" CssClass="comboBox" Width="10em"></cc1:ComboBox>&nbsp;
                        <cc1:ComboBox ID="dlSubDept" TabIndex="76" runat="server" CssClass="comboBox" Width="10em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label4" runat="server">每列條碼數目：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32em">
                        <asp:RadioButton ID="rb1" TabIndex="80" runat="server" Text="一張" GroupName="grp"></asp:RadioButton>
                        <asp:RadioButton ID="rb2" TabIndex="80" runat="server" Text="三張" GroupName="grp"></asp:RadioButton>
                        <asp:RadioButton ID="rb3" TabIndex="80" runat="server" Text="四張" GroupName="grp"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 32em">
                        <asp:Label ID="Label2" runat="server">於</asp:Label>
                        <asp:TextBox ID="txPos" CssClass="InputFieldNumeric" TabIndex="90" runat="server" Width="1.5em" MaxLength="2"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">號位置印出</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">&nbsp;&nbsp;</div>
                    <div class="dTD" style="width: 32em">
                        <asp:CheckBox ID="cbElecDoc" TabIndex="100" runat="server" Text="不列印電子交換公文條碼"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label10" runat="server">列印方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 32em">
                        <asp:RadioButton ID="rbPrBar" runat="server" Text="條碼機" GroupName="PrWay"></asp:RadioButton>
                        <asp:RadioButton ID="rbPr" runat="server" Text="印表機" GroupName="PrWay"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <asp:Panel ID="H_Obj" runat="server" CssClass="hide" Width="380px" Height="120px">
                <asp:TextBox ID="H_SysDate" runat="server" Width="24px"></asp:TextBox>
                <asp:TextBox ID="H_DocStart" TabIndex="-1" runat="server" Width="24px"></asp:TextBox>
                <asp:TextBox ID="H_DocEnd" TabIndex="-1" runat="server" Width="24px"></asp:TextBox>
                <asp:TextBox ID="H_Zone" TabIndex="-1" runat="server" Width="24px"></asp:TextBox>
            </asp:Panel>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <div id="hiddenDiv" style="display: none; visibility: hidden; width: 708px; height: 42px">
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_SubDept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_SubDept_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSubDept_Value" runat="server" CssClass="hidden" Width="21px"></asp:TextBox>
            <asp:TextBox ID="H_DeptNo" runat="server" CssClass="hidden" Width="21px"></asp:TextBox>
        </div>
    </form>
</body>
</html>
