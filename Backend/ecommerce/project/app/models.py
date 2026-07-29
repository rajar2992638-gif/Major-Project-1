from django.db import models
from django.contrib.auth.models import User


# ==========================
# Product Model
# ==========================
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(default=0)

    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(default=0)

    createdAt = models.DateTimeField(auto_now_add=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


# ==========================
# Review Model
# ==========================
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=200)
    rating = models.IntegerField(default=0)
    comment = models.TextField()

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


# ==========================
# Order Model
# ==========================
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    paymentMethod = models.CharField(max_length=200)

    taxPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shippingPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(null=True, blank=True)

    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self._id)


# ==========================
# Order Item Model
# ==========================
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    name = models.CharField(max_length=200)
    qty = models.IntegerField(default=0)

    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    image = models.CharField(max_length=500)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


# ==========================
# Shipping Address Model
# ==========================
class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)

    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    postalCode = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    shippingPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.address


# ==========================
# Wishlist Model
# ==========================
class Wishlist(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="wishlist"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="wishlist_products"
    )

    createdAt = models.DateTimeField(auto_now_add=True)

    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        unique_together = ("user", "product")

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"