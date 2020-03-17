from django.db import models

import diff_match_patch as dmp_module
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

    def update(self, diff):
        '''
        Updates the content of the note using the given diff

        Returns: boolean, true if the patch was successfully applied
        '''
        dmp = dmp_module.diff_match_patch()
        patched_content, results = dmp.patch_apply(self.content, diff)

        if all(results):
            # patch is successfully applied
            self.content = patched_content
            return True
        else:
            return False
    # TODO: on save, update a bunch of stuff (where does it goooooo ?)