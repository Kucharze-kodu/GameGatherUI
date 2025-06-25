# Frontend

# resource "azurerm_resource_group" "rg_frontend" {
#   name     = "${var.prefix_ui}-rg"
#   location = var.location
# }

resource "azurerm_static_web_app" "static_web_app" {
  name                = "${var.prefix_ui}-static-web-app"
  resource_group_name = var.resource_group_name
  location            = var.location
}