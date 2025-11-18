package models

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	Role     string `json:"role"`
}
