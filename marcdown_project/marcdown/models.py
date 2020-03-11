from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# Our user model has to extend the base, but this seems difficult from looking around
# Instead, this is our profile model, which has a one to one relation
# to the base model
class Profile(models.Model):
    user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE, related_name='profile')
    favorites = models.ManyToManyField('Note', blank=True)

    def __str__(self):
        return self.user.username
    

class Note(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='ownNotes')
    public = models.BooleanField(default=True)
    sharers = models.ManyToManyField(User, blank=True)

    read_only = models.BooleanField(default=False)

    title = models.TextField()
    tags = models.ManyToManyField('Tag', blank=True)
    content = models.TextField()

    def __str__(self):
        return self.title

    # TODO: on save, update a bunch of stuff (where does it goooooo ?)
    

class Tag(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name
    