<?xml version="1.0" encoding="Big5"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" omit-xml-declaration="yes" indent="yes" encoding="Big5" />
<export:supported-doctypes xmlns:export="http://www.2100t.com.tw/2008/OD/Export">令|獎懲令|函|獎懲建議函|公告|開會通知單|簽|疾病管制署請辦單|代判部稿|代判部稿-書函|代判部稿-開會通知單</export:supported-doctypes>
<xsl:variable name="exch"></xsl:variable>
<xsl:variable name="分繕發文">false</xsl:variable>
<xsl:variable name="行文單位保密">false</xsl:variable>
<xsl:variable name="副本行文單位保密"/>
<xsl:variable name="受文者全銜"/>
<xsl:variable name="受文者本別"/>
<xsl:variable name="受文者正式名稱"/>
<xsl:variable name="受文者單位代碼"/>
<xsl:variable name="受文者機關代碼"/>
<xsl:variable name="含附件"/>
<xsl:variable name="受文者姓名"/>
<xsl:variable name="受文者職稱"/>

<xsl:template match="/">
	<xsl:apply-templates select="*"/>
</xsl:template>

<xsl:template match="令|獎懲令">
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="doctype">令</xsl:with-param>
		<xsl:with-param name="dtd">97_1.dtd</xsl:with-param>
	</xsl:call-template>
	<令>
		<xsl:call-template name="Make發文機關"/>
		<xsl:call-template name="Make令類別"/>
		<xsl:call-template name="Make地址"/>
		<xsl:call-template name="Make聯絡方式"/>
		<xsl:call-template name="Make受文者"/>
		<xsl:call-template name="Make發文日期"/>
		<xsl:call-template name="Make發文字號"/>
		<xsl:call-template name="Make速別"/>
		<xsl:call-template name="Make密等及解密條件"/>
		<xsl:call-template name="Make附件"/>
		<xsl:call-template name="Make主旨"/>
		<xsl:call-template name="Make段落"/>
		<xsl:call-template name="Make正本"/>
		<xsl:call-template name="Make副本"/>
		<xsl:call-template name="Make署名"/>
	</令>
</xsl:template>

<xsl:template match="函|獎懲建議函|代判部稿|代判部稿-書函"><!-- 2013/4/22 港務基隆分公司新增'代判部稿'、'代判部稿-書函'等客製文別需轉為可交換'函' -->
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="doctype">函</xsl:with-param>
		<xsl:with-param name="dtd">97_2.dtd</xsl:with-param>
	</xsl:call-template>
	<函>
		<xsl:call-template name="Make發文機關"/>
		<xsl:call-template name="Make函類別"/>
		<xsl:call-template name="Make地址"/>
		<xsl:call-template name="Make聯絡方式"/>
		<xsl:call-template name="Make受文者"/>
		<xsl:call-template name="Make發文日期"/>
		<xsl:call-template name="Make發文字號"/>
		<xsl:call-template name="Make速別"/>
		<xsl:call-template name="Make密等及解密條件"/>
		<xsl:call-template name="Make附件"/>
		<xsl:call-template name="Make主旨"/>
		<xsl:call-template name="Make函標準段落"/><!-- 改用Make函標準段落以排除 雲科大 專屬的'會簽'段落, 不要匯出 -->
		<xsl:call-template name="Make正本">
			<xsl:with-param name="keeptagname">true</xsl:with-param>
		</xsl:call-template>
		<xsl:call-template name="Make副本"/>
		<!--
		<xsl:call-template name="Make署名"/>
		-->
	</函>
</xsl:template>

<xsl:template match="公告">
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="dtd">97_3.dtd</xsl:with-param>
	</xsl:call-template>
	<公告>
		<xsl:call-template name="Make發文機關"/>
		<xsl:call-template name="Make發文日期"/>
		<xsl:call-template name="Make發文字號"/>
		<xsl:call-template name="Make附件"/>
		<xsl:call-template name="Make主旨"/>
		<xsl:call-template name="Make段落"/>
	</公告>
</xsl:template>


<xsl:template match="開會通知單|代判部稿-開會通知單"><!-- 2013/4/22 港務基隆分公司新增'代判部稿-開會通知單'客製文別需轉為可交換'開會通知單' -->
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="dtd">97_4.dtd</xsl:with-param>
	</xsl:call-template>
	<開會通知單>
		<xsl:call-template name="Make發文機關"/>
		<xsl:call-template name="Make受文者"/>
		<xsl:call-template name="Make聯絡人及電話"/>
		<xsl:call-template name="Make發文日期"/>
		<xsl:call-template name="Make發文字號"/>
		<xsl:call-template name="Make速別"/>
		<xsl:call-template name="Make密等及解密條件"/>
		<xsl:call-template name="Make附件"/>
		<xsl:call-template name="Make開會事由"/>
		<xsl:call-template name="Make開會時間"/>
		<xsl:call-template name="Make開會地點"/>
		<xsl:call-template name="Make主持人"/>
		<xsl:call-template name="Make出席者"/>
		<xsl:call-template name="Make列席者"/>
		<xsl:call-template name="Make副本"/>
		<xsl:call-template name="Make備註"/>
		<!--
		<xsl:call-template name="Make署名"/>
		-->
	</開會通知單>
</xsl:template>

<xsl:template match="簽">
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="dtd">97_5.dtd</xsl:with-param>
	</xsl:call-template>
	<簽>
		<xsl:call-template name="Make機關或單位"/>
		<xsl:call-template name="Make受文者"/>
		<xsl:call-template name="Make主旨"/>
		<xsl:call-template name="Make段落"/>
		<署名><xsl:value-of select="署名"/></署名>
		<xsl:call-template name="Make年月日"/>
	</簽>
</xsl:template>

<!-- 2012/8/9 疾管局專用文別-疾病管制局請辦單, 可使用特殊交換方式電子交換 -->
<!-- 2013/8/1 衛福部組改, 疾病管制局請辦單改為疾病管制署請辦單 -->
<xsl:template match="疾病管制署請辦單">
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="dtd">97_cdc1.dtd</xsl:with-param>
	</xsl:call-template>
	<疾病管制署請辦單>
		<xsl:call-template name="Make發文機關"/>
		<xsl:call-template name="Make受文者"/>
		<發文單位><xsl:value-of select="發文機關列表/發文機關/承辦單位"/></發文單位>
		<xsl:call-template name="Make發文日期"/>
		<承辦人>
			<姓名><xsl:value-of select="發文機關列表/發文機關/承辦人"/></姓名>
		</承辦人>
		<電話><xsl:value-of select="發文機關列表/發文機關/聯絡電話"/>
			<xsl:if test="發文機關列表/發文機關/分機 != ''">#<xsl:value-of select="發文機關列表/發文機關/分機"/></xsl:if>
		</電話>
		<電子郵件><xsl:value-of select="發文機關列表/發文機關/Email"/></電子郵件>
		<主旨>
			<文字>
				<xsl:choose>
					<xsl:when test="段落/文字/text()"><xsl:value-of select="段落/文字"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="段落/條列[1]/文字"/></xsl:otherwise>
				</xsl:choose>
			</文字>
		</主旨>
		<xsl:call-template name="Make段落"/>
		<xsl:call-template name="Make附件"/><!-- 2013/7/2 疾管局請辦單新增附件標籤, PS:現場請勿自行修改此檔案而不提需求, 以免版更時再來抱怨版更前有什麼標籤或屬性但在版更後異常這種問題 -->
		<xsl:call-template name="Make正本"/>
		<xsl:call-template name="Make副本"/>
	</疾病管制署請辦單>
</xsl:template>

<!-- 2012/8/9 疾管局專用文別-衛生署請辦單, 可使用特殊交換方式電子交換 >
<xsl:template match="衛生署請辦單">
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="dtd">97_cdc2.dtd</xsl:with-param>
	</xsl:call-template>
	<衛生署請辦單>
		<xsl:call-template name="Make發文機關"/>
		<xsl:call-template name="Make受文者"/>
		<發文單位>疾病管制局</發文單位>
		<xsl:call-template name="Make發文日期"/>
		<承辦人>
			<姓名><xsl:value-of select="發文機關列表/發文機關/承辦人"/></姓名>
		</承辦人>
		<電話><xsl:value-of select="發文機關列表/發文機關/聯絡電話"/>
			<xsl:if test="發文機關列表/發文機關/分機 != ''">#<xsl:value-of select="發文機關列表/發文機關/分機"/></xsl:if>
		</電話>
		<電子郵件><xsl:value-of select="發文機關列表/發文機關/Email"/></電子郵件>
		<xsl:call-template name="Make段落"/>
		<xsl:call-template name="Make正本"/>
		<xsl:call-template name="Make副本"/>
	</衛生署請辦單>
</xsl:template-->

<xsl:template name="MakeDOCTYPE">
	<xsl:param name="doctype"><xsl:value-of select="name()"/></xsl:param>
	<xsl:param name="dtd"></xsl:param>
	<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE </xsl:text>
		<xsl:value-of select="$doctype"/>
	<xsl:text> SYSTEM "</xsl:text>
		<xsl:value-of select="$dtd"/>
	<xsl:text disable-output-escaping="yes">" [&#10;</xsl:text>
	<xsl:if test="string-length($exch) > 0">
		<xsl:text disable-output-escaping="yes">&lt;!ENTITY 名單 SYSTEM "</xsl:text>
			<xsl:value-of select="$exch"/>
		<xsl:text disable-output-escaping="yes">" NDATA DI&gt;&#10;</xsl:text>
		<xsl:text disable-output-escaping="yes">&lt;!NOTATION DI SYSTEM ""&gt;&#10;</xsl:text>
	</xsl:if>
	<xsl:if test="附件列表/附件檔名">
		<xsl:call-template name="MakeAttachments"/>
	</xsl:if>
	<xsl:text disable-output-escaping="yes">]&gt;&#10;</xsl:text>
</xsl:template>

<xsl:template name="MakeAttachments">
	<xsl:for-each select="附件列表/附件檔名">
		<xsl:text disable-output-escaping="yes">&lt;!ENTITY </xsl:text>
			<xsl:value-of select="@附件名"/>
		<xsl:text> SYSTEM "</xsl:text>
			<xsl:value-of select="."/>
		<xsl:text disable-output-escaping="yes">" NDATA ATTACH&gt;&#10;</xsl:text>
	</xsl:for-each>
	<xsl:text disable-output-escaping="yes">&lt;!NOTATION ATTACH SYSTEM ""&gt;&#10;</xsl:text>
</xsl:template>

<xsl:template name="Make發文機關">
	<xsl:apply-templates select="發文機關列表/發文機關[1]"/>
</xsl:template>

<xsl:template name="Make函類別">
	<xsl:choose>
		<xsl:when test="string-length(函類別/@代碼)">
			<xsl:choose><!-- 2013/4/22 港務基隆分公司的'代判總公司函'客製函類別需轉為'函'才能電子交換 -->
				<xsl:when test="函類別/@代碼 = '代判總公司函'">
					<函類別 代碼="函"/>
				</xsl:when>
				<xsl:when test="contains(函類別/@代碼, '代判部稿')"><!-- 2013/07/02 港務公司的代判部稿函、代判部稿-書函樣版已改成文別'函'，函類別'代判部稿函'、'代判部稿書函'，故增加判斷來轉成正確函類別 -->
					<xsl:element name="函類別">
						<xsl:attribute name="代碼"><xsl:value-of select="substring-after(函類別/@代碼, '代判部稿')"/></xsl:attribute>
					</xsl:element>
				</xsl:when>
				<xsl:otherwise>
					<xsl:apply-templates select="函類別"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:when test="name(.) = '獎懲建議函'">
			<函類別><xsl:attribute name="代碼"><xsl:value-of select="name(.)"/></xsl:attribute></函類別>
		</xsl:when>
		<xsl:when test="name(.) = '代判部稿'"><!-- 2013/4/22 港務基隆分公司的'代判部稿'客製文別需轉為'函'才能電子交換 -->
			<函類別 代碼="函"/>
		</xsl:when>
		<xsl:when test="name(.) = '代判部稿-書函'"><!-- 2013/4/22 港務基隆分公司的'代判部稿-書函'客製文別需轉為'書函'才能電子交換 -->
			<函類別 代碼="書函"/>
		</xsl:when>
		<xsl:otherwise>
			<函類別 代碼="函"/>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="Make令類別">
	<xsl:choose>
		<xsl:when test="令類別">
			<xsl:apply-templates select="令類別"/>
		</xsl:when>
		<xsl:when test="函類別">
			<xsl:element name="令類別">
				<xsl:attribute name="代碼">
					<xsl:choose>
						<xsl:when test="string-length(函類別/@代碼)">
							<xsl:value-of select="函類別/@代碼"/>
						</xsl:when>
						<xsl:when test="name(.) = '獎懲令'">
							<xsl:value-of select="name(.)"/>
						</xsl:when>
						<xsl:otherwise>令</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
			</xsl:element>
		</xsl:when>
		<xsl:otherwise>
			<xsl:element name="令類別">
				<xsl:attribute name="代碼">
					<xsl:choose>
						<xsl:when test="name(.) = '獎懲令'">
							<xsl:value-of select="name(.)"/>
						</xsl:when>
						<xsl:otherwise>令</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
			</xsl:element>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="Make地址">
	<xsl:apply-templates select="發文機關列表/發文機關[1]/機關地址"/>
</xsl:template>

<xsl:template name="Make聯絡方式">
	<!-- 2012/9/19 保一樣版會有職稱欄位(在根節點下)須冠在承辦人姓名前 -->
	<聯絡方式>聯絡人：<xsl:value-of select="職稱"/><xsl:value-of select="發文機關列表/發文機關[1]/承辦人"/></聯絡方式>
	<xsl:if test="string-length(string(發文機關列表/發文機關[1]/聯絡電話))">
	<xsl:element name="聯絡方式">聯絡電話：<xsl:value-of select="發文機關列表/發文機關[1]/聯絡電話"/><xsl:if test="string-length(string(發文機關列表/發文機關[1]/分機))">分機：<xsl:value-of select="發文機關列表/發文機關[1]/分機"/></xsl:if></xsl:element>
	</xsl:if>
	<xsl:if test="string-length(string(發文機關列表/發文機關[1]/傳真))">
		<聯絡方式>傳真：<xsl:value-of select="發文機關列表/發文機關[1]/傳真"/></聯絡方式>
	</xsl:if>
	<xsl:if test="string-length(string(發文機關列表/發文機關[1]/Email))">
		<聯絡方式>電子信箱：<xsl:value-of select="發文機關列表/發文機關[1]/Email"/></聯絡方式>
	</xsl:if>
</xsl:template>

<xsl:template name="Make聯絡人及電話">
	<聯絡人及電話>
	<!-- 2012/9/19 保一樣版會有職稱欄位(在根節點下)須冠在承辦人姓名前 -->
	<姓名><xsl:value-of select="職稱"/><xsl:value-of select="發文機關列表/發文機關[1]/承辦人"/></姓名>
	<電話><xsl:value-of select="發文機關列表/發文機關[1]/聯絡電話"/></電話>
	</聯絡人及電話>
</xsl:template>

<xsl:template name="Make受文者">
	<受文者>
		<xsl:choose>
			<xsl:when test="string-length($exch) > 0">
				<交換表 交換表單="名單">
					<xsl:value-of select="受文者列表/文字"/>
				</交換表>
			</xsl:when>
			<xsl:when test="$分繕發文 = 'true'">
				<xsl:choose>
					<xsl:when test="string-length($受文者姓名) > 0">
						<姓名><xsl:value-of select="$受文者姓名"/></姓名>
						<xsl:if test="string-length($受文者職稱) > 0">
							<職稱><xsl:value-of select="$受文者職稱"/></職稱>
						</xsl:if>
						<機關代碼><xsl:value-of select="$受文者機關代碼"/></機關代碼>
						<xsl:if test="string-length($受文者單位代碼) = 7">
							<單位代碼><xsl:value-of select="$受文者單位代碼"/></單位代碼>
						</xsl:if>
					</xsl:when>
					<xsl:when test="string-length($受文者單位代碼) = 7">
						<單位名><xsl:value-of select="$受文者正式名稱"/></單位名>
						<機關代碼><xsl:value-of select="$受文者機關代碼"/></機關代碼>
						<單位代碼><xsl:value-of select="$受文者單位代碼"/></單位代碼>
					</xsl:when>
					<xsl:otherwise>
						<全銜><xsl:value-of select="$受文者正式名稱"/></全銜>
						<機關代碼><xsl:value-of select="$受文者機關代碼"/></機關代碼>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:if test="//附件列表/附件檔名">
					<xsl:choose>
						<xsl:when test="$含附件 = '是'">
							<含附件>含附件</含附件>
						</xsl:when>
						<xsl:otherwise>
							<含附件>不含附件</含附件>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
			</xsl:otherwise>
		</xsl:choose>
	</受文者>
</xsl:template>

<xsl:template name="Make速別">
	<xsl:apply-templates select="速別"/>
</xsl:template>

<xsl:template name="Make密等及解密條件">
	<xsl:apply-templates select="密等及解密條件"/>
	<xsl:apply-templates select="密等及解密條件或保密期限"/>
</xsl:template>

<xsl:template name="Make發文日期">
	<xsl:apply-templates select="發文日期"/>
</xsl:template>

<xsl:template name="Make發文字號">
		<xsl:apply-templates select="發文字號"/>
</xsl:template>

<xsl:template name="Make附件">
	<附件>
		<!-- 2012/7/9 先檢查 附件列表/文字 是否存在, 也許有少數XML沒有此標籤, 此時要新增一個空的 文字, 以符合DTD定義 -->
		<xsl:choose>
			<xsl:when test="附件列表/文字">
				<xsl:apply-templates select="附件列表/文字"/>
			</xsl:when>
			<xsl:otherwise>
				<文字></文字>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:if test="附件列表/附件檔名/text()">
		<xsl:element name="附件檔名">
			<xsl:attribute name="附件名">
				<xsl:for-each select="附件列表/附件檔名">
					<xsl:value-of select="@附件名"/><xsl:if test="position() != last()"><xsl:text disable-output-escaping="yes"> </xsl:text></xsl:if>
				</xsl:for-each>
			</xsl:attribute>
		</xsl:element>
		</xsl:if>
	</附件>
</xsl:template>

<xsl:template name="Make主旨">
	<xsl:apply-templates select="主旨"/>
</xsl:template>

<xsl:template name="Make段落">
	<xsl:apply-templates select="段落"/>
</xsl:template>

<!-- 排除 雲科大 專屬的"會簽"段落, 不要匯出 -->
<xsl:template name="Make函標準段落">
	<xsl:apply-templates select="段落[@段名='說明：' or @段名='辦法：' or @段名='' or @段名='　' or @段名=' ']"/><!-- 2013/6/14 增加空白段名, 因為獎懲建議函會用到 -->
</xsl:template>

<xsl:template name="Make開會事由">
	<xsl:apply-templates select="開會事由"/>
</xsl:template>

<xsl:template name="Make開會時間">
	<xsl:choose>
		<xsl:when test="開會時間/時分"><!-- 2013/7/11 新增, 土銀的樣板的"開會時間"沒有"時分", 而是另一個同層的"開會時分" -->
			<xsl:apply-templates select="開會時間"/>
		</xsl:when>
		<xsl:otherwise>
			<開會時間>
				<年月日><xsl:value-of select="開會時間/年月日"/></年月日>
				<星期><xsl:value-of select="開會時間/星期"/></星期>
				<時分><xsl:value-of select="開會時分"/></時分>
			</開會時間>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="Make開會地點">
	<xsl:apply-templates select="開會地點"/>
</xsl:template>

<xsl:template name="Make主持人">
	<主持人>
		<!-- 2013/3/7 新增土銀要求的正副本稱謂邏輯(含不含附件、除外) -->
		<xsl:choose>
			<xsl:when test="contains(發文機關列表/發文機關/全銜, '臺灣土地銀行')">
				<xsl:call-template name="Make土銀正副本稱謂">
					<xsl:with-param name="type">主持人</xsl:with-param>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:for-each select="受文者列表/受文者[@本別='主持人'] | 受文者列表/受文者列表[@本別='主持人']">
					<xsl:apply-templates select="."/>
				</xsl:for-each>
			</xsl:otherwise>
		</xsl:choose>
	</主持人>	
</xsl:template>

<xsl:template name="Make正本">
	<xsl:param name="keeptagname">false</xsl:param>
	<xsl:if test="$keeptagname = 'true'">
		<xsl:text disable-output-escaping="yes">&lt;正本&gt;</xsl:text>
	</xsl:if>
	<xsl:choose>
		<!-- 2011/5/31 CDC正副本取代模式 -->
		<!-- 2012/1/19 取消$分繕發文判定, 以支援SW的分繕 -->
		<xsl:when test="@正副本取代模式 = 'True'">
			<xsl:if test="$keeptagname != 'true'">
				<xsl:text disable-output-escaping="yes">&lt;正本&gt;</xsl:text>
			</xsl:if>
			<xsl:choose>
				<xsl:when test="$受文者全銜 = '行政院衛生署人事室' or $受文者全銜 = '行政院衛生署疾病管制局'">
					<xsl:for-each select="受文者列表/受文者[@本別='正本'] | 受文者列表/受文者列表[@本別='正本']">
						<xsl:apply-templates select="."/>
					</xsl:for-each>
				</xsl:when>
				<xsl:otherwise>
					<!-- 2012/11/23 增加全銜節點, 以符合DTD定義 -->
					<全銜><xsl:value-of select="正本"/></全銜>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:if test="$keeptagname != 'true'">
				<xsl:text disable-output-escaping="yes">&lt;/正本&gt;</xsl:text>
			</xsl:if>
		</xsl:when>
		<xsl:when test="$行文單位保密 = 'true'">
			<!-- 2012/1/19 取消$分繕發文判定, 以支援SW的分繕 -->
			<xsl:if test="$受文者本別 = '正本'">
				<xsl:if test="$keeptagname != 'true'">
					<xsl:text disable-output-escaping="yes">&lt;正本&gt;</xsl:text>
				</xsl:if>
				<xsl:choose>
					<!-- 2013/3/7 土銀要求交換用DI也要註記含不含附件 -->
					<xsl:when test="contains(發文機關列表/發文機關/全銜, '臺灣土地銀行')">
						<xsl:variable name="Comment">
							<xsl:if test="count(附件列表/附件檔名) &gt; 0 or string-length(附件列表/文字) &gt; 0">
								<xsl:if test="$含附件='否'">(不含附件)</xsl:if>
							</xsl:if>
						</xsl:variable>
						<xsl:choose>
							<xsl:when test="string-length($受文者姓名) > 0">
								<姓名><xsl:value-of select="$受文者姓名"/><xsl:if test="string-length($受文者職稱) = 0"><xsl:value-of select="$Comment"/></xsl:if></姓名>
								<xsl:if test="string-length($受文者職稱) > 0">
									<職稱><xsl:value-of select="$受文者職稱"/><xsl:value-of select="$Comment"/></職稱>
								</xsl:if>
							</xsl:when>
							<xsl:when test="string-length($受文者單位代碼) = 7">
								<單位名><xsl:value-of select="$受文者全銜"/><xsl:value-of select="$Comment"/></單位名>
							</xsl:when>
							<xsl:otherwise>
								<全銜><xsl:value-of select="$受文者全銜"/><xsl:value-of select="$Comment"/></全銜>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:when test="string-length($受文者姓名) > 0">
						<姓名><xsl:value-of select="$受文者姓名"/></姓名>
						<xsl:if test="string-length($受文者職稱) > 0">
							<職稱><xsl:value-of select="$受文者職稱"/></職稱>
						</xsl:if>
					</xsl:when>
					<xsl:when test="string-length($受文者單位代碼) = 7">
						<單位名><xsl:value-of select="$受文者全銜"/></單位名>
					</xsl:when>
					<xsl:otherwise>
						<全銜><xsl:value-of select="$受文者全銜"/></全銜>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:if test="$keeptagname != 'true'">
					<xsl:text disable-output-escaping="yes">&lt;/正本&gt;</xsl:text>
				</xsl:if>
			</xsl:if>
			<!-- 2012/7/9 修改行文單位保密也至少有一個總稱, 以符合DTD定義 -->
			<xsl:if test="$受文者本別 != '正本'">
				<xsl:if test="$keeptagname = 'true'">
					<總稱></總稱>
				</xsl:if>
			</xsl:if>
		</xsl:when>
		<xsl:otherwise>
			<xsl:if test="$keeptagname != 'true'">
				<xsl:text disable-output-escaping="yes">&lt;正本&gt;</xsl:text>
			</xsl:if>
			<!-- 2013/3/7 新增土銀要求的正副本稱謂邏輯(含不含附件、除外) -->
			<xsl:choose>
				<xsl:when test="contains(發文機關列表/發文機關/全銜, '臺灣土地銀行')">
					<xsl:call-template name="Make土銀正副本稱謂">
						<xsl:with-param name="type">正本</xsl:with-param>
					</xsl:call-template>
				</xsl:when>
				<xsl:otherwise>
					<xsl:for-each select="受文者列表/受文者[@本別='正本'] | 受文者列表/受文者列表[@本別='正本']">
						<xsl:apply-templates select="."/>
					</xsl:for-each>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:if test="$keeptagname != 'true'">
				<xsl:text disable-output-escaping="yes">&lt;/正本&gt;</xsl:text>
			</xsl:if>
		</xsl:otherwise>
	</xsl:choose>
	<xsl:if test="$keeptagname = 'true'">
		<xsl:text disable-output-escaping="yes">&lt;/正本&gt;</xsl:text>
	</xsl:if>
</xsl:template>

<xsl:template name="Make副本">
	<xsl:choose>
		<!-- 2011/5/31 CDC正副本取代模式 -->
		<!-- 2012/1/19 取消$分繕發文判定, 以支援SW的分繕 -->
		<xsl:when test="@正副本取代模式 = 'True'">
			<副本>
				<xsl:choose>
					<xsl:when test="$受文者全銜 = '行政院衛生署人事室' or $受文者全銜 = '行政院衛生署疾病管制局'">
						<xsl:for-each select="受文者列表/受文者[@本別='副本'] | 受文者列表/受文者列表[@本別='副本']">
							<xsl:apply-templates select="."/>
						</xsl:for-each>
					</xsl:when>
					<xsl:otherwise>
						<!-- 2012/11/23 增加全銜節點, 以符合DTD定義 -->
						<全銜><xsl:value-of select="副本"/></全銜>
					</xsl:otherwise>
				</xsl:choose>
			</副本>
		</xsl:when>
		<xsl:when test="$副本行文單位保密 = 'true' or ($副本行文單位保密 = '' and $行文單位保密 = 'true')">
			<!-- 2012/1/19 取消$分繕發文判定, 以支援SW的分繕 -->
			<xsl:if test="$受文者本別 = '副本'">
				<副本>
					<xsl:choose>
						<!-- 2013/3/7 土銀要求交換用DI也要註記含不含附件 -->
						<xsl:when test="contains(發文機關列表/發文機關/全銜, '臺灣土地銀行')">
							<xsl:variable name="Comment">
								<xsl:if test="count(附件列表/附件檔名) &gt; 0 or string-length(附件列表/文字) &gt; 0">
									<xsl:if test="$含附件='是'">(含附件)</xsl:if>
								</xsl:if>
							</xsl:variable>
							<xsl:choose>
								<xsl:when test="string-length($受文者姓名) > 0">
									<姓名><xsl:value-of select="$受文者姓名"/><xsl:if test="string-length($受文者職稱) = 0"><xsl:value-of select="$Comment"/></xsl:if></姓名>
									<xsl:if test="string-length($受文者職稱) > 0">
										<職稱><xsl:value-of select="$受文者職稱"/><xsl:value-of select="$Comment"/></職稱>
									</xsl:if>
								</xsl:when>
								<xsl:when test="string-length($受文者單位代碼) = 7">
									<單位名><xsl:value-of select="$受文者全銜"/><xsl:value-of select="$Comment"/></單位名>
								</xsl:when>
								<xsl:otherwise>
									<全銜><xsl:value-of select="$受文者全銜"/><xsl:value-of select="$Comment"/></全銜>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
						<xsl:when test="string-length($受文者姓名) > 0">
							<姓名><xsl:value-of select="$受文者姓名"/></姓名>
							<xsl:if test="string-length($受文者職稱) > 0">
								<職稱><xsl:value-of select="$受文者職稱"/></職稱>
							</xsl:if>
						</xsl:when>
						<xsl:when test="string-length($受文者單位代碼) = 7">
							<單位名><xsl:value-of select="$受文者全銜"/></單位名>
						</xsl:when>
						<xsl:otherwise>
							<全銜><xsl:value-of select="$受文者全銜"/></全銜>
						</xsl:otherwise>
					</xsl:choose>
				</副本>
			</xsl:if>
		</xsl:when>
		<xsl:otherwise>
			<xsl:if test="受文者列表/受文者[@本別='副本'] | 受文者列表/受文者列表[@本別='副本']">
				<副本>
					<!-- 2013/3/7 新增土銀要求的正副本稱謂邏輯(含不含附件、除外) -->
					<xsl:choose>
						<xsl:when test="contains(發文機關列表/發文機關/全銜, '臺灣土地銀行')">
							<xsl:call-template name="Make土銀正副本稱謂">
								<xsl:with-param name="type">副本</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:otherwise>
							<xsl:for-each select="受文者列表/受文者[@本別='副本'] | 受文者列表/受文者列表[@本別='副本']">
								<xsl:apply-templates select="."/>
							</xsl:for-each>
						</xsl:otherwise>
					</xsl:choose>
				</副本>
			</xsl:if>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="Make出席者">
	<出席者>
		<!-- 2013/3/7 新增土銀要求的正副本稱謂邏輯(含不含附件、除外) -->
		<xsl:choose>
			<xsl:when test="contains(發文機關列表/發文機關/全銜, '臺灣土地銀行')">
				<xsl:call-template name="Make土銀正副本稱謂">
					<xsl:with-param name="type">出席者</xsl:with-param>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:for-each select="受文者列表/受文者[@本別='出席者'] | 受文者列表/受文者列表[@本別='出席者']">
					<xsl:apply-templates select="."/>
				</xsl:for-each>
			</xsl:otherwise>
		</xsl:choose>
	</出席者>
</xsl:template>

<xsl:template name="Make列席者">
	<xsl:if test="受文者列表/受文者[@本別='列席者'] | 受文者列表/受文者列表[@本別='列席者']">
		<列席者>
			<!-- 2013/3/7 新增土銀要求的正副本稱謂邏輯(含不含附件、除外) -->
			<xsl:choose>
				<xsl:when test="contains(發文機關列表/發文機關/全銜, '臺灣土地銀行')">
					<xsl:call-template name="Make土銀正副本稱謂">
						<xsl:with-param name="type">列席者</xsl:with-param>
					</xsl:call-template>
				</xsl:when>
				<xsl:otherwise>
					<xsl:for-each select="受文者列表/受文者[@本別='列席者'] | 受文者列表/受文者列表[@本別='列席者']">
						<xsl:apply-templates select="."/>
					</xsl:for-each>
				</xsl:otherwise>
			</xsl:choose>
		</列席者>
	</xsl:if>
</xsl:template>

<xsl:template name="Make備註">
	<xsl:apply-templates select="備註"/>
</xsl:template>

<xsl:template name="Make署名">
	<xsl:apply-templates select="署名"/>
</xsl:template>

<xsl:template name="Make機關或單位">
	<xsl:choose>
		<xsl:when test="string-length(string(發文機關列表/發文機關[1]/承辦單位))">
			<單位><xsl:value-of select="發文機關列表/發文機關[1]/承辦單位"/></單位>
		</xsl:when>
		<xsl:otherwise>
			<機關><xsl:value-of select="發文機關列表/發文機關[1]/全銜"/></機關>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="Make年月日">
	<年月日>
	<xsl:choose>
		<xsl:when test="年月日">
			<xsl:value-of select="年月日"/>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="發文日期/年月日"/>
		</xsl:otherwise>
	</xsl:choose>
	</年月日>
</xsl:template>

<!-- 通用元素 -->
<xsl:template match="姓名">
	<姓名><xsl:value-of select="."/></姓名>
</xsl:template>

<xsl:template match="職稱">
	<職稱><xsl:value-of select="."/></職稱>
</xsl:template>

<xsl:template match="發文機關">
	<發文機關>
		<xsl:apply-templates select="全銜"/>
		<xsl:apply-templates select="機關代碼"/>
	</發文機關>
</xsl:template>

<xsl:template match="全銜">
	<全銜><xsl:value-of select="."/></全銜>
</xsl:template>

<xsl:template match="機關代碼">
	<機關代碼><xsl:value-of select="."/></機關代碼>
</xsl:template>

<xsl:template match="單位代碼">
	<單位代碼><xsl:value-of select="."/></單位代碼>
</xsl:template>

<xsl:template match="函類別">
	<xsl:copy-of select="."/>
</xsl:template>

<xsl:template match="令類別">
	<xsl:copy-of select="."/>
</xsl:template>

<xsl:template match="機關地址">
	<地址><xsl:value-of select="."/></地址>
</xsl:template>

<xsl:template match="速別">
	<xsl:text disable-output-escaping="yes">&lt;速別 代碼=&quot;</xsl:text>
	<xsl:choose>
			<xsl:when test="string(@代碼)"><xsl:value-of select="@代碼"/></xsl:when>
			<xsl:otherwise>普通件</xsl:otherwise>
	</xsl:choose>
	<xsl:text disable-output-escaping="yes">&quot;/&gt;</xsl:text>
</xsl:template>

<xsl:template match="密等及解密條件或保密期限">
	<密等及解密條件或保密期限>
		<xsl:apply-templates select="*"/>
	</密等及解密條件或保密期限>
</xsl:template>

<xsl:template match="密等及解密條件">
	<密等及解密條件或保密期限>
		<xsl:apply-templates select="*"/>
	</密等及解密條件或保密期限>
</xsl:template>

<xsl:template match="密等">
	<xsl:text disable-output-escaping="yes">&lt;密等 代碼=&quot;</xsl:text>
	<xsl:choose>
			<xsl:when test="string(@代碼)"><xsl:value-of select="@代碼"/></xsl:when>
			<xsl:otherwise>普通</xsl:otherwise>
	</xsl:choose>
	<xsl:text disable-output-escaping="yes">&quot;/&gt;</xsl:text>
</xsl:template>

<xsl:template match="解密條件或保密期限">
	<解密條件或保密期限>
		<xsl:value-of select="."/>
	</解密條件或保密期限>
</xsl:template>

<xsl:template match="解密條件">
	<解密條件或保密期限>
		<xsl:value-of select="."/>
	</解密條件或保密期限>
</xsl:template>

<xsl:template match="發文日期">
	<發文日期>
		<xsl:apply-templates select="*"/>
	</發文日期>
</xsl:template>

<xsl:template match="年月日">
	<年月日><xsl:value-of select="."/></年月日>
</xsl:template>

<xsl:template match="星期">
	<星期><xsl:value-of select="."/></星期>
</xsl:template>

<xsl:template match="時分">
	<時分><xsl:value-of select="."/></時分>
</xsl:template>

<xsl:template match="發文字號">
	<發文字號>
		<xsl:apply-templates select="*"/>
	</發文字號>
</xsl:template>

<xsl:template match="字">
	<字><xsl:value-of select="."/></字>
</xsl:template>

<xsl:template match="文號">
	<文號>
		<xsl:apply-templates select="*"/>
	</文號>
</xsl:template>

<xsl:template match="年度號">
	<年度號><xsl:value-of select="."/></年度號>
</xsl:template>

<xsl:template match="年度">
	<年度><xsl:value-of select="."/></年度>
</xsl:template>

<xsl:template match="流水號">
	<流水號><xsl:value-of select="."/></流水號>
</xsl:template>

<xsl:template match="支號">
	<xsl:if test="string-length(string(.)) and . != '０'">
		<支號><xsl:value-of select="."/></支號>
	</xsl:if>
</xsl:template>

<xsl:template match="文字">
	<文字><xsl:for-each select=".//text()">
		<xsl:choose>
			<xsl:when test="name(..)='mi'">
				<xsl:apply-templates select=".."/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="."/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:for-each></文字>
</xsl:template>

<xsl:template match="mi">
	<xsl:if test="@act != 'del'">
		<xsl:value-of select="."/>
	</xsl:if>
</xsl:template>

<xsl:template match="主旨">
	<主旨>
		<xsl:apply-templates select="*"/>
	</主旨>
</xsl:template>

<xsl:template match="開會事由">
	<開會事由>
		<xsl:apply-templates select="*"/>
	</開會事由>
</xsl:template>

<xsl:template match="開會時間">
	<開會時間>
		<xsl:apply-templates select="*"/>
	</開會時間>
</xsl:template>

<xsl:template match="開會地點">
	<開會地點>
		<xsl:apply-templates select="*"/>
	</開會地點>
</xsl:template>

<xsl:template match="段落">
	<xsl:if test=".//文字/text() or .//mi/text()">
	<xsl:element name="段落">
		<xsl:attribute name="段名"><xsl:value-of select="@段名"/></xsl:attribute>
		<xsl:apply-templates select="*"/>
	</xsl:element>
	</xsl:if>
</xsl:template>

<xsl:template match="條列">
	<xsl:element name="條列">
		<xsl:attribute name="序號"><xsl:value-of select="@序號"/></xsl:attribute>
		<xsl:apply-templates select="*"/>
	</xsl:element>
</xsl:template>

<xsl:template match="備註">
	<xsl:if test=".//文字/text()">
	<備註>
		<xsl:apply-templates select="段落"/>
	</備註>
	</xsl:if>
</xsl:template>

<xsl:template match="受文者">
	<xsl:choose>
		<xsl:when test="@本別 ='主持人'">
			<xsl:choose>
				<xsl:when test="string-length(string(姓名)) > 0">
					<xsl:apply-templates select="姓名"/>
				</xsl:when>
				<xsl:otherwise>
					<姓名><xsl:value-of select="全銜"/></姓名>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:if test="string-length(string(職稱)) > 0">
					<xsl:apply-templates select="職稱"/>
			</xsl:if>
		</xsl:when>
		<xsl:otherwise>
			<xsl:choose>
				<xsl:when test="string-length(姓名) > 0">
					<xsl:apply-templates select="姓名"/>
					<xsl:if test="string-length(職稱) > 0">
						<xsl:apply-templates select="職稱"/>
					</xsl:if>
				</xsl:when>
				<xsl:when test="string-length(string(單位代碼)) =7">
					<單位名><xsl:value-of select="全銜"/></單位名>
				</xsl:when>
				<xsl:otherwise>
					<xsl:apply-templates select="全銜"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="受文者列表">
	<xsl:choose>
		<xsl:when test="@本別 ='主持人'">
			<姓名><xsl:value-of select="文字"/></姓名>
			<xsl:if test="string-length(string(職稱)) > 0">
				<xsl:apply-templates select="職稱"/>
			</xsl:if>
		</xsl:when>
		<xsl:otherwise>
			<總稱><xsl:value-of select="文字"/></總稱>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template match="署名">
	<署名><xsl:value-of select="."/></署名>
</xsl:template>

<!-- 2013/3/7 土銀要求交換用DI的正副本稱謂要比照其紙本註記含不含附件、除外等等 -->
<xsl:template name="Make土銀正副本稱謂">
	<xsl:param name="type"></xsl:param>

	<xsl:variable name="cc">
		<xsl:for-each select="受文者列表/*[(name()='受文者' and not(@本別='抄本')) or (name()='受文者列表' and not(受文者[1]/@本別='抄本'))]">
			<xsl:choose>
				<xsl:when test="name()='受文者'">
					<xsl:if test="not(contains(全銜, '臺灣土地銀行')) or 全銜='臺灣土地銀行'">●</xsl:if>
				</xsl:when>
				<xsl:otherwise>
					<xsl:if test="not(contains(文字, '臺灣土地銀行')) or 文字='臺灣土地銀行'">●</xsl:if>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
	</xsl:variable>
	<xsl:variable name="ia">
		<xsl:for-each select="受文者列表/*[(name()='受文者' and @本別=$type) or (name()='受文者列表' and 受文者[1]/@本別=$type)]">
			<xsl:choose>
				<xsl:when test="$type = '副本'">
					<xsl:choose>
						<xsl:when test="name()='受文者'">
							<xsl:if test="含附件='否'">●</xsl:if>
						</xsl:when>
						<xsl:otherwise>
							<xsl:for-each select="受文者">
								<xsl:if test="含附件='否'">●</xsl:if>
							</xsl:for-each>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
				<xsl:otherwise>
					<xsl:choose>
						<xsl:when test="name()='受文者'">
							<xsl:if test="含附件='是'">●</xsl:if>
						</xsl:when>
						<xsl:otherwise>
							<xsl:for-each select="受文者">
								<xsl:if test="含附件='是'">●</xsl:if>
							</xsl:for-each>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:for-each>
	</xsl:variable>
	<xsl:for-each select="受文者列表/*[(name()='受文者' and @本別=$type) or (name()='受文者列表' and 受文者[1]/@本別=$type)]">
		<xsl:choose>
			<xsl:when test="name()='受文者'">
				<xsl:variable name="Comment">
					<xsl:if test="count(/*/附件列表/附件檔名) &gt; 0 or string-length(/*/附件列表/文字) &gt; 0">
						<xsl:choose>
							<xsl:when test="$type = '副本'">
								<xsl:choose>
									<xsl:when test="$ia != ''">
										<xsl:if test="含附件='是'">(含附件)</xsl:if>
									</xsl:when>
									<xsl:otherwise>
										<xsl:if test="position()=last()">(<xsl:if test="count(/*/受文者列表/*[(name()='受文者' and @本別=$type) or (name()='受文者列表' and 受文者[1]/@本別=$type)]) &gt; 1">均</xsl:if>含附件)</xsl:if>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:when>
							<xsl:otherwise>
								<xsl:choose>
									<xsl:when test="$ia != ''">
										<xsl:if test="含附件='否'">(不含附件)</xsl:if>
									</xsl:when>
									<xsl:otherwise>
										<xsl:if test="position()=last()">(<xsl:if test="count(/*/受文者列表/*[(name()='受文者' and @本別=$type) or (name()='受文者列表' and 受文者[1]/@本別=$type)]) &gt; 1">均</xsl:if>不含附件)</xsl:if>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
				</xsl:variable>
				<xsl:choose>
					<xsl:when test="$type = '主持人'">
						<姓名>
							<xsl:choose>
								<xsl:when test="string-length(string(姓名)) > 0">
									<xsl:value-of select="姓名"/>
								</xsl:when>
								<xsl:when test="$cc='' and contains(全銜, '臺灣土地銀行') and not(全銜='臺灣土地銀行') and not(全銜='臺灣土地銀行股份有限公司') and not(全銜='臺灣土地銀行總行')">
									<xsl:value-of select="substring-after(全銜, '臺灣土地銀行')"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="全銜"/>
								</xsl:otherwise>
							</xsl:choose>
							<xsl:if test="string-length(string(職稱)) = 0">
								<xsl:value-of select="$Comment"/>
							</xsl:if>
						</姓名>
						<xsl:if test="string-length(string(職稱)) > 0">
							<職稱><xsl:value-of select="職稱"/><xsl:value-of select="$Comment"/></職稱>
						</xsl:if>
					</xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="string-length(姓名) > 0">
								<姓名><xsl:value-of select="姓名"/><xsl:if test="string-length(職稱) = 0"><xsl:value-of select="$Comment"/></xsl:if></姓名>
								<xsl:if test="string-length(職稱) > 0">
									<職稱><xsl:value-of select="職稱"/><xsl:value-of select="$Comment"/></職稱>
								</xsl:if>
							</xsl:when>
							<xsl:when test="string-length(string(單位代碼)) =7">
								<單位名>
									<xsl:choose>
										<xsl:when test="$cc='' and contains(全銜, '臺灣土地銀行') and not(全銜='臺灣土地銀行') and not(全銜='臺灣土地銀行股份有限公司') and not(全銜='臺灣土地銀行總行')">
											<xsl:value-of select="substring-after(全銜, '臺灣土地銀行')"/>
										</xsl:when>
										<xsl:otherwise>
											<xsl:value-of select="全銜"/>
										</xsl:otherwise>
									</xsl:choose>
									<xsl:value-of select="$Comment"/>
								</單位名>
							</xsl:when>
							<xsl:otherwise>
								<全銜>
									<xsl:choose>
										<xsl:when test="$cc='' and contains(全銜, '臺灣土地銀行') and not(全銜='臺灣土地銀行') and not(全銜='臺灣土地銀行股份有限公司') and not(全銜='臺灣土地銀行總行')">
											<xsl:value-of select="substring-after(全銜, '臺灣土地銀行')"/>
										</xsl:when>
										<xsl:otherwise>
											<xsl:value-of select="全銜"/>
										</xsl:otherwise>
									</xsl:choose>
									<xsl:value-of select="$Comment"/>
								</全銜>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise><!-- 群組 -->
				<總稱>
					<xsl:choose>
						<xsl:when test="$cc='' and contains(文字, '臺灣土地銀行') and not(文字='臺灣土地銀行') and not(文字='臺灣土地銀行股份有限公司') and not(文字='臺灣土地銀行總行')">
							<xsl:value-of select="substring-after(文字, '臺灣土地銀行')"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="文字"/>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:if test="count(已刪除) &gt; 0">
						<xsl:text>(</xsl:text>
						<xsl:choose><!-- 2013/4/29 土銀新增僅標註正本單位除外功能 -->
							<xsl:when test="@正本單位除外='TRUE'">
								<xsl:text>正本單位</xsl:text>
							</xsl:when>
							<xsl:otherwise>
								<xsl:for-each select="已刪除">
									<xsl:choose>
										<xsl:when test="$cc='' and contains(全銜, '臺灣土地銀行') and not(全銜='臺灣土地銀行') and not(全銜='臺灣土地銀行股份有限公司') and not(全銜='臺灣土地銀行總行')">
											<xsl:value-of select="substring-after(全銜, '臺灣土地銀行')"/>
										</xsl:when>
										<xsl:otherwise>
											<xsl:value-of select="全銜"/>
										</xsl:otherwise>
									</xsl:choose>
									<xsl:if test="position()!=last()">、</xsl:if>
								</xsl:for-each>
							</xsl:otherwise>
						</xsl:choose>
						<xsl:text>除外)</xsl:text>
					</xsl:if>
					<xsl:if test="(count(/*/附件列表/附件檔名) &gt; 0 or string-length(/*/附件列表/文字) &gt; 0) and $ia != ''">
						<xsl:choose>
							<xsl:when test="$type = '副本'">
								<xsl:choose>
									<xsl:when test="count(受文者[含附件='是']) = count(受文者)">(均含附件)</xsl:when>
									<xsl:when test="count(受文者[含附件='是']) &gt; 0">
										<xsl:text>(</xsl:text>
										<xsl:for-each select="受文者[含附件='是']">
											<xsl:choose>
												<xsl:when test="$cc='' and contains(全銜, '臺灣土地銀行') and not(全銜='臺灣土地銀行') and not(全銜='臺灣土地銀行股份有限公司') and not(全銜='臺灣土地銀行總行')">
													<xsl:value-of select="substring-after(全銜, '臺灣土地銀行')"/>
												</xsl:when>
												<xsl:otherwise>
													<xsl:value-of select="全銜"/>
												</xsl:otherwise>
											</xsl:choose>
											<xsl:if test="position()!=last()">、</xsl:if>
										</xsl:for-each>
										<xsl:text>含附件)</xsl:text>
									</xsl:when>
								</xsl:choose>
							</xsl:when>
							<xsl:otherwise>
								<xsl:choose>
									<xsl:when test="count(受文者[含附件='否']) = count(受文者)">(均不含附件)</xsl:when>
									<xsl:when test="count(受文者[含附件='否']) &gt; 0">
										<xsl:text>(</xsl:text>
										<xsl:for-each select="受文者[含附件='否']">
											<xsl:choose>
												<xsl:when test="$cc='' and contains(全銜, '臺灣土地銀行') and not(全銜='臺灣土地銀行') and not(全銜='臺灣土地銀行股份有限公司') and not(全銜='臺灣土地銀行總行')">
													<xsl:value-of select="substring-after(全銜, '臺灣土地銀行')"/>
												</xsl:when>
												<xsl:otherwise>
													<xsl:value-of select="全銜"/>
												</xsl:otherwise>
											</xsl:choose>
											<xsl:if test="position()!=last()">、</xsl:if>
										</xsl:for-each>
										<xsl:text>不含附件)</xsl:text>
									</xsl:when>
								</xsl:choose>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:if test="position()=last() and $ia = ''">(<xsl:if test="count(/*/受文者列表/*[(name()='受文者' and @本別=$type) or (name()='受文者列表' and 受文者[1]/@本別=$type)]) &gt; 1">均</xsl:if><xsl:if test="$type != '副本'">不</xsl:if>含附件)</xsl:if>
				</總稱>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:for-each>
</xsl:template>
</xsl:stylesheet>
