package main

import (
	"backend/config"
	"backend/models"
	"backend/routes"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	// Initialize Gin
	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, Role, User-ID, Token")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Connect to database
	config.ConnectDatabase()

	// Auto migrate database schema
	err := config.DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("Gagal migrate database:", err)
	}
	fmt.Println("✅ Database schema migrated successfully!")

	// Seed initial data
	seedInitialData()

	// Register routes
	routes.RegisterRoutes(r)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("\n🚀 Server berjalan di http://localhost:%s\n", port)
	fmt.Println("\n📝 API Endpoints:")
	fmt.Println("  POST   /register                - Register user baru")
	fmt.Println("  POST   /login                   - Login user")
	fmt.Println("  GET    /me                      - Profile user (butuh Token)")
	fmt.Println("  GET    /health                  - Health check")
	fmt.Println("  GET    /admin/dashboard         - Admin dashboard (butuh Role=admin & Token)")
	fmt.Println("  GET    /admin/users             - List semua user (admin only)")
	fmt.Println("  GET    /admin/users/:id         - Get user by ID (admin only)")
	fmt.Println("  PUT    /admin/users/:id         - Update user (admin only)")
	fmt.Println("  DELETE /admin/users/:id         - Delete user (admin only)")
	fmt.Println("\n👑 Test Credentials (dari database):")
	fmt.Println("  Admin: username='admin' atau email='admin@example.com', password='admin123'")
	fmt.Println("  User:  username='johndoe' atau email='john@example.com', password='user123'")

	if err := r.Run(":" + port); err != nil {
		log.Fatal("Gagal menjalankan server:", err)
	}
}

// seedInitialData creates initial admin and sample users
func seedInitialData() {
	// Check if admin exists
	var admin models.User
	if err := config.DB.Where("email = ?", "admin@example.com").First(&admin).Error; err != nil {
		// Hash password for admin
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
		if err != nil {
			log.Fatal("Gagal hash password admin:", err)
		}

		admin = models.User{
			Name:     "Administrator",
			Email:    "admin@example.com",
			Username: "admin",
			Password: string(hashedPassword),
			Role:     "admin",
		}

		if err := config.DB.Create(&admin).Error; err != nil {
			log.Fatal("Gagal membuat user admin:", err)
		}

		fmt.Println("\n✅ User admin berhasil dibuat:")
		fmt.Println("   Email: admin@example.com")
		fmt.Println("   Username: admin")
		fmt.Println("   Password: admin123")
		fmt.Println("   Role: admin")
	} else {
		fmt.Println("\n✅ User admin sudah ada di database")
	}

	// Check if sample user exists
	var sampleUser models.User
	if err := config.DB.Where("email = ?", "john@example.com").First(&sampleUser).Error; err != nil {
		// Hash password for sample user
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte("user123"), bcrypt.DefaultCost)
		if err != nil {
			log.Fatal("Gagal hash password user:", err)
		}

		sampleUser = models.User{
			Name:     "John Doe",
			Email:    "john@example.com",
			Username: "johndoe",
			Password: string(hashedPassword),
			Role:     "user",
		}

		if err := config.DB.Create(&sampleUser).Error; err != nil {
			log.Println("Gagal membuat user sample:", err)
		} else {
			fmt.Println("✅ User sample berhasil dibuat:")
			fmt.Println("   Email: john@example.com")
			fmt.Println("   Username: johndoe")
			fmt.Println("   Password: user123")
			fmt.Println("   Role: user")
		}
	} else {
		fmt.Println("✅ User sample sudah ada di database")
	}

	// Check total users
	var totalUsers int64
	config.DB.Model(&models.User{}).Count(&totalUsers)
	fmt.Printf("\n📊 Total users dalam database: %d\n", totalUsers)
}