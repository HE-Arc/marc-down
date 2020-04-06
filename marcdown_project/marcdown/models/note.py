from django.db import models

import diff_match_patch as dmp_module
import re

from .tag import Tag

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
    
    def allow_reading_by_user(self, profile):
        '''
        Returns whether the given user has read permission on the note
        '''
        if profile == self.owner:
            return True
        else:
            return self.public or profile in self.sharers.all()

    def allow_update_from_user(self, profile):
        '''
        Returns whether the given user has write permission on the note
        '''
        if profile == self.owner:
            return True
        elif self.read_only:
            return False
        else:
            return self.public or profile in self.sharers.all()

    def update(self, patch_text):
        '''
        Updates the content of the note using the given patch

        Returns: boolean, true if the patch was successfully applied
        '''
        dmp = dmp_module.diff_match_patch()
        patch = dmp.patch_fromText(patch_text)
        patched_content, results = dmp.patch_apply(patch, self.content)

        if all(results):
            # patch is successfully applied
            self.content = patched_content

            # update title
            self.parse_title()

            # update tags
            self.parse_tags()
            
            return True
        else:
            return False

    def parse_title(self):
        '''
        Finds the title within its content, sets it as this instance's title, and returns it.
        If none is found, the title becomes "Untitled"

        Title is the first 1st level header, like this:

        # My cool title
        '''
        regex = r"^# (.*)$"
        for line in self.content.split('\n'):
            match = re.findall(regex, line)
            if match:
                title = match[0]
                self.title = title
                return title
        title = "Untitled"
        self.title = title
        return title

    def parse_tags(self):
        '''
        Finds tags within its content, updates the instance tags field, and returns them.

        Tags are denoted by a 6th level header named tags, like this:

        ###### tags: `tag1`, `tag2`, ...

        Returns: set of strings, containing the tags
        '''
        new_tags = set()
        old_tags = set(map(lambda tag : tag.name, self.tags.all()))

        regex = r"^#{6} tags: (`[^`]+`(?:, `[^`]+`)*)$"
        for line in self.content.split('\n'):
            match = re.findall(regex, line)
            if match:
                tags_string = match[0]
                # split tags and trim ``
                new_tags = set(
                    map(lambda tag: tag[1:-1], tags_string.split(", ")))
                break
        
        for removed_tag in old_tags.difference(new_tags):
            self.tags.remove(removed_tag)
            # TODO: check if tag should be deleted from db ?

        for added_tag in new_tags.difference(old_tags):
            tag_instance, dummy = Tag.objects.get_or_create(name=added_tag)
            self.tags.add(tag_instance)

        