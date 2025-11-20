package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func AdminOnly() gin.HandlerFunc {
	return func(c *gin.Context) {

		role := c.GetHeader("Role")

		if role != "admin" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Hanya admin yang bisa akses endpoint ini",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
