# Generated by Django 2.2.6 on 2019-10-16 00:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pulse', '0008_auto_20191016_0009'),
    ]

    operations = [
        migrations.AlterField(
            model_name='yelpreviews',
            name='reviewID',
            field=models.CharField(default='', max_length=100, primary_key=True, serialize=False),
        ),
    ]