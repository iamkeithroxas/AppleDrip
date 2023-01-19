# Generated by Django 4.1.4 on 2023-01-10 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_posts'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupMembers',
            fields=[
                ('gm_id', models.IntegerField(primary_key=True, serialize=False)),
                ('group_id', models.IntegerField()),
                ('user_id', models.IntegerField()),
                ('joined_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='GroupPosts',
            fields=[
                ('gp_id', models.IntegerField(primary_key=True, serialize=False)),
                ('group_id', models.IntegerField()),
                ('user_id', models.IntegerField()),
                ('content', models.BinaryField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Groups',
            fields=[
                ('group_id', models.IntegerField(primary_key=True, serialize=False)),
                ('group_name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('message_id', models.IntegerField(primary_key=True, serialize=False)),
                ('sender_id', models.IntegerField()),
                ('receiver_id', models.IntegerField()),
                ('message', models.BinaryField()),
                ('sent_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserFollowers',
            fields=[
                ('follow_id', models.IntegerField(primary_key=True, serialize=False)),
                ('user_id', models.IntegerField()),
                ('follower_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='UserFriends',
            fields=[
                ('frnd_id', models.IntegerField(primary_key=True, serialize=False)),
                ('user_id', models.IntegerField()),
                ('friend_id', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='posts',
            name='image',
            field=models.BinaryField(null=True),
        ),
    ]
