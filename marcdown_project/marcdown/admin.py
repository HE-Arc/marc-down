from django.contrib import admin

# Register your models here.
from .models import Profile, Note, Tag

# Inline Profile with User
# https://docs.djangoproject.com/en/3.0/topics/auth/customizing/
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'profile'

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Note)
admin.site.register(Tag)