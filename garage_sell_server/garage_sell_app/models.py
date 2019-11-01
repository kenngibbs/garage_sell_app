from django.db import models


class GarageSellModel(models.Model):
    buyerName = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=9, decimal_places=3)
    datePurchased = models.DateTimeField()