<?xml version="1.0" encoding="Big5"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" omit-xml-declaration="yes" indent="yes" encoding="utf-8"/>
<xsl:variable name="DIType"></xsl:variable>
<xsl:variable name="DTD編碼">utf8</xsl:variable>
<xsl:variable name="分繕發文">false</xsl:variable>
<xsl:variable name="受文者全銜"/>
<xsl:variable name="受文者本別"/>
<xsl:variable name="受文者正式名稱"/>
<xsl:variable name="受文者單位代碼"/>
<xsl:variable name="受文者機關代碼"/>
<xsl:variable name="含附件"/>
<xsl:variable name="受文者姓名"/>
<xsl:variable name="受文者職稱"/>
<xsl:variable name="過濾受文者含附件"/><!-- 2016/5/27新增, 支援過濾含附件或不含附件受文者 -->
<xsl:preserve-space elements="*"/>
<xsl:template match="/">
	<xsl:choose>
		<xsl:when test="$DIType = '91'">
			<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE 交換表單 SYSTEM "91_roster.dtd"&gt;&#10;</xsl:text>
		</xsl:when>
		<xsl:when test="$DIType = '93'">
			<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE 交換表單 SYSTEM "93_roster.dtd"&gt;&#10;</xsl:text>
		</xsl:when>
		<xsl:when test="$DIType = '97'">
			<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE 交換表單 SYSTEM "97_roster.dtd"&gt;&#10;</xsl:text>
		</xsl:when>
		<xsl:when test="$DIType = '99'">
			<xsl:choose>
				<xsl:when test="$DTD編碼 = 'utf8'">
					<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE 交換表單 SYSTEM "99_roster_utf8.dtd"&gt;&#10;</xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE 交換表單 SYSTEM "99_roster_big5.dtd"&gt;&#10;</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:when>
		<xsl:otherwise>
			<xsl:choose>
				<xsl:when test="$DTD編碼 = 'utf8'">
					<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE 交換表單 SYSTEM "104_roster_utf8.dtd"&gt;&#10;</xsl:text><!-- 2015/6/17 103改104 -->
				</xsl:when>
				<xsl:otherwise>
					<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE 交換表單 SYSTEM "104_roster_big5.dtd"&gt;&#10;</xsl:text><!-- 2015/6/17 103改104 -->
				</xsl:otherwise>
			</xsl:choose>
		</xsl:otherwise>
	</xsl:choose>
	<交換表單>
		<!-- 2012/1/17新增, 支援分繕發文 -->
		<xsl:choose>
			<xsl:when test="$分繕發文='true'">
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
				<xsl:if test="/*/附件列表/附件檔名/text() and ($受文者本別!='正本' or ($DIType!='99' and $DIType!='104'))"><!-- 2015/6/17 新增支援104年版 -->
					<xsl:choose>
						<xsl:when test="$含附件='是' or $含附件='含附件'">
							<含附件>含附件</含附件>
						</xsl:when>
						<xsl:otherwise>
							<含附件>不含附件</含附件>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="*/受文者列表//受文者">
					<xsl:with-param name="hasatt">
						<xsl:choose>
							<xsl:when test="/*/附件列表/附件檔名/text()">true</xsl:when>
							<xsl:otherwise>false</xsl:otherwise>
						</xsl:choose>
					</xsl:with-param>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</交換表單>
</xsl:template>

<xsl:template match="受文者">
	<xsl:param name="hasatt">false</xsl:param>
	<xsl:if test="發文方式 ='電子交換' and string-length(string(正式名稱)) and ($過濾受文者含附件 = '' or 含附件 = $過濾受文者含附件)"><!-- 2016/5/27新增, 未設定過濾受文者含附件則一律轉出, 設定過濾受文者含附件則與受文者的「含附件」一樣(是、否)才轉出 -->
		<xsl:choose>
			<xsl:when test="string-length(string(機關代碼)) = 10">
				<xsl:choose>
					<xsl:when test="string-length(string(姓名))">
						<xsl:apply-templates select="姓名"/>
						<xsl:if test="string-length(string(職稱))">
							<xsl:apply-templates select="職稱"/>
						</xsl:if>
						<xsl:apply-templates select="機關代碼"/>
						<xsl:if test="string-length(string(單位代碼))">
							<xsl:apply-templates select="單位代碼"/>
						</xsl:if>
					</xsl:when>
					<xsl:when test="string-length(string(單位代碼)) = 7 ">
						<單位名><xsl:value-of select="正式名稱"/></單位名>
						<xsl:apply-templates select="機關代碼"/>
						<xsl:apply-templates select="單位代碼"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:apply-templates select="正式名稱"/>
						<xsl:apply-templates select="機關代碼"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:when test="string-length(string(機關代碼)) = 17">
				<xsl:choose>
					<xsl:when test="string-length(string(姓名))">
						<xsl:apply-templates select="姓名"/>
						<xsl:if test="string-length(string(職稱))">
							<xsl:apply-templates select="職稱"/>
						</xsl:if>
						<機關代碼><xsl:value-of select="substring(string(機關代碼), 1, 10)"/></機關代碼>
						<單位代碼><xsl:value-of select="substring(string(機關代碼), 11, 7)"/></單位代碼>
					</xsl:when>
					<xsl:otherwise>
						<單位名><xsl:value-of select="正式名稱"/></單位名>
						<機關代碼><xsl:value-of select="substring(string(機關代碼), 1, 10)"/></機關代碼>
						<單位代碼><xsl:value-of select="substring(string(機關代碼), 11, 7)"/></單位代碼>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
		</xsl:choose>
		<xsl:if test="含附件 and $hasatt='true' and (@本別!='正本' or ($DIType!='99' and $DIType!='104'))"><!-- 2015/6/17 新增支援104年版 -->
			<xsl:apply-templates select="含附件"/>
		</xsl:if>
	</xsl:if>
</xsl:template>

<xsl:template match="姓名">
	<姓名><xsl:value-of select="."/></姓名>
</xsl:template>

<xsl:template match="職稱">
	<職稱><xsl:value-of select="."/></職稱>
</xsl:template>
<xsl:template match="正式名稱">
	<全銜><xsl:value-of select="."/></全銜>
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

<xsl:template match="含附件">
	<含附件>
	<xsl:choose>
		<xsl:when test=". ='是'">含附件</xsl:when>
		<xsl:otherwise>不含附件</xsl:otherwise>
	</xsl:choose>
	</含附件>
</xsl:template>

</xsl:stylesheet>