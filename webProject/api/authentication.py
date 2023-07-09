from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
    
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('access_token')
        if token:
            try:
                validated_token = self.get_validated_token(token)
                user = self.get_user(validated_token)
                if user:
                    return (user, token)
            except:
                return None
        return None

    def get_user(self, validated_token):
        User = get_user_model()
        user_id = validated_token['user_id']
        try:
            user = User.objects.get(id=user_id)
            return user
        except User.DoesNotExist:
            return None

    def has_permission(self, request, view):
        # Implement your custom permission logic here
        # For example, check if the user is authenticated or has certain roles/permissions
        return True  # or return False based on your requirements
    