from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    Product,
    Review,
    Order,
    OrderItem,
    ShippingAddress,
    Wishlist,
)


# -----------------------------
# Product Serializer
# -----------------------------
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


# -----------------------------
# User Serializer
# -----------------------------
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "_id",
            "username",
            "email",
            "name",
            "isAdmin",
        ]

    def get_name(self, obj):
        if obj.first_name:
            return obj.first_name
        return obj.username

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


# -----------------------------
# User Serializer With Token
# -----------------------------
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "_id",
            "username",
            "email",
            "name",
            "isAdmin",
            "token",
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


# -----------------------------
# Shipping Address Serializer
# -----------------------------
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


# -----------------------------
# Order Item Serializer
# -----------------------------
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


# -----------------------------
# Order Serializer
# -----------------------------
class OrderSerializer(serializers.ModelSerializer):
    orderItems = OrderItemSerializer(
        many=True,
        source="orderitem_set",
        read_only=True,
    )

    shippingAddress = ShippingAddressSerializer(
        source="shippingaddress",
        read_only=True,
    )

    user = UserSerializer(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"


# -----------------------------
# Wishlist Serializer
# -----------------------------
class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Wishlist
        fields = "__all__"