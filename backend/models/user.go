package models

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Name     string `json:"name" binding:"required"`
	Email    string `gorm:"unique" json:"email" binding:"required"`
	Password string `json:"password"` 
	Role     string `json:"role"`
}
