/**
 * Redis Cache Service
 * Provides caching functionality using Redis
 */

import { createClient } from "redis";

export class CacheService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.defaultTTL = 3600; // 1 hour in seconds
  }

  /**
   * Initialize Redis connection
   */
  async connect() {
    try {
      // Check if Redis is enabled via environment variable
      if (process.env.REDIS_ENABLED === "false") {
        console.log("Redis disabled via REDIS_ENABLED=false");
        this.isConnected = false;
        return false;
      }

      this.client = createClient({
        url: process.env.REDIS_URL || "redis://localhost:6379",
        password: process.env.REDIS_PASSWORD,
        retry_strategy: (options) => {
          if (options.error && options.error.code === "ECONNREFUSED") {
            // End reconnecting on a specific error and flush all commands with a individual error
            return new Error("The server refused the connection");
          }
          if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error("Retry time exhausted");
          }
          if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
          }
          // Reconnect after
          return Math.min(options.attempt * 100, 3000);
        },
      });

      this.client.on("error", (err) => {
        console.error("Redis Client Error:", err);
        this.isConnected = false;
      });

      this.client.on("connect", () => {
        console.log("Redis Client Connected");
        this.isConnected = true;
      });

      this.client.on("ready", () => {
        console.log("Redis Client Ready");
        this.isConnected = true;
      });

      await this.client.connect();
      return true;
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
      console.log(
        "⚠️  Redis connection failed. Application will continue without caching."
      );
      console.log("💡 To fix this, either:");
      console.log("   1. Install and start Redis server");
      console.log("   2. Set REDIS_ENABLED=false in your environment");
      this.isConnected = false;
      return false;
    }
  }

  /**
   * Disconnect from Redis
   */
  async disconnect() {
    if (this.client) {
      await this.client.quit();
      this.isConnected = false;
    }
  }

  /**
   * Set a key-value pair in cache
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in seconds
   */
  async set(key, value, ttl = this.defaultTTL) {
    try {
      if (!this.isConnected) {
        console.warn("Redis not connected, skipping cache set");
        return false;
      }

      const serializedValue = JSON.stringify(value);
      await this.client.setEx(key, ttl, serializedValue);
      return true;
    } catch (error) {
      console.error("Cache set error:", error);
      return false;
    }
  }

  /**
   * Get a value from cache
   * @param {string} key - Cache key
   * @returns {any} Cached value or null
   */
  async get(key) {
    try {
      if (!this.isConnected) {
        console.warn("Redis not connected, skipping cache get");
        return null;
      }

      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  }

  /**
   * Delete a key from cache
   * @param {string} key - Cache key
   */
  async delete(key) {
    try {
      if (!this.isConnected) {
        console.warn("Redis not connected, skipping cache delete");
        return false;
      }

      await this.client.del(key);
      return true;
    } catch (error) {
      console.error("Cache delete error:", error);
      return false;
    }
  }

  /**
   * Delete multiple keys from cache
   * @param {string[]} keys - Array of cache keys
   */
  async deleteMultiple(keys) {
    try {
      if (!this.isConnected) {
        console.warn("Redis not connected, skipping cache delete multiple");
        return false;
      }

      if (keys.length > 0) {
        await this.client.del(keys);
      }
      return true;
    } catch (error) {
      console.error("Cache delete multiple error:", error);
      return false;
    }
  }

  /**
   * Clear all cache
   */
  async clear() {
    try {
      if (!this.isConnected) {
        console.warn("Redis not connected, skipping cache clear");
        return false;
      }

      await this.client.flushDb();
      return true;
    } catch (error) {
      console.error("Cache clear error:", error);
      return false;
    }
  }

  /**
   * Get cache statistics
   */
  async getStats() {
    try {
      if (!this.isConnected) {
        return { connected: false };
      }

      const info = await this.client.info();
      const keyspace = await this.client.dbSize();

      return {
        connected: true,
        keyspace,
        info: info.split("\r\n").reduce((acc, line) => {
          const [key, value] = line.split(":");
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {}),
      };
    } catch (error) {
      console.error("Cache stats error:", error);
      return { connected: false, error: error.message };
    }
  }

  /**
   * Set hash field
   * @param {string} key - Hash key
   * @param {string} field - Field name
   * @param {any} value - Field value
   * @param {number} ttl - Time to live in seconds
   */
  async hSet(key, field, value, ttl = this.defaultTTL) {
    try {
      if (!this.isConnected) {
        console.warn("Redis not connected, skipping hash set");
        return false;
      }

      const serializedValue = JSON.stringify(value);
      await this.client.hSet(key, field, serializedValue);

      if (ttl > 0) {
        await this.client.expire(key, ttl);
      }

      return true;
    } catch (error) {
      console.error("Cache hash set error:", error);
      return false;
    }
  }

  /**
   * Get hash field
   * @param {string} key - Hash key
   * @param {string} field - Field name
   * @returns {any} Field value or null
   */
  async hGet(key, field) {
    try {
      if (!this.isConnected) {
        console.warn("Redis not connected, skipping hash get");
        return null;
      }

      const value = await this.client.hGet(key, field);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Cache hash get error:", error);
      return null;
    }
  }

  /**
   * Get all hash fields
   * @param {string} key - Hash key
   * @returns {Object} All hash fields
   */
  async hGetAll(key) {
    try {
      if (!this.isConnected) {
        console.warn("Redis not connected, skipping hash get all");
        return {};
      }

      const hash = await this.client.hGetAll(key);
      const result = {};

      for (const [field, value] of Object.entries(hash)) {
        try {
          result[field] = JSON.parse(value);
        } catch {
          result[field] = value;
        }
      }

      return result;
    } catch (error) {
      console.error("Cache hash get all error:", error);
      return {};
    }
  }

  /**
   * Delete hash field
   * @param {string} key - Hash key
   * @param {string} field - Field name
   */
  async hDel(key, field) {
    try {
      if (!this.isConnected) {
        console.warn("Redis not connected, skipping hash delete");
        return false;
      }

      await this.client.hDel(key, field);
      return true;
    } catch (error) {
      console.error("Cache hash delete error:", error);
      return false;
    }
  }

  /**
   * Set with pattern-based expiration
   * @param {string} pattern - Key pattern to match
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in seconds
   */
  async setWithPattern(pattern, key, value, ttl = this.defaultTTL) {
    try {
      const success = await this.set(key, value, ttl);
      if (success) {
        // Store pattern for later cleanup
        await this.hSet(`pattern:${pattern}`, key, Date.now());
      }
      return success;
    } catch (error) {
      console.error("Cache set with pattern error:", error);
      return false;
    }
  }

  /**
   * Invalidate cache by pattern
   * @param {string} pattern - Key pattern to match
   */
  async invalidatePattern(pattern) {
    try {
      if (!this.isConnected) {
        console.warn("Redis not connected, skipping pattern invalidation");
        return false;
      }

      const patternKey = `pattern:${pattern}`;
      const keys = await this.hGetAll(patternKey);

      if (Object.keys(keys).length > 0) {
        await this.deleteMultiple(Object.keys(keys));
        await this.delete(patternKey);
      }

      return true;
    } catch (error) {
      console.error("Cache pattern invalidation error:", error);
      return false;
    }
  }

  /**
   * Generate cache key
   * @param {string} prefix - Key prefix
   * @param {Object} params - Parameters to include in key
   * @returns {string} Generated cache key
   */
  generateKey(prefix, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .map((key) => `${key}:${params[key]}`)
      .join(":");

    return sortedParams ? `${prefix}:${sortedParams}` : prefix;
  }
}
