from django.contrib import admin

# Register your models here.
from .models import Profile, Note, Tag

admin.site.register(Profile)
admin.site.register(Note)
admin.site.register(Tag)