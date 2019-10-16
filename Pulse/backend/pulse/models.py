from django.db import models

# Create your models here.


# class Category(models.Model):
#     category = models.CharField(primary_key = True, max_length = 100)

#     def _str_(self):
#         return self.category



class Business(models.Model):

    businessID = models.CharField(primary_key=True, max_length=100)
    businessName = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=200, blank=True)
    longitude = models.FloatField(default = None, blank=True)
    latitude = models.FloatField(default = None, blank=True)
    businessURL = models.CharField(max_length =300, blank=True)
    pictureURL = models.CharField(max_length =300,  blank=True)
    description = models.CharField(max_length =300, blank=True)
    reviewCount = models.IntegerField(default=None, blank=True)
    zipcode = models.CharField(max_length=500, blank=True)
    category = models.CharField(max_length=100, blank=True)

    #category = models.ForeignKey('Category', on_delete = models.CASCADE)

    def __str__(self):
        return self.businessID



class YelpReviews(models.Model):
    reviewID = models.CharField(primary_key=True, max_length=100)
    rating = models.IntegerField(default=None, blank=True)
    date = models.DateField()
    review = models.CharField(max_length=5000, blank=True)


    business = models.ForeignKey('Business',  null=True, blank=True, db_constraint=False, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('reviewID', 'date'),)

    







