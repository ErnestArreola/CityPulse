# Generated by Django 2.2.6 on 2019-10-16 02:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pulse', '0011_remove_yelpreviews_business'),
    ]

    operations = [
        migrations.AddField(
            model_name='yelpreviews',
            name='business',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pulse.Business'),
        ),
    ]
