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

    def get_tags(self):
        '''
        Collects all the tags from the notes owned by, shared with, or
        favorited by the user, and counts the occurences.

        Returns: dict, tag => count
        '''
        tags = dict()
        notes = set(self.ownNotes.all() + self.sharedNotes.all() + self.favorites)
        for tag in [tag.name for tag in [note.tags for note in notes]]:
            if tag in tags:
                tags[tag] += 1
            else:
                tags[tag] = 1
        return tags

