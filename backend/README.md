# backend — 后端目录（占位）

后端代码统一放在本目录，**当前尚未创建**。

## 职责边界

后端只负责「结构化业务数据」，不负责文案。文案全部由 Payload CMS 管理，通过 Local API 读取，二者在前端 BFF 层聚合。

| 归属 | 数据 | 说明 |
| --- | --- | --- |
| `backend/` | 牌号参数、产品规格、询盘、上传文件元数据 | PostgreSQL，业务 REST API |
| Payload CMS（`frontend/src/payload/`） | 页面文案、文章、证书、导航、SEO meta | 走 Local API，不经公开 Delivery REST |

**牌号（grades）永不进 CMS** —— 见 `docs/01-问题求解.md` 决策项。

## 预期结构

```
backend/
├── api/                 # REST API v1，契约见 docs/04-接口文档.md
│   ├── grades/          #   GET /grades、/grades/compare、CSV 导入
│   ├── inquiries/       #   POST /inquiries（honeypot、限流、状态机）
│   ├── uploads/         #   presign / complete（S3 预签名直传）
│   └── auth/            #   /admin/** JWT + RBAC(admin|editor)
├── domain/              # 领域模型与业务规则
├── infra/               # PostgreSQL、S3、消息/队列
└── tests/               # 契约测试（含 C8 slug 跨系统契约测试）
```

## 技术栈（约定）

- Java 21 + Spring Boot 3.x，Maven/Gradle 待定
- PostgreSQL 自托管，Flyway 管迁移
- 与前端的唯一集成点：前端 BFF 调用本目录暴露的 REST（见 `docs/04-接口文档.md` §2.3）
- 超时预算：单源 800ms，单源失败不得拖垮页面（`docs/frontend/07-Payload落地问题与对策.md` A7）

## 状态

- [x] 目录占位与边界标注
- [ ] 实际工程脚手架（等需求确认后再创建）
