from django.db import models
from django.contrib.auth.models import User as BaseUser

# Create your models here.
class User(BaseUser):
    favorites = models.ManyToManyField('Note')

    def __str__(self):
        return self.username
    

class Note(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ownNotes')
    public = models.BooleanField(default=True)
    sharers = models.ManyToManyField(User)

    read_only = models.BooleanField(default=False)

    title = models.TextField()
    tags = models.ManyToManyField('Tag')
    content = models.TextField()

    def __str__(self):
        return self.title

    # TODO: on save, update a bunch of stuff (where does it goooooo ?)
    

class Tag(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name
    