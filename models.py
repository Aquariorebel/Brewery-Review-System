from django.db import models

# Create your models here.
# users/models.py
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Define custom fields or behavior if needed

    class Meta:
        pass

    # Define unique related_name for groups and user_permissions
    groups = (
        ("view_customgroup", "Can view custom group"),
        ("change_customgroup", "Can change custom group"),
        ("delete_customgroup", "Can delete custom group"),
    )

    permissions = (
        ("view_customuser", "Can view custom user"),
        ("change_customuser", "Can change custom user"),
        ("delete_customuser", "Can delete custom user"),
    )

    # Specify unique related_name for user_permissions
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='user_custom_permissions',  # Change to a unique related_name
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='custom permissions',
    )



