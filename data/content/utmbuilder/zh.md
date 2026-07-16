## 构建 UTM 标记的 URL 以进行准确的营销活动跟踪

UTM 参数是告诉 Google Analytics 等分析平台确切网站流量来自何处的标准方法。如果没有 UTM 标签，来自您的电子邮件通讯、社交媒体帖子和付费广告的流量在分析中看起来都是一样的 — 所有这些都被归类为“直接”或集中到通用推荐类别中。借助 UTM 标签，您可以准确了解哪个营销活动、哪种媒体以及哪个来源吸引了每个访问者。

## UTM 参数是什么？

UTM 代表 Urchin 跟踪模块。 Urchin Software 是一家网络分析公司，于 2005 年被 Google 收购，其跟踪模块成为 Google Analytics 的基础。尽管 Urchin 本身已停产，但 UTM 命名仍作为行业标准。

UTM 参数是作为查询字符串附加到 URL 的键值对。例如：

https://example.com/sale?utm_source=newsletter&utm_medium=email&utm_campaign=summer_sale

当有人点击此链接并访问您的网站时，Google Analytics（或支持 UTM 的任何其他分析平台）会记录所有三个参数以及访问数据。

## 五个 UTM 参数

**utm_source**（必需）：标识流量的来源。示例：时事通讯、Facebook、谷歌、linkedin、twitter、instagram、播客。

**utm_medium**（必填）：描述营销渠道或机制。示例：电子邮件、社交、cpc（每次点击费用）、有机、推荐、横幅、联属网络营销。

**utm_campaign**（必需）：指定特定营销活动的名称。示例：summer_sale_2024、product_launch_v2、brand_awareness_q1。

**utm_term**（可选）：主要用于付费搜索，以识别触发广告的关键字。示例：跑步+鞋子、最佳+CRM+软件。

**utm_content**（可选）：用于 A/B 测试或区分同一活动中的多个链接。示例：cta_button、hero_image、footer_link、version_a。

## UTM 命名的最佳实践

**一致性至关重要**：utm_source=Email 和 utm_source=email 被视为两个不同的源。建立命名约定并在整个组织中遵循它。

**使用小写**：大多数团队使用全小写字母并带有下划线或连字符。避免空格（如有必要，请使用 + 或 %20，但像这样的工具会自动处理编码）。

**具有描述性但简洁**：utm_campaign=summer_sale_2024 比 utm_campaign=campaign1 告诉您更多内容。

**请勿在内部链接上使用 UTM**：UTM 参数会重置 Google Analytics 中的会话。具有 UTM 的内部链接将错误地归因流量。

## 常见营销活动 URL 示例

时事通讯：utm_source=时事通讯&utm_medium=电子邮件&utm_campaign=weekly_digest
Facebook 广告：utm_source=facebook&utm_medium=cpc&utm_campaign=brand_awareness
LinkedIn 帖子：utm_source=linkedin&utm_medium=social&utm_campaign=product_launch
传单上的二维码：utm_source=print_flyer&utm_medium=qr_code&utm_campaign=event_2024

## 如何使用构建器

输入您的目标 URL 并填写来源、媒介和营销活动字段，如果您的营销活动需要，则添加术语和内容，完整的标记 URL 会立即出现，经过正确编码，并准备复制到电子邮件、广告平台或社交帖子中。以这种方式构建它可以消除人们手动输入 UTM 链接时最常犯的两个错误：分析无法识别的参数名称中的拼写错误，以及大小写不一致，将报告中应该是一个流量源的内容分成几个看起来不同的流量源。

## 为什么一致性比您选择的确切名称更重要

分析平台将 UTM 值视为文字字符串，而不是解释其含义，因此“Newsletter”、“newsletter”和“news_letter”被记录为三个完全独立的来源，即使阅读报告的人会将它们识别为同一事物。这是 UTM 跟踪在较大的营销团队中悄然崩溃的最常见方式：每个人都同意这个概念，但没有人强制执行确切的拼写，几个月后，分析报告被分割成十几个几乎重复的行，这些行都意味着相同的营销活动。在第一次营销活动之前决定命名约定，并让每个团队成员通过相同的工具使用相同的值构建链接，比事后尝试清理数据更可靠地防止这种情况发生。

## UTM 标签和平台本机跟踪

一些广告平台（包括 Google Ads 和 Facebook Ads）提供自己的自动标记系统（gclid、fbclid），如果在同一链接上不小心使用两者，这些系统可能会与手动构建的 UTM 参数重复或冲突。一般的最佳实践是让平台的自动标记处理特定于平台的归因，同时将 UTM 参数用于您希望在 Google Analytics 中看到的更广泛的营销活动级别故事（来源、媒介和营销活动名称），因为 UTM 参数是几乎每个分析平台都一致理解的标记方案，无论实际提供点击的是哪个广告网络。

## 在启动前审核您的 UTM 链接

在活动上线之前，值得测试每个 UTM 标记的链接，就像收件人会遇到它一样：将完整的 URL 粘贴到私人浏览器窗口中，并确认它以完整的标记到达目标页面，因为某些内容管理系统和链接缩短程序会在重定向期间默默地删除查询参数。看起来在构建器中完美标记但在重定向链中某处丢失其 UTM 参数的活动将在分析中报告为“直接”流量，从而默默地删除标签本应提供的确切归因。

## 保留共享的命名参考

较大的团队受益于保留一个简单的共享参考文档，其中列出了 utm_source 和 utm_medium 的确切批准值（“电子邮件”，而不是“电子邮件”或“电子邮件”），以便每个构建活动链接的人，无论使用哪种工具，都会生成可以干净地汇总到分析报告中的同一行中的 UTM 值，而不是随着时间的推移分成几乎重复的内容。

## 私密且即时

该 URL 完全构建在您的浏览器中，因此它会在您键入时立即显示，并且您输入的任何内容都不会发送到任何服务器、记录或共享。

