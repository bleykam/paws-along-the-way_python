from django.apps import AppConfig
import paws_server.signals 


class PawsServerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'paws_server'
    
    def ready(self):
        import paws_server.signals 
