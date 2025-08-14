import jwt from "jsonwebtoken";
import UserModel from "../../DB/models/user.model.js";
export const auth = (acessRole = []) => {
    return async (req, res, next) => {
        try {
            // Check for token in multiple locations
            let token = req.headers.token ||
                req.headers.authorization ||
                req.headers.Authorization;
            // Check if token exists
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Access token is required",
                });
            }
            // Handle Bearer token format
            if (token.startsWith("Bearer ")) {
                token = token.substring(7); // Remove 'Bearer ' prefix
            }
            // Validate token format (if using custom prefix)
            if (process.env.authBearerToken &&
                token.startsWith(process.env.authBearerToken)) {
                token = token.split(process.env.authBearerToken)[1];
            }
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token format",
                });
            }
            // Verify token and check expiration
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.TokenSignIn);
            }
            catch (jwtError) {
                if (jwtError.name === "TokenExpiredError") {
                    return res.status(401).json({
                        success: false,
                        message: "Token has expired",
                    });
                }
                else if (jwtError.name === "JsonWebTokenError") {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid token",
                    });
                }
                else {
                    return res.status(401).json({
                        success: false,
                        message: "Token verification failed",
                    });
                }
            }
            // Check if token has expiration and is not expired
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                return res.status(401).json({
                    success: false,
                    message: "Token has expired",
                });
            }
            // Check if token has issued at time and is not too old (optional)
            const maxTokenAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            if (decoded.iat && Date.now() - decoded.iat * 1000 > maxTokenAge) {
                return res.status(401).json({
                    success: false,
                    message: "Token is too old",
                });
            }
            // Verify user exists and is active
            const user = await UserModel.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }
            // Check if user is active
            if (user.status !== "active") {
                return res.status(403).json({
                    success: false,
                    message: "User account is inactive",
                });
            }
            // Check role permissions
            if (acessRole.length > 0 && !acessRole.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Insufficient permissions",
                });
            }
            // Add user to request object
            req.user = user;
            next();
        }
        catch (error) {
            console.error("Auth middleware error:", error);
            return res.status(500).json({
                success: false,
                message: "Authentication error",
            });
        }
    };
};
// Optional: Add a function to generate tokens with proper expiration
export const generateToken = (userId) => {
    const payload = {
        id: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    };
    return jwt.sign(payload, process.env.TokenSignIn);
};
// Optional: Add a function to refresh tokens
export const refreshToken = (oldToken) => {
    try {
        const decoded = jwt.verify(oldToken, process.env.TokenSignIn);
        return generateToken(decoded.id);
    }
    catch (error) {
        throw new Error("Invalid refresh token");
    }
};
//# sourceMappingURL=auth.js.map