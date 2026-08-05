"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ContentService = class ContentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getArticles(type, publishedOnly = true) {
        const where = {};
        if (type)
            where.type = type;
        if (publishedOnly)
            where.published = true;
        return this.prisma.contentArticle.findMany({ where, orderBy: { createdAt: 'desc' } });
    }
    async getArticleBySlug(slug) {
        const article = await this.prisma.contentArticle.findUnique({ where: { slug } });
        if (!article)
            throw new common_1.NotFoundException('Article not found');
        return article;
    }
    async createArticle(data) {
        return this.prisma.contentArticle.create({ data });
    }
    async updateArticle(id, data) {
        return this.prisma.contentArticle.update({ where: { id }, data });
    }
    async deleteArticle(id) {
        return this.prisma.contentArticle.delete({ where: { id } });
    }
    async getFaqs() {
        return this.prisma.faq.findMany({ orderBy: { orderIndex: 'asc' } });
    }
    async createFaq(data) {
        return this.prisma.faq.create({ data });
    }
    async updateFaq(id, data) {
        return this.prisma.faq.update({ where: { id }, data });
    }
    async deleteFaq(id) {
        return this.prisma.faq.delete({ where: { id } });
    }
    async getGlobalSeo() {
        let seo = await this.prisma.globalSeo.findFirst();
        if (!seo) {
            seo = await this.prisma.globalSeo.create({
                data: {
                    title: 'Fairenne',
                    description: 'Premium Skincare',
                    keywords: 'skincare, beauty'
                }
            });
        }
        return seo;
    }
    async updateGlobalSeo(data) {
        const seo = await this.getGlobalSeo();
        return this.prisma.globalSeo.update({
            where: { id: seo.id },
            data: {
                title: data.title,
                description: data.description,
                keywords: data.keywords
            }
        });
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
//# sourceMappingURL=content.service.js.map