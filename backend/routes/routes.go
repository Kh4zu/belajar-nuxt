package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.POST("/user/register", controllers.Register)
}
