package controllers

import (
	"backend/config"
	"backend/models"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// GetUsers returns all users (admin only)
func GetUsers(c *gin.Context) {
	var users []models.User
	
	search := c.Query("search")
	role := c.Query("role")
	
	query := config.DB
	
	if search != "" {
		searchPattern := "%" + search + "%"
		query = query.Where("name ILIKE ? OR email ILIKE ? OR username ILIKE ?", 
			searchPattern, searchPattern, searchPattern)
	}
	
	if role != "" {
		query = query.Where("role = ?", role)
	}
	
	if err := query.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data user"})
		return
	}
	
	var response []map[string]interface{}
	for _, user := range users {
		response = append(response, map[string]interface{}{
			"id":         user.ID,
			"name":       user.Name,
			"email":      user.Email,
			"username":   user.Username,
			"role":       user.Role,
			"created_at": user.CreatedAt,
			"updated_at": user.UpdatedAt,
		})
	}
	
	c.JSON(http.StatusOK, response)
}

// GetUserByID returns a user by ID
func GetUserByID(c *gin.Context) {
	id := c.Param("id")
	
	var user models.User
	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User tidak ditemukan"})
		return
	}
	
	response := map[string]interface{}{
		"id":         user.ID,
		"name":       user.Name,
		"email":      user.Email,
		"username":   user.Username,
		"role":       user.Role,
		"created_at": user.CreatedAt,
		"updated_at": user.UpdatedAt,
	}
	
	c.JSON(http.StatusOK, response)
}

// UpdateUser updates user information
func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	
	var user models.User
	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User tidak ditemukan"})
		return
	}
	
	var input models.UpdateUserRequest
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// Check if email exists
	if input.Email != "" && input.Email != user.Email {
		var existing models.User
		if err := config.DB.Where("email = ?", strings.ToLower(input.Email)).First(&existing).Error; err == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email sudah digunakan"})
			return
		}
	}
	
	// Update fields
	updates := make(map[string]interface{})
	if input.Name != "" {
		updates["name"] = input.Name
	}
	if input.Email != "" {
		updates["email"] = strings.ToLower(input.Email)
	}
	if input.Role != "" {
		if input.Role != "admin" && input.Role != "user" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Role harus 'admin' atau 'user'"})
			return
		}
		updates["role"] = input.Role
	}
	
	if len(updates) > 0 {
		updates["updated_at"] = time.Now()
		config.DB.Model(&user).Updates(updates)
	}
	
	// Get updated user
	config.DB.First(&user, id)
	
	response := map[string]interface{}{
		"id":         user.ID,
		"name":       user.Name,
		"email":      user.Email,
		"username":   user.Username,
		"role":       user.Role,
		"created_at": user.CreatedAt,
		"updated_at": user.UpdatedAt,
	}
	
	c.JSON(http.StatusOK, gin.H{
		"message": "User berhasil diperbarui",
		"user":    response,
	})
}

// DeleteUser deletes a user
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	
	var user models.User
	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User tidak ditemukan"})
		return
	}
	
	// Prevent self-deletion
	requestUserID := c.GetHeader("User-ID")
	if requestUserID == strconv.FormatUint(uint64(user.ID), 10) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tidak dapat menghapus akun sendiri"})
		return
	}
	
	if err := config.DB.Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus user"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"message": "User berhasil dihapus",
		"user_id": user.ID,
	})
}