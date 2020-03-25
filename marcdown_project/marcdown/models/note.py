from django.db import models

import diff_match_patch as dmp_module
import re

from . import Tag

class Note(models.Model):
    owner = models.ForeignKey(
        'Profile', on_delete=models.CASCADE, related_name='own_notes')
    public = models.BooleanField(default=True)
    sharers = models.ManyToManyField(
        'Profile', blank=True, related_name='shared_notes')

    read_only = models.BooleanField(default=False)

    title = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True)
    content = models.TextField()

    def __str__(self):
        return self.title
    
    def allow_update_from_user(self, profile):
        if profile == self.owner:
            return True
        elif self.read_only:
            return False
        else:
            return self.public or profile in self.sharers

    def update(self, patch_text):
        '''
        Updates the content of the note using the given patch

        Returns: boolean, true if the patch was successfully applied
        '''
        dmp = dmp_module.diff_match_patch()
        patch = dmp.patch_fromText(patch_text)
        patched_content, results = dmp.patch_apply(self.content, patch)

        if all(results):
            # patch is successfully applied
            self.content = patched_content

            # update tags
            self.tags.set([])
            for new_tag in self.parse_tags():
                tag_instance, dummy = Tag.objects.get_or_create(name=new_tag)
                self.tags.add(tag_instance)
                # TODO: erase useless tags ?
            
            return True
        else:
            return False

    def parse_tags(self):
        '''
        Finds tags within its content.

        Tags are denoted by a 6th level header named tags like this:

        ###### tags: `tag1`, `tag2`, ...

        Returns: set of strings, containing the tags
        '''
        regex = r"^#{6} tags: (`[^`]+`(?:, `[^`]+`)*)$"
        for line in self.content.split('\n'):
            match = re.findall(regex, line)
            if match:
                tags_string = match[0]
                # split tags and trim ``
                tags = set(
                    map(lambda tag: tag[1:-1], tags_string.split(", ")))
                return tags
        return set()