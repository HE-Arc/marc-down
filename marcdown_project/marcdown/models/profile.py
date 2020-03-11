from django.db import models
from django.contrib.auth.models import User

# Our user model has to extend the base, but this seems difficult from looking around
# Instead, this is our profile model, which has a one to one relation
# to the base model
class Profile(models.Model):
    user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE, related_name='profile')
    favorites = models.ManyToManyField('Note', blank=True)

    def __str__(self):
        return self.user.username