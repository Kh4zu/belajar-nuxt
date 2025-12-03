package middleware

import (
	"backend/config"
	"backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware checks user_id header and verifies user exists
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetHeader("User-ID")
		if userID == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":   "User-ID header diperlukan",
				"message": "Silakan login terlebih dahulu",
			})
			c.Abort()
			return
		}

		// Convert to uint
		id, err := strconv.ParseUint(userID, 10, 32)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":   "User-ID tidak valid",
				"message": "Format ID tidak benar",
			})
			c.Abort()
			return
		}

		// Check if user exists in database
		var user models.User
		if err := config.DB.First(&user, uint(id)).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":   "User tidak ditemukan",
				"message": "Silakan login kembali",
			})
			c.Abort()
			return
		}

		// Set user data in context
		c.Set("user_id", user.ID)
		c.Set("user_role", user.Role)

		c.Next()
	}
}

// AdminOnly middleware checks if user is admin
func AdminOnly() gin.HandlerFunc {
	return func(c *gin.Context) {
		role, exists := c.Get("user_role")
		if !exists {
			// Try to get from header
			userID := c.GetHeader("User-ID")
			if userID != "" {
				var user models.User
				if err := config.DB.First(&user, userID).Error; err == nil {
					role = user.Role
				}
			}
			
			if role == nil {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error":   "Tidak terautentikasi",
					"message": "Silakan login terlebih dahulu",
				})
				c.Abort()
				return
			}
		}

		if role.(string) != "admin" {
			c.JSON(http.StatusForbidden, gin.H{
				"error":   "Akses ditolak",
				"message": "Hanya admin yang dapat mengakses endpoint ini",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}