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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const invoice_service_1 = require("../invoice/invoice.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let OrderController = class OrderController {
    orderService;
    invoiceService;
    constructor(orderService, invoiceService) {
        this.orderService = orderService;
        this.invoiceService = invoiceService;
    }
    async createOrder(req, addressId, paymentMode = 'ONLINE', pointsToRedeem = 0, couponCode, useWalletBalance = false) {
        if (!addressId) {
            throw new common_1.BadRequestException('addressId is required to create an order');
        }
        if (!['ONLINE', 'COD'].includes(paymentMode)) {
            throw new common_1.BadRequestException('paymentMode must be ONLINE or COD');
        }
        return this.orderService.createOrderFromCart(req.user.id, addressId, paymentMode, pointsToRedeem, couponCode, useWalletBalance);
    }
    async getCustomerOrders(req) {
        return this.orderService.getOrders(req.user.id);
    }
    async trackOrder(req, id) {
        return this.orderService.trackOrder(id, req.user.id);
    }
    async getCustomerOrderInvoice(req, id) {
        return this.invoiceService.generateGstInvoice(id);
    }
    async cancelOrder(req, id, reason) {
        if (!reason) {
            throw new common_1.BadRequestException('Cancellation reason is required');
        }
        return this.orderService.cancelOrder(id, req.user.id, reason);
    }
    async getOrders(req) {
        return this.orderService.getOrders(req.user.id);
    }
    async getOrderById(req, id) {
        return this.orderService.getOrderByIdForCustomer(req.user.id, id);
    }
    async getAdminOrders(status, paymentMode, email, mobile, platform) {
        return this.orderService.getAdminOrders({
            status,
            paymentMode,
            email,
            mobile,
            platform,
        });
    }
    async getAdminOrderById(id) {
        return this.orderService.getAdminOrderById(id);
    }
    async getAdminOrderInvoice(id) {
        const invoice = await this.invoiceService.generateGstInvoice(id);
        return invoice;
    }
    async updateOrderStatus(req, id, status, notes) {
        return this.orderService.updateOrderStatus(id, status, req.user.id, notes);
    }
    async adminCancelOrder(req, id, reason) {
        if (!reason) {
            throw new common_1.BadRequestException('Cancellation reason is required');
        }
        return this.orderService.adminCancelOrder(id, req.user.id, reason);
    }
    async getCancellations() {
        return this.orderService.getCancellations();
    }
    async getSettings() {
        return this.orderService.getSettings();
    }
    async updateSettings(body) {
        return this.orderService.updateSettings({
            returnWindowDays: body.returnWindowDays,
            autoCancelHours: body.autoCancelHours,
            codEnabled: body.codEnabled,
            maxCodAmount: body.maxCodAmount,
        });
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('orders'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('addressId')),
    __param(2, (0, common_1.Body)('paymentMode')),
    __param(3, (0, common_1.Body)('pointsToRedeem')),
    __param(4, (0, common_1.Body)('couponCode')),
    __param(5, (0, common_1.Body)('useWalletBalance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number, String, Boolean]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('orders'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getCustomerOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('orders/:id/track'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "trackOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('orders/:id/invoice'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getCustomerOrderInvoice", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('orders/:id/cancel'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('orders'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('orders/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'order-manager', 'SUPER_ADMIN'),
    (0, common_1.Get)('admin/orders'),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('paymentMode')),
    __param(2, (0, common_1.Query)('email')),
    __param(3, (0, common_1.Query)('mobile')),
    __param(4, (0, common_1.Query)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAdminOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'order-manager', 'SUPER_ADMIN'),
    (0, common_1.Get)('admin/orders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAdminOrderById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'order-manager', 'SUPER_ADMIN'),
    (0, common_1.Get)('admin/orders/:id/invoice'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAdminOrderInvoice", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'order-manager', 'SUPER_ADMIN'),
    (0, common_1.Put)('admin/orders/:id/status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('status')),
    __param(3, (0, common_1.Body)('notes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'order-manager', 'SUPER_ADMIN'),
    (0, common_1.Post)('admin/orders/:id/cancel'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "adminCancelOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'order-manager', 'SUPER_ADMIN'),
    (0, common_1.Get)('admin/orders/config/cancellations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getCancellations", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'order-manager', 'SUPER_ADMIN'),
    (0, common_1.Get)('admin/orders/settings/config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getSettings", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'order-manager', 'SUPER_ADMIN'),
    (0, common_1.Put)('admin/orders/settings/config'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateSettings", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        invoice_service_1.InvoiceService])
], OrderController);
//# sourceMappingURL=order.controller.js.map