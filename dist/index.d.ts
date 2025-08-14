/**
 * Insurance Backend Application
 * TypeScript version with enhanced monitoring and performance tracking
 */
import { Server } from "socket.io";
declare const app: import("express-serve-static-core").Express;
declare const io: Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
declare const onlineUsers: Map<any, any>;
export { io, onlineUsers };
export default app;
//# sourceMappingURL=index.d.ts.map