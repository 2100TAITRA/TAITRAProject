	<xsl:template name="makeTableRow">
		<xsl:param name="nset"/>
		<xsl:param name="from"/>
		<xsl:param name="to"/>
		<xsl:param name="val"/>
		<xsl:param name="xpath"/>
		<table-row row-height="0.0" free-cell="true">
			<xsl:for-each select="$nset">
				<xsl:if test="position() &gt;= $from and position() &lt;= $to">
					<table-cell writing-mode="inherit" align-block="start" border-width="0">
						<xsl:attribute name="cell-width">
							<xsl:value-of select="@width"/>
						</xsl:attribute>
						<para show-in-page="7" space-before="2.0" space-after="0.0" space-start="1.0" space-end="1.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
							<xsl:attribute name="font-family">
								<xsl:value-of select="$預設字型"/>
							</xsl:attribute>
							<xsl:variable name="判斷字">
								<xsl:text>,</xsl:text>
								<xsl:value-of select="."/>
								<xsl:text>,</xsl:text>
							</xsl:variable>
							<a>
<!-- xsl:attribute name="id">請辦單位</xsl:attribute -->
<xsl:attribute name="op">4</xsl:attribute>
								<xsl:attribute name="sync-path"><xsl:value-of select="$xpath"/></xsl:attribute>
								<xsl:attribute name="value">
									<xsl:value-of select="."/>
								</xsl:attribute>
								<xsl:attribute name="checked">
									<xsl:value-of select="contains($val, $判斷字)"/>
								</xsl:attribute>
								<xsl:value-of select="."/>
							</a>
						</para>
					</table-cell>
				</xsl:if>
			</xsl:for-each>
		</table-row>
	</xsl:template>
	<xsl:template match="主旨">
		<xsl:param name="hideparaname"/>
		<xsl:param name="nodispifempty"/>
		<xsl:param name="spacebefore">0.0</xsl:param>
		<xsl:param name="spaceafter">0.0</xsl:param>
		<xsl:param name="spacestart">0.0</xsl:param>
		<xsl:param name="spaceend">0.0</xsl:param>
		<xsl:param name="fontfamily" select="$預設字型"/>
		<xsl:param name="altfont" select="$預設英數字型"/>
		<xsl:param name="fontsize">16</xsl:param>
		<xsl:param name="indent">-3</xsl:param>
		<xsl:param name="offset">3</xsl:param>
		<xsl:param name="lineheight" select="$預設行高"/>
		<xsl:if test="$nodispifempty=0 or string-length(.//文字)>0 and ($檢視模式 = '1' or (string-length(.//文字/mi[@act != 'del'])>0 or string-length(.//文字/text())>0 or string-length(.//文字/fmt)>0) or ($檢視模式 = '2' and string-length(.//文字/mi[@sn = $編輯階段序號 or (@sn &lt; $編輯階段序號 and @act != 'del')])>0))">
			<xsl:variable name="paraname">
				<xsl:choose><xsl:when test="string-length(@段名) &gt; 0">
					<xsl:value-of select="@段名"/>
				</xsl:when><xsl:otherwise>
					<xsl:text>主旨：</xsl:text>
				</xsl:otherwise></xsl:choose>
			</xsl:variable>
			<xsl:element name="para">
				<xsl:attribute name="space-before"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-before)&gt;0">
						<xsl:value-of select="@space-before"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spacebefore"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="space-after"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-after)&gt;0">
						<xsl:value-of select="@space-after"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spaceafter"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="space-start"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-start)&gt;0">
						<xsl:value-of select="@space-start"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spacestart"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="space-end"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-end)&gt;0">
						<xsl:value-of select="@space-end"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spaceend"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="font-family"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-family)&gt;0">
						<xsl:value-of select="@font-family"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$fontfamily"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="alt-fontname"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@alt-fontname)&gt;0">
						<xsl:value-of select="@alt-fontname"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$altfont"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="font-size"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-size)&gt;0">
						<xsl:value-of select="@font-size"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$fontsize"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:choose>
					<xsl:when test="$hideparaname=0">
						<xsl:attribute name="indent"><xsl:value-of select="0 - string-length($paraname)"/></xsl:attribute>
						<xsl:attribute name="padding-start"><xsl:value-of select="string-length($paraname)"/></xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="indent"><xsl:value-of select="$indent"/></xsl:attribute>
						<xsl:attribute name="padding-start"><xsl:value-of select="$offset"/></xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:attribute name="line-height"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@line-height)&gt;0">
						<xsl:value-of select="@line-height"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$lineheight"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="align-inline"><xsl:choose>
					<xsl:when test="string-length(@alignment)>0">
						<xsl:value-of select="@alignment"/>
					</xsl:when>
					<xsl:otherwise>both</xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:if test="$自訂='true' and string-length(@styles)&gt;0"><!-- 2016.12.8 fix for 粗、斜、底、上下標 -->
					<xsl:attribute name="font-style">
						<xsl:value-of select="@styles"/>
					</xsl:attribute>
				</xsl:if>
				<xsl:if test="$hideparaname=0">
					<xsl:value-of select="$paraname"/>
				</xsl:if>
				<xsl:apply-templates select="文字">
					<xsl:with-param name="id">主旨</xsl:with-param>
				</xsl:apply-templates>
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="段落">
		<xsl:param name="hideparaname"/>
		<xsl:param name="nodispifempty"/>
		<xsl:param name="spacebefore">0.0</xsl:param>
		<xsl:param name="spaceafter">0.0</xsl:param>
		<xsl:param name="spacestart">0.0</xsl:param>
		<xsl:param name="spaceend">0.0</xsl:param>
		<xsl:param name="fontfamily" select="$預設字型"/>
		<xsl:param name="altfont" select="$預設英數字型"/>
		<xsl:param name="fontsize">16</xsl:param>
		<xsl:param name="indent">0</xsl:param>
		<xsl:param name="offset">0</xsl:param>
		<xsl:param name="lineheight" select="$預設行高"/>
		<!-- 1090423 Raymond 1090293 取得此段落的index, 傳入條列template -->
		<xsl:variable name="nm" select="name(.)"/>
		<xsl:variable name="idx" select="count(./preceding-sibling::*[name()=$nm])"/>
		<xsl:if test="$nodispifempty=0 or (string-length(.//文字/text())>0 or count(.//文字/mi)>0) and ($新系統 = 'false' or (string-length(.//文字/mi[@act != 'del']/text())>0 or string-length(.//文字/text())>0 or string-length(.//文字/fmt)>0)) and ($檢視模式 = '1' or (string-length(.//文字/mi[@act != 'del']/text())>0 or string-length(.//文字/text())>0 or string-length(.//文字/fmt)>0) or ($檢視模式 = '2' and count(.//文字/mi[@sn = $編輯階段序號 or (@sn &lt; $編輯階段序號 and @act != 'del')])>0))">
			<xsl:element name="para">
				<xsl:attribute name="space-before"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-before)&gt;0">
						<xsl:value-of select="@space-before"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spacebefore"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="space-after"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-after)&gt;0">
						<xsl:value-of select="@space-after"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spaceafter"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="space-start"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-start)&gt;0">
						<xsl:value-of select="@space-start"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spacestart"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="space-end"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-end)&gt;0">
						<xsl:value-of select="@space-end"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$spaceend"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="font-family"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-family)&gt;0">
						<xsl:value-of select="@font-family"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$fontfamily"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="alt-fontname"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@alt-fontname)&gt;0">
						<xsl:value-of select="@alt-fontname"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$altfont"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="font-size"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-size)&gt;0">
						<xsl:value-of select="@font-size"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$fontsize"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:choose>
					<xsl:when test="$hideparaname=0">
						<xsl:attribute name="indent"><xsl:value-of select="0 - string-length(@段名)"/></xsl:attribute>
						<xsl:attribute name="padding-start"><xsl:value-of select="string-length(@段名)"/></xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="indent"><xsl:value-of select="$indent"/></xsl:attribute>
						<xsl:attribute name="padding-start"><xsl:value-of select="$offset"/></xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:attribute name="line-height"><xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@line-height)&gt;0">
						<xsl:value-of select="@line-height"/>
					</xsl:when>
					<xsl:otherwise><xsl:value-of select="$lineheight"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:attribute name="align-inline"><xsl:choose>
					<xsl:when test="string-length(@alignment)>0">
						<xsl:value-of select="@alignment"/>
					</xsl:when>
					<!-- 1130319 Raymond 1121074 令的段落條列恢復分散對齊 -->
					<!-- 1091016 Raymond 1090621 合併FDA(1090507)令的段落條列要靠左對齊  -->
					<!--xsl:when test="name(/*)='令' and (/*/令類別/@代碼='令' or /*/函類別/@代碼='令')">start</xsl:when-->
					<xsl:otherwise>both</xsl:otherwise>
				</xsl:choose></xsl:attribute>
				<xsl:if test="$自訂='true' and string-length(@styles)&gt;0"><!-- 2016.12.8 fix for 粗、斜、底、上下標 -->
					<xsl:attribute name="font-style">
						<xsl:value-of select="@styles"/>
					</xsl:attribute>
				</xsl:if>
				<xsl:if test="$hideparaname=0">
					<xsl:value-of select="@段名"/>
				</xsl:if>
				<xsl:apply-templates select="文字"/>
			</xsl:element>
			<xsl:apply-templates select="條列">
				<xsl:with-param name="spacebefore" select="$spacebefore"/>
				<xsl:with-param name="spaceafter" select="$spaceafter"/>
				<xsl:with-param name="spacestart" select="$spacestart"/>
				<xsl:with-param name="spaceend" select="$spaceend"/>
				<xsl:with-param name="fontfamily" select="$fontfamily"/>
				<xsl:with-param name="altfont" select="$altfont"/>
				<xsl:with-param name="fontsize" select="$fontsize"/>
				<xsl:with-param name="offset" select="number($offset) + number($indent) + 1"/>
				<xsl:with-param name="lineheight" select="$lineheight"/>
				<xsl:with-param name="paraIndex" select="$idx"/><!-- 1090423 Raymond 1090293 傳入此段落的index, 供人事條列判斷是否對齊冒號 -->
			</xsl:apply-templates>
		</xsl:if>
	</xsl:template>
	<xsl:template match="條列">
		<xsl:param name="spacebefore"/>
		<xsl:param name="spaceafter"/>
		<xsl:param name="spacestart"/>
		<xsl:param name="spaceend"/>
		<xsl:param name="fontfamily"/>
		<xsl:param name="altfont"/>
		<xsl:param name="fontsize"/>
		<xsl:param name="offset"/>
		<xsl:param name="lineheight"/>
		<xsl:param name="paraIndex"/><!-- 1090423 Raymond 1090293 新增段落的索引值, 供人事條列使用 -->
		<xsl:choose>
			<!-- 1110801 Raymond 考試院序147 新增「令(令類別為『人事令』)」為人事令函 -->
			<!-- 1090226 Raymond 1090116 新增判斷「派兼令」、「令(令類別為『獎懲令』)」、「函(函類別為『獎懲建議函』)」為人事令函 -->
			<xsl:when test="(name(/*)='派免建議函') or (name(/*)='派令') or (name(/*)='派免兼建議函') or (name(/*)='派免令') or (name(/*)='獎懲建議函') or (name(/*)='獎懲令') or (name(/*)='派兼令') or (name(/*)='令' and /*/令類別/@代碼='獎懲令') or (name(/*)='函' and /*/函類別/@代碼='獎懲建議函') or (name(/*)='令' and /*/令類別/@代碼='人事令')">
				<xsl:call-template name="人事條列">
					<xsl:with-param name="spacebefore" select="$spacebefore"/>
					<xsl:with-param name="spaceafter" select="$spaceafter"/>
					<xsl:with-param name="spacestart" select="$spacestart"/>
					<xsl:with-param name="spaceend" select="$spaceend"/>
					<xsl:with-param name="fontfamily" select="$fontfamily"/>
					<xsl:with-param name="altfont" select="$altfont"/>
					<xsl:with-param name="fontsize" select="$fontsize"/>
					<xsl:with-param name="offset" select="$offset"/>
					<xsl:with-param name="lineheight" select="$lineheight"/>
					<xsl:with-param name="paraIndex" select="$paraIndex"/><!-- 1090423 Raymond 1090293 傳入此段落的index, 供人事條列判斷是否對齊冒號 -->
				</xsl:call-template>
			</xsl:when>
			<!-- 1140711 Raymond 1140958 新增「會銜令」比照令的凸排方式 -->
			<!-- 10901016 Raymond 1090621 合併FDA(1090507)令的條列次行要空兩格  -->
			<xsl:when test="(name(/*)='令' and (/*/令類別/@代碼='令' or /*/函類別/@代碼='令' or /*/令類別/@代碼='會銜令')) or name(/*)='會銜令'">
				<xsl:call-template name="令條列">
					<xsl:with-param name="spacebefore" select="$spacebefore"/>
					<xsl:with-param name="spaceafter" select="$spaceafter"/>
					<xsl:with-param name="spacestart" select="$spacestart"/>
					<xsl:with-param name="spaceend" select="$spaceend"/>
					<xsl:with-param name="fontfamily" select="$fontfamily"/>
					<xsl:with-param name="altfont" select="$altfont"/>
					<xsl:with-param name="fontsize" select="$fontsize"/>
					<xsl:with-param name="offset" select="$offset"/>
					<xsl:with-param name="lineheight" select="$lineheight"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:element name="para">
					<xsl:attribute name="space-before"><xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@space-before)&gt;0">
							<xsl:value-of select="@space-before"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$spacebefore"/></xsl:otherwise>
					</xsl:choose></xsl:attribute>
					<xsl:attribute name="space-after"><xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@space-after)&gt;0">
							<xsl:value-of select="@space-after"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$spaceafter"/></xsl:otherwise>
					</xsl:choose></xsl:attribute>
					<xsl:attribute name="space-start"><xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@space-start)&gt;0">
							<xsl:value-of select="@space-start"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$spacestart"/></xsl:otherwise>
					</xsl:choose></xsl:attribute>
					<xsl:attribute name="space-end"><xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@space-end)&gt;0">
							<xsl:value-of select="@space-end"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$spaceend"/></xsl:otherwise>
					</xsl:choose></xsl:attribute>
					<xsl:attribute name="font-family"><xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@font-family)&gt;0">
							<xsl:value-of select="@font-family"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$fontfamily"/></xsl:otherwise>
					</xsl:choose></xsl:attribute>
					<xsl:attribute name="alt-fontname"><xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@alt-fontname)&gt;0">
							<xsl:value-of select="@alt-fontname"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$altfont"/></xsl:otherwise>
					</xsl:choose></xsl:attribute>
					<xsl:attribute name="font-size"><xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@font-size)&gt;0">
							<xsl:value-of select="@font-size"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$fontsize"/></xsl:otherwise>
					</xsl:choose></xsl:attribute>
					<xsl:attribute name="indent"><xsl:value-of select="0 - string-length(@序號)"/></xsl:attribute>
					<xsl:attribute name="padding-start"><xsl:value-of select="string-length(@序號) + number($offset)"/></xsl:attribute>
					<xsl:attribute name="line-height"><xsl:choose>
						<xsl:when test="$自訂='true' and string-length(@line-height)&gt;0">
							<xsl:value-of select="@line-height"/>
						</xsl:when>
						<xsl:otherwise><xsl:value-of select="$lineheight"/></xsl:otherwise>
					</xsl:choose></xsl:attribute>
					<xsl:if test="@AlignParentContext">
						<xsl:attribute name="align-parent-context">
							<xsl:value-of select="@AlignParentContext"/>
						</xsl:attribute>
					</xsl:if>
					<xsl:attribute name="align-inline"><xsl:choose>
						<xsl:when test="string-length(@alignment)>0">
							<xsl:value-of select="@alignment"/>
						</xsl:when>
						<xsl:otherwise>both</xsl:otherwise>
					</xsl:choose></xsl:attribute>
					<xsl:if test="$自訂='true' and string-length(@styles)&gt;0"><!-- 2016.12.8 fix for 粗、斜、底、上下標 -->
						<xsl:attribute name="font-style">
							<xsl:value-of select="@styles"/>
						</xsl:attribute>
					</xsl:if>
					<xsl:value-of select="@序號"/>
					<xsl:apply-templates select="文字"/>
				</xsl:element>
				<xsl:apply-templates select="條列">
					<xsl:with-param name="spacebefore" select="$spacebefore"/>
					<xsl:with-param name="spaceafter" select="$spaceafter"/>
					<xsl:with-param name="spacestart" select="$spacestart"/>
					<xsl:with-param name="spaceend" select="$spaceend"/>
					<xsl:with-param name="fontfamily" select="$fontfamily"/>
					<xsl:with-param name="altfont" select="$altfont"/>
					<xsl:with-param name="fontsize" select="$fontsize"/>
					<xsl:with-param name="offset" select="number($offset) + 1"/>
					<xsl:with-param name="lineheight" select="$lineheight"/>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="人事條列">
		<xsl:param name="spacebefore"/>
		<xsl:param name="spaceafter"/>
		<xsl:param name="spacestart"/>
		<xsl:param name="spaceend"/>
		<xsl:param name="fontfamily"/>
		<xsl:param name="altfont"/>
		<xsl:param name="fontsize"/>
		<xsl:param name="offset"/>
		<xsl:param name="lineheight"/>
		<xsl:param name="paraIndex"/><!-- 1090423 Raymond 1090293 新增段落的索引值, 供人事條列使用 -->
		<!-- 1090226 Raymond 1090116 追蹤修訂刪除冒號時, 要取沒有已刪除的文字來判斷冒號位置 -->
		<xsl:variable name="pureTx">
			<xsl:for-each select="文字//text()">
				<xsl:choose>
					<xsl:when test="name(..) = 'mi' and ../@act = 'del'"></xsl:when>
					<xsl:otherwise><xsl:value-of select="."/></xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
		</xsl:variable>
		<xsl:variable name="le">
			<xsl:choose>
				<xsl:when test="$paraIndex = 0 and string-length(substring-before(string($pureTx), '：')) &gt; 0 and string-length(substring-before(string($pureTx), '：')) &lt; (string-length($pureTx) - 1)"><!-- 1090423 Raymond 1090293 人事條列在非第0段落不須對齊冒號, 1140624 Raymond 1140952 若冒號是最後一個字則不要對齊, 以避免冒號出現在靠右邊界甚至下一行時無剩餘空間容納下一個字時, 整行位移至次行的問題 -->
					<xsl:value-of select="string-length(substring-before(string($pureTx), '：'))+1"/>
				</xsl:when>
				<xsl:otherwise>0</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:element name="para">
			<xsl:attribute name="space-before"><xsl:choose>
				<xsl:when test="$自訂='true' and string-length(@space-before)&gt;0">
					<xsl:value-of select="@space-before"/>
				</xsl:when>
				<xsl:otherwise><xsl:value-of select="$spacebefore"/></xsl:otherwise>
			</xsl:choose></xsl:attribute>
			<xsl:attribute name="space-after"><xsl:choose>
				<xsl:when test="$自訂='true' and string-length(@space-after)&gt;0">
					<xsl:value-of select="@space-after"/>
				</xsl:when>
				<xsl:otherwise><xsl:value-of select="$spaceafter"/></xsl:otherwise>
			</xsl:choose></xsl:attribute>
			<xsl:attribute name="space-start"><xsl:choose>
				<xsl:when test="$自訂='true' and string-length(@space-start)&gt;0">
					<xsl:value-of select="@space-start"/>
				</xsl:when>
				<xsl:otherwise><xsl:value-of select="$spacestart"/></xsl:otherwise>
			</xsl:choose></xsl:attribute>
			<xsl:attribute name="space-end"><xsl:choose>
				<xsl:when test="$自訂='true' and string-length(@space-end)&gt;0">
					<xsl:value-of select="@space-end"/>
				</xsl:when>
				<xsl:otherwise><xsl:value-of select="$spaceend"/></xsl:otherwise>
			</xsl:choose></xsl:attribute>
			<xsl:attribute name="font-family"><xsl:choose>
				<xsl:when test="$自訂='true' and string-length(@font-family)&gt;0">
					<xsl:value-of select="@font-family"/>
				</xsl:when>
				<xsl:otherwise><xsl:value-of select="$fontfamily"/></xsl:otherwise>
			</xsl:choose></xsl:attribute>
			<xsl:attribute name="alt-fontname"><xsl:choose>
				<xsl:when test="$自訂='true' and string-length(@alt-fontname)&gt;0">
					<xsl:value-of select="@alt-fontname"/>
				</xsl:when>
				<xsl:otherwise><xsl:value-of select="$altfont"/></xsl:otherwise>
			</xsl:choose></xsl:attribute>
			<xsl:attribute name="font-size"><xsl:choose>
				<xsl:when test="$自訂='true' and string-length(@font-size)&gt;0">
					<xsl:value-of select="@font-size"/>
				</xsl:when>
				<xsl:otherwise><xsl:value-of select="$fontsize"/></xsl:otherwise>
			</xsl:choose></xsl:attribute>
			<xsl:attribute name="indent">
				<xsl:value-of select="0 - string-length(@序號) - $le"/>
			</xsl:attribute>
			<xsl:attribute name="padding-start">
				<xsl:value-of select="string-length(@序號) + number($offset) + $le"/>
			</xsl:attribute>
			<xsl:attribute name="line-height"><xsl:choose>
				<xsl:when test="$自訂='true' and string-length(@line-height)&gt;0">
					<xsl:value-of select="@line-height"/>
				</xsl:when>
				<xsl:otherwise><xsl:value-of select="$lineheight"/></xsl:otherwise>
			</xsl:choose></xsl:attribute>
			<!-- 1110927 Raymond 1110990 修正令條列沒有對齊父段落功能的問題 -->
			<xsl:if test="@AlignParentContext">
				<xsl:attribute name="align-parent-context">
					<xsl:value-of select="@AlignParentContext"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:attribute name="align-inline"><xsl:choose>
				<xsl:when test="string-length(@alignment)>0">
					<xsl:value-of select="@alignment"/>
				</xsl:when>
				<xsl:otherwise>both</xsl:otherwise>
			</xsl:choose></xsl:attribute>
			<xsl:if test="$自訂='true' and string-length(@styles)&gt;0"><!-- 2016.12.8 fix for 粗、斜、底、上下標 -->
				<xsl:attribute name="font-style">
					<xsl:value-of select="@styles"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:value-of select="@序號"/>
			<xsl:apply-templates select="文字"/>
		</xsl:element>
		<xsl:apply-templates select="條列">
			<xsl:with-param name="spacebefore" select="$spacebefore"/>
			<xsl:with-param name="spaceafter" select="$spaceafter"/>
			<xsl:with-param name="spacestart" select="$spacestart"/>
			<xsl:with-param name="spaceend" select="$spaceend"/>
			<xsl:with-param name="fontfamily" select="$fontfamily"/>
			<xsl:with-param name="altfont" select="$altfont"/>
			<xsl:with-param name="fontsize" select="$fontsize"/>
			<xsl:with-param name="offset" select="number($offset) + 1"/>
			<xsl:with-param name="lineheight" select="$lineheight"/>
			<xsl:with-param name="paraIndex" select="$paraIndex"/><!-- 1090423 Raymond 1090293 傳入此段落的index, 供人事條列判斷是否對齊冒號 -->
		</xsl:apply-templates>
	</xsl:template>
	<!-- 1091016 Raymond 1090621 合併FDA(1090507)令的條列次行要空兩格  -->
	<xsl:template name="令條列">
		<xsl:param name="spacebefore"/>
		<xsl:param name="spaceafter"/>
		<xsl:param name="spacestart"/>
		<xsl:param name="spaceend"/>
		<xsl:param name="fontfamily"/>
		<xsl:param name="altfont"/>
		<xsl:param name="fontsize"/>
		<xsl:param name="offset"/>
		<xsl:param name="lineheight"/>
		<xsl:element name="para">
			<xsl:attribute name="space-before">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-before)&gt;0">
						<xsl:value-of select="@space-before"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$spacebefore"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="space-after">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-after)&gt;0">
						<xsl:value-of select="@space-after"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$spaceafter"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="space-start">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-start)&gt;0">
						<xsl:value-of select="@space-start"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$spacestart"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="space-end">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@space-end)&gt;0">
						<xsl:value-of select="@space-end"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$spaceend"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="font-family">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-family)&gt;0">
						<xsl:value-of select="@font-family"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$fontfamily"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="alt-fontname">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@alt-fontname)&gt;0">
						<xsl:value-of select="@alt-fontname"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$altfont"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="font-size">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@font-size)&gt;0">
						<xsl:value-of select="@font-size"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$fontsize"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="indent">-2</xsl:attribute>
			<xsl:attribute name="padding-start">
				<xsl:value-of select="number($offset) + 2"/>
			</xsl:attribute>
			<xsl:attribute name="line-height">
				<xsl:choose>
					<xsl:when test="$自訂='true' and string-length(@line-height)&gt;0">
						<xsl:value-of select="@line-height"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$lineheight"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<!-- 1110927 Raymond 1110990 修正令條列沒有對齊父段落功能的問題 -->
			<xsl:if test="@AlignParentContext">
				<xsl:attribute name="align-parent-context">
					<xsl:value-of select="@AlignParentContext"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:attribute name="align-inline">
				<xsl:choose>
					<xsl:when test="string-length(@alignment)&gt;0">
						<xsl:value-of select="@alignment"/>
					</xsl:when>
					<!-- 1130319 Raymond 1121074 令的段落條列恢復分散對齊 -->
					<!-- 1091016 Raymond 1090621 合併FDA(1090507)令的段落條列要靠左對齊  -->
					<xsl:otherwise>both</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:if test="$自訂='true' and string-length(@styles)&gt;0"><!-- 2016.12.8 fix for 粗、斜、底、上下標 -->
				<xsl:attribute name="font-style">
					<xsl:value-of select="@styles"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:value-of select="@序號"/>
			<xsl:apply-templates select="文字"/>
		</xsl:element>
		<xsl:apply-templates select="條列">
			<xsl:with-param name="spacebefore" select="$spacebefore"/>
			<xsl:with-param name="spaceafter" select="$spaceafter"/>
			<xsl:with-param name="spacestart" select="$spacestart"/>
			<xsl:with-param name="spaceend" select="$spaceend"/>
			<xsl:with-param name="fontfamily" select="$fontfamily"/>
			<xsl:with-param name="altfont" select="$altfont"/>
			<xsl:with-param name="fontsize" select="$fontsize"/>
			<xsl:with-param name="offset" select="number($offset) + 1"/>
			<xsl:with-param name="lineheight" select="$lineheight"/>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template match="文字">
		<xsl:param name="id"></xsl:param>
		<xsl:element name="a">
			<xsl:if test="$id != ''"><xsl:attribute name="id"><xsl:value-of select="$id"/></xsl:attribute></xsl:if>
			<xsl:attribute name="sync-path"><xsl:call-template name="getXPath"><xsl:with-param name="p" select="."/></xsl:call-template></xsl:attribute>
			<xsl:choose>
				<!-- 1120817 Raymond 1120503 支援自訂表格排版 -->
				<xsl:when test="./CTBL"><xsl:copy-of select="CTBL"/></xsl:when>
				<!-- 2017.1.3 配合二代隱藏標號但仍會空一行的行為, 判斷文字內容是空的時候填一個全形空白 -->
				<xsl:when test="$新系統='false' and string-length(./text())=0 and count(./fmt)=0 and (($檢視模式='1' and count(./mi)=0) or ($檢視模式!='1' and count(./mi[@act!='del'])=0))">
					<xsl:text>　</xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:for-each select=".//text()">
						<xsl:choose>
							<xsl:when test="name(..)='mi'">
								<xsl:apply-templates select=".."> 
									<xsl:with-param name="tnode" select="."/>
								</xsl:apply-templates>
							</xsl:when>
							<xsl:when test="name(..)='fmt'">
								<xsl:apply-templates select="..">
									<xsl:with-param name="tnode" select="."/>
								</xsl:apply-templates>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="."/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:for-each>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
	</xsl:template>
	<xsl:template match="mi">
		<xsl:param name="r">0</xsl:param>
		<xsl:param name="b">0</xsl:param>
		<xsl:param name="u">0</xsl:param>
		<xsl:param name="nocolor"/>
		<xsl:param name="fontsize"/>
		<xsl:param name="fontname"/>
		<xsl:param name="altfont"/>
		<xsl:param name="fmt">false</xsl:param>
		<xsl:param name="rcr">false</xsl:param>
		<xsl:param name="ins">false</xsl:param>
		<xsl:param name="tnode"/>
		<xsl:choose>
			<xsl:when test="$檢視模式='1'">
				<xsl:call-template name="追蹤修訂模式">
					<xsl:with-param name="r" select="$r"/>
					<xsl:with-param name="b" select="$b"/>
					<xsl:with-param name="u" select="$u"/>
					<xsl:with-param name="nocolor" select="$nocolor"/>
					<xsl:with-param name="fmt" select="$fmt"/>
					<xsl:with-param name="rcr" select="$rcr"/>
					<xsl:with-param name="ins" select="$ins"/>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:when test="$檢視模式='2'">
				<xsl:call-template name="精簡修訂模式">
					<xsl:with-param name="r" select="$r"/>
					<xsl:with-param name="b" select="$b"/>
					<xsl:with-param name="u" select="$u"/>
					<xsl:with-param name="nocolor" select="$nocolor"/>
					<xsl:with-param name="fmt" select="$fmt"/>
					<xsl:with-param name="rcr" select="$rcr"/>
					<xsl:with-param name="ins" select="$ins"/>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="完稿模式">
					<xsl:with-param name="r" select="$r"/>
					<xsl:with-param name="b" select="$b"/>
					<xsl:with-param name="u" select="$u"/>
					<xsl:with-param name="nocolor" select="$nocolor"/>
					<xsl:with-param name="fontsize" select="$fontsize"/>
					<xsl:with-param name="fontname" select="$fontname"/>
					<xsl:with-param name="altfont" select="$altfont"/>
					<xsl:with-param name="fmt" select="$fmt"/>
					<xsl:with-param name="rcr" select="$rcr"/>
					<xsl:with-param name="ins" select="$ins"/>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="fmt">
		<xsl:param name="tnode"/>
		<xsl:choose>
			<xsl:when test="name(..)='mi'">
				<xsl:variable name="b" select="@styles mod 2"/>
				<xsl:variable name="u" select="floor((@styles mod 8) div 4) * 4"/>
				<xsl:apply-templates select="..">
					<xsl:with-param name="r" select="@styles - $b - $u"/>
					<xsl:with-param name="b" select="$b"/>
					<xsl:with-param name="u" select="$u"/>
					<xsl:with-param name="nocolor">true</xsl:with-param>
					<xsl:with-param name="fontsize" select="@font-size"/>
					<xsl:with-param name="fontname" select="@font-name"/>
					<xsl:with-param name="altfont" select="@alt-fontname"/>
					<xsl:with-param name="fmt">true</xsl:with-param>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="makeInline">
					<xsl:with-param name="ustyle" select="@styles"/>
					<xsl:with-param name="nocolor">true</xsl:with-param>
					<xsl:with-param name="fontsize" select="@font-size"/>
					<xsl:with-param name="fontname" select="@font-name"/>
					<xsl:with-param name="altfont" select="@alt-fontname"/>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="追蹤修訂模式">
		<xsl:param name="r">0</xsl:param>
		<xsl:param name="b">0</xsl:param>
		<xsl:param name="u">0</xsl:param>
		<xsl:param name="nocolor">true</xsl:param>
		<xsl:param name="fmt">false</xsl:param>
		<xsl:param name="rcr">false</xsl:param>
		<xsl:param name="ins">false</xsl:param>
		<xsl:param name="tnode"/>
		<xsl:choose>
			<xsl:when test="name(..)='mi'">
				<xsl:apply-templates select="..">
					<xsl:with-param name="r" select="$r"/>
					<xsl:with-param name="b" select="$b"/>
					<xsl:with-param name="u" select="$u"/>
					<xsl:with-param name="nocolor">
						<xsl:choose> 
							<xsl:when test="@act='fmt'">true</xsl:when>
							<xsl:otherwise>false</xsl:otherwise>
						</xsl:choose>
					</xsl:with-param>
					<xsl:with-param name="rcr" select="@act='rcr'"/>
					<xsl:with-param name="ins" select="@act='ins'"/>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="makeInline">
					<xsl:with-param name="ustyle">
						<xsl:choose>
							<xsl:when test="@act='fmt'">
								<xsl:variable name="bb" select="@styles mod 2"/>
								<xsl:variable name="uu" select="floor((@styles mod 8) div 4) * 4"/>
								<xsl:choose>
									<xsl:when test="$rcr">
										<xsl:value-of select="@styles - $bb + 1"/>
									</xsl:when>
									<xsl:when test="$ins">
										<xsl:value-of select="@styles - $uu + 4"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="@styles"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:when>
							<xsl:when test="@act='ins'">
								<xsl:variable name="ex-u">
									<xsl:choose>
										<xsl:when test="@styles">
											<xsl:value-of select="@styles - (floor((@styles mod 8) div 4) * 4)"/>
										</xsl:when>
										<xsl:otherwise>0</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:value-of select="$ex-u + 4"/>
							</xsl:when>
							<xsl:when test="@act='del'">
								<xsl:value-of select="$r + $b + $u + 32"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:variable name="i">
									<xsl:choose>
										<xsl:when test="floor(($r mod 4) div 2) or floor((@styles mod 4) div 2)">2</xsl:when>
										<xsl:otherwise>0</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:variable name="p">
									<xsl:choose>
										<xsl:when test="floor(($r mod 16) div 8) or floor((@styles mod 16) div 8)">8</xsl:when>
										<xsl:otherwise>0</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:variable name="t">
									<xsl:choose>
										<xsl:when test="floor(($r mod 32) div 16) or floor((@styles mod 32) div 16)">16</xsl:when>
										<xsl:otherwise>0</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:value-of select="$i + $p + $t + $u + 1"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:with-param>
					<xsl:with-param name="nocolor">
						<xsl:choose>
							<xsl:when test="@act='fmt'"><xsl:value-of select="$nocolor"/></xsl:when>
							<xsl:otherwise>false</xsl:otherwise>
						</xsl:choose>
					</xsl:with-param>
					<xsl:with-param name="fontname">
						<xsl:if test="@font-name">
							<xsl:value-of select="@font-name"/>
						</xsl:if>
					</xsl:with-param>
					<xsl:with-param name="altfont">
						<xsl:if test="@alt-fontname">
							<xsl:value-of select="@alt-fontname"/>
						</xsl:if>
					</xsl:with-param>
					<xsl:with-param name="fontsize">
						<xsl:if test="@font-size">
							<xsl:value-of select="@font-size"/>
						</xsl:if>
					</xsl:with-param>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="精簡修訂模式">
		<xsl:param name="r">0</xsl:param>
		<xsl:param name="b">0</xsl:param>
		<xsl:param name="u">0</xsl:param>
		<xsl:param name="ustyle">0</xsl:param>
		<xsl:param name="nocolor">true</xsl:param>
		<xsl:param name="fmt">false</xsl:param>
		<xsl:param name="rcr">false</xsl:param>
		<xsl:param name="ins">false</xsl:param>
		<xsl:param name="tnode"/>
		<xsl:choose>
			<xsl:when test="name(..)='mi'">
				<xsl:apply-templates select="..">
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="@sn = $編輯階段序號">
						<xsl:call-template name="makeInline">
							<xsl:with-param name="ustyle">
								<xsl:choose>
									<xsl:when test="@act='fmt'">
										<xsl:value-of select="@styles"/>
									</xsl:when>
									<xsl:when test="@act='ins'">
										<xsl:variable name="ex-u">
											<xsl:choose>
												<xsl:when test="@styles">
													<xsl:value-of select="@styles - (floor((@styles mod 8) div 4) * 4)"/>
												</xsl:when>
												<xsl:otherwise>0</xsl:otherwise>
											</xsl:choose>
										</xsl:variable>
										<xsl:value-of select="$ex-u + 4"/>
									</xsl:when>
									<xsl:when test="@act='del'">
										<xsl:value-of select="$r + $b + $u + 32"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:variable name="i">
											<xsl:choose>
												<xsl:when test="floor(($r mod 4) div 2) or floor((@styles mod 4) div 2)">2</xsl:when>
												<xsl:otherwise>0</xsl:otherwise>
											</xsl:choose>
										</xsl:variable>
										<xsl:variable name="p">
											<xsl:choose>
												<xsl:when test="floor(($r mod 16) div 8) or floor((@styles mod 16) div 8)">8</xsl:when>
												<xsl:otherwise>0</xsl:otherwise>
											</xsl:choose>
										</xsl:variable>
										<xsl:variable name="t">
											<xsl:choose>
												<xsl:when test="floor(($r mod 32) div 16) or floor((@styles mod 32) div 16)">16</xsl:when>
												<xsl:otherwise>0</xsl:otherwise>
											</xsl:choose>
										</xsl:variable>
										<xsl:value-of select="$i + $p + $t + $u + 1"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="nocolor">
								<xsl:choose>
									<xsl:when test="@act='fmt'">true</xsl:when>
									<xsl:otherwise>false</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="fontname">
								<xsl:if test="@font-name">
									<xsl:value-of select="@font-name"/>
								</xsl:if>
							</xsl:with-param>
							<xsl:with-param name="altfont">
								<xsl:if test="@alt-fontname">
									<xsl:value-of select="@alt-fontname"/>
								</xsl:if>
							</xsl:with-param>
							<xsl:with-param name="fontsize">
								<xsl:if test="@font-size">
									<xsl:value-of select="@font-size"/>
								</xsl:if>
							</xsl:with-param>
							<xsl:with-param name="tnode" select="$tnode"/>
						</xsl:call-template>
					</xsl:when>
					<xsl:when test="@sn &lt; $編輯階段序號">
						<xsl:if test="@act != 'del'">
							<xsl:value-of select="$tnode"/>
						</xsl:if>
					</xsl:when>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="完稿模式">
		<xsl:param name="r">0</xsl:param>
		<xsl:param name="b">0</xsl:param>
		<xsl:param name="u">0</xsl:param>
		<xsl:param name="ustyle">0</xsl:param>
		<xsl:param name="nocolor">true</xsl:param>
		<xsl:param name="fontsize"/>
		<xsl:param name="fontname"/>
		<xsl:param name="altfont"/>
		<xsl:param name="fmt">false</xsl:param>
		<xsl:param name="rcr">false</xsl:param>
		<xsl:param name="ins">false</xsl:param>
		<xsl:param name="tnode"/>
		<xsl:choose>
			<xsl:when test="name(..)='mi'">
				<xsl:apply-templates select="..">
					<xsl:with-param name="ustyle">
						<xsl:choose>
							<xsl:when test="(@act != 'del') and @styles">
								<xsl:value-of select="@styles"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$ustyle"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:with-param>
					<xsl:with-param name="fontsize">
						<xsl:choose>
							<xsl:when test="(@act != 'del') and @font-size">
								<xsl:value-of select="@font-size"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$fontsize"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:with-param>
					<xsl:with-param name="fontname">
						<xsl:choose>
							<xsl:when test="(@act != 'del') and @font-name">
								<xsl:value-of select="@font-name"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$fontname"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:with-param>
					<xsl:with-param name="altfont">
						<xsl:choose>
							<xsl:when test="(@act != 'del') and @alt-fontname">
								<xsl:value-of select="@alt-fontname"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$altfont"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:with-param>
					<xsl:with-param name="tnode" select="$tnode"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="@act='fmt'">
						<xsl:call-template name="makeInline">
							<xsl:with-param name="ustyle" select="@styles"/>
							<xsl:with-param name="nocolor">true</xsl:with-param>
							<xsl:with-param name="fontsize" select="@font-size"/>
							<xsl:with-param name="fontname" select="@font-name"/>
							<xsl:with-param name="altfont" select="@alt-fontname"/>
							<xsl:with-param name="tnode" select="$tnode"/>
						</xsl:call-template>
					</xsl:when>
					<xsl:when test="@act != 'del'">
						<xsl:call-template name="makeInline">
							<xsl:with-param name="ustyle">
								<xsl:choose>
									<xsl:when test="@styles">
										<xsl:value-of select="@styles"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="$r + $b + $u"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="nocolor">true</xsl:with-param>
							<xsl:with-param name="fontsize">
								<xsl:choose>
									<xsl:when test="@font-size">
										<xsl:value-of select="@font-size"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="$fontsize"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="fontname">
								<xsl:choose>
									<xsl:when test="@font-name">
										<xsl:value-of select="@font-name"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="$fontname"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="altfont">
								<xsl:choose>
									<xsl:when test="@alt-fontname">
										<xsl:value-of select="@alt-fontname"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="$altfont"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:with-param>
							<xsl:with-param name="tnode" select="$tnode"/>
						</xsl:call-template>
					</xsl:when>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="makeInline">
		<xsl:param name="ustyle">0</xsl:param>
		<xsl:param name="nocolor">false</xsl:param>
		<xsl:param name="fontsize"/>
		<xsl:param name="fontname"/>
		<xsl:param name="altfont"/>
		<xsl:param name="tnode"/>
		<xsl:element name="inline">
			<xsl:attribute name="font-style"><xsl:value-of select="$ustyle"/></xsl:attribute>
			<xsl:if test="$nocolor='false'">
				<xsl:attribute name="font-color"><xsl:choose>
					<xsl:when test="@sn='1'"><xsl:value-of select="$color1"/></xsl:when>
					<xsl:when test="@sn='2'"><xsl:value-of select="$color2"/></xsl:when>
					<xsl:when test="@sn='3'"><xsl:value-of select="$color3"/></xsl:when>
					<xsl:when test="@sn='4'"><xsl:value-of select="$color4"/></xsl:when>
					<xsl:when test="@sn='5'"><xsl:value-of select="$color5"/></xsl:when>
					<xsl:when test="@sn='6'"><xsl:value-of select="$color6"/></xsl:when>
					<xsl:when test="@sn='7'"><xsl:value-of select="$color7"/></xsl:when>
					<xsl:when test="@sn='8'"><xsl:value-of select="$color8"/></xsl:when>
					<xsl:when test="@sn='9'"><xsl:value-of select="$color9"/></xsl:when>
					<xsl:when test="@sn='10'"><xsl:value-of select="$color10"/></xsl:when>
					<xsl:when test="@sn='11'"><xsl:value-of select="$color11"/></xsl:when>
					<xsl:when test="@sn='12'"><xsl:value-of select="$color12"/></xsl:when>
					<xsl:when test="@sn='13'"><xsl:value-of select="$color13"/></xsl:when>
					<xsl:when test="@sn='14'"><xsl:value-of select="$color14"/></xsl:when>
					<xsl:when test="@sn='15'"><xsl:value-of select="$color15"/></xsl:when>
					<xsl:when test="@sn='16'"><xsl:value-of select="$color16"/></xsl:when>
					<xsl:when test="@sn='17'"><xsl:value-of select="$color17"/></xsl:when>
					<xsl:when test="@sn='18'"><xsl:value-of select="$color18"/></xsl:when>
					<xsl:when test="@sn='19'"><xsl:value-of select="$color19"/></xsl:when>
					<xsl:when test="@sn='20'"><xsl:value-of select="$color20"/></xsl:when>
					<xsl:when test="@sn='21'"><xsl:value-of select="$color21"/></xsl:when>
					<xsl:when test="@sn='22'"><xsl:value-of select="$color22"/></xsl:when>
					<xsl:when test="@sn='23'"><xsl:value-of select="$color23"/></xsl:when>
					<xsl:when test="@sn='24'"><xsl:value-of select="$color24"/></xsl:when>
					<xsl:when test="@sn='25'"><xsl:value-of select="$color25"/></xsl:when>
					<xsl:when test="@sn='26'"><xsl:value-of select="$color26"/></xsl:when>
					<xsl:when test="@sn='27'"><xsl:value-of select="$color27"/></xsl:when>
					<xsl:when test="@sn='28'"><xsl:value-of select="$color28"/></xsl:when>
					<xsl:when test="@sn='29'"><xsl:value-of select="$color29"/></xsl:when>
					<xsl:when test="@sn='30'"><xsl:value-of select="$color30"/></xsl:when>
					<xsl:when test="@sn='31'"><xsl:value-of select="$color31"/></xsl:when>
					<xsl:when test="@sn='32'"><xsl:value-of select="$color32"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="$color0"/></xsl:otherwise>
				</xsl:choose></xsl:attribute>
			</xsl:if>
			<xsl:if test="string-length($fontsize)&gt;0">
				<xsl:attribute name="font-size"><xsl:value-of select="$fontsize"/></xsl:attribute>
			</xsl:if>
			<xsl:if test="string-length($fontname)&gt;0">
				<xsl:attribute name="font-name"><xsl:value-of select="$fontname"/></xsl:attribute>
			</xsl:if>
			<xsl:if test="string-length($altfont)&gt;0">
				<xsl:attribute name="alt-fontname"><xsl:value-of select="$altfont"/></xsl:attribute>
			</xsl:if>
			<xsl:choose>
				<xsl:when test="$tnode">
					<xsl:value-of select="$tnode"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="."/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
	</xsl:template>
<xsl:template name="置中">
	<xsl:param name="Aall"></xsl:param>
	<xsl:param name="Acurr"></xsl:param>
	<xsl:param name="AcurrPos"></xsl:param>
	<xsl:param name="AtagPos">0</xsl:param>
	<xsl:variable name="Aunit" select="$Acurr"/>
	<xsl:variable name="Aunit1" select="$Aall[number($AcurrPos + 2)]"/>
		<xsl:choose>
			<xsl:when test="$Acurr='先會' or $Acurr='後會' or $Acurr='敬會'">
				<xsl:choose>
					<xsl:when test="$Aunit1 !=''">
						<xsl:call-template name="置中">
							<xsl:with-param name="Aall" select="$Aall"/>
							<xsl:with-param name="Acurr" select="$Aall[number($AcurrPos) + 2]"/>
							<xsl:with-param name="AcurrPos" select="number($AcurrPos) + 2"/>
							<xsl:with-param name="AtagPos" select="$AcurrPos"/>
						</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<xsl:call-template name="compTogetherCol0-2">
						</xsl:call-template>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="compTogetherCol0-1">
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
</xsl:template>
<xsl:template name="compTogetherCol0-1">
			<table show-in-page="7" space-before="0.0" space-after="0.0" space-start="0.0" space-end="0.0" border-width="0">
				<xsl:variable name="會稿單位RowHigh"><xsl:value-of select="count(會稿單位列表/單位)*15"/></xsl:variable>
				<xsl:variable name="會稿單位真正RowHigh">
					<xsl:choose>
						<xsl:when test="number($會稿單位RowHigh) &gt; 220">0</xsl:when><!-- 超過一頁 不設定-->
						<xsl:otherwise><xsl:value-of select="number($會稿單位RowHigh)"/></xsl:otherwise>
					</xsl:choose>
				</xsl:variable>

				<xsl:element name="table-row">
					<xsl:attribute name="row-height"><xsl:value-of select ="$會稿單位真正RowHigh" /></xsl:attribute>
					<table-cell writing-mode="inherit" align-block="before" border-width="0" cell-width="1" />
						<xsl:variable name="together" select="會稿單位列表/單位" />
					<table-cell writing-mode="inherit" align-block="start" border-width="0" cell-width="40">
					<xsl:call-template name="compTogetherCol1">
						<xsl:with-param name="all" select="$together"/>
						<xsl:with-param name="curr" select="$together[1]"/>
						<xsl:with-param name="currPos">1</xsl:with-param>
					</xsl:call-template>
					</table-cell>
					<table-cell writing-mode="inherit" align-block="before" border-width="0" cell-width="0">
						<para show-in-page="7" space-before="1.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
							<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
							<xsl:text>　</xsl:text>
						</para>
					<xsl:call-template name="compTogetherCol2">
						<xsl:with-param name="all" select="$together"/>
						<xsl:with-param name="curr" select="$together[1]"/>
						<xsl:with-param name="currPos">1</xsl:with-param>
					</xsl:call-template>
					</table-cell>
				</xsl:element>
			</table>
</xsl:template>
<xsl:template name="compTogetherCol0-2">
			<table show-in-page="7" space-before="0.0" space-after="0.0" space-start="0.0" space-end="0.0" border-width="0">
				<xsl:variable name="會稿單位RowHigh"><xsl:value-of select="count(會稿單位列表/單位)*15"/></xsl:variable>
				<xsl:variable name="會稿單位真正RowHigh">
					<xsl:choose>
						<xsl:when test="number($會稿單位RowHigh) &gt; 220">0</xsl:when><!-- 超過一頁 不設定-->
						<xsl:otherwise><xsl:value-of select="number($會稿單位RowHigh)"/></xsl:otherwise>
					</xsl:choose>
				</xsl:variable>

				<xsl:element name="table-row">
					<xsl:attribute name="row-height"><xsl:value-of select ="$會稿單位真正RowHigh" /></xsl:attribute>
					<table-cell writing-mode="inherit" align-block="before" border-width="0" cell-width="20" />
						<xsl:variable name="together" select="會稿單位列表/單位" />
					<table-cell writing-mode="inherit" align-block="start" border-width="0" cell-width="60">
						<xsl:call-template name="compTogetherCol1">
						<xsl:with-param name="all" select="$together"/>
						<xsl:with-param name="curr" select="$together[1]"/>
						<xsl:with-param name="currPos">1</xsl:with-param>
					</xsl:call-template>
					</table-cell>
				</xsl:element>
			</table>
</xsl:template>
<xsl:template name="compTogetherCol0-3">
			<table show-in-page="7" space-before="0.0" space-after="0.0" space-start="0.0" space-end="0.0" border-width="0">
				<xsl:variable name="會稿單位RowHigh"><xsl:value-of select="count(會稿單位列表/單位)*15"/></xsl:variable>
				<xsl:variable name="會稿單位真正RowHigh">
					<xsl:choose>
						<xsl:when test="number($會稿單位RowHigh) &gt; 220">0</xsl:when><!-- 超過一頁 不設定-->
						<xsl:otherwise><xsl:value-of select="number($會稿單位RowHigh)"/></xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:element name="table-row">
					<xsl:choose>
					<xsl:when test="會稿單位列表/單位[2] != ''">
						<xsl:choose>	<!--判斷若顯示會辦單位，是否只有一個單位-->
							<xsl:when test="會稿單位列表/單位[2] = '先會' or 會稿單位列表/單位[2] = '敬會' or 會稿單位列表/單位[2] = '後會'">
								<xsl:attribute name="row-height"><xsl:value-of select ="$會稿單位真正RowHigh" /></xsl:attribute>
								<table-cell writing-mode="inherit" align-block="before" border-width="0" cell-width="1" />
									<xsl:variable name="together" select="會稿單位列表/單位" />
								<table-cell writing-mode="inherit" align-block="start" border-width="0" cell-width="40">
									<para show-in-page="7" space-before="1.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
										<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>會辦單位
									</para>
									<xsl:call-template name="compTogetherCol1">
										<xsl:with-param name="all" select="$together"/>
										<xsl:with-param name="curr" select="$together[1]"/>
										<xsl:with-param name="currPos">1</xsl:with-param>
									</xsl:call-template>
								</table-cell>
								<table-cell writing-mode="inherit" align-block="before" border-width="0" cell-width="0">
									<para show-in-page="7" space-before="0.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="3" align-inline="start">
										<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
										<xsl:text>　</xsl:text>
									</para>
									<para show-in-page="7" space-before="0.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="3" align-inline="start">
										<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
										<xsl:text>　</xsl:text>
									</para>
									<para show-in-page="7" space-before="0.0" space-after="65.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="3" align-inline="start">
										<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
										<xsl:text>　</xsl:text>
									</para>
									<xsl:call-template name="compTogetherCol2">
										<xsl:with-param name="all" select="$together"/>
										<xsl:with-param name="curr" select="$together[1]"/>
										<xsl:with-param name="currPos">1</xsl:with-param>
									</xsl:call-template>
								</table-cell>
							</xsl:when>
							<xsl:otherwise>
								<xsl:attribute name="row-height"><xsl:value-of select ="$會稿單位真正RowHigh" /></xsl:attribute>
								<table-cell writing-mode="inherit" align-block="before" border-width="0" cell-width="1" />
									<xsl:variable name="together" select="會稿單位列表/單位" />
								<table-cell writing-mode="inherit" align-block="start" border-width="0" cell-width="40">
									<para show-in-page="7" space-before="1.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
										<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>會辦單位
									</para>
									<xsl:call-template name="compTogetherCol1">
										<xsl:with-param name="all" select="$together"/>
										<xsl:with-param name="curr" select="$together[1]"/>
										<xsl:with-param name="currPos">1</xsl:with-param>
									</xsl:call-template>
								</table-cell>
								<table-cell writing-mode="inherit" align-block="before" border-width="0" cell-width="0">
									<para show-in-page="7" space-before="1.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
										<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
										<xsl:text>　</xsl:text>
									</para>
									<xsl:call-template name="compTogetherCol2">
										<xsl:with-param name="all" select="$together"/>
										<xsl:with-param name="curr" select="$together[1]"/>
										<xsl:with-param name="currPos">1</xsl:with-param>
									</xsl:call-template>
								</table-cell>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="row-height"><xsl:value-of select ="$會稿單位真正RowHigh" /></xsl:attribute>
						<table-cell writing-mode="inherit" align-block="before" border-width="0" cell-width="20" />
							<xsl:variable name="together" select="會稿單位列表/單位" />
						<table-cell writing-mode="inherit" align-block="start" border-width="0" cell-width="60">
							<para show-in-page="7" space-before="1.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
								<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>會辦單位
							</para>
							<xsl:call-template name="compTogetherCol3">
								<xsl:with-param name="all" select="$together"/>
								<xsl:with-param name="curr" select="$together[1]"/>
								<xsl:with-param name="currPos">1</xsl:with-param>
							</xsl:call-template>
						</table-cell>
					</xsl:otherwise>
					</xsl:choose>
				</xsl:element>
			</table>
</xsl:template>
<xsl:template name="compTogetherCol1">
	<xsl:param name="all"></xsl:param>
	<xsl:param name="curr"></xsl:param>
	<xsl:param name="currPos"></xsl:param>
	<xsl:param name="tagPos">0</xsl:param>
	<xsl:variable name="unit" select="$curr"/>
	<xsl:choose>
		<xsl:when test="$curr='先會' or $curr='敬會' or $curr='後會'">
			<para show-in-page="7" space-before="1.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
				<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
				<xsl:if test="$unit = ''">　</xsl:if>
				<xsl:value-of select="$curr"/>
			</para>
			<xsl:if test="number($currPos) &lt; count($all)">
				<xsl:call-template name="compTogetherCol1">
					<xsl:with-param name="all" select="$all"/>
					<xsl:with-param name="curr" select="$all[number($currPos) + 1]"/>
					<xsl:with-param name="currPos" select="number($currPos) + 1"/>
					<xsl:with-param name="tagPos" select="$currPos"/>
				</xsl:call-template>
			</xsl:if>
		</xsl:when>
		<xsl:otherwise>
			<xsl:if test="(number($currPos) - number($tagPos)) mod 2">
				<para show-in-page="7" space-before="1.0" space-after="65.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
					<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
					<xsl:if test="$unit = ''">　</xsl:if>
					<xsl:value-of select="$curr"/>
				</para>
			</xsl:if>
			<xsl:if test="number($currPos) &lt; count($all)">
				<xsl:call-template name="compTogetherCol1">
					<xsl:with-param name="all" select="$all"/>
					<xsl:with-param name="curr" select="$all[number($currPos) + 1]"/>
					<xsl:with-param name="currPos" select="number($currPos) + 1"/>
					<xsl:with-param name="tagPos" select="$tagPos"/>
				</xsl:call-template>
			</xsl:if>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="compTogetherCol2">
	<xsl:param name="all"></xsl:param>
	<xsl:param name="curr"></xsl:param>
	<xsl:param name="currPos"></xsl:param>
	<xsl:param name="tagPos">0</xsl:param>
	<xsl:variable name="unit" select="$curr"/>
	<xsl:choose>
		<xsl:when test="$curr='先會' or $curr='敬會' or $curr='後會'">
			<xsl:if test="number($currPos) &lt; count($all)">
				<xsl:call-template name="compTogetherCol2">
					<xsl:with-param name="all" select="$all"/>
					<xsl:with-param name="curr" select="$all[number($currPos) + 1]"/>
					<xsl:with-param name="currPos" select="number($currPos) + 1"/>
					<xsl:with-param name="tagPos" select="$currPos"/>
				</xsl:call-template>
			</xsl:if>
		</xsl:when>
		<xsl:otherwise>
				<xsl:variable name="unit1" select="$all[number($currPos) - 1]"/>	<!--前一個-->
				<xsl:variable name="unit2" select="$all[number($currPos) + 1]"/>	<!--後一個-->
				<xsl:choose>
					<xsl:when test="$unit1='先會' or $unit1='敬會' or $unit1='後會'">	<!--判斷是否只有一個單位-->
						<xsl:choose>
							<xsl:when test="$unit2='先會' or $unit2='敬會' or $unit2='後會'">
								<para show-in-page="7" space-before="0.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.5" align-inline="start">
									<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
									<xsl:text>　</xsl:text>
								</para>
								<para show-in-page="7" space-before="0.0" space-after="62.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.5" align-inline="start">
									<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
									<xsl:text>　</xsl:text>
								</para>
							</xsl:when>
						</xsl:choose>
					</xsl:when>
					<xsl:when test="$unit1 !='先會' or $unit1 !='敬會' or $unit1 !='後會'">		<!--判斷後面是否為先會、後會或敬會，若是則加二個para-->
						<xsl:choose>
							<xsl:when test="$unit2 ='先會' or $unit2 ='敬會' or $unit2 ='後會'">
							<xsl:if test="((number($currPos) - number($tagPos)) mod 2) != 0">
								<para show-in-page="7" space-before="0.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.5" align-inline="start">
									<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
									<xsl:text>　</xsl:text>
								</para>
								<para show-in-page="7" space-before="0.0" space-after="63.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.5" align-inline="start">
									<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
									<xsl:text>　</xsl:text>
								</para>
							</xsl:if>
							</xsl:when>
						</xsl:choose>
					</xsl:when>
				</xsl:choose>
			<xsl:if test="((number($currPos) - number($tagPos)) mod 2) = 0">
				<para show-in-page="7" space-before="1.0" space-after="65.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
					<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
					<xsl:if test="$unit = ''">　</xsl:if>
					<xsl:value-of select="$curr"/>
				</para>
				<xsl:choose>
					<xsl:when test="$unit1 !='先會' or $unit1 !='敬會' or $unit1 !='後會'">		<!--判斷在雙數的時候，若是會辦的最後一單位，則加一para-->
						<xsl:choose>
							<xsl:when test="$unit2 ='先會' or $unit2 ='敬會' or $unit2 ='後會'">
								<para show-in-page="7" space-before="0.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.5" align-inline="start">
									<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
									<xsl:text>　</xsl:text>
								</para>
							</xsl:when>
						</xsl:choose>
					</xsl:when>
				</xsl:choose>
			</xsl:if>
			<xsl:if test="number($currPos) &lt; count($all)">
				<xsl:call-template name="compTogetherCol2">
					<xsl:with-param name="all" select="$all"/>
					<xsl:with-param name="curr" select="$all[number($currPos) + 1]"/>
					<xsl:with-param name="currPos" select="number($currPos) + 1"/>
					<xsl:with-param name="tagPos" select="$tagPos"/>
				</xsl:call-template>
			</xsl:if>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>
<xsl:template name="compTogetherCol3">
	<xsl:param name="all"></xsl:param>
	<xsl:param name="curr"></xsl:param>
	<xsl:param name="currPos"></xsl:param>
	<xsl:param name="tagPos">0</xsl:param>
	<xsl:variable name="unit" select="$curr"/>
			<xsl:if test="(number($currPos) - number($tagPos)) mod 2">
				<para show-in-page="7" space-before="1.0" space-after="0.0" space-start="0" space-end="0.0" font-size="12" padding-start="0.0" padding-end="0.0" indent="0.0" line-height="1.0" align-inline="start">
					<xsl:attribute name="font-family"><xsl:value-of select="$預設字型"/></xsl:attribute>
					<xsl:if test="$unit = ''">　</xsl:if>
					<xsl:value-of select="$curr"/>
				</para>
			</xsl:if>
			<xsl:if test="number($currPos) &lt; count($all)">
				<xsl:call-template name="compTogetherCol3">
					<xsl:with-param name="all" select="$all"/>
					<xsl:with-param name="curr" select="$all[number($currPos) + 1]"/>
					<xsl:with-param name="currPos" select="number($currPos) + 1"/>
					<xsl:with-param name="tagPos" select="$tagPos"/>
				</xsl:call-template>
			</xsl:if>
</xsl:template>
	<xsl:template name="getXPath">
		<xsl:param name="p"/>
		<xsl:if test="$p/..">
			<xsl:call-template name="getXPath">
				<xsl:with-param name="p" select="$p/.."/>
			</xsl:call-template>
			<xsl:text>/</xsl:text>
			<xsl:choose>
				<xsl:when test="$p/self::*"><xsl:value-of select="name($p)"/></xsl:when>
				<xsl:otherwise>@<xsl:value-of select="name($p)"/></xsl:otherwise>
			</xsl:choose>
			<xsl:variable name="this" select="name($p)"/>
			<xsl:if test="$this = '條列' or count($p/../*[name()=$this]) &gt; 1">
				<xsl:variable name="no" select="count($p/preceding-sibling::*[name()=$this]) + 1"/>
				<xsl:value-of select="concat('[', $no, ']')"/>
			</xsl:if>
		</xsl:if>
	</xsl:template>
	<xsl:template name="deterIncAtt">
		<xsl:param name="ns"/>
		<xsl:param name="idx">1</xsl:param>
		<xsl:choose>
			<xsl:when test="$ns[number($idx)]/含附件!='是'">false</xsl:when>
			<xsl:when test="$idx=count($ns)"><!-- last node -->
				<xsl:value-of select="$ns[number($idx)]/含附件='是'"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:if test="$idx &lt; count($ns)">
					<xsl:call-template name="deterIncAtt">
						<xsl:with-param name="ns" select="$ns"/>
						<xsl:with-param name="idx" select="$idx + 1"/>
					</xsl:call-template>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>