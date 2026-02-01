# 可选特色内容位置说明

## 概述
系统提供两个可选的特色内容补充，它们会**添加在现有内容之后**，**不会替换**任何原始模板内容。

---

## 1. PDPA（新加坡个人数据保护法）补充内容

### 📍 **添加位置**
**第5b章 - Data Guardrails（数据防护栏）的末尾**

### 📋 **具体内容**（3条）

#### 第10条：PDPA Compliance - Personal Data Collection
确保通过AI工具收集的任何个人数据符合《2012年个人数据保护法》（PDPA）。组织必须通知个人收集、使用或披露其个人数据的目的。

#### 第11条：PDPA Compliance - Consent Requirement  
在收集、使用或披露个人数据之前获得个人同意，除非PDPA规定的例外情况适用。

#### 第12条：PDPA Compliance - Data Accuracy
做出合理努力确保收集的个人数据准确和完整，特别是当数据将用于影响个人的决策或披露给其他组织时。

### ✅ **添加方式**
```
原有的第5b章内容（9条）：
1. Only input the data you need
2. Do not input Sensitive Personal Data
3. Do not input any Restricted Data
4. Do not input access credentials
5. Additional restrictions
6. Do not use GenAI tools to make employment decisions
7. Do not upload confidential information
8. Do not represent AI work as your own
9. Do not use unapproved GenAI tools

↓ PDPA补充（添加在第9条之后）↓

10. PDPA Compliance - Personal Data Collection
11. PDPA Compliance - Consent Requirement
12. PDPA Compliance - Data Accuracy
```

### 🔧 **代码位置**
- **定义**：[policy_template.js](file:///Users/louhe/Documents/antigravity/ai-compliance-workbench/js/data/policy_template.js#L233-L250) (第233-250行)
- **实现**：[policyEngine.js](file:///Users/louhe/Documents/antigravity/ai-compliance-workbench/js/utils/policyEngine.js#L55-L70) (第55-70行 `supplementPDPA` 函数)

---

## 2. Singapore AI Governance Framework（新加坡AI治理框架）补充内容

### 📍 **添加位置**
**第7章 - Transparency, explainability, and accountability（透明度、可解释性和问责制）的末尾**

### 📋 **具体内容**（4条）

#### 开场介绍
The Company aligns with the Singapore Model AI Governance Framework, specifically the supplementary guidance for Agentic AI systems (January 2026), which addresses unique risks from autonomous agents including:

#### 第1项：Agentic Loop Risks
• Agentic Loop Risks: Monitoring and controlling AI systems that can iteratively refine their own actions

#### 第2项：Tool Use Accountability
• Tool Use Accountability: Clear tracking of which AI agent invoked which external tool or API

#### 第3项：Explainability for Multi-Step Decisions
• Explainability for Multi-Step Decisions: Providing audit trails for complex, multi-turn agent reasoning

### ✅ **添加方式**
```
原有的第7章内容（7条）：
1. Employees must be transparent about AI use...
2. Employees must utilize Company's centralized system...
3. Employees are responsible for outcomes...
4. Employees should report concerns...
5. The Company will investigate issues...
6. AI systems should provide clear explanations...
7. Ensure AI tools are understandable...

↓ Singapore Framework补充（添加在第7条之后）↓

8. The Company aligns with the Singapore Model AI Governance Framework...
   • Agentic Loop Risks: ...
   • Tool Use Accountability: ...
   • Explainability for Multi-Step Decisions: ...
```

### 🔧 **代码位置**
- **定义**：[policy_template.js](file:///Users/louhe/Documents/antigravity/ai-compliance-workbench/js/data/policy_template.js#L252-L269) (第252-269行)
- **实现**：[policyEngine.js](file:///Users/louhe/Documents/antigravity/ai-compliance-workbench/js/utils/policyEngine.js#L76-L87) (第76-87行 `supplementSingaporeFramework` 函数)

---

## 📊 内容增加效果对比

### 不选择任何可选内容
- **第5b章**：9条数据防护栏
- **第7章**：7条透明度要求
- **总页数**：约12-14页

### 选择PDPA补充
- **第5b章**：12条数据防护栏（9+3）
- **第7章**：7条透明度要求
- **总页数**：约14-15页

### 选择Singapore Framework补充
- **第5b章**：9条数据防护栏
- **第7章**：7+4条透明度要求
- **总页数**：约13-15页

### 两者都选择（推荐）
- **第5b章**：12条数据防护栏（9+3）
- **第7章**：7+4条透明度要求
- **总页数**：约15-17页

---

## 🎛️ 如何控制

在PolicyGenerator界面中：

```
✅ Include PDPA (Personal Data Protection Act) requirements
   → 启用后：在第5b章末尾添加3条PDPA规则

✅ Include Singapore AI Governance Framework alignment  
   → 启用后：在第7章末尾添加Agentic AI指南
```

## ⚙️ 实现原理

### 100% 保留原则
```javascript
// 步骤1：完整保留所有原始内容
policy.sections = preserveAllSections(policyTemplate.sections)

// 步骤2：如果用户选择，添加PDPA（不删除任何内容）
if (config.supplements.pdpa) {
    policy.sections = supplementPDPA(policy.sections, config)
    // 使用 [...section5b.content, ...pdpaItems] 追加
}

// 步骤3：如果用户选择，添加Singapore Framework（不删除任何内容）
if (config.supplements.singaporeFramework) {
    policy.sections = supplementSingaporeFramework(policy.sections, config)
    // 使用 [...section7.content, ...sgItems] 追加
}
```

### 关键代码
```javascript
// ❌ 错误做法（替换）
section5b.content = pdpaItems  // 这会丢失原有9条！

// ✅ 正确做法（追加）
section5b.content = [...section5b.content, ...pdpaItems]  // 保留原有9条，追加3条
```

---

## 📝 示例查看

查看完整示例文档：[SAMPLE_AI_Policy.md](file:///Users/louhe/Documents/antigravity/ai-compliance-workbench/SAMPLE_AI_Policy.md)

- 第5b章从第104行开始，PDPA内容在第138-144行
- 第7章从第151行开始，Singapore Framework在第167-175行

---

## ✅ 验证方法

生成政策后，检查：
1. 第5b章应该有**至少12条**（原始9条 + PDPA 3条）
2. 第7章应该包含**新加坡框架**的Agentic AI指南
3. 原始的9条数据防护栏**全部保留**
4. 原始的7条透明度要求**全部保留**
