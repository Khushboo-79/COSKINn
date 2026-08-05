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
exports.FinanceReportController = void 0;
const common_1 = require("@nestjs/common");
const finance_report_service_1 = require("./finance-report.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let FinanceReportController = class FinanceReportController {
    financeReportService;
    constructor(financeReportService) {
        this.financeReportService = financeReportService;
    }
    getOverview() {
        return this.financeReportService.getOverview();
    }
    getTransactions() {
        return this.financeReportService.getTransactions();
    }
    getMonthlyBreakdown() {
        return this.financeReportService.getMonthlyBreakdown();
    }
    getLedgers() {
        return this.financeReportService.getLedgers();
    }
    createLedger(accountName) {
        return this.financeReportService.createLedger(accountName);
    }
    addJournalEntry(ledgerId, type, amount, reference) {
        return this.financeReportService.addJournalEntry(ledgerId, type, amount, reference);
    }
    syncSettlements(settlements) {
        return this.financeReportService.syncSettlements(settlements);
    }
};
exports.FinanceReportController = FinanceReportController;
__decorate([
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinanceReportController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)('transactions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinanceReportController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)('monthly-breakdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinanceReportController.prototype, "getMonthlyBreakdown", null);
__decorate([
    (0, common_1.Get)('ledgers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinanceReportController.prototype, "getLedgers", null);
__decorate([
    (0, common_1.Post)('ledgers'),
    __param(0, (0, common_1.Body)('accountName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FinanceReportController.prototype, "createLedger", null);
__decorate([
    (0, common_1.Post)('journal-entries'),
    __param(0, (0, common_1.Body)('ledgerId')),
    __param(1, (0, common_1.Body)('type')),
    __param(2, (0, common_1.Body)('amount')),
    __param(3, (0, common_1.Body)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", void 0)
], FinanceReportController.prototype, "addJournalEntry", null);
__decorate([
    (0, common_1.Post)('settlements/sync'),
    __param(0, (0, common_1.Body)('settlements')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], FinanceReportController.prototype, "syncSettlements", null);
exports.FinanceReportController = FinanceReportController = __decorate([
    (0, common_1.Controller)('admin/finance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_ADMIN', 'FINANCE'),
    __metadata("design:paramtypes", [finance_report_service_1.FinanceReportService])
], FinanceReportController);
//# sourceMappingURL=finance-report.controller.js.map