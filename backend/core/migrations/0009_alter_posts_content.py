# Generated by Django 4.1.4 on 2023-01-14 02:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_posts_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='content',
            field=models.CharField(max_length=255),
        ),
    ]
