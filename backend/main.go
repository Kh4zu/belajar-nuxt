package main

import (
	"backend/config"
	"backend/models"
	"backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	config.ConnectDatabase()

	config.DB.AutoMigrate(&models.User{})

	routes.RegisterRoutes(r)

	r.Run(":8080")
}