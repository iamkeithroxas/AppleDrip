# Generated by Django 4.1.4 on 2023-01-21 04:02

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_posts_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='image',
            field=models.ImageField(default='posts/image.jpg', upload_to=core.models.image_path),
        ),
        migrations.AlterField(
            model_name='posts',
            name='user_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='usergallery',
            name='image',
            field=models.ImageField(default='posts/image.jpg', upload_to=core.models.image_path),
        ),
    ]