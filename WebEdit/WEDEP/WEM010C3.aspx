<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="WEM010C3.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEM010C3" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register assembly="Microsoft.Web.UI.WebControls" namespace="Microsoft.Web.UI.WebControls" tagprefix="iewc" %>
<!DOCTYPE HTML  >
<HTML>
	<head>
    <title>WEM010C3 受文者差異子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	<!--#include file="/STDN/Lib/Script.shtml"-->
    </head>
<body ms_positioning="GridLayout">
    <form id="WEM010C3" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
		<div class="DivBaseTable" id="BaseTable">
			<div class="dTR">
				<div class="dTD">
			<div class="DivTable">
              <div class="GridDiv" >
                       <asp:datagrid id="dg1" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE"
									ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="50">
                            <Columns>
                                <asp:TemplateColumn HeaderText="序">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:Label ID="lbseq" runat="server" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="受文者">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:TextBox ID="txOrgName" runat="server" Width="9em"></asp:TextBox>
                                        <asp:TextBox ID="txSysid" runat="server" ></asp:TextBox>
                                        <asp:TextBox ID="txBselect" runat="server" CssClass="hide"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="姓名">
                                    <ItemStyle HorizontalAlign="Center" ></ItemStyle>
                                    <ItemTemplate>
                                        <asp:TextBox ID="txName" runat="server" Width="4.5em"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="正副本稱謂">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:TextBox ID="txFullname" runat="server" Width="9em"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="發文&lt;BR&gt;方式">
                                    <ItemTemplate>
                                        <asp:DropDownList ID="DLissuetype" runat="server" Width="4em">
                                        <asp:ListItem Value="1">人工</asp:ListItem>
										<asp:ListItem Value="2">郵寄</asp:ListItem>
										<asp:ListItem Value="3">電子</asp:ListItem>
                                        <asp:ListItem Value="4">電郵</asp:ListItem>
                                         <asp:ListItem Value="5">內部</asp:ListItem>
                                         <asp:ListItem Value="6">外部</asp:ListItem>
                                         <asp:ListItem Value="7">海外</asp:ListItem>
                                        </asp:DropDownList>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="選">
                                    <ItemTemplate>
                                        <asp:RadioButton ID="rbselect" runat="server" Width="1.5em"></asp:RadioButton>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="郵遞&lt;BR&gt;區號">
                                    <ItemStyle HorizontalAlign="Center" ></ItemStyle>
                                    <ItemTemplate>
                                        <asp:TextBox ID="txSpono" runat="server" Width="3em" ></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="地址">
                                    <ItemTemplate>
                                        <asp:TextBox ID="txAddress" runat="server" Width="15em"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                                <asp:TemplateColumn HeaderText="電子郵件">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                        <asp:TextBox ID="txEmail" runat="server" Width="8em"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
								 <asp:TemplateColumn HeaderText="機關代碼">
                                    <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                    <ItemTemplate>
                                         <asp:TextBox ID="txStdid" runat="server" Width="9.5em"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateColumn>
                            </Columns>
                        </asp:DataGrid>
				</div>
			</div>

			</div>
				</div>
				<div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
					<asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
					<asp:TextBox ID="H_txLocalPath" runat="server" CssClass="hide" TextMode="MultiLine"></asp:TextBox>
					<asp:TextBox ID="H_txWorkMode" runat="server" CssClass="hide"></asp:TextBox>
					<asp:TextBox ID="H_ShowUpdate" runat="server" CssClass="hide"></asp:TextBox>
					<asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px"
					runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
					<asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px"
					runat="server" CssClass="hidden"></asp:ValidationSummary>
				</div>
        </div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="回寫受文者子視窗" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btUpdate" runat="server" Text="更新資料庫資料" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
    </form>
    </body>
</HTML>
