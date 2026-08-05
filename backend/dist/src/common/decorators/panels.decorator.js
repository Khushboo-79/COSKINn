"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panels = exports.PANELS_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PANELS_KEY = 'panels';
const Panels = (...panels) => (0, common_1.SetMetadata)(exports.PANELS_KEY, panels);
exports.Panels = Panels;
//# sourceMappingURL=panels.decorator.js.map