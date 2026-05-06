<%@ Page language="c#" Codebehind="IFM300C2.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM300C2" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFM300C2 代理人設定子視窗</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM300C2" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:listbox id="lbProxy" runat="server" CssClass="hidden"></asp:listbox><asp:listbox id="lbIsProxyOfAccount" runat="server" Width="50px" CssClass="hidden"></asp:listbox><asp:textbox id="authWS" runat="server" CssClass="hidden"></asp:textbox><asp:textbox id="txNowAccount" runat="server" CssClass="hidden"></asp:textbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    代理期間設定
                    <div class="dTR">
                        <div class="dTD">
                            <asp:datagrid id="dg2" runat="server" Width="832px" BackColor="White" ForeColor="Black" PageSize="50"
                                BorderStyle="None" BorderColor="#DEDFDE" BorderWidth="1px" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False" Height="1px">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label id="lbSeq" runat="server" Width="31px"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="代理期間">
                                        <ItemTemplate>
                                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txStartYear" runat="server" Width="2em" MaxLength="3"></asp:textbox>年
                                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txStartMonth" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>月
                                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txStartDay" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>日
                                            <asp:dropdownlist id="ddlStart" runat="server">
                                                <asp:ListItem Value="00">00</asp:ListItem>
                                                <asp:ListItem Value="01">01</asp:ListItem>
                                                <asp:ListItem Value="02">02</asp:ListItem>
                                                <asp:ListItem Value="03">03</asp:ListItem>
                                                <asp:ListItem Value="04">04</asp:ListItem>
                                                <asp:ListItem Value="05">05</asp:ListItem>
                                                <asp:ListItem Value="06">06</asp:ListItem>
                                                <asp:ListItem Value="07">07</asp:ListItem>
                                                <asp:ListItem Value="08">08</asp:ListItem>
                                                <asp:ListItem Value="09">09</asp:ListItem>
                                                <asp:ListItem Value="10">10</asp:ListItem>
                                                <asp:ListItem Value="11">11</asp:ListItem>
                                                <asp:ListItem Value="12">12</asp:ListItem>
                                                <asp:ListItem Value="13">13</asp:ListItem>
                                                <asp:ListItem Value="14">14</asp:ListItem>
                                                <asp:ListItem Value="15">15</asp:ListItem>
                                                <asp:ListItem Value="16">16</asp:ListItem>
                                                <asp:ListItem Value="17">17</asp:ListItem>
                                                <asp:ListItem Value="18">18</asp:ListItem>
                                                <asp:ListItem Value="19">19</asp:ListItem>
                                                <asp:ListItem Value="20">20</asp:ListItem>
                                                <asp:ListItem Value="21">21</asp:ListItem>
                                                <asp:ListItem Value="22">22</asp:ListItem>
                                                <asp:ListItem Value="23">23</asp:ListItem>
                                            </asp:dropdownlist>時
                                            <asp:dropdownlist id="ddlStart2" runat="server">
                                                <asp:ListItem Value="00">00</asp:ListItem>
                                                <asp:ListItem Value="01">01</asp:ListItem>
                                                <asp:ListItem Value="02">02</asp:ListItem>
                                                <asp:ListItem Value="03">03</asp:ListItem>
                                                <asp:ListItem Value="04">04</asp:ListItem>
                                                <asp:ListItem Value="05">05</asp:ListItem>
                                                <asp:ListItem Value="06">06</asp:ListItem>
                                                <asp:ListItem Value="07">07</asp:ListItem>
                                                <asp:ListItem Value="08">08</asp:ListItem>
                                                <asp:ListItem Value="09">09</asp:ListItem>
                                                <asp:ListItem Value="10">10</asp:ListItem>
                                                <asp:ListItem Value="11">11</asp:ListItem>
                                                <asp:ListItem Value="12">12</asp:ListItem>
                                                <asp:ListItem Value="13">13</asp:ListItem>
                                                <asp:ListItem Value="14">14</asp:ListItem>
                                                <asp:ListItem Value="15">15</asp:ListItem>
                                                <asp:ListItem Value="16">16</asp:ListItem>
                                                <asp:ListItem Value="17">17</asp:ListItem>
                                                <asp:ListItem Value="18">18</asp:ListItem>
                                                <asp:ListItem Value="19">19</asp:ListItem>
                                                <asp:ListItem Value="20">20</asp:ListItem>
                                                <asp:ListItem Value="21">21</asp:ListItem>
                                                <asp:ListItem Value="22">22</asp:ListItem>
                                                <asp:ListItem Value="23">23</asp:ListItem>
                                                <asp:ListItem Value="24">24</asp:ListItem>
                                                <asp:ListItem Value="25">25</asp:ListItem>
                                                <asp:ListItem Value="26">26</asp:ListItem>
                                                <asp:ListItem Value="27">27</asp:ListItem>
                                                <asp:ListItem Value="28">28</asp:ListItem>
                                                <asp:ListItem Value="29">29</asp:ListItem>
                                                <asp:ListItem Value="30">30</asp:ListItem>
                                                <asp:ListItem Value="31">31</asp:ListItem>
                                                <asp:ListItem Value="32">32</asp:ListItem>
                                                <asp:ListItem Value="33">33</asp:ListItem>
                                                <asp:ListItem Value="34">34</asp:ListItem>
                                                <asp:ListItem Value="35">35</asp:ListItem>
                                                <asp:ListItem Value="36">36</asp:ListItem>
                                                <asp:ListItem Value="37">37</asp:ListItem>
                                                <asp:ListItem Value="38">38</asp:ListItem>
                                                <asp:ListItem Value="39">39</asp:ListItem>
                                                <asp:ListItem Value="40">40</asp:ListItem>
                                                <asp:ListItem Value="41">41</asp:ListItem>
                                                <asp:ListItem Value="42">42</asp:ListItem>
                                                <asp:ListItem Value="43">43</asp:ListItem>
                                                <asp:ListItem Value="44">44</asp:ListItem>
                                                <asp:ListItem Value="45">45</asp:ListItem>
                                                <asp:ListItem Value="46">46</asp:ListItem>
                                                <asp:ListItem Value="47">47</asp:ListItem>
                                                <asp:ListItem Value="48">48</asp:ListItem>
                                                <asp:ListItem Value="49">49</asp:ListItem>
                                                <asp:ListItem Value="50">50</asp:ListItem>
                                                <asp:ListItem Value="51">51</asp:ListItem>
                                                <asp:ListItem Value="52">52</asp:ListItem>
                                                <asp:ListItem Value="53">53</asp:ListItem>
                                                <asp:ListItem Value="54">54</asp:ListItem>
                                                <asp:ListItem Value="55">55</asp:ListItem>
                                                <asp:ListItem Value="56">56</asp:ListItem>
                                                <asp:ListItem Value="57">57</asp:ListItem>
                                                <asp:ListItem Value="58">58</asp:ListItem>
                                                <asp:ListItem Value="59">59</asp:ListItem>
                                            </asp:dropdownlist>分
                                            <asp:textbox CssClass="DatePicker hide" id="H_txStartDate" runat="server"></asp:textbox>
                                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txEndYear" runat="server" Width="2em" MaxLength="3"></asp:textbox>年
                                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txEndMonth" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>月
                                            <asp:textbox onkeypress="jf_InpNumOnly()" id="txEndDay" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>日
                                            <asp:dropdownlist id="ddlEnd" runat="server">
                                                <asp:ListItem Value="00">00</asp:ListItem>
                                                <asp:ListItem Value="01">01</asp:ListItem>
                                                <asp:ListItem Value="02">02</asp:ListItem>
                                                <asp:ListItem Value="03">03</asp:ListItem>
                                                <asp:ListItem Value="04">04</asp:ListItem>
                                                <asp:ListItem Value="05">05</asp:ListItem>
                                                <asp:ListItem Value="06">06</asp:ListItem>
                                                <asp:ListItem Value="07">07</asp:ListItem>
                                                <asp:ListItem Value="08">08</asp:ListItem>
                                                <asp:ListItem Value="09">09</asp:ListItem>
                                                <asp:ListItem Value="10">10</asp:ListItem>
                                                <asp:ListItem Value="11">11</asp:ListItem>
                                                <asp:ListItem Value="12">12</asp:ListItem>
                                                <asp:ListItem Value="13">13</asp:ListItem>
                                                <asp:ListItem Value="14">14</asp:ListItem>
                                                <asp:ListItem Value="15">15</asp:ListItem>
                                                <asp:ListItem Value="16">16</asp:ListItem>
                                                <asp:ListItem Value="17">17</asp:ListItem>
                                                <asp:ListItem Value="18">18</asp:ListItem>
                                                <asp:ListItem Value="19">19</asp:ListItem>
                                                <asp:ListItem Value="20">20</asp:ListItem>
                                                <asp:ListItem Value="21">21</asp:ListItem>
                                                <asp:ListItem Value="22">22</asp:ListItem>
                                                <asp:ListItem Value="23">23</asp:ListItem>
                                            </asp:dropdownlist>時
                                            <asp:dropdownlist id="ddlEnd2" runat="server">
                                                <asp:ListItem Value="00">00</asp:ListItem>
                                                <asp:ListItem Value="01">01</asp:ListItem>
                                                <asp:ListItem Value="02">02</asp:ListItem>
                                                <asp:ListItem Value="03">03</asp:ListItem>
                                                <asp:ListItem Value="04">04</asp:ListItem>
                                                <asp:ListItem Value="05">05</asp:ListItem>
                                                <asp:ListItem Value="06">06</asp:ListItem>
                                                <asp:ListItem Value="07">07</asp:ListItem>
                                                <asp:ListItem Value="08">08</asp:ListItem>
                                                <asp:ListItem Value="09">09</asp:ListItem>
                                                <asp:ListItem Value="10">10</asp:ListItem>
                                                <asp:ListItem Value="11">11</asp:ListItem>
                                                <asp:ListItem Value="12">12</asp:ListItem>
                                                <asp:ListItem Value="13">13</asp:ListItem>
                                                <asp:ListItem Value="14">14</asp:ListItem>
                                                <asp:ListItem Value="15">15</asp:ListItem>
                                                <asp:ListItem Value="16">16</asp:ListItem>
                                                <asp:ListItem Value="17">17</asp:ListItem>
                                                <asp:ListItem Value="18">18</asp:ListItem>
                                                <asp:ListItem Value="19">19</asp:ListItem>
                                                <asp:ListItem Value="20">20</asp:ListItem>
                                                <asp:ListItem Value="21">21</asp:ListItem>
                                                <asp:ListItem Value="22">22</asp:ListItem>
                                                <asp:ListItem Value="23">23</asp:ListItem>
                                                <asp:ListItem Value="24">24</asp:ListItem>
                                                <asp:ListItem Value="25">25</asp:ListItem>
                                                <asp:ListItem Value="26">26</asp:ListItem>
                                                <asp:ListItem Value="27">27</asp:ListItem>
                                                <asp:ListItem Value="28">28</asp:ListItem>
                                                <asp:ListItem Value="29">29</asp:ListItem>
                                                <asp:ListItem Value="30">30</asp:ListItem>
                                                <asp:ListItem Value="31">31</asp:ListItem>
                                                <asp:ListItem Value="32">32</asp:ListItem>
                                                <asp:ListItem Value="33">33</asp:ListItem>
                                                <asp:ListItem Value="34">34</asp:ListItem>
                                                <asp:ListItem Value="35">35</asp:ListItem>
                                                <asp:ListItem Value="36">36</asp:ListItem>
                                                <asp:ListItem Value="37">37</asp:ListItem>
                                                <asp:ListItem Value="38">38</asp:ListItem>
                                                <asp:ListItem Value="39">39</asp:ListItem>
                                                <asp:ListItem Value="40">40</asp:ListItem>
                                                <asp:ListItem Value="41">41</asp:ListItem>
                                                <asp:ListItem Value="42">42</asp:ListItem>
                                                <asp:ListItem Value="43">43</asp:ListItem>
                                                <asp:ListItem Value="44">44</asp:ListItem>
                                                <asp:ListItem Value="45">45</asp:ListItem>
                                                <asp:ListItem Value="46">46</asp:ListItem>
                                                <asp:ListItem Value="47">47</asp:ListItem>
                                                <asp:ListItem Value="48">48</asp:ListItem>
                                                <asp:ListItem Value="49">49</asp:ListItem>
                                                <asp:ListItem Value="50">50</asp:ListItem>
                                                <asp:ListItem Value="51">51</asp:ListItem>
                                                <asp:ListItem Value="52">52</asp:ListItem>
                                                <asp:ListItem Value="53">53</asp:ListItem>
                                                <asp:ListItem Value="54">54</asp:ListItem>
                                                <asp:ListItem Value="55">55</asp:ListItem>
                                                <asp:ListItem Value="56">56</asp:ListItem>
                                                <asp:ListItem Value="57">57</asp:ListItem>
                                                <asp:ListItem Value="58">58</asp:ListItem>
                                                <asp:ListItem Value="59">59</asp:ListItem>
                                            </asp:dropdownlist>分
                                            <asp:textbox CssClass="DatePicker hide" id="H_txEndDate" runat="server"></asp:textbox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="代理事由">
                                        <ItemTemplate>
                                            <asp:TextBox id="proxyReason" MaxLength="120" runat="server"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:datagrid>
                        </div>
                    </div>
                    <div class="dTR">
                        <div class="dTD">
                            各角色代理人員設定
                            <DIV class="GridDiv" style="Width:619px ;HEIGHT: 272px;">
                                <asp:datagrid id="dg1" runat="server" BackColor="White" ForeColor="Black" PageSize="50"
                                    BorderStyle="None" BorderColor="#DEDFDE" BorderWidth="1px" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
                                    <Columns>
                                        <asp:TemplateColumn HeaderText="角色名稱">
                                            <ItemTemplate>
                                                <asp:Image id="imgRole" runat="server"></asp:Image>
                                                <asp:Label id="lbRole" runat="server" >Label</asp:Label>
                                                <asp:TextBox id="H_txRole" runat="server" CssClass="hide"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="代理人">
                                            <ItemTemplate>
                                                <asp:Label id="Labeldg1" runat="server" >第一代理：</asp:Label>
                                                <asp:TextBox id="txAccount1" runat="server" Width="63px"></asp:TextBox>
                                                <asp:TextBox id="H_txAccount1" runat="server" CssClass="hide"></asp:TextBox>
                                                <asp:TextBox id="txPlayRole1" runat="server" CssClass="displayOnly" Width="64px"></asp:TextBox>
                                                <asp:Button id="btSet1" runat="server" Text="設定"></asp:Button>
                                                <asp:Button id="btDel1" runat="server" Text="刪除"></asp:Button>
                                                <asp:Label id="Labeldg2" runat="server" >第二代理：</asp:Label>
                                                <asp:TextBox id="txAccount2" runat="server" Width="63px"></asp:TextBox>
                                                <asp:TextBox id="H_txAccount2" runat="server" CssClass="hide"></asp:TextBox>
                                                <asp:TextBox id="txPlayRole2" runat="server" CssClass="displayOnly" Width="63px"></asp:TextBox>
                                                <asp:Button id="btSet2" runat="server" Text="設定"></asp:Button>
                                                <asp:Button id="btDel2" runat="server" Text="刪除"></asp:Button>
                                                <asp:Label id="Labeldg3" runat="server" >第三代理：</asp:Label>
                                                <asp:TextBox id="txAccount3" runat="server" Width="60px"></asp:TextBox>
                                                <asp:TextBox id="H_txAccount3" runat="server" CssClass="hide"></asp:TextBox>
                                              <asp:TextBox id="txPlayRole3" runat="server" CssClass="displayOnly" Width="60px"></asp:TextBox>
                                                <asp:Button id="btSet3" runat="server" Text="設定"></asp:Button>
                                                <asp:Button id="btDel3" runat="server" Text="刪除"></asp:Button>
                                                <asp:Label id="Labeldg4" runat="server" >第四代理：</asp:Label>
                                                <asp:TextBox id="txAccount4" runat="server" Width="60px"></asp:TextBox>
                                                <asp:TextBox id="H_txAccount4" runat="server" CssClass="hide"></asp:TextBox>
                                                <asp:TextBox id="txPlayRole4" runat="server" CssClass="displayOnly" Width="60px"></asp:TextBox>
                                                <asp:Button id="btSet4" runat="server" Text="設定"></asp:Button>
                                                <asp:Button id="btDel4" runat="server" Text="刪除"></asp:Button>
                                                <asp:Label id="Labeldg5" runat="server" >第五代理：</asp:Label>
                                                <asp:TextBox id="txAccount5" runat="server" Width="60px"></asp:TextBox>
                                                <asp:TextBox id="H_txAccount5" runat="server" CssClass="hide"></asp:TextBox>
                                                <asp:TextBox id="txPlayRole5" runat="server" CssClass="displayOnly" Width="60px"></asp:TextBox>
                                                <asp:Button id="btSet5" runat="server" Text="設定"></asp:Button>
                                                <asp:Button id="btDel5" runat="server" Text="刪除"></asp:Button>
                                                <asp:Label id="Labeldg6" runat="server" >第六代理：</asp:Label>
                                                <asp:TextBox id="txAccount6" runat="server" Width="60px"></asp:TextBox>
                                                <asp:TextBox id="H_txAccount6" runat="server" CssClass="hide"></asp:TextBox>
                                                <asp:TextBox id="txPlayRole6" runat="server" CssClass="displayOnly" Width="60px"></asp:TextBox>
                                                <asp:Button id="btSet6" runat="server" Text="設定"></asp:Button>
                                                <asp:Button id="btDel6" runat="server" Text="刪除"></asp:Button>
                                                <asp:Label id="Labeldg7" runat="server" >第七代理：</asp:Label>
                                                <asp:TextBox id="txAccount7" runat="server" Width="60px"></asp:TextBox>
                                                <asp:TextBox id="H_txAccount7" runat="server" CssClass="hide"></asp:TextBox>
                                                <asp:TextBox id="txPlayRole7" runat="server" CssClass="displayOnly" Width="60px"></asp:TextBox>
                                                <asp:Button id="btSet7" runat="server" Text="設定"></asp:Button>
                                                <asp:Button id="btDel7" runat="server" Text="刪除"></asp:Button>
                                                <asp:Label id="Labeldg8" runat="server" >第八代理：</asp:Label>
                                                <asp:TextBox id="txAccount8" runat="server" Width="60px"></asp:TextBox>
                                                <asp:TextBox id="H_txAccount8" runat="server" CssClass="hide"></asp:TextBox>
                                                <asp:TextBox id="txPlayRole8" runat="server" CssClass="displayOnly" Width="60px"></asp:TextBox>
                                                <asp:Button id="btSet8" runat="server" Text="設定"></asp:Button>
                                                <asp:Button id="btDel8" runat="server" Text="刪除"></asp:Button>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="代理權利">
                                            <ItemTemplate>
                                                <asp:Button id="btSetPrivilege" runat="server" Text="設定"></asp:Button>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                        <asp:TemplateColumn HeaderText="代理帳號">
                                            <ItemTemplate>
                                                <asp:CheckBox id="cbIsProxyOfAccount" runat="server" Text="一併代理"></asp:CheckBox>
                                            </ItemTemplate>
                                        </asp:TemplateColumn>
                                    </Columns>
                                </asp:datagrid>
                            </DIV>
                        </div>
                    </div>
                </div>
			</div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btPreview" CssClass="hide" runat="server" Text="取得最新代理資料(N)" accesskey="N" title="取得最新代理資料(ALT+N)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
        </FORM>
	</BODY>
</HTML>
