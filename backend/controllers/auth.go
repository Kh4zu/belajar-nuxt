package controllers

import (
	"backend/config"
	"backend/models"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// Login handles user authentication
func Login(c *gin.Context) {
	var input models.LoginRequest

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Request tidak valid"})
		return
	}

	email := strings.ToLower(strings.TrimSpace(input.Email))
	password := strings.TrimSpace(input.Password)

	if email == "" || password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email dan password harus diisi"})
		return
	}

	var user models.User
	
	// Cari user by email atau username
	if err := config.DB.Where("email = ?", email).First(&user).Error; err != nil {
		// Coba cari by username
		if err := config.DB.Where("username = ?", input.Email).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Email/username atau password salah"})
			return
		}
	}

	// Verify password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email/username atau password salah"})
		return
	}

	// Response tanpa JWT, hanya data user
	responseUser := map[string]interface{}{
		"id":         user.ID,
		"name":       user.Name,
		"email":      user.Email,
		"username":   user.Username,
		"role":       user.Role,
		"created_at": user.CreatedAt,
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login berhasil",
		"user":    responseUser,
		"user_id": user.ID,
		"role":    user.Role,
	})
}

// Register handles user registration
func Register(c *gin.Context) {
	var input models.RegisterRequest

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(input.Password) < 6 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password minimal 6 karakter"})
		return
	}

	// Check if email exists
	var existingEmail models.User
	if err := config.DB.Where("email = ?", strings.ToLower(input.Email)).First(&existingEmail).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email sudah terdaftar"})
		return
	}

	// Check if username exists
	var existingUsername models.User
	if err := config.DB.Where("username = ?", input.Username).First(&existingUsername).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username sudah terdaftar"})
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengenkripsi password"})
		return
	}

	// Create user
	user := models.User{
		Name:      strings.TrimSpace(input.Name),
		Email:     strings.ToLower(strings.TrimSpace(input.Email)),
		Username:  strings.TrimSpace(input.Username),
		Password:  string(hashedPassword),
		Role:      "user", // Default role adalah user
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// Save to database
	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan user: " + err.Error()})
		return
	}

	// Response
	responseUser := map[string]interface{}{
		"id":         user.ID,
		"name":       user.Name,
		"email":      user.Email,
		"username":   user.Username,
		"role":       user.Role,
		"created_at": user.CreatedAt,
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Registrasi berhasil",
		"user":    responseUser,
		"user_id": user.ID,
		"role":    user.Role,
	})
}

// GetCurrentUser returns profile
func GetCurrentUser(c *gin.Context) {
	userID := c.GetHeader("User-ID")
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User-ID header diperlukan"})
		return
	}

	var user models.User
	if err := config.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User tidak ditemukan"})
		return
	}

	responseUser := map[string]interface{}{
		"id":         user.ID,
		"name":       user.Name,
		"email":      user.Email,
		"username":   user.Username,
		"role":       user.Role,
		"created_at": user.CreatedAt,
		"updated_at": user.UpdatedAt,
	}

	c.JSON(http.StatusOK, gin.H{"user": responseUser})
}