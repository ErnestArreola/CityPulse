# Generated by Django 2.2.6 on 2019-10-14 04:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pulse', '0004_auto_20191014_0430'),
    ]

    operations = [
        migrations.AlterField(
            model_name='business',
            name='category',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
