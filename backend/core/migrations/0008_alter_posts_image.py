# Generated by Django 4.1.4 on 2023-01-14 01:39

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_usergallery'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='image',
            field=models.ImageField(default='posts/image.jpg', upload_to=core.models.image_path),
        ),
    ]