output "static_webapp_name" {
  value = azurerm_static_web_app.static_web_app.name
  description = "Nazwa statycznej aplikacji webowej"  
}

output "static_webapp_url" {
  value = azurerm_static_web_app.static_web_app.default_host_name
  description = "URL statycznej aplikacji weboweej"
}
