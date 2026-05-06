<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODM020.aspx.cs" AutoEventWireup="false" Inherits="OD.ODM020" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODM020 行事曆資料維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODM020" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label class="KeyField" ID="lbYear" runat="server">年度：</asp:Label>
                        <asp:TextBox ID="txYear" TabIndex="10" runat="server" CssClass="KeyFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div class="DivTable" id="Table1">
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label1" runat="server" Width="12.65em" Style="display: inline-block"></asp:Label>１
                                <asp:Label ID="Label2" runat="server" Width="8.75em" Style="display: inline-block"></asp:Label>２
                                <asp:Label ID="Label3" runat="server" Width="8.75em" Style="display: inline-block"></asp:Label>３
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label9" runat="server" Width="3.4em" Style="display: inline-block"></asp:Label>
                                    <asp:Label ID="Label7" runat="server">１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１</asp:Label>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="lb1" runat="server">一月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon1" TabIndex="20" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon2" runat="server">二月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon2" TabIndex="25" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                    <asp:TextBox ID="H_Len" TabIndex="-1" runat="server" CssClass="hide" Width="8px"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon3" runat="server">三月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon3" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon4" runat="server">四月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon4" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon5" runat="server">五月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon5" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon6" runat="server">六月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon6" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon7" runat="server">七月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon7" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon8" runat="server">八月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon8" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon9" runat="server">九月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon9" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon10" runat="server">十月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon10" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon11" runat="server">十一月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon11" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTDTitle" style="width: 3.5em">
                                    <asp:Label ID="Mon12" runat="server">十二月</asp:Label>
                                </div>
                                <div class="dTD">
                                    <asp:TextBox ID="txMon12" runat="server" MaxLength="31" Width="32.25em"></asp:TextBox>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label8" runat="server" Width="3.4em" Style="display: inline-block"></asp:Label>
                                    <asp:Label ID="Label10" runat="server">１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１</asp:Label>
                                </div>
                            </div>
                            <div class="dTR">
                                <div class="dTD">
                                    <asp:Label ID="Label4" runat="server" Width="12.65em" Style="display: inline-block">&nbsp;</asp:Label>１
                                <asp:Label ID="Label5" runat="server" Width="8.75em" Style="display: inline-block">&nbsp;</asp:Label>２
                                <asp:Label ID="Label6" runat="server" Width="8.75em" Style="display: inline-block"></asp:Label>３
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dTD">
                        <br><br>
                        <div class="DivTable" id="Table3">
                            <div class="dTR" style="width:13.5em">
                                <div class="dTD">
                                    <asp:Label ID="Label12" runat="server" Width="96px">日曆日調整：</asp:Label><br>
                                    連續假日
									<asp:TextBox ID="txConsectHD" TabIndex="10" runat="server" Width="1.5em" MaxLength="1"></asp:TextBox>天以上扣除<br>
                                    註:設定0天表示不調整<br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;設定1天等同於工作日
                                </div>
                            </div>
                            <div class="dTR" style="width:13.5em">
								<asp:Label ID="Label13" runat="server" Width="8em">扣抵聯休調整：</asp:Label><br>
								<asp:CheckBox id="cbSelect1" runat="server" text="明年1月1號為假日"></asp:CheckBox><br>
								<asp:CheckBox id="cbSelect2" runat="server" text="明年1月2號為假日"></asp:CheckBox>
                            </div>
                        </div>
                        <fieldset style="width: 13.5em;">
                            <div class="DivTable" id="Table4">
                                <div class="dTR">
                                    <div class="dTD">只允許全型字母</div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 3.5em">空白：</div>
                                    <div class="dTD">工作天</div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 3.5em">Ｈ：</div>
                                    <div class="dTD">例假日</div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 3.5em">Ｏ：</div>
                                    <div class="dTD">其他假日</div>
                                </div>
                                <div class="dTR">
                                    <div class="dTDTitle" style="width: 3.5em">＄：</div>
                                    <div class="dTD">無效日期</div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="放棄" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
