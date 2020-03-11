from django.db import models

class Note(models.Model):
    owner = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='ownNotes')
    public = models.BooleanField(default=True)
    sharers = models.ManyToManyField('Profile', blank=True)

    read_only = models.BooleanField(default=False)

    title = models.TextField()
    tags = models.ManyToManyField('Tag', blank=True)
    content = models.TextField()

    def __str__(self):
        return self.title

    # TODO: on save, update a bunch of stuff (where does it goooooo ?)