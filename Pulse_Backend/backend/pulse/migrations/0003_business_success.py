# Generated by Django 2.2.7 on 2019-12-03 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pulse', '0002_wordcloudphoto'),
    ]

    operations = [
        migrations.AddField(
            model_name='business',
            name='success',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
