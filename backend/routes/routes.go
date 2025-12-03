package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	// Public routes
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	// Protected routes (memerlukan auth)
	protectedRoutes := r.Group("/api")
	protectedRoutes.Use(middleware.AuthMiddleware())
	{
		protectedRoutes.GET("/profile", func(c *gin.Context) {
			token, _ := c.Get("authToken")
			c.JSON(200, gin.H{
				"message": "Protected route",
				"token":   token,
			})
		})
	}

	// Admin routes
	adminRoutes := r.Group("/admin")
	adminRoutes.Use(middleware.AuthMiddleware()) // Cek auth dulu
	adminRoutes.Use(middleware.AdminOnly())      // Lalu cek role admin
	{
		adminRoutes.GET("/dashboard", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "Welcome Admin!",
				"access":  "Full administrative access",
			})
		})

		// User management routes
		adminRoutes.GET("/users", controllers.GetUsers)
		adminRoutes.GET("/users/:id", controllers.GetUserByID)
		adminRoutes.PUT("/users/:id", controllers.UpdateUser)
		adminRoutes.DELETE("/users/:id", controllers.DeleteUser)
		
		// Test admin route
		adminRoutes.GET("/test", func(c *gin.Context) {
			role, _ := c.Get("role")
			userID, _ := c.Get("userID")
			c.JSON(200, gin.H{
				"message": "Admin test route",
				"role":    role,
				"user_id": userID,
			})
		})
	}

	// routes.go - tambahkan route test
r.GET("/test/login", func(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Test endpoint",
		"admin_credentials": map[string]string{
			"username": "admin",
			"email": "admin@example.com",
			"password": "password", // Password asli sebelum di-hash
			"hashed_password": "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
			"role": "admin",
		},
		"note": "Hash ini adalah hash dari kata 'password'",
	})
})
}