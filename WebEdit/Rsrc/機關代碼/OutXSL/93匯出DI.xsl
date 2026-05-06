<?xml version="1.0" encoding="Big5"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" omit-xml-declaration="yes" indent="yes" encoding="Big5" />
<export:supported-doctypes xmlns:export="http://www.2100t.com.tw/2008/OD/Export">令|函|公告|開會通知單|簽</export:supported-doctypes>
<xsl:variable name="exch"></xsl:variable>

<xsl:template match="/">
	<xsl:apply-templates select="*"/>
</xsl:template>

<xsl:template match="令">
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="dtd">93_1.dtd</xsl:with-param>
	</xsl:call-template>
	<令>
		<xsl:call-template name="Make發文機關"/>
		<xsl:call-template name="Make發文日期"/>
		<xsl:call-template name="Make發文字號"/>
		<xsl:call-template name="Make附件"/>
		<xsl:call-template name="Make主旨"/>
		<xsl:call-template name="Make段落"/>
		<xsl:call-template name="Make署名"/>
	</令>
</xsl:template>

<xsl:template match="函">
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="dtd">93_2.dtd</xsl:with-param>
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
		<xsl:call-template name="Make段落"/>
		<xsl:call-template name="Make正本"/>
		<xsl:call-template name="Make副本"/>
		<!--
		<xsl:call-template name="Make署名"/>
		-->
	</函>
</xsl:template>

<xsl:template match="公告">
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="dtd">93_3.dtd</xsl:with-param>
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

<xsl:template match="開會通知單">
	<xsl:call-template name="MakeDOCTYPE">
		<xsl:with-param name="dtd">93_4.dtd</xsl:with-param>
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
		<xsl:with-param name="dtd">93_5.dtd</xsl:with-param>
	</xsl:call-template>
	<簽>
		<xsl:call-template name="Make機關或單位"/>
		<xsl:call-template name="Make受文者"/>
		<xsl:call-template name="Make主旨"/>
		<xsl:call-template name="Make段落"/>
		<xsl:call-template name="Make署名"/>
		<xsl:call-template name="Make年月日"/>
	</簽>
</xsl:template>

<xsl:template name="MakeDOCTYPE">
	<xsl:param name="dtd"></xsl:param>
	<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE </xsl:text>
		<xsl:value-of select="name()"/>
	<xsl:text> SYSTEM "</xsl:text>
		<xsl:value-of select="$dtd"/>
	<xsl:text disable-output-escaping="yes">" [&#10;</xsl:text>
	<xsl:text disable-output-escaping="yes">&lt;!ENTITY 名單 SYSTEM "</xsl:text>
		<xsl:value-of select="$exch"/>
	<xsl:text disable-output-escaping="yes">" NDATA DI&gt;&#10;</xsl:text>
	<xsl:text disable-output-escaping="yes">&lt;!NOTATION DI SYSTEM ""&gt;&#10;</xsl:text>
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
	<xsl:apply-templates select="函類別"/>
</xsl:template>

<xsl:template name="Make地址">
	<xsl:apply-templates select="發文機關列表/發文機關[1]/機關地址"/>
</xsl:template>

<xsl:template name="Make聯絡方式">
	<聯絡方式>聯絡人：<xsl:value-of select="發文機關列表/發文機關[1]/承辦人"/></聯絡方式>
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
	<姓名><xsl:value-of select="發文機關列表/發文機關[1]/承辦人"/></姓名>
	<電話><xsl:value-of select="發文機關列表/發文機關[1]/聯絡電話"/></電話>
	</聯絡人及電話>
</xsl:template>

<xsl:template name="Make受文者">
	<受文者>
		<交換表 交換表單="名單">
			<xsl:value-of select="受文者列表/文字"/>
		</交換表>
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
		<xsl:apply-templates select="附件列表/文字"/>
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

<xsl:template name="Make開會事由">
	<xsl:apply-templates select="開會事由"/>
</xsl:template>

<xsl:template name="Make開會時間">
	<xsl:apply-templates select="開會時間"/>
</xsl:template>

<xsl:template name="Make開會地點">
	<xsl:apply-templates select="開會地點"/>
</xsl:template>

<xsl:template name="Make主持人">
	<主持人>
		<xsl:for-each select="受文者列表/受文者[@本別='主持人'] | 受文者列表/受文者列表[@本別='主持人']">
			<xsl:apply-templates select="."/>
		</xsl:for-each>
	</主持人>	
</xsl:template>

<xsl:template name="Make正本">
	<正本>
		<xsl:for-each select="受文者列表/受文者[@本別='正本'] | 受文者列表/受文者列表[@本別='正本']">
			<xsl:apply-templates select="."/>
		</xsl:for-each>
	</正本>
</xsl:template>

<xsl:template name="Make副本">
	<xsl:if test="受文者列表/受文者[@本別='副本'] | 受文者列表/受文者列表[@本別='副本']">
	<副本>
		<xsl:for-each select="受文者列表/受文者[@本別='副本'] | 受文者列表/受文者列表[@本別='副本']">
			<xsl:apply-templates select="."/>
		</xsl:for-each>
	</副本>
	</xsl:if>
</xsl:template>

<xsl:template name="Make出席者">
	<出席者>
		<xsl:for-each select="受文者列表/受文者[@本別='出席者'] | 受文者列表/受文者列表[@本別='出席者']">
			<xsl:apply-templates select="."/>
		</xsl:for-each>
	</出席者>
</xsl:template>

<xsl:template name="Make列席者">
	<xsl:if test="受文者列表/受文者[@本別='列席者'] | 受文者列表/受文者列表[@本別='列席者']">
	<列席者>
		<xsl:for-each select="受文者列表/受文者[@本別='列席者'] | 受文者列表/受文者列表[@本別='列席者']">
			<xsl:apply-templates select="."/>
		</xsl:for-each>
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
</xsl:stylesheet>
